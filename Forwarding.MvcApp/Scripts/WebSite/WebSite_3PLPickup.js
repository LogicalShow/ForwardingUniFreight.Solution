var maxReceiveDetailsSerialIDInTable = 0; //used for when adding new row then make td control names unique
function ApplySelectListSearch() {
    debugger;
    $("#slFilterWarehouse").css({ "width": "100%" }).select2();
    $("#slFilterWarehouse").trigger("change");
    $("#slFilterPurchaseItem").css({ "width": "100%" }).select2();
    $("#slFilterPurchaseItem").trigger("change");
    $("#slFilterCustomer").css({ "width": "100%" }).select2();
    $("#slFilterCustomer").trigger("change");
    $("#slFilterPurchaseItem").css({ "width": "100%" }).select2();
    $("#slFilterPurchaseItem").trigger("change");

    $("#slWarehouse").css({ "width": "100%" }).select2();
    $("#slWarehouse").trigger("change");
    $("#slCustomer").css({ "width": "100%" }).select2();
    $("#slCustomer").trigger("change");
    $("#slPickupDetailsPurchaseItem").css({ "width": "100%" }).select2();
    $("#slPickupDetailsPurchaseItem").trigger("change");
    $("#slPersonInCharge").css({ "width": "100%" }).select2();
    $("#slPersonInCharge").trigger("change");
    $("#slBillTo").css({ "width": "100%" }).select2();
    $("#slBillTo").trigger("change");
    $("#slEndUser").css({ "width": "100%" }).select2();
    $("#slEndUser").trigger("change");
    $("#slOperation").css({ "width": "100%" }).select2();
    $("#slOperation").trigger("change");
    $("#slEquipment").css({ "width": "100%" }).select2();
    $("#slEquipment").trigger("change");

    $("div[tabindex='-1']").removeAttr('tabindex');
}
function ApplySelectListSearch_OnlyChange() {
    $("#slCustomer").css({ "width": "100%" }).select2();
    $("#slWarehouse").css({ "width": "100%" }).select2();
    $("#slPickupDetailsPurchaseItem").css({ "width": "100%" }).select2();
    $("#slPersonInCharge").css({ "width": "100%" }).select2();
    $("#slBillTo").css({ "width": "100%" }).select2();
    $("#slEndUser").css({ "width": "100%" }).select2();
    $("#slOperation").css({ "width": "100%" }).select2();
    $("#slEquipment").css({ "width": "100%" }).select2();
}
function Pickup_Initialize() {
    debugger;
    $("#hl-menu-Warehousing").parent().siblings().removeClass("active");
    strBindTableRowsFunctionName = "Pickup_BindTableRows";
    strLoadWithPagingFunctionName = "/api/Pickup/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = " WHERE CustomerID = " + pLoggedUser.CustomerID;
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/WebSite/WebSite_3PLPickup", "div-content", function () {
        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
            , function (pData) {
                var pWarehouse = pData[2];
                var pCustomer = pData[3];
                var pOperation = pData[4];
                var pEquipment = pData[5];
                FillListFromObject(null, 2, null/*pStrFirstRow*/, "slWarehouse", pWarehouse, null);
                FillListFromObject(null, 2, "<--Select-->", "slFilterWarehouse", pWarehouse, null);
                //FillListFromObject(null, 9, "<--Select-->", "slPickupDetailsPurchaseItem", pPurchaseItem, null);
                FillListFromObject(pLoggedUser.CustomerID, 2, "<--Select-->", "slCustomer", pCustomer, function () { $("#slCustomerForClearWithItems").html($("#slCustomer").html()); });
                FillListFromObject(null, 1, "<--Select-->"/*pStrFirstRow*/, "slOperation", pOperation, null);
                FillListFromObject(null, 1, "<--Select-->"/*pStrFirstRow*/, "slEquipment", pEquipment, null);
                FillListFromObject(pLoggedUser.CustomerID, 2, "<--Select-->", "slFilterCustomer", pCustomer, null);
                //$("#slCustomer").html($("#hReadySlCustomers").html());
                $("#slBillTo").html($("#hReadySlCustomers").html());
                $("#slEndUser").html($("#hReadySlCustomers").html());

                $("#slFilterCustomer").attr("disabled", true);
                $("#slCustomer").attr("disabled", true);

                Pickup_BindTableRows(JSON.parse(pData[0]));
                ApplySelectListSearch();
            });
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    },
        function () { Pickup_ClearAllControls(); },
        function () { Pickup_DeleteList(); });
}
function Pickup_BindTableRows(pPickup, pIsPDIModal) {
    debugger;
    $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblPickup");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pPickup, function (i, item) {
        AppendRowtoTable("tblPickup",
            ("<tr ID='" + item.ID + "' ondblclick='Pickup_FillAllControls(" + item.ID + ");' class='" + (item.IsFinalized ? "text-primary" : "") + "'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Code'>" + item.Code + "</td>"
                + "<td class='WarehouseID hide'>" + item.WarehouseID + "</td>"
                + "<td class='CustomerID hide'>" + item.CustomerID + "</td>"
                + "<td class='CustomerName'>" + item.CustomerName + "</td>"
                //+ "<td class='FromDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.FromDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.FromDate))) + "</td>"
                //+ "<td class='ToDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ToDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ToDate))) + "</td>"
                //+ "<td class='StorageLimit hide'>" + item.StorageLimit + "</td>"
                //+ "<td class='StorageUnitID hide'>" + item.StorageUnitID + "</td>"
                //+ "<td class='StorageUnitCode hide'>" + (item.StorageUnitCode == 0 ? "" : item.StorageUnitCode) + "</td>"
                //+ "<td class='IsByPallet hide'> <input type='checkbox' id='cbIsByPallet" + item.ID + "' disabled='disabled' " + (item.IsByPallet ? " checked='checked' " : "") + " /></td>"
                //+ "<td class='NumberOfPallets hide'>" + item.NumberOfPallets + "</td>"
                //+ "<td class='CurrencyID hide'>" + item.CurrencyID + "</td>"
                //+ "<td class='CurrencyCode'>" + item.CurrencyCode + "</td>"
                + "<td class='OrderDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.OrderDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.OrderDate))) + "</td>"
                + "<td class='RequiredDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.RequiredDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.RequiredDate))) + "</td>"
                + "<td class='FinalizeDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.FinalizeDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.FinalizeDate))) + "</td>"
                + "<td class='Status'>" + item.StatusName + "</td>"
                + "<td class='CreatorName'>" + item.CreatorName + "</td>"
                + "<td class='ModificatorName'>" + item.ModificatorName + "</td>"
                + "<td class='IsFinalized hide'> <input type='checkbox' id='cbIsFinalized" + item.ID + "' disabled='disabled' " + (item.IsFinalized ? " checked='checked' " : "") + " /></td>"
                + "<td class='hide'><a href='#PickupModal' data-toggle='modal' onclick='Pickup_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblPickup", "ID");
    CheckAllCheckbox("ID");
    if (glbCallingControl == "WebSite_3PLPickup")
        HighlightText("#tblPickup>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function Pickup_LoadingWithPaging() {
    debugger;
    var pWhereClause = Pickup_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { Pickup_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblPickup>tbody>tr", $("#txt-Search").val().trim());
}
function Pickup_GetWhereClause() {
    debugger;
    var pWhereClause = "WHERE CustomerID = " + pLoggedUser.CustomerID + " \n";
    if (glbCallingControl == "WebSite_3PLPickup") {
        if ($("#slFilterWarehouse").val() != "" && $("#slFilterWarehouse").val() != 0)
            pWhereClause += "AND WarehouseID =" + $("#slFilterWarehouse").val() + "\n";
        //if ($("#slFilterCustomer").val() != "" && $("#slFilterCustomer").val() != 0)
        //    pWhereClause += "AND CustomerID =" + $("#slFilterCustomer").val() + "\n";
        if ($("#txtFilterCode").val().trim() != "")
            pWhereClause += "AND CodeSerial=" + $("#txtFilterCode").val().trim() + "\n";
        if ($("#txt-Search").val().trim() != "")
            pWhereClause += "AND Code LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
    }
    else
        pWhereClause += "AND ReceiveDetailsID=" + $("#hPDIReceiveDetailsID").val();
    return pWhereClause;
}
function Pickup_ClearAllControls(pPDIReceiveDetailsID) {
    debugger;
    $("#tblPickupDetails tbody").html("");
    $("#slPersonInCharge").html("<option value=''><--Select--></option>");
    $(".classDisableForDetails").removeAttr("disabled");
    $("#slWarehouse").removeAttr("disabled");
    //$("#lblPickupMaxWeight").html("<span> : </span><span>" + 0 + "</span>");
    //$("#lblPickupMaxVolume").html("<span> : </span><span>" + 0 + "</span>");
    ClearAll("#PickupModal");
    ClearAll("#PickupPDIModal");
    jQuery("#PickupModal").modal("show");
    if (glbCallingControl == "PDI")
        $("#hPDIReceiveDetailsID").val(pPDIReceiveDetailsID);
    $("#slCustomer").html($("#slCustomerForClearWithItems").html());
    $("#slCustomer").attr("disabled", true);
    $("#txtOrderDate").val(getTodaysDateInddMMyyyyFormat());
    $("#txtRequiredDate").val($("#txtOrderDate").val());
    $(".classDisableForFinalized").removeAttr("disabled");

    ApplySelectListSearch_OnlyChange();
    $("#btnSave").attr("onclick", "Pickup_Save(false);");
    $("#btnSaveAndAddNew").attr("onclick", "Pickup_Save(true);");
    $("#cb-CheckAll").prop('checked', false);
}
function Pickup_FillAllControls(pID) {
    debugger;
    FadePageCover(true);
    //$("#txtNumberOfLevelsPerPickup").attr("disabled", "disabled");
    //$("#txtNumberOfTraysPerLevel").attr("disabled", "disabled");
    ClearAll("#PickupModal");
    $(".classDisableForDetails").attr("disabled", "disabled");
    $("#tblPickupDetails tbody").html("");
    jQuery("#PickupModal").modal("show");
    var pParametersWithValues = {
        pHeaderID: pID
    };
    CallGETFunctionWithParameters("/api/Pickup/LoadHeaderWithDetails", pParametersWithValues
        , function (pData) {
            var pPickupHeader = JSON.parse(pData[0]);
            var pPickupDetails = JSON.parse(pData[1]);
            var pCustomer = pData[2];
            var pPurchaseItem = pData[3];
            var pPersonInChargeList = pData[4];
            if (pPickupDetails.length > 0)
                $(".classDisableForDetails").attr("disabled", "disabled");
            else
                $(".classDisableForDetails").removeAttr("disabled");
            if (pPickupHeader.StatusName.toUpperCase() == "FINALIZED")
                $(".classDisableForFinalized").attr("disabled", "disabled");
            else
                $(".classDisableForFinalized").removeAttr("disabled");
            $("#hID").val(pID);
            $("#hPDIReceiveDetailsID").val(pPickupHeader.PDIReceiveDetailsID);
            $("#lblShown").html(": " + pPickupHeader.Code);
            $("#txtCode").val(pPickupHeader.Code);
            $("#slWarehouse").val(pPickupHeader.WarehouseID == 0 ? "" : pPickupHeader.WarehouseID);
            //$("#slCustomer").val(pPickupHeader.CustomerID == 0 ? "" : pPickupHeader.CustomerID);
            $("#slBillTo").val(pPickupHeader.BillTo == 0 ? "" : pPickupHeader.BillTo);
            $("#slEndUser").val(pPickupHeader.EndUserID == 0 ? "" : pPickupHeader.EndUserID);
            $("#slOperation").val(pPickupHeader.OperationID == 0 ? "" : pPickupHeader.OperationID);
            $("#slEquipment").val(pPickupHeader.EquipmentID == 0 ? "" : pPickupHeader.EquipmentID);
            FillListFromObject(pPickupHeader.CustomerID, 2, "<--Select-->", "slCustomer", pCustomer, function () { ApplySelectListSearch_OnlyChange(); });
            FillListFromObject(pPickupHeader.PersonInChargeID, 2, "<--Select-->", "slPersonInCharge", pPersonInChargeList, function () { ApplySelectListSearch_OnlyChange(); });
            FillListFromObject(null, 9, "<--Select-->", "slPickupDetailsPurchaseItem", pPurchaseItem, function () { ApplySelectListSearch_OnlyChange(); });
            $("#txtOrderDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pPickupHeader.OrderDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pPickupHeader.OrderDate)));
            $("#txtRequiredDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pPickupHeader.RequiredDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pPickupHeader.RequiredDate)));
            $("#txtStatus").val(pPickupHeader.StatusName);
            $("#cbIsFinalized").prop("checked", pPickupHeader.IsFinalized);
            $("#txtNotes").val(pPickupHeader.Notes == 0 ? "" : pPickupHeader.Notes);
            $("#txtDriverName").val(pPickupHeader.DriverName == 0 ? "" : pPickupHeader.DriverName);
            $("#txtRMANumber").val(pPickupHeader.RMANumber == 0 ? "" : pPickupHeader.RMANumber);
            PickupDetails_BindTableRows(pPickupDetails);
            $("#btnSave").attr("onclick", "Pickup_Save(false);");
            ApplySelectListSearch_OnlyChange();
            $("#btnSaveAndAddNew").attr("onclick", "Pickup_Save(true);");
            FadePageCover(false);
        }
        , null);
}
//pReleaseDate: ($("#txtOperationReleaseDate").val().trim() == "" ? "0" : PadDateWithZeroes($("#txtOperationReleaseDate").val().trim())),
function Pickup_Save(pSaveAndNew) {
    debugger;
    FadePageCover(true);
    if (!isValidDate($("#txtOrderDate").val().trim(), 1) || !isValidDate($("#txtRequiredDate").val().trim(), 1)) {
        swal(strSorry, "Please, enter dates.");
        FadePageCover(false);
    }
    else if ($("#txtOrderDate").val().trim() != "" && $("#txtRequiredDate").val().trim() != ""
        && Date.prototype.compareDates(ConvertDateFormat($("#txtOrderDate").val().trim()), ConvertDateFormat($("#txtRequiredDate").val().trim())) < 0) {
        FadePageCover(false);
        swal("Sorry", "Please, check dates.");
    }
    else if (ValidateForm("form", "PickupModal")) {
        pParametersWithValues = {
              ID: $("#hID").val() == "" ? 0 : $("#hID").val()
            , WarehouseID: $("#slWarehouse").val() == "" ? "0" : $("#slWarehouse").val()
            , CustomerID: $("#slCustomer").val() == "" ? "0" : $("#slCustomer").val()
            , BillTo: $("#slBillTo").val() == "" ? "0" : $("#slBillTo").val()
            , EndUserID: $("#slEndUser").val() == "" ? "0" : $("#slEndUser").val()
            , OrderDate: ($("#txtOrderDate").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtOrderDate").val().trim()))
            , RequiredDate: ($("#txtRequiredDate").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtRequiredDate").val().trim()))
            , IsFinalized: $("#cbIsFinalized").prop("checked")
            , FinalizeDate: "01/01/1900"
            , Notes: $("#txtNotes").val().trim() == "" ? "0" : $("#txtNotes").val().trim().toUpperCase()
            , DriverName: $("#txtDriverName").val().trim() == "" ? "0" : $("#txtDriverName").val().trim().toUpperCase()
            , OperationID: $("#slOperation").val() == "" ? "0" : $("#slOperation").val()
            , EquipmentID: $("#slEquipment").val() == "" ? "0" : $("#slEquipment").val()
            , RMANumber: $("#txtRMANumber").val().trim() == "" ? "0" : $("#txtRMANumber").val().trim().toUpperCase()
            , PersonInChargeID: $("#slPersonInCharge").val() == "" ? "0" : $("#slPersonInCharge").val()
            , PDIReceiveDetailsID: $("#hPDIReceiveDetailsID").val() == "" ? 0 : $("#hPDIReceiveDetailsID").val()
        };
        CallGETFunctionWithParameters("/api/Pickup/Save", pParametersWithValues
            , function (pData) {
                if (pData[0] == "") {
                    var pPickupHeader = JSON.parse(pData[2]);
                    //var pPickupDetails = JSON.parse(pData[3]);
                    if (glbCallingControl == "WebSite_3PLPickup")
                        Pickup_LoadingWithPaging();
                    else
                        PDI_LoadPickupPDIModal($("#hPDIReceiveDetailsID").val());
                    if (pSaveAndNew) {
                        Pickup_ClearAllControls();
                    }
                    else {
                        $("#hID").val(pData[1]);
                        $("#txtCode").val(pPickupHeader.Code);
                        $("#txtStatus").val(pPickupHeader.StatusName);
                        //PickupDetails_BindTableRows(pPickupDetails);
                        $("#btnSave").attr("onclick", "Pickup_Save(false);");
                        $("#btnSaveAndAddNew").attr("onclick", "Pickup_Save(true);");
                    }
                    swal("Success", "Saved successfully.");
                }
                else {
                    swal("Sorry", pData[0]);
                    FadePageCover(false);
                }
            }
            , null);
    }
    else //if (ValidateForm("form", "PickupModal"))
        FadePageCover(false);
}
function Pickup_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblPickup') != "")
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
                DeleteListFunction("/api/Pickup/Delete", { "pPickupIDs": GetAllSelectedIDsAsString('tblPickup') }
                    , function () {
                        if (glbCallingControl == "WebSite_3PLPickup")
                            Pickup_LoadingWithPaging();
                        else
                            PDI_LoadPickupPDIModal($("#hPDIReceiveDetailsID").val());
                    });
            });
    //DeleteListFunction("/api/Pickup/Delete", { "pPickupIDs": GetAllSelectedIDsAsString('tblPickup') }, function () { Pickup_LoadingWithPaging(); });
}
function Pickup_slCustomerChanged() {
    debugger;
    if ($("#slCustomer").val() == "")
        $("#slPersonInCharge").html("<option value=''><--Select--></option>");
    else {
        FadePageCover(true);
        var pWhereClause = "WHERE PartnerTypeID=" + constCustomerPartnerTypeID + " AND PartnerID=" + $("#slCustomer").val() + " ORDER BY Name";
        CallGETFunctionWithParameters("/api/Contacts/LoadAll", { pWhereClause: pWhereClause }
            , function (pData) {
                FillListFromObject(null, 2, "<--Select-->", "slPersonInCharge", pData[0], null);
                FadePageCover(false);
            }
            , null);
    }
    $("#slBillTo").val($("#slCustomer").val());
    $("#slEndUser").val($("#slCustomer").val());
}
function Pickup_Finalize(pIsFinalize) {
    debugger;
    if ($("#hID").val() == "")
        swal("Sorry", "Please save the order first.");
    else {
        swal({
            title: "Are you sure?",
            text: "This pickup will be finalized!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, finalize!",
            closeOnConfirm: true
        },
            //callback function in case of confirm
            function () {
                FadePageCover(true);
                CallGETFunctionWithParameters("/api/Pickup/Finalize"
                    , { pFinalizedPickupID: $("#hID").val(), pIsFinalize: pIsFinalize }
                    , function (pData) {
                        if (pData[0] == "") {
                            swal("Success", "Saved successfully.");
                            if (pIsFinalize) {
                                $(".classDisableForFinalized").attr("disabled", "disabled");
                                $("#txtStatus").val("FINALIZED");
                                $("#tblPickup tr[ID=" + $("#hID").val() + "] td.Status").text("FINALIZED");
                            }
                            else {
                                $(".classDisableForFinalized").removeAttr("disabled");
                                $("#txtStatus").val("");
                                $("#tblPickup tr[ID=" + $("#hID").val() + "] td.Status").text("");
                            }
                            if (glbCallingControl == "WebSite_3PLPickup")
                                Pickup_LoadingWithPaging();
                            else
                                PDI_LoadPickupPDIModal($("#hPDIReceiveDetailsID").val());
                        }
                        else {
                            FadePageCover(true);
                            swal("Sorry", pData[0]);
                        }
                    }
                    , null);
            });
    }
}
function Pickup_GetAvailableUsers() {
    debugger;
    Receptionists_GetAvailableUsers();
    $("#btnCheckboxesListApply").attr("onclick", "Pickup_SendNotification();");
    $("#btnCheckboxesListApply").html("<span class='glyphicon glyphicon-send'></span> Send");
    $("#btn-SearchItems").attr("onclick", "Receptionists_GetAvailableUsers();");
}
function Pickup_SendNotification() {
    debugger;
    var pModalName = "CheckboxesListModal";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pSelectedAlarmReceiversIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
    if ($("#hID").val() == "")
        swal("Sorry", "Please, save first.");
    else if (pSelectedAlarmReceiversIDs == "")
        swal("Sorry", "Please, select receivers.");
    else {
        var pSubject = "Pickup: " + $("#txtCode").val();
        var pBody = "Sender: " + pLoggedUser.Name;
        pBody += "<br>Please, handle Pickup " + $("#txtCode").val();
        var pOperationID = 0;
        var pIsSendNormalEmail = pDefaults.UnEditableCompanyName == "NIL" ? false : false;
        SendNormalAndLocalEmail(pSubject, pBody, pOperationID, pIsSendNormalEmail);
    }
}
function PickList_Print() {
    debugger;
    CallGETFunctionWithParameters("/api/Reports/GetLogoPath", { pLogoSubPath: "Content/Images/CompanyHeader.jpg" }, function (paths) {
        var arr_Keys = new Array();
        var arr_Values = new Array();
        let query = "Rep_3PLPickList ' WHERE P.ID = " + $("#hID").val() + "'";
        arr_Keys.push("Logo");
        arr_Values.push(paths.logoPath);

        var pParametersWithValues =
        {
            query: query
            , arr_Keys: arr_Keys
            , arr_Values: arr_Values
            , pTitle: "Pick List"
            , pReportName: "Rep_3PLPickList"
            , pReportType: "Print"
        };
        var win = window.open("", "_blank");
        var url = '/ReportMainClass/PrintReportQueryAndParams?pTitle="' + pParametersWithValues.pTitle + '"'
            + '&query=' + pParametersWithValues.query + ''
            + '&arr_Keys=' + pParametersWithValues.arr_Keys + ''
            + '&arr_Values=' + pParametersWithValues.arr_Values + ''
            + '&pReportName=' + pParametersWithValues.pReportName + ''
            + '&pReportType=' + pParametersWithValues.pReportType + '';

        win.location = url;
    })
}
function PickupDetails_Print() {
    debugger;
    if ($("#hID").val() == "")
        swal("Sorry", "Please, save pickup first.");
    else {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/Pickup/Print", { pPrintedPickupID: $("#hID").val() }
            , function (pData) {
                var _ReturnedMessage = pData[0];
                if (pData[0] != "")
                    swal("Sorry", _ReturnedMessage);
                else { //Draw
                    var pHeader = JSON.parse(pData[1]);
                    var pDetails = JSON.parse(pData[2]);
                    var mywindow = window.open('', '_blank');
                    var ReportHTML = '';
                    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>' + 'Proof of Delivery' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    ReportHTML += '         <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
                    if (pDefaults.UnEditableCompanyName == "DGL")
                        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3>' + 'DELIVERY ORDER' + '</h3></div> </br>';
                    else
                        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3>' + 'PROOF OF DELIVERY' + '</h3></div> </br>';
                    ReportHTML += '             <div class="col-xs-4"><b>Date: ' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pHeader.RequiredDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(pHeader.RequiredDate)) : "") + '</b></div>';
                    ReportHTML += '             <div class="col-xs-4"><b>Pickup Code : </b>' + pHeader.Code + '</div>';
                    ReportHTML += '             <div class="col-xs-4"><b>Status : </b>' + pHeader.StatusName + '</div>';
                    ReportHTML += '             <div class="col-xs-12"><b>On behalf of : </b>' + pHeader.CustomerName + '</div>';
                    ReportHTML += '             <div class="col-xs-12"><b>Person in charge : </b>' + (pHeader.PersonInChargeName == 0 ? pHeader.BillToName : pHeader.PersonInChargeName) + '</div>'; //billto
                    //ReportHTML += '             <div class="col-xs-12"><b>Address : </b>' + (pHeader.BillToAddress == 0 ? "" : pHeader.BillToAddress) + '</div>';
                    //ReportHTML += '             <div class="col-xs-12"><b>Contact Name : </b>' + (pHeader.BillToContactName == 0 ? "" : pHeader.BillToContactName) + '</div>';
                    //ReportHTML += '             <div class="col-xs-12"><b>Contact No. : </b>' + (pHeader.BillToContactPhones == 0 ? "" : pHeader.BillToContactPhones) + '</div>';
                    ReportHTML += '             <div class="col-xs-12"><b>Delivered to : </b>' + (pHeader.EndUserName == 0 ? "" : pHeader.EndUserName) + '</div>';
                    ReportHTML += '             <div class="col-xs-12"><b>Address : </b>' + (pHeader.EndUserAddress == 0 ? "" : pHeader.EndUserAddress) + '</div>';
                    ReportHTML += '             <div class="col-xs-12"><b>Contact Name : </b>' + (pHeader.EndUserContactName == 0 ? "" : pHeader.EndUserContactName) + '</div>';
                    ReportHTML += '             <div class="col-xs-12"><b>Contact No. : </b>' + (pHeader.EndUserContactPhones == 0 ? "" : pHeader.EndUserContactPhones) + '</div>';
                    ReportHTML += '             <div class="col-xs-4"><b>Operation : </b>' + (pHeader.OperationCode == 0 ? "" : pHeader.OperationCode) + '</div>';
                    ReportHTML += '             <div class="col-xs-4"><b>PO Number : </b>' + (pHeader.PONumber == 0 ? "" : pHeader.PONumber) + '</div>';
                    ReportHTML += '             <div class="col-xs-4"><b>RMA No. : </b>' + (pHeader.RMANumber == 0 ? "" : pHeader.RMANumber) + '</div>';
                    ReportHTML += '             <div class="col-xs-4"><b>Driver Name : </b>' + (pHeader.DriverName == 0 ? "" : pHeader.DriverName) + '</div>';
                    ReportHTML += '             <div class="col-xs-4"><b>Equipment : </b>' + (pHeader.EquipmentName == 0 ? "" : pHeader.EquipmentName) + '</div>';
                    ReportHTML += '                         <table id="tblPickedDetails_POD" class="table table-striped b-t b-light text-sm table-bordered">'; //table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    ReportHTML += '                                     <th>Quantity</th>';
                    ReportHTML += '                                     <th>Pkg.Type</th>';
                    ReportHTML += '                                     <th>Part No.</th>';
                    if (pDefaults.UnEditableCompanyName == "NIL") {
                        ReportHTML += '                                     <th>Model No.</th>';
                        ReportHTML += '                                     <th>Brand</th>';
                    } //if (pDefaults.UnEditableCompanyName == "NIL") {
                    ReportHTML += '                                     <th>Description of Goods</th>';
                    ReportHTML += '                                     <th>Serial</th>';
                    if (pDefaults.UnEditableCompanyName == "EXP") {
                        ReportHTML += '                                     <th>Batch</th>';
                        ReportHTML += '                                     <th>Expiration</th>';
                        ReportHTML += '                                     <th>ImportedBy</th>';
                        //ReportHTML += '                                     <th>Wgt</th>';
                    }
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    debugger;
                    var _TotalQuantity = 0.0;
                    var _TotalGrossWeight = 0.0;
                    var _TotalVolume = 0.0;
                    var _WeightUnitCode = 'KGM';
                    var _VolumeUnitCode = 'CBM';
                    $.each(pDetails, function (i, item) {
                        var _RowQuantity = (item.Serial == 0 ? item.PickedQuantity : 1);
                        var _RowGrossWeight = _RowQuantity * item.GrossWeight;
                        var _RowVolume = _RowQuantity * item.Volume;
                        _WeightUnitCode = item.WeightUnitCode;
                        _VolumeUnitCode = item.VolumeUnitCode;
                        _TotalQuantity += _RowQuantity;
                        _TotalGrossWeight += _RowGrossWeight;
                        _TotalVolume += _RowVolume;
                        ReportHTML += '                                     <tr class="" style="font-size:95%;">';
                        ReportHTML += '                                         <td class="Quantity">' + (item.Serial == 0 ? item.PickedQuantity : '1') + '</td>';
                        ReportHTML += '                                         <td>' + (item.PackageTypeName == 0 ? '' : item.PackageTypeName) + '</td>';
                        ReportHTML += '                                         <td>' + (item.PartNumber == 0 ? '' : item.PartNumber) + '</td>';
                        if (pDefaults.UnEditableCompanyName == "NIL") {
                            ReportHTML += '                                         <td>' + (item.ModelNumber == 0 ? '' : item.ModelNumber) + '</td>';
                            ReportHTML += '                                         <td>' + (item.BrandName == 0 ? '' : item.BrandName) + '</td>';
                        } //if (pDefaults.UnEditableCompanyName == "NIL") {
                        ReportHTML += '                                         <td>' + (item.PurchaseItemName == 0 ? '' : item.PurchaseItemName) + '</td>';
                        ReportHTML += '                                         <td>' + (item.Serial == 0 ? 'N/A' : item.Serial) + '</td>';
                        ReportHTML += '                                         <td class="hide GrossWeight">' + _RowGrossWeight + '</td>';
                        ReportHTML += '                                         <td class="hide Volume">' + _RowVolume + '</td>';
                        if (pDefaults.UnEditableCompanyName == "EXP") {
                            ReportHTML += '                                 <td>' + (item.BatchNumber == 0 ? "" : item.BatchNumber) + '</td>';
                            ReportHTML += '                                 <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ExpirationDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate))) + '</td>';
                            ReportHTML += '                                 <td>' + (item.ImportedBy == 0 ? "" : item.ImportedBy) + '</td>';
                            //ReportHTML += '                                 <td>' + (item.WeightInTons == 0 ? "" : item.WeightInTons) + '</td>';
                        }
                        ReportHTML += '                                     </tr>';
                    });
                    /*********************************Summary*****************************************/
                    if (pDefaults.UnEditableCompanyName == "DGL") {
                        ReportHTML += '                                     <tr class="" style="font-size:95%;">';
                        ReportHTML += '                                         <td colspan=4>' + 'Total No of Items = ' + _TotalQuantity.toFixed(2) + ' &emsp; GrossWeight = ' + _TotalGrossWeight.toFixed(2) + ' ' + _WeightUnitCode + ' &emsp; Volume = ' + _TotalVolume.toFixed(4) + ' ' + _VolumeUnitCode + '</td>';
                        ReportHTML += '                                     </tr>';
                    }
                    /*********************************EOF Summary*****************************************/
                    ReportHTML += '                             </tbody>';
                    ReportHTML += '                         </table>';

                    ReportHTML += '                         <div class="col-xs-7"><b>Received By : &nbsp;&nbsp;</b>' + '  _______________________________________	 ' + '</div>';
                    ReportHTML += '                         <div class="col-xs-5"><b>Signature : </b>' + '  _______________________	 ' + '</div>';
                    ReportHTML += '                         <div class="col-xs-7"><b>ID No. : &emsp;&emsp;&emsp;&nbsp;&nbsp;</b>' + '  _______________________________________	 ' + '</div>';
                    ReportHTML += '                         <div class="col-xs-5"><b>Date : &emsp;&emsp;&emsp;&emsp;</b>' + getTodaysDateInddMMyyyyFormat() + '</div>';
                    ReportHTML += '                         <div class="col-xs-12"><b>Mobile : &emsp;&emsp;&emsp;&nbsp;</b>' + '  _______________________________________	 ' + '</div>';

                    ReportHTML += '                         <div class="col-xs-12 text-center m-t"><b>' + '  The goods are received in good condition and there were no scratches.   ' + '</b></div>';
                    ReportHTML += '                         <div class="col-xs-12 text-center"><b>' + '  تم إستلام البضاعة فى حالة سليمة ولا يوجد أى خدوش   ' + '</b></div>';
                    ReportHTML += '                         <div class="col-xs-12 text-center"><b>' + '  رجاء الختم بخاتم الشركه بما يفيد الاستلام  ' + '</b></div>';
                    ReportHTML += '                         <div class="col-xs-12 text-center"><b>' + '  Please stamp the receipt.	 ' + '</b></div>';
                    ReportHTML += '         </body>';
                    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                    //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                    mywindow.document.write(ReportHTML);
                    mywindow.document.close();
                }
                FadePageCover(false);
            } //function(pData)
            , null);
    } //EOF else
}

//*********************************Reading Excel Files***************************************//
function PickupDetails_Import() {
    debugger;
    if ($("#hID").val() == "" || $("#slCustomer").val() == "")
        swal("Sorry", "Please, save basic data first, and make sure to select Customer.");
    else
        $("#btnAddFromExcel").click();
}
function onFileSelected(event) { //Must be saved as Excel 97-2003
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
                if (oJS.length > 0 && oJS[0].ProductCode != undefined) //if (sCSV != "")
                    ImportFromExcelFile(oJS);
                else
                    swal("Sorry", "Please, revise data and version of the file.");
            });
        };
        // Tell JS To Start Reading The File.. You could delay this if desired
        reader.readAsBinaryString(selectedFile);
    }
}
function ImportFromExcelFile(pDataRows) {
    debugger;
    FadePageCover(true);
    let pPurchaseItemCodeList = "";
    let pFromLocationList = "";
    let pQuantityList = "";
    for (var i = 0; i < pDataRows.length; i++) { //replace '\', ' ', ',' with space
        if (pDataRows[i].ProductCode == undefined || pDataRows[i].FromLocation == undefined || pDataRows[i].Quantity == undefined) {
            FadePageCover(false);
            $("#btnAddFromExcel").val(""); //if removed the last selected file remains till unselected
            swal("Sorry", "Please, check row " + (i + 2));
            return;
        }
        else {
            pPurchaseItemCodeList += (pPurchaseItemCodeList == "" ? (pDataRows[i].ProductCode == undefined || pDataRows[i].ProductCode.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].ProductCode.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].ProductCode == undefined || pDataRows[i].ProductCode.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].ProductCode.replace(/[\, ]/g, ' ').toUpperCase().trim())));
            pFromLocationList += (pFromLocationList == "" ? (pDataRows[i].FromLocation == undefined || pDataRows[i].FromLocation.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].FromLocation.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].FromLocation == undefined || pDataRows[i].FromLocation.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].FromLocation.replace(/[\, ]/g, ' ').toUpperCase().trim())));
            pQuantityList += (pQuantityList == "" ? (pDataRows[i].Quantity == undefined || pDataRows[i].Quantity.replace(/[\, ]/g, ' ').trim() == "" ? 0 : parseInt(pDataRows[i].Quantity.replace(/[\, ]/g, ' ').toUpperCase().trim())) : ("," + (pDataRows[i].Quantity == undefined || pDataRows[i].Quantity.replace(/[\, ]/g, ' ').trim() == "" ? 0 : parseInt(pDataRows[i].Quantity.replace(/[\, ]/g, ' ').toUpperCase().trim()))));
        }
    }

    var pParametersWithValues = {
        pPickupID: $("#hID").val()
        , pWarehouseID: $("#slWarehouse").val()
        , pCustomerID: $("#slCustomer").val()
        , pPurchaseItemCodeList: pPurchaseItemCodeList
        , pFromLocationList: pFromLocationList
        , pQuantityList: pQuantityList
    };
    CallPOSTFunctionWithParameters("/api/Pickup/PickupDetails_ImportFromExcel", pParametersWithValues
        , function (pData) {
            var _ReturnedMessage = pData[0];
            if (_ReturnedMessage == "") {
                swal("Success", "Saved Successfully.");
            }
            else {
                swal("Sorry", _ReturnedMessage);
            }
            Pickup_FillAllControls($("#hID").val());
            FadePageCover(false);
        }
        , null);
    $("#btnAddFromExcel").val(""); //if removed the last selected file remains till unselected
}

