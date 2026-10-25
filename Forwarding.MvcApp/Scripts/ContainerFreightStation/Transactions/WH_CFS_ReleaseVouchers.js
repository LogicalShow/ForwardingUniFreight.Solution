//#region M A I N   F U N C T I O N S
var SelectedHouseBillID = 0

function WH_CFS_ReleaseVouchersInit() {
    debugger;
    WH_CFS_ReleaseVouchers_LoadWithPagingWithWhereClauseAndOrderBy();
    if (IsMESCOCompany)
        $(".showForMESCO").removeClass("hide");
    $("#hl-menu-ContainerFreightStationTransactions").parent().addClass("active");

}

function WH_CFS_ReleaseVouchers_LoadWithPagingWithWhereClauseAndOrderBy() {
    debugger;
 
    var pWhereClause = WH_CFS_ReleaseVouchers_GetWhereClause();
    strLoadWithPagingFunctionName = "/api/WH_CFS_ReleaseVouchers/WH_CFS_ReleaseVouchers_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";
    var pOrderBy = " OperationNumber DESC, ContainerNumber DESC, HouseNumber DESC ";
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pPageSize = $('#select-page-size').val();
    var pControllerParameters = { pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }

    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
        , function (pData) {
            if (pData[0]) {
                WH_CFS_ReleaseVouchers_BindTableRows(JSON.parse(pData[2]));
                if (pDefaults.UnEditableCompanyName == "UNF") {
                    $("#cbConfirmRelease").parent().parent().removeClass("hide");
                }
            }
            else {
                swal("Sorry", "Connection failed, please try again.");
            }
        });
    HighlightText("#tblWH_CFS_ReleaseOrders>tbody>tr", $("#txt-Search").val().trim());
}

