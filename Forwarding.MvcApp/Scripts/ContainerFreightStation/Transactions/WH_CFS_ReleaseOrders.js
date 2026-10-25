//#region M A I N   F U N C T I O N S
var SelectedHouseBillID = 0

function WH_CFS_ReleaseOrdersInit() {
    debugger;
    WH_CFS_ReleaseOrders_LoadWithPagingWithWhereClauseAndOrderBy();

    $("#hl-menu-ContainerFreightStationTransactions").parent().addClass("active");

}

function WH_CFS_ReleaseOrders_LoadWithPagingWithWhereClauseAndOrderBy() {
    debugger;

    var pWhereClause = WH_CFS_ReleaseOrders_GetWhereClause();
    strLoadWithPagingFunctionName = "/api/WH_CFS_ReleaseOrders/WH_CFS_ReleaseOrders_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";
    var pOrderBy = " OperationNumber DESC, ContainerNumber DESC, HouseNumber DESC ";
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pPageSize = $('#select-page-size').val();
    var pControllerParameters = { pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }

    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
        , function (pData) {
            if (pData[0]) {
                WH_CFS_ReleaseOrders_BindTableRows(JSON.parse(pData[2]));
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

function WH_CFS_ReleaseOrders_BindTableRows(pTableRows) {
    debugger;
    //$("#hl-menu-DASCreditNotes").parent().addClass("active");
    ClearAllTableRows("tblWH_CFS_ReleaseOrders");

    var printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    $.each(pTableRows, function (i, item) {
        debugger;
        AppendRowtoTable("tblWH_CFS_ReleaseOrders",
        ("<tr ID='" + item.InventoryID + "' ondblclick='WH_CFS_ReleaseOrders_EditByDblClick(" + item.InventoryID + "," + item.HouseBillID + ");'>"

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

function WH_CFS_ReleaseOrders_GetWhereClause() {
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

function WH_CFS_ReleaseOrders_EditByDblClick(SelectedInventoryID, HouseBillID) {
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
    CallGETFunctionWithParameters("/api/WH_CFS_ReleaseOrders/WH_CFS_ReleaseOrders_LoadItem", pParametersWithValues
        , function (pData) {
            if (pData[0]) {
                var pGateIn = JSON.parse(pData[1]);

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

                ReleaseOrderNotes_BindTableRows(JSON.parse(pData[2]));

                FillListFromObject(null, 2, "Select Note", "slReleaseNotes", pData[3], null);

                Invoices_LoadAll($("#hOperationID").val(), $("#hContainerID").val());

                FadePageCover(false);
            }
            else {
                swal("Sorry", "Connection failed, please try again.");
            }
        }
        , null);
}

function WH_CFS_ReleaseOrders_GetMissingFields() {
    debugger;
    var strMissingFields = "";// i am sure there is at least 1 missing field isa
    var fieldCount = 0;
    //BasicData Tab

    if ($("#txtReleasingDate").val().toString().trim() == '')
        strMissingFields += ++fieldCount + " - Release Date.\n";
    return strMissingFields;
}

function WH_CFS_ReleaseOrders_Insert() {
    debugger;
    if (!ValidateForm("form", "ModelWH_CFS_ReleaseOrders")) {
        strMissingFields = WH_CFS_ReleaseOrders_GetMissingFields();
        swal("You are missing:", strMissingFields);
        return;
    }
    else if (!ValidateReleaseDate())
    {
        return;
    }


    let invoices = $("#tblInvoices tbody tr");
    let invoicesStatus = [];

    if (invoices.length != 0) {
        let invoicesArr = invoices.toArray();
        for (let inv of invoicesArr) {
            invoicesStatus.push({
                paymentTerm: $(inv).children("td.InvoicePaymentTermID").text(),
                status: $(inv).children("td.InvoiceStatus").text()
            });
        }

        let unpaidInv = 0;
        for (let item of invoicesStatus) {
            if (item.status == "Paid" || item.status == "Cancelled by credit note") {
                continue;
            } else {
                if (item.paymentTerm == "CASH" || item.paymentTerm == 0 || item.paymentTerm == "") {
                    unpaidInv++;
                } else {
                    continue;
                }
            }
        }
        //let unpaidInv = invoicesStatus.filter(item => item.status != "Paid" ).length;

        let unPaidStorageInvCount = 0;
        $('#tblInvoices tbody tr').each(function (i) {
            var Status = $(this).find('.InvoiceStatus').text();
            var TypeName = $(this).find('.InvoiceTypeName').text();
            if (Status == 'UnPaid' && TypeName =='ALEX STORAGE TARRIF') {
                unPaidStorageInvCount++;
            }
        });
      
        if (pDefaults.UnEditableCompanyName == "UNF" && unPaidStorageInvCount != 0 ) {
            swal("Sorry", "You must pay all invoices to release");
            return;
        }
        else if (pDefaults.UnEditableCompanyName != "UNF" && pDefaults.UnEditableCompanyName != "KADI" && unpaidInv != 0) {
            swal("Sorry", "You must pay all invoices to release");
            return;
        } else {
            let invoicesIDElements = $("#tblInvoices tr td.InvoiceID input").toArray();
            //for (let inv of invoicesIDElements) {
            //    if (pDefaults.UnEditableCompanyName =="UNF"  && CheckInvoiceStatus(inv) == false) {
            //        swal("Sorry", "You must have a paid invoices to release");
            //        return;
            //    }
            //}
            FadePageCover(true);
            var pParametersWithValues = {
                pReleaseOrderID: 0,
                pInventoryID: $("#hInventoryID").val(),
                pReleaseNumber: $("#hReleaseNumber").val(),
                pReleasingDate: $("#txtReleasingDate").val(),// GetDateWithFormatyyyyMMdd($("#txtReleasingDate").val()),
                pCouponNumber: $("#txtCouponNumber").val(),
                pCertificationNumber: $("#txtCertificationNumber").val(),
                pRemarks: $("#txtRemarks").val(),

                //LoadWithPaging Parameters
                pWhereClause: WH_CFS_ReleaseOrders_GetWhereClause(),
                pPageSize: $('#select-page-size').val(),
                pPageNumber: 1,
                pOrderBy: " OperationNumber DESC, ContainerNumber DESC, HouseNumber DESC "
            };
            CallPOSTFunctionWithParameters("/api/WH_CFS_ReleaseOrders/WH_CFS_ReleaseOrders_Insert", pParametersWithValues
                , function (pData) {
                    if (pData[0]) {
                        debugger;
                        $("#hReleaseOrderID").val(pData[1]);

                        WH_CFS_ReleaseOrders_BindTableRows(JSON.parse(pData[2]));

                        $("#spn-total-count").text(pData[3]); //_RowCount

                        $("#btnSave").attr("onclick", "WH_CFS_ReleaseOrders_Update();");

                        $("#btn-AddReleaseNotes").removeAttr("disabled");
                        $("#btn-Print").removeAttr("disabled");

                        swal("Success", "Saved successfully.");
                    }
                    else {
                        swal("Sorry", "Connection failed, please try again.");
                        $("#btn-AddReleaseNotes").attr("disabled", "disabled");
                    }
                    FadePageCover(false);
                }
                , null);
        }

    } else if (invoices.length == 0) {
        swal("Sorry", "You must have a paid invoices to release");
        return;
    }


}

function WH_CFS_ReleaseOrders_Update() {
    debugger;
    // Front End Checking
    

    if (!ValidateForm("form", "ModelWH_CFS_ReleaseOrders")) {
        strMissingFields = WH_CFS_ReleaseOrders_GetMissingFields();
        swal("You are missing:", strMissingFields);
    }
    else if (!ValidateReleaseDate()) {
        return;
    }

    let invoices = $("#tblInvoices tbody tr");
    let invoicesStatus = [];
    if (invoices.length != 0) {
        let invoicesArr = invoices.toArray();
        for (let inv of invoicesArr) {
            invoicesStatus.push({
                paymentTerm: $(inv).children("td.InvoicePaymentTermID").text(),
                status: $(inv).children("td.InvoiceStatus").text()
            });
        }
        //let unpaidInv = invoicesStatus.filter(item => item != "Paid").length;
        let unpaidInv = 0;
        for (let item of invoicesStatus) {
            if (item.status == "Paid" || item.status == "Cancelled by credit note") {
                continue;
            } else {
                if (item.paymentTerm == "CASH" || item.paymentTerm == 0 || item.paymentTerm == "") {
                    unpaidInv++;
                } else {
                    continue;
                }
            }
        }

        let unPaidStorageInvCount = 0;
        $('#tblInvoices tbody tr').each(function (i) {
            var Status = $(this).find('.InvoiceStatus').text();
            var TypeName = $(this).find('.InvoiceTypeName').text();
            if (Status == 'UnPaid' && TypeName == 'ALEX STORAGE TARRIF') {
                unPaidStorageInvCount++;
            }
        });

        if (pDefaults.UnEditableCompanyName == "UNF" && unPaidStorageInvCount != 0) {
            swal("Sorry", "You must pay all invoices to release");
            return;
        }
        else if (pDefaults.UnEditableCompanyName != "UNF" && unpaidInv != 0) {
            swal("Sorry", "You must pay all invoices to release");
            return;
        } else {
            //let invoicesIDElements = $("#tblInvoices tr td.InvoiceID input").toArray();
            //for (let inv of invoicesIDElements) {
            //    if (CheckInvoiceStatus(inv) == false) {
            //        swal("Sorry", "You must have a paid invoices to release");
            //        return;
            //    }
            //}
            FadePageCover(true);
            var pParametersWithValues = {
                pReleaseOrderID: $("#hReleaseOrderID").val(),
                pInventoryID: $("#hInventoryID").val(),
                pReleaseNumber: $("#hReleaseNumber").val(),
                pReleasingDate: ConvertDateFormat($("#txtReleasingDate").val()),// GetDateWithFormatyyyyMMdd($("#txtReleasingDate").val()),
                pCouponNumber: $("#txtCouponNumber").val(),
                pCertificationNumber: $("#txtCertificationNumber").val(),
                pRemarks: $("#txtRemarks").val(),

                //LoadWithPaging Parameters
                pWhereClause: WH_CFS_ReleaseOrders_GetWhereClause(),
                pPageSize: $('#select-page-size').val(),
                pPageNumber: 1,
                pOrderBy: " OperationNumber DESC, ContainerNumber DESC, HouseNumber DESC "
            };
            CallPOSTFunctionWithParameters("/api/WH_CFS_ReleaseOrders/WH_CFS_ReleaseOrders_Update", pParametersWithValues
                , function (pData) {
                    if (pData[0]) {

                        WH_CFS_ReleaseOrders_BindTableRows(JSON.parse(pData[2]));

                        ReleaseOrderNotes_BindTableRows(JSON.parse(pData[3]));

                        //$("#hReleasingDate").val($("#txtReleasingDate").val());

                        $("#spn-total-count").text(pData[4]); //_RowCount

                        $("#btn-AddReleaseNotes").removeAttr("disabled");
                        $("#btn-Print").removeAttr("disabled");
                        swal("Success", "Saved successfully.");
                    }
                    else {
                        swal("Sorry", "Connection failed, please try again.");
                        $("#btn-AddReleaseNotes").attr("disabled", "disabled");
                    }
                    FadePageCover(false);
                }
                , null);
        }

    } else if (invoices.length == 0) {
        swal("Sorry", "You must have a paid invoices to release");
        return;
    }

}

function WH_CFS_ReleaseOrders_Print() {
    debugger;
    let confirm = $('#cbConfirmRelease').prop('checked');

    let invoices = $("#tblInvoices tbody tr");
    let invoicesStatus = [];
    if (invoices.length != 0 && (pDefaults.UnEditableCompanyName != "UNF" || confirm)) {
        let invoicesArr = invoices.toArray();
        for (let inv of invoicesArr) {
            invoicesStatus.push({
                paymentTerm: $(inv).children("td.InvoicePaymentTermID").text(),
                status: $(inv).children("td.InvoiceStatus").text()
            });
        }
        //let unpaidInv = invoicesStatus.filter(item => item != "Paid").length;
        let unpaidInv = 0;
        for (let item of invoicesStatus) {
            if (item.status == "Paid" || item.status == "Cancelled by credit note") {
                continue;
            } else {
                if (item.paymentTerm == "CASH" || item.paymentTerm == 0 || item.paymentTerm == "") {
                    unpaidInv++;
                } else {
                    continue;
                }
            }
        }

        if (unpaidInv != 0) {
            swal("Sorry", "You must pay all invoices to release");
            return;
        } else {
            let invoicesIDElements = $("#tblInvoices tr td.InvoiceID input").toArray();
            /*for (let inv of invoicesIDElements) {
                if (CheckInvoiceStatus(inv) == false) {
                    swal("Sorry", "You must have a paid invoices to release");
                    return;
                }
            }*/
        }

    } else if (invoices.length == 0) {
        swal("Sorry", "You must have a paid invoices to release");
        return;
    }

    var EntryDate = new Date(ConvertDateFormat($("#txtEntryDate").val()));
    var ReleaseDate = new Date(ConvertDateFormat($("#txtReleasingDate").val()));

    if (ReleaseDate.getTime() >= EntryDate.getTime()) {

        var arr_Keys = new Array();
        var arr_Values = new Array();
        arr_Keys.push("ReleaseOrderID");

        arr_Values.push($("#hReleaseOrderID").val());
        CallGETFunctionWithParameters("/api/Reports/GetLogoPath", { pLogoSubPath: "Content/Images/CompanyHeader.jpg" }, function (paths) {
            debugger;
            arr_Keys.push("HeaderLogo");
            arr_Values.push(paths.logoPath);

            if (pDefaults.UnEditableCompanyName == "UNF") {
                arr_Keys.push("confirm");
                let c = confirm ? "1" : "0";
                arr_Values.push(c);
            }

            var pParametersWithValues =
            {
                arr_Keys: arr_Keys
                , arr_Values: arr_Values
                , pTitle: "Release Order"
                , pReportName: "Rep_WH_ReleaseOrder"
            };
            if (pDefaults.UnEditableCompanyName == "UNF") {
                pParametersWithValues.pReportName = 'Rep_UNF_WH_ReleaseOrder';
            }
            var win = window.open("", "_blank");
            var url = '/ReportMainClass/PrintPS_Payment?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

            win.location = url;

            if (pDefaults.UnEditableCompanyName != "UNF" || confirm) {

                CallGETFunctionWithParameters("api/WH_CFS_ReleaseOrders/AddReleaseLetterPrintLog", { pHouseID: parseInt($("#hHouseBillID").val()), pT: false }, function (pData) {
                    if (pData == false) {
                        swal("Sorry", "Error Happened in inserting print log for release letter");
                    } else {
                        WH_CFS_ReleaseOrdersInit();
                    }
                }, null);
                setTimeout(function () {
                    GetReleaseNumber();
                }, 1500);
            }
            
        });

        
    }
    else {
        $("#btnPrint").attr("disabled", false);
        swal("Sorry", "Can't print ,Please update Release date.");
    }
}


function EnterReleaseDate() {
    debugger;
    if (pDefaults.UnEditableCompanyName == "UNF") {
        if ($('#cbConfirmRelease').prop('checked') == true) {
            var ReleaseDate = getTodaysDateInddMMyyyyFormat();
            $("#txtReleasingDate").val(ReleaseDate);
            $("#txtReleasingDate").attr("disabled", "disabled");
            $("#txtReleasingDate").val();
        } else {
            $("#txtReleasingDate").removeAttr("disabled");
            $("#txtReleasingDate").val('');

        }

    }
}
function GetReleaseNumber() {
    debugger;
    if ($('#txtReleaseNumber').val() == "") {
        var pParametersWithValues =
           {
               pReleaseOrderID: $('#hReleaseOrderID').val()
           }
        CallGETFunctionWithParameters("/api/WH_CFS_ReleaseOrders/GetReleaseNumber", pParametersWithValues
              , function (pData) {
                  if (pData[0]) {
                      $('#txtReleaseNumber').val(JSON.parse(pData[1]).ReleaseNumber)
                  }
                  else {
                      swal("Sorry", "Connection failed, please try again.");
                  }
              }
              , null);
    }
}
//#endregion


//#region O T H E R   F U N C T I O N S
function GetNoteDetails() {
    debugger;

    var pParametersWithValues =
        {
            pNoteID: $('#slReleaseNotes').val() == "" ? 0 : $('#slReleaseNotes').val()
        }
    CallGETFunctionWithParameters("/api/WH_CFS_ReleaseOrders/GetNoteDetails", pParametersWithValues
          , function (pData) {
              if (pData[0]) {
                  $('#txtNoteDetails').val(JSON.parse(pData[1]).Notes)
              }
              else {
                  swal("Sorry", "Connection failed, please try again.");
              }
          }
          , null);
}
//#endregion

//#region R E L E A S E    O R D E R   N O T E S   F U N C T I O N S

function ReleaseOrderNotes_BindTableRows(pTableRows) {
    debugger;
    //$("#hl-menu-DASCreditNotes").parent().addClass("active");
    ClearAllTableRows("tblReleaseNotes");

    var printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    $.each(pTableRows, function (i, item) {
        debugger;
        AppendRowtoTable("tblReleaseNotes",
        ("<tr ID='" + item.ID + "' ondblclick='ReleaseOrderNotes_EditByDblClick(" + item.ID + ");'>"
            + "<td class='PrdID'> <input name='Delete' id='" + item.ID + "' type='checkbox' value='" + item.ID + "' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);'/></td>"
            + "<td class='ReleaseNoteName' style=text-transform:uppercase' >" + item.ReleaseNoteName + "</td>"
            + "<td class='NoteDetails' style=text-transform:uppercase' >" + (item.NoteDetails == 0 ? "" : item.NoteDetails) + "</td>"
            + "<td class='ReleaseOrderID hide'>" + item.ReleaseOrderID + "</td>"
        + "</tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblReleaseNotes", "ID", "cb-CheckAll");
    HighlightText("#tblReleaseNotes>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function ReleaseOrderNotes_LoadItems() {
    debugger;
    var pParametersWithValues = { pReleaseOrderID: $("#hReleaseOrderID").val() };
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/WH_CFS_ReleaseOrders/WH_CFS_ReleaseOrders_LoadNotes", pParametersWithValues
        , function (pData) {
            if (pData[0]) {

                ReleaseOrderNotes_BindTableRows(JSON.parse(pData[1]));

                FadePageCover(false);
            }
            else {
                swal("Sorry", "Connection failed, please try again.");
            }
        }
        , null);
}

function ReleaseOrderNotes_ClearAllControls() {
    debugger;
    ClearAll("#EditReleaseNotesModal");
    $("#btnSaveReleaseNotes").attr("onclick", "ReleaseOrderNotes_Insert(false);");
    $("#btnSaveandNewReleaseNotes").attr("onclick", "ReleaseOrderNotes_Insert(Ttrue);");
    jQuery("#EditReleaseNotesModal").modal("show");
}

function ReleaseOrderNotes_EditByDblClick(pID) {
    debugger;

    ClearAll("#EditReleaseNotesModal");

    jQuery("#EditReleaseNotesModal").modal("show");

    var pParametersWithValues = { pReleaseOrderNoteID: pID };
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/WH_CFS_ReleaseOrders/WH_CFS_ReleaseOrders_LoadNoteDetails", pParametersWithValues
        , function (pData) {
            if (pData[0]) {
                var pDetails = JSON.parse(pData[1]);
                $("#hReleaseOrderNotesID").val(pID);

                $("#slReleaseNotes").val(pDetails.NoteID);
                $("#txtNoteDetails").val(pDetails.NoteDetails);

                $("#btnSaveReleaseNotes").attr("onclick", "ReleaseOrderNotes_Update(false);");
                $("#btnSaveandNewReleaseNotes").attr("onclick", "ReleaseOrderNotes_Update(true);");
                FadePageCover(false);
            }
            else {
                swal("Sorry", "Connection failed, please try again.");
            }
        }
        //, null
    , null
        );
}

function ReleaseOrderNotes_GetWhereClause() {
    debugger;
    var pWhereClause = "WHERE ReleaseOrderID = " + $("#hReleaseOrderID").val();

    return pWhereClause;
}

function ReleaseOrderNotes_Insert(pIsSaveNew) {
    debugger;
    if (!ValidateForm("form", "EditReleaseNotesModal")) {
        strMissingFields = ReleaseOrderNotes_GetMissingFields();
        swal("You are missing:", strMissingFields);
    }
    else { //start Inserting Procedure
        FadePageCover(true);

        var pParametersWithValues;
        pParametersWithValues = {
            pReleaseOrderNoteID: 0,
            pReleaseOrderID: $("#hReleaseOrderID").val(),
            pNoteDetails: $("#txtNoteDetails").val(),
            pNoteID: $("#slReleaseNotes").val()

            //LoadWithPaging Parameters
            , pWhereClause: ReleaseOrderNotes_GetWhereClause()
            , pPageSize: $('#select-page-size').val()
            , pPageNumber: 1
            , pOrderBy: "ID"
        };
        CallPOSTFunctionWithParameters("/api/WH_CFS_ReleaseOrders/WH_CFS_ReleaseOrderNotes_Save", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    $("#hReleaseOrderNotesID").val(pData[1]); //pBillID
                    ReleaseOrderNotes_BindTableRows(JSON.parse(pData[2])); //returned rows
                    $("#spn-total-count").text(pData[3]); //_RowCount
                    swal("Success", "Saved successfully.");

                    $("#btnSaveReleaseNotes").attr("onclick", "ReleaseOrderNotes_Update(false);");
                    $("#btnSaveandNewReleaseNotes").attr("onclick", "ReleaseOrderNotes_Update(true);");
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
        ,
         function () {
             if (pIsSaveNew == true) {
                 ReleaseOrderNotes_ClearAllControls();
             }
         }
        );
    }
}

function ReleaseOrderNotes_Update(pIsSaveNew) {
    debugger;
    if (!ValidateForm("form", "EditReleaseNotesModal")) {
        strMissingFields = ReleaseOrderNotes_GetMissingFields();
        swal("You are missing:", strMissingFields);
    }
    else { //start Inserting Procedure
        FadePageCover(true);

        var pParametersWithValues;
        pParametersWithValues = {
            pReleaseOrderNoteID: $("#hReleaseOrderNotesID").val(),
            pReleaseOrderID: $("#hReleaseOrderID").val(),
            pNoteDetails: $("#txtNoteDetails").val(),
            pNoteID: $("#slReleaseNotes").val()

            //LoadWithPaging Parameters
            , pWhereClause: ReleaseOrderNotes_GetWhereClause()
            , pPageSize: $('#select-page-size').val()
            , pPageNumber: 1
            , pOrderBy: "ID"
        };
        CallPOSTFunctionWithParameters("/api/WH_CFS_ReleaseOrders/WH_CFS_ReleaseOrderNotes_Save", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    //$("#hReleaseOrderNotesID").val(pData[1]); //pBillID
                    ReleaseOrderNotes_BindTableRows(JSON.parse(pData[2])); //returned rows
                    $("#spn-total-count").text(pData[3]); //_RowCount
                    swal("Success", "Saved successfully.");

                    $("#btnSaveReleaseNotes").attr("onclick", "ReleaseOrderNotes_Update(false);");
                    $("#btnSaveandNewReleaseNotes").attr("onclick", "ReleaseOrderNotes_Update(true);");
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
        ,
          function () {
              if (pIsSaveNew == true) {
                  ReleaseOrderNotes_ClearAllControls();
              }
          }
        );
    }
}

function ReleaseOrderNotes_DeleteList() {
    debugger;
    var pSelectedIDs = GetAllSelectedIDsAsString('tblReleaseNotes');
    if (pSelectedIDs != "")
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
                CallGETFunctionWithParameters("/api/WH_CFS_ReleaseOrders/WH_CFS_ReleaseOrderNotes_DeleteList"
                    , {
                        pDeleteWH_CFS_ReleaseOrderNoteIDs: GetAllSelectedIDsAsString('tblReleaseNotes')
                        //LoadWithPaging Parameters
                        , pWhereClause: ReleaseOrderNotes_GetWhereClause()
                        , pPageSize: $('#select-page-size').val()
                        , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
                        , pOrderBy: "ID DESC"
                    }
                    , function (pData) {
                        if (!pData[0])
                            swal("Sorry", strDeleteFailMessage);
                        ReleaseOrderNotes_BindTableRows(JSON.parse(pData[1]));
                        FadePageCover(false);
                    });
            });
}

function ReleaseOrderNotes_GetMissingFields() {
    debugger;
    var strMissingFields = "";// i am sure there is at least 1 missing field isa
    var fieldCount = 0;
    //BasicData Tab
    if ($("#slReleaseNotes").val() == '')
        strMissingFields += ++fieldCount + " - Note.\n";


    return strMissingFields;
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
                    var data = {
                        "pSelectedReceivableItemsIDs": pSelectedReceivableItemsIDs
                            , "pInvoiceNumber": 0 /*generated automatically*/ //($("#txtInvoiceNumber").val().trim() == "" ? "0" : $("#txtInvoiceNumber").val().trim().toUpperCase())
                        //, "pOperationID": $("#hOperationID").val()
                            , "pOperationID": $("#slInvoiceOperations").val()
                            , "pOperationPartnerID": $("#slInvoicePartner").val() //in table OperationPartners
                        //, "pAddressTypeID": 0//($("#slInvoiceAddressTypes").val() == "" ? 0 : $("#slInvoiceAddressTypes").val())
                            , "pAddressID": $("#slInvoiceAddressTypes").val()///////////////////////////////////////////////
                            , "pInvoiceTypeID": ($("#slInvoiceTypes").val() == "" ? 0 : $("#slInvoiceTypes").val())
                            , "pInvoiceTypeCode": ($("#slInvoiceTypes").val() == "" ? 0 : $("#slInvoiceTypes option:selected").text())
                            , "pPrintedAddress": "0"
                            , "pCustomerReference": ($("#txtInvoiceCustomerReference").val().trim() == "" ? "0" : $("#txtInvoiceCustomerReference").val().toUpperCase())
                            , "pPaymentTermID": $("#slInvoicePaymentTerms").val()
                            , "pCurrencyID": ($("#slInvoiceCurrency").val() == "" ? 0 : $("#slInvoiceCurrency").val())
                            , "pExchangeRate": ($("#txtInvoiceMasterDataExchangeRate").val() == "" ? 1 : $("#txtInvoiceMasterDataExchangeRate").val())
                            , "pInvoiceIssueDate": ($("#txtInvoiceIssueDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtInvoiceIssueDate").val().trim()))
                            , "pInvoiceDueDate": ($("#txtInvoiceDueDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtInvoiceDueDate").val().trim()))
                        //, "pInvoiceIssueDate": ($("#txtInvoiceIssueDate").val() == "" ? "01/01/1900" : $("#txtInvoiceIssueDate").val().trim())
                        //, "pInvoiceDueDate": ($("#txtInvoiceDueDate").val() == "" ? "01/01/1900" : $("#txtInvoiceDueDate").val().trim())

                            , "pAmountWithoutVAT": $("#txtInvoiceAmountWithoutVAT").val()
                            , "pTaxTypeID": $("#slInvoiceTax").val() == "" ? 0 : $("#slInvoiceTax").val()
                            , "pTaxPercentage": $("#txtInvoiceTaxPercentage").val() == "" ? 0 : $("#txtInvoiceTaxPercentage").val()
                            , "pTaxAmount": $("#txtInvoiceTaxAmount").val() == "" ? 0 : $("#txtInvoiceTaxAmount").val()
                            , "pDiscountTypeID": $("#slInvoiceDiscount").val() == "" ? 0 : $("#slInvoiceDiscount").val()
                            , "pDiscountPercentage": $("#txtInvoiceDiscountPercentage").val() == "" ? 0 : $("#txtInvoiceDiscountPercentage").val()
                            , "pDiscountAmount": $("#txtInvoiceDiscountAmount").val() == "" ? 0 : $("#txtInvoiceDiscountAmount").val()

                            , "pAmount": $("#txtInvoiceAmount").val()
                            , "pInvoiceStatusID": 1
                            , "pIsApproved": false
                            , "pTankID": SelectedHouseBillID == 0 ? $("#hContainerID").val() : 0
                            , "pApplyTankCharges": false
                            , "pTransactionTypeID": 0
                            , "pTariffID": 0
                            , "pStorageFromDate": "01/01/1900" 
                            , "pStorageToDate": "01/01/1900" 
                            , "pPortalOperationPartnerID": $("#slInvoicePartner").val()
                    }
                    InsertUpdateFunction("form", "/api/Invoices/Insert", data, pSaveandAddNew, "InvoiceModal"
                        , function (data) {
                            var _DistinctTankCurrencyCount = data[2];

                            Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val(), $("#hContainerID").val(), $("#hHouseBillID").val());

                            //OperationPartners_LoadWithPagingWithWhereClause($("#hOperationID").val());

                            Invoices_LoadAll($("#hOperationID").val(), $("#hContainerID").val());

                            if (data[0]) {
                                Invoices_Print(data[1], 3/*$("#slInvoiceReportTypes").val()*/);/*Incoterms_LoadingWithPaging();*/
                                if (_DistinctTankCurrencyCount > 1)
                                    swal("Sorry", "Some items are not added becuase they have different currencies.");
                            }
                            else
                                swal("Sorry", "Connection Failure, please refresh then try again.");
                            FadePageCover(false);
                        });
                }
                else { //Not Correct Date
                    FadePageCover(false);
                    swal(strSorry, strCheckDates);
                }
            }
        }
        , null);
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
                                    , "pRoutingID": ($("#slEditInvoiceRoutingCCA").val() == "" || $("#slEditInvoiceRoutingCCA").val() == null) ? 0 : $("#slEditInvoiceRoutingCCA").val()
                                    , "pRelatedToInvoiceID": 0
                                    , "pUpdateRelatedToInvoiceID": false
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
    CallGETFunctionWithParameters("/api/Reports/Report_Invoice"
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
                    if ($("#hDefaultUnEditableCompanyName").val() == "FFI") {
                        //SaveFile(data[1]);
                        var mywindow = window.open('', '_blank');
                        var ReportHTML = '';
                        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                        //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                        ReportHTML += '<html>';
                        ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div> </br>';
                        ReportHTML += '             <div class="col-xs-12 text-center m-t-n-lg"><h3>Invoice No. ' + pInvoiceDate.substr(3, 2) + '/' + pInvoiceDate.substr(8, 2) + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + '</h3></div> </br>';
                        //ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>Invoice No. ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(3, 2) + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(8, 2) + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + '</h3></div> </br>';
                        //ReportHTML += '             <div class="col-xs-12 text-center m-t-n-lg"><h3>Invoice No. ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(3, 2) + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(8, 2) + '/' + pInvoiceNumber + '</h3></div> </br>';

                        ReportHTML += '             <div class="col-xs-4 hide"><b>Print Date: </b>' + getTodaysDateInddMMyyyyFormat() + '</div>';
                        ReportHTML += '             <div class="col-xs-8"><b>Invoice To: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoicePartner").text() + '</div>';
                        ReportHTML += '             <div class="col-xs-4"><b>Invoice Date: </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '</div>';
                        ReportHTML += '             <div class="col-xs-4"><b>Due Date: </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '</div>';
                        if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                            ReportHTML += '             <div class="col-xs-4"><b>Operation: </b>' + pMasterOperationCode + '</div>';
                        else
                            ReportHTML += '             <div class="col-xs-4"><b>Operation: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceOperationCode").text() + '</div>';
                        //ReportHTML += '             <div class="col-xs-4"><b>MBL</b>' + $("#lblMaster").text() + '</div>';
                        ReportHTML += '             <div class="col-xs-4"><b>BL: </b>' + pMasterBL + '</div>';
                        if (pHouseBLs != "0")//Master Operation so show all houses on it
                            ReportHTML += '             <div class="col-xs-4"><b>HBL</b>: ' + pHouseBLs + '</div>';
                        else
                            if (pHouseNumber != "0" && !$("#cbIsDirect").prop("checked"))
                                ReportHTML += '             <div class="col-xs-4"><b>HBL</b>: ' + (pHouseNumber == "" ? "N/A" : pHouseNumber) + '</div>';
                        ReportHTML += '             <div class="col-xs-4"><b>Payment Term: </b>' + ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoicePaymentTermID").text() == 0 ? 'N/A' : $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoicePaymentTermID").text()) + '</div>';
                        //ReportHTML += '             <div class="col-xs-4"><b>Routing</b>' + $("#lblRouting").text() + '</div>';
                        ReportHTML += '             <div class="col-xs-4"><b>POL: </b>' + pPOLName + '</div>';
                        ReportHTML += '             <div class="col-xs-4"><b>POD: </b>' + pPODName + '</div>';
                        if (pContainerTypes != 0)
                            ReportHTML += '         <div class="col-xs-4"><b>Containers: </b>' + (pContainerTypes == 0 ? "N/A" : pContainerTypes) + '</div>';
                        else
                            if (pPackageTypes != 0)
                                ReportHTML += '     <div class="col-xs-4"><b>Packages: </b>' + (pPackageTypes == 0 ? "N/A" : pPackageTypes) + '</div>';
                        ReportHTML += '             <div class="col-xs-4"><b>Customer Invoice: </b>' + (pCustomerReference == 0 ? "N/A" : pCustomerReference) + '</div>';
                        ReportHTML += '             <div class="col-xs-4"><b>Loading Date: </b>' + ''/*just for FFI*/ + '</div>';
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
                        ReportHTML += '                                         <tr>';
                        ReportHTML += '                                             <td colspan=3>' + '<b>Sum Of ItemsCharges : ' + '</b></td>';
                        ReportHTML += '                                             <td><b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmountWithoutVAT").text() + '</b></td>';
                        ReportHTML += '                                         </tr>';
                        if (1 == 1) { //if (pTaxAmount != 0) {
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
                        ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                        ReportHTML += '                                             <td><b>Total Amount : ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                        ReportHTML += '                                         </tr>';
                        ReportHTML += '                             </body>';
                        ReportHTML += '                     </table>';
                        ReportHTML += '                 </div>'
                        //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                        //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' / (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ')' + '</b>';
                        //ReportHTML += '                         </div>';
                        ReportHTML += '                         <div class="clear m-l col-xs-6 text-left"><b>ACCOUNTING</b></div>';
                        ReportHTML += '                         <div class="float-right text-right m-t-n col-xs-6 m-r"><b>APPROVAL</b></div>';
                        if ($("#cbPrintBankDetailsFromDefaults").prop("checked")) {
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
                        if ($("#cbPrintFooterInvoice").prop("checked"))
                            ReportHTML += '         <div class="row text-right m-r">' + '  الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها  ' + ($("#cbIsImport").prop("checked") ? (' / ض.م.: ' + pTaxNumber) : '') + '</div>';
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
                        ReportHTML += '         <div class="row text-center ' + ($("#cbPrintFooterInvoice").prop("checked") ? "" : " hide ") + '"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                        ReportHTML += '     </footer>';
                        ReportHTML += '</html>';
                        mywindow.document.write(ReportHTML);
                        mywindow.document.close();
                    }
                    else if ($("#hDefaultUnEditableCompanyName").val() == "NSL") {
                        var mywindow = window.open('', '_blank');
                        var ReportHTML = '';
                        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                        //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                        ReportHTML += '<html>';
                        ReportHTML += '     <head><title></title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                        //ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>Invoice No. ' + pInvoiceDate.substr(3, 2) + '/' + pInvoiceDate.substr(8, 2) + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + '</h3></div>';
                        ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + ')' + '</h3></div>';
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
                        ReportHTML += '                     <b>Invoice No : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(3, 2) + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(8, 2) + '/' + /*pInvoiceNumber*/$("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + '<br>';
                        ReportHTML += '                     <b>Payment Due by : </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '<br>';
                        //ReportHTML += '                     <b>Reference No. : </b>' + (pCustomerReference == 0 ? "N/A" : pCustomerReference) + '<br>';
                        if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                            ReportHTML += '                 <b>Operation : </b>' + pMasterOperationCode;
                        else
                            ReportHTML += '                     <b>Operation : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceOperationCode").text() + '<br>';
                        ReportHTML += '                     <b>Currency : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '<br>';
                        ReportHTML += '                 </div>';
                        //ReportHTML += '             </div>';
                        ReportHTML += '             <table class="col-xs-8 m-l m-t-n-lg b-t b-light text-sm table-bordered" style="clear:both; width:auto; border:solid #000;">';
                        ReportHTML += '                 <td>';
                        ReportHTML += '                     <b>Bill To: </b><br>';
                        ReportHTML += '                     <b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoicePartner").text() + '</b><br>';
                        ReportHTML += '                     ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                        ReportHTML += '                     ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2 + '<br>'));
                        ReportHTML += '                     ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                        ReportHTML += '                     ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                        ReportHTML += '                 </td>';
                        ReportHTML += '             </table>';

                        ReportHTML += '             <div style="clear:both;"><br></div>';
                        if ($("#cbPrintMBL").prop("checked"))
                            ReportHTML += '             <div class="col-xs-6"><b>MB/L No.: </b>' + pMasterBL + '</div>';
                        if ($("#cbPrintHBL").prop("checked")) {
                            if (pHouseBLs != "0")//Master Operation so show all houses on it
                                ReportHTML += '             <div class="col-xs-6"><b>HBL</b>: ' + pHouseBLs + '</div>';
                            else if (pHouseNumber != "0")
                                ReportHTML += '             <div class="col-xs-6"><b>HB/L No.:</b> ' + (pHouseNumber == "" ? "N/A" : pHouseNumber) + '</div>';
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
                        ReportHTML += '                                         <tr>';
                        ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                        ReportHTML += '                                             <td><b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + '</b></td>';
                        ReportHTML += '                                         </tr>';

                        //ReportHTML += '                                         <tr>';
                        //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                        //ReportHTML += '                                             <td><b>Total Amount : ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                        //ReportHTML += '                                         </tr>';
                        ReportHTML += '                             </tbody>';
                        ReportHTML += '                         </table>';
                        ReportHTML += '                     </div>'
                        //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                        //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' / (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ')' + '</b>';
                        //ReportHTML += '                         </div>';
                        //ReportHTML += '                         <div class="clear m-l col-xs-6 text-left"><b>ACCOUNTING</b></div>';
                        //ReportHTML += '                         <div class="float-right text-right m-t-n col-xs-6 m-r"><b>APPROVAL</b></div>';
                        ReportHTML += '                         <div class="col-xs-6 m-t-n">';
                        if (1 == 1) { //($("#cbPrintBankDetailsFromDefaults").prop("checked")) {
                            ReportHTML += '                             <b><u>Container Numbers:</u></b></br>';
                            ReportHTML += '                             ' + pContainerNumbers + '</br><br><br><br><br>';
                        }
                        else
                            ReportHTML += '                             <br><br><br><br><br><br>';
                        ReportHTML += '                         </div>';
                        ReportHTML += '                         <div class="col-xs-6 text-right m-t-n">';
                        ReportHTML += '                             <b>Subtotal: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmountWithoutVAT").text() + '</br>';
                        //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '</br>';
                        ReportHTML += '                             <b>VAT(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pTaxAmount + '</br>';
                        //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '</br>';
                        ReportHTML += '                             <b>Discount Taxes(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pDiscountAmount + '</br>';
                        ReportHTML += '                             <b>Total: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' <b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + '</b></br>';
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
                        ReportHTML += '         <div class="row text-center ' + ($("#cbPrintFooterInvoice").prop("checked") ? "" : " hide ") + '"><img src="/Content/Images/CompanyInvoiceFooter.jpg" alt="footer"/></div>';
                        ReportHTML += '     </footer>';
                        ReportHTML += '</html>';
                        mywindow.document.write(ReportHTML);
                        mywindow.document.close();
                    }
                    else if ($("#hDefaultUnEditableCompanyName").val() == "KML") {
                        var mywindow = window.open('', '_blank');
                        var ReportHTML = '';
                        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                        //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                        ReportHTML += '<html>';
                        ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                        ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0] + "/" + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(3, 2) + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(8, 2)).replace(/\//g, "-") + '</h3></div>';

                        ReportHTML += '                 <div class="col-xs-8">';
                        ReportHTML += '                     <b>' + $("#hDefaultCompanyName").val() + '</b><br>';
                        ReportHTML += '                     ' + (pAddressLine1 == "" ? "" : (pAddressLine1 + '<br>'));
                        ReportHTML += '                     ' + (pAddressLine2 == "" ? "" : (pAddressLine2 + '<br>'));
                        ReportHTML += '                     ' + (pAddressLine3 == "" ? "" : (pAddressLine3) + '<br>');
                        ReportHTML += '                     ' + (pPhones == "" ? "" : ('TEL:' + pPhones) + '<br>');
                        ReportHTML += '                     ' + (pFaxes == "" ? "" : ('Fax:' + pFaxes)) + '<br><br><br>';
                        ReportHTML += '                 </div>';

                        ReportHTML += '                 <div class="col-xs-4 m-l-n">';
                        ReportHTML += '                     <b>Invoice Date : </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '<br>';
                        ReportHTML += '                     <b>Invoice No : </b>' + ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0] + "/" + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(3, 2) + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(8, 2)).replace(/\//g, "-") + '<br>';// + '/' + /*pInvoiceNumber*/$("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[1] + '<br>';
                        ReportHTML += '                     <b>Payment Due by : </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '<br>';
                        ReportHTML += '                     <b>Reference No. : </b>' + (pCustomerReference == 0 ? "N/A" : pCustomerReference) + '<br>';
                        if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                            ReportHTML += '                 <b>Operation : </b>' + pMasterOperationCode;
                        else
                            ReportHTML += '                     <b>Operation : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceOperationCode").text() + '<br>';
                        ReportHTML += '                     <b>Currency : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '<br>';
                        ReportHTML += '                     <b>Salesman : </b>' + pSalesman + '<br><br>';
                        ReportHTML += '                 </div>';
                        //ReportHTML += '             </div>';
                        ReportHTML += '             <table class="col-xs-8 m-l m-t-n-lg b-t b-light text-sm table-bordered" style="text-align:left; width:auto; border:solid #000;">';
                        ReportHTML += '                 <td>';
                        ReportHTML += '                     <b>Bill To: </b><br>';
                        ReportHTML += '                     <b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoicePartner").text() + '</b><br>';
                        ReportHTML += '                     ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                        ReportHTML += '                     ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2 + '<br>'));
                        ReportHTML += '                     ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                        ReportHTML += '                     ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                        ReportHTML += '                 </td>';
                        ReportHTML += '             </table>';

                        ReportHTML += '             <div style="clear:both;"></div>';
                        if ($("#cbPrintMBL").prop("checked"))
                            ReportHTML += '             <div class="col-xs-6"><b>MB/L No.: </b>' + pMasterBL + '</div>';
                        if ($("#cbPrintHBL").prop("checked")) {
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
                        ReportHTML += '                                         <tr>';
                        ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                        ReportHTML += '                                             <td><b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + '</b></td>';
                        ReportHTML += '                                         </tr>';

                        //ReportHTML += '                                         <tr>';
                        //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                        //ReportHTML += '                                             <td><b>Total Amount : ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                        //ReportHTML += '                                         </tr>';
                        ReportHTML += '                             </tbody>';
                        ReportHTML += '                         </table>';
                        ReportHTML += '                     </div>'
                        //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                        //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' / (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ')' + '</b>';
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
                        if ($("#cbPrintBankDetailsFromDefaults").prop("checked")) {
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
                        ReportHTML += '                             <b>Subtotal: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmountWithoutVAT").text() + '</br>';
                        //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '</br>';
                        ReportHTML += '                             <b>VAT(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pTaxAmount + '</br>';
                        //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '</br>';
                        ReportHTML += '                             <b>Discount Taxes(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pDiscountAmount + '</br>';
                        ReportHTML += '                             <b>Total: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' <b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + '</b></br>';
                        ReportHTML += '                         </div>';
                        //ReportHTML += '                     </div>'; //of table-responsive
                        //ReportHTML += '                 </section>';
                        //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';

                        ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                        ReportHTML += '                     <div class="col-xs-4 m-l-lg"><b>' + (pLeftSignature == "0" ? "&emsp;&emsp;" : pLeftSignature) + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-5"><b>' + (pMiddleSignature == "0" ? "&emsp;&emsp;" : pMiddleSignature) + '</b></div>';
                        ReportHTML += '                     <div class="col-xs-3 m-t-n-md float-right"><b>' + (pRightSignature == "0" ? "&emsp;&emsp;" : pRightSignature) + '</b></div>';
                        ReportHTML += '                 </div>'

                        ReportHTML += '         </body>';
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
                        mywindow.document.write(ReportHTML);
                        mywindow.document.close();
                    }
                    else if ($("#hDefaultUnEditableCompanyName").val() == "EEL" || $("#hDefaultUnEditableCompanyName").val() == "PFS") {
                        var mywindow = window.open('', '_blank');
                        var ReportHTML = '';
                        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                        //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                        ReportHTML += '<html>';
                        ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                        ReportHTML += '                 <div class="col-xs-12 text-left m-t-n"><h3>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[1] + ' No. ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0] + '</h3></div>';
                        //ReportHTML += '                 <div class="col-xs-12 m-t-n-sm">VAT #: ' + pVATNumber + '</div>';
                        ReportHTML += '                 <div class="col-xs-7 m-t-xs">';
                        ReportHTML += '                     <b>' + ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoicePartner").text() + '</b><br>');
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
                        if (pMasterOperationCode != "" && pMasterOperationCode != "0") {
                            ReportHTML += '                             <tr class="" style="font-size:95%;">';
                            ReportHTML += '                                 <td style="text-align:center!Important;"><b>CONSOL </b><td style="text-align:center!Important;">' + pMasterOperationCode + '</td>';
                            ReportHTML += '                             </tr>';
                        }
                        else {
                            ReportHTML += '                             <tr class="" style="font-size:95%;">';
                            ReportHTML += '                                 <td style="text-align:center!Important;"><b>SHIPMENT </b><td style="text-align:center!Important;">' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceOperationCode").text() + '</td>';
                            ReportHTML += '                             </tr>';
                        }
                        ReportHTML += '                             <tr class="" style="font-size:95%;">';
                        ReportHTML += '                                 <td style="text-align:center!Important;"><b>DUE DATE </b><td style="text-align:center!Important;">' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '</td>';
                        ReportHTML += '                             </tr>';
                        ReportHTML += '                             <tr class="" style="font-size:95%;">';
                        ReportHTML += '                                 <td style="text-align:center!Important;"><b>TERMS </b><td style="text-align:center!Important;">' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoicePaymentTermID").text() + '</td>';
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
                        ReportHTML += '                                 <td colspan=3 style="text-align:left!Important;"><b>HOUSE B\L:</b><br>' + pHouseNumber + '</td>';
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
                        ReportHTML += '                             </tbody>';
                        ReportHTML += '                         </table>';
                        ReportHTML += '                     </div>'
                        //Adding totals table
                        ReportHTML += '                 <div class="col-xs-12 m-t-n">';
                        ReportHTML += '                     <table id="tblChargesSummary" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                        ReportHTML += '                         <tbody>';
                        ReportHTML += '                             <tr class="" style="font-size:95%;">';//style="border:solid #000 !important;"
                        ReportHTML += '                                 <td  rowspan=4>' + 'Please contact us within 7 days should there be any discrepancies.' + '</td>';
                        ReportHTML += '                                 <td ><b>Subtotal : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmountWithoutVAT").text() + '</td>';
                        ReportHTML += '                             </tr>';
                        ReportHTML += '                             <tr class="" style="font-size:95%;">';
                        ReportHTML += '                                 <td ><b>VAT(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pTaxAmount + '</td>';
                        ReportHTML += '                             </tr>';
                        ReportHTML += '                             <tr class="" style="font-size:95%;">';
                        ReportHTML += '                                 <td ><b>Discount Taxes(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pDiscountAmount + '</td>';
                        ReportHTML += '                             </tr>';
                        ReportHTML += '                             <tr class="" style="font-size:95%;">';
                        ReportHTML += '                                 <td ><b>Total: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' <b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + '</b></td>';
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
                        ReportHTML += '                     <td colspan=2 style="text-align:left;">' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' <b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + '</td>';
                        ReportHTML += '                     <td colspan=1 style="text-align:left;"><b>' + 'Invoiced:</b></td>';
                        ReportHTML += '                     <td colspan=2 style="text-align:left;">' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' <b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + '</td>';
                        ReportHTML += '                 </tr>';
                        ReportHTML += '             </tbody>';
                        ReportHTML += '         </table>';
                        ReportHTML += '     </footer>';
                        ReportHTML += '</html>';
                        mywindow.document.write(ReportHTML);
                        mywindow.document.close();
                    } //else if ($("#hDefaultUnEditableCompanyName").val() == "EEL" || $("#hDefaultUnEditableCompanyName").val() == "PFS") {
                    else if ($("#hDefaultUnEditableCompanyName").val() == "OAO") { //OAO
                        if ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[1] == "STATEMENT") {
                            var mywindow = window.open('', '_blank');
                            var ReportHTML = '';
                            //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                            //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                            ReportHTML += '<html>';
                            ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                            ReportHTML += '         <body style="background-color:white;">';
                            ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                            ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + '</h3></div>';
                            ReportHTML += '                 <div class="col-xs-8">';
                            ReportHTML += '                     <table class="col-xs-12 b-t b-light text-sm table-bordered" style="text-align:left; width:auto; border:solid #000;">';
                            ReportHTML += '                         <td>';
                            ReportHTML += '                             <b>Bill To: </b><br>';
                            ReportHTML += '                             <b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoicePartner").text() + '</b><br>';
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
                            //if ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[1] == "STATEMENT")
                            //ReportHTML += '                     <b>Invoice No : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(3, 2) + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(8, 2) + '/' + /*pInvoiceNumber*/$("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + '<br>';
                            ReportHTML += '                     <b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[1] + ' No : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0] + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(6, 4) + '<br>';
                            ReportHTML += '                     <b>Payment Due by : </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '<br>';
                            ReportHTML += '                     <b>Reference No. : </b>' + (pCustomerReference == 0 ? "N/A" : pCustomerReference) + '<br>';
                            if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                                ReportHTML += '                 <b>Operation : </b>' + pMasterOperationCode;
                            else
                                ReportHTML += '                     <b>Operation : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceOperationCode").text() + '<br>';
                            ReportHTML += '                     <b>Currency : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '<br>';
                            ReportHTML += '                     <b>Salesman : </b>' + pSalesman + '<br><br>';
                            ReportHTML += '                 </div>';
                            //ReportHTML += '             </div>';

                            ReportHTML += '             <div style="clear:both;"><br></div>';
                            if ($("#cbPrintMBL").prop("checked"))
                                ReportHTML += '             <div class="col-xs-6"><b>MB/L No.: </b>' + pMasterBL + '</div>';
                            if ($("#cbPrintHBL").prop("checked")) {
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
                            //ReportHTML += '                                         <tr>';
                            //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                            //ReportHTML += '                                             <td><b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + '</b></td>';
                            //ReportHTML += '                                             <td>' + '' + '</td>';
                            //ReportHTML += '                                         </tr>';

                            //ReportHTML += '                                         <tr>';
                            //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                            //ReportHTML += '                                             <td><b>Total Amount : ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                            //ReportHTML += '                                         </tr>';
                            ReportHTML += '                             </tbody>';
                            ReportHTML += '                         </table>';
                            ReportHTML += '                     </div>'
                            //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                            //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' / (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ')' + '</b>';
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
                            if ($("#cbPrintBankDetailsFromDefaults").prop("checked")) {
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
                                ReportHTML += '                             <b>Subtotal: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmountWithoutVAT").text() + '</br>';
                            //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '</br>';
                            if (pTaxAmount != 0)
                                ReportHTML += '                             <b>VAT(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pTaxAmount + '</br>';
                            //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '</br>';
                            if (pDiscountAmount != 0)
                                ReportHTML += '                             <b>Discount Taxes(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pDiscountAmount + '</br>';
                            ReportHTML += '                             <b>Total: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' <b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + '</b></br>';
                            ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</br>';
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

                            ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                            ////ReportHTML += '         <div class="row">'
                            ////ReportHTML += '             <div class="col-xs-8 m-l"><b><i>' + ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.DirectionType").text() == 1
                            ////                                                                ? 'Import Manager'
                            ////                                                                : ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.DirectionType").text() == 2 ? 'Export Manager' : 'Domestic Manager')
                            ////                                                                ) + '</i></b></div>';
                            ////ReportHTML += '             <div class="col-xs-4 m-t-n-md float-right"><b><i>Accountant Signature</i></b></div>';
                            ////ReportHTML += '         </div>'
                            //ReportHTML += '         <div class="row text-right m-r m-t-sm">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
                            //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
                            ////if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                            ////    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
                            ////if ($("#hDefaultUnEditableCompanyName").val() == "NSL")
                            ////    ReportHTML += '         <div class="row text-center m-t-n"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                            ////else if ($("#hDefaultUnEditableCompanyName").val() == "KML") //if KML the print on original paper
                            ////    ReportHTML += '             <br><br><br><br><br>';
                            ReportHTML += '     </footer>';
                            ReportHTML += '</html>';
                            mywindow.document.write(ReportHTML);
                            mywindow.document.close();
                        }
                        else { //Invoices not Statement
                            var mywindow = window.open('', '_blank');
                            var ReportHTML = '';
                            //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                            //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                            ReportHTML += '<html>';
                            ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                            ReportHTML += '         <body style="background-color:white;">';
                            ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                            ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + '</h3></div>';
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
                            //if ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[1] == "STATEMENT")
                            //ReportHTML += '                     <b>Invoice No : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(3, 2) + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(8, 2) + '/' + /*pInvoiceNumber*/$("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + '<br>';
                            ReportHTML += '                     <b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[1] + ' No : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0] + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(6, 4) + '<br>';
                            ReportHTML += '                     <b>Payment Due by : </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '<br>';
                            ReportHTML += '                     <b>Reference No. : </b>' + (pCustomerReference == 0 ? "N/A" : pCustomerReference) + '<br>';
                            if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                                ReportHTML += '                 <b>Operation : </b>' + pMasterOperationCode;
                            else
                                ReportHTML += '                     <b>Operation : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceOperationCode").text() + '<br>';
                            ReportHTML += '                     <b>Currency : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '<br>';
                            ReportHTML += '                     <b>Salesman : </b>' + pSalesman + '<br><br>';
                            ReportHTML += '                 </div>';
                            //ReportHTML += '             </div>';
                            ReportHTML += '             <table class="col-xs-8 m-l m-t-n-lg b-t b-light text-sm table-bordered" style="text-align:left; width:auto; border:solid #000;">';
                            ReportHTML += '                 <td>';
                            ReportHTML += '                     <b>Bill To: </b><br>';
                            ReportHTML += '                     <b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoicePartner").text() + '</b><br>';
                            ReportHTML += '                     ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                            ReportHTML += '                     ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2 + '<br>'));
                            ReportHTML += '                     ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                            ReportHTML += '                     ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                            ReportHTML += '                 </td>';
                            ReportHTML += '             </table>';

                            ReportHTML += '             <div style="clear:both;"><br></div>';
                            if ($("#cbPrintMBL").prop("checked"))
                                ReportHTML += '             <div class="col-xs-6"><b>MB/L No.: </b>' + pMasterBL + '</div>';
                            if ($("#cbPrintHBL").prop("checked")) {
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
                            //ReportHTML += '                                         <tr>';
                            //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                            //ReportHTML += '                                             <td><b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + '</b></td>';
                            //ReportHTML += '                                             <td>' + '' + '</td>';
                            //ReportHTML += '                                         </tr>';

                            //ReportHTML += '                                         <tr>';
                            //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                            //ReportHTML += '                                             <td><b>Total Amount : ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                            //ReportHTML += '                                         </tr>';
                            ReportHTML += '                             </tbody>';
                            ReportHTML += '                         </table>';
                            ReportHTML += '                     </div>'
                            //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                            //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' / (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ')' + '</b>';
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
                            if ($("#cbPrintBankDetailsFromDefaults").prop("checked")) {
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
                                ReportHTML += '                             <b>Subtotal: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmountWithoutVAT").text() + '</br>';
                            //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '</br>';
                            if (pTaxAmount != 0)
                                ReportHTML += '                             <b>VAT(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pTaxAmount + '</br>';
                            //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '</br>';
                            if (pDiscountAmount != 0)
                                ReportHTML += '                             <b>Discount Taxes(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pDiscountAmount + '</br>';
                            ReportHTML += '                             <b>Total: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' <b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + '</b></br>';
                            ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</br>';
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

                            ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                            ////ReportHTML += '         <div class="row">'
                            ////ReportHTML += '             <div class="col-xs-8 m-l"><b><i>' + ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.DirectionType").text() == 1
                            ////                                                                ? 'Import Manager'
                            ////                                                                : ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.DirectionType").text() == 2 ? 'Export Manager' : 'Domestic Manager')
                            ////                                                                ) + '</i></b></div>';
                            ////ReportHTML += '             <div class="col-xs-4 m-t-n-md float-right"><b><i>Accountant Signature</i></b></div>';
                            ////ReportHTML += '         </div>'
                            //ReportHTML += '         <div class="row text-right m-r m-t-sm">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
                            //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
                            ////if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                            ////    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
                            ////else
                            ////    if ($("#cbIsImport").prop("checked") && $("#cbIsAir").prop("checked"))
                            ////        ReportHTML += '             <div class="row m-l">F/FFI-IA-11-04</div>';
                            ////    else
                            ////        if ($("#cbIsExport").prop("checked") && $("#cbIsOcean").prop("checked"))
                            ////            ReportHTML += '         <div class="row m-l">F/FFI-ES-10-05</div>';
                            ////        else
                            ////            if ($("#cbIsExport").prop("checked") && $("#cbIsOcean").prop("checked"))
                            ////                ReportHTML += '     <div class="row m-l">F/FFI-ES-10-05</div>';
                            ////            else
                            ////                if ($("#cbIsExport").prop("checked") && $("#cbIsAir").prop("checked"))
                            ////                    ReportHTML += ' <div class="row m-l">F/FFI-EA-10-04</div>';
                            ////if ($("#hDefaultUnEditableCompanyName").val() == "NSL")
                            ////    ReportHTML += '         <div class="row text-center m-t-n"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                            ////else if ($("#hDefaultUnEditableCompanyName").val() == "KML") //if KML the print on original paper
                            ////    ReportHTML += '             <br><br><br><br><br>';
                            ReportHTML += '     </footer>';
                            ReportHTML += '</html>';
                            mywindow.document.write(ReportHTML);
                            mywindow.document.close();
                        }//EOF Invoices not statement
                    } //EOF OAO
                    else if ($("#hDefaultUnEditableCompanyName").val() == "BAL" || $("#hDefaultUnEditableCompanyName").val() == "BME") { //BAL, BME
                        var mywindow = window.open('', '_blank');
                        var ReportHTML = '';
                        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                        //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                        ReportHTML += '<html>';
                        ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        if (!$("#cbPrintHeaderInvoice").prop("checked"))
                            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader-Empty.jpg" alt="logo"/></div>';
                        else if ($("#hDefaultUnEditableCompanyName").val() == "BME") {
                            if ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[1] == "STATEMENT") //header w/o TaxNo
                                ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                            else
                                ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeaderInvoiceTax.jpg" alt="logo"/></div>';
                        }
                        else if ($("#hDefaultUnEditableCompanyName").val() == "BAL" && $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[1] == "STATEMENT") //header w/o TaxNo
                            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader-WithoutTax.jpg" alt="logo"/></div>';
                        else
                            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                        //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + '</h3></div>';
                        ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[1] + '</h3></div>';








                        ReportHTML += '                 <div class="col-xs-8">';
                        ReportHTML += '                     <table class="b-t b-light text-sm table-bordered" style="text-align:left; width:auto; border:solid #000;">';
                        ReportHTML += '                         <td>';
                        ReportHTML += '                             <b>Bill To: </b><br>';
                        ReportHTML += '                             <b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoicePartner").text() + '</b><br>';
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
                        //ReportHTML += '                     <b>Invoice No : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(3, 2) + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(8, 2) + '/' + /*pInvoiceNumber*/$("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + '<br>';
                        ReportHTML += '                     <b>Invoice No : </b>' + pInvoiceTypeCode + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0] + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(6, 4) + '<br>';
                        // ReportHTML += '                     <b>Payment Due by : </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '<br>';
                        // ReportHTML += '                     <b>Reference No. : </b>' + (pCustomerReference == 0 ? "N/A" : pCustomerReference) + '<br>';
                        ReportHTML += '                     <b>Currency : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '<br>';
                        ReportHTML += '                     <b>Operation No : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceOperationCode").text().split('-')[3] + '/20' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceOperationCode").text().substr(1, 2) + '<br>';
                        //if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                        //    ReportHTML += '                 <b>Master Operation : </b>' + pMasterOperationCode;
                        //ReportHTML += '                     <b>Salesman : </b>' + pSalesman + '<br><br>';
                        ReportHTML += '                 </div>';
                        //ReportHTML += '             </div>';

                        ReportHTML += '             <div style="clear:both;"><br></div>';
                        if ($("#cbPrintMBL").prop("checked"))
                            ReportHTML += '             <div class="col-xs-6"><b>MB/L No.: </b>' + pMasterBL + '</div>';
                        if ($("#cbPrintHBL").prop("checked")) {
                            if (pHouseBLs != "0")//Master Operation so show all houses on it
                                ReportHTML += '             <div class="col-xs-6"><b>HBL</b>: ' + pHouseBLs + '</div>';
                            else //if (pHouseNumber != "0" && !$("#cbIsDirect").prop("checked"))
                                ReportHTML += '             <div class="col-xs-6"><b>HB/L No.:</b> ' + (pHouseNumber == "" ? "N/A" : pHouseNumber) + '</div>';
                        }
                        ReportHTML += '             <div class="col-xs-6"><b>POL: </b>' + pPOLName + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>POD: </b>' + pPODName + '</div>';
                        if ($("#hDefaultUnEditableCompanyName").val() != "BME") {
                            ReportHTML += '             <div class="col-xs-6"><b>Weight: </b>' + pGrossWeightSum + ' KG</div>';
                            ReportHTML += '             <div class="col-xs-6"><b>CBM: </b>' + pCBM + ' CBM</div>';
                        }
                        if ($("#hDefaultUnEditableCompanyName").val() == "BME") {
                            if (pOperationHeader.TransportType == OceanTransportType)
                                ReportHTML += '             <div class="col-xs-6"><b>Vessel-Voy: </b>' + (pOperationHeader.VesselName == 0 ? "" : pOperationHeader.VesselName) + (pOperationHeader.VoyageOrTruckNumber == 0 ? "" : (" - " + pOperationHeader.VoyageOrTruckNumber)) + '</div>';
                            ReportHTML += '             <div class="col-xs-6"><b>Customer Ref: </b>' + (pOperationHeader.CustomerReference == 0 ? "" : pOperationHeader.CustomerReference) + '</div>';
                        }
                        if (pContainerTypes != 0)
                            ReportHTML += '         <div class="col-xs-6"><b>Volume: </b>' + (pContainerTypes == 0 ? "N/A" : pContainerTypes) + '</div>';
                        else if (pPackageTypes != 0)
                            ReportHTML += '         <div class="col-xs-6"><b>Volume: </b>' + (pPackageTypes == 0 ? "N/A" : pPackageTypes) + '</div>';
                        if ($("#hDefaultUnEditableCompanyName").val() != "BME") {
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
                        ReportHTML += '                                         <tr>';
                        ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                        ReportHTML += '                                             <td><b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + '</b></td>';
                        ReportHTML += '                                         </tr>';

                        //ReportHTML += '                                         <tr>';
                        //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                        //ReportHTML += '                                             <td><b>Total Amount : ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                        //ReportHTML += '                                         </tr>';
                        ReportHTML += '                             </tbody>';
                        ReportHTML += '                         </table>';
                        ReportHTML += '                     </div>'
                        //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                        //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' / (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ')' + '</b>';
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
                        if ($("#cbPrintBankDetailsFromDefaults").prop("checked")) {
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
                        ReportHTML += '                             <b>Subtotal: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmountWithoutVAT").text() + '</br>';
                        //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '</br>';
                        ReportHTML += '                             <b>VAT(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pTaxAmount + '</br>';
                        //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '</br>';
                        ReportHTML += '                             <b>Discount Taxes(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pDiscountAmount + '</br>';
                        ReportHTML += '                             <b>Total: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' <b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + '</b></br>';
                        ReportHTML += '                         </div>';
                        //ReportHTML += '                     </div>'; //of table-responsive
                        //ReportHTML += '                 </section>';
                        //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                        ReportHTML += '         </body>';

                        ReportHTML += '     <footer class="footer col-xs-12 m-t-lg ' + ($("#cbPrintFooterInvoice").prop("checked") ? "" : " hide ") + '" style="width:100%; position:absolute; bottom:0;">';

                        //ReportHTML += '         <div class="row text-right m-r m-t-sm">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';

                        //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                        //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';

                        if ($("#hDefaultUnEditableCompanyName").val() == "BME")
                            ReportHTML += '         <div class="row text-center m-t-n"><img src="/Content/Images/CompanyFooterInvoice.jpg" alt="footer"/></div>';
                        ReportHTML += '     </footer>';
                        ReportHTML += '</html>';
                        mywindow.document.write(ReportHTML);
                        mywindow.document.close();
                    } //EOF BAL. BME
                    else if ($("#hDefaultUnEditableCompanyName").val() == "KDS" || $("#hDefaultUnEditableCompanyName").val() == "NEW") {
                        if ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[1].split(' ')[0].toUpperCase()
                            == "DISBURSEMENT") {
                            var mywindow = window.open('', '_blank');
                            var ReportHTML = '';
                            //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                            //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                            ReportHTML += '<html>';
                            ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                            //ReportHTML += '         <body style="background-color:white;">';
                            ReportHTML += '         <body style="background-color:white; font-size:160%;">';
                            ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                            //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + ')' + '</h3></div>';
                            ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[1].split(' ')[0] + ' ACCOUNT' + '</h3></div>';
                            //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + ' No. </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0] + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(6, 4) + '</h3></div>';
                            ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + ' No. </b>' + (pOperationHeader.CustomerReference == 0 ? "" : pOperationHeader.CustomerReference) + '</h3></div>';
                            ReportHTML += '                 <div class="col-xs-12"><b>Owner/Charter: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoicePartner").text() + '</div>';
                            //ReportHTML += '                 <div class="col-xs-8">';
                            //ReportHTML += '                     <table class="col-xs-12 b-t b-light text-sm table-bordered" style="text-align:left; width:auto; border:solid #000;">';
                            //ReportHTML += '                         <td>';
                            //ReportHTML += '                             <b>Bill To: </b><br>';
                            //ReportHTML += '                             <b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoicePartner").text() + '</b><br>';
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
                            //ReportHTML += '                                         <td style="text-align:left;">' + '<b>Operation: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceOperationCode").text() + '</td>';
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
                            ReportHTML += '                                         <tr>';
                            ReportHTML += '                                             <td style="text-align:left;" colspan=2>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmountWithoutVAT").text()).toFixed(2)) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                            ReportHTML += '                                             <td style="text-align:right;"><b>' + parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmountWithoutVAT").text()).toFixed(2) + '</b></td>';
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
                                ReportHTML += '                                             <td style="text-align:left;" colspan=2>' + '<b>TOTAL AMOUNT WITH VAT AND DISC : ' + toWords_WithFractionNumbers(parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()).toFixed(2)) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                                ReportHTML += '                                             <td style="text-align:right;"><b>' + parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()).toFixed(2) + '</b></td>';
                                ReportHTML += '                                         </tr>';
                            }
                            //ReportHTML += '                                         <tr>';
                            //ReportHTML += '                                             <td colspan=2>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                            //ReportHTML += '                                             <td><b>Total Amount : ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                            //ReportHTML += '                                         </tr>';
                            ReportHTML += '                             </tbody>';
                            ReportHTML += '                         </table>';
                            ReportHTML += '                     </div>'
                            //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                            //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' / (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ')' + '</b>';
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
                            if ($("#cbPrintBankDetailsFromDefaults").prop("checked")) {
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
                            //ReportHTML += '                             <b>Subtotal: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmountWithoutVAT").text() + '</br>';
                            ////ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '</br>';
                            //ReportHTML += '                             <b>VAT(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pTaxAmount + '</br>';
                            ////ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '</br>';
                            //ReportHTML += '                             <b>Discount Taxes(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pDiscountAmount + '</br>';
                            //ReportHTML += '                             <b>Total: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' <b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + '</b></br>';
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
                                ReportHTML += '         <div class="text-right m-r-lg"><img src="/Content/Images/CompanyStamp.jpg" alt="footer"/></div>';

                            ReportHTML += '     <footer class="footer col-xs-12 m-t-lg ' + ($("#cbPrintFooterInvoice").prop("checked") ? "" : " hide ") + '" style="width:100%; position:absolute; bottom:0;">';
                            //ReportHTML += '         <div class="row text-center ' + ($("#cbPrintFooterInvoice").prop("checked") ? "" : " hide ") + '"><img src="/Content/Images/CompanyFooter.jpg" alt="logo"/></div>';
                            /****if KDS the use CompanyFooter-KDS-InvoiceTaxNumbers.jpg***/
                            //ReportHTML += '         <div class="row text-right m-r">' + '  يتنبه نحو عدم الخصم من تحت حساب الضريبة حيث أن الشركة تتبع نظام الدفعات المقدمة تطبيقا لأحكام لمادة (62) من القانون رقم 91 لسنة 2005  ' + '</div>';
                            //ReportHTML += '         <div class="row text-right m-r">' + '  يوقف صرف شيكات مصر للتأمين لحين تسوية التعويضات  ' + '</div>';
                            //ReportHTML += '         <div class="row text-right m-r">' + '  لاتعتبر الفاتورة مسددة إلا بموجب إيصال سداد معتمد من الشركة بتمام قيمة الفاتورة  ' + '</div>';
                            //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter' + ($("#hDefaultUnEditableCompanyName").val() == "KDS" ? '-KDS-InvoiceTaxNumbers' : "") + '.jpg"' + ' alt="logo"/></div>';
                            ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="logo"/></div>';
                            //else if ($("#hDefaultUnEditableCompanyName").val() == "KML") //if KML the print on original paper
                            //    ReportHTML += '             <br><br><br><br><br>';
                            ReportHTML += '     </footer>';

                            ReportHTML += '</html>';
                            mywindow.document.write(ReportHTML);
                            mywindow.document.close();
                        }
                        else if ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[1].split(' ')[0].toUpperCase()
                            == "SERVICES") {
                            var mywindow = window.open('', '_blank');
                            var ReportHTML = '';
                            //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                            //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                            ReportHTML += '<html>';
                            ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                            ReportHTML += '         <body style="background-color:white;">';
                            ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                            //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + ')' + '</h3></div>';
                            ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[1] + ' No. </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0] + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(6, 4) + '</h3></div>';
                            //ReportHTML += '                 <div class="col-xs-8">';
                            //ReportHTML += '                     <table class="col-xs-12 b-t b-light text-sm table-bordered" style="text-align:left; width:auto; border:solid #000;">';
                            //ReportHTML += '                         <td>';
                            //ReportHTML += '                             <b>Bill To: </b><br>';
                            //ReportHTML += '                             <b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoicePartner").text() + '</b><br>';
                            //ReportHTML += '                             ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                            //ReportHTML += '                             ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2 + '<br>'));
                            //ReportHTML += '                             ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                            //ReportHTML += '                             ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                            //ReportHTML += '                         </td>';
                            //ReportHTML += '                     </table>';

                            //ReportHTML += '                 </div>';


                            //ReportHTML += '             <div style="clear:both;"><br></div>';
                            ReportHTML += '                 <div class="col-xs-8"><b>Client: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoicePartner").text() + '</div>';
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
                                if ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[1].split(' ')[0].toUpperCase() == "G.CARGO"
                                    || $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[1].split(' ')[0].toUpperCase() == "CONTAINER")
                                    ReportHTML += '                                     <tr class="input-md font-bold" style="">';
                                else
                                    ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                                //ReportHTML += '                                         <td>' + ++i + '</td>';
                                ReportHTML += '                                         <td>' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                                ReportHTML += '                                         <td>' + item.SaleAmount.toFixed(2) + '</td>';
                                ReportHTML += '                                     </tr>';
                            });
                            ReportHTML += '                                         <tr>';
                            ReportHTML += '                                             <td colspan=1>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmountWithoutVAT").text()).toFixed(2)) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                            ReportHTML += '                                             <td><b>' + parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmountWithoutVAT").text()).toFixed(2) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
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
                                ReportHTML += '                                             <td colspan=1>' + '<b>TOTAL AMOUNT WITH VAT AND DISC : ' + toWords_WithFractionNumbers(parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()).toFixed(2)) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                                ReportHTML += '                                             <td><b>' + parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()).toFixed(2) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                                ReportHTML += '                                         </tr>';
                            }
                            //ReportHTML += '                                         <tr>';
                            //ReportHTML += '                                             <td colspan=2>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                            //ReportHTML += '                                             <td><b>Total Amount : ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                            //ReportHTML += '                                         </tr>';
                            ReportHTML += '                             </tbody>';
                            ReportHTML += '                         </table>';
                            ReportHTML += '                     </div>'
                            //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                            //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' / (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ')' + '</b>';
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
                            if ($("#cbPrintBankDetailsFromDefaults").prop("checked")) {
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
                            //ReportHTML += '                             <b>Subtotal: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmountWithoutVAT").text() + '</br>';
                            ////ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '</br>';
                            //ReportHTML += '                             <b>VAT(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pTaxAmount + '</br>';
                            ////ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '</br>';
                            //ReportHTML += '                             <b>Discount Taxes(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pDiscountAmount + '</br>';
                            //ReportHTML += '                             <b>Total: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' <b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + '</b></br>';
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
                                ReportHTML += '         <div class="text-right m-r-lg"><img src="/Content/Images/CompanyStamp.jpg" alt="footer"/></div>';

                            ReportHTML += '     <footer class="footer col-xs-12 m-t-lg ' + ($("#cbPrintFooterInvoice").prop("checked") ? "" : " hide ") + '" style="width:100%; position:absolute; bottom:0;">';
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
                            //ReportHTML += '         <div class="row text-center ' + ($("#cbPrintFooterInvoice").prop("checked") ? "" : " hide ") + '"><img src="/Content/Images/CompanyFooter.jpg" alt="logo"/></div>';
                            /****if KDS the use CompanyFooter-KDS-InvoiceTaxNumbers.jpg***/
                            //ReportHTML += '         <div class="row text-right m-r">' + '  الشركة تخضع لنظام الدفعات المقدمة  ' + '</div>';
                            ReportHTML += '         <div class="row text-right m-r">' + '  يتنبه نحو عدم الخصم من تحت حساب الضريبة حيث أن الشركة تتبع نظام الدفعات المقدمة تطبيقا لأحكام لمادة (62) من القانون رقم 91 لسنة 2005  ' + '</div>';
                            //ReportHTML += '         <div class="row text-right m-r">' + '  يوقف صرف شيكات مصر للتأمين لحين تسوية التعويضات  ' + '</div>';
                            ReportHTML += '         <div class="row text-right m-r">' + '  لاتعتبر الفاتورة مسددة إلا بموجب إيصال سداد معتمد من الشركة بتمام قيمة الفاتورة  ' + '</div>';
                            ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter' + ($("#hDefaultUnEditableCompanyName").val() == "KDS" ? '-KDS-InvoiceTaxNumbers' : "") + '.jpg"' + ' alt="logo"/></div>';
                            ReportHTML += '     </footer>';
                            ReportHTML += '</html>';
                            mywindow.document.write(ReportHTML);
                            mywindow.document.close();
                        } //EOF Services invoice
                        else { //other invoice types not Disbursement/Services
                            var mywindow = window.open('', '_blank');
                            var ReportHTML = '';
                            //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                            //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                            ReportHTML += '<html>';
                            ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                            ReportHTML += '         <body style="background-color:white;">';
                            ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                            //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + ')' + '</h3></div>';
                            ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[1] + ' No. </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0] + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(6, 4) + '</h3></div>';
                            //ReportHTML += '                 <div class="col-xs-8">';
                            //ReportHTML += '                     <table class="col-xs-12 b-t b-light text-sm table-bordered" style="text-align:left; width:auto; border:solid #000;">';
                            //ReportHTML += '                         <td>';
                            //ReportHTML += '                             <b>Bill To: </b><br>';
                            //ReportHTML += '                             <b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoicePartner").text() + '</b><br>';
                            //ReportHTML += '                             ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                            //ReportHTML += '                             ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2 + '<br>'));
                            //ReportHTML += '                             ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                            //ReportHTML += '                             ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                            //ReportHTML += '                         </td>';
                            //ReportHTML += '                     </table>';

                            //ReportHTML += '                 </div>';


                            //ReportHTML += '             <div style="clear:both;"><br></div>';
                            if ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[1].split(' ')[0].toUpperCase() == "DEBIT") {
                                ReportHTML += '             <div class="col-xs-8"><b>Client: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoicePartner").text() + '</div>';
                                ReportHTML += '             <div class="col-xs-4 text-right"><b>Date: </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '</div>';
                            }
                            else {
                                ReportHTML += '             <div class="col-xs-12"><b>Client: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoicePartner").text() + '</div>';
                                ReportHTML += '             <div class="col-xs-4"><b>Date: </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '</div>';
                                ReportHTML += '             <div class="col-xs-4"><b>Branch: </b>' + pOperationHeader.BranchName + '</div>';
                                if (pOperationHeader.ShipmentTypeCode != "FCL" && pOperationHeader.ShipmentTypeCode != "CONSOL")
                                    //ReportHTML += '             <div class="col-xs-4"><b>Freight: </b>' + (pOperationHeader.POrCName == 0 ? "" : pOperationHeader.POrCName) + '</div>';
                                    ReportHTML += '             <div class="col-xs-4"><b>Freight: </b>' + (pOperationHeader.POrCName == 0 ? "" : pOperationHeader.POrCName) + '</div>';
                                else
                                    ReportHTML += '             <div class="col-xs-4"><b>Voyage: </b>' + (pOperationHeader.VoyageOrTruckNumber == 0 ? "" : pOperationHeader.VoyageOrTruckNumber) + '</div>';
                                ReportHTML += '             <div class="col-xs-4"><b>Vessel: </b>' + pVesselName + '</div>';
                                ReportHTML += '             <div class="col-xs-4"><b>Vessel Date: </b>' + (pETA == "01/01/1900" || pETA == "1/1/1900" ? "N/A" : pETA) + '</div>';
                                if ($("#cbPrintMBL").prop("checked"))
                                    ReportHTML += '             <div class="col-xs-4"><b>MB/L No.: </b>' + pMasterBL + '</div>';
                                if ($("#cbPrintHBL").prop("checked")) {
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
                            } //else of ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[1] == "DEBIT") {
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
                                if ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[1].split(' ')[0].toUpperCase() == "G.CARGO"
                                    || $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[1].split(' ')[0].toUpperCase() == "CONTAINER")
                                    ReportHTML += '                                     <tr class="input-md font-bold" style="">';
                                else
                                    ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                                //ReportHTML += '                                         <td>' + ++i + '</td>';
                                ReportHTML += '                                         <td>' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                                ReportHTML += '                                         <td>' + item.SaleAmount.toFixed(2) + '</td>';
                                ReportHTML += '                                     </tr>';
                            });
                            ReportHTML += '                                         <tr>';
                            ReportHTML += '                                             <td colspan=1>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmountWithoutVAT").text()).toFixed(2)) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                            ReportHTML += '                                             <td><b>' + parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmountWithoutVAT").text()).toFixed(2) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
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
                                ReportHTML += '                                             <td colspan=1>' + '<b>TOTAL AMOUNT WITH VAT AND DISC : ' + toWords_WithFractionNumbers(parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()).toFixed(2)) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                                ReportHTML += '                                             <td><b>' + parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()).toFixed(2) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                                ReportHTML += '                                         </tr>';
                            }
                            //ReportHTML += '                                         <tr>';
                            //ReportHTML += '                                             <td colspan=2>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                            //ReportHTML += '                                             <td><b>Total Amount : ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                            //ReportHTML += '                                         </tr>';
                            ReportHTML += '                             </tbody>';
                            ReportHTML += '                         </table>';
                            ReportHTML += '                     </div>'
                            //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                            //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' / (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ')' + '</b>';
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
                            if ($("#cbPrintBankDetailsFromDefaults").prop("checked")) {
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
                            //ReportHTML += '                             <b>Subtotal: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmountWithoutVAT").text() + '</br>';
                            ////ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '</br>';
                            //ReportHTML += '                             <b>VAT(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pTaxAmount + '</br>';
                            ////ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '</br>';
                            //ReportHTML += '                             <b>Discount Taxes(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pDiscountAmount + '</br>';
                            //ReportHTML += '                             <b>Total: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' <b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + '</b></br>';
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

                            ReportHTML += '     <footer class="footer col-xs-12 m-t-lg ' + ($("#cbPrintFooterInvoice").prop("checked") ? "" : " hide ") + '" style="width:100%; position:absolute; bottom:0;">';
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
                            //ReportHTML += '         <div class="row text-center ' + ($("#cbPrintFooterInvoice").prop("checked") ? "" : " hide ") + '"><img src="/Content/Images/CompanyFooter.jpg" alt="logo"/></div>';
                            /****if KDS the use CompanyFooter-KDS-InvoiceTaxNumbers.jpg***/
                            if ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[1].split(' ')[0].toUpperCase() != "DEBIT") {
                                //ReportHTML += '         <div class="row text-right m-r">' + '  الشركة تخضع لنظام الدفعات المقدمة  ' + '</div>';
                                ReportHTML += '         <div class="row text-right m-r">' + '  يتنبه نحو عدم الخصم من تحت حساب الضريبة حيث أن الشركة تتبع نظام الدفعات المقدمة تطبيقا لأحكام لمادة (62) من القانون رقم 91 لسنة 2005  ' + '</div>';
                                //ReportHTML += '         <div class="row text-right m-r">' + '  يوقف صرف شيكات مصر للتأمين لحين تسوية التعويضات  ' + '</div>';
                                ReportHTML += '         <div class="row text-right m-r">' + '  لاتعتبر الفاتورة مسددة إلا بموجب إيصال سداد معتمد من الشركة بتمام قيمة الفاتورة  ' + '</div>';
                            }
                            else {
                                ReportHTML += '         <div class="row text-right m-r">' + '  يتنبه نحو عدم الخصم من تحت حساب الضريبة حيث أن الشركة تتبع نظام الدفعات المقدمة تطبيقا لأحكام لمادة (62) من القانون رقم 91 لسنة 2005  ' + '</div>';
                                //ReportHTML += '         <div class="row text-right m-r">' + '  يوقف صرف شيكات مصر للتأمين لحين تسوية التعويضات  ' + '</div>';
                            }
                            ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter' + ($("#hDefaultUnEditableCompanyName").val() == "KDS" ? '-KDS-InvoiceTaxNumbers' : "") + '.jpg"' + ' alt="logo"/></div>';
                            //else if ($("#hDefaultUnEditableCompanyName").val() == "KML") //if KML the print on original paper
                            //    ReportHTML += '             <br><br><br><br><br>';
                            ReportHTML += '     </footer>';
                            ReportHTML += '</html>';
                            mywindow.document.write(ReportHTML);
                            mywindow.document.close();
                        }//other invoice types for KDS
                    } //EOF if ($("#hDefaultUnEditableCompanyName").val() == "KDS")
                    else if ($("#hDefaultUnEditableCompanyName").val() == "EGL") {
                        var mywindow = window.open('', '_blank');
                        var ReportHTML = '';
                        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                        //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                        ReportHTML += '<html>';
                        ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                        //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + ')' + '</h3></div>';
                        ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0] + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(6, 4) + '</h3></div>';

                        ////ReportHTML += '             <div style="clear:both;"><br></div>';
                        if (pInvoiceHeader.InvoiceTypeName.split(' ')[0].toUpperCase() == "DEBIT")
                            ReportHTML += '         <div class="col-xs-1 m-l-n-md">&emsp;</div>';
                        else
                            ReportHTML += '         <div class="col-xs-1 m-l-n-md"><img src="/Content/Images/' + 'InvoiceSideStatement.jpg' + '" alt="logo"/></div>';
                        ReportHTML += '         <div class="col-xs-11 m-l-n-lg">';

                        ReportHTML += '             <div class="col-xs-6"><b>Bill to: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoicePartner").text() + '</div>';
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
                            ReportHTML += '             <div class="col-xs-6"><b>Operation: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceOperationCode").text() + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Currency: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</div>';
                        if ($("#cbPrintMBL").prop("checked"))
                            ReportHTML += '             <div class="col-xs-6"><b>MB/L No.: </b>' + pMasterBL + '</div>';
                        if ($("#cbPrintHBL").prop("checked")) {
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
                            ReportHTML += '                         <div class="col-xs-12 m-t-n"></div>';
                        ReportHTML += '                         <div class="col-xs-8">';
                        if ($("#cbPrintBankDetailsFromDefaults").prop("checked")) {
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
                        ReportHTML += '                             <b>Subtotal: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmountWithoutVAT").text()).toFixed(2) + '</br>';
                        //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '</br>';
                        ReportHTML += '                             <b>VAT(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pTaxAmount.toFixed(2) + '</br>';
                        //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '</br>';
                        ReportHTML += '                             <b>Discount Taxes(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pDiscountAmount.toFixed(2) + '</br>';
                        ReportHTML += '                             <b>Total: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' <b>' + parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()).toFixed(2) + '</b></br>';
                        ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()).toFixed(2)) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</br>';
                        if ($("#cbPrintUSDTotal").prop("checked") && $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text().trim() == "EGP")
                            ReportHTML += '                             <b>USD Total: </b>' + ' <b>' + ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() / $("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")).toFixed(2) + '</b></br>';
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
                        mywindow.document.write(ReportHTML);
                        mywindow.document.close();
                    } //EOF if ($("#hDefaultUnEditableCompanyName").val() == "EGL")
                    else if ($("#hDefaultUnEditableCompanyName").val() == "ABC") {
                        if (pInvoiceHeader.InvoiceTypeName.split(' ')[0].toUpperCase() == "FREIGHT"
                            //&& pOperationHeader.TransportType == AirTransportType
                            ) {
                            var mywindow = window.open('', '_blank');
                            var ReportHTML = '';
                            //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                            //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                            ReportHTML += '<html>';
                            ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                            ReportHTML += '         <body style="background-color:white;">';
                            ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                            //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + ')' + '</h3></div>';
                            ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[1] + '</h3></div>';

                            ReportHTML += '                 <div class="col-xs-4 m-l" style="text-align:center; border: 1px solid #000;border-radius:15px;">';
                            ReportHTML += '                     <b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoicePartner").text() + '</b><br>';
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
                            ReportHTML += '                             <td style="text-align:center;">No</td>';
                            ReportHTML += '                             <td style="text-align:center;">' + pInvoiceTypeCode + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0] + '-' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(8, 2) + '</td>';
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
                            ReportHTML += '                                         <tr>';
                            //ReportHTML += '                                             <td colspan=1>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                            ReportHTML += '                                             <td style="text-align:left;" colspan=1>' + '<b>TOTAL ' + '</b></td>';
                            ReportHTML += '                                             <td style="text-align:right;"><b>' + parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmountWithoutVAT").text()).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                            ReportHTML += '                                         </tr>';
                            ReportHTML += '                             </tbody>';
                            ReportHTML += '                         </table>';
                            ReportHTML += '                     </div>'

                            //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                            //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' / (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ')' + '</b>';
                            //ReportHTML += '                         </div>';
                            //ReportHTML += '                         <div class="clear m-l col-xs-6 text-left"><b>ACCOUNTING</b></div>';
                            //ReportHTML += '                         <div class="float-right text-right m-t-n col-xs-6 m-r"><b>APPROVAL</b></div>';
                            ReportHTML += '                         <div class="col-xs-8 m-t-n">';
                            if ($("#cbPrintBankDetailsFromDefaults").prop("checked")) {
                                ReportHTML += '                             <b>ONLY: ' + toWords_WithFractionNumbers(parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()).toFixed(2)) + ' </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</br></br>';
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
                            //ReportHTML += '                             <b>Subtotal: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmountWithoutVAT").text() + '</br>';
                            //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '</br>';
                            if (pTaxAmount != 0)
                                ReportHTML += '                             <b>VAT(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pTaxAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                            //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '</br>';
                            if (pDiscountAmount != 0)
                                ReportHTML += '                             <b>Discount Taxes(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pDiscountAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                            if (pTaxAmount != 0 || pDiscountAmount != 0)
                                ReportHTML += '                             <b>Total: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' <b>' + parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></br>';
                            ReportHTML += '                         </div>';
                            //ReportHTML += '                     </div>'; //of table-responsive
                            //ReportHTML += '                 </section>';
                            //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                            ReportHTML += '         </body>';

                            ReportHTML += '     <footer class="footer col-xs-12 ' + ($("#cbPrintFooterInvoice").prop("checked") ? "" : " hide ") + '" style="width:100%; position:absolute; bottom:0;">';
                            //ReportHTML += '         <div class="row">'

                            //ReportHTML += '         <div class="row text-right m-r m-t-sm">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
                            //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';

                            //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                            //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
                            ReportHTML += '     </footer>';
                            ReportHTML += '</html>';
                            mywindow.document.write(ReportHTML);
                            mywindow.document.close();
                        } //if ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[1].split(' ')[0].toUpperCase() == "FREIGHT"
                            //&& pOperationHeader.TransportType == 2/*Air*/) {
                        else {
                            var mywindow = window.open('', '_blank');
                            var ReportHTML = '';
                            //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                            //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                            ReportHTML += '<html>';
                            ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                            ReportHTML += '         <body style="background-color:white;">';
                            ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                            //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + ')' + '</h3></div>';
                            ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[1] + '</h3></div>';

                            ReportHTML += '                 <div class="col-xs-4 m-l" style="text-align:center; border: 1px solid #000;border-radius:15px;">';
                            ReportHTML += '                     <b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoicePartner").text() + '</b><br>';
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
                            ReportHTML += '                             <th style="text-align:center;">No</th>';
                            ReportHTML += '                             <td style="text-align:center;">' + pInvoiceTypeCode + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0] + '-' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(8, 2) + '</td>';
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
                            //ReportHTML += '                                             <td colspan=1>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                            ReportHTML += '                                             <td style="text-align:left;" colspan=1>' + '<b>TOTAL ' + '</b></td>';
                            ReportHTML += '                                             <td style="text-align:right;"><b>' + parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmountWithoutVAT").text()).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                            ReportHTML += '                                         </tr>';
                            ReportHTML += '                             </tbody>';
                            ReportHTML += '                         </table>';
                            ReportHTML += '                     </div>'

                            //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                            //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' / (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ')' + '</b>';
                            //ReportHTML += '                         </div>';
                            //ReportHTML += '                         <div class="clear m-l col-xs-6 text-left"><b>ACCOUNTING</b></div>';
                            //ReportHTML += '                         <div class="float-right text-right m-t-n col-xs-6 m-r"><b>APPROVAL</b></div>';
                            ReportHTML += '                         <div class="col-xs-8 m-t-n">';
                            if ($("#cbPrintBankDetailsFromDefaults").prop("checked")) {
                                ReportHTML += '                             <b>ONLY: ' + toWords_WithFractionNumbers(parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()).toFixed(2)) + ' </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</br></br>';
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
                            //ReportHTML += '                             <b>Subtotal: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmountWithoutVAT").text() + '</br>';
                            //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '</br>';
                            if (pTaxAmount != 0)
                                ReportHTML += '                             <b>VAT(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pTaxAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                            //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '</br>';
                            if (pDiscountAmount != 0)
                                ReportHTML += '                             <b>Discount Taxes(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pDiscountAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</br>';
                            ReportHTML += '                             <b>Total: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' <b>' + parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></br>';
                            ReportHTML += '                         </div>';
                            //ReportHTML += '                     </div>'; //of table-responsive
                            //ReportHTML += '                 </section>';
                            //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                            ReportHTML += '         </body>';

                            ReportHTML += '     <footer class="footer col-xs-12 ' + ($("#cbPrintFooterInvoice").prop("checked") ? "" : " hide ") + '" style="width:100%; position:absolute; bottom:0;">';
                            //ReportHTML += '         <div class="row">'

                            //ReportHTML += '         <div class="row text-right m-r m-t-sm">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
                            //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';

                            //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                            //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
                            ReportHTML += '     </footer>';
                            ReportHTML += '</html>';
                            mywindow.document.write(ReportHTML);
                            mywindow.document.close();
                        }
                    } //else if ($("#hDefaultUnEditableCompanyName").val() == "ABC") {
                    else if ($("#hDefaultUnEditableCompanyName").val() == "ARK") {
                        var mywindow = window.open('', '_blank');
                        var ReportHTML = '';
                        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                        //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                        ReportHTML += '<html>';
                        ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                        //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + ')' + '</h3></div>';
                        ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[1] + '</h3></div>';
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
                        //ReportHTML += '                     <b>Invoice No : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(3, 2) + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(8, 2) + '/' + /*pInvoiceNumber*/$("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + '<br>';
                        ReportHTML += '                     <b>No : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0] + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(6, 4) + '<br>';
                        ReportHTML += '                     <b>Payment Due by : </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '<br>';
                        if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                            ReportHTML += '                 <b>Operation : </b>' + pMasterOperationCode;
                        else
                            ReportHTML += '                     <b>Operation : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceOperationCode").text() + '<br>';
                        ReportHTML += '                     <b>Currency : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '<br><br><br><br><br>';
                        ReportHTML += '                 </div>';
                        //ReportHTML += '             </div>';
                        ReportHTML += '             <table class="col-xs-8 m-l m-t-n-lg b-t b-light text-sm table-bordered" style="text-align:left; width:auto; border:solid #000;">';
                        ReportHTML += '                 <td>';
                        ReportHTML += '                     <b>Bill To: </b><br>';
                        ReportHTML += '                     <b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoicePartner").text() + '</b><br>';
                        ReportHTML += '                     ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                        ReportHTML += '                     ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2 + '<br>'));
                        ReportHTML += '                     ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                        ReportHTML += '                     ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                        ReportHTML += '                 </td>';
                        ReportHTML += '             </table>';

                        ReportHTML += '             <div style="clear:both;"><br></div>';
                        if ($("#cbPrintMBL").prop("checked"))
                            ReportHTML += '             <div class="col-xs-6"><b>MB/L No.: </b>' + pMasterBL + '</div>';
                        if ($("#cbPrintHBL").prop("checked")) {
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
                            ReportHTML += '                                         <td>' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) /*+ (item.Notes == 0 || item.Notes == "" ? "" : '-' + item.Notes)*/ + '</td>';
                            ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                            ReportHTML += '                                         <td>' + item.SalePrice + '</td>';
                            ReportHTML += '                                         <td>' + item.SaleAmount + '</td>';
                            ReportHTML += '                                     </tr>';
                        });
                        //ReportHTML += '                                         <tr>';
                        //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                        //ReportHTML += '                                             <td><b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + '</b></td>';
                        //ReportHTML += '                                         </tr>';

                        //ReportHTML += '                                         <tr>';
                        //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                        //ReportHTML += '                                             <td><b>Total Amount : ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                        //ReportHTML += '                                         </tr>';
                        ReportHTML += '                             </tbody>';
                        ReportHTML += '                         </table>';
                        ReportHTML += '                     </div>'
                        //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                        //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' / (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ')' + '</b>';
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
                        //if ($("#cbPrintBankDetailsFromDefaults").prop("checked")) {
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
                            ReportHTML += '                             <b>Subtotal: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmountWithoutVAT").text()).toFixed(2) + '</br>';
                            //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '</br>';
                            if (pTaxAmount != 0)
                                ReportHTML += '                             <b>VAT(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pTaxAmount.toFixed(2) + '</br>';
                            //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '</br>';
                            if (pDiscountAmount != 0)
                                ReportHTML += '                             <b>Deduction Tax(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pDiscountAmount.toFixed(2) + '</br>';
                        }
                        ReportHTML += '                             <b>Total: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' <b>' + parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()).toFixed(2) + '</b></br>';
                        ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()).toFixed(2)) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</br>';
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
                            ReportHTML += '         <div class="text-right m-r-lg"><img src="/Content/Images/CompanyStamp.jpg" alt="footer"/></div>';

                        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                        //ReportHTML += '         <div class="row text-right m-r m-t-sm">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
                        //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
                        ReportHTML += '     </footer>';
                        ReportHTML += '</html>';
                        mywindow.document.write(ReportHTML);
                        mywindow.document.close();
                    } //else if ($("#hDefaultUnEditableCompanyName").val() != "ARK") {
                    else if ($("#hDefaultUnEditableCompanyName").val() == "CQL") {
                        var mywindow = window.open('', '_blank');
                        var ReportHTML = '';
                        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                        //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                        ReportHTML += '<html>';
                        ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                        if (!$("#cbPrintHeaderInvoice").prop("checked"))
                            ReportHTML += '                 <div class="col-xs-12 text-center">&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br></div>';
                        //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + ')' + '</h3></div>';
                        ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[1] + '</h3></div>';
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
                        //ReportHTML += '                     <b>Invoice No : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(3, 2) + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(8, 2) + '/' + /*pInvoiceNumber*/$("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + '<br>';
                        ReportHTML += '                     <b>No : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0] + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(6, 4) + '<br>';
                        ReportHTML += '                     <b>Payment Due by : </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '<br>';
                        ReportHTML += '                     <b>Reference No. : </b>' + (pCustomerReference == 0 ? "N/A" : pCustomerReference) + '<br>';
                        if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                            ReportHTML += '                 <b>Operation : </b>' + pMasterOperationCode;
                        else
                            ReportHTML += '                     <b>Operation : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceOperationCode").text() + '<br>';
                        ReportHTML += '                     <b>Currency : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '<br>';
                        ReportHTML += '                     <b>Salesman : </b>' + pSalesman + '<br><br>';
                        ReportHTML += '                 </div>';
                        //ReportHTML += '             </div>';
                        ReportHTML += '             <table class="col-xs-8 m-l m-t-n-lg b-t b-light text-sm table-bordered" style="text-align:left; width:auto; border:solid #000;">';
                        ReportHTML += '                 <td>';
                        ReportHTML += '                     <b>Bill To: </b><br>';
                        ReportHTML += '                     <b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoicePartner").text() + '</b><br>';
                        ReportHTML += '                     ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                        ReportHTML += '                     ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2 + '<br>'));
                        ReportHTML += '                     ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                        ReportHTML += '                     ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                        ReportHTML += '                 </td>';
                        ReportHTML += '             </table>';

                        ReportHTML += '             <div style="clear:both;"><br></div>';
                        if ($("#cbPrintMBL").prop("checked"))
                            ReportHTML += '             <div class="col-xs-6"><b>MB/L No.: </b>' + pMasterBL + '</div>';
                        if ($("#cbPrintHBL").prop("checked")) {
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
                        //ReportHTML += '                                         <tr>';
                        //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                        //ReportHTML += '                                             <td><b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + '</b></td>';
                        //ReportHTML += '                                         </tr>';

                        ReportHTML += '                             </tbody>';
                        ReportHTML += '                         </table>';
                        ReportHTML += '                     </div>'
                        //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                        //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' / (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ')' + '</b>';
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
                        if ($("#cbPrintBankDetailsFromDefaults").prop("checked")) {
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
                            ReportHTML += '                             <b>Subtotal: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmountWithoutVAT").text() + '</br>';
                        //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '</br>';
                        if (pTaxAmount != 0)
                            ReportHTML += '                             <b>VAT(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pTaxAmount + '</br>';
                        //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '</br>';
                        if (pDiscountAmount != 0)
                            ReportHTML += '                             <b>Discount Taxes(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pDiscountAmount + '</br>';
                        ReportHTML += '                             <b>Total: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' <b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + '</b></br>';
                        ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</br>';
                        ReportHTML += '                         </div>';
                        //ReportHTML += '                     </div>'; //of table-responsive
                        //ReportHTML += '                 </section>';
                        //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                        ReportHTML += '         </body>';

                        ReportHTML += '     <footer class="footer col-xs-12 ' + ($("#cbPrintFooterInvoice").prop("checked") ? "" : " hide ") + '" style="width:100%; position:absolute; bottom:0;">';
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
                        mywindow.document.write(ReportHTML);
                        mywindow.document.close();
                    } //EOF if ($("#hDefaultUnEditableCompanyName").val() == "CQL")
                    else if ($("#hDefaultUnEditableCompanyName").val() == "NAV") {
                        var mywindow = window.open('', '_blank');
                        var ReportHTML = '';
                        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                        //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                        ReportHTML += '<html>';
                        ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                        //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + ')' + '</h3></div>';
                        ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0] + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(6, 4) + '</h3></div>';
                        //ReportHTML += '                 <div class="col-xs-8">';
                        //ReportHTML += '                     <table class="col-xs-12 b-t b-light text-sm table-bordered" style="text-align:left; width:auto; border:solid #000;">';
                        //ReportHTML += '                         <td>';
                        //ReportHTML += '                             <b>Bill To: </b><br>';
                        //ReportHTML += '                             <b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoicePartner").text() + '</b><br>';
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
                        ////ReportHTML += '                     <b>No : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0] + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(6, 4) + '<br>';
                        ////ReportHTML += '                     <b>Payment Due by : </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '<br>';
                        //ReportHTML += '                     <b>Reference No. : </b>' + (pCustomerReference == 0 ? "N/A" : pCustomerReference) + '<br>';
                        //ReportHTML += '                     <b>Operation : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceOperationCode").text() + '<br>';
                        //if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                        //    ReportHTML += '                 <b>Master Operation : </b>' + pMasterOperationCode;
                        //ReportHTML += '                     <b>Currency : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '<br>';
                        ////ReportHTML += '                     <b>Salesman : </b>' + pSalesman + '<br><br>';
                        //ReportHTML += '                 </div>';
                        ////ReportHTML += '             </div>';

                        ////ReportHTML += '             <div style="clear:both;"><br></div>';
                        //ReportHTML += '         <div class="col-xs-1 m-l-n-md"><img src="/Content/Images/' + 'InvoiceSideStatement-NAV.jpg' + '" alt="logo"/></div>';
                        //ReportHTML += '         <div class="col-xs-11 m-l-n-lg">';
                        ReportHTML += '         <div class="col-xs-12">';
                        ReportHTML += '             <div class="col-xs-6"><b>Bill to: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoicePartner").text() + '</div>';
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
                            ReportHTML += '             <div class="col-xs-6"><b>Operation: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceOperationCode").text() + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Currency: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</div>';
                        if ($("#cbPrintMBL").prop("checked"))
                            ReportHTML += '             <div class="col-xs-6"><b>MB/L No.: </b>' + pMasterBL + '</div>';
                        if ($("#cbPrintHBL").prop("checked")) {
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
                            ReportHTML += '                         <div class="col-xs-12 m-t-n"></div>';
                        ReportHTML += '                         <div class="col-xs-8">';
                        if ($("#cbPrintBankDetailsFromDefaults").prop("checked")) {
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
                        ReportHTML += '                             <b>Subtotal: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmountWithoutVAT").text() + '</br>';
                        //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '</br>';
                        ReportHTML += '                             <b>VAT(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pTaxAmount + '</br>';
                        //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '</br>';
                        ReportHTML += '                             <b>Discount Taxes(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pDiscountAmount + '</br>';
                        ReportHTML += '                             <b>Total: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' <b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + '</b></br>';
                        ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</br>';
                        if ($("#cbPrintUSDTotal").prop("checked") && $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text().trim() == "EGP")
                            ReportHTML += '                             <b>USD Total: </b>' + ' <b>' + ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() / $("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")).toFixed(2) + '</b></br>';
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
                        if ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[1].split(' ')[0].toUpperCase() != "DEBIT") {
                            ReportHTML += '         <div class="row text-right m-r" style="font-size:85%;">' + '  شركة نافيجيتور ايجيبت للخدماث الملاحية - سجل تجاري رقم: 67992  -  سجل تجاري شرق – الاسكندرية - بطاقة ضريبية رقم: 328197459 - ملف ضريبي: 08-00-554-00040-5 -  مامورية ضرائب رمل ثان – الاسكندرية - تسجيل مبيعات: 328197459 -  ترخيص بمكتب تخليص جمركي: 5862/ 2002067 / 1  - بطاقة استيرادية: 49485  ' + '</div>';
                        }
                        //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                        //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
                        ReportHTML += '         <div class="row text-center m-t ' + ($("#cbPrintFooterInvoice").prop("checked") ? "" : " hide ") + '"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                        //else
                        //    ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                        ReportHTML += '     </footer>';
                        ReportHTML += '</html>';
                        mywindow.document.write(ReportHTML);
                        mywindow.document.close();
                    } //EOF if ($("#hDefaultUnEditableCompanyName").val() == "NAV")
                    else if ($("#hDefaultUnEditableCompanyName").val() == "NIL") {
                        var mywindow = window.open('', '_blank');
                        var ReportHTML = '';
                        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                        //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                        ReportHTML += '<html>';
                        ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                        //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + ')' + '</h3></div>';
                        ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0] + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(6, 4) + '</h3></div>';

                        ////ReportHTML += '             <div style="clear:both;"><br></div>';
                        //ReportHTML += '         <div class="col-xs-1 m-l-n-md"><img src="/Content/Images/' + 'InvoiceSideStatement.jpg' + '" alt="logo"/></div>';
                        //ReportHTML += '         <div class="col-xs-11 m-l-n-lg">';
                        ReportHTML += '         <div class="col-xs-12">';
                        ReportHTML += '             <div class="col-xs-9"><b>Bill to: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoicePartner").text() + '</div>';
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
                            ReportHTML += '             <div class="col-xs-6" style="clear:both;"><b>Operation: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceOperationCode").text() + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Service Scope: </b>' + (pOperationHeader.MoveTypeName == 0 ? "" : pOperationHeader.MoveTypeName) + '</div>';
                        //if ($("#cbPrintMBL").prop("checked"))
                        ReportHTML += '             <div class="col-xs-6"><b>' + (pOperationHeader.TransportType == AirTransportType ? 'AWB' : 'MB/L No.') + ': </b>' + pMasterBL + '</div>';
                        //if ($("#cbPrintHBL").prop("checked")) {
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
                        ReportHTML += '             <div class="col-xs-6"><b>Currency: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</div>';
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
                        ReportHTML += '                                         <tr>';
                        ReportHTML += '                                             <td colspan=5 style="">' + '<b>ONLY : </b>' + toWords_WithFractionNumbers(parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()).toFixed(2)) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
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
                        if ($("#cbPrintBankDetailsFromDefaults").prop("checked")) {
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
                            ReportHTML += '                             <b>Subtotal: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmountWithoutVAT").text()).toFixed(2) + '</br>';
                        //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '</br>';
                        if (pTaxAmount != 0)
                            ReportHTML += '                             <b>VAT(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pTaxAmount.toFixed(2) + '</br>';
                        //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '</br>';
                        if (pDiscountAmount != 0)
                            ReportHTML += '                             <b>Discount(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pDiscountAmount.toFixed(2) + '</br>';
                        ReportHTML += '                             <b>Total: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' <b>' + parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()).toFixed(2) + '</b></br>';
                        //ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()).toFixed(2)) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</br>';
                        if ($("#cbPrintUSDTotal").prop("checked") && $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text().trim() == "EGP")
                            ReportHTML += '                             <b>USD Total: </b>' + ' <b>' + ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() / $("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")).toFixed(2) + '</b></br>';
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
                        mywindow.document.write(ReportHTML);
                        mywindow.document.close();
                    } //EOF if ($("#hDefaultUnEditableCompanyName").val() == "NIL")
                    else if ($("#hDefaultUnEditableCompanyName").val() == "DSE" || $("#hDefaultUnEditableCompanyName").val() == "DSC") {
                        var mywindow = window.open('', '_blank');
                        var ReportHTML = '';
                        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                        //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                        ReportHTML += '<html>';
                        ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                        ReportHTML += '                 <div class="col-xs-12 m-l-n">' + pAddressLine1 + ' ' + pAddressLine2 + ' ' + pAddressLine3 + '</div>';
                        ReportHTML += '                 <div class="col-xs-12 m-l-n">Tel:' + pPhones + ' &emsp;Fax: ' + pFaxes + '</div>';
                        //ReportHTML += '                 <div class="col-xs-12"><hr style="border-width: 1px;" /></div>';
                        ReportHTML += '                 <div style="width:98%;height:0.5px;border:0.5px solid #000;"></div>';

                        ReportHTML += '                 <div class="col-xs-12 text-center"><h3>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[1] + '</h3></div>';
                        ReportHTML += '                 <div class="col-xs-5">';
                        ReportHTML += '                     <b>Bill To: ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoicePartner").text() + '</b><br>';
                        ReportHTML += '                     ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                        ReportHTML += '                     ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2 + '<br>'));
                        ReportHTML += '                     ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                        ReportHTML += '                     ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                        ReportHTML += '                 </div>';

                        ReportHTML += '                 <div class="col-xs-2"></div>';

                        ReportHTML += '                 <div class="col-xs-5">';
                        //ReportHTML += '                     <b>Date : </b>' + getTodaysDateInddMMyyyyFormat() + '<br>';
                        ReportHTML += '                     <b>Date : </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '<br>';
                        //ReportHTML += '                     <b>Invoice No : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(3, 2) + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(8, 2) + '/' + /*pInvoiceNumber*/$("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + '<br>';
                        ReportHTML += '                     <b>No : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0] + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(6, 4) + '<br>';
                        ReportHTML += '                     <b>Payment Due by : </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '<br>';
                        ReportHTML += '                     <b>Operation : </b>' + (pOperationHeader.Reference == 0 ? "" : pOperationHeader.Reference) + '<br>';
                        //if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                        //    ReportHTML += '                 <b>Operation : </b>' + pMasterOperationCode;
                        //else
                        //    ReportHTML += '                     <b>Operation : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceOperationCode").text() + '<br>';
                        ReportHTML += '                     <b>Currency : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '<br>' + '<br>';
                        ReportHTML += '                 </div>';
                        //ReportHTML += '             </div>';

                        ReportHTML += '             <div style="clear:both;"></div>';
                        ReportHTML += '             <div class="col-xs-7"><b>Shipper: </b>' + pShipperName + '</div>';
                        ReportHTML += '             <div class="col-xs-5"><b>Consignee: </b>' + pConsigneeName + '</div>';
                        ReportHTML += '             <div class="col-xs-7"><b>' + (pOperationHeader.TransportType == AirTransportType ? 'ORGN' : 'POL') + ': </b>' + pPOLName + '</div>';
                        ReportHTML += '             <div class="col-xs-5"><b>' + (pOperationHeader.TransportType == AirTransportType ? 'DEST' : 'POD') + ': </b>' + pPODName + '</div>';
                        var _NextSize = 7;
                        if ($("#cbPrintMBL").prop("checked")) {
                            ReportHTML += '             <div class="col-xs-' + _NextSize + '"><b>' + (pOperationHeader.TransportType == AirTransportType ? 'MAWB' : 'MBL') + ': </b>' + pMasterBL + '</div>';
                            _NextSize = 12 - _NextSize;
                        }
                        if ($("#cbPrintHBL").prop("checked")) {
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
                        if (pTaxAmount != 0 || pDiscountAmount != 0) {
                            ReportHTML += '                                         <tr>';
                            ReportHTML += '                                             <td>' + '<b>Subtotal : ' + '</b></td>';
                            ReportHTML += '                                             <td></td>';
                            ReportHTML += '                                             <td></td>';
                            ReportHTML += '                                             <td><b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmountWithoutVAT").text() + '</b></td>';
                            ReportHTML += '                                         </tr>';
                        }
                        if (pTaxAmount != 0) {
                            ReportHTML += '                                         <tr>';
                            ReportHTML += '                                             <td>' + '<b>VAT(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '%) : ' + '</b></td>';
                            ReportHTML += '                                             <td></td>';
                            ReportHTML += '                                             <td></td>';
                            ReportHTML += '                                             <td><b>' + pTaxAmount + '</b></td>';
                            ReportHTML += '                                         </tr>';
                        }
                        if (pDiscountAmount != 0) {
                            ReportHTML += '                                         <tr>';
                            ReportHTML += '                                             <td>' + '<b>Discount(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '%) : ' + '</b></td>';
                            ReportHTML += '                                             <td></td>';
                            ReportHTML += '                                             <td></td>';
                            ReportHTML += '                                             <td><b>' + pDiscountAmount + '</b></td>';
                            ReportHTML += '                                         </tr>';
                        }

                        ReportHTML += '                                         <tr>';
                        ReportHTML += '                                             <td>' + '<b>ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                        ReportHTML += '                                             <td></td>';
                        ReportHTML += '                                             <td></td>';
                        ReportHTML += '                                             <td><b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + '</b></td>';
                        ReportHTML += '                                         </tr>';

                        ReportHTML += '                             </tbody>';
                        ReportHTML += '                         </table>';
                        ReportHTML += '                     </div>'
                        //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                        //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' / (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ')' + '</b>';
                        //ReportHTML += '                         </div>';
                        ReportHTML += '                         <div class="col-xs-9"></div>';
                        ReportHTML += '                         <div class="text-center col-xs-3"><b><i>Prepared By ,</i></b></div>';
                        ReportHTML += '                         <div class="col-xs-9"></div>';
                        ReportHTML += '                         <div class="text-center col-xs-3"><b><i>' + $("#hLoggedUserNameNotLogin").val() + '</i></b></div>';

                        //ReportHTML += '                         <div class="col-xs-12 m-t-n">';
                        //if (pTaxAmount != 0 || pDiscountAmount != 0)
                        //    ReportHTML += '                             <b>Subtotal: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmountWithoutVAT").text() + '</br>';
                        ////ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '</br>';
                        //if (pTaxAmount != 0)
                        //    ReportHTML += '                             <b>VAT(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pTaxAmount + '</br>';
                        ////ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '</br>';
                        //if (pDiscountAmount != 0)
                        //    ReportHTML += '                             <b>Discount Taxes(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pDiscountAmount + '</br>';
                        //ReportHTML += '                             <b>Total: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' <b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + '</b></br>';
                        //ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</br>';
                        //ReportHTML += '                         </div>';
                        //ReportHTML += '                     </div>'; //of table-responsive
                        //ReportHTML += '                 </section>';
                        //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                        ReportHTML += '         </body>';

                        ReportHTML += '     <footer class="footer col-xs-12 m-t ' + ($("#cbPrintFooterInvoice").prop("checked") ? "" : " hide ") + '" style="width:100%; position:absolute; bottom:0;">';
                        //ReportHTML += '         <div class="row">'
                        //ReportHTML += '             <div class="col-xs-8 m-l"><b><i>' + ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.DirectionType").text() == 1
                        //                                                                ? 'Import Manager'
                        //                                                                : ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.DirectionType").text() == 2 ? 'Export Manager' : 'Domestic Manager')
                        //                                                                ) + '</i></b></div>';
                        //ReportHTML += '             <div class="col-xs-4 m-t-n-md float-right"><b><i>Accountant Signature</i></b></div>';
                        //ReportHTML += '         </div>'
                        // ReportHTML += '         <div class="row text-right m-r m-t-sm">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
                        // ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
                        if ($("#hDefaultUnEditableCompanyName").val() == "DSE" || $("#hDefaultUnEditableCompanyName").val() == "DSC")
                            ReportHTML += '         <div class="row text-center m-t-lg ' + ($("#cbPrintFooterInvoice").prop("checked") ? "" : " hide ") + '"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                        //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                        //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
                        ReportHTML += '     </footer>';
                        ReportHTML += '</html>';
                        mywindow.document.write(ReportHTML);
                        mywindow.document.close();
                    } //else if ($("#hDefaultUnEditableCompanyName").val() == "DSE" || $("#hDefaultUnEditableCompanyName").val() == "DSC") {
                    else if ($("#hDefaultUnEditableCompanyName").val() == "SGA") {
                        var mywindow = window.open('', '_blank');
                        var ReportHTML = '';
                        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                        //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                        ReportHTML += '<html>';
                        ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                        //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + ')' + '</h3></div>';
                        ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[1]
                            + " No. "
                            + ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[1].split(' ')[0].toUpperCase() == "DEBIT" ? "D" : "")
                            + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0] + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(6, 4)
                            + '</h3></div>';
                        ReportHTML += '                 <div class="col-xs-12">';
                        ReportHTML += '                     <b>' + $("#hDefaultCompanyName").val() + '</b><br>';
                        ReportHTML += '                     <b>Date : </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '<br>';
                        //ReportHTML += '                     <b>Invoice No : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(3, 2) + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(8, 2) + '/' + /*pInvoiceNumber*/$("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + '<br>';
                        ReportHTML += '                     <b>Payment Due by : </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '<br>';
                        if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                            ReportHTML += '                 <b>Operation : </b>' + pMasterOperationCode;
                        else
                            ReportHTML += '                     <b>Operation : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceOperationCode").text() + '<br>';
                        ReportHTML += '                     <b>Currency : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '<br>';
                        ReportHTML += '                     <b>Salesman : </b>' + pSalesman + '<br><br>';
                        ReportHTML += '                 </div>';
                        //ReportHTML += '             </div>';
                        ReportHTML += '             <table class="col-xs-8 m-l m-t-n b-t b-light text-sm table-bordered" style="text-align:left; width:auto; border:solid #000;">';
                        ReportHTML += '                 <td>';
                        ReportHTML += '                     <b>Bill To: </b><br>';
                        ReportHTML += '                     <b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoicePartner").text() + '</b><br>';
                        ReportHTML += '                     ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                        ReportHTML += '                     ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2 + '<br>'));
                        ReportHTML += '                     ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                        ReportHTML += '                     ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                        ReportHTML += '                 </td>';
                        ReportHTML += '             </table>';

                        ReportHTML += '             <div class="m-t-xs" style="clear:both;"></div>';
                        if ($("#cbPrintMBL").prop("checked"))
                            ReportHTML += '             <div class="col-xs-6"><b>MB/L No.: </b>' + pMasterBL + '</div>';
                        if ($("#cbPrintHBL").prop("checked")) {
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
                        //ReportHTML += '                                         <tr>';
                        //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                        //ReportHTML += '                                             <td><b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + '</b></td>';
                        //ReportHTML += '                                         </tr>';

                        ReportHTML += '                             </tbody>';
                        ReportHTML += '                         </table>';
                        ReportHTML += '                     </div>'
                        //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                        //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' / (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ')' + '</b>';
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
                        if ($("#cbPrintBankDetailsFromDefaults").prop("checked")) {
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
                            ReportHTML += '                             <b>Subtotal: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmountWithoutVAT").text()).toFixed(2) + '</br>';
                        //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '</br>';
                        if (pTaxAmount != 0)
                            ReportHTML += '                             <b>VAT(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pTaxAmount.toFixed(2) + '</br>';
                        //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '</br>';
                        if (pDiscountAmount != 0)
                            ReportHTML += '                             <b>Discount Taxes(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pDiscountAmount.toFixed(2) + '</br>';
                        ReportHTML += '                             <b>Total: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' <b>' + parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()).toFixed(2) + '</b></br>';
                        ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()).toFixed(2)) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</br>';
                        ReportHTML += '                         </div>';
                        //ReportHTML += '                     </div>'; //of table-responsive
                        //ReportHTML += '                 </section>';
                        //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                        ReportHTML += '         </body>';
                        ReportHTML += '     <footer class="footer col-xs-12 ' + ($("#cbPrintFooterInvoice").prop("checked") ? "" : " hide ") + '" style="width:100%; position:absolute; bottom:0;">';
                        //ReportHTML += '         <div class="row">'
                        //ReportHTML += '             <div class="col-xs-8 m-l"><b><i>' + ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.DirectionType").text() == 1
                        //                                                                ? 'Import Manager'
                        //                                                                : ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.DirectionType").text() == 2 ? 'Export Manager' : 'Domestic Manager')
                        //                                                                ) + '</i></b></div>';
                        //ReportHTML += '             <div class="col-xs-4 m-t-n-md float-right"><b><i>Accountant Signature</i></b></div>';
                        //ReportHTML += '         </div>'
                        ReportHTML += '         <div class="row text-right m-r m-t-sm">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
                        ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
                        ReportHTML += '         <div class="row text-center m-t ' + ($("#cbPrintFooterInvoice").prop("checked") ? "" : " hide ") + '"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                        //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                        //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
                        ReportHTML += '     </footer>';
                        ReportHTML += '</html>';
                        mywindow.document.write(ReportHTML);
                        mywindow.document.close();
                    } //else if ($("#hDefaultUnEditableCompanyName").val() == "SGA") {
                    else if ($("#hDefaultUnEditableCompanyName").val() == "BSL"
                        || $("#hDefaultUnEditableCompanyName").val() == "FAI"
                        || $("#hDefaultUnEditableCompanyName").val() == "HOR"
                        || $("#hDefaultUnEditableCompanyName").val() == "LAT"
                        || $("#hDefaultUnEditableCompanyName").val() == "NVS"
                        || $("#hDefaultUnEditableCompanyName").val() == "RLL"
                        || $("#hDefaultUnEditableCompanyName").val() == "STR"
                        || $("#hDefaultUnEditableCompanyName").val() == "TRL"
                        || $("#hDefaultUnEditableCompanyName").val() == "VER"
                        ) {
                        var mywindow = window.open('', '_blank');
                        var ReportHTML = '';
                        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                        //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                        ReportHTML += '<html>';
                        ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                        //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + ')' + '</h3></div>';
                        ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[1] + '</h3></div>';
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
                        //ReportHTML += '                     <b>Invoice No : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(3, 2) + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(8, 2) + '/' + /*pInvoiceNumber*/$("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + '<br>';
                        ReportHTML += '                     <b>No : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0] + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(6, 4) + '<br>';
                        ReportHTML += '                     <b>Payment Due by : </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '<br>';
                        ReportHTML += '                     <b>Reference No. : </b>' + (pCustomerReference == 0 ? "N/A" : pCustomerReference) + '<br>';
                        if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                            ReportHTML += '                 <b>Operation : </b>' + pMasterOperationCode;
                        else
                            ReportHTML += '                     <b>Operation : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceOperationCode").text() + '<br>';
                        ReportHTML += '                     <b>Currency : </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '<br>';
                        ReportHTML += '                     <b>Salesman : </b>' + pSalesman + '<br><br>';
                        ReportHTML += '                 </div>';
                        //ReportHTML += '             </div>';
                        ReportHTML += '             <table class="col-xs-8 m-l m-t-n b-t b-light text-sm table-bordered" style="text-align:left; width:auto; border:solid #000;">';
                        ReportHTML += '                 <td>';
                        ReportHTML += '                     <b>Bill To: </b><br>';
                        ReportHTML += '                     <b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoicePartner").text() + '</b><br>';
                        ReportHTML += '                     ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                        ReportHTML += '                     ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2 + '<br>'));
                        ReportHTML += '                     ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                        ReportHTML += '                     ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                        ReportHTML += '                 </td>';
                        ReportHTML += '             </table>';

                        ReportHTML += '             <div style="clear:both;"></div>';
                        if ($("#cbPrintMBL").prop("checked"))
                            ReportHTML += '             <div class="col-xs-6"><b>MB/L No.: </b>' + pMasterBL + '</div>';
                        if ($("#cbPrintHBL").prop("checked")) {
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
                        if ($("#hDefaultUnEditableCompanyName").val() == "VER")
                            ReportHTML += '             <div class="col-xs-6"><b>Line: </b>' + (pOperationHeader.LineName == 0 ? "" : pOperationHeader.LineName) + '</div>';
                        if ($("#hDefaultUnEditableCompanyName").val() == "HOR") {
                            ReportHTML += '             <div class="col-xs-6"><b>Commodity: </b>' + (pOperationHeader.CommodityName == 0 ? "" : pOperationHeader.CommodityName) + '</div>';
                            ReportHTML += '             <div class="col-xs-6"><b>ETA: </b>' + (pETA == "01/01/1900" || pETA == "1/1/1900" ? "N/A" : pETA) + '</div>';
                            ReportHTML += '             <div class="col-xs-6"><b>ETD: </b>' + (pETD == "01/01/1900" || pETD == "1/1/1900" ? "N/A" : pETD) + '</div>';
                            ReportHTML += '             <div class="col-xs-6"><b>Line: </b>' + (pOperationHeader.LineName == 0 ? "" : pOperationHeader.LineName) + '</div>';
                            if (pOperationHeader.TransportType == OceanTransportType)
                                ReportHTML += '             <div class="col-xs-6"><b>Vessel: </b>' + (pOperationHeader.VesselName == 0 ? "" : pOperationHeader.VesselName) + '</div>';
                        }
                        if ($("#hDefaultUnEditableCompanyName").val() == "RLL") {
                            if (pOperationHeader.TransportType == OceanTransportType)
                                ReportHTML += '             <div class="col-xs-6"><b>Vessel-Voy: </b>' + (pOperationHeader.VesselName == 0 ? "" : pOperationHeader.VesselName) + (pOperationHeader.VoyageOrTruckNumber == 0 ? "" : (" - " + pOperationHeader.VoyageOrTruckNumber)) + '</div>';
                            ReportHTML += '             <div class="col-xs-6"><b>Customs Cert. No.: </b>' + (pOperationHeader.CertificateNumber == 0 ? "" : pOperationHeader.CertificateNumber) + '</div>';
                            ReportHTML += '             <div class="col-xs-6"><b>Customs Cert. Date: </b>' + (pOperationHeader.CertificateDate == "0" ? "" : pOperationHeader.CertificateDate) + '</div>';
                            ReportHTML += '             <div class="col-xs-6"><b>ATA POL: </b>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pOperationHeader.ATAPOLDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pOperationHeader.ATAPOLDate))) + '</div>';
                        }
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
                        //ReportHTML += '                                         <tr>';
                        //ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</b></td>';
                        //ReportHTML += '                                             <td><b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + '</b></td>';
                        //ReportHTML += '                                         </tr>';

                        ReportHTML += '                             </tbody>';
                        ReportHTML += '                         </table>';
                        ReportHTML += '                     </div>'
                        //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                        //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' / (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ')' + '</b>';
                        //ReportHTML += '                         </div>';
                        //ReportHTML += '                         <div class="clear m-l col-xs-6 text-left"><b>ACCOUNTING</b></div>';
                        //ReportHTML += '                         <div class="float-right text-right m-t-n col-xs-6 m-r"><b>APPROVAL</b></div>';
                        ReportHTML += '                         <div class="col-xs-7 m-t-n">';
                        if ($("#cbPrintBankDetailsFromDefaults").prop("checked")) {
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
                            ReportHTML += '                             <b>Subtotal: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmountWithoutVAT").text()).toFixed(2) + '</br>';
                        //ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '</br>';
                        if (pTaxAmount != 0)
                            ReportHTML += '                             <b>VAT(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pTaxAmount.toFixed(2) + '</br>';
                        //ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '</br>';
                        if (pDiscountAmount != 0)
                            ReportHTML += '                             <b>Discount Taxes(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pDiscountAmount.toFixed(2) + '</br>';
                        ReportHTML += '                             <b>Total: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' <b>' + parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()).toFixed(2) + '</b></br>';
                        ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()).toFixed(2)) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</br>';
                        ReportHTML += '                         </div>';
                        //ReportHTML += '                     </div>'; //of table-responsive
                        //ReportHTML += '                 </section>';
                        //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                        ReportHTML += '         </body>';
                        if ($("#hDefaultUnEditableCompanyName").val() == "RLL" || $("#hDefaultUnEditableCompanyName").val() == "HOR") {
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
                                ReportHTML += '         <div class="text-right m-r-lg"><img src="/Content/Images/CompanyStamp.jpg" alt="footer"/></div>';
                        }
                        ReportHTML += '     <footer class="footer col-xs-12 ' + ($("#cbPrintFooterInvoice").prop("checked") ? "" : " hide ") + '" style="width:100%; position:absolute; bottom:0;">';
                        //ReportHTML += '         <div class="row">'
                        //ReportHTML += '             <div class="col-xs-8 m-l"><b><i>' + ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.DirectionType").text() == 1
                        //                                                                ? 'Import Manager'
                        //                                                                : ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.DirectionType").text() == 2 ? 'Export Manager' : 'Domestic Manager')
                        //                                                                ) + '</i></b></div>';
                        //ReportHTML += '             <div class="col-xs-4 m-t-n-md float-right"><b><i>Accountant Signature</i></b></div>';
                        //ReportHTML += '         </div>'
                        ReportHTML += '         <div class="row text-right m-r m-t-sm">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
                        ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
                        if ($("#hDefaultUnEditableCompanyName").val() == "RLL")
                            ReportHTML += '         <div class="row text-right m-r">' + '  رقم الملف الضريبي 00\\00\\555\\02677\\5\\001  ' + '  رقم تسجيل المبيعات 903\\405\\331  ' + '</div>';
                        ReportHTML += '         <div class="row text-center m-t ' + ($("#cbPrintFooterInvoice").prop("checked") ? "" : " hide ") + '"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                        //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                        //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
                        ReportHTML += '     </footer>';
                        ReportHTML += '</html>';
                        mywindow.document.write(ReportHTML);
                        mywindow.document.close();
                    } //EOF BSL,FAI,HOR,LAT,NVS,RLL,STR,TRL,VER
                    else if ($("#hDefaultUnEditableCompanyName").val() == "IFG") {
                        var mywindow = window.open('', '_blank');
                        var ReportHTML = '';
                        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                        //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                        ReportHTML += '<html>';
                        ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                        //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + ')' + '</h3></div>';
                        ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0] + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(6, 4) + '</h3></div>';

                        ////ReportHTML += '             <div style="clear:both;"><br></div>';
                        //ReportHTML += '         <div class="col-xs-1 m-l-n-md"><img src="/Content/Images/' + 'InvoiceSideStatement.jpg' + '" alt="logo"/></div>';
                        ReportHTML += '         <div class="col-xs-12">';

                        if ($("#hDefaultUnEditableCompanyName").val() == "WFE" && pInvoiceHeader.InvoiceTypeName.split(' ')[0].trim().toUpperCase() == "INVOICE") {
                            ReportHTML += '             <div class="col-xs-9"></div>';
                            ReportHTML += '             <div class="col-xs-3"><b>Tax No.: </b>' + '843-592-672' + '</div>';
                            ReportHTML += '             <div class="col-xs-9"></div>';
                            ReportHTML += '             <div class="col-xs-3"><b>Com. Reg. No.: </b>' + '200669' + '</div>';
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
                        ReportHTML += '             <div class="col-xs-12 b-b b-dark m-t-n-xs" style="clear:both;"></div>';

                        if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                            ReportHTML += '             <div class="col-xs-6"><b>Operation: </b>' + pMasterOperationCode + '</div>';
                        else
                            ReportHTML += '             <div class="col-xs-6"><b>Operation: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceOperationCode").text() + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Currency: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</div>';
                        if ($("#cbPrintMBL").prop("checked"))
                            ReportHTML += '             <div class="col-xs-6"><b>MB/L No.: </b>' + pMasterBL + '</div>';
                        if ($("#cbPrintHBL").prop("checked")) {
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
                            ReportHTML += '                     <div class="row"></div>';
                        ReportHTML += '                         <div class="col-xs-8 m-t-n">';
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
                        if ($("#cbPrintBankDetailsFromDefaults").prop("checked")) {
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
                        mywindow.document.write(ReportHTML);
                        mywindow.document.close();
                    } //if ($("#hDefaultUnEditableCompanyName").val() == "IFG")
                    else if ($("#hDefaultUnEditableCompanyName").val() == "PHO") {
                        var mywindow = window.open('', '_blank');
                        var ReportHTML = '';
                        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                        //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                        ReportHTML += '<html>';
                        ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                        //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + ')' + '</h3></div>';
                        ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0] + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(6, 4) + '</h3></div>';

                        ////ReportHTML += '             <div style="clear:both;"><br></div>';
                        ReportHTML += '         <div class="col-xs-1 m-l-n-md"><img src="/Content/Images/' + 'InvoiceSideStatement.jpg' + '" alt="logo"/></div>';
                        ReportHTML += '         <div class="col-xs-11">';
                        ReportHTML += '             <div class="col-xs-9"><b>Bill to: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoicePartner").text() + '</div>';
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
                            ReportHTML += '             <div class="col-xs-6"><b>Operation: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceOperationCode").text() + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Currency: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</div>';
                        if ($("#cbPrintMBL").prop("checked"))
                            ReportHTML += '             <div class="col-xs-6"><b>MB/L No.: </b>' + pMasterBL + '</div>';
                        if ($("#cbPrintHBL").prop("checked")) {
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
                            //if ($("#hDefaultUnEditableCompanyName").val() == "TEL")
                            ReportHTML += '                                         <td>' + (item.Notes == 0 ? (item.ChargeTypeName == 0 ? "" : item.ChargeTypeName) : item.Notes) + '</td>';
                            //else
                            //    ReportHTML += '                                         <td>' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                            ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                            ReportHTML += '                                         <td>' + item.SalePrice + '</td>';
                            ReportHTML += '                                         <td>' + item.SaleAmount + '</td>';
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
                            ReportHTML += '         <div class="text-right m-r-lg"><img src="/Content/Images/CompanyStamp.jpg" alt="footer"/></div>';

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
                        mywindow.document.write(ReportHTML);
                        mywindow.document.close();
                    } //else if ($("#hDefaultUnEditableCompanyName").val() == "PHO")
                    else if ($("#hDefaultUnEditableCompanyName").val() == "KDM") {
                        var mywindow = window.open('', '_blank');
                        var ReportHTML = '';
                        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                        //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                        ReportHTML += '<html>';
                        ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                        //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + ')' + '</h3></div>';
                        ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0] + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(6, 4) + '</h3></div>';

                        ////ReportHTML += '             <div style="clear:both;"><br></div>';
                        //ReportHTML += '         <div class="col-xs-1 m-l-n-md"><img src="/Content/Images/' + 'InvoiceSideStatement.jpg' + '" alt="logo"/></div>';
                        ReportHTML += '         <div class="col-xs-12">';

                        ReportHTML += '             <div class="col-xs-8"><b>Bill to: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoicePartner").text() + '</div>';
                        ReportHTML += '             <div class="col-xs-4"><b>Inv.Date: </b>' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '</div>';
                        ReportHTML += '             <div class="col-xs-8"><b>Address: </b>';
                        ReportHTML += '                 ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                        ReportHTML += '                 ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2));
                        ReportHTML += '                 ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                        ReportHTML += '                 ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));

                        ReportHTML += '             </div>';
                        ReportHTML += '             <div class="col-xs-4"><b>Due Date: </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '</div>';
                        ReportHTML += '             <div class="col-xs-12 m-b-sm"><b>Reference Number: </b> ' + (pOperationHeader.ReleaseNumber == 0 ? "" : pOperationHeader.ReleaseNumber) + '</div>';
                        ReportHTML += '             <div class="col-xs-12 b-b b-dark m-t-n-xs" style="clear:both;"></div>';

                        if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                            ReportHTML += '             <div class="col-xs-8"><b>Operation: </b>' + pMasterOperationCode + '</div>';
                        else
                            ReportHTML += '             <div class="col-xs-8"><b>Operation: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceOperationCode").text() + '</div>';
                        ReportHTML += '             <div class="col-xs-4"><b>Currency: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</div>';
                        if ($("#cbPrintMBL").prop("checked"))
                            ReportHTML += '             <div class="col-xs-8"><b>MB/L No.: </b>' + pMasterBL + '</div>';
                        if ($("#cbPrintHBL").prop("checked")) {
                            if (pHouseBLs != "0")//Master Operation so show all houses on it
                                ReportHTML += '             <div class="col-xs-4"><b>HBL</b>: ' + pHouseBLs + '</div>';
                            else
                                ReportHTML += '             <div class="col-xs-4"><b>HB/L No.:</b> ' + (pHouseNumber == "" || pHouseNumber == "0" ? "" : pHouseNumber) + '</div>';
                        }
                        ReportHTML += '             <div class="col-xs-8"><b>POL: </b>' + pPOLName + '</div>';
                        ReportHTML += '             <div class="col-xs-4"><b>POD: </b>' + pPODName + '</div>';
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
                        ReportHTML += '             <div class="col-xs-4 m-t-n"><b>Tax ID: </b>' + pDefaultsRow.TaxNumber + '</div>';
                        ReportHTML += '             <div class="col-xs-8 m-t-n"><b>Tax File: </b>' + '5/03905/555' + '</div>';

                        if ($("#cbLargeInvoice").prop("checked")) {
                            ReportHTML += '         <div class="col-xs-12 m-t-n">Please, see attachment.</div>';
                            ReportHTML += '         <div class="break"></div>';
                        }
                        else
                            ReportHTML += '                         <div class="row"></div>';
                        ReportHTML += '                         <div class="col-xs-8">';
                        if ($("#cbPrintBankDetailsFromDefaults").prop("checked")) {
                            ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                            ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                            ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                            ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                            ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                            ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                        }
                            //kk: added 2nd condition
                        else if ($("#cbPrintBankDetailsFromTemplate").prop("checked") && $("#hDefaultUnEditableCompanyName").val() != "KDM") {
                            ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                            ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                        }
                        else
                            ReportHTML += '                             <br>';
                        ReportHTML += '                         </div>';
                        ReportHTML += '                         <div class="col-xs-4">';
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

                        ReportHTML += '     <footer class="footer col-xs-12 " style="width:100%; position:absolute; bottom:0;">';
                        //kk
                        ReportHTML += '<div class="col-xs-12" style="border:1px solid black"> ';
                        if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                            ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                            ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>").replace(/\ /g, "&nbsp;");
                        }
                        ReportHTML += '                 </div>';
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
                    } //else if ($("#hDefaultUnEditableCompanyName").val() == "KDM")
                        //else if ($("#hDefaultUnEditableCompanyName").val() == "FRE") { //with lines(not original)
                        //    var mywindow = window.open('', '_blank');
                        //    var ReportHTML = '';
                        //    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                        //    //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                        //    ReportHTML += '<html>';
                        //    ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                        //    ReportHTML += '         <body style="background-color:white;">';
                        //    ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                        //    //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + ')' + '</h3></div>';
                        //    //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0] + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(6, 4) + '</h3></div>';

                        //    ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice فاتورة</h3></div>';

                        //    ReportHTML += '                     <div class="col-xs-12 clear">';
                        //    ReportHTML += '                         <table id="tblReportInvoice" class="m-t table b-t b-light text-sm table-bordered" style="border:solid #000;margin-bottom:0px;padding-bottom:0px;">'; // table-hover
                        //    ReportHTML += '                             <thead>';
                        //    ReportHTML += '                             </thead>';
                        //    ReportHTML += '                             <tbody>';
                        //    ReportHTML += '                                 <tr>';
                        //    //ReportHTML += '                                     <th rowspan="3">Customer: </th>';
                        //    ReportHTML += '  <th rowspan="3"><div class="row"><div class="col-xs-2 text-left">Customer:</div><div class="col-xs-7 text-center">' + pOperationHeader.ClientName + '</div><div class="col-xs-3 text-right"> : العميل</div> </div></th>';
                        //    ReportHTML += '  <th><div class="row"><div class="col-xs-2 text-left">Date:</div><div class="col-xs-8 text-center">' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '</div><div class="col-xs-2 text-right"> : التاريخ</div> </div></th>';
                        //    ReportHTML += '                                 </tr>';
                        //    ReportHTML += '                                 <tr>';
                        //    ReportHTML += '  <th><div class="row"><div class="col-xs-3 text-left">Invoice No:</div><div class="col-xs-6 text-center">' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + '</div><div class="col-xs-3 text-right"> : رقم الفاتورة</div> </div></th>';
                        //    //ReportHTML += '                                     <th>Invoice To: </th>';
                        //    ReportHTML += '                                 </tr>';
                        //    ReportHTML += '                                 <tr>';
                        //    ReportHTML += '  <th><div class="row"><div class="col-xs-3 text-left">File No:</div><div class="col-xs-6 text-center">' + pOperationHeader.Code + '</div><div class="col-xs-3 text-right"> : رقم الملف</div> </div></th>';
                        //    //ReportHTML += '                                     <th>File To: </th>';
                        //    ReportHTML += '                                 </tr>';
                        //    ReportHTML += '                             </tbody>';
                        //    ReportHTML += '                         </table>';
                        //    ReportHTML += '                     </div>'


                        //    ReportHTML += '                     <div class="col-xs-12 clear">';
                        //    ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;margin-bottom:0px;padding-bottom:0px;">'; // table-hover
                        //    ReportHTML += '                             <thead>';
                        //    ReportHTML += '                                 <tr>';
                        //    ReportHTML += '                                     <th><div>علامات و أرقام</div><div>Marks & Number </div></th>';
                        //    ReportHTML += '                                     <th><div>رقم</div><div>No.</div></th>';
                        //    ReportHTML += '                                     <th> <div>التعبئه</div><div>Packing</div></th>';
                        //    ReportHTML += '                                     <th><div>مواصفات البضاعة</div><div>Description of Goods</div> </th>';
                        //    ReportHTML += '                                     <th><div>الوزن</div><div>Weight</div> </th>';
                        //    ReportHTML += '                                 </tr>';
                        //    ReportHTML += '                             </thead>';
                        //    ReportHTML += '                             <tbody>';
                        //    ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        //    ReportHTML += '                                         <td>' + pOperationHeader.MarksAndNumbers + '</td>';
                        //    ReportHTML += '                                         <td>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0] + '</td>';
                        //    ReportHTML += '                                         <td>' + pOperationHeader.PackageTypes + '</td>';
                        //    ReportHTML += '                                         <td>' + pOperationHeader.DescriptionOfGoods + '</td>';
                        //    ReportHTML += '                                         <td>' + pOperationHeader.GrossWeightSum + '</td>';
                        //    ReportHTML += '                                     </tr>';
                        //    ReportHTML += '                             </tbody>';
                        //    ReportHTML += '                         </table>';
                        //    ReportHTML += '                     </div>'




                        //    ReportHTML += '                     <div class="col-xs-12 clear">';
                        //    ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;margin-bottom:0px;padding-bottom:0px;">'; // table-hover
                        //    ReportHTML += '                             <thead>';
                        //    ReportHTML += '                                 <tr>';
                        //    ReportHTML += '                                     <th><div>اسم الباخرة / الطائرة</div><div>Vessel Name / Air Lines</div></th>';
                        //    ReportHTML += '                                     <th><div>ميناء الشحن</div><div>Port Of Loading </div></th>';
                        //    ReportHTML += '                                     <th><div>ميناء التفريغ</div><div>Port Of Discharge </div></th>';
                        //    ReportHTML += '                                     <th><div>تاريخ الوصول</div><div>Date Of Arrival</div></th>';
                        //    ReportHTML += '                                     <th><div>المصدر</div><div>Sender </div></th>';
                        //    ReportHTML += '                                 </tr>';
                        //    ReportHTML += '                             </thead>';
                        //    ReportHTML += '                             <tbody>';//(pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate)
                        //    ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        //    ReportHTML += '                                         <td>' + (pVesselName == 0 ? "" : pVesselName) + '</td>';
                        //    ReportHTML += '                                         <td>' + (pPOLName == 0 ? "" : pPOLName) + '</td>';
                        //    ReportHTML += '                                         <td>' + (pPODName == 0 ? "" : pPODName) + '</td>';
                        //    ReportHTML += '                                         <td>' + (GetDateWithFormatMDY(pOperationHeader.ActualArrival) == "01/01/1900" || GetDateWithFormatMDY(pOperationHeader.ActualArrival) == "1/1/1900" ? "" : GetDateWithFormatMDY(pOperationHeader.ActualArrival)) + '</td>';
                        //    ReportHTML += '                                         <td>' + (pShipperName == 0 ? "" : pShipperName) + '</td>';
                        //    ReportHTML += '                                     </tr>';
                        //    ReportHTML += '                             </tbody>';
                        //    ReportHTML += '                         </table>';
                        //    ReportHTML += '                     </div>'



                        //    ReportHTML += '                     <div class="col-xs-12 clear">';
                        //    ReportHTML += '                         <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;margin-bottom:0px;padding-bottom:0px;">'; // table-hover
                        //    ReportHTML += '                             <thead>';
                        //    ReportHTML += '                                 <tr>';
                        //    ReportHTML += '                                     <th><div>Descriptionالبيان </th>';
                        //    ReportHTML += '                                     <th>Amount السعر </th>';
                        //    ReportHTML += '                                     <th>VAT % </th>';
                        //    ReportHTML += '                                     <th>VAT </th>';
                        //    ReportHTML += '                                     <th>Total Amount اجمالى القيمة </th>';
                        //    ReportHTML += '                                 </tr>';
                        //    ReportHTML += '                             </thead>';
                        //    ReportHTML += '                             <tbody>';
                        //    $.each(JSON.parse(data[2]), function (i, item) {
                        //        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        //        if ($("#hDefaultUnEditableCompanyName").val() == "TEL")
                        //            ReportHTML += '                                         <td>' + (item.Notes == 0 ? (item.ChargeTypeName == 0 ? "" : item.ChargeTypeName) : item.Notes) + '</td>';
                        //        else
                        //            ReportHTML += '                                         <td>' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                        //        ReportHTML += '                                         <td>' + item.SaleAmount + '</td>';
                        //        ReportHTML += '                                         <td>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '</td>';
                        //        ReportHTML += '                                         <td>' + item.SaleAmount * (parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text())) / 100 + '</td>';
                        //        ReportHTML += '                                         <td>' + (item.SaleAmount + (item.SaleAmount * (parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text())) / 100)) + '</td>';
                        //        ReportHTML += '                                     </tr>';
                        //    });
                        //    ReportHTML += '                             </tbody>';
                        //    ReportHTML += '                         </table>';
                        //    ReportHTML += '                     </div>'


                        //    ReportHTML += '                     <div class="col-xs-12 clear">';
                        //    ReportHTML += '                         <table id="tblReportInvoice" class="m-t table b-t b-light text-sm table-bordered" style="border:solid #000;margin-bottom:0px;padding-bottom:0px;">'; // table-hover
                        //    ReportHTML += '                             <thead>';
                        //    ReportHTML += '                             </thead>';
                        //    ReportHTML += '                             <tbody>';
                        //    ReportHTML += '                                 <tr>';
                        //    //ReportHTML += '                                     <th rowspan="3">Customer: </th>';
                        //    if (pDiscountAmount != 0)
                        //        ReportHTML += '  <th rowspan="4"><div class="row"><div class="col-xs-4 text-left">Amount In Words :</div><div class="col-xs-8 text-center">' + toWords_WithFractionNumbers(parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()).toFixed(2)) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</div></div></th>';
                        //    else
                        //        ReportHTML += '  <th rowspan="3"><div class="row"><div class="col-xs-4 text-left">Amount In Words :</div><div class="col-xs-8 text-center">' + toWords_WithFractionNumbers(parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()).toFixed(2)) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</div></div></th>';

                        //    ReportHTML += '  <th><div class="row"><div class="col-xs-6 text-left"><div>قيمة الفاتورة</div><div>total Amount</div></div><div class="col-xs-6 text-center">' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmountWithoutVAT").text()).toFixed(2) + '</div></div></th>';
                        //    ReportHTML += '                                 </tr>';
                        //    ReportHTML += '                                 <tr>';
                        //    ReportHTML += '  <th><div class="row"><div class="col-xs-6 text-left"><div>القيمة الضريبية</div><div>VAT Amount</div> </div><div class="col-xs-6 text-center">' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pTaxAmount.toFixed(2) + '</div></div></th>';
                        //    //ReportHTML += '                                     <th>Invoice To: </th>';
                        //    ReportHTML += '                                 </tr>';
                        //    ReportHTML += '                                 <tr>';
                        //    ReportHTML += '  <th><div class="row"><div class="col-xs-6 text-left"><div>الاجمالي</div><div>Grand Total</div> </div><div class="col-xs-6 text-center">' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' <b>' + parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()).toFixed(2) + '</div></div></th>';
                        //    //ReportHTML += '                                     <th>File To: </th>';
                        //    ReportHTML += '                                 </tr>';
                        //    if (pDiscountAmount != 0) {

                        //        ReportHTML += '                                 <tr>';
                        //        ReportHTML += '  <th><div class="row"><div class="col-xs-6 text-left"><div>الخصم</div><div>Discount</div> </div><div class="col-xs-6 text-center"><b>Discount(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pDiscountAmount.toFixed(2) + '</div></div></th>';
                        //        ReportHTML += '                                 </tr>';
                        //    }
                        //    //ReportHTML += '                             <b>Discount(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pDiscountAmount.toFixed(2) + '</br>';

                        //    ReportHTML += '                             </tbody>';
                        //    ReportHTML += '                         </table>';
                        //    ReportHTML += '                     </div>'


                        //    ReportHTML += '         </body>';

                        //    if ($("#hDefaultUnEditableCompanyName").val() == "TEL") {
                        //        ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                        //        ReportHTML += '                     <div class="col-xs-3 m-t"><b>' + 'Financial Manager' + '</b></div>';
                        //        ReportHTML += '                     <div class="col-xs-2 m-t text-center"><b>' + '&emsp;' + '</b></div>';
                        //        ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + '&emsp;' + '</b></div>';
                        //        ReportHTML += '                     <div class="col-xs-3 m-t text-center"><b>' + 'Auditor' + '</b></div>';
                        //        ReportHTML += '                 </div>'
                        //        ReportHTML += '                 <div class="m-t" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                        //        ReportHTML += '                     <div class="col-xs-3 m-t-sm"><b>' + '&emsp;' + '</b></div>';
                        //        ReportHTML += '                     <div class="col-xs-2 m-t-sm text-center"><b>' + '&emsp;' + '</b></div>';
                        //        ReportHTML += '                     <div class="col-xs-4 m-t-sm text-center"><b>' + '&emsp;' + '</b></div>';
                        //        ReportHTML += '                     <div class="col-xs-3 m-t-sm text-center">' + '&emsp;' + '</div>';
                        //        ReportHTML += '                 </div>'
                        //    }
                        //    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                        //    //kk
                        //    if ($("#cbPrintBankDetailsFromTemplate").prop("checked") && $("#hDefaultUnEditableCompanyName").val() == "DGL") {
                        //        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        //        ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>").replace(/\ /g, "&nbsp;");
                        //    }
                        //    //ReportHTML += '         <div class="row">'
                        //    //ReportHTML += '             <div class="col-xs-8 m-l"><b><i>' + ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.DirectionType").text() == 1
                        //    //                                                                ? 'Import Manager'
                        //    //                                                                : ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.DirectionType").text() == 2 ? 'Export Manager' : 'Domestic Manager')
                        //    //                                                                ) + '</i></b></div>';
                        //    //ReportHTML += '             <div class="col-xs-4 m-t-n-md float-right"><b><i>Accountant Signature</i></b></div>';
                        //    //ReportHTML += '         </div>'
                        //    //ReportHTML += '         <div class="row text-right m-r m-t">' + '  يتنبه نحو عدم الخصم من تحت حساب الضريبة حيث أن الشركة تتبع نظام الدفعات المقدمة تطبيقا لأحكام لمادة (62) من القانون رقم 91 لسنة 2005  ' + '</div>';
                        //    //ReportHTML += '         <div class="row text-right m-r">' + '  يوقف صرف شيكات مصر للتأمين لحين تسوية التعويضات  ' + '</div>';
                        //    if ($("#cbPrintFooterInvoice").prop("checked"))
                        //        ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                        //    else
                        //        ReportHTML += '         &emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>';
                        //    //else
                        //    //    ReportHTML += '         <div class="row text-center m-t"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                        //    ReportHTML += '     </footer>';
                        //    ReportHTML += '</html>';
                        //    mywindow.document.write(ReportHTML);
                        //    mywindow.document.close();
                        //} //EOF else if ($("#hDefaultUnEditableCompanyName").val() == "FRE") {//with lines(not original)
                    else if ($("#hDefaultUnEditableCompanyName").val() == "FRE" || pDefaults.UnEditableCompanyName == "WAV") {
                        //var cnt = 0;
                        //var InvoiceNumber = $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text();
                        //for (cnt = 0; cnt < 5; cnt++) {
                        //    if (InvoiceNumber.length < 5) {
                        //        InvoiceNumber = "0" + InvoiceNumber;
                        //    }
                        //}
                        //ReportHTML += '                         <p class="text-center">' + InvoiceNumber + '</p>';

                        var mywindow = window.open('', '_blank');
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
                        ReportHTML += '                         <p class="text-center">' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoicePartner").text();
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
                        ReportHTML += '                     <div class="b-blue row" style="height:1cm; font-size:12px;">';
                        ReportHTML += '                         <p class="text-center">' + (pInvoiceDate == "01/01/1900" || pInvoiceDate == "1/1/1900" ? "N/A" : pInvoiceDate) + '</p>';
                        ReportHTML += '                     </div>';
                        ReportHTML += '                     <div class="b-blue row" style="height:.9cm; font-size:12px;">';
                        var cnt = 0;
                        var InvoiceNumber = $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0];
                        for (cnt = 0; cnt < 5; cnt++) {
                            if (InvoiceNumber.length < 5) {
                                InvoiceNumber = "0" + InvoiceNumber;
                            }
                        }
                        ReportHTML += '                         <p class="text-center">' + InvoiceNumber + '</p>';

                        //ReportHTML += '                         <p class="text-center">' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0] + '</p>';
                        ReportHTML += '                     </div>';
                        ReportHTML += '                     <div class="b-blue row" style="height:.9cm; font-size:12px;">';
                        ReportHTML += '                         <p class="text-center">' + pOperationHeader.Code + '</p>';
                        ReportHTML += '                     </div>';
                        ReportHTML += '                 </div>';
                        ReportHTML += '             </div>';

                        ReportHTML += '                 <div class="col-xs-12 b-blue"  style="height:2.6cm;">';
                        ReportHTML += '                     <div class="b-blue row" style="height:1.3cm; font-size:12px;">';
                        ReportHTML += '                     </div>';
                        ReportHTML += '                     <div class="b-blue row m-t-n" style="height:1.3cm; font-size:12px;">';
                        ReportHTML += '                         <table id="tblOperationContainersAndPackages" class="table table-striped m-l-md m-r-md" style="font-size:12px; ">';
                        ReportHTML += '                             <thead>';
                        ReportHTML += '                             </thead>';
                        ReportHTML += '                             <tbody>';
                        ReportHTML += '                                 <tr class="" style="font-size:95%;">';
                        ReportHTML += '                                     <td style="width:28%; border-color:white!Important; text-align:center; vertical-align: center;">' + (pOperationHeader.ContainerTypes == 0 ? "" : pOperationHeader.ContainerTypes) + '<br>BL: ' + (pOperationHeader.MasterBL == 0 ? "" : pOperationHeader.MasterBL) + '</td>';
                        ReportHTML += '                                     <td style="width:8%; border-color:white!Important; text-align:left; vertical-align: center;">' + '0'/*$("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0]*/ + '</td>';
                        ReportHTML += '                                     <td style="width:16.4%; border-color:white!Important; text-align:center; vertical-align: center;">' + pOperationHeader.PackageTypes + '</td>';
                        ReportHTML += '                                     <td style="width:34.8%; border-color:white!Important; text-align:center; vertical-align: center;">' + (pOperationHeader.CommodityName == 0 ? "" : pOperationHeader.CommodityName) /*pOperationHeader.DescriptionOfGoods*/ + '</td>';
                        ReportHTML += '                                     <td style="width:11.9%; border-color:white!Important; text-align:center; vertical-align: center;">' + pOperationHeader.GrossWeightSum + '</td>';
                        ReportHTML += '                                 </tr>';
                        ReportHTML += '                             </tbody>';
                        ReportHTML += '                         </table>';
                        ReportHTML += '                     </div>';
                        ReportHTML += '                 </div>';


                        ReportHTML += '                <br> <div class="col-xs-12 b-blue"  style="height:2.1cm;">';
                        ReportHTML += '                     <div class="b-blue row" style="height:.4cm; font-size:12px;">';
                        ReportHTML += '                     </div>';
                        ReportHTML += '                     <div class="b-blue row" style="height:.9cm; font-size:12px;">';
                        ReportHTML += '                         <table id="tblOperationContainersAndPackages" class="table table-striped m-l-md" style="font-size:12px; ">';
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
                            //ReportHTML += '                                     <td style="width:8.5%; border-color:white!Important; text-align:left; vertical-align: text-top;">' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text() + '</td>';
                            //ReportHTML += '                                     <td style="width:8.5%; border-color:white!Important; text-align:left; vertical-align: text-top;">' + item.SaleAmount * (parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text())) / 100 + '</td>';
                            //ReportHTML += '                                     <td style="width:16.5%; border-color:white!Important; text-align:left; vertical-align: text-top;">' + (item.SaleAmount + (item.SaleAmount * (parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceTaxPercentage").text())) / 100)) + '</td>';
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

                        ReportHTML += '                                 <tr style="font-size:95%;">';
                        ReportHTML += '                                     <td colspan="5" style="border-color:white!Important; text-align:left; vertical-align: text-top;">';
                        if ($("#cbPrintBankDetailsFromDefaults").prop("checked")) {
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
                        ReportHTML += '                         <table id="tblOperationContainersAndPackages" class="table table-striped m-l-md m-r-md" style="height:8cm; font-size:12px;">';
                        ReportHTML += '                             <thead>';
                        ReportHTML += '                             </thead>';
                        ReportHTML += '                             <tbody>';
                        ReportHTML += '                             <tr class="" style="font-size:100%;">';
                        ReportHTML += '                                     <td rowspan="3" style="width:51%;border-top:0px; text-align:center; vertical-align: center;"><p style="margin-top:20px;">' + toWords_WithFractionNumbers(parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()).toFixed(2)) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</p></td>';
                        ReportHTML += '                                     <td style="border-top:0px;"><div class="b-blue" style="width:4.5cm; font-size:12px;"></div><p style=" width:23%;margin-left: 60%; text-align:center; vertical-align: center;margin-top:30px;">' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '  ' + parseFloat(TotalAmount_Footer).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</p></td>';
                        ReportHTML += '                             </tr>';
                        ReportHTML += '                             <tr class="" style="font-size:100%;">';
                        ReportHTML += '                                     <td style="border-top:0px;"><div class="b-blue" style="width:4.5cm;border-top:0px; font-size:12px;"></div><br><p style="width:23%;margin-left: 60%; text-align:center; vertical-align: center; margin-top:5px;">' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '  ' + TotalVATAmount_Footer.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</p></td>';
                        ReportHTML += '                             </tr>';
                        ReportHTML += '                             <tr class="" style="font-size:100%;">';
                        ReportHTML += '                                     <td style="border-top:0px;"><div class="b-blue" style="width:4.5cm;border-top:0px; font-size:12px;"></div><p style="width:23%;margin-left: 60%; text-align:center; vertical-align: center; margin-top:10px;">' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '  ' + parseFloat(GrandTotal_Footer).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</p></td>';
                        ReportHTML += '                             </tr>';
                        ReportHTML += '                             </tbody>';
                        ReportHTML += '                         </table>';
                        //ReportHTML += '                     </div>';
                        ReportHTML += '                 </div>';


                        ReportHTML += '        </div>';
                        ReportHTML += '         </body></html>';
                        mywindow.document.write(ReportHTML);
                        mywindow.document.close();

                    } //else if ($("#hDefaultUnEditableCompanyName").val() == "FRE") {
                    else if ($("#hDefaultUnEditableCompanyName").val() == "GLD") {
                        var mywindow = window.open('', '_blank');
                        var ReportHTML = "";
                        ReportHTML += '<html>';
                        ReportHTML += '     <head><title></title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        //        ReportHTML += '         <div class="break"></div>'; //to start a new page
                        ReportHTML += '        <div class="" style="height:100%;">';
                        ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                        //ReportHTML += '                 <div class="col-xs-6 text-right">';
                        //ReportHTML += '                     <br>GLS Logistics Services LLC <br> B2106 Latifa Tower, Sheikh Zayed Road <br> Dubai, United Arab Emirates <br> Tel: +971 4 3930303 <br> <b>TRN: 100489292100003 </b>';
                        //ReportHTML += '                 </div>';

                        ReportHTML += '             <div class="col-xs-12"><h3>INVOICE' + '</h3></div>';
                        ReportHTML += '<hr>';

                        ReportHTML += '          <div class="col-xs-12">';
                        ReportHTML += '             <div class="col-xs-6">';

                        ReportHTML += '             <b>To</b> : ' + pClientHeader.Name + ' <br>';
                        ReportHTML += '             <b>Reference </b> : ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + ' <br>';
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
                            ReportHTML += '                                     <td>' + (item.ChargeTypeName == "OCEAN FREIGHT" ? "USD" : item.CurrencyCode) + '</td>';
                            ReportHTML += '                                     <td>' + (item.ChargeTypeName == "OCEAN FREIGHT" ? ((parseFloat(item.SalePrice) / parseFloat($("#hReadySlCurrencies option:Contains('USD')").attr("MasterDataExchangeRate")))).toFixed(2) : item.SalePrice.toFixed(2)) + '</td>';
                            ReportHTML += '                                     <td>' + item.Quantity + '</td>';
                            ReportHTML += '                                     <td>' + (item.SalePrice * item.Quantity * pInvoiceHeader.ExchangeRate).toFixed(2) + '</td>';
                            ReportHTML += '                                     <td>' + (item.TaxAmount * pInvoiceHeader.ExchangeRate).toFixed(2) + '</td>';
                            ReportHTML += '                                     <td>' + (item.SaleAmount * pInvoiceHeader.ExchangeRate).toFixed(2) + '</td>';
                            ReportHTML += '                                 </tr>';
                            TotalAmount_Footer += (item.SalePrice * item.Quantity * item.ExchangeRate);
                            TotalVATAmount_Footer += (item.TaxAmount * item.ExchangeRate);
                            GrandTotal_Footer += (item.SaleAmount * item.ExchangeRate);
                        });
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
                        if ($("#cbPrintBankDetailsFromDefaults").prop("checked")) {
                            ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + ($("#hDefaultUnEditableCompanyName").val() == "QUI" ? (" " + pDefaults.CompanyName) : "") + '</br>';
                            ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                            ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                            ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                            ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                            ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                        }
                        else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                            ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + ($("#hDefaultUnEditableCompanyName").val() == "QUI" ? (" " + pDefaults.CompanyName) : "") + '</br>';
                            ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                        }
                        else
                            ReportHTML += '                             <br>';
                        ReportHTML += '               </div>';

                        ReportHTML += '        </div>';
                        ReportHTML += '         </body></html>';
                        mywindow.document.write(ReportHTML);
                        mywindow.document.close(); //EOF else if ($("#hDefaultUnEditableCompanyName").val() == "GLD")
                    }
                    else if ($("#hDefaultUnEditableCompanyName").val() == "GLS") {
                        var mywindow = window.open('', '_blank');
                        var ReportHTML = '';
                        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                        //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                        ReportHTML += '<html>';
                        ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                        //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>Invoice (' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text() + ')' + '</h3></div>';
                        ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + pInvoiceHeader.InvoiceTypeName + ' No. ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceNumber").text().split('/')[0] + '/' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDate").text().substr(6, 4) + '</h3></div>';

                        ////ReportHTML += '             <div style="clear:both;"><br></div>';
                        //ReportHTML += '         <div class="col-xs-1 m-l-n-md"><img src="/Content/Images/' + 'InvoiceSideStatement.jpg' + '" alt="logo"/></div>';
                        ReportHTML += '         <div class="col-xs-12">';

                        ReportHTML += '             <div class="col-xs-9"><b>Adress: </b>';
                        ReportHTML += '                     <b>' + $("#hDefaultCompanyName").val() + '</b><br>';
                        ReportHTML += '                     ' + (pAddressLine1 == "" ? "" : (pAddressLine1 + ','));
                        ReportHTML += '                     ' + (pAddressLine2 == "" ? "" : (pAddressLine2 + ','));
                        ReportHTML += '                     ' + (pAddressLine3 == "" ? "" : (pAddressLine3) + '');
                        ReportHTML += '             </div>';

                        ReportHTML += '             <div class="col-xs-4"><b>Tel: </b>' + pDefaultsRow.Phones + '</div>';
                        ReportHTML += '             <div class="col-xs-8"><b>Fax: </b>' + pDefaultsRow.Faxes + '</div>';
                        ReportHTML += '             <div class="col-xs-4"><b>Tax ID: </b>' + pDefaultsRow.TaxNumber + '</div>';
                        ReportHTML += '             <div class="col-xs-8"><b>Commercial Registry: </b>' + pDefaultsRow.CommericalRegNo + '</div>';

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
                        ReportHTML += '             <div class="col-xs-4 text-center"><h1>INVOICE </h1></div>';
                        ReportHTML += '                     <div class="col-xs-4">';
                        ReportHTML += '                         <table id="tblReportInvoice2" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                        ReportHTML += '                             <thead>';
                        ReportHTML += '                                 <tr>';
                        ReportHTML += '                                     <th>Serial#</th>';
                        ReportHTML += '                                 </tr>';
                        ReportHTML += '                             </thead>';
                        ReportHTML += '                             <tbody>';
                        ReportHTML += '                                 <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                     <td>' + pMasterOperationCode + '</td>';
                        ReportHTML += '                                 </tr>';
                        ReportHTML += '                         <tbody>';
                        ReportHTML += '                     </table>';
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
                        ReportHTML += $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoicePartner").text() + '<br>';
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
                            if ($("#hDefaultUnEditableCompanyName").val() == "TEL")
                                ReportHTML += '                                         <td>' + (item.Notes == 0 ? (item.ChargeTypeName == 0 ? "" : item.ChargeTypeName) : item.Notes) + '</td>';
                            else
                                ReportHTML += '                                         <td>' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                            ReportHTML += '                                         <td>' + item.CurrencyCode + '</td>';
                            //ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                            //ReportHTML += '                                         <td>' + item.SalePrice + '</td>';
                            ReportHTML += '                                         <td>' + item.SaleAmount + '</td>';
                            ReportHTML += '                                     </tr>';
                        });
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
                        if ($("#cbPrintBankDetailsFromDefaults").prop("checked")) {
                            ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + ($("#hDefaultUnEditableCompanyName").val() == "QUI" ? (" " + pDefaults.CompanyName) : "") + '</br>';
                            ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                            ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                            ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                            ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                            ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                        }
                            //kk: added 2nd condition
                        else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                            ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + ($("#hDefaultUnEditableCompanyName").val() == "QUI" ? (" " + pDefaults.CompanyName) : "") + '</br>';
                            ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
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
                            ReportHTML += '                             <b>Deduction tax(' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceDiscountPercentage").text() + '%): </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' ' + pDiscountAmount.toFixed(2) + '</br>';
                        ReportHTML += '                             <b>Total: </b>' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + ' <b>' + parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()).toFixed(2) + '</b></br>';
                        ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(parseFloat($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text()).toFixed(2)) + ' ' + $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text() + '</br>';
                        if ($("#cbPrintUSDTotal").prop("checked") && $("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceCurrency").text().trim() == "EGP")
                            ReportHTML += '                             <b>USD Total: </b>' + ' <b>' + ($("#tblInvoices" + pInvoiceTableSuffix + " #" + pID + " td.InvoiceAmount").text() / $("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")).toFixed(2) + '</b></br>';
                        ReportHTML += '                         </div>';
                        ReportHTML += '                         </div>';

                        ReportHTML += '             <br><br><br><div class="row col-xs-12 text-center"> Invoice contents if not confirmed after 10 days should be considered Clarification & info. </div>'; //
                        ReportHTML += '             <div class="row col-xs-12 text-center"> Please contact Mr.Tamer Heikal Mobil: 01090767578 Email:acc@gls.com.eg </div>'; //
                        ReportHTML += '             <br><div class="col-xs-12"><div class="col-xs-6"> REF : ' + pCustomerReference + '</div>'; //
                        //ReportHTML += '             <br><div class="col-xs-4"> <label></label></div>'; //
                        ReportHTML += '             <div class="col-xs-6 text-right"> Created By : ' + pSalesman + '</div></div>'; //

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
                        mywindow.document.write(ReportHTML);
                        mywindow.document.close();
                    } //EOF else if ($("#hDefaultUnEditableCompanyName").val() == "GLS") {
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

    decInvoiceTaxPercentage = $("#slEditInvoiceTax option:selected").attr("CurrentPercentage");
    decInvoiceTaxAmount = (decInvoiceAmount * decInvoiceTaxPercentage / 100).toFixed(2);
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

    FillReceivablesModalTableControls(pStrFnName, pWhereClause, pDivName, ptblModalName, pCheckboxNameAttr, false /*pIsInsert*/, true /*pIsInvoiceEdit*/
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
    debugger;
    debugger;
    debugger;
    debugger;
    debugger;

    var pWhereClause = " ";
    if (SelectedHouseBillID == 0) {
        pWhereClause = " WHERE (OperationID = " + pOperationID + " OR MasterOperationID = " + pOperationID + ") " + " AND IsDeleted = 0 ";
        pWhereClause += " and (OperationContainersAndPackagesID = " + pOperationContainersAndPackagesID + " ) ";
    }
    else {
        pWhereClause = " WHERE (OperationID = " + SelectedHouseBillID + " and MasterOperationID = " + pOperationID + ") " + " AND IsDeleted = 0 ";
    }

    debugger;
    LoadAll("/api/Invoices/LoadAll", pWhereClause, function (pTabelRows) {
        // nour 09052022
        //Invoices_BindTableRows(JSON.parse(pTabelRows)); /*DocsOut_ClearAllControls();*/
        Invoices_BindTableRows(JSON.parse(pTabelRows[0])); /*DocsOut_ClearAllControls();*/
    });
    //LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Invoices/LoadWithWhereClause", " where OperationID = " + pOperationID, 0, 1000, function (pTabelRows) { Receivables_BindTableRows(pTabelRows); });
}

