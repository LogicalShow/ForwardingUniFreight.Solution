var TodaysDate = new Date();
var FormattedTodaysDate = TodaysDate.toLocaleDateString();
function WebSite_Form13States_BindTableRows(pWebSite_Form13States) {
    debugger;
    $("#hl-menu-FA").parent().addClass("active");
    ClearAllTableRows("tblWebSite_Form13States");
    $.each(pWebSite_Form13States, function (i, item) {


        var ts_Name = "";
        var ts_Date = "";
        var ts_Statue = "";

        if (item.CCTruckingStages != '' && item.TruckingStages != '0')
        {

            $(item.CCTruckingStages.split(',')).each(function (i, item)
            {
                ts_Name += item.split('|')[0] + "<br>";
                ts_Date += item.split('|')[1] + "<br>";
                ts_Statue += (item.split('|')[3] == '0' ? '<span style="color:red"> ✘ </span>' : '<span style="color:#F6AE00;"> ✔ </span>') + "<br>";

            });
        }


        var disabled = "";

        if (typeof item.Approved !== "undefined" && item.Approved != null && (item.Approved == true || item.Approved == "true")) {
            disabled = "disabled='disabled'";
        }
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblWebSite_Form13States",
            ("<tr ID='" + item.ID + "' ondblclick='' style='font-weight:bold;'>"
                //+ "<td class='ID'> <input " + disabled +" name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='shownDirectionIconName'><i class= 'fa " + item.DirectionIconName + " " + item.DirectionIconStyle + " fa-2x'/><i class= 'fa " + item.TransportIconName + " " + item.TransportIconStyle + " fa-2x'/></td>"
                + "<td class='Code' style='white-space:nowrap;' val='" + item.Code + "'>" + (item.MasterOperationCode == "0" ? item.Code : item.MasterOperationCode  ) + "</td>"
                + "<td class='POL hide' val='" + item.POL + "'>" + item.POLCode + "</td>"
                + "<td class='POD hide' val='" + item.POD + "'>" + item.PODCode + "</td>"
                + "<td style='white-space:nowrap;'  class='LineName hide' val='" + item.LineName + "'>" + item.LineName + (IsNull(item.LineWebsite, "0") != "0" ? "<a target='_blank' title='Line Website'  style='font-size:2rem;' class='fa fa-external-link-square ocean-icon-style float-right' href='" + item.LineWebsite + "'></a>" : "" ) + "</td>"

                + "<td style='' class='Routing hide'>" + ($("#hDefaultUnEditableCompanyName").val() == "VEN"
                    ? (item.POLCode + " > " + item.PODCode + (item.AirlineCode == 0 ? "" : " - " + item.AirlineCode))
                    : (item.POLName + " > " + item.PODName)
                ) + "</td>"
                + "<td class='ShipmentType hide'>" + GetShipmentType(item.ShipmentType) + " " + item.RepBLTypeShown + "</td>"
                + "<td class='BookingNumbers hide " + ($("#hDefaultUnEditableCompanyName").val() == "VEN" ? "hide" : "") + "'>" + item.BookingNumbers + "</td>"
                + "<td class='CustomerReference hide ' val='" + item.CustomerReference + "'>" + item.CustomerReference + "</td>"
                + "<td class='CC_CertificateNumber  ' val='" + item.CC_CertificateNumber + "'>" + item.CC_CertificateNumber + "</td>"
                + "<td class='CCAInvoiceNumber  ' val='" + item.CCAInvoiceNumber + "'>" + item.CCAInvoiceNumber + "</td>"
                + "<td class='MasterBL  hide" + ($("#hDefaultUnEditableCompanyName").val() == "VEN" ? "hide" : "") + "'>" + (item.MasterBL == 0 ? "" : item.MasterBL) + "</td>"
                + "<td class='NumberOfPackages hide" + (1 == 1 ? "" : "hide") + "'>" + (item.ContainerTypes == 0 ? (item.PackageTypes == 0 ? "" : item.PackageTypes) : item.ContainerTypes) + "</td>"
                + "<td class='RoutingDates hide " + (1 == 1 ? "" : "hide") + "'>"
                + 'ETD:' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ExpectedDeparture)) < 1 ? "UnSpecified" : ConvertDateFormat(GetDateWithFormatMDY(item.ExpectedDeparture))) + "<br>"
                + 'ATD:' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ActualDeparture)) < 1 ? "UnSpecified" : ConvertDateFormat(GetDateWithFormatMDY(item.ActualDeparture))) + "<br>"
                + 'ETA:' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ExpectedArrival)) < 1 ? "UnSpecified" : ConvertDateFormat(GetDateWithFormatMDY(item.ExpectedArrival))) + "<br>"
                + 'ATA:' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ActualArrival)) < 1 ? "UnSpecified" : ConvertDateFormat(GetDateWithFormatMDY(item.ActualArrival)))
                + "</td>"
                + "<td class='ContainerNumbers hide  " + (1 == 1 ? "" : "hide") + "'>" + (item.ContainerNumbers == "0" ? "" : item.ContainerNumbers) + "</td>"
                + "<td class='TrackingStage hide hide " + (1 == 1 ? "" : "hide") + "'>" + (item.TrackingStageName == "0" ? "" : item.TrackingStageName) + "</td>"

                + "<td class=' ' style='white-space: nowrap;text-align: left;' val='" + ts_Name+ "'>" + ts_Name + "</td>"
                + "<td class=' ' style='white-space: nowrap;text-align: left;' val='" + ts_Date + "'>" + ts_Date + "</td>"
                + "<td class=' ' style='white-space: nowrap;' val='" + ts_Statue + "'>" + ts_Statue + "</td>"

                + "<td style='min-width:170px;color:blue;'  class='TruckingStages hide' val='" + item.TruckingStages + "'>" 
                + '<div id="accordion' + item.ID +'" role="tablist' + item.ID +'">'
                + '<div class="card-header btn btn-warning" style="padding:3px;min-width:170px;color:black;"  role="tab" id="card'+item.ID+'">'
              + '<h5 class="">'
              + '<a class="collapsed" data-toggle="collapse" href="#collapse' + item.ID +'" aria-expanded="false" aria-controls="collapse' + item.ID +'">'
                + 'Show / Hide Stages &nbsp;&nbsp;'
              + ' </a>'
              + '  </h5>'
              + ' </div>'
              + ' <div id="collapse' + item.ID + '" class="collapse" role="tabpanel" aria-labelledby="heading' + item.ID + '" data-parent="#accordion' + item.ID +'">'
                + '<div style="min-width:360px;color:black;"  class="card-body">'
              + "" + ((item.TruckingStages).replace(/\\r\\n/g, '<br>').trim()).replace('[ Done ]', '<b>[ Done ]</b>').trim() 
              + ' </div>'
              + ' </div>'
              + ' </div>'
              + "</td>"

                + "<td style='min-width:170px;color:blue;'  class='CCTruckingStages hide' val='" + item.CCTruckingStages + "'>"
                + '<div id="accordion_' + item.ID + '" role="tablist' + item.ID + '">'
                + '<div class="card-header btn btn-warning" style="padding:3px;min-width:170px;color:black;"  role="tab" id="card' + item.ID + '">'
                + '<h5 class="">'
                + '<a class="collapsed" data-toggle="collapse" href="#collapse_' + item.ID + '" aria-expanded="false" aria-controls="collapse_' + item.ID + '">'
                + 'Show / Hide Stages &nbsp;&nbsp;'
                + ' </a>'
                + '  </h5>'
                + ' </div>'
                + ' <div id="collapse_' + item.ID + '" class="collapse" role="tabpanel" aria-labelledby="heading_' + item.ID + '" data-parent="#accordion_' + item.ID + '">'
                + '<div style="min-width:360px;color:black;"  class="card-body">'
                + "" + ((item.CCTruckingStages).replace(/\\r\\n/g, '<br>').trim()).replace('[ Done ]', '<b>[ Done ]</b>').trim()
                + ' </div>'
                + ' </div>'
                + ' </div>'
                + "</td>"

                + "<td class='hWebSite_Form13States hide'><a href='#WebSite_Form13StatesModal' data-toggle='modal' onclick='WebSite_Form13States_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));


       // GenerateBarCodeForTable(item.ID, item.BarCode, item.BarCodeType);
    });
  //  ApplyPermissions();
    //BindAllCheckboxonTable("tblWebSite_Form13States", "ID");
    //CheckAllCheckbox("ID");
    HighlightText("#tblWebSite_Form13States>tbody>tr", $("#txt-Search").val());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("WebSite_Form13States"); });
    $("#hl-menu-WebSite_Form13States").parent().addClass("active");
}

