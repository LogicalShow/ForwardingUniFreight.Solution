function Shipments_SubmenuTabClicked() {
    debugger;
    if ($("#tblConnectedShipments tbody tr").length == 0) {
        Shipments_LoadAvailableShipments();
        LoadShipmentComboBoxes();
        //$("#slConsignees").html($("#hReadySlCustomers").html());
        //$("#slConsignees2").html($("#hReadySlCustomers").html());
        //$("#slShippers").html($("#hReadySlCustomers").html());
        //$("#slNotify").html($("#hReadySlCustomers").html());
        $("#slAgents").html($("#hReadySlAgents").html());
        //$("#slForwarderBLDocuments").html($("#hReadySlCustomers").html());
    }
    if ($("#tblDocsOut tbody tr").length == 0) {
        DocsOut_LoadAll($("#hOperationID").val());
    }
    $("#lblManualMAWB").text("House No.");
    $("#lblMAWBStockAir").text("House No.");

    $("#slShipmentVesselID").css({ "width": "100%" }).select2();
    $("#slShipmentVesselID").trigger("change");

    $("div[tabindex='-1']").removeAttr('tabindex');

    IntializeQuotationRouteAutoCompleteSearch();

    

    $("#slOperationBranch").html($("#slOperationEditBranch").html());
    $("#slOperationSalesman").html($("#slOperationEditSalesman").html()); 

}
function ResetQuotationRoutes() {
    var onchange = $("#slQuotationRoutes").attr('onchange');
    $("#slQuotationRoutes").attr('onchange', '');
    $("#slQuotationRoutes").val(0).change();
    $("#slQuotationRoutes").attr('onchange', onchange);
}
function IntializeQuotationRouteAutoCompleteSearch() {
    debugger;
    ResetQuotationRoutes();
    $("#slQuotationRoutes").css({ 'width': '100%' }).select2({
        minimumInputLength: 2,
        tags: [],
        ajax: {
            url: strServerURL + "/api/Operations/GetQuotationRouteList",
            dataType: 'json',
            type: "GET",
            contentType: "application/json; charset=utf-8",
            quietMillis: 50,
            // data: { term: term },
            data: function (params) {
                debugger;
                var query = {
                    pSearch: " and Code like N'%" + IsNull(params.term,'') +"%'",
                    pUnEditableCompanyName: pDefaults.UnEditableCompanyName,
                    pShipmentID: IsNull($("#hShipmentID").val(),0),
                    pMasterDirectionType: pOperationHeader_Global.DirectionType ,
                }

                return query;
            },
            processResults: function (data) {

                var d = JSON.parse(data);
                return {

                    results: $.map(d, function (item) {
                        return {
                            text: item.Code,
                            id: item.ID,
                            value: item.ID
                        };
                    })
                };
            }
        },
        allowClear: true,
        placeholder: {
            id: 0,
            text: ""
        }
    });
}

function LoadShipmentComboBoxes() {
    debugger;
    CallGETFunctionWithParameters("/api/Operations/LoadShipmentComboBoxes", { pMasterOperationID: $("#hOperationID").val(), pShowUserSalesmen: pDefaults.ShowUserSalesmen, pIsAWB: $("#cbIsAWB").prop("checked"), pPOLCountryID: $('#hPOLCountryID').val(), pPODCountryID: $('#hPODCountryID').val() }, function (pData) {

        _firstHouseId = pData.firstHouseId;

        FillListFromObject(null, 2, "<--Select-->", "slPickupCountry", pData.countries, function () { $("#slDeliveryCountry").html($("#slPickupCountry").html()); $("#slNafezaPickupCountry").html($("#slPickupCountry").html()); }); 
        FillListFromObject(null, 2, "<--Select-->", "slShipmentVesselID", pData.vessels, null); 
        FillListFromObject(null, 2, "<--Select-->", "slStoreLocationBLDocuments", pData.warehouses, null); 
        FillListFromObject(null, 2, "<--Select-->", "slPackageTypes", pData.packageTypes, null); 
        FillListFromObject(null, 2, "<--Select-->", "slTransientPort", pData.ports, null); 
        FillListFromObject(null, 2, "<--Select-->", "slTransientPort", pData.ports, null); 
        FillListFromObject(pOperationHeader_Global.POD, 4, "<--Select-->", "slDeliveryCity", pData.portOfDestination, null);
        FillListFromObject(pOperationHeader_Global.POL, 4, "<--Select-->", "slPickupCity", pData.portOfPickup, null);
    });
}
function Shipments_BindTableRows(pOperations) {
    ClearAllTableRows("tblShipments");
    ClearAllTableRows("tblConnectedShipments");
    debugger;
    if ($("#slClearanceCurrency option").length == 0)
        $("#slClearanceCurrency").html($("#hReadySlCurrencies").html());
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Print" + "</span>";
    var copyControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Copy" + "</span>";
    var extraControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-edit' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Extra" + "</span>";
    var AddHouseControlsText = " class=' btn btn-xs btn-rounded btn-warning float-right' > <i class='fa fa-plus' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Add House" + "</span>";
    var printDraftControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Print Draft" + "</span>";

    // $.each(pOperations, function (i, item) {
    //     AppendRowtoTable((item.MasterOperationID == $("#hOperationID").val() ? "tblConnectedShipments" : "tblShipments"),
    //     ("<tr style='height:15px;' ID='" + item.ID + "' ondblclick='Shipments_FillControls(" + item.ID + ");'>"
    //                 + "<td class='ConnectionID'> <small> <input name='ConnectOrDisconnect' type='checkbox' onchange='Shipments_ConnectOrDisconnect(" + item.ID + ", null);' value ='" + item.ID + "'" + (item.MasterOperationID == $("#hOperationID").val() ? " checked='checked' " : " ") + (item.IsPackagesPlacedOnMaster == 0 && OEShi ? "" : " disabled='disabled ' ") + " /></small></td>"
    //                 //+ "<td class='QuotationID hide' val='" + item.QuotationID + "'>" + item.QuotationID + "</td>"
    //                 //+ "<td class='OpenedBy hide' val='" + item.CreatorUserID + "'>" + item.OpenedBy + "</td>"
    //                 //BLType : 1-Direct 2-House 3-Master
    //                 + "<td class='BLType hide'>" + GetBLType(item.BLType) + "</td>"
    //                 //+ "<td class='shownBLTypeIconName hide'><i class= 'fa " + item.BLTypeIconName + " " + item.BLTypeIconStyle + " fa-x'/></td>"
    //                 //+ "<td class='BLTypeIconName hide'>" + item.BLTypeIconName + "</td>"//this line is to get the value of the IconName to fill it in the modal 
    //                 //+ "<td class='BLTypeIconStyle hide'>" + item.BLTypeIconStyle + "</td>"//this line is to get the value of the IconStyle to fill it in the modal 
    //                 //DirectionType : 1-Import 2-Export 3-Domestic
    //                 + "<td class='DirectionType hide'>" + GetDirectionType(item.DirectionType) + "</td>"
    //                 //+ "<td class='shownDirectionIconName hide'><i class= 'fa " + item.DirectionIconName + " " + item.DirectionIconStyle + " fa-x'/></td>"
    //                 //+ "<td class='DirectionIconName hide'>" + item.DirectionIconName + "</td>"//this line is to get the value of the IconName to fill it in the modal 
    //                 //+ "<td class='DirectionIconStyle hide'>" + item.DirectionIconStyle + "</td>"//this line is to get the value of the IconStyle to fill it in the modal 
    //                 //TransportType : 1-Ocean 2-Air 3-Inland
    //                 + "<td class='TransportType hide'>" + GetTransportType(item.TransportType) + "</td>"
    //                 //+ "<td class='shownTransportIconName hide' ><i class= 'fa " + item.TransportIconName + " " + item.TransportIconStyle + " fa-x'/></td>"
    //                 //+ "<td class='TransportIconName hide'>" + item.TransportIconName + "</td>"//this line is to get the value of the IconName to fill it in the modal 
    //                 //+ "<td class='TransportIconStyle hide'>" + item.TransportIconStyle + "</td>"//this line is to get the value of the IconStyle to fill it in the modal 
    //                 //the next line differs from the preceeding one that date could be shown as today, tomorrow, yesterday
    //                 + "<td class='shownOpenDate hide'>" //+ "<span class='pull-left thumb-sm  calendar-icon-style'>"
    //                                           //+ " <i class='fa fa-calendar'></i>"
    //                                           //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + "</small>"
    //                                           + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.OpenDate)) + "</small>"
    //                                           + "</span>"
    //                                           + "</td>"
    //                 + "<td class='OpenDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.OpenDate)) + "</td>"
    //
    //                 + "<td class='OperationCode hide'>" + item.Code + "</td>"
    //                 + "<td class='HWB'>" + "<small>" + item.HouseNumber + "</small>" + "</td>"
    //                 //+ "<td class='CodeSerial hide'>" + item.CodeSerial + "</td>"
    //
    //                 + "<td class='Client hide'>" + "<small>" + (item.DirectionType == 1 ? (item.ConsigneeName == 0 ? "" : item.ConsigneeName) : (item.ShipperName == 0 ? "" : item.ShipperName)) + "</small>" + "</td>"
    //
    //                 + "<td class='Shipper' val='" + item.ShipperID + "'>" + (item.ShipperName == 0 ? "" : item.ShipperName) + "</td>"
    //                 //+ "<td class='ShipperAddress hide' val='" + item.ShipperAddressID + "'>" + item.ShipperAddressID + "</td>"
    //                 //+ "<td class='ShipperContact hide' val='" + item.ShipperContactID + "'>" + item.ShipperContactID + "</td>"
    //                 + "<td class='Consignee' val='" + item.ConsigneeID + "'>" + (item.ConsigneeName == 0 ? "" : item.ConsigneeName) + "</td>"
    //                 //+ "<td class='ConsigneeAddress hide' val='" + item.ConsigneeAddressID + "'>" + item.ConsigneeAddressID + "</td>"
    //                 //+ "<td class='ConsigneeContact hide' val='" + item.ConsigneeContactID + "'>" + item.ConsigneeContactID + "</td>"
    //
    //                 //+ "<td class='Carrier hide' val='" + (item.TransportType == "1" ? item.ShippingLineID //Ocean
    //                 //                                        : (item.TransportType == "2" ? item.AirlineID //Air
    //                 //                                        : item.TruckerID) //Inland
    //                 //                                        ) //EOF getting the carrier ID val
    //                 //                                    + "'>" + (item.TransportType == "1" ? item.ShippingLineName //Ocean
    //                 //                                    : (item.TransportType == "2" ? item.AirlineName //Air
    //                 //                                    : item.TruckerName) //Inland
    //                 //                                    )
    //                 //+ "</td>"
    //                 //+ "<td class='Routing hide'>" + "<small>" + item.POLCode + " > " + item.PODCode + "</small>" + "</td>"
    //                 //+ "<td class='POL hide' val='" + item.POL + "'>" + item.POLCode + "</td>"
    //                 //+ "<td class='POD hide' val='" + item.POD + "'>" + item.PODCode + "</td>"
    //                 //+ "<td class='Incoterm hide' val='" + item.IncotermID + "'>" + item.IncotermName + "</td>"
    //                 + "<td class='Commodity hide' val='" + item.CommodityID + "'>" + item.CommoditymName + "</td>"
    //                 //+ "<td class='TransientTime hide'>" + item.TransientTime + "</td>"
    //                 + "<td class='CloseDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CloseDate)) + "</td>"
    //                 //ShipmentType : 1-FCL 2-LCL 3-FTL 4-LTL
    //                 + "<td class='ShipmentType hide'>" + "<small>" + GetShipmentType(item.ShipmentType) + " " + GetBLType(item.BLType) + "</small>" + "</td>"
    //                 + "<td class='ChForConsignee2" + item.ID + "'><input type='checkbox' id='ChForConsignee2" + item.ID + "' class='ChForConsignee2' /></td>"
    //                 //+ "<td class='shownCutOffDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
    //                 //                          + " <i class='fa fa-calendar'></i>"
    //                 //                          //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CutOffDate)) + "</small>"
    //                 //                          + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.CutOffDate)) + "</small>"
    //                 //                          + "</span>"
    //                 //                          + "</td>"
    //                 //+ "<td class='CutOffDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CutOffDate)) + "</td>"
    //                 //+ "<td class='Volume hide'>" + item.Volume + "</td>"
    //                 //+ "<td class='IncludePickup hide'> <input type='checkbox' disabled='disabled' val='" + (item.IncludePickup == true ? "true' checked='checked'" : "'") + " /></td>"
    //                 //+ "<td class='PickupAddress hide' val='" + item.PickupAddressID + "'>" + item.PickupAddressID + "</td>"
    //                 //+ "<td class='IncludeDelivery hide'> <input type='checkbox' disabled='disabled' val='" + (item.IncludeDelivery == true ? "true' checked='checked'" : "'") + " /></td>"
    //                 //+ "<td class='DeliveryAddress hide' val='" + item.DeliveryAddressID + "'>" + item.DeliveryAddressID + "</td>"
    //
    //                 + "<td class='GrossWeight hide'>" + item.GrossWeight + "</td>"
    //                 //+ "<td class='Volume hide'>" + item.Volume + "</td>"
    //                 //+ "<td class='ChargeableWeight hide'>" + item.ChargeableWeight + "</td>" //shown as Wt/Msr(MT) incase of ocean or inland
    //                 //+ "<td class='NumberOfPackages hide'>" + item.NumberOfPackages + "</td>"
    //                 //+ "<td class='IsDangerousGoods hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsDangerousGoods == true ? "true' checked='checked'" : "'") + " /></td>"
    //                 //+ "<td class='Notes hide'>" + item.Notes + "</td>"
    //                 //+ "<td class='OperationStage hide' val='" + item.OperationStageID + "'>" + item.OperationStageName + "</td>"
    //                 //+ "<td class='Branch hide' val='" + item.BranchID + "'>" + "<small>" + (item.BranchID == 0 ? "" : item.BranchName) + "</small>" + "</td>"
    //                 //+ "<td class='Salesman hide' val='" + item.SalesmanID + "'>" + item.Salesman + "</td>"
    //                 //+ "<td class='Notes hide'>" + item.Notes + "</td>"
    //                 + "<td class=''>"
    //                     + "<a data-toggle='modal' data-target='#ShipmentModal' onclick='Shipments_ClearAllControls("+item.ID+");' " + AddHouseControlsText + "</a>"
    //                     + "<a href='#' data-toggle='modal' onclick='DocsOut_Print(220,0," + item.ID + ");' " + printControlsText + "</a>"
    //                     + "<a href='#' data-toggle='modal' onclick='Shipment_OpenCopyModal(" + item.ID + ");' " + copyControlsText + "</a>"
    //                     + (item.TransportType == AirTransportType ? ("<a href='#' data-toggle='modal' onclick='ShipmentsAWB_FillControls(" + item.ID + ");' " + extraControlsText + "</a>") : "")
    //                 + "</td></tr>"));
    //     debugger;
    // });

    $.each(pOperations, function (i, item) {
        debugger;
        //if (item.HouseParentID == 0) {
            AppendRowtoNestedTable((item.MasterOperationID == $("#hOperationID").val() ? "tblBodyConnectedShipments" : "tblBodyShipments"),
                ("<tr style='height:15px;'  ID='" + item.ID + "' " + ((item.IsHold == false) ? "  ondblclick='"
                    + (item.TransportType == AirTransportType
                        ? "ShipmentsAWB_FillControls(" + item.ID + ");"
                        : "Shipments_FillControls_New(" + item.ID + ");"
                    )
                    + "' " : "") + ">"

                    + (IsMESCOCompany ? "<td><i class='fa fa-plus'  " + ((item.IsHold == false) ? " onclick='ShowHide(" + item.ID + ");' " : "") + "></i></td>" : "")
                    + (pDefaults.UnEditableCompanyName == 'UNF' ? "<td><i class='fa fa-plus'  " + ((item.IsHold == false) ? " onclick='ShowHide(" + item.ID + ");' " : "") + "></i></td>" : "")
                    + (pDefaults.UnEditableCompanyName != 'UNF' ? "<td class='ConnectionID'> <small> <input " + (item.IsHold == true && pDefaults.UnEditableCompanyName == 'TRI' ? "disabled" : " ") + " name='ConnectOrDisconnect' type='checkbox' onchange='Shipments_ConnectOrDisconnect(" + item.ID + ", null);' value ='" + item.ID + "'" + (item.MasterOperationID == $("#hOperationID").val() ? " checked='checked' " : " ") + (item.IsPackagesPlacedOnMaster == 0 && OEShi ? "" : " disabled='disabled ' ") + " /></small></td>" : "")
                    //+ "<td class='QuotationID hide' val='" + item.QuotationID + "'>" + item.QuotationID + "</td>"
                    //+ "<td class='OpenedBy hide' val='" + item.CreatorUserID + "'>" + item.OpenedBy + "</td>"
                    //BLType : 1-Direct 2-House 3-Master
                    + "<td class='BLType hide'>" + GetBLType(item.BLType) + "</td>"
                    //+ "<td class='shownBLTypeIconName hide'><i class= 'fa " + item.BLTypeIconName + " " + item.BLTypeIconStyle + " fa-x'/></td>"
                    //+ "<td class='BLTypeIconName hide'>" + item.BLTypeIconName + "</td>"//this line is to get the value of the IconName to fill it in the modal 
                    //+ "<td class='BLTypeIconStyle hide'>" + item.BLTypeIconStyle + "</td>"//this line is to get the value of the IconStyle to fill it in the modal 
                    //DirectionType : 1-Import 2-Export 3-Domestic
                    + "<td class='DirectionType hide'>" + GetDirectionType(item.DirectionType) + "</td>"
                    //+ "<td class='shownDirectionIconName hide'><i class= 'fa " + item.DirectionIconName + " " + item.DirectionIconStyle + " fa-x'/></td>"
                    //+ "<td class='DirectionIconName hide'>" + item.DirectionIconName + "</td>"//this line is to get the value of the IconName to fill it in the modal 
                    //+ "<td class='DirectionIconStyle hide'>" + item.DirectionIconStyle + "</td>"//this line is to get the value of the IconStyle to fill it in the modal 
                    //TransportType : 1-Ocean 2-Air 3-Inland
                    + "<td class='TransportType hide'>" + GetTransportType(item.TransportType) + "</td>"
                    //+ "<td class='shownTransportIconName hide' ><i class= 'fa " + item.TransportIconName + " " + item.TransportIconStyle + " fa-x'/></td>"
                    //+ "<td class='TransportIconName hide'>" + item.TransportIconName + "</td>"//this line is to get the value of the IconName to fill it in the modal 
                    //+ "<td class='TransportIconStyle hide'>" + item.TransportIconStyle + "</td>"//this line is to get the value of the IconStyle to fill it in the modal 
                    //the next line differs from the preceeding one that date could be shown as today, tomorrow, yesterday
                    + "<td class='shownOpenDate hide'>" //+ "<span class='pull-left thumb-sm  calendar-icon-style'>"
                    //+ " <i class='fa fa-calendar'></i>"
                    //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + "</small>"
                    + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.OpenDate)) + "</small>"
                    + "</span>"
                    + "</td>"
                    + "<td class='OpenDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.OpenDate)) + "</td>"

                    + "<td class='OperationCode hide'>" + item.Code + "</td>"
                    //+ "<td class='HWB'>" + "<small>" + (item.HouseNumber) + "</small>" + "</td>"
                    + "<td class='HWB'>" + (item.HouseNumber) + "</td>"
                    //+ "<td class='CodeSerial hide'>" + item.CodeSerial + "</td>"

                    + "<td class='Client hide'>" + "<small>" + (item.DirectionType == 1 ? (item.ConsigneeName == 0 ? "" : item.ConsigneeName) : (item.ShipperName == 0 ? "" : item.ShipperName)) + "</small>" + "</td>"

                    + "<td class='Shipper' val='" + item.ShipperID + "'>" + (item.shipperName2 == 0 ? "" : item.shipperName2) + "</td>"
                    //+ "<td class='ShipperAddress hide' val='" + item.ShipperAddressID + "'>" + item.ShipperAddressID + "</td>"
                    //+ "<td class='ShipperContact hide' val='" + item.ShipperContactID + "'>" + item.ShipperContactID + "</td>"
                    + "<td class='Consignee' val='" + item.ConsigneeID + "'>" + (item.ConsigneeName2 == 0 ? "" : item.ConsigneeName2) + "</td>"
                    //+ "<td class='ConsigneeAddress hide' val='" + item.ConsigneeAddressID + "'>" + item.ConsigneeAddressID + "</td>"
                    //+ "<td class='ConsigneeContact hide' val='" + item.ConsigneeContactID + "'>" + item.ConsigneeContactID + "</td>"

                    //+ "<td class='Carrier hide' val='" + (item.TransportType == "1" ? item.ShippingLineID //Ocean
                    //                                        : (item.TransportType == "2" ? item.AirlineID //Air
                    //                                        : item.TruckerID) //Inland
                    //                                        ) //EOF getting the carrier ID val
                    //                                    + "'>" + (item.TransportType == "1" ? item.ShippingLineName //Ocean
                    //                                    : (item.TransportType == "2" ? item.AirlineName //Air
                    //                                    : item.TruckerName) //Inland
                    //                                    )
                    //+ "</td>"
                    //+ "<td class='Routing hide'>" + "<small>" + item.POLCode + " > " + item.PODCode + "</small>" + "</td>"
                    //+ "<td class='POL hide' val='" + item.POL + "'>" + item.POLCode + "</td>"
                    //+ "<td class='POD hide' val='" + item.POD + "'>" + item.PODCode + "</td>"
                    //+ "<td class='Incoterm hide' val='" + item.IncotermID + "'>" + item.IncotermName + "</td>"
                    + "<td class='Commodity hide' val='" + item.CommodityID + "'>" + item.CommoditymName + "</td>"
                    //+ "<td class='TransientTime hide'>" + item.TransientTime + "</td>"
                    + "<td class='CloseDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CloseDate)) + "</td>"
                    //ShipmentType : 1-FCL 2-LCL 3-FTL 4-LTL
                    + "<td class='ShipmentType hide'>" + "<small>" + GetShipmentType(item.ShipmentType) + " " + GetBLType(item.BLType) + "</small>" + "</td>"
                    + "<td class='ChForConsignee2" + item.ID + "'><input type='checkbox' id='ChForConsignee2" + item.ID + "' class='ChForConsignee2' /></td>"
                    //+ "<td class='shownCutOffDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
                    //                          + " <i class='fa fa-calendar'></i>"
                    //                          //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CutOffDate)) + "</small>"
                    //                          + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.CutOffDate)) + "</small>"
                    //                          + "</span>"
                    //                          + "</td>"
                    //+ "<td class='CutOffDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CutOffDate)) + "</td>"
                    //+ "<td class='Volume hide'>" + item.Volume + "</td>"
                    //+ "<td class='IncludePickup hide'> <input type='checkbox' disabled='disabled' val='" + (item.IncludePickup == true ? "true' checked='checked'" : "'") + " /></td>"
                    //+ "<td class='PickupAddress hide' val='" + item.PickupAddressID + "'>" + item.PickupAddressID + "</td>"
                    //+ "<td class='IncludeDelivery hide'> <input type='checkbox' disabled='disabled' val='" + (item.IncludeDelivery == true ? "true' checked='checked'" : "'") + " /></td>"
                    //+ "<td class='DeliveryAddress hide' val='" + item.DeliveryAddressID + "'>" + item.DeliveryAddressID + "</td>"

                    + "<td class='GrossWeight hide'>" + item.GrossWeight + "</td>"
                    + "<td class='QuotationID hide'>" + item.QuotationRouteID + "</td>"
                    //+ "<td class='Volume hide'>" + item.Volume + "</td>"
                    //+ "<td class='ChargeableWeight hide'>" + item.ChargeableWeight + "</td>" //shown as Wt/Msr(MT) incase of ocean or inland
                    //+ "<td class='NumberOfPackages hide'>" + item.NumberOfPackages + "</td>"
                    //+ "<td class='IsDangerousGoods hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsDangerousGoods == true ? "true' checked='checked'" : "'") + " /></td>"
                    //+ "<td class='Notes hide'>" + item.Notes + "</td>"
                    //+ "<td class='OperationStage hide' val='" + item.OperationStageID + "'>" + item.OperationStageName + "</td>"
                    //+ "<td class='Branch hide' val='" + item.BranchID + "'>" + "<small>" + (item.BranchID == 0 ? "" : item.BranchName) + "</small>" + "</td>"
                    //+ "<td class='Salesman hide' val='" + item.SalesmanID + "'>" + item.Salesman + "</td>"
                    //+ "<td class='Notes hide'>" + item.Notes + "</td>"

                    //nour06112023
                    + "<td class='IsHold'> <input type='checkbox' disabled  onchange='Shipments_HoldeOrNot(" + item.ID + ");'  val='" + (item.IsHold == true ? "true' checked='checked'" : "'") + " /></td>"

                    + "<td class='ContainersCount hide'>" + item.ContainersCount + "</td>"
                    + "<td class='ExpectedArrival hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.ExpectedArrival)) + "</td>"
                    + "<td class=''>"

                    //nour06112023
                    + (IsMESCOCompany && item.TransportType != AirTransportType && item.IsHold == false ? "<a data-toggle='modal' data-target='' onclick='Shipments_ClearAllControls(" + item.ID + ");' " + AddHouseControlsText + "</a>" : " ")
                    + (item.IsHold == false ? "<a href='#' data-toggle='modal' onclick='DocsOut_Print(220,0," + item.ID + ");' " + printControlsText + "</a>" : " ")
                    + (item.IsHold == false && pDefaults.UnEditableCompanyName == "UNF" && $("#hDirectionType").val() == 2 ? "<a href='#' data-toggle='modal' onclick='DocsOut_Print(220,0," + item.ID + ", null, null, false, true );' " + printDraftControlsText + "</a>" : " ")
                    + (item.IsHold == false ? "<a href='#' data-toggle='modal' onclick='Shipment_OpenCopyModal(" + item.ID + ");' " + copyControlsText + "</a>" : " ")
                    + (item.TransportType == AirTransportType
                        //? ("<a href='#' data-toggle='modal' onclick='ShipmentsAWB_FillControls(" + item.ID + ");' " + extraControlsText + "</a>")
                        ? ("<a href='#' data-toggle='modal' onclick='Shipments_FillControls(" + item.ID + ");' " + extraControlsText + "</a>")
                        : "")
                    + "</td></tr>"
                ));

            AppendRowtoNestedTable((item.MasterOperationID == $("#hOperationID").val() ? "tblBodyConnectedShipments" : "tblBodyShipments"),
                '<tr id="DaughterHouse' + item.ID + '" style="display: none;"><td colspan="7" style="padding-left: 110px;padding-right: 80px;" ><table  class="table text-sm table-hover"><thead><tr style="background-color:#e9e9cc"><th>Connected</th><th>HBL</th><th>Shipper</th><th>Consignee</th><th>CNEE1</th><th></th></tr></thead><tbody id="tblbodyDaughterHouse' + item.ID + '" ></tbody></table></td></tr>'
            );
    //    }
    });
    $.each(pOperations, function (i, house) {
        debugger;
        if (house.HouseParentID == 0) {
            $.each(pOperations, function (y, item) {
                if (house.ID == item.HouseParentID) {
                    AppendRowtoNestedTable("tblbodyDaughterHouse" + house.ID,
                        ("<tr  style='height:15px;background-color:#e9e9cc'  ID='" + item.ID + "' ondblclick='"
                            + (item.TransportType == AirTransportType
                                ? "ShipmentsAWB_FillControls(" + item.ID + ");"
                                : "Shipments_FillControls(" + item.ID + ");"
                            )
                            + "'>"
                            + "<td class='ConnectionID'> <small> <input name='ConnectOrDisconnect' type='checkbox' onchange='Shipments_ConnectOrDisconnect(" + item.ID + ", null);' value ='" + item.ID + "'" + (item.MasterOperationID == $("#hOperationID").val() ? " checked='checked' " : " ") + (item.IsPackagesPlacedOnMaster == 0 && OEShi ? "" : " disabled='disabled ' ") + " /></small></td>"
                            //+ "<td class='QuotationID hide' val='" + item.QuotationID + "'>" + item.QuotationID + "</td>"
                            //+ "<td class='OpenedBy hide' val='" + item.CreatorUserID + "'>" + item.OpenedBy + "</td>"
                            //BLType : 1-Direct 2-House 3-Master
                            + "<td class='BLType hide'>" + GetBLType(item.BLType) + "</td>"
                            //+ "<td class='shownBLTypeIconName hide'><i class= 'fa " + item.BLTypeIconName + " " + item.BLTypeIconStyle + " fa-x'/></td>"
                            //+ "<td class='BLTypeIconName hide'>" + item.BLTypeIconName + "</td>"//this line is to get the value of the IconName to fill it in the modal 
                            //+ "<td class='BLTypeIconStyle hide'>" + item.BLTypeIconStyle + "</td>"//this line is to get the value of the IconStyle to fill it in the modal 
                            //DirectionType : 1-Import 2-Export 3-Domestic
                            + "<td class='DirectionType hide'>" + GetDirectionType(item.DirectionType) + "</td>"
                            //+ "<td class='shownDirectionIconName hide'><i class= 'fa " + item.DirectionIconName + " " + item.DirectionIconStyle + " fa-x'/></td>"
                            //+ "<td class='DirectionIconName hide'>" + item.DirectionIconName + "</td>"//this line is to get the value of the IconName to fill it in the modal 
                            //+ "<td class='DirectionIconStyle hide'>" + item.DirectionIconStyle + "</td>"//this line is to get the value of the IconStyle to fill it in the modal 
                            //TransportType : 1-Ocean 2-Air 3-Inland
                            + "<td class='TransportType hide'>" + GetTransportType(item.TransportType) + "</td>"
                            //+ "<td class='shownTransportIconName hide' ><i class= 'fa " + item.TransportIconName + " " + item.TransportIconStyle + " fa-x'/></td>"
                            //+ "<td class='TransportIconName hide'>" + item.TransportIconName + "</td>"//this line is to get the value of the IconName to fill it in the modal 
                            //+ "<td class='TransportIconStyle hide'>" + item.TransportIconStyle + "</td>"//this line is to get the value of the IconStyle to fill it in the modal 
                            //the next line differs from the preceeding one that date could be shown as today, tomorrow, yesterday
                            + "<td class='shownOpenDate hide'>" //+ "<span class='pull-left thumb-sm  calendar-icon-style'>"
                            //+ " <i class='fa fa-calendar'></i>"
                            //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + "</small>"
                            + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.OpenDate)) + "</small>"
                            + "</span>"
                            + "</td>"
                            + "<td class='OpenDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.OpenDate)) + "</td>"

                            + "<td class='OperationCode hide'>" + item.Code + "</td>"
                            + "<td class='HWB'>" + "<small>" + item.HouseNumber + "</small>" + "</td>"
                            //+ "<td class='CodeSerial hide'>" + item.CodeSerial + "</td>"

                            + "<td class='Client hide'>" + "<small>" + (item.DirectionType == 1 ? (item.ConsigneeName == 0 ? "" : item.ConsigneeName) : (item.ShipperName == 0 ? "" : item.ShipperName)) + "</small>" + "</td>"

                            + "<td class='Shipper' val='" + item.ShipperID + "'>" + (item.ShipperName == 0 ? "" : item.ShipperName) + "</td>"
                            //+ "<td class='ShipperAddress hide' val='" + item.ShipperAddressID + "'>" + item.ShipperAddressID + "</td>"
                            //+ "<td class='ShipperContact hide' val='" + item.ShipperContactID + "'>" + item.ShipperContactID + "</td>"
                            + "<td class='Consignee' val='" + item.ConsigneeID + "'>" + (item.ConsigneeName == 0 ? "" : item.ConsigneeName) + "</td>"
                            //+ "<td class='ConsigneeAddress hide' val='" + item.ConsigneeAddressID + "'>" + item.ConsigneeAddressID + "</td>"
                            //+ "<td class='ConsigneeContact hide' val='" + item.ConsigneeContactID + "'>" + item.ConsigneeContactID + "</td>"

                            //+ "<td class='Carrier hide' val='" + (item.TransportType == "1" ? item.ShippingLineID //Ocean
                            //                                        : (item.TransportType == "2" ? item.AirlineID //Air
                            //                                        : item.TruckerID) //Inland
                            //                                        ) //EOF getting the carrier ID val
                            //                                    + "'>" + (item.TransportType == "1" ? item.ShippingLineName //Ocean
                            //                                    : (item.TransportType == "2" ? item.AirlineName //Air
                            //                                    : item.TruckerName) //Inland
                            //                                    )
                            //+ "</td>"
                            //+ "<td class='Routing hide'>" + "<small>" + item.POLCode + " > " + item.PODCode + "</small>" + "</td>"
                            //+ "<td class='POL hide' val='" + item.POL + "'>" + item.POLCode + "</td>"
                            //+ "<td class='POD hide' val='" + item.POD + "'>" + item.PODCode + "</td>"
                            //+ "<td class='Incoterm hide' val='" + item.IncotermID + "'>" + item.IncotermName + "</td>"
                            + "<td class='Commodity hide' val='" + item.CommodityID + "'>" + item.CommoditymName + "</td>"
                            //+ "<td class='TransientTime hide'>" + item.TransientTime + "</td>"
                            + "<td class='CloseDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CloseDate)) + "</td>"
                            //ShipmentType : 1-FCL 2-LCL 3-FTL 4-LTL
                            + "<td class='ShipmentType hide'>" + "<small>" + GetShipmentType(item.ShipmentType) + " " + GetBLType(item.BLType) + "</small>" + "</td>"
                            + "<td class='ChForConsignee2" + item.ID + "'><input type='checkbox' id='ChForConsignee2" + item.ID + "' class='ChForConsignee2' /></td>"
                            //+ "<td class='shownCutOffDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
                            //                          + " <i class='fa fa-calendar'></i>"
                            //                          //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CutOffDate)) + "</small>"
                            //                          + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.CutOffDate)) + "</small>"
                            //                          + "</span>"
                            //                          + "</td>"
                            //+ "<td class='CutOffDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CutOffDate)) + "</td>"
                            //+ "<td class='Volume hide'>" + item.Volume + "</td>"
                            //+ "<td class='IncludePickup hide'> <input type='checkbox' disabled='disabled' val='" + (item.IncludePickup == true ? "true' checked='checked'" : "'") + " /></td>"
                            //+ "<td class='PickupAddress hide' val='" + item.PickupAddressID + "'>" + item.PickupAddressID + "</td>"
                            //+ "<td class='IncludeDelivery hide'> <input type='checkbox' disabled='disabled' val='" + (item.IncludeDelivery == true ? "true' checked='checked'" : "'") + " /></td>"
                            //+ "<td class='DeliveryAddress hide' val='" + item.DeliveryAddressID + "'>" + item.DeliveryAddressID + "</td>"

                            + "<td class='GrossWeight hide'>" + item.GrossWeight + "</td>"
                            //+ "<td class='Volume hide'>" + item.Volume + "</td>"
                            //+ "<td class='ChargeableWeight hide'>" + item.ChargeableWeight + "</td>" //shown as Wt/Msr(MT) incase of ocean or inland
                            //+ "<td class='NumberOfPackages hide'>" + item.NumberOfPackages + "</td>"
                            //+ "<td class='IsDangerousGoods hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsDangerousGoods == true ? "true' checked='checked'" : "'") + " /></td>"
                            //+ "<td class='Notes hide'>" + item.Notes + "</td>"
                            //+ "<td class='OperationStage hide' val='" + item.OperationStageID + "'>" + item.OperationStageName + "</td>"
                            //+ "<td class='Branch hide' val='" + item.BranchID + "'>" + "<small>" + (item.BranchID == 0 ? "" : item.BranchName) + "</small>" + "</td>"
                            //+ "<td class='Salesman hide' val='" + item.SalesmanID + "'>" + item.Salesman + "</td>"
                            //+ "<td class='Notes hide'>" + item.Notes + "</td>"
                            + "<td class=''>"
                            // + "<a data-toggle='modal' data-target='#ShipmentModal' onclick='Shipments_ClearAllControls("+item.ID+");' " + AddHouseControlsText + "</a>"
                            + "<a href='#' data-toggle='modal' onclick='DocsOut_Print(220,0," + item.ID + ");' " + printControlsText + "</a>"
                            + "<a href='#' data-toggle='modal' onclick='Shipment_OpenCopyModal(" + item.ID + ");' " + copyControlsText + "</a>"
                            + (item.TransportType == AirTransportType ? ("<a href='#' data-toggle='modal' onclick='ShipmentsAWB_FillControls(" + item.ID + ");' " + extraControlsText + "</a>") : "")
                        ));
                    // $("#DaughterHouse" + house.ID).show();
                }

            });
        }
    });

    if (IsMESCOCompany || pDefaults.UnEditableCompanyName == "UNF") {
        $("#tblConnectedShipmentsExpandCol").removeClass("hide");
    }
    if ( pDefaults.UnEditableCompanyName == "NTM") {
        $("#HeaderConnectedShipmentID").removeClass("hide");
    }
    if (pDefaults.UnEditableCompanyName == "BOM" || pDefaults.UnEditableCompanyName == "BFA" || pDefaults.UnEditableCompanyName == "TRI") {
        $("#HeaderDeleteShipmentID").removeClass("hide");
    }
    //if (pDefaults.UnEditableCompanyName == "SUS") {
    //    $("#Nasb").removeClass("hide");
    //    $("#nasb").removeClass("hide");
    //}

    debugger;
    //ApplyPermissions();
    //if ($("#hShipmentType").val() == constConsolidationShipmentType && OAShi) $("#btn-AddShipment").removeClass("hide"); else $("#btn-AddShipment").addClass("hide");
    if ($("#hBLType").val() == constMasterBLType && OAShi && $("#hIsOperationDisabled").val() == false) $("#btn-AddShipment").removeClass("hide"); else $("#btn-AddShipment").addClass("hide");
    if (OAPac && $("#hIsOperationDisabled").val() == false) { $(".classSetCargoProperties").removeClass("hide"); $(".classSetClearanceProperties").removeClass("hide"); } else { $(".classSetCargoProperties").addClass("hide"); $(".classSetClearanceProperties").addClass("hide"); }
    //BindAllCheckboxonTable("tblShipments", "ID");//it attaches function to the checkboxes so when all are checked then check cb-checkall too
    //CheckAllCheckbox("ID");
    //HighlightText("#tblShipments>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    var intRowsCount = $('#tblShipments tr').length - 1;//document.getElementById("tblShipments").getElementsByTagName("tr").length - 1;
    if (intRowsCount > 0) {
        $("#tblShipments").removeClass("hide");
        $("#spanNoAvailableShipments").addClass("hide");
    }
    else {
        $("#tblShipments").addClass("hide");
        $("#spanNoAvailableShipments").removeClass("hide");
    }

    intRowsCount = $('#tblConnectedShipments tr').length - 1;//document.getElementById("tblConnectedShipments").getElementsByTagName("tr").length - 1;
    if (intRowsCount > 0) {
        $("#tblConnectedShipments").removeClass("hide");
        $("#spanNoConnectedShipments").addClass("hide");
    }
    else {
        $("#tblConnectedShipments").addClass("hide");
        $("#spanNoConnectedShipments").removeClass("hide");
    }

    if (['MR'].includes(pDefaults.UnEditableCompanyName)) {
        $('#tblConnectedShipments .ExpectedArrival, #tblConnectedShipments .ContainersCount').removeClass('hide');
    }
}
function Shipments_LoadAvailableShipments() {
    debugger;
    var pWhereClause = " WHERE 1=1 ";
    pWhereClause += " AND BLType = " + constHouseBLType;
    ////I disabled the next line coz i stopped connecting/disconnecting
    //pWhereClause += " AND POL = " + $("#hPOL").val() + " AND POD = " + $("#hPOD").val();

    //pWhereClause += " AND TransportType = " + $("#hTransportType").val();
    //pWhereClause += " AND DirectionType = " + $("#hDirectionType").val();

    ////i disabled the next line coz i dont think its correct but i didnt trace well
    //pWhereClause += " AND OperationStageID NOT IN ( " + CancelledQuoteAndOperStageID + "," + ClosedQuoteAndOperStageID + ")";
    debugger;
    if ($("#hShipmentType").val() == constFCLShipmentType
        || $("#hShipmentType").val() == constLCLShipmentType
        || $("#hShipmentType").val() == constFTLShipmentType
        || $("#hShipmentType").val() == constLTLShipmentType
        || $("#hShipmentType").val() == constFlexiShipmentType
        || $("#hShipmentType").val() == constBulkShipmentType
        || $("#hShipmentType").val() == 30)
        
        pWhereClause += " AND ShipmentType = " + $("#hShipmentType").val();
    else if ($("#hShipmentType").val() == constConsolidationShipmentType)//Consolidation Shipment() i.e. ShipmentType = 5
    {
        if ($("#hTransportType").val() == OceanTransportType)
            pWhereClause += " AND ShipmentType = " + "2 "; //LCL
        else
            if ($("#hTransportType").val() == InlandTransportType) //Inland
                pWhereClause += " AND ShipmentType = " + "4 "; //LTL
    }

    else if ($("#hTransportType").val() != 2) {
            pWhereClause += " AND (ShipmentType IS NULL) "; //Air


    }
    if (pDefaults.UnEditableCompanyName == "NIL") {
        $('.showForNIL').removeClass('hide');
        $('.hideForNIL').addClass('hide');
    }
    //else // ShipmentType = 0 (null) incase of Air
    //  pWhereClause += " AND (ShipmentType IS NULL) "; //Air
    //pWhereClause += " AND (MasterOperationID IS NULL OR MasterOperationID = " + $("#hOperationID").val() + " ) ";
    pWhereClause += " AND (MasterOperationID = " + $("#hOperationID").val() + " ) ";
    //pWhereClause += " ORDER BY ID ";
    LoadAll("/api/Operations/LoadAll"
        , pWhereClause
        , function (pData) {
            //if ($("#cbIsAWB").prop("checked"))
            //    ShipmentsAWB_BindTableRows(JSON.parse(pData[0]));
            //else
            Shipments_BindTableRows(JSON.parse(pData[0]));
        });
}
function ShowHide(id) {
    debugger;
    $('#DaughterHouse' + id + '').toggle();
    if ($('#DaughterHouse' + id).css('display') == 'none') {
        $('#' + id).css('background-color', '');
        $('#DaughterHouse' + id).css('background-color', '');

    } else {
        $('#' + id).css('background-color', 'rgb(153, 153, 153)');
        $('#DaughterHouse' + id).css('background-color', '#e9e9cc');
    }

    // $('#tblbodyDaughterHouse  tr').css('background-color','#e9e9cc')
    $('#' + id).css('padding', '0px')
    $('#' + id).css('padding', '0px')

}
//pIsHouseConnected is called with null if fn called by checkbox, But if called from new shipment, then its true
//pIsFirstParameterObject is true when called from adding new shipment from master operation, and in this case pHouseOperationID is not the HouseID, but its pHouseOperationID[1]
function Shipments_ConnectOrDisconnect(pHouseOperationID, pIsHouseConnected, pIsFirstParameterObject) {
    debugger;
    ////the next commented line is to know if any house is connected to the master or not to enable/disable controls like(POL,.....)
    //var IsConnectedToHouse = !($("#tblShipments td").find("input[name=ConnectOrDisconnect]:checked").val() == undefined);
    if (pIsFirstParameterObject && pHouseOperationID[1] != undefined)
        pHouseOperationID = pHouseOperationID[1]; //coz in this case the first parameter is an object
    var IsHouseConnected = false;
    if (pIsHouseConnected == null) { //called by checkbox
        var tr = $("tr[ID='" + pHouseOperationID + "']");
        IsHouseConnected = $(tr).find('td.ConnectionID input:checkbox').is(':checked');
    }
    else //called from new shipment
        IsHouseConnected = pIsHouseConnected;

    if (!IsHouseConnected) {
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: false
        },
            //callback function in case of confirm or cancel delete
            function (pIsConfirm) {
                debugger;
                swalClose();

                if (pIsConfirm) {

                    Shipments_ConnectOrDisconnect_Confirm(pHouseOperationID, IsHouseConnected);

                }
                else {
                    var tr = $("tr[ID='" + pHouseOperationID + "']");
                    $(tr).find('td.ConnectionID input:checkbox').prop('checked', true);
                }
            });
    }
    else {
        Shipments_ConnectOrDisconnect_Confirm(pHouseOperationID, IsHouseConnected);
    }

}

