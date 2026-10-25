function Contract_Initialize() {
    debugger;
    $("#hl-menu-Warehousing").parent().siblings().removeClass("active");
    AddService();
    strBindTableRowsFunctionName = "Contract_BindTableRows";
    strLoadWithPagingFunctionName = "/api/Contract/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = " WHERE 1=1 ";
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/Warehousing/Transactions/Contract", "div-content", function () {
        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
            , function (pData) {
                var pStorageUnit = pData[2];
                var pWarehouse = pData[3];
                var pChargeType = pData[4];
                var pContractDetailsQuantityUnit = pData[5];
                var pContractDetailsType = pData[6];
                Contract_BindTableRows(JSON.parse(pData[0]));
                $("#slCustomer").html($("#hReadySlCustomers").html());
                $("#slCurrency").html($("#hReadySlCurrencies").html());
                FillListFromObject(null, 1, "<--Select-->", "slStorageUnit", pStorageUnit, null);
                FillListFromObject(null, 2, null/*pStrFirstRow*/, "slWarehouse", pWarehouse, null);
                FillListFromObject(null, (pDefaults.IsRepeatChargeTypeName ? 4 : 2), null/*pStrFirstRow*/, "slContractDetailsChargeType", pChargeType, null);
                FillListFromObject(null, (pDefaults.IsRepeatChargeTypeName ? 4 : 2), "<--Select-->", "slChargeTypes", pChargeType, null);
                FillListFromObject(null, 2, null/*pStrFirstRow*/, "slContractDetailsQuantityUnit", pContractDetailsQuantityUnit, null);
                FillListFromObject(null, 2, null/*pStrFirstRow*/, "slContractDetailsType", pContractDetailsType, null);
                FillListFromObject(null, 2, "< --Select -->", "slPaymentTerm", pData[7], null);
                FillListFromObject(null, 2, "< --Select -->", "slService", pData[8], function (pServices) {
                    $.each(pServices, function (i, pService) {
                        $('#slService option[value=' + pService.ID + ']').attr('selling', pService.Selling);
                    })
                });
            });
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    },
        function () { Contract_ClearAllControls(); },
        function () { Contract_DeleteList(); });
}
function Contract_BindTableRows(pContract) {
    debugger;
    $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblContract");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pContract, function (i, item) {
        AppendRowtoTable("tblContract",
        ("<tr ID='" + item.ID + "' ondblclick='Contract_FillAllControls(" + item.ID + ");' class='" + (item.IsFinalized ? "text-primary" : "") + "'>"
            + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='Code'>" + item.Code + "</td>"
            + "<td class='WarehouseID hide'>" + item.WarehouseID + "</td>"
            + "<td class='CustomerID hide'>" + item.CustomerID + "</td>"
            + "<td class='CustomerName'>" + item.CustomerName + "</td>"
            + "<td class='FromDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.FromDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.FromDate))) + "</td>"
            + "<td class='ToDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ToDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ToDate))) + "</td>"
            + "<td class='StorageLimit hide'>" + item.StorageLimit + "</td>"
            + "<td class='StorageUnitID hide'>" + item.StorageUnitID + "</td>"
            + "<td class='StorageUnitCode hide'>" + (item.StorageUnitCode == 0 ? "" : item.StorageUnitCode) + "</td>"
            + "<td class='IsByPallet hide'> <input type='checkbox' id='cbIsByPallet" + item.ID + "' disabled='disabled' " + (item.IsByPallet ? " checked='checked' " : "") + " /></td>"
            + "<td class='NumberOfPallets hide'>" + item.NumberOfPallets + "</td>"
            + "<td class='CurrencyID hide'>" + item.CurrencyID + "</td>"
            + "<td class='CurrencyCode'>" + item.CurrencyCode + "</td>"
            + "<td class='Status'>" + item.Status + "</td>"
            + "<td class='IsFinalized hide'> <input type='checkbox' id='cbIsFinalized" + item.ID + "' disabled='disabled' " + (item.IsFinalized ? " checked='checked' " : "") + " /></td>"
            + "<td class='hide'><a href='#ContractModal' data-toggle='modal' onclick='Contract_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblContract", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblContract>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function Contract_LoadingWithPaging() {
    debugger;
    var pWhereClause = Contract_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { Contract_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblContract>tbody>tr", $("#txt-Search").val().trim());
}
function Contract_GetWhereClause() {
    var _WhereClause = "WHERE 1=1" + "\n";
    if ($("#txt-Search").val().trim() != "") {
        _WhereClause += "AND (" + "\n";
        _WhereClause += "       Code LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        _WhereClause += "       OR CustomerName LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        _WhereClause += "    )";
    }
    return _WhereClause;
}
function Contract_ClearAllControls() {
    debugger;
    $("#tblContractDetails tbody").html("");
    $("#txtNumberOfPallets").attr("disabled", "disabled");
    //$("#lblContractMaxWeight").html("<span> : </span><span>" + 0 + "</span>");
    //$("#lblContractMaxVolume").html("<span> : </span><span>" + 0 + "</span>");
    ClearAll("#ContractModal");
    AddService();
    $("#slCurrency").val(pDefaults.CurrencyID);
    $("#slStorageUnit").val(constAreaUnitTypeIDForM2);
    $("#cbIsByPallet").attr("disabled", "disabled");
    $("#addContractService").addClass("hide");
    $(".classDisableForFinalized").removeAttr("disabled");
    
    $("#btnSave").attr("onclick", "Contract_Save(false);");
    $("#btnSaveAndAddNew").attr("onclick", "Contract_Save(true);");
    $("#cb-CheckAll").prop('checked', false);
    $("#btnSave,#btnSaveAndAddNew").removeClass('hide');
    Contract_StorageUnitChanged();
}
function Contract_FillAllControls(pID) {
    debugger;
    FadePageCover(true);
    //$("#txtNumberOfLevelsPerContract").attr("disabled", "disabled");
    //$("#txtNumberOfTraysPerLevel").attr("disabled", "disabled");
    ClearAll("#ContractModal");
    $("#tblContractDetails tbody").html("");
    $('#tblServices tbody').html('');
    $("#addContractService").removeClass("hide");

    jQuery("#ContractModal").modal("show");
    var pParametersWithValues = {
        pHeaderID: pID
    };
    CallGETFunctionWithParameters("/api/Contract/LoadHeaderWithDetails", pParametersWithValues
        , function (pData) {
            var pContractHeader = JSON.parse(pData[0]);
            var pContractDetails = JSON.parse(pData[1]);
            var pContractServiecs = JSON.parse(pData[2]);
            if (pContractHeader.Status.toUpperCase() == "FINALIZED")
                $(".classDisableForFinalized").attr("disabled", "disabled");
            else
                $(".classDisableForFinalized").removeAttr("disabled");
            $("#hID").val(pID);
            $("#lblShown").html(": " + pContractHeader.Code);
            $("#txtCode").val(pContractHeader.Code);
            $("#txtStatus").val(pContractHeader.Status);
            $("#slWarehouse").val(pContractHeader.WarehouseID == 0 ? "" : pContractHeader.WarehouseID);
            $("#slCustomer").val(pContractHeader.CustomerID == 0 ? "" : pContractHeader.CustomerID);
            $("#txtFromDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pContractHeader.FromDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pContractHeader.FromDate)));
            $("#txtToDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pContractHeader.ToDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pContractHeader.ToDate)));
            $("#txtStorageLimit").val(pContractHeader.StorageLimit == 0 ? "" : pContractHeader.StorageLimit);
            $("#slStorageUnit").val(pContractHeader.StorageUnitID == 0 ? "" : pContractHeader.StorageUnitID);
            $("#cbIsByPallet").prop("checked", pContractHeader.IsByPallet);
            $("#txtNumberOfPallets").val(pContractHeader.NumberOfPallets);
            $("#slCurrency").val(pContractHeader.CurrencyID == 0 ? "" : pContractHeader.CurrencyID);
            $("#txtNotes").val(pContractHeader.Notes == 0 ? "" : pContractHeader.Notes);
            $("#cbIsFinalized").prop("checked", pContractHeader.IsFinalized);
            $("#txtAmount").val(pContractHeader.Amount);
            $("#txtYearlyExtraRatio").val(pContractHeader.YearlyExtraRatio);
            $("#slPaymentTerm").val(pContractHeader.PaymentTermID);
            $("#cbApproved").prop("checked", pContractHeader.Approved);
            $("#txtdayAmount").val(pContractHeader.DayAmount);
            $("#slChargeTypes").val(pContractHeader.ChargeTypeId == 0 ? "" : pContractHeader.ChargeTypeId);
            Contract_StorageUnitChanged();
            ContractDetails_BindTableRows(pContractDetails);
            $("#btnSave").attr("onclick", "Contract_Save(false);");
            $("#btnSaveAndAddNew").attr("onclick", "Contract_Save(true);");
            $.each(pContractServiecs, function (i, item) {
                AddService();
                $('#tblServices tbody tr:eq(' + i + ')').find('td.ID input').val(item.ID);
                $('#tblServices tbody tr:eq(' + i + ')').find('td.ServiceID select').val(item.ServiceId).change();
                $('#tblServices tbody tr:eq(' + i + ')').find('td.Selling input').val(item.Selling);
            });
            FadePageCover(false);
            if (pContractHeader.Approved) {
                $("#btnSave,#btnSaveAndAddNew").addClass('hide');
            }
            else {
                $("#btnSave,#btnSaveAndAddNew").removeClass('hide');
            }
        }
        , null);
}
//pReleaseDate: ($("#txtOperationReleaseDate").val().trim() == "" ? "0" : PadDateWithZeroes($("#txtOperationReleaseDate").val().trim())),
function Contract_Save(pSaveAndNew) {
    debugger;
    FadePageCover(true);
    //if (!isValidDate($("#txtFromDate").val().trim(), 1) || !isValidDate($("#txtToDate").val().trim(), 1)) {
    //    swal(strSorry, "Please, Enter Start-End dates.");
    //    FadePageCover(false);
    //}
    if ($("#txtFromDate").val().trim() != "" && $("#txtToDate").val().trim() != ""
        && Date.prototype.compareDates(ConvertDateFormat($("#txtFromDate").val().trim()), ConvertDateFormat($("#txtToDate").val().trim())) < 0) {
        FadePageCover(false);
        swal("Sorry", "Please, check dates.");
    }

    else if (ValidateForm("form", "ContractModal")) {
        var services = [];
        $('#tblServices tbody tr').each(function (i) {
            services.push({
                ID: IsNull($(this).find('td.ID input').val(), 0),
                ServiceID: IsNull($(this).find('td.ServiceID select').val(), 0),
                ServiceSelling: IsNull($(this).find('td.Selling input').val(), 0),
            });
        });
        pParametersWithValues = {
              ID: $("#hID").val() == "" ? 0 : $("#hID").val()
            , WarehouseID: $("#slWarehouse").val() == "" ? "0" : $("#slWarehouse").val()
            , CustomerID: $("#slCustomer").val() == "" ? "0" : $("#slCustomer").val()
            , FromDate: ($("#txtFromDate").val().trim() == "" ? "0" : PadDateWithZeroes($("#txtFromDate").val().trim()))
            , ToDate: ($("#txtToDate").val().trim() == "" ? "0" : PadDateWithZeroes($("#txtToDate").val().trim()))
            , StorageLimit: $("#txtStorageLimit").val().trim() == "" ? "0" : $("#txtStorageLimit").val().trim().toUpperCase()
            , StorageUnitID: $("#slStorageUnit").val() == "" ? "0" : $("#slStorageUnit").val()
            , IsByPallet: $("#cbIsByPallet").prop("checked")
            , NumberOfPallets: $("#txtNumberOfPallets").val().trim() == "" ? "0" : $("#txtNumberOfPallets").val().trim().toUpperCase()
            , CurrencyID: $("#slCurrency").val() == "" ? "0" : $("#slCurrency").val()
            , Notes: $("#txtNotes").val().trim() == "" ? "0" : $("#txtNotes").val().trim().toUpperCase()
            , IsFinalized: $("#cbIsFinalized").prop("checked")
            , Amount: Number($("#txtAmount").val())
            , YearlyExtraRatio: Number($("#txtYearlyExtraRatio").val())
            , PaymentTermID: $("#slPaymentTerm").val() > 0 ? $("#slPaymentTerm").val():0
            , Approved: $("#cbApproved").prop("checked")
            , ChargeTypeId: $("#slChargeTypes").val() == "" ? "0" : $("#slChargeTypes").val()
            , DayAmount: Number($("#txtdayAmount").val())
            , contractServices : services
        };
        CallPOSTFunctionWithParameters("/api/Contract/Save", pParametersWithValues
            , function (pData) {
                if (pData[0] == "") {
                    var pContractHeader = JSON.parse(pData[2]);
                    //var pContractDetails = JSON.parse(pData[3]);
                    Contract_LoadingWithPaging();
                    if (pSaveAndNew) {
                        Contract_ClearAllControls();
                    }
                    else {
                        $("#hID").val(pData[1]);
                        $("#txtCode").val(pContractHeader.Code);
                        $("#txtStatus").val(pContractHeader.Status);
                        //ContractDetails_BindTableRows(pContractDetails);
                        $("#btnSave").attr("onclick", "Contract_Save(false);");
                        $("#btnSaveAndAddNew").attr("onclick", "Contract_Save(true);");
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
    else //if (ValidateForm("form", "ContractModal"))
        FadePageCover(false);
}
function Contract_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblContract') != "")
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
            DeleteListFunction("/api/Contract/Delete", { "pContractIDs": GetAllSelectedIDsAsString('tblContract') }, function () { Contract_LoadingWithPaging(); });
        });
    //DeleteListFunction("/api/Contract/Delete", { "pContractIDs": GetAllSelectedIDsAsString('tblContract') }, function () { Contract_LoadingWithPaging(); });
}
function Contract_IsByPalletChanged() {
    debugger;
    if ($("#cbIsByPallet").prop("checked"))
        $("#txtNumberOfPallets").removeAttr("disabled");
    else {
        $("#txtNumberOfPallets").val("");
        $("#txtNumberOfPallets").attr("disabled", "disabled");
    }
}
function Contract_StorageUnitChanged() {
    debugger;
    if ($("#slStorageUnit").val() == constAreaUnitTypeIDForM2) {
        $("#cbIsByPallet").attr("disabled", "disabled");
        $("#cbIsByPallet").prop("checked", false);
        $("#txtNumberOfPallets").attr("disabled", "disabled");
        $("#txtNumberOfPallets").val("");
    }
    else {
        $("#cbIsByPallet").removeAttr("disabled");
    }
    debugger;
    if ($("#slStorageUnit").find(":selected").text() === "Daily") {
        $("#dayamount").removeClass("hide");
    }
    else {
        $("#dayamount").addClass("hide");
    }
}
function Contract_Finalize() {
    debugger;
    if ($("#hID").val() == "")
        swal("Sorry", "Please save the contract first.");
    else {
        swal({
            title: "Are you sure?",
            text: "This Contract will be finalized!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, finalize!",
            closeOnConfirm: true
        },
        //callback function in case of confirm
        function () {
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/Contract/Finalize"
            , { pFinalizedContractID: $("#hID").val() }
            , function (pData) {
                if (pData[0] == "") {
                    swal("Success", "Finalized successfully.");
                    $(".classDisableForFinalized").attr("disabled", "disabled");
                    $("#txtStatus").val("FINALIZED");
                    $("#tblContract tr[ID=" + $("#hID").val() + "] td.Status").text("FINALIZED");
                    Contract_LoadingWithPaging();
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
/***************************************ContractDetails***************************************/
function ContractDetails_BindTableRows(pContractDetails) {
    ClearAllTableRows("tblContractDetails");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pContractDetails, function (i, item) {
        AppendRowtoTable("tblContractDetails",
        ("<tr ID='" + item.ID + "' " + (1 == 1 ? ("ondblclick='ContractDetails_FillControls(" + item.ID + ");'") : "") + ">"
            + "<td class='ID'> <input " + (1 == 1 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "'></td>"
            + "<td class='ContractID hide'>" + item.ContractID + "</td>"
            + "<td class='ChargeTypeID hide'>" + (item.ChargeTypeID == 0 ? "" : item.ChargeTypeID) + "</td>"
            + "<td class='ChargeTypeName'>" + (item.ChargeTypeName == 0 ? "" : item.ChargeTypeName) + (pDefaults.IsRepeatChargeTypeName ? ("(" + item.ChargeTypeCode + ")") : "") + "</td>"
            + "<td class='Quantity'>" + item.Quantity + "</td>"
            + "<td class='QuantityUnitID hide'>" + (item.QuantityUnitID == 0 ? "" : item.QuantityUnitID) + "</td>"
            + "<td class='QuantityUnitName'>" + (item.QuantityUnitName == 0 ? "" : item.QuantityUnitName) + "</td>"
            + "<td class='Rate'>" + item.Rate + "</td>"
            + "<td class='MinimumCharge'>" + item.MinimumCharge + "</td>"
            + "<td class='AdditionalRate hide'>" + item.AdditionalRate + "</td>"
            + "<td class='TypeID hide'>" + (item.TypeID == 0 ? "" : item.TypeID) + "</td>"
            + "<td class='TypeName'>" + (item.TypeName == 0 ? "" : item.TypeName) + "</td>"
            + "<td class='Cost'>" + item.Cost + "</td>"
            + "<td class='hide'><a href='#ContractDetailsModal' data-toggle='modal' onclick='ContractDetails_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
        + "</tr>"));
    });
    ////ApplyPermissions();
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    BindAllCheckboxonTable("tblContractDetails", "ID", "cb-CheckAll-ContractDetails");
    CheckAllCheckbox("HeaderDeleteContractDetailsID");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function ContractDetails_ClearAllControls() {
    debugger;
    if ($("#hID").val() == "")
        swal("Sorry", "Please, save header first.");
    else {
        ClearAll("#ContractDetailsModal");
        $("#btnSaveContractDetails").attr("onclick", "ContractDetails_Save(false);");
        $("#btnSaveAndAddNewContractDetails").attr("onclick", "ContractDetails_Save(true);");
        jQuery("#ContractDetailsModal").modal("show");
    }
}
function ContractDetails_FillControls(pID) {
    debugger;
    ClearAll("#ContractDetailsModal");
    $("#hContractDetailsID").val(pID);
    var tr = $("#tblContractDetails tr[ID='" + pID + "']");

    $("#slContractDetailsChargeType").val($(tr).find("td.ChargeTypeID").text());
    $("#txtContractDetailsQuantity").val($(tr).find("td.Quantity").text());
    $("#slContractDetailsQuantityUnit").val($(tr).find("td.QuantityUnitID").text());
    $("#txtContractDetailsRate").val($(tr).find("td.Rate").text());
    $("#txtContractDetailsMinimumCharge").val($(tr).find("td.MinimumCharge").text());
    $("#txtContractDetailsTrayNumber").val($(tr).find("td.TrayNumber").text());
    $("#slContractDetailsType").val($(tr).find("td.TypeID").text());
    $("#txtContractDetailsCost").val($(tr).find("td.Cost").text());

    jQuery("#ContractDetailsModal").modal("show");
}
function ContractDetails_Save(pSaveAndNew) {
    debugger;
    FadePageCover(true);
    if (ValidateForm("form", "ContractDetailsModal")) {
        var pParametersWithValues = {
            pContractDetailsID: $("#hContractDetailsID").val() == "" ? 0 : $("#hContractDetailsID").val()
            , pContractID: $("#hID").val()
            , pChargeTypeID: $("#slContractDetailsChargeType").val() == "" ? 0 : $("#slContractDetailsChargeType").val()
            , pQuantity: $("#txtContractDetailsQuantity").val() == "" ? 0 : $("#txtContractDetailsQuantity").val()
            , pQuantityUnitID: $("#slContractDetailsQuantityUnit").val() == "" ? 0 : $("#slContractDetailsQuantityUnit").val()
            , pRate: $("#txtContractDetailsRate").val() == "" ? 0 : $("#txtContractDetailsRate").val()
            , pMinimumCharge: $("#txtContractDetailsMinimumCharge").val() == "" ? 0 : $("#txtContractDetailsMinimumCharge").val()
            , pAdditionalRate: $("#txtContractDetailsAdditionalRate").val() == "" ? 0 : $("#txtContractDetailsAdditionalRate").val()
            , pTypeID: $("#slContractDetailsType").val() == "" ? 0 : $("#slContractDetailsType").val()
            , pCost: $("#txtContractDetailsCost").val() == "" ? 0 : $("#txtContractDetailsCost").val()
        };
        CallGETFunctionWithParameters("/api/Contract/ContractDetails_Save", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    ContractDetails_BindTableRows(JSON.parse(pData[1]));
                    if (pSaveAndNew)
                        ClearAll("#ContractDetailsModal");
                    else
                        jQuery("#ContractDetailsModal").modal("hide");
                    swal("Success", "Saved successfully.");
                }
                else
                    swal("Sorry", "Saving failed, please try again.");
                FadePageCover(false);
            }
            , null);
    }
    else
        FadePageCover(false);
}
function ContractDetails_DeleteList() {
    debugger;
    //Confirmation message to delete
    var pContractDetailsIDsToDelete = GetAllSelectedIDsAsString('tblContractDetails');
    if (pContractDetailsIDsToDelete != "")
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
            CallGETFunctionWithParameters("/api/Contract/ContractDetails_Delete"
                , { pContractDetailsIDsToDelete: pContractDetailsIDsToDelete, pContractID: $("#hID").val() }
                , function (pData) {
                    if (pData[0]) {
                        ContractDetails_BindTableRows(JSON.parse(pData[1]));
                    }
                    else
                        swal("Sorry", strDeleteFailMessage);
                    FadePageCover(false);
                });
        });
}
function toggleTextboxVisibility() {
    debugger;
    if ($("#slPaymentTerm").find(":selected").text() === "append daily") {
        $("#dayamount").removeClass("hide");
    }
    else {
        $("#dayamount").addClass("hide");
    }
}
function AddService() {
    AppendRowtoTable("tblServices",
        (`<tr>
            <td class='ID hide'><input class="form-control" type="text"/></td>
            <td class='ServiceID'><select data-required="false" class="form-control";'>`+ $('#slService').html() + `</select></td>           
            <td class='Selling'><input class="form-control" type="text" onfocus="ChkValIsDecimal(this);"></td>
			<td><span class='fa fa-trash text-danger' onclick='DeleteTableRow(this);'></span></td>
        </tr>`));
    $('#tblServices td.ServiceID select').css({ 'width': '100%' }).select2();
}
