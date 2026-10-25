

function PaymentRequestCollected_Initialize(PaymentRequestCollectedID) {
    strBindTableRowsFunctionName = "PaymentRequestCollected_BindTableRows";
    strLoadWithPagingFunctionName = "/api/PaymentRequestCollected/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = " Where exists (select 1 from A_PaymentRequest_UsersLevel U   where  isnull(ApproveLevel,0) = case when LevelNo = -1 then 0 else LevelNo end  and  U.UserID =" + pLoggedUser.ID + ")";

    if (PaymentRequestCollectedID != undefined)
        pWhereClause += " And ID = " + PaymentRequestCollectedID;

    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/ReceiptsAndPayments/Custodies/PaymentRequestCollected", "div-content", function () {

        $("#slBank").css({ "width": "100%" }).select2();
        $("#slSafe").css({ "width": "100%" }).select2();
        $("#slNoteAccountID").css({ "width": "100%" }).select2();
        $("#slCustody").css({ "width": "100%" }).select2();
        $("#slFilterCustody").css({ "width": "100%" }).select2();
        $('#slFilterStatus').val(0);
        $("#slFilterApproval").parent().removeClass("hide");
        $(".classShowForMesco").removeClass("hide");
        $(".StatusLabel").text("Last Status");

        $("div[tabindex='-1']").removeAttr('tabindex');

        $("#btn-applypaging2").on("click", function () {
            LoadDataWithPaging("div-Pager2", "select-page-size2", "spn-first-page-row2", "spn-last-page-row2", "spn-total-count2", "div-Text-Total2", 2);
        });

            LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
                , function (pData) {
                    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
                    $("#slCurrency").html($("#hReadySlCurrencies").html());

                    let uLevels = JSON.parse(pData[5]);
                   
                    userLevels = uLevels.map(item => parseInt(item));
               
                    PaymentRequestCollected_BindTableRows(JSON.parse(pData[0]));

                    FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slCustody", pData[2],
                        function () { $("#slFilterCustody").html($("#slCustody").html()), $("#slFilterCustodyCollected").html($("#slCustody").html()) });

                    
                    FillListFromObject(null, 2, "<--Select-->", "slFilterApproval", pData[3], null);
                    FillListFromObject(null, 2, "<--Select-->", "slFilterCreatorUser", pData[4], null);
                    

                });

        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    },
        function () { PaymentRequestCollected_ClearAllControls(); });
}
function PaymentRequestCollected_ClearAllControls() {
    debugger;
    //pLoggedUserApprovedFromNotifyPaymentRequest = 0;
    $("#tblPaymentRequest tbody").html("");
    $("#tblPaymentRequestSelected tbody").html("");

    ClearAll("#PaymentRequestModal");
    ClearAll("#RedirectPaymentModal");

    $('#tblPaymentRequestCollected' + ' td').find('input[name="Delete"]:checked').each(function () {
        $(this).attr('checked', false);
    });

    $("#slCurrency").val(pDefaults.CurrencyID);
    $("#txtRequestDate").val(getTodaysDateInddMMyyyyFormat());

    $("#txtChequeDate").val(getTodaysDateInddMMyyyyFormat);
    $("#txtDueDate").val(getTodaysDateInddMMyyyyFormat);

    $("#txtExchangeRate").val(1);

    $("#slCustody").val();
    $("#slCustody").trigger("change");

    $("#slBank").val();
    $("#slBank").trigger("change");

    $("#slSafe").val();
    $("#slSafe").trigger("change");

    $("#slNoteAccountID").val();
    $("#slNoteAccountID").trigger("change");


    //$(".classDisableForPosted").removeAttr("disabled");
    //$(".classDisableForDetails").removeAttr("disabled");
    //$("#slCurrency").prop('disabled', false);

    //$("#btnSave").attr("onclick", "AlarmUsers_SavePaymentRequest(false);");
    //$("#btnSaveAndAddNew").attr("onclick", "AlarmUsers_SavePaymentRequest(true);");
    //$("#cb-CheckAll").prop('checked', false);
    //_ISdiff = false;
    //LoadAllChargeType()
}
function PaymentRequestCollected_GetWhereClause() {
    debugger;
    //var pWhereClause = " WHERE CreatorUserID_Request = " + $("#hLoggedUserID").val();
    var pWhereClause = "WHERE 1=1 ";

    if ($("#txtFilterCodeSerialCollected").val().trim() != "")
        pWhereClause += " AND (Code=N'" + $("#txtFilterCodeSerialCollected").val().trim().toUpperCase() + "')" + "\n";
    if ($("#txtFilterSupplierCollected").val().trim() != "")
        pWhereClause += " AND (PartnerName LIKE N'%" + $("#txtFilterSupplierCollected").val().trim().toUpperCase() + "%')" + "\n";
    if ($("#slFilterCustodyCollected").val().trim() != "")
        pWhereClause += " AND (CustodyID=N'" + $("#slFilterCustodyCollected").val() + "')" + "\n";
    if (isValidDate($("#txtFilterFromRequestDateCollected").val().trim(), 1)) {
        if ($("#txtFilterFromRequestDateCollected").val() != null && $("#txtFilterFromRequestDateCollected").val() != "")
            pWhereClause += " AND (PaymentRequestCollectedDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFilterFromRequestDateCollected").val()) + " 00:00:00.000')" + "\n";
    }
    if (isValidDate($("#txtFilterToRequestDateCollected").val().trim(), 1)) {
        if ($("#txtFilterToRequestDateCollected").val() != null && $("#txtFilterToRequestDateCollected").val() != "")
            pWhereClause += " AND (PaymentRequestCollectedDate <= '" + GetDateWithFormatyyyyMMdd($("#txtFilterToRequestDateCollected").val()) + " 23:59:59.999')" + "\n";
    }
    if ($("#txtFilterOperation").val().trim() != "")
        pWhereClause += " AND (Operations LIKE N'%" + $("#txtFilterOperation").val().trim().toUpperCase() + "%')" + "\n";
    if ($('#slFilterStatus').val() != '') {
        if (_IsCustodySettlement == 1)
            pWhereClause += " And isnull(IsApprovedSettlement,0) =  " + $('#slFilterStatus').val();
        else
            pWhereClause += " And isnull(IsApprovedRequest,0) =  " + $('#slFilterStatus').val();
    }
    if ($('#slFilterApproval').val() != '') {
        pWhereClause += " And isnull(ApproveStatues,0) =  '" + $('#slFilterApproval option:selected').text() + "'";
    }
    if ($("#txtFilterPONumber").val().trim() != "" && IsMESCOCompany) {
        pWhereClause += " AND PONumber=" + $("#txtFilterPONumber").val().trim() + "\n";
    }
    if ($("#slFilterCreatorUser").val() != "" && $("#slFilterCreatorUser").val() != null && IsMESCOCompany) {
        pWhereClause += " AND CreatorUserID_Request=" + $("#slFilterCreatorUser").val() + "\n";
    }

    /*pWhereClause += " And exists (select 1 from A_PaymentRequest_UsersLevel U   where  isnull(ApproveLevel,0) = case when LevelNo = -1 then 0 else LevelNo end  and  U.UserID =" + pLoggedUser.ID + ")";*/


    return pWhereClause;
}
function PaymentRequestCollected_LoadingWithPaging() {
    debugger;
    strBindTableRowsFunctionName = "PaymentRequestCollected_BindTableRows";
    strLoadWithPagingFunctionName = "/api/PaymentRequestCollected/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";
    var pWhereClause = PaymentRequestCollected_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) {
        PaymentRequestCollected_BindTableRows(JSON.parse(pData[0]));
    });

}
var userLevels = [];
function PaymentRequestCollected_BindTableRows(pPaymentRequest) {
    check = 1;
    debugger;
    ClearAllTableRows("tblPaymentRequestCollected");
    editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    var PaymentRedirectText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i                     style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Redirect" + "</span>";

  $.each(pPaymentRequest, function (i, item) {

     let dblClickString = "";
        if  ((userLevels.includes(item.ApproveLevel + 1) || item.ApproveLevel == 1)) {
            dblClickString = "ondblclick='PaymentRequestCollected_FillAllControls(" + item.ID + ");'";
            }

      AppendRowtoTable("tblPaymentRequestCollected",
                      //("<tr ID='" + item.ID + "'" + (item.ApproveLevel == 2 ? "" :" ondblclick='PaymentRequestCollected_FillAllControls(" + item.ID + ");'") + ">"
            ("<tr ID='" + item.ID + "' " + dblClickString + ">"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Code'>" + item.Code + "</td>"
                + "<td class='PONumber'>" + (item.PONumber == 0 ? "" : item.PONumber) + "</td>"
                + "<td class='PaymentRequestCodes'>" + item.PaymentRequestCodes + "</td>"
                + "<td class='PaymentRequestCollectedDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.PaymentRequestCollectedDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.PaymentRequestCollectedDate))) + "</td>"
                + "<td class='CustodyName'>" + item.CustodyName + "</td>"
                + "<td class='PartnerName'>" + (item.PartnerName == "0" ?  "" : item.PartnerName) + "</td>"
                + "<td class='CurrencyCode'>" + item.CurrencyCode + "</td>"
                + "<td class='Notes'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                + "<td class='Status'>" + (item.ApproveStatues == 0 ? "" : item.ApproveStatues) + "</td>"

                + "<td class='ChequeDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ChequeDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ChequeDate))) + "</td>"
                + "<td class='DueDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.DueDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.DueDate))) + "</td>"
                + "<td class='BankID hide'>" + (item.BankID == 0 ? "" : item.BankID) + "</td>"
                + "<td class='SafeID hide'>" + (item.SafeID == 0 ? "" : item.SafeID) + "</td>"
                + "<td class='CurrencyID hide'>" + (item.CurrencyID == 0 ? "" : item.CurrencyID) + "</td>"
                + "<td class='ChargedPerson hide'>" + (item.ChargedPerson == 0 ? "" : item.ChargedPerson) + "</td>"
                + "<td class='NoteAccountID hide'>" + (item.NoteAccountID == 0 ? "" : item.NoteAccountID) + "</td>"
                + "<td class='ChequeNo hide'>" + (item.ChequeNo == 0 ? "" : item.ChequeNo) + "</td>"
                + "<td class='IsCheque hide'>" + (item.IsCheque == 0 ? "" : item.IsCheque) + "</td>"
                + "<td class='IsTransfer hide'>" + (item.IsTransfer == 0 ? "" : item.IsTransfer) + "</td>"
                + "<td class='IsDeposite hide'>" + (item.IsDeposite == 0 ? "" : item.IsDeposite) + "</td>"
                + "<td class='IsCash hide'>" + (item.IsCash == 0 ? "" : item.IsCash) + "</td>"
                + "<td class='IsDirect hide'>" + (item.IsDirect == 0 ? "" : item.IsDirect) + "</td>"
                + "<td class='ApproveLevel hide'>" + (item.ApproveLevel == 0 ? "" : item.ApproveLevel) + "</td>"
                + "<td class=''>"
                + "<a href='#' data-toggle='modal' onclick='PaymentRequestCollected_Print(" + item.ID + ");' " + printControlsText + "</a></td>"
                + "<td >" + (" <a href='#' data-toggle='modal' onclick='PaymentRedirct(" + item.ID + ");' " + PaymentRedirectText + "</a> " ) 
                + "</td>"
                + "</tr>"));
    });
    ApplyPermissions();
    if ($("#hf_CanDelete").val() == 1) {
        $("#btn-Approve").removeClass("hide");
        $("#btn-UnApprove").removeClass("hide");
    }
    else {
        $("#btn-Approve").addClass("hide");
        $("#btn-UnApprove").addClass("hide");
    }

    BindAllCheckboxonTable("tblPaymentRequestCollected", "ID");
    CheckAllCheckbox("ID");
    //HighlightText("#tblPaymentRequest>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function PaymentRequestCollected_FillAllControls(pID) {
    debugger;
    PaymentRequestCollected_ClearAllControls();

    FadePageCover(true);
    CallGETFunctionWithParameters("/api/PaymentRequest/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned", {
        pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: 1, pPageSize: 50
        , pWhereClause: " Where ID in (select D.PaymentRequestID from A_PaymentRequestCollectedDetails D where D.PaymentRequestCollectedID=" + pID + ")"  
        , pOrderBy: "ID DESC"

    }
        , function (pData) {

            $("#hID").val(pID);

            var tr = $("#tblPaymentRequestCollected tr[ID='" + pID + "']");
            $("#txtPaymentRequestCollectedNotes").val(tr.find("td.Notes").text() == "" ? "0" : tr.find("td.Notes").text());

            jQuery("#PaymentRequestModal").modal("show");
            PaymentRequest3_BindTableRows (JSON.parse(pData[0]));
            if ($("#tblPaymentRequestCollected tbody tr[id=" + pID + "]").find("td.Status").text() == "تم الصرف")
                $("#btn-Delete").attr("disabled", true);
            else
                $("#btn-Delete").attr("disabled", false);
        


            FadePageCover(false);
        }
        , null);
}
function PaymentRequest3_BindTableRows(pPaymentRequest) {
    check = 1;
    debugger;
    ClearAllTableRows("tblPaymentRequestSelected");
    editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    var PaymentRedirectText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i                     style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Redirect" + "</span>";

    $.each(pPaymentRequest, function (i, item) {
        AppendRowtoTable("tblPaymentRequestSelected",
            ("<tr ID='" + item.ID + "' >"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Code'>" + item.Code + "</td>"
                + "<td class='IsCheck hide'>" + item.IsCheck + "</td>"
                + "<td class='CustodyID hide'>" + item.CustodyID + "</td>"
                + "<td class='CustodyName'>" + item.CustodyName + "</td>"
                + "<td class='Operations'>" + item.Operations + "</td>"
                + "<td class='RequestDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.RequestDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.RequestDate))) + "</td>"
                + "<td class='PartnerName'>" + (item.PartnerIDNew == "0" ? "" : item.PartnerName) + "</td>"
                + "<td class='TotalEstmatedCost'>" + item.TotalEstmatedCost + "</td>"
                + "<td class='TotalActualCost'>" + item.TotalActualCost + "</td>"
                + "<td class='CurrencyID hide'>" + item.CurrencyID + "</td>"
                + "<td class='IsAccept hide' id='cbIsAccept" + item.ID + "'>" + item.IsAccept + "</td>"
                + "<td class='CurrencyCode'>" + item.CurrencyCode + "</td>"
                + "<td class='Notes'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                + "<td class='ChargeTypeGroupID hide'>" + (item.ChargeTypeGroupID == 0 ? "" : item.ChargeTypeGroupID) + "</td>"
                + "<td class='PaymentComboID hide'>" + (item.PaymentComboID == 0 ? "" : item.PaymentComboID) + "</td>"
                + "<td class='IssuedToCmbo hide'>" + (item.IssuedToCmbo == 0 ? "" : item.IssuedToCmbo) + "</td>"
                + "<td class='PartnerID hide'>" + (item.PartnerID == 0 ? "" : item.PartnerID) + "</td>"
                + "<td class='ApproveStatues'>" + (item.ApproveStatues == 0 ? "" : item.ApproveStatues) + "</td>"
                + "<td class='ApproveLevel hide'>" + item.ApproveLevel + "</td>"


                + "<td class='Attache hide'>" + (item.Attache == 0 ? "" : item.Attache) + "</td>"
                + "<td class='Payment hide'>" + (item.Payment == 0 ? "" : item.Payment) + "</td>"
                + "<td class='IssuedTo hide'>" + (item.IssuedTo == 0 ? "" : item.IssuedTo) + "</td>"
                + "<td class='isDiff hide'>" + (item.isDiff == 0 ? "" : item.isDiff) + "</td>"

                + "<td class='PartnerTypeID hide'>" + (item.PartnerTypeID == 0 ? "" : item.PartnerTypeID) + "</td>"
                + "<td class='PartnerIDNew hide'>" + (item.PartnerIDNew == 0 ? "" : item.PartnerIDNew) + "</td>"
                + "<td class='PartnerIDVendor hide'>" + (item.PartnerIDVendor == 0 ? "" : item.PartnerIDVendor) + "</td>"


                + "<td class='CostCenterID hide'>" + (item.CostCenterID == 0 ? "" : item.CostCenterID) + "</td>"
                + "<td class='NotesPayableID hide'>" + (item.NotesPayableID == 0 ? "" : item.NotesPayableID) + "</td>"

                + "<td class='IsGeneratedSupplierJV hide'>" + (item.IsGeneratedSupplierJV == 0 ? "" : item.IsGeneratedSupplierJV) + "</td>"

                + "<td class='ChequeDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ChequeDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ChequeDate))) + "</td>"
                + "<td class='DueDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.DueDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.DueDate))) + "</td>"
                + "<td class='BankID hide'>" + (item.BankID == 0 ? "" : item.BankID) + "</td>"
                + "<td class='BankName hide'>" + (item.BankName == 0 ? "" : item.BankName) + "</td>"
                + "<td class='AccountName hide'>" + (item.AccountName == 0 ? "" : item.AccountName) + "</td>"
                + "<td class='AccountNumber hide'>" + (item.AccountNumber == 0 ? "" : item.AccountNumber) + "</td>"
                + "<td class='SafeID hide'>" + (item.SafeID == 0 ? "" : item.SafeID) + "</td>"
                + "<td class='ChargedPerson hide'>" + (item.ChargedPerson == 0 ? "" : item.ChargedPerson) + "</td>"
                + "<td class='NoteAccountID hide'>" + (item.NoteAccountID == 0 ? "" : item.NoteAccountID) + "</td>"

                + "<td class='ChequeNo hide'>" + (item.ChequeNo == 0 ? "" : item.ChequeNo) + "</td>"
                + "<td class='IsCheque hide'>" + (item.IsCheque == 0 ? "" : item.IsCheque) + "</td>"
                + "<td class='isTransfer hide'>" + (item.isTransfer == 0 ? "" : item.isTransfer) + "</td>"
                + "<td class='isDeposite hide'>" + (item.isDeposite == 0 ? "" : item.isDeposite) + "</td>"
                + "<td class='isCash hide'>" + (item.isCash == 0 ? "" : item.isCash) + "</td>"
                + "<td class='IsDirect hide'>" + (item.IsDirect == 0 ? "" : item.IsDirect) + "</td>"
                + "<td class='CreatorUserID_Request hide'>" + (item.CreatorUserID_Request == 0 ? "" : item.CreatorUserID_Request) + "</td>"


                + "<td class='IsApprovedRequest'> <input type='checkbox' id='cbIsApprovedRequest" + item.ID + "' disabled='disabled' " + (_IsCustodySettlement == 1 ? (item.IsApprovedSettlement ? " checked='checked' " : "") : (item.IsApprovedRequest ? " checked='checked' " : "")) + " /></td>"
                + "<td class=''>"
                + "<a href='#' data-toggle='modal' onclick='PaymentRequest_Print(" + item.ID + ");' " + printControlsText + "</a></td>"
                + "</tr>"));
    });
    ApplyPermissions();


    BindAllCheckboxonTable("tblPaymentRequestSelected", "Delete", "cb-CheckAll3");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    CheckAllCheckbox("CheckAll3");

}
function PaymentRequestCollected_Save() {
    debugger;
    var pSelectedItemsIDs = GetAllIDsAsStringWithNameAttr("tblPaymentRequestSelected", "Delete");

    if (pSelectedItemsIDs == "")
        swal("Sorry", "You have to select Payment Request .");
    else {
        FadePageCover(true);

        //$("#tblPaymentRequestSelected tbody tr").each(function () {
        //        pDetailsID += ((pDetailsID == "") ? "" : ",") + ($(this).attr('ID'));
        //    });
        pID = $('#hID').val();
        var pParametersWithValues = {
            pID: pID,
            pPaymentRequestIDs: pSelectedItemsIDs
            , pNotes: $("#txtPaymentRequestCollectedNotes").val().trim() == "" ? 0 : $("#txtPaymentRequestCollectedNotes").val().trim().toUpperCase()
        };
        CallPOSTFunctionWithParameters("/api/PaymentRequestCollected/Save", pParametersWithValues
            , function (pData) {
                var _ReturnedMessage = pData[0];
                if (_ReturnedMessage == "") {
                    PaymentRequestCollected_LoadingWithPaging();
                    jQuery("#PaymentRequestModal").modal("hide");
                    swal("Success", "Saved successfully.");
                    FadePageCover(false);
                }
                else {
                    swal("Sorry", _ReturnedMessage);
                    FadePageCover(false);
                }
            }
            , null);

    }



}
function ChangePaging() {
    strBindTableRowsFunctionName = "PaymentRequest2_BindTableRows";
    $("#btn-applypaging2").on("click", function () {
        LoadDataWithPaging("div-Pager2", "select-page-size2", "spn-first-page-row2", "spn-last-page-row2", "spn-total-count2", "div-Text-Total2", 1);
    });
    PaymentRequestCollected_ClearAllControls();
}
function PaymentRequestCollected_ApproveList(callback) {
    //Confirmation message to delete
    debugger;

    if ($('#tblPaymentRequestCollected tr[ondblclick] td').find('input[name="Delete"]:checked').length !=
        $('#tblPaymentRequestCollected tr td').find('input[name="Delete"]:checked').length) {
        swal("Sorry", "You are not authorized");
        return;
    }

    if (GetAllSelectedIDsAsString('tblPaymentRequestCollected') != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be Approved !",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Approve!",
            closeOnConfirm: true
        },
            //callback function in case of confirm delete
            function () {
                FadePageCover(true);
                CallGETFunctionWithParameters("/api/PaymentRequestCollected/Approve"
                    , { "pDeletedPaymentRequestIDs": GetAllSelectedIDsAsString('tblPaymentRequestCollected') }
                    , function (pData) {
                        if (pData == "") {
                            swal("Success", "approved successfully.");
                            PaymentRequestCollected_LoadingWithPaging();
                        }
                        else {

                            showDeleteFailMessage = true
                            var pMessageFromSP = pData;
                            var word = "Transaction";
                            var index = pMessageFromSP.indexOf(word);
                            if (index !== -1)
                                pMessageFromSP = pMessageFromSP.substring(0, index + word.length - 12);

                            strDeleteFailMessage = pMessageFromSP;
                            PaymentRequestCollected_LoadingWithPaging();
                        }

                    });
            });
}