function Shipments_HoldeOrNot(pHouseOperationID) {
    debugger;
    var tr = $("tr[ID='" + pHouseOperationID + "']");
    var IsHouseHold = $(tr).find('td.IsHold input:checkbox').is(':checked');
     
    CallGETFunctionWithParameters("/api/Operations/HoldUnHoldBill", {
        pBillID: pHouseOperationID
        , pIsHold: !IsHouseHold
        , pHoldReason: ""

    
    }, function (data) { 
        debugger;
        if (data[0] =="") 
            Shipments_LoadAvailableShipments();
        else
            swal(strSorry, data[0]);
    });

}
function Shipments_ConnectOrDisconnect_Confirm(pHouseOperationID, pIsHouseConnected) {
    CallGETFunctionWithParameters("/api/Operations/ConnectOrDisconnect", {
        //the 1st 2 fields are to set the number of Houses Connected in the Master Operation
        pMasterOperationID: ($("#cbIsAWB").prop("checked") ? $("#hBillID").val() : $("#hOperationID").val())
        , pIsHouseConnected: pIsHouseConnected
        //the next 2 fields are to set the House Operation
        , pMasterOperationIDFieldInHouse: (pIsHouseConnected ? ($("#cbIsAWB").prop("checked") ? $("#hBillID").val() : $("#hOperationID").val()) : 0)
        , pHouseOperationID: pHouseOperationID
        , pHouseParentID: $("#hHouseParentID").val() == "" ? 0 : parseInt($("#hHouseParentID").val())
    }, function (data) { //data[0]: is a flag of success or failure. data[1]: is a the message returned
        debugger;
        if (data[0]) { //Successfully connected or disconnected
            $("#hNumberOfHousesConnected").val(pIsHouseConnected
                ? parseInt($("#hNumberOfHousesConnected").val()) + 1
                : parseInt($("#hNumberOfHousesConnected").val()) - 1);
            if (pIsHouseConnected && IsMESCOCompany && pOperationHeader_Global != null && (['CONSOL', 'LCL'].includes(pOperationHeader_Global.ShipmentTypeCode))) {
                CargoProperties_Save(pHouseOperationID);
            } else {
                if (["UNF", "LATT", "LAT"].includes(pDefaults.UnEditableCompanyName))
                    jQuery('#ShipmentModal').modal('hide');
                Shipments_LoadAvailableShipments();
                //GetListWithOpCodeAndHouseNoAndClientEmailAttr($("#hOperationID").val(), "/api/Operations/LoadAll", null, "slDocsOutOperations", " WHERE ID = " + $("#hOperationID").val() + " OR MasterOperationID = " + $("#hOperationID").val());
                GetListWithOpCodeAndHouseNoAndClientEmailAttr($("#hOperationID").val(), "/api/Operations/LoadWithParameters", null, "slDocsOutOperations"
                    , { pPageNumber: 1, pPageSize: 99999, pWhereClause: " WHERE ID = " + $("#hOperationID").val() + " OR MasterOperationID = " + $("#hOperationID").val(), pOrderBy: "HouseNumber" }
                    , function () { $("#slEditInvoiceOperations").html($("#slDocsOutOperations").html()); });
            }
        }
        else
            swal(strSorry, data[1]);
    });

    Routings_SetTableProperties();//Set Routing Table Properties according to BLType and if Connected or Not like enabling/disabling ports
}

function Shipments_CompanyConfigurations() {
    if (["UNF", "LATT", "LAT"].includes(pDefaults.UnEditableCompanyName)) {
        if (pOperationHeader_Global.BLType == constMasterBLType && pOperationHeader_Global.TransportType == OceanTransportType && pOperationHeader_Global.DirectionType == constExportDirectionType /*&& pOperationHeader_Global.ShipmentTypeCode == 'LCL'*/) {
            $('#txtShipmentHouseNumber').prop('disabled', true);
        }
        else {
            $('#txtShipmentHouseNumber').prop('disabled', false);
        }
    }
}