function WebSite_Form13States_LoadingWithPaging()
{
    var pWhereClause = Operations_GetFilterWhereClause();
    var pControllerParameters = { pPageNumber: 1, pPageSize: $("#select-page-size option:selected").text(), pWhereClause: pWhereClause};
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, "ID DESC", 1, 10, pControllerParameters
        , function (pData) {
            WebSite_Form13States_BindTableRows(JSON.parse(pData[0]));
        });
   // HighlightText("#tblWebSite_Form13States>tbody>tr", $("#txt-Search").val().trim());
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $(".swapChildrenClass:not(.reversed)").reverseChildren();

    }
}





function Operations_GetFilterWhereClause() {
    debugger;
    var pWhereClause = "WHERE 1=1 ";
    //var pWhereClause = (glbCallingControl == "BLDocuments" ? "WHERE BLType=2 AND MasterOperationID IS NOT NULL " : "WHERE BLType<>2 ");
    var pTransportFilter = "";
    var pDirectionFilter = "";
    var pBLTypeFilter = "";
   

    if ($("#txtFilterCertificationNumber").val().trim() != "" && pWhereClause !== "") {
        pWhereClause += " AND (CC_CertificateNumber = '" + $("#txtFilterCertificationNumber").val().trim().toUpperCase() + "') ";
    }
    if ($("#txtFilterCommercialInvoice").val().trim() != "" && pWhereClause !== "") {
        pWhereClause += " AND (CCAInvoiceNumber = '" + $("#txtFilterCommercialInvoice").val().trim().toUpperCase() + "') ";
    }
    

    pWhereClause = (pWhereClause == "" ? " WHERE (1=1) " : pWhereClause);
    console.log(pWhereClause)
    return pWhereClause;
}






