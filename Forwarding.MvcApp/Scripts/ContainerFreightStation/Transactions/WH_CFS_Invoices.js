
//#region M A I N   F U N C T I O N S
var SelectedHouseBillID = 0
var WarehouseDefaultInvoiceTypeID = 0
var WarehouseDefaultTariffID = 0
var DraftInvoiceTypeID = 0
var CanDeleteReceivebles = false
var SavedInvoiceID = 0

function WH_CFS_InvoicesInit() {
    debugger;
    WH_CFS_Invoices_LoadWithPagingWithWhereClauseAndOrderBy();

    $("#hl-menu-ContainerFreightStationTransactions").parent().addClass("active");
    if (pDefaults.UnEditableCompanyName == "UNF") {
        $(".classShowForUNF").removeClass("hide");
        $("#slInvoiceAddressTypes").attr("data-required", "false");
    }
}

function WH_CFS_Invoices_LoadWithPagingWithWhereClauseAndOrderBy() {
    debugger;

    var pWhereClause = WH_CFS_Invoices_GetWhereClause();
    strLoadWithPagingFunctionName = "/api/WH_CFS_Invoices/WH_CFS_Invoices_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";
    var pOrderBy = " OperationNumber DESC, ContainerNumber DESC, HouseNumber DESC ";
    if (IsMESCOCompany) {
        pOrderBy = " OperationID DESC";
    }
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pPageSize = $('#select-page-size').val();
    var pControllerParameters = { pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }

    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
        , function (pData) {
            if (pData[0]) {
                WH_CFS_Invoices_BindTableRows(JSON.parse(pData[2]));
                $("#spn-total-count").text(pData[1]); //_RowCount
            }
            else {
                swal("Sorry", "Connection failed, please try again.");
            }
        });
    HighlightText("#tblWH_CFS_Invoices>tbody>tr", $("#txt-Search").val().trim());
}

function WH_CFS_Invoices_GetWhereClause() {
    debugger;
    var pWhereClause = "WHERE ROWLOCATIONID > 0 and InventoryID NOT IN (SELECT WH_ReleaseOrders.InventoryID FROM WH_ReleaseOrders )\n";

    if ($("#txt-Search").val().trim() != "") {
        // Search bar: search by House Number
        var s = $("#txt-Search").val().trim();
        pWhereClause += "AND HouseNumber = N'" + s + "'\n";
    } else {
        // Filter modal fields
        if ($("#txtFilterOperationNumber").val().trim() != "")
            pWhereClause += "AND OperationSerial = N'" + $("#txtFilterOperationNumber").val().trim() + "'\n";


        if ($("#txtFilterContainerNumber").val().trim() != "")
            pWhereClause += "AND ContainerNumber Like N'%" + $("#txtFilterContainerNumber").val().trim() + "%'\n";

        if ($("#txtFilterMasterBL").val().trim() != "")
            pWhereClause += "AND MasterBL = N'" + $("#txtFilterMasterBL").val().trim() + "'\n";

        if ($("#txtFilterHouseNumber").val().trim() != "")
            pWhereClause += "AND HouseNumber Like N'%" + $("#txtFilterHouseNumber").val().trim() + "%'\n";

        if ($("#txtFilterConsignee").val().trim() != "")
            pWhereClause += "AND Consignee = N'" + $("#txtFilterConsignee").val().trim() + "'\n";

        if ($("#txtFilterBookingParty").val().trim() != "")
            pWhereClause += "AND BookingParty = N'" + $("#txtFilterBookingParty").val().trim() + "'\n";

        if ($("#txtFilterStorageLocation").val().trim() != "")
            pWhereClause += "AND StorageLocation = N'" + $("#txtFilterStorageLocation").val().trim() + "'\n";

        if ($("#txtFilterGrossWeight").val().trim() != "")
            pWhereClause += "AND GrossWeight = " + $("#txtFilterGrossWeight").val().trim() + "\n";

        if ($("#txtFilterNetWeight").val().trim() != "")
            pWhereClause += "AND NetWeight = " + $("#txtFilterNetWeight").val().trim() + "\n";

        if ($("#txtFilterVolume").val().trim() != "")
            pWhereClause += "AND Volume = " + $("#txtFilterVolume").val().trim() + "\n";
    }

    return pWhereClause;
}

function WH_CFS_Invoices_BindTableRows(pTableRows) {
    debugger;
    //$("#hl-menu-DASCreditNotes").parent().addClass("active");
    ClearAllTableRows("tblWH_CFS_Invoices");
    if (IsMESCOCompany)
        $(".showForMESCO").removeClass("hide");
    var printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";

    $.each(pTableRows, function (i, item) {
        debugger;
        AppendRowtoTable("tblWH_CFS_Invoices",
        ("<tr ID='" + item.InventoryID + "' ondblclick='WH_CFS_Invoices_EditByDblClick(" + item.InventoryID + "," + item.HouseBillID + ");'>"

                    //+ "<td class='OperationID'> <input name='Delete' id='" + item.OperationID + "' type='checkbox' value='" + item.OperationID + "' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);'/></td>"
                    + "<td class='OperationNumber' style=text-transform:uppercase' >" + item.OperationNumber + "</td>"
                    + "<td class='MasterBL' style=text-transform:uppercase' >" + (item.MasterBL == 0 ? "" : item.MasterBL) + "</td>"
                    + "<td class='ContainerNumber' style=text-transform:uppercase' >" + item.ContainerNumber + "</td>"
                    + "<td class='HouseNumber' style=text-transform:uppercase' >" + item.HouseNumber + "</td>"
                    + "<td class='Consignee' style=text-transform:uppercase' >" + item.Consignee + "</td>"
                    + "<td class='BookingParty' style=text-transform:uppercase' >" + item.BookingParty + "</td>"
                    + "<td class='StorageLocation' style=text-transform:uppercase' >" + item.StorageLocation + "</td>"
                    + "<td class='EntryDate' style=text-transform:uppercase' >" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.EntryDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.EntryDate))) + "</td>"
                    + "<td class='OperationID hide'>" + item.OperationID + "</td>"
                    + "<td class='ContainerID hide'>" + item.ContainerID + "</td>"
                    + "<td class='HouseBillID hide'>" + item.HouseBillID + "</td>"
                    + "<td class='ConsigneeID hide'>" + item.ConsigneeID + "</td>"
                    + "<td class='OperationPartnerID hide'>" + item.OperationPartnerID + "</td>"
                    + "<td class='BookingPartyID hide'>" + item.BookingPartyID + "</td>"


        + "</tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblWH_CFS_Invoices", "ID", "cb-CheckAll");
    CheckAllCheckbox("HeaderDeleteInquiryID");
    HighlightText("#tblWH_CFS_Invoices>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function WH_CFS_Invoices_EditByDblClick(SelectedInventoryID, HouseBillID) {
    debugger;

    ClearAll("#ModelWH_CFS_Invoices");
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    $('.BkForUNF').css('background-image', 'none');

    SelectedHouseBillID = HouseBillID

    if (SelectedHouseBillID == 0) { // FCL Row
        $("#dvEmptyContainer").removeClass("hide");
        $("#dvHouseBill").addClass("hide");
        $("#dvKalmarOnCount").removeClass("hide");
        $("#dvKalmarOffCount").removeClass("hide");
        $("#dvNoKalmarCount").addClass("hide");
        $("#txtKalmarOnCount").attr("data-required", "true");
        $("#txtKalmarOffCount").attr("data-required", "true");
    }
    else {
        $("#dvEmptyContainer").addClass("hide");
        $("#dvHouseBill").removeClass("hide");
        $("#dvKalmarOnCount").addClass("hide");
        $("#dvKalmarOffCount").addClass("hide");
        $("#dvNoKalmarCount").removeClass("hide");
        $("#txtKalmarOnCount").attr("data-required", "false");
        $("#txtKalmarOffCount").attr("data-required", "false");
    }

    jQuery("#ModelWH_CFS_Invoices").modal("show");

    $("#btn-GenerateReceivables").attr("disabled", "disabled");
    $("#btn-CalculateInvoice").attr("disabled", "disabled");
   if (pDefaults.UnEditableCompanyName == "UNF") 
        $("#txtStorageEndDate").attr("disabled", false);
 
    var pParametersWithValues = { pInventoryID: SelectedInventoryID };
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/WH_CFS_Invoices/WH_CFS_Invoices_LoadItem", pParametersWithValues
        , function (pData) {
            if (pData[0]) {
                debugger;

                var pGateIn = JSON.parse(pData[1]);
                var pReceiveblesPrivileges = JSON.parse(pData[4]);

                WarehouseDefaultInvoiceTypeID = pData[2];// this is the default tariff invoice type
                WarehouseDefaultTariffID = pData[3];// this is the default tariff 
                DraftInvoiceTypeID = pData[5];// this is the draft type id to be used while saving invoice as islam tarik said 05092023

                if (pDefaults.UnEditableCompanyName == "UNF") {
                    var Routing = JSON.parse(pData[6])[0];
    
                }

                $("#hInventoryID").val(pGateIn.InventoryID);
                $("#hOperationID").val(pGateIn.OperationID);
                $("#hContainerID").val(pGateIn.ContainerID);
                $("#hHouseBillID").val(pGateIn.HouseBillID);
                $("#hWarehouseID").val(pGateIn.WarehouseID);
                $("#hOperationPartnerID").val(pGateIn.OperationPartnerID);
                $("#hBookingPartyID").val(pGateIn.BookingPartyID);

                $("#txtOperationNumber").val(pGateIn.OperationNumber);
                $("#txtMasterBL").val(pGateIn.MasterBL == 0 ? "" : pGateIn.MasterBL);
                $("#txtRoadNumber").val(pGateIn.RoadNumber == 0 ? "" : pGateIn.RoadNumber);
                $("#txtContainerNumber").val(pGateIn.ContainerNumber);
                $("#txtHouseNumber").val(pGateIn.HouseNumber == 0 ? "" : pGateIn.HouseNumber);
                $("#txtConsignee").val(pGateIn.Consignee == 0 ? "" : pGateIn.Consignee);
                $("#txtGrossWeight").val(pGateIn.GrossWeight);
                $("#txtNetWeight").val(pGateIn.NetWeight);
                $("#txtWHCBM").val(pGateIn.Volume);
                $("#txtPackages").val(pGateIn.Packages == 0 ? "" : pGateIn.Packages);
                $("#txtDescriptionOfGoods").val(pGateIn.DescriptionOfGoods == 0 ? "" : pGateIn.DescriptionOfGoods);
                $("#txtContainerType").val(pGateIn.ContainerType == 0 ? "" : pGateIn.ContainerType);
                $("#txtBookingParty").val(pGateIn.BookingParty == 0 ? "" : pGateIn.BookingParty);
                $("#txtStorageLocation").val(pGateIn.StorageLocation == 0 ? "" : pGateIn.StorageLocation);
                $("#txtKalmarOnCount").val(pGateIn.KalmarOnCount == 0 ? "" : pGateIn.KalmarOnCount);
                $("#txtKalmarOffCount").val(pGateIn.KalmarOffCount == 0 ? "" : pGateIn.KalmarOffCount);

                $("#txtEntryDate").val((Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pGateIn.EntryDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pGateIn.EntryDate))));
                if (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pGateIn.StorageEndDate)) < 1) {
                    $("#txtStorageEndDate").val("");
                    $("#btn-GenerateReceivables").attr("disabled", "disabled");

                    $("#txtStorageInvoiceAmount").val("");
                    $("#btn-CalculateInvoice").attr("disabled", "disabled");
                    if (pDefaults.UnEditableCompanyName == "UNF")
                        $("#cbIsCalculateFromATAPOD").removeAttr("disabled");
                }
                else {
                    $("#txtStorageEndDate").val(ConvertDateFormat(GetDateWithFormatMDY(pGateIn.StorageEndDate)));
                    $("#btn-GenerateReceivables").removeAttr("disabled");
                    $("#btn-CalculateInvoice").removeAttr("disabled");
                    if (pDefaults.UnEditableCompanyName == "UNF")
                        $("#cbIsCalculateFromATAPOD").attr("disabled", "disabled");
                }

                if (pDefaults.UnEditableCompanyName == "UNF") {
                    $("#txtATAPOD").val((Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(Routing.ActualArrival)) < 1 ? "UnSpecified" : ConvertDateFormat(GetDateWithFormatMDY(Routing.ActualArrival))));
                    $("#cbIsCalculateFromATAPOD").prop('checked', pGateIn.IsCalculatedFromATAPOD);
                    $("#cbIsCalculateFromATAPODOriginalVal").prop('checked', pGateIn.IsCalculatedFromATAPOD);

                }

            

                Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val(), $("#hContainerID").val(), $("#hHouseBillID").val());

                Invoices_LoadAll($("#hOperationID").val(), $("#hContainerID").val());


                if (pReceiveblesPrivileges.length > 0) {
                    if (pReceiveblesPrivileges[0].CanAdd == true) {
                        $("#btn-AddReceivables").removeClass("hide");
                        //$("#btn-GenerateReceivables").removeClass("hide");
                    }
                    else {
                        $("#btn-AddReceivables").addClass("hide");
                        //$("#btn-GenerateReceivables").addClass("hide");
                    }

                    if (pDefaults.UnEditableCompanyName == "UNF" && pReceiveblesPrivileges[0].CanEdit == true) {
                        $("#btn-MultiRowEditReceivables").removeClass("hide");
                    }
                    else {
                        $("#btn-MultiRowEditReceivables").addClass("hide");
                    }

                    if (pReceiveblesPrivileges[0].CanDelete == true) {
                        $("#btn-DeleteReceivable").removeClass("hide");
                        CanDeleteReceivebles = true;
                        $("#cb-CheckAll-Receivables").attr("Disabled", false);
                    }
                    else {
                        $("#btn-DeleteReceivable").addClass("hide");
                        CanDeleteReceivebles = false;
                        $("#cb-CheckAll-Receivables").attr("Disabled", true);
                    }
                }
                else {
                    $("#btn-AddReceivables").addClass("hide");
                    //$("#btn-GenerateReceivables").addClass("hide");
                    $("#btn-DeleteReceivable").addClass("hide");
                }


                FadePageCover(false);
            }
            else {
                swal("Sorry", "Connection failed, please try again.");
            }
        }
        , null);
}

function WH_CFS_Invoices_GetMissingFields() {
    debugger;
    var strMissingFields = "";// i am sure there is at least 1 missing field isa
    var fieldCount = 0;
    //BasicData Tab

    if ($("#txtStorageEndDate").val().toString().trim() == '')
        strMissingFields += ++fieldCount + " - Storage End Date.\n";
    if ($("#txtKalmarOnCount").val().toString().trim() == '' && SelectedHouseBillID == 0)
        strMissingFields += ++fieldCount + " - Kalmar On Count.\n";
    if ($("#txtKalmarOffCount").val().toString().trim() == '' && SelectedHouseBillID == 0)
        strMissingFields += ++fieldCount + " - Kalmar Off Count.\n";
    return strMissingFields;
}

function WH_CFS_Invoices_Update() {
    debugger;
    if (!ValidateForm("form", "ModelWH_CFS_Invoices")) {
        strMissingFields = WH_CFS_Invoices_GetMissingFields();
        swal("You are missing:", strMissingFields);
    }
    else {
        if (Date.prototype.compareDates(ConvertDateFormat($("#txtEntryDate").val()), ConvertDateFormat($("#txtStorageEndDate").val())) >= 1) {

            //start Inserting Procedure
            FadePageCover(true);
            debugger;
            var pParametersWithValues = {
                pInventoryID: $("#hInventoryID").val(),
                pStorageEndDate: GetDateWithFormatyyyyMMdd($("#txtStorageEndDate").val()),
                pKalmarOnCount: SelectedHouseBillID == 0 ? $("#txtKalmarOnCount").val() : "0",
                pKalmarOffCount: SelectedHouseBillID == 0 ? $("#txtKalmarOffCount").val() : "0"
            };
            if (pDefaults.UnEditableCompanyName == "UNF") {
                pParametersWithValues.pIsCalculatedFromATAPOD = $("#cbIsCalculateFromATAPOD").prop('checked');
            }
            CallGETFunctionWithParameters("/api/WH_CFS_Invoices/WH_CFS_Invoices_Update", pParametersWithValues
                , function (pData) {
                    if (pData[0]) {

                        // WH_CFS_Invoices_LoadWithPagingWithWhereClauseAndOrderBy(); //returned rows

                        $("#btn-GenerateReceivables").removeAttr("disabled");
                        $("#btn-CalculateInvoice").removeAttr("disabled");
                        $("#txtStorageEndDate").attr("disabled", "disabled");
                        $("#btnSave").attr("disabled", "disabled");
                        if (pDefaults.UnEditableCompanyName == "UNF")
                            $("#cbIsCalculateFromATAPOD").attr("disabled", "disabled");
                        swal("Success", "Saved successfully.");
                        if (pDefaults.UnEditableCompanyName == "UNF") {
                            $("#cbIsCalculateFromATAPODOriginalVal").prop('checked', $("#cbIsCalculateFromATAPOD").prop('checked'));
                        }
                        //EnableDisableNotesCnts(true);
                    }
                    else {
                        swal("Sorry", "Connection failed, please try again.");
                        $("#btn-GenerateReceivables").attr("disabled", "disabled");
                        $("#btn-CalculateInvoice").attr("disabled", "disabled");
                    }
                    if (pDefaults.UnEditableCompanyName == "UNF") {
                        Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val(), $("#hContainerID").val(), $("#hHouseBillID").val());

                        Invoices_LoadAll($("#hOperationID").val(), $("#hContainerID").val());
                    }
                    FadePageCover(false);
                }
            , null);
        }
        else {
            $("#btn-GenerateReceivables").attr("disabled", "disabled");
            swal("Data Error", "Storage End Date Must Be Greater Than Entry Date");
        }
    }
}

//#endregion

//#region O T H E R   F U N C T I O N S

function WH_CFS_Invoices_GenerateReceivables(pCalcInvoiceOnly) {
    debugger;
    if (pDefaults.UnEditableCompanyName == "UNF" && $("#cbIsCalculateFromATAPOD").prop("checked") && $("#txtATAPOD").val() == "UNSPECIFIED") {
        swal("Sorry", "ATA POD is UNSPECIFIED");
        return;
    } else if (pDefaults.UnEditableCompanyName == "UNF" && $("#cbIsCalculateFromATAPOD").prop("checked") && Date.prototype.compareDates(ConvertDateFormat($("#txtATAPOD").val()), ConvertDateFormat($("#txtStorageEndDate").val())) < 1) {
        swal("Sorry", "Storage End Date Must Be Greater Than ATA POD");
        return;
    }
    if (WH_CFS_Invoices_GetMissingFields() == "") {

        if (Date.prototype.compareDates(ConvertDateFormat($("#txtEntryDate").val()), ConvertDateFormat($("#txtStorageEndDate").val())) >= 1) {

            //var pParametersWithValues =
            //    {
            //        pInventoryID: $('#hInventoryID').val()
            //        , pIsConsol: $("#hHouseBillID").val().toString().trim() == '0' ? false : true
            //    }
            //CallGETFunctionWithParameters("/api/WH_CFS_Invoices/GenerateReceivables", pParametersWithValues
            if (!pCalcInvoiceOnly) {
                var hasGeneratedReceivables = true;
                CallGETFunctionWithParameters("/api/Receivables/GetReceivablesOnly", {
                    pWhereClause: "WHERE HouseBillID=" + $('#hHouseBillID').val() + " AND ContainerTypeID IS NOT NULL AND TariffID IN (select wt.ID from WH_CSL_Tariff wt inner join WH_CSL_Tariff_Details wtd on wt.ID = wtd.WH_CSL_TariffID inner join ChargeTypes ct on ct.ID = wtd.ChargeTypesID where ct.Name = " + (IsMESCOCompany ? "N'مصاريف التخزين'" : "'Storage At Warehouse'") + ")"
                }, function (pData) {
                    debugger;
                    if (pData == "[]") {
                        hasGeneratedReceivables = false;
                    }
                }, null, false);
                if (hasGeneratedReceivables) {
                    swal("Sorry", "Generated Receivables Before.");
                    return;
                }
            }

            var pParametersWithValues =
                {
                    pHouseBillIDs: $('#hHouseBillID').val()
                    , pInvoiceTypeID: WarehouseDefaultInvoiceTypeID
                    , pCreateInvoice: false
                    , pTariffDetailIDs: '-1'
                    , pCalculateInvoiceOnly: pCalcInvoiceOnly
                }
            CallGETFunctionWithParameters("/api/WH_CFS_Invoices/GenerateReceivablesAndInvoicesForConsol", pParametersWithValues
                  , function (pData) {
                      if (pData[0]) {
                          if (pCalcInvoiceOnly) {
                              if (pData[2] >= 0) {
                                  $('#txtStorageInvoiceAmount').val(pData[2]);
                              }
                              else {
                                  $('#txtStorageInvoiceAmount').val('');
                                  swal("Missing Data", "Please Enter Storage Item in the Storage Tarrif First.");
                              }
                          }
                          else {
                              Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val(), $("#hContainerID").val(), $("#hHouseBillID").val());
                              swal("Success", "Saved successfully.");
                          }
                      }
                      else {
                          swal("Sorry", "Connection failed, please try again.");
                      }
                  }
                  , null);
        }
        else {
            $("#btn-GenerateReceivables").attr("disabled", false);
            swal("Data Error", "Storage End Date Must Be Greater Than Entry Date");
        }
    }
    else {
        var strMissingFields = "";// i am sure there is at least 1 missing field isa
        var fieldCount = 0;

        if ($("#txtStorageEndDate").val().toString().trim() == '')
            strMissingFields += ++fieldCount + " - Storage End Date.\n";
        if ($("#txtKalmarOnCount").val().toString().trim() == '' && SelectedHouseBillID == 0)
            strMissingFields += ++fieldCount + " - Kalmar On Count.\n";
        if ($("#txtKalmarOffCount").val().toString().trim() == '' && SelectedHouseBillID == 0)
            strMissingFields += ++fieldCount + " - Kalmar Off Count.\n";

        swal("You Are Missing For Calculation:", strMissingFields);
    }
}

function WH_CFS_GateInInventory_CalculateStorage() {
    debugger;
    //alert("Calc here");
    if (pDefaults.UnEditableCompanyName == "UNF" && $("#cbIsCalculateFromATAPOD").prop("checked") && $("#txtATAPOD").val().toUpperCase() == "UNSPECIFIED") {
        swal("Sorry", "ATA POD is UNSPECIFIED");
        $("#cbIsCalculateFromATAPOD").attr('checked', false);
        return;
    } else if (pDefaults.UnEditableCompanyName == "UNF" && $("#cbIsCalculateFromATAPOD").prop("checked") && Date.prototype.compareDates(ConvertDateFormat($("#txtATAPOD").val()), ConvertDateFormat($("#txtStorageEndDate").val())) < 1) {
        swal("Sorry", "Storage End Date Must Be Greater Than ATA POD");
        $("#cbIsCalculateFromATAPOD").attr('checked', false);
        return;
    }
    if (($("#hWarehouseID").val().toString().trim() != '') & ($("#txtEntryDate").val().toString().trim() != '') & ($("#txtStorageEndDate").val().toString().trim() != '')) {

        if (Date.prototype.compareDates(ConvertDateFormat($("#txtEntryDate").val()), ConvertDateFormat($("#txtStorageEndDate").val())) >= 1) {

            var date1 = new Date(ConvertDateFormat($("#txtEntryDate").val()));
            var date2 = new Date(ConvertDateFormat($("#txtStorageEndDate").val()));

            if (pDefaults.UnEditableCompanyName == "UNF" && $("#cbIsCalculateFromATAPOD").prop("checked")) {
                date1 = new Date(ConvertDateFormat($("#txtATAPOD").val()));
            }

            // To calculate the no. of days between two dates 
            // var Difference_In_Days = Math.floor((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24)) + 2;
        
            var Difference_In_Days = Math.floor(
                (Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate()) -
                    Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate()))
                / (1000 * 3600 * 24)
            ) + 1;

            $("#txtStorageDays").val(Difference_In_Days);

            var StorageAmount = 0.0;
            var pParametersWithValues =
            {
                pInventoryID: $('#hInventoryID').val(),
                pStorageEndDate: $("#txtStorageEndDate").val()
            };
            if (pDefaults.UnEditableCompanyName == "UNF") {
                pParametersWithValues.pIsCalculatedFromATAPOD = $("#cbIsCalculateFromATAPOD").prop("checked");
            }
            CallGETFunctionWithParameters("/api/WH_CFS_GateInInventory/CalculateStorage", pParametersWithValues
                  , function (pData) {
                      if (pData[0]) {
                          StorageAmount = pData[1];
                      }
                      else {
                          swal("Sorry", "Connection failed, please try again.");
                      }
                  }
                  , function () {
                      if (StorageAmount >= 0) {
                          $('#txtStorageAmount').val(StorageAmount);
                      }
                      else {
                          $('#txtStorageAmount').val('');
                          swal("Missing Data", "Please Enter Storage Item in the Storage Tarrif First.");
                      }

                  });
        }
        else {
            $('#txtStorageAmount').val('');
            swal("Data Error", "Storage End Date Must Be Greater Than Entry Date");
        }
    }
    else {
        var strMissingFields = "";// i am sure there is at least 1 missing field isa
        var fieldCount = 0;

        if ($("#hWarehouseID").val() == 0)
            strMissingFields += ++fieldCount + " - Warehouse.\n";
        if ($("#txtEntryDate").val().toString().trim() == '')
            strMissingFields += ++fieldCount + " - Entry Date.\n";
        if ($("#txtStorageEndDate").val().toString().trim() == '')
            strMissingFields += ++fieldCount + " - Storage End Date.\n";

        swal("Missing For Calculation:", strMissingFields);
        //swal("Data Error", "Please Select Warehouse, Entry Date And Storage End Date First");
    }
}