function Shipments_ClearAllControls(pHouseParentID) { //called when adding a new house shipment to a master to clear the ShipmentModal
    debugger;
    $("#btnSaveShipment").attr("disabled", false);
    ResetQuotationRoutes();
    if (IsMESCOCompany) {
        ClearAllOptions('slCargoPlacedOnContainer');
        ClearAllOptions('slCargoPlacedOnContainerMulti');
        ClearAll("#CargoPropertiesModal");
        if (pOperationHeader_Global.BLType == constMasterBLType && pOperationHeader_Global.ShipmentTypeCode == "FCL" && $("#tblConnectedShipments tbody tr[ondblclick]").length >= 1) {
            swal("Sorry", "FCL Operations Can have only one House");
            return;
        }
    }
    if ($("#cbIsAir").prop("checked"))
        ShipmentsAWB_FillControls(0);
    else {
        if (!IsMESCOCompany)
            $(".classShowForUpdate").addClass("hide");
        else {
            $("#divForwarder").removeClass("hide");
            $("#divBlStatus").removeClass("hide");
            $("#divStoreLocation").removeClass("hide");
            $("#divQuotationRoute").removeClass("hide");
            $("#txtManifestPreConsignee").parent().removeClass("hide");
            $("#cbPrintHouseConsignee").parent().parent().removeClass("hide");
            $("#cbIsIMOHouse").parent().parent().removeClass("hide");
            $("#btn-NafezaIntegration").parent().removeClass("hide");
            $("#btn-GetHouseCRMUpdates").parent().removeClass("hide");
            $("#slTransientPort").parent().removeClass("hide");
            $("#slShipmentPOrC option[value='40']").remove();
            $("#slShipmentPOrC").attr("data-required", true);


        }
        if (pDefaults.UnEditableCompanyName == "NAJ") {
            $(".ClassHideForNAJCompany").addClass("hide");
            $('#slShipmentPOrC').parent().addClass('m-t-xs');
           

        }
        //if (pDefaults.UnEditableCompanyName == "GLS" && !$("#cbIsAir").prop("checked") && $("#cbIsExport").prop("checked")) {
        $("#txtShipmentHouseNumber").attr("data-required", false);
        //}
        //else {
        //    $("#txtShipmentHouseNumber").attr("data-required", true);
        //}
        if ($("#hIsOperationDisabled").val() == false) {
            $("#divShipmentPackageBtns").removeClass("hide");
            //$("#divShipmentPackage").removeClass("hide");
        }
        else {
            $("#divShipmentPackageBtns").addClass("hide");
            //$("#divShipmentPackage").addClass("hide");
        }
        if ($("#cbIsConsolidation").prop("checked")) {
            $("#divShipmentContainers").removeClass("hide"); //in EditPackageModal 
        }
        else {
            $("#divShipmentContainers").addClass("hide"); //in EditPackageModal
        }
        //FadePageCover(true);
        $("#tblShipmentPackage tbody").html("");
        ClearAll("#ShipmentModal");
        ClearAll("#ClearancePropertiesModal");
        //jQuery("#ShipmentModal").modal("show");
        $("#slClearanceCurrency").val(pDefaults.CurrencyID);
        $("#lblShownShipment").html("");
        $("#txtOperationOpenDate").val(getTodaysDateInddMMyyyyFormat());
        $("#txtOperationCloseDate").val($("#txtCloseDate").val());
        if (pDefaults.UnEditableCompanyName == "KDM")
            $("#txtShipmentHouseNumber").val($("#txtOperationReleaseNumber").val());
        else if (pDefaults.UnEditableCompanyName == "VER" || pDefaults.UnEditableCompanyName == "ELI") //mostaa
            $("#txtShipmentHouseNumber").val($("#hOperationCode").val());
        $("#txtShipmentHouseNumber").removeAttr("disabled");
        //DeliveryCity_GetList(null, $("#hPODCountryID").val());
     
        if (IsMESCOCompany) {
            $("#slOperationPOrC option[value='40']").remove();

        }
        $("#slShipmentPOrC").html($("#slOperationPOrC").html());
        $("#slShipmentPOrC").val(3);
        Shipments_CompanyConfigurations();

        var pParametersWithValues = { pMasterOperationID: $("#hOperationID").val(), pShipmentID: 0, pDefaultCountryID: pDefaults.DefaultCountryID, pShowUserSalesmen: pDefaults.ShowUserSalesmen, pUnEditableCompanyName: pDefaults.UnEditableCompanyName, pFromOperation: true, pIsAWB: $("#cbIsAWB").prop("checked"), pMasterDirectionType: pOperationHeader_Global.DirectionType };

        if (IsMESCOCompany && pOperationHeader_Global.ContainerTypes == "0") {
            //in mesco companies you can't add houses if there are no containers in operation'
            swal("Sorry", "Add container first!");
        }
        else {
            FadePageCover(true);
            jQuery("#ShipmentModal").modal("show");
            if (pDefaults.UnEditableCompanyName == "UNF")
            {

                $("#txtShipmentACIDDetails").parent().addClass("hide");

            }
            CallGETFunctionWithParameters("/api/Operations/FillShipmentControls_New", pParametersWithValues
                , function (pData) {
                    debugger;
                    FadePageCover(false);
                    //var pShipmentHeader = JSON.parse(pData[0]); //this is new
                    //var pCustomers = pData[1];
                    //var pAgents = pData[2];
                    //var pShipmentPackages = pData[3]; //this is new
                    var pPackageTypes = pData[4];
                    var pFinalDestination = pData[5];
                    var pContainers = pData[6];
                    var pNotifyID = pData[7];
                    var pPickupCityList = pData[12];
                    var pCountryList = pData[13];
                    var pVessels = pData[18];

                    //FillListFromObject(null, 2, "<--Select-->", "slShippers", pCustomers
                    //    , function () {
                    //        $("#slConsignees").html($("#slShippers").html()); $("#slConsignees").val("");
                    //        $("#slNotify").html($("#slShippers").html()); $("#slNotify").val("");
                    //    });
                    //$("#slConsignees").html($("#hReadySlCustomers").html());
                    //$("#slConsignees2").html($("#hReadySlCustomers").html());
                    //$("#slShippers").html($("#hReadySlCustomers").html());
                    //$("#slNotify").html($("#hReadySlCustomers").html());
                    //$("#slAgents").html($("#hReadySlAgents").html());
                    //FillListFromObject(null, 2, "<--Select-->", "slAgents", pAgents, null);
                    $("#slPackageTypes").val("");  //FillListFromObject(null, 2, "<--Select-->", "slPackageTypes", pPackageTypes, null);
                    //$("#slShipmentPackageTypes").html($("#slPackageTypes").html());

                    $("#slDeliveryCity").val(pOperationHeader_Global.POD);
                    $("#slPickupCity").val(pOperationHeader_Global.POL);
                    $("#slPickupCountry").val(pOperationHeader_Global.POLCountryID);
                    $("#slDeliveryCountry").val(pOperationHeader_Global.PODCountryID);
                    $("#slAgents").val(pOperationHeader_Global.AgentID);
                    //FillListFromObject(pOperationHeader_Global.POD, 4, "<--Select-->", "slDeliveryCity", pFinalDestination, null);
                    //FillListFromObject(pOperationHeader_Global.POL, 4, "<--Select-->", "slPickupCity", pPickupCityList, null);
                    //FillListFromObject($("#hPOLCountryID").val(), 2, "<--Select-->", "slPickupCountry", pCountryList, function () { $("#slDeliveryCountry").html($("#slPickupCountry").html()); $("#slDeliveryCountry").val($("#hPODCountryID").val()); });
                    FillListFromObject(null, 11, "<--Select-->", "slShipmentContainers", pContainers, null); //to be used when open PackagesModal
                    //FillListFromObject($("#slOperationVesselID").val(), 2, "<--Select-->", "slShipmentVesselID", pVessels, null);

                    if (pDefaults.UnEditableCompanyName == "UNF" && pHouseParentID == undefined) {
                        $("#slOperationMoveTypes").val(pOperationHeader_Global.MoveTypeID);
                        $("#slAgents").val(pOperationHeader_Global.AgentID);
                        $("#slAgents").trigger("change");
                        $("#slShipmentVesselID").val(pOperationHeader_Global.VesselID);
                        $("#slShipmentVesselID").trigger("change");
                        $("#ViewPROnly").remove();
                        $("#ViewPROnly2").remove();
                    } else if (IsMESCOCompany && pHouseParentID == undefined) {
                        ApplySelectListSearch();
                        $("#slShipmentVesselID").val(pOperationHeader_Global.VesselID);
                        $("#slShipmentVesselID").trigger("change");
                    } else {
                        ApplySelectListSearch();
                        $("#slShipmentVesselID").trigger("change");
                    }
                    InitializeShipmentCustomersSelectSearch();

                    $('#slConsignees').val(0).trigger('change');
                    $('#slConsignees2').val(0).trigger('change');
                    $('#slShippers').val(0).trigger('change');
                    $('#slNotify').val(0).trigger('change');
                    $('#slForwarderBLDocuments').val(0).trigger('change');

                    /*if ($('#slConsignees2').find("option[value='']").length) {
                        $('#slConsignees2').val('').trigger('change');
                    } else {
                        let newOption = new Option("Select", '', true, true);
                        $('#slConsignees2').append(newOption).trigger('change');
                    }
                    if ($('#slShippers').find("option[value='']").length) {
                        $('#slShippers').val('').trigger('change');
                    } else {
                        let newOption = new Option("Select", '', true, true);
                        $('#slShippers').append(newOption).trigger('change');
                    }
                    if ($('#slNotify').find("option[value='']").length) {
                        $('#slNotify').val('').trigger('change');
                    } else {
                        let newOption = new Option("Select", '', true, true);
                        $('#slNotify').append(newOption).trigger('change');
                    }
                    if ($('#slForwarderBLDocuments').find("option[value='']").length) {
                        $('#slForwarderBLDocuments').val('').trigger('change');
                    } else {
                        let newOption = new Option("Select", '', true, true);
                        $('#slForwarderBLDocuments').append(newOption).trigger('change');
                    }*/
                    
         
                }
                , null);


            if (pDefaults.UnEditableCompanyName == "MAN" || pDefaults.UnEditableCompanyName == "TRI" || pDefaults.UnEditableCompanyName == "HOR")
            {

                $("#slOperationBranch").html($("#slOperationEditBranch").html());
                $('#slOperationBranch').prop('disabled', false);
                $("#slOperationBranch  option").each(function () {
                    
                        $(this).prop('disabled', false);
                });
            }else
            $("#slOperationBranch").html($("#slOperationEditBranch").html());
            $("#slOperationSalesman").html($("#slOperationEditSalesman").html()); 
            $("#slOperationSalesman").val(IsMESCOCompany ? $("#slOperationEditSalesman").val() : $("#hLoggedUserID").val());
            if (IsMESCOCompany) {
                $("#slOperationSalesman").attr("disabled", true);
            }
            if ($("#hDirectionType").val() == constImportDirectionType) {
                $("#slConsignees").attr("data-required", true);
                $("#slShippers").attr("data-required", false);
            }
            else { //Export or Domestic
                $("#slShippers").attr("data-required", true);
                $("#slConsignees").attr("data-required", false);
            }
            //parameter in the next 3 lines are 1:Quotations call, 2:Operations call
            $("#btn-NewAddShipper").attr("onclick", "Customers_ClearAllControls(1);");
            $("#btn-NewAddConsignee").attr("onclick", "Customers_ClearAllControls(1);");
            $("#btn-NewAddNotify").attr("onclick", "Customers_ClearAllControls(1);");
            $("#btn-NewAddAgent").attr("onclick", "Agents_ClearAllControls(1);");
            $("#btn-NewAddVessel").attr("onclick", "Vessels_ClearAllControls(null,2);");

            $("#btn-EditShipper").attr("onclick", "Customers_FillControlsFromOperations($('#slShippers option:selected').val(), null, 1);");
            $("#btn-EditConsignee").attr("onclick", "Customers_FillControlsFromOperations($('#slConsignees option:selected').val(), null, 1);");
            $("#btn-EditNotify").attr("onclick", "Customers_FillControlsFromOperations($('#slNotify option:selected').val(), null, 1);");
            $("#btn-EditAgent").attr("onclick", "Agents_FillControlsFromOperations($('#slAgents option:selected').val(), null, 1);");

            $("#btnSaveShipment").attr("onclick", "Operations_Insert(true,true, function(pData) { if (pData[3] != '') swal('Sorry', pData[3]); else { Shipments_ConnectOrDisconnect(pData[1], true, true); $('#hShipmentID').val(pData[1]); $('#txtShipmentHouseNumber').val(pData[2]); $('#btnSaveShipment').attr('onclick','Shipment_Update();'); swal('Success', 'Saved Successfully.'); } });");
            $("#btnSaveClearanceProperties").attr("onclick", "Operations_Insert(true,true, function(pData) { if (pData[3] != '') swal('Sorry', pData[3]); else { Shipments_ConnectOrDisconnect(pData[1], true, true); $('#hShipmentID').val(pData[1]); $('#txtShipmentHouseNumber').val(pData[2]); $('#btnSaveClearanceProperties').attr('onclick','Shipment_Update();'); swal('Success', 'Saved Successfully.'); } });");
            if (pHouseParentID !== "") $("#hHouseParentID").val(pHouseParentID);
            //$("#btnSaveandNewShipment").attr("onclick", "Operations_Insert(true);");
        }
    }
    if (pDefaults.UnEditableCompanyName === "MAN" && $("#hDirectionType").val() == 2) {
        var maxSerial = 0;
        var tableBody = document.getElementById("tblBodyConnectedShipments"); 
        var rows = tableBody.getElementsByTagName("tr");

        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];

           
            if (row.style.display === "none") {
                continue; 
            }

            var hwbCell = row.querySelector(".HWB");
            if (hwbCell) {
                var str = hwbCell.textContent.trim();
                console.log("HWB Value: ", str);

                var parts = str.split("/");
                if (parts.length > 1) {
                    var numAfterSlash = parts[1].trim();
                    var intNum = (numAfterSlash === "" ? 0 : parseInt(numAfterSlash, 10));
                    console.log("Parsed integer: ", intNum);
                    maxSerial = Math.max(maxSerial, intNum);
                }
            }
        }

       

        var newSerial = $("#hOperationCode").val() + "/" + (maxSerial + 1);
        $("#txtShipmentHouseNumber").val(newSerial);
        $("#txtShipmentHouseNumber").attr("disabled", "disabled");
    }

}
var _firstHouseId = 0;
function Shipments_FillControls(pID) {
    debugger;
    $(".classShowForUpdate").removeClass("hide");
    //if (pDefaults.UnEditableCompanyName == "GLS" && !$("#cbIsAir").prop("checked") && $("#cbIsExport").prop("checked")) {
    $("#txtShipmentHouseNumber").attr("data-required", false);
    //}
    //else {
    //$("#txtShipmentHouseNumber").attr("data-required", true);
    //}
    if ($("#hIsOperationDisabled").val() == false) {
        $("#divShipmentPackageBtns").removeClass("hide");
        //$("#divShipmentPackage").removeClass("hide");
    }
    else {
        $("#divShipmentPackageBtns").addClass("hide");
        //$("#divShipmentPackage").addClass("hide");
    }
    if ($("#cbIsConsolidation").prop("checked")) {
        $("#divShipmentContainers").removeClass("hide"); //in EditPackageModal 
    }
    else {
        $("#divShipmentContainers").addClass("hide"); //in EditPackageModal
    }
    if (IsMESCOCompany) {
        $("#divForwarder").removeClass("hide");
        $("#divBlStatus").removeClass("hide");
        $("#slShipmentOperationMan").parent().removeClass("hide");
        $("#divStoreLocation").removeClass("hide");
        $("#divQuotationRoute").removeClass("hide");
        $("#txtManifestPreConsignee").parent().removeClass("hide");
        $("#cbPrintHouseConsignee").parent().parent().removeClass("hide");
        $("#cbIsIMOHouse").parent().parent().removeClass("hide");
        $("#btn-NafezaIntegration").parent().removeClass("hide");
        $("#btn-GetHouseCRMUpdates").parent().removeClass("hide");
        $("#slTransientPort").parent().removeClass("hide");
    }
    if (pDefaults.UnEditableCompanyName == "UNF") {
        $("#divQuotationRoute").removeClass("hide");
        $("#txtShipmentACIDDetails").parent().addClass("hide");
    }
    Shipments_CompanyConfigurations();

    FadePageCover(true);
    $("#tblShipmentPackage tbody").html("");
    ClearAll("#ShipmentModal");
    ClearAll("#ClearancePropertiesModal");
    jQuery("#ShipmentModal").modal("show");
    var pParametersWithValues = { pMasterOperationID: $("#hOperationID").val(), pShipmentID: pID, pDefaultCountryID: pDefaults.DefaultCountryID, pShowUserSalesmen: pDefaults.ShowUserSalesmen, pUnEditableCompanyName: pDefaults.UnEditableCompanyName, pFromOperation: true };

    CallGETFunctionWithParameters("/api/Operations/FillShipmentControls", pParametersWithValues
        , function (pData) {
            debugger;
            var pShipmentHeader = JSON.parse(pData[0]);
            //var pCustomers = pData[1];
            //var pAgents = pData[2];
            var pShipmentPackages = pData[3];
            var pPackageTypes = pData[4];
            var pFinalDestination = pData[5];
            var pContainers = pData[6];
            var pNotifyID = pData[7];
            var pMainRoute = JSON.parse(pData[8]);
            var pPickupCityList = pData[12];
            var pCountryList = pData[13];
            var pUsersList = pData[19];
            var pVessel = pData[18];
            _firstHouseId = pData[21];
            var pWareHouseList = pData[22];
            //var pCustomers = pData[23];
            var pQuotationRoutes = pData[25];
            var pPortOfTransiet = pData[26];

            $("#hShipmentID").val(pID);


            if ((pDefaults.UnEditableCompanyName == "ILS" || pDefaults.UnEditableCompanyName == "ILSEG")
                && $("#hDirectionType").val() == constExportDirectionType
                && pShipmentHeader.HouseNumber != "0" && pShipmentHeader.HouseNumber != "")
                $("#txtShipmentHouseNumber").attr("disabled", "disabled");

            //FillListFromObject(pShipmentHeader.ShipperID, 2, "<--Select-->", "slShippers", pCustomers
            //    , function () {
            //        $("#slConsignees").html($("#slShippers").html()); $("#slConsignees").val(pShipmentHeader.ConsigneeID == 0 ? "" : pShipmentHeader.ConsigneeID);
            //        $("#slNotify").html($("#slShippers").html()); $("#slNotify").val(pNotifyID == 0 ? "" : pNotifyID);
            //    });
            $("#slConsignees").html($("#hReadySlCustomers").html()); $("#slConsignees").val(pShipmentHeader.ConsigneeID == 0 ? "" : pShipmentHeader.ConsigneeID);
            $("#slConsignees2").html($("#hReadySlCustomers").html()); $("#slConsignees2").val(pShipmentHeader.ConsigneeID2 == 0 ? "" : pShipmentHeader.ConsigneeID2);
            $("#slShippers").html($("#hReadySlCustomers").html()); $("#slShippers").val(pShipmentHeader.ShipperID == 0 ? "" : pShipmentHeader.ShipperID);
            $("#slAgents").html($("#hReadySlAgents").html()); $("#slAgents").val(pShipmentHeader.AgentID == 0 ? "" : pShipmentHeader.AgentID);
            $("#slNotify").html($("#hReadySlCustomers").html());
            $("#slNotify").val(pNotifyID == 0 ? "" : pNotifyID);

            //FillListFromObject(pShipmentHeader.AgentID, 2, "<--Select-->", "slAgents", pAgents, null);
            FillListFromObject($("#slOperationVesselID").val() /*pShipmentHeader.VesselID*/, 2, "<--Select-->", "slShipmentVesselID", pVessel, null);
            FillListFromObject(null, 2, "<--Select-->", "slPackageTypes", pPackageTypes, null); //to be used when open PackagesModal
            FillListFromObject(pShipmentHeader.DeliveryCityID, 4, "<--Select-->", "slDeliveryCity", pFinalDestination, null);
            FillListFromObject(pShipmentHeader.PickupCityID, 4, "<--Select-->", "slPickupCity", pPickupCityList, null);
            FillListFromObject(pShipmentHeader.PickupCountryID == 0 ? pShipmentHeader.POLCountryID : pShipmentHeader.PickupCountryID, 2, "<--Select-->", "slPickupCountry", pCountryList, function () { $("#slDeliveryCountry").html($("#slPickupCountry").html()); $("#slDeliveryCountry").val(pShipmentHeader.DeliveryCountryID == 0 ? pShipmentHeader.PODCountryID : pShipmentHeader.DeliveryCountryID); });
            FillListFromObject(pShipmentHeader.PickupCountryID == 0 ? pShipmentHeader.POLCountryID : pShipmentHeader.PickupCountryID, 2, "<--Select-->", "slNafezaPickupCountry", pCountryList, null);
            FillListFromObject(null, 11, "<--Select-->", "slShipmentContainers", pContainers, null); //to be used when open PackagesModal
            FillListFromObject(null, 2, "<--Select-->", "slStoreLocationBLDocuments", pWareHouseList, null);
            $("#slForwarderBLDocuments").html($("#hReadySlCustomers").html()); $("#slForwarderBLDocuments").val(pShipmentHeader.ForwarderId == 0 ? "" : pShipmentHeader.ForwarderId);
            //FillListFromObject(null, 2, "<--Select-->", "slForwarderBLDocuments", pCustomers, null);
            FillListFromObject(null, 1, "<--Select-->", "slQuotationRoutes", pQuotationRoutes, null);
            FillListFromObject(null, 2, "<--Select-->", "slTransientPort", pPortOfTransiet, null);



            //$("#slShipmentPackageTypes").html($("#slPackageTypes").html());
            $("#slOperationBranch").html($("#hReadySlBranches").html()); $("#slOperationBranch").val(pShipmentHeader.BranchID);
            $("#slOperationSalesman").html($("#slOperationEditSalesman").html()); $("#slOperationSalesman").val(pShipmentHeader.SalesmanID);
            $("#slOperationMoveTypes").val(pShipmentHeader.MoveTypeID == 0 ? "" : pShipmentHeader.MoveTypeID);
            $("#slShipmentIncoterm").val(pShipmentHeader.IncotermID == 0 ? "" : pShipmentHeader.IncotermID);
            $("#slTransientPort").val(pShipmentHeader.POTID == 0 ? "" : pShipmentHeader.POTID);



            $("#slShipmentCommodities").html($("#slCommodities").html()); $("#slShipmentCommodities").val(pShipmentHeader.CommodityID == 0 ? "" : pShipmentHeader.CommodityID);
            $("#slShipmentPOrC").html($("#slOperationPOrC").html()); $("#slShipmentPOrC").val(pShipmentHeader.POrC == 0 ? "" : pShipmentHeader.POrC);
            //$("#txtShipmentDeliveryOrderNumber").val(pMainRoute.DeliveryOrderNumber == 0 ? "" : pMainRoute.DeliveryOrderNumber);
            $("#txtShipmentDeliveryOrderNumber").val(pShipmentHeader.ID);
            $("#txtShipmentUNNumber").val(pShipmentHeader.UNNumber);
            $("#txtManifestPreConsignee").val(pShipmentHeader.ManifestPreConsignee);
            $("#txtShipmentIMOClass").val(pShipmentHeader.IMOClass);
            $("#txtShipmentDeliveryDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pMainRoute.DeliveryDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pMainRoute.DeliveryDate)));
            $("#txtShipmentReleaseDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pShipmentHeader.ReleaseDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pShipmentHeader.ReleaseDate)));

            $("#txtShipmentBLDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pShipmentHeader.BLDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pShipmentHeader.BLDate)));
            $("#txtShipmentShippedOnBoardDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pShipmentHeader.ShippedOnBoardDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pShipmentHeader.ShippedOnBoardDate)));
            $("#txtShipmentFreightPayableAt").val(pShipmentHeader.FreightPayableAt == 0 ? "" : pShipmentHeader.FreightPayableAt);
            $("#txtShipmentACIDNumber").val(pShipmentHeader.ACIDNumber == 0 ? "" : pShipmentHeader.ACIDNumber);
            $("#txtShipmentACIDDetails").val(pShipmentHeader.ACIDDetails == 0 ? "" : pShipmentHeader.ACIDDetails);
            $("#txtShipmentBookingNumber").val(pShipmentHeader.BookingNumber == 0 ? "" : pShipmentHeader.BookingNumber);
            $("#txtShipmentNumberOfOriginalBills").val(pShipmentHeader.NumberOfOriginalBills == 0 ? "" : pShipmentHeader.NumberOfOriginalBills);

            ShipmentPackage_BindTableRows(JSON.parse(pShipmentPackages));

            $("#lblShownShipment").html(pShipmentHeader.HouseNumber == 0 ? "" : pShipmentHeader.HouseNumber);
            $("#txtShipmentHouseNumber").val(pShipmentHeader.HouseNumber == 0 ? "" : pShipmentHeader.HouseNumber);
            $("#txtShipmentCustomerReference").val(pShipmentHeader.CustomerReference == 0 ? "" : pShipmentHeader.CustomerReference);
            $("#txtShipmentSupplierReference").val(pShipmentHeader.SupplierReference == 0 ? "" : pShipmentHeader.SupplierReference);
            $("#txtShipmentPONumber").val(pShipmentHeader.PONumber == 0 ? "" : pShipmentHeader.PONumber);
            $("#divNotes").val(pShipmentHeader.Notes == 0 ? "" : pShipmentHeader.Notes);
            $("#txtOperationOpenDate").val(ConvertDateFormat(GetDateWithFormatMDY(pShipmentHeader.OpenDate)));
            $("#txtOperationCloseDate").val(ConvertDateFormat(GetDateWithFormatMDY(pShipmentHeader.CloseDate)));

            $("#cbIsDelivered").prop("checked", pShipmentHeader.IsDelivered);
            $("#cbIsReceivedFromShipper").prop("checked", pShipmentHeader.IsReceivedFromShipper);
            if (pDefaults.UnEditableCompanyName == "ELI") {
                cbIsReceivedFromShipperChanged();
            }

            $("#txtShipmentCertificateNumber").val(pShipmentHeader.CertificateNumber == 0 ? "" : pShipmentHeader.CertificateNumber);
            $("#txtShipmentCountryOfOrigin").val(pShipmentHeader.CountryOfOrigin == 0 ? "" : pShipmentHeader.CountryOfOrigin);
            $("#txtShipmentInvoiceValue").val(pShipmentHeader.InvoiceValue == 0 ? "" : pShipmentHeader.InvoiceValue);
            $("#slClearanceCurrency").val(pShipmentHeader.CurrencyID);
            $("#slStoreLocationBLDocuments").val(pShipmentHeader.StoreLocationID == 0 ? "" : pShipmentHeader.StoreLocationID);
            $("#slQuotationRoutes").val(pShipmentHeader.QuotationRouteID == 0 ? "" : pShipmentHeader.QuotationRouteID);
            $("#cbPrintHouseConsignee").prop("checked",pShipmentHeader.PrintHouseConsignee);
            $("#cbIsIMOHouse").prop("checked", pShipmentHeader.IsFleet);
            $("#slBLStatusBLDocuments").val(pShipmentHeader.BlStatus == 0 ? "" : pShipmentHeader.BlStatus);
            $("#slForwarderBLDocuments").val(pShipmentHeader.ForwarderId == 0 ? "" : pShipmentHeader.ForwarderId);

            //Nafeza Integration
            $("#txtNafezaShipperVATNumber").val(pShipmentHeader.ShipperVATNumber);
            $("#txtNafezaConsigneeVATNumber").val(pShipmentHeader.ConsigneeVATNumber);
            $("#txtNafezaACIDNumber").val(pShipmentHeader.ACIDNumber == 0 ? "" : pShipmentHeader.ACIDNumber);
            FadePageCover(false);

            $("#slShippers").css({ "width": "100%" }).select2();
            $("#slConsignees").css({ "width": "100%" }).select2();
            $("#slAgents").css({ "width": "100%" }).select2();
            $("#slNotify").css({ "width": "100%" }).select2();
            //$("#slQuotationRoutes").css({ "width": "100%" }).select2();
            $("#slConsignees2").css({ "width": "100%" }).select2();
            $("div[tabindex='-1']").removeAttr('tabindex');

            if (IsMESCOCompany && ['CONSOL', 'LCL'].includes(pOperationHeader_Global.ShipmentTypeCode)) {
                CargoProperties_FillControls(20,true);
                jQuery("#CargoPropertiesModal").modal("hide");
            }

        }
        , null);

    if ($("#hDirectionType").val() == constImportDirectionType) {
        $("#slConsignees").attr("data-required", true);
        $("#slShippers").attr("data-required", false);
    }
    else { //Export or Domestic
        $("#slShippers").attr("data-required", true);
        $("#slConsignees").attr("data-required", false);
   
    }
    //parameter in the next 3 lines are 1:Quotations call, 2:Operations call
    $("#btn-NewAddShipper").attr("onclick", "Customers_ClearAllControls(1,1);");
    $("#btn-NewAddConsignee").attr("onclick", "Customers_ClearAllControls(1,1);");
    $("#btn-NewAddNotify").attr("onclick", "Customers_ClearAllControls(1,1);");
    $("#btn-NewAddAgent").attr("onclick", "Agents_ClearAllControls(1);");
    $("#btn-NewAddAgentForBLDocuments").attr("onclick", "Agents_ClearAllControls(1);");
    $("#btn-NewAddVessel").attr("onclick", "Vessels_ClearAllControls(null,2);");

    $("#btn-EditShipper").attr("onclick", "Customers_FillControlsFromOperations($('#slShippers option:selected').val(), null, 1);");
    $("#btn-EditConsignee").attr("onclick", "Customers_FillControlsFromOperations($('#slConsignees option:selected').val(), null, 1);");
    $("#btn-EditNotify").attr("onclick", "Customers_FillControlsFromOperations($('#slNotify option:selected').val(), null, 1);");
    $("#btn-EditAgent").attr("onclick", "Agents_FillControlsFromOperations($('#slAgents option:selected').val(), null, 1);");

    $("#btnSaveShipment").attr("onclick", "Shipment_Update();");
    $("#btnSaveClearanceProperties").attr("onclick", "Shipment_Update();");
    debugger;
    if (pDefaults.UnEditableCompanyName == "TRI") {

        $("#slOperationBranch").html($("#slOperationEditBranch").html());
        $('#slOperationBranch').prop('disabled', false);
        $("#slOperationBranch  option").each(function () {

            $(this).prop('disabled', false);
        });
    }
}

function Shipments_FillControls_New(pID) {
    debugger;
    ResetQuotationRoutes();
    if (pDefaults.UnEditableCompanyName == "UNF" && $("#hDirectionType").val() == 2) {
        $("#lblOperationPONumber").text("Customs Release Number");

    }
    $(".classShowForUpdate").removeClass("hide");
    //if (pDefaults.UnEditableCompanyName == "GLS" && !$("#cbIsAir").prop("checked") && $("#cbIsExport").prop("checked")) {
    $("#txtShipmentHouseNumber").attr("data-required", false);
    //}
    //else {
    //$("#txtShipmentHouseNumber").attr("data-required", true);
    //}


    if (pDefaults.UnEditableCompanyName == "SEF") {
        $("#lblReferenceNumber").parent().removeClass("hide");

    }

    if (pDefaults.UnEditableCompanyName == "NAJ")
    {
        $(".ClassHideForNAJCompany").addClass("hide");
        $('#slOperationMoveTypes').parent().addClass('m-t-xs');
        $('#divOperationMoveTypes').removeAttr('required');
    }
    if ($("#hIsOperationDisabled").val() == false) {
        $("#divShipmentPackageBtns").removeClass("hide");
        //$("#divShipmentPackage").removeClass("hide");
    }
    else {
        $("#divShipmentPackageBtns").addClass("hide");
        //$("#divShipmentPackage").addClass("hide");
    }
    if ($("#cbIsConsolidation").prop("checked")) {
        $("#divShipmentContainers").removeClass("hide"); //in EditPackageModal 
    }
    else {
        $("#divShipmentContainers").addClass("hide"); //in EditPackageModal
    }
    if (IsMESCOCompany) {
        $("#divForwarder").removeClass("hide");
        $("#divBlStatus").removeClass("hide");
        $("#divStoreLocation").removeClass("hide");
        $("#divQuotationRoute").removeClass("hide");
        $("#txtManifestPreConsignee").parent().removeClass("hide");
        $("#cbPrintHouseConsignee").parent().parent().removeClass("hide");
        $("#cbIsIMOHouse").parent().parent().removeClass("hide");
        $("#btn-NafezaIntegration").parent().removeClass("hide");
        $("#btn-GetHouseCRMUpdates").parent().removeClass("hide");
        $("#slTransientPort").parent().removeClass("hide");
        $("#cbIsIMOHouse").parent().after("<span> | Chemical</span>");
        $("#slShipmentPOrC").attr("data-required", true);
        $("#slShipmentOperationMan").parent().removeClass("hide");

    }
    if (pDefaults.UnEditableCompanyName == "UNF") {
        $("#divQuotationRoute").removeClass("hide");
        $("#txtShipmentACIDDetails").parent().addClass("hide");
        $("#slShipmentPOrC").attr("data-required", true);


    }
    if (pOperationHeader_Global.ShipmentType == 30 && pDefaults.UnEditableCompanyName == "TLS") {
        $("#btn-SetVechileProperties_Shipment").removeClass("hide");
        $("#btn-SetCargoProperties_Shipment").addClass("hide");
    }
    else if (pOperationHeader_Global.ShipmentType != 30 && pDefaults.UnEditableCompanyName == "TLS") {
        $("#btn-SetVechileProperties_Shipment").addClass("hide");
        $("#btn-SetCargoProperties_Shipment").addClass("hide");
    }
    Shipments_CompanyConfigurations();

    FadePageCover(true);
    $("#tblShipmentPackage tbody").html("");
    ClearAll("#ShipmentModal");
    ClearAll("#ClearancePropertiesModal");
    jQuery("#ShipmentModal").modal("show");
    var pParametersWithValues = { pMasterOperationID: $("#hOperationID").val(), pShipmentID: pID, pDefaultCountryID: pDefaults.DefaultCountryID, pShowUserSalesmen: pDefaults.ShowUserSalesmen, pUnEditableCompanyName: pDefaults.UnEditableCompanyName, pFromOperation: true, pIsAWB: $("#cbIsAWB").prop("checked"), pMasterDirectionType: pOperationHeader_Global.DirectionType };

    CallGETFunctionWithParameters("/api/Operations/FillShipmentControls_New", pParametersWithValues
        , function (pData) {
            debugger;
            var pShipmentHeader = JSON.parse(pData[0]);
            //var pCustomers = pData[1];
            //var pAgents = pData[2];
            var pShipmentPackages = pData[3];
            var pPackageTypes = pData[4];
            var pFinalDestination = pData[5];
            var pContainers = pData[6];
            var pNotifyID = pData[7];
            var pMainRoute = JSON.parse(pData[8]);
            var pPickupCityList = pData[12];
            var pCountryList = pData[13];
            var pVessel = pData[18];
            //_firstHouseId = pData[21];
            var pWareHouseList = pData[22];
            //var pCustomers = pData[23];
            var pQuotationRoutes = pData[25];
            var pPortOfTransiet = pData[26];
            var users = pData[28];
            var ConsigneeName = pData[29];
            var Consignee2Name = pData[30];
            var NotifyName = pData[31];
            var ShipperName = pData[32];
            var ForwarderName = pData[33];
            var pHouseVechiles = pData[34];
            var QuotationRouteID = pData[35];
            var QuotationRouteCode = pData[36];
            var Rec = pData[37];
            var Pay = pData[38];
            var PrintType = pData[39];


            $("#hShipmentID").val(pID);
            if (pDefaults.UnEditableCompanyName == "UNF") {
                $("#valPrintTypeHBLSelected").val(PrintType);
            }

            //Rec = Rec.replaceAll('|', '\n');
            if (pDefaults.UnEditableCompanyName == "UNF") {
                $("#ViewPROnly").remove();
                $("#ViewPROnly2").remove();

                $("#divNotes").parent().after(`<div id="ViewPROnly" class="form-group col-sm-6"><h3>Payables</h3><p style="white-space: pre;">${Pay}</p></div>`);
                $("#divNotes").parent().after(`<div id="ViewPROnly2" class="form-group col-sm-6"><h3>Receivables</h3><p style="white-space: pre;">${Rec}</p></div>`);
            }

            if ((pDefaults.UnEditableCompanyName == "ILS" || pDefaults.UnEditableCompanyName == "ILSEG")
                && $("#hDirectionType").val() == constExportDirectionType
                && pShipmentHeader.HouseNumber != "0" && pShipmentHeader.HouseNumber != "")
                $("#txtShipmentHouseNumber").attr("disabled", "disabled");

            //FillListFromObject(pShipmentHeader.ShipperID, 2, "<--Select-->", "slShippers", pCustomers
            //    , function () {
            //        $("#slConsignees").html($("#slShippers").html()); $("#slConsignees").val(pShipmentHeader.ConsigneeID == 0 ? "" : pShipmentHeader.ConsigneeID);
            //        $("#slNotify").html($("#slShippers").html()); $("#slNotify").val(pNotifyID == 0 ? "" : pNotifyID);
            //    });
            //$("#slConsignees").html($("#hReadySlCustomers").html());
            //$("#slConsignees").val(pShipmentHeader.ConsigneeID == 0 ? "" : pShipmentHeader.ConsigneeID);
            $('#slShippers').attr('onchange', '');
            $('#slConsignees').attr('onchange', '');
            $('#slNotify').attr('onchange', '');

            InitializeShipmentCustomersSelectSearch();
            if ($('#slConsignees').find("option[value='" + pShipmentHeader.ConsigneeID + "']").length) {
                $('#slConsignees').val(pShipmentHeader.ConsigneeID).trigger('change');
            } else {
                let newOption = new Option(ConsigneeName, pShipmentHeader.ConsigneeID, true, true);
                $('#slConsignees').append(newOption).trigger('change');
            }
            if ($('#slConsignees2').find("option[value='" + pShipmentHeader.ConsigneeID2 + "']").length) {
                $('#slConsignees2').val(pShipmentHeader.ConsigneeID2).trigger('change');
            } else {
                let newOption = new Option(Consignee2Name, pShipmentHeader.ConsigneeID2, true, true);
                $('#slConsignees2').append(newOption).trigger('change');
            }
            if ($('#slShippers').find("option[value='" + pShipmentHeader.ShipperID + "']").length) {
                $('#slShippers').val(pShipmentHeader.ShipperID).trigger('change');
            } else {
                let newOption = new Option(ShipperName, pShipmentHeader.ShipperID, true, true);
                $('#slShippers').append(newOption).trigger('change');
            }
            if ($('#slNotify').find("option[value='" + pNotifyID + "']").length) {
                $('#slNotify').val(pNotifyID).trigger('change');
            } else {
                let newOption = new Option(NotifyName, pNotifyID, true, true);
                $('#slNotify').append(newOption).trigger('change');
            }

            $('#slShippers').attr('onchange', "OnCustomerChanged('slShippers', 'divShipperAddress');");
            $('#slConsignees').attr('onchange', "OnCustomerChanged('slConsignees', 'divConsigneeAddress');");
            $('#slNotify').attr('onchange', "OnCustomerChanged('slNotify', 'divNotifyAddress');");
            if (IsMESCOCompany)
                FillListFromObject(pShipmentHeader.OperationManID, 2, "<--Select-->", "slShipmentOperationMan", users, null);

            
            $('#slQuotationRoutes').removeAttr('onchange');
            if ($('#slQuotationRoutes').find("option[value='" + QuotationRouteID + "']").length) {
                $('#slQuotationRoutes').val(QuotationRouteID).trigger('change');
            } else {
                let newOption = new Option(QuotationRouteCode, QuotationRouteID, true, true);
                $('#slQuotationRoutes').append(newOption).trigger('change');
            }
            $('#slQuotationRoutes').attr('onchange', 'ChangeLinkedCRMQuotation();');

            if (QuotationRouteID == 0)
                $("#btn-GetHouseCRMUpdates").attr("disabled", true);
            else
                $("#btn-GetHouseCRMUpdates").attr("disabled", false);

            if (IsMESCOCompany) {
                if (pOperationHeader_Global.OperationStageID == 110 || pOperationHeader_Global.OperationStageID == 120 || pOperationHeader_Global.OperationStageID == 130) {
                    $("#btn-GetHouseCRMUpdates").parent().addClass("hide");
                }
            }
            //$("#slConsignees2").html($("#hReadySlCustomers").html());
            //$("#slConsignees2").val(pShipmentHeader.ConsigneeID2 == 0 ? "" : pShipmentHeader.ConsigneeID2);
            //$("#slShippers").html($("#hReadySlCustomers").html());
            //$("#slShippers").val(pShipmentHeader.ShipperID == 0 ? "" : pShipmentHeader.ShipperID);
            //$("#slAgents").html($("#hReadySlAgents").html());
            $("#slAgents").val(pShipmentHeader.AgentID == 0 ? "" : pShipmentHeader.AgentID);
            //$("#slNotify").html($("#hReadySlCustomers").html());
            //$("#slNotify").val(pNotifyID == 0 ? "" : pNotifyID);
            
            //FillListFromObject(pShipmentHeader.AgentID, 2, "<--Select-->", "slAgents", pAgents, null);
            //FillListFromObject($("#slOperationVesselID").val() /*pShipmentHeader.VesselID*/, 2, "<--Select-->", "slShipmentVesselID", pVessel, null);
            
            $("#slShipmentVesselID").val(pShipmentHeader.VesselID);
            $("#slShipmentVesselID").trigger("change");
            
            //FillListFromObject(null, 2, "<--Select-->", "slPackageTypes", pPackageTypes, null); //to be used when open PackagesModal
            FillListFromObject(pShipmentHeader.DeliveryCityID, 4, "<--Select-->", "slDeliveryCity", pFinalDestination, null);
            FillListFromObject(pShipmentHeader.PickupCityID, 4, "<--Select-->", "slPickupCity", pPickupCityList, null);
            if (pDefaults.UnEditableCompanyName == "UNF") {
                $("#slPickupCity").val(pShipmentHeader.POL);
                $("#slDeliveryCity").val(pShipmentHeader.POD);
                FillListFromObject(pShipmentHeader.SalesmanID, 2, "<--Select-->", "slOperationSalesman", users, null);
            }

            $("#slPickupCountry").val(pShipmentHeader.POLCountryID == 0 ? "" : pShipmentHeader.POLCountryID);
            $("#slDeliveryCountry").val(pShipmentHeader.PODCountryID == 0 ? "" : pShipmentHeader.PODCountryID);
            //FillListFromObject(pShipmentHeader.PickupCountryID == 0 ? pShipmentHeader.POLCountryID : pShipmentHeader.PickupCountryID, 2, "<--Select-->", "slPickupCountry", pCountryList, function () { $("#slDeliveryCountry").html($("#slPickupCountry").html()); $("#slDeliveryCountry").val(pShipmentHeader.DeliveryCountryID == 0 ? pShipmentHeader.PODCountryID : pShipmentHeader.DeliveryCountryID); });
            //FillListFromObject(pShipmentHeader.PickupCountryID == 0 ? pShipmentHeader.POLCountryID : pShipmentHeader.PickupCountryID, 2, "<--Select-->", "slNafezaPickupCountry", pCountryList, null);
            debugger;
            FillListFromObject(null, 11, "<--Select-->", "slShipmentContainers", pContainers, null); //to be used when open PackagesModal
            //FillListFromObject(null, 2, "<--Select-->", "slStoreLocationBLDocuments", pWareHouseList, null);
            //$("#slForwarderBLDocuments").html($("#hReadySlCustomers").html());
            //$("#slForwarderBLDocuments").val(pShipmentHeader.ForwarderId == 0 ? "" : pShipmentHeader.ForwarderId);
            //FillListFromObject(null, 2, "<--Select-->", "slForwarderBLDocuments", pCustomers, null);
            //FillListFromObject(null, 1, "<--Select-->", "slQuotationRoutes", pQuotationRoutes, null);
            //FillListFromObject(null, 2, "<--Select-->", "slTransientPort", pPortOfTransiet, null);
            if ($('#slForwarderBLDocuments').find("option[value='" + pShipmentHeader.ForwarderId + "']").length) {
                $('#slForwarderBLDocuments').val(pShipmentHeader.ForwarderId).trigger('change');
            } else {
                let newOption = new Option(ForwarderName, pShipmentHeader.ForwarderId, true, true);
                $('#slForwarderBLDocuments').append(newOption).trigger('change');
            }

            //$("#slShipmentPackageTypes").html($("#slPackageTypes").html());
            $("#slOperationBranch").html($("#hReadySlBranches").html()); $("#slOperationBranch").val(pShipmentHeader.BranchID);
            //$("#slOperationSalesman").html($("#slOperationEditSalesman").html());
            $("#slOperationSalesman").val(pShipmentHeader.SalesmanID);
            $("#slOperationMoveTypes").val(pShipmentHeader.MoveTypeID == 0 ? "" : pShipmentHeader.MoveTypeID);
            $("#slShipmentIncoterm").val(pShipmentHeader.IncotermID == 0 ? "" : pShipmentHeader.IncotermID);
            $("#slTransientPort").val(pShipmentHeader.POTID == 0 ? "" : pShipmentHeader.POTID);
            $("#txtReferenceNumber").val(pShipmentHeader.ReferenceNumber == 0 ? "" : pShipmentHeader.ReferenceNumber);



            $("#slShipmentCommodities").html($("#slCommodities").html()); $("#slShipmentCommodities").val(pShipmentHeader.CommodityID == 0 ? "" : pShipmentHeader.CommodityID);
            if(IsMESCOCompany)
            $("#slOperationPOrC option[value='40']").remove();
            $("#slShipmentPOrC").html($("#slOperationPOrC").html()); $("#slShipmentPOrC").val(pShipmentHeader.POrC == 0 ? "" : pShipmentHeader.POrC);
            //$("#txtShipmentDeliveryOrderNumber").val(pMainRoute.DeliveryOrderNumber == 0 ? "" : pMainRoute.DeliveryOrderNumber);
            $("#txtShipmentDeliveryOrderNumber").val(pShipmentHeader.ID);
            $("#txtShipmentUNNumber").val(pShipmentHeader.UNNumber);
            $("#txtManifestPreConsignee").val(pShipmentHeader.ManifestPreConsignee);
            $("#txtShipmentIMOClass").val(pShipmentHeader.IMOClass);
            $("#txtShipmentDeliveryDate").val(pMainRoute == null ? "01/01/1900" : (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pMainRoute.DeliveryDate)) < 1 || Date.prototype.compareDates("01/01/01", GetDateWithFormatMDY(pMainRoute.DeliveryDate)) < 1) ? "" : ConvertDateFormat(GetDateWithFormatMDY(pMainRoute.DeliveryDate)));
            $("#txtShipmentReleaseDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pShipmentHeader.ReleaseDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pShipmentHeader.ReleaseDate)));

            $("#txtShipmentBLDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pShipmentHeader.BLDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pShipmentHeader.BLDate)));
            $("#txtShipmentShippedOnBoardDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pShipmentHeader.ShippedOnBoardDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pShipmentHeader.ShippedOnBoardDate)));
            $("#txtShipmentFreightPayableAt").val(pShipmentHeader.FreightPayableAt == 0 ? "" : pShipmentHeader.FreightPayableAt);
            $("#txtShipmentACIDNumber").val(pShipmentHeader.ACIDNumber == 0 ? "" : pShipmentHeader.ACIDNumber);
            $("#txtShipmentACIDDetails").val(pShipmentHeader.ACIDDetails == 0 ? "" : pShipmentHeader.ACIDDetails);
            $("#txtShipmentBookingNumber").val(pShipmentHeader.BookingNumber == 0 ? "" : pShipmentHeader.BookingNumber);
            $("#txtShipmentNumberOfOriginalBills").val(pShipmentHeader.NumberOfOriginalBills == 0 ? "" : pShipmentHeader.NumberOfOriginalBills);
            $("#slNoOfOriginals").val(pShipmentHeader.NumberOfOriginalBills == 0 ? "" : pShipmentHeader.NumberOfOriginalBills);
            ShipmentPackage_BindTableRows(JSON.parse(pShipmentPackages));
            if (pHouseVechiles != "[]")
                HouseVechiles_BindTableRows(JSON.parse(pHouseVechiles));

            $("#lblShownShipment").html(pShipmentHeader.HouseNumber == 0 ? "" : pShipmentHeader.HouseNumber);

                $("#txtShipmentHouseNumber").val(pShipmentHeader.HouseNumber == 0 ? "" : pShipmentHeader.HouseNumber);

            if (pDefaults.UnEditableCompanyName == "MAN" && $("#hDirectionType").val() == 2 ) {
                if ($("#txtShipmentHouseNumber").val().includes($("#hOperationCode").val())) {
                    $("#txtShipmentHouseNumber").attr("disabled", 'disabled');
                } else {
                    $("#txtShipmentHouseNumber").removeAttr("disabled");
                }
            }



            $("#txtShipmentCustomerReference").val(pShipmentHeader.CustomerReference == 0 ? "" : pShipmentHeader.CustomerReference);
            $("#txtShipmentSupplierReference").val(pShipmentHeader.SupplierReference == 0 ? "" : pShipmentHeader.SupplierReference);
            $("#txtShipmentPONumber").val(pShipmentHeader.PONumber == 0 ? "" : pShipmentHeader.PONumber);
            $("#divNotes").val(pShipmentHeader.Notes == 0 ? "" : pShipmentHeader.Notes);
            $("#txtOperationOpenDate").val(ConvertDateFormat(GetDateWithFormatMDY(pShipmentHeader.OpenDate)));
            $("#txtOperationCloseDate").val(ConvertDateFormat(GetDateWithFormatMDY(pShipmentHeader.CloseDate)));

            $("#cbIsDelivered").prop("checked", pShipmentHeader.IsDelivered);
            $("#cbIsReceivedFromShipper").prop("checked", pShipmentHeader.IsReceivedFromShipper);
            if (pDefaults.UnEditableCompanyName == "ELI") {
                cbIsReceivedFromShipperChanged();
            }

            $("#txtShipmentCertificateNumber").val(pShipmentHeader.CertificateNumber == 0 ? "" : pShipmentHeader.CertificateNumber);
            $("#txtShipmentCountryOfOrigin").val(pShipmentHeader.CountryOfOrigin == 0 ? "" : pShipmentHeader.CountryOfOrigin);
            $("#txtShipmentInvoiceValue").val(pShipmentHeader.InvoiceValue == 0 ? "" : pShipmentHeader.InvoiceValue);
            $("#slClearanceCurrency").val(pShipmentHeader.CurrencyID);
            $("#slStoreLocationBLDocuments").val(pShipmentHeader.StoreLocation == 0 ? "" : pShipmentHeader.StoreLocation);
            //$("#slQuotationRoutes").val(pShipmentHeader.QuotationRouteID == 0 ? "" : pShipmentHeader.QuotationRouteID);
            $("#cbPrintHouseConsignee").prop("checked", pShipmentHeader.PrintHouseConsignee);
            $("#cbIsIMOHouse").prop("checked", pShipmentHeader.IsFleet);
            $("#slBLStatusBLDocuments").val(pShipmentHeader.BlStatus == 0 ? "" : pShipmentHeader.BlStatus);
            //$("#slForwarderBLDocuments").val(pShipmentHeader.ForwarderId == 0 ? "" : pShipmentHeader.ForwarderId);

            //Nafeza Integration
            $("#txtNafezaShipperVATNumber").val(pShipmentHeader.ShipperVATNumber);
            $("#txtNafezaConsigneeVATNumber").val(pShipmentHeader.ConsigneeVATNumber);
            $("#txtNafezaACIDNumber").val(pShipmentHeader.ACIDNumber == 0 ? "" : pShipmentHeader.ACIDNumber);

            $("#divShipperAddress").val(pShipmentHeader.Form13Notes == 0 ? "" : pShipmentHeader.Form13Notes);
            $("#divConsigneeAddress").val(pShipmentHeader.Form13Number == 0 ? "" : pShipmentHeader.Form13Number);
            $("#divNotifyAddress").val(pShipmentHeader.BusinessUnit == 0 ? "" : pShipmentHeader.BusinessUnit);
            $("#txtShipmentIMOClass2").val(pShipmentHeader.BusinessUnit2 == 0 ? "" : pShipmentHeader.BusinessUnit2);

            FadePageCover(false);

            //$("#slShippers").css({ "width": "100%" }).select2();
            //$("#slConsignees").css({ "width": "100%" }).select2();
            $("#slAgents").css({ "width": "100%" }).select2();
            //$("#slNotify").css({ "width": "100%" }).select2();
            //$("#slQuotationRoutes").css({ "width": "100%" }).select2();
            //$("#slConsignees2").css({ "width": "100%" }).select2();
            $("div[tabindex='-1']").removeAttr('tabindex');

            if (IsMESCOCompany && ['CONSOL', 'LCL'].includes(pOperationHeader_Global.ShipmentTypeCode)) {
                CargoProperties_FillControls(20, true);
                jQuery("#CargoPropertiesModal").modal("hide");
            }

        }
        , null);

    if ($("#hDirectionType").val() == constImportDirectionType) {
        $("#slConsignees").attr("data-required", true);
        $("#slShippers").attr("data-required", false);
    }
    else { //Export or Domestic
        $("#slShippers").attr("data-required", true);
        $("#slConsignees").attr("data-required", false);
    }
    //parameter in the next 3 lines are 1:Quotations call, 2:Operations call
    $("#btn-NewAddShipper").attr("onclick", "Customers_ClearAllControls(1,1);");
    $("#btn-NewAddConsignee").attr("onclick", "Customers_ClearAllControls(1,1);");
    $("#btn-NewAddNotify").attr("onclick", "Customers_ClearAllControls(1,1);");
    $("#btn-NewAddAgent").attr("onclick", "Agents_ClearAllControls(1);");
    $("#btn-NewAddVessel").attr("onclick", "Vessels_ClearAllControls(null,2);");

    $("#btn-EditShipper").attr("onclick", "Customers_FillControlsFromOperations($('#slShippers option:selected').val(), null, 1);");
    $("#btn-EditConsignee").attr("onclick", "Customers_FillControlsFromOperations($('#slConsignees option:selected').val(), null, 1);");
    $("#btn-EditNotify").attr("onclick", "Customers_FillControlsFromOperations($('#slNotify option:selected').val(), null, 1);");
    $("#btn-EditAgent").attr("onclick", "Agents_FillControlsFromOperations($('#slAgents option:selected').val(), null, 1);");

    //if(IsMESCOCompany)
    //$("#slShipmentPOrC option[value='40']").remove();
    $("#btnSaveShipment").attr("onclick", "Shipment_Update();");
    $("#btnSaveClearanceProperties").attr("onclick", "Shipment_Update();");
    debugger;
    if (pDefaults.UnEditableCompanyName == "TRI" || pDefaults.UnEditableCompanyName == "HOR") {

        $("#slOperationBranch").html($("#slOperationEditBranch").html());
        $('#slOperationBranch').prop('disabled', false);
        $("#slOperationBranch  option").each(function () {

            $(this).prop('disabled', false);
        });
    }
    if (pDefaults.UnEditableCompanyName == "UNF" && $("#hDirectionType").val() == 2 && ($("#hLoggedUserID").val() == 291 || $("#hLoggedUserID").val() == 309)) {
        $("#txtShipmentHouseNumber").removeAttr("disabled");
    }
}

function LoadShipmentPackages(pID) {
    debugger;
    var pParametersWithValues = { pShipmentID: pID };
    CallGETFunctionWithParameters("/api/Operations/LoadShipmentPackages", pParametersWithValues
        , function (pData) {
            var pShipmentPackages = pData[0];

            $("#hShipmentID").val(pID);

            ShipmentPackage_BindTableRows(JSON.parse(pShipmentPackages));

            FadePageCover(false);
        }
        , null);
}
function Shipment_Update() {
    debugger;
    var HouseNumber = $("#txtShipmentHouseNumber").val()
    var pShipmentID=  $("#hShipmentID").val()
    CallGETFunctionWithParameters("api/Operations/checkHouseNumber", { HouseNumber: HouseNumber, pShipmentID: pShipmentID }, function (pData) {
            if (pData == true) {
                swal("Sorry", "This house number already exists.");
            }
            else {

                if (pDefaults.UnEditableCompanyName == "BOM" && ACIDCOUNT > 0) {
                    swal("Sorry", "ACID must be unique.");
                    ACIDCOUNT = 0;
                    return;
                }
                if (IsMESCOCompany && (['CONSOL', 'LCL'].includes(pOperationHeader_Global.ShipmentTypeCode))) {
                    if (ValidateForm("form", "ShipmentModal")) {
                        FadePageCover(true);
                        $("#btnSaveShipment").attr("disabled", true);
                        var pParametersWithValues = {
                            pShipmentID: $("#hShipmentID").val()
                            , pBranchID: $('#slOperationBranch option:selected').val()
                            , pSalesmanID: ($('#slOperationSalesman option:selected').val() == "" ? 0 : $('#slOperationSalesman option:selected').val())
                            , pOpenDate: ConvertDateFormat($("#txtOperationOpenDate").val().trim())
                            , pHouseNumber: $("#txtShipmentHouseNumber").val().trim() == "" ? "0" : $("#txtShipmentHouseNumber").val().trim().toUpperCase()
                            , pPOLCountryID: ($("#slPickupCountry").val() == "" || $("#slPickupCountry").val() == undefined || $("#slPickupCountry").val() == null ? 0 : $("#slPickupCountry").val())
                            , pPickupCityID: ($("#slPickupCity").val() == "" || $("#slPickupCity").val() == undefined || $("#slPickupCity").val() == null ? 0 : $("#slPickupCity").val())
                            , pPODCountryID: ($("#slDeliveryCountry").val() == "" || $("#slDeliveryCountry").val() == undefined || $("#slDeliveryCountry").val() == null ? 0 : $("#slDeliveryCountry").val())
                            , pDeliveryCityID: ($("#slDeliveryCity").val() == "" || $("#slDeliveryCity").val() == undefined || $("#slDeliveryCity").val() == null ? 0 : $("#slDeliveryCity").val())
                            , pShipperID: $("#slShippers").val() == "" ? 0 : $("#slShippers").val()
                            , pConsigneeID: $("#slConsignees").val() == "" ? 0 : $("#slConsignees").val()
                            , pAgentID: $("#slAgents").val() == "" ? 0 : $("#slAgents").val()
                            , pNotifyID: $("#slNotify").val() == "" || $("#slNotify").val() == null ? 0 : $("#slNotify").val()
                            , pIncotermID: $("#slShipmentIncoterm").val() == "" ? 0 : $("#slShipmentIncoterm").val()
                            , pMoveTypeID: ($('#slOperationMoveTypes option:selected').val() == "" ? 0 : $('#slOperationMoveTypes option:selected').val())
                            , pNotes: $("#divNotes").val().trim() == "" ? "0" : $("#divNotes").val().trim().toUpperCase()

                            , pCommodityID: ($("#slShipmentCommodities").val() == "" || $("#slShipmentCommodities").val() == null ? 0 : $("#slShipmentCommodities").val())
                            , pCustomerReference: $("#txtShipmentCustomerReference").val().trim() == "" ? "0" : $("#txtShipmentCustomerReference").val().trim().toUpperCase()
                            , pSupplierReference: $("#txtShipmentSupplierReference").val().trim() == "" ? "0" : $("#txtShipmentSupplierReference").val().trim().toUpperCase()
                            , pPONumber: $("#txtShipmentPONumber").val().trim() == "" ? "0" : $("#txtShipmentPONumber").val().trim().toUpperCase()
                            , pPOrC: ($("#slShipmentPOrC").val() == "" ? 0 : $("#slShipmentPOrC").val())
                            , pDeliveryOrderNumber: ($("#txtShipmentDeliveryOrderNumber").val().trim() == "" ? 0 : $("#txtShipmentDeliveryOrderNumber").val().trim().toUpperCase())
                            , pDeliveryDate: ($("#txtShipmentDeliveryDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtShipmentDeliveryDate").val()))

                            , pIsDelivered: $("#cbIsDelivered").prop("checked")
                            , pIsReceivedFromShipper: $("#cbIsReceivedFromShipper").prop("checked")
                            , pConsigneeID2: $("#slConsignees2").val() == "" ? 0 : $("#slConsignees2").val()
                            , pReleaseDate: ($("#txtShipmentReleaseDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtShipmentReleaseDate").val()))

                            , pBLDate: ($("#txtShipmentBLDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtShipmentBLDate").val()))
                            , pShippedOnBoardDate: ($("#txtShipmentShippedOnBoardDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtShipmentShippedOnBoardDate").val()))
                            , pFreightPayableAt: $("#txtShipmentFreightPayableAt").val().trim() == "" ? "0" : $("#txtShipmentFreightPayableAt").val().trim().toUpperCase()
                            , pACIDNumber: $("#txtShipmentACIDNumber").val().trim() == "" ? "0" : $("#txtShipmentACIDNumber").val().trim().toUpperCase()
                            , pACIDNumberDetails: $("#txtShipmentACIDDetails").val() == "" ? "0" : $("#txtShipmentACIDDetails").val()
                            , pBookingNumber: $("#txtShipmentBookingNumber").val() == "" ? "0" : $("#txtShipmentBookingNumber").val()
                            , pNumberOfOriginalBills: $("#txtShipmentNumberOfOriginalBills").val().trim() == "" ? "0" : $("#txtShipmentNumberOfOriginalBills").val().trim().toUpperCase()

                            , pCertificateNumber: $("#txtShipmentCertificateNumber").val().trim() == "" ? 0 : $("#txtShipmentCertificateNumber").val().trim().toUpperCase()
                            , pCountryOfOrigin: $("#txtShipmentCountryOfOrigin").val().trim() == "" ? 0 : $("#txtShipmentCountryOfOrigin").val().trim().toUpperCase()
                            , pInvoiceValue: $("#txtShipmentInvoiceValue").val().trim() == "" ? 0 : $("#txtShipmentInvoiceValue").val().trim().toUpperCase()
                            , pCurrencyID: ($("#slClearanceCurrency").val() == "" || $("#slClearanceCurrency").val() == null) ? pDefaults.CurrencyID : $("#slClearanceCurrency").val()
                            , pUNNumber: $("#txtShipmentUNNumber").val() == "" || $("#txtShipmentUNNumber").val() == null ? 0 : $("#txtShipmentUNNumber").val()
                            , pManifestPreConsignee: $("#txtManifestPreConsignee").val() == "" || $("#txtManifestPreConsignee").val() == null ? 0 : $("#txtManifestPreConsignee").val()
                            , pIMOClass: $("#txtShipmentIMOClass").val() == "" || $("#txtShipmentIMOClass").val() == null ? 0 : $("#txtShipmentIMOClass").val()
                            , pVesselID: $("#slShipmentVesselID").val() > 0 ? $("#slShipmentVesselID").val() : 0
                            , pStoreLocation: $("#slStoreLocationBLDocuments").val() > 0 ? $("#slStoreLocationBLDocuments").val() : 0
                            , pBlStatus: $("#slBLStatusBLDocuments").val() != "" ? $("#slBLStatusBLDocuments").val() : "0"
                            , pForwarder: $("#slForwarderBLDocuments").val() > 0 ? $("#slForwarderBLDocuments").val() : 0
                            , pQuotationRouteID: ($("#slQuotationRoutes").val() > 0 && $("#slShipmentIncoterm").val() != "") ? $("#slQuotationRoutes").val() : 0
                            , pPrintHouseConsignee: $("#cbPrintHouseConsignee").prop("checked")
                            , pIsIMOHouse: $("#cbIsIMOHouse").prop("checked") ? "1" : "0"
                            , pPOT: $("#slTransientPort").val() > 0 ? $("#slTransientPort").val() : 0
                            , pExpectedDeparture: "0"
                            , pExpectedArrival: "0"

                            , pForm13Notes: CheckValueIsValidInput("#divShipperAddress") ? $("#divShipperAddress").val().toUpperCase().replaceAll("'", "''") : "0"
                            , pForm13Number: CheckValueIsValidInput("#divConsigneeAddress") ? $("#divConsigneeAddress").val().toUpperCase().replaceAll("'", "''") : "0"
                            , pBusinessUnit: CheckValueIsValidInput("#divNotifyAddress") ? $("#divNotifyAddress").val().toUpperCase().replaceAll("'", "''") : "0"
                            , pOperationManID: $('#slShipmentOperationMan option:selected').val() == '' ? -1 : $('#slShipmentOperationMan option:selected').val()
                        };
                        CallGETFunctionWithParameters("/api/Operations/LoadContainersPlacedOn", { pShipmentID: $("#hShipmentID").val() }, function (pData) {
                            debugger;
                            //let placedOnData = JSON.parse(pData[0]);
                            if ($('#slCargoPlacedOnContainerMulti').val() == null) {
                                FadePageCover(false);
                                $("#btnSaveShipment").attr("disabled", false);
                                swal('Sorry', 'Please enter placed on container.');
                            } else {
                                debugger;
                                let containersSelected = $('#slCargoPlacedOnContainerMulti').val();
                                let storeLocations = new Set();
                                containersSelected.map(function (item) {
                                    storeLocations.add($("#slCargoPlacedOnContainerMulti option[value='" + item + "']").attr('storelocationid'));
                                });
                                if (storeLocations.size != 1) {
                                    swal("Sorry", "Please check the warehouses of the containers are the same");
                                    FadePageCover(false);
                                    $("#btnSaveShipment").attr("disabled", false);
                                    return;
                                }
                                var placedOnIdArray = $('#slCargoPlacedOnContainerMulti').val() == null ? "0" : $('#slCargoPlacedOnContainerMulti').val();
                                var pPlacedOnIDs = placedOnIdArray.join(", ");
                                CallGETFunctionWithParameters("/api/Operations/UpdateContainersPlacedOn", { pShipmentID: $("#hShipmentID").val(), pOperationContainersAndPackagesID: $('#slCargoPlacedOnContainerMulti').val()[0], pPlacedOnIDs: pPlacedOnIDs }, function (CargoUpdated) {
                                    if (CargoUpdated) {
                                        CallPOSTFunctionWithParameters("/api/Operations/Shipment_Update"
                                            , pParametersWithValues
                                            , function (pData) {
                                                var _MessageReturned = pData[1];
                                                if (_MessageReturned != "")
                                                    swal("Success", _MessageReturned);
                                                else if (pData[0]) {
                                                    jQuery("#ShipmentModal").modal("hide");
                                                    jQuery("#ClearancePropertiesModal").modal("hide");
                                                    //swal("Success", "Saved successfully.");
                                                    CargoProperties_Save($("#hShipmentID").val());
                                                    if (pDefaults.UnEditableCompanyName == "NEW")
                                                        Certificate_GetCertificateHousesAndGrossWeight($("#hOperationID").val());
                                                }
                                                else
                                                    swal("Sorry", "Connection failed, please try again.");
                                                //Shipments_LoadAvailableShipments();
                                                $("#btnSaveShipment").attr("disabled", false);
                                                //FadePageCover(false);
                                            }
                                            , null);
                                    } else {
                                        swal('Sorry', 'There is error with updating details');
                                    }
                                }, null);

                            }
                        }, null, false);

                    }
                } else {
                    if (ValidateForm("form", "ShipmentModal")) {
                        if ((pDefaults.UnEditableCompanyName == "UNF" && $('#txtShipmentACIDNumber').val() != "" && $('#txtShipmentACIDNumber').val() != null && $('#txtShipmentACIDNumber').val() != undefined && $('#txtShipmentACIDNumber').val().length != 19) || isNaN($('#txtShipmentACIDNumber').val())) {
                            swal("Sorry", "Acid must be 19 Numbers Excatly.");
                            return;
                        }
                        FadePageCover(true);
                        var pParametersWithValues = {
                            pShipmentID: $("#hShipmentID").val()
                            , pBranchID: $('#slOperationBranch option:selected').val()
                            , pSalesmanID: ($('#slOperationSalesman option:selected').val() == "" ? 0 : $('#slOperationSalesman option:selected').val())
                            , pOpenDate: ConvertDateFormat($("#txtOperationOpenDate").val().trim())
                            , pHouseNumber: $("#txtShipmentHouseNumber").val().trim() == "" ? "0" : $("#txtShipmentHouseNumber").val().trim().toUpperCase()
                            , pPOLCountryID: ($("#slPickupCountry").val() == "" || $("#slPickupCountry").val() == undefined || $("#slPickupCountry").val() == null ? 0 : $("#slPickupCountry").val())
                            , pPickupCityID: ($("#slPickupCity").val() == "" || $("#slPickupCity").val() == undefined || $("#slPickupCity").val() == null ? 0 : $("#slPickupCity").val())
                            , pPODCountryID: ($("#slDeliveryCountry").val() == "" || $("#slDeliveryCountry").val() == undefined || $("#slDeliveryCountry").val() == null ? 0 : $("#slDeliveryCountry").val())
                            , pDeliveryCityID: ($("#slDeliveryCity").val() == "" || $("#slDeliveryCity").val() == undefined || $("#slDeliveryCity").val() == null ? 0 : $("#slDeliveryCity").val())
                            , pShipperID: $("#slShippers").val() == "" ? 0 : $("#slShippers").val()
                            , pConsigneeID: $("#slConsignees").val() == "" ? 0 : $("#slConsignees").val()
                            , pAgentID: $("#slAgents").val() == "" ? 0 : $("#slAgents").val()
                            , pNotifyID: $("#slNotify").val() == "" || $("#slNotify").val() == null ? 0 : $("#slNotify").val()
                            , pIncotermID: $("#slShipmentIncoterm").val() == "" ? 0 : $("#slShipmentIncoterm").val()
                            , pMoveTypeID: ($('#slOperationMoveTypes option:selected').val() == "" ? 0 : $('#slOperationMoveTypes option:selected').val())
                            , pNotes: $("#divNotes").val().trim() == "" ? "0" : $("#divNotes").val().trim().toUpperCase()

                            , pCommodityID: ($("#slShipmentCommodities").val() == "" || $("#slShipmentCommodities").val() == null ? 0 : $("#slShipmentCommodities").val())
                            , pCustomerReference: $("#txtShipmentCustomerReference").val().trim() == "" ? "0" : $("#txtShipmentCustomerReference").val().trim().toUpperCase()
                            , pSupplierReference: $("#txtShipmentSupplierReference").val().trim() == "" ? "0" : $("#txtShipmentSupplierReference").val().trim().toUpperCase()
                            , pPONumber: $("#txtShipmentPONumber").val().trim() == "" ? "0" : $("#txtShipmentPONumber").val().trim().toUpperCase()
                            , pPOrC: ($("#slShipmentPOrC").val() == "" ? 0 : $("#slShipmentPOrC").val())
                            , pDeliveryOrderNumber: ($("#txtShipmentDeliveryOrderNumber").val().trim() == "" ? 0 : $("#txtShipmentDeliveryOrderNumber").val().trim().toUpperCase())
                            , pDeliveryDate: ($("#txtShipmentDeliveryDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtShipmentDeliveryDate").val()))

                            , pIsDelivered: $("#cbIsDelivered").prop("checked")
                            , pIsReceivedFromShipper: $("#cbIsReceivedFromShipper").prop("checked")
                            , pConsigneeID2: $("#slConsignees2").val() == "" ? 0 : $("#slConsignees2").val()
                            , pReleaseDate: ($("#txtShipmentReleaseDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtShipmentReleaseDate").val()))

                            , pBLDate: ($("#txtShipmentBLDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtShipmentBLDate").val()))
                            , pShippedOnBoardDate: ($("#txtShipmentShippedOnBoardDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtShipmentShippedOnBoardDate").val()))
                            , pFreightPayableAt: $("#txtShipmentFreightPayableAt").val().trim() == "" ? "0" : $("#txtShipmentFreightPayableAt").val().trim().toUpperCase()
                            , pACIDNumber: $("#txtShipmentACIDNumber").val().trim() == "" ? "0" : $("#txtShipmentACIDNumber").val().trim().toUpperCase()
                            , pACIDNumberDetails: $("#txtShipmentACIDDetails").val() == "" ? "0" : $("#txtShipmentACIDDetails").val()
                            , pBookingNumber: $("#txtShipmentBookingNumber").val() == "" ? "0" : $("#txtShipmentBookingNumber").val()
                            , pNumberOfOriginalBills: (pDefaults.UnEditableCompanyName == "NIL" ? $("#slNoOfOriginals").val() : $("#txtShipmentNumberOfOriginalBills").val().trim() == "" ? "0" : $("#txtShipmentNumberOfOriginalBills").val().trim().toUpperCase())

                            , pCertificateNumber: $("#txtShipmentCertificateNumber").val().trim() == "" ? 0 : $("#txtShipmentCertificateNumber").val().trim().toUpperCase()
                            , pCountryOfOrigin: $("#txtShipmentCountryOfOrigin").val().trim() == "" ? 0 : $("#txtShipmentCountryOfOrigin").val().trim().toUpperCase()
                            , pInvoiceValue: $("#txtShipmentInvoiceValue").val().trim() == "" ? 0 : $("#txtShipmentInvoiceValue").val().trim().toUpperCase()
                            , pCurrencyID: ($("#slClearanceCurrency").val() == "" || $("#slClearanceCurrency").val() == null) ? pDefaults.CurrencyID : $("#slClearanceCurrency").val()
                            , pUNNumber: $("#txtShipmentUNNumber").val() == "" || $("#txtShipmentUNNumber").val() == null ? 0 : $("#txtShipmentUNNumber").val()
                            , pManifestPreConsignee: $("#txtManifestPreConsignee").val() == "" || $("#txtManifestPreConsignee").val() == null ? 0 : $("#txtManifestPreConsignee").val()
                            , pIMOClass: $("#txtShipmentIMOClass").val() == "" || $("#txtShipmentIMOClass").val() == null ? 0 : $("#txtShipmentIMOClass").val()
                            , pVesselID: $("#slShipmentVesselID").val() > 0 ? $("#slShipmentVesselID").val() : 0
                            , pStoreLocation: $("#slStoreLocationBLDocuments").val() > 0 ? $("#slStoreLocationBLDocuments").val() : 0
                            , pBlStatus: $("#slBLStatusBLDocuments").val() != "" ? $("#slBLStatusBLDocuments").val() : 0
                            , pForwarder: $("#slForwarderBLDocuments").val() > 0 ? $("#slForwarderBLDocuments").val() : 0
                            , pQuotationRouteID: $("#slQuotationRoutes").val() > 0 ? $("#slQuotationRoutes").val() : 0
                            , pPrintHouseConsignee: $("#cbPrintHouseConsignee").prop("checked")
                            , pIsIMOHouse: $("#cbIsIMOHouse").prop("checked") ? "1" : "0"
                            , pPOT: $("#slTransientPort").val() > 0 ? $("#slTransientPort").val() : 0
                            , pExpectedDeparture: "0"
                            , pExpectedArrival: "0"

                            , pForm13Notes: CheckValueIsValidInput("#divShipperAddress") ? $("#divShipperAddress").val().toUpperCase().replaceAll("'", "''") : "0"
                            , pForm13Number: CheckValueIsValidInput("#divConsigneeAddress") ? $("#divConsigneeAddress").val().toUpperCase().replaceAll("'", "''") : "0"
                            , pBusinessUnit: CheckValueIsValidInput("#divNotifyAddress") ? $("#divNotifyAddress").val().toUpperCase().replaceAll("'", "''") : "0"
                            , pOperationManID: IsMESCOCompany ? ($('#slShipmentOperationMan option:selected').val() == '' ? -1 : $('#slShipmentOperationMan option:selected').val()) : -1
                            , pReferenceNumber: $("#txtReferenceNumber").val().trim() == "" ? "0" : $("#txtReferenceNumber").val().trim().toUpperCase()

                        };
                        if (pDefaults.UnEditableCompanyName == "UNF") {
                            pParametersWithValues.pBusinessUnit2 = CheckValueIsValidInput("#txtShipmentIMOClass2") ? $("#txtShipmentIMOClass2").val().toUpperCase() : "0"
                        }
                        if (pDefaults.UnEditableCompanyName == "UNF" ) {
                            pParametersWithValues.pPrintType = $("#valPrintTypeHBLSelected").val();
                        }
                        CallPOSTFunctionWithParameters("/api/Operations/Shipment_Update"
                            , pParametersWithValues
                            , function (pData) {
                                var _MessageReturned = pData[1];
                                if (_MessageReturned != "")
                                    swal("Success", _MessageReturned);
                                else if (pData[0]) {
                                    swal("Success", "Saved successfully.");
                                    if (pDefaults.UnEditableCompanyName == "NEW")
                                        Certificate_GetCertificateHousesAndGrossWeight($("#hOperationID").val());
                                }
                                else
                                    swal("Sorry", "Connection failed, please try again.");
                                Shipments_LoadAvailableShipments();
                                FadePageCover(false);
                            }
                            , null);
                    }
                }
            }

        }, null);





}
function Shipment_OpenCopyModal(pShipmentID) {
    debugger;
    var tr = $("#tblConnectedShipments tr[ID='" + pShipmentID + "']");
    $("#lblCopyShipmentShown").html(": " + $(tr).find("td.HWB").text());
    $("#cbIncludeReceivables").prop("checked", false);
    $("#cbIncludePayables").prop("checked", false);
    $("#hShipmentToCopyID").val(pShipmentID);
    $("#txtShipmentNumberOfCopies").val(1);
    jQuery("#CopyShipmentModal").modal("show");
}
function Shipment_Copy() {
    debugger;
    if ($("#txtShipmentNumberOfCopies").val() == "" || $("#txtShipmentNumberOfCopies").val() == 0)
        swal("Sorry", "Please, Enter number of copies.");
    else {
        swal({
            title: "Are you sure?"
            , text: $("#txtShipmentNumberOfCopies").val() + " copies will be created."
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
                    pShipmentToCopyID: $("#hShipmentToCopyID").val()
                    , pIncludePayables: false
                    , pIncludeReceivables: false
                    , pNumberOfCopies: $("#txtShipmentNumberOfCopies").val()
                };
                CallGETFunctionWithParameters("/api/Operations/Shipment_Copy", pParametersWithValues
                    , function (pData) {
                        var pReturnedMessage = pData[0];
                        var pShipment = JSON.parse(pData[1]);
                        if (pReturnedMessage != "")
                            swal("Sorry", pReturnedMessage);
                        else {
                            Shipments_BindTableRows(pShipment);
                            jQuery("#CopyShipmentModal").modal("hide");
                        }
                        FadePageCover(false);
                    }
                    , null);
            });
    }
}
//pOption 10:Master, 22:House
function Shipment_OpenClearancePropertiesModal(pOption) {
    debugger;
    jQuery("#ClearancePropertiesModal").modal("show");
}
/********************************************Shipments Packages***************************************************/
function ShipmentPackage_BindTableRows(pTableRows) {
    debugger;
    var editControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' title='Edit'> <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $("#tblShipmentPackage tbody").html("");
    var pHTMLHeaderColumns = "";
    var transferControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Transfer" + "</span>";
    //isa i am sure its master coz shipment is opened
    if ($("#cbIsFCL").prop("checked") || $("#cbIsFTL").prop("checked")) {
        pHTMLHeaderColumns += '     <tr>';
        pHTMLHeaderColumns += '         <th id="HeaderDeleteShipmentPackageID">';
        pHTMLHeaderColumns += '             <input id="cbShipmentPackageDeleteHeader" type="checkbox" />';
        pHTMLHeaderColumns += '         </th>';
        pHTMLHeaderColumns += '         <th>Container Type</th>';
        pHTMLHeaderColumns += '         <th>Container No</th>';
        pHTMLHeaderColumns += '         <th>Carrier Seal</th>';
        if (pDefaults.UnEditableCompanyName != 'NAJ') {
        pHTMLHeaderColumns += '         <th>TareWt(KG)</th>';
        pHTMLHeaderColumns += '         <th>Vol.(CBM)';
        pHTMLHeaderColumns += '         <th>Net Wt(KG)</th>';
        }
        pHTMLHeaderColumns += '         <th>GrossWt(KG)</th>';
        if (pDefaults.UnEditableCompanyName != 'NAJ') {
            pHTMLHeaderColumns += '         <th>VGM(KG)</th>';
        }
        pHTMLHeaderColumns += '         <th class="rounded-right hide"></th>';
        pHTMLHeaderColumns += '     </tr>';
    }
    else {
        pHTMLHeaderColumns += '     <tr>';
        pHTMLHeaderColumns += '         <th id="HeaderDeleteShipmentPackageID">';
        pHTMLHeaderColumns += '             <input id="cbShipmentPackageDeleteHeader" type="checkbox" />';
        pHTMLHeaderColumns += '         </th>';
        pHTMLHeaderColumns += '         <th>Package Type</th>';
        pHTMLHeaderColumns += '         <th>Container</th>';
        pHTMLHeaderColumns += '         <th>Quantity</th>';
        if (pDefaults.UnEditableCompanyName != 'NAJ') {
            pHTMLHeaderColumns += '         <th>Net Wt(KG)</th>';
            pHTMLHeaderColumns += '         <th>Vol.(CBM)';
        }
        pHTMLHeaderColumns += '         <th>GrossWt(KG)</th>';
        pHTMLHeaderColumns += '         <th class="rounded-right hide"></th>';
        pHTMLHeaderColumns += '     </tr>';
    }
    $("#tblShipmentPackage thead").html(pHTMLHeaderColumns);
    if ($("#cbIsFCL").prop("checked") || $("#cbIsFTL").prop("checked")) {
        $.each(pTableRows, function (i, item) {
            AppendRowtoTable("tblShipmentPackage",
                ("<tr ID='" + item.ID + "' " + (OEPac && $("#hIsOperationDisabled").val() == false ? ("ondblclick='ShipmentPackage_FillControls(" + item.ID + ");'") : "") + ">"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Container' val='" + item.ContainerTypeID + "'>" + item.ContainerTypeCode + "</td>"
                    + "<td class='ContainerNumber'>" + (item.ContainerNumber == 0 ? "" : item.ContainerNumber) + "</td>"
                    + "<td class='CarrierSeal'>" + (item.CarrierSeal == 0 ? "" : item.CarrierSeal) + "</td>"
                    + "<td class='ShipperSeal hide'>" + (item.ShipperSeal == 0 ? "" : item.ShipperSeal) + "</td>"
                    + "<td class='TareWeight'>" + (item.TareWeight == 0 ? "" : item.TareWeight) + "</td>"
                    + "<td class='ContainerVolume'>" + (item.Volume == 0 ? "" : item.Volume) + "</td>"
                    + "<td class='ContainerNetWeight'>" + (item.NetWeight == 0 ? "" : item.NetWeight) + "</td>"
                    + "<td class='ContainerNetWeightTON hide'>" + (item.NetWeightTON == 0 ? "" : item.NetWeightTON) + "</td>"
                    + "<td class='ContainerGrossWeight'>" + (item.GrossWeight == 0 ? "" : item.GrossWeight) + "</td>"
                    + "<td class='ContainerGrossWeightTON hide'>" + (item.GrossWeightTON == 0 ? "" : item.GrossWeightTON) + "</td>"
                    + "<td class='VGM'>" + (item.VGM == 0 ? "" : item.VGM) + "</td>"
                    + "<td class='IsReefer hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsReefer == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsNOR hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsNOR == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsSentToWarehouse hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsSentToWarehouse == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsLoaded hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsLoaded == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='MinTemp hide'>" + item.MinTemp + "</td>"
                    + "<td class='Humidity hide'>" + item.Humidity + "</td>"
                    + "<td class='Ventilation hide'>" + item.Ventilation + "</td>"
                    + "<td class='PackageTypeOnContainer hide' val='" + item.PackageTypeIDOnContainer + "'>" + (item.PackageTypeNameOnContainer == 0 ? "" : item.PackageTypeNameOnContainer) + "</td>"
                    + "<td class='LotNumber hide'>" + (item.LotNumber == 0 ? "" : item.LotNumber) + "</td>"
                    + "<td class='MaxTemp hide'>" + item.MaxTemp + "</td>"
                    + "<td class='IsIMO hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsIMO == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IMOClass hide'>" + item.IMOClass + "</td>"
                    + "<td class='UNNumber hide'>" + item.UNNumber + "</td>"
                    + "<td class='FlashPoint hide'>" + item.FlashPoint + "</td>"

                    + "<td class='DescriptionOfGoods hide'>" + (item.DescriptionOfGoods == 0 ? "" : item.DescriptionOfGoods) + "</td>"
                    //+ "<td class='hide'><a href='#EditContainerModal' data-toggle='modal' onclick='ShipmentPackage_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
                    + "<td class='" + (OAPac && ODPac && $("#hIsOperationDisabled").val() == false ? "hide" : "hide") + "'><a href='#' data-toggle='modal' onclick='ShipmentPackage_TransferContainerModal(" + item.ID + "," + item.OperationID + ");' " + transferControlsText + "</a></td>"
                    + "</tr>"));

            //+ ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked')
            //    ? ("<td class='hide'><a href='#EditContainerModal' data-toggle='modal' onclick='OperationContainersAndPackages_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>")
            //    : ("<td class='hide'><a href='#EditPackageModal' data-toggle='modal' onclick='OperationContainersAndPackages_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>")
            //    )));
        });
    }
    else {
        $.each(pTableRows, function (i, item) {
            AppendRowtoTable("tblShipmentPackage",
                ("<tr ID='" + item.ID + "' " + (OEPac && $("#hIsOperationDisabled").val() == false ? ("ondblclick='ShipmentPackage_FillControls(" + item.ID + ");'") : "") + ">"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Package' val='" + item.PackageTypeID + "'>" + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + "</td>"
                    //+ "<td class='Container' val='" + item.ContainerTypeID + "'>" + (item.ContainerTypeName == 0 ? "" : item.ContainerTypeName) + "</td>"
                    + "<td class='PlacedOnOCPID' val='" + item.PlacedOnOCPID + "'>" + (item.PlacedOnOCPID == 0 ? "" : item.ConsolContainerNumber) + "</td>"
                    + "<td class='Quantity'>" + item.Quantity + "</td>"
                    + "<td class='Length hide'>" + item.Length + "</td>"
                    + "<td class='Width hide'>" + item.Width + "</td>"
                    + "<td class='Height hide'>" + item.Height + "</td>"
                    + "<td class='NetWeight'>" + item.NetWeight + "</td>"
                    + "<td class='Volume'>" + item.Volume + "</td>"
                    + "<td class='GrossWeight'>" + item.GrossWeight + "</td>"
                    + "<td class='VolumetricWeight hide'>" + item.VolumetricWeight + "</td>"
                    + "<td class='ChargeableWeight hide'>" + item.ChargeableWeight + "</td>"
                    + "<td class='DescriptionOfGoods hide'>" + (item.DescriptionOfGoods == 0 ? "" : item.DescriptionOfGoods) + "</td>"
                    + "<td class='hide'><a href='#EditPackageModal' data-toggle='modal' onclick='ShipmentPackage_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
                    + "</tr>"));

        });


    }
    BindAllCheckboxonTable("tblShipmentPackage", "ID", "cbShipmentPackageDeleteHeader");
    CheckAllCheckbox("HeaderDeleteShipmentPackageID");
    if (pDefaults.UnEditableCompanyName == 'NAJ') {

       

        $('td.TareWeight').addClass('hide');
        $('td.ContainerVolume').addClass('hide');
        $('td.ContainerNetWeight').addClass('hide');
        $('td.ContainerNetWeightTON').addClass('hide');
        $('td.ContainerGrossWeightTON').addClass('hide');
        $('td.VGM').addClass('hide');
        $('td.TareWeight').addClass('hide');




    }
}
//*********************************************************************** */
function HouseVechiles_BindTableRows(pTableRows) {
    debugger;
    var editControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' title='Edit'> <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $("#tblShipmentPackage tbody").html("");
    var pHTMLHeaderColumns = "";
    var transferControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Transfer" + "</span>";
    //isa i am sure its master coz shipment is opened

    //if ($("#cbIsFCLForBLDocuments").prop("checked") || $("#cbIsFTLForBLDocuments").prop("checked")) {

    pHTMLHeaderColumns += '     <tr>';
    pHTMLHeaderColumns += '         <th id="HeaderDeleteShipmentPackageID">';
    pHTMLHeaderColumns += '             <input id="cbShipmentPackageDeleteHeader" type="checkbox" />';
    pHTMLHeaderColumns += '         </th>';
    pHTMLHeaderColumns += '         <th>Equipment Model</th>';
    pHTMLHeaderColumns += '         <th>Chassis NO</th>';
    pHTMLHeaderColumns += '         <th>Motor NO</th>';
    pHTMLHeaderColumns += '         <th>Manufactur Date</th>';
    pHTMLHeaderColumns += '         <th>رقم اذن الصرف</th>';
    pHTMLHeaderColumns += '         <th>رقم اذن التخزين</th>';
    pHTMLHeaderColumns += '         <th class="rounded-right hide"></th>';
    pHTMLHeaderColumns += '     </tr>';
    $("#tblHouseVechiles thead").html(pHTMLHeaderColumns);

        $.each(pTableRows, function (i, item) {
            AppendRowtoTable("tblHouseVechiles",
                ("<tr ID='" + item.ID + "' " + (/*OEPac && $("#hIsOperationDisabled").val()*/pIsOperationDisabled == false ? ("ondblclick='ShipmentPackage_FillControls(" + item.ID + ");'") : "") + ">"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Name' val='" + item.Name + "'>" + (item.Name == 0 ? "" : item.Name) + "</td>"
                    //+ "<td class='Container' val='" + item.ContainerTypeID + "'>" + (item.ContainerTypeName == 0 ? "" : item.ContainerTypeName) + "</td>"
                    + "<td class='ChassisNo' val='" + item.ChassisNo + "'>" + (item.ChassisNo == 0 ? "" : item.ChassisNo) + "</td>"
                    + "<td class='MotorNo'>" + item.MotorNo + "</td>"
                   
                    + "<td class='ManufacturDate'>" + ConvertDateFormat(GetDateWithFormatMDY(item.ManufacturDate))+ "</td>"
                    + "<td class='ExchangePermission'>" + item.ExchangePermission + "</td>"
                    + "<td class='StoragePermission'>" + item.StorgePermission + "</td>"
                    + "<td class='hide'><a href='#EditPackageModal' data-toggle='modal' onclick='ShipmentPackage_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
                    + "</tr>"));

        });
    
    BindAllCheckboxonTable("tblHouseVechiles", "ID", "cbShipmentPackageDeleteHeader");
    CheckAllCheckbox("HeaderDeleteShipmentPackageID");
}
//*************************************************************************/

