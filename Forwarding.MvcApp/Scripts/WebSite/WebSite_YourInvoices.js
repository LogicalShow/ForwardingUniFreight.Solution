var TodaysDate = new Date();
var FormattedTodaysDate = TodaysDate.toLocaleDateString();
printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Print" + "</span>";
var pFinalReportHTML = '';
function WebSite_YourInvoices_BindTableRows(pWebSite_YourInvoices) {
    debugger;
    ClearAllTableRows("tblWebSite_YourInvoices");
    $.each(pWebSite_YourInvoices, function (i, item)
    {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblWebSite_YourInvoices",
            ("<tr ID='" + item.ID + "' ondblclick=''>"
                + "<td class='InvoiceNumber' style='white-space:nowrap;' val='" + item.InvoiceNumber + "'>" + item.InvoiceNumber + '/' + item.InvoiceTypeName + "</td>"
                + "<td class='InvoiceDate' val='" + GetDateFromServer(item.InvoiceDate) + "'>" + GetDateFromServer(item.InvoiceDate) + "</td>"
                + "<td class='MasterBL ' val='" + item.MasterBL + "'>" + IsNull(item.MasterBL, "-") + "</td>"
                + "<td class='VesselName hide' val='" + item.VesselName + "'>" + IsNull( item.VesselName , "-" ) + "</td>"
                + "<td class='Amount' val='" + item.Amount + "'>" + item.Amount + "</td>"
                + "<td class='CurrencyCode' val='" + item.CurrencyCode + "'>" + item.CurrencyCode + "</td>"
                + "<td class='OperationCode' val='" + item.OperationCode + "'>" + item.OperationCode + "</td>"
                + "<td class='HouseNumber' val='" + item.HouseNumber + "'>" + IsNull(item.HouseNumber, "-") + "</td>"

                + "<td class='InvoiceTaxTypeID hide' val=" + item.TaxTypeID + ">" + (item.TaxTypeID == 0 ? "" : item.TaxTypeName) + "</td>"
                + "<td class='InvoiceTaxPercentage hide'>" + item.TaxPercentage + "</td>"
                + "<td class='InvoiceTaxAmount hide'>" + item.TaxAmount.toFixed(2) + "</td>"
                + "<td class='InvoiceDiscountTypeID hide' val=" + item.DiscountTypeID + ">" + (item.DiscountTypeID == 0 ? "" : item.DiscountTypeName) + "</td>"
                + "<td class='InvoiceDiscountPercentage hide'>" + item.DiscountPercentage + "</td>"
                + "<td class='InvoiceDiscountAmount hide'>" + item.DiscountAmount.toFixed(2) + "</td>"
                + "<td class='InvoiceFixedDiscount hide'>" + item.FixedDiscount + "</td>"
                
                + "<td class='InvoicePartner hide'>" + (item.PartnerName == 0 ? "" : item.PartnerName)  + "</td>"
                + "<td class='InvoiceAmountWithoutVAT hide'>" + item.AmountWithoutVAT.toFixed(2) + "</td>"
                + "<td class='InvoiceAmount hide'>" + item.Amount.toFixed(2) + "</td>"
                + "<td class='InvoiceCurrency hide' val='" + item.CurrencyID + "'>" + (item.CurrencyID == 0 ? "" : item.CurrencyCode) + "</td>"
                + "<td class='InvoiceMasterDataExchangeRate hide'>" + item.MasterDataExchangeRate.toFixed(2) + "</td>"
                + "<td class='InvoiceDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.InvoiceDate)) + "</td>"
                + "<td class='InvoiceDueDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.DueDate)) + "</td>"
                + "<td class=''>"
                + "<a onclick='Invoices_Print(" + item.ID + ",3," + '"Print"' + ");' " + printControlsText + "</a>"
                + "</td></tr>"
            ));
    });
    HighlightText("#tblWebSite_YourInvoices>tbody>tr", $("#txt-Search").val());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("WebSite_YourInvoices"); });
    $("#hl-menu-WebSite_YourInvoices").parent().addClass("active");
}

function WebSite_YourInvoices_LoadingWithPaging()
{
    strLoadWithPagingFunctionName = "/api/WebSite_YourInvoices/LoadWithWhereClause";
    var pWhereClause = WebSite_YourInvoices_GetFilterWhereClause();
    var pControllerParameters = { pPageNumber: 1, pPageSize: $("#select-page-size option:selected").text(), pWhereClause: pWhereClause};
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, "ID DESC", 1, 10, pControllerParameters
        , function (pData) {
            WebSite_YourInvoices_BindTableRows(JSON.parse(pData[0]));
        });
   // HighlightText("#tblWebSite_YourInvoices>tbody>tr", $("#txt-Search").val().trim());
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $(".swapChildrenClass:not(.reversed)").reverseChildren();

    }
}

function WebSite_YourInvoices_GetFilterWhereClause() {
    debugger;
    var pWhereClause = "WHERE  ISNULL( IsDeleted , 0 ) = 0 ";

    if (pDefaults.UnEditableCompanyName == "ELI")
        pWhereClause += " AND CONVERT(DATE, InvoiceDate) > '12/31/2020' AND CONVERT(DATE, CreationDate) > '12/31/2020' AND CONVERT(DATE, DueDate) > '12/31/2020'";


    if ($("#txtFilterMasterBL").val().trim() != "" && pWhereClause !== "") {
        pWhereClause += " AND (MasterBL like '%" + $("#txtFilterMasterBL").val().trim().toUpperCase() + "%') ";
    }
    if ($("#txtFilterContainerNumber").val().trim() != "" && pWhereClause !== "") {
        pWhereClause += " AND (ContainerNumber like '%" + $("#txtFilterContainerNumber").val().trim().toUpperCase() + "%' ";
        pWhereClause += "      OR ContainerNumbers like '%" + $("#txtFilterContainerNumber").val().trim().toUpperCase() + "%') ";
    }
    if ($("#txtFilterBookingNumbers").val().trim() != "" && pWhereClause !== "") {
        pWhereClause += " AND (BookingNumbers like '%" + $("#txtFilterBookingNumbers").val().trim().toUpperCase() + "%') ";
    }
    if ($("#txtFilterHBL").val().trim() != "" && pWhereClause !== "") {
        pWhereClause += " AND (HouseNumber = '" + $("#txtFilterHBL").val().trim().toUpperCase() + "') ";
    }
    
    if ($("#txtFilterInvoiceNo").val().trim() != "" && pWhereClause !== "") {
        pWhereClause += " AND (InvoiceNumber = '" + $("#txtFilterInvoiceNo").val().trim().toUpperCase() + "') ";
    }
    if (isValidDate($("#txtFilterInvoiceDate").val().trim(), 1)) {
        if ($("#txtFilterInvoiceDate").val() != null && $("#txtFilterInvoiceDate").val() != "" && pWhereClause !== "")
            pWhereClause += " AND convert(date ,  InvoiceDate) = convert(date , '" + GetDateWithFormatyyyyMMdd($("#txtFilterInvoiceDate").val()) + " 00:00:00.000')";
    }
    pWhereClause = (pWhereClause == "" ? " WHERE ( ISNULL( IsDeleted , 0 ) = 0 ) " : pWhereClause);



   // 
   // 
   // 


    return pWhereClause;
}



function Invoices_PrintOptions() {
    debugger;
    if ($("#hDefaultUnEditableCompanyName").val() == "EGL") {
        $("#cbPrintUSDTotal").parent().removeClass("hide");
        $("#cbPrintReceivableNotes").parent().removeClass("hide");
        $("#cbPrintStamp-Ar").parent().removeClass("hide");
        $("#cbPrintStamp-Kadmar").parent().removeClass("hide");
    }
    else {
        $("#cbPrintUSDTotal").parent().addClass("hide");
        $("#cbPrintReceivableNotes").parent().addClass("hide");
        $("#cbPrintStamp-Ar").parent().addClass("hide");
        $("#cbPrintStamp-Kadmar").parent().addClass("hide");
    }
    jQuery("#PrintInvoiceOptionsModal").modal("show");
}
function Invoices_Print(pID, pReportTypeID, pOption) {

    pFinalReportHTML = "";

    debugger;
    if ($("#cbPrintBankDetailsFromTemplate").prop("checked") && $("#slBankTemplate").val() == "") {
        swal("Sorry", "Please select bank template or change that option.");
        return;
    }
    var pWhereClause = "";
    var pIsPrintWithoutValidation = false;
    if ($("#hDefaultUnEditableCompanyName").val() != "FFI")
        pIsPrintWithoutValidation = true;
    pWhereClause += " WHERE ID = " + pID;
    var pParametersWithValues = {
        pWhereClause: pWhereClause
        , pID: pID
        , pInvoiceReportTypeID: pReportTypeID
        , pIsPrintWithoutValidation: pIsPrintWithoutValidation
        , pBankTemplateID: (!$("#cbPrintBankDetailsFromTemplate").prop("checked") ? 0 : $("#slBankTemplate").val())
        , pIsOriginalChassisItems: false
    } //3:pdf , 4:rft
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/Reports/Report_Invoice"
        , pParametersWithValues
        , function (data) {

            var pRecordsExist = data[0];
            //data[1] : strExportedFileName
            //data[2] : objCvwReceivables.lstCVarvwReceivables
            var pInvoiceItem = JSON.parse(data[2]);
            var pContainerTypes = data[3];
            var pHouseNumber = data[4];
            var pMasterOperationCode = data[5];
            var pTaxNumber = (data[6] == 0 ? "" : data[6]);
            var pInvoiceDate = data[7];//pInvoiceDate.ToShortDateString()
            var pInvoiceNumber = data[8];
            var pAccountName = data[9];
            var pBankName = data[10];
            var pBankAddress = data[11];
            var pSwiftCode = data[12];
            var pAccountNumber = data[13];
            var pMasterBL = data[14];
            var pPackageTypes = data[15];
            var pCustomerReference = data[16];
            var MissingMandatoryFields = data[17];
            var pInvoiceDueDate = data[18];
            var pPOLName = data[19];
            var pPODName = data[20];
            var pHouseBLs = data[21];//used incase the invoice is created for the master operation and holds all the HBL Nos on that operation
            var pTaxTypeName = data[22];
            var pTaxAmount = data[23];
            var pDiscountTypeName = data[24];
            var pDiscountAmount = data[25];
            var pAddressLine1 = data[26];
            var pAddressLine2 = data[27];
            var pAddressLine3 = data[28];
            var pPhones = data[29];
            var pFaxes = data[30];
            var pCBM = data[31];
            var pGrossWeightSum = data[32];
            var pClientStreetLine1 = data[33];
            var pClientStreetLine2 = data[34];
            var pClientCityName = data[35];
            var pClientCountryName = data[36];
            var pShipmentTypeCode = data[37];
            var pIncotermName = data[38];
            var pShipperName = data[39];
            var pConsigneeName = data[40];
            var pVesselName = data[41];
            var pETA = data[42];
            var pETD = data[43];
            var pContainerNumbers = data[44];
            var pSalesman = data[45];
            var pVATNumber = data[46];
            var pDescriptionOfGoods = data[47];
            var pVGM = data[48];
            var pNumberOfPackages = data[49];
            var pETAPOD = data[50];
            var pLeftSignature = data[51];
            var pMiddleSignature = data[52];
            var pRightSignature = data[53];
            var pGRT = data[54];
            var pDWT = data[55];
            var pNRT = data[56];
            var pLOA = data[57];
            var pInvoiceTypeCode = data[58];
            var pBankDetailsTemplate = data[59];
            var pOperationHeader = JSON.parse(data[60]);
            var pInvoiceHeader = JSON.parse(data[61]);
            var pDeliveryOrderNumber = data[62];
            var pMasterOperationHeader = JSON.parse(data[63]);
            var pDefaultsRow = JSON.parse(data[64]);
            var pMainRoute = JSON.parse(data[65]);
            var pELIInvoicePrefix = data[66];
            var pClientHeader = JSON.parse(data[67]);
            var pTankOrFlexiNumbers = data[68];
            var pTruckingOrders = JSON.parse(data[69]);
            var pFleetOrders = JSON.parse(data[70]);
            var pCustomsClearance = JSON.parse(data[71]);
            var pOperationPartner = JSON.parse(data[72]);
            pQRImage = data[73]
            if (pOption == "Email") {
                var _SelectedContactEmails = GetAllSelectedTextSiblingsByNameAttr("cbAddedItemID");
                if (_SelectedContactEmails != "")
                    pClientHeader.Email += (pClientHeader.Email == "" || pClientHeader.Email == 0)
                        ? _SelectedContactEmails
                        : ("," + _SelectedContactEmails);
            }
            debugger;
            //When printed from operations the draft invoices are in another table
            var pInvoiceTableSuffix = (glbCallingControl == "OperationsEdit" && pInvoiceTypeCode == "DRAFT") ? "DRAFT" : "";
            //if (pDeliveryOrderNumber == 0)
            //    pDeliveryOrderNumber = $("#tblRoutings tr td.RoutingType[val=30]").parent().find("td.DeliveryOrderNumber").text();

            //var trMainRoute = $("#tblRoutings tbody tr td[val=30]").parent();
            //$("#tblRoutings tbody tr td[val=30]").parent().find("td.Vessel").text();
            $("#tblInvoices" + pInvoiceTableSuffix + " tbody tr[id=" + pID + "] td.InvoiceAmount").text(pInvoiceHeader.Amount.toFixed(2));

            if (pClientHeader == undefined)
                swal("Sorry", "This invoice has not client.");
            else if (pRecordsExist == false)
                swal(strSorry, MissingMandatoryFields);
            else if (pDefaults.UnEditableCompanyName == "COS" //&& glbCallingControl == "DraftInvoicesApprovals"
                && (pClientHeader.VATNumber == "0" || pClientHeader.VATNumber == ""))
                swal("Sorry", "VAT Number is not found");
            else {
                if (pInvoiceHeader.IsFleet && pDefaults.IsTaxOnItems) {
                    debugger;
                    var ReportHTML = '';
                    if (pFleetOrders.length > 0) {
                        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                        //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                        ReportHTML += '<html>';
                        ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                        //ReportHTML += '                 <div class="col-xs-12 text-center ' + (pDefaults.UnEditableCompanyName == "GBL" ? " m-t-lg " : "") + '"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + ' ' + (pInvoiceHeader.IsApproved ? $("#slInvoiceOriginal").val() : (pDefaults.UnEditableCompanyName == "GBL" ? " (Draft) " : "")) + '</h3></div>';
                        if (pDefaults.UnEditableCompanyName == "GBL")
                            ReportHTML += '                 <div class="col-xs-12 text-center m-t-lg"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + ' '
                                + (!pInvoiceHeader.IsApproved
                                    ? "(Draft)"
                                    : (pInvoiceHeader.IsApproved && pInvoiceHeader.IsPrintOriginal
                                        ? "(Original)"
                                        : (pInvoiceHeader.IsApproved && !pInvoiceHeader.IsPrintOriginal && $("#slInvoiceOriginal").val() == ""
                                            ? "(Copy)"
                                            : $("#slInvoiceOriginal").val())
                                    )
                                )
                                + '</h3></div>';
                        else
                            ReportHTML += '                 <div class="col-xs-12 text-center"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + ' ' + (pInvoiceHeader.IsApproved ? $("#slInvoiceOriginal").val() : "") + '</h3></div>';

                        //if (!(pDefaults.UnEditableCompanyName == "MEL" && pInvoiceHeader.InvoiceTypeName == "SW")) //Dont print for Safena
                        //    ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + '</h3></div>';
                        //else { //i.e. (pDefaults.UnEditableCompanyName == "SAF" && pInvoiceTypeCode == "DRAFT") {
                        //    ReportHTML += '             <div style="position:absolute;left:50px;top:170px;">';
                        //    ReportHTML += '             <img src="/Content/Images/DraftWaterMark.jpg" alt="logo" width=612px; height=200px;></div>';
                        //}
                        ////ReportHTML += '             <div style="clear:both;"><br></div>';
                        //ReportHTML += '         <div class="col-xs-1 m-l-n-md"><img src="/Content/Images/' + 'InvoiceSideStatement.jpg' + '" alt="logo"/></div>';

                        ReportHTML += '         <div class="col-xs-12 m-t">';

                        ReportHTML += '             <div class="col-xs-8">';
                        ReportHTML += '                 <b>Bill to: </b>' + pInvoiceHeader.PartnerName;
                        if (pDefaults.UnEditableCompanyName == "GBL") {
                            ReportHTML += '                 <br><b>Address: </b>' + (pClientHeader.Address == 0 ? "" : pClientHeader.Address.replace(/\n/g, "<br/>"));
                        }
                        else {
                            ReportHTML += '                 <br><b>Address: </b>' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                            ReportHTML += '                     ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2));
                            ReportHTML += '                     ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                            ReportHTML += '                     ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                        }
                        ReportHTML += '             </div>';
                        ReportHTML += '             <div class="col-xs-4">';
                        if (pInvoiceTypeCode == "SOA" && pInvoiceHeader.RelatedToInvoiceID != 0)
                            ReportHTML += '             <b>Related To: </b>' + pInvoiceHeader.RelatedToInvoiceTypeName + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(8, 2) + "#" + pInvoiceHeader.RelatedToInvoiceNumber.toString().padStart(5, 0) + '<br>';
                        ReportHTML += '                 <b>Billing Date: </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '<br>';
                        ReportHTML += '                 <b>Billing Due Date: </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '<br>';
                        ReportHTML += '             </div>';
                        //if (pInvoiceTypeCode == "DRAFT") {
                        //    ReportHTML += '             <div style="position:absolute;left:50px;top:250px;">';
                        //    ReportHTML += '             <img src="/Content/Images/DraftWaterMark.jpg" alt="logo" width=612px; height=200px;></div>';
                        //}

                        ReportHTML += '                 <div class="col-xs-12 clear"><hr style="border:solid #000 1px;" /></div>';

                        //ReportHTML += '         <div class="col-xs-6"><b>Operation: </b>' + (pOperationHeader.Code == 0 ? "" : pOperationHeader.Code) + '</div>';
                        //if ($("#cbPrintMBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU")
                        //    ReportHTML += '             <div class="col-xs-6"><b>MB/L No.: </b>' + pMasterBL + '</div>';
                        //if ($("#cbPrintHBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ) {
                        //    if (pHouseBLs != "0")//Master Operation so show all houses on it
                        //        ReportHTML += '             <div class="col-xs-6"><b>HBL</b>: ' + pHouseBLs + '</div>';
                        //    else if (pHouseNumber != "0")
                        //        ReportHTML += '             <div class="col-xs-6"><b>HB/L No.:</b> ' + (pHouseNumber == "" ? "N/A" : pHouseNumber) + '</div>';
                        //}
                        if (pFleetOrders != null)
                            ReportHTML += '         <div class="col-xs-6"><b>Division: </b>' + (pFleetOrders[0].DivisionName == 0 ? "" : pFleetOrders[0].DivisionName) + '</div>';
                        if (pInvoiceHeader.InvoiceTypeCode == "CREDITMEMO" && pDefaults.UnEditableCompanyName == "GBL")
                            ReportHTML += '             <div class="col-xs-12" style="clear:both;"><b>Cancelled Invoice: </b>' + (pInvoiceHeader.Notes == 0 ? "" : pInvoiceHeader.Notes) + '</div>';
                        ReportHTML += '             <div class="col-xs-12" style="clear:both;"><b>Notes: </b>' + (pInvoiceHeader.EditableNotes == 0 ? "" : pInvoiceHeader.EditableNotes) + '</div>';
                        if (pOperationHeader.CertificateNumber != "N/A"
                            && !(pDefaults.UnEditableCompanyName == "GBL" && pOperationHeader.MoveTypeName == "WAREHOUSING"))
                            ReportHTML += '         <div class="col-xs-6"><b>Certificate Number: </b>' + (pOperationHeader.CertificateNumber == 0 ? "" : pOperationHeader.CertificateNumber) + '</div>';

                        //if (pInvoiceItem.length > 0 && pDefaults.UnEditableCompanyName == "GBL")
                        //    if (pInvoiceItem[0].TruckingOrderID != 0) {
                        //        ReportHTML += '         <div class="col-xs-6"><b>Loading Zone: </b>' + (pInvoiceItem[0].LoadingZoneName == 0 ? "N/A" : pInvoiceItem[0].LoadingZoneName) + '</div>';
                        //        ReportHTML += '         <div class="col-xs-6"><b>First Curing Zone: </b>' + (pInvoiceItem[0].FirstCuringAreaName == 0 ? "" : pInvoiceItem[0].FirstCuringAreaName) + '</div>';
                        //        ReportHTML += '         <div class="col-xs-6"><b>Second Curing Zone: </b>' + (pInvoiceItem[0].SecondCuringAreaName == 0 ? "" : pInvoiceItem[0].SecondCuringAreaName) + '</div>';
                        //        ReportHTML += '         <div class="col-xs-6"><b>Third Curing Zone: </b>' + (pInvoiceItem[0].ThirdCuringAreaName == 0 ? "" : pInvoiceItem[0].ThirdCuringAreaName) + '</div>';
                        //    }

                        if ($("#cbLargeInvoice").prop("checked")) {
                            ReportHTML += '         <div class="m-l" style="clear:both;"><h3><br><br><br>Please, see attachment.</h3></div>';
                            ReportHTML += '         <div class="break"></div>';
                        }

                        ReportHTML += '                     <div class="col-xs-12 clear">';
                        ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                        ReportHTML += '                             <thead>';
                        ReportHTML += '                                 <tr>';
                        if (pDefaults.UnEditableCompanyName == "SAF" || pDefaults.UnEditableCompanyName == "MEL" || pDefaults.UnEditableCompanyName == "GBL")
                            ReportHTML += '                                     <th>Item</th>';
                        ReportHTML += '                                     <th>Description</th>';
                        ReportHTML += '                                     <th>Qty</th>';
                        ReportHTML += '                                     <th>Unit Price</th>';
                        if (pDefaults.UnEditableCompanyName == "GBL")
                            ReportHTML += '                                     <th>SubTotal</th>';
                        else
                            ReportHTML += '                                     <th>WHT</th>';
                        ReportHTML += '                                     <th>VAT</th>';
                        ReportHTML += '                                     <th>Total</th>';
                        ReportHTML += '                                 </tr>';
                        ReportHTML += '                             </thead>';
                        ReportHTML += '                             <tbody>';
                        var _TotalTaxOnItems = 0;
                        var _TotalDiscountOnItems = 0;
                        $.each(pFleetOrders, function (i, item) {
                            _TotalTaxOnItems += item.TaxAmount;
                            _TotalDiscountOnItems += item.DiscountAmount;
                            ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                            if (pDefaults.UnEditableCompanyName == "SAF" || pDefaults.UnEditableCompanyName == "MEL" || pDefaults.UnEditableCompanyName == "GBL")
                                ReportHTML += '                                         <td>' + (i + 1) + '</td>';
                            ReportHTML += '                                         <td style="text-align:left;">' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 && item.ChargeTypeLocalName != undefined ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes.replace(/\n/g, "<br/>")) : "") + '</td>';
                            ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                            ReportHTML += '                                         <td>' + item.SalePrice.toFixed(2) + '</td>'; //because in controller gets average
                            if (pDefaults.UnEditableCompanyName == "GBL")
                                ReportHTML += '                                         <td>' + item.AmountWithoutVAT.toFixed(2) + '</td>';
                            else
                                ReportHTML += '                                         <td>' + item.DiscountAmount.toFixed(2) + '</td>';
                            ReportHTML += '                                         <td>' + item.TaxAmount.toFixed(2) + '</td>';
                            ReportHTML += '                                         <td>' + (item.AmountWithoutVAT + item.TaxAmount).toFixed(2) + '</td>';
                            //ReportHTML += '                                         <td>' + (item.Notes == "0" ? "" : item.Notes) + '</td>';
                            ReportHTML += '                                     </tr>';
                        });
                        if (pInvoiceHeader.FixedDiscount > 0) {
                            ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                            ReportHTML += '                                         <td>' + '' + '</td>';
                            ReportHTML += '                                         <td style="text-align:left;">' + 'Special Discount' + '</td>';
                            ReportHTML += '                                         <td>' + '' + '</td>';
                            ReportHTML += '                                         <td colspan=4>' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2) + '</td>';
                            //ReportHTML += '                                         <td>' + _TotalTaxOnItems + '</td>';
                            //ReportHTML += '                                         <td>' + '' + '</td>';
                            ReportHTML += '                                     </tr>';
                        }
                        //ReportHTML += '                                         <tr>';
                        //ReportHTML += '                                             <td colspan=2>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                        //ReportHTML += '                                             <td><b>' + pInvoiceHeader.Amount + '</b></td>';
                        //ReportHTML += '                                             <td>' + pInvoiceHeader.CurrencyCode + '</td>';
                        //ReportHTML += '                                         </tr>';
                        //$("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")

                        //ReportHTML += '                                         <tr>';
                        //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                        //ReportHTML += '                                             <td><b>Total Amount : ' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                        //ReportHTML += '                                         </tr>';
                        ReportHTML += '                             </tbody>';
                        ReportHTML += '                         </table>';
                        ReportHTML += '                     </div>';

                        ReportHTML += '                         <div class="row"></div>';

                        ReportHTML += '                         <div class="col-xs-8 m-t">';
                        if (pDefaults.UnEditableCompanyName == "GBL") {
                            ReportHTML += "&emsp;";
                        }
                        else if ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                            ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + '</br>';
                            ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                            ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                            ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                            ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                            ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                        }
                        else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                            ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + '</br>';
                            ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                        }
                        else
                            ReportHTML += '                             <br>';
                        ReportHTML += '                         </div>';
                        ReportHTML += '                         <div class="col-xs-4 text-right m-t-n">';
                        if (_TotalTaxOnItems != 0 || _TotalDiscountOnItems != 0) {
                            ReportHTML += '                             <b>Subtotal: </b>' + pInvoiceHeader.CurrencyCode + ' ' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                            //ReportHTML += '                             <b>VAT: </b>' + (_TotalTaxOnItems - _TotalDiscountOnItems).toFixed(2) + '</br>';
                            if (_TotalTaxOnItems != 0)
                                ReportHTML += '                             <b>VAT: </b>' + (_TotalTaxOnItems).toFixed(2) + '</br>';
                            if (_TotalDiscountOnItems != 0)
                                ReportHTML += '                             <b>WHT: </b>' + (_TotalDiscountOnItems).toFixed(2) + '</br>';
                        }
                        ReportHTML += '                             <b>Total: </b>' + pInvoiceHeader.CurrencyCode + ' <b>' + parseFloat(pInvoiceHeader.Amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></br>';
                        ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(parseFloat(pInvoiceHeader.Amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")) + ' ' + pInvoiceHeader.CurrencyCode + '</br>';
                        if ($("#cbPrintUSDTotal").prop("checked") && pInvoiceHeader.CurrencyCode.trim() == "EGP")
                            ReportHTML += '                             <b>USD Total: </b>' + ' <b>' + (pInvoiceHeader.Amount / $("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")).replace(/\B(?=(\d{3})+(?!\d))/g, ",").toFixed(2) + '</b></br>';
                        ReportHTML += '                         </div>';

                        //ReportHTML += '                     </div>'; //of table-responsive
                        //ReportHTML += '                 </section>';
                        //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                        ReportHTML += '             </div>';
                        ReportHTML += '         </body>';

                        //ReportHTML += '                 <div class="col-xs-12 m-t m-l" style="clear:both;"><b>Invoice considered paid if a stamped receipt issued</b></div>';
                        ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                        ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftPosition != 0 ? pDefaultsRow.InvoiceLeftPosition : '&emsp;') + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddlePosition != 0 ? pDefaultsRow.InvoiceMiddlePosition : '&emsp;') + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightPosition != 0 ? pDefaultsRow.InvoiceRightPosition : '&emsp;') + '</b></div>';
                        ReportHTML += '                 </div>'
                        ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                        ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftSignature != 0 ? pDefaultsRow.InvoiceLeftSignature : '&emsp;') + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddleSignature != 0 ? pDefaultsRow.InvoiceMiddleSignature : '&emsp;') + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightSignature != 0 ? pDefaultsRow.InvoiceRightSignature : '&emsp;') + '</b></div>';
                        ReportHTML += '                 </div>';
                        if ($("#cbPrintStamp").prop("checked") && pInvoiceTypeCode != "DRAFT")
                            ReportHTML += '         <div class="text-left m-l-lg"><img src="/Content/Images/CompanyStamp.jpg" alt="stamp"/></div>';
                        if (pInvoiceHeader.InvoiceTypeName != "DN" && pDefaults.UnEditableCompanyName != "GBL"
                            && pDefaults.UnEditableCompanyName != "ACS" && pDefaults.UnEditableCompanyName != "WAV"
                            && pDefaults.UnEditableCompanyName != "MEL" && pDefaults.UnEditableCompanyName != "CAP") {
                            ReportHTML += '                     <div class="col-xs-12 m-t-lg text-center"><b>' + '   لا يعتد بالفاتورة إلا بعد استلام إيصال السداد   ' + '</b></div>';
                            ReportHTML += '                     <div class="col-xs-12 text-center"><b>' + '   الشركة تخضع لنظام الدفعات المقدمة   ' + '</b></div>';
                        }

                        ReportHTML += '     <footer class="footer col-xs-12 m-t-lg" style="width:100%; position:absolute; bottom:0;">';
                        if (pDefaults.UnEditableCompanyName == "GBL") {
                            ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + '</br>';
                            ReportHTML += '                             Account Name: GB LOGISTICS S A E ' + '</br>';
                            ReportHTML += '                             Bank Name: SOCIETE ARABE INTERNATIONALE DE BANQUE' + '</br>';
                            ReportHTML += '                             Account number : 0220-3010314-10010 EGP / 0205-3010314-10010 CHF / 0203-3010314-10010 EUR' + '</br>';
                            ReportHTML += '                             Account Type : CURRENT ACCOUNT' + '</br>';
                            ReportHTML += '                             Branch Name : SHOOTING CLUB' + '</br>';
                            ReportHTML += '                             Branch Address : 50 SHOOTING CLUB ST. DOKKI GIZA, Cairo, Egypt' + '</br>';
                            //ReportHTML += '                             Country : Egypt' + '</br>';
                            //ReportHTML += '                             Town/City : Cairo' + '</br>';
                            ReportHTML += '                             Swift Code : SBNKEGCXXXX' + '</br></br>';

                            ReportHTML += '                             Bank Name: Abu Dhabi Islamic Bank-Egypt ' + '</br>';
                            ReportHTML += '                             Bank Address : 54 Lebanon str., Giza, Egypt' + '</br>';
                            ReportHTML += '                             Account number : 100000603372 USD' + '</br>';
                            ReportHTML += '                             Swift Code : ABDIEGCAXXX' + '</br>';
                            ReportHTML += '                             IBAN: EG900030552400000100000603372' + '</br>';

                            //ReportHTML += '                     <br><br><div style="font-size:12px;" class="col-xs-12 text-center"><b>' + '   برجاء عدم استقطاع او خصم أي مبالغ مالية تحت حساب الضريبة حيث أن الشركة تخضع لنظام الدفعات المقدمة عن الفترة الضريبية من 1/1/2021 حتى 31/12/2021   ' + '</b></div><br><br>';
                            //ReportHTML += '                     <div style="font-size:12px;" class="col-xs-12 m-t-lg text-center"><b>' + '   شكرا لتعاونكم   ' + '</b></div>';
                        }
                        //ReportHTML += '         <div class="row text-right m-r m-t">' + '  يتنبه نحو عدم الخصم من تحت حساب الضريبة حيث أن الشركة تتبع نظام الدفعات المقدمة تطبيقا لأحكام لمادة (62) من القانون رقم 91 لسنة 2005  ' + '</div>';
                        //ReportHTML += '         <div class="row text-right m-r">' + '  يوقف صرف شيكات مصر للتأمين لحين تسوية التعويضات  ' + '</div>';
                        //ReportHTML += '         <div class="row text-right m-r">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
                        //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
                        //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                        //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
                        if ($("#cbPrintFooterInvoice").prop("checked"))
                            ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter' + (pInvoiceHeader.InvoiceTypeName == "DN" ? "-Debit" : "") + '.jpg" alt="footer"/></div>';
                        else
                            ReportHTML += '         &emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>';
                        ReportHTML += '     </footer>';
                        ReportHTML += '</html>';
                        if (1 == ( 1)) {
                            pFinalReportHTML += ReportHTML;
                            Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                        }
                        else {
                            pFinalReportHTML += ReportHTML;
                            pFinalReportHTML += ' <div class="break"></div>';
                        }
                    }
                    else { //EOF if (pFleetOrders.length > 0) {
                        swal("Sorry", "No orders added to this invoice.");
                        FadePageCover(false);
                    }
                } //if (pInvoiceHeader.IsFleet && pDefaults.IsTaxOnItems) {
                else if (pDefaults.UnEditableCompanyName == "FFI") {
                    //SaveFile(data[1]);
                    var ReportHTML = '';
                    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                    //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div> </br>';
                    ReportHTML += '             <div class="col-xs-12 text-center m-t-n-lg"><h3>Invoice No. ' + pInvoiceDate.substr(3, 2) + '/' + pInvoiceDate.substr(8, 2) + '/' + pInvoiceHeader.ConcatenatedInvoiceNumber + '</h3></div> </br>';
                    //ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>Invoice No. ' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(3, 2) + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(8, 2) + '/' + pInvoiceHeader.ConcatenatedInvoiceNumber + '</h3></div> </br>';
                    //ReportHTML += '             <div class="col-xs-12 text-center m-t-n-lg"><h3>Invoice No. ' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(3, 2) + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(8, 2) + '/' + pInvoiceNumber + '</h3></div> </br>';

                    ReportHTML += '             <div class="col-xs-4 hide"><b>Print Date: </b>' + getTodaysDateInddMMyyyyFormat() + '</div>';
                    ReportHTML += '             <div class="col-xs-8"><b>Invoice To: </b>' + pInvoiceHeader.PartnerName + '</div>';
                    ReportHTML += '             <div class="col-xs-4"><b>Invoice Date: </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '</div>';
                    ReportHTML += '             <div class="col-xs-4"><b>Due Date: </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '</div>';
                    if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                        ReportHTML += '             <div class="col-xs-4"><b>Operation: </b>' + pMasterOperationCode + '</div>';
                    else
                        ReportHTML += '             <div class="col-xs-4"><b>Operation: </b>' + (pInvoiceHeader.OperationCode == 0 ? pInvoiceHeader.MasterOperationCode : pInvoiceHeader.OperationCode) + '</div>';
                    //ReportHTML += '             <div class="col-xs-4"><b>MBL</b>' + $("#lblMaster").text() + '</div>';
                    ReportHTML += '             <div class="col-xs-4"><b>BL: </b>' + pMasterBL + '</div>';
                    if (pHouseBLs != "0")//Master Operation so show all houses on it
                        ReportHTML += '             <div class="col-xs-4"><b>HBL</b>: ' + pHouseBLs + '</div>';
                    else
                        if (pHouseNumber != "0" && !$("#cbIsDirect").prop("checked"))
                            ReportHTML += '             <div class="col-xs-4"><b>HBL</b>: ' + (pHouseNumber == "" ? "N/A" : pHouseNumber) + '</div>';
                    ReportHTML += '             <div class="col-xs-4"><b>Payment Term: </b>' + (pInvoiceHeader.PaymentTermID == 0 ? 'N/A' : pInvoiceHeader.PaymentTermName) + '</div>';
                    //ReportHTML += '             <div class="col-xs-4"><b>Routing</b>' + $("#lblRouting").text() + '</div>';
                    ReportHTML += '             <div class="col-xs-4"><b>POL: </b>' + pPOLName + '</div>';
                    ReportHTML += '             <div class="col-xs-4"><b>POD: </b>' + pPODName + '</div>';
                    if (pContainerTypes != 0)
                        ReportHTML += '         <div class="col-xs-4"><b>Containers: </b>' + (pContainerTypes == 0 ? "N/A" : pContainerTypes) + '</div>';
                    else
                        if (pPackageTypes != 0)
                            ReportHTML += '     <div class="col-xs-4"><b>Packages: </b>' + (pPackageTypes == 0 ? "N/A" : pPackageTypes) + '</div>';
                    ReportHTML += '             <div class="col-xs-4"><b>Customer Invoice: </b>' + (pCustomerReference == 0 ? "N/A" : pCustomerReference) + '</div>';
                    if (pTruckingOrders.length > 0)
                        ReportHTML += '             <div class="col-xs-4"><b>Loading Date: </b>' + pTruckingOrders[0].StuffingDate + '</div>';
                    //ReportHTML += '             <div class="col-xs-4"><b></b>' + '' + '</div>';
                    //ReportHTML += '                 <section class="panel panel-default">';
                    //ReportHTML += '                     <div class="table-responsive">';
                    ReportHTML += '                     <div class="col-xs-12 clear">'
                    ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    ReportHTML += '                                     <th>Description</th>';
                    ReportHTML += '                                     <th>Quantity</th>';
                    ReportHTML += '                                     <th>Unit Price</th>';
                    ReportHTML += '                                     <th>Sale Price</th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    $.each(JSON.parse(data[2]), function (i, item) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (item.Notes == 0 || item.Notes == "" ? "" : '-' + item.Notes) + '</td>';
                        ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                        ReportHTML += '                                         <td>' + item.SalePrice + '</td>';
                        ReportHTML += '                                         <td>' + item.SaleAmount + '</td>';
                        ReportHTML += '                                     </tr>';
                    });
                    if (pInvoiceHeader.FixedDiscount > 0) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + 'Special Discount' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2) + '</td>';
                        ReportHTML += '                                     </tr>';
                    }
                    ReportHTML += '                                         <tr>';
                    ReportHTML += '                                             <td colspan=3>' + '<b>Sum Of ItemsCharges : ' + '</b></td>';
                    ReportHTML += '                                             <td><b>' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                    ReportHTML += '                                         </tr>';
                    if (pTaxAmount != 0) {
                        ReportHTML += '                                         <tr>';
                        ReportHTML += '                                             <td colspan=3>' + '<b>VAT (' + pTaxTypeName + ') </b></td>';
                        ReportHTML += '                                             <td><b>' + pTaxAmount + '</b></td>';
                        ReportHTML += '                                         </tr>';
                    }
                    if (pDiscountAmount != 0) {
                        ReportHTML += '                                         <tr>';
                        ReportHTML += '                                             <td colspan=3>' + '<b>Discount (' + pDiscountTypeName + ')</b></td>';
                        ReportHTML += '                                             <td><b>' + pDiscountAmount + '</b></td>';
                        ReportHTML += '                                         </tr>';
                    }
                    ReportHTML += '                                         <tr>';
                    ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    ReportHTML += '                                             <td><b>Total Amount : ' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    ReportHTML += '                                         </tr>';
                    ReportHTML += '                             </body>';
                    ReportHTML += '                     </table>';
                    ReportHTML += '                 </div>'
                    //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                    //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + ' / (' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + ')' + '</b>';
                    //ReportHTML += '                         </div>';
                    ReportHTML += '                         <div class="clear m-l col-xs-6 text-left"><b>ACCOUNTING</b></div>';
                    ReportHTML += '                         <div class="float-right text-right m-t-n col-xs-6 m-r"><b>APPROVAL</b></div>';
                    if ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                        ReportHTML += '                         <div class="row"></div>';
                        ReportHTML += '                         <div class="m-l m-t"></br></br>';
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                             <b><u>Account Name:</u></b> ' + pAccountName + '</br>';
                        ReportHTML += '                             <b><u>Bank Name:</u></b> ' + pBankName + '</br>';
                        ReportHTML += '                             <b><u>Bank Address:</u></b> ' + pBankAddress + '</br>';
                        ReportHTML += '                             <b><u>Swift Code:</u></b> ' + pSwiftCode + '</br>';
                        ReportHTML += '                             <b><u>Account Number:</u></b> ' + pAccountNumber + '</br>';
                        ReportHTML += '                         </div>';
                    }
                    else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                        ReportHTML += '                         <div class="row"></div>';
                        ReportHTML += '                         <div class="m-l m-t"></br></br>';
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                        ReportHTML += '                         </div>';
                    }
                    //ReportHTML += '                     </div>'; //of table-responsive
                    //ReportHTML += '                 </section>';
                    //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                    ReportHTML += '         </body>';
                    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                    //if ($("#cbPrintFooterInvoice").prop("checked"))
                    ReportHTML += '         <div class="row text-right m-r">' + '  الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها  ' + '</div>';
                    if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                        ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
                    else
                        if ($("#cbIsImport").prop("checked") && $("#cbIsAir").prop("checked"))
                            ReportHTML += '             <div class="row m-l">F/FFI-IA-11-04</div>';
                        else
                            if ($("#cbIsExport").prop("checked") && $("#cbIsOcean").prop("checked"))
                                ReportHTML += '         <div class="row m-l">F/FFI-ES-10-05</div>';
                            else
                                if ($("#cbIsExport").prop("checked") && $("#cbIsOcean").prop("checked"))
                                    ReportHTML += '     <div class="row m-l">F/FFI-ES-10-05</div>';
                                else
                                    if ($("#cbIsExport").prop("checked") && $("#cbIsAir").prop("checked"))
                                        ReportHTML += ' <div class="row m-l">F/FFI-EA-10-04</div>';
                    ReportHTML += '         <div class="row text-center ' + ($("#cbPrintFooterInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  "" : " hide ") + '"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                    if (1 == 1) {
                        pFinalReportHTML += ReportHTML;
                        Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                    }
                    else {
                        pFinalReportHTML += ReportHTML;
                        pFinalReportHTML += ' <div class="break"></div>';
                    }
                }
                else if (pDefaults.UnEditableCompanyName == "NSL") {

                    var ReportHTML = '';
                    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                    //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title></title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                    //ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>Invoice No. ' + pInvoiceDate.substr(3, 2) + '/' + pInvoiceDate.substr(8, 2) + '/' + pInvoiceHeader.ConcatenatedInvoiceNumber + '</h3></div>';
                    ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + pInvoiceHeader.ConcatenatedInvoiceNumber + ')' + '</h3></div>';
                    //ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>Invoice</h3></div>';

                    //ReportHTML += '             <div class="col-xs-12">';
                    ReportHTML += '                 <div class="col-xs-8">';
                    ReportHTML += '                     <b>' + $("#hDefaultCompanyName").val() + '</b><br>';
                    ReportHTML += '                     ' + (pAddressLine1 == "" ? "" : (pAddressLine1 + '<br>'));
                    ReportHTML += '                     ' + (pAddressLine2 == "" ? "" : (pAddressLine2 + '<br>'));
                    ReportHTML += '                     ' + (pAddressLine3 == "" ? "" : (pAddressLine3) + '<br>');
                    ReportHTML += '                     ' + (pPhones == "" ? "" : ('TEL:' + pPhones) + '<br>');
                    ReportHTML += '                     ' + (pFaxes == "" ? "" : ('Fax:' + pFaxes)) + '<br><br><br>';
                    ReportHTML += '                 </div>';

                    ReportHTML += '                 <div class="col-xs-4 m-l-n">';
                    ReportHTML += '                     <b>Date : </b>' + getTodaysDateInddMMyyyyFormat() + '<br>';
                    ReportHTML += '                     <b>Invoice No : </b>' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(3, 2) + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(8, 2) + '/' + /*pInvoiceNumber*/ConcatenatedInvoiceNumber + '<br>';
                    ReportHTML += '                     <b>Payment Due by : </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '<br>';
                    //ReportHTML += '                     <b>Reference No. : </b>' + (pCustomerReference == 0 ? "N/A" : pCustomerReference) + '<br>';
                    if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                        ReportHTML += '                 <b>Operation : </b>' + pMasterOperationCode;
                    else
                        ReportHTML += '                     <b>Operation : </b>' + (pInvoiceHeader.OperationCode == 0 ? pInvoiceHeader.MasterOperationCode : pInvoiceHeader.OperationCode) + '<br>';
                    ReportHTML += '                     <b>Currency : </b>' + pInvoiceHeader.CurrencyCode + '<br>';
                    ReportHTML += '                 </div>';
                    //ReportHTML += '             </div>';
                    ReportHTML += '             <table class="col-xs-8 m-l m-t-n-lg b-t b-light text-sm table-bordered" style="clear:both; width:auto; border:solid #000;">';
                    ReportHTML += '                 <td>';
                    ReportHTML += '                     <b>Bill To: </b><br>';
                    ReportHTML += '                     <b>' + pInvoiceHeader.PartnerName + '</b><br>';
                    ReportHTML += '                     ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                    ReportHTML += '                     ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2 + '<br>'));
                    ReportHTML += '                     ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                    ReportHTML += '                     ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                    ReportHTML += '                 </td>';
                    ReportHTML += '             </table>';

                    ReportHTML += '             <div style="clear:both;"><br></div>';
                    if ($("#cbPrintMBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU")
                        ReportHTML += '             <div class="col-xs-6"><b>' + (pOperationHeader.TransportType != AirTransportType ? 'MB/L:' : 'MAWB:') + ' </b>' + pMasterBL + '</div>';
                    if ($("#cbPrintHBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ) {
                        if (pHouseBLs != "0")//Master Operation so show all houses on it
                            ReportHTML += '             <div class="col-xs-6"><b>' + (pOperationHeader.TransportType != AirTransportType ? 'HBL:' : 'HAWB:') + ' </b>: ' + pHouseBLs + '</div>';
                        else if (pHouseNumber != "0")
                            ReportHTML += '             <div class="col-xs-6"><b>' + (pOperationHeader.TransportType != AirTransportType ? 'HBL:' : 'HAWB:') + ' </b> ' + (pHouseNumber == "" ? "N/A" : pHouseNumber) + '</div>';
                    }
                    ReportHTML += '             <div class="col-xs-6"><b>POL: </b>' + pPOLName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>POD: </b>' + pPODName + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Weight: </b>' + pGrossWeightSum + ' KG</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Vessel: </b>' + pVesselName + ' KG</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>CBM: </b>' + pCBM + ' CBM</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>ETA: </b>' + (pETA == "01/01/1900" || pETA == "1/1/1900" ? "N/A" : pETA) + '</div>';
                    if (pContainerTypes != 0)
                        ReportHTML += '         <div class="col-xs-6"><b>Volume: </b>' + (pContainerTypes == 0 ? "N/A" : pContainerTypes) + '</div>';
                    else if (pPackageTypes != 0)
                        ReportHTML += '         <div class="col-xs-6"><b>Volume: </b>' + (pPackageTypes == 0 ? "N/A" : pPackageTypes) + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Shipment Category: </b>' + pShipmentTypeCode + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>ETD: </b>' + (pETD == "01/01/1900" || pETD == "1/1/1900" ? "N/A" : pETD) + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Shipment Term: </b>' + pIncotermName + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Stuffing Place: </b>' + pPOLName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Shipper: </b>' + pShipperName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Consignee: </b>' + pConsigneeName + '</div>';

                    ReportHTML += '                     <div class="col-xs-12 clear">'
                    ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    ReportHTML += '                                     <th>Description</th>';
                    ReportHTML += '                                     <th>Quantity</th>';
                    ReportHTML += '                                     <th>Unit Price</th>';
                    ReportHTML += '                                     <th>Sale Price</th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    $.each(JSON.parse(data[2]), function (i, item) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) /*+ (item.Notes == 0 || item.Notes == "" ? "" : '-' + item.Notes)*/ + '</td>';
                        ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                        ReportHTML += '                                         <td>' + item.SalePrice + '</td>';
                        ReportHTML += '                                         <td>' + item.SaleAmount + '</td>';
                        ReportHTML += '                                     </tr>';
                    });
                    if (pInvoiceHeader.FixedDiscount > 0) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + 'Special Discount' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2) + '</td>';
                        ReportHTML += '                                     </tr>';
                    }
                    ReportHTML += '                                         <tr>';
                    ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    ReportHTML += '                                             <td><b>' + pInvoiceHeader.Amount + '</b></td>';
                    ReportHTML += '                                         </tr>';

                    //ReportHTML += '                                         <tr>';
                    //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                             <td><b>Total Amount : ' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                         </tr>';
                    ReportHTML += '                             </tbody>';
                    ReportHTML += '                         </table>';
                    ReportHTML += '                     </div>'
                    //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                    //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + ' / (' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + ')' + '</b>';
                    //ReportHTML += '                         </div>';
                    //ReportHTML += '                         <div class="clear m-l col-xs-6 text-left"><b>ACCOUNTING</b></div>';
                    //ReportHTML += '                         <div class="float-right text-right m-t-n col-xs-6 m-r"><b>APPROVAL</b></div>';
                    ReportHTML += '                         <div class="col-xs-6 m-t-n">';
                    if (1 == 1) { //($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                        ReportHTML += '                             <b><u>Container Numbers:</u></b></br>';
                        ReportHTML += '                             ' + pContainerNumbers + '</br><br><br><br><br>';
                    }
                    else
                        ReportHTML += '                             <br><br><br><br><br><br>';
                    ReportHTML += '                         </div>';
                    ReportHTML += '                         <div class="col-xs-6 text-right m-t-n">';
                    ReportHTML += '                             <b>Subtotal: </b>' + pInvoiceHeader.CurrencyCode + ' ' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                    //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + pInvoiceHeader.TaxPercentage + '</br>';
                    ReportHTML += '                             <b>VAT(' + pInvoiceHeader.TaxPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pTaxAmount + '</br>';
                    //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + pInvoiceHeader.DiscountPercentage + '</br>';
                    ReportHTML += '                             <b>Discount Taxes(' + pInvoiceHeader.DiscountPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pDiscountAmount + '</br>';
                    ReportHTML += '                             <b>Total: </b>' + pInvoiceHeader.CurrencyCode + ' <b>' + pInvoiceHeader.Amount + '</b></br>';
                    ReportHTML += '                         </div>';
                    //ReportHTML += '                     </div>'; //of table-responsive
                    //ReportHTML += '                 </section>';
                    //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                    ReportHTML += '         </body>';
                    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                    ReportHTML += '         <div class="row text-right m-r">' + '  الشركة خاضعة لنظام الدفعات المقدمة  ' + '</div>';
                    ReportHTML += '         <div class="row text-right m-r">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
                    //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
                    //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                    //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
                    //else
                    //    if ($("#cbIsImport").prop("checked") && $("#cbIsAir").prop("checked"))
                    //        ReportHTML += '             <div class="row m-l">F/FFI-IA-11-04</div>';
                    //    else
                    //        if ($("#cbIsExport").prop("checked") && $("#cbIsOcean").prop("checked"))
                    //            ReportHTML += '         <div class="row m-l">F/FFI-ES-10-05</div>';
                    //        else
                    //            if ($("#cbIsExport").prop("checked") && $("#cbIsOcean").prop("checked"))
                    //                ReportHTML += '     <div class="row m-l">F/FFI-ES-10-05</div>';
                    //            else
                    //                if ($("#cbIsExport").prop("checked") && $("#cbIsAir").prop("checked"))
                    //                    ReportHTML += ' <div class="row m-l">F/FFI-EA-10-04</div>';
                    ReportHTML += '         <div class="row text-center ' + ($("#cbPrintFooterInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  "" : " hide ") + '"><img src="/Content/Images/CompanyInvoiceFooter.jpg" alt="footer"/></div>';
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                    if (1 == (1 + 1)) {
                        pFinalReportHTML += ReportHTML;
                        Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                    }
                    else {
                        pFinalReportHTML += ReportHTML;
                        pFinalReportHTML += ' <div class="break"></div>';
                    }
                }
                else if (pDefaults.UnEditableCompanyName == "KML") {

                    var ReportHTML = '';
                    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                    //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                    ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + " " + (pInvoiceHeader.InvoiceNumber + "/" + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(3, 2) + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(8, 2)).replace(/\//g, "-") + '</h3></div>';

                    ReportHTML += '                 <div class="col-xs-8">';
                    ReportHTML += '                     <b>' + $("#hDefaultCompanyName").val() + '</b><br>';
                    ReportHTML += '                     ' + (pAddressLine1 == "" ? "" : (pAddressLine1 + '<br>'));
                    ReportHTML += '                     ' + (pAddressLine2 == "" ? "" : (pAddressLine2 + '<br>'));
                    ReportHTML += '                     ' + (pAddressLine3 == "" ? "" : (pAddressLine3) + '<br>');
                    ReportHTML += '                     ' + (pPhones == "" ? "" : ('TEL:' + pPhones) + '<br>');
                    ReportHTML += '                     ' + (pFaxes == "" ? "" : ('Fax:' + pFaxes)) + '<br><br><br>';
                    ReportHTML += '                 </div>';

                    ReportHTML += '                 <div class="col-xs-4 m-l-n">';
                    ReportHTML += '                     <b>' + pInvoiceHeader.InvoiceTypeName + ' Date :' + ' </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '<br>';
                    ReportHTML += '                     <b>' + pInvoiceHeader.InvoiceTypeName + ' No :' + ' </b>' + (pInvoiceHeader.InvoiceNumber + "/" + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(3, 2) + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(8, 2)).replace(/\//g, "-") + '<br>';// + '/' + /*pInvoiceNumber*/ConcatenatedInvoiceNumber.split('/')[1] + '<br>';
                    ReportHTML += '                     <b>Payment Due by : </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '<br>';
                    ReportHTML += '                     <b>Reference No. : </b>' + (pCustomerReference == 0 ? "N/A" : pCustomerReference) + '<br>';
                    if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                        ReportHTML += '                 <b>Operation : </b>' + pMasterOperationCode;
                    else
                        ReportHTML += '                     <b>Operation : </b>' + (pInvoiceHeader.OperationCode == 0 ? pInvoiceHeader.MasterOperationCode : pInvoiceHeader.OperationCode) + '<br>';
                    ReportHTML += '                     <b>Currency : </b>' + pInvoiceHeader.CurrencyCode + '<br>';
                    ReportHTML += '                     <b>Salesman : </b>' + pSalesman + '<br><br>';
                    ReportHTML += '                 </div>';
                    //ReportHTML += '             </div>';
                    ReportHTML += '             <table class="col-xs-8 m-l m-t-n-lg b-t b-light text-sm table-bordered" style="text-align:left; width:auto; border:solid #000;">';
                    ReportHTML += '                 <td>';
                    ReportHTML += '                     <b>Bill To: </b><br>';
                    ReportHTML += '                     <b>' + pInvoiceHeader.PartnerName + '</b><br>';
                    ReportHTML += '                     ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                    ReportHTML += '                     ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2 + '<br>'));
                    ReportHTML += '                     ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                    ReportHTML += '                     ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                    ReportHTML += '                 </td>';
                    ReportHTML += '             </table>';

                    ReportHTML += '             <div style="clear:both;"></div>';
                    if ($("#cbPrintMBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU")
                        ReportHTML += '             <div class="col-xs-6"><b>MB/L No.: </b>' + pMasterBL + '</div>';
                    if ($("#cbPrintHBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                        if (pHouseBLs != "0")//Master Operation so show all houses on it
                            ReportHTML += '             <div class="col-xs-6"><b>HBL</b>: ' + pHouseBLs + '</div>';
                        else if (pHouseNumber != "0")
                            ReportHTML += '             <div class="col-xs-6"><b>HB/L No.:</b> ' + (pHouseNumber == "" ? "N/A" : pHouseNumber) + '</div>';
                    }
                    ReportHTML += '             <div class="col-xs-6"><b>POL: </b>' + pPOLName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>POD: </b>' + pPODName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>CommodityName: </b>' + (pOperationHeader.CommodityName == 0 ? "" : pOperationHeader.CommodityName) + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Weight: </b>' + pGrossWeightSum + ' KG</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>CBM: </b>' + pCBM + ' CBM</div>';
                    if (pContainerTypes != 0)
                        ReportHTML += '         <div class="col-xs-6"><b>Volume: </b>' + (pContainerTypes == 0 ? "N/A" : pContainerTypes) + '</div>';
                    else if (pPackageTypes != 0)
                        ReportHTML += '         <div class="col-xs-6"><b>Volume: </b>' + (pPackageTypes == 0 ? "N/A" : pPackageTypes) + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Shipment Category: </b>' + pShipmentTypeCode + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Shipment Term: </b>' + pIncotermName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Shipper: </b>' + pShipperName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Consignee: </b>' + pConsigneeName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>PO Number: </b>' + (pOperationHeader.PONumber == 0 ? "" : pOperationHeader.PONumber) + '</div>';

                    ReportHTML += '                     <div class="col-xs-12 clear">'
                    ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    ReportHTML += '                                     <th>Description</th>';
                    ReportHTML += '                                     <th>Quantity</th>';
                    ReportHTML += '                                     <th>Unit Price</th>';
                    ReportHTML += '                                     <th>Sale Price</th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    $.each(JSON.parse(data[2]), function (i, item) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (!$("#cbAddNotesToItems").prop("checked") || item.Notes == 0 || item.Notes == "" ? "" : '-' + item.Notes) + '</td>';
                        ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                        ReportHTML += '                                         <td>' + item.SalePrice + '</td>';
                        ReportHTML += '                                         <td>' + item.SaleAmount + '</td>';
                        ReportHTML += '                                     </tr>';
                    });
                    if (pInvoiceHeader.FixedDiscount > 0) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + 'Special Discount' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2) + '</td>';
                        ReportHTML += '                                     </tr>';
                    }
                    ReportHTML += '                                         <tr>';
                    ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    ReportHTML += '                                             <td><b>' + pInvoiceHeader.Amount + '</b></td>';
                    ReportHTML += '                                         </tr>';

                    //ReportHTML += '                                         <tr>';
                    //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                             <td><b>Total Amount : ' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                         </tr>';
                    ReportHTML += '                             </tbody>';
                    ReportHTML += '                         </table>';
                    ReportHTML += '                     </div>'
                    //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                    //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + ' / (' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + ')' + '</b>';
                    //ReportHTML += '                         </div>';
                    //ReportHTML += '                         <div class="clear m-l col-xs-6 text-left"><b>ACCOUNTING</b></div>';
                    //ReportHTML += '                         <div class="float-right text-right m-t-n col-xs-6 m-r"><b>APPROVAL</b></div>';
                    if ($("#cbLargeInvoice").prop("checked")) {
                        ReportHTML += '         <div class="col-xs-12 m-t-n">Please, see attachment.</div>';
                        ReportHTML += '         <div class="break"></div>';
                    }
                    else
                        ReportHTML += '                         <div class="row m-t-n"></div>';
                    ReportHTML += '                         <div class="col-xs-8">';
                    if ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                        ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                        ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                        ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                        ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                    }
                    else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                    }
                    else
                        ReportHTML += '                             <br><br><br><br><br><br>';
                    ReportHTML += '                         </div>';
                    ReportHTML += '                         <div class="col-xs-4 text-right">';
                    ReportHTML += '                             <b>Subtotal: </b>' + pInvoiceHeader.CurrencyCode + ' ' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                    //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + pInvoiceHeader.TaxPercentage + '</br>';
                    ReportHTML += '                             <b>VAT(' + pInvoiceHeader.TaxPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pTaxAmount + '</br>';
                    //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + pInvoiceHeader.DiscountPercentage + '</br>';
                    ReportHTML += '                             <b>Discount Taxes(' + pInvoiceHeader.DiscountPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pDiscountAmount + '</br>';
                    ReportHTML += '                             <b>Total: </b>' + pInvoiceHeader.CurrencyCode + ' <b>' + pInvoiceHeader.Amount + '</b></br>';
                    ReportHTML += '                         </div>';
                    //ReportHTML += '                     </div>'; //of table-responsive
                    //ReportHTML += '                 </section>';
                    //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';

                    //ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    //ReportHTML += '                     <div class="col-xs-4 m-l-lg"><b>' + (pLeftSignature == "0" ? "&emsp;&emsp;" : pLeftSignature) + '</b></div>';
                    //ReportHTML += '                     <div class="col-xs-5"><b>' + (pMiddleSignature == "0" ? "&emsp;&emsp;" : pMiddleSignature) + '</b></div>';
                    //ReportHTML += '                     <div class="col-xs-3 m-t-n-md float-right"><b>' + (pRightSignature == "0" ? "&emsp;&emsp;" : pRightSignature) + '</b></div>';
                    //ReportHTML += '                 </div>'

                    ReportHTML += '         </body>';

                    ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftPosition != 0 ? pDefaultsRow.InvoiceLeftPosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddlePosition != 0 ? pDefaultsRow.InvoiceMiddlePosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightPosition != 0 ? pDefaultsRow.InvoiceRightPosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                 </div>'
                    ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftSignature != 0 ? pDefaultsRow.InvoiceLeftSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddleSignature != 0 ? pDefaultsRow.InvoiceMiddleSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightSignature != 0 ? pDefaultsRow.InvoiceRightSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                 </div>'
                    if ($("#cbPrintStamp").prop("checked"))
                        ReportHTML += '         <div class="text-right m-r-lg"><img src="/Content/Images/CompanyStamp.jpg" alt="stamp"/></div>';


                    ReportHTML += '         <br><br><div class="text-center small" style="clear:both;">' + 'Invoice is not considered settled without an official company’s receipt voucher.Invoice is correct & not negotiable after 15 days of issue date.' + '</div>';
                    ReportHTML += '         <div class="text-center" style="clear:both;">' + '  لا تعتبر مسددة إلا بسند قبض رسمى من الشركة، تعتبر الفاتورة صحيحة ما لا يتم الإعتراض عليها خلال 15 يوم من تاريخ الفاتورة  ' + '</div>';
                    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                    //ReportHTML += '         <div class="row">';
                    //ReportHTML += '             <div class="col-xs-8 m-l"><b><i>' + ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.DirectionType").text() == 1
                    //                                                                ? 'Import Manager'
                    //                                                                : ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.DirectionType").text() == 2 ? 'Export Manager' : 'Domestic Manager')
                    //                                                                ) + '</i></b></div>';
                    //ReportHTML += '             <div class="col-xs-4 m-t-n-md float-right"><b><i>Accountant Signature</i></b></div>';
                    //ReportHTML += '         </div>'

                    ////if KML the print on original paper
                    ReportHTML += '             <br><br><br><br><br><br>';
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                    if (1 == 1) {
                        pFinalReportHTML += ReportHTML;
                        Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                    }
                    else {
                        pFinalReportHTML += ReportHTML;
                        pFinalReportHTML += ' <div class="break"></div>';
                    }
                }
                else if (pDefaults.UnEditableCompanyName == "EEL" || pDefaults.UnEditableCompanyName == "PFS") {

                    var ReportHTML = '';
                    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                    //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                    ReportHTML += '                 <div class="col-xs-12 text-left m-t-n"><h3>' + pInvoiceHeader.ConcatenatedInvoiceNumber.split('/')[1] + ' No. ' + pInvoiceHeader.InvoiceNumber + '</h3></div>';
                    //ReportHTML += '                 <div class="col-xs-12 m-t-n-sm">VAT #: ' + pVATNumber + '</div>';
                    ReportHTML += '                 <div class="col-xs-7 m-t-xs">';
                    ReportHTML += '                     <b>' + (pInvoiceHeader.PartnerName + '</b><br>');
                    ReportHTML += '                     ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1 + '<br>'));
                    ReportHTML += '                     ' + (pClientStreetLine2 == "" ? "" : (pClientStreetLine2 + '<br>'));
                    ReportHTML += '                     ' + (pClientCityName == "" ? "" : (pClientCityName) + '<br>');
                    ReportHTML += '                     ' + (pClientCountryName == "" ? "" : pClientCountryName);// + '<br><br><br>';
                    ReportHTML += '                 </div>';
                    ReportHTML += '                 <div class="col-xs-5 m-t-xs">';
                    ReportHTML += '                     <table id="tblInvoiceData" class="table table-striped b-light text-sm table-bordered" style="border:solid #000;">';
                    ReportHTML += '                         <tbody>';
                    ReportHTML += '                             <tr class="" style="font-size:95%;">';//style="border:solid #000 !important;"
                    ReportHTML += '                                 <td style="text-align:center!Important;"><b>INVOICE DATE </b><td style="text-align:center!Important;">' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '</td>';
                    ReportHTML += '                             </tr>';
                    ReportHTML += '                             <tr class="" style="font-size:95%;">';
                    ReportHTML += '                                 <td style="text-align:center!Important;"><b>CUSTOMER REF. </b><td style="text-align:center!Important;">' + (pCustomerReference == 0 ? "N/A" : pCustomerReference) + '</td>';
                    ReportHTML += '                             </tr>';
                    ReportHTML += '                             <tr class="" style="font-size:95%;">';
                    ReportHTML += '                                 <td style="text-align:center!Important;"><b>CLIENT VAT No. </b><td style="text-align:center!Important;">' + (pClientHeader.VATNumber == 0 ? "N/A" : pClientHeader.VATNumber) + '</td>';
                    ReportHTML += '                             </tr>';
                    if (pMasterOperationCode != "" && pMasterOperationCode != "0") {
                        ReportHTML += '                             <tr class="" style="font-size:95%;">';
                        ReportHTML += '                                 <td style="text-align:center!Important;"><b>CONSOL </b><td style="text-align:center!Important;">' + pMasterOperationCode + '</td>';
                        ReportHTML += '                             </tr>';
                    }
                    else {
                        ReportHTML += '                             <tr class="" style="font-size:95%;">';
                        ReportHTML += '                                 <td style="text-align:center!Important;"><b>SHIPMENT </b><td style="text-align:center!Important;">' + (pInvoiceHeader.OperationCode == 0 ? pInvoiceHeader.MasterOperationCode : pInvoiceHeader.OperationCode) + '</td>';
                        ReportHTML += '                             </tr>';
                    }
                    ReportHTML += '                             <tr class="" style="font-size:95%;">';
                    ReportHTML += '                                 <td style="text-align:center!Important;"><b>DUE DATE </b><td style="text-align:center!Important;">' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '</td>';
                    ReportHTML += '                             </tr>';
                    ReportHTML += '                             <tr class="" style="font-size:95%;">';
                    ReportHTML += '                                 <td style="text-align:center!Important;"><b>TERMS </b><td style="text-align:center!Important;">' + pInvoiceHeader.PaymentTermID + '</td>';
                    ReportHTML += '                             </tr>';
                    ReportHTML += '                             <tr class="" style="font-size:95%;">';
                    ReportHTML += '                                 <td style="text-align:center!Important;"><b>Commercial Reg. </b><td style="text-align:center!Important;">' + (pDefaults.CommericalRegNo == 0 ? "" : pDefaults.CommericalRegNo) + '</td>';
                    ReportHTML += '                             </tr>';
                    ReportHTML += '                         </tbody>';
                    ReportHTML += '                     </table>';
                    ReportHTML += '                 </div>';

                    ReportHTML += '             <div class="col-xs-12">';
                    ReportHTML += '                 <table class="table table-striped b-light text-sm table-bordered" style="border:solid #000;">';
                    ReportHTML += '                     <tbody>';
                    ReportHTML += '                         <tr class="" style="font-size:95%;">';
                    ReportHTML += '                             <td><div class="col-xs-6 m-l-n" style="text-align:left!Important;"><b>SHIPMENT DETAILS</b></div><div class="col-xs-6 m-l" style="text-align:right!Important;"><b>PRINTED BY : ' + $("#hLoggedUserNameNotLogin").val() + '</b></div></td>';
                    ReportHTML += '                         </tr>';
                    ReportHTML += '                     </tbody>';
                    ReportHTML += '                 </table>';
                    ReportHTML += '             </div>'

                    ReportHTML += '                 <div class="col-xs-12 m-t-n">';
                    ReportHTML += '                     <table id="tblInvoice" class="table table-striped b-light text-sm table-bordered" style="border:solid #000;">';
                    ReportHTML += '                         <tbody>';
                    ReportHTML += '                             <tr class="" style="font-size:95%;">';
                    ReportHTML += '                                 <td colspan=6 style="text-align:left!Important;"><b>SHIPPER:</b><br>' + pShipperName + '</td><td colspan=6 style="text-align:left!Important;"><b>CONSIGNEE:</b><br>' + pConsigneeName + '</td>';
                    ReportHTML += '                             </tr>';
                    ReportHTML += '                             <tr class="" style="font-size:95%;">';
                    ReportHTML += '                                 <td colspan=12 style="text-align:left!Important;"><b>GOODS DESCRIPTION:</b><br>' + pDescriptionOfGoods + '</td>';
                    ReportHTML += '                             </tr>';
                    ReportHTML += '                             <tr class="" style="font-size:95%;">';
                    //ReportHTML += '                                 <td colspan=4 style="text-align:left!Important;"><b>CUSTOMS AGENT:</b><br>' + '' + '</td>';
                    ReportHTML += '                                 <td colspan=3 style="text-align:left!Important;"><b>WEIGHT:</b><br>' + pGrossWeightSum.toFixed(2) + ' KG</td>';
                    ReportHTML += '                                 <td colspan=3 style="text-align:left!Important;"><b>VOLUME:</b><br>' + pCBM.toFixed(2) + 'CBM</td>';
                    //ReportHTML += '                                 <td colspan=3 style="text-align:left!Important;"><b>CHARGEABLE:</b><br>' + '' + '</td>';
                    ReportHTML += '                                 <td colspan=3 style="text-align:left!Important;"><b>VGM:</b><br>' + pVGM.toFixed(2) + ' KGM</td>';
                    ReportHTML += '                                 <td colspan=3 style="text-align:left!Important;"><b>PACKAGES:</b><br>' + pNumberOfPackages + '</td>';
                    ReportHTML += '                             </tr>';
                    ReportHTML += '                             <tr class="" style="font-size:95%;">';
                    ReportHTML += '                                 <td colspan=6 style="text-align:left!Important;"><b>VESSEL / VOY:</b><br>' + pVesselName + '/' + pVesselName + '</td>';
                    ReportHTML += '                                 <td colspan=3 style="text-align:left!Important;"><b>OCEAN B\L:</b><br>' + pMasterBL + '</td>';
                    ReportHTML += '                                 <td colspan=3 style="text-align:left!Important;"><b>HOUSE B\L:</b><br>' + (pOperationHeader.HouseBLs == 0 ? (pOperationHeader.HouseNumber == 0 ? "" : pOperationHeader.HouseNumber) : pOperationHeader.HouseBLs) + '</td>';
                    ReportHTML += '                             </tr>';
                    ReportHTML += '                             <tr class="" style="font-size:95%;">';
                    ReportHTML += '                                 <td colspan=3 style="text-align:left!Important;"><b>ORIGIN:</b><br>' + pPOLName + '</td>';
                    ReportHTML += '                                 <td colspan=3 style="text-align:left!Important;"><b>ETD:</b><br>' + (pETD == "01/01/1900" || pETD == "1/1/1900" ? "N/A" : pETD) + '</td>';
                    ReportHTML += '                                 <td colspan=3 style="text-align:left!Important;"><b>DESTINATION:</b><br>' + pPODName + '</td>';
                    ReportHTML += '                                 <td colspan=3 style="text-align:left!Important;"><b>ETA:</b><br>' + (pETAPOD == "01/01/1900" || pETAPOD == "1/1/1900" ? "N/A" : pETAPOD) + '</td>';
                    ReportHTML += '                             </tr>';
                    ReportHTML += '                         </tbody>';
                    ReportHTML += '                     </table>';
                    ReportHTML += '                 </div>';

                    ReportHTML += '                     <div class="col-xs-12 m-t-n">'
                    ReportHTML += '                         <table id="tblReportInvoice" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr style="font-size:95%;">';
                    ReportHTML += '                                     <th>CHARGES DESCRIPTION</th>';
                    ReportHTML += '                                     <th>VAT</th>';
                    ReportHTML += '                                     <th>AMOUNT</th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    $.each(JSON.parse(data[2]), function (i, item) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                        ReportHTML += '                                         <td>' + 'N/A' + '</td>';
                        ReportHTML += '                                         <td>' + item.SaleAmount + '</td>';
                        ReportHTML += '                                     </tr>';
                    });
                    if (pInvoiceHeader.FixedDiscount > 0) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + 'Special Discount' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2) + '</td>';
                        ReportHTML += '                                     </tr>';
                    }
                    ReportHTML += '                             </tbody>';
                    ReportHTML += '                         </table>';
                    ReportHTML += '                     </div>'
                    //Adding totals table
                    ReportHTML += '                 <div class="col-xs-12 m-t-n">';
                    ReportHTML += '                     <table id="tblChargesSummary" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                         <tbody>';
                    ReportHTML += '                             <tr class="" style="font-size:95%;">';//style="border:solid #000 !important;"
                    ReportHTML += '                                 <td  rowspan=4>' + 'Please contact us within 7 days should there be any discrepancies.' + '</td>';
                    ReportHTML += '                                 <td ><b>Subtotal : </b>' + pInvoiceHeader.CurrencyCode + ' ' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    ReportHTML += '                             </tr>';
                    ReportHTML += '                             <tr class="" style="font-size:95%;">';
                    ReportHTML += '                                 <td ><b>VAT(' + pInvoiceHeader.TaxPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pTaxAmount + '</td>';
                    ReportHTML += '                             </tr>';
                    ReportHTML += '                             <tr class="" style="font-size:95%;">';
                    ReportHTML += '                                 <td ><b>Discount Taxes(' + pInvoiceHeader.DiscountPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pDiscountAmount + '</td>';
                    ReportHTML += '                             </tr>';
                    ReportHTML += '                             <tr class="" style="font-size:95%;">';
                    ReportHTML += '                                 <td ><b>Total: </b>' + pInvoiceHeader.CurrencyCode + ' <b>' + pInvoiceHeader.Amount + '</b></td>';
                    ReportHTML += '                             </tr>';
                    ReportHTML += '                         </tbody>';
                    ReportHTML += '                     </table>';
                    ReportHTML += '                 </div>';

                    //ReportHTML += '                     </div>'; //of table-responsive
                    //ReportHTML += '                 </section>';
                    //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                    ReportHTML += '         </body>';

                    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                    ReportHTML += '         <hr>';
                    ReportHTML += '         <table id="tblInvoiceSummary" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">';
                    ReportHTML += '             <tbody>';
                    ReportHTML += '                 <tr class="" style="font-size:95%;">';//style="border:solid #000 !important;"
                    ReportHTML += '                     <td colspan=6 style="text-align:left;"><b>' + 'Transfer Funds To: ' + $("#hDefaultCompanyName").val() + '</b></td>';
                    ReportHTML += '                     <td colspan=6 rowspan=6 style="text-align:left;"><b>Mail Payments To: </b><br>';
                    //ReportHTML += '                         THE EGYPTIAN EXPORT & IMPORT CO<br>';
                    //ReportHTML += '                         SEKO GLOBAL LOGISTICS, EGYPT<br>';
                    ReportHTML += '                         ' + $("#hDefaultCompanyName").val() + '<br>';
                    ReportHTML += '                         ' + (pAddressLine1 == "" ? "" : (pAddressLine1 + '<br>'));
                    ReportHTML += '                         ' + (pAddressLine2 == "" ? "" : (pAddressLine2 + '<br>'));
                    ReportHTML += '                         ' + (pAddressLine3 == "" ? "" : (pAddressLine3) + '<br>');
                    ReportHTML += '                         ' + (pPhones == "" ? "" : ('TEL:' + pPhones) + '<br>');
                    ReportHTML += '                     </td>';
                    ReportHTML += '                 </tr>';
                    ReportHTML += '                 <tr class="" style="font-size:95%;">';
                    ReportHTML += '                     <td colspan=1 style="text-align:left;"><b>' + 'Bank:</b></td>';
                    ReportHTML += '                     <td colspan=2 style="text-align:left;">' + pBankName + '</td>';
                    ReportHTML += '                     <td colspan=1 style="text-align:left;"><b>' + 'SWIFT:</b></td>';
                    ReportHTML += '                     <td colspan=2 style="text-align:left;">' + pSwiftCode + '</td>';
                    ReportHTML += '                 </tr>';
                    ReportHTML += '                 <tr class="" style="font-size:95%;">';
                    ReportHTML += '                     <td colspan=1 style="text-align:left;"><b>' + 'Account:</b></td>';
                    ReportHTML += '                     <td colspan=5 style="text-align:left;">' + pAccountNumber + '</td>';
                    ReportHTML += '                 </tr>';
                    ReportHTML += '                 <tr class="" style="font-size:95%;">';
                    ReportHTML += '                     <td colspan=6 style="text-align:left;">' + pBankName + '<br>';
                    ReportHTML += '                     ' + pBankAddress;
                    ReportHTML += '                     </td>';
                    ReportHTML += '                 </tr>';
                    ReportHTML += '                 <tr class="" style="font-size:95%;">';
                    ReportHTML += '                     <td colspan=1 style="text-align:left;"><b>' + 'Pay Ref:</b></td>';
                    ReportHTML += '                     <td colspan=5 style="text-align:left;">' + (pCustomerReference == 0 ? "" : pCustomerReference) + '</td>';
                    ReportHTML += '                 </tr>';
                    ReportHTML += '                 <tr class="" style="font-size:95%;">';
                    ReportHTML += '                     <td colspan=1 style="text-align:left;"><b>' + 'Amt Due:</b></td>';
                    ReportHTML += '                     <td colspan=2 style="text-align:left;">' + pInvoiceHeader.CurrencyCode + ' <b>' + pInvoiceHeader.Amount + '</td>';
                    ReportHTML += '                     <td colspan=1 style="text-align:left;"><b>' + 'Invoiced:</b></td>';
                    ReportHTML += '                     <td colspan=2 style="text-align:left;">' + pInvoiceHeader.CurrencyCode + ' <b>' + pInvoiceHeader.Amount + '</td>';
                    ReportHTML += '                 </tr>';
                    ReportHTML += '             </tbody>';
                    ReportHTML += '         </table>';
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                    if (1 == 1) {
                        pFinalReportHTML += ReportHTML;
                        Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                    }
                    else {
                        pFinalReportHTML += ReportHTML;
                        pFinalReportHTML += ' <div class="break"></div>';
                    }
                } //else if (pDefaults.UnEditableCompanyName == "EEL" || pDefaults.UnEditableCompanyName == "PFS") {
                else if (pDefaults.UnEditableCompanyName == "OAO") { //OAO
                    if (pInvoiceHeader.InvoiceTypeName == "STATEMENT") {

                        var ReportHTML = '';
                        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                        //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                        ReportHTML += '<html>';
                        ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                        ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.ConcatenatedInvoiceNumber + '</h3></div>';
                        ReportHTML += '                 <div class="col-xs-8">';
                        ReportHTML += '                     <table class="col-xs-12 b-t b-light text-sm table-bordered" style="text-align:left; width:auto; border:solid #000;">';
                        ReportHTML += '                         <td>';
                        ReportHTML += '                             <b>Bill To: </b><br>';
                        ReportHTML += '                             <b>' + pInvoiceHeader.PartnerName + '</b><br>';
                        ReportHTML += '                             ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                        ReportHTML += '                             ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2 + '<br>'));
                        ReportHTML += '                             ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                        ReportHTML += '                             ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                        ReportHTML += '                         </td>';
                        ReportHTML += '                     </table>';

                        ReportHTML += '                 </div>';

                        ReportHTML += '                 <div class="col-xs-4 m-l-n">';
                        //ReportHTML += '                     <b>Date : </b>' + getTodaysDateInddMMyyyyFormat() + '<br>';
                        ReportHTML += '                     <b>Date : </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '<br>';
                        //if (pInvoiceHeader.InvoiceTypeName == "STATEMENT")
                        //ReportHTML += '                     <b>Invoice No : </b>' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(3, 2) + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(8, 2) + '/' + /*pInvoiceNumber*/ConcatenatedInvoiceNumber + '<br>';
                        ReportHTML += '                     <b>' + pInvoiceHeader.ConcatenatedInvoiceNumber.split('/')[1] + ' No : </b>' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + '<br>';
                        ReportHTML += '                     <b>Payment Due by : </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '<br>';
                        ReportHTML += '                     <b>Reference No. : </b>' + (pCustomerReference == 0 ? "N/A" : pCustomerReference) + '<br>';
                        if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                            ReportHTML += '                 <b>Operation : </b>' + pMasterOperationCode;
                        else
                            ReportHTML += '                     <b>Operation : </b>' + (pInvoiceHeader.OperationCode == 0 ? pInvoiceHeader.MasterOperationCode : pInvoiceHeader.OperationCode) + '<br>';
                        ReportHTML += '                     <b>Currency : </b>' + pInvoiceHeader.CurrencyCode + '<br>';
                        ReportHTML += '                     <b>Salesman : </b>' + pSalesman + '<br><br>';
                        ReportHTML += '                 </div>';
                        //ReportHTML += '             </div>';

                        ReportHTML += '             <div style="clear:both;"><br></div>';
                        if ($("#cbPrintMBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU")
                            ReportHTML += '             <div class="col-xs-6"><b>MB/L No.: </b>' + pMasterBL + '</div>';
                        if ($("#cbPrintHBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ) {
                            if (pHouseBLs != "0")//Master Operation so show all houses on it
                                ReportHTML += '             <div class="col-xs-6"><b>HBL</b>: ' + pHouseBLs + '</div>';
                            else if (pHouseNumber != "0")
                                ReportHTML += '             <div class="col-xs-6"><b>HB/L No.:</b> ' + (pHouseNumber == "" ? "N/A" : pHouseNumber) + '</div>';
                        }
                        ReportHTML += '             <div class="col-xs-6"><b>POL: </b>' + pPOLName + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>POD: </b>' + pPODName + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Weight: </b>' + pGrossWeightSum + ' KG</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>CBM: </b>' + pCBM + ' CBM</div>';
                        if (pContainerTypes != 0)
                            ReportHTML += '         <div class="col-xs-6"><b>Volume: </b>' + (pContainerTypes == 0 ? "N/A" : pContainerTypes) + '</div>';
                        else if (pPackageTypes != 0)
                            ReportHTML += '         <div class="col-xs-6"><b>Volume: </b>' + (pPackageTypes == 0 ? "N/A" : pPackageTypes) + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Shipment Category: </b>' + pShipmentTypeCode + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Shipment Term: </b>' + pIncotermName + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Shipper: </b>' + pShipperName + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Consignee: </b>' + pConsigneeName + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Certificate No: </b>' + (pOperationHeader.CertificateNumber == 0 ? "" : pOperationHeader.CertificateNumber) + '</div>';

                        ReportHTML += '                     <div class="col-xs-12 clear">'
                        ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                        ReportHTML += '                             <thead>';
                        ReportHTML += '                                 <tr>';
                        ReportHTML += '                                     <th>Description</th>';
                        ReportHTML += '                                     <th>Quantity</th>';
                        ReportHTML += '                                     <th>Unit Price</th>';
                        ReportHTML += '                                     <th>Sale Price</th>';
                        ReportHTML += '                                     <th>Notes</th>';
                        ReportHTML += '                                 </tr>';
                        ReportHTML += '                             </thead>';
                        ReportHTML += '                             <tbody>';
                        $.each(JSON.parse(data[2]), function (i, item) {
                            ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                            ReportHTML += '                                         <td>' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) /*+ (item.Notes == 0 || item.Notes == "" ? "" : '-' + item.Notes)*/ + '</td>';
                            ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                            ReportHTML += '                                         <td>' + item.SalePrice + '</td>';
                            ReportHTML += '                                         <td>' + item.SaleAmount + '</td>';
                            ReportHTML += '                                         <td>' + (item.Notes == "0" ? "" : item.Notes) + '</td>';
                            ReportHTML += '                                     </tr>';
                        });
                        if (pInvoiceHeader.FixedDiscount > 0) {
                            ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                            ReportHTML += '                                         <td>' + 'Special Discount' + '</td>';
                            ReportHTML += '                                         <td>' + '' + '</td>';
                            ReportHTML += '                                         <td>' + '' + '</td>';
                            ReportHTML += '                                         <td>' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2) + '</td>';
                            ReportHTML += '                                         <td>' + '' + '</td>';
                            ReportHTML += '                                     </tr>';
                        }
                        //ReportHTML += '                                         <tr>';
                        //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                        //ReportHTML += '                                             <td><b>' + pInvoiceHeader.Amount + '</b></td>';
                        //ReportHTML += '                                             <td>' + '' + '</td>';
                        //ReportHTML += '                                         </tr>';

                        //ReportHTML += '                                         <tr>';
                        //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                        //ReportHTML += '                                             <td><b>Total Amount : ' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                        //ReportHTML += '                                         </tr>';
                        ReportHTML += '                             </tbody>';
                        ReportHTML += '                         </table>';
                        ReportHTML += '                     </div>'
                        //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                        //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + ' / (' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + ')' + '</b>';
                        //ReportHTML += '                         </div>';
                        //ReportHTML += '                         <div class="clear m-l col-xs-6 text-left"><b>ACCOUNTING</b></div>';
                        //ReportHTML += '                         <div class="float-right text-right m-t-n col-xs-6 m-r"><b>APPROVAL</b></div>';
                        if ($("#cbLargeInvoice").prop("checked")) {
                            ReportHTML += '         <div class="col-xs-12 m-t-n">Please, see attachment.</div>';
                            ReportHTML += '         <div class="break"></div>';
                        }
                        else
                            ReportHTML += '                         <div class="row m-t-n"></div>';
                        ReportHTML += '                         <div class="col-xs-7">';
                        if ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                            ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                            ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                            ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                            ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                            ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                            ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                        }
                        else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                            ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                            ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                        }
                        else
                            ReportHTML += '                             <br><br><br><br><br><br>';
                        ReportHTML += '                         </div>';
                        ReportHTML += '                         <div class="col-xs-5 text-right">';
                        if (pTaxAmount != 0 || pDiscountAmount != 0)
                            ReportHTML += '                             <b>Subtotal: </b>' + pInvoiceHeader.CurrencyCode + ' ' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                        //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + pInvoiceHeader.TaxPercentage + '</br>';
                        if (pTaxAmount != 0)
                            ReportHTML += '                             <b>VAT(' + pInvoiceHeader.TaxPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pTaxAmount + '</br>';
                        //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + pInvoiceHeader.DiscountPercentage + '</br>';
                        if (pDiscountAmount != 0)
                            ReportHTML += '                             <b>Discount Taxes(' + pInvoiceHeader.DiscountPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pDiscountAmount + '</br>';
                        ReportHTML += '                             <b>Total: </b>' + pInvoiceHeader.CurrencyCode + ' <b>' + pInvoiceHeader.Amount + '</b></br>';
                        ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</br>';
                        ReportHTML += '                         </div>';

                        //ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                        //ReportHTML += '                     <div class="col-xs-3 m-t"><b>' + 'Approved By' + '</b></div>';
                        //ReportHTML += '                     <div class="col-xs-2 m-t text-center"><b>' + '&emsp;' + '</b></div>';
                        //ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + '&emsp;' + '</b></div>';
                        //ReportHTML += '                     <div class="col-xs-3 m-t text-center"><b>' + 'Prepared By' + '</b></div>';
                        //ReportHTML += '                 </div>'
                        //ReportHTML += '                 <div class="m-t" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                        //ReportHTML += '                     <div class="col-xs-3 m-t-sm"><b>' + '....................................' + '</b></div>';
                        //ReportHTML += '                     <div class="col-xs-2 m-t-sm text-center"><b>' + '&emsp;' + '</b></div>';
                        //ReportHTML += '                     <div class="col-xs-4 m-t-sm text-center"><b>' + '&emsp;' + '</b></div>';
                        //ReportHTML += '                     <div class="col-xs-3 m-t-sm text-center">' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                        //ReportHTML += '                 </div>'

                        //ReportHTML += '                     </div>'; //of table-responsive
                        //ReportHTML += '                 </section>';
                        //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                        ReportHTML += '         </body>';
                        ReportHTML += '     <footer class="footer col-xs-12 m-t-lg ' + ($("#cbPrintFooterInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  "" : " hide ") + '" style="width:100%; position:absolute; bottom:0;">';
                        //ReportHTML += '         <div class="row text-right m-r m-t-sm">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
                        ReportHTML += '         <div class="row text-center m-t-n"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                        ReportHTML += '     </footer>';

                        ReportHTML += '</html>';
                        if (1==1) {
                            pFinalReportHTML += ReportHTML;
                            Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                        }
                        else {
                            pFinalReportHTML += ReportHTML;
                            pFinalReportHTML += ' <div class="break"></div>';
                        }
                    }
                    else { //Invoices not Statement

                        var ReportHTML = '';
                        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                        //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                        ReportHTML += '<html>';
                        ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                        ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.ConcatenatedInvoiceNumber + '</h3></div>';
                        ReportHTML += '                 <div class="col-xs-8">';
                        ReportHTML += '                     <b>' + $("#hDefaultCompanyName").val() + '</b><br>';
                        ReportHTML += '                     ' + (pAddressLine1 == "" ? "" : (pAddressLine1 + '<br>'));
                        ReportHTML += '                     ' + (pAddressLine2 == "" ? "" : (pAddressLine2 + '<br>'));
                        ReportHTML += '                     ' + (pAddressLine3 == "" ? "" : (pAddressLine3) + '<br>');
                        ReportHTML += '                     ' + (pPhones == "" ? "" : ('TEL:' + pPhones) + '<br>');
                        ReportHTML += '                     ' + (pFaxes == "" ? "" : ('Fax:' + pFaxes)) + '<br><br><br>';
                        ReportHTML += '                 </div>';

                        ReportHTML += '                 <div class="col-xs-4 m-l-n">';
                        //ReportHTML += '                     <b>Date : </b>' + getTodaysDateInddMMyyyyFormat() + '<br>';
                        ReportHTML += '                     <b>Date : </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '<br>';
                        //if (pInvoiceHeader.InvoiceTypeName == "STATEMENT")
                        //ReportHTML += '                     <b>Invoice No : </b>' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(3, 2) + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(8, 2) + '/' + /*pInvoiceNumber*/ConcatenatedInvoiceNumber + '<br>';
                        ReportHTML += '                     <b>' + pInvoiceHeader.ConcatenatedInvoiceNumber.split('/')[1] + ' No : </b>' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + '<br>';
                        ReportHTML += '                     <b>Payment Due by : </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '<br>';
                        ReportHTML += '                     <b>Reference No. : </b>' + (pCustomerReference == 0 ? "N/A" : pCustomerReference) + '<br>';
                        if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                            ReportHTML += '                 <b>Operation : </b>' + pMasterOperationCode;
                        else
                            ReportHTML += '                     <b>Operation : </b>' + (pInvoiceHeader.OperationCode == 0 ? pInvoiceHeader.MasterOperationCode : pInvoiceHeader.OperationCode) + '<br>';
                        ReportHTML += '                     <b>Currency : </b>' + pInvoiceHeader.CurrencyCode + '<br>';
                        ReportHTML += '                     <b>Salesman : </b>' + pSalesman + '<br><br>';
                        ReportHTML += '                 </div>';
                        //ReportHTML += '             </div>';
                        ReportHTML += '             <table class="col-xs-8 m-l m-t-n-lg b-t b-light text-sm table-bordered" style="text-align:left; width:auto; border:solid #000;">';
                        ReportHTML += '                 <td>';
                        ReportHTML += '                     <b>Bill To: </b><br>';
                        ReportHTML += '                     <b>' + pInvoiceHeader.PartnerName + '</b><br>';
                        ReportHTML += '                     ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                        ReportHTML += '                     ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2 + '<br>'));
                        ReportHTML += '                     ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                        ReportHTML += '                     ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                        ReportHTML += '                 </td>';
                        ReportHTML += '             </table>';

                        ReportHTML += '             <div style="clear:both;"><br></div>';
                        if ($("#cbPrintMBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU")
                            ReportHTML += '             <div class="col-xs-6"><b>MB/L No.: </b>' + pMasterBL + '</div>';
                        if ($("#cbPrintHBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ) {
                            if (pHouseBLs != "0")//Master Operation so show all houses on it
                                ReportHTML += '             <div class="col-xs-6"><b>HBL</b>: ' + pHouseBLs + '</div>';
                            else if (pHouseNumber != "0")
                                ReportHTML += '             <div class="col-xs-6"><b>HB/L No.:</b> ' + (pHouseNumber == "" ? "N/A" : pHouseNumber) + '</div>';
                        }
                        ReportHTML += '             <div class="col-xs-6"><b>POL: </b>' + pPOLName + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>POD: </b>' + pPODName + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Weight: </b>' + pGrossWeightSum + ' KG</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>CBM: </b>' + pCBM + ' CBM</div>';
                        if (pContainerTypes != 0)
                            ReportHTML += '         <div class="col-xs-6"><b>Volume: </b>' + (pContainerTypes == 0 ? "N/A" : pContainerTypes) + '</div>';
                        else if (pPackageTypes != 0)
                            ReportHTML += '         <div class="col-xs-6"><b>Volume: </b>' + (pPackageTypes == 0 ? "N/A" : pPackageTypes) + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Shipment Category: </b>' + pShipmentTypeCode + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Shipment Term: </b>' + pIncotermName + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Shipper: </b>' + pShipperName + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Consignee: </b>' + pConsigneeName + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Certificate No: </b>' + (pOperationHeader.CertificateNumber == 0 ? "" : pOperationHeader.CertificateNumber) + '</div>';

                        ReportHTML += '                     <div class="col-xs-12 clear">'
                        ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                        ReportHTML += '                             <thead>';
                        ReportHTML += '                                 <tr>';
                        ReportHTML += '                                     <th>Description</th>';
                        ReportHTML += '                                     <th>Quantity</th>';
                        ReportHTML += '                                     <th>Unit Price</th>';
                        ReportHTML += '                                     <th>Sale Price</th>';
                        ReportHTML += '                                     <th>Notes</th>';
                        ReportHTML += '                                 </tr>';
                        ReportHTML += '                             </thead>';
                        ReportHTML += '                             <tbody>';
                        $.each(JSON.parse(data[2]), function (i, item) {
                            ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                            ReportHTML += '                                         <td>' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) /*+ (item.Notes == 0 || item.Notes == "" ? "" : '-' + item.Notes)*/ + '</td>';
                            ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                            ReportHTML += '                                         <td>' + item.SalePrice + '</td>';
                            ReportHTML += '                                         <td>' + item.SaleAmount + '</td>';
                            ReportHTML += '                                         <td>' + (item.Notes == "0" ? "" : item.Notes) + '</td>';
                            ReportHTML += '                                     </tr>';
                        });
                        if (pInvoiceHeader.FixedDiscount > 0) {
                            ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                            ReportHTML += '                                         <td>' + 'Special Discount' + '</td>';
                            ReportHTML += '                                         <td>' + '' + '</td>';
                            ReportHTML += '                                         <td>' + '' + '</td>';
                            ReportHTML += '                                         <td>' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2) + '</td>';
                            ReportHTML += '                                         <td>' + '' + '</td>';
                            ReportHTML += '                                     </tr>';
                        }
                        //ReportHTML += '                                         <tr>';
                        //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                        //ReportHTML += '                                             <td><b>' + pInvoiceHeader.Amount + '</b></td>';
                        //ReportHTML += '                                             <td>' + '' + '</td>';
                        //ReportHTML += '                                         </tr>';

                        //ReportHTML += '                                         <tr>';
                        //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                        //ReportHTML += '                                             <td><b>Total Amount : ' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                        //ReportHTML += '                                         </tr>';
                        ReportHTML += '                             </tbody>';
                        ReportHTML += '                         </table>';
                        ReportHTML += '                     </div>'
                        //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                        //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + ' / (' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + ')' + '</b>';
                        //ReportHTML += '                         </div>';
                        //ReportHTML += '                         <div class="clear m-l col-xs-6 text-left"><b>ACCOUNTING</b></div>';
                        //ReportHTML += '                         <div class="float-right text-right m-t-n col-xs-6 m-r"><b>APPROVAL</b></div>';
                        if ($("#cbLargeInvoice").prop("checked")) {
                            ReportHTML += '         <div class="col-xs-12 m-t-n">Please, see attachment.</div>';
                            ReportHTML += '         <div class="break"></div>';
                        }
                        else
                            ReportHTML += '                         <div class="row m-t-n"></div>';
                        ReportHTML += '                         <div class="col-xs-7">';
                        if ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                            ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                            ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                            ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                            ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                            ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                            ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                        }
                        else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                            ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                            ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                        }
                        else
                            ReportHTML += '                             <br><br><br><br><br><br>';
                        ReportHTML += '                         </div>';
                        ReportHTML += '                         <div class="col-xs-5 text-right">';
                        if (pTaxAmount != 0 || pDiscountAmount != 0)
                            ReportHTML += '                             <b>Subtotal: </b>' + pInvoiceHeader.CurrencyCode + ' ' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                        //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + pInvoiceHeader.TaxPercentage + '</br>';
                        if (pTaxAmount != 0)
                            ReportHTML += '                             <b>VAT(' + pInvoiceHeader.TaxPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pTaxAmount + '</br>';
                        //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + pInvoiceHeader.DiscountPercentage + '</br>';
                        if (pDiscountAmount != 0)
                            ReportHTML += '                             <b>Discount Taxes(' + pInvoiceHeader.DiscountPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pDiscountAmount + '</br>';
                        ReportHTML += '                             <b>Total: </b>' + pInvoiceHeader.CurrencyCode + ' <b>' + pInvoiceHeader.Amount + '</b></br>';
                        ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</br>';
                        ReportHTML += '                         </div>';

                        ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                        ReportHTML += '                     <div class="col-xs-3 m-t"><b>' + 'Approved By' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-2 m-t text-center"><b>' + '&emsp;' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + '&emsp;' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-3 m-t text-center"><b>' + 'Prepared By' + '</b></div>';
                        ReportHTML += '                 </div>'
                        ReportHTML += '                 <div class="m-t" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                        ReportHTML += '                     <div class="col-xs-3 m-t-sm"><b>' + '....................................' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-2 m-t-sm text-center"><b>' + '&emsp;' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-4 m-t-sm text-center"><b>' + '&emsp;' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-3 m-t-sm text-center">' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                        ReportHTML += '                 </div>'

                        //ReportHTML += '                     </div>'; //of table-responsive
                        //ReportHTML += '                 </section>';
                        //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                        ReportHTML += '         </body>';
                        ReportHTML += '     <footer class="footer col-xs-12 m-t-lg ' + ($("#cbPrintFooterInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  "" : " hide ") + '" style="width:100%; position:absolute; bottom:0;">';
                        //ReportHTML += '         <div class="row text-right m-r m-t-sm">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
                        ReportHTML += '         <div class="row text-center m-t-n"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                        ReportHTML += '     </footer>';

                        ReportHTML += '</html>';
                        if (1==1) {
                            pFinalReportHTML += ReportHTML;
                            Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                        }
                        else {
                            pFinalReportHTML += ReportHTML;
                            pFinalReportHTML += ' <div class="break"></div>';
                        }
                    }//EOF Invoices not statement
                } //EOF OAO
                else if (pDefaults.UnEditableCompanyName == "BAL" || pDefaults.UnEditableCompanyName == "BHE" || pDefaults.UnEditableCompanyName == "BME") { //BAL, BME

                    var ReportHTML = '';
                    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                    //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    if (!$("#cbPrintHeaderInvoice").prop("checked"))
                        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader-Empty.jpg" alt="logo"/></div>';
                    else if (pDefaults.UnEditableCompanyName == "BME" || pDefaults.UnEditableCompanyName == "BHE") {
                        if (pInvoiceHeader.InvoiceTypeName == "STATEMENT") //header w/o TaxNo
                            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                        else
                            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeaderInvoiceTax.jpg" alt="logo"/></div>';
                    }
                    else if (pDefaults.UnEditableCompanyName == "BAL" && pInvoiceHeader.ConcatenatedInvoiceNumber.split('/')[1] == "STATEMENT") //header w/o TaxNo
                        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader-WithoutTax.jpg" alt="logo"/></div>';
                    else
                        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                    //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.ConcatenatedInvoiceNumber + '</h3></div>';
                    ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.ConcatenatedInvoiceNumber.split('/')[1] + '</h3></div>';

                    ReportHTML += '                 <div class="col-xs-8">';
                    ReportHTML += '                     <table class="b-t b-light text-sm table-bordered" style="text-align:left; width:auto; border:solid #000;">';
                    ReportHTML += '                         <td>';
                    ReportHTML += '                             <b>Bill To: </b><br>';
                    ReportHTML += '                             <b>' + pInvoiceHeader.PartnerName + '</b><br>';
                    ReportHTML += '                             ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                    ReportHTML += '                             ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2 + '<br>'));
                    ReportHTML += '                             ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                    ReportHTML += '                             ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                    ReportHTML += '                         </td>';
                    ReportHTML += '                     </table>';
                    ReportHTML += '                 </div>';

                    ReportHTML += '                 <div class="col-xs-4 m-l-n">';
                    //ReportHTML += '                     <b>Date : </b>' + getTodaysDateInddMMyyyyFormat() + '<br>';
                    ReportHTML += '                     <b>Invoice Date : </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '<br>';
                    //ReportHTML += '                     <b>Invoice No : </b>' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(3, 2) + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(8, 2) + '/' + /*pInvoiceNumber*/ConcatenatedInvoiceNumber + '<br>';
                    ReportHTML += '                     <b>Invoice No : </b>' + pInvoiceTypeCode + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + '<br>';
                    // ReportHTML += '                     <b>Payment Due by : </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '<br>';
                    // ReportHTML += '                     <b>Reference No. : </b>' + (pCustomerReference == 0 ? "N/A" : pCustomerReference) + '<br>';
                    ReportHTML += '                     <b>Currency : </b>' + pInvoiceHeader.CurrencyCode + '<br>';
                    ReportHTML += '                     <b>Operation No : </b>' + (pInvoiceHeader.OperationCode == 0 ? pInvoiceHeader.MasterOperationCode : pInvoiceHeader.OperationCode).split('-')[3] + '/20' + (pInvoiceHeader.OperationCode == 0 ? pInvoiceHeader.MasterOperationCode : pInvoiceHeader.OperationCode).substr(1, 2) + '<br>';
                    //ReportHTML += '                     <b>Tax ID: </b>' + pDefaults.TaxNumber + '<br>';
                    //ReportHTML += '                     <b>Commercial Register: </b>' + pDefaults.CommericalRegNo + '<br>';
                    ReportHTML += '                 </div>';
                    //ReportHTML += '             </div>';

                    ReportHTML += '             <div style="clear:both;"><br></div>';
                    if ($("#cbPrintMBL").prop("checked") || ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU"))
                        ReportHTML += '             <div class="col-xs-6"><b>MB/L No.: </b>' + pMasterBL + '</div>';
                    if ($("#cbPrintHBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ) {
                        if (pHouseBLs != "0")//Master Operation so show all houses on it
                            ReportHTML += '             <div class="col-xs-6"><b>HBL</b>: ' + pHouseBLs + '</div>';
                        else //if (pHouseNumber != "0" && !$("#cbIsDirect").prop("checked"))
                            ReportHTML += '             <div class="col-xs-6"><b>HB/L No.:</b> ' + (pHouseNumber == "" ? "N/A" : pHouseNumber) + '</div>';
                    }
                    ReportHTML += '             <div class="col-xs-6"><b>POL: </b>' + pPOLName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>POD: </b>' + pPODName + '</div>';
                    if (pDefaults.UnEditableCompanyName != "BME") {
                        ReportHTML += '             <div class="col-xs-6"><b>Weight: </b>' + pGrossWeightSum + ' KG</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>CBM: </b>' + pCBM + ' CBM</div>';
                    }
                    if (pDefaults.UnEditableCompanyName == "BME") {
                        if (pOperationHeader.TransportType == OceanTransportType)
                            ReportHTML += '             <div class="col-xs-6"><b>Vessel-Voy: </b>' + (pOperationHeader.VesselName == 0 ? "" : pOperationHeader.VesselName) + (pOperationHeader.VoyageOrTruckNumber == 0 ? "" : (" - " + pOperationHeader.VoyageOrTruckNumber)) + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Customer Ref: </b>' + (pOperationHeader.CustomerReference == 0 ? "" : pOperationHeader.CustomerReference) + '</div>';
                    }
                    if (pContainerTypes != 0)
                        ReportHTML += '         <div class="col-xs-6"><b>Volume: </b>' + (pContainerTypes == 0 ? "N/A" : pContainerTypes) + '</div>';
                    else if (pPackageTypes != 0)
                        ReportHTML += '         <div class="col-xs-6"><b>Volume: </b>' + (pPackageTypes == 0 ? "N/A" : pPackageTypes) + '</div>';
                    if (pDefaults.UnEditableCompanyName != "BME") {
                        ReportHTML += '             <div class="col-xs-6"><b>Shipment Category: </b>' + pShipmentTypeCode + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Shipment Term: </b>' + pIncotermName + '</div>';
                    }
                    ReportHTML += '             <div class="col-xs-6"><b>Shipper: </b>' + pShipperName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Consignee: </b>' + pConsigneeName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Containers: </b>' + pContainerNumbers + '</div>';
                    ReportHTML += '                     <div class="col-xs-12 clear">'
                    ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    ReportHTML += '                                     <th>Description</th>';
                    ReportHTML += '                                     <th>Quantity</th>';
                    ReportHTML += '                                     <th>Unit Price</th>';
                    ReportHTML += '                                     <th>Sale Price</th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    $.each(JSON.parse(data[2]), function (i, item) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) /*+ (item.Notes == 0 || item.Notes == "" ? "" : '-' + item.Notes)*/ + '</td>';
                        ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                        ReportHTML += '                                         <td>' + item.SalePrice + '</td>';
                        ReportHTML += '                                         <td>' + item.SaleAmount + '</td>';
                        ReportHTML += '                                     </tr>';
                    });
                    if (pInvoiceHeader.FixedDiscount > 0) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + 'Special Discount' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2) + '</td>';
                        ReportHTML += '                                     </tr>';
                    }
                    ReportHTML += '                                         <tr>';
                    ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    ReportHTML += '                                             <td><b>' + pInvoiceHeader.Amount + '</b></td>';
                    ReportHTML += '                                         </tr>';

                    //ReportHTML += '                                         <tr>';
                    //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                             <td><b>Total Amount : ' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                         </tr>';
                    ReportHTML += '                             </tbody>';
                    ReportHTML += '                         </table>';
                    ReportHTML += '                     </div>'
                    //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                    //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + ' / (' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + ')' + '</b>';
                    //ReportHTML += '                         </div>';
                    //ReportHTML += '                         <div class="clear m-l col-xs-6 text-left"><b>ACCOUNTING</b></div>';
                    //ReportHTML += '                         <div class="float-right text-right m-t-n col-xs-6 m-r"><b>APPROVAL</b></div>';
                    if ($("#cbLargeInvoice").prop("checked")) {
                        ReportHTML += '         <div class="col-xs-12 m-t-n">Please, see attachment.</div>';
                        ReportHTML += '         <div class="break"></div>';
                    }
                    else
                        ReportHTML += '                         <div class="col-xs-12 m-t-n"></div>';
                    ReportHTML += '                         <div class="col-xs-8">';
                    if ($("#cbPrintBankDetailsFromDefaults").prop("checked") && pDefaults.UnEditableCompanyName != "BHE") {
                        //ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                             <b><u>Bank Name:</u></b> ' + 'Commercial International Bank (CIB)' + '</br>';
                        ReportHTML += '                             <b>Bank Code/Branch:</b> ' + '003 / Sultan Hussein Branch' + '</br>';
                        ReportHTML += '                             <b>Beneficiary Name:</b> ' + 'Blue Anchor Logistic for Shipping & Transport' + '</br>';
                        ReportHTML += '                             <b>Bank Address:</b> ' + '100, El-Horeya RD, Bab Shark, Alexandria, Egypt' + '</br>';
                        ReportHTML += '                             <b>Swift Code:</b> ' + 'CIBEEGCXXXX' + '</br>';
                        ReportHTML += '                             <b>Account Number:</b> ' + '(EGP)100036808254-(USD)100036808181-(EUR)100036808227' + '</br>';
                        ReportHTML += '                             <br>';
                        ReportHTML += '                             <b><u>Bank Name:</u></b> ' + 'QNB AL AHLI' + '</br>';
                        ReportHTML += '                             <b>Bank Code/Branch:</b> ' + 'Sultan Hussein Branch' + '</br>';
                        ReportHTML += '                             <b>Beneficiary Name:</b> ' + 'Blue Anchor Logistic for Shipping & Transport' + '</br>';
                        ReportHTML += '                             <b>Bank Address:</b> ' + 'Sultan Hussein Street, Alexandria, Egypt' + '</br>';
                        ReportHTML += '                             <b>Swift Code:</b> ' + 'QNBAEGCXXXX' + '</br>';
                        ReportHTML += '                             <b>Account Number:</b> ' + '(EGP/USD/EUR)1001399309' + '</br>';
                    }
                    else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                    }
                    else
                        ReportHTML += '                             <br><br><br><br><br><br>';
                    ReportHTML += '                         </div>';
                    ReportHTML += '                         <div class="col-xs-4 text-right">';
                    ReportHTML += '                             <b>Subtotal: </b>' + pInvoiceHeader.CurrencyCode + ' ' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                    //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + pInvoiceHeader.TaxPercentage + '</br>';
                    ReportHTML += '                             <b>VAT(' + pInvoiceHeader.TaxPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pTaxAmount + '</br>';
                    //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + pInvoiceHeader.DiscountPercentage + '</br>';
                    ReportHTML += '                             <b>Discount Taxes(' + pInvoiceHeader.DiscountPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pDiscountAmount + '</br>';
                    ReportHTML += '                             <b>Total: </b>' + pInvoiceHeader.CurrencyCode + ' <b>' + pInvoiceHeader.Amount + '</b></br>';
                    ReportHTML += '                         </div>';
                    //ReportHTML += '                     </div>'; //of table-responsive
                    //ReportHTML += '                 </section>';
                    //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                    ReportHTML += '         </body>';

                    ReportHTML += '     <footer class="footer col-xs-12 m-t-lg ' + ($("#cbPrintFooterInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  "" : " hide ") + '" style="width:100%; position:absolute; bottom:0;">';
                    //ReportHTML += '         <div class="row text-right m-r m-t-sm">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
                    if (pDefaults.UnEditableCompanyName == "BME")
                        ReportHTML += '         <div class="row text-center m-t-n"><img src="/Content/Images/CompanyFooterInvoice.jpg" alt="footer"/></div>';
                    else
                        ReportHTML += '         <div class="row text-center m-t-n"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                    if (1==1) {
                        pFinalReportHTML += ReportHTML;
                        Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                    }
                    else {
                        pFinalReportHTML += ReportHTML;
                        pFinalReportHTML += ' <div class="break"></div>';
                    }
                } //EOF BAL. BME
                else if (pDefaults.UnEditableCompanyName == "KDS") {
                    if (pInvoiceHeader.ConcatenatedInvoiceNumber.split('/')[1].split(' ')[0].toUpperCase()
                        == "DISBURSEMENT") {

                        var ReportHTML = '';
                        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                        //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                        ReportHTML += '<html>';
                        ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                        //ReportHTML += '         <body style="background-color:white;">';
                        ReportHTML += '         <body style="background-color:white; font-size:160%;">';
                        ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                        //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + pInvoiceHeader.ConcatenatedInvoiceNumber + ')' + '</h3></div>';
                        ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.ConcatenatedInvoiceNumber.split('/')[1].split(' ')[0] + ' ACCOUNT' + '</h3></div>';
                        //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + ' No. </b>' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + '</h3></div>';
                        ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + ' No. </b>' + (pOperationHeader.CustomerReference == 0 ? "" : pOperationHeader.CustomerReference) + '</h3></div>';
                        ReportHTML += '                 <div class="col-xs-12"><b>Owner/Charter: </b>' + pInvoiceHeader.PartnerName + '</div>';
                        //ReportHTML += '                 <div class="col-xs-8">';
                        //ReportHTML += '                     <table class="col-xs-12 b-t b-light text-sm table-bordered" style="text-align:left; width:auto; border:solid #000;">';
                        //ReportHTML += '                         <td>';
                        //ReportHTML += '                             <b>Bill To: </b><br>';
                        //ReportHTML += '                             <b>' + pInvoiceHeader.PartnerName + '</b><br>';
                        //ReportHTML += '                             ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                        //ReportHTML += '                             ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2 + '<br>'));
                        //ReportHTML += '                             ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                        //ReportHTML += '                             ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                        //ReportHTML += '                         </td>';
                        //ReportHTML += '                     </table>';
                        //ReportHTML += '                 </div>';

                        ReportHTML += '                     <div class="col-xs-12 clear">';
                        ReportHTML += '                         <table id="tblReportInvoiceHeader" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                        //ReportHTML += '                             <thead>';
                        //ReportHTML += '                                 <tr>';
                        //ReportHTML += '                                     <th>No.</th>';
                        //ReportHTML += '                                     <th>Description</th>';
                        //ReportHTML += '                                     <th>Amount</th>';
                        //ReportHTML += '                                 </tr>';
                        //ReportHTML += '                             </thead>';
                        ReportHTML += '                             <tbody>';
                        //ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                     <tr class="input-md" style="font-size:110%;">';
                        ReportHTML += '                                         <td style="text-align:left;">' + '<b>Port: </b>' + (pOperationHeader.DirectionType == constImportDirectionType ? pPOLName : pPODName) + '</td>';
                        ReportHTML += '                                         <td style="text-align:left;">' + '<b>Sailing Date: </b>' + (pETD == "01/01/1900" || pETD == "1/1/1900" ? "N/A" : pETD) + '</td>';
                        ReportHTML += '                                         <td style="text-align:left;">' + '<b>GRT: </b>' + (pGRT == 0 ? "N/A" : pGRT) + '</td>';
                        ReportHTML += '                                     </tr>';
                        //ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                     <tr class="input-md" style="font-size:110%;">';
                        //ReportHTML += '                                         <td style="text-align:left;">' + '<b>Operation: </b>' + (pInvoiceHeader.OperationCode == 0 ? pInvoiceHeader.MasterOperationCode : pInvoiceHeader.OperationCode) + '</td>';
                        ReportHTML += '                                         <td style="text-align:left;">' + '<b>Date: </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '</td>';
                        ReportHTML += '                                         <td style="text-align:left;">' + '<b>Commodity: </b>' + pOperationHeader.CommodityName + '</td>';
                        ReportHTML += '                                         <td style="text-align:left;">' + '<b>DWT: </b>' + (pDWT == 0 ? "N/A" : pDWT) + '</td>';
                        ReportHTML += '                                     </tr>';
                        //ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                     <tr class="input-md" style="font-size:110%;">';
                        //ReportHTML += '                                         <td style="text-align:left;">' + '<b>Arrival Date: </b>' + (pETA == "01/01/1900" || pETA == "1/1/1900" ? "N/A" : pETA) + '</td>';
                        ReportHTML += '                                         <td style="text-align:left;">' + '<b>Arrival Date: </b>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.ActualArrival)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.ActualArrival))) + '</td>';
                        ReportHTML += '                                         <td style="text-align:left;">' + '<b>Vessel: </b>' + pVesselName + '</td>';
                        ReportHTML += '                                         <td style="text-align:left;">' + '<b>NRT: </b>' + (pNRT == 0 ? "N/A" : pNRT) + '</td>';
                        ReportHTML += '                                     </tr>';
                        //ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                     <tr class="input-md" style="font-size:110%;">';
                        //ReportHTML += '                                         <td style="text-align:left;">' + '<b>Arrival Date: </b>' + (pETA == "01/01/1900" || pETA == "1/1/1900" ? "N/A" : pETA) + '</td>';
                        //ReportHTML += '                                         <td style="text-align:left;">' + '<b>&emsp; </b>' + '</td>';
                        ReportHTML += '                                         <td style="text-align:left;">' + '<b>Currency: </b>' + pInvoiceHeader.CurrencyCode + '</td>';
                        ReportHTML += '                                         <td style="text-align:left;">' + '<b>Voyage: </b>' + (pOperationHeader.VoyageOrTruckNumber == 0 ? "" : pOperationHeader.VoyageOrTruckNumber) + '</td>';
                        ReportHTML += '                                         <td style="text-align:left;">' + '<b>LOA: </b>' + (pLOA == 0 ? "N/A" : pLOA) + '</td>';
                        ReportHTML += '                                     </tr>';

                        ReportHTML += '                             </tbody>';
                        ReportHTML += '                         </table>';
                        ReportHTML += '                     </div>'

                        ReportHTML += '                     <div class="col-xs-12 clear">';
                        ReportHTML += '                         <table id="tblReportInvoice" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                        ReportHTML += '                             <thead>';
                        ReportHTML += '                                 <tr>';
                        ReportHTML += '                                     <th style="width:5%;">No.</th>';
                        ReportHTML += '                                     <th>Description</th>';
                        ReportHTML += '                                     <th>Amount</th>';
                        ReportHTML += '                                 </tr>';
                        ReportHTML += '                             </thead>';
                        ReportHTML += '                             <tbody>';
                        $.each(JSON.parse(data[2]), function (i, item) {
                            //ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                            ReportHTML += '                                     <tr class="input-md" style="font-size:110%;">';
                            ReportHTML += '                                         <td>' + ++i + '</td>';
                            ReportHTML += '                                         <td style="text-align:left;">' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                            ReportHTML += '                                         <td style="text-align:right;">' + item.SaleAmount.toFixed(2) + '</td>';
                            ReportHTML += '                                     </tr>';
                        });
                        if (pInvoiceHeader.FixedDiscount > 0) {
                            ReportHTML += '                                     <tr class="input-md" style="font-size:110%;">';
                            ReportHTML += '                                         <td>' + '' + '</td>';
                            ReportHTML += '                                         <td style="text-align:left;">' + 'Special Discount' + '</td>';
                            ReportHTML += '                                         <td style="text-align:right;">' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2) + '</td>';
                            ReportHTML += '                                     </tr>';
                        }
                        ReportHTML += '                                         <tr>';
                        ReportHTML += '                                             <td style="text-align:left;" colspan=2>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                        ReportHTML += '                                             <td style="text-align:right;"><b>' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                        ReportHTML += '                                         </tr>';
                        if (pTaxAmount != 0) {
                            ReportHTML += '                                         <tr>';
                            ReportHTML += '                                             <td style="text-align:left;" colspan=2>' + '<b>VAT (' + pTaxTypeName + ') </b></td>';
                            ReportHTML += '                                             <td style="text-align:right;"><b>' + pTaxAmount.toFixed(2) + '</b></td>';
                            ReportHTML += '                                         </tr>';
                        }
                        if (pDiscountAmount != 0) {
                            ReportHTML += '                                         <tr>';
                            ReportHTML += '                                             <td style="text-align:left;" colspan=2>' + '<b>Discount (' + pDiscountTypeName + ')</b></td>';
                            ReportHTML += '                                             <td style="text-align:right;"><b>' + pDiscountAmount.toFixed(2) + '</b></td>';
                            ReportHTML += '                                         </tr>';
                        }
                        if (pTaxAmount != 0 || pDiscountAmount != 0) {
                            ReportHTML += '                                         <tr>';
                            ReportHTML += '                                             <td style="text-align:left;" colspan=2>' + '<b>TOTAL AMOUNT WITH VAT AND DISC : ' + toWords_WithFractionNumbers(parseFloat(pInvoiceHeader.Amount).toFixed(2)) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                            ReportHTML += '                                             <td style="text-align:right;"><b>' + parseFloat(pInvoiceHeader.Amount).toFixed(2) + '</b></td>';
                            ReportHTML += '                                         </tr>';
                        }
                        //ReportHTML += '                                         <tr>';
                        //ReportHTML += '                                             <td colspan=2>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                        //ReportHTML += '                                             <td><b>Total Amount : ' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                        //ReportHTML += '                                         </tr>';
                        ReportHTML += '                             </tbody>';
                        ReportHTML += '                         </table>';
                        ReportHTML += '                     </div>'
                        //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                        //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + ' / (' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + ')' + '</b>';
                        //ReportHTML += '                         </div>';
                        //ReportHTML += '                         <div class="clear m-l col-xs-6 text-left"><b>ACCOUNTING</b></div>';
                        //ReportHTML += '                         <div class="float-right text-right m-t-n col-xs-6 m-r"><b>APPROVAL</b></div>';
                        //ReportHTML += '                         <div class="row"></div>';
                        if ($("#cbLargeInvoice").prop("checked")) {
                            ReportHTML += '         <div class="col-xs-12 m-t-n">Please, see attachment.</div>';
                            ReportHTML += '         <div class="break"></div>';
                        }
                        else
                            ReportHTML += '                         <div class="row m-t-n"></div>';
                        ReportHTML += '                         <div class="col-xs-12 m-t-n">';
                        if ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                            ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                            ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                            ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                            ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                            ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                            ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                        }
                        else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                            ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                            ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                        }
                        //else
                        //    ReportHTML += '                             <br><br><br><br><br><br>';
                        ReportHTML += '                         </div>';
                        //ReportHTML += '                         <div class="col-xs-4 text-right m-t-n">';
                        //ReportHTML += '                             <b>Subtotal: </b>' + pInvoiceHeader.CurrencyCode + ' ' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                        ////ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + pInvoiceHeader.TaxPercentage + '</br>';
                        //ReportHTML += '                             <b>VAT(' + pInvoiceHeader.TaxPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pTaxAmount + '</br>';
                        ////ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + pInvoiceHeader.DiscountPercentage + '</br>';
                        //ReportHTML += '                             <b>Discount Taxes(' + pInvoiceHeader.DiscountPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pDiscountAmount + '</br>';
                        //ReportHTML += '                             <b>Total: </b>' + pInvoiceHeader.CurrencyCode + ' <b>' + pInvoiceHeader.Amount + '</b></br>';
                        //ReportHTML += '                         </div>';
                        //ReportHTML += '                     </div>'; //of table-responsive
                        //ReportHTML += '                 </section>';
                        //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                        ReportHTML += '         </body>';

                        //ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                        //ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftPosition != 0 ? pDefaultsRow.InvoiceLeftPosition : '&emsp;') + '</b></div>';
                        //ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddlePosition != 0 ? pDefaultsRow.InvoiceMiddlePosition : '&emsp;') + '</b></div>';
                        //ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightPosition != 0 ? pDefaultsRow.InvoiceRightPosition : '&emsp;') + '</b></div>';
                        //ReportHTML += '                 </div>'
                        ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                        ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftSignature != 0 ? pDefaultsRow.InvoiceLeftSignature : '&emsp;') + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddleSignature != 0 ? pDefaultsRow.InvoiceMiddleSignature : '&emsp;') + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightSignature != 0 ? pDefaultsRow.InvoiceRightSignature : '&emsp;') + '</b></div>';
                        ReportHTML += '                 </div>'
                        if ($("#cbPrintStamp").prop("checked"))
                            ReportHTML += '         <div class="text-right m-r-lg"><img src="/Content/Images/CompanyStamp.jpg" alt="stamp"/></div>';

                        ReportHTML += '     <footer class="footer col-xs-12 m-t-lg ' + ($("#cbPrintFooterInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  "" : " hide ") + '" style="width:100%; position:absolute; bottom:0;">';
                        //ReportHTML += '         <div class="row text-center ' + ($("#cbPrintFooterInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  "" : " hide ") + '"><img src="/Content/Images/CompanyFooter.jpg" alt="logo"/></div>';
                        /****if KDS the use CompanyFooter-KDS-InvoiceTaxNumbers.jpg***/
                        //ReportHTML += '         <div class="row text-right m-r">' + '  يتنبه نحو عدم الخصم من تحت حساب الضريبة حيث أن الشركة تتبع نظام الدفعات المقدمة تطبيقا لأحكام لمادة (62) من القانون رقم 91 لسنة 2005  ' + '</div>';
                        //ReportHTML += '         <div class="row text-right m-r">' + '  يوقف صرف شيكات مصر للتأمين لحين تسوية التعويضات  ' + '</div>';
                        //ReportHTML += '         <div class="row text-right m-r">' + '  لاتعتبر الفاتورة مسددة إلا بموجب إيصال سداد معتمد من الشركة بتمام قيمة الفاتورة  ' + '</div>';
                        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter' + (pDefaults.UnEditableCompanyName == "KDS" ? '-KDS-InvoiceTaxNumbers' : "") + '.jpg"' + ' alt="logo"/></div>';
                        ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="logo"/></div>';
                        //else if (pDefaults.UnEditableCompanyName == "KML") //if KML the print on original paper
                        //    ReportHTML += '             <br><br><br><br><br>';
                        ReportHTML += '     </footer>';

                        ReportHTML += '</html>';
                        if (1==1) {
                            pFinalReportHTML += ReportHTML;
                            Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                        }
                        else {
                            pFinalReportHTML += ReportHTML;
                            pFinalReportHTML += ' <div class="break"></div>';
                        }
                    }
                    else if (pInvoiceHeader.ConcatenatedInvoiceNumber.split('/')[1].split(' ')[0].toUpperCase()
                        == "SERVICES") {

                        var ReportHTML = '';
                        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                        //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                        ReportHTML += '<html>';
                        ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                        //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + pInvoiceHeader.ConcatenatedInvoiceNumber + ')' + '</h3></div>';
                        ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.ConcatenatedInvoiceNumber.split('/')[1] + ' No. </b>' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + '</h3></div>';
                        //ReportHTML += '                 <div class="col-xs-8">';
                        //ReportHTML += '                     <table class="col-xs-12 b-t b-light text-sm table-bordered" style="text-align:left; width:auto; border:solid #000;">';
                        //ReportHTML += '                         <td>';
                        //ReportHTML += '                             <b>Bill To: </b><br>';
                        //ReportHTML += '                             <b>' + pInvoiceHeader.PartnerName + '</b><br>';
                        //ReportHTML += '                             ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                        //ReportHTML += '                             ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2 + '<br>'));
                        //ReportHTML += '                             ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                        //ReportHTML += '                             ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                        //ReportHTML += '                         </td>';
                        //ReportHTML += '                     </table>';

                        //ReportHTML += '                 </div>';


                        //ReportHTML += '             <div style="clear:both;"><br></div>';
                        ReportHTML += '                 <div class="col-xs-8"><b>Client: </b>' + pInvoiceHeader.PartnerName + '</div>';
                        ReportHTML += '                 <div class="col-xs-4 text-right"><b>Date: </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '</div>';
                        ReportHTML += '                     <div class="col-xs-12 clear">';
                        ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                        ReportHTML += '                             <thead>';
                        ReportHTML += '                                 <tr>';
                        //ReportHTML += '                                     <th>No.</th>';
                        ReportHTML += '                                     <th>Description</th>';
                        ReportHTML += '                                     <th>Amount</th>';
                        ReportHTML += '                                 </tr>';
                        ReportHTML += '                             </thead>';
                        ReportHTML += '                             <tbody>';
                        $.each(JSON.parse(data[2]), function (i, item) {
                            if (pInvoiceHeader.ConcatenatedInvoiceNumber.split('/')[1].split(' ')[0].toUpperCase() == "G.CARGO"
                                || pInvoiceHeader.ConcatenatedInvoiceNumber.split('/')[1].split(' ')[0].toUpperCase() == "CONTAINER")
                                ReportHTML += '                                     <tr class="input-md font-bold" style="">';
                            else
                                ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                            //ReportHTML += '                                         <td>' + ++i + '</td>';
                            ReportHTML += '                                         <td>' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                            ReportHTML += '                                         <td>' + item.SaleAmount.toFixed(2) + '</td>';
                            ReportHTML += '                                     </tr>';
                        });
                        if (pInvoiceHeader.FixedDiscount > 0) {
                            ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                            ReportHTML += '                                         <td>' + 'Special Discount' + '</td>';
                            ReportHTML += '                                         <td>' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2) + '</td>';
                            ReportHTML += '                                     </tr>';
                        }
                        ReportHTML += '                                         <tr>';
                        ReportHTML += '                                             <td colspan=1>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                        ReportHTML += '                                             <td><b>' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                        ReportHTML += '                                         </tr>';
                        if (pTaxAmount != 0) {
                            ReportHTML += '                                         <tr>';
                            ReportHTML += '                                             <td colspan=1>' + '<b>VAT (' + pTaxTypeName + ') </b></td>';
                            ReportHTML += '                                             <td><b>' + pTaxAmount.toFixed(2) + '</b></td>';
                            ReportHTML += '                                         </tr>';
                        }
                        if (pDiscountAmount != 0) {
                            ReportHTML += '                                         <tr>';
                            ReportHTML += '                                             <td colspan=1>' + '<b>Discount (' + pDiscountTypeName + ')</b></td>';
                            ReportHTML += '                                             <td><b>' + pDiscountAmount.toFixed(2) + '</b></td>';
                            ReportHTML += '                                         </tr>';
                        }
                        if (pTaxAmount != 0 || pDiscountAmount != 0) {
                            ReportHTML += '                                         <tr>';
                            ReportHTML += '                                             <td colspan=1>' + '<b>TOTAL AMOUNT WITH VAT AND DISC : ' + toWords_WithFractionNumbers(parseFloat(pInvoiceHeader.Amount).toFixed(2)) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                            ReportHTML += '                                             <td><b>' + parseFloat(pInvoiceHeader.Amount).toFixed(2) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                            ReportHTML += '                                         </tr>';
                        }
                        //ReportHTML += '                                         <tr>';
                        //ReportHTML += '                                             <td colspan=2>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                        //ReportHTML += '                                             <td><b>Total Amount : ' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                        //ReportHTML += '                                         </tr>';
                        ReportHTML += '                             </tbody>';
                        ReportHTML += '                         </table>';
                        ReportHTML += '                     </div>'
                        //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                        //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + ' / (' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + ')' + '</b>';
                        //ReportHTML += '                         </div>';
                        //ReportHTML += '                         <div class="clear m-l col-xs-6 text-left"><b>ACCOUNTING</b></div>';
                        //ReportHTML += '                         <div class="float-right text-right m-t-n col-xs-6 m-r"><b>APPROVAL</b></div>';
                        //ReportHTML += '                         <div class="row"></div>';
                        if ($("#cbLargeInvoice").prop("checked")) {
                            ReportHTML += '         <div class="col-xs-12 m-t-n">Please, see attachment.</div>';
                            ReportHTML += '         <div class="break"></div>';
                        }
                        else
                            ReportHTML += '                         <div class="col-xs-12 m-t-n"></div>';
                        ReportHTML += '                         <div class="col-xs-12 m-t-n">';
                        if ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                            ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                            ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                            ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                            ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                            ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                            ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                        }
                        else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                            ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                            ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                        }
                        //else
                        //    ReportHTML += '                             <br><br><br><br><br><br>';
                        ReportHTML += '                         </div>';
                        //ReportHTML += '                         <div class="col-xs-4 text-right m-t-n">';
                        //ReportHTML += '                             <b>Subtotal: </b>' + pInvoiceHeader.CurrencyCode + ' ' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                        ////ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + pInvoiceHeader.TaxPercentage + '</br>';
                        //ReportHTML += '                             <b>VAT(' + pInvoiceHeader.TaxPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pTaxAmount + '</br>';
                        ////ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + pInvoiceHeader.DiscountPercentage + '</br>';
                        //ReportHTML += '                             <b>Discount Taxes(' + pInvoiceHeader.DiscountPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pDiscountAmount + '</br>';
                        //ReportHTML += '                             <b>Total: </b>' + pInvoiceHeader.CurrencyCode + ' <b>' + pInvoiceHeader.Amount + '</b></br>';
                        //ReportHTML += '                         </div>';
                        //ReportHTML += '                     </div>'; //of table-responsive
                        //ReportHTML += '                 </section>';
                        //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                        ReportHTML += '         </body>';

                        //ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                        //ReportHTML += '                     <div class="col-xs-9 m-t"><b>' + 'Reviewed By' + '</b></div>';
                        //ReportHTML += '                     <div class="col-xs-3 m-t text-center"><b>' + 'Preparation' + '</b></div>';
                        //ReportHTML += '                 </div>'
                        //ReportHTML += '                 <div class="m-t" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                        //ReportHTML += '                     <div class="col-xs-9 m-t-sm"><b>' + '..........................' + '</b></div>';
                        //ReportHTML += '                     <div class="col-xs-3 m-t-sm text-center">' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                        //ReportHTML += '                 </div>'
                        ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                        ReportHTML += '                     <div class="col-xs-9 m-t"><b>' + 'Reviewed By' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-3 m-t text-center"><b>' + 'Preparation' + '</b></div>';
                        ReportHTML += '                 </div>'
                        ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                        ReportHTML += '                     <div class="col-xs-9"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftSignature != 0 ? pDefaultsRow.InvoiceLeftSignature : '&emsp;') + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-3 text-center">' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                        ReportHTML += '                 </div>'
                        if ($("#cbPrintStamp").prop("checked"))
                            ReportHTML += '         <div class="text-right m-r-lg"><img src="/Content/Images/CompanyStamp.jpg" alt="stamp"/></div>';

                        ReportHTML += '     <footer class="footer col-xs-12 m-t-lg ' + ($("#cbPrintFooterInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  "" : " hide ") + '" style="width:100%; position:absolute; bottom:0;">';
                        //ReportHTML += '         <div class="row">'
                        //ReportHTML += '             <div class="col-xs-8 m-l"><b><i>' + ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.DirectionType").text() == 1
                        //                                                                ? 'Import Manager'
                        //                                                                : ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.DirectionType").text() == 2 ? 'Export Manager' : 'Domestic Manager')
                        //                                                                ) + '</i></b></div>';
                        //ReportHTML += '             <div class="col-xs-4 m-t-n-md float-right"><b><i>Accountant Signature</i></b></div>';
                        //ReportHTML += '         </div>'
                        //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
                        //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                        //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
                        //else
                        //    if ($("#cbIsImport").prop("checked") && $("#cbIsAir").prop("checked"))
                        //        ReportHTML += '             <div class="row m-l">F/FFI-IA-11-04</div>';
                        //ReportHTML += '         <div class="row text-center ' + ($("#cbPrintFooterInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  "" : " hide ") + '"><img src="/Content/Images/CompanyFooter.jpg" alt="logo"/></div>';
                        /****if KDS the use CompanyFooter-KDS-InvoiceTaxNumbers.jpg***/
                        //ReportHTML += '         <div class="row text-right m-r">' + '  الشركة تخضع لنظام الدفعات المقدمة  ' + '</div>';
                        ReportHTML += '         <div class="row text-right m-r">' + '  يتنبه نحو عدم الخصم من تحت حساب الضريبة حيث أن الشركة تتبع نظام الدفعات المقدمة تطبيقا لأحكام لمادة (62) من القانون رقم 91 لسنة 2005  ' + '</div>';
                        //ReportHTML += '         <div class="row text-right m-r">' + '  يوقف صرف شيكات مصر للتأمين لحين تسوية التعويضات  ' + '</div>';
                        ReportHTML += '         <div class="row text-right m-r">' + '  لاتعتبر الفاتورة مسددة إلا بموجب إيصال سداد معتمد من الشركة بتمام قيمة الفاتورة  ' + '</div>';
                        ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter' + (pDefaults.UnEditableCompanyName == "KDS" ? '-KDS-InvoiceTaxNumbers' : "") + '.jpg"' + ' alt="logo"/></div>';
                        ReportHTML += '     </footer>';
                        ReportHTML += '</html>';
                        if (1==1) {
                            pFinalReportHTML += ReportHTML;
                            Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                        }
                        else {
                            pFinalReportHTML += ReportHTML;
                            pFinalReportHTML += ' <div class="break"></div>';
                        }
                    } //EOF Services invoice
                    else { //other invoice types not Disbursement/Services

                        var ReportHTML = '';
                        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                        //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                        ReportHTML += '<html>';
                        ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                        //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + pInvoiceHeader.ConcatenatedInvoiceNumber + ')' + '</h3></div>';
                        ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.ConcatenatedInvoiceNumber.split('/')[1] + ' No. </b>' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + '</h3></div>';
                        //ReportHTML += '                 <div class="col-xs-8">';
                        //ReportHTML += '                     <table class="col-xs-12 b-t b-light text-sm table-bordered" style="text-align:left; width:auto; border:solid #000;">';
                        //ReportHTML += '                         <td>';
                        //ReportHTML += '                             <b>Bill To: </b><br>';
                        //ReportHTML += '                             <b>' + pInvoiceHeader.PartnerName + '</b><br>';
                        //ReportHTML += '                             ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                        //ReportHTML += '                             ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2 + '<br>'));
                        //ReportHTML += '                             ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                        //ReportHTML += '                             ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                        //ReportHTML += '                         </td>';
                        //ReportHTML += '                     </table>';

                        //ReportHTML += '                 </div>';


                        //ReportHTML += '             <div style="clear:both;"><br></div>';
                        if (pInvoiceHeader.ConcatenatedInvoiceNumber.split('/')[1].split(' ')[0].toUpperCase() == "DEBIT") {
                            ReportHTML += '             <div class="col-xs-8"><b>Client: </b>' + pInvoiceHeader.PartnerName + '</div>';
                            ReportHTML += '             <div class="col-xs-4 text-right"><b>Date: </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '</div>';
                        }
                        else {
                            ReportHTML += '             <div class="col-xs-12"><b>Client: </b>' + pInvoiceHeader.PartnerName + '</div>';
                            ReportHTML += '             <div class="col-xs-4"><b>Date: </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '</div>';
                            ReportHTML += '             <div class="col-xs-4"><b>Branch: </b>' + pOperationHeader.BranchName + '</div>';
                            if (pOperationHeader.ShipmentTypeCode != "FCL" && pOperationHeader.ShipmentTypeCode != "CONSOL")
                                //ReportHTML += '             <div class="col-xs-4"><b>Freight: </b>' + (pOperationHeader.POrCName == 0 ? "" : pOperationHeader.POrCName) + '</div>';
                                ReportHTML += '             <div class="col-xs-4"><b>Freight: </b>' + (pOperationHeader.POrCName == 0 ? "" : pOperationHeader.POrCName) + '</div>';
                            else
                                ReportHTML += '             <div class="col-xs-4"><b>Voyage: </b>' + (pOperationHeader.VoyageOrTruckNumber == 0 ? "" : pOperationHeader.VoyageOrTruckNumber) + '</div>';
                            ReportHTML += '             <div class="col-xs-4"><b>Vessel: </b>' + pVesselName + '</div>';
                            ReportHTML += '             <div class="col-xs-4"><b>Vessel Date: </b>' + (pETA == "01/01/1900" || pETA == "1/1/1900" ? "N/A" : pETA) + '</div>';
                            if ($("#cbPrintMBL").prop("checked") || ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU"))
                                ReportHTML += '             <div class="col-xs-4"><b>MB/L No.: </b>' + pMasterBL + '</div>';
                            if ($("#cbPrintHBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ) {
                                //if (pHouseBLs != "0")//Master Operation so show all houses on it
                                //    ReportHTML += '             <div class="col-xs-4"><b>HBL</b>: ' + pHouseBLs + '</div>';
                                //else
                                ReportHTML += '             <div class="col-xs-4"><b>MB/L No.:</b> ' + (pHouseNumber == "" || pHouseNumber == "0" ? "" : pHouseNumber) + '</div>';
                            }

                            ReportHTML += '             <div class="col-xs-4"><b>POL: </b>' + pPOLName + '</div>';
                            ReportHTML += '             <div class="col-xs-4"><b>GW: </b>' + pOperationHeader.GrossWeightSum + ' KGM' + '</div>';
                            //ReportHTML += '             <div class="col-xs-4"><b>Delivery Order No.: </b>' + (pDeliveryOrderNumber == 0 ? "" : pDeliveryOrderNumber) + '</div>';
                            ReportHTML += '             <div class="col-xs-4"><b>Delivery Order No.: </b>' + pOperationHeader.ID + '</div>';
                            if (pOperationHeader.ShipmentTypeCode != "FCL" && pOperationHeader.ShipmentTypeCode != "CONSOL")
                                ReportHTML += '             <div class="col-xs-4"><b>CBM: </b>' + pCBM + ' CBM' + '</div>';
                            ReportHTML += '             <div class="col-xs-4"><b>POD: </b>' + pPODName + '</div>';
                            //if (pOperationHeader.ShipmentTypeCode != "FCL" && pOperationHeader.ShipmentTypeCode != "CONSOL")
                            //    ReportHTML += '             <div class="col-xs-4"><b>Free Time: </b>' + (pOperationHeader.FreeTime == 0 ? "" : pOperationHeader.FreeTime) + '</div>';
                            if (pOperationHeader.ShipmentTypeCode == "FCL" || pOperationHeader.ShipmentTypeCode == "FTL" || pOperationHeader.ShipmentTypeCode == "CONSOL")
                                ReportHTML += '             <div class="col-xs-8"><b>Containers: </b>' + (pContainerTypes == 0 ? "N/A" : pContainerTypes) + '</div>';
                            else
                                ReportHTML += '             <div class="col-xs-8"><b>Packages: </b>' + (pPackageTypes == 0 ? "N/A" : pPackageTypes) + '</div>';
                            //ReportHTML += '             <div class="col-xs-4"><b>Commodity: </b>' + pOperationHeader.CommodityName + '</div>';
                            //ReportHTML += '             <div class="col-xs-4"><b>Departure Date: </b>' + (pETD == "01/01/1900" || pETD == "1/1/1900" ? "N/A" : pETD) + '</div>';
                            //ReportHTML += '             <div class="col-xs-4"><b>Voyage: </b>' + (pOperationHeader.VoyageOrTruckNumber == 0 ? "" : pOperationHeader.VoyageOrTruckNumber) + '</div>';
                            //ReportHTML += '             <div class="col-xs-4"><b>Port: </b>' + (pOperationHeader.DirectionType == constImportDirectionType ? pPOLName : pPODName) + '</div>';
                        } //else of (pInvoiceHeader.InvoiceTypeName == "DEBIT") {
                        ReportHTML += '                     <div class="col-xs-12 clear">';
                        ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                        ReportHTML += '                             <thead>';
                        ReportHTML += '                                 <tr>';
                        //ReportHTML += '                                     <th>No.</th>';
                        ReportHTML += '                                     <th>Description</th>';
                        ReportHTML += '                                     <th>Amount</th>';
                        ReportHTML += '                                 </tr>';
                        ReportHTML += '                             </thead>';
                        ReportHTML += '                             <tbody>';
                        $.each(JSON.parse(data[2]), function (i, item) {
                            if (pInvoiceHeader.ConcatenatedInvoiceNumber.split('/')[1].split(' ')[0].toUpperCase() == "G.CARGO"
                                || pInvoiceHeader.ConcatenatedInvoiceNumber.split('/')[1].split(' ')[0].toUpperCase() == "CONTAINER")
                                ReportHTML += '                                     <tr class="input-md font-bold" style="">';
                            else
                                ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                            //ReportHTML += '                                         <td>' + ++i + '</td>';
                            ReportHTML += '                                         <td>' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                            ReportHTML += '                                         <td>' + item.SaleAmount.toFixed(2) + '</td>';
                            ReportHTML += '                                     </tr>';
                        });
                        ReportHTML += '                                         <tr>';
                        ReportHTML += '                                             <td colspan=1>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                        ReportHTML += '                                             <td><b>' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                        ReportHTML += '                                         </tr>';
                        if (pTaxAmount != 0) {
                            ReportHTML += '                                         <tr>';
                            ReportHTML += '                                             <td colspan=1>' + '<b>VAT (' + pTaxTypeName + ') </b></td>';
                            ReportHTML += '                                             <td><b>' + pTaxAmount.toFixed(2) + '</b></td>';
                            ReportHTML += '                                         </tr>';
                        }
                        if (pDiscountAmount != 0) {
                            ReportHTML += '                                         <tr>';
                            ReportHTML += '                                             <td colspan=1>' + '<b>Discount (' + pDiscountTypeName + ')</b></td>';
                            ReportHTML += '                                             <td><b>' + pDiscountAmount.toFixed(2) + '</b></td>';
                            ReportHTML += '                                         </tr>';
                        }
                        if (pTaxAmount != 0 || pDiscountAmount != 0) {
                            ReportHTML += '                                         <tr>';
                            ReportHTML += '                                             <td colspan=1>' + '<b>TOTAL AMOUNT WITH VAT AND DISC : ' + toWords_WithFractionNumbers(parseFloat(pInvoiceHeader.Amount).toFixed(2)) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                            ReportHTML += '                                             <td><b>' + parseFloat(pInvoiceHeader.Amount).toFixed(2) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                            ReportHTML += '                                         </tr>';
                        }
                        //ReportHTML += '                                         <tr>';
                        //ReportHTML += '                                             <td colspan=2>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                        //ReportHTML += '                                             <td><b>Total Amount : ' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                        //ReportHTML += '                                         </tr>';
                        ReportHTML += '                             </tbody>';
                        ReportHTML += '                         </table>';
                        ReportHTML += '                     </div>'
                        //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                        //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + ' / (' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + ')' + '</b>';
                        //ReportHTML += '                         </div>';
                        //ReportHTML += '                         <div class="clear m-l col-xs-6 text-left"><b>ACCOUNTING</b></div>';
                        //ReportHTML += '                         <div class="float-right text-right m-t-n col-xs-6 m-r"><b>APPROVAL</b></div>';
                        //ReportHTML += '                         <div class="row"></div>';
                        if ($("#cbLargeInvoice").prop("checked")) {
                            ReportHTML += '         <div class="col-xs-12 m-t-n">Please, see attachment.</div>';
                            ReportHTML += '         <div class="break"></div>';
                        }
                        else
                            ReportHTML += '                         <div class="col-xs-12 m-t-n"></div>';
                        ReportHTML += '                         <div class="col-xs-12 m-t-n">';
                        if ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                            ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                            ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                            ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                            ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                            ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                            ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                        }
                        else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                            ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                            ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                        }
                        //else
                        //    ReportHTML += '                             <br><br><br><br><br><br>';
                        ReportHTML += '                         </div>';
                        //ReportHTML += '                         <div class="col-xs-4 text-right m-t-n">';
                        //ReportHTML += '                             <b>Subtotal: </b>' + pInvoiceHeader.CurrencyCode + ' ' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                        ////ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + pInvoiceHeader.TaxPercentage + '</br>';
                        //ReportHTML += '                             <b>VAT(' + pInvoiceHeader.TaxPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pTaxAmount + '</br>';
                        ////ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + pInvoiceHeader.DiscountPercentage + '</br>';
                        //ReportHTML += '                             <b>Discount Taxes(' + pInvoiceHeader.DiscountPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pDiscountAmount + '</br>';
                        //ReportHTML += '                             <b>Total: </b>' + pInvoiceHeader.CurrencyCode + ' <b>' + pInvoiceHeader.Amount + '</b></br>';
                        //ReportHTML += '                         </div>';
                        //ReportHTML += '                     </div>'; //of table-responsive
                        //ReportHTML += '                 </section>';
                        //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                        ReportHTML += '         </body>';

                        //ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                        //ReportHTML += '                     <div class="col-xs-3 m-t"><b>' + 'Approved By' + '</b></div>';
                        //ReportHTML += '                     <div class="col-xs-2 m-t text-center"><b>' + 'Reviewed By' + '</b></div>';
                        //ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + 'Customer Service Supervisor' + '</b></div>';
                        //ReportHTML += '                     <div class="col-xs-3 m-t text-center"><b>' + 'Preparation' + '</b></div>';
                        //ReportHTML += '                 </div>'
                        //ReportHTML += '                 <div class="m-t" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                        //ReportHTML += '                     <div class="col-xs-3 m-t-sm"><b>' + '....................................' + '</b></div>';
                        //ReportHTML += '                     <div class="col-xs-2 m-t-sm text-center"><b>' + '..................' + '</b></div>';
                        //ReportHTML += '                     <div class="col-xs-4 m-t-sm text-center"><b>' + '......................................................' + '</b></div>';
                        //ReportHTML += '                     <div class="col-xs-3 m-t-sm text-center">' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                        //ReportHTML += '                 </div>'

                        ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                        ReportHTML += '                     <div class="col-xs-3 m-t text-center"><b>' + 'Approved By' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-3 m-t text-center"><b>' + 'Reviewed By' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + 'Customer Service Supervisor' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-2 m-t text-center"><b>' + 'Preparation' + '</b></div>';
                        ReportHTML += '                 </div>'
                        ReportHTML += '                 <div class="m-t" style="clear:both;">'; //this is supposed to be in the footer but i added it here to test not put on text
                        ReportHTML += '                     <div class="col-xs-3 text-center"><b>' + (pDefaultsRow.InvoiceLeftSignature != "0" ? pDefaultsRow.InvoiceLeftSignature : '....................................') + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-3 text-center"><b>' + (pDefaultsRow.InvoiceMiddleSignature != "0" ? pDefaultsRow.InvoiceMiddleSignature : '..................') + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + (pDefaultsRow.InvoiceRightSignature != "0" ? pDefaultsRow.InvoiceRightSignature : '......................................................') + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-2 text-center">' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                        ReportHTML += '                 </div>'
                        if ($("#cbPrintStamp").prop("checked")) {
                            ReportHTML += '         <div class="col-xs-3 text-center">&emsp;</div>';
                            ReportHTML += '         <div class="col-xs-3 text-center"><img src="/Content/Images/CompanyStamp.jpg" alt="footer"/></div>';
                            ReportHTML += '         <div class="col-xs-6 text-center">&emsp;</div>'
                        }

                        ReportHTML += '     <footer class="footer col-xs-12 m-t-lg ' + ($("#cbPrintFooterInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  "" : " hide ") + '" style="width:100%; position:absolute; bottom:0;">';
                        //ReportHTML += '         <div class="row">'
                        //ReportHTML += '             <div class="col-xs-8 m-l"><b><i>' + ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.DirectionType").text() == 1
                        //                                                                ? 'Import Manager'
                        //                                                                : ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.DirectionType").text() == 2 ? 'Export Manager' : 'Domestic Manager')
                        //                                                                ) + '</i></b></div>';
                        //ReportHTML += '             <div class="col-xs-4 m-t-n-md float-right"><b><i>Accountant Signature</i></b></div>';
                        //ReportHTML += '         </div>'
                        //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
                        //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                        //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
                        //else
                        //    if ($("#cbIsImport").prop("checked") && $("#cbIsAir").prop("checked"))
                        //        ReportHTML += '             <div class="row m-l">F/FFI-IA-11-04</div>';
                        //ReportHTML += '         <div class="row text-center ' + ($("#cbPrintFooterInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  "" : " hide ") + '"><img src="/Content/Images/CompanyFooter.jpg" alt="logo"/></div>';
                        /****if KDS the use CompanyFooter-KDS-InvoiceTaxNumbers.jpg***/
                        if (pInvoiceHeader.ConcatenatedInvoiceNumber.split('/')[1].split(' ')[0].toUpperCase() != "DEBIT") {
                            //ReportHTML += '         <div class="row text-right m-r">' + '  الشركة تخضع لنظام الدفعات المقدمة  ' + '</div>';
                            ReportHTML += '         <div class="row text-right m-r">' + '  يتنبه نحو عدم الخصم من تحت حساب الضريبة حيث أن الشركة تتبع نظام الدفعات المقدمة تطبيقا لأحكام لمادة (62) من القانون رقم 91 لسنة 2005  ' + '</div>';
                            //ReportHTML += '         <div class="row text-right m-r">' + '  يوقف صرف شيكات مصر للتأمين لحين تسوية التعويضات  ' + '</div>';
                            ReportHTML += '         <div class="row text-right m-r">' + '  لاتعتبر الفاتورة مسددة إلا بموجب إيصال سداد معتمد من الشركة بتمام قيمة الفاتورة  ' + '</div>';
                        }
                        else {
                            ReportHTML += '         <div class="row text-right m-r">' + '  يتنبه نحو عدم الخصم من تحت حساب الضريبة حيث أن الشركة تتبع نظام الدفعات المقدمة تطبيقا لأحكام لمادة (62) من القانون رقم 91 لسنة 2005  ' + '</div>';
                            //ReportHTML += '         <div class="row text-right m-r">' + '  يوقف صرف شيكات مصر للتأمين لحين تسوية التعويضات  ' + '</div>';
                        }
                        ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter' + (pDefaults.UnEditableCompanyName == "KDS" ? '-KDS-InvoiceTaxNumbers' : "") + '.jpg"' + ' alt="logo"/></div>';
                        //else if (pDefaults.UnEditableCompanyName == "KML") //if KML the print on original paper
                        //    ReportHTML += '             <br><br><br><br><br>';
                        ReportHTML += '     </footer>';
                        ReportHTML += '</html>';
                        if (1==1) {
                            pFinalReportHTML += ReportHTML;
                            Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                        }
                        else {
                            pFinalReportHTML += ReportHTML;
                            pFinalReportHTML += ' <div class="break"></div>';
                        }
                    }//other invoice types for KDS
                } //EOF if (pDefaults.UnEditableCompanyName == "KDS")
                else if (pDefaults.UnEditableCompanyName == "EGL") {

                    var ReportHTML = '';
                    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                    //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                    //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + pInvoiceHeader.ConcatenatedInvoiceNumber + ')' + '</h3></div>';
                    ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + '</h3></div>';

                    ////ReportHTML += '             <div style="clear:both;"><br></div>';
                    if (pInvoiceHeader.InvoiceTypeName.split(' ')[0].toUpperCase() == "DEBIT")
                        ReportHTML += '         <div class="col-xs-1 m-l-n-md">&emsp;</div>';
                    else
                        ReportHTML += '         <div class="col-xs-1 m-l-n-md"><img src="/Content/Images/' + 'InvoiceSideStatement.jpg' + '" alt="logo"/></div>';
                    ReportHTML += '         <div class="col-xs-11 m-l-n-lg">';

                    ReportHTML += '             <div class="col-xs-6"><b>Bill to: </b>' + pInvoiceHeader.PartnerName + '</div>';
                    ReportHTML += '             <div class="col-xs-3"><b>Inv.Date: </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '</div>';
                    ReportHTML += '             <div class="col-xs-3"><b>Pay.Date: </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Address: </b>';
                    ReportHTML += '                 ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                    ReportHTML += '                 ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2));
                    ReportHTML += '                 ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                    ReportHTML += '                 ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                    ReportHTML += '             </div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Reference No.: </b>' + (pCustomerReference == 0 ? "N/A" : pCustomerReference) + '</div>';
                    if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                        ReportHTML += '             <div class="col-xs-6"><b>Operation: </b>' + pMasterOperationCode + '</div>';
                    else
                        ReportHTML += '             <div class="col-xs-6"><b>Operation: </b>' + (pInvoiceHeader.OperationCode == 0 ? pInvoiceHeader.MasterOperationCode : pInvoiceHeader.OperationCode) + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Currency: </b>' + pInvoiceHeader.CurrencyCode + '</div>';
                    if ($("#cbPrintMBL").prop("checked") || ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU"))
                        ReportHTML += '             <div class="col-xs-6"><b>MB/L No.: </b>' + pMasterBL + '</div>';
                    if ($("#cbPrintHBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ) {
                        if (pHouseBLs != "0")//Master Operation so show all houses on it
                            ReportHTML += '             <div class="col-xs-6"><b>HBL</b>: ' + pHouseBLs + '</div>';
                        else
                            ReportHTML += '             <div class="col-xs-6"><b>HB/L No.:</b> ' + (pHouseNumber == "" || pHouseNumber == "0" ? "" : pHouseNumber) + '</div>';
                    }
                    ReportHTML += '             <div class="col-xs-6"><b>POL: </b>' + pPOLName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>POD: </b>' + pPODName + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Weight: </b>' + pGrossWeightSum + ' KG</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>CBM: </b>' + pCBM + ' CBM</div>';
                    if (pOperationHeader.TransportType == OceanTransportType) {
                        ReportHTML += '         <div class="col-xs-6"><b>Vessel: </b>' + pVesselName + '</div>';
                    }
                    //for inland shipping line is written in LeftSignature
                    if (pOperationHeader.TransportType == InlandTransportType) {
                        ReportHTML += '         <div class="col-xs-6"><b>Shipping Line: </b>' + (pInvoiceHeader.LeftSignature == 0 ? "" : pInvoiceHeader.LeftSignature) + '</div>';
                    }
                    if (pOperationHeader.TransportType != AirTransportType) {
                        ReportHTML += '         <div class="col-xs-6"><b>Arrival Date: </b>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.ActualArrival)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.ActualArrival))) + '</div>';
                        ReportHTML += '         <div class="col-xs-6"><b>Containers: </b>' + (pOperationHeader.ShipmentType == 0 || pOperationHeader.ShipmentType == 2 || pOperationHeader.ShipmentType == 4 ? "LCL" : pContainerTypes) + '</div>';
                        ReportHTML += '         <div class="col-xs-6"><b>Container Numbers: </b>' + pContainerNumbers + '</div>';
                    }
                    if (pOperationHeader.PackageTypes != 0 || pOperationHeader.PackageTypesOnContainersTotals != 0 || pOperationHeader.PlacedOnOperationContainersAndPackagesID != 0)
                        ReportHTML += '         <div class="col-xs-6"><b>Packages: </b>' + (pOperationHeader.PackageTypes == 0 ? (pOperationHeader.PackageTypesOnContainersTotals == 0 ? (pOperationHeader.PlacedOnOperationContainersAndPackagesID == 0 ? "0" : pOperationHeader.PlacedOnOperationContainersAndPackagesID) : pOperationHeader.PackageTypesOnContainersTotals) : pOperationHeader.PackageTypes) + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Shipment Category: </b>' + pShipmentTypeCode + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Shipment Term: </b>' + pIncotermName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Commodity: </b>' + (pOperationHeader.CommodityName == 0 ? "" : pOperationHeader.CommodityName) + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Shipper: </b>' + pShipperName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Consignee: </b>' + pConsigneeName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Weight: </b>' + pGrossWeightSum + ' KGM' + '</div>';
                    if (pOperationHeader.CertificateNumber != 0)
                        ReportHTML += '         <div class="col-xs-6"><b>Certificate: </b>' + pOperationHeader.CertificateNumber + '</div>';
                    ReportHTML += '                     <div class="col-xs-12 clear">';
                    ReportHTML += '                         <table id="tblReportInvoice" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    ReportHTML += '                                     <th>S</th>';
                    ReportHTML += '                                     <th>Description</th>';
                    ReportHTML += '                                     <th>Price</th>';
                    ReportHTML += '                                     <th>Currency</th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    debugger;
                    $.each(JSON.parse(data[2]), function (i, item) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + (i + 1) + '</td>';
                        if (pOperationHeader.TransportType == 2)
                            ReportHTML += '                                         <td style="text-align:left;">' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                        else
                            ReportHTML += '                                         <td style="text-align:left;">' + (item.Notes == 0 ? "" : item.Notes) + '</td>';
                        ReportHTML += '                                         <td>' + item.SaleAmount.toFixed(2) + '</td>';
                        ReportHTML += '                                         <td>' + item.CurrencyCode + '</td>';
                        ReportHTML += '                                     </tr>';
                    });
                    if (pInvoiceHeader.FixedDiscount > 0) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td style="text-align:left;">' + 'Special Discount' + '</td>';
                        ReportHTML += '                                         <td>' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2) + '</td>';
                        ReportHTML += '                                         <td>' + pInvoiceHeader.CurrencyCode + '</td>';
                        ReportHTML += '                                     </tr>';
                    }
                    //ReportHTML += '                                         <tr>';
                    //ReportHTML += '                                             <td colspan=2>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                             <td><b>' + pInvoiceHeader.Amount + '</b></td>';
                    //ReportHTML += '                                             <td>' + pInvoiceHeader.CurrencyCode + '</td>';
                    //ReportHTML += '                                         </tr>';
                    //$("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")

                    //ReportHTML += '                                         <tr>';
                    //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                             <td><b>Total Amount : ' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                         </tr>';
                    ReportHTML += '                             </tbody>';
                    ReportHTML += '                         </table>';
                    ReportHTML += '                     </div>'

                    if ($("#cbLargeInvoice").prop("checked")) {
                        ReportHTML += '         <div class="col-xs-12 m-t-n">Please, see attachment.</div>';
                        ReportHTML += '         <div class="break"></div>';
                    }
                    else
                        ReportHTML += '                         <div class="col-xs-12 m-t-n"></div>';
                    ReportHTML += '                         <div class="col-xs-8">';
                    if ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                        ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                        ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                        ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                        ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                    }
                    else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                    }
                    else
                        ReportHTML += '                             <br>';
                    ReportHTML += '                         </div>';
                    ReportHTML += '                         <div class="col-xs-4 text-right">';
                    ReportHTML += '                             <b>Subtotal: </b>' + pInvoiceHeader.CurrencyCode + ' ' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                    //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + pInvoiceHeader.TaxPercentage + '</br>';
                    ReportHTML += '                             <b>VAT(' + pInvoiceHeader.TaxPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pTaxAmount.toFixed(2) + '</br>';
                    //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + pInvoiceHeader.DiscountPercentage + '</br>';
                    ReportHTML += '                             <b>Discount Taxes(' + pInvoiceHeader.DiscountPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pDiscountAmount.toFixed(2) + '</br>';
                    ReportHTML += '                             <b>Total: </b>' + pInvoiceHeader.CurrencyCode + ' <b>' + parseFloat(pInvoiceHeader.Amount).toFixed(2) + '</b></br>';
                    ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(parseFloat(pInvoiceHeader.Amount).toFixed(2)) + ' ' + pInvoiceHeader.CurrencyCode + '</br>';
                    if ($("#cbPrintUSDTotal").prop("checked") && pInvoiceHeader.CurrencyCode.trim() == "EGP")
                        ReportHTML += '                             <b>USD Total: </b>' + ' <b>' + (pInvoiceHeader.Amount / $("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")).toFixed(2) + '</b></br>';
                    ReportHTML += '                         </div>';
                    if (pInvoiceHeader.InvoiceTypeName.split(' ')[0].toUpperCase() == "DEBIT")
                        ReportHTML += '                     <div class="m-l" style="width:300px;height:40px;border:1px solid #000;clear:both;">' + '  مبالغ مسددة حساب الغير  ' + '<br>outstanding amount for the account of others' + '</div>';

                    //ReportHTML += '                     </div>'; //of table-responsive
                    //ReportHTML += '                 </section>';
                    //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                    ReportHTML += '             </div>'; //
                    ReportHTML += '         </body>';


                    //ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    //ReportHTML += '                     <div class="col-xs-3 m-t"><b>' + 'Approved By' + '</b></div>';
                    //ReportHTML += '                     <div class="col-xs-2 m-t text-center"><b>' + 'Reviewed By' + '</b></div>';
                    //ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + 'Customer Service Supervisor' + '</b></div>';
                    //ReportHTML += '                     <div class="col-xs-3 m-t text-center"><b>' + 'Preparation' + '</b></div>';
                    //ReportHTML += '                 </div>'
                    //ReportHTML += '                 <div class="m-t" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    //ReportHTML += '                     <div class="col-xs-3 m-t-sm"><b>' + '....................................' + '</b></div>';
                    //ReportHTML += '                     <div class="col-xs-2 m-t-sm text-center"><b>' + '..................' + '</b></div>';
                    //ReportHTML += '                     <div class="col-xs-4 m-t-sm text-center"><b>' + '......................................................' + '</b></div>';
                    //ReportHTML += '                     <div class="col-xs-3 m-t-sm text-center">' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                    //ReportHTML += '                 </div>'

                    ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    ReportHTML += '                     <div class="col-xs-3 m-t text-center"><b>' + 'Accounting Manager' + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-3 m-t text-center"><b>' + 'Auditing' + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + 'Customer Service Supervisor' + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-2 m-t text-center"><b>' + 'Preparation' + '</b></div>';
                    ReportHTML += '                 </div>'
                    //ReportHTML += '                 <div class="m-t" style="clear:both;">'; //this is supposed to be in the footer but i added it here to test not put on text
                    //ReportHTML += '                     <div class="col-xs-3 text-center"><b>' + (pDefaultsRow.InvoiceLeftSignature != "0" ? pDefaultsRow.InvoiceLeftSignature : '....................................') + '</b></div>';
                    //ReportHTML += '                     <div class="col-xs-3 text-center"><b>' + (pDefaultsRow.InvoiceMiddleSignature != "0" ? pDefaultsRow.InvoiceMiddleSignature : '..................') + '</b></div>';
                    //ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + (pDefaultsRow.InvoiceRightSignature != "0" ? pDefaultsRow.InvoiceRightSignature : '......................................................') + '</b></div>';
                    //ReportHTML += '                     <div class="col-xs-2 text-center">' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                    //ReportHTML += '                 </div>'
                    ReportHTML += '                 <div class="m-t" style="clear:both;">'; //this is supposed to be in the footer but i added it here to test not put on text
                    ReportHTML += '                     <div class="col-xs-3 text-center"><b>' + (pInvoiceHeader.LeftSignature != "0" ? pInvoiceHeader.LeftSignature : '....................................') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-3 text-center"><b>' + (pInvoiceHeader.MiddleSignature != "0" ? pInvoiceHeader.MiddleSignature : '..................') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + (pInvoiceHeader.RightSignature != "0" ? pInvoiceHeader.RightSignature : '......................................................') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-2 text-center">' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                    ReportHTML += '                 </div>'
                    if ($("#cbPrintStamp").prop("checked")) {
                        ReportHTML += '         <div class="col-xs-3 text-center">&emsp;</div>';
                        ReportHTML += '         <div class="col-xs-3 text-center"><img src="/Content/Images/CompanyStamp.jpg" alt="footer"/></div>';
                        ReportHTML += '         <div class="col-xs-6 text-center">&emsp;</div>'
                    }
                    else if ($("#cbPrintStamp-Ar").prop("checked")) {
                        ReportHTML += '         <div class="col-xs-3 text-center">&emsp;</div>';
                        ReportHTML += '         <div class="col-xs-3 text-center"><img src="/Content/Images/CompanyStamp-Ar.jpg" alt="footer"/></div>';
                        ReportHTML += '         <div class="col-xs-6 text-center">&emsp;</div>'
                    }
                    else if ($("#cbPrintStamp-Kadmar").prop("checked")) {
                        ReportHTML += '         <div class="col-xs-3 text-center">&emsp;</div>';
                        ReportHTML += '         <div class="col-xs-3 text-center"><img src="/Content/Images/CompanyStamp-Kadmar.jpg" alt="footer"/></div>';
                        ReportHTML += '         <div class="col-xs-6 text-center">&emsp;</div>'
                    }

                    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                    //ReportHTML += '         <div class="row">'
                    //ReportHTML += '             <div class="col-xs-8 m-l"><b><i>' + ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.DirectionType").text() == 1
                    //                                                                ? 'Import Manager'
                    //                                                                : ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.DirectionType").text() == 2 ? 'Export Manager' : 'Domestic Manager')
                    //                                                                ) + '</i></b></div>';
                    //ReportHTML += '             <div class="col-xs-4 m-t-n-md float-right"><b><i>Accountant Signature</i></b></div>';
                    //ReportHTML += '         </div>'
                    if (pInvoiceHeader.InvoiceTypeName.split(' ')[0].toUpperCase() == "DEBIT")
                        ReportHTML += '         <div class="row text-right m-r m-t">' + '  مرفق طيه بيان المستندات بمبالغ مدفوعة نيابة عن سيادتكم بناء على تعليماتكم مرفق يها أصول المستندات معنونة باسم سيادتكم  ' + '</div>';
                    else {
                        ReportHTML += '         <div class="row text-right m-r m-t">' + '  يتنبه نحو عدم الخصم من تحت حساب الضريبة حيث أن الشركة تتبع نظام الدفعات المقدمة تطبيقا لأحكام لمادة (62) من القانون رقم 91 لسنة 2005  ' + '</div>';
                        //ReportHTML += '         <div class="row text-right m-r">' + '  يوقف صرف شيكات مصر للتأمين لحين تسوية التعويضات  ' + '</div>';
                        ReportHTML += '         <div class="row text-right m-r">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
                    }
                    //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
                    //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                    //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
                    if (pInvoiceHeader.InvoiceTypeName.split(' ')[0].toUpperCase() == "DEBIT" && $("#cbPrintFooterInvoice").prop("checked"))
                        ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/InvoiceDebitFooter_EGL.jpg" alt="footer"/></div>';
                    else
                        ReportHTML += '         &emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>';
                    //else
                    //    ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                    if (1==1) {
                        pFinalReportHTML += ReportHTML;
                        Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                    }
                    else {
                        pFinalReportHTML += ReportHTML;
                        pFinalReportHTML += ' <div class="break"></div>';
                    }
                } //EOF if (pDefaults.UnEditableCompanyName == "EGL")
                else if (pDefaults.UnEditableCompanyName == "ABC") {
                    if (pInvoiceHeader.InvoiceTypeName.split(' ')[0].toUpperCase() == "FREIGHT"
                        //&& pOperationHeader.TransportType == AirTransportType
                    ) {

                        var ReportHTML = '';
                        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                        //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                        ReportHTML += '<html>';
                        ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                        //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + pInvoiceHeader.ConcatenatedInvoiceNumber + ')' + '</h3></div>';
                        ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.ConcatenatedInvoiceNumber.split('/')[1] + '</h3></div>';

                        ReportHTML += '                 <div class="col-xs-4 m-l" style="text-align:center; border: 1px solid #000;border-radius:15px;">';
                        ReportHTML += '                     <b>' + pInvoiceHeader.PartnerName + '</b><br>';
                        ReportHTML += '                     ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                        ReportHTML += '                     ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2 + '<br>'));
                        ReportHTML += '                     ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                        ReportHTML += '                     ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                        ReportHTML += '                 </div>';
                        ReportHTML += '                 <div class="col-xs-4">';
                        ReportHTML += '                 </div>';
                        ReportHTML += '                 <div class="col-xs-3">';
                        ReportHTML += '                     <table class=" b-t b-light text-sm table-bordered" style="width:100%; border:1px solid #000;">';
                        ReportHTML += '                         <tr>';
                        ReportHTML += '                             <td style="text-align:center;">Tax No</td>';
                        ReportHTML += '                             <td style="text-align:center;">' + pDefaults.TaxNumber + '</td>';
                        ReportHTML += '                         </tr>';
                        ReportHTML += '                         <tr>';
                        ReportHTML += '                             <td style="text-align:center;">No</td>';
                        ReportHTML += '                             <td style="text-align:center;">' + pInvoiceTypeCode + ' ' + pInvoiceHeader.InvoiceNumber + '-' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(8, 2) + '</td>';
                        ReportHTML += '                         </tr>';
                        ReportHTML += '                         <tr>';
                        ReportHTML += '                             <td style="text-align:center;">Inv.Date</td>';
                        ReportHTML += '                             <td style="text-align:center;">' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '</td>';
                        ReportHTML += '                         </tr>';
                        ReportHTML += '                         <tr>';
                        ReportHTML += '                             <td style="text-align:center;">Due Date</td>';
                        ReportHTML += '                             <td style="text-align:center;">' + (Date.prototype.compareDates("01/01/1900", pInvoiceHeader.DueDate) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.DueDate))) + '</td>';
                        ReportHTML += '                         </tr>';
                        ReportHTML += '                     </table>';
                        ReportHTML += '                 </div>';

                        ReportHTML += '                 <div class="col-xs-12" style="clear:both;"><br></div>';

                        ReportHTML += '                 <div class="col-xs-4">';
                        ReportHTML += '                     <table class="b-t b-light text-sm table-bordered" style="clear:both; width:100%; border:1px solid #000;">';
                        ReportHTML += '                         <tr>';
                        ReportHTML += '                             <td style="text-align:center;">' + (pOperationHeader.TransportType == AirTransportType ? 'MAWB' : 'MBL') + '</td>';
                        ReportHTML += '                             <td style="text-align:center;">' + pMasterBL + '</td>';
                        ReportHTML += '                         </tr>';
                        ReportHTML += '                         <tr>';
                        ReportHTML += '                             <td style="text-align:center;">' + (pOperationHeader.TransportType == AirTransportType ? 'HAWB' : 'HBL') + '</td>';
                        ReportHTML += '                             <td style="text-align:center;">' + pHouseNumber + '</td>';
                        ReportHTML += '                         </tr>';
                        ReportHTML += '                         <tr>';
                        ReportHTML += '                             <td style="text-align:center;">GRS-W</td>';
                        ReportHTML += '                             <td style="text-align:center;">' + pGrossWeightSum + ' KGM' + '</td>';
                        ReportHTML += '                         </tr>';
                        //if (pOperationHeader.TransportType == AirTransportType) {
                        ReportHTML += '                         <tr>';
                        ReportHTML += '                             <td style="text-align:center;">CHG-W</td>';
                        ReportHTML += '                             <td style="text-align:center;">' + (pOperationHeader.ChargeableWeight == 0 ? "" : (pOperationHeader.ChargeableWeight + ' KGM')) + '</td>';
                        ReportHTML += '                         </tr>';
                        //}
                        ReportHTML += '                         <tr>';
                        ReportHTML += '                             <td style="text-align:center;">PCS</td>';
                        ReportHTML += '                             <td style="text-align:center;">'
                            + (pOperationHeader.NumberOfPackages == 0
                                ? (pOperationHeader.PackageTypes == 0
                                    ? (pOperationHeader.PackageTypesOnContainersTotals)
                                    : pOperationHeader.PackageTypes)
                                : pOperationHeader.NumberOfPackages) + '</td>';
                        ReportHTML += '                         </tr>';
                        ReportHTML += '                         <tr>';
                        ReportHTML += '                             <td style="text-align:center;">Road No</td>';
                        ReportHTML += '                             <td style="text-align:center;">' + (pMainRoute.RoadNumber == 0 ? "" : pMainRoute.RoadNumber) + '</td>';
                        ReportHTML += '                         </tr>';
                        ReportHTML += '                     </table>';
                        ReportHTML += '                 </div>';


                        ReportHTML += '                 <div class="col-xs-5">';
                        ReportHTML += '                     <table class="b-t b-light text-sm table-bordered" style="clear:both; width:100%; border:1px solid #000;">';
                        ReportHTML += '                         <tr>';
                        ReportHTML += '                             <td style="text-align:center;">SHPR</td >';
                        ReportHTML += '                             <td style="text-align:center;">' + pShipperName + '</td>';
                        ReportHTML += '                         </tr>';
                        ReportHTML += '                         <tr>';
                        ReportHTML += '                             <td style="text-align:center;">CNEE</td>';
                        ReportHTML += '                             <td style="text-align:center;">' + pConsigneeName + '</td>';
                        ReportHTML += '                         </tr>'
                        ReportHTML += '                         <tr>';
                        ReportHTML += '                             <td style="text-align:center;">AGENT</td>';
                        ReportHTML += '                             <td style="text-align:center;">' + (pOperationHeader.AgentName == 0 ? "N/A" : pOperationHeader.AgentName) + '</td>';
                        ReportHTML += '                         </tr>'
                        ReportHTML += '                         <tr>';
                        ReportHTML += '                             <td style="text-align:center;">ROUTE</td>';
                        ReportHTML += '                             <td style="text-align:center;">' + (pOperationHeader.POLCode + " --> " + pOperationHeader.PODCode) + '</td>';
                        ReportHTML += '                         </tr>'
                        ReportHTML += '                     </table>';
                        ReportHTML += '                 </div>';
                        ReportHTML += '                 <div class="col-xs-3">';
                        ReportHTML += '                 </div>';
                        ReportHTML += '             </div>';


                        ReportHTML += '             <div style="clear:both;"><br></div>';

                        ReportHTML += '                     <div class="col-xs-12 clear">';
                        ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                        ReportHTML += '                             <thead>';
                        ReportHTML += '                                 <tr>';
                        ReportHTML += '                                     <th>Details</th>';
                        ReportHTML += '                                     <th style="width:15%;">' + pInvoiceHeader.CurrencyCode + '</th>';
                        ReportHTML += '                                 </tr>';
                        ReportHTML += '                             </thead>';
                        ReportHTML += '                             <tbody>';
                        $.each(JSON.parse(data[2]), function (i, item) {
                            ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                            ReportHTML += '                                         <td style="text-align:left;">' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                            ReportHTML += '                                         <td style="text-align:right;">' + item.SaleAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            ReportHTML += '                                     </tr>';
                        });
                        if (pInvoiceHeader.FixedDiscount > 0) {
                            ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                            ReportHTML += '                                         <td style="text-align:left;">' + 'Special Discount' + '</td>';
                            ReportHTML += '                                         <td style="text-align:right;">' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2) + '</td>';
                            ReportHTML += '                                     </tr>';
                        }
                        ReportHTML += '                                         <tr>';
                        //ReportHTML += '                                             <td colspan=1>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                        ReportHTML += '                                             <td style="text-align:left;" colspan=1>' + '<b>TOTAL ' + '</b></td>';
                        ReportHTML += '                                             <td style="text-align:right;"><b>' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                        ReportHTML += '                                         </tr>';
                        ReportHTML += '                             </tbody>';
                        ReportHTML += '                         </table>';
                        ReportHTML += '                     </div>'

                        //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                        //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + ' / (' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + ')' + '</b>';
                        //ReportHTML += '                         </div>';
                        //ReportHTML += '                         <div class="clear m-l col-xs-6 text-left"><b>ACCOUNTING</b></div>';
                        //ReportHTML += '                         <div class="float-right text-right m-t-n col-xs-6 m-r"><b>APPROVAL</b></div>';
                        ReportHTML += '                         <div class="col-xs-8 m-t-n">';
                        if ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                            ReportHTML += '                             <b>ONLY: ' + toWords_WithFractionNumbers(parseFloat(pInvoiceHeader.Amount).toFixed(2)) + ' </b>' + pInvoiceHeader.CurrencyCode + '</br></br>';
                            ReportHTML += '                             <b><u>Accounts:</u></b></br>';
                            ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                            ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                            ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                            ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                            ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                        }
                        else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                            ReportHTML += '                             <b><u>Accounts:</u></b></br>';
                            ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                        }
                        else {
                            ReportHTML += '</br>';
                        }
                        ReportHTML += '                         </div>';
                        ReportHTML += '                         <div class="col-xs-4 text-right m-t-n">';
                        //ReportHTML += '                             <b>Subtotal: </b>' + pInvoiceHeader.CurrencyCode + ' ' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                        //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + pInvoiceHeader.TaxPercentage + '</br>';
                        if (pTaxAmount != 0)
                            ReportHTML += '                             <b>VAT(' + pInvoiceHeader.TaxPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pTaxAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                        //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + pInvoiceHeader.DiscountPercentage + '</br>';
                        if (pDiscountAmount != 0)
                            ReportHTML += '                             <b>Discount Taxes(' + pInvoiceHeader.DiscountPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pDiscountAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                        if (pTaxAmount != 0 || pDiscountAmount != 0)
                            ReportHTML += '                             <b>Total: </b>' + pInvoiceHeader.CurrencyCode + ' <b>' + parseFloat(pInvoiceHeader.Amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></br>';
                        ReportHTML += '                         </div>';
                        //ReportHTML += '                     </div>'; //of table-responsive
                        //ReportHTML += '                 </section>';
                        //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                        ReportHTML += '         </body>';

                        ReportHTML += '     <footer class="footer col-xs-12 ' + ($("#cbPrintFooterInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  "" : " hide ") + '" style="width:100%; position:absolute; bottom:0;">';
                        //ReportHTML += '         <div class="row">'

                        //ReportHTML += '         <div class="row text-right m-r m-t-sm">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
                        //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';

                        //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                        //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
                        ReportHTML += '     </footer>';
                        ReportHTML += '</html>';
                        if (1==1) {
                            pFinalReportHTML += ReportHTML;
                            Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                        }
                        else {
                            pFinalReportHTML += ReportHTML;
                            pFinalReportHTML += ' <div class="break"></div>';
                        }
                    } //if (pInvoiceHeader.ConcatenatedInvoiceNumber.split('/')[1].split(' ')[0].toUpperCase() == "FREIGHT"
                    //&& pOperationHeader.TransportType == 2/*Air*/) {
                    else {

                        var ReportHTML = '';
                        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                        //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                        ReportHTML += '<html>';
                        ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                        //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + pInvoiceHeader.ConcatenatedInvoiceNumber + ')' + '</h3></div>';
                        ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.ConcatenatedInvoiceNumber.split('/')[1] + '</h3></div>';

                        ReportHTML += '                 <div class="col-xs-4 m-l" style="text-align:center; border: 1px solid #000;border-radius:15px;">';
                        ReportHTML += '                     <b>' + pInvoiceHeader.PartnerName + '</b><br>';
                        ReportHTML += '                     ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                        ReportHTML += '                     ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2 + '<br>'));
                        ReportHTML += '                     ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                        ReportHTML += '                     ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                        ReportHTML += '                 </div>';
                        ReportHTML += '                 <div class="col-xs-4">';
                        ReportHTML += '                 </div>';
                        ReportHTML += '                 <div class="col-xs-3">';
                        ReportHTML += '                     <table class=" b-t b-light text-sm table-bordered" style="width:100%; border:1px solid #000;">';
                        ReportHTML += '                         <tr>';
                        ReportHTML += '                             <th style="text-align:center;">Tax No</th>';
                        ReportHTML += '                             <td style="text-align:center;">' + pDefaults.TaxNumber + '</td>';
                        ReportHTML += '                         </tr>';
                        ReportHTML += '                         <tr>';
                        ReportHTML += '                             <th style="text-align:center;">No</th>';
                        ReportHTML += '                             <td style="text-align:center;">' + pInvoiceTypeCode + ' ' + pInvoiceHeader.InvoiceNumber + '-' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(8, 2) + '</td>';
                        ReportHTML += '                         </tr>';
                        ReportHTML += '                         <tr>';
                        ReportHTML += '                             <th style="text-align:center;">Inv.Date</th>';
                        ReportHTML += '                             <td style="text-align:center;">' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '</td>';
                        ReportHTML += '                         </tr>';
                        ReportHTML += '                         <tr>';
                        ReportHTML += '                             <th style="text-align:center;">Due Date</th>';
                        ReportHTML += '                             <td style="text-align:center;">' + (Date.prototype.compareDates("01/01/1900", pInvoiceHeader.DueDate) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.DueDate))) + '</td>';
                        ReportHTML += '                         </tr>';
                        ReportHTML += '                     </table>';
                        ReportHTML += '                 </div>';

                        ReportHTML += '                 <div class="col-xs-12" style="clear:both;"><br></div>';

                        ReportHTML += '                 <div class="col-xs-4">';
                        ReportHTML += '                     <table class="b-t b-light text-sm table-bordered" style="clear:both; width:100%; border:1px solid #000;">';
                        ReportHTML += '                         <tr>';
                        ReportHTML += '                             <th style="text-align:center;">' + (pOperationHeader.TransportType == AirTransportType ? 'MAWB' : 'MBL') + '</th>';
                        ReportHTML += '                             <td style="text-align:center;">' + pMasterBL + '</td>';
                        ReportHTML += '                         </tr>';
                        ReportHTML += '                         <tr>';
                        ReportHTML += '                             <th style="text-align:center;">' + (pOperationHeader.TransportType == AirTransportType ? 'HAWB' : 'HBL') + '</th>';
                        ReportHTML += '                             <td style="text-align:center;">' + pHouseNumber + '</td>';
                        ReportHTML += '                         </tr>';
                        ReportHTML += '                         <tr>';
                        ReportHTML += '                             <th style="text-align:center;">SHPR</th>';
                        ReportHTML += '                             <td style="text-align:center;">' + pShipperName + '</td>';
                        ReportHTML += '                         </tr>';
                        ReportHTML += '                         <tr>';
                        ReportHTML += '                             <th style="text-align:center;">CNEE</th>';
                        ReportHTML += '                             <td style="text-align:center;">' + pConsigneeName + '</td>';
                        ReportHTML += '                         </tr>';
                        ReportHTML += '                     </table>';
                        if (pInvoiceHeader.InvoiceTypeName.split(' ')[0].toUpperCase() != "DELIVERY") {
                            ReportHTML += '                     <table class="b-t b-light text-sm table-bordered m-t" style="clear:both; width:100%; border:1px solid #000;">';
                            ReportHTML += '                         <tr>';
                            ReportHTML += '                             <th style="text-align:center; width:30%;">Certificate#</th>';
                            ReportHTML += '                             <td style="text-align:center;">' + (pInvoiceHeader.CertificateNumber == 0 ? "" : pInvoiceHeader.CertificateNumber) + '</td>';
                            ReportHTML += '                         </tr>';
                            ReportHTML += '                     </table>';
                        }
                        ReportHTML += '                 </div>';


                        ReportHTML += '                 <div class="col-xs-4">';
                        ReportHTML += '                     <table class="b-t b-light text-sm table-bordered" style="clear:both; width:100%; border:1px solid #000;">';
                        ReportHTML += '                         <tr>';
                        ReportHTML += '                             <th style="text-align:center;">WGT</th>';
                        ReportHTML += '                             <td style="text-align:center;">' + pGrossWeightSum + ' KGM' + '</td>';
                        ReportHTML += '                         </tr>';
                        if (pOperationHeader.TransportType == AirTransportType) {
                            ReportHTML += '                         <tr>';
                            ReportHTML += '                             <th style="text-align:center;">CHG-W</th>';
                            ReportHTML += '                             <td style="text-align:center;">' + (pOperationHeader.ChargeableWeight == 0 ? "" : (pOperationHeader.ChargeableWeight + ' KGM')) + '</td>';
                            ReportHTML += '                         </tr>';
                        }
                        ReportHTML += '                         <tr>';
                        ReportHTML += '                             <th style="text-align:center;">PCS</th>';
                        ReportHTML += '                             <td style="text-align:center;">'
                            + (pOperationHeader.NumberOfPackages == 0
                                ? (pOperationHeader.PackageTypes == 0
                                    ? (pOperationHeader.PackageTypesOnContainersTotals)
                                    : pOperationHeader.PackageTypes)
                                : pOperationHeader.NumberOfPackages) + '</td>';
                        ReportHTML += '                         </tr>';
                        ReportHTML += '                         <tr>';
                        ReportHTML += '                             <th style="text-align:center;">BRAND</th>';
                        ReportHTML += '                             <td style="text-align:center;">' + pShipperName + '</td>';
                        ReportHTML += '                         </tr>'
                        ReportHTML += '                         <tr>';
                        ReportHTML += '                             <th style="text-align:center;">SHPR INV</th>';
                        ReportHTML += '                             <td style="text-align:center;">' + (pOperationHeader.CustomerReference == 0 ? "" : pOperationHeader.CustomerReference) + '</td>';
                        ReportHTML += '                         </tr>'
                        ReportHTML += '                         <tr>';
                        ReportHTML += '                             <th style="text-align:center;">COMMD.</th>';
                        ReportHTML += '                             <td style="text-align:center;">' + (pOperationHeader.CommodityName == 0 ? "" : pOperationHeader.CommodityName) + '</td>';
                        ReportHTML += '                         </tr>'
                        ReportHTML += '                         <tr>';
                        ReportHTML += '                             <th style="text-align:center;">CUST PYNT</th>';
                        ReportHTML += '                             <td style="text-align:center;">' + (pInvoiceHeader.LeftSignature == 0 ? "" : pInvoiceHeader.LeftSignature) + '</td>';
                        ReportHTML += '                         </tr>'
                        ReportHTML += '                     </table>';
                        ReportHTML += '                 </div>';

                        ReportHTML += '                 <div class="col-xs-3">';
                        if (pInvoiceHeader.InvoiceTypeName.split(' ')[0].toUpperCase() != "DELIVERY") { //in case of delivery invoice dont add location table
                            ReportHTML += '                     <table class="b-t b-light text-sm table-bordered m-l" style="clear:both; width:100%; border:1px solid #000;">';
                            ReportHTML += '                         <tr>';
                            //ReportHTML += '                             <th rowspan=6 style="text-align:center;">LOCATION</th>';
                            ReportHTML += '                             <th style="text-align:center; width:25%;">LOCATION</th>';
                            //if (pOperationHeader.BLType == constHouseBLType)
                            //    ReportHTML += '                             <td class="" style="text-align:center;">' + (pMasterOperationHeader.Notes == 0 ? "" : pMasterOperationHeader.Notes) + '</td>';
                            //else
                            ReportHTML += '                             <td class="" style="text-align:center;">' + (pOperationHeader.Notes == 0 ? "" : pOperationHeader.Notes) + '</td>';
                            ReportHTML += '                         </tr>';
                            ReportHTML += '                     </table>';
                        }
                        ReportHTML += '                 </div>';

                        ReportHTML += '             <div style="clear:both;"><br></div>';

                        ReportHTML += '                     <div class="col-xs-12 clear">';
                        ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                        ReportHTML += '                             <thead>';
                        ReportHTML += '                                 <tr>';
                        ReportHTML += '                                     <th>Details</th>';
                        ReportHTML += '                                     <th style="width:15%;">' + pInvoiceHeader.CurrencyCode + '</th>';
                        ReportHTML += '                                 </tr>';
                        ReportHTML += '                             </thead>';
                        ReportHTML += '                             <tbody>';
                        $.each(JSON.parse(data[2]), function (i, item) {
                            ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                            ReportHTML += '                                         <td style="text-align:left;">' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                            ReportHTML += '                                         <td style="text-align:right;">' + item.SaleAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            ReportHTML += '                                     </tr>';
                        });
                        ReportHTML += '                                         <tr>';
                        //ReportHTML += '                                             <td colspan=1>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                        ReportHTML += '                                             <td style="text-align:left;" colspan=1>' + '<b>TOTAL ' + '</b></td>';
                        ReportHTML += '                                             <td style="text-align:right;"><b>' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                        ReportHTML += '                                         </tr>';
                        ReportHTML += '                             </tbody>';
                        ReportHTML += '                         </table>';
                        ReportHTML += '                     </div>'

                        //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                        //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + ' / (' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + ')' + '</b>';
                        //ReportHTML += '                         </div>';
                        //ReportHTML += '                         <div class="clear m-l col-xs-6 text-left"><b>ACCOUNTING</b></div>';
                        //ReportHTML += '                         <div class="float-right text-right m-t-n col-xs-6 m-r"><b>APPROVAL</b></div>';
                        ReportHTML += '                         <div class="col-xs-8 m-t-n">';
                        if ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                            ReportHTML += '                             <b>ONLY: ' + toWords_WithFractionNumbers(parseFloat(pInvoiceHeader.Amount).toFixed(2)) + ' </b>' + pInvoiceHeader.CurrencyCode + '</br></br>';
                            ReportHTML += '                             <b><u>Accounts:</u></b></br>';
                            ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                            ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                            ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                            ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                            ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                        }
                        else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                            ReportHTML += '                             <b><u>Accounts:</u></b></br>';
                            ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                        }
                        else {
                            ReportHTML += '</br>';
                        }
                        ReportHTML += '                         </div>';
                        ReportHTML += '                         <div class="col-xs-4 text-right m-t-n">';
                        //ReportHTML += '                             <b>Subtotal: </b>' + pInvoiceHeader.CurrencyCode + ' ' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                        //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + pInvoiceHeader.TaxPercentage + '</br>';
                        if (pTaxAmount != 0)
                            ReportHTML += '                             <b>VAT(' + pInvoiceHeader.TaxPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pTaxAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                        //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + pInvoiceHeader.DiscountPercentage + '</br>';
                        if (pDiscountAmount != 0)
                            ReportHTML += '                             <b>Discount Taxes(' + pInvoiceHeader.DiscountPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pDiscountAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                        ReportHTML += '                             <b>Total: </b>' + pInvoiceHeader.CurrencyCode + ' <b>' + parseFloat(pInvoiceHeader.Amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></br>';
                        ReportHTML += '                         </div>';
                        //ReportHTML += '                     </div>'; //of table-responsive
                        //ReportHTML += '                 </section>';
                        //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                        ReportHTML += '         </body>';

                        ReportHTML += '     <footer class="footer col-xs-12 ' + ($("#cbPrintFooterInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  "" : " hide ") + '" style="width:100%; position:absolute; bottom:0;">';
                        //ReportHTML += '         <div class="row">'

                        //ReportHTML += '         <div class="row text-right m-r m-t-sm">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
                        //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';

                        //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                        //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
                        ReportHTML += '     </footer>';
                        ReportHTML += '</html>';
                        if (1==1) {
                            pFinalReportHTML += ReportHTML;
                            Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                        }
                        else {
                            pFinalReportHTML += ReportHTML;
                            pFinalReportHTML += ' <div class="break"></div>';
                        }
                    }
                } //else if (pDefaults.UnEditableCompanyName == "ABC") {
                else if (pDefaults.UnEditableCompanyName == "ARK") {
                    var ReportHTML = '';
                    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                    //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                    //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + pInvoiceHeader.ConcatenatedInvoiceNumber + ')' + '</h3></div>';
                    ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.ConcatenatedInvoiceNumber.split('/')[1] + '</h3></div>';
                    if (pInvoiceHeader.InvoiceTypeName == "DEBIT NOTE")
                        ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + ' كشف حساب    ' + '</h3></div>';

                    ReportHTML += '                 <div class="col-xs-8">';
                    ReportHTML += '                     <b>' + $("#hDefaultCompanyName").val() + '</b><br>';
                    if (pInvoiceHeader.InvoiceTypeName != "DEBIT NOTE") {
                        ReportHTML += '                     ' + (pAddressLine1 == "" ? "" : (pAddressLine1 + '<br>'));
                        ReportHTML += '                     ' + (pAddressLine2 == "" ? "" : (pAddressLine2 + '<br>'));
                        ReportHTML += '                     ' + (pAddressLine3 == "" ? "" : (pAddressLine3) + '<br>');
                        ReportHTML += '                     ' + (pPhones == "" ? "" : ('TEL:' + pPhones) + '<br>');
                        ReportHTML += '                     ' + (pFaxes == "" ? "" : ('Fax:' + pFaxes)) + '<br><br><br>';
                    }
                    ReportHTML += '                 </div>';

                    ReportHTML += '                 <div class="col-xs-4 m-l-n">';
                    //ReportHTML += '                     <b>Date : </b>' + getTodaysDateInddMMyyyyFormat() + '<br>';
                    ReportHTML += '                     <b>Date : </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '<br>';
                    //ReportHTML += '                     <b>Invoice No : </b>' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(3, 2) + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(8, 2) + '/' + /*pInvoiceNumber*/ConcatenatedInvoiceNumber + '<br>';
                    ReportHTML += '                     <b>No : </b>' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + '<br>';
                    ReportHTML += '                     <b>Payment Due by : </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '<br>';
                    if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                        ReportHTML += '                 <b>Operation : </b>' + pMasterOperationCode;
                    else
                        ReportHTML += '                     <b>Operation : </b>' + (pInvoiceHeader.OperationCode == 0 ? pInvoiceHeader.MasterOperationCode : pInvoiceHeader.OperationCode) + '<br>';
                    ReportHTML += '                     <b>Currency : </b>' + pInvoiceHeader.CurrencyCode + '<br>';
                    if (pInvoiceHeader.InvoiceTypeName.split(' ')[0] == "INVOICE") {
                        ReportHTML += '                     <b>Tax No. : </b>' + (pDefaults.TaxNumber == 0 ? "" : pDefaults.TaxNumber) + '<br>';
                        ReportHTML += '                     <b>VAT ID No. : </b>' + (pDefaults.VatIDNo == 0 ? "" : pDefaults.VatIDNo) + '';
                    }
                    ReportHTML += '                 </div>';
                    //ReportHTML += '             </div>';
                    ReportHTML += '             <table class="col-xs-8 m-l m-t-n-lg b-t b-light text-sm table-bordered" style="clear:both; text-align:left; width:auto; border:solid #000;">';
                    ReportHTML += '                 <td>';
                    ReportHTML += '                     <b>Bill To: </b><br>';
                    ReportHTML += '                     <b>' + pInvoiceHeader.PartnerName + '</b><br>';
                    ReportHTML += '                     ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                    ReportHTML += '                     ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2 + '<br>'));
                    ReportHTML += '                     ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                    ReportHTML += '                     ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                    ReportHTML += '                 </td>';
                    ReportHTML += '             </table>';

                    ReportHTML += '             <div style="clear:both;"><br></div>';
                    if ($("#cbPrintMBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU")
                        ReportHTML += '             <div class="col-xs-6"><b>MB/L No.: </b>' + (pMasterBL == "" ? (pMainRoute.Notes == 0 ? "" : pMainRoute.Notes) : pMasterBL) + '</div>';
                    if ($("#cbPrintHBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ) {
                        if (pHouseBLs != "0")//Master Operation so show all houses on it
                            ReportHTML += '             <div class="col-xs-6"><b>HBL</b>: ' + pHouseBLs + '</div>';
                        else if (pHouseNumber != "0")
                            ReportHTML += '             <div class="col-xs-6"><b>HB/L No.:</b> ' + (pHouseNumber == "" ? "N/A" : pHouseNumber) + '</div>';
                    }
                    ReportHTML += '             <div class="col-xs-6"><b>POL: </b>' + pPOLName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>POD: </b>' + pPODName + '</div>';
                    if (pContainerTypes != 0)
                        ReportHTML += '         <div class="col-xs-6"><b>Volume: </b>' + (pContainerTypes == 0 ? "N/A" : pContainerTypes) + '</div>';
                    else if (pPackageTypes != 0)
                        ReportHTML += '         <div class="col-xs-6"><b>Volume: </b>' + (pPackageTypes == 0 ? "N/A" : pPackageTypes) + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Shipment Category: </b>' + pShipmentTypeCode + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Shipper: </b>' + pShipperName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Consignee: </b>' + pConsigneeName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Customer Ref. : </b>' + (pOperationHeader.CustomerReference == 0 ? "" : pOperationHeader.CustomerReference) + '</div>';
                    ReportHTML += '                     <div class="col-xs-12 clear">';
                    ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    ReportHTML += '                                     <th>Description</th>';
                    ReportHTML += '                                     <th>Quantity</th>';
                    ReportHTML += '                                     <th>Unit Price</th>';
                    ReportHTML += '                                     <th>Sale Price</th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    $.each(JSON.parse(data[2]), function (i, item) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + ($("#cbAddNotesToItems").prop("checked") ? (item.Notes == 0 || item.Notes == "" ? "" : '-' + item.Notes) : "") + '</td>';
                        ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                        ReportHTML += '                                         <td>' + item.SalePrice + '</td>';
                        ReportHTML += '                                         <td>' + item.SaleAmount + '</td>';
                        ReportHTML += '                                     </tr>';
                    });
                    if (pInvoiceHeader.FixedDiscount > 0) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + 'Special Discount' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2) + '</td>';
                        ReportHTML += '                                     </tr>';
                    }
                    //ReportHTML += '                                         <tr>';
                    //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                             <td><b>' + pInvoiceHeader.Amount + '</b></td>';
                    //ReportHTML += '                                         </tr>';

                    //ReportHTML += '                                         <tr>';
                    //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                             <td><b>Total Amount : ' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                         </tr>';
                    ReportHTML += '                             </tbody>';
                    ReportHTML += '                         </table>';
                    ReportHTML += '                     </div>'
                    //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                    //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + ' / (' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + ')' + '</b>';
                    //ReportHTML += '                         </div>';
                    //ReportHTML += '                         <div class="clear m-l col-xs-6 text-left"><b>ACCOUNTING</b></div>';
                    //ReportHTML += '                         <div class="float-right text-right m-t-n col-xs-6 m-r"><b>APPROVAL</b></div>';
                    if ($("#cbLargeInvoice").prop("checked")) {
                        ReportHTML += '         <div class="col-xs-12 m-t-n">Please, see attachment.</div>';
                        ReportHTML += '         <div class="break"></div>';
                    }
                    else
                        ReportHTML += '                         <div class="col-xs-12 m-t-n"></div>';
                    ReportHTML += '                         <div class="col-xs-6">';
                    //if ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                    //    ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                    //    ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                    //    ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                    //    ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                    //    ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                    //    ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                    //}
                    //else
                    if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                    }
                    else {
                        ReportHTML += '</br>';
                    }
                    ReportHTML += '                         </div>';
                    ReportHTML += '                         <div class="col-xs-6 text-right">';
                    if (pTaxAmount != 0 || pDiscountAmount != 0) {
                        ReportHTML += '                             <b>Subtotal: </b>' + pInvoiceHeader.CurrencyCode + ' ' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                        //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + pInvoiceHeader.TaxPercentage + '</br>';
                        if (pTaxAmount != 0)
                            ReportHTML += '                             <b>VAT(' + pInvoiceHeader.TaxPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pTaxAmount.toFixed(2) + '</br>';
                        //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + pInvoiceHeader.DiscountPercentage + '</br>';
                        if (pDiscountAmount != 0)
                            ReportHTML += '                             <b>Deduction Tax(' + pInvoiceHeader.DiscountPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pDiscountAmount.toFixed(2) + '</br>';
                    }
                    ReportHTML += '                             <b>Total: </b>' + pInvoiceHeader.CurrencyCode + ' <b>' + parseFloat(pInvoiceHeader.Amount).toFixed(2) + '</b></br>';
                    ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(parseFloat(pInvoiceHeader.Amount).toFixed(2)) + ' ' + pInvoiceHeader.CurrencyCode + '</br>';
                    ReportHTML += '                         </div>';
                    //ReportHTML += '                     </div>'; //of table-responsive
                    //ReportHTML += '                 </section>';
                    //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                    ReportHTML += '         </body>';

                    ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftPosition != 0 ? pDefaultsRow.InvoiceLeftPosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddlePosition != 0 ? pDefaultsRow.InvoiceMiddlePosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightPosition != 0 ? pDefaultsRow.InvoiceRightPosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                 </div>'
                    ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftSignature != 0 ? pDefaultsRow.InvoiceLeftSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddleSignature != 0 ? pDefaultsRow.InvoiceMiddleSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightSignature != 0 ? pDefaultsRow.InvoiceRightSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                 </div>'
                    if ($("#cbPrintStamp").prop("checked"))
                        ReportHTML += '         <div class="text-right m-r-lg"><img src="/Content/Images/CompanyStamp.jpg" alt="stamp"/></div>';

                    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                    if (pInvoiceHeader.InvoiceTypeName.split(' ')[0] == "INVOICE") {
                        ReportHTML += '         <div class="row text-right m-r m-t-sm">' + '  لا تعتبر الفاتورة مسددة الا بإيصال رسمي مختوم من الشركة  ' + '</div>';
                        ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض علي أي بند من بنود الفاتورة من خلال 14 يوما فقط من تاريخ الاستلام وفقاً للقانون  ' + '</div>';
                    }
                    if (pInvoiceHeader.InvoiceTypeName == "DEBIT NOTE") {
                        ReportHTML += '         <div class="row text-right m-r m-t-sm">' + '  البنود أعلاه تمثل رسوم تم سدادها بالنيابة عنكم أمام الجهات المختصة وليست خدمات أو أعمال مقدمة منا  ' + '</div>';
                        ReportHTML += '         <div class="row text-right m-r">' + '  لا يعتبر كشف الحساب مسددة الا بإيصال رسمي مختوم من الشركة   ' + '</div>';
                        ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض علي أي بند من بنود كشف الحساب خلال 14 يوما فقط من تاريخ الاستلام وفقاً للقانون   ' + '</div>';
                    }
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                    if (1==1) {
                        pFinalReportHTML += ReportHTML;
                        Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                    }
                    else {
                        pFinalReportHTML += ReportHTML;
                        pFinalReportHTML += ' <div class="break"></div>';
                    }
                } //else if (pDefaults.UnEditableCompanyName != "ARK") {
                else if (pDefaults.UnEditableCompanyName == "CQL") {

                    var ReportHTML = '';
                    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                    //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                    if (!$("#cbPrintHeaderInvoice").prop("checked"))
                        ReportHTML += '                 <div class="col-xs-12 text-center">&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br></div>';
                    //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + pInvoiceHeader.ConcatenatedInvoiceNumber + ')' + '</h3></div>';
                    ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.ConcatenatedInvoiceNumber.split('/')[1] + '</h3></div>';
                    ReportHTML += '                 <div class="col-xs-8">';
                    ReportHTML += '                     <b>' + $("#hDefaultCompanyName").val() + '</b><br>';
                    ReportHTML += '                     ' + (pAddressLine1 == "" ? "" : (pAddressLine1 + '<br>'));
                    ReportHTML += '                     ' + (pAddressLine2 == "" ? "" : (pAddressLine2 + '<br>'));
                    ReportHTML += '                     ' + (pAddressLine3 == "" ? "" : (pAddressLine3) + '<br>');
                    ReportHTML += '                     ' + (pPhones == "" ? "" : ('TEL:' + pPhones) + '<br>');
                    ReportHTML += '                     ' + (pFaxes == "" ? "" : ('Fax:' + pFaxes)) + '<br><br><br>';
                    ReportHTML += '                 </div>';

                    ReportHTML += '                 <div class="col-xs-4 m-l-n">';
                    //ReportHTML += '                     <b>Date : </b>' + getTodaysDateInddMMyyyyFormat() + '<br>';
                    ReportHTML += '                     <b>Date : </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '<br>';
                    //ReportHTML += '                     <b>Invoice No : </b>' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(3, 2) + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(8, 2) + '/' + /*pInvoiceNumber*/ConcatenatedInvoiceNumber + '<br>';
                    ReportHTML += '                     <b>No : </b>' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + '<br>';
                    ReportHTML += '                     <b>Payment Due by : </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '<br>';
                    ReportHTML += '                     <b>Reference No. : </b>' + (pCustomerReference == 0 ? "N/A" : pCustomerReference) + '<br>';
                    if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                        ReportHTML += '                 <b>Operation : </b>' + pMasterOperationCode;
                    else
                        ReportHTML += '                     <b>Operation : </b>' + (pInvoiceHeader.OperationCode == 0 ? pInvoiceHeader.MasterOperationCode : pInvoiceHeader.OperationCode) + '<br>';
                    ReportHTML += '                     <b>Currency : </b>' + pInvoiceHeader.CurrencyCode + '<br>';
                    ReportHTML += '                     <b>Salesman : </b>' + pSalesman + '<br><br>';
                    ReportHTML += '                 </div>';
                    //ReportHTML += '             </div>';
                    ReportHTML += '             <table class="col-xs-8 m-l m-t-n-lg b-t b-light text-sm table-bordered" style="text-align:left; width:auto; border:solid #000;">';
                    ReportHTML += '                 <td>';
                    ReportHTML += '                     <b>Bill To: </b><br>';
                    ReportHTML += '                     <b>' + pInvoiceHeader.PartnerName + '</b><br>';
                    ReportHTML += '                     ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                    ReportHTML += '                     ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2 + '<br>'));
                    ReportHTML += '                     ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                    ReportHTML += '                     ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                    ReportHTML += '                 </td>';
                    ReportHTML += '             </table>';

                    ReportHTML += '             <div style="clear:both;"><br></div>';
                    if ($("#cbPrintMBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU")
                        ReportHTML += '             <div class="col-xs-6"><b>MB/L No.: </b>' + pMasterBL + '</div>';
                    if ($("#cbPrintHBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ) {
                        if (pHouseBLs != "0")//Master Operation so show all houses on it
                            ReportHTML += '             <div class="col-xs-6"><b>HBL</b>: ' + pHouseBLs + '</div>';
                        else if (pHouseNumber != "0")
                            ReportHTML += '             <div class="col-xs-6"><b>HB/L No.:</b> ' + (pHouseNumber == "" ? "N/A" : pHouseNumber) + '</div>';
                    }
                    ReportHTML += '             <div class="col-xs-6"><b>POL: </b>' + pPOLName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>POD: </b>' + pPODName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Weight: </b>' + pGrossWeightSum + ' KG</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>CBM: </b>' + pCBM + ' CBM</div>';
                    if (pContainerTypes != 0)
                        ReportHTML += '         <div class="col-xs-6"><b>Volume: </b>' + (pContainerTypes == 0 ? "N/A" : pContainerTypes) + '</div>';
                    else if (pPackageTypes != 0)
                        ReportHTML += '         <div class="col-xs-6"><b>Volume: </b>' + (pPackageTypes == 0 ? "N/A" : pPackageTypes) + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Shipment Category: </b>' + pShipmentTypeCode + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Shipment Term: </b>' + pIncotermName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Shipper: </b>' + pShipperName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Consignee: </b>' + pConsigneeName + '</div>';
                    ReportHTML += '                     <div class="col-xs-12 clear">';
                    ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    ReportHTML += '                                     <th>Description</th>';
                    ReportHTML += '                                     <th>Quantity</th>';
                    ReportHTML += '                                     <th>Unit Price</th>';
                    ReportHTML += '                                     <th>Sale Price</th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    $.each(JSON.parse(data[2]), function (i, item) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                        ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                        ReportHTML += '                                         <td>' + item.SalePrice + '</td>';
                        ReportHTML += '                                         <td>' + item.SaleAmount + '</td>';
                        ReportHTML += '                                     </tr>';
                    });
                    if (pInvoiceHeader.FixedDiscount > 0) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + 'Special Discount' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2) + '</td>';
                        ReportHTML += '                                     </tr>';
                    }
                    //ReportHTML += '                                         <tr>';
                    //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                             <td><b>' + pInvoiceHeader.Amount + '</b></td>';
                    //ReportHTML += '                                         </tr>';

                    ReportHTML += '                             </tbody>';
                    ReportHTML += '                         </table>';
                    ReportHTML += '                     </div>'
                    //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                    //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + ' / (' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + ')' + '</b>';
                    //ReportHTML += '                         </div>';
                    //ReportHTML += '                         <div class="clear m-l col-xs-6 text-left"><b>ACCOUNTING</b></div>';
                    //ReportHTML += '                         <div class="float-right text-right m-t-n col-xs-6 m-r"><b>APPROVAL</b></div>';
                    if ($("#cbLargeInvoice").prop("checked")) {
                        ReportHTML += '         <div class="col-xs-12 m-t-n">Please, see attachment.</div>';
                        ReportHTML += '         <div class="break"></div>';
                    }
                    else
                        ReportHTML += '                         <div class="col-xs-12 m-t-n"></div>';
                    ReportHTML += '                         <div class="col-xs-7">';
                    if ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                        ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                        ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                        ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                        ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                    }
                    else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                    }
                    else {
                        ReportHTML += '</br>';
                    }
                    ReportHTML += '                         </div>';
                    ReportHTML += '                         <div class="col-xs-5 text-right">';
                    if (pTaxAmount != 0 || pDiscountAmount != 0)
                        ReportHTML += '                             <b>Subtotal: </b>' + pInvoiceHeader.CurrencyCode + ' ' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                    //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + pInvoiceHeader.TaxPercentage + '</br>';
                    if (pTaxAmount != 0)
                        ReportHTML += '                             <b>VAT(' + pInvoiceHeader.TaxPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pTaxAmount + '</br>';
                    //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + pInvoiceHeader.DiscountPercentage + '</br>';
                    if (pDiscountAmount != 0)
                        ReportHTML += '                             <b>Discount Taxes(' + pInvoiceHeader.DiscountPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pDiscountAmount + '</br>';
                    ReportHTML += '                             <b>Total: </b>' + pInvoiceHeader.CurrencyCode + ' <b>' + pInvoiceHeader.Amount + '</b></br>';
                    ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</br>';
                    ReportHTML += '                         </div>';
                    //ReportHTML += '                     </div>'; //of table-responsive
                    //ReportHTML += '                 </section>';
                    //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                    ReportHTML += '         </body>';

                    ReportHTML += '     <footer class="footer col-xs-12 ' + ($("#cbPrintFooterInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  "" : " hide ") + '" style="width:100%; position:absolute; bottom:0;">';
                    //ReportHTML += '         <div class="row">'
                    //ReportHTML += '             <div class="col-xs-8 m-l"><b><i>' + ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.DirectionType").text() == 1
                    //                                                                ? 'Import Manager'
                    //                                                                : ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.DirectionType").text() == 2 ? 'Export Manager' : 'Domestic Manager')
                    //                                                                ) + '</i></b></div>';
                    //ReportHTML += '             <div class="col-xs-4 m-t-n-md float-right"><b><i>Accountant Signature</i></b></div>';
                    //ReportHTML += '         </div>'
                    //ReportHTML += '         <div class="row text-right m-r m-t-sm">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
                    //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
                    //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                    //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                    if (1==1) {
                        pFinalReportHTML += ReportHTML;
                        Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                    }
                    else {
                        pFinalReportHTML += ReportHTML;
                        pFinalReportHTML += ' <div class="break"></div>';
                    }
                } //EOF if (pDefaults.UnEditableCompanyName == "CQL")
                else if (pDefaults.UnEditableCompanyName == "NAV") {

                    var ReportHTML = '';
                    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                    //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                    //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + pInvoiceHeader.ConcatenatedInvoiceNumber + ')' + '</h3></div>';
                    ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + '</h3></div>';
                    //ReportHTML += '                 <div class="col-xs-8">';
                    //ReportHTML += '                     <table class="col-xs-12 b-t b-light text-sm table-bordered" style="text-align:left; width:auto; border:solid #000;">';
                    //ReportHTML += '                         <td>';
                    //ReportHTML += '                             <b>Bill To: </b><br>';
                    //ReportHTML += '                             <b>' + pInvoiceHeader.PartnerName + '</b><br>';
                    ////ReportHTML += '                             ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                    ////ReportHTML += '                             ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2 + '<br>'));
                    ////ReportHTML += '                             ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                    ////ReportHTML += '                             ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                    //ReportHTML += '                         </td>';
                    //ReportHTML += '                     </table>';

                    //ReportHTML += '                 </div>';


                    //ReportHTML += '                 <div class="col-xs-4 m-l-n">';
                    ////ReportHTML += '                     <b>Date : </b>' + getTodaysDateInddMMyyyyFormat() + '<br>';
                    //ReportHTML += '                     <b>InvoiceDate : </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '<br>';
                    //ReportHTML += '                     <b>Payment Date : </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '<br>';
                    ////ReportHTML += '                     <b>No : </b>' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + '<br>';
                    ////ReportHTML += '                     <b>Payment Due by : </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '<br>';
                    //ReportHTML += '                     <b>Reference No. : </b>' + (pCustomerReference == 0 ? "N/A" : pCustomerReference) + '<br>';
                    //ReportHTML += '                     <b>Operation : </b>' + (pInvoiceHeader.OperationCode == 0 ? pInvoiceHeader.MasterOperationCode : pInvoiceHeader.OperationCode) + '<br>';
                    //if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                    //    ReportHTML += '                 <b>Master Operation : </b>' + pMasterOperationCode;
                    //ReportHTML += '                     <b>Currency : </b>' + pInvoiceHeader.CurrencyCode + '<br>';
                    ////ReportHTML += '                     <b>Salesman : </b>' + pSalesman + '<br><br>';
                    //ReportHTML += '                 </div>';
                    ////ReportHTML += '             </div>';

                    ////ReportHTML += '             <div style="clear:both;"><br></div>';
                    //ReportHTML += '         <div class="col-xs-1 m-l-n-md"><img src="/Content/Images/' + 'InvoiceSideStatement-NAV.jpg' + '" alt="logo"/></div>';
                    //ReportHTML += '         <div class="col-xs-11 m-l-n-lg">';
                    ReportHTML += '         <div class="col-xs-12">';
                    ReportHTML += '             <div class="col-xs-6"><b>Bill to: </b>' + pInvoiceHeader.PartnerName + '</div>';
                    ReportHTML += '             <div class="col-xs-3"><b>Inv.Date: </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '</div>';
                    ReportHTML += '             <div class="col-xs-3"><b>Pay.Date: </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Address: </b>';
                    ReportHTML += '                 ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                    ReportHTML += '                 ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2));
                    ReportHTML += '                 ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                    ReportHTML += '                 ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                    ReportHTML += '             </div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Reference No.: </b>' + (pCustomerReference == 0 ? "N/A" : pCustomerReference) + '</div>';
                    if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                        ReportHTML += '             <div class="col-xs-6"><b>Operation: </b>' + pMasterOperationCode + '</div>';
                    else
                        ReportHTML += '             <div class="col-xs-6"><b>Operation: </b>' + (pInvoiceHeader.OperationCode == 0 ? pInvoiceHeader.MasterOperationCode : pInvoiceHeader.OperationCode) + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Currency: </b>' + pInvoiceHeader.CurrencyCode + '</div>';
                    if ($("#cbPrintMBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU")
                        ReportHTML += '             <div class="col-xs-6"><b>MB/L No.: </b>' + pMasterBL + '</div>';
                    if ($("#cbPrintHBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ) {
                        if (pHouseBLs != "0")//Master Operation so show all houses on it
                            ReportHTML += '             <div class="col-xs-6"><b>HBL</b>: ' + pHouseBLs + '</div>';
                        else
                            ReportHTML += '             <div class="col-xs-6"><b>HB/L No.:</b> ' + (pHouseNumber == "" || pHouseNumber == "0" ? "" : pHouseNumber) + '</div>';
                    }
                    ReportHTML += '             <div class="col-xs-6"><b>POL: </b>' + pPOLName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>POD: </b>' + pPODName + '</div>';
                    ReportHTML += '         <div class="col-xs-6"><b>ETD POL: </b>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.ExpectedDeparture)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.ExpectedDeparture))) + '</div>';
                    ReportHTML += '         <div class="col-xs-6"><b>ETA POD: </b>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.ExpectedArrival)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.ExpectedArrival))) + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Weight: </b>' + pGrossWeightSum + ' KG</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>CBM: </b>' + pCBM + ' CBM</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>PO Number: </b>' + (pOperationHeader.PONumber == 0 ? "" : pOperationHeader.PONumber) + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Line: </b>' + (pOperationHeader.LineName == 0 ? "" : pOperationHeader.LineName) + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Voy/Truck No: </b>' + (pOperationHeader.VoyageOrTruckNumber == 0 ? "" : pOperationHeader.VoyageOrTruckNumber) + '</div>';
                    if (pOperationHeader.TransportType == OceanTransportType) {
                        ReportHTML += '             <div class="col-xs-6"><b>Vessel: </b>' + pVesselName + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Arrival Date: </b>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.ActualArrival)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.ActualArrival))) + '</div>';
                        ReportHTML += '         <div class="col-xs-6"><b>Containers: </b>' + (pOperationHeader.ShipmentType == 0 || pOperationHeader.ShipmentType == 2 || pOperationHeader.ShipmentType == 4 ? "LCL" : pContainerTypes) + '</div>';
                        ReportHTML += '         <div class="col-xs-6"><b>Container Numbers: </b>' + pContainerNumbers + '</div>';
                    }
                    if (pOperationHeader.PackageTypes != 0 || pOperationHeader.PackageTypesOnContainersTotals != 0 || pOperationHeader.PlacedOnOperationContainersAndPackagesID != 0)
                        ReportHTML += '         <div class="col-xs-6"><b>Packages: </b>' + (pOperationHeader.PackageTypes == 0 ? (pOperationHeader.PackageTypesOnContainersTotals == 0 ? (pOperationHeader.PlacedOnOperationContainersAndPackagesID == 0 ? "0" : pOperationHeader.PlacedOnOperationContainersAndPackagesID) : pOperationHeader.PackageTypesOnContainersTotals) : pOperationHeader.PackageTypes) + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Shipment Category: </b>' + pShipmentTypeCode + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Shipment Term: </b>' + pIncotermName + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Shipper: </b>' + pShipperName + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Consignee: </b>' + pConsigneeName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Weight: </b>' + pGrossWeightSum + ' KGM' + '</div>';
                    if (pOperationHeader.CertificateNumber != 0)
                        ReportHTML += '         <div class="col-xs-6"><b>Certificate No: </b>' + (pOperationHeader.CertificateNumber == 0 ? "" : pOperationHeader.CertificateNumber) + '</div>';
                    //(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.ActualArrival)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.ActualArrival)))
                    ReportHTML += '                     <div class="col-xs-12 clear">';
                    ReportHTML += '                         <table id="tblReportInvoice" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    ReportHTML += '                                     <th>S</th>';
                    ReportHTML += '                                     <th>Description</th>';
                    ReportHTML += '                                     <th>Price</th>';
                    ReportHTML += '                                     <th>Currency</th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    debugger;
                    $.each(JSON.parse(data[2]), function (i, item) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + (i + 1) + '</td>';
                        ReportHTML += '                                         <td>' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                        ReportHTML += '                                         <td>' + item.SaleAmount + '</td>';
                        ReportHTML += '                                         <td>' + item.CurrencyCode + '</td>';
                        ReportHTML += '                                     </tr>';
                    });
                    if (pInvoiceHeader.FixedDiscount > 0) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + 'Special Discount' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2) + '</td>';
                        ReportHTML += '                                     </tr>';
                    }
                    //ReportHTML += '                                         <tr>';
                    //ReportHTML += '                                             <td colspan=2>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                             <td><b>' + pInvoiceHeader.Amount + '</b></td>';
                    //ReportHTML += '                                             <td>' + pInvoiceHeader.CurrencyCode + '</td>';
                    //ReportHTML += '                                         </tr>';
                    //$("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")

                    //ReportHTML += '                                         <tr>';
                    //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                             <td><b>Total Amount : ' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                         </tr>';
                    ReportHTML += '                             </tbody>';
                    ReportHTML += '                         </table>';
                    ReportHTML += '                     </div>'

                    if ($("#cbLargeInvoice").prop("checked")) {
                        ReportHTML += '         <div class="col-xs-12 m-t-n">Please, see attachment.</div>';
                        ReportHTML += '         <div class="break"></div>';
                    }
                    else
                        ReportHTML += '                         <div class="col-xs-12 m-t-n"></div>';
                    ReportHTML += '                         <div class="col-xs-8">';
                    if ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                        ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                        ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                        ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                        ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                    }
                    else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                    }
                    else
                        ReportHTML += '                             <br>';
                    ReportHTML += '                         </div>';
                    ReportHTML += '                         <div class="col-xs-4 text-right">';
                    ReportHTML += '                             <b>Subtotal: </b>' + pInvoiceHeader.CurrencyCode + ' ' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                    //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + pInvoiceHeader.TaxPercentage + '</br>';
                    ReportHTML += '                             <b>VAT(' + pInvoiceHeader.TaxPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pTaxAmount + '</br>';
                    //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + pInvoiceHeader.DiscountPercentage + '</br>';
                    ReportHTML += '                             <b>Discount Taxes(' + pInvoiceHeader.DiscountPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pDiscountAmount + '</br>';
                    ReportHTML += '                             <b>Total: </b>' + pInvoiceHeader.CurrencyCode + ' <b>' + pInvoiceHeader.Amount + '</b></br>';
                    ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</br>';
                    if ($("#cbPrintUSDTotal").prop("checked") && pInvoiceHeader.CurrencyCode.trim() == "EGP")
                        ReportHTML += '                             <b>USD Total: </b>' + ' <b>' + (pInvoiceHeader.Amount / $("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")).toFixed(2) + '</b></br>';
                    ReportHTML += '                         </div>';

                    //ReportHTML += '                     </div>'; //of table-responsive
                    //ReportHTML += '                 </section>';
                    //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                    ReportHTML += '             </div>'; //
                    ReportHTML += '         </body>';

                    //ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    //ReportHTML += '                     <div class="col-xs-3 m-t"><b>' + 'Accounting Manager' + '</b></div>';
                    //ReportHTML += '                     <div class="col-xs-2 m-t text-center"><b>' + 'Auditing' + '</b></div>';
                    //ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + 'Customer Service Supervisor' + '</b></div>';
                    //ReportHTML += '                     <div class="col-xs-3 m-t text-center"><b>' + 'Preparation' + '</b></div>';
                    //ReportHTML += '                 </div>'
                    //ReportHTML += '                 <div class="m-t" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    //ReportHTML += '                     <div class="col-xs-3 m-t-sm"><b>' + '....................................' + '</b></div>';
                    //ReportHTML += '                     <div class="col-xs-2 m-t-sm text-center"><b>' + '..................' + '</b></div>';
                    //ReportHTML += '                     <div class="col-xs-4 m-t-sm text-center"><b>' + '......................................................' + '</b></div>';
                    //ReportHTML += '                     <div class="col-xs-3 m-t-sm text-center">' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                    //ReportHTML += '                 </div>'

                    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                    //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
                    if (pInvoiceHeader.ConcatenatedInvoiceNumber.split('/')[1].split(' ')[0].toUpperCase() != "DEBIT") {
                        ReportHTML += '         <div class="row text-right m-r" style="font-size:85%;">' + '  شركة نافيجيتور ايجيبت للخدماث الملاحية - سجل تجاري رقم: 67992  -  سجل تجاري شرق – الاسكندرية - بطاقة ضريبية رقم: 328197459 - ملف ضريبي: 08-00-554-00040-5 -  مامورية ضرائب رمل ثان – الاسكندرية - تسجيل مبيعات: 328197459 -  ترخيص بمكتب تخليص جمركي: 5862/ 2002067 / 1  - بطاقة استيرادية: 49485  ' + '</div>';
                    }
                    //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                    //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
                    ReportHTML += '         <div class="row text-center m-t ' + ($("#cbPrintFooterInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  "" : " hide ") + '"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    //else
                    //    ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                    if (1==1) {
                        pFinalReportHTML += ReportHTML;
                        Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                    }
                    else {
                        pFinalReportHTML += ReportHTML;
                        pFinalReportHTML += ' <div class="break"></div>';
                    }
                } //EOF if (pDefaults.UnEditableCompanyName == "NAV")
                else if (pDefaults.UnEditableCompanyName == "NIL") {

                    var ReportHTML = '';
                    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                    //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                    //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + pInvoiceHeader.ConcatenatedInvoiceNumber + ')' + '</h3></div>';
                    ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + (pInvoiceHeader.InvoiceTypeName == "DRAFT" ? "Proforma Invoice" : pInvoiceHeader.InvoiceTypeName) + ' No. ' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + '</h3></div>';

                    ////ReportHTML += '             <div style="clear:both;"><br></div>';
                    //ReportHTML += '         <div class="col-xs-1 m-l-n-md"><img src="/Content/Images/' + 'InvoiceSideStatement.jpg' + '" alt="logo"/></div>';
                    //ReportHTML += '         <div class="col-xs-11 m-l-n-lg">';
                    ReportHTML += '         <div class="col-xs-12">';
                    ReportHTML += '             <div class="col-xs-9"><b>Bill to: </b>' + pInvoiceHeader.PartnerName + '</div>';
                    ReportHTML += '             <div class="col-xs-3"><b>Inv.Date: </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '</div>';
                    ReportHTML += '             <div class="col-xs-9"><b>Address: </b>';
                    ReportHTML += '                 ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                    ReportHTML += '                 ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2));
                    ReportHTML += '                 ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                    ReportHTML += '                 ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                    ReportHTML += '             </div>';
                    ReportHTML += '             <div class="col-xs-3"><b>Due Date: </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '</div>';

                    ReportHTML += '             <div class="col-xs-12 b-b b-dark m-t-n-xs" style="clear:both;"></div>';

                    if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                        ReportHTML += '             <div class="col-xs-6" style="clear:both;"><b>Operation: </b>' + pMasterOperationCode + '</div>';
                    else
                        ReportHTML += '             <div class="col-xs-6" style="clear:both;"><b>Operation: </b>' + (pInvoiceHeader.OperationCode == 0 ? pInvoiceHeader.MasterOperationCode : pInvoiceHeader.OperationCode) + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Service Scope: </b>' + (pOperationHeader.MoveTypeName == 0 ? "" : pOperationHeader.MoveTypeName) + '</div>';
                    //if ($("#cbPrintMBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU")
                    ReportHTML += '             <div class="col-xs-6"><b>' + (pOperationHeader.TransportType == AirTransportType ? 'AWB' : 'MB/L No.') + ': </b>' + pMasterBL + '</div>';
                    //if ($("#cbPrintHBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ) {
                    //    if (pHouseBLs != "0")//Master Operation so show all houses on it
                    //        ReportHTML += '             <div class="col-xs-6"><b>HBL</b>: ' + pHouseBLs + '</div>';
                    //    else
                    //        ReportHTML += '             <div class="col-xs-6"><b>HB/L No.:</b> ' + (pHouseNumber == "" || pHouseNumber == "0" ? "" : pHouseNumber) + '</div>';
                    //}
                    ReportHTML += '             <div class="col-xs-6"><b>Carrier: </b>' + (pOperationHeader.LineName == 0 ? "" : pOperationHeader.LineName) + '</div>';
                    ReportHTML += '             <div class="col-xs-6" style="clear:both"><b>POL: </b>' + pPOLName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>POD: </b>' + pPODName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Shipper: </b>' + pShipperName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Consignee: </b>' + pConsigneeName + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Weight: </b>' + pGrossWeightSum + ' KG</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>CBM: </b>' + pCBM + ' CBM</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Ref / PO No.: </b>' + (pOperationHeader.PONumber == 0 ? (pMasterOperationHeader == null || pMasterOperationHeader.PONumber == 0 ? "" : pMasterOperationHeader.PONumber) : pOperationHeader.PONumber) + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Weight: </b>' + pOperationHeader.GrossWeightSum + ' KG ' + (pOperationHeader.PackageTypes == 0 ? (pOperationHeader.ContainerTypes == 0 ? "" : (" - " + pOperationHeader.ContainerTypes)) : (" - " + pOperationHeader.PackageTypes)) + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Incoterm: </b>' + (pOperationHeader.IncotermName == 0 ? "" : pOperationHeader.IncotermName) + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Volume: </b>' + (pOperationHeader.Volume == 0 ? (pOperationHeader.VolumeSum == 0 ? "" : pOperationHeader.VolumeSum) : pOperationHeader.Volume) + ' CBM' + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Currency: </b>' + pInvoiceHeader.CurrencyCode + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Commodity: </b>' + (pOperationHeader.CommodityName == 0 ? "" : pOperationHeader.CommodityName) + '</div>';

                    //if (pOperationHeader.TransportType == OceanTransportType) {
                    //    ReportHTML += '         <div class="col-xs-6"><b>Vessel: </b>' + pVesselName + '</div>';
                    //}
                    ////for inland shipping line is written in LeftSignature
                    //if (pOperationHeader.TransportType == InlandTransportType) {
                    //    ReportHTML += '         <div class="col-xs-6"><b>Shipping Line: </b>' + (pInvoiceHeader.LeftSignature == 0 ? "" : pInvoiceHeader.LeftSignature) + '</div>';
                    //}
                    //if (pOperationHeader.TransportType != AirTransportType) {
                    //    ReportHTML += '         <div class="col-xs-6"><b>Arrival Date: </b>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.ActualArrival)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.ActualArrival))) + '</div>';
                    //    ReportHTML += '         <div class="col-xs-6"><b>Containers: </b>' + (pOperationHeader.ShipmentType == 0 || pOperationHeader.ShipmentType == 2 || pOperationHeader.ShipmentType == 4 ? "LCL" : pContainerTypes) + '</div>';
                    //    ReportHTML += '         <div class="col-xs-6"><b>Container Numbers: </b>' + pContainerNumbers + '</div>';
                    //}
                    //if (pOperationHeader.PackageTypes != 0 || pOperationHeader.PackageTypesOnContainersTotals != 0 || pOperationHeader.PlacedOnOperationContainersAndPackagesID != 0)
                    //    ReportHTML += '         <div class="col-xs-6"><b>Packages: </b>' + (pOperationHeader.PackageTypes == 0 ? (pOperationHeader.PackageTypesOnContainersTotals == 0 ? (pOperationHeader.PlacedOnOperationContainersAndPackagesID == 0 ? "0" : pOperationHeader.PlacedOnOperationContainersAndPackagesID) : pOperationHeader.PackageTypesOnContainersTotals) : pOperationHeader.PackageTypes) + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Shipment Category: </b>' + pShipmentTypeCode + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Shipment Term: </b>' + pIncotermName + '</div>';
                    //if (pOperationHeader.CertificateNumber != 0)
                    //    ReportHTML += '         <div class="col-xs-6"><b>Certificate: </b>' + pOperationHeader.CertificateNumber + '</div>';


                    if ($("#cbLargeInvoice").prop("checked")) {
                        ReportHTML += '         <div class="col-xs-12" style="margin-top:250px;font-size:200%;">Please, see attachment for details.</div>';
                        ReportHTML += '         <div class="break"></div>';
                    }
                    else
                        ReportHTML += '                         <div class="col-xs-12"></div>';

                    ReportHTML += '             <div class="col-xs-12 clear">';
                    ReportHTML += '                 <table id="tblReportInvoice" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                     <thead>';
                    ReportHTML += '                         <tr>';
                    ReportHTML += '                             <th>No.</th>';
                    ReportHTML += '                             <th>Description</th>';
                    ReportHTML += '                             <th>Qty</th>';
                    ReportHTML += '                             <th>Unit Price</th>';
                    ReportHTML += '                             <th>Amount</th>';
                    ReportHTML += '                         </tr>';
                    ReportHTML += '                     </thead>';
                    ReportHTML += '                     <tbody>';
                    $.each(JSON.parse(data[2]), function (i, item) {
                        ReportHTML += '                         <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                             <td style="width:5%;">' + (i + 1) + '</td>';
                        ReportHTML += '                             <td style="text-align:left;">' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                        ReportHTML += '                             <td>' + item.Quantity + '</td>';
                        ReportHTML += '                             <td style="width:15%;">' + item.SalePrice.toFixed(2) + '</td>';
                        ReportHTML += '                             <td style="width:15%;">' + item.SaleAmount.toFixed(2) + '</td>';
                        ReportHTML += '                         </tr>';
                    });
                    if (pInvoiceHeader.FixedDiscount > 0) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td style="text-align:left;">' + 'Special Discount' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2) + '</td>';
                        ReportHTML += '                                     </tr>';
                    }
                    ReportHTML += '                                         <tr>';
                    ReportHTML += '                                             <td colspan=5 style="">' + '<b>ONLY : </b>' + toWords_WithFractionNumbers(parseFloat(pInvoiceHeader.Amount).toFixed(2)) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    ReportHTML += '                                         </tr>';
                    ReportHTML += '                             </tbody>';
                    ReportHTML += '                         </table>';
                    ReportHTML += '                     </div>'
                    //if ($("#cbLargeInvoice").prop("checked")) {
                    //    ReportHTML += '         <div class="col-xs-12">Please, see attachment.</div>';
                    //    ReportHTML += '         <div class="break"></div>';
                    //}
                    //else
                    //    ReportHTML += '                         <div class="col-xs-12"></div>';
                    ReportHTML += '                         <div class="col-xs-8 m-t-n">';
                    if ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                        ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                        ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                        ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                        ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                    }
                    else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                    }
                    else
                        ReportHTML += '                             <br>';
                    ReportHTML += '                         </div>';
                    ReportHTML += '                         <div class="col-xs-4 text-right m-t-n">';
                    if (pTaxAmount != 0 || pDiscountAmount != 0)
                        ReportHTML += '                             <b>Subtotal: </b>' + pInvoiceHeader.CurrencyCode + ' ' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                    //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + pInvoiceHeader.TaxPercentage + '</br>';
                    if (pTaxAmount != 0)
                        ReportHTML += '                             <b>VAT(' + pInvoiceHeader.TaxPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pTaxAmount.toFixed(2) + '</br>';
                    //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + pInvoiceHeader.DiscountPercentage + '</br>';
                    if (pDiscountAmount != 0)
                        ReportHTML += '                             <b>WHT(' + pInvoiceHeader.DiscountPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pDiscountAmount.toFixed(2) + '</br>';
                    ReportHTML += '                             <b>Total: </b>' + pInvoiceHeader.CurrencyCode + ' <b>' + parseFloat(pInvoiceHeader.Amount).toFixed(2) + '</b></br>';
                    //ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(parseFloat(pInvoiceHeader.Amount).toFixed(2)) + ' ' + pInvoiceHeader.CurrencyCode + '</br>';
                    if ($("#cbPrintUSDTotal").prop("checked") && pInvoiceHeader.CurrencyCode.trim() == "EGP")
                        ReportHTML += '                             <b>USD Total: </b>' + ' <b>' + (pInvoiceHeader.Amount / $("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")).toFixed(2) + '</b></br>';
                    ReportHTML += '                         </div>';

                    ReportHTML += '             </div>';
                    ReportHTML += '         </body>';

                    //ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    //ReportHTML += '                     <div class="col-xs-3 m-t"><b>' + 'Accounting Manager' + '</b></div>';
                    //ReportHTML += '                     <div class="col-xs-2 m-t text-center"><b>' + 'Auditing' + '</b></div>';
                    //ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + 'Customer Service Supervisor' + '</b></div>';
                    //ReportHTML += '                     <div class="col-xs-3 m-t text-center"><b>' + 'Preparation' + '</b></div>';
                    //ReportHTML += '                 </div>'
                    //ReportHTML += '                 <div class="m-t" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    //ReportHTML += '                     <div class="col-xs-3 m-t-sm"><b>' + '....................................' + '</b></div>';
                    //ReportHTML += '                     <div class="col-xs-2 m-t-sm text-center"><b>' + '..................' + '</b></div>';
                    //ReportHTML += '                     <div class="col-xs-4 m-t-sm text-center"><b>' + '......................................................' + '</b></div>';
                    //ReportHTML += '                     <div class="col-xs-3 m-t-sm text-center">' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                    //ReportHTML += '                 </div>'

                    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                    if ($("#cbPrintFooterInvoice").prop("checked")) {
                        //ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/InvoiceFooter_NIL.jpg" alt="footer"/></div>';
                        ReportHTML += '         <div class="row text-center small">' + ' All financial transactions (payments / receipts / transfers) must be handled with only the company financial department and the company not responsible for any transactions that are otherwise.  ' + '</div>';
                        ReportHTML += '         <div class="row text-center small">' + '  جميع المعاملات المالية (المدفوعات/المقبوضات/التحويلات) يجب ان تتم مع الادارة المالية للشركة فقط ، والشركة ليست مسؤولة عن اى من المعاملات التى هى على خلاف ذلك	' + '</div>';

                        ReportHTML += '         <div class="row b-b b-dark m-t-n-xxs" style="clear:both;"></div>'; //This is line

                        ReportHTML += '         <div class="row text-center small">' + '  Nile Logistics International L.L.C	' + '</div>';
                        ReportHTML += '         <div class="row text-center small">' + '  Address : 4 Eltahrir st., Square 1130Sheraton HeliopolisCairo 11361-Egypt  ' + '</div>';
                        ReportHTML += '         <div class="row text-center small">' + '  Email : accounting@nilelogistics.com TEL:+202 2269 2714Fax:+202 2269 2719 ' + '</div>';
                    }
                    else
                        ReportHTML += '         &emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>';
                    //else
                    //    ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                    if (1==1) {
                        pFinalReportHTML += ReportHTML;
                        Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                    }
                    else {
                        pFinalReportHTML += ReportHTML;
                        pFinalReportHTML += ' <div class="break"></div>';
                    }
                } //EOF if (pDefaults.UnEditableCompanyName == "NIL")
                else if (pDefaults.UnEditableCompanyName == "DSE") {

                    var ReportHTML = '';
                    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                    //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                    ReportHTML += '                 <div class="col-xs-12 m-l-n">' + pAddressLine1 + ' ' + pAddressLine2 + ' ' + pAddressLine3 + '</div>';
                    ReportHTML += '                 <div class="col-xs-12 m-l-n">Tel:' + pPhones + ' &emsp;Fax: ' + pFaxes + '</div>';
                    //ReportHTML += '                 <div class="col-xs-12"><hr style="border-width: 1px;" /></div>';
                    ReportHTML += '                 <div style="width:98%;height:0.5px;border:0.5px solid #000;"></div>';

                    ReportHTML += '                 <div class="col-xs-12 text-center"><h3>' + pInvoiceHeader.ConcatenatedInvoiceNumber.split('/')[1] + '</h3></div>';
                    ReportHTML += '                 <div class="col-xs-5">';
                    ReportHTML += '                     <b>Bill To: ' + pInvoiceHeader.PartnerName + '</b><br>';
                    ReportHTML += '                     ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                    ReportHTML += '                     ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2 + '<br>'));
                    ReportHTML += '                     ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                    ReportHTML += '                     ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                    ReportHTML += '                 </div>';

                    ReportHTML += '                 <div class="col-xs-2"></div>';

                    ReportHTML += '                 <div class="col-xs-5">';
                    //ReportHTML += '                     <b>Date : </b>' + getTodaysDateInddMMyyyyFormat() + '<br>';
                    ReportHTML += '                     <b>Date : </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '<br>';
                    //ReportHTML += '                     <b>Invoice No : </b>' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(3, 2) + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(8, 2) + '/' + /*pInvoiceNumber*/ConcatenatedInvoiceNumber + '<br>';
                    ReportHTML += '                     <b>No : </b>' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + '<br>';
                    ReportHTML += '                     <b>Payment Due by : </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '<br>';
                    ReportHTML += '                     <b>Operation : </b>' + (pOperationHeader.Reference == 0 ? "" : pOperationHeader.Reference) + '<br>';
                    //if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                    //    ReportHTML += '                 <b>Operation : </b>' + pMasterOperationCode;
                    //else
                    //    ReportHTML += '                     <b>Operation : </b>' + (pInvoiceHeader.OperationCode == 0 ? pInvoiceHeader.MasterOperationCode : pInvoiceHeader.OperationCode) + '<br>';
                    ReportHTML += '                     <b>Currency : </b>' + pInvoiceHeader.CurrencyCode + '<br>' + '<br>';
                    ReportHTML += '                 </div>';
                    //ReportHTML += '             </div>';

                    ReportHTML += '             <div style="clear:both;"></div>';
                    ReportHTML += '             <div class="col-xs-7"><b>Shipper: </b>' + pShipperName + '</div>';
                    ReportHTML += '             <div class="col-xs-5"><b>Consignee: </b>' + pConsigneeName + '</div>';
                    ReportHTML += '             <div class="col-xs-7"><b>' + (pOperationHeader.TransportType == AirTransportType ? 'ORGN' : 'POL') + ': </b>' + pPOLName + '</div>';
                    ReportHTML += '             <div class="col-xs-5"><b>' + (pOperationHeader.TransportType == AirTransportType ? 'DEST' : 'POD') + ': </b>' + pPODName + '</div>';
                    var _NextSize = 7;
                    if ($("#cbPrintMBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                        ReportHTML += '             <div class="col-xs-' + _NextSize + '"><b>' + (pOperationHeader.TransportType == AirTransportType ? 'MAWB' : 'MBL') + ': </b>' + (pMasterBL == "" ? (pMainRoute.Notes == 0 ? "" : pMainRoute.Notes) : pMasterBL) + '</div>';
                        _NextSize = 12 - _NextSize;
                    }
                    if ($("#cbPrintHBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ) {
                        if (pHouseBLs != "0")//Master Operation so show all houses on it
                            ReportHTML += '             <div class="col-xs-' + _NextSize + '"><b>' + (pOperationHeader.TransportType == AirTransportType ? 'HAWB' : 'HBL') + ': </b>' + pHouseBLs + '</div>';
                        else if (pHouseNumber != "0")
                            ReportHTML += '             <div class="col-xs-' + _NextSize + '"><b>' + (pOperationHeader.TransportType == AirTransportType ? 'HAWB' : 'HBL') + ': </b> ' + (pHouseNumber == "" ? "N/A" : pHouseNumber) + '</div>';
                        _NextSize = 12 - _NextSize;
                    }
                    ReportHTML += '             <div class="col-xs-' + _NextSize + '"><b>Gross Weight: </b>' + pGrossWeightSum + ' KG</div>';
                    _NextSize = 12 - _NextSize;
                    ReportHTML += '             <div class="col-xs-' + _NextSize + '"><b>Net Weight: </b>' + pOperationHeader.NetWeightSum + ' KG</div>';
                    _NextSize = 12 - _NextSize;
                    if (pOperationHeader.TransportType == AirTransportType) {
                        ReportHTML += '             <div class="col-xs-' + _NextSize + '"><b>Chargeable Weight: </b>' + pOperationHeader.VolumeSum + ' KG</div>';
                        _NextSize = 12 - _NextSize;
                    }
                    if (pContainerTypes != 0) {
                        ReportHTML += '         <div class="col-xs-' + _NextSize + '"><b>Volume: </b>' + (pContainerTypes == 0 ? "N/A" : pContainerTypes) + '</div>';
                        _NextSize = 12 - _NextSize;
                    }
                    else if (pPackageTypes != 0) {
                        ReportHTML += '         <div class="col-xs-' + _NextSize + '"><b>Volume: </b>' + (pPackageTypes == 0 ? "N/A" : pPackageTypes) + '</div>';
                        _NextSize = 12 - _NextSize;
                    }
                    if (pOperationHeader.TransportType == OceanTransportType) {
                        ReportHTML += '             <div class="col-xs-' + _NextSize + '"><b>Vessel-Voy: </b>' + (pOperationHeader.VesselName == 0 ? "" : pOperationHeader.VesselName) + (pOperationHeader.VoyageOrTruckNumber == 0 ? "" : (" - " + pOperationHeader.VoyageOrTruckNumber)) + '</div>';
                        _NextSize = 12 - _NextSize;
                    }
                    ReportHTML += '             <div class="col-xs-' + _NextSize + '"><b>Shipment Category: </b>' + pShipmentTypeCode + '</div>';
                    _NextSize = 12 - _NextSize;
                    ReportHTML += '             <div class="col-xs-' + _NextSize + '"><b>Shipment Term: </b>' + pIncotermName + '</div>';
                    _NextSize = 12 - _NextSize;
                    ReportHTML += '             <div class="col-xs-' + _NextSize + '"><b>PO Number: </b>' + (pOperationHeader.PONumber == 0 ? "" : pOperationHeader.PONumber) + '</div>';
                    _NextSize = 12 - _NextSize;
                    ReportHTML += '                     <div class="col-xs-12 clear">';
                    ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    ReportHTML += '                                     <th>Description</th>';
                    ReportHTML += '                                     <th style="width:15%;">Quantity</th>';
                    ReportHTML += '                                     <th style="width:15%;">Unit Price</th>';
                    ReportHTML += '                                     <th style="width:15%;">Sale Price</th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    $.each(JSON.parse(data[2]), function (i, item) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                        ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                        ReportHTML += '                                         <td>' + item.SalePrice + '</td>';
                        ReportHTML += '                                         <td>' + item.SaleAmount + '</td>';
                        ReportHTML += '                                     </tr>';
                    });
                    if (pInvoiceHeader.FixedDiscount > 0) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + 'Special Discount' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2) + '</td>';
                        ReportHTML += '                                     </tr>';
                    }
                    if (pTaxAmount != 0 || pDiscountAmount != 0) {
                        ReportHTML += '                                         <tr>';
                        ReportHTML += '                                             <td>' + '<b>Subtotal : ' + '</b></td>';
                        ReportHTML += '                                             <td></td>';
                        ReportHTML += '                                             <td></td>';
                        ReportHTML += '                                             <td><b>' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                        ReportHTML += '                                         </tr>';
                    }
                    if (pTaxAmount != 0) {
                        ReportHTML += '                                         <tr>';
                        ReportHTML += '                                             <td>' + '<b>VAT(' + pInvoiceHeader.TaxPercentage + '%) : ' + '</b></td>';
                        ReportHTML += '                                             <td></td>';
                        ReportHTML += '                                             <td></td>';
                        ReportHTML += '                                             <td><b>' + pTaxAmount + '</b></td>';
                        ReportHTML += '                                         </tr>';
                    }
                    if (pDiscountAmount != 0) {
                        ReportHTML += '                                         <tr>';
                        ReportHTML += '                                             <td>' + '<b>Discount(' + pInvoiceHeader.DiscountPercentage + '%) : ' + '</b></td>';
                        ReportHTML += '                                             <td></td>';
                        ReportHTML += '                                             <td></td>';
                        ReportHTML += '                                             <td><b>' + pDiscountAmount + '</b></td>';
                        ReportHTML += '                                         </tr>';
                    }

                    ReportHTML += '                                         <tr>';
                    ReportHTML += '                                             <td>' + '<b>ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    ReportHTML += '                                             <td></td>';
                    ReportHTML += '                                             <td></td>';
                    ReportHTML += '                                             <td><b>' + pInvoiceHeader.Amount + '</b></td>';
                    ReportHTML += '                                         </tr>';

                    ReportHTML += '                             </tbody>';
                    ReportHTML += '                         </table>';
                    ReportHTML += '                     </div>'
                    //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                    //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + ' / (' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + ')' + '</b>';
                    //ReportHTML += '                         </div>';
                    ReportHTML += '                         <div class="col-xs-9"></div>';
                    ReportHTML += '                         <div class="text-center col-xs-3"><b><i>Prepared By ,</i></b></div>';
                    ReportHTML += '                         <div class="col-xs-9"></div>';
                    ReportHTML += '                         <div class="text-center col-xs-3"><b><i>' + $("#hLoggedUserNameNotLogin").val() + '</i></b></div>';

                    //ReportHTML += '                         <div class="col-xs-12 m-t-n">';
                    //if (pTaxAmount != 0 || pDiscountAmount != 0)
                    //    ReportHTML += '                             <b>Subtotal: </b>' + pInvoiceHeader.CurrencyCode + ' ' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                    ////ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + pInvoiceHeader.TaxPercentage + '</br>';
                    //if (pTaxAmount != 0)
                    //    ReportHTML += '                             <b>VAT(' + pInvoiceHeader.TaxPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pTaxAmount + '</br>';
                    ////ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + pInvoiceHeader.DiscountPercentage + '</br>';
                    //if (pDiscountAmount != 0)
                    //    ReportHTML += '                             <b>Discount Taxes(' + pInvoiceHeader.DiscountPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pDiscountAmount + '</br>';
                    //ReportHTML += '                             <b>Total: </b>' + pInvoiceHeader.CurrencyCode + ' <b>' + pInvoiceHeader.Amount + '</b></br>';
                    //ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</br>';
                    //ReportHTML += '                         </div>';
                    //ReportHTML += '                     </div>'; //of table-responsive
                    //ReportHTML += '                 </section>';
                    //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                    ReportHTML += '         </body>';

                    ReportHTML += '     <footer class="footer col-xs-12 m-t" style="width:100%; position:absolute; bottom:0;">';
                    //ReportHTML += '         <div class="row">'
                    //ReportHTML += '             <div class="col-xs-8 m-l"><b><i>' + ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.DirectionType").text() == 1
                    //                                                                ? 'Import Manager'
                    //                                                                : ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.DirectionType").text() == 2 ? 'Export Manager' : 'Domestic Manager')
                    //                                                                ) + '</i></b></div>';
                    //ReportHTML += '             <div class="col-xs-4 m-t-n-md float-right"><b><i>Accountant Signature</i></b></div>';
                    //ReportHTML += '         </div>'
                    // ReportHTML += '         <div class="row text-right m-r m-t-sm">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
                    // ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
                    //ReportHTML += '         <div class="row text-right m-r">' + '  الشركة تخضع لنظام الدفعات المقدمه طبقاً لقانون الضريبة على الدخل  ' + '</div>';
                    if ($("#cbPrintFooterInvoice").prop("checked"))
                        ReportHTML += '         <div class="row text-center m-t-lg"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                    //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                    if (1==1) {
                        pFinalReportHTML += ReportHTML;
                        Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                    }
                    else {
                        pFinalReportHTML += ReportHTML;
                        pFinalReportHTML += ' <div class="break"></div>';
                    }
                } //else if (pDefaults.UnEditableCompanyName == "DSE") {
                else if (pDefaults.UnEditableCompanyName == "SGA") {

                    var ReportHTML = '';
                    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                    //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                    //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + pInvoiceHeader.ConcatenatedInvoiceNumber + ')' + '</h3></div>';
                    ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.ConcatenatedInvoiceNumber.split('/')[1]
                        + " No. "
                        + (pInvoiceHeader.ConcatenatedInvoiceNumber.split('/')[1].split(' ')[0].toUpperCase() == "DEBIT" ? "D" : "")
                        + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4)
                        + '</h3></div>';
                    ReportHTML += '                 <div class="col-xs-12">';
                    ReportHTML += '                     <b>' + $("#hDefaultCompanyName").val() + '</b><br>';
                    ReportHTML += '                     <b>Date : </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '<br>';
                    //ReportHTML += '                     <b>Invoice No : </b>' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(3, 2) + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(8, 2) + '/' + /*pInvoiceNumber*/ConcatenatedInvoiceNumber + '<br>';
                    ReportHTML += '                     <b>Payment Due by : </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '<br>';
                    if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                        ReportHTML += '                 <b>Operation : </b>' + pMasterOperationCode;
                    else
                        ReportHTML += '                     <b>Operation : </b>' + (pInvoiceHeader.OperationCode == 0 ? pInvoiceHeader.MasterOperationCode : pInvoiceHeader.OperationCode) + '<br>';
                    ReportHTML += '                     <b>Currency : </b>' + pInvoiceHeader.CurrencyCode + '<br>';
                    ReportHTML += '                     <b>Salesman : </b>' + pSalesman + '<br><br>';
                    ReportHTML += '                 </div>';
                    //ReportHTML += '             </div>';
                    ReportHTML += '             <table class="col-xs-8 m-l m-t-n b-t b-light text-sm table-bordered" style="text-align:left; width:auto; border:solid #000;">';
                    ReportHTML += '                 <td>';
                    ReportHTML += '                     <b>Bill To: </b><br>';
                    ReportHTML += '                     <b>' + pInvoiceHeader.PartnerName + '</b><br>';
                    ReportHTML += '                     ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                    ReportHTML += '                     ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2 + '<br>'));
                    ReportHTML += '                     ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                    ReportHTML += '                     ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                    ReportHTML += '                 </td>';
                    ReportHTML += '             </table>';

                    ReportHTML += '             <div class="m-t-xs" style="clear:both;"></div>';
                    if ($("#cbPrintMBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU")
                        ReportHTML += '             <div class="col-xs-6"><b>MB/L No.: </b>' + pMasterBL + '</div>';
                    if ($("#cbPrintHBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ) {
                        if (pHouseBLs != "0")//Master Operation so show all houses on it
                            ReportHTML += '             <div class="col-xs-6"><b>HBL</b>: ' + pHouseBLs + '</div>';
                        else if (pHouseNumber != "0")
                            ReportHTML += '             <div class="col-xs-6"><b>HB/L No.:</b> ' + (pHouseNumber == "" ? "N/A" : pHouseNumber) + '</div>';
                    }
                    ReportHTML += '             <div class="col-xs-6"><b>POL: </b>' + pPOLName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>POD: </b>' + pPODName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Volume: </b>' + (pOperationHeader.Volume == 0 ? pOperationHeader.VolumeSum : pOperationHeader.Volume) + ' CBM</div>';
                    //if (pContainerTypes != 0)
                    //    ReportHTML += '         <div class="col-xs-6"><b>Volume: </b>' + (pContainerTypes == 0 ? "N/A" : pContainerTypes) + '</div>';
                    //else if (pPackageTypes != 0)
                    //    ReportHTML += '         <div class="col-xs-6"><b>Volume: </b>' + (pPackageTypes == 0 ? "N/A" : pPackageTypes) + '</div>';
                    //if (pShipperName != "N/A")
                    //    ReportHTML += '             <div class="col-xs-6"><b>Shipper: </b>' + pShipperName + '</div>';
                    //if (pConsigneeName != "N/A")
                    //    ReportHTML += '             <div class="col-xs-6"><b>Consignee: </b>' + pConsigneeName + '</div>';
                    ReportHTML += '                     <div class="col-xs-12 clear">';
                    ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    ReportHTML += '                                     <th>Description</th>';
                    ReportHTML += '                                     <th>Quantity</th>';
                    ReportHTML += '                                     <th>Unit Price</th>';
                    ReportHTML += '                                     <th>Sale Price</th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    $.each(JSON.parse(data[2]), function (i, item) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                        ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                        ReportHTML += '                                         <td>' + item.SalePrice + '</td>';
                        ReportHTML += '                                         <td>' + item.SaleAmount + '</td>';
                        ReportHTML += '                                     </tr>';
                    });
                    if (pInvoiceHeader.FixedDiscount > 0) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + 'Special Discount' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2) + '</td>';
                        ReportHTML += '                                     </tr>';
                    }
                    //ReportHTML += '                                         <tr>';
                    //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                             <td><b>' + pInvoiceHeader.Amount + '</b></td>';
                    //ReportHTML += '                                         </tr>';

                    ReportHTML += '                             </tbody>';
                    ReportHTML += '                         </table>';
                    ReportHTML += '                     </div>'
                    //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                    //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + ' / (' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + ')' + '</b>';
                    //ReportHTML += '                         </div>';
                    //ReportHTML += '                         <div class="clear m-l col-xs-6 text-left"><b>ACCOUNTING</b></div>';
                    //ReportHTML += '                         <div class="float-right text-right m-t-n col-xs-6 m-r"><b>APPROVAL</b></div>';
                    if ($("#cbLargeInvoice").prop("checked")) {
                        ReportHTML += '         <div class="col-xs-12 m-t-n">Please, see attachment.</div>';
                        ReportHTML += '         <div class="break"></div>';
                    }
                    else
                        ReportHTML += '                         <div class="col-xs-12 m-t-n"></div>';
                    ReportHTML += '                         <div class="col-xs-7">';
                    if ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                        ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                        ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                        ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                        ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                    }
                    else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                    }
                    else {
                        ReportHTML += '</br>';
                    }
                    ReportHTML += '                         </div>';
                    ReportHTML += '                         <div class="col-xs-5 text-right">';
                    if (pTaxAmount != 0 || pDiscountAmount != 0)
                        ReportHTML += '                             <b>Subtotal: </b>' + pInvoiceHeader.CurrencyCode + ' ' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                    //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + pInvoiceHeader.TaxPercentage + '</br>';
                    if (pTaxAmount != 0)
                        ReportHTML += '                             <b>VAT(' + pInvoiceHeader.TaxPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pTaxAmount.toFixed(2) + '</br>';
                    //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + pInvoiceHeader.DiscountPercentage + '</br>';
                    if (pDiscountAmount != 0)
                        ReportHTML += '                             <b>Discount Taxes(' + pInvoiceHeader.DiscountPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pDiscountAmount.toFixed(2) + '</br>';
                    ReportHTML += '                             <b>Total: </b>' + pInvoiceHeader.CurrencyCode + ' <b>' + parseFloat(pInvoiceHeader.Amount).toFixed(2) + '</b></br>';
                    ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(parseFloat(pInvoiceHeader.Amount).toFixed(2)) + ' ' + pInvoiceHeader.CurrencyCode + '</br>';
                    ReportHTML += '                         </div>';
                    //ReportHTML += '                     </div>'; //of table-responsive
                    //ReportHTML += '                 </section>';
                    //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                    ReportHTML += '         </body>';
                    ReportHTML += '     <footer class="footer col-xs-12 ' + ($("#cbPrintFooterInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  "" : " hide ") + '" style="width:100%; position:absolute; bottom:0;">';
                    //ReportHTML += '         <div class="row">'
                    //ReportHTML += '             <div class="col-xs-8 m-l"><b><i>' + ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.DirectionType").text() == 1
                    //                                                                ? 'Import Manager'
                    //                                                                : ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.DirectionType").text() == 2 ? 'Export Manager' : 'Domestic Manager')
                    //                                                                ) + '</i></b></div>';
                    //ReportHTML += '             <div class="col-xs-4 m-t-n-md float-right"><b><i>Accountant Signature</i></b></div>';
                    //ReportHTML += '         </div>'
                    ReportHTML += '         <div class="row text-right m-r m-t-sm">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
                    ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
                    ReportHTML += '         <div class="row text-center m-t ' + ($("#cbPrintFooterInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  "" : " hide ") + '"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                    //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                    if (1==1) {
                        pFinalReportHTML += ReportHTML;
                        Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                    }
                    else {
                        pFinalReportHTML += ReportHTML;
                        pFinalReportHTML += ' <div class="break"></div>';
                    }
                } //else if (pDefaults.UnEditableCompanyName == "SGA") {
                else if (pDefaults.UnEditableCompanyName == "BSL"
                    || pDefaults.UnEditableCompanyName == "FAI"
                    || pDefaults.UnEditableCompanyName == "HOR"
                    || pDefaults.UnEditableCompanyName == "LAT"
                    || pDefaults.UnEditableCompanyName == "NVS"
                    || pDefaults.UnEditableCompanyName == "RLL"
                    || pDefaults.UnEditableCompanyName == "STR"
                    || pDefaults.UnEditableCompanyName == "TRL"
                    || pDefaults.UnEditableCompanyName == "VER"
                ) {

                    var ReportHTML = '';
                    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                    //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                    //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + pInvoiceHeader.ConcatenatedInvoiceNumber + ')' + '</h3></div>';
                    ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.ConcatenatedInvoiceNumber.split('/')[1] + '</h3></div>';
                    ReportHTML += '                 <div class="col-xs-8">';
                    ReportHTML += '                     <b>' + $("#hDefaultCompanyName").val() + '</b><br>';
                    ReportHTML += '                     ' + (pAddressLine1 == "" ? "" : (pAddressLine1 + '<br>'));
                    ReportHTML += '                     ' + (pAddressLine2 == "" ? "" : (pAddressLine2 + '<br>'));
                    if (pDefaults.UnEditableCompanyName != "BSL" || (pInvoiceTypeCode != "CA" && pInvoiceTypeCode != "ST"))
                        ReportHTML += '                     ' + (pAddressLine3 == "" ? "" : (pAddressLine3) + '<br>');
                    ReportHTML += '                     ' + (pPhones == "" ? "" : ('TEL:' + pPhones) + '<br>');
                    ReportHTML += '                     ' + (pFaxes == "" ? "" : ('Fax:' + pFaxes)) + '<br>';
                    if (1 == 2) {
                        ReportHTML += '                     <b>Tax ID: </b>' + pDefaults.TaxNumber + '<br>';
                        ReportHTML += '                     <b>Commercial Register: </b>' + pDefaults.CommericalRegNo + '<br>';
                    }
                    ReportHTML += '                 </div>';

                    ReportHTML += '                 <div class="col-xs-4 m-l-n">';
                    //ReportHTML += '                     <b>Date : </b>' + getTodaysDateInddMMyyyyFormat() + '<br>';
                    ReportHTML += '                     <b>Date : </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '<br>';
                    //ReportHTML += '                     <b>Invoice No : </b>' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(3, 2) + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(8, 2) + '/' + /*pInvoiceNumber*/ConcatenatedInvoiceNumber + '<br>';
                    ReportHTML += '                     <b>No : </b>' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + '<br>';
                    ReportHTML += '                     <b>Payment Due by : </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '<br>';
                    ReportHTML += '                     <b>Reference No. : </b>' + (pCustomerReference == 0 ? "N/A" : pCustomerReference) + '<br>';
                    if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                        ReportHTML += '                 <b>Operation : </b>' + pMasterOperationCode;
                    else
                        ReportHTML += '                     <b>Operation : </b>' + (pInvoiceHeader.OperationCode == 0 ? pInvoiceHeader.MasterOperationCode : pInvoiceHeader.OperationCode) + '<br>';
                    ReportHTML += '                     <b>Currency : </b>' + pInvoiceHeader.CurrencyCode + '<br>';
                    if (pDefaults.UnEditableCompanyName != "BSL")
                        ReportHTML += '                     <b>Salesman : </b>' + pSalesman + '<br><br>';
                    ReportHTML += '                 </div>';
                    //ReportHTML += '             </div>';
                    ReportHTML += '             <table class="col-xs-8 m-l m-t-n b-t b-light text-sm table-bordered" style="clear:both; text-align:left; width:auto; border:solid #000;">';
                    ReportHTML += '                 <td>';
                    ReportHTML += '                     <b>Bill To: </b><br>';
                    ReportHTML += '                     <b>' + pInvoiceHeader.PartnerName + '</b><br>';
                    ReportHTML += '                     ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                    ReportHTML += '                     ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2 + '<br>'));
                    ReportHTML += '                     ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                    ReportHTML += '                     ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                    if (pDefaults.UnEditableCompanyName == "HOR")
                        ReportHTML += '                     <br><b>Tax ID: </b>' + (pClientHeader.BankName == 0 ? "" : pClientHeader.BankName);
                    ReportHTML += '                 </td>';
                    ReportHTML += '             </table>';

                    ReportHTML += '             <div style="clear:both;"></div>';
                    if ($("#cbPrintMBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU")
                        ReportHTML += '             <div class="col-xs-6"><b>MB/L No.: </b>' + pMasterBL + '</div>';
                    if ($("#cbPrintHBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ) {
                        if (pHouseBLs != "0")//Master Operation so show all houses on it
                            ReportHTML += '             <div class="col-xs-6"><b>HBL</b>: ' + pHouseBLs + '</div>';
                        else if (pHouseNumber != "0")
                            ReportHTML += '             <div class="col-xs-6"><b>HB/L No.:</b> ' + (pHouseNumber == "" ? "N/A" : pHouseNumber) + '</div>';
                    }
                    ReportHTML += '             <div class="col-xs-6"><b>POL: </b>' + pPOLName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>POD: </b>' + pPODName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Weight: </b>' + pGrossWeightSum + (pDefaults.UnEditableCompanyName == "FAI" && (pInvoiceHeader.InvoiceTypeName == "CUSTOM-EXPORT-EXPENSES&FEES INVOICE" || pInvoiceHeader.InvoiceTypeName == "CUSTOM-EXP-DUES STATEMENT") ? ' TON' : ' KG') + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>CBM: </b>' + pCBM + ' CBM</div>';
                    if (pContainerTypes != 0)
                        ReportHTML += '         <div class="col-xs-6"><b>Volume: </b>' + (pContainerTypes == 0 ? "N/A" : pContainerTypes) + '</div>';
                    else if (pPackageTypes != 0)
                        ReportHTML += '         <div class="col-xs-6"><b>Volume: </b>' + (pPackageTypes == 0 ? "N/A" : pPackageTypes) + '</div>';
                    if (pDefaults.UnEditableCompanyName == "FAI"
                        && pOperationHeader.ShipmentType == constFCLShipmentType
                        && (pInvoiceHeader.InvoiceTypeName == "CUSTOM-IMP-DUES STATEMENT" || pInvoiceHeader.InvoiceTypeName == "CUSTOM-IMPORT-EXPENSES & FEES INVOICE")
                    )
                        ReportHTML += '         <div class="col-xs-6"><b>Packages: </b>' + (pOperationHeader.NumberOfPackages + 'x' + pOperationHeader.PackageTypeName) + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Shipment Category: </b>' + pShipmentTypeCode + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Shipment Term: </b>' + pIncotermName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Shipper: </b>' + pShipperName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Consignee: </b>' + pConsigneeName + '</div>';
                    if (pDefaults.UnEditableCompanyName == "VER" || pDefaults.UnEditableCompanyName == "TRL")
                        ReportHTML += '             <div class="col-xs-6"><b>Line: </b>' + (pOperationHeader.LineName == 0 ? "" : pOperationHeader.LineName) + '</div>';
                    if (pDefaults.UnEditableCompanyName == "BSL")
                        ReportHTML += '             <div class="col-xs-6"><b>ACID No: </b>' + (pOperationHeader.ACIDNumber == 0 ? "" : pOperationHeader.ACIDNumber) + '</div>';
                    if (pDefaults.UnEditableCompanyName == "HOR") {
                        ReportHTML += '             <div class="col-xs-6"><b>Commodity: </b>' + (pOperationHeader.CommodityName == 0 ? "" : pOperationHeader.CommodityName) + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>ETA: </b>' + (pETA == "01/01/1900" || pETA == "1/1/1900" ? "N/A" : pETA) + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>ETD: </b>' + (pETD == "01/01/1900" || pETD == "1/1/1900" ? "N/A" : pETD) + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Line: </b>' + (pOperationHeader.LineName == 0 ? "" : pOperationHeader.LineName) + '</div>';
                        if (pOperationHeader.TransportType == OceanTransportType)
                            ReportHTML += '             <div class="col-xs-6"><b>Vessel: </b>' + (pOperationHeader.VesselName == 0 ? "" : pOperationHeader.VesselName) + '</div>';
                    }
                    if (pDefaults.UnEditableCompanyName == "FAI") {
                        ReportHTML += '             <div class="col-xs-6"><b>Certificate No.: </b>' + (pOperationHeader.CertificateNumber == 0 ? "" : pOperationHeader.CertificateNumber) + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Vessel: </b>' + (pOperationHeader.VesselName == 0 ? "" : pOperationHeader.VesselName) + '</div>';
                    }
                    if (pDefaults.UnEditableCompanyName == "RLL") {
                        if (pOperationHeader.TransportType == OceanTransportType)
                            ReportHTML += '             <div class="col-xs-6"><b>Vessel-Voy: </b>' + (pOperationHeader.VesselName == 0 ? "" : pOperationHeader.VesselName) + (pOperationHeader.VoyageOrTruckNumber == 0 ? "" : (" - " + pOperationHeader.VoyageOrTruckNumber)) + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Customs Cert. No.: </b>' + (pOperationHeader.CertificateNumber == 0 ? "" : pOperationHeader.CertificateNumber) + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Customs Cert. Date: </b>' + (pOperationHeader.CertificateDate == "0" ? "" : pOperationHeader.CertificateDate) + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>ATA POL: </b>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.ATAPOLDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.ATAPOLDate))) + '</div>';
                    }
                    if (pDefaults.UnEditableCompanyName == "TRL")
                        ReportHTML += '             <div class="col-xs-6"><b>Notes: </b>' + (pInvoiceHeader.EditableNotes == 0 ? "" : pInvoiceHeader.EditableNotes) + '</div>';
                    ReportHTML += '                     <div class="col-xs-12 clear">';
                    ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    ReportHTML += '                                     <th>Description</th>';
                    ReportHTML += '                                     <th>Quantity</th>';
                    ReportHTML += '                                     <th>Unit Price</th>';
                    ReportHTML += '                                     <th>Sale Price</th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    $.each(JSON.parse(data[2]), function (i, item) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                        ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                        ReportHTML += '                                         <td>' + item.SalePrice + '</td>';
                        ReportHTML += '                                         <td>' + item.SaleAmount + '</td>';
                        ReportHTML += '                                     </tr>';
                    });
                    if (pInvoiceHeader.FixedDiscount > 0) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + 'Special Discount' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2) + '</td>';
                        ReportHTML += '                                     </tr>';
                    }
                    //ReportHTML += '                                         <tr>';
                    //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                             <td><b>' + pInvoiceHeader.Amount + '</b></td>';
                    //ReportHTML += '                                         </tr>';

                    ReportHTML += '                             </tbody>';
                    ReportHTML += '                         </table>';
                    ReportHTML += '                     </div>'
                    //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                    //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + ' / (' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + ')' + '</b>';
                    //ReportHTML += '                         </div>';
                    //ReportHTML += '                         <div class="clear m-l col-xs-6 text-left"><b>ACCOUNTING</b></div>';
                    //ReportHTML += '                         <div class="float-right text-right m-t-n col-xs-6 m-r"><b>APPROVAL</b></div>';
                    ReportHTML += '                         <div class="col-xs-7 m-t-n">';
                    if ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                        ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                        ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                        ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                        ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                    }
                    else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                    }
                    else {
                        ReportHTML += '</br>';
                    }
                    ReportHTML += '                         </div>';
                    ReportHTML += '                         <div class="col-xs-5 text-right m-t-n">';
                    if (pTaxAmount != 0 || pDiscountAmount != 0)
                        ReportHTML += '                             <b>Subtotal: </b>' + pInvoiceHeader.CurrencyCode + ' ' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                    //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + pInvoiceHeader.TaxPercentage + '</br>';
                    if (pTaxAmount != 0 || pInvoiceHeader.TaxTypeID != 0)
                        ReportHTML += '                             <b>VAT(' + pInvoiceHeader.TaxPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pTaxAmount.toFixed(2) + '</br>';
                    //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + pInvoiceHeader.DiscountPercentage + '</br>';
                    if (pDiscountAmount != 0)
                        ReportHTML += '                             <b>Discount Taxes(' + pInvoiceHeader.DiscountPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pDiscountAmount.toFixed(2) + '</br>';
                    ReportHTML += '                             <b>Total: </b>' + pInvoiceHeader.CurrencyCode + ' <b>' + parseFloat(pInvoiceHeader.Amount).toFixed(2) + '</b></br>';
                    ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(parseFloat(pInvoiceHeader.Amount).toFixed(2)) + ' ' + pInvoiceHeader.CurrencyCode + '</br>';
                    ReportHTML += '                         </div>';
                    //ReportHTML += '                     </div>'; //of table-responsive
                    //ReportHTML += '                 </section>';
                    //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                    ReportHTML += '         </body>';
                    if (pDefaults.UnEditableCompanyName == "RLL" || pDefaults.UnEditableCompanyName == "HOR") {
                        ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                        ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + '  Responsible Employee   ' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + '  Revised By  ' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + '  Financial Manager   ' + '</b></div>';
                        ReportHTML += '                 </div>'
                        ReportHTML += '                 <div class="m-t" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                        ReportHTML += '                     <div class="col-xs-4 m-t-sm text-center"><b>' + '&emsp;'/*$("#hLoggedUserNameNotLogin").val()*/ + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-4 m-t-sm text-center"><b>' + '&emsp;' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-4 m-t-sm text-center">' + '&emsp;' + '</div>';
                        ReportHTML += '                 </div>'
                    }
                    else {
                        ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                        ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftPosition != 0 ? pDefaultsRow.InvoiceLeftPosition : '&emsp;') + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddlePosition != 0 ? pDefaultsRow.InvoiceMiddlePosition : '&emsp;') + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightPosition != 0 ? pDefaultsRow.InvoiceRightPosition : '&emsp;') + '</b></div>';
                        ReportHTML += '                 </div>'
                        ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                        ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftSignature != 0 ? pDefaultsRow.InvoiceLeftSignature : '&emsp;') + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddleSignature != 0 ? pDefaultsRow.InvoiceMiddleSignature : '&emsp;') + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightSignature != 0 ? pDefaultsRow.InvoiceRightSignature : '&emsp;') + '</b></div>';
                        ReportHTML += '                 </div>'
                        if ($("#cbPrintStamp").prop("checked"))
                            ReportHTML += '         <div class="text-right m-r-lg"><img src="/Content/Images/CompanyStamp.jpg" alt="stamp"/></div>';
                    }
                    if (pDefaults.UnEditableCompanyName == "LAT") {
                        ReportHTML += '         <div class="row text-right m-r" style="clear:both;">' + '   الشركة تعمل بنظام الدفعات المقدمة عن العام الجاري ولا یجب الخصم من تحت حساب الضرائب   ' + '</div>';
                        ReportHTML += '         <div class="row text-right m-r">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
                        ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
                    }
                    ReportHTML += '     <footer class="footer col-xs-12 ' + ($("#cbPrintFooterInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  "" : " hide ") + '" style="width:100%; position:absolute; bottom:0;">';
                    //ReportHTML += '         <div class="row">'
                    //ReportHTML += '             <div class="col-xs-8 m-l"><b><i>' + ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.DirectionType").text() == 1
                    //                                                                ? 'Import Manager'
                    //                                                                : ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.DirectionType").text() == 2 ? 'Export Manager' : 'Domestic Manager')
                    //                                                                ) + '</i></b></div>';
                    //ReportHTML += '             <div class="col-xs-4 m-t-n-md float-right"><b><i>Accountant Signature</i></b></div>';
                    //ReportHTML += '         </div>'
                    if (pDefaults.UnEditableCompanyName != "LAT") {
                        ReportHTML += '         <div class="row text-right m-r m-t-sm">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
                        ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
                    }
                    if (pDefaults.UnEditableCompanyName == "RLL")
                        ReportHTML += '         <div class="row text-right m-r">' + '  رقم الملف الضريبي 00\\00\\555\\02677\\5\\001  ' + '  رقم تسجيل المبيعات 903\\405\\331  ' + '</div>';
                    ReportHTML += '         <div class="row text-center m-t ' + ($("#cbPrintFooterInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  "" : " hide ") + '"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                    //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                    if (1==1) {
                        pFinalReportHTML += ReportHTML;
                        Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                    }
                    else {
                        pFinalReportHTML += ReportHTML;
                        pFinalReportHTML += ' <div class="break"></div>';
                    }
                } //EOF BSL,FAI,HOR,LAT,NVS,RLL,STR,TRL,VER
                else if (pDefaults.UnEditableCompanyName == "IFG") {

                    var ReportHTML = '';
                    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                    //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                    //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + pInvoiceHeader.ConcatenatedInvoiceNumber + ')' + '</h3></div>';
                    ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + '</h3></div>';

                    ////ReportHTML += '             <div style="clear:both;"><br></div>';
                    //ReportHTML += '         <div class="col-xs-1 m-l-n-md"><img src="/Content/Images/' + 'InvoiceSideStatement.jpg' + '" alt="logo"/></div>';
                    ReportHTML += '         <div class="col-xs-12">';

                    if (pDefaults.UnEditableCompanyName == "WFE" && pInvoiceHeader.InvoiceTypeName.split(' ')[0].trim().toUpperCase() == "INVOICE") {
                        ReportHTML += '             <div class="col-xs-9"></div>';
                        ReportHTML += '             <div class="col-xs-3"><b>Tax No.: </b>' + '843-592-672' + '</div>';
                        ReportHTML += '             <div class="col-xs-9"></div>';
                        ReportHTML += '             <div class="col-xs-3"><b>Com. Reg. No.: </b>' + '200669' + '</div>';
                    }
                    ReportHTML += '             <div class="col-xs-9"><b>Bill to: </b>' + pInvoiceHeader.PartnerName + '</div>';
                    ReportHTML += '             <div class="col-xs-3"><b>Inv.Date: </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '</div>';
                    ReportHTML += '             <div class="col-xs-9"><b>Address: </b>';
                    ReportHTML += '                 ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                    ReportHTML += '                 ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2));
                    ReportHTML += '                 ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                    ReportHTML += '                 ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                    ReportHTML += '             </div>';
                    ReportHTML += '             <div class="col-xs-3"><b>Due Date: </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '</div>';
                    ReportHTML += '             <div class="col-xs-12 b-b b-dark m-t-n-xs" style="clear:both;"></div>';

                    if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                        ReportHTML += '             <div class="col-xs-6"><b>Operation: </b>' + pMasterOperationCode + '</div>';
                    else
                        ReportHTML += '             <div class="col-xs-6"><b>Operation: </b>' + (pInvoiceHeader.OperationCode == 0 ? pInvoiceHeader.MasterOperationCode : pInvoiceHeader.OperationCode) + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Currency: </b>' + pInvoiceHeader.CurrencyCode + '</div>';
                    if ($("#cbPrintMBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU")
                        ReportHTML += '             <div class="col-xs-6"><b>MB/L No.: </b>' + pMasterBL + '</div>';
                    if ($("#cbPrintHBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ) {
                        if (pHouseBLs != "0")//Master Operation so show all houses on it
                            ReportHTML += '             <div class="col-xs-6"><b>HBL</b>: ' + pHouseBLs + '</div>';
                        else
                            ReportHTML += '             <div class="col-xs-6"><b>HB/L No.:</b> ' + (pHouseNumber == "" || pHouseNumber == "0" ? "" : pHouseNumber) + '</div>';
                    }
                    ReportHTML += '             <div class="col-xs-6"><b>POL: </b>' + pPOLName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>POD: </b>' + pPODName + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Weight: </b>' + pGrossWeightSum + ' KG</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>CBM: </b>' + pCBM + ' CBM</div>';
                    if (pOperationHeader.TransportType == OceanTransportType) {
                        ReportHTML += '         <div class="col-xs-6"><b>Vessel: </b>' + pVesselName + '</div>';
                    }
                    //for inland shipping line is written in LeftSignature
                    if (pOperationHeader.TransportType == InlandTransportType) {
                        ReportHTML += '         <div class="col-xs-6"><b>Shipping Line: </b>' + (pInvoiceHeader.LeftSignature == 0 ? "" : pInvoiceHeader.LeftSignature) + '</div>';
                    }
                    if (pOperationHeader.TransportType != AirTransportType) {
                        ReportHTML += '         <div class="col-xs-6"><b>Arrival Date: </b>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.ActualArrival)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.ActualArrival))) + '</div>';
                        ReportHTML += '         <div class="col-xs-6"><b>Containers: </b>' + (pOperationHeader.ShipmentType == 0 || pOperationHeader.ShipmentType == 2 || pOperationHeader.ShipmentType == 4 ? "LCL" : pContainerTypes) + '</div>';
                        ReportHTML += '         <div class="col-xs-6"><b>Container Numbers: </b>' + pContainerNumbers + '</div>';
                    }
                    if (pOperationHeader.PackageTypes != 0 || pOperationHeader.PackageTypesOnContainersTotals != 0 || pOperationHeader.PlacedOnOperationContainersAndPackagesID != 0)
                        ReportHTML += '         <div class="col-xs-6"><b>Packages: </b>' + (pOperationHeader.PackageTypes == 0 ? (pOperationHeader.PackageTypesOnContainersTotals == 0 ? (pOperationHeader.PlacedOnOperationContainersAndPackagesID == 0 ? "0" : pOperationHeader.PlacedOnOperationContainersAndPackagesID) : pOperationHeader.PackageTypesOnContainersTotals) : pOperationHeader.PackageTypes) + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Shipment Category: </b>' + pShipmentTypeCode + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Shipment Term: </b>' + pIncotermName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Commodity: </b>' + (pOperationHeader.CommodityName == 0 ? "" : pOperationHeader.CommodityName) + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Shipper: </b>' + pShipperName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Consignee: </b>' + pConsigneeName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Weight: </b>' + pGrossWeightSum + ' KGM' + '</div>';
                    if (pOperationHeader.CertificateNumber != 0)
                        ReportHTML += '         <div class="col-xs-6"><b>Certificate: </b>' + pOperationHeader.CertificateNumber + '</div>';
                    ReportHTML += '                 <div class="col-xs-12 text-right" style="clear:both;"><b>Prepared By : </b>' + $("#hLoggedUserNameNotLogin").val() + '&emsp;</div>';
                    ReportHTML += '                     <div class="col-xs-12 clear">';
                    ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    ReportHTML += '                                     <th>Description</th>';
                    ReportHTML += '                                     <th>Qty</th>';
                    ReportHTML += '                                     <th>Unit Price</th>';
                    ReportHTML += '                                     <th>Sale Price</th>';
                    //ReportHTML += '                                     <th>Notes</th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    $.each(JSON.parse(data[2]), function (i, item) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                        ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                        ReportHTML += '                                         <td>' + item.SalePrice + '</td>';
                        ReportHTML += '                                         <td>' + item.SaleAmount + '</td>';
                        //ReportHTML += '                                         <td>' + (item.Notes == "0" ? "" : item.Notes) + '</td>';
                        ReportHTML += '                                     </tr>';
                    });
                    if (pInvoiceHeader.FixedDiscount > 0) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + 'Special Discount' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2) + '</td>';
                        ReportHTML += '                                     </tr>';
                    }
                    //ReportHTML += '                                         <tr>';
                    //ReportHTML += '                                             <td colspan=2>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                             <td><b>' + pInvoiceHeader.Amount + '</b></td>';
                    //ReportHTML += '                                             <td>' + pInvoiceHeader.CurrencyCode + '</td>';
                    //ReportHTML += '                                         </tr>';
                    //$("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")

                    //ReportHTML += '                                         <tr>';
                    //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                             <td><b>Total Amount : ' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                         </tr>';
                    ReportHTML += '                             </tbody>';
                    ReportHTML += '                         </table>';
                    ReportHTML += '                     </div>'

                    if ($("#cbLargeInvoice").prop("checked")) {
                        ReportHTML += '         <div class="col-xs-12 m-t-n">Please, see attachment.</div>';
                        ReportHTML += '         <div class="break"></div>';
                    }
                    else
                        ReportHTML += '                     <div class="row"></div>';
                    ReportHTML += '                         <div class="col-xs-8 m-t-n">';
                    ReportHTML += '                             <br>';
                    ReportHTML += '                         </div>';
                    ReportHTML += '                         <div class="col-xs-4 text-right m-t-n">';
                    if (pTaxAmount != 0 || pDiscountAmount != 0)
                        ReportHTML += '                             <b>Subtotal: </b>' + pInvoiceHeader.CurrencyCode + ' ' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                    //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + pInvoiceHeader.TaxPercentage + '</br>';
                    if (pTaxAmount != 0)
                        ReportHTML += '                             <b>VAT(' + pInvoiceHeader.TaxPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pTaxAmount.toFixed(2) + '</br>';
                    //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + pInvoiceHeader.DiscountPercentage + '</br>';
                    if (pDiscountAmount != 0)
                        ReportHTML += '                             <b>Discount(' + pInvoiceHeader.DiscountPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pDiscountAmount.toFixed(2) + '</br>';
                    ReportHTML += '                             <b>Total: </b>' + pInvoiceHeader.CurrencyCode + ' <b>' + parseFloat(pInvoiceHeader.Amount).toFixed(2) + '</b></br>';
                    ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(parseFloat(pInvoiceHeader.Amount).toFixed(2)) + ' ' + pInvoiceHeader.CurrencyCode + '</br>';
                    if ($("#cbPrintUSDTotal").prop("checked") && pInvoiceHeader.CurrencyCode.trim() == "EGP")
                        ReportHTML += '                             <b>USD Total: </b>' + ' <b>' + (pInvoiceHeader.Amount / $("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")).toFixed(2) + '</b></br>';
                    ReportHTML += '                         </div>';

                    //ReportHTML += '                     </div>'; //of table-responsive
                    //ReportHTML += '                 </section>';
                    //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                    ReportHTML += '             </div>'; //
                    ReportHTML += '         </body>';

                    //ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    //ReportHTML += '                     <div class="col-xs-3 m-t"><b>' + 'Accounting Manager' + '</b></div>';
                    //ReportHTML += '                     <div class="col-xs-2 m-t text-center"><b>' + 'Auditing' + '</b></div>';
                    //ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + 'Customer Service Supervisor' + '</b></div>';
                    //ReportHTML += '                     <div class="col-xs-3 m-t text-center"><b>' + 'Preparation' + '</b></div>';
                    //ReportHTML += '                 </div>'
                    //ReportHTML += '                 <div class="m-t" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    //ReportHTML += '                     <div class="col-xs-3 m-t-sm"><b>' + '....................................' + '</b></div>';
                    //ReportHTML += '                     <div class="col-xs-2 m-t-sm text-center"><b>' + '..................' + '</b></div>';
                    //ReportHTML += '                     <div class="col-xs-4 m-t-sm text-center"><b>' + '......................................................' + '</b></div>';
                    //ReportHTML += '                     <div class="col-xs-3 m-t-sm text-center">' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                    //ReportHTML += '                 </div>'

                    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                    //ReportHTML += '         <div class="row">'
                    //ReportHTML += '             <div class="col-xs-8 m-l"><b><i>' + ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.DirectionType").text() == 1
                    //                                                                ? 'Import Manager'
                    //                                                                : ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.DirectionType").text() == 2 ? 'Export Manager' : 'Domestic Manager')
                    //                                                                ) + '</i></b></div>';
                    //ReportHTML += '             <div class="col-xs-4 m-t-n-md float-right"><b><i>Accountant Signature</i></b></div>';
                    //ReportHTML += '         </div>'
                    //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
                    ReportHTML += '             <div class="col-xs-12 m-t-n-lg text-right"><b>Audited By : </b>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</div>';
                    ReportHTML += '                         <div class="col-xs-12 m-t-n">';
                    if ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                        ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                        ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                        ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                        ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                    }
                    else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                    }
                    else
                        ReportHTML += '                             <br>';
                    ReportHTML += '                         </div>';
                    ReportHTML += '         <div class="col-xs-12 m-t">' + '  Any discrepancies, what so ever should be notified within maximum seven days from the date from this document.  ' + '</div>';
                    //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                    //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
                    if ($("#cbPrintFooterInvoice").prop("checked"))
                        ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    else
                        ReportHTML += '         &emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>';
                    //else
                    //    ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                    if (1==1) {
                        pFinalReportHTML += ReportHTML;
                        Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                    }
                    else {
                        pFinalReportHTML += ReportHTML;
                        pFinalReportHTML += ' <div class="break"></div>';
                    }
                } //if (pDefaults.UnEditableCompanyName == "IFG")
                else if (pDefaults.UnEditableCompanyName == "PHO") {

                    var ReportHTML = '';
                    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                    //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                    //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + pInvoiceHeader.ConcatenatedInvoiceNumber + ')' + '</h3></div>';
                    ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + '</h3></div>';

                    ////ReportHTML += '             <div style="clear:both;"><br></div>';
                    ReportHTML += '         <div class="col-xs-1 m-l-n-md"><img src="/Content/Images/' + 'InvoiceSideStatement.jpg' + '" alt="logo"/></div>';
                    ReportHTML += '         <div class="col-xs-11">';
                    ReportHTML += '             <div class="col-xs-9"><b>Bill to: </b>' + pInvoiceHeader.PartnerName + '</div>';
                    ReportHTML += '             <div class="col-xs-3"><b>Inv.Date: </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '</div>';
                    ReportHTML += '             <div class="col-xs-9"><b>Address: </b>';
                    ReportHTML += '                 ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                    ReportHTML += '                 ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2));
                    ReportHTML += '                 ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                    ReportHTML += '                 ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                    ReportHTML += '             </div>';
                    ReportHTML += '             <div class="col-xs-3"><b>Due Date: </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '</div>';
                    ReportHTML += '             <div class="col-xs-12 b-b b-dark m-t-n-xs" style="clear:both;"></div>';

                    if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                        ReportHTML += '             <div class="col-xs-6"><b>Operation: </b>' + pMasterOperationCode + '</div>';
                    else
                        ReportHTML += '             <div class="col-xs-6"><b>Operation: </b>' + (pInvoiceHeader.OperationCode == 0 ? pInvoiceHeader.MasterOperationCode : pInvoiceHeader.OperationCode) + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Currency: </b>' + pInvoiceHeader.CurrencyCode + '</div>';
                    if ($("#cbPrintMBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU")
                        ReportHTML += '             <div class="col-xs-6"><b>MB/L No.: </b>' + pMasterBL + '</div>';
                    if ($("#cbPrintHBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ) {
                        if (pHouseBLs != "0")//Master Operation so show all houses on it
                            ReportHTML += '             <div class="col-xs-6"><b>HBL</b>: ' + pHouseBLs + '</div>';
                        else
                            ReportHTML += '             <div class="col-xs-6"><b>HB/L No.:</b> ' + (pHouseNumber == "" || pHouseNumber == "0" ? "" : pHouseNumber) + '</div>';
                    }
                    ReportHTML += '             <div class="col-xs-6"><b>POL: </b>' + pPOLName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>POD: </b>' + pPODName + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Weight: </b>' + pGrossWeightSum + ' KG</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>CBM: </b>' + pCBM + ' CBM</div>';
                    if (pOperationHeader.TransportType == OceanTransportType) {
                        ReportHTML += '         <div class="col-xs-6"><b>Vessel: </b>' + pVesselName + '</div>';
                    }
                    //for inland shipping line is written in LeftSignature
                    if (pOperationHeader.TransportType == InlandTransportType) {
                        ReportHTML += '         <div class="col-xs-6"><b>Shipping Line: </b>' + (pInvoiceHeader.LeftSignature == 0 ? "" : pInvoiceHeader.LeftSignature) + '</div>';
                    }
                    if (pOperationHeader.TransportType != AirTransportType) {
                        ReportHTML += '         <div class="col-xs-6"><b>Arrival Date: </b>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.ActualArrival)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.ActualArrival))) + '</div>';
                        ReportHTML += '         <div class="col-xs-6"><b>Containers: </b>' + (pOperationHeader.ShipmentType == 0 || pOperationHeader.ShipmentType == 2 || pOperationHeader.ShipmentType == 4 ? "LCL" : pContainerTypes) + '</div>';
                        ReportHTML += '         <div class="col-xs-6"><b>Container Numbers: </b>' + pContainerNumbers + '</div>';
                    }
                    if (pOperationHeader.PackageTypes != 0 || pOperationHeader.PackageTypesOnContainersTotals != 0 || pOperationHeader.PlacedOnOperationContainersAndPackagesID != 0)
                        ReportHTML += '         <div class="col-xs-6"><b>Packages: </b>' + (pOperationHeader.PackageTypes == 0 ? (pOperationHeader.PackageTypesOnContainersTotals == 0 ? (pOperationHeader.PlacedOnOperationContainersAndPackagesID == 0 ? "0" : pOperationHeader.PlacedOnOperationContainersAndPackagesID) : pOperationHeader.PackageTypesOnContainersTotals) : pOperationHeader.PackageTypes) + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Shipment Category: </b>' + pShipmentTypeCode + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Shipment Term: </b>' + pIncotermName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Commodity: </b>' + (pOperationHeader.CommodityName == 0 ? "" : pOperationHeader.CommodityName) + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Shipper: </b>' + pShipperName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Consignee: </b>' + pConsigneeName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Weight: </b>' + pGrossWeightSum + ' KGM' + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Customer Ref.: </b>' + (pOperationHeader.CustomerReference == 0 ? "" : pOperationHeader.CustomerReference) + '</div>';
                    if (pOperationHeader.CertificateNumber != 0)
                        ReportHTML += '         <div class="col-xs-6"><b>Certificate: </b>' + pOperationHeader.CertificateNumber + '</div>';
                    ReportHTML += '                     <div class="col-xs-12 clear">';
                    ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    ReportHTML += '                                     <th>Description</th>';
                    ReportHTML += '                                     <th>Qty</th>';
                    ReportHTML += '                                     <th>Unit Price</th>';
                    ReportHTML += '                                     <th>Sale Price</th>';
                    //ReportHTML += '                                     <th>Notes</th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    $.each(JSON.parse(data[2]), function (i, item) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        //if (pDefaults.UnEditableCompanyName == "TEL")
                        ReportHTML += '                                         <td>' + (item.Notes == 0 ? (item.ChargeTypeName == 0 ? "" : item.ChargeTypeName) : item.Notes) + '</td>';
                        //else
                        //    ReportHTML += '                                         <td>' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                        ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                        ReportHTML += '                                         <td>' + item.SalePrice + '</td>';
                        ReportHTML += '                                         <td>' + item.SaleAmount + '</td>';
                        //ReportHTML += '                                         <td>' + (item.Notes == "0" ? "" : item.Notes) + '</td>';
                        ReportHTML += '                                     </tr>';
                    });
                    if (pInvoiceHeader.FixedDiscount > 0) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + 'Special Discount' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2) + '</td>';
                        ReportHTML += '                                     </tr>';
                    }
                    //ReportHTML += '                                         <tr>';
                    //ReportHTML += '                                             <td colspan=2>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                             <td><b>' + pInvoiceHeader.Amount + '</b></td>';
                    //ReportHTML += '                                             <td>' + pInvoiceHeader.CurrencyCode + '</td>';
                    //ReportHTML += '                                         </tr>';
                    //$("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")

                    //ReportHTML += '                                         <tr>';
                    //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                             <td><b>Total Amount : ' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                         </tr>';
                    ReportHTML += '                             </tbody>';
                    ReportHTML += '                         </table>';
                    ReportHTML += '                     </div>'

                    if ($("#cbLargeInvoice").prop("checked")) {
                        ReportHTML += '         <div class="col-xs-12 m-t-n">Please, see attachment.</div>';
                        ReportHTML += '         <div class="break"></div>';
                    }
                    else
                        ReportHTML += '                         <div class="row"></div>';
                    ReportHTML += '                         <div class="col-xs-8 m-t-n">';
                    if ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                        ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                        ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                        ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                        ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                    }
                    else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                    }
                    else
                        ReportHTML += '                             <br>';
                    ReportHTML += '                         </div>';
                    ReportHTML += '                         <div class="col-xs-4 text-right m-t-n">';
                    if (pTaxAmount != 0 || pDiscountAmount != 0)
                        ReportHTML += '                             <b>Subtotal: </b>' + pInvoiceHeader.CurrencyCode + ' ' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                    //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + pInvoiceHeader.TaxPercentage + '</br>';
                    if (pTaxAmount != 0)
                        ReportHTML += '                             <b>VAT(' + pInvoiceHeader.TaxPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pTaxAmount.toFixed(2) + '</br>';
                    //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + pInvoiceHeader.DiscountPercentage + '</br>';
                    if (pDiscountAmount != 0)
                        ReportHTML += '                             <b>Discount(' + pInvoiceHeader.DiscountPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pDiscountAmount.toFixed(2) + '</br>';
                    ReportHTML += '                             <b>Total: </b>' + pInvoiceHeader.CurrencyCode + ' <b>' + parseFloat(pInvoiceHeader.Amount).toFixed(2) + '</b></br>';
                    ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(parseFloat(pInvoiceHeader.Amount).toFixed(2)) + ' ' + pInvoiceHeader.CurrencyCode + '</br>';
                    if ($("#cbPrintUSDTotal").prop("checked") && pInvoiceHeader.CurrencyCode.trim() == "EGP")
                        ReportHTML += '                             <b>USD Total: </b>' + ' <b>' + (pInvoiceHeader.Amount / $("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")).toFixed(2) + '</b></br>';
                    ReportHTML += '                         </div>';


                    //ReportHTML += '                     <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    //ReportHTML += '                         <div class="col-xs-3 m-t"><b>' + 'Reviewed By' + '</b></div>';
                    //ReportHTML += '                         <div class="col-xs-2 m-t text-center"><b>' + '&emsp;' + '</b></div>';
                    //ReportHTML += '                         <div class="col-xs-4 m-t text-center"><b>' + '&emsp;' + '</b></div>';
                    //ReportHTML += '                         <div class="col-xs-3 m-t text-right"><b>' + 'Approved By' + '</b></div>';
                    //ReportHTML += '                     </div>'
                    //ReportHTML += '                     <div class="m-t" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    //ReportHTML += '                         <div class="col-xs-3"><b>' + $("#hLoggedUserNameNotLogin").val() + '</b></div>';
                    //ReportHTML += '                         <div class="col-xs-2 text-center"><b>' + '&emsp;' + '</b></div>';
                    //ReportHTML += '                         <div class="col-xs-4 text-center"><b>' + '&emsp;' + '</b></div>';
                    //ReportHTML += '                         <div class="col-xs-3 text-right">' + '&emsp;' + '</div>';
                    //ReportHTML += '                     </div>'

                    ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftPosition != 0 ? pDefaultsRow.InvoiceLeftPosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddlePosition != 0 ? pDefaultsRow.InvoiceMiddlePosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightPosition != 0 ? pDefaultsRow.InvoiceRightPosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                 </div>'
                    ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftSignature != 0 ? pDefaultsRow.InvoiceLeftSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddleSignature != 0 ? pDefaultsRow.InvoiceMiddleSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightSignature != 0 ? pDefaultsRow.InvoiceRightSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                 </div>'
                    if ($("#cbPrintStamp").prop("checked"))
                        ReportHTML += '         <div class="text-right m-r-lg"><img src="/Content/Images/CompanyStamp.jpg" alt="stamp"/></div>';

                    ReportHTML += '                 </div>'; //of InvoiceSideStatement

                    //ReportHTML += '                     </div>'; //of table-responsive
                    //ReportHTML += '                 </section>';
                    //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                    ReportHTML += '             </div>'; //
                    ReportHTML += '         </body>';

                    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                    //ReportHTML += '         <div class="row">'
                    //ReportHTML += '             <div class="col-xs-8 m-l"><b><i>' + ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.DirectionType").text() == 1
                    //                                                                ? 'Import Manager'
                    //                                                                : ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.DirectionType").text() == 2 ? 'Export Manager' : 'Domestic Manager')
                    //                                                                ) + '</i></b></div>';
                    //ReportHTML += '             <div class="col-xs-4 m-t-n-md float-right"><b><i>Accountant Signature</i></b></div>';
                    //ReportHTML += '         </div>'
                    //ReportHTML += '         <div class="row text-right m-r m-t">' + '  يتنبه نحو عدم الخصم من تحت حساب الضريبة حيث أن الشركة تتبع نظام الدفعات المقدمة تطبيقا لأحكام لمادة (62) من القانون رقم 91 لسنة 2005  ' + '</div>';
                    ReportHTML += '         <div class=" text-right m-r-lg row">' + '  تخضع الشركة لنظام الدفعات المقدمة  ' + '</div>';
                    //ReportHTML += '         <div class="row text-right m-r">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
                    //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
                    //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                    //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
                    if ($("#cbPrintFooterInvoice").prop("checked"))
                        ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    else
                        ReportHTML += '         &emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>';
                    //else
                    //    ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                    if (1==1) {
                        pFinalReportHTML += ReportHTML;
                        Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                    }
                    else {
                        pFinalReportHTML += ReportHTML;
                        pFinalReportHTML += ' <div class="break"></div>';
                    }
                } //else if (pDefaults.UnEditableCompanyName == "PHO")
                else if (pDefaults.UnEditableCompanyName == "LSC" || pDefaults.UnEditableCompanyName == "CSC") {
                    var ReportHTML = '';
                    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                    //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                    //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + pInvoiceHeader.ConcatenatedInvoiceNumber + ')' + '</h3></div>';
                    ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + '</h3></div>';

                    ////ReportHTML += '             <div style="clear:both;"><br></div>';
                    //ReportHTML += '         <div class="col-xs-1 m-l-n-md"><img src="/Content/Images/' + 'InvoiceSideStatement.jpg' + '" alt="logo"/></div>';

                    ReportHTML += '             <div class="col-xs-8"></div>' + '<div class="col-xs-4" style="font-size:95%;">' + (pDefaults.AddressLine1 == 0 ? "" : pDefaults.AddressLine1) + '</div>';
                    ReportHTML += '             <div class="col-xs-8"></div>' + '<div class="col-xs-4" style="font-size:95%;">' + (pDefaults.AddressLine2 == 0 ? "" : pDefaults.AddressLine2) + '</div>';
                    ReportHTML += '             <div class="col-xs-8"></div>' + '<div class="col-xs-4" style="font-size:95%;">' + 'TEL:' + (pDefaults.Phones == 0 ? "" : pDefaults.Phones) + '</div>';
                    ReportHTML += '             <div class="col-xs-8"></div>' + '<div class="col-xs-4" style="font-size:95%;">' + 'FAX:' + (pDefaults.Faxes == 0 ? "" : pDefaults.Faxes) + '</div>';
                    ReportHTML += '             <div class="col-xs-8"></div>' + '<div class="col-xs-4" style="font-size:95%;">' + 'COMMERCIAL REG# ' + (pDefaults.CommericalRegNo == 0 ? "" : pDefaults.CommericalRegNo) + '</div>';
                    ReportHTML += '             <div class="col-xs-8"></div>' + '<div class="col-xs-4" style="font-size:95%;">' + 'TAX ID NO. ' + (pDefaults.VatIDNo == 0 ? "" : pDefaults.VatIDNo) + '</div>';

                    ReportHTML += '         <div class="col-xs-12">';
                    //ReportHTML += '             <div class="col-xs-8"><b>Address: </b>';
                    //ReportHTML += '                 ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                    //ReportHTML += '                 ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2));
                    //ReportHTML += '                 ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                    //ReportHTML += '                 ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                    //ReportHTML += '             </div>';
                    ReportHTML += '             <div class="col-xs-8 m-t-lg"><b>Customer Name: </b>' + '</div>' + '<div class="col-xs-4 m-t-lg"><b>Invoice No. : </b>' + pInvoiceHeader.InvoiceNumber + '</div>';
                    ReportHTML += '             <div class="col-xs-8">' + pInvoiceHeader.PartnerName + '</div>' + '<div class="col-xs-4" style="font-size:95%;"><b>Job No. : </b>' + (pOperationHeader.Code == 0 ? pOperationHeader.MasterOperationCode : pOperationHeader.Code) + '</div>';
                    ReportHTML += '             <div class="col-xs-8"></div>' + '<div class="col-xs-4" style="font-size:95%;"><b>Date : </b>' + pInvoiceDate + '</div>';
                    ReportHTML += '             <div class="col-xs-8"></div>' + '<div class="col-xs-4" style="font-size:95%;"><b>Currency : </b>' + pInvoiceHeader.CurrencyCode + '</div>';

                    ReportHTML += '             <div class="col-xs-12 b-b b-dark" style="clear:both;"></div>';

                    ReportHTML += '             <div class="col-xs-8"><b>Shipper: </b>' + pShipperName + '</div>';
                    ReportHTML += '             <div class="col-xs-4"><b>POL: </b>' + pPOLName + '</div>';
                    ReportHTML += '             <div class="col-xs-8"><b>Consignee: </b>' + pConsigneeName + '</div>';
                    ReportHTML += '             <div class="col-xs-4"><b>POD: </b>' + pPODName + '</div>';
                    ReportHTML += '             <div class="col-xs-8"><b>Notify: </b>' + (pOperationHeader.Notify1Name == 0 ? "" : pOperationHeader.Notify1Name) + '</div>';
                    ReportHTML += '             <div class="col-xs-4"><b>PO# / REF: </b>' + (pInvoiceHeader.MiddleSignature == 0 ? "" : pInvoiceHeader.MiddleSignature) + '</div>';
                    //if ($("#cbPrintMBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU")
                    ReportHTML += '             <div class="col-xs-8"><b>MB/L No.: </b>' + pMasterBL + '</div>';
                    ReportHTML += '             <div class="col-xs-4"><b>Weight: </b>' + pGrossWeightSum + ' KG</div>';
                    ReportHTML += '             <div class="col-xs-8">' + '</div>';
                    ReportHTML += '             <div class="col-xs-4"><b>Volume: </b>' + pOperationHeader.VolumeSum + ' CBM</div>';
                    if ($("#cbPrintHBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ) {
                        if (pHouseBLs != "0")//Master Operation so show all houses on it
                            ReportHTML += '             <div class="col-xs-4"><b>HBL</b>: ' + pHouseBLs + '</div>';
                        else
                            ReportHTML += '             <div class="col-xs-4"><b>HB/L No.:</b> ' + (pHouseNumber == "" || pHouseNumber == "0" ? "" : pHouseNumber) + '</div>';
                    }
                    //ReportHTML += '             <div class="col-xs-6"><b>CBM: </b>' + pCBM + ' CBM</div>';
                    //if (pOperationHeader.TransportType == OceanTransportType) {
                    //    ReportHTML += '         <div class="col-xs-8"><b>Vessel: </b>' + pVesselName + '</div>';
                    //}
                    //if (pOperationHeader.TransportType != AirTransportType) {
                    //    ReportHTML += '         <div class="col-xs-4"><b>Arrival Date: </b>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.ActualArrival)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.ActualArrival))) + '</div>';
                    //    ReportHTML += '         <div class="col-xs-8"><b>Containers: </b>' + (pOperationHeader.ShipmentType == 0 || pOperationHeader.ShipmentType == 2 || pOperationHeader.ShipmentType == 4 ? "LCL" : pContainerTypes) + '</div>';
                    //    ReportHTML += '         <div class="col-xs-4"><b>Cont.Nos: </b>' + pContainerNumbers + '</div>';
                    //}
                    //if (pOperationHeader.NumberOfPackages > 0 || pOperationHeader.PackageTypes != 0 || pOperationHeader.PackageTypesOnContainersTotals != 0 || pOperationHeader.PlacedOnOperationContainersAndPackagesID != 0)
                    //    ReportHTML += '         <div class="col-xs-6"><b>Packages: </b>' + (pOperationHeader.NumberOfPackages > 0 ? (pOperationHeader.NumberOfPackages  + 'x' + pOperationHeader.PackageTypeName) : (pOperationHeader.PackageTypes == 0 ? (pOperationHeader.PackageTypesOnContainersTotals == 0 ? (pOperationHeader.PlacedOnOperationContainersAndPackagesID == 0 ? "0" : pOperationHeader.PlacedOnOperationContainersAndPackagesID) : pOperationHeader.PackageTypesOnContainersTotals) : pOperationHeader.PackageTypes)) + '</div>';
                    //if (pOperationHeader.PackageTypes != 0 || pOperationHeader.PackageTypesOnContainersTotals != 0 || pOperationHeader.PlacedOnOperationContainersAndPackagesID != 0)
                    //    ReportHTML += '         <div class="col-xs-6"><b>Packages: </b>' + (pOperationHeader.PackageTypes == 0 ? (pOperationHeader.PackageTypesOnContainersTotals == 0 ? (pOperationHeader.PlacedOnOperationContainersAndPackagesID == 0 ? "0" : pOperationHeader.PlacedOnOperationContainersAndPackagesID) : pOperationHeader.PackageTypesOnContainersTotals) : pOperationHeader.PackageTypes) + '</div>';
                    if ($("#cbLargeInvoice").prop("checked")) {
                        ReportHTML += '         <div class="col-xs-12 m-t-lg">Please, see attachment.</div>';
                        ReportHTML += '         <div class="break"></div>';
                    }
                    else
                        ReportHTML += '                         <div class="row"></div>';
                    ReportHTML += '                     <div class="col-xs-12 clear">';
                    ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    ReportHTML += '                                     <th style="width:5%;">Serial</th>';
                    ReportHTML += '                                     <th>Description</th>';
                    ReportHTML += '                                     <th>Qty</th>';
                    ReportHTML += '                                     <th>Unit Price</th>';
                    ReportHTML += '                                     <th>Amount</th>';
                    //ReportHTML += '                                     <th>Notes</th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    $.each(JSON.parse(data[2]), function (i, item) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + (i + 1) + '</td>';
                        ReportHTML += '                                         <td style="text-align:left;">' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                        ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                        ReportHTML += '                                         <td>' + item.SalePrice.toFixed(2) + '</td>';
                        ReportHTML += '                                         <td>' + item.SaleAmount.toFixed(2) + '</td>';
                        //ReportHTML += '                                         <td>' + (item.Notes == "0" ? "" : item.Notes) + '</td>';
                        ReportHTML += '                                     </tr>';
                    });
                    if (pInvoiceHeader.FixedDiscount > 0) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td style="text-align:left;">' + 'Special Discount' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2) + '</td>';
                        ReportHTML += '                                     </tr>';
                    }

                    if (pTaxAmount != 0 || pDiscountAmount != 0) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td style="text-align:left;">' + '<b>Subtotal</b>' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' /*+ pInvoiceHeader.CurrencyCode + ' '*/ + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        ReportHTML += '                                     </tr>';
                    }
                    if (pTaxAmount != 0) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td style="text-align:left;">' + '<b>VAT tax ' + pInvoiceHeader.TaxPercentage + '% </b>' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' /*+ pInvoiceHeader.CurrencyCode + ' '*/ + pTaxAmount.toFixed(2) + '</td>';
                        ReportHTML += '                                     </tr>';
                    }
                    if (pDiscountAmount != 0) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td style="text-align:left;">' + '<b>Tax deduction ' + pInvoiceHeader.DiscountPercentage + '% </b>' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' /*+ pInvoiceHeader.CurrencyCode + ' '*/ + pDiscountAmount.toFixed(2) + '</td>';
                        ReportHTML += '                                     </tr>';
                    }
                    {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td colspan=3 style="text-align:left;">' + '<b>Total: </b>' + '</td>';
                        ReportHTML += '                                         <td>' + ' <b>' + parseFloat(pInvoiceHeader.Amount).toFixed(2) + '</b>' + '</td>';
                        ReportHTML += '                                     </tr>';

                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td colspan=5 style="text-align:left;">' + '&emsp;&emsp;&emsp;&emsp;<b>ONLY : </b>' + toWords_WithFractionNumbers(parseFloat(pInvoiceHeader.Amount).toFixed(2)) + ' ' + pInvoiceHeader.CurrencyCode + '</td>';
                        ReportHTML += '                                     </tr>';
                    }

                    ReportHTML += '                             </tbody>';
                    ReportHTML += '                         </table>';
                    ReportHTML += '                     </div>'
                    if ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                        //ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter-BankDetails.jpg" alt="footer"/></div>';
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                        ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                        ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                        ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                        ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                    }
                    else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                        ReportHTML += '<div class="col-xs-12">'; //style="border:1px solid black"
                        ReportHTML += '                             <b>OUR BANK:</b></br>';
                        ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>").replace(/\ /g, "&nbsp;");
                        ReportHTML += '                 </div>';
                        ReportHTML += '         &emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>';
                    }
                    ReportHTML += '             </div>';

                    ReportHTML += '         </body>';

                    ReportHTML += '                 <div class="m-t-lg" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftPosition != 0 ? pDefaultsRow.InvoiceLeftPosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddlePosition != 0 ? pDefaultsRow.InvoiceMiddlePosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightPosition != 0 ? pDefaultsRow.InvoiceRightPosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                 </div>'
                    ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftSignature != 0 ? pDefaultsRow.InvoiceLeftSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddleSignature != 0 ? pDefaultsRow.InvoiceMiddleSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightSignature != 0 ? pDefaultsRow.InvoiceRightSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                 </div>'
                    if ($("#cbPrintStamp").prop("checked"))
                        ReportHTML += '         <div class="text-right m-r-lg"><img src="/Content/Images/CompanyStamp.jpg" alt="stamp"/></div>';

                    ReportHTML += '     <footer class="footer col-xs-12 " style="width:100%; position:absolute; bottom:0;">';

                    if ($("#cbPrintFooterInvoice").prop("checked"))
                        ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    else
                        ReportHTML += '         &emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>';
                    //else
                    //    ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                    if (1==1) {
                        pFinalReportHTML += ReportHTML;
                        Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                    }
                    else {
                        pFinalReportHTML += ReportHTML;
                        pFinalReportHTML += ' <div class="break"></div>';
                    }
                } //EOF else if (pDefaults.UnEditableCompanyName == "LSC" || pDefaults.UnEditableCompanyName == "CSC")
                else if (pDefaults.UnEditableCompanyName == "KDM") {
                    var ReportHTML = '';
                    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                    //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                    //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + pInvoiceHeader.ConcatenatedInvoiceNumber + ')' + '</h3></div>';
                    ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + '</h3></div>';

                    ////ReportHTML += '             <div style="clear:both;"><br></div>';
                    //ReportHTML += '         <div class="col-xs-1 m-l-n-md"><img src="/Content/Images/' + 'InvoiceSideStatement.jpg' + '" alt="logo"/></div>';
                    ReportHTML += '         <div class="col-xs-12 m-t">';

                    ReportHTML += '             <div class="col-xs-8"><b>Bill to: </b>' + pInvoiceHeader.PartnerName + '</div>';
                    ReportHTML += '             <div class="col-xs-4"><b>Inv.Date: </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '</div>';
                    ReportHTML += '             <div class="col-xs-8"><b>Address: </b>';
                    ReportHTML += '                 ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                    ReportHTML += '                 ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2));
                    ReportHTML += '                 ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                    ReportHTML += '                 ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                    ReportHTML += '             </div>';
                    ReportHTML += '             <div class="col-xs-4"><b>Due Date: </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '</div>';
                    ReportHTML += '             <div class="col-xs-12" style="clear:both;"><b>Reference Number: </b> ' + (pOperationHeader.ReleaseNumber == 0 ? "" : pOperationHeader.ReleaseNumber) + '</div>';
                    ReportHTML += '             <div class="col-xs-12 b-b b-dark" style="clear:both;"></div>';

                    if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                        ReportHTML += '             <div class="col-xs-8"><b>Operation: </b>' + pMasterOperationCode + '</div>';
                    else
                        ReportHTML += '             <div class="col-xs-8"><b>Operation: </b>' + (pInvoiceHeader.OperationCode == 0 ? pInvoiceHeader.MasterOperationCode : pInvoiceHeader.OperationCode) + '</div>';
                    ReportHTML += '             <div class="col-xs-4"><b>Currency: </b>' + pInvoiceHeader.CurrencyCode + '</div>';
                    if ($("#cbPrintMBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU")
                        ReportHTML += '             <div class="col-xs-8"><b>' + (pOperationHeader.TransportType == AirTransportType ? 'MAWB' : 'MB/L') + ' No.: </b>' + pMasterBL + '</div>';
                    if ($("#cbPrintHBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ) {
                        if (pHouseBLs != "0")//Master Operation so show all houses on it
                            ReportHTML += '             <div class="col-xs-4"><b>' + (pOperationHeader.TransportType == AirTransportType ? 'HAWB' : 'HBL') + '</b>: ' + pHouseBLs + '</div>';
                        else
                            ReportHTML += '             <div class="col-xs-4"><b>' + (pOperationHeader.TransportType == AirTransportType ? 'HAWB' : 'HB/L No.:') + '</b> ' + (pHouseNumber == "" || pHouseNumber == "0" ? "" : pHouseNumber) + '</div>';
                    }
                    ReportHTML += '             <div class="col-xs-8"><b>' + (pOperationHeader.TransportType == AirTransportType ? 'AOL: ' : 'POL: ') + '</b>' + pPOLName + '</div>';
                    ReportHTML += '             <div class="col-xs-4"><b>' + (pOperationHeader.TransportType == AirTransportType ? 'AOD: ' : 'POD: ') + '</b>' + pPODName + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Weight: </b>' + pGrossWeightSum + ' KG</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>CBM: </b>' + pCBM + ' CBM</div>';
                    if (pOperationHeader.TransportType == OceanTransportType) {
                        ReportHTML += '         <div class="col-xs-8"><b>Vessel: </b>' + pVesselName + '</div>';
                    }
                    //for inland shipping line is written in LeftSignature
                    if (pOperationHeader.TransportType == InlandTransportType) {
                        ReportHTML += '         <div class="col-xs-6"><b>Shipping Line: </b>' + (pInvoiceHeader.LeftSignature == 0 ? "" : pInvoiceHeader.LeftSignature) + '</div>';
                    }
                    if (pOperationHeader.TransportType != AirTransportType) {
                        ReportHTML += '         <div class="col-xs-4"><b>Arrival Date: </b>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.ActualArrival)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.ActualArrival))) + '</div>';
                        ReportHTML += '         <div class="col-xs-8"><b>Containers: </b>' + (pOperationHeader.ShipmentType == 0 || pOperationHeader.ShipmentType == 2 || pOperationHeader.ShipmentType == 4 ? "LCL" : pContainerTypes) + '</div>';
                        ReportHTML += '         <div class="col-xs-4"><b>Cont.Nos: </b>' + pContainerNumbers + '</div>';
                    }
                    //if (pOperationHeader.NumberOfPackages > 0 || pOperationHeader.PackageTypes != 0 || pOperationHeader.PackageTypesOnContainersTotals != 0 || pOperationHeader.PlacedOnOperationContainersAndPackagesID != 0)
                    //    ReportHTML += '         <div class="col-xs-6"><b>Packages: </b>' + (pOperationHeader.NumberOfPackages > 0 ? (pOperationHeader.NumberOfPackages  + 'x' + pOperationHeader.PackageTypeName) : (pOperationHeader.PackageTypes == 0 ? (pOperationHeader.PackageTypesOnContainersTotals == 0 ? (pOperationHeader.PlacedOnOperationContainersAndPackagesID == 0 ? "0" : pOperationHeader.PlacedOnOperationContainersAndPackagesID) : pOperationHeader.PackageTypesOnContainersTotals) : pOperationHeader.PackageTypes)) + '</div>';
                    if (pOperationHeader.PackageTypes != 0 || pOperationHeader.PackageTypesOnContainersTotals != 0 || pOperationHeader.PlacedOnOperationContainersAndPackagesID != 0)
                        ReportHTML += '         <div class="col-xs-6"><b>Packages: </b>' + (pOperationHeader.PackageTypes == 0 ? (pOperationHeader.PackageTypesOnContainersTotals == 0 ? (pOperationHeader.PlacedOnOperationContainersAndPackagesID == 0 ? "0" : pOperationHeader.PlacedOnOperationContainersAndPackagesID) : pOperationHeader.PackageTypesOnContainersTotals) : pOperationHeader.PackageTypes) + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Shipment Category: </b>' + pShipmentTypeCode + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Shipment Term: </b>' + pIncotermName + '</div>';
                    ReportHTML += '             <div class="col-xs-8"><b>Commodity: </b>' + (pOperationHeader.CommodityName == 0 ? "" : pOperationHeader.CommodityName) + '</div>';
                    ReportHTML += '             <div class="col-xs-4"><b>Shipper: </b>' + pShipperName + '</div>';
                    ReportHTML += '             <div class="col-xs-8"><b>Consignee: </b>' + pConsigneeName + '</div>';
                    ReportHTML += '             <div class="col-xs-4"><b>Weight: </b>' + pGrossWeightSum + ' KGM' + '</div>';
                    if (pOperationHeader.TransportType == AirTransportType)
                        ReportHTML += '             <div class="col-xs-6"><b>ChargeableWeight: </b>' + pOperationHeader.ChargeableWeight + ' KGM' + '</div>';
                    if (pOperationHeader.CertificateNumber != 0)
                        ReportHTML += '         <div class="col-xs-6"><b>Certificate: </b>' + pOperationHeader.CertificateNumber + '</div>';
                    if (pInvoiceHeader.EditableNotes != "0")
                        ReportHTML += '         <div class="col-xs-12 clear"><b>Notes: </b>' + pInvoiceHeader.EditableNotes + '</div>';
                    ReportHTML += '                     <div class="col-xs-12 clear">';
                    ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    ReportHTML += '                                     <th>Description</th>';
                    ReportHTML += '                                     <th>' + (pOperationHeader.TransportType == AirTransportType ? "KG/Qty" : (pOperationHeader.TransportType == OceanTransportType ? "Cont./Qty" : "Qty")) + '</th>';
                    ReportHTML += '                                     <th>Unit Price</th>';
                    ReportHTML += '                                     <th>Sale Price</th>';
                    //ReportHTML += '                                     <th>Notes</th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    $.each(JSON.parse(data[2]), function (i, item) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td style="text-align:left;">' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                        ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                        ReportHTML += '                                         <td>' + item.SalePrice.toFixed(2) + '</td>';
                        ReportHTML += '                                         <td>' + item.SaleAmount.toFixed(2) + '</td>';
                        //ReportHTML += '                                         <td>' + (item.Notes == "0" ? "" : item.Notes) + '</td>';
                        ReportHTML += '                                     </tr>';
                    });
                    if (pInvoiceHeader.FixedDiscount > 0) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td style="text-align:left;">' + 'Special Discount' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2) + '</td>';
                        ReportHTML += '                                     </tr>';
                    }

                    if (pTaxAmount != 0 || pDiscountAmount != 0) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td style="text-align:left;">' + '<b>Subtotal</b>' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' /*+ pInvoiceHeader.CurrencyCode + ' '*/ + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        ReportHTML += '                                     </tr>';
                    }
                    if (pTaxAmount != 0) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td style="text-align:left;">' + '<b>VAT tax ' + pInvoiceHeader.TaxPercentage + '% </b>' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' /*+ pInvoiceHeader.CurrencyCode + ' '*/ + pTaxAmount.toFixed(2) + '</td>';
                        ReportHTML += '                                     </tr>';
                    }
                    if (pDiscountAmount != 0) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td style="text-align:left;">' + '<b>Tax deduction ' + pInvoiceHeader.DiscountPercentage + '% </b>' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' /*+ pInvoiceHeader.CurrencyCode + ' '*/ + pDiscountAmount.toFixed(2) + '</td>';
                        ReportHTML += '                                     </tr>';
                    }
                    {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td colspan=3 style="text-align:left;">' + '<b>Total: </b>' + pInvoiceHeader.CurrencyCode + '</td>';
                        ReportHTML += '                                         <td>' + ' <b>' + parseFloat(pInvoiceHeader.Amount).toFixed(2) + '</b>' + '</td>';
                        ReportHTML += '                                     </tr>';

                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td colspan=4 style="text-align:left;">' + '<b>ONLY : </b>' + toWords_WithFractionNumbers(parseFloat(pInvoiceHeader.Amount).toFixed(2)) + ' ' + pInvoiceHeader.CurrencyCode + '</td>';
                        ReportHTML += '                                     </tr>';
                    }


                    //ReportHTML += '                                         <tr>';
                    //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                             <td><b>Total Amount : ' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                         </tr>';
                    ReportHTML += '                             </tbody>';
                    ReportHTML += '                         </table>';
                    ReportHTML += '                     </div>'
                    ReportHTML += '             <div class="col-xs-12"><b>Tax ID: </b>' + pDefaultsRow.TaxNumber + '</div>';
                    ReportHTML += '             <div class="col-xs-12"><b>Tax File: </b>' + '5/03905/555' + '</div>';

                    if ($("#cbLargeInvoice").prop("checked")) {
                        ReportHTML += '         <div class="col-xs-12 m-t-n">Please, see attachment.</div>';
                        ReportHTML += '         <div class="break"></div>';
                    }
                    else
                        ReportHTML += '                         <div class="row"></div>';
                    //ReportHTML += '                         <div class="col-xs-8">';
                    //if ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                    //    ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                    //    ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                    //    ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                    //    ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                    //    ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                    //    ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                    //}
                    //    //kk: added 2nd condition
                    //else if ($("#cbPrintBankDetailsFromTemplate").prop("checked") && pDefaults.UnEditableCompanyName != "KDM") {
                    //    ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                    //    ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                    //}
                    //else
                    //    ReportHTML += '                             <br>';
                    //ReportHTML += '                         </div>';
                    //ReportHTML += '                         <div class="col-xs-4">';
                    ////if (pTaxAmount != 0 || pDiscountAmount != 0)
                    ////    ReportHTML += '                             <b>Subtotal: </b>' + pInvoiceHeader.CurrencyCode + ' ' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                    //////ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + pInvoiceHeader.TaxPercentage + '</br>';
                    ////if (pTaxAmount != 0)
                    ////    ReportHTML += '                             <b>VAT(' + pInvoiceHeader.TaxPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pTaxAmount.toFixed(2) + '</br>';
                    //////ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + pInvoiceHeader.DiscountPercentage + '</br>';
                    ////if (pDiscountAmount != 0)
                    ////    ReportHTML += '                             <b>WHT(' + pInvoiceHeader.DiscountPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pDiscountAmount.toFixed(2) + '</br>';
                    ////ReportHTML += '                             <b>Total: </b>' + pInvoiceHeader.CurrencyCode + ' <b>' + parseFloat(pInvoiceHeader.Amount).toFixed(2) + '</b></br>';
                    ////ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(parseFloat(pInvoiceHeader.Amount).toFixed(2)) + ' ' + pInvoiceHeader.CurrencyCode + '</br>';
                    ////if ($("#cbPrintUSDTotal").prop("checked") && pInvoiceHeader.CurrencyCode.trim() == "EGP")
                    ////    ReportHTML += '                             <b>USD Total: </b>' + ' <b>' + (pInvoiceHeader.Amount / $("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")).toFixed(2) + '</b></br>';
                    //ReportHTML += '                         </div>';

                    ReportHTML += '             </div>';

                    ReportHTML += '         </body>';

                    ReportHTML += '                 <div class="m-t-lg" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftPosition != 0 ? pDefaultsRow.InvoiceLeftPosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddlePosition != 0 ? pDefaultsRow.InvoiceMiddlePosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightPosition != 0 ? pDefaultsRow.InvoiceRightPosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                 </div>'
                    ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftSignature != 0 ? pDefaultsRow.InvoiceLeftSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddleSignature != 0 ? pDefaultsRow.InvoiceMiddleSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightSignature != 0 ? pDefaultsRow.InvoiceRightSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                 </div>'
                    if ($("#cbPrintStamp").prop("checked"))
                        ReportHTML += '         <div class="text-right m-r-lg"><img src="/Content/Images/CompanyStamp.jpg" alt="stamp"/></div>';

                    ReportHTML += '     <footer class="footer col-xs-12 " style="width:100%; position:absolute; bottom:0;">';
                    if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                        ReportHTML += '<div class="col-xs-12" style="border:1px solid black"> ';
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>").replace(/\ /g, "&nbsp;");
                        ReportHTML += '                 </div>';
                        ReportHTML += '         &emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>';
                    }
                    else if ($("#cbPrintFooterInvoice").prop("checked"))
                        ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter-BankDetails.jpg" alt="footer"/></div>';
                    else
                        ReportHTML += '         &emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>';
                    //else
                    //    ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                    if (1==1) {
                        pFinalReportHTML += ReportHTML;
                        Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                    }
                    else {
                        pFinalReportHTML += ReportHTML;
                        pFinalReportHTML += ' <div class="break"></div>';
                    }
                } //else if (pDefaults.UnEditableCompanyName == "KDM")
                else if (pDefaults.UnEditableCompanyName == "FRE") {
                    //var cnt = 0;
                    //var InvoiceNumber = ConcatenatedInvoiceNumber;
                    //for (cnt = 0; cnt < 5; cnt++) {
                    //    if (InvoiceNumber.length < 5) {
                    //        InvoiceNumber = "0" + InvoiceNumber;
                    //    }
                    //}
                    //ReportHTML += '                         <p class="text-center">' + InvoiceNumber + '</p>';
                    if (pInvoiceHeader.BranchName == "JEDDAH") {

                        var ReportHTML = "";
                        ReportHTML += '<html>';
                        ReportHTML += '     <head><title></title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        //        ReportHTML += '         <div class="break"></div>'; //to start a new page
                        ReportHTML += '        <div class="" style="height:100%;">';
                        ReportHTML += '                 <div class="col-xs-12 b-blue" style="height:4.2cm;">';
                        ReportHTML += '                 </div>';

                        ReportHTML += '             <div class="col-xs-12 b-blue" style="height:3.5cm;">';
                        ReportHTML += '                 <div class="col-xs-6 b-blue ">';
                        ReportHTML += '                     <div class="b-blue row" style="height:2.8cm; font-size:12px;">';
                        ReportHTML += '                         <p class="text-center">' + pInvoiceHeader.PartnerName;
                        ReportHTML += '                             <br><b> </b>';
                        ReportHTML += '                             ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                        ReportHTML += '                             ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2));
                        ReportHTML += '                             ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                        ReportHTML += '                             ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                        ReportHTML += '                             <br><b>VAT No: </b>';
                        ReportHTML += '                             ' + (pClientHeader.VATNumber == "" ? "" : pClientHeader.VATNumber);
                        ReportHTML += '                         </p>';
                        ReportHTML += '                     </div>';
                        ReportHTML += '                 </div>';
                        ReportHTML += '                 <div class="col-xs-6 b-blue" style="height:2.8cm;">';
                        ReportHTML += '                     <div class="b-blue row" style="height:1cm; font-size:14px;">';
                        ReportHTML += '                         <p class="text-center">' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '</p>';
                        ReportHTML += '                     </div>';
                        ReportHTML += '                     <div class="b-blue row" style="height:.9cm; font-size:14px;">';
                        var cnt = 0;
                        var InvoiceNumber = pInvoiceHeader.InvoiceNumber;
                        for (cnt = 0; cnt < 5; cnt++) {
                            if (InvoiceNumber.length < 5) {
                                InvoiceNumber = "0" + InvoiceNumber;
                            }
                        }
                        ReportHTML += '                         <p class="text-center">' + InvoiceNumber + '</p>';

                        //ReportHTML += '                         <p class="text-center">' + pInvoiceHeader.InvoiceNumber + '</p>';
                        ReportHTML += '                     </div>';
                        ReportHTML += '                     <div class="b-blue row" style="height:.9cm; font-size:14px;">';
                        ReportHTML += '                         <p class="text-center">' + pOperationHeader.Code + '</p>';
                        ReportHTML += '                     </div>';
                        ReportHTML += '                 </div>';
                        ReportHTML += '             </div>';

                        ReportHTML += '                 <div class="col-xs-12 b-blue"  style="height:2.6cm;">';
                        ReportHTML += '                     <div class="b-blue row" style="height:1cm; font-size:12px;">';
                        ReportHTML += '                     </div>';
                        ReportHTML += '                     <div class="b-blue row m-t-n" style="height:1.6cm; font-size:12px;">';
                        ReportHTML += '                         <table id="tblOperationContainersAndPackages" class="table table-striped m-l-md m-r-md" style="font-size:14 px; ">';
                        ReportHTML += '                             <thead>';
                        ReportHTML += '                             </thead>';
                        ReportHTML += '                             <tbody>';
                        ReportHTML += '                                 <tr class="" style="font-size:95%;">';
                        ReportHTML += '                                     <td style="width:28%; border-color:white!Important; text-align:center; vertical-align: center;">' + (pOperationHeader.ContainerTypes == 0 ? "" : pOperationHeader.ContainerTypes) + '<br>BL: ' + (pOperationHeader.MasterBL == 0 ? "" : pOperationHeader.MasterBL) + '</td>';
                        ReportHTML += '                                     <td style="width:8%; border-color:white!Important; text-align:left; vertical-align: center;">' + '0'/*pInvoiceHeader.InvoiceNumber*/ + '</td>';
                        ReportHTML += '                                     <td style="width:16.4%; border-color:white!Important; text-align:center; vertical-align: center;">' + pOperationHeader.PackageTypes + '</td>';
                        ReportHTML += '                                     <td style="width:34.8%; border-color:white!Important; text-align:center; vertical-align: center;">' + (pOperationHeader.CommodityName == 0 ? "" : pOperationHeader.CommodityName) /*pOperationHeader.DescriptionOfGoods*/ + '</td>';
                        ReportHTML += '                                     <td style="width:11.9%; border-color:white!Important; text-align:center; vertical-align: center;">' + pOperationHeader.GrossWeightSum + '</td>';
                        ReportHTML += '                                 </tr>';
                        ReportHTML += '                             </tbody>';
                        ReportHTML += '                         </table>';
                        ReportHTML += '                     </div>';
                        ReportHTML += '                 </div>';


                        ReportHTML += '                <br> <div class="col-xs-12 b-blue"  style="height:2.1cm;">';
                        ReportHTML += '                     <div class="b-blue row" style="height:.2cm; font-size:12px;">';
                        ReportHTML += '                     </div>';
                        ReportHTML += '                     <div class="b-blue row" style="height:1.1cm; font-size:12px;">';
                        ReportHTML += '                         <table id="tblOperationContainersAndPackages" class="table table-striped m-l-md" style="font-size:14px; ">';
                        ReportHTML += '                             <thead>';
                        ReportHTML += '                             </thead>';
                        ReportHTML += '                             <tbody>';
                        ReportHTML += '                                 <tr style="font-size:95%;">';
                        ReportHTML += '                                     <td style="width:21%; border-color:white!Important; text-align:center; vertical-align: center;">' + (pOperationHeader.LineName == 0 ? "" : pOperationHeader.LineName) + '</td>';
                        ReportHTML += '                                     <td style="width:18.6%; border-color:white!Important; text-align:center; vertical-align: center;">' + (pPOLName == 0 ? "" : pPOLName) + '</td>';
                        ReportHTML += '                                     <td style="width:18.6%; border-color:white!Important; text-align:center; vertical-align: center;">' + (pPODName == 0 ? "" : pPODName) + '</td>';
                        ReportHTML += '                                     <td style="width:16.7%; border-color:white!Important; text-align:center; vertical-align: center;">' + (GetDateWithFormatMDY(pOperationHeader.ActualArrival) == "01/01/1900" || GetDateWithFormatMDY(pOperationHeader.ActualArrival) == "1/1/1900" ? "" : GetDateWithFormatMDY(pOperationHeader.ActualArrival)) + '</td>';
                        ReportHTML += '                                     <td style="width:24%; border-color:white!Important; text-align:center; vertical-align: center;">' + (pShipperName == 0 ? "" : pShipperName) + '</td>';
                        ReportHTML += '                                 </tr>';
                        ReportHTML += '                             </tbody>';
                        ReportHTML += '                         </table>';
                        ReportHTML += '                     </div>';
                        ReportHTML += '                 </div>';


                        ReportHTML += '                 <div class="col-xs-12 b-blue"  style="height:10.5cm;">';
                        ReportHTML += '                     <div class="b-blue row" style="height:.4cm; font-size:12px;">';
                        ReportHTML += '                     </div>';
                        ReportHTML += '                     <div class="b-blue row" style="height:10cm; font-size:12px;">';
                        ReportHTML += '                         <table id="tblOperationContainersAndPackages" class="table table-striped m-l-md m-r-md" style="font-size:12px;">';
                        ReportHTML += '                             <thead>';
                        ReportHTML += '                             </thead>';
                        ReportHTML += '                             <tbody>';
                        var TotalAmount_Footer = 0;
                        var TotalVATAmount_Footer = 0;
                        var GrandTotal_Footer = 0;
                        $.each(JSON.parse(data[2]), function (i, item) {
                            ReportHTML += '                                 <tr style="font-size:95%;">';
                            //ReportHTML += '                                     <td style="width:51%; border-color:white!Important; text-align:left; vertical-align: text-top;">' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                            //ReportHTML += '                                     <td style="width:15.5%; border-color:white!Important; text-align:left; vertical-align: text-top;">' + item.SaleAmount + '</td>';
                            //ReportHTML += '                                     <td style="width:8.5%; border-color:white!Important; text-align:left; vertical-align: text-top;">' + pInvoiceHeader.TaxPercentage + '</td>';
                            //ReportHTML += '                                     <td style="width:8.5%; border-color:white!Important; text-align:left; vertical-align: text-top;">' + item.SaleAmount * (parseFloat(pInvoiceHeader.TaxPercentage)) / 100 + '</td>';
                            //ReportHTML += '                                     <td style="width:16.5%; border-color:white!Important; text-align:left; vertical-align: text-top;">' + (item.SaleAmount + (item.SaleAmount * (parseFloat(pInvoiceHeader.TaxPercentage)) / 100)) + '</td>';
                            ReportHTML += '                                     <td style="width:51%; border-color:white!Important; text-align:left; vertical-align: text-top; font-size:14px;">' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                            ReportHTML += '                                     <td style="width:15.5%; border-color:white!Important; text-align:right; vertical-align: text-top; font-size:14px;">' + item.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '&nbsp;&nbsp;</td>';
                            ReportHTML += '                                     <td style="width:8.5%; border-color:white!Important; text-align:center; vertical-align: text-top; font-size:14px;">' + item.TaxTypeName + '</td>';
                            ReportHTML += '                                     <td style="width:10.5%; border-color:white!Important; text-align:right; vertical-align: text-top; font-size:14px;">' + item.TaxAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>';
                            ReportHTML += '                                     <td style="width:11.5%; border-color:white!Important; text-align:right; vertical-align: text-top; font-size:14px; margin-right:20px!important;position: absolute;">' + item.SaleAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            ReportHTML += '                                 </tr>';
                            TotalAmount_Footer += item.AmountWithoutVAT;
                            TotalVATAmount_Footer += item.TaxAmount;
                            GrandTotal_Footer += item.SaleAmount;
                        });
                        if (pInvoiceHeader.FixedDiscount > 0) {
                            ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                            ReportHTML += '                                         <td style="width:51%; border-color:white!Important; text-align:left; vertical-align: text-top; font-size:14px;">' + 'Special Discount' + '</td>';
                            ReportHTML += '                                         <td style="width:15.5%; border-color:white!Important; text-align:right; vertical-align: text-top; font-size:14px;">' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '&nbsp;&nbsp;</td>';
                            ReportHTML += '                                         <td style="width:8.5%; border-color:white!Important; text-align:center; vertical-align: text-top; font-size:14px;">' + '0 %' + '</td>';
                            ReportHTML += '                                         <td style="width:10.5%; border-color:white!Important; text-align:right; vertical-align: text-top; font-size:14px;">' + '' + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>';
                            ReportHTML += '                                         <td style="width:11.5%; border-color:white!Important; text-align:right; vertical-align: text-top; font-size:14px; margin-right:20px!important;position: absolute;">' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            ReportHTML += '                                     </tr>';
                        }

                        ReportHTML += '                                 <tr style="font-size:95%;">';
                        ReportHTML += '                                     <td colspan="5" style="border-color:white!Important; text-align:left; vertical-align: text-top;font-size:14px;">';
                        if ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                            ReportHTML += '                                     </br>BANK ACCOUNT DETAILS:' + '</br>';
                            ReportHTML += '                                     Account Name: ' + pAccountName + '</br>';
                            ReportHTML += '                                     Bank Name: ' + pBankName + '</br>';
                            ReportHTML += '                                     Bank Address: ' + pBankAddress + '</br>';
                            ReportHTML += '                                     Swift Code: ' + pSwiftCode + '</br>';
                            ReportHTML += '                                     Account Number: ' + pAccountNumber + '</br>';
                        }
                        else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                            ReportHTML += '                                     </br>BANK ACCOUNT DETAILS:' + '</br>';
                            ReportHTML += '                                     ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                        }
                        ReportHTML += '                                     </td>';
                        ReportHTML += '                                 </tr>';

                        ReportHTML += '                             </tbody>';
                        ReportHTML += '                         </table>';
                        ReportHTML += '                     </div>';
                        ReportHTML += '                 </div>';


                        //ReportHTML += '                 <div class="col-xs-12 b-blue" style="height:1.5cm;">';
                        //ReportHTML += '                 </div>';

                        ReportHTML += '                 <div class="col-xs-12 b-blue"  style="height:3cm;">';
                        //ReportHTML += '                     <div class="b-blue row" style="height:10cm; font-size:12px;">';
                        ReportHTML += '                         <table id="tblOperationContainersAndPackages" class="table table-striped m-l-md m-r-md" style="height:8cm;">';
                        ReportHTML += '                             <thead>';
                        ReportHTML += '                             </thead>';
                        ReportHTML += '                             <tbody>';
                        ReportHTML += '                             <tr class="" style="font-size:100%;">';
                        ReportHTML += '                                     <td rowspan="3" style="width:51%;border-top:0px; text-align:center; vertical-align: center;"><p style="margin-top:20px; font-size:14px;">' + toWords_WithFractionNumbers(parseFloat(pInvoiceHeader.Amount).toFixed(2)) + ' ' + pInvoiceHeader.CurrencyCode + '</p></td>';
                        ReportHTML += '                                     <td style="border-top:0px;"><div class="b-blue" style="width:4.5cm; font-size:12px;"></div><p style=" width:53%;margin-left: 45%; text-align:center; vertical-align: center;margin-top:30px; font-size:14px;">' + pInvoiceHeader.CurrencyCode + '  ' + parseFloat(TotalAmount_Footer - pInvoiceHeader.FixedDiscount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</p></td>';
                        ReportHTML += '                             </tr>';
                        ReportHTML += '                             <tr class="" style="font-size:100%;">';
                        ReportHTML += '                                     <td style="border-top:0px;"><div class="b-blue" style="width:4.5cm;border-top:0px; font-size:12px;"></div><p style="width:53%;margin-left: 45%; text-align:center; vertical-align: center; font-size:14px;">' + pInvoiceHeader.CurrencyCode + '  ' + TotalVATAmount_Footer.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</p></td>';
                        ReportHTML += '                             </tr>';
                        ReportHTML += '                             <tr class="" style="font-size:100%;">';
                        ReportHTML += '                                     <td style="border-top:0px;"><div class="b-blue" style="width:4.5cm;border-top:0px; font-size:12px;"></div><p style="width:53%;margin-left: 45%; text-align:center; vertical-align: center; margin-top:10px; font-size:14px;">' + pInvoiceHeader.CurrencyCode + '  ' + parseFloat(GrandTotal_Footer - pInvoiceHeader.FixedDiscount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</p></td>';
                        ReportHTML += '                             </tr>';
                        ReportHTML += '                             </tbody>';
                        ReportHTML += '                         </table>';
                        //ReportHTML += '                     </div>';
                        ReportHTML += '                 </div>';
                        ReportHTML += '        </div>';
                        ReportHTML += '     </body>';
                        ReportHTML += '</html>';
                        if (1==1) {
                            pFinalReportHTML += ReportHTML;
                            Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                        }
                        else {
                            pFinalReportHTML += ReportHTML;
                            pFinalReportHTML += ' <div class="break"></div>';
                        }
                    }
                    else { //Riyadh and other branches

                        var ReportHTML = '';
                        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                        //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                        ReportHTML += '<html>';
                        ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        //ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  'CompanyHeader-FRE-RIYADH.jpg' : 'CompanyHeader-Empty.jpg') + '" alt=""/></div>';
                        ReportHTML += '                 <div class="col-xs-6"><img src="/Content/Images/' + (1 == 1 ? 'CompanyHeader-FRE-RIYADH.jpg' : 'CompanyHeader-Empty.jpg') + '" alt=""/></div>';
                        ReportHTML += '                 <div class="col-xs-6">';
                        ReportHTML += '                     <br><div class="col-xs-8"><b>Invoice Date : تاريخ الفاتورة' + '</b></div>' + '<div class="col-xs-4">' + pInvoiceDate + '</div>';
                        ReportHTML += '                     <div class="col-xs-8"><b>Due Date : تاريخ انتهاء الفاتورة' + '</b></div>' + '<div class="col-xs-4">' + pInvoiceDueDate + '</div>';
                        ReportHTML += '                     <div class="col-xs-8"><b>VAT No. : رقم ضريبة القيمة المضافة' + '</b></div>' + '<div class="col-xs-4">' + '300252169400003' + '</div>';
                        ReportHTML += '                     <div class="col-xs-8"><b>Payment Terms : شروط الدفع' + '</b></div>' + '<div class="col-xs-4">' + (pInvoiceHeader.PaymentTermName == 0 ? "" : pInvoiceHeader.PaymentTermName) + '</div>';
                        ReportHTML += '                 </div>';
                        //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + pInvoiceHeader.ConcatenatedInvoiceNumber + ')' + '</h3></div>';
                        ReportHTML += '                 <div class="col-xs-12 text-center" style="clear:both;"><h3>' + pInvoiceHeader.ConcatenatedInvoiceNumber.split('/')[1].split('-')[0].trim() + ' No. ' + pInvoiceHeader.InvoiceNumber + '</h3></div>';

                        //ReportHTML += '             <table class="col-xs-8 m-l b-t b-light text-sm table-bordered" style="text-align:left; width:auto; border:solid #000;">';
                        ReportHTML += '             <div class="col-sm-7">';

                        ReportHTML += '                 <div class="col-sm-12 m-l-n"><b><u>' + (pInvoiceHeader.ConcatenatedInvoiceNumber.split('/')[1].split('-')[0].trim() == "DRAFT" ? "Draft:" : "Original:") + '</u></b></div>';
                        ReportHTML += '                 <table class="col-xs-7 b-light text-sm table-bordered" style="text-align:left;">';
                        ReportHTML += '                     <td>';
                        ReportHTML += '                         <b>Invoice To: </b><br>';
                        ReportHTML += '                         <b>' + pInvoiceHeader.PartnerName + '</b><br>';
                        ReportHTML += '                         ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                        ReportHTML += '                         ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2 + '<br>'));
                        ReportHTML += '                         ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                        ReportHTML += '                         ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                        ReportHTML += '                     </td>';
                        ReportHTML += '                 </table>';
                        ReportHTML += '             </div>';
                        ReportHTML += '             <div class="col-sm-5">';
                        ReportHTML += '                 <b><i>&emsp;&emsp;&emsp;&emsp;References : </i></b><br>';
                        ReportHTML += '                 <table class="col-xs-4 b-light text-sm table-bordered float-right" style="text-align:left;">';
                        ReportHTML += '                     <td>';
                        ReportHTML += '                         <b>' + 'Our Reference No. : ' + pOperationHeader.Code + '</b>';
                        ReportHTML += '                         <br><b>' + 'Client Reference : ' + (pOperationHeader.CustomerReference == 0 ? "" : pOperationHeader.CustomerReference) + '</b>';
                        ReportHTML += '                     </td>';
                        ReportHTML += '                 </table>';
                        ReportHTML += '             </div>';

                        ReportHTML += '             <div class="m-l" style="clear:both;"><b>Gerneral Information</b>';
                        ReportHTML += '                 <table class="col-xs-12 b-light text-sm table-bordered" style="text-align:left; width:98%;">';
                        ReportHTML += '                     <td>';
                        ReportHTML += '                         <div class="col-xs-6"><b>Shipperشاحن البضاعة: </b>' + pShipperName + '</div>';
                        ReportHTML += '                         <div class="col-xs-6"><b>Fromمن: </b>' + pPOLName + '</div>';
                        ReportHTML += '                         <div class="col-xs-6"><b>Consigneeصاحب البضاعة: </b>' + pConsigneeName + '</div>';
                        ReportHTML += '                         <div class="col-xs-6"><b>Toإلى: </b>' + pPODName + '</div>';
                        ReportHTML += '                         <div class="col-xs-6"><b>Lineميناء الشحن: </b>' + (pOperationHeader.LineName == 0 ? "" : pOperationHeader.LineName) + '</div>';
                        ReportHTML += '                         <div class="col-xs-6"><b>DisCharge Portميناء التفريغ: </b>' + pPODName + '</div>';
                        if (pOperationHeader.TransportType == OceanTransportType)
                            ReportHTML += '                     <div class="col-xs-6"><b>Vessel-Voy: </b>' + (pOperationHeader.VesselName == 0 ? "" : pOperationHeader.VesselName) + (pOperationHeader.VoyageOrTruckNumber == 0 ? "" : (" - " + pOperationHeader.VoyageOrTruckNumber)) + '</div>';
                        //if($("#cbPrintMBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU")
                        ReportHTML += '                         <div class="col-xs-6"><b>MB/L No.: </b>' + pMasterBL + '</div>';
                        //if ($("#cbPrintHBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ) {
                        //    if (pHouseBLs != "0")//Master Operation so show all houses on it
                        //        ReportHTML += '                 <div class="col-xs-6"><b>HBL</b>: ' + pHouseBLs + '</div>';
                        //    else if (pHouseNumber != "0")
                        //        ReportHTML += '                 <div class="col-xs-6"><b>HB/L No.:</b> ' + (pHouseNumber == "" ? "N/A" : pHouseNumber) + '</div>';
                        //}
                        ReportHTML += '                         <div class="col-xs-12 m-t"><b><u>Packagesالبضائع:</u></b>' + '</div>';
                        ReportHTML += '                     <div class="col-xs-6"><b>Chargeable Wt.وزن التحميل: </b>' + pOperationHeader.ChargeableWeightSum + ' KG</div>';
                        ReportHTML += '                     <div class="col-xs-6"><b>Gross Wt.الوزن الإجمالي: </b>' + pOperationHeader.GrossWeightSum + ' KG</div>';
                        ReportHTML += '                     <div class="col-xs-12"><b>Number Of Packagesعدد البضائع: </b>' + (pOperationHeader.NumberOfPackages == 0 ? "" : pOperationHeader.NumberOfPackages) + '</div>';
                        if (pOperationHeader.TransportType != 2)
                            ReportHTML += '                     <div class="col-xs-12"><b>Containers No.sأرقام الحاويات: </b>' + (pOperationHeader.ContainerNumbers == 0 ? "" : pOperationHeader.ContainerNumbers) + '</div>';
                        ReportHTML += '                     <div class="col-xs-12"><b>Description Of Goodsوصف البضاعة: </b>' + (pOperationHeader.DescriptionOfGoods == 0 ? "" : pOperationHeader.DescriptionOfGoods) + '</div><br>';
                        //ReportHTML += '                         <div class="col-xs-6"><b>Shipment Category: </b>' + pShipmentTypeCode + '</div>';

                        ReportHTML += '                     </td>';
                        ReportHTML += '                 </table>';
                        ReportHTML += '             </div>';

                        ReportHTML += '                     <div class="col-xs-12" style="clear:both;">';
                        ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="">'; // table-hover
                        ReportHTML += '                             <thead>';
                        ReportHTML += '                                 <tr>';
                        if (pInvoiceHeader.ConcatenatedInvoiceNumber.split('/')[1].split('-')[0].trim() == "DRAFT") {
                            ReportHTML += '                                     <th style="width:40%;">Description</th>';
                            ReportHTML += '                                     <th>Chrg.Wt</th>';
                            ReportHTML += '                                     <th>Per Kgs<br>Rates</th>';
                            ReportHTML += '                                     <th>VAT Type</th>';
                            ReportHTML += '                                     <th>Foreign Amount</th>';
                            ReportHTML += '                                     <th>Amount ' + $("#hDefaultCurrencyCode").val() + '</th>';
                        }
                        else {
                            ReportHTML += '                                     <th style="width:40%;">Description الوصف</th>';
                            ReportHTML += '                                     <th>Qty<br>الكمية</th>';
                            ReportHTML += '                                     <th>Unit.Price<br>الوحدة</th>';
                            ReportHTML += '                                     <th>VAT Type<br>ضريبة القيمة المضافة</th>';
                            ReportHTML += '                                     <th>Foreign Amount<br> سعر الكمية</th>';
                            ReportHTML += '                                     <th>Amount ' + $("#hDefaultCurrencyCode").val() + '<br>' + ' السعر</th>';
                        }
                        ReportHTML += '                                 </tr>';
                        ReportHTML += '                             </thead>';
                        ReportHTML += '                             <tbody>';
                        $.each(JSON.parse(data[2]), function (i, item) {
                            ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                            ReportHTML += '                                         <td>' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) /*+ (item.Notes == 0 || item.Notes == "" ? "" : '-' + item.Notes)*/ + '</td>';
                            ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                            ReportHTML += '                                         <td>' + item.SalePrice + '</td>';
                            ReportHTML += '                                         <td style="text-align:right;">' + item.TaxTypeName + '</td>';
                            ReportHTML += '                                         <td style="text-align:right;">' + item.CurrencyCode + ' ' + item.SaleAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            ReportHTML += '                                         <td style="text-align:right;">' + (item.SaleAmount * pInvoiceHeader.ExchangeRate).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            ReportHTML += '                                     </tr>';
                        });
                        if (pInvoiceHeader.FixedDiscount > 0) {
                            ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                            ReportHTML += '                                         <td>' + 'Special Discount' + '</td>';
                            ReportHTML += '                                         <td>' + '' + '</td>';
                            ReportHTML += '                                         <td>' + '' + '</td>';
                            ReportHTML += '                                         <td style="text-align:right;">' + '' + '</td>';
                            ReportHTML += '                                         <td style="text-align:right;">' + pInvoiceHeader.CurrencyCode + ' -' + pInvoiceHeader.FixedDiscount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            ReportHTML += '                                         <td style="text-align:right;">' + '-' + (pInvoiceHeader.FixedDiscount * pInvoiceHeader.ExchangeRate).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            ReportHTML += '                                     </tr>';
                        }

                        //ReportHTML += '                                         <tr>';
                        //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                        //ReportHTML += '                                             <td><b>' + pInvoiceHeader.Amount + '</b></td>';
                        //ReportHTML += '                                         </tr>';

                        //ReportHTML += '                                         <tr>';
                        //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                        //ReportHTML += '                                             <td><b>Total Amount : ' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                        //ReportHTML += '                                         </tr>';
                        ReportHTML += '                             </tbody>';
                        ReportHTML += '                         </table>';
                        ReportHTML += '                     </div>'
                        //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                        //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + ' / (' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + ')' + '</b>';
                        //ReportHTML += '                         </div>';
                        //ReportHTML += '                         <div class="clear m-l col-xs-6 text-left"><b>ACCOUNTING</b></div>';
                        //ReportHTML += '                         <div class="float-right text-right m-t-n col-xs-6 m-r"><b>APPROVAL</b></div>';
                        if ($("#cbLargeInvoice").prop("checked")) {
                            ReportHTML += '         <div class="col-xs-12 m-t-n">Please, see attachment.</div>';
                            ReportHTML += '         <div class="break"></div>';
                        }
                        else
                            ReportHTML += '                         <div class="col-xs-12 m-t-n"></div>';
                        ReportHTML += '                         <div class="col-xs-6">';
                        //if ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                        //    ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        //    ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                        //    ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                        //    ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                        //    ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                        //    ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                        //}
                        //else
                        if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                            ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                            ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                        }
                        else {
                            ReportHTML += '</br>';
                        }
                        ReportHTML += '                         </div>';
                        ReportHTML += '                         <div class="col-xs-6 text-right">';
                        if (pTaxAmount != 0 || pDiscountAmount != 0) {
                            ReportHTML += '                             <b>Subtotal: </b>' + pInvoiceHeader.CurrencyCode + ' ' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                            //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + pInvoiceHeader.TaxPercentage + '</br>';
                            if (pTaxAmount != 0)
                                ReportHTML += '                             <b>VAT(' + pInvoiceHeader.TaxPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pTaxAmount.toFixed(2) + '</br>';
                            //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + pInvoiceHeader.DiscountPercentage + '</br>';
                            if (pDiscountAmount != 0)
                                ReportHTML += '                             <b>Deduction Tax(' + pInvoiceHeader.DiscountPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pDiscountAmount.toFixed(2) + '</br>';
                        }
                        ReportHTML += '                             <b>Total: </b>' + pInvoiceHeader.CurrencyCode + ' <b>' + parseFloat(pInvoiceHeader.Amount).toFixed(2) + '</b></br>';
                        ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(parseFloat(pInvoiceHeader.Amount).toFixed(2)) + ' ' + pInvoiceHeader.CurrencyCode + '</br>';
                        ReportHTML += '                         </div>';
                        if (pInvoiceHeader.ConcatenatedInvoiceNumber.split('/')[1].split('-')[0].trim() == "DRAFT") {
                            ReportHTML += '                         <div class="col-xs-12">';
                            ReportHTML += '                             <b>Terms and conditions:</b><br>';
                            ReportHTML += '                             1 - All payments should be made in favor of Freight world Al Ofi Est by Cheque/Bank Transfer as per agreement.<br>';
                            ReportHTML += '                             2 - Once make the payment please let us have forward copy of bank transfer receipt.<br>';
                            ReportHTML += '                             3 - Let us know the details of payment against invoice numbers.<br>';
                            ReportHTML += '                         </div>';
                        }
                        //ReportHTML += '                     </div>'; //of table-responsive
                        //ReportHTML += '                 </section>';
                        //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                        ReportHTML += '         </body>';

                        ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                        ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftPosition != 0 ? pDefaultsRow.InvoiceLeftPosition : '&emsp;') + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddlePosition != 0 ? pDefaultsRow.InvoiceMiddlePosition : '&emsp;') + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightPosition != 0 ? pDefaultsRow.InvoiceRightPosition : '&emsp;') + '</b></div>';
                        ReportHTML += '                 </div>'
                        ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                        ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftSignature != 0 ? pDefaultsRow.InvoiceLeftSignature : '&emsp;') + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddleSignature != 0 ? pDefaultsRow.InvoiceMiddleSignature : '&emsp;') + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightSignature != 0 ? pDefaultsRow.InvoiceRightSignature : '&emsp;') + '</b></div>';
                        ReportHTML += '                 </div>'
                        if ($("#cbPrintStamp").prop("checked"))
                            ReportHTML += '         <div class="text-right m-r-lg"><img src="/Content/Images/CompanyStamp.jpg" alt="stamp"/></div>';

                        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                        if (pDefaults.UnEditableCompanyName == "FRE") {
                            ReportHTML += '         <div class="col-xs-2">' + '<b>BankDetails:</b>' + '</div>';
                            ReportHTML += '         <div class="col-xs-5 m-l-n">' + 'Name: Freight World Al Ofi Establishment' + '</div>';
                            ReportHTML += '         <div class="col-xs-5 text-right">' + '<b>Issued by : </b>' + $("#hLoggedUserNameNotLogin").val() + ' / Freight World' + '</div>';

                            ReportHTML += '         <div class="col-xs-2">' + '<b>معلومات البنك</b>' + '</div>';
                            ReportHTML += '         <div class="col-xs-10 m-l-n">' + 'Riyadh Bank A/C 1471356439940' + '</div>';

                            ReportHTML += '         <div class="col-xs-2">' + '' + '</div>';
                            ReportHTML += '         <div class="col-xs-10 m-l-n">' + 'IBAN NO: SA 18 2000 0001 471356439940' + '</div>';
                            ReportHTML += '         <div class="col-xs-2">' + '<b></b>' + '</div>';
                            ReportHTML += '         <div class="col-xs-10 m-l-n">' + 'Swift code: RIBLSARI' + '</div>';

                            ReportHTML += '         <div class="col-xs-12">' + '<hr style="border: solid 1px;">' + '</div>';

                            ReportHTML += '         <div class="col-xs-12 m-t-n">' + 'Freight World' + '</div>';
                            ReportHTML += '         <div class="col-xs-12">' + 'Next Building to Dar Al Kitab Printing Press, office No 6, First Floor,Omar Bin' + '</div>';
                            ReportHTML += '         <div class="col-xs-12">' + 'Al-Khatab Street- POB 315826, Riyadh' + '</div>';
                            ReportHTML += '         <div class="col-xs-12">' + 'Riyadh -KSA' + '</div>';
                        }
                        //if ($("#cbPrintFooterInvoice").prop("checked"))
                        //ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                        //ReportHTML += '         <div class="row text-right m-r m-t-sm">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
                        //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
                        ReportHTML += '     </footer>';
                        ReportHTML += '</html>';
                        if (1==1) {
                            pFinalReportHTML += ReportHTML;
                            Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                        }
                        else {
                            pFinalReportHTML += ReportHTML;
                            pFinalReportHTML += ' <div class="break"></div>';
                        }
                    } //Riyadh and other branches
                } //else if (pDefaults.UnEditableCompanyName == "FRE") {
                else if (pDefaults.UnEditableCompanyName == "GLD") {

                    var ReportHTML = "";
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title></title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    //        ReportHTML += '         <div class="break"></div>'; //to start a new page
                    ReportHTML += '        <div class="" style="height:100%;">';
                    ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                    //ReportHTML += '                 <div class="col-xs-6 text-right">';
                    //ReportHTML += '                     <br>GLS Logistics Services LLC <br> B2106 Latifa Tower, Sheikh Zayed Road <br> Dubai, United Arab Emirates <br> Tel: +971 4 3930303 <br> <b>TRN: 100489292100003 </b>';
                    //ReportHTML += '                 </div>';

                    ReportHTML += '             <div class="col-xs-12"><h3>' + pInvoiceHeader.InvoiceTypeName + '</h3></div>';
                    ReportHTML += '<hr>';

                    ReportHTML += '          <div class="col-xs-12">';
                    ReportHTML += '             <div class="col-xs-6">';

                    ReportHTML += '             <b>To</b> : ' + pClientHeader.Name + ' <br>';
                    ReportHTML += '             <b>Reference </b> : ' + pInvoiceHeader.ConcatenatedInvoiceNumber + ' <br>';
                    ReportHTML += '             <b>Customer ID</b> : <br>';
                    ReportHTML += '             <b>Origin</b> : ' + pPOLName + ' <br><br>';
                    ReportHTML += '             <b>MB/L</b> : ' + (pOperationHeader.MasterBL == 0 ? "" : pOperationHeader.MasterBL) + '  <br>';
                    ReportHTML += '             <b>Weight/</b>  :  ' + (pOperationHeader.GrossWeightSum == 0 ? "" : pOperationHeader.GrossWeightSum) + ' KGM' + '  <br>';
                    ReportHTML += '             <b>Volume</b> :  ' + pCBM + ' CBM <br>';
                    //ReportHTML += '             <b>Status</b> :   <br>';

                    ReportHTML += '             </div>';
                    ReportHTML += '             <div class="col-xs-6">';

                    ReportHTML += '             <b> Customer VAT No</b> :  ' + (pClientHeader.VATNumber == 0 ? "" : pClientHeader.VATNumber) + ' <br>';
                    ReportHTML += '             <b>Date </b> :  ' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate))) + ' <br>';
                    ReportHTML += '             <b>Due Date</b> :  ' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + ' <br>';
                    ReportHTML += '             <b>Destination</b> :   ' + pPODName + ' <br><br>';
                    ReportHTML += '             <b>HB/L</b> :  ' + (pOperationHeader.HouseNumber == 0 ? "" : pOperationHeader.HouseNumber) + ' <br>';
                    //ReportHTML += '             <b>No.&Kind Of Packages</b> :  ' + (pOperationHeader.PackageTypes == 0 ? (pOperationHeader.PackageTypesOnContainersTotals == 0 ? (pOperationHeader.PlacedOnOperationContainersAndPackagesID == 0 ? "0" : pOperationHeader.PlacedOnOperationContainersAndPackagesID) : pOperationHeader.PackageTypesOnContainersTotals) : pOperationHeader.PackageTypes) + ' <br>';
                    ReportHTML += '             <b>No.&Kind Of Packages</b> :  ' + (pOperationHeader.NumberOfPackages + (pOperationHeader.PackageTypeName == 0 ? "" : (' x ' + pOperationHeader.PackageTypeName))) + ' <br>';
                    ReportHTML += '             </div>';
                    ReportHTML += '          </div>';

                    ReportHTML += '                     <div class="col-xs-12">';
                    ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    ReportHTML += '                                     <th>Description </th>';
                    //ReportHTML += '                                     <th> Rate per </th>';
                    ReportHTML += '                                     <th>Currency  </th>';
                    ReportHTML += '                                     <th>Unit price </th>';
                    ReportHTML += '                                     <th>Quantity  </th>';
                    ReportHTML += '                                     <th>SubTotal(' + $("#hDefaultCurrencyCode").val() + ') </th>';
                    ReportHTML += '                                     <th>VAT(' + $("#hDefaultCurrencyCode").val() + ') </th>';
                    ReportHTML += '                                     <th>Total(' + $("#hDefaultCurrencyCode").val() + ') </th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    var TotalAmount_Footer = 0;
                    var TotalVATAmount_Footer = 0;
                    var GrandTotal_Footer = 0;
                    $.each(JSON.parse(data[2]), function (i, item) {
                        ReportHTML += '                                 <tr style="font-size:100%;">';
                        ReportHTML += '                                     <td>' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                        ReportHTML += '                                     <td>' + ((item.ChargeTypeName == "OCEAN FREIGHT" && item.CurrencyCode == $("#hDefaultCurrencyID").val()) ? "USD" : item.CurrencyCode) + '</td>';
                        ReportHTML += '                                     <td>' + ((item.ChargeTypeName == "OCEAN FREIGHT" && item.CurrencyCode == $("#hDefaultCurrencyID").val()) ? ((parseFloat(item.SalePrice) / parseFloat($("#hReadySlCurrencies option:Contains('USD')").attr("MasterDataExchangeRate")))).toFixed(2) : item.SalePrice.toFixed(2)) + '</td>';
                        ReportHTML += '                                     <td>' + item.Quantity + '</td>';
                        ReportHTML += '                                     <td>' + (item.SalePrice * item.Quantity * pInvoiceHeader.ExchangeRate).toFixed(2) + '</td>';
                        ReportHTML += '                                     <td>' + (item.TaxAmount * pInvoiceHeader.ExchangeRate).toFixed(2) + '</td>';
                        ReportHTML += '                                     <td>' + (item.SaleAmount * pInvoiceHeader.ExchangeRate).toFixed(2) + '</td>';
                        ReportHTML += '                                 </tr>';
                        TotalAmount_Footer += (item.SalePrice * item.Quantity * item.ExchangeRate);
                        TotalVATAmount_Footer += (item.TaxAmount * item.ExchangeRate);
                        GrandTotal_Footer += (item.SaleAmount * item.ExchangeRate);
                    });
                    TotalAmount_Footer -= (pInvoiceHeader.FixedDiscount * pInvoiceHeader.ExchangeRate);
                    GrandTotal_Footer -= (pInvoiceHeader.FixedDiscount * pInvoiceHeader.ExchangeRate);
                    if (pInvoiceHeader.FixedDiscount > 0) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + 'Special Discount' + '</td>';
                        ReportHTML += '                                         <td>' + pInvoiceHeader.CurrencyCode + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '-' + (pInvoiceHeader.FixedDiscount * pInvoiceHeader.ExchangeRate).toFixed(2) + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '-' + (pInvoiceHeader.FixedDiscount * pInvoiceHeader.ExchangeRate).toFixed(2) + '</td>';
                        ReportHTML += '                                     </tr>';
                    }
                    ReportHTML += '                                 <tr style="font-size:100%;">';
                    ReportHTML += '                                     <td colspan="3"></td>';
                    ReportHTML += '                                     <td><b>Total</b></td>';
                    ReportHTML += '                                     <td><b>' + TotalAmount_Footer.toFixed(2) + '</b></td>';
                    ReportHTML += '                                     <td><b>' + TotalVATAmount_Footer.toFixed(2) + '</b></td>';
                    ReportHTML += '                                     <td><b>' + GrandTotal_Footer.toFixed(2) + '</b></td>';
                    ReportHTML += '                                 </tr>';

                    ReportHTML += '                                 <tr style="font-size:100%;">';
                    ReportHTML += '                                     <td colspan="3"></td>';
                    ReportHTML += '                                     <td><b>Total In Words</b></td>';
                    ReportHTML += '                                     <td colspan="3"><b>' + toWords_WithFractionNumbers(GrandTotal_Footer.toFixed(2)) + '</b></td>';
                    ReportHTML += '                                 </tr>';

                    ReportHTML += '                         <tbody>';
                    ReportHTML += '                     </table>';
                    ReportHTML += '               </div>';

                    ReportHTML += '               <div class="row col-xs-12 m-l-md">';
                    //ReportHTML += '               BANK DETAILS <br> ';
                    if ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + '</br>';
                        ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                        ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                        ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                        ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                        ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                    }
                    else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + '</br>';
                        ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                    }
                    else
                        ReportHTML += '                             <br>';
                    ReportHTML += '               </div>';

                    ReportHTML += '        </div>';
                    ReportHTML += '     </body>';
                    ReportHTML += '</html>';
                    if (1==1) {
                        pFinalReportHTML += ReportHTML;
                        Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                    }
                    else {
                        pFinalReportHTML += ReportHTML;
                        pFinalReportHTML += ' <div class="break"></div>';
                    }
                } //EOF else if (pDefaults.UnEditableCompanyName == "GLD")
                else if (pDefaults.UnEditableCompanyName == "GLS") {

                    var ReportHTML = '';
                    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                    //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                    //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + pInvoiceHeader.ConcatenatedInvoiceNumber + ')' + '</h3></div>';
                    if (pInvoiceHeader.InvoiceTypeCode != "DRAFT")
                        ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + '</h3></div>';

                    ////ReportHTML += '             <div style="clear:both;"><br></div>';
                    //ReportHTML += '         <div class="col-xs-1 m-l-n-md"><img src="/Content/Images/' + 'InvoiceSideStatement.jpg' + '" alt="logo"/></div>';
                    ReportHTML += '         <div class="col-xs-12">';

                    if (pInvoiceHeader.InvoiceTypeCode != "DRAFT") {
                        ReportHTML += '             <div class="col-xs-9"><b>Adress: </b>';
                        ReportHTML += '                     <b>' + $("#hDefaultCompanyName").val() + '</b><br>';
                        ReportHTML += '                     ' + (pAddressLine1 == "" ? "" : (pAddressLine1 + ','));
                        ReportHTML += '                     ' + (pAddressLine2 == "" ? "" : (pAddressLine2 + ','));
                        ReportHTML += '                     ' + (pAddressLine3 == "" ? "" : (pAddressLine3) + '');
                        ReportHTML += '             </div>';

                        ReportHTML += '             <div class="col-xs-4"><b>Tel: </b>' + pDefaultsRow.Phones + '</div>';
                        ReportHTML += '             <div class="col-xs-8"><b>Fax: </b>' + pDefaultsRow.Faxes + '</div>';
                        ReportHTML += '             <div class="col-xs-4"><b>Tax ID: </b>' + pDefaultsRow.TaxNumber + '</div>';
                        ReportHTML += '             <div class="col-xs-8"><b>Commercial Register: </b>' + pDefaultsRow.CommericalRegNo + '</div>';
                    } //if (pInvoiceHeader.InvoiceTypeCode != "DRAFT") {
                    ReportHTML += '                     <div class="col-xs-4">';
                    ReportHTML += '                         <table id="tblReportInvoice1" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    ReportHTML += '                                     <th>Due Date</th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    ReportHTML += '                                 <tr class="input-md" style="font-size:95%;">';
                    ReportHTML += '                                     <td>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '</td>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                         <tbody>';
                    ReportHTML += '                     </table>';
                    ReportHTML += '               </div>';
                    if (pInvoiceHeader.InvoiceTypeCode != "DRAFT")
                        ReportHTML += '             <div class="col-xs-4 text-center"><h1>INVOICE</h1></div>';
                    else
                        ReportHTML += '             <div class="col-xs-4 text-center"><h1>' + (pOperationHeader.DirectionType == 1 ? '   بيان مطالبة وارد   ' : '   بيان مطالبة    ') + '</h1></div>';
                    ReportHTML += '             <div class="col-xs-4">';
                    ReportHTML += '                 <table id="tblReportInvoice2" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                     <thead>';
                    ReportHTML += '                         <tr>';
                    ReportHTML += '                             <th>Serial#</th>';
                    ReportHTML += '                         </tr>';
                    ReportHTML += '                     </thead>';
                    ReportHTML += '                     <tbody>';
                    ReportHTML += '                         <tr class="input-md" style="font-size:95%;">';
                    ReportHTML += '                             <td>' + (pOperationHeader.Code == 0 ? pOperationHeader.MasterOperationCode : pOperationHeader.Code) + '</td>';
                    ReportHTML += '                         </tr>';
                    ReportHTML += '                     <tbody>';
                    ReportHTML += '                 </table>';
                    ReportHTML += '               </div>';

                    ReportHTML += '                     <div class="col-xs-12">';
                    ReportHTML += '                         <table id="tblReportInvoice3" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    ReportHTML += '                                     <th colspan="2">Bill To</th>';
                    ReportHTML += '                                     <th></th>';
                    ReportHTML += '                                     <th>Shipment Datails</th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    ReportHTML += '                                 <tr class="input-md" style="font-size:95%;">';
                    ReportHTML += '                                     <td><b>Messer</b></td>';
                    //ReportHTML += '                                     <td>' + pConsigneeName + '</td>';
                    ReportHTML += '                                     <td>';
                    ReportHTML += pInvoiceHeader.PartnerName + '<br>';
                    ReportHTML += '                                         <b>Address:</b> ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                    ReportHTML += '                                         ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2));
                    ReportHTML += '                                         ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                    ReportHTML += '                                         ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                    ReportHTML += '                                     </td>';
                    ReportHTML += '                                     <td><b>B/L#</b></td>';
                    ReportHTML += '                                     <td>' + (pHouseNumber == "" || pHouseNumber == "0" ? "" : pHouseNumber) + '</td>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                                 <tr class="input-md" style="font-size:95%;">';
                    ReportHTML += '                                     <td><b>Tax ID:</b></td>';
                    ReportHTML += '                                     <td>' + (pClientHeader.BankName == "0" ? "" : pClientHeader.BankName) + '</td>';
                    ReportHTML += '                                     <td><b>VOLUME</b></td>';
                    ReportHTML += '                                     <td>' + (pCBM == "" || pCBM == "0" ? "" : pCBM) + ' CBM</td>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                         <tbody>';
                    ReportHTML += '                     </table>';
                    ReportHTML += '               </div>';

                    ReportHTML += '                     <div class="col-xs-12 clear">';
                    ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    ReportHTML += '                                     <th>Description</th>';
                    ReportHTML += '                                     <th>Currency</th>';
                    //ReportHTML += '                                     <th>Qty</th>';
                    //ReportHTML += '                                     <th>Unit Price</th>';
                    ReportHTML += '                                     <th>Amount</th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    $.each(JSON.parse(data[2]), function (i, item) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        if (pDefaults.UnEditableCompanyName == "TEL")
                            ReportHTML += '                                         <td>' + (item.Notes == 0 ? (item.ChargeTypeName == 0 ? "" : item.ChargeTypeName) : item.Notes) + '</td>';
                        else
                            ReportHTML += '                                         <td>' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                        ReportHTML += '                                         <td>' + item.CurrencyCode + '</td>';
                        //ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                        //ReportHTML += '                                         <td>' + item.SalePrice + '</td>';
                        ReportHTML += '                                         <td>' + item.SaleAmount + '</td>';
                        ReportHTML += '                                     </tr>';
                    });
                    if (pInvoiceHeader.FixedDiscount > 0) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + 'Special Discount' + '</td>';
                        ReportHTML += '                                         <td>' + pInvoiceHeader.CurrencyCode + '</td>';
                        ReportHTML += '                                         <td>' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2) + '</td>';
                        ReportHTML += '                                     </tr>';
                    }
                    ReportHTML += '                             </tbody>';
                    ReportHTML += '                         </table>';
                    ReportHTML += '                     </div>'

                    if ($("#cbLargeInvoice").prop("checked")) {
                        ReportHTML += '         <div class="col-xs-12 m-t-n">Please, see attachment.</div>';
                        ReportHTML += '         <div class="break"></div>';
                    }
                    else
                        ReportHTML += '                         <div class="row"></div>';
                    ReportHTML += '                         <div class="row col-xs-12">';
                    ReportHTML += '                         <div class="col-xs-8 m-t-n">';
                    if ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + (pDefaults.UnEditableCompanyName == "QUI" ? (" " + pDefaults.CompanyName) : "") + '</br>';
                        ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                        ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                        ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                        ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                        ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                    }
                    //kk: added 2nd condition
                    else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + (pDefaults.UnEditableCompanyName == "QUI" ? (" " + pDefaults.CompanyName) : "") + '</br>';
                        ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                    }
                    else
                        ReportHTML += '                             <br>';
                    ReportHTML += '                         </div>';
                    ReportHTML += '                         <div class="col-xs-4 text-right m-t-n">';
                    if (pTaxAmount != 0 || pDiscountAmount != 0)
                        ReportHTML += '                             <b>Subtotal: </b>' + pInvoiceHeader.CurrencyCode + ' ' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                    //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + pInvoiceHeader.TaxPercentage + '</br>';
                    if (pTaxAmount != 0)
                        ReportHTML += '                             <b>VAT(' + pInvoiceHeader.TaxPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pTaxAmount.toFixed(2) + '</br>';
                    //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + pInvoiceHeader.DiscountPercentage + '</br>';
                    if (pDiscountAmount != 0)
                        ReportHTML += '                             <b>Deduction tax(' + pInvoiceHeader.DiscountPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pDiscountAmount.toFixed(2) + '</br>';
                    ReportHTML += '                             <b>Total: </b>' + pInvoiceHeader.CurrencyCode + ' <b>' + parseFloat(pInvoiceHeader.Amount).toFixed(2) + '</b></br>';
                    ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(parseFloat(pInvoiceHeader.Amount).toFixed(2)) + ' ' + pInvoiceHeader.CurrencyCode + '</br>';
                    if ($("#cbPrintUSDTotal").prop("checked") && pInvoiceHeader.CurrencyCode.trim() == "EGP")
                        ReportHTML += '                             <b>USD Total: </b>' + ' <b>' + (pInvoiceHeader.Amount / $("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")).toFixed(2) + '</b></br>';
                    ReportHTML += '                         </div>';
                    ReportHTML += '                         </div>';
                    if (pInvoiceHeader.InvoiceTypeCode != "DRAFT") {
                        ReportHTML += '             <br><br><br><div class="row col-xs-12 text-center"> Invoice contents if not confirmed after 10 days should be considered Clarification & info. </div>'; //
                        ReportHTML += '             <div class="row col-xs-12 text-center"> Please contact Mr.Tamer Heikal Mobil: 01090767578 Email:acc@gls.com.eg </div>'; //
                        ReportHTML += '             <br><div class="col-xs-12"><div class="col-xs-6"> REF : ' + pCustomerReference + '</div>'; //
                        //ReportHTML += '             <br><div class="col-xs-4"> <label></label></div>'; //
                        ReportHTML += '             <div class="col-xs-6 text-right"> Created By : ' + pSalesman + '</div></div>'; //
                    } //if (pInvoiceHeader.InvoiceTypeCode != "DRAFT")
                    ReportHTML += '         </body>';
                    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                    //kk




                    if ($("#cbPrintFooterInvoice").prop("checked"))
                        ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    else
                        ReportHTML += '         &emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>';
                    //else
                    //    ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                    if (1==1) {
                        pFinalReportHTML += ReportHTML;
                        Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                    }
                    else {
                        pFinalReportHTML += ReportHTML;
                        pFinalReportHTML += ' <div class="break"></div>';
                    }
                } //EOF else if (pDefaults.UnEditableCompanyName == "GLS") {
                else if (pDefaults.UnEditableCompanyName == "MAR") {
                    debugger;
                    var ReportHTML = '';
                    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                    //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';

                    //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + pInvoiceHeader.ConcatenatedInvoiceNumber + ')' + '</h3></div>';
                    ReportHTML += '                 <div class="col-xs-12 text-center"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + ' ' + $("#slInvoiceOriginal").val() + '</h3></div>';

                    ReportHTML += '         <div class="col-xs-12 m-t">';

                    ReportHTML += '             <div class="col-xs-8">';
                    if (pDefaults.UnEditableCompanyName == "ELC")
                        ReportHTML += '                 <b>Client: </b>' + pOperationHeader.ClientName + "<br>";
                    ReportHTML += '                 <b>Bill to: </b>' + pInvoiceHeader.PartnerName;
                    if (pDefaults.UnEditableCompanyName == "GBL") {
                        ReportHTML += '                 <br><b>Address: </b>' + (pClientHeader.Address == 0 ? "" : pClientHeader.Address.replace(/\n/g, "<br/>"));
                    }
                    else {
                        ReportHTML += '                 <br><b>Address: </b>' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                        ReportHTML += '                     ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2));
                        ReportHTML += '                     ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                        ReportHTML += '                     ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                    }
                    ReportHTML += '                 <br><b>VAT ID No: </b>' + (pClientHeader.VATNumber == 0 ? "" : pClientHeader.VATNumber);
                    ReportHTML += '                 <br><b>Com. Reg. No: </b>' + (pClientHeader.IBANNumber == 0 ? "" : pClientHeader.IBANNumber);
                    ReportHTML += '             </div>';
                    ReportHTML += '             <div class="col-xs-4">';
                    ReportHTML += '                 <b>Billing Date: </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '<br>';
                    ReportHTML += '                 <b>Billing Due Date: </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '<br>';
                    ReportHTML += '                 <b>ETD: </b>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.ExpectedDeparture)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.ExpectedDeparture))) + '<br>';
                    ReportHTML += '                 <b>ETA: </b>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.ExpectedArrival)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.ExpectedArrival)));
                    ReportHTML += '             </div>';
                    //if (pInvoiceTypeCode == "DRAFT") {
                    //    ReportHTML += '             <div style="position:absolute;left:50px;top:250px;">';
                    //    ReportHTML += '             <img src="/Content/Images/DraftWaterMark.jpg" alt="logo" width=612px; height=200px;></div>';
                    //}

                    ReportHTML += '             <div class="col-xs-12 clear"><hr style="border:solid #000 1px;" /></div>';

                    ReportHTML += '         <div class="col-xs-6"><b>Operation: </b>' + (pOperationHeader.Code == 0 ? "" : pOperationHeader.Code) + '</div>';
                    ReportHTML += '         <div class="col-xs-6"><b>Vessel-Voy: </b>' + (pOperationHeader.VesselName == 0 ? "" : pOperationHeader.VesselName) + (pOperationHeader.VoyageOrTruckNumber == 0 ? "" : (" - " + pOperationHeader.VoyageOrTruckNumber)) + '</div>';
                    if ($("#cbPrintHBL").prop("checked") && pDefaults.UnEditableCompanyName != "NEW") {
                        if (pHouseBLs != "0")//Master Operation so show all houses on it
                            ReportHTML += '             <div class="col-xs-6"><b>HBL</b>: ' + pHouseBLs + '</div>';
                        else if (pHouseNumber != "0")
                            ReportHTML += '             <div class="col-xs-6"><b>HB/L No.:</b> ' + (pHouseNumber == "" ? "N/A" : pHouseNumber) + '</div>';
                    }
                    ReportHTML += '         <div class="col-xs-6"><b>Line: </b>' + (pOperationHeader.LineName == 0 ? "" : pOperationHeader.LineName) + '</div>';
                    if ($("#cbPrintMBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU")
                        ReportHTML += '             <div class="col-xs-6"><b>MB/L No.: </b>' + (pOperationHeader.MasterBL == 0 ? "" : pOperationHeader.MasterBL) + '</div>';
                    ReportHTML += '         <div class="col-xs-6"><b>Cont.Types: </b>' + (pOperationHeader.ContainerTypes == 0 ? "" : pOperationHeader.ContainerTypes) + '</div>';
                    ReportHTML += '         <div class="col-xs-6"><b>POL: </b>' + (pPOLName == 0 ? "" : pPOLName) + '</div>';
                    ReportHTML += '         <div class="col-xs-6"><b>Service: </b>' + (pOperationHeader.MoveTypeName == 0 ? "" : pOperationHeader.MoveTypeName) + '</div>';
                    ReportHTML += '         <div class="col-xs-6"><b>POD: </b>' + (pPODName == 0 ? "" : pPODName) + '</div>';
                    ReportHTML += '         <div class="col-xs-6"><b>Weight: </b>' + pOperationHeader.GrossWeightSum + ' KG</div>';

                    if ($("#cbLargeInvoice").prop("checked")) {
                        ReportHTML += '         <div class="m-l" style="clear:both;"><h3><br><br><br>Please, see attachment.</h3></div>';
                        ReportHTML += '         <div class="break"></div>';
                    }

                    ReportHTML += '                     <div class="col-xs-12 clear">';
                    ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    ReportHTML += '                                     <th>Description</th>';
                    if (pInvoiceHeader.InvoiceTypeName != "CLAIM") {
                        ReportHTML += '                                     <th>Qty</th>';
                        ReportHTML += '                                     <th>Unit Price</th>';
                        ReportHTML += '                                     <th>SubTotal</th>';
                        ReportHTML += '                                     <th>WHT</th>';
                        ReportHTML += '                                     <th>VAT %</th>';
                        ReportHTML += '                                     <th>VAT</th>';
                    }
                    ReportHTML += '                                     <th>Total</th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    var _TotalTaxOnItems = 0;
                    var _TotalDiscountOnItems = 0;
                    $.each(JSON.parse(data[2]), function (i, item) {
                        _TotalTaxOnItems += item.TaxAmount;
                        _TotalDiscountOnItems += item.DiscountAmount;
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td style="text-align:left;">' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 && item.ChargeTypeLocalName != undefined ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes.replace(/\n/g, "<br/>")) : "") + '</td>';
                        if (pInvoiceHeader.InvoiceTypeName != "CLAIM") {
                            ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                            ReportHTML += '                                         <td>' + item.SalePrice.toFixed(2) + '</td>';
                            ReportHTML += '                                         <td>' + item.AmountWithoutVAT.toFixed(2) + '</td>';
                            ReportHTML += '                                         <td>' + item.DiscountAmount.toFixed(2) + '</td>';
                            ReportHTML += '                                         <td>' + item.TaxPercentage.toFixed(2) + '</td>';
                            ReportHTML += '                                         <td>' + item.TaxAmount.toFixed(2) + '</td>';
                        }
                        ReportHTML += '                                         <td>' + item.SaleAmount.toFixed(2) + '</td>';
                        ReportHTML += '                                     </tr>';
                    });
                    if (pInvoiceHeader.FixedDiscount > 0) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        if (pInvoiceHeader.InvoiceTypeName != "CLAIM") {
                            ReportHTML += '                                         <td>' + '' + '</td>';
                            ReportHTML += '                                         <td style="text-align:left;">' + 'Special Discount' + '</td>';
                            ReportHTML += '                                         <td>' + '' + '</td>';
                            ReportHTML += '                                         <td colspan=5>' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2) + '</td>';
                        }
                        else {
                            ReportHTML += '                                         <td>' + 'Special Discount' + '</td>';
                            ReportHTML += '                                         <td>' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2) + '</td>';
                        }
                        ReportHTML += '                                     </tr>';
                    }
                    //ReportHTML += '                                         <tr>';
                    //ReportHTML += '                                             <td colspan=2>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                             <td><b>' + pInvoiceHeader.Amount + '</b></td>';
                    //ReportHTML += '                                             <td>' + pInvoiceHeader.CurrencyCode + '</td>';
                    //ReportHTML += '                                         </tr>';
                    //$("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")

                    //ReportHTML += '                                         <tr>';
                    //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                             <td><b>Total Amount : ' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                         </tr>';
                    ReportHTML += '                             </tbody>';
                    ReportHTML += '                         </table>';
                    ReportHTML += '                     </div>'
                    ReportHTML += '                     <div class="col-xs-12 m-t-n">';
                    if (pInvoiceHeader.InvoiceTypeName != "CLAIM" && (_TotalTaxOnItems != 0 || _TotalDiscountOnItems != 0)) {
                        ReportHTML += '                             <b>Subtotal: </b>' + pInvoiceHeader.CurrencyCode + ' ' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                        //ReportHTML += '                             <b>VAT: </b>' + (_TotalTaxOnItems - _TotalDiscountOnItems).toFixed(2) + '</br>';
                        if (_TotalTaxOnItems != 0)
                            ReportHTML += '                             <b>VAT: </b>' + (_TotalTaxOnItems).toFixed(2) + '</br>';
                        if (_TotalDiscountOnItems != 0)
                            ReportHTML += '                             <b>WHT: </b>' + (_TotalDiscountOnItems).toFixed(2) + '</br>';
                    }
                    ReportHTML += '                             <b>Total Due: </b>' + pInvoiceHeader.CurrencyCode + ' <b>' + parseFloat(pInvoiceHeader.Amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b>';
                    ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(parseFloat(pInvoiceHeader.Amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")) + ' ' + pInvoiceHeader.CurrencyCode + '</br>';
                    if ($("#cbPrintUSDTotal").prop("checked") && pInvoiceHeader.CurrencyCode.trim() == "EGP")
                        ReportHTML += '                             <b>USD Total: </b>' + ' <b>' + (pInvoiceHeader.Amount / $("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")).replace(/\B(?=(\d{3})+(?!\d))/g, ",").toFixed(2) + '</b></br>';
                    ReportHTML += '                     </div>';

                    ReportHTML += '                     <div class="col-sm-12 text-center" style="font-size:125%;"><b>' + '   لا يعتد بالفاتورة إلا بعد استلام إيصال السداد    ' + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-12"><b>Notes: </b>' + (pInvoiceHeader.EditableNotes == 0 ? "" : pInvoiceHeader.EditableNotes) + '</div>';
                    ReportHTML += '                     <div class="col-xs-12 m-t">';
                    if ($("#cbPrintBankDetailsFromDefaults").prop("checked") && pDefaults.UnEditableCompanyName != "MAR") {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + '</br>';
                        ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                        ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                        ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                        ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                        ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                    }
                    else if ($("#cbPrintBankDetailsFromTemplate").prop("checked") && pDefaults.UnEditableCompanyName != "MAR") {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + '</br>';
                        ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                    }
                    else
                        ReportHTML += '                             <br>';
                    ReportHTML += '                         </div>';

                    //ReportHTML += '                     </div>'; //of table-responsive
                    //ReportHTML += '                 </section>';
                    //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                    ReportHTML += '             </div>';
                    ReportHTML += '         </body>';

                    //ReportHTML += '                 <div class="col-xs-12 m-t m-l" style="clear:both;"><b>Invoice considered paid if a stamped receipt issued</b></div>';
                    ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftPosition != 0 ? pDefaultsRow.InvoiceLeftPosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddlePosition != 0 ? pDefaultsRow.InvoiceMiddlePosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightPosition != 0 ? pDefaultsRow.InvoiceRightPosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                 </div>'
                    ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftSignature != 0 ? pDefaultsRow.InvoiceLeftSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddleSignature != 0 ? pDefaultsRow.InvoiceMiddleSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightSignature != 0 ? pDefaultsRow.InvoiceRightSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                 </div>';
                    if ($("#cbPrintStamp").prop("checked") && pInvoiceTypeCode != "DRAFT")
                        ReportHTML += '         <div class="text-left m-l-lg"><img src="/Content/Images/CompanyStamp.jpg" alt="stamp"/></div>';

                    ReportHTML += '     <footer class="footer col-xs-12 m-t-lg" style="width:100%; position:absolute; bottom:0;">';
                    if (!$("#cbPrintBankDetailsNone").prop("checked") && pDefaults.UnEditableCompanyName == "MAR") {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + '</br>';
                        ReportHTML += '                             Commercial International Bank - CIB (Manshia Branch)' + '</br>';
                        ReportHTML += '                             10, Orabi Square - Manshia Alexandria, Egypt' + '</br>';
                        ReportHTML += '                             SWIFT: CIBEEGCX008' + '</br>';
                        ReportHTML += '                             A/C : EGP 100035343983 USD 100035344041 EUR 100035344084';
                    }
                    if ($("#cbPrintFooterInvoice").prop("checked")) {
                        ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter' + '.jpg" alt="footer"/></div>';
                    }
                    else
                        ReportHTML += '         &emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>';
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                    if (1==1) {
                        pFinalReportHTML += ReportHTML;
                        Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                    }
                    else {
                        pFinalReportHTML += ReportHTML;
                        pFinalReportHTML += ' <div class="break"></div>';
                    }
                } //else if (pDefaults.UnEditableCompanyName == "MAR") {
                else if (pDefaults.UnEditableCompanyName == "SAF") {
                    debugger;
                    if (pInvoiceHeader.MasterBL == 0 || pOperationHeader.CertificateNumber == 0)
                        swal("Sorry", "Please, make sure that Master B/L & Certificate Number are entered.");
                    else if (pClientHeader.BankName == 0 || pClientHeader.BankName == "" || pClientHeader.IBANNumber == 0 || pClientHeader.IBANNumber == "")
                        swal("Sorry", "Please, make sure that TaxID & Commercial Reg. are entered.");
                    else {

                        var ReportHTML = '';
                        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                        //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                        ReportHTML += '<html>';
                        ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                        //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + pInvoiceHeader.ConcatenatedInvoiceNumber + ')' + '</h3></div>';
                        //if (!(pDefaults.UnEditableCompanyName == "SAF" && pInvoiceTypeCode == "DRAFT")) //Dont print for Safena
                        //    ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + '</h3></div>';
                        //else { //i.e. (pDefaults.UnEditableCompanyName == "SAF" && pInvoiceTypeCode == "DRAFT") {
                        //    ReportHTML += '             <div style="position:absolute;left:50px;top:170px;">';
                        //    ReportHTML += '             <img src="/Content/Images/DraftWaterMark.jpg" alt="logo" width=612px; height=200px;></div>';
                        //}
                        ////ReportHTML += '             <div style="clear:both;"><br></div>';
                        //ReportHTML += '         <div class="col-xs-1 m-l-n-md"><img src="/Content/Images/' + 'InvoiceSideStatement.jpg' + '" alt="logo"/></div>';


                        ReportHTML += '         <div class="col-xs-12 m-t">';

                        ReportHTML += '             <div class="col-xs-5">';
                        ReportHTML += '                 <b>Invoiced to: </b>' + pInvoiceHeader.PartnerName;
                        ReportHTML += '                 <br><b>Address: </b>' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                        ReportHTML += '                     ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2));
                        ReportHTML += '                     ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                        ReportHTML += '                     ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                        ReportHTML += '             </div>';

                        ReportHTML += '             <div class="col-xs-3">';
                        if (pDefaults.UnEditableCompanyName == "SAF")
                            ReportHTML += '                 <b>Ship to: </b>' + pPODName;
                        ReportHTML += '             </div>';

                        ReportHTML += '             <div class="col-xs-4">';
                        if (pInvoiceTypeCode != "DRAFT" || pDefaults.UnEditableCompanyName != "SAF") {
                            if (pInvoiceTypeCode == "SOA" && pInvoiceHeader.RelatedToInvoiceID != 0 && pDefaults.UnEditableCompanyName == "SAF")
                                ReportHTML += '             <b>Related To: </b>' + pInvoiceHeader.RelatedToInvoiceTypeName + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(8, 2) + "#" + pInvoiceHeader.RelatedToInvoiceNumber.toString().padStart(5, 0) + '<br>';
                            else //InvoiceNumber for all companies
                                ReportHTML += '             <b>Billing Number: </b>' + pInvoiceHeader.InvoiceTypeName + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(8, 2) + "#" + pInvoiceHeader.InvoiceNumber.toString().padStart(5, 0) + '<br>';
                        }
                        ReportHTML += '                 <b>Billing Date: </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '<br>';
                        ReportHTML += '                 <b>Billing Due Date: </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate);
                        ReportHTML += '             </div>';
                        if (pInvoiceTypeCode == "DRAFT") {
                            ReportHTML += '             <div style="position:absolute;left:50px;top:250px;">';
                            ReportHTML += '             <img src="/Content/Images/DraftWaterMark.jpg" alt="logo" width=612px; height=200px;></div>';
                        }

                        if (pInvoiceHeader.PartnerTypeCode == "BOOKING PARTY" && pDefaults.UnEditableCompanyName == "SAF") {
                            if (pOperationHeader.DirectionType == constImportDirectionType)
                                ReportHTML += '         <div class="col-xs-12 clear"><b>Consignee: </b>' + (pOperationHeader.ConsigneeName == 0 ? "" : pOperationHeader.ConsigneeName) + '</div>';
                            else
                                ReportHTML += '         <div class="col-xs-12 clear"><b>Shipper: </b>' + (pOperationHeader.ShipperName == 0 ? "" : pOperationHeader.ShipperName) + '</div>';
                        }
                        if (pOperationHeader.MasterBL != "N/A")
                            ReportHTML += '         <div class="col-xs-12 clear"><b>B/L: </b>' + (pOperationHeader.MasterBL == 0 ? "" : pOperationHeader.MasterBL) + '</div>';
                        if (pOperationHeader.CertificateNumber != "N/A")
                            ReportHTML += '         <div class="col-xs-12 clear"><b>Certificate Number: </b>' + (pOperationHeader.CertificateNumber == 0 ? "" : pOperationHeader.CertificateNumber) + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Notes: </b>' + (pInvoiceHeader.EditableNotes == 0 ? "" : pInvoiceHeader.EditableNotes) + '</div>';

                        if (pInvoiceTypeCode == "SOA" && pDefaults.UnEditableCompanyName == "SAF") {
                            ReportHTML += '         <br><div class="col-xs-12 clear">To be paid to IACC Logistics</div>';
                            ReportHTML += '         <br><div class="col-xs-12 clear">Claim for settlement of Official Receipts, Storage, Demurrage & Detention paid on behalf of your respectful company.</div>';
                        }

                        ReportHTML += '                     <div class="col-xs-12 clear">';
                        ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                        ReportHTML += '                             <thead>';
                        ReportHTML += '                                 <tr>';
                        ReportHTML += '                                     <th>Item</th>';
                        ReportHTML += '                                     <th>Description</th>';
                        ReportHTML += '                                     <th>Qty</th>';
                        ReportHTML += '                                     <th>Unit Price</th>';
                        ReportHTML += '                                     <th>VAT</th>';
                        ReportHTML += '                                     <th>WHT</th>';
                        ReportHTML += '                                     <th>Total</th>';
                        ReportHTML += '                                 </tr>';
                        ReportHTML += '                             </thead>';
                        ReportHTML += '                             <tbody>';
                        var _TotalTaxOnItems = 0;
                        var _TotalDiscountOnItems = 0;
                        $.each(JSON.parse(data[2]), function (i, item) {
                            _TotalTaxOnItems += item.TaxAmount;
                            _TotalDiscountOnItems += item.DiscountAmount;
                            ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                            ReportHTML += '                                         <td>' + (i + 1) + '</td>';
                            ReportHTML += '                                         <td style="text-align:left;">' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                            ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                            ReportHTML += '                                         <td>' + item.SalePrice.toFixed(2) + '</td>';
                            ReportHTML += '                                         <td>' + item.TaxAmount.toFixed(2) + '</td>';
                            ReportHTML += '                                         <td>' + item.DiscountAmount.toFixed(2) + '</td>';
                            ReportHTML += '                                         <td>' + item.SaleAmount.toFixed(2) + '</td>';
                            //ReportHTML += '                                         <td>' + (item.Notes == "0" ? "" : item.Notes) + '</td>';
                            ReportHTML += '                                     </tr>';
                        });
                        if (pInvoiceHeader.FixedDiscount > 0) {
                            ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                            ReportHTML += '                                         <td>' + '' + '</td>';
                            ReportHTML += '                                         <td style="text-align:left;">' + 'Special Discount' + '</td>';
                            ReportHTML += '                                         <td>' + '' + '</td>';
                            ReportHTML += '                                         <td colspan=4>' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2) + '</td>';
                            //ReportHTML += '                                         <td>' + _TotalTaxOnItems + '</td>';
                            //ReportHTML += '                                         <td>' + '' + '</td>';
                            ReportHTML += '                                     </tr>';
                        }
                        //ReportHTML += '                                         <tr>';
                        //ReportHTML += '                                             <td colspan=2>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                        //ReportHTML += '                                             <td><b>' + pInvoiceHeader.Amount + '</b></td>';
                        //ReportHTML += '                                             <td>' + pInvoiceHeader.CurrencyCode + '</td>';
                        //ReportHTML += '                                         </tr>';
                        //$("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")

                        //ReportHTML += '                                         <tr>';
                        //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                        //ReportHTML += '                                             <td><b>Total Amount : ' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                        //ReportHTML += '                                         </tr>';
                        ReportHTML += '                             </tbody>';
                        ReportHTML += '                         </table>';
                        ReportHTML += '                     </div>'

                        if ($("#cbLargeInvoice").prop("checked")) {
                            ReportHTML += '         <div class="col-xs-12 m-t-n">Please, see attachment.</div>';
                            ReportHTML += '         <div class="break"></div>';
                        }
                        else
                            ReportHTML += '                         <div class="row"></div>';
                        ReportHTML += '                         <div class="col-xs-8 m-t">';
                        if (pDefaults.UnEditableCompanyName == "SAF") { //($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                            if (pInvoiceTypeCode == "SOA") {
                                ReportHTML += '                     <div class="col-xs-12 m-l-n">' + '- This statement is for Official receipts, Storage, Demurrage & Detention doesnt consider as Official Invoice from IACC Logistics.' + '</div>';
                                ReportHTML += '                     <div class="col-xs-12 m-l-n">' + '- Please settle the amount on our bank account details below with separate transfer than the invoice.' + '</div><br>';
                            }
                            else
                                ReportHTML += '                     <div class="col-xs-12 m-l-n">' + '- The invoice cannot be modified 15 days after the date of receipt.' + '</div><br>';
                            ReportHTML += '                             <b>Bank:</b> ' + pBankName + '</br>';
                            ReportHTML += '                             <b>Branch:</b> ' + pBankAddress + '</br>';
                            ReportHTML += '                             <b>Beneficiary:</b> ' + pAccountName + '</br>';
                            //ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                            ReportHTML += '                             <b>Account Number:</b> ' + '</br>';
                            ReportHTML += '                             (EGP) 100005281118' + '</br>';
                            ReportHTML += '                             (USD) 100009734435' + '</br>';
                            ReportHTML += '                             (EUR) 100013426508' + '</br>';
                            ReportHTML += '                             <b>Swift:</b> ' + pSwiftCode + '</br>';
                            ReportHTML += '                             <b>Tax Card No:</b> ' + (pDefaultsRow.TaxNumber == 0 ? "" : pDefaultsRow.TaxNumber) + '</br>';

                        }
                        else if ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                            ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + '</br>';
                            ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                            ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                            ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                            ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                            ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                        }
                        else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                            ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + '</br>';
                            ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                        }
                        else
                            ReportHTML += '                             <br>';
                        ReportHTML += '                         </div>';
                        ReportHTML += '                         <div class="col-xs-4 text-right m-t-n">';
                        if (_TotalTaxOnItems != 0 || _TotalDiscountOnItems != 0) {
                            ReportHTML += '                             <b>Subtotal: </b>' + pInvoiceHeader.CurrencyCode + ' ' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                            //ReportHTML += '                             <b>VAT: </b>' + (_TotalTaxOnItems - _TotalDiscountOnItems).toFixed(2) + '</br>';
                            ReportHTML += '                             <b>VAT: </b>' + (_TotalTaxOnItems).toFixed(2) + '</br>';
                            ReportHTML += '                             <b>WHT: </b>' + (_TotalDiscountOnItems).toFixed(2) + '</br>';
                        }
                        //if (pDiscountAmount != 0)
                        //    ReportHTML += '                             <b>WHT(' + pInvoiceHeader.DiscountPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pDiscountAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                        ReportHTML += '                             <b>Total: </b>' + pInvoiceHeader.CurrencyCode + ' <b>' + parseFloat(pInvoiceHeader.Amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></br>';
                        ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(parseFloat(pInvoiceHeader.Amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")) + ' ' + pInvoiceHeader.CurrencyCode + '</br>';
                        if ($("#cbPrintUSDTotal").prop("checked") && pInvoiceHeader.CurrencyCode.trim() == "EGP")
                            ReportHTML += '                             <b>USD Total: </b>' + ' <b>' + (pInvoiceHeader.Amount / $("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")).replace(/\B(?=(\d{3})+(?!\d))/g, ",").toFixed(2) + '</b></br>';
                        ReportHTML += '                         </div>';

                        //ReportHTML += '                     </div>'; //of table-responsive
                        //ReportHTML += '                 </section>';
                        //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                        ReportHTML += '             </div>';
                        ReportHTML += '         </body>';

                        ReportHTML += '                 <div class="col-xs-12 m-t m-l" style="clear:both;"><b>Invoice considered paid if a stamped receipt issued</b></div>';
                        ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                        ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftPosition != 0 ? pDefaultsRow.InvoiceLeftPosition : '&emsp;') + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddlePosition != 0 ? pDefaultsRow.InvoiceMiddlePosition : '&emsp;') + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightPosition != 0 ? pDefaultsRow.InvoiceRightPosition : '&emsp;') + '</b></div>';
                        ReportHTML += '                 </div>'
                        ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                        ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftSignature != 0 ? pDefaultsRow.InvoiceLeftSignature : '&emsp;') + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddleSignature != 0 ? pDefaultsRow.InvoiceMiddleSignature : '&emsp;') + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightSignature != 0 ? pDefaultsRow.InvoiceRightSignature : '&emsp;') + '</b></div>';
                        ReportHTML += '                 </div>'
                        if ($("#cbPrintStamp").prop("checked") && pInvoiceTypeCode != "DRAFT")
                            ReportHTML += '         <div class="text-left m-l-lg"><img src="/Content/Images/CompanyStamp.jpg" alt="stamp"/></div>';

                        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

                        //ReportHTML += '         <div class="row text-right m-r m-t">' + '  يتنبه نحو عدم الخصم من تحت حساب الضريبة حيث أن الشركة تتبع نظام الدفعات المقدمة تطبيقا لأحكام لمادة (62) من القانون رقم 91 لسنة 2005  ' + '</div>';
                        //ReportHTML += '         <div class="row text-right m-r">' + '  يوقف صرف شيكات مصر للتأمين لحين تسوية التعويضات  ' + '</div>';
                        //ReportHTML += '         <div class="row text-right m-r">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
                        //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
                        //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                        //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
                        if ($("#cbPrintFooterInvoice").prop("checked"))
                            ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter' + (pInvoiceTypeCode == "SOA" ? "-Statement" : "") + '.jpg" alt="footer"/></div>';
                        else
                            ReportHTML += '         &emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>';
                        ReportHTML += '     </footer>';
                        ReportHTML += '</html>';
                        if (1==1) {
                            pFinalReportHTML += ReportHTML;
                            Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                        }
                        else {
                            pFinalReportHTML += ReportHTML;
                            pFinalReportHTML += ' <div class="break"></div>';
                        }
                    } //if (pInvoiceHeader.MasterBL == 0 || pInvoiceHeader.CertificateNumber == 0)
                } //EOF if (pDefaults.UnEditableCompanyName == "SAF")
                else if (pDefaults.UnEditableCompanyName == "SEF-WithOptions") {
                    debugger;

                    var ReportHTML = '';
                    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                    //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';

                    ReportHTML += '                 <div class="col-xs-12 text-center"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + ' ' + $("#slInvoiceOriginal").val() + '</h3></div>';

                    ReportHTML += '         <div class="col-xs-12 m-t">';

                    ReportHTML += '             <div class="col-xs-8">';
                    ReportHTML += '                 <b>Bill to: </b>' + pInvoiceHeader.PartnerName;
                    if (pDefaults.UnEditableCompanyName == "GBL") {
                        ReportHTML += '                 <br><b>Address: </b>' + (pClientHeader.Address == 0 ? "" : pClientHeader.Address.replace(/\n/g, "<br/>"));
                    }
                    else {
                        ReportHTML += '                 <br><b>Address: </b>' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                        ReportHTML += '                     ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2));
                        ReportHTML += '                     ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                        ReportHTML += '                     ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                    }
                    ReportHTML += '             </div>';
                    ReportHTML += '             <div class="col-xs-4">';
                    ReportHTML += '                 <b>Billing Date: </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '<br>';
                    ReportHTML += '                 <b>Billing Due Date: </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '<br>';
                    ReportHTML += '             </div>';
                    //if (pInvoiceTypeCode == "DRAFT") {
                    //    ReportHTML += '             <div style="position:absolute;left:50px;top:250px;">';
                    //    ReportHTML += '             <img src="/Content/Images/DraftWaterMark.jpg" alt="logo" width=612px; height=200px;></div>';
                    //}

                    ReportHTML += '             <div class="col-xs-12 clear"><hr style="border:solid #000 1px;" /></div>';

                    ReportHTML += '         <div class="col-xs-6"><b>Operation: </b>' + (pOperationHeader.Code == 0 ? pOperationHeader.MasterOperationCode : pOperationHeader.Code) + '</div>';
                    ReportHTML += '         <div class="col-xs-6"><b>' + "FileNo.:" + ' </b>' + ((pMasterOperationHeader != undefined && pMasterOperationHeader != null) ? pMasterOperationHeader.CustomerReference : pOperationHeader.CustomerReference) + '</div>';

                    if ($("#cbPrintMBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU")
                        ReportHTML += '             <div class="col-xs-6"><b>' + (pOperationHeader.TransportType == AirTransportType ? 'MAWB: ' : 'MBL: ') + '</b>' + pMasterBL + '</div>';

                    if ($("#cbPrintHBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" )
                        ReportHTML += '             <div class="col-xs-6"><b>' + (pOperationHeader.TransportType == AirTransportType ? "HAWB" : 'HBL') + '</b>: ' + (pHouseNumber == "" ? pHouseBLs : pHouseNumber) + '</div>';

                    if ($("#cbPrintCourier").prop("checked"))
                        ReportHTML += '         <div class="col-xs-6"><b>Courier: </b>' + ((pOperationHeader.LineName == 0 && pMasterOperationHeader != undefined && pMasterOperationHeader != null) ? pMasterOperationHeader.LineName : pOperationHeader.LineName) + '</div>';
                    if ($("#cbPrintAWB").prop("checked"))
                        ReportHTML += '         <div class="col-xs-6"><b>AWB: </b>' + (pMainRoute.Notes == 0 ? "" : pMainRoute.Notes) + '</div>';

                    if ($("#cbPrintLine").prop("checked"))
                        ReportHTML += '         <div class="col-xs-6"><b>Line: </b>' + ((pOperationHeader.LineName == 0 && pMasterOperationHeader != undefined && pMasterOperationHeader != null) ? pMasterOperationHeader.LineName : pOperationHeader.LineName) + '</div>';
                    if ($("#cbPrintPOL").prop("checked"))
                        ReportHTML += '         <div class="col-xs-6"><b>POL: </b>' + (pPOLName == 0 ? "" : pPOLName) + '</div>';
                    if ($("#cbPrintPOD").prop("checked"))
                        ReportHTML += '         <div class="col-xs-6"><b>POD: </b>' + (pPODName == 0 ? "" : pPODName) + '</div>';
                    if ($("#cbPrintRefNo").prop("checked"))
                        ReportHTML += '         <div class="col-xs-6"><b>' + "Ref Number: " + ' </b>' + (pOperationHeader.BLType == constHouseBLType ? pMasterOperationHeader.Notes : pOperationHeader.Notes) + '</div>';
                    if ($("#cbPrintPONumber").prop("checked"))
                        ReportHTML += '         <div class="col-xs-6"><b>' + "PO Number: " + ' </b>' + (pOperationHeader.BLType == constHouseBLType ? pOperationHeader.FreightPayableAt : pOperationHeader.PONumber) + '</div>';
                    if ($("#cbPrintNoOfContainers").prop("checked"))
                        ReportHTML += '         <div class="col-xs-6"><b>No of CTRs: </b>' + (pOperationHeader.ContainerTypes == 0 ? "" : pOperationHeader.ContainerTypes) + '</div>';
                    if ($("#cbPrintNoOfPackages").prop("checked"))
                        ReportHTML += '             <div class="col-xs-6"><b>No of packages: </b>' + (pOperationHeader.PackageTypeName != 0 ? (pOperationHeader.NumberOfPackages + 'x' + pOperationHeader.PackageTypeName) : pOperationHeader.PackageTypes) + '</div>';

                    if ($("#cbPrintChargeableWeight").prop("checked"))
                        ReportHTML += '             <div class="col-xs-6"><b>ChargeableWeight: </b>' + pOperationHeader.ChargeableWeightSum + ' KGM' + '</div>';
                    if ($("#cbPrintVolume").prop("checked"))
                        ReportHTML += '             <div class="col-xs-6"><b>Volume: </b>' + pCBM + ' CBM</div>';
                    if ($("#cbPrintSONumber").prop("checked"))
                        ReportHTML += '         <div class="col-xs-6"><b>' + "SO Number: " + ' </b>' + (pOperationHeader.Notes == 0 ? "" : pOperationHeader.Notes) + '</div>';
                    if ($("#cbPrintShipper").prop("checked"))
                        ReportHTML += '         <div class="col-xs-6"><b>' + "Shipper: " + ' </b>' + (pOperationHeader.ShipperName == 0 ? "" : pOperationHeader.ShipperName) + '</div>';
                    if ($("#cbPrintBookingNumber").prop("checked"))
                        ReportHTML += '         <div class="col-xs-6"><b>' + "Booking No: " + ' </b>' + (pOperationHeader.BookingNumbers == 0 || pOperationHeader.BookingNumbers == "" ? "N/A" : pOperationHeader.BookingNumbers) + '</div>';
                    if ($("#cbPrintGrossWeight").prop("checked"))
                        ReportHTML += '             <div class="col-xs-4"><b>Gross Weight: </b>' + pOperationHeader.GrossWeightSum + ' KGM' + '</div>';
                    if ($("#cbLargeInvoice").prop("checked")) {
                        ReportHTML += '         <div class="m-l" style="clear:both;"><h3><br><br><br>Please, see attachment.</h3></div>';
                        ReportHTML += '         <div class="break"></div>';
                    }
                    ReportHTML += '                     <div class="col-xs-12 clear">';
                    ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    ReportHTML += '                                     <th>Description</th>';
                    ReportHTML += '                                     <th>Qty</th>';
                    ReportHTML += '                                     <th>Unit Price</th>';
                    ReportHTML += '                                     <th>WHT</th>';
                    ReportHTML += '                                     <th>VAT</th>';
                    ReportHTML += '                                     <th>Total</th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    var _TotalTaxOnItems = 0;
                    var _TotalDiscountOnItems = 0;
                    $.each(JSON.parse(data[2]), function (i, item) {
                        _TotalTaxOnItems += item.TaxAmount;
                        _TotalDiscountOnItems += item.DiscountAmount;
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td style="text-align:left;">' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 && item.ChargeTypeLocalName != undefined ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes.replace(/\n/g, "<br/>")) : "") + '</td>';
                        ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                        ReportHTML += '                                         <td>' + item.SalePrice.toFixed(2) + '</td>';
                        ReportHTML += '                                         <td>' + item.DiscountAmount.toFixed(2) + '</td>';
                        ReportHTML += '                                         <td>' + item.TaxAmount.toFixed(2) + '</td>';
                        ReportHTML += '                                         <td>' + item.SaleAmount.toFixed(2) + '</td>';
                        //ReportHTML += '                                         <td>' + (item.Notes == "0" ? "" : item.Notes) + '</td>';
                        ReportHTML += '                                     </tr>';
                    });
                    if (pInvoiceHeader.FixedDiscount > 0) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td style="text-align:left;">' + 'Special Discount' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td colspan=4>' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2) + '</td>';
                        //ReportHTML += '                                         <td>' + _TotalTaxOnItems + '</td>';
                        //ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                     </tr>';
                    }
                    //ReportHTML += '                                         <tr>';
                    //ReportHTML += '                                             <td colspan=2>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                             <td><b>' + pInvoiceHeader.Amount + '</b></td>';
                    //ReportHTML += '                                             <td>' + pInvoiceHeader.CurrencyCode + '</td>';
                    //ReportHTML += '                                         </tr>';
                    //$("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")

                    //ReportHTML += '                                         <tr>';
                    //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                             <td><b>Total Amount : ' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                         </tr>';
                    ReportHTML += '                             </tbody>';
                    ReportHTML += '                         </table>';
                    ReportHTML += '                     </div>'

                    ReportHTML += '                         <div class="row"></div>';

                    ReportHTML += '                         <div class="col-xs-8 m-t">';
                    if ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + '</br>';
                        ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                        ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                        ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                        ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                        ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                    }
                    else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + '</br>';
                        ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                    }
                    else
                        ReportHTML += '                             <br>';
                    ReportHTML += '                         </div>';
                    ReportHTML += '                         <div class="col-xs-4 text-right m-t-n">';
                    if (_TotalTaxOnItems != 0 || _TotalDiscountOnItems != 0) {
                        ReportHTML += '                             <b>Subtotal: </b>' + pInvoiceHeader.CurrencyCode + ' ' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                        //ReportHTML += '                             <b>VAT: </b>' + (_TotalTaxOnItems - _TotalDiscountOnItems).toFixed(2) + '</br>';
                        if (_TotalTaxOnItems != 0)
                            ReportHTML += '                             <b>VAT: </b>' + (_TotalTaxOnItems).toFixed(2) + '</br>';
                        if (_TotalDiscountOnItems != 0)
                            ReportHTML += '                             <b>WHT: </b>' + (_TotalDiscountOnItems).toFixed(2) + '</br>';
                    }
                    ReportHTML += '                             <b>Total: </b>' + pInvoiceHeader.CurrencyCode + ' <b>' + parseFloat(pInvoiceHeader.Amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></br>';
                    ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(parseFloat(pInvoiceHeader.Amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")) + ' ' + pInvoiceHeader.CurrencyCode + '</br>';
                    if ($("#cbPrintUSDTotal").prop("checked") && pInvoiceHeader.CurrencyCode.trim() == "EGP")
                        ReportHTML += '                             <b>USD Total: </b>' + ' <b>' + (pInvoiceHeader.Amount / $("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")).replace(/\B(?=(\d{3})+(?!\d))/g, ",").toFixed(2) + '</b></br>';
                    ReportHTML += '                         </div>';

                    //ReportHTML += '                     </div>'; //of table-responsive
                    //ReportHTML += '                 </section>';
                    //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                    ReportHTML += '             </div>';
                    ReportHTML += '         </body>';

                    //ReportHTML += '                 <div class="col-xs-12 m-t m-l" style="clear:both;"><b>Invoice considered paid if a stamped receipt issued</b></div>';
                    ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftPosition != 0 ? pDefaultsRow.InvoiceLeftPosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddlePosition != 0 ? pDefaultsRow.InvoiceMiddlePosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightPosition != 0 ? pDefaultsRow.InvoiceRightPosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                 </div>'
                    ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftSignature != 0 ? pDefaultsRow.InvoiceLeftSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddleSignature != 0 ? pDefaultsRow.InvoiceMiddleSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightSignature != 0 ? pDefaultsRow.InvoiceRightSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                 </div>';
                    if ($("#cbPrintStamp").prop("checked") && pInvoiceTypeCode != "DRAFT") {
                        ReportHTML += '         <div class="text-left m-l-lg"><img src="/Content/Images/CompanyStamp.jpg" alt="stamp"/></div>';
                    }
                    //ReportHTML += '                     <div class="col-xs-12 m-t-lg text-center"><b>' + '   الشركة لا تخضع لنظام الخصم تطبيقا لأحكام المادة رفم 59 من القانون 91 لسنة 2005 حيث يتم تطبيق نظام الدفعات المقدمة طبقا لأحكام المادة 62   ' + '</b></div>';
                    ReportHTML += '     <footer class="footer col-xs-12 m-t-lg" style="width:100%; position:absolute; bottom:0;">';
                    //ReportHTML += '         <div class="row text-right m-r m-t">' + '  يتنبه نحو عدم الخصم من تحت حساب الضريبة حيث أن الشركة تتبع نظام الدفعات المقدمة تطبيقا لأحكام لمادة (62) من القانون رقم 91 لسنة 2005  ' + '</div>';
                    if ($("#cbPrintFooterInvoice").prop("checked")) {
                        ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter' + (pInvoiceHeader.InvoiceTypeName == "DN" ? "-Debit" : "") + '.jpg" alt="footer"/></div>';
                    }
                    else
                        ReportHTML += '         &emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>';
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                    if (1==1) {
                        pFinalReportHTML += ReportHTML;
                        Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                    }
                    else {
                        pFinalReportHTML += ReportHTML;
                        pFinalReportHTML += ' <div class="break"></div>';
                    }
                } //else if (pDefaults.UnEditableCompanyName == "SAF")
                else if (pDefaults.UnEditableCompanyName == "SEF") {
                    debugger;

                    var ReportHTML = '';
                    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                    //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';

                    ReportHTML += '                 <div class="col-xs-12 text-center"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + ' ' + $("#slInvoiceOriginal").val() + '</h3></div>';

                    ReportHTML += '         <div class="col-xs-12 m-t">';

                    ReportHTML += '             <div class="col-xs-8">';
                    ReportHTML += '                 <b>Bill to: </b>' + pInvoiceHeader.PartnerName;
                    if (pDefaults.UnEditableCompanyName == "GBL") {
                        ReportHTML += '                 <br><b>Address: </b>' + (pClientHeader.Address == 0 ? "" : pClientHeader.Address.replace(/\n/g, "<br/>"));
                    }
                    else {
                        ReportHTML += '                 <br><b>Address: </b>' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                        ReportHTML += '                     ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2));
                        ReportHTML += '                     ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                        ReportHTML += '                     ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                    }
                    ReportHTML += '             </div>';
                    ReportHTML += '             <div class="col-xs-4">';
                    ReportHTML += '                 <b>Billing Date: </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '<br>';
                    ReportHTML += '                 <b>Billing Due Date: </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '<br>';
                    ReportHTML += '             </div>';
                    //if (pInvoiceTypeCode == "DRAFT") {
                    //    ReportHTML += '             <div style="position:absolute;left:50px;top:250px;">';
                    //    ReportHTML += '             <img src="/Content/Images/DraftWaterMark.jpg" alt="logo" width=612px; height=200px;></div>';
                    //}

                    ReportHTML += '             <div class="col-xs-12 clear"><hr style="border:solid #000 1px;" /></div>';

                    ReportHTML += '         <div class="col-xs-6"><b>Operation: </b>' + (pOperationHeader.Code == 0 ? pOperationHeader.MasterOperationCode : pOperationHeader.Code) + '</div>';
                    ReportHTML += '         <div class="col-xs-6"><b>' + "FileNo.:" + ' </b>' + ((pMasterOperationHeader != undefined && pMasterOperationHeader != null) ? pMasterOperationHeader.CustomerReference : pOperationHeader.CustomerReference) + '</div>';
                    if (pOperationHeader.LineName.split(" ")[0] != "DHL" && pOperationHeader.LineName.split(" ")[0] != "TNT"
                        && pOperationHeader.LineName.split(" ")[0] != "FEDEX" && pOperationHeader.LineName.split(" ")[0] != "UPS"
                        && pOperationHeader.LineName.split(" ")[0] != "ARAMEX") {
                        ReportHTML += '         <div class="col-xs-6"><b>' + (pOperationHeader.TransportType == AirTransportType ? 'Airline' : 'Shipping Line') + ': </b>' + ((pOperationHeader.LineName == 0 && pMasterOperationHeader != undefined && pMasterOperationHeader != null) ? (pMasterOperationHeader.LineName == 0 || pMasterOperationHeader.LineName == "" ? "N/A" : pMasterOperationHeader.LineName) : (pOperationHeader.LineName == 0 || pOperationHeader.LineName == "" ? "N/A" : pOperationHeader.LineName)) + '</div>';
                        if (pOperationHeader.ShipmentType == constConsolidationShipmentType)
                            ReportHTML += '         <div class="col-xs-6"><b>' + "Shipper: " + ' </b>' + (pOperationHeader.ShipperName == 0 || pOperationHeader.ShipperName == "" ? "N/A" : pOperationHeader.ShipperName) + '</div>';
                        else
                            ReportHTML += '         <div class="col-xs-6"><b>' + "Booking No: " + ' </b>' + (pOperationHeader.BookingNumbers == 0 || pOperationHeader.BookingNumbers == "" ? "N/A" : pOperationHeader.BookingNumbers) + '</div>';
                    }
                    //if ($("#cbPrintMBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU")
                    ReportHTML += '             <div class="col-xs-6"><b>' + (pOperationHeader.TransportType == AirTransportType ? 'MAWB: ' : 'MBL: ') + '</b>' + (pMasterBL == 0 || pMasterBL == "" ? "N/A" : pMasterBL) + '</div>';
                    //if ($("#cbPrintHBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ) {
                    ReportHTML += '             <div class="col-xs-6"><b>' + (pOperationHeader.TransportType == AirTransportType ? "HAWB" : 'HBL') + '</b>: ' + (pHouseNumber == "" ? (pHouseBLs == 0 || pHouseBLs == "" ? "N/A" : pHouseBLs) : (pHouseNumber == 0 || pHouseNumber == "" ? "N/A" : pHouseNumber)) + '</div>';

                    //Ocean Export FCL
                    if (pOperationHeader.TransportType == OceanTransportType && pOperationHeader.DirectionType == constExportDirectionType && pOperationHeader.ShipmentType == constFCLShipmentType) {
                        ReportHTML += '         <div class="col-xs-6"><b>POL: </b>' + (pPOLName == 0 || pPOLName == "" ? "N/A" : pPOLName) + '</div>';
                        ReportHTML += '         <div class="col-xs-6"><b>POD: </b>' + (pPODName == 0 || pPODName == "" ? "N/A" : pPODName) + '</div>';
                        if (pOperationHeader.DirectionType == constExportDirectionType)
                            ReportHTML += '         <div class="col-xs-6"><b>' + "Ref Number: " + ' </b>' + (pOperationHeader.BLType == constHouseBLType ? (pMasterOperationHeader.Notes == 0 || pMasterOperationHeader.Notes == "" ? "N/A" : pMasterOperationHeader.Notes) : (pOperationHeader.Notes == 0 || pOperationHeader.Notes == "" ? "N/A" : pOperationHeader.Notes)) + '</div>';
                        else
                            ReportHTML += '         <div class="col-xs-6"><b>' + "SO Number: " + ' </b>' + (pOperationHeader.Notes == 0 || pOperationHeader.Notes == "" ? "N/A" : pOperationHeader.Notes) + '</div>';
                        ReportHTML += '         <div class="col-xs-6"><b>' + "PO Number: " + ' </b>' + (pOperationHeader.BLType == constHouseBLType ? (pMasterOperationHeader.PONumber == 0 || pMasterOperationHeader.PONumber == "" ? "N/A" : pMasterOperationHeader.PONumber) : (pOperationHeader.PONumber == 0 || pOperationHeader.PONumber == "" ? "N/A" : pOperationHeader.PONumber)) + '</div>';
                        ReportHTML += '         <div class="col-xs-6"><b>No of CTRs: </b>' + (pOperationHeader.ContainerTypes == 0 || pOperationHeader.ContainerTypes == "" ? "N/A" : pOperationHeader.ContainerTypes) + '</div>';
                    } //EOF if (pOperationHeader.TransportType == OceanTransportType && pOperationHeader.DirectionType == constExportDirectionType && pOperationHeader.ShipmentType == constFCLShipmentType) {
                    else {
                        if (pOperationHeader.LineName.split(" ")[0] == "DHL" || pOperationHeader.LineName.split(" ")[0] == "TNT"
                            || pOperationHeader.LineName.split(" ")[0] == "FEDEX" || pOperationHeader.LineName.split(" ")[0] == "UPS"
                            || pOperationHeader.LineName.split(" ")[0] == "ARAMEX") { //line 2
                            ReportHTML += '         <div class="col-xs-6"><b>Courier: </b>' + ((pOperationHeader.LineName == 0 && pMasterOperationHeader != undefined && pMasterOperationHeader != null) ? (pMasterOperationHeader.LineName == 0 || pMasterOperationHeader.LineName == "" ? "N/A" : pMasterOperationHeader.LineName) : (pOperationHeader.LineName == 0 || pOperationHeader.LineName == "" ? "N/A" : pOperationHeader.LineName)) + '</div>';
                            ReportHTML += '         <div class="col-xs-6"><b>AWB: </b>' + (pMainRoute.Notes == 0 || pMainRoute.Notes == "" ? "N/A" : pMainRoute.Notes) + '</div>';
                        }
                        ReportHTML += '         <div class="col-xs-6"><b>POL: </b>' + (pPOLName == 0 || pPOLName == "" ? "N/A" : pPOLName) + '</div>';
                        ReportHTML += '         <div class="col-xs-6"><b>POD: </b>' + (pPODName == 0 || pPODName == "" ? "N/A" : pPODName) + '</div>';
                        ReportHTML += '         <div class="col-xs-6"><b>' + "PO Number: " + ' </b>' + (pOperationHeader.BLType == constHouseBLType ? (pOperationHeader.FreightPayableAt == 0 || pOperationHeader.FreightPayableAt == "" ? "N/A" : pOperationHeader.FreightPayableAt) : (pOperationHeader.PONumber == 0 || pOperationHeader.PONumber == "" ? "N/A" : pOperationHeader.PONumber)) + '</div>';
                        //if (pInvoiceHeader.InvoiceTypeCode == "ST" && !(pOperationHeader.TransportType == OceanTransportType && pOperationHeader.DirectionType == constExportDirectionType && pOperationHeader.ShipmentType == constFCLShipmentType))
                        if (pOperationHeader.DirectionType == constExportDirectionType)
                            ReportHTML += '         <div class="col-xs-6"><b>' + "Ref Number: " + ' </b>' + (pOperationHeader.BLType == constHouseBLType ? (pMasterOperationHeader.Notes == 0 || pMasterOperationHeader.Notes == "" ? "N/A" : pMasterOperationHeader.Notes) : (pOperationHeader.Notes == 0 || pOperationHeader.Notes == "" ? "N/A" : pOperationHeader.Notes)) + '</div>';
                        else
                            ReportHTML += '         <div class="col-xs-6"><b>' + "SO Number: " + ' </b>' + (pOperationHeader.Notes == 0 || pOperationHeader.Notes == "" ? "N/A" : pOperationHeader.Notes) + '</div>';

                        //if (pOperationHeader.CustomerReference != 0)
                        //    ReportHTML += '         <div class="col-xs-6"><b>' + "Consol.FileNo." + ' </b>' + (pOperationHeader.CustomerReference == 0 ? "" : pOperationHeader.CustomerReference) + '</div>';

                        if (pOperationHeader.ShipmentType == constFCLShipmentType || pOperationHeader.ShipmentType == constFCLShipmentType)
                            ReportHTML += '         <div class="col-xs-6"><b>No of CTRs: </b>' + (pOperationHeader.ContainerTypes == 0 || pOperationHeader.ContainerTypes == "" ? "N/A" : pOperationHeader.ContainerTypes) + '</div>';
                        else {
                            ReportHTML += '             <div class="col-xs-6"><b>No of packages: </b>' + (pOperationHeader.PackageTypeName != 0 ? (pOperationHeader.NumberOfPackages + 'x' + pOperationHeader.PackageTypeName) : pOperationHeader.PackageTypes) + '</div>';
                            ReportHTML += '             <div class="col-xs-6"><b>Description: </b>' + (pOperationHeader.DescriptionOfGoods == 0 || pOperationHeader.DescriptionOfGoods == "" ? "N/A" : pOperationHeader.DescriptionOfGoods) + '</div>';
                        }
                        //ReportHTML += '             <div class="col-xs-6"><b>Com. Reg. No.: </b>' + (pDefaults.CommericalRegNo == 0 ? "" : pDefaults.CommericalRegNo) + '</div>';
                        //ReportHTML += '             <div class="col-xs-6"><b>VAT ID No.: </b>' + (pDefaults.VatIDNo == 0 ? "" : pDefaults.VatIDNo) + '</div>';
                        //ReportHTML += '             <div class="col-xs-6"><b>Service: </b>' + (pOperationHeader.MoveTypeName == 0 ? "" : pOperationHeader.MoveTypeName) + '</div>';
                    } //else if (pOperationHeader.TransportType == OceanTransportType && pOperationHeader.DirectionType == constExportDirectionType && pOperationHeader.ShipmentType == constFCLShipmentType) {
                    ReportHTML += '             <div class="col-xs-6"><b>Gross Weight: </b>' + (pGrossWeightSum + ' KG') + '</div>';
                    if (
                        !(pOperationHeader.TransportType == OceanTransportType && pOperationHeader.DirectionType == constExportDirectionType && pOperationHeader.ShipmentType == constFCLShipmentType)
                    ) {
                        if (pOperationHeader.TransportType == AirTransportType)
                            ReportHTML += '             <div class="col-xs-6"><b>ChargeableWeight: </b>' + pOperationHeader.ChargeableWeightSum + ' KGM' + '</div>';
                        if (pOperationHeader.ShipmentType == constLCLShipmentType || pOperationHeader.ShipmentType == constLTLShipmentType)
                            ReportHTML += '             <div class="col-xs-6"><b>Volume: </b>' + pCBM + ' CBM</div>';
                    }
                    if (pOperationHeader.TransportType == OceanTransportType && pOperationHeader.DirectionType == constExportDirectionType)
                        ReportHTML += '         <div class="col-xs-6"><b>Form 13 : </b>' + (pOperationHeader.Form13Number == 0 ? (pMasterOperationHeader == null || pMasterOperationHeader.Form13Number == 0 ? "N/A" : pMasterOperationHeader.Form13Number) : pOperationHeader.Form13Number) + '</div>';
                    if ($("#cbLargeInvoice").prop("checked")) {
                        ReportHTML += '         <div class="m-l" style="clear:both;"><h3><br><br><br>Please, see attachment.</h3></div>';
                        ReportHTML += '         <div class="break"></div>';
                    }
                    ReportHTML += '                     <div class="col-xs-12 clear">';
                    ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    ReportHTML += '                                     <th>Description</th>';
                    ReportHTML += '                                     <th>Qty</th>';
                    ReportHTML += '                                     <th>Unit Price</th>';
                    ReportHTML += '                                     <th>WHT</th>';
                    ReportHTML += '                                     <th>VAT</th>';
                    ReportHTML += '                                     <th>Total</th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    var _TotalTaxOnItems = 0;
                    var _TotalDiscountOnItems = 0;
                    $.each(JSON.parse(data[2]), function (i, item) {
                        _TotalTaxOnItems += item.TaxAmount;
                        _TotalDiscountOnItems += item.DiscountAmount;
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td style="text-align:left;">' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 && item.ChargeTypeLocalName != undefined ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes.replace(/\n/g, "<br/>")) : "") + '</td>';
                        ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                        ReportHTML += '                                         <td>' + item.SalePrice.toFixed(2) + '</td>';
                        ReportHTML += '                                         <td>' + item.DiscountAmount.toFixed(2) + '</td>';
                        ReportHTML += '                                         <td>' + item.TaxAmount.toFixed(2) + '</td>';
                        ReportHTML += '                                         <td>' + item.SaleAmount.toFixed(2) + '</td>';
                        //ReportHTML += '                                         <td>' + (item.Notes == "0" ? "" : item.Notes) + '</td>';
                        ReportHTML += '                                     </tr>';
                    });
                    if (pInvoiceHeader.FixedDiscount > 0) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td style="text-align:left;">' + 'Special Discount' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td colspan=4>' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2) + '</td>';
                        //ReportHTML += '                                         <td>' + _TotalTaxOnItems + '</td>';
                        //ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                     </tr>';
                    }
                    //ReportHTML += '                                         <tr>';
                    //ReportHTML += '                                             <td colspan=2>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                             <td><b>' + pInvoiceHeader.Amount + '</b></td>';
                    //ReportHTML += '                                             <td>' + pInvoiceHeader.CurrencyCode + '</td>';
                    //ReportHTML += '                                         </tr>';
                    //$("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")

                    //ReportHTML += '                                         <tr>';
                    //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                             <td><b>Total Amount : ' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                         </tr>';
                    ReportHTML += '                             </tbody>';
                    ReportHTML += '                         </table>';
                    ReportHTML += '                     </div>'

                    ReportHTML += '                         <div class="row"></div>';

                    ReportHTML += '                         <div class="col-xs-8 m-t">';
                    if ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + '</br>';
                        ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                        ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                        ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                        ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                        ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                    }
                    else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + '</br>';
                        ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                    }
                    else
                        ReportHTML += '                             <br>';
                    ReportHTML += '                         </div>';
                    ReportHTML += '                         <div class="col-xs-4 text-right m-t-n">';
                    if (_TotalTaxOnItems != 0 || _TotalDiscountOnItems != 0) {
                        ReportHTML += '                             <b>Subtotal: </b>' + pInvoiceHeader.CurrencyCode + ' ' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                        //ReportHTML += '                             <b>VAT: </b>' + (_TotalTaxOnItems - _TotalDiscountOnItems).toFixed(2) + '</br>';
                        if (_TotalTaxOnItems != 0)
                            ReportHTML += '                             <b>VAT: </b>' + (_TotalTaxOnItems).toFixed(2) + '</br>';
                        if (_TotalDiscountOnItems != 0)
                            ReportHTML += '                             <b>WHT: </b>' + (_TotalDiscountOnItems).toFixed(2) + '</br>';
                    }
                    ReportHTML += '                             <b>Total: </b>' + pInvoiceHeader.CurrencyCode + ' <b>' + parseFloat(pInvoiceHeader.Amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></br>';
                    ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(parseFloat(pInvoiceHeader.Amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")) + ' ' + pInvoiceHeader.CurrencyCode + '</br>';
                    if ($("#cbPrintUSDTotal").prop("checked") && pInvoiceHeader.CurrencyCode.trim() == "EGP")
                        ReportHTML += '                             <b>USD Total: </b>' + ' <b>' + (pInvoiceHeader.Amount / $("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")).replace(/\B(?=(\d{3})+(?!\d))/g, ",").toFixed(2) + '</b></br>';
                    ReportHTML += '                         </div>';

                    //ReportHTML += '                     </div>'; //of table-responsive
                    //ReportHTML += '                 </section>';
                    //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                    ReportHTML += '             </div>';
                    ReportHTML += '         </body>';

                    //ReportHTML += '                 <div class="col-xs-12 m-t m-l" style="clear:both;"><b>Invoice considered paid if a stamped receipt issued</b></div>';
                    ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftPosition != 0 ? pDefaultsRow.InvoiceLeftPosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddlePosition != 0 ? pDefaultsRow.InvoiceMiddlePosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightPosition != 0 ? pDefaultsRow.InvoiceRightPosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                 </div>'
                    ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftSignature != 0 ? pDefaultsRow.InvoiceLeftSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddleSignature != 0 ? pDefaultsRow.InvoiceMiddleSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightSignature != 0 ? pDefaultsRow.InvoiceRightSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                 </div>';
                    if ($("#cbPrintStamp").prop("checked") && pInvoiceTypeCode != "DRAFT") {
                        ReportHTML += '         <div class="text-left m-l-lg"><img src="/Content/Images/CompanyStamp.jpg" alt="stamp"/></div>';
                    }
                    //ReportHTML += '                     <div class="col-xs-12 m-t-lg text-center"><b>' + '   الشركة لا تخضع لنظام الخصم تطبيقا لأحكام المادة رفم 59 من القانون 91 لسنة 2005 حيث يتم تطبيق نظام الدفعات المقدمة طبقا لأحكام المادة 62   ' + '</b></div>';
                    ReportHTML += '     <footer class="footer col-xs-12 m-t-lg" style="width:100%; position:absolute; bottom:0;">';
                    //ReportHTML += '         <div class="row text-right m-r m-t">' + '  يتنبه نحو عدم الخصم من تحت حساب الضريبة حيث أن الشركة تتبع نظام الدفعات المقدمة تطبيقا لأحكام لمادة (62) من القانون رقم 91 لسنة 2005  ' + '</div>';
                    if ($("#cbPrintFooterInvoice").prop("checked")) {
                        ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter' + (pInvoiceHeader.InvoiceTypeName == "DN" ? "-Debit" : "") + '.jpg" alt="footer"/></div>';
                    }
                    else
                        ReportHTML += '         &emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>';
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                    if (1==1) {
                        pFinalReportHTML += ReportHTML;
                        Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                    }
                    else {
                        pFinalReportHTML += ReportHTML;
                        pFinalReportHTML += ' <div class="break"></div>';
                    }
                } //else if (pDefaults.UnEditableCompanyName == "SEF-Del")
                else if (pDefaults.UnEditableCompanyName == "MEL"
                    || pDefaults.UnEditableCompanyName == "GBL"
                    || pDefaults.IsTaxOnItems) {
                    debugger;

                    var ReportHTML = '';
                    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                    //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    //if (pDefaults.UnEditableCompanyName == "MEL")
                    //    ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  'CompanyHeader' + (pInvoiceHeader.InvoiceTypeName == "DN" ? "-Debit" : "-Invoice") + '.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                    //else
                    ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';

                    //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + pInvoiceHeader.ConcatenatedInvoiceNumber + ')' + '</h3></div>';
                    if (pDefaults.UnEditableCompanyName == "MEL" && (pInvoiceHeader.InvoiceTypeName == "SW" || pInvoiceHeader.InvoiceTypeName == "AA")) //Dont print for Safena
                        ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + 'Invoice' + '</h3></div>';
                    else if (pDefaults.UnEditableCompanyName == "MEL" && (pInvoiceHeader.InvoiceTypeName == "DN" || pInvoiceHeader.InvoiceTypeName == "DAA")) //Dont print for Safena
                        ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + '  متحصلات لحساب الغير  ' + '<br>' + 'Debit Note' + '</h3></div>';
                    else if (pDefaults.UnEditableCompanyName == "ALF")
                        ReportHTML += '                 <div class="col-xs-12 text-center"><h3>' + ' ' + pInvoiceHeader.InvoiceNumber + " / " + pInvoiceHeader.InvoiceTypeName + ' ' + '&emsp;&emsp;' + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + ' ' + $("#slInvoiceOriginal").val() + '</h3></div>';
                    else if (pDefaults.UnEditableCompanyName == "GBL")
                        //ReportHTML += '                 <div class="col-xs-12 text-center m-t-lg"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + ' ' + (pInvoiceHeader.IsApproved ? $("#slInvoiceOriginal").val() : " (Draft) ") + '</h3></div>';
                        ReportHTML += '                 <div class="col-xs-12 text-center m-t-lg"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + ' '
                            + (!pInvoiceHeader.IsApproved
                                ? "(Draft)"
                                : (pInvoiceHeader.IsApproved && pInvoiceHeader.IsPrintOriginal
                                    ? "(Original)"
                                    : (pInvoiceHeader.IsApproved && !pInvoiceHeader.IsPrintOriginal && $("#slInvoiceOriginal").val() == ""
                                        ? "(Copy)"
                                        : $("#slInvoiceOriginal").val())
                                )
                            )
                            + '</h3></div>';
                    else if (pDefaults.UnEditableCompanyName == "NEW" && pInvoiceHeader.InvoiceTypeCode == "STATMEN-SH")
                        ReportHTML += '                 <div class="col-xs-12 text-center"><h3>' + pInvoiceHeader.InvoiceTypeName + '</h3></div>';
                    else if (pDefaults.UnEditableCompanyName == "NEW" && pInvoiceHeader.InvoiceTypeCode == "INV.REC")
                        ReportHTML += '                 <div class="col-xs-12 text-center"><h3>' + ' No. ' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + ' ' + $("#slInvoiceOriginal").val() + '</h3></div>';
                    else
                        ReportHTML += '                 <div class="col-xs-12 text-center"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + ' ' + $("#slInvoiceOriginal").val() + '</h3></div>';
                    //if (!(pDefaults.UnEditableCompanyName == "MEL" && pInvoiceHeader.InvoiceTypeName == "SW")) //Dont print for Safena
                    //    ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + '</h3></div>';
                    //else { //i.e. (pDefaults.UnEditableCompanyName == "SAF" && pInvoiceTypeCode == "DRAFT") {
                    //    ReportHTML += '             <div style="position:absolute;left:50px;top:170px;">';
                    //    ReportHTML += '             <img src="/Content/Images/DraftWaterMark.jpg" alt="logo" width=612px; height=200px;></div>';
                    //}
                    ////ReportHTML += '             <div style="clear:both;"><br></div>';
                    //ReportHTML += '         <div class="col-xs-1 m-l-n-md"><img src="/Content/Images/' + 'InvoiceSideStatement.jpg' + '" alt="logo"/></div>';

                    ReportHTML += '         <div class="col-xs-12 m-t">';

                    ReportHTML += '             <div class="col-xs-8">';
                    if (pDefaults.UnEditableCompanyName == "ELC")
                        ReportHTML += '                 <b>Client: </b>' + pOperationHeader.ClientName + "<br>";
                    ReportHTML += '                 <b>Bill to: </b>' + pInvoiceHeader.PartnerName;
                    if (pDefaults.UnEditableCompanyName == "GBL") {
                        ReportHTML += '                 <br><b>Address: </b>' + (pClientHeader.Address == 0 ? "" : pClientHeader.Address.replace(/\n/g, "<br/>"));
                    }
                    else {
                        ReportHTML += '                 <br><b>Address: </b>' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                        ReportHTML += '                     ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2));
                        ReportHTML += '                     ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                        ReportHTML += '                     ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                    }
                    ReportHTML += '             </div>';
                    ReportHTML += '             <div class="col-xs-4">';
                    if (pInvoiceTypeCode == "SOA" && pInvoiceHeader.RelatedToInvoiceID != 0)
                        ReportHTML += '             <b>Related To: </b>' + pInvoiceHeader.RelatedToInvoiceTypeName + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(8, 2) + "#" + pInvoiceHeader.RelatedToInvoiceNumber.toString().padStart(5, 0) + '<br>';
                    else if (pDefaults.UnEditableCompanyName == "MEL")
                        ReportHTML += '             <b>Billing Number: </b>' + pInvoiceHeader.InvoiceTypeName /*+ ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(8, 2) + "#"*/ + ' ' + pInvoiceHeader.InvoiceNumber + '<br>';
                    ReportHTML += '                 <b>Billing Date: </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '<br>';
                    if (!(pDefaults.UnEditableCompanyName == "NEW" && (pInvoiceHeader.InvoiceTypeCode == "STATMEN-SH" || pInvoiceHeader.InvoiceTypeCode == "INV.REC")))
                        ReportHTML += '                 <b>Billing Due Date: </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '<br>';
                    if (pDefaults.UnEditableCompanyName == "ELC" && pTruckingOrders.length > 0)
                        ReportHTML += '                 <b>Issue Date: </b>' + pTruckingOrders[0].StuffingDate + '<br>';
                    else if (!(pDefaults.UnEditableCompanyName == "GBL" && pOperationHeader.MoveTypeName == "WAREHOUSING")
                        && !(pDefaults.UnEditableCompanyName == "NEW" && (pInvoiceHeader.InvoiceTypeCode == "STATMEN-SH" || pInvoiceHeader.InvoiceTypeCode == "INV.REC"))
                        && pDefaults.UnEditableCompanyName != "SEF"
                    )
                        ReportHTML += '                 <b>' + (pDefaults.UnEditableCompanyName == "LOG" ? 'Delivery Date:' : 'Sailing Date:') + ' </b>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.ExpectedDeparture)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.ExpectedDeparture)));
                    ReportHTML += '             </div>';
                    //if (pInvoiceTypeCode == "DRAFT") {
                    //    ReportHTML += '             <div style="position:absolute;left:50px;top:250px;">';
                    //    ReportHTML += '             <img src="/Content/Images/DraftWaterMark.jpg" alt="logo" width=612px; height=200px;></div>';
                    //}

                    ReportHTML += '                 <div class="col-xs-12 clear"><hr style="border:solid #000 1px;" /></div>';
                    if (pInvoiceHeader.InvoiceTypeCode == "CREDITMEMO" && pDefaults.UnEditableCompanyName == "GBL")
                        ReportHTML += '             <div class="col-xs-12" style="clear:both;"><b>Cancelled Invoice: </b>' + (pInvoiceHeader.Notes == 0 ? "" : pInvoiceHeader.Notes) + '</div>';

                    ReportHTML += '         <div class="col-xs-6"><b>Operation: </b>' + (pOperationHeader.Code == 0 ? pOperationHeader.MasterOperationCode : pOperationHeader.Code) + (pDefaults.UnEditableCompanyName == "NEW" ? (" / " + pInvoiceHeader.BranchName) : "") + '</div>';
                    if ($("#cbPrintMBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU")
                        ReportHTML += '             <div class="col-xs-6"><b>' + (pDefaults.UnEditableCompanyName == "LOG" ? "Dossier: " : (pOperationHeader.TransportType != AirTransportType ? 'MB/L: ' : 'MAWB: ')) + '</b>' + (pDefaults.UnEditableCompanyName == "NEW" && (pInvoiceHeader.InvoiceTypeCode == "STATMEN-SH" || pInvoiceHeader.InvoiceTypeCode == "INV.REC") ? (pInvoiceHeader.MiddleSignature == 0 ? "" : pInvoiceHeader.MiddleSignature) : pMasterBL) + '</div>';

                    if ($("#cbPrintHBL").prop("checked") && pDefaults.UnEditableCompanyName != "NEW") {
                        if (pHouseBLs != "0")//Master Operation so show all houses on it
                            ReportHTML += '             <div class="col-xs-6"><b>' + (pOperationHeader.TransportType == AirTransportType ? "HAWB" : 'HBL') + '</b>: ' + pHouseBLs + '</div>';
                        else if (pHouseNumber != "0")
                            ReportHTML += '             <div class="col-xs-6"><b>' + (pOperationHeader.TransportType == AirTransportType ? "HAWB" : 'HB/L No.:') + '</b> ' + (pHouseNumber == "" ? "N/A" : pHouseNumber) + '</div>';
                    }
                    if (pOperationHeader.CertificateNumber != "N/A"
                        && !(pDefaults.UnEditableCompanyName == "GBL" && pOperationHeader.MoveTypeName == "WAREHOUSING")
                        && !(pDefaults.UnEditableCompanyName == "NEW" && (pInvoiceHeader.InvoiceTypeCode == "STATMEN-SH" || pInvoiceHeader.InvoiceTypeCode == "INV.REC"))
                    )
                        ReportHTML += '         <div class="col-xs-6"><b>Certificate Number: </b>' + (pOperationHeader.CertificateNumber == 0 ? "" : pOperationHeader.CertificateNumber) + '</div>';
                    if (!(pDefaults.UnEditableCompanyName == "GBL" && pOperationHeader.MoveTypeName == "WAREHOUSING")) {
                        if (!(pDefaults.UnEditableCompanyName == "NEW" && pInvoiceHeader.InvoiceTypeCode == "STATMEN-SH"))
                            ReportHTML += '         <div class="col-xs-6"><b>POL: </b>' + (pPOLName == 0 ? "" : pPOLName) + '</div>';
                        ReportHTML += '         <div class="col-xs-6"><b>POD: </b>' + (pPODName == 0 ? "" : pPODName) + '</div>';
                    }
                    if (pDefaults.UnEditableCompanyName == "CAP")
                        ReportHTML += '         <div class="col-xs-6"><b>Consignee: </b>' + (pInvoiceHeader.LeftSignature == 0 ? "" : pInvoiceHeader.LeftSignature) + '</div>';
                    //ReportHTML += '         <div class="col-xs-6"><b>Consignee: </b>' + (pOperationHeader.ConsigneeName == 0 ? "" : pOperationHeader.ConsigneeName) + '</div>';
                    if (pOperationHeader.CustomerReference != 0)
                        ReportHTML += '         <div class="col-xs-6"><b>' + "Customer Ref:" + ' </b>' + (pOperationHeader.CustomerReference == 0 ? "" : pOperationHeader.CustomerReference) + '</div>';
                    if (pDefaults.UnEditableCompanyName == "DGL")
                        ReportHTML += '         <div class="col-xs-6"><b>' + "Supplier Ref:" + ' </b>' + (pOperationHeader.SupplierReference == 0 ? "" : pOperationHeader.SupplierReference) + '</div>';
                    if (pDefaults.UnEditableCompanyName == "SWI")
                        ReportHTML += '         <div class="col-xs-6"><b>' + "PO Number: " + ' </b>' + (pOperationHeader.PONumber == 0 ? "" : pOperationHeader.PONumber) + '</div>';
                    if (pDefaults.UnEditableCompanyName == "CAP")
                        ReportHTML += '         <div class="col-xs-6"><b>Booking No: </b>' + (pOperationHeader.BookingNumbers == 0 ? "" : pOperationHeader.BookingNumbers) + '</div>';
                    if (pDefaults.UnEditableCompanyName == "CAP")
                        ReportHTML += '         <div class="col-xs-6"><b>Ref#: </b>' + (pOperationHeader.DispatchNumber == 0 ? "" : pOperationHeader.DispatchNumber) + '</div>';
                    if (pDefaults.UnEditableCompanyName == "MEL")
                        ReportHTML += '         <div class="col-xs-6"><b>Dispatch#: </b>' + (pOperationHeader.DispatchNumber == 0 ? "" : pOperationHeader.DispatchNumber) + '</div>';
                    if (pDefaults.UnEditableCompanyName == "CAP" && pInvoiceTypeCode == "SOA" && pInvoiceHeader.RelatedToInvoiceID != 0)
                        ReportHTML += '             <b>Related To: </b>' + pInvoiceHeader.RelatedToInvoiceTypeName + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(8, 2) + "#" + pInvoiceHeader.RelatedToInvoiceNumber.toString().padStart(5, 0) + '<br>';

                    if (pInvoiceItem.length > 0 && pDefaults.UnEditableCompanyName == "GBL")
                        if (pInvoiceItem[0].TruckingOrderID != 0) {
                            ReportHTML += '         <div class="col-xs-6"><b>Loading Zone: </b>' + (pInvoiceItem[0].LoadingZoneName == 0 ? "N/A" : pInvoiceItem[0].LoadingZoneName) + '</div>';
                            ReportHTML += '         <div class="col-xs-6"><b>First Curing Zone: </b>' + (pInvoiceItem[0].FirstCuringAreaName == 0 ? "" : pInvoiceItem[0].FirstCuringAreaName) + '</div>';
                            ReportHTML += '         <div class="col-xs-6"><b>Second Curing Zone: </b>' + (pInvoiceItem[0].SecondCuringAreaName == 0 ? "" : pInvoiceItem[0].SecondCuringAreaName) + '</div>';
                            ReportHTML += '         <div class="col-xs-6"><b>Third Curing Zone: </b>' + (pInvoiceItem[0].ThirdCuringAreaName == 0 ? "" : pInvoiceItem[0].ThirdCuringAreaName) + '</div>';
                        }
                    if (pDefaults.UnEditableCompanyName == "GBL") {
                        ReportHTML += '         <div class="col-xs-6"><b>Business Unit: </b>' + (pOperationHeader.BusinessUnit == 0 ? "N/A" : pOperationHeader.BusinessUnit) + '</div>';
                    }
                    if (!(pDefaults.UnEditableCompanyName == "GBL" && pOperationHeader.MoveTypeName == "WAREHOUSING")
                        && !(pDefaults.UnEditableCompanyName == "NEW" && (pInvoiceHeader.InvoiceTypeCode == "STATMEN-SH" || pInvoiceHeader.InvoiceTypeCode == "INV.REC")))
                        ReportHTML += '         <div class="col-xs-6"><b>Line: </b>' + ((pDefaults.UnEditableCompanyName == "CAP") ? (pOperationHeader.ShippingLineName == 0 ? "" : pOperationHeader.ShippingLineName) : (pOperationHeader.LineName == 0 ? "" : pOperationHeader.LineName)) + '</div>';
                    if ((pOperationHeader.TransportType == OceanTransportType || pDefaults.UnEditableCompanyName == "ELC")
                        && !(pDefaults.UnEditableCompanyName == "NEW" && (pInvoiceHeader.InvoiceTypeCode == "STATMEN-SH" || pInvoiceHeader.InvoiceTypeCode == "INV.REC"))
                    ) {
                        //ReportHTML += '         <div class="col-xs-6"><b>Container No.s: </b>' + (pOperationHeader.ContainerNumbers == 0 ? "" : pOperationHeader.ContainerNumbers) + '</div>';
                        ReportHTML += '         <div class="col-xs-6"><b>Cont.Types: </b>' + (pOperationHeader.ContainerTypes == 0 ? "" : pOperationHeader.ContainerTypes) + '</div>';
                        if (pDefaults.UnEditableCompanyName == "MEL")
                            ReportHTML += '         <div class="col-xs-6"><b>Cont.Nos: </b>' + (pOperationHeader.ContainerNumbers == 0 ? "" : pOperationHeader.ContainerNumbers) + '</div>';
                        if (pDefaults.UnEditableCompanyName != "SEF")
                            ReportHTML += '         <div class="col-xs-6"><b>Vessel-Voy: </b>' + (pOperationHeader.VesselName == 0 ? "" : pOperationHeader.VesselName) + (pOperationHeader.VoyageOrTruckNumber == 0 ? "" : (" - " + pOperationHeader.VoyageOrTruckNumber)) + '</div>';
                    }
                    if (pDefaults.UnEditableCompanyName == "NEW") {
                        if (pInvoiceHeader.InvoiceTypeCode == 'INV.REC') {
                            ReportHTML += '             <div class="col-xs-6"><b>Cargo Type: </b>' + (pInvoiceHeader.LeftSignature == 0 ? "" : pInvoiceHeader.LeftSignature) + '</div>';
                            ReportHTML += '         <div class="col-xs-6"><b>Vessel-Voy: </b>' + (pOperationHeader.VesselName == 0 ? "" : pOperationHeader.VesselName) + (pOperationHeader.VoyageOrTruckNumber == 0 ? "" : (" - " + pOperationHeader.VoyageOrTruckNumber)) + '</div>';
                        }
                        ReportHTML += '         <div class="col-xs-6"><b>Voy.Date: </b>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.ExpectedArrival)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.ExpectedArrival))) + '</div>';
                    }
                    // next condition to add any new required fields to all except old TaxOnItemsCompanies
                    if (pDefaults.UnEditableCompanyName != "GBL"
                        && pDefaults.UnEditableCompanyName != "SAF"
                        && pDefaults.UnEditableCompanyName != "MEL") {
                        if (!(pDefaults.UnEditableCompanyName == "NEW" && pInvoiceHeader.InvoiceTypeCode == "STATMEN-SH"))
                            ReportHTML += '             <div class="col-xs-6"><b>Com. Reg. No.: </b>' + (pDefaults.CommericalRegNo == 0 ? "" : pDefaults.CommericalRegNo) + '</div>';
                        if (pDefaults.UnEditableCompanyName != "NEW" && pDefaults.UnEditableCompanyName != "SEF")
                            ReportHTML += '             <div class="col-xs-6"><b>Service: </b>' + (pOperationHeader.MoveTypeName == 0 ? "" : pOperationHeader.MoveTypeName) + '</div>';
                        if (!(pDefaults.UnEditableCompanyName == "NEW" && pInvoiceHeader.InvoiceTypeCode == "STATMEN-SH"))
                            ReportHTML += '             <div class="col-xs-6"><b>Weight: </b>' + (pDefaults.UnEditableCompanyName == "NEW" && pInvoiceHeader.InvoiceTypeCode == "INV.REC" ? (pInvoiceHeader.RightSignature == 0 ? "" : pInvoiceHeader.RightSignature) : (pGrossWeightSum + ' KG')) + '</div>';
                        if (pOperationHeader.TransportType == AirTransportType)
                            ReportHTML += '             <div class="col-xs-6"><b>ChargeableWeight: </b>' + pOperationHeader.ChargeableWeightSum + ' KGM' + '</div>';
                        if (pDefaults.UnEditableCompanyName == "ELC" && pTruckingOrders.length > 0)
                            ReportHTML += '             <div class="col-xs-6"><b>Tr.Order Cert.No.: </b>' + (pTruckingOrders[0].Delays == 0 ? "" : pTruckingOrders[0].Delays) + '</div>';
                        if (pDefaults.UnEditableCompanyName == "LOG" || pOperationHeader.TransportType == AirTransportType)
                            ReportHTML += '             <div class="col-xs-6"><b>No of packages: </b>' + (pOperationHeader.NumberOfPackages + 'x' + pOperationHeader.PackageTypeName) + '</div>';
                        if (pOperationHeader.TransportType == AirTransportType || pOperationHeader.ShipmentType == constLCLShipmentType || pOperationHeader.ShipmentType == constLTLShipmentType)
                            ReportHTML += '             <div class="col-xs-6"><b>Volume: </b>' + pCBM + ' CBM</div>';
                        if (pDefaults.UnEditableCompanyName == "ALF" || pDefaults.UnEditableCompanyName == "DGL") {
                            ReportHTML += '             <div class="col-xs-6"><b>Shipper: </b>' + (pOperationHeader.ShipperName == 0 ? "" : pOperationHeader.ShipperName) + '</div>';
                            ReportHTML += '             <div class="col-xs-6"><b>Consignee: </b>' + (pOperationHeader.ConsigneeName == 0 ? "" : pOperationHeader.ConsigneeName) + '</div>';
                        }
                        if (pDefaults.UnEditableCompanyName == "ALF") {
                            ReportHTML += '             <div class="col-xs-6"><b>Packages: </b>' + (pOperationHeader.NumberOfPackages + 'x' + pOperationHeader.PackageTypeName) + '</div>';
                            ReportHTML += '         <div class="col-xs-6"><b>ETA POD: </b>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.ExpectedArrival)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.ExpectedArrival))) + '</div>';
                            if (pInvoiceHeader.InvoiceTypeName == "HALLIBURTON") {
                                ReportHTML += '             <div class="col-xs-6"><b>COM INVOICE: </b>' + (pInvoiceHeader.LeftSignature == 0 ? "" : pInvoiceHeader.LeftSignature) + '</div>';
                                ReportHTML += '             <div class="col-xs-6"><b>FC#: </b>' + (pInvoiceHeader.MiddleSignature == 0 ? "" : pInvoiceHeader.MiddleSignature) + '</div>';
                            }
                        }
                        if (!(pDefaults.UnEditableCompanyName == "NEW" && pInvoiceHeader.InvoiceTypeCode == "STATMEN-SH"))
                            ReportHTML += '             <div class="col-xs-6"><b>VAT ID No.: </b>' + (pDefaults.VatIDNo == 0 ? "" : pDefaults.VatIDNo) + '</div>';
                    }
                    if (pDefaults.UnEditableCompanyName == "DGL" && pMasterBL == "")
                        ReportHTML += '             <div class="col-xs-6"><b>Courier: </b>' + (pMainRoute.Notes == 0 ? "" : pMainRoute.Notes) + '</div>';
                    if (pDefaults.UnEditableCompanyName == "LOG")
                        ReportHTML += '             <div class="col-xs-6"><b>Contact Person: </b>' + (pOperationPartner == null ? "" : (pOperationPartner.ContactName == 0 ? "" : pOperationPartner.ContactName)) + '</div>';
                    if (pDefaults.UnEditableCompanyName == "SWI") {
                        ReportHTML += '         <div class="col-xs-6"><b>ATA: </b>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.ActualDeparture)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.ActualDeparture))) + '</div>';
                        ReportHTML += '         <div class="col-xs-6"><b>ATD: </b>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.ActualArrival)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.ActualArrival))) + '</div>';
                    }
                    if (pDefaults.UnEditableCompanyName == "MEL")
                        ReportHTML += '             <div class="col-xs-6"><b>Notes: </b>' + (pInvoiceHeader.MiddleSignature == 0 ? "" : pInvoiceHeader.MiddleSignature) + '</div>';
                    if (pDefaults.UnEditableCompanyName == "ELC" || pDefaults.UnEditableCompanyName == "SAF" || pDefaults.UnEditableCompanyName == "SWI" || pDefaults.UnEditableCompanyName == "DGL")
                        ReportHTML += '             <div class="col-xs-6"><b>Notes: </b>' + (pInvoiceHeader.EditableNotes == 0 ? "" : pInvoiceHeader.EditableNotes) + '</div>';
                    if ($("#cbLargeInvoice").prop("checked")) {
                        ReportHTML += '         <div class="m-l" style="clear:both;"><h3><br><br><br>Please, see attachment.</h3></div>';
                        ReportHTML += '         <div class="break"></div>';
                    }
                    ReportHTML += '                     <div class="col-xs-12 clear">';
                    ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    if (pDefaults.UnEditableCompanyName == "SAF" || pDefaults.UnEditableCompanyName == "MEL" || pDefaults.UnEditableCompanyName == "GBL")
                        ReportHTML += '                                     <th>Item</th>';
                    ReportHTML += '                                     <th>Description</th>';
                    if (pDefaults.UnEditableCompanyName == "CAP")
                        ReportHTML += '                                     <th>Container#</th>';
                    ReportHTML += '                                     <th>Qty</th>';
                    ReportHTML += '                                     <th>Unit Price</th>';
                    if (pDefaults.UnEditableCompanyName == "GBL")
                        ReportHTML += '                                     <th>SubTotal</th>';
                    else
                        ReportHTML += '                                     <th>WHT</th>';
                    ReportHTML += '                                     <th>VAT</th>';
                    ReportHTML += '                                     <th>Total</th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    var _TotalTaxOnItems = 0;
                    var _TotalDiscountOnItems = 0;
                    $.each(JSON.parse(data[2]), function (i, item) {
                        _TotalTaxOnItems += item.TaxAmount;
                        _TotalDiscountOnItems += item.DiscountAmount;
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        if (pDefaults.UnEditableCompanyName == "SAF" || pDefaults.UnEditableCompanyName == "MEL" || pDefaults.UnEditableCompanyName == "GBL")
                            ReportHTML += '                                         <td>' + (i + 1) + '</td>';
                        ReportHTML += '                                         <td style="text-align:left;">' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 && item.ChargeTypeLocalName != undefined ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes.replace(/\n/g, "<br/>")) : "") + '</td>';
                        if (pDefaults.UnEditableCompanyName == "CAP" && i == 0)
                            ReportHTML += '                                         <td rowspan=' + pInvoiceItem.length + '>' + pOperationHeader.ContainerNumbers.replace(/\-/g, "<br/>")/*(item.ContainerNumber == 0 ? "" : item.ContainerNumber)*/ + '</td>';
                        ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                        ReportHTML += '                                         <td>' + item.SalePrice.toFixed(2) + '</td>';
                        if (pDefaults.UnEditableCompanyName == "GBL")
                            ReportHTML += '                                         <td>' + item.AmountWithoutVAT.toFixed(2) + '</td>';
                        else
                            ReportHTML += '                                         <td>' + item.DiscountAmount.toFixed(2) + '</td>';
                        ReportHTML += '                                         <td>' + item.TaxAmount.toFixed(2) + '</td>';
                        ReportHTML += '                                         <td>' + item.SaleAmount.toFixed(2) + '</td>';
                        //ReportHTML += '                                         <td>' + (item.Notes == "0" ? "" : item.Notes) + '</td>';
                        ReportHTML += '                                     </tr>';
                    });
                    if (pInvoiceHeader.FixedDiscount > 0) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td style="text-align:left;">' + 'Special Discount' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td colspan=4>' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2) + '</td>';
                        //ReportHTML += '                                         <td>' + _TotalTaxOnItems + '</td>';
                        //ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                     </tr>';
                    }
                    //ReportHTML += '                                         <tr>';
                    //ReportHTML += '                                             <td colspan=2>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                             <td><b>' + pInvoiceHeader.Amount + '</b></td>';
                    //ReportHTML += '                                             <td>' + pInvoiceHeader.CurrencyCode + '</td>';
                    //ReportHTML += '                                         </tr>';
                    //$("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")

                    //ReportHTML += '                                         <tr>';
                    //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                             <td><b>Total Amount : ' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                         </tr>';
                    ReportHTML += '                             </tbody>';
                    ReportHTML += '                         </table>';
                    ReportHTML += '                     </div>'

                    ReportHTML += '                         <div class="row"></div>';

                    ReportHTML += '                         <div class="col-xs-8 m-t">';
                    if (pDefaults.UnEditableCompanyName == "GBL") {
                        ReportHTML += "&emsp;";
                    }
                    else if ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + '</br>';
                        ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                        ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                        ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                        ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                        ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                    }
                    else if ($("#cbPrintBankDetailsFromTemplate").prop("checked") && pDefaults.UnEditableCompanyName != "DGL") {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + '</br>';
                        ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                    }
                    else
                        ReportHTML += '                             <br>';
                    ReportHTML += '                         </div>';
                    ReportHTML += '                         <div class="col-xs-4 text-right m-t-n">';
                    if (_TotalTaxOnItems != 0 || _TotalDiscountOnItems != 0) {
                        ReportHTML += '                             <b>Subtotal: </b>' + pInvoiceHeader.CurrencyCode + ' ' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                        //ReportHTML += '                             <b>VAT: </b>' + (_TotalTaxOnItems - _TotalDiscountOnItems).toFixed(2) + '</br>';
                        if (_TotalTaxOnItems != 0)
                            ReportHTML += '                             <b>VAT: </b>' + (_TotalTaxOnItems).toFixed(2) + '</br>';
                        if (_TotalDiscountOnItems != 0)
                            ReportHTML += '                             <b>WHT: </b>' + (_TotalDiscountOnItems).toFixed(2) + '</br>';
                    }
                    ReportHTML += '                             <b>Total: </b>' + pInvoiceHeader.CurrencyCode + ' <b>' + parseFloat(pInvoiceHeader.Amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></br>';
                    ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(parseFloat(pInvoiceHeader.Amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")) + ' ' + pInvoiceHeader.CurrencyCode + '</br>';
                    if ($("#cbPrintUSDTotal").prop("checked") && pInvoiceHeader.CurrencyCode.trim() == "EGP")
                        ReportHTML += '                             <b>USD Total: </b>' + ' <b>' + (pInvoiceHeader.Amount / $("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")).replace(/\B(?=(\d{3})+(?!\d))/g, ",").toFixed(2) + '</b></br>';
                    ReportHTML += '                         </div>';

                    //ReportHTML += '                     </div>'; //of table-responsive
                    //ReportHTML += '                 </section>';
                    //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                    ReportHTML += '             </div>';
                    ReportHTML += '         </body>';

                    //ReportHTML += '                 <div class="col-xs-12 m-t m-l" style="clear:both;"><b>Invoice considered paid if a stamped receipt issued</b></div>';
                    ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftPosition != 0 ? pDefaultsRow.InvoiceLeftPosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddlePosition != 0 ? pDefaultsRow.InvoiceMiddlePosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightPosition != 0 ? pDefaultsRow.InvoiceRightPosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                 </div>'
                    ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftSignature != 0 ? pDefaultsRow.InvoiceLeftSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddleSignature != 0 ? pDefaultsRow.InvoiceMiddleSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightSignature != 0 ? pDefaultsRow.InvoiceRightSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                 </div>';
                    if ($("#cbPrintStamp").prop("checked") && pInvoiceTypeCode != "DRAFT") {
                        if (pDefaults.UnEditableCompanyName == "NEW")
                            //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                            ReportHTML += '         <div class="col-xs-4"></div><div class="col-xs-4 text-center" style="border:1px solid #000;">  الشركة لا تخضع لنظام الخصم تطبيقا لأحكام المادة  <br>  رقم59من القانون91لسنة2005حيث يتم تطبيق  <br>  نظام الدفعات المقدمة طبقا لأحكام المادة 61  </div>';
                        else
                            ReportHTML += '         <div class="text-left m-l-lg"><img src="/Content/Images/CompanyStamp.jpg" alt="stamp"/></div>';
                    }
                    if (pDefaults.UnEditableCompanyName == "ALF")
                        ReportHTML += '                     <div class="col-xs-12 text-center"><b>' + '   الشركة تخضع لنظام الدفعات المقدمة   ' + '</b></div>';
                    else if (pInvoiceHeader.InvoiceTypeName != "DN" && pDefaults.UnEditableCompanyName != "GBL"
                        && pDefaults.UnEditableCompanyName != "ACS" && pDefaults.UnEditableCompanyName != "WAV"
                        && pDefaults.UnEditableCompanyName != "MEL" && pDefaults.UnEditableCompanyName != "ALF"
                        && pDefaults.UnEditableCompanyName != "CAP" && pDefaults.UnEditableCompanyName != "SEF"
                        && !(pDefaults.UnEditableCompanyName == "NEW" && pInvoiceHeader.InvoiceTypeCode == "STATMEN-SH")) {
                        ReportHTML += '                     <div class="col-xs-12 m-t-lg text-center" style="clear:both;"><b>' + '   لا يعتد بالفاتورة إلا بعد استلام إيصال السداد   ' + '</b></div>';
                        if (pInvoiceHeader.InvoiceTypeCode == "DRAFT") //Remove Condition when make separate copy for Milmar
                            ReportHTML += '                     <div class="col-xs-12 text-center"><b>' + '   الشركة تخضع لنظام الدفعات المقدمة   ' + '</b></div>';
                    }
                    else if (pDefaults.UnEditableCompanyName == "NEW" && pInvoiceHeader.InvoiceTypeCode == "INV.REC") {
                        ReportHTML += '                     <div class="col-xs-12 m-t-lg text-center"><b>' + '   الشركة لا تخضع لنظام الخصم تطبيقا لأحكام المادة رفم 59 من القانون 91 لسنة 2005 حيث يتم تطبيق نظام الدفعات المقدمة طبقا لأحكام المادة 62   ' + '</b></div>';
                    }
                    ReportHTML += '     <footer class="footer col-xs-12 m-t-lg" style="width:100%; position:absolute; bottom:0;">';
                    if ($("#cbPrintBankDetailsFromTemplate").prop("checked") && pDefaults.UnEditableCompanyName == "DGL") {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>").replace(/\ /g, "&nbsp;");
                    }
                    if (pDefaults.UnEditableCompanyName == "GBL") {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + '</br>';
                        ReportHTML += '                             Account Name: GB LOGISTICS S A E ' + '</br>';
                        ReportHTML += '                             Bank Name: SOCIETE ARABE INTERNATIONALE DE BANQUE' + '</br>';
                        ReportHTML += '                             Account number : 0220-3010314-10010 EGP / 0205-3010314-10010 CHF / 0203-3010314-10010 EUR' + '</br>';
                        ReportHTML += '                             Account Type : CURRENT ACCOUNT' + '</br>';
                        ReportHTML += '                             Branch Name : SHOOTING CLUB' + '</br>';
                        ReportHTML += '                             Branch Address : 50 SHOOTING CLUB ST. DOKKI GIZA, Cairo, Egypt' + '</br>';
                        //ReportHTML += '                             Country : Egypt' + '</br>';
                        //ReportHTML += '                             Town/City : Cairo' + '</br>';
                        ReportHTML += '                             Swift Code : SBNKEGCXXXX' + '</br></br>';

                        ReportHTML += '                             Bank Name: Abu Dhabi Islamic Bank-Egypt ' + '</br>';
                        ReportHTML += '                             Bank Address : 54 Lebanon str., Giza, Egypt' + '</br>';
                        ReportHTML += '                             Account number : 100000603372 USD' + '</br>';
                        ReportHTML += '                             Swift Code : ABDIEGCAXXX' + '</br>';
                        ReportHTML += '                             IBAN: EG900030552400000100000603372' + '</br>';

                        //ReportHTML += '                     <br><br><div style="font-size:12px;" class="col-xs-12 text-center"><b>' + '   برجاء عدم استقطاع او خصم أي مبالغ مالية تحت حساب الضريبة حيث أن الشركة تخضع لنظام الدفعات المقدمة عن الفترة الضريبية من 1/1/2021 حتى 31/12/2021   ' + '</b></div><br><br>';
                        //ReportHTML += '                     <div style="font-size:12px;" class="col-xs-12 m-t-lg text-center"><b>' + '   شكرا لتعاونكم   ' + '</b></div>';
                    }
                    //ReportHTML += '         <div class="row text-right m-r m-t">' + '  يتنبه نحو عدم الخصم من تحت حساب الضريبة حيث أن الشركة تتبع نظام الدفعات المقدمة تطبيقا لأحكام لمادة (62) من القانون رقم 91 لسنة 2005  ' + '</div>';
                    //ReportHTML += '         <div class="row text-right m-r">' + '  يوقف صرف شيكات مصر للتأمين لحين تسوية التعويضات  ' + '</div>';
                    //ReportHTML += '         <div class="row text-right m-r">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
                    //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
                    //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                    //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
                    if ($("#cbPrintFooterInvoice").prop("checked")) {
                        if (pDefaults.UnEditableCompanyName == "ALF") {
                            ReportHTML += '                     <div class="col-xs-12 text-center"><b>' + '  رقم البطاقة الضريبي : 605     رقم الملف الضريبي : 1/2/555/70/5 عطارين ثاني    رقم تسجيل ضريبة المبيعات : 432/286/632  ' + '</b></div>';
                            ReportHTML += '                     <div class="col-xs-12 text-center"><b>' + '  (المركز الرئيسي: 1 فيكتور باسيلى– الإسكندرية  - تليفون : 4805020 – 4819264 (203) – فاكس : 4819262 (203  ' + '</b></div>';
                        }
                        else
                            ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter' + (pInvoiceHeader.InvoiceTypeName == "DN" ? "-Debit" : "") + '.jpg" alt="footer"/></div>';
                    }
                    else
                        ReportHTML += '         &emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>';
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                    if (1==1) {
                        pFinalReportHTML += ReportHTML;
                        Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                    }
                    else {
                        pFinalReportHTML += ReportHTML;
                        pFinalReportHTML += ' <div class="break"></div>';
                    }
                } //EOF if (pDefaults.UnEditableCompanyName == "MEL" || pDefaults.UnEditableCompanyName == "GBL")
                else if (pDefaults.UnEditableCompanyName == "ELI") { //else if (pDefaults.UnEditableCompanyName == "ELI")
                    var ReportHTML = '';
                    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                    //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += "     <b>";
                    ReportHTML += '         <body style="background-color:white; font-size=140%;">';
                    ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                    //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + pInvoiceHeader.ConcatenatedInvoiceNumber + ')' + '</h3></div>';
                    //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + "/" + pELIInvoicePrefix + '-' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).split("/")[1].split("/")[0] + '-' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(8, 2) + '</h3></div>';
                    //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + '</h3></div>';
                    var _InvoicePrefix = (pInvoiceHeader.InvoiceTypeName.split(' ')[0] == "INVOICE" ? "01" : "02");
                    ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + _InvoicePrefix + pad_with_zeroes(pInvoiceHeader.InvoiceNumber, 5) + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + '</h3></div>';
                    ////ReportHTML += '             <div style="clear:both;"><br></div>';
                    //ReportHTML += '         <div class="col-xs-1 m-l-n-md"><img src="/Content/Images/' + 'InvoiceSideStatement.jpg' + '" alt="logo"/></div>';
                    ReportHTML += '         <div class="col-xs-12">';

                    ReportHTML += '             <div class="col-xs-8"></div>';
                    ReportHTML += '             <div class="col-xs-4"><b>Tax No.: </b>' + (pDefaults.TaxNumber == 0 ? "" : pDefaults.TaxNumber) + '</div>';
                    ReportHTML += '             <div class="col-xs-8"></div>';
                    ReportHTML += '             <div class="col-xs-4"><b>Com. Reg. No.: </b>' + (pDefaults.CommericalRegNo == 0 ? "" : pDefaults.CommericalRegNo) + '</div>';

                    ReportHTML += '             <div class="col-xs-8"></div>';
                    ReportHTML += '             <div class="col-xs-4"><b>VAT ID No.: </b>' + (pDefaults.VatIDNo == 0 ? "" : pDefaults.VatIDNo) + '</div>';

                    ReportHTML += '             <div class="col-xs-8"><b>Bill to: </b>' + pInvoiceHeader.PartnerName + '</div>';
                    ReportHTML += '             <div class="col-xs-4"><b>Inv.Date: </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '</div>';

                    ReportHTML += '             <div class="col-xs-8"><b>Address: </b>';
                    ReportHTML += '                 ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                    ReportHTML += '                 ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2));
                    ReportHTML += '                 ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                    ReportHTML += '                 ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                    ReportHTML += '             </div>';
                    ReportHTML += '             <div class="col-xs-4"><b>Due Date: </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '</div>';

                    ReportHTML += '             <div class="col-xs-8"></div>';
                    ReportHTML += '             <div class="col-xs-4"><b>Issue Date: </b>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pInvoiceHeader.CreationDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.CreationDate))) + '</div>';
                    ReportHTML += '             <div class="col-xs-12 b-b b-dark m-t-n-xs" style="clear:both;"></div>';

                    if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                        ReportHTML += '             <div class="col-xs-6"><b>Operation: </b>' + pMasterOperationCode + '</div>';
                    else
                        ReportHTML += '             <div class="col-xs-6"><b>Operation: </b>' + (pInvoiceHeader.OperationCode == 0 ? pInvoiceHeader.MasterOperationCode : pInvoiceHeader.OperationCode) + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>OperWithInv.Ser: </b>' + (pOperationHeader.OperationWithInvoiceSerial == 0 ? "" : pOperationHeader.OperationWithInvoiceSerial) + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Currency: </b>' + pInvoiceHeader.CurrencyCode + '</div>';
                    if ($("#cbPrintMBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU")
                        ReportHTML += '             <div class="col-xs-6"><b>MB/L No.: </b>' + pMasterBL + '</div>';
                    if ($("#cbPrintHBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ) {
                        if (pHouseBLs != "0")//Master Operation so show all houses on it
                            ReportHTML += '             <div class="col-xs-6"><b>HBL</b>: ' + pHouseBLs + '</div>';
                        else
                            ReportHTML += '             <div class="col-xs-6"><b>HB/L No.:</b> ' + (pHouseNumber == "" || pHouseNumber == "0" ? "" : pHouseNumber) + '</div>';
                    }
                    ReportHTML += '             <div class="col-xs-6"><b>POL: </b>' + pPOLName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>POD: </b>' + pPODName + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Weight: </b>' + pGrossWeightSum + ' KG</div>';
                    if (pOperationHeader.TransportType == OceanTransportType) {
                        ReportHTML += '         <div class="col-xs-6"><b>Vessel: </b>' + pVesselName + '</div>';
                    }
                    //for inland shipping line is written in LeftSignature
                    if (pOperationHeader.TransportType == InlandTransportType) {
                        ReportHTML += '         <div class="col-xs-6"><b>Shipping Line: </b>' + (pInvoiceHeader.LeftSignature == 0 ? "" : pInvoiceHeader.LeftSignature) + '</div>';
                    }
                    if (pOperationHeader.TransportType != AirTransportType) {
                        ReportHTML += '         <div class="col-xs-6"><b>Arrival Date: </b>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.ActualArrival)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.ActualArrival))) + '</div>';
                        ReportHTML += '         <div class="col-xs-6"><b>Containers: </b>' + (pOperationHeader.ShipmentType == 0 || pOperationHeader.ShipmentType == 2 || pOperationHeader.ShipmentType == 4 ? "LCL" : pContainerTypes) + '</div>';
                    }
                    if (pOperationHeader.PackageTypes != 0 || pOperationHeader.PackageTypesOnContainersTotals != 0 || pOperationHeader.PlacedOnOperationContainersAndPackagesID != 0)
                        ReportHTML += '         <div class="col-xs-6"><b>Packages: </b>' + (pOperationHeader.PackageTypes == 0 ? (pOperationHeader.PackageTypesOnContainersTotals == 0 ? (pOperationHeader.PlacedOnOperationContainersAndPackagesID == 0 ? "0" : pOperationHeader.PlacedOnOperationContainersAndPackagesID) : pOperationHeader.PackageTypesOnContainersTotals) : pOperationHeader.PackageTypes) + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Shipment Category: </b>' + pShipmentTypeCode + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Shipment Term: </b>' + pIncotermName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Commodity: </b>' + (pOperationHeader.CommodityName == 0 ? "" : pOperationHeader.CommodityName) + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Shipper: </b>' + pShipperName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Consignee: </b>' + pConsigneeName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Weight: </b>' + pGrossWeightSum + ' KGM' + '</div>';

                    ReportHTML += '         <div class="col-xs-6"><b>Certificate No: </b>' + (pOperationHeader.CertificateNumber == 0 ? "" : pOperationHeader.CertificateNumber) + '</div>';
                    ReportHTML += '         <div class="col-xs-6"><b>Customer Ref: </b>' + (pOperationHeader.CustomerReference == 0 ? "" : pOperationHeader.CustomerReference) + '</div>';
                    ReportHTML += '         <div class="col-xs-6"><b>Form 13 : </b>' + (pOperationHeader.Form13Number == 0 ? "" : pOperationHeader.Form13Number) + '</div>';

                    ReportHTML += '                     <div class="col-xs-12 clear">';
                    ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr style="font-size:120%;">';
                    ReportHTML += '                                     <th>Description</th>';
                    ReportHTML += '                                     <th>Qty</th>';
                    ReportHTML += '                                     <th>Unit Price</th>';
                    ReportHTML += '                                     <th>Sale Price</th>';
                    //ReportHTML += '                                     <th>Notes</th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    $.each(JSON.parse(data[2]), function (i, item) {
                        ReportHTML += '                                     <tr class="input-md  font-bold "style="font-size:120%;">';
                        ReportHTML += '                                         <td style="text-align:left;">' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                        ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                        ReportHTML += '                                         <td>' + item.SalePrice.toFixed(2) + '</td>';
                        ReportHTML += '                                         <td>' + item.SaleAmount.toFixed(2) + '</td>';
                        //ReportHTML += '                                         <td>' + (item.Notes == "0" ? "" : item.Notes) + '</td>';
                        ReportHTML += '                                     </tr>';
                    });
                    if (pInvoiceHeader.FixedDiscount > 0) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td style="text-align:left;">' + 'Special Discount' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2) + '</td>';
                        ReportHTML += '                                     </tr>';
                    }
                    //ReportHTML += '                                         <tr>';
                    //ReportHTML += '                                             <td colspan=2>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                             <td><b>' + pInvoiceHeader.Amount + '</b></td>';
                    //ReportHTML += '                                             <td>' + pInvoiceHeader.CurrencyCode + '</td>';
                    //ReportHTML += '                                         </tr>';
                    //$("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")

                    //ReportHTML += '                                         <tr>';
                    //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                             <td><b>Total Amount : ' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                         </tr>';
                    ReportHTML += '                             </tbody>';
                    ReportHTML += '                         </table>';
                    ReportHTML += '                     </div>'

                    if ($("#cbLargeInvoice").prop("checked")) {
                        ReportHTML += '         <div class="col-xs-12 m-t-n">Please, see attachment.</div>';
                        ReportHTML += '         <div class="break"></div>';
                    }
                    else
                        ReportHTML += '                         <div class="row"></div>';
                    ReportHTML += '                         <div class="col-xs-8 m-t-n">';
                    if ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + '</br>';
                        ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                        ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                        ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                        ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                        ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                    }
                    else if ($("#cbPrintBankDetailsFromTemplate").prop("checked") || $("#cbPrintBankDetailsNone").prop("checked")) {
                        ReportHTML += '                             <b>SIGNATURE</b>';
                    }
                    else
                        ReportHTML += '                             <br>';
                    ReportHTML += '                         </div>';
                    ReportHTML += '                         <div class="col-xs-4 text-right m-t-n">';
                    if (pTaxAmount != 0 || pDiscountAmount != 0)
                        ReportHTML += '                             <b>Subtotal: </b>' + pInvoiceHeader.CurrencyCode + ' ' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                    //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + pInvoiceHeader.TaxPercentage + '</br>';
                    if (pTaxAmount != 0)
                        ReportHTML += '                             <b>VAT(' + pInvoiceHeader.TaxPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pTaxAmount.toFixed(2) + '</br>';
                    //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + pInvoiceHeader.DiscountPercentage + '</br>';
                    if (pDiscountAmount != 0)
                        ReportHTML += '                             <b>Discount(' + pInvoiceHeader.DiscountPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pDiscountAmount.toFixed(2) + '</br>';
                    ReportHTML += '                             <b>Total: </b>' + pInvoiceHeader.CurrencyCode + ' <b>' + parseFloat(pInvoiceHeader.Amount).toFixed(2) + '</b></br>';
                    ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(parseFloat(pInvoiceHeader.Amount).toFixed(2)) + ' ' + pInvoiceHeader.CurrencyCode + '</br>';
                    if ($("#cbPrintUSDTotal").prop("checked") && pInvoiceHeader.CurrencyCode.trim() == "EGP")
                        ReportHTML += '                             <b>USD Total: </b>' + ' <b>' + (pInvoiceHeader.Amount / $("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")).toFixed(2) + '</b></br>';
                    ReportHTML += '                         </div>';

                    //ReportHTML += '                     </div>'; //of table-responsive
                    //ReportHTML += '                 </section>';
                    //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                    ReportHTML += '             </div>'; //
                    ReportHTML += '         </body>';

                    ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftPosition != 0 ? pDefaultsRow.InvoiceLeftPosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddlePosition != 0 ? pDefaultsRow.InvoiceMiddlePosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightPosition != 0 ? pDefaultsRow.InvoiceRightPosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                 </div>'
                    ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftSignature != 0 ? pDefaultsRow.InvoiceLeftSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddleSignature != 0 ? pDefaultsRow.InvoiceMiddleSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightSignature != 0 ? pDefaultsRow.InvoiceRightSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                 </div>'
                    if ($("#cbPrintStamp").prop("checked"))
                        ReportHTML += '         <div class="text-right m-r-lg"><img src="/Content/Images/CompanyStamp.jpg" alt="stamp"/></div>';

                    //kk
                    if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                        ReportHTML += '                         <div class="col-xs-7">';
                        ReportHTML += '                             <b style="font-size:125%;">' + '  الشركة خاضعة لنظام الدفعات المقدمة  ' + '</b></br>';
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>").replace(/\ /g, "&nbsp;");
                        ReportHTML += '                         </div>';
                        if ($("#cbPrintNotification").prop("checked")) {
                            ReportHTML += '                         <div class="col-xs-5 text-right">';
                            ReportHTML += '                              نود أن  نخطر سيادتكم أنه تم بيع الحقوق المالية الخاصة بالفانورة بعاليه  و المستحقة  في ذمتكم لشركتنا (شركة ايليت للخدمات اللوجيستية ش.م.م) لصالح شركة كيو ان بى الاهلى للتخصيم (ش.م.م) و نقبل نحن شركة ( شركة..................................) الحوالة و الاخطار بعاليه ولا يوجد لدينا اى مانع وفى حالة السداد عن طريق الإيداع البنكى أو التحويلات يتم سداد مبلغ الفواتير في حسابنا رقم 00733-20311916075-49 طرف بنك قطر الوطنى الاهلى فرع سيتى ستارز و في حالة السداد عن طريق شيكات يتم اصدار الشيكات باسم شركة (شركة ايليت للخدمات اللوجيستية ش.م.م) فى تاريخ الاستحقاق   ';
                            ReportHTML += '                         </div>';
                        }
                    }
                    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

                    //ReportHTML += '         <div class="row text-right m-r m-t">' + '  يتنبه نحو عدم الخصم من تحت حساب الضريبة حيث أن الشركة تتبع نظام الدفعات المقدمة تطبيقا لأحكام لمادة (62) من القانون رقم 91 لسنة 2005  ' + '</div>';
                    //ReportHTML += '         <div class="row text-right m-r">' + '  يوقف صرف شيكات مصر للتأمين لحين تسوية التعويضات  ' + '</div>';
                    //ReportHTML += '         <div class="row text-right m-r">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
                    //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
                    //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                    //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
                    if ($("#cbPrintFooterInvoice").prop("checked"))
                        ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    else
                        ReportHTML += '         &emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>';
                    //else
                    //    ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                    if (1==1) {
                        pFinalReportHTML += ReportHTML;
                        Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                    }
                    else {
                        pFinalReportHTML += ReportHTML;
                        pFinalReportHTML += ' <div class="break"></div>';
                    }
                } //EOF else if (pDefaults.UnEditableCompanyName == "ELI")
                else if (pDefaults.UnEditableCompanyName == "ELH") {
                    var ReportHTML = '';
                    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                    //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                    //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + pInvoiceHeader.ConcatenatedInvoiceNumber + ')' + '</h3></div>';
                    if (pDefaults.UnEditableCompanyName == "BAD" && pInvoiceHeader.InvoiceTypeName.split(' ')[0].trim().toUpperCase() == "STATEMENT")
                        ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + pInvoiceHeader.InvoiceNumber + '</h3></div>';
                    else if (!(pDefaults.UnEditableCompanyName == "SAF" && pInvoiceTypeCode == "DRAFT")) //Dont print for Safena
                        ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + '</h3></div>';

                    else { //i.e. (pDefaults.UnEditableCompanyName == "SAF" && pInvoiceTypeCode == "DRAFT") {
                        ReportHTML += '             <div style="position:absolute;left:50px;top:170px;">';
                        ReportHTML += '             <img src="/Content/Images/DraftWaterMark.jpg" alt="logo" width=612px; height=200px;></div>';
                    }
                    ////ReportHTML += '             <div style="clear:both;"><br></div>';
                    //ReportHTML += '         <div class="col-xs-1 m-l-n-md"><img src="/Content/Images/' + 'InvoiceSideStatement.jpg' + '" alt="logo"/></div>';
                    ReportHTML += '         <div class="col-xs-12">';

                    if (pInvoiceHeader.InvoiceTypeName.split(' ')[0].trim().toUpperCase() == "INVOICE"
                        && (pDefaults.UnEditableCompanyName == "WFE")
                    ) {
                        ReportHTML += '             <div class="col-xs-9"></div>';
                        ReportHTML += '             <div class="col-xs-3"><b>Tax No.: </b>' + (pDefaults.TaxNumber == 0 ? "" : pDefaults.TaxNumber) + '</div>';
                        ReportHTML += '             <div class="col-xs-9"></div>';
                        ReportHTML += '             <div class="col-xs-3"><b>Com. Reg. No.: </b>' + (pDefaults.CommericalRegNo == 0 ? "" : pDefaults.CommericalRegNo) + '</div>';
                    }
                    if (pDefaults.UnEditableCompanyName == "EGY") {
                        ReportHTML += '             <div class="col-xs-9"></div>';
                        ReportHTML += '             <div class="col-xs-3"><b>Ref.: </b>' + (pOperationHeader.Reference == 0 ? "" : pOperationHeader.Reference) + '</div>';
                    }
                    ReportHTML += '             <div class="col-xs-9"><b>Bill to: </b>' + pInvoiceHeader.PartnerName + '</div>';
                    ReportHTML += '             <div class="col-xs-3"><b>Inv.Date: </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '</div>';
                    ReportHTML += '             <div class="col-xs-9"><b>Address: </b>';
                    ReportHTML += '                 ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                    ReportHTML += '                 ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2));
                    ReportHTML += '                 ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                    ReportHTML += '                 ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                    ReportHTML += '             </div>';
                    //ReportHTML += '             <div class="col-xs-3"><b>Due Date: </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '</div>';
                    ReportHTML += '             <div class="col-xs-12 b-b b-dark m-t-n-xs" style="clear:both;"></div>';

                    if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                        ReportHTML += '             <div class="col-xs-6"><b>Operation: </b>' + pMasterOperationCode + '</div>';
                    else
                        ReportHTML += '             <div class="col-xs-6"><b>Operation: </b>' + (pInvoiceHeader.OperationCode == 0 ? pInvoiceHeader.MasterOperationCode : pInvoiceHeader.OperationCode) + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Currency: </b>' + pInvoiceHeader.CurrencyCode + '</div>';
                    if ($("#cbPrintMBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU")
                        ReportHTML += '             <div class="col-xs-6"><b>MB/L No.: </b>' + pMasterBL + '</div>';
                    if (pDefaults.UnEditableCompanyName == "DGL" && pMasterBL == "")
                        ReportHTML += '             <div class="col-xs-6"><b>Courier: </b>' + (pMainRoute.Notes == 0 ? "" : pMainRoute.Notes) + '</div>';
                    if ($("#cbPrintHBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ) {
                        if (pHouseBLs != "0")//Master Operation so show all houses on it
                            ReportHTML += '             <div class="col-xs-6"><b>HBL</b>: ' + pHouseBLs + '</div>';
                        else
                            ReportHTML += '             <div class="col-xs-6"><b>HB/L No.:</b> ' + (pHouseNumber == "" || pHouseNumber == "0" ? "" : pHouseNumber) + '</div>';
                    }
                    ReportHTML += '             <div class="col-xs-6"><b>POL: </b>' + pPOLName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>POD: </b>' + pPODName + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Weight: </b>' + pGrossWeightSum + ' KG</div>';
                    if (pOperationHeader.TransportType == OceanTransportType) {
                        ReportHTML += '         <div class="col-xs-6"><b>Vessel: </b>' + pVesselName + '</div>';
                    }
                    //for inland shipping line is written in LeftSignature
                    if (pOperationHeader.TransportType == InlandTransportType) {
                        ReportHTML += '         <div class="col-xs-6"><b>Shipping Line: </b>' + (pInvoiceHeader.LeftSignature == 0 ? "" : pInvoiceHeader.LeftSignature) + '</div>';
                    }
                    if (pOperationHeader.TransportType != AirTransportType) {
                        ReportHTML += '         <div class="col-xs-6"><b>Arrival Date: </b>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.ActualArrival)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.ActualArrival))) + '</div>';
                        ReportHTML += '         <div class="col-xs-6"><b>Containers: </b>' + (pOperationHeader.ShipmentType == 0 || pOperationHeader.ShipmentType == 2 || pOperationHeader.ShipmentType == 4 ? "LCL" : pContainerTypes) + '</div>';
                        ReportHTML += '         <div class="col-xs-6"><b>Container Numbers: </b>' + pContainerNumbers + '</div>';
                    }
                    if (pOperationHeader.PackageTypes != 0 || pOperationHeader.PackageTypesOnContainersTotals != 0 || pOperationHeader.PlacedOnOperationContainersAndPackagesID != 0)
                        ReportHTML += '         <div class="col-xs-6"><b>Packages: </b>' + (pOperationHeader.PackageTypes == 0 ? (pOperationHeader.PackageTypesOnContainersTotals == 0 ? (pOperationHeader.PlacedOnOperationContainersAndPackagesID == 0 ? "0" : pOperationHeader.PlacedOnOperationContainersAndPackagesID) : pOperationHeader.PackageTypesOnContainersTotals) : pOperationHeader.PackageTypes) + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Shipment Category: </b>' + pShipmentTypeCode + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Shipment Term: </b>' + pIncotermName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Commodity: </b>' + (pOperationHeader.CommodityName == 0 ? "" : pOperationHeader.CommodityName) + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Shipper: </b>' + pShipperName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Consignee: </b>' + pConsigneeName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Notify: </b>' + (pOperationHeader.Notify1Name == 0 ? 'N/A' : pOperationHeader.Notify1Name) + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Weight: </b>' + pGrossWeightSum + ' KGM' + '</div>';

                    if (pOperationHeader.CertificateNumber != 0) {
                        ReportHTML += '         <div class="col-xs-6"><b>Certificate No: </b>' + (pOperationHeader.CertificateNumber == 0 ? "" : pOperationHeader.CertificateNumber) + '</div>';
                        ReportHTML += '         <div class="col-xs-6"><b>Customer Ref: </b>' + (pOperationHeader.CustomerReference == 0 ? "" : pOperationHeader.CustomerReference) + '</div>';
                    }
                    if (pDefaults.UnEditableCompanyName == "DGL" || pDefaults.UnEditableCompanyName == "BAD")
                        ReportHTML += '             <div class="col-xs-6"><b>Notes: </b>' + (pInvoiceHeader.MiddleSignature == 0 ? "" : pInvoiceHeader.MiddleSignature) + '</div>';
                    ReportHTML += '                     <div class="col-xs-12 clear">';
                    ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    if (pDefaults.UnEditableCompanyName == "BAD")
                        ReportHTML += '                                     <th>Ser.</th>';
                    ReportHTML += '                                     <th>Description</th>';
                    //ReportHTML += '                                     <th>Qty</th>';
                    //ReportHTML += '                                     <th>Unit Price</th>';
                    ReportHTML += '                                     <th style="width:15%;">Amount</th>';
                    ReportHTML += '                                     <th style="width:15%;">Draft</th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    $.each(JSON.parse(data[2]), function (i, item) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        if (pDefaults.UnEditableCompanyName == "BAD")
                            ReportHTML += '                                         <td>' + (i + 1) + '</td>';
                        if (pDefaults.UnEditableCompanyName == "TEL")
                            ReportHTML += '                                         <td style="text-align:left;">' + (item.Notes == 0 ? (item.ChargeTypeName == 0 ? "" : item.ChargeTypeName) : item.Notes) + '</td>';
                        else
                            ReportHTML += '                                         <td style="text-align:left;">' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                        //ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                        //ReportHTML += '                                         <td>' + item.SalePrice.toFixed(2) + '</td>';
                        ReportHTML += '                                         <td>' + item.SaleAmount.toFixed(2) + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                     </tr>';
                    });
                    if (pInvoiceHeader.FixedDiscount > 0) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        if (pDefaults.UnEditableCompanyName == "BAD")
                            ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td style="text-align:left;">' + 'Special Discount' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2) + '</td>';
                        ReportHTML += '                                     </tr>';
                    }
                    //ReportHTML += '                                         <tr>';
                    //ReportHTML += '                                             <td colspan=2>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                             <td><b>' + pInvoiceHeader.Amount + '</b></td>';
                    //ReportHTML += '                                             <td>' + pInvoiceHeader.CurrencyCode + '</td>';
                    //ReportHTML += '                                         </tr>';
                    //$("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")

                    //ReportHTML += '                                         <tr>';
                    //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                             <td><b>Total Amount : ' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                         </tr>';
                    ReportHTML += '                             </tbody>';
                    ReportHTML += '                         </table>';
                    ReportHTML += '                     </div>'

                    if ($("#cbLargeInvoice").prop("checked")) {
                        ReportHTML += '         <div class="col-xs-12 m-t-n">Please, see attachment.</div>';
                        ReportHTML += '         <div class="break"></div>';
                    }
                    else
                        ReportHTML += '                         <div class="row"></div>';
                    ReportHTML += '                         <div class="col-xs-8 m-t-n">';
                    if ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + (pDefaults.UnEditableCompanyName == "QUI" ? (" " + pDefaults.CompanyName) : "") + '</br>';
                        ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                        ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                        ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                        ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                        ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                    }
                    //kk: added 2nd condition
                    else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + (pDefaults.UnEditableCompanyName == "QUI" ? (" " + pDefaults.CompanyName) : "") + '</br>';
                        ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                    }
                    else
                        ReportHTML += '                             <br>';
                    ReportHTML += '                         </div>';
                    ReportHTML += '                         <div class="col-xs-4 text-right m-t-n">';
                    if (pTaxAmount != 0 || pDiscountAmount != 0)
                        ReportHTML += '                             <b>Subtotal: </b>' + pInvoiceHeader.CurrencyCode + ' ' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                    //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + pInvoiceHeader.TaxPercentage + '</br>';
                    if (pTaxAmount != 0 || pInvoiceHeader.TaxTypeID != 0)
                        ReportHTML += '                             <b>VAT(' + pInvoiceHeader.TaxPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pTaxAmount.toFixed(2) + '</br>';
                    //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + pInvoiceHeader.DiscountPercentage + '</br>';
                    if (pDiscountAmount != 0)
                        ReportHTML += '                             <b>Discount(' + pInvoiceHeader.DiscountPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pDiscountAmount.toFixed(2) + '</br>';
                    ReportHTML += '                             <b>Total: </b>' + pInvoiceHeader.CurrencyCode + ' <b>' + parseFloat(pInvoiceHeader.Amount).toFixed(2) + '</b></br>';
                    ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(parseFloat(pInvoiceHeader.Amount).toFixed(2)) + ' ' + pInvoiceHeader.CurrencyCode + '</br>';
                    if ($("#cbPrintUSDTotal").prop("checked") && pInvoiceHeader.CurrencyCode.trim() == "EGP")
                        ReportHTML += '                             <b>USD Total: </b>' + ' <b>' + (pInvoiceHeader.Amount / $("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")).toFixed(2) + '</b></br>';
                    ReportHTML += '                         </div>';

                    //ReportHTML += '                     </div>'; //of table-responsive
                    //ReportHTML += '                 </section>';
                    //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                    ReportHTML += '             </div>'; //
                    ReportHTML += '         </body>';
                    ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftPosition != 0 ? pDefaultsRow.InvoiceLeftPosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddlePosition != 0 ? pDefaultsRow.InvoiceMiddlePosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightPosition != 0 ? pDefaultsRow.InvoiceRightPosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                 </div>'
                    ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftSignature != 0 ? pDefaultsRow.InvoiceLeftSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddleSignature != 0 ? pDefaultsRow.InvoiceMiddleSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightSignature != 0 ? pDefaultsRow.InvoiceRightSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                 </div>'
                    if ($("#cbPrintStamp").prop("checked"))
                        ReportHTML += '         <div class="text-right m-r-lg"><img src="/Content/Images/CompanyStamp.jpg" alt="stamp"/></div>';

                    if (pDefaults.UnEditableCompanyName == "TEL") {
                        ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                        ReportHTML += '                     <div class="col-xs-3 m-t"><b>' + 'Financial Manager' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-2 m-t text-center"><b>' + '&emsp;' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + '&emsp;' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-3 m-t text-center"><b>' + 'Auditor' + '</b></div>';
                        ReportHTML += '                 </div>'
                        ReportHTML += '                 <div class="m-t" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                        ReportHTML += '                     <div class="col-xs-3 m-t-sm"><b>' + '&emsp;' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-2 m-t-sm text-center"><b>' + '&emsp;' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-4 m-t-sm text-center"><b>' + '&emsp;' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-3 m-t-sm text-center">' + '&emsp;' + '</div>';
                        ReportHTML += '                 </div>'
                    }
                    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

                    if (pDefaults.UnEditableCompanyName == "DYN")
                        ReportHTML += '         <div class="row m-l">' + '  Please, Issue checks with our company name داينميك لخدمات النقل  ' + '</div>';
                    //ReportHTML += '         <div class="row text-right m-r m-t">' + '  يتنبه نحو عدم الخصم من تحت حساب الضريبة حيث أن الشركة تتبع نظام الدفعات المقدمة تطبيقا لأحكام لمادة (62) من القانون رقم 91 لسنة 2005  ' + '</div>';
                    //ReportHTML += '         <div class="row text-right m-r">' + '  يوقف صرف شيكات مصر للتأمين لحين تسوية التعويضات  ' + '</div>';
                    //ReportHTML += '         <div class="row text-right m-r">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
                    //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
                    //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                    //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
                    if ($("#cbPrintFooterInvoice").prop("checked"))
                        ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    else
                        ReportHTML += '         &emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>';
                    //else
                    //    ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                    if (1==1) {
                        pFinalReportHTML += ReportHTML;
                        Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                    }
                    else {
                        pFinalReportHTML += ReportHTML;
                        pFinalReportHTML += ' <div class="break"></div>';
                    }
                } //EOF else if (pDefaults.UnEditableCompanyName == "ELH")
                else if (pDefaults.UnEditableCompanyName == "CAL") {
                    var ReportHTML = '';
                    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                    //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  'CompanyHeader-Invoice.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                    //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + pInvoiceHeader.ConcatenatedInvoiceNumber + ')' + '</h3></div>';
                    if (!(pDefaults.UnEditableCompanyName == "SAF" && pInvoiceTypeCode == "DRAFT")) //Dont print for Safena
                        ; //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + '</h3></div>';

                    else { //i.e. (pDefaults.UnEditableCompanyName == "SAF" && pInvoiceTypeCode == "DRAFT") {
                        ReportHTML += '             <div style="position:absolute;left:50px;top:170px;">';
                        ReportHTML += '             <img src="/Content/Images/DraftWaterMark.jpg" alt="logo" width=612px; height=200px;></div>';
                    }
                    ////ReportHTML += '             <div style="clear:both;"><br></div>';
                    //ReportHTML += '         <div class="col-xs-1 m-l-n-md"><img src="/Content/Images/' + 'InvoiceSideStatement.jpg' + '" alt="logo"/></div>';
                    ReportHTML += '         <div class="col-xs-12">';
                    ReportHTML += '             <div class="col-xs-9">Bill to:<b><br>' + pInvoiceHeader.PartnerName + '</b></div>';
                    //ReportHTML += '             <div class="col-xs-3 text-right">Invoice#<br><b>' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + '</b></div>';
                    ReportHTML += '             <div class="col-xs-3 text-right">Invoice#<br><b>' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + pInvoiceHeader.InvoiceNumber + '</b></div>';
                    ReportHTML += '             <div class="col-xs-12">';
                    ReportHTML += '                 ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                    ReportHTML += '                 ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2));
                    ReportHTML += '                 ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                    ReportHTML += '                 ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                    ReportHTML += '             </div>';
                    ReportHTML += '             <div class="col-xs-12">Billing Details: ' + (pClientHeader.BillingDetails == 0 ? "" : pClientHeader.BillingDetails) + '</div>';
                    ReportHTML += '             <div class="col-xs-12">VAT No.: ' + (pClientHeader.VATNumber == 0 ? "" : pClientHeader.VATNumber) + '</div>';
                    ReportHTML += '             <div class="col-xs-12">NIF: ' + (pClientHeader.BankName == 0 ? "" : pClientHeader.BankName) + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Customer Ref.:</b> ' + (pInvoiceHeader.LeftSignature == 0 ? "" : pInvoiceHeader.LeftSignature) + '</div>';

                    //ReportHTML += '             <div class="col-xs-3"><b>Due Date: </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '</div>';
                    //ReportHTML += '             <div class="col-xs-12 b-b b-dark m-t-n-xs" style="clear:both;"></div>';

                    ReportHTML += '                     <div class="col-xs-12 clear m-t-lg">';
                    ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    ReportHTML += '                                     <th>Invoice Date</th>';
                    ReportHTML += '                                     <th>Terms</th>';
                    ReportHTML += '                                     <th>Due Date</th>';
                    ReportHTML += '                                     <th>Shipment Number</th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    ReportHTML += '                                 <tr>';
                    ReportHTML += '                                     <td>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '</td>';
                    ReportHTML += '                                     <td>' + (pInvoiceHeader.PaymentTermName == 0 ? "" : pInvoiceHeader.PaymentTermName) + '</td>';
                    ReportHTML += '                                     <td>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '</td>';
                    ReportHTML += '                                     <td>' + (pOperationHeader.HouseNumber == 0 ? pOperationHeader.MasterBL : pOperationHeader.HouseNumber) + '</td>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </tbody>';
                    ReportHTML += '                         </table>';
                    ReportHTML += '                     </div>';

                    ReportHTML += '             <div class="col-xs-12"><b>Subject:</b> ' + '' + '</div>';

                    ReportHTML += '                     <div class="col-xs-12 clear m-t-lg">';
                    ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    ReportHTML += '                                     <th style="width:5%;">#</th>';
                    ReportHTML += '                                     <th>Description</th>';
                    ReportHTML += '                                     <th>Qty</th>';
                    ReportHTML += '                                     <th>Rate</th>';
                    ReportHTML += '                                     <th>Amount</th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    $.each(JSON.parse(data[2]), function (i, item) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + (i + 1) + '</td>';
                        ReportHTML += '                                         <td style="text-align:left;">' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + ((($("#cbAddNotesToItems").prop("checked") || pDefaults.UnEditableCompanyName == "CAL") && item.Notes != 0 && item.Notes != "") ? (' - ' + item.Notes) : "") + '</td>';
                        ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                        ReportHTML += '                                         <td>' + item.SalePrice.toFixed(2) + '</td>';
                        ReportHTML += '                                         <td>' + item.SaleAmount.toFixed(2) + '</td>';
                        ReportHTML += '                                     </tr>';
                    });
                    if (pInvoiceHeader.FixedDiscount > 0) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td style="text-align:left;">' + 'Special Discount' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2) + '</td>';
                        ReportHTML += '                                     </tr>';
                    }
                    //ReportHTML += '                                         <tr>';
                    //ReportHTML += '                                             <td colspan=2>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                             <td><b>' + pInvoiceHeader.Amount + '</b></td>';
                    //ReportHTML += '                                             <td>' + pInvoiceHeader.CurrencyCode + '</td>';
                    //ReportHTML += '                                         </tr>';
                    //$("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")

                    //ReportHTML += '                                         <tr>';
                    //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                             <td><b>Total Amount : ' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                         </tr>';
                    ReportHTML += '                             </tbody>';
                    ReportHTML += '                         </table>';
                    ReportHTML += '                     </div>'

                    if ($("#cbLargeInvoice").prop("checked")) {
                        ReportHTML += '         <div class="col-xs-12 m-t-n">Please, see attachment.</div>';
                        ReportHTML += '         <div class="break"></div>';
                    }
                    else
                        ReportHTML += '                         <div class="row"></div>';
                    ReportHTML += '                         <div class="col-xs-8 m-t-n">';
                    if (pDefaults.UnEditableCompanyName == "CAL")
                        ReportHTML += '             <div class="col-xs-12">' + 'Thanks for your business.' + '</div>';
                    else if ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + '</br>';
                        ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                        ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                        ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                        ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                        ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                    }
                    else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + (pDefaults.UnEditableCompanyName == "QUI" ? (" " + pDefaults.CompanyName) : "") + '</br>';
                        ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                    }
                    else
                        ReportHTML += '                             <br>';
                    ReportHTML += '                         </div>';
                    ReportHTML += '                         <div class="col-xs-4 text-right m-t-n">';
                    if (pTaxAmount != 0 || pDiscountAmount != 0)
                        ReportHTML += '                             <b>Subtotal: </b>' + pInvoiceHeader.CurrencyCode + ' ' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                    //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + pInvoiceHeader.TaxPercentage + '</br>';
                    if (pTaxAmount != 0 || pInvoiceHeader.TaxTypeID != 0) {
                        ReportHTML += '                             <b>VAT(' + pInvoiceHeader.TaxPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pTaxAmount.toFixed(2) + '</br>';
                    }
                    //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + pInvoiceHeader.DiscountPercentage + '</br>';
                    if (pDiscountAmount != 0)
                        ReportHTML += '                             <b>Discount(' + pInvoiceHeader.DiscountPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pDiscountAmount.toFixed(2) + '</br>';
                    ReportHTML += '                             <b>Total: </b>' + pInvoiceHeader.CurrencyCode + ' <b>' + parseFloat(pInvoiceHeader.Amount).toFixed(2) + '</b></br>';
                    //ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(parseFloat(pInvoiceHeader.Amount).toFixed(2)) + ' ' + pInvoiceHeader.CurrencyCode + '</br>';
                    if ($("#cbPrintUSDTotal").prop("checked") && pInvoiceHeader.CurrencyCode.trim() == "EGP")
                        ReportHTML += '                             <b>USD Total: </b>' + ' <b>' + (pInvoiceHeader.Amount / $("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")).toFixed(2) + '</b></br>';
                    ReportHTML += '                         </div>';

                    //ReportHTML += '                     </div>'; //of table-responsive
                    //ReportHTML += '                 </section>';
                    //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                    ReportHTML += '             </div>'; //
                    ReportHTML += '         </body>';
                    ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftPosition != 0 ? pDefaultsRow.InvoiceLeftPosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddlePosition != 0 ? pDefaultsRow.InvoiceMiddlePosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightPosition != 0 ? pDefaultsRow.InvoiceRightPosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                 </div>'
                    ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftSignature != 0 ? pDefaultsRow.InvoiceLeftSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddleSignature != 0 ? pDefaultsRow.InvoiceMiddleSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightSignature != 0 ? pDefaultsRow.InvoiceRightSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                 </div>'
                    if ($("#cbPrintStamp").prop("checked"))
                        ReportHTML += '         <div class="text-right m-r-lg"><img src="/Content/Images/CompanyStamp.jpg" alt="stamp"/></div>';

                    if (pDefaults.UnEditableCompanyName == "TEL") {
                        ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                        ReportHTML += '                     <div class="col-xs-3 m-t"><b>' + 'Financial Manager' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-2 m-t text-center"><b>' + '&emsp;' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + '&emsp;' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-3 m-t text-center"><b>' + 'Auditor' + '</b></div>';
                        ReportHTML += '                 </div>'
                        ReportHTML += '                 <div class="m-t" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                        ReportHTML += '                     <div class="col-xs-3 m-t-sm"><b>' + '&emsp;' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-2 m-t-sm text-center"><b>' + '&emsp;' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-4 m-t-sm text-center"><b>' + '&emsp;' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-3 m-t-sm text-center">' + '&emsp;' + '</div>';
                        ReportHTML += '                 </div>'
                    }
                    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

                    ReportHTML += '         <div class="row m-l font-bold">' + '  Terms & Conditions  ' + '</div>';
                    ReportHTML += '         <div class="row m-l">' + '  Transferencia bancaria / Bank transfer  ' + '</div>';
                    ReportHTML += '         <div class="row m-l">' + '  ES74 0049 0712 2821 1015 2066 - BANCO SANTANDER  ' + '</div>';
                    //ReportHTML += '         <div class="row text-right m-r m-t">' + '  يتنبه نحو عدم الخصم من تحت حساب الضريبة حيث أن الشركة تتبع نظام الدفعات المقدمة تطبيقا لأحكام لمادة (62) من القانون رقم 91 لسنة 2005  ' + '</div>';
                    //ReportHTML += '         <div class="row text-right m-r">' + '  يوقف صرف شيكات مصر للتأمين لحين تسوية التعويضات  ' + '</div>';
                    //ReportHTML += '         <div class="row text-right m-r">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
                    //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
                    //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                    //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
                    if ($("#cbPrintFooterInvoice").prop("checked"))
                        ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/' + (1 == 1 ? 'CompanyFooter.jpg' : 'CompanyFooter-Invoice.jpg') + '" alt="footer"/></div>';
                    else
                        ReportHTML += '         &emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>';
                    //else
                    //    ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                    if (1==1) {
                        pFinalReportHTML += ReportHTML;
                        Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                    }
                    else {
                        pFinalReportHTML += ReportHTML;
                        pFinalReportHTML += ' <div class="break"></div>';
                    }
                } //EOF else if (pDefaults.UnEditableCompanyName == "CAL")
                else if (pDefaults.UnEditableCompanyName == "SHO") {
                    var ReportHTML = '';
                    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                    //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                    //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + pInvoiceHeader.ConcatenatedInvoiceNumber + ')' + '</h3></div>';
                    if (!(pDefaults.UnEditableCompanyName == "SAF" && pInvoiceTypeCode == "DRAFT")) //Dont print for Safena
                        ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + '</h3></div>';

                    else { //i.e. (pDefaults.UnEditableCompanyName == "SAF" && pInvoiceTypeCode == "DRAFT") {
                        ReportHTML += '             <div style="position:absolute;left:50px;top:170px;">';
                        ReportHTML += '             <img src="/Content/Images/DraftWaterMark.jpg" alt="logo" width=612px; height=200px;></div>';
                    }
                    ////ReportHTML += '             <div style="clear:both;"><br></div>';
                    //ReportHTML += '         <div class="col-xs-1 m-l-n-md"><img src="/Content/Images/' + 'InvoiceSideStatement.jpg' + '" alt="logo"/></div>';
                    ReportHTML += '         <div class="col-xs-12">';

                    if (pInvoiceHeader.InvoiceTypeName.split(' ')[0].trim().toUpperCase() == "INVOICE") {
                        ReportHTML += '             <div class="col-xs-9"></div>';
                        ReportHTML += '             <div class="col-xs-3"><b>Tax No.: </b>' + (pDefaults.TaxNumber == 0 ? "" : pDefaults.TaxNumber) + '</div>';
                        ReportHTML += '             <div class="col-xs-9"></div>';
                        ReportHTML += '             <div class="col-xs-3"><b>Com. Reg. No.: </b>' + (pDefaults.CommericalRegNo == 0 ? "" : pDefaults.CommericalRegNo) + '</div>';
                    }
                    ReportHTML += '             <div class="col-xs-9"><b>Bill to: ' + pInvoiceHeader.PartnerName + '</b></div>';
                    ReportHTML += '             <div class="col-xs-3"><b>Inv.Date: </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '</div>';
                    ReportHTML += '             <div class="col-xs-9"><b>Address: </b>';
                    ReportHTML += '                 ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                    ReportHTML += '                 ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2));
                    ReportHTML += '                 ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                    ReportHTML += '                 ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                    ReportHTML += '             </div>';
                    //ReportHTML += '             <div class="col-xs-3"><b>Due Date: </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '</div>';
                    ReportHTML += '             <div class="col-xs-12 b-b b-dark m-t-n-xs" style="clear:both;"></div>';

                    if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                        ReportHTML += '             <div class="col-xs-6"><b>Operation: </b>' + pMasterOperationCode + '</div>';
                    else
                        ReportHTML += '             <div class="col-xs-6"><b>Operation: </b>' + (pInvoiceHeader.OperationCode == 0 ? pInvoiceHeader.MasterOperationCode : pInvoiceHeader.OperationCode) + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Currency: </b>' + pInvoiceHeader.CurrencyCode + '</div>';
                    if ($("#cbPrintMBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU")
                        ReportHTML += '             <div class="col-xs-6"><b>MB/L No.: </b>' + pMasterBL + '</div>';
                    if ($("#cbPrintHBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ) {
                        if (pHouseBLs != "0")//Master Operation so show all houses on it
                            ReportHTML += '             <div class="col-xs-6"><b>HBL</b>: ' + pHouseBLs + '</div>';
                        else
                            ReportHTML += '             <div class="col-xs-6"><b>HB/L No.:</b> ' + (pHouseNumber == "" || pHouseNumber == "0" ? "" : pHouseNumber) + '</div>';
                    }
                    ReportHTML += '             <div class="col-xs-6"><b>POL: </b>' + pPOLName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>POD: </b>' + pPODName + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Weight: </b>' + pGrossWeightSum + ' KG</div>';
                    if (pOperationHeader.TransportType == OceanTransportType) {
                        ReportHTML += '         <div class="col-xs-6"><b>Vessel: </b>' + pVesselName + '</div>';
                    }
                    //for inland shipping line is written in LeftSignature
                    if (pOperationHeader.TransportType == InlandTransportType) {
                        ReportHTML += '         <div class="col-xs-6"><b>Shipping Line: </b>' + (pInvoiceHeader.LeftSignature == 0 ? "" : pInvoiceHeader.LeftSignature) + '</div>';
                    }
                    if (pOperationHeader.TransportType != AirTransportType) {
                        ReportHTML += '         <div class="col-xs-6"><b>Arrival Date: </b>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.ActualArrival)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.ActualArrival))) + '</div>';
                        ReportHTML += '         <div class="col-xs-6"><b>Containers: </b>' + (pOperationHeader.ShipmentType == 0 || pOperationHeader.ShipmentType == 2 || pOperationHeader.ShipmentType == 4 ? "LCL" : pContainerTypes) + '</div>';
                        ReportHTML += '         <div class="col-xs-6"><b>Container Numbers: </b>' + pContainerNumbers + '</div>';
                    }
                    if (pOperationHeader.PackageTypes != 0 || pOperationHeader.PackageTypesOnContainersTotals != 0 || pOperationHeader.PlacedOnOperationContainersAndPackagesID != 0)
                        ReportHTML += '         <div class="col-xs-6"><b>Packages: </b>' + (pOperationHeader.PackageTypes == 0 ? (pOperationHeader.PackageTypesOnContainersTotals == 0 ? (pOperationHeader.PlacedOnOperationContainersAndPackagesID == 0 ? "0" : pOperationHeader.PlacedOnOperationContainersAndPackagesID) : pOperationHeader.PackageTypesOnContainersTotals) : pOperationHeader.PackageTypes) + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Shipment Category: </b>' + pShipmentTypeCode + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Shipment Term: </b>' + pIncotermName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Commodity: </b>' + (pOperationHeader.CommodityName == 0 ? "" : pOperationHeader.CommodityName) + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Shipper: </b>' + pShipperName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Consignee: </b>' + pConsigneeName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Weight: </b>' + pGrossWeightSum + ' KGM' + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Line: </b>' + (pOperationHeader.LineName == 0 ? "" : pOperationHeader.LineName) + '</div>';
                    ReportHTML += '         <div class="col-xs-6"><b>Certificate No: </b>' + (pOperationHeader.CertificateNumber == 0 ? "" : pOperationHeader.CertificateNumber) + '</div>';
                    ReportHTML += '         <div class="col-xs-6"><b>Customer Ref: </b>' + (pOperationHeader.CustomerReference == 0 ? "" : pOperationHeader.CustomerReference) + '</div>';

                    ReportHTML += '             <div class="col-xs-6"><b>Volume: </b>' + pCBM + ' CBM</div>';
                    ReportHTML += '                     <div class="col-xs-12 clear">';
                    ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    ReportHTML += '                                     <th>Description</th>';
                    ReportHTML += '                                     <th>Qty</th>';
                    ReportHTML += '                                     <th>Unit Price</th>';
                    ReportHTML += '                                     <th>Amount</th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbodystyle="font-size:120%;">';
                    $.each(JSON.parse(data[2]), function (i, item) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td style="text-align:left;">' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                        ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                        ReportHTML += '                                         <td>' + item.SalePrice.toFixed(2) + '</td>';
                        ReportHTML += '                                         <td>' + item.SaleAmount.toFixed(2) + '</td>';
                        ReportHTML += '                                     </tr>';
                    });
                    if (pInvoiceHeader.FixedDiscount > 0) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td style="text-align:left;">' + 'Special Discount' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td>' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2) + '</td>';
                        ReportHTML += '                                     </tr>';
                    }
                    ReportHTML += '                                         <tr>';
                    ReportHTML += '                                             <td colspan=3>' + '<b>Total without VAT : ' + '</b></td>';
                    ReportHTML += '                                             <td><b>' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                    ReportHTML += '                                         </tr>';
                    if (1 == 1) { //if (pTaxAmount != 0) {
                        ReportHTML += '                                         <tr>';
                        ReportHTML += '                                             <td colspan=3>' + '<b>VAT ' + (pTaxTypeName == 0 ? "" : pTaxTypeName) + ' </b></td>';
                        ReportHTML += '                                             <td><b>' + pTaxAmount + '</b></td>';
                        ReportHTML += '                                         </tr>';
                    }
                    if (pDiscountAmount != 0) {
                        ReportHTML += '                                         <tr>';
                        ReportHTML += '                                             <td colspan=3>' + '<b>Discount (' + pDiscountTypeName + ')</b></td>';
                        ReportHTML += '                                             <td><b>' + pDiscountAmount + '</b></td>';
                        ReportHTML += '                                         </tr>';
                    }
                    ReportHTML += '                                         <tr>';
                    ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    ReportHTML += '                                             <td><b>Total Amount : ' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    ReportHTML += '                                         </tr>';

                    ReportHTML += '                             </tbody>';
                    ReportHTML += '                         </table>';
                    ReportHTML += '                     </div>'

                    if ($("#cbLargeInvoice").prop("checked")) {
                        ReportHTML += '         <div class="col-xs-12 m-t-n">Please, see attachment.</div>';
                        ReportHTML += '         <div class="break"></div>';
                    }
                    else
                        ReportHTML += '                         <div class="row"></div>';
                    ReportHTML += '                         <div class="col-xs-8 m-t-n">';
                    if ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + '</br>';
                        ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                        ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                        ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                        ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                        ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                    }
                    //kk: added 2nd condition
                    else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + (pDefaults.UnEditableCompanyName == "QUI" ? (" " + pDefaults.CompanyName) : "") + '</br>';
                        ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                    }
                    else
                        ReportHTML += '                             <br>';
                    ReportHTML += '                         </div>';
                    ReportHTML += '                         <div class="col-xs-4 text-right m-t-n">';
                    if (pTaxAmount != 0 || pDiscountAmount != 0)
                        ReportHTML += '                             <b>Subtotal: </b>' + pInvoiceHeader.CurrencyCode + ' ' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                    //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + pInvoiceHeader.TaxPercentage + '</br>';
                    if (pTaxAmount != 0 || pInvoiceHeader.TaxTypeID != 0) {
                        if (pDefaults.UnEditableCompanyName == "ALL" && pTaxAmount == 0)
                            ReportHTML += '                             0% VAT-Table II, item b1 Law OB 1968' + '</br>';
                        else
                            ReportHTML += '                             <b>VAT(' + pInvoiceHeader.TaxPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pTaxAmount.toFixed(2) + '</br>';
                    }
                    //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + pInvoiceHeader.DiscountPercentage + '</br>';
                    if (pDiscountAmount != 0)
                        ReportHTML += '                             <b>Discount(' + pInvoiceHeader.DiscountPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pDiscountAmount.toFixed(2) + '</br>';
                    ReportHTML += '                             <b>Total: </b>' + pInvoiceHeader.CurrencyCode + ' <b>' + parseFloat(pInvoiceHeader.Amount).toFixed(2) + '</b></br>';
                    ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(parseFloat(pInvoiceHeader.Amount).toFixed(2)) + ' ' + pInvoiceHeader.CurrencyCode + '</br>';
                    if ($("#cbPrintUSDTotal").prop("checked") && pInvoiceHeader.CurrencyCode.trim() == "EGP")
                        ReportHTML += '                             <b>USD Total: </b>' + ' <b>' + (pInvoiceHeader.Amount / $("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")).toFixed(2) + '</b></br>';
                    ReportHTML += '                         </div>';

                    //ReportHTML += '                     </div>'; //of table-responsive
                    //ReportHTML += '                 </section>';
                    //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                    ReportHTML += '             </div>'; //
                    ReportHTML += '         </body>';
                    ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftPosition != 0 ? pDefaultsRow.InvoiceLeftPosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddlePosition != 0 ? pDefaultsRow.InvoiceMiddlePosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightPosition != 0 ? pDefaultsRow.InvoiceRightPosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                 </div>'
                    ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftSignature != 0 ? pDefaultsRow.InvoiceLeftSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddleSignature != 0 ? pDefaultsRow.InvoiceMiddleSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightSignature != 0 ? pDefaultsRow.InvoiceRightSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                 </div>'
                    if ($("#cbPrintStamp").prop("checked"))
                        ReportHTML += '         <div class="text-right m-r-lg"><img src="/Content/Images/CompanyStamp.jpg" alt="stamp"/></div>';

                    if (pDefaults.UnEditableCompanyName == "TEL") {
                        ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                        ReportHTML += '                     <div class="col-xs-3 m-t"><b>' + 'Financial Manager' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-2 m-t text-center"><b>' + '&emsp;' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + '&emsp;' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-3 m-t text-center"><b>' + 'Auditor' + '</b></div>';
                        ReportHTML += '                 </div>'
                        ReportHTML += '                 <div class="m-t" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                        ReportHTML += '                     <div class="col-xs-3 m-t-sm"><b>' + '&emsp;' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-2 m-t-sm text-center"><b>' + '&emsp;' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-4 m-t-sm text-center"><b>' + '&emsp;' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-3 m-t-sm text-center">' + '&emsp;' + '</div>';
                        ReportHTML += '                 </div>'
                    }
                    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                    //kk
                    if ($("#cbPrintBankDetailsFromTemplate").prop("checked") && pDefaults.UnEditableCompanyName == "DGL") {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>").replace(/\ /g, "&nbsp;");
                    }

                    if (pDefaults.UnEditableCompanyName == "DYN")
                        ReportHTML += '         <div class="row m-l">' + '  Please, Issue checks with our company name داينميك لخدمات النقل  ' + '</div>';
                    //ReportHTML += '         <div class="row text-right m-r m-t">' + '  يتنبه نحو عدم الخصم من تحت حساب الضريبة حيث أن الشركة تتبع نظام الدفعات المقدمة تطبيقا لأحكام لمادة (62) من القانون رقم 91 لسنة 2005  ' + '</div>';
                    //ReportHTML += '         <div class="row text-right m-r">' + '  يوقف صرف شيكات مصر للتأمين لحين تسوية التعويضات  ' + '</div>';
                    //ReportHTML += '         <div class="row text-right m-r">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
                    //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
                    //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                    //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
                    if ($("#cbPrintFooterInvoice").prop("checked"))
                        ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    else
                        ReportHTML += '         &emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>';
                    //else
                    //    ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                    if (1==1) {
                        pFinalReportHTML += ReportHTML;
                        Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                    }
                    else {
                        pFinalReportHTML += ReportHTML;
                        pFinalReportHTML += ' <div class="break"></div>';
                    }
                } //else if (pDefaults.UnEditableCompanyName == "SHO") {
                else { //All Other Companies
                    var ReportHTML = '';
                    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                    //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ?  'CompanyHeader' + (pDefaults.UnEditableCompanyName == "BED" ? ("-") + pInvoiceHeader.InvoiceTypeCode : "") + '.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                    //ReportHTML += '                 <div class="col-xs-12 text-center"><img width="100px" id="imgUserImage" src="data:image/jpeg;base64,'+  data[73] + '" /></div>';

                    //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + pInvoiceHeader.ConcatenatedInvoiceNumber + ')' + '</h3></div>';
                    if (pDefaults.UnEditableCompanyName == "BAD" && pInvoiceHeader.InvoiceTypeName.split(' ')[0].trim().toUpperCase() == "STATEMENT")
                        ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + pInvoiceHeader.InvoiceNumber + '</h3></div>';
                    else if (!(pDefaults.UnEditableCompanyName == "SAF" && pInvoiceTypeCode == "DRAFT")) //Dont print for Safena
                        ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + pInvoiceHeader.InvoiceNumber + '/' + ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)).substr(6, 4) + '</h3></div>';

                    else { //i.e. (pDefaults.UnEditableCompanyName == "SAF" && pInvoiceTypeCode == "DRAFT") {
                        ReportHTML += '             <div style="position:absolute;left:50px;top:170px;">';
                        ReportHTML += '             <img src="/Content/Images/DraftWaterMark.jpg" alt="logo" width=612px; height=200px;></div>';
                    }
                    ////ReportHTML += '             <div style="clear:both;"><br></div>';
                    //ReportHTML += '         <div class="col-xs-1 m-l-n-md"><img src="/Content/Images/' + 'InvoiceSideStatement.jpg' + '" alt="logo"/></div>';
                    ReportHTML += '         <div class="col-xs-12 ' + (pDefaultsRow.UnEditableCompanyName == "FEL" ? "m-t-lg" : "") + '">';

                    if (pInvoiceHeader.InvoiceTypeName.split(' ')[0].trim().toUpperCase() == "INVOICE"
                        && (pDefaults.UnEditableCompanyName == "TEU" || pDefaults.UnEditableCompanyName == "WFE"
                            || pDefaults.UnEditableCompanyName == "OCE" || pDefaults.UnEditableCompanyName == "CHM"
                            || pDefaults.UnEditableCompanyName == "COS" || pDefaults.UnEditableCompanyName == "DYN"
                            || pDefaults.UnEditableCompanyName == "ELC"/*WEF is called ELC*/)
                    ) {
                        ReportHTML += '             <div class="col-xs-9"></div>';
                        ReportHTML += '             <div class="col-xs-3"><b>Tax ID.: </b>' + (pDefaults.TaxNumber == 0 ? "" : pDefaults.TaxNumber) + '</div>';
                        ReportHTML += '             <div class="col-xs-9"></div>';
                        ReportHTML += '             <div class="col-xs-3"><b>Com. Reg. No.: </b>' + (pDefaults.CommericalRegNo == 0 ? "" : pDefaults.CommericalRegNo) + '</div>';
                        ReportHTML += '             <div class="col-xs-9"></div>';
                        if (pDefaults.UnEditableCompanyName == "OCE" || pDefaults.UnEditableCompanyName == "CHM")
                            ReportHTML += '             <div class="col-xs-3"><b>VAT ID No.: </b>' + (pDefaults.VatIDNo == 0 ? "" : pDefaults.VatIDNo) + '</div>';
                    }
                    if (pDefaults.UnEditableCompanyName == "EGY") {
                        ReportHTML += '             <div class="col-xs-9"></div>';
                        ReportHTML += '             <div class="col-xs-3"><b>Ref.: </b>' + (pOperationHeader.Reference == 0 ? "" : pOperationHeader.Reference) + '</div>';
                    }
                    ReportHTML += '             <div class="col-xs-9"><b>Bill to: </b>' + pInvoiceHeader.PartnerName + '</div>';
                    ReportHTML += '             <div class="col-xs-3"><b>Inv.Date: </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '</div>';
                    ReportHTML += '             <div class="col-xs-9"><b>Address: </b>';
                    ReportHTML += '                 ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                    ReportHTML += '                 ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2));
                    ReportHTML += '                 ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                    ReportHTML += '                 ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                    if (pDefaults.UnEditableCompanyName == "COS" || pDefaults.UnEditableCompanyName == "TBL" || pDefaults.UnEditableCompanyName == "NEX")
                        ReportHTML += '                 <br><b>Customer Tax ID.: </b>' + (pClientHeader.VATNumber == 0 ? "" : pClientHeader.VATNumber);
                    ReportHTML += '             </div>';
                    ReportHTML += '             <div class="col-xs-3"><b>Due Date: </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '</div>';
                    ReportHTML += '             <div class="col-xs-12 b-b b-dark" style="clear:both;"></div>';
                    if (pDefaults.UnEditableCompanyName == "FEL")
                        ReportHTML += '             <div class="col-xs-12">&emsp;<br></div>';
                    if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                        ReportHTML += '             <div class="col-xs-6"><b>Operation: </b>' + pMasterOperationCode + '</div>';
                    else
                        ReportHTML += '             <div class="col-xs-6"><b>Operation: </b>' + (pInvoiceHeader.OperationCode == 0 ? pInvoiceHeader.MasterOperationCode : pInvoiceHeader.OperationCode) + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Currency: </b>' + pInvoiceHeader.CurrencyCode + '</div>';
                    if ($("#cbPrintMBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU")
                        ReportHTML += '             <div class="col-xs-6"><b>' + (pOperationHeader.TransportType == AirTransportType ? 'AWB:' : 'MB/L No.:') + ' </b>' + pMasterBL + '</div>';
                    if (pDefaults.UnEditableCompanyName == "DGL" && pMasterBL == "")
                        ReportHTML += '             <div class="col-xs-6"><b>Courier: </b>' + (pMainRoute.Notes == 0 ? "" : pMainRoute.Notes) + '</div>';
                    if ($("#cbPrintHBL").prop("checked") || pDefaults.UnEditableCompanyName == "TEU" ) {
                        if (pHouseBLs != "0")//Master Operation so show all houses on it
                            ReportHTML += '             <div class="col-xs-6"><b>HBL</b>: ' + pHouseBLs + '</div>';
                        else
                            ReportHTML += '             <div class="col-xs-6"><b>HB/L No.:</b> ' + (pHouseNumber == "" || pHouseNumber == "0" ? "" : pHouseNumber) + '</div>';
                    }
                    ReportHTML += '             <div class="col-xs-6"><b>POL: </b>' + pPOLName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>POD: </b>' + pPODName + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Weight: </b>' + pGrossWeightSum + ' KG</div>';
                    if (pOperationHeader.TransportType == OceanTransportType) {
                        ReportHTML += '         <div class="col-xs-6"><b>Vessel: </b>' + pVesselName + '</div>';
                    }
                    //for inland shipping line is written in LeftSignature
                    if (pOperationHeader.TransportType == InlandTransportType && pDefaults.UnEditableCompanyName != "BAK") {
                        ReportHTML += '         <div class="col-xs-6"><b>Shipping Line: </b>' + (pInvoiceHeader.LeftSignature == 0 ? "" : pInvoiceHeader.LeftSignature) + '</div>';
                    }
                    if (pDefaults.UnEditableCompanyName == "SEA") {
                        ReportHTML += '         <div class="col-xs-6"><b>Start Date: </b>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.ETAPOLDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.ETAPOLDate))) + '</div>';
                        ReportHTML += '         <div class="col-xs-6"><b>End Date: </b>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.ExpectedArrival)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.ExpectedArrival))) + '</div>';
                    }
                    if (pOperationHeader.TransportType != AirTransportType) {
                        if (pDefaults.UnEditableCompanyName != "FEL" && pDefaults.UnEditableCompanyName != "BAK")
                            ReportHTML += '         <div class="col-xs-6"><b>' + (pDefaults.UnEditableCompanyName == "SEA" ? "Vessel Date:" : "Arrival Date:") + ' </b>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.ActualArrival)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.ActualArrival))) + '</div>';
                        ReportHTML += '         <div class="col-xs-6"><b>Containers: </b>' + (pOperationHeader.ShipmentType == 0 || pOperationHeader.ShipmentType == 2 || pOperationHeader.ShipmentType == 4 ? "LCL" : pContainerTypes) + '</div>';
                        if (pDefaults.UnEditableCompanyName == "COS")
                            ReportHTML += '         <div class="col-xs-6"><b>No of Container: </b>' + (pOperationHeader.Description == 0 ? "" : pOperationHeader.Description) + '</div>';
                        if (pDefaults.UnEditableCompanyName != "TEU" && pDefaults.UnEditableCompanyName != "BAK" && pDefaults.UnEditableCompanyName != "FEL")
                            ReportHTML += '         <div class="col-xs-6"><b>Container Numbers: </b>' + pContainerNumbers + '</div>';
                    }
                    if (pDefaults.UnEditableCompanyName == "TEU")
                        ReportHTML += '         <div class="col-xs-6"><b>ETA: </b>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.ExpectedArrival)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.ExpectedArrival))) + '</div>';
                    if (pDefaults.UnEditableCompanyName == "NIS")
                        ReportHTML += '         <div class="col-xs-6"><b>Number of Pieces: </b>' + pOperationHeader.NumberOfPackages + '</div>';
                    if (pOperationHeader.PackageTypes != 0 || pOperationHeader.PackageTypesOnContainersTotals != 0 || pOperationHeader.PlacedOnOperationContainersAndPackagesID != 0)
                        ReportHTML += '         <div class="col-xs-6"><b>Packages: </b>' + (pOperationHeader.PackageTypes == 0 ? (pOperationHeader.PackageTypesOnContainersTotals == 0 ? (pOperationHeader.PlacedOnOperationContainersAndPackagesID == 0 ? "0" : pOperationHeader.PlacedOnOperationContainersAndPackagesID) : pOperationHeader.PackageTypesOnContainersTotals) : pOperationHeader.PackageTypes) + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Shipment Category: </b>' + pShipmentTypeCode + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Shipment Term: </b>' + pIncotermName + '</div>';
                    if (pDefaults.UnEditableCompanyName == "ILS" || pDefaults.UnEditableCompanyName == "ILSEG") {
                        ReportHTML += '             <div class="col-xs-6"><b>Booking: </b>' + (pOperationHeader.BookingNumbers == 0 ? "" : pOperationHeader.BookingNumbers) + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>ACID No: </b>' + (pOperationHeader.ACIDNumber == 0 ? "" : pOperationHeader.ACIDNumber) + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Incoterm: </b>' + (pOperationHeader.IncotermName == 0 ? "" : pOperationHeader.IncotermName) + '</div>';
                        ReportHTML += '         <div class="col-xs-6"><b>Certificate Number: </b>' + (pOperationHeader.CertificateNumber == 0 ? "" : pOperationHeader.CertificateNumber) + '</div>';
                        ReportHTML += '         <div class="col-xs-6"><b>Line: </b>' + ((pDefaults.UnEditableCompanyName == "CAP") ? (pOperationHeader.ShippingLineName == 0 ? "" : pOperationHeader.ShippingLineName) : (pOperationHeader.LineName == 0 ? "" : pOperationHeader.LineName)) + '</div>';
                    }
                    if (pDefaults.UnEditableCompanyName != "FEL")
                        ReportHTML += '             <div class="col-xs-6"><b>Commodity: </b>' + (pOperationHeader.CommodityName == 0 ? "" : pOperationHeader.CommodityName) + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Shipper: </b>' + pShipperName + '</div>';
                    if (pDefaults.UnEditableCompanyName != "SEA")
                        ReportHTML += '             <div class="col-xs-6"><b>Consignee: </b>' + pConsigneeName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>' + (pDefaults.UnEditableCompanyName == "BAK" ? "Gross " : "") + 'Weight: </b>' + pGrossWeightSum + ' KGM' + '</div>';
                    if (pDefaults.UnEditableCompanyName == "MIL" || pDefaults.UnEditableCompanyName == "BAK" || pDefaults.UnEditableCompanyName == "NIS")
                        ReportHTML += '             <div class="col-xs-6"><b>Line: </b>' + (pOperationHeader.LineName == 0 ? "" : pOperationHeader.LineName) + '</div>';
                    if (pOperationHeader.CertificateNumber != 0)
                        ReportHTML += '         <div class="col-xs-6"><b>Certificate No: </b>' + (pOperationHeader.CertificateNumber == 0 ? "" : pOperationHeader.CertificateNumber) + '</div>';
                    if (pDefaults.UnEditableCompanyName == "BAK") {
                        if (pCustomsClearance != null) {
                            ReportHTML += '         <div class="col-xs-6"><b>Clearance Type: </b>' + (pCustomsClearance.CC_ClearanceTypeName == 0 ? "" : pCustomsClearance.CC_ClearanceTypeName) + '</div>';
                            ReportHTML += '         <div class="col-xs-6"><b>Certificate Date: </b>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pCustomsClearance.CertificateDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pCustomsClearance.CertificateDate))) + '</div>';
                        }
                        ReportHTML += '         <div class="col-xs-6"><b>Country of Origin: </b>' + (pInvoiceHeader.LeftSignature == 0 ? "" : pInvoiceHeader.LeftSignature) + '</div>';
                    }
                    if (pDefaults.UnEditableCompanyName == "AOL" || pDefaults.UnEditableCompanyName == "FEL" || pDefaults.UnEditableCompanyName == "TEU" || pDefaults.UnEditableCompanyName == "BED")
                        ReportHTML += '         <div class="col-xs-6"><b>PO Number: </b>' + (pOperationHeader.PONumber == 0 ? "" : pOperationHeader.PONumber) + '</div>';
                    if (pDefaults.UnEditableCompanyName == "AOL")
                        ReportHTML += '         <div class="col-xs-6"><b>GAFFI No: </b>' + (pOperationHeader.DispatchNumber == 0 ? "" : pOperationHeader.DispatchNumber) + '</div>';
                    if (pOperationHeader.CustomerReference != 0 && pDefaults.UnEditableCompanyName != "SEA")
                        ReportHTML += '         <div class="col-xs-6"><b>Customer Ref: </b>' + (pOperationHeader.CustomerReference == 0 ? "" : pOperationHeader.CustomerReference) + '</div>';
                    if (pDefaults.UnEditableCompanyName == "TEU" || pDefaults.UnEditableCompanyName == "DYN" || pDefaults.UnEditableCompanyName == "MIL" || pDefaults.UnEditableCompanyName == "BAK" || pDefaults.UnEditableCompanyName == "NIS")
                        ReportHTML += '             <div class="col-xs-6"><b>ChargeableWeight: </b>' + pOperationHeader.ChargeableWeightSum + ' KGM' + '</div>';
                    if ((pOperationHeader.ShipmentType == constLCLShipmentType && pDefaults.UnEditableCompanyName == "MIL")
                        || pDefaults.UnEditableCompanyName == "TEU" || pDefaults.UnEditableCompanyName == "TMP"
                        || pDefaults.UnEditableCompanyName == "GCS")
                        ReportHTML += '             <div class="col-xs-6"><b>Volume: </b>' + pCBM + ' CBM</div>';
                    if (pDefaults.UnEditableCompanyName == "ASL" || pDefaults.UnEditableCompanyName == "TEU")
                        ReportHTML += '             <div class="col-xs-6"><b>ACID No: </b>' + (pOperationHeader.ACIDNumber == 0 ? "" : pOperationHeader.ACIDNumber) + '</div>';
                    if (pDefaults.UnEditableCompanyName == "OCE" || pDefaults.UnEditableCompanyName == "CHM") {
                        ReportHTML += '             <div class="col-xs-6"><b>Tank: </b>' + (pInvoiceItem.length > 0 && pInvoiceItem[0].TankOrFlexiNumber != 0 ? pInvoiceItem[0].TankOrFlexiNumber : pTankOrFlexiNumbers) + '</div>';
                    }
                    if (pDefaults.UnEditableCompanyName == "DGL" || pDefaults.UnEditableCompanyName == "BAD"
                        || pDefaults.UnEditableCompanyName == "OCE" || pDefaults.UnEditableCompanyName == "CHM")
                        ReportHTML += '             <div class="col-xs-6"><b>Notes: </b>' + (pInvoiceHeader.MiddleSignature == 0 ? "" : pInvoiceHeader.MiddleSignature) + '</div>';
                    if (pDefaults.UnEditableCompanyName == "FEL")
                        ReportHTML += '             <div class="col-xs-12">&emsp;<br></div>';
                    ReportHTML += '                     <div class="col-xs-12 clear">';
                    ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    if (pDefaults.UnEditableCompanyName == "ACS" || pDefaults.UnEditableCompanyName == "NIS") {
                        ReportHTML += '                                     <th style="width:80%;">Description</th>';
                        ReportHTML += '                                     <th>Sale Price</th>';
                    }
                    else {
                        if (pDefaults.UnEditableCompanyName == "BAD")
                            ReportHTML += '                                     <th>Ser.</th>';
                        ReportHTML += '                                     <th style="width:55%;">Description</th>';
                        if (pDefaults.UnEditableCompanyName != "BAK"
                            && !(pDefaults.UnEditableCompanyName == "COS" && pClientHeader.IsExternal)) {
                            ReportHTML += '                                     <th>Qty</th>';
                            ReportHTML += '                                     <th>Unit Price</th>';
                        }
                        ReportHTML += '                                     <th>Sale Price</th>';
                    }
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    $.each(JSON.parse(data[2]), function (i, item) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        if (pDefaults.UnEditableCompanyName == "ACS" || pDefaults.UnEditableCompanyName == "NIS") {
                            ReportHTML += '                                         <td style="text-align:left;">' + item.ChargeTypeName + ($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 ? (" - " + item.Notes) : "") + '</td>';
                            ReportHTML += '                                         <td>' + item.SaleAmount.toFixed(2) + '</td>';
                        }
                        else {
                            if (pDefaults.UnEditableCompanyName == "BAD")
                                ReportHTML += '                                         <td>' + (i + 1) + '</td>';
                            if (pDefaults.UnEditableCompanyName == "TEL")
                                ReportHTML += '                                         <td style="text-align:left;">' + (item.Notes == 0 ? (item.ChargeTypeName == 0 ? "" : item.ChargeTypeName) : item.Notes) + '</td>';
                            else
                                ReportHTML += '                                         <td style="text-align:left;">' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                            if (pDefaults.UnEditableCompanyName != "BAK"
                                && !(pDefaults.UnEditableCompanyName == "COS" && pClientHeader.IsExternal)) {
                                ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                                ReportHTML += '                                         <td>' + item.SalePrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            }
                            ReportHTML += '                                         <td>' + item.SaleAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        }
                        ReportHTML += '                                     </tr>';
                    });
                    if (pInvoiceHeader.FixedDiscount > 0) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        if (pDefaults.UnEditableCompanyName == "BAD")
                            ReportHTML += '                                         <td>' + '' + '</td>';
                        ReportHTML += '                                         <td style="text-align:left;">' + (pDefaults.UnEditableCompanyName == "BAK" ? 'Deductive Amount' : 'Special Discount') + '</td>';
                        if (pDefaults.UnEditableCompanyName != "BAK"
                            && !(pDefaults.UnEditableCompanyName == "COS" && pClientHeader.IsExternal)) {
                            ReportHTML += '                                         <td>' + '' + '</td>';
                            ReportHTML += '                                         <td>' + '' + '</td>';
                        }
                        ReportHTML += '                                         <td>' + '-' + pInvoiceHeader.FixedDiscount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        ReportHTML += '                                     </tr>';
                    }
                    //ReportHTML += '                                         <tr>';
                    //ReportHTML += '                                             <td colspan=2>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                             <td><b>' + pInvoiceHeader.Amount + '</b></td>';
                    //ReportHTML += '                                             <td>' + pInvoiceHeader.CurrencyCode + '</td>';
                    //ReportHTML += '                                         </tr>';
                    //$("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")

                    //ReportHTML += '                                         <tr>';
                    //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.Amount) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                             <td><b>Total Amount : ' + pInvoiceHeader.Amount + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                    //ReportHTML += '                                         </tr>';
                    if (pDefaults.UnEditableCompanyName == "FEL") {
                        if (pTaxAmount == 0 && pDiscountAmount == 0) { //In this case AmountWithoutVAT is the total amount
                            ReportHTML += '                                         <tr>';
                            ReportHTML += '                                             <td style="text-align:left;" colspan=3>' + '<b>ONLY : ' + toWords_WithFractionNumbers(pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                            ReportHTML += '                                             <td style=""><b>' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                            ReportHTML += '                                         </tr>';
                        } //if (pTaxAmount != 0 || pDiscountAmount != 0)
                        if (pTaxAmount != 0) {
                            ReportHTML += '                                         <tr>';
                            ReportHTML += '                                             <td style="text-align:left;" colspan=3>' + '<b>VAT (' + pTaxTypeName + ') </b></td>';
                            ReportHTML += '                                             <td style=""><b>' + pTaxAmount.toFixed(2) + '</b></td>';
                            ReportHTML += '                                         </tr>';
                        }
                        if (pDiscountAmount != 0) {
                            ReportHTML += '                                         <tr>';
                            ReportHTML += '                                             <td style="text-align:left;" colspan=3>' + '<b>Discount (' + pDiscountTypeName + ')</b></td>';
                            ReportHTML += '                                             <td style=""><b>' + pDiscountAmount.toFixed(2) + '</b></td>';
                            ReportHTML += '                                         </tr>';
                        }
                        if (pTaxAmount != 0 || pDiscountAmount != 0) {
                            ReportHTML += '                                         <tr>';
                            ReportHTML += '                                             <td style="text-align:left;" colspan=3>' + '<b>ONLY : ' + toWords_WithFractionNumbers(parseFloat(pInvoiceHeader.Amount).toFixed(2)) + ' ' + pInvoiceHeader.CurrencyCode + '</b></td>';
                            ReportHTML += '                                             <td style=""><b>' + parseFloat(pInvoiceHeader.Amount).toFixed(2) + '</b></td>';
                            ReportHTML += '                                         </tr>';
                        }
                    } //if (pDefaults.UnEditableCompanyName == "FEL") {
                    ReportHTML += '                             </tbody>';
                    ReportHTML += '                         </table>';
                    ReportHTML += '                     </div>'

                    if ($("#cbLargeInvoice").prop("checked")) {
                        ReportHTML += '         <div class="col-xs-12 m-t-n">Please, see attachment.</div>';
                        ReportHTML += '         <div class="break"></div>';
                    }
                    else
                        ReportHTML += '                         <div class="row"></div>';
                    if (pDefaults.UnEditableCompanyName == "FEL")
                        ReportHTML += '             <div class="col-xs-12">&emsp;<br></div>';
                    ReportHTML += '                         <div class="col-xs-8 m-t-n" style="' + (pDefaultsRow.UnEditableCompanyName == "FEL" ? "font-size:12px;" : "") + '">';
                    if ($("#cbPrintBankDetailsFromDefaults").prop("checked") || pDefaults.UnEditableCompanyName == "TEU") {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + (pDefaults.UnEditableCompanyName == "QUI" ? (" " + pDefaults.CompanyName) : "") + '</br>';
                        ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                        ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                        ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                        ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                        ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                    }
                    //kk: added 2nd condition
                    else if ($("#cbPrintBankDetailsFromTemplate").prop("checked") && pDefaults.UnEditableCompanyName != "DGL") {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + (pDefaults.UnEditableCompanyName == "QUI" ? (" " + pDefaults.CompanyName) : "") + '</br>';
                        ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                    }
                    else
                        ReportHTML += '                             <br>';
                    ReportHTML += '                         </div>';
                    ReportHTML += '                         <div class="col-xs-4 text-right m-t-n ' + (pDefaults.UnEditableCompanyName == "FEL" ? "hide" : "") + '">';
                    if (pTaxAmount != 0 || pDiscountAmount != 0)
                        ReportHTML += '                             <b>Subtotal: </b>' + pInvoiceHeader.CurrencyCode + ' ' + pInvoiceHeader.AmountWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                    //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + pInvoiceHeader.TaxPercentage + '</br>';
                    if (pTaxAmount != 0 || pInvoiceHeader.TaxTypeID != 0) {
                        if (pDefaults.UnEditableCompanyName == "ALL" && pTaxAmount == 0)
                            ReportHTML += '                             0% VAT-Table II, item b1 Law OB 1968' + '</br>';
                        else
                            ReportHTML += '                             <b>VAT(' + pInvoiceHeader.TaxPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pTaxAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                    }
                    //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + pInvoiceHeader.DiscountPercentage + '</br>';
                    if (pDiscountAmount != 0) {
                        if (pDefaults.UnEditableCompanyName == "AOL")
                            ReportHTML += '                             <b>Deducted Tax(' + pInvoiceHeader.DiscountPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pDiscountAmount.toFixed(2) + '</br>';
                        else if (pDefaults.UnEditableCompanyName == "TEU" && parseInt(pInvoiceHeader.DiscountPercentage) == 3)
                            ReportHTML += '                             <b>Withholding Tax(' + pInvoiceHeader.DiscountPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pDiscountAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                        else
                            ReportHTML += '                             <b>' + (pDefaults.UnEditableCompanyName == "ASL" || pDefaults.UnEditableCompanyName == "COS" ? "Withholding Tax" : "Discount") + '(' + pInvoiceHeader.DiscountPercentage + '%): </b>' + pInvoiceHeader.CurrencyCode + ' ' + pDiscountAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                    }
                    ReportHTML += '                             <b>Total: </b>' + pInvoiceHeader.CurrencyCode + ' <b>' + parseFloat(pInvoiceHeader.Amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></br>';
                    ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(parseFloat(pInvoiceHeader.Amount).toFixed(2)) + ' ' + pInvoiceHeader.CurrencyCode + '</br>';
                    if ($("#cbPrintUSDTotal").prop("checked") && pInvoiceHeader.CurrencyCode.trim() == "EGP")
                        ReportHTML += '                             <b>USD Total: </b>' + ' <b>' + (pInvoiceHeader.Amount / $("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")).toFixed(2) + '</b></br>';
                    ReportHTML += '                         </div>';

                    //ReportHTML += '                     </div>'; //of table-responsive
                    //ReportHTML += '                 </section>';
                    //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                    ReportHTML += '             </div>'; //
                    ReportHTML += '         </body>';
                    ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftPosition != 0 ? pDefaultsRow.InvoiceLeftPosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddlePosition != 0 ? pDefaultsRow.InvoiceMiddlePosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightPosition != 0 ? pDefaultsRow.InvoiceRightPosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                 </div>'
                    ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaultsRow.InvoiceLeftSignature != 0 ? pDefaultsRow.InvoiceLeftSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaultsRow.InvoiceMiddleSignature != 0 ? pDefaultsRow.InvoiceMiddleSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaultsRow.InvoiceRightSignature != 0 ? pDefaultsRow.InvoiceRightSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                 </div>'
                    if ($("#cbPrintStamp").prop("checked"))
                        ReportHTML += '         <div class="text-right m-r-lg"><img src="/Content/Images/CompanyStamp.jpg" alt="stamp"/></div>';

                    if (pDefaults.UnEditableCompanyName == "TEL") {
                        ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                        ReportHTML += '                     <div class="col-xs-3 m-t"><b>' + 'Financial Manager' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-2 m-t text-center"><b>' + '&emsp;' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + '&emsp;' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-3 m-t text-center"><b>' + 'Auditor' + '</b></div>';
                        ReportHTML += '                 </div>'
                        ReportHTML += '                 <div class="m-t" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                        ReportHTML += '                     <div class="col-xs-3 m-t-sm"><b>' + '&emsp;' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-2 m-t-sm text-center"><b>' + '&emsp;' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-4 m-t-sm text-center"><b>' + '&emsp;' + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-3 m-t-sm text-center">' + '&emsp;' + '</div>';
                        ReportHTML += '                 </div>'
                    }
                    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                    //kk
                    if ($("#cbPrintBankDetailsFromTemplate").prop("checked") && pDefaults.UnEditableCompanyName == "DGL") {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>").replace(/\ /g, "&nbsp;");
                    }

                    if (pDefaults.UnEditableCompanyName == "DYN")
                        ReportHTML += '         <div class="row m-l">' + '  Please, Issue checks with our company name داينميك لخدمات النقل  ' + '</div>';
                    if ((pDefaults.UnEditableCompanyName == "ACS" || pDefaults.UnEditableCompanyName == "ELC"/*WEF is called ELC*/)
                        && pInvoiceHeader.InvoiceTypeName == "INVOICE") {
                        ReportHTML += '         <div style="width:98%;border:1px solid #000;" class="m-t">';
                        ReportHTML += '             <div class="row text-center">' + '  The company is subject to the system of advance payments in accordance with article 62 of the income tax law  ' + '</div>';
                        ReportHTML += '             <div class="row text-center">' + '   الشركة تخضع لنظام الدفعات المقدمة طبقا  للمادة (62) من قانون الضريبة علي الدخل      ' + '</div>';
                        ReportHTML += '         </div>';
                    }
                    //ReportHTML += '         <div class="row text-right m-r m-t">' + '  يتنبه نحو عدم الخصم من تحت حساب الضريبة حيث أن الشركة تتبع نظام الدفعات المقدمة تطبيقا لأحكام لمادة (62) من القانون رقم 91 لسنة 2005  ' + '</div>';
                    //ReportHTML += '         <div class="row text-right m-r">' + '  يوقف صرف شيكات مصر للتأمين لحين تسوية التعويضات  ' + '</div>';
                    //ReportHTML += '         <div class="row text-right m-r">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
                    //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
                    //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                    //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
                    if ($("#cbPrintFooterInvoice").prop("checked"))
                        ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    else
                        ReportHTML += '         &emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>';
                    //else
                    //    ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                    if (1==1) {
                        pFinalReportHTML += ReportHTML;
                        Invoices_DrawOrSend(pOption, pFinalReportHTML, pClientHeader);
                    }
                    else {
                        pFinalReportHTML += ReportHTML;
                        pFinalReportHTML += ' <div class="break"></div>';
                    }
                } //EOF All other companies
            } //EOF else fields are complete
            if (pInvoiceHeader.IsPrintOriginal
                && (pOption == "Print" || pOption == undefined || pOption == null)) {
                CallGETFunctionWithParameters("/api/Invoices/SetIsPrintOriginal"
                    , { pInvoiceIDToSetPrintOriginal: pInvoiceHeader.ID, pIsPrintOriginal: false }
                    , function () { FadePageCover(false); }
                    , null);
            }
            else if (pOption == "Print" || pOption == undefined || pOption == null)
                FadePageCover(false);

        }


    );
}
function Invoices_PrintBankDetailsOptionChanged() {
    debugger;
    if ($("#cbPrintBankDetailsFromTemplate").prop("checked"))
        $("#slBankTemplate").removeClass("hide");
    else
        $("#slBankTemplate").addClass("hide");
}

function Invoices_DrawOrSend(pOption, ReportHTML, pClientHeader) {
    debugger;
    //ReportHTML_Multi += ReportHTML;
    //ReportHTML_Multi += ' <div class="break"></div>';
    if (pOption == "Print" || pOption == undefined || pOption == null) {
        var mywindow = window.open('', '_blank');
        mywindow.document.write(ReportHTML);
        mywindow.document.close();
    }
    else if (pOption == "Email") {
        if (pClientHeader.Email != "0" && pClientHeader.Email != "")
            SendPDFEmail_General("Invoice", pClientHeader.Email, ReportHTML, "Invoice", null);
        else {
            swal("Sorry", "Please, check receiver email.");
            FadePageCover(false);
        }
    }
}
