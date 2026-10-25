function CombinedIssueVoucher_Initialize() {
    debugger;
    
    $("#hl-menu-Warehousing").parent().siblings().removeClass("active");
    strBindTableRowsFunctionName = "CombinedIssueVoucher_BindTableRows";
    strLoadWithPagingFunctionName = "/api/CombinedIssueVoucher/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = " WHERE SafeID = " + $("#slSafe").val();
    var pOrderBy = " ID DESC";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/ReceiptsAndPayments/Transactions/CombinedIssueVoucher", "div-content", function () {
        if (glbCallingControl == "CombinedIssueVoucher") {
            $("#liGroupName").text("Cash Manag");
            $("#liGroupName").attr("onclick", "LoadViews('ReceiptsAndPaymentsTransactions')");
            $("#liTabName").text("Transactions");
            $("#liTabName").attr("onclick", "LoadViews('ReceiptsAndPaymentsTransactions')");
            $("#txtFromDate").val(getTodaysDateInddMMyyyyFormat());
            $("#txtToDate").val(getTodaysDateInddMMyyyyFormat());
            
        }
        if (IsMESCOCompany) {
            $("#txt-Search").attr("placeholder", "Search by PO Number");
            $(".classShowForMESCO").removeClass("hide");
            $(".classHideForMESCO").addClass("hide");
        }
        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
            , function (pData) {
                CombinedIssueVoucher_BindTableRows(JSON.parse(pData[0]));
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slSafe", pData[2], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slBank", pData[3], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slSearchCustody", pData[4], null);
                FillListFromObject(null, 2, "All PartnerTypes", "slPartnerType", pData[5], null);
                $("#slSearchCustody").css({ "width": "100%" }).select2();
                $("#slClient").html("<option value=''><--All--></option>");
                //ApplySelectListSearch();
            });
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
        , function () { CombinedIssueVoucher_ClearAllControls(); }
        , function () { CombinedIssueVoucher_DeleteList(); });
}
function CombinedIssueVoucher_BindTableRows(pCombinedIssueVoucher) {
    debugger;
    $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblCombinedIssueVoucher");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    SubmitControlsText = " class='btn btn-xs btn-rounded btn-primary float-right m-r-md' > <i class='fa fa-check' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Submit") + "</span>";
    RejectControlsText = " class='btn btn-xs btn-rounded btn-danger float-right m-r-md' > <i class='fa fa-trash' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Reject") + "</span>";
    PrintControlsText = " class='btn btn-xs btn-rounded btn-info float-right m-r-md' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";

    $.each(pCombinedIssueVoucher, function (i, item) {
        AppendRowtoTable("tblCombinedIssueVoucher",
            ("<tr ID='" + item.ID + "' ondblclick='CombinedIssueVoucher_EditByDblClick(" + item.ID + ");'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Code" + (IsMESCOCompany ? " hide'>" : "'>") + (item.Code == 0 ? "" : item.Code) + "</td>"
                + "<td class='PONumber'>" + (item.PONumber == 0 ? "" : item.PONumber) + "</td>"
                + "<td class='Amount'>" + (item.Amount == 0 ? "" : item.Amount) + "</td>"
                + "<td class='RequestDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.RequestDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.RequestDate)) : "") + "</td>"
                + "<td class='ApprovedOn'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ApprovedOn)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.ApprovedOn)) : "") + "</td>"
                + "<td class='IsCombined'> <input type='checkbox' disabled='disabled' val='" + (item.IsCombined == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='IsFleet'> <input type='checkbox' disabled='disabled' val='" + (item.IsFleet == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='ChargedPerson'>" + (item.ChargedPerson == 0 ? "" : item.ChargedPerson) + "</td>"
                + "<td class='Custody " + (IsMESCOCompany ? "" : "hide") + "'>" + (item.CustodyName == 0 ? "" : item.CustodyName) + "</td>"
                + "<td class='PartnerName " + (IsMESCOCompany ? "" : "hide") + "'>" + (item.PartnerName == 0 ? "" : item.PartnerName) + "</td>"

                + "<td>"
                + "<a onclick='Print(" + item.ID + "," + (item.IsCombined == true ? "true" : "false") + "," + (item.IsFleet == true ? "true" : "false") + ");' " + PrintControlsText + "</a>"
                + "<a onclick='Reject(" + item.ID + "," + (item.IsCombined == true ? "true" : "false") + "," + (item.IsFleet == true ? "true" : "false") + ");' " + RejectControlsText + "</a>"
                + "<a onclick='Submit(" + item.ID + "," + (item.IsCombined == true ? "true" : "false") + "," + (item.IsFleet == true ? "true" : "false") + ");' " + SubmitControlsText + "</a>"
                + "</td>"
                + "<td class='hide'><a href='#CombinedIssueVoucherModal' data-toggle='modal' onclick='CombinedIssueVoucher_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblCombinedIssueVoucher", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblCombinedIssueVoucher>tbody>tr>td.PONumber", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function CombinedIssueVoucher_LoadingWithPaging() {
    debugger;
    var pWhereClause = CombinedIssueVoucher_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = " ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { CombinedIssueVoucher_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblCombinedIssueVoucher>tbody>tr", $("#txt-Search").val().trim());
}
function CombinedIssueVoucher_GetWhereClause() {
    pWhereClause = "WHERE 1=1"

    if ($("#txt-Search").val().trim() != "" && !IsMESCOCompany)
        pWhereClause += " AND Code Like '%" + $("#txt-Search").val().trim() + "%' OR PONumber Like '%" + $("#txt-Search").val().trim() + "%'";
    if ($("#txt-Search").val().trim() != "" && IsMESCOCompany)
        pWhereClause += " AND PONumber Like '%" + $("#txt-Search").val().trim() + "%'";

    if ($("#slSafe").val() != "" && $("#cbIsCash").prop("checked"))
        pWhereClause += " AND SafeCode = (SELECT Code FROM Treasury WHERE ID = " + $("#slSafe").val() + ")";

    if ($("#slBank").val() != "" && $("#cbIsBank").prop("checked"))
        pWhereClause += " AND BankID = " + $("#slBank").val()

    if ($("#txtFromDate").val() != "" && $("#txtFromDate").val() != 0)
        pWhereClause += ` AND ApprovedOn >= '${ConvertDateFormat($("#txtFromDate").val())} 00:00:00'`

    if ($("#txtToDate").val() != "" && $("#txtToDate").val() != 0)
        pWhereClause += ` AND ApprovedOn <= '${ConvertDateFormat($("#txtToDate").val())} 23:59:59'`

    if ($("#slSearchCustody").val() != "" && $("#slSearchCustody").val() != null)
        pWhereClause += " AND CustodyID = '" + $("#slSearchCustody").val() + "' \n";

    if ($("#slClient").val() != "" && $("#slClient").val() != null) {
        pWhereClause += " AND PartnerTypeID=" + $("#slPartnerType").val() + " AND PartnerID=" + $("#slClient").val();
    }

    pWhereClause += " AND SafeCode IN (SELECT Code FROM Treasury WHERE ID IN (SELECT SafeID FROM Sec_UserSafes WHERE UserID = " + pLoggedUser.ID + "))"
    return pWhereClause;
}
function CombinedIssueVoucher_EditByDblClick(pID) {
    //jQuery("#CombinedIssueVoucherModal").modal("show");
    //CombinedIssueVoucher_FillControls(pID);
}
function CombinedIssueVoucher_ClearAllControls(callback) {
    ClearAll("#CombinedIssueVoucherModal");

    $("#btnSave").attr("onclick", "CombinedIssueVoucher_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "CombinedIssueVoucher_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
    //ApplySelectListSearch_OnlyChange();
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
}
function IsCashChecked() {
    $("#slBank").parent().addClass("hide");
    $("#slSafe").parent().removeClass("hide");
}
function IsChequeChecked() {
    $("#slBank").parent().removeClass("hide");
    $("#slSafe").parent().addClass("hide");
}
function GetSafeBalance() {
    $(".OpenningBalance").val("0");
    $(".EndingBalance").val("0");
    debugger;
    if ($("#slSafe").val() != 0 && $("#slSafe").val() != "") {
        var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/CombinedIssueVoucher/GetSafeBalance"
            , {
                pSafeID: $("#slSafe").val()
                , pToDate: ConvertDateFormat(pFormattedTodaysDate)
            }
            , function (pData) {
                var OpenningBalance = pData[0];
                var EndingBalance = pData[1];
                var CurrencyID = pData[2]

                switch (CurrencyID) {
                    case 83:
                        $("#txtEGPOpenningBalance").val(OpenningBalance);
                        $("#txtEGPEndingBalance").val(EndingBalance);
                        break;
                    case 63:
                        $("#txtUSDOpenningBalance").val(OpenningBalance);
                        $("#txtUSDEndingBalance").val(EndingBalance);
                        break;
                    case 82:
                        $("#txtEUROpenningBalance").val(OpenningBalance);
                        $("#txtEUREndingBalance").val(EndingBalance);
                        break;
                    case 81:
                        $("#txtGBPOpenningBalance").val(OpenningBalance);
                        $("#txtGBPEndingBalance").val(EndingBalance);
                        break;
                    default:
                        break;
                }
                FadePageCover(false);
            }
            , null);
    }
}

function GetBankBalance() {
    $(".OpenningBalance").val("0");
    $(".EndingBalance").val("0");
    debugger;
    if ($("#slSafe").val() != 0 && $("#slSafe").val() != "") {
        var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/CombinedIssueVoucher/GetBankBalance"
            , {
                pBankID: $("#slBank").val()
                , pToDate: ConvertDateFormat(pFormattedTodaysDate)
            }
            , function (pData) {
                var OpenningBalance = pData[0];
                var EndingBalance = pData[1];
                var CurrencyID = pData[2]

                switch (CurrencyID) {
                    case 83:
                        $("#txtEGPOpenningBalance").val(OpenningBalance);
                        $("#txtEGPEndingBalance").val(EndingBalance);
                        break;
                    case 63:
                        $("#txtUSDOpenningBalance").val(OpenningBalance);
                        $("#txtUSDEndingBalance").val(EndingBalance);
                        break;
                    case 82:
                        $("#txtEUROpenningBalance").val(OpenningBalance);
                        $("#txtEUREndingBalance").val(EndingBalance);
                        break;
                    case 81:
                        $("#txtGBPOpenningBalance").val(OpenningBalance);
                        $("#txtGBPEndingBalance").val(EndingBalance);
                        break;
                    default:
                        break;
                }
                FadePageCover(false);
            }
            , null);
    }
}
function Print(pID, pIsCombined, pIsFleet) {
    if (pIsCombined && !pIsFleet) {
        $.getScript(strServerURL + '/Scripts/ReceiptsAndPayments/Custodies/PaymentRequestCollected.js?' + glbVersion, function () { PaymentRequestCollected_Print(pID); });
    } else if (!pIsCombined && !pIsFleet) {
        $.getScript(strServerURL + '/Scripts/ReceiptsAndPayments/Custodies/PaymentRequest.js?' + glbVersion, function () { PaymentRequest_Print(pID); });
    }
}

function Submit(pID, pIsCombined, pIsFleet) {
    
    CallGETFunctionWithParameters("/api/CombinedIssueVoucher/Submit"
        , {
            pID: pID
            , pIsCombined: pIsCombined
            , pIsFleet: pIsFleet
        }
        , function (pData) {
            var ReturnedMessage = pData[0];
            if (ReturnedMessage == "") {
                swal("Success", "Issue voucher created successfully");
                CombinedIssueVoucher_LoadingWithPaging();
            }
            else {
                swal("Sorry", ReturnedMessage);
            }
        });
}
function Reject(pID, pIsCombined, pIsFleet) {
    CallGETFunctionWithParameters("/api/CombinedIssueVoucher/Reject"
        , {
            pID: pID
            , pIsCombined: pIsCombined
            , pIsFleet: pIsFleet
        }
        , function (pData) {
            var ReturnedMessage = pData[0];
            if (ReturnedMessage == "") {
                swal("Done", "PR is rejected and unapproved successfully!");
                CombinedIssueVoucher_LoadingWithPaging();
            }
            else {
                swal("Sorry", ReturnedMessage);
            }
        });
}
function CombinedPartnerTypeChanged() {

    debugger;
    $("#slPartner").html("<option value=''><--All--></option>");//to quickly empty
    if ($("#slPartnerType").val() != "" && $("#slPartnerType").val() != null) {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/A_ARAllocationWithVoucher/FillPartners", { pPartnerTypeID: $("#slPartnerType").val() }
            , function (pData) {
                FillListFromObject(null, 2/*pCodeOrName*/, "<--All-->", "slClient", pData[0], null);
                FadePageCover(false);
            }
            , null);
    }
}