function DisableControlsAfterInvoice(pBool) {
    $("#btn-GenerateReceivables").attr("disabled", pBool);
    $("#btn-CalculateStorage").attr("disabled", pBool);
    $("#btn-CalculateInvoice").attr("disabled", pBool);
    $("#btn-NewInvoice").attr("disabled", pBool);
    $("#btnSave").attr("disabled", pBool);
    $("#txtStorageEndDate").attr("disabled", pBool);
    if (pDefaults.UnEditableCompanyName == "UNF") {
        $("#btn-NewInvoice").attr("disabled", false);
        $("#btn-CalculateStorage").attr("disabled", false);
        //$("#cbIsCalculateFromATAPOD").attr("disabled", pBool);
    }
}
//#endregion

//#region R E C E I V A B L E S   F U N C T I O N S



function Receivables_GetAvailableCharges() {
    debugger;
    FadePageCover(true);
    $("#divSelectCharges").html("");
    $("#lblShownOperationCode").html($("#hOperationCode").val());
    var pStrFnName = "/api/ChargeTypes/LoadAll";
    var pDivName = "divSelectCharges";
    var ptblModalName = "tblModalReceivables";
    var pCheckboxNameAttr = "cbSelectCharges";
    var pWhereClause = "";

    pWhereClause += " WHERE IsInactive = 0 AND IsWarehouseChargeType=1 ";

    if ($("#hDefaultUnEditableCompanyName").val() != "KADI" && $("#hDefaultUnEditableCompanyName").val() != "UNF")
    {
        pWhereClause += " and Name != N'" + (IsMESCOCompany ? "مصاريف التخزين" : "Storage At Warehouse") + "' ";
    }

    pWhereClause += " AND ( Code LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%' OR Name LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%') ";

    GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
        , function () {
            HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
            FadePageCover(false);
        }
        , 1/*pCodeOrName*/);
    $("#btn-SearchCharges").attr("onclick", "Receivables_GetAvailableCharges();");
    $("#btnSelectChargesApply").attr("onclick", "Receivables_InsertListWithoutValues(false);");

    //FillReceivablesModalTableControls(pStrFnName, pWhereClause, pDivName, ptblModalName, pCheckboxNameAttr, true //pIsInsert
    //    , false /*pIsEditInvoice*/, function () {
    //        HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
    //        $("#btnSelectChargesApply").attr("onclick", "Receivables_InsertListWithValues(false);");
    //    });
    //$("#btn-SearchCharges").attr("onclick", "Receivables_GetAvailableCharges();");
}

function Receivables_InsertListWithoutValues(pSaveandAddNew) {
    debugger;
    var pSelectedIDs = GetAllSelectedIDsAsStringWithNameAttr("cbSelectCharges");//returns string array of IDs
    debugger;
    if (pSelectedIDs != "") {
        FadePageCover(true);
        InsertSelectedCheckboxItems("/api/WH_CFS_Invoices/Receivables_InsertListWithoutValues"
            , { pOperationID: $("#hOperationID").val(), pOperationContainersAndPackagesID: $("#hContainerID").val(), pHouseBillID: $("#hHouseBillID").val(), pTariffID: WarehouseDefaultTariffID, pSelectedIDs: pSelectedIDs }
            , pSaveandAddNew
            , "SelectChargesModal" //pModalID
            , null //function () { Receivables_GetAvailableCharges(); }
            , function () {
                Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val(), $("#hContainerID").val(), $("#hHouseBillID").val());
            });
    }
}

function Receivables_Update(pSaveandAddNew) {
    debugger;
    if (!isValidDate($("#txtReceivableIssueDate").val().trim(), 1) && $("#txtReceivableIssueDate").val().trim() != "")
        swal(strSorry, strCheckDates);
    else if ($("#txtReceivableExchangeRate").val() == "" || parseFloat($("#txtReceivableExchangeRate").val()) == 0
        || (parseFloat($("#txtReceivableExchangeRate").val()) == 1 && pDefaults.CurrencyID != ($("#slReceivableCurrency").val())))
        swal("Sorry", "Please, check exchange rate.");
    else {
        InsertUpdateFunction("form", "/api/WH_CFS_Invoices/Receivables_Update", {
            pID: $("#hReceivableID").val()
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
            //, pDiscountTypeID: $("#slReceivableDiscount").val() == "" ? 0 : $("#slReceivableDiscount").val()
            //, pDiscountPercentage: $("#txtReceivableDiscountPercentage").val() == "" ? 0 : $("#txtReceivableDiscountPercentage").val()
            //, pDiscountAmount: $("#txtReceivableDiscountAmount").val() == "" ? 0 : $("#txtReceivableDiscountAmount").val()

                , pSaleAmount: ($("#txtReceivableAmount").val().trim() == "" ? 0 : $("#txtReceivableAmount").val().trim())
                , pExchangeRate: ($("#txtReceivableExchangeRate").val().trim() == "" ? 0 : $("#txtReceivableExchangeRate").val().trim())
                , pCurrencyID: ($('#slReceivableCurrency option:selected').val() == "" ? 0 : $('#slReceivableCurrency option:selected').val())
                , pNotes: $("#txtReceivableNotes").val().toUpperCase().trim()

                , pIssueDate: ($("#txtReceivableIssueDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtReceivableIssueDate").val().trim()))
        }
        , pSaveandAddNew, "EditReceivableModal"
        , function () {
            Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val(), $("#hContainerID").val(), $("#hHouseBillID").val());
        });
    }
    //}
    //else
    //    swal(strSorry, strCheckEntries, "warning");
}

function Receivables_LoadWithPagingWithWhereClause(pOperationID, pOperationContainersAndPackagesID, pHouseBillID) {
    var pWhereClause = " WHERE (OperationID = " + pOperationID + " OR MasterOperationID = " + pOperationID + ") " + " AND IsDeleted = 0 ";
    pWhereClause += " and (OperationContainersAndPackagesID = " + pOperationContainersAndPackagesID + " or OperationContainersAndPackagesID in (select OperationContainersAndPackagesID from OperationContainersAndPackagesPlacedOn where OperationID = " +( pHouseBillID > 0 ? pHouseBillID : pOperationID ) +")) ";
    if (pHouseBillID > 0) {
        pWhereClause += " and (HouseBillID = " + pHouseBillID + " ) ";
    }
    else {
        pWhereClause += " and (HouseBillID is null ) ";
    }

    if (WarehouseDefaultTariffID > 0) {
        pWhereClause += " and (TariffID = " + WarehouseDefaultTariffID + " ) ";
    }
    else {
        pWhereClause += " and (TariffID is null ) ";
    }


    $("#cb-CheckAll-Receivables").attr("Checked", true);
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/WH_CFS_Invoices/Receivables_LoadWithWhereClause", pWhereClause, 0, 1000, function (pTabelRows) {
        Receivables_BindTableRows(pTabelRows);
        let Rec = $('#tblReceivables tbody tr').length;
        if (IsMESCOCompany && Rec == 0) {
            $("#txtStorageEndDate").attr("disabled", false);
            $("#btnSave").attr("disabled", false);
        } else if (IsMESCOCompany && Rec > 0) {
            $("#txtStorageEndDate").attr("disabled", true);
            $("#btnSave").attr("disabled", true);
        }
    });
}

function Receivables_BindTableRows(pReceivables) {
    ClearAllTableRows("tblReceivables");
    debugger;
    //var editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    var copyControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Copy") + "</span>";
    $.each(pReceivables, function (i, item) {
        AppendRowtoTable("tblReceivables",
        ("<tr ID='" + item.ID + "'  ondblclick='Receivables_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ReceivableID'> <input " + ((item.InvoiceID == 0 && item.DraftInvoiceID == 0 && item.AccNoteID == 0 && CanDeleteReceivebles == true) ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' checked value='" + item.ID + "' /></td>"
                    //+ "<td class='Receivable' val='" + item.ChargeTypeID + "'>" + item.ChargeTypeCode + " (" + item.ChargeTypeName + ")" + "</td>"
                    + "<td class='Receivable' val='" + item.ChargeTypeID + "'>" + item.ChargeTypeName + "</td>"
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
                    + "<td class='ReceivableTaxTypeID hide' val=" + item.TaxTypeID + ">" + (item.TaxTypeID == 0 ? "" : item.TaxTypeName) + "</td>"
                    + "<td class='ReceivableTaxPercentage hide'>" + item.TaxPercentage.toFixed(4) + "</td>"
                    + "<td class='ReceivableTaxAmount hide'>" + item.TaxAmount.toFixed(4) + "</td>"

                    + "<td class='ReceivableSaleAmount'>" + (item.SaleAmount).toFixed(4) + "</td>"
                    + "<td class='ReceivableExchangeRate'>" + item.ExchangeRate.toFixed(4) + "</td>"
                    + "<td class='ReceivableCurrency' val='" + item.CurrencyID + "'>" + (item.CurrencyID == 0 ? "" : item.CurrencyCode) + "</td>"
                    + "<td class='ReceivableInvoice hide' val='" + item.InvoiceID + "'>" + (item.InvoiceID == 0 ? "" : (item.InvoiceNumber + " / " + item.InvoiceTypeName)) + "</td>"
                    + "<td class='ReceivableAccNote hide' val='" + item.AccNoteID + "'>" + (item.AccNoteID == 0 ? "" : item.AccNoteCode) + "</td>"
                    + "<td class='ReceivableShownInvoiceOrAccNote'>" + (item.AccNoteID == 0
                                                                                        ? (item.InvoiceID == 0 && item.DraftInvoiceID == 0 ? "" : (item.InvoiceNumber + " / " + item.InvoiceTypeName))
                                                                                        : item.AccNoteCode)
                    + "</td>"
                    + "<td class='ReceivableOperation hide' val='" + item.OperationID + "'>" + (item.OperationID == 0 ? "" : item.OperationCode) + "</td>"
                    + "<td class='ReceivableNotes hide'>" + (item.Notes == "0" ? "" : item.Notes) + "</td>"

                    + "<td class='ReceivableIssueDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.IssueDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.IssueDate)) : "") + "</td>"
                    + "<td class='ReceivableOperationContainersAndPackagesID hide'>" + item.OperationContainersAndPackagesID + "</td>"
                    + "<td class='ReceivableTrailerID hide'>" + item.TrailerID + "</td>"

                    + "<td class='ReceivableCreatorName hide'>" + item.CreatorName + "</td>"
                    //+ "<td class='ReceivableCreationDate hide'>" + item.CreationDate + "</td>"
                    + "<td class='ReceivableCreationDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
                                              + " <i class='fa fa-calendar'></i>"
                                              + " <small>" + GetShownDate(getTodaysDateInddMMyyyyFormat(), GetDateWithFormatMDY(item.CreationDate)) + "</small>"
                                              + "</span>"
                                              + "</td>"
                    + "<td class='ReceivableModificatorName hide'>" + item.ModificatorName + "</td>"
                    //+ "<td class='ReceivableModificationDate hide'>" + item.ModificationDate + "</td>"
                    + "<td class='ReceivableModificationDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
                                              + " <i class='fa fa-calendar'></i>"
                                              + " <small>" + GetShownDate(getTodaysDateInddMMyyyyFormat(), GetDateWithFormatMDY(item.ModificationDate)) + "</small>"
                                              + "</span>"
                                              + "</td>"
                    + "<td class='ReceivableBillTo hide' val='" + item.BillTo + "'>" + (item.BillTo == 0 ? "" : item.BillToName) + "</td>"
                    + "<td class='ReceivableIDToExcludePurchase hide'> <input name='nameExcludePurchase'  type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='hide classKDS'><a href='#' data-toggle='modal' onclick='Receivables_Print(" + item.ID + ");' " + printControlsText + "</a></td>"
                    + "<td>"
                        + "<a  href='#CopyChargeModal' data-toggle='modal' " + 'onclick="Receivables_OpenCopyChargeModal(' + item.ID + ",'" + item.ChargeTypeName + "'" + ');" ' + copyControlsText + "</a>"
                        //+ "<a href='#EditReceivableModal' data-toggle='modal' onclick='Receivables_FillControls(" + item.ID + ");' " + editControlsText + "</a>"
                    + "</td>"
            + "</tr>"));
    });
    //ApplyPermissions();

    BindAllCheckboxonTable("tblReceivables", "ReceivableID", "cb-CheckAll-Receivables");
    CheckAllCheckbox("HeaderDeleteReceivableID");
    //HighlightText("#tblReceivables>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    //PayablesAndReceivables_CalculateSummary();
    //Receivables_CalculateSubtotals();
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
            DeleteListFunction("/api/WH_CFS_Invoices/Receivables_Delete"
                , { pReceivablesIDs: GetAllSelectedIDsAsString('tblReceivables'), pOperationID: $("#hOperationID").val() }
                , function () {
                    Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val(), $("#hContainerID").val(), $("#hHouseBillID").val());
                });
        });
    //DeleteListFunction("/api/Receivables/Delete", { "pReceivablesIDs": GetAllSelectedIDsAsString('tblReceivables') }, function () { LoadViews("OperationsEdit", null, $("#hOperationID").val()); });
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
    if ($("#hDefaultCurrencyID").val() == pCurrencyID)
        $("#txtReceivableExchangeRate").attr("disabled", "disabled");
    else
        $("#txtReceivableExchangeRate").removeAttr("disabled");
    //ReceivablePOrC_GetList(pPOrCID, "slReceivablePOrC");
    $("#slReceivablePOrC").html($("#slOperationPOrC").html()); $("#slReceivablePOrC").val(pPOrCID == 0 ? "" : pPOrCID);
    //ReceivableSuppliers_GetList(pSupplierID, "slReceivableSupplier");
    ReceivableCurrency_GetList(pCurrencyID, "slReceivableCurrency", null);
    ReceivableUOM_GetList(pUOMID, "slReceivableUOM");

    $("#lblReceivableShown").html(": " + $(tr).find("td.Receivable").text());
    $("#lblReceivableCreatedBy").html(" : " + $(tr).find("td.ReceivableCreatorName").text())
    $("#lblReceivableCreationDate").html(" : " + $(tr).find("td.ReceivableCreationDate").text())
    $("#lblReceivableUpdatedBy").html(": " + $(tr).find("td.ReceivableModificatorName").text())
    $("#lblReceivableModificationDate").html(" : " + $(tr).find("td.ReceivableModificationDate").text())

    //$("#txtReceivableType").val($(tr).find("td.Receivable").text());
    //$("#txtReceivableType").attr("ChargeTypeID", $(tr).find("td.Receivable").attr("val"));
    CallGETFunctionWithParameters("/api/ChargeTypes/LoadAll"
        , { pWhereClause: "WHERE IsInactive = 0 AND IsWarehouseChargeType=1" }
        , function (pData) {
            FillListFromObject($(tr).find("td.Receivable").attr("val"), 2, "<--Select-->", "slReceivableChargeType", pData[0], null);
            FadePageCover(false);
        }
        , null);
    if ($("#slReceivableTax option").length < 2)
        GetListTaxTypeWithNameAndPercAttr(pTaxTypeID, "api/TaxeTypes/LoadAllWithWhereClause"
        , "<--Select-->", "slReceivableTax", "WHERE IsInactive=0 ORDER BY Name"
        , function () {
            //$("#slReceivableDiscount").html($("#slReceivableTax").html());
            $("#slReceivableTax option[IsDiscount='true']").addClass('hide');
            //$("#slReceivableDiscount option[IsDiscount='false']").addClass('hide');
        });
    else
        $("#slReceivableTax").val(pTaxTypeID == 0 ? "" : pTaxTypeID);
    $("#txtReceivableQuantity").val($(tr).find("td.ReceivableQuantity").text());
    //$("#txtReceivableUnitPrice").val($(tr).find("td.ReceivableCostPrice").text());
    //$("#txtReceivableAmount").val($(tr).find("td.ReceivableCostAmount").text());
    $("#txtReceivableUnitPrice").val(parseInt($(tr).find("td.ReceivableSalePrice").text()) == 0 ? "" : $(tr).find("td.ReceivableSalePrice").text());

    $("#txtReceivableAmountWithoutVAT").val(parseInt($(tr).find("td.ReceivableAmountWithoutVAT").text()) == 0 ? "" : $(tr).find("td.ReceivableAmountWithoutVAT").text());
    $("#txtReceivableTaxPercentage").val($(tr).find("td.ReceivableTaxPercentage").text());
    $("#txtReceivableTaxAmount").val($(tr).find("td.ReceivableTaxAmount").text());

    $("#txtReceivableAmount").val(parseInt($(tr).find("td.ReceivableSaleAmount").text()) == 0 ? "" : $(tr).find("td.ReceivableSaleAmount").text());
    $("#txtReceivableExchangeRate").val($(tr).find("td.ReceivableExchangeRate").text());
    $("#txtReceivableNotes").val($(tr).find("td.ReceivableNotes").text());
    $("#txtReceivableIssueDate").val($(tr).find("td.ReceivableIssueDate").text());
    $("#txtReceivableBillTo").val($(tr).find("td.ReceivableBillTo").text());

    $("#slReceivableUOM").attr("onchange", "Receivables_UOMChanged();");
    $("#btnSaveReceivable").attr("onclick", "Receivables_Update(false);");
}

function ReceivableCurrency_GetList(pID, pSlName, callback) {
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListCurrencyWithCodeAndExchangeRateAttr(pID, "/api/Currencies/LoadAll", "Select Currency", pSlName, " WHERE 1=1 ORDER BY Code "
        , function () { //this callback is used to set the InitialSalePrice in case of generating from payables
            if (callback != null && callback != undefined)
                callback();
        });
}

function ReceivableUOM_GetList(pID, pSlName) {
    var pWhereClause = "";
    if ($("#hHouseBillID").val() != 0)
        pWhereClause += " WHERE IsUsedInFCl = 1 ";
    else
        pWhereClause += " WHERE IsUsedInConsolidation = 1 ";

    pWhereClause += " OR ID = " + pID; //for the case that settings changed for a UOM at the time it is taken 
    pWhereClause += " ORDER BY Code ";

    GetListWithNameAndWhereClause(pID, "/api/NoAccessMeasurements/LoadAll", "Select UOM", pSlName, pWhereClause);
}

function CalculateReceivablesAmount() {
    var decAmountWithoutVAT = 0;
    var decTaxAmount = 0; var decTaxPercentage = 0.0;
    var decDiscountAmount = 0; var decDiscountPercentage = 0.0;

    decAmountWithoutVAT = $("#txtReceivableQuantity").val() * $("#txtReceivableUnitPrice").val();
    $("#txtReceivableAmountWithoutVAT").val(decAmountWithoutVAT);
    decTaxPercentage = $("#slReceivableTax option:selected").attr("CurrentPercentage");
    decTaxAmount = decAmountWithoutVAT * decTaxPercentage / 100;
    //decDiscountPercentage = $("#slReceivableDiscount option:selected").attr("CurrentPercentage");
    //decDiscountAmount = decAmountWithoutVAT * decDiscountPercentage / 100;
    $("#txtReceivableTaxPercentage").val(decTaxPercentage);
    $("#txtReceivableTaxAmount").val(decTaxAmount.toFixed(2));
    //$("#txtReceivableDiscountPercentage").val(decDiscountPercentage);
    //$("#txtReceivableDiscountAmount").val(decDiscountAmount.toFixed(2));
    $("#txtReceivableAmount").val((decAmountWithoutVAT + decTaxAmount).toFixed(2));  //$("#txtReceivableAmount").val((decAmountWithoutVAT + decTaxAmount - decDiscountAmount).toFixed(2));
}

function Receivables_CurrencyChanged() {
    $("#txtReceivableExchangeRate").val($("#slReceivableCurrency option:selected").attr("MasterDataExchangeRate"));
    if ($("#hDefaultCurrencyID").val() == $("#slReceivableCurrency").val())
        $("#txtReceivableExchangeRate").attr("disabled", "disabled");
    else
        $("#txtReceivableExchangeRate").removeAttr("disabled");
}

function Receivables_OpenCopyChargeModal(pReceivableIDToCopy, pChargeTypeName) {
    debugger;
    $("#txtNumberOfCopies").val("");
    $("#lblCopyChargeShown").html(": " + pChargeTypeName);
    $("#btnCopyCharge").attr("onclick", "Receivables_Copy(" + pReceivableIDToCopy + ")");
}

function Receivables_Copy(pReceivableIDToCopy) {
    if ($("#txtNumberOfCopies").val() == "" || $("#txtNumberOfCopies").val() > 10)
        swal("Sorry", "Please, enter number of copies and it must be less less than 10.");
    else {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/WH_CFS_Invoices/Receivables_CopyReceivable"
            , { pReceivableIDToCopy: pReceivableIDToCopy, pNumberOfDuplicates: $("#txtNumberOfCopies").val() }
            , function (pData) {
                var pReceivables = JSON.parse(pData[0]);
                Receivables_BindTableRows(pReceivables);
                swal("Success", "Saved successfully.");
                jQuery("#CopyChargeModal").modal("hide");
                FadePageCover(false);
            }
            , null);
    }
}

//#endregion

//#region I N V O I C E S   F U N C T I O N S