function WH_CFS_ReleaseVouchers_BindTableRows(pTableRows) {
    debugger;
    //$("#hl-menu-DASCreditNotes").parent().addClass("active");
    ClearAllTableRows("tblWH_CFS_ReleaseOrders");

    var printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    $.each(pTableRows, function (i, item) {
        debugger;
        AppendRowtoTable("tblWH_CFS_ReleaseOrders",
            ("<tr ID='" + item.InventoryID + "' ondblclick='WH_CFS_ReleaseVouchers_EditByDblClick(" + item.InventoryID + "," + item.HouseBillID + ");'>"

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
                + "<td class='ReleaseOrderID hide'>" + item.ConsigneeID + "</td>"
                + "</tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblWH_CFS_ReleaseOrders", "ID", "cb-CheckAll");
    CheckAllCheckbox("HeaderDeleteInquiryID");
    HighlightText("#tblWH_CFS_ReleaseOrders>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function WH_CFS_ReleaseVouchers_GetWhereClause() {
    debugger;
    var pWhereClause = "WHERE 1=1\n";

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
    }

    return pWhereClause;
}

function WH_CFS_ReleaseVouchers_EditByDblClick(SelectedInventoryID, HouseBillID) {
    debugger;

    ClearAll("#ModelWH_CFS_ReleaseOrders");
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();


    SelectedHouseBillID = HouseBillID

    if (SelectedHouseBillID == 0) { // FCL Row
        $("#dvEmptyContainer").removeClass("hide");
        $("#dvHouseBill").addClass("hide");
        // $("#ModelHeader").html("FCL Gate In");
    }
    else {
        $("#dvEmptyContainer").addClass("hide");
        $("#dvHouseBill").removeClass("hide");
        //$("#ModelHeader").html("Consol Gate In");
        if (pDefaults.UnEditableCompanyName == "MES")
            $(".showForMESCO").removeClass("hide");
    }

    jQuery("#ModelWH_CFS_ReleaseOrders").modal("show");

    var pParametersWithValues = { pInventoryID: SelectedInventoryID };
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/WH_CFS_ReleaseVouchers/WH_CFS_ReleaseVouchers_LoadItem", pParametersWithValues
        , function (pData) {
            if (pData[0]) {
                var pGateIn = JSON.parse(pData[1]);
                var pReleaseVouchersDetails = JSON.parse(pData[4]);

                debugger;

                $("#hInventoryID").val(pGateIn.InventoryID);
                $("#hOperationID").val(pGateIn.OperationID);
                $("#hContainerID").val(pGateIn.ContainerID);
                $("#hHouseBillID").val(pGateIn.HouseBillID);
                $("#hBookingPartyID").val(pGateIn.BookingPartyID);
                $("#hReleaseOrderID").val(pGateIn.ReleaseOrderID);
                $("#hReleaseNumber").val(pGateIn.ReleaseNumber);
                $("#hServerDate").val(pGateIn.ServerDate);
                $("#hReleasingDate").val(pGateIn.ReleasingDate);

                $("#txtOperationNumber").val(pGateIn.OperationNumber);
                $("#txtMasterBL").val(pGateIn.MasterBL == 0 ? "" : pGateIn.MasterBL);
                $("#txtContainerNumber").val(pGateIn.ContainerNumber);
                $("#txtHouseNumber").val(pGateIn.HouseNumber == 0 ? "" : pGateIn.HouseNumber);
                $("#txtConsignee").val(pGateIn.Consignee == 0 ? "" : pGateIn.Consignee);
                $("#txtGrossWeight").val(pGateIn.GrossWeight);
                $("#txtNetWeight").val(pGateIn.NetWeight);
                $("#txtPackages").val(pGateIn.Packages == 0 ? "" : pGateIn.Packages);
                $("#txtDescriptionOfGoods").val(pGateIn.DescriptionOfGoods == 0 ? "" : pGateIn.DescriptionOfGoods);
                $("#txtContainerType").val(pGateIn.ContainerType == 0 ? "" : pGateIn.ContainerType);
                $("#txtBookingParty").val(pGateIn.BookingParty == 0 ? "" : pGateIn.BookingParty);
                $("#txtStorageLocation").val(pGateIn.StorageLocation == 0 ? "" : pGateIn.StorageLocation);

                $("#txtEntryDate").val((Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pGateIn.EntryDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pGateIn.EntryDate))));
                $("#txtStorageEndDate").val((Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pGateIn.StorageEndDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pGateIn.StorageEndDate))));

                $("#txtReleasingDate").val((Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pGateIn.ReleasingDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pGateIn.ReleasingDate))));
                $("#txtReleaseNumber").val(pGateIn.ReleaseNumber == 0 ? "" : pGateIn.ReleaseNumber);
                $("#txtCouponNumber").val(pGateIn.CouponNumber == 0 ? "" : pGateIn.CouponNumber);
                $("#txtCertificationNumber").val(pGateIn.CertificationNumber == 0 ? "" : pGateIn.CertificationNumber);
                $("#txtRemarks").val(pGateIn.Remarks == 0 ? "" : pGateIn.Remarks);
                if (pReleaseVouchersDetails != null) {
                    $("#txtCarNumber").val(pReleaseVouchersDetails.CarNumber == 0 ? "" : pReleaseVouchersDetails.CarNumber);
                    $("#txtDriverLicense").val(pReleaseVouchersDetails.DriverLicenseNumber == 0 ? "" : pReleaseVouchersDetails.DriverLicenseNumber);
                    $("#txtDriverName").val(pReleaseVouchersDetails.DriverName == 0 ? "" : pReleaseVouchersDetails.DriverName);
                    $("#txtNationalID").val(pReleaseVouchersDetails.NationalID == 0 ? "" : pReleaseVouchersDetails.NationalID);
                    $("#txtTicketNumber").val(pReleaseVouchersDetails.TicketNumber == 0 ? "" : pReleaseVouchersDetails.TicketNumber);
                    $("#txtCertificationNumberDetails").val(pReleaseVouchersDetails.CertificationNumber == 0 ? "" : pReleaseVouchersDetails.CertificationNumber);
                    $("#txtCertificationDate").val((Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pReleaseVouchersDetails.CertificationDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatDMY(pReleaseVouchersDetails.CertificationDate))));
                }



                //if (pGateIn.CanRelease) {
                //    $("#btnSave").removeAttr("disabled");
                //}
                //else {
                //    $("#btnSave").attr("disabled", "disabled");
                //}

                if (pGateIn.ReleaseOrderID == 0) {
                    $("#btnPrint").attr("disabled", "disabled");
                    $("#AddReleaseNotes").attr("disabled", true);
                    $("#DeleteReleaseNote").attr("disabled", true);

                    $("#btnSave").attr("onclick", "WH_CFS_ReleaseOrders_Insert();");
                }
                else {
                    $("#btnPrint").removeAttr("disabled");
                    $("#btn-AddReleaseNotes").removeAttr("disabled");
                    $("#btn-DeleteReleaseNote").removeAttr("disabled");

                    $("#btnSave").attr("onclick", "WH_CFS_ReleaseOrders_Update();");
                }

                //if (Date.prototype.compareDates(ConvertDateFormat($("#txtReleasingDate").val()), ConvertDateFormat($("#hServerDate").val())) >= 1) {
                //    $("#btn-Print").removeAttr("disabled");
                //}
                //else
                //{
                //    $("#btnPrint").attr("disabled", "disabled");
                //}

                //ReleaseOrderNotes_BindTableRows(JSON.parse(pData[2]));

                //FillListFromObject(null, 2, "Select Note", "slReleaseNotes", pData[3], null);

                //Invoices_LoadAll($("#hOperationID").val(), $("#hContainerID").val());

                FadePageCover(false);
            }
            else {
                swal("Sorry", "Connection failed, please try again.");
            }
        }
        , null);
}



