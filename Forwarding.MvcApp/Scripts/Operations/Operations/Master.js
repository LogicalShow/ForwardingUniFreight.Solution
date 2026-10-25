function Master_BindTableRows(pOperations) {
    ClearAllTableRows("tblMaster");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pOperations, function (i, item) {
        AppendRowtoTable("tblMaster",
        //("<tr ID='" + item.ID + "' " + (OEMas ? ("ondblclick='SwitchToOperationsEditView(" + item.ID + ");'") : "") + ">"
        ("<tr ID='" + item.ID + "' ondblclick='SwitchToOperationsEditView(" + item.ID + ");'>"
                    //+ "<td class='ConnectionID'> <input name='ConnectOrDisconnect' type='checkbox' onchange='Shipments_ConnectOrDisconnect(" + item.ID + ", null);' val='" + (item.MasterOperationID == $("#hOperationID").val() ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='QuotationID hide' val='" + item.QuotationID + "'>" + item.QuotationID + "</td>"
                    + "<td class='OpenedBy hide' val='" + item.CreatorUserID + "'>" + item.OpenedBy + "</td>"
                    //BLType : 1-Direct 2-House 3-Master
                    + "<td class='BLType hide'>" + GetBLType(item.BLType) + "</td>"
                    + "<td class='shownBLTypeIconName hide'><i class= 'fa " + item.BLTypeIconName + " " + item.BLTypeIconStyle + " fa-2x'/></td>"
                    + "<td class='BLTypeIconName hide'>" + item.BLTypeIconName + "</td>"//this line is to get the value of the IconName to fill it in the modal 
                    + "<td class='BLTypeIconStyle hide'>" + item.BLTypeIconStyle + "</td>"//this line is to get the value of the IconStyle to fill it in the modal 
                    //DirectionType : 1-Import 2-Export 3-Domestic
                    + "<td class='DirectionType hide'>" + GetDirectionType(item.DirectionType) + "</td>"
                    + "<td class='shownDirectionIconName'><i class= 'fa " + item.DirectionIconName + " " + item.DirectionIconStyle + " fa-2x'/></td>"
                    + "<td class='DirectionIconName hide'>" + item.DirectionIconName + "</td>"//this line is to get the value of the IconName to fill it in the modal 
                    + "<td class='DirectionIconStyle hide'>" + item.DirectionIconStyle + "</td>"//this line is to get the value of the IconStyle to fill it in the modal 
                    //TransportType : 1-Ocean 2-Air 3-Inland
                    + "<td class='TransportType hide'>" + GetTransportType(item.TransportType) + "</td>"
                    + "<td class='shownTransportIconName' ><i class= 'fa " + item.TransportIconName + " " + item.TransportIconStyle + " fa-2x'/></td>"
                    + "<td class='TransportIconName hide'>" + item.TransportIconName + "</td>"//this line is to get the value of the IconName to fill it in the modal 
                    + "<td class='TransportIconStyle hide'>" + item.TransportIconStyle + "</td>"//this line is to get the value of the IconStyle to fill it in the modal 
                    //the next line differs from the preceeding one that date could be shown as today, tomorrow, yesterday
                    + "<td class='shownOpenDate'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
                                              + " <i class='fa fa-calendar'></i>"
                                              //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + "</small>"
                                              + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.OpenDate)) + "</small>"
                                              + "</span>"
                                              + "</td>"
                    + "<td class='OpenDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.OpenDate)) + "</td>"

                    + "<td class='Code'>" + item.Code + "</td>"
                    + "<td class='CodeSerial hide'>" + item.CodeSerial + "</td>"

                    + "<td class='Client hide'>" + (item.DirectionType == 1 ? (item.ConsigneeName == 0 ? "" : item.ConsigneeName) : (item.ShipperName == 0 ? "" : item.ShipperName)) + "</td>"

                    + "<td class='Shipper hide' val='" + item.ShipperID + "'>" + item.ShipperName + "</td>"
                    + "<td class='ShipperAddress hide' val='" + item.ShipperAddressID + "'>" + item.ShipperAddressID + "</td>"
                    + "<td class='ShipperContact hide' val='" + item.ShipperContactID + "'>" + item.ShipperContactID + "</td>"
                    + "<td class='Consignee hide' val='" + item.ConsigneeID + "'>" + item.ConsigneeName + "</td>"
                    + "<td class='ConsigneeAddress hide' val='" + item.ConsigneeAddressID + "'>" + item.ConsigneeAddressID + "</td>"
                    + "<td class='ConsigneeContact hide' val='" + item.ConsigneeContactID + "'>" + item.ConsigneeContactID + "</td>"

                    + "<td class='Carrier hide' val='" + (item.TransportType == "1" ? item.ShippingLineID //Ocean
                                                            : (item.TransportType == "2" ? item.AirlineID //Air
                                                            : item.TruckerID) //Inland
                                                            ) //EOF getting the carrier ID val
                                                        + "'>" + (item.TransportType == "1" ? item.ShippingLineName //Ocean
                                                        : (item.TransportType == "2" ? item.AirlineName //Air
                                                        : item.TruckerName) //Inland
                                                        )
                    + "</td>"
                    + "<td class='Routing'>" + item.POLCode + " > " + item.PODCode + "</td>"
                    + "<td class='POL hide' val='" + item.POL + "'>" + item.POLCode + "</td>"
                    + "<td class='POD hide' val='" + item.POD + "'>" + item.PODCode + "</td>"
                    + "<td class='Incoterm hide' val='" + item.IncotermID + "'>" + item.IncotermName + "</td>"
                    + "<td class='Commodity hide' val='" + item.CommodityID + "'>" + item.CommoditymName + "</td>"
                    + "<td class='TransientTime hide'>" + item.TransientTime + "</td>"
                    + "<td class='CloseDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CloseDate)) + "</td>"
                    //ShipmentType : 1-FCL 2-LCL 3-FTL 4-LTL
                    + "<td class='ShipmentType'>" + GetShipmentType(item.ShipmentType) + " " + GetBLType(item.BLType) + "</td>"
                    //+ "<td class='shownExpirationDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
                    //                          + " <i class='fa fa-calendar'></i>"
                    //                          //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate)) + "</small>"
                    //                          + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.ExpirationDate)) + "</small>"
                    //                          + "</span>"
                    //                          + "</td>"
                    //+ "<td class='ExpirationDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate)) + "</td>"
                    + "<td class='Volume hide'>" + item.Volume + "</td>"
                    + "<td class='IncludePickup hide'> <input type='checkbox' disabled='disabled' val='" + (item.IncludePickup == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='PickupAddress hide' val='" + item.PickupAddressID + "'>" + item.PickupAddressID + "</td>"
                    + "<td class='IncludeDelivery hide'> <input type='checkbox' disabled='disabled' val='" + (item.IncludeDelivery == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='DeliveryAddress hide' val='" + item.DeliveryAddressID + "'>" + item.DeliveryAddressID + "</td>"

                    + "<td class='GrossWeight hide'>" + item.GrossWeight + "</td>"
                    + "<td class='Volume hide'>" + item.Volume + "</td>"
                    + "<td class='ChargeableWeight hide'>" + item.ChargeableWeight + "</td>" //shown as Wt/Msr(MT) incase of ocean or inland
                    + "<td class='NumberOfPackages hide'>" + item.NumberOfPackages + "</td>"
                    + "<td class='IsDangerousGoods hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsDangerousGoods == true ? "true' checked='checked'" : "'") + " /></td>"
                    //+ "<td class='DescriptionOfGoods hide'>" + item.DescriptionOfGoods + "</td>"
                    + "<td class='OperationStage hide' val='" + item.OperationStageID + "'>" + item.OperationStageName + "</td>"
                    + "<td class='Branch' val='" + item.BranchID + "'>" + (item.BranchID == 0 ? "" : item.BranchName) + "</td>"
                    + "<td class='Salesman hide' val='" + item.SalesmanID + "'>" + item.Salesman + "</td>"
                    + "<td class='Notes hide'>" + item.Notes + "</td>"
                    + "<td class='hide'><a onclick='SwitchToOperationsEditView(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
        debugger;
    });
    debugger;
    //ApplyPermissions();
    BindAllCheckboxonTable("tblMaster", "ID");//it attaches function to the checkboxes so when all are checked then check cb-checkall too
    CheckAllCheckbox("ID");
    HighlightText("#tblMaster>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    var intRowsCount = $('#tblMaster tr').length - 1;//document.getElementById("tblMaster").getElementsByTagName("tr").length - 1;
    if (intRowsCount > 0)
        $("#tblMaster").removeClass("hide");
    else
        $("#spanNoMaster").removeClass("hide");
    //i put FillListWithNames in the LoadView so the value remains unchanged
    ////parameters (pStrFnName, pStrFirstRow, pListName)
    //FillListWithNames("/api/NoAccessQuoteAndOperStages/LoadAll", "ALL STAGES", "ulOperationStages");
}
function Master_LoadMaster() {
    var pWhereClause = " WHERE 1=1 ";
    pWhereClause += " AND ID = " + $("#hMasterOperationID").val();
    LoadAll("/api/Operations/LoadAll"
        , pWhereClause
        , function (pTabelRows) { Master_BindTableRows(JSON.parse(pTabelRows)); });
}