//function Operations_GetFilterWhereClause() {
//    debugger;
//    //var pWhereClause = "WHERE 1=1 ";
//    var pWhereClause = (glbCallingControl == "BLDocuments" ? "WHERE BLType=2 AND MasterOperationID IS NOT NULL " : "WHERE BLType<>2 ");
//    var pTransportFilter = "";
//    var pDirectionFilter = "";
//    var pBLTypeFilter = "";
//    var pOperationStageFilter = ($("#ulOperationStages").val() == "" || $("#ulOperationStages option:selected").text() == "" ? "" : " ( OperationStageName=N'" + $("#ulOperationStages option:selected").text() + "')"); //if 0 then all stages

//    if (pOperationStageFilter != "" && pWhereClause != "")
//        pWhereClause += " AND " + pOperationStageFilter;

//    if ($("#txtFilterOperationCode").val().trim() != "" && pWhereClause !== "") {
//        pWhereClause += " AND (CodeSerial=" + $("#txtFilterOperationCode").val().trim();
//        pWhereClause += "       OR MasterOperationCodeSerial=" + $("#txtFilterOperationCode").val().trim();
//        pWhereClause += ")";
//    }
//    if ($("#slFilterBranch").val() != null && $("#slFilterBranch").val() != "" && pWhereClause !== "")
//        pWhereClause += " AND BranchID =" + $("#slFilterBranch").val();
//    if ($("#slFilterCreator").val() != null && $("#slFilterCreator").val() != "" && pWhereClause !== "")
//        pWhereClause += " AND CreatorUserID =" + $("#slFilterCreator").val();
//    if ($("#slFilterSalesman").val() != null && $("#slFilterSalesman").val() != "" && pWhereClause !== "")
//        pWhereClause += " AND SalesmanID =" + $("#slFilterSalesman").val();
//    if ($("#txtFilterInvoiceNumber").val().trim() != "" && pWhereClause !== "")
//        pWhereClause += " AND (InvoiceNumbers like '" + $("#txtFilterInvoiceNumber").val().trim().toUpperCase() + "/%' OR InvoiceNumbers like '%," + $("#txtFilterInvoiceNumber").val().trim().toUpperCase() + "/%')";