function Invoices_Insert(pSaveandAddNew) {
    debugger;
    FadePageCover(true);

    var pParametersWithValues = {
        pWhereClauseCurrencyDetails: ("WHERE ID=" + $("#slInvoiceCurrency").val() + " AND '" + GetDateWithFormatyyyyMMdd($("#txtInvoiceIssueDate").val()) + "' >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                + " AND '" + GetDateWithFormatyyyyMMdd($("#txtInvoiceIssueDate").val()) + "' <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                + " ORDER BY CODE"
              )
    };
    CallGETFunctionWithParameters("/api/Currencies/LoadCurrencyDetails", pParametersWithValues
        , function (pData) {
            if (pData[0] == "[]") {
                $("#txtInvoiceMasterDataExchangeRate").val(0);
                swal("Sorry", "Exchange rate is not set for " + $("#slInvoiceCurrency option:selected").text() + " in the Master Data.");
                FadePageCover(false);
            }
            else {
                $("#txtInvoiceMasterDataExchangeRate").val(JSON.parse(pData[0])[0].ExchangeRate);
                if (Invoices_CheckDates('txtInvoiceIssueDate', 'txtInvoiceDueDate')) {
                    FadePageCover(true);
                    var pSelectedReceivableItemsIDs = GetAllSelectedIDsAsString('tblReceivables');
                    // nour 09052022
                    if (pSelectedReceivableItemsIDs == "") {
                        swal("Sorry", " Please select receivables before saving new invoice.");
                        FadePageCover(false);
                    }
                    else {
                        var data = {
                            "pSelectedReceivableItemsIDs": pSelectedReceivableItemsIDs
                            , "pInvoiceNumber": 0 /*generated automatically*/ //($("#txtInvoiceNumber").val().trim() == "" ? "0" : $("#txtInvoiceNumber").val().trim().toUpperCase())
                            //, "pOperationID": $("#hOperationID").val()
                            , "pOperationID": $("#hHouseBillID").val() //$("#slInvoiceOperations").val()
                            , "pOperationPartnerID": $("#slInvoicePartner").val() //in table OperationPartners
                            //, "pAddressTypeID": 0//($("#slInvoiceAddressTypes").val() == "" ? 0 : $("#slInvoiceAddressTypes").val())
                            , "pAddressID": $("#slInvoiceAddressTypes").val()///////////////////////////////////////////////
                            , "pPrintedAddress": "0" // nour 09052022

                            , "pInvoiceTypeID": ($("#slInvoiceTypes").val() == "" ? 0 : $("#slInvoiceTypes").val())
                            , "pInvoiceTypeCode": ($("#slInvoiceTypes").val() == "" ? 0 : $("#slInvoiceTypes option:selected").text())

                            , "pCustomerReference": ($("#txtInvoiceCustomerReference").val().trim() == "" ? "0" : $("#txtInvoiceCustomerReference").val().toUpperCase())
                            , "pPaymentTermID": $("#slInvoicePaymentTerms").val()
                            , "pCurrencyID": ($("#slInvoiceCurrency").val() == "" ? 0 : $("#slInvoiceCurrency").val())
                            , "pExchangeRate": ($("#txtInvoiceMasterDataExchangeRate").val() == "" ? 1 : $("#txtInvoiceMasterDataExchangeRate").val())

                            //, "pInvoiceIssueDate": ($("#txtInvoiceIssueDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtInvoiceIssueDate").val().trim()))
                            //, "pInvoiceDueDate": ($("#txtInvoiceDueDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtInvoiceDueDate").val().trim()))

                            , "pInvoiceIssueDate": ($("#txtInvoiceIssueDate").val() == "" ? "01/01/1900" : $("#txtInvoiceIssueDate").val().trim())
                            , "pInvoiceDueDate": ($("#txtInvoiceDueDate").val() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtInvoiceDueDate").val().trim()))

                            , "pAmountWithoutVAT": $("#txtInvoiceAmountWithoutVAT").val()
                            , "pTaxTypeID": $("#slInvoiceTax").val() == "" ? 0 : $("#slInvoiceTax").val()
                            , "pTaxPercentage": $("#txtInvoiceTaxPercentage").val() == "" ? 0 : $("#txtInvoiceTaxPercentage").val()
                            , "pTaxAmount": $("#txtInvoiceTaxAmount").val() == "" ? 0 : $("#txtInvoiceTaxAmount").val()
                            , "pDiscountTypeID": $("#slInvoiceDiscount").val() == "" ? 0 : $("#slInvoiceDiscount").val()
                            , "pDiscountPercentage": $("#txtInvoiceDiscountPercentage").val() == "" ? 0 : $("#txtInvoiceDiscountPercentage").val()
                            , "pDiscountAmount": $("#txtInvoiceDiscountAmount").val() == "" ? 0 : $("#txtInvoiceDiscountAmount").val()
                            , "pFixedDiscount": 0 // nour 09052022

                            , "pAmount": $("#txtInvoiceAmount").val()
                            , "pInvoiceStatusID": 1
                            , "pIsApproved": false
                            , "pTankID": SelectedHouseBillID == 0 ? $("#hContainerID").val() : 0
                            , "pApplyTankCharges": false
                            , "pTransactionTypeID": 0
                            , "pTariffID": WarehouseDefaultTariffID
                            , "pStorageFromDate": ($("#txtEntryDate").val() == "" ? "01/01/1900" : $("#txtEntryDate").val().trim())
                            , "pStorageToDate": ($("#txtStorageEndDate").val() == "" ? "01/01/1900" : $("#txtStorageEndDate").val().trim())
                            , "pPortalOperationPartnerID": $("#slInvoicePartner").val()
                        }
                        /*if (pDefaults.UnEditableCompanyName == "UNF") {
                            if ($("#tblReceivables tbody tr").has("td.ReceivableID input:not([disabled]):checked").find("td.Receivable").filter(function () {
                                return $(this).text().trim() == "Storage At Warehouse";
                            }).length == 0) {
                                data.pTariffID = 0;
                                data.pStorageFromDate = "01/01/1900";
                                data.pStorageToDate = "01/01/1900";
                            } 
                        }*/
                        if (pDefaults.UnEditableCompanyName == "UNF") {
                            const filteredIds = [];
                            document.querySelectorAll('#tblReceivables tr').forEach(row => {
                                if (row.querySelector('input').hasAttribute('disabled')) {
                                    return;
                                }
                                const saleAmountCell = row.querySelector('.ReceivableSaleAmount');

                                if (saleAmountCell && parseInt(saleAmountCell.textContent.trim()) == 0) {
                                    filteredIds.push(row.id);
                                }
                            });
                            if (filteredIds.length > 0) {
                                DeleteListFunction("/api/WH_CFS_Invoices/Receivables_Delete"
                                    , { pReceivablesIDs: filteredIds.join(","), pOperationID: $("#hOperationID").val() }
                                    , function () {
                                        Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val(), $("#hContainerID").val(), $("#hHouseBillID").val());
                                    });
                            }
                        }
                        InsertUpdateFunction("form", "/api/Invoices/Insert", data, pSaveandAddNew, "InvoiceModal"
                            , function (data) {
                                var _DistinctTankCurrencyCount = data[2];

                                Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val(), $("#hContainerID").val(), $("#hHouseBillID").val());

                                //OperationPartners_LoadWithPagingWithWhereClause($("#hOperationID").val());

                                Invoices_LoadAll($("#hOperationID").val(), $("#hContainerID").val());

                                SavedInvoiceID = data[1];

                                if (data[0]) {
                                    DisableControlsAfterInvoice(true);

                                    Invoices_Print(data[1], 3); // InvoiceId ,InvoiceReportTypes
                                    if (_DistinctTankCurrencyCount > 1)
                                        swal("Sorry", "Some items are not added becuase they have different currencies.");
                                }
                                else
                                    swal("Sorry", "Connection Failure, please refresh then try again.");
                                FadePageCover(false);
                            });
                    }

                }
                else { //Not Correct Date
                    FadePageCover(false);
                    swal(strSorry, strCheckDates);
                }
            }
        }
        , function () {
            if (SavedInvoiceID > 0) {
                // Invoices_Print(SavedInvoiceID, 3);
            }
        });
}

