var maxPricingIDInTable = 0; //used to for when adding new row then make td control names unique
$('.classApplyFilter').on('keypress', function (args) {
    if (args.keyCode == 13) {
        $("#btnFilterApply").click();
        return false;
    }
});
function Pricing_Initialize(pUserID, pRoleID) {
    debugger;
    UnLoadOperationsSubMenu();
    Operations_ClearFilters();
    Quotations_ClearFilters();
    if (pUserID != undefined && pUserID != null) { //to give permissions for case of opened from alarm
        $("#hf_CanAdd").val(1);
        $("#hf_CanDelete").val(1);
        $("#hf_CanEdit").val(1);
    }
    if (pRoleID != null && pRoleID != undefined)
        intPricingType = pRoleID;
    else
        intPricingType = constPricingOcean;
    strBindTableRowsFunctionName = "Pricing_BindTableRows";
    strLoadWithPagingFunctionName = "/api/Pricing/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    LoadView("/Pricing/Pricing", "div-content", function () {
        if (pDefaults.UnEditableCompanyName == "GBL" && pLoggedUser.Name != "ADMIN") {
            if (pLoggedUser.DepartmentName == "CLEARANCE") {
                $("#liPricingOcean").addClass("hide");
                $("#liPricingAir").addClass("hide");
                $("#liPricingInland").addClass("hide");
                if (pRoleID != null && pRoleID != undefined && pRoleID != constPricingOcean && pRoleID != constPricingAir && pRoleID != constPricingInland)
                    intPricingType = pRoleID; //from alarm
                else
                    intPricingType = constPricingCustomsClearance;
            }
            else if (pLoggedUser.DepartmentName == "TRANSPORTATION") {
                $("#liPricingOcean").addClass("hide");
                $("#liPricingAir").addClass("hide");
                $("#liPricingCustomsClearance").addClass("hide");
                if (pRoleID != null && pRoleID != undefined && pRoleID != constPricingOcean && pRoleID != constPricingAir && pRoleID != constPricingCustomsClearance)
                    intPricingType = pRoleID; //from alarm
                else
                    intPricingType = constPricingInland;
            }
            else if (pLoggedUser.DepartmentName == "FREIGHT") {
                $("#liPricingInland").addClass("hide");
                $("#liPricingCustomsClearance").addClass("hide");
                if (pRoleID != null && pRoleID != undefined && pRoleID != constPricingInland && pRoleID != constPricingCustomsClearance)
                    intPricingType = pRoleID; //from alarm
                else
                    intPricingType = constPricingOcean;
            }
        } //if (pDefaults.UnEditableCompanyName == "GBL" && pLoggedUser.Name != "ADMIN") {
        $("#div-main-options").width($("#mainForm").width() - 185);
        $("#divTblPricing").height($("#mainForm").height() - 360);
        if (glbCallingControl == "PricingRequest") {
            $("#liPricingForm").text("Pricing Request");
            $("#h3Pricing").text("Pricing Request");
            $("#btn-Delete").attr("id", "btn-Delete-hide");
        }
        else {
            $("#liPricingForm").text("Pricing");
            $("#h3Pricing").text("Pricing");
        }

        if (intPricingType == constPricingOcean) {
            $("#aPricingOcean").parent().siblings().children().removeClass("text-ul");
            $("#aPricingOcean").addClass("text-ul");
            $("#lblPricingShown").text("(OCEAN)");
        }
        else if (intPricingType == constPricingAir) {
            $("#aPricingAir").parent().siblings().children().removeClass("text-ul");
            $("#aPricingAir").addClass("text-ul");
            $("#lblPricingShown").text("(AIR)");
        }
        else if (intPricingType == constPricingInland) {
            $("#aPricingInland").parent().siblings().children().removeClass("text-ul");
            $("#aPricingInland").addClass("text-ul");
            $("#lblPricingShown").text("(TRUCKING)");
        }
        else if (intPricingType == constPricingCustomsClearance) {
            $("#aPricingCustomsClearance").parent().siblings().children().removeClass("text-ul");
            $("#aPricingCustomsClearance").addClass("text-ul");
            $("#lblPricingShown").text("(Customs Clearance)");
        }
        else if (intPricingType == constPricingGeneral) {
            $("#aPricingGeneral").parent().siblings().children().removeClass("text-ul");
            $("#aPricingGeneral").addClass("text-ul");
            $("#lblPricingShown").text("(GENERAL)");
        }
        $("#slPricingType").val(intPricingType);
        var pWhereClause = (pUserID != undefined && pUserID != null) ? ("WHERE ID= " + pUserID) : ("WHERE PricingTypeID=" + intPricingType);
        var pOrderBy = "ID DESC"; //"SupplierName, ID DESC";
        var pPageNumber = 1;
        var pPageSize = 10;
        var pControllerParameters = { pIsReturnObjectArray: true, pPricingTypeID: intPricingType, pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy };
        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
            , function (pData) {
                var pPricing = pData[0];
                var pContainerType = pData[2];
                var pCommodity = pData[3];
                var pCountry = pData[4];
                var pSupplier = pData[5]; //The supplier is one of (ShippingLine,Airline,Trucker or CCA)
                var pPricingSettings = pData[6];
                var pPricingCharge = pData[7];
                var pSalesLead = pData[8];
                var pPackageType = pData[9];
                var pAgentList = pData[10];
                var pChargeType = pData[11];
                $("#slPricingType").val(intPricingType);
                FillListFromObject(null, 1, "<--Select-->"/*"Select Equip."*/, "slEquipment", pContainerType, null);
                FillListFromObject(null, 2, "<--Select-->"/*"Select Commodity"*/, "slCommodity", pCommodity, null);
                FillListFromObject(null, 2, "<--Select-->"/*"Select Commodity"*/, "slChargeType", pChargeType, null);
                $('#slChargeType').css({ 'width': '100%' }).select2();
                FillListFromObject(null, 2, "<--Select-->"/*"Select Country"*/, "slPOLCountry", pCountry, function () { $("#slPODCountry").html($("#slPOLCountry").html()); });
                FillListFromObject(null, 2, "<--Select-->"/*"Select Supplier"*/, "slSupplier", pSupplier, null);
                FillListFromObject(null, 2, "<--Select-->"/*"Select Agent"*/, "slAgent", pAgentList, null);
                FillListFromObject(null, 10, null, "slPricingSettings", pPricingSettings, null);
                FillListFromObject(null, 2, "<--Select-->", "slSalesLead", pSalesLead, null);
                FillListFromObject(null, 2, "<--Select-->", "slPackageType", pPackageType, null);
                $("#slCustomer").html($("#hReadySlCustomers").html());
                Pricing_BindTableRows(JSON.parse(pPricing), JSON.parse(pPricingCharge));
                ApplyPermissions();
            });
    },
        function () { Pricing_NewRow(); /*Pricing_ClearAllControls();*/ },
        function () { Pricing_DeleteList(); });
}
function Pricing_BindTableRows(pPricing, pPricingCharge) {
    debugger;
    var copyControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Copy") + "</span>";
    var NotificationControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-bell' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Notif." + "</span>";
    var LogControlsText = " class='btn btn-xs btn-rounded btn-warning float-right' > <i class='fa fa-list' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Log" + "</span>";
    $("#hl-menu-PricingModule").parent().siblings().removeClass("active");
    $("#hl-menu-PricingModule").parent().addClass("active");
    ClearAllTableRows("tblPricing");
    $("#tblPricing thead tr").html("");
    $("#tblPricing thead tr").append('<th id="HeaderDeletePricingID"><input id="cbPricingDeleteHeader" type="checkbox" /></th>');
    $("#tblPricing thead tr").append('<th class="hide">Trans.</th>');
    $("#tblPricing thead tr").append('<th>Customer</th>');
    $("#tblPricing thead tr").append('<th>CustomerRef.</th>');
    $("#tblPricing thead tr").append('<th>POLCountry</th>');
    $("#tblPricing thead tr").append('<th>POL</th>');
    $("#tblPricing thead tr").append('<th>PODCountry</th>');
    $("#tblPricing thead tr").append('<th>POD</th>');
    $("#tblPricing thead tr").append('<th>Equip</th>');
    $("#tblPricing thead tr").append('<th>Other Equip</th>');
    $("#tblPricing thead tr").append('<th>Commodity</th>');
    $("#tblPricing thead tr").append('<th>Carrier</th>');
    if (pDefaults.UnEditableCompanyName == "UNS") {
        $("#tblPricing thead tr").append('<th>Cargo Weight.</th>');
    }
    $("#tblPricing thead tr").append('<th>TT</th>');
    $("#tblPricing thead tr").append('<th>Free Time</th>');
    if (pDefaults.UnEditableCompanyName == "UNS") {

        $("#tblPricing thead tr").append('<th>Free Days POD</th>');
        $("#tblPricing thead tr").append('<th>Stuffing Location</th>');
        $("#tblPricing thead tr").append('<th>Stuffing Cut of</th>');
        $("#tblPricing thead tr").append('<th>ETA</th>');
        $("#tblPricing thead tr").append('<th>ETD</th>');
    }
    $("#tblPricing thead tr").append('<th>Agent</th>');

  
   

    $("#tblPricing thead tr").append('<th>' + (pDefaults.UnEditableCompanyName == 'SAF' ? 'FT' : 'Freq') + '</th>');

    $("#tblPricing thead tr").append('<th class="">ValidFrom</th>');
    $("#tblPricing thead tr").append('<th>ValidTo</th>');
    $("#tblPricing thead tr").append('<th>Cur</th>');
    for (var i = 1 ; i <= $("#slPricingSettings option").length; i++) {
        $("#tblPricing thead tr").append('<th>' + $("#slPricingSettings :nth-child(" + i + ")").text() + '</th>');
    }
    $("#tblPricing thead tr").append(`<th>Notes</th>`);
    $("#tblPricing thead tr").append('<th>Total</th>');
    $("#tblPricing thead tr").append('<th class="hide">Save</th>');
    $("#tblPricing thead tr").append('<th class="rounded-right"></th>');
    maxPricingIDInTable = 0;
    $.each(pPricing, function (i, item) {
        maxPricingIDInTable = (item.ID > maxPricingIDInTable ? item.ID : maxPricingIDInTable);
        var tr = "";
        //tr += "<tr ID='" + item.ID + "' ondblclick='Pricing_EditByDblClick(" + item.ID + ");' >";
        tr += "<tr ID='" + item.ID + "' class='font-bold " + (item.IsPricingRequest ? " text-primary " : "") + "'>";
        tr += "     <td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + item.ID + "' /></td>";
        tr += "     <td class='PricingID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>";
        //tr += '     <td class="PricingTypeID " val=' + item.PricingTypeID + '><select id="slPricingType' + item.ID + '" class="controlStyle" onfocus="DisableBackspaceKey(id);" onkeydown="DisableBackspaceKey(id);" onkeypress="DisableBackspaceKey(id);" onchange="Pricing_SetIsRowChanged(id); Pricing_PricingTypeChanged(' + "'" + "slPricingType" + item.ID + "','slSupplier" + item.ID + "'," + 0 + ');" data-required="false"></select></td>';
        tr += '     <td class="PricingTypeID hide" val=' + item.PricingTypeID + '><p id="cellPricingType' + item.ID + '" ondblclick="Pricing_EnterEditModeForSL(' + "'" + 'PricingType' + "'," + item.ID + ',' + item.IsPricingRequest + ');">' + (item.PricingTypeID == 0 ? "N/A" : item.PricingTypeCode) + '</p><select id="slPricingType' + item.ID + '" style="width:150px;" class="controlStyle hide" onfocus="DisableBackspaceKey(id);" onkeydown="DisableBackspaceKey(id);" onkeypress="DisableBackspaceKey(id);" onchange="Pricing_SetIsRowChanged(id); Pricing_PricingTypeChanged(' + "'" + "slPricingType" + item.ID + "','slSupplier" + item.ID + "'," + 0 + ');" data-required="false">' + "<option value=" + (item.PricingTypeID == 0 ? "" : item.PricingTypeID) + "></option>" + '</select></td>';
        tr += "     <td class='CustomerID' val='" + item.CustomerID + "'><p id='cellCustomer" + item.ID + "' ondblclick='Pricing_EnterEditModeForSL(" + '"' + "Customer" + '",' + item.ID + "," + item.IsPricingRequest + ");'>" + (item.CustomerID == 0 ? "N/A" : item.CustomerName) + "</p><select hide id='slCustomer" + item.ID + "' style='width:150px;' class='controlStyle hide' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false'>" + "<option value=" + (item.CustomerID == 0 ? "" : item.CustomerID) + "></option>" + "</select></td>";
        tr += "     <td class='CustomerReference'><p id='cellCustomerReference" + item.ID + "' ondblclick='Pricing_EnterEditModeForTxt(" + '"' + "CustomerReference" + '",' + item.ID + "," + item.IsPricingRequest + ");'>" + (item.CustomerReference == 0 ? '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;' : item.CustomerReference) + "</p><input type='text' style='width:150px; text-transform:uppercase;' id='txtCustomerReference" + item.ID + "' class='form-control controlStyle hide' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false' value='" + (item.CustomerReference == 0 ? "" : item.CustomerReference) + "' autocomplete='off'/> </td>";
        tr += '     <td class="POLCountryID" val=' + item.POLCountryID + '><p id="cellPOLCountry' + item.ID + '" ondblclick="Pricing_EnterEditModeForSL(' + "'" + 'POLCountry' + "'," + item.ID + ',' + item.IsPricingRequest + ');">' + (item.POLCountryID == 0 ? "N/A" : item.POLCountryName) + '</p><select id="slPOLCountry' + item.ID + '" style="width:150px;" class="controlStyle hide" onfocus="DisableBackspaceKey(id);" onkeydown="DisableBackspaceKey(id);" onkeypress="DisableBackspaceKey(id);" onchange="Pricing_SetIsRowChanged(id); Pricing_FillPorts(' + "'" + "slPOLCountry" + item.ID + "','slPOL" + item.ID + "'," + 0 + ');" data-required="false">' + "<option value=" + (item.POLCountryID == 0 ? "" : item.POLCountryID) + "></option>" + '</select></td>';
        tr += '     <td class="POLID" val=' + item.POLID + '><p id="cellPOL' + item.ID + '" ondblclick="Pricing_EnterEditModeForSL(' + "'" + 'POL' + "'," + item.ID + ',' + item.IsPricingRequest + ');">' + (item.POLID == 0 ? "N/A" : item.POLName) + '</p><select id="slPOL' + item.ID + '" style="width:150px;" class="controlStyle hide" onfocus="DisableBackspaceKey(id);" onkeydown="DisableBackspaceKey(id);" onkeypress="DisableBackspaceKey(id);" onchange="Pricing_SetIsRowChanged(id);" data-required="false">' + "<option value=" + (item.POLID == 0 ? "" : item.POLID) + "></option>" + '</select></td>';
        tr += '     <td class="PODCountryID" val=' + item.PODCountryID + '><p id="cellPODCountry' + item.ID + '" ondblclick="Pricing_EnterEditModeForSL(' + "'" + 'PODCountry' + "'," + item.ID + ',' + item.IsPricingRequest + ');">' + (item.PODCountryID == 0 ? "N/A" : item.PODCountryName) + '</p><select id="slPODCountry' + item.ID + '" style="width:150px;" class="controlStyle hide" onfocus="DisableBackspaceKey(id);" onkeydown="DisableBackspaceKey(id);" onkeypress="DisableBackspaceKey(id);" onchange="Pricing_SetIsRowChanged(id); Pricing_FillPorts(' + "'" + "slPODCountry" + item.ID + "','slPOD" + item.ID + "'," + 0 + ');" data-required="false">' + "<option value=" + (item.PODCountryID == 0 ? "" : item.PODCountryID) + "></option>" + '</select></td>';
        tr += '     <td class="PODID" val=' + item.PODID + '><p id="cellPOD' + item.ID + '" ondblclick="Pricing_EnterEditModeForSL(' + "'" + 'POD' + "'," + item.ID + ',' + item.IsPricingRequest + ');">' + (item.PODID == 0 ? "N/A" : item.PODName) + '</p><select id="slPOD' + item.ID + '" style="width:150px;" class="controlStyle hide" onfocus="DisableBackspaceKey(id);" onkeydown="DisableBackspaceKey(id);" onkeypress="DisableBackspaceKey(id);" onchange="Pricing_SetIsRowChanged(id);" data-required="false">' + "<option value=" + (item.PODID == 0 ? "" : item.PODID) + "></option>" + '</select></td>';

        tr += "     <td class='EquipmentID' val='" + item.EquipmentID + "'><p id='cellEquipment" + item.ID + "' ondblclick='Pricing_EnterEditModeForSL(" + '"' + "Equipment" + '",' + item.ID + "," + item.IsPricingRequest + ");'>" + (item.EquipmentID == 0 ? "N/A" : item.ContainerTypeCode) + "</p><select hide id='slEquipment" + item.ID + "' style='width:auto;' class='controlStyle hide' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false'>" + "<option value=" + (item.EquipmentID == 0 ? "" : item.EquipmentID) + "></option>" + "</select></td>";
        tr += "     <td class='PackageTypeID' val='" + item.PackageTypeID + "'><p id='cellPackageType" + item.ID + "' ondblclick='Pricing_EnterEditModeForSL(" + '"' + "PackageType" + '",' + item.ID + "," + item.IsPricingRequest + ");'>" + (item.PackageTypeID == 0 ? "N/A" : item.PackageTypeName) + "</p><select hide id='slPackageType" + item.ID + "' style='width:auto;' class='controlStyle hide' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false'>" + "<option value=" + (item.PackageTypeID == 0 ? "" : item.PackageTypeID) + "></option>" + "</select></td>";
        tr += "     <td class='CommodityID' val='" + item.CommodityID + "'><p id='cellCommodity" + item.ID + "' ondblclick='Pricing_EnterEditModeForSL(" + '"' + "Commodity" + '",' + item.ID + "," + item.IsPricingRequest + ");'>" + (item.CommodityID == 0 ? "N/A" : item.CommodityName) + "</p><select hide id='slCommodity" + item.ID + "' style='width:auto;' class='controlStyle hide' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false'>" + "<option value=" + (item.CommodityID == 0 ? "" : item.CommodityID) + "></option>" + "</select></td>";
        tr += "     <td class='SupplierID' val='" + item.SupplierID + "'><p id='cellSupplier" + item.ID + "' ondblclick='Pricing_EnterEditModeForSL(" + '"' + "Supplier" + '",' + item.ID + "," + item.IsPricingRequest + ");'>" + (item.SupplierID == 0 ? "N/A" : item.SupplierName) + "</p><select hide id='slSupplier" + item.ID + "' style='width:150px;' class='controlStyle hide' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false'>" + "<option value=" + (item.SupplierID == 0 ? "" : item.SupplierID) + "></option>" + "</select></td>";

        //********************************************************************************************* */
        if (pDefaults.UnEditableCompanyName == "UNS") {
            tr += "     <td class='GrossWeight'><p id='cellGrossWeight" + item.ID + "' ondblclick='Pricing_EnterEditModeForTxt(" + '"' + "GrossWeight" + '",' + item.ID + "," + item.IsPricingRequest + ");'>" + (item.GrossWeight) + "</p><input type='text' style='width:30px;' id='txtGrossWeight" + item.ID + "' class='form-control controlStyle hide' data-type='number'  onkeypress='CheckValueIsInteger(id);' onfocus='CheckValueIsInteger(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false' value='" + item.GrossWeight + "' /> </td>";
        }
        tr += "     <td class='TransitTime'><p id='cellTransitTime" + item.ID + "' ondblclick='Pricing_EnterEditModeForTxt(" + '"' + "TransitTime" + '",' + item.ID + "," + item.IsPricingRequest + ");'>" + (item.TransitTime) + "</p><input type='text' style='width:30px;' id='txtTransitTime" + item.ID + "' class='form-control controlStyle hide' data-type='number'  onkeypress='CheckValueIsInteger(id);' onfocus='CheckValueIsInteger(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false' value='" + item.TransitTime + "' /> </td>";
        tr += "     <td class='FreeTime'><p id='cellFreeTime" + item.ID + "' ondblclick='Pricing_EnterEditModeForTxt(" + '"' + "FreeTime" + '",' + item.ID + "," + item.IsPricingRequest + ");'>" + (item.FreeTime) + "</p><input type='text' style='width:30px;' id='txtFreeTime" + item.ID + "' class='form-control controlStyle hide' data-type='number'  onkeypress='CheckValueIsInteger(id);' onfocus='CheckValueIsInteger(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false' value='" + item.FreeTime + "' /> </td>";
        if (pDefaults.UnEditableCompanyName == "UNS") {
           
            tr += "     <td class='FreeDaysPOD'><p id='cellFreeDaysPOD" + item.ID + "' ondblclick='Pricing_EnterEditModeForTxt(" + '"' + "FreeDaysPOD" + '",' + item.ID + "," + item.IsPricingRequest + ");'>" + (item.FreeDaysPOD) + "</p><input type='text' style='width:30px;' id='txtFreeDaysPOD" + item.ID + "' class='form-control controlStyle hide' data-type='number'  onkeypress='CheckValueIsInteger(id);' onfocus='CheckValueIsInteger(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false' value='" + item.FreeDaysPOD + "' /> </td>";
            tr += "     <td class='PickupAddress'><p id='cellPickupAddress" + item.ID + "' ondblclick='Pricing_EnterEditModeForTxt(" + '"' + "PickupAddress" + '",' + item.ID + "," + item.IsPricingRequest + ");'>" + (item.PickupAddress == 0 ? '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;' : item.PickupAddress) + "</p><input type='text' style='width:150px; text-transform:uppercase;' id='txtPickupAddress" + item.ID + "' class='form-control controlStyle hide' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false' value='" + (item.PickupAddress == 0 ? "" : item.PickupAddress) + "' autocomplete='off'/> </td>";
            tr += '     <td class="StuffingCutOf"><p id="cellStuffingCutOf' + item.ID + '" ondblclick="Pricing_EnterEditModeForTxt(' + "'" + 'StuffingCutOf' + "'," + item.ID + ',' + item.IsPricingRequest + ');">' + (ConvertDateFormat(GetDateWithFormatMDY(item.StuffingCutOf))) + '</p><input id="txtStuffingCutOf' + item.ID + '" style="width:85px;height:100%;" readonly="readonly" type="text" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" onchange="Pricing_SetIsRowChanged(id);" style="background-color:white; cursor:text;" class="input-sm datepicker-input form-control hide" data-date-format="dd/mm/yyyy" placeholder="Select Date" value="' + ConvertDateFormat(GetDateWithFormatMDY(item.StuffingCutOf)) + '" /></td>';
            tr += '     <td class="ETA"><p id="cellETA' + item.ID + '" ondblclick="Pricing_EnterEditModeForTxt(' + "'" + 'ETA' + "'," + item.ID + ',' + item.IsPricingRequest + ');">' + (ConvertDateFormat(GetDateWithFormatMDY(item.ETA))) + '</p><input id="txtETA' + item.ID + '" style="width:85px;height:100%;" readonly="readonly" type="text" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" onchange="Pricing_SetIsRowChanged(id);" style="background-color:white; cursor:text;" class="input-sm datepicker-input form-control hide" data-date-format="dd/mm/yyyy" placeholder="Select Date" value="' + ConvertDateFormat(GetDateWithFormatMDY(item.ETA)) + '" /></td>';
            tr += '     <td class="ETD"><p id="cellETD' + item.ID + '" ondblclick="Pricing_EnterEditModeForTxt(' + "'" + 'ETD' + "'," + item.ID + ',' + item.IsPricingRequest + ');">' + (ConvertDateFormat(GetDateWithFormatMDY(item.ETD))) + '</p><input id="txtETA' + item.ID + '" style="width:85px;height:100%;" readonly="readonly" type="text" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" onchange="Pricing_SetIsRowChanged(id);" style="background-color:white; cursor:text;" class="input-sm datepicker-input form-control hide" data-date-format="dd/mm/yyyy" placeholder="Select Date" value="' + ConvertDateFormat(GetDateWithFormatMDY(item.ETD)) + '" /></td>';
           


        }
        //********************************************************************************************* */

        tr += "     <td class='AgentID' val='" + item.AgentID + "'><p id='cellAgent" + item.ID + "' ondblclick='Pricing_EnterEditModeForSL(" + '"' + "Agent" + '",' + item.ID + "," + item.IsPricingRequest + ");'>" + (item.AgentID == 0 ? "N/A" : item.AgentName) + "</p><select hide id='slAgent" + item.ID + "' style='width:150px;' class='controlStyle hide' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false'>" + "<option value=" + (item.AgentID == 0 ? "" : item.AgentID) + "></option>" + "</select></td>";
      
      
      
        tr += "     <td class='Frequency'><p id='cellFrequency" + item.ID + "' ondblclick='Pricing_EnterEditModeForTxt(" + '"' + "Frequency" + '",' + item.ID + "," + item.IsPricingRequest + ");'>" + (item.Frequency) + "</p><input type='text' style='width:30px;' id='txtFrequency" + item.ID + "' class='form-control controlStyle hide' data-type='number'  onkeypress='CheckValueIsInteger(id);' onfocus='CheckValueIsInteger(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false' value='" + item.Frequency + "' /> </td>";

        tr += "     <td class='FrequencyNotes hide'><p id='cellFrequencyNotes" + item.ID + "' ondblclick='Pricing_EnterEditModeForTxt(" + '"' + "FrequencyNotes" + '",' + item.ID + "," + item.IsPricingRequest + ");'>" + (item.FrequencyNotes == 0 ? " " : item.FrequencyNotes) + "</p><input type='text' style='width:30px;' id='txtFrequencyNotes" + item.ID + "' class='form-control controlStyle hide' data-type='number'  onkeypress='CheckValueIsInteger(id);' onfocus='CheckValueIsInteger(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false' value='" + item.FrequencyNotes + "' /> </td>";
        tr += '     <td class="ValidFrom"><p id="cellValidFrom' + item.ID + '" ondblclick="Pricing_EnterEditModeForTxt(' + "'" + 'ValidFrom' + "'," + item.ID + ',' + item.IsPricingRequest + ');">' + (ConvertDateFormat(GetDateWithFormatMDY(item.ValidFrom))) + '</p><input id="txtValidFrom' + item.ID + '" style="width:85px;height:100%;" readonly="readonly" type="text" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" onchange="Pricing_SetIsRowChanged(id);" style="background-color:white; cursor:text;" class="input-sm datepicker-input form-control hide" data-date-format="dd/mm/yyyy" placeholder="Select Date" value="' + ConvertDateFormat(GetDateWithFormatMDY(item.ValidFrom)) + '" /></td>';
        tr += '     <td class="ValidTo"><p id="cellValidTo' + item.ID + '" ondblclick="Pricing_EnterEditModeForTxt(' + "'" + 'ValidTo' + "'," + item.ID + ',' + item.IsPricingRequest + ');">' + (ConvertDateFormat(GetDateWithFormatMDY(item.ValidTo))) + '</p><input id="txtValidTo' + item.ID + '" style="width:85px;height:100%;" readonly="readonly" type="text" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" onchange="Pricing_SetIsRowChanged(id);" style="background-color:white; cursor:text;" class="input-sm datepicker-input form-control hide" data-date-format="dd/mm/yyyy" placeholder="Select Date" value="' + ConvertDateFormat(GetDateWithFormatMDY(item.ValidTo)) + '" /></td>';
        tr += "     <td class='CurrencyID' val='" + item.CurrencyID + "'><p id='cellCurrency" + item.ID + "' ondblclick='Pricing_EnterEditModeForSL(" + '"' + "Currency" + '",' + item.ID + "," + item.IsPricingRequest + ");'>" + (item.CurrencyID == 0 ? "N/A" : item.CurrencyCode) + "</p><select hide id='slCurrency" + item.ID + "' style='width:auto;' class='controlStyle hide' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false'>" + "<option value=" + (item.CurrencyID == 0 ? "" : item.CurrencyID) + "></option>" + "</select></td>";

        var _TotalRow = 0;
        for (var i = 1 ; i <= $("#slPricingSettings option").length; i++) {
            var pChargeTypeName = $("#slPricingSettings :nth-child(" + i + ")").text();
            var pChargeTypeID = $("#slPricingSettings :nth-child(" + i + ")").val();
            var pPricingChargeID = pPricingCharge.find(x => x.PricingID == item.ID && x.ChargeTypeID == pChargeTypeID) == undefined ? 0 : pPricingCharge.find(x => x.PricingID === item.ID && x.ChargeTypeID == pChargeTypeID).ID;
            var pCostPrice = pPricingCharge.find(x => x.PricingID == item.ID && x.ChargeTypeID == pChargeTypeID) == undefined ? 0 : pPricingCharge.find(x => x.PricingID === item.ID && x.ChargeTypeID == pChargeTypeID).CostPrice;
            //var pChargeTypeNameWithOnlyCharsAndNos = pChargeTypeName.replace(/\s/g, "").replace(/\//g, '').replace(/\\/g, '').replace(/&/g, '').replace(/%/g, '').replace(/\$/g, '').replace(/\(/g, '').replace(/\)/g, ''); //remove spaces,slashes,backslashes
            var pChargeTypeNameWithOnlyCharsAndNos = pChargeTypeName.replace(/[^\w]/g, '') + pChargeTypeID;
            tr += "     <td class='" + pChargeTypeNameWithOnlyCharsAndNos + "'><p id='cell" + pChargeTypeNameWithOnlyCharsAndNos + item.ID + "' ondblclick='Pricing_EnterEditModeForTxt(" + '"' + pChargeTypeNameWithOnlyCharsAndNos + '",' + item.ID + ");'>" + pCostPrice + "</p><input type='text' style='width:60px;' id='txt" + pChargeTypeNameWithOnlyCharsAndNos + item.ID + "' PricingChargeID=" + pPricingChargeID + " class='form-control controlStyle hide' data-type='number' onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false' value='" + pCostPrice.toFixed(2) + "' /> </td>";
            _TotalRow += pCostPrice;
        }

        tr += "     <td class='Notes'><p id='cellNotes" + item.ID + "' ondblclick='Pricing_EnterEditModeForTxt(" + '"' + "Notes" + '",' + item.ID + "," + item.IsPricingRequest + ");'>" + (item.Notes == 0 ? '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;' : item.Notes) + "</p><input type='text' style='width:700px; text-transform:uppercase;' id='txtNotes" + item.ID + "' class='form-control controlStyle hide' onkeypress='DisableEnterKey(id);' maxlength='250px;' onfocus='DisableEnterKey(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false' value='" + (item.Notes == 0 ? "" : item.Notes) + "' autocomplete='off'/> </td>";
        tr += "     <td class='TotalRow'>" + _TotalRow.toFixed(2) + "</td>";
        tr += "     <td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate' id='SelectedIDsToUpdate" + item.ID + "' type='checkbox' value='" + item.ID + "' /></td>";
        tr += "     <td class=''>"
                        + (1 == 1 /*glbCallingControl == "PricingForm"*/
                            ? ("<a href='#' onclick='Pricing_CopyRow(" + item.ID + ");' " + copyControlsText + "</a>")
                            : ""
                          )
                        + ("<a href='#' onclick='Pricing_Notify(" + item.ID + ");' " + NotificationControlsText + "</a>")
                        + ("<a href='#' onclick='Pricing_PrintLog(" + item.ID + ");' " + LogControlsText + "</a>")

                        //+ "<a href='#'" + " onclick='Routings_UpdateOperationFromQuotation(" + item.ID + ");' " + createOperationControlsText + "</a>"
                  + "</td>";
        tr += "</tr>";
        AppendRowtoTable("tblPricing", tr
                    ////+ "<td class='hide'><a onclick='Rates_Logs_LoadWithPaging(" + item.ID + ");' " + LogsControlsText + "</a></td>"
                    ////+ ($("#hIsOperationDisabled").val() == false
                    ////    ? "<td class=''><a onclick='Rates_Print(" + item.ID + ",3);' " + printControlsText + "</a></td>"
                    ////    : "<td></td>")
                    ////+ "<td class=''><a onclick='Rates_Print(" + item.ID + ",3);' " + printControlsText + "</a></td>"
                    );
    });

    $.each(pPricing, function (i, item) {
        debugger;
        $("#slPricingType" + item.ID).html($("#slPricingType").html());
        $("#slPricingType" + item.ID).val(item.PricingTypeID == 0 ? "" : item.PricingTypeID);

        //$("#slSupplier" + item.ID).html($("#slSupplier").html());
        //$("#slSupplier" + item.ID).val(item.SupplierID == 0 ? "" : item.SupplierID);
        //$("#slSupplier" + item.ID).html("<option value=" + item.SupplierID + "></option>");

        //$("#slPOLCountry" + item.ID).html($("#slPOLCountry").html());
        //$("#slPOLCountry" + item.ID).val(item.POLCountryID == 0 ? "" : item.POLCountryID);
        //$("#slPODCountry" + item.ID).html($("#slPODCountry").html());
        //$("#slPODCountry" + item.ID).val(item.PODCountryID == 0 ? "" : item.PODCountryID);
        //$("#slEquipment" + item.ID).html($("#slEquipment").html());
        //$("#slEquipment" + item.ID).val(item.EquipmentID == 0 ? "" : item.EquipmentID);
        //$("#slCommodity" + item.ID).html($("#slCommodity").html());
        //$("#slCommodity" + item.ID).val(item.CommodityID == 0 ? "" : item.CommodityID);
        $("#slCurrency" + item.ID).html($("#hReadySlCurrencies").html()); //to get the exchangerate
        $("#slCurrency" + item.ID).val(item.CurrencyID == 0 ? "" : item.CurrencyID);
        //Pricing_PricingTypeChanged("slPricingType" + item.ID, "slSupplier" + item.ID, item.SupplierID);
        //Pricing_FillPorts("slPOLCountry" + item.ID, "slPOL" + item.ID, item.POLID);
        //Pricing_FillPorts("slPODCountry" + item.ID, "slPOD" + item.ID, item.PODID);

    });
    SetDatepickerFormat();
    //ApplyPermissions();
    BindAllCheckboxonTable("tblPricing", "PricingID", "cbPricingDeleteHeader");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    CheckAllCheckbox("HeaderDeletePricingID");
    HighlightText("#tblPricing>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function Pricing_EnterEditModeForSL(pControlID, pRowID, pIsPricingRequest) {
    debugger;
    if ($("#hf_CanEdit").val() == "1"
            && (pIsPricingRequest || glbCallingControl == "PricingForm")
        ) {
        var tr = $("#tblPricing tr[ID='" + pRowID + "']");
        var pItemID = $(tr).find("td." + pControlID + "ID").attr("val");
        $("#cell" + pControlID + pRowID).addClass("hide"); $("#sl" + pControlID + pRowID).removeClass("hide");
        if (pControlID != "Currency") { //i fill it up to handle saving the exchangerate incase of its not changed
            $("#sl" + pControlID + pRowID).html($("#sl" + pControlID).html());
            $("#sl" + pControlID + pRowID).val(pItemID == 0 ? "" : pItemID);
        }
        if (pControlID == "POLCountry" || pControlID == "POL") {
            $("#cellPOL" + pRowID).addClass("hide"); $("#slPOL" + pRowID).removeClass("hide");
            var pPOLID = $(tr).find("td.POLID").attr("val");
            Pricing_FillPorts("slPOLCountry" + pRowID, "slPOL" + pRowID, pPOLID);
        }
        else if (pControlID == "PODCountry" || pControlID == "POD") {
            $("#cellPOD" + pRowID).addClass("hide"); $("#slPOD" + pRowID).removeClass("hide");
            var pPODID = $(tr).find("td.PODID").attr("val");
            Pricing_FillPorts("slPODCountry" + pRowID, "slPOD" + pRowID, pPODID);
        }
        else if (pControlID == "PricingType") {
            $("#cellSupplier" + pRowID).addClass("hide"); $("#slSupplier" + pRowID).removeClass("hide");
            var pSupplierID = $(tr).find("td.SupplierID").attr("val");
            Pricing_PricingTypeChanged("slPricingType" + pRowID, "slSupplier" + pRowID, pSupplierID);
        }
    }
}
function Pricing_EnterEditModeForTxt(pControlID, pRowID, pIsPricingRequest) {
    debugger;
    if ($("#hf_CanEdit").val() == "1"
            && (pIsPricingRequest || glbCallingControl == "PricingForm")
        ) {
        //var tr = $("#tblPricing tr[ID='" + pRowID + "']");
        //var pItemID = $(tr).find("td." + pControlID + "ID").text();
        $("#cell" + pControlID + pRowID).addClass("hide"); $("#txt" + pControlID + pRowID).removeClass("hide");
    }
}
function Pricing_NewRow() {
    debugger;
    ++maxPricingIDInTable;
    var copyControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Copy") + "</span>";
    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var dateValidTo = Date.prototype.addDays(ConvertDateFormat(FormattedTodaysDate), 30);
    var tr = "";
    tr += "<tr ID='" + maxPricingIDInTable + "'>";
    tr += "     <td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + maxPricingIDInTable + "' checked='checked' /></td>";
    tr += "     <td class='PricingID'> <input disabled='disabled' type='checkbox' value='" + maxPricingIDInTable + "' /></td>";
    tr += '     <td class="PricingTypeID hide" val=""><select id="slPricingType' + maxPricingIDInTable + '" class="controlStyle" onfocus="DisableBackspaceKey(id);" onkeydown="DisableBackspaceKey(id);" onkeypress="DisableBackspaceKey(id);" onchange="Pricing_SetIsRowChanged(id); Pricing_PricingTypeChanged(' + "'" + "slPricingType" + maxPricingIDInTable + "','slSupplier" + maxPricingIDInTable + "'," + 0 + ');" data-required="false"></select></td>';
    tr += "     <td class='CustomerID' val=''><select id='slCustomer" + maxPricingIDInTable + "' style='width:150px;' class='controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false'></select></td>";
    tr += "     <td class='CustomerReference'> <input type='text' style='width:150px; text-transform:uppercase;' id='txtCustomerReference" + maxPricingIDInTable + "' class='form-control controlStyle' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='true' value='' /> </td>";

    //************************************************************************************ */
    if (pDefaults.UnEditableCompanyName == "UNS") {
        tr += "     <td class='GrossWeight'> <input type='text' style='width:30px;' id='txtGrossWeight" + maxPricingIDInTable + "' class='form-control controlStyle' data-type='number'  onkeypress='CheckValueIsInteger(id);' onfocus='CheckValueIsInteger(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false' value='0' /> </td>";
        tr += "     <td class='FreeDaysPOD'> <input type='text' style='width:30px;' id='txtFreeDaysPOD" + maxPricingIDInTable + "' class='form-control controlStyle' data-type='number'  onkeypress='CheckValueIsInteger(id);' onfocus='CheckValueIsInteger(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false' value='0' /> </td>";
        tr += "     <td class='PickupAddress'> <input type='text' style='width:150px; text-transform:uppercase;' id='txtPickupAddress" + maxPricingIDInTable + "' class='form-control controlStyle' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='true' value='' /> </td>";
        tr += '     <td class="ETA"><input id="txtETA' + maxPricingIDInTable + '" style="width:85px;height:100%;" readonly="readonly" type="text" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" onchange="Pricing_SetIsRowChanged(id);" style="background-color:white; cursor:text;" class="input-sm datepicker-input form-control" data-date-format="dd/mm/yyyy" placeholder="Select Date" value="' + dateValidTo + '" /></td>';
        tr += '     <td class="ETD"><input id="txtETD' + maxPricingIDInTable + '" style="width:85px;height:100%;" readonly="readonly" type="text" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" onchange="Pricing_SetIsRowChanged(id);" style="background-color:white; cursor:text;" class="input-sm datepicker-input form-control" data-date-format="dd/mm/yyyy" placeholder="Select Date" value="' + dateValidTo + '" /></td>';
        tr += '     <td class="StuffingCutOf"><input id="txtStuffingCutOf' + maxPricingIDInTable + '" style="width:85px;height:100%;" readonly="readonly" type="text" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" onchange="Pricing_SetIsRowChanged(id);" style="background-color:white; cursor:text;" class="input-sm datepicker-input form-control" data-date-format="dd/mm/yyyy" placeholder="Select Date" value="' + dateValidTo + '" /></td>';
    }
    //**************************************************************************************/
    
    tr += '     <td class="POLCountryID" val=""><select id="slPOLCountry' + maxPricingIDInTable + '" style="width:150px;" class="controlStyle" onfocus="DisableBackspaceKey(id);" onkeydown="DisableBackspaceKey(id);" onkeypress="DisableBackspaceKey(id);" onchange="Pricing_SetIsRowChanged(id); Pricing_FillPorts(' + "'" + "slPOLCountry" + maxPricingIDInTable + "','slPOL" + maxPricingIDInTable + "'," + 0 + ');" data-required="false"></select></td>';
    tr += '     <td class="POLID" val=""><select id="slPOL' + maxPricingIDInTable + '" style="width:150px;" class="controlStyle" onfocus="DisableBackspaceKey(id);" onkeydown="DisableBackspaceKey(id);" onkeypress="DisableBackspaceKey(id);" onchange="Pricing_SetIsRowChanged(id);" data-required="false"></select></td>';
    tr += '     <td class="PODCountryID" val=""><select id="slPODCountry' + maxPricingIDInTable + '" style="width:150px;" class="controlStyle" onfocus="DisableBackspaceKey(id);" onkeydown="DisableBackspaceKey(id);" onkeypress="DisableBackspaceKey(id);" onchange="Pricing_SetIsRowChanged(id); Pricing_FillPorts(' + "'" + "slPODCountry" + maxPricingIDInTable + "','slPOD" + maxPricingIDInTable + "'," + 0 + ');" data-required="false"></select></td>';
    tr += '     <td class="PODID" val=""><select id="slPOD' + maxPricingIDInTable + '" style="width:150px;" class="controlStyle" onfocus="DisableBackspaceKey(id);" onkeydown="DisableBackspaceKey(id);" onkeypress="DisableBackspaceKey(id);" onchange="Pricing_SetIsRowChanged(id);" data-required="false"></select></td>';
    tr += '<td class="EquipmentID" val=""><select id="slEquipment' + maxPricingIDInTable + '" style="width:auto;" class="controlStyle" onfocus="DisableBackspaceKey(id);" onkeydown="DisableBackspaceKey(id);" onkeypress="DisableBackspaceKey(id);" onchange="Pricing_SetIsRowChanged(id);" data-required="' + (pDefaults.UnEditableCompanyName == "UNS" ? "true" : "false") + '" ></select></td>';
    tr += '     <td class="PackageTypeID" val=""><select id="slPackageType' + maxPricingIDInTable + '" style="width:100px;" class="controlStyle" onfocus="DisableBackspaceKey(id);" onkeydown="DisableBackspaceKey(id);" onkeypress="DisableBackspaceKey(id);" onchange="Pricing_SetIsRowChanged(id);" data-required="false"></select></td>';
    tr += '     <td class="CommodityID" val=""><select id="slCommodity' + maxPricingIDInTable + '" style="width:100px;" class="controlStyle" onfocus="DisableBackspaceKey(id);" onkeydown="DisableBackspaceKey(id);" onkeypress="DisableBackspaceKey(id);" onchange="Pricing_SetIsRowChanged(id);" data-required="false"></select></td>';

    tr += "     <td class='SupplierID' val=''><select id='slSupplier" + maxPricingIDInTable + "' style='width:150px;' class='controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false'></select></td>";

    tr += "     <td class='TransitTime'> <input type='text' style='width:30px;' id='txtTransitTime" + maxPricingIDInTable + "' class='form-control controlStyle' data-type='number'  onkeypress='CheckValueIsInteger(id);' onfocus='CheckValueIsInteger(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false' value='0' /> </td>";
    
    tr += "     <td class='FreeTime'> <input type='text' style='width:30px;' id='txtFreeTime" + maxPricingIDInTable + "' class='form-control controlStyle' data-type='number'  onkeypress='CheckValueIsInteger(id);' onfocus='CheckValueIsInteger(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false' value='0' /> </td>";
    tr += "     <td class='AgentID' val=''><select id='slAgent" + maxPricingIDInTable + "' style='width:150px;' class='controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false'></select></td>";
    tr += "     <td class='Frequency'> <input type='text' style='width:30px;' id='txtFrequency" + maxPricingIDInTable + "' class='form-control controlStyle' data-type='number'  onkeypress='CheckValueIsInteger(id);' onfocus='CheckValueIsInteger(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false' value='0' /> </td>";


    tr += "     <td class='FrequencyNotes hide'> <input type='text' style='width:60px;' id='txtFrequencyNotes" + maxPricingIDInTable + "' class='form-control controlStyle' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false' value='' /> </td>";
    tr += '     <td class="ValidFrom"><input id="txtValidFrom' + maxPricingIDInTable + '" style="width:85px;height:100%;" readonly="readonly" type="text" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" onchange="Pricing_SetIsRowChanged(id);" style="background-color:white; cursor:text;" class="input-sm datepicker-input form-control" data-date-format="dd/mm/yyyy" placeholder="Select Date" value="' + FormattedTodaysDate + '" /></td>';
    tr += '     <td class="ValidTo"><input id="txtValidTo' + maxPricingIDInTable + '" style="width:85px;height:100%;" readonly="readonly" type="text" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" onchange="Pricing_SetIsRowChanged(id);" style="background-color:white; cursor:text;" class="input-sm datepicker-input form-control" data-date-format="dd/mm/yyyy" placeholder="Select Date" value="' + dateValidTo + '" /></td>';
    tr += "     <td class='CurrencyID' val=''><select id='slCurrency" + maxPricingIDInTable + "' style='width:auto;' class='controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='Pricing_SetIsRowChanged(id);' onkeypress='DisableBackspaceKey(id);' data-required='false'></select></td>";

    for (var i = 1 ; i <= $("#slPricingSettings option").length; i++) {
        var pChargeTypeName = $("#slPricingSettings :nth-child(" + i + ")").text();
        var pChargeTypeID = $("#slPricingSettings :nth-child(" + i + ")").val();
        var pChargeTypeNameWithOnlyCharsAndNos = pChargeTypeName.replace(/[^\w]/g, '') + pChargeTypeID; //Keep only characters and numbers
        tr += "     <td class='" + pChargeTypeNameWithOnlyCharsAndNos + "'><input type='text' style='width:60px;' " + (glbCallingControl == "PricingRequest" ? " disabled='disabled' " : "") + " id='txt" + pChargeTypeNameWithOnlyCharsAndNos + maxPricingIDInTable + "' PricingChargeID=0 class='form-control controlStyle' data-type='number' onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false' value='0.00' /> </td>";
    }
    tr += "     <td class='Notes'> <input type='text' style='width:700px; text-transform:uppercase;' id='txtNotes" + maxPricingIDInTable + "' class='form-control controlStyle' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false' value='' /> </td>";
    tr += "     <td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate' id='SelectedIDsToUpdate" + maxPricingIDInTable + "' type='checkbox' value='" + maxPricingIDInTable + "' /></td>";
    tr += "     <td class=''>"
                        //+ "<a href='#'  onclick='Pricing_CopyRow(" + maxPricingIDInTable + ");' " + copyControlsText + "</a>"
                  + "</td>";
    tr += "</tr>";
    //if ($("#tblPricing tbody tr").length > 0)
    //    $(tr).insertBefore('#tblPricing > tbody > tr:first');
    //else
    $("#tblPricing tbody").prepend(tr);
    /***************************Filling row controls******************************/
    $("#slPricingType" + maxPricingIDInTable).html($("#slPricingType").html());
    $("#slPricingType" + maxPricingIDInTable).val($("#slPricingType").val());
    $("#slSupplier" + maxPricingIDInTable).html($("#slSupplier").html());
    $("#slSupplier" + maxPricingIDInTable).val($("#slSupplier").val());
    $("#slCustomer" + maxPricingIDInTable).html($("#slCustomer").html());
    $("#slCustomer" + maxPricingIDInTable).val($("#slCustomer").val());
    $("#slAgent" + maxPricingIDInTable).html($("#slAgent").html());
    $("#slAgent" + maxPricingIDInTable).val($("#slAgent").val());
    $("#slPOLCountry" + maxPricingIDInTable).html($("#slPOLCountry").html());
    $("#slPOLCountry" + maxPricingIDInTable).val($("#slPOLCountry").val());
    $("#slPOL" + maxPricingIDInTable).html($("#slPOL").html());
    $("#slPOL" + maxPricingIDInTable).val($("#slPOL").val());
    $("#slPODCountry" + maxPricingIDInTable).html($("#slPODCountry").html());
    $("#slPODCountry" + maxPricingIDInTable).val($("#slPODCountry").val());
    $("#slPOD" + maxPricingIDInTable).html($("#slPOD").html());
    $("#slPOD" + maxPricingIDInTable).val($("#slPOD").val());
    $("#slEquipment" + maxPricingIDInTable).html($("#slEquipment").html());
    $("#slEquipment" + maxPricingIDInTable).val($("#slEquipment").val());
    $("#slPackageType" + maxPricingIDInTable).html($("#slPackageType").html());
    $("#slPackageType" + maxPricingIDInTable).val($("#slPackageType").val());
    $("#slCommodity" + maxPricingIDInTable).html($("#slCommodity").html());
    $("#slCommodity" + maxPricingIDInTable).val($("#slCommodity").val());
    $("#slCurrency" + maxPricingIDInTable).html($("#hReadySlCurrencies").html());
    $("#slCurrency" + maxPricingIDInTable).val($("#hReadySlCurrencies").val());
    SetDatepickerFormat();
    /***********************EOF Filling row controls******************************/
}
function isSelectFilled() {
    debugger;
    var selectedValue = $('#slEquipment' + maxPricingIDInTable).val();
    var CargoWeightSelectedValue = $('#txtGrossWeight' + maxPricingIDInTable).val();
    return (selectedValue !== null && selectedValue !== '' && CargoWeightSelectedValue !== 0 && CargoWeightSelectedValue !=='');
}
function Pricing_CopyRow(pCopiedRowID) {
    debugger;
    ++maxPricingIDInTable;
    var copyControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Copy") + "</span>";
    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var dateValidTo = Date.prototype.addDays(ConvertDateFormat(FormattedTodaysDate), 30);
    var tr = "";
    tr += "<tr ID='" + maxPricingIDInTable + "'>";
    tr += "     <td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + maxPricingIDInTable + "' checked='checked' /></td>";
    tr += "     <td class='PricingID'> <input disabled='disabled' type='checkbox' value='" + maxPricingIDInTable + "' /></td>";
    tr += '     <td class="PricingTypeID hide" val=""><select id="slPricingType' + maxPricingIDInTable + '" class="controlStyle" onfocus="DisableBackspaceKey(id);" onkeydown="DisableBackspaceKey(id);" onkeypress="DisableBackspaceKey(id);" onchange="Pricing_SetIsRowChanged(id); Pricing_PricingTypeChanged(' + "'" + "slPricingType" + maxPricingIDInTable + "','slSupplier" + maxPricingIDInTable + "'," + 0 + ');" data-required="false"></select></td>';
    tr += "     <td class='CustomerID' val=''><select id='slCustomer" + maxPricingIDInTable + "' style='width:150px;' class='controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false'></select></td>";
    tr += "     <td class='CustomerReference'> <input type='text' style='width:150px; text-transform:uppercase;' id='txtCustomerReference" + maxPricingIDInTable + "' class='form-control controlStyle' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false' value='' /> </td>";
    tr += '     <td class="POLCountryID" val=""><select id="slPOLCountry' + maxPricingIDInTable + '" style="width:150px;" class="controlStyle" onfocus="DisableBackspaceKey(id);" onkeydown="DisableBackspaceKey(id);" onkeypress="DisableBackspaceKey(id);" onchange="Pricing_SetIsRowChanged(id); Pricing_FillPorts(' + "'" + "slPOLCountry" + maxPricingIDInTable + "','slPOL" + maxPricingIDInTable + "'," + 0 + ');" data-required="false"></select></td>';
    tr += '     <td class="POLID" val=""><select id="slPOL' + maxPricingIDInTable + '" style="width:150px;" class="controlStyle" onfocus="DisableBackspaceKey(id);" onkeydown="DisableBackspaceKey(id);" onkeypress="DisableBackspaceKey(id);" onchange="Pricing_SetIsRowChanged(id);" data-required="false"></select></td>';
    tr += '     <td class="PODCountryID" val=""><select id="slPODCountry' + maxPricingIDInTable + '" style="width:150px;" class="controlStyle" onfocus="DisableBackspaceKey(id);" onkeydown="DisableBackspaceKey(id);" onkeypress="DisableBackspaceKey(id);" onchange="Pricing_SetIsRowChanged(id); Pricing_FillPorts(' + "'" + "slPODCountry" + maxPricingIDInTable + "','slPOD" + maxPricingIDInTable + "'," + 0 + ');" data-required="false"></select></td>';
    tr += '     <td class="PODID" val=""><select id="slPOD' + maxPricingIDInTable + '" style="width:150px;" class="controlStyle" onfocus="DisableBackspaceKey(id);" onkeydown="DisableBackspaceKey(id);" onkeypress="DisableBackspaceKey(id);" onchange="Pricing_SetIsRowChanged(id);" data-required="false"></select></td>';
    tr += '     <td class="EquipmentID" val=""><select id="slEquipment' + maxPricingIDInTable + '" style="width:auto;" class="controlStyle" onfocus="DisableBackspaceKey(id);" onkeydown="DisableBackspaceKey(id);" onkeypress="DisableBackspaceKey(id);" onchange="Pricing_SetIsRowChanged(id);" data-required="false"></select></td>';
    tr += '     <td class="PackageTypeID" val=""><select id="slPackageType' + maxPricingIDInTable + '" style="width:100px;" class="controlStyle" onfocus="DisableBackspaceKey(id);" onkeydown="DisableBackspaceKey(id);" onkeypress="DisableBackspaceKey(id);" onchange="Pricing_SetIsRowChanged(id);" data-required="false"></select></td>';
    tr += '     <td class="CommodityID" val=""><select id="slCommodity' + maxPricingIDInTable + '" style="width:100px;" class="controlStyle" onfocus="DisableBackspaceKey(id);" onkeydown="DisableBackspaceKey(id);" onkeypress="DisableBackspaceKey(id);" onchange="Pricing_SetIsRowChanged(id);" data-required="false"></select></td>';
    tr += "     <td class='SupplierID' val=''><select id='slSupplier" + maxPricingIDInTable + "' style='width:150px;' class='controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false'></select></td>";

    tr += "     <td class='TransitTime'> <input type='text' style='width:30px;' id='txtTransitTime" + maxPricingIDInTable + "' class='form-control controlStyle' data-type='number'  onkeypress='CheckValueIsInteger(id);' onfocus='CheckValueIsInteger(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false' value='0' /> </td>";
    tr += "     <td class='FreeTime'> <input type='text' style='width:30px;' id='txtFreeTime" + maxPricingIDInTable + "' class='form-control controlStyle' data-type='number'  onkeypress='CheckValueIsInteger(id);' onfocus='CheckValueIsInteger(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false' value='0' /> </td>";
    tr += "     <td class='AgentID' val=''><select id='slAgent" + maxPricingIDInTable + "' style='width:150px;' class='controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false'></select></td>";
    tr += "     <td class='Frequency'> <input type='text' style='width:30px;' id='txtFrequency" + maxPricingIDInTable + "' class='form-control controlStyle' data-type='number'  onkeypress='CheckValueIsInteger(id);' onfocus='CheckValueIsInteger(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false' value='0' /> </td>";
    tr += "     <td class='FrequencyNotes hide'> <input type='text' style='width:60px;' id='txtFrequencyNotes" + maxPricingIDInTable + "' class='form-control controlStyle' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false' value='' /> </td>";
    tr += '     <td class="ValidFrom"><input id="txtValidFrom' + maxPricingIDInTable + '" style="width:85px;height:100%;" readonly="readonly" type="text" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" onchange="Pricing_SetIsRowChanged(id);" style="background-color:white; cursor:text;" class="input-sm datepicker-input form-control" data-date-format="dd/mm/yyyy" placeholder="Select Date" value="' + $("#txtValidFrom" + pCopiedRowID).val() + '" /></td>';
    tr += '     <td class="ValidTo"><input id="txtValidTo' + maxPricingIDInTable + '" style="width:85px;height:100%;" readonly="readonly" type="text" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" onchange="Pricing_SetIsRowChanged(id);" style="background-color:white; cursor:text;" class="input-sm datepicker-input form-control" data-date-format="dd/mm/yyyy" placeholder="Select Date" value="' + $("#txtValidTo" + pCopiedRowID).val() + '" /></td>';
    tr += "     <td class='CurrencyID' val=''><select id='slCurrency" + maxPricingIDInTable + "' style='width:auto;' class='controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='Pricing_SetIsRowChanged(id);' onkeypress='DisableBackspaceKey(id);' data-required='false'></select></td>";

    for (var i = 1 ; i <= $("#slPricingSettings option").length; i++) {
        var pChargeTypeName = $("#slPricingSettings :nth-child(" + i + ")").text();
        var pChargeTypeID = $("#slPricingSettings :nth-child(" + i + ")").val();
        var pChargeTypeNameWithOnlyCharsAndNos = pChargeTypeName.replace(/[^\w]/g, '') + pChargeTypeID; //Keep only characters and numbers
        tr += "     <td class='" + pChargeTypeNameWithOnlyCharsAndNos + "'><input type='text' style='width:60px;'  " + (glbCallingControl == "PricingRequest" ? " disabled='disabled' " : "") + " id='txt" + pChargeTypeNameWithOnlyCharsAndNos + maxPricingIDInTable + "' PricingChargeID=0 class='form-control controlStyle' data-type='number' onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false' value='" + $("#txt" + pChargeTypeNameWithOnlyCharsAndNos + pCopiedRowID).val() + "' /> </td>";
    }
    tr += "     <td class='Notes'> <input type='text' style='width:700px; text-transform:uppercase;' id='txtNotes" + maxPricingIDInTable + "' class='form-control controlStyle' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false' value='' /> </td>";
    tr += "     <td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate' id='SelectedIDsToUpdate" + maxPricingIDInTable + "' type='checkbox' value='" + maxPricingIDInTable + "' /></td>";
    tr += "     <td class=''>"
                        //+ "<a href='#'  onclick='Pricing_CopyRow(" + maxPricingIDInTable + ");' " + copyControlsText + "</a>"
                  + "</td>";
    tr += "</tr>";
    //if ($("#tblPricing tbody tr").length > 0)
    //    $(tr).insertBefore('#tblPricing > tbody > tr:first');
    //else
    $("#tblPricing tbody").prepend(tr);
    /***************************Filling row controls******************************/
    debugger;
    $("#slPricingType" + maxPricingIDInTable).html($("#slPricingType" + pCopiedRowID).html());
    $("#slPricingType" + maxPricingIDInTable).val($("#slPricingType" + pCopiedRowID).val());
    $("#slCustomer" + maxPricingIDInTable).html($("#slCustomer").html());
    $("#slCustomer" + maxPricingIDInTable).val($("#slCustomer" + pCopiedRowID).val());

    $("#txtCustomerReference" + maxPricingIDInTable).val($("#txtCustomerReference" + pCopiedRowID).val());
    $("#txtTransitTime" + maxPricingIDInTable).val($("#txtTransitTime" + pCopiedRowID).val());
    $("#txtFrequency" + maxPricingIDInTable).val($("#txtFrequency" + pCopiedRowID).val());
    $("#txtNotes" + maxPricingIDInTable).val($("#txtNotes" + pCopiedRowID).val());

    $("#slAgent" + maxPricingIDInTable).html($("#slAgent").html());
    $("#slAgent" + maxPricingIDInTable).val($("#slAgent" + pCopiedRowID).val());
    $("#slSupplier" + maxPricingIDInTable).html($("#slSupplier").html());
    $("#slSupplier" + maxPricingIDInTable).val($("#slSupplier" + pCopiedRowID).val());
    $("#slPOLCountry" + maxPricingIDInTable).html($("#slPOLCountry").html());
    $("#slPOLCountry" + maxPricingIDInTable).val($("#slPOLCountry" + pCopiedRowID).val());
    //$("#slPOL" + maxPricingIDInTable).html($("#slPOL" + pCopiedRowID).html());
    //$("#slPOL" + maxPricingIDInTable).val($("#slPOL" + pCopiedRowID).val());
    Pricing_FillPorts("slPOLCountry" + maxPricingIDInTable, "slPOL" + maxPricingIDInTable, $("#slPOL" + pCopiedRowID).val())
    $("#slPODCountry" + maxPricingIDInTable).html($("#slPODCountry").html());
    $("#slPODCountry" + maxPricingIDInTable).val($("#slPODCountry" + pCopiedRowID).val());
    //$("#slPOD" + maxPricingIDInTable).html($("#slPOD" + pCopiedRowID).html());
    //$("#slPOD" + maxPricingIDInTable).val($("#slPOD" + pCopiedRowID).val());
    Pricing_FillPorts("slPODCountry" + maxPricingIDInTable, "slPOD" + maxPricingIDInTable, $("#slPOD" + pCopiedRowID).val())
    $("#slEquipment" + maxPricingIDInTable).html($("#slEquipment").html());
    $("#slEquipment" + maxPricingIDInTable).val($("#slEquipment" + pCopiedRowID).val());
    $("#slPackageType" + maxPricingIDInTable).html($("#slPackageType").html());
    $("#slPackageType" + maxPricingIDInTable).val($("#slPackageType" + pCopiedRowID).val());
    $("#slCommodity" + maxPricingIDInTable).html($("#slCommodity").html());
    $("#slCommodity" + maxPricingIDInTable).val($("#slCommodity" + pCopiedRowID).val());
    $("#slCurrency" + maxPricingIDInTable).html($("#slCurrency" + pCopiedRowID).html());
    SetDatepickerFormat();
    /***********************EOF Filling row controls******************************/
}

function openPricingExcelPage(target) {
    debugger;
    window.open('https://docs.google.com/spreadsheets/d/1h_nkoEsr0vgRstQVc_Q7-b8LiIxp_HSZXIwOsz9UchI/edit?gid=1074469058#gid=1074469058', '_blank');
}
function Pricing_LoadingWithPaging(pPricingType) {
    debugger;
    if (pDefaults.UnEditableCompanyName == "BED") {
        if (pPricingType == 30) {
            $('#btn-PricingExcelTrucking').removeClass('hide');
            $('#btn-PricingExcelCustomClearance').addClass('hide');
        } else if (pPricingType == 40) {
            $('#btn-PricingExcelTrucking').addClass('hide');
            $('#btn-PricingExcelCustomClearance').removeClass('hide');
        } else {
            $('#btn-PricingExcelTrucking').addClass('hide');
            $('#btn-PricingExcelCustomClearance').addClass('hide');
        }
    } else {
        $('#btn-PricingExcelTrucking').addClass('hide');
        $('#btn-PricingExcelCustomClearance').addClass('hide');
    }
   
    if (pPricingType == constPricingOcean) {
        intPricingType = pPricingType;
        $("#aPricingOcean").parent().siblings().children().removeClass("text-ul");
        $("#aPricingOcean").addClass("text-ul");
        $("#lblPricingShown").text("(OCEAN)");
    }
    else if (pPricingType == constPricingAir) {
        intPricingType = pPricingType;
        $("#aPricingAir").parent().siblings().children().removeClass("text-ul");
        $("#aPricingAir").addClass("text-ul");
        $("#lblPricingShown").text("(AIR)");
    }
    else if (pPricingType == constPricingInland) {
        intPricingType = pPricingType;
        $("#aPricingInland").parent().siblings().children().removeClass("text-ul");
        $("#aPricingInland").addClass("text-ul");
        $("#lblPricingShown").text("(TRUCKING)");
    }
    else if (pPricingType == constPricingCustomsClearance) {
        intPricingType = pPricingType;
        $("#aPricingCustomsClearance").parent().siblings().children().removeClass("text-ul");
        $("#aPricingCustomsClearance").addClass("text-ul");
        $("#lblPricingShown").text("(Customs Clearance)");
    }
    else if (pPricingType == constPricingGeneral) {
        intPricingType = pPricingType;
        $("#aPricingGeneral").parent().siblings().children().removeClass("text-ul");
        $("#aPricingGeneral").addClass("text-ul");
        $("#lblPricingShown").text("(GENERAL)");
    }
    $("#slPricingType").val(intPricingType);
    var pWhereClause = Pricing_GetWhereClause();
    var pOrderBy = "ID DESC"; //"SupplierName, ID DESC"; //"PricingTypeID, SupplierName, POLName, PODName";
    var pPageNumber = 1;
    var pPageSize = $('#select-page-size').val();
    var pControllerParameters = { pIsReturnObjectArray: false, pPricingTypeID: intPricingType, pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
        , function (pData) {
            var pPricing = pData[0];
            var pSupplier = pData[5]; //The supplier is one of (ShippingLine,Airline,Trucker or CCA)
            var pPricingCharge = pData[7];
            var pPackageType = pData[9];
            var supplierVal = $('#slSupplier').val();
            var slPricingSettingsVal = $('#slPricingSettings').val();
            var slPackageTypeVal = $('#slPackageType').val();
            FillListFromObject(null, 2, "<--Select-->"/*"Select Supplier"*/, "slSupplier", pSupplier, function () { $('#slSupplier').val(supplierVal)});
            //FillListFromObject(null, 2, "<--Select-->"/*"Select Supplier"*/, "slSupplier", pData[5], null);
            FillListFromObject(null, 10, null, "slPricingSettings", pData[6], function () { $('#slPricingSettings').val(slPricingSettingsVal) });
            FillListFromObject(null, 2, "<--Select-->"/*"Select Supplier"*/, "slPackageType", pPackageType, function () { $('#slPackageType').val(slPackageTypeVal) });
            Pricing_BindTableRows(JSON.parse(pPricing), JSON.parse(pPricingCharge));
        });
    //HighlightText("#tblPricing>tbody>tr", $("#txt-Search").val().trim());
}
function Pricing_GetWhereClause() {
    debugger;
    var pWhereClause = " WHERE 1=1 ";
    if ($("#txt-Search").val().trim() != "") {
        pWhereClause += " AND (";
        pWhereClause += " CustomerName like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " OR CustomerReference = N'" + $("#txt-Search").val().trim() + "' ";
        pWhereClause += " OR SupplierName like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " OR POLName like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " OR PODName like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += ")";
    }
    //if ($("#slPricingType").val() != "") {
    //    pWhereClause += " AND PricingTypeID = N'" + $("#slPricingType").val() + "' ";
    //}
    pWhereClause += " AND PricingTypeID=" + intPricingType;
    if ($("#slSupplier").val() != "") {
        pWhereClause += $("#slPricingType").val() == constPricingOcean ? (" AND ShippingLineID = N'" + $("#slSupplier").val() + "' ") : "";
        pWhereClause += $("#slPricingType").val() == constPricingAir ? (" AND AirlineID = N'" + $("#slSupplier").val() + "' ") : "";
        pWhereClause += $("#slPricingType").val() == constPricingInland ? (" AND TruckerID = N'" + $("#slSupplier").val() + "' ") : "";
        pWhereClause += $("#slPricingType").val() == constPricingCustomsClearance ? (" AND CCAID = N'" + $("#slSupplier").val() + "' ") : "";
    }
    if ($("#slPOLCountry").val() != "") {
        pWhereClause += " AND POLCountryID = N'" + $("#slPOLCountry").val() + "' " + " \n";
    }
    if ($("#slPODCountry").val() != "") {
        pWhereClause += " AND PODCountryID = N'" + $("#slPODCountry").val() + "' " + " \n";
    }
    if ($("#slPOL").val() != "") {
        pWhereClause += " AND POLID = N'" + $("#slPOL").val() + "' " + " \n";
    }
    if ($("#slPOD").val() != "") {
        pWhereClause += " AND PODID = N'" + $("#slPOD").val() + "' " + " \n";
    }
    if ($("#slEquipment").val() != "") {
        pWhereClause += " AND EquipmentID = N'" + $("#slEquipment").val() + "' " + " \n";
    }
    if ($("#slPackageType").val() != "") {
        pWhereClause += " AND PackageTypeID = N'" + $("#slPackageType").val() + "' " + " \n";
    }
    if ($("#slCommodity").val() != "") {
        pWhereClause += " AND CommodityID = N'" + $("#slCommodity").val() + "' " + " \n";
    }
    if ($("#slCustomer").val() != "") {
        pWhereClause += " AND CustomerID = N'" + $("#slCustomer").val() + "' " + " \n";
    }
    if ($("#slAgent").val() != "") {
        pWhereClause += " AND AgentID = N'" + $("#slAgent").val() + "' " + " \n";
    }
    if (($("#txtFromDate").val().trim() != "" && isValidDate($("#txtFromDate").val().trim(), 1))) {
        pWhereClause += " AND ValidTo >= '" + GetDateWithFormatyyyyMMdd($("#txtFromDate").val().trim()) + "'" + " \n";
    }
    if (($("#txtToDate").val().trim() != "" && isValidDate($("#txtToDate").val().trim(), 1))) {
        pWhereClause += " AND ValidTo <= '" + GetDateWithFormatyyyyMMdd($("#txtToDate").val().trim()) + " 23:59:59' " + " \n";
    }
    if (IsNull($("#slChargeType").val(),"") != "") {
        pWhereClause += " AND ChargeTypeID in (" + $("#slChargeType").val().toString() + ") " + " \n";
    }
    return pWhereClause;
}
function Pricing_SaveList() {
    debugger;
    var pSelectedIDsToSave = GetAllSelectedIDsAsStringWithNameAttr("SelectedIDsToUpdate");//returns string array of IDs

    var pIsInsertList = "";
    var pPricingTypeIDList = "";
    var pCustomerIDList = "";
    var pCustomerReferenceList = "";
    var pAgentIDList = "";
    var pShippingLineIDList = "";
    var pAirlineIDList = "";
    var pTruckerIDList = "";
    var pCCAIDList = "";
    var pPOLCountryIDList = "";
    var pPOLIDList = "";
    var pPODCountryIDList = "";
    var pPODIDList = "";
    var pEquipmentIDList = "";
    var pPackageTypeIDList = "";
    var pCommodityIDList = "";
    
    var pTransitTimeList = "";
    var pFrequencyList = "";
    var pFrequencyNotesList = "";
    var pFreeTimeList = "";
    var pValidFromList = "";
    var pValidToList = "";
    var pCurrencyIDList = "";
    var pExchangeRateList = "";
    var pGrossWeightList = "";
    var pFreeDaysPODList = "";
    var pPickupAddressList = "";
    var pETAList = ""; 
    var pETDList = "";
    var pStuffingCutOfList = "";

    /*******************Charges Parameters**************************/
    //I fill data row by row(i.e. each n values hold sequential PricingDefaults from same Pricing Row, next n values the 2nd row,....)
    var pNumberOfChargesPerRow = $("#slPricingSettings option").length;
    var pPricingChargeIDList = ""; //ID in the PricingCharge table in DB //in case 0 then insert else update
    var pCostPriceList = "";
    //i get order and chargeTypeID in the controller form tbl PricingSettings (i.e. Defaults)
    /*******************Charges Parameters**************************/
    var pNotesList = "";

    if (pSelectedIDsToSave != "") {
        FadePageCover(true);
        var NumberOfSelectRows = pSelectedIDsToSave.split(',').length;
        if (pDefaults.UnEditableCompanyName == "UNS") {
            if (isSelectFilled()) {
                for (var i = 0; i < NumberOfSelectRows; i++) {
                    var currentRowID = pSelectedIDsToSave.split(",")[i];
                    pIsInsertList += ((pIsInsertList == "") ? "" : ",") + ($("#IsInsert" + currentRowID).prop("checked") ? "1" : "0");
                    pPricingTypeIDList += ((pPricingTypeIDList == "") ? "" : ",") + ($("#slPricingType" + currentRowID).val() == "" ? "NULL" : $("#slPricingType" + currentRowID).val());
                    pCustomerIDList += ((pCustomerIDList == "") ? "" : ",") + ($("#slCustomer" + currentRowID).val() == "" ? "NULL" : $("#slCustomer" + currentRowID).val());
                    pCustomerReferenceList += ((pCustomerReferenceList == "") ? "" : ",") + ($("#txtCustomerReference" + currentRowID).val().trim() == "" ? "0" : $("#txtCustomerReference" + currentRowID).val().trim().toUpperCase());
                    pAgentIDList += ((pAgentIDList == "") ? "" : ",") + ($("#slAgent" + currentRowID).val() == "" ? "NULL" : $("#slAgent" + currentRowID).val());
                    pShippingLineIDList += ((pShippingLineIDList == "") ? "" : ",") + ($("#slPricingType" + currentRowID).val() != constPricingOcean || $("#slSupplier" + currentRowID).val() == "" ? "NULL" : $("#slSupplier" + currentRowID).val());
                    pAirlineIDList += ((pAirlineIDList == "") ? "" : ",") + ($("#slPricingType" + currentRowID).val() != constPricingAir || $("#slSupplier" + currentRowID).val() == "" ? "NULL" : $("#slSupplier" + currentRowID).val());
                    pTruckerIDList += ((pTruckerIDList == "") ? "" : ",") + ($("#slPricingType" + currentRowID).val() != constPricingInland || $("#slSupplier" + currentRowID).val() == "" ? "NULL" : $("#slSupplier" + currentRowID).val());
                    pCCAIDList += ((pCCAIDList == "") ? "" : ",") + ($("#slPricingType" + currentRowID).val() != constPricingCustomsClearance || $("#slSupplier" + currentRowID).val() == "" ? "NULL" : $("#slSupplier" + currentRowID).val());
                    pPOLCountryIDList += ((pPOLCountryIDList == "") ? "" : ",") + ($("#slPOLCountry" + currentRowID).val() == "" ? "NULL" : $("#slPOLCountry" + currentRowID).val());
                    pPOLIDList += ((pPOLIDList == "") ? "" : ",") + ($("#slPOL" + currentRowID).val() == "" ? "NULL" : $("#slPOL" + currentRowID).val());
                    pPODCountryIDList += ((pPODCountryIDList == "") ? "" : ",") + ($("#slPODCountry" + currentRowID).val() == "" ? "NULL" : $("#slPODCountry" + currentRowID).val());
                    pPODIDList += ((pPODIDList == "") ? "" : ",") + ($("#slPOD" + currentRowID).val() == "" ? "NULL" : $("#slPOD" + currentRowID).val());
                    pEquipmentIDList += ((pEquipmentIDList == "") ? "" : ",") + ($("#slEquipment" + currentRowID).val() == "" ? "NULL" : $("#slEquipment" + currentRowID).val());
                    pPackageTypeIDList += ((pPackageTypeIDList == "") ? "" : ",") + ($("#slPackageType" + currentRowID).val() == "" ? "NULL" : $("#slPackageType" + currentRowID).val());
                    pCommodityIDList += ((pCommodityIDList == "") ? "" : ",") + ($("#slCommodity" + currentRowID).val() == "" ? "NULL" : $("#slCommodity" + currentRowID).val());

                    pTransitTimeList += ((pTransitTimeList == "") ? "" : ",") + ($("#txtTransitTime" + currentRowID).val() == "" ? "NULL" : $("#txtTransitTime" + currentRowID).val());
                    pFrequencyList += ((pFrequencyList == "") ? "" : ",") + ($("#txtFrequency" + currentRowID).val() == "" ? "NULL" : $("#txtFrequency" + currentRowID).val());
                    pFrequencyNotesList += ((pFrequencyNotesList == "") ? "" : ",") + ($("#txtFrequencyNotes" + currentRowID).val().trim() == "" ? "NULL" : $("#txtFrequencyNotes" + currentRowID).val().trim().toUpperCase());
                    pFreeTimeList += ((pFreeTimeList == "") ? "" : ",") + ($("#txtFreeTime" + currentRowID).val() == "" ? "NULL" : $("#txtFreeTime" + currentRowID).val());
                    pGrossWeightList += ((pGrossWeightList == "") ? "" : ",") + ($("#txtGrossWeight" + currentRowID).val() == "" ? "NULL" : $("#txtGrossWeight" + currentRowID).val());
              
                    pFreeDaysPODList += ((pFreeDaysPODList == "") ? "" : ",") + ($("#txtFreeDaysPOD" + currentRowID).val() == "" ? "NULL" : $("#txtFreeDaysPOD" + currentRowID).val());
                    pPickupAddressList += ((pPickupAddressList == "") ? "" : ",") + ($("#txtPickupAddress" + currentRowID).val() == "" ? "NULL" : $("#txtPickupAddress" + currentRowID).val());

                    pETAList += ((pETAList == "") ? "" : ",") + ($("#txtETA" + currentRowID).val().trim() == "" ? "NULL" : $("#txtETA" + currentRowID).val().trim());
                    pETDList += ((pETDList == "") ? "" : ",") + ($("#txtETD" + currentRowID).val().trim() == "" ? "NULL" : $("#txtETD" + currentRowID).val().trim());

                    pStuffingCutOfList += ((pStuffingCutOfList == "") ? "" : ",") + ($("#txtStuffingCutOf" + currentRowID).val().trim() == "" ? "NULL" : $("#txtStuffingCutOf" + currentRowID).val().trim());

                   
                    pValidFromList += ((pValidFromList == "") ? "" : ",") + ($("#txtValidFrom" + currentRowID).val().trim() == "" ? "NULL" : $("#txtValidFrom" + currentRowID).val().trim());
                    pValidToList += ((pValidToList == "") ? "" : ",") + ($("#txtValidTo" + currentRowID).val().trim() == "" ? "NULL" : $("#txtValidTo" + currentRowID).val().trim());

                    pCurrencyIDList += ((pCurrencyIDList == "") ? "" : ",") + ($("#slCurrency" + currentRowID).val() == "" ? "NULL" : $("#slCurrency" + currentRowID).val());
                    pExchangeRateList += ((pExchangeRateList == "") ? "" : ",") + ($("#slCurrency" + currentRowID + " option:selected").attr("MasterDataExchangeRate") == "" ? "NULL" : $("#slCurrency" + currentRowID + " option:selected").attr("MasterDataExchangeRate"));
                    pNotesList += ((pNotesList == "") ? "" : ",") + ($("#txtNotes" + currentRowID).val().trim() == "" ? "0" : $("#txtNotes" + currentRowID).val().trim().toUpperCase());
                    for (var j = 1; j <= pNumberOfChargesPerRow; j++) {
                        var pChargeTypeID = $("#slPricingSettings :nth-child(" + j + ")").val();
                        var pChargeTypeName = $("#slPricingSettings :nth-child(" + j + ")").text();
                        var pChargeTypeNameWithOnlyCharsAndNos = pChargeTypeName.replace(/[^\w]/g, '') + pChargeTypeID; //Keep only characters and numbers
                        pPricingChargeIDList += ((pPricingChargeIDList == "") ? "" : ",") + $("#txt" + pChargeTypeNameWithOnlyCharsAndNos + currentRowID).attr("PricingChargeID");
                        pCostPriceList += ((pCostPriceList == "") ? "" : ",") + ($("#txt" + pChargeTypeNameWithOnlyCharsAndNos + currentRowID).val() == "" ? "0" : $("#txt" + pChargeTypeNameWithOnlyCharsAndNos + currentRowID).val());
                    }


                } //of for loop
                var pParametersWithValues = {
                    pSelectedIDsToSave: pSelectedIDsToSave
                    , pIsInsertList: pIsInsertList
                    , pPricingTypeIDList: pPricingTypeIDList
                    , pCustomerIDList: pCustomerIDList
                    , pCustomerReferenceList: pCustomerReferenceList
                    , pAgentIDList: pAgentIDList
                    , pShippingLineIDList: pShippingLineIDList
                    , pAirlineIDList: pAirlineIDList
                    , pTruckerIDList: pTruckerIDList
                    , pCCAIDList: pCCAIDList
                    , pPOLCountryIDList: pPOLCountryIDList
                    , pPOLIDList: pPOLIDList
                    , pPODCountryIDList: pPODCountryIDList
                    , pPODIDList: pPODIDList
                    , pEquipmentIDList: pEquipmentIDList
                    , pPackageTypeIDList: pPackageTypeIDList
                    , pCommodityIDList: pCommodityIDList

                    , pTransitTimeList: pTransitTimeList
                    , pFrequencyList: pFrequencyList
                    , pFrequencyNotesList: pFrequencyNotesList
                    , pFreeTimeList: pFreeTimeList
                    , pValidFromList: pValidFromList
                    , pValidToList: pValidToList
                    , pCurrencyIDList: pCurrencyIDList
                    , pExchangeRateList: pExchangeRateList

                    , pPricingChargeIDList: pPricingChargeIDList
                    , pCostPriceList: pCostPriceList
                    , pGrossWeightList: pGrossWeightList
                    , pFreeDaysPODList: pFreeDaysPODList
                    , pETAList: pETAList
                    , pETDList: pETDList
                    , pPickupAddressList: pPickupAddressList
                    , pStuffingCutOfList: pStuffingCutOfList
                    , pNotesList: pNotesList
                    , pIsPricingRequest: (glbCallingControl == "PricingRequest" ? true : false)
                    //LoadWithPaging parameters
                    , pWhereClausePricing: Pricing_GetWhereClause()
                    , pPageSize: $("#select-page-size").val()
                    , pPageNumber: (($("#div-Pager li.active a").text() == "" || pIsInsertList.split('1').length > 1) ? 1 : $("#div-Pager li.active a").text())
                    , pOrderBy: "ID DESC" //"SupplierName, ID DESC" //"PricingTypeID, SupplierName, POLName, PODName"
                }
                CallPOSTFunctionWithParameters("/api/Pricing/Pricing_SaveList", pParametersWithValues
                    , function (pData) {
                        debugger;
                        var _MessageReturned = pData[0];
                        if (_MessageReturned == "") {
                            Pricing_BindTableRows(JSON.parse(pData[1]), JSON.parse(pData[2]));
                            swal("Success", "Saved successfully.");
                        }
                        else
                            swal("Sorry", _MessageReturned);
                        FadePageCover(false);
                    }
                    , null);

            } else {
                FadePageCover(false);
                swal("Sorry", "You didn't Choose any Equipments.");

            }
        }
        else {
            for (var i = 0; i < NumberOfSelectRows; i++) {
                var currentRowID = pSelectedIDsToSave.split(",")[i];
                pIsInsertList += ((pIsInsertList == "") ? "" : ",") + ($("#IsInsert" + currentRowID).prop("checked") ? "1" : "0");
                pPricingTypeIDList += ((pPricingTypeIDList == "") ? "" : ",") + ($("#slPricingType" + currentRowID).val() == "" ? "NULL" : $("#slPricingType" + currentRowID).val());
                pCustomerIDList += ((pCustomerIDList == "") ? "" : ",") + ($("#slCustomer" + currentRowID).val() == "" ? "NULL" : $("#slCustomer" + currentRowID).val());
                pCustomerReferenceList += ((pCustomerReferenceList == "") ? "" : ",") + ($("#txtCustomerReference" + currentRowID).val().trim() == "" ? "0" : $("#txtCustomerReference" + currentRowID).val().trim().toUpperCase());
                pAgentIDList += ((pAgentIDList == "") ? "" : ",") + ($("#slAgent" + currentRowID).val() == "" ? "NULL" : $("#slAgent" + currentRowID).val());
                pShippingLineIDList += ((pShippingLineIDList == "") ? "" : ",") + ($("#slPricingType" + currentRowID).val() != constPricingOcean || $("#slSupplier" + currentRowID).val() == "" ? "NULL" : $("#slSupplier" + currentRowID).val());
                pAirlineIDList += ((pAirlineIDList == "") ? "" : ",") + ($("#slPricingType" + currentRowID).val() != constPricingAir || $("#slSupplier" + currentRowID).val() == "" ? "NULL" : $("#slSupplier" + currentRowID).val());
                pTruckerIDList += ((pTruckerIDList == "") ? "" : ",") + ($("#slPricingType" + currentRowID).val() != constPricingInland || $("#slSupplier" + currentRowID).val() == "" ? "NULL" : $("#slSupplier" + currentRowID).val());
                pCCAIDList += ((pCCAIDList == "") ? "" : ",") + ($("#slPricingType" + currentRowID).val() != constPricingCustomsClearance || $("#slSupplier" + currentRowID).val() == "" ? "NULL" : $("#slSupplier" + currentRowID).val());
                pPOLCountryIDList += ((pPOLCountryIDList == "") ? "" : ",") + ($("#slPOLCountry" + currentRowID).val() == "" ? "NULL" : $("#slPOLCountry" + currentRowID).val());
                pPOLIDList += ((pPOLIDList == "") ? "" : ",") + ($("#slPOL" + currentRowID).val() == "" ? "NULL" : $("#slPOL" + currentRowID).val());
                pPODCountryIDList += ((pPODCountryIDList == "") ? "" : ",") + ($("#slPODCountry" + currentRowID).val() == "" ? "NULL" : $("#slPODCountry" + currentRowID).val());
                pPODIDList += ((pPODIDList == "") ? "" : ",") + ($("#slPOD" + currentRowID).val() == "" ? "NULL" : $("#slPOD" + currentRowID).val());
                pEquipmentIDList += ((pEquipmentIDList == "") ? "" : ",") + ($("#slEquipment" + currentRowID).val() == "" ? "NULL" : $("#slEquipment" + currentRowID).val());
                pPackageTypeIDList += ((pPackageTypeIDList == "") ? "" : ",") + ($("#slPackageType" + currentRowID).val() == "" ? "NULL" : $("#slPackageType" + currentRowID).val());
                pCommodityIDList += ((pCommodityIDList == "") ? "" : ",") + ($("#slCommodity" + currentRowID).val() == "" ? "NULL" : $("#slCommodity" + currentRowID).val());

                pTransitTimeList += ((pTransitTimeList == "") ? "" : ",") + ($("#txtTransitTime" + currentRowID).val() == "" ? "NULL" : $("#txtTransitTime" + currentRowID).val());
                pFrequencyList += ((pFrequencyList == "") ? "" : ",") + ($("#txtFrequency" + currentRowID).val() == "" ? "NULL" : $("#txtFrequency" + currentRowID).val());
                pFrequencyNotesList += ((pFrequencyNotesList == "") ? "" : ",") + ($("#txtFrequencyNotes" + currentRowID).val().trim() == "" ? "NULL" : $("#txtFrequencyNotes" + currentRowID).val().trim().toUpperCase());
                pFreeTimeList += ((pFreeTimeList == "") ? "" : ",") + ($("#txtFreeTime" + currentRowID).val() == "" ? "NULL" : $("#txtFreeTime" + currentRowID).val());
                pValidFromList += ((pValidFromList == "") ? "" : ",") + ($("#txtValidFrom" + currentRowID).val().trim() == "" ? "NULL" : $("#txtValidFrom" + currentRowID).val().trim());
                pValidToList += ((pValidToList == "") ? "" : ",") + ($("#txtValidTo" + currentRowID).val().trim() == "" ? "NULL" : $("#txtValidTo" + currentRowID).val().trim());

                pCurrencyIDList += ((pCurrencyIDList == "") ? "" : ",") + ($("#slCurrency" + currentRowID).val() == "" ? "NULL" : $("#slCurrency" + currentRowID).val());
                pExchangeRateList += ((pExchangeRateList == "") ? "" : ",") + ($("#slCurrency" + currentRowID + " option:selected").attr("MasterDataExchangeRate") == "" ? "NULL" : $("#slCurrency" + currentRowID + " option:selected").attr("MasterDataExchangeRate"));
                pNotesList += ((pNotesList == "") ? "" : ",") + ($("#txtNotes" + currentRowID).val().trim() == "" ? "0" : $("#txtNotes" + currentRowID).val().trim().toUpperCase());
                for (var j = 1; j <= pNumberOfChargesPerRow; j++) {
                    var pChargeTypeID = $("#slPricingSettings :nth-child(" + j + ")").val();
                    var pChargeTypeName = $("#slPricingSettings :nth-child(" + j + ")").text();
                    var pChargeTypeNameWithOnlyCharsAndNos = pChargeTypeName.replace(/[^\w]/g, '') + pChargeTypeID; //Keep only characters and numbers
                    pPricingChargeIDList += ((pPricingChargeIDList == "") ? "" : ",") + $("#txt" + pChargeTypeNameWithOnlyCharsAndNos + currentRowID).attr("PricingChargeID");
                    pCostPriceList += ((pCostPriceList == "") ? "" : ",") + ($("#txt" + pChargeTypeNameWithOnlyCharsAndNos + currentRowID).val() == "" ? "0" : $("#txt" + pChargeTypeNameWithOnlyCharsAndNos + currentRowID).val());
                }


            } //of for loop
            var pParametersWithValues = {
                pSelectedIDsToSave: pSelectedIDsToSave
                , pIsInsertList: pIsInsertList
                , pPricingTypeIDList: pPricingTypeIDList
                , pCustomerIDList: pCustomerIDList
                , pCustomerReferenceList: pCustomerReferenceList
                , pAgentIDList: pAgentIDList
                , pShippingLineIDList: pShippingLineIDList
                , pAirlineIDList: pAirlineIDList
                , pTruckerIDList: pTruckerIDList
                , pCCAIDList: pCCAIDList
                , pPOLCountryIDList: pPOLCountryIDList
                , pPOLIDList: pPOLIDList
                , pPODCountryIDList: pPODCountryIDList
                , pPODIDList: pPODIDList
                , pEquipmentIDList: pEquipmentIDList
                , pPackageTypeIDList: pPackageTypeIDList
                , pCommodityIDList: pCommodityIDList

                , pTransitTimeList: pTransitTimeList
                , pFrequencyList: pFrequencyList
                , pFrequencyNotesList: pFrequencyNotesList
                , pFreeTimeList: pFreeTimeList
                , pValidFromList: pValidFromList
                , pValidToList: pValidToList
                , pCurrencyIDList: pCurrencyIDList
                , pExchangeRateList: pExchangeRateList

                , pPricingChargeIDList: pPricingChargeIDList
                , pCostPriceList: pCostPriceList

                , pNotesList: pNotesList
                , pIsPricingRequest: (glbCallingControl == "PricingRequest" ? true : false)
                //LoadWithPaging parameters
                , pWhereClausePricing: Pricing_GetWhereClause()
                , pPageSize: $("#select-page-size").val()
                , pPageNumber: (($("#div-Pager li.active a").text() == "" || pIsInsertList.split('1').length > 1) ? 1 : $("#div-Pager li.active a").text())
                , pOrderBy: "ID DESC" //"SupplierName, ID DESC" //"PricingTypeID, SupplierName, POLName, PODName"
            }
            CallPOSTFunctionWithParameters("/api/Pricing/Pricing_SaveList", pParametersWithValues
                , function (pData) {
                    debugger;
                    var _MessageReturned = pData[0];
                    var pPricingIDs = pData[3];
                    if (_MessageReturned == "") {
                        Pricing_BindTableRows(JSON.parse(pData[1]), JSON.parse(pData[2]));
                        swal("Success", "Saved successfully.");
                        debugger;
                        if (window.location.href.indexOf('forwardingbedaya') != -1) {//http://localhost:7060/
                            $.ajax({
                                url: 'https://forwardingcelia.istegy.com/api/Pricing/Pricing_SaveList?pPricingBedayaIDs=' + pPricingIDs +'&targetCompany=celia&pricing_SaveListDataObject=' + encodeURIComponent(JSON.stringify(pParametersWithValues)), 
                                type: 'POST', // Use POST method
                                contentType: 'application/json', // Set content type to JSON
                                data: JSON.stringify(pParametersWithValues), 
                                success: function (response) {
                                    debugger;
                                    console.log(response);
                                    if (_MessageReturned == "") {
                                        swal("Success", "Saved to Celia successfully.");
                                    }
                                },
                                error: function (xhr, status, error) {
                                    debugger;
                                    swal("Sorry", "Please, try again. Celia Api request error", "");
                                    console.error('Error:', error);
                                }
                            });

                        }
                    }
                    else
                        swal("Sorry", _MessageReturned);
                    FadePageCover(false);
                   
                }
                , null);
               
            
        }

   
    }//of if (pSelectedIDsToSave != "")
    else {
        swal("Sorry", "You didn't update any records.");
    }
}
function Pricing_DeleteList() {
    debugger;
    if (GetAllSelectedIDsAsString('tblPricing') != "")
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
            CallGETFunctionWithParameters("/api/Pricing/Pricing_Delete"
                , {
                    pPricingIDsDeleted: GetAllSelectedIDsAsString('tblPricing')
                    , pWhereClausePricing: Pricing_GetWhereClause() //"WHERE IsDeleted=0"
                    , pPageSize: $("#select-page-size").val()
                    , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
                    , pOrderBy: "ID DESC" //"SupplierName, ID DESC"
                }
                , function (pData) {
                    if (!pData[0])
                        swal("Sorry", strDeleteFailMessage);
                    else {
                        swal("Success", "Deleted successfully.");
                    }
                    Pricing_BindTableRows(JSON.parse(pData[1]), JSON.parse(pData[2]));
                    FadePageCover(false);
                });
        });
}
function Pricing_FillPorts(pCountryControlID, pPortControlID, pPortID) {
    debugger;
    if ($("#" + pCountryControlID).val() != "") {
        FadePageCover(true);
        GetListWithCodeAndNameAndWhereClause(pPortID, "/api/Ports/LoadAll", "<--Select-->", pPortControlID, " WHERE CountryID=" + $("#" + pCountryControlID).val(), function () { FadePageCover(false); });
    }
    else
        $("#" + pPortControlID).html("<option value=''><--Select--></option>");
}
function Pricing_PricingTypeChanged(pPricingTypeControlID, pSupplierControlID, pSupplierID) {
    debugger;
    var pFunctionName = "";
    var pWhereClause = "WHERE 1=1 ORDER BY Name";
    var pFirstRow = "<--Select-->";
    //if (intPricingType == "")
    //    $("#" + pSupplierControlID).html("<option value=''>" + pFirstRow + "</option>");
    //else {
    //    if (intPricingType == constPricingOcean) {
    //        pFunctionName = "/api/ShippingLines/LoadAll";
    //    }
    //    else if (intPricingType == constPricingAir) {
    //        pFunctionName = "/api/Airlines/LoadAll";
    //    }
    //    else if (intPricingType == constPricingInland) {
    //        pFunctionName = "/api/Truckers/LoadAll";
    //    }
    //    else if (intPricingType == constPricingCustomsClearance) {
    //        pFunctionName = "/api/CustomsClearanceAgents/LoadAll";
    //    }

    if ($("#" + pPricingTypeControlID).val() == "")
        $("#" + pSupplierControlID).html("<option value=''>" + pFirstRow + "</option>");
    else {
        if ($("#" + pPricingTypeControlID).val() == constPricingOcean) {
            pFunctionName = "/api/ShippingLines/LoadAll";
        }
        else if ($("#" + pPricingTypeControlID).val() == constPricingAir) {
            pFunctionName = "/api/Airlines/LoadAll";
        }
        else if ($("#" + pPricingTypeControlID).val() == constPricingInland) {
            pFunctionName = "/api/Truckers/LoadAll";
        }
        else if ($("#" + pPricingTypeControlID).val() == constPricingCustomsClearance) {
            pFunctionName = "/api/CustomsClearanceAgents/LoadAll";
        }
        FadePageCover(true);
        GetListWithNameAndWhereClause(pSupplierID, pFunctionName, pFirstRow, pSupplierControlID, pWhereClause, function () { FadePageCover(false); });
    }
}
function Pricing_SetIsRowChanged(pControlID) {
    debugger;
    var ChangedRowID = $("#" + pControlID).parent().parent().attr("ID");
    $("#SelectedIDsToUpdate" + ChangedRowID).prop("checked", true);
}
function Pricing_FillQuotationModalControls() {
    debugger;
    var pSelectedIDs = GetAllSelectedIDsAsString('tblPricing');
    if (pSelectedIDs == "")
        swal("Sorry", "Please, select at least one record to create a quotation.");
    else if (!Pricing_IsValidationDatesValid(pSelectedIDs))
        swal("Sorry", "Check the validation dates for the selected items.");
    else {
        var NumberOfSelectRows = pSelectedIDs.split(',').length;
        var pIsInsertList = "";
        for (var i = 0; i < NumberOfSelectRows; i++)
            pIsInsertList += ((pIsInsertList == "") ? "" : ",") + ($("#IsInsert" + pSelectedIDs.split(",")[i]).prop("checked") ? "1" : "0");
        if (pIsInsertList.split('1').length > 1)
            swal("Sorry", "One or more records are selected but not saved. Please, save them.");
        else {
            FadePageCover(true);
            var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
            ClearAll("#QuotationModal");
            jQuery("#QuotationModal").modal("show");
            $("#txtOpenDate").val(FormattedTodaysDate);
            //$("#txtQuotationExpirationDate").val(TodaysDate.addDays(TodaysDate, 30));

            //Fill Quotation modal select boxes
            CallGETFunctionWithParameters("/api/Pricing/Pricing_GetQuotationModalData"
                , { pGetQuotationModalData: "" }
                , function (pData) {
                    var pShipper = pData[0];
                    var pConsignee = pData[1];
                    var pAgent = pData[2];
                    var pSalesman = pData[3];
                    FillListFromObject(null, 2, "<--Select-->"/*Shipper*/, "slShippers", pShipper, null);
                    FillListFromObject(null, 2, "<--Select-->"/*Consignee*/, "slConsignees", pConsignee, null);
                    FillListFromObject(null, 2, "<--Select-->"/*Agent*/, "slAgents", pAgent, null);
                    FillListFromObject($("#hLoggedUserID").val(), 2, "<--Select-->"/*Salesman*/, "slQuotationSalesman", pSalesman, null);
                    FadePageCover(false);
                }
                , null);

            $("#cbIsImport").prop('checked', true);
            if (intPricingType == constPricingOcean) {
                $("#cbIsOcean").prop('checked', true);
                $("#secShipmentType").removeClass("hide");//show section of Shipment Types radios(FCL,....)
                $("#cbIsFCL").prop('checked', true); //set cbIsFCL to the default value
                $("input[name=cbTransportType]").attr("disabled", "disabled");
            }
            else if (intPricingType == constPricingAir) {
                $("#cbIsAir").prop('checked', true);
                $("#secShipmentType").addClass("hide");
                $("input[name=cbTransportType]").attr("disabled", "disabled");
            }
            else if (intPricingType == constPricingInland) {
                $("#cbIsInland").prop('checked', true);
                $("#secShipmentType").removeClass("hide");
                $("#cbIsFTL").prop('checked', true);
                $("input[name=cbTransportType]").attr("disabled", "disabled");
            }
            if (intPricingType == constPricingCustomsClearance) {
                $("#cbIsOcean").prop('checked', true);
                $("#secShipmentType").removeClass("hide");//show section of Shipment Types radios(FCL,....)
                $("#cbIsFCL").prop('checked', true); //set cbIsFCL to the default value
                $("input[name=cbTransportType]").removeAttr("disabled");
            }
            DirectionType_SetIconNameAndStyle();
            TransportType_SetIconNameAndStyle();
        }
    }
}
function Pricing_CreateQuotationFromPricing() {
    debugger;
    var pCreateQuotationFromPricingIDs = GetAllSelectedIDsAsString('tblPricing');
    var CurrentYear = getTodaysDateInddMMyyyyFormat().split("/")[2];
    $("#slShippers").removeClass("validation-error");
    $("#slAgents").removeClass("validation-error");
    $("#slConsignees").removeClass("validation-error");
    if ($("#slSalesLead").val() != "") {
        $("#slShippers").attr("data-required", "false");
        $("#slAgents").attr("data-required", "false");
        $("#slConsignees").attr("data-required", "false");
    }
    else
        DirectionType_SetIconNameAndStyle();
    if (ValidateForm("form", "QuotationModal")) {
        FadePageCover(true);
        var pParametersWithValues = {
            pCreateQuotationFromPricingIDs: pCreateQuotationFromPricingIDs
            , pQuotationCode: "Q" + (CurrentYear - 2000) + GetDirectionType($('input[name=cbDirectionType]:checked').val()).substring(0, 3)
                                         + GetTransportType($('input[name=cbTransportType]:checked').val()).substring(0, 2)
            , pBranchID: $("#hUserBranchID").val()
            , pSalesmanID: $('#slQuotationSalesman').val()
            , pDirectionType: $('input[name=cbDirectionType]:checked').val()
            , pDirectionIconName: $("#hDirectionIconName").val()
            , pDirectionIconStyle: $("#hDirectionIconStyle").val()
            , pTransportType: $('input[name=cbTransportType]:checked').val()
            , pTransportIconName: $("#hTransportIconName").val()
            , pTransportIconStyle: $("#hTransportIconStyle").val()
            , pShipmentType: ($('input[name=cbTransportType]:checked').val() == 2 ? 0 : $('input[name=cbShipmentType]:checked').val())
            //, pShipperID: (($('#slShippers').val() == "" || $('input[name=cbDirectionType]:checked').val() == 1)
            //    ? 0 : $('#slShippers').val())
            //, pConsigneeID: (($('#slConsignees').val() == "" || $('input[name=cbDirectionType]:checked').val() == 2 || $('input[name=cbDirectionType]:checked').val() == 3)
            //    ? 0 : $('#slConsigneess').val())
            , pShipperID: ($('#slShippers').val() == "" ? 0 : $('#slShippers').val())
            , pConsigneeID: ($('#slConsignees').val() == "" ? 0 : $('#slConsignees').val())
            , pAgentID: ($('#slAgents').val() == "" ? 0 : $('#slAgents').val())
            , pOpenDate: ConvertDateFormat($("#txtOpenDate").val().trim())
            , pIsDangerousGoods: $("#cbDangerousGoods").prop("checked")
            , pDescriptionOfGoods: $("#divGoodsDescription").val().trim() == "" ? "0" : $("#divGoodsDescription").val().trim().toUpperCase()

            , pProfitType: $("input[name=cbProfitType]:checked").val()
            , pProfitAmount: $("#txtProfitAmount").val().trim() == "" ? 0 : $("#txtProfitAmount").val().trim()
            , pSalesLeadID: $("#slSalesLead").val() == "" ? 0 : $("#slSalesLead").val()
    }
        CallGETFunctionWithParameters("/api/Pricing/Pricing_CreateQuotationFromPricing"
            , pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    var pCreatedQuotationID = pData[1];
                    var pInsertedQuotationCode = pData[2];
                    swal("Success", "Quotation " + pInsertedQuotationCode + " created successfully.");
                    LoadViews("QuotationsEdit", null, pCreatedQuotationID);
                    jQuery("#QuotationModal").modal("hide");
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
            , null);
    }
}
function Pricing_IsValidationDatesValid(pSelectedIDs) {
    debugger;
    var IsValid = true;
    var TodaysDate = new Date();
    var FormattedTodaysDate = TodaysDate.toLocaleDateString();
    for (var i = 0; i < pSelectedIDs.split(',').length; i++)
        if (Date.prototype.compareDates(FormattedTodaysDate, ConvertDateFormat($("#txtValidTo" + pSelectedIDs.split(',')[i]).val())) < 0
            || Date.prototype.compareDates(ConvertDateFormat($("#txtValidFrom" + pSelectedIDs.split(',')[i]).val()), FormattedTodaysDate) < 0)
            IsValid = false;
    return IsValid;
}
function Pricing_PrintLog(pPricingID) {
    debugger;
    FadePageCover(true);
    var pParametersWithValues = {
        pWhereClausePricingLog: "WHERE PricingID=" + pPricingID
    }
    CallGETFunctionWithParameters("/api/Pricing/PricingLog_LoadAll", pParametersWithValues
        , function (pData) {
            var pReportRows = JSON.parse(pData[0]);
            var mywindow = window.open('', '_blank');
            var ReportHTML = '';
            //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
            ReportHTML += '<html>';
            ReportHTML += '     <head><title>' + 'Pricing Log' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
            ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + 'Pricing Log' + '</h3></div> </br>';

            //ReportHTML += '             <div class="col-xs-4"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
            //ReportHTML += '             <div class="col-xs-4"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
            //ReportHTML += '             <div class="col-xs-3"><b>Salesman :</b> ' + $("#slSalesman option:selected").text() + '</div>';
            //ReportHTML += '             <div class="col-xs-3"><b>Customer :</b> ' + $("#slCustomer option:selected").text() + '</div>';
            //ReportHTML += '             <div class="col-xs-3"><b>Agent :</b> ' + $("#slAgent option:selected").text() + '</div>';
            ////ReportHTML += '             <div class="col-xs-3"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
            //ReportHTML += '             <div class="col-xs-3"><b>Quot. Status :</b> ' + $("#slQuotationStages option:selected").text() + '</div>';
            //ReportHTML += '             <div class="col-xs-4"><b>Period :</b> ' + ($("#txtFromDate").val() == "" && $("#txtToDate").val() == ""
            //                                                                            ? "All Dates"
            //                                                                            : ($("#txtFromDate").val() == "" ? "" : "From " + $("#txtFromDate").val() + " ") + ($("#txtToDate").val() == "" ? "" : "To " + $("#txtToDate").val())) + '</div>';
            //ReportHTML += '             <div class="col-xs-12"><b>ChargeType :</b> ' + $("#slChargeType option:selected").text() + '</div>';
            ////ReportHTML += '                 <section class="panel panel-default">';
            //ReportHTML += '                     <div class="table-responsive">';
            //ReportHTML += '                         <div> &nbsp; </div>'

            //ReportHTML += '                         <table id="tblPricingLog" class="table table-striped text-sm table-hover b-t b-r b-b b-l print">';//remove t1 class to remove row numbers
            ReportHTML += '                         <table id="tblPricingLog" class="table table-striped text-sm table-bordered  " style="border:solid #000 !important;">';//style="border-left:solid #999 !important;border-top:solid #999 !important;"
            ReportHTML += '                             <thead>';
            ReportHTML += '                                 <tr class="" style="font-size:95%;">';
            ReportHTML += '                                     <th>Date</th>';
            ReportHTML += '                                     <th>Customer</th>';
            ReportHTML += '                                     <th>Supplier</th>';
            ReportHTML += '                                     <th>From</th>';
            ReportHTML += '                                     <th>To</th>';
            ReportHTML += '                                     <th>Commodity</th>';
            ReportHTML += '                                     <th style="width:30%;">Expiration & Charges</th>';
            ReportHTML += '                                 </tr>';
            ReportHTML += '                             </thead>';
            ReportHTML += '                             <tbody>';
            $.each((pReportRows), function (i, item) {
                ReportHTML += '                             <tr style="font-size:95%;">';
                ReportHTML += '                                 <td>' + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + '</td>';
                ReportHTML += '                                 <td>' + item.CustomerName + '</td>';
                ReportHTML += '                                 <td>' + (intPricingType == constPricingOcean ? item.ShippingLineName : (intPricingType == constPricingAir ? item.AirlineName : (intPricingType == constPricingInland ? item.TruckerName : (intPricingType == constPricingCustomsClearance ? item.CCAName : "")))) + '</td>';
                ReportHTML += '                                 <td>' + item.POL + '</td>';
                ReportHTML += '                                 <td>' + item.POD + '</td>';
                ReportHTML += '                                 <td>' + item.CommodityName + '</td>';
                ReportHTML += '                                 <td>' + item.Notes.replace(/\n/g, "<br/>") + '</td>';
                //ReportHTML += "                                 <td><input type='checkbox' disabled='disabled' " + (item.IsExpired ? " checked='checked' " : "") + " /></td>";
                ReportHTML += '                             </tr>';
            });
            ReportHTML += '                             </tbody>';
            ReportHTML += '                         </table>';


            //ReportHTML += '                     </div>';//of table-responsive
            //ReportHTML += '             <div class="col-xs-12"><b>Profit Margin :</b> ' + pMarginSummary + '%</div>';

            ReportHTML += '         </body>';
            ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            ////ReportHTML += '         <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';
            //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.IsPrintISOCode input[type=checkbox]").prop("checked"))
            //    ReportHTML += '     <div class="row m-l">' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ISOCode").text() + '</div>';
            //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
            ReportHTML += '     </footer>';

            ReportHTML += '</html>';
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
            FadePageCover(false);
        }
        , null);
}
/**********************************Send Notification*************************************************/
function Pricing_Notify(pID) {
    debugger;
    Receptionists_GetAvailableUsers();
    $("#btnCheckboxesListApply").attr("onclick", "Pricing_SendLocalEmail(" + pID + ");");
    $("#btnCheckboxesListApply").html("<span class='glyphicon glyphicon-send'></span> Send");
    $("#btn-SearchItems").attr("onclick", "Receptionists_GetAvailableUsers();");
}
function Pricing_SendLocalEmail(pID) {
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
            , pSubject: "Sent From Pricing"
            , pBody: "Body from pricing"
            , pQuotationRouteID: 0
            , pPricingID: pID
            , pRequestOrReply: (glbCallingControl == "PricingRequest" ? constRequest : constReply)
            , pOperationID: 0
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
///////////////////////////////////////Quotations Modal Functions (some are called from Quotations)//////////
//show and hide the order details with FCl, LCL, FTL, LTL, Air, .... changes
function Quotations_TransportTypeChanged() {
    TransportType_SetIconNameAndStyle();
    Quotations_ShipmentTypeChanged();
}
function Quotations_ShipmentTypeChanged() {
    debugger;
    if ($('input[name=cbTransportType]:checked').val() == 2)//Air
    {
        $("#divFCL").addClass("hide");
        $("#divLCL").removeClass("hide");
        $("#lblWtMsr").addClass("hide");
        $("#lblChargeableWeight").removeClass("hide");
    }
    else // Ocean or Inland
        if ($('input[name=cbShipmentType]:checked').val() == 1 //FCL or FTL
            || $('input[name=cbShipmentType]:checked').val() == 3) {
            $("#divLCL").addClass("hide");
            $("#divFCL").removeClass("hide");
        }
        else {
            $("#divFCL").addClass("hide");
            $("#divLCL").removeClass("hide");
        }
}
function Quotation_cbIsSalesLeadChange() {
    debugger;
    if ($("#cbIsSalesLead").prop("checked"))
        $(".classHideForSalesLead").addClass("hide");
    else
        $(".classHideForSalesLead").removeClass("hide");
}

function Pricing_Print() {
    var pWhereClause = Pricing_GetWhereClause();
    pWhereClause = pWhereClause.replaceAll("ValidTo", "CONVERT(date, ValidTo, 103)");
    CallGETFunctionWithParameters("/api/Pricing/GetPricingPrintData", { pWhereClause: pWhereClause }
        , function (pResponse) {
            if (pResponse.success) {
                debugger;
                var data = JSON.parse(pResponse.data);
                var charges = JSON.parse(pResponse.charges);
                
                console.log(data);
                console.log(charges);

                var ReportHTML = '';
                var TableHTML = '';
                ReportHTML += '<html>';
                ReportHTML += ' <head><title>Pricing</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                ReportHTML += '     <body style="background-color:white;padding:.5%;">';

                ReportHTML += '         <div style="border:1px solid black;">';

                ReportHTML += '         <div class="form-group clearfix" style="border-bottom:1px solid silver;padding:.5%;">';
                ReportHTML += '                             <div class="row col-sm-12">';
                ReportHTML += '                                            <div class="table-responsive" style="font-size:100%;display: block;overflow-x: auto;white-space: nowrap;">';
                ReportHTML += '                                                <table class="table table-striped b-t b-light text-sm  table-hover" style="width:100%;">';

                TableHTML += '                                                    <thead>';
                TableHTML += '                                                        <tr>';
                TableHTML += '                                                            <th>Ser</th>';
                TableHTML += '                                                            <th>Agent</th>';
                TableHTML += '                                                            <th>Carrier</th>';
                TableHTML += '                                                            <th>POL Country /POL</th>';
                TableHTML += '                                                            <th>POD Country /POD</th>';
                TableHTML += '                                                            <th>Equip</th>';
                TableHTML += '                                                            <th>Other Equip</th>';
                TableHTML += '                                                            <th>Commodity</th>';
                TableHTML += '                                                            <th>T/T</th>';
                TableHTML += '                                                            <th>Freq</th>';
                TableHTML += '                                                            <th>Free Time</th>';
                TableHTML += '                                                            <th>Valid From</th>';
                TableHTML += '                                                            <th>Valid To</th>';
                TableHTML += '                                                            <th>Notes</th>';
                $.each(charges, function (c, chg) {
                    TableHTML += '                                                            <th>' + chg.ChargeTypeCode + '/' + chg.CurrencyCode + '</th>';
                });
                TableHTML += '                                                        </tr>';
                TableHTML += '                                                    </thead>';

                TableHTML += '                                                    <tbody>';

                var serial = 1;
                $.each(data, function (i, item) {
                    TableHTML += '                                                        <tr>';
                    TableHTML += '                                                            <td>' + serial + '</td>';
                    TableHTML += '                                                            <td>' + item[0].AgentName + '</td>';
                    TableHTML += '                                                            <td>' + item[0].SupplierName + '</td>';
                    TableHTML += '                                                            <td>' + item[0].POLCountryName + ' /' + item[0].POLName + '</td>';
                    TableHTML += '                                                            <td>' + item[0].PODCountryName + ' /' + item[0].PODName + '</td>';
                    TableHTML += '                                                            <td>' + item[0].EquipmentCode + '</td>';
                    TableHTML += '                                                            <td>' + item[0].PackageTypeName + '</td>';
                    TableHTML += '                                                            <td>' + item[0].CommodityName + '</td>';
                    TableHTML += '                                                            <td>' + item[0].TransitTime + '</td>';
                    TableHTML += '                                                            <td>' + item[0].Frequency + '</td>';
                    TableHTML += '                                                            <td>' + item[0].FreeTime + '</td>';
                    TableHTML += '                                                            <td>' + item[0].ValidFrom + '</td>';
                    TableHTML += '                                                            <td>' + item[0].ValidTo + '</td>';
                    TableHTML += '                                                            <td>' + item[0].Notes + '</td>';
                    for (var i = 0; i < charges.length; i++) {
                        TableHTML += '                                                            <td id="td_'+serial+'_'+i+'"></td>';
                    }
                    $.each(item, function (c, chg) {
                        for (var i = 0; i < charges.length; i++) {
                            if (charges[i].ChargeTypeCode == chg.ChargeTypeCode && charges[i].CurrencyCode == chg.CurrencyCode) {
                                TableHTML = TableHTML.replace('<td id="td_'+serial+'_'+i+'"></td>', '<td>' + chg.CostPrice + '</td>');
                                break;
                            }
                        }
                    });
                    TableHTML += '                                                        </tr>';
                    serial++;
                });
                TableHTML += '                                                    </tbody>';
                debugger;
                $("#tblPricingPrintData").addClass("hide");
                $('#tblPricingPrintData').html(TableHTML);
                ExportHtmlTableToCsv('tblPricingPrintData', 'PricingReport');
                ReportHTML += TableHTML;
                ReportHTML += '                                                </table>';
                ReportHTML += '                                            </div>';
                ReportHTML += '                             </div>';
                ReportHTML += '                             </br>';

                ReportHTML += '           </div>';
                ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                ReportHTML += '         &emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>';
                ReportHTML += '     </footer>';
                ReportHTML += '     </div>';

                ReportHTML += '</body>';
                ReportHTML += '</html>';

                var mywindow = window.open('', '_blank');
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }
            else
                swal("Sorry", "Connection failed, please try again.");
            FadePageCover(false);
        }
        , null);
}