//    if ($("#slFilterDirection").val() != null && $("#slFilterDirection").val() != "" && pWhereClause !== "")
//        pWhereClause += " AND DirectionType =" + $("#slFilterDirection").val();
//    if ($("#slFilterTransport").val() != null && $("#slFilterTransport").val() != "" && pWhereClause !== "")
//        pWhereClause += " AND TransportType =" + $("#slFilterTransport").val();
//    if ($("#slFilterShipmentType").val() != null && $("#slFilterShipmentType").val() != "" && pWhereClause !== "")
//        pWhereClause += " AND ShipmentType =" + $("#slFilterShipmentType").val();

//    if ($("#txtFilterClientName").val().trim() != "" && pWhereClause !== "")
//        pWhereClause += " AND ClientName like '%" + $("#txtFilterClientName").val().trim().toUpperCase() + "%' ";
//    if ($("#txtFilterGrossWeight").val().trim() != "" && pWhereClause !== "")
//        pWhereClause += " AND GrossWeightSum = '" + $("#txtFilterGrossWeight").val().trim().toUpperCase() + "' ";
//    if ($("#txtFilterContainerNumber").val().trim() != "" && pWhereClause !== "") {
//        pWhereClause += " AND (ContainerNumber like '%" + $("#txtFilterContainerNumber").val().trim().toUpperCase() + "%' ";
//        pWhereClause += "      OR ContainerNumbers like '%" + $("#txtFilterContainerNumber").val().trim().toUpperCase() + "%') ";
//    }
//    if ($("#slFilterShipper").val() != null && $("#slFilterShipper").val() != "" && pWhereClause !== "")
//        pWhereClause += " AND ShipperID =" + $("#slFilterShipper").val();
//    if ($("#slFilterCCA").val() != null && $("#slFilterCCA").val() != "" && pWhereClause !== "")
//        pWhereClause += " AND CustomsClearanceAgentID =" + $("#slFilterCCA").val();
//    if ($("#slFilterConsignee").val() != null && $("#slFilterConsignee").val() != "" && pWhereClause !== "")
//        pWhereClause += " AND ConsigneeID =" + $("#slFilterConsignee").val();
//    if ($("#slFilterAgent").val() != null && $("#slFilterAgent").val() != "" && pWhereClause !== "")
//        pWhereClause += " AND AgentID =" + $("#slFilterAgent").val();
//    if ($("#slFilterBookingParty").val() != null && $("#slFilterBookingParty").val() != "" && pWhereClause !== "")
//        pWhereClause += " AND BookingPartyID =" + $("#slFilterBookingParty").val();
//    if ($("#slFilterMoveType").val() != null && $("#slFilterMoveType").val() != "" && pWhereClause !== "")
//        pWhereClause += " AND MoveTypeID =" + $("#slFilterMoveType").val();
//    if ($("#slFilterAirline").val() != null && $("#slFilterAirline").val() != "" && pWhereClause !== "")
//        pWhereClause += " AND AirlineID =" + $("#slFilterAirline").val();
//    if ($("#slFilterShippingLine").val() != null && $("#slFilterShippingLine").val() != "" && pWhereClause !== "")
//        pWhereClause += " AND ShippingLineID =" + $("#slFilterShippingLine").val();
//    if ($("#slFilterVessel").val() != null && $("#slFilterVessel").val() != "" && pWhereClause !== "")
//        pWhereClause += " AND VesselID =" + $("#slFilterVessel").val();
//    if ($("#slFilterTrucker").val() != null && $("#slFilterTrucker").val() != "" && pWhereClause !== "")
//        pWhereClause += " AND TruckerID =" + $("#slFilterTrucker").val();
//    if ($("#slFilterPOLCountry").val() != null && $("#slFilterPOLCountry").val() != "" && pWhereClause !== "")
//        pWhereClause += " AND POLCountryID =" + $("#slFilterPOLCountry").val();
//    if ($("#slFilterPOL").val() != null && $("#slFilterPOL").val() != "" && pWhereClause !== "")
//        pWhereClause += " AND POL =" + $("#slFilterPOL").val();
//    if ($("#slFilterPODCountry").val() != null && $("#slFilterPODCountry").val() != "" && pWhereClause !== "")
//        pWhereClause += " AND PODCountryID =" + $("#slFilterPODCountry").val();
//    if ($("#slFilterPOD").val() != null && $("#slFilterPOD").val() != "" && pWhereClause !== "")
//        pWhereClause += " AND POD =" + $("#slFilterPOD").val();
//    if ($("#txtFilterCertificateNumber").val().trim() != "" && pWhereClause !== "") {
//        pWhereClause += " AND (CertificateNumber like '%" + $("#txtFilterCertificateNumber").val().trim().toUpperCase() + "%') ";
//    }
//    if ($("#txtFilterCustomerReference").val().trim() != "" && pWhereClause !== "") {
//        pWhereClause += " AND (CustomerReference like '%" + $("#txtFilterCustomerReference").val().trim().toUpperCase() + "%') ";
//    }
//    if ($("#txtFilterSupplierReference").val().trim() != "" && pWhereClause !== "") {
//        pWhereClause += " AND (SupplierReference like '%" + $("#txtFilterSupplierReference").val().trim().toUpperCase() + "%') ";
//    }
//    if ($("#txtFilterPONumber").val().trim() != "" && pWhereClause !== "") {
//        pWhereClause += " AND (PONumber like '%" + $("#txtFilterPONumber").val().trim().toUpperCase() + "%') ";
//    }
//    if ($("#txtFilterMasterBL").val().trim() != "" && pWhereClause !== "") {
//        pWhereClause += " AND (MasterBL like '%" + $("#txtFilterMasterBL").val().trim().toUpperCase() + "%') ";
//    }
//    if ($("#txtFilterHouseBLs").val().trim() != "" && pWhereClause !== "") {
//        pWhereClause += " AND (HouseBLs like '%" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "%' OR HouseNumber=N'" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "') ";
//    }
//    if ($("#txtFilterBookingNumbers").val().trim() != "" && pWhereClause !== "") {
//        pWhereClause += " AND (BookingNumbers like '%" + $("#txtFilterBookingNumbers").val().trim().toUpperCase() + "%') ";
//    }
//    if ($("#txtFilterReference").val().trim() != "" && pWhereClause !== "") {
//        if (pDefaults.UnEditableCompanyName == "KDM")
//            pWhereClause += " AND (ReleaseNumber like '%" + $("#txtFilterReference").val().trim().toUpperCase() + "%') ";
//        else
//            pWhereClause += " AND (Reference like '%" + $("#txtFilterReference").val().trim().toUpperCase() + "%') ";
//    }
//    if ($("#txtFilterMainRouteNotes").val().trim() != "" && pWhereClause !== "") {
//        pWhereClause += " AND (MainRouteNotes like '%" + $("#txtFilterMainRouteNotes").val().trim().toUpperCase() + "%') ";
//    }