function Invoices_Update(pSaveandAddNew, pIsRemoveItems) { //if pIsRemoveItems==true then delete items else update
    debugger;
    if ($("#slEditInvoiceOperations").val() == null)
        swal("Sorry", "Please, select B/L.");
    else {
        FadePageCover(true);
        var pExchangeRate = 0;
        var pParametersWithValues = {
            pWhereClauseCurrencyDetails: ("WHERE ID=" + $("#slEditInvoiceCurrency").val() + " AND '" + GetDateWithFormatyyyyMMdd($("#txtEditInvoiceIssueDate").val()) + "' >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                    + " AND '" + GetDateWithFormatyyyyMMdd($("#txtEditInvoiceIssueDate").val()) + "' <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                    + " ORDER BY CODE"
                  )
        };
        CallGETFunctionWithParameters("/api/Currencies/LoadCurrencyDetails", pParametersWithValues
            , function (pData) {
                FadePageCover(false);
                if (pData[0] == "[]") {
                    swal("Sorry", "Exchange rate is not set for " + $("#slEditInvoiceCurrency option:selected").text() + " in the Master Data.");
                }
                else {
                    pExchangeRate = JSON.parse(pData[0])[0].ExchangeRate;
                    var pOriginalCurrencyID = $("#slEditInvoiceCurrency").val();
                    if (pIsRemoveItems && GetAllSelectedIDsAsStringWithNameAttr("cbSelectInvoiceItems") == "") {//to make sure that there are selected items in case of pressing remove items
                        swal(strSorry, "Please select at least one item.");
                    }
                    else if (Date.prototype.compareDates(ConvertDateFormat($("#txtEditInvoiceIssueDate").val().trim()), ConvertDateFormat($("#txtEditInvoiceDueDate").val().trim())) < 0) {
                        swal(strSorry, "DueDate can't be before Invoice Date.");
                    }
                    else if ($("#slEditInvoicePartner").val() == "") {
                        FadePageCover(false);
                    }
                    else if (ValidateForm("form", "EditInvoiceModal")) {
                        var pSelectedReceivableItemsIDs = "";
                        if (pIsRemoveItems) //here i get only the unchecked items coz the others will be deleted in the Receivables update controller
                            pSelectedReceivableItemsIDs = GetAllNOTSelectedIDsAsStringWithNameAttr("cbSelectInvoiceItems");
                        else // here i get all IDs to handle the case of checking items then pressing save and not remove items
                            pSelectedReceivableItemsIDs = GetAllIDsAsStringWithNameAttr("tblModalInvoiceItems", "cbSelectInvoiceItems");
                        //TODO: check for invoice value here using the fn Invoices_ChangeAmountInInvoiceEdit
                        //if (pSelectedReceivableItemsIDs != "" && Invoices_ChangeAmountInInvoiceEdit(pIsRemoveItems, true) > 0) {
                        if (pSelectedReceivableItemsIDs == "" || Invoices_CheckSameCurrencyForEdit(pSelectedReceivableItemsIDs)) {
                            //Confirmation message to delete
                            swal({
                                title: "Are you sure?",
                                text: "The invoice will be saved!",
                                //type: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "Yes, Save!",
                                closeOnConfirm: true
                            },
                            //callback function in case of confirm delete
                            function () {
                                var pInvoiceID = $("#hEditedInvoiceID").val();
                                var pSelectedReceivablesIDsToUpdate = "";
                                if (pIsRemoveItems) //here i get only the uncheckded items coz the others will be deleted in the controllers
                                    pSelectedReceivablesIDsToUpdate = GetAllNOTSelectedIDsAsStringWithNameAttr("cbSelectInvoiceItems");
                                else // here i get all IDs to handle the case of checking items then pressing save and not remove items
                                    pSelectedReceivablesIDsToUpdate = GetAllIDsAsStringWithNameAttr("tblModalInvoiceItems", "cbSelectInvoiceItems");
                                var ArrayOfIDs = pSelectedReceivablesIDsToUpdate.split(',');
                                var pPOrCList = "";
                                var pUOMList = "";
                                var pQuantityList = "";
                                var pSalePriceList = "";

                                var pInvoiceItemAmountWithoutVATList = "";
                                var pInvoiceItemTaxTypeIDList = "";
                                var pInvoiceItemTaxPercentageList = "";
                                var pInvoiceItemTaxAmountList = "";

                                var pSaleAmountList = "";
                                var pExchangeRateList = "";
                                var pCurrencyList = "";
                                var pViewOrderList = "";
                                if (pSelectedReceivablesIDsToUpdate != "") {
                                    var NumberOfSelectRows = ArrayOfIDs.length;
                                    for (i = 0; i < NumberOfSelectRows; i++) {
                                        var currentRowID = ArrayOfIDs[i];

                                        pPOrCList += ((pPOrCList == "") ? "" : ",") + ($("#slReceivablePOrC" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#slReceivablePOrC" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#slReceivablePOrC" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
                                        pUOMList += ((pUOMList == "") ? "" : ",") + ($("#slReceivableUOM" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#slReceivableUOM" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#slReceivableUOM" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
                                        pQuantityList += ((pQuantityList == "") ? "" : ",") + ($("#txtTblModalReceivableQuantity" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableQuantity" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableQuantity" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
                                        pSalePriceList += ((pSalePriceList == "") ? "" : ",") + ($("#txtTblModalReceivableSalePrice" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableSalePrice" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableSalePrice" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());

                                        pInvoiceItemAmountWithoutVATList += ((pInvoiceItemAmountWithoutVATList == "") ? "" : ",") + ($("#txtTblModalReceivableAmountWithoutVAT" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableAmountWithoutVAT" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableAmountWithoutVAT" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
                                        pInvoiceItemTaxTypeIDList += ((pInvoiceItemTaxTypeIDList == "") ? "" : ",") + ($("#slReceivableTax" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#slReceivableTax" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#slReceivableTax" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
                                        pInvoiceItemTaxPercentageList += ((pInvoiceItemTaxPercentageList == "") ? "" : ",") + ($("#txtTblModalReceivableTaxPercentage" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableTaxPercentage" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableTaxPercentage" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
                                        pInvoiceItemTaxAmountList += ((pInvoiceItemTaxAmountList == "") ? "" : ",") + ($("#txtTblModalReceivableTaxAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableTaxAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableTaxAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());

                                        pSaleAmountList += ((pSaleAmountList == "") ? "" : ",") + ($("#txtTblModalReceivableSaleAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableSaleAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableSaleAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
                                        pExchangeRateList += ((pExchangeRateList == "") ? "" : ",") + pExchangeRate; //($("#txtTblModalReceivableExchangeRate" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableExchangeRate" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableExchangeRate" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
                                        //pCurrencyList += ((pCurrencyList == "") ? "" : ",") + ($("#slReceivableCurrency" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#slReceivableCurrency" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#slReceivableCurrency" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
                                        pCurrencyList += ((pCurrencyList == "") ? "" : ",") + $("#slEditInvoiceCurrency").val();
                                        pViewOrderList += ((pViewOrderList == "") ? "" : ",") + ($("#txtTblModalReceivableViewOrder" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableViewOrder" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableViewOrder" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
                                    }
                                }

                                //to get currency for first item(i am sure all are the same and at least one is checked isa)
                                var pFirstItemRowID = "";
                                if (pIsRemoveItems) //get first unchecked
                                    pFirstItemRowID = $('#tblModalInvoiceItems').find('input[name="cbSelectInvoiceItems"]:not(:checked):first').parent().parent().attr("id");
                                else //get first wether checked or not
                                    pFirstItemRowID = $('#tblModalInvoiceItems').find('input[name="cbSelectInvoiceItems"]:first').parent().parent().attr("id");
                                var data = {
                                    "pIsRemoveItems": pIsRemoveItems
                                    , "pInvoiceID": $("#hEditedInvoiceID").val()
                                    , "pOperationID": $("#slEditInvoiceOperations").val()
                                    , "pOperationPartnerID": $("#slEditInvoicePartner").val() //in table OperationPartners
                                    , "pPartnerTypeID": $("#slEditInvoicePartner option:selected").attr("PartnerTypeID")
                                    , "pPartnerID": $("#slEditInvoicePartner option:selected").attr("PartnerID")
                                    , "pAddressID": $("#slEditInvoiceAddressTypes").val()///////////////////////////////////////////////
                                    //, "pPrintedAddress": "0"
                                    , "pCustomerReference": ($("#txtEditInvoiceCustomerReference").val().trim() == "" ? "0" : $("#txtEditInvoiceCustomerReference").val().toUpperCase())
                                    , "pPaymentTermID": $("#slEditInvoicePaymentTerms").val()
                                    , "pCurrencyID": $("#slEditInvoiceCurrency").val() //pFirstItemRowID == undefined ? $("#slEditInvoiceCurrency").val() : $("#slReceivableCurrencyInvoiceEdit" + pFirstItemRowID).val()
                                    , "pExchangeRate": pExchangeRate //pFirstItemRowID == undefined ? $("#slEditInvoiceCurrency option:selected").attr("MasterDataExchangeRate") : $("#slReceivableCurrencyInvoiceEdit" + pFirstItemRowID + " option:selected").attr("MasterDataExchangeRate")
                                    , "pInvoiceIssueDate": ($("#txtEditInvoiceIssueDate").val() == "" ? "01/01/1900" : $("#txtEditInvoiceIssueDate").val().trim())
                                    , "pInvoiceDueDate": ($("#txtEditInvoiceDueDate").val() == "" ? "01/01/1900" : $("#txtEditInvoiceDueDate").val().trim())

                                    , "pAmountWithoutVAT": $("#txtEditInvoiceAmountWithoutVAT").val()
                                    , "pTaxTypeID": $("#slEditInvoiceTax").val() == "" ? 0 : $("#slEditInvoiceTax").val()
                                    , "pTaxPercentage": $("#txtEditInvoiceTaxPercentage").val() == "" ? 0 : $("#txtEditInvoiceTaxPercentage").val()
                                    , "pTaxAmount": $("#txtEditInvoiceTaxAmount").val() == "" ? 0 : $("#txtEditInvoiceTaxAmount").val()
                                    , "pDiscountTypeID": $("#slEditInvoiceDiscount").val() == "" ? 0 : $("#slEditInvoiceDiscount").val()
                                    , "pDiscountPercentage": $("#txtEditInvoiceDiscountPercentage").val() == "" ? 0 : $("#txtEditInvoiceDiscountPercentage").val()
                                    , "pDiscountAmount": $("#txtEditInvoiceDiscountAmount").val() == "" ? 0 : $("#txtEditInvoiceDiscountAmount").val()
                                    , "pFixedDiscount": 0 // nour 09052022

                                    , "pAmount": Invoices_ChangeAmountInInvoiceEdit(pIsRemoveItems).toFixed(2)
                                    , "pInvoiceStatusID": 1
                                    , "pIsApproved": false
                                    , "pLeftSignature": $("#txtEditInvoiceLeftSignature").val().trim() == "" ? "0" : $("#txtEditInvoiceLeftSignature").val().trim()
                                    , "pMiddleSignature": $("#txtEditInvoiceMiddleSignature").val().trim() == "" ? "0" : $("#txtEditInvoiceMiddleSignature").val().trim()
                                    , "pRightSignature": $("#txtEditInvoiceRightSignature").val().trim() == "" ? "0" : $("#txtEditInvoiceRightSignature").val().trim()
                                    , "pGRT": $("#txtEditInvoiceGRT").val().trim() == "" ? "0" : $("#txtEditInvoiceGRT").val().trim()
                                    , "pDWT": $("#txtEditInvoiceDWT").val().trim() == "" ? "0" : $("#txtEditInvoiceDWT").val().trim()
                                    , "pNRT": $("#txtEditInvoiceNRT").val().trim() == "" ? "0" : $("#txtEditInvoiceNRT").val().trim()
                                    , "pLOA": $("#txtEditInvoiceLOA").val().trim() == "" ? "0" : $("#txtEditInvoiceLOA").val().trim()
                                    , "pEditableNotes": ""
                                    , "pRoutingID": ($("#slEditInvoiceRoutingCCA").val() == "" || $("#slEditInvoiceRoutingCCA").val() == null) ? 0 : $("#slEditInvoiceRoutingCCA").val()
                                    , "pRelatedToInvoiceID": 0
                                    , "pUpdateRelatedToInvoiceID": true
                                    , "pTransactionTypeID": 0
                                    //Receivables Items Update
                                    , "pSelectedReceivablesIDsToUpdate": pSelectedReceivablesIDsToUpdate == "" ? 0 : pSelectedReceivablesIDsToUpdate
                                    , "pPOrCList": pPOrCList == "" ? "0" : pPOrCList
                                    , "pUOMList": pUOMList == "" ? "0" : pUOMList
                                    , "pQuantityList": pQuantityList == "" ? "0" : pQuantityList
                                    , "pSalePriceList": pSalePriceList == "" ? "0" : pSalePriceList

                                    , "pInvoiceItemAmountWithoutVATList": pInvoiceItemAmountWithoutVATList
                                    , "pInvoiceItemTaxTypeIDList": pInvoiceItemTaxTypeIDList
                                    , "pInvoiceItemTaxPercentageList": pInvoiceItemTaxPercentageList
                                    , "pInvoiceItemTaxAmountList": pInvoiceItemTaxAmountList

                                    , "pSaleAmountList": pSaleAmountList == "" ? "0" : pSaleAmountList
                                    , "pExchangeRateList": pExchangeRateList == "" ? "0" : pExchangeRateList
                                    , "pCurrencyList": pCurrencyList == "" ? "0" : pCurrencyList
                                    , "pViewOrderList": pViewOrderList == "" ? "0" : pViewOrderList
                                    , "pFormName": glbCallingControl
                                };
                                if (pDefaults.UnEditableCompanyName == "UNF") {
                                    data.pEditableNotes = $("#txtEditInvoiceEditableNotes").val().trim() == "" ? "0" : $("#txtEditInvoiceEditableNotes").val().trim();
                                }
                                if (ValidateForm("form", "EditInvoiceModal"))
                                    CallPOSTFunctionWithParameters("/api/Invoices/Update", data
                                        , function (pData) {

                                            Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val(), $("#hContainerID").val(), $("#hHouseBillID").val());

                                            //OperationPartners_LoadWithPagingWithWhereClause($("#hOperationID").val());

                                            Invoices_LoadAll($("#hOperationID").val(), $("#hContainerID").val());

                                            Invoices_FillInvoiceItems($("#hEditedInvoiceID").val(), null);
                                            $("#slEditInvoiceCurrency").val(pFirstItemRowID == undefined ? pOriginalCurrencyID : $("#slReceivableCurrencyInvoiceEdit" + pFirstItemRowID).val());//incase of changing currency
                                            //Invoices_Print(pID, 3/*$("#slInvoiceReportTypes").val()*/);/*Incoterms_LoadingWithPaging();*/
                                            if (pData[0])
                                                swal("Success", "Saved successfully.");
                                        }
                                        , null);
                            });
                        }
                        else //Different Currencies
                            swal(strSorry, "The currencies of the selected items must be the same and exchange rate must be entered.");
                    } //if (ValidateForm("form", "EditInvoiceModal")) {
                }
            }
            , null);
    }
}

function Invoices_DeleteList(callback, pInvoiceTypeCode) {
    //Confirmation message to delete
    var pInvoiceTableName = (pInvoiceTypeCode == "DRAFT" ? "tblInvoicesDRAFT" : "tblInvoices");
    var pInvoicesIDs = GetAllSelectedIDsAsString(pInvoiceTableName);
    if (GetAllSelectedIDsAsString(pInvoiceTableName) != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Do it!",
            closeOnConfirm: true
        },
        //callback function in case of confirm delete
        function () {
            CallGETFunctionWithParameters("/api/Invoices/Delete"
                , { "pInvoicesIDs": pInvoicesIDs }
                , function () {
                    Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val(), $("#hContainerID").val(), $("#hHouseBillID").val());

                    Invoices_LoadAll($("#hOperationID").val(), $("#hContainerID").val());

                    DisableControlsAfterInvoice(false);
                }
                , null
                , true);
        });
}

function Invoices_Print(pID, pReportTypeID) {
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
    CallGETFunctionWithParameters("/api/WH_CFS_Invoices/Report_Invoice"
            , pParametersWithValues
            , function (data) {
                var pRecordsExist = data[0];
                //data[1] : strExportedFileName
                //data[2] : objCvwReceivables.lstCVarvwReceivables
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

                var pEntryDate = data[74];
                var pStorageEndDate = data[75];
                var pStorageDays = data[76];
                var pStorageRate = data[77];


                //When printed from operations the draft invoices are in another table
                var pInvoiceTableSuffix = (glbCallingControl == "OperationsEdit" && pInvoiceTypeCode == "DRAFT") ? "DRAFT" : "";
                //if (pDeliveryOrderNumber == 0)
                //    pDeliveryOrderNumber = $("#tblRoutings tr td.RoutingType[val=30]").parent().find("td.DeliveryOrderNumber").text();

                //var trMainRoute = $("#tblRoutings tbody tr td[val=30]").parent();
                //$("#tblRoutings tbody tr td[val=30]").parent().find("td.Vessel").text();
                $("#tblInvoices" + pInvoiceTableSuffix + " tbody tr[id=" + pID + "] td.InvoiceAmount").text(pInvoiceHeader.Amount.toFixed(2));
                if (pRecordsExist == false)
                    swal(strSorry, MissingMandatoryFields);
                else {
                    if ($("#hDefaultUnEditableCompanyName").val() == "KADI") {
                        var mywindow = window.open('', '_blank');
                        var ReportHTML = '';
                        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                        //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                        ReportHTML += '<html>';
                        ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        //ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                        ReportHTML += '                 <div class="col-xs-12"><img src="/Content/Images/CompanyHeader-KADI.jpg" alt="logo"/></div>';

                        ReportHTML += '                 <div class="col-xs-12" style="text-align:right"><b>VAT ID No.: </b>' + (pDefaults.VatIDNo == 0 ? "" : pDefaults.VatIDNo) + '</div>';

                        //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + ')' + '</h3></div>';
                        if ($("#hDefaultUnEditableCompanyName").val() == "ELI")
                            //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + (pOperationHeader.Code == 0 ? pOperationHeader.MasterOperationCode : pOperationHeader.Code) + '/' + getMonthInLetters($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().split("/")[1].split("/")[0], "En") + '-' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(8, 2) + "-" + pInvoiceTypeCode + '</h3></div>';
                            //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + "/" + (pOperationHeader.Code == 0 ? pOperationHeader.MasterOperationCode.split('-')[3] : pOperationHeader.Code.split('-')[3]) + '-' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().split("/")[1].split("/")[0] + '-' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(8, 2) + '</h3></div>';
                            ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + "/" + pELIInvoicePrefix + '-' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().split("/")[1].split("/")[0] + '-' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(8, 2) + '</h3></div>';
                        else if ($("#hDefaultUnEditableCompanyName").val() == "BAD" && pInvoiceHeader.InvoiceTypeName.split(' ')[0].trim().toUpperCase() == "STATEMENT")
                            ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0] + '</h3></div>';
                        else if (!($("#hDefaultUnEditableCompanyName").val() == "SAF" && pInvoiceTypeCode == "DRAFT")) //Dont print for Safena
                            ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0] + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(6, 4) + '</h3></div>';

                        ReportHTML += '             ';
                        ////ReportHTML += '             <div style="clear:both;"><br></div>';
                        //ReportHTML += '         <div class="col-xs-1 m-l-n-md"><img src="/Content/Images/' + 'InvoiceSideStatement.jpg' + '" alt="logo"/></div>';
                        ReportHTML += '         <div class="col-xs-12">';

                        if ($("#hDefaultUnEditableCompanyName").val() == "ELI"
                                || (pInvoiceHeader.InvoiceTypeName.split(' ')[0].trim().toUpperCase() == "INVOICE"
                                        && ($("#hDefaultUnEditableCompanyName").val() == "TEU" || $("#hDefaultUnEditableCompanyName").val() == "WFE")
                                    )
                            ) {
                            ReportHTML += '             <div class="col-xs-9"></div>';
                            ReportHTML += '             <div class="col-xs-3"><b>Tax No.: </b>' + (pDefaults.TaxNumber == 0 ? "" : pDefaults.TaxNumber) + '</div>';
                            ReportHTML += '             <div class="col-xs-9"></div>';
                            ReportHTML += '             <div class="col-xs-3"><b>Com. Reg. No.: </b>' + (pDefaults.CommericalRegNo == 0 ? "" : pDefaults.CommericalRegNo) + '</div>';
                            if ($("#hDefaultUnEditableCompanyName").val() == "ELI") {
                                ReportHTML += '             <div class="col-xs-9"></div>';
                                ReportHTML += '             <div class="col-xs-3"><b>VAT ID No.: </b>' + (pDefaults.VatIDNo == 0 ? "" : pDefaults.VatIDNo) + '</div>';
                            }
                        }
                        if ($("#hDefaultUnEditableCompanyName").val() == "EGY") {
                            ReportHTML += '             <div class="col-xs-9"></div>';
                            ReportHTML += '             <div class="col-xs-3"><b>Ref.: </b>' + (pOperationHeader.Reference == 0 ? "" : pOperationHeader.Reference) + '</div>';
                        }
                        ReportHTML += '             <div class="col-xs-9"><b>Bill to: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoicePartner").text() + '</div>';
                        ReportHTML += '             <div class="col-xs-3"><b>Inv.Date: </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '</div>';
                        ReportHTML += '             <div class="col-xs-9"><b>Address: </b>';
                        ReportHTML += '                 ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                        ReportHTML += '                 ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2));
                        ReportHTML += '                 ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                        ReportHTML += '                 ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                        ReportHTML += '             </div>';
                        ReportHTML += '             <div class="col-xs-3"><b>Due Date: </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '</div>';
                        if ($("#hDefaultUnEditableCompanyName").val() == "ELI") {
                            ReportHTML += '             <div class="col-xs-9"></div>';
                            ReportHTML += '             <div class="col-xs-3"><b>Issue Date: </b>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pInvoiceHeader.CreationDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.CreationDate))) + '</div>';
                        }
                        ReportHTML += '             <div class="col-xs-12 b-b b-dark m-t-n-xs" style="clear:both;"></div>';

                        if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                            ReportHTML += '             <div class="col-xs-6"><b>Operation: </b>' + pMasterOperationCode + '</div>';
                        else
                            ReportHTML += '             <div class="col-xs-6"><b>Operation: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceOperationCode").text() + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Currency: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</div>';
                        //if ($("#cbPrintMBL").prop("checked"))
                        ReportHTML += '             <div class="col-xs-6"><b>MB/L No.: </b>' + pMasterBL + '</div>';
                        if ($("#hDefaultUnEditableCompanyName").val() == "DGL" && pMasterBL == "")
                            ReportHTML += '             <div class="col-xs-6"><b>Courier: </b>' + (pMainRoute.Notes == 0 ? "" : pMainRoute.Notes) + '</div>';
                        //if ($("#cbPrintHBL").prop("checked")) {
                        //    if (pHouseBLs != "0")//Master Operation so show all houses on it
                        //        ReportHTML += '             <div class="col-xs-6"><b>HBL</b>: ' + pHouseBLs + '</div>';
                        //    else
                        ReportHTML += '             <div class="col-xs-6"><b>HB/L No.:</b> ' + (pHouseNumber == "" || pHouseNumber == "0" ? "" : pHouseNumber) + '</div>';
                        //}
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
                            if ($("#hDefaultUnEditableCompanyName").val() != "TEU" && $("#hDefaultUnEditableCompanyName").val() != "ELI")
                                ReportHTML += '         <div class="col-xs-6"><b>Container Numbers: </b>' + pContainerNumbers + '</div>';
                        }
                        if (pOperationHeader.PackageTypes != 0 || pOperationHeader.PackageTypesOnContainersTotals != 0 || pOperationHeader.PlacedOnOperationContainersAndPackagesID != 0)
                            ReportHTML += '         <div class="col-xs-6"><b>Packages: </b>' + (pOperationHeader.PackageTypes == 0 ? (pOperationHeader.PackageTypesOnContainersTotals == 0 ? (pOperationHeader.PlacedOnOperationContainersAndPackagesID == 0 ? "0" : /*pOperationHeader.PlacedOnOperationContainersAndPackagesID*/ pMasterOperationHeader.NumberOfPackages + " " + pMasterOperationHeader.PackageTypeName) : pOperationHeader.PackageTypesOnContainersTotals) : pOperationHeader.PackageTypes) + '</div>';
                        //ReportHTML += '             <div class="col-xs-6"><b>Shipment Category: </b>' + pShipmentTypeCode + '</div>';
                        //ReportHTML += '             <div class="col-xs-6"><b>Shipment Term: </b>' + pIncotermName + '</div>';
                        // ReportHTML += '             <div class="col-xs-6"><b>Commodity: </b>' + (pOperationHeader.CommodityName == 0 ? "" : pOperationHeader.CommodityName) + '</div>';
                        //ReportHTML += '             <div class="col-xs-6"><b>Shipper: </b>' + pShipperName + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Consignee: </b>' + pConsigneeName + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Gross Weight: </b>' + pGrossWeightSum + ' KGM' + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>CBM: </b>' + pCBM + ' ' + '</div>';

                        ReportHTML += '             <div class="col-xs-6"><b>Entry Date: </b>' + pEntryDate + ' ' + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Storage End Date: </b>' + pStorageEndDate + ' ' + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Storage Days: </b>' + pStorageDays + ' ' + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Storage Rate: </b>' + pStorageRate + ' ' + '</div>';

                        if (pOperationHeader.CertificateNumber != 0 || $("#hDefaultUnEditableCompanyName").val() == "ELI") {
                            ReportHTML += '         <div class="col-xs-6"><b>Certificate No: </b>' + (pOperationHeader.CertificateNumber == 0 ? "" : pOperationHeader.CertificateNumber) + '</div>';
                            ReportHTML += '         <div class="col-xs-6"><b>Customer Ref: </b>' + (pOperationHeader.CustomerReference == 0 ? "" : pOperationHeader.CustomerReference) + '</div>';
                        }
                        if ($("#hDefaultUnEditableCompanyName").val() == "TEU") {
                            ReportHTML += '             <div class="col-xs-6"><b>ChargeableWeight: </b>' + pOperationHeader.ChargeableWeight + ' KGM' + '</div>';
                            ReportHTML += '             <div class="col-xs-6"><b>CBM: </b>' + pCBM + ' CBM</div>';
                        }
                        if ($("#hDefaultUnEditableCompanyName").val() == "DGL" || $("#hDefaultUnEditableCompanyName").val() == "BAD")
                            ReportHTML += '             <div class="col-xs-6"><b>Notes: </b>' + (pInvoiceHeader.MiddleSignature == 0 ? "" : pInvoiceHeader.MiddleSignature) + '</div>';
                        ReportHTML += '                     <div class="col-xs-12 clear">';
                        ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                        ReportHTML += '                             <thead>';
                        ReportHTML += '                                 <tr>';
                        if ($("#hDefaultUnEditableCompanyName").val() == "BAD")
                            ReportHTML += '                                     <th>Ser.</th>';
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
                            if ($("#hDefaultUnEditableCompanyName").val() == "BAD")
                                ReportHTML += '                                         <td>' + (i + 1) + '</td>';
                            if ($("#hDefaultUnEditableCompanyName").val() == "TEL")
                                ReportHTML += '                                         <td>' + (item.Notes == 0 ? (item.ChargeTypeName == 0 ? "" : item.ChargeTypeName) : item.Notes) + '</td>';
                            else
                                ReportHTML += '                                         <td style="text-align:left;">' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                            ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                            ReportHTML += '                                         <td>' + item.SalePrice.toFixed(2) + '</td>';
                            ReportHTML += '                                         <td>' + item.SaleAmount.toFixed(2) + '</td>';
                            //ReportHTML += '                                         <td>' + (item.Notes == "0" ? "" : item.Notes) + '</td>';
                            ReportHTML += '                                     </tr>';
                        });
                        //ReportHTML += '                                         <tr>';
                        //ReportHTML += '                                             <td colspan=2>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                        //ReportHTML += '                                             <td><b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + '</b></td>';
                        //ReportHTML += '                                             <td>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</td>';
                        //ReportHTML += '                                         </tr>';
                        //$("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")

                        //ReportHTML += '                                         <tr>';
                        //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                        //ReportHTML += '                                             <td><b>Total Amount : ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
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
                        // if ($("#cbPrintBankDetailsFromDefaults").prop("checked")) {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + ($("#hDefaultUnEditableCompanyName").val() == "QUI" ? (" " + pDefaults.CompanyName) : "") + '</br>';
                        ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                        ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                        ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                        ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                        ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                        //}
                        //    //kk: added 2nd condition
                        //else if ($("#cbPrintBankDetailsFromTemplate").prop("checked") && $("#hDefaultUnEditableCompanyName").val() != "DGL" && $("#hDefaultUnEditableCompanyName").val() != "ELI") {
                        //    ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + ($("#hDefaultUnEditableCompanyName").val() == "QUI" ? (" " + pDefaults.CompanyName) : "") + '</br>';
                        //    ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                        //}
                        //else if ($("#cbPrintBankDetailsFromTemplate").prop("checked") && $("#hDefaultUnEditableCompanyName").val() == "ELI") {
                        //    ReportHTML += '                             <b>SIGNATURE</b>';
                        //}
                        //else
                        //    ReportHTML += '                             <br>';
                        ReportHTML += '                         </div>';
                        ReportHTML += '                         <div class="col-xs-4 text-right m-t-n">';
                        if (pTaxAmount != 0 || pDiscountAmount != 0)
                            ReportHTML += '                             <b>Subtotal: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmountWithoutVAT").text()).toFixed(2) + '</br>';
                        //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '</br>';
                        if (pTaxAmount != 0)
                            ReportHTML += '                             <b>VAT(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pTaxAmount.toFixed(2) + '</br>';
                        //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '</br>';
                        if (pDiscountAmount != 0)
                            ReportHTML += '                             <b>Discount(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pDiscountAmount.toFixed(2) + '</br>';
                        ReportHTML += '                             <b>Total: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' <b>' + parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()).toFixed(2) + '</b></br>';
                        ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()).toFixed(2)) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</br>';
                        if ($("#cbPrintUSDTotal").prop("checked") && $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text().trim() == "EGP")
                            ReportHTML += '                             <b>USD Total: </b>' + ' <b>' + ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() / $("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")).toFixed(2) + '</b></br>';
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
                            ReportHTML += '         <div class="text-right m-r-lg"><img src="/Content/Images/CompanyStamp.jpg" alt="footer"/></div>';

                        if ($("#hDefaultUnEditableCompanyName").val() == "TEL") {
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
                        if ($("#cbPrintBankDetailsFromTemplate").prop("checked") && ($("#hDefaultUnEditableCompanyName").val() == "DGL" || $("#hDefaultUnEditableCompanyName").val() == "ELI")) {
                            ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                            ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>").replace(/\ /g, "&nbsp;");
                        }

                        if ($("#hDefaultUnEditableCompanyName").val() == "DYN")
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
                        mywindow.document.write(ReportHTML);
                        mywindow.document.close();
                    }
                    else { //All Other Companies
                        var mywindow = window.open('', '_blank');
                        var ReportHTML = '';
                        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                        //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                        ReportHTML += '<html>';
                        ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                        //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + ')' + '</h3></div>';
                        if ($("#hDefaultUnEditableCompanyName").val() == "ELI")
                            //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + (pOperationHeader.Code == 0 ? pOperationHeader.MasterOperationCode : pOperationHeader.Code) + '/' + getMonthInLetters($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().split("/")[1].split("/")[0], "En") + '-' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(8, 2) + "-" + pInvoiceTypeCode + '</h3></div>';
                            //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + "/" + (pOperationHeader.Code == 0 ? pOperationHeader.MasterOperationCode.split('-')[3] : pOperationHeader.Code.split('-')[3]) + '-' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().split("/")[1].split("/")[0] + '-' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(8, 2) + '</h3></div>';
                            ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + "/" + pELIInvoicePrefix + '-' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().split("/")[1].split("/")[0] + '-' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(8, 2) + '</h3></div>';
                        else if ($("#hDefaultUnEditableCompanyName").val() == "BAD" && pInvoiceHeader.InvoiceTypeName.split(' ')[0].trim().toUpperCase() == "STATEMENT")
                            ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0] + '</h3></div>';
                        else if (!($("#hDefaultUnEditableCompanyName").val() == "SAF" && pInvoiceTypeCode == "DRAFT")) //Dont print for Safena
                            ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0] + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(6, 4) + '</h3></div>';

                        ////ReportHTML += '             <div style="clear:both;"><br></div>';
                        //ReportHTML += '         <div class="col-xs-1 m-l-n-md"><img src="/Content/Images/' + 'InvoiceSideStatement.jpg' + '" alt="logo"/></div>';
                        ReportHTML += '         <div class="col-xs-12">';

                        if ($("#hDefaultUnEditableCompanyName").val() == "ELI"
                                || (pInvoiceHeader.InvoiceTypeName.split(' ')[0].trim().toUpperCase() == "INVOICE"
                                        && ($("#hDefaultUnEditableCompanyName").val() == "TEU" || $("#hDefaultUnEditableCompanyName").val() == "WFE")
                                    )
                            ) {
                            ReportHTML += '             <div class="col-xs-9"></div>';
                            ReportHTML += '             <div class="col-xs-3"><b>Tax No.: </b>' + (pDefaults.TaxNumber == 0 ? "" : pDefaults.TaxNumber) + '</div>';
                            ReportHTML += '             <div class="col-xs-9"></div>';
                            ReportHTML += '             <div class="col-xs-3"><b>Com. Reg. No.: </b>' + (pDefaults.CommericalRegNo == 0 ? "" : pDefaults.CommericalRegNo) + '</div>';
                            if ($("#hDefaultUnEditableCompanyName").val() == "ELI") {
                                ReportHTML += '             <div class="col-xs-9"></div>';
                                ReportHTML += '             <div class="col-xs-3"><b>VAT ID No.: </b>' + (pDefaults.VatIDNo == 0 ? "" : pDefaults.VatIDNo) + '</div>';
                            }
                        }
                        if ($("#hDefaultUnEditableCompanyName").val() == "EGY") {
                            ReportHTML += '             <div class="col-xs-9"></div>';
                            ReportHTML += '             <div class="col-xs-3"><b>Ref.: </b>' + (pOperationHeader.Reference == 0 ? "" : pOperationHeader.Reference) + '</div>';
                        }
                        ReportHTML += '             <div class="col-xs-9"><b>Bill to: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoicePartner").text() + '</div>';
                        ReportHTML += '             <div class="col-xs-3"><b>Inv.Date: </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '</div>';
                        ReportHTML += '             <div class="col-xs-9"><b>Address: </b>';
                        ReportHTML += '                 ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                        ReportHTML += '                 ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2));
                        ReportHTML += '                 ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                        ReportHTML += '                 ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                        ReportHTML += '             </div>';
                        ReportHTML += '             <div class="col-xs-3"><b>Due Date: </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '</div>';
                        if ($("#hDefaultUnEditableCompanyName").val() == "ELI") {
                            ReportHTML += '             <div class="col-xs-9"></div>';
                            ReportHTML += '             <div class="col-xs-3"><b>Issue Date: </b>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pInvoiceHeader.CreationDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.CreationDate))) + '</div>';
                        }
                        ReportHTML += '             <div class="col-xs-12 b-b b-dark m-t-n-xs" style="clear:both;"></div>';

                        if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                            ReportHTML += '             <div class="col-xs-6"><b>Operation: </b>' + pMasterOperationCode + '</div>';
                        else
                            ReportHTML += '             <div class="col-xs-6"><b>Operation: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceOperationCode").text() + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Currency: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</div>';
                        if ($("#cbPrintMBL").prop("checked"))
                            ReportHTML += '             <div class="col-xs-6"><b>MB/L No.: </b>' + pMasterBL + '</div>';
                        if ($("#hDefaultUnEditableCompanyName").val() == "DGL" && pMasterBL == "")
                            ReportHTML += '             <div class="col-xs-6"><b>Courier: </b>' + (pMainRoute.Notes == 0 ? "" : pMainRoute.Notes) + '</div>';
                        if ($("#cbPrintHBL").prop("checked")) {
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
                            if ($("#hDefaultUnEditableCompanyName").val() != "TEU" && $("#hDefaultUnEditableCompanyName").val() != "ELI")
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
                        ReportHTML += '             <div class="col-xs-6"><b>CBM: </b>' + pCBM + ' ' + '</div>';

                        if (pOperationHeader.CertificateNumber != 0 || $("#hDefaultUnEditableCompanyName").val() == "ELI") {
                            ReportHTML += '         <div class="col-xs-6"><b>Certificate No: </b>' + (pOperationHeader.CertificateNumber == 0 ? "" : pOperationHeader.CertificateNumber) + '</div>';
                            ReportHTML += '         <div class="col-xs-6"><b>Customer Ref: </b>' + (pOperationHeader.CustomerReference == 0 ? "" : pOperationHeader.CustomerReference) + '</div>';
                        }
                        if ($("#hDefaultUnEditableCompanyName").val() == "TEU") {
                            ReportHTML += '             <div class="col-xs-6"><b>ChargeableWeight: </b>' + pOperationHeader.ChargeableWeight + ' KGM' + '</div>';
                            ReportHTML += '             <div class="col-xs-6"><b>CBM: </b>' + pCBM + ' CBM</div>';
                        }
                        if ($("#hDefaultUnEditableCompanyName").val() == "DGL" || $("#hDefaultUnEditableCompanyName").val() == "BAD")
                            ReportHTML += '             <div class="col-xs-6"><b>Notes: </b>' + (pInvoiceHeader.MiddleSignature == 0 ? "" : pInvoiceHeader.MiddleSignature) + '</div>';
                        ReportHTML += '                     <div class="col-xs-12 clear">';
                        ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                        ReportHTML += '                             <thead>';
                        ReportHTML += '                                 <tr>';
                        if ($("#hDefaultUnEditableCompanyName").val() == "BAD")
                            ReportHTML += '                                     <th>Ser.</th>';
                        ReportHTML += '                                     <th>Description</th>';
                        ReportHTML += '                                     <th>Qty</th>';
                        ReportHTML += '                                     <th>Unit Price</th>';
                        ReportHTML += '                                     <th>Sale Price</th>';
                        //ReportHTML += '                                     <th>Notes</th>';
                        ReportHTML += '                                 </tr>';
                        ReportHTML += '                             </thead>';
                        ReportHTML += '                             <tbody>';
                        var ReceivablesInInvoice = JSON.parse(data[2]);
                        if (pDefaults.UnEditableCompanyName == "UNF" && ReceivablesInInvoice.length > 0) {
                            ReceivablesInInvoice.sort((a, b) => a.ID - b.ID);
                        }
                        $.each(ReceivablesInInvoice, function (i, item) {
                            if (item.SaleAmount == 0) {
                                return;
                            }
                            ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                            if ($("#hDefaultUnEditableCompanyName").val() == "BAD")
                                ReportHTML += '                                         <td>' + (i + 1) + '</td>';
                            if ($("#hDefaultUnEditableCompanyName").val() == "TEL")
                                ReportHTML += '                                         <td>' + (item.Notes == 0 ? (item.ChargeTypeName == 0 ? "" : item.ChargeTypeName) : item.Notes) + '</td>';
                            else
                                ReportHTML += '                                         <td style="text-align:left;">' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                            ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                            ReportHTML += '                                         <td>' + item.SalePrice.toFixed(2) + '</td>';
                            ReportHTML += '                                         <td>' + item.SaleAmount.toFixed(2) + '</td>';
                            //ReportHTML += '                                         <td>' + (item.Notes == "0" ? "" : item.Notes) + '</td>';
                            ReportHTML += '                                     </tr>';
                        });
                        //ReportHTML += '                                         <tr>';
                        //ReportHTML += '                                             <td colspan=2>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                        //ReportHTML += '                                             <td><b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + '</b></td>';
                        //ReportHTML += '                                             <td>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</td>';
                        //ReportHTML += '                                         </tr>';
                        //$("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")

                        //ReportHTML += '                                         <tr>';
                        //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                        //ReportHTML += '                                             <td><b>Total Amount : ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
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
                        if ($("#cbPrintBankDetailsFromDefaults").prop("checked")) {
                            ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + ($("#hDefaultUnEditableCompanyName").val() == "QUI" ? (" " + pDefaults.CompanyName) : "") + '</br>';
                            ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                            ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                            ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                            ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                            ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                        }
                            //kk: added 2nd condition
                        else if ($("#cbPrintBankDetailsFromTemplate").prop("checked") && $("#hDefaultUnEditableCompanyName").val() != "DGL" && $("#hDefaultUnEditableCompanyName").val() != "ELI") {
                            ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + ($("#hDefaultUnEditableCompanyName").val() == "QUI" ? (" " + pDefaults.CompanyName) : "") + '</br>';
                            ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                        }
                        else if ($("#cbPrintBankDetailsFromTemplate").prop("checked") && $("#hDefaultUnEditableCompanyName").val() == "ELI") {
                            ReportHTML += '                             <b>SIGNATURE</b>';
                        }
                        else
                            ReportHTML += '                             <br>';
                        ReportHTML += '                         </div>';
                        ReportHTML += '                         <div class="col-xs-4 text-right m-t-n">';
                        if (pTaxAmount != 0 || pDiscountAmount != 0)
                            ReportHTML += '                             <b>Subtotal: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmountWithoutVAT").text()).toFixed(2) + '</br>';
                        //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '</br>';
                        if (pTaxAmount != 0)
                            ReportHTML += '                             <b>VAT(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pTaxAmount.toFixed(2) + '</br>';
                        //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '</br>';
                        if (pDiscountAmount != 0)
                            ReportHTML += '                             <b>Discount(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pDiscountAmount.toFixed(2) + '</br>';
                        ReportHTML += '                             <b>Total: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' <b>' + parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()).toFixed(2) + '</b></br>';
                        ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()).toFixed(2)) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</br>';
                        if ($("#cbPrintUSDTotal").prop("checked") && $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text().trim() == "EGP")
                            ReportHTML += '                             <b>USD Total: </b>' + ' <b>' + ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() / $("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")).toFixed(2) + '</b></br>';
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
                            ReportHTML += '         <div class="text-right m-r-lg"><img src="/Content/Images/CompanyStamp.jpg" alt="footer"/></div>';

                        if ($("#hDefaultUnEditableCompanyName").val() == "TEL") {
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
                        if ($("#cbPrintBankDetailsFromTemplate").prop("checked") && ($("#hDefaultUnEditableCompanyName").val() == "DGL" || $("#hDefaultUnEditableCompanyName").val() == "ELI")) {
                            ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                            ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>").replace(/\ /g, "&nbsp;");
                        }

                        if ($("#hDefaultUnEditableCompanyName").val() == "DYN")
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
                        mywindow.document.write(ReportHTML);
                        mywindow.document.close();
                    } //EOF All other companies
                } //EOF else fields are complete
                FadePageCover(false);
            });
}

function InvoiceEdit_Row_CalculateReceivablesAmount(pRowID) {
    var rowQuantity = $("#txtTblModalReceivableQuantityInvoiceEdit" + pRowID).val();
    var rowSalePrice = $("#txtTblModalReceivableSalePriceInvoiceEdit" + pRowID).val();

    var decAmountWithoutVAT = 0;
    var decTaxAmount = 0; var decTaxPercentage = 0.0;
    //var decDiscountAmount = 0; var decDiscountPercentage = 0.0;

    decAmountWithoutVAT = rowQuantity * rowSalePrice;
    $("#txtTblModalReceivableAmountWithoutVATInvoiceEdit" + pRowID).val(decAmountWithoutVAT);
    decTaxPercentage = $("#slReceivableTaxInvoiceEdit" + pRowID + " option:selected").attr("CurrentPercentage");
    decTaxAmount = decAmountWithoutVAT * decTaxPercentage / 100;
    //decDiscountPercentage = $("#slReceivableDiscountInvoiceEdit" + pRowID + " option:selected").attr("CurrentPercentage");
    //decDiscountAmount = decAmountWithoutVAT * decDiscountPercentage / 100;
    $("#txtTblModalReceivableTaxPercentageInvoiceEdit" + pRowID).val(decTaxPercentage);
    $("#txtTblModalReceivableTaxAmountInvoiceEdit" + pRowID).val(decTaxAmount.toFixed(2));
    //$("#txtTblModalReceivableDiscountPercentageInvoiceEdit" + pRowID).val(decDiscountPercentage);
    //$("#txtTblModalReceivableDiscountAmountInvoiceEdit" + pRowID).val(decDiscountAmount.toFixed(2));
    $("#txtTblModalReceivableSaleAmountInvoiceEdit" + pRowID).val((decAmountWithoutVAT + decTaxAmount).toFixed(2)); //$("#txtTblModalReceivableSaleAmount" + pRowID).val((decAmountWithoutVAT + decTaxAmount - decDiscountAmount).toFixed(2));

    Invoices_ChangeAmountInInvoiceEdit(false); //the flag is true if called from RemoveInvoiceItems
}
//if pIsRemoveItems then pIDs will be the NOT selected items coz the selected ones will be removed
//pIsCheck: if true then don't update the amount coz i am just checking
function Invoices_ChangeAmountInInvoiceEdit(pIsRemoveItems, pIsCheck) {
    debugger;
    var decInvoiceAmount = 0;
    var decInvoiceTaxAmount = 0; var decInvoiceTaxPercentage = 0.0;
    var decInvoiceDiscountAmount = 0; var decInvoiceDiscountPercentage = 0.0;
    var pIDs = "";
    pIDs = (pIsRemoveItems
        ? GetAllNOTSelectedIDsAsStringWithNameAttr("cbSelectInvoiceItems")
        : GetAllIDsAsStringWithNameAttr("tblModalInvoiceItems", "cbSelectInvoiceItems"));
    var ArrayOfIDs = pIDs.split(',');
    var NumberOfSelectedItems = ArrayOfIDs.length;
    for (var i = 0; i < NumberOfSelectedItems; i++) {
        var RowSaleAmount = $("#txtTblModalReceivableSaleAmountInvoiceEdit" + ArrayOfIDs[i]).val();
        if (!isNaN(RowSaleAmount) && RowSaleAmount.length != 0) {
            decInvoiceAmount += parseFloat(RowSaleAmount);
        }
    }
    if ($('#slEditInvoiceTax').val() == 0) {
        $("#slEditInvoiceTax option:selected").attr("CurrentPercentage", 0);
    }
    decInvoiceTaxPercentage = $("#slEditInvoiceTax option:selected").attr("CurrentPercentage");
    decInvoiceTaxAmount = (decInvoiceAmount * decInvoiceTaxPercentage / 100).toFixed(2);
    if ($('#slEditInvoiceDiscount').val() == 0) {
        $("#slEditInvoiceDiscount option:selected").attr("CurrentPercentage", 0);
    }
    decInvoiceDiscountPercentage = $("#slEditInvoiceDiscount option:selected").attr("CurrentPercentage");
    decInvoiceDiscountAmount = (decInvoiceAmount * decInvoiceDiscountPercentage / 100).toFixed(2);
    $("#txtEditInvoiceAmountWithoutVAT").val(decInvoiceAmount); // decInvoiceAmount is without VAT till this line
    decInvoiceAmount += decInvoiceTaxAmount - decInvoiceDiscountAmount;
    $("#txtEditInvoiceTaxAmount").val(decInvoiceTaxAmount);
    $("#txtEditInvoiceDiscountAmount").val(decInvoiceDiscountAmount);
    $("#txtEditInvoiceTaxPercentage").val(decInvoiceTaxPercentage);
    $("#txtEditInvoiceDiscountPercentage").val(decInvoiceDiscountPercentage);
    $("#txtEditInvoiceAmount").val(decInvoiceAmount);

    if (!pIsCheck) //if pIsCheck is true, then this means dont refresh amount coz i am just checking
        $("#txtEditInvoiceAmount").val(decInvoiceAmount);
    return decInvoiceAmount;
}


//fill the already added items
function Invoices_FillInvoiceItems(pInvoiceID, callback) {
    debugger;
    var pStrFnName = "/api/Receivables/LoadAll";
    var pDivName = "divEditInvoice";//div name to be filled
    //var ptblModalName = "tblModalReceivables";
    var ptblModalName = "tblModalInvoiceItems";
    var pCheckboxNameAttr = "cbSelectInvoiceItems";
    var pWhereClause = "";
    pWhereClause += " WHERE IsDeleted = 0 ";
    pWhereClause += " AND " + ($("#hEditedInvoiceTypeCode").val() == "DRAFT" ? "DraftInvoiceID=" : "InvoiceID=") + pInvoiceID;
    pWhereClause += " AND ( ChargeTypeCode LIKE '%" + $("#txtSearchInvoiceItems").val().trim().toUpperCase() + "%' OR ChargeTypeName LIKE '%" + $("#txtSearchInvoiceItems").val().trim().toUpperCase() + "%') ";
    //pWhereClause += " ORDER BY ChargeTypeCode ";

    FillReceivablesModalTableControls_UnFilledSl(pStrFnName, pWhereClause, pDivName, ptblModalName, pCheckboxNameAttr, false /*pIsInsert*/, true /*pIsInvoiceEdit*/
        , function () {
            HighlightText("#divEditInvoice", $("#txtSearchInvoiceItems").val().trim().toUpperCase());
            if (callback != null && callback != undefined)
                callback();
        });

    $("#btn-SearchInvoiceItems").attr("onclick", "Invoices_FillInvoiceItems(" + pInvoiceID + ");");
    //$("#btnEditInvoiceApply").attr("onclick", "Invoices_Update(false, false);");//parameters(pSaveAndNew, pIsRemoveItems)
}

function Invoices_CheckDates(pIssueDateControlName, pDueDateControlName) {
    var isCorrectLogic = true;
    if (
           (!isValidDate($("#" + pIssueDateControlName).val().trim(), 1) && $("#" + pIssueDateControlName).val().trim() != "")
        || (!isValidDate($("#" + pDueDateControlName).val().trim(), 1) && $("#" + pDueDateControlName).val().trim() != "")
        )
        isCorrectLogic = false;
    else  //the 1st 2 conditions is coz incase of being empty the return value from ConvertDateFormat() fn is 1 and i dont need the condition
        // make sure that Issue is before Due
        if (ConvertDateFormat($("#" + pIssueDateControlName).val()) != 1 && ConvertDateFormat($("#" + pDueDateControlName).val()) != 1 && Date.prototype.compareDates(ConvertDateFormat($("#" + pIssueDateControlName).val()), ConvertDateFormat($("#" + pDueDateControlName).val())) < 0)
            isCorrectLogic = false;
    return isCorrectLogic;
}

function Invoices_LoadAll(pOperationID, pOperationContainersAndPackagesID) {
    //var pWhereClause = " WHERE (OperationID = " + pOperationID + " OR MasterOperationID = " + pOperationID + ") " + " AND IsDeleted = 0 ";
    //pWhereClause += " and (OperationContainersAndPackagesID = " + pOperationContainersAndPackagesID + " ) ";

    var pWhereClause = " ";
    if (SelectedHouseBillID == 0) {
        pWhereClause = " WHERE (OperationID = " + pOperationID + " OR MasterOperationID = " + pOperationID + ") " + " AND IsDeleted = 0 ";
        pWhereClause += " and (OperationContainersAndPackagesID = " + pOperationContainersAndPackagesID + " ) ";
    }
    else {
        pWhereClause = " WHERE (OperationID = " + SelectedHouseBillID + " and MasterOperationID = " + pOperationID + ") " + " AND IsDeleted = 0 ";
    }

    if (WarehouseDefaultTariffID > 0) {
        pWhereClause += " and (TariffID = " + WarehouseDefaultTariffID + " ) ";
    }



    debugger;
    LoadAll("/api/Invoices/LoadAll", pWhereClause, function (pTabelRows) {
        var pInvoiceData = JSON.parse(pTabelRows[0]);


        if (pInvoiceData.length > 0) {
            DisableControlsAfterInvoice(true);

            if (pInvoiceData[0].InvoiceTypeCode != "DRAFT" && pInvoiceData[0].InvoiceStatus !="Cancelled by credit note" ) {
                $("#btn-AddReceivables").attr("disabled", true);
                $("#btn-DeleteReceivable").attr("disabled", true);
                $("#btn-DeleteInvoice").attr("disabled", true);

                $("#btn-AddInvoiceItem").attr("disabled", true);
                $("#btn-DeleteInvoiceItem").attr("disabled", true);
                $("#btnSaveEditInvoice").attr("disabled", true);
            }
            else {
                $("#btn-AddReceivables").attr("disabled", false);
                $("#btn-DeleteReceivable").attr("disabled", false);
                $("#btn-DeleteInvoice").attr("disabled", false);

                $("#btn-AddInvoiceItem").attr("disabled", false);
                $("#btn-DeleteInvoiceItem").attr("disabled", false);
                $("#btnSaveEditInvoice").attr("disabled", false);
                if (pInvoiceData[0].InvoiceTypeCode == "DRAFT" || pInvoiceData[0].InvoiceStatus == "Cancelled by credit note")
                    DisableControlsAfterInvoice(false);
            }
            if (pDefaults.UnEditableCompanyName == "UNF") {
                $("#btn-AddReceivables").attr("disabled", false);
                $("#btn-DeleteReceivable").attr("disabled", false);

                let filteredInvoices = pInvoiceData.filter(item => item.InvoiceStatus != "UnPaid");
                let s = new Set();
                pInvoiceData.forEach(item => {
                    s.add(item.StorageFromDate);
                });
                if (filteredInvoices.length > 0 || s.size > 1) {
                    $("#txtStorageEndDate").attr("disabled", true);
                    $("#btnSave").attr("disabled", true);
                } else {
                    $("#txtStorageEndDate").attr("disabled", false);
                    $("#btnSave").attr("disabled", false);
                }
            }
        } else {
            if ($("#txtStorageEndDate").val() == "") {
                $("#txtStorageEndDate").attr("disabled", false);
                $("#btnSave").attr("disabled", false);
                $("#btn-CalculateStorage").attr("disabled", false);
            } else {
                $("#txtStorageEndDate").attr("disabled", true);
                $("#btnSave").attr("disabled", true);
            }
            if (pDefaults.UnEditableCompanyName == "UNF") {
                $("#txtStorageEndDate").attr("disabled", false);
                $("#btnSave").attr("disabled", false);
            }

            let Rec = $('#tblReceivables tbody tr').length;
            if (IsMESCOCompany && Rec == 0) {
                $("#txtStorageEndDate").attr("disabled", false);
                $("#btnSave").attr("disabled", false);
            } else if (IsMESCOCompany && Rec > 0) {
                $("#txtStorageEndDate").attr("disabled", true);
                $("#btnSave").attr("disabled", true);
            }
        }

        Invoices_BindTableRows(pInvoiceData);

        
    });
    //LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Invoices/LoadWithWhereClause", " where OperationID = " + pOperationID, 0, 1000, function (pTabelRows) { Receivables_BindTableRows(pTabelRows); });
}

function Invoices_BindTableRows(pInvoices) {
    debugger;
    if (pDefaults.UnEditableCompanyName == "UNF")
        $("#txtStorageEndDate").attr("disabled", false);
    var LastInvoiceID = 0;

    if (pInvoices.length > 0)
        LastInvoiceID = pInvoices[0].ID
    $('.BkForUNF').css('background-image', 'none');

    ClearAllTableRows("tblInvoices");
    ClearAllTableRows("tblInvoicesDRAFT");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    LogsControlsText = " class='btn btn-xs btn-rounded btn-primary float-right' > <i class='fa fa-chain' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Logs" + "</span>";
    var HoldControlsText = " class='btn btn-xs btn-rounded btn-danger  float-right' style='width:100px;'> <i class='fa fa-exclamation-triangle' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'> HOLD </span>";

    SupplementaryControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Supplementary") + "</span>";

    $.each(pInvoices, function (i, item) {
        if (pDefaults.UnEditableCompanyName == "UNF" && item.ChildInvoiceID != 0) {
            return;
        }
        //var pInvoiceTableName = (item.InvoiceTypeCode == "DRAFT" ? "tblInvoicesDRAFT" : "tblInvoices");
        var pInvoiceTableName = "tblInvoices";
        AppendRowtoTable(pInvoiceTableName,
        ("<tr ID='" + item.ID + "' " + ((OEInv /*&& !item.IsOperationClosed*/ && item.InvoiceStatus == "UnPaid" && !item.IsApproved && item.ChildInvoiceID == 0) ? ('ondblclick="Invoices_EditByDblClick(' + item.ID + "," + "'" + item.InvoiceTypeCode + "'" + ');"') : " class='static-text-primary' ") + ">"
        //("<tr ID='" + item.ID + "'>"
            + "<td class='InvoiceID'> <input" + (item.InvoiceStatus == "UnPaid" && !item.IsOperationClosed && item.NumberOfAccNotes == 0 && !item.IsApproved && item.ChildInvoiceID == 0 ? " name='Delete' " : " disabled='disabled' ") + " type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='Invoicetype'>" + item.InvoiceTypeName + "/" + item.InvoiceTypeName + "</td>"
            + "<td class='InvoiceNumber'>" + item.InvoiceNumber + "/" + item.InvoiceTypeName + "</td>"
            + "<td class='InvoicePartner ' val='" + item.OperationPartnerID + "'>" + (item.PartnerName == 0 ? "" : item.PartnerName) + "</td>"
            + "<td class='InvoicePartnerTypeCode'>" + (item.PartnerTypeCode == 0 ? "" : item.PartnerTypeCode) + "</td>"

            //+ "<td class='InvoiceTaxTypeID hide' val=" + item.TaxTypeID + ">" + (item.TaxTypeID == 0 ? "" : item.TaxTypeName) + "</td>"
            //+ "<td class='InvoiceTaxPercentage hide'>" + item.TaxPercentage + "</td>"
            //+ "<td class='InvoiceTaxAmount hide'>" + item.TaxAmount.toFixed(2) + "</td>"
            /*+ "<td class='InvoiceDiscountTypeID hide' val=" + item.DiscountTypeID + ">" + (item.DiscountTypeID == 0 ? "" : item.DiscountTypeName) + "</td>"*/
            //+ "<td class='InvoiceDiscountPercentage hide'>" + item.DiscountPercentage + "</td>"
            //+ "<td class='InvoiceDiscountAmount hide'>" + item.DiscountAmount.toFixed(2) + "</td>"

            //+ "<td class='InvoiceAmountWithoutVAT hide'>" + item.AmountWithoutVAT.toFixed(2) + "</td>"
            + "<td class='InvoiceAmount'>" + item.Amount.toFixed(2) + "</td>"
            + "<td class='InvoiceCurrency' val='" + item.CurrencyID + "'>" + (item.CurrencyID == 0 ? "" : item.CurrencyCode) + "</td>"
            + "<td class='InvoiceMasterDataExchangeRate hide'>" + item.MasterDataExchangeRate.toFixed(2) + "</td>"
            + "<td class='InvoiceDate'>" + ConvertDateFormat(GetDateWithFormatMDY(item.InvoiceDate)) + "</td>"
            + "<td class='InvoiceDueDate'>" + ConvertDateFormat(GetDateWithFormatMDY(item.DueDate)) + "</td>"
            + "<td class='StorageFromDate'>" + ConvertDateFormat(GetDateWithFormatMDY(item.StorageFromDate)) + "</td>"
            + "<td class='StorageToDate'>" + ConvertDateFormat(GetDateWithFormatMDY(item.StorageToDate)) + "</td>"
            //+ "<td class='IsDocIn hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsDocIn == true ? "true' checked='checked'" : "'") + " /></td>"
            //+ "<td class='IsDocOut hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsDocOut == true ? "true' checked='checked'" : "'") + " /></td>"
            //+ "<td class='IsPrintISOCode hide'> <input type='checkbox' disabled='disabled' val='" + (item.PrintISOCode == true ? "true' checked='checked'" : "'") + " /></td>"
            //+ "<td class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
            //+ "<td class=''><a href='#InvoiceModal' data-toggle='modal' onclick='Invoices_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
            //+ "<td class=''><a href='#InvoiceModal' data-toggle='modal' onclick='Invoices_Print(" + item.ID + ");' " + printControlsText + "</a></td></tr>"));
            //+ "<td class='InvoiceCustomerReference hide'>" + (item.CustomerReference == 0 ? "" : item.CustomerReference) + "</td>"
            //+ "<td class='InvoicePaymentTermID hide' val='" + item.PaymentTermID + "'>" + item.PaymentTermName + "</td>"
            //+ "<td class='InvoiceAddressID hide' val='" + item.AddressID + "'></td>"
            //+ "<td class='InvoiceOperationID hide'>" + item.OperationID + "</td>"
            //+ "<td class='InvoiceMasterOperationID hide'>" + item.MasterOperationID + "</td>"
            //+ "<td class='InvoiceOperationCode hide'>" + (item.OperationCode == 0 ? "" : item.OperationCode) + "</td>"
            //+ "<td class='InvoiceHouseNumber hide'>" + (item.HouseNumber == 0 ? "N/A" : item.HouseNumber) + "</td>" //if "N/A" then either not entered or its Master Op so I should show all the HBLs on the Master, but for space i dont do it.
            + "<td class='InvoiceStatus " + (item.InvoiceStatus == "UnPaid" ? "text-danger" : "text-primary") + "'>" + item.InvoiceStatus + "</td>"
            + "<td class='InvoiceNumberOfAccNotes hide'>" + item.NumberOfAccNotes + "</td>"
            + "<td class='IsApproved'> <input type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"
            //+ "<td class='InvoiceLeftSignature hide'>" + (item.LeftSignature == 0 ? "" : item.LeftSignature) + "</td>"
            //+ "<td class='InvoiceMiddleSignature hide'>" + (item.MiddleSignature == 0 ? "" : item.MiddleSignature) + "</td>"
            //+ "<td class='InvoiceRightSignature hide'>" + (item.RightSignature == 0 ? "" : item.RightSignature) + "</td>"
            //+ "<td class='InvoiceGRT hide'>" + (item.GRT == 0 ? "" : item.GRT) + "</td>"
            //+ "<td class='InvoiceDWT hide'>" + (item.DWT == 0 ? "" : item.DWT) + "</td>"
            //+ "<td class='InvoiceNRT hide'>" + (item.NRT == 0 ? "" : item.NRT) + "</td>"
            //+ "<td class='InvoiceLOA hide'>" + (item.LOA == 0 ? "" : item.LOA) + "</td>"
            //+ "<td class='DirectionType hide'>" + item.DirectionType + "</td>"
            //+ "<td class='RoutingID hide'>" + item.RoutingID + "</td>"
            //+ "<td class='OperationContainersAndPackagesID hide'>" + item.OperationContainersAndPackagesID + "</td>"
            //+ "<td class='CreationDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + "</td>"

            //+ "<td class='hide'><a onclick='Invoices_Logs_LoadWithPaging(" + item.ID + ");' " + LogsControlsText + "</a></td>"
            //+ ($("#hIsOperationDisabled").val() == false
            //    ? "<td class=''><a onclick='Invoices_Print(" + item.ID + ",3);' " + printControlsText + "</a></td>"
            //    : "<td></td>")
            
                + "<td class='showForMES hide'><a onclick='Invoice_MescoPrint(" + item.ID  + ");' " + printControlsText + "</a></td>"
            + "<td class='ONLYUNFCPWPR hide'><a onclick='UnfInvoicePrint(" + item.ID  + ");' " + printControlsText + "</a></td>"
            + "<td class='hideForMES'><a onclick='Invoices_Print(" + item.ID + ",3);' " + printControlsText + "</a></td>"
            + "<td class='OnlyUNFCPW hide'><a " + HoldControlsText + "</a></td>"
            //+ "<td class=''><a " + (item.InvoiceTypeCode == "DRAFT" ? "" : "  onclick='Invoices_GenerateSupplementary(" + item.ID + "," + item.StorageToDate + ");' ") + (item.InvoiceTypeCode == "DRAFT" ? "" : SupplementaryControlsText) + "</a></td>"
            + "<td class=''><a " + ((item.InvoiceTypeCode != "DRAFT" && LastInvoiceID == item.ID) ? " onclick='Invoices_GenerateSupplementary(" + item.ID + "," + item.StorageToDate + ");' " : "") + ((item.InvoiceTypeCode != "DRAFT" && LastInvoiceID == item.ID) ? SupplementaryControlsText : "") + "</a></td>"
                + "</tr>"));

        if (pDefaults.UnEditableCompanyName == "UNF") {
            $(".hideForMES").addClass("hide");
            $(".ONLYUNFCPWPR").removeClass("hide");
        }
        if (pDefaults.UnEditableCompanyName == "UNF" && item.IsHold) {
            $(".hideForMES").addClass("hide");
            $(".OnlyUNFCPW").removeClass("hide");
            $(".ONLYUNFCPWPR").addClass("hide");
            /*$(".BkForUNF").addClass("hide");*/
            //$('.BkForUNF').css('background-image', 'url("https://cdn-icons-png.flaticon.com/512/5261/5261318.png")');
            $('.BkForUNF').css({
                'background-image': 'url("./Content/Images/Hold.jpg")',
                'background-size': '25%',
                'background-position': 'top',
                'background-repeat' :'no-repeat',
                'padding': '20px'
            });
        } 
       
    });
    
    if (pDefaults.UnEditableCompanyName == "MES") {
        $(".hideForMES").addClass("hide");
        $(".showForMES").removeClass("hide");
    }

   

    
    //ApplyPermissions();
    //$("#cbPrintBankDetailsFromDefaults").prop("checked", true);
    //if (OAInv && $("#hIsOperationDisabled").val() == false) $("#btn-NewInvoice").removeClass("hide"); else $("#btn-NewInvoice").addClass("hide");
    //if (ODInv && $("#hIsOperationDisabled").val() == false) $("#btn-DeleteInvoice").removeClass("hide"); else $("#btn-DeleteInvoice").addClass("hide");

    if (OADraftInv && $("#hIsOperationDisabled").val() == false) $("#btn-NewDraftInvoice").removeClass("hide"); else $("#btn-NewDraftInvoice").addClass("hide");
    if (ODDraftInv && $("#hIsOperationDisabled").val() == false) $("#btn-DeleteDraftInvoice").removeClass("hide"); else $("#btn-DeleteDraftInvoice").addClass("hide");

    BindAllCheckboxonTable("tblInvoices", "InvoiceID", "cb-CheckAll-Invoices");
    BindAllCheckboxonTable("tblInvoicesDRAFT", "InvoiceID", "cb-CheckAll-DraftInvoice");
    CheckAllCheckbox("HeaderDeleteInvoiceID");
    CheckAllCheckbox("HeaderDeleteDraftInvoiceID");
    //HighlightText("#tblInvoices>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}

function Invoices_GenerateSupplementary(pLastInvoiceID,pFromDate) {
    debugger;
    jQuery("#ModelWH_CFS_SupplementaryInvoices").modal("show");

    $("#hLastInvoiceID").val(pLastInvoiceID);
    $("#txtStorageToDate").val('');
    $("#txtSupplementaryAmount").val('');
    $("#txtStorageFromDate").val(ConvertDateFormat(GetDateWithFormatMDY(pFromDate.toString())));

    $("#txtStorageFromDate").val(Date.prototype.addDays(ConvertDateFormat($("#txtStorageFromDate").val()), 1));
}

function WH_CFS_Invoices_GenerateSupplementary(pCalcAmountOnly) {
    debugger;

    if ($("#txtStorageToDate").val().toString().trim() == '') {
        swal("Missing Date", " Missing Storage To Date.\n");
    }
    else {
        if (Date.prototype.compareDates(ConvertDateFormat($("#txtStorageFromDate").val()), ConvertDateFormat($("#txtStorageToDate").val())) >= 0) {

            var date1 = new Date(ConvertDateFormat($("#txtStorageFromDate").val()));
            var date2 = new Date(ConvertDateFormat($("#txtStorageToDate").val()));

            // To calculate the no. of days between two dates
            var Difference_In_Days = Math.floor((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24)) + 1;

            $("#txtSupplementaryDays").val(Difference_In_Days);

            var StorageAmount = 0.0;
            var pParametersWithValues =
                {
                    pInvoiceID: $('#hLastInvoiceID').val(),
                    pStorageToDate: $("#txtStorageToDate").val(),
                    pCalculateAmountOnly: pCalcAmountOnly
                }
            CallGETFunctionWithParameters("/api/WH_CFS_Invoices/CalculateSupplementary", pParametersWithValues
                  , function (pData) {
                      if (pData[0]) {
                          StorageAmount = pData[1];
                          if (pCalcAmountOnly == false) {
                              Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val(), $("#hContainerID").val(), $("#hHouseBillID").val());

                              Invoices_LoadAll($("#hOperationID").val(), $("#hContainerID").val());
                          }
                      }
                      else {
                          swal("Sorry", "Connection failed, please try again.");
                      }
                  }
                  , function () {
                      if (StorageAmount >= 0) {
                          $('#txtSupplementaryAmount').val(StorageAmount);
                      }
                      else {
                          $('#txtSupplementaryAmount').val('');
                          swal("Missing Data", "Can't calculate .");
                      }

                  });
        }
        else {
            $('#txtSupplementaryAmount').val('');
            swal("Data Error", "Storage End Date Must Be Greater Than Entry Date");
        }
    }

    if (WH_CFS_Invoices_GetMissingFields() == "") {

        if (Date.prototype.compareDates(ConvertDateFormat($("#txtEntryDate").val()), ConvertDateFormat($("#txtStorageEndDate").val())) >= 1) {

            //var pParametersWithValues =
            //    {
            //        pInventoryID: $('#hInventoryID').val()
            //        , pIsConsol: $("#hHouseBillID").val().toString().trim() == '0' ? false : true
            //    }
            //CallGETFunctionWithParameters("/api/WH_CFS_Invoices/GenerateReceivables", pParametersWithValues
            var pParametersWithValues =
                {
                    pHouseBillIDs: $('#hHouseBillID').val()
                    , pInvoiceTypeID: WarehouseDefaultInvoiceTypeID
                    , pCreateInvoice: false
                    , pTariffDetailIDs: '-1'
                    , pCalculateInvoiceOnly: pCalcAmountOnly
                }
            CallGETFunctionWithParameters("/api/WH_CFS_Invoices/GenerateReceivablesAndInvoicesForConsol", pParametersWithValues
                  , function (pData) {
                      if (pData[0]) {
                          if (pCalcAmountOnly) {
                              if (pData[2] >= 0) {
                                  $('#txtStorageInvoiceAmount').val(pData[2]);
                              }
                              else {
                                  $('#txtStorageInvoiceAmount').val('');
                                  swal("Missing Data", "Please Enter Storage Item in the Storage Tarrif First.");
                              }
                          }
                          else {
                              Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val(), $("#hContainerID").val(), $("#hHouseBillID").val());
                              swal("Success", "Saved successfully.");
                          }
                      }
                      else {
                          swal("Sorry", "Connection failed, please try again.");
                      }
                  }
                  , null);
        }
        else {
            $("#btn-GenerateReceivables").attr("disabled", false);
            swal("Data Error", "Storage End Date Must Be Greater Than Entry Date");
        }
    }
    else {
        var strMissingFields = "";// i am sure there is at least 1 missing field isa
        var fieldCount = 0;

        if ($("#txtStorageEndDate").val().toString().trim() == '')
            strMissingFields += ++fieldCount + " - Storage End Date.\n";
        if ($("#txtKalmarOnCount").val().toString().trim() == '' && SelectedHouseBillID == 0)
            strMissingFields += ++fieldCount + " - Kalmar On Count.\n";
        if ($("#txtKalmarOffCount").val().toString().trim() == '' && SelectedHouseBillID == 0)
            strMissingFields += ++fieldCount + " - Kalmar Off Count.\n";

        swal("You Are Missing For Calculation:", strMissingFields);
    }
}

function Invoices_ClearAllControls(pInvoiceTypeCode) {
    debugger;

    ClearAll("#InvoiceModal");


    $("#slInvoiceCurrency").html($("#hReadySlCurrencies").html());

    $("#txtInvoiceOperationNumber").val($("#txtOperationNumber").val());

    //nour23092023
    // Invoices_SetSlInvoiceTypeProperties(pInvoiceTypeCode, "slInvoiceTypes");
    $("#slInvoiceTypes").attr("disabled", "disabled");
    //if (pDefaults.UnEditableCompanyName == "UNF") {
    //    if ($("#tblReceivables tbody tr").has("td.ReceivableID input:not([disabled]):checked").find("td.ReceivableSalePrice").filter(function () { return parseFloat($(this).text().trim()).toFixed(2) == 0; }).length > 0) {
    //        swal("Sorry", "Please, item selling price cannot be zero in invoice");
    //        return;
    //    }
    //}
    if (Invoices_CheckSameCurrency("tblReceivables", "ReceivableCurrency")) {
        jQuery("#InvoiceModal").modal("show");

        if (pDefaults.UnEditableCompanyName == "KADI") 
            InvoiceTypes_GetList(WarehouseDefaultInvoiceTypeID, "slInvoiceTypes", pInvoiceTypeCode);
        else if ($("#slInvoiceTypes option").length < 2)
            InvoiceTypes_GetList(DraftInvoiceTypeID, "slInvoiceTypes", pInvoiceTypeCode);
        else if (pInvoiceTypeCode == "DRAFT")
            $("#slInvoiceTypes").val($("#slInvoiceTypes option:contains(DRAFT)").val());
        else 
            $("#slInvoiceTypes").val(DraftInvoiceTypeID);
        


        // cancelled to view operation number as text
        // InvoiceOperations_GetList($("#hOperationID").val(), "slInvoiceOperations");

        InvoicePartners_GetList($("#hOperationPartnerID").val(), $("#hOperationID").val(), "slInvoicePartner",
            function () {
                InvoiceAddressTypes_GetList(null, "slInvoiceAddressTypes", "slInvoicePartner", null);
                debugger;
                if (pDefaults.UnEditableCompanyName == "UNF") {
                    var consigneeValue = $("#txtConsignee").val();
                    var $invoicePartner = $("#slInvoicePartner");
                    var matchedOption = $invoicePartner.find("option").filter(function () {
                        return $(this).text().toLowerCase().includes(consigneeValue.toLowerCase());
                    });
                    if (matchedOption.length > 0) {
                        $invoicePartner.val(matchedOption.val());
                    } 
                }

            });
        Invoices_SetInvoiceAmount("tblReceivables", "Invoice", "ReceivableSaleAmount");
        //InvoiceAddressTypes_GetList(null, "slInvoiceAddressTypes", "slInvoicePartner", null);//the 3rd parameter is the sl name of the partner control

        //get the invoice currency from the 1st item (i checked they have the same currency)
        var pInvoiceCurrencyID = $('#tblReceivables').find('input[name="Delete"]:checked:first').parent().parent().find("td.ReceivableCurrency").attr('val');
        if (pInvoiceCurrencyID == undefined) $("#slInvoiceCurrency").removeAttr("disabled");
        else $("#slInvoiceCurrency").attr("disabled", "disabled");
        InvoiceCurrency_GetList((pInvoiceCurrencyID == undefined ? $("#hDefaultCurrencyID").val() : pInvoiceCurrencyID), "slInvoiceCurrency", "Invoice");
        InvoicePaymentTerms_GetList(null, "slInvoicePaymentTerms", function () {
            if (pDefaults.UnEditableCompanyName == "UNF") {
                $("#slInvoicePaymentTerms").val(6);
                $("#slInvoicePaymentTerms").trigger("change");
            }
        });
        if ($("#slInvoiceTax option").length < 2)
            GetListTaxTypeWithNameAndPercAttr(null, "api/TaxeTypes/LoadAllWithWhereClause"
                , "<--Select-->", "slInvoiceTax", "WHERE IsInactive=0 ORDER BY Name"
                , function () {
                    $("#slInvoiceDiscount").html($("#slInvoiceTax").html());
                    $("#slInvoiceTax option[IsDiscount='true']").addClass('hide');
                    $("#slInvoiceDiscount option[IsDiscount='false']").addClass('hide');
                    if (pDefaults.UnEditableCompanyName == "UNF") {
                        $("#slInvoiceTax").val(2);
                        $("#slInvoiceTax").trigger("change");
                    }
                });
        else {
            if (pDefaults.UnEditableCompanyName == "UNF") {
                $("#slInvoiceTax").val(2);
                $("#slInvoiceTax").trigger("change");
            }
        }
        $("#txtInvoiceNumber").val("");
        $("#txtInvoiceCustomerReference").val("");
        //$("#txtInvoiceMasterDataExchangeRate").val(""); //set inside the InvoiceCurrency_GetList() fn
        $("#txtInvoiceIssueDate").val(getTodaysDateInddMMyyyyFormat());
        $("#txtEditInvoiceCreationDate").val($("#txtInvoiceIssueDate").val()); //this is in invoice but set here for Elite
        $("#txtInvoiceDueDate").val($("#txtInvoiceIssueDate").val());

    }
    else //there are different currencies
        swal(strSorry, "The items must be of the same currency.");
    //else { //no items are selected
    //    //jQuery("#InvoiceModal").modal("hide");
    //    swal(strSorry, "Please, Select at least one item.");
    //}
}

function Invoices_EditByDblClick(pID, pInvoiceTypeCode) {

    jQuery("#EditInvoiceModal").modal("show");
    Invoices_FillControls(pID, pInvoiceTypeCode);
}

function Invoices_FillControls(pID, pInvoiceTypeCode) {
    debugger;
    FadePageCover(true);
    if (pDefaults.UnEditableCompanyName == "BRS")
        $("#txtEditInvoiceEditableNotes").css('width', '800px');
    var pInvoiceTableName = (pInvoiceTypeCode == "DRAFT" ? "tblInvoicesDRAFT" : "tblInvoices"); //the only different line
    $("#slEditInvoiceCurrency").html($("#hReadySlCurrencies").html());
    //show printable ClientNotes for NewTrans
    if (pDefaults.UnEditableCompanyName == "NEW")
        $("#txtEditInvoiceClientNotes").parent().removeClass("hide");

    ClearAll("#EditInvoiceModal");
    var tr = $("#" + pInvoiceTableName + " tr[ID='" + pID + "']");

    $("#hEditedInvoiceTypeCode").val(pInvoiceTypeCode);
    var pInvoiceOperationID = $(tr).find("td.InvoiceOperationID").text();
    var pInvoiceMasterOperationID = $(tr).find("td.InvoiceMasterOperationID").text();
    var pRoutingID = $(tr).find("td.RoutingID").text();
    var pRelatedToInvoiceID = $(tr).find("td.RelatedToInvoiceID").text();
    var pOperationContainersAndPackagesID = $(tr).find("td.OperationContainersAndPackagesID").text() == 0 ? "" : $(tr).find("td.OperationContainersAndPackagesID").text();

    $("#tblModalInvoiceItems tbody").html("");
    if (pDefaults.UnEditableCompanyName == "KDS" || pDefaults.UnEditableCompanyName == "NEW") $(".classKDS").removeClass("hide"); else $(".classKDS").addClass("hide");
    $("#slEditInvoiceOperations").children().remove();
    $("#slEditInvoiceRoutingCCA").children().remove();
    $("#hEditedInvoiceID").val(pID);

    jQuery("#EditInvoiceModal").modal("show");
    var pParametersWithValues = { pInvoiceIDToLoad: pID };
    CallGETFunctionWithParameters("/api/Invoices/LoadInvoiceHeaderWithDetails"
        , pParametersWithValues
        , function (pData) {
            var _ReturnedMessage = pData[0];
            var pInvoiceHeader = JSON.parse(pData[1]);
            //var pInvoiceItems = JSON.parse(pData[2]);
            var pOperations = JSON.parse(pData[3]);
            var pOperationPartners = pData[4];
            var pAddress = pData[5];
            var pPaymentTerm = pData[6];
            var pTaxType = pData[7];
            //var pRoutingClearance = pData[8];
            //var pSOA = pData[9];
            var pUser = pData[10];

            if (pInvoiceHeader.IsFleet)
                glbNumberOfInvoiceRoutings = pInvoiceHeader.NumberOfRoutings;
            else
                glbNumberOfInvoiceRoutings = 0;
            $("#lblEditedInvoiceShown").html(": " + pInvoiceHeader.ConcatenatedInvoiceNumber + " / " + (pInvoiceHeader.OperationCode == 0 ? pInvoiceHeader.MasterOperationCode : pInvoiceHeader.OperationCode));
            $("#hEditedInvoiceOperationID").val(pInvoiceHeader.OperationID);
            $("#hEditedInvoiceMasterOperationID").val(pInvoiceHeader.MasterOperationID);
            ////Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(data, ID_Name, Items_Name, SplitByChar, Title, SelectInput_ID, Selected_ID, AttrItemNames, pCallback)
            //Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(pOperations, "ID", "MasterBL,HouseNumber", ' - ', null, "#slEditInvoiceOperations", pInvoiceHeader.OperationID, "ClientEmail", null);
            /***********************Fill InvoiceOperations****************************/
            var option = "";
            var pSlName = "slEditInvoiceOperations";
            $.each(pOperations, function (i, item) {
                if (item.ID == pInvoiceHeader.OperationID)
                    //option += '<option value="' + item.ID + '" OperationCode="' + item.Code + '" HouseNumber="' + item.HouseNumber + '" ClientEmail="' + (item.ClientEmail == 0 ? "" : item.ClientEmail) + '" selected >' + item.Code + (item.RepBLTypeShown == 'MASTER' ? ('(MBL:' + (item.MasterBL == 0 ? "'N/A'" : item.MasterBL) + ')') : ('(House:' + (item.HouseNumber == 0 ? "'N/A'" : item.HouseNumber) + ')')) + '</option>';
                    option += '<option value="' + item.ID + '" OperationCode="' + item.Code + '" HouseNumber="' + item.HouseNumber + '" ClientEmail="' + (item.ClientEmail == 0 ? "" : item.ClientEmail) + '" selected >' + item.EffectiveOperationCode + (item.BLType != 2 ? ('(MBL:' + (item.MasterBL == 0 ? "" : item.MasterBL) + ')') : ('(HBL:' + (item.HouseNumber == 0 ? "" : item.HouseNumber) + ')')) + '</option>';
                else
                    //option += '<option value="' + item.ID + '" OperationCode="' + item.Code + '" HouseNumber="' + item.HouseNumber + '" ClientEmail="' + (item.ClientEmail == 0 ? "" : item.ClientEmail) + '">' + item.Code + (item.RepBLTypeShown == 'MASTER' ? ('(MBL:' + (item.MasterBL == 0 ? "'N/A'" : item.MasterBL) + ')') : ('(House:' + (item.HouseNumber == 0 ? "'N/A'" : item.HouseNumber) + ')')) + '</option>';
                    option += '<option value="' + item.ID + '" OperationCode="' + item.Code + '" HouseNumber="' + item.HouseNumber + '" ClientEmail="' + (item.ClientEmail == 0 ? "" : item.ClientEmail) + '">' + item.EffectiveOperationCode + (item.BLType != 2 ? ('(MBL:' + (item.MasterBL == 0 ? "" : item.MasterBL) + ')') : ('(HBL:' + (item.HouseNumber == 0 ? "" : item.HouseNumber) + ')')) + '</option>';
            });
            $("#" + pSlName).append(option);
            /***********************EOF Fill InvoiceOperations****************************/
            InvoicePartners_GetList(pInvoiceHeader.OperationPartnerID, pInvoiceHeader.OperationID, 'slEditInvoicePartner', null);
            //Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(pOperationPartners, "ID", "PartnerTypeName,PartnerName", ': ', TranslateString("SelectFromMenu"), "#slEditInvoicePartner", pInvoiceHeader.OperationPartnerID, "ClientEmailNotContact,Email,PartnerTypeID,PartnerID,PaymentTermID", null);
            Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(pAddress, "ID", "AddressType", '', TranslateString("SelectFromMenu"), "#slEditInvoiceAddressTypes", pInvoiceHeader.AddressID, "CountryName,CityName,StreetLine1,StreetLine2", null);
            Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(pPaymentTerm, "ID", "Code", '', TranslateString("SelectFromMenu"), "#slEditInvoicePaymentTerms", pInvoiceHeader.PaymentTermID, "Days", null);
            Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(pTaxType, "ID", "Name", ': ', TranslateString("SelectFromMenu"), "#slEditInvoiceTax", pInvoiceHeader.TaxTypeID, "CurrentPercentage,IsDiscount",
                function () {
                    $("#slEditInvoiceDiscount").html($("#slEditInvoiceTax").html());
                    $("#slEditInvoiceDiscount").val(pInvoiceHeader.DiscountTypeID);
                    $("#slEditInvoiceTax option[IsDiscount='true']").addClass('hide');
                    $("#slEditInvoiceDiscount option[IsDiscount='false']").addClass('hide');
                });
            //Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(pRoutingClearance, "ID", "CertificateNumber", '', TranslateString("SelectFromMenu"), "#slEditInvoiceRoutingCCA", pInvoiceHeader.RoutingID, "", null);
            //FillListFromObject(pInvoiceHeader.RelatedToInvoiceID, 1, TranslateString("SelectFromMenu"), "slEditInvoiceRelatedToInvoice", pSOA, null);
            FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slEditInvoiceSignature", pData[10], null);

            $("#slEditInvoiceTransactionTypes").val(pInvoiceHeader.TransactionTypeID == 0 ? "" : pInvoiceHeader.TransactionTypeID);
            $("#slEditInvoiceCurrency").val(pInvoiceHeader.CurrencyID);

            $("#txtEditInvoiceTaxPercentage").val(pInvoiceHeader.TaxPercentage);
            $("#txtEditInvoiceTaxAmount").val((pInvoiceHeader.TaxAmount).toFixed(2));
            $("#txtEditInvoiceDiscountPercentage").val(pInvoiceHeader.DiscountPercentage);
            $("#txtEditInvoiceDiscountAmount").val((pInvoiceHeader.DiscountAmount).toFixed(2));
            $("#txtEditInvoiceFixedDiscount").val(pInvoiceHeader.FixedDiscount);

            $("#txtEditInvoiceIssueDate").val(ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)));
            $("#txtEditInvoiceDueDate").val(ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.DueDate)));
            $("#txtEditInvoiceCreationDate").val(ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.CreationDate)));

            $("#txtEditInvoiceAmountWithoutVAT").val((pInvoiceHeader.AmountWithoutVAT).toFixed(2));

            $("#txtEditInvoiceAmount").val((pInvoiceHeader.Amount).toFixed(2));
            $("#txtEditInvoiceMasterDataExchangeRate").val((pInvoiceHeader.MasterDataExchangeRate).toFixed(2));
            $("#txtEditInvoiceCustomerReference").val(pInvoiceHeader.CustomerReference == 0 ? "" : pInvoiceHeader.CustomerReference);

            $("#txtEditInvoiceLeftSignature").val(pInvoiceHeader.LeftSignature == 0 ? "" : pInvoiceHeader.LeftSignature);
            $("#txtEditInvoiceMiddleSignature").val(pInvoiceHeader.MiddleSignature == 0 ? "" : pInvoiceHeader.MiddleSignature);
            $("#txtEditInvoiceRightSignature").val(pInvoiceHeader.RightSignature == 0 ? "" : pInvoiceHeader.RightSignature);
            $("#txtEditInvoiceGRT").val(pInvoiceHeader.GRT == 0 ? "" : pInvoiceHeader.GRT);
            $("#txtEditInvoiceDWT").val(pInvoiceHeader.DWT == 0 ? "" : pInvoiceHeader.DWT);
            $("#txtEditInvoiceLOA").val(pInvoiceHeader.LOA == 0 ? "" : pInvoiceHeader.LOA);
            $("#txtEditInvoiceNRT").val(pInvoiceHeader.NRT == 0 ? "" : pInvoiceHeader.NRT);
            $("#txtEditInvoiceEditableNotes").val(pInvoiceHeader.EditableNotes == 0 ? "" : pInvoiceHeader.EditableNotes);
            $("#txtEditInvoiceClientNotes").val(pInvoiceHeader.Notes == 0 ? "" : pInvoiceHeader.Notes);
            FadePageCover(false);
        }
        , null);

    GetListWithCertificateNumberAndWhereClause(pRoutingID, "/api/Routings/LoadAll", TranslateString("SelectFromMenu")
        , "slEditInvoiceRoutingCCA"
        , {
            pWhereClause: "WHERE OperationID=" + (pInvoiceMasterOperationID == 0 ? pInvoiceOperationID : pInvoiceMasterOperationID)
                          + " AND RoutingTypeID=" + CustomsClearanceRoutingTypeID
            , pOrderBy: "ID"
        }
        , null);

    if (pInvoiceTypeCode == "SOA" || pInvoiceTypeCode == "DRAFT")
        //Fill_SelectInput_WithWhereCondition("/api/Invoices/LoadAll", "ID", "Code", TranslateString("SelectFromMenu"), "#slEditInvoiceRelatedToInvoice", pRelatedToInvoiceID, "WHERE InvoiceTypeCode<>N'SOA' AND OperationID=" + (pInvoiceMasterOperationID == 0 ? pInvoiceOperationID : pInvoiceMasterOperationID));
        LoadAll("/api/Invoices/LoadAll", " WHERE ID<>" + pID + " AND OperationID IN(" + pInvoiceOperationID + "," + pInvoiceMasterOperationID + ") AND InvoiceTypeCode<>N'SOA' AND InvoiceTypeCode<>N'DRAFT' AND IsDeleted = 0 "
            , function (pData) { FillListFromObject(pRelatedToInvoiceID, 1, TranslateString("SelectFromMenu"), "slEditInvoiceRelatedToInvoice", pData[0], null); });
    else
        $("#slEditInvoiceRelatedToInvoice").html("<option value=''>" + TranslateString("SelectFromMenu") + "</option>");

    if ($("#cbIsTank").prop("checked")) { //(pOperationContainersAndPackagesID != "") {
        $(".classShowForTank").removeClass("hide");
        CallGETFunctionWithParameters("/api/OperationContainersAndPackages/LoadAllTanks"
            , {
                pPageNumber: 1
                , pPageSize: 999999
                , pWhereClauseForTank: "WHERE OperationID=" + pInvoiceOperationID + " AND TankOrFlexiNumber IS NOT NULL AND ID IN (SELECT OperationContainersAndPackagesID FROM Receivables WHERE IsDeleted=0 AND (InvoiceID IS NULL OR InvoiceID=" + pID + ") AND OperationID=" + pInvoiceOperationID + ") "
                , pOrderBy: "ID"
            }
            , function (pData) {
                var pTank = pData[0];
                FillListFromObject(pOperationContainersAndPackagesID, 1, TranslateString("SelectFromMenu"), "slEditInvoiceTank", pTank, null);
            }
            , null);
    }
    //else
    //    $(".classShowForTank").addClass("hide");
    if (pDefaults.UnEditableCompanyName == "UNF") {
        if (pInvoiceTypeCode == "DRAFT") {
            $("#btn-AddInvoiceItem").attr("disabled", false);
            $("#btn-DeleteInvoiceItem").attr("disabled", false);
            $("#btnSaveEditInvoice").attr("disabled", false);
        } else {
            $("#btn-AddInvoiceItem").attr("disabled", true);
            $("#btn-DeleteInvoiceItem").attr("disabled", true);
            $("#btnSaveEditInvoice").attr("disabled", true);
        }
    }

    Invoices_FillInvoiceItems(pID, null);//to fill the available invoice items
    $("#btnSaveEditInvoice").attr("onclick", "Invoices_Update(false, false);");//parameters(pSaveAndNew, pIsRemoveItems)
    $("#btn-AddInvoiceItem").attr("data-target", "#CheckboxesListModal");
    $("#btn-AddInvoiceItem").attr("onclick", "Invoices_GetAvailableItems(" + constTransactionInvoiceApproval + ");");
}

