var _hasRequest = false;
var _controllerReceive = '';
function ReceiveUnfinalize_Initialize() {
    if (["EF", "FPL"].includes(pDefaults.UnEditableCompanyName)) {
        _hasRequest = true;
        _controllerReceive = 'WH_Inbound';
    }
    else {
        _hasRequest = false;
        _controllerReceive = 'Receive';
    }
    debugger;
    $("#txtSearchFrom").val(getTodaysDateInddMMyyyyFormat());
    $("#txtSearchTo").val(getTodaysDateInddMMyyyyFormat());
    strBindTableRowsFunctionName = "ReceiveUnfinalize_BindTableRows";
    strLoadWithPagingFunctionName = "/api/" + _controllerReceive +"/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = _hasRequest ? " WHERE StatusID=" + constReceiveStatusFinalized + " or ID in (select distinct ReceiveID from WH_ReceiveDetails where RD_IsFinalized=1)" : " WHERE IsFinalized = 1";
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/Warehousing/Finalize/ReceiveUnfinalize", "div-content"
        , function () {
            debugger;
            if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
            LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
                , function (pData) {
                    debugger;
                    ReceiveUnfinalize_BindTableRows(JSON.parse(pData[0]));
                });
        });
}

function ReceiveUnfinalize_BindTableRows(pRows) {
    debugger;
    ClearAllTableRows("tblReceiveUnfinalize");
    $.each(pRows, function (i, item) {
        AppendRowtoTable("tblReceiveUnfinalize",
            //("<tr ID='" + item.ID + "' ondblclick='Voucher_FillControls(" + item.ID + ");'>"
            ("<tr ID='" + item.ID + "'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Code'>" + (item.Code == 0 ? "" : item.Code) + "</td>"
                + "<td class='Customer'>" + (item.CustomerName == 0 ? "" : item.CustomerName) + "</td>"
                + "<td class='ReceiveDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReceiveDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ReceiveDate))) + "</td>"
            )
        )
    });

}

function ReceiveUnfinalize_LoadingWithPaging() {
    debugger;
    var pWhereClause = ReceiveUnfinalize_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
        , function (pData) {
            ReceiveUnfinalize_BindTableRows(JSON.parse(pData[0]));
        });
}

function ReceiveUnfinalize_GetWhereClause() {
    debugger;
    var pWhereClause = (_hasRequest ? " WHERE StatusID=" + constReceiveStatusFinalized + " or ID in (select distinct ReceiveID from WH_ReceiveDetails where RD_IsFinalized=1)" : " WHERE IsFinalized = 1") +" \n";

    if ($("#txtSearchCode").val().trim() != "")
        pWhereClause += " AND Code LIKE N'%" + $("#txtSearchCode").val().trim() + "%'" + "\n";
    if ($("#txtSearchFrom").val().trim() != "" && $("#txtSearchTo").val().trim() != "")
        pWhereClause += " AND ReceiveDate BETWEEN '" + GetDateWithFormatyyyyMMdd($("#txtSearchFrom").val()) + "' AND '" + GetDateWithFormatyyyyMMdd($("#txtSearchTo").val()) + "'\n";
    return pWhereClause;
}

function UnFinalize() {
    debugger;
    var pSelectedIDs = GetAllSelectedIDsAsString('tblReceiveUnfinalize', 'Delete');
    if (pSelectedIDs != "") {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/Warehousing/Finalize/FinalizeOrUnfinalize"
            , {
                pSelector: 1
                ,pSelectedIDs: pSelectedIDs
                , pValue: 0
                , pHasRequest: _hasRequest
            }
            , function (pResult) {
                debugger;
                FadePageCover(false);
                if (pResult.Exception) {
                    swal("Error", pResult.Exception.Message);
                }
                else {
                    if ($("[id$='hf_ChangeLanguage']").val() == "en") swal("Success", "Saved successfully.");
                    else if ($("[id$='hf_ChangeLanguage']").val() == "ar") swal("نجاح", "تم الحفظ بنجاح.");
                    ReceiveUnfinalize_LoadingWithPaging();
                }
            });
    }
}