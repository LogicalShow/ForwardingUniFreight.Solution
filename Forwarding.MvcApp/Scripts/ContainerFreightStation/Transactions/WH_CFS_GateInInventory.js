//#region M A I N   F U N C T I O N S
var pHouseBillPackages;

var SelectedWarehouseID = 0;
var SelectedAreaID = 0;
var SelectedRowID = 0;
var SelectedRowLocationID = 0;
var SelectedWarehouseNoteID = 0;
var SelectedEmptyContainerID = 0;
var SelectedAdditionalLocations = 0;
function WH_CFS_GateInInventoryInit() {
    debugger;
    WH_CFS_GateInInventory_LoadWithPagingWithWhereClauseAndOrderBy();

    $("#hl-menu-ContainerFreightStationTransactions").parent().addClass("active");
    if (pDefaults.UnEditableCompanyName == "UNF") {
        $(".classShowForUNF").removeClass("hide");
    }
}

function WH_CFS_GateInInventory_LoadWithPagingWithWhereClauseAndOrderBy() {
    debugger;

    var pWhereClause = WH_CFS_GateInInventory_GetWhereClause();
    strLoadWithPagingFunctionName = "/api/WH_CFS_GateInInventory/WH_CFS_GateInInventory_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";
    var pOrderBy = " OperationNumber DESC, ContainerNumber DESC, HouseNumber DESC ";
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pPageSize = $('#select-page-size').val();
    var pControllerParameters = { pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }

    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
        , function (pData) {
            if (pData[0]) {
                WH_CFS_GateInInventory_BindTableRows(JSON.parse(pData[2]));
            }
            else {
                swal("Sorry", "Connection failed, please try again.");
            }
        });
    HighlightText("#tblWH_CFS_GateInInventory>tbody>tr", $("#txt-Search").val().trim());
}