function Invoices_SetSlInvoiceTypeProperties(pInvoiceTypeCode, pSlName) {
    if (pInvoiceTypeCode == "DRAFT")
        $("#" + pSlName).attr("disabled", "disabled");
    else {
        //$("#" + pSlName).removeAttr("disabled");
        $("#slInvoiceTypes option:contains('DRAFT')").addClass("hide")
    }
}

function Invoices_CheckSameCurrency(pTblName, pClassOfCurrencyTd) {
    debugger;
    var isSameCurrency = true;
    //get the currencyID of the first item checked and then compare it to currencies of other items
    var firstCurrencyIDChecked = $('#' + pTblName).find('input[name="Delete"]:checked:first').parent().parent().find("td." + pClassOfCurrencyTd).attr('val');
    $('#' + pTblName + ' td').find('input[name="Delete"]:checked').each(function () {
        if (firstCurrencyIDChecked != $("#" + pTblName + " tr[id=" + $(this).attr('value') + "]").find("td." + pClassOfCurrencyTd).attr('val'))
            isSameCurrency = false;
    });
    return isSameCurrency;
}

function Invoices_CheckSameCurrencyForEdit(pSelectedReceivableItemsIDs) {
    var isSameCurrencyAndExchangeRate = true;
    var ArrayOfIDs = pSelectedReceivableItemsIDs.split(',');
    //i am sure i ve more than 1 item selected isa
    var NumberOfSelectRows = ArrayOfIDs.length;
    var FirstRowCurrencyID = $("#slReceivableCurrencyInvoiceEdit" + ArrayOfIDs[0]).val();

    for (i = 0; i < NumberOfSelectRows; i++) {
        if (FirstRowCurrencyID != $("#slReceivableCurrencyInvoiceEdit" + ArrayOfIDs[i]).val()
            || $("#slReceivableCurrencyInvoiceEdit" + ArrayOfIDs[i] + " option:selected").attr("MasterDataExchangeRate") == 0)
            isSameCurrencyAndExchangeRate = false;
    }
    return isSameCurrencyAndExchangeRate;
}