function Invoices_BindTableRows(pInvoices) {
    debugger;
    ClearAllTableRows("tblInvoices");
    ClearAllTableRows("tblInvoicesDRAFT");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Print" + "</span>";
    LogsControlsText = " class='btn btn-xs btn-rounded btn-primary float-right' > <i class='fa fa-chain' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Logs" + "</span>";
    var HoldControlsText = " class='btn btn-xs btn-rounded btn-danger  float-right' style='width:100px;'> <i class='fa fa-exclamation-triangle' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'> HOLD </span>";

    $.each(pInvoices, function (i, item) {
        var pInvoiceTableName = (item.InvoiceTypeCode == "DRAFT" ? "tblInvoicesDRAFT" : "tblInvoices");
        AppendRowtoTable(pInvoiceTableName,
        ("<tr ID='" + item.ID + "' " + ((OEInv && !item.IsOperationClosed && item.InvoiceStatus == "UnPaid" && !item.IsApproved && item.ChildInvoiceID == 0) ? ('ondblclick="Invoices_EditByDblClick(' + item.ID + "," + "'" + item.InvoiceTypeCode + "'" + ');"') : " class='static-text-primary' ") + ">"
        //("<tr ID='" + item.ID + "'>"
            + "<td class='InvoiceID'> <input" + (item.InvoiceStatus == "UnPaid" && !item.IsOperationClosed && item.NumberOfAccNotes == 0 && !item.IsApproved && item.ChildInvoiceID == 0 ? " name='Delete' " : " disabled='disabled' ") + " type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='InvoiceTypeName'>" + item.InvoiceTypeName + "</td>"
            + "<td class='InvoiceNumber'>" + item.InvoiceNumber + "/" + item.InvoiceTypeName + "</td>"
            + "<td class='InvoicePartner ' val='" + item.OperationPartnerID + "'>" + (item.PartnerName == 0 ? "" : item.PartnerName) + "</td>"
            + "<td class='InvoicePartnerTypeCode'>" + (item.PartnerTypeCode == 0 ? "" : item.PartnerTypeCode) + "</td>"
            + "<td class='OnlyUNFCPW hide '><a " + HoldControlsText + "</a></td>"

            + "<td class='InvoiceTaxTypeID hide' val=" + item.TaxTypeID + ">" + (item.TaxTypeID == 0 ? "" : item.TaxTypeName) + "</td>"
            + "<td class='InvoiceTaxPercentage hide'>" + item.TaxPercentage + "</td>"
            + "<td class='InvoiceTaxAmount hide'>" + item.TaxAmount.toFixed(2) + "</td>"
            + "<td class='InvoiceDiscountTypeID hide' val=" + item.DiscountTypeID + ">" + (item.DiscountTypeID == 0 ? "" : item.DiscountTypeName) + "</td>"
            //+ "<td class='InvoiceDiscountPercentage hide'>" + item.DiscountPercentage + "</td>"
            + "<td class='InvoiceDiscountAmount hide'>" + item.DiscountAmount.toFixed(2) + "</td>"

            + "<td class='InvoiceAmountWithoutVAT hide'>" + item.AmountWithoutVAT.toFixed(2) + "</td>"
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
            + "<td class='InvoiceOperationID hide'>" + item.OperationID + "</td>"
            + "<td class='InvoiceMasterOperationID hide'>" + item.MasterOperationID + "</td>"
            + "<td class='InvoiceOperationCode hide'>" + (item.OperationCode == 0 ? "" : item.OperationCode) + "</td>"
            + "<td class='InvoiceHouseNumber hide'>" + (item.HouseNumber == 0 ? "N/A" : item.HouseNumber) + "</td>" //if "N/A" then either not entered or its Master Op so I should show all the HBLs on the Master, but for space i dont do it.
            + "<td class='InvoiceStatus " + (item.InvoiceStatus == "UnPaid" ? "text-danger" : "text-primary") + "'>" + item.InvoiceStatus + "</td>"
            + "<td class='InvoiceNumberOfAccNotes hide'>" + item.NumberOfAccNotes + "</td>"
            + "<td class='IsApproved'> <input type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"
            + "<td class='InvoiceLeftSignature hide'>" + (item.LeftSignature == 0 ? "" : item.LeftSignature) + "</td>"
            + "<td class='InvoiceMiddleSignature hide'>" + (item.MiddleSignature == 0 ? "" : item.MiddleSignature) + "</td>"
            + "<td class='InvoiceRightSignature hide'>" + (item.RightSignature == 0 ? "" : item.RightSignature) + "</td>"
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
            //+ "<td class=''><a onclick='Invoices_Print(" + item.ID + ",3);' " + printControlsText + "</a></td>"
                + "</tr>"));

        if (pDefaults.UnEditableCompanyName == "UNF" && item.IsHold) {
            $(".OnlyUNFCPWHide").addClass("hide");
            $(".OnlyUNFCPW").removeClass("hide");
        }
    });
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

function Invoices_ClearAllControls(pInvoiceTypeCode) {
    debugger;

    ClearAll("#InvoiceModal");

    $("#slInvoiceCurrency").html($("#hReadySlCurrencies").html());

    Invoices_SetSlInvoiceTypeProperties(pInvoiceTypeCode, "slInvoiceTypes");

    if (Invoices_CheckSameCurrency("tblReceivables", "ReceivableCurrency")) {
        jQuery("#InvoiceModal").modal("show");

        if ($("#slInvoiceTypes option").length < 2)
            InvoiceTypes_GetList(null, "slInvoiceTypes", pInvoiceTypeCode);
        else if (pInvoiceTypeCode == "DRAFT")
            $("#slInvoiceTypes").val($("#slInvoiceTypes option:contains(DRAFT)").val());

        InvoiceOperations_GetList($("#hOperationID").val(), "slInvoiceOperations");

        InvoicePartners_GetList($("#hOperationPartnerID").val(), $("#hOperationID").val(), "slInvoicePartner", function () { InvoiceAddressTypes_GetList(null, "slInvoiceAddressTypes", "slInvoicePartner", null); });
        Invoices_SetInvoiceAmount("tblReceivables", "Invoice", "ReceivableSaleAmount");
        //InvoiceAddressTypes_GetList(null, "slInvoiceAddressTypes", "slInvoicePartner", null);//the 3rd parameter is the sl name of the partner control

        //get the invoice currency from the 1st item (i checked they have the same currency)
        var pInvoiceCurrencyID = $('#tblReceivables').find('input[name="Delete"]:checked:first').parent().parent().find("td.ReceivableCurrency").attr('val');
        if (pInvoiceCurrencyID == undefined) $("#slInvoiceCurrency").removeAttr("disabled");
        else $("#slInvoiceCurrency").attr("disabled", "disabled");
        InvoiceCurrency_GetList((pInvoiceCurrencyID == undefined ? $("#hDefaultCurrencyID").val() : pInvoiceCurrencyID), "slInvoiceCurrency", "Invoice");
        InvoicePaymentTerms_GetList(null, "slInvoicePaymentTerms");
        if ($("#slInvoiceTax option").length < 2)
            GetListTaxTypeWithNameAndPercAttr(null, "api/TaxeTypes/LoadAllWithWhereClause"
            , "<--Select-->", "slInvoiceTax", "WHERE IsInactive=0 ORDER BY Name"
            , function () {
                $("#slInvoiceDiscount").html($("#slInvoiceTax").html());
                $("#slInvoiceTax option[IsDiscount='true']").addClass('hide');
                $("#slInvoiceDiscount option[IsDiscount='false']").addClass('hide');
            });
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

function Invoices_EditByDblClick(pID, pInvoiceTypeCode) {

    jQuery("#EditInvoiceModal").modal("show");
    Invoices_FillControls(pID, pInvoiceTypeCode);
}

function Invoices_FillControls(pID, pInvoiceTypeCode) {
    debugger;
    if (pDefaults.UnEditableCompanyName == "BRS")
        $("#txtEditInvoiceEditableNotes").css('width', '800px');
    var pInvoiceTableName = (pInvoiceTypeCode == "DRAFT" ? "tblInvoicesDRAFT" : "tblInvoices");
    if ($("#hDefaultUnEditableCompanyName").val() == "KDS" || $("#hDefaultUnEditableCompanyName").val() == "NEW") $(".classKDS").removeClass("hide"); else $(".classKDS").addClass("hide");
    if ($("#cbIsTank").prop("checked")) {
        $(".classShowForTank").removeClass("hide");
    }
    ClearAll("#EditInvoiceModal");

    InvoiceOperations_GetList($("#hOperationID").val(), "slEditInvoiceOperations");

    $("#slEditInvoiceCurrency").html($("#hReadySlCurrencies").html());

    $("#hEditedInvoiceTypeCode").val(pInvoiceTypeCode);

    $("#hEditedInvoiceID").val(pID);
    var tr = $("#" + pInvoiceTableName + " tr[ID='" + pID + "']");

    $("#lblEditedInvoiceShown").html(": " + $(tr).find("td.InvoiceNumber").text() + " / " + $(tr).find("td.InvoiceOperationCode").text());

    var pInvoiceOperationID = $(tr).find("td.InvoiceOperationID").text();
    var pInvoiceMasterOperationID = $(tr).find("td.InvoiceMasterOperationID").text();
    $("#hEditedInvoiceOperationID").val(pInvoiceOperationID);
    $("#hEditedInvoiceMasterOperationID").val($(tr).find("td.InvoiceMasterOperationID").text());

    //InvoiceOperations_GetList(pInvoiceMasterOperationID == 0 ? pInvoiceOperationID : pInvoiceMasterOperationID
    //    , "slEditInvoiceOperations", function () { $("#slEditInvoiceOperations").val(pInvoiceOperationID); });
    $("#slEditInvoiceOperations").val(pInvoiceOperationID);

    var pOperationPartnerID = $(tr).find("td.InvoicePartner").attr('val');
    var pAddressID = $(tr).find("td.InvoiceAddressID").attr('val');
    var pPaymentTermID = $(tr).find("td.InvoicePaymentTermID").attr('val');
    var pInvoiceCurrencyID = $(tr).find("td.InvoiceCurrency").attr('val');

    var pInvoiceTaxTypeID = $(tr).find("td.InvoiceTaxTypeID").attr('val');
    var pInvoiceDiscountTypeID = $(tr).find("td.InvoiceDiscountTypeID").attr('val');
    var pRoutingID = $(tr).find("td.RoutingID").text();
    var pOperationContainersAndPackagesID = $(tr).find("td.OperationContainersAndPackagesID").text() == 0 ? "" : $(tr).find("td.OperationContainersAndPackagesID").text();

    if (pOperationContainersAndPackagesID != "") {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/OperationContainersAndPackages/LoadAllTanks"
            , {
                pPageNumber: 1
                , pPageSize: 999999
                , pWhereClauseForTank: "WHERE OperationID=" + pInvoiceOperationID + " AND TankOrFlexiNumber IS NOT NULL AND ID IN (SELECT OperationContainersAndPackagesID FROM Receivables WHERE IsDeleted=0 AND (InvoiceID IS NULL OR InvoiceID=" + pID + ") AND OperationID=" + pInvoiceOperationID + ") "
                , pOrderBy: "ID"
            }
            , function (pData) {
                var pTank = pData[0];
                FillListFromObject(pOperationContainersAndPackagesID, 1, "<--Select-->", "slEditInvoiceTank", pTank, null);
                FadePageCover(false);
            }
            , null);
    }
    InvoiceCurrency_GetList(pInvoiceCurrencyID, "slEditInvoiceCurrency", "Invoice");
    GetListTaxTypeWithNameAndPercAttr(pInvoiceTaxTypeID, "api/TaxeTypes/LoadAllWithWhereClause"
                , "<--Select-->", "slEditInvoiceTax", "WHERE IsInactive=0 ORDER BY Name"
                , function () {
                    $("#slEditInvoiceDiscount").html($("#slEditInvoiceTax").html());
                    $("#slEditInvoiceDiscount").val(pInvoiceDiscountTypeID == 0 ? "" : pInvoiceDiscountTypeID);
                    $("#slEditInvoiceTax option[IsDiscount='true']").addClass('hide');
                    $("#slEditInvoiceDiscount option[IsDiscount='false']").addClass('hide');
                });
    GetListWithCertificateNumberAndWhereClause(pRoutingID, "/api/Routings/LoadAll", "<--Select-->"
        , "slEditInvoiceRoutingCCA"
        , {
            pWhereClause: "WHERE OperationID=" + (pInvoiceMasterOperationID == 0 ? pInvoiceOperationID : pInvoiceMasterOperationID)
                          + " AND RoutingTypeID=" + CustomsClearanceRoutingTypeID
            , pOrderBy: "ID"
        }
        , null);

    InvoicePartners_GetList(pOperationPartnerID, pInvoiceOperationID, "slEditInvoicePartner"
        , function () {
            InvoiceAddressTypes_GetList(pAddressID, "slEditInvoiceAddressTypes", "slEditInvoicePartner", null);//4th parameter is the name of the sl of the partner
            InvoicePaymentTerms_GetList(pPaymentTermID, "slEditInvoicePaymentTerms"
                , function () {
                    ////EnableDisable DueDate according to Cash or not
                    //if ($("#slEditInvoicePaymentTerms option:selected").text().toUpperCase() == "CASH")
                    //    $("#txtEditInvoiceDueDate").attr("disabled", "disabled");
                    //else
                    //    $("#txtEditInvoiceDueDate").removeAttr("disabled");
                });
        });

    $("#txtEditInvoiceTaxPercentage").val($(tr).find("td.InvoiceTaxPercentage").text());
    $("#txtEditInvoiceTaxAmount").val($(tr).find("td.InvoiceTaxAmount").text());
    $("#txtEditInvoiceDiscountPercentage").val($(tr).find("td.InvoiceDiscountPercentage").text());
    $("#txtEditInvoiceDiscountAmount").val($(tr).find("td.InvoiceDiscountAmount").text());
    
    $("#txtEditInvoiceIssueDate").val($(tr).find("td.InvoiceDate").text());
    $("#txtEditInvoiceDueDate").val($(tr).find("td.InvoiceDueDate").text());
    $("#txtEditInvoiceCreationDate").val($(tr).find("td.CreationDate").text());

    $("#txtEditInvoiceAmountWithoutVAT").val($(tr).find("td.InvoiceAmountWithoutVAT").text());
    $("#txtEditInvoiceAmount").val($(tr).find("td.InvoiceAmount").text());
    $("#txtEditInvoiceMasterDataExchangeRate").val($(tr).find("td.InvoiceMasterDataExchangeRate").text());
    $("#txtEditInvoiceCustomerReference").val($(tr).find("td.InvoiceCustomerReference").text());

    $("#txtEditInvoiceLeftSignature").val($(tr).find("td.InvoiceLeftSignature").text());
    $("#txtEditInvoiceMiddleSignature").val($(tr).find("td.InvoiceMiddleSignature").text());
    $("#txtEditInvoiceRightSignature").val($(tr).find("td.InvoiceRightSignature").text());
    $("#txtEditInvoiceGRT").val($(tr).find("td.InvoiceGRT").text());
    $("#txtEditInvoiceDWT").val($(tr).find("td.InvoiceDWT").text());
    $("#txtEditInvoiceNRT").val($(tr).find("td.InvoiceNRT").text());
    $("#txtEditInvoiceLOA").val($(tr).find("td.InvoiceLOA").text());

    Invoices_FillInvoiceItems(pID, null);//to fill the available invoice items
    $("#btnSaveEditInvoice").attr("onclick", "Invoices_Update(false, false);");//parameters(pSaveAndNew, pIsRemoveItems)
    $("#btn-AddInvoiceItem").attr("data-target", "#CheckboxesListModal");
    $("#btn-AddInvoiceItem").attr("onclick", "Invoices_GetAvailableItems(" + constTransactionInvoiceApproval + ");");
}

function Invoices_SetSlInvoiceTypeProperties(pInvoiceTypeCode, pSlName) {
    if (pInvoiceTypeCode == "DRAFT")
        $("#" + pSlName).attr("disabled", "disabled");
    else {
        $("#" + pSlName).removeAttr("disabled");
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
                                Invoices_LoadAll($("#hOperationID").val());
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

    var pWhereClause = " WHERE (OperationID = " + pInvoiceOperationID + " OR MasterOperationID = " + pInvoiceOperationID + " ) \n";

    pWhereClause += " AND PartnerID IS NOT NULL ";
    pWhereClause += " AND (PartnerTypeID = " + constCustomerPartnerTypeID;
    pWhereClause += " OR PartnerTypeID = " + constAgentPartnerTypeID + ") ";
    pWhereClause += " OR ID = " + pID;
    pWhereClause += " ORDER BY PartnerTypeName ";
    //parameters: ID, strFnName, First Row in select list, select list name, whereClause, callback
    GetListOperationPartnersWithPartnerTypeIDAndPartnerIDAttrAndWhereClause(pID, "/api/OperationPartners/LoadAll", "Select Partner", pSlName, pWhereClause
        , function () {
            if ((pID == null || pID == undefined) && $("#" + pSlName + " :nth-of-type(2)").val() != undefined) {
                $("#" + pSlName).val($("#" + pSlName + " :nth-of-type(2)").val());//to select the 1st item
            }
            if (callback != null && callback != undefined)
                callback();

        });
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


function ValidateReleaseDate() {
    debugger;
    var releaseDate = $('#txtReleasingDate').val();
    releaseDate = GetDateWithFormatMM_dd_yyyy(releaseDate);

    var endDate = $("#txtStorageEndDate").val();
    endDate = GetDateWithFormatMM_dd_yyyy(endDate);

    var diff = Date.prototype.compareDates(releaseDate, endDate);
    if (diff < 0) {
        swal("Sorry", "Release Date should be less than or equal end date");
        return false;
    }
    return true;
}

function CheckInvoiceStatus(inv) {
    let InvStatus = false;
    CallGETFunctionWithParameters("api/Invoices/LoadInvoiceHeaderWithDetails", { pInvoiceIDToLoad: inv.value }, function (data) {
        let invoiceDetails = JSON.parse(data[1]);
        if (invoiceDetails.InvoiceStatus == "Paid") {
            InvStatus = true;
        }
    }, null, false);
    return InvStatus;
}




//function SendBackToInvoices(pHouseBillID) {


//    swal({
//        title: "Are you sure?",
//        text: "This House Will Be shown In Invoices",
//        type: "warning",
//        showCancelButton: true,
//        confirmButtonColor: "#DD6B55",
//        confirmButtonText: "Yes, Show!",
//        closeOnConfirm: true
//    },
//        //callback function in case of confirm delete
//        function () {
//            FadePageCover(true);
//            CallGETFunctionWithParameters("api/WH_CFS_ReleaseOrders/SendBackToInvoices", { pHouseID: parseInt($("#hHouseBillID").val()) }, function (pData) {



//                if (pData == false) {
//                    swal("Sorry", "Error Happened While Sending Back To Invoices");
//                } else {
//                    swal("Success", "Saved successfully.");

//                    jQuery("#ModelWH_CFS_ReleaseOrders").modal("hide");


//                }
//                    FadePageCover(false);
//            }, null);



//        });





//}