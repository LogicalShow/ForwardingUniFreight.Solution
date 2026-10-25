function AgingAdjustment_Initialize() {
    debugger;
    $("#hl-menu-Warehousing").parent().siblings().removeClass("active");
    strBindTableRowsFunctionName = "AgingAdjustment_BindTableRows";
    strLoadWithPagingFunctionName = "/api/AgingAdjustment/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = " WHERE 1=1 ";
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/Warehousing/Transactions/AgingAdjustment", "div-content", function () {
        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
            , function (pData) {
                AgingAdjustment_BindTableRows(JSON.parse(pData[0]));
            });
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    },
        function () { AgingAdjustment_ClearAllControls(); },
        function () { AgingAdjustment_DeleteList(); });
}
function AgingAdjustment_BindTableRows(pTableRows) {
    debugger;
    $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblAgingAdjustment");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pTableRows, function (i, item) {
        AppendRowtoTable("tblAgingAdjustment",
        ("<tr ID='" + item.ID + "' ondblclick='AgingAdjustment_FillAllControls(" + item.ID + ");' class='" /*+ (item.IsExcluded ? "text-primary" : "")*/ + "'>"
            + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='ChassisNumber'>" + item.ChassisNumber + "</td>"
            + "<td class='ReceiveDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReceiveDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ReceiveDate))) + "</td>"
            + "<td class='PickupRequiredDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.PickupRequiredDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.PickupRequiredDate))) + "</td>"
            + "<td class='PreviousCutOffDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.PreviousCutOffDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.PreviousCutOffDate))) + "</td>"
            + "<td class='PickupWithoutInvoiceDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.PickupWithoutInvoiceDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.PickupWithoutInvoiceDate))) + "</td>"

            //+ "<td class='WarehouseID hide'>" + item.WarehouseID + "</td>"
            //+ "<td class='CustomerID hide'>" + item.CustomerID + "</td>"
            //+ "<td class='CustomerName'>" + item.CustomerName + "</td>"
            + "<td class='IsExcluded'> <input type='checkbox' id='cbIsExcluded" + item.ID + "' disabled='disabled' " + (item.IsExcluded ? " checked='checked' " : "") + " /></td>"
            + "<td class='IsAddExtraDayForFirstCutOff hide'> <input type='checkbox' id='cbIsAddExtraDayForFirstCutOff" + item.ID + "' disabled='disabled' " + (item.IsAddExtraDayForFirstCutOff ? " checked='checked' " : "") + " /></td>"
            + "<td class='hide'><a href='#AgingAdjustmentModal' data-toggle='modal' onclick='AgingAdjustment_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblAgingAdjustment", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblAgingAdjustment>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function AgingAdjustment_LoadingWithPaging() {
    debugger;
    var pWhereClause = AgingAdjustment_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { AgingAdjustment_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblAgingAdjustment>tbody>tr", $("#txt-Search").val().trim());
}
function AgingAdjustment_GetWhereClause() {
    var _WhereClause = "WHERE 1=1" + "\n";
    if ($("#txt-Search").val().trim() != "") {
        _WhereClause += "AND (" + "\n";
        _WhereClause += "       ChassisNumber = N'" + $("#txt-Search").val().trim() + "'" + "\n";
        //_WhereClause += "       OR CustomerName LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        _WhereClause += "    )";
    }
    return _WhereClause;
}
function AgingAdjustment_ClearAllControls() {
    debugger;
    ClearAll("#AgingAdjustmentModal");

    $("#btnSave").attr("onclick", "AgingAdjustment_Save(false);");
    $("#btnSaveAndAddNew").attr("onclick", "AgingAdjustment_Save(true);");
    $("#cb-CheckAll").prop('checked', false);
}
function AgingAdjustment_FillAllControls(pID) {
    debugger;
    FadePageCover(true);
    ClearAll("#AgingAdjustmentModal");
    jQuery("#AgingAdjustmentModal").modal("show");
    var pWhereClause = "WHERE ID=" + pID;
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID DESC";
    var pParametersWithValues = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    CallGETFunctionWithParameters("/api/AgingAdjustment/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned", pParametersWithValues
        , function (pData) {
            var pAgingRow = JSON.parse(pData[0])[0];

            $("#hID").val(pID);
            $("#lblShown").html(": " + pAgingRow.ChassisNumber);
            $("#txtChassisNumber").val(pAgingRow.ChassisNumber);
            //$("#slWarehouse").val(pAgingRow.WarehouseID == 0 ? "" : pAgingRow.WarehouseID);
            $("#txtReceiveDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pAgingRow.ReceiveDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pAgingRow.ReceiveDate)));
            $("#txtPickupRequiredDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pAgingRow.PickupRequiredDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pAgingRow.PickupRequiredDate)));
            $("#txtPreviousCutOffDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pAgingRow.PreviousCutOffDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pAgingRow.PreviousCutOffDate)));
            $("#txtPickupWithoutInvoiceDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pAgingRow.PickupWithoutInvoiceDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pAgingRow.PickupWithoutInvoiceDate)));
            $("#cbIsExcluded").prop("checked", pAgingRow.IsExcluded);
            $("#cbIsAddExtraDayForFirstCutOff").prop("checked", pAgingRow.IsAddExtraDayForFirstCutOff);

            $("#btnSave").attr("onclick", "AgingAdjustment_Save(false);");
            $("#btnSaveAndAddNew").attr("onclick", "AgingAdjustment_Save(true);");
            FadePageCover(false);
        }
        , null);
}
//pReleaseDate: ($("#txtOperationReleaseDate").val().trim() == "" ? "0" : PadDateWithZeroes($("#txtOperationReleaseDate").val().trim())),
function AgingAdjustment_Save(pSaveAndNew) {
    debugger;
    //if (!isValidDate($("#txtFromDate").val().trim(), 1) || !isValidDate($("#txtToDate").val().trim(), 1)) {
    //    swal(strSorry, "Please, Enter Start-End dates.");
    //    FadePageCover(false);
    //}
    //if ($("#txtFromDate").val().trim() != "" && $("#txtToDate").val().trim() != ""
    //    && Date.prototype.compareDates(ConvertDateFormat($("#txtFromDate").val().trim()), ConvertDateFormat($("#txtToDate").val().trim())) < 0) {
    //    FadePageCover(false);
    //    swal("Sorry", "Please, check dates.");
    //}
    //else 
    if (ValidateForm("form", "AgingAdjustmentModal")) {
        FadePageCover(true);
        pParametersWithValues = {
            pID: $("#hID").val() == "" ? 0 : $("#hID").val()
            , pIsExcluded: $("#cbIsExcluded").prop("checked")
            , pIsAddExtraDayForFirstCutOff: $("#cbIsAddExtraDayForFirstCutOff").prop("checked")
            //, pWarehouseID: $("#slWarehouse").val() == "" ? "0" : $("#slWarehouse").val()
            , pReceiveDate: ($("#txtReceiveDate").val().trim() == "" ? "0" : PadDateWithZeroes($("#txtReceiveDate").val().trim()))
            , pPickupRequiredDate: ($("#txtPickupRequiredDate").val().trim() == "" ? "0" : PadDateWithZeroes($("#txtPickupRequiredDate").val().trim()))
            , pPreviousCutOffDate: ($("#txtPreviousCutOffDate").val().trim() == "" ? "0" : PadDateWithZeroes($("#txtPreviousCutOffDate").val().trim()))
            , pPickupWithoutInvoiceDate: ($("#txtPickupWithoutInvoiceDate").val().trim() == "" ? "0" : PadDateWithZeroes($("#txtPickupWithoutInvoiceDate").val().trim()))

        };
        CallGETFunctionWithParameters("/api/AgingAdjustment/Save", pParametersWithValues
            , function (pData) {
                let pReturnedMessage = pData[0];
                if (pReturnedMessage == "") {
                    swal("Success", "Saved successfully.");
                    jQuery("#AgingAdjustmentModal").modal("hide");
                    AgingAdjustment_LoadingWithPaging();
                }
                else {
                    swal("Sorry", pData[0]);
                    FadePageCover(false);
                }
            }
            , null);
    }
}
function AgingAdjustment_DeleteList() {
    debugger;
    ////Confirmation message to delete
    //if (GetAllSelectedIDsAsString('tblAgingAdjustment') != "")
    //    swal({
    //        title: "Are you sure?",
    //        text: "The selected records will be deleted permanently!",
    //        type: "warning",
    //        showCancelButton: true,
    //        confirmButtonColor: "#DD6B55",
    //        confirmButtonText: "Yes, delete!",
    //        closeOnConfirm: true
    //    },
    //    //callback function in case of confirm delete
    //    function () {
    //        DeleteListFunction("/api/AgingAdjustment/Delete", { "pWH_ReportAgingIDs": GetAllSelectedIDsAsString('tblAgingAdjustment') }, function () { AgingAdjustment_LoadingWithPaging(); });
    //    });
    ////DeleteListFunction("/api/AgingAdjustment/Delete", { "pWH_ReportAgingIDs": GetAllSelectedIDsAsString('tblAgingAdjustment') }, function () { AgingAdjustment_LoadingWithPaging(); });
}