//    if ($("#txtFilterFlexi").val().trim() != "" && pWhereClause !== "") {
//        pWhereClause += " AND ((ISNULL((SELECT COUNT(f.ID) FROM dbo.vwFlexiSerial AS f WHERE dbo.vwOperations.ID IN(IsNull(f.ExportOperationID, 0), ISNULL(f.ImportOperationID, 0)) AND f.Code LIKE '%" + $("#txtFilterFlexi").val().trim().toUpperCase() + "%'), 0)) > 0)";
//    }



//    if (isValidDate($("#txtFilterFromOpenDate").val().trim(), 1)) {
//        if ($("#txtFilterFromOpenDate").val() != null && $("#txtFilterFromOpenDate").val() != "" && pWhereClause !== "")
//            pWhereClause += " AND OpenDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFilterFromOpenDate").val()) + " 00:00:00.000'";
//        //else if ($("#txtFilterFromOpenDate").val() != null && $("#txtFilterFromOpenDate").val() != "" && pWhereClause == "")
//        //    pWhereClause += " WHERE OpenDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFilterFromOpenDate").val()) + " 00:00:00.000'";
//    }
//    if (isValidDate($("#txtFilterToOpenDate").val().trim(), 1)) {
//        if ($("#txtFilterToOpenDate").val() != null && $("#txtFilterToOpenDate").val() != "" && pWhereClause !== "")
//            pWhereClause += " AND OpenDate <= '" + GetDateWithFormatyyyyMMdd($("#txtFilterToOpenDate").val()) + " 23:59:59.999'";
//        //else if ($("#txtFilterToOpenDate").val() != null && $("#txtFilterToOpenDate").val() != "" && pWhereClause == "")
//        //    pWhereClause += " WHERE OpenDate <= '" + GetDateWithFormatyyyyMMdd($("#txtFilterToOpenDate").val()) + " 23:59:59.999'";
//    }