function ShipmentPackage_ClearAllControls() {
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
        $('#btn-CalculateVGMFromDetails').addClass("hide");






    }
    $("#btn-ApplyReeferPropertiesToAll").addClass("hide");
    $("#tblContainerPackages tbody tr").html("");
    if ($("#hShipmentID").val() == "")
        swal("Sorry", "Please, save Shipment first.");
    else if (ValidateForm("form", "ShipmentModal"))
        if ($("#cbIsFCL").prop("checked") || $("#cbIsFTL").prop("checked")) { //FCL,LTL
            ClearAll("#EditContainerModal");
            jQuery("#EditContainerModal").modal("show");
            if (IsMESCOCompany) {
                jQuery("#CargoPropertiesModal").modal("hide");
                jQuery("#ShipmentModal").modal("hide");
            }
            $("#txtNumberOfContainers").removeAttr("disabled");
            $("#txtNumberOfContainers").val("1");
            $("#tblContainerPackages > tbody").html(""); //Clear the ContainerPackages rows
            //$("#divContainerPackages").addClass("hide");
            $("#btn-NewAddContainerPackage").attr("disabled", "disabled");
            ContainerTypes_GetList(null, null);
            PackageTypesOnContainer_GetList(null, "slPackageTypesOnContainer", function () { $("#slPackageTypes").html($("#slPackageTypesOnContainer").html()); $("#slPackageTypes").val(""); });
            $("#btn-NewAddContainerPackage").attr("onclick", "ContainerPackages_ClearAllControls(null," + $("#hShipmentID").val() + ");");
            $("#btnSaveContainer").attr("onclick", "ShipmentPackage_Save();");
            $("#btnSaveAndNewContainer").attr("onclick", "ShipmentPackage_Save(true);");
        }
        else { //LCL,LTL,CONSOL (type of master operation)(no master in air)
            ClearAll("#EditPackageModal");
            jQuery("#EditPackageModal").modal("show");
            $("#slPackageTypes").val("");
            $("#slShipmentContainers").val("");
            $("#txtPackagesQuantity").val(1);
            $("#btnSavePackage").attr("onclick", "ShipmentPackage_Save();");
            $("#btnSaveAndNewPackage").attr("onclick", "ShipmentPackage_Save(true);");
        }
}
function ShipmentPackage_FillControls(pID) {
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
        $('#btn-CalculateVGMFromDetails').addClass("hide");
        $('#slPackageTypesOnContainer').parent().removeClass("m-t-xs");






    }
    $("#btn-ApplyReeferPropertiesToAll").addClass("hide");
    if (ValidateForm("form", "ShipmentModal")) {
        //$("#hPackageID").val(pID); // MG Added this because in houses, there is no more insert packages, all is update
        //$("#hContainerID").val(pID);

        if ($("#cbIsFCL").prop("checked") || $("#cbIsFTL").prop("checked")) { //FCL,FTL
            ClearAll("#EditContainerModal");
            var tr = $("#tblShipmentPackage tr[ID='" + pID + "']");
            $("#lblContainerShown").html(": " + $(tr).find("td.ContainerNumber").text());
            //$("#divContainerPackages").removeClass("hide");
            $("#btn-NewAddContainerPackage").removeAttr("disabled");
            jQuery("#EditContainerModal").modal("show");
            var pContainerTypeID = $(tr).find("td.Container").attr('val');
            ContainerTypes_GetList(pContainerTypeID, null);
            var pPackageTypeIDOnContainer = $(tr).find("td.PackageTypeOnContainer").attr('val');
            PackageTypesOnContainer_GetList(pPackageTypeIDOnContainer, "slPackageTypesOnContainer", function () { $("#slPackageTypes").html($("#slPackageTypesOnContainer").html()); $("#slPackageTypes").val(""); });

            $("#hContainerID").val(pID);
            $("#txtContainerNumber").val($(tr).find("td.ContainerNumber").text());
            $("#txtNumberOfContainers").attr("disabled", "disabled");
            $("#txtNumberOfContainers").val("N/A");
            $("#txtCarrierSeal").val($(tr).find("td.CarrierSeal").text());
            $("#txtShipperSeal").val($(tr).find("td.ShipperSeal").text());
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
                , 0, 1000
                , function (data) { ContainerPackages_BindTableRows(JSON.parse(data[0])/*pTabelRows*/); });
            $("#btn-NewAddContainerPackage").attr("onclick", "ContainerPackages_ClearAllControls(null," + $("#hShipmentID").val() + ");");

            $("#btnSaveContainer").attr("onclick", "ShipmentPackage_Save();");
            $("#btnSaveAndNewContainer").attr("onclick", "ShipmentPackage_Save(true);");
        }
        else { //LCL,LTL,CONSOL (type of master operation)
            ClearAll("#EditPackageModal");
            var tr = $("#tblShipmentPackage tr[ID='" + pID + "']");
            var pPackageTypeID = tr.find("td.Package").attr("val");
            var pPlacedOnOCPID = tr.find("td.PlacedOnOCPID").attr("val");
            jQuery("#EditPackageModal").modal("show");
            $("#slPackageTypes").val(pPackageTypeID);

            $("#lblPackageShown").html(": " + $(tr).find("td.Package").text());

            $("#hPackageID").val(pID);
            $("#txtLength").val($(tr).find("td.Length").text());
            $("#txtWidth").val($(tr).find("td.Width").text());
            $("#txtHeight").val($(tr).find("td.Height").text());
            $("#txtVolume").val($(tr).find("td.Volume").text());
            $("#txtNetWeight").val($(tr).find("td.NetWeight").text());
            $("#txtGrossWeight").val($(tr).find("td.GrossWeight").text());
            $("#txtVolumetricWeight").val($(tr).find("td.VolumetricWeight").text());
            $("#txtChargeableWeight").val($(tr).find("td.ChargeableWeight").text());
            $("#txtPackagesQuantity").val($(tr).find("td.Quantity").text());
            $("#txtPackageDescriptionOfGoods").val($(tr).find("td.DescriptionOfGoods").text());
            $("#slShipmentContainers").val(pPlacedOnOCPID == 0 ? "" : pPlacedOnOCPID);

            $("#btnSavePackage").attr("onclick", "ShipmentPackage_Save();");
            $("#btnSaveAndNewPackage").attr("onclick", "ShipmentPackage_Save(true);");
        }
    }
}
function ShipmentPackage_Save(pSaveAndNew) {
    debugger;
    if ($("#cbIsFCL").prop("checked") || $("#cbIsFTL").prop("checked")) { //FCL,FTL
        if (OperationContainersAndPackages_ValidateProperties())
            if (ValidateForm("form", "EditContainerModal")) {
                FadePageCover(true);
                if ($("#hContainerID").val() == "" && false) { //insert container   // MG added && false because no more insert from houses
                    var pParametersWithValues = {
                        pOperationID: $("#hShipmentID").val()
                        , pContainerTypeID: ($("#slContainerTypes option:selected").val() == undefined ? 0 : $("#slContainerTypes option:selected").val())
                        , pNumberOfContainers: $("#txtNumberOfContainers").val().trim() //pNumberOfContainers(txtNumberOfContainers) is not saved in DB, its just to decide how many containers to be inserted; between 1 and 50
                        , pPackageTypeID: 0 //Not used when inserting packages //($("#txtPackageType").attr("PackageTypeID") == undefined ? 0 : $("#txtPackageType").attr("PackageTypeID"))
                        , pLength: ($("#txtLength").val() == "" ? 0 : $("#txtLength").val())
                        , pWidth: ($("#txtWidth").val() == "" ? 0 : $("#txtWidth").val())
                        , pHeight: ($("#txtHeight").val() == "" ? 0 : $("#txtHeight").val())
                        , pVolume: ($("#txtContainerVolume").val() == "" ? 0 : $("#txtContainerVolume").val())
                        , pVolumetricWeight: ($("#txtVolumetricWeight").val() == "" ? 0 : $("#txtVolumetricWeight").val())
                        , pNetWeight: ($("#txtContainerNetWeight").val() == "" ? 0 : $("#txtContainerNetWeight").val())
                        , pNetWeightTON: ($("#txtContainerNetWeightTON").val() == "" ? 0 : $("#txtContainerNetWeightTON").val())
                        , pGrossWeight: ($("#txtContainerGrossWeight").val() == "" ? 0 : $("#txtContainerGrossWeight").val())
                        , pGrossWeightTON: ($("#txtContainerGrossWeightTON").val() == "" ? 0 : $("#txtContainerGrossWeightTON").val())
                        , pChargeableWeight: ($("#txtChargeableWeight").val() == "" ? 0 : $("#txtChargeableWeight").val())
                        //, pQuantity: ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') ? ($("#txtContainersQuantity").val() == "" ? 0 : $("#txtContainersQuantity").val()) : ($("#txtPackagesQuantity").val() == "" ? 0 : $("#txtPackagesQuantity").val()))
                        , pQuantity: 0 //($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') ? 0 : ($("#txtPackagesQuantity").val() == "" ? 0 : $("#txtPackagesQuantity").val()))

                        , pContainerNumber: ($("#txtContainerNumber").val() == "" ? 0 : $("#txtContainerNumber").val().trim().toUpperCase())
                        , pCarrierSeal: ($("#txtCarrierSeal").val() == "" ? 0 : $("#txtCarrierSeal").val().trim().toUpperCase())
                        , pShipperSeal: ($("#txtShipperSeal").val() == "" ? 0 : $("#txtShipperSeal").val().trim().toUpperCase())
                        , pTareWeight: ($("#txtTareWeight").val() == "" ? 0 : $("#txtTareWeight").val())
                        , pVGM: ($("#txtVGM").val() == "" ? 0 : $("#txtVGM").val())

                        , pIsReefer: ($("#cbIsReefer").prop("checked") ? true : false)
                        , pIsNOR: ($("#cbIsNOR").prop("checked") ? true : false)
                        , pMinTemp: ($("#txtMinTemp").val() == "" ? 0 : $("#txtMinTemp").val())
                        , pMaxTemp: ($("#txtMaxTemp").val() == "" ? 0 : $("#txtMaxTemp").val())
                        , pVentilation: ($("#txtVentilation").val() == "" ? 0 : $("#txtVentilation").val())
                        , pHumidity: ($("#txtHumidity").val() == "" ? 0 : $("#txtHumidity").val())
                        , pLotNumber: ($("#txtLotNumber").val().trim() == "" ? 0 : $("#txtLotNumber").val().trim().toUpperCase())

                        , pPackageTypeIDOnContainer: ($("#slPackageTypesOnContainer").val() == "" ? 0 : $("#slPackageTypesOnContainer").val())
                        , pNumberOfPackagesOnContainer: ($("#txtNumberOfPackagesOnContainer").val() == "" ? 0 : $("#txtNumberOfPackagesOnContainer").val())

                        , pIsIMO: ($("#cbIsIMO").prop("checked") ? true : false)
                        , pIMOClass: ($("#txtIMOClass").val() == "" ? 0 : $("#txtIMOClass").val())
                        , pUNNumber: ($("#txtUNNumber").val() == "" ? 0 : $("#txtUNNumber").val())
                        , pFlashPoint: ($("#txtFlashPoint").val() == "" ? 0 : $("#txtFlashPoint").val())
                        , pDescriptionOfGoods: ($("#divContainerGoodsDescription").val().trim() == "" ? 0 : $("#divContainerGoodsDescription").val().trim().toUpperCase())
                        , pMaxTemp: ($("#txtMaxTemp").val() == "" ? 0 : $("#txtMaxTemp").val())

                        , pPlacedOnOCPID: 0
                        , pIsSentToWarehouse: true
                        , pIsLoaded: false
                        , pLoadingDate: $("#txtLoadingDateFromOCAP").val().trim() == "" ? "01/01/1900" : $("#txtLoadingDateFromOCAP").val().trim().toUpperCase()
                        , pReturnDate: $("#txtReturnDateFromOCAP").val().trim() == "" ? "01/01/1900" : $("#txtReturnDateFromOCAP").val().trim().toUpperCase()
                        , pTankCertExpiryDate: $("#txtTankCertExpiryDate").val().trim() == "" ? "01/01/1900" : $("#txtTankCertExpiryDate").val().trim().toUpperCase()
                        , pWarehouseID: $('#slWarehouse').val() > 0 ? $('#slWarehouse').val() : 0
                        , pReturnDepot: $("#txtReturnDepot").val().trim() == "" ? 0 : $("#txtReturnDepot").val().trim().toUpperCase()
                        , pIsPeriodicTest: $("#cbIsPeriodicTest").prop("checked")
                        , pPurchaseItemID: ($("#slPurchaseItems").val() == "" || $("#slPurchaseItems").val() == null ? 0 : $("#slPurchaseItems").val())
                        , pStatusID: $("#slStatusIDFromOCAP").val() == "" ? 0 : $("#slStatusIDFromOCAP").val()
                    };
                    CallGETFunctionWithParameters("/api/OperationContainersAndPackages/Insert", pParametersWithValues
                        , function (pData) {
                            if (pData[0]) {
                                $("#hContainerID").val(pData[1]); //the last ContainerID inserted
                                ShipmentPackage_BindTableRows(JSON.parse(pData[2]));
                                $("#btn-NewAddContainerPackage").removeAttr("disabled");
                                swal("Success", "Saved successfully.");
                                if (pSaveAndNew)
                                    ShipmentPackage_ClearAllControls();
                            }
                            else
                                swal("Sorry", "Connection failed, please try again.");
                            FadePageCover(false);
                        }
                        , null);
                }
                else { //update Container
                    var pParametersWithValues = {
                        pID: $("#hContainerID").val()
                        , pOperationID: $("#hOperationID").val()  //$("#hShipmentID").val()
                        , pContainerTypeID: ($("#slContainerTypes option:selected").val() == undefined ? 0 : $("#slContainerTypes option:selected").val())
                        , pPackageTypeID: ($("#slPackageTypes").val() == "" ? 0 : $("#slPackageTypes").val()) //($("#txtPackageType").attr("PackageTypeID") == undefined ? 0 : $("#txtPackageType").attr("PackageTypeID"))
                        , pLength: ($("#txtLength").val() == "" ? 0 : $("#txtLength").val())
                        , pWidth: ($("#txtWidth").val() == "" ? 0 : $("#txtWidth").val())
                        , pHeight: ($("#txtHeight").val() == "" ? 0 : $("#txtHeight").val())
                        , pVolume: ($("#txtContainerVolume").val() == "" ? 0 : $("#txtContainerVolume").val())
                        , pVolumetricWeight: ($("#txtVolumetricWeight").val() == "" ? 0 : $("#txtVolumetricWeight").val())
                        , pNetWeight: ($("#txtContainerNetWeight").val() == "" ? 0 : $("#txtContainerNetWeight").val())
                        , pNetWeightTON: ($("#txtContainerNetWeightTON").val() == "" ? 0 : $("#txtContainerNetWeightTON").val())
                        , pGrossWeight: ($("#txtContainerGrossWeight").val() == "" ? 0 : $("#txtContainerGrossWeight").val())
                        , pGrossWeightTON: ($("#txtContainerGrossWeightTON").val() == "" ? 0 : $("#txtContainerGrossWeightTON").val())
                        , pChargeableWeight: ($("#txtChargeableWeight").val() == "" ? 0 : $("#txtChargeableWeight").val())
                        //, pQuantity: ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') ? ($("#txtContainersQuantity").val() == "" ? 0 : $("#txtContainersQuantity").val()) : ($("#txtPackagesQuantity").val() == "" ? 0 : $("#txtPackagesQuantity").val()))
                        , pQuantity: 0 //($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') ? 0 : ($("#txtPackagesQuantity").val() == "" ? 0 : $("#txtPackagesQuantity").val()))

                        , pContainerNumber: ($("#txtContainerNumber").val() == "" ? 0 : $("#txtContainerNumber").val().trim().toUpperCase())
                        , pCarrierSeal: ($("#txtCarrierSeal").val() == "" ? 0 : $("#txtCarrierSeal").val().trim().toUpperCase())
                        , pShipperSeal: ($("#txtShipperSeal").val() == "" ? 0 : $("#txtShipperSeal").val().trim().toUpperCase())
                        , pTareWeight: ($("#txtTareWeight").val() == "" ? 0 : $("#txtTareWeight").val())
                        , pVGM: ($("#txtVGM").val() == "" ? 0 : $("#txtVGM").val())

                        , pIsReefer: ($("#cbIsReefer").prop("checked") ? true : false)
                        , pIsNOR: ($("#cbIsNOR").prop("checked") ? true : false)
                        , pMinTemp: ($("#txtMinTemp").val() == "" ? 0 : $("#txtMinTemp").val())
                        , pMaxTemp: ($("#txtMaxTemp").val() == "" ? 0 : $("#txtMaxTemp").val())
                        , pVentilation: ($("#txtVentilation").val() == "" ? 0 : $("#txtVentilation").val())
                        , pHumidity: ($("#txtHumidity").val() == "" ? 0 : $("#txtHumidity").val())
                        , pLotNumber: ($("#txtLotNumber").val().trim() == "" ? 0 : $("#txtLotNumber").val().trim().toUpperCase())

                        , pPackageTypeIDOnContainer: ($("#slPackageTypesOnContainer").val() == "" || $("#slPackageTypesOnContainer").val() == null ? 0 : $("#slPackageTypesOnContainer").val())
                        , pNumberOfPackagesOnContainer: ($("#txtNumberOfPackagesOnContainer").val() == "" ? 0 : $("#txtNumberOfPackagesOnContainer").val())

                        , pIsIMO: ($("#cbIsIMO").prop("checked") ? true : false)
                        , pIMOClass: ($("#txtIMOClass").val() == "" ? 0 : $("#txtIMOClass").val())
                        , pUNNumber: ($("#txtUNNumber").val() == "" ? 0 : $("#txtUNNumber").val())
                        , pFlashPoint: ($("#txtFlashPoint").val() == "" ? 0 : $("#txtFlashPoint").val())

                        , pDescriptionOfGoods: ($("#divContainerGoodsDescription").val().trim() == "" ? 0 : $("#divContainerGoodsDescription").val().trim().toUpperCase())
                        , pOperatorID: 0 //$("#slOperator").val() == "" ? 0 : $("#slOperator").val()
                        , pTankOrFlexiNumber: 0 //$("#txtTankOrFlexiNumber").val().trim() == "" ? 0 : $("#txtTankOrFlexiNumber").val().trim().toUpperCase()
                        , pIsSentToWarehouse: $("#cbIsSentToWarehouse").prop("checked")
                        , pIsLoaded: $("#cbIsTankLoaded").prop("checked")

                        , pLoadingDate: $("#txtLoadingDateFromOCAP").val().trim() == "" ? "01/01/1900" : $("#txtLoadingDateFromOCAP").val().trim().toUpperCase()
                        , pReturnDate: $("#txtReturnDateFromOCAP").val().trim() == "" ? "01/01/1900" : $("#txtReturnDateFromOCAP").val().trim().toUpperCase()
                        , pTankCertExpiryDate: $("#txtTankCertExpiryDate").val().trim() == "" ? "01/01/1900" : $("#txtTankCertExpiryDate").val().trim().toUpperCase()
                        , pWarehouseID: $('#slWarehouse').val() > 0 ? $('#slWarehouse').val() : 0
                        , pReturnDepot: $("#txtReturnDepot").val().trim() == "" ? 0 : $("#txtReturnDepot").val().trim().toUpperCase()
                        , pIsPeriodicTest: $("#cbIsPeriodicTest").prop("checked")
                        , pPurchaseItemID: ($("#slPurchaseItems").val() == "" || $("#slPurchaseItems").val() == null ? 0 : $("#slPurchaseItems").val())
                        , pStatusID: $("#slStatusIDFromOCAP").val() == "" ? 0 : $("#slStatusIDFromOCAP").val()
                    };
                    CallGETFunctionWithParameters("/api/OperationContainersAndPackages/Update", pParametersWithValues
                        , function (pData) {
                            if (pData[0]) {
                                //ShipmentPackage_BindTableRows(JSON.parse(pData[2]));
                                LoadShipmentPackages($("#hShipmentID").val());
                                //Shipments_FillControls($("#hShipmentID").val());
                                swal("Success", "Saved successfully.");
                                if (pSaveAndNew)
                                    ShipmentPackage_ClearAllControls();
                            }
                            else
                                swal("Sorry", "Connection failed, please try again.");
                            FadePageCover(false);
                        }
                        , null);
                }
            }
    }
    else { //LCL,LTL,CONSOL (type of master operation) (no air)
        if ($("#txtPackagesQuantity").val().trim() == "" || $("#txtPackagesQuantity").val().trim() < 1)
            swal("Sorry", "Quantity must be greater than 0.");
        else if (ValidateForm("form", "EditPackageModal")) {
            FadePageCover(true);
            var pParametersWithValues = {
                pID: $("#hPackageID").val() == "" ? 0 : $("#hPackageID").val()
                , pMasterOperationID: $("#hOperationID").val()
                , pShipmentID: $("#hShipmentID").val() == "" ? 0 : $("#hShipmentID").val()
                , pPackageTypeID: ($("#slPackageTypes").val() == "" ? 0 : $("#slPackageTypes").val())
                , pPlacedOnOCPID: ($("#slShipmentContainers").val() == "" ? 0 : $("#slShipmentContainers").val())
                , pLength: ($("#txtLength").val() == "" ? 0 : $("#txtLength").val())
                , pWidth: ($("#txtWidth").val() == "" ? 0 : $("#txtWidth").val())
                , pHeight: ($("#txtHeight").val() == "" ? 0 : $("#txtHeight").val())
                , pVolume: ($("#txtVolume").val() == "" ? 0 : $("#txtVolume").val())
                , pVolumetricWeight: ($("#txtVolumetricWeight").val() == "" ? 0 : $("#txtVolumetricWeight").val())
                , pNetWeight: ($("#txtNetWeight").val() == "" ? 0 : $("#txtNetWeight").val())
                , pGrossWeight: ($("#txtGrossWeight").val() == "" ? 0 : $("#txtGrossWeight").val())
                , pChargeableWeight: ($("#txtChargeableWeight").val() == "" ? 0 : $("#txtChargeableWeight").val())
                , pQuantity: ($("#txtPackagesQuantity").val() == "" ? 0 : $("#txtPackagesQuantity").val())
                , pDescriptionOfGoods: ($("#txtPackageDescriptionOfGoods").val().trim() == "" ? "0" : $("#txtPackageDescriptionOfGoods").val().trim().toUpperCase())
                //Header fields
                , pBranchID: $('#slOperationBranch option:selected').val()
                , pSalesmanID: $('#slOperationSalesman option:selected').val()
                , pOpenDate: ConvertDateFormat($("#txtOperationOpenDate").val().trim())
                , pHouseNumber: $("#txtShipmentHouseNumber").val().trim() == "" ? "0" : $("#txtShipmentHouseNumber").val().trim().toUpperCase()
                , pDeliveryCityID: ($("#slDeliveryCity").val() == "" || $("#slDeliveryCity").val() == undefined || $("#slDeliveryCity").val() == null ? 0 : $("#slDeliveryCity").val())
                , pShipperID: $("#slShippers").val() == "" ? 0 : $("#slShippers").val()
                , pConsigneeID: $("#slConsignees").val() == "" ? 0 : $("#slConsignees").val()
                , pAgentID: $("#slAgents").val() == "" ? 0 : $("#slAgents").val()
                , pNotifyID: $("#slNotify").val() == "" || $("#slNotify").val() == null ? 0 : $("#slNotify").val()
                , pNotesOnHeader: $("#divNotes").val().trim() == "" ? "0" : $("#divNotes").val().trim().toUpperCase()

                , pIsDelivered: $("#cbIsDelivered").prop("checked")
                , pConsigneeID2: $("#slConsignees2").val() == "" ? 0 : $("#slConsignees2").val()
                , pReleaseDate: ($("#txtShipmentReleaseDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtShipmentReleaseDate").val()))
            };
            CallGETFunctionWithParameters("/api/OperationContainersAndPackages/ShipmentPackage_Save", pParametersWithValues
                , function (pData) {
                    if (pData[0] > 0) { //pData[0] is the OCPID in case of success else 0
                        var pShipmentPackages = JSON.parse(pData[1]);
                        ShipmentPackage_BindTableRows(pShipmentPackages);
                        if (pSaveAndNew)
                            ShipmentPackage_ClearAllControls();
                        else
                            jQuery("#EditPackageModal").modal("hide");
                        Shipments_LoadAvailableShipments();
                        FadePageCover(false);
                        swal("Success", "Saved Successfully.");
                    }
                    else {
                        swal("Sorry", "Connection failed, please try again.");
                    }
                }
                , null);
        }
    }
}
function ShipmentPackage_DeleteList() {
    debugger;
    var pTableName = "tblShipmentPackage";
    if ($("#cbIsAWB").prop("checked")) {
        pTableName = "tblShipmentPackageMulti";
    }
    var pShipmentPackageIDToDelete = GetAllSelectedIDsAsString(pTableName);
    if (pShipmentPackageIDToDelete == "") {
        pTableName = "tblShipmentPackageMulti";
        pShipmentPackageIDToDelete = GetAllSelectedIDsAsString(pTableName);
    }
    if (pShipmentPackageIDToDelete != "")
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
                CallGETFunctionWithParameters("/api/OperationContainersAndPackages/ShipmentPackage_DeleteList"
                    , { pShipmentPackageIDToDelete: pShipmentPackageIDToDelete, pShipmentID: (pTableName == "tblShipmentPackageMulti" /*$("#cbIsAWB").prop("checked")*/ ? $("#hOperationIDAWB").val() : $("#hShipmentID").val()) }
                    , function (pData) {
                        if (pData[0]) {
                            $("#slCargoPlacedOnContainer").val("");
                            
                            swal("Success", "Records deleted successfully.");
                        } else
                            swal("Sorry", strDeleteFailMessage);
                        var pShipmentPackages = JSON.parse(pData[1]);
                        if (pTableName == "tblShipmentPackageMulti" /*$("#cbIsAWB").prop("checked")*/) {
                            ShipmentPackag_MultiRowEditLoad();
                        }
                        else {
                            Shipments_LoadAvailableShipments();
                            ShipmentPackage_BindTableRows(pShipmentPackages);
                        }
                        FadePageCover(false);
                    });
            });
}
function TRCK_Equipments_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblHouseVechiles') != "")
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
                DeleteListFunction("/api/TRCK_Equipments/Delete", { "pTRCK_EquipmentsIDs": GetAllSelectedIDsAsString('tblHouseVechiles') }, function (pdata) {
                    if (!pdata) {
                        swal("Success", "Deleted Successfully");

                    }
                    else {
                        swal("Error");
                    }
                });
                //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
            });
}
/*******************************************AWB functions*************************************************/
function ShipmentsAWB_BindTableRows(item) {
    ClearAllTableRows("tblMasterAWB");
    debugger;
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    //$.each(pOperations, function (i, item) {
    //var Printoption =
    //    + ' <select class="btn btn-outline-secondary  btn-rounded btn-info float-right dropdown-toggle" data-toggle="dropdown">'
    //    + '<option> <span class="fa fa-print"></span> Print</option>'
    //    + '<option> <span class="fa fa-print"></span> Standard</option>'
    //    + '<option> <span class="fa fa-print"></span> A4 Paper</option>'
    //    + ' </select>';
    var editControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' title='Edit'> <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Print" + "</span>";
    var AddControlsText = " class='btn btn-xs btn-rounded btn-warning float-right' title='Add'> <i class='fa fa-plus' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Add House Bill") + "</span>";
    var ViewControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' title='View House bills'> <i class='fa fa-file-text' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("View House Bills") + "</span>";

    var Printoption = '<div class="dropdown float-right">'
        + ' <button class="btn btn-xs float-right btn-rounded btn-info dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">'
        + '  &nbsp;<span class="fa fa-print">&nbsp;Print</span>&nbsp;</button>'
        + ' <ul class="dropdown-menu float-left" role="menu" aria-labelledby="menu1">'
        + '  <li role="presentation"><a role="menuitem" style="text-align:left;" tabindex="-1" href="#" onclick="DocsOut_Print(220, 0, ' + item.ID + ' , 0);" >Bill Doc</a></li>'
        + '   <li role="presentation"><a role="menuitem" tabindex="-1" style="text-align:left;" href="#" onclick="DocsOut_Print(220, 0, ' + item.ID + ' , 1);">A4 Paper</a></li></ul></div>';

    //var Printoption = ' <div class="input-group mt-3 mb-3 float-right"> <div class="input-group-prepend open"> <button type="button" class="btn btn-xs btn-outline-secondary  btn-rounded btn-info float-right dropdown-toggle" data-toggle="dropdown"> <span class="fa fa-print"></span> Print </button> <div class="dropdown-menu" style="margin-top:20px;"> <a class="dropdown-item" style="padding-left:1px; text-align:left!important;" href="#" onclick="">Standard</a><br>   <a class="dropdown-item" href="#" onclick="">A4 Paper</a> </div> </div></div>';

    AppendRowtoTable(("tblMasterAWB"),
        ("<tr style='height:15px;' ID='" + item.ID + "' ondblclick='ShipmentsAWB_FillControls(" + item.ID + ");'>"
            + "<td class='ConnectionID hide'> <small> <input name='ConnectOrDisconnect' type='checkbox' onchange='Shipments_ConnectOrDisconnect(" + item.ID + ", null);' value ='" + item.ID + "'" + (item.MasterOperationID == $("#hOperationID").val() ? " checked='checked' " : " ") + (item.IsPackagesPlacedOnMaster == 0 && OEShi ? "" : " disabled='disabled ' ") + " /></small></td>"
            + "<td class='shownOpenDate hide'>" //+ "<span class='pull-left thumb-sm  calendar-icon-style'>"
            //+ " <i class='fa fa-calendar'></i>"
            //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + "</small>"
            + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.OpenDate)) + "</small>"
            + "</span>"
            + "</td>"
            + "<td class='OpenDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.OpenDate)) + "</td>"

            + "<td class='OperationCode hide'>" + item.Code + "</td>"

            //+ "<td class='HWB'>" + "<small>" + item.AirlinePrefix + ">" + item.HouseNumber + "</small>" + "</td>"
            + "<td class='HWB'>" + "<small>" + item.AirlinePrefix + ">" + item.MAWBSuffix + "</small>" + "</td>"

            + "<td calss='AirlineCode'>" + item.POLCode + " > " + item.PODCode + "-" + item.AirlineCode + "</td>"// item.AirlineCode 
            //+ "<td class='CodeSerial hide'>" + item.CodeSerial + "</td>"

            + "<td class='Client'>" + "<small>" + (item.DirectionType == 1 ? (item.ConsigneeName == 0 ? "" : item.ConsigneeName) : (item.ShipperName == 0 ? "" : item.ShipperName)) + "</small>" + "</td>"

            //+ "<td class='Shipper hide' val='" + item.ShipperID + "'>" + item.ShipperName + "</td>"
            //+ "<td class='ShipperAddress hide' val='" + item.ShipperAddressID + "'>" + item.ShipperAddressID + "</td>"
            //+ "<td class='ShipperContact hide' val='" + item.ShipperContactID + "'>" + item.ShipperContactID + "</td>"
            //+ "<td class='Consignee hide' val='" + item.ConsigneeID + "'>" + item.ConsigneeName + "</td>"
            //+ "<td class='ConsigneeAddress hide' val='" + item.ConsigneeAddressID + "'>" + item.ConsigneeAddressID + "</td>"
            //+ "<td class='ConsigneeContact hide' val='" + item.ConsigneeContactID + "'>" + item.ConsigneeContactID + "</td>"

            //+ "<td class='OperationStage hide' val='" + item.OperationStageID + "'>" + item.OperationStageName + "</td>"
            //+ "<td class='Branch hide' val='" + item.BranchID + "'>" + "<small>" + (item.BranchID == 0 ? "" : item.BranchName) + "</small>" + "</td>"
            //+ "<td class='Salesman hide' val='" + item.SalesmanID + "'>" + item.Salesman + "</td>"
            //+ "<td class='Notes hide'>" + item.Notes + "</td>"
            ////+ "<td class=''><a href='#' data-toggle='modal' onclick='DocsOut_Print(220,0," + item.ID + ");' " + printControlsText + "</a><a onclick='SwitchToOperationsEditView(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
            + "<td class='rounded-right'>" + Printoption /*<a href='#' data-toggle='modal' onclick='DocsOut_Print(220,0," + item.ID + ");' " + printControlsText + "</a>"*/
            + "&nbsp<a href='#' data-toggle='modal' " + ($("#hIsBillM").val() == "1" ? "" : "class=' hide'") + "  onclick='ShipmentsAWB_ClearAllControls(false," + item.ID + ");' " + AddControlsText + "</a>"
            //+ "&nbsp<a  href='#' data-toggle='modal' " + ($("#hIsBillM").val() == "1" ? "" : "class=' hide'") + " onclick='AirsHouseBills_LoadAvailableShipments(" + item.ID + ");' " + ViewControlsText + "</a>"
            + "</td></tr>"));
    debugger;
    //});
    debugger;
    //ApplyPermissions();
    //if ($("#hShipmentType").val() == constConsolidationShipmentType && OAShi) $("#btn-AddShipment").removeClass("hide"); else $("#btn-AddShipment").addClass("hide");
    //if ($("#hBLType").val() == constMasterBLType && OABLD && $("#hIsOperationDisabled").val() == false && $("#hIsBillM").val() == "1") {
    if ($("#hBLType").val() == constMasterBLType && $("#hIsOperationDisabled").val() == false) {
        //$("#btn-AddBillsofLading").removeClass("hide");
    }
    else {
        $("#btn-AddBillsofLading").addClass("hide");
    }

    //BindAllCheckboxonTable("tblShipments", "ID");//it attaches function to the checkboxes so when all are checked then check cb-checkall too
    //CheckAllCheckbox("ID");
    //HighlightText("#tblShipments>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }

    intRowsCount = $('#tblMasterAWB tr').length - 1;//document.getElementById("tblMasterAWB").getElementsByTagName("tr").length - 1;
    if (intRowsCount > 0) {
        $("#tblMasterAWB").removeClass("hide");
        $("#spanNoMasterAWB").addClass("hide");
    }
    else {
        $("#tblMasterAWB").addClass("hide");
        $("#spanNoMasterAWB").removeClass("hide");
    }
}
function ShipmentsAWB_Houses_BindTableRows(pOperations) {
    ClearAllTableRows("tblHouseAWB");
    debugger;
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pOperations, function (i, item) {
        //var Printoption =
        //    + ' <select class="btn btn-outline-secondary  btn-rounded btn-info float-right dropdown-toggle" data-toggle="dropdown">'
        //    + '<option> <span class="fa fa-print"></span> Print</option>'
        //    + '<option> <span class="fa fa-print"></span> Standard</option>'
        //    + '<option> <span class="fa fa-print"></span> A4 Paper</option>'
        //    + ' </select>';
        var editControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' title='Edit'> <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        var printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Print" + "</span>";
        var AddControlsText = " class='btn btn-xs btn-rounded btn-warning float-right' title='Add'> <i class='fa fa-plus' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Add House Bill") + "</span>";
        var ViewControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' title='View House bills'> <i class='fa fa-file-text' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("View House Bills") + "</span>";

        var Printoption = '<div class="dropdown float-right">'
            + ' <button class="btn btn-xs float-right btn-rounded btn-info dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">'
            + '  &nbsp;<span class="fa fa-print">&nbsp;Print</span>&nbsp;</button>'
            + ' <ul class="dropdown-menu float-left" role="menu" aria-labelledby="menu1">'
            + '  <li role="presentation"><a role="menuitem" style="text-align:left;" tabindex="-1" href="#" onclick="DocsOut_Print(220, 0, ' + item.ID + ' , 0);" >Bill Doc</a></li>'
            + '   <li role="presentation"><a role="menuitem" tabindex="-1" style="text-align:left;" href="#" onclick="DocsOut_Print(220, 0, ' + item.ID + ' , 1);">A4 Paper</a></li></ul></div>';

        //var Printoption = ' <div class="input-group mt-3 mb-3 float-right"> <div class="input-group-prepend open"> <button type="button" class="btn btn-xs btn-outline-secondary  btn-rounded btn-info float-right dropdown-toggle" data-toggle="dropdown"> <span class="fa fa-print"></span> Print </button> <div class="dropdown-menu" style="margin-top:20px;"> <a class="dropdown-item" style="padding-left:1px; text-align:left!important;" href="#" onclick="">Standard</a><br>   <a class="dropdown-item" href="#" onclick="">A4 Paper</a> </div> </div></div>';

        AppendRowtoTable(("tblHouseAWB"),
            ("<tr style='height:15px;' ID='" + item.ID + "' ondblclick='ShipmentsAWB_FillControls(" + item.ID + ");'>"
                + "<td class='ConnectionID hide'> <small> <input name='ConnectOrDisconnect' type='checkbox' onchange='Shipments_ConnectOrDisconnect(" + item.ID + ", null);' value ='" + item.ID + "'" + (item.MasterOperationID == $("#hOperationID").val() ? " checked='checked' " : " ") + (item.IsPackagesPlacedOnMaster == 0 && OEShi ? "" : " disabled='disabled ' ") + " /></small></td>"
                + "<td class='shownOpenDate hide'>" //+ "<span class='pull-left thumb-sm  calendar-icon-style'>"
                //+ " <i class='fa fa-calendar'></i>"
                //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + "</small>"
                + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.OpenDate)) + "</small>"
                + "</span>"
                + "</td>"
                + "<td class='OpenDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.OpenDate)) + "</td>"

                + "<td class='OperationCode hide'>" + item.Code + "</td>"
                //+ "<td class='HWB'>" + "<small>" + item.AirlinePrefix + ">" + item.HouseNumber + "</small>" + "</td>"
                + "<td class='HWB'>" + "<small>" + item.AirlinePrefix + ">" + item.MAWBSuffix + "</small>" + "</td>"
                + "<td calss='AirlineCode'>" + item.POLCode + " > " + item.PODCode + "-" + item.AirlineCode + "</td>"// item.AirlineCode 
                //+ "<td class='CodeSerial hide'>" + item.CodeSerial + "</td>"

                + "<td class='Client'>" + "<small>" + (item.DirectionType == 1 ? (item.ConsigneeName == 0 ? "" : item.ConsigneeName) : (item.ShipperName == 0 ? "" : item.ShipperName)) + "</small>" + "</td>"

                //+ "<td class='Shipper hide' val='" + item.ShipperID + "'>" + item.ShipperName + "</td>"
                //+ "<td class='ShipperAddress hide' val='" + item.ShipperAddressID + "'>" + item.ShipperAddressID + "</td>"
                //+ "<td class='ShipperContact hide' val='" + item.ShipperContactID + "'>" + item.ShipperContactID + "</td>"
                //+ "<td class='Consignee hide' val='" + item.ConsigneeID + "'>" + item.ConsigneeName + "</td>"
                //+ "<td class='ConsigneeAddress hide' val='" + item.ConsigneeAddressID + "'>" + item.ConsigneeAddressID + "</td>"
                //+ "<td class='ConsigneeContact hide' val='" + item.ConsigneeContactID + "'>" + item.ConsigneeContactID + "</td>"

                //+ "<td class='OperationStage hide' val='" + item.OperationStageID + "'>" + item.OperationStageName + "</td>"
                //+ "<td class='Branch hide' val='" + item.BranchID + "'>" + "<small>" + (item.BranchID == 0 ? "" : item.BranchName) + "</small>" + "</td>"
                //+ "<td class='Salesman hide' val='" + item.SalesmanID + "'>" + item.Salesman + "</td>"
                //+ "<td class='Notes hide'>" + item.Notes + "</td>"
                ////+ "<td class=''><a href='#' data-toggle='modal' onclick='DocsOut_Print(220,0," + item.ID + ");' " + printControlsText + "</a><a onclick='SwitchToOperationsEditView(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
                + "<td class='rounded-right'>" + Printoption /*<a href='#' data-toggle='modal' onclick='DocsOut_Print(220,0," + item.ID + ");' " + printControlsText + "</a>"*/
                //+ "&nbsp<a href='#' data-toggle='modal' " + ($("#hIsBillM").val() == "1" ? "" : "class=' hide'") + "  onclick='ShipmentsAWB_ClearAllControls(false," + item.ID + ");' " + AddControlsText + "</a>"
                //+ "&nbsp<a  href='#' data-toggle='modal' " + ($("#hIsBillM").val() == "1" ? "" : "class=' hide'") + " onclick='AirsHouseBills_LoadAvailableShipments(" + item.ID + ");' " + ViewControlsText + "</a>"
                + "</td></tr>"));
    });
    debugger;
    //ApplyPermissions();
    //if ($("#hShipmentType").val() == constConsolidationShipmentType && OAShi) $("#btn-AddShipment").removeClass("hide"); else $("#btn-AddShipment").addClass("hide");
    //if ($("#hBLType").val() == constMasterBLType && OABLD && $("#hIsOperationDisabled").val() == false && $("#hIsBillM").val() == "1") {
    if ($("#hBLType").val() == constMasterBLType && $("#hIsOperationDisabled").val() == false) {
        //$("#btn-AddBillsofLading").removeClass("hide");
    }
    else {
        $("#btn-AddBillsofLading").addClass("hide");
    }

    //BindAllCheckboxonTable("tblShipments", "ID");//it attaches function to the checkboxes so when all are checked then check cb-checkall too
    //CheckAllCheckbox("ID");
    //HighlightText("#tblShipments>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }

    intRowsCount = $('#tblHouseAWB tr').length - 1;//document.getElementById("tblHouseAWB").getElementsByTagName("tr").length - 1;
    if (intRowsCount > 0) {
        $("#tblHouseAWB").removeClass("hide");
        $("#spanNoHouseAWB").addClass("hide");
    }
    else {
        $("#tblHouseAWB").addClass("hide");
        $("#spanNoHouseAWB").removeClass("hide");
    }
}
function ShipmentsAWB_ClearAllControls(pIsMasterBill, pMasterBillId) { //called when adding a new house shipment to a master to clear the ShipmentModal
    debugger;
    $("#hOperationIDAWB").val("");
    $("#tblShipmentPackageMulti tbody").html("");
    $(".hideForAWB").addClass("hide");
    $("#SlAirLine").attr("disabled", "disabled");
    if (pDefaults.UnEditableCompanyName == "UNF") {
        $("#slPODAir").removeAttr("disabled");
    }
    $("#ModelIsNew").val("0")
    if ($("#hIsOperationDisabled").val() == false) {
        $("#divShipmentPackageBtns").removeClass("hide");
        //$("#divShipmentPackage").removeClass("hide");
    }
    else {
        $("#divShipmentPackageBtns").addClass("hide");
        //$("#divShipmentPackage").addClass("hide");
    }
    if ($("#cbIsConsolidation").prop("checked")) {
        $("#divShipmentContainers").removeClass("hide"); //in EditPackageModal 
    }
    else {
        $("#divShipmentContainers").addClass("hide"); //in EditPackageModal
    }
    if (pIsMasterBill == true) {
        $("#hBillID").val($("#hOperationID").val());
    }
    else {
        $("#hBillID").val(pMasterBillId);
    }
    $("#lblHouseNumber").text("");
    //$("#divPkgsAndPybl").addClass("hide");
    $("#divPkgsAndPybl").slideUp();
    FadePageCover(true);
    $("#tblShipmentPackage tbody").html("");
    ClearAll("#ShipmentAirModal");
    jQuery("#ShipmentAirModal").modal("show");
    $("#lblShownShipment").html(" / " + $("#hOperationCode").val());
    $("#txtOperationOpenDateAir").val(getTodaysDateInddMMyyyyFormat());
    $("#txtOperationCloseDateAir").val($("#txtCloseDate").val());
    DeliveryCity_GetList(null, $("#hPODCountryID").val());
    var pParametersWithValues = null;
    if (pIsMasterBill == true) {
        pParametersWithValues = { pMasterOperationID: $("#hOperationID").val(), pShipmentID: 0, pDefaultCountryID: pDefaults.DefaultCountryID, pShowUserSalesmen: pDefaults.ShowUserSalesmen, pUnEditableCompanyName: pDefaults.UnEditableCompanyName, pFromOperation: true };
    }
    else {
        pParametersWithValues = { pMasterOperationID: $("#hOperationID").val(), pShipmentID: pMasterBillId, pDefaultCountryID: pDefaults.DefaultCountryID, pShowUserSalesmen: pDefaults.ShowUserSalesmen, pUnEditableCompanyName: pDefaults.UnEditableCompanyName, pFromOperation: true };
    }
    var pAirHeader = null;
    var pShipmentPackages = null;
    var pPayables = null;
    expandCollapseTrnst(false);
    expandCollapseDangerousShippingDeclaration(false);
    //----------- mostaa---------------------------------
    //expandCollapseAccountingInformation(false);

    // expandCollapseHandlingInformation(false);
    //  expandCollapseDescription(false);
    //-----------------------------------------------------
    CallGETFunctionWithParameters("/api/Operations/FillShipmentControls", pParametersWithValues
        , function (pData) {
            pAirHeader = JSON.parse(pData[0]); //this is new
            //var pCustomers = pData[1];
            //var pAgents = pData[2];
            pShipmentPackages = JSON.parse(pData[3]); //this is new
            //var pPackageTypes = pData[4];
            //var pFinalDestination = pData[5];
            //var pContainers = pData[6];
            var pVia123 = pData[20];
            var pAirLine1 = pData[9];
            //var pCurncy = pData[6];
            //var pCMdty = pData[7];
            pPayables = JSON.parse(pData[10]);
            var pMAWBStock = pData[11];
            //var pNotifyID = pData[7];

            //FillListFromObject(null, 2, "<--Select-->", "slShippersAir", pCustomers
            //    , function () {
            //        $("#slConsigneesAir").html($("#slShippersAir").html()); $("#slConsigneesAir").val(0);
            //        //$("#slNotify").html($("#slShippersAir").html()); $("#slNotify").val("");
            //    });
            
            $("#slShippersAir").html($("#hReadySlCustomers").html());
            $("#slConsigneesAir").html($("#hReadySlCustomers").html());
            $("#slNotifyAir").html($("#hReadySlCustomers").html());
            $("#slAgentsAir").html($("#hReadySlAgents").html());
            $("#slConsigneesAir").val("");
            $("#slNotifyAir").val("");

            //FillListFromObject(null, 2, "<--Select-->", "slAgentsAir", pAgents, null);


            //FillListFromObject(null, 2, "<--Select-->", "slPackageTypes", pPackageTypes, null); //to be used when open PackagesModal
            //$("#slShipmentPackageTypes").html($("#slPackageTypes").html());
            //FillListFromObject($("#hPOD").val(), 4, "<--Select-->", "slDeliveryCity", pFinalDestination, null);
            //FillListFromObject(null, 11, "<--Select-->", "slShipmentContainers", pContainers, null); //to be used when open PackagesModal
            FillListFromObject(null, 2, "<--Select-->", "slVia1", pVia123, null); //to be used when open via1,via2,via3
            FillListFromObject(null, 2, "<--Select-->", "SlAirLine1", pAirLine1, null);// pAirline1
            //FillListFromObject(null, 1, "<--Select-->", "slAirCurrencies", pCurncy, null);//currency
            $("#slAirCurrencies").html($("#hReadySlCurrencies").html());
            //FillListFromObject(null, 2, "<--Select-->", "slCommodityAir", pCMdty, null);//commidty
            $("#slCommodityAir").html($("#slCommodities").html());
            FillListFromObject(null, 17, "<--Select-->", "SlMAWBStockAir", pMAWBStock, null);//MAWBStock 
            FadePageCover(false);
        }
        ,
        function () {
            $("#slVia2").html($("#slVia1").html());
            $("#slVia3").html($("#slVia1").html());
            $("#slPODAir").html($("#slVia1").html()); $("#slPODAir").val($("#hPOD").val());
            $("#SlAirLine2").html($("#SlAirLine1").html());
            $("#SlAirLine3").html($("#SlAirLine1").html());
            $("#SlAirLine").html($("#SlAirLine1").html()); $("#SlAirLine").val($("#hAirlineID").val());
            $("#slAgentsAir").val(pDefaults.DefaultAgentID);

           
            TypeOfStockAir_GetList(null, null);
            getbillOfLadingNoAir();

            $("#txtFlightNoAir").val($("#hVoyageOrTruckNumber").val());
            $("#txtArrivalDateAir").val(ConvertDateFormat(GetDateWithFormatMDY($("#hExpectedArrival").val())));
            
            if (pIsMasterBill == false) {
                $("#hFillNewAirHouse").val(1);
                BindingShipmentAirModal(pAirHeader);
            }
            AirPackage_BindTableRows(pShipmentPackages);
            //if (pIsMasterBill == false) {
            //    $("#hShipmentAirID").val(pMasterBillId);
            //    ShipmentPackag_MultiRowEditLoad();
            //}
            //else {
            //    $("#hShipmentAirID").val(0);
            //}
            $("#hShipmentAirID").val(0);
            ////start from here (uncomment nest line)
            //AirPayables_BindTableRows(pPayables);
            if (pIsMasterBill == true) {
                $("#txtAmountOfInsurance").val("XXXXXX");
            }
        }

    );

    $("#slOperationBranchAir").html($("#hReadySlBranches").html());
    $("#slOperationSalesmanAir").html($("#slOperationEditSalesman").html()); $("#slOperationSalesmanAir").val($("#hLoggedUserID").val());
    debugger;

    if ($("#hDirectionType").val() == constImportDirectionType) {
        $("#slConsigneesAir").attr("data-required", true);
        $("#slShippersAir").attr("data-required", false);
        $("#txtArrivalDateAir").attr("data-required", false);
    }
    else { //Export or Domestic
        $("#slShippersAir").attr("data-required", true);
        $("#slConsigneesAir").attr("data-required", false);
        $("#txtArrivalDateAir").attr("data-required", true);
    }
    $("#slNotifyAir").attr("data-required", true);

    //parameter in the next 3 lines are 1:Quotations call, 2:Operations call
    $("#btn-NewAddShipperAir").attr("onclick", "Customers_ClearAllControls(2);");
    $("#btn-NewAddConsigneeAir").attr("onclick", "Customers_ClearAllControls(2);");
    $("#btn-NewAddNotify").attr("onclick", "Customers_ClearAllControls(2);");
    $("#btn-NewAddAgentAir").attr("onclick", "Agents_ClearAllControls(2);");
    $("#btn-NewAddVessel").attr("onclick", "Vessels_ClearAllControls(null,2);");

    $("#btn-EditShipperAir").attr("onclick", "Customers_FillControlsFromOperations($('#slShippersAir option:selected').val(), null, 2);");
    $("#btn-EditConsigneeAir").attr("onclick", "Customers_FillControlsFromOperations($('#slConsigneesAir option:selected').val(), null, 2);");
    $("#btn-EditNotifyAir").attr("onclick", "Customers_FillControlsFromOperations($('#slNotifyAir option:selected').val(), null, 2);");
    //$("#btn-EditNotify").attr("onclick", "Customers_FillControlsFromOperations($('#slNotify option:selected').val(), null, 2);");
    $("#btn-EditAgentAir").attr("onclick", "Agents_FillControlsFromOperations($('#slAgentsAir option:selected').val(), null, 2);");

    //$("#btnSaveBillsofLading").attr("onclick", "ShipmentsAWB_Insert(true,true, function(pData) {Shipments_ConnectOrDisconnect(pData[1], true, true); $('#hShipmentAirID').val(pData[1]); $('#hOperationIDAWB').val(pData[1]); $('#btnSaveBillsofLading').attr('onclick','function(){ShipmentsAWB_Update();}'); swal('Success', 'Saved Successfully,'); });");
    $("#btnSaveBillsofLading").attr("onclick", "ShipmentsAWB_Insert(true,true);");
    $("#btnPrintBillsofLadingDoc").attr("onclick", "DocsOut_Print(220,0," + $("#hBillID").val() + " , 0);").hide();
    $("#btnPrintBillsofLadingA4").attr("onclick", "DocsOut_Print(220,0," + $("#hBillID").val() + " , 1);").hide();
    //$("#btnSaveandNewShipment").attr("onclick", "Operations_Insert(true);");
}