function Invoices_SetInvoiceAmount(pTblName, pControlPrefix, pClassOfAmountTd) {
    debugger;
    var decInvoiceAmount = 0;
    var decInvoiceTaxAmount = 0; var decInvoiceTaxPercentage = 0.0;
    var decInvoiceDiscountAmount = 0; var decInvoiceDiscountPercentage = 0.0;
    $("#" + pTblName + " td input[name='Delete']:checked").each(function () {
        var RowSaleAmount = $("#" + pTblName + " tr[ID=" + this.value + "] td." + pClassOfAmountTd).text();
        if (!isNaN(RowSaleAmount) && RowSaleAmount.length != 0) {
            decInvoiceAmount += parseFloat(RowSaleAmount);
        }
    });
    if ($("#sl" + pControlPrefix + "Tax option:selected").attr("CurrentPercentage") != undefined) {
        decInvoiceTaxPercentage = $("#sl" + pControlPrefix + "Tax option:selected").attr("CurrentPercentage");
        decInvoiceTaxAmount = (decInvoiceAmount * decInvoiceTaxPercentage / 100).toFixed(2);
    }
    if ($("#sl" + pControlPrefix + "Discount option:selected").attr("CurrentPercentage") != undefined) {
        decInvoiceDiscountPercentage = $("#sl" + pControlPrefix + "Discount option:selected").attr("CurrentPercentage");
        decInvoiceDiscountAmount = (decInvoiceAmount * decInvoiceDiscountPercentage / 100).toFixed(2);
    }
    $("#txt" + pControlPrefix + "AmountWithoutVAT").val(decInvoiceAmount); //its w/o VAT before adding tax and discount
    decInvoiceAmount += decInvoiceTaxAmount - decInvoiceDiscountAmount;
    $("#txt" + pControlPrefix + "TaxAmount").val(decInvoiceTaxAmount);
    $("#txt" + pControlPrefix + "DiscountAmount").val(decInvoiceDiscountAmount);
    $("#txt" + pControlPrefix + "TaxPercentage").val(decInvoiceTaxPercentage);
    $("#txt" + pControlPrefix + "DiscountPercentage").val(decInvoiceDiscountPercentage);
    $("#txt" + pControlPrefix + "Amount").val(decInvoiceAmount);
}