function WH_CFS_GateInInventory_GetWhereClause() {
    debugger;
    var pWhereClause = "WHERE InventoryID NOT IN (SELECT WH_ReleaseOrders.InventoryID FROM WH_ReleaseOrders )\n";

    if ($("#txt-Search").val().trim() != "") {
        // Search bar: search by House Number
        var s = $("#txt-Search").val().trim();
        pWhereClause += "AND HouseNumber = N'" + s + "'\n";
    //    pWhereClause += "AND HouseNumber Like N'%" + s + "%'\n";
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

function WH_CFS_GateInInventory_BindTableRows(pTableRows) {
    debugger;
    //$("#hl-menu-DASCreditNotes").parent().addClass("active");
    ClearAllTableRows("tblWH_CFS_GateInInventory");

    var printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    $.each(pTableRows, function (i, item) {
        debugger;
        AppendRowtoTable("tblWH_CFS_GateInInventory",
        ("<tr ID='" + item.InventoryID + "' ondblclick='WH_CFS_GateInInventory_EditByDblClick(" + item.InventoryID + "," + item.HouseBillID + ");'>"

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
                    + "<td class='BookingPartyID hide'>" + item.BookingPartyID + "</td>"


        + "</tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblWH_CFS_GateInInventory", "ID", "cb-CheckAll");
    CheckAllCheckbox("HeaderDeleteInquiryID");
    HighlightText("#tblWH_CFS_GateInInventory>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function WH_CFS_GateInInventory_EditByDblClick(SelectedInventoryID, SelectedHouseBillID) {
    debugger;
    $('.BkForUNF').css('background-image', 'none');

    ClearAll("#ModelWH_CFS_GateInInventory");
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();

    if (SelectedHouseBillID == 0) { // FCL Row
        $("#dvEmptyContainer").removeClass("hide");
        $("#dvHouseBill").addClass("hide");
        // $("#ModelHeader").html("FCL Gate In");
    }
    else {
        $("#dvEmptyContainer").addClass("hide");
        $("#dvHouseBill").removeClass("hide");
        //$("#ModelHeader").html("Consol Gate In");
    }

    jQuery("#ModelWH_CFS_GateInInventory").modal("show");


    if (pDefaults.UnEditableCompanyName == "UNF" && $("#hLoggedUserID").val() != 338)  {
        $("#txtEntryDate").attr("disabled", true);

    }

    var pParametersWithValues = { pInventoryID: SelectedInventoryID };
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/WH_CFS_GateInInventory/WH_CFS_GateInInventory_LoadItem", pParametersWithValues
        , function (pData) {
            if (pData[0]) {
                
                var pGateIn = JSON.parse(pData[1]);
                pHouseBillPackages = JSON.parse(pData[9]);
                var ISHold = pData[12];
                if (pDefaults.UnEditableCompanyName == "UNF") {
                    var RoadNumberWH = JSON.parse(pData[10]);
                    var vwRouting = JSON.parse(pData[11])[0];
                } 
                debugger;
                if (pDefaults.UnEditableCompanyName == "MES")
                {

                    var RoadNumberWH = JSON.parse(pData[10]);

                    $("#txtRoadNumber").parent().addClass("hide");
                    $("#txtRoadNumberWH").parent().removeClass("hide");
                    $("#txtRoadNumberWH").val(RoadNumberWH == "" ? "" : RoadNumberWH);

                }



                $("#hInventoryID").val(pGateIn.InventoryID);
                $("#hOperationID").val(pGateIn.OperationID);
                $("#hContainerID").val(pGateIn.ContainerID);
                $("#hHouseBillID").val(pGateIn.HouseBillID);
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
                $("#txtOtherRemarks").val(pGateIn.OtherRemarks == 0 ? "" : pGateIn.OtherRemarks);

                if (pDefaults.UnEditableCompanyName == "UNF") {
                    $("#txtRoadNumberWH").val(RoadNumberWH == "" ? "" : RoadNumberWH);
                    $("#txtVesselName").val(vwRouting.VesselName == "" ? "" : vwRouting.VesselName);
                    $("#txtATAPOD").val((Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(vwRouting.ActualArrival)) < 1 ? "UnSpecified" : ConvertDateFormat(GetDateWithFormatMDY(vwRouting.ActualArrival))));
                }

                $("#cbIsHasDamage").prop('checked', pGateIn.HasDamage);
                $("#txtDamageDescription").val(pGateIn.DamageDescription == 0 ? "" : pGateIn.DamageDescription);

                $("#txtCustomsSealNumber").val(pGateIn.CustomsSealNumber == 0 ? "" : pGateIn.CustomsSealNumber);
                $("#txtCustomsCertificateNumber").val(pGateIn.CustomsCertificateNumber == 0 ? "" : pGateIn.CustomsCertificateNumber);
                $("#txtCustomsFeesAmount").val(pGateIn.CustomsFeesAmount == 0 ? "" : pGateIn.CustomsFeesAmount);
                $("#txtCustomsFeesVAT").val(pGateIn.CustomsFeesVAT == 0 ? "" : pGateIn.CustomsFeesVAT);
                $("#txtCustomsFeesTotal").val(pGateIn.CustomsFeesTotal == 0 ? "" : pGateIn.CustomsFeesTotal);
                $("#txtCustomBrokerName").val(pGateIn.CustomsBrokerName == "" ? "" : pGateIn.CustomsBrokerName);
                $("#txtPermissionNumber").val(pGateIn.PermissionNumber == 0 ? "" : pGateIn.PermissionNumber); 
                $("#txtCertificationNumber").val(pGateIn.CertificationNumber == 0 ? "" : pGateIn.CertificationNumber); 

                $("#txtMakingDate").val((Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pGateIn.MarkingDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pGateIn.MarkingDate))));

                $("#txtEntryDate").val((Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pGateIn.EntryDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pGateIn.EntryDate))));
                $("#txtStorageEndDate").val((Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pGateIn.StorageEndDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pGateIn.StorageEndDate))));

                if (pDefaults.UnEditableCompanyName == "UNF") {
                    $("#txtCustomBrokerID").val(pGateIn.CustomsBrokerID == "" ? "" : pGateIn.CustomsBrokerID);
                    $("#cbIsWithMarking").prop('checked', pGateIn.WithMarking);
                    $("#cbIsWithoutMarking").prop('checked', pGateIn.WithoutMarking);

                    if (ISHold =="True") {
                    
                        $('.BkForUNF').css({
                            'background-image': 'url("./Content/Images/Hold.jpg")',
                            'background-size': '25%',
                            'background-position': 'top',
                            'background-repeat': 'no-repeat',
                            'padding': '20px'
                        });
                    } 
                }

                if (pGateIn.IsIMO) {
                    $("#IMOLabel").parent().removeClass("hide");
                } else {
                    $("#IMOLabel").parent().addClass("hide");
                }
                FillListFromObject(null, 2, "Select Warehouse", "slWarehouseID", pData[2], null);
                FillListFromObject(null, 2, "Select Area", "slAreaID", pData[3], null);
                FillListFromObject(null, 2, "Select Row", "slRowID", pData[4], null);
                FillListFromObject(null, 1, "Select Location", "slRowLocationID", pData[5], null);
                FillListFromObject(null, 2, "Select Storing Note", "slWarehouseNoteID", pData[6], null);
                FillListFromObject(null, 2, "Select Container Type", "slContainerTypeID", pData[7], null);
                FillListFromObject(null, 11, "Select Empty Container", "slEmptyContainerID", pData[8], null);

                SelectedWarehouseID = pGateIn.WarehouseID;
                SelectedAreaID = pGateIn.AreaID;
                SelectedRowID = pGateIn.RowID;
                SelectedRowLocationID = pGateIn.RowLocationID;
                SelectedWarehouseNoteID = pGateIn.WarehouseNoteID;
                SelectedEmptyContainerID = pGateIn.EmptyContainerID;
                if (pDefaults.UnEditableCompanyName == "UNF") {
                    SelectedAdditionalLocations = pGateIn.AdditionalLocations;

                }

                FadePageCover(false);
            }
            else {
                swal("Sorry", "Connection failed, please try again.");
            }
        }
        , function () {
            debugger;

            $("#slWarehouseID").val(SelectedWarehouseID == 0 ? "" : SelectedWarehouseID);
            // $("#slAreaID").val(SelectedAreaID == 0 ? "" : SelectedAreaID);
            GetWarehouseAreas();

            if (SelectedAreaID == 0) {
                // GetWarehouseAreas();
                $("#slAreaID").val("");
            }
            else {
                $("#slAreaID").val(SelectedAreaID);
            }
            //$("#slRowID").val(SelectedRowID == 0 ? "" : SelectedRowID);
            GetAreaRows();
            if (SelectedRowID == 0) {
                $("#slRowID").val("");
            }
            else {
                $("#slRowID").val(SelectedRowID);
            }
            //$("#slRowLocationID").val(SelectedRowLocationID == 0 ? "" : SelectedRowLocationID);
            GetRowLocations();
            if (SelectedRowLocationID == 0) {

                $("#slRowLocationID").val("");
            }
            else {
                $("#slRowLocationID").val(SelectedRowLocationID);
            }
            if (pDefaults.UnEditableCompanyName == "UNF") {
                SetAdditionalLocations();
                $("#slAdditionalLocationsID").val(SelectedAdditionalLocations.split(",")).trigger("change");
            }

            $("#slWarehouseNoteID").val(SelectedWarehouseNoteID == 0 ? "" : SelectedWarehouseNoteID);
            $("#slEmptyContainerID").val(SelectedEmptyContainerID == 0 ? "" : SelectedEmptyContainerID);

            // setTimeout(function () {
            HouseBillPackagesDetails_BindTableRows(pHouseBillPackages);
            //}, 50);

        });
}