/***************************************PickupDetails***************************************/
function PickupDetails_BindTableRows(pPickupDetails) {
    debugger;
    if (pPickupDetails.length == 0)
        $("#slWarehouse").removeAttr("disabled");
    else
        $("#slWarehouse").attr("disabled", "disabled");
    ClearAllTableRows("tblPickupDetails");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pPickupDetails, function (i, item) {
        AppendRowtoTable("tblPickupDetails",
            ("<tr ID='" + item.ID + "' " + (1 == 1 ? ("ondblclick='PickupDetails_FillControls(" + item.ID + ");'") : "") + ">"
                + "<td class='ID'> <input " + (1 == 1 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "'></td>"
                + "<td class='PickupID hide'>" + item.PickupID + "</td>"
                //+ "<td class='BarCode'>" + (item.BarCode == 0 ? "" : item.BarCode) + "</td>"
                + "<td class='PurchaseItemID hide'>" + (item.PurchaseItemID == 0 ? "" : item.PurchaseItemID) + "</td>"
                + "<td class='PurchaseItemCode'>" + (item.PurchaseItemCode == 0 ? "" : item.PurchaseItemCode) + "</td>"
                + "<td class='PurchaseItemName'>" + (item.PurchaseItemName == 0 ? "" : item.PurchaseItemName) + "</td>"
                //+ "<td class='ReceiveDetailsID hide'>" + (item.ReceiveDetailsID == 0 ? "" : item.ReceiveDetailsID) + "</td>"
                //+ "<td class='ReceiveCode'>" + (item.ReceiveCode == 0 ? "" : item.ReceiveCode) + "</td>"
                //+ "<td class='LocationID hide'>" + (item.LocationID == 0 ? "" : item.LocationID) + "</td>"
                //+ "<td class='LocationCode'>" + (item.LocationCode == 0 ? "" : item.LocationCode) + "</td>"
                + "<td class='DemandedQuantity hide'>" + item.DemandedQuantity + "</td>"
                + "<td class='PickedQuantity'>" + item.PickedQuantity + "</td>"
                + "<td class='Notes'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                //+ "<td class='PackageTypeID hide'>" + (item.PackageTypeID == 0 ? "" : item.PackageTypeID) + "</td>"
                //+ "<td class='PackageTypeName'>" + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + "</td>"
                + "<td class='hide'><a href='#PickupDetailsModal' data-toggle='modal' onclick='PickupDetails_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
                + "</tr>"));
    });
    ////ApplyPermissions();
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    BindAllCheckboxonTable("tblPickupDetails", "ID", "cb-CheckAll-PickupDetails");
    CheckAllCheckbox("HeaderDeletePickupDetailsID");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function PickupDetails_ClearAllControls() {
    debugger;
    //$("#lblShown").html(": " + pPickupHeader.Code);
    if ($("#hID").val() == "")
        swal("Sorry", "Please, save header first.");
    else if (ValidateForm("form", "PickupModal")) {
        FadePageCover(true);
        ClearAll("#PickupDetailsModal");
        $("#tblReceiveDetails tbody").html("");
        $("#tblPickupDetailsLocation tbody").html("");
        $("#lblPickupDetailsShown").html($("#lblShown").html());
        $("#slPickupDetailsReceive").html("<option value=''><--Select--></option>");
        $("#slPickupDetailsPurchaseItem").html("<option value=''><--Select--></option>");
        $("#slPickupDetailsLocation").html("<option value=''><--Select--></option>");
        CallGETFunctionWithParameters("/api/Pickup/PickupDetails_GetAvailablePurchaseItemsForCustomer"
            , {
                pCustomerID: $("#slCustomer").val()
                , pIsExcludeVehicle: glbCallingControl == "PDI" ? true : false
            }
            , function (pData) {
                var pPurchaseItem = pData[0];
                FillListFromObject(null, 9, "<--Select-->", "slPickupDetailsPurchaseItem", pPurchaseItem, function () { ApplySelectListSearch_OnlyChange(); });
                FadePageCover(false);
            }
            , null);
        jQuery("#PickupDetailsModal").modal("show");
        $("#btnSavePickupDetails").attr("onclick", "PickupDetails_Save(false);");
        $("#btnSaveAndAddNewPickupDetails").attr("onclick", "PickupDetails_Save(true);");
    }
}
function PickupDetails_FillControls(pID) {
    debugger;
    //FadePageCover(true);
    ClearAll("#PickupDetailsModal");
    $("#lblPickupDetailsShown").html($("#lblShown").html());
    $("#tblReceiveDetails tbody").html("");
    $("#tblPickupDetailsLocation tbody").html("");
    $("#hPickupDetailsID").val(pID);
    var tr = $("#tblPickupDetails tr[ID='" + pID + "']");
    $("#txtPickupDetailsBarCode").val($(tr).find("td.BarCode").text());
    $("#slPickupDetailsPurchaseItem").val($(tr).find("td.PurchaseItemID").text());
    $("#txtPickupDetailsDemandedQuantity").val($(tr).find("td.DemandedQuantity").text());
    $("#txtPickupDetailsPickedQuantity").val($(tr).find("td.PickedQuantity").text());
    PickupDetails_FillModalTables();
    ApplySelectListSearch_OnlyChange();
    jQuery("#PickupDetailsModal").modal("show");
}
function PickupDetails_FillModalTables() {
    debugger;
    $("#tblReceiveDetails tbody").html("");
    $("#tblPickupDetailsLocation tbody").html("");
    if ($("#slPickupDetailsPurchaseItem").val() == "")
        ; //do nothing
    else if (ValidateForm("form", "PickupModal")) {
        FadePageCover(true);
        var pParametersWithValues = {
            pPickupID: $("#hID").val() == "" ? 0 : $("#hID").val()
            , pPurchaseItemIDs: $("#slPickupDetailsPurchaseItem").val() == "" ? "0" : $("#slPickupDetailsPurchaseItem").val().toString()
            //, pPickupDetailsID: $("#hPickupDetailsID").val() == "" ? 0 : $("#hPickupDetailsID").val()
            //, pWhereClauseReceiveDetails: "WHERE IsFinalized=1 AND WarehouseID=" + $("#slWarehouse").val() + " AND PurchaseItemID= " + $("#slPickupDetailsPurchaseItem").val() + " AND CustomerID=" + $("#slCustomer").val()
            , pWhereClauseReceiveDetails: "WHERE WarehouseID=" + $("#slWarehouse").val() + " AND PurchaseItemID= " + $("#slPickupDetailsPurchaseItem").val() + " AND CustomerID=" + $("#slCustomer").val() + " AND IsFinalized=1"
        };
        CallGETFunctionWithParameters("/api/Pickup/PickupDetails_FillModalTables", pParametersWithValues
            , function (pData) {
                var pReceiveDetails = JSON.parse(pData[0]);
                var pPickupDetailsLocation = JSON.parse(pData[1]);
                var pPickupDetailsHeader = JSON.parse(pData[2]);
                if (pPickupDetailsHeader == null) {
                    $("#hPickupDetailsID").val("");
                    $("#txtPickupDetailsDemandedQuantity").val("");
                    $("#txtPickupDetailsPickedQuantity").val("");
                    $("#txtPickupDetailsNotes").val("");
                }
                else {
                    $("#hPickupDetailsID").val(pPickupDetailsHeader.ID);
                    $("#txtPickupDetailsDemandedQuantity").val(pPickupDetailsHeader.DemandedQuantity);
                    $("#txtPickupDetailsPickedQuantity").val(pPickupDetailsHeader.PickedQuantity);
                    $("#txtPickupDetailsNotes").val(pPickupDetailsHeader.Notes == 0 ? "" : pPickupDetailsHeader.Notes);
                }
                ReceiveDetails_BindTableRows(pReceiveDetails, pPickupDetailsLocation);
                PickupDetailsLocation_BindTableRows(pPickupDetailsLocation);
                FadePageCover(false);
            }
            , null);
    }
}
function PickupDetails_Save(pSaveAndNew) {
    debugger;
    FadePageCover(true);
    var _MessageRturned = PickupDetailsLocation_ValidateToSave();
    var pReceiveDetailsIDList = GetAllIDsAsStringWithNameAttr('tblReceiveDetails', 'Delete');
    if (pReceiveDetailsIDList == "") {
        swal("Sorry", "No receive details.");
        FadePageCover(false);
    }
    else if (_MessageRturned != "") {
        swal("Sorry", _MessageRturned);
        FadePageCover(false);
    }
    else if (ValidateForm("form", "PickupDetailsModal")) {
        var pReceiveDetailsPickedQuantityList = "";
        for (var i = 0; i < pReceiveDetailsIDList.split(',').length; i++) {
            var _PickedQuantity = $("#txtReceiveDetailsPickedQuantity" + pReceiveDetailsIDList.split(',')[i]).val();
            _PickedQuantity = (parseFloat(_PickedQuantity) == 0 || _PickedQuantity == "" ? 0 : _PickedQuantity);
            pReceiveDetailsPickedQuantityList += pReceiveDetailsPickedQuantityList == "" ? _PickedQuantity : (',' + _PickedQuantity);
        } //for (var i = 0; i < pReceiveDetailsIDList.split(',').length; i++) {
        var pParametersWithValues = {
            //TODO: Send Header Details to save
              PickupID: $("#hID").val()
            , WarehouseID: $("#slWarehouse").val() == "" ? "0" : $("#slWarehouse").val()
            , CustomerID: $("#slCustomer").val() == "" ? "0" : $("#slCustomer").val()
            , BillTo: $("#slBillTo").val() == "" ? "0" : $("#slBillTo").val()
            , EndUserID: $("#slEndUser").val() == "" ? "0" : $("#slEndUser").val()
            , OrderDate: ($("#txtOrderDate").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtOrderDate").val().trim()))
            , RequiredDate: ($("#txtRequiredDate").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtRequiredDate").val().trim()))
            , IsFinalized: $("#cbIsFinalized").prop("checked")
            , FinalizeDate: "01/01/1900"
            , HeaderNotes: $("#txtNotes").val().trim() == "" ? "0" : $("#txtNotes").val().trim().toUpperCase()
            , DriverName: $("#txtDriverName").val().trim() == "" ? "0" : $("#txtDriverName").val().trim().toUpperCase()
            , OperationID: $("#slOperation").val() == "" ? "0" : $("#slOperation").val()
            , EquipmentID: $("#slEquipment").val() == "" ? "0" : $("#slEquipment").val()
            , RMANumber: $("#txtRMANumber").val().trim() == "" ? "0" : $("#txtRMANumber").val().trim().toUpperCase()//PickupDetailsParameters
            , PersonInChargeID: $("#slPersonInCharge").val() == "" ? "0" : $("#slPersonInCharge").val()
            , PickupDetailsID: $("#hPickupDetailsID").val() == "" ? 0 : $("#hPickupDetailsID").val()
            , PurchaseItemID: $("#slPickupDetailsPurchaseItem").val() == "" ? 0 : $("#slPickupDetailsPurchaseItem").val()
            , DemandedQuantity: $("#txtPickupDetailsDemandedQuantity").val() == "" ? 0 : $("#txtPickupDetailsDemandedQuantity").val()
            , Notes: $("#txtPickupDetailsNotes").val().trim() == "" ? 0 : $("#txtPickupDetailsNotes").val().toUpperCase()
            //PickupDetailsLocationsParameters
            , ReceiveDetailsIDList: pReceiveDetailsIDList
            , ReceiveDetailsPickedQuantityList: pReceiveDetailsPickedQuantityList
        };
        CallPOSTFunctionWithParameters("/api/Pickup/PickupDetails_Save", pParametersWithValues
            , function (pData) {
                var _MessageRetuned = pData[4];
                if (_MessageRetuned == "") {
                    $(".classDisableForDetails").attr("disabled", "disabled");
                    var pPickupHeader = JSON.parse(pData[2]);
                    var pPickupDetailsID = pData[3];
                    $("#hPickupDetailsID").val(pPickupDetailsID);
                    $("#txtStatus").val(pPickupHeader.StatusName);
                    $("#tblPickup tr[ID=" + pPickupHeader.ID + "] td.Status").text(pPickupHeader.StatusName);
                    PickupDetails_BindTableRows(JSON.parse(pData[1]));
                    $("#slWarehouse").val(pPickupHeader.WarehouseID);
                    PickupDetails_FillModalTables();
                    if (pSaveAndNew) {
                        ClearAll("#PickupDetailsModal");
                    }
                    else
                        jQuery("#PickupDetailsModal").modal("hide");
                    swal("Success", "Saved successfully.");
                    if (glbCallingControl == "WebSite_3PLPickup")
                        Pickup_LoadingWithPaging();
                    else
                        PDI_LoadPickupPDIModal($("#hPDIReceiveDetailsID").val());
                }
                else {
                    swal("Sorry", _MessageRetuned);
                    FadePageCover(false);
                }
            }
            , null);
    }
    else
        FadePageCover(false);
}
function PickupDetails_DeleteList() {
    debugger;
    //Confirmation message to delete
    var pPickupDetailsIDsToDelete = GetAllSelectedIDsAsString('tblPickupDetails');
    if (pPickupDetailsIDsToDelete != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
            //callback function in case of confirm
            function () {
                FadePageCover(true);
                CallGETFunctionWithParameters("/api/Pickup/PickupDetails_Delete"
                    , { pPickupDetailsIDsToDelete: pPickupDetailsIDsToDelete, pPickupID: $("#hID").val() }
                    , function (pData) {
                        var pPickupDetails = JSON.parse(pData[1]);
                        if (pPickupDetails.length > 0)
                            $(".classDisableForDetails").attr("disabled", "disabled");
                        else
                            $(".classDisableForDetails").removeAttr("disabled");
                        if (pData[0]) {
                            var pPickupHeader = JSON.parse(pData[2]);
                            $("#txtStatus").val(pPickupHeader.StatusName);
                            $("#tblPickup tr[ID=" + pPickupHeader.ID + "] td.Status").text(pPickupHeader.StatusName);
                            PickupDetails_BindTableRows(pPickupDetails);
                        }
                        else {
                            PickupDetails_BindTableRows(pPickupDetails);
                            swal("Sorry", strDeleteFailMessage);
                        }
                        FadePageCover(false);
                    });
            });
}
function PickupDetails_PurchaseItemChanged() {
    debugger;
    $("#hPickupDetailsID").val("");
    $("#txtPickupDetailsDemandedQuantity").val("");
    $("#txtPickupDetailsPickedQuantity").val("");
    $("#txtPickupDetailsNotes").val("");

    $("#tblReceiveDetails tbody").html("");
    $("#tblPickupDetailsLocation tbody").html("");
}
function PickupDetails_Export(pCalledFrom) {
    debugger;
    if (pCalledFrom == "FromFilter" && ($("#slFilterCustomer").val() == "" || $("#slFilterCustomer").val() == 0))
        swal("Sorry", "Please, select customer.");
    else if ($("#hID").val() == "")
        swal("Sorry", "No records to export.");
    else {
        FadePageCover(true);
        var pWhereClauseExportReceiveDetails = "";
        if (pCalledFrom == "FromFilter")
            pWhereClauseExportPickupDetails = PickupDetails_Export_GetWhereClause();
        else if (pCalledFrom == "FromEditModal" || pCalledFrom == "WithLocationDetails")
            pWhereClauseExportPickupDetails = "WHERE PickupID=" + $("#hID").val();
        var pParametersWithValues = {
            pPageNumber: 1
            , pPageSize: 999999
            , pWhereClauseExportPickupDetails: pWhereClauseExportPickupDetails
            , pOrderBy: "ID"
            , pCalledFrom: pCalledFrom
        };
        CallGETFunctionWithParameters("/api/Pickup/PickupDetails_Export"
            , pParametersWithValues
            , function (pData) {
                var _ExportedRows = JSON.parse(pData[0]);
                //ExportToExcel(pArray, pHeader, pFileName, pExcludedColumns);
                if (pCalledFrom == "WithLocationDetails")
                    ExportToExcel(_ExportedRows, "PickupCode,SKU,Description,Quantity,Finalized,Notes,LocationCode,PalletID,Serial", "New File", null);
                else
                    ExportToExcel(_ExportedRows, "PickupCode,ProductCode,ProductName,Quantity,Finalized,Notes", "New File", null);
                FadePageCover(false);
            }
            , null);
    }
}
function PickupDetails_Export_GetWhereClause() {
    debugger;
    var pWhereClause = "WHERE 1=1" + "\n";
    if ($("#slFilterWarehouse").val() != "" && $("#slFilterWarehouse").val() != 0)
        pWhereClause += "AND WarehouseID =" + $("#slFilterWarehouse").val() + "\n";
    if ($("#slFilterCustomer").val() != "" && $("#slFilterCustomer").val() != 0)
        pWhereClause += "AND CustomerID =" + $("#slFilterCustomer").val() + "\n";
    if ($("#txtFilterCode").val().trim() != "")
        pWhereClause += "AND CodeSerial=" + $("#txtFilterCode").val().trim() + "\n";
    return pWhereClause;
}
/***************************************ReceiveDetails(Inventory or AvailableStock)***************************************/
function ReceiveDetails_BindTableRows(pReceiveDetails, pPickupDetailsLocation) {
    debugger;
    ClearAllTableRows("tblReceiveDetails");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pReceiveDetails, function (i, item) {
        var _PickedQuantity = pPickupDetailsLocation.find(x => x.ReceiveDetailsID == item.ID && x.LocationID == item.LocationID) == undefined
            ? 0
            : pPickupDetailsLocation.find(x => x.ReceiveDetailsID == item.ID && x.LocationID == item.LocationID)["PickedQuantity"];
        var _AvailableQuantity = (item.Quantity - item.PickedQuantity + _PickedQuantity).toFixed(2);
        if (_AvailableQuantity > 0)
            AppendRowtoTable("tblReceiveDetails",
                ("<tr ID='" + item.ID + "' " + (1 == 2 ? ("ondblclick='ReceiveDetails_FillControls(" + item.ID + ");'") : "") + ">"
                    + "<td class='ID'> <input " + (1 == 1 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "'></td>"
                    + "<td class='ReceiveID hide'>" + item.ReceiveID + "</td>"
                    //+ "<td class='BarCode hide'>" + (item.BarCode == 0 ? "" : item.BarCode) + "</td>"
                    //+ "<td class='PurchaseItemID hide'>" + (item.PurchaseItemID == 0 ? "" : item.PurchaseItemID) + "</td>"
                    //+ "<td class='PurchaseItemCode hide'>" + (item.PurchaseItemCode == 0 ? "" : item.PurchaseItemCode) + "</td>"
                    //+ "<td class='PurchaseItemName hide'>" + (item.PurchaseItemName == 0 ? "" : item.PurchaseItemName) + "</td>"
                    + "<td class='LocationID hide'>" + (item.LocationID == 0 ? "" : item.LocationID) + "</td>"
                    + "<td class='LocationCode'>" + (item.LocationCode == 0 ? "" : item.LocationCode) + "</td>"
                    + "<td class='ReceiveCode'>" + (item.ReceiveCode == 0 ? "" : item.ReceiveCode) + "</td>"
                    + "<td class='BarCode'>" + (item.BarCode == 0 ? "" : item.BarCode) + "</td>"
                    + "<td class='PalletID hide'>" + (item.PalletID == 0 ? "" : item.PalletID) + "</td>"
                    + "<td class='PackageTypeName'>" + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + "</td>"
                    + "<td class='AvailableQuantity'>" + _AvailableQuantity + "</td>"
                    + "<td class='PickedQuantity'> <input type='text' style='width:90px;' id='txtReceiveDetailsPickedQuantity" + item.ID + "' class='form-control controlStyle' data-type='number'onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' onchange='ReceiveDetails_SetIsRowChanged(id);' data-required='false' value='" + _PickedQuantity + "' /> </td>"
                    //+ "<td class='PackageTypeID hide'>" + (item.PackageTypeID == 0 ? "" : item.PackageTypeID) + "</td>"
                    //+ "<td class='PackageTypeName'>" + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + "</td>"
                    //+ "<td class='PalletID'>" + (item.PalletID == 0 ? "" : item.PalletID) + "</td>"
                    //+ "<td class='ReceiveDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReceiveDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ReceiveDate))) + "</td>"
                    //+ "<td class='StatusID hide'>" + item.StatusID + "</td>"
                    //+ "<td class='Status'>" + item.StatusName + "</td>"
                    + "<td class='hide'><a href='#ReceiveDetailsModal' data-toggle='modal' onclick='ReceiveDetails_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
                    + "</tr>"));
    });
    ////ApplyPermissions();
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    BindAllCheckboxonTable("tblReceiveDetails", "ID", "cb-CheckAll-ReceiveDetails");
    CheckAllCheckbox("HeaderDeleteReceiveDetailsID");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function ReceiveDetails_SetIsRowChanged(pControlID) {
    debugger;
}
/***************************************PickupDetailsLocation***************************************/
function PickupDetailsLocation_BindTableRows(pPickupDetailsLocation) {
    debugger;
    ClearAllTableRows("tblPickupDetailsLocation");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var serialControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-list-ol' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Serial") + "</span>";
    $.each(pPickupDetailsLocation, function (i, item) {
        AppendRowtoTable("tblPickupDetailsLocation",
            ("<tr ID='" + item.ID + "' " + (1 == 2 ? ("ondblclick='PickupDetailsLocation_FillControls(" + item.ID + ");'") : "") + ">"
                + "<td class='ID'> <input " + (1 == 1 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "'></td>"
                //+ "<td class='ReceiveID hide'>" + item.ReceiveID + "</td>"
                + "<td class='ReceiveDetailsID hide'>" + item.ReceiveDetailsID + "</td>"
                //+ "<td class='BarCode hide'>" + (item.BarCode == 0 ? "" : item.BarCode) + "</td>"
                //+ "<td class='PurchaseItemID hide'>" + (item.PurchaseItemID == 0 ? "" : item.PurchaseItemID) + "</td>"
                //+ "<td class='PurchaseItemCode hide'>" + (item.PurchaseItemCode == 0 ? "" : item.PurchaseItemCode) + "</td>"
                //+ "<td class='PurchaseItemName hide'>" + (item.PurchaseItemName == 0 ? "" : item.PurchaseItemName) + "</td>"
                + "<td class='LocationID hide'>" + (item.LocationID == 0 ? "" : item.LocationID) + "</td>"
                + "<td class='LocationCode'>" + (item.LocationCode == 0 ? "" : item.LocationCode) + "</td>"
                + "<td class='ReceiveCode'>" + (item.ReceiveCode == 0 ? "" : item.ReceiveCode) + "</td>"
                //+ "<td class='AvailableQuantity'>" + (item.Quantity - item.PickedQuantity).toFixed(2) + "</td>"
                //+ "<td class='PickedQuantity'> <input type='text' style='width:90px;' id='txtPickupDetailsLocationPickedQuantity" + item.ID + "' class='form-control controlStyle' data-type='number'onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' onchange='PickupDetailsLocation_SetIsRowChanged(id);' data-required='false' value='" + item.PickedQuantity + "' /> </td>"
                + "<td class='PickedQuantity'>" + item.PickedQuantity + "</td>"
                //+ "<td class='PackageTypeID hide'>" + (item.PackageTypeID == 0 ? "" : item.PackageTypeID) + "</td>"
                //+ "<td class='PackageTypeName'>" + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + "</td>"
                //+ "<td class='PalletID'>" + (item.PalletID == 0 ? "" : item.PalletID) + "</td>"
                //+ "<td class='ReceiveDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReceiveDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ReceiveDate))) + "</td>"
                //+ "<td class='StatusID hide'>" + item.StatusID + "</td>"
                //+ "<td class='Status'>" + item.StatusName + "</td>"
                + "<td class=''><a href='#ReceiveDetailsSerialModal' data-toggle='modal' onclick='ReceiveDetailsSerial_FillModal(" + item.ID + ");' " + serialControlsText + "</a></td>"
                + "</tr>"));
    });
    ////ApplyPermissions();
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    BindAllCheckboxonTable("tblPickupDetailsLocation", "ID", "cb-CheckAll-PickupDetailsLocation");
    CheckAllCheckbox("HeaderDeletePickupDetailsLocationID");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function PickupDetailsLocation_ValidateToSave() {
    debugger;
    var _MessageReturned = "";
    var _QuantityToPick = 0;
    var _TableLength = $("#tblReceiveDetails tbody tr").length;
    for (var i = 0; i < _TableLength; i++) {
        var _RowID = $("#tblReceiveDetails tbody tr:nth-child(" + (i + 1) + ") td input").val();
        var _RowAvailableQuantity = parseFloat($("#tblReceiveDetails tr[ID=" + _RowID + "] td.AvailableQuantity").text());
        var _RowPickedQuantity = $("#txtReceiveDetailsPickedQuantity" + _RowID).val() == "" ? 0 : parseFloat($("#txtReceiveDetailsPickedQuantity" + _RowID).val());
        _QuantityToPick += _RowPickedQuantity;
        if (_RowPickedQuantity > _RowAvailableQuantity) {
            var _CurrentLocation = $("#tblReceiveDetails tr[ID=" + _RowID + "] td.LocationCode").text();
            _MessageReturned += _CurrentLocation + "\n";
        }
    }
    _MessageReturned = _MessageReturned == "" ? "" : ("Revise the following locations \n" + _MessageReturned);
    //_MessageReturned = _QuantityToPick > $("#txtPickupDetailsDemandedQuantity").val() || $("#txtPickupDetailsDemandedQuantity").val() == ""
    //                   ? ("Please check demanded quantity: \n" + _MessageReturned)
    //                   : _MessageReturned;
    return _MessageReturned;
}
function PickupDetailsLocation_NewRow() {
    debugger;
    ++maxPickupDetailsLocationIDInTable;
    //var copyControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Copy") + "</span>";
    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    //var dateValidTo = Date.prototype.addDays(ConvertDateFormat(FormattedTodaysDate), 30);
    var tr = "";
    tr += "<tr ID='" + maxPickupDetailsLocationIDInTable + "'>";
    tr += "     <td class='IsInsert hide'> <input type='checkbox' id='cbPickupDetailsLocationIsInsert" + maxPickupDetailsLocationIDInTable + "' checked='checked' /></td>";
    tr += "     <td class='PickupDetailsLocationID'> <input disabled='disabled' type='checkbox' value='" + maxPickupDetailsLocationIDInTable + "' /></td>";
    tr += '     <td class="ReceiveDetailsID" val=""><select id="slPickupDetailsLocationReceiveDetails' + maxPickupDetailsLocationIDInTable + '" style="width:100px;" class="controlStyle" onfocus="DisableBackspaceKey(id);" onkeydown="DisableBackspaceKey(id);" onkeypress="DisableBackspaceKey(id);" onchange="PickupDetailsLocation_SetIsRowChanged(id);" PickupDetailsLocation_FillPorts(' + "'" + "slPickupDetailsLocationReceiveDetails" + maxPickupDetailsLocationIDInTable + "'" + '); data-required="false"></select></td>';
    tr += "     <td class='ReceiveCode'> <input type='text' style='width:180px;' id='txtPickupDetailsLocationReceiveCode" + maxPickupDetailsLocationIDInTable + "' class='form-control controlStyle' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='PickupDetailsLocation_SetIsRowChanged(id);' data-required='false' value='' /> </td>";
    tr += "     <td class='AvailableQuantity'> <input type='text' style='width:90px;' id='txtPickupDetailsLocationAvailableQuantity" + maxPickupDetailsLocationIDInTable + "' class='form-control controlStyle' data-type='number'onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' onchange='PickupDetailsLocation_SetIsRowChanged(id);' data-required='false' value='0' /> </td>";
    tr += "     <td class='PickedQuantity'> <input type='text' style='width:90px;' id='txtPickupDetailsLocationPickedQuantity" + maxPickupDetailsLocationIDInTable + "' class='form-control controlStyle' data-type='number'onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' onchange='PickupDetailsLocation_SetIsRowChanged(id);' data-required='false' value='0' /> </td>";
    //tr += '     <td class="ValidFrom"><input id="txtValidFrom' + maxPickupDetailsLocationIDInTable + '" style="width:85px;height:100%;" readonly="readonly" type="text" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" onchange="PickupDetailsLocation_SetIsRowChanged(id);" style="background-color:white; cursor:text;" class="input-sm datepicker-input form-control" data-date-format="dd/mm/yyyy" placeholder="Select Date" value="' + FormattedTodaysDate + '" /></td>';
    tr += "     <td class='Notes hide'> <input type='text' style='width:180px;' id='txtNotes" + maxPickupDetailsLocationIDInTable + "' class='form-control controlStyle' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='PickupDetailsLocation_SetIsRowChanged(id);' data-required='false' value='' /> </td>";
    tr += "     <td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate' id='SelectedIDsToUpdate" + maxPickupDetailsLocationIDInTable + "' type='checkbox' value='" + maxPickupDetailsLocationIDInTable + "' /></td>";
    tr += "     <td class=''>"
        //+ "<a href='#'  onclick='PickupDetailsLocation_CopyRow(" + maxPickupDetailsLocationIDInTable + ");' " + copyControlsText + "</a>"
        + "</td>";
    tr += "</tr>";
    //if ($("#tblPickupDetailsLocation tbody tr").length > 0)
    //    $(tr).insertBefore('#tblPickupDetailsLocation > tbody > tr:first');
    //else
    $("#tblPickupDetailsLocation tbody").prepend(tr);

    //TODO: Add to WhereClause "AND LocationID NOT IN (Selected Locations)"

    /***************************Filling row controls******************************/
    //$("#slPickupDetailsLocationType" + maxPickupDetailsLocationIDInTable).html($("#slPickupDetailsLocationType").html());
    //$("#slPickupDetailsLocationType" + maxPickupDetailsLocationIDInTable).val($("#slPickupDetailsLocationType").val());
    //$("#slSupplier" + maxPickupDetailsLocationIDInTable).html($("#slSupplier").html());
    //$("#slSupplier" + maxPickupDetailsLocationIDInTable).val($("#slSupplier").val());
    //$("#slPOLCountry" + maxPickupDetailsLocationIDInTable).html($("#slPOLCountry").html());
    //$("#slPOLCountry" + maxPickupDetailsLocationIDInTable).val($("#slPOLCountry").val());
    //$("#slPOL" + maxPickupDetailsLocationIDInTable).html($("#slPOL").html());
    //$("#slPOL" + maxPickupDetailsLocationIDInTable).val($("#slPOL").val());
    //$("#slPODCountry" + maxPickupDetailsLocationIDInTable).html($("#slPODCountry").html());
    //$("#slPODCountry" + maxPickupDetailsLocationIDInTable).val($("#slPODCountry").val());
    //$("#slPOD" + maxPickupDetailsLocationIDInTable).html($("#slPOD").html());
    //$("#slPOD" + maxPickupDetailsLocationIDInTable).val($("#slPOD").val());
    //$("#slEquipment" + maxPickupDetailsLocationIDInTable).html($("#slEquipment").html());
    //$("#slEquipment" + maxPickupDetailsLocationIDInTable).val($("#slEquipment").val());
    //$("#slCommodity" + maxPickupDetailsLocationIDInTable).html($("#slCommodity").html());
    //$("#slCommodity" + maxPickupDetailsLocationIDInTable).val($("#slCommodity").val());
    //$("#slCurrency" + maxPickupDetailsLocationIDInTable).html($("#hReadySlCurrencies").html());
    SetDatepickerFormat();
    /***********************EOF Filling row controls******************************/
}
/****************************ReceiveDetailsSerial*************************************/
function ReceiveDetailsSerial_BindTableRows(pReceiveDetailsSerial) {
    debugger;
    ClearAllTableRows("tblReceiveDetailsSerial");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pReceiveDetailsSerial, function (i, item) {
        AppendRowtoTable("tblReceiveDetailsSerial",
            ("<tr ID='" + item.ID + "' " + (1 == 2 ? ("ondblclick='ReceiveDetailsSerial_FillControls(" + item.ID + ");'") : "") + ">"
                + "<td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + item.ID + "' /></td>"
                + "<td class='ID'> <input " + (1 == 1 ? " name='Delete' " : " disabled='disabled' ") + (item.PickupDetailsLocationID > 0 ? " checked='checked' " : "") + " type='checkbox' value='" + item.ID + "'></td>"
                + "<td class='Serial'> <input " + (1 == 1 ? " disabled='disabled' " : "") + " type='text' style='width:100%; text-transform:uppercase;' id='txtReceiveDetailsSerial" + item.ID + "' autocomplete='off' class='form-control controlStyle text-center' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='ReceiveDetailsSerial_SetIsRowChanged(id);' data-required='false' value='" + item.Serial + "' /> </td>"
                //+ "<td class='ReceiveDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReceiveDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ReceiveDate))) + "</td>"
                + "<td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate' id='SelectedIDsToUpdate" + item.ID + "' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='hide'><a href='#ReceiveDetailsSerialModal' data-toggle='modal' onclick='ReceiveDetailsSerial_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
                + "</tr>"));
    });
    ////ApplyPermissions();
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    BindAllCheckboxonTable("tblReceiveDetailsSerial", "ID", "cb-CheckAll-ReceiveDetailsSerial");
    CheckAllCheckbox("HeaderDeleteReceiveDetailsSerialID");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function ReceiveDetailsSerial_NewRow() {
    debugger;
    if ($("#txtReceiveDetailsSerialQuantity").val() <= $("#tblReceiveDetailsSerial tbody tr").length)
        swal("Sorry", "Number of serials can not excceed quantity");
    else {
        ++maxReceiveDetailsSerialIDInTable;
        //var copyControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Copy") + "</span>";
        //var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
        //var dateValidTo = Date.prototype.addDays(ConvertDateFormat(FormattedTodaysDate), 30);
        var tr = "";
        tr += "<tr ID='" + maxReceiveDetailsSerialIDInTable + "'>";
        tr += "     <td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + maxReceiveDetailsSerialIDInTable + "' checked='checked' /></td>";
        tr += "     <td class='ID'> <input type='checkbox' value='" + maxReceiveDetailsSerialIDInTable + "' /></td>";
        tr += "     <td class='Serial'> <input type='text' style='width:100%; text-transform:uppercase;' id='txtReceiveDetailsSerial" + maxReceiveDetailsSerialIDInTable + "' autocomplete='off' class='form-control controlStyle text-center' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='ReceiveDetailsSerial_SetIsRowChanged(id);' data-required='false' value='' /> </td>";
        //tr += '     <td class="ValidFrom"><input id="txtValidFrom' + maxReceiveDetailsSerialIDInTable + '" style="width:85px;height:100%;" readonly="readonly" type="text" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" onchange="ReceiveDetailsSerial_SetIsRowChanged(id);" style="background-color:white; cursor:text;" class="input-sm datepicker-input form-control" data-date-format="dd/mm/yyyy" placeholder="Select Date" value="' + FormattedTodaysDate + '" /></td>';
        tr += "     <td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate' id='SelectedIDsToUpdate" + maxReceiveDetailsSerialIDInTable + "' type='checkbox' value='" + maxReceiveDetailsSerialIDInTable + "' /></td>";
        //tr += "     <td class=''>"
        //                    + "<a href='#'  onclick='ReceiveDetailsSerial_CopyRow(" + maxReceiveDetailsSerialIDInTable + ");' " + copyControlsText + "</a>"
        //              + "</td>";
        tr += "</tr>";
        //if ($("#tblReceiveDetailsSerial tbody tr").length > 0)
        //    $(tr).insertBefore('#tblReceiveDetailsSerial > tbody > tr:first');
        //else
        $("#tblReceiveDetailsSerial tbody").prepend(tr);

        /***************************Filling row controls******************************/
        //SetDatepickerFormat();
        /***********************EOF Filling row controls******************************/
    }
}
function ReceiveDetailsSerial_FillModal(pPickupDetailsLocationID) {
    debugger;
    $("#divSerialsBtns").addClass("hide");
    $("#hPickupDetailsLocationID").val(pPickupDetailsLocationID);
    $("#divReceiveDetailsSerial").html("");

    var tr = $("#tblPickupDetailsLocation tr[ID='" + pPickupDetailsLocationID + "']");
    var pReceiveDetailsID = $("#ReceiveDetailsID").find("td.PickedQuantity").text();
    //$("#lblReceiveDetailsSerialShown").html(": " + $(tr).find("td.PurchaseItemCode").text());
    $("#lblReceiveDetailsSerialShown").html($("#lblShown").html());
    $("#txtReceiveDetailsSerialQuantity").val($(tr).find("td.PickedQuantity").text());
    $("#hReceiveDetailsID").val($(tr).find("td.ReceiveDetailsID").text());
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/Pickup/PickupDetailsSerial_FillModal"
        , {
            pPickupDetailsLocationID: pPickupDetailsLocationID
            , pReceiveDetailsID: $(tr).find("td.ReceiveDetailsID").text()
        }
        , function (pData) {
            var pReceiveDetailsSerial = JSON.parse(pData[0]);
            ReceiveDetailsSerial_BindTableRows(pReceiveDetailsSerial);
            FadePageCover(false);
        }
        , null);
}
function ReceiveDetailsSerial_Save() {
    debugger;
    var pReceiveDetailsSerialIDList = GetAllSelectedIDsAsStringWithTableNameAndNameAttr("tblReceiveDetailsSerial", "Delete");
    if (pReceiveDetailsSerialIDList == "")
        pReceiveDetailsSerialIDList = "0"; //remove all serials
    if (pReceiveDetailsSerialIDList != "0" //pass only if selected serials<=quantity or no selected serials
        && $("#tblPickupDetailsLocation tr[id=" + $("#hPickupDetailsLocationID").val() + "] td.PickedQuantity").text() < pReceiveDetailsSerialIDList.split(',').length)
        swal("Sorry", "Check number selected serials.");
    else {
        FadePageCover(true);
        var pParametersWithValues = {
            pPickupDetailsLocationID: $("#hPickupDetailsLocationID").val()
            , pReceiveDetailsID: $("#hReceiveDetailsID").val()
            , pReceiveDetailsSerialIDList: pReceiveDetailsSerialIDList
        };
        CallPOSTFunctionWithParameters("/api/Pickup/PickupDetailsSerial_Save", pParametersWithValues
            , function (pData) {
                var _MessageReturned = pData[0];
                if (_MessageReturned == "") {
                    jQuery("#ReceiveDetailsSerialModal").modal("hide");
                    swal("Success", "Saved successfully.");
                }
                else
                    swal("Sorry", _MessageReturned);
                FadePageCover(false);
            }
            , null);
    }
}
function ReceiveDetailsSerial_DeleteFromPickup() {
    debugger;
    var pReceiveDetailsSerialIDsDeletedFromPickup = GetAllSelectedIDsAsStringWithTableNameAndNameAttr("tblReceiveDetailsSerial", "Delete");
    if (pReceiveDetailsSerialIDsDeletedFromPickup != "")
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
                CallPOSTFunctionWithParameters("/api/Receive/ReceiveDetailsSerial_DeleteFromPickup"
                    , {
                        pReceiveDetailsSerialIDsDeletedFromPickup: pReceiveDetailsSerialIDsDeletedFromPickup
                        , pPickupDetailsLocationID: $("#hPickupDetailsLocationID").val()
                    }
                    , function (pData) {
                        var _MessageReturned = pData[0];
                        if (_MessageReturned == "")
                            swal("Success", "Deleted successfully.");
                        else {
                            swal("Sorry", strDeleteFailMessage);
                        }
                        ReceiveDetailsSerial_BindTableRows(JSON.parse(pData[1]));
                        FadePageCover(false);
                    });
            });
}
function ReceiveDetailsSerial_SetIsRowChanged(pControlID) {
    debugger;
    var ChangedRowID = $("#" + pControlID).parent().parent().attr("ID");
    $("#SelectedIDsToUpdate" + ChangedRowID).prop("checked", true);
}
/**********************************PDI*************************************************/
function PDI_BindTableRows(pPDI) {
    debugger;
    $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblPDI");
    var editControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    $.each(pPDI, function (i, item) {
        AppendRowtoTable("tblPDI",
            //("<tr ID='" + item.ID + "' ondblclick='PickupDetails_FillControls(" + item.ID + ");' class='" + (item.IsFinalized ? "" : "") + "'>"
            ("<tr ID='" + item.ID + "' ondblclick='PDI_LoadPickupPDIModal(" + item.ID + "," + item.OperationVehicleID + ");' class='" + (item.IsFinalized ? "" : "") + "'>"
                + "<td class='ID hide'>" + item.ID + "</td>"
                + "<td class='RecieveID hide'>" + item.ReceiveID + "</td>"
                + "<td class='CustomerID hide'>" + item.CustomerID + "</td>"
                + "<td class='WarehouseID hide'>" + item.WarehouseID + "</td>"
                + "<td class='LocationID hide'>" + item.LocationID + "</td>"
                + "<td class='Quantity hide'>" + item.Quantity + "</td>"
                + "<td class='FinalizedPickedQuantity hide'>" + item.FinalizedPickedQuantity + "</td>"

                + "<td class='BarCode hide'>" + item.BarCode + "</td>"
                + "<td class='PurchaseItemID hide'>" + item.PurchaseItemID + "</td>"
                + "<td class='DemandedQuantity hide'>" + item.DemandedQuantity + "</td>"
                + "<td class='PickedQuantity hide'>" + item.PickedQuantity + "</td>"

                + "<td class='CustomerName'>" + item.CustomerName + "</td>"
                + "<td class='ProductCode'>" + item.PurchaseItemCode + "</td>"
                + "<td class='ProductName'>" + item.PurchaseItemName + "</td>"
                + "<td class='LocationCode'>" + (item.LocationID == 0 ? "" : item.LocationCode) + "</td>"
                + "<td class='AvailableQuantity hide'>" + (parseFloat(item.Quantity) - parseFloat(item.FinalizedPickedQuantity)) + "</td>"
                + "<td class='MotorNumber'>" + (item.MotorNumber == 0 ? "" : item.MotorNumber) + "</td>"
                + "<td class='ChassisNumber'>" + (item.ChassisNumber == 0 ? "" : item.ChassisNumber) + "</td>"
                + "<td class='OCNCode'>" + (item.OCNCode == 0 ? "" : item.OCNCode) + "</td>"

                + "<td class=''><a href='#' data-toggle='modal' onclick='PDI_Print(" + item.OperationVehicleID + ");' " + editControlsText + "</a></td>"
                + "</tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblPDI", "ID");
    CheckAllCheckbox("ID");
    /////HighlightText("#tblPDI>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function PDI_LoadingWithPaging() {
    debugger;
    var pWhereClause = PDI_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClauseForPDI: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { PDI_BindTableRows(JSON.parse(pData[0])); });
    //HighlightText("#tblPDI>tbody>tr", $("#txt-Search").val().trim());
}
function PDI_GetWhereClause() {
    debugger;
    var _WhereClause = "";

    _WhereClause += "WHERE 1=1 and  (Quantity>FinalizedPickedQuantity) AND OperationVehicleID IS NOT NULL ";

    if ($("#slWarehouseSearch").val() != "" && $("#slWarehouseSearch").val() != null)
        _WhereClause += " and  WarehouseID=" + $("#slWarehouseSearch").val() + " ";
    if ($("#slAreaSearch").val() != "") {
        _WhereClause += " and  AreaID=" + $("#slAreaSearch").val() + " ";
    }
    if ($("#slLocationSearch").val() != null && $("#slLocationSearch").val() != "") {
        _WhereClause += " and  LocationID=" + $("#slLocationSearch").val() + " ";
    }
    if ($("#txtMotorNumberSearch").val().trim() != "") {
        _WhereClause += " and  MotorNumber='" + $("#txtMotorNumberSearch").val().trim() + "' ";
    }
    if ($("#txtChassisNoSearch").val().trim() != "") {
        _WhereClause += " and  ChassisNumber='" + $("#txtChassisNoSearch").val().trim() + "' ";
    }
    if ($("#txtOCNCodeSearch").val().trim() != "") {
        _WhereClause += " and  OCNCode='" + $("#txtOCNCodeSearch").val().trim() + "' ";
    }

    return _WhereClause;
}
function PDI_LoadPickupPDIModal(pID, pOperationVehicleID) {
    debugger;
    FadePageCover(true);
    ClearAll("#PickupModal");

    var tr = $("#tblPDI tr[ID='" + pID + "']");
    $("#lblShown").html(": " + $(tr).find("td.ChassisNumber").text());

    $("#tblPickupDetails tbody tr").html("");
    $("#hPDIReceiveDetailsID").val(pID);
    $("#hOperationVehicleID").val(pOperationVehicleID);
    $("#txPickupDetailsPurchaseItemQuantity").val(1);
    var pWhereClause = "WHERE OperationVehicleID=" + pOperationVehicleID;
    var pPageSize = 999999; //$('#select-page-size').val();
    var pPageNumber = 1; //($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    CallGETFunctionWithParameters("/api/PDI/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned"
        , pControllerParameters
        , function (pData) {
            var _PDIDetails = JSON.parse(pData[0]);
            PDIDetails_BindTableRows(_PDIDetails);
            $("#btn-NewAdd").attr("onclick", "Pickup_ClearAllControls(" + pID + ");");
            jQuery("#PickupModal").modal("show");
            FadePageCover(false);
        }
        , null);
}
function PDI_Print(pOperationVehicleID) {
    debugger;
    FadePageCover(true);
    var pWhereClause = "WHERE OperationVehicleID=" + pOperationVehicleID;
    var pPageSize = 999999; //$('#select-page-size').val();
    var pPageNumber = 1; //($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    CallGETFunctionWithParameters("/api/PDI/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned"
        , pControllerParameters
        , function (pData) {
            var _PDIRows = JSON.parse(pData[0]);
            if (_PDIRows.length == 0)
                swal("Sorry", "No PDI done for this vehicle.");
            else {
                var _TodaysDate = getTodaysDateInddMMyyyyFormat();
                var ReportHTML = '';
                //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                ReportHTML += '<html>';
                ReportHTML += '     <head><title>' + 'PDI' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                ReportHTML += '         <body style="background-color:white;">';

                ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
                ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3><b>' + ' PDI ' + '</b></h3></div>';

                //ReportHTML += '             <div class="col-xs-12"><b>Doc. </b>' + (_PDIRows[0].CodeSerial == 0 ? '' : _PDIRows[0].CodeSerial) + '</div>';
                //ReportHTML += '             <div class="col-xs-12 m-l text-right">' + _TodaysDate + '<b>' + '  التاريخ  ' + '</b></div>';
                ReportHTML += '             <div class="col-xs-12">' + '<b>Chassis Number : </b>' + _PDIRows[0].ChassisNumber + '</div>';
                ReportHTML += '             <div class="col-xs-12">' + '<b>Motor Number : </b>' + _PDIRows[0].EngineNumber + '</div>';
                ReportHTML += '             <div class="col-xs-12">' + '<b>OCN Code : </b>' + _PDIRows[0].OCNCode + '</div>';

                ReportHTML += '                         <table id="tblPDIPrint" style="font-size:90%;" class="table table-striped b-t b-light text-sm  table-bordered">';  //table-hover
                ReportHTML += '                             <thead>';
                ReportHTML += '                                 <tr>';
                ReportHTML += '                                     <th style="width:5%;">' + 'Serial' + '</th>';
                ReportHTML += '                                     <th>' + 'PDI Code' + '</th>';
                ReportHTML += '                                     <th>' + 'Item Code' + '</th>';
                ReportHTML += '                                     <th>' + 'Item Name' + '</th>';
                ReportHTML += '                                     <th>' + 'Quantity' + '</th>';
                ReportHTML += '                                     <th>' + 'Date' + '</th>';
                ReportHTML += '                                 </tr>';
                ReportHTML += '                             </thead>';
                ReportHTML += '                             <tbody>';
                for (var i = 0; i < _PDIRows.length; i++) {
                    ReportHTML += '                                 <tr class="" style="">';
                    ReportHTML += '                                     <td>' + (i + 1) + '</td>';
                    ReportHTML += '                                     <td>' + _PDIRows[i].Code + '</td>';
                    ReportHTML += '                                     <td>' + _PDIRows[i].PurchaseItemCode + '</td>';
                    ReportHTML += '                                     <td>' + _PDIRows[i].PurchaseItemName + '</td>';
                    ReportHTML += '                                     <td>' + _PDIRows[i].Quantity + '</td>';
                    ReportHTML += '                                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(_PDIRows[i].ActionDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(_PDIRows[i].ActionDate))) + '</td>';
                    ReportHTML += '                                 </tr>';
                }
                ReportHTML += '                             </tbody>';
                ReportHTML += '                         </table>';

                //ReportHTML += '                 <div class="" style="clear:both;">';
                //ReportHTML += '                     <div class="col-xs-4 text-right"><b>' + ' :  أمين المخزن  ' + '</b></div>';
                //ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + '' + '</b></div>';
                //ReportHTML += '                     <div class="col-xs-4 text-right"><b>' + '  :  مسئول التسليم   ' + '</b></div>';
                //ReportHTML += '                 </div>'
                //ReportHTML += '                 <div class="" style="clear:both;">';
                //ReportHTML += '                     <div class="col-xs-4 text-right"><b>' + ' :  الاسم  ' + '</b></div>';
                //ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + '' + '</b></div>';
                //ReportHTML += '                     <div class="col-xs-4 text-right"><b>' + '  :   الاسم   ' + '</b></div>';
                //ReportHTML += '                 </div>'

                ReportHTML += '         </body>';

                ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                //ReportHTML += '         <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';
                //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.IsPrintISOCode input[type=checkbox]").prop("checked"))
                //    ReportHTML += '     <div class="row m-l">' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ISOCode").text() + '</div>';
                //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ShowFooter input[type=checkbox]").prop("checked"))
                //    ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                ReportHTML += '     </footer>';

                ReportHTML += '</html>';

                var mywindow = window.open('', '_blank');
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }
            FadePageCover(false);
        }
        , null);
}
function PDIDetails_BindTableRows(pPDI) {
    debugger;
    if (pPDI.length == 0)
        $("#slWarehouse").removeAttr("disabled");
    else
        $("#slWarehouse").attr("disabled", "disabled");
    ClearAllTableRows("tblPickupDetails");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pPDI, function (i, item) {
        AppendRowtoTable("tblPickupDetails",
            ("<tr ID='" + item.ID + "' " + (1 == 1 ? ("ondblclick='PickupDetails_FillControls(" + item.ID + ");'") : "") + ">"
                + "<td class='ID'> <input " + (1 == 1 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "'></td>"
                + "<td class='ReceiveDetailsID hide'>" + item.ReceiveDetailsID + "</td>"
                //+ "<td class='BarCode'>" + (item.BarCode == 0 ? "" : item.BarCode) + "</td>"
                + "<td class='PurchaseItemID hide'>" + (item.PurchaseItemID == 0 ? "" : item.PurchaseItemID) + "</td>"
                + "<td class='PDICode'>" + (item.Code == 0 ? "" : item.Code) + "</td>"
                + "<td class='PurchaseItemCode'>" + (item.PurchaseItemCode == 0 ? "" : item.PurchaseItemCode) + "</td>"
                + "<td class='PurchaseItemName'>" + (item.PurchaseItemName == 0 ? "" : item.PurchaseItemName) + "</td>"
                //+ "<td class='ReceiveDetailsID hide'>" + (item.ReceiveDetailsID == 0 ? "" : item.ReceiveDetailsID) + "</td>"
                //+ "<td class='ReceiveCode'>" + (item.ReceiveCode == 0 ? "" : item.ReceiveCode) + "</td>"
                //+ "<td class='LocationID hide'>" + (item.LocationID == 0 ? "" : item.LocationID) + "</td>"
                //+ "<td class='LocationCode'>" + (item.LocationCode == 0 ? "" : item.LocationCode) + "</td>"
                + "<td class='PickedQuantity'>" + item.Quantity + "</td>"
                + "<td class='ActionDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ActionDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ActionDate))) + "</td>"
                + "<td class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                //+ "<td class='PackageTypeID hide'>" + (item.PackageTypeID == 0 ? "" : item.PackageTypeID) + "</td>"
                //+ "<td class='PackageTypeName'>" + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + "</td>"
                + "<td class='hide'><a href='#PickupDetailsModal' data-toggle='modal' onclick='PickupDetails_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
                + "</tr>"));
    });
    ////ApplyPermissions();
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    BindAllCheckboxonTable("tblPickupDetails", "ID", "cb-CheckAll-PickupDetails");
    CheckAllCheckbox("HeaderDeletePickupDetailsID");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function PDIDetails_Save() {
    debugger;
    if ($("#txPickupDetailsPurchaseItemQuantity").val() == 0 || $("#slPickupDetailsPurchaseItem").val() == "")
        swal("Sorry", "Please, select item and quantity");
    else {
        FadePageCover(true);
        var pParametersWithValues = {
            pID: 0 //$("#hPDIID").val() == "" ? 0 : $("#hPDIID").val()
            , pReceiveDetailsID: $("#hPDIReceiveDetailsID").val()
            , pOperationVehicleID: $("#hOperationVehicleID").val()
            , pPurchaseItemID: $("#slPickupDetailsPurchaseItem").val() == 0 ? "" : $("#slPickupDetailsPurchaseItem").val()
            , pQuantity: $("#txPickupDetailsPurchaseItemQuantity").val() == "" ? 0 : $("#txPickupDetailsPurchaseItemQuantity").val()
            , pActionDate: "01/01/1900"
            , pNotes: "0"
        };
        CallGETFunctionWithParameters("/api/PDI/Save", pParametersWithValues
            , function (pData) {
                var _ReturnedMessage = pData[0];
                var _PDI = JSON.parse(pData[1]);
                if (_ReturnedMessage == "") {
                    $("#txPickupDetailsPurchaseItemQuantity").val(1);
                    $("#slPickupDetailsPurchaseItem").val("");
                    PDIDetails_BindTableRows(_PDI);
                }
                else {
                    swal("Sorry", _ReturnedMessage);
                }
                FadePageCover(false);
            }
            , null);
    }
}
function PDIDetails_DeleteList() {
    debugger;
    var pPDIIDsToDelete = GetAllSelectedIDsAsString('tblPickupDetails');
    if (pPDIIDsToDelete != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
            //callback function in case of confirm
            function () {
                FadePageCover(true);
                CallGETFunctionWithParameters("/api/PDI/DeleteList"
                    , { pPDIIDsToDelete: pPDIIDsToDelete, pOperationVehicleID: $("#hOperationVehicleID").val() }
                    , function (pData) {
                        var _ReturnedMessage = pData[0];
                        var _PDI = JSON.parse(pData[1]);
                        if (_ReturnedMessage == "") {
                            PDIDetails_BindTableRows(_PDI);
                        }
                        else {
                            swal("Sorry", _ReturnedMessage);
                        }
                        FadePageCover(false);
                    });
            });
}

//*********************************Upload Excel***************************************//
function UploadExcelFile() {
    debugger;

    // Checking whether FormData is available in browser  
    if (window.FormData !== undefined) {

        var data = new FormData();

        var files = $("#ExcelPickupItems").get(0).files;

        // Add the uploaded image content to the form data collection
        if (files.length > 0) {
            data.append(files[0].name, files[0]);
            data.append("pID", $("#hID").val())     //PickupID
            FadePageCover(true);
            $.ajax({
                url: '/api/Pickup/UploadExcel',
                type: "POST",
                contentType: false, // Not to set any content header  
                processData: false, // Not to process data  
                data: data,
                success:
                    function (result) {
                        debugger;
                        FadePageCover(false);
                        console.log(result.exception);
                        if (result.ResultCode == 1) {
                            swal({
                                title: "Success",
                                text: "Upload done successfully!",
                                showCancelButton: false,
                                confirmButtonColor: "#65bd77",
                                confirmButtonText: "OK",
                                closeOnConfirm: true
                            }, function () {
                                if (result.InvalidQuantityMessage != "") {
                                    swal({
                                        title: "Warning",
                                        text: result.InvalidQuantityMessage,
                                        showCancelButton: false,
                                        confirmButtonColor: "#F6AE00",
                                        confirmButtonText: "OK",
                                        closeOnConfirm: true
                                    }, () => {
                                        //Pickup_FillAllControls($("#hID").val());
                                        //Pickup_GetAvailableUsers();
                                    })
                                }
                                Pickup_FillAllControls($("#hID").val());
                            }
                            );

                        }
                        else if (result.MissingFields != "")
                            swal("Sorry", "File Uploading failed .. " + result.MissingFields);
                        else if (result.exception != "")
                            swal("Sorry", "File Uploading failed .. " + result.exception);
                        else if (result.InvalidQuantityMessage != "")
                            swal("Sorry", "File Uploading failed .. " + result.InvalidQuantityMessage);

                        $('#btnImportExcel').prop('disabled', false);
                    }
                ,
                error: function (err) {
                    FadePageCover(false);
                    swal("Sorry", err.statusText);
                    $('#btnImportExcel').prop('disabled', false);
                }

            });
        }
        else {
            swal("Sorry", "Choose Excel File");
            $('#btnImportExcel').prop('disabled', false);
        }
    }
    else {
        alert("FormData is not supported.");
        $('#btnImportExcel').prop('disabled', false);
    }

}
function sendEmailAfterUpload() {
    var pModalName = "CheckboxesListModal";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pSelectedAlarmReceiversIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
    if (pSelectedAlarmReceiversIDs == "")
        swal("Sorry", "Please, select receivers.");
    else {
        var pSubject = "Receive Products!";
        var pBody = "Sender: " + pLoggedUser.Name;
        pBody += `<br> New products are in the way with Receive Code ${$("#tblReceive tbody tr[id=" + $("#hID").val() + "] .Code").html()}!`;
        var pOperationID = 0;
        var pIsSendNormalEmail = true;
        SendNormalAndLocalEmail(pSubject, pBody, pOperationID, pIsSendNormalEmail);
    }
}
function Pickup_GetAvailableUsers() {
    debugger;
    Receptionists_GetAvailableUsers();
    $("#btnCheckboxesListApply").attr("onclick", "sendEmailAfterUpload();");
    $("#btnCheckboxesListApply").html("<span class='glyphicon glyphicon-send'></span> Send");
    $("#btn-SearchItems").attr("onclick", "Pickup_GetAvailableUsers();");
}
//*********************************EOF Upload Excel***************************************//

/***************************Retore For PurchaseItem Pickup****************************/
//function PDI_BindTableRows(pPDI) {
//    debugger;
//    $("#hl-menu-Warehousing").parent().addClass("active");
//    ClearAllTableRows("tblPDI");
//    var editControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
//    $.each(pPDI, function (i, item) {
//        AppendRowtoTable("tblPDI",
//        //("<tr ID='" + item.ID + "' ondblclick='PickupDetails_FillControls(" + item.ID + ");' class='" + (item.IsFinalized ? "" : "") + "'>"
//        ("<tr ID='" + item.ID + "' ondblclick='PDI_LoadPickupPDIModal(" + item.ID + ");' class='" + (item.IsFinalized ? "" : "") + "'>"
//            + "<td class='ID hide'>" + item.ID + "</td>"
//            + "<td class='RecieveID hide'>" + item.ReceiveID + "</td>"
//            + "<td class='CustomerID hide'>" + item.CustomerID + "</td>"
//            + "<td class='WarehouseID hide'>" + item.WarehouseID + "</td>"
//            + "<td class='LocationID hide'>" + item.LocationID + "</td>"
//            + "<td class='Quantity hide'>" + item.Quantity + "</td>"
//            + "<td class='FinalizedPickedQuantity hide'>" + item.FinalizedPickedQuantity + "</td>"

//            + "<td class='BarCode hide'>" + item.BarCode + "</td>"
//            + "<td class='PurchaseItemID hide'>" + item.PurchaseItemID + "</td>"
//            + "<td class='DemandedQuantity hide'>" + item.DemandedQuantity + "</td>"
//            + "<td class='PickedQuantity hide'>" + item.PickedQuantity + "</td>"

//            + "<td class='CustomerName'>" + item.CustomerName + "</td>"
//            + "<td class='ProductCode'>" + item.PurchaseItemCode + "</td>"
//            + "<td class='ProductName'>" + item.PurchaseItemName + "</td>"
//            + "<td class='LocationCode'>" + (item.LocationID == 0 ? "" : item.LocationCode) + "</td>"
//            + "<td class='AvailableQuantity hide'>" + (parseFloat(item.Quantity) - parseFloat(item.FinalizedPickedQuantity)) + "</td>"
//            + "<td class='MotorNumber'>" + (item.MotorNumber == 0 ? "" : item.MotorNumber) + "</td>"
//            + "<td class='ChassisNumber'>" + (item.ChassisNumber == 0 ? "" : item.ChassisNumber) + "</td>"
//            + "<td class='OCNCode'>" + (item.OCNCode == 0 ? "" : item.OCNCode) + "</td>"

//            + "<td class=''><a href='#' data-toggle='modal' onclick='PDI_Print(" + item.ID + ");' " + editControlsText + "</a></td>"
//            + "</tr>"));
//    });
//    ApplyPermissions();
//    BindAllCheckboxonTable("tblPDI", "ID");
//    CheckAllCheckbox("ID");
//    /////HighlightText("#tblPDI>tbody>tr", $("#txt-Search").val().trim());
//    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
//        swal(strSorry, strDeleteFailMessage);
//        showDeleteFailMessage = false;
//    }
//    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
//}
//function PDI_LoadingWithPaging() {
//    debugger;
//    var pWhereClause = PDI_GetWhereClause();
//    var pPageSize = $('#select-page-size').val();
//    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
//    var pOrderBy = "ID DESC";
//    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClauseForPDI: pWhereClause, pOrderBy: pOrderBy }
//    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { PDI_BindTableRows(JSON.parse(pData[0])); });
//    //HighlightText("#tblPDI>tbody>tr", $("#txt-Search").val().trim());
//}
//function PDI_GetWhereClause() {
//    debugger;
//    var _WhereClause = "";

//    _WhereClause += "WHERE 1=1 and  (Quantity>FinalizedPickedQuantity) AND OperationVehicleID IS NOT NULL ";

//    if ($("#slWarehouseSearch").val() != "" && $("#slWarehouseSearch").val() != null)
//        _WhereClause += " and  WarehouseID=" + $("#slWarehouseSearch").val() + " ";
//    if ($("#slAreaSearch").val() != "") {
//        _WhereClause += " and  AreaID=" + $("#slAreaSearch").val() + " ";
//    }
//    if ($("#slLocationSearch").val() != null && $("#slLocationSearch").val() != "") {
//        _WhereClause += " and  LocationID=" + $("#slLocationSearch").val() + " ";
//    }
//    if ($("#txtMotorNumberSearch").val().trim() != "") {
//        _WhereClause += " and  MotorNumber='" + $("#txtMotorNumberSearch").val().trim() + "' ";
//    }
//    if ($("#txtChassisNoSearch").val().trim() != "") {
//        _WhereClause += " and  ChassisNumber='" + $("#txtChassisNoSearch").val().trim() + "' ";
//    }
//    if ($("#txtOCNCodeSearch").val().trim() != "") {
//        _WhereClause += " and  OCNCode='" + $("#txtOCNCodeSearch").val().trim() + "' ";
//    }

//    return _WhereClause;
//}
//function PDI_ClearAllControls() {
//    debugger;
//    ////////$("#tblPDIDetails tbody").html("");
//    //////////$("#lblPTIMaxWeight").html("<span> : </span><span>" + 0 + "</span>");
//    //////////$("#lblPTIMaxVolume").html("<span> : </span><span>" + 0 + "</span>");
//    ////////ClearAll("#PTIModal");

//    ////////$("#txtPTIDate").val(getTodaysDateInddMMyyyyFormat());
//    ////////$(".classDisableForFinalized").removeAttr("disabled");

//    ////////$("#btnSave").attr("onclick", "PDI_Save(false);");
//    ////////$("#btnSaveAndAddNew").attr("onclick", "PDI_Save(true);");
//    ////////$("#cb-CheckAll").prop('checked', false);
//}
//function PDI_FillAllControls(pID) {
//    debugger;
//    FadePageCover(true);


//}
//function GetAreas(pWarehouseControlID, pAreaContolID, pLocationControlID) {
//    debugger;
//    FadePageCover(true);
//    $("#" + pAreaContolID).html("<option value=''><--Select--></option>");
//    $("#" + pLocationControlID).html("<option value=''><--Select--></option>");
//    var pParametersWithValues = {
//        pWarehouseID: ($("#" + pWarehouseControlID).val() == "" ? 0 : $("#" + pWarehouseControlID).val())
//    };
//    CallGETFunctionWithParameters("/api/TransferProducts/GetAreas", pParametersWithValues
//        , function (pData) {
//            FillListFromObject(null, 2, "<--Select-->", pAreaContolID, pData[0], null);
//            FadePageCover(false);
//        }
//        , null);
//}
//function GetLocation(pAreaContolID, pLocationControlID) {
//    debugger;
//    $("#" + pLocationControlID).html("<option value=''><--Select--></option>");
//    if ($("#" + pAreaContolID).val() != "") {
//        FadePageCover(true);
//        var pWhereClauseLocations = "WHERE AreaID=" + $("#" + pAreaContolID).val() + "\n";
//        var pParametersWithValues = {
//            pWhereClauseLocations: pWhereClauseLocations
//        };
//        CallGETFunctionWithParameters("/api/TransferProducts/GetLocations", pParametersWithValues
//            , function (pData) {
//                FillListFromObject(null, 1, "<--Select-->", pLocationControlID, pData[0], null);
//                FadePageCover(false);
//            }
//            , null);
//    }
//}
//function PDI_LoadPickupPDIModal(pPDIReceiveDetailsID) {
////    debugger;
////    FadePageCover(true);
////    $("#tblPickup tbody tr").html("");
////    $("#hPDIReceiveDetailsID").val(pPDIReceiveDetailsID);
////    var pWhereClause = "WHERE PDIReceiveDetailsID=" + pPDIReceiveDetailsID;
////    var pPageSize = 999999; //$('#select-page-size').val();
////    var pPageNumber = 1; //($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
////    var pOrderBy = "ID DESC";
////    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
////    CallGETFunctionWithParameters("/api/Pickup/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned"
////        , pControllerParameters
////        , function (pData) {
////            var _Pickup = JSON.parse(pData[0]);
////            Pickup_BindTableRows(_Pickup);
////            $("#btn-NewAdd").attr("onclick", "Pickup_ClearAllControls(" + pPDIReceiveDetailsID + ");");
////            jQuery("#PickupPDIModal").modal("show");
////            FadePageCover(false);
////        }
////        , null);
////    //Pickup_ClearAllControls(pPDIReceiveDetailsID);
//}
//function PDI_Print(pPDIReceiveDetailsID) {
//    debugger;
//    FadePageCover(true);
//    var pParametersWithValues = {
//        pWhereClausePickupDetailsLocation: "WHERE PDIReceiveDetailsID=" + pPDIReceiveDetailsID
//    };
//    CallGETFunctionWithParameters("/api/Pickup/PickupDetailsLocation_PrintPDI"
//        , pParametersWithValues
//        , function (pData) {
//            var _PDIRows = JSON.parse(pData[1]);
//            if (_PDIRows.length == 0)
//                swal("Sorry", "No PDI done for this vehicle.");
//            else {
//                var _TodaysDate = getTodaysDateInddMMyyyyFormat();
//                var ReportHTML = '';
//                //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
//                ReportHTML += '<html>';
//                ReportHTML += '     <head><title>' + 'PDI' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
//                ReportHTML += '         <body style="background-color:white;">';

//                ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
//                ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3><b>' + ' PDI ' + '</b></h3></div>';

//                //ReportHTML += '             <div class="col-xs-12"><b>Doc. </b>' + (_PDIRows[0].CodeSerial == 0 ? '' : _PDIRows[0].CodeSerial) + '</div>';
//                //ReportHTML += '             <div class="col-xs-12 m-l text-right">' + _TodaysDate + '<b>' + '  التاريخ  ' + '</b></div>';
//                ReportHTML += '             <div class="col-xs-12">' + '<b>Chassis Number : </b>' + _PDIRows[0].ChassisNumber + '</div>';
//                ReportHTML += '             <div class="col-xs-12">' + '<b>Motor Number : </b>' + _PDIRows[0].MotorNumber + '</div>';
//                ReportHTML += '             <div class="col-xs-12">' + '<b>OCN Code : </b>' + _PDIRows[0].OCNCode + '</div>';

//                ReportHTML += '                         <table id="tblPDIPrint" style="font-size:90%;" class="table table-striped b-t b-light text-sm  table-bordered">';  //table-hover
//                ReportHTML += '                             <thead>';
//                ReportHTML += '                                 <tr>';
//                ReportHTML += '                                     <th style="width:5%;">' + 'Serial' + '</th>';
//                ReportHTML += '                                     <th>' + 'PDI Code' + '</th>';
//                ReportHTML += '                                     <th>' + 'Item Code' + '</th>';
//                ReportHTML += '                                     <th>' + 'Item Name' + '</th>';
//                ReportHTML += '                                     <th>' + 'Part Number' + '</th>';
//                ReportHTML += '                                     <th>' + 'Quantity' + '</th>';
//                ReportHTML += '                                     <th>' + 'Date' + '</th>';
//                ReportHTML += '                                 </tr>';
//                ReportHTML += '                             </thead>';
//                ReportHTML += '                             <tbody>';
//                for (var i = 0; i < _PDIRows.length; i++) {
//                    ReportHTML += '                                 <tr class="" style="">';
//                    ReportHTML += '                                     <td>' + (i + 1) + '</td>';
//                    ReportHTML += '                                     <td>' + _PDIRows[i].PDICode + '</td>';
//                    ReportHTML += '                                     <td>' + _PDIRows[i].PurchaseItemCode + '</td>';
//                    ReportHTML += '                                     <td>' + _PDIRows[i].PurchaseItemName + '</td>';
//                    ReportHTML += '                                     <td>' + (_PDIRows[i].PartNumber == 0 ? "" : _PDIRows[i].PartNumber) + '</td>';
//                    ReportHTML += '                                     <td>' + _PDIRows[i].PickedQuantity + '</td>';
//                    ReportHTML += '                                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(_PDIRows[i].RequiredDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(_PDIRows[i].RequiredDate))) + '</td>';
//                    ReportHTML += '                                 </tr>';
//                }
//                ReportHTML += '                             </tbody>';
//                ReportHTML += '                         </table>';

//                //ReportHTML += '                 <div class="" style="clear:both;">';
//                //ReportHTML += '                     <div class="col-xs-4 text-right"><b>' + ' :  أمين المخزن  ' + '</b></div>';
//                //ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + '' + '</b></div>';
//                //ReportHTML += '                     <div class="col-xs-4 text-right"><b>' + '  :  مسئول التسليم   ' + '</b></div>';
//                //ReportHTML += '                 </div>'
//                //ReportHTML += '                 <div class="" style="clear:both;">';
//                //ReportHTML += '                     <div class="col-xs-4 text-right"><b>' + ' :  الاسم  ' + '</b></div>';
//                //ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + '' + '</b></div>';
//                //ReportHTML += '                     <div class="col-xs-4 text-right"><b>' + '  :   الاسم   ' + '</b></div>';
//                //ReportHTML += '                 </div>'

//                ReportHTML += '         </body>';

//                ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
//                //ReportHTML += '         <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';
//                //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.IsPrintISOCode input[type=checkbox]").prop("checked"))
//                //    ReportHTML += '     <div class="row m-l">' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ISOCode").text() + '</div>';
//                //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ShowFooter input[type=checkbox]").prop("checked"))
//                //    ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
//                ReportHTML += '     </footer>';

//                ReportHTML += '</html>';

//                var mywindow = window.open('', '_blank');
//                mywindow.document.write(ReportHTML);
//                mywindow.document.close();
//            }
//            FadePageCover(false);
//        }
//        , null);
//}
