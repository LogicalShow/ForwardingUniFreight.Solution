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
    $("#slReserveDetailsPurchaseItem").css({ "width": "100%" }).select2();
    $("#slReserveDetailsPurchaseItem").trigger("change");
    $("#slPersonInCharge").css({ "width": "100%" }).select2();
    $("#slPersonInCharge").trigger("change");
    $("#slBillTo").css({ "width": "100%" }).select2();
    $("#slBillTo").trigger("change");
    $("#slEndUser").css({ "width": "100%" }).select2();
    $("#slEndUser").trigger("change");
    $("#slOperation").css({ "width": "100%" }).select2();
    $("#slOperation").trigger("change");

    $("div[tabindex='-1']").removeAttr('tabindex');
}
function ApplySelectListSearch_OnlyChange() {
    $("#slCustomer").css({ "width": "100%" }).select2();
    $("#slWarehouse").css({ "width": "100%" }).select2();
    $("#slReserveDetailsPurchaseItem").css({ "width": "100%" }).select2();
    $("#slPersonInCharge").css({ "width": "100%" }).select2();
    $("#slBillTo").css({ "width": "100%" }).select2();
    $("#slEndUser").css({ "width": "100%" }).select2();
    $("#slOperation").css({ "width": "100%" }).select2();
}
function Reserve_Initialize() {
    debugger;
    $("#hl-menu-Warehousing").parent().siblings().removeClass("active");
    strBindTableRowsFunctionName = "Reserve_BindTableRows";
    strLoadWithPagingFunctionName = "/api/Reserve/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = " WHERE 1=1";
    var pOrderBy = "ReserveID DESC";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/Warehousing/Transactions/Reserve", "div-content", function () {
        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
            , function (pData) {
                var pWarehouse = pData[2];
                var pCustomer = pData[3];
                var pAllCustomers = pData[4];
                FillListFromObject(null, 2, null, "slWarehouse", pWarehouse, null);
                FillListFromObject(null, 2, "<--Select-->", "slFilterWarehouse", pWarehouse, null);
                FillListFromObject(null, 2, "<--Select-->", "slCustomer", pCustomer, function () { $("#slCustomerForClearWithItems").html($("#slCustomer").html()); });  
                FillListFromObject(null, 2, "<--Select-->", "slFullReservationCustomer", pAllCustomers, null); 
                $("#slEndUser").html($("#hReadySlCustomers").html());
                $("#slFilterCustomer").html($("#hReadySlCustomers").html());
                Reserve_BindTableRows(JSON.parse(pData[0]));
                ApplySelectListSearch();
            });
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    },
        function () { Reserve_ClearAllControls(); },
        function () { Reserve_DeleteList(); });
}
function Reserve_BindTableRows(pReserve, pIsPDIModal) {
    debugger;
    $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblReserve");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pReserve, function (i, item) {
        AppendRowtoTable("tblReserve",
            ("<tr ID='" + item.ReserveID + "' ondblclick='Reserve_FillAllControls(" + item.ReserveID + ");' class='" + (item.IsFinalized ? "text-primary" : "") + "'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ReserveID + "' /></td>"
                + "<td class='Code'>" + item.ReserveCode + "</td>"
                + "<td class='ReservationDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReservationDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ReservationDate))) + "</td>"
                + "<td class='CustomerID hide'>" + item.CustomerID + "</td>"
                + "<td class='Customer'>" + item.CustomerName + "</td>"
                + "<td class='EndUserID hide'>" + item.EndUserID + "</td>"
                + "<td class='EndUser'>" + item.EndUserName + "</td>"
                + "<td class='WarehouseID hide'>" + item.WarehouseID + "</td>"
                + "<td class='Warehouse'>" + item.WarehouseName + "</td>"
                + "<td class='Notes'>" + item.ReservationNotes + "</td>"
                + "<td class='hide'><a href='#ReserveModal' data-toggle='modal' onclick='Reserve_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblReserve", "ID");
    CheckAllCheckbox("ID");
    if (glbCallingControl == "ReserveProduct")
        HighlightText("#tblReserve>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function Reserve_LoadingWithPaging() {
    debugger;
    var pWhereClause = Reserve_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ReserveID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { Reserve_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblReserve>tbody>tr", $("#txt-Search").val().trim());
}
function Reserve_GetWhereClause() {
    debugger;
    var pWhereClause = "WHERE 1=1" + "\n";
    if (glbCallingControl == "ReserveProduct") {
        if ($("#slFilterWarehouse").val() != "" && $("#slFilterWarehouse").val() != 0)
            pWhereClause += "AND WarehouseID =" + $("#slFilterWarehouse").val() + "\n";
        if ($("#slFilterCustomer").val() != "" && $("#slFilterCustomer").val() != 0)
            pWhereClause += "AND CustomerID =" + $("#slFilterCustomer").val() + "\n";
        if ($("#txtFilterCode").val().trim() != "")
            pWhereClause += "AND CodeSerial=" + $("#txtFilterCode").val().trim() + "\n";
        if ($("#txt-Search").val().trim() != "")
            pWhereClause += "AND Code LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
    }
    else
        pWhereClause += "AND ID=" + $("#hPDIID").val();
    return pWhereClause;
}
function Reserve_ClearAllControls(pPDIID) {
    debugger;
    $("#tblReserveDetails tbody").html("");
    $("#slPersonInCharge").html("<option value=''><--Select--></option>");
    $(".classDisableForDetails").removeAttr("disabled");
    $("#slWarehouse").removeAttr("disabled");
    //$("#lblReserveMaxWeight").html("<span> : </span><span>" + 0 + "</span>");
    //$("#lblReserveMaxVolume").html("<span> : </span><span>" + 0 + "</span>");
    ClearAll("#ReserveModal");
    ClearAll("#ReservePDIModal");
    jQuery("#ReserveModal").modal("show");
    if (glbCallingControl == "PDI")
        $("#hPDIID").val(pPDIID);
    $("#slCustomer").html($("#slCustomerForClearWithItems").html());
    $("#txtOrderDate").val(getTodaysDateInddMMyyyyFormat());
    $("#txtRequiredDate").val($("#txtOrderDate").val());
    $(".classDisableForFinalized").removeAttr("disabled");

    ApplySelectListSearch_OnlyChange();
    $("#btnSave").attr("onclick", "Reserve_Save(false);");
    $("#btnSaveAndAddNew").attr("onclick", "Reserve_Save(true);");
    $("#cb-CheckAll").prop('checked', false);
}
function Reserve_FillAllControls(pID) {
    debugger;
    FadePageCover(true);
    //$("#txtNumberOfLevelsPerReserve").attr("disabled", "disabled");
    //$("#txtNumberOfTraysPerLevel").attr("disabled", "disabled");
    ClearAll("#ReserveModal");
    
    $(".classDisableForDetails").attr("disabled", "disabled");
    $("#tblReserveDetails tbody").html("");
    jQuery("#ReserveModal").modal("show");
    var pParametersWithValues = {
        pHeaderID: pID
    };
    CallGETFunctionWithParameters("/api/Reserve/LoadHeaderWithDetails", pParametersWithValues
        , function (pData) {
            var pReserveHeader = JSON.parse(pData[0]);
            var pReserveDetails = JSON.parse(pData[1]);
            var pCustomer = pData[2];
            //var pPurchaseItem = pData[3];
            if (pReserveDetails.length > 0)
                $(".classDisableForDetails").attr("disabled", "disabled");
            else
                $(".classDisableForDetails").removeAttr("disabled");
            $("#hID").val(pID);
            $("#hPDIID").val(pReserveHeader.PDIID);
            $("#lblShown").html(": " + pReserveHeader.Code);
            $("#txtCode").val(pReserveHeader.ReserveCode);
            $("#slWarehouse").val(pReserveHeader.WarehouseID == 0 ? "" : pReserveHeader.WarehouseID);
            FillListFromObject(pReserveHeader.CustomerID, 2, "<--Select-->", "slCustomer", pCustomer, function () { ApplySelectListSearch_OnlyChange(); });
            FillListFromObject(pReserveHeader.EndUserID, 2, "<--Select-->", "slEndUser", pCustomer, null);
            //FillListFromObject(null, 9, "<--Select-->", "slReserveDetailsPurchaseItem", pPurchaseItem, function () { ApplySelectListSearch_OnlyChange(); });
            $("#txtReservationDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pReserveHeader.ReservationDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pReserveHeader.ReservationDate)));           
            $("#txtNotes").val(pReserveHeader.ReservationNotes == 0 ? "" : pReserveHeader.ReservationNotes); 
            ReserveDetails_BindTableRows(pReserveDetails);
            $("#btnSave").attr("onclick", "Reserve_Save(false);");
            ApplySelectListSearch_OnlyChange();
            ReserveDetails_ClearAllControls();
            $("#btnSaveAndAddNew").attr("onclick", "Reserve_Save(true);");
            FadePageCover(false);
        }
        , null);
}
function Reserve_Save(pSaveAndNew) {
    debugger;
    FadePageCover(true);
    if (!isValidDate($("#txtReservationDate").val().trim(), 1)) {
        swal(strSorry, "Please, enter dates.");
        FadePageCover(false);
    }
    else if (ValidateForm("form", "ReserveModal")) {
        pParametersWithValues = {
            pID: $("#hID").val() == "" ? 0 : $("#hID").val()
            , pWarehouseID: $("#slWarehouse").val() == "" ? "0" : $("#slWarehouse").val()
            , pCustomerID: $("#slCustomer").val() == "" ? "0" : $("#slCustomer").val()
            , pEndUserID: $("#slEndUser").val() == "" ? "0" : $("#slEndUser").val()
            , pReservationDate: ($("#txtReservationDate").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtReservationDate").val().trim()))
            , pNotes: $("#txtNotes").val().trim() == "" ? "0" : $("#txtNotes").val().trim().toUpperCase()
        };
        CallGETFunctionWithParameters("/api/Reserve/Save", pParametersWithValues
            , function (pData) {
                if (pData[0] == "") {
                    var pReserveHeader = JSON.parse(pData[2]);
                    if (glbCallingControl == "ReserveProduct")
                        Reserve_LoadingWithPaging();
                    else
                        PDI_LoadReservePDIModal($("#hPDIID").val());
                    if (pSaveAndNew) {
                        Reserve_ClearAllControls();
                    }
                    else {
                        $("#hID").val(pData[1]);
                        $("#txtCode").val(pReserveHeader.ReserveCode);
                        $("#txtStatus").val(pReserveHeader.StatusName);
                        $("#btnSave").attr("onclick", "Reserve_Save(false);");
                        $("#btnSaveAndAddNew").attr("onclick", "Reserve_Save(true);");
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
    else //if (ValidateForm("form", "ReserveModal"))
        FadePageCover(false);
}
function Reserve_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblReserve') != "")
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
                DeleteListFunction("/api/Reserve/Delete", { "pReserveIDs": GetAllSelectedIDsAsString('tblReserve') }
                    , function () {
                        if (glbCallingControl == "ReserveProduct")
                            Reserve_LoadingWithPaging();
                        else
                            PDI_LoadReservePDIModal($("#hPDIID").val());
                    });
            });
    //DeleteListFunction("/api/Reserve/Delete", { "pReserveIDs": GetAllSelectedIDsAsString('tblReserve') }, function () { Reserve_LoadingWithPaging(); });
}
function Reserve_slCustomerChanged() {
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
function Reserve_Finalize(pIsFinalize) {
    debugger;
    if ($("#hID").val() == "")
        swal("Sorry", "Please save the order first.");
    else {
        swal({
            title: "Are you sure?",
            text: "This Reserve will be finalized!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, finalize!",
            closeOnConfirm: true
        },
            //callback function in case of confirm
            function () {
                FadePageCover(true);
                CallGETFunctionWithParameters("/api/Reserve/Finalize"
                    , { pFinalizedReserveID: $("#hID").val(), pIsFinalize: pIsFinalize }
                    , function (pData) {
                        if (pData[0] == "") {
                            swal("Success", "Saved successfully.");
                            if (pIsFinalize) {
                                $(".classDisableForFinalized").attr("disabled", "disabled");
                                $("#txtStatus").val("FINALIZED");
                                $("#tblReserve tr[ID=" + $("#hID").val() + "] td.Status").text("FINALIZED");
                            }
                            else {
                                $(".classDisableForFinalized").removeAttr("disabled");
                                $("#txtStatus").val("");
                                $("#tblReserve tr[ID=" + $("#hID").val() + "] td.Status").text("");
                            }
                            if (glbCallingControl == "ReserveProduct")
                                Reserve_LoadingWithPaging();
                            else
                                PDI_LoadReservePDIModal($("#hPDIID").val());
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
function Reserve_GetAvailableUsers() {
    debugger;
    Receptionists_GetAvailableUsers();
    $("#btnCheckboxesListApply").attr("onclick", "Reserve_SendNotification();");
    $("#btnCheckboxesListApply").html("<span class='glyphicon glyphicon-send'></span> Send");
    $("#btn-SearchItems").attr("onclick", "Receptionists_GetAvailableUsers();");
}
function Reserve_SendNotification() {
    debugger;
    var pModalName = "CheckboxesListModal";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pSelectedAlarmReceiversIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
    if ($("#hID").val() == "")
        swal("Sorry", "Please, save first.");
    else if (pSelectedAlarmReceiversIDs == "")
        swal("Sorry", "Please, select receivers.");
    else {
        var pSubject = "Reserve: " + $("#txtCode").val();
        var pBody = "Sender: " + pLoggedUser.Name;
        pBody += "<br>Please, handle Reserve " + $("#txtCode").val();
        var pOperationID = 0;
        var pIsSendNormalEmail = pDefaults.UnEditableCompanyName == "NIL" ? false : false;
        SendNormalAndLocalEmail(pSubject, pBody, pOperationID, pIsSendNormalEmail);
    }
}
function ReserveDetails_Print() {
    debugger;
    if ($("#hID").val() == "")
        swal("Sorry", "Please, save Reserve first.");
    else {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/Reserve/Print", { pPrintedReserveID: $("#hID").val() }
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
                    ReportHTML += '             <div class="col-xs-4"><b>Reserve Code : </b>' + pHeader.Code + '</div>';
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
                        var _RowQuantity = (item.Serial == 0 ? item.ReservedQuantity : 1);
                        var _RowGrossWeight = _RowQuantity * item.GrossWeight;
                        var _RowVolume = _RowQuantity * item.Volume;
                        _WeightUnitCode = item.WeightUnitCode;
                        _VolumeUnitCode = item.VolumeUnitCode;
                        _TotalQuantity += _RowQuantity;
                        _TotalGrossWeight += _RowGrossWeight;
                        _TotalVolume += _RowVolume;
                        ReportHTML += '                                     <tr class="" style="font-size:95%;">';
                        ReportHTML += '                                         <td class="Quantity">' + (item.Serial == 0 ? item.ReservedQuantity : '1') + '</td>';
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

/***************************************ReserveDetails***************************************/
function ReserveDetails_BindTableRows(pReserveDetails) {
    debugger;
    if (pReserveDetails.length == 0)
        $("#slWarehouse").removeAttr("disabled");
    else
        $("#slWarehouse").attr("disabled", "disabled");
    ClearAllTableRows("tblReserveDetails");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pReserveDetails, function (i, item) {
        AppendRowtoTable("tblReserveDetails",
            ("<tr ID='" + item.ID + "' " + (1 == 1 ? ("ondblclick='ReserveDetails_FillControls(" + item.ID + ");'") : "") + ">"
                + "<td class='ID'> <input " + (1 == 1 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "'></td>"
                + "<td class='ReserveID hide'>" + item.ReserveID + "</td>"
                //+ "<td class='BarCode'>" + (item.BarCode == 0 ? "" : item.BarCode) + "</td>"
                + "<td class='PurchaseItemID hide'>" + (item.PurchaseItemID == 0 ? "" : item.PurchaseItemID) + "</td>"
                + "<td class='PurchaseItemCode'>" + (item.PurchaseItemCode == 0 ? "" : item.PurchaseItemCode) + "</td>"
                + "<td class='PurchaseItemName'>" + (item.PurchaseItemName == 0 ? "" : item.PurchaseItemName) + "</td>"
                + "<td class='ReservationAmount'>" + (item.ReservationAmount == 0 ? "" : item.ReservationAmount) + "</td>"
                + "<td class='hide'><a href='#ReserveDetailsModal' data-toggle='modal' onclick='ReserveDetails_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
                + "</tr>"));
    });
    ////ApplyPermissions();
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    BindAllCheckboxonTable("tblReserveDetails", "ID", "cb-CheckAll-ReserveDetails");
    CheckAllCheckbox("HeaderDeleteReserveDetailsID");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function ReserveDetails_ClearAllControls() {
    debugger;
    //$("#lblShown").html(": " + pReserveHeader.Code);
    if ($("#hID").val() == "")
        swal("Sorry", "Please, save header first.");
    else if (ValidateForm("form", "ReserveModal")) {
        FadePageCover(true);
        ClearAll("#ReserveDetailsModal");
        $("#tblReceiveDetails tbody").html("");
        $("#tblReserveDetailsLocation tbody").html("");
        $("#lblReserveDetailsShown").html($("#lblShown").html());
        $("#slReserveDetailsReceive").html("<option value=''><--Select--></option>");
        $("#slReserveDetailsPurchaseItem").html("<option value=''><--Select--></option>");
        $("#slReserveDetailsLocation").html("<option value=''><--Select--></option>");
        CallGETFunctionWithParameters("/api/Reserve/ReserveDetails_GetAvailablePurchaseItemsForCustomer"
            , {
                pCustomerID: $("#slCustomer").val()
                , pIsExcludeVehicle: glbCallingControl == "PDI" ? true : false
            }
            , function (pData) {
                var pPurchaseItem = pData[0];
                FillListFromObject(null, 9, "<--Select-->", "slReserveDetailsPurchaseItem", pPurchaseItem, function () { ApplySelectListSearch_OnlyChange(); });
                FadePageCover(false);
            }
            , null);
        $("#btnSaveReserveDetails").attr("onclick", "ReserveDetails_Save(false);");
        $("#btnSaveAndAddNewReserveDetails").attr("onclick", "ReserveDetails_Save(true);");
    }
}
function ReserveDetails_FillControls(pID) {
    debugger;
    //FadePageCover(true);
    ClearAll("#ReserveDetailsModal");
    //ReserveDetails_ClearAllControls();
    $("#lblReserveDetailsShown").html($("#lblShown").html());
    $("#tblReceiveDetails tbody").html("");
    $("#tblReserveDetailsLocation tbody").html("");
    $("#hReserveDetailsID").val(pID);
    var tr = $("#tblReserveDetails tr[ID='" + pID + "']");
    $("#txtReserveDetailsBarCode").val($(tr).find("td.BarCode").text());
    $("#slReserveDetailsPurchaseItem").val($(tr).find("td.PurchaseItemID").text());
    $("#txtReserveDetailsReservationAmount").val($(tr).find("td.ReservationAmount").text());
    ReserveDetails_FillModalTables();
    ApplySelectListSearch_OnlyChange();
    jQuery("#ReserveDetailsModal").modal("show");
}
function ReserveDetails_FillModalTables() {
    debugger;
    $("#tblReceiveDetails tbody").html("");
    $("#tblReserveDetailsLocation tbody").html("");
    if ($("#slReserveDetailsPurchaseItem").val() == "")
        ; //do nothing
    else if (ValidateForm("form", "ReserveModal")) {
        FadePageCover(true);
        var pParametersWithValues = {
            pReserveID: $("#hID").val() == "" ? 0 : $("#hID").val()
            , pPurchaseItemID: $("#slReserveDetailsPurchaseItem").val() == "" ? 0 : $("#slReserveDetailsPurchaseItem").val()
            , pCustomerID: $("#slCustomer").val()
            , pWarehouseID: $("#slWarehouse").val()
        };
        CallGETFunctionWithParameters("/api/Reserve/ReserveDetails_FillModalTables", pParametersWithValues
            , function (pData) {
                //var pReceiveDetails = JSON.parse(pData[0]);
                var pPurchaseItemAvailableQty = JSON.parse(pData[0]);
                var pReserveDetailsLocation = JSON.parse(pData[1]);
                //var pPickupDetailsLocation = JSON.parse(pData[2]);
                var pReserveDetailsHeader = JSON.parse(pData[2]);
                if (pReserveDetailsHeader.length == 0) {
                    $("#hReserveDetailsID").val("");
                    $("#txtReserveDetailsReservationAmount").val("");
                }
                else {
                    $("#hReserveDetailsID").val(pReserveDetailsHeader[0].ID);
                    $("#txtReserveDetailsReservationAmount").val(pReserveDetailsHeader[0].ReservationAmount);
                }
                ReceiveDetails_BindTableRows(pPurchaseItemAvailableQty);
                ReserveDetailsLocation_BindTableRows(pReserveDetailsLocation);
                FadePageCover(false);
            }
            , null);
    }
}
function ReserveDetails_Save(pSaveAndNew) {
    debugger;
    FadePageCover(true);
    var _MessageRturned = ReserveDetailsLocation_ValidateToSave();
    var pIDList = GetAllIDsAsStringWithNameAttr('tblReceiveDetails', 'Delete');
    if (pIDList == "") {
        swal("Sorry", "No receive details.");
        FadePageCover(false);
    }
    else if (_MessageRturned != "") {
        swal("Sorry", _MessageRturned);
        FadePageCover(false);
    }
    else if (ValidateForm("form", "ReserveDetailsModal")) {
        var pReceiveDetailsReservedQuantityList = "";
        for (var i = 0; i < pIDList.split(',').length; i++) {
            var _ReservedQuantity = $("#txtReceiveDetailsReservedQuantity" + pIDList.split(',')[i]).val();
            _ReservedQuantity = (parseFloat(_ReservedQuantity) == 0 || _ReservedQuantity == "" ? 0 : _ReservedQuantity);
            pReceiveDetailsReservedQuantityList += pReceiveDetailsReservedQuantityList == "" ? _ReservedQuantity : (',' + _ReservedQuantity);
        } //for (var i = 0; i < pIDList.split(',').length; i++) {
        var pParametersWithValues = {
            //TODO: Send Header Details to save
            pReserveID: $("#hID").val()
            , pWarehouseID: $("#slWarehouse").val() == "" ? "0" : $("#slWarehouse").val()
            , pCustomerID: $("#slCustomer").val() == "" ? "0" : $("#slCustomer").val()
            , pEndUserID: $("#slEndUser").val() == "" ? "0" : $("#slEndUser").val()
            , pReservationDate: ($("#txtReservationDate").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtReservationDate").val().trim()))
            , pReserveDetailsID: $("#hReserveDetailsID").val() == "" ? 0 : $("#hReserveDetailsID").val()
            , pPurchaseItemID: $("#slReserveDetailsPurchaseItem").val() == "" ? 0 : $("#slReserveDetailsPurchaseItem").val()
            , pReservedQuantity: $("#txtReceiveDetailsReservedQuantity").val() == "" ? 0 : $("#txtReceiveDetailsReservedQuantity").val()
            , pReceiveDetailsIDList: pIDList
            , pReceiveDetailsReservedQuantityList: pReceiveDetailsReservedQuantityList
        };
        CallPOSTFunctionWithParameters("/api/Reserve/ReserveDetails_Save", pParametersWithValues
            , function (pData) {
                console.log(pData)
                var _MessageRetuned = pData[4];
                if (_MessageRetuned == "") {
                    $(".classDisableForDetails").attr("disabled", "disabled");
                    var pReserveHeader = JSON.parse(pData[2]);
                    var pReserveDetailsID = pData[3];
                    $("#hReserveDetailsID").val(pReserveDetailsID);
                    $("#txtStatus").val(pReserveHeader.StatusName);
                    $("#tblReserve tr[ID=" + pReserveHeader.ID + "] td.Status").text(pReserveHeader.StatusName);
                    ReserveDetails_BindTableRows(JSON.parse(pData[1]));
                    $("#slWarehouse").val(pReserveHeader.WarehouseID);
                    ReserveDetails_FillModalTables();
                    if (pSaveAndNew) {
                        ClearAll("#ReserveDetailsModal");
                    }
                    else
                        jQuery("#ReserveDetailsModal").modal("hide");
                    swal("Success", "Saved successfully.");
                    if (glbCallingControl == "ReserveProduct")
                        Reserve_LoadingWithPaging();
                    else
                        PDI_LoadReservePDIModal($("#hPDIID").val());
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
function ReserveDetails_DeleteList() {
    debugger;
    //Confirmation message to delete
    var pReserveDetailsIDsToDelete = GetAllSelectedIDsAsString('tblReserveDetails');
    if (pReserveDetailsIDsToDelete != "")
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
                CallGETFunctionWithParameters("/api/Reserve/ReserveDetails_Delete"
                    , { pReserveDetailsIDsToDelete: pReserveDetailsIDsToDelete, pReserveID: $("#hID").val() }
                    , function (pData) {
                        var pReserveDetails = JSON.parse(pData[1]);
                        if (pReserveDetails.length > 0)
                            $(".classDisableForDetails").attr("disabled", "disabled");
                        else
                            $(".classDisableForDetails").removeAttr("disabled");
                        if (pData[0]) {
                            var pReserveHeader = JSON.parse(pData[2]);
                            $("#txtStatus").val(pReserveHeader.StatusName);
                            $("#tblReserve tr[ID=" + pReserveHeader.ID + "] td.Status").text(pReserveHeader.StatusName);
                            ReserveDetails_BindTableRows(pReserveDetails);
                        }
                        else {
                            ReserveDetails_BindTableRows(pReserveDetails);
                            swal("Sorry", strDeleteFailMessage);
                        }
                        FadePageCover(false);
                    });
            });
}
function ReserveDetails_PurchaseItemChanged() {
    debugger;
    $("#hReserveDetailsID").val("");
    $("#txtReserveDetailsDemandedQuantity").val("");
    $("#txtReserveDetailsReservedQuantity").val("");
    $("#txtReserveDetailsNotes").val("");

    $("#tblReceiveDetails tbody").html("");
    $("#tblReserveDetailsLocation tbody").html("");
}
function ReserveDetails_Export(pCalledFrom) {
    debugger;
    if (pCalledFrom == "FromFilter" && ($("#slFilterCustomer").val() == "" || $("#slFilterCustomer").val() == 0))
        swal("Sorry", "Please, select customer.");
    else if ($("#hID").val() == "")
        swal("Sorry", "No records to export.");
    else {
        FadePageCover(true);
        var pWhereClauseExportReceiveDetails = "";
        if (pCalledFrom == "FromFilter")
            pWhereClauseExportReserveDetails = ReserveDetails_Export_GetWhereClause();
        else if (pCalledFrom == "FromEditModal" || pCalledFrom == "WithLocationDetails")
            pWhereClauseExportReserveDetails = "WHERE ReserveID=" + $("#hID").val();
        var pParametersWithValues = {
            pPageNumber: 1
            , pPageSize: 999999
            , pWhereClauseExportReserveDetails: pWhereClauseExportReserveDetails
            , pOrderBy: "ID"
            , pCalledFrom: pCalledFrom
        };
        CallGETFunctionWithParameters("/api/Reserve/ReserveDetails_Export"
            , pParametersWithValues
            , function (pData) {
                var _ExportedRows = JSON.parse(pData[0]);
                //ExportToExcel(pArray, pHeader, pFileName, pExcludedColumns);
                if (pCalledFrom == "WithLocationDetails")
                    ExportToExcel(_ExportedRows, "ReserveCode,SKU,Description,Quantity,Finalized,Notes,LocationCode,PalletID,Serial", "New File", null);
                else
                    ExportToExcel(_ExportedRows, "ReserveCode,ProductCode,ProductName,Quantity,Finalized,Notes", "New File", null);
                FadePageCover(false);
            }
            , null);
    }
}
function ReserveDetails_Export_GetWhereClause() {
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
function ReceiveDetails_BindTableRows(pPurchaseItemAvailableQty) {
    debugger;
    ClearAllTableRows("tblReceiveDetails");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pPurchaseItemAvailableQty, function (i, item) {
        //var _ReservedQuantity = pReserveDetailsLocation.find(x => x.ID == item.ID && x.LocationID == item.LocationID) == undefined
        //    ? 0
        //    : pReserveDetailsLocation.find(x => x.ID == item.ID && x.LocationID == item.LocationID)["ReservedQuantity"];
        //var _PickedQuantity = pPickupDetailsLocation.find(x => x.ID == item.ID && x.LocationID == item.LocationID) == undefined
        //    ? 0
        //    : pPickupDetailsLocation.find(x => x.ID == item.ID && x.LocationID == item.LocationID)["FinalizedPickedQuantity"];
        //var _AvailableQuantity = (item.Quantity - item._PickedQuantity - item.ReservedQuantity + _ReservedQuantity + _PickedQuantity).toFixed(2);
        AppendRowtoTable("tblReceiveDetails",
            ("<tr ID='" + item.ID + "' " + (1 == 2 ? ("ondblclick='ReceiveDetails_FillControls(" + item.ID + ");'") : "") + ">"
                + "<td class='ID'> <input " + (1 == 1 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "'></td>"
                + "<td class='ReceiveID hide'>" + item.ReceiveID + "</td>"
                //+ "<td class='BarCode hide'>" + (item.BarCode == 0 ? "" : item.BarCode) + "</td>"
                + "<td class='PurchaseItemID hide'>" + (item.PurchaseItemID == 0 ? "" : item.PurchaseItemID) + "</td>"
                //+ "<td class='PurchaseItemCode hide'>" + (item.PurchaseItemCode == 0 ? "" : item.PurchaseItemCode) + "</td>"
                //+ "<td class='PurchaseItemName hide'>" + (item.PurchaseItemName == 0 ? "" : item.PurchaseItemName) + "</td>"
                + "<td class='LocationID hide'>" + (item.LocationID == 0 ? "" : item.LocationID) + "</td>"
                + "<td class='LocationCode'>" + (item.LocationCode == 0 ? "" : item.LocationCode) + "</td>"
                + "<td class='ReceiveCode'>" + (item.ReceiveCode == 0 ? "" : item.ReceiveCode) + "</td>"
                + "<td class='BarCode'>" + (item.BarCode == 0 ? "" : item.BarCode) + "</td>"
                + "<td class='PalletID hide'>" + (item.PalletID == 0 ? "" : item.PalletID) + "</td>"
                + "<td class='PackageTypeName'>" + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + "</td>"
                + "<td class='AvailableQuantity'>" + item.AvailableQuantityBeforeReserve + "</td>"
                + "<td class='ReservedQuantity'> <input type='text' style='width:90px;' id='txtReceiveDetailsReservedQuantity" + item.ID + "' class='form-control controlStyle' data-type='number'onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' onchange='ReceiveDetails_SetIsRowChanged(id);' data-required='false' value='" + item.ReservedQuantity + "' /> </td>"
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
    CheckAllCheckbox("HeaderDeleteID");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function ReceiveDetails_SetIsRowChanged(pControlID) {
    debugger;
}
/***************************************ReserveDetailsLocation***************************************/
function ReserveDetailsLocation_BindTableRows(pReserveDetailsLocation) {
    debugger;
    ClearAllTableRows("tblReserveDetailsLocation");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var serialControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-list-ol' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Serial") + "</span>";
    $.each(pReserveDetailsLocation, function (i, item) {
        AppendRowtoTable("tblReserveDetailsLocation",
            ("<tr ID='" + item.ID + "' " + (1 == 2 ? ("ondblclick='ReserveDetailsLocation_FillControls(" + item.ID + ");'") : "") + ">"
                + "<td class='ID'> <input " + (1 == 1 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "'></td>"
                //+ "<td class='ReceiveID hide'>" + item.ReceiveID + "</td>"
                + "<td class='ID hide'>" + item.ID + "</td>"
                //+ "<td class='BarCode hide'>" + (item.BarCode == 0 ? "" : item.BarCode) + "</td>"
                //+ "<td class='PurchaseItemID hide'>" + (item.PurchaseItemID == 0 ? "" : item.PurchaseItemID) + "</td>"
                //+ "<td class='PurchaseItemCode hide'>" + (item.PurchaseItemCode == 0 ? "" : item.PurchaseItemCode) + "</td>"
                //+ "<td class='PurchaseItemName hide'>" + (item.PurchaseItemName == 0 ? "" : item.PurchaseItemName) + "</td>"
                + "<td class='LocationID hide'>" + (item.LocationID == 0 ? "" : item.LocationID) + "</td>"
                + "<td class='LocationCode'>" + (item.LocationCode == 0 ? "" : item.LocationCode) + "</td>"
                + "<td class='ReceiveDetailID hide'>" + (item.ReceiveDetailID == 0 ? "" : item.ReceiveDetailID) + "</td>"
                + "<td class='ReceiveCode'>" + (item.ReceiveCode == 0 ? "" : item.ReceiveCode) + "</td>"
                //+ "<td class='AvailableQuantity'>" + (item.Quantity - item.ReservedQuantity).toFixed(2) + "</td>"
                //+ "<td class='ReservedQuantity'> <input type='text' style='width:90px;' id='txtReserveDetailsLocationReservedQuantity" + item.ID + "' class='form-control controlStyle' data-type='number'onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' onchange='ReserveDetailsLocation_SetIsRowChanged(id);' data-required='false' value='" + item.ReservedQuantity + "' /> </td>"
                + "<td class='ReservedQuantity'>" + item.ReservedQty + "</td>"
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
    BindAllCheckboxonTable("tblReserveDetailsLocation", "ID", "cb-CheckAll-ReserveDetailsLocation");
    CheckAllCheckbox("HeaderDeleteReserveDetailsLocationID");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function ReserveDetailsLocation_ValidateToSave() {
    debugger;
    var _MessageReturned = "";
    var _QuantityToPick = 0;
    var _TableLength = $("#tblReceiveDetails tbody tr").length;
    for (var i = 0; i < _TableLength; i++) {
        var _RowID = $("#tblReceiveDetails tbody tr:nth-child(" + (i + 1) + ") td input").val();
        var _RowAvailableQuantity = parseFloat($("#tblReceiveDetails tr[ID=" + _RowID + "] td.AvailableQuantity").text());
        var _RowReservedQuantity = $("#txtReceiveDetailsReservedQuantity" + _RowID).val() == "" ? 0 : parseFloat($("#txtReceiveDetailsReservedQuantity" + _RowID).val());
        _QuantityToPick += _RowReservedQuantity;
        if (_RowReservedQuantity > _RowAvailableQuantity) {
            var _CurrentLocation = $("#tblReceiveDetails tr[ID=" + _RowID + "] td.LocationCode").text();
            _MessageReturned += _CurrentLocation + "\n";
        }
    }
    _MessageReturned = _MessageReturned == "" ? "" : ("Revise the following locations \n" + _MessageReturned);
    //_MessageReturned = _QuantityToPick > $("#txtReserveDetailsDemandedQuantity").val() || $("#txtReserveDetailsDemandedQuantity").val() == ""
    //                   ? ("Please check demanded quantity: \n" + _MessageReturned)
    //                   : _MessageReturned;
    return _MessageReturned;
}
function ReserveDetailsLocation_NewRow() {
    debugger;
    ++maxReserveDetailsLocationIDInTable;
    //var copyControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Copy") + "</span>";
    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    //var dateValidTo = Date.prototype.addDays(ConvertDateFormat(FormattedTodaysDate), 30);
    var tr = "";
    tr += "<tr ID='" + maxReserveDetailsLocationIDInTable + "'>";
    tr += "     <td class='IsInsert hide'> <input type='checkbox' id='cbReserveDetailsLocationIsInsert" + maxReserveDetailsLocationIDInTable + "' checked='checked' /></td>";
    tr += "     <td class='ReserveDetailsLocationID'> <input disabled='disabled' type='checkbox' value='" + maxReserveDetailsLocationIDInTable + "' /></td>";
    tr += '     <td class="ID" val=""><select id="slReserveDetailsLocationReceiveDetails' + maxReserveDetailsLocationIDInTable + '" style="width:100px;" class="controlStyle" onfocus="DisableBackspaceKey(id);" onkeydown="DisableBackspaceKey(id);" onkeypress="DisableBackspaceKey(id);" onchange="ReserveDetailsLocation_SetIsRowChanged(id);" ReserveDetailsLocation_FillPorts(' + "'" + "slReserveDetailsLocationReceiveDetails" + maxReserveDetailsLocationIDInTable + "'" + '); data-required="false"></select></td>';
    tr += "     <td class='ReceiveCode'> <input type='text' style='width:180px;' id='txtReserveDetailsLocationReceiveCode" + maxReserveDetailsLocationIDInTable + "' class='form-control controlStyle' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='ReserveDetailsLocation_SetIsRowChanged(id);' data-required='false' value='' /> </td>";
    tr += "     <td class='AvailableQuantity'> <input type='text' style='width:90px;' id='txtReserveDetailsLocationAvailableQuantity" + maxReserveDetailsLocationIDInTable + "' class='form-control controlStyle' data-type='number'onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' onchange='ReserveDetailsLocation_SetIsRowChanged(id);' data-required='false' value='0' /> </td>";
    tr += "     <td class='ReservedQuantity'> <input type='text' style='width:90px;' id='txtReserveDetailsLocationReservedQuantity" + maxReserveDetailsLocationIDInTable + "' class='form-control controlStyle' data-type='number'onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' onchange='ReserveDetailsLocation_SetIsRowChanged(id);' data-required='false' value='0' /> </td>";
    //tr += '     <td class="ValidFrom"><input id="txtValidFrom' + maxReserveDetailsLocationIDInTable + '" style="width:85px;height:100%;" readonly="readonly" type="text" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" onchange="ReserveDetailsLocation_SetIsRowChanged(id);" style="background-color:white; cursor:text;" class="input-sm datepicker-input form-control" data-date-format="dd/mm/yyyy" placeholder="Select Date" value="' + FormattedTodaysDate + '" /></td>';
    tr += "     <td class='Notes hide'> <input type='text' style='width:180px;' id='txtNotes" + maxReserveDetailsLocationIDInTable + "' class='form-control controlStyle' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='ReserveDetailsLocation_SetIsRowChanged(id);' data-required='false' value='' /> </td>";
    tr += "     <td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate' id='SelectedIDsToUpdate" + maxReserveDetailsLocationIDInTable + "' type='checkbox' value='" + maxReserveDetailsLocationIDInTable + "' /></td>";
    tr += "     <td class=''>"
        //+ "<a href='#'  onclick='ReserveDetailsLocation_CopyRow(" + maxReserveDetailsLocationIDInTable + ");' " + copyControlsText + "</a>"
        + "</td>";
    tr += "</tr>";
    //if ($("#tblReserveDetailsLocation tbody tr").length > 0)
    //    $(tr).insertBefore('#tblReserveDetailsLocation > tbody > tr:first');
    //else
    $("#tblReserveDetailsLocation tbody").prepend(tr);

    //TODO: Add to WhereClause "AND LocationID NOT IN (Selected Locations)"

    /***************************Filling row controls******************************/
    //$("#slReserveDetailsLocationType" + maxReserveDetailsLocationIDInTable).html($("#slReserveDetailsLocationType").html());
    //$("#slReserveDetailsLocationType" + maxReserveDetailsLocationIDInTable).val($("#slReserveDetailsLocationType").val());
    //$("#slSupplier" + maxReserveDetailsLocationIDInTable).html($("#slSupplier").html());
    //$("#slSupplier" + maxReserveDetailsLocationIDInTable).val($("#slSupplier").val());
    //$("#slPOLCountry" + maxReserveDetailsLocationIDInTable).html($("#slPOLCountry").html());
    //$("#slPOLCountry" + maxReserveDetailsLocationIDInTable).val($("#slPOLCountry").val());
    //$("#slPOL" + maxReserveDetailsLocationIDInTable).html($("#slPOL").html());
    //$("#slPOL" + maxReserveDetailsLocationIDInTable).val($("#slPOL").val());
    //$("#slPODCountry" + maxReserveDetailsLocationIDInTable).html($("#slPODCountry").html());
    //$("#slPODCountry" + maxReserveDetailsLocationIDInTable).val($("#slPODCountry").val());
    //$("#slPOD" + maxReserveDetailsLocationIDInTable).html($("#slPOD").html());
    //$("#slPOD" + maxReserveDetailsLocationIDInTable).val($("#slPOD").val());
    //$("#slEquipment" + maxReserveDetailsLocationIDInTable).html($("#slEquipment").html());
    //$("#slEquipment" + maxReserveDetailsLocationIDInTable).val($("#slEquipment").val());
    //$("#slCommodity" + maxReserveDetailsLocationIDInTable).html($("#slCommodity").html());
    //$("#slCommodity" + maxReserveDetailsLocationIDInTable).val($("#slCommodity").val());
    //$("#slCurrency" + maxReserveDetailsLocationIDInTable).html($("#hReadySlCurrencies").html());
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
                + "<td class='ID'> <input " + (1 == 1 ? " name='Delete' " : " disabled='disabled' ") + (item.ReserveDetailsLocationID > 0 ? " checked='checked' " : "") + " type='checkbox' value='" + item.ID + "'></td>"
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
function ReceiveDetailsSerial_FillModal(pReserveDetailsLocationID) {
    debugger;
    $("#divSerialsBtns").addClass("hide");
    $("#hReserveDetailsLocationID").val(pReserveDetailsLocationID);
    $("#divReceiveDetailsSerial").html("");

    var tr = $("#tblReserveDetailsLocation tr[ID='" + pReserveDetailsLocationID + "']");
    $("#lblReceiveDetailsSerialShown").html($("#lblShown").html());
    $("#txtReceiveDetailsReservedQuantity").val($(tr).find("td.ReservedQuantity").text());
    $("#hID").val($(tr).find("td.ID").text());
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/Reserve/ReserveDetailsSerial_FillModal"
        , {
            pReserveDetailsLocationID: pReserveDetailsLocationID
            , pReceiveDetailsID: $(tr).find("td.ReceiveDetailID").text()
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
        && $("#tblReserveDetailsLocation tr[id=" + $("#hReserveDetailsLocationID").val() + "] td.ReservedQuantity").text() < pReceiveDetailsSerialIDList.split(',').length)
        swal("Sorry", "Check number selected serials.");
    else {
        FadePageCover(true);
        var pParametersWithValues = {
            pReserveDetailsLocationID: $("#hReserveDetailsLocationID").val()
            , pReceiveDetailsID: $("#hID").val()
            , pReceiveDetailsSerialIDList: pReceiveDetailsSerialIDList
        };
        CallPOSTFunctionWithParameters("/api/Reserve/ReserveDetailsSerial_Save", pParametersWithValues
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
function ReceiveDetailsSerial_DeleteFromReserve() {
    debugger;
    var pReceiveDetailsSerialIDsDeletedFromReserve = GetAllSelectedIDsAsStringWithTableNameAndNameAttr("tblReceiveDetailsSerial", "Delete");
    if (pReceiveDetailsSerialIDsDeletedFromReserve != "")
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
                CallPOSTFunctionWithParameters("/api/Receive/ReceiveDetailsSerial_DeleteFromReserve"
                    , {
                        pReceiveDetailsSerialIDsDeletedFromReserve: pReceiveDetailsSerialIDsDeletedFromReserve
                        , pReserveDetailsLocationID: $("#hReserveDetailsLocationID").val()
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
            //("<tr ID='" + item.ID + "' ondblclick='ReserveDetails_FillControls(" + item.ID + ");' class='" + (item.IsFinalized ? "" : "") + "'>"
            ("<tr ID='" + item.ID + "' ondblclick='PDI_LoadReservePDIModal(" + item.ID + "," + item.OperationVehicleID + ");' class='" + (item.IsFinalized ? "" : "") + "'>"
                + "<td class='ID hide'>" + item.ID + "</td>"
                + "<td class='RecieveID hide'>" + item.ReceiveID + "</td>"
                + "<td class='CustomerID hide'>" + item.CustomerID + "</td>"
                + "<td class='WarehouseID hide'>" + item.WarehouseID + "</td>"
                + "<td class='LocationID hide'>" + item.LocationID + "</td>"
                + "<td class='Quantity hide'>" + item.Quantity + "</td>"
                + "<td class='FinalizedReservedQuantity hide'>" + item.FinalizedReservedQuantity + "</td>"

                + "<td class='BarCode hide'>" + item.BarCode + "</td>"
                + "<td class='PurchaseItemID hide'>" + item.PurchaseItemID + "</td>"
                + "<td class='DemandedQuantity hide'>" + item.DemandedQuantity + "</td>"
                + "<td class='ReservedQuantity hide'>" + item.ReservedQuantity + "</td>"

                + "<td class='CustomerName'>" + item.CustomerName + "</td>"
                + "<td class='ProductCode'>" + item.PurchaseItemCode + "</td>"
                + "<td class='ProductName'>" + item.PurchaseItemName + "</td>"
                + "<td class='LocationCode'>" + (item.LocationID == 0 ? "" : item.LocationCode) + "</td>"
                + "<td class='AvailableQuantity hide'>" + (parseFloat(item.Quantity) - parseFloat(item.FinalizedReservedQuantity)) + "</td>"
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

    _WhereClause += "WHERE 1=1 and  (Quantity>FinalizedReservedQuantity) AND OperationVehicleID IS NOT NULL ";

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
function PDI_LoadReservePDIModal(pID, pOperationVehicleID) {
    debugger;
    FadePageCover(true);
    ClearAll("#ReserveModal");

    var tr = $("#tblPDI tr[ID='" + pID + "']");
    $("#lblShown").html(": " + $(tr).find("td.ChassisNumber").text());

    $("#tblReserveDetails tbody tr").html("");
    $("#hPDIID").val(pID);
    $("#hOperationVehicleID").val(pOperationVehicleID);
    $("#txReserveDetailsPurchaseItemQuantity").val(1);
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
            $("#btn-NewAdd").attr("onclick", "Reserve_ClearAllControls(" + pID + ");");
            jQuery("#ReserveModal").modal("show");
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
    ClearAllTableRows("tblReserveDetails");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pPDI, function (i, item) {
        AppendRowtoTable("tblReserveDetails",
            ("<tr ID='" + item.ID + "' " + (1 == 1 ? ("ondblclick='ReserveDetails_FillControls(" + item.ID + ");'") : "") + ">"
                + "<td class='ID'> <input " + (1 == 1 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "'></td>"
                + "<td class='ID hide'>" + item.ID + "</td>"
                //+ "<td class='BarCode'>" + (item.BarCode == 0 ? "" : item.BarCode) + "</td>"
                + "<td class='PurchaseItemID hide'>" + (item.PurchaseItemID == 0 ? "" : item.PurchaseItemID) + "</td>"
                + "<td class='PDICode'>" + (item.Code == 0 ? "" : item.Code) + "</td>"
                + "<td class='PurchaseItemCode'>" + (item.PurchaseItemCode == 0 ? "" : item.PurchaseItemCode) + "</td>"
                + "<td class='PurchaseItemName'>" + (item.PurchaseItemName == 0 ? "" : item.PurchaseItemName) + "</td>"
                //+ "<td class='ID hide'>" + (item.ID == 0 ? "" : item.ID) + "</td>"
                //+ "<td class='ReceiveCode'>" + (item.ReceiveCode == 0 ? "" : item.ReceiveCode) + "</td>"
                //+ "<td class='LocationID hide'>" + (item.LocationID == 0 ? "" : item.LocationID) + "</td>"
                //+ "<td class='LocationCode'>" + (item.LocationCode == 0 ? "" : item.LocationCode) + "</td>"
                + "<td class='ReservedQuantity'>" + item.Quantity + "</td>"
                + "<td class='ActionDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ActionDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ActionDate))) + "</td>"
                + "<td class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                //+ "<td class='PackageTypeID hide'>" + (item.PackageTypeID == 0 ? "" : item.PackageTypeID) + "</td>"
                //+ "<td class='PackageTypeName'>" + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + "</td>"
                + "<td class='hide'><a href='#ReserveDetailsModal' data-toggle='modal' onclick='ReserveDetails_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
                + "</tr>"));
    });
    ////ApplyPermissions();
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    BindAllCheckboxonTable("tblReserveDetails", "ID", "cb-CheckAll-ReserveDetails");
    CheckAllCheckbox("HeaderDeleteReserveDetailsID");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function PDIDetails_Save() {
    debugger;
    if ($("#txReserveDetailsPurchaseItemQuantity").val() == 0 || $("#slReserveDetailsPurchaseItem").val() == "")
        swal("Sorry", "Please, select item and quantity");
    else {
        FadePageCover(true);
        var pParametersWithValues = {
            pID: 0 //$("#hPDIID").val() == "" ? 0 : $("#hPDIID").val()
            , pID: $("#hPDIID").val()
            , pOperationVehicleID: $("#hOperationVehicleID").val()
            , pPurchaseItemID: $("#slReserveDetailsPurchaseItem").val() == 0 ? "" : $("#slReserveDetailsPurchaseItem").val()
            , pQuantity: $("#txReserveDetailsPurchaseItemQuantity").val() == "" ? 0 : $("#txReserveDetailsPurchaseItemQuantity").val()
            , pActionDate: "01/01/1900"
            , pNotes: "0"
        };
        CallGETFunctionWithParameters("/api/PDI/Save", pParametersWithValues
            , function (pData) {
                var _ReturnedMessage = pData[0];
                var _PDI = JSON.parse(pData[1]);
                if (_ReturnedMessage == "") {
                    $("#txReserveDetailsPurchaseItemQuantity").val(1);
                    $("#slReserveDetailsPurchaseItem").val("");
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
    var pPDIIDsToDelete = GetAllSelectedIDsAsString('tblReserveDetails');
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

        var files = $("#ExcelReserveItems").get(0).files;

        // Add the uploaded image content to the form data collection
        if (files.length > 0) {
            data.append(files[0].name, files[0]);
            data.append("pID", $("#hID").val())     //ReserveID
            FadePageCover(true);
            $.ajax({
                url: '/api/Reserve/UploadExcel',
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
                                Reserve_FillAllControls($("#hID").val());
                            });

                        }
                        else if (result.MissingFields != "")
                            swal("Sorry", "File Uploading failed .. " + result.MissingFields);
                        else if (result.InvalidQuantityMessage != "")
                            swal("Sorry", "File Uploading failed .. " + result.InvalidQuantityMessage);
                        else if (result.exception != "")
                            swal("Sorry", "File Uploading failed .. " + result.exception);

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
function Reserve_GetAvailableUsers() {
    debugger;
    Receptionists_GetAvailableUsers();
    $("#btnCheckboxesListApply").attr("onclick", "sendEmailAfterUpload();");
    $("#btnCheckboxesListApply").html("<span class='glyphicon glyphicon-send'></span> Send");
    $("#btn-SearchItems").attr("onclick", "Reserve_GetAvailableUsers();");
}
//*********************************EOF Upload Excel***************************************//
//*********************************Full Reservation***************************************//
function FullReservation_Initialize() {
    debugger;
    $("#slFullReservationCustomer").css({ "width": "100%" }).select2();
    $("#slFullReservationCustomer").trigger("change");
    $("div[tabindex='-1']").removeAttr('tabindex');
}
function FullReservation(pAction) {
    debugger;
    CallGETFunctionWithParameters("/api/Reserve/FullReservationSet",
        {
            pAction: pAction,
            pCustomerID: $("#slFullReservationCustomer").val(),
            pReservationReason: $("#txtReservationReason").val()
        }
        , function (pData) {
            debugger;
            let Status = pData[0];
            let Exception = JSON.parse(pData[1]);
            let ReturnedMessage = pData[2]
            if (Status == 0)
                swal("Sorry", Exception.Message);
            else if (ReturnedMessage != "")
                swal("Sorry", ReturnedMessage);
            else
                swal("Success", "Saved Successfully");
    });
}
//*********************************EOF Full Reservation***************************************//
//*********************************GeneratePickup***************************************//
function GeneratePickup() {
    debugger;
    CallGETFunctionWithParameters("/api/Reserve/GeneratePickup",
        {
            pReserveID: $("#hID").val(),
        }
        , function (pResult) {
            debugger;
            if (pResult.StatusCode == 1)
                swal("Success", "Pickup " + pResult.InsertedPickupCode + " is inserted successfully!");
            else if (pResult.ExceptionMessage != "")
                swal("Sorry", pResult.ExceptionMessage);
        });
}
//*********************************EOF GeneratePickup***************************************//