//show the available items(not added yet) //used by for AccNotes items too
function Invoices_GetAvailableItems(pAccNoteTypeOrInvoice) {
    debugger;
    FadePageCover(true);
    var pControlPrefix = "";
    if (pAccNoteTypeOrInvoice == constTransactionInvoiceApproval) {
        pControlPrefix = "Invoice";
    }
    else {
        pControlPrefix = "AccNote";
    }
    $("#lblShownItems").html($("#lblEdited" + pControlPrefix + "Shown").html());
    var pStrFnName = "";
    if (pAccNoteTypeOrInvoice == constTransactionInvoiceApproval || pAccNoteTypeOrInvoice == constTransactionDebitNote)
        pStrFnName = "/api/Receivables/LoadAll";
    else //pAccNoteTypeOrInvoice == constTransactionCreditNote
        pStrFnName = "/api/Payables/LoadAll";
    var pDivName = "divCheckboxesList";
    $("#" + pDivName).html(""); //to quickly clear
    //var ptblModalName = "tblModalInvoiceCharges";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pWhereClause = "";
    //pWhereClause += " WHERE OperationID=" + $("#hEdited" + pControlPrefix + "OperationID").val() + " AND IsDeleted = 0 ";
    pWhereClause += " WHERE (OperationID=" + $("#hEdited" + pControlPrefix + "OperationID").val() + " OR OperationID=" + $("#hEdited" + pControlPrefix + "MasterOperationID").val() + " OR MasterOperationID=" + $("#hEdited" + pControlPrefix + "OperationID").val() + " OR MasterOperationID=" + $("#hEdited" + pControlPrefix + "MasterOperationID").val() + ") AND IsDeleted = 0 ";
    pWhereClause += pAccNoteTypeOrInvoice == constTransactionCreditNote ? "" : " AND InvoiceID IS NULL "; //if payable then no InvoiceId
    pWhereClause += (pStrFnName == "/api/Receivables/LoadAll" ? " AND DraftInvoiceID IS NULL " : "")
    pWhereClause += " AND AccNoteID IS NULL ";
    pWhereClause += " AND CurrencyID = " + $("#slEdit" + pControlPrefix + "Currency").val();
    pWhereClause += " AND (ChargeTypeCode LIKE '%" + $("#txtSearchItems").val().trim().toUpperCase() + "%' OR ChargeTypeName LIKE '%" + $("#txtSearchItems").val().trim().toUpperCase() + "%') ";
    //pWhereClause += " ORDER BY ChargeTypeCode ";
    GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
        , function () {
            HighlightText("#" + pDivName, $("#txtSearchItems").val().trim());
            $("#btn-SearchItems").attr("onclick", "Invoices_GetAvailableItems(" + pAccNoteTypeOrInvoice + ");");
            $("#btnCheckboxesListApply").attr("onclick", pControlPrefix + "s_AddItems(false," + pAccNoteTypeOrInvoice + ");");
            FadePageCover(false);
        }
        , 1/*pCodeOrName*/);
}

function Invoices_AddItems(pSaveandAddNew) {
    debugger;
    if ($("#slEditInvoiceOperations").val() == null)
        swal("Sorry", "Please, select B/L.");
    else {
        var pModalName = "CheckboxesListModal";
        var pCheckboxNameAttr = "cbAddedItemID";
        var pSelectedItemsIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
        var AmountToBeAdded = "";
        if (pSelectedItemsIDs != "") {
            //i am setting the invoice amount in the controller after adding the Items
            CallGETFunctionWithParameters("/api/Invoices/AddItems"
                , {
                    "pInvoiceID": $("#hEditedInvoiceID").val()
                    , "pOperationID": $("#slEditInvoiceOperations").val()
                    , "pOperationPartnerID": $("#slEditInvoicePartner").val() //in table OperationPartners
                                , "pAddressID": $("#slEditInvoiceAddressTypes").val()///////////////////////////////////////////////
                    //, "pPrintedAddress": "0"
                                , "pCustomerReference": ($("#txtEditInvoiceCustomerReference").val().trim() == "" ? "0" : $("#txtEditInvoiceCustomerReference").val().toUpperCase())
                                , "pPaymentTermID": $("#slEditInvoicePaymentTerms").val()
                    //, "pCurrencyID": $("#slReceivableCurrencyInvoiceEdit" + pFirstItemRowID).val()
                    //, "pExchangeRate": $("#slReceivableCurrencyInvoiceEdit" + pFirstItemRowID + " option:selected").attr("MasterDataExchangeRate")
                                , "pInvoiceIssueDate": ($("#txtEditInvoiceIssueDate").val() == "" ? "01/01/1900" : $("#txtEditInvoiceIssueDate").val().trim())
                                , "pInvoiceDueDate": ($("#txtEditInvoiceDueDate").val() == "" ? "01/01/1900" : $("#txtEditInvoiceDueDate").val().trim())

                                , "pTaxTypeID": $("#slEditInvoiceTax").val() == "" ? 0 : $("#slEditInvoiceTax").val()
                                , "pTaxPercentage": $("#txtEditInvoiceTaxPercentage").val() == "" ? 0 : $("#txtEditInvoiceTaxPercentage").val()
                    //            , "pTaxAmount": $("#txtEditInvoiceTaxAmount").val() == "" ? 0 : $("#txtEditInvoiceTaxAmount").val() //calculated in controller after adding items
                                , "pDiscountTypeID": $("#slEditInvoiceDiscount").val() == "" ? 0 : $("#slEditInvoiceDiscount").val()
                    , "pDiscountPercentage": $("#txtEditInvoiceDiscountPercentage").val() == "" ? 0 : $("#txtEditInvoiceDiscountPercentage").val()
                    , "pFixedDiscount": 0
                    //, "pDiscountAmount": $("#txtEditInvoiceDiscountAmount").val() == "" ? 0 : $("#txtEditInvoiceDiscountAmount").val() //calculated in controller after adding items
                    , "pRoutingID": ($("#slEditInvoiceRoutingCCA").val() == "" || $("#slEditInvoiceRoutingCCA").val() == null) ? 0 : $("#slEditInvoiceRoutingCCA").val()
                    //, "pAmount": Invoices_ChangeAmountInInvoiceEdit(pIsRemoveItems) //calculated in controller after adding items
                                , "pInvoiceStatusID": 1
                                , "pIsApproved": false
                    , "pSelectedItemsIDs": pSelectedItemsIDs
                    , "pFormName": glbCallingControl
                }
                , function (data) {

                    Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val(), $("#hContainerID").val(), $("#hHouseBillID").val());
                    Invoices_LoadAll($("#hOperationID").val(), $("#hContainerID").val());

                    Invoices_FillInvoiceItems($("#hEditedInvoiceID").val(), function () { Invoices_ChangeAmountInInvoiceEdit(); });
                    jQuery('#' + pModalName).modal('hide');
                });
        }
    }
}

function Invoices_DeleteItems(pSaveandAddNew, pIsRemoveItems) { //if pIsRemoveItems==true then delete items else update
    debugger;
    var pSelectedReceivableItemsIDs = GetAllSelectedIDsAsStringWithNameAttr("cbSelectInvoiceItems");
    if (pSelectedReceivableItemsIDs == "") //to make sure that there are selected items in case of pressing remove items
        swal(strSorry, "Please select at least one item.");
    else if (Date.prototype.compareDates(ConvertDateFormat($("#txtEditInvoiceIssueDate").val().trim()), ConvertDateFormat($("#txtEditInvoiceDueDate").val().trim())) < 0)
        swal(strSorry, "DueDate can't be before Invoice Date.");
    else if ($("#slEditInvoicePartner").val() == "")
        swal(strSorry, "Please, Select partner.");
    else if (ValidateForm("form", "EditInvoiceModal")) {
        if (pSelectedReceivableItemsIDs != "") {
            if (Invoices_CheckSameCurrencyForEdit(pSelectedReceivableItemsIDs)) {
                //Confirmation message to delete
                if (pSelectedReceivableItemsIDs != "")
                    swal({
                        title: "Are you sure?",
                        text: "The invoice will be saved!",
                        //type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes, Save!",
                        closeOnConfirm: true
                    },
                    //callback function in case of confirm delete
                    function () {
                        Receivables_UpdateList(pSaveandAddNew, $("#hEditedInvoiceID").val(), pIsRemoveItems);
                        //to get currency for first item(i am sure all are the same and at least one is checked isa)
                        var pFirstItemRowID = "";
                        if (pIsRemoveItems) //get first unchecked
                            pFirstItemRowID = $('#tblModalInvoiceItems').find('input[name="cbSelectInvoiceItems"]:not(:checked):first').parent().parent().attr("id");
                        else //get first wether checked or not
                            pFirstItemRowID = $('#tblModalInvoiceItems').find('input[name="cbSelectInvoiceItems"]:first').parent().parent().attr("id");
                        var data = {
                            "pInvoiceID": $("#hEditedInvoiceID").val()
                            , "pOperationPartnerID": $("#slEditInvoicePartner").val() //in table OperationPartners
                            , "pPartnerTypeID": $("#slEditInvoicePartner option:selected").attr("PartnerTypeID")
                            , "pPartnerID": $("#slEditInvoicePartner option:selected").attr("PartnerID")
                            , "pAddressID": $("#slEditInvoiceAddressTypes").val()///////////////////////////////////////////////
                            //, "pPrintedAddress": "0"
                            , "pCustomerReference": ($("#txtEditInvoiceCustomerReference").val().trim() == "" ? "0" : $("#txtEditInvoiceCustomerReference").val().toUpperCase())
                            , "pPaymentTermID": $("#slEditInvoicePaymentTerms").val()
                            , "pCurrencyID": $("#slReceivableCurrencyInvoiceEdit" + pFirstItemRowID).val()
                            , "pExchangeRate": $("#slReceivableCurrencyInvoiceEdit" + pFirstItemRowID + " option:selected").attr("MasterDataExchangeRate")
                            , "pInvoiceIssueDate": ($("#txtEditInvoiceIssueDate").val() == "" ? "01/01/1900" : $("#txtEditInvoiceIssueDate").val().trim())
                            , "pInvoiceDueDate": ($("#txtEditInvoiceDueDate").val() == "" ? "01/01/1900" : $("#txtEditInvoiceDueDate").val().trim())

                            , "pAmountWithoutVAT": $("#txtEditInvoiceAmountWithoutVAT").val()
                            , "pTaxTypeID": $("#slEditInvoiceTax").val() == "" ? 0 : $("#slEditInvoiceTax").val()
                            , "pTaxPercentage": $("#txtEditInvoiceTaxPercentage").val() == "" ? 0 : $("#txtEditInvoiceTaxPercentage").val()
                            , "pTaxAmount": $("#txtEditInvoiceTaxAmount").val() == "" ? 0 : $("#txtEditInvoiceTaxAmount").val()
                            , "pDiscountTypeID": $("#slEditInvoiceDiscount").val() == "" ? 0 : $("#slEditInvoiceDiscount").val()
                            , "pDiscountPercentage": $("#txtEditInvoiceDiscountPercentage").val() == "" ? 0 : $("#txtEditInvoiceDiscountPercentage").val()
                            , "pDiscountAmount": $("#txtEditInvoiceDiscountAmount").val() == "" ? 0 : $("#txtEditInvoiceDiscountAmount").val()

                            , "pAmount": Invoices_ChangeAmountInInvoiceEdit(pIsRemoveItems).toFixed(2)
                            , "pDeletedInvoiceItems": pSelectedReceivableItemsIDs
                            ////, "pInvoiceStatusID": 1
                            ////, "pIsApproved": false
                            //, "pLeftSignature": $("#txtEditInvoiceLeftSignature").val().trim() == "" ? "0" : $("#txtEditInvoiceLeftSignature").val().trim()
                            //, "pMiddleSignature": $("#txtEditInvoiceMiddleSignature").val().trim() == "" ? "0" : $("#txtEditInvoiceMiddleSignature").val().trim()
                            //, "pRightSignature": $("#txtEditInvoiceRightSignature").val().trim() == "" ? "0" : $("#txtEditInvoiceRightSignature").val().trim()
                            //, "pGRT": $("#txtEditInvoiceGRT").val().trim() == "" ? "0" : $("#txtEditInvoiceGRT").val().trim()
                            //, "pDWT": $("#txtEditInvoiceDWT").val().trim() == "" ? "0" : $("#txtEditInvoiceDWT").val().trim()
                            //, "pNRT": $("#txtEditInvoiceNRT").val().trim() == "" ? "0" : $("#txtEditInvoiceNRT").val().trim()
                            //, "pLOA": $("#txtEditInvoiceLOA").val().trim() == "" ? "0" : $("#txtEditInvoiceLOA").val().trim()
                        }
                        CallGETFunctionWithParameters("/api/Invoices/DeleteItems", data
                            , function (pID) {
                                //Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val());//executed in Receivables_UpdateList(true, $("#hEditedInvoiceID").val());
                                OperationPartners_LoadWithPagingWithWhereClause($("#hOperationID").val());
                                Invoices_LoadAll($("#hOperationID").val(), $("#hContainerID").val());
                                Invoices_FillInvoiceItems($("#hEditedInvoiceID").val());
                                $("#slEditInvoiceCurrency").val($("#slReceivableCurrencyInvoiceEdit" + pFirstItemRowID).val());//incase of changing currency
                                //Invoices_Print(pID, 3/*$("#slInvoiceReportTypes").val()*/);/*Incoterms_LoadingWithPaging();*/
                            }
                            , null);
                    });
            }
            else //Different Currencies
                swal(strSorry, "The currencies of the selected items must be the same and exchange rate must be entered.");
        }
        else //No items is selected
            swal(strSorry, "The invoice must have at least one item with value greater than 0.");
    }
}

function InvoiceOperations_GetList(pOperationID, pSlName, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    var pWhereClause = " ";
    if (SelectedHouseBillID == 0) {
        pWhereClause = " WHERE ID = " + pOperationID;
    }
    else {
        pWhereClause = " WHERE ID = " + SelectedHouseBillID + " and MasterOperationID = " + pOperationID;
    }

    //GetListWithOpCodeAndHouseNoAndClientEmailAttr(pOperationID, "/api/Operations/LoadAll", null, pSlName, pWhereClause);
    GetListWithOpCodeAndHouseNoAndClientEmailAttr(pOperationID, "/api/Operations/LoadWithParameters", null, pSlName, { pPageNumber: 1, pPageSize: 99999, pWhereClause: pWhereClause, pOrderBy: "HouseNumber" }
        , callback);
}

function InvoicePartners_GetList(pID, pInvoiceOperationID, pSlName, callback) {
    debugger;
    var pWhereClause = "";

    if (IsMESCOCompany) {
        pWhereClause +=
            "WHERE ID IN (" +
            "    SELECT op.ID " +
            "    FROM vwOperations o " +
            "    JOIN vwOperationPartners op ON o.ID = op.OperationID " +
            "        AND o.ClientID = op.PartnerID " +
            "        AND ( " +
            "            (o.DirectionType = 1 AND op.OperationPartnerTypeID = 2) OR " +
            "            (o.DirectionType = 2 AND op.OperationPartnerTypeID = 1) " +
            "        ) " +
        "    WHERE o.ID = " + $('#hHouseBillID').val() +
            ")OR ID = " + pID + " \n";
    } else {
        pWhereClause += "WHERE (OperationID = " + pInvoiceOperationID + " OR MasterOperationID = " + pInvoiceOperationID + ") \n";
        pWhereClause += "AND PartnerID IS NOT NULL \n";
        pWhereClause += "AND (PartnerTypeID = " + constCustomerPartnerTypeID + " OR PartnerTypeID = " + constAgentPartnerTypeID + ") \n";
        pWhereClause += "OR ID = " + pID + " \n";
        pWhereClause += "ORDER BY PartnerTypeName";
    }

    // Load dropdown list
    GetListOperationPartnersWithPartnerTypeIDAndPartnerIDAttrAndWhereClause(
        pID,
        "/api/OperationPartners/LoadAll",
        "Select Partner",
        pSlName,
        pWhereClause,
        function () {
            if ((pID == null || pID == undefined) && $("#" + pSlName + " :nth-of-type(2)").val() != undefined) {
                $("#" + pSlName).val($("#" + pSlName + " :nth-of-type(2)").val()); // select first item
            }
            if (typeof callback === "function") {
                callback();
            }
        }
    );
}

function Invoices_PartnerChanged(pSlName, pOperationPartnerSlName, pIssueDateControlName, pDueDateControlName, pPaymentTermControlName) {
    debugger;
    InvoiceAddressTypes_GetList(null, pSlName, pOperationPartnerSlName, null);//the 3rd parameter is the sl name of the partner SlName
    //InvoiceAddressTypes_GetList($("#" + pOperationPartnerSlName + " option:selected").attr('PartnerID') == 0 ? null : $("#" + pOperationPartnerSlName + " option:selected").attr('PartnerID'), pSlName, pOperationPartnerSlName, null);//the 3rd parameter is the sl name of the partner SlName
    $("#" + pPaymentTermControlName).val($("#" + pOperationPartnerSlName + " option:selected").attr("PaymentTermID")); //set the payment term
    Invoices_SetDueDate(pIssueDateControlName, pDueDateControlName, pPaymentTermControlName);
}

//the id is that of the Address not the address type
function InvoiceAddressTypes_GetList(pID, pSlName, pOperationPartnerSlName, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    pWhereClause = "";
    pWhereClause = " Where (PartnerID = " + ($("#" + pOperationPartnerSlName + " option:selected").attr("PartnerID") == "" ? 0 : $("#" + pOperationPartnerSlName + " option:selected").attr("PartnerID"));
    pWhereClause += "  AND PartnerTypeID=" + ($("#" + pOperationPartnerSlName + " option:selected").attr("PartnerTypeID") == "" ? 0 : $("#" + pOperationPartnerSlName + " option:selected").attr("PartnerTypeID")) + ") ";
    if (pID != null)
        pWhereClause += " OR ID = " + pID;
    pWhereClause += " ORDER BY AddressTypeID ";
    debugger;
    GetListAddressesWithMultipleAttr(pID, "/api/Addresses/LoadAll", "Select Address Type", pSlName, pWhereClause
        , function () {
            if ((pID == null || pID == undefined) && $("#" + pSlName + " :nth-of-type(2)").val() != undefined)
                $("#" + pSlName).val($("#" + pSlName + " :nth-of-type(2)").val());//to select the 1st item
        });
}

function Invoices_SetDueDate(pCallingControl, pControlToBeSet, pSlPaymentTermControl) {
    debugger;
    if (pDefaults.UnEditableCompanyName == "ELI")
        pCallingControl = "txtEditInvoiceCreationDate";
    if (isValidDate($("#" + pCallingControl).val().trim(), 1))
        $("#" + pControlToBeSet).val(
            Date.prototype.addDays(ConvertDateFormat($("#" + pCallingControl).val()), $("#" + pSlPaymentTermControl + " option:selected").attr("Days")));
    //EnableDisable DueDate according to Cash or not
    if ($("#" + pSlPaymentTermControl + " option:selected").text().toUpperCase() == "CASH")
        $("#" + pControlToBeSet).attr("disabled", "disabled");
    else
        $("#" + pControlToBeSet).removeAttr("disabled");
}

function InvoiceCurrency_GetList(pID, pSlName, pControlPrefix) {
    if (pSlName != null && pSlName != undefined && pSlName != 0)
        $("#" + pSlName).val(pID);
    else
        $("#" + pSlName).val($("#hDefaultCurrencyID").val());
    $("#txt" + pControlPrefix + "MasterDataExchangeRate").val($("#" + pSlName + " option:selected").attr("MasterDataExchangeRate"));
}

function InvoiceTypes_GetList(pID, pSlName, pInvoiceTypeCode) {
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithNameAndWhereClause(pID, "/api/InvoiceTypes/LoadAll", "Select Invoice Type", pSlName, " WHERE 1=1 ORDER BY Name "
        , function () {
            if (pInvoiceTypeCode == "DRAFT")
                $("#" + pSlName).val($("#slInvoiceTypes option:contains(DRAFT)").val());
            else
                $("#" + pSlName + " option:contains('DRAFT')").addClass("hide");
        });
}

function InvoicePaymentTerms_GetList(pID, pSlName, callback) {
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListPaymentTermWithCodeAndDaysAttr(pID, "/api/PaymentTerms/LoadAll", "Select PaymentTerm", pSlName, " WHERE 1=1 ORDER BY Code ", callback);
}
/////////////////////////////////////EOF GetLists////////////////////////////////////////////////////

//#endregion