//$('#myCheckbox').change(function () {
//    ShipmentsAWB_FillControls()
//}
//);
function CopyPackagesFromMasterToHouse(pID) {
    debugger;
    var pParametersWithValues = { pMasterOperationID: $("#hOperationID").val(), pHouseID: pID };
    CallGETFunctionWithParameters("/api/Operations/CopyPackagesFromMasterToHouse", pParametersWithValues
        , function () {
                ShipmentsAWB_FillControls(pID);
        }
    );
}

function CopyRoutingAndDestinationFromMasterToHouse(pID) {
    debugger;
    var pParametersWithValues = { pMasterID: $("#hOperationID").val(), pHouseID: pID };
    CallGETFunctionWithParameters("/api/Operations/CopyRoutingAndDestinationFromMasterToHouse", pParametersWithValues
        , function () {
            ShipmentsAWB_FillControls(pID);
        }
    );
}
function ShipmentsAWB_FillControls(pID) {
    debugger;
 
    FadePageCover(true);
    ClearAllTableRows("tblPayablesAWB");
    $("#tblShipmentPackageMulti tbody").html("");
    //$(".hideForAWB").addClass("hide");
    if (pDefaults.UnEditableCompanyName == "UNF") {
        $("#slPODAir").attr("data-required", "false");
        $("#slPODAir").removeAttr("disabled");

    }
    if (pDefaults.UnEditableCompanyName == "REL") {
        $(".showForRelan").removeClass("hide");

    }
    $("#ModelIsNew").val("1");
    if ($("#hIsOperationDisabled").val() == false) {
        $("#divShipmentPackageBtns").removeClass("hide");
        //$("#divShipmentPackage").removeClass("hide");
    }
    else {
        $("#divShipmentPackageBtns").addClass("hide");
        //$("#divShipmentPackage").addClass("hide");
    }
    if ($("#cbIsConsolidation").prop("checked")) {
        //$("#divShipmentContainers").removeClass("hide"); //in EditPackageModal 
        $("#EditPackageModal").removeClass("hide"); //in EditPackageModal 
    }
    //else {
    //    //$("#divShipmentContainers").addClass("hide"); //in EditPackageModal
    //    $("#EditPackageModal").addClass("hide"); //in EditPackageModal
    //}
    //$("#divPkgsAndPybl").removeClass("hide");
    if (!$("#cbIsAWB").prop("checked")) {
        $(".classHideForAirButNotAWB").addClass("hide");
    }
    if (glbCallingControlInOperation == 'Shipments') {
        $(".classHideForMaster").removeClass("hide");
    } else {
        $(".classHideForMaster").addClass("hide");
    }
    $("#divPkgsAndPybl").slideDown();

    $("#tblShipmentPackage tbody").html("");
    ClearAll("#ShipmentAirModal");
    if (pID == 0) {
        $("#txtOperationOpenDateAir").val($("#txtOpenDate").val());
        $("#txtOperationCloseDateAir").val($("#txtCloseDate").val());
        $("#slOperationBranchAir").html($("#slOperationEditBranch").html());
        $("#slOperationBranchAir option").removeAttr("disabled");
        $("#slOperationSalesmanAir").html($("#slOperationEditSalesman").html());
        //$("#SlAirLine").removeAttr("disabled");
        $('#slShippersAir').val(0).trigger('change');
        $('#slConsigneesAir').val(0).trigger('change');
        $('#slNotifyAir').val(0).trigger('change');


        $("#btnSaveBillsofLading").attr("onclick", "ShipmentsAWB_Insert(true,true);");
    }
    else
        $("#btnSaveBillsofLading").attr("onclick", "ShipmentsAWB_Update();");

    $("#btn-CopyPackagesFromMaster").attr("onclick", "CopyPackagesFromMasterToHouse(" + pID + ");");
    $("#btn-CopyRoutingAndDestinationFromMaster").attr("onclick", "CopyRoutingAndDestinationFromMasterToHouse(" + pID + ");");

    if (pDefaults.UnEditableCompanyName == "BAD") {
        $("#SlAirLine").attr("data-required", "false");
    }

    jQuery("#ShipmentAirModal").modal("show");
    var pParametersWithValues = { pMasterOperationID: $("#hOperationID").val(), pShipmentID: pID, pDefaultCountryID: pDefaults.DefaultCountryID, pShowUserSalesmen: pDefaults.ShowUserSalesmen, pUnEditableCompanyName: pDefaults.UnEditableCompanyName, pFromOperation: true };
    var pAirHeader = null;
    var pShipmentPackages = null;
    var pPayables = null;
    TypeOfStockAir_GetList(null, null);
    //getbillOfLadingNoAir();
    expandCollapseTrnst(false);
    expandCollapseCharges(false);
    expandCollapseDangerousShippingDeclaration(false);
    //------------------------- mostaa---------
    // expandCollapseAccountingInformation(false);
    // expandCollapseHandlingInformation(false);
    //expandCollapseDescription(false);
    //--------------------------------------------
    var ConsigneeName = "";
    var NotifyName = "";
    var ShipperName = "";
    CallGETFunctionWithParameters("/api/Operations/FillShipmentControls", pParametersWithValues
        , function (pData) {
            pAirHeader = JSON.parse(pData[0]); //this is new
            pMainRoute = JSON.parse(pData[8]);
            if (pID == 0 || pAirHeader.BLType == constHouseBLType) {
                $("#SlAirLine").attr("disabled", "disabled");
                if (pDefaults.UnEditableCompanyName != "UNF") {
                $("#slPODAir").attr("disabled", "disabled");
                }
            }
            else {
                //$("#SlAirLine").removeAttr("disabled");
                $("#slPODAir").removeAttr("disabled");
            }
            $("#hOperationIDAWB").val(pID == 0 ? 0 : pAirHeader.ID);
            //var pCustomers = pData[1];
            //var pAgents = pData[2];
            pShipmentPackages = JSON.parse(pData[3]); //this is new
            //var pPackageTypes = pData[4];
            //var pFinalDestination = pData[5];
            //var pContainers = pData[6];
            var pVia123 = pData[20];
            var pAirLine1 = pData[9];
            //var pCurncy = pData[6];
            //var pCMdty = pData[7];
            pPayables = JSON.parse(pData[10]);
            var pMAWBStock = pData[11];
            //var pNotifyID = pData[7];
            ConsigneeName = pData[29];
            NotifyName = pData[31];
            ShipperName = pData[32];
            if (pAirHeader != null) {
                pAirHeader.ConsigneeAddress = pData[35];
                pAirHeader.ConsigneePhonesAndFaxes = pData[36];
                pAirHeader.ShipperAddress = pData[37];
                pAirHeader.ShipperPhonesAndFaxes = pData[38];
                pAirHeader.NotifyAddress = pData[39];
                pAirHeader.NotifyPhonesAndFaxes = pData[40];
                pAirHeader.AirlinePrefix = pData[41];
                pAirHeader.POLCode = pData[42];
            }
            //FillListFromObject(null, 2, "<--Select-->", "slShippersAir", pCustomers
            //    , function () {
            //        $("#slConsigneesAir").html($("#slShippersAir").html()); $("#slConsigneesAir").val(0);
            //        //$("#slNotify").html($("#slShippersAir").html()); $("#slNotify").val("");
            //    });

            //$("#slShippersAir").html($("#hReadySlCustomers").html());
            //$("#slConsigneesAir").html($("#hReadySlCustomers").html());
            //$("#slConsigneesAir").val(""); 
            InitializeShipmentCustomersSelectSearch();
            //$("#slNotifyAir").html($("#hReadySlCustomers").html());
            //$("#slNotifyAir").val("");
            $("#slAgentsAir").html($("#hReadySlAgents").html());

            //FillListFromObject(null, 2, "<--Select-->", "slAgentsAir", pAgents, null);
            //FillListFromObject(null, 2, "<--Select-->", "slPackageTypes", pPackageTypes, null); //to be used when open PackagesModal
            //$("#slShipmentPackageTypes").html($("#slPackageTypes").html());
            //FillListFromObject($("#hPOD").val(), 4, "<--Select-->", "slDeliveryCity", pFinalDestination, null);
            //FillListFromObject(null, 11, "<--Select-->", "slShipmentContainers", pContainers, null); //to be used when open PackagesModal
            FillListFromObject(null, 2, "<--Select-->", "slVia1", pVia123, null); //to be used when open via1,via2,via3
            FillListFromObject(null, 2, "<--Select-->", "SlAirLine1", pAirLine1, null);// pAirline1
            //FillListFromObject(null, 1, "<--Select-->", "slAirCurrencies", pCurncy, null);//currency
            $("#slAirCurrencies").html($("#hReadySlCurrencies").html());
            //FillListFromObject(null, 2, "<--Select-->", "slCommodityAir", pCMdty, null);//commodity
            $("#slCommodityAir").html($("#slCommodities").html());
            FillListFromObject(null, 17, "<--Select-->", "SlMAWBStockAir", pMAWBStock, null);//MAWBStock 

            //$("#btnPrintBillsofLadingDoc").attr("onclick", "DocsOut_Print(220,0," + $("#hShipmentAirID").val() + " , 0);").show();
            //$("#btnPrintBillsofLadingA4").attr("onclick", "DocsOut_Print(220,0," + $("#hShipmentAirID").val() + " , 1);").show();
            $("#btnPrintBillsofLadingDoc").attr("onclick", "DocsOut_Print(220,0," + $("#hOperationIDAWB").val() + " , 0);").show();
            $("#btnPrintBillsofLadingA4").attr("onclick", "DocsOut_Print(220,0," + $("#hOperationIDAWB").val() + " , 1);").show();
            $("#btnPrintDangerousShippingDeclaration").attr("onclick", "DocsOut_Print(57,0," + pID + ");");
            $("#btnPrintAirLabel").attr("onclick", "DocsOut_Print(5,0," + pID + ");");
            //FadePageCover(false);
        }
        ,
        function () {
            $("#slVia2").html($("#slVia1").html());
            $("#slVia3").html($("#slVia1").html());
            $("#slPODAir").html($("#slVia1").html()); $("#slPODAir").val($("#hPOD").val());
            $("#SlAirLine2").html($("#SlAirLine1").html());
            $("#SlAirLine3").html($("#SlAirLine1").html());
            $("#SlAirLine").html($("#SlAirLine1").html()); $("#SlAirLine").val($("#hAirlineID").val());
            $("#slAgentsAir").val(pDefaults.DefaultAgentID == 0 ? "" : pDefaults.DefaultAgentID);

            $("#txtFlightNoAir").val($("#hVoyageOrTruckNumber").val());
            $("#txtArrivalDateAir").val(ConvertDateFormat(GetDateWithFormatMDY($("#hExpectedArrival").val())));

          
            //$("#slAirCurrencies").html($("#hReadySlCurrencies").html());
            if (pID != 0) {
                BindingShipmentAirModal(pAirHeader, pMainRoute);
                AirPackage_BindTableRows(pShipmentPackages);
                ShipmentPackag_MultiRowEditLoad();
                if ($('#slConsigneesAir').find("option[value='" + pAirHeader.ConsigneeID + "']").length) {
                    $('#slConsigneesAir').val(pAirHeader.ConsigneeID).trigger('change');
                } else {
                    let newOption = new Option(ConsigneeName, pAirHeader.ConsigneeID, true, true);
                    $('#slConsigneesAir').append(newOption).trigger('change');
                }
                if ($('#slNotifyAir').find("option[value='" + pAirHeader.NotifyID + "']").length) {
                    $('#slNotifyAir').val(pAirHeader.NotifyID).trigger('change');
                } else {
                    let newOption = new Option(NotifyName, pAirHeader.NotifyID, true, true);
                    $('#slNotifyAir').append(newOption).trigger('change');
                }
                if ($('#slShippersAir').find("option[value='" + pAirHeader.ShipperID + "']").length) {
                    $('#slShippersAir').val(pAirHeader.ShipperID).trigger('change');
                } else {
                    let newOption = new Option(ShipperName, pAirHeader.ShipperID, true, true);
                    $('#slShippersAir').append(newOption).trigger('change');
                }
            }
            else {
                FadePageCover(false);

            }
            //Payables_BindTableRows(pPayables); //i disabled it coz when updating Extra in Houses Payables disappear
        }

    );

    if ($("#hDirectionType").val() == constImportDirectionType) {
        $("#slConsigneesAir").attr("data-required", true);
        $("#slShippersAir").attr("data-required", false);
        $("#txtArrivalDateAir").attr("data-required", false);
    }
    else { //Export or Domestic
        $("#slShippersAir").attr("data-required", true);
        $("#slConsigneesAir").attr("data-required", false);
        $("#txtArrivalDateAir").attr("data-required", true);
    }
    $("#slNotifyAir").attr("data-required", false);

    $("#btn-NewAddShipperAir").attr("onclick", "Customers_ClearAllControls(1);");
    $("#btn-NewAddConsigneeAir").attr("onclick", "Customers_ClearAllControls(1);");
    $("#btn-NewAddNotify").attr("onclick", "Customers_ClearAllControls(2);");
    $("#btn-NewAddAgentAir").attr("onclick", "Agents_ClearAllControls(2);");
    $("#btn-NewAddVessel").attr("onclick", "Vessels_ClearAllControls(null,2);");

    $("#btn-EditShipperAir").attr("onclick", "Customers_FillControlsFromOperations($('#slShippersAir option:selected').val(), null, 1);");
    $("#btn-EditConsigneeAir").attr("onclick", "Customers_FillControlsFromOperations($('#slConsigneesAir option:selected').val(), null, 1);");
    $("#btn-EditNotifyAir").attr("onclick", "Customers_FillControlsFromOperations($('#slNotifyAir option:selected').val(), null, 1);");
    //$("#btn-EditNotify").attr("onclick", "Customers_FillControlsFromOperations($('#slNotify option:selected').val(), null, 2);");
    $("#btn-EditAgentAir").attr("onclick", "Agents_FillControlsFromOperations($('#slAgentsAir option:selected').val(), null, 2);");

    //$("#btnPrintBillsofLading").attr("onclick", "DocsOut_Print(220,0," + $("#hShipmentAirID").val() + ");").show();

}
function ShipmentsAWB_Insert(pSaveandAddNew, pIsShipment) { //pIsShipment: is true if this fn is called from adding new house op from consolidation
    debugger;
    //var varExpirationDate = ($("#txtOperationExpirationDate").val().trim() == "" ? "" : $("#txtOperationExpirationDate").val().trim());
    //if (!isValidDate($("#txtOperationOpenDate").val().trim(), 1) || !isValidDate(varExpirationDate, 1))

    if (!isValidDate($("#txtOperationOpenDateAir").val().trim(), 1))
        swal(strSorry, strCheckDates);
    //else
    //    if (Date.prototype.compareDates(FormattedTodaysDate, ConvertDateFormat($("#txtOperationOpenDate").val().trim())) < 0)
    //        swal(strSorry, "Check the open date.");
    else if (Date.prototype.compareDates(ConvertDateFormat($("#txtOperationOpenDateAir").val().trim()), ConvertDateFormat($("#txtOperationCloseDateAir").val().trim())) <= 0)
        swal(strSorry, "Close date must be after open date.");
    else if ($('#slPOLAir option:selected').val() == $('#slPODAir option:selected').val() && $('#slPOLAir option:selected').val() != "" && $('#slPOLAir option:selected').val() != undefined && !$("#cbIsDomestic").prop("checked"))//check different ports
        swal(strSorry, strPOLEqualPODWarning);

    else //check Domestic with POLCountry = PODCountry
        //if ($('input[name=cbDirectionType]:checked').val() == 3 && $('#slPOLCountries option:selected').val() != $('#slPODCountries option:selected').val() && $('#slPOLCountries option:selected').val() != undefined)
        //    swal(strSorry, strDomesticWithDifferentCountriesWarning);
        //else //check import or export with different countries
        //if ($('input[name=cbDirectionType]:checked').val() != 3 && $('#slPOLCountries option:selected').val() == $('#slPODCountries option:selected').val() && $('#slPOLCountries option:selected').val() != "" && $('#slPOLCountries option:selected').val() != undefined)
        //    swal(strSorry, strImportOrExportWithSameCountriesWarning);
        //else { //Ports are OK
        FadePageCover(true);
    var pParametersWithValues = {
        //in vwCurrencyDetails the ID is the CurrencyID, & not the CurrencyDetailID
        pWhereClauseCurrencyDetails: ("WHERE ID=" + $("#slAirCurrencies").val() + " AND '" + GetDateWithFormatyyyyMMdd($("#txtOperationOpenDateAir").val()) + "' >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
            + " AND '" + GetDateWithFormatyyyyMMdd($("#txtOperationOpenDateAir").val()) + "' <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
            + " ORDER BY CODE"
        )
    };
    CallGETFunctionWithParameters("/api/Currencies/LoadCurrencyDetails", pParametersWithValues
        , function (pDataCurrencyDetails) {
            if (pDataCurrencyDetails[0] == "[]") {
                swal("Sorry", "Exchange rate is not set for " + $("#slAirCurrencies option:selected").text() + " in the Master Data.");
                FadePageCover(false);
            }
            else {
                var pExchangeRate = JSON.parse(pDataCurrencyDetails[0])[0].ExchangeRate;
                var parameters = {
                    //if HouseNumber is not null then its entered manually

                    "pIsShipment": pIsShipment,
                    "pCodeSerial": 0 /*generated automatically*/,
                    "pCode": "0",
                    //(pIsShipment || $('input[name=cbBLType]:checked').val() == constHouseBLType)
                    // ? "0"
                    // : ("O" + $("#txtOperationOpenDateAir").val().substring(10, 8) + "-" + GetDirectionType($('input[name=cbDirectionType]:checked').val()).substring(0, 3) + "-"
                    //     + GetTransportType($('input[name=cbTransportType]:checked').val()).substring(0, 2) + "-"),
                    "pHouseNumber": ($('#SlMAWBStockAir').val() == "" || $('#SlMAWBStockAir').val() == "0" ? ($("#txtManualMAWB").val().trim() == "" ? 0 : $("#txtManualMAWB").val().trim().toUpperCase()) : $('#SlMAWBStockAir option:selected').text()), // auto generated
                    "pBranchID": $('#slOperationBranchAir option:selected').val(),
                    "pSalesmanID": $('#slOperationSalesmanAir option:selected').val(),

                    "pBLType": pIsShipment ? constHouseBLType : $('#hBLType').val(),
                    "pBLTypeIconName": pIsShipment ? HouseIconName : $("#hBLTypeIconName").val(),
                    "pBLTypeIconStyle": pIsShipment ? strHouseIconStyleClassName : $("#hBLTypeIconStyle").val(),

                    "pDirectionType": $('#hDirectionType').val(),
                    "pDirectionIconName": $("#hDirectionIconName").val(),
                    "pDirectionIconStyle": $("#hDirectionIconStyle").val(),

                    "pTransportType": $('#hTransportType').val(),
                    "pTransportIconName": $("#hTransportIconName").val(),
                    "pTransportIconStyle": $("#hTransportIconStyle").val(),

                    //"pShipmentType": pIsShipment
                    //    ? ($("#cbIsOcean").prop("checked") ? constLCLShipmentType : constLTLShipmentType)/*No air in this case coz air has no consolidation*/
                    //    : ($('input[name=cbTransportType]:checked').val() == AirTransportType ? 0 : $('input[name=cbShipmentType]:checked').val()),
                    "pShipmentType": $("#hShipmentType").val(),
                    "pMasterBL": $("#hMasterBL").val(),
                    "pShipperID": $('#slShippersAir').val() == "" || $('#slShippersAir').val() == null ? 0 : $('#slShippersAir').val(),
                    "pShipperAddressID": 0,
                    "pShipperContactID": 0,
                    //"pConsigneeID": (($('#slConsignees option:selected').val() == "" || $('input[name=cbDirectionType]:checked').val() == 2 || $('input[name=cbDirectionType]:checked').val() == 3)
                    "pConsigneeID": $('#slConsigneesAir').val() == "" || $('#slConsigneesAir').val() == null ? 0 : $('#slConsigneesAir').val(),
                    "pConsigneeAddressID": 0,
                    "pConsigneeContactID": 0,
                    "pNotifyID": $('#slNotifyAir').val() == "" || $('#slNotifyAir').val() == null ? 0 : $('#slNotifyAir').val(),
                    "pAgentID": pDefaults.DefaultAgentID, //$('#slAgentsAir').val() == "" ? 0 : $('#slAgentsAir').val(),
                    "pAgentAddressID": 0,
                    "pAgentContactID": 0,
                    "pIncotermID": 0,
                    "pPOrC": $("#radIsConfirmAir1").prop('checked') ? 3 : 1,
                    "pMoveTypeID": 0,
                    "pCommodityID": $("#cbIsAWB").prop("checked") ? ($("#slCommodityAir").val()) : 0,
                    "pTransientTime": 0,
                    "pOpenDate": $("#txtOperationOpenDateAir").val().trim(),
                    "pCloseDate": $("#txtOperationCloseDateAir").val().trim(),
                    "pCutOffDate": "01/01/1900",
                    "pIncludePickup": false,
                    "pPickupCityID": 0,
                    "pPickupAddressID": 0,
                    "pPOLCountryID": $('#hPOLCountryID').val(),
                    "pPOL": $('#hPOL').val(), // $('#slPOLAir option:selected').val(),
                    "pPODCountryID": $('#hPODCountryID').val(),
                    "pPOD": $('#slPODAir option:selected').val(),
                    "pShippingLineID": 0,
                    "pAirlineID": //(pIsShipment/*means its house*/ || $('#hBLType').val() == constHouseBLType || $('#SlAirLine').val() == "")
                        //? 0
                        //: ($('#hTransportType').val() == AirTransportType ?
                        $('#SlAirLine').val() == "" ? "0" : $('#SlAirLine').val(),// : 0),
                    "pTruckerID": 0,
                    "pIncludeDelivery": false,
                    "pDeliveryZipCode": 0,
                    "pDeliveryCityID": 0,
                    "pDeliveryCountryID": 0,//i am leaving it the same as PODCountryID
                    "pNetWeight": 0,
                    "pGrossWeight": 0,
                    "pVolume": 0,
                    "pPackageTypeID": 0,
                    "pNumberOfPackages": 0,
                    "pIsDangerousGoods": false,
                    "pNotes": "0",
                    "pOperationStageID": 60, //this means Order
                    "pNumberOfHousesConnected": 0,
                    "pMAWBStockID": ($('#SlMAWBStockAir').val() == "" ? 0 : $('#SlMAWBStockAir').val()),
                    "pMasterOperationID": $("#hOperationID").val(),//$("#hBillID").val(),
                    "pMAWBSuffix": ($("#SlMAWBStockAir").val() == "" || $('#SlMAWBStockAir').val() == "0" || $('#SlMAWBStockAir').val() == null ? ($("#txtManualMAWB").val().trim() == "" ? 0 : $("#txtManualMAWB").val().trim().toUpperCase()) : $("#SlMAWBStockAir option:selected").text()),
                    "pVia1": $('#slVia1  option:selected').val(),
                    "pVia2": $('#slVia2  option:selected').val(),
                    "pVia3": $('#slVia3  option:selected').val(),
                    "pAirLineID1": $("#SlAirLine1").val(),
                    "pFlightNo1": $("#txtFlightNo1").val(),
                    "pFlightDate1": ($("#txtFlightDate1").val().trim() == "" ? "01/01/1900" : $("#txtFlightDate1").val().trim().toUpperCase()),
                    "pAirLineID2": $("#SlAirLine2").val(),
                    "pFlightNo2": $("#txtFlightNo2").val(),
                    "pFlightDate2": ($("#txtFlightDate2").val().trim() == "" ? "01/01/1900" : $("#txtFlightDate2").val().trim().toUpperCase()),
                    "pAirLineID3": $("#SlAirLine3").val(),
                    "pFlightNo3": $("#txtFlightNo3").val(),
                    "pFlightDate3": ($("#txtFlightDate3").val().trim() == "" ? "01/01/1900" : $("#txtFlightDate3").val().trim().toUpperCase()),

                    "pUNOrID": $("#txtUNOrID").val() == 0 ? "" : $("#txtUNOrID").val().trim().toUpperCase(),
                    "pProperShippingName": $("#txtProperShippingName").val() == 0 ? "" : $("#txtProperShippingName").val().trim().toUpperCase(),
                    "pClassOrDivision": $("#txtClassOrDivision").val() == 0 ? "" : $("#txtClassOrDivision").val().trim().toUpperCase(),
                    "pPackingGroup": $("#txtPackingGroup").val() == 0 ? "" : $("#txtPackingGroup").val().trim().toUpperCase(),
                    "pQuantityAndTypeOfPacking": $("#txtQuantityAndTypeOfPacking").val() == 0 ? "" : $("#txtQuantityAndTypeOfPacking").val().trim().toUpperCase(),
                    "pPackingInstruction": $("#txtPackingInstruction").val() == 0 ? "" : $("#txtPackingInstruction").val().trim().toUpperCase(),
                    "pShippingDeclarationAuthorization": $("#txtShippingDeclarationAuthorization").val() == 0 ? "" : $("#txtShippingDeclarationAuthorization").val().trim().toUpperCase(),
                    "pBarcode": $("#txtBarcode").val().trim() == "" ? 0 : $("#txtBarcode").val().trim().toUpperCase(),

                    "pHandlingInformation": $("#txtHandlingInformation1").val(),
                    "pDescription": $("#txtDescription1").val(),
                    "pAmountOfInsurance": $("#txtAmountOfInsurance").val(),
                    "pBLDate": ($("#txtArrivalDateAir").val().trim() == "" ? "01/01/1900" : $("#txtArrivalDateAir").val().trim().toUpperCase()),
                    "pDeclaredValueForCarriage": $("#txtDeclaredValueForCarriage").val(),
                    "pWeightCharge": $("#txtWeightCharge").val(),
                    "pValuationCharge": $("#txtValuationCharge").val(),
                    "pTax": $("#txtTax").val(),
                    "pOtherChargesDueAgent": $("#txtOtherChargesDueAgent").val(),
                    "pOtherChargesDueCarrier": $("#txtOtherChargesDueCarrier").val(),
                    "pOtherCharges": $("#txtOtherCharges").val(),
                    "pCurrencyID": $("#slAirCurrencies").val(),
                    "pExchangeRate": pExchangeRate,
                    "pAccountingInformation": $("#txtAccountingInformation1").val(),
                    "pReferenceNumber": $("#txtReferenceNumber").val(),
                    "pOptionalShippingInformation": $("#txtOptionalShippingInformation").val(),
                    "pCHGSCode": $("#txtCHGSCode").val(),
                    "pWT_VALL": $("#txtWT_VALL").val(),
                    "pWT_VALL_Other": $("#txtWT_VALL_Other").val(),
                    "pDeclaredValueForCustoms": $("#txtDeclaredValueForCustoms").val(),
                    "pChargeableWeight": ($("#txtChargeableWeight").val() == "" || $("#txtChargeableWeight").val() == 0 ? ($("#txtWeightCharge").val() == "" ? 0 : $("#txtWeightCharge").val()) : $("#txtChargeableWeight").val()),
                    "pTypeOfStockID": $('#SlTypeOfStockAir option:selected').val(),
                    "pFlightNo": ($("#txtFlightNoAir").val()),
                    "pACIDNumber": pIsShipment ? ($("#txtShipmentACIDNumber").val() == "" ? "0" : $("#txtShipmentACIDNumber").val()) : "0",
                    "pACIDNumberDetails": pIsShipment ? ($("#txtShipmentACIDDetails").val() == "" ? "0" : $("#txtShipmentACIDDetails").val()) : "0",
                    "pBookingNumber": pIsShipment ? ($("#txtShipmentBookingNumber").val() == "" ? "0" : $("#txtShipmentBookingNumber").val()) : "0",
                    "pIsAWB": $("#cbIsAWB").prop("checked"),
                    "pUNNumber": pIsShipment ? ($("#txtShipmentUNNumber").val() == "" || $("#txtShipmentUNNumber").val() == null ? 0 : $("#txtShipmentUNNumber").val())
                        : ($("#txtOperationUNNumber").val() == "" || $("#txtOperationUNNumber").val() == null ? 0 : $("#txtOperationUNNumber").val()),
                    "pIMOClass": pIsShipment ? ($("#txtShipmentIMOClass").val() == "" || $("#txtShipmentIMOClass").val() == null ? 0 : $("#txtShipmentIMOClass").val())
                        : ($("#txtOperationIMOClass").val() == "" || $("#txtOperationIMOClass").val() == null ? 0 : $("#txtOperationIMOClass").val()),
                    "pVesselID": pIsShipment ? ($("#slShipmentVesselID").val() == "" || $("#slShipmentVesselID").val() == null ? 0 : $("#slShipmentVesselID").val())
                        : ($("#slOperationVesselID").val() == "" || $("#slOperationVesselID").val() == null ? 0 : $("#slOperationVesselID").val())
                };
                PostInsertUpdateFunction("form", "/api/Operations/InsertShipmentAWB", parameters, pSaveandAddNew, "ShipmentAirModal"
                    , function (pData) {
                        var _MessageReturned = pData[4];
                        if (_MessageReturned != "") {
                            swal(strSorry, _MessageReturned);
                        } else {
                            var pMaster = JSON.parse(pData[1]);
                            var pHouses = JSON.parse(pData[2]);
                            $('#hShipmentAirID').val(pData[3]);
                            $('#hOperationIDAWB').val(pData[3]);
                            ShipmentsAWB_BindTableRows(pMaster);
                            ShipmentsAWB_Houses_BindTableRows(pHouses);
                            $("#btnPrintDangerousShippingDeclaration").attr("onclick", "DocsOut_Print(57,0," + pData[3] + ");");
                            $("#btnPrintAirLabel").attr("onclick", "DocsOut_Print(5,0," + pData[3] + ");");

                            $("#hMasterBL").val(pMaster.MasterBL == 0 ? "" : pMaster.MasterBL);
                            $("#hMAWBStockID").val(pMaster.MAWBStockID == 0 ? "" : pMaster.MAWBStockID);
                            $("#hMAWBSuffix").val(pMaster.MAWBSuffix == 0 ? "" : pMaster.MAWBSuffix);
                            if ($("#tblRoutings tbody tr td.Line")[0] != undefined)
                                $("#tblRoutings tbody tr td.Line")[0].setAttribute("val", $('#SlAirLine').val());

                            $('#btnSaveBillsofLading').attr('onclick', 'ShipmentsAWB_Update();');
                            swal('Success', 'Saved Successfully,');
                            Shipments_LoadAvailableShipments();
                        }

                        //FadePageCover(false);
                    });
            }
        }
        , null);
}
function ShipmentsAWB_Update(pSaveandAddNew, pIsShipment, callback) { //pIsShipment: is true if this fn is called from adding new house op from consolidation
    debugger;
    //var varExpirationDate = ($("#txtOperationExpirationDate").val().trim() == "" ? "" : $("#txtOperationExpirationDate").val().trim());
    //if (!isValidDate($("#txtOperationOpenDate").val().trim(), 1) || !isValidDate(varExpirationDate, 1))
    if (!isValidDate($("#txtOperationOpenDateAir").val().trim(), 1))
        swal(strSorry, strCheckDates);
    //else
    //    if (Date.prototype.compareDates(FormattedTodaysDate, ConvertDateFormat($("#txtOperationOpenDate").val().trim())) < 0)
    //        swal(strSorry, "Check the open date.");
    else if (pDefaults.UnEditableCompanyName != "UNF" &&  Date.prototype.compareDates(ConvertDateFormat($("#txtOperationOpenDateAir").val().trim()), ConvertDateFormat($("#txtOperationCloseDateAir").val().trim())) <= 0)
        swal(strSorry, "Close date must be after open date.");
    else if ($('#slPOLAir option:selected').val() == $('#slPODAir option:selected').val() && $('#slPOLAir option:selected').val() != "" && $('#slPOLAir option:selected').val() != undefined && !$("#cbIsDomestic").prop("checked"))//check different ports
        swal(strSorry, strPOLEqualPODWarning);

    else if (ValidateForm("form", "ShipmentAirModal")) {
        //check Domestic with POLCountry = PODCountry
        //if ($('input[name=cbDirectionType]:checked').val() == 3 && $('#slPOLCountries option:selected').val() != $('#slPODCountries option:selected').val() && $('#slPOLCountries option:selected').val() != undefined)
        //    swal(strSorry, strDomesticWithDifferentCountriesWarning);
        //else //check import or export with different countries
        //if ($('input[name=cbDirectionType]:checked').val() != 3 && $('#slPOLCountries option:selected').val() == $('#slPODCountries option:selected').val() && $('#slPOLCountries option:selected').val() != "" && $('#slPOLCountries option:selected').val() != undefined)
        //    swal(strSorry, strImportOrExportWithSameCountriesWarning);
        //else { //Ports are OK
        FadePageCover(true);
        var pParametersWithValues = {
            pWhereClauseCurrencyDetails: ("WHERE ID=" + $("#slAirCurrencies").val() + " AND '" + GetDateWithFormatyyyyMMdd($("#txtOperationOpenDateAir").val()) + "' >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                + " AND '" + GetDateWithFormatyyyyMMdd($("#txtOperationOpenDateAir").val()) + "' <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                + " ORDER BY CODE"
            )
        };
        CallGETFunctionWithParameters("/api/Currencies/LoadCurrencyDetails", pParametersWithValues
            , function (pDataCurrencyDetails) {
                if (pDataCurrencyDetails[0] == "[]") {
                    swal("Sorry", "Exchange rate is not set for " + $("#slAirCurrencies option:selected").text() + " in the Master Data.");
                    FadePageCover(false);
                }
                else {
                    var pExchangeRate = JSON.parse(pDataCurrencyDetails[0])[0].ExchangeRate;
                    var pParametersWithValues = {
                        //if HouseNumber is not null then its entered manually

                        "pIsShipment": pIsShipment,
                        "pOperationID": $('#hOperationIDAWB').val(),
                        "pHouseNumber": ($('#SlMAWBStockAir').val() == "" || $('#SlMAWBStockAir').val() == "0" ? ($("#txtManualMAWB").val().trim() == "" ? 0 : $("#txtManualMAWB").val().trim().toUpperCase()) : $('#SlMAWBStockAir option:selected').text()),
                        //"pBranchID": $('#slOperationBranchAir option:selected').val(),
                        //"pSalesmanID": $('#slOperationSalesmanAir option:selected').val(),

                        "pMasterBL": $("#hMasterBL").val(),
                        "pShipperID": $('#slShippersAir').val() == "" || $('#slShippersAir').val() == null ? 0 : $('#slShippersAir').val(),
                        "pConsigneeID": $('#slConsigneesAir').val() == "" || $('#slConsigneesAir').val() == null ? 0 : $('#slConsigneesAir').val(),
                        "pAgentID": pDefaults.DefaultAgentID, //$('#slAgentsAir').val() == "" ? 0 : $('#slAgentsAir').val(),
                        "pNotifyID": $('#slNotifyAir').val() == "" || $('#slNotifyAir').val() == null ? 0 : $('#slNotifyAir').val(),
                        "pPOrC": $("#radIsConfirmAir1").prop('checked') ? 3 : 1,
                        "pMoveTypeID": 0,
                        "pCommodityID": $("#slCommodityAir").val() == "" ? 0 : $("#slCommodityAir").val(),
                        "pPOLCountryID": $('#hPOLCountryID').val(),
                        "pPOL": $('#hPOL').val(), // $('#slPOLAir option:selected').val(),
                        "pPODCountryID": $('#hPODCountryID').val(),
                        "pPOD": $('#slPODAir option:selected').val(),
                        "pAirlineID": //(pIsShipment/*means its house*/ || $('#hBLType').val() == constHouseBLType || $('#SlAirLine').val() == "")
                            //? 0
                            //: ($('#hTransportType').val() == AirTransportType ?
                            $('#SlAirLine').val(),// : 0),
                        "pOperationStageID": 60, //this means Order
                        "pMAWBStockID": ($('#SlMAWBStockAir').val() == "" ? 0 : $('#SlMAWBStockAir').val()),
                        "pMasterOperationID": $("#hOperationID").val(),//$("#hBillID").val(),
                        "pMAWBSuffix": ($("#SlMAWBStockAir").val() == "" || $('#SlMAWBStockAir').val() == "0" || $('#SlMAWBStockAir').val() == null ? ($("#txtManualMAWB").val().trim() == "" ? 0 : $("#txtManualMAWB").val().trim().toUpperCase()) : $("#SlMAWBStockAir option:selected").text()),
                        "pVia1": $('#slVia1').val() == "" ? 0 : $('#slVia1').val(),
                        "pVia2": $('#slVia2').val() == "" ? 0 : $('#slVia2').val(),
                        "pVia3": $('#slVia3').val() == "" ? 0 : $('#slVia3').val(),
                        "pAirLineID1": $("#SlAirLine1").val() == "" ? 0 : $('#SlAirLine1').val(),
                        "pFlightNo1": $("#txtFlightNo1").val() == "" ? 0 : $('#txtFlightNo1').val(),
                        "pFlightDate1": ($("#txtFlightDate1").val().trim() == "" ? "0" : PadDateWithZeroes($("#txtFlightDate1").val().trim()).toUpperCase()),
                        "pAirLineID2": $("#SlAirLine2").val() == "" ? 0 : $('#SlAirLine2').val(),
                        "pFlightNo2": $("#txtFlightNo2").val() == "" ? 0 : $('#txtFlightNo2').val(),
                        "pFlightDate2": ($("#txtFlightDate2").val().trim() == "" ? "0" : PadDateWithZeroes($("#txtFlightDate2").val().trim()).toUpperCase()),
                        "pAirLineID3": $("#SlAirLine3").val() == "" ? 0 : $('#SlAirLine3').val(),
                        "pFlightNo3": $("#txtFlightNo3").val() == "" ? 0 : $('#txtFlightNo3').val(),
                        "pFlightDate3": ($("#txtFlightDate3").val().trim() == "" ? "0" : PadDateWithZeroes($("#txtFlightDate3").val().trim()).toUpperCase()),

                        "pUNOrID": $("#txtUNOrID").val() == 0 ? "" : $("#txtUNOrID").val().trim().toUpperCase(),
                        "pProperShippingName": $("#txtProperShippingName").val() == 0 ? "" : $("#txtProperShippingName").val().trim().toUpperCase(),
                        "pClassOrDivision": $("#txtClassOrDivision").val() == 0 ? "" : $("#txtClassOrDivision").val().trim().toUpperCase(),
                        "pPackingGroup": $("#txtPackingGroup").val() == 0 ? "" : $("#txtPackingGroup").val().trim().toUpperCase(),
                        "pQuantityAndTypeOfPacking": $("#txtQuantityAndTypeOfPacking").val() == 0 ? "" : $("#txtQuantityAndTypeOfPacking").val().trim().toUpperCase(),
                        "pPackingInstruction": $("#txtPackingInstruction").val() == 0 ? "" : $("#txtPackingInstruction").val().trim().toUpperCase(),
                        "pShippingDeclarationAuthorization": $("#txtShippingDeclarationAuthorization").val() == 0 ? "" : $("#txtShippingDeclarationAuthorization").val().trim().toUpperCase(),
                        "pBarcode": $("#txtBarcode").val() == 0 ? "" : $("#txtBarcode").val().trim().toUpperCase(),

                        "pHandlingInformation": $("#txtHandlingInformation1").val().trim() == "" ? 0 : $("#txtHandlingInformation1").val().trim(),
                        "pDescription": $("#txtDescription1").val().trim() == "" ? 0 : $("#txtDescription1").val().trim(),
                        "pAmountOfInsurance": $("#txtAmountOfInsurance").val().trim() == "" ? 0 : $("#txtAmountOfInsurance").val().trim(),
                        "pBLDate": ($("#txtArrivalDateAir").val().trim() == "" ? "0" : PadDateWithZeroes($("#txtArrivalDateAir").val().trim()).toUpperCase()),
                        "pDeclaredValueForCarriage": $("#txtDeclaredValueForCarriage").val().trim() == "" ? 0 : $("#txtDeclaredValueForCarriage").val().trim(),
                        "pWeightCharge": $("#txtWeightCharge").val().trim() == "" ? 0 : $("#txtWeightCharge").val().trim(),
                        "pValuationCharge": $("#txtValuationCharge").val().trim() == "" ? 0 : $("#txtValuationCharge").val().trim(),
                        "pTax": $("#txtTax").val().trim() == "" ? 0 : $("#txtTax").val().trim(),
                        "pOtherChargesDueAgent": $("#txtOtherChargesDueAgent").val().trim() == "" ? 0 : $("#txtOtherChargesDueAgent").val().trim(),
                        "pOtherChargesDueCarrier": $("#txtOtherChargesDueCarrier").val().trim() == "" ? 0 : $("#txtOtherChargesDueCarrier").val().trim(),
                        "pOtherCharges": $("#txtOtherCharges").val().trim() == "" ? 0 : $("#txtOtherCharges").val().trim(),
                        "pCurrencyID": $("#slAirCurrencies").val(),
                        "pExchangeRate": pExchangeRate,
                        "pAccountingInformation": $("#txtAccountingInformation1").val().trim() == "" ? 0 : $("#txtAccountingInformation1").val().trim(),
                        "pReferenceNumber": $("#txtReferenceNumber").val().trim() == "" ? 0 : $("#txtReferenceNumber").val().trim(),
                        "pOptionalShippingInformation": $("#txtOptionalShippingInformation").val().trim() == "" ? 0 : $("#txtOptionalShippingInformation").val().trim(),
                        "pCHGSCode": $("#txtCHGSCode").val().trim() == "" ? 0 : $("#txtCHGSCode").val().trim(),
                        "pWT_VALL": $("#txtWT_VALL").val().trim() == "" ? 0 : $("#txtWT_VALL").val().trim(),
                        "pWT_VALL_Other": $("#txtWT_VALL_Other").val().trim() == "" ? 0 : $("#txtWT_VALL_Other").val().trim(),
                        "pDeclaredValueForCustoms": $("#txtDeclaredValueForCustoms").val().trim() == "" ? 0 : $("#txtDeclaredValueForCustoms").val().trim(),
                        "pChargeableWeight": ($("#txtChargeableWeight").val() == "" || $("#txtChargeableWeight").val() == 0 ? ($("#txtWeightCharge").val() == "" ? 0 : $("#txtWeightCharge").val()) : $("#txtChargeableWeight").val()),
                        "pTypeOfStockID": $('#SlTypeOfStockAir option:selected').val(),
                        "pFlightNo": ($("#txtFlightNoAir").val().trim() == "" ? 0 : $("#txtFlightNoAir").val().trim()),
                        "pUNNumber": $("#txtShipmentUNNumber").val() == "" || $("#txtShipmentUNNumber").val() == null ? 0 : $("#txtShipmentUNNumber").val(),
                        "pIMOClass": $("#txtShipmentIMOClass").val() == "" || $("#txtShipmentIMOClass").val() == null ? 0 : $("#txtShipmentIMOClass").val(),
                        "pVesselID": $("#slShipmentVesselID").val() == "" || $("#slShipmentVesselID").val() == null ? 0 : $("#slShipmentVesselID").val(),
                        "pIsAWB": $("#cbIsAWB").prop("checked"),
                        "pIATACode": $("#txtIATACode").val(),
                        "pIssuingCarrier": $("#txtIssuingCarrier").val(),
                        "pIssuingDate": ($("#txtIssuingDate").val().trim() == "" ? "0" : PadDateWithZeroes($("#txtIssuingDate").val().trim()).toUpperCase())
                    };
                    if (pDefaults.UnEditableCompanyName == "REL") {
                        pParametersWithValues.pAgentID = $('#slAgentsAir').val() == "" ? 0 : $('#slAgentsAir').val();
                    }

                    CallPOSTFunctionWithParameters("/api/Operations/UpdateShipmentAWB"
                        , pParametersWithValues
                        , function (pData) {
                            var _MessageReturned = pData[3];
                            if (_MessageReturned != "") {
                                swal(strSorry, _MessageReturned);
                            } else {
                                var pMaster = JSON.parse(pData[1]);
                                var pHouses = JSON.parse(pData[2]);
                                if (pData[0]) {
                                    swal("Success", "Saved successfully.");
                                    $("#hMasterBL").val(pMaster.MasterBL == 0 ? "" : pMaster.MasterBL);
                                    $("#hMAWBStockID").val(pMaster.MAWBStockID == 0 ? "" : pMaster.MAWBStockID);
                                    $("#hMAWBSuffix").val(pMaster.MAWBSuffix == 0 ? "" : pMaster.MAWBSuffix);
                                    if ($("#tblRoutings tbody tr td.Line")[0] != undefined) {
                                        $("#tblRoutings tbody tr td.Line")[0].setAttribute("val", $('#SlAirLine').val());
                                        $("#tblRoutings tbody tr td.Line")[0].innerText = $('#SlAirLine option:selected').text();
                                    }
                                }
                                else
                                    swal("Sorry", "Connection failed, please try again.");
                                //ShipmentsAWB_BindTableRows(pMaster);
                                //ShipmentsAWB_Houses_BindTableRows(pHouses);

                                Shipments_BindTableRows(pHouses);
                                Shipments_LoadAvailableShipments();
                            }


                            FadePageCover(false);
                        }
                        , null);
                }
            }
            , null);
    } //if (ValidateForm("form", "ShipmentAirModal")) {
}
function ShipmentsAWB_GetCustomerData(pCallingControlID, pControlID) {
    debugger;
    if ($("#" + pCallingControlID).val() == "")
        $("#" + pControlID).html("");
    else {
        var pParametersWithValues = { pWhereClause: ' where id= ' + $("#" + pCallingControlID).val() };
        var pAirHeader = null;
        CallGETFunctionWithParameters("/api/Customers/LoadAll", pParametersWithValues
            , function (pData) {
                pAirHeader = JSON.parse(pData[0]);
                $("#" + pControlID).html((pAirHeader[0].Address == "0" || pAirHeader[0].Address == "" ? "" : 'Address:' + ('' +pAirHeader[0].Address).replace(/\n/g, "<br/>"))
                    + (pAirHeader[0].PhonesAndFaxes == "0" || pAirHeader[0].PhonesAndFaxes == "" ? "" : ('<br>Tel&Fax:' + pAirHeader[0].PhonesAndFaxes)));

            });
    }
}
function BindingShipmentAirModal(pAirHeader,pMainRoute) {
    //Bindding Code
    debugger;
    var lblHouseNumber;
    if ($("#hFillNewAirHouse").val() != 0) {
        lblHouseNumber = '';
    }
    else {
        lblHouseNumber = ($("#hIsBillM").val() == "1" ? pAirHeader.AirlinePrefix : "0 ") + " " + (''+pAirHeader.POLCode).replace(/\n/g, "<br />") + " " + pAirHeader.HouseNumber;
    }
    $("#lblHouseNumber").text(lblHouseNumber);
    if ($("#hFillNewAirHouse").val() != 0) {
        $("#ModelIsNew").val("0");
    } else {
        $("#ModelIsNew").val(pAirHeader.ID);

    }
    $("#slOperationBranchAir").html($("#hReadySlBranches").html()); $("#slOperationBranchAir").val(pAirHeader.BranchID);
    $("#slOperationSalesmanAir").html($("#slOperationEditSalesman").html()); $("#slOperationSalesmanAir").val(pAirHeader.SalesmanID);
    //ShipmentPackage_BindTableRows(JSON.parse(pShipmentPackages));

    $("#lblShownShipment").html(pAirHeader.Code);
    //$("#txtShipmentHouseNumber").val(pAirHeader.HouseNumber == 0 ? "" : pAirHeader.HouseNumber);
    //$("#divGoodsDescription").val(pAirHeader.DescriptionOfGoods == 0 ? "" : pAirHeader.DescriptionOfGoods);
    $("#txtOperationOpenDateAir").val(ConvertDateFormat(GetDateWithFormatMDY(pAirHeader.OpenDate)));
    $("#txtOperationCloseDateAir").val(ConvertDateFormat(GetDateWithFormatMDY(pAirHeader.CloseDate)));
    if (pDefaults.UnEditableCompanyName !="UNF")
    $("#SlAirLine").val(pAirHeader.AirlineID);
    $("#SlTypeOfStockAir").val(pAirHeader.TypeOfStockID == 0 ? "" : pAirHeader.TypeOfStockID);
    //getbillOfLadingNoAir();
    if ($("#hFillNewAirHouse").val() != 0) {
        $("#hFillNewAirHouse").val(0);
        $("#slShippersAir").val("");
        $("#lblShippersAddTel").text("");
        $("#slConsigneesAir").val("");
        $("#lblConsigneesAddTel").text("");
        $("#slNotifyAir").val("");
        $("#lblNotifyAddTel").text("");
    }
    else {
        $("#SlMAWBStockAir").val(pAirHeader.MAWBStockID == 0 ? "" : pAirHeader.MAWBStockID);
        //$("#slShippersAir").val(pAirHeader.ShipperID == 0 ? "" : pAirHeader.ShipperID);
        $("#lblShippersAddTel").html((pAirHeader.ShipperAddress == "0" || pAirHeader.ShipperAddress == "" ? "" : 'Address:' + (''+pAirHeader.ShipperAddress).replace(/\n/g, "<br/>"))
            + (pAirHeader.ShipperPhonesAndFaxes == "0" || pAirHeader.ShipperPhonesAndFaxes == "" ? "" : '<br>Tel&Fax:' + pAirHeader.ShipperPhonesAndFaxes + ' '));
        //$("#slConsigneesAir").val(pAirHeader.ConsigneeID == 0 ? "" : pAirHeader.ConsigneeID);
        
        $("#lblConsigneesAddTel").html((pAirHeader.ConsigneeAddress == "0" || pAirHeader.ConsigneeAddress == "" ? "" : 'Address:' + ('' +pAirHeader.ConsigneeAddress).replace(/\n/g, "<br/>"))
            + (pAirHeader.ConsigneePhonesAndFaxes == "0" || pAirHeader.ConsigneePhonesAndFaxes == "" ? "" : '<br>Tel&Fax:' + pAirHeader.ConsigneePhonesAndFaxes + ' '));
        //$("#slNotifyAir").val(pAirHeader.NotifyID == 0 ? "" : pAirHeader.NotifyID);
        $("#lblNotifyAddTel").html((pAirHeader.NotifyAddress == "0" || pAirHeader.NotifyAddress == "" ? "" : 'Address:' + ('' +pAirHeader.NotifyAddress).replace(/\n/g, "<br/>"))
            + (pAirHeader.NotifyPhonesAndFaxes == "0" || pAirHeader.NotifyPhonesAndFaxes == "" ? "" : '<br>Tel&Fax:' + pAirHeader.NotifyPhonesAndFaxes + ' '));


    }
    $("#slAgentsAir").val(pAirHeader.AgentID);
    $("#slVia1").val(pAirHeader.Via1 == 0 ? "" : pAirHeader.Via1);
    $("#SlAirLine1").val(pAirHeader.AirLineID1 == 0 ? "" : pAirHeader.AirLineID1);
    $("#txtFlightNo1").val(pAirHeader.FlightNo1 == 0 ? "" : pAirHeader.FlightNo1);
    $("#txtFlightDate1").val((Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pAirHeader.FlightDate1)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pAirHeader.FlightDate1))));
    $("#slVia2").val(pAirHeader.Via2 == 0 ? "" : pAirHeader.Via2);
    $("#SlAirLine2").val(pAirHeader.AirLineID2 == 0 ? "" : pAirHeader.AirLineID2);
    $("#txtFlightNo2").val(pAirHeader.FlightNo2 == 0 ? "" : pAirHeader.FlightNo2);
    $("#txtFlightDate2").val((Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pAirHeader.FlightDate2)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pAirHeader.FlightDate2))));
    $("#slVia3").val(pAirHeader.Via3 == 0 ? "" : pAirHeader.Via3);
    $("#SlAirLine3").val(pAirHeader.AirLineID3 == 0 ? "" : pAirHeader.AirLineID3);
    $("#txtFlightNo3").val(pAirHeader.FlightNo3 == 0 ? "" : pAirHeader.FlightNo3);
    $("#txtFlightDate3").val((Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pAirHeader.FlightDate3)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pAirHeader.FlightDate3))));
    $("#slPODAir").val(pAirHeader.POD);

    $("#txtUNOrID").val(pAirHeader.UNOrID);
    $("#txtProperShippingName").val(pAirHeader.ProperShippingName);
    $("#txtClassOrDivision").val(pAirHeader.ClassOrDivision);
    $("#txtPackingGroup").val(pAirHeader.PackingGroup);
    $("#txtQuantityAndTypeOfPacking").val(pAirHeader.QuantityAndTypeOfPacking);
    $("#txtPackingInstruction").val(pAirHeader.PackingInstruction);
    $("#txtShippingDeclarationAuthorization").val(pAirHeader.ShippingDeclarationAuthorization);
    $("#txtBarcode").val(pAirHeader.Barcode == 0 ? "" : pAirHeader.Barcode);
    $("#txtManualMAWB").val(pAirHeader.MAWBSuffix == 0 ? "" : pAirHeader.MAWBSuffix);
    if (pDefaults.UnEditableCompanyName == "EISAS")
        $("#txtIATACode").val(pAirHeader.IATACode == 0 ? "90-4-7122" : pAirHeader.IATACode);
    else
        $("#txtIATACode").val(pAirHeader.IATACode == 0 ? "" : pAirHeader.IATACode);
    $("#txtIssuingCarrier").val(pAirHeader.IssuingCarrier == 0 ? "" : pAirHeader.IssuingCarrier);
    $("#txtIssuingDate").val((Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pAirHeader.IssuingDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pAirHeader.IssuingDate))));

    $("#txtHandlingInformation").val(pAirHeader.HandlingInformation == 0 ? "" : ('' + pAirHeader.HandlingInformation).replace(/\n/g, ''));

    $("#txtHandlingInformation1").val(pAirHeader.HandlingInformation == 0 ? "" : pAirHeader.HandlingInformation);
    $("#txtDescription").val(pAirHeader.Description == 0 ? "" : ('' +pAirHeader.Description).replace(/\n/g, ''));
    $("#txtDescription1").val(pAirHeader.Description == 0 ? "" : pAirHeader.Description);
    $("#txtAmountOfInsurance").val(pAirHeader.AmountOfInsurance == 0 ? "" : pAirHeader.AmountOfInsurance);
    $("#txtArrivalDateAir").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pAirHeader.BLDate)) < 1 ? ConvertDateFormat(GetDateWithFormatMDY(pMainRoute.ExpectedArrival)) : ConvertDateFormat(GetDateWithFormatMDY(pAirHeader.BLDate)));
    $("#txtDeclaredValueForCarriage").val(pAirHeader.DeclaredValueForCarriage == 0 ? "" : pAirHeader.DeclaredValueForCarriage);
    $("#txtWeightCharge").val(pAirHeader.WeightCharge);
    $("#txtValuationCharge").val(pAirHeader.ValuationCharge);
    $("#txtTax").val(pAirHeader.Tax);
    $("#txtOtherChargesDueAgent").val(pAirHeader.OtherChargesDueAgent);
    $("#txtOtherChargesDueCarrier").val(pAirHeader.OtherChargesDueCarrier);
    $("#txtOtherCharges").val(pAirHeader.OtherCharges);
    $("#slAirCurrencies").val(pAirHeader.CurrencyID == 0 ? $("#hDefaultCurrencyID").val() : pAirHeader.CurrencyID);
    $("#txtAccountingInformation").val(pAirHeader.AccountingInformation == 0 ? "" : ('' + pAirHeader.AccountingInformation).replace(/\n/g, ''));
    console.log($("#txtAccountingInformation").val() + "  withoutbreak");
    $("#txtAccountingInformation1").val(pAirHeader.AccountingInformation == 0 ? "" : pAirHeader.AccountingInformation);
    $("#txtReferenceNumber").val(pAirHeader.ReferenceNumber);
    $("#txtOptionalShippingInformation").val(pAirHeader.OptionalShippingInformation);
    $("#txtCHGSCode").val(pAirHeader.CHGSCode);
    $("#txtWT_VALL").val(pAirHeader.WT_VALL);
    $("#txtWT_VALL_Other").val(pAirHeader.WT_VALL_Other);
    $("#txtDeclaredValueForCustoms").val(pAirHeader.DeclaredValueForCustoms == 0 ? "" : pAirHeader.DeclaredValueForCustoms);
    //$("#txtFlightNoAir").val(pAirHeader.FlightNo == 0 ? "" : pAirHeader.FlightNo);
    $("#slCommodityAir").val(pAirHeader.CommodityID);
    pAirHeader.POrC == 3 ? $("#radIsConfirmAir1").prop('checked', true) : $("#radIsConfirmAir2").prop('checked', true);
}
function AirPackage_BindTableRows(pTableRows) {
    debugger;
    $("#tblShipmentPackageMulti tbody").html("");
    var pHTMLHeaderColumns = "";
    //isa i am sure its master coz shipment is opened

    pHTMLHeaderColumns += '     <tr>';
    pHTMLHeaderColumns += '         <th id="HeaderDeleteShipmentPackageID">';
    pHTMLHeaderColumns += '             <input id="cbShipmentAirPackageDeleteHeader" type="checkbox" />';
    pHTMLHeaderColumns += '         </th>';
    pHTMLHeaderColumns += '         <th>Number Of Packages</th>';
    pHTMLHeaderColumns += '         <th>Gross Weight</th>';
    pHTMLHeaderColumns += '         <th>Chargeable Weight</th>';
    pHTMLHeaderColumns += '         <th>Rates</th>';
    pHTMLHeaderColumns += '         <th class="hide">Total</th>';
    pHTMLHeaderColumns += '         <th class="rounded-right hide"></th>';
    pHTMLHeaderColumns += '     </tr>';
    var weightCharge = 0;
    $("#tblShipmentPackageMulti thead").html(pHTMLHeaderColumns);
    var editControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' title='Edit'> <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pTableRows, function (i, item) {
        AppendRowtoTable("tblShipmentPackageMulti",
            ("<tr ID='" + item.ID + "' " + (OEPac && $("#hIsOperationDisabled").val() == false ? ("ondblclick='AirPackage_FillControls(" + item.ID + ");'") : "") + ">"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='NumberOfPackages' val='" + item.Quantity + "'>" + item.Quantity + "</td>"
                + "<td class='GrossWeight'>" + (item.GrossWeight == 0 ? "" : item.GrossWeight) + "</td>"
                + "<td class='WeightCharge'>" + (item.ChargeableWeight == 0 ? "" : item.ChargeableWeight) + "</td>"
                + "<td class='Rates'>" + (item.Rate == 0 ? "" : item.Rate) + "</td>"
                + "<td class='PckgTotal hide'>" + (item.Rate == 0 ? "" : (item.GrossWeight > item.ChargeableWeight ? item.GrossWeight * item.Rate : item.ChargeableWeight * item.Rate)) + "</td>"
                + "<td class='DescriptionOfGoods hide'>" + (item.DescriptionOfGoods == 0 ? "" : item.DescriptionOfGoods) + "</td>"
                + "<td class='hide'><a href='#EditPackageAirBillModal' data-toggle='modal' onclick='AirPackage_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
                + "</tr>"));

        //+ ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked')
        //    ? ("<td class='hide'><a href='#EditContainerModal' data-toggle='modal' onclick='OperationContainersAndPackages_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>")
        //    : ("<td class='hide'><a href='#EditPackageModal' data-toggle='modal' onclick='OperationContainersAndPackages_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>")
        //    )));
        weightCharge = weightCharge + (item.Rate == 0 ? "" : (item.GrossWeight > item.ChargeableWeight ? item.GrossWeight * item.Rate : item.ChargeableWeight * item.Rate))
    });

    $("#txtWeightCharge").val(weightCharge);
    BindAllCheckboxonTable("tblShipmentPackageMulti", "ID", "cbShipmentAirPackageDeleteHeader");
    CheckAllCheckbox("HeaderDeleteShipmentPackageID");
}
function expandCollapseTrnst(isXpnd) {
    if (isXpnd == true) {
        $("#btnExpandTrnst").hide();
        $("#btnCompressTrnst").show();
        $("#DivTrnst").show();
    }
    else {
        $("#btnExpandTrnst").show();
        $("#btnCompressTrnst").hide();
        $("#DivTrnst").hide();
    }
}
function expandCollapseCharges(isXpnd) {
    if (isXpnd == true) {
        $("#btnExpandCharges").hide();
        $("#btnCompressCharges").show();
        $("#DivCharges").show();
    }
    else {
        $("#btnExpandCharges").show();
        $("#btnCompressCharges").hide();
        $("#DivCharges").hide();
    }
}
function expandCollapseDangerousShippingDeclaration(isXpnd) {
    if (isXpnd == true) {
        $("#btnExpandDangerousShippingDeclaration").hide();
        $("#btnCompressDangerousShippingDeclaration").show();
        $("#DivDangerousShippingDeclaration").show();
    }
    else {
        $("#btnExpandDangerousShippingDeclaration").show();
        $("#btnCompressDangerousShippingDeclaration").hide();
        $("#DivDangerousShippingDeclaration").hide();
    }
}
function TypeOfStockAir_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    debugger;
    //GetListTypeOfStockWithNamsAttr(pID, "/api/TypeOfStock/TypeOfStock_LoadAll", "Select Type Of Stock", "SlTypeOfStockAir", " WHERE 1=1 ORDER BY Code ", function () {
    //    //$("#SlTypeOfStock").html($("#SlSTypeOfStock").html());
    //});
    GetListWithCodeAndWhereClause(pID, "/api/TypeOfStock/TypeOfStock_LoadAll", "Select Stock Type", "SlTypeOfStockAir", " WHERE 1=1 ORDER BY Code ", null);
}
function getbillOfLadingNoAir() {
    debugger;
    MAWBStockAir_GetList($("#SlAirLine").val(), 'auto', null);
    $("#SlMAWBStockAir").prop('disabled', true);
}//);
function MAWBStockAir_GetList(pID, SlctItem, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    debugger;
    if ($("#ModelIsNew").val() == 0) {
        GetListMAWBStockWithMAWBSuffixAttr(pID, "/api/MAWBStock/LoadAll", "<--Select-->", "SlMAWBStockAir",
            SlctItem, " WHERE 1=1 and airlineid=" + pID + " and TypeOfStockID= " + $("#SlTypeOfStockAir").val() +
            " and id not in (select MAWBStockID from Operations  where MAWBStockID is not null) " + " ORDER BY id ", function () {
                //$("#SlTypeOfStock").html($("#SlSTypeOfStock").html());
            });
    }
    if ($("#ModelIsNew").val() > 0) {
        GetListMAWBStockWithMAWBSuffixAttr(pID, "/api/MAWBStock/LoadAll", "<--Select-->", "SlMAWBStockAir",
            SlctItem, " WHERE 1=1 and airlineid=" + pID + " and TypeOfStockID= " + $("#SlTypeOfStockAir").val() +
            " and (id not in (select MAWBStockID from Operations  where MAWBStockID is not null) or id in (select MAWBStockID from Operations  where id=" + $("#ModelIsNew").val() + ")) " + " ORDER BY id ", function () {
                //$("#SlTypeOfStock").html($("#SlSTypeOfStock").html());
            });
    }

    //GetListTypeOfStockWithNamsAttr(pID, "/api/TypeOfStock/TypeOfStock_LoadAll", "Select Type Of Stock", "SlTypeOfStock", " WHERE 1=1 ORDER BY Code ");
}
function EditbillOfLadingNoAir() {
    debugger;
    MAWBStockAir_GetList($("#SlAirLine").val(), 'Edit', null);
    $("#SlMAWBStockAir").prop('disabled', false);
}
function SlTypeOfStockAir_Changed() {
    debugger;
    $("#SlMAWBStockAir").val("");
}
/*********************************AWB Packages*****************************************/
function ShipmentPackag_MultiRowEditLoad() {
    debugger;
    var pStrFnName = "/api/OperationContainersAndPackages/LoadWithWhereClause";
    var pDivName = "divSelectContainersAndPackagesair";//div name to be filled
    var ptblModalName = "tblShipmentPackageMulti";
    var pCheckboxNameAttr = "cbSelectPackages";
    var pWhereClause = "";
    //pWhereClause += "                WHERE HouseOperationID = " + $("#hShipmentAirID").val();//+ " AND IsDeleted=0 AND AccNoteID IS NULL ";
    pWhereClause += "                WHERE OperationID = " + $("#hOperationIDAWB").val() + " OR HouseOperationID = " + $("#hOperationIDAWB").val();//+ " AND IsDeleted=0 AND AccNoteID IS NULL ";
    //pWhereClause += " AND ( ChargeTypeCode LIKE N'%" + $("#txtSearchContainersAndPackages").val().trim().toUpperCase() + "%' OR ChargeTypeName LIKE N'%" + $("#txtSearchContainersAndPackages").val().trim().toUpperCase() + "%') ";
    //pWhereClause += "                ORDER BY ChargeTypeName ";
    //$("#txtSearchContainersAndPackages").addClass("hide");
    //$("#btn-SearchContainersAndPackages").addClass("hide");
    var pControllerParameters = {
        pPageNumber: 1
        , pPageSize: 99999
        , pWhereClause: pWhereClause
        , pOrderBy: "ID"
    };
    FillAirPackagesModalTableControls(pStrFnName, pControllerParameters, pDivName, ptblModalName, pCheckboxNameAttr, false //pIsInsert
        , function () { FadePageCover(false); HighlightText("#divSelectContainersAndPackagesair", $("#txtSearchContainersAndPackages").val().trim().toUpperCase()); });

    $("#SearchContainersAndPackages").attr("onclick", "ShipmentPackag_MultiRowEdit();");
    //$("#btn-MultiRowSaveShipmentPackag").attr("onclick", "ShipmentPackag_AddList(true); ShipmentPackag_UpdateList(false);");
    $("#btn-MultiRowSaveShipmentPackag").attr("onclick", "ShipmentPackag_AddList(true);");

}
function ShipmentPackag_MultiRowAddLoad() {
    debugger;
    var pStrFnName = "/api/OperationContainersAndPackages/AirPackage_LoadAll";
    var pDivName = "divSelectContainersAndPackagesair";//div name to be filled
    var ptblModalName = "tblShipmentPackageMulti";
    var pCheckboxNameAttr = "cbSelectPackages";
    var pWhereClause = "";
    //pWhereClause += "                WHERE HouseOperationID = " + $("#hShipmentAirID").val();//+ " AND IsDeleted=0 AND AccNoteID IS NULL ";
    pWhereClause += "                WHERE OperationID = " + $("#hOperationIDAWB").val();//+ " AND IsDeleted=0 AND AccNoteID IS NULL ";
    //pWhereClause += " AND ( ChargeTypeCode LIKE N'%" + $("#txtSearchContainersAndPackages").val().trim().toUpperCase() + "%' OR ChargeTypeName LIKE N'%" + $("#txtSearchContainersAndPackages").val().trim().toUpperCase() + "%') ";
    //pWhereClause += "                ORDER BY ChargeTypeName ";
    //$("#txtSearchContainersAndPackages").addClass("hide");
    //$("#btn-SearchContainersAndPackages").addClass("hide");
    AddAirPackagesModalTableControls(pStrFnName, pWhereClause, pDivName, ptblModalName, pCheckboxNameAttr, false //pIsInsert
        , function () { HighlightText("#divSelectContainersAndPackagesair", $("#txtSearchContainersAndPackages").val().trim().toUpperCase()); });

    $("#SearchContainersAndPackages").attr("onclick", "ShipmentPackag_MultiRowEdit();");
    //$("#btn-MultiRowSaveShipmentPackag").attr("onclick", "ShipmentPackag_AddList(true); ShipmentPackag_UpdateList(false);");
    $("#btn-MultiRowSaveShipmentPackag").attr("onclick", "ShipmentPackag_AddList(true);");
}
function ShipmentPackag_UpdateList(pSaveandAddNew) {
    debugger;
    var pSelectedPackagesIDsToUpdate = GetAllSelectedIDsAsStringWithNameAttr("cbSelectPackages");//returns string array of IDs
    var pMasterOperationIDList = "";
    var pHouseOperationIDList = "";
    var pChargeableWeightList = "";
    var pGrossWeightList = "";
    var pQuantityList = "";
    var pRateCList = "";
    var pIsAsAgreedList = "";
    //var pDescriptionOfGoods = "";
    var pMarksAndNumbers = "";
    var pWeightUnit = "";
    var pRateClass = "";


    if (pSelectedPackagesIDsToUpdate != "") {
        var NumberOfSelectRows = pSelectedPackagesIDsToUpdate.split(',').length;
        for (i = 0; i < NumberOfSelectRows; i++) {
            var currentRowID = pSelectedPackagesIDsToUpdate.split(",")[i];

            pMasterOperationIDList += ((pMasterOperationIDList == "") ? "" : ",") + $("#hOperationIDAWB").val(); //$("#hOperationID").val();
            pHouseOperationIDList += ((pHouseOperationIDList == "") ? "" : ",") + "0"; //$("#hShipmentAirID").val();
            pChargeableWeightList += ((pChargeableWeightList == "") ? "" : ",") + ($("#txtTblModalWeightChargeBll" + currentRowID).val() == "" ? 0 : $("#txtTblModalWeightChargeBll" + currentRowID).val());
            pGrossWeightList += ((pGrossWeightList == "") ? "" : ",") + ($("#txtTblModalGrossWeightBll" + currentRowID).val() == "" ? 0 : $("#txtTblModalGrossWeightBll" + currentRowID).val());
            pQuantityList += ((pQuantityList == "") ? "" : ",") + ($("#txtTblModalNoOfPkg" + currentRowID).val() == "" ? 0 : $("#txtTblModalNoOfPkg" + currentRowID).val());
            pRateCList += ((pRateCList == "") ? "" : ",") + ($("#txtTblModalRateCharge" + currentRowID).val() == "" ? 0 : $("#txtTblModalRateCharge" + currentRowID).val());
            pIsAsAgreedList += ((pIsAsAgreedList == "") ? "" : ",") + ($("#txtTblModalRateCharge" + currentRowID).val() == "" || $("#txtTblModalRateCharge" + currentRowID).val() == 0 ? true : false);
            pMarksAndNumbers += ((pMarksAndNumbers == "") ? "" : ",") + ($("#txtTblModalMarksAndNumbers" + currentRowID).val().trim() == "" ? 0 : $("#txtTblModalMarksAndNumbers" + currentRowID).val());
            pWeightUnit += ((pWeightUnit == "") ? "" : ",") + ($("#txtTblModalWeightUnit" + currentRowID).val().trim() == "" ? 0 : $("#txtTblModalUnit" + currentRowID).val());
            pRateClass += ((pRateClass == "") ? "" : ",") + ($("#txtTblModalRateClass" + currentRowID).val().trim() == "" ? 0 : $("#txtTblModalRateClass" + currentRowID).val());
        }
    }
    if (pSelectedPackagesIDsToUpdate != "")
        InsertSelectedCheckboxItems("/api/OperationContainersAndPackages/UpdateList"
            , {
                "pSelectedPackagesIDsToUpdate": pSelectedPackagesIDsToUpdate
                , "pMasterOperationIDList": pMasterOperationIDList
                , "pHouseOperationIDList": pHouseOperationIDList
                , "pChargeableWeightList": pChargeableWeightList
                , "pGrossWeightList": pGrossWeightList
                , "pQuantityList": pQuantityList
                , "pRateCList": pRateCList
                , "pIsAsAgreedList": pIsAsAgreedList
                , "pMarksAndNumbers": pMarksAndNumbers
                , "pWeightUnit": pWeightUnit
                , "pRateClass": pRateClass
            }
            , pSaveandAddNew
            , "SelectContainersAndPackagesModal" //pModalID
            , null
            , function (data) {
                debugger;
                //AirPackages_LoadWithPagingWithWhereClause($("#hShipmentAirID").val());
                AirPackages_LoadWithPagingWithWhereClause($("#hOperationIDAWB").val());
                if (data[1] != "")
                    swal(strSorry, data[1]);
            });
}
function ShipmentPackag_AddList(pSaveandAddNew) {
    debugger;
    FadePageCover(true);
    var pUnSelectedPackagesIDsToAdd = GetAllUnSelectedIDsAsStringWithNameAttr("cbSelectPackages");//returns string array of IDs
    //var pUnSelectedPackagesIDsToAdd = GetAllNOTSelectedIDsAsStringWithNameAttr("cbSelectPackages");
    var pMasterOperationIDList = "";
    var pHouseOperationIDList = "";
    var pPackageTypeIDList = "";
    var pChargeableWeightList = "";
    var pGrossWeightList = "";
    var pQuantityList = "";
    var pRateCList = "";
    var pIsAsAgreedList = "";
    var pisMinmumList = "";

    //var pDescriptionOfGoods = "";
    var pMarksAndNumbers = "";
    var pWeightUnit = "";
    var pRateClass = "";
    if (pUnSelectedPackagesIDsToAdd != "") {
        var NumberOfSelectRows = pUnSelectedPackagesIDsToAdd.split(',').length;
        for (i = 0; i < NumberOfSelectRows; i++) {
            var currentRowID = pUnSelectedPackagesIDsToAdd.split(",")[i];
            pMasterOperationIDList += ((pMasterOperationIDList == "") ? "" : ",") + $("#hOperationIDAWB").val(); //$("#hOperationID").val();
            pHouseOperationIDList += ((pHouseOperationIDList == "") ? "" : ",") + "0"; //($("#hShipmentAirID").val() == "" ? 0 : $("#hShipmentAirID").val());
            pPackageTypeIDList += ((pPackageTypeIDList == "") ? "" : ",") + ($("#slTblModalPackageType" + currentRowID).val() == "" ? 0 : $("#slTblModalPackageType" + currentRowID).val());
            pChargeableWeightList += ((pChargeableWeightList == "") ? "" : ",") + ($("#txtTblModalWeightChargeBll" + currentRowID).val() == "" ? 0 : $("#txtTblModalWeightChargeBll" + currentRowID).val());
            pGrossWeightList += ((pGrossWeightList == "") ? "" : ",") + ($("#txtTblModalGrossWeightBll" + currentRowID).val() == "" ? 0 : $("#txtTblModalGrossWeightBll" + currentRowID).val());
            pQuantityList += ((pQuantityList == "") ? "" : ",") + ($("#txtTblModalNoOfPkg" + currentRowID).val() == "" ? 0 : $("#txtTblModalNoOfPkg" + currentRowID).val());
            pRateCList += ((pRateCList == "") ? "" : ",") + ($("#txtTblModalRateCharge" + currentRowID).val() == "" ? 0 : $("#txtTblModalRateCharge" + currentRowID).val());
            pIsAsAgreedList += ((pIsAsAgreedList == "") ? "" : ",") + ($("#txtTblModalRateCharge" + currentRowID).val() == "" || $("#txtTblModalRateCharge" + currentRowID).val() == 0 ? true : false);
            pisMinmumList += ((pisMinmumList == "") ? "" : ",") + ($("#ChkTblModalIsMinimum" + currentRowID).prop('checked') == true ? true : false);
            pMarksAndNumbers += ((pMarksAndNumbers == "") ? "" : ",") + ($("#txtTblModalMarksAndNumbers" + currentRowID).val().trim() == "" ? 0 : $("#txtTblModalMarksAndNumbers" + currentRowID).val());
            pWeightUnit += ((pWeightUnit == "") ? "" : ",") + ($("#txtTblModalWeightUnit" + currentRowID).val().trim() == "" ? 0 : $("#txtTblModalWeightUnit" + currentRowID).val());
            pRateClass += ((pRateClass == "") ? "" : ",") + ($("#txtTblModalRateClass" + currentRowID).val().trim() == "" ? 0 : $("#txtTblModalRateClass" + currentRowID).val());
        }
    }
    if (pUnSelectedPackagesIDsToAdd != "")
        InsertSelectedCheckboxItems("/api/OperationContainersAndPackages/InsertAirList"
            , {
                "pUnSelectedPackagesIDsToAdd": pUnSelectedPackagesIDsToAdd
                , "pMasterOperationIDList": pMasterOperationIDList
                , "pHouseOperationIDList": pHouseOperationIDList
                , "pPackageTypeIDList": pPackageTypeIDList
                , "pChargeableWeightList": pChargeableWeightList
                , "pGrossWeightList": pGrossWeightList
                , "pQuantityList": pQuantityList
                , "pRateCList": pRateCList
                , "pIsAsAgreedList": pIsAsAgreedList
                , "pisMinmumList": pisMinmumList
                , "pMarksAndNumbers": pMarksAndNumbers
                , "pWeightUnit": pWeightUnit
                , "pRateClass": pRateClass
            }
            , pSaveandAddNew
            , "SelectContainersAndPackagesModal" //pModalID
            , null
            , function (data) {
                ShipmentPackag_MultiRowEditLoad();
                //AirPackages_LoadWithPagingWithWhereClause($("#hShipmentAirID").val());
                //if (data[1] != "")
                //    swal(strSorry, data[1]);
            });
}
//kk
function PrintOptionPages() {
    debugger;
    if (pDefaults.UnEditableCompanyName == "DGL") {
        jQuery("#PagesOptionsModal").modal("show");
    }
}

