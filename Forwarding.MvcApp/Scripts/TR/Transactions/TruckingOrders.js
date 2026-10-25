var RoutingSuffix = "TruckingOrder";
var TodaysDate = new Date();
var FormattedTodaysDate = TodaysDate.toLocaleDateString();
var maxReceiveDetailsSerialIDInTable = 0; //used for when adding new row then make td control names unique
//$(document).ready(function () {

//    $("#slFilterEquipment").css({ "width": "100%" }).select2();
//    $("#slFilterEquipment").trigger("change");

//    $("#slFilterTrailer").css({ "width": "100%" }).select2();
//    $("#slFilterTrailer").trigger("change");

//    $("#slFilterTrucker").css({ "width": "100%" }).select2();
//    $("#slFilterTrucker").trigger("change");

//    $("#slFilterCustomer").css({ "width": "100%" }).select2();
//    $("#slFilterCustomer").trigger("change");

//    if (pDefaults.UnEditableCompanyName == "GBL") {
//        $("#slEquipmentTruckingOrder").css({ "width": "100%" }).select2();
//        $("#slEquipmentTruckingOrder").trigger("change");

//        $("#slTrailerTruckingOrder").css({ "width": "100%" }).select2();
//        $("#slTrailerTruckingOrder").trigger("change");

//    }

//    $("div[tabindex='-1']").removeAttr('tabindex');
//});
function ApplySelectListSearch() {
    debugger;
    $("#slCustomer").css({ "width": "100%" }).select2();
    //$("#slCustomer").trigger("change"); //i dont 

    $("#slFilterCustomer").css({ "width": "100%" }).select2();
    $("#slFilterCustomer").trigger("change");

    $("#slQuotationRoute").css({ "width": "100%" }).select2();
    $("#slQuotationRoute").trigger("change");

    //if (pDefaults.UnEditableCompanyName == "GBL" || pDefaults.UnEditableCompanyName == "IST") {
    $("#slEquipmentTruckingOrder").css({ "width": "100%" }).select2();
    $("#slEquipmentTruckingOrder").trigger("change");

    $("#slTrailerTruckingOrder").css({ "width": "100%" }).select2();
    $("#slTrailerTruckingOrder").trigger("change");

    $("#slCommodity").css({ "width": "100%" }).select2();
    $("#slCommodity").trigger("change");

    $("#slDriverTruckingOrder").css({ "width": "100%" }).select2();
    $("#slDriverTruckingOrder").trigger("change");

    $("#slDriverAssistantTruckingOrder").css({ "width": "100%" }).select2();
    $("#slDriverAssistantTruckingOrder").trigger("change");

    $("#slDivision").css({ "width": "100%" }).select2();
    $("#slDivision").trigger("change");

    //}

    $("#slFilterTruckingOrder").css({ "width": "100%" }).select2();
    $("#slFilterTruckingOrder").trigger("change");

    $("#slFilterEquipment").css({ "width": "100%" }).select2();
    $("#slFilterEquipment").trigger("change");

    $("#slFilterTrailer").css({ "width": "100%" }).select2();
    $("#slFilterTrailer").trigger("change");

    $("#slFiltertrucker").css({ "width": "100%" }).select2();
    $("#slfilterTrucker").trigger("change");

    $("#slSearchCharges_FromOut").css({ "width": "100%" }).select2();
    //$("#slSearchCharges_FromOut").trigger("change");

    $("#slSearchCharges").css({ "width": "100%" }).select2();
    //$("#slSearchCharges").trigger("change");

    $("div[tabindex='-1']").removeAttr('tabindex');
}
function ApplySelectListSearch_OnlyChange() {
    $("#slCustomer").css({ "width": "100%" }).select2();

    $("#slFilterCustomer").css({ "width": "100%" }).select2();

    $("#slQuotationRoute").css({ "width": "100%" }).select2();

    //if (pDefaults.UnEditableCompanyName == "GBL" || pDefaults.UnEditableCompanyName == "IST") {
    $("#slEquipmentTruckingOrder").css({ "width": "100%" }).select2();

    $("#slTrailerTruckingOrder").css({ "width": "100%" }).select2();

    $("#slCommodity").css({ "width": "100%" }).select2();

    $("#slDriverTruckingOrder").css({ "width": "100%" }).select2();

    $("#slDriverAssistantTruckingOrder").css({ "width": "100%" }).select2();

    $("#slDivision").css({ "width": "100%" }).select2();

    $("#slFilterTruckingOrder").css({ "width": "100%" }).select2();

    $("#slFilterEquipment").css({ "width": "100%" }).select2();

    $("#slFilterTrailer").css({ "width": "100%" }).select2();

    $("#slFiltertrucker").css({ "width": "100%" }).select2();

    $("#slSearchCharges_FromOut").css({ "width": "100%" }).select2();

    $("#slSearchCharges").css({ "width": "100%" }).select2();
}
function TruckingOrders_BindTableRows(pRoutings) {
    //debugger;
    //$("#hl-menu-Warehousing").parent().addClass("active");
    debugger;
    ClearAllTableRows("tblRoutings");
    var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' title='Print'> <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    var copyControlsText = " class='btn btn-xs btn-rounded btn-primary float-right' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Copy" + "</span>";
    var emailControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-envelope-o' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Mail" + "</span>";
    var AssignedETAPOLDate = new Date(); var AssignedATAPOLDate = new Date();
    var AssignedExpectedDeparture = new Date(); var AssignedActualDeparture = new Date();
    var AssignedExpectedArrival = new Date(); var AssignedActualArrival = new Date();
    var AssignedShippingLineName = ""; var AssignedAirlineName = ""; var AssignedTruckerName = "";
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pRoutings, function (i, item) {
        if ($("#hBLType").val() == constHouseBLType && item.RoutingTypeID == MainCarraigeRoutingTypeID) { //House and MainRoute so get from masterOp (from vwOperations in OperationsEdit) 
            AssignedETAPOLDate = $("#hETAPOLDate").val();
            AssignedATAPOLDate = $("#hATAPOLDate").val();
            AssignedExpectedDeparture = $("#hExpectedDeparture").val();
            AssignedActualDeparture = $("#hActualDeparture").val();
            AssignedExpectedArrival = $("#hExpectedArrival").val();
            AssignedActualArrival = $("#hActualArrival").val();
            AssignedShippingLineName = $("#hShippingLineName").val();
            AssignedAirlineName = $("#hAirlineName").val();
            AssignedTruckerName = $("#hTruckerName").val();
        }
        else { //not House and MainRoute
            AssignedETAPOLDate = item.ETAPOLDate;
            AssignedATAPOLDate = item.ATAPOLDate;
            AssignedExpectedDeparture = item.ExpectedDeparture;
            AssignedActualDeparture = item.ActualDeparture;
            AssignedExpectedArrival = item.ExpectedArrival;
            AssignedActualArrival = item.ActualArrival;
            AssignedShippingLineName = item.ShippingLineName;
            AssignedAirlineName = item.AirlineName;
            AssignedTruckerName = item.TruckerName;
        }
        AppendRowtoTable("tblRoutings",
            ("<tr class='font-bold' ID='" + item.ID + "' val='" + item.RoutingTypeID + "' " + (("ondblclick='Routings_EditByDblClick(" + item.ID + ");'")) + ">"
                //+ "<td class='RoutingID'> <input " + (item.RoutingTypeID != MainCarraigeRoutingTypeID || (item.RoutingTypeID == MainCarraigeRoutingTypeID && $("#tblRoutings tbody tr td.RoutingTypeID[val=" + MainCarraigeRoutingTypeID + "]").length > 0) ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='RoutingID'> <input " + (item.RoutingTypeID != MainCarraigeRoutingTypeID ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='RoutingType hide' val='" + item.RoutingTypeID + "'>" + item.RoutingName + "</td>"
                + "<td class='TruckingOrderCode'>" + (item.TruckingOrderCode == 0 ? "" : item.TruckingOrderCode) + "</td>"
                + "<td class='OperationCode'>" + (item.OperationCode == 0 ? "" : item.OperationCode) + "</td>"
                + "<td class='ClientName'>" + (item.ClientName == 0 ? "" : item.ClientName) + "</td>"
                + "<td class='ShipmentTypeCode' val='" + item.ShipmentTypeCode + "'>" + item.ShipmentTypeCode + "</td>"
                + "<td class='BillNumber' val='" + item.BillNumber + "'>" + item.BillNumber + "</td>"
                + "<td class='ContainersCount' val='" + item.ContainersCount + "'>" + item.ContainersCount + "</td>"
                + "<td class='VehiclesCount' val='" + item.VehiclesCount + "'>" + item.VehiclesCount + "</td>"
                + ((glbFormCalled == 10) ? "<td class='EquipmentNumber' val='" + item.EquipmentNumber + "'>" + item.EquipmentNumber + "</td>" : "")
                + ((glbFormCalled == 20) ? "<td class='TruckerName' val='" + item.EquipmentNumber + "'>" + item.TruckerName + "</td>" : "")
                + "<td class='VoyageOrTruckNumber hide' val='" + item.VoyageOrTruckNumber + "'>" + item.VoyageOrTruckNumber + "</td>"
                //TransportType : 1-Ocean 2-Air 3-Inland
                + "<td class='TransportType hide' val='" + item.TransportType + "'>" + GetTransportType(item.TransportType) + "</td>"
                + "<td class='shownTransportIconName hide' ><i class= 'fa " + item.TransportIconName + " " + item.TransportIconStyle + " fa-2x'/></td>"
                + "<td class='TransportIconName hide'>" + item.TransportIconName + "</td>"//this line is to get the value of the IconName to fill it in the modal 
                + "<td class='TransportIconStyle hide'>" + item.TransportIconStyle + "</td>"//this line is to get the value of the IconStyle to fill it in the modal 

                + "<td class='POLCountry hide' val='" + item.POLCountryID + "'>" + item.POLCountryID + "</td>"
                + "<td class='PODCountry hide' val='" + item.PODCountryID + "'>" + item.PODCountryID + "</td>"
                + "<td class='POL hide' val='" + item.POL + "'><small>" + item.POLCountryCode + " (" + item.POLCode + " " + item.POLName + ")" +
                "<br/>Exp. Departure : <span  class='static-text-blue'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(AssignedExpectedDeparture)) < 1 ? "Unspecified" : GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(AssignedExpectedDeparture))) + " </span>" +
                "<br/>Act. Departure : <span  class='static-text-blue'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(AssignedActualDeparture)) < 1 ? "Unspecified" : GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(AssignedActualDeparture))) + " </span>" +
                "</small></td>"


                + "<td class='POD hide' val='" + item.POD + "'><small>" + item.PODCountryCode + " (" + item.PODCode + " " + item.PODName + ")" +
                "<br/>Exp. Arrival   : <span  class='static-text-blue'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(AssignedExpectedArrival)) < 1 ? "Unspecified" : GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(AssignedExpectedArrival))) + " </span>" +
                "<br/>Act. Arrival   : <span  class='static-text-blue'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(AssignedActualArrival)) < 1 ? "Unspecified" : GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(AssignedActualArrival))) + " </span>" +
                "</small></td>"

                + "<td class='ETAPOLDate hide' val='" + GetDateWithFormatMDY(AssignedETAPOLDate) + "'>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(AssignedETAPOLDate)) + "</td>"
                + "<td class='ATAPOLDate hide' val='" + GetDateWithFormatMDY(AssignedATAPOLDate) + "'>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(AssignedATAPOLDate)) + "</td>"

                + "<td class='ExpectedArrival hide' val='" + GetDateWithFormatMDY(AssignedExpectedArrival) + "'>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(AssignedExpectedArrival)) + "</td>"
                + "<td class='ExpectedDeparture hide' val='" + GetDateWithFormatMDY(AssignedExpectedDeparture) + "'>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(AssignedExpectedDeparture)) + "</td>"
                + "<td class='ActualArrival hide' val='" + GetDateWithFormatMDY(AssignedActualArrival) + "'>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(AssignedActualArrival)) + "</td>"
                + "<td class='ActualDeparture hide' val='" + GetDateWithFormatMDY(AssignedActualDeparture) + "'>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(AssignedActualDeparture)) + "</td>"

                //+ "<td class='Line hide' val='" + (item.TransportType == OceanTransportType ? ($("#hBLType").val() == constHouseBLType && item.RoutingTypeID == MainCarraigeRoutingTypeID ? $("#hShippingLineID").val() : item.ShippingLineID)//In case of House and main route get from vwOperations(The Line from MasterOp)
                //                            : (item.TransportType == AirTransportType ? ($("#hBLType").val() == constHouseBLType && item.RoutingTypeID == MainCarraigeRoutingTypeID ? $("#hAirlineID").val() : item.AirlineID)//In case of House and main route get from vwOperations(The Line from MasterOp)
                //                            : ($("#hBLType").val() == constHouseBLType && item.RoutingTypeID == MainCarraigeRoutingTypeID ? $("#hTruckerID").val() : item.TruckerID)) //In case of House and main route get from vwOperations(The Line from MasterOp)
                //                            ) //EOF getting the carrier ID val
                //                                    + "'>" + (item.TransportType == OceanTransportType ? (AssignedShippingLineName == 0 ? "" : AssignedShippingLineName) //Ocean
                //                                    : (item.TransportType == AirTransportType ? (AssignedAirlineName == 0 ? "" : AssignedAirlineName) //Air
                //                                    : (AssignedTruckerName == 0 ? "" : AssignedTruckerName)) //Inland
                //   
                //+ "</td>")
                + "<td class='Line hide' val='" + item.TruckerID + "'>" + (item.TruckerID == 0 ? "" : item.TruckerID) + "</td>"
                + "<td class='Vessel hide' val='" + item.VesselID + "'>" + (item.VesselID == 0 ? "" : item.VesselName) + "</td>"
                + "<td class='TransientTime hide'>" + (item.TransientTime == 0 ? "" : item.TransientTime) + "</td>"
                + "<td class='Validity hide'>" + (item.Validity == 0 ? "" : item.Validity) + "</td>"
                + "<td class='FreeTime hide'>" + (item.FreeTime == 0 ? "" : item.FreeTime) + "</td>"
                + "<td class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                + "<td class='RoadNumber hide'>" + (item.RoadNumber == 0 ? "" : item.RoadNumber) + "</td>"
                + "<td class='DeliveryOrderNumber hide'>" + (item.DeliveryOrderNumber == 0 ? "" : item.DeliveryOrderNumber) + "</td>"
                + "<td class='WareHouse hide'>" + (item.WareHouse == 0 ? "" : item.WareHouse) + "</td>"
                + "<td class='WareHouseLocation hide'>" + (item.WareHouseLocation == 0 ? "" : item.WareHouseLocation) + "</td>"

                + "<td class='GensetSupplierID hide'>" + item.GensetSupplierID + "</td>"
                + "<td class='CCAID hide'>" + item.CCAID + "</td>"
                + "<td class='Quantity hide'>" + (item.Quantity == 0 ? "" : item.Quantity) + "</td>"
                + "<td class='ContactPerson hide'>" + (item.ContactPerson == 0 ? "" : item.ContactPerson) + "</td>"
                + "<td class='DeliveryAddress hide'>" + (item.DeliveryAddress == 0 ? "" : item.DeliveryAddress) + "</td>"
                + "<td class='GateInPortID hide'>" + item.GateInPortID + "</td>"
                + "<td class='GateOutPortID hide'>" + item.GateOutPortID + "</td>"
                + "<td class='GateInDate hide'>" + item.GateInDate + "</td>"

                /*****************TransportOrder*******************/
                + "<td class='CustomerID hide'>" + item.CustomerID + "</td>"
                + "<td class='SubContractedCustomerID hide'>" + item.SubContractedCustomerID + "</td>"
                + "<td class='Cost hide'>" + item.Cost + "</td>"
                + "<td class='Sale hide'>" + item.Sale + "</td>"
                + "<td class='IsIsFleet hide'><input type='checkbox' id='cbIsIsFleet" + item.ID + "' disabled='disabled' " + (item.IsIsFleet ? " checked='checked' " : "") + " /></td>"
                + "<td class='CommodityID hide'>" + item.CommodityID + "</td>"
                + "<td class='LoadingDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.LoadingDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.LoadingDate)) : "") + "</td>"
                + "<td class='LoadingReference hide'>" + (item.LoadingReference == 0 ? "" : item.LoadingReference) + "</td>"
                + "<td class='UnloadingDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.UnloadingDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.UnloadingDate)) : "") + "</td>"
                + "<td class='UnloadingReference hide'>" + (item.UnloadingReference == 0 ? "" : item.UnloadingReference) + "</td>"
                + "<td class='UnloadingTime hide'>" + (item.UnloadingTime == 0 ? "" : item.UnloadingTime) + "</td>"
                + "<td class='QuotationRouteID hide'>" + item.QuotationRouteID + "</td>"
                /*****************TransportOrder*******************/

                + "<td class='GateOutDate hide'>" + item.GateOutDate + "</td>"
                + "<td class='DeliveryDate hide'>" + item.DeliveryDate + "</td>"
                + "<td class='Delays hide'>" + (item.Delays == 0 ? "" : item.Delays) + "</td>"
                + "<td class='DriverName hide'>" + (item.DriverName == 0 ? "" : item.DriverName) + "</td>"
                + "<td class='CustomerWarehouseManagerName hide'>" + (item.CustomerWarehouseManagerName == 0 ? "" : item.CustomerWarehouseManagerName) + "</td>"
                + "<td class='CustomerWarehouseManagerPhone hide'>" + (item.PCustomerWarehouseMangerPhone == 0 ? "" : item.PCustomerWarehouseMangerPhone) + "</td>"
                + "<td class='TruckingEquipmentModels hide'>" + (item.TruckingEquipmentID == 0 ? "" : item.TruckingEquipmentID) + "</td>"
                + "<td class='DriverPhones hide'>" + (item.DriverPhones == 0 ? "" : item.DriverPhones) + "</td>"
                + "<td class='PowerFromGateInTillActualSailing hide'>" + (item.PowerFromGateInTillActualSailing == 0 ? "" : item.PowerFromGateInTillActualSailing) + "</td>"
                + "<td class='ContactPersonPhones hide'>" + (item.ContactPersonPhones == 0 ? "" : item.ContactPersonPhones) + "</td>"
                + "<td class='LoadingTime hide'>" + (item.LoadingTime == 0 ? "" : item.LoadingTime) + "</td>"

                + "<td class='CCAFreight hide'>" + (item.CCAFreight == 0 ? "" : item.CCAFreight) + "</td>"
                + "<td class='CCAFOB hide'>" + (item.CCAFOB == 0 ? "" : item.CCAFOB) + "</td>"
                + "<td class='CCACFValue hide'>" + (item.CCACFValue == 0 ? "" : item.CCACFValue) + "</td>"
                + "<td class='CCAInvoiceNumber hide'>" + (item.CCAFOB + item.CCACFValue) + "</td>"

                + "<td class='CCAInsurance hide'>" + (item.CCAInsurance == 0 ? "" : item.CCAInsurance) + "</td>"
                + "<td class='CCADischargeValue hide'>" + (item.CCADischargeValue == 0 ? "" : item.CCADischargeValue) + "</td>"
                + "<td class='CCAAcceptedValue hide'>" + (item.CCAAcceptedValue == 0 ? "" : item.CCAAcceptedValue) + "</td>"
                + "<td class='CCAImportValue hide'>" + (item.CCAImportValue == 0 ? "" : item.CCAImportValue) + "</td>"
                + "<td class='CCADocumentReceiveDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CCADocumentReceiveDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.CCADocumentReceiveDate))) + "</td>"
                + "<td class='CCAExchangeRate hide'>" + (item.CCAExchangeRate == 0 ? "" : item.CCAExchangeRate) + "</td>"
                + "<td class='CCAVATCertificateNumber hide'>" + (item.CCAVATCertificateNumber == 0 ? "" : item.CCAVATCertificateNumber) + "</td>"
                + "<td class='CCAVATCertificateValue hide'>" + (item.CCAVATCertificateValue == 0 ? "" : item.CCAVATCertificateValue) + "</td>"
                + "<td class='CCACommercialProfitCertificateNumber hide'>" + (item.CCACommercialProfitCertificateNumber == 0 ? "" : item.CCACommercialProfitCertificateNumber) + "</td>"
                + "<td class='CCAWindowFees hide'>" + (item.CCAWindowFees == 0 ? "" : item.CCAWindowFees) + "</td>"
                + "<td class='CCAStorageFees hide'>" + (item.CCAStorageFees == 0 ? "" : item.CCAStorageFees) + "</td>"
                + "<td class='CCACommercialProfitTax hide'>" + (item.CCACommercialProfitTax == 0 ? "" : item.CCACommercialProfitTax) + "</td>"
                + "<td class='CCACustomsValue hide'>" + (item.CCACustomsValue == 0 ? "" : item.CCACustomsValue) + "</td>"
                + "<td class='CCAQuotedValue hide'>" + (item.CCAQuotedValue == 0 ? "" : item.CCAQuotedValue) + "</td>"
                + "<td class='CCAContractType hide'>" + (item.CCAContractType == 0 ? "" : item.CCAContractType) + "</td>"
                + "<td class='CCAOthers hide'>" + (item.CCAOthers == 0 ? "" : item.CCAOthers) + "</td>"
                + "<td class='CCASpendDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CCASpendDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.CCASpendDate))) + "</td>"

                + "<td class='CertificateNumber hide'>" + (item.CertificateNumber == 0 ? "" : item.CertificateNumber) + "</td>"
                + "<td class='CertificateValue hide'>" + (item.CertificateValue == 0 ? "" : item.CertificateValue) + "</td>"
                + "<td class='CertificateDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CertificateDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.CertificateDate))) + "</td>"
                + "<td class='QasimaNumber hide'>" + (item.QasimaNumber == 0 ? "" : item.QasimaNumber) + "</td>"
                + "<td class='QasimaDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.QasimaDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.QasimaDate))) + "</td>"
                + "<td class='SalesDateReceived hide'>" + item.SalesDateReceived + "</td>"
                + "<td class='CommerceDateReceived hide'>" + item.CommerceDateReceived + "</td>"
                + "<td class='InspectionDateReceived hide'>" + item.InspectionDateReceived + "</td>"
                + "<td class='FinishDateReceived hide'>" + item.FinishDateReceived + "</td>"
                + "<td class='SalesDateDelivered hide'>" + item.SalesDateDelivered + "</td>"
                + "<td class='CommerceDateDelivered hide'>" + item.CommerceDateDelivered + "</td>"
                + "<td class='InspectionDateDelivered hide'>" + item.InspectionDateDelivered + "</td>"
                + "<td class='FinishDateDelivered hide'>" + item.FinishDateDelivered + "</td>"

                + "<td class='IsOwnedByCompany hide'><input type='checkbox' id='cbIsOwnedByCompany" + item.ID + "' disabled='disabled' " + (item.IsOwnedByCompany ? " checked='checked' " : "") + " /></td>"
                + "<td class='TrailerID hide'>" + (item.TrailerID == 0 ? "" : item.TrailerID) + "</td>"
                + "<td class='DriverID hide'>" + (item.DriverID == 0 ? "" : item.DriverID) + "</td>"
                + "<td class='DriverAssistantID hide'>" + (item.DriverAssistantID == 0 ? "" : item.DriverAssistantID) + "</td>"
                + "<td class='EquipmentID hide'>" + (item.EquipmentID == 0 ? "" : item.EquipmentID) + "</td>"
                + "<td class='LoadingZoneID hide'>" + (item.LoadingZoneID == 0 ? "" : item.LoadingZoneID) + "</td>"
                + "<td class='FirstCuringAreaID hide'>" + (item.FirstCuringAreaID == 0 ? "" : item.FirstCuringAreaID) + "</td>"
                + "<td class='SecondCuringAreaID hide'>" + (item.SecondCuringAreaID == 0 ? "" : item.SecondCuringAreaID) + "</td>"
                + "<td class='ThirdCuringAreaID hide'>" + (item.ThirdCuringAreaID == 0 ? "" : item.ThirdCuringAreaID) + "</td>"
                + "<td class='OperationID hide'>" + (item.OperationID == 0 ? "" : item.OperationID) + "</td>"
                + "<td class='CargoReturnGrossWeight hide'>" + (item.CargoReturnGrossWeight == 0 ? "" : item.CargoReturnGrossWeight) + "</td>"
                + "<td class='TruckCounter hide'>" + (item.TruckCounter == 0 ? "" : item.TruckCounter) + "</td>"

                + "<td class='Cost'>" + (item.IsOwnedByCompany ? item.CostFromPayables : item.Cost) + "</td>"
                + "<td class='Creator'>" + (item.CreatorName == 0 ? "" : item.CreatorName) + "</td>"

                + "<td class='StuffingDate " + (pDefaults.UnEditableCompanyName == "ELI" ? "" : " hide") + "'>" + (item.StuffingDate == 0 ? "" : item.StuffingDate) + "</td>"
                + "<td class='PickupAddress " + (pDefaults.UnEditableCompanyName == "ELI" ? "" : " hide") + "'>" + (item.PickupAddress == 0 ? "" : item.PickupAddress) + "</td>"
                + "<td class='PODName " + (pDefaults.UnEditableCompanyName == "ELI" ? "" : " hide") + "'>" + (item.PODName == 0 ? "" : item.PODName) + "</td>"
                + "<td class='ETD " + (pDefaults.UnEditableCompanyName == "ELI" ? "" : " hide") + "'>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(AssignedExpectedDeparture)) + "</td>"
                + "<td class='BookingNumber " + (pDefaults.UnEditableCompanyName == "ELI" ? "" : " hide") + "'>" + (item.BookingNumber == 0 ? "" : item.BookingNumber) + "</td>"


                + "<td class='Posted'> <input id=cbPosted" + item.ID + " type='checkbox' disabled='disabled' " + (item.IsApproved ? " checked='checked' " : "") + " /></td>"
                + "<td class=''>"
                + "<a onclick='Routings_Copy(" + item.ID + ");' " + copyControlsText + "</a>"
                //+ "<a onclick='Print_TruckingOrder(" + item.ID + "," + '"Email"' + ");' " + emailControlsText + "</a>"
                + "<a onclick='Print_TruckingOrder(" + item.ID + "," + '"Print"' + ");' " + printControlsText + "</a>"
                //+ "<a href='#RoutingModalTruckingOrder' data-toggle='modal' onclick='FleetTransportOrder_FillModalControls(" + item.ID + ");' " + editControlsText + "</a>"
                + "</td>"
                + "</tr>"));
    });
    ApplyPermissions();

    if ($("#hf_CanDelete").val() == 1) {
        $("#btn-ApproveRoute").removeClass("hide");
        $("#btn-DeleteRoute").removeClass("hide");
        $("#btn-UnApproveRoute").removeClass("hide");
    }
    else {
        $("#btn-ApproveRoute").addClass("hide");
        $("#btn-DeleteRoute").addClass("hide");
        $("#btn-UnApproveRoute").addClass("hide");
    }
    //if (OARou && $ $("#hf_CanDelete").val()hIsOperationDisabled").val() == false) { $("#btn-AddRoute").removeClass("hide"); } else { $("#btn-AddRoute").addClass("hide"); }
    //if (OARou && $("#hIsOperationDisabled").val() == false) { $("#btn-AddRouteTruckingOrder").removeClass("hide"); $("#btn-AddRouteCustomsClearance").removeClass("hide"); } else { $("#btn-AddRouteTruckingOrder").addClass("hide"); $("#btn-AddRouteCustomsClearance").addClass("hide"); }
    //if (ODRou && $("#hIsOperationDisabled").val() == false) $("#btn-DeleteRoute").removeClass("hide"); else $("#btn-DeleteRoute").addClass("hide");
    BindAllCheckboxonTable("tblRoutings", "RoutingID", "cb-CheckAll-Routings");
    CheckAllCheckbox("HeaderDeleteRoutingID");
    //HighlightText("#tblRoutings>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    // Routings_SetTableProperties();//Set Routing Table Properties according to BLType and if Connected or Not
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
    ApplySelectListSearch_OnlyChange(); //ApplySelectListSearch();
    if (pDefaults.UnEditableCompanyName == "CAP") {
        $('#txtTruckLastCounterTruckingOrder').removeAttr("disabled");
    }
}
function TruckingOrders_LoadingWithPaging(pCancelFadePageCover) {
    debugger;
    var pWhereClause = TruckingOrders_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) {
        if (glbCallingControl == "FleetTransportOrder" || glbCallingControl == "FleetTransportOrderSupplier")
            FleetTransportOrder_BindTableRows(JSON.parse(pData[0]));
        else
            TruckingOrders_BindTableRows(JSON.parse(pData[0]));
    }, pCancelFadePageCover);
    //HighlightText("#tblReceive>tbody>tr", $("#txt-Search").val().trim());
}
function Routings_Insert(pSaveandAddNew) {
    debugger;
    if (RoutingSuffix != "CustomsClearance" && !Routings_CheckDatesLogic())
        swal(strSorry, strCheckDates);
    //uncomment if i want to remove logic date validation
    //else //check dates are not before open date
    //    if (
    //        ($("#txtExpectedDeparture").val().trim() != "" && Date.prototype.compareDates(ConvertDateFormat($("#txtOpenDate").val().trim()), ConvertDateFormat($("#txtExpectedDeparture").val().trim())) < 0)
    //        || ($("#txtActualDeparture").val().trim() != "" && Date.prototype.compareDates(ConvertDateFormat($("#txtOpenDate").val().trim()), ConvertDateFormat($("#txtActualDeparture").val().trim())) < 0)
    //        || ($("#txtExpectedArrival").val().trim() != "" && Date.prototype.compareDates(ConvertDateFormat($("#txtOpenDate").val().trim()), ConvertDateFormat($("#txtExpectedArrival").val().trim())) < 0)
    //        || ($("#txtActualArrival").val().trim() != "" && Date.prototype.compareDates(ConvertDateFormat($("#txtOpenDate").val().trim()), ConvertDateFormat($("#txtActualArrival").val().trim())) < 0)
    //        )
    //        swal(strSorry, "Dates must be after open date.");
    else if (glbCallingControl == "FleetTransportOrder"
        && $("#slQuotationRoute option:selected").attr("EquipmentModelID") != undefined
        && $("#slQuotationRoute option:selected").attr("EquipmentModelID") != 0
        && $("#slEquipmentTruckingOrder option:selected").attr("EquipmentModelID") != undefined
        && $("#slEquipmentTruckingOrder option:selected").attr("EquipmentModelID") != 0
        && $("#slQuotationRoute option:selected").attr("EquipmentModelID") != $("#slEquipmentTruckingOrder option:selected").attr("EquipmentModelID")
    )
        swal("Sorry", "The equipment you chose is not the same model as the route contract.");
    else if (ValidateForm("form", "RoutingModal" + RoutingSuffix)) {
        FadePageCover(true);
        var pParametersWithValues = {
            pOperationID: $("#hOperationID").val()
            , pRoutingTypeID: TruckingOrderRoutingTypeID //$('#slRoutingTypes' + RoutingSuffix + ' option:selected').val()
            , pTransportTypeID: InlandTransportType //$("#hRoutingTransportType" + RoutingSuffix).val()
            , pTransportIconName: InlandIconName //$("#hRoutingTransportIconName" + RoutingSuffix).val()
            , pTransportIconStyle: strInlandIconStyleClassName //$("#hRoutingTransportIconStyle" + RoutingSuffix).val()

            , pPOLCountryID: RoutingSuffix == "CustomsClearance" ? $("#hPOLCountryID").val() : $('#slRoutingsPOLCountries' + RoutingSuffix + ' option:selected').val()
            , pPODCountryID: RoutingSuffix == "CustomsClearance" ? $("#hPODCountryID").val() : $('#slRoutingsPODCountries' + RoutingSuffix + ' option:selected').val()
            , pPOLID: RoutingSuffix == "CustomsClearance" ? $("#hPOL").val() : $('#slRoutingsPOL' + RoutingSuffix + ' option:selected').val()
            , pPODID: RoutingSuffix == "CustomsClearance" ? $("#hPOL").val() : $('#slRoutingsPOD' + RoutingSuffix + ' option:selected').val()

            , pETAPOLDate: (RoutingSuffix == "CustomsClearance" || $("#txtETAPOLDate" + RoutingSuffix).val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtETAPOLDate" + RoutingSuffix).val()))
            , pATAPOLDate: (RoutingSuffix == "CustomsClearance" || $("#txtATAPOLDate" + RoutingSuffix).val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtATAPOLDate" + RoutingSuffix).val()))
            , pExpectedArrival: (RoutingSuffix == "CustomsClearance" || $("#txtExpectedArrival" + RoutingSuffix).val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtExpectedArrival" + RoutingSuffix).val()))
            , pExpectedDeparture: (RoutingSuffix == "CustomsClearance" || $("#txtExpectedDeparture" + RoutingSuffix).val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtExpectedDeparture" + RoutingSuffix).val()))
            , pActualArrival: (RoutingSuffix == "CustomsClearance" || $("#txtActualArrival" + RoutingSuffix).val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtActualArrival" + RoutingSuffix).val()))
            , pActualDeparture: (RoutingSuffix == "CustomsClearance" || $("#txtActualDeparture" + RoutingSuffix).val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtActualDeparture" + RoutingSuffix).val()))

            , pShippingLineID: (RoutingSuffix == "CustomsClearance")
                ? 0
                : ($("#hRoutingTransportType" + RoutingSuffix).val() == OceanTransportType
                    ? ($('#slRoutingsLines' + RoutingSuffix + ' option:selected').val() == "" ? 0 : $('#slRoutingsLines' + RoutingSuffix + ' option:selected').val())
                    : 0)
            , pAirlineID: (RoutingSuffix == "CustomsClearance")
                ? 0
                : ($("#hRoutingTransportType" + RoutingSuffix).val() == AirTransportType
                    ? ($('#slRoutingsLines' + RoutingSuffix + ' option:selected').val() == "" ? 0 : $('#slRoutingsLines' + RoutingSuffix + ' option:selected').val())
                    : 0)
            , pTruckerID: $("#slRoutingsLinesTruckingOrder").val() == "" ? 0 : $("#slRoutingsLinesTruckingOrder").val()
            , pVesselID: (RoutingSuffix == "CustomsClearance")
                ? 0
                : ($("#hRoutingTransportType" + RoutingSuffix).val() == OceanTransportType
                    ? ($('#slRoutingVessels' + RoutingSuffix + ' option:selected').val() == "" ? 0 : $('#slRoutingVessels' + RoutingSuffix + ' option:selected').val())
                    : 0)
            , pVoyageOrTruckNumber: ($("#cbIsOwnedByCompany").prop("checked") || RoutingSuffix == "CustomsClearance") ? 0 : $("#txtRoutingVoyageOrTruckNumber" + RoutingSuffix).val().trim().toUpperCase()
            , pTransientTime: RoutingSuffix == "CustomsClearance" || $("#txtRoutingTransientTime" + RoutingSuffix).val().trim() == "" ? 0 : $("#txtRoutingTransientTime" + RoutingSuffix).val()
            , pValidity: RoutingSuffix == "CustomsClearance" || $("#txtRoutingValidity" + RoutingSuffix).val().trim() == "" ? 0 : $("#txtRoutingValidity" + RoutingSuffix).val()
            , pFreeTime: RoutingSuffix == "CustomsClearance" || $("#txtRoutingFreeTime" + RoutingSuffix).val().trim() == "" ? 0 : $("#txtRoutingFreeTime" + RoutingSuffix).val()
            , pNotes: $("#txtRoutingNotes" + RoutingSuffix).val().trim().toUpperCase()

            , pGensetSupplierID: RoutingSuffix == "CustomsClearance" || $("#slTruckingOrderGensetSupplier" + RoutingSuffix).val() == "" ? 0 : $("#slTruckingOrderGensetSupplier" + RoutingSuffix).val()
            , pCCAID: $("#slRoutingCCA" + RoutingSuffix).val() == "" ? 0 : $("#slRoutingCCA" + RoutingSuffix).val()
            , pQuantity: RoutingSuffix == "CustomsClearance" || $("#txtTruckingOrderQuantity" + RoutingSuffix).val().trim() == "" ? 0 : $("#txtTruckingOrderQuantity" + RoutingSuffix).val().trim().toUpperCase()
            , pContactPerson: RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckingOrderContactPerson" + RoutingSuffix).val().trim().toUpperCase()
            , pTruckingOrderPickupAddress: $("#txtPickupAddress" + RoutingSuffix).val().trim() == "" ? "0" : $("#txtPickupAddress" + RoutingSuffix).val().trim().toUpperCase() //RoutingSuffix == "CustomsClearance" || $("#txtTruckingOrderPickupAddress" + RoutingSuffix).val().trim().toUpperCase()
            , pTruckingOrderDeliveryAddress: RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckingOrderDeliveryAddress" + RoutingSuffix).val().trim().toUpperCase()
            , pGateInPortID: RoutingSuffix == "CustomsClearance" || $("#slTruckingOrderGateInPort" + RoutingSuffix).val() == "" || $("#slTruckingOrderGateInPort" + RoutingSuffix).val() == null ? 0 : $("#slTruckingOrderGateInPort" + RoutingSuffix).val()
            , pGateOutPortID: RoutingSuffix == "CustomsClearance" || $("#slTruckingOrderGateOutPort" + RoutingSuffix).val() == "" || $("#slTruckingOrderGateOutPort" + RoutingSuffix).val() == null ? 0 : $("#slTruckingOrderGateOutPort" + RoutingSuffix).val()
            , pGateInDate: (RoutingSuffix == "CustomsClearance" || $("#txtTruckingOrderGateInDate" + RoutingSuffix).val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTruckingOrderGateInDate" + RoutingSuffix).val()))
            /****************************TransportOrder**************************/
            , pCustomerID: $("#slCustomer").val() == "" ? 0 : $("#slCustomer").val()
            , pSubContractedCustomerID: 0
            , pCost: $("#txtCost").val() == "" ? 0 : $("#txtCost").val()
            , pSale: $("#txtSale").val() == "" ? 0 : $("#txtSale").val()
            , pIsFleet: (glbCallingControl == "FleetTransportOrder" || glbCallingControl == "FleetTransportOrderSupplier" ? true : false)
            , pCommodityID: $("#slCommodity").val() == "" ? 0 : $("#slCommodity").val()
            , pLoadingDate: ($("#txtLoadingDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtLoadingDate").val()))
            , pLoadingReference: $("#txtLoadingReference").val().trim() == "" ? 0 : $("#txtLoadingReference").val().trim().toUpperCase()
            , pUnloadingDate: ($("#txtUnloadingDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtUnloadingDate").val()))
            , pUnloadingReference: $("#txtUnloadingReference").val().trim() == "" ? 0 : $("#txtUnloadingReference").val().trim().toUpperCase()
            , pUnloadingTime: $("#txtUnloadingTime").val().trim() == "" ? 0 : $("#txtUnloadingTime").val().trim().toUpperCase()
            , pQuotationRouteID: $("#slQuotationRoute").val() == "" ? 0 : $("#slQuotationRoute").val()
            /****************************TransportOrder**************************/
            , pGateOutDate: (RoutingSuffix == "CustomsClearance" || $("#txtTruckingOrderGateOutDate" + RoutingSuffix).val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTruckingOrderGateOutDate" + RoutingSuffix).val()))
            , pStuffingDate: (RoutingSuffix == "CustomsClearance" || $("#txtTruckingOrderStuffingDate" + RoutingSuffix).val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTruckingOrderStuffingDate" + RoutingSuffix).val()))
            , pDeliveryDate: (RoutingSuffix == "CustomsClearance" || $("#txtTruckingOrderDeliveryDate" + RoutingSuffix).val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTruckingOrderDeliveryDate" + RoutingSuffix).val()))
            , pBookingNumber: RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckingOrderBookingNumber" + RoutingSuffix).val().trim().toUpperCase()
            , pDelays: RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckingOrderDelays" + RoutingSuffix).val().trim().toUpperCase()
            , pDriverName: ($("#cbIsOwnedByCompany").prop("checked") || RoutingSuffix == "CustomsClearance") ? 0 : $("#txtTruckingOrderDriverName" + RoutingSuffix).val().trim().toUpperCase()
       

            
            , pDriverPhones: ($("#cbIsOwnedByCompany").prop("checked") || RoutingSuffix == "CustomsClearance") ? 0 : $("#txtTruckingOrderDriverPhones" + RoutingSuffix).val().trim().toUpperCase()
            , pPowerFromGateInTillActualSailing: RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckingOrderPowerFromGateInTillActualSailing" + RoutingSuffix).val().trim().toUpperCase()

            , pContactPersonPhones: RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckingOrderContactPersonPhones" + RoutingSuffix).val().trim().toUpperCase()
            , pLoadingTime: RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckingOrderLoadingTime" + RoutingSuffix).val().trim().toUpperCase()

            , pCCAFreight: RoutingSuffix != "CustomsClearance" || $("#txtCCAFreight").val().trim() == "" ? 0 : $("#txtCCAFreight").val().trim().toUpperCase()
            , pCCAFOB: RoutingSuffix != "CustomsClearance" || $("#txtCCAFOB").val().trim() == "" ? 0 : $("#txtCCAFOB").val().trim().toUpperCase()
            , pCCACFValue: RoutingSuffix != "CustomsClearance" || $("#txtCCACFValue").val().trim() == "" ? 0 : $("#txtCCACFValue").val().trim().toUpperCase()
            , pCCAInvoiceNumber: RoutingSuffix != "CustomsClearance" || $("#txtCCAInvoiceNumber").val().trim() == "" ? 0 : $("#txtCCAInvoiceNumber").val().trim().toUpperCase()

            , pCCAInsurance: RoutingSuffix != "CustomsClearance" || $("#txtCCAInsurance").val().trim() == "" ? 0 : $("#txtCCAInsurance").val().trim().toUpperCase()
            , pCCADischargeValue: RoutingSuffix != "CustomsClearance" || $("#txtCCADischargeValue").val().trim() == "" ? 0 : $("#txtCCADischargeValue").val().trim().toUpperCase()
            , pCCAAcceptedValue: RoutingSuffix != "CustomsClearance" || $("#txtCCAAcceptedValue").val().trim() == "" ? 0 : $("#txtCCAAcceptedValue").val().trim().toUpperCase()
            , pCCAImportValue: RoutingSuffix != "CustomsClearance" || $("#txtCCAImportValue").val().trim() == "" ? 0 : $("#txtCCAImportValue").val().trim().toUpperCase()
            , pCCADocumentReceiveDate: (RoutingSuffix != "CustomsClearance" || $("#txtCCADocumentReceiveDate").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtCCADocumentReceiveDate").val().trim()))
            , pCCAExchangeRate: RoutingSuffix != "CustomsClearance" || $("#txtCCAExchangeRate").val().trim() == "" ? 0 : $("#txtCCAExchangeRate").val().trim().toUpperCase()
            , pCCAVATCertificateNumber: RoutingSuffix != "CustomsClearance" || $("#txtCCAVATCertificateNumber").val().trim() == "" ? 0 : $("#txtCCAVATCertificateNumber").val().trim().toUpperCase()
            , pCCAVATCertificateValue: RoutingSuffix != "CustomsClearance" || $("#txtCCAVATCertificateValue").val().trim() == "" ? 0 : $("#txtCCAVATCertificateValue").val().trim().toUpperCase()
            , pCCACommercialProfitCertificateNumber: RoutingSuffix != "CustomsClearance" || $("#txtCCACommercialProfitCertificateNumber").val().trim() == "" ? 0 : $("#txtCCACommercialProfitCertificateNumber").val().trim().toUpperCase()
            , pCCAWindowFees: RoutingSuffix != "CustomsClearance" || $("#txtCCAWindowFees").val().trim() == "" ? 0 : $("#txtCCAWindowFees").val().trim().toUpperCase()
            , pCCAStorageFees: RoutingSuffix != "CustomsClearance" || $("#txtCCAStorageFees").val().trim() == "" ? 0 : $("#txtCCAStorageFees").val().trim().toUpperCase()
            , pCCACommercialProfitTax: RoutingSuffix != "CustomsClearance" || $("#txtCCACommercialProfitTax").val().trim() == "" ? 0 : $("#txtCCACommercialProfitTax").val().trim().toUpperCase()
            , pCCACustomsValue: RoutingSuffix != "CustomsClearance" || $("#txtCCACustomsValue").val().trim() == "" ? 0 : $("#txtCCACustomsValue").val().trim().toUpperCase()
            , pCCAQuotedValue: RoutingSuffix != "CustomsClearance" || $("#txtCCAQuotedValue").val().trim() == "" ? 0 : $("#txtCCAQuotedValue").val().trim().toUpperCase()
            , pCCAContractType: RoutingSuffix != "CustomsClearance" || $("#txtCCAContractType").val().trim() == "" ? 0 : $("#txtCCAContractType").val().trim().toUpperCase()
            , pCCAOthers: RoutingSuffix != "CustomsClearance" || $("#txtCCAOthers").val().trim() == "" ? 0 : $("#txtCCAOthers").val().trim().toUpperCase()
            , pCCASpendDate: (RoutingSuffix != "CustomsClearance" || $("#txtCCASpendDate").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtCCASpendDate").val().trim()))

            , pCertificateNumber: RoutingSuffix != "CustomsClearance" || $("#txtCertificateNumber").val().trim() == "" ? 0 : $("#txtCertificateNumber").val().trim().toUpperCase()
            , pCertificateValue: RoutingSuffix != "CustomsClearance" || $("#txtCertificateValue").val().trim() == "" ? 0 : $("#txtCertificateValue").val().trim().toUpperCase()
            , pCertificateDate: (RoutingSuffix != "CustomsClearance" || $("#txtCertificateDate").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtCertificateDate").val().trim()))
            , pQasimaNumber: RoutingSuffix != "CustomsClearance" || $("#txtQasimaNumber").val().trim() == "" ? 0 : $("#txtQasimaNumber").val().trim().toUpperCase()
            , pQasimaDate: (RoutingSuffix != "CustomsClearance" || $("#txtQasimaDate").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtQasimaDate").val().trim()))
            , pSalesDateReceived: (RoutingSuffix != "CustomsClearance" || $("#txtSalesDateReceived").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtSalesDateReceived").val().trim()))
            , pCommerceDateReceived: (RoutingSuffix != "CustomsClearance" || $("#txtCommerceDateReceived").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtCommerceDateReceived").val().trim()))
            , pInspectionDateReceived: (RoutingSuffix != "CustomsClearance" || $("#txtInspectionDateReceived").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtInspectionDateReceived").val().trim()))
            , pFinishDateReceived: (RoutingSuffix != "CustomsClearance" || $("#txtFinishDateReceived").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtFinishDateReceived").val().trim()))
            , pSalesDateDelivered: (RoutingSuffix != "CustomsClearance" || $("#txtSalesDateDelivered").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtSalesDateDelivered").val().trim()))
            , pCommerceDateDelivered: (RoutingSuffix != "CustomsClearance" || $("#txtCommerceDateDelivered").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtCommerceDateDelivered").val().trim()))
            , pInspectionDateDelivered: (RoutingSuffix != "CustomsClearance" || $("#txtInspectionDateDelivered").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtInspectionDateDelivered").val().trim()))
            , pFinishDateDelivered: (RoutingSuffix != "CustomsClearance" || $("#txtFinishDateDelivered").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtFinishDateDelivered").val().trim()))

            , pRoadNumber: "0" //Insert is never main route
            , pDeliveryOrderNumber: "0" //Insert is never main route
            , pWareHouse: "0" //Insert is never main route
            , pWareHouseLocation: "0" //Insert is never main route


            , pIsOwnedByCompany: $("#cbIsOwnedByCompany").prop("checked")
            , pTrailerID: ($("#slTrailer" + RoutingSuffix).val() == "" ? 0 : $("#slTrailer" + RoutingSuffix).val()) //(!$("#cbIsOwnedByCompany").prop("checked") || $("#slTrailer" + RoutingSuffix).val() == "" ? 0 : $("#slTrailer" + RoutingSuffix).val())
            , pDriverID: (!$("#cbIsOwnedByCompany").prop("checked") || $("#slDriver" + RoutingSuffix).val() == "" ? 0 : $("#slDriver" + RoutingSuffix).val())
            , pDriverAssistantID: (!$("#cbIsOwnedByCompany").prop("checked") || $("#slDriverAssistant" + RoutingSuffix).val() == "" ? 0 : $("#slDriverAssistant" + RoutingSuffix).val())
            , pEquipmentID: $("#slEquipment" + RoutingSuffix).val() == "" ? 0 : $("#slEquipment" + RoutingSuffix).val()
            , pLoadingZoneID: $("#slRoutingsLoadingZone" + RoutingSuffix).val() == "" ? 0 : $("#slRoutingsLoadingZone" + RoutingSuffix).val()
            , pFirstCuringAreaID: $("#slRoutingsFirstCuringArea" + RoutingSuffix).val() == "" ? 0 : $("#slRoutingsFirstCuringArea" + RoutingSuffix).val()
            , pSecondCuringAreaID: $("#slRoutingsSecondCuringArea" + RoutingSuffix).val() == "" ? 0 : $("#slRoutingsSecondCuringArea" + RoutingSuffix).val()
            , pThirdCuringAreaID: $("#slRoutingsThirdCuringArea" + RoutingSuffix).val() == "" ? 0 : $("#slRoutingsThirdCuringArea" + RoutingSuffix).val()
            , pBillNumber: RoutingSuffix == "CustomsClearance" ? 0 : $("#txtBillNumber" + RoutingSuffix).val().trim().toUpperCase()
            , pTruckingOrderCode: ''
            , pTruckCounter: RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckCounter" + RoutingSuffix).val().trim() == "" ? 0 : $("#txtTruckCounter" + RoutingSuffix).val().trim()
            , pCargoReturnGrossWeight: RoutingSuffix == "CustomsClearance" ? 0 : $("#txtCargoReturnGrossWeight" + RoutingSuffix).val().trim() == "" ? 0 : $("#txtCargoReturnGrossWeight" + RoutingSuffix).val().trim()
            , pOffloadingDate: "01/01/1900"
            , pLastTruckCounter: RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckLastCounter" + RoutingSuffix).val().trim() == "" ? 0 : $("#txtTruckLastCounter" + RoutingSuffix).val().trim()
            , pMaxSupplierContainers: 0

            , pCCAllowTemporaryDelivered: "01/01/1900"
            , pCCAllowTemporaryReceived: "01/01/1900"
            , pCCDropBackDelivered: "01/01/1900"
            , pCCDropBackReceived: "01/01/1900"
            , pCC_ClearanceTypeID: 0
            , pCCReleaseNo: 0
        };
        CallPOSTFunctionWithParameters("/api/Routings/Insert", pParametersWithValues
            , function (pData) {
                var pSavedRoute = JSON.parse(pData[0]);
                var pRoutings = JSON.parse(pData[1]); //null not used 
                var pPayables = JSON.parse(pData[2]);
                Payables_BindTableRows(pPayables);
                // TruckingOrders_BindTableRows(pRoutings);
                //set lblRouting,..... incase of changing MainCarraige Type
                //if ($("#slRoutingTypes" + RoutingSuffix + " option:selected").val() == MainCarraigeRoutingTypeID) {
                //    $("#lblRouting" + RoutingSuffix).html(" : " + $("#slRoutingsPOL" + RoutingSuffix + " option:selected").text() + " > " + $("#slRoutingsPOD" + RoutingSuffix + " option:selected").text());
                //    $("#hPOLCountryID" + RoutingSuffix).val($('#slRoutingsPOLCountries' + RoutingSuffix + ' option:selected').val());
                //    $("#hPODCountryID" + RoutingSuffix).val($('#slRoutingsPODCountries' + RoutingSuffix + ' option:selected').val());
                //    $("#hPOL").val($('#slRoutingsPOL' + RoutingSuffix + ' option:selected').val());
                //    $("#hPOD").val($('#slRoutingsPOD' + RoutingSuffix + ' option:selected').val());
                //    $("#hShippingLineID").val($("#hRoutingTransportType" + RoutingSuffix).val() == OceanTransportType ? $('#slRoutingsLines' + RoutingSuffix + ' option:selected').val() : 0);
                //    $("#hAirlineID").val($("#hRoutingTransportType" + RoutingSuffix).val() == AirTransportType ? $("#slRoutingsLines" + RoutingSuffix).val() : 0);
                //    $("#hTruckerID").val($("#hRoutingTransportType" + RoutingSuffix).val() == InlandTransportType ? $("#slRoutingsLines" + RoutingSuffix).val() : 0);
                //}
                $("#hRoutingID" + RoutingSuffix).val(pSavedRoute.ID);
                $("#btnSaveRoutingTruckingOrder").attr("onclick", "Routings_Update(false);");
                if (RoutingSuffix != "CustomsClearance" && RoutingSuffix != "TruckingOrder")
                    jQuery("#" + "RoutingModal" + RoutingSuffix).modal("hide");
                $("#txtCodeTruckingOrder").val(pSavedRoute.TruckingOrderCode);
                $("#hID").val(pSavedRoute.ID);

                FadePageCover(false);
                TruckingOrders_LoadingWithPaging(true/*pCancelFadePageCover*/);

                swal("Success", "Saved successfully,");
            }
            , null);
    }
}
function Routings_Update(pSaveandAddNew) {
    debugger;

    let pTruckCounter = $("#txtTruckCounterTruckingOrder").val() == "" ? 999999999 : $("#txtTruckCounterTruckingOrder").val();
    let pLastTruckCounter = $("#txtLastTruckCounterTruckingOrder").val() == "" ? 0 : $("#txtLastTruckCounterTruckingOrder").val();

    if (RoutingSuffix != "CustomsClearance" && !Routings_CheckDatesLogic())
        swal(strSorry, strCheckDates);
    //uncomment if i want to remove logic date validation
    //else //check dates are not before open date
    //    if (!$("#cbIsImport").prop("checked") //No validation for import
    //        &&(
    //            ($("#txtExpectedDeparture").val().trim() != "" && Date.prototype.compareDates(ConvertDateFormat($("#txtOpenDate").val().trim()), ConvertDateFormat($("#txtExpectedDeparture").val().trim())) < 0)
    //            || ($("#txtActualDeparture").val().trim() != "" && Date.prototype.compareDates(ConvertDateFormat($("#txtOpenDate").val().trim()), ConvertDateFormat($("#txtActualDeparture").val().trim())) < 0)
    //            || ($("#txtExpectedArrival").val().trim() != "" && Date.prototype.compareDates(ConvertDateFormat($("#txtOpenDate").val().trim()), ConvertDateFormat($("#txtExpectedArrival").val().trim())) < 0)
    //            || ($("#txtActualArrival").val().trim() != "" && Date.prototype.compareDates(ConvertDateFormat($("#txtOpenDate").val().trim()), ConvertDateFormat($("#txtActualArrival").val().trim())) < 0)
    //            )
    //        )
    //        swal(strSorry, "Dates must be after open date.");
    else if (glbCallingControl == "FleetTransportOrder"
        && $("#slQuotationRoute option:selected").attr("EquipmentModelID") != undefined
        && $("#slQuotationRoute option:selected").attr("EquipmentModelID") != 0
        && $("#slEquipmentTruckingOrder option:selected").attr("EquipmentModelID") != undefined
        && $("#slEquipmentTruckingOrder option:selected").attr("EquipmentModelID") != 0
        && $("#slQuotationRoute option:selected").attr("EquipmentModelID") != $("#slEquipmentTruckingOrder option:selected").attr("EquipmentModelID")
    )
        swal("Sorry", "The equipment you chose is not the same model as the route contract.");
    //else if ((glbCallingControl == "TruckingOrdersOwnFleet")
    //        && pLastTruckCounter > pTruckCounter
    //        )
    //    swal("Sorry", "Check the kilometers.");
    else if (pDefaults.UnEditableCompanyName == "GBL" //Capital asked for that request then asked to cancel it
        && (glbCallingControl == "TruckingOrdersOwnFleet" || glbCallingControl == "FleetTransportOrder")
        && parseFloat(IsNull($("#txtTruckCounterTruckingOrder").val(), 99999999)) < parseFloat(IsNull($("#txtTruckLastCounterTruckingOrder").val(), 0))
    ) {
        swal("Sorry", "Please, check the kilometeres.");
    }
    else if ((glbCallingControl != "FleetTransportOrder" && glbCallingControl != "FleetTransportOrderSupplier")
        && ($("#slRoutingsLoadingZone" + RoutingSuffix).val() == null || $("#slRoutingsFirstCuringArea" + RoutingSuffix).val() == null
            || $("#slTruckingOrderGateInPort" + RoutingSuffix).val() == null
            || $("#slTruckingOrderGateOutPort" + RoutingSuffix).val() == null)
    ) {
        var ErrorMsg = '';
        if ($("#slRoutingsLoadingZone" + RoutingSuffix).val() == null)
            ErrorMsg = 'Choose Loading Zone ';
        if ($("#slRoutingsFirstCuringArea" + RoutingSuffix).val() == null)
            ErrorMsg = 'Choose First Curing Area ';
        if ($("#slTruckingOrderGateInPort" + RoutingSuffix).val() == null)
            ErrorMsg = 'Choose Gate In Port ';
        if ($("#slTruckingOrderGateOutPort" + RoutingSuffix).val() == null)
            ErrorMsg = 'Choose Gate Out Port ';

        swal(strSorry, ErrorMsg);
    }
    else if (ValidateForm("form", "RoutingModal" + RoutingSuffix)) {
        FadePageCover(true);
        var pParametersWithValues = {
            pID: $("#hRoutingID" + RoutingSuffix).val()
            , pOperationID: $("#hOperationID").val()
            , pRoutingTypeID: TruckingOrderRoutingTypeID //$('#slRoutingTypes' + RoutingSuffix + ' option:selected').val()
            , pTransportTypeID: InlandTransportType //$("#hRoutingTransportType" + RoutingSuffix).val()
            , pTransportIconName: InlandIconName //$("#hRoutingTransportIconName" + RoutingSuffix).val()
            , pTransportIconStyle: strInlandIconStyleClassName //$("#hRoutingTransportIconStyle" + RoutingSuffix).val()

            , pPOLCountryID: RoutingSuffix == "CustomsClearance" ? $("#hPOLCountryID").val() : $('#slRoutingsPOLCountries' + RoutingSuffix + ' option:selected').val()
            , pPODCountryID: RoutingSuffix == "CustomsClearance" ? $("#hPODCountryID").val() : $('#slRoutingsPODCountries' + RoutingSuffix + ' option:selected').val()
            , pPOLID: RoutingSuffix == "CustomsClearance" ? $("#hPOL").val() : $('#slRoutingsPOL' + RoutingSuffix + ' option:selected').val()
            , pPODID: RoutingSuffix == "CustomsClearance" ? $("#hPOL").val() : $('#slRoutingsPOD' + RoutingSuffix + ' option:selected').val()

            , pPickupAddress: $("#txtPickupAddress" + RoutingSuffix).val().trim() == "" ? "0" : $("#txtPickupAddress" + RoutingSuffix).val().trim().toUpperCase() //(RoutingSuffix == "CustomsClearance" || $("#txtPickupAddress" + RoutingSuffix).val().trim() == "" ? "0" : $("#txtPickupAddress" + RoutingSuffix).val().trim().toUpperCase())
            , pDeliveryAddress: 0 //(RoutingSuffix == "CustomsClearance" || $("#txtDeliveryAddress" + RoutingSuffix).val().trim() == "" ? "0" : $("#txtDeliveryAddress" + RoutingSuffix).val().trim().toUpperCase())

            , pETAPOLDate: (RoutingSuffix == "CustomsClearance" || $("#txtETAPOLDate" + RoutingSuffix).val() == "" || ($("#hBLType").val() == constHouseBLType && $("#slRoutingTypes" + RoutingSuffix).val() == MainCarraigeRoutingTypeID) ? "01/01/1900" : ConvertDateFormat($("#txtETAPOLDate" + RoutingSuffix).val()))
            , pATAPOLDate: (RoutingSuffix == "CustomsClearance" || $("#txtATAPOLDate" + RoutingSuffix).val() == "" || ($("#hBLType").val() == constHouseBLType && $("#slRoutingTypes" + RoutingSuffix).val() == MainCarraigeRoutingTypeID) ? "01/01/1900" : ConvertDateFormat($("#txtATAPOLDate" + RoutingSuffix).val()))
            , pExpectedArrival: (RoutingSuffix == "CustomsClearance" || $("#txtExpectedArrival" + RoutingSuffix).val() == "" || ($("#hBLType").val() == constHouseBLType && $("#slRoutingTypes" + RoutingSuffix).val() == MainCarraigeRoutingTypeID) ? "01/01/1900" : ConvertDateFormat($("#txtExpectedArrival" + RoutingSuffix).val()))
            , pExpectedDeparture: (RoutingSuffix == "CustomsClearance" || $("#txtExpectedDeparture" + RoutingSuffix).val() == "" || ($("#hBLType").val() == constHouseBLType && $("#slRoutingTypes" + RoutingSuffix).val() == MainCarraigeRoutingTypeID) ? "01/01/1900" : ConvertDateFormat($("#txtExpectedDeparture" + RoutingSuffix).val()))
            , pActualArrival: (RoutingSuffix == "CustomsClearance" || $("#txtActualArrival" + RoutingSuffix).val() == "" || ($("#hBLType").val() == constHouseBLType && $("#slRoutingTypes" + RoutingSuffix).val() == MainCarraigeRoutingTypeID) ? "01/01/1900" : ConvertDateFormat($("#txtActualArrival" + RoutingSuffix).val()))
            , pActualDeparture: (RoutingSuffix == "CustomsClearance" || $("#txtActualDeparture" + RoutingSuffix).val() == "" || ($("#hBLType").val() == constHouseBLType && $("#slRoutingTypes" + RoutingSuffix).val() == MainCarraigeRoutingTypeID) ? "01/01/1900" : ConvertDateFormat($("#txtActualDeparture" + RoutingSuffix).val()))

            , pShippingLineID: 0
            //(RoutingSuffix == "CustomsClearance")
            //? 0
            //: ($("#hRoutingTransportType" + RoutingSuffix).val() == OceanTransportType
            //    ? ($('#slRoutingsLines' + RoutingSuffix + ' option:selected').val() == "" || ($("#hBLType").val() == constHouseBLType && $("#slRoutingTypes" + RoutingSuffix).val() == MainCarraigeRoutingTypeID) ? 0 : $('#slRoutingsLines' + RoutingSuffix + ' option:selected').val())
            //    : 0)
            , pAirlineID: 0
            //(RoutingSuffix == "CustomsClearance")
            //? 0
            //: ($("#hRoutingTransportType" + RoutingSuffix).val() == AirTransportType
            //    ? ($('#slRoutingsLines' + RoutingSuffix + ' option:selected').val() == "" || ($("#hBLType").val() == constHouseBLType && $("#slRoutingTypes" + RoutingSuffix).val() == MainCarraigeRoutingTypeID) ? 0 : $('#slRoutingsLines' + RoutingSuffix + ' option:selected').val())
            //    : 0)
            , pTruckerID: ($('#slRoutingsLines' + RoutingSuffix + ' option:selected').val() == "" ? 0 : $('#slRoutingsLines' + RoutingSuffix + ' option:selected').val())
            //(RoutingSuffix == "CustomsClearance")
            //? ($('#slRoutingsLines' + RoutingSuffix + ' option:selected').val() == "" ? 0 : $('#slRoutingsLines' + RoutingSuffix + ' option:selected').val())
            //: ($("#hRoutingTransportType" + RoutingSuffix).val() == InlandTransportType
            //  ? (($('#slRoutingsLines' + RoutingSuffix + ' option:selected').val() == "" || ($("#hBLType").val() == constHouseBLType && $("#slRoutingTypes" + RoutingSuffix).val() == MainCarraigeRoutingTypeID)) ? 0 : $('#slRoutingsLines' + RoutingSuffix + ' option:selected').val())
            //  : 0)
            , pVesselID: (RoutingSuffix == "CustomsClearance")
                ? 0
                : ($("#hRoutingTransportType" + RoutingSuffix).val() == OceanTransportType
                    ? ($('#slRoutingVessels' + RoutingSuffix + ' option:selected').val() == "" ? 0 : $('#slRoutingVessels' + RoutingSuffix + ' option:selected').val())
                    : 0)
            , pVoyageOrTruckNumber: ($("#cbIsOwnedByCompany").prop("checked") || RoutingSuffix == "CustomsClearance" || $("#txtRoutingVoyageOrTruckNumber" + RoutingSuffix).val().trim() == "" ? "0" : $("#txtRoutingVoyageOrTruckNumber" + RoutingSuffix).val().trim().toUpperCase())
            , pTransientTime: RoutingSuffix == "CustomsClearance" || $("#txtRoutingTransientTime" + RoutingSuffix).val().trim() == "" ? 0 : $("#txtRoutingTransientTime" + RoutingSuffix).val()
            , pValidity: RoutingSuffix == "CustomsClearance" || $("#txtRoutingValidity" + RoutingSuffix).val().trim() == "" ? 0 : $("#txtRoutingValidity" + RoutingSuffix).val()
            , pFreeTime: RoutingSuffix == "CustomsClearance" || $("#txtRoutingFreeTime" + RoutingSuffix).val().trim() == "" ? 0 : $("#txtRoutingFreeTime" + RoutingSuffix).val()
            , pNotes: $("#txtRoutingNotes" + RoutingSuffix).val().trim().toUpperCase()
            , pBLType: $("#hBLType").val()
            , pMasterBL: RoutingSuffix == "CustomsClearance" ? 0 : Routings_GetMasterBL()
            , pBLDate: RoutingSuffix == "CustomsClearance" ? "01/01/1900" : Routings_GetpBLDate() // in the controller it will be saved just in case its Main And Not House
            , pMAWBSuffix: 0 //(RoutingSuffix == "CustomsClearance" || $("#txtMAWBSuffix" + RoutingSuffix).val().trim() == "" ? 0 : $("#txtMAWBSuffix" + RoutingSuffix).val().trim())
            , pNumberOfHousesConnected: 0 //$("#hNumberOfHousesConnected").val()//used in the controller to be compared to NumberOfHousesConnected retrieved from DB at time of save to handle other sessions changes

            , pGensetSupplierID: RoutingSuffix == "CustomsClearance" || $("#slTruckingOrderGensetSupplier" + RoutingSuffix).val() == "" ? 0 : $("#slTruckingOrderGensetSupplier" + RoutingSuffix).val()
            , pCCAID: $("#slRoutingCCA" + RoutingSuffix).val() == "" ? 0 : $("#slRoutingCCA" + RoutingSuffix).val()
            , pQuantity: RoutingSuffix == "CustomsClearance" || $("#txtTruckingOrderQuantity" + RoutingSuffix).val().trim() == "" ? 0 : $("#txtTruckingOrderQuantity" + RoutingSuffix).val().trim().toUpperCase()
            , pContactPerson: $("#txtTruckingOrderContactPerson" + RoutingSuffix).val().trim() == "" ? 0 : $("#txtTruckingOrderContactPerson" + RoutingSuffix).val().trim().toUpperCase()
            , pTruckingOrderPickupAddress: $("#txtPickupAddress" + RoutingSuffix).val().trim() == "" ? "0" : $("#txtPickupAddress" + RoutingSuffix).val().trim().toUpperCase() //RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckingOrderPickupAddress" + RoutingSuffix).val().trim().toUpperCase()
            , pTruckingOrderDeliveryAddress: RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckingOrderDeliveryAddress" + RoutingSuffix).val().trim().toUpperCase()
            , pGateInPortID: RoutingSuffix == "CustomsClearance" || $("#slTruckingOrderGateInPort" + RoutingSuffix).val().trim() == "" || $("#slTruckingOrderGateInPort" + RoutingSuffix).val() == null ? 0 : $("#slTruckingOrderGateInPort" + RoutingSuffix).val()
            , pGateOutPortID: RoutingSuffix == "CustomsClearance" || $("#slTruckingOrderGateOutPort" + RoutingSuffix).val().trim() == "" || $("#slTruckingOrderGateOutPort" + RoutingSuffix).val() == null ? 0 : $("#slTruckingOrderGateOutPort" + RoutingSuffix).val()
            , pGateInDate: (RoutingSuffix == "CustomsClearance" || $("#txtTruckingOrderGateInDate" + RoutingSuffix).val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTruckingOrderGateInDate" + RoutingSuffix).val()))
            /****************************TransportOrder**************************/
            , pCustomerID: $("#slCustomer").val() == "" ? 0 : $("#slCustomer").val()
            , pSubContractedCustomerID: 0
            , pCost: $("#txtCost").val() == "" ? 0 : $("#txtCost").val()
            , pSale: $("#txtSale").val() == "" ? 0 : $("#txtSale").val()
            , pIsFleet: (glbCallingControl == "FleetTransportOrder" || glbCallingControl == "FleetTransportOrderSupplier" ? true : false)
            , pCommodityID: $("#slCommodity").val() == "" ? 0 : $("#slCommodity").val()
            , pLoadingDate: ($("#txtLoadingDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtLoadingDate").val()))
            , pLoadingReference: $("#txtLoadingReference").val().trim() == "" ? 0 : $("#txtLoadingReference").val().trim().toUpperCase()
            , pUnloadingDate: ($("#txtUnloadingDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtUnloadingDate").val()))
            , pUnloadingReference: $("#txtUnloadingReference").val().trim() == "" ? 0 : $("#txtUnloadingReference").val().trim().toUpperCase()
            , pUnloadingTime: $("#txtUnloadingTime").val().trim() == "" ? 0 : $("#txtUnloadingTime").val().trim().toUpperCase()
            , pQuotationRouteID: $("#slQuotationRoute").val() == "" ? 0 : $("#slQuotationRoute").val()
            /****************************TransportOrder**************************/
            , pGateOutDate: (RoutingSuffix == "CustomsClearance" || $("#txtTruckingOrderGateOutDate" + RoutingSuffix).val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTruckingOrderGateOutDate" + RoutingSuffix).val()))
            , pStuffingDate: (RoutingSuffix == "CustomsClearance" || $("#txtTruckingOrderStuffingDate" + RoutingSuffix).val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTruckingOrderStuffingDate" + RoutingSuffix).val()))
            , pDeliveryDate: (RoutingSuffix == "CustomsClearance" || $("#txtTruckingOrderDeliveryDate" + RoutingSuffix).val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTruckingOrderDeliveryDate" + RoutingSuffix).val()))
            , pBookingNumber: RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckingOrderBookingNumber" + RoutingSuffix).val().trim().toUpperCase()
            , pDelays: RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckingOrderDelays" + RoutingSuffix).val().trim().toUpperCase()
            , pDriverName: ($("#cbIsOwnedByCompany").prop("checked") || RoutingSuffix == "CustomsClearance") ? 0 : $("#txtTruckingOrderDriverName" + RoutingSuffix).val().trim().toUpperCase()
            , pDriverPhones: ($("#cbIsOwnedByCompany").prop("checked") || RoutingSuffix == "CustomsClearance") ? 0 : $("#txtTruckingOrderDriverPhones" + RoutingSuffix).val().trim().toUpperCase()
            , pPowerFromGateInTillActualSailing: RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckingOrderPowerFromGateInTillActualSailing" + RoutingSuffix).val().trim().toUpperCase()

            , pContactPersonPhones: $("#txtTruckingOrderContactPersonPhones" + RoutingSuffix).val().trim() == "" ? 0 : $("#txtTruckingOrderContactPersonPhones" + RoutingSuffix).val().trim().toUpperCase()
            , pLoadingTime: RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckingOrderLoadingTime" + RoutingSuffix).val().trim().toUpperCase()

            , pCCAFreight: RoutingSuffix != "CustomsClearance" || $("#txtCCAFreight").val().trim() == "" ? 0 : $("#txtCCAFreight").val().trim().toUpperCase()
            , pCCAFOB: RoutingSuffix != "CustomsClearance" || $("#txtCCAFOB").val().trim() == "" ? 0 : $("#txtCCAFOB").val().trim().toUpperCase()
            , pCCACFValue: RoutingSuffix != "CustomsClearance" || $("#txtCCACFValue").val().trim() == "" ? 0 : $("#txtCCACFValue").val().trim().toUpperCase()
            , pCCAInvoiceNumber: RoutingSuffix != "CustomsClearance" || $("#txtCCAInvoiceNumber").val().trim() == "" ? 0 : $("#txtCCAInvoiceNumber").val().trim().toUpperCase()

            , pCCAInsurance: RoutingSuffix != "CustomsClearance" || $("#txtCCAInsurance").val().trim() == "" ? 0 : $("#txtCCAInsurance").val().trim().toUpperCase()
            , pCCADischargeValue: RoutingSuffix != "CustomsClearance" || $("#txtCCADischargeValue").val().trim() == "" ? 0 : $("#txtCCADischargeValue").val().trim().toUpperCase()
            , pCCAAcceptedValue: RoutingSuffix != "CustomsClearance" || $("#txtCCAAcceptedValue").val().trim() == "" ? 0 : $("#txtCCAAcceptedValue").val().trim().toUpperCase()
            , pCCAImportValue: RoutingSuffix != "CustomsClearance" || $("#txtCCAImportValue").val().trim() == "" ? 0 : $("#txtCCAImportValue").val().trim().toUpperCase()
            , pCCADocumentReceiveDate: (RoutingSuffix != "CustomsClearance" || $("#txtCCADocumentReceiveDate").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtCCADocumentReceiveDate").val().trim()))
            , pCCAExchangeRate: RoutingSuffix != "CustomsClearance" || $("#txtCCAExchangeRate").val().trim() == "" ? 0 : $("#txtCCAExchangeRate").val().trim().toUpperCase()
            , pCCAVATCertificateNumber: RoutingSuffix != "CustomsClearance" || $("#txtCCAVATCertificateNumber").val().trim() == "" ? 0 : $("#txtCCAVATCertificateNumber").val().trim().toUpperCase()
            , pCCAVATCertificateValue: RoutingSuffix != "CustomsClearance" || $("#txtCCAVATCertificateValue").val().trim() == "" ? 0 : $("#txtCCAVATCertificateValue").val().trim().toUpperCase()
            , pCCACommercialProfitCertificateNumber: RoutingSuffix != "CustomsClearance" || $("#txtCCACommercialProfitCertificateNumber").val().trim() == "" ? 0 : $("#txtCCACommercialProfitCertificateNumber").val().trim().toUpperCase()
            , pCCAWindowFees: RoutingSuffix != "CustomsClearance" || $("#txtCCAWindowFees").val().trim() == "" ? 0 : $("#txtCCAWindowFees").val().trim().toUpperCase()
            , pCCAStorageFees: RoutingSuffix != "CustomsClearance" || $("#txtCCAStorageFees").val().trim() == "" ? 0 : $("#txtCCAStorageFees").val().trim().toUpperCase()
            , pCCACommercialProfitTax: RoutingSuffix != "CustomsClearance" || $("#txtCCACommercialProfitTax").val().trim() == "" ? 0 : $("#txtCCACommercialProfitTax").val().trim().toUpperCase()
            , pCCACustomsValue: RoutingSuffix != "CustomsClearance" || $("#txtCCACustomsValue").val().trim() == "" ? 0 : $("#txtCCACustomsValue").val().trim().toUpperCase()
            , pCCAQuotedValue: RoutingSuffix != "CustomsClearance" || $("#txtCCAQuotedValue").val().trim() == "" ? 0 : $("#txtCCAQuotedValue").val().trim().toUpperCase()
            , pCCAContractType: RoutingSuffix != "CustomsClearance" || $("#txtCCAContractType").val().trim() == "" ? 0 : $("#txtCCAContractType").val().trim().toUpperCase()
            , pCCAOthers: RoutingSuffix != "CustomsClearance" || $("#txtCCAOthers").val().trim() == "" ? 0 : $("#txtCCAOthers").val().trim().toUpperCase()
            , pCCASpendDate: (RoutingSuffix != "CustomsClearance" || $("#txtCCASpendDate").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtCCASpendDate").val().trim()))

            , pCertificateNumber: RoutingSuffix != "CustomsClearance" || $("#txtCertificateNumber").val().trim() == "" ? 0 : $("#txtCertificateNumber").val().trim().toUpperCase()
            , pCertificateValue: RoutingSuffix != "CustomsClearance" || $("#txtCertificateValue").val().trim() == "" ? 0 : $("#txtCertificateValue").val().trim().toUpperCase()
            , pCertificateDate: (RoutingSuffix != "CustomsClearance" || $("#txtCertificateDate").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtCertificateDate").val().trim()))
            , pQasimaNumber: RoutingSuffix != "CustomsClearance" || $("#txtQasimaNumber").val().trim() == "" ? 0 : $("#txtQasimaNumber").val().trim().toUpperCase()
            , pQasimaDate: (RoutingSuffix != "CustomsClearance" || $("#txtQasimaDate").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtQasimaDate").val().trim()))
            , pSalesDateReceived: (RoutingSuffix != "CustomsClearance" || $("#txtSalesDateReceived").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtSalesDateReceived").val().trim()))
            , pCommerceDateReceived: (RoutingSuffix != "CustomsClearance" || $("#txtCommerceDateReceived").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtCommerceDateReceived").val().trim()))
            , pInspectionDateReceived: (RoutingSuffix != "CustomsClearance" || $("#txtInspectionDateReceived").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtInspectionDateReceived").val().trim()))
            , pFinishDateReceived: (RoutingSuffix != "CustomsClearance" || $("#txtFinishDateReceived").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtFinishDateReceived").val().trim()))
            , pSalesDateDelivered: (RoutingSuffix != "CustomsClearance" || $("#txtSalesDateDelivered").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtSalesDateDelivered").val().trim()))
            , pCommerceDateDelivered: (RoutingSuffix != "CustomsClearance" || $("#txtCommerceDateDelivered").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtCommerceDateDelivered").val().trim()))
            , pInspectionDateDelivered: (RoutingSuffix != "CustomsClearance" || $("#txtInspectionDateDelivered").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtInspectionDateDelivered").val().trim()))
            , pFinishDateDelivered: (RoutingSuffix != "CustomsClearance" || $("#txtFinishDateDelivered").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtFinishDateDelivered").val().trim()))

            , pRoadNumber: (RoutingSuffix != "" || $("#txtRoutingRoadNumber" + RoutingSuffix).val().trim() == "" ? "0" : $("#txtRoutingRoadNumber").val().trim().toUpperCase())
            , pDeliveryOrderNumber: (RoutingSuffix != "" || $("#txtRoutingDeliveryOrderNumber" + RoutingSuffix).val().trim() == "" ? "0" : $("#txtRoutingDeliveryOrderNumber").val().trim().toUpperCase())
            , pWareHouse: (RoutingSuffix != "" || $("#txtRoutingWareHouse" + RoutingSuffix).val().trim() == "" ? "0" : $("#txtRoutingWareHouse").val().trim().toUpperCase())
            , pWareHouseLocation: (RoutingSuffix != "" || $("#txtRoutingWareHouseLocation" + RoutingSuffix).val().trim() == "" ? "0" : $("#txtRoutingWareHouseLocation").val().trim().toUpperCase())

            , pIsOwnedByCompany: $("#cbIsOwnedByCompany").prop("checked")
            , pTrailerID: ($("#slTrailer" + RoutingSuffix).val() == "" ? 0 : $("#slTrailer" + RoutingSuffix).val()) //(!$("#cbIsOwnedByCompany").prop("checked") || $("#slTrailer" + RoutingSuffix).val() == "" ? 0 : $("#slTrailer" + RoutingSuffix).val())
            , pDriverID: (!$("#cbIsOwnedByCompany").prop("checked") || $("#slDriver" + RoutingSuffix).val() == "" ? 0 : $("#slDriver" + RoutingSuffix).val())
            , pDriverAssistantID: (!$("#cbIsOwnedByCompany").prop("checked") || $("#slDriverAssistant" + RoutingSuffix).val() == "" ? 0 : $("#slDriverAssistant" + RoutingSuffix).val())
            , pEquipmentID: $("#slEquipment" + RoutingSuffix).val() == "" ? 0 : $("#slEquipment" + RoutingSuffix).val()
            , pLoadingZoneID: $("#slRoutingsLoadingZone" + RoutingSuffix).val() == "" ? 0 : $("#slRoutingsLoadingZone" + RoutingSuffix).val()
            , pFirstCuringAreaID: $("#slRoutingsFirstCuringArea" + RoutingSuffix).val() == "" ? 0 : $("#slRoutingsFirstCuringArea" + RoutingSuffix).val()
            , pSecondCuringAreaID: $("#slRoutingsSecondCuringArea" + RoutingSuffix).val() == "" ? 0 : $("#slRoutingsSecondCuringArea" + RoutingSuffix).val()
            , pThirdCuringAreaID: $("#slRoutingsThirdCuringArea" + RoutingSuffix).val() == "" ? 0 : $("#slRoutingsThirdCuringArea" + RoutingSuffix).val()
            , pBillNumber: RoutingSuffix == "CustomsClearance" ? 0 : $("#txtBillNumber" + RoutingSuffix).val().trim().toUpperCase()
            , pTruckingOrderCode: $("#txtCodeTruckingOrder").val().trim() == "" ? "0" : $("#txtCodeTruckingOrder").val().trim().toUpperCase()
            , pTruckCounter: RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckCounter" + RoutingSuffix).val().trim() == "" ? 0 : $("#txtTruckCounter" + RoutingSuffix).val().trim()
            , pCargoReturnGrossWeight: RoutingSuffix == "CustomsClearance" ? 0 : $("#txtCargoReturnGrossWeight" + RoutingSuffix).val().trim() == "" ? 0 : $("#txtCargoReturnGrossWeight" + RoutingSuffix).val().trim()
            , pOffloadingDate: "01/01/1900"
            , pLastTruckCounter: RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckLastCounter" + RoutingSuffix).val().trim() == "" ? 0 : $("#txtTruckLastCounter" + RoutingSuffix).val().trim()
            , pMaxSupplierContainers: 0

            , pCCAllowTemporaryDelivered: "01/01/1900"
            , pCCAllowTemporaryReceived: "01/01/1900"
            , pCCDropBackDelivered: "01/01/1900"
            , pCCDropBackReceived: "01/01/1900"
            , pCC_ClearanceTypeID: 0
            , pCCReleaseNo: 0
        };
        if (pDefaults.UnEditableCompanyName == 'SEA')
        {
            pParametersWithValues.pQuantity = $('.getValueSEA').val();

            }
        CallPOSTFunctionWithParameters("/api/Routings/Update", pParametersWithValues
            , function (pData) {
                var pSavedRoute = JSON.parse(pData[2]);
                var pRoutings = JSON.parse(pData[3]); //null not used 
                if (pData[1] != "") //pData[1]: is a message returned from controller in case of change in another session that prevents saving main route
                    swal(strSorry, pData[1]);
                else {
                    $('#btn-PrintTruckingOrder').prop('disabled', false);
                    //TruckingOrders_LoadingWithPaging();
                    //TruckingOrders_BindTableRows(pRoutings);
                    //set lblRouting,..... incase of changing MainCarraige Type
                    //if ($("#slRoutingTypes" + RoutingSuffix + " option:selected").val() == MainCarraigeRoutingTypeID) {

                    //    $("#lblRouting" + RoutingSuffix).html(" : " + $("#slRoutingsPOL" + RoutingSuffix + " option:selected").text().substring(0, 5) + " > " + $("#slRoutingsPOD" + RoutingSuffix + " option:selected").text().substring(0, 5));
                    //    if ($("#hBLType").val() != constHouseBLType) {
                    //        var x = Routings_GetMasterBL();
                    //        $("#lblMaster").html(" :" + (x == 0 ? "N/A" : x));
                    //        $("#hMasterBL").val(x);
                    //    }
                    //    $("#hPOLCountryID").val($('#slRoutingsPOLCountries' + RoutingSuffix + ' option:selected').val());
                    //    $("#hPODCountryID").val($('#slRoutingsPODCountries' + RoutingSuffix + ' option:selected').val());
                    //    $("#hPOL").val($('#slRoutingsPOL' + RoutingSuffix + ' option:selected').val());
                    //    $("#hPOD").val($('#slRoutingsPOD' + RoutingSuffix + ' option:selected').val());

                    //    $("#hPickupAddress").val($('#txtPickupAddress' + RoutingSuffix).val().trim().toUpperCase());
                    //    $("#hDeliveryAddress").val($('#txtDeliveryAddress' + RoutingSuffix).val().trim().toUpperCase());

                    //    $("#hShippingLineID").val($("#hRoutingTransportType" + RoutingSuffix).val() == OceanTransportType ? $('#slRoutingsLines' + RoutingSuffix + ' option:selected').val() : 0);
                    //    $("#hAirlineID").val($("#hRoutingTransportType" + RoutingSuffix).val() == AirTransportType ? $("#slRoutingsLines" + RoutingSuffix).val() : 0);
                    //    $("#hTruckerID").val($("#hRoutingTransportType" + RoutingSuffix).val() == InlandTransportType ? $("#slRoutingsLines" + RoutingSuffix).val() : 0);

                    //    if ($("#hBLType").val() != constHouseBLType && $("#hTransportType").val() == AirTransportType) {//not house and air,(i am sure its main isa)
                    //        $("#hMAWBSuffix").val($("#txtMAWBSuffix" + RoutingSuffix).val().trim() == "" ? 0 : $("#txtMAWBSuffix" + RoutingSuffix).val().trim());
                    //        $("#hBLDate").val($("#txtMAWBDate" + RoutingSuffix).val().trim() == "" ? "01/01/1900" : $("#txtMAWBDate" + RoutingSuffix).val().trim());
                    //    }
                    //    if ($("#hBLType").val() != constHouseBLType && $("#hTransportType").val() != AirTransportType) {//not house and bot aie,(i am sure its main isa)
                    //        $("#hBLDate").val($("#txtOBLDate" + RoutingSuffix).val().trim() == "" ? "01/01/1900" : $("#txtOBLDate" + RoutingSuffix).val().trim());
                    //    }
                    //    //if ($("#hBLType").val() != constHouseBLType)
                    //    //    $("#hMasterBL").val(Routings_GetMasterBL());
                    //    //in the next condition, its already MainRoute Type
                    //    if ($("#hBLType").val() == constMasterBLType) //if its Master then i need to Reload Shipments for the case its a MainRoute
                    //        Shipments_LoadAvailableShipments();
                    //}
                    $("#hRoutingID" + RoutingSuffix).val(pSavedRoute.ID);
                    //if (RoutingSuffix != "CustomsClearance")
                    //    jQuery("#" + "RoutingModal" + RoutingSuffix).modal("hide");

                    if (glbCallingControl != "FleetTransportOrder" && glbCallingControl != "FleetTransportOrderSupplier") {
                        var pIDList = "";
                        var pSNList = "";
                        var pIssueDateList = "";
                        var pSLList = "";
                        var pBookingNoList = "";
                        var pPORTList = "";
                        var pWHList = "";
                        var pSizeList = "";
                        var pContainerNOList = "";
                        var pDriverNameList = "";
                        var pPhoneList = "";
                        var pTruckNoList = "";
                        var pLocationList = "";
                        var pSealNoList = "";
                        var pReleaseDateList = "";
                        var pArrivalDateList = "";
                        var pReturnDateList = "";
                        var pPort2List = "";
                        var pStatusNameList = "";
                        var pTruckerList = "";
                        var pTypeNameList = "";
                        var pNotesList = "";
                        var pTareWeightList = "";
                        var pNetWeightList = "";
                        var pGrossWeightList = "";

                        var pOperationNOList = "";
                        var pFactoryList = "";
                        var pCustomLOCList = "";
                        var pTruckWeightList = "";
                        var pFactoryGateOutList = "";
                        var pPODList = "";
                        var pInvoiceList = "";

                        var pFGODateList = "";

                        var pReleaseTimeList = "";
                        var pArrivalTimeList = "";
                        var pReturnTimeList = "";
                        var pFGOTimeList = "";


                        /*****************************Collecting Details Data*************************************/
                        var pDetailsIDList = GetAllIDsAsStringWithNameAttr("tblDetails", "Delete");
                        var pDetailsID = '';
                        debugger;
                        $("#tblDetails tbody tr").each(function () {
                            pDetailsID += ((pDetailsID == "") ? "" : ",") + ($(this).attr('ID'));
                        });

                        if (pDetailsIDList != "") {
                            var NumberOfDetailsRows = pDetailsIDList.split(',').length;
                            for (var i = 0; i < NumberOfDetailsRows; i++) {
                                var currentRowID = pDetailsID.split(",")[i];

                                pIDList += ((pIDList == "") ? "" : ",") + pDetailsIDList.split(",")[i];
                                pSNList += ((pSNList == "") ? "" : ",") + ($("#txtSN" + currentRowID).val().trim() == "" ? "0" : $("#txtSN" + currentRowID).val());
                                pIssueDateList += ((pIssueDateList == "") ? "" : ",") + ($("#txtIssueDate" + currentRowID).val().trim() != "" ? ConvertDateFormat($("#txtIssueDate" + currentRowID).val()) : "0");

                                pSLList += ((pSLList == "") ? "" : ",") + $("#txtSL" + currentRowID).val();
                                pBookingNoList += ((pBookingNoList == "") ? "" : ",") + $("#txtBookingNo" + currentRowID).val();
                                pPORTList += ((pPORTList == "") ? "" : ",") + $("#txtPORT" + currentRowID).val();
                                pWHList += ((pWHList == "") ? "" : ",") + $("#txtWH" + currentRowID).val();
                                pSizeList += ((pSizeList == "") ? "" : ",") + $("#txtSize" + currentRowID).val();
                                pContainerNOList += ((pContainerNOList == "") ? "" : ",") + $("#txtContainerNO" + currentRowID).val();
                                pDriverNameList += ((pDriverNameList == "") ? "" : ",") + $("#txtDriverName" + currentRowID).val();
                                pPhoneList += ((pPhoneList == "") ? "" : ",") + $("#txtPhone" + currentRowID).val();
                                pTruckNoList += ((pTruckNoList == "") ? "" : ",") + $("#txtTruckNo" + currentRowID).val();
                                pLocationList += ((pLocationList == "") ? "" : ",") + $("#txtLocation" + currentRowID).val();
                                pSealNoList += ((pSealNoList == "") ? "" : ",") + $("#txtSealNo" + currentRowID).val();
                                pReleaseDateList += ((pReleaseDateList == "") ? "" : ",") + ($("#txtReleaseDate" + currentRowID).val().trim() != "" ? ConvertDateFormat($("#txtReleaseDate" + currentRowID).val()) : "0");
                                pArrivalDateList += ((pArrivalDateList == "") ? "" : ",") + ($("#txtArrivalDate" + currentRowID).val().trim() != "" ? ConvertDateFormat($("#txtArrivalDate" + currentRowID).val()) : "0");
                                pReturnDateList += ((pReturnDateList == "") ? "" : ",") + ($("#txtReturnDate" + currentRowID).val().trim() != "" ? ConvertDateFormat($("#txtReturnDate" + currentRowID).val()) : "0");
                                pPort2List += ((pPort2List == "") ? "" : ",") + $("#txtPort2" + currentRowID).val();
                                pStatusNameList += ((pStatusNameList == "") ? "" : ",") + $("#txtStatusName" + currentRowID).val();
                                pTruckerList += ((pTruckerList == "") ? "" : ",") + $("#txtTrucker" + currentRowID).val();
                                pTypeNameList += ((pTypeNameList == "") ? "" : ",") + $("#txtTypeName" + currentRowID).val();
                                pNotesList += ((pNotesList == "") ? "" : ",") + $("#txtNotes" + currentRowID).val();
                                pTareWeightList += ((pTareWeightList == "") ? "" : ",") + ($("#txtTareWeight" + currentRowID).val() == "" ? 0 : $("#txtTareWeight" + currentRowID).val());
                                pNetWeightList += ((pNetWeightList == "") ? "" : ",") + ($("#txtNetWeight" + currentRowID).val() == "" ? 0 : $("#txtNetWeight" + currentRowID).val());
                                pGrossWeightList += ((pGrossWeightList == "") ? "" : ",") + ($("#txtGrossWeight" + currentRowID).val() == "" ? 0 : $("#txtGrossWeight" + currentRowID).val());

                                pOperationNOList += ((pOperationNOList == "") ? "" : ",") + $("#txtOperationNO" + currentRowID).val();
                                pFactoryList += ((pFactoryList == "") ? "" : ",") + $("#txtFactory" + currentRowID).val();
                                pCustomLOCList += ((pCustomLOCList == "") ? "" : ",") + $("#txtCustomLOC" + currentRowID).val();
                                pTruckWeightList += ((pTruckWeightList == "") ? "" : ",") + $("#txtTruckWeight" + currentRowID).val();
                                pFactoryGateOutList += ((pFactoryGateOutList == "") ? "" : ",") + $("#txtFactoryGateOut" + currentRowID).val();
                                pPODList += ((pPODList == "") ? "" : ",") + $("#txtPOD" + currentRowID).val();
                                pInvoiceList += ((pInvoiceList == "") ? "" : ",") + $("#txtInvoice" + currentRowID).val();

                                pFGODateList += ((pFGODateList == "") ? "" : ",") + ($("#txtFGODate" + currentRowID).val().trim() != "" ? ConvertDateFormat($("#txtFGODate" + currentRowID).val()) : "0");

                                pReleaseTimeList += ((pReleaseTimeList == "") ? "" : ",") + ($("#txtReleaseTime" + currentRowID).val().trim() == "" ? "0" : $("#txtReleaseTime" + currentRowID).val());
                                pArrivalTimeList += ((pArrivalTimeList == "") ? "" : ",") + ($("#txtArrivalTime" + currentRowID).val().trim() == "" ? "0" : $("#txtArrivalTime" + currentRowID).val());
                                pReturnTimeList += ((pReturnTimeList == "") ? "" : ",") + ($("#txtReturnTime" + currentRowID).val().trim() == "" ? "0" : $("#txtReturnTime" + currentRowID).val());
                                pFGOTimeList += ((pFGOTimeList == "") ? "" : ",") + ($("#txtFGOTime" + currentRowID).val().trim() == "" ? "0" : $("#txtFGOTime" + currentRowID).val());

                            }
                        }
                        var pParametersWithValues = {
                            //Details
                            pRoutingID: pSavedRoute.ID
                            , pIDList
                            , pSNList: pSNList
                            , pIssueDateList: pIssueDateList
                            , pSLList: pSLList
                            , pBookingNoList: pBookingNoList
                            , pPORTList: pPORTList
                            , pWHList: pWHList
                            , pSizeList: pSizeList
                            , pContainerNOList: pContainerNOList
                            , pDriverNameList: pDriverNameList
                            , pPhoneList: pPhoneList
                            , pTruckNoList: pTruckNoList
                            , pLocationList: pLocationList
                            , pSealNoList: pSealNoList
                            , pReleaseDateList: pReleaseDateList
                            , pArrivalDateList: pArrivalDateList
                            , pReturnDateList: pReturnDateList
                            , pPort2List: pPort2List
                            , pStatusNameList: pStatusNameList
                            , pTruckerList: pTruckerList
                            , pTypeNameList: pTypeNameList
                            , pNotesList: pNotesList
                            , pTareWeightList: pTareWeightList
                            , pNetWeightList: pNetWeightList
                            , pGrossWeightList: pGrossWeightList

                            , pOperationNOList: pOperationNOList
                            , pFactoryList: pFactoryList
                            , pCustomLOCList: pCustomLOCList
                            , pTruckWeightList: pTruckWeightList
                            , pFactoryGateOutList: pFactoryGateOutList
                            , pPODList: pPODList
                            , pInvoiceList: pInvoiceList

                            , pFGODateList: pFGODateList

                            , pReleaseTimeList: pReleaseTimeList
                            , pArrivalTimeList: pArrivalTimeList
                            , pReturnTimeList: pReturnTimeList
                            , pFGOTimeList: pFGOTimeList

                        };
                        CallPOSTFunctionWithParameters("/api/TruckingOrders/SaveContainers", pParametersWithValues
                            , function (pData) {
                                if (pData[0] != "") //pData[1]: is a message returned from controller in case of change in another session that prevents saving main route
                                    swal(strSorry, pData[0]);
                                else
                                    CallGETFunctionWithParameters("/api/TruckingOrders/LoadAllContainers"
                                        , {
                                            pWhereClause: "WHERE TruckingOrderID=" + $("#hID").val()
                                            , pOrderBy: "ID"
                                        }
                                        , function (pData) {
                                            Details_BindTableRows(JSON.parse(pData[0]));
                                            FadePageCover(false);
                                        }
                                        , null);
                            }, null);



                    } //if (glbCallingControl != "FleetTransportOrder" && glbCallingControl != "FleetTransportOrderSupplier") {
                    TruckingOrders_LoadingWithPaging(true/*pCancelFadePageCover*/);
                }
                FadePageCover(false);
                //debugger;
                //if ($("#hBLType").val() == constMasterBLType) {
                //    SwitchToOperationsEditView($("#hOperationID").val());
                //    ActivateRoutingsTab();
                //}
            }, null);
    }
}
function Routings_EditByDblClick(pID) {
    debugger;
    FadePageCover(true);
    var tr = $("#tblRoutings tr[ID='" + pID + "']");
    if ($(tr).find("td.RoutingType").attr("val") == MainCarraigeRoutingTypeID)
        RoutingSuffix = "";
    else if ($(tr).find("td.RoutingType").attr("val") == TruckingOrderRoutingTypeID)
        RoutingSuffix = "TruckingOrder";
    else if ($(tr).find("td.RoutingType").attr("val") == CustomsClearanceRoutingTypeID)
        RoutingSuffix = "CustomsClearance";

    if (pDefaults.UnEditableCompanyName != "ELC") {
        $('#btn-PrintTruckingOrder').prop('disabled', true);
    } else {
        $('#btn-PrintTruckingOrder').prop('disabled', false);
    }
    if (pDefaults.UnEditableCompanyName == "SEA")
    {
        $("#txtBillNumberTruckingOrder").parent().find("label").text("عدد النقلات");
        $(".ChangeLabelSEA").text("الكمية");

    }
    jQuery("#RoutingModal" + RoutingSuffix).modal("show");
    Routings_FillControls(pID);

}
function Routings_DeleteList(callback) {
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblRoutings') != "")
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
                DeleteListFunction("/api/Routings/Delete"
                    , { "pRoutingsIDs": GetAllSelectedIDsAsString('tblRoutings') }
                    , function () {
                        TruckingOrders_LoadingWithPaging();
                    });
            });
}
function Routings_ApproveList(pIsApprove) {
    debugger;
    var pRoutingsIDs = GetAllSelectedIDsAsString('tblRoutings');
    if (pRoutingsIDs != "")
        swal({
            title: "Are you sure?",
            text: "This will apply to all selected records.",
            type: "",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Apply",
            closeOnConfirm: true
        },
            function () {
                FadePageCover(true);
                CallGETFunctionWithParameters("/api/TruckingOrders/Approve"
                    , { "pRoutingsIDs": pRoutingsIDs, "pIsApprove": pIsApprove }
                    , function (pData) {
                        if (pData) {

                            var pTruckingOrderCode = "";

                            $('#tblRoutings  > tbody > tr').each(function () {

                                if ($(this).find('input[name="Delete"]:checked').length > 0) {
                                    pTruckingOrderCode += $(this).find('td.TruckingOrderCode').text() + " (" + $(this).find('td.OperationCode').text() + ")" + " (" + $(this).find('td.ClientName').text() + ")" + " - ";
                                }
                            });

                            swal("Success", "Saved successfully.");
                            TruckingOrders_LoadingWithPaging();

                            if (pIsApprove == 1) {
                                var pSubject = "Service Done For Trucking Orders";
                                var pBody = ("Service Done For Trucking Orders : " + pTruckingOrderCode.slice(0, -2));

                                Receptionists_GetAvailableUsers("WHERE DepartmentName in('ACCOUNTING','PAYABLE') ORDER BY Name");
                                $("#btnCheckboxesListApply").attr("onclick", "SendNormalAndLocalEmail('" + pSubject + "','" + pBody + "',0,false);");
                                $("#btnCheckboxesListApply").html("<span class='glyphicon glyphicon-send'></span> Send");
                            }
                        }
                        else
                            swal("Sorry", "Action failed.");
                    });
            });
}
function Routings_RequestApproval(callback) {
    debugger;
    var pRoutingsIDs = GetAllSelectedIDsAsString('tblRoutings');
    if (pRoutingsIDs == "")
        swal("Sorry", "Please, select orders.");
    else {
        var pTruckingOrderCode = "";

        $('#tblRoutings  > tbody > tr').each(function () {

            if ($(this).find('input[name="Delete"]:checked').length > 0) {
                pTruckingOrderCode += $(this).find('td.TruckingOrderCode').text() + " (" + ($(this).find('td.OperationCode').text() == 0 ? "Distribution" : $(this).find('td.OperationCode').text()) + ")" + " - ";
            }
        });

        var pSubject = "Approval request for trucking orders.";
        var pBody = "Please, Approve trucking Orders " + pTruckingOrderCode.slice(0, -2);


        CallGETFunctionWithParameters("/api/TruckingOrders/RequestApproval",
            {
                pTruckingOrderIDs: pRoutingsIDs
            }
            , function (pData) {

                pBody += pData[0];

                //FadePageCover(false);
            }
            , function () {

                Receptionists_GetAvailableUsers("WHERE DepartmentName in('ACCOUNTING','PAYABLE','TRANSPORTATION','TRANSPORTATION HEAD') ORDER BY Name");
                $("#btnCheckboxesListApply").attr("onclick", "SendNormalAndLocalEmail('" + pSubject + "','" + pBody + "',0,false);");
                $("#btnCheckboxesListApply").html("<span class='glyphicon glyphicon-send'></span> Send");

            });




    }
}
function Routings_ClearAllControls(pRoutingTypeName) {
    debugger;
    if (pDefaults.UnEditableCompanyName == "ELI")
        $(".classShowForELI").removeClass("hide");
    $(".classDisableForApproved").removeAttr("disabled");
    if (pRoutingTypeName == "CustomsClearance" && $("#tblRoutings tbody td.RoutingType[val=" + CustomsClearanceRoutingTypeID + "]").length > 0)
        swal("Sorry", "The operation can have just one customs clearance record.");
    else {
        if (pRoutingTypeName == "CustomsClearance") {
            jQuery("#RoutingModalCustomsClearance").modal("show");
        }
        ClearAll("#RoutingModalTruckingOrder"); //i want it cleared in all cases to use trucking control names
        if (pRoutingTypeName == "" || pRoutingTypeName == undefined)
            RoutingSuffix == "";
        else
            RoutingSuffix = pRoutingTypeName;
        if (pRoutingTypeName != "TruckingOrder") //otherwise then the modal is already cleared up
            ClearAll("#RoutingModal" + RoutingSuffix);
        //set to default values
        //$("#cbIsOceanRouting"+RoutingSuffix).prop('checked', true);
        $("#cbIsInlandRouting" + RoutingSuffix).prop('checked', true);
        $("#txtPickupAddress" + RoutingSuffix).val($("#hPickupAddress").val());
        $("#txtDeliveryAddress" + RoutingSuffix).val($("#hDeliveryAddress").val());
        $("#slTruckingOrderGateInPort" + RoutingSuffix).val("");
        $("#slTruckingOrderGateOutPort" + RoutingSuffix).val("");
        $("#txtBillNumber" + RoutingSuffix).val("");
        $("#txtCargoReturnGrossWeight" + RoutingSuffix).val("0");
        $("#txtTruckCounter" + RoutingSuffix).val("0");
        $('#slRoutingsLinesTruckingOrder').val("0");

        //GetListWithNameAndWhereClause(null, "/api/Suppliers/LoadAll", "<--Select-->", "slTruckingOrderGensetSupplier" + RoutingSuffix, "ORDER BY Name", null);
        //GetListWithNameAndWhereClause(null, "/api/CustomsClearanceAgents/LoadAll", "<--Select-->", "slRoutingCCA" + RoutingSuffix, "ORDER BY Name", null);
        Routings_ShowHideOwnedByCompanyProperties(false);
        if (RoutingSuffix == "TruckingOrder") {
            $("#txtTruckingOrderPickupAddressTruckingOrder").val($("#hClientAddress").val());
            GetListWithNameAndWhereClause(null
                , "/api/Suppliers/LoadAll"
                , TranslateString("SelectFromMenu"), "slTruckingOrderGensetSupplier" + RoutingSuffix
                , "WHERE ID IN (SELECT PartnerID FROM vwOperationPartners WHERE PartnerTypeID=" + constSupplierPartnerTypeID + " AND OperationID=" + $("#hOperationID").val() + ") ORDER BY Name"
                , null);
        }
        else {//not TruckingOrder so i don't need to add GensetSuppliers
            $("#slTruckingOrderGensetSupplier" + RoutingSuffix).html("<option value=''><--Select--></option>");
        }
        GetListWithNameAndWhereClause(null
            , "/api/CustomsClearanceAgents/LoadAll"
            , TranslateString("SelectFromMenu"), "slRoutingCCA" + RoutingSuffix
            , "WHERE ID IN (SELECT PartnerID FROM vwOperationPartners WHERE PartnerTypeID=" + constCustomsClearanceAgentPartnerTypeID + " AND OperationID=" + $("#hOperationID").val() + ") ORDER BY Name"
            , null);

        Routings_ShowHideTruckingOrderFields(true);
        Routings_TransportType_SetIconNameAndStyle();
        Routings_EnableCbTransportType();

        //fill select boxes
        //RoutingTypes_GetList(RoutingSuffix == "TruckingOrder" ? TruckingOrderRoutingTypeID : CustomsClearanceRoutingTypeID, null);
        if (RoutingSuffix == "")
            $("#slRoutingTypes" + RoutingSuffix).html('<option value="' + MainCarraigeRoutingTypeID + '">MAIN CARRAIGE</option>');
        else if (RoutingSuffix == "TruckingOrder")
            $("#slRoutingTypes" + RoutingSuffix).html('<option value="' + TruckingOrderRoutingTypeID + '">TRUCKING ORDER</option>');
        else if (RoutingSuffix == "CustomsClearance")
            $("#slRoutingTypes" + RoutingSuffix).html('<option value="' + CustomsClearanceRoutingTypeID + '">Customs Clearance</option>');

        Routings_Countries_GetList($("#hDefaultCountryID").val(), $("#hDefaultCountryID").val(), null);//Routings_Countries_GetList(null, null, null);
        Routings_Ports_GetList(null, $("#hDefaultCountryID").val(), 1, function () { $("#slRoutingsPOL" + RoutingSuffix).val($("#slRoutingsPOL" + RoutingSuffix + " option:contains(EG000)").val()); }); //Routings_Ports_GetList(null, null, 1);
        Routings_Ports_GetList(null, $("#hDefaultCountryID").val(), 2, function () { $("#slRoutingsPOD" + RoutingSuffix).val($("#slRoutingsPOD" + RoutingSuffix + " option:contains(EG000)").val()); }); //Routings_Ports_GetList(null, null, 2);
        Routings_Lines_GetList(null, function () {
            if ($("#hRoutingTransportType" + RoutingSuffix).val() == OceanTransportType)
                Routings_Vessels_GetList(null, null, "slRoutingVessels" + RoutingSuffix, null);
            else
                $("#slRoutingVessels" + RoutingSuffix).val("");
        });
        Routings_EnableControlsForNewAdd();
        Routings_HideMasterBL(); //I am sure its not main routing(coz main routing cant be deleted)
        Routings_ShowHideVessels();
        Routings_ShowHidePickupAndDeliveryAddress(false); //false: coz it will never be main route
        //Operation_cbPickupOrDeliveryChange();//to show hide Delivery and Pickup Cities according to checkboxes
        //PickupCity_GetList(item.PickupCityID, item.POLCountryID);
        //DeliveryCity_GetList(item.DeliveryCityID, item.PODCountryID);


        $("#btnSaveRouting" + RoutingSuffix).attr("onclick", "Routings_Insert(false);");
        $("#btnSaveandNewRouting" + RoutingSuffix).attr("onclick", "Routings_Insert(true);");


    } //if (pRoutingTypeName == "CustomsClearance" && $("#tblRoutings tbody td.RoutingType[val=" + CustomsClearanceRoutingTypeID + "]").length > 0)
}
function Routings_FillControls(pID) {
    debugger;
    FadePageCover(true);

    if (pDefaults.UnEditableCompanyName == "ELI")
        $(".classShowForELI").removeClass("hide");

    ClearAll("#RoutingModalTruckingOrder"); //i want it cleared in all cases to use trucking control names
    if (RoutingSuffix != "TruckingOrder") //otherwise then the modal is already cleared up
        ClearAll("#RoutingModal" + RoutingSuffix);

    var tr = $("#tblRoutings tr[ID='" + pID + "']");

    var TruckID = tr.find("td.EquipmentID").text() == "" ? "0" : tr.find("td.EquipmentID").text();

    if (!$("#cbPosted" + pID).prop("checked")) {
        $("#btnSaveRoutingTruckingOrder").removeAttr("disabled");
        $(".classDisableForApproved").removeAttr("disabled");
    }
    else {
        $("#btnSaveRoutingTruckingOrder").attr("disabled", "disabled");
        $(".classDisableForApproved").attr("disabled", "disabled");
    }
    $("#hID").val(pID);
    //var pWhere = "Where ISINACTIVE=0";//"Where ID not in (select EquipmentID from Routings where IsApproved=0 and EquipmentID is not null) or ID = " + TruckID;
    //CallGETFunctionWithParameters("/api/TRCK_Equipments/LoadAll"
    //, { pWhereClause: pWhere }
    //, function (pData) {
    //    //FillListFromObject(TruckID, 2, TranslateString("SelectFromMenu"), "slEquipmentTruckingOrder", pData[0], null);
    //    Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(pData[0], "ID", "Name", ' ', "<--Select-->", "#slEquipmentTruckingOrder", TruckID, "ID,EquipmentModelID"
    //        , function () {
    //            $("#slEquipmentTruckingOrder").css({ "width": "100%" }).select2();
    //            $("#slEquipmentTruckingOrder").trigger("change");
    //        });
    //    //FadePageCover(false);
    //}
    //, null);

    var pParametersWithValues = {
        pPageNumber: 1
        , pPageSize: 99999
        , pWhereClause: " WHERE ID = " + $(tr).find("td.OperationID").text()
        , pOrderBy: "HouseNumber"

    };
    debugger;
    CallGETFunctionWithParameters("/api/Operations/LoadWithParameters"
        , pParametersWithValues
        , function (pData) {
            var pOperations = JSON.parse(pData[0]);
            var h5Label = "";
            h5Label += "<u>Client:</u> " + (pOperations[0].ClientName);
            h5Label += "&emsp;-&emsp;" + "<u>Shipper:</u> " + (pOperations[0].ShipperName);
            h5Label += "&emsp;-&emsp;" + "<u>Agent:</u> " + (pOperations[0].AgentName);
            h5Label += "&emsp;-&emsp;" + "<u>POD:</u> " + (pOperations[0].PODName);
            $("#h5LblTrucking").html(h5Label);

            $.each(pOperations, function (i, item) { //i ve only one row
                ////////////////Header//////////////////////
                debugger;
                $("#lblTotalGrossWeight").html(": " + item.GrossWeightSum);
                $("#hOperationIDAWB").val(item.ID); //for AWB
                //$(".steps").children().removeClass("active");
                //$(".step-pane").removeClass("active");
                $("#cbIsAWB").prop("checked", item.IsAWB);
                //if (!item.IsAWB) {
                //    $("#General").addClass("active");
                //    $("#stepsGeneral").addClass("active");
                //}
                //else {
                //    $("#BillsofLading").addClass("active");
                //    $("#stepsBillsofLading").addClass("active");
                //}
                /***************************Flexi & Tank & Vehicle*****************************/
                //if (item.ShipmentType == constFlexiShipmentType && item.DirectionType == constImportDirectionType) {
                //    $(".classShowFlexiImport").removeClass("hide");
                //    $("#spanFlexiLabel").text("Flexi");
                //}
                //else if (item.ShipmentType == constFlexiShipmentType) {
                //    $(".classHideForFlexi").addClass("hide");
                //    $(".classDisableForFlexi").attr("disabled", "disabled");
                //    $("#spanFlexiLabel").text("Flexi");
                //}
                //else if (item.ShipmentType == constTankShipmentType) {
                //    $(".classShowForTank").removeClass("hide");
                //    $("#spanFlexiLabel").text("Purchase.Inv");
                //}
                //else //not Flexi
                //    $("#spanFlexiLabel").text("Purchase.Inv");

                //if (OVVeh && item.ShipmentType == constVehicleShipmentType) {
                //    $(".classShowForVehicle").removeClass("hide");
                //}
                //else if (OVPac) {
                //    $(".classHideForVehicle").removeClass("hide");
                //}

                //if (item.ShipmentType == constFlexiShipmentType && item.DirectionType == constExportDirectionType) {
                //    $(".classShowFlexiExport").removeClass("hide");
                //    $("#spanFlexiLabel").text("Flexi");
                //}
                /***************************EOF Flexi*****************************/
                /***************************CustomsClearance*****************************/
                //if (item.IsCustomsClearance) {
                //    $(".classShowForCustomsClearance").removeClass("hide");
                //}
                //else {
                //    $(".classShowForCustomsClearance").addClass("hide");
                //}
                /***************************EOF CustomsClearance*****************************/
                //var strShownDirection = "<i class=' fa " + item.DirectionIconName + " " + item.DirectionIconStyle + "'/>";
                //var strShownTransport = "<i class=' fa " + item.TransportIconName + " " + item.TransportIconStyle + "'/>";
                //debugger;
                //FillListFromObject(null, 2, "SET AS", "slOperationStages", pOperationStages, null);
                //$("#hIsOperationDisabled").val(pIsOperationClosed == true || item.OperationStageID == CancelledQuoteAndOperStageID ? 1 : 0);
                //if ($("#hf_CanEdit").val() == 1) {
                //    $("#txtOpenDate").removeAttr("disabled"); $("#divSetOperationStage").removeClass("hide");
                //}
                //else {
                //    $("#txtOpenDate").attr("disabled", "disabled"); $("#divSetOperationStage").addClass("hide");
                //}
                ////btn-ChangeOperationType
                //if ($("#hf_CanEdit").val() == 1 && $("#hIsOperationDisabled").val() == false) {
                //    $("#btn-ChangeOperationType").removeClass("hide");
                //    if (item.TransportType == AirTransportType && !item.IsAWB)
                //        $("#btn-CallShipmentsAWB_FillControls").removeClass("hide");
                //}
                //else {
                //    $("#btn-ChangeOperationType").addClass("hide");
                //}
                if (OEGen && $("#hIsOperationDisabled").val() == false) $("#btnSaveOperation").removeClass("hide"); else $("#btnSaveOperation").addClass("hide");
                if (item.BLType == constDirectBLType)
                    $("#cbIsDirect").prop('checked', true);
                if (item.BLType == constHouseBLType) {
                    $("#cbIsHouse").prop('checked', true);
                    //  $("#hl-submenu-Master").removeClass("hide");
                    //   $("#slLines").attr("disabled", "disabled");
                }

                if (item.DirectionType == 1) { //the last 2 commands are to set which is primary shipper or consignee
                    $("#cbIsImport").prop('checked', true); //$("#slShippers").attr("data-required", "false"); $("#slConsignees").attr("data-required", "true");
                }
                else if (item.DirectionType == 2)
                    $("#cbIsExport").prop('checked', true);
                else if (item.DirectionType == 3)
                    $("#cbIsDomestic").prop('checked', true);
                else if (item.DirectionType == 4)
                    $("#cbIsCrossBooking").prop('checked', true);
                else if (item.DirectionType == 5)
                    $("#cbIsReExport").prop('checked', true);
                if (item.TransportType == OceanTransportType)
                    $("#cbIsOcean").prop('checked', true);
                else if (item.TransportType == AirTransportType)
                    $("#cbIsAir").prop('checked', true);
                else if (item.TransportType == InlandTransportType)
                    $("#cbIsInland").prop('checked', true);

                if (item.ShipmentType == constFCLShipmentType)
                    $("#cbIsFCL").prop('checked', true);
                else if (item.ShipmentType == constLCLShipmentType)
                    $("#cbIsLCL").prop('checked', true);
                else if (item.ShipmentType == constFTLShipmentType)
                    $("#cbIsFTL").prop('checked', true);
                else if (item.ShipmentType == constLTLShipmentType)
                    $("#cbIsLTL").prop('checked', true);
                else if (item.ShipmentType == constConsolidationShipmentType)
                    $("#cbIsConsolidation").prop('checked', true);
                else if (item.ShipmentType == constFlexiShipmentType)
                    $("#cbIsFlexi").prop('checked', true);
                else if (item.ShipmentType == constTankShipmentType)
                    $("#cbIsTank").prop('checked', true);
                else if (item.ShipmentType == constVehicleShipmentType)
                    $("#cbIsVehicle").prop('checked', true);
                else if (item.ShipmentType == constbulkShipmentType)
                    $("#cbIsBulk").prop('checked', true);

                //if (item.BLType == constMasterBLType) {
                //    $("#cbIsMaster").prop('checked', true);
                //    $("#hl-submenu-Shipments").removeClass("hide");
                //    $("#divHouseNumber").addClass("hide");
                //}
                //else {
                //    //$("#divMoveTypes").removeClass("hide");
                //    $("#divHouseNumber").removeClass("hide");
                //}

                //if (item.TransportType == OceanTransportType && item.DirectionType == 2) //Ocean & Export 
                //    $("#divOperationAgreedRate").removeClass("hide");
                //else
                //    $("#divOperationAgreedRate").addClass("hide");
                debugger;
                $("#hOperationID").val(item.ID);
                $("#hQuotationRouteID").val(item.QuotationRouteID); // incase it is build from an operation
                $("#hCodeSerial").val(item.CodeSerial);
                $("#hOperationCode").val(item.Code);
                $("#hOperationCreationYear").val(GetDateWithFormatMDY(item.CreationDate).split('/')[2].toString());
                $("#hHouseNumber").val(item.HouseNumber);
                //$("#txtOperationCustomerReference").val(item.CustomerReference == 0 ? "" : item.CustomerReference);
                //$("#txtOperationSupplierReference").val(item.SupplierReference == 0 ? "" : item.SupplierReference);
                //$("#txtOperationReference").val(item.Reference == 0 ? "" : item.Reference);

                //$("#txtOperationPONumber").val(item.PONumber == 0 ? "" : item.PONumber);
                //$("#txtOperationPODate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.PODate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.PODate)));
                //$("#txtOperationPOValue").val(item.POValue == 0 ? "" : item.POValue);
                //$("#txtOperationReleaseNumber").val(item.ReleaseNumber == 0 ? "" : item.ReleaseNumber);
                //$("#txtOperationReleaseDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReleaseDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ReleaseDate)));
                //$("#txtOperationReleaseValue").val(item.ReleaseValue == 0 ? "" : item.ReleaseValue);

                //$("#txtOperationAgreedRate").val(item.AgreedRate == 0 ? "" : item.AgreedRate);
                ///////////////////////////////////////
                $("#hBLDate").val(ConvertDateFormat(GetDateWithFormatMDY(item.BLDate)));//DDMMYYYY
                $("#hVia1").val(item.Via1);
                $("#hVia2").val(item.Via2);
                $("#hVia3").val(item.Via3);
                ///////////////////////////////////////
                $("#hMasterBL").val(item.MasterBL);
                $("#hMAWBSuffix").val(item.MAWBSuffix == 0 ? "" : item.MAWBSuffix);
                $("#hMAWBStockID").val(item.MAWBStockID);
                $("#hBLType").val(item.BLType);
                $("#hBLTypeIconName").val(item.BLTypeIconName);
                $("#hBLTypeIconStyle").val(item.BLTypeIconStyle);
                $("#hDirectionType").val(item.DirectionType);
                $("#hDirectionIconName").val(item.DirectionIconName);
                $("#hDirectionIconStyle").val(item.DirectionIconStyle);
                $("#hTransportType").val(item.TransportType);
                $("#hTransportIconName").val(item.TransportIconName);
                $("#hTransportIconStyle").val(item.TransportIconStyle);
                $("#hShipmentType").val(item.ShipmentType);
                $("#hPOLCountryID").val(item.POLCountryID);
                $("#hPODCountryID").val(item.PODCountryID);
                $("#hPOL").val(item.POL);
                $("#hPOD").val(item.POD);
                $("#hClientEmail").val(item.ClientEmail);
                $("#hClientAddress").val(item.ClientAddress == 0 ? "" : item.ClientAddress);
                $("#hPickupAddress").val(item.PickupAddress == 0 ? "" : item.PickupAddress); //to prevent clear when opening the RoutingModal
                $("#hDeliveryAddress").val(item.DeliveryAddress == 0 ? "" : item.DeliveryAddress); //to prevent clear when opening the RoutingModal
                $("#txtPickupAddress").val(item.PickupAddress == 0 ? "" : item.PickupAddress);
                $("#txtDeliveryAddress").val(item.DeliveryAddress == 0 ? "" : item.DeliveryAddress);
                $("#hShippingLineID").val(item.ShippingLineID);
                $("#hAirlineID").val(item.AirlineID);
                $("#hTruckerID").val(item.TruckerID);
                $("#hShippingLineName").val(item.ShippingLineName);
                $("#hAirlineName").val(item.AirlineName);
                $("#hTruckerName").val(item.TruckerName);
                $("#hETAPOLDate").val(item.ETAPOLDate);
                $("#hATAPOLDate").val(item.ATAPOLDate);
                $("#hExpectedDeparture").val(item.ExpectedDeparture);
                $("#hActualDeparture").val(item.ActualDeparture);
                $("#hExpectedArrival").val(item.ExpectedArrival);
                $("#hActualArrival").val(item.ActualArrival);
                $("#hOperationStageID").val(item.OperationStageID);
                $("#hMasterOperationID").val(item.MasterOperationID);
                $("#hNumberOfHousesConnected").val(item.NumberOfHousesConnected);

                //$("#lblMaster").html(":" + (item.MasterBL == 0 ? "N/A" : item.MasterBL));
                //$("#lblHouse").html(":" + (item.HouseNumber == 0 ? "N/A" : item.HouseNumber));
                //$("#lblOperationCode").html(":" + item.Code);
                //$("#lblDirection").html(strShownDirection);
                //$("#lblTransport").html(strShownTransport);
                //$("#lblShipmentType").html(":" + item.RepBLTypeShown + (item.ShipmentTypeCode == 0 ? " " : (" " + item.ShipmentTypeCode)));
                //$("#lblClient").html(":" + item.ClientName);
                //$("#lblAgent").html(":" + item.AgentName == 0 ? "" : item.AgentName);
                //$("#lblServiceScope").html(":" + (item.MoveTypeName == "0" ? "N/A" : item.MoveTypeName));
                //if (item.BLType == constMasterBLType) {
                //    $("#lblHouse").addClass("hide"); $("#spanHouse").addClass("hide");
                //}
                //else {
                //    $("#lblHouse").removeClass("hide"); $("#spanHouse").removeClass("hide");
                //}
                //if ($("#cbIsAir").prop("checked"))
                //    $("#spanMaster").html("&nbsp;&nbsp;MAWB");
                //else
                //    $("#spanMaster").html("&nbsp;&nbsp;M-B/L");
                //$("#lblStage").html(":" + item.OperationStageName)
                //$("#lblStage").html(":" + (pIsOperationClosed
                //                            ? "CLOSED"
                //                            : item.OperationStageName
                //                            )
                //                   );
                //$("#lblRouting").html(":" + item.POLCode + ">" + item.PODCode);
                //$("#lblQuotation").html(":" + (item.QuotationRouteID == 0 ? "N/A" : item.QuotationCode));
                //$("#lblLine").html(":" + (item.LineID == 0 ? "N/A" : item.LineName));// $("#hShippingLineName").val()
                ////get balance while change combo limit
                //if (item.ClientID != "0") {
                //    debugger;
                //    $.getJSON("/api/Customers/getCustomerCreditLimitBalance", { pIsCust: 0, pCustomerID: item.ClientID, plimitID: 0 }, function (Result) {
                //        if (Result.length > 0) {
                //            debugger;
                //            $("#lblClientBalance").html(":" + Result);
                //        }

                //    });
                //}
                //$("#lblCutOffDate").html(":" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.CutOffDate)));
                //$("#lblSalesman").html(":" + item.Salesman);
                $("#hShipperID").val(item.ShipperID); // i need to catch ShipperID and ConsigneeID coz when saving they are lost due to difference in handling partners in (Quotations and Operations)
                $("#hConsigneeID").val(item.ConsigneeID); // i need to catch ShipperID and ConsigneeID coz when saving they are lost due to difference in handling partners in (Quotations and Operations)
                $("#hAgentID").val(item.AgentID); // i need to catch ShipperID and ConsigneeID coz when saving they are lost due to difference in handling partners in (Quotations and Operations)
                $("#hShipperContactID").val(item.ShipperContactID); // i need to catch ShipperID and ConsigneeID coz when saving they are lost due to difference in handling partners in (Quotations and Operations)
                $("#hConsigneeContactID").val(item.ConsigneeContactID); // i need to catch ShipperID and ConsigneeID coz when saving they are lost due to difference in handling partners in (Quotations and Operations)
                $("#hAgentContactID").val(item.AgentContactID); // i need to catch ShipperID and ConsigneeID coz when saving they are lost due to difference in handling partners in (Quotations and Operations)
                ////////////////EOF Header//////////////////////
                ////////////////General/////////////////////////
                //$("#txtOperationCode").val(item.Code);
                //$("#txtOpenedBy").val(item.OpenedBy);
                //$("#txtOpenDate").val(ConvertDateFormat(GetDateWithFormatMDY(item.OpenDate)));
                //$("#txtCloseDate").val(ConvertDateFormat(GetDateWithFormatMDY(item.CloseDate)));
                //$("#txtOperationCutOffDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CutOffDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.CutOffDate)));

                //$("#txtOperationQRNotes").val(item.QRNotes);
                //if (item.QRNotes == "")
                //    $("#divOperationQRNotes").addClass("hide");
                //else
                //    $("#divOperationQRNotes").removeClass("hide");

                //FillListFromObject(item.BranchID, 2, null, "slOperationEditBranch", pBranches, null);

                //var _Salesmentemp = JSON.parse(pUsers);
                //var pSalesmen = jQuery.grep(_Salesmentemp, function (_Salesmentemp) {
                //    return _Salesmentemp.IsSalesman == true;
                //});

                //FillListFromObject(item.SalesmanID, 2, null, "slOperationEditSalesman", JSON.stringify(pSalesmen), function () {
                //    if (IsNull(pDefaults.ShowUserSalesmen, "false") == true)
                //        $('#slOperationEditSalesman').trigger("change");
                //});
                //FillListFromObject(item.OperationManID, 2, "<--Select-->", "slOperationEditOperationMan", pUsers, null);
                //FillListFromObject(item.IncotermID, 2, "Select Incoterm", "slIncoterms", pIncoterms, null);
                //FillListFromObject(item.POrC, 2, "Select Freight Type", "slOperationPOrC", pPOrC, null);
                //FillListFromObject(item.MoveTypeID, 2, "Select Service Scope", "slMoveTypes", pMoveTypes
                //    , function () { $("#slOperationMoveTypes").html($("#slMoveTypes").html()); });
                //FillListFromObject(item.CommodityID, 2, "Select Commodity", "slCommodities", pCommodities, null);
                //FillListFromObject(item.NetworkID, 2, "Select Network", "slOperationNetwork", pNetwork, null);



                debugger;
                ////////////////DocsIn/////////////////////////
                //DocsIn_LoadAll(item.ID);
                //if (OVDocIn) {
                //    DocsIn_BindTableRows(pDocsInFileNames);
                //}
                ////////////////EOF DocsIn/////////////////////////

                ////////////////DocsOut/////////////////////////
                ////DocsOut_LoadAll(item.ID);
                //if (OVDoc) {
                //    //    DocsOut_BindTableRows(pDocsOut);
                //    DocsOut_FillMasterAndHouses(pMasterAndHouses, "slDocsOutOperations", null, function () { $("#slEditInvoiceOperations").html($("#slDocsOutOperations").html()); });//Parameters: (pListItems, pSlName, pStrFirstRow)
                //}

                //if (item.IsAWB) { //if its Master then i need Shipments
                //    $("#hIsBillM").val(1);
                //    //ShipmentsAWB_BindTableRows(pHouseOperations);
                //    ShipmentsAWB_BindTableRows(pMasterAndHouses[0]);
                //    ShipmentsAWB_Houses_BindTableRows(pHouseOperations);
                //}
                ///***********************EOF AWB***********************/

            });
            //FadePageCover(false);
            CallGETFunctionWithParameters("/api/TruckingOrders/LoadAllContainers"
                , {
                    pWhereClause: "WHERE TruckingOrderID=" + pID
                    , pOrderBy: "ID"
                }
                , function (pData) {
                    Details_BindTableRows(JSON.parse(pData[0]));
                    //FadePageCover(false);
                }
                , null);

            if ($("#cbIsFCL").prop("checked") || $("#cbIsFTL").prop("checked") || $("#cbIsTank").prop("checked") || $("#cbIsFlexi").prop("checked")) {
                if (pDefaults.UnEditableCompanyName == "CAP") {
                    //$('.classHideForCAP').addClass('hide');
                    $('.classHideForContainers').removeClass('hide');
                }
                else
                    $('.classHideForContainers').addClass('hide');
                $('.classShowForContainers').removeClass('hide');
                $('#lblGateInDate').html('Gate In Date - تاريخ دخول الميناء');
                $('#lblGateOutDate').html('Gate Out Date - تاريخ الخروج');
            }
            else {
                $('.classHideForContainers').removeClass('hide');
                $('.classShowForContainers').addClass('hide');
                $('#lblGateInDate').html('تاريخ الرجوع');
                $('#lblGateOutDate').html('تاريخ الخروج ');
            }
            if (pDefaults.UnEditableCompanyName == "ILS" || pDefaults.UnEditableCompanyName == "ILSEG") {
                //$("#lblGateOutDate").text("   تاريخ التواجد  ");
                //$("#lblGateInDate").text("  تاريخ انتهاء فترة السماح   ");
                $('#lblGateInDate').html('FreeTime / Cutoff تاريخ');
                $('#lblGateOutDate').html('تاريخ التواجد');
                $('#lblStuffingDate').html('تاريخ السحب');
                $('#lblTruckingOrderLoadingTimeTruckingOrder').html('ميعاد التواجد');
            }
            $('#divRoutingVesselsTruckingOrder').addClass('hide');


            $("#hRoutingID" + RoutingSuffix).val(pID);
            $("#hRoutingTransportType" + RoutingSuffix).val($(tr).find("td.TransportType").attr("val"));
            $("#hRoutingTransportIconName" + RoutingSuffix).val($(tr).find("td.TransportIconName").text());
            $("#hRoutingTransportIconStyle" + RoutingSuffix).val($(tr).find("td.TransportIconStyle").text());
            $("#lblRoutingShown" + RoutingSuffix).html(": " + $(tr).find("td.RoutingType").text());
            $("#txtPickupAddress" + RoutingSuffix).val($("#hPickupAddress").val());
            $("#txtDeliveryAddress" + RoutingSuffix).val($("#hDeliveryAddress").val());
            $("#txtCode" + RoutingSuffix).val($(tr).find("td.TruckingOrderCode").text());



            if(pDefaults.UnEditableCompanyName == "SEA")
            $(".getValueSEA").val($(tr).find("td.Quantity").text());



            Routings_SetCbRoutingTransportType($("#hRoutingTransportType" + RoutingSuffix).val());
            Routings_ShowHideTruckingOrderFields($(tr).find("td.RoutingType").attr("val") == TruckingOrderRoutingTypeID ? true : false);

            var pPOLCountryID = $(tr).find("td.POLCountry").attr("val");
            var pPODCountryID = $(tr).find("td.PODCountry").attr("val");
            var pPOLID = $(tr).find("td.POL").attr("val");
            var pPODID = $(tr).find("td.POD").attr("val");
            var pLineID = $(tr).find("td.Line").attr("val");
            var pVesselID = $(tr).find("td.Vessel").attr("val");
            var ETAPOLDate = $(tr).find("td.ETAPOLDate").attr("val");
            var ATAPOLDate = $(tr).find("td.ATAPOLDate").attr("val");
            var ExpectedArrival = $(tr).find("td.ExpectedArrival").attr("val");
            var ExpectedDeparture = $(tr).find("td.ExpectedDeparture").attr("val");
            var ActualArrival = $(tr).find("td.ActualArrival").attr("val");
            var ActualDeparture = $(tr).find("td.ActualDeparture").attr("val");
            var pGensetSupplierID = $(tr).find("td.GensetSupplierID").text();
            var pCCAID = $(tr).find("td.CCAID").text();
            var pGateInPortID = $(tr).find("td.GateInPortID").text() == 0 ? "" : $(tr).find("td.GateInPortID").text();
            var pGateOutPortID = $(tr).find("td.GateOutPortID").text() == 0 ? "" : $(tr).find("td.GateOutPortID").text();
            var pCCAID = $(tr).find("td.CCAID").text();
            $("#slTruckingOrderGateInPort" + RoutingSuffix).val(pGateInPortID);
            $("#slTruckingOrderGateOutPort" + RoutingSuffix).val(pGateOutPortID);
            //fill select boxes
            //RoutingTypes_GetList($(tr).find("td.RoutingType").attr("val"), null);
            if (RoutingSuffix == "") {
                $("#slRoutingTypes" + RoutingSuffix).html('<option value="' + MainCarraigeRoutingTypeID + '">MAIN CARRAIGE</option>');
                $("#txtRoutingRoadNumber").val($(tr).find("td.RoadNumber").text());
                $("#txtRoutingDeliveryOrderNumber").val($(tr).find("td.DeliveryOrderNumber").text());
                $("#txtRoutingWareHouse").val($(tr).find("td.WareHouse").text());
                $("#txtRoutingWareHouseLocation").val($(tr).find("td.WareHouseLocation").text());
            }
            else if (RoutingSuffix == "TruckingOrder") {
                $("#slRoutingTypes" + RoutingSuffix).html('<option value="' + TruckingOrderRoutingTypeID + '">TRUCKING ORDER</option>');
            }
            else if (RoutingSuffix == "CustomsClearance")
                $("#slRoutingTypes" + RoutingSuffix).html('<option value="' + CustomsClearanceRoutingTypeID + '">Customs Clearance</option>');

            //GetListWithNameAndWhereClause(pGensetSupplierID, "/api/Suppliers/LoadAll", "<--Select-->", "slTruckingOrderGensetSupplier" + RoutingSuffix, "ORDER BY Name", null);
            //GetListWithNameAndWhereClause(pCCAID, "/api/CustomsClearanceAgents/LoadAll", "<--Select-->", "slRoutingCCA" + RoutingSuffix, "ORDER BY Name", null);
            if (RoutingSuffix == "TruckingOrder")
                GetListWithNameAndWhereClause(pGensetSupplierID
                    , "/api/Suppliers/LoadAll"
                    , TranslateString("SelectFromMenu"), "slTruckingOrderGensetSupplier" + RoutingSuffix
                    , "WHERE ID IN (SELECT PartnerID FROM vwOperationPartners WHERE PartnerTypeID=" + constSupplierPartnerTypeID + " AND OperationID=" + $("#hOperationID").val() + ") ORDER BY Name"
                    , null);
            else //not TruckingOrder so i don't need to add GensetSuppliers
                $("#slTruckingOrderGensetSupplier" + RoutingSuffix).html("<option value=''><--Select--></option>");
            GetListWithNameAndWhereClause(pCCAID
                , "/api/CustomsClearanceAgents/LoadAll"
                , TranslateString("SelectFromMenu"), "slRoutingCCA" + RoutingSuffix
                , "WHERE ID IN (SELECT PartnerID FROM vwOperationPartners WHERE PartnerTypeID=" + constCustomsClearanceAgentPartnerTypeID + " AND OperationID=" + $("#hOperationID").val() + ") ORDER BY Name"
                , null);

            Routings_ShowHidePickupAndDeliveryAddress($(tr).find("td.RoutingType").attr("val") == MainCarraigeRoutingTypeID ? true : false);

            //Incase of (Master OR Direct) && Main Route so i have to show MasterBL
            // karim//    if (($("#hBLType").val() == constMasterBLType || $("#hBLType").val() == constDirectBLType) && $(tr).find("td.RoutingType").attr("val") == MainCarraigeRoutingTypeID)
            // karim//    Routings_Show_Suitable_MasterBL();
            // karim//  else
            // karim//    Routings_HideMasterBL();
            Routings_Set_btnMAWBStockCaption(); //to write wether (Get From Stock) or (Return To Stock)

            if ($(tr).find("td.RoutingType").attr("val") == MainCarraigeRoutingTypeID) {
                $("#slRoutingTypes" + RoutingSuffix).attr("disabled", "disabled"); //coz its main
                Routings_DisableCbTransportType(); //to enable or disable cbTransportType
                //Incase of Master && Connected
                if ($("#hBLType").val() == constMasterBLType && parseInt($("#hNumberOfHousesConnected").val()) > 0)
                    Routings_Master_And_Connected_Properties();
                //Incase of Master && Not Connected
                if ($("#hBLType").val() == constMasterBLType && parseInt($("#hNumberOfHousesConnected").val()) == 0)
                    Routings_Master_And_NotConnected_Properties();
                //Incase of House && Connected
                if ($("#hBLType").val() == constHouseBLType && parseInt($("#hMasterOperationID").val()) > 0)
                    Routings_House_And_Connected_Properties();
                //Incase of House && Connected
                if ($("#hBLType").val() == constHouseBLType && parseInt($("#hMasterOperationID").val()) == 0)
                    Routings_House_And_NotConnected_Properties();
                //Incase of Direct And MAWB taken from stock
                if ($("#hBLType").val() == constDirectBLType && $("#hMAWBStockID").val() != "0")
                    Routings_DisableLines();
                //Incase of Direct And MAWB Not taken from stock
                if ($("#hBLType").val() == constDirectBLType && $("#hMAWBStockID").val() == "0")
                    Routings_EnableLines();

                //to Add/Remove data-target attr that calls the modal according to (Return to Stock or Get From Stock)
                if ($("#hMAWBStockID").val() == "0")
                    Routings_Add_DataTarget_Attr_To_btnMAWBStock();//so modal opens to select MAWB from
                else // do return MAWB to stock
                    Routings_Remove_DataTarget_Attr_From_btnMAWBStock();
            }
            else {
                $("#slRoutingTypes" + RoutingSuffix).removeAttr("disabled");
                Routings_EnableCbTransportType();
                Routings_EnablePorts();
                Routings_EnableDates();
                Routings_EnableLines();
            }
            //Enable/Disable $("#txtMAWBStock")
            //karim // $("#hMAWBStockID").val() if ($("#hMAWBStockID").val() == "0")
            //karim //   Routings_EnableMAWBSuffix();
            //karim // else
            //karim //   Routings_DisableMAWBSuffix();

            Routings_Countries_GetList(pPOLCountryID, pPODCountryID, null);
            Routings_Ports_GetList(pPOLID, pPOLCountryID, 1);
            Routings_Ports_GetList(pPODID, pPODCountryID, 2);
            /////////////////////////////////////Todo: Fill Via Ports here///////////////////////////


            //Routings_Lines_GetList(pLineID
            //    , function () {
            //        if ($("#hRoutingTransportType" + RoutingSuffix).val() == OceanTransportType)
            //            Routings_Vessels_GetList(pVesselID, pLineID, "slRoutingVessels", null);
            //        else //to make valur of 
            //            $("#slRoutingVessels" + RoutingSuffix).val("");
            //    });

            $("#txtETAPOLDate" + RoutingSuffix).val(Date.prototype.compareDates("01/01/1900", ETAPOLDate) < 1 ? "" : ConvertDateFormat(ETAPOLDate));
            $("#txtATAPOLDate" + RoutingSuffix).val(Date.prototype.compareDates("01/01/1900", ATAPOLDate) < 1 ? "" : ConvertDateFormat(ATAPOLDate));
            $("#txtExpectedArrival" + RoutingSuffix).val(Date.prototype.compareDates("01/01/1900", ExpectedArrival) < 1 ? "" : ConvertDateFormat(ExpectedArrival));
            $("#txtExpectedDeparture" + RoutingSuffix).val(Date.prototype.compareDates("01/01/1900", ExpectedDeparture) < 1 ? "" : ConvertDateFormat(ExpectedDeparture));
            $("#txtActualArrival" + RoutingSuffix).val(Date.prototype.compareDates("01/01/1900", ActualArrival) < 1 ? "" : ConvertDateFormat(ActualArrival));
            $("#txtActualDeparture" + RoutingSuffix).val(Date.prototype.compareDates("01/01/1900", ActualDeparture) < 1 ? "" : ConvertDateFormat(ActualDeparture));

            // karim// if ($("#hBlType").val() != constHouseBLType && $("#hTransportType").val() == AirTransportType) {
            // karim//   $("#txtMAWBSuffix" + RoutingSuffix).val($("#hMAWBSuffix").val().toString() == "0" ? "" : $("#hMAWBSuffix").val());
            // karim// $("#txtMAWBDate" + RoutingSuffix).val(Date.prototype.compareDates("01/01/1900", ConvertDateFormat($("#hBLDate").val())) < 1 ? "" : $("#hBLDate").val());
            // karim//  }
            // karim//  if ($("#hBlType").val() != constHouseBLType && $("#hTransportType").val() != AirTransportType) {
            // karim//     $("#txtOBL" + RoutingSuffix).val(($("#hMasterBL").val() == 0 ? "" : $("#hMasterBL").val()));
            //  karim //$("#txtOBLDate" + RoutingSuffix).val(Date.prototype.compareDates("01/01/1900", ConvertDateFormat($("#hBLDate").val())) < 1 ? "" : $("#hBLDate").val());
            //karim //}
            $("#txtRoutingVoyageOrTruckNumber" + RoutingSuffix).val($(tr).find("td.VoyageOrTruckNumber").text());
            $("#txtRoutingTransientTime" + RoutingSuffix).val($(tr).find("td.TransientTime").text());
            $("#txtRoutingFreeTime" + RoutingSuffix).val($(tr).find("td.FreeTime").text());
            $("#txtRoutingValidity" + RoutingSuffix).val($(tr).find("td.Validity").text());
            $("#txtRoutingNotes" + RoutingSuffix).val($(tr).find("td.Notes").text());

            $("#txtTruckingOrderQuantity" + RoutingSuffix).val($(tr).find("td.Quantity").text());
            $("#txtTruckingOrderContactPerson" + RoutingSuffix).val($(tr).find("td.ContactPerson").text());
            $("#txtTruckingOrderPickupAddress" + RoutingSuffix).val($(tr).find("td.PickupAddress").text());
            $("#txtPickupAddressTruckingOrder").val($(tr).find("td.PickupAddress").text());
            $("#txtTruckingOrderDeliveryAddress" + RoutingSuffix).val($(tr).find("td.DeliveryAddress").text());
            $("#txtTruckingOrderGateInDate" + RoutingSuffix).val($(tr).find("td.GateInDate").text());
            $("#txtTruckingOrderGateOutDate" + RoutingSuffix).val($(tr).find("td.GateOutDate").text());
            $("#txtTruckingOrderStuffingDate" + RoutingSuffix).val($(tr).find("td.StuffingDate").text());
            $("#txtTruckingOrderDeliveryDate" + RoutingSuffix).val($(tr).find("td.DeliveryDate").text());
            $("#txtTruckingOrderBookingNumber" + RoutingSuffix).val($(tr).find("td.BookingNumber").text());
            debugger;
            $("#txtBillNumber" + RoutingSuffix).val($(tr).find("td.BillNumber").text());
            $("#txtCargoReturnGrossWeight" + RoutingSuffix).val($(tr).find("td.CargoReturnGrossWeight").text());
            $("#txtTruckCounter" + RoutingSuffix).val($(tr).find("td.TruckCounter").text());
            $("#txtTruckingOrderDelays" + RoutingSuffix).val($(tr).find("td.Delays").text());
            $("#txtTruckingOrderDriverName" + RoutingSuffix).val($(tr).find("td.DriverName").text());
            $("#txtRoutingpCustomerWarehouseManagerName" + RoutingSuffix).val($(tr).find("td.CustomerWarehouseManagerName").text());
            $("#txtRoutingpCustomerWarehouseManagerPhone" + RoutingSuffix).val($(tr).find("td.CustomerWarehouseManagerPhone").text());
            $("#slRoutingsTruckingEquipmentModels" + RoutingSuffix).val(tr.find("td.TruckingEquipmentModels").text());




            $("#txtTruckingOrderDriverPhones" + RoutingSuffix).val($(tr).find("td.DriverPhones").text());
            $("#txtTruckingOrderPowerFromGateInTillActualSailing" + RoutingSuffix).val($(tr).find("td.PowerFromGateInTillActualSailing").text());

            $("#txtTruckingOrderContactPersonPhones" + RoutingSuffix).val($(tr).find("td.ContactPersonPhones").text());
            $("#txtTruckingOrderLoadingTime" + RoutingSuffix).val($(tr).find("td.LoadingTime").text());
            $("#txtUnloadingTime").val($(tr).find("td.UnloadingTime").text());

            $("#txtCCAFreight").val($(tr).find("td.CCAFreight").text());
            $("#txtCCAFOB").val($(tr).find("td.CCAFOB").text());
            $("#txtCCACFValue").val($(tr).find("td.CCACFValue").text());
            $("#txtCCAInvoiceNumber").val($(tr).find("td.CCAInvoiceNumber").text());

            $("#txtCCAInsurance").val($(tr).find("td.CCAInsurance").text());
            $("#txtCCADischargeValue").val($(tr).find("td.CCADischargeValue").text());
            $("#txtCCAAcceptedValue").val($(tr).find("td.CCAAcceptedValue").text());
            $("#txtCCAImportValue").val($(tr).find("td.CCAImportValue").text());
            $("#txtCCADocumentReceiveDate").val($(tr).find("td.CCADocumentReceiveDate").text());
            $("#txtCCAExchangeRate").val($(tr).find("td.CCAExchangeRate").text());
            $("#txtCCAVATCertificateNumber").val($(tr).find("td.CCAVATCertificateNumber").text());
            $("#txtCCAVATCertificateValue").val($(tr).find("td.CCAVATCertificateValue").text());
            $("#txtCCACommercialProfitCertificateNumber").val($(tr).find("td.CCACommercialProfitCertificateNumber").text());
            $("#txtCCAWindowFees").val($(tr).find("td.CCAWindowFees").text());
            $("#txtCCAStorageFees").val($(tr).find("td.CCAStorageFees").text());
            $("#txtCCACommercialProfitTax").val($(tr).find("td.CCACommercialProfitTax").text());
            $("#txtCCACustomsValue").val($(tr).find("td.CCACustomsValue").text());
            $("#txtCCAQuotedValue").val($(tr).find("td.CCAQuotedValue").text());
            $("#txtCCAContractType").val($(tr).find("td.CCAContractType").text());
            $("#txtCCAOthers").val($(tr).find("td.CCAOthers").text());
            $("#txtCCASpendDate").val($(tr).find("td.CCASpendDate").text());

            $("#txtCertificateNumber").val($(tr).find("td.CertificateNumber").text());
            $("#txtCertificateValue").val($(tr).find("td.CertificateValue").text());
            $("#txtCertificateDate").val($(tr).find("td.CertificateDate").text());
            $("#txtQasimaNumber").val($(tr).find("td.QasimaNumber").text());
            $("#txtQasimaDate").val($(tr).find("td.QasimaDate").text());
            $("#txtSalesDateReceived").val($(tr).find("td.SalesDateReceived").text());
            $("#txtCommerceDateReceived").val($(tr).find("td.CommerceDateReceived").text());
            $("#txtInspectionDateReceived").val($(tr).find("td.InspectionDateReceived").text());
            $("#txtFinishDateReceived").val($(tr).find("td.FinishDateReceived").text());
            $("#txtSalesDateDelivered").val($(tr).find("td.SalesDateDelivered").text());
            $("#txtCommerceDateDelivered").val($(tr).find("td.CommerceDateDelivered").text());
            $("#txtInspectionDateDelivered").val($(tr).find("td.InspectionDateDelivered").text());
            $("#txtFinishDateDelivered").val($(tr).find("td.FinishDateDelivered").text());

            Routings_ShowHideVessels();

            $("#cbIsOwnedByCompany").prop("checked", $("#cbIsOwnedByCompany" + pID).prop("checked"));
            Routings_ShowHideOwnedByCompanyProperties($("#cbIsOwnedByCompany" + pID).prop("checked"));
            if (!$("#cbIsOwnedByCompany").prop("checked")) {
                $("#txtSupplierDriverName" + RoutingSuffix).val($(tr).find("td.DriverName" + RoutingSuffix).text());
                $("#txtSupplierDriverAssistantName" + RoutingSuffix).val($(tr).find("td.DriverAssistantName" + RoutingSuffix).text());
                $("#txtSupplierTrailerName" + RoutingSuffix).val($(tr).find("td.TrailerName" + RoutingSuffix).text());

            }
            else {
                $("#slEquipment" + RoutingSuffix).val(tr.find("td.EquipmentID").text() == "" ? 0 : tr.find("td.EquipmentID").text());
                $("#slTrailer" + RoutingSuffix).val(tr.find("td.TrailerID").text() == "" ? 0 : tr.find("td.TrailerID").text());
                $("#slDriver" + RoutingSuffix).val(tr.find("td.DriverID").text() == "" ? 0 : tr.find("td.DriverID").text());
                $("#slDriverAssistant" + RoutingSuffix).val(tr.find("td.DriverAssistantID").text() == "" ? 0 : tr.find("td.DriverAssistantID").text());
                pLineID = 1;
            }
            Routings_Lines_GetList(pLineID, null);
            $("#slRoutingsLoadingZone" + RoutingSuffix).val(tr.find("td.LoadingZoneID").text());
            $("#slRoutingsFirstCuringArea" + RoutingSuffix).val(tr.find("td.FirstCuringAreaID").text());
            $("#slRoutingsSecondCuringArea" + RoutingSuffix).val(tr.find("td.SecondCuringAreaID").text());
            $("#slRoutingsThirdCuringArea" + RoutingSuffix).val(tr.find("td.ThirdCuringAreaID").text());


            $("#btnSaveRouting" + RoutingSuffix).attr("onclick", "Routings_Update(false);");
            $("#btnSaveandNewRouting" + RoutingSuffix).attr("onclick", "Routings_Update(true);");

            ApplySelectListSearch_OnlyChange(); //ApplySelectListSearch();

            OperationCharges_FillModal();
            TruckingOrder_TruckLastCounter(function () { TruckingOrder_GetKilometersDifference(); });
        }
        ,
        function () {

        }

    );


}
function Routings_ShowHideOwnedByCompanyProperties(pIsCompanyOwned) {
    debugger;
    if ($("#cbIsOwnedByCompany").prop("checked") || pIsCompanyOwned) {
        $(".classOwnedByCompany").removeClass("hide");
        $(".classOwnedBySupplier").addClass("hide");
        $("#divPayablesAndReceivables").removeClass("hide");
        $("#slRoutingsLinesTruckingOrder").val(pDefaults.DefaultTruckerID);
    }
    else {
        $(".classOwnedByCompany").addClass("hide");
        $(".classOwnedBySupplier").removeClass("hide");
        $("#divPayablesAndReceivables").addClass("hide");
    }
}
function Routings_ShowHideTruckingOrderFields(pFlag) {
    debugger;
   
    if (pDefaults.UnEditableCompanyName == "ELI") {
        $(".classShowForELI").removeClass("hide");

        $("#slRoutingsPOLCountriesTruckingOrder").parent().addClass("hide");
        $("#slRoutingsPOLTruckingOrder").parent().addClass("hide");
        $("#slRoutingsPODCountriesTruckingOrder").parent().addClass("hide");

        $("#divTruckingOrder" + RoutingSuffix).removeClass("hide");
        $("#divPortDates" + RoutingSuffix).removeClass("hide");
        $("#divPorts" + RoutingSuffix).removeClass("hide");
    }

    else if (pFlag) {
        $("#divPorts" + RoutingSuffix).addClass("hide");
        $("#divPortDates" + RoutingSuffix).addClass("hide");
        $("#divTruckingOrder" + RoutingSuffix).removeClass("hide");
    }
    else {
        $("#divTruckingOrder" + RoutingSuffix).addClass("hide");
        $("#divPortDates" + RoutingSuffix).removeClass("hide");
        $("#divPorts" + RoutingSuffix).removeClass("hide");
    }
}
function Routings_TransportType_SetIconNameAndStyle() {
    if (RoutingSuffix == "CustomsClearance") {
        $("#hRoutingTransportType" + RoutingSuffix).val(CustomsClearanceTransportType);
        $("#hRoutingTransportIconName" + RoutingSuffix).val(CustomsClearanceIconName);
        $("#hRoutingTransportIconStyle" + RoutingSuffix).val(strCustomsClearanceIconStyleClassName);
    }
    else {
        if ($("#cbIsOceanRouting" + RoutingSuffix).prop('checked')) {
            $("#hRoutingTransportType" + RoutingSuffix).val(OceanTransportType);
            $("#hRoutingTransportIconName" + RoutingSuffix).val(OceanIconName);
            $("#hRoutingTransportIconStyle" + RoutingSuffix).val(strOceanIconStyleClassName);
            ////show section ShipmentType (FCL,LCL)
            //$("#secShipmentType" + RoutingSuffix).removeClass("hide");
            //$("#divOceanType" + RoutingSuffix).removeClass("hide");
            //$("#divInlandType" + RoutingSuffix).addClass("hide");
            ////set FCL as default
            //$("#cbIsFCL" + RoutingSuffix).prop('checked', true);
        }
        if ($("#cbIsAirRouting" + RoutingSuffix).prop('checked')) {
            $("#hRoutingTransportType" + RoutingSuffix).val(AirTransportType);
            $("#hRoutingTransportIconName" + RoutingSuffix).val(AirIconName);
            $("#hRoutingTransportIconStyle" + RoutingSuffix).val(strAirIconStyleClassName);
            ////hide section ShipmentType (FCL,LCL,FTL,LTL)
            //$("#secShipmentType" + RoutingSuffix).addClass("hide");
            ////uncheck all ShipmentTypes
            //$('input[name=cbShipmentType' + RoutingSuffix + ']').prop('checked', false);
        }
        if ($("#cbIsInlandRouting" + RoutingSuffix).prop('checked')) {
            $("#hRoutingTransportType" + RoutingSuffix).val(InlandTransportType);
            $("#hRoutingTransportIconName" + RoutingSuffix).val(InlandIconName);
            $("#hRoutingTransportIconStyle" + RoutingSuffix).val(strInlandIconStyleClassName);
            ////show section ShipmentType (FTL,LTL)
            //$("#secShipmentType" + RoutingSuffix).removeClass("hide");
            //$("#divOceanType" + RoutingSuffix).addClass("hide");
            //$("#divInlandType" + RoutingSuffix).removeClass("hide");
            ////set FTL as default
            //$("#cbIsFTL").prop('checked', true);
        }
    }
}
function RoutingTypes_GetList(pID, callback) { //the first parameter is used in case of editing to set the code or name to its original value
    debugger;
    var pWhereClause = "";
    //pWhereClause = " WHERE ID NOT IN (SELECT R.RoutingTypeID From Routings R ";
    //pWhereClause += " 					WHERE R.OperationID = " + $('#hOperationID').val() + ")";
    //pWhereClause += (pID != null && pID != undefined ? " OR ID = " + pID : ""); //this is fill so i need to retreive the edited type too
    //pWhereClause += " ORDER BY ViewOrder ";

    pWhereClause = " WHERE ID NOT IN (" + MainCarraigeRoutingTypeID + "," + PreCarraigeRoutingTypeID + "," + DeliveryRoutingTypeID + "," + PickupRoutingTypeID + "," + OnCarraigeRoutingTypeID + ")"; ////////////i get just 1 main carraige and any no of other routing types
    pWhereClause += (pID != null && pID != undefined ? " OR ID = " + pID : ""); //this is fill so i need to retreive the edited type too
    pWhereClause += " ORDER BY ViewOrder ";

    //parameters: ID, strFnName, First Row in select list, select list name, WhereClause
    //GetListWithRoutingTypesCodeAndWhereClauseAndPartnerTypeAttr(pID, "/api/NoAccessRoutingTypes/LoadAll", "Select Partner Type", "slRoutingTypes", pWhereClause);
    GetListWithNameAndWhereClause(pID, "/api/NoAccessRoutingTypes/LoadAll", null/*"Select Type"*/, "slRoutingTypes" + RoutingSuffix, pWhereClause
        , function () { //this callback inside the callback is to fill the slPartnerContacts
            if (callback != null && callback != undefined)
                callback();
        });
}
function TruckingOrders_GetWhereClause() {
    debugger;
    var pWhereClause = "WHERE RoutingTypeID=60" + "\n";
    if ($("#slFilterTruckingOrder").val() != 0)
        pWhereClause += " AND ID=" + $("#slFilterTruckingOrder").val();
    else {
        if (glbCallingControl == "TruckingOrders" || glbCallingControl == "TruckingOrdersOwnFleet")
            pWhereClause += " AND IsFleet=0" + "\n";
        if ($("#txtFilterOperationSerial").val().trim() != "")
            pWhereClause += " And OperationSerial = N'" + $("#txtFilterOperationSerial").val().trim() + "'";
        if ($("#txtFilterTruckingOrderCode").val().trim() != "")
            pWhereClause += " And TruckingOrderCode = N'" + $("#txtFilterTruckingOrderCode").val().trim() + "'";
        if ($("#slFilterEquipment").val().trim() != "" && $("#slFilterEquipment").val().trim() != 0)
            pWhereClause += " And EquipmentID =" + $("#slFilterEquipment").val();
        if ($("#slFilterTrailer").val().trim() != "" && $("#slFilterTrailer").val().trim() != 0)
            pWhereClause += " And TrailerID =" + $("#slFilterTrailer").val();
        if ($("#slFilterCreator").val().trim() != "")
            pWhereClause += " And CreatorUserID =" + $("#slFilterCreator").val();
        if ($("#txtFilterTruckNumber").val().trim() != "")
            pWhereClause += " And VoyageOrTruckNumber LIKE N'%" + $("#txtFilterTruckNumber").val().trim() + "%'";
        if ($("#slFilterCustomer").val().trim() != "")
            pWhereClause += " And ClientName LIKE N'%" + $("#slFilterCustomer option:selected").text() + "%'";
        if ($("#txtFilterBillNumber").val().trim() != "")
            pWhereClause += " And BillNumber = N'" + $("#txtFilterBillNumber").val().trim() + "'";
        if ($("#txtFilterBookingNumber").val().trim() != "")
            pWhereClause += " And BookingNumber = N'" + $("#txtFilterBookingNumber").val().trim() + "'";
        if ($("#slSearchStatus").val() == 10)
            pWhereClause += " AND IsApproved = 1" + "\n";
        if ($("#slSearchStatus").val() == 20)
            pWhereClause += " AND IsApproved = 0" + "\n";
        if ($("#slFilterTrucker").val() != "")
            pWhereClause += " And TruckerID =" + $("#slFilterTrucker").val();
        if ($("#txtFilterInvoiceNumber").val().trim() != "")
            pWhereClause += " And InvoiceNumber = N'" + $("#txtFilterInvoiceNumber").val().trim() + "' \n ";
        if ($("#txtFilterStuffingDate").val().trim() != "" && isValidDate($("#txtFilterStuffingDate").val().trim(), 1))
            pWhereClause += " And StuffingDate = N'" + $("#txtFilterStuffingDate").val().trim() + "' \n ";

        if (glbCallingControl == "FleetTransportOrder") { //OwnFleet
            pWhereClause += " AND IsFleet=1 AND IsOwnedByCompany=1" + "\n";
        }
        else if (glbCallingControl == "FleetTransportOrderSupplier") { //Supplier
            pWhereClause += " AND IsFleet=1 AND IsOwnedByCompany=0" + "\n";
        }
        else {
            if (glbFormCalled == 10)
                pWhereClause += " AND IsOwnedByCompany = 1" + "\n";
            if (glbFormCalled == 20)
                pWhereClause += " AND IsOwnedByCompany = 0" + "\n";
        }
    }
    return pWhereClause;//($("#txt-Search").val().trim() == "" ? "WHERE 1=1" : ("WHERE Code LIKE N'%" + $("#txt-Search").val().trim() + "%'"));
}
function LoadOperations() {
    debugger;
    var constHouseBLType = 2;

    CallGETFunctionWithParameters("/api/Operations/LoadAll" //"/api/Operations/LoadAllForCombo"
        //, { pPageSize: 5000, pWhereClauseForCombo: "WHERE BLType<>" + constHouseBLType, pOrderBy: "ID DESC" }
        , { pPageSize: 5000, pWhereClause: "WHERE BLType<>" + constHouseBLType }
        , function (pData) {
            var _Operation = pData[0];
            FillListFromObject(null, 20, "<--Select-->", "slFilterOperation", _Operation
                , function () {
                    $("#slFilterOperation").css({ "width": "100%" }).select2();
                    $("#slFilterOperation").trigger("change");
                    if (pDefaults.UnEditableCompanyName=="SEA")
                    $("#NumberOfTruckingOrders").attr('maxlength', '2');
                    $("div[tabindex='-1']").removeAttr('tabindex');
                });
            FadePageCover(false);
        }
        , null);
}
function TruckingOrders_Create() {
    debugger;

    if ($("#slFilterOperation").val() == "")
        swal("Sorry", "Please, select an operation.");
    else if ($('#NumberOfTruckingOrders').val() == '' || $('#NumberOfTruckingOrders').val() == '0' || $('#NumberOfTruckingOrders').val() == undefined)
        swal("Sorry", "Please, insert number of trucking orders.");
    else {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/TruckingOrders/CreateTruckingOrders"
            , { pNumberOfTruckingOrders: $('#NumberOfTruckingOrders').val(), pIsOwnedByCompany: ($("#cbIsOwnedByCompanyTruckingOrder").prop("checked") ? true : false), pOperationID: $("#slFilterOperation").val() }
            , function (pData) {
                if (pData[0] == 0)
                    swal("Sorry", "Error.");
                else {
                    var pCreatedTruckingOrdersCodeList = pData[2];
                    var pOperationHeader = JSON.parse(pData[3]);
                    // FillListFromObject(null, 1, "<--Select-->", "slFilterOperation", _Operation, null);
                    swal("Success", "Saved successfully.");
                    jQuery("#SelectTruckingOrderModal").modal("hide");
                    TruckingOrders_LoadingWithPaging();

                    var pSubject = "New trucking orders created for Oper " + pOperationHeader.Code;
                    var pBody = "Trucking Orders " + pCreatedTruckingOrdersCodeList + " created.";

                    Receptionists_GetAvailableUsers("WHERE DepartmentName in('ACCOUNTING','PAYABLE','TRANSPORTATION','TRANSPORTATION HEAD') ORDER BY Name");
                    $("#btnCheckboxesListApply").attr("onclick", "SendNormalAndLocalEmail('" + pSubject + "','" + pBody + "'," + pOperationHeader.ID + ",false);");
                    $("#btnCheckboxesListApply").html("<span class='glyphicon glyphicon-send'></span> Send");
                }
                FadePageCover(false);
            }
            , null);
    }

}
function TruckingOrder_TruckLastCounter(pCallback) {
    debugger;
    var pWhere = '';
    pWhere = "Routing_GetLastTruckCounter " + ($("#slEquipmentTruckingOrder").val() == "" ? 0 : $("#slEquipmentTruckingOrder").val()) + "," + ($("#hID").val() == "" ? 0 : $("#hID").val());
    //FadePageCover(true);
    CallGETFunctionWithParameters("/api/TruckingOrders/TruckLastCounter",
        {
            pProcNameAndTruckID: pWhere
        }
        , function (pData) {
            $('#txtTruckLastCounterTruckingOrder').val(pData[0]);
            if ($("#slEquipmentTruckingOrder").val() != "" && $("#slEquipmentTruckingOrder").val() != 0)
                $('#txtTruckCounterTruckingOrder').removeAttr('disabled');
            else
                $('#txtTruckCounterTruckingOrder').attr('disabled', 'disabled');
            if (pCallback != null && pCallback != undefined)
                pCallback();
            //FadePageCover(false);
        }
        , null);


}
function TruckingOrder_GetKilometersDifference() {
    debugger;
    $("#txtKmDifference").val("");
    var _KilometersBefore = $("#txtTruckLastCounterTruckingOrder").val() == "" ? 0.0 : parseFloat($("#txtTruckLastCounterTruckingOrder").val());
    var _KilometersAfter = $("#txtTruckCounterTruckingOrder").val() == "" ? 0.0 : parseFloat($("#txtTruckCounterTruckingOrder").val());
    if (_KilometersAfter > 0)
        $("#txtKmDifference").val(parseFloat(_KilometersAfter - _KilometersBefore));
}
function PayablesAndReceivables_CalculateSummary() {
    debugger;

    var decTotalQuotationCost = 0;
    var decTotalCostWithoutVAT = 0;
    var decTotalCostWithVAT = 0;
    var decTotalSaleWithoutVAT = 0;
    var decTotalSaleWithVAT = 0;
    var decProfit = 0;
    $(".PayableAmountWithoutVAT").each(function () { //calculated from w/o VAT coz receivables still not taken its VAT (done in invoices)
        var value = $(this).text();
        var valExchangeRate = $(this.parentElement.getElementsByClassName('PayableExchangeRate')).text();
        // add only if the value is number
        if (!isNaN(value) && value.length != 0) {
            decTotalCostWithoutVAT += parseFloat(value) * parseFloat(valExchangeRate);
        }
    });
    $(".PayableCostAmount").each(function () { //calculated from w/o VAT coz receivables still not taken its VAT (done in invoices)
        var value = $(this).text();
        var valExchangeRate = $(this.parentElement.getElementsByClassName('PayableExchangeRate')).text();
        // add only if the value is number
        if (!isNaN(value) && value.length != 0) {
            decTotalCostWithVAT += parseFloat(value) * parseFloat(valExchangeRate);
        }
    });
    $(".PayableQuotationCost").each(function () { //calculated from w/o VAT coz receivables still not taken its VAT (done in invoices)
        var value = $(this).text();
        var valExchangeRate = $(this.parentElement.getElementsByClassName('PayableExchangeRate')).text();
        // add only if the value is number
        if (!isNaN(value) && value.length != 0) {
            decTotalQuotationCost += parseFloat(value) * parseFloat(valExchangeRate);
        }
    });
    debugger;
    $(".ReceivableAmountWithoutVAT").each(function () {
        var value = $(this).text();
        var valExchangeRate = $(this.parentElement.getElementsByClassName('ReceivableExchangeRate')).text();
        // add only if the value is number
        if (!isNaN(value) && value.length != 0) {
            decTotalSaleWithoutVAT += parseFloat(value) * parseFloat(valExchangeRate);
        }
    });
    $(".ReceivableSaleAmount").each(function () {
        var value = $(this).text();
        var valExchangeRate = $(this.parentElement.getElementsByClassName('ReceivableExchangeRate')).text();
        // add only if the value is number
        if (!isNaN(value) && value.length != 0) {
            decTotalSaleWithVAT += parseFloat(value) * parseFloat(valExchangeRate);
        }
    });

    var totalNolon = 0;
    var totalWithoutVatAndNolon = 0;
    $('#tblPayables  > tbody > tr').each(function () {

        if ($(this).find('td.IsExcludeInTruckingOrderPrint').text() == "false") {
            var value = $(this).find('td.PayableCostAmount').text();
            var valExchangeRate = $(this).find('td.PayableExchangeRate').text();
            totalNolon += parseFloat(value) * parseFloat(valExchangeRate);

            var valueWithoutVat = $(this).find('td.PayableAmountWithoutVAT').text() == '' ? 0 : $(this).find('td.PayableAmountWithoutVAT').text();

            totalWithoutVatAndNolon += parseFloat(valueWithoutVat) * parseFloat(valExchangeRate);

        }
    });

    $("#lblPayablesWithVATAndWithoutNolonInPayables").html(": " + totalNolon.toFixed(2).toString() + " " + $("#hDefaultCurrencyCode").val());
    $("#lblPayablesWithoutVATAndNolonInPayables").html(": " + totalWithoutVatAndNolon.toFixed(2).toString() + " " + $("#hDefaultCurrencyCode").val());

    $("#lblEstimatedPayablesInPayables").html(": " + decTotalQuotationCost.toFixed(2).toString() + " " + $("#hDefaultCurrencyCode").val());
    $("#lblEstimatedPayablesInReceivables").html(": " + decTotalQuotationCost.toFixed(2).toString() + " " + $("#hDefaultCurrencyCode").val());

    $("#lblPayablesWithoutVATInPayables").html(": " + decTotalCostWithoutVAT.toFixed(2).toString() + " " + $("#hDefaultCurrencyCode").val());
    $("#lblPayablesWithoutVATInReceivables").html(": " + decTotalCostWithoutVAT.toFixed(2).toString() + " " + $("#hDefaultCurrencyCode").val());

    $("#lblPayablesWithVATInPayables").html(": " + decTotalCostWithVAT.toFixed(2).toString() + " " + $("#hDefaultCurrencyCode").val());
    $("#lblPayablesWithVATInReceivables").html(": " + decTotalCostWithVAT.toFixed(2).toString() + " " + $("#hDefaultCurrencyCode").val());

    $("#lblReceivablesWithoutVATInPayables").html(": " + decTotalSaleWithoutVAT.toFixed(2).toString() + " " + $("#hDefaultCurrencyCode").val());
    $("#lblReceivablesWithoutVATInReceivables").html(": " + decTotalSaleWithoutVAT.toFixed(2).toString() + " " + $("#hDefaultCurrencyCode").val());

    $("#lblProfitInPayables").html(": " + (decTotalSaleWithoutVAT - decTotalCostWithoutVAT).toFixed(2).toString() + " " + $("#hDefaultCurrencyCode").val());
    $("#lblProfitInReceivables").html(": " + (decTotalSaleWithoutVAT - decTotalCostWithoutVAT).toFixed(2).toString() + " " + $("#hDefaultCurrencyCode").val());

    if (decTotalSaleWithoutVAT < decTotalCostWithoutVAT) {
        $("#lblProfitInPayables").removeClass("static-text-primary");
        $("#lblProfitInPayables").addClass("static-text-danger");
        $("#lblProfitInReceivables").removeClass("static-text-primary");
        $("#lblProfitInReceivables").addClass("static-text-danger");
    }
    else {
        $("#lblProfitInPayables").addClass("static-text-primary");
        $("#lblProfitInPayables").removeClass("static-text-danger");
        $("#lblProfitInReceivables").addClass("static-text-primary");
        $("#lblProfitInReceivables").removeClass("static-text-danger");
    }
}
//fill slPOLCountries and slPODCountries
function Routings_Countries_GetList(pPOLCountryID, pPODCountryID, callback) {//pID is used in case of editing to set the code or name
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithName(pPOLCountryID, "/api/Countries/LoadAll", "Select Country", "slRoutingsPOLCountries" + RoutingSuffix);
    GetListWithName(pPODCountryID, "/api/Countries/LoadAll", "Select Country", "slRoutingsPODCountries" + RoutingSuffix);
}
//POLorPOD: 1-POL 2-POD
function Routings_Ports_GetList(pID, pCountryID, POLorPOD, callback) { //all the commented COMMAND lines are to remove the IsPort condition, if u wanna return it back again just remove the comments of commands and comment the beside command if exists
    //parameters: ID, strFnName, First Row in select list, select list name, pWhereClause
    var pWhereClause = "";
    if (pCountryID != null) //this means editing
    {
        pWhereClause = " where IsPort = 1 and IsInactive = 0 and CountryID = " + pCountryID + " OR ( ID = " + pID + ") ";
        //pWhereClause = " where IsInactive = 0 and CountryID = " + pCountryID;
    }
    else //when changing the Country or Transport Type
    {
        pWhereClause = " where IsPort = 1 and IsInactive = 0 and CountryID = ";
        //pWhereClause = " where IsInactive = 0 and CountryID = ";
        if (POLorPOD == 1) //POL
            pWhereClause += ($('#slRoutingsPOLCountries' + RoutingSuffix + ' option:selected').val() == null || $('#slRoutingsPOLCountries' + RoutingSuffix + ' option:selected').val() == ""
                ? 0 : $('#slRoutingsPOLCountries' + RoutingSuffix + ' option:selected').val());
        else //POD
            pWhereClause += ($('#slRoutingsPODCountries' + RoutingSuffix + ' option:selected').val() == null || $('#slRoutingsPODCountries' + RoutingSuffix + ' option:selected').val() == ""
                ? 0 : $('#slRoutingsPODCountries' + RoutingSuffix + ' option:selected').val());
        pWhereClause += " OR ( ID = " + pID + ") ";
    }
    //if ($('input[name=cbRoutingTransportType' + RoutingSuffix + ']:checked').val() == 1)
    //    pWhereClause += " and IsOcean = 1 ";
    //if ($('input[name=cbRoutingTransportType' + RoutingSuffix + ']:checked').val() == 2)
    //    pWhereClause += " and IsAir = 1 ";
    //if ($('input[name=cbRoutingTransportType' + RoutingSuffix + ']:checked').val() == 3)
    //    pWhereClause += " and IsInland = 1 ";

    pWhereClause += " order by Name ";
    
    if (POLorPOD == 1) //POL
        //GetListWithCodeAndWhereClause(pID, "/api/Ports/LoadAll", "Select POL", "slRoutingsPOL", pWhereClause);
        GetListWithCodeAndNameAndWhereClause(pID, "/api/Ports/LoadAll", "Select POL", "slRoutingsPOL" + RoutingSuffix, pWhereClause, function () {
            $("#slTruckingOrderGateInPortTruckingOrder").html($("#slRoutingsPOL" + RoutingSuffix + "").html());
        });
    else
        //GetListWithCodeAndWhereClause(pID, "/api/Ports/LoadAll", "Select POD", "slRoutingsPOD", pWhereClause);
        GetListWithCodeAndNameAndWhereClause(pID, "/api/Ports/LoadAll", "Select POD", "slRoutingsPOD" + RoutingSuffix, pWhereClause, function () {
            $("#slTruckingOrderGateOutPortTruckingOrder").html($("#slRoutingsPOD" + RoutingSuffix + "").html());
        });
    debugger;
    
   
}
function Routings_Lines_GetList(pID, callback) {
    debugger;
    //parameters: ID, strFnName, First Row in select list, select list name
    var strFnName = "";
    var str1stRow = "";
    var pWhereClause = " WHERE 1=1 ORDER BY Name ";
    //if ($('input[name=cbRoutingTransportType' + RoutingSuffix + ']:checked').val() == 1
    //    || $('input[name=cbRoutingTransportType' + RoutingSuffix + ']:checked').val() == null) { //null is for case of first load
    //    strFnName = "/api/ShippingLines/LoadAll";
    //    str1stRow = "Select Shipping Line";
    //}
    //if ($('input[name=cbRoutingTransportType' + RoutingSuffix + ']:checked').val() == 2) {
    //    strFnName = "/api/Airlines/LoadAll";
    //    str1stRow = "Select Airline";
    //}
    //if ($('input[name=cbRoutingTransportType' + RoutingSuffix + ']:checked').val() == 3) {
    //    strFnName = "/api/Truckers/LoadAll";
    //    str1stRow = "Select Trucker";
    //}
    //if ($('input[name=cbRoutingTransportType' + RoutingSuffix + ']:checked').val() != 2)
    //    GetListWithNameAndWhereClause(pID, strFnName, str1stRow, "slRoutingsLines" + RoutingSuffix, pWhereClause);
    //else { //incase of Air to get the prefix for MAWB
    //    GetListWithNameAndPrefixAttr(pID, strFnName, str1stRow, "slRoutingsLines" + RoutingSuffix, pWhereClause, function () { Routings_SetAirlinePrefix(); });
    //}

    strFnName = "/api/Truckers/LoadAll";
    str1stRow = "Select Trucker";
    GetListWithNameAndWhereClause(pID, strFnName, str1stRow, "slRoutingsLines" + RoutingSuffix, pWhereClause);

    if (callback != null && callback != undefined) {
        callback();
    }
}
function Routings_Vessels_GetList(pID, pLineID, pSlName, callback) {
    debugger;
    var strFnName = "/api/Vessels/LoadAll";
    str1stRow = "Select Vessel";
    var pWhereClause = "";
    pWhereClause += " WHERE ID = " + pID;
    pWhereClause += " OR ShippingLineID = " + pLineID;
    pWhereClause += " OR ShippingLineID IS NULL ";
    pWhereClause += (pLineID == "" || pLineID == null ? " AND 1=2 " : ""); //to prevent getting any vessels in case of no line is choosen
    pWhereClause += " ORDER BY Name ";
    GetListWithNameAndWhereClause(pID, strFnName, str1stRow, pSlName, pWhereClause);
}
function Routings_AddVessel() {
    debugger;
    if (ValidateForm("form", "RoutingVesselModal")) {
        FadePageCover(true);
        var pParametersWithValues = {
            pCode: $("#txtRoutingsVesselCode").val().trim() == "" ? 0 : $("#txtRoutingsVesselCode").val().trim().toUpperCase()
            , pName: $("#txtRoutingsVesselName").val().trim() == "" ? 0 : $("#txtRoutingsVesselName").val().trim().toUpperCase()
            , pLocalName: $("#txtRoutingsVesselLocalName").val().trim() == "" ? 0 : $("#txtRoutingsVesselLocalName").val().trim().toUpperCase()
        };
        CallGETFunctionWithParameters("/api/Routings/AddVesselFromRoutings", pParametersWithValues
            , function (pData) {
                if (pData[0] == 0)
                    swal("Sorry", "Code and Name must be unique.");
                else {
                    FillListFromObject(pData[0], 2, "Select Vessel", "slRoutingVessels", pData[1], null);
                    jQuery("#RoutingVesselModal").modal("hide");
                }
                FadePageCover(false);
            }
            , null);
    }
}
/*OnChangeFunctions*/
//used to make sure that if MainCarraigeRoutingType is selected then the transportType cant be changed from whats in the operations table
function Routings_RoutingTypeChanged() {
    debugger;
    Routings_EnableDisableLines();
    $("#lblRoutingShown" + RoutingSuffix).html(": " + $("#slRoutingTypes" + RoutingSuffix + " option:selected").text());
    if ($("#slRoutingTypes" + RoutingSuffix + " option:selected").val() == MainCarraigeRoutingTypeID) {
        //if in the future i allowed changing transport type then i have to update FCL, LCL, FTL, LTL too
        Routings_SetCbRoutingTransportType($("#hTransportType").val());
        $("#hRoutingTransportType" + RoutingSuffix).val($("#hTransportType").val());
        Routings_TransportTypeChanged();
        Routings_DisableCbTransportType();
    }
    else
        Routings_EnableCbTransportType();
}
function Routings_TransportTypeChanged(pDontRefillList) {
    //set Ocean as the default Choice
    $("#hRoutingTransportType" + RoutingSuffix).val($('input[name=cbRoutingTransportType' + RoutingSuffix + ']:checked').val());
    Routings_TransportType_SetIconNameAndStyle();
    Routings_ShowHideVessels();
    //Routings_Ports_GetList(null, null, 1);
    //Routings_Ports_GetList(null, null, 2);

    //Routings_Lines_GetList(null, function () {
    //    if ($("#hRoutingTransportType" + RoutingSuffix).val() == OceanTransportType)
    //        Routings_Vessels_GetList(null, 0, "slRoutingVessels" + RoutingSuffix, null);
    //    else //to make value of 
    //        $("#slRoutingVessels" + RoutingSuffix).val("");
    //});
}
function Routings_slRoutingsLinesChanged() {
    if ($("#hRoutingTransportType" + RoutingSuffix).val() == OceanTransportType)
        Routings_Vessels_GetList(null, $("#slRoutingsLines" + RoutingSuffix).val(), "slRoutingVessels" + RoutingSuffix, null);
    else
        if ($("#hRoutingTransportType" + RoutingSuffix).val() == AirTransportType)
            Routings_SetAirlinePrefix();
}
/*EOF OnChangeFunctions*/
function Routings_DisableCbTransportType() {
    $("#secTransportType" + RoutingSuffix).addClass("hide"); //Islam asked to this section not disable
    $("#cbIsOceanRouting" + RoutingSuffix).attr('disabled', 'disabled');
    $("#cbIsAirRouting" + RoutingSuffix).attr('disabled', 'disabled');
    $("#cbIsInlandRouting" + RoutingSuffix).attr('disabled', 'disabled');
}
function Routings_EnableCbTransportType() {
    ////I disabled the transport type always to cancel this swap the commented with the uncommented
    //$("#secTransportType" + RoutingSuffix).removeClass("hide");
    //$("#cbIsOceanRouting" + RoutingSuffix).removeAttr('disabled');
    //$("#cbIsAirRouting" + RoutingSuffix).removeAttr('disabled');
    //$("#cbIsInlandRouting" + RoutingSuffix).removeAttr('disabled');
    $("#secTransportType" + RoutingSuffix).addClass("hide");
}
function Routings_EnableDisableLines() {
    if ($("#slRoutingTypes" + RoutingSuffix).val() == MainCarraigeRoutingTypeID && $("#hBLType").val() == constHouseBLType) {
        $("#slRoutingsLines" + RoutingSuffix).attr("disabled", "disabled");
        $("#slRoutingsLines" + RoutingSuffix).val("");
    }
    else
        $("#slRoutingsLines" + RoutingSuffix).removeAttr("disabled");
}
function Routings_SetCbRoutingTransportType(pOptionToSelect) {
    if (pOptionToSelect == OceanTransportType) {
        $("#cbIsOceanRouting" + RoutingSuffix).prop('checked', true);
        $("#cbIsAirRouting" + RoutingSuffix).prop('checked', false);
        $("#cbIsInlandRouting" + RoutingSuffix).prop('checked', false);
    }
    if (pOptionToSelect == AirTransportType) {
        $("#cbIsOceanRouting" + RoutingSuffix).prop('checked', false);
        $("#cbIsAirRouting" + RoutingSuffix).prop('checked', true);
        $("#cbIsInlandRouting" + RoutingSuffix).prop('checked', false);
    }
    if (pOptionToSelect == InlandTransportType || pOptionToSelect == CustomsClearanceTransportType/*to load truckers in case of clearance*/) {
        $("#cbIsOceanRouting" + RoutingSuffix).prop('checked', false);
        $("#cbIsAirRouting" + RoutingSuffix).prop('checked', false);
        $("#cbIsInlandRouting" + RoutingSuffix).prop('checked', true);
    }
}
function Routings_CheckDatesLogic() {
    var isCorrectLogic = true;
    if (
        (!isValidDate($("#txtETAPOLDate" + RoutingSuffix).val().trim(), 1) && $("#txtETAPOLDate" + RoutingSuffix).val().trim() != "")
        || (!isValidDate($("#txtATAPOLDate" + RoutingSuffix).val().trim(), 1) && $("#txtATAPOLDate" + RoutingSuffix).val().trim() != "")

        || (!isValidDate($("#txtLoadingDate").val().trim(), 1) && $("#txtLoadingDate").val().trim() != "")
        || (!isValidDate($("#txtUnloadingDate").val().trim(), 1) && $("#txtUnloadingDate").val().trim() != "")

        || (!isValidDate($("#txtExpectedArrival" + RoutingSuffix).val().trim(), 1) && $("#txtExpectedArrival" + RoutingSuffix).val().trim() != "")
        || (!isValidDate($("#txtExpectedDeparture" + RoutingSuffix).val().trim(), 1) && $("#txtExpectedDeparture" + RoutingSuffix).val().trim() != "")
        || (!isValidDate($("#txtActualArrival" + RoutingSuffix).val().trim(), 1) && $("#txtActualArrival" + RoutingSuffix).val().trim() != "")
        || (!isValidDate($("#txtActualDeparture" + RoutingSuffix).val().trim(), 1) && $("#txtActualDeparture" + RoutingSuffix).val().trim() != "")
        //|| (!isValidDate($("#txtMAWBDate" + RoutingSuffix).val().trim(), 1) && $("#txtMAWBDate" + RoutingSuffix).val().trim() != "")
        || (!isValidDate($("#txtOBLDate" + RoutingSuffix).val().trim(), 1) && $("#txtOBLDate" + RoutingSuffix).val().trim() != "")

        || (!isValidDate($("#txtTruckingOrderGateInDate" + RoutingSuffix).val().trim(), 1) && $("#txtTruckingOrderGateInDate" + RoutingSuffix).val().trim() != "")
        || (!isValidDate($("#txtTruckingOrderGateOutDate" + RoutingSuffix).val().trim(), 1) && $("#txtTruckingOrderGateOutDate" + RoutingSuffix).val().trim() != "")
        || (!isValidDate($("#txtTruckingOrderStuffingDate" + RoutingSuffix).val().trim(), 1) && $("#txtTruckingOrderStuffingDate" + RoutingSuffix).val().trim() != "")
        || (!isValidDate($("#txtTruckingOrderDeliveryDate" + RoutingSuffix).val().trim(), 1) && $("#txtTruckingOrderDeliveryDate" + RoutingSuffix).val().trim() != "")
    )
        isCorrectLogic = false;
    //uncomment if i want logic validation
    //else
    //    if ( //the 1st 2 conditions in each of the next 2 lines is coz incase of being empty the return value from ConvertDateFormat() fn is 1 and i dont need the condition
    //        (ConvertDateFormat($("#txtExpectedDeparture" + RoutingSuffix).val()) != 1 && ConvertDateFormat($("#txtActualDeparture" + RoutingSuffix).val()) != 1 && Date.prototype.compareDates(ConvertDateFormat($("#txtExpectedDeparture" + RoutingSuffix).val()), ConvertDateFormat($("#txtActualDeparture" + RoutingSuffix).val())) < 0)
    //        || (ConvertDateFormat($("#txtExpectedArrival" + RoutingSuffix).val()) != 1 && ConvertDateFormat($("#txtActualArrival" + RoutingSuffix).val()) != 1 && Date.prototype.compareDates(ConvertDateFormat($("#txtExpectedArrival" + RoutingSuffix).val()), ConvertDateFormat($("#txtActualArrival" + RoutingSuffix).val())) < 0)
    //        //the rest of the conditions are to make sure that arrival is after departure
    //        || (ConvertDateFormat($("#txtATAPOLDate" + RoutingSuffix).val()) != 1 && Date.prototype.compareDates(ConvertDateFormat($("#txtETAPOLDate" + RoutingSuffix).val()), ConvertDateFormat($("#txtATAPOLDate" + RoutingSuffix).val())) < 0)
    //        || (ConvertDateFormat($("#txtExpectedDeparture" + RoutingSuffix).val()) != 1 && Date.prototype.compareDates(ConvertDateFormat($("#txtATAPOLDate" + RoutingSuffix).val()), ConvertDateFormat($("#txtExpectedDeparture" + RoutingSuffix).val())) < 0)
    //        || (ConvertDateFormat($("#txtExpectedArrival" + RoutingSuffix).val()) != 1 && Date.prototype.compareDates(ConvertDateFormat($("#txtExpectedDeparture" + RoutingSuffix).val()), ConvertDateFormat($("#txtExpectedArrival" + RoutingSuffix).val())) < 0)
    //        || (ConvertDateFormat($("#txtExpectedArrival" + RoutingSuffix).val()) != 1 && Date.prototype.compareDates(ConvertDateFormat($("#txtActualDeparture" + RoutingSuffix).val()), ConvertDateFormat($("#txtExpectedArrival" + RoutingSuffix).val())) < 0)
    //        || (ConvertDateFormat($("#txtActualArrival" + RoutingSuffix).val()) != 1 && Date.prototype.compareDates(ConvertDateFormat($("#txtExpectedDeparture" + RoutingSuffix).val()), ConvertDateFormat($("#txtActualArrival" + RoutingSuffix).val())) < 0)
    //        || (ConvertDateFormat($("#txtActualArrival" + RoutingSuffix).val()) != 1 && Date.prototype.compareDates(ConvertDateFormat($("#txtActualDeparture" + RoutingSuffix).val()), ConvertDateFormat($("#txtActualArrival" + RoutingSuffix).val())) < 0)
    //       )
    //        isCorrectLogic = false;
    return isCorrectLogic;
}
//Set MainCarraigeRoutingType Always not to be deleted
function Routings_SetTableProperties() {
    //in case of connected prevent deleting Main Route
    //if ($("#hNumberOfHousesConnected").val() > 0 || $("#hMasterOperationID").val() > 0) {
    $("#tblRoutings tr[val=" + MainCarraigeRoutingTypeID.toString() + "] input:checkbox").attr("disabled", "disabled");
    $("#tblRoutings tr[val=" + MainCarraigeRoutingTypeID.toString() + "] input:checkbox").removeAttr("checked");
    //}
    //else
    //    $("#tblRoutings tr[val=" + MainCarraigeRoutingTypeID.toString() + "] input:checkbox").removeAttr("disabled");
}
//set controls in case of Master && Connected when calling Routing Modal (note:if this fn is called then i am sure its main isa)
function Routings_Master_And_Connected_Properties() {
    //Routings_DisablePorts();
    Routings_EnableDates();
    if ($("#hMAWBStockID").val() == "0")
        Routings_EnableLines();
    else
        Routings_DisableLines();
}
//set controls in case of Master && Not Connected when calling Routing Modal (note:if this fn is called then i am sure its main isa)
function Routings_Master_And_NotConnected_Properties() {
    Routings_EnablePorts();
    Routings_EnableDates();
    if ($("#hMAWBStockID").val() == "0")
        Routings_EnableLines();
    else
        Routings_DisableLines();
}
//set controls in case of House && Connected when calling Routing Modal (note:if this fn is called then i am sure its main isa)
function Routings_House_And_Connected_Properties() {
    //Routings_DisablePorts();
    Routings_DisableDates();
    Routings_DisableLines();
}
//set controls in case of House && Not Connected when calling Routing Modal (note:if this fn is called then i am sure its main isa)
function Routings_House_And_NotConnected_Properties() {
    Routings_EnablePorts();
    Routings_DisableDates();
    Routings_DisableLines();
}
//called in case of Master & Main Carraige Route
function Routings_Show_Suitable_MasterBL() {
    if ($("#cbIsAir").prop("checked")) { //Air so show MAWB
        $("#divOBL" + RoutingSuffix).addClass("hide");
        $("#divOBLDate" + RoutingSuffix).addClass("hide");
        $("#divMAWBSuffix" + RoutingSuffix).removeClass("hide");
        $("#divMAWBPrefix" + RoutingSuffix).removeClass("hide");
        $("#divMAWBDate" + RoutingSuffix).removeClass("hide");
        $("#divBtnStock" + RoutingSuffix).removeClass("hide");
    }
    else { //Master but not air so show OBL
        $("#divOBL" + RoutingSuffix).removeClass("hide");
        $("#divOBLDate" + RoutingSuffix).removeClass("hide");
        $("#divMAWBSuffix" + RoutingSuffix).addClass("hide");
        $("#divMAWBPrefix" + RoutingSuffix).addClass("hide");
        $("#divMAWBDate" + RoutingSuffix).addClass("hide");
        $("#divBtnStock" + RoutingSuffix).addClass("hide");
    }
}
function Routings_HideMasterBL() {
    $("#divOBL" + RoutingSuffix).addClass("hide");
    $("#divOBLDate" + RoutingSuffix).addClass("hide");
    $("#divMAWBSuffix" + RoutingSuffix).addClass("hide");
    $("#divMAWBPrefix" + RoutingSuffix).addClass("hide");
    $("#divMAWBDate" + RoutingSuffix).addClass("hide");
    $("#divBtnStock" + RoutingSuffix).addClass("hide");
}
function Routings_EnablePorts() {
    $("#slRoutingsPOLCountries" + RoutingSuffix).removeAttr("disabled");
    $("#slRoutingsPODCountries" + RoutingSuffix).removeAttr("disabled");
    $("#slRoutingsPOL" + RoutingSuffix).removeAttr("disabled");
    $("#slRoutingsPOD" + RoutingSuffix).removeAttr("disabled");
}
function Routings_DisablePorts() {
    $("#slRoutingsPOLCountries" + RoutingSuffix).attr("disabled", "disabled");
    $("#slRoutingsPODCountries" + RoutingSuffix).attr("disabled", "disabled");
    $("#slRoutingsPOL" + RoutingSuffix).attr("disabled", "disabled");
    $("#slRoutingsPOD" + RoutingSuffix).attr("disabled", "disabled");
}
function Routings_EnableDates() {
    $("#txtETAPOLDate" + RoutingSuffix).removeAttr("disabled");
    $("#txtATAPOLDate" + RoutingSuffix).removeAttr("disabled");
    $("#txtExpectedDeparture" + RoutingSuffix).removeAttr("disabled");
    $("#txtActualDeparture" + RoutingSuffix).removeAttr("disabled");
    $("#txtExpectedArrival" + RoutingSuffix).removeAttr("disabled");
    $("#txtActualArrival" + RoutingSuffix).removeAttr("disabled");
    $("#slRoutingsLines" + RoutingSuffix).removeAttr("disabled");
}
function Routings_DisableDates() {
    $("#txtETAPOLDate" + RoutingSuffix).attr("disabled", "disabled");
    $("#txtATAPOLDate" + RoutingSuffix).attr("disabled", "disabled");
    $("#txtExpectedDeparture" + RoutingSuffix).attr("disabled", "disabled");
    $("#txtActualDeparture" + RoutingSuffix).attr("disabled", "disabled");
    $("#txtExpectedArrival" + RoutingSuffix).attr("disabled", "disabled");
    $("#txtActualArrival" + RoutingSuffix).attr("disabled", "disabled");
    $("#slRoutingsLines" + RoutingSuffix).attr("disabled", "disabled");
}
function Routings_EnableLines() {
    $("#slRoutingsLines" + RoutingSuffix).removeAttr("disabled");
    $("#slRoutingVessels" + RoutingSuffix).removeAttr("disabled");
    $("#txtRoutingVoyageOrTruckNumber" + RoutingSuffix).removeAttr("disabled");
}
function Routings_DisableLines() {
    $("#slRoutingsLines" + RoutingSuffix).attr("disabled", "disabled");
    $("#slRoutingVessels" + RoutingSuffix).attr("disabled", "disabled");
    $("#txtRoutingVoyageOrTruckNumber" + RoutingSuffix).attr("disabled", "disabled");
}
function Routings_ShowHideVessels() {
    debugger;
    if ($("#hRoutingTransportType" + RoutingSuffix).val() == OceanTransportType) {
        $("#divRoutingVessels" + RoutingSuffix).removeClass("hide");
    }
    else {
        $("#divRoutingVessels" + RoutingSuffix).addClass("hide");
        $("#slRoutingVessels" + RoutingSuffix).val("");
        Routings_Vessels_GetList(null, null, "slRoutingVessels" + RoutingSuffix, null);
    }
}
//function Routings_ShowHideOwnedByCompanyProperties(pIsCompanyOwned) {
//    debugger;
//    //if ($("#cbTruckingOrderIsOwnedByCompany").prop("checked") || pIsCompanyOwned) {
//    //    $(".classOwnedByCompany").removeClass("hide");
//    //    $(".classOwnedBySupplier").addClass("hide");
//    //}
//    //else {
//    //    $(".classOwnedByCompany").addClass("hide");
//    //    $(".classOwnedBySupplier").removeClass("hide");
//    //}
//}
function Routings_ShowHidePickupAndDeliveryAddress(pFlag) {
    debugger;
    if (pFlag) {
        $("#divPickupAddress" + RoutingSuffix).removeClass("hide");
        $("#divDeliveryAddress" + RoutingSuffix).removeClass("hide");
    }
    else {
        $("#divPickupAddress" + RoutingSuffix).addClass("hide");
        $("#divDeliveryAddress" + RoutingSuffix).addClass("hide");
    }
    if (pDefaults.UnEditableCompanyName == "ELI")
        $(".classShowForELI").removeClass("hide");
}
function Routings_EnableMAWBSuffix() {
    $("#txtMAWBSuffix" + RoutingSuffix).removeAttr("disabled");
}
function Routings_DisableMAWBSuffix() {
    $("#txtMAWBSuffix" + RoutingSuffix).attr("disabled", "disabled");
}
function Routings_Add_DataTarget_Attr_To_btnMAWBStock() {
    $("#btnMAWBStock" + RoutingSuffix).attr("data-target", "#MAWBStockSelectModal");
}
function Routings_Remove_DataTarget_Attr_From_btnMAWBStock() {
    $("#btnMAWBStock" + RoutingSuffix).removeAttr("data-target");
}
function Routings_EnableControlsForNewAdd() {
    $("#slRoutingTypes" + RoutingSuffix).removeAttr("disabled");
    Routings_EnablePorts();
    Routings_EnableDates();
    Routings_EnableLines();
}
function Routings_Set_btnMAWBStockCaption() {
    debugger;
    if ($("#hMAWBStockID").val() != "0")
        $("#btnMAWBStock" + RoutingSuffix).text("Return To Stock");
    else
        $("#btnMAWBStock" + RoutingSuffix).text("Get From Stock");
}
function Routings_SetAirlinePrefix() {
    if ($("#slRoutingsLines" + RoutingSuffix).val() == "")
        $("#btnMAWBStock" + RoutingSuffix).attr("disabled", "disabled");
    else
        $("#btnMAWBStock" + RoutingSuffix).removeAttr("disabled");
    $("#txtMAWBPrefix" + RoutingSuffix).val($("#slRoutingsLines" + RoutingSuffix + " option:selected").attr("Prefix"));
}
function Routings_GetMasterBL() {
    //Not House (i.e. Master || Direct) && Air && Main Carraige && NOT Empty
    if ($("#hBLType").val() != constHouseBLType
        && $("#hTransportType").val() == AirTransportType
        && $('#slRoutingTypes' + RoutingSuffix + ' option:selected').val() == MainCarraigeRoutingTypeID
        && $("#txtMAWBSuffix" + RoutingSuffix).val().trim() != "" && $("#txtMAWBSuffix" + RoutingSuffix).val().trim() != "0")
        return $("#txtMAWBPrefix" + RoutingSuffix).val().toString() + "-" + $("#txtMAWBSuffix" + RoutingSuffix).val().trim().toUpperCase().toString();
    else //Not House (i.e. Master or Direct) && NOT Air && NOT Empty
        if ($("#hBLType").val() != constHouseBLType
            && $("#hTransportType").val() != AirTransportType
            && $('#slRoutingTypes' + RoutingSuffix + ' option:selected').val() == MainCarraigeRoutingTypeID
            && $("#txtOBL" + RoutingSuffix).val().trim() != "")
            return $("#txtOBL" + RoutingSuffix).val().trim().toUpperCase().toString();
        else //House
            if ($("#hBLType").val() == constHouseBLType)
                return "0";
    return "0";
}
//used to set the pBLDate parameter in case of updating because its value may come from $("#txtOBLDate") or $("#txtMAWBDate")
function Routings_GetpBLDate() {
    if ($("#hBLType").val() != constHouseBLType && $("#slRoutingTypes" + RoutingSuffix + " option:selected").val() == MainCarraigeRoutingTypeID)
        if ($("#cbIsAir").prop("checked"))
            return ($("#txtMAWBDate" + RoutingSuffix).val() == "" ? "NULL" : ConvertDateFormat($("#txtMAWBDate" + RoutingSuffix).val()));
        else
            return ($("#txtOBLDate" + RoutingSuffix).val() == "" ? "NULL" : ConvertDateFormat($("#txtOBLDate" + RoutingSuffix).val()));
    else
        return "NULL";
}
function Routings_GenerateMissingRoutes() {
    debugger;
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/Routings/GenerateMissingRoutes", { pOperationIDToRestoreRoute: $("#hOperationID").val() }
        , function (pData) {
            TruckingOrders_BindTableRows(JSON.parse(pData[0]));
            FadePageCover(false);
        }, null);
}
/*****************************Customs Clearance*************************************/
function RoutingsCC_OpenCustomsClearanceTrackingStageModal() {
    debugger;
    if ($("#hRoutingIDCustomsClearance").val() == "")
        swal("Sorry", "Please, save record first.");
    else {
        jQuery("#CustomsClearanceTrackingModal").modal("show");
        //$("#tblCustomsClearanceTracking tbody").html($("#tblTracking tbody").html()); //written in Tracking_BindTableRows
    }
}
function RoutingsCC_Print() {
    debugger;
    swal("Sorry", "Under Development.");
}
function RoutingsCC_OpenCustomsTranslationModal() {
    debugger;
    swal("Sorry", "Under Development.");
}
function RoutingsCC_OpenDeliveryOrderReceiptModal() {
    debugger;
    swal("Sorry", "Under Development.");
}
function RoutingsCC_CalculateCFValue() {
    debugger;
    var _CCAFreight = $("#txtCCAFreight").val().trim() == "" ? 0 : parseFloat($("#txtCCAFreight").val().trim());
    var _CCAFOB = $("#txtCCAFOB").val().trim() == "" ? 0 : parseFloat($("#txtCCAFOB").val().trim());
    var _CCACFValue = (_CCAFreight + _CCAFOB).toFixed(2);
    $("#txtCCACFValue").val(_CCACFValue);
    return _CCACFValue;
}
/*****************************************Trucking Order Cargo********************************/
function Print_TruckingOrder(pID, pOption) {
    debugger;
    if (pID == 0) //pID=0 this means print is pressed from modal
        pID = $("#hID").val();
    if (pID == "")
        swal("Sorry", "Please, save before printing.");
    else {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/TruckingOrders/GetPrintedData"
            , { pRoutingID: pID }
            , function (pData) {
                if (pDefaults.UnEditableCompanyName == "CAL"
                    && (glbCallingControl == "FleetTransportOrder" || glbCallingControl == "FleetTransportOrderSupplier"))
                    FleetTransportOrder_Draw(pData, pOption);
                else {
                    PrintDefault(pData);
                    FadePageCover(false);
                }
            }
            , null
        );
    }
}
function PrintDefault(pData) {
    debugger;
    let pDefaults = JSON.parse(pData[0]);
    let pRoutings = JSON.parse(pData[1]);
    let pOperationHeader = JSON.parse(pData[2]);
    let pPayables = JSON.parse(pData[3]);
    let pCustomer = JSON.parse(pData[4]);
    let pTruckingOrderContainer = JSON.parse(pData[6]);

    let Distance = 0;
    if (pRoutings.TruckCounter != "" && pRoutings.LastTruckCounter != "")
        Distance = parseFloat(pRoutings.TruckCounter) - parseFloat(pRoutings.LastTruckCounter);

    let pContainers = "";
    for (var i = 0; i < pTruckingOrderContainer.length; i++) {
        pContainers += ", " + pTruckingOrderContainer[i].ContainerNO;
    }
    if (pDefaults.UnEditableCompanyName == "ILS" || pDefaults.UnEditableCompanyName == "ILSEG") {
        debugger;
        var ReportHTML = '';
        ReportHTML += '     <head><title>' + 'Shipment Order' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';

        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-12 text-center m-t" style="font-size:26px;"><b>' + ' Shipment Order ' + '</b>' + pOperationHeader.RepDirectionTypeShown + "-" + pRoutings.TruckingOrderCode + '</div>';
        ReportHTML += '             <div class="col-xs-12 text-center m-t-n text-ul"><h3><b>' + pDefaults.CompanyName + '</b></h3></div>';

        ReportHTML += '             <div class="col-xs-12 text-right m-t-lg" style="font-size:14px;">' + (pRoutings.TruckerName == 0 ? "" : pRoutings.TruckerName) + '<b><span class="float-right">' + ' / مقاول النقل   ' + '</span></b></div>';

        ReportHTML += '             <div class="col-xs-12 text-right m-t-lg" style="font-size:14px;">' + '<b><span class="float-right">' + ' بيانات الشهادة   ' + '</span></b></div>';

        ReportHTML += '             <table id="tblPaymentHeaderData" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;font-size:115%;">'; // table-hover
        ReportHTML += '                 <tr>';
        ReportHTML += '                     <td>';
        ReportHTML += '                         <div class="col-xs-6 text-right m-t" style="font-size:14px;">' + (pRoutings.ContainerTypes) + '<b><span class="float-right">' + ' : نوع الحاويات   ' + '</span></b></div>';
        ReportHTML += '                         <div class="col-xs-6 text-right m-t" style="font-size:14px;">' + (pOperationHeader.CertificateNumber) + '<b><span class="float-right">' + ' : رقم الشهادة   ' + '</span></b></div>';

        ReportHTML += '                         <div class="col-xs-6 text-right m-t" style="font-size:14px;">' + (pRoutings.GateOutDate) + '<b><span class="float-right">' + ' : تاريخ التواجد   ' + '</span></b></div>';
        ReportHTML += '                         <div class="col-xs-6 text-right m-t" style="font-size:14px;">' + (pOperationHeader.MasterBL) + '<b><span class="float-right">' + ' : رقم البوليصة   ' + '</span></b></div>';

        ReportHTML += '                         <div class="col-xs-6 text-right m-t" style="font-size:14px;">' + (pRoutings.LoadingTime) + '<b><span class="float-right">' + ' : ميعاد التواجد   ' + '</span></b></div>';
        ReportHTML += '                         <div class="col-xs-6 text-right m-t" style="font-size:14px;">' + (pRoutings.BookingNumber) + '<b><span class="float-right">' + ' : رقم الحجز   ' + '</span></b></div>';

        ReportHTML += '                         <div class="col-xs-6 text-right m-t" style="font-size:14px;">' + (pRoutings.GateInDate) + '<b><span class="float-right">' + ' : FreeTime / Cutoff    ' + '</span></b></div>';
        ReportHTML += '                         <div class="col-xs-6 text-right m-t" style="font-size:14px;">' + (pRoutings.ContainersCount) + '<b><span class="float-right">' + ' : عدد الحاويات   ' + '</span></b></div>';

        ReportHTML += '                         <div class="col-xs-6 text-right m-t" style="font-size:14px;">' + '' + '<b><span class="float-right">' + '  ' + '</span></b></div>';
        ReportHTML += '                         <div class="col-xs-6 text-right m-t" style="font-size:14px;">' + (pRoutings.StuffingDate) + '<b><span class="float-right">' + ' : تاريخ السحب    ' + '</span></b></div>';

        ReportHTML += '                     </td>';
        ReportHTML += '                 </tr>';
        ReportHTML += '             </table>';



        ReportHTML += '             <div class="col-xs-12 text-right m-t-lg" style="font-size:14px;">' + '<b><span class="float-right">' + ' بيانات العميل   ' + '</span></b></div>';

        ReportHTML += '             <table id="tblPaymentHeaderData" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;font-size:115%;">'; // table-hover
        ReportHTML += '                 <tr>';
        ReportHTML += '                     <td>';

        ReportHTML += '                         <div class="col-xs-6 text-right m-t" style="font-size:14px;">' + (pRoutings.ContactPerson == 0 ? "" : pRoutings.ContactPerson) + '<b><span class="float-right">' + ' :  اسم مسئول المخزن   ' + '</span></b></div>';
        ReportHTML += '                         <div class="col-xs-6 text-right m-t" style="font-size:14px;">' + (pRoutings.ClientName) + '<b><span class="float-right">' + ' : اسم العميل   ' + '</span></b></div>';

        ReportHTML += '                         <div class="col-xs-6 text-right m-t" style="font-size:14px;">' + (pRoutings.ContactPersonPhones == 0 ? "" : pRoutings.ContactPersonPhones) + '<b><span class="float-right">' + ' : رقم مسئول المخزن   ' + '</span></b></div>';
        ReportHTML += '                         <div class="col-xs-6 text-right m-t" style="font-size:14px;">' + (pRoutings.PickupAddress == 0 ? "" : pRoutings.PickupAddress) + '<b><span class="float-right">' + ' : العنوان   ' + '</span></b></div>';
        ReportHTML += '                     </td>';
        ReportHTML += '                 </tr>';
        ReportHTML += '             </table>';

        ReportHTML += '             <table id="tblNotes" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;font-size:115%;">'; // table-hover
        ReportHTML += '                 <tr>';
        ReportHTML += '                     <td>';
        ReportHTML += '                         <div class="col-xs-12 text-right" style="font-size:14px;">' + (pRoutings.Notes == 0 ? "" : pRoutings.Notes) + '<b><span class="float-right">' + ' : ملاحظات   ' + '</span></b></div>';
        ReportHTML += '                     </td>';
        ReportHTML += '                 </tr>';
        ReportHTML += '             </table>';

        ReportHTML += '             <table id="tblTruckingOrderContainers" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;font-size:115%;">'; // table-hover
        ReportHTML += '                 <tr>';
        ReportHTML += '                     <td>';
        ReportHTML += '                         <div class="col-xs-12 text-right" style="font-size:14px;">' + pContainers + '<b><span class="float-right">' + ' : حاويات   ' + '</span></b></div>';
        ReportHTML += '                     </td>';
        ReportHTML += '                 </tr>';
        ReportHTML += '             </table>';

        ReportHTML += '         </body>';

        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        //ReportHTML += '         <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        ReportHTML += '     </footer>';

        ReportHTML += '</html>';
    }
    else {
        debugger;
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html dir="rtl"> ';
        ReportHTML += '     <head><title>' + '' //$("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.TableOrViewName").text() 
            + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';

        //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ShowHeader input[type=checkbox]").prop("checked")) {
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-12 text-center m-t" style="font-size:26px;"><b>' + ' Shipment Order ' + '</b>' + '' + pRoutings.TruckingOrderCode + '</div>';
        ReportHTML += '             <div class="col-xs-12 text-center m-t-n text-ul"><h3><b>' + pDefaults.CompanyName + '</b></h3></div>';
        //}      
        //else 
        //header not printed so leave place for header on the original company paper
        //ReportHTML += '             <div class="col-xs-12 text-center text-ul"></br></br><h2><b>' + ' تكليف نقل ' + '-' + ($("#cbPrintAsBosla").prop("checked") ? '  بوصلة  ' : '  شهادة  ') + '</b></h2></div>';
        //if (pDefaults.UnEditableCompanyName == "DSE" || pDefaults.UnEditableCompanyName == "DSC")
        //    ReportHTML += '             <div class="col-xs-12"><b>Ref. </b>' + (pOperationHeader.Reference == 0 ? '' : pOperationHeader.Reference) + '</div>';
        //ReportHTML += '             <div class="col-xs-6 text-right" style="font-size:14px;">' + pTruckingOrderGateOutPort + '<b><span class="float-right">' + ' : سحب ميناء   ' + '</span></b></div>';
        //ReportHTML += '             <div class="col-xs-6 text-right" style="font-size:14px;">' + pTruckingOrderGateInPort + '<b><span class="float-right">' + ' : دخول ميناء   ' + '</span></b></div>';
        //ReportHTML += '             <div class="col-xs-6 text-right" style="font-size:14px;">' + (pOperationHeader.Code == 0 ? pOperationHeader.MasterOperationCode : pOperationHeader.Code) + '<b><span class="float-right">' + ' : رقم العملية   ' + '</span></b></div>';
        //ReportHTML += '             <div class="col-xs-6 text-right" style="font-size:14px;">' + pTruckingOrderBookingNumber + '<b><span class="float-right">' + ' : رقم الحجز   ' + '</span></b></div>';
        //ReportHTML += '             <div class="col-xs-12 text-right m-t-lg" style="font-size:14px;">' + pTruckingOrderTruckerName + '<b><span class="float-right">' + ' / السادة شركة   ' + '</span></b></div>';
        //ReportHTML += '             <div class="col-xs-12 text-center" style="font-size:16px;">' + '<b>' + ' ،،، تحية طيبة وبعد   ' + '</b></div>';
        //ReportHTML += '             <div class="col-xs-12 text-right m-t-lg" style="font-size:14px;">' + pTruckingOrderQuantity + '<b> <span class="float-right">' + ' : الرجاء التكرم بعمل اللازم لنقل   ' + '<span></b></div>';
        ////ReportHTML += '             <div class="col-xs-12 text-right" style="font-size:14px;">' + pTruckingOrderClientName + '<b><span class="float-right">' + ' / باسم شركة   ' + '</span></b></div>';
        //if (pDefaults.UnEditableCompanyName == "CQL") {
        //    if (pOperationHeader.DirectionType == 2)//Export
        //        ReportHTML += '             <div class="col-xs-12 text-right" style="font-size:14px;">' + (pOperationHeader.ShipperLocalName == 0 ? "" : pOperationHeader.ShipperLocalName) + '<b><span class="float-right">' + ' / باسم شركة   ' + '</span></b></div>';
        //    else if (pOperationHeader.DirectionType == 1)//Import
        //        ReportHTML += '             <div class="col-xs-12 text-right" style="font-size:14px;">' + (pOperationHeader.ConsigneeLocalName == 0 ? "" : pOperationHeader.ConsigneeLocalName) + '<b><span class="float-right">' + ' / باسم شركة   ' + '</span></b></div>';
        //}
        //else
        ReportHTML += '                 <table id="tblPaymentHeaderData" class="table table-striped text-sm " style="font-size:115%;">'; // b-t b-light table-hover
        ReportHTML += '                     <thead>';
        ReportHTML += '                         <td>';
        ReportHTML += '             <div class="col-xs-3 text-right" style="font-size:14px;">' + '<span class="">' + pRoutings.GateInDate + '</span></div>';
        ReportHTML += '             <div class="col-xs-3 text-right" style="font-size:14px;">' + '<span class="">' + '  تاريخ الرجوع :  ' + '</span></div>';
        ReportHTML += '             <div class="col-xs-3 text-right" style="font-size:14px;">' + '<span class=""> ' + pRoutings.GateOutDate + '</span></div>';
        ReportHTML += '             <div class="col-xs-3 text-right" style="font-size:14px;">' + '<span class="">' + '  تاريخ الخروج :  ' + '</span></div>';


        // ELC Variables
        let FirstSN = "";
        let FirstDriverName = "";
        let FirstDriverPhone = "";
        let FirstTruckNo = "";
        if (($("#RoutingModalTruckingOrder").attr('aria-hidden') == "false") && (GetAllSelectedIDsAsString('tblDetails') != "")) {
            // means if modal is open and the user is selecting some rows
            let AllSelectedIDsAsString = GetAllSelectedIDsAsString('tblDetails');
            let AllSelectedIDsAsArray = AllSelectedIDsAsString.split(",");
            pContainers = "";
            AllSelectedIDsAsArray.forEach((item, index) => {
                if (index == 0) {
                    FirstSN = $("#tblDetails tbody #" + item + " .SN input").val().trim();
                    FirstDriverName = $("#tblDetails tbody #" + item + " .DriverName input").val().trim();
                    FirstDriverPhone = $("#tblDetails tbody #" + item + " .Phone input").val().trim();
                    FirstTruckNo = $("#tblDetails tbody #" + item + " .TruckNo input").val().trim();
                }
                pContainers += (pContainers == "" ? "" : ",") + ($("#tblDetails tbody #" + item + " .ContainerNO input").val().trim());

            });

        } else {
            // means if printing from outside the modal or no rows are selected
            if (pTruckingOrderContainer.length > 0) {
                FirstSN = pTruckingOrderContainer[0].SN;
                FirstDriverName = pTruckingOrderContainer[0].DriverName;
                FirstDriverPhone = pTruckingOrderContainer[0].Phone;
                FirstTruckNo = pTruckingOrderContainer[0].TruckNo;
            }
        }





        if (pDefaults.UnEditableCompanyName == "ELC") {
            ReportHTML += '             <div class="col-xs-9 text-right" style="font-size:14px;">' + '<span class="">' + (FirstSN == 0 ? "" : FirstSN) + '</span></div>';
            ReportHTML += '             <div class="col-xs-3 text-right" style="font-size:14px;">' + '<span class="">' + ' رقم البوليصة' + '</span></div>';
        } else {
            ReportHTML += '             <div class="col-xs-9 text-right" style="font-size:14px;">' + '<span class="">' + (pRoutings.BillNumber == 0 ? "" : pRoutings.BillNumber) + '</span></div>';
            ReportHTML += '             <div class="col-xs-3 text-right" style="font-size:14px;">' + '<span class="">' + ' رقم البوليصة' + '</span></div>';
        }

        ReportHTML += '             <div class="col-xs-9 text-right" style="font-size:14px;">' + (pRoutings.ClientName == 0 ? "" : pRoutings.ClientName) + '<span class="">' + '</span></div>';
        ReportHTML += '             <div class="col-xs-3 text-right" style="font-size:14px;">' + ' اسم العميل' + '<span class="">' + '</span></div>';

        ReportHTML += '             <div class="col-xs-3 text-right" style="font-size:14px;">' + '<span class="">' + (pRoutings.EquipmentModelName == 0 ? "" : pRoutings.EquipmentModelName) + '</span></div>';
        ReportHTML += '             <div class="col-xs-3 text-right" style="font-size:14px;">' + '<span class="">' + ' نوع المركبة' + '</span></div>';


        ReportHTML += '             <div class="col-xs-3 text-right" style="font-size:14px;">' + (pRoutings.Notes == 0 ? "" : pRoutings.Notes) + '<span class="">' + '</span></div>';
        ReportHTML += '             <div class="col-xs-3 text-right" style="font-size:14px;">' + ' ملاحظات' + '<span class="">' + '</span></div>';

        ReportHTML += '             <div class="col-xs-9 text-right" style="font-size:14px;">' + '<span class="">' + (pRoutings.DivisionName == 0 ? "" : pRoutings.DivisionName) + '</span></div>';
        ReportHTML += '             <div class="col-xs-3 text-right" style="font-size:14px;">' + '<span class="">' + ' القطاع' + '' + '</span></div>';

        if (pDefaults.UnEditableCompanyName == "ELC") {
            ReportHTML += '             <div class="col-xs-9 text-right" style="font-size:14px;">' + '<span class="">' + (FirstDriverName == 0 ? "" : FirstDriverName) + '</span></div>';
            ReportHTML += '             <div class="col-xs-3 text-right" style="font-size:14px;">' + '<span class="">' + ' السائق' + '</span></div>';

            ReportHTML += '             <div class="col-xs-9 text-right" style="font-size:14px;">' + '<span class="">' + (FirstDriverPhone == 0 ? "" : FirstDriverPhone) + '</span></div>';
            ReportHTML += '             <div class="col-xs-3 text-right" style="font-size:14px;">' + '<span class="">' + ' رقم التليفون' + '</span></div>';

            ReportHTML += '             <div class="col-xs-9 text-right" style="font-size:14px;">' + '<span class="">' + (FirstTruckNo == 0 ? "" : FirstTruckNo) + '</span></div>';
            ReportHTML += '             <div class="col-xs-3 text-right" style="font-size:14px;">' + '<span class="">' + ' رقم الشاحنة' + '</span></div>';

            ReportHTML += '             <div class="col-xs-9 text-right" style="font-size:14px;">' + '<span class="">' + (pContainers == 0 ? "" : pContainers) + '</span></div>';
            ReportHTML += '             <div class="col-xs-3 text-right" style="font-size:14px;">' + '<span class="">' + ' حاويات' + '</span></div>';


        } else {
            ReportHTML += '             <div class="col-xs-9 text-right" style="font-size:14px;">' + '<span class="">' + (pRoutings.DriverName == 0 ? (pRoutings.EquipmentDriverName == 0 ? "" : pRoutings.EquipmentDriverName) : pRoutings.DriverName) + '</span></div>';
            ReportHTML += '             <div class="col-xs-3 text-right" style="font-size:14px;">' + '<span class="">' + ' السائق' + '</span></div>';
        }


        ReportHTML += '             <div class="col-xs-9 text-right" style="font-size:14px;">' + '<span class="">' + pRoutings.CreatorName + '</span></div>';
        ReportHTML += '             <div class="col-xs-3 text-right" style="font-size:14px;">' + '<span class="">' + ' أنشأ أمر النقل ' + '</span></div>';

        ReportHTML += '                         </td>';
        ReportHTML += '                     </thead>';
        ReportHTML += '                 </table>';

        ReportHTML += '    <br> ';
        ReportHTML += '             <div class="col-xs-12 text-right" style="font-size:14px;">' + '' + '<span class="">' + ' المناطق والعملاء ' + '</span></div>';
        ReportHTML += '                 <table id="tblPaymentHeaderData" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;font-size:115%;">'; // table-hover
        ReportHTML += '                     <thead>';
        ReportHTML += '                         <td>';
        //ReportHTML += '                             <div class="col-xs-3 text-right">' + (pRoutings.FirstCuringArea == 0 && pDefaults.UnEditableCompanyName == "GBL" ? (pRoutings.GateOutPortName == 0 ? "" : pRoutings.GateOutPortName) : pRoutings.FirstCuringArea) + '</div>';
        ReportHTML += '                             <div class="col-xs-3 text-right">' + (pRoutings.PODName == 0 ? "" : pRoutings.PODName) + '</div>';
        ReportHTML += '                             <div class="col-xs-3 text-right">أول منطقة تعتيق: ' + '</div>';

        //ReportHTML += '                             <div class="col-xs-3 text-right">' + (pRoutings.LoadingZone == 0 && pDefaults.UnEditableCompanyName == "GBL" ? (pRoutings.GateInPortName == 0 ? "" : pRoutings.GateInPortName) : pRoutings.LoadingZone) + '</div>';
        ReportHTML += '                             <div class="col-xs-3 text-right">' + (pRoutings.POLName == 0 ? "" : pRoutings.POLName) + '</div>';
        ReportHTML += '                             <div class="col-xs-3 text-right">منطقة التحميل: ' + '</div>';

        ReportHTML += '                             <div class="col-xs-3 text-right">' + '' + (pRoutings.ThirdCuringArea == 0 ? "" : pRoutings.ThirdCuringArea) + '</div>';
        ReportHTML += '                             <div class="col-xs-3 text-right">ثالث منطقة تعتيق: ' + '' + '</div>';

        ReportHTML += '                             <div class="col-xs-3 text-right">' + '' + (pRoutings.SecondCuringArea == 0 ? "" : pRoutings.SecondCuringArea) + '</div>';
        ReportHTML += '                             <div class="col-xs-3 text-right">ثانى منطقة تعتيق: ' + '</div>';

        ReportHTML += '                         </td>';
        ReportHTML += '                     </thead>';
        ReportHTML += '                 </table>';

        ReportHTML += '    <br> ';
        ReportHTML += '             <div class="col-xs-12 text-right" style="font-size:14px;">' + '' + '<span class="">' + ' بيانات الشاحنة ' + '</span></div>';
        ReportHTML += '                 <table id="tblPaymentHeaderData" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;font-size:115%;">'; // table-hover
        ReportHTML += '                     <thead>';
        ReportHTML += '                         <td>';


        ReportHTML += '                             <div class="col-xs-3 text-right">' + '' + (pRoutings.TrailerPlateNo == 0 ? "" : pRoutings.TrailerPlateNo) + '</div>';
        ReportHTML += '                             <div class="col-xs-3 text-right">لوحة المقطورة: ' + '</div>';

        ReportHTML += '                             <div class="col-xs-3 text-right">' + '' + (pRoutings.EquipmentPlateNo == 0 ? "" : pRoutings.EquipmentPlateNo) + '</div>';
        ReportHTML += '                             <div class="col-xs-3 text-right">لوحة الشاحنة: ' + '</div>';


        ReportHTML += '                             <div class="col-xs-3 text-right">' + '' + pRoutings.TruckCounter + '</div>';
        ReportHTML += '                             <div class="col-xs-3 text-right">عداد بعد النقلة: ' + '' + '</div>';

        ReportHTML += '                             <div class="col-xs-3 text-right">' + '' + pRoutings.LastTruckCounter + '</div>';
        ReportHTML += '                             <div class="col-xs-3 text-right">عداد قبل النقلة: ' + '' + '</div>';

        ReportHTML += '                             <div class="col-xs-3 text-right">' + '' + (pOperationHeader.CommodityName == 0 ? "" : pOperationHeader.CommodityName) + '</div>';
        ReportHTML += '                             <div class="col-xs-3 text-right">نوع الشحنة: ' + '</div>';

        ReportHTML += '                             <div class="col-xs-3 text-right">' + '' + Distance + '</div>';
        ReportHTML += '                             <div class="col-xs-3 text-right">عدد الكيلومترات: ' + '' + '</div>';

        ReportHTML += '                             <div class="col-xs-3 text-right">' + '' + pRoutings.CargoReturnGrossWeight + '</div>';
        ReportHTML += '                             <div class="col-xs-3 text-right">عدد الوحدات المترجعة: ' + '' + '</div>';

        ReportHTML += '                             <div class="col-xs-3 text-right">' + '' + pRoutings.Quantity + '</div>';
        ReportHTML += '                             <div class="col-xs-3 text-right">عدد الوحدات المحملة: ' + '' + '</div>';

        ReportHTML += '                         </td>';
        ReportHTML += '                     </thead>';
        ReportHTML += '                 </table>';

        ReportHTML += '    <br> ';
        ReportHTML += '             <div class="col-xs-12 text-right" style="font-size:14px;">' + '' + '<span class="">' + ' المصاريف ' + '</span></div>';
        ReportHTML += '                 <table id="tblPaymentHeaderData" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;font-size:115%;">'; // table-hover
        ReportHTML += '                     <thead>';
        ReportHTML += '                         <td>';
        var TotalCost = 0;
        $.each(pPayables, function (i, item) {
            if (item.CostAmount > 0) {
                ReportHTML += '                             <div class="col-xs-3 text-right" style="font-size:14px;">' + item.CostAmount + '</div>';
                ReportHTML += '                             <div class="col-xs-3 text-right" style="font-size:14px;">' + item.ChargeTypeName + '</div>';
                TotalCost += item.CostAmount;
            }
        });
        ReportHTML += '                             <div class="col-xs-6 text-right">' + '' + '</div>';
        ReportHTML += '                             <div class="col-xs-3 text-right">' + TotalCost.toFixed(2) + '</div>';
        ReportHTML += '                             <div class="col-xs-3 text-right">' + 'إجمالى التكلفة' + '</div>';
        ReportHTML += '                         </td>';
        ReportHTML += '                     </thead>';
        ReportHTML += '                 </table>';

        //if (pDefaults.UnEditableCompanyName != "BME")
        //    ReportHTML += '             <div class="col-xs-7 text-center m-t-lg" style="font-size:16px;">' + '' + '<b>' + '    مقدمه لسيادتكم  ' + '</div>';
        //ReportHTML += '             <div class="col-xs-7 text-center m-t-sm" style="font-size:16px; clear:both;">' + $("#hDefaultCompanyName").val() + '<b>' /*+ '  /  شركة   '*/ + '</div>';
        //if (pDefaults.UnEditableCompanyName != "BME") {

        ReportHTML += '<div class="col-xs-6" style="text-align:center"><h5><b> توقيع المشرف </b></h5> </div>';
        ReportHTML += '<div class="col-xs-6" style="text-align:center"><h5><b> توقيع السائق </b></h5> </div>';
        //    ReportHTML += '             <div class="col-xs-7 text-center m-t-lg" style="font-size:16px; clear:both;">' + '<b>' + ' ،،،،،،،،، وتفضلوا بقبول وافر الاحترام والتقدير   ' + '</b></div>';
        //}
        ReportHTML += '         </body>';

        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        //ReportHTML += '         <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';
        //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.IsPrintISOCode input[type=checkbox]").prop("checked"))
        //    ReportHTML += '     <div class="row m-l">' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ISOCode").text() + '</div>';
        //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ShowFooter input[type=checkbox]").prop("checked"))
        //    ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        ReportHTML += '     </footer>';

        ReportHTML += '</html>';
    }
    //if (pOption == "Print" || pOption == undefined || pOption == null) {
    var mywindow = window.open('', '_blank');
    mywindow.document.write(ReportHTML);
    mywindow.document.close();

    //}
    //else if (pOption == "Email") {
    //    DocsOut_SendEmail($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.TableOrViewName").text(), ReportHTML);
    //  }

}
function Routings_Copy(pRoutingIDToCopy) {
    debugger;
    //Confirmation Message
    swal({
        title: "Are you sure?",
        text: "The selected record will be copied.",
        type: "",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Confirm",
        closeOnConfirm: true
    },
        function () {
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/Routings/Copy"
                , { pRoutingIDToCopy: pRoutingIDToCopy, pIsCopyPayables: true }
                , function (pData) {
                    var _ReturnedMessage = pData[0];
                    var _Route = JSON.parse(pData[1]);
                    if (_ReturnedMessage == "") {
                        //FleetTransportOrder_FillModalControls(_Route.ID);
                        TruckingOrders_LoadingWithPaging();
                        swal("Success", "Saved successfuly.");
                    }
                    else {
                        swal("Sorry", _ReturnedMessage);
                        FadePageCover(false);
                    }
                }
                , null
            );
        });
}
function Routings_GenerateCargo() {
    debugger;

    var pTruckerID = pDefaults.DefaultTruckerID;

    if ((pTruckerID == "" || pTruckerID == null) && $("#cbIsVehicle").prop("checked"))
        swal(strSorry, "Choose Trucker First");
    else {
        FadePageCover(true);
        if ($("#cbIsVehicle").prop("checked")) {
            var pWhereClause = "WHERE OperationID=" + ($("#hOperationID").val() == "" ? 0 : $("#hOperationID").val()) +
                " AND IsReceived=1  AND ID NOT IN (SELECT OperationVehicleID FROM TruckingOrderCargo where OperationVehicleID is not null)"
                + " And LastTruckerID=" + pTruckerID;
            CallGETFunctionWithParameters("/api/OperationVehicle/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
                {
                    pIsLoadArrayOfObjects: false
                    , pLanguage: $("[id$='hf_ChangeLanguage']").val()
                    , pPageNumber: 1
                    , pPageSize: 999999
                    , pWhereClause: pWhereClause
                    , pOrderBy: "Code"
                }
                , function (pData) { RountingsVehicle_BindTableRows(JSON.parse(pData[0])); FadePageCover(false); }
                , null);

        }
        else if ($("#cbIsFCL").prop("checked") || $("#cbIsFTL").prop("checked") || $("#cbIsTank").prop("checked") || $("#cbIsFlexi").prop("checked")) {

            CallGETFunctionWithParameters("/api/OperationContainersAndPackages/LoadWithWhereClause",
                {
                    pPageNumber: 1
                    , pPageSize: 999999
                    , pWhereClause: "WHERE OperationID=" + ($("#hOperationID").val() == "" ? 0 : $("#hOperationID").val()) + " AND ID NOT IN (SELECT OperationsContainersAndPackagesID FROM TruckingOrderCargo where OperationsContainersAndPackagesID is not null)"
                    , pOrderBy: "ID"
                }
                , function (pData) { RountingsVehicle_BindTableRows(JSON.parse(pData[0])); FadePageCover(false); }
                , null);
        }
        else {

            CallGETFunctionWithParameters("/api/Routings/LoadCargoWithWhereClause",
                {
                    pWhereClause: "WHERE OperationID=" + ($("#hOperationID").val() == "" ? 0 : $("#hOperationID").val())
                    , pOperationID: $("#hOperationID").val() == "" ? 0 : $("#hOperationID").val()
                }
                , function (pData) { RountingsVehicle_BindTableRows(JSON.parse(pData[0])); FadePageCover(false); }
                , null);

        }

    }





    //$("#btn-SearchCharges").attr("onclick", "Receivables_GenerateFromPayables();");
    //$("#btnSelectChargesApply").attr("onclick", "Receivables_InsertListWithValuesFromPayables(false);");
}
function RountingsVehicle_BindTableRows(pVehicle) {
    debugger;
    // ClearAllTableRows("tblVehicle");
    var inspectionControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-list' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + " Actions" + "</span>";

    var pDivName = "divSelectCargo";
    var ptblModalName = "tblVehicle";
    var pCheckboxNameAttr = "Delete";

    $("#btnCargoApply").attr("onclick", "Vehicle_Save('tblVehicle');");

    $("#" + pDivName).html("");

    //var divData = ' <section class="panel panel-default"  > ';
    //divData += '<section class="vbox" >';
    //divData += ' <section id="sec-content" class="scrollable padder" ">';

    var divData = '';

    if ($("#cbIsVehicle").prop("checked") == true) {
        divData += ' <section class="panel panel-default"  > ';
        divData += '     <div class="table-responsive" > ';
        divData += '        <table id="' + ptblModalName + '" class="table table-striped b-t b-light text-sm  table-hover" style="font-size:100%;"> ';
        divData += '            <thead> ';
        divData += '            <tr> ';
        divData += '                <th id="HeaderSelectCargoIDs"> ';
        divData += '                <input id="cb-CheckAll-RoutingsCargo" type="checkbox"> ';
        divData += '                </th> ';
        divData += '                <th>Code</th> ';
        divData += '                <th>ChassisNumber</th> ';
        divData += '                <th>EngineNumber</th> ';
        divData += '                <th>OCNCode</th> ';
        divData += '                <th>Model</th> ';
        divData += '                <th>KeyNumber</th> ';
        divData += '                <th>EC</th> ';
        divData += '                <th>PaintType</th> ';
        divData += '                <th>IC</th> ';
        divData += '                <th>CommercialInvoiceNumber</th> ';
        divData += '                <th>BillNumber</th> ';
        divData += '                <th>InsurancePolicyNumber</th> ';
        divData += '                <th>ProductionOrder</th> ';
        divData += '                <th>PINumber</th> ';
        divData += '                <th class="rounded-right hide"></th> ';
        divData += '            </tr> ';
        divData += '            </thead> ';
        divData += '            <tbody> ';

        $.each(pVehicle, function (i, item) {
            divData += "<tr ID='" + item.ID + "' " + ">";
            divData += "<td class='ID'> <input name='Delete' " + " type='checkbox' value='" + item.ID + "' /></td>";
            divData += "<td class='ChassisNumber'>" + (item.PurchaseItemCode == 0 ? "" : item.PurchaseItemCode) + "</td>";
            divData += "<td class='ChassisNumber'>" + (item.ChassisNumber == 0 ? "" : item.ChassisNumber) + "</td>";
            divData += "<td class='EngineNumber'>" + (item.EngineNumber == 0 ? "" : item.EngineNumber) + "</td>";
            divData += "<td class='OCNCode'>" + (item.OCNCode == 0 ? "" : item.OCNCode) + "</td>";
            divData += "<td class='Model'>" + (item.Model == 0 ? "" : item.Model) + "</td>";
            divData += "<td class='KeyNumber'>" + (item.KeyNumber == 0 ? "" : item.KeyNumber) + "</td>";
            divData += "<td class='EC'>" + (item.EC == 0 ? "" : item.EC) + "</td>";
            divData += "<td class='PaintType'>" + (item.PaintType == 0 ? "" : item.PaintType) + "</td>";
            divData += "<td class='IC'>" + (item.IC == 0 ? "" : item.IC) + "</td>";
            divData += "<td class='CommercialInvoiceNumber'>" + (item.CommercialInvoiceNumber == 0 ? "" : item.CommercialInvoiceNumber) + "</td>";
            divData += "<td class='BillNumber'>" + (item.BillNumber == 0 ? "" : item.BillNumber) + "</td>";
            divData += "<td class='InsurancePolicyNumber'>" + (item.InsurancePolicyNumber == 0 ? "" : item.InsurancePolicyNumber) + "</td>";
            divData += "<td class='ProductionOrder'>" + (item.ProductionOrder == 0 ? "" : item.ProductionOrder) + "</td>";
            divData += "<td class='PINumber'>" + (item.PINumber == 0 ? "" : item.PINumber) + "</td>";
        }
        );
        divData += '            </tbody> ';
        divData += '        </table> ';
        divData += '    </div> ';
        divData += ' </section> ';
        divData += ' </section> ';
        divData += ' </section> ';
        $("#" + pDivName).append(divData);

        BindAllCheckboxonTable("tblVehicle", "ID", "cb-CheckAll-RoutingsCargo");
        CheckAllCheckbox("HeaderSelectCargoIDs");
    }
    else if ($("#cbIsFCL").prop("checked") || $("#cbIsFTL").prop("checked") || $("#cbIsTank").prop("checked") || $("#cbIsFlexi").prop("checked")) {
        divData += ' <section class="panel panel-default"  > ';
        divData += '     <div class="table-responsive" > ';
        divData += '        <table id="' + ptblModalName + '" class="table table-striped b-t b-light text-sm  table-hover" style="font-size:100%;"> ';
        divData += '            <thead> ';
        divData += '            <tr> ';
        divData += '                <th id="HeaderSelectCargoIDs"> ';
        divData += '                <input id="cb-CheckAll-RoutingsCargo" type="checkbox"> ';
        divData += '                </th> ';
        divData += '                <th>Container Type</th> ';
        divData += '                <th>Container Number</th> ';
        divData += '                <th>Carrier Seal</th> ';
        divData += '                <th>TareWt(KG)</th> ';
        divData += '                <th>Vol.(CBM)</th> ';
        divData += '                <th>Net Wt(KG)</th> ';
        divData += '                <th>GrossWt(KG)</th> ';
        divData += '                <th>VGM(KG)</th> ';
        divData += '                <th class="rounded-right hide"></th> ';
        divData += '            </tr> ';
        divData += '            </thead> ';
        divData += '            <tbody> ';
        // Bind Rows
        $.each(pVehicle, function (i, item) {
            divData += "        <tr ID='" + item.ID + "'> ";
            divData += "            <td class='tblModalTransferCargoID'" + " > <input name='" + pCheckboxNameAttr + "' type='checkbox' value='" + item.ID + "' ></td> ";

            divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.ContainerTypeName + "</td> ";
            divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.ContainerNumber + "</td> ";
            divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.CarrierSeal + "</td> ";
            divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.TareWeight + "</td> ";
            divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.Volume + "</td> ";
            divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.NetWeight + "</td> ";
            divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.GrossWeight + "</td> ";
            divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.VGM + "</td> ";
            divData += "        </tr> ";
        });
        divData += '            </tbody> ';
        divData += '        </table> ';
        divData += '    </div> ';
        divData += ' </section> ';
        divData += ' </section> ';
        divData += ' </section> ';
        $("#" + pDivName).append(divData);

        BindAllCheckboxonTable("tblVehicle", "ID", "cb-CheckAll-RoutingsCargo");
        CheckAllCheckbox("HeaderSelectCargoIDs");
    }
    else {
        //divData += '                <th id="HeaderSelectCargoIDs"> ';
        //divData += '                <input id="cb-CheckAll-RoutingsCargo" type="checkbox"> ';
        //divData += '                </th> ';
        //divData += '                <th>Package Type</th> ';
        //divData += '                <th>Quantity</th> ';
        //divData += '                <th>Length(CM)</th> ';
        //divData += '                <th>Width(CM)</th> ';
        //divData += '                <th>Height(CM)</th> ';
        //divData += '                <th>Vol.(CBM)</th> ';
        //divData += '                <th>Volumetric.Wt</th> ';
        //divData += '                <th>Net Wt(KG)</th> ';
        //divData += '                <th>GrossWt(KG)</th> ';
        //divData += '                <th>Chg.Wt</th> ';
        //divData += '                <th class="rounded-right hide"></th> ';
        //divData += '            </tr> ';
        //divData += '            </thead> ';
        //divData += '            <tbody> ';
        //// Bind Rows
        //$.each(pVehicle, function (i, item) {
        //    divData += "        <tr ID='" + item.ID + "'> ";
        //    divData += "            <td class='tblModalTransferCargoID'" + " > <input name='" + pCheckboxNameAttr + "' type='checkbox' value='" + item.ID + "' ></td> ";
        //    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.PackageTypeName + "</td> ";
        //    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.Quantity + "</td> ";
        //    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.Length + "</td> ";
        //    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.Width + "</td> ";
        //    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.Height + "</td> ";
        //    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.Volume + "</td> ";
        //    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.VolumetricWeight + "</td> ";
        //    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.NetWeight + "</td> ";
        //    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.GrossWeight + "</td> ";
        //    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.ChargeableWeight + "</td> ";
        //    divData += "        </tr> ";
        //});
        divData += ' <div class="form-group col-sm-2">';
        divData += ' <label>Total Gross Weight</label>';
        divData += '<input type="text" id="txtGrossWeightTruckingOrderAdd" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" class="form-control parsley-validated input-sm" data-required="false" maxlength="15" placeholder="" style="text-transform:uppercase" disabled="disabled" />';
        divData += '</div>';


        divData += ' <div class="form-group col-sm-2">';
        divData += ' <label>Total Trucking Order Gross Weight</label>';
        divData += '<input type="text" id="txtTotalAddedGrossWeightTruckingOrder" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" class="form-control parsley-validated input-sm" data-required="false" maxlength="15" placeholder="" style="text-transform:uppercase" disabled="disabled" />';
        divData += '</div>';

        divData += ' <div class="form-group col-sm-2">';
        divData += ' <label>Added Gross Weight</label>';
        divData += '<input type="text" id="txtAddedGrossWeightTruckingOrderAdd" onkeypress="CheckValueIsDecimal(id);" onfocus="CheckValueIsDecimal(id);"  placeholder="0" class="form-control parsley-validated input-sm" data-required="false" maxlength="15"  style="text-transform:uppercase" onblur="CheckDecimalFormat(id);CalculateRemainingGrossWeight();" />';
        divData += '</div>';


        divData += ' <div class="form-group col-sm-2">';
        divData += ' <label>Remaining Gross Weight</label>';
        divData += '<input type="text" id="txtRemainingGrossWeightTruckingOrderAdd" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" class="form-control parsley-validated input-sm" data-required="false" maxlength="15" placeholder="" style="text-transform:uppercase" disabled="disabled" />';
        divData += '</div>';

        $("#" + pDivName).append(divData);

        var CargoGrossWeight = pVehicle.length > 0 ? pVehicle[0].TotalCargoGrossWeight : 0;//$('#txtAddedGrossWeightTruckingOrder').val();
        var TotalGrossWeight = $('#lblTotalGrossWeight').text().replace(':', '').replace(' ', '');



        $("#txtGrossWeightTruckingOrderAdd").val($('#lblTotalGrossWeight').text().replace(':', '').replace(' ', ''));
        $("#txtTotalAddedGrossWeightTruckingOrder").val(CargoGrossWeight);
        $("#txtAddedGrossWeightTruckingOrderAdd").val(0);
        $("#txtRemainingGrossWeightTruckingOrderAdd").val((TotalGrossWeight - CargoGrossWeight));

    }




    // HighlightText("#tblVehicle>tbody>tr", $("#txtOperationContainerAndPackagesSearch").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
}
function CalculateRemainingGrossWeight() {
    debugger;

    var CargoGrossWeight = $('#txtAddedGrossWeightTruckingOrderAdd').val();
    var TotalGrossWeight = $('#lblTotalGrossWeight').text().replace(':', '').replace(' ', '');
    var TotalTruckingOrderGross = $("#txtTotalAddedGrossWeightTruckingOrder").val();

    var RemainingGrossWeight = (parseFloat(TotalGrossWeight).toFixed(2) - parseFloat(CargoGrossWeight).toFixed(2) - parseFloat(TotalTruckingOrderGross).toFixed(2)).toFixed(2);

    $("#txtRemainingGrossWeightTruckingOrderAdd").val(RemainingGrossWeight);
}
function Vehicle_Save(pTableName) {
    debugger;


    //if ($("#hRoutingID" + RoutingSuffix).val() == "")
    //    Routings_Insert(false);
    var pCargoGrossWeight = $('#txtAddedGrossWeightTruckingOrderAdd').val();
    var _SelectedVehicles = GetAllSelectedIDsAsString(pTableName);
    var ErrorMsg = '';

    if (!$("#cbIsVehicle").prop("checked") && !$("#cbIsFCL").prop("checked") && !$("#cbIsFTL").prop("checked") && !$("#cbIsTank").prop("checked") && !$("#cbIsFlexi").prop("checked")) {
        var TotalGrossWeight = $('#lblTotalGrossWeight').text().replace(':', '').replace(' ', '');

        if (pCargoGrossWeight == '' || parseFloat(pCargoGrossWeight) == 0)
            ErrorMsg = "Please, Insert Gross Weight.";
        else if (parseFloat($("#txtRemainingGrossWeightTruckingOrderAdd").val()) < 0)
            ErrorMsg = "Please, Insert Gross Weight Less Or Equal To Total Gross Weight.";

    }

    if (_SelectedVehicles == "" && ($("#cbIsVehicle").prop("checked") || $("#cbIsFCL").prop("checked") || $("#cbIsFTL").prop("checked") || $("#cbIsTank").prop("checked") || $("#cbIsFlexi").prop("checked"))) {
        if ($("#cbIsVehicle").prop("checked") == true)
            swal("Sorry", "Please, select vehicles.");
        else if ($("#cbIsFCL").prop("checked") || $("#cbIsFTL").prop("checked") || $("#cbIsTank").prop("checked") || $("#cbIsFlexi").prop("checked"))
            swal("Sorry", "Please, select Containers.");
    }
    else if (ErrorMsg != '') {
        swal("Sorry", ErrorMsg);
    }
    else {
        FadePageCover(true);
        var pParametersWithValues = {
            pOperationVehicleIDsList: $("#cbIsVehicle").prop("checked") ? _SelectedVehicles : ""
            , pOperationsContainersAndPackagesIDsList: $("#cbIsVehicle").prop("checked") ? "" : _SelectedVehicles
            , pOperationID: $("#hOperationID").val()
            , pRoutingID: $("#hRoutingID" + RoutingSuffix).val()
            , pCargoGrossWeight: pCargoGrossWeight
            , pIsOwnedByCompany: $("#cbIsOwnedByCompany").prop("checked")
        };
        CallPOSTFunctionWithParameters("/api/Routings/Vehicle_Save", pParametersWithValues
            , function (pData) {
                var _MessageReturned = pData[0];

                if (_MessageReturned == "") {
                    jQuery("#SelectCargoModal").modal("hide");
                    swal("Success", "Saved successfully.");
                    Routing_TransferCargo();
                    LoadAllContainersData();

                }
                else {
                    swal("Sorry", _MessageReturned);
                    FadePageCover(false);
                }
            }
            , null);
    }
}
function Routings_CargoDeleteList(callback) {
    debugger;
    var ptblModalName = "SelectTransferCargoModal";
    if (GetAllSelectedIDsAsString(ptblModalName) != "")
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
                DeleteListFunction("/api/Routings/DeleteCargo"
                    , { "pTruckingOrderCargoIDs": GetAllSelectedIDsAsString(ptblModalName), pTruckingOrderID: $('#hID').val() }
                    , function () {
                        Routing_TransferCargo();
                        LoadAllContainersData();
                    });
            });
}

function Routing_TransferCargo() {
    debugger;
    var pStrFnName = "/api/Routings/LoadCargoWithWhereClause";

    var pDivName = "divSelectTransferCargo";//div name to be filled
    var ptblModalName = "SelectTransferCargoModal";
    var pCheckboxNameAttr = "Delete";
    var pWhereClause = "";
    pWhereClause += "Where RoutingID= " + $("#hRoutingID" + RoutingSuffix).val();

    FillTransferCargoModalTable(pStrFnName, pWhereClause, pDivName, ptblModalName, pCheckboxNameAttr, true //pIsInsertChoice
        , null);

    //$("#btn-SearchCharges").attr("onclick", "Receivables_GenerateFromPayables();");
    //$("#btnSelectChargesApply").attr("onclick", "Receivables_InsertListWithValuesFromPayables(false);");
}
function FillTransferCargoModalTable(pStrFnName, pWhereClause, pDivName, ptblModalName, pCheckboxNameAttr, pIsInsertChoice, callback) {
    FadePageCover(true);
    $.ajax({
        type: "GET",
        url: pStrFnName,
        data: { pWhereClause: pWhereClause, pOperationID: $("#hOperationID").val() == "" ? 0 : $("#hOperationID").val() },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var pOperationHeader = JSON.parse(data[1]);
            //Clear the div
            $("#" + pDivName).html("");
            var divData = '';
            if ($("#cbIsVehicle").prop("checked") == true) {
                divData += ' <section class="panel panel-default" > ';
                divData += '    <div class="table-responsive"> ';
                divData += '        <table id="' + ptblModalName + '" class="table table-striped b-t b-light text-sm  table-hover"> ';
                divData += '            <thead> ';
                divData += '            <tr> ';
                divData += '                <th id="HeaderSelectTransferCargoIDs"> ';
                divData += '                <input id="cb-CheckAll-RoutingsTransferCargo" type="checkbox"> ';
                divData += '                </th> ';
                divData += '                <th>Code</th> ';
                divData += '                <th>ChassisNumber</th> ';
                divData += '                <th>EngineNumber</th> ';
                divData += '                <th>OCNCode</th> ';
                divData += '                <th>Model</th> ';
                divData += '                <th>KeyNumber</th> ';
                divData += '                <th>EC</th> ';
                divData += '                <th>PaintType</th> ';
                divData += '                <th>IC</th> ';
                divData += '                <th>CommercialInvoiceNumber</th> ';
                divData += '                <th>BillNumber</th> ';
                divData += '                <th>InsurancePolicyNumber</th> ';
                divData += '                <th>ProductionOrder</th> ';
                divData += '                <th>PINumber</th> ';
                divData += '                <th class="rounded-right hide"></th> ';
                divData += '            </tr> ';
                divData += '            </thead> ';
                divData += '            <tbody> ';
                // Bind Rows
                $.each(JSON.parse(data[0]), function (i, item) {
                    divData += "        <tr ID='" + item.ID + "'> ";
                    divData += "            <td class='tblModalTransferCargoID'" + " > <input name='" + pCheckboxNameAttr + "' type='checkbox' value='" + item.ID + "' ></td> ";
                    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.PurchaseItemCode + "</td> ";
                    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.ChassisNumber + "</td> ";
                    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.EngineNumber + "</td> ";
                    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.OCNCode + "</td> ";
                    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.Model + "</td> ";
                    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.KeyNumber + "</td> ";
                    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.EC + "</td> ";
                    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.PaintType + "</td> ";
                    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.IC + "</td> ";
                    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.CommercialInvoiceNumber + "</td> ";
                    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.BillNumber + "</td> ";
                    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.InsurancePolicyNumber + "</td> ";
                    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.ProductionOrder + "</td> ";
                    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.PINumber + "</td> ";
                    divData += "        </tr> ";
                });
                divData += '            </tbody> ';
                divData += '        </table> ';
                divData += '    </div> ';
                divData += ' </section> ';
                $("#" + pDivName).append(divData);

                BindAllCheckboxonTable(ptblModalName, "ID", "cb-CheckAll-RoutingsTransferCargo");
                CheckAllCheckbox("HeaderSelectTransferCargoIDs");
            }
            else if ($("#cbIsFCL").prop("checked") || $("#cbIsFTL").prop("checked") || $("#cbIsTank").prop("checked") || $("#cbIsFlexi").prop("checked")) {
                divData += ' <section class="panel panel-default" > ';
                divData += '    <div class="table-responsive"> ';
                divData += '        <table id="' + ptblModalName + '" class="table table-striped b-t b-light text-sm  table-hover"> ';
                divData += '            <thead> ';
                divData += '            <tr> ';
                divData += '                <th id="HeaderSelectTransferCargoIDs"> ';
                divData += '                <input id="cb-CheckAll-RoutingsTransferCargo" type="checkbox"> ';
                divData += '                </th> ';
                divData += '                <th>Container Type</th> ';
                divData += '                <th>Container Number</th> ';
                divData += '                <th>Carrier Seal</th> ';
                divData += '                <th>TareWt(KG)</th> ';
                divData += '                <th>Vol.(CBM)</th> ';
                divData += '                <th>Net Wt(KG)</th> ';
                divData += '                <th>GrossWt(KG)</th> ';
                divData += '                <th>VGM(KG)</th> ';
                divData += '                <th class="rounded-right hide"></th> ';
                divData += '            </tr> ';
                divData += '            </thead> ';
                divData += '            <tbody> ';
                // Bind Rows
                $.each(JSON.parse(data[0]), function (i, item) {
                    divData += "        <tr ID='" + item.ID + "'> ";
                    divData += "            <td class='tblModalTransferCargoID'" + " > <input name='" + pCheckboxNameAttr + "' type='checkbox' value='" + item.ID + "' ></td> ";

                    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.ContainerTypeName + "</td> ";
                    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.ContainerNumber + "</td> ";
                    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.CarrierSeal + "</td> ";
                    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.TareWeight + "</td> ";
                    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.Volume + "</td> ";
                    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.NetWeight + "</td> ";
                    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.GrossWeight + "</td> ";
                    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.VGM + "</td> ";
                    divData += "        </tr> ";
                });
                divData += '            </tbody> ';
                divData += '        </table> ';
                divData += '    </div> ';
                divData += ' </section> ';
                $("#" + pDivName).append(divData);


                BindAllCheckboxonTable(ptblModalName, "ID", "cb-CheckAll-RoutingsTransferCargo");
                CheckAllCheckbox("HeaderSelectTransferCargoIDs");
            }
            else {
                divData += ' <section class="panel panel-default hide" > ';
                divData += '    <div class="table-responsive "> ';
                divData += '        <table id="' + ptblModalName + '" class="table table-striped b-t b-light text-sm  table-hover"> ';
                divData += '            <thead> ';
                divData += '            <tr> ';
                divData += '                <th id="HeaderSelectTransferCargoIDs"> ';
                divData += '                <input id="cb-CheckAll-RoutingsTransferCargo" type="checkbox"> ';
                divData += '                </th> ';
                divData += '                <th>Package Type</th> ';
                divData += '                <th>Quantity</th> ';
                divData += '                <th>Length(CM)</th> ';
                divData += '                <th>Width(CM)</th> ';
                divData += '                <th>Height(CM)</th> ';
                divData += '                <th>Vol.(CBM)</th> ';
                divData += '                <th>Volumetric.Wt</th> ';
                divData += '                <th>Net Wt(KG)</th> ';
                divData += '                <th>GrossWt(KG)</th> ';
                divData += '                <th>Chg.Wt</th> ';
                divData += '                <th class="rounded-right hide"></th> ';
                divData += '            </tr> ';
                divData += '            </thead> ';
                divData += '            <tbody> ';
                // Bind Rows
                $.each(JSON.parse(data[0]), function (i, item) {
                    divData += "        <tr ID='" + item.ID + "'> ";
                    divData += "            <td class='tblModalTransferCargoID'" + " > <input name='" + pCheckboxNameAttr + "' type='checkbox' checked value='" + item.ID + "' ></td> ";

                    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.PackageTypeName + "</td> ";
                    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.Quantity + "</td> ";
                    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.Length + "</td> ";
                    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.Width + "</td> ";
                    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.Height + "</td> ";
                    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.Volume + "</td> ";
                    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.VolumetricWeight + "</td> ";
                    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.NetWeight + "</td> ";
                    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.GrossWeight + "</td> ";
                    divData += "            <td class='tblModalReceivable' id=PackageType" + item.ID + "  style='width:300px;'>" + item.ChargeableWeight + "</td> ";


                    //    divData += "        </tr> ";
                });
                divData += '            </tbody> ';
                divData += '        </table> ';
                divData += '    </div> ';
                divData += ' </section> ';

                divData += ' <div class="form-group col-sm-2">';
                divData += ' <label>Total Gross Weight</label>';
                divData += '<input type="text" id="txtGrossWeightTruckingOrder" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" class="form-control parsley-validated input-sm" data-required="false" maxlength="15" placeholder="" style="text-transform:uppercase" disabled="disabled" />';
                divData += '</div>';

                divData += ' <div class="form-group col-sm-2">';
                divData += ' <label>Added Gross Weight</label>';
                divData += '<input type="text" id="txtAddedGrossWeightTruckingOrder" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" class="form-control parsley-validated input-sm" data-required="false" maxlength="15" placeholder="" style="text-transform:uppercase" disabled="disabled" />';
                divData += '</div>';

                divData += ' <div class="form-group col-sm-2 hide">';
                divData += ' <label>Remaining Gross Weight</label>';
                divData += '<input type="text" id="txtRemainingGrossWeightTruckingOrder" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" class="form-control parsley-validated input-sm" data-required="false" maxlength="15" placeholder="" style="text-transform:uppercase" disabled="disabled" />';
                divData += '</div>';

                if (pDefaults.UnEditableCompanyName == "CAP") {
                    divData += ' <div class="form-group col-sm-2">';
                    divData += ' <label>No of Pkgs In Oper</label>';
                    divData += '<input type="text" id="txtNumberOfPackagesOnOperation" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" class="form-control parsley-validated input-sm" data-required="false" maxlength="15" placeholder="" style="text-transform:uppercase" disabled="disabled" value="' + (IsNull(pOperationHeader, 0) == 0 ? 0 : (pOperationHeader.NumberOfPackages == 0 ? pOperationHeader.PackageTypes : pOperationHeader.NumberOfPackages)) + '"/>';
                    divData += '</div>';
                }
                $("#" + pDivName).append(divData);

                var CargoGrossWeight = JSON.parse(data[0]).length > 0 ? JSON.parse(data[0])[0].CargoGrossWeight : 0;
                var TotalGrossWeight = $('#lblTotalGrossWeight').text().replace(':', '').replace(' ', '');
                var RemainingGrossWeight = parseFloat(TotalGrossWeight) - parseFloat(CargoGrossWeight);

                $("#txtGrossWeightTruckingOrder").val($('#lblTotalGrossWeight').text().replace(':', '').replace(' ', ''));
                $("#txtAddedGrossWeightTruckingOrder").val(CargoGrossWeight);
                $("#txtRemainingGrossWeightTruckingOrder").val(RemainingGrossWeight);
            }









            FadePageCover(false);

            if (callback != null && callback != undefined)
                callback();
        },
        error: function (jqXHR, exception) {
            FadePageCover(false);
            swal("Sorry", "Please, press Ctrl+Shft+R, and if the problem persists contact your technical support! FillReceivablesModalTableFromPayables in mainapp.master.js", "");
        }
    });
}

/****************************************OperationCharges Fns**********************************************/
function OperationCharges_FillModal() {
    debugger;

    //jQuery("#OperationChargeModal").modal("show");
    if ($("#hRoutingID" + RoutingSuffix).val() == "")
        swal("Sorry", "Please, save header first.");
    else {
        FadePageCover(true);
        $("#tblPayables tbody").html("");
        $("#tblReceivables tbody").html("");
        $("#lblOperationChargeShown").html("");
        CallGETFunctionWithParameters("/api/QuotationCharges/GetOperationPayablesAndReceivables"
            , {
                pOperationID: $("#hOperationID").val()
                , pQuotationRouteID: 0
                , pOperationVehicleID: 0
                , pTruckingOrderID: $("#hRoutingID" + RoutingSuffix).val()
                , pCodeSearch: $("#slSearchCharges_FromOut").val() == "" ? 0 : $("#slSearchCharges_FromOut option:selected").text()
            }
            , function (pData) {
                if (pData[0]) {
                    var pPayables = JSON.parse(pData[1]);
                    var pReceivables = JSON.parse(pData[2]);
                    Payables_BindTableRows(pPayables);
                    Receivables_BindTableRows(pReceivables);
                    //FadePageCover(false);
                }
                //else
                //    swal("Sorry", "Connection failed, please try again later.");
                FadePageCover(false);
            }
            , null);
    }
}
/******************Payables**************************/
function Payables_BindTableRows(pPayables) {
    ClearAllTableRows("tblPayables");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pPayables, function (i, item) {

        AppendRowtoTable("tblPayables",
            //("<tr ID='" + item.ID + "' " + (OEPay && $("#hIsOperationDisabled").val() == false ? ("ondblclick='Payables_EditByDblClick(" + item.ID + ");'") : "") + ">"
            ("<tr ID='" + item.ID + "' " + (OEPay && item.AccNoteID == 0 && item.IsApproved == 0 ? ("ondblclick='Payables_EditByDblClick(" + item.ID + ");'") : "") + (item.IsApproved ? " class='text-primary' " : "") + ">"
                + "<td class='PayableID'> <input " + (item.IsApproved == 0 && item.AccNoteID == 0 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "'></td>"
                //+ "<td class='Payable' val='" + item.ChargeTypeID + "'>" + item.ChargeTypeCode + " (" + item.ChargeTypeName + ")" + "</td>"
                + "<td class='Payable' val='" + item.ChargeTypeID + "'>" + (pDefaults.UnEditableCompanyName == "GBL" ? (item.ChargeTypeName + " (" + item.ChargeTypeCode + ")") : item.ChargeTypeName) + "</td>"
                + "<td class='PayablePOrC hide' val='" + item.POrC + "'>" + (item.POrC == 0 ? "" : item.POrCCode) + "</td>"
                //the next line its PartnerSupplierID comes from table OperationPartners
                + "<td class='PayableSupplier hide'[' val='" + item.SupplierOperationPartnerID + "'>" + (item.PartnerSupplierID == 0 ? "" : item.PartnerSupplierName) + "</td>"
                + "<td class='SupplierSiteID hide'>" + item.SupplierSiteID + "</td>"
                //+ ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') ? ("<td class='PayableUOM' val='" + item.ContainerTypeID + "'>" + (item.ContainerTypeCode == 0 ? "" : item.ContainerTypeCode) + "</td>") : "")
                //+ ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='PayableUOM' val='" + item.PackageTypeID + "'>" + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + "</td>") : "")
                + "<td class='PayableUOM hide' val='" + item.MeasurementID + "'>" + (item.MeasurementID == 0 ? "" : item.MeasurementCode) + "</td>"

                + "<td class='PayableCostPrice " + (pDefaults.UnEditableCompanyName == "GBL" ? "hide" : "") + " '>" + item.Quantity + "</td>"
                + "<td class='tblModalPayableQuantity " + (pDefaults.UnEditableCompanyName == "GBL" ? "" : "hide") + " '> <input type='text' id='txtPayableQuantity" + item.ID + "' class='form-control controlStyle' onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id, function() {Payables_UpdateCostSingle(" + item.ID + ',"' + "txtCostPrice" + '"' + ',"' + "txtPayableQuantity" + '"' + ");});'  data-required='false' maxlength='10' placeholder='0.00' " + (item.IsApproved ? " disabled " : "") + " value=" + item.Quantity + " /> </td> "

                + "<td class='PayableCostPrice " + (pDefaults.UnEditableCompanyName == "GBL" ? "hide" : "") + " '>" + item.CostPrice.toFixed(4) + "</td>"
                + "<td class='tblModalPayableCostPrice " + (pDefaults.UnEditableCompanyName == "GBL" ? "" : "hide") + " '> <input type='text' id='txtCostPrice" + item.ID + "' class='form-control controlStyle' onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id, function() {Payables_UpdateCostSingle(" + item.ID + ',"' + "txtCostPrice" + '"' + ',"' + "txtPayableQuantity" + '"' + ");});'  data-required='false' maxlength='10' placeholder='0.00' " + (item.IsApproved ? " disabled " : "") + " value=" + item.CostPrice.toFixed(2) + " /> </td> "

                + "<td class='PayableAmountWithoutVAT hide'>" + (item.AmountWithoutVAT == 0 ? "" : item.AmountWithoutVAT) + "</td>"
                + "<td class='PayableTaxTypeID hide' val=" + item.TaxTypeID + ">" + (item.TaxTypeID == 0 ? "" : item.TaxTypeName) + "</td>"
                + "<td class='PayableTaxPercentage hide'>" + item.TaxPercentage + "</td>"
                + "<td class='PayableTaxAmount hide'>" + item.TaxAmount + "</td>"
                + "<td class='PayableDiscountTypeID hide' val=" + item.DiscountTypeID + ">" + (item.DiscountTypeID == 0 ? "" : item.DiscountTypeName) + "</td>"
                + "<td class='PayableDiscountPercentage hide'>" + item.DiscountPercentage + "</td>"
                + "<td class='PayableDiscountAmount hide'>" + item.DiscountAmount + "</td>"

                + "<td class='PayableCostAmount'>" + item.CostAmount.toFixed(4) + "</td>"
                + "<td class='PayableInitialSalePrice hide'>" + (item.InitialSalePrice == 0 ? "" : item.InitialSalePrice.toFixed(2)) + "</td>"
                + "<td class='PayableSupplierInvoiceNo hide'>" + (item.SupplierInvoiceNo == 0 ? "" : item.SupplierInvoiceNo) + "</td>"
                + "<td class='PayableSupplierReceiptNo hide'>" + (item.SupplierReceiptNo == 0 ? "" : item.SupplierReceiptNo) + "</td>"
                + "<td class='PayableEntryDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.EntryDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.EntryDate)) : "") + "</td>"
                + "<td class='PayableBillID hide'>" + item.BillID + "</td>"

                + "<td class='PayableIssueDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.IssueDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.IssueDate)) : "") + "</td>"
                + "<td class='PayableOperationContainersAndPackagesID hide'>" + item.OperationContainersAndPackagesID + "</td>"
                + "<td class='PayableTrailerID hide'>" + item.TrailerID + "</td>"

                + "<td class='PayableExchangeRate'>" + item.ExchangeRate.toFixed(4) + "</td>"
                + "<td class='PayableCurrency' val='" + item.CurrencyID + "'>" + (item.CurrencyID == 0 ? "" : item.CurrencyCode) + "</td>"
                + "<td class='PayableAccNote hide' val='" + item.AccNoteID + "'>" + (item.AccNoteID == 0 ? "" : item.Code) + "</td>"
                + "<td class='PayableOperation hide' val='" + item.OperationID + "'>" + (item.OperationID == 0 ? "" : item.OperationCode) + "</td>"
                + "<td class='PayableNotes hide'>" + item.Notes + "</td>"
                + "<td class='PayableCreatorName hide'>" + item.CreatorName + "</td>"
                //+ "<td class='PayableCreationDate hide'>" + item.CreationDate + "</td>"
                + "<td class='PayableCreationDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
                + " <i class='fa fa-calendar'></i>"
                //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + "</small>"
                + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.CreationDate)) + "</small>"
                + "</span>"
                + "</td>"
                + "<td class='PayableModificatorName hide'>" + item.ModificatorName + "</td>"
                //+ "<td class='PayableModificationDate hide'>" + item.ModificationDate + "</td>"
                + "<td class='IsExcludeInTruckingOrderPrint hide'>" + item.IsExcludeInTruckingOrderPrint + "</td>"
                + "<td class='PayableModificationDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
                + " <i class='fa fa-calendar'></i>"
                //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.ModificationDate)) + "</small>"
                + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.ModificationDate)) + "</small>"
                + "</span>"
                + "</td>"
                + "<td class='hide'><a href='#EditPayableModal' data-toggle='modal' onclick='Payables_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ////ApplyPermissions();
    //if (OAPay && $("#hIsOperationDisabled").val() == false) { $("#btn-AddPayables").removeClass("hide"); $("#btn-GenerateDefaultPayables").removeClass("hide"); $("#btn-GeneratePayablesFromQuotation").removeClass("hide"); }
    //else { $("#btn-AddPayables").addClass("hide"); $("#btn-GenerateDefaultPayables").addClass("hide"); $("#btn-GeneratePayablesFromQuotation").addClass("hide"); }
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    //if (OEPay && $("#hIsOperationDisabled").val() == false) $("#btn-MultiRowEditPayables").removeClass("hide"); else $("#btn-MultiRowEditPayables").addClass("hide");
    BindAllCheckboxonTable("tblPayables", "PayableID", "cb-CheckAll-Payables");
    CheckAllCheckbox("HeaderDeletePayableID");
    //HighlightText("#tblPayables>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    //Payables_CalculateSubtotals();
    PayablesAndReceivables_CalculateSummary();
}
function Payables_GetAvailableCharges() {
    debugger;
    if ($("#hID").val() == "")
        FleetTransportOrder_Insert(false/*, function () { Payables_GetAvailableCharges(); }*/); //swal("Sorry", "Please, save basic data first.");
    else {
        //$("#btn-SearchCharges").attr("onclick", "Payables_GetAvailableCharges();");
        $("#slSearchCharges").attr("onchange", "Payables_GetAvailableCharges();");
        //$("#btn-SearchCharges-sl").attr("onclick", "Payables_GetAvailableCharges();");
        //$("#div-search-controls-sl").addClass("hide");

        $("#divSelectCharges").html("");
        FadePageCover(true);
        jQuery("#SelectChargesModal").modal("show");
        var pStrFnName = "/api/ChargeTypes/LoadAll";
        var pDivName = "divSelectCharges";
        var ptblModalName = "tblModalPayables";
        var pCheckboxNameAttr = "cbSelectPayables";
        var pWhereClause = "";
        pWhereClause += " WHERE IsUsedInPayable = 1 AND IsInactive = 0 AND IsOperationChargeType=1 ";
        ////  pWhereClause += ($("#cbIsOcean").prop('checked') == true ? " AND IsOcean = 1 " : "");
        //  pWhereClause += ($("#cbIsAir").prop('checked') == true ? " AND IsAir = 1 " : "");
        //  pWhereClause += ($("#cbIsInland").prop('checked') == true ? " AND IsInland = 1 " : "");
        pWhereClause += (" AND IsInland = 1 ");
        pWhereClause += " AND ( Code LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%' OR Name LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%') ";
        if ($("#slSearchCharges").val() != "") {
            pWhereClause += " AND Code LIKE N'%" + $("#slSearchCharges option:selected").text() + "%'" + " \n";
        }
        ////pWhereClause += " AND ID NOT IN (SELECT ChargeTypeID from Payables ";
        ////pWhereClause += "                WHERE OperationID = " + $("#hOperationID").val() + ") ";
        //GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
        //    , function () {
        //        HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
        //        $("#btnSelectChargesApply").attr("onclick", "Payables_InsertListWithoutValues(false);");
        //        FadePageCover(false);
        //    }
        //    , 1/*pCodeOrName*/);
        GetListAsCheckboxesWithVariousParameters(pStrFnName, { pWhereClause: pWhereClause }, pDivName, pCheckboxNameAttr
            , function () {
                HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
                FadePageCover(false);
            }
            , (pDefaults.IsRepeatChargeTypeName ? 3 : 1) //pCodeOrName
            , "col-sm-3"/*pColumnSize*/);

        //FillPayablesModalTableControls(pStrFnName, pWhereClause, pDivName, ptblModalName, pCheckboxNameAttr, true //pIsInsert
        //    , function () {
        //        HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
        //        $("#btnSelectChargesApply").attr("onclick", "Payables_InsertListWithValues(false);");
        //    });
        $("#btn-SearchCharges").attr("onclick", "Payables_GetAvailableCharges();");
        $("#btnSelectChargesApply").attr("onclick", "Payables_InsertListWithoutValues(false);");
    }
}
function Payables_GenerateDefaults() {
    if ($("#hRoutingID" + RoutingSuffix).val() == "")
        swal("Sorry", "Please, save header first.");
    else if ($("#tblPayables tbody tr").length > 0)
        swal("Sorry", "There are existing payables.")
    else if ($("#slSearchCharges_FromOut").val() == "")
        swal("Sorry", "Please, select the required type.");
    else
        swal({
            title: strAreYouSure,
            text: "Payables will be added.",
            //type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Apply!",
            closeOnConfirm: true
        },
            //callback function in case of success
            function () {
                FadePageCover(true);
                debugger;
                CallGETFunctionWithParameters("/api/Payables/ApplyDefaultPayables"
                    , {
                        pOperationID: $("#hOperationID").val()
                        , pWhereClause: 0
                        , pTruckingOrderID: $("#hRoutingID" + RoutingSuffix).val()
                        , pCustomerID: $("#slCustomer").val() == "" || $("#slCustomer").val() == null || $("#slCustomer").val() == undefined
                            ? 0
                            : $("#slCustomer").val()
                        , pSearchKeyword: $("#slSearchCharges_FromOut option:selected").text()
                    }
                    , function () {
                        OperationCharges_FillModal();
                    });
            });
}
function Payables_EditByDblClick(pID) {
    //jQuery("#EditPayableModal").modal("show");
    //Payables_FillControls(pID);


    //$("#slPayableSupplier").parent().addClass("hide");
    //$("#slSites").parent().addClass("hide");
    //$("#txtPayableSupplierInvoiceNo").parent().addClass("hide");
    //$("#slPayableBillTo").parent().addClass("hide");
    //$("#slPayableBill").parent().addClass("hide");
}
function Payables_FillControls(pID) {
    debugger;
    ClearAll("#EditPayableModal");
    if (pDefaults.UnEditableCompanyName == "GBL") {
        $(".classShowForGBL").removeClass("hide");
        $("#txtPayableSupplierInvoiceNo").attr("data-required", "true");
    }

    $("#hPayableID").val(pID);
    FadePageCover(true);
    var tr = $("#tblPayables tr[ID='" + pID + "']");
    var pPOrCID = $(tr).find("td.PayablePOrC").attr('val');
    var pPartnerSupplierID = $(tr).find("td.PayableSupplier").attr('val');
    var pUOMID = $(tr).find("td.PayableUOM").attr('val');
    var pCurrencyID = $(tr).find("td.PayableCurrency").attr('val');
    var pOperationID = $(tr).find("td.PayableOperation").attr('val');
    var pBillID = $(tr).find("td.PayableBillID").text();
    var pSupplierSiteID = $(tr).find("td.SupplierSiteID").text();

    var pTaxTypeID = $(tr).find("td.PayableTaxTypeID").attr('val');
    var pDiscountTypeID = $(tr).find("td.PayableDiscountTypeID").attr('val');



    if ($("#hDefaultCurrencyID").val() == pCurrencyID)
        $("#txtPayableExchangeRate").attr("disabled", "disabled");
    else
        $("#txtPayableExchangeRate").removeAttr("disabled");

    debugger;

    if (pPartnerSupplierID == 0) {
        $("#txtPayableSupplierInvoiceNo").attr("disabled", "disabled");
        //$("#txtPayableSupplierReceiptNo").attr("disabled", "disabled");
    }
    else {
        $("#txtPayableSupplierInvoiceNo").removeAttr("disabled");
        $("#txtPayableSupplierReceiptNo").removeAttr("disabled");
    }
    //if ($(tr).find("td.PayableSupplierInvoiceNo").text() == "" && $(tr).find("td.PayableSupplierReceiptNo").text() == "")
    if ($(tr).find("td.PayableSupplierInvoiceNo").text() == "")
        $("#slPayableSupplier").removeAttr("disabled");
    else
        $("#slPayableSupplier").attr("disabled", "disabled");

    GetListWithCodeAndWhereClause(pID, "/api/NoAccessFreightTypes/LoadAll", "P/C", "slPayablePOrC" /*pSlName*/, " WHERE 1=1 ");  //PayablePOrC_GetList(pPOrCID, "slPayablePOrC");
    PayableSuppliers_GetList(pPartnerSupplierID, "slPayableSupplier", function () {
        if (pDefaults.UnEditableCompanyName == "GBL")
            FillSupplierSites(pSupplierSiteID, 'slPayableSupplier', 'slPayableSupplier', 'slSites');
    });
    $("#slPayableCurrency").html($("#hReadySlCurrencies").html()); $("#slPayableCurrency").val(pCurrencyID); //PayableCurrency_GetList(pCurrencyID, "slPayableCurrency");
    PayableUOM_GetList(pUOMID, "slPayableUOM");
    GetListTaxTypeWithNameAndPercAttr(pTaxTypeID, "api/TaxeTypes/LoadAllWithWhereClause"
        , "<--Select-->", "slPayableTax", "WHERE IsInactive=0 ORDER BY Name"
        , function () {
            $("#slPayableDiscount").html($("#slPayableTax").html());
            $("#slPayableDiscount").val(pDiscountTypeID == 0 ? "" : pDiscountTypeID);
            $("#slPayableTax option[IsDiscount='true']").addClass('hide');
            $("#slPayableDiscount option[IsDiscount='false']").addClass('hide');
        });

    $("#lblPayableShown").html(": " + $(tr).find("td.Payable").text());
    $("#lblPayableCreatedBy").html(" : " + $(tr).find("td.PayableCreatorName").text())
    $("#lblPayableCreationDate").html(" : " + $(tr).find("td.PayableCreationDate").text())
    $("#lblPayableUpdatedBy").html(": " + $(tr).find("td.PayableModificatorName").text())
    $("#lblPayableModificationDate").html(" : " + $(tr).find("td.PayableModificationDate").text())

    //$("#txtPayableType").val($(tr).find("td.Payable").text());
    //$("#txtPayableType").attr("ChargeTypeID", $(tr).find("td.Payable").attr("val"));
    CallGETFunctionWithParameters("/api/ChargeTypes/LoadAllWithMinimalColumns"
        , { pWhereClauseWithMinimalColumns: "WHERE 1=1" }
        , function (pData) {
            FillListFromObject($(tr).find("td.Payable").attr("val"), (pDefaults.IsRepeatChargeTypeName ? 4 : 2), "<--Select-->", "slPayableChargeType", pData[0], null);
        }
        , null);
    GetListWithOpCodeAndHouseNoAndClientEmailAttr(pBillID, "/api/Operations/LoadWithParameters", "<--Select-->", "slPayableBill"
        , { pPageNumber: 1, pPageSize: 99999, pWhereClause: " WHERE MasterOperationID = " + pOperationID, pOrderBy: "HouseNumber" }
        , function () { FadePageCover(false); });
    $("#txtPayableQuantity").val($(tr).find("td.PayableQuantity").text());
    $("#txtPayableUnitPrice").val(parseInt($(tr).find("td.PayableCostPrice").text()) == 0 ? "" : $(tr).find("td.PayableCostPrice").text());
    $("#txtPayableAmountWithoutVAT").val(parseInt($(tr).find("td.PayableAmountWithoutVAT").text()) == 0 ? "" : $(tr).find("td.PayableAmountWithoutVAT").text());

    $("#txtPayableTaxPercentage").val($(tr).find("td.PayableTaxPercentage").text());
    $("#txtPayableTaxAmount").val($(tr).find("td.PayableTaxAmount").text());
    $("#txtPayableDiscountPercentage").val($(tr).find("td.PayableDiscountPercentage").text());
    $("#txtPayableDiscountAmount").val($(tr).find("td.PayableDiscountAmount").text());

    $("#txtPayableAmount").val(parseInt($(tr).find("td.PayableCostAmount").text()) == 0 ? "" : $(tr).find("td.PayableCostAmount").text());
    $("#txtPayableInitialSalePrice").val($(tr).find("td.PayableInitialSalePrice").text());
    $("#txtPayableExchangeRate").val($(tr).find("td.PayableExchangeRate").text());
    $("#txtPayableSupplierInvoiceNo").val($(tr).find("td.PayableSupplierInvoiceNo").text());
    $("#txtPayableSupplierReceiptNo").val($(tr).find("td.PayableSupplierReceiptNo").text());
    $("#txtPayableEntryDate").val($(tr).find("td.PayableEntryDate").text());
    $("#txtPayableIssueDate").val($(tr).find("td.PayableIssueDate").text());
    $("#txtPayableNotes").val($(tr).find("td.PayableNotes").text());

    $("#slPayableUOM").attr("onchange", "Payables_UOMChanged();");
    $("#btnSavePayable").attr("onclick", "Payables_Update(false);");
}
function Payables_MultiRowEdit() {
    debugger;
    FadePageCover(true);
    if (pDefaults.UnEditableCompanyName == "GBL")
        $("#div-search-controls-sl").removeClass("hide");
    $("#btn-SearchCharges").attr("onclick", "Payables_MultiRowEdit();");
    $("#slSearchCharges").attr("onchange", "Payables_MultiRowEdit();");
    $("#btn-SearchCharges-sl").attr("onclick", "Payables_MultiRowEdit();");
    //$("#lblDirection_TO").html($("#lblDirection").text());
    //$("#lblTransport_TO").html($("#lblTransport").text());
    $("#lblBillNumber_TO").html(":" + $("#txtBillNumberTruckingOrder").val());
    $("#lblGateInPort_TO").html(":" + $("#slTruckingOrderGateInPortTruckingOrder option:selected").text());
    $("#lblGateInDate_TO").html(":" + $("#txtTruckingOrderGateInDateTruckingOrder").val());
    $("#lblGateOutPort_TO").html(":" + $("#slTruckingOrderGateOutPortTruckingOrder option:selected").text());
    $("#lblGateOutDate_TO").html(":" + $("#txtTruckingOrderGateOutDateTruckingOrder").val());
    //$("#lblClient_TO").html($("#lblClient").text());
    $("#lblBookingNumber_TO").html(": " + $("#txtTruckingOrderBookingNumberTruckingOrder").val());
    $("#lbStuffingDate_TO").html(": " + $("#txtTruckingOrderStuffingDateTruckingOrder").val());
    $("#h6ChargesHeader_TO").removeClass("hide");

    var pStrFnName = "/api/Payables/LoadAll";
    var pDivName = "divSelectCharges";//div name to be filled
    var ptblModalName = "tblModalPayables";
    var pCheckboxNameAttr = "cbSelectPayables";
    var pWhereClause = "";
    $("#" + pDivName).html("");
    pWhereClause += " WHERE OperationID = " + $("#hOperationID").val();
    // pWhereClause += ($("#hQuotationRouteID").val() == 0 ? "" : " AND GeneratingQRID = " + $("#hQuotationRouteID").val());
    pWhereClause += " AND ( ChargeTypeCode LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%' OR ChargeTypeName LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%') ";
    pWhereClause += " And TruckingOrderID= " + $("#hID").val() + " \n";
    if ($("#slSearchCharges").val() != "") {
        pWhereClause += " AND ChargeTypeCode LIKE N'%" + $("#slSearchCharges option:selected").text() + "%'" + " \n";
    }
    FillPayablesModalTableControls(pStrFnName, pWhereClause, pDivName, ptblModalName, pCheckboxNameAttr, false //pIsInsert
        , function () { HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase()); });

    $("#btn-SearchCharges").attr("onclick", "Payables_MultiRowEdit();");
    $("#btnSelectChargesApply").attr("onclick", "Payables_UpdateList(false);");
}
function PayableSuppliers_GetList(pID, pSlName, pCallback) {
    var pWhereClause = " WHERE OperationID = " + $("#hOperationID").val();
    pWhereClause += " AND PartnerID IS NOT NULL ";
    //pWhereClause += " AND PartnerTypeID != " + constCustomerPartnerTypeID;
    pWhereClause += " ORDER BY PartnerTypeName ";
    //parameters: ID, strFnName, First Row in select list, select list name, whereClause, callback
    //GetListWithCodeAndNameAndWhereClause(pID, "/api/OperationPartners/LoadAll", "Select Supplier", pSlName, pWhereClause);
    GetListOperationPartnersWithPartnerTypeIDAndPartnerIDAttrAndWhereClause(pID, "/api/OperationPartners/LoadAll", "Select Supplier", pSlName, pWhereClause, pCallback);
}
function PayableUOM_GetList(pID, pSlName) {
    var pWhereClause = "";
    //pWhereClause += " Where OperationID = " + $("#hOperationID").val();
    //if ($("#hShipmentType").val() == constFCLShipmentType)
    //    pWhereClause += " WHERE IsUsedInFCl = 1 ";
    //else
    //    if ($("#hShipmentType").val() == constLCLShipmentType)
    //        pWhereClause += " WHERE IsUsedInLCL = 1 ";
    //    else
    //        if ($("#hShipmentType").val() == constFTLShipmentType)
    //            pWhereClause += " WHERE IsUsedInFTL = 1 ";
    //        else
    //            if ($("#hShipmentType").val() == constLTLShipmentType)
    //                pWhereClause += " WHERE IsUsedInLTL = 1 ";
    //            else
    //                if ($("#hShipmentType").val() == constConsolidationShipmentType)
    //                    pWhereClause += " WHERE IsUsedInConsolidation = 1 ";
    //                else
    //                    if ($("#hShipmentType").val() == "0")
    //                        pWhereClause += " WHERE IsUsedInAir = 1 ";
    //pWhereClause += " OR ID = " + pID; //for the case that settings changed for a UOM at the time it is taken 
    pWhereClause += " ORDER BY Code ";
    //GetListWithCodeAndNameAndWhereClause(pID, "/api/NoAccessMeasurements/LoadAll", "Select UOM", pSlName, pWhereClause);
    GetListWithNameAndWhereClause(pID, "/api/NoAccessMeasurements/LoadAll", "Select UOM", pSlName, pWhereClause);
}
function Payables_CurrencyChanged() {
    $("#txtPayableExchangeRate").val($("#slPayableCurrency option:selected").attr("MasterDataExchangeRate"));
    if ($("#hDefaultCurrencyID").val() == $("#slPayableCurrency").val())
        $("#txtPayableExchangeRate").attr("disabled", "disabled");
    else
        $("#txtPayableExchangeRate").removeAttr("disabled");
}
function Payables_Update(pSaveandAddNew) {
    if (
        (!isValidDate($("#txtPayableEntryDate").val().trim(), 1) && $("#txtPayableEntryDate").val().trim() != "")
        || (!isValidDate($("#txtPayableIssueDate").val().trim(), 1) && $("#txtPayableIssueDate").val().trim() != "")
    )
        swal(strSorry, strCheckDates);
    //else if (pDefaults.UnEditableCompanyName == "GBL" && $("#slSites").val() == '')
    //    swal("Sorry", "Please, select site.");
    else if ($("#txtPayableExchangeRate").val() == "" || parseFloat($("#txtPayableExchangeRate").val()) == 0
        || (parseInt($("#txtPayableExchangeRate").val()) == 1 && pDefaults.CurrencyID != ($("#slPayableCurrency").val())))
        swal("Sorry", "Please, check exchange rate.");
    else {
        InsertUpdateFunction("form", "/api/Payables/Update", {
            pSavedFrom: 0 //pSavedFrom=10 : saved from Operations
            , pOperationContainersAndPackagesID: $("#slPayableTank").val() == "" ? 0 : $("#slPayableTank").val()
            , pID: $("#hPayableID").val()
            //, pMeasurementID: $("#txtCalculationType").attr("MeasurementID")
            , pOperationID: $("#hOperationID").val()
            , pChargeTypeID: $("#slPayableChargeType").val() == "" ? 0 : $("#slPayableChargeType").val() //$("#txtPayableType").attr("ChargeTypeID")
            , pMeasurementID: $('#slPayableUOM option:selected').val() != ""
                ? $('#slPayableUOM option:selected').val()
                : 0
            //, pContainerTypeID: ((($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked')) && $('#slPayableUOM option:selected').val() != "")
            //    ? $('#slPayableUOM option:selected').val()
            //    : 0)
            , pContainerTypeID: 0
            //, pPackageTypeID: ((($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked')) && $('#slPayableUOM option:selected').val() != "")
            //    ? $('#slPayableUOM option:selected').val()
            //    : 0)
            , pPOrC: ($('#slPayablePOrC option:selected').val() == "" ? 0 : $('#slPayablePOrC option:selected').val())
            , pSupplierOperationPartnerID: ($('#slPayableSupplier option:selected').val() == "" ? 0 : $('#slPayableSupplier option:selected').val())
            , pQuantity: ($("#txtPayableQuantity").val().trim() == "" ? 0 : $("#txtPayableQuantity").val().trim())
            , pCostPrice: ($("#txtPayableUnitPrice").val().trim() == "" ? 0 : $("#txtPayableUnitPrice").val().trim())

            , pAmountWithoutVAT: $("#txtPayableAmountWithoutVAT").val()
            , pTaxTypeID: $("#slPayableTax").val() == "" ? 0 : $("#slPayableTax").val()
            , pTaxPercentage: $("#txtPayableTaxPercentage").val() == "" ? 0 : $("#txtPayableTaxPercentage").val()
            , pTaxAmount: $("#txtPayableTaxAmount").val() == "" ? 0 : $("#txtPayableTaxAmount").val()
            , pDiscountTypeID: $("#slPayableDiscount").val() == "" ? 0 : $("#slPayableDiscount").val()
            , pDiscountPercentage: $("#txtPayableDiscountPercentage").val() == "" ? 0 : $("#txtPayableDiscountPercentage").val()
            , pDiscountAmount: $("#txtPayableDiscountAmount").val() == "" ? 0 : $("#txtPayableDiscountAmount").val()

            , pCostAmount: ($("#txtPayableAmount").val().trim() == "" ? 0 : $("#txtPayableAmount").val().trim())
            , pInitialSalePrice: ($("#txtPayableInitialSalePrice").val().trim() == "" ? 0 : $("#txtPayableInitialSalePrice").val().trim())
            , pSupplierInvoiceNo: ($("#txtPayableSupplierInvoiceNo").val().trim() == "" ? 0 : $("#txtPayableSupplierInvoiceNo").val().trim().toUpperCase())
            , pSupplierReceiptNo: ($("#txtPayableSupplierReceiptNo").val().trim() == "" ? 0 : $("#txtPayableSupplierReceiptNo").val().trim().toUpperCase())
            , pEntryDate: ($("#txtPayableEntryDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtPayableEntryDate").val().trim()))
            , pBillID: ($('#slPayableBill option:selected').val() == "" ? 0 : $('#slPayableBill option:selected').val())

            , pIssueDate: ($("#txtPayableIssueDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtPayableIssueDate").val().trim()))

            , pExchangeRate: ($("#txtPayableExchangeRate").val().trim() == "" ? 0 : $("#txtPayableExchangeRate").val().trim())
            , pCurrencyID: ($('#slPayableCurrency option:selected').val() == "" ? 0 : $('#slPayableCurrency option:selected').val())
            , pNotes: $("#txtPayableNotes").val().toUpperCase().trim()
            //the next 2 parameters are to check uniqueness of supplier invoice No. in the controller
            , pPartnerTypeID: $('#slPayableSupplier option:selected').attr("PartnerTypeID") == "" ? 0 : $('#slPayableSupplier option:selected').attr("PartnerTypeID")
            , pPartnerID: $('#slPayableSupplier option:selected').attr("PartnerID") == "" ? 0 : $('#slPayableSupplier option:selected').attr("PartnerID")
            , pPayableBillTo: 0
            , pSupplierSiteID: ($('#slSites option:selected').val() == "" ? 0 : $('#slSites option:selected').val())
            , pTruckingOrderID: 0
        }, pSaveandAddNew, "EditPayableModal"
            , function (data) {
                OperationCharges_FillModal(); //Payables_LoadWithPagingWithWhereClause($("#hOperationID").val());
                if (data[1] != "") //supplier invoice number uniqueness violated
                    swal(strSorry, data[1]);
            });
    }
}
function Payables_UpdateList(pSaveandAddNew) {
    var pSelectedPayablesIDsToUpdate = GetAllSelectedIDsAsStringWithNameAttr("cbSelectPayables");//returns string array of IDs
    var pPOrCList = "";
    var pSupplierList = "";
    var pUOMList = "";
    var pQuantityList = "";
    var pCostPriceList = "";

    var pAmountWithoutVATList = "";
    var pTaxTypeIDList = "";
    var pTaxPercentageList = "";
    var pTaxAmountList = "";
    var pDiscountTypeIDList = "";
    var pDiscountPercentageList = "";
    var pDiscountAmountList = "";

    var pCostAmountList = "";
    var pInitialSalePriceList = "";
    var pSupplierInvoiceNumberList = "";
    var pSupplierReceiptNumberList = "";
    var pIssueDateList = "";
    var pEntryDateList = "";
    var pExchangeRateList = "";
    var pCurrencyList = "";
    var pPartnerTypeIDList = "";//pPartnerTypeIDList,pPartnerIDList are to check uniqueness of supplier invoice No. in the controller
    var pPartnerIDList = "";
    var pSupplierSiteIDList = "";
    var pNotesList = "";
    var pBillIDList = "";
    var _IsZeroExchangeRate = false;
    var _NullSupplierSite = false;
    var _NullSupplierInvoiceNo = false;
    if (pSelectedPayablesIDsToUpdate != "") {
        FadePageCover(true);
        var NumberOfSelectRows = pSelectedPayablesIDsToUpdate.split(',').length;
        for (i = 0; i < NumberOfSelectRows; i++) {
            var currentRowID = pSelectedPayablesIDsToUpdate.split(",")[i];
            if (IsNull($("#txtTblModalPayableSupplierInvoiceNo" + currentRowID).val(), "0") == "0" && pDefaults.UnEditableCompanyName == "MIL")
                _NullSupplierInvoiceNo = true;
            if ($("#txtTblModalPayableExchangeRate" + currentRowID).val() == undefined || $("#txtTblModalPayableExchangeRate" + currentRowID).val() == "" || parseFloat($("#txtTblModalPayableExchangeRate" + currentRowID).val()) == 0
                || (parseInt($("#txtTblModalPayableExchangeRate" + currentRowID).val()) == 1 && pDefaults.CurrencyID != ($("#slPayableCurrency" + currentRowID).val())))
                _IsZeroExchangeRate = true;
            pPOrCList += ((pPOrCList == "") ? "" : ",") + ($("#slPayablePOrC" + currentRowID).val() == undefined || $("#slPayablePOrC" + currentRowID).val() == "" ? 0 : $("#slPayablePOrC" + currentRowID).val());
            pSupplierList += ((pSupplierList == "") ? "" : ",") + ($("#slPayableSupplier" + currentRowID).val() == undefined || $("#slPayableSupplier" + currentRowID).val() == "" ? 0 : $("#slPayableSupplier" + currentRowID).val());
            pUOMList += ((pUOMList == "") ? "" : ",") + ($("#slPayableUOM" + currentRowID).val() == undefined || $("#slPayableUOM" + currentRowID).val() == "" ? 0 : $("#slPayableUOM" + currentRowID).val());
            pQuantityList += ((pQuantityList == "") ? "" : ",") + ($("#txtTblModalPayableQuantity" + currentRowID).val() == undefined || $("#txtTblModalPayableQuantity" + currentRowID).val() == "" ? 0 : $("#txtTblModalPayableQuantity" + currentRowID).val());
            pCostPriceList += ((pCostPriceList == "") ? "" : ",") + ($("#txtTblModalPayableCostPrice" + currentRowID).val() == undefined || $("#txtTblModalPayableCostPrice" + currentRowID).val() == "" ? 0 : $("#txtTblModalPayableCostPrice" + currentRowID).val());

            pAmountWithoutVATList += ((pAmountWithoutVATList == "") ? "" : ",") + ($("#txtTblModalPayableCostAmountWithoutVAT" + currentRowID).val() == undefined || $("#txtTblModalPayableCostAmountWithoutVAT" + currentRowID).val() == "" ? 0 : $("#txtTblModalPayableCostAmountWithoutVAT" + currentRowID).val());
            pTaxTypeIDList += ((pTaxTypeIDList == "") ? "" : ",") + ($("#slPayableTax" + currentRowID).val() == undefined || $("#slPayableTax" + currentRowID).val() == "" ? 0 : $("#slPayableTax" + currentRowID).val());
            pTaxPercentageList += ((pTaxPercentageList == "") ? "" : ",") + ($("#txtTblModalPayableTaxPercentage" + currentRowID).val() == undefined || $("#txtTblModalPayableTaxPercentage" + currentRowID).val() == "" ? 0 : $("#txtTblModalPayableTaxPercentage" + currentRowID).val());
            pTaxAmountList += ((pTaxAmountList == "") ? "" : ",") + ($("#txtTblModalPayableTaxAmount" + currentRowID).val() == undefined || $("#txtTblModalPayableTaxAmount" + currentRowID).val() == "" ? 0 : $("#txtTblModalPayableTaxAmount" + currentRowID).val());
            pDiscountTypeIDList += ((pDiscountTypeIDList == "") ? "" : ",") + ($("#slPayableDiscount" + currentRowID).val() == undefined || $("#slPayableDiscount" + currentRowID).val() == "" ? 0 : $("#slPayableDiscount" + currentRowID).val());
            pDiscountPercentageList += ((pDiscountPercentageList == "") ? "" : ",") + ($("#txtTblModalPayableDiscountPercentage" + currentRowID).val() == undefined || $("#txtTblModalPayableDiscountPercentage" + currentRowID).val() == "" ? 0 : $("#txtTblModalPayableDiscountPercentage" + currentRowID).val());
            pDiscountAmountList += ((pDiscountAmountList == "") ? "" : ",") + ($("#txtTblModalPayableDiscountAmount" + currentRowID).val() == undefined || $("#txtTblModalPayableDiscountAmount" + currentRowID).val() == "" ? 0 : $("#txtTblModalPayableDiscountAmount" + currentRowID).val());

            pCostAmountList += ((pCostAmountList == "") ? "" : ",") + ($("#txtTblModalPayableCostAmount" + currentRowID).val() == undefined || $("#txtTblModalPayableCostAmount" + currentRowID).val() == "" ? 0 : $("#txtTblModalPayableCostAmount" + currentRowID).val());
            pInitialSalePriceList += ((pInitialSalePriceList == "") ? "" : ",") + ($("#txtTblModalPayableInitialSalePrice" + currentRowID).val() == undefined || $("#txtTblModalPayableInitialSalePrice" + currentRowID).val() == "" ? 0 : $("#txtTblModalPayableInitialSalePrice" + currentRowID).val());
            pSupplierInvoiceNumberList += ((pSupplierInvoiceNumberList == "") ? "" : ",") + ($("#txtTblModalPayableSupplierInvoiceNo" + currentRowID).val() == undefined || $("#txtTblModalPayableSupplierInvoiceNo" + currentRowID).val().trim() == "" ? (pDefaults.UnEditableCompanyName == "GBL" ? "N/A" : 0) : $("#txtTblModalPayableSupplierInvoiceNo" + currentRowID).val().trim().toUpperCase());
            pSupplierReceiptNumberList += ((pSupplierReceiptNumberList == "") ? "" : ",") + ($("#txtTblModalPayableSupplierReceiptNo" + currentRowID).val() == undefined || $("#txtTblModalPayableSupplierReceiptNo" + currentRowID).val().trim() == "" ? 0 : $("#txtTblModalPayableSupplierReceiptNo" + currentRowID).val().trim().toUpperCase());
            pIssueDateList += ((pIssueDateList == "") ? "" : ",") + ($("#txtTblModalPayableIssueDate" + currentRowID).val() == undefined || $("#txtTblModalPayableIssueDate" + currentRowID).val().trim() == "" ? "" : $("#txtTblModalPayableIssueDate" + currentRowID).val().trim());
            pEntryDateList += ((pEntryDateList == "") ? "" : ",") + ($("#txtTblModalPayableEntryDate" + currentRowID).val() == undefined || $("#txtTblModalPayableEntryDate" + currentRowID).val().trim() == "" ? "" : $("#txtTblModalPayableEntryDate" + currentRowID).val().trim());
            //pEntryDateList += ((pEntryDateList == "") ? "" : ",") + ($("#txtTblModalPayableEntryDate" + currentRowID).val() == undefined || $("#txtTblModalPayableEntryDate" + currentRowID).val().trim() == "" ? "" : ConvertDateFormat($("#txtTblModalPayableEntryDate" + currentRowID).val().trim()));
            pExchangeRateList += ((pExchangeRateList == "") ? "" : ",") + ($("#txtTblModalPayableExchangeRate" + currentRowID).val() == undefined || $("#txtTblModalPayableExchangeRate" + currentRowID).val() == "" ? 0 : $("#txtTblModalPayableExchangeRate" + currentRowID).val());
            pCurrencyList += ((pCurrencyList == "") ? "" : ",") + ($("#slPayableCurrency" + currentRowID).val() == undefined || $("#slPayableCurrency" + currentRowID).val() == "" ? 0 : $("#slPayableCurrency" + currentRowID).val());
            pPartnerTypeIDList += ((pPartnerTypeIDList == "") ? "" : ",") + ($("#slPayableSupplier" + currentRowID).val() == undefined || $("#slPayableSupplier" + currentRowID).val() == "" ? 0 : $("#slPayableSupplier" + currentRowID + " option:selected").attr("PartnerTypeID"));
            pPartnerIDList += ((pPartnerIDList == "") ? "" : ",") + ($("#slPayableSupplier" + currentRowID).val() == undefined || $("#slPayableSupplier" + currentRowID).val() == "" ? 0 : $("#slPayableSupplier" + currentRowID + " option:selected").attr("PartnerID"));
            pSupplierSiteIDList += ((pSupplierSiteIDList == "") ? "" : ",") + ($("#slPayableSupplierSiteID" + currentRowID).val() == undefined || $("#slPayableSupplierSiteID" + currentRowID).val() == "" ? 0 : $("#slPayableSupplierSiteID" + currentRowID).val());
            pNotesList += ((pNotesList == "") ? "" : ",") + ($("#txtTblModalPayableNotes" + currentRowID).val() == undefined || $("#txtTblModalPayableNotes" + currentRowID).val().trim() == "" ? 0 : $("#txtTblModalPayableNotes" + currentRowID).val().trim().toUpperCase());
            pBillIDList += ((pBillIDList == "") ? "" : ",") + "0";
        }
    }
    _NullSupplierSite = false;
    if (_NullSupplierSite) {
        swal("Sorry", "Please, select site.");
        FadePageCover(false);
    }
    else if (_IsZeroExchangeRate) {
        swal("Sorry", "Please, check exchange rate.");
        FadePageCover(false);
    }
    else if (_NullSupplierInvoiceNo) {
        swal("Sorry", "Please, Insert Supplier Invoice No.");
        FadePageCover(false);
    }
    else {
        if (pSelectedPayablesIDsToUpdate != "")
            CallPOSTFunctionWithParameters("/api/Payables/UpdateList"
                , {
                    "pIsCalledFromOperations": false
                    , "pSelectedPayablesIDsToUpdate": pSelectedPayablesIDsToUpdate
                    , "pPOrCList": pPOrCList
                    , "pSupplierList": pSupplierList
                    , "pUOMList": pUOMList
                    , "pQuantityList": pQuantityList
                    , "pCostPriceList": pCostPriceList

                    , "pAmountWithoutVATList": pAmountWithoutVATList
                    , "pTaxTypeIDList": pTaxTypeIDList
                    , "pTaxPercentageList": pTaxPercentageList
                    , "pTaxAmountList": pTaxAmountList
                    , "pDiscountTypeIDList": pDiscountTypeIDList
                    , "pDiscountPercentageList": pDiscountPercentageList
                    , "pDiscountAmountList": pDiscountAmountList

                    , "pCostAmountList": pCostAmountList
                    , "pInitialSalePriceList": pInitialSalePriceList
                    , "pSupplierInvoiceNumberList": pSupplierInvoiceNumberList
                    , "pSupplierReceiptNumberList": pSupplierReceiptNumberList
                    , "pIssueDateList": pIssueDateList
                    , "pEntryDateList": pEntryDateList
                    , "pExchangeRateList": pExchangeRateList
                    , "pCurrencyList": pCurrencyList
                    , "pPartnerTypeIDList": pPartnerTypeIDList
                    , "pPartnerIDList": pPartnerIDList
                    , "pSupplierSiteIDList": pSupplierSiteIDList
                    , "pNotesList": pNotesList
                    , "pBillIDList": pBillIDList
                }
                , function (data) {
                    debugger;
                    OperationCharges_FillModal(); //Payables_LoadWithPagingWithWhereClause($("#hOperationID").val());
                    if (data[1] != "")
                        swal(strSorry, data[1]);
                    else {
                        swal("Success", "Saved successfully.");
                        jQuery("#SelectChargesModal").modal("hide");
                    }
                }, null);
    }
}
function Payables_UpdateCostSingle(pPayableID, pControlPrefix_Cost, pControlPrefix_Quantity) {
    debugger;
    FadePageCover(true);
    var pParametersWithValues = {
        pPayableID_UpdateCost: pPayableID
        , pCostPrice: $("#" + pControlPrefix_Cost + pPayableID).val().trim() == "" ? 0 : $("#" + pControlPrefix_Cost + pPayableID).val().trim()
        , pQuantity: ($("#" + pControlPrefix_Quantity + pPayableID).val().trim() == "" || $("#" + pControlPrefix_Quantity + pPayableID).val().trim() == 0)
            ? 1
            : $("#" + pControlPrefix_Quantity + pPayableID).val().trim()
    };
    CallGETFunctionWithParameters("/api/Payables/UpdateCost_RealTime", pParametersWithValues
        , function (pData) {
            var _ReturnedMessage = pData[0];
            var _Payable = JSON.parse(pData[1]);
            $("#tblPayables tr[ID=" + pPayableID + "] td.PayableQuantity").text(_Payable.Quantity);
            $("#tblPayables tr[ID=" + pPayableID + "] td.PayableCostAmount").text(_Payable.CostAmount);
            $("#tblPayables tr[ID=" + pPayableID + "] td.PayableTaxAmount").text(_Payable.TaxAmount);
            $("#tblPayables tr[ID=" + pPayableID + "] td.PayableDiscountAmount").text(_Payable.DiscountAmount);
            $("#tblPayables tr[ID=" + pPayableID + "] td.PayableAmountWithoutVAT").text(_Payable.AmountWithoutVAT);

            PayablesAndReceivables_CalculateSummary();
            FadePageCover(false);
        }
        , null);
}
function Payables_InsertListWithoutValues(pSaveandAddNew) {
    var pSelectedIDs = GetAllSelectedIDsAsStringWithNameAttr("cbSelectPayables");//returns string array of IDs
    debugger;
    if (pSelectedIDs != "")
        InsertSelectedCheckboxItems("/api/Payables/InsertListWithoutValues"
            , { pOperationID: $("#hOperationID").val(), pSelectedIDs: pSelectedIDs, pQuotationRouteID: 0, pOperationContainersAndPackagesID: 0, pOperationVehicleID: 0, pTruckingOrderID: $("#hRoutingID" + RoutingSuffix).val() }
            , pSaveandAddNew
            , "SelectChargesModal" //pModalID
            , null //function () { Payables_GetAvailableCharges(); }
            , function () {
                OperationCharges_FillModal(); //Payables_LoadWithPagingWithWhereClause($("#hOperationID").val());
            });
}
function Payables_PayableSupplierInvoiceOrReceiptNoChanged(pSupplierControl, pSupplierInvoiceControlID, pSupplierReceiptControlID) { //pSupplierControl is a control not ID so dont use #
    debugger;
    //if ($(pSupplierInvoiceControlID).val() == "" && $(pSupplierReceiptControlID).val() == "") {
    if ($(pSupplierInvoiceControlID).val() == "" || pDefaults.UnEditableCompanyName != "GBL") {
        $(pSupplierControl).removeAttr("disabled");
    }
    else {
        $(pSupplierControl).attr("disabled", "disabled");
    }
}
function CalculatePayablesAmount() {
    var decAmountWithoutVAT = 0;
    var decTaxAmount = 0; var decTaxPercentage = 0.0;
    var decDiscountAmount = 0; var decDiscountPercentage = 0.0;

    decAmountWithoutVAT = $("#txtPayableQuantity").val() * $("#txtPayableUnitPrice").val();
    $("#txtPayableAmountWithoutVAT").val(decAmountWithoutVAT);
    decTaxPercentage = $("#slPayableTax option:selected").attr("CurrentPercentage");
    decTaxAmount = decAmountWithoutVAT * decTaxPercentage / 100;
    decDiscountPercentage = $("#slPayableDiscount option:selected").attr("CurrentPercentage");
    decDiscountAmount = decAmountWithoutVAT * decDiscountPercentage / 100;
    $("#txtPayableTaxPercentage").val(decTaxPercentage);
    $("#txtPayableTaxAmount").val(decTaxAmount.toFixed(4));
    $("#txtPayableDiscountPercentage").val(decDiscountPercentage);
    $("#txtPayableDiscountAmount").val(decDiscountAmount.toFixed(4));
    $("#txtPayableAmount").val((decAmountWithoutVAT + decTaxAmount - decDiscountAmount).toFixed(4));
}
//if not insert (i.e. update then all will rows will be selected)
function Payables_Row_CalculatePayablesAmount(pRowID, pIsInsert) {
    var rowQuantity = $("#txtTblModalPayableQuantity" + pRowID).val();
    var rowCostPrice = $("#txtTblModalPayableCostPrice" + pRowID).val();

    var decAmountWithoutVAT = 0;
    var decTaxAmount = 0; var decTaxPercentage = 0.0;
    var decDiscountAmount = 0; var decDiscountPercentage = 0.0;

    decAmountWithoutVAT = rowQuantity * rowCostPrice;
    $("#txtTblModalPayableCostAmountWithoutVAT" + pRowID).val(decAmountWithoutVAT);
    decTaxPercentage = $("#slPayableTax" + pRowID + " option:selected").attr("CurrentPercentage");
    decTaxAmount = decAmountWithoutVAT * decTaxPercentage / 100;
    decDiscountPercentage = $("#slPayableDiscount" + pRowID + " option:selected").attr("CurrentPercentage");
    decDiscountAmount = decAmountWithoutVAT * decDiscountPercentage / 100;
    $("#txtTblModalPayableTaxPercentage" + pRowID).val(decTaxPercentage);
    $("#txtTblModalPayableTaxAmount" + pRowID).val(decTaxAmount.toFixed(4));
    $("#txtTblModalPayableDiscountPercentage" + pRowID).val(decDiscountPercentage);
    $("#txtTblModalPayableDiscountAmount" + pRowID).val(decDiscountAmount.toFixed(4));
    $("#txtTblModalPayableCostAmount" + pRowID).val((decAmountWithoutVAT + decTaxAmount - decDiscountAmount).toFixed(4));

    if (pIsInsert) //incase of insert check and uncheck the checkbox to in GetSelectedIDs incase of insert
        Payables_txtTblModalCostAmount_Changed(pRowID, pIsInsert);
}
//to handle change of currency in the multi row edit modal
function Payables_txtTblModalCurrency_Changed(pRowID, pIsInsert) {
    debugger;
    //if (pIsInsert) { //if not insert then all IDs will be updated
    $("#txtTblModalPayableExchangeRate" + pRowID).val($("#slPayableCurrency" + pRowID + " option:selected").attr("MasterDataExchangeRate"));
    if ($("#hDefaultCurrencyID").val() == $("#slPayableCurrency" + pRowID).val())
        $("#txtTblModalPayableExchangeRate" + pRowID).attr("disabled", "disabled");
    else
        $("#txtTblModalPayableExchangeRate" + pRowID).removeAttr("disabled");
    //}
}
function Payables_txtTblModalCostAmount_Changed(pRowID, pIsInsert) {
    if (pIsInsert) { //if not insert then all IDs will be updated
        var varPayableCostAmount = $("#tblModalPayables tr[ID='" + pRowID + "']").find('input[name=txtTblModalPayableCostAmount]').val();
        if (varPayableCostAmount != 0 && varPayableCostAmount != "")
            $("#tblModalPayables tr[ID='" + pRowID + "']").find('input[name=cbSelectPayables]').prop("checked", true);
        else
            $("#tblModalPayables tr[ID='" + pRowID + "']").find('input[name=cbSelectPayables]').prop("checked", false);
    }
}
function Payables_DeleteList(callback) {
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblPayables') != "")
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
                DeleteListFunction("/api/Payables/Delete"
                    , { pPayablesIDs: GetAllSelectedIDsAsString('tblPayables'), pOperationID: $("#hOperationID").val() }
                    , function () {
                        OperationCharges_FillModal();
                    });
            });
    //DeleteListFunction("/api/Payables/Delete", { "pPayablesIDs": GetAllSelectedIDsAsString('tblPayables') }, function () { LoadViews("OperationsEdit", null, $("#hOperationID").val()); });
}
/******************************************Get Suppliers Sites******************************************/
function FillSupplierSites(pID) {
    debugger;
    if (pDefaults.UnEditableCompanyName == "GBL") {
        var pWhereClause = "WHERE SupplierID= " + $('#slPayableSupplier option:selected').attr("partnerid");
        if ($('#slPayableSupplier option:selected').attr("partnertypeid") != '8')
            pWhereClause = "Where 1=0";

        CallGETFunctionWithParameters("/api/Suppliers/LoadSupplierSites"
            , { pWhereClause: pWhereClause }
            , function (pData) {
                FillListFromObject(pID, 2, TranslateString("SelectFromMenu"), "slSites", pData[0], null);
            }
            , null);
    }
}
function FillSupplierSitesBySupplier(pID, pItemID) {
    debugger;
    var ControlID = slPayableSupplier + pItemID;
    var pWhereClause = "WHERE SupplierID= " + $("#slPayableSupplier" + pItemID + " option:selected").attr("partnerid");
    if ($("#slPayableSupplier" + pItemID + " option:selected").attr("partnertypeid") != '8')
        pWhereClause = "Where 1=0";

    CallGETFunctionWithParameters("/api/Suppliers/LoadSupplierSites"
        , { pWhereClause: pWhereClause }
        , function (pData) {
            FillListFromObject(pID, 2, TranslateString("SelectFromMenu"), "slPayableSupplierSiteID" + pItemID, pData[0], null);
        }
        , null);
}
/******************Receivables**************************/
function Receivables_BindTableRows(pReceivables) {
    ClearAllTableRows("tblReceivables");
    debugger;
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pReceivables, function (i, item) {
        AppendRowtoTable("tblReceivables",
            //("<tr ID='" + item.ID + "' " + (item.InvoiceID == 0 && OERec && $("#hIsOperationDisabled").val() == false ? "ondblclick='Receivables_EditByDblClick(" + item.ID + ");'>" : ">")
            ("<tr ID='" + item.ID + "' " + (item.InvoiceID == 0 && item.AccNoteID == 0 && OERec ? "ondblclick='Receivables_EditByDblClick(" + item.ID + ");'>" : ">")
                + "<td class='ReceivableID'> <input " + (item.InvoiceID == 0 && item.AccNoteID == 0 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "' /></td>"
                //+ "<td class='Receivable' val='" + item.ChargeTypeID + "'>" + item.ChargeTypeCode + " (" + item.ChargeTypeName + ")" + "</td>"
                + "<td class='Receivable' val='" + item.ChargeTypeID + "'>" + (pDefaults.UnEditableCompanyName == "GBL" ? (item.ChargeTypeName + " (" + item.ChargeTypeCode + ")") : item.ChargeTypeName) + "</td>"
                + "<td class='ReceivablePOrC hide' val='" + item.POrC + "'>" + (item.POrC == 0 ? "" : item.POrCCode) + "</td>"
                //+ "<td class='ReceivableSupplier hide' val='" + item.SupplierID + "'>" + (item.SupplierID == 0 ? "" : item.SupplierName) + "</td>"
                //+ ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') ? ("<td class='ReceivableUOM' val='" + item.ContainerTypeID + "'>" + (item.ContainerTypeCode == 0 ? "" : item.ContainerTypeCode) + "</td>") : "")
                //+ ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='ReceivableUOM' val='" + item.PackageTypeID + "'>" + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + "</td>") : "")
                + "<td class='ReceivableUOM hide' val='" + item.MeasurementID + "'>" + (item.MeasurementID == 0 ? "" : item.MeasurementCode) + "</td>"
                + "<td class='ReceivableQuantity'>" + item.Quantity + "</td>"
                + "<td class='ReceivableCostPrice hide'>" + (item.CostPrice).toFixed(4) + "</td>"
                + "<td class='ReceivableCostAmount hide'>" + (item.CostAmount).toFixed(4) + "</td>"
                + "<td class='ReceivableSalePrice'>" + (item.SalePrice).toFixed(4) + "</td>"

                + "<td class='ReceivableAmountWithoutVAT hide'>" + item.AmountWithoutVAT.toFixed(4) + "</td>"
                + "<td class='ReceivableTaxTypeID' val=" + item.TaxTypeID + ">" + (item.TaxTypeID == 0 ? "" : item.TaxTypeName) + "</td>"
                + "<td class='ReceivableTaxPercentage hide'>" + item.TaxPercentage.toFixed(4) + "</td>"
                + "<td class='ReceivableTaxAmount hide'>" + item.TaxAmount.toFixed(4) + "</td>"
                + "<td class='ReceivableDiscountTypeID' val=" + item.DiscountTypeID + ">" + (item.DiscountTypeID == 0 ? "" : (item.DiscountPercentage + '%')) + "</td>"
                + "<td class='ReceivableDiscountPercentage hide'>" + item.DiscountPercentage.toFixed(4) + "</td>"
                + "<td class='ReceivableDiscountAmount hide'>" + item.DiscountAmount.toFixed(4) + "</td>"

                + "<td class='ReceivableSaleAmount'>" + (item.SaleAmount).toFixed(4) + "</td>"
                + "<td class='ReceivableExchangeRate'>" + item.ExchangeRate.toFixed(4) + "</td>"
                + "<td class='ReceivableCurrency' val='" + item.CurrencyID + "'>" + (item.CurrencyID == 0 ? "" : item.CurrencyCode) + "</td>"
                + "<td class='ReceivableInvoice hide' val='" + item.InvoiceID + "'>" + (item.InvoiceID == 0 ? "" : (item.InvoiceNumber + " / " + item.InvoiceTypeName)) + "</td>"
                + "<td class='ReceivableAccNote hide' val='" + item.AccNoteID + "'>" + (item.AccNoteID == 0 ? "" : item.Code) + "</td>"
                + "<td class='ReceivableOperation hide' val='" + item.OperationID + "'>" + (item.OperationID == 0 ? "" : item.OperationCode) + "</td>"
                + "<td class='ReceivableNotes hide'>" + (item.Notes == "0" ? "" : item.Notes) + "</td>"

                + "<td class='ReceivableIssueDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.IssueDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.IssueDate)) : "") + "</td>"
                + "<td class='ReceivableOperationContainersAndPackagesID hide'>" + item.OperationContainersAndPackagesID + "</td>"
                + "<td class='ReceivableTrailerID hide'>" + item.TrailerID + "</td>"

                + "<td class='ReceivableCreatorName hide'>" + item.CreatorName + "</td>"
                //+ "<td class='ReceivableCreationDate hide'>" + item.CreationDate + "</td>"
                + "<td class='ReceivableCreationDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
                + " <i class='fa fa-calendar'></i>"
                //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + "</small>"
                + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.CreationDate)) + "</small>"
                + "</span>"
                + "</td>"
                + "<td class='ReceivableModificatorName hide'>" + item.ModificatorName + "</td>"
                //+ "<td class='ReceivableModificationDate hide'>" + item.ModificationDate + "</td>"
                + "<td class='ReceivableModificationDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
                + " <i class='fa fa-calendar'></i>"
                //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.ModificationDate)) + "</small>"
                + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.ModificationDate)) + "</small>"
                + "</span>"
                + "</td>"
                + "<td class='hide'><a href='#EditReceivableModal' data-toggle='modal' onclick='Receivables_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
        //+ "<td class='hide'><a href='#EditReceivableModal' data-toggle='modal' onclick='Receivables_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
        //+ "</tr>"));
    });
    ////ApplyPermissions();
    //if (OARec && $("#hIsOperationDisabled").val() == false) { $("#btn-AddReceivables").removeClass("hide"); $("#btn-GenerateDefaultReceivables").removeClass("hide"); $("#btn-GenerateReceivablesFromQuotation").removeClass("hide"); $("#btn-GenerateReceivablesFromPayables").removeClass("hide"); $("#btn-ApplyInvoiceTypeDefaults").removeClass("hide"); $("#slReceivableInvoiceTypes").removeClass("hide"); }
    //else { $("#btn-AddReceivables").addClass("hide"); $("#btn-GenerateDefaultReceivables").addClass("hide"); $("#btn-GenerateReceivablesFromQuotation").addClass("hide"); $("#btn-GenerateReceivablesFromPayables").addClass("hide"); $("#btn-ApplyInvoiceTypeDefaults").addClass("hide"); $("#slReceivableInvoiceTypes").addClass("hide"); }
    //if (ODRec && $("#hIsOperationDisabled").val() == false) $("#btn-DeleteReceivable").removeClass("hide"); else $("#btn-DeleteReceivable").addClass("hide");
    //if (OERec && $("#hIsOperationDisabled").val() == false) $("#btn-MultiRowEditReceivables").removeClass("hide"); else $("#btn-MultiRowEditReceivables").addClass("hide");

    BindAllCheckboxonTable("tblReceivables", "ReceivableID", "cb-CheckAll-Receivables");
    CheckAllCheckbox("HeaderDeleteReceivableID");
    //HighlightText("#tblReceivables>tbody>tr", $("#txt-Search").val().trim());
    //if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
    //    swal(strSorry, strDeleteFailMessage, "warning");
    //    showDeleteFailMessage = false;
    //}
    //PayablesAndReceivables_CalculateSummary();
    //Receivables_CalculateSubtotals();
}
function Receivables_GetAvailableCharges() {
    debugger;
    $("#div-search-controls-sl").addClass("hide");

    $("#divSelectCharges").html("");
    FadePageCover(true);
    var pStrFnName = "/api/ChargeTypes/LoadAll";
    var pDivName = "divSelectCharges";
    var ptblModalName = "tblModalReceivables";
    var pCheckboxNameAttr = "cbSelectCharges";
    var pWhereClause = "";
    pWhereClause += " WHERE IsUsedInReceivable = 1 AND IsInactive = 0 AND IsOperationChargeType=1 ";
    pWhereClause += ($("#cbIsOcean").prop('checked') == true ? " AND IsOcean = 1 " : "");
    pWhereClause += ($("#cbIsAir").prop('checked') == true ? " AND IsAir = 1 " : "");
    pWhereClause += ($("#cbIsInland").prop('checked') == true ? " AND IsInland = 1 " : "");
    pWhereClause += " AND ( Code LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%' OR Name LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%') ";
    ////pWhereClause += " AND ID NOT IN (SELECT ChargeTypeID from Receivables ";
    ////pWhereClause += "                WHERE OperationID = " + $("#hOperationID").val() + ") ";
    //GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
    //    , function () {
    //        HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
    //        FadePageCover(false);
    //    }, 1/*pCodeOrName*/);
    GetListAsCheckboxesWithVariousParameters(pStrFnName, { pWhereClause: pWhereClause }, pDivName, pCheckboxNameAttr
        , function () {
            HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
            FadePageCover(false);
        }
        , (pDefaults.IsRepeatChargeTypeName ? 3 : 1) //pCodeOrName
        , "col-sm-3"/*pColumnSize*/);

    $("#btn-SearchCharges").attr("onclick", "Receivables_GetAvailableCharges();");
    $("#btnSelectChargesApply").attr("onclick", "Receivables_InsertListWithoutValues(false);");
    //FillReceivablesModalTableControls(pStrFnName, pWhereClause, pDivName, ptblModalName, pCheckboxNameAttr, true //pIsInsert
    //    , false /*pIsEditInvoice*/, function () {
    //        HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
    //        $("#btnSelectChargesApply").attr("onclick", "Receivables_InsertListWithValues(false);");
    //    });
    //$("#btn-SearchCharges").attr("onclick", "Receivables_GetAvailableCharges();");
}
function Receivables_EditByDblClick(pID) {
    jQuery("#EditReceivableModal").modal("show");
    Receivables_FillControls(pID);
}
function Receivables_FillControls(pID) {
    ClearAll("#EditReceivableModal");

    $("#hReceivableID").val(pID);
    FadePageCover(true);
    var tr = $("#tblReceivables tr[ID='" + pID + "']");
    var pPOrCID = $(tr).find("td.ReceivablePOrC").attr('val');
    var pSupplierID = $(tr).find("td.ReceivableSupplier").attr('val');
    var pUOMID = $(tr).find("td.ReceivableUOM").attr('val');
    var pCurrencyID = $(tr).find("td.ReceivableCurrency").attr('val');
    var pTaxTypeID = $(tr).find("td.ReceivableTaxTypeID").attr('val');
    var pDiscountTypeID = $(tr).find("td.ReceivableDiscountTypeID").attr('val');
    if ($("#hDefaultCurrencyID").val() == pCurrencyID)
        $("#txtReceivableExchangeRate").attr("disabled", "disabled");
    else
        $("#txtReceivableExchangeRate").removeAttr("disabled");
    GetListWithCodeAndWhereClause(pID, "/api/NoAccessFreightTypes/LoadAll", "P/C", "slReceivablePOrC" /*pSlName*/, " WHERE 1=1 ");  //ReceivablePOrC_GetList(pPOrCID, "slReceivablePOrC");
    //ReceivableSuppliers_GetList(pSupplierID, "slReceivableSupplier");
    $("#slReceivableCurrency").html($("#hReadySlCurrencies").html()); $("#slReceivableCurrency").val(pCurrencyID); //ReceivableCurrency_GetList(pCurrencyID, "slReceivableCurrency", null);
    ReceivableUOM_GetList(pUOMID, "slReceivableUOM");

    $("#lblReceivableShown").html(": " + $(tr).find("td.Receivable").text());
    $("#lblReceivableCreatedBy").html(" : " + $(tr).find("td.ReceivableCreatorName").text())
    $("#lblReceivableCreationDate").html(" : " + $(tr).find("td.ReceivableCreationDate").text())
    $("#lblReceivableUpdatedBy").html(": " + $(tr).find("td.ReceivableModificatorName").text())
    $("#lblReceivableModificationDate").html(" : " + $(tr).find("td.ReceivableModificationDate").text())

    //$("#txtReceivableType").val($(tr).find("td.Receivable").text());
    //$("#txtReceivableType").attr("ChargeTypeID", $(tr).find("td.Receivable").attr("val"));
    CallGETFunctionWithParameters("/api/ChargeTypes/LoadAllWithMinimalColumns"
        , { pWhereClauseWithMinimalColumns: "WHERE 1=1" }
        , function (pData) {
            FillListFromObject($(tr).find("td.Receivable").attr("val"), (pDefaults.IsRepeatChargeTypeName ? 4 : 2), "<--Select-->", "slReceivableChargeType", pData[0], null);
            FadePageCover(false);
        }
        , null);
    if ($("#slReceivableTax option").length < 2)
        GetListTaxTypeWithNameAndPercAttr(pTaxTypeID, "api/TaxeTypes/LoadAllWithWhereClause"
            , "<--Select-->", "slReceivableTax", "WHERE IsInactive=0 ORDER BY Name"
            , function () {
                $("#slReceivableDiscount").html($("#slReceivableTax").html());
                $("#slReceivableDiscount").val(pDiscountTypeID == 0 ? "" : pDiscountTypeID);
                $("#slReceivableTax option[IsDiscount='true']").addClass('hide');
                $("#slReceivableDiscount option[IsDiscount='false']").addClass('hide');
            });
    else {
        $("#slReceivableTax").val(pTaxTypeID == 0 ? "" : pTaxTypeID);
        $("#slReceivableDiscount").val(pDiscountTypeID == 0 ? "" : pDiscountTypeID);
    }
    $("#txtReceivableQuantity").val($(tr).find("td.ReceivableQuantity").text());
    //$("#txtReceivableUnitPrice").val($(tr).find("td.ReceivableCostPrice").text());
    //$("#txtReceivableAmount").val($(tr).find("td.ReceivableCostAmount").text());
    $("#txtReceivableUnitPrice").val(parseInt($(tr).find("td.ReceivableSalePrice").text()) == 0 ? "" : $(tr).find("td.ReceivableSalePrice").text());

    $("#txtReceivableAmountWithoutVAT").val(parseInt($(tr).find("td.ReceivableAmountWithoutVAT").text()) == 0 ? "" : $(tr).find("td.ReceivableAmountWithoutVAT").text());
    $("#txtReceivableTaxPercentage").val($(tr).find("td.ReceivableTaxPercentage").text());
    $("#txtReceivableTaxAmount").val($(tr).find("td.ReceivableTaxAmount").text());
    $("#txtReceivableDiscountPercentage").val($(tr).find("td.ReceivableDiscountPercentage").text());
    $("#txtReceivableDiscountAmount").val($(tr).find("td.ReceivableDiscountAmount").text());

    $("#txtReceivableAmount").val(parseInt($(tr).find("td.ReceivableSaleAmount").text()) == 0 ? "" : $(tr).find("td.ReceivableSaleAmount").text());
    $("#txtReceivableExchangeRate").val($(tr).find("td.ReceivableExchangeRate").text());
    $("#txtReceivableNotes").val($(tr).find("td.ReceivableNotes").text());
    $("#txtReceivableIssueDate").val($(tr).find("td.ReceivableIssueDate").text());

    $("#slReceivableUOM").attr("onchange", "Receivables_UOMChanged();");
    $("#btnSaveReceivable").attr("onclick", "Receivables_Update(false);");
}
function Receivables_MultiRowEdit() {
    debugger;
    FadePageCover(true);
    //ClearAll("#SelectChargesModal"); // to use it put it in a fn that calls it coz txtSearch is deleted before search is executed

    if (pDefaults.UnEditableCompanyName == "GBL")
        $("#div-search-controls-sl").removeClass("hide");
    $("#btn-SearchCharges").attr("onclick", "Receivables_MultiRowEdit();");
    $("#slSearchCharges").attr("onchange", "Receivables_MultiRowEdit();");
    $("#btn-SearchCharges-sl").attr("onclick", "Receivables_MultiRowEdit();");

    var pStrFnName = "/api/Receivables/LoadAll";
    var pDivName = "divSelectCharges";//div name to be filled
    var ptblModalName = "tblModalReceivables";
    var pCheckboxNameAttr = "cbSelectReceivables";
    var pWhereClause = "";
    $("#" + pDivName).html("");
    pWhereClause += " WHERE IsDeleted = 0 AND OperationID = " + $("#hOperationID").val();
    pWhereClause += ($("#hQuotationRouteID").val() == 0 ? "" : " AND GeneratingQRID = " + $("#hQuotationRouteID").val());
    pWhereClause += " AND (ChargeTypeCode LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%' OR ChargeTypeName LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%') ";
    pWhereClause += " And TruckingOrderID= " + $("#hID").val() + " \n";
    if ($("#slSearchCharges").val() != "") {
        pWhereClause += " AND ChargeTypeCode LIKE N'%" + $("#slSearchCharges option:selected").text() + "%'" + " \n";
    }
    FillReceivablesModalTableControls(pStrFnName, pWhereClause, pDivName, ptblModalName, pCheckboxNameAttr, false /*pIsInsert*/, false /*pIsInvoiceEdit*/
        , function () { HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase()); });

    $("#btn-SearchCharges").attr("onclick", "Receivables_MultiRowEdit();");
    $("#btnSelectChargesApply").attr("onclick", "Receivables_UpdateList(false, 0, false);");//parameters are(pSaveAndNew, pInvoiceID, pIsRemoveItems)
}
function ReceivableUOM_GetList(pID, pSlName) {
    var pWhereClause = "";
    ////pWhereClause += " Where OperationID = " + $("#hOperationID").val();
    //if ($("#hShipmentType").val() == constFCLShipmentType)
    //    pWhereClause += " WHERE IsUsedInFCl = 1 ";
    //else
    //    if ($("#hShipmentType").val() == constLCLShipmentType)
    //        pWhereClause += " WHERE IsUsedInLCL = 1 ";
    //    else
    //        if ($("#hShipmentType").val() == constFTLShipmentType)
    //            pWhereClause += " WHERE IsUsedInFTL = 1 ";
    //        else
    //            if ($("#hShipmentType").val() == constLTLShipmentType)
    //                pWhereClause += " WHERE IsUsedInLTL = 1 ";
    //            else
    //                if ($("#hShipmentType").val() == constConsolidationShipmentType)
    //                    pWhereClause += " WHERE IsUsedInConsolidation = 1 ";
    //                else
    //                    if ($("#hShipmentType").val() == "0")
    //                        pWhereClause += " WHERE IsUsedInAir = 1 ";
    //pWhereClause += " OR ID = " + pID; //for the case that settings changed for a UOM at the time it is taken 
    pWhereClause += " ORDER BY Code ";
    //GetListWithCodeAndNameAndWhereClause(pID, "/api/NoAccessMeasurements/LoadAll", "Select UOM", pSlName, pWhereClause);
    GetListWithNameAndWhereClause(pID, "/api/NoAccessMeasurements/LoadAll", "Select UOM", pSlName, pWhereClause);
}
function Receivables_CurrencyChanged() {
    $("#txtReceivableExchangeRate").val($("#slReceivableCurrency option:selected").attr("MasterDataExchangeRate"));
    if ($("#hDefaultCurrencyID").val() == $("#slReceivableCurrency").val())
        $("#txtReceivableExchangeRate").attr("disabled", "disabled");
    else
        $("#txtReceivableExchangeRate").removeAttr("disabled");
}
function Receivables_Update(pSaveandAddNew) {
    debugger;
    //if ($("#txtReceivableAmount").val()) //check that decimal doesn't contain 2 decimal pts
    //{
    if (!isValidDate($("#txtReceivableIssueDate").val().trim(), 1) && $("#txtReceivableIssueDate").val().trim() != "")
        swal(strSorry, strCheckDates);
    else if ($("#txtReceivableExchangeRate").val() == "" || parseFloat($("#txtReceivableExchangeRate").val()) == 0
        || (parseInt($("#txtReceivableExchangeRate").val()) == 1 && pDefaults.CurrencyID != ($("#slReceivableCurrency").val())))
        swal("Sorry", "Please, check exchange rate.");
    else InsertUpdateFunction("form", "/api/Receivables/Update", {
        pSavedFrom: 0 //pSavedFrom=10 : saved from Operations
        , pOperationContainersAndPackagesID: $("#slPayableTank").val() == "" ? 0 : $("#slPayableTank").val()
        , pIsReceipt: $("#cbIsReceipt").prop("checked")
        , pHouseBillID: 0

        , pID: $("#hReceivableID").val()
        //, pMeasurementID: $("#txtCalculationType").attr("MeasurementID")
        , pOperationID: $("#hOperationID").val()
        , pChargeTypeID: $("#slReceivableChargeType").val() == "" ? 0 : $("#slReceivableChargeType").val() //$("#txtReceivableType").attr("ChargeTypeID")
        , pMeasurementID: $('#slReceivableUOM option:selected').val() != ""
            ? $('#slReceivableUOM option:selected').val()
            : 0
        //, pContainerTypeID: ((($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked')) && $('#slReceivableUOM option:selected').val() != "")
        //    ? $('#slReceivableUOM option:selected').val()
        //    : 0)
        , pContainerTypeID: 0
        //, pPackageTypeID: ((($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked')) && $('#slReceivableUOM option:selected').val() != "")
        //    ? $('#slReceivableUOM option:selected').val()
        //    : 0)
        , pPOrC: ($('#slReceivablePOrC option:selected').val() == "" ? 0 : $('#slReceivablePOrC option:selected').val())
        , pSupplierID: 0//($('#slReceivableSupplier option:selected').val() == "" ? 0 : $('#slReceivableSupplier option:selected').val())
        , pQuantity: ($("#txtReceivableQuantity").val().trim() == "" ? 0 : $("#txtReceivableQuantity").val().trim())
        , pCostPrice: ($("#txtReceivableUnitPrice").val().trim() == "" ? 0 : $("#txtReceivableUnitPrice").val().trim())
        , pCostAmount: ($("#txtReceivableAmount").val().trim() == "" ? 0 : $("#txtReceivableAmount").val().trim())
        , pSalePrice: ($("#txtReceivableUnitPrice").val().trim() == "" ? 0 : $("#txtReceivableUnitPrice").val().trim())

        , pAmountWithoutVAT: $("#txtReceivableAmountWithoutVAT").val() == "" ? 0 : $("#txtReceivableAmountWithoutVAT").val()
        , pTaxTypeID: $("#slReceivableTax").val() == "" ? 0 : $("#slReceivableTax").val()
        , pTaxPercentage: $("#txtReceivableTaxPercentage").val() == "" ? 0 : $("#txtReceivableTaxPercentage").val()
        , pTaxAmount: $("#txtReceivableTaxAmount").val() == "" ? 0 : $("#txtReceivableTaxAmount").val()
        , pDiscountTypeID: $("#slReceivableDiscount").val() == "" ? 0 : $("#slReceivableDiscount").val()
        , pDiscountPercentage: $("#txtReceivableDiscountPercentage").val() == "" ? 0 : $("#txtReceivableDiscountPercentage").val()
        , pDiscountAmount: $("#txtReceivableDiscountAmount").val() == "" ? 0 : $("#txtReceivableDiscountAmount").val()

        , pSaleAmount: ($("#txtReceivableAmount").val().trim() == "" ? 0 : $("#txtReceivableAmount").val().trim())
        , pExchangeRate: ($("#txtReceivableExchangeRate").val().trim() == "" ? 0 : $("#txtReceivableExchangeRate").val().trim())
        , pCurrencyID: ($('#slReceivableCurrency option:selected').val() == "" ? 0 : $('#slReceivableCurrency option:selected').val())
        , pNotes: $("#txtReceivableNotes").val().toUpperCase().trim()

        , pIssueDate: ($("#txtReceivableIssueDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtReceivableIssueDate").val().trim()))

        , pSalePrice_Foreign: 0 //no change
        , pExchangeRate_Foreign: 0 //no change
        , pCurrencyID_Foreign: 0 //no change
        , pReceiptNumber: "0" //no change
        , pReceiptDate: "01/01/1900" //no change

    }, pSaveandAddNew, "EditReceivableModal", function () {
        OperationCharges_FillModal(); //Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val());
    });
    //}
    //else
    //    swal(strSorry, strCheckEntries, "warning");
}
function Receivables_UpdateList(pSaveandAddNew, pInvoiceID, pIsRemoveItems) { // if (pInvoiceID > 0) then this is  updating Invoice Items(called from invoices_update)
    debugger;
    var pSelectedReceivablesIDsToUpdate = "";
    if (pInvoiceID == 0) //this is called normally from the receivables edit modal
        pSelectedReceivablesIDsToUpdate = GetAllSelectedIDsAsStringWithNameAttr("cbSelectReceivables"); //i get from selected 
    else { //this is called from invoice update
        if (pIsRemoveItems) //here i get only the unchecked items coz the others will be deleted in the controllers
            pSelectedReceivablesIDsToUpdate = GetAllNOTSelectedIDsAsStringWithNameAttr("cbSelectInvoiceItems");
        else // here i get all IDs to handle the case of checking items then pressing save and not remove items
            pSelectedReceivablesIDsToUpdate = GetAllIDsAsStringWithNameAttr("tblModalInvoiceItems", "cbSelectInvoiceItems");
    }
    var ArrayOfIDs = pSelectedReceivablesIDsToUpdate.split(',');
    var pPOrCList = "";
    var pUOMList = "";
    var pQuantityList = "";
    var pSalePriceList = "";

    var pAmountWithoutVATList = "";
    var pTaxTypeIDList = "";
    var pTaxPercentageList = "";
    var pTaxAmountList = "";
    var pDiscountTypeIDList = "";
    var pDiscountPercentageList = "";
    var pDiscountAmountList = "";

    var pSaleAmountList = "";
    var pExchangeRateList = "";
    var pCurrencyList = "";
    var pViewOrderList = "";
    var _IsZeroExchangeRate = false;
    if (pSelectedReceivablesIDsToUpdate != "") {
        var NumberOfSelectRows = ArrayOfIDs.length;
        for (i = 0; i < NumberOfSelectRows; i++) {
            var currentRowID = ArrayOfIDs[i];
            if ($("#txtTblModalReceivableExchangeRate" + currentRowID).val() == undefined || $("#txtTblModalReceivableExchangeRate" + currentRowID).val() == "" || parseFloat($("#txtTblModalReceivableExchangeRate" + currentRowID).val()) == 0
                || (parseFloat($("#txtTblModalReceivableExchangeRate" + currentRowID).val()) == 1 && pDefaults.CurrencyID != ($("#slReceivableCurrency" + currentRowID).val())))
                _IsZeroExchangeRate = true;

            pPOrCList += ((pPOrCList == "") ? "" : ",") + ($("#slReceivablePOrC" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#slReceivablePOrC" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#slReceivablePOrC" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pUOMList += ((pUOMList == "") ? "" : ",") + ($("#slReceivableUOM" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#slReceivableUOM" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#slReceivableUOM" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pQuantityList += ((pQuantityList == "") ? "" : ",") + ($("#txtTblModalReceivableQuantity" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableQuantity" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableQuantity" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pSalePriceList += ((pSalePriceList == "") ? "" : ",") + ($("#txtTblModalReceivableSalePrice" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableSalePrice" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableSalePrice" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());

            pAmountWithoutVATList += ((pAmountWithoutVATList == "") ? "" : ",") + ($("#txtTblModalReceivableAmountWithoutVAT" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableAmountWithoutVAT" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableAmountWithoutVAT" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pTaxTypeIDList += ((pTaxTypeIDList == "") ? "" : ",") + ($("#slReceivableTax" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#slReceivableTax" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#slReceivableTax" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pTaxPercentageList += ((pTaxPercentageList == "") ? "" : ",") + ($("#txtTblModalReceivableTaxPercentage" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableTaxPercentage" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableTaxPercentage" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pTaxAmountList += ((pTaxAmountList == "") ? "" : ",") + ($("#txtTblModalReceivableTaxAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableTaxAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableTaxAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pDiscountTypeIDList += ((pDiscountTypeIDList == "") ? "" : ",") + ($("#slReceivableDiscount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#slReceivableDiscount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#slReceivableDiscount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pDiscountPercentageList += ((pDiscountPercentageList == "") ? "" : ",") + ($("#txtTblModalReceivableDiscountPercentage" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableDiscountPercentage" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableDiscountPercentage" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pDiscountAmountList += ((pDiscountAmountList == "") ? "" : ",") + ($("#txtTblModalReceivableDiscountAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableDiscountAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableDiscountAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());

            pSaleAmountList += ((pSaleAmountList == "") ? "" : ",") + ($("#txtTblModalReceivableSaleAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableSaleAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableSaleAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pExchangeRateList += ((pExchangeRateList == "") ? "" : ",") + ($("#txtTblModalReceivableExchangeRate" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableExchangeRate" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableExchangeRate" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pCurrencyList += ((pCurrencyList == "") ? "" : ",") + ($("#slReceivableCurrency" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#slReceivableCurrency" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#slReceivableCurrency" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pViewOrderList += ((pViewOrderList == "") ? "" : ",") + ($("#txtTblModalReceivableViewOrder" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableViewOrder" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableViewOrder" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
        }
    }
    if (_IsZeroExchangeRate) {
        swal("Sorry", "Please, check exchange rate.");
        FadePageCover(false);
    }
    else {
        if (pSelectedReceivablesIDsToUpdate != "")
            InsertSelectedCheckboxItems_Post("/api/Receivables/UpdateList"
                , {
                    "pSelectedReceivablesIDsToUpdate": pSelectedReceivablesIDsToUpdate
                    , "pPOrCList": pPOrCList
                    , "pUOMList": pUOMList
                    , "pQuantityList": pQuantityList
                    , "pSalePriceList": pSalePriceList

                    , "pAmountWithoutVATList": pAmountWithoutVATList
                    , "pTaxTypeIDList": pTaxTypeIDList
                    , "pTaxPercentageList": pTaxPercentageList
                    , "pTaxAmountList": pTaxAmountList
                    , "pDiscountTypeIDList": pDiscountTypeIDList
                    , "pDiscountPercentageList": pDiscountPercentageList
                    , "pDiscountAmountList": pDiscountAmountList

                    , "pSaleAmountList": pSaleAmountList
                    , "pExchangeRateList": pExchangeRateList
                    , "pCurrencyList": pCurrencyList
                    , "pViewOrderList": pViewOrderList
                    , "pInvoiceID": pInvoiceID //if pInvoiceID==0 then its not used else this is invoice items update
                }
                , pSaveandAddNew
                , "SelectChargesModal" //pModalID
                , function () { /*Receivables_GetAvailableCharges();*/ }
                , function () {
                    OperationCharges_FillModal(); //Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val());
                });
        else
            swal(strSorry, "No available items to be updated.");
    }
}
//called when pressing Apply in SelectCharges Modal
function Receivables_InsertListWithoutValues(pSaveandAddNew) {
    var pSelectedIDs = GetAllSelectedIDsAsStringWithNameAttr("cbSelectCharges");//returns string array of IDs
    debugger;
    if (pSelectedIDs != "")
        InsertSelectedCheckboxItems("/api/Receivables/InsertListWithoutValues"
            , { pOperationID: $("#hOperationID").val(), pSelectedIDs: pSelectedIDs, pQuotationRouteID: $("#hQuotationRouteID").val(), pOperationContainersAndPackagesID: 0, pOperationVehicleID: 0, pTruckingOrderID: $("#hRoutingID" + RoutingSuffix).val() }
            , pSaveandAddNew
            , "SelectChargesModal" //pModalID
            , null //function () { Receivables_GetAvailableCharges(); }
            , function () {
                OperationCharges_FillModal(); //Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val());
            });
}
//function CalculateReceivablesAmount() {
//    $("#txtReceivableAmount").val($("#txtReceivableQuantity").val() * $("#txtReceivableUnitPrice").val());
//}
function CalculateReceivablesAmount() {
    var decAmountWithoutVAT = 0;
    var decTaxAmount = 0; var decTaxPercentage = 0.0;
    var decDiscountAmount = 0; var decDiscountPercentage = 0.0;

    decAmountWithoutVAT = $("#txtReceivableQuantity").val() * $("#txtReceivableUnitPrice").val();
    $("#txtReceivableAmountWithoutVAT").val(decAmountWithoutVAT);
    decTaxPercentage = $("#slReceivableTax option:selected").attr("CurrentPercentage");
    decTaxAmount = decAmountWithoutVAT * decTaxPercentage / 100;
    decDiscountPercentage = $("#slReceivableDiscount option:selected").attr("CurrentPercentage");
    decDiscountAmount = decAmountWithoutVAT * decDiscountPercentage / 100;

    $("#txtReceivableTaxPercentage").val(decTaxPercentage);
    $("#txtReceivableTaxAmount").val(decTaxAmount.toFixed(2));
    $("#txtReceivableDiscountPercentage").val(decDiscountPercentage);
    $("#txtReceivableDiscountAmount").val(decDiscountAmount.toFixed(2));
    $("#txtReceivableAmount").val((Math.round(((parseFloat(decAmountWithoutVAT) + parseFloat(decTaxAmount) - parseFloat(decDiscountAmount))) * 100) / 100).toFixed(2));
}
////if not insert (i.e. update then all will rows will be selected)
//function Receivables_Row_CalculateReceivablesAmount(pRowID, pIsInsertChoice) {
//    var rowQuantity = $("#txtTblModalReceivableQuantity" + pRowID).val();
//    var rowSalePrice = $("#txtTblModalReceivableSalePrice" + pRowID).val();
//    $("#txtTblModalReceivableSaleAmount" + pRowID).val(rowQuantity * rowSalePrice);
//    if (pIsInsertChoice) //incase of insert check and uncheck the checkbox to in GetSelectedIDs incase of insert
//        Receivables_txtTblModalSaleAmount_Changed(pRowID, pIsInsertChoice);
//}
//if not insert (i.e. update then all will rows will be selected)
function Receivables_Row_CalculateReceivablesAmount(pRowID, pIsInsertChoice) {
    debugger;
    var rowQuantity = $("#txtTblModalReceivableQuantity" + pRowID).val();
    var rowSalePrice = $("#txtTblModalReceivableSalePrice" + pRowID).val();

    var decAmountWithoutVAT = 0;
    var decTaxAmount = 0; var decTaxPercentage = 0.0;
    var decDiscountAmount = 0; var decDiscountPercentage = 0.0;

    decAmountWithoutVAT = rowQuantity * rowSalePrice;
    $("#txtTblModalReceivableAmountWithoutVAT" + pRowID).val(decAmountWithoutVAT);
    if (pDefaults.IsTaxOnItems && !pIsInsertChoice/*to not calc. tax in case of Gen from Payables*/) {
        decTaxPercentage = $("#slReceivableTax" + pRowID + " option:selected").attr("CurrentPercentage");
        decTaxAmount = decAmountWithoutVAT * decTaxPercentage / 100;
        decDiscountPercentage = $("#slReceivableDiscount" + pRowID + " option:selected").attr("CurrentPercentage");
        decDiscountAmount = decAmountWithoutVAT * decDiscountPercentage / 100;
    }
    $("#txtTblModalReceivableTaxPercentage" + pRowID).val(decTaxPercentage);
    $("#txtTblModalReceivableTaxAmount" + pRowID).val(decTaxAmount.toFixed(2));
    $("#txtTblModalReceivableDiscountPercentage" + pRowID).val(decDiscountPercentage);
    $("#txtTblModalReceivableDiscountAmount" + pRowID).val(decDiscountAmount.toFixed(2));
    $("#txtTblModalReceivableSaleAmount" + pRowID).val((decAmountWithoutVAT + decTaxAmount - decDiscountAmount).toFixed(2)); //$("#txtTblModalReceivableSaleAmount" + pRowID).val((decAmountWithoutVAT + decTaxAmount).toFixed(2));

    if (pIsInsertChoice) //incase of insert check and uncheck the checkbox to in GetSelectedIDs incase of insert
        Receivables_txtTblModalSaleAmount_Changed(pRowID, pIsInsertChoice);
}
//to handle change of currency in the multi row edit modal
function Receivables_txtTblModalCurrency_Changed(pRowID, pIsInvoiceEdit) {
    $("#txtTblModalReceivableExchangeRate" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + pRowID).val($("#slReceivableCurrency" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + pRowID + " option:selected").attr("MasterDataExchangeRate"));
    if ($("#hDefaultCurrencyID").val() == $("#slReceivableCurrency" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + pRowID).val())
        $("#txtTblModalReceivableExchangeRate" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + pRowID).attr("disabled", "disabled");
    else
        $("#txtTblModalReceivableExchangeRate" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + pRowID).removeAttr("disabled");
}
function Receivables_txtTblModalSaleAmount_Changed(pRowID, pIsInsertChoice) {
    if (pIsInsertChoice) { //if not insert then all IDs will be updated
        var varReceivableSaleAmount = $("#tblModalReceivables tr[ID='" + pRowID + "']").find('input[name=txtTblModalReceivableSaleAmount]').val();
        if (varReceivableSaleAmount != 0 && varReceivableSaleAmount != "")
            $("#tblModalReceivables tr[ID='" + pRowID + "']").find('input[name=cbSelectReceivables]').prop("checked", true);
        else
            $("#tblModalReceivables tr[ID='" + pRowID + "']").find('input[name=cbSelectReceivables]').prop("checked", false);
    }
}
function Receivables_DeleteList(callback) {
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblReceivables') != "")
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
                DeleteListFunction("/api/Receivables/Delete"
                    , { pReceivablesIDs: GetAllSelectedIDsAsString('tblReceivables'), pOperationID: $("#hOperationID").val() }
                    , function () {
                        OperationCharges_FillModal();
                    });
            });
    //DeleteListFunction("/api/Receivables/Delete", { "pReceivablesIDs": GetAllSelectedIDsAsString('tblReceivables') }, function () { LoadViews("OperationsEdit", null, $("#hOperationID").val()); });
}


/**********************************************************************/
function Details_NewTruckerRow() {
    debugger;

    ++maxDetailsIDInTable;
    var copyControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'></span>";
    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var dateValidTo = Date.prototype.addDays(ConvertDateFormat(FormattedTodaysDate), 30);
    var tr = "";
    tr += "<tr ID='" + maxDetailsIDInTable + "'>";
    tr += "     <td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + maxDetailsIDInTable + "' checked='checked' /></td>";
    tr += "     <td class='DetailsTruckerID hide'  style='width:20%;'><input " + (1 == 2 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + maxDetailsIDInTable + "' /></td>";
    tr += "     <td class='TruckerID' style='width:40%;' val=''><select id='slTrucker" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='' data-required='true'>" + "<option value=0></option>" + "</select></td>";
    tr += "     <td class='TruckingOrdersNo' style='width:20%;'><input type='text' style='width:100%;font-size:90%;' " + " id='txtNo" + maxDetailsIDInTable + "' class='form-control controlStyle' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' onchange='' data-required='true' value='" + "' /> </td>";
    tr += "     <td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate' id='SelectedIDsToUpdate" + maxDetailsIDInTable + "' type='checkbox' value='" + maxDetailsIDInTable + "' /></td>";
    tr += "     <td class='hide'>"
        //+ "<a href='#'  onclick='Pricing_CopyRow(" + maxDetailsIDInTable + ");' " + copyControlsText + "</a>"
        + "</td>";
    tr += "</tr>";

    $("#tblTruckersDetails tbody").prepend(tr);
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $("#tblTruckersDetails tbody tr[ID=" + maxDetailsIDInTable + "]").reverseChildren();
    /***************************Filling row controls******************************/



    $("#slTrucker" + maxDetailsIDInTable).html($("#slRoutingsLinesTruckingOrder").html());
    $("#slTrucker" + maxDetailsIDInTable).val(0);



    //SetDatepickerFormat();
    BindAllCheckboxonTable("tblTruckersDetails", "DetailsTruckerID", "cbDetailsDeleteTruckerHeader");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    /***********************EOF Filling row controls******************************/
}
function Alarm_CreateTruckingOrdersFromAlarm() {
    debugger;
    //int pNumberOfTruckingOrders,int pDefaultTruckerID, string pTruckerIDs, string pTrukingOrderNumbersForTruckers,int pOperationID)
    var Validate = true;
    var pNumberOfTruckingOrders = $('#NumberOfTruckingOrdersOwnFleet').val() == "" ? 0 : $('#NumberOfTruckingOrdersOwnFleet').val();
    var pTruckerIDs = "";
    var pTrukingOrderNumbersForTruckers = "";
    var pEmailID = $("#hAlarmEmailID").val();
    var pDetailsIDList = GetAllIDsAsStringWithNameAttr("tblTruckersDetails", "Delete");
    if (pDetailsIDList != "") {
        var NumberOfDetailsRows = pDetailsIDList.split(',').length;
        for (var i = 0; i < NumberOfDetailsRows; i++) {
            var currentRowID = pDetailsIDList.split(",")[i];
            pTruckerIDs += ((pTruckerIDs == "") ? "" : ",") + $("#slTrucker" + currentRowID).val();
            pTrukingOrderNumbersForTruckers += ((pTrukingOrderNumbersForTruckers == "") ? "" : ",") + ($("#txtNo" + currentRowID).val().trim() == "" ? "0" : $("#txtNo" + currentRowID).val().trim());

            if ($("#slTrucker" + currentRowID).val() == null || $("#txtNo" + currentRowID).val().trim() == "" || $("#txtNo" + currentRowID).val().trim() == "0")
                Validate = false;
        }
    }
    if (!Validate)
        swal(strSorry, "Add Trucking Orders Numbers");
    if (Validate) {
        if (pNumberOfTruckingOrders == 0 && (pDetailsIDList == null || NumberOfDetailsRows == 0 || pDetailsIDList == ''))
            swal(strSorry, "Add Trucking Orders Numbers");
        else {
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/TruckingOrders/CreateTruckingOrdersFromAlarm"
                , {
                    pNumberOfTruckingOrders: pNumberOfTruckingOrders
                    , pDefaultTruckerID: pDefaults.DefaultTruckerID
                    , pTruckerIDs: pTruckerIDs
                    , pTrukingOrderNumbersForTruckers: pTrukingOrderNumbersForTruckers
                    , pOperationID: $("#hAlarmOperationID").val()
                }
                , function (pData) {
                    if (pData[0] == 0)
                        swal("Sorry", "Error.");
                    else {
                        // FillListFromObject(null, 1, "<--Select-->", "slFilterOperation", _Operation, null);
                        swal("Success", "Saved successfully.");
                        jQuery("#SelectTruckingOrderTypeModal").modal("hide");
                        CallGETFunctionWithParameters("/api/LocalEmails/RemoveAlarm"
                            , { pRemoveAlarmEmailID: pEmailID }
                            , function (pData) {
                                TruckingOrders_LoadingWithPaging();
                            }
                            , null);
                    }
                    FadePageCover(false);
                }
                , null);
        }
    }
}
var maxDetailsIDInTable = 0;
function Details_BindTableRows(pTableRows) {
    debugger;

    var IssueDate;
    ClearAllTableRows("tblDetails");
    maxDetailsIDInTable = 0;
    $.each(pTableRows, function (i, item) {
        // GetDateWithFormatMDY
        maxDetailsIDInTable = (item.ID > maxDetailsIDInTable ? item.ID : maxDetailsIDInTable);
        var IssueDate = (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.IssueDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.IssueDate)) : "");
        var ReleaseDate = (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReleaseDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.ReleaseDate)) : "");
        var ArrivalDate = (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ArrivalDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.ArrivalDate)) : "");
        var ReturnDate = (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReturnDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.ReturnDate)) : "");
        var FGODate = (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.FGODate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.FGODate)) : "");

        AppendRowtoTable("tblDetails",
            ("<tr ID='" + item.ID + "' " + ">"
                + "<td class='DetailsID'> <input " + (1 == 2 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='SN' style=''><input  tag='" + (item.SN) + "' type='text' style='font-size:90%;'  id='txtSN" + item.ID + "' class='form controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' onchange='' data-required='true' value='" + (item.SN == 0 ? "" : item.SN) + "' /> </td>"
                + "<td class='OperationNO' style=''><input  tag='" + (item.OperationNO) + "' type='text' style='font-size:90%;'  id='txtOperationNO" + item.ID + "' class='controlStyle inputValue'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + (item.OperationNO == 0 ? "" : item.OperationNO) + "' /> </td>"
                + "<td class='Factory' style=''><input  tag='" + (item.Factory) + "' type='text' style='font-size:90%;'  id='txtFactory" + item.ID + "' class='controlStyle inputValue'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + (item.Factory == 0 ? "" : item.Factory) + "' /> </td>"
                + "<td class='IssueDate' style=''><input  tag='" + (item.IssueDate) + "' type='text' style=' font-size:90%;cursor:text;'  id='txtIssueDate" + item.ID + "' class='datepicker-input controlStyle'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onkeydown='DisableBackspaceKey(ID);' onchange='' data-date-format='dd/mm/yyyy' placeholder='Select Date' data-required='true' value='" + IssueDate + "' /> </td>"
                + "<td class='SL' style=''><input  tag='" + (item.SL) + "' type='text' style='font-size:90%;'  id='txtSL" + item.ID + "' class='controlStyle inputValue' data-type='number'  onkeypress='' onfocus='' onblur='CheckDecimalFormat(id);' onchange='' data-required='false' value='" + (item.SL == 0 ? "" : item.SL) + "' /> </td>"
                + "<td class='BookingNo' style=''><input  tag='" + (item.BookingNo) + "' type='text' style='font-size:90%;'  id='txtBookingNo" + item.ID + "' class='controlStyle inputValue' data-type='number'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + (item.BookingNo == 0 ? "" : item.BookingNo) + "' /> </td>"
                + "<td class='PORT' style=''><input  tag='" + (item.PORT) + "' type='text' style='font-size:90%;'  id='txtPORT" + item.ID + "' class='controlStyle inputValue' data-type='number'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + (item.PORT == 0 ? "" : item.PORT) + "' /> </td>"
                + "<td class='CustomLOC' style=''><input  tag='" + (item.CustomLOC) + "' type='text' style='font-size:90%;'  id='txtCustomLOC" + item.ID + "' class='controlStyle inputValue'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + (item.CustomLOC == 0 ? "" : item.CustomLOC) + "' /> </td>"
                + "<td class='WH' style=''><input  tag='" + (item.WH) + "' type='text' style='font-size:90%;'  id='txtWH" + item.ID + "' class='controlStyle inputValue' data-type='number'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + (item.WH == 0 ? "" : item.WH) + "' /> </td>"
                + "<td class='Size' style=''><input  tag='" + (item.Size) + "' type='text' style='font-size:90%;'  id='txtSize" + item.ID + "' class='controlStyle inputValue' data-type='number'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + (item.Size == 0 ? "" : item.Size) + "' /> </td>"
                + "<td class='ContainerNO' style=''><input  tag='" + (item.ContainerNO) + "' type='text' style='font-size:90%;'  id='txtContainerNO" + item.ID + "' class='controlStyle inputValue' data-type='number'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' disabled=disabled value='" + (item.ContainerNO) + "' /> </td>"
                + "<td class='DriverName' style=''><input  tag='" + (item.DriverName) + "' type='text' style='font-size:90%;'  id='txtDriverName" + item.ID + "' class='controlStyle inputValue' data-type='number'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + (item.DriverName == 0 ? "" : item.DriverName) + "' /> </td>"
                + "<td class='Phone' style=''><input  tag='" + (item.Phone) + "' type='text' style='font-size:90%;'  id='txtPhone" + item.ID + "' class='controlStyle inputValue'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + (item.Phone == 0 ? "" : item.Phone) + "' /> </td>"
                + "<td class='TruckNo' style=''><input  tag='" + (item.TruckNo) + "' type='text' style='font-size:90%;'  id='txtTruckNo" + item.ID + "' class='controlStyle inputValue'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + (item.TruckNo == 0 ? "" : item.TruckNo) + "' /> </td>"
                + "<td class='TruckWeight' style=''><input  tag='" + (item.TruckWeight) + "' type='text' style='font-size:90%;'  id='txtTruckWeight" + item.ID + "' class='controlStyle inputValue'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + (item.TruckWeight == 0 ? "" : item.TruckWeight) + "' /> </td>"
                + "<td class='Location' style=''><input  tag='" + (item.Location) + "' type='text' style='font-size:90%;'  id='txtLocation" + item.ID + "' class='controlStyle inputValue'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + (item.Location == 0 ? "" : item.Location) + "' /> </td>"
                + "<td class='SealNo' style=''><input  tag='" + (item.SealNo) + "' type='text' style='font-size:90%;'  id='txtSealNo" + item.ID + "' class='controlStyle inputValue'   onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + (item.SealNo == 0 ? "" : item.SealNo) + "' /> </td>"
                + "<td class='IssueDate' style=''><input  tag='" + (item.ReleaseDate) + "' type='text' style=' font-size:90%;cursor:text;'  id='txtReleaseDate" + item.ID + "' class='datepicker-input controlStyle'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onkeydown='DisableBackspaceKey(ID);' onchange='' data-date-format='dd/mm/yyyy' placeholder='Select Date' data-required='true' value='" + ReleaseDate + "' /> </td>"
                + "<td class='ReleaseTime' style=''><input  tag='" + (item.ReleaseTime) + "' type='text' style='font-size:90%;'  id='txtReleaseTime" + item.ID + "' class='form controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id); CheckValueIsValidTime(id);' onfocus='CheckValueIsDecimal(id); CheckValueIsValidTime(id);' onblur='CheckDecimalFormat(id); CheckValueIsValidTime(id);' onchange='' data-required='false' value='" + item.ReleaseTime + "' /> </td>"
                + "<td class='ArrivalDate' style=''><input  tag='" + (item.ArrivalDate) + "' type='text' style=' font-size:90%;cursor:text;'  id='txtArrivalDate" + item.ID + "' class='datepicker-input controlStyle'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onkeydown='DisableBackspaceKey(ID);' onchange='' data-date-format='dd/mm/yyyy' placeholder='Select Date' data-required='true' value='" + ArrivalDate + "' /> </td>"
                + "<td class='ArrivalTime' style=''><input  tag='" + (item.ArrivalTime) + "' type='text' style='font-size:90%;'  id='txtArrivalTime" + item.ID + "' class='form controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id); CheckValueIsValidTime(id);' onfocus='CheckValueIsDecimal(id); CheckValueIsValidTime(id);' onblur='CheckDecimalFormat(id); CheckValueIsValidTime(id);' onchange='' data-required='false' value='" + item.ArrivalTime + "' /> </td>"
                + "<td class='FactoryGateOut' style=''><input  tag='" + (item.FactoryGateOut) + "' type='text' style='font-size:90%;'  id='txtFactoryGateOut" + item.ID + "' class='controlStyle inputValue'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + (item.FactoryGateOut == 0 ? "" : item.FactoryGateOut) + "' /> </td>"
                + "<td class='IssueDate' style=''><input  tag='" + (item.FGODate) + "' type='text' style=' font-size:90%;cursor:text;'  id='txtFGODate" + item.ID + "' class='datepicker-input controlStyle'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onkeydown='DisableBackspaceKey(ID);' onchange='' data-date-format='dd/mm/yyyy' placeholder='Select Date' data-required='false' value='" + FGODate + "' /> </td>"
                + "<td class='FGOTime' style=''><input  tag='" + (item.FGOTime) + "' type='text' style='font-size:90%;'  id='txtFGOTime" + item.ID + "' class='form controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id); CheckValueIsValidTime(id);' onfocus='CheckValueIsDecimal(id); CheckValueIsValidTime(id);' onblur='CheckDecimalFormat(id); CheckValueIsValidTime(id);' onchange='' data-required='false' value='" + item.FGOTime + "' /> </td>"
                + "<td class='ReturnDate' style=''><input  tag='" + (item.ReturnDate) + "' type='text' style=' font-size:90%;cursor:text;'  id='txtReturnDate" + item.ID + "' class='datepicker-input controlStyle'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onkeydown='DisableBackspaceKey(ID);' onchange='' data-date-format='dd/mm/yyyy' placeholder='Select Date' data-required='true' value='" + ReturnDate + "' /> </td>"
                + "<td class='ReturnTime' style=''><input  tag='" + (item.ReturnTime) + "' type='text' style='font-size:90%;'  id='txtReturnTime" + item.ID + "' class='form controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id); CheckValueIsValidTime(id);' onfocus='CheckValueIsDecimal(id); CheckValueIsValidTime(id);' onblur='CheckDecimalFormat(id); CheckValueIsValidTime(id);' onchange='' data-required='false' value='" + item.ReturnTime + "' /> </td>"
                + "<td class='Port2' style=''><input  tag='" + (item.Port2) + "' type='text' style='font-size:90%;'  id='txtPort2" + item.ID + "' class='controlStyle inputValue'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + (item.Port2 == 0 ? "" : item.Port2) + "' /> </td>"
                + "<td class='POD' style=''><input  tag='" + (item.POD) + "' type='text' style='font-size:90%;'  id='txtPOD" + item.ID + "' class='controlStyle inputValue'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + (item.POD == 0 ? "" : item.POD) + "' /> </td>"
                + "<td class='Trucker' style=''><input  tag='" + (item.Trucker) + "' type='text' style='font-size:90%;'  id='txtTrucker" + item.ID + "' class='controlStyle inputValue'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + (item.Trucker == 0 ? "" : item.Trucker) + "' /> </td>"
                + "<td class='Notes' style=''><input  tag='" + (item.Notes) + "' type='text' style='font-size:90%;'  id='txtNotes" + item.ID + "' class='controlStyle inputValue'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + (item.Notes == 0 ? "" : item.Notes) + "' /> </td>"
                + "<td class='Invoice' style=''><input  tag='" + (item.Invoice) + "' type='text' style='font-size:90%;'  id='txtInvoice" + item.ID + "' class='controlStyle inputValue'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + (item.Invoice == 0 ? "" : item.Invoice) + "' /> </td>"
                + "<td class='TareWeight' style=''><input  tag='" + (item.TareWeight) + "' type='text' style='font-size:90%;'  id='txtTareWeight" + item.ID + "' class='controlStyle inputValue' data-type='number'  onkeypress='' onfocus='' onblur='CheckDecimalFormat(id);' onchange='' data-required='false' value='" + (item.TareWeight == 0 ? "" : item.TareWeight) + "' /> </td>"
                + "<td class='NetWeight' style=''><input  tag='" + (item.NetWeight) + "' type='text' style='font-size:90%;'  id='txtNetWeight" + item.ID + "' class='controlStyle inputValue' data-type='number'  onkeypress='' onfocus='' onblur='CheckDecimalFormat(id);' onchange='' data-required='false' value='" + (item.NetWeight == 0 ? "" : item.NetWeight) + "' /> </td>"
                + "<td class='GrossWeight' style=''><input  tag='" + (item.GrossWeight) + "' type='text' style='font-size:90%;'  id='txtGrossWeight" + item.ID + "' class='controlStyle inputValue' data-type='number'  onkeypress='' onfocus='' onblur='CheckDecimalFormat(id);' onchange='' data-required='false' value='" + (item.GrossWeight == 0 ? "" : item.GrossWeight) + "' /> </td>"
                + "<td class='TypeName' style=''><input  tag='" + (item.TypeName) + "' type='text' style='font-size:90%;'  id='txtTypeName" + item.ID + "' class='controlStyle inputValue'   onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + (item.TypeName == 0 ? "" : item.TypeName) + "' /> </td>"
                + "<td class='StatusName' style=''><input  tag='" + (item.StatusName) + "' type='text' style='font-size:90%;'  id='txtStatusName" + item.ID + "' class='controlStyle inputValue'   onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + (item.StatusName == 0 ? "" : item.StatusName) + "' /> </td>"





                + "</tr>"
            ));


        //if (i == pTableRows.length - 1) {
        //    debugger;
        //    FillHTMLtblInputs("#tblDetails > tbody");
        //}
    });



    //ApplyPermissions();
    BindAllCheckboxonTable("tblDetails", "DetailsID", "cbDetailsDeleteHeader");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    CheckAllCheckbox("HeaderDeleteDetailsID");
    SetDatepickerFormat();
    //$("#divTblContainers").width($("#mainForm").width() - 190);
    //$("#divTblContainers").height(430);
    //HighlightText("#tblDetails>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
}
function Details_NewRow() {
    debugger;
    ++maxDetailsIDInTable;


    var IssueDate = getTodaysDateInddMMyyyyFormat();
    var ReleaseDate = getTodaysDateInddMMyyyyFormat();
    var ArrivalDate = getTodaysDateInddMMyyyyFormat();
    var ReturnDate = getTodaysDateInddMMyyyyFormat();
    var FGODate = getTodaysDateInddMMyyyyFormat();

    AppendRowtoTable("tblDetails",
        ("<tr ID='" + maxDetailsIDInTable + "' " + ">"
            + "<td class='DetailsID'> <input " + (1 == 2 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + 0 + "' /></td>"
            + "<td class='SN' style=''><input  tag='" + ('') + "' type='text' style='font-size:90%;'  id='txtSN" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' onchange='' data-required='true' value='" + ('') + "' /> </td>"
            + "<td class='OperationNO' style=''><input  tag='" + ('') + "' type='text' style='font-size:90%;'  id='txtOperationNO" + maxDetailsIDInTable + "' class='controlStyle inputValue'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + ('') + "' /> </td>"
            + "<td class='Factory' style=''><input  tag='" + ('') + "' type='text' style='font-size:90%;'  id='txtFactory" + maxDetailsIDInTable + "' class='controlStyle inputValue'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + ('') + "' /> </td>"
            + "<td class='IssueDate' style=''><input  tag='" + ('') + "' type='text' style=' font-size:90%;cursor:text;'  id='txtIssueDate" + maxDetailsIDInTable + "' class='datepicker-input controlStyle'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onkeydown='DisableBackspaceKey(ID);' onchange='' data-date-format='dd/mm/yyyy' placeholder='Select Date' data-required='true' value='" + IssueDate + "' /> </td>"
            + "<td class='SL' style=''><input  tag='" + ('') + "' type='text' style='font-size:90%;'  id='txtSL" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='' onfocus='' onblur='CheckDecimalFormat(id);' onchange='' data-required='false' value='" + ('') + "' /> </td>"
            + "<td class='BookingNo' style=''><input  tag='" + ('') + "' type='text' style='font-size:90%;'  id='txtBookingNo" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + ('') + "' /> </td>"
            + "<td class='PORT' style=''><input  tag='" + ('') + "' type='text' style='font-size:90%;'  id='txtPORT" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + ('') + "' /> </td>"
            + "<td class='CustomLOC' style=''><input  tag='" + ('') + "' type='text' style='font-size:90%;'  id='txtCustomLOC" + maxDetailsIDInTable + "' class='controlStyle inputValue'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + ('') + "' /> </td>"
            + "<td class='WH' style=''><input  tag='" + ('') + "' type='text' style='font-size:90%;'  id='txtWH" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + ('') + "' /> </td>"
            + "<td class='Size' style=''><input  tag='" + ('') + "' type='text' style='font-size:90%;'  id='txtSize" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + ('') + "' /> </td>"
            + "<td class='ContainerNO' style=''><input  tag='" + ('') + "' type='text' style='font-size:90%;'  id='txtContainerNO" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + ('') + "' /> </td>"
            + "<td class='DriverName' style=''><input  tag='" + ('') + "' type='text' style='font-size:90%;'  id='txtDriverName" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + ('') + "' /> </td>"
            + "<td class='Phone' style=''><input  tag='" + ('') + "' type='text' style='font-size:90%;'  id='txtPhone" + maxDetailsIDInTable + "' class='controlStyle inputValue'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + ('') + "' /> </td>"
            + "<td class='TruckNo' style=''><input  tag='" + ('') + "' type='text' style='font-size:90%;'  id='txtTruckNo" + maxDetailsIDInTable + "' class='controlStyle inputValue'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + ('') + "' /> </td>"
            + "<td class='TruckWeight' style=''><input  tag='" + ('') + "' type='text' style='font-size:90%;'  id='txtTruckWeight" + maxDetailsIDInTable + "' class='controlStyle inputValue'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + ('') + "' /> </td>"
            + "<td class='Location' style=''><input  tag='" + ('') + "' type='text' style='font-size:90%;'  id='txtLocation" + maxDetailsIDInTable + "' class='controlStyle inputValue'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + ('') + "' /> </td>"
            + "<td class='SealNo' style=''><input  tag='" + ('') + "' type='text' style='font-size:90%;'  id='txtSealNo" + maxDetailsIDInTable + "' class='controlStyle inputValue'   onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + ('') + "' /> </td>"
            + "<td class='IssueDate' style=''><input  tag='" + ('') + "' type='text' style=' font-size:90%;cursor:text;'  id='txtReleaseDate" + maxDetailsIDInTable + "' class='datepicker-input controlStyle'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onkeydown='DisableBackspaceKey(ID);' onchange='' data-date-format='dd/mm/yyyy' placeholder='Select Date' data-required='true' value='" + ReleaseDate + "' /> </td>"
            + "<td class='ReleaseTime' style=''><input  tag='" + ('') + "' type='text' style='font-size:90%;'  id='txtReleaseTime" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id); CheckValueIsValidTime(id);' onfocus='CheckValueIsDecimal(id); CheckValueIsValidTime(id);' onblur='CheckDecimalFormat(id); CheckValueIsValidTime(id);' onchange='' data-required='false' value='" + ('0') + "' /> </td>"
            + "<td class='ArrivalDate' style=''><input  tag='" + ('') + "' type='text' style=' font-size:90%;cursor:text;'  id='txtArrivalDate" + maxDetailsIDInTable + "' class='datepicker-input controlStyle'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onkeydown='DisableBackspaceKey(ID);' onchange='' data-date-format='dd/mm/yyyy' placeholder='Select Date' data-required='true' value='" + ArrivalDate + "' /> </td>"
            + "<td class='ArrivalTime' style=''><input  tag='" + ('') + "' type='text' style='font-size:90%;'  id='txtArrivalTime" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id); CheckValueIsValidTime(id);' onfocus='CheckValueIsDecimal(id); CheckValueIsValidTime(id);' onblur='CheckDecimalFormat(id); CheckValueIsValidTime(id);' onchange='' data-required='false' value='" + ('0') + "' /> </td>"
            + "<td class='FactoryGateOut' style=''><input  tag='" + ('') + "' type='text' style='font-size:90%;'  id='txtFactoryGateOut" + maxDetailsIDInTable + "' class='controlStyle inputValue'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + ('') + "' /> </td>"
            + "<td class='IssueDate' style=''><input  tag='" + ('') + "' type='text' style=' font-size:90%;cursor:text;'  id='txtFGODate" + maxDetailsIDInTable + "' class='datepicker-input controlStyle'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onkeydown='DisableBackspaceKey(ID);' onchange='' data-date-format='dd/mm/yyyy' placeholder='Select Date' data-required='false' value='" + FGODate + "' /> </td>"
            + "<td class='FGOTime' style=''><input  tag='" + ('') + "' type='text' style='font-size:90%;'  id='txtFGOTime" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id); CheckValueIsValidTime(id);' onfocus='CheckValueIsDecimal(id); CheckValueIsValidTime(id);' onblur='CheckDecimalFormat(id); CheckValueIsValidTime(id);' onchange='' data-required='false' value='" + ('0') + "' /> </td>"
            + "<td class='ReturnDate' style=''><input  tag='" + ('') + "' type='text' style=' font-size:90%;cursor:text;'  id='txtReturnDate" + maxDetailsIDInTable + "' class='datepicker-input controlStyle'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onkeydown='DisableBackspaceKey(ID);' onchange='' data-date-format='dd/mm/yyyy' placeholder='Select Date' data-required='true' value='" + ReturnDate + "' /> </td>"
            + "<td class='ReturnTime' style=''><input  tag='" + ('') + "' type='text' style='font-size:90%;'  id='txtReturnTime" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id); CheckValueIsValidTime(id);' onfocus='CheckValueIsDecimal(id); CheckValueIsValidTime(id);' onblur='CheckDecimalFormat(id); CheckValueIsValidTime(id);' onchange='' data-required='false' value='" + ('0') + "' /> </td>"
            + "<td class='Port2' style=''><input  tag='" + ('') + "' type='text' style='font-size:90%;'  id='txtPort2" + maxDetailsIDInTable + "' class='controlStyle inputValue'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + ('') + "' /> </td>"
            + "<td class='POD' style=''><input  tag='" + ('') + "' type='text' style='font-size:90%;'  id='txtPOD" + maxDetailsIDInTable + "' class='controlStyle inputValue'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + ('') + "' /> </td>"
            + "<td class='Trucker' style=''><input  tag='" + ('') + "' type='text' style='font-size:90%;'  id='txtTrucker" + maxDetailsIDInTable + "' class='controlStyle inputValue'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + ('') + "' /> </td>"
            + "<td class='Notes' style=''><input  tag='" + ('') + "' type='text' style='font-size:90%;'  id='txtNotes" + maxDetailsIDInTable + "' class='controlStyle inputValue'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + ('') + "' /> </td>"
            + "<td class='Invoice' style=''><input  tag='" + ('') + "' type='text' style='font-size:90%;'  id='txtInvoice" + maxDetailsIDInTable + "' class='controlStyle inputValue'  onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + ('') + "' /> </td>"
            + "<td class='TareWeight' style=''><input  tag='" + ('') + "' type='text' style='font-size:90%;'  id='txtTareWeight" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='' onfocus='' onblur='CheckDecimalFormat(id);' onchange='' data-required='false' value='" + ('') + "' /> </td>"
            + "<td class='NetWeight' style=''><input  tag='" + ('') + "' type='text' style='font-size:90%;'  id='txtNetWeight" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='' onfocus='' onblur='CheckDecimalFormat(id);' onchange='' data-required='false' value='" + ('') + "' /> </td>"
            + "<td class='GrossWeight' style=''><input  tag='" + ('') + "' type='text' style='font-size:90%;'  id='txtGrossWeight" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='' onfocus='' onblur='CheckDecimalFormat(id);' onchange='' data-required='false' value='" + ('') + "' /> </td>"
            + "<td class='TypeName' style=''><input  tag='" + ('') + "' type='text' style='font-size:90%;'  id='txtTypeName" + maxDetailsIDInTable + "' class='controlStyle inputValue'   onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + ('') + "' /> </td>"
            + "<td class='StatusName' style=''><input  tag='" + ('') + "' type='text' style='font-size:90%;'  id='txtStatusName" + maxDetailsIDInTable + "' class='controlStyle inputValue'   onkeypress='' onfocus='' onblur='' onchange='' data-required='false' value='" + ('') + "' /> </td>"





            + "</tr>"
        ));




    //ApplyPermissions();
    BindAllCheckboxonTable("tblDetails", "DetailsID", "cbDetailsDeleteHeader");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    CheckAllCheckbox("HeaderDeleteDetailsID");
    SetDatepickerFormat();
    /***********************EOF Filling row controls******************************/
}


function UploadContainersExcel() {
    debugger;

    //  else {
    // Checking whether FormData is available in browser
    if (window.FormData !== undefined) {

        FadePageCover(true);

        var fileUpload = $("#excelfile").get(0);
        //var fileUpload = $("#FileUpload1").get(0);
        var files = fileUpload.files;

        // Create FormData object
        var fileData = new FormData();

        // Looping over all files and add it to FormData object
        for (var i = 0; i < files.length; i++) {
            fileData.append(files[i].name, files[i]);
        }

        //// Adding one more key to FormData object
        fileData.append('pID', $("#hID").val());
        //fileData.append('pJVType_ID', $("#slJVType").val());
        //fileData.append('pReceiptNo', ($("#txtReceiptNo").val().trim() == "" ? "0" : $("#txtReceiptNo").val().trim().toUpperCase()));
        //fileData.append('pRemarksHeader', ($("#txtRemarksHeader").val() == "" ? "0" : $("#txtRemarksHeader").val().trim().toUpperCase()));
        //fileData.append('pJVDate', ConvertDateFormat($("#txtJVDate").val()));

        var pParametersWithValues = {
            //HeaderData
            pID: ($("#hID").val() == "" ? 0 : $("#hID").val())
            , File: fileData
        };


        //,JSON.stringify(pParametersWithValues)
        $.ajax({
            url: '/UploadExcel/UploadContainers',
            type: "POST",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            data: fileData,
            success: function (result) {
                if (result != 'File Uploaded Successfully!') {
                    FadePageCover(false);

                    swal(strSorry, result);
                }
                else {
                    //  JournalVouchers_LoadingWithPaging();
                    CallGETFunctionWithParameters("/api/TruckingOrders/LoadAllContainers"
                        , {
                            pWhereClause: "WHERE TruckingOrderID=" + $("#hID").val()
                            , pOrderBy: "ID"
                        }
                        , function (pData) {
                            Details_BindTableRows(JSON.parse(pData[0]));
                            FadePageCover(false);
                        }
                        , null);

                    swal("Success", "Saved successfully.");
                }

            },
            error: function (err) {
                // alert(err.statusText);
                swal(strSorry, err.statusText);
            }
        });
    } else {
        alert("FormData is not supported.");
    }
    // }


}
function Containers_Export() {
    var pDetailsIDList = GetAllIDsAsStringWithNameAttr("tblDetails", "Delete");
    var pDetailsID = '';

    $("#tblDetails tbody tr").each(function () {
        pDetailsID += ((pDetailsID == "") ? "" : ",") + ($(this).attr('ID'));
    });

    var pTablesHTML = "";
    pTablesHTML += '             <table id="tblContainersDetails" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
    pTablesHTML += '                 <thead style="">';
    pTablesHTML += '                     <th >' + 'SN' + '</th>';
    pTablesHTML += '                     <th >' + 'OperationNO' + '</th>';
    pTablesHTML += '                     <th >' + 'Factory' + '</th>';
    pTablesHTML += '                     <th >' + 'Date' + '</th>';
    pTablesHTML += '                     <th >' + 'SL' + '</th>';
    pTablesHTML += '                     <th >' + 'Booking No' + '</th>';
    pTablesHTML += '                     <th >' + 'PORT' + '</th>';
    pTablesHTML += '                     <th >' + 'CustomLOC' + '</th>';
    pTablesHTML += '                     <th >' + 'W / H' + '</th>';
    pTablesHTML += '                     <th >' + 'Size' + '</th>';
    pTablesHTML += '                     <th >' + 'ContainerNO' + '</th>';
    pTablesHTML += '                     <th >' + 'Driver Name' + '</th>';
    pTablesHTML += '                     <th >' + 'Phone' + '</th>';
    pTablesHTML += '                     <th >' + 'Truck No' + '</th>';
    pTablesHTML += '                     <th >' + 'TruckWeight' + '</th>';
    pTablesHTML += '                     <th >' + 'Location' + '</th>';
    pTablesHTML += '                     <th >' + 'Seal No' + '</th>';
    pTablesHTML += '                     <th >' + 'Release' + '</th>';
    pTablesHTML += '                     <th >' + 'ReleaseTime' + '</th>';
    pTablesHTML += '                     <th >' + 'Arrival' + '</th>';
    pTablesHTML += '                     <th >' + 'ArrivalTime' + '</th>';
    pTablesHTML += '                     <th >' + 'FactoryGateOut' + '</th>';
    pTablesHTML += '                     <th >' + 'FGODate' + '</th>';
    pTablesHTML += '                     <th >' + 'FGOTime' + '</th>';
    pTablesHTML += '                     <th >' + 'Return' + '</th>';
    pTablesHTML += '                     <th >' + 'ReturnTime' + '</th>';
    pTablesHTML += '                     <th >' + 'Port' + '</th>';
    pTablesHTML += '                     <th >' + 'POD' + '</th>';
    pTablesHTML += '                     <th >' + 'Trucker' + '</th>';
    pTablesHTML += '                     <th >' + 'Notes' + '</th>';
    pTablesHTML += '                     <th >' + 'Invoice' + '</th>';
    pTablesHTML += '                     <th >' + 'TareWeight' + '</th>';
    pTablesHTML += '                     <th >' + 'NetWeight' + '</th>';
    pTablesHTML += '                     <th >' + 'GrossWeight' + '</th>';
    pTablesHTML += '                     <th >' + 'Type' + '</th>';
    pTablesHTML += '                     <th >' + 'Closed' + '</th>';




    pTablesHTML += '                 </thead>';
    pTablesHTML += '                 <tbody>';


    if (pDetailsIDList != "") {
        var NumberOfDetailsRows = pDetailsIDList.split(',').length;
        for (var i = 0; i < NumberOfDetailsRows; i++) {
            pTablesHTML += '             <tr>';

            var currentRowID = pDetailsID.split(",")[i];
            pTablesHTML += '                     <td style="text-align:center;" >' + $("#txtSN" + currentRowID).val(); + '</td>'
            pTablesHTML += '                     <td style="text-align:center;" >' + $("#txtOperationNO" + currentRowID).val() + '</td>';
            pTablesHTML += '                     <td style="text-align:center;" >' + $("#txtFactory" + currentRowID).val() + '</td>';
            pTablesHTML += '                     <td style="text-align:center;" >' + ($("#txtIssueDate" + currentRowID).val().trim() != "" ? ConvertDateFormat($("#txtIssueDate" + currentRowID).val()) : "") + '</td>';
            pTablesHTML += '                     <td style="text-align:center;" >' + $("#txtSL" + currentRowID).val() + '</td>';
            pTablesHTML += '                     <td style="text-align:center;" >' + $("#txtBookingNo" + currentRowID).val() + '</td>';
            pTablesHTML += '                     <td style="text-align:center;" >' + $("#txtPORT" + currentRowID).val() + '</td>';
            pTablesHTML += '                     <td style="text-align:center;" >' + $("#txtCustomLOC" + currentRowID).val() + '</td>';
            pTablesHTML += '                     <td style="text-align:center;" >' + $("#txtWH" + currentRowID).val() + '</td>';
            pTablesHTML += '                     <td style="text-align:center;" >' + $("#txtSize" + currentRowID).val() + '</td>';
            pTablesHTML += '                     <td style="text-align:center;" >' + $("#txtContainerNO" + currentRowID).val() + '</td>';
            pTablesHTML += '                     <td style="text-align:center;" >' + $("#txtDriverName" + currentRowID).val() + '</td>';
            pTablesHTML += '                     <td style="text-align:center;" >' + $("#txtPhone" + currentRowID).val() + '</td>';
            pTablesHTML += '                     <td style="text-align:center;" >' + $("#txtTruckNo" + currentRowID).val() + '</td>';
            pTablesHTML += '                     <td style="text-align:center;" >' + $("#txtTruckWeight" + currentRowID).val() + '</td>';
            pTablesHTML += '                     <td style="text-align:center;" >' + $("#txtLocation" + currentRowID).val() + '</td>';
            pTablesHTML += '                     <td style="text-align:center;" >' + $("#txtSealNo" + currentRowID).val(); + '</td>';
            pTablesHTML += '                     <td style="text-align:center;" >' + ($("#txtReleaseDate" + currentRowID).val().trim() != "" ? ConvertDateFormat($("#txtReleaseDate" + currentRowID).val()) : "") + '</td>';
            pTablesHTML += '                     <td style="text-align:center;" >' + $("#txtReleaseTime" + currentRowID).val(); + '</td>'
            pTablesHTML += '                     <td style="text-align:center;" >' + ($("#txtArrivalDate" + currentRowID).val().trim() != "" ? ConvertDateFormat($("#txtArrivalDate" + currentRowID).val()) : "") + '</td>';
            pTablesHTML += '                     <td style="text-align:center;" >' + $("#txtArrivalTime" + currentRowID).val(); + '</td>'
            pTablesHTML += '                     <td style="text-align:center;" >' + $("#txtFactoryGateOut" + currentRowID).val() + '</td>';
            pTablesHTML += '                     <td style="text-align:center;" >' + ($("#txtFGODate" + currentRowID).val().trim() != "" ? ConvertDateFormat($("#txtFGODate" + currentRowID).val()) : "") + '</td>';
            pTablesHTML += '                     <td style="text-align:center;" >' + $("#txtFGOTime" + currentRowID).val(); + '</td>'
            pTablesHTML += '                     <td style="text-align:center;" >' + ($("#txtReturnDate" + currentRowID).val().trim() != "" ? ConvertDateFormat($("#txtReturnDate" + currentRowID).val()) : "") + '</td>';
            pTablesHTML += '                     <td style="text-align:center;" >' + $("#txtReturnTime" + currentRowID).val(); + '</td>'
            pTablesHTML += '                     <td style="text-align:center;" >' + $("#txtPort2" + currentRowID).val() + '</td>';
            pTablesHTML += '                     <td style="text-align:center;" >' + $("#txtPOD" + currentRowID).val() + '</td>';
            pTablesHTML += '                     <td style="text-align:center;" >' + $("#txtTrucker" + currentRowID).val() + '</td>';
            pTablesHTML += '                     <td style="text-align:center;" >' + $("#txtNotes" + currentRowID).val() + '</td>';
            pTablesHTML += '                     <td style="text-align:center;" >' + $("#txtInvoice" + currentRowID).val() + '</td>';
            pTablesHTML += '                     <td style="text-align:center;" >' + $("#txtTareWeight" + currentRowID).val() + '</td>';
            pTablesHTML += '                     <td style="text-align:center;" >' + $("#txtNetWeight" + currentRowID).val() + '</td>';
            pTablesHTML += '                     <td style="text-align:center;" >' + $("#txtGrossWeight" + currentRowID).val() + '</td>';
            pTablesHTML += '                     <td style="text-align:center;" >' + $("#txtTypeName" + currentRowID).val() + '</td>';
            pTablesHTML += '                     <td style="text-align:center;" >' + $("#txtStatusName" + currentRowID).val() + '</td>';





            pTablesHTML += '             </tr>';

        }
    }


    pTablesHTML += '                 </tbody>';
    pTablesHTML += '             </table>';
    $("#hExportedTable").html(pTablesHTML);



    var filename = "TruckingOrderNo" + $('#txtCodeTruckingOrder').val() + "-" + getTodaysDateInddMMyyyyFormat() + ".xlsx";
    var table1 = document.querySelector("#tblContainersDetails");
    var sheet = XLSX.utils.table_to_sheet(table1);//Convert a table object to a sheet object
    openDownloadDialog(sheet2blob(sheet), filename);

    //ExportHtmlTableToCsv_RemovingCommasForNumbers("tblContainersDetails");
    //var $table = $("#tblContainersDetails");
    //$table.table2excel({
    //    exclude: ".noExl",
    //    name: "sheet",
    //    fileext: ".xlsx",
    //    filename: "TruckingOrderNo" + $('#txtCodeTruckingOrder').val()+ "-" + getTodaysDateInddMMyyyyFormat() + "", // do include extension
    //    preserveColors: false // set to true if you want background colors and font colors preserved
    //});
}
// Turn a sheet into a blob object for the final excel file and download it using the URL.createObjectURL
function sheet2blob(sheet, sheetName) {
    sheetName = sheetName || 'sheet1';
    var workbook = {
        SheetNames: [sheetName],
        Sheets: {}
    };
    workbook.Sheets[sheetName] = sheet; // Generate excel configuration items

    var wopts = {
        bookType: 'xlsx', // File type to generate
        bookSST: false, // Whether to generate Shared String Table or not, the official explanation is that the build speed will decrease if turned on, but there is better compatibility on lower version IOS devices
        type: 'binary'
    };
    var wbout = XLSX.write(workbook, wopts);
    var blob = new Blob([s2ab(wbout)], {
        type: "application/octet-stream"
    }); // String to ArrayBuffer
    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
    return blob;
}
function openDownloadDialog(url, saveName) {
    if (typeof url == 'object' && url instanceof Blob) {
        url = URL.createObjectURL(url); // Create a blob address
    }
    var aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = saveName || ''; // HTML5 new property, specify save file name, may not suffix, note that file:///mode will not take effect
    var event;
    if (window.MouseEvent) event = new MouseEvent('click');
    else {
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);
}


//*********************************Reading Excel Files(Must be saved as Excel 97-2003)***************************************//
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
                if (oJS.length > 0 && oJS[0].ContainerNumber != undefined) //if (sCSV != "")
                    OperationContainersAndPackages_ImportFromExcelFile(oJS, pBtnName);
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
    for (var i = 0; i < pDataRows.length; i++) { //replace '\', ' ', ',' with space
        pContainerNumberList += (pContainerNumberList == ""
            ? (pDataRows[i].ContainerNumber == undefined || pDataRows[i].ContainerNumber.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].ContainerNumber.replace(/[\, ]/g, ' ').toUpperCase().trim().slice(0, 11))
            : ("," + (pDataRows[i].ContainerNumber == undefined || pDataRows[i].ContainerNumber.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].ContainerNumber.replace(/[\, ]/g, ' ').toUpperCase().trim().slice(0, 11)))
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
    };
    CallPOSTFunctionWithParameters("/api/OperationContainersAndPackages/InsertListFromExcel", pParametersWithValues
        , function (pData) {
            if (pData[0]) {
                var pOperationContainersAndPackages = JSON.parse(pData[1]);
                swal("Success", "Saved Successfully.");
                RountingsVehicle_BindTableRows(pOperationContainersAndPackages);
            }
            else {
                swal("Sorry", "Please, revise data and version of the file.");
            }
            FadePageCover(false);
        }
        , null);
    $("#" + pBtnName).val(""); //if removed the last selected file remains till unselected
}
/*******************************************************************************/
function TruckingOrdersContainers_DeleteList() {
    debugger;
    //Confirmation message to delete

    var ptblModalName = "tblDetails";
    if (GetAllSelectedIDsAsString(ptblModalName) != "")
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
                DeleteListFunction("/api/TruckingOrders/DeleteContainers"
                    , { "pTruckingOrderContainerIDs": GetAllSelectedIDsAsString(ptblModalName) }
                    , function () {
                        CallGETFunctionWithParameters("/api/TruckingOrders/LoadAllContainers"
                            , {
                                pWhereClause: "WHERE TruckingOrderID=" + $("#hID").val()
                                , pOrderBy: "ID"
                            }
                            , function (pData) {
                                Details_BindTableRows(JSON.parse(pData[0]));
                            }
                            , null);
                    });
            });
}
function TruckingOrder_SendLocalEmail(pSubject, pBody, pOperationID) {
    debugger;
    var pModalName = "CheckboxesListModal";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pSelectedItemsIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
    if (pSelectedItemsIDs == "")
        swal("Sorry", "You have to select at least one receptionist.");
    else { //send
        FadePageCover(true);
        var pParametersWithValues = {
            pUserIDs: pSelectedItemsIDs
            , pSubject: pSubject
            , pBody: pBody
            , pQuotationRouteID: 0
            , pPricingID: 0
            , pRequestOrReply: 0
            , pOperationID: pOperationID
            , pIsAlarm: true
            , pParentID: 0
            , pEmailSource: 0
            , pIsSendNormalEmail: false
            //LoadWithPaging parameters
            , pWhereClauseForLoadWithPaging: ("WHERE 1=1")
            , pPageSize: 1 //$("#select-page-size").val()
            //pPageNumber is 1 coz its insert so it will be on the top
            , pPageNumber: 1 //$("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text() 
            , pOrderBy: "ID DESC"
            , pSenderUserID: pLoggedUser.ID
        };
        CallGETFunctionWithParameters("/api/LocalEmails/SendEmail", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    jQuery("#CheckboxesListModal").modal("hide");
                    swal("Success", "Sent successfully.");
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
            , null);
    }
}
function LoadAllContainersData() {
    CallGETFunctionWithParameters("/api/TruckingOrders/LoadAllContainers"
        , {
            pWhereClause: "WHERE TruckingOrderID=" + $("#hID").val()
            , pOrderBy: "ID"
        }
        , function (pData) {
            Details_BindTableRows(JSON.parse(pData[0]));
            FadePageCover(false);
        }
        , null);
}
/******************************************FleetTransportOrder***********************************************/
function FleetTransportOrder_Initialize() {
    debugger;
    FadePageCover(true);
    strBindTableRowsFunctionName = "FleetTransportOrder_BindTableRows";
    strLoadWithPagingFunctionName = "/api/Routings/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";
    var pWhereClause = " WHERE RoutingTypeID=60 AND IsFleet=1" + "\n"; //TruckingOrders_GetWhereClause();
    if (glbCallingControl == "FleetTransportOrder")
        pWhereClause += " AND IsApproved=0 AND IsOwnedByCompany=1" + "\n";
    else if (glbCallingControl == "FleetTransportOrderSupplier") {
        pWhereClause += " AND IsApproved=0 AND IsOwnedByCompany=0" + "\n";
    }
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/TR/Transactions/FleetTransportOrder", "div-content", function () {

        if (pDefaults.UnEditableCompanyName == "GBL") {
            $(".classHideForGBL").addClass("hide");
        }
        else if (pDefaults.UnEditableCompanyName == "CAL") {
            $(".classHideForCAL").addClass("hide");
            $(".classShowForCAL").removeClass("hide");
        }
        if (glbCallingControl == "FleetTransportOrder") {
            $("#cbIsOwnedByCompany").prop("checked", true);
            $(".classOwnedByCompany").removeClass("hide");
            $("#liGroupName").text("Fleet");
            $("#liGroupName").attr("onclick", "LoadViews('TR_Transactions')");
            $("#liTabName").text("Transactions");
            $("#liTabName").attr("onclick", "LoadViews('TR_Transactions')");
            $("#liFormName").text("Transport Orders");
            $("#h3LblMainScreen").text("Transport Orders (Own Fleet - Distribution)"); //$("#h3LblMainScreen").addClass("static-text-primary");
            $("#h3ModalLabel").text("Transport Orders (Own Fleet)");
            //$("#h3ModalLblAllocationType").html("Receivables Allocation" + '&nbsp;<label id="lblAllocationShown" purpose="dynamicLabel" class="static-text-primary"></label>');
            //$("#h3ModalLblAllocationType").addClass("static-text-primary");
        }
        else if (glbCallingControl == "FleetTransportOrderSupplier") {
            $("#cbIsOwnedByCompany").prop("checked", false);
            $(".classOwnedBySupplier").removeClass("hide");
            $("#liGroupName").text("Fleet");
            $("#liGroupName").attr("onclick", "LoadViews('TR_Transactions')");
            $("#liTabName").text("Transactions");
            $("#liTabName").attr("onclick", "LoadViews('TR_Transactions')");
            $("#liFormName").text("Transport Orders");
            $("#h3LblMainScreen").text("Transport Orders (Supplier - Distribution)"); //$("#h3LblMainScreen").addClass("static-text-primary");
            $("#h3ModalLabel").text("Transport Orders (Supplier)");
            //$("#h3ModalLblAllocationType").html("Receivables Allocation" + '&nbsp;<label id="lblAllocationShown" purpose="dynamicLabel" class="static-text-primary"></label>');
            //$("#h3ModalLblAllocationType").addClass("static-text-primary");
        }
        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
            , function (pData) {
                var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
                var pTruckerList = pData[2];
                var pCommodityList = pData[3];
                var pEquipmentList = pData[4];
                var pTrailerList = pData[5];
                var pOperationID = pData[6];
                var pDriverList = pData[7];
                var pPortList = pData[8];
                var pDivision = pData[9];
                var pUser = pData[10];
                $("#slCustomer").html($("#hReadySlCustomers").html());
                $("#slFilterCustomer").html($("#hReadySlCustomers").html());

                $("#slCustomer").css({ "width": "100%" }).select2();
                $("#slCustomer").trigger("change");
                $("div[tabindex='-1']").removeAttr('tabindex');

                $("#hOperationID").val(pOperationID);
                FillListFromObject(null, 2, "<--Select-->", "slRoutingsLinesTruckingOrder", pTruckerList, function () { $("#slFilterTrucker").html($("#slRoutingsLinesTruckingOrder").html()); });
                FillListFromObject(null, 2, "<--Select-->", "slCommodity", pCommodityList, null);
                //FillListFromObject(null, 2, "<--Select-->", "slEquipmentTruckingOrder", pEquipmentList, function () { $("#slFilterEquipment").html($("#slEquipmentTruckingOrder").html()); });
                Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(pEquipmentList, "ID", "Name,LicenseStatus,EquipmentTypeName", ' ', "<--Select-->", "#slEquipmentTruckingOrder", null, "EquipmentModelID", function () { $("#slFilterEquipment").html($("#slEquipmentTruckingOrder").html()); });

                //CallGETFunctionWithParameters("/api/routings/LoadAll"
                //    , {
                //        pWhereClause: "WHERE TruckingOrderCode IS NOT NULL AND IsFleet=1 AND IsOwnedByCompany=" + (glbCallingControl == "FleetTransportOrder" ? "1" : "0") + " AND RoutingTypeID=" + TruckingOrderRoutingTypeID
                //        , pOrderBy: "ID DESC"
                //    }
                //    , function (pData) {
                //        Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(pData[0], "ID", "OperationCode,ClientName,TruckingOrderCode", ' --> ', "<--Select-->", "#slFilterTruckingOrder", null, "ID", function () { ApplySelectListSearch(); });
                //    }
                //    , null);

                Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(pTrailerList, "ID", "Name,LicenseStatus", ' ', "<--Select-->", "#slTrailerTruckingOrder", null, "", function () { $("#slFilterTrailer").html($("#slTrailerTruckingOrder").html()); });
                Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(pDriverList, "ID", "Name,LicenseStatus", ' ', "<--Select-->", "#slDriverTruckingOrder", null, "", null);
                FillListFromObject(null, 2, "<--Select-->", "slDivision", pDivision, null);
                FillListFromObject(null, 2, "<--Select-->", "slFilterCreator", pUser, null);

                FillListFromObject(null, 2, "<--Select-->", "slRoutingsLoadingZoneTruckingOrder", pPortList, null);
                FillListFromObject(null, 2, "<--Select-->", "slRoutingsFirstCuringAreaTruckingOrder", pPortList, null);
                FillListFromObject(null, 2, "<--Select-->", "slRoutingsSecondCuringAreaTruckingOrder", pPortList, null);
                FillListFromObject(null, 2, "<--Select-->", "slRoutingsThirdCuringAreaTruckingOrder", pPortList, null);
                //FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slTruckingOrderGateInPortTruckingOrder", pPortList, null);
                //$("#slTruckingOrderGateOutPortTruckingOrder").html($("#slTruckingOrderGateInPortTruckingOrder").html());
                ApplySelectListSearch_OnlyChange(); //ApplySelectListSearch();

                //FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slTrailerTruckingOrder", pData[2], null);
                //FillListFromObject(null, 2, "<--Select-->", "slDriverTruckingOrder", pData[3], null);
                //FillListFromObject(null, 2, "<--Select-->", "slDriverAssistantTruckingOrder", pData[4], null);
                //FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slEquipmentTruckingOrder", pData[6], null);


                FleetTransportOrder_BindTableRows(JSON.parse(pData[0]));
            });
        LoadView("/MasterData/ModalSelectCharges", "div-content", function () {
            if (pDefaults.IsTaxOnItems) $(".classShowForTaxOnItems").removeClass("hide");
            else $(".classShowForTaxOnHeader").removeClass("hide");
            if (pDefaults.UnEditableCompanyName == "GBL")
                $(".classShowForGBL").removeClass("hide");
        }, null, null, true);
        //if (pDefaults.UnEditableCompanyName == "IST")
        //    $(".classShowForIST").removeClass("hide");
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    },
        function () { FleetTransportOrder_FillModalControls(0); },
        function () { Routings_DeleteList(); });
}
function FleetTransportOrder_BindTableRows(pRoutings) {
    debugger;
    $("#hl-menu-TR").parent().addClass("active");
    ClearAllTableRows("tblRoutings");
    //var editControlsText = " class='btn btn-xs btn-rounded btn-info float-right hide' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Print" + "</span>";
    var emailControlsText = " class='btn btn-xs btn-rounded btn-info float-right " + (pDefaults.UnEditableCompanyName == "GBL" ? " hide " : "") + "' > <i class='fa fa-envelope-o' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Mail" + "</span>";
    var copyControlsText = " class='btn btn-xs btn-rounded btn-primary float-right' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Copy" + "</span>";
    $.each(pRoutings, function (i, item) {
        AppendRowtoTable("tblRoutings",
            ("<tr ID='" + item.ID + "' ondblclick='FleetTransportOrder_FillModalControls(" + item.ID + ");' class='" + (item.IsApproved ? " text-primary " : "") + "'>"
                + "<td class='ID'> <input name='Delete' " + (item.InvoiceID != 0 ? " disabled " : "") + " type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='RoutingType hide' val='" + item.RoutingTypeID + "'>" + item.RoutingName + "</td>"
                + "<td class='TruckingOrderCode'>" + (item.TruckingOrderCode == 0 ? "" : item.TruckingOrderCode) + "</td>"
                + "<td class='CustomerID hide'>" + item.CustomerID + "</td>"
                + "<td class='ClientName'>" + item.ClientName + "</td>"
                + "<td class='POL hide'>" + item.POL + "</td>"
                + "<td class='POD hide'>" + item.POD + "</td>"
                + "<td class='Route'>" + (item.POLName + "-->" + item.PODName) + "</td>"
                + "<td class='TruckerID hide'>" + item.TruckerID + "</td>"
                + "<td class='TruckerName'>" + (item.TruckerID == 0 ? "" : item.TruckerName) + "</td>"
                + "<td class='CommodityID hide'>" + item.CommodityID + "</td>"
                + "<td class='CommodityName'>" + (item.CommodityID == 0 ? "" : item.CommodityName) + "</td>"
                + "<td class='Cost'>" + (item.IsOwnedByCompany ? item.CostFromPayables : item.Cost) + "</td>"
                + "<td class='Sale hide'>" + (item.Sale == 0 ? "" : item.Sale) + "</td>"
                + "<td class='Creator'>" + (item.CreatorName == 0 ? "" : item.CreatorName) + "</td>"
                + "<td class='InvoiceNumber'>" + (item.InvoiceNumber == 0 ? "" : (item.InvoiceNumber + "/" + item.InvoiceTypeName)) + "</td>"

                //+ "<td class='QuotationRouteCode'>" + (item.QuotationRouteCode == 0 ? "" : item.QuotationRouteCode) + "</td>"
                //+ "<td class='FromDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.FromDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.FromDate))) + "</td>"

                //+ "<td class='IsFinalized hide'> <input type='checkbox' id='cbIsFinalized" + item.ID + "' disabled='disabled' " + (item.IsFinalized ? " checked='checked' " : "") + " /></td>"
                + "<td class=''>"
                + "<a onclick='Routings_Copy(" + item.ID + ");' " + copyControlsText + "</a>"
                + "<a onclick='Print_TruckingOrder(" + item.ID + "," + '"Email"' + ");' " + emailControlsText + "</a>"
                + "<a onclick='Print_TruckingOrder(" + item.ID + "," + '"Print"' + ");' " + printControlsText + "</a>"
                //+ "<a href='#RoutingModalTruckingOrder' data-toggle='modal' onclick='FleetTransportOrder_FillModalControls(" + item.ID + ");' " + editControlsText + "</a>"
                + "</td>"
                + "</tr>"));
    });
    ApplyPermissions();
    if ($("#hf_CanDelete").val() == 1) {
        $("#btn-ApproveRoute").removeClass("hide");
        $("#btn-DeleteRoute").removeClass("hide");
        $("#btn-UnApproveRoute").removeClass("hide");
    }
    else {
        $("#btn-ApproveRoute").addClass("hide");
        $("#btn-DeleteRoute").addClass("hide");
        $("#btn-UnApproveRoute").addClass("hide");
    }
    BindAllCheckboxonTable("tblRoutings", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblRoutings>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
    ApplySelectListSearch_OnlyChange(); //ApplySelectListSearch();
}
function FleetTransportOrder_FillModalControls(pID) {
    debugger;
    ClearAll("#RoutingModalTruckingOrder");
    $(".classDisableForApproved").removeAttr("disabled");
    $("#tblPayables tbody").html("");
    //$("#slDivision").html("<option value=0>" + "</option>");

    //FleetTransportOrder_EquipmentTypeChanged();
    jQuery("#RoutingModalTruckingOrder").modal("show");
    $("#btnSaveRoutingTruckingOrder").attr("onclick", "FleetTransportOrder_Insert(false);");
    ApplySelectListSearch_OnlyChange(); //ApplySelectListSearch();
    if (pID > 0) {
        FadePageCover(true);
        var pParametersWithValues = {
            pRouteIDToFillModal: pID
            , pOperationID: $("#hOperationID").val()
        };
        CallGETFunctionWithParameters("/api/Routings/FillRoutingModal", pParametersWithValues
            , function (pData) {
                var _ReturnedMessage = pData[0];
                var _OperationHeader = JSON.parse(pData[1]);
                var _TruckingOrder = JSON.parse(pData[2]);
                var _QuotationRoute = pData[3];
                var _Payable = JSON.parse(pData[4]);
                if (_TruckingOrder.IsApproved) {
                    $(".classDisableForApproved").attr("disabled", "disabled");
                }
                else {
                    $(".classDisableForApproved").removeAttr("disabled");
                }
                $("#hRoutingIDTruckingOrder").val(pID);
                $("#hID").val(pID);

                Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(_QuotationRoute, "ID", "POLName,PODName,EquipmentModelName", '-->', "<--Select-->", "#slQuotationRoute", _TruckingOrder.QuotationRouteID, "CommodityID,POL,POD,POLAddress,PODAddress,Sale,Cost,DivisionName,EquipmentTypeID,EquipmentModelID,Notes"
                    , function () {
                        $("#slQuotationRoute").val(_TruckingOrder.QuotationRouteID);
                        ApplySelectListSearch_OnlyChange(); //ApplySelectListSearch();
                    });

                $("#txtCodeTruckingOrder").val(_TruckingOrder.TruckingOrderCode == 0 ? "" : _TruckingOrder.TruckingOrderCode);
                $("#slCustomer").val(_TruckingOrder.CustomerID == 0 ? "" : _TruckingOrder.CustomerID);
                $("#slCommodity").val(_TruckingOrder.CommodityID == 0 ? "" : _TruckingOrder.CommodityID);
                $("#slRoutingsLinesTruckingOrder").val(_TruckingOrder.TruckerID == 0 ? "" : _TruckingOrder.TruckerID);
                //$("#slEquipmentTruckingOrder").val(_TruckingOrder.EquipmentID == 0 ? "" : _TruckingOrder.EquipmentID);
                $("#slEquipmentTruckingOrder").val(_TruckingOrder.EquipmentID);
                $("#slTrailerTruckingOrder").val(_TruckingOrder.TrailerID == 0 ? "" : _TruckingOrder.TrailerID);
                $("#slDriverTruckingOrder").val(_TruckingOrder.DriverID == 0 ? "" : _TruckingOrder.DriverID);

                $("#slRoutingsLoadingZoneTruckingOrder").val(_TruckingOrder.LoadingZoneID == 0 ? "" : _TruckingOrder.LoadingZoneID);
                $("#slRoutingsFirstCuringAreaTruckingOrder").val(_TruckingOrder.FirstCuringAreaID == 0 ? "" : _TruckingOrder.FirstCuringAreaID);
                $("#slRoutingsSecondCuringAreaTruckingOrder").val(_TruckingOrder.SecondCuringAreaID == 0 ? "" : _TruckingOrder.SecondCuringAreaID);
                $("#slRoutingsThirdCuringAreaTruckingOrder").val(_TruckingOrder.ThirdCuringAreaID == 0 ? "" : _TruckingOrder.ThirdCuringAreaID);

                $("#txtTruckLastCounterTruckingOrder").val(_TruckingOrder.LastTruckCounter == 0 ? "" : _TruckingOrder.LastTruckCounter);
                $("#txtTruckCounterTruckingOrder").val(_TruckingOrder.TruckCounter == 0 ? "" : _TruckingOrder.TruckCounter);

                $("#txtTruckingOrderQuantityTruckingOrder").val(_TruckingOrder.Quantity == 0 ? "" : _TruckingOrder.Quantity);
                $("#txtCost").val(_TruckingOrder.Cost == 0 ? "" : _TruckingOrder.Cost);
                $("#txtSale").val(_TruckingOrder.Sale == 0 ? "" : _TruckingOrder.Sale);

                $("#slRoutingsPOLTruckingOrder").html("<option value=" + _TruckingOrder.POL + ">" + _TruckingOrder.POLName + "</option>");
                $("#slRoutingsPODTruckingOrder").html("<option value=" + _TruckingOrder.POD + ">" + _TruckingOrder.PODName + "</option>");
                //$("#slDivision").html("<option value=0>" + (_TruckingOrder.DivisionName == 0 ? "" : _TruckingOrder.DivisionName) + "</option>");
                $("#slDivision").val(_TruckingOrder.DivisionID == 0 ? "" : _TruckingOrder.DivisionID);

                $("#txtTruckingOrderPickupAddressTruckingOrder").val(_TruckingOrder.PickupAddress == 0 ? "" : _TruckingOrder.PickupAddress);
                $("#txtLoadingDate").val((Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(_TruckingOrder.LoadingDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(_TruckingOrder.LoadingDate)) : ""));
                $("#txtTruckingOrderLoadingTimeTruckingOrder").val(_TruckingOrder.LoadingTime == 0 ? "" : _TruckingOrder.LoadingTime);
                $("#txtLoadingReference").val(_TruckingOrder.LoadingReference == 0 ? "" : _TruckingOrder.LoadingReference);
                $("#txtTruckingOrderDeliveryAddressTruckingOrder").val(_TruckingOrder.DeliveryAddress == 0 ? "" : _TruckingOrder.DeliveryAddress);
                $("#txtUnloadingDate").val((Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(_TruckingOrder.UnloadingDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(_TruckingOrder.UnloadingDate)) : ""));
                $("#txtUnloadingTime").val(_TruckingOrder.UnloadingTime == 0 ? "" : _TruckingOrder.UnloadingTime);
                $("#txtUnloadingReference").val(_TruckingOrder.UnloadingReference == 0 ? "" : _TruckingOrder.UnloadingReference);

                $("#txtTruckingOrderGateInDateTruckingOrder").val(_TruckingOrder.GateInDate == 0 ? "" : _TruckingOrder.GateInDate);
                $("#txtTruckingOrderGateOutDateTruckingOrder").val(_TruckingOrder.GateOutDate == 0 ? "" : _TruckingOrder.GateOutDate);

                $("#txtTruckingOrderDelaysTruckingOrder").val(_TruckingOrder.Delays == 0 ? "" : _TruckingOrder.Delays);
                $("#txtTruckingOrderPowerFromGateInTillActualSailingTruckingOrder").val(_TruckingOrder.PowerFromGateInTillActualSailing == 0 ? "" : _TruckingOrder.PowerFromGateInTillActualSailing);
                $("#txtRoutingNotesTruckingOrder").val(_TruckingOrder.Notes == 0 ? "" : _TruckingOrder.Notes);
                /*****************************GBL*********************************/
                $("#txtBillNumberTruckingOrder").val(_TruckingOrder.BillNumber == 0 ? "" : _TruckingOrder.BillNumber);
                $("#txtCargoReturnGrossWeightTruckingOrder").val(_TruckingOrder.CargoReturnGrossWeight == 0 ? "" : _TruckingOrder.CargoReturnGrossWeight);
                //FleetTransportOrder_EquipmentTypeChanged();
                TruckingOrder_TruckLastCounter(function () { TruckingOrder_GetKilometersDifference(); });
                Payables_BindTableRows(_Payable);

                ApplySelectListSearch_OnlyChange(); //ApplySelectListSearch();

                $("#btnSaveRoutingTruckingOrder").attr("onclick", "Save_FleetDistribution(false);"); //till now just update
                FadePageCover(false);
            }
            , null);
    }
}
function FleetTransportOrder_Insert(pSaveandAddNew, pCallback) {
    debugger;
    if (RoutingSuffix != "CustomsClearance" && !Routings_CheckDatesLogic())
        swal(strSorry, strCheckDates);
    //uncomment if i want to remove logic date validation
    //else //check dates are not before open date
    //    if (
    //        ($("#txtExpectedDeparture").val().trim() != "" && Date.prototype.compareDates(ConvertDateFormat($("#txtOpenDate").val().trim()), ConvertDateFormat($("#txtExpectedDeparture").val().trim())) < 0)
    //        || ($("#txtActualDeparture").val().trim() != "" && Date.prototype.compareDates(ConvertDateFormat($("#txtOpenDate").val().trim()), ConvertDateFormat($("#txtActualDeparture").val().trim())) < 0)
    //        || ($("#txtExpectedArrival").val().trim() != "" && Date.prototype.compareDates(ConvertDateFormat($("#txtOpenDate").val().trim()), ConvertDateFormat($("#txtExpectedArrival").val().trim())) < 0)
    //        || ($("#txtActualArrival").val().trim() != "" && Date.prototype.compareDates(ConvertDateFormat($("#txtOpenDate").val().trim()), ConvertDateFormat($("#txtActualArrival").val().trim())) < 0)
    //        )
    //        swal(strSorry, "Dates must be after open date.");
    else if (glbCallingControl == "FleetTransportOrder"
        && $("#slQuotationRoute option:selected").attr("EquipmentModelID") != undefined
        && $("#slQuotationRoute option:selected").attr("EquipmentModelID") != 0
        && $("#slEquipmentTruckingOrder option:selected").attr("EquipmentModelID") != undefined
        && $("#slEquipmentTruckingOrder option:selected").attr("EquipmentModelID") != 0
        && $("#slQuotationRoute option:selected").attr("EquipmentModelID") != $("#slEquipmentTruckingOrder option:selected").attr("EquipmentModelID")
    )
        swal("Sorry", "The equipment you chose is not the same model as the route contract.");
    else if (pDefaults.UnEditableCompanyName == "GBL" //Capital asked for that request then asked to cancel it
        && (glbCallingControl == "TruckingOrdersOwnFleet" || glbCallingControl == "FleetTransportOrder")
        && parseFloat(IsNull($("#txtTruckCounterTruckingOrder").val(), 99999999)) < parseFloat(IsNull($("#txtTruckLastCounterTruckingOrder").val(), 0))
    ) {
        swal("Sorry", "Please, check the kilometeres.");
    }
    else if (ValidateForm("form", "RoutingModal" + RoutingSuffix)) {
        FadePageCover(true);
        var pParametersWithValues = {
            pOperationID: $("#hOperationID").val()
            , pRoutingTypeID: TruckingOrderRoutingTypeID //$('#slRoutingTypes' + RoutingSuffix + ' option:selected').val()
            , pTransportTypeID: InlandTransportType //$("#hRoutingTransportType" + RoutingSuffix).val()
            , pTransportIconName: InlandIconName //$("#hRoutingTransportIconName" + RoutingSuffix).val()
            , pTransportIconStyle: strInlandIconStyleClassName //$("#hRoutingTransportIconStyle" + RoutingSuffix).val()

            , pPOLCountryID: RoutingSuffix == "CustomsClearance" ? $("#hPOLCountryID").val() : $('#slRoutingsPOLCountries' + RoutingSuffix + ' option:selected').val()
            , pPODCountryID: RoutingSuffix == "CustomsClearance" ? $("#hPODCountryID").val() : $('#slRoutingsPODCountries' + RoutingSuffix + ' option:selected').val()
            , pPOLID: RoutingSuffix == "CustomsClearance" ? $("#hPOL").val() : $('#slRoutingsPOL' + RoutingSuffix + ' option:selected').val()
            , pPODID: RoutingSuffix == "CustomsClearance" ? $("#hPOL").val() : $('#slRoutingsPOD' + RoutingSuffix + ' option:selected').val()

            , pETAPOLDate: (RoutingSuffix == "CustomsClearance" || $("#txtETAPOLDate" + RoutingSuffix).val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtETAPOLDate" + RoutingSuffix).val()))
            , pATAPOLDate: (RoutingSuffix == "CustomsClearance" || $("#txtATAPOLDate" + RoutingSuffix).val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtATAPOLDate" + RoutingSuffix).val()))
            , pExpectedArrival: (RoutingSuffix == "CustomsClearance" || $("#txtExpectedArrival" + RoutingSuffix).val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtExpectedArrival" + RoutingSuffix).val()))
            , pExpectedDeparture: (RoutingSuffix == "CustomsClearance" || $("#txtExpectedDeparture" + RoutingSuffix).val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtExpectedDeparture" + RoutingSuffix).val()))
            , pActualArrival: (RoutingSuffix == "CustomsClearance" || $("#txtActualArrival" + RoutingSuffix).val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtActualArrival" + RoutingSuffix).val()))
            , pActualDeparture: (RoutingSuffix == "CustomsClearance" || $("#txtActualDeparture" + RoutingSuffix).val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtActualDeparture" + RoutingSuffix).val()))

            , pShippingLineID: (RoutingSuffix == "CustomsClearance")
                ? 0
                : ($("#hRoutingTransportType" + RoutingSuffix).val() == OceanTransportType
                    ? ($('#slRoutingsLines' + RoutingSuffix + ' option:selected').val() == "" ? 0 : $('#slRoutingsLines' + RoutingSuffix + ' option:selected').val())
                    : 0)
            , pAirlineID: (RoutingSuffix == "CustomsClearance")
                ? 0
                : ($("#hRoutingTransportType" + RoutingSuffix).val() == AirTransportType
                    ? ($('#slRoutingsLines' + RoutingSuffix + ' option:selected').val() == "" ? 0 : $('#slRoutingsLines' + RoutingSuffix + ' option:selected').val())
                    : 0)
            , pTruckerID: $("#slRoutingsLinesTruckingOrder").val() == "" ? 0 : $("#slRoutingsLinesTruckingOrder").val()
            , pVesselID: (RoutingSuffix == "CustomsClearance")
                ? 0
                : ($("#hRoutingTransportType" + RoutingSuffix).val() == OceanTransportType
                    ? ($('#slRoutingVessels' + RoutingSuffix + ' option:selected').val() == "" ? 0 : $('#slRoutingVessels' + RoutingSuffix + ' option:selected').val())
                    : 0)
            , pVoyageOrTruckNumber: ($("#cbIsOwnedByCompany").prop("checked") || RoutingSuffix == "CustomsClearance") ? 0 : $("#txtRoutingVoyageOrTruckNumber" + RoutingSuffix).val().trim().toUpperCase()
            , pTransientTime: RoutingSuffix == "CustomsClearance" || $("#txtRoutingTransientTime" + RoutingSuffix).val().trim() == "" ? 0 : $("#txtRoutingTransientTime" + RoutingSuffix).val()
            , pValidity: RoutingSuffix == "CustomsClearance" || $("#txtRoutingValidity" + RoutingSuffix).val().trim() == "" ? 0 : $("#txtRoutingValidity" + RoutingSuffix).val()
            , pFreeTime: RoutingSuffix == "CustomsClearance" || $("#txtRoutingFreeTime" + RoutingSuffix).val().trim() == "" ? 0 : $("#txtRoutingFreeTime" + RoutingSuffix).val()
            , pNotes: $("#txtRoutingNotes" + RoutingSuffix).val().trim()

            , pGensetSupplierID: RoutingSuffix == "CustomsClearance" || $("#slTruckingOrderGensetSupplier" + RoutingSuffix).val() == "" ? 0 : $("#slTruckingOrderGensetSupplier" + RoutingSuffix).val()
            , pCCAID: $("#slRoutingCCA" + RoutingSuffix).val() == "" ? 0 : $("#slRoutingCCA" + RoutingSuffix).val()
            , pQuantity: RoutingSuffix == "CustomsClearance" || $("#txtTruckingOrderQuantity" + RoutingSuffix).val().trim() == "" ? 0 : $("#txtTruckingOrderQuantity" + RoutingSuffix).val().trim().toUpperCase()
            , pContactPerson: RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckingOrderContactPerson" + RoutingSuffix).val().trim().toUpperCase()
            , pTruckingOrderPickupAddress: RoutingSuffix == "CustomsClearance" || $("#txtTruckingOrderPickupAddress" + RoutingSuffix).val().trim().toUpperCase()
            , pTruckingOrderDeliveryAddress: RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckingOrderDeliveryAddress" + RoutingSuffix).val().trim().toUpperCase()
            , pGateInPortID: RoutingSuffix == "CustomsClearance" || $("#slTruckingOrderGateInPort" + RoutingSuffix).val() == "" || $("#slTruckingOrderGateInPort" + RoutingSuffix).val() == null ? 0 : $("#slTruckingOrderGateInPort" + RoutingSuffix).val()
            , pGateOutPortID: RoutingSuffix == "CustomsClearance" || $("#slTruckingOrderGateOutPort" + RoutingSuffix).val() == "" || $("#slTruckingOrderGateOutPort" + RoutingSuffix).val() == null ? 0 : $("#slTruckingOrderGateOutPort" + RoutingSuffix).val()
            , pGateInDate: (RoutingSuffix == "CustomsClearance" || $("#txtTruckingOrderGateInDate" + RoutingSuffix).val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTruckingOrderGateInDate" + RoutingSuffix).val()))
            /****************************TransportOrder**************************/
            , pCustomerID: $("#slCustomer").val() == "" ? 0 : $("#slCustomer").val()
            , pSubContractedCustomerID: 0
            , pCost: $("#txtCost").val() == "" ? 0 : $("#txtCost").val()
            , pSale: $("#txtSale").val() == "" ? 0 : $("#txtSale").val()
            , pIsFleet: (glbCallingControl == "FleetTransportOrder" || glbCallingControl == "FleetTransportOrderSupplier" ? true : false)
            , pCommodityID: $("#slCommodity").val() == "" ? 0 : $("#slCommodity").val()
            , pLoadingDate: ($("#txtLoadingDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtLoadingDate").val()))
            , pLoadingReference: $("#txtLoadingReference").val().trim() == "" ? 0 : $("#txtLoadingReference").val().trim().toUpperCase()
            , pUnloadingDate: ($("#txtUnloadingDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtUnloadingDate").val()))
            , pUnloadingReference: $("#txtUnloadingReference").val().trim() == "" ? 0 : $("#txtUnloadingReference").val().trim().toUpperCase()
            , pUnloadingTime: $("#txtUnloadingTime").val().trim() == "" ? 0 : $("#txtUnloadingTime").val().trim().toUpperCase()
            , pQuotationRouteID: $("#slQuotationRoute").val() == "" ? 0 : $("#slQuotationRoute").val()
            /****************************TransportOrder**************************/
            , pGateOutDate: (RoutingSuffix == "CustomsClearance" || $("#txtTruckingOrderGateOutDate" + RoutingSuffix).val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTruckingOrderGateOutDate" + RoutingSuffix).val()))
            , pStuffingDate: (RoutingSuffix == "CustomsClearance" || $("#txtTruckingOrderStuffingDate" + RoutingSuffix).val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTruckingOrderStuffingDate" + RoutingSuffix).val()))
            , pDeliveryDate: (RoutingSuffix == "CustomsClearance" || $("#txtTruckingOrderDeliveryDate" + RoutingSuffix).val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTruckingOrderDeliveryDate" + RoutingSuffix).val()))
            , pBookingNumber: RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckingOrderBookingNumber" + RoutingSuffix).val().trim().toUpperCase()
            , pDelays: RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckingOrderDelays" + RoutingSuffix).val().trim().toUpperCase()
            , pDriverName: ($("#cbIsOwnedByCompany").prop("checked") || RoutingSuffix == "CustomsClearance") ? 0 : $("#txtTruckingOrderDriverName" + RoutingSuffix).val().trim().toUpperCase()
            , pDriverPhones: ($("#cbIsOwnedByCompany").prop("checked") || RoutingSuffix == "CustomsClearance") ? 0 : $("#txtTruckingOrderDriverPhones" + RoutingSuffix).val().trim().toUpperCase()
            , pPowerFromGateInTillActualSailing: RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckingOrderPowerFromGateInTillActualSailing" + RoutingSuffix).val().trim().toUpperCase()

            , pContactPersonPhones: RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckingOrderContactPersonPhones" + RoutingSuffix).val().trim().toUpperCase()
            , pLoadingTime: RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckingOrderLoadingTime" + RoutingSuffix).val().trim().toUpperCase()

            , pCCAFreight: RoutingSuffix != "CustomsClearance" || $("#txtCCAFreight").val().trim() == "" ? 0 : $("#txtCCAFreight").val().trim().toUpperCase()
            , pCCAFOB: RoutingSuffix != "CustomsClearance" || $("#txtCCAFOB").val().trim() == "" ? 0 : $("#txtCCAFOB").val().trim().toUpperCase()
            , pCCACFValue: RoutingSuffix != "CustomsClearance" || $("#txtCCACFValue").val().trim() == "" ? 0 : $("#txtCCACFValue").val().trim().toUpperCase()
            , pCCAInvoiceNumber: RoutingSuffix != "CustomsClearance" || $("#txtCCAInvoiceNumber").val().trim() == "" ? 0 : $("#txtCCAInvoiceNumber").val().trim().toUpperCase()

            , pCCAInsurance: RoutingSuffix != "CustomsClearance" || $("#txtCCAInsurance").val().trim() == "" ? 0 : $("#txtCCAInsurance").val().trim().toUpperCase()
            , pCCADischargeValue: RoutingSuffix != "CustomsClearance" || $("#txtCCADischargeValue").val().trim() == "" ? 0 : $("#txtCCADischargeValue").val().trim().toUpperCase()
            , pCCAAcceptedValue: RoutingSuffix != "CustomsClearance" || $("#txtCCAAcceptedValue").val().trim() == "" ? 0 : $("#txtCCAAcceptedValue").val().trim().toUpperCase()
            , pCCAImportValue: RoutingSuffix != "CustomsClearance" || $("#txtCCAImportValue").val().trim() == "" ? 0 : $("#txtCCAImportValue").val().trim().toUpperCase()
            , pCCADocumentReceiveDate: (RoutingSuffix != "CustomsClearance" || $("#txtCCADocumentReceiveDate").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtCCADocumentReceiveDate").val().trim()))
            , pCCAExchangeRate: RoutingSuffix != "CustomsClearance" || $("#txtCCAExchangeRate").val().trim() == "" ? 0 : $("#txtCCAExchangeRate").val().trim().toUpperCase()
            , pCCAVATCertificateNumber: RoutingSuffix != "CustomsClearance" || $("#txtCCAVATCertificateNumber").val().trim() == "" ? 0 : $("#txtCCAVATCertificateNumber").val().trim().toUpperCase()
            , pCCAVATCertificateValue: RoutingSuffix != "CustomsClearance" || $("#txtCCAVATCertificateValue").val().trim() == "" ? 0 : $("#txtCCAVATCertificateValue").val().trim().toUpperCase()
            , pCCACommercialProfitCertificateNumber: RoutingSuffix != "CustomsClearance" || $("#txtCCACommercialProfitCertificateNumber").val().trim() == "" ? 0 : $("#txtCCACommercialProfitCertificateNumber").val().trim().toUpperCase()
            , pCCAWindowFees: RoutingSuffix != "CustomsClearance" || $("#txtCCAWindowFees").val().trim() == "" ? 0 : $("#txtCCAWindowFees").val().trim().toUpperCase()
            , pCCAStorageFees: RoutingSuffix != "CustomsClearance" || $("#txtCCAStorageFees").val().trim() == "" ? 0 : $("#txtCCAStorageFees").val().trim().toUpperCase()
            , pCCACommercialProfitTax: RoutingSuffix != "CustomsClearance" || $("#txtCCACommercialProfitTax").val().trim() == "" ? 0 : $("#txtCCACommercialProfitTax").val().trim().toUpperCase()
            , pCCACustomsValue: RoutingSuffix != "CustomsClearance" || $("#txtCCACustomsValue").val().trim() == "" ? 0 : $("#txtCCACustomsValue").val().trim().toUpperCase()
            , pCCAQuotedValue: RoutingSuffix != "CustomsClearance" || $("#txtCCAQuotedValue").val().trim() == "" ? 0 : $("#txtCCAQuotedValue").val().trim().toUpperCase()
            , pCCAContractType: RoutingSuffix != "CustomsClearance" || $("#txtCCAContractType").val().trim() == "" ? 0 : $("#txtCCAContractType").val().trim().toUpperCase()
            , pCCAOthers: RoutingSuffix != "CustomsClearance" || $("#txtCCAOthers").val().trim() == "" ? 0 : $("#txtCCAOthers").val().trim().toUpperCase()
            , pCCASpendDate: (RoutingSuffix != "CustomsClearance" || $("#txtCCASpendDate").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtCCASpendDate").val().trim()))

            , pCertificateNumber: RoutingSuffix != "CustomsClearance" || $("#txtCertificateNumber").val().trim() == "" ? 0 : $("#txtCertificateNumber").val().trim().toUpperCase()
            , pCertificateValue: RoutingSuffix != "CustomsClearance" || $("#txtCertificateValue").val().trim() == "" ? 0 : $("#txtCertificateValue").val().trim().toUpperCase()
            , pCertificateDate: (RoutingSuffix != "CustomsClearance" || $("#txtCertificateDate").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtCertificateDate").val().trim()))
            , pQasimaNumber: RoutingSuffix != "CustomsClearance" || $("#txtQasimaNumber").val().trim() == "" ? 0 : $("#txtQasimaNumber").val().trim().toUpperCase()
            , pQasimaDate: (RoutingSuffix != "CustomsClearance" || $("#txtQasimaDate").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtQasimaDate").val().trim()))
            , pSalesDateReceived: (RoutingSuffix != "CustomsClearance" || $("#txtSalesDateReceived").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtSalesDateReceived").val().trim()))
            , pCommerceDateReceived: (RoutingSuffix != "CustomsClearance" || $("#txtCommerceDateReceived").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtCommerceDateReceived").val().trim()))
            , pInspectionDateReceived: (RoutingSuffix != "CustomsClearance" || $("#txtInspectionDateReceived").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtInspectionDateReceived").val().trim()))
            , pFinishDateReceived: (RoutingSuffix != "CustomsClearance" || $("#txtFinishDateReceived").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtFinishDateReceived").val().trim()))
            , pSalesDateDelivered: (RoutingSuffix != "CustomsClearance" || $("#txtSalesDateDelivered").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtSalesDateDelivered").val().trim()))
            , pCommerceDateDelivered: (RoutingSuffix != "CustomsClearance" || $("#txtCommerceDateDelivered").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtCommerceDateDelivered").val().trim()))
            , pInspectionDateDelivered: (RoutingSuffix != "CustomsClearance" || $("#txtInspectionDateDelivered").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtInspectionDateDelivered").val().trim()))
            , pFinishDateDelivered: (RoutingSuffix != "CustomsClearance" || $("#txtFinishDateDelivered").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtFinishDateDelivered").val().trim()))

            , pRoadNumber: "0" //Insert is never main route
            , pDeliveryOrderNumber: "0" //Insert is never main route
            , pWareHouse: "0" //Insert is never main route
            , pWareHouseLocation: "0" //Insert is never main route


            , pIsOwnedByCompany: $("#cbIsOwnedByCompany").prop("checked")
            , pTrailerID: ($("#slTrailer" + RoutingSuffix).val() == "" ? 0 : $("#slTrailer" + RoutingSuffix).val()) //(!$("#cbIsOwnedByCompany").prop("checked") || $("#slTrailer" + RoutingSuffix).val() == "" ? 0 : $("#slTrailer" + RoutingSuffix).val())
            , pDriverID: (!$("#cbIsOwnedByCompany").prop("checked") || $("#slDriver" + RoutingSuffix).val() == "" ? 0 : $("#slDriver" + RoutingSuffix).val())
            , pDriverAssistantID: (!$("#cbIsOwnedByCompany").prop("checked") || $("#slDriverAssistant" + RoutingSuffix).val() == "" ? 0 : $("#slDriverAssistant" + RoutingSuffix).val())
            , pEquipmentID: $("#slEquipment" + RoutingSuffix).val() == "" ? 0 : $("#slEquipment" + RoutingSuffix).val()
            , pLoadingZoneID: $("#slRoutingsLoadingZone" + RoutingSuffix).val() == "" ? 0 : $("#slRoutingsLoadingZone" + RoutingSuffix).val()
            , pFirstCuringAreaID: $("#slRoutingsFirstCuringArea" + RoutingSuffix).val() == "" ? 0 : $("#slRoutingsFirstCuringArea" + RoutingSuffix).val()
            , pSecondCuringAreaID: $("#slRoutingsSecondCuringArea" + RoutingSuffix).val() == "" ? 0 : $("#slRoutingsSecondCuringArea" + RoutingSuffix).val()
            , pThirdCuringAreaID: $("#slRoutingsThirdCuringArea" + RoutingSuffix).val() == "" ? 0 : $("#slRoutingsThirdCuringArea" + RoutingSuffix).val()
            , pBillNumber: RoutingSuffix == "CustomsClearance" ? 0 : $("#txtBillNumber" + RoutingSuffix).val().trim().toUpperCase()
            , pTruckingOrderCode: ''
            , pTruckCounter: RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckCounter" + RoutingSuffix).val().trim() == "" ? 0 : $("#txtTruckCounter" + RoutingSuffix).val().trim()
            , pCargoReturnGrossWeight: RoutingSuffix == "CustomsClearance" ? 0 : $("#txtCargoReturnGrossWeight" + RoutingSuffix).val().trim() == "" ? 0 : $("#txtCargoReturnGrossWeight" + RoutingSuffix).val().trim()
            , pOffloadingDate: "01/01/1900"
            , pLastTruckCounter: RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckLastCounter" + RoutingSuffix).val().trim() == "" ? 0 : $("#txtTruckLastCounter" + RoutingSuffix).val().trim()
            , pMaxSupplierContainers: 0

            , pCCAllowTemporaryDelivered: "01/01/1900"
            , pCCAllowTemporaryReceived: "01/01/1900"
            , pCCDropBackDelivered: "01/01/1900"
            , pCCDropBackReceived: "01/01/1900"
            , pCC_ClearanceTypeID: 0
            , pCCReleaseNo: 0
        };
        CallPOSTFunctionWithParameters("/api/Routings/Insert", pParametersWithValues
            , function (pData) {
                var pSavedRoute = JSON.parse(pData[0]);
                var pRoutings = JSON.parse(pData[1]);
                var pPayables = JSON.parse(pData[2]);
                Payables_BindTableRows(pPayables);
                // TruckingOrders_BindTableRows(pRoutings);
                //set lblRouting,..... incase of changing MainCarraige Type
                //if ($("#slRoutingTypes" + RoutingSuffix + " option:selected").val() == MainCarraigeRoutingTypeID) {
                //    $("#lblRouting" + RoutingSuffix).html(" : " + $("#slRoutingsPOL" + RoutingSuffix + " option:selected").text() + " > " + $("#slRoutingsPOD" + RoutingSuffix + " option:selected").text());
                //    $("#hPOLCountryID" + RoutingSuffix).val($('#slRoutingsPOLCountries' + RoutingSuffix + ' option:selected').val());
                //    $("#hPODCountryID" + RoutingSuffix).val($('#slRoutingsPODCountries' + RoutingSuffix + ' option:selected').val());
                //    $("#hPOL").val($('#slRoutingsPOL' + RoutingSuffix + ' option:selected').val());
                //    $("#hPOD").val($('#slRoutingsPOD' + RoutingSuffix + ' option:selected').val());
                //    $("#hShippingLineID").val($("#hRoutingTransportType" + RoutingSuffix).val() == OceanTransportType ? $('#slRoutingsLines' + RoutingSuffix + ' option:selected').val() : 0);
                //    $("#hAirlineID").val($("#hRoutingTransportType" + RoutingSuffix).val() == AirTransportType ? $("#slRoutingsLines" + RoutingSuffix).val() : 0);
                //    $("#hTruckerID").val($("#hRoutingTransportType" + RoutingSuffix).val() == InlandTransportType ? $("#slRoutingsLines" + RoutingSuffix).val() : 0);
                //}
                $("#hRoutingID" + RoutingSuffix).val(pSavedRoute.ID);
                $("#btnSaveRoutingTruckingOrder").attr("onclick", "Routings_Update(false);");
                if (RoutingSuffix != "CustomsClearance" && RoutingSuffix != "TruckingOrder")
                    jQuery("#" + "RoutingModal" + RoutingSuffix).modal("hide");
                $("#txtCodeTruckingOrder").val(pSavedRoute.TruckingOrderCode);
                $("#hID").val(pSavedRoute.ID);

                FadePageCover(false);
                TruckingOrders_LoadingWithPaging(true/*pCancelFadePageCover*/);

                //if (pCallback != null && pCallback != undefined) //in case trying to add payables before saving header, i save header and in case of success i call Payables_GetAvailableCharges()
                //    pCallback();
                //else
                swal("Success", "Saved successfully,");
            }
            , null);
    }
}
function Save_FleetDistribution(pSaveandAddNew) {
    debugger;
    if (glbCallingControl == "FleetTransportOrder"
        && $("#slQuotationRoute option:selected").attr("EquipmentModelID") != undefined
        && $("#slQuotationRoute option:selected").attr("EquipmentModelID") != 0
        && $("#slEquipmentTruckingOrder option:selected").attr("EquipmentModelID") != undefined
        && $("#slEquipmentTruckingOrder option:selected").attr("EquipmentModelID") != 0
        && $("#slQuotationRoute option:selected").attr("EquipmentModelID") != $("#slEquipmentTruckingOrder option:selected").attr("EquipmentModelID")
    )
        swal("Sorry", "The equipment you chose is not the same model as the route contract.");
    else if ((glbCallingControl != "FleetTransportOrder" && glbCallingControl != "FleetTransportOrderSupplier")
        && ($("#slRoutingsLoadingZoneTruckingOrder").val() == null || $("#slRoutingsFirstCuringAreaTruckingOrder").val() == null
            || $("#slTruckingOrderGateInPortTruckingOrder").val() == null
            || $("#slTruckingOrderGateOutPortTruckingOrder").val() == null)
    ) {
        var ErrorMsg = '';
        if ($("#slRoutingsLoadingZoneTruckingOrder").val() == null)
            ErrorMsg = 'Choose Loading Zone ';
        if ($("#slRoutingsFirstCuringAreaTruckingOrder").val() == null)
            ErrorMsg = 'Choose First Curing Area ';
        if ($("#slTruckingOrderGateInPortTruckingOrder").val() == null)
            ErrorMsg = 'Choose Gate In Port ';
        if ($("#slTruckingOrderGateOutPortTruckingOrder").val() == null)
            ErrorMsg = 'Choose Gate Out Port ';

        swal(strSorry, ErrorMsg);
    }
    else if (pDefaults.UnEditableCompanyName == "GBL" //Capital asked for that request then asked to cancel it
        && (glbCallingControl == "TruckingOrdersOwnFleet" || glbCallingControl == "FleetTransportOrder")
        && parseFloat(IsNull($("#txtTruckCounterTruckingOrder").val(), 99999999)) < parseFloat(IsNull($("#txtTruckLastCounterTruckingOrder").val(), 0))
    ) {
        swal("Sorry", "Please, check the kilometeres.");
    }
    else if (ValidateForm("form", "RoutingModalTruckingOrder")) {
        FadePageCover(true);
        var pParametersWithValues = {
            pID_FleetSave: $("#hRoutingIDTruckingOrder").val()
            , pOperationID: $("#hOperationID").val()
            , pRoutingTypeID: TruckingOrderRoutingTypeID //$('#slRoutingTypesTruckingOrder option:selected').val()
            , pTransportTypeID: InlandTransportType //$("#hRoutingTransportTypeTruckingOrder").val()
            , pTransportIconName: InlandIconName //$("#hRoutingTransportIconNameTruckingOrder").val()
            , pTransportIconStyle: strInlandIconStyleClassName //$("#hRoutingTransportIconStyleTruckingOrder").val()

            , pPOLCountryID: $('#slRoutingsPOLCountriesTruckingOrder option:selected').val()
            , pPODCountryID: $('#slRoutingsPODCountriesTruckingOrder option:selected').val()
            , pPOLID: $('#slRoutingsPOLTruckingOrder option:selected').val()
            , pPODID: $('#slRoutingsPODTruckingOrder option:selected').val()

            , pTruckerID: ($('#slRoutingsLinesTruckingOrder option:selected').val() == "" ? 0 : $('#slRoutingsLinesTruckingOrder option:selected').val())

            , pVoyageOrTruckNumber: ($("#cbIsOwnedByCompany").prop("checked") || $("#txtRoutingVoyageOrTruckNumberTruckingOrder").val().trim() == "" ? "0" : $("#txtRoutingVoyageOrTruckNumberTruckingOrder").val().trim().toUpperCase())
            , pCustomerWarehouseMangerName: ($("#txtRoutingpCustomerWarehouseManagerName").val().trim() == "" ? "0" : $("#txtRoutingpCustomerWarehouseManagerName").val().trim().toUpperCase())
            , pTruckingEquipmentID: $('#slRoutingTypes' + RoutingSuffix + ' option:selected').val()
            , PCustomerWarehouseMangerPhone: ($("#txtRoutingpCustomerWarehouseManagerPhone").val().trim() == "" ? "0" : $("#txtRoutingpCustomerWarehouseManagerPhone").val().trim().toUpperCase())
            , pTransientTime: $("#txtRoutingTransientTimeTruckingOrder").val().trim() == "" ? 0 : $("#txtRoutingTransientTimeTruckingOrder").val()
            , pValidity: $("#txtRoutingValidityTruckingOrder").val().trim() == "" ? 0 : $("#txtRoutingValidityTruckingOrder").val()
            , pFreeTime: $("#txtRoutingFreeTimeTruckingOrder").val().trim() == "" ? 0 : $("#txtRoutingFreeTimeTruckingOrder").val()
            , pNotes: $("#txtRoutingNotesTruckingOrder").val().trim() == "" ? 0 : $("#txtRoutingNotesTruckingOrder").val().trim().toUpperCase()

            , pQuantity: $("#txtTruckingOrderQuantityTruckingOrder").val().trim() == "" ? 0 : $("#txtTruckingOrderQuantityTruckingOrder").val().trim().toUpperCase()
            , pTruckingOrderPickupAddress: $("#txtTruckingOrderPickupAddressTruckingOrder").val().trim() == "" ? 0 : $("#txtTruckingOrderPickupAddressTruckingOrder").val().trim().toUpperCase()
            , pTruckingOrderDeliveryAddress: $("#txtTruckingOrderPickupAddressTruckingOrder").val().trim() == "" ? 0 : $("#txtTruckingOrderDeliveryAddressTruckingOrder").val().trim().toUpperCase()
            , pGateInPortID: $("#slTruckingOrderGateInPortTruckingOrder").val().trim() == "" || $("#slTruckingOrderGateInPortTruckingOrder").val() == null ? 0 : $("#slTruckingOrderGateInPortTruckingOrder").val()
            , pGateOutPortID: $("#slTruckingOrderGateOutPortTruckingOrder").val().trim() == "" || $("#slTruckingOrderGateOutPortTruckingOrder").val() == null ? 0 : $("#slTruckingOrderGateOutPortTruckingOrder").val()
            , pGateInDate: ($("#txtTruckingOrderGateInDateTruckingOrder").val().trim() == "" ? "0" : $("#txtTruckingOrderGateInDateTruckingOrder").val())
            /****************************TransportOrder**************************/
            , pCustomerID: $("#slCustomer").val() == "" ? 0 : $("#slCustomer").val()
            , pCost: $("#txtCost").val() == "" ? 0 : $("#txtCost").val()
            , pSale: $("#txtSale").val() == "" ? 0 : $("#txtSale").val()
            , pIsFleet: (glbCallingControl == "FleetTransportOrder" || glbCallingControl == "FleetTransportOrderSupplier" ? true : false)
            , pCommodityID: $("#slCommodity").val() == "" ? 0 : $("#slCommodity").val()
            , pLoadingDate: ($("#txtLoadingDate").val() == "" ? "0" : $("#txtLoadingDate").val())
            , pLoadingReference: $("#txtLoadingReference").val().trim() == "" ? 0 : $("#txtLoadingReference").val().trim().toUpperCase()
            , pUnloadingDate: ($("#txtUnloadingDate").val() == "" ? "0" : $("#txtUnloadingDate").val())
            , pUnloadingReference: $("#txtUnloadingReference").val().trim() == "" ? 0 : $("#txtUnloadingReference").val().trim().toUpperCase()
            , pUnloadingTime: $("#txtUnloadingTime").val().trim() == "" ? 0 : $("#txtUnloadingTime").val().trim().toUpperCase()
            , pQuotationRouteID: $("#slQuotationRoute").val() == "" ? 0 : $("#slQuotationRoute").val()
            /****************************TransportOrder**************************/
            , pGateOutDate: ($("#txtTruckingOrderGateOutDateTruckingOrder").val().trim() == "" ? "0" : $("#txtTruckingOrderGateOutDateTruckingOrder").val())
            , pStuffingDate: ($("#txtTruckingOrderStuffingDateTruckingOrder").val().trim() == "" ? "0" : $("#txtTruckingOrderStuffingDateTruckingOrder").val())
            , pBookingNumber: $("#txtTruckingOrderBookingNumberTruckingOrder").val().trim() == "" ? 0 : $("#txtTruckingOrderBookingNumberTruckingOrder").val().trim().toUpperCase()
            , pDelays: RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckingOrderDelaysTruckingOrder").val().trim().toUpperCase()
            , pDriverName: $("#cbIsOwnedByCompany").prop("checked") ? 0 : $("#txtTruckingOrderDriverNameTruckingOrder").val().trim().toUpperCase()
   /*         , pCustomerWarehouseMangerName: $("#txtRoutingpCustomerWarehouseManagerNameTruckingOrder").prop("checked") ? 0 : $("#txtRoutingpCustomerWarehouseManagerNameTruckingOrder").val().trim().toUpperCase()*/

            , pDriverPhones: $("#cbIsOwnedByCompany").prop("checked") ? 0 : $("#txtTruckingOrderDriverPhonesTruckingOrder").val().trim().toUpperCase()
            , pPowerFromGateInTillActualSailing: $("#txtTruckingOrderPowerFromGateInTillActualSailingTruckingOrder").val().trim() == "" ? 0 : $("#txtTruckingOrderPowerFromGateInTillActualSailingTruckingOrder").val().trim().toUpperCase()    

            , pLoadingTime: $("#txtTruckingOrderLoadingTimeTruckingOrder").val().trim() == "" ? 0 : $("#txtTruckingOrderLoadingTimeTruckingOrder").val().trim().toUpperCase()

            , pIsOwnedByCompany: $("#cbIsOwnedByCompany").prop("checked")
            , pTrailerID: ($("#slTrailerTruckingOrder").val() == "" ? 0 : $("#slTrailerTruckingOrder").val()) //(!$("#cbIsOwnedByCompany").prop("checked") || $("#slTrailerTruckingOrder").val() == "" ? 0 : $("#slTrailerTruckingOrder").val())
            , pDriverID: (!$("#cbIsOwnedByCompany").prop("checked") || $("#slDriverTruckingOrder").val() == "" ? 0 : $("#slDriverTruckingOrder").val())
            , pDriverAssistantID: (!$("#cbIsOwnedByCompany").prop("checked") || $("#slDriverAssistantTruckingOrder").val() == "" ? 0 : $("#slDriverAssistantTruckingOrder").val())
            , pEquipmentID: $("#slEquipmentTruckingOrder").val() == "" ? 0 : $("#slEquipmentTruckingOrder").val()
            , pLoadingZoneID: $("#slRoutingsLoadingZoneTruckingOrder").val() == "" ? 0 : $("#slRoutingsLoadingZoneTruckingOrder").val()
            , pFirstCuringAreaID: $("#slRoutingsFirstCuringAreaTruckingOrder").val() == "" ? 0 : $("#slRoutingsFirstCuringAreaTruckingOrder").val()
            , pSecondCuringAreaID: $("#slRoutingsSecondCuringAreaTruckingOrder").val() == "" ? 0 : $("#slRoutingsSecondCuringAreaTruckingOrder").val()
            , pThirdCuringAreaID: $("#slRoutingsThirdCuringAreaTruckingOrder").val() == "" ? 0 : $("#slRoutingsThirdCuringAreaTruckingOrder").val()
            , pBillNumber: $("#txtBillNumberTruckingOrder").val().trim() == "" ? 0 : $("#txtBillNumberTruckingOrder").val().trim().toUpperCase()
            , pTruckingOrderCode: $("#txtCodeTruckingOrder").val().trim() == "" ? "0" : $("#txtCodeTruckingOrder").val().trim().toUpperCase()
            , pTruckCounter: $("#txtTruckCounterTruckingOrder").val().trim() == "" ? 0 : $("#txtTruckCounterTruckingOrder").val().trim()
            , pCargoReturnGrossWeight: $("#txtCargoReturnGrossWeightTruckingOrder").val().trim() == "" ? 0 : $("#txtCargoReturnGrossWeightTruckingOrder").val().trim()
            , pLastTruckCounter: $("#txtTruckLastCounterTruckingOrder").val().trim() == "" ? 0 : $("#txtTruckLastCounterTruckingOrder").val().trim()
        };
        CallPOSTFunctionWithParameters("/api/Routings/Save_FleetDistribution", pParametersWithValues
            , function (pData) {
                var _ReturnedMessage = pData[1];
                var pSavedRoute = JSON.parse(pData[2]);
                if (pData[1] != "") //pData[1]: is a message returned from controller in case of change in another session that prevents saving main route
                    swal(strSorry, _ReturnedMessage);
                else {
                    $('#btn-PrintTruckingOrder').prop('disabled', false);

                    $("#hRoutingID" + RoutingSuffix).val(pSavedRoute.ID);

                    if (glbCallingControl != "FleetTransportOrder" && glbCallingControl != "FleetTransportOrderSupplier") {
                        var pIDList = "";
                        var pSNList = "";
                        var pIssueDateList = "";
                        var pSLList = "";
                        var pBookingNoList = "";
                        var pPORTList = "";
                        var pWHList = "";
                        var pSizeList = "";
                        var pContainerNOList = "";
                        var pDriverNameList = "";
                        var pPhoneList = "";
                        var pTruckNoList = "";
                        var pLocationList = "";
                        var pSealNoList = "";
                        var pReleaseDateList = "";
                        var pArrivalDateList = "";
                        var pReturnDateList = "";
                        var pPort2List = "";
                        var pStatusNameList = "";
                        var pTruckerList = "";
                        var pTypeNameList = "";
                        var pNotesList = "";
                        var pTareWeightList = "";
                        var pNetWeightList = "";
                        var pGrossWeightList = "";

                        var pOperationNOList = "";
                        var pFactoryList = "";
                        var pCustomLOCList = "";
                        var pTruckWeightList = "";
                        var pFactoryGateOutList = "";
                        var pPODList = "";
                        var pInvoiceList = "";

                        var pFGODateList = "";

                        var pReleaseTimeList = "";
                        var pArrivalTimeList = "";
                        var pReturnTimeList = "";
                        var pFGOTimeList = "";

                        /*****************************Collecting Details Data*************************************/
                        var pDetailsIDList = GetAllIDsAsStringWithNameAttr("tblDetails", "Delete");
                        var pDetailsID = '';
                        debugger;
                        $("#tblDetails tbody tr").each(function () {
                            pDetailsID += ((pDetailsID == "") ? "" : ",") + ($(this).attr('ID'));
                        });

                        if (pDetailsIDList != "") {
                            var NumberOfDetailsRows = pDetailsIDList.split(',').length;
                            for (var i = 0; i < NumberOfDetailsRows; i++) {
                                var currentRowID = pDetailsID.split(",")[i];

                                pIDList += ((pIDList == "") ? "" : ",") + pDetailsIDList.split(",")[i];
                                pSNList += ((pSNList == "") ? "" : ",") + ($("#txtSN" + currentRowID).val().trim() == "" ? "0" : $("#txtSN" + currentRowID).val());
                                pIssueDateList += ((pIssueDateList == "") ? "" : ",") + ($("#txtIssueDate" + currentRowID).val().trim() != "" ? ConvertDateFormat($("#txtIssueDate" + currentRowID).val()) : "0");

                                pSLList += ((pSLList == "") ? "" : ",") + $("#txtSL" + currentRowID).val();
                                pBookingNoList += ((pBookingNoList == "") ? "" : ",") + $("#txtBookingNo" + currentRowID).val();
                                pPORTList += ((pPORTList == "") ? "" : ",") + $("#txtPORT" + currentRowID).val();
                                pWHList += ((pWHList == "") ? "" : ",") + $("#txtWH" + currentRowID).val();
                                pSizeList += ((pSizeList == "") ? "" : ",") + $("#txtSize" + currentRowID).val();
                                pContainerNOList += ((pContainerNOList == "") ? "" : ",") + $("#txtContainerNO" + currentRowID).val();
                                pDriverNameList += ((pDriverNameList == "") ? "" : ",") + $("#txtDriverName" + currentRowID).val();
                                pPhoneList += ((pPhoneList == "") ? "" : ",") + $("#txtPhone" + currentRowID).val();
                                pTruckNoList += ((pTruckNoList == "") ? "" : ",") + $("#txtTruckNo" + currentRowID).val();
                                pLocationList += ((pLocationList == "") ? "" : ",") + $("#txtLocation" + currentRowID).val();
                                pSealNoList += ((pSealNoList == "") ? "" : ",") + $("#txtSealNo" + currentRowID).val();
                                pReleaseDateList += ((pReleaseDateList == "") ? "" : ",") + ($("#txtReleaseDate" + currentRowID).val().trim() != "" ? ConvertDateFormat($("#txtReleaseDate" + currentRowID).val()) : "0");
                                pArrivalDateList += ((pArrivalDateList == "") ? "" : ",") + ($("#txtArrivalDate" + currentRowID).val().trim() != "" ? ConvertDateFormat($("#txtArrivalDate" + currentRowID).val()) : "0");
                                pReturnDateList += ((pReturnDateList == "") ? "" : ",") + ($("#txtReturnDate" + currentRowID).val().trim() != "" ? ConvertDateFormat($("#txtReturnDate" + currentRowID).val()) : "0");
                                pPort2List += ((pPort2List == "") ? "" : ",") + $("#txtPort2" + currentRowID).val();
                                pStatusNameList += ((pStatusNameList == "") ? "" : ",") + $("#txtStatusName" + currentRowID).val();
                                pTruckerList += ((pTruckerList == "") ? "" : ",") + $("#txtTrucker" + currentRowID).val();
                                pTypeNameList += ((pTypeNameList == "") ? "" : ",") + $("#txtTypeName" + currentRowID).val();
                                pNotesList += ((pNotesList == "") ? "" : ",") + $("#txtNotes" + currentRowID).val();
                                pTareWeightList += ((pTareWeightList == "") ? "" : ",") + ($("#txtTareWeight" + currentRowID).val() == "" ? 0 : $("#txtTareWeight" + currentRowID).val());
                                pNetWeightList += ((pNetWeightList == "") ? "" : ",") + ($("#txtNetWeight" + currentRowID).val() == "" ? 0 : $("#txtNetWeight" + currentRowID).val());
                                pGrossWeightList += ((pGrossWeightList == "") ? "" : ",") + ($("#txtGrossWeight" + currentRowID).val() == "" ? 0 : $("#txtGrossWeight" + currentRowID).val());

                                pOperationNOList += ((pOperationNOList == "") ? "" : ",") + $("#txtOperationNO" + currentRowID).val();
                                pFactoryList += ((pFactoryList == "") ? "" : ",") + $("#txtFactory" + currentRowID).val();
                                pCustomLOCList += ((pCustomLOCList == "") ? "" : ",") + $("#txtCustomLOC" + currentRowID).val();
                                pTruckWeightList += ((pTruckWeightList == "") ? "" : ",") + $("#txtTruckWeight" + currentRowID).val();
                                pFactoryGateOutList += ((pFactoryGateOutList == "") ? "" : ",") + $("#txtFactoryGateOut" + currentRowID).val();
                                pPODList += ((pPODList == "") ? "" : ",") + $("#txtPOD" + currentRowID).val();
                                pInvoiceList += ((pInvoiceList == "") ? "" : ",") + $("#txtInvoice" + currentRowID).val();

                                pFGODateList += ((pFGODateList == "") ? "" : ",") + ($("#txtFGODate" + currentRowID).val().trim() != "" ? ConvertDateFormat($("#txtFGODate" + currentRowID).val()) : "0");

                                pReleaseTimeList += ((pReleaseTimeList == "") ? "" : ",") + ($("#txtReleaseTime" + currentRowID).val().trim() == "" ? "0" : $("#txtReleaseTime" + currentRowID).val());
                                pArrivalTimeList += ((pArrivalTimeList == "") ? "" : ",") + ($("#txtArrivalTime" + currentRowID).val().trim() == "" ? "0" : $("#txtArrivalTime" + currentRowID).val());
                                pReturnTimeList += ((pReturnTimeList == "") ? "" : ",") + ($("#txtReturnTime" + currentRowID).val().trim() == "" ? "0" : $("#txtReturnTime" + currentRowID).val());
                                pFGOTimeList += ((pFGOTimeList == "") ? "" : ",") + ($("#txtFGOTime" + currentRowID).val().trim() == "" ? "0" : $("#txtFGOTime" + currentRowID).val());

                            }
                        }
                        var pParametersWithValues = {
                            //Details
                            pRoutingID: pSavedRoute.ID
                            , pIDList
                            , pSNList: pSNList
                            , pIssueDateList: pIssueDateList
                            , pSLList: pSLList
                            , pBookingNoList: pBookingNoList
                            , pPORTList: pPORTList
                            , pWHList: pWHList
                            , pSizeList: pSizeList
                            , pContainerNOList: pContainerNOList
                            , pDriverNameList: pDriverNameList
                            , pPhoneList: pPhoneList
                            , pTruckNoList: pTruckNoList
                            , pLocationList: pLocationList
                            , pSealNoList: pSealNoList
                            , pReleaseDateList: pReleaseDateList
                            , pArrivalDateList: pArrivalDateList
                            , pReturnDateList: pReturnDateList
                            , pPort2List: pPort2List
                            , pStatusNameList: pStatusNameList
                            , pTruckerList: pTruckerList
                            , pTypeNameList: pTypeNameList
                            , pNotesList: pNotesList
                            , pTareWeightList: pTareWeightList
                            , pNetWeightList: pNetWeightList
                            , pGrossWeightList: pGrossWeightList

                            , pOperationNOList: pOperationNOList
                            , pFactoryList: pFactoryList
                            , pCustomLOCList: pCustomLOCList
                            , pTruckWeightList: pTruckWeightList
                            , pFactoryGateOutList: pFactoryGateOutList
                            , pPODList: pPODList
                            , pInvoiceList: pInvoiceList

                            , pFGODateList: pFGODateList

                            , pReleaseTimeList: pReleaseTimeList
                            , pArrivalTimeList: pArrivalTimeList
                            , pReturnTimeList: pReturnTimeList
                            , pFGOTimeList: pFGOTimeList

                        };
                        CallPOSTFunctionWithParameters("/api/TruckingOrders/SaveContainers", pParametersWithValues
                            , function (pData) {
                                if (pData[0] != "") //pData[1]: is a message returned from controller in case of change in another session that prevents saving main route
                                    swal(strSorry, pData[0]);
                                else
                                    CallGETFunctionWithParameters("/api/TruckingOrders/LoadAllContainers"
                                        , {
                                            pWhereClause: "WHERE TruckingOrderID=" + $("#hID").val()
                                            , pOrderBy: "ID"
                                        }
                                        , function (pData) {
                                            Details_BindTableRows(JSON.parse(pData[0]));
                                            FadePageCover(false);
                                        }
                                        , null);
                            }, null);



                    } //if (glbCallingControl != "FleetTransportOrder" && glbCallingControl != "FleetTransportOrderSupplier") {
                    swal("Success", "Saved successfully,");
                    TruckingOrders_LoadingWithPaging(true/*pCancelFadePageCover*/);
                }
                FadePageCover(false);
            }, null);
    }
}
function FleetTransportOrder_EmptyRoutes() {
    debugger;
    $("#slRoutingsPOLTruckingOrder").html("<option value=0><--Select--></option>");
    $("#slRoutingsPODTruckingOrder").html("<option value=0><--Select--></option>");
    $("#slQuotationRoute").html("<option value=0><--Select--></option>");
    //$("#slDivision").html("<option value=0>" + "</option>");
    $("#txtCost").val(0);
    $("#txtSale").val(0);
    $("#txtTruckingOrderPickupAddressTruckingOrder").val("");
    $("#txtTruckingOrderDeliveryAddressTruckingOrder").val("");
    $("#txtRoutingNotesTruckingOrder").val("");
}
function FleetTransportOrder_GetRoutes() {
    debugger;
    $("#slRoutingsPOLTruckingOrder").html("<option value=0></option>");
    $("#slRoutingsPODTruckingOrder").html("<option value=0></option>");
    $("#slQuotationRoute").html("<option value=0><--Select--></option>");
    //$("#slDivision").html("<option value=0>" + "</option>");
    $("#txtCost").val(0);
    $("#txtSale").val(0);
    $("#txtTruckingOrderPickupAddressTruckingOrder").val("");
    $("#txtTruckingOrderDeliveryAddressTruckingOrder").val("");
    $("#txtRoutingNotesTruckingOrder").val("");
    if ($("#slCustomer").val() != "" /*&& $("#slCommodity").val() != ""*/) {
        FadePageCover(true);
        var pWhereClause = "WHERE IsFleet=1 AND ClientID=" + $("#slCustomer").val() + " \n"
            + ($("#hID").val() == "" ? "AND IsQuotationHeaderExpired=0" : "") + " \n" //in case of insert don't retrieve
            + ($("#slDivision").val() != "" ? (" AND DivisionID=" + $("#slDivision").val()) : ""); //+ " AND CommodityID=" + $("#slCommodity").val();
        var pOrderBy = "POLName,PODName";
        var pPageNumber = 1;
        var pPageSize = 999999;
        var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClauseQR: pWhereClause, pOrderBy: pOrderBy }
        CallGETFunctionWithParameters("/api/Quotations/QR_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned", pControllerParameters
            , function (pData) {
                //Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(data, ID_Name, Items_Name, SplitByChar, Title, SelectInput_ID, Selected_ID, AttrItemNames, pCallback);
                Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(pData[0], "ID", "POLName,PODName,EquipmentModelName", '-->', "<--Select-->", "#slQuotationRoute", null, "CommodityID,POL,POD,POLAddress,PODAddress,Sale,Cost,DivisionName,EquipmentModelID,Notes", null);
                FadePageCover(false);
            }
            , null);
    } //if ($("#slCustomer").val() != "" && $("#slCommodity").val() != "") {
}
function FleetTransportOrder_FillPorts() {
    debugger;
    var _CommodityID = 0;
    var _POLID = 0;
    var _PODID = 0;
    var _Cost = 0;;
    var _Sale = 0;
    var _POLName = "<--Select-->";
    var _PODName = "<--Select-->";
    var _POLAddress = "";
    var _PODAddress = "";
    var _Notes = "";
    if ($("#slQuotationRoute").val() != 0) {
        _CommodityID = $("#slQuotationRoute option:selected").attr("CommodityID");
        _POLID = $("#slQuotationRoute option:selected").attr("POL");
        _PODID = $("#slQuotationRoute option:selected").attr("POD");
        _POLName = $("#slQuotationRoute option:selected").text().split("-->")[0].trim();
        _PODName = $("#slQuotationRoute option:selected").text().split("-->")[1].trim();
        _POLAddress = $("#slQuotationRoute option:selected").attr("POLAddress");
        _PODAddress = $("#slQuotationRoute option:selected").attr("PODAddress");
        _Notes = $("#slQuotationRoute option:selected").attr("Notes");
        _Cost = $("#slQuotationRoute option:selected").attr("Cost");
        _Sale = $("#slQuotationRoute option:selected").attr("Sale");
    }
    $("#slCommodity").val(_CommodityID == 0 ? "" : _CommodityID);
    $("#slRoutingsPOLTruckingOrder").html("<option value=" + _POLID + ">" + _POLName + "</option>");
    $("#slRoutingsPODTruckingOrder").html("<option value=" + _PODID + ">" + _PODName + "</option>");
    $("#txtTruckingOrderPickupAddressTruckingOrder").val(_POLAddress == 0 ? "" : _POLAddress);
    $("#txtTruckingOrderDeliveryAddressTruckingOrder").val(_PODAddress == 0 ? "" : _PODAddress);
    $("#txtRoutingNotesTruckingOrder").val(_Notes == 0 ? "" : _Notes);
    $("#txtCost").val(_Cost);
    $("#txtSale").val(_Sale);
    //$("#slDivision").html("<option>" + ($("#slQuotationRoute option:selected").attr("DivisionName") == 0 || $("#slQuotationRoute option:selected").attr("DivisionName") == undefined ? "" : $("#slQuotationRoute option:selected").attr("DivisionName")) + "</option>");
}
function FleetTransportOrder_Draw(pData, pOption) {
    debugger;
    var pRoutings = JSON.parse(pData[1]);
    var pOperationHeader = JSON.parse(pData[2]);
    var pPayables = JSON.parse(pData[3]);
    var pCustomer = JSON.parse(pData[4]);
    var pTruckerContact = JSON.parse(pData[5]);

    var _ReportTitle = 'Transport Order ' + pRoutings.TruckingOrderCode + '-';
    var _ReportHTML = "";
    var _TodaysDate = getTodaysDateInddMMyyyyFormat();

    _ReportHTML += '<html>';
    _ReportHTML += '     <head><title>' + _ReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
    _ReportHTML += '         <body style="background-color:white;">';
    _ReportHTML += '            <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader-TransportOrder.jpg" alt="logo"/></div>';
    //_ReportHTML += '            <div class="col-xs-5 m-l text-center"><img src="/Content/Images/CompanyLogo-TransportOrder.jpg" alt="logo"/></div>';
    _ReportHTML += '            <div class="col-xs-5 m-l text-center"><img src="/Content/Images/CompanyLogo.jpg" alt="logo"/></div>';
    _ReportHTML += '            <div class="col-xs-1"></div>';
    _ReportHTML += '            <table border class="col-xs-6 m-l-n">';
    _ReportHTML += '                <td>';
    if (pDefaults.UnEditableCompanyName == "CAL")
        _ReportHTML += '                    <b>Shipment No: ' + ConvertDateFormat(GetDateWithFormatMDY(pRoutings.CreationDate)).substring(3, 5) + ConvertDateFormat(GetDateWithFormatMDY(pRoutings.CreationDate)).substring(6, 10) + pRoutings.TruckingOrderCode + '</b>';
    else
        _ReportHTML += '                    <b>Shipment No: ' + pRoutings.TruckingOrderCode + '</b>';
    _ReportHTML += '                    <br><b>To: </b>' + (pRoutings.IsOwnedByCompany ? pRoutings.ClientName : pRoutings.TruckerName);
    _ReportHTML += '                    <br><b>Date: </b>' + _TodaysDate;
    _ReportHTML += '                </td>';
    _ReportHTML += '            </table>';

    _ReportHTML += '            <div class="col-xs-12 text-center text-ul" style="clear:both;"><h4>' + ' <br>PLEASE MENTION OUR SHIPMENT NUMBER ON YOUR INVOICE ' + '</h4></div>';
    _ReportHTML += '            <table border class="col-xs-12">';
    _ReportHTML += '                <td>';
    _ReportHTML += '                    <div class="col-xs-12 m-l-n">' + '<b>LOADING</b>' + '</div>';
    _ReportHTML += '                    <div class="col-xs-12 m-l-n">' + '<u>Loading point:</u> ' + pRoutings.POLName + '</div>';
    _ReportHTML += '                    <div class="col-xs-12 m-l-n">' + '<u>Address:</u> ' + (pRoutings.PickupAddress == 0 ? "" : pRoutings.PickupAddress) + '</div>';

    _ReportHTML += '                    <div class="col-xs-4 m-t m-l-n" style="clear:both;"><u>Loading date:</u> ' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pRoutings.LoadingDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(pRoutings.LoadingDate)) : "") + "</div>";
    _ReportHTML += '                    <div class="col-xs-4 m-t"><u>Loading time:</u> ' + pRoutings.LoadingTime + "</div>";
    _ReportHTML += '                    <div class="col-xs-4 m-t"><u>Loading ref.:</u> ' + (pRoutings.LoadingReference == 0 ? "" : pRoutings.LoadingReference) + "</div>";
    _ReportHTML += '                    <div class="col-xs-4 m-l-n" style="clear:both;">Truck plate no.: ' + (pRoutings.EquipmentNumber == 0 ? ((pRoutings.Delays == 0 || pDefaults.UnEditableCompanyName != "CAL") ? "" : pRoutings.Delays) : pRoutings.EquipmentNumber) + "</div>";
    _ReportHTML += '                    <div class="col-xs-4">Tank plate no.: ' + (pRoutings.TrailerNumber == 0 ? ((pRoutings.PowerFromGateInTillActualSailing == 0 || pDefaults.UnEditableCompanyName != "CAL") ? "" : pRoutings.PowerFromGateInTillActualSailing) : pRoutings.TrailerNumber) + "</div>";
    _ReportHTML += '                    <div class="col-xs-4">&emsp;</div>';

    _ReportHTML += '                    <div class="col-xs-12 m-l-n" style="clear:both;">' + '<br>' + '<b>UNLOADING</b>' + '</div>';
    _ReportHTML += '                    <div class="col-xs-12 m-l-n">' + '<u>Unloading point:</u> ' + pRoutings.PODName + '</div>';
    _ReportHTML += '                    <div class="col-xs-12 m-l-n">' + '<u>Address:</u> ' + (pRoutings.DeliveryAddress == 0 ? "" : pRoutings.DeliveryAddress) + '</div>';

    _ReportHTML += '                    <div class="col-xs-4 m-t m-l-n" style="clear:both;"><u>Unloading date:</u> ' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pRoutings.UnloadingDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(pRoutings.UnloadingDate)) : "") + "</div>";
    _ReportHTML += '                    <div class="col-xs-4 m-t"><u>Unloading time:</u> ' + pRoutings.UnloadingTime + "</div>";
    _ReportHTML += '                    <div class="col-xs-4 m-t"><u>Unloading ref.:</u> ' + (pRoutings.UnloadingReference == 0 ? "" : pRoutings.UnloadingReference) + "</div>";

    _ReportHTML += '                    <div class="col-xs-12 m-l-n" style="clear:both;">' + '<br>' + '<u>Product:</u> ' + (pRoutings.CommodityName == 0 ? "" : pRoutings.CommodityName) + (pDefaults.UnEditableCompanyName == "CAL" ? ('&emsp;<u>Quantity:</u> ' + pRoutings.Quantity) : "") + "</div>";

    _ReportHTML += '                    <div class="col-xs-12 m-l-n" style="clear:both;">' + '<br>' + '<u>Remarks:</u> ' + (pRoutings.Notes == 0 ? "" : pRoutings.Notes.replace(/\n/g, "<br/>")) + "</div>";
    _ReportHTML += '                </td>';
    _ReportHTML += '            </table>';

    _ReportHTML += '            <div class="col-xs-12 m-l-n"><b>FREIGHT RATE: ' + (pRoutings.IsOwnedByCompany ? pRoutings.Sale : pRoutings.Cost) + ' ' + pDefaults.CurrencyCode + '</b></div>';

    _ReportHTML += '            <div class="col-xs-12 m-l-n"><br>' + '1. Se prohíbe la sub contratación del servicio sin previa autorización de Caletrans / It is strictly forbidden to sub contract this load without Caletrans’ authorization' + '</div>';
    _ReportHTML += '            <div class="col-xs-12 m-l-n">' + '2. La cisterna y el conductor cumplirán con lo exigido por la ley vigente (Normativa ADR, ATP, ITV, seguro vehículos, seguro de mercancía y de responsabilidad civil entre otros) / Driver and vehicles must fulfil transport law and regulation (ADR, ATP, insurance goods, vehicles and third part liability)' + '</div>';
    _ReportHTML += '            <div class="col-xs-12 m-l-n">' + '3. El vehículo estará en perfecto estado de limpieza, seco, precintado y equipado con compresor / Tank must be in good condition and with a proper ECD certificate, dry, sealed and equipped with compressor' + '</div>';
    _ReportHTML += '            <div class="col-xs-12 m-l-n">' + '4. En caso de problemas y/o retraso se tiene que comunicar de inmediato a CaleTrans. De lo contrario, podrían incluirse gastos extra. / Any problem or delay has to be promptly communicated to Caletrans in order to avoid extra costs' + '</div>';
    _ReportHTML += '            <div class="col-xs-12 m-l-n">' + '5. Después de la descarga comunicamos los datos de carga y descarga. Copia del CMR por e-mail. / After unloading carrier must send loading and unloading details via mail, together with a scanned copy of signed CMR' + '</div>';
    _ReportHTML += '            <div class="col-xs-12 m-l-n">' + '6. Costes adicionales serán aplicados al vector siempre que se verifiquen, tanto en la carga como en la descarga, retrasos no justificados superiores a 6 horas sobre la concordada. / Delay over 6 hours on loading and unloading will be charged 45€/hour up to 450€/day' + '</div>';
    _ReportHTML += '            <div class="col-xs-12 m-l-n">' + '7. Falta de cualquier comunicación sobre el presente contracto de transporte, a partir de 1 hora de su recepción, equivaldrá a su aceptación integral / Lack of any communication regarding this order, within 1 hour from its reception, is equivalent to its acceptance' + '</div>';
    _ReportHTML += '            <div class="col-xs-12 m-l-n">' + '8. Las facturas serán pagadas dentro de 60 días desde la recepción del CMR. / Invoice will be paid within 60 days from the original CMR reception.' + '</div>';
    _ReportHTML += '         </body>';
    _ReportHTML += '</html>';
    if (pOption == "Print" || pOption == undefined || pOption == null) {
        var mywindow = window.open('', '_blank');
        mywindow.document.write(_ReportHTML);
        mywindow.document.close();
        FadePageCover(false);
    }
    else if (pOption == "Email") {
        //SendPDFEmail_General(pEmail_Subject, pEmail_To, pReportHTML, pReportTitle, pCallback);
        if (pDefaults.UnEditableCompanyName == "CAL" && !pRoutings.IsOwnedByCompany && pTruckerContact != null)
            SendPDFEmail_General(_ReportTitle, pTruckerContact.Email, _ReportHTML, _ReportTitle, function () { FadePageCover(false); });
        else if (pCustomer.Email != "" && validateEmail(pCustomer.Email))
            SendPDFEmail_General(_ReportTitle, pCustomer.Email, _ReportHTML, _ReportTitle, function () { FadePageCover(false); });
        else {
            swal("Sorry", "Please, enter the client email.");
            FadePageCover(false);
        }
    }
}
function FleetTransportOrder_EquipmentTypeChanged() {
    debugger;
    if ($("#slEquipmentTruckingOrder").val() == 0
        || $("#slEquipmentTruckingOrder option:selected").text().split('(') < 2
        //|| $("#slEquipmentTruckingOrder option:selected").text().split('(')[1].split(')')[0] == "Truck"
    ) {
        $("#lblLoadingDate").text("Loading Date");
        $("#lblLoadingTime").text("Loading Time");
        $("#lblUnLoadingDate").text("Unloading Date");
        $("#lblUnLoadingTime").text("Unloading Time");
        $("#lblTruckingOrderQuantityTruckingOrder").text("Quantity");
        $(".classHideForTrips").removeClass("hide");
    }
    else {
        $(".classHideForTrips").addClass("hide");
        $("#lblLoadingDate").text("تاريخ الركوب");
        $("#lblLoadingTime").text("وقت الركوب");
        $("#lblUnloadingDate").text("تاريخ الوصول");
        $("#lblUnloadingTime").text("وقت الوصول");
        $("#lblTruckingOrderQuantityTruckingOrder").text("عدد الركاب");
        $("#slCommodities").val("");
    }
}
//*********************************Uploaded Files***************************************//
function DocsIn_FillControls() {
    debugger;
    glbGeneralUploadModalName = "DocsInModal"; //if the upload is in a modal then is not opened
    glbGeneralUploadTableName = "tblDocsIn";
    glbGeneralUploadFolderName = $("#hID").val() == "" ? "" : ("ID" + $("#hID").val().trim());
    glbGeneralUploadPath = "/DocsInFiles//TransportOrder//";
    glbGeneralUploadRelativePath = "~/DocsInFiles/TransportOrder/";
    glbGeneralUploadBtnUploadName = "inputFileUpload";
    glbTblTHSelectAllTagName = "HeaderDeleteDocsInID";
    glbTblInputSelectAllInputName = "cb-CheckAll-DocsIn";

    GeneralUpload_FillControls();
}
//*********************************EOF Uploaded Files***************************************//
