var RoutingSuffix = "";
var nilRoutings = {};
function Routings_SubmenuTabClicked() {
    debugger;
    if ($("#tblRoutings tbody tr").length == 0) {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/Routings/LoadWithWhereClause",
            {
                pPageNumber: 1
                , pPageSize: 999999
                , pWhereClause: "WHERE OperationID=" + ($("#hOperationID").val() == "" ? 0 : $("#hOperationID").val())
            }
            , function (pData) {
                if (pDefaults.UnEditableCompanyName == "NIL") {
                    $('.showForNIL').removeClass('hide');
                    $('.hideForNIL').addClass('hide');
                }
                if (pDefaults.UnEditableCompanyName == "ESG") {
                    $('.showForESG').removeClass('hide');
                    $('.hideForESG').addClass('hide');
                }
                Routings_BindTableRows(JSON.parse(pData[0]));
                FadePageCover(false);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slTrailerTruckingOrder", pData[1], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slDriverTruckingOrder", pData[2], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slDriverAssistantTruckingOrder", pData[3], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slRoutingsLoadingZoneTruckingOrder", pData[4], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slRoutingsFirstCuringAreaTruckingOrder", pData[4], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slRoutingsSecondCuringAreaTruckingOrder", pData[4], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slRoutingsThirdCuringAreaTruckingOrder", pData[4], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slEquipmentTruckingOrder", pData[5], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slCC_ClearanceTypeID", pData[6], null);
                FillListFromObject(null, 24, TranslateString("SelectFromMenu"), "slCC_CustomItemsID", pData[7], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slWarehouseCustomsClearance", pData[8], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slRoutingsTruckingEquipmentModelsTruckingOrder", pData[9], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slCustomerCustomsClearance", pData[10], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slTruckingOrderContainerTypesTruckingOrder", pData[11], function () { $('#slTruckingOrderContainerTypes2TruckingOrder').html($('#slTruckingOrderContainerTypesTruckingOrder').html()); });
                $('#slCustomerCustomsClearance').css({ 'width': '100%' }).select2();
                DocsOut_SubmenuTabClicked(false);
                ApplySelectListSearch();
                //FadePageCover(false); //done in DocsOut_SubmenuTabClicked() 
            }
            , null);
    }

    if (pDefaults.UnEditableCompanyName == "ILS" || pDefaults.UnEditableCompanyName == "ILSEG") {
        $('#lblGateInDate').html('FreeTime / Cutoff تاريخ');
        $('#lblGateOutDate').html('تاريخ التواجد');
        $('#lblStuffingDate').html('تاريخ السحب');
        $('#lblTruckingOrderLoadingTimeTruckingOrder').html('ميعاد التواجد');
    }
    if (pDefaults.UnEditableCompanyName == "UNV") {
        $("#txtMAWBSuffix").attr("maxlength", "10");
        $("#txtMAWBSuffix").attr("placeholder", "10 digits");
    }
    if ($("#cbIsFCL").prop("checked") || $("#cbIsFTL").prop("checked") || $("#cbIsTank").prop("checked") || $("#cbIsFlexi").prop("checked")) {
        $('.classHideForContainers').addClass('hide');
        $('.classShowForContainers').removeClass('hide');
        if (pDefaults.UnEditableCompanyName != "ILS" && pDefaults.UnEditableCompanyName != "ILSEG") {
            $('#lblGateInDate').html('Gate In Date - تاريخ دخول الميناء');
            $('#lblGateOutDate').html('Gate Out Date - تاريخ الخروج');
        }
    }
    else {
        $('.classHideForContainers').removeClass('hide');
        $('.classShowForContainers').addClass('hide');
        if (pDefaults.UnEditableCompanyName != "ILS" && pDefaults.UnEditableCompanyName != "ILSEG") {
            $('#lblGateInDate').html('تاريخ الدخول');
            $('#lblGateOutDate').html('تاريخ الخروج ');
        }
    }

    if (pDefaults.UnEditableCompanyName == "SKY") {
        $(".classShowForSKY").removeClass("hide");
        $(".classHideForSKY").addClass("hide");

        $("#lblCCACertificateValue").text("  قيمه فاتوره الشحنه   ");
        $("#lblCCASpendDate").text("  تاريخ سحب اذن الاستلام   ");
        $("#lblCCAReceiveDate").text("  تاريخ تقديم المستندات لنافذه   ");
        $("#lblCCAOthers").text("  عرض  ");
    }
    if (pDefaults.UnEditableCompanyName == "NAJ") {
        $("#txtUnloadingDate").replaceWith('<input id="txtUnloadingDate" name="txtUnloadingDate" type="text" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" style="background-color:white; cursor:text;" class="datetimepicker-input form-control input-sm" data-required="false" data-date-format="dd/mm/yyyy HH:ii p" placeholder="Select Date & Time" />');
        $("#txtUnloadingDate").datetimepicker({
            weekStart: 1,
            todayBtn: 1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            forceParse: 0,
            showMeridian: 1
        });
    }
    if (pDefaults.UnEditableCompanyName == "AKS") {
        $('#txtTruckingOrderBookingNumber').parent().addClass('hide');
        $('#txtOBL').attr('data-required', 'true');
        $('#txtETAPOLDate').attr('data-required', 'true');
        $('#txtRoutingFreeTime').attr('data-required', 'true');
        $('#txtRoutingTruckCounter').attr('data-required', 'true');
        $('#txtActualDeparture').attr('data-required', 'true');
    }
}