function CopyPackagesFromMasterToHouse_Ocean() {
    debugger;
    var pParametersWithValues = { pMasterOperationID: $("#hOperationID").val(), pHouseID: $('#hShipmentID').val() };
    CallGETFunctionWithParameters("/api/Operations/CopyPackagesFromMasterToHouse_Ocean", pParametersWithValues
        , function (pData) {
            jQuery("#CargoPropertiesModal").modal("hide");
               // CargoProperties_FillControls(20);
        }
    );
}

function NafezaIntegrationModal_FillControls() {
    debugger;
    if (!CheckValueIsValidInput("#hShipmentID")) {
        swal("Sorry", "Please Save House First");
        return;
    }
    jQuery("#NafezaIntegrationModal").modal("show");
    CallGETFunctionWithParameters("/api/Operations/FillNafezaControls", { pShipmentID: $("#hShipmentID").val() }
        , function (pData) {
            debugger;
            if (JSON.parse(pData[0]).length > 0) {
                let nafeza = JSON.parse(pData[0])[0];

                $("#txtNafezaACIDNumber").val(nafeza.ACID);
                $("#txtNafezaConsigneeVATNumber").val(nafeza.ConsigneeVATNumber);
                $("#txtNafezaShipperVATNumber").val(nafeza.ShipperVATNumber);
                $("#slNafezaRegistrationType").val(nafeza.NafezaRegistrationType);
                $("#slNafezaPickupCountry").val(nafeza.NafezaPickupCountryid);
            } else {
                $("#txtNafezaACIDNumber").val("");
                $("#txtNafezaConsigneeVATNumber").val("");
                $("#txtNafezaShipperVATNumber").val("");
                $("#slNafezaRegistrationType").val("");
                $("#slNafezaPickupCountry").val("");
            }



        }  , null );}