function PaymentRequestCollected_DeleteSelectedPaymentRequest() {
    debugger;

    $('#tblPaymentRequestSelected tbody input[name="Delete"]:checked').each(function () {
        $(this).closest('tr').remove();
    });

}
function PaymentRequestCollected_AddSelectedPayments() {
    debugger;

    var ErrorCurrency = "";
    var ErrorPaymentCode = "";
    var ErrorSupplier = "";
    var ErrorCustody = "";
    const SelectedCheckedBoxes = document.querySelectorAll('#tblPaymentRequest tbody input[name="Delete"]:checked');
    const SelectedPaymentRequests = document.querySelectorAll('#tblPaymentRequestSelected tbody tr');

    SelectedCheckedBoxes.forEach(box => {
        const row = box.closest('tr');
        const rowData = {
            id: row.id,
            code: row.querySelector('.Code').textContent,
            custody: row.querySelector('.CustodyName').textContent,
            operation: row.querySelector('.Operations').textContent,
            date: row.querySelector('.RequestDate').textContent,
            supplier: row.querySelector('.PartnerName').textContent,
            estimatedCost: row.querySelector('.TotalEstmatedCost').textContent,
            actualCost: row.querySelector('.TotalActualCost').textContent,
            currency: row.querySelector('.CurrencyCode').textContent,
            notes: row.querySelector('.Notes').textContent,
            status: row.querySelector('.ApproveStatues').textContent
        };

        SelectedPaymentRequests.forEach(box2 => {
            const row2 = box2;

            if (row2 != null) {
                const rowData2 = {
                    id: row2.id,
                    code: row2.querySelector('.Code').textContent,
                    custody: row2.querySelector('.CustodyName').textContent,
                    supplier: row2.querySelector('.PartnerName').textContent,
                    currency: row2.querySelector('.CurrencyCode').textContent,
                };

                if (rowData.currency != rowData2.currency)
                    ErrorCurrency = "must select payment request with the same currency";

                if (rowData.code == rowData2.code)
                    ErrorPaymentCode = "payment request already selected ";

                if (rowData.supplier != rowData2.supplier)
                    ErrorSupplier = "must select payment request with the same supplier";

                if (rowData.custody != rowData2.custody)
                    ErrorCustody = "must select payment request with the same custody";
            }

        });

        if (ErrorCurrency == "" && ErrorPaymentCode == "" && ErrorSupplier == "" && ErrorCustody == "") {
            var tr = "<tr>" + row.innerHTML + "</tr>";
            AppendRowtoTable("tblPaymentRequestSelected", tr);
        }
        else {
            if (ErrorCurrency != "")
                swal('Error', ErrorCurrency);
            if (ErrorPaymentCode != "")
                swal('Error', ErrorPaymentCode);
            if (ErrorSupplier != "")
                swal('Error', ErrorSupplier);
            if (ErrorCustody != "")
                swal('Error', ErrorCustody);
        }


    });
    BindAllCheckboxonTable("tblPaymentRequestSelected", "Delete", "cb-CheckAll3");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    CheckAllCheckbox("CheckAll3");
}

