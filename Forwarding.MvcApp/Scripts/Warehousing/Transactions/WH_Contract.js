function WH_Contract_Initialize() {
    debugger;
    $("#hl-menu-Warehousing").parent().siblings().removeClass("active");
    AddService();
    strBindTableRowsFunctionName = "WH_Contract_BindTableRows";
    strLoadWithPagingFunctionName = "/api/WH_Contract/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = " WHERE 1=1 ";
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/Warehousing/Transactions/WH_Contract", "div-content", function () {
        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
            , function (pData) {

                WH_Contract_BindTableRows(JSON.parse(pData[0]));
                $("#slCustomer").html($("#hReadySlCustomers").html());
                FillListFromObject(null, 2, "<--Select-->", "slStorageUnit", pData[2], null);
                FillListFromObject(null, (pDefaults.IsRepeatChargeTypeName ? 4 : 2), "< --Select -->", "slWH_ContractDetailsChargeType", pData[3], null);
                FillListFromObject(null, 1, "< --Select -->", "slWH_ContractDetailsPackageType", pData[4], null);
                FillListFromObject(null, 2, "< --Select -->", "slWH_ContractDetailsPalletClass", pData[5], null);
                FillListFromObject(null, 2, "< --Select -->", "slWH_ContractDetailsPaymentTerm", pData[6], null);

                FillListFromObject(null, 2, "< --Select -->", "slService", pData[7], function (pServices) {
                    $.each(pServices, function (i, pService) {
                        $('#slService option[value=' + pService.ID + ']').attr('selling', pService.Selling);
                    })
                });
            });
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    },
        function () { WH_Contract_ClearAllControls(); },
        function () { WH_Contract_DeleteList(); });
}
function WH_Contract_BindTableRows(pWH_Contract) {
    debugger;
    $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblWH_Contract");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pWH_Contract, function (i, item) {
        AppendRowtoTable("tblWH_Contract",
        ("<tr ID='" + item.ID + "' ondblclick='WH_Contract_FillAllControls(" + item.ID + ");' class='" + (item.IsFinalized ? "text-primary" : "") + "'>"
            + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='Code'>" + item.Code + "</td>"
            + "<td class='CustomerID hide'>" + item.CustomerID + "</td>"
            + "<td class='CustomerName'>" + item.CustomerName + "</td>"
            + "<td class='FromDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.FromDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.FromDate))) + "</td>"
            + "<td class='ToDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ToDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ToDate))) + "</td>"
            + "<td class='StorageUnitID hide'>" + item.StorageUnitID + "</td>"
            + "<td class='StorageUnitCode hide'>" + (item.StorageUnitCode == 0 ? "" : item.StorageUnitCode) + "</td>"
            + "<td class='Status'>" + item.Status + "</td>"
            + "<td class='hide'><a href='#WH_ContractModal' data-toggle='modal' onclick='WH_Contract_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblWH_Contract", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblWH_Contract>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function WH_Contract_LoadingWithPaging() {
    debugger;
    var pWhereClause = WH_Contract_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { WH_Contract_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblWH_Contract>tbody>tr", $("#txt-Search").val().trim());
}
function WH_Contract_GetWhereClause() {
    var _WhereClause = "WHERE 1=1" + "\n";
    if ($("#txt-Search").val().trim() != "") {
        _WhereClause += "AND (" + "\n";
        _WhereClause += "       Code LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        _WhereClause += "       OR CustomerName LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        _WhereClause += "    )";
    }
    return _WhereClause;
}
function WH_Contract_ClearAllControls() {
    debugger;
    $("#tblWH_ContractDetails tbody").html("");
    //$("#lblWH_ContractMaxWeight").html("<span> : </span><span>" + 0 + "</span>");
    //$("#lblWH_ContractMaxVolume").html("<span> : </span><span>" + 0 + "</span>");
    ClearAll("#WH_ContractModal");
    AddService();
    $("#slStorageUnit").val(constAreaUnitTypeIDForM2);
    $("#addWH_ContractService").addClass("hide");
    $(".classDisableForFinalized").removeAttr("disabled");
    
    $("#btnSave").attr("onclick", "WH_Contract_Save(false);");
    $("#btnSaveAndAddNew").attr("onclick", "WH_Contract_Save(true);");
    $("#cb-CheckAll").prop('checked', false);
    $("#btnSave,#btnSaveAndAddNew").removeClass('hide');
}
function WH_Contract_FillAllControls(pID) {
    debugger;
    FadePageCover(true);
    //$("#txtNumberOfLevelsPerWH_Contract").attr("disabled", "disabled");
    //$("#txtNumberOfTraysPerLevel").attr("disabled", "disabled");
    ClearAll("#WH_ContractModal");
    $("#tblWH_ContractDetails tbody").html("");
    $('#tblServices tbody').html('');
    $("#addWH_ContractService").removeClass("hide");

    jQuery("#WH_ContractModal").modal("show");
    var pParametersWithValues = {
        pHeaderID: pID
    };
    CallGETFunctionWithParameters("/api/WH_Contract/LoadHeaderWithDetails", pParametersWithValues
        , function (pData) {
            var pWH_ContractHeader = JSON.parse(pData[0]);
            var pWH_ContractDetails = JSON.parse(pData[1]);
            var pWH_ContractServiecs = JSON.parse(pData[2]);
            if (pWH_ContractHeader.Status.toUpperCase() == "FINALIZED")
                $(".classDisableForFinalized").attr("disabled", "disabled");
            else
                $(".classDisableForFinalized").removeAttr("disabled");
            $("#hID").val(pID);
            $("#lblShown").html(": " + pWH_ContractHeader.Code);
            $("#txtCode").val(pWH_ContractHeader.Code);
            $("#txtStatus").val(pWH_ContractHeader.Status);
            $("#slCustomer").val(pWH_ContractHeader.CustomerID == 0 ? "" : pWH_ContractHeader.CustomerID);
            $("#txtFromDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pWH_ContractHeader.FromDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pWH_ContractHeader.FromDate)));
            $("#txtToDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pWH_ContractHeader.ToDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pWH_ContractHeader.ToDate)));
            $("#slStorageUnit").val(pWH_ContractHeader.StorageUnitID == 0 ? "" : pWH_ContractHeader.StorageUnitID);
            $("#txtNotes").val(pWH_ContractHeader.Notes == 0 ? "" : pWH_ContractHeader.Notes);
            WH_ContractDetails_BindTableRows(pWH_ContractDetails);
            $("#btnSave").attr("onclick", "WH_Contract_Save(false);");
            $("#btnSaveAndAddNew").attr("onclick", "WH_Contract_Save(true);");
            $.each(pWH_ContractServiecs, function (i, item) {
                AddService();
                $('#tblServices tbody tr:eq(' + i + ')').find('td.ID input').val(item.ID);
                $('#tblServices tbody tr:eq(' + i + ')').find('td.ServiceID select').val(item.ServiceId).change();
                $('#tblServices tbody tr:eq(' + i + ')').find('td.Selling input').val(item.Selling);
            });
            FadePageCover(false);
            if (pWH_ContractHeader.Approved) {
                $("#btnSave,#btnSaveAndAddNew").addClass('hide');
            }
            else {
                $("#btnSave,#btnSaveAndAddNew").removeClass('hide');
            }
        }
        , null);
}
//pReleaseDate: ($("#txtOperationReleaseDate").val().trim() == "" ? "0" : PadDateWithZeroes($("#txtOperationReleaseDate").val().trim())),
function WH_Contract_Save(pSaveAndNew) {
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

    else if (ValidateForm("form", "WH_ContractModal")) {
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
            , CustomerID: $("#slCustomer").val() == "" ? "0" : $("#slCustomer").val()
            , FromDate: ($("#txtFromDate").val().trim() == "" ? "0" : PadDateWithZeroes($("#txtFromDate").val().trim()))
            , ToDate: ($("#txtToDate").val().trim() == "" ? "0" : PadDateWithZeroes($("#txtToDate").val().trim()))
            , StorageUnitID: $("#slStorageUnit").val() == "" ? "0" : $("#slStorageUnit").val()
            , Notes: $("#txtNotes").val().trim() == "" ? "0" : $("#txtNotes").val().trim().toUpperCase()
            , WH_ContractServices : services
        };
        CallPOSTFunctionWithParameters("/api/WH_Contract/Save", pParametersWithValues
            , function (pData) {
                if (pData[0] == "") {
                    var pWH_ContractHeader = JSON.parse(pData[2]);
                    //var pWH_ContractDetails = JSON.parse(pData[3]);
                    WH_Contract_LoadingWithPaging();
                    if (pSaveAndNew) {
                        WH_Contract_ClearAllControls();
                    }
                    else {
                        $("#hID").val(pData[1]);
                        $("#txtCode").val(pWH_ContractHeader.Code);
                        $("#txtStatus").val(pWH_ContractHeader.Status);
                        //WH_ContractDetails_BindTableRows(pWH_ContractDetails);
                        $("#btnSave").attr("onclick", "WH_Contract_Save(false);");
                        $("#btnSaveAndAddNew").attr("onclick", "WH_Contract_Save(true);");
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
    else //if (ValidateForm("form", "WH_ContractModal"))
        FadePageCover(false);
}
function WH_Contract_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblWH_Contract') != "")
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
            DeleteListFunction("/api/WH_Contract/Delete", { "pWH_ContractIDs": GetAllSelectedIDsAsString('tblWH_Contract') }, function () { WH_Contract_LoadingWithPaging(); });
        });
    //DeleteListFunction("/api/WH_Contract/Delete", { "pWH_ContractIDs": GetAllSelectedIDsAsString('tblWH_Contract') }, function () { WH_Contract_LoadingWithPaging(); });
}


function WH_Contract_Finalize() {
    debugger;
    if ($("#hID").val() == "")
        swal("Sorry", "Please save the WH_Contract first.");
    else {
        swal({
            title: "Are you sure?",
            text: "This WH_Contract will be finalized!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, finalize!",
            closeOnConfirm: true
        },
        //callback function in case of confirm
        function () {
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/WH_Contract/Finalize"
            , { pFinalizedWH_ContractID: $("#hID").val() }
            , function (pData) {
                if (pData[0] == "") {
                    swal("Success", "Finalized successfully.");
                    $(".classDisableForFinalized").attr("disabled", "disabled");
                    $("#txtStatus").val("FINALIZED");
                    $("#tblWH_Contract tr[ID=" + $("#hID").val() + "] td.Status").text("FINALIZED");
                    WH_Contract_LoadingWithPaging();
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
/***************************************WH_ContractDetails***************************************/
function WH_ContractDetails_BindTableRows(pWH_ContractDetails) {
    ClearAllTableRows("tblWH_ContractDetails");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pWH_ContractDetails, function (i, item) {
        AppendRowtoTable("tblWH_ContractDetails",
        ("<tr ID='" + item.ID + "' " + (1 == 1 ? ("ondblclick='WH_ContractDetails_FillControls(" + item.ID + ");'") : "") + ">"
            + "<td class='ID'> <input " + (1 == 1 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "'></td>"
            + "<td class='WH_ContractID hide'>" + item.WH_ContractID + "</td>"
            + "<td class='ChargeTypeID hide'>" + (item.ChargeTypeID == 0 ? "" : item.ChargeTypeID) + "</td>"
            + "<td class='ChargeTypeName'>" + (item.ChargeTypeName == 0 ? "" : item.ChargeTypeName) + (pDefaults.IsRepeatChargeTypeName ? ("(" + item.ChargeTypeCode + ")") : "") + "</td>"
            + "<td class='PackageTypeID hide'>" + (item.PackageTypeID == 0 ? "" : item.PackageTypeID) + "</td>"
            + "<td class='PackageTypeCode'>" + (item.PackageTypeCode == 0 ? "" : item.PackageTypeCode) + "</td>"
            + "<td class='TypeID hide'>" + (item.TypeID == 0 ? "" : item.TypeID) + "</td>"
            + "<td class='TypeName'>" + (item.TypeName == 0 ? "" : item.TypeName) + "</td>"
            + "<td class='PalletClassID hide'>" + (item.PalletClassID == 0 ? "" : item.PalletClassID) + "</td>"
            + "<td class='PalletClassName'>" + (item.PalletClassName == 0 ? "" : item.PalletClassName) + "</td>"
            + "<td class='PaymentTermID hide'>" + (item.PaymentTermID == 0 ? "" : item.PaymentTermID) + "</td>"
            + "<td class='PaymentTermName'>" + (item.PaymentTermName == 0 ? "" : item.PaymentTermName) + "</td>"
            + "<td class='Quantity'>" + item.Quantity + "</td>"
            + "<td class='Cost'>" + item.Cost + "</td>"
            + "<td class='hide'><a href='#WH_ContractDetailsModal' data-toggle='modal' onclick='WH_ContractDetails_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
        + "</tr>"));
    });
    ////ApplyPermissions();
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    BindAllCheckboxonTable("tblWH_ContractDetails", "ID", "cb-CheckAll-WH_ContractDetails");
    CheckAllCheckbox("HeaderDeleteWH_ContractDetailsID");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function WH_ContractDetails_ClearAllControls() {
    debugger;
    if ($("#hID").val() == "")
        swal("Sorry", "Please, save header first.");
    else {
        ClearAll("#WH_ContractDetailsModal");
        $("#btnSaveWH_ContractDetails").attr("onclick", "WH_ContractDetails_Save(false);");
        $("#btnSaveAndAddNewWH_ContractDetails").attr("onclick", "WH_ContractDetails_Save(true);");
        jQuery("#WH_ContractDetailsModal").modal("show");
    }
}
function WH_ContractDetails_FillControls(pID) {
    debugger;
    ClearAll("#WH_ContractDetailsModal");
    $("#hWH_ContractDetailsID").val(pID);
    var tr = $("#tblWH_ContractDetails tr[ID='" + pID + "']");

    $("#slWH_ContractDetailsChargeType").val($(tr).find("td.ChargeTypeID").text());
    $("#slWH_ContractDetailsPackageType").val($(tr).find("td.PackageTypeID").text());
    $("#slWH_ContractDetailsPalletClass").val($(tr).find("td.PalletClassID").text());
    $("#slWH_ContractDetailsPaymentTerm").val($(tr).find("td.PaymentTermID").text());
    $("#slWH_ContractDetailsTransType").val($(tr).find("td.TypeID").text());
    $("#txtWH_ContractDetailsQuantity").val($(tr).find("td.Quantity").text());
    $("#txtWH_ContractDetailsCost").val($(tr).find("td.Cost").text());

    jQuery("#WH_ContractDetailsModal").modal("show");
}
function WH_ContractDetails_Save(pSaveAndNew) {
    debugger;
    FadePageCover(true);
    if (ValidateForm("form", "WH_ContractDetailsModal")) {
        var pParametersWithValues = {
              pContractDetailsID: $("#hWH_ContractDetailsID").val() == "" ? 0 : $("#hWH_ContractDetailsID").val()
            , pContractID: $("#hID").val()
            , pChargeTypeID: $("#slWH_ContractDetailsChargeType").val() == "" ? 0 : $("#slWH_ContractDetailsChargeType").val()
            , pPackageTypeID: $("#slWH_ContractDetailsPackageType").val() == "" ? 0 : $("#slWH_ContractDetailsPackageType").val()
            , pTypeID: $("#slWH_ContractDetailsTransType").val() == "" ? 0 : $("#slWH_ContractDetailsTransType").val()
            , pPalletClassID: $("#slWH_ContractDetailsPalletClass").val() == "" ? 0 : $("#slWH_ContractDetailsPalletClass").val()
            , pPaymentTermID: $("#slWH_ContractDetailsPaymentTerm").val() == "" ? 0 : $("#slWH_ContractDetailsPaymentTerm").val()
            , pQuantity: $("#txtWH_ContractDetailsQuantity").val() == "" ? 0 : $("#txtWH_ContractDetailsQuantity").val()
            , pCost: $("#txtWH_ContractDetailsCost").val() == "" ? 0 : $("#txtWH_ContractDetailsCost").val()
        };
        CallGETFunctionWithParameters("/api/WH_Contract/ContractDetails_Save", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    WH_ContractDetails_BindTableRows(JSON.parse(pData[1]));
                    if (pSaveAndNew)
                        ClearAll("#WH_ContractDetailsModal");
                    else
                        jQuery("#WH_ContractDetailsModal").modal("hide");
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
function WH_ContractDetails_DeleteList() {
    debugger;
    //Confirmation message to delete
    var pWH_ContractDetailsIDsToDelete = GetAllSelectedIDsAsString('tblWH_ContractDetails');
    if (pWH_ContractDetailsIDsToDelete != "")
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
            CallGETFunctionWithParameters("/api/WH_Contract/ContractDetails_Delete"
                , { pWH_ContractDetailsIDsToDelete: pWH_ContractDetailsIDsToDelete, pWH_ContractID: $("#hID").val() }
                , function (pData) {
                    if (pData[0]) {
                        WH_ContractDetails_BindTableRows(JSON.parse(pData[1]));
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