function WH_CFS_GateInInventory_GetMissingFields() {
    debugger;
    var strMissingFields = "";// i am sure there is at least 1 missing field isa
    var fieldCount = 0;
    //BasicData Tab

    if ($("#slWarehouseID").val() == 0)
        strMissingFields += ++fieldCount + " - Warehouse.\n";
    if ($("#slAreaID").val() == 0)
        strMissingFields += ++fieldCount + " - Area.\n";
    if ($("#slRowID").val() == 0)
        strMissingFields += ++fieldCount + " - Row.\n";
    if ($("#slRowLocationID").val() == 0)
        strMissingFields += ++fieldCount + " - Row Location.\n";
    if ($("#txtEntryDate").val().toString().trim() == '')
        strMissingFields += ++fieldCount + " - Entry Date.\n";
    return strMissingFields;
}

function WH_CFS_GateInInventory_Update() {
    debugger;
    if (!ValidateForm("form", "ModelWH_CFS_GateInInventory")) {
        strMissingFields = WH_CFS_GateInInventory_GetMissingFields();
        swal("You are missing:", strMissingFields);
    }
    else {
        if ($("#cbIsHasDamage").prop('checked') && $("#txtDamageDescription").val() == '') {
            swal("You are missing:", "Damage Description");
        }
        else {
            //start Inserting Procedure
            FadePageCover(true);

            var pParametersWithValues = {
                pInventoryID: $("#hInventoryID").val(),
                pOperationID: $("#hOperationID").val(),
                pContainerID: $("#hContainerID").val(),
                pHouseBillID: $("#hHouseBillID").val(),
                pBookingPartyID: $("#hBookingPartyID").val(),
                pWarehouseID: $("#slWarehouseID").val(),
                pAreaID: $("#slAreaID").val(),
                pRowID: $("#slRowID").val(),
                pRowLocationID: $("#slRowLocationID").val(),
                pWarehouseNoteID: $("#slWarehouseNoteID").val(),
                pEmptyContainerID: $("#slEmptyContainerID").val() == null ? "" : $("#slEmptyContainerID").val(),
                pEntryDate: ConvertDateFormat($("#txtEntryDate").val()),
                pStorageEndDate: ConvertDateFormat($("#txtStorageEndDate").val()),
                pOtherRemarks: $("#txtOtherRemarks").val(),
                pHasDamage: $("#cbIsHasDamage").prop('checked'),
                pDamageDescription: $("#txtDamageDescription").val(),
                pHouseBillPackages: JSON.stringify(CollectHouseBillPackagesDetails()),
                pCustomsSealNumber: $("#txtCustomsSealNumber").val(),
                pCustomsCertificateNumber: $("#txtCustomsCertificateNumber").val(),
                pCustomsFeesAmount: $("#txtCustomsFeesAmount").val(),
                pCustomsFeesVAT: $("#txtCustomsFeesVAT").val(),
                pCustomsFeesTotal: $("#txtCustomsFeesTotal").val(),
                pCustomsBrokerName: $("#txtCustomBrokerName").val(),
                pPermissionNumber: $("#txtPermissionNumber").val(),
                pMakingDate: ConvertDateFormat($("#txtMakingDate").val()),
                pCertificationNumber: $("#txtCertificationNumber").val(),

                //LoadWithPaging Parameters
                pWhereClause: WH_CFS_GateInInventory_GetWhereClause(),
                pPageSize: $('#select-page-size').val(),
                pPageNumber: 1,
                pOrderBy: " OperationNumber DESC, ContainerNumber DESC, HouseNumber DESC ",
                pCustomBrokerID: $("#txtCustomBrokerID").val() == "" ? "0" : $("#txtCustomBrokerID").val(),
                pAdditionalLocations: $("#slAdditionalLocationsID").val() == null || $("#slAdditionalLocationsID").val() == "" ? "0" : $("#slAdditionalLocationsID").val().toString(),
                pWithMarking: $("#cbIsWithMarking").prop('checked'),
                pWithoutMarking: $("#cbIsWithoutMarking").prop('checked')
            };
            CallPOSTFunctionWithParameters("/api/WH_CFS_GateInInventory/WH_CFS_GateInInventory_Update", pParametersWithValues
                , function (pData) {
                    if (pData[0]) {
                        $("#hInventoryID").val(pData[1]); //

                        WH_CFS_GateInInventory_BindTableRows(JSON.parse(pData[2])); //returned rows

                        $("#spn-total-count").text(pData[3]); //_RowCount

                        swal("Success", "Saved successfully.");

                        //EnableDisableNotesCnts(true);
                    }
                    else
                        swal("Sorry", "Connection failed, please try again.");
                    FadePageCover(false);
                }
            , null);
        }
    }
}