function Routings_BindTableRows(pRoutings) {
    debugger;
    nilRoutings = pRoutings;
    ClearAllTableRows("tblRoutings");
    var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right'> <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    var printCCStagesControlsText = " class='btn btn-xs btn-rounded btn-info float-right'> <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Stages" + "</span>";
    var AssignedETAPOLDate = new Date(); var AssignedATAPOLDate = new Date();
    var AssignedExpectedDeparture = new Date(); var AssignedActualDeparture = new Date();
    var AssignedExpectedArrival = new Date(); var AssignedActualArrival = new Date();
    var AssignedShippingLineName = ""; var AssignedAirlineName = ""; var AssignedTruckerName = "";
    var AssignedCutOffDate = new Date();
    var downloadControlsText = " class='btn btn-xs btn-rounded btn-primary float-right' > <i class='fa fa-cloud-download' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Download Log" + "</span>";

    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var emailControlsText = " class='btn btn-xs btn-rounded btn-primary float-right' > <i class='fa fa-envelope-o' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Mail" + "</span>";
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
            AssignedCutOffDate = item.CutOffDate;
        }
        debugger;
        const indexToRoute = pRoutings.findIndex(route => route.RoutingTypeID === 30);
        const indexToTrucking = pRoutings.findIndex(route => route.RoutingTypeID === 60);
        const indexToClearance = pRoutings.findIndex(route => route.RoutingTypeID === 70);
        if (['NIL', 'SSH'].includes(pDefaults.UnEditableCompanyName)) {
            $('#slFlightRoute').val(pRoutings[indexToRoute]?.ContactPersonPhones);
            $('#slFreightCharges').val(pRoutings[indexToRoute]?.LoadingTime);
            $('#slNoOfOriginals').val(pRoutings[indexToRoute]?.WareHouse);

            $('#txtCargoInvoiceValue').val(pRoutings[indexToClearance]?.CustomerWarehouseManagerName);
            $('#txtCustomsLocation').val(pRoutings[indexToClearance]?.WareHouseLocation);
            $('#txtAdditionalChargesRevaluationPenaltyFees').val(pRoutings[indexToClearance]?.CustomerWarehouseManagerPhone);
            $('#txtExemptionBy').val(pRoutings[indexToClearance]?.ContactPerson);
            $('#txtExemptionByDescription').val(pRoutings[indexToClearance]?.DeliveryAddress);
            $('#txtBLNo').val(pRoutings[indexToClearance] ?.Delays);
            if (indexToClearance >= 0) {
                try {
                    if (IsNull(pRoutings[indexToClearance]?.VoyageOrTruckNumber, '').length > 0) {
                        nileTable = JSON.parse(pRoutings[indexToClearance].VoyageOrTruckNumber);
                    }
                } catch (error) {
                    console.error("Failed to parse VoyageOrTruckNumber:", error);
                    nileTable = ''; // Set to empty string on failure
                }
                try {
                    if (IsNull(pRoutings[indexToClearance]?.Quantity, '').length > 0) {
                        nileTable2 = JSON.parse(pRoutings[indexToClearance].Quantity);
                    }
                } catch (error) {
                    console.error("Failed to parse Quantity:", error);
                    nileTable2 = ''; // Set to empty string on failure
                } trackingNil
                try {
                    if (IsNull(pRoutings[indexToClearance]?.PowerFromGateInTillActualSailing, '').length > 0) {
                        nileTable3 = JSON.parse(pRoutings[indexToClearance].PowerFromGateInTillActualSailing);
                    }
                } catch (error) {
                    console.error("Failed to parse PowerFromGateInTillActualSailing:", error);
                    nileTable3 = ''; // Set to empty string on failure
                }

                try {
                    if (IsNull(pRoutings[indexToClearance]?.ContactPersonPhones, '').length > 0) {
                        nileTable4 = JSON.parse(pRoutings[indexToClearance].ContactPersonPhones);
                    }
                } catch (error) {
                    console.error("Failed to parse ContactPersonPhones:", error);
                    nileTable4 = ''; // Set to empty string on failure

                }
            }
            if (indexToTrucking >= 0) {
                try {
                    if (IsNull(pRoutings[indexToTrucking]?.CertificateValue, '').length > 0) {
                        trackingNil = JSON.parse(pRoutings[indexToTrucking].CertificateValue);
                    }
                } catch (error) {
                    console.error("Failed to parse CertificateValue:", error);
                    trackingNil = ''; // Set to empty string on failure
                }
            }
        }
        AppendRowtoTable("tblRoutings",
            ("<tr ID='" + item.ID + "' val='" + item.RoutingTypeID + "' " + (OERou && $("#hIsOperationDisabled").val() == false ? ("ondblclick='Routings_EditByDblClick(" + item.ID + ");'") : "") + ">"
                //+ "<td class='RoutingID'> <input " + (item.RoutingTypeID != MainCarraigeRoutingTypeID || (item.RoutingTypeID == MainCarraigeRoutingTypeID && $("#tblRoutings tbody tr td.RoutingTypeID[val=" + MainCarraigeRoutingTypeID + "]").length > 0) ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='RoutingID'> <input " + (item.RoutingTypeID != MainCarraigeRoutingTypeID ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='RoutingType' val='" + item.RoutingTypeID + "'>" + item.RoutingName + "</td>"
                //TransportType : 1-Ocean 2-Air 3-Inland
                + "<td class='TransportType hide' val='" + item.TransportType + "'>" + GetTransportType(item.TransportType) + "</td>"
                + "<td class='shownTransportIconName' ><i class= 'fa " + item.TransportIconName + " " + item.TransportIconStyle + " fa-2x'/></td>"





                + "<td class='TransportIconName hide'>" + item.TransportIconName + "</td>"//this line is to get the value of the IconName to fill it in the modal 
                + "<td class='TransportIconStyle hide'>" + item.TransportIconStyle + "</td>"//this line is to get the value of the IconStyle to fill it in the modal
                //*********************************************** */
                + "<td class='CutoffDate hide' val='" + GetDateWithFormatMDY(AssignedCutOffDate) + "'>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(AssignedCutOffDate)) + "</td>"
                //*********************************************** */
                + "<td class='POLCountry hide' val='" + item.POLCountryID + "'>" + item.POLCountryID + "</td>"
                + "<td class='PODCountry hide' val='" + item.PODCountryID + "'>" + item.PODCountryID + "</td>"
                + "<td class='POL' val='" + item.POL + "'><small>" + item.POLCountryCode + " (" + item.POLCode + " " + item.POLName + ")" +
                "<br/>Exp. Departure : <span  class='static-text-blue'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(AssignedExpectedDeparture)) < 1 ? "Unspecified" : GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(AssignedExpectedDeparture))) + " </span>" +
                "<br/>Act. Departure : <span  class='static-text-blue'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(AssignedActualDeparture)) < 1 ? "Unspecified" : GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(AssignedActualDeparture))) + " </span>" +
                "</small></td>"


                + "<td class='POD' val='" + item.POD + "'><small>" + item.PODCountryCode + " (" + item.PODCode + " " + item.PODName + ")" +
                "<br/>Exp. Arrival   : <span  class='static-text-blue'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(AssignedExpectedArrival)) < 1 ? "Unspecified" : GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(AssignedExpectedArrival))) + " </span>" +
                "<br/>Act. Arrival   : <span  class='static-text-blue'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(AssignedActualArrival)) < 1 ? "Unspecified" : GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(AssignedActualArrival))) + " </span>" +
                "</small></td>"

                + "<td class='ETAPOLDate hide' val='" + GetDateWithFormatMDY(AssignedETAPOLDate) + "'>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(AssignedETAPOLDate)) + "</td>"
                + "<td class='ATAPOLDate hide' val='" + GetDateWithFormatMDY(AssignedATAPOLDate) + "'>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(AssignedATAPOLDate)) + "</td>"

                + "<td class='ExpectedArrival hide' val='" + GetDateWithFormatMDY(AssignedExpectedArrival) + "'>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(AssignedExpectedArrival)) + "</td>"
                + "<td class='ExpectedDeparture hide' val='" + GetDateWithFormatMDY(AssignedExpectedDeparture) + "'>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(AssignedExpectedDeparture)) + "</td>"
                + "<td class='ActualArrival hide' val='" + GetDateWithFormatMDY(AssignedActualArrival) + "'>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(AssignedActualArrival)) + "</td>"
                + "<td class='ActualDeparture hide' val='" + GetDateWithFormatMDY(AssignedActualDeparture) + "'>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(AssignedActualDeparture)) + "</td>"

                + "<td class='Line' val='" + (item.TransportType == OceanTransportType ? ($("#hBLType").val() == constHouseBLType && item.RoutingTypeID == MainCarraigeRoutingTypeID ? $("#hShippingLineID").val() : item.ShippingLineID)//In case of House and main route get from vwOperations(The Line from MasterOp)
                    : (item.TransportType == AirTransportType ? ($("#hBLType").val() == constHouseBLType && item.RoutingTypeID == MainCarraigeRoutingTypeID ? $("#hAirlineID").val() : item.AirlineID)//In case of House and main route get from vwOperations(The Line from MasterOp)
                        : ($("#hBLType").val() == constHouseBLType && item.RoutingTypeID == MainCarraigeRoutingTypeID ? $("#hTruckerID").val() : item.TruckerID)) //In case of House and main route get from vwOperations(The Line from MasterOp)
                ) //EOF getting the carrier ID val
                + "'>" + (item.TransportType == OceanTransportType ? (AssignedShippingLineName == 0 ? "" : AssignedShippingLineName) //Ocean
                    : (item.TransportType == AirTransportType ? (AssignedAirlineName == 0 ? "" : AssignedAirlineName) //Air
                        : (AssignedTruckerName == 0 ? "" : AssignedTruckerName)) //Inland
                )
                + (item.CCAID == 0 ? "" : (" / " + item.CCAName))
                + "</td>"
                + "<td class='Vessel hide' val='" + item.VesselID + "'>" + (item.VesselID == 0 ? "" : item.VesselName) + "</td>"
                + "<td class='VoyageOrTruckNumber hide'>" + (item.VoyageOrTruckNumber == 0 ? "" : item.VoyageOrTruckNumber) + "</td>"
                + "<td class='TransientTime hide'>" + (item.TransientTime == 0 ? "" : item.TransientTime) + "</td>"
                + "<td class='Validity hide'>" + (item.Validity == 0 ? "" : item.Validity) + "</td>"
                + "<td class='FreeTime hide'>" + (item.FreeTime == 0 ? "" : item.FreeTime) + "</td>"
                + "<td class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                + "<td class='RoadNumber hide'>" + (item.RoadNumber == 0 ? "" : item.RoadNumber) + "</td>"
                + "<td class='DeliveryOrderNumber hide'>" + (item.DeliveryOrderNumber == 0 ? "" : item.DeliveryOrderNumber) + "</td>"
                + "<td class='WareHouse hide'>" + (item.WareHouse == 0 ? "" : item.WareHouse) + "</td>"
                + "<td class='WarehouseID hide' val='" + item.WarehouseID + "'>" + item.WarehouseName + "</td>"
                + "<td class='WareHouseLocation hide'>" + (item.WareHouseLocation == 0 ? "" : item.WareHouseLocation) + "</td>"

                + "<td class='GensetSupplierID hide'>" + item.GensetSupplierID + "</td>"
                + "<td class='CCAID hide'>" + item.CCAID + "</td>"
                + "<td class='Quantity hide'>" + (item.Quantity == 0 ? "" : item.Quantity) + "</td>"
                + "<td class='ContactPerson hide'>" + (item.ContactPerson == 0 ? "" : item.ContactPerson) + "</td>"
                + "<td class='PickupAddress hide'>" + (item.PickupAddress == 0 ? "" : item.PickupAddress) + "</td>"
                + "<td class='DeliveryAddress hide'>" + (item.DeliveryAddress == 0 ? "" : item.DeliveryAddress) + "</td>"
                + "<td class='GateInPortID hide'>" + item.GateInPortID + "</td>"
                + "<td class='GateOutPortID hide'>" + item.GateOutPortID + "</td>"
                + "<td class='GateInDate hide'>" + item.GateInDate + "</td>"

                /*****************TransportOrder*******************/
                + "<td class='CustomerID hide' val='" + item.CustomerID + "'>" + item.CustomerID + "</td>"
                + "<td class='SubContractedCustomerID hide'>" + item.SubContractedCustomerID + "</td>"
                + "<td class='Cost hide'>" + item.Cost + "</td>"
                + "<td class='Sale hide'>" + item.Sale + "</td>"
                + "<td class='IsIsFleet hide'><input type='checkbox' id='cbIsIsFleet" + item.ID + "' disabled='disabled' " + (item.IsIsFleet ? " checked='checked' " : "") + " /></td>"
                + "<td class='LoadingDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.LoadingDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.LoadingDate)) : "") + "</td>"
                + "<td class='LoadingReference hide'>" + (item.LoadingReference == 0 ? "" : item.LoadingReference) + "</td>"
                + "<td class='UnloadingDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.UnloadingDate)) > 0 ? pDefaults.UnEditableCompanyName == "NAJ" ? GetFullDateTime_DD_MM_YY(item.UnloadingDate).replaceAll("-","/") : (ConvertDateFormat(GetDateWithFormatMDY(item.UnloadingDate))) : "") + "</td>"
                + "<td class='UnloadingReference hide'>" + (item.UnloadingReference == 0 ? "" : item.UnloadingReference) + "</td>"
                + "<td class='UnloadingTime hide'>" + (item.UnloadingTime == 0 ? "" : item.UnloadingTime) + "</td>"
                + "<td class='TrContainerTypeID hide'>" + (item.TrContainerTypeID == 0 ? "" : item.TrContainerTypeID) + "</td>"
                + "<td class='TrNumberOfContainers hide'>" + (item.TrNumberOfContainers == 0 ? "" : item.TrNumberOfContainers) + "</td>"
                + "<td class='CommodityID hide'>" + item.CommodityID + "</td>"
                + "<td class='MaxSupplierContainers hide'>" + item.MaxSupplierContainers + "</td>"
                /*****************TransportOrder*******************/

                + "<td class='GateOutDate hide'>" + item.GateOutDate + "</td>"
                + "<td class='StuffingDate hide'>" + item.StuffingDate + "</td>"
                + "<td class='DeliveryDate hide'>" + item.DeliveryDate + "</td>"
                + "<td class='BookingNumber hide'>" + (item.BookingNumber == 0 ? "" : item.BookingNumber) + "</td>"
                + "<td class='Delays hide'>" + (item.Delays == 0 ? "" : item.Delays) + "</td>"
                + "<td class='DriverName hide'>" + (item.DriverName == 0 ? "" : item.DriverName) + "</td>"
                + "<td class='CustomerWarehouseManagerName hide'>" + (item.CustomerWarehouseManagerName == 0 ? "" : item.CustomerWarehouseManagerName) + "</td>"
                + "<td class='CustomerWarehouseManagerPhone hide'>" + (item.CustomerWarehouseManagerPhone == 0 ? "" : item.CustomerWarehouseManagerPhone) + "</td>"
                + "<td class='TruckingEquipmentModels hide' val='" + item.TruckingEquipmentID + "'>" + (item.TruckingEquipmentID == 0 ? "" : item.TruckingEquipmentName) + "</td>"


                + "<td class='DriverPhones hide'>" + (item.DriverPhones == 0 ? "" : item.DriverPhones) + "</td>"
                + "<td class='PowerFromGateInTillActualSailing hide'>" + (item.PowerFromGateInTillActualSailing == 0 ? "" : item.PowerFromGateInTillActualSailing) + "</td>"
                + "<td class='ContactPersonPhones hide'>" + (item.ContactPersonPhones == 0 ? "" : item.ContactPersonPhones) + "</td>"
                + "<td class='LoadingTime hide'>" + (item.LoadingTime == 0 ? "" : item.LoadingTime) + "</td>"

                + "<td class='CCAFreight hide'>" + (item.CCAFreight == 0 ? "" : item.CCAFreight) + "</td>"
                + "<td class='CCAFOB hide'>" + (item.CCAFOB == 0 ? "" : item.CCAFOB) + "</td>"
                + "<td class='CCACFValue hide'>" + (item.CCACFValue == 0 ? "" : item.CCACFValue) + "</td>"
                + "<td class='CCAInvoiceNumber hide'>" + (item.CCAInvoiceNumber == 0 ? "" : item.CCAInvoiceNumber) + "</td>"

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
                + "<td class='Match hide'>" + (item.Match == 0 ? "" : item.Match) + "</td>"
                + "<td class='QasimaDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.QasimaDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.QasimaDate))) + "</td>"
                + "<td class='CCMainWarehouse hide' val='" + item.MainWarehouseID + "'>" + (item.MainWarehouseName == 0 ? "" : item.MainWarehouseName) + "</td>"
                + "<td class='CCWarehouseETA hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CCWarehouseETA)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.CCWarehouseETA))) + "</td>"
                + "<td class='CCWarehouseATD hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CCWarehouseATD)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.CCWarehouseATD))) + "</td>"
                + "<td class='CCIsDone hide'>" + (item.CCIsDone == null ? 0 : item.CCIsDone) + "</td>"
                + "<td class='SalesDateReceived hide'>" + item.SalesDateReceived + "</td>"
                + "<td class='CommerceDateReceived hide'>" + item.CommerceDateReceived + "</td>"
                + "<td class='InspectionDateReceived hide'>" + item.InspectionDateReceived + "</td>"
                + "<td class='FinishDateReceived hide'>" + item.FinishDateReceived + "</td>"
                + "<td class='SalesDateDelivered hide'>" + item.SalesDateDelivered + "</td>"
                + "<td class='CommerceDateDelivered hide'>" + item.CommerceDateDelivered + "</td>"
                + "<td class='InspectionDateDelivered hide'>" + item.InspectionDateDelivered + "</td>"
                + "<td class='FinishDateDelivered hide'>" + item.FinishDateDelivered + "</td>"

                + "<td class='CCDropBackReceived hide' val='" + GetDateFromServer(IsNull(item.CCDropBackReceived, "01/01/1900")) + "' >" + GetDateFromServer(IsNull(item.CCDropBackReceived, "01/01/1900")) + "</td>"
                + "<td class='CCDropBackDelivered hide'  val='" + GetDateFromServer(IsNull(item.CCDropBackDelivered, "01/01/1900")) + "'>" + GetDateFromServer(IsNull(item.CCDropBackDelivered, "01/01/1900")) + "</td>"
                + "<td class='CCAllowTemporaryReceived hide' val='" + GetDateFromServer(IsNull(item.CCAllowTemporaryReceived, "01/01/1900")) + "'>" + GetDateFromServer(IsNull(item.CCAllowTemporaryReceived, "01/01/1900")) + "</td>"
                + "<td class='CCAllowTemporaryDelivered hide' val='" + GetDateFromServer(IsNull(item.CCAllowTemporaryDelivered, "01/01/1900")) + "'>" + GetDateFromServer(IsNull(item.CCAllowTemporaryDelivered, "01/01/1900")) + "</td>"
                + "<td class='CC_ClearanceTypeID hide' val='" + (item.CC_ClearanceTypeID == 0 ? "" : item.CC_ClearanceTypeID) + "' >" + item.CC_ClearanceTypeID + "</td>"
                + "<td class='CC_CustomItemsID hide' val='" + (item.CC_CustomItemsID == 0 ? "" : item.CC_CustomItemsID) + "' >" + item.CC_CustomItemsID + "</td>"
                + "<td class='CCReleaseNo hide' val='" + item.CCReleaseNo + "'>" + item.CCReleaseNo + "</td>"




                + "<td class='IsOwnedByCompany hide'><input type='checkbox' id='cbIsOwnedByCompany" + item.ID + "' disabled='disabled' " + (item.IsOwnedByCompany ? " checked='checked' " : "") + " /></td>"
                + (
                    pDefaults.UnEditableCompanyName == 'ELI'
                        ? ("<td " + (item.RoutingTypeID == MainCarraigeRoutingTypeID ? "id = 'isShipsGo'" : "" )  +  " class='IsLoaded hide'>" + (item.IsLoaded ? "1" : "0") + "</td>")
                        : ("<td class='IsLoaded hide'><input type='checkbox' id='cbIsLoaded" + item.ID +
                            "' disabled='disabled' " + (item.IsLoaded ? " checked='checked' " : "") + " /></td>")
                )

                + "<td class='TrailerID hide'>" + (item.TrailerID == 0 ? "" : item.TrailerID) + "</td>"
                + "<td class='DriverID hide'>" + (item.DriverID == 0 ? "" : item.DriverID) + "</td>"
                + "<td class='DriverAssistantID hide'>" + (item.DriverAssistantID == 0 ? "" : item.DriverAssistantID) + "</td>"
                + "<td class='EquipmentID hide'>" + (item.EquipmentID == 0 ? "" : item.EquipmentID) + "</td>"
                + "<td class='LoadingZoneID hide'>" + (item.LoadingZoneID == 0 ? "" : item.LoadingZoneID) + "</td>"
                + "<td class='FirstCuringAreaID hide'>" + (item.FirstCuringAreaID == 0 ? "" : item.FirstCuringAreaID) + "</td>"
                + "<td class='SecondCuringAreaID hide'>" + (item.SecondCuringAreaID == 0 ? "" : item.SecondCuringAreaID) + "</td>"
                + "<td class='ThirdCuringAreaID hide'>" + (item.ThirdCuringAreaID == 0 ? "" : item.ThirdCuringAreaID) + "</td>"
                + "<td class='BillNumber hide'>" + (item.BillNumber == 0 ? "" : item.BillNumber) + "</td>"
                + "<td class='TruckingOrderCode hide'>" + (item.TruckingOrderCode == 0 ? "" : item.TruckingOrderCode) + "</td>"
                + "<td class='ConcedeCompanyName hide'>" + (item.ConcedeCompanyName == 0 ? "" : item.ConcedeCompanyName) + "</td>"
                + "<td class='ConcedeNumber hide'>" + (item.ConcedeNumber == 0 ? "" : item.ConcedeNumber) + "</td>"
                + "<td class='ConcedeTotalQty hide'>" + (item.ConcedeTotalQty == 0 ? "" : item.ConcedeTotalQty) + "</td>"
                + "<td class='ConcedeQty hide'>" + (item.ConcedeQty == 0 ? "" : item.ConcedeQty) + "</td>"
                + "<td class='CCApproveNo hide'>" + (item.CCApproveNo == 0 ? "" : item.CCApproveNo) + "</td>"
                + "<td class='CCInvoiceNo hide'>" + (item.CCInvoiceNo == 0 ? "" : item.CCInvoiceNo) + "</td>"
                + "<td class='CCTotalQty hide'>" + (item.CCTotalQty == 0 ? "" : item.CCTotalQty) + "</td>"
                + "<td class='CCSubtractQty hide'>" + (item.CCSubtractQty == 0 ? "" : item.CCSubtractQty) + "</td>"
                + "<td class='CCNetQty hide'>" + (item.CCNetQty == 0 ? "" : item.CCNetQty) + "</td>"
                + "<td class='TruckCounter hide'>" + (item.TruckCounter == 0 ? "" : item.TruckCounter) + "</td>"
                + "<td class='PrintPackinglist hide'> <a onclick='Print_PackingList()' class='btn btn-xs btn-rounded btn-info float-right'> <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>Print</span></a> </td>"

                + "<td class='TruckOrderCopy hide'>" + (item.RoutingTypeID == TruckingOrderRoutingTypeID ? "<a onclick='CopyTruckOrder(" + item.ID + ");' class='btn btn-xs btn-rounded btn-info float-right'> <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>Copy</span></a>" : "") + " </td>"



                + (item.RoutingTypeID == TruckingOrderRoutingTypeID
                    ? ("<td class=''>"
                        + "<a data-toggle='modal' onclick='DocsOut_Print(" + TruckingOrderDocumentTypeID + "," + item.ID + ");' " + printControlsText + "</a>"
                        + "<a onclick='DocsOut_OpenPartnersModal(" + TruckingOrderDocumentTypeID + "," + item.ID + ",null,null," + '"Email"' + ");' " + emailControlsText + "</a>"
                        + "</td>")
                    : (item.RoutingTypeID == CustomsClearanceRoutingTypeID
                        ? ("<td class=''>"
                            + "<a data-toggle='modal'  " + (pDefaults.UnEditableCompanyName == "ELI" ? "" : " class='hide' ") + " onclick=" + '"' + "RoutingsCC_PrintRequest(" + item.ID + "," + "'Print'" + ");" + '"' + " title='طلب تخليص' " + printControlsText + "</a>"
                            + "<a data-toggle='modal' onclick=" + '"' + "RoutingsCC_PrintStages(" + item.ID + "," + "'Print'" + ");" + '"' + " title='Print Clearance Stages' " + printCCStagesControlsText + "</a>"
                            //+ "<a onclick='DocsOut_OpenPartnersModal(" + ClearanceRequestDocumentTypeID + "," + item.ID + ",null,null," + '"Email"' + ");' " + emailControlsText + "</a>"
                            + "</td>")
                        : "<td></td>"
                    )
                )
                //+ "<td class='hide'><a href='#RoutingModal' data-toggle='modal' onclick='Routings_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"

                + `<td class='${ODRou ? `` : `hide`}'><a href='/api/Routings/GetLog?pID=${item.ID}&pTableName=vwRoutings' target='_blank' ${downloadControlsText} </a></td>`
                + `<td class='${ODRou ? `hide` : ``}'></td>`
                + `<td class='${(pDefaults.UnEditableCompanyName == 'SSH' ? `hide` : `hide`)}'> <button type='button' onclick='Print_SSH01();' class='btn btn-xs btn-rounded btn-info float-right'> <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>Print1</span></button>  <button type='button' onclick='Print_SSH02();' class='btn btn-xs btn-rounded btn-info float-right'> <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>Print2</span></button> <button type='button' onclick='Print_SSH03();' class='btn btn-xs btn-rounded btn-info float-right'> <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>Print3</span></button> </td>`

                + "</tr>"));
    });
    if (pDefaults.UnEditableCompanyName == "ELI") {
        $('#tblRoutings .TruckOrderCopy').removeClass('hide');
    }
    if (pDefaults.UnEditableCompanyName == "BED") {
        $('#tblRoutings .TruckOrderCopy').removeClass('hide');
    }
    if (pDefaults.UnEditableCompanyName == "TMP") {
        $('#tblRoutings .PrintPackinglist').removeClass('hide');
    }
    //ApplyPermissions();
    //if (OARou && $("#hIsOperationDisabled").val() == false) { $("#btn-AddRoute").removeClass("hide"); } else { $("#btn-AddRoute").addClass("hide"); }
    if (OARou && $("#hIsOperationDisabled").val() == false) {
        if (pDefaults.UnEditableCompanyName == "MED") {
            if (pLoggedUser.DepartmentID == 9) {
                $("#btn-AddRouteCustomsClearance").removeClass("hide");
            } else if (pLoggedUser.DepartmentID == 7) {
                $("#btn-AddRouteTruckingOrder").removeClass("hide");
            }
            else {
                $("#btn-AddRouteTruckingOrder").removeClass("hide");
                $("#btn-AddRouteCustomsClearance").removeClass("hide");
            }
            $("#btn-PaymentRequest").removeClass("hide")
        }
        else {
            $("#btn-AddRouteTruckingOrder").removeClass("hide");
            $("#btn-AddRouteCustomsClearance").removeClass("hide");
        }


    } else {
        $("#btn-AddRouteTruckingOrder").addClass("hide");
        $("#btn-AddRouteCustomsClearance").addClass("hide");
    }
    if (ODRou && $("#hIsOperationDisabled").val() == false) $("#btn-DeleteRoute").removeClass("hide"); else $("#btn-DeleteRoute").addClass("hide");
    BindAllCheckboxonTable("tblRoutings", "RoutingID", "cb-CheckAll-Routings");
    CheckAllCheckbox("HeaderDeleteRoutingID");
    //HighlightText("#tblRoutings>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    if (pDefaults.UnEditableCompanyName == "MED" && pLoggedUser.DepartmentID == 1 && pOperationHeader_Global.OperationStageID == 65) {
        $("#btn-AddRouteTruckingOrder").addClass("hide");
        $("#btn-AddRouteCustomsClearance").addClass("hide");
        $("#btn-ApproveTrucking").addClass("hide");
        $("#btn-ApproveClearance").addClass("hide");
        $("#btn-DeleteRoute").addClass("hide");
    }
    Routings_SetTableProperties();//Set Routing Table Properties according to BLType and if Connected or Not
    HideOperationActions();
}
function exportTableToJSON() {
    debugger;
    const rows = document.querySelectorAll('tr[id^="CustomsClearanceNILRow"]');
    const data = [];

    rows.forEach(row => {
        const taxItem = row.querySelector('input[id^="taxItemInput"]').value;
        const displaySide = row.querySelector('input[id^="displaySideInput"]').value;
        const theVisa = row.querySelector('input[id^="theVisaInput"]').value;
        const theDate = row.querySelector('input[id^="theDateInput"]').value;
        const commentNotes = row.querySelector('input[id^="commentNotesInput"]').value;

        data.push({
            taxItem,
            displaySide,
            theVisa,
            theDate,
            commentNotes
        });
    });
    debugger;
    const jsonData = JSON.stringify(data, null, 2);
    return jsonData;
}
function exportTableToJSON2() {
    debugger;
    const rows = document.querySelectorAll('tr[id^="MilestoneSummaryNILRow"]');
    const data = [];

    rows.forEach(row => {
        const MilestoneDate = row.querySelector('input[id^="MilestoneDateInput"]').value;
        const IsDue = row.querySelector('input[id^="IsDueInput"]').checked ? 'true':'false';
        const SummaryDate = row.querySelector('input[id^="SummaryDate"]').value;

        data.push({
            MilestoneDate,
            IsDue,
            SummaryDate
        });
    });
    debugger;
    const jsonData = JSON.stringify(data, null, 2);
    return jsonData;
}
function exportTableToJSON3() {
    debugger;
    const data = [];
    const data1 = {};
    const data2 = {};
    const checkboxIds1 = [
        'IsCommercialInvoice',
        'IsPackingList',
        'IsCOO',
        'IsMasterBill',
        'IsEUR1',
        'IsHouseBill',
        'IsBankForm',
        'IsEInvoice',
        'IsFumigationCertificate',
        'IsStandaredCertificate',
        'IsILACCertificate',
        'IsAnalysesCertificate',
        'IsFactoryRegisteration',
        'IsHealthCertificate',
        'IsCatalogesForCargo',
        'IsTrademarkLetters'
    ];
    const checkboxIds2 = [
        'IsFreight',
        'IsAsConstract1',
        'IsDocumentation',
        'IsTransportation',
        'IsAsConstract2',
        'IsIsurance',
        'IsClearance',
        'IsAsConstract3',
        'IsWarehousing',
        'IsTransit',
        'IsAsConstract4',
        'IsPickingPacking',
        'IsStorage',
        'IsHandling',
        'IsReexport',
        'IsIOR',
        'IsFreightTerm'
    ];
    checkboxIds1.forEach(id => {
        data1[id] = $(`#${id}`).prop('checked') ? 'true' : 'false';
    });
    checkboxIds2.forEach(id => {
        data2[id] = $(`#${id}`).prop('checked') ? 'true' : 'false';
    });
    data.push(data1);
    data.push(data2);
    const jsonData = JSON.stringify(data, null, 2);
    return jsonData;
}
function exportTableToJSON4() {
    debugger;
    const data = [];
    const data1 = {};
    const data2 = {};
    const hsCodeIds1 = [
        'hsCode1',
        'hsCode2',
        'hsCode3',
        'hsCode4'
    ];
    const hsDescriptionIds2 = [
        'hsDescription1',
        'hsDescription2',
        'hsDescription3',
        'hsDescription4'
    ];
    hsCodeIds1.forEach(id => {
        data1[id] = $(`#${id}`).val();
    });
    hsDescriptionIds2.forEach(id => {
        data2[id] = $(`#${id}`).val();
    });
    data.push(data1);
    data.push(data2);
    const jsonData = JSON.stringify(data, null, 2);
    return jsonData;
}
function exportTableToJSONTrack() {
    debugger;
    const cbIsApply = $('#cbIsApply').prop('checked') ? 'true':'false';
    const txtApplyDateTruckingOrder = $('#txtApplyDateTruckingOrder').val();
     const data = {
         cbIsApply,
         txtApplyDateTruckingOrder
        };
   
    const jsonData = JSON.stringify(data, null, 2);
    return jsonData;
}
var nileTable = '';
var nileTable2 = '';
var nileTable3 = '';
var nileTable4 = '';
var trackingNil = '';
function Routings_Insert(pSaveandAddNew) {
    debugger;
  
    if (pDefaults.UnEditableCompanyName == "NIL") {
        nileTable = exportTableToJSON();
        nileTable2 = exportTableToJSON2();
        nileTable3 = exportTableToJSON3();
        nileTable4 = exportTableToJSON4();
        trackingNil = exportTableToJSONTrack();
    }
    else if (pDefaults.UnEditableCompanyName == 'SSH') {
        nileTable3 = exportTableToJSON3();
    }
    //if (pDefaults.UnEditableCompanyName == "BOM") {


    //    let pWhereClause = "WHERE 1=1 " + " \n"; pWhereClause += " AND (CertificateNumber=N'" + $("#txtCertificateNumber").val().trim().toUpperCase() + "') ";
    //    let pWhereClause_Routings = "0";
    //    pWhereClause_Routings = "0";
    //    let pOrderBy = " ID DESC ";
    //    let pParametersWithValues = {
    //        pIsLoadArrayOfObjects: false
    //        , pPageNumber: 1
    //        , pPageSize: '10'
    //        , pWhereClause: pWhereClause
    //        , pIsBindTableRows: false
    //        , pWhereClause_Routings: pWhereClause_Routings
    //        , pOrderBy: pOrderBy
    //        , pCallingControl: "OperationsManagement_BindTableRows"
    //    }
    //    CallGETFunctionWithParameters("api/Routings/LoadWithWhereClause", pParametersWithValues, function (pData) {

    //        $.each((JSON.parse(pData[0])), function (i, item) {
    //            CertificateNumberCOUNT += 1;

    //        });

    //    }, null, false/*Default true*/);



    //}


   
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
    //else if (pDefaults.UnEditableCompanyName == "BOM" && CertificateNumberCOUNT > 0) {
    //    swal("Sorry", "CertificateNumber must be unique.");

    //    CertificateNumberCOUNT = 0;
    //    return;
    //}
    else if (ValidateForm("form", "RoutingModal" + RoutingSuffix)) {
        debugger;
        if (pDefaults.UnEditableCompanyName == "USC" && RoutingSuffix == "TruckingOrder") {
            let gateOutDate = $('#txtTruckingOrderGateOutDateTruckingOrder').val() == "" ? "01/01/1900" : $('#txtTruckingOrderGateOutDateTruckingOrder').val();
            let stuffingDate = $('#txtTruckingOrderStuffingDateTruckingOrder').val() == "" ? "01/01/1900" : $('#txtTruckingOrderStuffingDateTruckingOrder').val();
            let gateInDate = $('#txtTruckingOrderGateInDateTruckingOrder').val() == "" ? "01/01/1900" : $('#txtTruckingOrderGateInDateTruckingOrder').val();

            const isOrderCorrect = areDatesInOrderAA(gateOutDate, stuffingDate, gateInDate);
            if (!isOrderCorrect) {
                swal("Sorry","Please Check Dates (Gate out, Stuffing, Gate In)")
                return;
            }
        }
        FadePageCover(true);
        var pParametersWithValues = {
            pOperationID: $("#hOperationID").val()
            , pRoutingTypeID: $('#slRoutingTypes' + RoutingSuffix + ' option:selected').val()
            , pTransportTypeID: $("#hRoutingTransportType" + RoutingSuffix).val()
            , pTransportIconName: $("#hRoutingTransportIconName" + RoutingSuffix).val()
            , pTransportIconStyle: $("#hRoutingTransportIconStyle" + RoutingSuffix).val()

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
            , pTruckerID: (RoutingSuffix == "CustomsClearance")
                ? ($('#slRoutingsLines' + RoutingSuffix + ' option:selected').val() == "" ? 0 : $('#slRoutingsLines' + RoutingSuffix + ' option:selected').val())
                : ($("#hRoutingTransportType" + RoutingSuffix).val() == InlandTransportType
                    ? (($('#slRoutingsLines' + RoutingSuffix + ' option:selected').val() == "" || ($("#hBLType").val() == constHouseBLType && $("#slRoutingTypes" + RoutingSuffix).val() == MainCarraigeRoutingTypeID)) ? 0 : $('#slRoutingsLines' + RoutingSuffix + ' option:selected').val())
                    : 0)
            , pVesselID: (RoutingSuffix == "CustomsClearance")
                ? 0
                : ($("#hRoutingTransportType" + RoutingSuffix).val() == OceanTransportType
                    ? ($('#slRoutingVessels' + RoutingSuffix + ' option:selected').val() == "" ? 0 : $('#slRoutingVessels' + RoutingSuffix + ' option:selected').val())
                    : 0)
            , pVoyageOrTruckNumber: (pDefaults.UnEditableCompanyName == "NIL" && RoutingSuffix == "CustomsClearance" ? nileTable:($("#cbIsOwnedByCompany").prop("checked") || RoutingSuffix == "CustomsClearance") ? 0 : $("#txtRoutingVoyageOrTruckNumber" + RoutingSuffix).val().trim().toUpperCase())
            , pCustomerWarehouseMangerName: (pDefaults.UnEditableCompanyName == "NIL" && RoutingSuffix == "CustomsClearance" ? $('#txtCargoInvoiceValue').val() :  ($("#txtRoutingpCustomerWarehouseManagerNameTruckingOrder").val().trim() == "" ? "0" : $("#txtRoutingpCustomerWarehouseManagerNameTruckingOrder").val().trim().toUpperCase()))
            , pTruckingEquipmentID: ($('#slRoutingsTruckingEquipmentModelsTruckingOrder option:selected').val() == "" ? 0 : $('#slRoutingsTruckingEquipmentModelsTruckingOrder option:selected').val())
            , PCustomerWarehouseMangerPhone: (pDefaults.UnEditableCompanyName == "NIL" && RoutingSuffix == "CustomsClearance" ? $('#txtAdditionalChargesRevaluationPenaltyFees').val() : ($("#txtRoutingpCustomerWarehouseManagerPhoneTruckingOrder").val().trim() == "" ? "0" : $("#txtRoutingpCustomerWarehouseManagerPhoneTruckingOrder").val().trim().toUpperCase()))

            , pTransientTime: RoutingSuffix == "CustomsClearance" || $("#txtRoutingTransientTime" + RoutingSuffix).val().trim() == "" ? 0 : $("#txtRoutingTransientTime" + RoutingSuffix).val()
            , pValidity: RoutingSuffix == "CustomsClearance" || $("#txtRoutingValidity" + RoutingSuffix).val().trim() == "" ? 0 : $("#txtRoutingValidity" + RoutingSuffix).val()
            , pFreeTime: RoutingSuffix == "CustomsClearance" || $("#txtRoutingFreeTime" + RoutingSuffix).val().trim() == "" ? 0 : $("#txtRoutingFreeTime" + RoutingSuffix).val()
            , pNotes: $("#txtRoutingNotes" + RoutingSuffix).val().trim().toUpperCase()

            , pGensetSupplierID: RoutingSuffix == "CustomsClearance" || $("#slTruckingOrderGensetSupplier" + RoutingSuffix).val() == "" ? 0 : $("#slTruckingOrderGensetSupplier" + RoutingSuffix).val()
            , pCCAID: $("#slRoutingCCA" + RoutingSuffix).val() == "" ? 0 : $("#slRoutingCCA" + RoutingSuffix).val()
            , pQuantity: (pDefaults.UnEditableCompanyName == "NIL" && RoutingSuffix == "CustomsClearance" ? nileTable2 : (RoutingSuffix == "CustomsClearance" || $("#txtTruckingOrderQuantity" + RoutingSuffix).val().trim() == "" ? 0 : $("#txtTruckingOrderQuantity" + RoutingSuffix).val().trim().toUpperCase()))
            , pContactPerson: (pDefaults.UnEditableCompanyName == "NIL" && RoutingSuffix == "CustomsClearance" ? $('#txtExemptionBy').val() :( RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckingOrderContactPerson" + RoutingSuffix).val().trim().toUpperCase()))
            , pPickupAddress: RoutingSuffix == "CustomsClearance" || $("#txtTruckingOrderPickupAddress" + RoutingSuffix).val().trim().toUpperCase()
            , pDeliveryAddress: (pDefaults.UnEditableCompanyName == "NIL" && RoutingSuffix == "CustomsClearance" ? $('#txtExemptionByDescription').val() :  (RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckingOrderDeliveryAddress" + RoutingSuffix).val().trim().toUpperCase()))
            , pGateInPortID: RoutingSuffix == "CustomsClearance" || $("#slTruckingOrderGateInPort" + RoutingSuffix).val() == "" || $("#slTruckingOrderGateInPort" + RoutingSuffix).val() == null ? 0 : $("#slTruckingOrderGateInPort" + RoutingSuffix).val()
            , pGateOutPortID: RoutingSuffix == "CustomsClearance" || $("#slTruckingOrderGateOutPort" + RoutingSuffix).val() == "" || $("#slTruckingOrderGateOutPort" + RoutingSuffix).val() == null ? 0 : $("#slTruckingOrderGateOutPort" + RoutingSuffix).val()
            , pGateInDate: (RoutingSuffix == "CustomsClearance" || $("#txtTruckingOrderGateInDate" + RoutingSuffix).val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTruckingOrderGateInDate" + RoutingSuffix).val()))
            /****************************TransportOrder**************************/
            , pCustomerID: RoutingSuffix != "CustomsClearance" || $("#slCustomerCustomsClearance").val() == "" ? 0 : $("#slCustomerCustomsClearance").val()
            , pSubContractedCustomerID: 0
            , pCost: 0
            , pSale: 0
            , pIsFleet: false
            , pLoadingDate: "01/01/1900"
            , pLoadingReference: 0
            , pUnloadingDate: "01/01/1900"
            , pUnloadingReference: 0
            , pUnloadingTime: 0
            , pQuotationRouteID: 0
            , pTrContainerTypeID: RoutingSuffix == "TruckingOrder" ? $('#slTruckingOrderContainerTypesTruckingOrder').val():0
            , pTrNumberOfContainers: RoutingSuffix == "TruckingOrder" ? $('#txtTruckingOrderNumberOfContainersTruckingOrder').val():0
            , pCommodityID: RoutingSuffix == "TruckingOrder" ? $('#slTruckingOrderContainerTypes2TruckingOrder').val() : 0
            , pMaxSupplierContainers: RoutingSuffix == "TruckingOrder" ? $('#txtTruckingOrderNumberOfContainers2TruckingOrder').val() : 0
            /****************************TransportOrder**************************/
            , pGateOutDate: (RoutingSuffix == "CustomsClearance" || $("#txtTruckingOrderGateOutDate" + RoutingSuffix).val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTruckingOrderGateOutDate" + RoutingSuffix).val()))
            , pStuffingDate: (RoutingSuffix == "CustomsClearance" || $("#txtTruckingOrderStuffingDate" + RoutingSuffix).val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTruckingOrderStuffingDate" + RoutingSuffix).val()))
            , pDeliveryDate: (RoutingSuffix == "CustomsClearance" || $("#txtTruckingOrderDeliveryDate" + RoutingSuffix).val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTruckingOrderDeliveryDate" + RoutingSuffix).val()))
            , pBookingNumber: RoutingSuffix == "CustomsClearance" ? ($("#txtCCBookingNumber").val().trim() == "" ? 0 : $("#txtCCBookingNumber").val().trim().toUpperCase()) : $("#txtTruckingOrderBookingNumber" + RoutingSuffix).val().trim().toUpperCase()
            , pDelays: (pDefaults.UnEditableCompanyName == "NIL" && RoutingSuffix == "CustomsClearance" ? $('#txtBLNo').val() :( RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckingOrderDelays" + RoutingSuffix).val().trim().toUpperCase()))
            , pDriverName: ($("#cbIsOwnedByCompany").prop("checked") || RoutingSuffix == "CustomsClearance") ? 0 : $("#txtTruckingOrderDriverName" + RoutingSuffix).val().trim().toUpperCase()
            , pDriverPhones: ($("#cbIsOwnedByCompany").prop("checked") || RoutingSuffix == "CustomsClearance") ? 0 : $("#txtTruckingOrderDriverPhones" + RoutingSuffix).val().trim().toUpperCase()
            , pPowerFromGateInTillActualSailing: (['NIL', 'SSH'].includes(pDefaults.UnEditableCompanyName) && RoutingSuffix == "CustomsClearance" ? nileTable3 : (RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckingOrderPowerFromGateInTillActualSailing" + RoutingSuffix).val().trim().toUpperCase()))

            , pContactPersonPhones: (pDefaults.UnEditableCompanyName == "NIL" ? (RoutingSuffix == "CustomsClearance" ? nileTable4 : (RoutingSuffix != "TruckingOrder" ? $('#slFlightRoute').val() : $("#txtTruckingOrderContactPersonPhones" + RoutingSuffix).val().trim().toUpperCase())) : (RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckingOrderContactPersonPhones" + RoutingSuffix).val().trim().toUpperCase())) 
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
            , pCertificateValue: (pDefaults.UnEditableCompanyName == "NIL" && RoutingSuffix == "TruckingOrder" ? trackingNil : (RoutingSuffix != "CustomsClearance" || $("#txtCertificateValue").val().trim() == "" ? 0 : $("#txtCertificateValue").val().trim().toUpperCase()))
            , pCertificateDate: (RoutingSuffix != "CustomsClearance" || $("#txtCertificateDate").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtCertificateDate").val().trim()))
            , pQasimaNumber: RoutingSuffix != "CustomsClearance" || $("#txtQasimaNumber").val().trim() == "" ? 0 : $("#txtQasimaNumber").val().trim().toUpperCase()
            , pQasimaDate: (RoutingSuffix != "CustomsClearance" || $("#txtQasimaDate").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtQasimaDate").val().trim()))
            , pMatch: $("#match").prop("checked")

            , pCCMainWarehouseID: RoutingSuffix != "CustomsClearance" || $("#slWarehouseCustomsClearance").val() == "" ? 0 : $("#slWarehouseCustomsClearance").val()
            , pCCWarehouseETA: ($("#txtWarehouseETA").val() == "" || RoutingSuffix != "CustomsClearance" ? "01/01/1900" : ConvertDateFormat($("#txtWarehouseETA").val().trim()))
            , pCCWarehouseATD: ($("#txtWarehouseATD").val() == "" || RoutingSuffix != "CustomsClearance" ? "01/01/1900" : ConvertDateFormat($("#txtWarehouseATD").val().trim()))
            , pCCIsDone: $("#cbCCIsDone").prop("checked")

            , pSalesDateReceived: (RoutingSuffix != "CustomsClearance" || $("#txtSalesDateReceived").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtSalesDateReceived").val().trim()))
            , pCommerceDateReceived: (RoutingSuffix != "CustomsClearance" || $("#txtCommerceDateReceived").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtCommerceDateReceived").val().trim()))
            , pInspectionDateReceived: (RoutingSuffix != "CustomsClearance" || $("#txtInspectionDateReceived").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtInspectionDateReceived").val().trim()))

            , pFinishDateReceived: (RoutingSuffix != "CustomsClearance" || $("#txtFinishDateReceived").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtFinishDateReceived").val().trim()))
            , pSalesDateDelivered: (RoutingSuffix != "CustomsClearance" || $("#txtSalesDateDelivered").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtSalesDateDelivered").val().trim()))
            , pCommerceDateDelivered: (RoutingSuffix != "CustomsClearance" || $("#txtCommerceDateDelivered").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtCommerceDateDelivered").val().trim()))
            , pInspectionDateDelivered: (RoutingSuffix != "CustomsClearance" || $("#txtInspectionDateDelivered").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtInspectionDateDelivered").val().trim()))
            , pFinishDateDelivered: (RoutingSuffix != "CustomsClearance" || $("#txtFinishDateDelivered").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtFinishDateDelivered").val().trim()))

            , pCCDropBackReceived: ((RoutingSuffix != "CustomsClearance" || $("#txtCCDropBackReceived").val().trim() == "") ? "01/01/1900" : ConvertDateFormat($("#txtCCDropBackReceived").val().trim()))
            , pCCDropBackDelivered: ((RoutingSuffix != "CustomsClearance" || $("#txtCCDropBackDelivered").val().trim() == "") ? "01/01/1900" : ConvertDateFormat($("#txtCCDropBackDelivered").val().trim()))
            , pCCAllowTemporaryReceived: ((RoutingSuffix != "CustomsClearance" || $("#txtCCAllowTemporaryReceived").val().trim() == "") ? "01/01/1900" : ConvertDateFormat($("#txtCCAllowTemporaryReceived").val().trim()))
            , pCCAllowTemporaryDelivered: ((RoutingSuffix != "CustomsClearance" || $("#txtCCAllowTemporaryDelivered").val().trim() == "") ? "01/01/1900" : ConvertDateFormat($("#txtCCAllowTemporaryDelivered").val().trim()))
            , pCC_ClearanceTypeID: RoutingSuffix != "CustomsClearance" || $("#slCC_ClearanceTypeID").val().trim() == "" ? 0 : $("#slCC_ClearanceTypeID").val().trim().toUpperCase()
            , pCC_CustomItemsID: RoutingSuffix != "CustomsClearance" || $("#slCC_CustomItemsID").val().trim() == "" ? 0 : $("#slCC_CustomItemsID").val().trim().toUpperCase()
            , pCCReleaseNo: RoutingSuffix != "CustomsClearance" || IsNull($("#txtCCReleaseNo").val().trim(), "") == "" ? 0 : $("#txtCCReleaseNo").val()






            , pRoadNumber: IsNull($('#txtRoadNumber' + RoutingSuffix).val(),'0').trim()//Insert is never main route
            , pDeliveryOrderNumber: "0" //Insert is never main route
            , pWareHouse: "0" //Insert is never main route
            , pWareHouseLocation: (pDefaults.UnEditableCompanyName == "NIL" && RoutingSuffix == "CustomsClearance" ? $('#txtCustomsLocation').val() : "")


            , pIsOwnedByCompany: $("#cbIsOwnedByCompany").prop("checked")
            , pIsLoaded:$("#Routing-formTruckingOrder #cbIsLoaded").prop("checked") 
            , pTrailerID: (!$("#cbIsOwnedByCompany").prop("checked") || $("#slTrailer" + RoutingSuffix).val() == "" ? 0 : $("#slTrailer" + RoutingSuffix).val())
            , pDriverID: (!$("#cbIsOwnedByCompany").prop("checked") || $("#slDriver" + RoutingSuffix).val() == "" ? 0 : $("#slDriver" + RoutingSuffix).val())
            , pDriverAssistantID: (!$("#cbIsOwnedByCompany").prop("checked") || $("#slDriverAssistant" + RoutingSuffix).val() == "" ? 0 : $("#slDriverAssistant" + RoutingSuffix).val())
            , pEquipmentID: $("#slEquipment" + RoutingSuffix).val() == "" ? 0 : $("#slEquipment" + RoutingSuffix).val()
            , pLoadingZoneID: $("#slRoutingsLoadingZone" + RoutingSuffix).val() == "" ? 0 : $("#slRoutingsLoadingZone" + RoutingSuffix).val()
            , pFirstCuringAreaID: $("#slRoutingsFirstCuringArea" + RoutingSuffix).val() == "" ? 0 : $("#slRoutingsFirstCuringArea" + RoutingSuffix).val()
            , pSecondCuringAreaID: $("#slRoutingsSecondCuringArea" + RoutingSuffix).val() == "" ? 0 : $("#slRoutingsSecondCuringArea" + RoutingSuffix).val()
            , pThirdCuringAreaID: $("#slRoutingsThirdCuringArea" + RoutingSuffix).val() == "" ? 0 : $("#slRoutingsThirdCuringArea" + RoutingSuffix).val()
            , pBillNumber: ''
            , pTruckingOrderCode: ''
            , pOffloadingDate: "01/01/1900"
            , pLastTruckCounter: 0
            , pTruckCounter: $('#txtRoutingTruckCounter').val() > 0 ? $('#txtRoutingTruckCounter').val() : 0
            , pConcedeCompanyName: RoutingSuffix == "CustomsClearance" ? IsNull($('#txtConcedeCompanyName').val(), '0') : '0'
            , pConcedeNumber: RoutingSuffix == "CustomsClearance" ? IsNull($('#txtConcedeNumber').val(), '0') : '0'
            , pConcedeTotalQty: RoutingSuffix == "CustomsClearance" ? IsNull($('#txtConcedeTotalQty').val(), 0) : 0
            , pConcedeQty: RoutingSuffix == "CustomsClearance" ? IsNull($('#txtConcedeQty').val(), 0) : 0
            , pWarehouseID: $('#slRoutingsWarehouse option:selected').val()
            , pCCApproveNo: RoutingSuffix == "CustomsClearance" ? IsNull($('#txtCCApproveNo').val(), '0') : '0'
            , pCCInvoiceNo: RoutingSuffix == "CustomsClearance" ? IsNull($('#txtCCInvoiceNo').val(), '0') : '0'
            , pCCTotalQty: RoutingSuffix == "CustomsClearance" ? IsNull($('#txtCCTotalQty').val(), 0) : 0
            , pCCSubtractQty: RoutingSuffix == "CustomsClearance" ? IsNull($('#txtCCSubtractQty').val(), 0) : 0
            , pCCNetQty: RoutingSuffix == "CustomsClearance" ? IsNull($('#txtCCNetQty').val(), 0) : 0
        };
        if (pDefaults.UnEditableCompanyName == "ELI" && RoutingSuffix == "TruckingOrder") {
            pParametersWithValues['pOperationNotes'] = IsNull($('#txtOperationNotesTruckingOrder').val(), IsNull($('#txtOperationNotes').val(), '0'));
        }
        if (pDefaults.UnEditableCompanyName == 'SSH' && RoutingSuffix == 'CustomsClearance') {
            pParametersWithValues.pInspectionDateReceived = ($("#txtInspectionDateReceivedCustomsClearance").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtInspectionDateReceivedCustomsClearance").val().trim()));
            pParametersWithValues.pPickupAddress = ($("#txtPickupAddressCustomsClearance").val().trim() == "" ? "0" : $("#txtPickupAddressCustomsClearance").val().trim().toUpperCase());
            pParametersWithValues.pInspectionDateDelivered = ($("#txtInspectionDateDeliveredCustomsClearance").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtInspectionDateDeliveredCustomsClearance").val().trim()));
            pParametersWithValues.pDeliveryAddress = ($("#txtDeliveryAddressCustomsClearance").val().trim() == "" ? "0" : $("#txtDeliveryAddressCustomsClearance").val().trim().toUpperCase());
            pParametersWithValues.pDeliveryDate = ($("#txtDeliveryDateCustomsClearance").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtDeliveryDateCustomsClearance").val().trim()));
            pParametersWithValues.pDeliveryOrderNumber = ($("#txtDeliveryOrderNumberCustomsClearance").val().trim() == "" ? "0" : $("#txtDeliveryOrderNumberCustomsClearance").val().trim().toUpperCase());
            pParametersWithValues.pRoadNumber = ($("#txtRoadNumberCustomsClearance").val().trim() == "" ? "0" : $("#txtRoadNumberCustomsClearance").val().trim().toUpperCase());
            pParametersWithValues.pIsLoaded = $('#cbIsLoadedCustomsClearance').is(':checked');
        }
        debugger;
        CallPOSTFunctionWithParameters("/api/Routings/Insert", pParametersWithValues
            , function (pData) {
                var pSavedRoute = JSON.parse(pData[0]);
                var pRoutings = JSON.parse(pData[1]);
                Routings_BindTableRows(pRoutings);
                //set lblRouting,..... incase of changing MainCarraige Type
                if ($("#slRoutingTypes" + RoutingSuffix + " option:selected").val() == MainCarraigeRoutingTypeID) {
                    $("#lblRouting" + RoutingSuffix).html(" : " + $("#slRoutingsPOL" + RoutingSuffix + " option:selected").text() + " > " + $("#slRoutingsPOD" + RoutingSuffix + " option:selected").text());
                    $("#hPOLCountryID" + RoutingSuffix).val($('#slRoutingsPOLCountries' + RoutingSuffix + ' option:selected').val());
                    $("#hPODCountryID" + RoutingSuffix).val($('#slRoutingsPODCountries' + RoutingSuffix + ' option:selected').val());
                    $("#hPOL").val($('#slRoutingsPOL' + RoutingSuffix + ' option:selected').val());
                    $("#hPOD").val($('#slRoutingsPOD' + RoutingSuffix + ' option:selected').val());
                    $("#hShippingLineID").val($("#hRoutingTransportType" + RoutingSuffix).val() == OceanTransportType ? $('#slRoutingsLines' + RoutingSuffix + ' option:selected').val() : 0);
                    $("#hAirlineID").val($("#hRoutingTransportType" + RoutingSuffix).val() == AirTransportType ? $("#slRoutingsLines" + RoutingSuffix).val() : 0);
                    $("#hTruckerID").val($("#hRoutingTransportType" + RoutingSuffix).val() == InlandTransportType ? $("#slRoutingsLines" + RoutingSuffix).val() : 0);
                }
                $("#hRoutingID" + RoutingSuffix).val(pSavedRoute.ID);
                if (RoutingSuffix != "CustomsClearance")
                    jQuery("#" + "RoutingModal" + RoutingSuffix).modal("hide");
                swal("Success", "Saved successfully,");
                FadePageCover(false);

                if (pDefaults.UnEditableCompanyName == "ELI" && RoutingSuffix == "TruckingOrder") {
                    $('#txtOperationNotes').val($('#txtOperationNotesTruckingOrder').val());
                }
                //Create Trucking Order On Fleet Elite
                if (['ELI','ELC','SSH'].includes(pDefaults.UnEditableCompanyName) && pSavedRoute && pSavedRoute.ID > 0 && pSavedRoute.RoutingTypeID == 60) {
                    SaveTruckingOrder_FleetElite(pSavedRoute);
                }
            }
            , null);
    }
}
function Routings_Update(pSaveandAddNew) {
    debugger;
    if (pDefaults.UnEditableCompanyName == "NIL") {
        nileTable = exportTableToJSON();
        nileTable2 = exportTableToJSON2();
        nileTable3 = exportTableToJSON3();
        nileTable4 = exportTableToJSON4();
        trackingNil = exportTableToJSONTrack();
    }
    else if (pDefaults.UnEditableCompanyName == 'SSH') {
        nileTable3 = exportTableToJSON3();
    }
    //if (pDefaults.UnEditableCompanyName == "BOM") {


    //    let pWhereClause = "WHERE 1=1 " + " \n"; pWhereClause += " AND (CertificateNumber=N'" + $("#txtCertificateNumber").val().trim().toUpperCase() + "') "; pWhereClause += " AND (id!=" + $("#hRoutingID" + RoutingSuffix).val() + ") ";
    //    let pWhereClause_Routings = "0";
    //    pWhereClause_Routings = "0";
    //    let pOrderBy = " ID DESC ";
    //    let pParametersWithValues = {
    //        pIsLoadArrayOfObjects: false
    //        , pPageNumber: 1
    //        , pPageSize: '10'
    //        , pWhereClause: pWhereClause
    //        , pIsBindTableRows: false
    //        , pWhereClause_Routings: pWhereClause_Routings
    //        , pOrderBy: pOrderBy
    //        , pCallingControl: "OperationsManagement_BindTableRows"
    //    }
    //    CallGETFunctionWithParameters("api/Routings/LoadWithWhereClause", pParametersWithValues, function (pData) {

    //        $.each((JSON.parse(pData[0])), function (i, item) {
    //            CertificateNumberCOUNT += 1;

    //        });

    //    }, null, false/*Default true*/);



    //}
   
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

    //else if (pDefaults.UnEditableCompanyName == "BOM" && CertificateNumberCOUNT > 0) {
    //    swal("Sorry", "CertificateNumber must be unique.");
    //    $("#btnSaveOperation").removeAttr("disabled", "disabled");
    //    CertificateNumberCOUNT = 0;
    //    return;
//}
    else if (pDefaults.UnEditableCompanyName == "MAN" && $('#txtActualDeparture').val() != '' && $('#txtOBL').val() == '' && $("#hTransportType").val() == 1) {
        swal("Sorry", "ATD POL cannot be inserted with out Master B/L No");
        
        return;
    } else if (pDefaults.UnEditableCompanyName == "MAN" && $('#txtActualDeparture').val() != '' && $('#txtMAWBSuffix').val() == '' && $("#hTransportType").val()==2) {
        swal("Sorry", "ATD POL cannot be inserted with out Master B/L No");
        
        return;
    }
    else if (ValidateForm("form", "RoutingModal" + RoutingSuffix)) {
        if (pDefaults.UnEditableCompanyName == "USC" && RoutingSuffix == "TruckingOrder") {
            let gateOutDate = $('#txtTruckingOrderGateOutDateTruckingOrder').val() == "" ? "01/01/1900" : $('#txtTruckingOrderGateOutDateTruckingOrder').val();
            let stuffingDate = $('#txtTruckingOrderStuffingDateTruckingOrder').val() == "" ? "01/01/1900" : $('#txtTruckingOrderStuffingDateTruckingOrder').val();
            let gateInDate = $('#txtTruckingOrderGateInDateTruckingOrder').val() == "" ? "01/01/1900" : $('#txtTruckingOrderGateInDateTruckingOrder').val();

            const isOrderCorrect = areDatesInOrderAA(gateOutDate, stuffingDate, gateInDate);
            if (!isOrderCorrect) {
                swal("Sorry", "Please Check Dates (Gate out, Stuffing, Gate In)")
                return;
            }
        }
        FadePageCover(true);
        var pParametersWithValues = {
            pID: $("#hRoutingID" + RoutingSuffix).val()
            , pOperationID: $("#hOperationID").val()
            , pRoutingTypeID: $('#slRoutingTypes' + RoutingSuffix + ' option:selected').val()
            , pTransportTypeID: $("#hRoutingTransportType" + RoutingSuffix).val()
            , pTransportIconName: $("#hRoutingTransportIconName" + RoutingSuffix).val()
            , pTransportIconStyle: $("#hRoutingTransportIconStyle" + RoutingSuffix).val()

            , pPOLCountryID: RoutingSuffix == "CustomsClearance" ? $("#hPOLCountryID").val() : $('#slRoutingsPOLCountries' + RoutingSuffix + ' option:selected').val()
            , pPODCountryID: RoutingSuffix == "CustomsClearance" ? $("#hPODCountryID").val() : $('#slRoutingsPODCountries' + RoutingSuffix + ' option:selected').val()
            , pPOLID: RoutingSuffix == "CustomsClearance" ? $("#hPOL").val() : $('#slRoutingsPOL' + RoutingSuffix + ' option:selected').val()
            , pPODID: RoutingSuffix == "CustomsClearance" ? $("#hPOL").val() : $('#slRoutingsPOD' + RoutingSuffix + ' option:selected').val()

            , pPickupAddress: (RoutingSuffix == "CustomsClearance" || $("#txtPickupAddress" + RoutingSuffix).val().trim() == "" ? "0" : $("#txtPickupAddress" + RoutingSuffix).val().trim().toUpperCase())
            , pDeliveryAddress:  (RoutingSuffix == "CustomsClearance" || $("#txtDeliveryAddress" + RoutingSuffix).val().trim() == "" ? "0" : $("#txtDeliveryAddress" + RoutingSuffix).val().trim().toUpperCase())

            , pETAPOLDate: (RoutingSuffix == "CustomsClearance" || $("#txtETAPOLDate" + RoutingSuffix).val() == "" || ($("#hBLType").val() == constHouseBLType && $("#slRoutingTypes" + RoutingSuffix).val() == MainCarraigeRoutingTypeID) ? "01/01/1900" : ConvertDateFormat($("#txtETAPOLDate" + RoutingSuffix).val()))
            , pATAPOLDate: (RoutingSuffix == "CustomsClearance" || $("#txtATAPOLDate" + RoutingSuffix).val() == "" || ($("#hBLType").val() == constHouseBLType && $("#slRoutingTypes" + RoutingSuffix).val() == MainCarraigeRoutingTypeID) ? "01/01/1900" : ConvertDateFormat($("#txtATAPOLDate" + RoutingSuffix).val()))
            , pExpectedArrival: (RoutingSuffix == "CustomsClearance" || $("#txtExpectedArrival" + RoutingSuffix).val() == "" || ($("#hBLType").val() == constHouseBLType && $("#slRoutingTypes" + RoutingSuffix).val() == MainCarraigeRoutingTypeID) ? "01/01/1900" : ConvertDateFormat($("#txtExpectedArrival" + RoutingSuffix).val()))
            , pExpectedDeparture: (RoutingSuffix == "CustomsClearance" || $("#txtExpectedDeparture" + RoutingSuffix).val() == "" || ($("#hBLType").val() == constHouseBLType && $("#slRoutingTypes" + RoutingSuffix).val() == MainCarraigeRoutingTypeID) ? "01/01/1900" : ConvertDateFormat($("#txtExpectedDeparture" + RoutingSuffix).val()))
            , pActualArrival: (RoutingSuffix == "CustomsClearance" || $("#txtActualArrival" + RoutingSuffix).val() == "" || ($("#hBLType").val() == constHouseBLType && $("#slRoutingTypes" + RoutingSuffix).val() == MainCarraigeRoutingTypeID) ? "01/01/1900" : ConvertDateFormat($("#txtActualArrival" + RoutingSuffix).val()))
            , pActualDeparture: (RoutingSuffix == "CustomsClearance" || $("#txtActualDeparture" + RoutingSuffix).val() == "" || ($("#hBLType").val() == constHouseBLType && $("#slRoutingTypes" + RoutingSuffix).val() == MainCarraigeRoutingTypeID) ? "01/01/1900" : ConvertDateFormat($("#txtActualDeparture" + RoutingSuffix).val()))
            //********************************************* */
            , pCutoffDate: (RoutingSuffix == "CustomsClearance" || $("#txtCutoffDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtCutoffDate").val()))
            //********************************************* */

            , pShippingLineID: (RoutingSuffix == "CustomsClearance")
                ? 0
                : ($("#hRoutingTransportType" + RoutingSuffix).val() == OceanTransportType
                    ? ($('#slRoutingsLines' + RoutingSuffix + ' option:selected').val() == "" || ($("#hBLType").val() == constHouseBLType && $("#slRoutingTypes" + RoutingSuffix).val() == MainCarraigeRoutingTypeID) ? 0 : $('#slRoutingsLines' + RoutingSuffix + ' option:selected').val())
                    : 0)
            , pAirlineID: (RoutingSuffix == "CustomsClearance")
                ? 0
                : ($("#hRoutingTransportType" + RoutingSuffix).val() == AirTransportType
                    ? ($('#slRoutingsLines' + RoutingSuffix + ' option:selected').val() == "" || ($("#hBLType").val() == constHouseBLType && $("#slRoutingTypes" + RoutingSuffix).val() == MainCarraigeRoutingTypeID) ? 0 : $('#slRoutingsLines' + RoutingSuffix + ' option:selected').val())
                    : 0)
            , pTruckerID: (RoutingSuffix == "CustomsClearance")
                ? ($('#slRoutingsLines' + RoutingSuffix + ' option:selected').val() == "" ? 0 : $('#slRoutingsLines' + RoutingSuffix + ' option:selected').val())
                : ($("#hRoutingTransportType" + RoutingSuffix).val() == InlandTransportType
                    ? (($('#slRoutingsLines' + RoutingSuffix + ' option:selected').val() == "" || ($("#hBLType").val() == constHouseBLType && $("#slRoutingTypes" + RoutingSuffix).val() == MainCarraigeRoutingTypeID)) ? 0 : $('#slRoutingsLines' + RoutingSuffix + ' option:selected').val())
                    : 0)
            , pVesselID: (RoutingSuffix == "CustomsClearance")
                ? 0
                : ($("#hRoutingTransportType" + RoutingSuffix).val() == OceanTransportType
                    ? ($('#slRoutingVessels' + RoutingSuffix + ' option:selected').val() == "" ? 0 : $('#slRoutingVessels' + RoutingSuffix + ' option:selected').val())
                    : 0)
            , pVoyageOrTruckNumber: (pDefaults.UnEditableCompanyName == "NIL" && RoutingSuffix == "CustomsClearance" ? nileTable : ($("#cbIsOwnedByCompany").prop("checked") || RoutingSuffix == "CustomsClearance" || $("#txtRoutingVoyageOrTruckNumber" + RoutingSuffix).val().trim() == "" ? "0" : $("#txtRoutingVoyageOrTruckNumber" + RoutingSuffix).val().trim().toUpperCase()))
            , pCustomerWarehouseMangerName: (pDefaults.UnEditableCompanyName == "NIL" && RoutingSuffix == "CustomsClearance" ? $('#txtCargoInvoiceValue').val()  : ($("#txtRoutingpCustomerWarehouseManagerNameTruckingOrder").val().trim() == "" ? "0" : $("#txtRoutingpCustomerWarehouseManagerNameTruckingOrder").val().trim().toUpperCase()))
            , PCustomerWarehouseMangerPhone: (pDefaults.UnEditableCompanyName == "NIL" && RoutingSuffix == "CustomsClearance" ? $('#txtAdditionalChargesRevaluationPenaltyFees').val() : ($("#txtRoutingpCustomerWarehouseManagerPhoneTruckingOrder").val().trim() == "" ? "0" : $("#txtRoutingpCustomerWarehouseManagerPhoneTruckingOrder").val().trim().toUpperCase()))
            , pTruckingEquipmentID: $('#slRoutingsTruckingEquipmentModelsTruckingOrder option:selected').val() == "" ? 0 : $('#slRoutingsTruckingEquipmentModelsTruckingOrder option:selected').val()
            , pTransientTime: RoutingSuffix == "CustomsClearance" || $("#txtRoutingTransientTime" + RoutingSuffix).val().trim() == "" ? 0 : $("#txtRoutingTransientTime" + RoutingSuffix).val()
            , pValidity: RoutingSuffix == "CustomsClearance" || $("#txtRoutingValidity" + RoutingSuffix).val().trim() == "" ? 0 : $("#txtRoutingValidity" + RoutingSuffix).val()
            , pFreeTime: RoutingSuffix == "CustomsClearance" || $("#txtRoutingFreeTime" + RoutingSuffix).val().trim() == "" ? 0 : $("#txtRoutingFreeTime" + RoutingSuffix).val()
            , pNotes: $("#txtRoutingNotes" + RoutingSuffix).val().toUpperCase()
            , pBLType: $("#hBLType").val()
            , pMasterBL: RoutingSuffix == "CustomsClearance" ? 0 : Routings_GetMasterBL()
            , pBLDate: RoutingSuffix == "CustomsClearance" ? "01/01/1900" : Routings_GetpBLDate() // in the controller it will be saved just in case its Main And Not House
            , pMAWBSuffix: (RoutingSuffix == "CustomsClearance" || $("#txtMAWBSuffix" + RoutingSuffix).val().trim() == "" ? 0 : $("#txtMAWBSuffix" + RoutingSuffix).val().trim())
            , pNumberOfHousesConnected: $("#hNumberOfHousesConnected").val()//used in the controller to be compared to NumberOfHousesConnected retrieved from DB at time of save to handle other sessions changes

            , pGensetSupplierID: RoutingSuffix == "CustomsClearance" || $("#slTruckingOrderGensetSupplier" + RoutingSuffix).val() == "" ? 0 : $("#slTruckingOrderGensetSupplier" + RoutingSuffix).val()
            , pCCAID: $("#slRoutingCCA" + RoutingSuffix).val() == "" ? 0 : $("#slRoutingCCA" + RoutingSuffix).val()
            , pQuantity: (pDefaults.UnEditableCompanyName == "NIL" && RoutingSuffix == "CustomsClearance" ? nileTable2 : (RoutingSuffix == "CustomsClearance" || $("#txtTruckingOrderQuantity" + RoutingSuffix).val().trim() == "" ? 0 : $("#txtTruckingOrderQuantity" + RoutingSuffix).val().trim().toUpperCase()))
            , pContactPerson: (pDefaults.UnEditableCompanyName == "NIL" && RoutingSuffix == "CustomsClearance" ? $('#txtExemptionBy').val() : ( RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckingOrderContactPerson" + RoutingSuffix).val().trim().toUpperCase()))
            , pTruckingOrderPickupAddress: RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckingOrderPickupAddress" + RoutingSuffix).val().trim().toUpperCase()
            , pTruckingOrderDeliveryAddress: (pDefaults.UnEditableCompanyName == "NIL" && RoutingSuffix == "CustomsClearance" ? $('#txtExemptionByDescription').val() : (RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckingOrderDeliveryAddress" + RoutingSuffix).val().trim().toUpperCase()))
            , pGateInPortID: RoutingSuffix == "CustomsClearance" || $("#slTruckingOrderGateInPort" + RoutingSuffix).val() == "" || $("#slTruckingOrderGateInPort" + RoutingSuffix).val() == null ? 0 : $("#slTruckingOrderGateInPort" + RoutingSuffix).val()
            , pGateOutPortID: RoutingSuffix == "CustomsClearance" || $("#slTruckingOrderGateOutPort" + RoutingSuffix).val() == "" || $("#slTruckingOrderGateOutPort" + RoutingSuffix).val() == null ? 0 : $("#slTruckingOrderGateOutPort" + RoutingSuffix).val()
            , pGateInDate: (RoutingSuffix == "CustomsClearance" || $("#txtTruckingOrderGateInDate" + RoutingSuffix).val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTruckingOrderGateInDate" + RoutingSuffix).val()))
            /****************************TransportOrder**************************/
            , pCustomerID: RoutingSuffix != "CustomsClearance" || $("#slCustomerCustomsClearance").val() == "" ? 0 : $("#slCustomerCustomsClearance").val()
            , pSubContractedCustomerID: 0
            , pCost: 0
            , pSale: 0
            , pIsFleet: false
            , pLoadingDate: $("#txtLoadingDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtLoadingDate").val())
            , pLoadingReference: 0
            // pUnloadingDate is Sailing Date in NAJ
            , pUnloadingDate: $("#txtUnloadingDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtUnloadingDate").val())
            , pUnloadingReference: 0
            , pUnloadingTime: $("#txtUnloadingTime").val().trim() == "" ? 0 : $("#txtUnloadingTime").val().trim().toUpperCase()
            , pQuotationRouteID: 0
            , pTrContainerTypeID: RoutingSuffix == "TruckingOrder" ? $('#slTruckingOrderContainerTypesTruckingOrder').val() : 0
            , pTrNumberOfContainers: RoutingSuffix == "TruckingOrder" ? $('#txtTruckingOrderNumberOfContainersTruckingOrder').val() : 0
            , pCommodityID: RoutingSuffix == "TruckingOrder" ? $('#slTruckingOrderContainerTypes2TruckingOrder').val() : 0
            , pMaxSupplierContainers: RoutingSuffix == "TruckingOrder" ? $('#txtTruckingOrderNumberOfContainers2TruckingOrder').val() : 0
            /****************************TransportOrder**************************/
            , pGateOutDate: (RoutingSuffix == "CustomsClearance" || $("#txtTruckingOrderGateOutDate" + RoutingSuffix).val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTruckingOrderGateOutDate" + RoutingSuffix).val()))
            , pStuffingDate: (RoutingSuffix == "CustomsClearance" || $("#txtTruckingOrderStuffingDate" + RoutingSuffix).val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTruckingOrderStuffingDate" + RoutingSuffix).val()))
            , pDeliveryDate: (RoutingSuffix == "CustomsClearance" || $("#txtTruckingOrderDeliveryDate" + RoutingSuffix).val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTruckingOrderDeliveryDate" + RoutingSuffix).val()))
            , pBookingNumber: RoutingSuffix == "CustomsClearance" ? ($("#txtCCBookingNumber").val().trim() == "" ? 0 : $("#txtCCBookingNumber").val().trim().toUpperCase()) : $("#txtTruckingOrderBookingNumber" + RoutingSuffix).val().trim().toUpperCase()
            , pDelays: (pDefaults.UnEditableCompanyName == "NIL" && RoutingSuffix == "CustomsClearance" ? $('#txtBLNo').val() : (RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckingOrderDelays" + RoutingSuffix).val().trim().toUpperCase()))
            , pDriverName: ($("#cbIsOwnedByCompany").prop("checked") || RoutingSuffix == "CustomsClearance") ? 0 : $("#txtTruckingOrderDriverName" + RoutingSuffix).val().trim().toUpperCase()
            , pDriverPhones: ($("#cbIsOwnedByCompany").prop("checked") || RoutingSuffix == "CustomsClearance") ? 0 : $("#txtTruckingOrderDriverPhones" + RoutingSuffix).val().trim().toUpperCase()
            , pPowerFromGateInTillActualSailing: (['NIL', 'SSH'].includes(pDefaults.UnEditableCompanyName) && RoutingSuffix == "CustomsClearance" ? nileTable3 : (RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckingOrderPowerFromGateInTillActualSailing" + RoutingSuffix).val().trim().toUpperCase()))

            , pContactPersonPhones: (pDefaults.UnEditableCompanyName == "NIL" ? (RoutingSuffix == "CustomsClearance" ? nileTable4 : (RoutingSuffix != "TruckingOrder" ? $('#slFlightRoute').val() : $("#txtTruckingOrderContactPersonPhones" + RoutingSuffix).val().trim().toUpperCase() )) : (RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckingOrderContactPersonPhones" + RoutingSuffix).val().trim().toUpperCase())) 
            , pLoadingTime: (pDefaults.UnEditableCompanyName == "NIL" ? $('#slFreightCharges').val() : ( RoutingSuffix == "CustomsClearance" ? 0 : $("#txtTruckingOrderLoadingTime" + RoutingSuffix).val().trim().toUpperCase()))

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
            , pCertificateValue: (pDefaults.UnEditableCompanyName == "NIL" && RoutingSuffix == "TruckingOrder" ? trackingNil : (RoutingSuffix != "CustomsClearance" || $("#txtCertificateValue").val().trim() == "" ? 0 : $("#txtCertificateValue").val().trim().toUpperCase()))
            , pCertificateDate: (RoutingSuffix != "CustomsClearance" || $("#txtCertificateDate").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtCertificateDate").val().trim()))
            , pQasimaNumber: RoutingSuffix != "CustomsClearance" || $("#txtQasimaNumber").val().trim() == "" ? 0 : $("#txtQasimaNumber").val().trim().toUpperCase()
            , pQasimaDate: (RoutingSuffix != "CustomsClearance" || $("#txtQasimaDate").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtQasimaDate").val().trim()))
            , pMatch: RoutingSuffix != "CustomsClearance" || $("#match").prop("checked")

            , pCCMainWarehouseID: RoutingSuffix != "CustomsClearance" || $("#slWarehouseCustomsClearance").val() == "" ? 0 : $("#slWarehouseCustomsClearance").val()
            , pCCWarehouseETA: ($("#txtWarehouseETA").val() == "" || RoutingSuffix != "CustomsClearance" ? "01/01/1900" : ConvertDateFormat($("#txtWarehouseETA").val().trim()))
            , pCCWarehouseATD: ($("#txtWarehouseATD").val() == "" || RoutingSuffix != "CustomsClearance" ? "01/01/1900" : ConvertDateFormat($("#txtWarehouseATD").val().trim()))
            , pCCIsDone: $("#cbCCIsDone").prop("checked")

            , pSalesDateReceived: (RoutingSuffix != "CustomsClearance" || $("#txtSalesDateReceived").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtSalesDateReceived").val().trim()))
            , pSalesDateDelivered: (RoutingSuffix != "CustomsClearance" || $("#txtSalesDateDelivered").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtSalesDateDelivered").val().trim()))
            , pCommerceDateReceived: (RoutingSuffix != "CustomsClearance" || $("#txtCommerceDateReceived").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtCommerceDateReceived").val().trim()))
            , pCommerceDateDelivered: (RoutingSuffix != "CustomsClearance" || $("#txtCommerceDateDelivered").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtCommerceDateDelivered").val().trim()))
            , pInspectionDateReceived: (RoutingSuffix != "CustomsClearance" || $("#txtInspectionDateReceived").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtInspectionDateReceived").val().trim()))
            , pInspectionDateDelivered: (RoutingSuffix != "CustomsClearance" || $("#txtInspectionDateDelivered").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtInspectionDateDelivered").val().trim()))
            , pFinishDateReceived: (RoutingSuffix != "CustomsClearance" || $("#txtFinishDateReceived").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtFinishDateReceived").val().trim()))
            , pFinishDateDelivered: (RoutingSuffix != "CustomsClearance" || $("#txtFinishDateDelivered").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtFinishDateDelivered").val().trim()))


            , pCCDropBackReceived: ((RoutingSuffix != "CustomsClearance" || $("#txtCCDropBackReceived").val().trim() == "") ? "01/01/1900" : ConvertDateFormat($("#txtCCDropBackReceived").val().trim()))
            , pCCDropBackDelivered: ((RoutingSuffix != "CustomsClearance" || $("#txtCCDropBackDelivered").val().trim() == "") ? "01/01/1900" : ConvertDateFormat($("#txtCCDropBackDelivered").val().trim()))
            , pCCAllowTemporaryReceived: ((RoutingSuffix != "CustomsClearance" || $("#txtCCAllowTemporaryReceived").val().trim() == "") ? "01/01/1900" : ConvertDateFormat($("#txtCCAllowTemporaryReceived").val().trim()))
            , pCCAllowTemporaryDelivered: ((RoutingSuffix != "CustomsClearance" || $("#txtCCAllowTemporaryDelivered").val().trim() == "") ? "01/01/1900" : ConvertDateFormat($("#txtCCAllowTemporaryDelivered").val().trim()))
            , pCC_ClearanceTypeID: RoutingSuffix != "CustomsClearance" || $("#slCC_ClearanceTypeID").val().trim() == "" ? 0 : $("#slCC_ClearanceTypeID").val().trim().toUpperCase()
            , pCC_CustomItemsID: RoutingSuffix != "CustomsClearance" || $("#slCC_CustomItemsID").val().trim() == "" ? 0 : $("#slCC_CustomItemsID").val().trim().toUpperCase()
            , pCCReleaseNo: RoutingSuffix != "CustomsClearance" || IsNull($("#txtCCReleaseNo").val().trim(), "") == "" ? 0 : $("#txtCCReleaseNo").val()
            , pRoadNumber:
                (
                    (pDefaults.UnEditableCompanyName == 'BAL' || pDefaults.UnEditableCompanyName == 'MAR')?
                        (
                          (  $("#txtRoutingRoadNumber" + RoutingSuffix).val().trim() == "" ?
                                "0"
                                :
                                $("#txtRoutingRoadNumber").val().trim().toUpperCase()
                          )
                        )
                        :
                        (IsNull($('#txtRoadNumber' + RoutingSuffix).val(), '0').trim())
                ) //(RoutingSuffix != "" || $("#txtRoutingRoadNumber" + RoutingSuffix).val().trim() == "" ? "0" : $("#txtRoutingRoadNumber").val().trim().toUpperCase())
            , pDeliveryOrderNumber: (RoutingSuffix != "" || $("#txtRoutingDeliveryOrderNumber" + RoutingSuffix).val().trim() == "" ? "0" : $("#txtRoutingDeliveryOrderNumber").val().trim().toUpperCase())
            , pWareHouse: (pDefaults.UnEditableCompanyName == "NIL" ? $('#slNoOfOriginals').val() : (RoutingSuffix != "" || $("#txtRoutingWareHouse" + RoutingSuffix).val().trim() == "" ? "0" : $("#txtRoutingWareHouse").val().trim().toUpperCase()))
            , pWareHouseLocation: (pDefaults.UnEditableCompanyName == "NIL" && RoutingSuffix == "CustomsClearance" ? $('#txtCustomsLocation').val() : (RoutingSuffix != "" || $("#txtRoutingWareHouseLocation" + RoutingSuffix).val().trim() == "" ? "0" : $("#txtRoutingWareHouseLocation").val().trim().toUpperCase()))

            , pIsOwnedByCompany: $("#cbIsOwnedByCompany").prop("checked")
            , pIsLoaded: (pDefaults.UnEditableCompanyName == 'ELI' ? $("#cbIsShipsGo").prop("checked") : $("#Routing-formTruckingOrder #cbIsLoaded").prop("checked"))
            , pTrailerID: (!$("#cbIsOwnedByCompany").prop("checked") || $("#slTrailer" + RoutingSuffix).val() == "" ? 0 : $("#slTrailer" + RoutingSuffix).val())
            , pDriverID: (!$("#cbIsOwnedByCompany").prop("checked") || $("#slDriver" + RoutingSuffix).val() == "" ? 0 : $("#slDriver" + RoutingSuffix).val())
            , pDriverAssistantID: (!$("#cbIsOwnedByCompany").prop("checked") || $("#slDriverAssistant" + RoutingSuffix).val() == "" ? 0 : $("#slDriverAssistant" + RoutingSuffix).val())
            , pEquipmentID: $("#slEquipment" + RoutingSuffix).val() == "" ? 0 : $("#slEquipment" + RoutingSuffix).val()
            , pLoadingZoneID: $("#slRoutingsLoadingZone" + RoutingSuffix).val() == "" ? 0 : $("#slRoutingsLoadingZone" + RoutingSuffix).val()
            , pFirstCuringAreaID: $("#slRoutingsFirstCuringArea" + RoutingSuffix).val() == "" ? 0 : $("#slRoutingsFirstCuringArea" + RoutingSuffix).val()
            , pSecondCuringAreaID: $("#slRoutingsSecondCuringArea" + RoutingSuffix).val() == "" ? 0 : $("#slRoutingsSecondCuringArea" + RoutingSuffix).val()
            , pThirdCuringAreaID: $("#slRoutingsThirdCuringArea" + RoutingSuffix).val() == "" ? 0 : $("#slRoutingsThirdCuringArea" + RoutingSuffix).val()
            , pBillNumber: RoutingSuffix == "CustomsClearance" || $("#txtBillNumber" + RoutingSuffix).val() == undefined ? 0 : $("#txtBillNumber" + RoutingSuffix).val().trim().toUpperCase()
            , pTruckingOrderCode: ''
            , pOffloadingDate: "01/01/1900"
            , pLastTruckCounter: 0
            , pTruckCounter: $('#txtRoutingTruckCounter').val() > 0 ? $('#txtRoutingTruckCounter').val():0
            , pConcedeCompanyName: RoutingSuffix == "CustomsClearance" ? IsNull($('#txtConcedeCompanyName').val(), '0') : '0'
            , pConcedeNumber: RoutingSuffix == "CustomsClearance" ? IsNull($('#txtConcedeNumber').val(), '0') : '0'
            , pConcedeTotalQty: RoutingSuffix == "CustomsClearance" ? IsNull($('#txtConcedeTotalQty').val(), 0) : 0
            , pConcedeQty: RoutingSuffix == "CustomsClearance" ? IsNull($('#txtConcedeQty').val(), 0) : 0
            , pWarehouseID: $('#slRoutingsWarehouse option:selected').val()
            , pCCApproveNo: RoutingSuffix == "CustomsClearance" ? IsNull($('#txtCCApproveNo').val(), '0') : '0'
            , pCCInvoiceNo: RoutingSuffix == "CustomsClearance" ? IsNull($('#txtCCInvoiceNo').val(), '0') : '0'
            , pCCTotalQty: RoutingSuffix == "CustomsClearance" ? IsNull($('#txtCCTotalQty').val(), 0) : 0
            , pCCSubtractQty: RoutingSuffix == "CustomsClearance" ? IsNull($('#txtCCSubtractQty').val(), 0) : 0
            , pCCNetQty: RoutingSuffix == "CustomsClearance" ? IsNull($('#txtCCNetQty').val(), 0) : 0
        };
        if (pDefaults.UnEditableCompanyName == "ELI" && RoutingSuffix == "TruckingOrder") {
            pParametersWithValues['pOperationNotes'] = IsNull($('#txtOperationNotesTruckingOrder').val(), IsNull($('#txtOperationNotes').val(), '0'));
        }
        if (pDefaults.UnEditableCompanyName == "USC" && pParametersWithValues.pTruckerID == 0) {
            pParametersWithValues.pTruckerID = parseInt(pOperationHeader_Global.TruckerID);
        }
        if (pDefaults.UnEditableCompanyName == "UNF" || pDefaults.UnEditableCompanyName == "NTM" || pDefaults.UnEditableCompanyName == "DGL" || pDefaults.UnEditableCompanyName == "DGL") {
            pParametersWithValues.pRoadNumber= IsNull($('#txtRoutingRoadNumber' + RoutingSuffix).val(), '0').trim() //(RoutingSuffix != "" || $("#txtRoutingRoadNumber" + RoutingSuffix).val().trim() == "" ? "0" : $("#txtRoutingRoadNumber").val().trim().toUpperCase())
        }
        if (pDefaults.UnEditableCompanyName == 'SSH' && RoutingSuffix =='CustomsClearance') {
            pParametersWithValues.pInspectionDateReceived = ($("#txtInspectionDateReceivedCustomsClearance").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtInspectionDateReceivedCustomsClearance").val().trim()));
            pParametersWithValues.pPickupAddress = ($("#txtPickupAddressCustomsClearance").val().trim() == "" ? "0" : $("#txtPickupAddressCustomsClearance").val().trim().toUpperCase());
            pParametersWithValues.pInspectionDateDelivered = ($("#txtInspectionDateDeliveredCustomsClearance").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtInspectionDateDeliveredCustomsClearance").val().trim()));
            pParametersWithValues.pDeliveryAddress = ($("#txtDeliveryAddressCustomsClearance").val().trim() == "" ? "0" : $("#txtDeliveryAddressCustomsClearance").val().trim().toUpperCase());
            pParametersWithValues.pDeliveryDate = ($("#txtDeliveryDateCustomsClearance").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtDeliveryDateCustomsClearance").val().trim()));
            pParametersWithValues.pDeliveryOrderNumber = ($("#txtDeliveryOrderNumberCustomsClearance").val().trim() == "" ? "0" : $("#txtDeliveryOrderNumberCustomsClearance").val().trim().toUpperCase());
            pParametersWithValues.pRoadNumber = ($("#txtRoadNumberCustomsClearance").val().trim() == "" ? "0" : $("#txtRoadNumberCustomsClearance").val().trim().toUpperCase());
            pParametersWithValues.pIsLoaded = $('#cbIsLoadedCustomsClearance').is(':checked');
        }
        CallPOSTFunctionWithParameters("/api/Routings/Update", pParametersWithValues
            , function (pData) {
                var pSavedRoute = JSON.parse(pData[2]);
                var pRoutings = JSON.parse(pData[3]);
                if (pData[1] != "") //pData[1]: is a message returned from controller in case of change in another session that prevents saving main route
                    swal(strSorry, pData[1]);
                else {

                    //Update Trucking Order On Fleet Elite
                    if (['ELI', 'ELC', 'SSH'].includes(pDefaults.UnEditableCompanyName) && pSavedRoute && pSavedRoute.ID > 0 && pSavedRoute.RoutingTypeID == 60) {
                        SaveTruckingOrder_FleetElite(pSavedRoute);
                    }

                    Routings_BindTableRows(pRoutings);
                    //set lblRouting,..... incase of changing MainCarraige Type
                    if ($("#slRoutingTypes" + RoutingSuffix + " option:selected").val() == MainCarraigeRoutingTypeID) {

                        if (IsMESCOCompany) {
                            var ExpectedDepartureComponents = $("#txtExpectedDeparture").val().split("/");
                            var day = parseInt(ExpectedDepartureComponents[0], 10);
                            var month = parseInt(ExpectedDepartureComponents[1], 10) - 1;
                            var year = parseInt(ExpectedDepartureComponents[2], 10);
                            var ExpectedDeparture = new Date(year, month, day);
                            pOperationHeader_Global.ExpectedDeparture = `/Date(${ExpectedDeparture.getTime()})/`;

                            var ExpectedArrivalComponents = $("#txtExpectedArrival").val().split("/");
                            day = parseInt(ExpectedArrivalComponents[0], 10);
                            month = parseInt(ExpectedArrivalComponents[1], 10) - 1;
                            year = parseInt(ExpectedArrivalComponents[2], 10);
                            var ExpectedArrival = new Date(year, month, day);
                            pOperationHeader_Global.ExpectedArrival = `/Date(${ExpectedArrival.getTime()})/`;
                        }
                        $("#lblRouting" + RoutingSuffix).html(" : " + $("#slRoutingsPOL" + RoutingSuffix + " option:selected").text().substring(0, 5) + " > " + $("#slRoutingsPOD" + RoutingSuffix + " option:selected").text().substring(0, 5));
                        if ($("#hBLType").val() != constHouseBLType) {
                            var x = Routings_GetMasterBL();
                            $("#lblMaster").html(" :" + (x == 0 ? "N/A" : x));
                            $("#hMasterBL").val(x);
                            if (pDefaults.UnEditableCompanyName == "MED") {
                                pOperationHeader_Global.MasterBL = x;
                            }
                        }
                        $("#hPOLCountryID").val($('#slRoutingsPOLCountries' + RoutingSuffix + ' option:selected').val());
                        $("#hPODCountryID").val($('#slRoutingsPODCountries' + RoutingSuffix + ' option:selected').val());
                        $("#hPOL").val($('#slRoutingsPOL' + RoutingSuffix + ' option:selected').val());
                        $("#hPOD").val($('#slRoutingsPOD' + RoutingSuffix + ' option:selected').val());

                        $("#hPickupAddress").val($('#txtPickupAddress' + RoutingSuffix).val().trim().toUpperCase());
                        $("#hDeliveryAddress").val($('#txtDeliveryAddress' + RoutingSuffix).val().trim().toUpperCase());

                        $("#hShippingLineID").val($("#hRoutingTransportType" + RoutingSuffix).val() == OceanTransportType ? $('#slRoutingsLines' + RoutingSuffix + ' option:selected').val() : 0);
                        $("#hAirlineID").val($("#hRoutingTransportType" + RoutingSuffix).val() == AirTransportType ? $("#slRoutingsLines" + RoutingSuffix).val() : 0);
                        $("#hTruckerID").val($("#hRoutingTransportType" + RoutingSuffix).val() == InlandTransportType ? $("#slRoutingsLines" + RoutingSuffix).val() : 0);

                        if ($("#hBLType").val() != constHouseBLType && $("#hTransportType").val() == AirTransportType) {//not house and air,(i am sure its main isa)
                            $("#hMAWBSuffix").val($("#txtMAWBSuffix" + RoutingSuffix).val().trim() == "" ? 0 : $("#txtMAWBSuffix" + RoutingSuffix).val().trim());
                            $("#hBLDate").val($("#txtMAWBDate" + RoutingSuffix).val().trim() == "" ? "01/01/1900" : $("#txtMAWBDate" + RoutingSuffix).val().trim());
                        }
                        if ($("#hBLType").val() != constHouseBLType && $("#hTransportType").val() != AirTransportType) {//not house and bot aie,(i am sure its main isa)
                            $("#hBLDate").val($("#txtOBLDate" + RoutingSuffix).val().trim() == "" ? "01/01/1900" : $("#txtOBLDate" + RoutingSuffix).val().trim());
                        }
                        //if ($("#hBLType").val() != constHouseBLType)
                        //    $("#hMasterBL").val(Routings_GetMasterBL());
                        //in the next condition, its already MainRoute Type
                        if ($("#hBLType").val() == constMasterBLType) //if its Master then i need to Reload Shipments for the case its a MainRoute
                            Shipments_LoadAvailableShipments();
                    }
                    $("#hRoutingID" + RoutingSuffix).val(pSavedRoute.ID);
                    if (RoutingSuffix != "CustomsClearance")
                        jQuery("#" + "RoutingModal" + RoutingSuffix).modal("hide");
                    swal("Success", "Saved successfully,");

                    if (pDefaults.UnEditableCompanyName == "ELI" && RoutingSuffix == "TruckingOrder") {
                        $('#txtOperationNotes').val($('#txtOperationNotesTruckingOrder').val());
                    }

                  

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
    var tr = $("#tblRoutings tr[ID='" + pID + "']");
    if ($(tr).find("td.RoutingType").attr("val") == MainCarraigeRoutingTypeID)
        RoutingSuffix = "";
    else if ($(tr).find("td.RoutingType").attr("val") == TruckingOrderRoutingTypeID)
        RoutingSuffix = "TruckingOrder";
    else if ($(tr).find("td.RoutingType").attr("val") == CustomsClearanceRoutingTypeID)
        RoutingSuffix = "CustomsClearance";
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
                        LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Routings/LoadWithWhereClause", " where OperationID = " + $("#hOperationID").val(), 0, 1000
                            , function (pData) {
                                Routings_BindTableRows(JSON.parse(pData[0]));
                            });
                    });
            });
}
function Routings_ClearAllControls(pRoutingTypeName) {
    debugger;
    if (pRoutingTypeName == "CustomsClearance" && $("#tblRoutings tbody td.RoutingType[val=" + CustomsClearanceRoutingTypeID + "]").length > 0)
        swal("Sorry", "The operation can have just one customs clearance record.");
    else {
        if (pRoutingTypeName == "CustomsClearance") {
            jQuery("#RoutingModalCustomsClearance").modal("show");
            Routings_FillRoutingModal(0);
        }
        ClearAll("#RoutingModalTruckingOrder"); //i want it cleared in all cases to use trucking control names
        if (pRoutingTypeName == "" || pRoutingTypeName == undefined)
            RoutingSuffix == "";
        else
            RoutingSuffix = pRoutingTypeName;
        if (pRoutingTypeName != "TruckingOrder") //otherwise then the modal is already cleared up
        {
            ClearAll("#RoutingModal" + RoutingSuffix);
        }
        //set to default values
        //$("#cbIsOceanRouting"+RoutingSuffix).prop('checked', true);
        $("#cbIsInlandRouting" + RoutingSuffix).prop('checked', true);
        $("#txtPickupAddress" + RoutingSuffix).val($("#hPickupAddress").val());
        $("#txtDeliveryAddress" + RoutingSuffix).val($("#hDeliveryAddress").val());
        $("#slTruckingOrderGateInPort" + RoutingSuffix).val("");
        $("#slTruckingOrderGateOutPort" + RoutingSuffix).val("");
        
        if (pDefaults.UnEditableCompanyName == "ELI") {
            $("#txtCCBookingNumber").val($("#txtOperationBookingNumber").val());
            $("#txtCertificateNumber").val($("#txtOperationForm13Number").val());
            $("#txtTruckingOrderBookingNumber" + RoutingSuffix).val($("#txtOperationBookingNumber").val());
        }

        if (pDefaults.UnEditableCompanyName == "ELI" && RoutingSuffix == "TruckingOrder") {
            $('#txtOperationNotesTruckingOrder').closest('div.form-group').removeClass('hide');
            $('#txtOperationNotesTruckingOrder').val($('#txtOperationNotes').val());
        }
        else {
            $('#txtOperationNotesTruckingOrder').closest('div.form-group').addClass('hide');
            $('#txtOperationNotesTruckingOrder').val('');
        }

        //GetListWithNameAndWhereClause(null, "/api/Suppliers/LoadAll", "<--Select-->", "slTruckingOrderGensetSupplier" + RoutingSuffix, "ORDER BY Name", null);
        //GetListWithNameAndWhereClause(null, "/api/CustomsClearanceAgents/LoadAll", "<--Select-->", "slRoutingCCA" + RoutingSuffix, "ORDER BY Name", null);
        Routings_ShowHideOwnedByCompanyProperties(false);
        if (RoutingSuffix == "TruckingOrder") {
            if (pDefaults.UnEditableCompanyName == "USC") {
                $('#txtTruckingOrderBookingNumberTruckingOrder').val($('#tblRoutings tr[val=30] td.BookingNumber').text());
                $('#txtTruckingOrderBookingNumberTruckingOrder').attr("disabled", "disabled");
                CallGETFunctionWithParameters("api/OperationContainersAndPackages/LoadWithWhereClause", { pPageNumber: 1, pPageSize: 1, pWhereClause: "WHERE OperationID=" + pOperationHeader_Global.ID, pOrderBy: "ID" }, function (pData) {
                    if (pData[1] == 1) {
                        let s = JSON.parse(pData[0])[0].ContainerTypeID;
                        s = parseInt(s);
                        $("#slTruckingOrderContainerTypesTruckingOrder").val(s);
                        $("#slTruckingOrderContainerTypesTruckingOrder").attr("disabled", "disabled");
                    }
                }, null);
                GetListWithNameAndWhereClause(null
                    , "/api/Truckers/LoadAll"
                    , TranslateString("SelectFromMenu"), "slTruckingOrderGensetSupplier" + RoutingSuffix
                    , "WHERE IsDeleted=0 AND IsInactive=0 ORDER BY Name"
                    , null);
                let options = [
                    { value: '', text: 'Select' },
                    { value: 'شهادة', text: 'شهادة' },
                    { value: 'منشور 26', text: 'منشور 26' },
                    { value: 'بوصلة', text: 'بوصلة' },
                    { value: 'اخرى', text: 'اخرى' }
                ];
                let $select = $('<select id="txtTruckingOrderDelaysTruckingOrder" class="form-control input-sm" data-required="false" onfocus="DisableBackspaceKey(id);" onkeydown="DisableBackspaceKey(id);" onkeypress="DisableBackspaceKey(id);"></select>');
                $.each(options, function (index, option) {
                    $select.append($('<option></option>').attr('value', option.value).text(option.text));
                });
                $('#txtTruckingOrderDelaysTruckingOrder').after($select);
                $("#txtTruckingOrderDelaysTruckingOrder").remove();
            } else {
                GetListWithNameAndWhereClause(null
                    , "/api/Suppliers/LoadAll"
                    , TranslateString("SelectFromMenu"), "slTruckingOrderGensetSupplier" + RoutingSuffix
                    , "WHERE ID IN (SELECT PartnerID FROM vwOperationPartners WHERE PartnerTypeID=" + constSupplierPartnerTypeID + " AND OperationID=" + $("#hOperationID").val() + ") ORDER BY Name"
                    , null);
            }
            CallGETFunctionWithParameters("/api/Routings/FillRoutingModal"
                , { pRouteIDToFillModal: 0, pOperationID: $("#hOperationID").val() }
                , function (pData) {
                    var _Operation = JSON.parse(pData[1]);
                    var _Route = JSON.parse(pData[2]);
                    //$("#txtTruckingOrderPickupAddressTruckingOrder").val(_Operation.ClientAddress == 0 ? "" : _Operation.ClientAddress);
                    $("#txtTruckingOrderPickupAddressTruckingOrder").val($("#hClientPickupAddress").val());
                }
                , null);
            LoadPickupAddresses();
        }
        else {//not TruckingOrder so i don't need to add GensetSuppliers
            $("#slTruckingOrderGensetSupplier" + RoutingSuffix).html("<option value=''>" + TranslateString("SelectFromMenu") + "</option>");
        }
        GetListWithNameAndWhereClause(null
            , "/api/CustomsClearanceAgents/LoadAll"
            , TranslateString("SelectFromMenu"), "slRoutingCCA" + RoutingSuffix
            , "WHERE ID IN (SELECT PartnerID FROM vwOperationPartners WHERE PartnerTypeID=" + constCustomsClearanceAgentPartnerTypeID + " AND OperationID=" + $("#hOperationID").val() + ") ORDER BY Name"
            , function () {
                if (pDefaults.UnEditableCompanyName == "ELI" && RoutingSuffix == "CustomsClearance" && $("#slRoutingCCA" + RoutingSuffix + " option").length == 2) {
                    $("#slRoutingCCA" + RoutingSuffix + " option:eq(1)").attr("selected", "selected");
                }
            });

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
            //if ($("#hRoutingTransportType" + RoutingSuffix).val() == OceanTransportType)
            //    Routings_Vessels_GetList(null, null, "slRoutingVessels" + RoutingSuffix, null);
            //else
            //    $("#slRoutingVessels" + RoutingSuffix).val("");
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
    //nileTable = JSON.parse(nileTable);
    if (pDefaults.UnEditableCompanyName == "NIL") {
        $('.showForNIL').removeClass('hide');
        $('.hideForNIL').addClass('hide');
        if ($('#cbIsOcean').prop('checked')) {
            $('#slFlightRoute').siblings('label').text('Vessel Route');
        }
    }
    if (pDefaults.UnEditableCompanyName == "NTMU") {
        $("#txtCutoffDate").parent().find("label").text("Port Cutoff Date");
        $("#txtTruckingOrderDeliveryDate").parent().find("label").text("D/O Issuance Date");

    }
    if (pDefaults.UnEditableCompanyName == "ESG") {
        $('.showForESG').removeClass('hide');
        $('.hideForESG').addClass('hide');
    }
    if (pDefaults.UnEditableCompanyName == "MED") {
        $(".classShowForMED").removeClass("hide");
    } else if (pDefaults.UnEditableCompanyName == "NAJ") {
        //$("#txtUnloadingDate").parent().removeClass("hide"); //Sailing Date 
        $("#txtUnloadingDate").prev().text("Sailing Date");

        $('#txtUnloadingDate').parent().find('label').text('SI Date');
        $('#txtTruckingOrderDeliveryDate').parent().find('label').text('Auto CutOff Date');
        $('#txtCutoffDate').parent().find('label').text('Port CutOff Date');
        $('#txtExpectedArrival').parent().find('label').text('ETA Date');
        $('#txtOBLDate').parent().find('label').text('HAZMAT CutOff Date');
        $('#txtOBLDate').parent().find('label').text('HAZMAT CutOff Date');
        $('#txtRoutingDeliveryOrderNumber').parent().find('label').text('Terminal Port Name');

        

    }
    if (IsMESCOCompany && pOperationHeader_Global.TransportType == AirTransportType) {
        $("#slRoutingsWarehouse").parent().removeClass("hide");
        $("#txtRoutingWareHouse").parent().addClass("hide");
    }
    let slFlightRouteVal = $('#slFlightRoute').val();
    let slFreightChargesVal = $('#slFreightCharges').val();
    let slNoOfOriginalsVal = $('#slNoOfOriginals').val();
    ClearAll("#RoutingModalTruckingOrder"); //i want it cleared in all cases to use trucking control names
    if (RoutingSuffix != "TruckingOrder") //otherwise then the modal is already cleared up
        ClearAll("#RoutingModal" + RoutingSuffix);
    $('#slFlightRoute').val(slFlightRouteVal); 
    $('#slFreightCharges').val(slFreightChargesVal);
    $('#slNoOfOriginals').val(slNoOfOriginalsVal);
    var tr = $("#tblRoutings tr[ID='" + pID + "']");

    $("#hRoutingID" + RoutingSuffix).val(pID);
    $("#hRoutingTransportType" + RoutingSuffix).val($(tr).find("td.TransportType").attr("val"));
    $("#hRoutingTransportIconName" + RoutingSuffix).val($(tr).find("td.TransportIconName").text());
    $("#hRoutingTransportIconStyle" + RoutingSuffix).val($(tr).find("td.TransportIconStyle").text());
    $("#lblRoutingShown" + RoutingSuffix).html(": " + $(tr).find("td.RoutingType").text());
    if (pDefaults.UnEditableCompanyName == "EVL") {
        $("#txtPickupAddress" + RoutingSuffix).val($(tr).find("td.PickupAddress").text());
        $("#txtDeliveryAddress" + RoutingSuffix).val($(tr).find("td.DeliveryAddress").text());
    } else {
        $("#txtPickupAddress" + RoutingSuffix).val($("#hPickupAddress").val());
        $("#txtDeliveryAddress" + RoutingSuffix).val($("#hDeliveryAddress").val());
    }
 

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
    var CutOffDate = $(tr).find("td.CutoffDate").attr("val");
    var pGensetSupplierID = $(tr).find("td.GensetSupplierID").text();
    var pCCAID = $(tr).find("td.CCAID").text();
    var pGateInPortID = $(tr).find("td.GateInPortID").text() == 0 ? "" : $(tr).find("td.GateInPortID").text();
    var pGateOutPortID = $(tr).find("td.GateOutPortID").text() == 0 ? "" : $(tr).find("td.GateOutPortID").text();
    var pCCAID = $(tr).find("td.CCAID").text();
    $("#slTruckingOrderGateInPort" + RoutingSuffix).val(pGateInPortID);
    $("#slTruckingOrderGateOutPort" + RoutingSuffix).val(pGateOutPortID);

   
    if (pDefaults.UnEditableCompanyName == "ELI" && RoutingSuffix == "TruckingOrder") {
        $('#txtOperationNotesTruckingOrder').closest('div.form-group').removeClass('hide');
        $('#txtOperationNotesTruckingOrder').val($('#txtOperationNotes').val());
        if ($('#cbPrintAsBosla').is(':checked'))
            $("#txtRoadNumber" + RoutingSuffix).val($(tr).find("td.RoadNumber").text());
    }
    else {
        $('#txtOperationNotesTruckingOrder').closest('div.form-group').addClass('hide');
        $('#txtOperationNotesTruckingOrder').val('');
    }
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
        LoadPickupAddresses();
    }
    else if (RoutingSuffix == "CustomsClearance") {
        $("#slRoutingTypes" + RoutingSuffix).html('<option value="' + CustomsClearanceRoutingTypeID + '">Customs Clearance</option>');
        Routings_FillRoutingModal(pID);
        ClearAllTableRows('tblCustomClearanceTracking');
        CustomClearanceTracking_LoadData()
    }


    if (RoutingSuffix == "" && pDefaults.UnEditableCompanyName == 'ELI') {


        $('#cbIsShipsGo').parent().parent().removeClass('hide');


    }
    else
        $('#cbIsShipsGo').parent().parent().addClass('hide');


    if (pDefaults.UnEditableCompanyName == 'TRGL' && RoutingSuffix == 'TruckingOrder') {


        //$("#lblGateOutDate").text("Gate In Date - تاريخ دخول الميناء");
        //$("#lblGateInDate").text("Gate Out Date - تاريخ الخروج");
        var $parent1 = $('#lblGateInDate').parent();
        var $parent2 = $('#lblGateOutDate').parent();

        var $temp = $('<div>');
        $parent1.before($temp);
        $parent2.before($parent1);
        $temp.replaceWith($parent2);

    }
    if (pDefaults.UnEditableCompanyName == 'BAL' && RoutingSuffix == '') {


        $('#divRoadNumber label').text('Demurrage calculation');


    }

    //Fill warehouses for Air Operations
    if (IsMESCOCompany && pOperationHeader_Global.TransportType == AirTransportType) {
        CallGETFunctionWithParameters("/api/Warehouse/LoadWithWhereClause", { pWhereClause: "WHERE IsAir =1" }, function (pData) {
            FillListFromObject($(tr).find("td.WarehouseID").attr("val"), 2, TranslateString("SelectFromMenu"), "slRoutingsWarehouse", pData[0], null);
        })
    }

    //GetListWithNameAndWhereClause(pGensetSupplierID, "/api/Suppliers/LoadAll", "<--Select-->", "slTruckingOrderGensetSupplier" + RoutingSuffix, "ORDER BY Name", null);
    //GetListWithNameAndWhereClause(pCCAID, "/api/CustomsClearanceAgents/LoadAll", "<--Select-->", "slRoutingCCA" + RoutingSuffix, "ORDER BY Name", null);
    if (RoutingSuffix == "TruckingOrder") {
        if (pDefaults.UnEditableCompanyName == 'USC') {
            GetListWithNameAndWhereClause(pGensetSupplierID
                , "/api/Truckers/LoadAll"
                , TranslateString("SelectFromMenu"), "slTruckingOrderGensetSupplier" + RoutingSuffix
                , "WHERE IsDeleted=0 AND IsInactive=0 ORDER BY Name"
                , null);
        } else {
            GetListWithNameAndWhereClause(pGensetSupplierID
                , "/api/Suppliers/LoadAll"
                , TranslateString("SelectFromMenu"), "slTruckingOrderGensetSupplier" + RoutingSuffix
                , "WHERE ID IN (SELECT PartnerID FROM vwOperationPartners WHERE PartnerTypeID=" + constSupplierPartnerTypeID + " AND OperationID=" + $("#hOperationID").val() + ") ORDER BY Name"
                , null);
        }
    }
    else //not TruckingOrder so i don't need to add GensetSuppliers
        $("#slTruckingOrderGensetSupplier" + RoutingSuffix).html("<option value=''>" + TranslateString("SelectFromMenu") + "</option>");
    GetListWithNameAndWhereClause(pCCAID
        , "/api/CustomsClearanceAgents/LoadAll"
        , TranslateString("SelectFromMenu"), "slRoutingCCA" + RoutingSuffix
        , "WHERE ID IN (SELECT PartnerID FROM vwOperationPartners WHERE PartnerTypeID=" + constCustomsClearanceAgentPartnerTypeID + " AND OperationID=" + $("#hOperationID").val() + ") ORDER BY Name"
        , null);

    Routings_ShowHidePickupAndDeliveryAddress($(tr).find("td.RoutingType").attr("val") == MainCarraigeRoutingTypeID ? true : false);

    //Incase of (Master OR Direct) && Main Route so i have to show MasterBL
    if (($("#hBLType").val() == constMasterBLType || $("#hBLType").val() == constDirectBLType) && $(tr).find("td.RoutingType").attr("val") == MainCarraigeRoutingTypeID)
        Routings_Show_Suitable_MasterBL();
    else
        Routings_HideMasterBL();
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
    if (IsMESCOCompany && !ODRou) {
        $("#txtETAPOLDate").attr("disabled", true);
        $("#txtATAPOLDate").attr("disabled", true);
        $("#txtExpectedDeparture").attr("disabled", true);
        $("#txtActualDeparture").attr("disabled", true);
        $("#txtExpectedArrival").attr("disabled", true);
        $("#txtActualArrival").attr("disabled", true);
    }
    if (pDefaults.UnEditableCompanyName == 'AKS' && RoutingSuffix == '') {


        $("#txtRoutingFreeTime").attr("data-required", false);
        $("#txtRoutingTruckCounter").attr("data-required", false);



    }
    //Enable/Disable $("#txtMAWBStock")
    if ($("#hMAWBStockID").val() == "0")
        Routings_EnableMAWBSuffix();
    else
        Routings_DisableMAWBSuffix();

    Routings_Countries_GetList(pPOLCountryID, pPODCountryID, null);
    Routings_Ports_GetList(pPOLID, pPOLCountryID, 1);
    Routings_Ports_GetList(pPODID, pPODCountryID, 2);
    /////////////////////////////////////Todo: Fill Via Ports here///////////////////////////
    //Routings_Lines_GetList(pLineID, null);
    Routings_Lines_GetList(pLineID
        , function () {
            if ($("#hRoutingTransportType" + RoutingSuffix).val() == OceanTransportType) {
                $(".classRoutingVessels" + RoutingSuffix).removeClass("hide");
                if ($("#slRoutingVessels option").length < 2)
                    Routings_Vessels_GetList(pVesselID, pLineID, "slRoutingVessels", function () { $("#slRoutingFeeders").html($("#slRoutingVessels").html()); });
                else {
                    $("#slRoutingVessels").val(pVesselID);
                    //$("#slRoutingFeeders").val(pFeederID);
                }
            }
            else {
                $(".classRoutingVessels" + RoutingSuffix).addClass("hide");
                $("#slRoutingVessels" + RoutingSuffix).val("");
                $("#slRoutingFeeders").val("");
            }
        });

    $("#txtETAPOLDate" + RoutingSuffix).val(Date.prototype.compareDates("01/01/1900", ETAPOLDate) < 1 ? "" : ConvertDateFormat(ETAPOLDate));
    $("#txtATAPOLDate" + RoutingSuffix).val(Date.prototype.compareDates("01/01/1900", ATAPOLDate) < 1 ? "" : ConvertDateFormat(ATAPOLDate));
    $("#txtExpectedArrival" + RoutingSuffix).val(Date.prototype.compareDates("01/01/1900", ExpectedArrival) < 1 ? "" : ConvertDateFormat(ExpectedArrival));
    $("#txtExpectedDeparture" + RoutingSuffix).val(Date.prototype.compareDates("01/01/1900", ExpectedDeparture) < 1 ? "" : ConvertDateFormat(ExpectedDeparture));
    $("#txtActualArrival" + RoutingSuffix).val(Date.prototype.compareDates("01/01/1900", ActualArrival) < 1 ? "" : ConvertDateFormat(ActualArrival));
    $("#txtActualDeparture" + RoutingSuffix).val(Date.prototype.compareDates("01/01/1900", ActualDeparture) < 1 ? "" : ConvertDateFormat(ActualDeparture));
    $("#txtCutoffDate").val(Date.prototype.compareDates("01/01/1900", CutOffDate) < 1 ? "" : ConvertDateFormat(CutOffDate));

    $("#txtLoadingDate").val($(tr).find("td.LoadingDate").text()); //Starting Date For MED
    $("#txtUnloadingDate").val($(tr).find("td.UnloadingDate").text()); //Receiving Date For MED //Sailing Date For NAJ

    if ($("#hBlType").val() != constHouseBLType && $("#hTransportType").val() == AirTransportType) {
        $("#txtMAWBSuffix" + RoutingSuffix).val($("#hMAWBSuffix").val().toString() == "0" ? "" : $("#hMAWBSuffix").val());
        $("#txtMAWBDate" + RoutingSuffix).val(Date.prototype.compareDates("01/01/1900", ConvertDateFormat($("#hBLDate").val())) < 1 ? "" : $("#hBLDate").val());
    }
    if ($("#hBlType").val() != constHouseBLType && $("#hTransportType").val() != AirTransportType) {
        $("#txtOBL" + RoutingSuffix).val(($("#hMasterBL").val() == 0 ? "" : $("#hMasterBL").val()));
        $("#txtOBLDate" + RoutingSuffix).val(Date.prototype.compareDates("01/01/1900", ConvertDateFormat($("#hBLDate").val())) < 1 ? "" : $("#hBLDate").val());
    }
    $("#txtRoutingVoyageOrTruckNumber" + RoutingSuffix).val($(tr).find("td.VoyageOrTruckNumber").text());
    $("#txtRoutingTransientTime" + RoutingSuffix).val($(tr).find("td.TransientTime").text());
    $("#txtRoutingFreeTime" + RoutingSuffix).val($(tr).find("td.FreeTime").text());
    $("#txtRoutingValidity" + RoutingSuffix).val($(tr).find("td.Validity").text());
    $("#txtRoutingNotes" + RoutingSuffix).val($(tr).find("td.Notes").text());
    //$("#txtRoutingNotes" + RoutingSuffix).val($(tr).find("td.Notes").text());
    $("#slRoutingsLines" + RoutingSuffix).val($(tr).find("td.Line").attr("val"));

    $("#txtTruckingOrderQuantity" + RoutingSuffix).val($(tr).find("td.Quantity").text());
    $("#txtTruckingOrderContactPerson" + RoutingSuffix).val($(tr).find("td.ContactPerson").text());
    $("#txtTruckingOrderPickupAddress" + RoutingSuffix).val($(tr).find("td.PickupAddress").text());
    $("#txtTruckingOrderDeliveryAddress" + RoutingSuffix).val($(tr).find("td.DeliveryAddress").text());
    $("#txtTruckingOrderGateInDate" + RoutingSuffix).val($(tr).find("td.GateInDate").text());
    $("#txtTruckingOrderGateOutDate" + RoutingSuffix).val($(tr).find("td.GateOutDate").text());
    $("#txtTruckingOrderStuffingDate" + RoutingSuffix).val($(tr).find("td.StuffingDate").text());
    $("#txtTruckingOrderDeliveryDate" + RoutingSuffix).val($(tr).find("td.DeliveryDate").text());
    $("#txtTruckingOrderBookingNumber" + RoutingSuffix).val($(tr).find("td.BookingNumber").text());
    if (pDefaults.UnEditableCompanyName == "ELI") {
        $("#txtCCBookingNumber").val($("#txtOperationBookingNumber").val());
        $("#txtTruckingOrderBookingNumber" + RoutingSuffix).val($("#txtOperationBookingNumber").val());
    }

    $("#txtTruckingOrderDelays" + RoutingSuffix).val($(tr).find("td.Delays").text());
    if (pDefaults.UnEditableCompanyName == "USC" && RoutingSuffix == "TruckingOrder") {
        let options = [
            { value: '', text: 'Select' },
            { value: 'شهادة', text: 'شهادة' },
            { value: 'منشور 26', text: 'منشور 26' },
            { value: 'بوصلة', text: 'بوصلة' },
            { value: 'اخرى', text: 'اخرى' }
        ];
        let $select = $('<select id="txtTruckingOrderDelaysTruckingOrder" class="form-control input-sm" data-required="false" onfocus="DisableBackspaceKey(id);" onkeydown="DisableBackspaceKey(id);" onkeypress="DisableBackspaceKey(id);"></select>');
        $.each(options, function (index, option) {
            $select.append($('<option></option>').attr('value', option.value).text(option.text));
        });
        $('#txtTruckingOrderDelaysTruckingOrder').after($select);
        $("#txtTruckingOrderDelaysTruckingOrder").remove();
        $('#txtTruckingOrderDelaysTruckingOrder').val($(tr).find("td.Delays").text());
    }
    $("#txtTruckingOrderDriverName" + RoutingSuffix).val($(tr).find("td.DriverName").text());
    $("#txtRoutingpCustomerWarehouseManagerName" + RoutingSuffix).val($(tr).find("td.CustomerWarehouseManagerName").text());
    $("#txtRoutingpCustomerWarehouseManagerPhone" + RoutingSuffix).val($(tr).find("td.CustomerWarehouseManagerPhone").text());
    $("#slRoutingsTruckingEquipmentModels" + RoutingSuffix).val(tr.find("td.TruckingEquipmentModels").attr("val"));

    //$("#txtTruckingOrderDriverName" + RoutingSuffix).val($(tr).find("td.DriverName").text());
    //$("#txtTruckingOrderDriverName" + RoutingSuffix).val($(tr).find("td.DriverName").text());
    $("#txtTruckingOrderDriverPhones" + RoutingSuffix).val($(tr).find("td.DriverPhones").text());
    $("#txtTruckingOrderPowerFromGateInTillActualSailing" + RoutingSuffix).val($(tr).find("td.PowerFromGateInTillActualSailing").text());

    $("#txtTruckingOrderContactPersonPhones" + RoutingSuffix).val($(tr).find("td.ContactPersonPhones").text());
    $("#txtTruckingOrderLoadingTime" + RoutingSuffix).val($(tr).find("td.LoadingTime").text());
    $("#txtUnloadingTime").val($(tr).find("td.UnloadingTime").text());
    $("#txtBillNumber" + RoutingSuffix).val($(tr).find("td.BillNumber").text());
    $("#slTruckingOrderContainerTypesTruckingOrder").val($(tr).find("td.TrContainerTypeID").text());
    $("#txtTruckingOrderNumberOfContainersTruckingOrder").val($(tr).find("td.TrNumberOfContainers").text());
    $("#slTruckingOrderContainerTypes2TruckingOrder").val($(tr).find("td.CommodityID").text());
    $("#txtTruckingOrderNumberOfContainers2TruckingOrder").val($(tr).find("td.MaxSupplierContainers").text());

    $("#txtCCBookingNumber").val($(tr).find("td.BookingNumber").text());
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
    $("#slCustomerCustomsClearance").val($(tr).find("td.CustomerID").attr("val")).trigger('change');
    $("#slWarehouseCustomsClearance").val($(tr).find("td.CCMainWarehouse").attr("val"));
    $("#txtWarehouseETA").val($(tr).find("td.CCWarehouseETA").text());
    $("#txtWarehouseATD").val($(tr).find("td.CCWarehouseATD").text());
    $("#cbCCIsDone").prop("checked", $(tr).find("td.CCIsDone").text());
    $("#txtCertificateNumber").val($(tr).find("td.CertificateNumber").text());
    $("#txtCertificateValue").val($(tr).find("td.CertificateValue").text());
    $("#txtCertificateDate").val($(tr).find("td.CertificateDate").text());
    $("#txtQasimaNumber").val($(tr).find("td.QasimaNumber").text());
    $("#txtQasimaDate").val($(tr).find("td.QasimaDate").text());
    $("#match").prop("checked", $(tr).find("td.Match").text());

    $("#txtSalesDateReceived").val($(tr).find("td.SalesDateReceived").text());
    $("#txtSalesDateDelivered").val($(tr).find("td.SalesDateDelivered").text());
    $("#txtCommerceDateReceived").val($(tr).find("td.CommerceDateReceived").text());
    $("#txtCommerceDateDelivered").val($(tr).find("td.CommerceDateDelivered").text());
    $("#txtInspectionDateReceived").val($(tr).find("td.InspectionDateReceived").text());
    $("#txtInspectionDateDelivered").val($(tr).find("td.InspectionDateDelivered").text());
    $("#txtFinishDateReceived").val($(tr).find("td.FinishDateReceived").text());
    $("#txtFinishDateDelivered").val($(tr).find("td.FinishDateDelivered").text());

    $("#txtConcedeCompanyName").val($(tr).find("td.ConcedeCompanyName").text());
    $("#txtConcedeNumber").val($(tr).find("td.ConcedeNumber").text());
    $("#txtConcedeTotalQty").val($(tr).find("td.ConcedeTotalQty").text());
    $("#txtConcedeQty").val($(tr).find("td.ConcedeQty").text());
    $("#txtCCApproveNo").val($(tr).find("td.CCApproveNo").text());
    $("#txtCCInvoiceNo").val($(tr).find("td.CCInvoiceNo").text());
    $("#txtCCTotalQty").val($(tr).find("td.CCTotalQty").text());
    $("#txtCCSubtractQty").val($(tr).find("td.CCSubtractQty").text());
    $("#txtCCNetQty").val($(tr).find("td.CCNetQty").text());
    $("#txtRoutingTruckCounter").val($(tr).find("td.TruckCounter").text());

    if (pDefaults.UnEditableCompanyName == 'ELI') {

        if ($("#isShipsGo").text() == '1') {

            $("#cbIsShipsGo").prop("checked", true);
            $("#cbIsShipsGo").attr("disabled", true);
        }
        else {

            $("#cbIsShipsGo").prop("checked",false);
            $("#cbIsShipsGo").attr("disabled", false);

        }

    }

    //---- mostaa 7-3-2021

    $("#slCC_ClearanceTypeID").val($(tr).find("td.CC_ClearanceTypeID").attr('val'));
    $("#slCC_CustomItemsID").val($(tr).find("td.CC_CustomItemsID").attr('val'));
    $("#txtCCReleaseNo").val($(tr).find("td.CCReleaseNo").attr('val'));
    $("#txtCCDropBackReceived").val(($(tr).find("td.CCDropBackReceived").attr('val') == "01/01/1900" ? "" : $(tr).find("td.CCDropBackReceived").attr('val')));
    $("#txtCCDropBackDelivered").val(($(tr).find("td.CCDropBackDelivered").attr('val') == "01/01/1900" ? "" : $(tr).find("td.CCDropBackDelivered").attr('val')));
    $("#txtCCAllowTemporaryReceived").val(($(tr).find("td.CCAllowTemporaryReceived").attr('val') == "01/01/1900" ? "" : $(tr).find("td.CCAllowTemporaryReceived").attr('val')));
    $("#txtCCAllowTemporaryDelivered").val(($(tr).find("td.CCAllowTemporaryDelivered").attr('val') == "01/01/1900" ? "" : $(tr).find("td.CCAllowTemporaryDelivered").attr('val')));





    $("#cbIsOwnedByCompany").prop("checked", $("#cbIsOwnedByCompany" + pID).prop("checked"));
    if (pDefaults.UnEditableCompanyName != 'ELI')
        $("#Routing-formTruckingOrder #cbIsLoaded").prop("checked", $("#cbIsLoaded" + pID).prop("checked"));
   

    Routings_ShowHideOwnedByCompanyProperties($("#cbIsOwnedByCompany" + pID).prop("checked"));
    if (!$("#cbIsOwnedByCompany").prop("checked")) {
        $("#txtSupplierDriverName" + RoutingSuffix).val($(tr).find("td.DriverName" + RoutingSuffix).text());
        $("#txtSupplierDriverAssistantName" + RoutingSuffix).val($(tr).find("td.DriverAssistantName" + RoutingSuffix).text());
        $("#txtSupplierTrailerName" + RoutingSuffix).val($(tr).find("td.TrailerName" + RoutingSuffix).text());
    }
    else {
        $("#slEquipment" + RoutingSuffix).val(tr.find("td.EquipmentID").text()); //Shown and set always because elite uses in all cases
        $("#slTrailer" + RoutingSuffix).val(tr.find("td.TrailerID").text());
        $("#slDriver" + RoutingSuffix).val(tr.find("td.DriverID").text());
        $("#slDriverAssistant" + RoutingSuffix).val(tr.find("td.DriverAssistantID").text());
    }
    if (pDefaults.UnEditableCompanyName == "ELI") //Shown and set always because elite uses in all cases
        $("#slEquipment" + RoutingSuffix).val(tr.find("td.EquipmentID").text());

    $("#slRoutingsLoadingZone" + RoutingSuffix).val(tr.find("td.LoadingZoneID").text());
    $("#slRoutingsFirstCuringArea" + RoutingSuffix).val(tr.find("td.FirstCuringAreaID").text());
    $("#slRoutingsSecondCuringArea" + RoutingSuffix).val(tr.find("td.SecondCuringAreaID").text());
    $("#slRoutingsThirdCuringArea" + RoutingSuffix).val(tr.find("td.ThirdCuringAreaID").text());

    if (pDefaults.UnEditableCompanyName == "MES") {
        $('#slRoutingsLines' + RoutingSuffix).removeAttr('disabled');
        $('#txtRoutingVoyageOrTruckNumber' + RoutingSuffix).removeAttr('disabled');
        $('#txtMAWBSuffix' + RoutingSuffix).removeAttr('disabled');
    }

    $("#btnSaveRouting" + RoutingSuffix).attr("onclick", "Routings_Update(false);");
    $("#btnSaveandNewRouting" + RoutingSuffix).attr("onclick", "Routings_Update(true);");
    const indexToRoute = nilRoutings.findIndex(route => route.RoutingTypeID === 30);
    const indexToClearance = nilRoutings.findIndex(route => route.RoutingTypeID === 70);
    debugger;
    if (['NIL', 'SSH'].includes(pDefaults.UnEditableCompanyName)) {
        $('#slFlightRoute').val(nilRoutings[indexToRoute]?.ContactPersonPhones);
        $('#slFreightCharges').val(nilRoutings[indexToRoute]?.LoadingTime);
        $('#slNoOfOriginals').val(nilRoutings[indexToRoute]?.WareHouse);

        $('#txtCargoInvoiceValue').val(nilRoutings[indexToClearance]?.CustomerWarehouseManagerName);
        $('#txtCustomsLocation').val(nilRoutings[indexToClearance]?.WareHouseLocation);
        $('#txtAdditionalChargesRevaluationPenaltyFees').val(nilRoutings[indexToClearance]?.CustomerWarehouseManagerPhone);
        $('#txtExemptionBy').val(nilRoutings[indexToClearance]?.ContactPerson);
        $('#txtExemptionByDescription').val(nilRoutings[indexToClearance]?.DeliveryAddress);
        $('#txtBLNo').val(nilRoutings[indexToClearance]?.Delays); 
        if (RoutingSuffix == "TruckingOrder") {
            $('#txtApplyDateTruckingOrder').val(trackingNil?.txtApplyDateTruckingOrder);
            $('#cbIsApply').prop('checked', trackingNil?.cbIsApply == 'true' ? true : false);
            
        }
        if (RoutingSuffix == "CustomsClearance") {
            $('#taxItemInput1').val(nileTable[0]?.taxItem);
            $('#taxItemInput2').val(nileTable[1]?.taxItem);
            $('#taxItemInput3').val(nileTable[2]?.taxItem);
            $('#taxItemInput4').val(nileTable[3]?.taxItem);
            $('#taxItemInput5').val(nileTable[4]?.taxItem);
            $('#taxItemInput6').val(nileTable[5]?.taxItem);
            
            $('#displaySideInput1').val(nileTable[0]?.displaySide);
            $('#displaySideInput2').val(nileTable[1]?.displaySide);
            $('#displaySideInput3').val(nileTable[2]?.displaySide);
            $('#displaySideInput4').val(nileTable[3]?.displaySide);
            $('#displaySideInput5').val(nileTable[4]?.displaySide);
            $('#displaySideInput6').val(nileTable[5]?.displaySide);

            $('#commentNotesInput1').val(nileTable[0]?.commentNotes);
            $('#commentNotesInput2').val(nileTable[1]?.commentNotes);
            $('#commentNotesInput3').val(nileTable[2]?.commentNotes);
            $('#commentNotesInputt4').val(nileTable[3]?.commentNotes);
            $('#commentNotesInput5').val(nileTable[4]?.commentNotes);
            $('#commentNotesInput6').val(nileTable[5]?.commentNotes);

            $('#theVisaInput1').val(nileTable[0]?.theVisa);
            $('#theVisaInput2').val(nileTable[1]?.theVisa);
            $('#theVisaInput3').val(nileTable[2]?.theVisa);
            $('#theVisaInput4').val(nileTable[3]?.theVisa);
            $('#theVisaInput5').val(nileTable[4]?.theVisa);
            $('#theVisaInput6').val(nileTable[5]?.theVisa);


            $('#theDateInput1').val(nileTable[0]?.theDate);
            $('#theDateInput2').val(nileTable[1]?.theDate);
            $('#theDateInput3').val(nileTable[2]?.theDate);
            $('#theDateInputt4').val(nileTable[3]?.theDate);
            $('#theDateInput5').val(nileTable[4]?.theDate);
            $('#theDateInput6').val(nileTable[5]?.theDate);


            $('#MilestoneDateInput1').val(nileTable2[0]?.MilestoneDate);
            $('#MilestoneDateInput2').val(nileTable2[1]?.MilestoneDate);
            $('#MilestoneDateInput3').val(nileTable2[2]?.MilestoneDate);
            $('#MilestoneDateInput4').val(nileTable2[3]?.MilestoneDate);

            $('#SummaryDateInput1').val(nileTable2[0]?.SummaryDate);
            $('#SummaryDateInput2').val(nileTable2[1]?.SummaryDate);
            $('#SummaryDateInput3').val(nileTable2[2]?.SummaryDate);
            $('#SummaryDateInput4').val(nileTable2[3]?.SummaryDate);

            $('#IsDueInput1').prop('checked', nileTable2[0]?.IsDue == 'true' ? true : false);
            $('#IsDueInput2').prop('checked', nileTable2[1]?.IsDue == 'true' ? true : false);
            $('#IsDueInput3').prop('checked', nileTable2[2]?.IsDue == 'true' ? true : false);
            $('#IsDueInput4').prop('checked', nileTable2[3]?.IsDue == 'true' ? true : false);

      
            const checkboxIds1 = [
                'IsCommercialInvoice',
                'IsPackingList',
                'IsCOO',
                'IsMasterBill',
                'IsEUR1',
                'IsHouseBill',
                'IsBankForm',
                'IsEInvoice',
                'IsFumigationCertificate',
                'IsStandaredCertificate',
                'IsILACCertificate',
                'IsAnalysesCertificate',
                'IsFactoryRegisteration',
                'IsHealthCertificate',
                'IsCatalogesForCargo',
                'IsTrademarkLetters'
            ];
            const checkboxIds2 = [
                'IsFreight',
                'IsAsConstract1',
                'IsDocumentation',
                'IsTransportation',
                'IsAsConstract2',
                'IsIsurance',
                'IsClearance',
                'IsAsConstract3',
                'IsWarehousing',
                'IsTransit',
                'IsAsConstract4',
                'IsPickingPacking',
                'IsStorage',
                'IsHandling',
                'IsReexport',
                'IsIOR',
                'IsFreightTerm'
            ];
            checkboxIds1.forEach(id => {
                $(`#${id}`).prop('checked', nileTable3[0]?.[id] === 'true');
            });
            checkboxIds2.forEach(id => {
                $(`#${id}`).prop('checked', nileTable3[1]?.[id] === 'true');
            });
            const hsCodeIds1 = [
                'hsCode1',
                'hsCode2',
                'hsCode3',
                'hsCode4'
            ];
            const hsDescriptionIds2 = [
                'hsDescription1',
                'hsDescription2',
                'hsDescription3',
                'hsDescription4'
            ];
            hsCodeIds1.forEach(id => {
                $(`#${id}`).val(nileTable4[0]?.[id]);
            });
            hsDescriptionIds2.forEach(id => {
                $(`#${id}`).val(nileTable4[1]?.[id]);
            });
        }
    }

    if (pDefaults.UnEditableCompanyName == 'SSH' && RoutingSuffix == 'CustomsClearance') {
        $("#txtInspectionDateReceivedCustomsClearance").val($(tr).find("td.InspectionDateReceived").text());
        $("#txtPickupAddressCustomsClearance").val($(tr).find("td.PickupAddress").text());
        $("#txtInspectionDateDeliveredCustomsClearance").val($(tr).find("td.InspectionDateDelivered").text());
        $("#txtDeliveryAddressCustomsClearance").val($(tr).find("td.DeliveryAddress").text());
        $("#txtDeliveryDateCustomsClearance").val($(tr).find("td.DeliveryDate").text());
        $("#txtDeliveryOrderNumberCustomsClearance").val($(tr).find("td.DeliveryOrderNumber").text());
        $("#txtRoadNumberCustomsClearance").val($(tr).find("td.RoadNumber").text());
        $('#cbIsLoadedCustomsClearance').prop('checked', $(tr).find("td.IsLoaded input").is(':checked'));
    }
}
function Routings_FillRoutingModal(pRouteIDToFillModal) {
    debugger;
    var pParametersWithValues = {
        pRouteIDToFillModal: pRouteIDToFillModal
        , pOperationID: $("#hOperationID").val()
    };
    CallGETFunctionWithParameters("/api/Routings/FillRoutingModal", pParametersWithValues
        , function (pData) {
            var _Operation = JSON.parse(pData[1]);
            var _Route = JSON.parse(pData[2]);
            $("#lblCCAConsignee").text(": " + (_Operation.ConsigneeName == 0 ? "N/A" : _Operation.ConsigneeName));
            $("#lblCCAShipper").text(": " + (_Operation.ShipperName == 0 ? "N/A" : _Operation.ShipperName));
            $("#lblCCAMBL").text(": " + (_Operation.MasterBL == 0 ? "N/A" : _Operation.MasterBL));
            $("#lblCCAHBL").text(": " + (_Operation.HouseNumber == 0 ? "N/A" : _Operation.HouseNumber));
            $("#lblCCAShipment").text(": " + (_Operation.ShipmentTypeCode == 0 ? "N/A" : _Operation.ShipmentTypeCode));
            $("#lblCCACargo").text(": "
                + (_Operation.NumberOfVehicles > 0
                    ? (_Operation.NumberOfVehicles + " Vehicles")
                    : (_Operation.ContainerTypes != 0 ? _Operation.ContainerTypes : (_Operation.NumberOfPackages + "x" + _Operation.PackageTypeName))
                )
            );
            $("#lblCCACommodity").text(": " + (_Operation.CommodityName == 0 ? "N/A" : _Operation.CommodityName));
            $("#lblCCAPONumber").text(": " + (_Operation.PONumber == 0 ? "N/A" : _Operation.PONumber));
            $("#lblCCAPOValue").text(": " + (_Operation.POValue == 0 ? "N/A" : _Operation.POValue));
            $("#lblCCAPODate").text(": " + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(_Operation.PODate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(_Operation.PODate)) : "N/A"));
            $("#lblCCAIncoterm").text(": " + (_Operation.IncotermName == 0 ? "N/A" : _Operation.IncotermName));
            $("#lblCCAPOD").text(": " + (_Operation.PODName == 0 ? "N/A" : _Operation.PODName));
            $("#lblCCAATAPOD").text(": " + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(_Operation.ActualArrival)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(_Operation.ActualArrival)) : "N/A"));
        }
        , null);
}
function Routings_ShowHideOwnedByCompanyProperties(pIsCompanyOwned) {
    debugger;
    if ($("#cbIsOwnedByCompany").prop("checked") || pIsCompanyOwned) {
        $(".classOwnedByCompany").removeClass("hide");
        $(".classOwnedBySupplier").addClass("hide");
    }
    else {
        $(".classOwnedByCompany").addClass("hide");
        $(".classOwnedBySupplier").removeClass("hide");
    }
}
function Routings_ShowHideTruckingOrderFields(pFlag) {
    debugger;
    if (pDefaults.UnEditableCompanyName == "SHS") {
        $('#slRoutingsPOLCountriesTruckingOrder').attr('data-required', 'false');
        $('#slRoutingsPOLTruckingOrder').attr('data-required', 'false');
        $('#slRoutingsPODCountriesTruckingOrder').attr('data-required', 'false');
        $('#slRoutingsPODTruckingOrder').attr('data-required', 'false');
    }

    if (pFlag) {
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
        GetListWithCodeAndNameAndWhereClause(pID, "/api/Ports/LoadAll", "Select POL", "slRoutingsPOL" + RoutingSuffix, pWhereClause, callback);
    else
        //GetListWithCodeAndWhereClause(pID, "/api/Ports/LoadAll", "Select POD", "slRoutingsPOD", pWhereClause);
        GetListWithCodeAndNameAndWhereClause(pID, "/api/Ports/LoadAll", "Select POD", "slRoutingsPOD" + RoutingSuffix, pWhereClause, callback);
}
function Routings_Lines_GetList(pID, callback) {
    debugger;
    //parameters: ID, strFnName, First Row in select list, select list name
    var strFnName = "";
    var str1stRow = "";
    var pWhereClause = " WHERE 1=1 ORDER BY Name ";
    if ($('input[name=cbRoutingTransportType' + RoutingSuffix + ']:checked').val() == 1
        || $('input[name=cbRoutingTransportType' + RoutingSuffix + ']:checked').val() == null) { //null is for case of first load
        strFnName = "/api/ShippingLines/LoadAll";
        str1stRow = "Select Shipping Line";
    }
    if ($('input[name=cbRoutingTransportType' + RoutingSuffix + ']:checked').val() == 2) {
        strFnName = "/api/Airlines/LoadAll";
        str1stRow = "Select Airline";
    }
    if ($('input[name=cbRoutingTransportType' + RoutingSuffix + ']:checked').val() == 3) {
        strFnName = "/api/Truckers/LoadAll";
        str1stRow = TranslateString("Select Trucker");
        if (['ELI','MED'].includes(pDefaults.UnEditableCompanyName)) {
            // load into slRoutingsLinesTruckingOrder only the Truckers in OperationPartners
            pWhereClause = " WHERE ID IN (SELECT TruckerID FROM OperationPartners WHERE OperationID=" + $("#hOperationID").val() + " AND OperationPartnerTypeID=" + constTruckerOperationPartnerTypeID + " AND TruckerID>0) ORDER BY Name "
        }
    }
    if ($('input[name=cbRoutingTransportType' + RoutingSuffix + ']:checked').val() != 2) {
        //let selectedTrucker = (pDefaults.UnEditableCompanyName == "USC" && $('input[name=cbRoutingTransportType' + RoutingSuffix + ']:checked').val() == 3 && pID != null && pID != 0) ? pID : parseInt(pOperationHeader_Global.TruckerID);
        let selectedTrucker = pID;
        if (pDefaults.UnEditableCompanyName == "USC" && $('input[name=cbRoutingTransportType' + RoutingSuffix + ']:checked').val() == 3) {
            selectedTrucker = pID != null && pID != 0 ? pID : parseInt(pOperationHeader_Global.TruckerID);
        }
        if (pDefaults.UnEditableCompanyName != "USC") {
            selectedTrucker = pID;
        }
        GetListWithNameAndWhereClause(selectedTrucker, strFnName, str1stRow, "slRoutingsLines" + RoutingSuffix, pWhereClause, function () {
            // if when adding a Trucking Order, slRoutingsLinesTruckingOrder has only one row, select it
            if (pDefaults.UnEditableCompanyName == "ELI" && $('input[name=cbRoutingTransportType' + RoutingSuffix + ']:checked').val() == 3 && pID == null) {
                if ($('#slRoutingsLines' + RoutingSuffix + ' option').length == 2) {
                    $('#slRoutingsLines' + RoutingSuffix + ' option:eq(1)').attr('selected', 'selected');
                }

            } else if (pDefaults.UnEditableCompanyName == "USC" && RoutingSuffix == "TruckingOrder") {
                $("#slRoutingsLines" + RoutingSuffix).attr('disabled', 'disabled');
            }
        });
    }
    else { //incase of Air to get the prefix for MAWB
        GetListWithNameAndPrefixAttr(pID, strFnName, str1stRow, "slRoutingsLines" + RoutingSuffix, pWhereClause, function () {
            Routings_SetAirlinePrefix();
            // if when adding a Trucking Order, slRoutingsLinesTruckingOrder has only one row, select it
            if (pDefaults.UnEditableCompanyName == "ELI" && $('input[name=cbRoutingTransportType' + RoutingSuffix + ']:checked').val() == 3 && pID == null) {
                if ($("#slRoutingsLinesTruckingOrder option").length == 2) {
                    $('#slRoutingsLinesTruckingOrder option:eq(1)').attr('selected', 'selected');
                }

            }
        });
    }
    if (callback != null && callback != undefined) {
        callback();
    }
}
function Routings_Vessels_GetList(pID, pLineID, pSlName, callback) {
    debugger;
    var strFnName = "/api/Vessels/LoadAll";
    str1stRow = TranslateString("Select Vessel");
    var pWhereClause = "";
    pWhereClause += " WHERE ID = " + pID;
    pWhereClause += " OR ShippingLineID = " + pLineID;
    pWhereClause += " OR ShippingLineID IS NULL ";
    pWhereClause += (pLineID == "" || pLineID == null ? " AND 1=2 " : ""); //to prevent getting any vessels in case of no line is choosen
    pWhereClause += " ORDER BY Name ";
    GetListWithNameAndWhereClause(pID, strFnName, str1stRow, pSlName, pWhereClause, callback);
}
function Routings_AddVessel() {
    debugger;
    if (ValidateForm("form", "RoutingVesselModal")) {
        FadePageCover(true);
        var pParametersWithValues = {
            pCode: $("#txtRoutingsVesselCode").val().trim() == "" ? 0 : $("#txtRoutingsVesselCode").val().trim().toUpperCase()
            , pName: $("#txtRoutingsVesselName").val().trim() == "" ? 0 : $("#txtRoutingsVesselName").val().trim().toUpperCase()
            , pLocalName: $("#txtRoutingsVesselLocalName").val().trim() == "" ? 0 : $("#txtRoutingsVesselLocalName").val().trim().toUpperCase()
            , pNotes: $("#txtRoutingsVesselNotes").val().trim() == "" ? 0 : $("#txtRoutingsVesselNotes").val().trim().toUpperCase()
        };
        CallGETFunctionWithParameters("/api/Routings/AddVesselFromRoutings", pParametersWithValues
            , function (pData) {
                if (pData[0] == 0)
                    swal("Sorry", "Code and Name must be unique.");
                else {
                    FillListFromObject(pData[0], 2, TranslateString("Select Vessel"), "slRoutingVessels", pData[1], null);
                    $("#slRoutingFeeders").append("<option value=" + pData[0] + ">" + $("#txtRoutingsVesselName").val().trim() + "</option>");
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
    Routings_Lines_GetList(null, function () {
        if ($("#hRoutingTransportType" + RoutingSuffix).val() == OceanTransportType)
            Routings_Vessels_GetList(null, 0, "slRoutingVessels" + RoutingSuffix, function () { $("#slRoutingFeeders").html($("#slRoutingVessels").html()); });
        else //to make value of 
            $("#slRoutingVessels" + RoutingSuffix).val("");
    });
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
    else if (!(pDefaults.UnEditableCompanyName == "ILS" && pDefaults.UnEditableCompanyName == "ILSEG" && RoutingSuffix == "TruckingOrder"))
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

        || (!isValidDate($("#txtExpectedArrival" + RoutingSuffix).val().trim(), 1) && $("#txtExpectedArrival" + RoutingSuffix).val().trim() != "")
        || (!isValidDate($("#txtExpectedDeparture" + RoutingSuffix).val().trim(), 1) && $("#txtExpectedDeparture" + RoutingSuffix).val().trim() != "")
        || (!isValidDate($("#txtActualArrival" + RoutingSuffix).val().trim(), 1) && $("#txtActualArrival" + RoutingSuffix).val().trim() != "")
        || (!isValidDate($("#txtActualDeparture" + RoutingSuffix).val().trim(), 1) && $("#txtActualDeparture" + RoutingSuffix).val().trim() != "")
        || (!isValidDate($("#txtMAWBDate" + RoutingSuffix).val().trim(), 1) && $("#txtMAWBDate" + RoutingSuffix).val().trim() != "")
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
    $("#txtCutoffDate").removeAttr("disabled");

    if (!(pDefaults.UnEditableCompanyName == "ILS" && pDefaults.UnEditableCompanyName == "ILSEG" && RoutingSuffix == "TruckingOrder"))
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
    $("#txtCutoffDate").attr("disabled", "disabled");

}
function Routings_EnableLines() {
    if (!(pDefaults.UnEditableCompanyName == "ILS" && pDefaults.UnEditableCompanyName == "ILSEG" && RoutingSuffix == "TruckingOrder"))
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
        $(".classRoutingVessels" + RoutingSuffix).removeClass("hide");
    }
    else {
        $(".classRoutingVessels" + RoutingSuffix).addClass("hide");
        $("#slRoutingVessels" + RoutingSuffix).val("");
        if ($("#slRoutingVessels" + RoutingSuffix + " option").length < 2)
            Routings_Vessels_GetList(null, null, "slRoutingVessels" + RoutingSuffix, function () { $("#slRoutingFeeders").html($("#slRoutingVessels").html()); });
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
    if (pDefaults.UnEditableCompanyName == "ILS" || pDefaults.UnEditableCompanyName == "ILSEG")
        $("#slRoutingsLinesTruckingOrder").attr("disabled", "disabled");
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
    debugger;
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
            Routings_BindTableRows(JSON.parse(pData[0]));
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
function RoutingsCC_PrintRequest(pRoutingIDCCToPrint, pOption) {
    debugger;
    FadePageCover(true);
    var pParametersWithValues = {
        pRoutingIDCCToPrint: pRoutingIDCCToPrint
    };
    CallGETFunctionWithParameters("/api/Routings/RoutingsCC_PrintRequest", pParametersWithValues
        , function (pData) {
            var _ReturnedMessage = pData[0];
            var pRoutingCC = JSON.parse(pData[1]);
            var pOperationHeader = JSON.parse(pData[2]);
            var _html = '';
            var _ReportTitle = "طلب تخليص";
            if (_ReturnedMessage == "") {
                //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                _html += '<html>';
                _html += '     <head><title>' + _ReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                _html += '         <body style="background-color:white;>';
                _html += '            <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
                _html += '            <div class="col-xs-12 text-center text-ul"><h2><b>' + _ReportTitle + '</b></h2></div>';

                _html += '             <div class="col-xs-12 m-l-n m-t-xs text-right">' + (pRoutingCC.CCAName == 0 ? "" : pRoutingCC.CCAName) + '<b>' + '  / السادة ' + '</b></div>';
                _html += '             <div class="col-xs-12 m-l-n-lg m-t text-right"><b>' + '  ..... تحية طيبة و بعد ' + '</b></div>';
                _html += '             <div class="col-xs-12 m-l-n m-t text-right"><b>' + '' + '  : برجاء إنهاء إجراءات التخليص الخاصة للشحنه وبيانتها كالتالي ' + '</b></div>';

                _html += '             <div class="col-xs-12 m-l-n text-right m-t">' + pOperationHeader.ClientName + '<b class="float-right">' + '  : اسم العميل -  ' + '</b></div>';
                _html += '             <div class="col-xs-12 m-l-n text-right m-t-sm">' + pOperationHeader.POLName + "  --> " + pOperationHeader.PODName + '<b class="float-right">' + ' :   ميناء الشحن / التفريغ  -  ' + '</b></div>';
                _html += '             <div class="col-xs-12 m-l-n text-right m-t-sm">' + (pRoutingCC.CC_ClearanceTypeName == 0 ? "&emsp;" : pRoutingCC.CC_ClearanceTypeName) + '<b class="float-right">' + ' :     نوع التخليص  -   ' + '</b></div>';
                _html += '             <div class="col-xs-12 m-l-n text-right m-t-sm">' + (pOperationHeader.ContainerTypes == 0 ? "&emsp;" : pOperationHeader.ContainerTypes) + '<b class="float-right">' + ' :     عدد الحاويات  -   ' + '</b></div>';
                _html += '             <div class="col-xs-12 m-l-n text-right m-t-sm">' + (pOperationHeader.LineName == 0 ? "&emsp;" : pOperationHeader.LineName) + '<b class="float-right">' + ' :     الخط الملاحي  -   ' + '</b></div>';
                _html += '             <div class="col-xs-12 m-l-n text-right m-t-sm">' + (pRoutingCC.CCAInvoiceNumber == 0 ? "&emsp;" : pRoutingCC.CCAInvoiceNumber) + '<b class="float-right">' + ' :     رقم الفاتوره  -   ' + '</b></div>';
                _html += '             <div class="col-xs-12 m-l-n text-right m-t-sm">' + (pRoutingCC.BookingNumber == 0 ? "&emsp;" : pRoutingCC.BookingNumber) + '<b class="float-right">' + ' :     رقم اذن الشحن  -   ' + '</b></div>';
                if (pDefaults.UnEditableCompanyName == "ELI") {
                    _html += '             <div class="col-xs-12 m-l-n text-right m-t-sm">' + (pRoutingCC.ConcedeCompanyName == 0 ? "&emsp;" : pRoutingCC.ConcedeCompanyName) + '<b class="float-right">' + ' :     الشركة المتنازلة  -   ' + '</b></div>';
                    _html += '             <div class="col-xs-12 m-l-n text-right m-t-sm">' + (pRoutingCC.ConcedeNumber == 0 ? "&emsp;" : pRoutingCC.ConcedeNumber) + '<b class="float-right">' + ' :     رقم التنازل  -   ' + '</b></div>';
                    _html += '             <div class="col-xs-12 m-l-n text-right m-t-sm">' + (pRoutingCC.ConcedeTotalQty == 0 ? "&emsp;" : pRoutingCC.ConcedeTotalQty) + '<b class="float-right">' + ' :     أصل كمية التنازل  -   ' + '</b></div>';
                    _html += '             <div class="col-xs-12 m-l-n text-right m-t-sm">' + (pRoutingCC.ConcedeQty == 0 ? "&emsp;" : pRoutingCC.ConcedeQty) + '<b class="float-right">' + ' :     الكمية المخصومة للشحنة الحالية  -   ' + '</b></div>';
                    _html += '             <div class="col-xs-12 m-l-n text-right m-t-sm">' + (pRoutingCC.CCApproveNo == 0 ? "&emsp;" : pRoutingCC.CCApproveNo) + '<b class="float-right">' + ' :     رقم الموافقة  -   ' + '</b></div>';
                    _html += '             <div class="col-xs-12 m-l-n text-right m-t-sm">' + (pRoutingCC.CCApproveNo == 0 ? "&emsp;" : pRoutingCC.CCInvoiceNo) + '<b class="float-right">' + ' :     رقم الفاتورة  -   ' + '</b></div>';
                    _html += '             <div class="col-xs-12 m-l-n text-right m-t-sm">' + (pRoutingCC.CCApproveNo == 0 ? "&emsp;" : pRoutingCC.CCTotalQty) + '<b class="float-right">' + ' :     اجمالي الكمية  -   ' + '</b></div>';
                    _html += '             <div class="col-xs-12 m-l-n text-right m-t-sm">' + (pRoutingCC.CCApproveNo == 0 ? "&emsp;" : pRoutingCC.CCSubtractQty) + '<b class="float-right">' + ' :     الكمية المخصومة  -   ' + '</b></div>';
                    _html += '             <div class="col-xs-12 m-l-n text-right m-t-sm">' + (pRoutingCC.CCApproveNo == 0 ? "&emsp;" : pRoutingCC.CCNetQty) + '<b class="float-right">' + ' :     الرصيد بعد الخصم  -   ' + '</b></div>';

                }

                _html += '             <div class="col-xs-12 m-l-n m-t text-center"><b>' + '' + ' ..... وتفضلوا بقبول فائق الشكر و تقدير  ' + '</b></div>';
                _html += '             <div class="col-xs-12 m-l-n m-t"><b>' + pDefaults.CompanyLocalName + '</b></div>';

                _html += '         </body>';
                _html += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                _html += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                _html += '     </footer>';
                _html += '</html>';
                if (pOption == "Print" || pOption == undefined || pOption == null) {
                    var mywindow = window.open('', '_blank');
                    mywindow.document.write(_html);
                    mywindow.document.close();
                }
                else if (pOption == "Email") {
                    ////SendPDFEmail_General(pEmail_Subject, pEmail_To, phtml, pReportTitle, null);
                    //SendPDFEmail_General("Operation " + $("#hOperationCode").val(), pEmail_To, _html, pReportTitle, null);
                }
            } //if (_ReturnedMessage == "") {
            else
                swal("Sorry", _ReturnedMessage);
            FadePageCover(false);
        }
        , null);
}
function RoutingsCC_PrintStages(pRoutingIDCCToPrint, pOption) {
    debugger;
    FadePageCover(true);
    var pParametersWithValues = {
        pRoutingIDCCToPrint: pRoutingIDCCToPrint
    };
    CallGETFunctionWithParameters("/api/Routings/RoutingsCC_PrintRequest", pParametersWithValues
        , function (pData) {
            var _ReturnedMessage = pData[0];
            var pRoutingCC = JSON.parse(pData[1]);
            var pOperationHeader = JSON.parse(pData[2]);
            var pClearanceTracking = JSON.parse(pData[3]);
            var _html = '';
            var _ReportTitle = "Clearance Stages";
            if (_ReturnedMessage == "") {

                var html = '';
                //$("#tblDocsOut tr[id=60] td.IsPrintISOCode input[type=checkbox]").prop('checked')
                //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                html += '<html>';
                html += '     <head><title>' + _ReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                html += '         <body style="background-color:white;">';
                //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ShowHeader input[type=checkbox]").prop("checked"))
                html += '         <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
                html += '             <div class="col-xs-6"><b>Operation No. :</b> ' + pOperationHeader.Code + '</div><div class="col-xs-6 text-right"><b>Date :</b> ' + getTodaysDateInddMMyyyyFormat() + '</div>';
                html += '             <div class="col-xs-12 text-center text-ul"><h3>' + _ReportTitle + '</h3></div> </br>';
                //html += '             <div> &nbsp; </div>'

                html += '                         <table id="tblClearanceStagesDocsOut" class="table table-striped b-light b-a text-sm table-bordered">'; //table-hover
                html += '                             <thead>';
                html += '                                 <tr>';
                html += '                                     <th>Stage</th>';
                html += '                                     <th>Date</th>';
                html += '                                     <th>Notes</th>';
                //html += '                                     <th>Done(Y/N)</th>';
                html += '                                 </tr>';
                html += '                             </thead>';
                html += '                             <tbody>';
                $.each(pClearanceTracking, function (i, item) { //no final shipping declaration for air
                    html += '                                 <tr class="" style="font-size:95%;">';
                    html += '                                     <td>' + item.TrackingStageName + '</td>';
                    html += '                                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.TrackingDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.TrackingDate))) + '</td>';
                    html += '                                     <td>' + (item.Notes == 0 ? "" : item.Notes) + '</td>';
                    //html += '                                     <td>' + (item.Done ? "Y" : "N") + '</td>';
                    html += '                                 </tr>';

                });

                html += '                             </tbody>';
                html += '                         </table>';

                html += '         </body>';
                html += '         <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                //html += '           <div class="row m-l">Please apply to our office with the original B/L to release your Delivery Order / Letter as soon as possible.</div>';
                //html += '           <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';
                //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.IsPrintISOCode input[type=checkbox]").prop("checked"))
                //html += '         <div class="row m-l">' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ISOCode").text() + '</div>';
                //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ShowFooter input[type=checkbox]").prop("checked"))
                //html += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                html += '         </footer>';

                html += '</html>';
                if (pOption == "Print" || pOption == undefined || pOption == null) {
                    var mywindow = window.open('', '_blank');
                    mywindow.document.write(html);
                    mywindow.document.close();
                }
                else if (pOption == "Email") {
                    //DocsOut_SendEmail($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.TableOrViewName").text(), html);
                }
            }//if (_ReturnedMessage == "") {
            else
                swal("Sorry", _ReturnedMessage);
            FadePageCover(false);
        }
        , null);
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


function Routings_GenerateCargo() {
    debugger;

    var pTruckerID = $('#slRoutingsLinesTruckingOrder').val();

    if (pTruckerID == "" || pTruckerID == null)
        swal(strSorry, "Choose Trucker First");
    else {
        FadePageCover(true);
        if ($("#cbIsVehicle").prop("checked") == true) {
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
        else {

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

        var CargoGrossWeight = $('#txtAddedGrossWeightTruckingOrder').val();
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

    var RemainingGrossWeight = parseFloat(TotalGrossWeight) - parseFloat(CargoGrossWeight) - parseFloat(TotalTruckingOrderGross);

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
        };
        CallPOSTFunctionWithParameters("/api/Routings/Vehicle_Save", pParametersWithValues
            , function (pData) {
                var _MessageReturned = pData[0];

                if (_MessageReturned == "") {
                    jQuery("#SelectCargoModal").modal("hide");
                    swal("Success", "Saved successfully.");
                    Routing_TransferCargo();
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
    //Confirmation message to delete

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
                    , { "pTruckingOrderCargoIDs": GetAllSelectedIDsAsString(ptblModalName) }
                    , function () {
                        Routing_TransferCargo()
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
        , null
        //function () {
        //    HighlightText("#" + pDivName, $("#txtSearchCharges").val().trim().toUpperCase());
        //}
    );

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
                divData += '                <th>' + TranslateString("Container Type") + '</th> ';
                divData += '                <th>' + TranslateString("Container Number") + '</th> ';
                divData += '                <th>' + TranslateString("Carrier Seal") + '</th> ';
                divData += '                <th>' + TranslateString("TareWt(KG)") + '</th> ';
                divData += '                <th>' + TranslateString("Vol.(CBM)") + '</th> ';
                divData += '                <th>' + TranslateString("Net Wt(KG)") + '</th> ';
                divData += '                <th>' + TranslateString("GrossWt(KG)") + '</th> ';
                divData += '                <th>' + TranslateString("VGM(KG)") + '</th> ';
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

                divData += ' <div class="form-group col-sm-2">';
                divData += ' <label>Remaining Gross Weight</label>';
                divData += '<input type="text" id="txtRemainingGrossWeightTruckingOrder" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" class="form-control parsley-validated input-sm" data-required="false" maxlength="15" placeholder="" style="text-transform:uppercase" disabled="disabled" />';
                divData += '</div>';

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
            swal("Sorry", "Please, press Ctrl+Shft+R, and if the problem persists contact your technical support! FillTransferCargoModalTable in mainapp.master.js", "");
        }
    });
}


/*****************************Tracking Fns*************************************/
function CustomClearanceTracking_LoadData() {
    debugger;
    if ($("#tblCustomClearanceTracking tbody tr").length == 0) {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/OperationCustomClearanceTracking/LoadAll",
            {
                pWhereClause: "WHERE CustomClearanceRoutingID =" + ($("#hRoutingIDCustomsClearance").val() == "" ? 0 : $("#hRoutingIDCustomsClearance").val()) + " ORDER BY ViewOrder, TrackingDate"
            }
            , function (pData) { CustomClearanceTracking_BindTableRows(JSON.parse(pData[0])); FadePageCover(false); }
            , null);
    }
}
function CustomClearanceTracking_BindTableRows(pCustomClearanceTracking) {
    debugger;
    ClearAllTableRows("tblCustomClearanceTracking");
    //var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' title='Print'> <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    var alarmControlsText = " class='btn btn-xs btn-rounded btn-warning float-right' title='Print'> <i class='fa fa-bell' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Alarm" + "</span>";
    var emailControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' title='Print'> <i class='fa fa-envelope' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Email" + "</span>";
    $.each(pCustomClearanceTracking, function (i, item) {
        AppendRowtoTable("tblCustomClearanceTracking",
            ("<tr ID='" + item.ID + "' " + (1 == 1 ? "ondblclick='CustomClearanceTracking_FillControls(" + item.ID + ',"tblCustomClearanceTracking"' + ");'>" : ">")
                + "<td class='TrackingID'> <input " + (1 == 1 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='TrackingStageID hide'>" + item.TrackingStageID + "</td>"
                + "<td class='TrackingStageName CcStage'>" + (item.TrackingStageID == 0 ? "" : item.TrackingStageName) + "</td>"
                + "<td class='TrackingCustodyID hide'>" + item.CustodyID + "</td>"
                + "<td class='TrackingCustodyName CcCustody'>" + (item.CustodyID == 0 ? "" : item.CustodyName) + "</td>"
                //+ "<td class='TrackingStageNotes hide'>" + item.TrackingStageNotes + "</td>"
                + "<td class='TrackingStringTrackingDate'>" + item.StringTrackingDate + "</td>"
                + "<td class='TrackingNotes'>" + item.Notes + "</td>"
                + "<td class='TrackingDone'> <input id='cbCCIsDone" + item.ID + "' type='checkbox' disabled='disabled' val='" + item.Done+"' "+(item.Done?'checked':'')+"/></td>"
                //+ "<td class='TrackingCreatorName hide'>" + item.CreatorName + "</td>"
                //+ "<td class='ModificatorName hide'>" + item.ModificatorName + "</td>"
                //+ "<td class='hide'><a href='#TrackingModal' data-toggle='modal' onclick='Tracking_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
                + "<td class=''>"
                + "<a href='#' class='hide' data-toggle='modal' onclick='CustomClearanceTracking_GetAvailableUsers(" + item.ID + ");' " + alarmControlsText + "</a>"
                + "<a href='#' class='CcTrackingStageEmail' data-toggle='modal' onclick='CustomClearanceTracking_OpenSendEmailModal(" + item.ID + " , \"tblCustomClearanceTracking\");' " + emailControlsText + "</a>"
                + "</td>"
                + "</tr>"));
    });
    if (pDefaults.UnEditableCompanyName == 'SSH') {
        $('#tblCustomClearanceTracking .CcStage,#tblCustomClearanceTracking .CcCustody,#tblCustomClearanceTracking .CcTrackingStageEmail').addClass('hide');
    }
    //$.each(pTracking, function (i, item) {
    //    AppendRowtoTable("tblCustomClearanceTracking",
    //        ("<tr ID='" + item.ID + "' " + (OETra && $("#hIsOperationDisabled").val() == false ? "ondblclick='Tracking_FillControls(" + item.ID + ',"tblCustomClearanceTracking"' + ");'>" : ">")
    //            + "<td class='CustomClearanceTrackingID'> <input " + (1 == 1 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "' /></td>"
    //            + "<td class='TrackingStageID hide'>" + item.TrackingStageID + "</td>"
    //            + "<td class='TrackingStageName'>" + (item.TrackingStageID == 0 ? "" : item.TrackingStageName) + "</td>"
    //            + "<td class='TrackingCustodyID hide'>" + item.CustodyID + "</td>"
    //            + "<td class='TrackingCustodyName'>" + (item.CustodyID == 0 ? "" : item.CustodyName) + "</td>"
    //            //+ "<td class='TrackingStageNotes hide'>" + item.TrackingStageNotes + "</td>"
    //            + "<td class='TrackingStringTrackingDate'>" + item.StringTrackingDate + "</td>"
    //            + "<td class='TrackingNotes'>" + item.Notes + "</td>"
    //            + "<td class='TrackingDone'> <input id='cbCCIsDone_CustomClearanceTracking" + item.ID + "' type='checkbox' disabled='disabled' val='" + (item.Done == true ? "true' checked='checked'" : "'") + " /></td>"
    //            //+ "<td class='TrackingCreatorName hide'>" + item.CreatorName + "</td>"
    //            //+ "<td class='ModificatorName hide'>" + item.ModificatorName + "</td>"
    //            //+ "<td class='hide'><a href='#TrackingModal' data-toggle='modal' onclick='Tracking_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
    //            + "<td class=''>"
    //            + "<a href='#' data-toggle='modal' onclick='Tracking_GetAvailableUsers(" + item.ID + ");' " + alarmControlsText + "</a>"
    //            + "<a href='#' data-toggle='modal' onclick='Tracking_OpenSendEmailModal(" + item.ID + ", \"tblCustomClearanceTracking\");' " + emailControlsText + "</a>"
    //            + "</td>"
    //            + "</tr>"));
    //});

    BindAllCheckboxonTable("tblCustomClearanceTracking", "CustomClearanceTrackingID", "cb-CheckAll-CustomClearanceTracking");
    CheckAllCheckbox("HeaderDeleteCustomClearanceTrackingID");

    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}


function CustomClearanceTracking_OpenModal() {

    if (IsNull($("#hRoutingIDCustomsClearance").val(), "") == "")
        swal("Sorry", "Please, save record first.");
    else {
        CustomClearanceTracking_ClearAllControls();
        jQuery("#CustomClearanceTrackingModal").modal("show");

    }
}


function CustomClearanceTracking_ClearAllControls() {
    ClearAll("#CustomClearanceTrackingModal");
    var TodaysDateInddMMyyyyFormat = getTodaysDateInddMMyyyyFormat();
    $("#txtCustomClearanceTrackingDate").val(TodaysDateInddMMyyyyFormat);
    var pWhereClause = "WHERE 1=1 AND IsClearance=1";
    if ($("#slCustomClearanceTrackingCustody option").length < 2) {
        FadePageCover(true);
        GetListWithNameAndWhereClause(null, "/api/Custody/LoadAll", TranslateString("SelectFromMenu"), "slCustomClearanceTrackingCustody"
            , "ORDER BY Name"
            , null //function () { FadePageCover(false); }
        );
        //GetListWithNameAndWhereClause(null, "/api/CustomClearanceTrackingStage/LoadAll", TranslateString("SelectFromMenu"), "slCustomClearanceTrackingStage"
        //, pWhereClause
        //    , function () { FadePageCover(false); }
        //);
        GetListWithNameAndWhereClauseWithMultiAttrs(null, "Notes", "/api/TrackingStage/LoadAll", TranslateString("SelectFromMenu")
            , "slCustomClearanceTrackingStage"
            , pWhereClause
            , function () { FadePageCover(false); });
    }
    else {
        $("#slCustomClearanceTrackingCustody").val("");
        $("#slCustomClearanceTrackingStage").val("");
    }
    $("#btnSaveCustomClearanceTracking").attr("onclick", "CustomClearanceTracking_Insert(false);");
    $("#btnSaveAndNewCustomClearanceTracking").attr("onclick", "CustomClearanceTracking_Insert(false);");
}
function CustomClearanceTracking_FillControls(pID, pTableName) {
    debugger;
    jQuery("#CustomClearanceTrackingModal").modal("show");
    ClearAll("#CustomClearanceTrackingModal");
    $("#hCustomClearanceTrackingID").val(pID);
    var tr = $("#" + pTableName + " tr[ID='" + pID + "']");
    $("#lblCustomClearanceTrackingShown").html(": " + $(tr).find("td.TrackingStageName").text());
    var pCustomClearanceTrackingStageID = $(tr).find("td.TrackingStageID").text();
    var pCustomClearanceTrackingCustodyID = ($(tr).find("td.TrackingCustodyID").text() == 0 ? "" : $(tr).find("td.TrackingCustodyID").text());
    $("#txtCustomClearanceTrackingDate").val($(tr).find("td.TrackingStringTrackingDate").text());
    $("#txtCustomClearanceTrackingNotes").val($(tr).find("td.TrackingNotes").text());
    if (pTableName == "tblCustomClearanceTracking")
        $("#cbIsDoneCustomClearanceTracking").prop("checked", $("#cbCCIsDone" + pID).prop("checked"));
    else
        $("#cbIsDoneCustomClearanceTracking").prop("checked", $("#cbCCIsDone" + pID).prop("checked"));
    var pWhereClause = "WHERE 1=1 AND IsClearance = 1";

    pWhereClause += " ORDER BY ViewOrder";
    if ($("#slCustomClearanceTrackingCustody option").length < 2) {
        FadePageCover(true);
        GetListWithNameAndWhereClause(pCustomClearanceTrackingCustodyID, "/api/Custody/LoadAll", TranslateString("SelectFromMenu")
            , "slCustomClearanceTrackingCustody"
            , "ORDER BY Name"
            , null //function () { FadePageCover(false); }
        );


        GetListWithNameAndWhereClauseWithMultiAttrs(pCustomClearanceTrackingStageID, "Notes", "/api/TrackingStage/LoadAll", TranslateString("SelectFromMenu")
            , "slCustomClearanceTrackingStage"
            , pWhereClause
            , function () { FadePageCover(false); });
    }
    else {
        $("#slCustomClearanceTrackingCustody").val(pCustomClearanceTrackingCustodyID);
        $("#slCustomClearanceTrackingStage").val(pCustomClearanceTrackingStageID);
    }

    $("#hPreCustomClearanceTrackingStageNotes").val($(tr).find("td.TrackingNotes").text());
    $("#hPreCustomClearanceTrackingStageID").val(pCustomClearanceTrackingStageID);
    $("#btnSaveCustomClearanceTracking").attr("onclick", "CustomClearanceTracking_Update(false);");
    $("#btnSaveAndNewCustomClearanceTracking").attr("onclick", "CustomClearanceTracking_Update(false);");

}
function GetCustomClearanceTrackingStageNotes() {
    if (IsNull($("#hCustomClearanceTrackingID").val(), "0") == "0" || $('#hPreCustomClearanceTrackingStageID').val() != $("#slCustomClearanceTrackingStage").val()) {
        $('#txtCustomClearanceTrackingNotes').val($("#slCustomClearanceTrackingStage option:selected").attr('Notes'));
    }
    else if ($('#hPreCustomClearanceTrackingStageID').val() == $("#slCustomClearanceTrackingStage").val()) {
        $('#txtCustomClearanceTrackingNotes').val($("#hPreCustomClearanceTrackingStageNotes").val());
    }

}
function CustomClearanceTracking_Insert(pSaveandAddNew) {
    debugger;
    if (ValidateForm("form", "CustomClearanceTrackingModal")) {
        FadePageCover(true);
        var pParametersWithValues = {
            pCustomClearanceRoutingID: $("#hRoutingIDCustomsClearance").val()
            , pTrackingStageID: $("#slCustomClearanceTrackingStage").val() > 0 ? $("#slCustomClearanceTrackingStage").val():0
            , pCustodyID: $("#slCustomClearanceTrackingCustody").val() > 0 ? $("#slCustomClearanceTrackingCustody").val():0 
            , pTrackingDate: ConvertDateFormat($("#txtCustomClearanceTrackingDate").val())
            , pNotes: $("#txtCustomClearanceTrackingNotes").val().trim() == "" ? "0" : $("#txtCustomClearanceTrackingNotes").val().trim().toUpperCase()
            , pDone: $("#cbIsDoneCustomClearanceTracking").prop("checked")
        };
        CallGETFunctionWithParameters("/api/OperationCustomClearanceTracking/Insert", pParametersWithValues
            , function (pData) {
                debugger;
                if (pData[0]) {
                    CustomClearanceTracking_BindTableRows(JSON.parse(pData[1]));
                    jQuery("#CustomClearanceTrackingModal").modal("hide");
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
            , null);
    }
}
function CustomClearanceTracking_Update(pSaveandAddNew) {
    debugger;
    if (ValidateForm("form", "CustomClearanceTrackingModal")) {
        FadePageCover(true);
        var pParametersWithValues = {
            pID: $("#hCustomClearanceTrackingID").val()
            , pCustomClearanceRoutingID: $("#hRoutingIDCustomsClearance").val()
            , pTrackingStageID: $("#slCustomClearanceTrackingStage").val() > 0 ? $("#slCustomClearanceTrackingStage").val() : 0
            , pCustodyID: $("#slCustomClearanceTrackingCustody").val() > 0 ? $("#slCustomClearanceTrackingCustody").val() : 0 
            , pTrackingDate: ConvertDateFormat($("#txtCustomClearanceTrackingDate").val())
            , pNotes: $("#txtCustomClearanceTrackingNotes").val().trim() == "" ? "0" : $("#txtCustomClearanceTrackingNotes").val().trim().toUpperCase()
            , pDone: $("#cbIsDoneCustomClearanceTracking").prop("checked")
        };
        CallGETFunctionWithParameters("/api/OperationCustomClearanceTracking/Update", pParametersWithValues
            , function (pData) {
                debugger;
                if (pData[0]) {
                    CustomClearanceTracking_BindTableRows(JSON.parse(pData[1]));
                    jQuery("#CustomClearanceTrackingModal").modal("hide");
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
            , null);
    }
}
function CustomClearanceTracking_DeleteList(pTableName) {
    debugger;
    var pDeletedCustomClearanceTrackingIDs = GetAllSelectedIDsAsString(pTableName);
    if (pDeletedCustomClearanceTrackingIDs != "")
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
                var pParametersWithValues = { pDeletedTrackingIDs: pDeletedCustomClearanceTrackingIDs, pCustomClearanceRoutingID: $("#hRoutingIDCustomsClearance").val() };
                CallGETFunctionWithParameters("/api/OperationCustomClearanceTracking/Delete", pParametersWithValues
                    , function (pData) {
                        if (pData[0])
                            CustomClearanceTracking_BindTableRows(JSON.parse(pData[1]));
                        else
                            swal("Sorry", "Connection failed, please try again.");
                        FadePageCover(false);
                    }
                    , null);
            });
}
function CustomClearanceTracking_GetAvailableUsers(pTrackingStageID) {
    debugger;
    Receptionists_GetAvailableUsers();
    $("#btnCheckboxesListApply").attr("onclick", "CustomClearanceTracking_SendAlarm(" + pCustomClearanceTrackingStageID + ");");
    $("#btnCheckboxesListApply").html("<span class='glyphicon glyphicon-send'></span> Send");
    $("#btn-SearchItems").attr("onclick", "Receptionists_GetAvailableUsers();");
}
function CustomClearanceTracking_SendAlarm(pCustomClearanceTrackingStageID) {
    debugger;
    var pModalName = "CheckboxesListModal";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pAlarmReceiversIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
    if (pAlarmReceiversIDs == "")
        swal("Sorry", "You did not select any receivers.");
    else {
        FadePageCover(true);
        var pParametersWithValues = {
            pTrackingStageID: pCustomClearanceTrackingStageID
            , pAlarmReceiversIDs: pAlarmReceiversIDs
        };
        CallGETFunctionWithParameters("/api/OperationCustomClearanceTracking/SendAlarm", pParametersWithValues
            , function (pData) {
                var _MessageReturned = pData[0];
                if (pData[0] == "")
                    swal("Success", "Task sent successfully.");
                else
                    swal("Sorry", _MessageReturned);
                FadePageCover(false);
            }
            , null);
    }
}
//MOSTAA_01/10/2020
function CustomClearanceTracking_OpenSendEmailModal(pID, tblID) {
    jQuery("#CustomClearanceTrackingEMailModal").modal("show");
    ClearAll("#CustomClearanceTrackingEMailModal");
    $("#hEmailCustomClearanceTrackingID").val(pID);
    var tr = $("#" + tblID + " tr[ID='" + pID + "']");
    $('#txtCustomClearanceTrackingEmailNotes').val($(tr).find("td.TrackingNotes").text());

    $('#lblShownCustomClearanceTrackingEmail').text($("#hClientEmail").val().toLowerCase());
    $('#txtCustomClearanceTrackingEmailTo').val($("#hClientEmail").val().toLowerCase());
}


function CustomClearanceTracking_SendEmail() {
    debugger;
    swal({
        title: "Are you sure?",
        text: "This will be sent via email.",
        type: "", //"warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, Send.",
        closeOnConfirm: true
    },
        function () {
            FadePageCover(true);
            var pParametersWithValues = {
                pTrackingStageID_SendEmail: $("#hEmailCustomClearanceTrackingID").val()
                , pSubject: $('#txtCustomClearanceTrackingEmailSubject').val()
                , pTo: $('#txtCustomClearanceTrackingEmailTo').val()
                , pCC: $('#txtCustomClearanceTrackingEmailCC').val()
                , pBody: $('#txtCustomClearanceTrackingEmailNotes').val()
            };
            CallGETFunctionWithParameters("/api/OperationCustomClearanceTracking/CustomClearanceTracking_SendEmail", pParametersWithValues
                , function (pData) {
                    var _MessageReturned = pData[0];
                    if (pData[0] == "")
                        swal("Success", "Task sent successfully.");
                    else
                        swal("Sorry", _MessageReturned);
                    FadePageCover(false);
                }
                , null);
        });
}
/***********************************************************************************/


function Print_PackingList() {
    debugger;





    $.ajax({
        type: "Get",
        url: "/api/Routings/PackingList_Print",
        data: {
            pOperationID: $("#slDocsOutOperations").val()
        },
        dataType: "json",
        success: function (data) {
            PackingList_Print(data, "Print");

        }




    });




}



function PackingList_Print(data, pOption) {
    debugger;

    var objCvwOperations = JSON.parse(data[0]);
    var objCvwOperationPartners = JSON.parse(data[1]);
    var objCST_PreGateIn = JSON.parse(data[2]);
    var objCST_PackingDetails = JSON.parse(data[3]);
    var pGetContainerVal = JSON.parse(data[4]);

    if (pDefaults.UnEditableCompanyName == "TMP") {
        var html = '';
        html += '<html>';
        html += '     <head><title>' + '' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        html += '         <body style="background-color:white;">';
        html += '        <div style="margin-top: 15px;" class="col-xs-12 text-center text-ul m-t-n-lg"> <img  style = " width: 350px; float: left; display: block;" src="/Content/Images/CompanyHeader.jpg" alt="logo"/> </br>';
        html += '            <h3 style=" margin-right: 600px;" >' + 'Packing List ' + '</h3></div>';



        //html += '     <td>       <div class="col-xs-6" style="font-size: 18px;"><b>Date:</b> ' + ConvertDateFormat(FormattedTodaysDate) + '</div><div class="col-xs-6" style="font-size: 18px;"><b>Operation No. :</b> ' + pOperationCode + (pDefaults.UnEditableCompanyName == "ILS" || pDefaults.UnEditableCompanyName == "ILSEG" ? (" / Ref: " + pOperationHeader.Reference) : "") + (pDefaults.UnEditableCompanyName == "CFR" ? (" / Packages: " + pOperationHeader.NumberOfPackages + "x" + pOperationHeader.PackageTypeName) : "") + '</div>';



        //---------------- 1ST TABLE ROW 



        // left
        //html += '<div class="col-xs-9" style="font-size: 18px;">'
        //html += '    </div>  '

        // right
        html += '<div class="col-xs-12" style="font-size: 18px;">'

        html += ' <table id="tblMaster1Report" style="width: 355px; font-size: 15px; margin-left: 600px;" class="table b-light b-a text-sm table-bordered"> '

        html += ' <tbody>   '

        for (var i = 0; i < objCST_PreGateIn.length; i++) {
            html += '  <tr class="" style="background-color: #767676 !important; color: white;"> '
            if (i == 0) {
                html += ' <td>' + ' P.O. ' + ' </td>'
            }
            else {
                html += ' <td>' + '' + ' </td>'
            }
            html += ' <td>' + objCST_PreGateIn[i].BookingNumber + ' </td>'
            html += '           </tr>    '
        }

        html += '      </tbody >      </table >      '

        html += '    </div>  '



        // left Agro Info 

        html += '             <div   class="col-xs-12" style = "font-size: 18px;margin-left: 15px;margin-top: 40px; " > 1 st of May Buildings No.6 apartment 408  <br/> Nasr Street Elssa Square, Cairo, Egypt <br/> Tex/Fax (+202)22716018  <br/> GGN : 4059883984866</div>';



        // right
        //  html += '<div class="col-xs-6" style="font-size: 18px;">'
        //html += '    </div>  '

        var CustName = custAdress = Custphone = "";
        var ConsigneeName = ConsigneeAdress = Consigneephone = "";
        for (var i = 0; i < objCvwOperationPartners.length; i++) {

            if (objCvwOperationPartners[i].PartnerTypeName == "CONSIGNEE") {

                CustName = objCvwOperationPartners[i].PartnerName;
                Custphone = objCvwOperationPartners[i].PhonesAndFaxes;
                custAdress = objCvwOperationPartners[i].Address;
            }

        }


        // left Customer 
        html += '<div class="col-xs-6" style="font-size: 18px; margin-left: 15px;">'


        html += ' Customer : ' + CustName + ' <br/> ' + custAdress + '<br/>' + Custphone


        html += '                     </div>';



        // right Consignee 
        html += '<div class="col-xs-5" style="font-size: 18px;">'
        html += ' Consignee : ' + CustName + ' <br/> ' + custAdress + '<br/>' + Custphone
        html += '                     </div>';



        html += '                         <div class="col-xs-6" style = " font-size: 18px ; margin-left: 15px; " > ETA :   ' + GetDateFromServer(objCvwOperations[0].ETAPOLDate) + '</div>';
        html += '                         <div class="col-xs-5" style = " font-size: 18px ; " > ETD :   ' + ''  /*objCvwOperations[0].pETAPOLDate */ + '</div>';





        //LEFT ContainerNumber 
        html += '<div class="col-xs-6" style="font-size: 18px;">'

        html += ' <table id="tblMaster2Report" style="border: 2px solid #000;  width: 355px;  /* float: left; */ font-size: 13px; /* margin-left: 85px;" class="table b-light b-a text-sm table-bordered"> '
        html += ' <thead style = "" > '
        html += '  <th>Container No</th> '

        html += '    </tr>  </thead>   '
        html += ' <tbody>   '

        for (var i = 0; i < pGetContainerVal.length; i++) {
            html += '  <tr class="" style="background-color: white !important;"> '
            html += ' <td>' + pGetContainerVal[i].ContainerNumber + ' </td>'
            html += '           </tr>    '
        }

        html += '      </tbody >      </table >      '

        html += '    </div>  '


        // right
        html += '<div class="col-xs-6" style="font-size: 18px;">'

        html += '   <h4> Vessel Name : ' + objCvwOperations[0].VesselName + '  </h4> '
        html += '   <h4> Line :  ' + objCvwOperations[0].LineName + '  </h4> '
        html += '   <h4> POD :  ' + objCvwOperations[0].pPODCodeAndName + '    </h4> '

        html += '    </div>  '





        html += ' <table id="tblDetails1Report" style="border: 2px solid #000; /* float: left; */ font-size: 13px; /* margin-left: 85px;" class="table b-light b-a text-sm table-bordered"> '
        html += ' <thead style = "" > '
        html += '  <th>No</th> '
        html += '  <th> </th> '
        html += '  <th>Box</th> '
        html += '  <th>Remarks</th> '

        html += '    </tr>  </thead>   '
        html += ' <tbody>   '
        var Total = 0;
        for (var i = 0; i < objCST_PackingDetails.length; i++) {
            if (objCST_PackingDetails[i].QuantityBoxes != 0) {

                html += '  <tr class="" style="background-color: white !important;"> '
                html += ' <td>' + objCST_PackingDetails[i].PalletRefNumber + ' </td>'
                html += ' <td>' + objCST_PackingDetails[i].CommodityName + ' (' + objCST_PackingDetails[i].Size + ') (' + objCST_PackingDetails[i].PackType + ' Kg) ' + objCST_PackingDetails[i].VarietyName + '</td>'
                html += ' <td>' + objCST_PackingDetails[i].QuantityBoxes + ' </td>'
                html += ' <td>' + objCST_PackingDetails[i].ContainerNumber + ' - P.O. ' + objCST_PackingDetails[i].BoogingNumber + ' </td>'
                Total += objCST_PackingDetails[i].QuantityBoxes;
                html += '           </tr>    '
            }
        }

        html += '           <tr>    '
        html += ' <td style = "background-color: #d0cece!important;"> </td>';
        html += ' <td style = "background-color: #d0cece!important;"> Total </td>';
        html += ' <td style = "background-color: #d0cece!important;"> </td>';
        html += ' <td style = "background-color: #d0cece!important;">' + Total + ' </td>';
        html += '           </tr>    '

        html += '      </tbody >      </table >      '






        //html += '                         <div> &nbsp; </div>'


        ////// konooooooooooo
        //html += '                         <div class="form-group float-right m-r-lg strong">';
        //html += '                             <b>Total: ' + $("#tblInvoices #" + pID + " td.InvoiceAmount").text() + ' ' + $("#tblInvoices #" + pID + " td.InvoiceCurrency").text() + '</b>';
        //html += '                         </div>';
        //html += '                     </div>'; //of table-responsive
        ////html += '                 </section>';
        ////html += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dada</br></br></br></br></br>dada</br></br></br></br></br>dada</br></br></br></br></br>dada</br></br></br></br></br>dada</br></br></br></br></br>dada</br></br></br></br></br>dada</br></br></br></br></br>dada</br></br></br></br></br>dada</br></br></br></br></br>dada</br></br></br></br></br>dada</br></br></br></br></br>dada</br></br></br></br></br>dada</div>';
        //html += '             <div class="col-xs-8 m-l m-t-n"><label><input type="checkbox" ' + (pPOrC == 'P' ? ' checked ' : '') + ' disabled="disabled">&nbsp;PrePaid</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
        //html += '                                           <label><input type="checkbox" ' + (pPOrC == 'C' ? ' checked ' : '') + ' disabled="disabled">&nbsp;Collect</label></div>';
        //html += '             <div class="col-xs-4 m-t-n float-right"><b><i>Signature & Stamp</i></b></div>';

        html += '         </body>';

        html += '     <footer class="footer col-xs-12 hide" style="width:100%; position:absolute; bottom:0;">';
        //html += '         <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';
        //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.IsPrintISOCode input[type=checkbox]").prop("checked"))
        //    html += '     <div class="row m-l">' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ISOCode").text() + '</div>';
        //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ShowFooter input[type=checkbox]").prop("checked"))
        html += '     <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        html += '     </footer>';
        //EOF All other companies


        html += '</html>';
        if (pOption == "Print" || pOption == undefined || pOption == null) {
            var mywindow = window.open('', '_blank');
            mywindow.document.write(html);
            mywindow.document.close();
        }


    }

}

function CopyTruckOrder(pID) {
    if (!(pID > 0))
        return;
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/Routings/CopyTruckOrder", { pID: pID }
        , function (pData) {
            FadePageCover(false);
            if (pData.Copied) {
                swal("Success", "Order copied successfully.");
                Routings_BindTableRows(JSON.parse(pData.Body));
            }
            else {
                swal("Sorry", "Order copy faild.");
                console.log(pData.Ex);
            }
        }
        , null);
}

function LoadPickupAddresses() {
    if ($('#dlPickupAddressTruckingOrder option').length > 0)
        return;

    CallGETFunctionWithParameters("/api/Routings/LoadPickupAddresses", {}
        , function (pData) {
            var data = JSON.parse(pData);
            $.each(data, function (i, item) {
                $('#dlPickupAddressTruckingOrder').append('<option value="' + item + '" />');
            });
        }
        , null);
}

function CalcCCNetQty() {
    var totalQty = Number($('#txtCCTotalQty').val());
    var qty = Number($('#txtCCSubtractQty').val());
    $('#txtCCNetQty').val((totalQty - qty).toFixed(3));
}

function SaveTruckingOrder_FleetElite(pTruckingOrder) {
    if (!['ELI','ELC','SSH'].includes(pDefaults.UnEditableCompanyName))
        return;
    debugger;
    var op = pOperationHeader_Global;
    var tr = pTruckingOrder;
    var mainRouteRow = $('#tblRoutings tbody tr[val=' + MainCarraigeRoutingTypeID + ']');
    var mr = {
        ID: $(mainRouteRow).attr('ID'),
        RoutingTypeID: MainCarraigeRoutingTypeID,
        VoyageOrTruckNumber: $(mainRouteRow).find('td.VoyageOrTruckNumber').text(),
        VesselID: $(mainRouteRow).find('td.Vessel').text(),
    };

    var params = {
        "pUserID": 0,
        "pIsShipment": op.IsShipment,
        "pCode": op.Code,
        "pHouseNumber": op.HouseNumber,
        "pBranchID": 0,
        "pSalesmanID": 0,
        "pBLTypeIconName": op.BLTypeIconName,
        "pBLTypeIconStyle": op.BLTypeIconStyle,
        "pBLType": op.BLType,
        "pDirectionType": op.DirectionType,
        "pDirectionIconName": op.DirectionIconName,
        "pDirectionIconStyle": op.DirectionIconStyle,
        "pTransportType": op.TransportType,
        "pTransportIconName": op.TransportIconName,
        "pTransportIconStyle": op.TransportIconStyle,
        "pShipmentType": op.ShipmentType,
        "pMasterBL": op.MasterBL,
        "pShipperID": op.ShipperID,
        "pShipperAddressID": op.ShipperAddressID,
        "pShipperContactID": op.ShipperContactID,
        "pConsigneeID": op.DirectionType == 1 ? op.ConsigneeID : op.DirectionType == 2 ?op.ShipperID:0,
        "pConsigneeAddressID": op.DirectionType == 1 ? op.ConsigneeAddressID : op.DirectionType == 2 ? op.ShipperAddressID : 0 ,
        "pConsigneeContactID": op.DirectionType == 1 ? op.ConsigneeContactID : op.DirectionType == 2 ? op.ShipperContactID : 0,
        "pNotifyID": op.NotifyID,
        "pAgentID": op.AgentID,
        "pAgentAddressID": op.AgentAddressID,
        "pAgentContactID": op.AgentContactID,
        "pIncotermID": op.IncotermID,
        "pPOrC": op.POrC,
        "pMoveTypeID": op.MoveTypeID,
        "pCommodityID": op.CommodityID,
        "pTransientTime": op.TransientTime,
        "pOpenDate": ConvertDateFormat(op.OpenDate) ,
        "pCloseDate": ConvertDateFormat(tr.StuffingDate) ,
        "pCutOffDate": ConvertDateFormat(op.CutOffDate) ,
        "pIncludePickup": op.IncludePickup,
        "pPickupCityID": tr.GateInPortID,
        "pPickupAddressID": op.PickupAddressID,
        "pPOLCountryID": op.POLCountryID,
        "pPOL": tr.GateInPortID,
        "pPODCountryID": op.PODCountryID,
        "pPOD": tr.GateOutPortID,
        "pShippingLineID": op.ShippingLineID,
        "pAirlineID": op.AirlineID,
        "pTruckerID": tr.TruckerID,
        "pIncludeDelivery": op.IncludeDelivery,
        "pDeliveryZipCode": op.DeliveryZipCode,
        "pDeliveryCityID": op.DeliveryCityID,
        "pDeliveryCountryID": op.DeliveryCountryID,
        "pNetWeight": op.NetWeight,
        "pGrossWeight": op.GrossWeight,
        "pVolume": op.Volume,
        "pChargeableWeight": op.ChargeableWeight,
        "pPackageTypeID": op.PackageTypeID,
        "pNumberOfPackages": op.NumberOfPackages,
        "pIsDangerousGoods": op.IsDangerousGoods,
        "pNotes": op.Notes,
        "pCustomerReference": op.CustomerReference,
        "pSupplierReference": op.SupplierReference,
        "pPONumber": op.PONumber,
        "pAgreedRate": op.AgreedRate,
        "pOperationStageID": op.OperationStageID,
        "pNumberOfHousesConnected": op.NumberOfHousesConnected,
        "pIsDelivered": op.IsDelivered,
        "pIsTrucking": op.IsTrucking,
        "pIsInsurance": op.IsInsurance,
        "pIsClearance": op.IsClearance,
        "pIsGenset": op.IsGenset,
        "pIsCourrier": op.IsCourrier,
        "pIsTelexRelease": op.IsTelexRelease,
        "pExpectedDeparture": ConvertDateFormat(GetDateWithFormatMDY(op.ExpectedDeparture)) ,
        "pExpectedArrival": ConvertDateFormat(GetDateWithFormatMDY(op.ExpectedArrival)) ,
        "pVoyageOrTruckNumber": mr.VoyageOrTruckNumber,
        "pVesselID": mr.VesselID,
        "pContainerTypeID": tr.TrContainerTypeID,
        "pNumberOfContainers": tr.TrNumberOfContainers,
        "pContainerTypeID2": tr.CommodityID,
        "pNumberOfContainers2": tr.MaxSupplierContainers,
        "pContainerTypeID3": 0,
        "pNumberOfContainers3": 0,
        "pConsigneeID2": op.ConsigneeID2,
        "pReleaseDate": ConvertDateFormat(GetDateWithFormatMDY(op.ReleaseDate)) ,
        "pBLDate": ConvertDateFormat(GetDateWithFormatMDY(op.BLDate)) ,
        "pMAWBStockID": op.MAWBStockID,
        "pTypeOfStockID": op.TypeOfStockID,
        "pFlightNo": op.FlightNo,
        "pMAWBSuffix": op.MAWBSuffix,
        "pIsAWB": op.IsAWB,
        "pCertificateNumber": op.CertificateNumber,
        "pCountryOfOrigin": op.CountryOfOrigin,
        "pInvoiceValue": op.InvoiceValue,
        "pCurrencyID": op.CurrencyID,
        "pBookingNumber": tr.BookingNumber,
        "pNumberOfOwnFleetTruckingOrders": 0,//no of trucking orders to create
        "IsTruckerOnly": false,
        "pContactName": null,
        "pContactPhones": null,
        "pContactEmail": null,
        "pBoslaOrShehada": 0,
        "pPort_DryID": 0,
        "pPickupAddress": tr.PickupAddress,
        "pGenset": op.IsGenset,
        "pIsBosla": op.IsBosla,
        "pIsCertificate": op.IsCertificate,
        "pBrokerContactName": null,
        "pBrokerContactPhones": null,
        "pCompanyName": pDefaults.UnEditableCompanyName,
        "pForwardingRoutingID": tr.ID
    };

    var baseUrl = '';
    if (location.hostname == 'localhost')
        baseUrl = 'http://localhost:7060/';
    else if (pDefaults.UnEditableCompanyName == 'ELI')
        baseUrl = pDefaults.IsTest ? 'https://fleetelitetest.istegy.com/' : 'https://fleetelite.istegy.com/';
    else if (pDefaults.UnEditableCompanyName == 'ELC')
        baseUrl = pDefaults.IsTest ? '' : 'https://fleetelc.istegy.com/';
    else if (pDefaults.UnEditableCompanyName == 'SSH')
        baseUrl = pDefaults.IsTest ? '' : 'https://fleetsunshine.istegy.com/';
    
    var func = "/api/Operations/CreateFromForwarding";

    $.ajax({
        url: baseUrl+func,
        type:'POST',
        data: params,
        //contentType: "application/json; charset=utf-8",
        crossDomain: true,
        cash:false,
        success: function (pResult) {
            debugger;
            var result = JSON.parse(pResult);
            console.log(result);
            //alert(result);
        },
        error: function () {}
    });

}

function parseDateAA(dateStr) {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day); 
}

function areDatesInOrderAA(gateOutDateStr, stuffingDateStr, gateInDateStr) {
    const gateOutDate = parseDateAA(gateOutDateStr);
    const stuffingDate = parseDateAA(stuffingDateStr);
    const gateInDate = parseDateAA(gateInDateStr);

    if (gateInDateStr != "01/01/1900" && stuffingDateStr != "01/01/1900" && gateOutDateStr != "01/01/1900") {
        return gateOutDate <= stuffingDate && stuffingDate <= gateInDate;
    } else if (gateInDateStr != "01/01/1900" && stuffingDateStr != "01/01/1900") {
        return stuffingDate <= gateInDate;
    } else if (stuffingDateStr != "01/01/1900" && gateOutDateStr != "01/01/1900") {
        return gateOutDate <= stuffingDate;
    } else if (gateInDateStr != "01/01/1900" && gateOutDateStr != "01/01/1900") {
        return gateOutDate <= gateInDate;
    } else {
        return true;
    }
}


//function DocsOut_PrintMultiple(pDocumentTypeID = 230, pTruckingOrderID, pShipmentID, IsA4Paper, pOption, confirm = false) { //pShipmentID is used when called from shipments to print HBL
//    debugger;
 
//    var IDs = GetAllSelectedIDsAsString('tblRoutings');
//    if (IDs == '')
//        swal(strSorry, 'Please Check One Or More Trucking Order To Print');
//    else {


//        var idArray = IDs.split(',');

//        $.each(idArray, function (index, id) {
//            var pWhereClause = "";
//            pWhereClause += " WHERE ID = " + pDocumentTypeID;
//            var pParametersWithValues = {
//                pWhereClause: pWhereClause
//                , pDocumentTypeID: pDocumentTypeID
//                , pOperationID: pShipmentID == undefined ? $("#slDocsOutOperations").val() : pShipmentID //$("#hOperationID").val()
//                , pReportTypeID: 3//$("#ulDocsOutReportTypes .active").val() //3:pdf , 4:rft
//                , pTruckingOrderID: id
//                , pSelectedPayableIDs: pSelectedPayableIDs == "" ? "0" : pSelectedPayableIDs
//                , pSelectedReceivableIDs: pSelectedReceivableIDs == "" ? "0" : pSelectedReceivableIDs
//                , pWithVAT: $("#cbWithVAT").prop("checked")
//                , pCommodityID: $("#slDocsOutCommodity").val() == "" || $("#slDocsOutCommodity").val() == undefined ? 0 : $("#slDocsOutCommodity").val()
//            };

//            CallGETFunctionWithParameters("/api/Reports/Report_DocsOut"
//                , pParametersWithValues
//                , function (data) {
//                    debugger;
//                    DocsOut_Print_TruckingOrder(data, pDocumentTypeID, pOption);
//                });
//        }




//                var pWhereClause = "";
//                pWhereClause += " WHERE ID = " + pDocumentTypeID;
//                var pParametersWithValues = {
//                    pWhereClause: pWhereClause
//                    , pDocumentTypeID: pDocumentTypeID
//                    , pOperationID: pShipmentID == undefined ? $("#slDocsOutOperations").val() : pShipmentID //$("#hOperationID").val()
//                    , pReportTypeID: 3//$("#ulDocsOutReportTypes .active").val() //3:pdf , 4:rft
//                    , pTruckingOrderID: pTruckingOrderID
//                    , pSelectedPayableIDs: pSelectedPayableIDs == "" ? "0" : pSelectedPayableIDs
//                    , pSelectedReceivableIDs: pSelectedReceivableIDs == "" ? "0" : pSelectedReceivableIDs
//                    , pWithVAT: $("#cbWithVAT").prop("checked")
//                    , pCommodityID: $("#slDocsOutCommodity").val() == "" || $("#slDocsOutCommodity").val() == undefined ? 0 : $("#slDocsOutCommodity").val()
//                };

//                CallGETFunctionWithParameters("/api/Reports/Report_DocsOut"
//                    , pParametersWithValues
//                    , function (data) {

//                        debugger;
//                        debugger;
//                        var RecordsExist = data[0];
//                        var MissingMandatoryFields = data[1];
//                        var pOperationCode = data[2];
//                        var pTruckingOrderClientName = data[3];
//                        var pTruckingOrderClientAddress = data[4];
//                        var pTruckingOrderClientContactName = data[5];
//                        var pTruckingOrderGensetSupplierName = data[6];
//                        var pTruckingOrderCCAName = data[7];
//                        var pTruckingOrderQuantity = data[8];
//                        var pTruckingOrderGateInPort = data[9];
//                        var pTruckingOrderGateOutPort = data[10];
//                        var pTruckingOrderGateInDate = data[11];
//                        var pTruckingOrderGateOutDate = data[12];
//                        var pTruckingOrderStuffingDate = data[13];
//                        var pTruckingOrderDeliveryDate = data[14];
//                        var pTruckingOrderBookingNumber = data[15];
//                        var pTruckingOrderDelays = data[16];
//                        var pTruckingOrderPowerFromGateInTillActualSailing = data[17];
//                        var pLineName = data[18];
//                        var pTruckingOrderTruckerName = data[19];
//                        var pIsGenset = data[20];
//                        var pTruckingOrderContactPerson = data[21];
//                        var pTruckingOrderPickupAddress = data[22];
//                        var pTruckingOrderDeliveryAddress = data[23];
//                        var pCCAContactName = data[24];
//                        var pCCAPhones = data[25];
//                        var pTruckingOrderContactPersonPhones = data[26];
//                        var pTruckingOrderLoadingTime = data[27];
//                        var pTruckingOrderNotes = data[28];
//                        var pOperationHeader = JSON.parse(data[29]);
//                        var pOperationContainerAndPAckages = JSON.parse(data[30]);
//                        var pTruckingOrder = JSON.parse(data[31]);


//                        //other companies
//                        debugger;
//        /*var html = '';*/html = ((IsLastPage == undefined || IsFirstPage == true) ? ('') : (html + ('<div class="break"></div>')));
//                        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
//                        html += '<html>';
//                        html += '     <head><title>' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.TableOrViewName").text() + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
//                        html += '         <body style="background-color:white;">';

//                        if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ShowHeader input[type=checkbox]").prop("checked")) {


//                            html += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';


//                        }





//                        //html += '             <div class="col-xs-12 text-center text-ul"></br></br><h2><b>' + ' تكليف نقل ' + '-' + ($("#cbPrintAsBosla").prop("checked") ? '  بوصلة  ' : '  شهادة  ') + '</b></h2></div>';



//                        {

//                            html += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h2><b>' + (pDefaults.UnEditableCompanyName == 'TRGL' ? pOperationHeader.Code : '') + ' تكليف نقل ' + '-' + ($("#cbPrintAsBosla").prop("checked") ? '  بوصلة  ' : '  شهادة  ') + '</b></h2></div>';
//                            if (pDefaults.UnEditableCompanyName == "DSE" || pDefaults.UnEditableCompanyName == "DSC" || pDefaults.UnEditableCompanyName == "ILS" || pDefaults.UnEditableCompanyName == "ILSEG")
//                                html += '             <div class="col-xs-12"><b>Ref. </b>' + (pOperationHeader.Reference == 0 ? '' : pOperationHeader.Reference) + '</div>';
//                            html += '             <div class="col-xs-6 text-right" style="font-size:14px;">' + pTruckingOrderGateOutPort + '<b><span class="float-right">' + ' : سحب ميناء   ' + '</span></b></div>';
//                            html += '             <div class="col-xs-6 text-right" style="font-size:14px;">' + pTruckingOrderGateInPort + '<b><span class="float-right">' + ' : دخول ميناء   ' + '</span></b></div>';
//                            html += '             <div class="col-xs-6 text-right" style="font-size:14px;">' + (pOperationHeader.Code == 0 ? pOperationHeader.MasterOperationCode : pOperationHeader.Code) + '<b><span class="float-right">' + ' : رقم العملية   ' + '</span></b></div>';
//                            html += '             <div class="col-xs-6 text-right" style="font-size:14px;">' + pTruckingOrderBookingNumber + '<b><span class="float-right">' + ' : رقم الحجز   ' + '</span></b></div>';
//                            html += '             <div class="col-xs-12 text-right m-t-lg" style="font-size:14px;">' + pTruckingOrderTruckerName + '<b><span class="float-right">' + ' / السادة شركة   ' + '</span></b></div>';
//                            html += '             <div class="col-xs-12 text-center" style="font-size:16px;">' + '<b>' + ' ،،، تحية طيبة وبعد   ' + '</b></div>';
//                            html += '             <div class="col-xs-12 text-right m-t-lg" style="font-size:14px;">' + pTruckingOrderQuantity + '<b> <span class="float-right">' + ' : الرجاء التكرم بعمل اللازم لنقل   ' + '<span></b></div>';
//                            //html += '             <div class="col-xs-12 text-right" style="font-size:14px;">' + pTruckingOrderClientName + '<b><span class="float-right">' + ' / باسم شركة   ' + '</span></b></div>';
//                            if (pDefaults.UnEditableCompanyName == "CQL") {
//                                if (pOperationHeader.DirectionType == 2)//Export
//                                    html += '             <div class="col-xs-12 text-right" style="font-size:14px;">' + (pOperationHeader.ShipperLocalName == 0 ? "" : pOperationHeader.ShipperLocalName) + '<b><span class="float-right">' + ' / باسم شركة   ' + '</span></b></div>';
//                                else if (pOperationHeader.DirectionType == 1)//Import
//                                    html += '             <div class="col-xs-12 text-right" style="font-size:14px;">' + (pOperationHeader.ConsigneeLocalName == 0 ? "" : pOperationHeader.ConsigneeLocalName) + '<b><span class="float-right">' + ' / باسم شركة   ' + '</span></b></div>';
//                            } else if (pDefaults.UnEditableCompanyName == "BED") {
//                                html += '             <div class="col-xs-12 text-right" style="font-size:14px;">' + (pOperationHeader.ShipperName == 0 ? (pOperationHeader.ClientName == 0 ? "" : pOperationHeader.ClientName) : pOperationHeader.ShipperName) + '<b><span class="float-right">' + ' / باسم شركة   ' + '</span></b></div>';
//                            } else
//                                html += '             <div class="col-xs-12 text-right" style="font-size:14px;">' + (pOperationHeader.ClientName == 0 ? "" : pOperationHeader.ClientName) + '<b><span class="float-right">' + ' / باسم شركة   ' + '</span></b></div>';
//                            if (pDefaults.UnEditableCompanyName != "ELI")
//                                html += '             <div class="col-xs-12 text-right" style="font-size:14px;">' + (pOperationHeader.ClientAddress == 0 ? "" : pOperationHeader.ClientAddress) + '<b><span class="float-right">' /*+ ' / العنوان   ' */ + '</span></b></div>';
//                            if (pCCAContactName != 0 && pCCAContactName != "") {
//                                html += '             <div class="col-xs-12 text-right" style="font-size:14px;">' + (pCCAContactName == 0 ? "" : pCCAContactName) + '<b><span class="float-right">' + ' / المخلص   ' + '</span></b></div>';
//                                html += '             <div class="col-xs-12 text-right" style="font-size:14px;">' + (pCCAPhones == 0 ? "" : pCCAPhones) + '<b><span class="float-right">' + ' / تليفون المخلص   ' + '</span></b></div>';
//                            }
//                            if (pOperationHeader.TransportType != AirTransportType && pOperationHeader.ShippingLineName != 0)
//                                html += '             <div class="col-xs-12 text-right" style="font-size:14px;">' + (pOperationHeader.ShippingLineName == 0 ? "" : pOperationHeader.ShippingLineName) + '<b><span class="float-right">' + ' / على خط ملاحى   ' + '</span></b></div>';
//                            html += '             <div class="col-xs-12 text-right" style="font-size:14px;">' + '<b>' + ' میعاد التحمیل  ' + ' / ' + ' يوم  ' + getDayInLetters(pTruckingOrderStuffingDate, 2) + ' ' + pTruckingOrderStuffingDate + '  الساعة  ' + ' / ' + pTruckingOrderLoadingTime + '</b></div>';
//                            //html += '             <div class="col-xs-12 text-right" style="font-size:14px;">' + pTruckingOrderPickupAddress + '<b><span class="float-right">' + ' / عنوان التحميل مفصلا  ' + '</span></b></div>';
//                            //html += '             <div class="col-xs-12 text-right" style="font-size:14px;">' + pTruckingOrderDeliveryAddress + '<b><span class="float-right">' + ' / عنوان التسليم مفصلا  ' + '</span></b></div>';
//                            html += '             <div class="col-xs-12 text-right" style="font-size:14px; clear:both;"">' + pTruckingOrderPickupAddress + (pTruckingOrderDeliveryAddress == "" ? "" : (' --> ' + pTruckingOrderDeliveryAddress)) + '<b><span class="float-right">' + ' / العنوان مفصلا  ' + '</span></b></div>';
//                            html += '             <div class="col-xs-12 text-right" style="font-size:14px; clear:both;"">' + pTruckingOrderContactPerson + '<b><span class="float-right">' + ' / مندوب العمل أو مسؤول التحميل   ' + '</span></b></div>';
//                            html += '             <div class="col-xs-12 text-right" style="font-size:14px; clear:both;"">' + pTruckingOrderContactPersonPhones + '<b><span class="float-right">' + ' / رقم التليفون   ' + '</span></b></div>';
//                            //html += '             <div class="col-xs-12 text-right" style="font-size:14px;">' + (pTruckingOrderNotes == 0 ? "" : pTruckingOrderNotes.replace(/\n/g, "<br/>")) + '<b><span class="float-right">' + ' / ملحوظات هامة   ' + '</span></b></div>';
//                            html += '             <div class="col-xs-12 text-right" style="font-size:14px; clear:both;"">' + '<b><span class="float-right">' + ' : ملحوظات هامة   ' + '</span></b></div>';
//                            html += '             <div class="col-xs-12 text-right" style="font-size:14px; clear:both;">' + (pTruckingOrderNotes == 0 ? "" : pTruckingOrderNotes.replace(/\n/g, "<br/>")) + '</div>';
//                            if (pDefaults.UnEditableCompanyName != "BME")
//                                html += '             <div class="col-xs-7 text-center m-t-lg" style="font-size:16px;">' + '' + '<b>' + '    مقدمه لسيادتكم  ' + '</b></div>';
//                            html += '             <div class="col-xs-7 text-center m-t-sm" style="font-size:16px; clear:both;">' + $("#hDefaultCompanyName").val() + '<b>' /*+ '  /  شركة   '*/ + '</b></div>';
//                            if (pDefaults.UnEditableCompanyName != "BME") {
//                                html += '             <div class="col-xs-7 text-center m-t-sm" style="font-size:16px; clear:both;">' + '' + '<b>' + '  /  المسؤول    ' + '</b></div>';
//                                html += '             <div class="col-xs-7 text-center m-t-lg" style="font-size:16px; clear:both;">' + '<b>' + ' ،،،،،،،،، وتفضلوا بقبول وافر الاحترام والتقدير   ' + '</b></div>';
//                            }
//                            html += '         </body>';



//                        }



//                        html += '     <footer class="footer col-xs-12" style="width:100%; position:fixed; bottom:0;">';
//                        //html += '         <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';
//                        if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.IsPrintISOCode input[type=checkbox]").prop("checked"))
//                            html += '     <div class="row m-l">' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ISOCode").text() + '</div>';
//                        if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ShowFooter input[type=checkbox]").prop("checked"))
//                            html += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
//                        html += '     </footer>';
//                        if (pDefaults.UnEditableCompanyName == 'SHS') {
//                            html += '<div style="width:100%;display:flex;"><img style="margin:auto;" src="/Content/Images/CompanyFooter.jpg" alt="footer"></div>';
//                        }

//                        html += '</html>';

//                    });
        





//    }

  





//    if (pOption == "Print" || pOption == undefined || pOption == null) {
//        if (((IsLastPage != undefined) && IsLastPage) || (IsLastPage == undefined)) {
//            var mywindow = window.open('', '_blank');
//            mywindow.document.write(html);
//            mywindow.document.close();
//        }
//    }
//    else if (pOption == "Email") {
//        DocsOut_SendEmail($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.TableOrViewName").text(), html);
//    }
//    } 


function Build_TruckingOrder_HTML(data, pDocumentTypeID, index, totalCount)
{
    debugger;
  
                            var RecordsExist = data[0];
                            var MissingMandatoryFields = data[1];
                            var pOperationCode = data[2];
                            var pTruckingOrderClientName = data[3];
                            var pTruckingOrderClientAddress = data[4];
                            var pTruckingOrderClientContactName = data[5];
                            var pTruckingOrderGensetSupplierName = data[6];
                            var pTruckingOrderCCAName = data[7];
                            var pTruckingOrderQuantity = data[8];
                            var pTruckingOrderGateInPort = data[9];
                            var pTruckingOrderGateOutPort = data[10];
                            var pTruckingOrderGateInDate = data[11];
                            var pTruckingOrderGateOutDate = data[12];
                            var pTruckingOrderStuffingDate = data[13];
                            var pTruckingOrderDeliveryDate = data[14];
                            var pTruckingOrderBookingNumber = data[15];
                            var pTruckingOrderDelays = data[16];
                            var pTruckingOrderPowerFromGateInTillActualSailing = data[17];
                            var pLineName = data[18];
                            var pTruckingOrderTruckerName = data[19];
                            var pIsGenset = data[20];
                            var pTruckingOrderContactPerson = data[21];
                            var pTruckingOrderPickupAddress = data[22];
                            var pTruckingOrderDeliveryAddress = data[23];
                            var pCCAContactName = data[24];
                            var pCCAPhones = data[25];
                            var pTruckingOrderContactPersonPhones = data[26];
                            var pTruckingOrderLoadingTime = data[27];
                            var pTruckingOrderNotes = data[28];
                            var pOperationHeader = JSON.parse(data[29]);
                            var pOperationContainerAndPAckages = JSON.parse(data[30]);
                            var pTruckingOrder = JSON.parse(data[31]);


    var html = "";
    if (index > 0) {
        html += '<div class="break"></div>'; // Page break between orders
    }
    html += '<html>';
    html += '<head><title>' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.TableOrViewName").text() + '</title>';
    html += '<link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
    html += '<body style="background-color:white;">';


    // Your full HTML template building logic goes here
    html += '<div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo" style=" margin-bottom: 10px; " /></div>';
    //html += '<h2 style="text-align:center;">تكليف نقل - ' + pOperationHeader.Code + '</h2>';
    // ... all your Arabic labels and values





    

    html += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h2><b>' + (pDefaults.UnEditableCompanyName == 'TRGL' ? pOperationHeader.Code : '') + ' تكليف نقل ' + '-' + ($("#cbPrintAsBosla").prop("checked") ? '  بوصلة  ' : '  شهادة  ') + '</b></h2></div>';

    html += '  <br/>';
    html += '  <br/>';
    html += '  <br/>';

        if (pDefaults.UnEditableCompanyName == "DSE" || pDefaults.UnEditableCompanyName == "DSC" || pDefaults.UnEditableCompanyName == "ILS" || pDefaults.UnEditableCompanyName == "ILSEG")
            html += '             <div class="col-xs-12"><b>Ref. </b>' + (pOperationHeader.Reference == 0 ? '' : pOperationHeader.Reference) + '</div>';
        html += '             <div class="col-xs-6 text-right" style="font-size:14px;">' + pTruckingOrderGateOutPort + '<b><span class="float-right">' + ' : سحب ميناء   ' + '</span></b></div>';
        html += '             <div class="col-xs-6 text-right" style="font-size:14px;">' + pTruckingOrderGateInPort + '<b><span class="float-right">' + ' : دخول ميناء   ' + '</span></b></div>';
        html += '             <div class="col-xs-6 text-right" style="font-size:14px;">' + (pOperationHeader.Code == 0 ? pOperationHeader.MasterOperationCode : pOperationHeader.Code) + '<b><span class="float-right">' + ' : رقم العملية   ' + '</span></b></div>';
        html += '             <div class="col-xs-6 text-right" style="font-size:14px;">' + pTruckingOrderBookingNumber + '<b><span class="float-right">' + ' : رقم الحجز   ' + '</span></b></div>';
        html += '             <div class="col-xs-12 text-right m-t-lg" style="font-size:14px;">' + pTruckingOrderTruckerName + '<b><span class="float-right">' + ' / السادة شركة   ' + '</span></b></div>';
        html += '             <div class="col-xs-12 text-center" style="font-size:16px;">' + '<b>' + ' ،،، تحية طيبة وبعد   ' + '</b></div>';
        html += '             <div class="col-xs-12 text-right m-t-lg" style="font-size:14px;">' + pTruckingOrderQuantity + '<b> <span class="float-right">' + ' : الرجاء التكرم بعمل اللازم لنقل   ' + '<span></b></div>';
        //html += '             <div class="col-xs-12 text-right" style="font-size:14px;">' + pTruckingOrderClientName + '<b><span class="float-right">' + ' / باسم شركة   ' + '</span></b></div>';
        if (pDefaults.UnEditableCompanyName == "CQL") {
            if (pOperationHeader.DirectionType == 2)//Export
                html += '             <div class="col-xs-12 text-right" style="font-size:14px;">' + (pOperationHeader.ShipperLocalName == 0 ? "" : pOperationHeader.ShipperLocalName) + '<b><span class="float-right">' + ' / باسم شركة   ' + '</span></b></div>';
            else if (pOperationHeader.DirectionType == 1)//Import
                html += '             <div class="col-xs-12 text-right" style="font-size:14px;">' + (pOperationHeader.ConsigneeLocalName == 0 ? "" : pOperationHeader.ConsigneeLocalName) + '<b><span class="float-right">' + ' / باسم شركة   ' + '</span></b></div>';
        } else if (pDefaults.UnEditableCompanyName == "BED") {
            html += '             <div class="col-xs-12 text-right" style="font-size:14px;">' + (pOperationHeader.ShipperName == 0 ? (pOperationHeader.ClientName == 0 ? "" : pOperationHeader.ClientName) : pOperationHeader.ShipperName) + '<b><span class="float-right">' + ' / باسم شركة   ' + '</span></b></div>';
        } else
            html += '             <div class="col-xs-12 text-right" style="font-size:14px;">' + (pOperationHeader.ClientName == 0 ? "" : pOperationHeader.ClientName) + '<b><span class="float-right">' + ' / باسم شركة   ' + '</span></b></div>';
        if (pDefaults.UnEditableCompanyName != "ELI")
            html += '             <div class="col-xs-12 text-right" style="font-size:14px;">' + (pOperationHeader.ClientAddress == 0 ? "" : pOperationHeader.ClientAddress) + '<b><span class="float-right">' /*+ ' / العنوان   ' */ + '</span></b></div>';
        if (pCCAContactName != 0 && pCCAContactName != "") {
            html += '             <div class="col-xs-12 text-right" style="font-size:14px;">' + (pCCAContactName == 0 ? "" : pCCAContactName) + '<b><span class="float-right">' + ' / المخلص   ' + '</span></b></div>';
            html += '             <div class="col-xs-12 text-right" style="font-size:14px;">' + (pCCAPhones == 0 ? "" : pCCAPhones) + '<b><span class="float-right">' + ' / تليفون المخلص   ' + '</span></b></div>';
        }
        if (pOperationHeader.TransportType != AirTransportType && pOperationHeader.ShippingLineName != 0)
            html += '             <div class="col-xs-12 text-right" style="font-size:14px;">' + (pOperationHeader.ShippingLineName == 0 ? "" : pOperationHeader.ShippingLineName) + '<b><span class="float-right">' + ' / على خط ملاحى   ' + '</span></b></div>';
        html += '             <div class="col-xs-12 text-right" style="font-size:14px;">' + '<b>' + ' میعاد التحمیل  ' + ' / ' + ' يوم  ' + getDayInLetters(pTruckingOrderStuffingDate, 2) + ' ' + pTruckingOrderStuffingDate + '  الساعة  ' + ' / ' + pTruckingOrderLoadingTime + '</b></div>';
        //html += '             <div class="col-xs-12 text-right" style="font-size:14px;">' + pTruckingOrderPickupAddress + '<b><span class="float-right">' + ' / عنوان التحميل مفصلا  ' + '</span></b></div>';
        //html += '             <div class="col-xs-12 text-right" style="font-size:14px;">' + pTruckingOrderDeliveryAddress + '<b><span class="float-right">' + ' / عنوان التسليم مفصلا  ' + '</span></b></div>';
        html += '             <div class="col-xs-12 text-right" style="font-size:14px; clear:both;"">' + pTruckingOrderPickupAddress + (pTruckingOrderDeliveryAddress == "" ? "" : (' --> ' + pTruckingOrderDeliveryAddress)) + '<b><span class="float-right">' + ' / العنوان مفصلا  ' + '</span></b></div>';
        html += '             <div class="col-xs-12 text-right" style="font-size:14px; clear:both;"">' + pTruckingOrderContactPerson + '<b><span class="float-right">' + ' / مندوب العمل أو مسؤول التحميل   ' + '</span></b></div>';
        html += '             <div class="col-xs-12 text-right" style="font-size:14px; clear:both;"">' + pTruckingOrderContactPersonPhones + '<b><span class="float-right">' + ' / رقم التليفون   ' + '</span></b></div>';
        //html += '             <div class="col-xs-12 text-right" style="font-size:14px;">' + (pTruckingOrderNotes == 0 ? "" : pTruckingOrderNotes.replace(/\n/g, "<br/>")) + '<b><span class="float-right">' + ' / ملحوظات هامة   ' + '</span></b></div>';
        html += '             <div class="col-xs-12 text-right" style="font-size:14px; clear:both;"">' + '<b><span class="float-right">' + ' : ملحوظات هامة   ' + '</span></b></div>';
        html += '             <div class="col-xs-12 text-right" style="font-size:14px; clear:both;">' + (pTruckingOrderNotes == 0 ? "" : pTruckingOrderNotes.replace(/\n/g, "<br/>")) + '</div>';
        if (pDefaults.UnEditableCompanyName != "BME")
            html += '             <div class="col-xs-7 text-center m-t-lg" style="font-size:16px;">' + '' + '<b>' + '    مقدمه لسيادتكم  ' + '</b></div>';
        html += '             <div class="col-xs-7 text-center m-t-sm" style="font-size:16px; clear:both;">' + $("#hDefaultCompanyName").val() + '<b>' /*+ '  /  شركة   '*/ + '</b></div>';
        if (pDefaults.UnEditableCompanyName != "BME") {
            html += '             <div class="col-xs-7 text-center m-t-sm" style="font-size:16px; clear:both;">' + '' + '<b>' + '  /  المسؤول    ' + '</b></div>';
            html += '             <div class="col-xs-7 text-center m-t-lg" style="font-size:16px; clear:both;">' + '<b>' + ' ،،،،،،،،، وتفضلوا بقبول وافر الاحترام والتقدير   ' + '</b></div>';
        }










    html += '</body></html>';

    return html;
}

function DocsOut_PrintMultiple(pDocumentTypeID = 230, pTruckingOrderID, pShipmentID, IsA4Paper, pOption, confirm = false) {
    debugger;

    var IDs = GetAllSelectedIDsAsString('tblRoutings');
    if (IDs === '') {
        swal(strSorry, 'Please Check One Or More Trucking Order To Print');
        return;
    }

    var idArray = IDs.split(',');
    var html = "";
    var completed = 0; // Counter to know when all AJAX calls finished
    var pSelectedPayableIDs = "";
    var pSelectedReceivableIDs = "";
    $.each(idArray, function (index, id) {
        var pWhereClause = " WHERE ID = " + pDocumentTypeID;
        var pParametersWithValues = {
            pWhereClause: pWhereClause,
            pDocumentTypeID: pDocumentTypeID,
            pOperationID: pShipmentID == undefined ? $("#slDocsOutOperations").val() : pShipmentID,
            pReportTypeID: 3, // pdf
            pTruckingOrderID: id,
            pSelectedPayableIDs: pSelectedPayableIDs == "" ? "0" : pSelectedPayableIDs,
            pSelectedReceivableIDs: pSelectedReceivableIDs == "" ? "0" : pSelectedReceivableIDs,
            pWithVAT: $("#cbWithVAT").prop("checked"),
            pCommodityID: $("#slDocsOutCommodity").val() == "" || $("#slDocsOutCommodity").val() == undefined ? 0 : $("#slDocsOutCommodity").val()
        };

        CallGETFunctionWithParameters("/api/Reports/Report_DocsOut", pParametersWithValues, function (data) {
            var Rhtml = Build_TruckingOrder_HTML(data, pDocumentTypeID, index, idArray.length);
            html += Rhtml;
            completed++;

            // When all orders processed, print or email
            if (completed === idArray.length) {
                if (pOption == "Print" || pOption == undefined || pOption == null) {
                    var mywindow = window.open('', '_blank');
                    mywindow.document.write(html);
                    mywindow.document.close();
                }
                else if (pOption == "Email") {
                    DocsOut_SendEmail($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.TableOrViewName").text(), html);
                }
            }
        });
    });
}


//function PrintMultiple() {

//    var IDs =  GetAllSelectedIDsAsString('tblRoutings');
//    if (IDs == '')
//        swal(strSorry, 'Please Check One Or More Trucking Order To Print');
//    else {

   
//        var idArray = IDs.split(',');

//        $.each(idArray, function (index, id) {

//            DocsOut_Print(230, id);
//        });





//    }
       




//}

function Print_SSH01() {
    debugger;
    var html = '';
    var pTablesHTML = '';

    html += '<html>';
    html += '     <head><title>SSH01</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
    html += '         <body style="background-color:white;">';

    pTablesHTML += '                         <table id="tblSSH01" class="table table-striped b-light b-a text-sm table-bordered">'; //table-hover
    pTablesHTML += '                             <thead>';
    pTablesHTML += '                               <tr>';
    pTablesHTML += '                                   <th colspan="20">清关费、关税、增值税结算单（ Shipment Expenses ）</th>';
    pTablesHTML += '                                       <th hidden></th>';
    pTablesHTML += '                                       <th hidden></th>';
    pTablesHTML += '                                       <th hidden></th>';
    pTablesHTML += '                                       <th hidden></th>';
    pTablesHTML += '                                       <th hidden></th>';
    pTablesHTML += '                                       <th hidden></th>';
    pTablesHTML += '                                       <th hidden></th>';
    pTablesHTML += '                                       <th hidden></th>';
    pTablesHTML += '                                       <th hidden></th>';
    pTablesHTML += '                                       <th hidden></th>';
    pTablesHTML += '                                       <th hidden></th>';
    pTablesHTML += '                                       <th hidden></th>';
    pTablesHTML += '                                       <th hidden></th>';
    pTablesHTML += '                                       <th hidden></th>';
    pTablesHTML += '                                       <th hidden></th>';
    pTablesHTML += '                                       <th hidden></th>';
    pTablesHTML += '                                       <th hidden></th>';
    pTablesHTML += '                                       <th hidden></th>';
    pTablesHTML += '                                       <th hidden></th>';
    pTablesHTML += '                               </tr>';
    pTablesHTML += '                             </thead>';
    pTablesHTML += '                             <tbody>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                       <td></td>';
    pTablesHTML += '                                       <td></td>';
    pTablesHTML += '                                       <td></td>';
    pTablesHTML += '                                       <td></td>';
    pTablesHTML += '                                       <td></td>';
    pTablesHTML += '                                       <td></td>';
    pTablesHTML += '                                       <td></td>';
    pTablesHTML += '                                       <td></td>';
    pTablesHTML += '                                       <td></td>';
    pTablesHTML += '                                       <td></td>';
    pTablesHTML += '                                       <td></td>';
    pTablesHTML += '                                       <td></td>';
    pTablesHTML += '                                       <td></td>';
    pTablesHTML += '                                       <td></td>';
    pTablesHTML += '                                       <td></td>';
    pTablesHTML += '                                       <td>编号NO：</td>';
    pTablesHTML += '                                       <td>ADT-CL-001X</td>';
    pTablesHTML += '                                       <td></td>';
    pTablesHTML += '                                       <td></td>';
    pTablesHTML += '                                       <td></td>';
    pTablesHTML += '                                   </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>基础资料Baisc information</td>';
    pTablesHTML += '                                           <td>产品名称 Cargo description：</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>船务公司：</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>发票号<br>Invoice NO.:</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>发票金额 Shipment Value（USD) ：</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> 折算汇率2024.12.11 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> 折算金额(EGP)： </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>清关代理公司：</td>';
    pTablesHTML += '                                           <td>Sunshine </td>';
    pTablesHTML += '                                           <td>委托单位：</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>提单号<br>BL NO.:</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>重量(吨）Weight (tons)：</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>集装箱个数 Number of containers：</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>单箱结算金额</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>#DIV/0!</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>序号NO.</td>';
    pTablesHTML += '                                           <td>收费单位 </td>';
    pTablesHTML += '                                           <td>收费内容</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>发票号 </td>';
    pTablesHTML += '                                           <td>单位 </td>';
    pTablesHTML += '                                           <td>数量 </td>';
    pTablesHTML += '                                           <td>基价unit price</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>合价total price</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>增值税VAT</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>预提税WHT</td>';
    pTablesHTML += '                                           <td>合价（不含预提税）Net</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>汇率Ex.Rate</td>';
    pTablesHTML += '                                           <td>总价Amount</td>';
    pTablesHTML += '                                           <td> 收费依据<br>Basis for charges </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>NO.</td>';
    pTablesHTML += '                                           <td> Fees for every parties</td>';
    pTablesHTML += '                                           <td>Charged content</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> Invoice NO.</td>';
    pTablesHTML += '                                           <td> Unit</td>';
    pTablesHTML += '                                           <td> Number</td>';
    pTablesHTML += '                                           <td>EGP</td>';
    pTablesHTML += '                                           <td>USD</td>';
    pTablesHTML += '                                           <td>EGP</td>';
    pTablesHTML += '                                           <td>USD</td>';
    pTablesHTML += '                                           <td>EGP</td>';
    pTablesHTML += '                                           <td>USD</td>';
    pTablesHTML += '                                           <td>EGP</td>';
    pTablesHTML += '                                           <td>EGP</td>';
    pTablesHTML += '                                           <td>USD</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>EGP</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>A:</td>';
    pTablesHTML += '                                           <td>清关公司收费Custom Company Services</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>A.1</td>';
    pTablesHTML += '                                           <td>Sunshine</td>';
    pTablesHTML += '                                           <td>C.C Service</td>';
    pTablesHTML += '                                           <td>清关服务费</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>箱</td>';
    pTablesHTML += '                                           <td> 1.00 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>A.2</td>';
    pTablesHTML += '                                           <td>Sunshine</td>';
    pTablesHTML += '                                           <td>C.C Service</td>';
    pTablesHTML += '                                           <td>清关服务费</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>项</td>';
    pTablesHTML += '                                           <td> 1.00 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>A.2</td>';
    pTablesHTML += '                                           <td>Sunshine</td>';
    pTablesHTML += '                                           <td>C.C Service</td>';
    pTablesHTML += '                                           <td>清关服务费</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>项</td>';
    pTablesHTML += '                                           <td> 1.00 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>A.3</td>';
    pTablesHTML += '                                           <td>Sunshine</td>';
    pTablesHTML += '                                           <td>inspection fee <br></td>';
    pTablesHTML += '                                           <td>查验费</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>项</td>';
    pTablesHTML += '                                           <td> 1.00 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>A.4</td>';
    pTablesHTML += '                                           <td>Sunshine</td>';
    pTablesHTML += '                                           <td>inspection fee <br></td>';
    pTablesHTML += '                                           <td>查验费</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>项</td>';
    pTablesHTML += '                                           <td> 1.00 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>A.5</td>';
    pTablesHTML += '                                           <td>Sunshine</td>';
    pTablesHTML += '                                           <td>inspection fee <br></td>';
    pTablesHTML += '                                           <td>查验费</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>项</td>';
    pTablesHTML += '                                           <td> 1.00 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>A.3</td>';
    pTablesHTML += '                                           <td>Sunshine</td>';
    pTablesHTML += '                                           <td>Transportation fee<br>Refergirator container</td>';
    pTablesHTML += '                                           <td>运输费</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>箱</td>';
    pTablesHTML += '                                           <td> 1.00 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>A.6</td>';
    pTablesHTML += '                                           <td>Sunshine</td>';
    pTablesHTML += '                                           <td>Transportation fee repair containers</td>';
    pTablesHTML += '                                           <td>运输费</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>箱</td>';
    pTablesHTML += '                                           <td> 1.00 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>A.5</td>';
    pTablesHTML += '                                           <td>Sunshine</td>';
    pTablesHTML += '                                           <td>Transportation fee</td>';
    pTablesHTML += '                                           <td>运输费</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>箱</td>';
    pTablesHTML += '                                           <td> 1.00 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>A.7</td>';
    pTablesHTML += '                                           <td>Sunshine</td>';
    pTablesHTML += '                                           <td>Transportation fee<br></td>';
    pTablesHTML += '                                           <td>运输费</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>箱</td>';
    pTablesHTML += '                                           <td> 5.00 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>A.8</td>';
    pTablesHTML += '                                           <td>Sunshine</td>';
    pTablesHTML += '                                           <td>Transportation fee<br>RECEIPTS </td>';
    pTablesHTML += '                                           <td>运输费</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>箱</td>';
    pTablesHTML += '                                           <td> 1.00 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>A.6</td>';
    pTablesHTML += '                                           <td>Sunshine</td>';
    pTablesHTML += '                                           <td>Transportation fee<br>UNLOADED FEES</td>';
    pTablesHTML += '                                           <td>运输费</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>箱</td>';
    pTablesHTML += '                                           <td> 1.00 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>….</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>B</td>';
    pTablesHTML += '                                           <td>船代公司收费Shipping agency charges</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>B.1</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>Discharge </td>';
    pTablesHTML += '                                           <td>集装箱装卸费 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>项</td>';
    pTablesHTML += '                                           <td> 1.00 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>B.2</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>Discharge bank fees</td>';
    pTablesHTML += '                                           <td>集装箱装卸费 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>项</td>';
    pTablesHTML += '                                           <td> 1.00 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>B.3</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>Discharge </td>';
    pTablesHTML += '                                           <td>集装箱装卸费 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>项</td>';
    pTablesHTML += '                                           <td> 1.00 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>B.4</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>Discharge bank fees</td>';
    pTablesHTML += '                                           <td>集装箱装卸费 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>项</td>';
    pTablesHTML += '                                           <td> 1.00 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>B.5</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>Demurrage </td>';
    pTablesHTML += '                                           <td>滞港费</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>项</td>';
    pTablesHTML += '                                           <td> 1.00 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>B.6</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>Demurrage - bank fees</td>';
    pTablesHTML += '                                           <td>滞港费</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>项</td>';
    pTablesHTML += '                                           <td> 1.00 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>B.7</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>Chemistry samples fees</td>';
    pTablesHTML += '                                           <td>集装箱装卸费 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>项</td>';
    pTablesHTML += '                                           <td> 1.00 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>B.4</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>SL FEES</td>';
    pTablesHTML += '                                           <td>船代费</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>项</td>';
    pTablesHTML += '                                           <td> 1.00 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>B.5</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>Contanier repairs</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>项</td>';
    pTablesHTML += '                                           <td> 1.00 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>B.6</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>Yard Fees</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>项</td>';
    pTablesHTML += '                                           <td> 1.00 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>B.7</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>Release Fees </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>项</td>';
    pTablesHTML += '                                           <td> 1.00 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>B.12</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>文件费</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>项</td>';
    pTablesHTML += '                                           <td> 1.00 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>B.13</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>文件费</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>项</td>';
    pTablesHTML += '                                           <td> 1.00 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>B.14</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>文件费</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>项</td>';
    pTablesHTML += '                                           <td> 1.00 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>B.15</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>文件费</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>项</td>';
    pTablesHTML += '                                           <td> 1.00 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>B.16</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>集装箱装卸费 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>项</td>';
    pTablesHTML += '                                           <td> 1.00 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>B.17</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>集装箱装卸费 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>项</td>';
    pTablesHTML += '                                           <td> 1.00 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>B.7</td>';
    pTablesHTML += '                                           <td>MLH</td>';
    pTablesHTML += '                                           <td>AMEND LATTER FEES</td>';
    pTablesHTML += '                                           <td>文件费</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>项</td>';
    pTablesHTML += '                                           <td> 1.00 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>….</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>C</td>';
    pTablesHTML += '                                           <td>港口管理局收费Port Services Fesses</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>C.1</td>';
    pTablesHTML += '                                           <td>DP WORLD</td>';
    pTablesHTML += '                                           <td>storage fee</td>';
    pTablesHTML += '                                           <td>堆存费</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>项</td>';
    pTablesHTML += '                                           <td>1</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>C.2</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>Bank fees - storage fee</td>';
    pTablesHTML += '                                           <td>堆存费</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>项</td>';
    pTablesHTML += '                                           <td>1</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>C.3</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>Weight fees</td>';
    pTablesHTML += '                                           <td>超重费</td>';
    pTablesHTML += '                                           <td>/</td>';
    pTablesHTML += '                                           <td>项</td>';
    pTablesHTML += '                                           <td>1</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>C.3</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>1</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>….</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>D</td>';
    pTablesHTML += '                                           <td>政府系统收费</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>D.1</td>';
    pTablesHTML += '                                           <td>/</td>';
    pTablesHTML += '                                           <td>Road Fee</td>';
    pTablesHTML += '                                           <td>过路费</td>';
    pTablesHTML += '                                           <td>/</td>';
    pTablesHTML += '                                           <td>项</td>';
    pTablesHTML += '                                           <td> 1 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>D.2</td>';
    pTablesHTML += '                                           <td>/</td>';
    pTablesHTML += '                                           <td>Public security fees</td>';
    pTablesHTML += '                                           <td>过路费</td>';
    pTablesHTML += '                                           <td>/</td>';
    pTablesHTML += '                                           <td>项</td>';
    pTablesHTML += '                                           <td> 1 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>….</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>E</td>';
    pTablesHTML += '                                           <td>关税及增值税</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>E.1</td>';
    pTablesHTML += '                                           <td>/</td>';
    pTablesHTML += '                                           <td>custom duty</td>';
    pTablesHTML += '                                           <td>关税</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>%</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>E.2</td>';
    pTablesHTML += '                                           <td>/</td>';
    pTablesHTML += '                                           <td>VAT</td>';
    pTablesHTML += '                                           <td>增值税</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>%</td>';
    pTablesHTML += '                                           <td>14%</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>E.3</td>';
    pTablesHTML += '                                           <td>/</td>';
    pTablesHTML += '                                           <td>TAX 1%</td>';
    pTablesHTML += '                                           <td>增值税</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>%</td>';
    pTablesHTML += '                                           <td>1%</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>E.4</td>';
    pTablesHTML += '                                           <td>/</td>';
    pTablesHTML += '                                           <td>Other Fees</td>';
    pTablesHTML += '                                           <td>其他费用</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>项</td>';
    pTablesHTML += '                                           <td>1</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>E.5</td>';
    pTablesHTML += '                                           <td>/</td>';
    pTablesHTML += '                                           <td>Bank fees - Customs duties</td>';
    pTablesHTML += '                                           <td>其他费用</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>项</td>';
    pTablesHTML += '                                           <td>1</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>E.5</td>';
    pTablesHTML += '                                           <td>/</td>';
    pTablesHTML += '                                           <td>Over weight Fine</td>';
    pTablesHTML += '                                           <td>其他费用</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>项</td>';
    pTablesHTML += '                                           <td>1</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>E.6</td>';
    pTablesHTML += '                                           <td>/</td>';
    pTablesHTML += '                                           <td>Bank fees - overweight fine</td>';
    pTablesHTML += '                                           <td>其他费用</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>项</td>';
    pTablesHTML += '                                           <td> 1 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>E.6</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>Over weight Fine</td>';
    pTablesHTML += '                                           <td>超重费</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>项</td>';
    pTablesHTML += '                                           <td> 1.00 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>E.7</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>Bank fees - overweight fine</td>';
    pTablesHTML += '                                           <td>其他费用</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>项</td>';
    pTablesHTML += '                                           <td> 1.00 </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>F</td>';
    pTablesHTML += '                                           <td>合计Totaled：</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td>0</td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>G</td>';
    pTablesHTML += '                                           <td>临时劳工社保Temporary Laboure Deduction： </td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>。</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>0.00</td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                           <td> -   </td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td>H</td>';
    pTablesHTML += '                                           <td>抵扣临时劳工社保后合计Total after deduction：</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>0.00</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>清关代理公司（盖章）：</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>委托单位（确认）：</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>项目审核：</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>日期：</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>日期：</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td>日期：</td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                           <td></td>';
    pTablesHTML += '                                       </tr>';
    pTablesHTML += '                             </tbody>';
    pTablesHTML += '                         </table>';
    debugger;
    html += pTablesHTML;

    html += '         </body>';
    html += '         <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
    html += '         </footer>';
    html += '</html>';
  
    $("#hExportedTable").html(pTablesHTML);
    ExportHtmlTableToCsv_RemovingCommasForNumbers("tblSSH01", "SSH01");

    var mywindow = window.open('', '_blank');
    mywindow.document.write(html);
    mywindow.document.close();

}