//    if (isValidDate($("#txtFilterFromETDDate").val().trim(), 1)) {
//        if ($("#txtFilterFromETDDate").val() != null && $("#txtFilterFromETDDate").val() != "" && pWhereClause !== "")
//            pWhereClause += " AND ExpectedDeparture >= '" + GetDateWithFormatyyyyMMdd($("#txtFilterFromETDDate").val()) + " 00:00:00.000'";
//        //else if ($("#txtFilterFromETDDate").val() != null && $("#txtFilterFromETDDate").val() != "" && pWhereClause == "")
//        //    pWhereClause += " WHERE ExpectedDeparture >= '" + GetDateWithFormatyyyyMMdd($("#txtFilterFromETDDate").val()) + " 00:00:00.000'";
//    }
//    if (isValidDate($("#txtFilterToETDDate").val().trim(), 1)) {
//        if ($("#txtFilterToETDDate").val() != null && $("#txtFilterToETDDate").val() != "" && pWhereClause !== "")
//            pWhereClause += " AND ExpectedDeparture <= '" + GetDateWithFormatyyyyMMdd($("#txtFilterToETDDate").val()) + " 23:59:59.999'";
//        //else if ($("#txtFilterToETDDate").val() != null && $("#txtFilterToETDDate").val() != "" && pWhereClause == "")
//        //    pWhereClause += " WHERE ExpectedDeparture <= '" + GetDateWithFormatyyyyMMdd($("#txtFilterToETDDate").val()) + " 23:59:59.999'";
//    }

//    if (isValidDate($("#txtFilterFromETADate").val().trim(), 1)) {
//        if ($("#txtFilterFromETADate").val() != null && $("#txtFilterFromETADate").val() != "" && pWhereClause !== "")
//            pWhereClause += " AND ExpectedArrival >= '" + GetDateWithFormatyyyyMMdd($("#txtFilterFromETADate").val()) + " 00:00:00.000'";
//        //else if ($("#txtFilterFromETADate").val() != null && $("#txtFilterFromETADate").val() != "" && pWhereClause == "")
//        //    pWhereClause += " WHERE ExpectedArrival >= '" + GetDateWithFormatyyyyMMdd($("#txtFilterFromETADate").val()) + " 00:00:00.000'";
//    }
//    if (isValidDate($("#txtFilterToETADate").val().trim(), 1)) {
//        if ($("#txtFilterToETADate").val() != null && $("#txtFilterToETADate").val() != "" && pWhereClause !== "")
//            pWhereClause += " AND ExpectedArrival <= '" + GetDateWithFormatyyyyMMdd($("#txtFilterToETADate").val()) + " 23:59:59.999'";
//        //else if ($("#txtFilterToETADate").val() != null && $("#txtFilterToETADate").val() != "" && pWhereClause == "")
//        //    pWhereClause += " WHERE ExpectedArrival <= '" + GetDateWithFormatyyyyMMdd($("#txtFilterToETADate").val()) + " 23:59:59.999'";
//    }
//    /*****************Side Controls***************************/

//    pWhereClause = (pWhereClause == "" ? " WHERE (1=1) " : pWhereClause);
//    return pWhereClause;
//}




//function addNewlines(str)
//{
//    var result = '';
//    while (str.length > 0) {
//        result += str.substring(0, 200) + '\n';
//        str = str.substring(200);
//    }
//    return result;
//}