function PrintReleaseVoucher() {
    debugger;

    WH_CFS_ReleaseVouchersDetails_Insert()

    var arr_Keys = new Array();
    var arr_Values = new Array();
    arr_Keys.push("ID");
    arr_Values.push(SelectedHouseBillID);




    var pParametersWithValues =
    {
        arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: "ReleaseVoucher"
        , pReportName: "ReleaseVoucher"
    };
    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"'
        + '&arr_Keys=' + pParametersWithValues.arr_Keys + ''
        + '&arr_Values=' + pParametersWithValues.arr_Values + ''
        + '&pReportName=' + pParametersWithValues.pReportName + '';

    win.location = url;

    var pParametersWithValuesPrint = {

        pHouseBillID: $("#hHouseBillID").val(),


    };
    CallPOSTFunctionWithParameters("/api/WH_CFS_ReleaseVouchers/WH_CFS_ReleaseVouchersDetails_InsertPrint", pParametersWithValuesPrint
        , function (pData) {
            if (pData[0]) {
                jQuery("#ModelWH_CFS_ReleaseOrders").modal("hide");

                WH_CFS_ReleaseVouchers_LoadWithPagingWithWhereClauseAndOrderBy();
            }

            else
                swal("Sorry", "Connection failed, please try again.");
            FadePageCover(false);
        }
        , null);
}




function WH_CFS_ReleaseVouchersDetails_Insert() {
    debugger;
  

            FadePageCover(true);

    var pParametersWithValues = {
      
                pHouseBillID: $("#hHouseBillID").val(),
                pCarNumber: $("#txtCarNumber").val(),
                pDriverLicense: $("#txtDriverLicense").val(),
                pDriverName: $("#txtDriverName").val(),
                pNationalID: $("#txtNationalID").val(),
                pTicketNumber: $("#txtTicketNumber").val(),
                pCertificationNumber: $("#txtCertificationNumberDetails").val(),
                pCertificationDate: ConvertDateFormat($("#txtCertificationDate").val()),
  
            };
    CallPOSTFunctionWithParameters("/api/WH_CFS_ReleaseVouchers/WH_CFS_ReleaseVouchersDetails_Insert", pParametersWithValues
                , function (pData) {
                    if (pData[0]) {
                        
                        swal("Success", "Saved successfully.");
                        jQuery("#ModelWH_CFS_ReleaseOrders").modal("hide");
                        WH_CFS_ReleaseVouchers_LoadWithPagingWithWhereClauseAndOrderBy();

                    }

                    else
                        swal("Sorry", "Connection failed, please try again.");
                    FadePageCover(false);
                }
                , null);
}


function WH_CFS_ReleaseVouchersDetails_SendBack() {
    debugger;


    FadePageCover(true);

    var pParametersWithValuesPrint = {

        pHouseNumber: $("#txtHouseNumberToSendBack").val(),


    };
    CallPOSTFunctionWithParameters("/api/WH_CFS_ReleaseVouchers/WH_CFS_ReleaseVouchersDetails_SendBack", pParametersWithValuesPrint
        , function (pData) {
            if (pData[0] && pData[1] > 0) {

                WH_CFS_ReleaseVouchers_BindTableRows(JSON.parse(pData[2]));
            }

            debugger;

            if (pData[1] == 0) {

                swal("Sorry", "Make Sure From House Number");
                WH_CFS_ReleaseVouchers_LoadWithPagingWithWhereClauseAndOrderBy();

            }

            else
                swal("Sorry", "Connection failed, please try again.");
            FadePageCover(false);
        }
        , null);
}