function WH_CFS_GateInInventory_Print() {
    debugger;
    if ($("#hInventoryID").val() > 0) {


        var arr_Keys = new Array();
        var arr_Values = new Array();
        arr_Keys.push("@WhereClause");
        arr_Values.push(" Where Inv.ID = " + $("#hInventoryID").val());

        arr_Keys.push("ReportTitle");        
        arr_Values.push("");

        var pParametersWithValues =
        {
            arr_Keys: arr_Keys
            , arr_Values: arr_Values
            , pTitle: "Inventory"
            , pReportName: "GateInCard"
        };
        var win = window.open("", "_blank");
        var url = '/ReportMainClass/PrintPS_Payment?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

        win.location = url;

        setTimeout(function () {
            GetReleaseNumber();
        }, 1500);
    }
    else {
        $("#btnPrint").attr("disabled", false);
        swal("Sorry", "Can't print ,Please save first.");
    }
}

//#endregion

//#region O T H E R   F U N C T I O N S

function GetWarehouseAreas() {
    debugger;

    // $('#slRowID').val("") ;
    // $('#slAreaID').val() == "";
    var pParametersWithValues =
        {
            pWarehouseID: $('#slWarehouseID').val() == ""  || $('#slWarehouseID').val() == null ? 0 : $('#slWarehouseID').val()
        }
    CallGETFunctionWithParameters("/api/WH_CFS_GateInInventory/GetWarehouseAreas", pParametersWithValues
          , function (pData) {
              if (pData[0]) {
                  FillListFromObject(SelectedAreaID, 2, "Select Area", "slAreaID", pData[1], function () { GetAreaRows(); })
              }
              else {
                  swal("Sorry", "Connection failed, please try again.");
              }
          }
          , null);
}