function NafezaValidateACID() {
    debugger;
    let ValidateACIDDTO = {
        pShipmentID: $("#hShipmentID").val(),
        pACIDNumber: $("#txtNafezaACIDNumber").val(),
        pConsigneeVATNumber: $("#txtNafezaConsigneeVATNumber").val(),
        pShipperVATNumber: $("#txtNafezaShipperVATNumber").val(),
        pRegistrationType: $("#slNafezaRegistrationType").val(),
        pPickupCountry: $("#slNafezaPickupCountry").val(),
        pPickupCountryName: $("#slNafezaPickupCountry option:selected").text()
    }
    PostInsertUpdateFunction("form", "/api/Operations/NafezaValidateACID", ValidateACIDDTO, false, "NafezaIntegrationModal",
        function (pData) {
            if (!pData[0]) {
                swal("Sorry", pData[1]);
            } else {
                swal("ACID Status", pData[1]);
            }
    });
}

function NafezaUseConsignee2Changed() {
    CallGETFunctionWithParameters("/api/Operations/NafezaChangeConsignee", { pShipmentID: $("#hShipmentID").val() },
        function (pData) {
            debugger;
            let ConsigneeVATNumber = JSON.parse(pData[0])[0].ConsigneeVATNumber;
            let Consignee2VATNumber = JSON.parse(pData[0])[0].Consignee2VATNumber;
            if ($("#cbUseConsignee2").prop("checked"))
                $("#txtNafezaConsigneeVATNumber").val(Consignee2VATNumber);
            else
                $("#txtNafezaConsigneeVATNumber").val(ConsigneeVATNumber);
    })
}