function PaymentRequest2_BindTableRows(pPaymentRequest) {
    check = 1;
    debugger;
    ClearAllTableRows("tblPaymentRequest");
    editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    var PaymentRedirectText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i                     style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Redirect" + "</span>";


    $.each(pPaymentRequest, function (i, item) {
        AppendRowtoTable("tblPaymentRequest",
            ("<tr ID='" + item.ID + "' >"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Code'>" + item.Code + "</td>"
                
                + "<td class='IsCheck hide'>" + item.IsCheck + "</td>"
                + "<td class='CustodyID hide'>" + item.CustodyID + "</td>"
                + "<td class='CustodyName'>" + item.CustodyName + "</td>"
                + "<td class='Operations'>" + item.Operations + "</td>"
                + "<td class='RequestDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.RequestDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.RequestDate))) + "</td>"
                + "<td class='PartnerName'>" + (item.PartnerIDNew == "0" ?  "" : item.PartnerName) + "</td>"
                + "<td class='TotalEstmatedCost'>" + item.TotalEstmatedCost + "</td>"
                + "<td class='TotalActualCost'>" + item.TotalActualCost + "</td>"
                + "<td class='CurrencyID hide'>" + item.CurrencyID + "</td>"
                + "<td class='IsAccept hide' id='cbIsAccept" + item.ID + "'>" + item.IsAccept + "</td>"
                + "<td class='CurrencyCode'>" + item.CurrencyCode + "</td>"
                + "<td class='Notes'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                
                + "<td class='ChargeTypeGroupID hide'>" + (item.ChargeTypeGroupID == 0 ? "" : item.ChargeTypeGroupID) + "</td>"
                + "<td class='PaymentComboID hide'>" + (item.PaymentComboID == 0 ? "" : item.PaymentComboID) + "</td>"
                + "<td class='IssuedToCmbo hide'>" + (item.IssuedToCmbo == 0 ? "" : item.IssuedToCmbo) + "</td>"
                + "<td class='PartnerID hide'>" + (item.PartnerID == 0 ? "" : item.PartnerID) + "</td>"
                + "<td class='ApproveStatues'>" + (item.ApproveStatues == 0 ? "" : item.ApproveStatues) + "</td>"
                + "<td class='ApproveLevel hide'>" + item.ApproveLevel + "</td>"


                + "<td class='Attache hide'>" + (item.Attache == 0 ? "" : item.Attache) + "</td>"
                + "<td class='Payment hide'>" + (item.Payment == 0 ? "" : item.Payment) + "</td>"
                + "<td class='IssuedTo hide'>" + (item.IssuedTo == 0 ? "" : item.IssuedTo) + "</td>"
                + "<td class='isDiff hide'>" + (item.isDiff == 0 ? "" : item.isDiff) + "</td>"

                + "<td class='PartnerTypeID hide'>" + (item.PartnerTypeID == 0 ? "" : item.PartnerTypeID) + "</td>"
                + "<td class='PartnerIDNew hide'>" + (item.PartnerIDNew == 0 ? "" : item.PartnerIDNew) + "</td>"
                + "<td class='PartnerIDVendor hide'>" + (item.PartnerIDVendor == 0 ? "" : item.PartnerIDVendor) + "</td>"


                + "<td class='CostCenterID hide'>" + (item.CostCenterID == 0 ? "" : item.CostCenterID) + "</td>"
                + "<td class='NotesPayableID hide'>" + (item.NotesPayableID == 0 ? "" : item.NotesPayableID) + "</td>"

                + "<td class='IsGeneratedSupplierJV hide'>" + (item.IsGeneratedSupplierJV == 0 ? "" : item.IsGeneratedSupplierJV) + "</td>"

                + "<td class='ChequeDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ChequeDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ChequeDate))) + "</td>"
                + "<td class='DueDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.DueDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.DueDate))) + "</td>"
                + "<td class='BankID hide'>" + (item.BankID == 0 ? "" : item.BankID) + "</td>"
                + "<td class='BankName hide'>" + (item.BankName == 0 ? "" : item.BankName) + "</td>"
                + "<td class='AccountName hide'>" + (item.AccountName == 0 ? "" : item.AccountName) + "</td>"
                + "<td class='AccountNumber hide'>" + (item.AccountNumber == 0 ? "" : item.AccountNumber) + "</td>"
                + "<td class='SafeID hide'>" + (item.SafeID == 0 ? "" : item.SafeID) + "</td>"
                + "<td class='ChargedPerson hide'>" + (item.ChargedPerson == 0 ? "" : item.ChargedPerson) + "</td>"
                + "<td class='NoteAccountID hide'>" + (item.NoteAccountID == 0 ? "" : item.NoteAccountID) + "</td>"

                + "<td class='ChequeNo hide'>" + (item.ChequeNo == 0 ? "" : item.ChequeNo) + "</td>"
                + "<td class='IsCheque hide'>" + (item.IsCheque == 0 ? "" : item.IsCheque) + "</td>"
                + "<td class='isTransfer hide'>" + (item.isTransfer == 0 ? "" : item.isTransfer) + "</td>"
                + "<td class='isDeposite hide'>" + (item.isDeposite == 0 ? "" : item.isDeposite) + "</td>"
                + "<td class='isCash hide'>" + (item.isCash == 0 ? "" : item.isCash) + "</td>"
                + "<td class='IsDirect hide'>" + (item.IsDirect == 0 ? "" : item.IsDirect) + "</td>"
                + "<td class='CreatorUserID_Request hide'>" + (item.CreatorUserID_Request == 0 ? "" : item.CreatorUserID_Request) + "</td>"


                + "<td class='IsApprovedRequest'> <input type='checkbox' id='cbIsApprovedRequest" + item.ID + "' disabled='disabled' " + (_IsCustodySettlement == 1 ? (item.IsApprovedSettlement ? " checked='checked' " : "") : (item.IsApprovedRequest ? " checked='checked' " : "")) + " /></td>"
                + "<td class=''>"
                + "<a href='#' data-toggle='modal' onclick='PaymentRequest_Print(" + item.ID + ");' " + printControlsText + "</a></td>"
                + "</tr>"));
    });
    ApplyPermissions();
    if ($("#hf_CanDelete").val() == 1) {
        $("#btn-Approve").removeClass("hide");
    }
    else {
        $("#btn-Approve").addClass("hide");
    }


    //BindAllCheckboxonTable("tblPaymentRequest", "Delete");
    //CheckAllCheckbox("ID");

    BindAllCheckboxonTable("tblPaymentRequest", "Delete", "cb-CheckAll2");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    CheckAllCheckbox("CheckAll2");
    //HighlightText("#tblPaymentRequest>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function PaymentRequest_LoadingWithPaging() {
    debugger;

    strLoadWithPagingFunctionName = "/api/PaymentRequest/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = PaymentRequest_GetWhereClause();
    var pPageSize = $('#select-page-size2').val();
    var pPageNumber = ($("#div-Pager2 li.active a").text() == "" ? 1 : $("#div-Pager2 li.active a").text());
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager2", "select-page-size2", "spn-first-page-row2", "spn-last-page-row2", "spn-total-count2", "div-Text-Total2", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) {
        PaymentRequest2_BindTableRows(JSON.parse(pData[0]));
    });

}
function PaymentRequest_GetWhereClause() {
    debugger;
    //var pWhereClause = " WHERE CreatorUserID_Request = " + $("#hLoggedUserID").val();
    var pWhereClause = "Where ID Not in (select PaymentRequestID from A_PaymentRequestCollectedDetails ) And ApproveLevel + 1 = (SELECT OrderNO FROM PaymentRequestApprovalLevels WHERE CreatePaymentOrderOnApprove = 1 ) And CurrencyID = " + $('#slCurrency').val();

    if ($("#txtFilterCodeSerial").val().trim() != "")
        pWhereClause += " AND (Code=N'" + $("#txtFilterCodeSerial").val().trim().toUpperCase() + "')" + "\n";
    if ($("#txtFilterSupplier").val().trim() != "")
        pWhereClause += " AND PartnerIDNew is not null And (PartnerName LIKE N'%" + $("#txtFilterSupplier").val().trim().toUpperCase() + "%')" + "\n";
    if ($("#txtFilterOperation").val().trim() != "")
        pWhereClause += " AND (Operations LIKE N'%" + $("#txtFilterOperation").val().trim().toUpperCase() + "%')" + "\n";
    if ($("#slFilterCustody").val().trim() != "")
        pWhereClause += " AND (CustodyID=N'" + $("#slFilterCustody").val() + "')" + "\n";
    if (isValidDate($("#txtFilterFromRequestDate").val().trim(), 1)) {
        if ($("#txtFilterFromRequestDate").val() != null && $("#txtFilterFromRequestDate").val() != "")
            pWhereClause += " AND (RequestDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFilterFromRequestDate").val()) + " 00:00:00.000')" + "\n";
    }
    if (isValidDate($("#txtFilterToRequestDate").val().trim(), 1)) {
        if ($("#txtFilterToRequestDate").val() != null && $("#txtFilterToRequestDate").val() != "")
            pWhereClause += " AND (RequestDate <= '" + GetDateWithFormatyyyyMMdd($("#txtFilterToRequestDate").val()) + " 23:59:59.999')" + "\n";
    }
    if (_IsCustodySettlement == 1 && pDefaults.UnEditableCompanyName == "MES") {
        pWhereClause += " AND PartnerIDNew is null" + "\n";
    }
    if ((_IsCustodySettlement == 0 && pDefaults.UnEditableCompanyName == "MES")) {
        pWhereClause += " And exists (select 1 from A_PaymentRequest_UsersLevel U   where  isnull(ApproveLevel,0) = case when LevelNo = -1 then 0 else LevelNo end  and  U.UserID =" + pLoggedUser.ID + ")";
    }
    
    pWhereClause += " AND ISNULL(IsReject,0) = 0 " + "\n";

    return pWhereClause;
}
function PaymentRequestCollected_Print(pID) {
    debugger;
    if (pID == 0)
        pID = $("#hID").val();
    if (pID == "") //this means new without saving
        swal("Sorry", "Please, Add at least one item.");
    else {
        if (IsMESCOCompany) {
            var arr_Keys = new Array();
            var arr_Values = new Array();
            arr_Keys.push("ID");
            arr_Values.push(pID);

            var pParametersWithValues =
            {
                arr_Keys: arr_Keys
                , arr_Values: arr_Values
                , pTitle: "Print"
                , pReportName: (_IsCustodySettlement ? "Rep_A_Payment_Request_Settlement" : "Rep_MescoPaymentRequestCollected")
            };
            var win = window.open("", "_blank");
            var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '&pReportName=' + pParametersWithValues.pReportName + '';

            win.location = url;
        }
    }
}
function PaymentRequest_Print(pID) {
    debugger;
    if (pID == 0)
        pID = $("#hID").val();
    if (pID == "") //this means new without saving
        swal("Sorry", "Please, Add at least one item.");
    else {
        //if ($("#hDefaultUnEditableCompanyName").val() == "COS" || pDefaults.UnEditableCompanyName == "ILS" || pDefaults.UnEditableCompanyName == "ILSEG") {
        if (IsMESCOCompany) {
            var arr_Keys = new Array();
            var arr_Values = new Array();
            arr_Keys.push("ID");
            arr_Values.push(pID);

            var pParametersWithValues =
            {
                arr_Keys: arr_Keys
                , arr_Values: arr_Values
                , pTitle: "Print"
                , pReportName: (_IsCustodySettlement ? "Rep_A_Payment_Request_Settlement" : "Rep_MescoPaymentRequest")
            };
            var win = window.open("", "_blank");
            var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '&pReportName=' + pParametersWithValues.pReportName + '';

            win.location = url;
        }
        else if ($("#hDefaultUnEditableCompanyName").val() != "NEW" && $("#hDefaultUnEditableCompanyName").val() != "COS") {
            var arr_Keys = new Array();
            var arr_Values = new Array();
            arr_Keys.push("ID");
            arr_Values.push(pID);

            var pParametersWithValues =
            {
                arr_Keys: arr_Keys
                , arr_Values: arr_Values
                , pTitle: "Payment Reques"
                , pReportName: (_IsCustodySettlement ? "Rep_A_Payment_Request_Settlement" : "Rep_A_Payment_RequestAccount")
            };
            var win = window.open("", "_blank");
            var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '&pReportName=' + pParametersWithValues.pReportName + '';

            win.location = url;
        }
        else if ($("#hDefaultUnEditableCompanyName").val() == "COS") {
            var arr_Keys = new Array();
            var arr_Values = new Array();
            arr_Keys.push("ID");
            arr_Values.push(pID);
            arr_Keys.push("BankID");
            arr_Values.push($("#tblPaymentRequest tbody tr[id=" + pID + "] td.BankID").text() == "" ? "0" : $("#tblPaymentRequest tbody tr[id=" + pID + "] td.BankID").text());
            //arr_Keys.push("BankName");
            //arr_Values.push($("#tblPaymentRequest tbody tr[id=" + pID + "] td.BankName").text());
            //arr_Keys.push("AccountName");
            //arr_Values.push($("#tblPaymentRequest tbody tr[id=" + pID + "] td.AccountName").text());
            //arr_Keys.push("AccountNumber");
            //arr_Values.push($("#tblPaymentRequest tbody tr[id=" + pID + "] td.AccountNumber").text());

            var pParametersWithValues =
            {
                arr_Keys: arr_Keys
                , arr_Values: arr_Values
                , pTitle: "Payment Request"
                , pReportName: "Rep_A_PaymentRequest"
            };
            var win = window.open("", "_blank");
            var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '&pReportName=' + pParametersWithValues.pReportName + '';

            win.location = url;
        }
        else {
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/PaymentRequest/LoadHeaderWithDetails"
                , { pHeaderID: pID, pIsCustodySettlement: 0 }
                , function (pData) {
                    var pHeader = JSON.parse(pData[5])[0];
                    var pDetails = JSON.parse(pData[2]);
                    var mywindow = window.open('', '_blank');
                    var ReportHTML = '';
                    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>' + 'Invoice' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    ReportHTML += '         <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
                    ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3>' + 'Payment Request - طلب صرف ' + pHeader.Code + '</h3></div> </br>';
                    ReportHTML += '             <div class="col-xs-6"><b>Cur - العملة : </b>' + pHeader.CurrencyCode + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Request Date - تاريخ الطلب : ' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pHeader.RequestDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(pHeader.RequestDate)) : "") + '</b></div>';
                    if ($("#hDefaultUnEditableCompanyName").val() == "COS" || pDefaults.UnEditableCompanyName == "ILS" || pDefaults.UnEditableCompanyName == "ILSEG" || $("#hDefaultUnEditableCompanyName").val() == "ELI" || $("#hDefaultUnEditableCompanyName").val() == "ELI") {
                        ReportHTML += '             <div class="col-xs-6"><b> Supplier - المورد : </b>' + (($("#hDefaultUnEditableCompanyName").val() == "COS" || $("#hDefaultUnEditableCompanyName").val() == "ELI") ? pHeader.PartnerName : (pHeader.CustodyName == 0 ? "" : pHeader.CustodyName.replace(/\n/g, "<br/>"))) + '</div>';
                    }
                    else {
                        ReportHTML += '             <div class="col-xs-6"><b> Custody - الموظف : </b>' + (pHeader.CustodyName == 0 ? "" : pHeader.CustodyName.replace(/\n/g, "<br/>")) + '</div>';

                    }
                    if (pHeader.IsCheck)
                        ReportHTML += '             <div class="col-xs-6"><b>Cheque - شيك  </b></div>';
                    else
                        ReportHTML += '             <div class="col-xs-6"><b>Cash - كاش  </b></div>';

                    //ReportHTML += '             <div class="col-xs-4"><b>RMA No. : </b>' + (pHeader.RMANumber == 0 ? "" : pHeader.RMANumber) + '</div>';
                    ReportHTML += '                         <table id="tblDetails" class="table table-striped b-t b-light text-sm table-bordered">'; //table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    ReportHTML += '                                     <th style="width:25%;">اسم البند</th>';
                    ReportHTML += '                                     <th style="width:25%;">رقم العملية</th>';
                    ReportHTML += '                                     <th style="width:15%;">البوليصة</th>';
                    ReportHTML += '                                     <th style="width:10%;">اسم المورد</th>';
                    ReportHTML += '                                     <th style="width:10%;">التكلفة المتوقعة</th>';
                    if (_IsCustodySettlement == 1)
                        ReportHTML += '                                     <th style="width:10%;">التكلفة الفعلية</th>';
                    ReportHTML += '                                     <th style="width:10%;">القسيمة</th>';
                    ReportHTML += '                                     <th style="width:10%;">الملاحظات</th>';

                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    debugger;
                    $.each(pDetails, function (i, item) {
                        ReportHTML += '                                     <tr class="" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + (item.ChargeTypeName == 0 ? '' : item.ChargeTypeName) + '</td>';
                        ReportHTML += '                                         <td>' + (item.OperationCode == 0 ? '' : item.OperationCode) + ' -> ' + (item.VesselName == 0 ? '0' : item.VesselName) + ' -> ' + (item.ActualArrivalString == 0 ? '0' : item.ActualArrivalString) + '</td>';
                        ReportHTML += '                                         <td>' + (item.HouseName == 0 ? '' : item.HouseName) + '</td>';
                        ReportHTML += '                                         <td>' + (item.SupplierName == 0 ? '' : item.SupplierName) + '</td>';
                        ReportHTML += '                                         <td>' + (item.EstmatedCost.toFixed(2) == 0 ? '' : item.EstmatedCost.toFixed(2)) + '</td>';
                        if (_IsCustodySettlement == 1)
                            ReportHTML += '                                         <td>' + (item.ActualCost.toFixed(2) == 0 ? '' : item.ActualCost.toFixed(2)) + '</td>';
                        ReportHTML += '                                         <td>' + (item.Coupon == 0 ? '' : item.Coupon) + '</td>';
                        ReportHTML += '                                         <td>' + (item.Description == 0 ? '' : item.Description) + '</td>';
                        //ReportHTML += '                                         <td class="Quantity">' + item.Quantity + '</td>';

                        ReportHTML += '                                     </tr>';
                    });
                    ReportHTML += '                             </tbody>';
                    ReportHTML += '                         </table>';

                    //ReportHTML += '                         <div class="col-xs-7"><b>Received By : &nbsp;&nbsp;</b>' + '  _______________________________________	 ' + '</div>';

                    if (_IsCustodySettlement == 1)
                        ReportHTML += '                         <div class="col-xs-12"><b>Actual Total : </b>' + pHeader.TotalActualCost + '</div>';
                    else
                        ReportHTML += '                         <div class="col-xs-12"><b>Estimated Total : </b>' + pHeader.TotalEstmatedCost + '</div>';
                    //ReportHTML += '                         <div class="col-xs-7"><b>ID No. : &emsp;&emsp;&emsp;&nbsp;&nbsp;</b>' + '  _______________________________________	 ' + '</div>';
                    //ReportHTML += '                         <div class="col-xs-7"><b>Mobile : &emsp;&emsp;&emsp;&nbsp;</b>' + '  _______________________________________	 ' + '</div>';
                    //ReportHTML += '                         <div class="col-xs-5"><b>Date : &emsp;&emsp;&emsp;&emsp;</b>' + getTodaysDateInddMMyyyyFormat() + '</div>';

                    //ReportHTML += '                         <div class="col-xs-12 text-center m-t"><b>' + '  The equipment was received in good condition and there were no scratches.   ' + '</b></div>';
                    //ReportHTML += '                         <div class="col-xs-12 text-center"><b>' + '  تم إستلام الأجهزة فى حالة سليمة ولا يوجد أى خدوش   ' + '</b></div>';
                    //ReportHTML += '                         <div class="col-xs-12 text-center"><b>' + '  رجاء الختم بخاتم الشركه بما يفيد الاستلام  ' + '</b></div>';
                    //ReportHTML += '                         <div class="col-xs-12 text-center"><b>' + '  Please seal the company with the receipt.	 ' + '</b></div>';
                    ReportHTML += '         </body>';
                    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                    //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                    mywindow.document.write(ReportHTML);
                    mywindow.document.close();

                    FadePageCover(false);
                }
                , null);
        }
    }
}