function GetAreaRows() {
    debugger;

    var pParametersWithValues =
        {
            pAreaID: $('#slAreaID').val() == "" ? 0 : $('#slAreaID').val()
        }
    CallGETFunctionWithParameters("/api/WH_CFS_GateInInventory/GetAreaRows", pParametersWithValues
          , function (pData) {
              if (pData[0]) {
                  FillListFromObject(SelectedRowID, 2, "Select Row", "slRowID", pData[1], function () { GetRowLocations(); })
              }
              else {
                  swal("Sorry", "Connection failed, please try again.");
              }
          }
          , null);
}

function GetRowLocations() {
    debugger;

    var pParametersWithValues =
        {
            pRowID: $('#slRowID').val() == "" ? 0 : $('#slRowID').val()
        }
    CallGETFunctionWithParameters("/api/WH_CFS_GateInInventory/GetRowLocations", pParametersWithValues
          , function (pData) {
              if (pData[0]) {
                  FillListFromObject(SelectedRowLocationID, 1, "Select Location", "slRowLocationID", pData[1], null)
                  //$(".slRowLocationIDSelect").html($("#slRowLocationID").html());
                  HouseBillPackagesDetails_BindTableRows(pHouseBillPackages);
              }
              else {
                  swal("Sorry", "Connection failed, please try again.");
              }
          }
          , null, false);
}

