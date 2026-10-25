var _hasRequest = false;
var _controllerReceive = '';
function ReceiveFinalize_Initialize() {
    debugger;
    if (["EF", "FPL"].includes(pDefaults.UnEditableCompanyName)) {
        _hasRequest = true;
        _controllerReceive = 'WH_Inbound';
    }
    else {
        _hasRequest = false;
        _controllerReceive = 'Receive';
    }
    $("#txtSearchFrom").val(getTodaysDateInddMMyyyyFormat());
    $("#txtSearchTo").val(getTodaysDateInddMMyyyyFormat());
    strBindTableRowsFunctionName = "ReceiveFinalize_BindTableRows";
    strLoadWithPagingFunctionName = "/api/" + _controllerReceive+"/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = _hasRequest ? "WHERE StatusID=" + constReceiveStatusPutaway + "" : " WHERE IsFinalized = 0";
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/Warehousing/Finalize/ReceiveFinalize", "div-content"
        , function () {
            debugger;
            if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
            LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
                , function (pData) {
                    debugger;
                    ReceiveFinalize_BindTableRows(JSON.parse(pData[0]));
                });
        });
}

function ReceiveFinalize_BindTableRows(pRows) {
    debugger;
    ClearAllTableRows("tblReceiveFinalize");
    $.each(pRows, function (i, item) {
        AppendRowtoTable("tblReceiveFinalize",
            //("<tr ID='" + item.ID + "' ondblclick='Voucher_FillControls(" + item.ID + ");'>"
            ("<tr ID='" + item.ID + "'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Code'>" + (item.Code == 0 ? "" : item.Code) + "</td>"
                + "<td class='Customer'>" + (item.CustomerName == 0 ? "" : item.CustomerName) + "</td>"
                + "<td class='ReceiveDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReceiveDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ReceiveDate))) + "</td>"
            )
        )
    });
    BindAllCheckboxonTable("tblReceiveFinalize", "ID");
    CheckAllCheckbox("ID");
}

function ReceiveFinalize_LoadingWithPaging() {
    debugger;
    var pWhereClause = ReceiveFinalize_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
        , function (pData) {
            ReceiveFinalize_BindTableRows(JSON.parse(pData[0]));
        });
}

function ReceiveFinalize_GetWhereClause() {
    debugger;
    var pWhereClause = (_hasRequest ? "WHERE StatusID=" + constReceiveStatusPutaway + "" : " WHERE IsFinalized = 0") +" \n";

    if ($("#txtSearchCode").val().trim() != "")
        pWhereClause += " AND Code LIKE N'%" + $("#txtSearchCode").val().trim() + "%'" + "\n";
    if ($("#txtSearchFrom").val().trim() != "" && $("#txtSearchTo").val().trim() != "")
        pWhereClause += " AND ReceiveDate BETWEEN '" + GetDateWithFormatyyyyMMdd($("#txtSearchFrom").val()) + "' AND '" + GetDateWithFormatyyyyMMdd($("#txtSearchTo").val()) + "'\n";
    return pWhereClause;
}

function Finalize() {
    debugger;
    $('#btn-Finalize').prop('disabled', true);
    var pSelectedIDs = GetAllSelectedIDsAsString('tblReceiveFinalize', 'Delete');
    if (pSelectedIDs != "") {

        if (_hasRequest) {
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/" + _controllerReceive+"/HasMissingQty"
                , {
                    pWhereClause: `where ReceiveID in (${pSelectedIDs}) and ExpectedQuantity>ISNULL(Quantity,0)`
                }
                , function (pResult) {
                    FadePageCover(false);
                    if (pResult) {
                        swal({
                            title: "Orders Has Missing Quantities!",
                            text: "Do You Want To Generate Orders By Missings?",
                            type: "warning",
                            showCancelButton: true,
                            cancelButtonText: "No, Skip",
                            confirmButtonColor: "#6BDD55",
                            confirmButtonText: "Yes, Generate!",
                            closeOnConfirm: true
                        },
                            //callback function in case of confirm delete
                            function (pGenerate) {
                                ConfirmFinalize(pSelectedIDs, pGenerate);
                            });
                    }
                    else {
                        ConfirmFinalize(pSelectedIDs, false);
                    }
                });
        }
        else {
            ConfirmFinalize(pSelectedIDs, false);
        }
    

    }
    else
        $('#btn-Finalize').prop('disabled', false);
}

function ConfirmFinalize(pIDs, pGenerateMissing) {
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/Warehousing/Finalize/FinalizeOrUnfinalize"
        , {
            pSelector: 1
            , pSelectedIDs: pIDs
            , pValue: 1
            , pHasRequest: _hasRequest
            , pGenerateMissing: pGenerateMissing
        }
        , function (pResult) {
            FadePageCover(false);
            if (pResult.Exception) {
                swal("Error", pResult.Exception.Message);
            }
            else {
                if ($("[id$='hf_ChangeLanguage']").val() == "en") swal("Success", "Saved successfully.");
                else if ($("[id$='hf_ChangeLanguage']").val() == "ar") swal("نجاح", "تم الحفظ بنجاح.");
                ClearAllTableRows("tblReceiveFinalize");
                ReceiveFinalize_LoadingWithPaging();
            }
            $('#btn-Finalize').prop('disabled', false);
        });
}