function ChangeLinkedCRMQuotation() {
    debugger;
    if (isManuallyClearingQuotation) {
        return; // skip execution when flag is set
    }

    let SelectedQuotationRouteID = $("#slQuotationRoutes").val() == "" || $("#slQuotationRoutes").val() == null ? 0 : $("#slQuotationRoutes").val();
    if (SelectedQuotationRouteID == 0)
        $("#btn-GetHouseCRMUpdates").attr("disabled", true);
    else
        $("#btn-GetHouseCRMUpdates").attr("disabled", false);

    if ($("#slShipmentIncoterm").val() == "") {
        swal(strSorry, "House Must Have Incoterm");

        // Prevent re-entering the function
        isManuallyClearingQuotation = true;
        $('#slQuotationRoutes').val(null).trigger('change');
        isManuallyClearingQuotation = false;

        return;
    } else {
        swal({
            title: "Are you sure?",
            text: SelectedQuotationRouteID == 0
                ? "House will be unlinked!"
                : "This house will be linked to the selected quotation and crm will be updated!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#28BB46",
            confirmButtonText: "Yes, do it!",
            closeOnConfirm: false
        }, function () {
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/DynamicsCRM/LinkLCLQuotations", {
                pHouseID: $("#hShipmentID").val(),
                pMasterOperationID: $("#hOperationID").val(),
                pQuotationRouteID: SelectedQuotationRouteID
            }, function (pData) {
                debugger;
                let ReturnedMessage = pData;
                if (ReturnedMessage == "") {
                    swal("Done", "Successfully integrated");
                } else {
                    swal("Sorry", ReturnedMessage);
                }
                FadePageCover(false);
            });
        });
    }
}


function GetHouseCRMUpdates() {
    debugger;
    let SelectedQuotationRouteID = $("#slQuotationRoutes").val() == "" ? 0 : $("#slQuotationRoutes").val();
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/DynamicsCRM/LinkLCLQuotations", {
        pHouseID: $("#hShipmentID").val(),
        pMasterOperationID: $("#hOperationID").val(),
        pQuotationRouteID: SelectedQuotationRouteID
    }, function (pData) {
        debugger;
        let ReturnedMessage = pData;
        if (ReturnedMessage == "") {
            swal("Done", "Updated successfully!");
        } else {
            swal("Sorry", ReturnedMessage);
        }
        FadePageCover(false);
    });
}
function InitializeShipmentCustomersSelectSearch() {
    Select2OnlineSearch("slConsignees", "/api/Customers/LoadAllCustomersForSlReadyCustomers", function (params) {
        debugger;
        var query = {
            pWhereClauseWithMinimalColumns: " WHERE IsInactive=0 AND IsConsignee=1 AND Name like N'%" + params.term.trim() + "%'",
            pOrderBy: "Name",
            pDummy: false
        }

        return query;
    }, function (data) {

        var d = JSON.parse(data[0]);
        let options = $.map(d, function (item) {
            return {
                text: item.Name,
                id: item.ID,
                value: item.ID
            };
        });
        //options.push({ text: "Empty Select", id: "", value: "" });
        return {
            results: options
        };
    }, 3, 2000, true, {
        id: 0,
        text: "<--Select-->"
    });
    Select2OnlineSearch("slConsignees2", "/api/Customers/LoadAllCustomersForSlReadyCustomers", function (params) {
        debugger;
        var query = {
            pWhereClauseWithMinimalColumns: " WHERE IsInactive=0 AND IsConsignee=1 AND Name like N'%" + params.term.trim() + "%'",
            pOrderBy: "Name",
            pDummy: false
        }

        return query;
    }, function (data) {

        var d = JSON.parse(data[0]);
        let options = $.map(d, function (item) {
            return {
                text: item.Name,
                id: item.ID,
                value: item.ID
            };
        });
        options.push({ text: "Select", id: "", value: "" });
        return {
            results: options
        };
    }, 3, 2000, true, {
        id: 0,
        text: "<--Select-->"
    });
    Select2OnlineSearch("slShippers", "/api/Customers/LoadAllCustomersForSlReadyCustomers", function (params) {
        debugger;
        var query = {
            pWhereClauseWithMinimalColumns: " WHERE IsInactive=0 AND IsShipper=1 AND Name like N'%" + params.term.trim() + "%'",
            pOrderBy: "Name",
            pDummy: false
        }

        return query;
    }, function (data) {

        var d = JSON.parse(data[0]);
        let options = $.map(d, function (item) {
            return {
                text: item.Name,
                id: item.ID,
                value: item.ID
            };
        });
        options.push({ text: "Select", id: "", value: "" });
        return {
            results: options
        };
    }, 3, 2000, true, {
        id: 0,
        text: "<--Select-->"
    });
    Select2OnlineSearch("slNotify", "/api/Customers/LoadAllCustomersForSlReadyCustomers", function (params) {
        debugger;
        var query = {
            pWhereClauseWithMinimalColumns: " WHERE IsInactive=0 AND IsConsignee=1 AND Name like N'%" + params.term.trim() + "%'",
            pOrderBy: "Name",
            pDummy: false
        }

        return query;
    }, function (data) {

        var d = JSON.parse(data[0]);
        let options = $.map(d, function (item) {
            return {
                text: item.Name,
                id: item.ID,
                value: item.ID
            };
        });
        options.push({ text: "Select", id: "", value: "" });
        return {
            results: options
        };
    }, 3, 2000, true, {
        id: 0,
        text: "<--Select-->"
    });
    Select2OnlineSearch("slForwarderBLDocuments", "/api/Customers/LoadAllCustomersForSlReadyCustomers", function (params) {
        debugger;
        var query = {
            pWhereClauseWithMinimalColumns: " WHERE IsInactive=0 AND IsConsignee=1 AND Name like N'%" + params.term.trim() + "%'",
            pOrderBy: "Name",
            pDummy: false
        }

        return query;
    }, function (data) {

        var d = JSON.parse(data[0]);
        let options = $.map(d, function (item) {
            return {
                text: item.Name,
                id: item.ID,
                value: item.ID
            };
        });
        options.push({ text: "Select", id: "", value: "" });
        return {
            results: options
        };
    }, 3, 2000, true, {
        id: 0,
        text: "<--Select-->"
    });

    /**************************************Air*********************************************/
    Select2OnlineSearch("slConsigneesAir", "/api/Customers/LoadAllCustomersForSlReadyCustomers", function (params) {
        debugger;
        var query = {
            pWhereClauseWithMinimalColumns: " WHERE IsInactive=0 AND IsConsignee=1 AND Name like N'%" + params.term.trim() + "%'",
            pOrderBy: "Name",
            pDummy: false
        }

        return query;
    }, function (data) {

        var d = JSON.parse(data[0]);
        let options = $.map(d, function (item) {
            return {
                text: item.Name,
                id: item.ID,
                value: item.ID
            };
        });
        //options.push({ text: "Select", id: "", value: "" });
        return {
            results: options
        };
    }, 3, 2000, true, {
        id: 0,
        text: "Select"
    });
    Select2OnlineSearch("slNotifyAir", "/api/Customers/LoadAllCustomersForSlReadyCustomers", function (params) {
        debugger;
        var query = {
            pWhereClauseWithMinimalColumns: " WHERE IsInactive=0 AND IsConsignee=1 AND Name like N'%" + params.term.trim() + "%'",
            pOrderBy: "Name",
            pDummy: false
        }

        return query;
    }, function (data) {

        var d = JSON.parse(data[0]);
        let options = $.map(d, function (item) {
            return {
                text: item.Name,
                id: item.ID,
                value: item.ID
            };
        });
        //options.push({ text: "Select", id: "", value: "" });
        return {
            results: options
        };
    }, 3, 2000, true, {
        id: 0,
        text: "Select"
    });
    Select2OnlineSearch("slShippersAir", "/api/Customers/LoadAllCustomersForSlReadyCustomers", function (params) {
        debugger;
        var query = {
            pWhereClauseWithMinimalColumns: " WHERE IsInactive=0 AND IsShipper=1 AND Name like N'%" + params.term.trim() + "%'",
            pOrderBy: "Name",
            pDummy: false
        }

        return query;
    }, function (data) {

        var d = JSON.parse(data[0]);
        let options = $.map(d, function (item) {
            return {
                text: item.Name,
                id: item.ID,
                value: item.ID
            };
        });
        //options.push({ text: "Select", id: "", value: "" });
        return {
            results: options
        };
    }, 3, 2000, true, {
        id: 0,
        text: "Select"
    });
}

function OnCustomerChanged(elementID, textareaID) {
    debugger;
    if (CheckValueIsValidInput("#" + elementID)) {
        let cID = $("#" + elementID).val();

        CallGETFunctionWithParameters('/api/Addresses/LoadAll', { pWhereClause: `WHERE PartnerID=${cID} AND PartnerTypeID=1 AND AddressTypeID=1` }, function (pData) {
            debugger;
            let address = JSON.parse(pData[0]);
            if (address.length > 0) {
                $("#" + textareaID).val(address[0].StreetLine1 == 0 ? "" : address[0].StreetLine1);
            } else {
                $("#" + textareaID).val('');
            }
        });

    } else {
        $("#" + textareaID).val('');
    }
}