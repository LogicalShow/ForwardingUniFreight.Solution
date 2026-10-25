var _hasRequest = false;
var _controllerPickup = '';
function PickupFinalize_Initialize() {
    debugger;
    if (["EF", "FPL"].includes(pDefaults.UnEditableCompanyName)) {
        _hasRequest = true;
        _controllerPickup = 'WH_Outbound';
    }
    else {
        _hasRequest = false;
        _controllerPickup = 'Pickup';
    }
    $("#txtSearchFrom").val(getTodaysDateInddMMyyyyFormat());
    $("#txtSearchTo").val(getTodaysDateInddMMyyyyFormat());
    strBindTableRowsFunctionName = "PickupFinalize_BindTableRows";
    strLoadWithPagingFunctionName = "/api/" + _controllerPickup+"/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = _hasRequest ? "WHERE StatusID=" + constPickupStatusLoaded + "" : " WHERE IsFinalized = 0";
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/Warehousing/Finalize/PickupFinalize", "div-content"
        , function () {
            debugger;
            if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
            LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
                , function (pData) {
                    debugger;
                    PickupFinalize_BindTableRows(JSON.parse(pData[0]));
                });
        });
}

function PickupFinalize_BindTableRows(pRows) {
    debugger;
    ClearAllTableRows("tblPickupFinalize");
    $.each(pRows, function (i, item) {
        AppendRowtoTable("tblPickupFinalize",
            //("<tr ID='" + item.ID + "' ondblclick='Voucher_FillControls(" + item.ID + ");'>"
            ("<tr ID='" + item.ID + "'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Code'>" + (item.Code == 0 ? "" : item.Code) + "</td>"
                + "<td class='Customer'>" + (item.CustomerName == 0 ? "" : item.CustomerName) + "</td>"
                + "<td class='OrderDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.OrderDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.OrderDate))) + "</td>"
            )
        )
    });
    BindAllCheckboxonTable("tblPickupFinalize", "ID");
    CheckAllCheckbox("ID");
}

function PickupFinalize_LoadingWithPaging() {
    debugger;
    var pWhereClause = PickupFinalize_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
        , function (pData) {
            PickupFinalize_BindTableRows(JSON.parse(pData[0]));
        });
}

function PickupFinalize_GetWhereClause() {
    debugger;
    var pWhereClause = (_hasRequest ? "WHERE StatusID=" + constPickupStatusLoaded + "" : " WHERE IsFinalized = 0") + " \n";
    if ($("#txtSearchCode").val().trim() != "")
        pWhereClause += " AND Code LIKE N'%" + $("#txtSearchCode").val().trim() + "%'" + "\n";
    if ($("#txtSearchFrom").val().trim() != "" && $("#txtSearchTo").val().trim() != "")
        pWhereClause += " AND OrderDate BETWEEN '" + GetDateWithFormatyyyyMMdd($("#txtSearchFrom").val()) + "' AND '" + GetDateWithFormatyyyyMMdd($("#txtSearchTo").val()) + "'\n";
    return pWhereClause;
}

function Finalize() {
    debugger;
    var pSelectedIDs = GetAllSelectedIDsAsString('tblPickupFinalize', 'Delete');
    if (pSelectedIDs != "") {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/Warehousing/Finalize/FinalizeOrUnfinalize"
            , {
                pSelector: 2
                ,pSelectedIDs: pSelectedIDs
                , pValue: 1
                , pHasRequest: _hasRequest
            }
            , function (pResult) {
                FadePageCover(false);
                if (pResult.Exception) {
                    swal("Error", pResult.Exception.Message);
                }
                else {
                    if ($("[id$='hf_ChangeLanguage']").val() == "en") swal("Success", "Saved successfully.");
                    else if ($("[id$='hf_ChangeLanguage']").val() == "ar") swal("نجاح", "تم الحفظ بنجاح.");
                    PickupFinalize_LoadingWithPaging();
                }
            });
    }
}