function WH_CFS_GateInInventory_CalculateStorage() {
    debugger;
    //alert("Calc here");
    if (($("#slWarehouseID").val().toString().trim() != '') & ($("#txtEntryDate").val().toString().trim() != '') & ($("#txtStorageEndDate").val().toString().trim() != '')) {

        if (Date.prototype.compareDates(ConvertDateFormat($("#txtEntryDate").val()), ConvertDateFormat($("#txtStorageEndDate").val())) >= 1) {

            var StorageAmount = 0.0;
            var pParametersWithValues =
                {
                    pInventoryID: $('#hInventoryID').val(),
                    pStorageEndDate: $("#txtStorageEndDate").val()
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

        if ($("#slWarehouseID").val() == 0)
            strMissingFields += ++fieldCount + " - Warehouse.\n";
        if ($("#txtEntryDate").val().toString().trim() == '')
            strMissingFields += ++fieldCount + " - Entry Date.\n";
        if ($("#txtStorageEndDate").val().toString().trim() == '')
            strMissingFields += ++fieldCount + " - Storage End Date.\n";

        swal("You Are Missing For Calculation:", strMissingFields);
        //swal("Data Error", "Please Select Warehouse, Entry Date And Storage End Date First");
    }
}

//#endregion

//#region H O U S E B / L   P A C K A G E S   F U N C T I O N S
var PackagesDetailsNewRowCount = 0;

function HouseBillPackagesDetails_BindTableRows(pTableRows) {
    debugger;

    ClearAllTableRows("tblHouseBillPackagesDetails");

    $.each(pTableRows, function (i, item) {

        PackagesDetailsNewRowCount++;
        AppendRowtoTable("tblHouseBillPackagesDetails",

        ("<tr ID='row" + PackagesDetailsNewRowCount + "'>"
            + "<td class='ClsID hide'> <input type='text' value='" + item.ID + "'  id='txtID" + PackagesDetailsNewRowCount + "' class='form-control input-sm '  style='text-transform:uppercase' /> </td> "
            + "<td class='ClsOperationContainersAndPackageID hide'> <input type='text' value='" + item.OperationContainersAndPackageID + "'  id='txtOperationContainersAndPackageID" + PackagesDetailsNewRowCount + "' class='form-control input-sm '  style='text-transform:uppercase' /> </td> "
            + "<td class='ClsPackageTypeName'>" + item.PackageTypeName + "</td>"
            + "<td class='ClsQuantity'>" + item.Quantity + "</td>"
            + "<td class='ClsNetWeight'>" + item.NetWeight + "</td>"
            + "<td class='ClsVolume'>" + item.Volume + "</td>"
            + "<td class='ClsGrossWeight'>" + item.GrossWeight + "</td>"
            + "<td class='ClsRowLocationID'> <select id='slRowLocationID_PkgDts" + PackagesDetailsNewRowCount + "' class='form-control slRowLocationIDSelect'></select> </td> "
            + "<td class='ClsHasDamage'><input name='SpecificationRow' id='cbHasDamage" + PackagesDetailsNewRowCount + "' type='checkbox' " + (item.HasDamage == true ? " checked " : "") + " onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);'/></td>"

            + "<td class='ClsDamageDescription'> <input type='text' value='" + item.DamageDescription + "'  id='txtDamageDescription" + PackagesDetailsNewRowCount + "' class='form-control input-sm '  style='text-transform:uppercase' /> </td> "
            + "<td class='ClsRemarks'> <input type='text' value='" + item.Remarks + "'  id='txtRemarks" + PackagesDetailsNewRowCount + "' class='form-control input-sm '  style='text-transform:uppercase' /> </td> "

          + "</tr>"));
        $("#slRowLocationID_PkgDts" + PackagesDetailsNewRowCount).html($("#slRowLocationID").html());
        //var $options = $("#slRowLocationID_PkgDts > option").clone();
        //$("#slRowLocationID_PkgDts" + PackagesDetailsNewRowCount).append($options);
        $("#slRowLocationID_PkgDts" + PackagesDetailsNewRowCount).val((item.RowLocationID > 0 ? item.RowLocationID : ""));

    });

}

function CollectHouseBillPackagesDetails() {
    debugger;
    var array = new Array();
    var _currentHouseBillPackagesDetail = null;

    var table = document.getElementById("tblHouseBillPackagesDetails");
    for (var i = 1, row; row = table.rows[i]; i++) {

        _currentHouseBillPackagesDetail = new HouseBillPackagesDetailClass();
        _currentHouseBillPackagesDetail.ID = row.cells[0].children[0].value;
        _currentHouseBillPackagesDetail.OperationContainersAndPackageID = row.cells[1].children[0].value;
        _currentHouseBillPackagesDetail.RowLocationID = (row.cells[7].children[0].value == "" ? 0 : row.cells[7].children[0].value);
        _currentHouseBillPackagesDetail.HasDamage = row.cells[8].children[0].checked;
        _currentHouseBillPackagesDetail.DamageDescription = (row.cells[9].children[0].value == "" ? 0 : row.cells[9].children[0].value);
        _currentHouseBillPackagesDetail.Remarks = (row.cells[10].children[0].value == "" ? 0 : row.cells[10].children[0].value);

        array.push(_currentHouseBillPackagesDetail);
    }

    return array;
}

function HouseBillPackagesDetailClass() {
    debugger;

    this.ID = "";
    this.OperationContainersAndPackageID = "";
    this.RowLocationID = "";
    this.HasDamage = false;
    this.DamageDescription = "";
    this.Remarks = "";
    this.IsChanges = true;
}
//#endregion

function SetAdditionalLocations() {
    if ($("#slRowLocationID").val() == '') {
        $("#slAdditionalLocationsID").find('option').remove();
        return;
    }
    $("#slAdditionalLocationsID").html($("#slRowLocationID").html());
    $("#slAdditionalLocationsID").find('option:first').remove();
    $("#slAdditionalLocationsID").find('option[value=' + $("#slRowLocationID").val() + ']').remove();
    $("#slAdditionalLocationsID").select2();
}