var _ISdiff = false;
function UpdateRedirect(pSaveandAddNew) {
    debugger;
    if (!($("#cbIsCashR").prop('checked')) && ($("#txtChequeDate").val() == "" || $("#txtSearchChequeNo").val().trim() == "" || $("#txtSearchChequeNo").val().trim() == "0" ||$("#slBank").val() == "" || $("#slBank").val() == "0")) {
        swal("Sorry", "You have to Fill ChequeDate and ChequeNo.");
    }
    else if ($("#cbIsCashR").prop('checked') && ($("#slSafe").val() == "" || $("#slSafe").val() == "0")) {
        swal("Sorry", "You have to Fill Safe.");
    }
    else if ($("#cbIsTransferR").prop('checked') && ($("#slBank").val() == "" || $("#slBank").val() == "0")) {
        swal("Sorry", "You have to Fill Bank.");
    }
    else if ($("#cbIsDepositR").prop('checked') && ($("#slBank").val() == "" || $("#slBank").val() == "0")) {
        swal("Sorry", "You have to Fill Bank.");
    }
    else if ($("#cbIsChequeR").prop('checked') && ($("#slNoteAccountID").val() == "" || $("#slNoteAccountID").val() == "0")) {
        swal("Sorry", "You have to Fill Notes Payable ");

    }
    else if ($("#txtChargedPerson").val().trim() == "" || $("#txtChargedPerson").val().trim() == "0") {
        swal("Sorry", "You have to Fill ChargedPerson ");

    }
    else {

        CallGETFunctionWithParameters("/api/PaymentRequestCollected/UpdateRedirect"
            , {
                pID: $("#hID").val(),
                pIsCheque: $("#cbIsChequeR").prop('checked'),
                pisTransfer: $("#cbIsTransferR").prop('checked'),
                pisDeposite: $("#cbIsDepositR").prop('checked'),
                pChequeNo: $("#txtSearchChequeNo").val().trim() == "" ? 0 : $("#txtSearchChequeNo").val().trim(),
                pBankID: $("#slBank").val() == "" ? 0 : $("#slBank").val(),
                pSafeID: $("#slSafe").val() == "" ? 0 : $("#slSafe").val(),
                pChequeDate: ConvertDateFormat($("#txtChequeDate").val()),
                pDueDate: ConvertDateFormat($("#txtDueDate").val()),
                pChargedPerson: $("#txtChargedPerson").val().trim() == "" ? 0 : $("#txtChargedPerson").val().trim(),
                pNoteAccountID: $("#slNoteAccountID").val() == "" ? 0 : $("#slNoteAccountID").val(),
                pisCash: $("#cbIsCashR").prop('checked'),
                pIsDirect: $("#cbIsDirect").prop('checked')
            }
            , function (pData) {
                if (pData) {
                    swal("Success", "approved successfully.");
                    PaymentRequestCollected_LoadingWithPaging();
                    PaymentRequestCollected_ClearAllControls();
                    jQuery("#RedirectPaymentModal").modal("hide");
                }
                else {
                    swal('Error', 'error occurred')
                }

            });

    }
}
function PaymentRedirct(pID) {
    debugger;
    var LoggedUserCanRedirect = false;
    CallGETFunctionWithParameters("/api/PaymentRequest/CheckIfUserCanRedirect", { }, function (pData) {
        LoggedUserCanRedirect = pData[0];
    }, function () {
        if (IsMESCOCompany && !LoggedUserCanRedirect) {
            swal("Sorry", "you are not authorized to redirect")
        }
        else if (pID != null && pID != 0) {

            var tr = $("#tblPaymentRequestCollected tr[ID='" + pID + "']");
            $("#hID").val(pID);
            var pCurrencyID = tr.find("td.CurrencyID").text();
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/PaymentRequestCollected/GetBankAndSafeByCurrency", { pCurrencyID: pCurrencyID }
                , function (pData) {

                    FillListFromObject_ERP(null, 2, "<--Select-->", "slBank", pData[1], null);
                    FillListFromObject_ERP(null, 2, "<--Select-->", "slSafe", pData[0], null);
                    FillListFromObject_ERP(null, 3, TranslateString("SelectFromMenu"), "slNoteAccountID", pData[2], null);

                    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();

                    jQuery("#RedirectPaymentModal").modal("show");


                    var cash = tr.find("td.IsCash").text();
                    var Cheque = tr.find("td.IsCheque").text();
                    var Deposit = tr.find("td.IsDeposite").text();
                    var Transfer = tr.find("td.IsTransfer").text();
                    $("#cbIsDirect").prop('checked', tr.find("td.IsDirect").text());
                    if (cash == 0 && Cheque == 0 && Deposit == 0 && Transfer == 0) {

                        $("#slBank").val(tr.find("td.BankID").text() == "" ? "0" : tr.find("td.BankID").text());
                        $("#slBank").trigger("change");

                        $("#slSafe").val(tr.find("td.SafeID").text() == "" ? "0" : tr.find("td.SafeID").text());
                        $("#slSafe").trigger("change");

                        $("#slNoteAccountID").val(tr.find("td.NoteAccountID").text() == "" ? "0" : tr.find("td.NoteAccountID").text());
                        $("#slNoteAccountID").trigger("change");

                        $("#txtChequeDate").val(tr.find("td.ChequeDate").text() == "" ? getTodaysDateInddMMyyyyFormat() : tr.find("td.ChequeDate").text());
                        $("#txtDueDate").val(tr.find("td.DueDate").text() == "" ? getTodaysDateInddMMyyyyFormat() : tr.find("td.DueDate").text());
                        $("#txtChargedPerson").val(tr.find("td.ChargedPerson").text() == "" ? "0" : tr.find("td.ChargedPerson").text());
                        $("#txtSearchChequeNo").val(tr.find("td.ChequeNo").text() == "" ? "0" : tr.find("td.ChequeNo").text());

                        $("#cbIsChequeR").prop('checked', tr.find("td.IsCheque").text());
                        $("#cbIsDepositR").prop('checked', tr.find("td.isTransfer").text());
                        $("#cbIsTransferR").prop('checked', tr.find("td.isDeposite").text());
                        $("#cbIsCashR").prop('checked', tr.find("td.IsCash").text());

                        if (tr.find("td.IsCheck").text() == "true") {
                            $('#cbIsChequeR').prop("checked", true);
                            $('#cbIsCashR').prop("checked", false);
                            $('#cbIsDepositR').prop("checked", false);
                            $('#cbIsTransferR').prop("checked", false);

                        }
                        else {
                            $('#cbIsChequeR').prop("checked", false);
                            $('#cbIsCashR').prop("checked", true);
                            $('#cbIsDepositR').prop("checked", false);
                            $('#cbIsTransferR').prop("checked", false);
                        }
                    }
                    else {
                        $("#slBank").val(tr.find("td.BankID").text() == "" ? "0" : tr.find("td.BankID").text());
                        $("#slBank").trigger("change");

                        $("#slSafe").val(tr.find("td.SafeID").text() == "" ? "0" : tr.find("td.SafeID").text());
                        $("#slSafe").trigger("change");

                        $("#slNoteAccountID").val(tr.find("td.NoteAccountID").text() == "" ? "0" : tr.find("td.NoteAccountID").text());
                        $("#slNoteAccountID").trigger("change");

                        $("#txtChequeDate").val(tr.find("td.ChequeDate").text() == "" ? getTodaysDateInddMMyyyyFormat() : tr.find("td.ChequeDate").text());
                        $("#txtDueDate").val(tr.find("td.DueDate").text() == "" ? getTodaysDateInddMMyyyyFormat() : tr.find("td.DueDate").text());
                        $("#txtChargedPerson").val(tr.find("td.ChargedPerson").text() == "" ? "0" : tr.find("td.ChargedPerson").text());
                        $("#txtSearchChequeNo").val(tr.find("td.ChequeNo").text() == "" ? "0" : tr.find("td.ChequeNo").text());

                        
                        $("#cbIsChequeR").prop('checked', tr.find("td.IsCheque").text());
                        $("#cbIsDepositR").prop('checked', Deposit);
                        $("#cbIsTransferR").prop('checked', tr.find("td.isTransfer").text());
                        $("#cbIsCashR").prop('checked', tr.find("td.IsCash").text());

                    }


                    $("#btnSaveRedirect").attr("onclick", "UpdateRedirect(true);");

                    $("#cbIsDirect").parent().addClass('hide');

                    FadePageCover(false);
                }
                , null);

        }
    });

    

}