function CFS_Receivables_MultiRowEdit() {
    debugger;
    FadePageCover(true);
    $("#divSelectCharges").html("");
    var pStrFnName = "/api/Receivables/LoadAll";
    var pDivName = "divSelectCharges";//div name to be filled
    var ptblModalName = "tblModalReceivables";
    var pCheckboxNameAttr = "cbSelectReceivables";
    var AWBSuffix = "";
    if ($("#cbIsAWB").prop("checked")) {
        AWBSuffix = "AWB";
    }
    var pSelectedIDs = GetAllSelectedIDsAsString('tblReceivables' + AWBSuffix);
    var pWhereClause = "";
    pWhereClause += " WHERE OperationID = " + $("#hOperationID").val() + " AND IsDeleted = 0 AND TariffID IS NOT NULL AND AccNoteID IS NULL AND InvoiceID IS NULL";
    if (["FIV", "SUS"].includes(pDefaults.UnEditableCompanyName))
        pWhereClause += "";
    if (pSelectedIDs != "")
        pWhereClause += " AND ID IN (" + pSelectedIDs + ")" + " \n";
    if ($("#txtSearchCharges").val().trim() == "0")
        pWhereClause += "AND (SaleAmount IS NULL OR SaleAmount=0)" + " \n";
    else
        pWhereClause += " AND (ChargeTypeCode LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%' OR ChargeTypeName LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%' OR PayableHouseNumber LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%' OR PayableCertificateNumber LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%') ";
    //pWhereClause += " ORDER BY ChargeTypeName ";

    /*FillReceivablesModalTableControls(pStrFnName, pWhereClause, pDivName, ptblModalName, pCheckboxNameAttr, false /*pIsInsert, false /*pIsInvoiceEdit
        , function () {
            FadePageCover(false);
            //HighlightText("#" + divSelectCharges, $("#txtSearchCharges").val().trim().toUpperCase());
            if (pDefaults.UnEditableCompanyName == "USC") {
                $(".tblModalReceivableCurrency select").attr("disabled", "disabled");
                $(".tblModalReceivableExchangeRate input").attr("disabled", "disabled");
            }

        });*/
    let pIsInsert = false;
    let pIsInvoiceEdit = false;

    $.ajax({
        type: "GET",
        url: strServerURL + pStrFnName,
        data: { pWhereClause: pWhereClause },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var pPOrCData = data[1];
            var pCurData = data[2];
            var pTankNoData = data[3];
            var HouseBill = data[6];
            //Clear the div
            $("#" + pDivName).html("");
            var divData = ' <section class="panel panel-default" style="overflow: scroll; width:auto ; height: 300px;"> ';
            divData += '    <div class="table-responsive"> ';
            divData += '        <table id="' + ptblModalName + '" class="table table-striped b-t b-light text-sm  table-hover"> ';
            divData += '            <thead> ';
            divData += '            <tr> ';
            divData += '                <th id="HeaderSelectChargeTypesIDs" ' + (pIsInsert || pIsInvoiceEdit ? '>' : ' class="hide">');
            divData += '                </th> ';
            divData += '                <th>' + TranslateString("ChargeType") + '</th> ';
            divData += '                <th class="hide">P/C</th> ';
            divData += '                <th class="hide">UOM</th> ';
            divData += '                <th>' + TranslateString("Quantity") + '</th> ';
            divData += '                <th>' + TranslateString("UnitPrice") + '</th> ';
            if (IsMESCOCompany) {
                divData += '                <th>Category</th> ';
            }
            divData += '                <th class="' + (pDefaults.IsTaxOnItems ? '' : 'hide') + '">' + TranslateString("TaxType") + '</th> ';
            divData += '                <th class="hide">TaxPerc</th> ';
            divData += '                <th class="' + (pDefaults.IsTaxOnItems ? '' : 'hide') + '">' + TranslateString("TaxAmt") + '</th> ';
            divData += '                <th class="' + (pDefaults.IsTaxOnItems ? '' : 'hide') + '">' + TranslateString("Deduction") + '</th> ';
            divData += '                <th class="hide">DeductionPerc</th> ';
            divData += '                <th class="' + (pDefaults.IsTaxOnItems ? '' : 'hide') + '">' + TranslateString("DeductionAmt") + '</th> ';
            divData += '                <th>' + TranslateString("TotalAmount") + '</th> ';
            divData += '                <th ' + (pIsInvoiceEdit ? ' class="hide" ' : '') + '>' + TranslateString("Ex.Rate") + '</th> ';
            divData += '                <th>' + TranslateString("Cur") + '</th> ';
            divData += '                <th>' + TranslateString("Inv.No") + '</th> ';
            //if (pDefaults.UnEditableCompanyName == "BOM") {
            //divData += '                <th>' + TranslateString("ReceiptNo") + '</th> ';
            //divData += '                <th>' + TranslateString("ReceiptDate1") + '</th> ';
            divData += '                <th>' + TranslateString("Notes") + '</th> ';
            //}

            divData += '                <th ' + (pIsInvoiceEdit ? '' : ' class="hide" ') + '>' + TranslateString("Order") + '</th> ';

            divData += '                <th class="rounded-right hide"></th> ';
            divData += '            </tr> ';
            divData += '            </thead> ';
            divData += '            <tbody> ';
            // Bind Rows
            $.each(JSON.parse(data[0]), function (i, item) {
                debugger;
                divData += "        <tr ID='" + item.ID + "'> ";
                divData += "            <td class='tblModalReceivableID " + (pIsInsert || pIsInvoiceEdit ? " ' " : " hide '") + " > <input name='" + pCheckboxNameAttr + "' type='checkbox' value='" + item.ID + "' " + (!pIsInsert && !pIsInvoiceEdit && item.InvoiceID == 0 && item.DraftInvoiceID == 0/*this is an edit for hidden rec. item coz its added to an invoice so dont update*/ ? " checked='checked' " : "") + "></td> ";//if item has invoiceID then check by default
                divData += "            <td class='tblModalReceivable' val='" + item.ChargeTypeID + "' style='width:300px;'>" + (pDefaults.UnEditableCompanyName == "GBL" ? (item.ChargeTypeName + " (" + item.ChargeTypeCode + ")") : item.ChargeTypeName) + "</td> ";
                divData += "            <td class='tblModalReceivablePOrC hide'> <select id='slReceivablePOrC" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID + "' class='controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='false' " + ((item.InvoiceID == 0 && item.DraftInvoiceID == 0) || pIsInvoiceEdit ? "" : " disabled ") + "></select> </td> ";
                divData += "            <td class='tblModalReceivableUOM hide'> <select id='slReceivableUOM" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID + "' class='controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='false' " + ((item.InvoiceID == 0 && item.DraftInvoiceID == 0) || pIsInvoiceEdit ? "" : " disabled ") + "></select></td> ";
                divData += "            <td class='tblModalReceivableQuantity'> <input type='text' id='txtTblModalReceivableQuantity" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID + "' class='form-control controlStyle' data-type='number' " + (pIsInvoiceEdit ? "onchange='InvoiceEdit_Row_CalculateReceivablesAmount(" + item.ID + ");'" : "onchange='Receivables_Row_CalculateReceivablesAmount(" + item.ID + "," + pIsInsert + ");' ") + "  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' data-required='false' maxlength='10' placeholder='0' value='1' " + ((item.InvoiceID == 0 && item.DraftInvoiceID == 0) || pIsInvoiceEdit ? "" : " disabled ") + " /> </td> ";
                divData += "            <td class='tblModalReceivableSalePrice'> <input type='text' id='txtTblModalReceivableSalePrice" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID + "' class='form-control controlStyle' data-type='float' " + (pIsInvoiceEdit ? "onchange='InvoiceEdit_Row_CalculateReceivablesAmount(" + item.ID + ");'" : "onchange='Receivables_Row_CalculateReceivablesAmount(" + item.ID + "," + pIsInsert + ");' ") + " onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);'  data-required='false' maxlength='10' placeholder='0.00' " + (((item.InvoiceID == 0 && item.DraftInvoiceID == 0) || pIsInvoiceEdit) && pDefaults.UnEditableCompanyName != "FIV" ? "" : " disabled ") + " /> </td> ";

                if (IsMESCOCompany) {
                    divData += "            <td class='tblModalReceivableCategory'> <select id='slReceivableCategory" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID + "' " + (pIsInvoiceEdit || pDefaults.UnEditableCompanyName == "FIV" ? "disabled='disabled' " : "") + " class='controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='true' " + ((item.InvoiceID == 0 && item.DraftInvoiceID == 0) || pIsInvoiceEdit ? "" : " disabled ") + "></select> </td> ";
                }

                divData += "            <td class='tblModalReceivableAmountWithoutVAT hide'><input type='text' disabled='disabled' id='txtTblModalReceivableAmountWithoutVAT" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID + "' disabled='disabled' class='form-control controlStyle' onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);'  data-required='false' maxlength='10' placeholder='0.00' " + " /> </td> ";
                divData += "            <td class='tblModalReceivableTax " + (pDefaults.IsTaxOnItems ? "" : " hide ") + "'> <select id='slReceivableTax" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID + "' class='controlStyle' style='width:150px;' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' " + (pIsInvoiceEdit ? "onchange='InvoiceEdit_Row_CalculateReceivablesAmount(" + item.ID + "," + pIsInsert + ");'" : "onchange='Receivables_Row_CalculateReceivablesAmount(" + item.ID + "," + pIsInsert + ");' ") + " data-required='false'" + ((item.InvoiceID == 0 && item.DraftInvoiceID == 0) || pIsInvoiceEdit ? "" : " disabled ") + "></select> </td> ";
                divData += "            <td class='tblModalReceivableTaxPercentage hide'> <input type='text' id='txtTblModalReceivableTaxPercentage" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID + "' disabled='disabled' class='form-control controlStyle' onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);'  data-required='false' maxlength='10' placeholder='0.00' " + " /> </td> ";
                divData += "            <td class='tblModalReceivableTaxAmount " + (pDefaults.IsTaxOnItems ? "" : " hide ") + "'> <input disabled='disabled' type='text' id='txtTblModalReceivableTaxAmount" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID + "' disabled='disabled' class='form-control controlStyle' onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);'  data-required='false' maxlength='10' placeholder='0.00' " + " /> </td> ";
                divData += "            <td class='tblModalReceivableDiscount " + (pDefaults.IsTaxOnItems ? "" : " hide ") + "'> <select id='slReceivableDiscount" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID + "' class='controlStyle' style='width:150px;' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' " + (pIsInvoiceEdit ? "onchange='InvoiceEdit_Row_CalculateReceivablesAmount(" + item.ID + "," + pIsInsert + ");'" : "onchange='Receivables_Row_CalculateReceivablesAmount(" + item.ID + "," + pIsInsert + ");' ") + " data-required='false'" + ((item.InvoiceID == 0 && item.DraftInvoiceID == 0) || pIsInvoiceEdit ? "" : " disabled ") + "></select> </td> ";
                divData += "            <td class='tblModalReceivableDiscountPercentage hide'> <input type='text' id='txtTblModalReceivableDiscountPercentage" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID + "' disabled='disabled' class='form-control controlStyle' onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);'  data-required='false' maxlength='10' placeholder='0.00' " + " /> </td> ";
                divData += "            <td class='tblModalReceivableDiscountAmount " + (pDefaults.IsTaxOnItems ? "" : " hide ") + "'> <input disabled='disabled' type='text' id='txtTblModalReceivableDiscountAmount" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID + "' disabled='disabled' class='form-control controlStyle' onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);'  data-required='false' maxlength='10' placeholder='0.00' " + " /> </td> ";

                divData += "            <td class='tblModalReceivableSaleAmount'><input type='text' name='txtTblModalReceivableSaleAmount'  disabled='disabled' id='txtTblModalReceivableSaleAmount" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID + "' class='form-control controlStyle' data-type='float' " + (pIsInvoiceEdit ? "onchange='Invoices_ChangeAmountInInvoiceEdit(false);'" : "onchange='Receivables_txtTblModalSaleAmount_Changed(" + item.ID + "," + pIsInsert + ");' ") + " onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);'  data-required='false' maxlength='10' placeholder='0.00' " + ((item.InvoiceID == 0 && item.DraftInvoiceID == 0) || pIsInvoiceEdit ? "" : " disabled ") + " /> </td> ";
                divData += "            <td class='tblModalReceivableExchangeRate " + (pIsInvoiceEdit ? "hide" : "") + "'><input type='text' name='txtTblModalReceivableExchangeRate' id='txtTblModalReceivableExchangeRate" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID + "' class='form-control controlStyle' data-type='float' onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);'  data-required='false' maxlength='10' placeholder='0.00' " + ($("#hDefaultCurrencyID").val() == item.CurrencyID || item.InvoiceID != 0 || pIsInvoiceEdit ? "disabled" : "") + " /> </td> ";
                divData += "            <td class='tblModalReceivableCurrency'> <select id='slReceivableCurrency" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID + "' " + (pIsInvoiceEdit || pDefaults.UnEditableCompanyName == "FIV" ? "disabled='disabled' " : "") + " class='controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Receivables_txtTblModalCurrency_Changed(" + item.ID + "," + pIsInvoiceEdit + ");' data-required='false' " + ((item.InvoiceID == 0 && item.DraftInvoiceID == 0) || pIsInvoiceEdit ? "" : " disabled ") + "></select> </td> ";
                divData += "            <td class='tblModalReceivableInvoice'><input type='text' id='txtTblModalReceivableInvoice" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID + "' class='form-control controlStyle' data-type='float' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' data-required='false' maxlength='6' placeholder='' disabled /> </td> ";
                //if (pDefaults.UnEditableCompanyName == "BOM") {
                //divData += "            <td class='tblModalReceivableReceiptNo'><input type='text' id='txtTblModalReceivableReceiptNo" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID + "' class='form-control controlStyle' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' data-required='false' placeholder='' /> </td> ";
                //divData += "            <td class='tblModalReceivableReceiptDate'><input type='text' id='txtTblModalReceivableReceiptDate" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID + "' class='form-control controlStyle datepicker-input input-sm' data-date-format='dd/mm/yyyy' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' data-required='false' placeholder='' /> </td> ";
                divData += "            <td class='tblModalReceivableNotes'><textarea type='text' id='txtTblModalReceivableNotes" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID + "' class='form-control controlStyle' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' data-required='false' placeholder=''> </textarea></td> ";
                //}

                divData += "            <td class='tblModalReceivableViewOrder " + (pIsInvoiceEdit ? "" : "hide") + "'><input type='text' id='txtTblModalReceivableViewOrder" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID + "' class='form-control controlStyle' data-type='number' onkeypress='CheckValueIsInteger(id);' onfocus='CheckValueIsInteger(id);' data-required='false' maxlength='3' value='' /> </td> ";
                divData += "        </tr> ";
            });
            divData += '            </tbody> ';
            divData += '        </table> ';
            divData += '    </div> ';
            divData += ' </section> ';
            $("#" + pDivName).append(divData);

            $.each(JSON.parse(data[0]), function (i, item) {
                debugger;
                //ReceivablePOrC_GetList(item.POrC, "slReceivablePOrC" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID);
                FillListFromObject(item.POrC, 1, "P/C", "slReceivablePOrC" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID, pPOrCData, null);
                if (IsMESCOCompany) {
                    $("#slReceivableCategory" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID).html($("#hReadyCategories").html());
                    $("#slReceivableCategory" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID).val(item.CategoryID == 0 ? "" : item.CategoryID);
                }
                GetListTaxTypeWithNameAndPercAttr(item.TaxTypeID, "/api/TaxeTypes/LoadAllWithWhereClause"
                    , "<--Select-->", "slReceivableTax" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID, "WHERE IsInactive=0 ORDER BY Name"
                    , function () {
                        $("#slReceivableDiscount" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID).html($("#slReceivableTax" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID).html());
                        $("#slReceivableDiscount" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID).val(item.DiscountTypeID == 0 ? "" : item.DiscountTypeID);
                        $("#slReceivableTax" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID + " option[IsDiscount='true']").addClass('hide');
                        $("#slReceivableDiscount" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID + " option[IsDiscount='false']").addClass('hide');
                    });
                ReceivableUOM_GetList(item.MeasurementID, "slReceivableUOM" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID);
                $("#txtTblModalReceivableQuantity" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID).val((item.Quantity == 0 || item.Quantity == undefined) && (item.SalePrice == 0 || item.SalePrice == undefined)/*to handle the case of item set to 0 and saved, so i prevent it from default*/ ? 1 : item.Quantity);
                $("#txtTblModalReceivableSalePrice" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID).val(item.SalePrice);
                $("#slReceivableBillTo" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.HouseBillID).val(item.HouseBillID == 0 ? "" : item.HouseBillID);

                $("#txtTblModalReceivableAmountWithoutVAT" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID).val(item.AmountWithoutVAT);
                $("#txtTblModalReceivableTaxPercentage" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID).val(item.TaxPercentage);
                $("#txtTblModalReceivableTaxAmount" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID).val(item.TaxAmount);
                $("#txtTblModalReceivableDiscountPercentage" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID).val(item.DiscountPercentage);
                $("#txtTblModalReceivableDiscountAmount" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID).val(item.DiscountAmount);

                $("#txtTblModalReceivableSaleAmount" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID).val(item.SaleAmount);
                $("#txtTblModalReceivableExchangeRate" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID).val(item.ExchangeRate);
                $("#txtTblModalReceivableInvoice" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID).val(item.InvoiceNumber == 0 ? "" : item.InvoiceNumber);
                //$("#txtTblModalReceivableReceiptNo" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID).val(item.ReceiptNo == 0 ? "" : item.ReceiptNo);

                /*$("#txtTblModalReceivableReceiptDate" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID).datepicker().on('changeDate'
                    , function () {
                        $(this).datepicker('hide');
                    });;*/
                //$("#txtTblModalReceivableReceiptDate" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID).val((Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReceiptDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.ReceiptDate)) : ""));
                $("#txtTblModalReceivableNotes" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID).val(item.Notes == 0 ? "" : item.Notes);
                $("#txtTblModalReceivableViewOrder" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID).val(item.ViewOrder == 0 ? "" : item.ViewOrder);
                //ReceivableCurrency_GetList(item.CurrencyID, "slReceivableCurrency" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID, null);
                //pCodeOrName: 1-Code, 2-Name, 3-CurrencyWithAttrs(ExchangeRate)
                FillListFromObject(item.CurrencyID, 3/*pCodeOrName*/, null, "slReceivableCurrency" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + item.ID, pCurData, null);
                debugger;
                if (pDefaults.UnEditableCompanyName == "UNF") {
                    //var HouseBillDef = $("#slReceivableBillTo" + item.ID).find("option[value='" + item.HouseBillID + "']");
                    $("#slReceivableBillTo" + item.ID).find("option[value='" + item.HouseBillID + "']").prop('selected', true);
                }
                if (pDefaults.UnEditableCompanyName == "ICS") {
                    debugger;
                    $("td.tblModalReceivableExchangeRate input").prop("disabled", true);
                }
                if (IsMESCOCompany && pOperationHeader_Global.QuotationID != 0) {
                    debugger;
                    $("td.tblModalReceivableSalePrice input").prop("disabled", true);
                }
            });
            FadePageCover(false);
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Sorry", "Please, try again. FillReceivablesModalTableControls in mainapp.master.js", "");
        }
    });

    $("#btn-SearchCharges").attr("onclick", "Receivables_MultiRowEdit();");
    $("#btnSelectChargesApply").attr("onclick", "CFS_Receivables_UpdateList(false, 0, false);");//parameters are(pSaveAndNew, pInvoiceID, pIsRemoveItems)
}

function Receivables_Row_CalculateReceivablesAmount(pRowID, pIsInsertChoice) {
    debugger;
    var rowQuantity = $("#txtTblModalReceivableQuantity" + pRowID).val();
    var rowSalePrice = $("#txtTblModalReceivableSalePrice" + pRowID).val();

    var decAmountWithoutVAT = 0;
    var decTaxAmount = 0; var decTaxPercentage = 0.0;
    var decDiscountAmount = 0; var decDiscountPercentage = 0.0;

    decAmountWithoutVAT = (Math.round((rowQuantity * rowSalePrice) * 100) / 100).toFixed(2);
    $("#txtTblModalReceivableAmountWithoutVAT" + pRowID).val(decAmountWithoutVAT);
    if (pDefaults.IsTaxOnItems && !pIsInsertChoice/*to not calc. tax in case of Gen from Payables*/) {
        decTaxPercentage = $("#slReceivableTax" + pRowID + " option:selected").attr("CurrentPercentage");
        decTaxAmount = (Math.round((decAmountWithoutVAT * decTaxPercentage / 100) * 100) / 100).toFixed(2);
        decDiscountPercentage = $("#slReceivableDiscount" + pRowID + " option:selected").attr("CurrentPercentage");
        decDiscountAmount = (Math.round((decAmountWithoutVAT * decDiscountPercentage / 100) * 100) / 100).toFixed(2);
    }
    $("#txtTblModalReceivableTaxPercentage" + pRowID).val(decTaxPercentage);
    $("#txtTblModalReceivableTaxAmount" + pRowID).val(decTaxAmount);
    $("#txtTblModalReceivableDiscountPercentage" + pRowID).val(decDiscountPercentage);
    $("#txtTblModalReceivableDiscountAmount" + pRowID).val(decDiscountAmount);
    $("#txtTblModalReceivableSaleAmount" + pRowID).val((Math.round(((parseFloat(decAmountWithoutVAT) + parseFloat(decTaxAmount) - parseFloat(decDiscountAmount))) * 100) / 100).toFixed(2));

    if (pIsInsertChoice) //incase of insert check and uncheck the checkbox to in GetSelectedIDs incase of insert
        Receivables_txtTblModalSaleAmount_Changed(pRowID, pIsInsertChoice);
}

function CFS_Receivables_UpdateList(pSaveandAddNew, pInvoiceID, pIsRemoveItems) { // if (pInvoiceID > 0) then this is  updating Invoice Items(called from invoices_update)
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
    var pCategoryList = "";
    if (IsMESCOCompany) {
        for (i = 0; i < ArrayOfIDs.length; i++) {
            let currentRowID = ArrayOfIDs[i];
            if ($("#slReceivableCategory" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#slReceivableCategory" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" || $("#slReceivableCategory" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == 0 || $("#slReceivableCategory" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == null) {
                swal("Sorry", "Please Select All Items Category");
                return;
            }
        }
    }


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
    var pReceiptNoList = "";
    var pReceiptDateList = "";
    var pNotesList = "";
    var pViewOrderList = "";
    var pOperationContainersAndPackagesIDList = "";
    var pHouseBill = "";
    var _IsZeroExchangeRate = false;
    if (pSelectedReceivablesIDsToUpdate != "") {
        var NumberOfSelectRows = ArrayOfIDs.length;
        for (i = 0; i < NumberOfSelectRows; i++) {
            var currentRowID = ArrayOfIDs[i];
            if ($("#txtTblModalReceivableExchangeRate" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableExchangeRate" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" || parseFloat($("#txtTblModalReceivableExchangeRate" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val()) == 0
                || (parseFloat($("#txtTblModalReceivableExchangeRate" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val()) == 1 && pDefaults.CurrencyID != ($("#slReceivableCurrency" + currentRowID).val())))
                _IsZeroExchangeRate = true;

            pPOrCList += ((pPOrCList == "") ? "" : ",") + ($("#slReceivablePOrC" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#slReceivablePOrC" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#slReceivablePOrC" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pUOMList += ((pUOMList == "") ? "" : ",") + ($("#slReceivableUOM" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#slReceivableUOM" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#slReceivableUOM" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pQuantityList += ((pQuantityList == "") ? "" : ",") + ($("#txtTblModalReceivableQuantity" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableQuantity" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableQuantity" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pSalePriceList += ((pSalePriceList == "") ? "" : ",") + ($("#txtTblModalReceivableSalePrice" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableSalePrice" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableSalePrice" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());

            if (IsMESCOCompany) {
                pCategoryList += ((pCategoryList == "") ? "" : ",") + ($("#slReceivableCategory" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#slReceivableCategory" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#slReceivableCategory" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            }

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
            //pReceiptNoList += ((pReceiptNoList == "") ? "" : ",") + ($("#txtTblModalReceivableReceiptNo" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableReceiptNo" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableReceiptNo" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            //pReceiptDateList += ((pReceiptDateList == "") ? "" : ",") + ($("#txtTblModalReceivableReceiptDate" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableReceiptDate" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTblModalReceivableReceiptDate" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val().trim()));
            pNotesList += ((pNotesList == "") ? "" : ",") + ($("#txtTblModalReceivableNotes" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableNotes" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableNotes" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
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
                    , "pReceiptNoList": "NA"
                    , "pReceiptDateList": "NA"
                    , "pNotesList": pNotesList
                    , "pViewOrderList": pViewOrderList
                    , "pInvoiceID": 0
                    , "pOperationContainersAndPackagesIDList": "NA"
                    , "pHouseBillList": "NA"
                    , "pCategoryList": pCategoryList
                }
                , pSaveandAddNew
                , "SelectChargesModal" //pModalID
                , function () { /*Receivables_GetAvailableCharges();*/ }
                , function () {
                    Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val(), $("#hContainerID").val(), $("#hHouseBillID").val());
                });
        else
            swal(strSorry, "No available items to be updated.");
    }
}
function Receivables_txtTblModalCurrency_Changed(pRowID, pIsInvoiceEdit) {
    debugger;
    $("#txtTblModalReceivableExchangeRate" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + pRowID).val($("#slReceivableCurrency" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + pRowID + " option:selected").attr("MasterDataExchangeRate"));
    if ($("#hDefaultCurrencyID").val() == $("#slReceivableCurrency" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + pRowID).val() || pDefaults.UnEditableCompanyName == "ICS")
        $("#txtTblModalReceivableExchangeRate" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + pRowID).attr("disabled", "disabled");
    else
        $("#txtTblModalReceivableExchangeRate" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + pRowID).removeAttr("disabled");
}




function SendBackToInvoices() {

    debugger;
    var houseNumber = $("#txtHouseNumberToSendBack").val().trim();

    if (!houseNumber) {
        swal("Error", "Please enter a House Number.");
        return;
    }


        swal({
            title: "Are you sure?",
            text: "Send house  " + houseNumber + " back to invoices?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Show!",
            closeOnConfirm: true
        },
            //callback function in case of confirm delete
            function () {
                FadePageCover(true);
                CallGETFunctionWithParameters("api/WH_CFS_ReleaseOrders/SendBackToInvoices", { pHouseNumber: houseNumber }, function (pData) {



                    if (pData == false) {
                        swal("Sorry", "Error Happened While Sending Back To Invoices");
                    } else {
                        swal("Success", "House number sent back to invoices successfully.");
                        $("#txtHouseNumberToSendBack").val(""); // clear the input
                        WH_CFS_Invoices_LoadWithPagingWithWhereClauseAndOrderBy(); // reload data if needed


                    }
                        FadePageCover(false);
                }, null);



            });





    //swal({
    //    title: "Are you sure?",
    //    text: "Send house  " + houseNumber + " back to invoices?",
    //    icon: "warning",
    //    buttons: true,
    //    dangerMode: true,
    //}).then((confirmed) => {
    //    if (confirmed) {
    //        CallGETFunctionWithParameters("api/WH_CFS_ReleaseOrders/SendBackToInvoices", { pHouseNumber: houseNumber }, function (pData) {
    //            if (pData === false) {
    //                swal("Sorry", "Error happened while sending back to invoices.");
    //            } else {
    //                swal("Success", "House number sent back to invoices successfully.");
    //                $("#txtHouseNumberToSendBack").val(""); // clear the input
    //                WH_CFS_Invoices_LoadWithPagingWithWhereClauseAndOrderBy(); // reload data if needed
    //            }
    //        });
    //    }
    //});
}




function SendMessageFromWhats() {
        debugger;

        var houseNumber = $("#txtHouseNumber").val().trim();
        if (houseNumber === "") {
            swal("Warning", "Please enter house number.");
            return;
        }

        CallGETFunctionWithParameters(
            "api/operations/AddUserDetails",
            { pHouseNumber: houseNumber },
            function (pData) { 
                if (pData.result == false) {
                //    swal("Sorry", "Can`d Insert Client Data");
                } else {
                    $("#txtUserName").val(pData.USerName)
                    $("#txtPhoneNumber").val(pData.UserPhone)
                    if (pDefaults.CompanyLocalName == "CPWORLD EGYPT")
                        $("#txtMessage").val(
                            `مرحبًا من CPWORLD EGYPT،
عزيزي العميل ${pData.USerName}،
نفيدكم بأنه تم إصدار فاتورة التخزين الخاصة بالبوليصة رقم (${houseNumber}).
يرجى الاطّلاع، مع خالص الشكر والتقدير.`
                        );
                    else
                        $("#txtMessage").val(
                            `مرحبًا من UNIFREIGHT GLOBAL LOGISTICS،
عزيزي العميل ${pData.USerName}،
نفيدكم بأنه تم إصدار فاتورة التخزين الخاصة بالبوليصة رقم (${houseNumber}).
يرجى الاطّلاع، مع خالص الشكر والتقدير.`
                        );

                }

            },
            null
        );
    }


function SendMessage() {
    CallGETFunctionWithParameters(
        "api/operations/CreationMessageToClient",
        {
            pPhoneNumber: $("#txtPhoneNumber").val(), pMessage: $("#txtMessage").val()
                },
        function (pData) {
         
            if (pData == false) 
                swal("Sorry", "Message not sent.");
             else 
            swal("Success", "Message sent successfully.");
        },
        null
    );
}