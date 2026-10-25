
 


var IsCalcBl = 0;
var CalcBLPayableID = 0;

var userLevels = [];
var check = 0;
$(document).ready(function () {
    $("#slCustody").css({ "width": "100%" }).select2();
    $("#slBank").css({ "width": "100%" }).select2();
    $("#slSafe").css({ "width": "100%" }).select2();
    $("#slOperationForOperationPayablesModal").css({ "width": "100%" }).select2();
    $("#slNoteAccountID").css({ "width": "100%" }).select2();




    
    $("#slFilterCustody").css({ "width": "100%" }).select2();
    $("#slClient").css({ "width": "100%" }).select2();
    $("#slClientVendor").css({ "width": "100%" }).select2();

    if (IsMESCOCompany) {
        $('#slFilterStatus').val(0);
        $("#btn-UnApprove").addClass("hide");
        $("#slFilterApproval").parent().removeClass("hide");
        $(".classShowForMesco").removeClass("hide");
    }
     

    $("div[tabindex='-1']").removeAttr('tabindex');
});

function PaymentRequest_BindTableRows(pPaymentRequest) {
    check = 1;
    debugger;
    ClearAllTableRows("tblPaymentRequest");
    if (_IsCustodySettlement == 1) {
        $("#btn-SelectOperationPayables").addClass("hide");
    }
    editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    var CopyControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i                     style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Copy" + "</span>";
    var UploadText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Upload") + "</span>";
    var PaymentRedirectText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i                     style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Redirect" + "</span>";


    $.each(pPaymentRequest, function (i, item) {
        let dblClickString = "ondblclick='PaymentRequest_FillAllControls(" + item.ID + ");'";
        if (IsMESCOCompany && _IsCustodySettlement == 0) {
            dblClickString = "";
            if ((userLevels.includes(item.ApproveLevel + 1) || item.ApproveLevel == 1) && item.IsIncludedInCombinedPaymentRequest != 1) {
                dblClickString = "ondblclick='PaymentRequest_FillAllControls(" + item.ID + ");'";
            }
        }
        AppendRowtoTable("tblPaymentRequest",
            ("<tr ID='" + item.ID + "' " + dblClickString + ">"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Code'>" + item.Code + "</td>"
                + "<td class='PONumber " + (IsMESCOCompany ? "" : "hide") + "'>" + (item.PONumber == 0 ? "" : item.PONumber) + "</td>"
                + "<td class='IsCheck hide'>" + item.IsCheck + "</td>"
                + "<td class='CustodyID hide'>" + item.CustodyID + "</td>"
                + "<td class='CustodyName'>" + item.CustodyName + "</td>"
                + "<td class='Operations'>" + item.Operations + "</td>"
                + "<td class='OperationsPartner'>" + item.OperationsPartner + "</td>"
                + "<td class='RequestDate'>" + (IsMESCOCompany && _IsCustodySettlement== 1 ? (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.VoucherDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.VoucherDate))) : (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.RequestDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.RequestDate)))) + "</td>"
                + "<td class='PartnerName'>" + (item.PartnerName == "0" ? (item.IssuedTo == "0" ? "" : item.IssuedTo) : item.PartnerName) + "</td>"
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
                + "<td class='ApproveStatues'>" + (item.ApproveStatues == 0 ? "" : (IsMESCOCompany && item.IsIncludedInCombinedPaymentRequest ? "Combined" : item.ApproveStatues)) + "</td>"
                + "<td class='ApproveLevel hide'>" + item.ApproveLevel + "</td>"
                + "<td class='IsIncludedInCombinedPaymentRequest hide'>" + item.IsIncludedInCombinedPaymentRequest + "</td>"


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
                + "<td class='PRAccountName hide'>" + (item.PRAccountName == 0 ? "" : item.PRAccountName) + "</td>"
                + "<td class='PRSubAccountName hide'>" + (item.PRSubAccountName == 0 ? "" : item.PRSubAccountName) + "</td>"

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

                + "<td class='" + ((_IsCustodySettlement == 1) ? '' : '') + "'>"
                //+ "<a href='#' data-toggle='modal' onclick='PaymentRequest_Copy(" + item.ID + ");' " + CopyControlsText + " </a></td>"
                + "<td class='Print'><a href='#tabUploadFiles' data-toggle='modal' onclick='UploadFiles(" + item.ID + ");' " + UploadText + "</a></td>"
                + "<td class='" + ((_IsCustodySettlement == 1 || $("#hDefaultUnEditableCompanyName").val() != "MES") ? 'hide' : '') + "'>"
                + "<a href='#' data-toggle='modal' onclick='PaymentRedirct(" + item.ID + ");' " + PaymentRedirectText + "</a></td>"

                + "</tr>"));
    });
    ApplyPermissions();
    if ($("#hf_CanDelete").val() == 1) {
        $("#btn-Approve").removeClass("hide");
        if (!IsMESCOCompany || (IsMESCOCompany && _IsCustodySettlement == 1)) 
           $("#btn-UnApprove").removeClass("hide");
    }
    else {
        $("#btn-Approve").addClass("hide");
        $("#btn-UnApprove").addClass("hide");
    }
    debugger;
    if (_IsCustodySettlement == 1) {
        $('#btn-NewAdd').addClass('hide');
        $('#btn-Delete').addClass('hide');
        $('#btn-Reject').addClass('hide');
    }
    if (pDefaults.UnEditableCompanyName == "COS") {
        $(".classShowForCosco").removeClass("hide");
    }
    if (_IsCustodySettlement == 0)//payment request
    {
        if (pDefaults.UnEditableCompanyName == "MES") {
            $('#btn-Reject').removeClass('hide');
        }
        else {
            $('#btn-Reject').addClass('hide');
        }

        if (['MED'].includes(pDefaults.UnEditableCompanyName)) {
            if ($("#hf_CanDelete").val() == 1) {
                $('#btn-Delete').removeClass('hide');
                $("#btn-UnApprove").removeClass("hide");
            }
            else {
                $('#btn-Delete').addClass('hide');
                $("#btn-UnApprove").addClass("hide");
            }
            if ($("#hf_CanEdit").val() == 1) {
                $("#btn-Approve").removeClass("hide");
                $('#btn-Reject').removeClass('hide');
            }
            else {
                $("#btn-Approve").addClass("hide");
                $('#btn-Reject').addClass('hide');
            }
        }

    }
    


    BindAllCheckboxonTable("tblPaymentRequest", "ID");
    CheckAllCheckbox("ID");
    //HighlightText("#tblPaymentRequest>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function PaymentRequest_LoadingWithPaging() {
    debugger;
    var pWhereClause = PaymentRequest_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) {
        PaymentRequest_BindTableRows(JSON.parse(pData[0]));
    });
    HighlightText("#tblPaymentRequest>tbody>tr", $("#txt-Search").val().trim());
}
function PaymentRequest_GetWhereClause() {
    debugger;
    //var pWhereClause = " WHERE CreatorUserID_Request = " + $("#hLoggedUserID").val();
    var pWhereClause = pLoggedUser.IsAccessAllCharges ? "WHERE 1=1" : " WHERE CreatorUserID_Request = " + $("#hLoggedUserID").val();
    if ((_IsCustodySettlement == 1))
        pWhereClause = pLoggedUser.IsAccessAllCharges ? " WHERE IsApprovedRequest = 1 AND VoucherID is not null" : " WHERE CreatorUserID_Request = " + $("#hLoggedUserID").val() + " AND IsApprovedRequest = 1 AND VoucherID is not null and id IN (SELECT aprd.PaymentRequestID FROM A_PaymentRequestDetails AS aprd WHERE aprd.PaymentRequestID IS NOT null)";
    if ((_IsCustodySettlement == 1))
        pWhereClause += " And isnull(IsDirect,0)=0 "
    if ($("#txtFilterCodeSerial").val().trim() != "")
        pWhereClause += " AND (Code=N'" + $("#txtFilterCodeSerial").val().trim().toUpperCase() + "')" + "\n";
    if ($("#txtFilterSupplier").val().trim() != "")
        pWhereClause += " AND (PartnerName LIKE N'%" + $("#txtFilterSupplier").val().trim().toUpperCase() + "%')" + "\n";
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
        pWhereClause +=  " AND PartnerIDNew is null" + "\n";
    }
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
    if ((_IsCustodySettlement == 0 && pDefaults.UnEditableCompanyName == "MES")) {

        //pWhereClause += " And (exists (select 1 from A_PaymentRequest_UsersLevel U   where  isnull(ApproveLevel,0) = case when LevelNo = -1 then 0 else LevelNo end  and  U.UserID =" + pLoggedUser.ID + ") or CreatorUserID_Request =" + pLoggedUser.ID
        //    + " or  exists(select 1 from crmUserSalesmen U1 join crmUserSalesmen U2 on U1.SalesmanID = U2.SalesmanID where CreatorUserID_Request = U1.UserID And U2.UserID = " + pLoggedUser.ID + ")) AND EXISTS(SELECT 1 FROM UserForms WHERE UserID = " + pLoggedUser.ID + " AND FormID = (SELECT ID FROM Forms WHERE ImageName = 'PaymentRequest' AND CanView = 1))";
        //pWhereClause += " AND (CreatorUserID_Request = " + pLoggedUser.ID + " OR ISNULL(ApproveLevel,0) + 1 IN (SELECT UL.LevelNo FROM A_PaymentRequest_UsersLevel UL WHERE UL.UserID = " + pLoggedUser.ID + ")) "
            //Service
    }
    if (pDefaults.UnEditableCompanyName == "MED") {
        let departmentName = "";
        CallGETFunctionWithParameters("api/NoAccessDepartments/LoadAll", { pWhereClause: "WHERE ID = " + $('#hLoggedUserDepartmentID').val() }, function (pData) {
            let d = JSON.parse(pData[0]);
            departmentName = d[0].Name;
        }, null, false);
        if (departmentName.includes("IMP")) {
            pWhereClause += " AND Operations LIKE '%IMP%' ";
        } else if (departmentName.includes("EXP")) {
            pWhereClause += " AND Operations LIKE '%EXP%' ";
        }
    }

    return pWhereClause;
}
function PaymentRequest_ClearAllControls() {
    debugger;
    IsCalcBl = 0;
    CalcBLPayableID = 0;
    //pLoggedUserApprovedFromNotifyPaymentRequest = 0;
    PaymentRequest_EnableDisableEditing(1);
    $("#tblPaymentRequestDetails tbody").html("");
    $("#tblAccount tbody").html("");

    ClearAll("#PaymentRequestModal");
    ClearAll("#RedirectPaymentModal");

    $('#tblPaymentRequest' + ' td').find('input[name="Delete"]:checked').each(function () {
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
    

    $(".classDisableForPosted").removeAttr("disabled");
    $(".classDisableForDetails").removeAttr("disabled");
    $("#slCurrency").prop('disabled', false);

    $("#btnSave").attr("onclick", "AlarmUsers_SavePaymentRequest(false);");
    $("#btnSaveAndAddNew").attr("onclick", "AlarmUsers_SavePaymentRequest(true);");
    $("#cb-CheckAll").prop('checked', false);
    _ISdiff = false;
    //LoadAllChargeType()
}
function UploadFiles(pID) {
    debugger;
    $("#hID").val(pID);
    ClearAll("#UploadFilesModal");
    jQuery("#UploadFilesModal").modal("show");
    Vouchers_GeneralUpload_Initialise();

}
//*********************************Uploaded Files***************************************//
function Vouchers_GeneralUpload_Initialise() {
    debugger;
    if (_IsCustodySettlement == 1) {
        glbGeneralUploadModalName = ""; //if the upload is in a modal then is not opened
        glbGeneralUploadTableName = "tblUploadedFiles_PaymentRequest";
        //glbGeneralUploadFolderName = $("#hID").val() == "" ? "" : $("#txtName").val().trim();
        glbGeneralUploadFolderName = $("#hID").val() == "" ? "" : $("#hID").val();

        glbGeneralUploadPath = "/DocsInFiles//PaymentRequestSettlement//";
        glbGeneralUploadRelativePath = "~/DocsInFiles/PaymentRequestSettlement/";
        glbGeneralUploadBtnUploadName = "inputFileUpload_PaymentRequest";
        glbTblTHSelectAllTagName = "HeaderDeleteUploadedFiles_PaymentRequest";
        glbTblInputSelectAllInputName = "cb-CheckAll-UploadedFiles_PaymentRequest";

        if (glbGeneralUploadFolderName != "")
            GeneralUpload_FillControls();
    }
    else {
        glbGeneralUploadModalName = ""; //if the upload is in a modal then is not opened
        glbGeneralUploadTableName = "tblUploadedFiles_PaymentRequest";
        //glbGeneralUploadFolderName = $("#hID").val() == "" ? "" : $("#txtName").val().trim();
        glbGeneralUploadFolderName = $("#hID").val() == "" ? "" : $("#hID").val();

        glbGeneralUploadPath = "/DocsInFiles//PaymentRequest//";
        glbGeneralUploadRelativePath = "~/DocsInFiles/PaymentRequest/";
        glbGeneralUploadBtnUploadName = "inputFileUpload_PaymentRequest";
        glbTblTHSelectAllTagName = "HeaderDeleteUploadedFiles_PaymentRequest";
        glbTblInputSelectAllInputName = "cb-CheckAll-UploadedFiles_PaymentRequest";

        if (glbGeneralUploadFolderName != "")
            GeneralUpload_FillControls();
    }
    if (pDefaults.UnEditableCompanyName == "LATT") {
        
        getRelatedFilesFromOperations();
    }

}
var _ISdiff = false;
function PaymentRedirct(pID) {
    var LoggedUserCanRedirect = false;
    CallGETFunctionWithParameters("/api/PaymentRequest/CheckIfUserCanRedirect", { }, function (pData) {
        LoggedUserCanRedirect = pData[0];
    }, function () {
        if (IsMESCOCompany && !LoggedUserCanRedirect) {
            swal("Sorry", "you are not authorized to redirect")
        }
        else if (pID != null && pID != 0) {
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/PaymentRequest/GetBankAndSafeByCurrency", { pPaymentRequestID: pID }
                , function (pData) {

                    FillListFromObject_ERP(null, 2, "<--Select-->", "slBank", pData[1], null);
                    FillListFromObject_ERP(null, 2, "<--Select-->", "slSafe", pData[0], null);
                    FillListFromObject_ERP(null, 3, TranslateString("SelectFromMenu"), "slNoteAccountID", pData[2], null);

                    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();

                    debugger;

                    jQuery("#RedirectPaymentModal").modal("show");
                    var tr = $("#tblPaymentRequest tr[ID='" + pID + "']");
                    $("#hID").val(pID);

                    var cash = tr.find("td.isCash").text();
                    var Cheque = tr.find("td.IsCheque").text();
                    var Deposit = tr.find("td.isDeposite").text();
                    var Transfer = tr.find("td.isTransfer").text();
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
                        $("#cbIsCashR").prop('checked', tr.find("td.isCash").text());

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
                        $("#cbIsCashR").prop('checked', tr.find("td.isCash").text());

                    }





                    $("#btnSaveRedirect").attr("onclick", "UpdateRedirect(true);");


                    FadePageCover(false);
                }
                , null);
        }
    });

    

    //var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();

    //debugger;

    //jQuery("#RedirectPaymentModal").modal("show");
    //var tr = $("#tblPaymentRequest tr[ID='" + pID + "']");
    //$("#hID").val(pID);

    //var cash = tr.find("td.isCash").text();
    //var Cheque = tr.find("td.IsCheque").text();
    //var Deposit = tr.find("td.isDeposite").text();
    //var Transfer = tr.find("td.isTransfer").text();
    //if (cash == 0 && Cheque == 0 && Deposit == 0 && Transfer==0) {

    //    $("#slBank").val(tr.find("td.BankID").text() == "" ? "0" : tr.find("td.BankID").text());
    //    $("#slBank").trigger("change");

    //    $("#slSafe").val(tr.find("td.SafeID").text() == "" ? "0" : tr.find("td.SafeID").text());
    //    $("#slSafe").trigger("change");

    //    $("#slNoteAccountID").val(tr.find("td.NoteAccountID").text() == "" ? "0" : tr.find("td.NoteAccountID").text());
    //    $("#slNoteAccountID").trigger("change");

    //    $("#txtChequeDate").val(tr.find("td.ChequeDate").text() == "" ? getTodaysDateInddMMyyyyFormat() : tr.find("td.ChequeDate").text());
    //    $("#txtDueDate").val(tr.find("td.DueDate").text() == "" ? getTodaysDateInddMMyyyyFormat() : tr.find("td.DueDate").text());
    //    $("#txtChargedPerson").val(tr.find("td.ChargedPerson").text() == "" ? "0" : tr.find("td.ChargedPerson").text());
    //    $("#txtSearchChequeNo").val(tr.find("td.ChequeNo").text() == "" ? "0" : tr.find("td.ChequeNo").text());

    //    $("#cbIsChequeR").prop('checked', tr.find("td.IsCheque").text());
    //    $("#cbIsDepositR").prop('checked', tr.find("td.isTransfer").text());
    //    $("#cbIsTransferR").prop('checked', tr.find("td.isDeposite").text());
    //    $("#cbIsCashR").prop('checked', tr.find("td.isCash").text());

    //    if (tr.find("td.IsCheck").text() == "true") {
    //        $('#cbIsChequeR').prop("checked", true);
    //        $('#cbIsCashR').prop("checked", false);
    //        $('#cbIsDepositR').prop("checked", false);
    //        $('#cbIsTransferR').prop("checked", false);

    //    }
    //    else {
    //        $('#cbIsChequeR').prop("checked", false);
    //        $('#cbIsCashR').prop("checked", true);
    //        $('#cbIsDepositR').prop("checked", false);
    //        $('#cbIsTransferR').prop("checked", false);
    //    }
    //}
    //else {
    //    $("#slBank").val(tr.find("td.BankID").text() == "" ? "0" : tr.find("td.BankID").text());
    //    $("#slBank").trigger("change");

    //    $("#slSafe").val(tr.find("td.SafeID").text() == "" ? "0" : tr.find("td.SafeID").text());
    //    $("#slSafe").trigger("change");

    //    $("#slNoteAccountID").val(tr.find("td.NoteAccountID").text() == "" ? "0" : tr.find("td.NoteAccountID").text());
    //    $("#slNoteAccountID").trigger("change");

    //    $("#txtChequeDate").val(tr.find("td.ChequeDate").text() == "" ? getTodaysDateInddMMyyyyFormat() : tr.find("td.ChequeDate").text());
    //    $("#txtDueDate").val(tr.find("td.DueDate").text() == "" ? getTodaysDateInddMMyyyyFormat() : tr.find("td.DueDate").text());
    //    $("#txtChargedPerson").val(tr.find("td.ChargedPerson").text() == "" ? "0" : tr.find("td.ChargedPerson").text());
    //    $("#txtSearchChequeNo").val(tr.find("td.ChequeNo").text() == "" ? "0" : tr.find("td.ChequeNo").text());

    //    $("#cbIsChequeR").prop('checked', tr.find("td.IsCheque").text());
    //    $("#cbIsDepositR").prop('checked', tr.find("td.isDeposite").text());
    //    $("#cbIsTransferR").prop('checked', tr.find("td.isTransfer").text());
    //    $("#cbIsCashR").prop('checked', tr.find("td.isCash").text());

    //}



    

    //$("#btnSaveRedirect").attr("onclick", "UpdateRedirect(true);");
}

function UpdateRedirect(pSaveandAddNew) {
    debugger;
    if (IsMESCOCompany && _IsCustodySettlement == 0) {
        var DatesDiff = Date.prototype.compareDates(ConvertDateFormat($('#txtChequeDate').val()), ConvertDateFormat($('#txtDueDate').val()));
    }
    if (!($("#cbIsCashR").prop('checked')) && ($("#txtChequeDate").val() == "" || $("#txtSearchChequeNo").val().trim() == "" || $("#txtSearchChequeNo").val().trim() == "0" ||  $("#slBank").val() == "" || $("#slBank").val() == "0" )) {
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
    else if (IsMESCOCompany && _IsCustodySettlement == 0 && DatesDiff < 0) {
        swal("Sorry", "Creation date can't be after Due date");
    }
    else {
        InsertUpdateFunction("form", "/api/PaymentRequest/UpdateRedirect", {
            pID: $("#hID").val(),
            pIsCheque: $("#cbIsChequeR").prop('checked'),
            pisTransfer: $("#cbIsTransferR").prop('checked'),
            pisDeposite:  $("#cbIsDepositR").prop('checked'),
            pChequeNo: $("#txtSearchChequeNo").val().trim() == "" ? 0 : $("#txtSearchChequeNo").val().trim(),
            pBankID: $("#slBank").val() == "" ? 0 : $("#slBank").val(),
            pSafeID: $("#slSafe").val() == "" ? 0 : $("#slSafe").val(),
            pChequeDate: ConvertDateFormat($("#txtChequeDate").val()),
            pDueDate: ConvertDateFormat($("#txtDueDate").val()),
            pChargedPerson: $("#txtChargedPerson").val().trim() == "" ? 0 : $("#txtChargedPerson").val().trim(),
            pNoteAccountID: $("#slNoteAccountID").val() == "" ? 0 : $("#slNoteAccountID").val(),
            pisCash: $("#cbIsCashR").prop('checked'),
            pIsDirect: $("#cbIsDirect").prop('checked'),
            

        }, pSaveandAddNew, "RedirectPaymentModal", function () {
            PaymentRequest_LoadingWithPaging(); PaymentRequest_ClearAllControls();
            jQuery("#RedirectPaymentModal").modal("hide");

        });

    }
}

var pLevel = 0;
function PaymentRequest_FillAllControls(pID) {
    debugger;
    IsCalcBl = 0;
    CalcBLPayableID = 0;
    $("#tblPaymentRequestDetails tbody").html("");
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/PaymentRequest/LoadDetails", { pHeaderID: pID, pIsCustodySettlement: _IsCustodySettlement }
        , function (pData) {
            jQuery("#PaymentRequestModal").modal("show");
            var pInvoiceDetails = JSON.parse(pData[0]);
            let paymentHeader = JSON.parse(pData[1]);

            PaymentRequest_ClearAllControls();
            if (_IsCustodySettlement == 1) {
                CustodySettlementDetails_BindTableRows(pInvoiceDetails);
                if (pDefaults.UnEditableCompanyName != "COS") {
                    $("#slCurrency").removeClass("disabled");
                    $(".ShowClassForTransCompany").removeClass("hide");
                }
                else
                    $(".ShowClassForTransCompany").addClass("hide");
                $("#slCurrency").addClass("disabled");

                $('.classDisableForSett').addClass('hide');

            } else {
                $("#btn-split").removeClass("hide");
            }

            if (IsMESCOCompany) {
                $("#txtAccount").parent().removeClass("hide");
                $("#txtSubAccount").parent().removeClass("hide");
                $("#cbIsDirectPR").parent().parent().removeClass("hide");

                if ($("#hLoggedUserID").val() == '276' || $("#hLoggedUserID").val() == '4' || $("#hLoggedUserID").val() == '249' || $("#hLoggedUserID").val() == '269' || $("#hLoggedUserID").val() == '284' || $("#hLoggedUserID").val() == '285')
                {

                    $("#btn-GenerateDebitNote").removeClass("hide");



                } else
                    $("#btn-GenerateDebitNote").addClass("hide");

                
            }

            var d = new Date();
            var month = d.getMonth() + 1;
            var day = d.getDate();
            var output = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + d.getFullYear();
            $('#txtSettlementDate').val(output);

            var tr = $("#tblPaymentRequest tr[ID='" + pID + "']");
            $("#cbIsDirectPR").prop('checked', tr.find("td.IsDirect").text());
            if (pDefaults.UnEditableCompanyName == "COS") {
                let CurrencyID = tr.find("td.CurrencyID").text();
                let PartnerID = tr.find("td.PartnerIDNew").text();
                let PartnerTypeID = tr.find("td.PartnerTypeID").text();
                if (!PartnerID == "") {
                    CallGETFunctionWithParameters("/api/PaymentRequest/GetSupplierBankDetails",
                        {
                            pPartnerID: PartnerID,
                            pPartnerTypeID: PartnerTypeID,
                            pCurrencyID: CurrencyID
                        },
                        function (pData) {
                            FillListFromObject(tr.find("td.BankID").text(), 25, "Select", "slIssuedToCmbo", pData[0], null);
                            FadePageCover(false);
                        }
                    )
                } else {
                    $("#slIssuedToCmbo option").remove();;
                }
            }

            $("#hID").val(pID);
            $("#lblShown").html(": " + tr.find("td.Code").text() == "" ? "0" : tr.find("td.Code").text());
            $("#txtCode").val(tr.find("td.Code").text() == "" ? "0" : tr.find("td.Code").text());
            $("#slCustody").val(tr.find("td.CustodyID").text() == "" ? "0" : tr.find("td.CustodyID").text());
            $("#slCustody").trigger("change");

            $("#txtRequestDate").val(tr.find("td.RequestDate").text() == "" ? "0" : tr.find("td.RequestDate").text());
            $("#slCurrency").val(tr.find("td.CurrencyID").text() == "" ? "0" : tr.find("td.CurrencyID").text());
            $("#txtAmount").val(tr.find("td.TotalEstmatedCost").text() == "" ? "0" : tr.find("td.TotalEstmatedCost").text());
            $("#txtTotalActualCost").val(tr.find("td.TotalActualCost").text() == "" ? "0" : tr.find("td.TotalActualCost").text());
            $("#txtSettlementAmount").val(parseFloat($("#txtTotalActualCost").val()) - parseFloat($("#txtAmount").val()))
            $("#txtNotes").val(tr.find("td.Notes").text() == "" ? "0" : tr.find("td.Notes").text());

            $("#slServiceCategory").val(tr.find("td.ChargeTypeGroupID").text() == "" ? "0" : tr.find("td.ChargeTypeGroupID").text());
            $("#txtAttach").val(tr.find("td.Attache").text() == "" ? "0" : tr.find("td.Attache").text());
            $("#txtPayment").val(tr.find("td.Payment").text() == "" ? "0" : tr.find("td.Payment").text());
            $("#slPaymentCombo").val(tr.find("td.PaymentComboID").text() == "" ? "0" : tr.find("td.PaymentComboID").text());
            
            $("#slPartnerType").val(tr.find("td.PartnerTypeID").text() == "" ? "0" : tr.find("td.PartnerTypeID").text());
            $("#txtAccount").val(tr.find("td.PRAccountName").text() == "" ? "0" : tr.find("td.PRAccountName").text());
            $("#txtSubAccount").val(tr.find("td.PRSubAccountName").text() == "" ? "0" : tr.find("td.PRSubAccountName").text());
            
            pLevel = tr.find("td.ApproveLevel").text() == "" ? "0" : tr.find("td.ApproveLevel").text()

            $("#slCostCenterHeader").val(tr.find("td.CostCenterID").text() == "" ? "0" : tr.find("td.CostCenterID").text());
            $("#slNotesPayable").val(tr.find("td.NotesPayableID").text() == "" ? "0" : tr.find("td.NotesPayableID").text());
            $("#cbIsGeneratedSupplierJV").prop('checked', tr.find("td.IsGeneratedSupplierJV").text());

            $("#slClient").html("<option value=''><--All--></option>");//to quickly empty
            $("#slClientVendor").html("<option value=''><--All--></option>");//to quickly empty

            if ($("#slPartnerType").val() != "" && $("#slPartnerType").val() != null) {
                CallGETFunctionWithParameters("/api/A_ARAllocationWithVoucher/FillPartners", { pPartnerTypeID: $("#slPartnerType").val() }
                    , function (pData) {
                        FillListFromObject(tr.find("td.PartnerIDNew").text(), 2/*pCodeOrName*/, "<--All-->", "slClient", pData[0], null);
                        $("#slClient").trigger("change");
                        FillListFromObject(tr.find("td.PartnerIDVendor").text(), 2/*pCodeOrName*/, "<--All-->", "slClientVendor", pData[1], null);
                        $("#slClientVendor").trigger("change");
                    }
                    , null);
            }
            _ISdiff = tr.find("td.isDiff").text();
            
            $("#cbIsDirectPR").trigger("change");

            if (pDefaults.UnEditableCompanyName != "COS") {
                CallGETFunctionWithParameters("/api/PaymentRequest/GetIssuedToBySupplier", { pPartnerID: tr.find("td.PartnerID").text() == "" ? "0" : tr.find("td.PartnerID").text() }
                    , function (pData) {
                        FillListFromObject(JSON.parse(pData[0]), 2, TranslateString("SelectFromMenu"), "slIssuedToCmbo", pData[0], null);
                        $("#slIssuedToCmbo").val(tr.find("td.IssuedToCmbo").text() == "" ? "" : tr.find("td.IssuedToCmbo").text());
                    }
                    , null);
            } else {
                $("#txtDiscount").val(paymentHeader[0].Discount);
                OnDiscountChanged();
            }
            $("#txtIssuedTo").val(tr.find("td.IssuedTo").text() == "" ? "0" : tr.find("td.IssuedTo").text());

            if (pDefaults.UnEditableCompanyName == "NEW") {
                if (_IsCustodySettlement == 0) {
                    if ($("#cbIsAccept" + pID).text() == "false" && $("#hf_CanEdit").val() == "1") {
                        PaymentRequest_EnableDisableEditing(1);
                    }
                    else {
                        if (!$("#cbIsApprovedRequest" + pID).prop("checked") && $("#hf_CanEdit").val() == "1") {
                            PaymentRequest_EnableDisableEditing(1);
                        } else {
                            PaymentRequest_EnableDisableEditing(0);
                        }
                    }
                } else {
                    if (!$("#cbIsApprovedRequest" + pID).prop("checked") && $("#hf_CanEdit").val() == "1") {
                        PaymentRequest_EnableDisableEditing(1);
                    } else {
                        PaymentRequest_EnableDisableEditing(0);
                    }
                }
            }
            else {
                if (!$("#cbIsApprovedRequest" + pID).prop("checked") && $("#hf_CanEdit").val() == "1")
                    PaymentRequest_EnableDisableEditing(1);
                else
                    PaymentRequest_EnableDisableEditing(0);
            }

            if (tr.find("td.IsCheck").text() == "true") {
                $('#cbIsCheck').prop("checked", true);
                $('#cbIsCash').prop("checked", false);
            }
            else {
                $('#cbIsCheck').prop("checked", false);
                $('#cbIsCash').prop("checked", true);
            }

            if (_IsCustodySettlement == 0) {
                $(".DisableWithCustody").removeAttr("disabled");
                PaymentRequestDetails_BindTableRows(pInvoiceDetails);
                if (IsMESCOCompany && (pData[9] == 110 || pData[9] == 120 || pData[9] == 130)) {
                    $(".EstmatedCost input").attr('disabled', true);
                }
            }
            else {
                $(".DisableWithCustody").attr("disabled", "disabled");
                $("#txtNotes").removeAttr("disabled");

                if (pDefaults.UnEditableCompanyName == "TRM") {
                    $("#txtSettlementDate").removeAttr("disabled");
                }
                else {
                    $("#txtSettlementDate").attr("disabled", "disabled");
                }
            }
            if (_IsCustodySettlement == 1 && IsMESCOCompany) {
                $("#slPartnerType").attr("disabled", "disabled");
                $("#slClient").attr("disabled", "disabled");
                $("#slCostCenter").attr("disabled", "disabled");
                $("#slCostCenterHeader").attr("disabled", "disabled");
                $("#btn-filterPartnerType").attr("disabled", "disabled");
                $("#slVatHeader").attr("disabled", "disabled");
                $("#slDeductedTax").attr("disabled", "disabled");
                $("#btnCopyPartnerNameHeader").attr("onclick", "");
                $("#btnCopyCostCenterHeader").attr("onclick", "");
                $("#btnCopyWHT").attr("onclick", "");
                $("#btnCopyVat").attr("onclick", "");
            }
            //account
            CallGETFunctionWithParameters("/api/PaymentRequest/GetAccountDetails"
                , {
                    pPageNumber: 1
                    , pPageSize: 9999
                    , pWhereClauseJournalVoucherDetails: "WHERE PaymentRequestID=" + pID
                    , pOrderBy: "ID"
                    , pWhereClauseCurrencyDetails: ""

                }
                , function (pData) {
                    DetailsAccount_BindTableRows(JSON.parse(pData[0]));
                }
                , null);

            if (pDefaults.UnEditableCompanyName != "COS") {
                $("#slCurrency").prop('disabled', true);
            }
            else
                $("#slCurrency").prop('disabled', false);
            FadePageCover(false);
        }
        , null);
}
function PaymentRequest_FillAllControls_Old(pID) {
    debugger;
    $("#tblPaymentRequestDetails tbody").html("");
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/PaymentRequest/LoadDetails", { pHeaderID: pID, pIsCustodySettlement: _IsCustodySettlement }
        , function (pData) {
            jQuery("#PaymentRequestModal").modal("show");
            var pInvoiceDetails = JSON.parse(pData[2]);




            if (_IsCustodySettlement == 1) {


                PaymentRequest_ClearAllControls();
                CustodySettlementDetails_BindTableRows(pInvoiceDetails);
                if (pDefaults.UnEditableCompanyName != "COS") {

                    $("#slCurrency").removeClass("disabled");

                    $(".ShowClassForTransCompany").removeClass("hide");

                }
                else
                    $(".ShowClassForTransCompany").addClass("hide");
                $("#slCurrency").addClass("disabled");

            }
            //if (pInvoiceDetails.length > 0) {
            //    $(".classDisableForDetails").attr("disabled", "disabled");
            //}
            //else {
            //    $(".classDisableForDetails").removeAttr("disabled");
            //}
            //if (pHeader.IsPosted) {
            //    $(".classDisableForPosted").attr("disabled", "disabled");
            //}
            //else {
            //    $(".classDisableForPosted").removeAttr("disabled");
            //}
            var d = new Date();
            var month = d.getMonth() + 1;
            var day = d.getDate();
            var output = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + d.getFullYear();
            $('#txtSettlementDate').val(output);


            var tr = $("#tblPaymentRequest tr[ID='" + pID + "']");

            if (pDefaults.UnEditableCompanyName == "COS") {
                let CurrencyID = tr.find("td.CurrencyID").text();
                let PartnerID = tr.find("td.PartnerIDNew").text();
                let PartnerTypeID = tr.find("td.PartnerTypeID").text();
                if (!PartnerID == "") {
                    CallGETFunctionWithParameters("/api/PaymentRequest/GetSupplierBankDetails",
                        {
                            pPartnerID: PartnerID,
                            pPartnerTypeID: PartnerTypeID,
                            pCurrencyID: CurrencyID
                        },
                        function (pData) {
                            FillListFromObject(tr.find("td.BankID").text(), 25, "Select", "slIssuedToCmbo", pData[0], null);
                            FadePageCover(false);
                        }
                    )
                } else {
                    $("#slIssuedToCmbo option").remove();;
                }
            }

            $("#hID").val(pID);
            $("#lblShown").html(": " + tr.find("td.Code").text() == "" ? "0" : tr.find("td.Code").text());
            $("#txtCode").val(tr.find("td.Code").text() == "" ? "0" : tr.find("td.Code").text());
            $("#slCustody").val(tr.find("td.CustodyID").text() == "" ? "0" : tr.find("td.CustodyID").text());
            $("#slCustody").trigger("change");

            $("#txtRequestDate").val(tr.find("td.RequestDate").text() == "" ? "0" : tr.find("td.RequestDate").text());
            $("#slCurrency").val(tr.find("td.CurrencyID").text() == "" ? "0" : tr.find("td.CurrencyID").text());
            $("#txtAmount").val(tr.find("td.TotalEstmatedCost").text() == "" ? "0" : tr.find("td.TotalEstmatedCost").text());
            $("#txtTotalActualCost").val(tr.find("td.TotalActualCost").text() == "" ? "0" : tr.find("td.TotalActualCost").text());
            $("#txtSettlementAmount").val(parseFloat($("#txtTotalActualCost").val()) - parseFloat($("#txtAmount").val()))
            $("#txtNotes").val(tr.find("td.Notes").text() == "" ? "0" : tr.find("td.Notes").text());

            $("#slServiceCategory").val(tr.find("td.ChargeTypeGroupID").text() == "" ? "0" : tr.find("td.ChargeTypeGroupID").text());
            $("#txtAttach").val(tr.find("td.Attache").text() == "" ? "0" : tr.find("td.Attache").text());
            $("#txtPayment").val(tr.find("td.Payment").text() == "" ? "0" : tr.find("td.Payment").text());
            $("#slPaymentCombo").val(tr.find("td.PaymentComboID").text() == "" ? "0" : tr.find("td.PaymentComboID").text());

            $("#slPartnerType").val(tr.find("td.PartnerTypeID").text() == "" ? "0" : tr.find("td.PartnerTypeID").text());

            $("#slCostCenterHeader").val(tr.find("td.CostCenterID").text() == "" ? "0" : tr.find("td.CostCenterID").text());
            $("#slNotesPayable").val(tr.find("td.NotesPayableID").text() == "" ? "0" : tr.find("td.NotesPayableID").text());
            $("#cbIsGeneratedSupplierJV").prop('checked', tr.find("td.IsGeneratedSupplierJV").text());

            $("#slClient").html("<option value=''><--All--></option>");//to quickly empty
            $("#slClientVendor").html("<option value=''><--All--></option>");//to quickly empty


            //if (_IsCustodySettlement == 0) {
            //    if ($("#slPartnerType").val() != "" && $("#slPartnerType").val() != null) {
            //        FadePageCover(true);
            //        CallGETFunctionWithParameters("/api/A_ARAllocationWithVoucher/FillPartners", { pPartnerTypeID: $("#slPartnerType").val() }
            //            , function (pData) {
            //                FillListFromObject(tr.find("td.PartnerIDNew").text(), 2/*pCodeOrName*/, "<--All-->", "slClient", pData[0], null);
            //                FadePageCover(false);
            //            }
            //            , null);
            //    }
            //}

            if ($("#slPartnerType").val() != "" && $("#slPartnerType").val() != null) {
                FadePageCover(true);
                CallGETFunctionWithParameters("/api/A_ARAllocationWithVoucher/FillPartners", { pPartnerTypeID: $("#slPartnerType").val() }
                    , function (pData) {
                        FillListFromObject(tr.find("td.PartnerIDNew").text(), 2/*pCodeOrName*/, "<--All-->", "slClient", pData[0], null);
                        $("#slClient").trigger("change");
                        FillListFromObject(tr.find("td.PartnerIDVendor").text(), 2/*pCodeOrName*/, "<--All-->", "slClientVendor", pData[1], null);
                        $("#slClientVendor").trigger("change");

                        FadePageCover(false);
                    }
                    , null);
            }




            //  $("#slClient").val(tr.find("td.PartnerIDNew").text() == "" ? "0" : tr.find("td.PartnerIDNew").text());

            _ISdiff = tr.find("td.isDiff").text();

            //

            if (pDefaults.UnEditableCompanyName != "COS") {
                CallGETFunctionWithParameters("/api/PaymentRequest/GetIssuedToBySupplier", { pPartnerID: tr.find("td.PartnerID").text() == "" ? "0" : tr.find("td.PartnerID").text() }
                    , function (pData) {
                        FillListFromObject(JSON.parse(pData[0]), 2, TranslateString("SelectFromMenu"), "slIssuedToCmbo", pData[0], null);
                        $("#slIssuedToCmbo").val(tr.find("td.IssuedToCmbo").text() == "" ? "" : tr.find("td.IssuedToCmbo").text());

                        FadePageCover(false);
                    }
                    , null);
            }
            //

            $("#txtIssuedTo").val(tr.find("td.IssuedTo").text() == "" ? "0" : tr.find("td.IssuedTo").text());



            if (pDefaults.UnEditableCompanyName == "NEW") {
                if (_IsCustodySettlement == 0) {
                    if ($("#cbIsAccept" + pID).text() == "false" && $("#hf_CanEdit").val() == "1") {
                        PaymentRequest_EnableDisableEditing(1);
                    }
                    else {
                        if (!$("#cbIsApprovedRequest" + pID).prop("checked") && $("#hf_CanEdit").val() == "1") {
                            PaymentRequest_EnableDisableEditing(1);
                        } else {
                            PaymentRequest_EnableDisableEditing(0);
                        }
                    }
                } else {
                    if (!$("#cbIsApprovedRequest" + pID).prop("checked") && $("#hf_CanEdit").val() == "1") {
                        PaymentRequest_EnableDisableEditing(1);
                    } else {
                        PaymentRequest_EnableDisableEditing(0);
                    }
                }


            } else {
                if (!$("#cbIsApprovedRequest" + pID).prop("checked") && $("#hf_CanEdit").val() == "1")
                    PaymentRequest_EnableDisableEditing(1);
                else
                    PaymentRequest_EnableDisableEditing(0);
            }


            if (tr.find("td.IsCheck").text() == "true") {
                $('#cbIsCheck').prop("checked", true);
                $('#cbIsCash').prop("checked", false);
            }
            else {
                $('#cbIsCheck').prop("checked", false);
                $('#cbIsCash').prop("checked", true);
            }

            if (_IsCustodySettlement == 0) {
                $(".DisableWithCustody").removeAttr("disabled");
                PaymentRequestDetails_BindTableRows(pInvoiceDetails);
            }
            else {
                $(".DisableWithCustody").attr("disabled", "disabled");
                $("#txtNotes").removeAttr("disabled");

                if (pDefaults.UnEditableCompanyName == "TRM") {
                    $("#txtSettlementDate").removeAttr("disabled");

                }
                else {
                    $("#txtSettlementDate").attr("disabled", "disabled");


                }
                //$("#btnSave").removeAttr("disabled");
                //$("#btn-AddPaymentRequestDetails").removeAttr("disabled");
                //$("#btn-DeletePaymentRequestDetails").removeAttr("disabled");
            }


            //account
            CallGETFunctionWithParameters("/api/PaymentRequest/GetAccountDetails"
                , {
                    pPageNumber: 1
                    , pPageSize: 9999
                    , pWhereClauseJournalVoucherDetails: "WHERE PaymentRequestID=" + pID
                    , pOrderBy: "ID"
                    , pWhereClauseCurrencyDetails: ""

                }
                , function (pData) {
                    DetailsAccount_BindTableRows(JSON.parse(pData[0]));
                    FadePageCover(false);
                }
                , null);

            if (pDefaults.UnEditableCompanyName != "COS") {

                $("#slCurrency").prop('disabled', true);
            }
            else
                $("#slCurrency").prop('disabled', false);

            FadePageCover(false);
        }
        , null);
}

function PaymentRequest_Save() {
    debugger;
    var pModalName = "CheckboxesListModal_SavePaymentRequest";
    var pCheckboxNameAttr = "cbAddedItemID_SavePaymentRequest";
    var pSelectedItemsIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);

    if (pSelectedItemsIDs == "" && pLoggedUserApprovedFromNotifyPaymentRequest == 0)
        swal("Sorry", "You have to select at least one receptionist.");
    else {
        if (ValidateForm("form", "PaymentRequestModal")) {
            FadePageCover(true);

            var pIDList = "";
            var pChargeTypeList = "";
            var pOperationList = "";
            var pHouseIDList = "";
            var pCertificateNumberIDList = "";
            var pTruckingOrderIDList = "";
            var pPartenerTypeIDList = "";
            var pPartenerIDList = "";
            var pisRetrievedList = "";


            var pSupplierList = "";
            var pEstmatedCostList = "";
            var pActualCostList = "";
            var pDescriptionList = "";
            var pCouponList = "";
            var pSupplierInvoiceNo = "";

            var pActualDescriptionList = "";
            var pFilterChargeTypesList = "";
            var pIsSettlementOnlyList = "";
            var pPayableIDList = "";

            var pTaxTypeIDList = "";
            var pDiscountTypeIDList = "";

            var pIsVATFromPRList = "";

            //account
            var pAccount_IDList = "";
            var pSubAccount_IDList = "";
            var pCostCenter_IDList = "";
            var pNotesList = "";
            var pAmountList = "";



            var pDetailsIDList = GetAllIDsAsStringWithNameAttr("tblPaymentRequestDetails", "Delete");
            var pRowIDs = GetAllSelectedChargeTypes("tblPaymentRequestDetails");
            var pDetailsID = '';
            var pDetailsAccountID = '';
            var pCostCenterIDList = '';

            debugger;


            var IsOperationNotEmpty = false;
            var IsCostCenterEmpty =false;
            $("#tblPaymentRequestDetails tbody tr").each(function () {
                pDetailsID += ((pDetailsID == "") ? "" : ",") + ($(this).attr('ID'));

                if ($("#slCostCenter" + $(this).attr('ID')).val() == "" || $("#slCostCenter" + $(this).attr('ID')).val() == "0"
                    || $("#slCostCenter" + $(this).attr('ID')).val() == null)
                    IsCostCenterEmpty = true;

                if ($("#slOperation" + $(this).attr('ID')).val() != "" && $("#slOperation" + $(this).attr('ID')).val() != "0"
                    && $("#slOperation" + $(this).attr('ID')).val() != null)
                    IsOperationNotEmpty = true;
            });

            $("#tblAccount tbody tr").each(function () {
                pDetailsAccountID += ((pDetailsAccountID == "") ? "" : ",") + ($(this).attr('ID'));
            });

            //if (pDetailsAccountID != "" && _IsCustodySettlement == 0) {
            //    var NumberOfDetailsRowsAccount = pDetailsAccountID.split(',').length;
            //    for (var i = 0; i < NumberOfDetailsRowsAccount; i++) {
            //        var currentAccountRowID = pDetailsAccountID.split(",")[i];
            //        //Account
            //        pAccount_IDList += ((pAccount_IDList == "") ? "" : ",") + ($("#slAccount" + currentAccountRowID).val() == "" ? "0" : $("#slAccount" + currentAccountRowID).val() == null ? "0" : $("#slAccount" + currentAccountRowID).val());
            //        pSubAccount_IDList += ((pSubAccount_IDList == "") ? "" : ",") + ($("#slSubAccount" + currentAccountRowID).val() == "" ? "0" : $("#slSubAccount" + currentAccountRowID).val() == null ? "0" : $("#slSubAccount" + currentAccountRowID).val());
            //        pCostCenter_IDList += ((pCostCenter_IDList == "") ? "" : ",") + ($("#slCostCenter" + currentAccountRowID).val() == "" ? "0" : $("#slCostCenter" + currentAccountRowID).val() == null ? "0" : $("#slCostCenter" + currentAccountRowID).val());
            //        pAmountList += ((pAmountList == "") ? "" : ",") + ($("#txtAmountAccount" + currentAccountRowID).val() == "" ? "0" : $("#txtAmountAccount" + currentAccountRowID).val() == null ? "0" : $("#txtAmountAccount" + currentAccountRowID).val());
            //        pNotesList += ((pNotesList == "") ? "" : ",") + ($("#txtNotesAccount" + currentAccountRowID).val() == "" ? "0" : $("#txtNotesAccount" + currentAccountRowID).val() == null ? "0" : $("#txtNotesAccount" + currentAccountRowID).val());

            //    }
            //}
            if (($("#slClient").val() != "0" && $("#slClient").val() != "" && $("#slClient").val() != null)
                &&  IsCostCenterEmpty          //($("#slCostCenterHeader").val() == "0" || $("#slCostCenterHeader").val() == null)
                && $("#hDefaultUnEditableCompanyName").val() == "TRM") {
                swal("Sorry", "Please, Choose costcenter .(برجاء اختيار مركز التكلفة)");
                FadePageCover(false)
            }
           else if ($("#cbIsGeneratedSupplierJV").prop('checked') && IsOperationNotEmpty && $('#slClient').val() != '') {
                swal("Sorry", "Please, not choose operation .(برجاء عد اختيار عملية)");
                FadePageCover(false)
            }
            else if (pDetailsIDList != "" && (pDetailsAccountID != "" && _IsCustodySettlement == 0) && $("#hDefaultUnEditableCompanyName").val() != "COS") {
                swal("Sorry", "Please, Delete Operations .(برجاء حذف تفاصيل العمليات)");
                FadePageCover(false);
            }
            else {
                if (pDetailsIDList != "" && (pDetailsAccountID == "" && _IsCustodySettlement == 0 /*&& $("#hDefaultUnEditableCompanyName").val() != "COS"*/)) {
                    var NumberOfDetailsRows = pDetailsIDList.split(',').length;


                    for (var i = 0; i < NumberOfDetailsRows; i++) {
                        var currentRowID = pDetailsID.split(",")[i];
                        //var currentAccountRowID = pDetailsAccountID.split(",")[i];
                        if (CalcBLPayableID == 0 && !$("#cbFlagChargeType" + currentRowID).prop('checked') && !CheckValueIsValidInput("#slChargeType" + currentRowID)) {
                            swal("Sorry", "Please Choose Charge Type in Row" + (i + 1));
                            FadePageCover(false);
                            return;
                        } else if (CalcBLPayableID ==0 && $("#cbFlagChargeType" + currentRowID).prop('checked') && !CheckValueIsValidInput("#slPayable" + currentRowID)) {
                            swal("Sorry", "Please Choose Payable in Row " + (i + 1));
                            FadePageCover(false);
                            return;
                        }
                        else if (CalcBLPayableID == 0 && IsMESCOCompany  && !CheckValueIsValidInput("#slPayable" + currentRowID)) {
                            swal("Sorry", "Please Choose Payable in Row " + (i + 1));
                            FadePageCover(false);
                            return;
                        }
                        else if (!CheckValueIsValidInput("#slOperation" + currentRowID)) {
                            swal("Sorry", "Please Choose Operation in Row " + (i + 1));
                            FadePageCover(false);
                            return;
                        }

                        pIDList += ((pIDList == "") ? "" : ",") + pDetailsIDList.split(",")[i];

                        pOperationList += ((pOperationList == "") ? "" : ",") + ($("#slOperation" + currentRowID).val() == "0" ? "0" : $("#slOperation" + currentRowID).val() == null ? "0" : $("#slOperation" + currentRowID).val());
                        pHouseIDList += ((pHouseIDList == "") ? "" : ",") + (($("#slHouse" + currentRowID).val() == null || $("#slHouse" + currentRowID).val().trim() == ""  )? "0" : $("#slHouse" + currentRowID).val());
                        //pCertificateNumberIDList += ((pCertificateNumberIDList == "") ? "" : ",") + ($("#slCertificateNumber" + currentRowID).val().trim() == "" ? "0" : $("#slCertificateNumber" + currentRowID).val());
                        pTruckingOrderIDList += ((pTruckingOrderIDList == "") ? "" : ",") + ($("#slTruckingOrder" + currentRowID).val() == "" || $("#slTruckingOrder" + currentRowID).val() == null ? "0" : $("#slTruckingOrder" + currentRowID).val());
                        pSupplierList += ((pSupplierList == "") ? "" : ",") + ($("#slSupplier" + currentRowID).val() == "" ? "0" : $("#slSupplier" + currentRowID).val() == null ? "0" : $("#slSupplier" + currentRowID).val());

                        pEstmatedCostList += ((pEstmatedCostList == "") ? "" : ",") + ($("#txtEstmatedCost" + currentRowID).val().trim() == "" ? "0" : $("#txtEstmatedCost" + currentRowID).val());
                        pSupplierInvoiceNo += ((pSupplierInvoiceNo == "") ? "" : ",") + ($("#txtSupplierInvoiceNo" + currentRowID).val().trim() == "" ? "0" : $("#txtSupplierInvoiceNo" + currentRowID).val());

                        if (_IsCustodySettlement == 1) {
                            pActualDescriptionList += ((pActualDescriptionList == "") ? "" : ",") + ($("#txtActualDescription" + currentRowID).val().trim() == "" ? "0" : $("#txtActualDescription" + currentRowID).val().replace(/,/g, "_").trim());
                            pActualCostList += ((pActualCostList == "") ? "" : ",") + ($("#txtActualCost" + currentRowID).val().trim() == "" ? "0" : $("#txtActualCost" + currentRowID).val());
                            pIsSettlementOnlyList += ((pIsSettlementOnlyList == "") ? "" : ",") + ($("#txtIsSettlementOnly" + currentRowID).val() == "" ? "0" : $("#txtIsSettlementOnly" + currentRowID).val());
                            pPartenerTypeIDList += ((pPartenerTypeIDList == "") ? "" : ",") + ($("#slPartenerType" + currentRowID).val() == "" ? "0" : $("#slPartenerType" + currentRowID).val() == null ? "0" : $("#slPartenerType" + currentRowID).val());
                            pPartenerIDList += ((pPartenerIDList == "") ? "" : ",") + ($("#slPartener" + currentRowID).val() == "" ? "0" : $("#slPartener" + currentRowID).val() == null ? "0" : $("#slPartener" + currentRowID).val());
                            pisRetrievedList += ((pisRetrievedList == "") ? "" : ",") + ($("#isRetrieved" + currentRowID).val());

                        }

                        pCouponList += ((pCouponList == "") ? "" : ",") + ($("#txtCoupon" + currentRowID).val().trim() == "" ? "0" : $("#txtCoupon" + currentRowID).val().replace(/,/g, "_").trim());
                        pDescriptionList += ((pDescriptionList == "") ? "" : ",") + ($("#txtDescription" + currentRowID).val().trim() == "" ? "0" : $("#txtDescription" + currentRowID).val().replace(/,/g, "_").trim());
                        pFilterChargeTypesList += ((pFilterChargeTypesList == "") ? "" : ",") + ($("#cbFlagChargeType" + currentRowID).prop('checked') == "" ? "false" : $("#cbFlagChargeType" + currentRowID).prop('checked'));

                        //  if (_IsCustodySettlement == 0) {
                        if ( pDefaults.UnEditableCompanyName != "MES") {
                            if ($("#cbFlagChargeType" + currentRowID).prop('checked')) {
                                pChargeTypeList += ((pChargeTypeList == "") ? "" : ",") + ($("#slPayable" + currentRowID + ' option:selected').attr("chargetypeid").trim() == "" ? "0" : $("#slPayable" + currentRowID + ' option:selected').attr("chargetypeid"));
                                pPayableIDList += ((pPayableIDList == "") ? "" : ",") + ($('#slPayable' + currentRowID + ' option:selected').val() == "" ? "0" : $('#slPayable' + currentRowID + ' option:selected').val());

                            }
                            else {
                                pChargeTypeList += ((pChargeTypeList == "") ? "" : ",") + ($("#slChargeType" + currentRowID).val().trim() == "" ? "0" : $("#slChargeType" + currentRowID).val());
                                pPayableIDList += ((pPayableIDList == "") ? "" : ",") + "0";
                            }

                        }
                        else {
                            if ($("#cbFlagChargeType" + currentRowID).prop('checked')) {
                                if ($("#slPayable" + currentRowID + " option:selected").attr("chargetypeid") !== undefined) {
                                    // Attribute exists
                                    pChargeTypeList += ((pChargeTypeList == "") ? "" : ",") + ($("#slPayable" + currentRowID + ' option:selected').attr("chargetypeid").trim() == "" ? "0" : $("#slPayable" + currentRowID + ' option:selected').attr("chargetypeid"));
                                } else {
                                    // Attribute does not exist
                                    pChargeTypeList += ((pChargeTypeList == "") ? "" : ",") + ($("#slChargeType" + currentRowID).val().trim() == "" ? "0" : $("#slChargeType" + currentRowID).val());
                                }
                              
                                pPayableIDList += ((pPayableIDList == "") ? "" : ",") + ($('#slPayable' + currentRowID + ' option:selected').val() == "" ? "0" : $('#slPayable' + currentRowID + ' option:selected').val());

                            }
                            else {
                                pChargeTypeList += ((pChargeTypeList == "") ? "" : ",") + ($("#slChargeType" + currentRowID).val().trim() == "" ? "0" : $("#slChargeType" + currentRowID).val());
                                pPayableIDList += ((pPayableIDList == "") ? "" : ",") + "0";
                            }
                        }




                        pTaxTypeIDList += ((pTaxTypeIDList == "") ? "" : ",") + ($("#slTaxVat" + currentRowID).val() == "" ? "0" : $("#slTaxVat" + currentRowID).val() == null ? "0" : $("#slTaxVat" + currentRowID).val());
                        pDiscountTypeIDList += ((pDiscountTypeIDList == "") ? "" : ",") + ($("#slTaxDiscount" + currentRowID).val() == "" ? "0" : $("#slTaxDiscount" + currentRowID).val() == null ? "0" : $("#slTaxDiscount" + currentRowID).val());

                        if (IsMESCOCompany && _IsCustodySettlement == 0) {
                            pIsVATFromPRList += ((pIsVATFromPRList == "") ? "" : ",") + (($("#slTaxVat" + currentRowID).val() > 0 || $("#slTaxDiscount" + currentRowID).val() > 0) ? "true" : "false");
                        }

                        pCostCenterIDList += ((pCostCenterIDList == "") ? "" : ",") + ($("#slCostCenter" + currentRowID).val() == "" ? "0" : $("#slCostCenter" + currentRowID).val() == null ? "0" : $("#slCostCenter" + currentRowID).val());

                        ////Account
                        //pAccount_IDList += ((pAccount_IDList == "") ? "" : ",") + ($("#slAccount" + currentAccountRowID).val() == "" ? "0" : $("#slAccount" + currentAccountRowID).val() == null ? "0" : $("#slAccount" + currentAccountRowID).val());
                        //pSubAccount_IDList += ((pSubAccount_IDList == "") ? "" : ",") + ($("#slSubAccount" + currentAccountRowID).val() == "" ? "0" : $("#slSubAccount" + currentAccountRowID).val() == null ? "0" : $("#slSubAccount" + currentAccountRowID).val());
                        //pCostCenter_IDList += ((pCostCenter_IDList == "") ? "" : ",") + ($("#slCostCenter" + currentAccountRowID).val() == "" ? "0" : $("#slCostCenter" + currentAccountRowID).val() == null ? "0" : $("#slCostCenter" + currentAccountRowID).val());
                        //pAmountList += ((pAmountList == "") ? "" : ",") + ($("#txtAmountAccount" + currentAccountRowID).val() == "" ? "0" : $("#txtAmountAccount" + currentAccountRowID).val() == null ? "0" : $("#txtAmountAccount" + currentAccountRowID).val());
                        //pNotesList += ((pNotesList == "") ? "" : ",") + ($("#txtNotesAccount" + currentAccountRowID).val() == "" ? "0" : $("#txtNotesAccount" + currentAccountRowID).val() == null ? "0" : $("#txtNotesAccount" + currentAccountRowID).val());



                        //}
                        //else
                        //    pPayableIDList += ((pPayableIDList == "") ? "" : ",") + "0";

                    }
                    var pParametersWithValues = {
                        pPaymentRequestID: $("#hID").val() == "" ? 0 : $("#hID").val()
                        , pCode: $("#txtCode").val().trim() == "" ? 0 : $("#txtCode").val().trim()
                        , pCustodyID: $("#slCustody").val()
                        , pRequestDate: ConvertDateFormat($("#txtRequestDate").val())
                        , pCurrencyID: $("#slCurrency").val()
                        , pIsCheck: $("#cbIsCash").prop("checked") ? 0 : 1
                        , pNotes: $("#txtNotes").val().trim() == "" ? 0 : $("#txtNotes").val().trim().toUpperCase()
                        , pTotalEstmatedCost: $("#txtAmount").val().trim() == "" ? 0 : $("#txtAmount").val()
                        , pTotalActualCost: (_IsCustodySettlement == 1 ? ($("#txtTotalActualCost").val().trim() == "" ? 0 : $("#txtTotalActualCost").val()) : 0)
                        , pTotalDiff: (_IsCustodySettlement == 1 ? (($("#txtTotalActualCost").val().trim() == "" ? 0 : $("#txtTotalActualCost").val()) - ($("#txtAmount").val().trim() == "" ? 0 : $("#txtAmount").val())) : 0)
                        , pIDList: pIDList
                        , pChargeTypeList: pChargeTypeList
                        , pOperationList: pOperationList
                        , pSupplierList: pSupplierList
                        , pEstmatedCostList: pEstmatedCostList
                        , pSupplierInvoiceNo: pSupplierInvoiceNo

                        , pCouponList: pCouponList
                        , pDescriptionList: pDescriptionList
                        , pFilterChargeTypesList: pFilterChargeTypesList
                        , pActualCostList: (_IsCustodySettlement == 1 ? pActualCostList : "0")
                        , pIsCustodySettlement: _IsCustodySettlement
                        , pActualDescriptionList: (_IsCustodySettlement == 1 ? pActualDescriptionList : "0")
                        , pSettlementDate: ConvertDateFormat($('#txtSettlementDate').val())
                        , pIsSettlementOnlyList: (_IsCustodySettlement == 1 ? pIsSettlementOnlyList : "0")
                        , pSelectedItemsIDs: pSelectedItemsIDs
                        , pHouseIDList: pHouseIDList
                        , pCertificateNumberIDList: "0"
                        , pTruckingOrderIDList: pTruckingOrderIDList
                        , pPartenerTypeIDList: (_IsCustodySettlement == 1 ? pPartenerTypeIDList : "0")
                        , pPartenerIDList: (_IsCustodySettlement == 1 ? pPartenerIDList : "0")
                        , pIsNotifyOrNot: (pLoggedUserApprovedFromNotifyPaymentRequest == 1 ? pLoggedUserApprovedFromNotifyPaymentRequest : "0")

                        , pChargeTypeGroupID: $("#slServiceCategory").val() == "0" ? 0 : $("#slServiceCategory").val()
                        , pAttache: $("#txtAttach").val().trim() == "" ? 0 : $("#txtAttach").val().trim()
                        , pPayment: $("#txtPayment").val().trim() == "" ? 0 : $("#txtPayment").val().trim()
                        , pIssuedTo: $("#txtIssuedTo").val().trim() == "" ? 0 : $("#txtIssuedTo").val().trim()
                        , pPaymentComboID: ($("#slPaymentCombo").val() == "0" || $("#slPaymentCombo").val() == null) ? 0 : $("#slPaymentCombo").val()
                        , pIssuedToCmbo: ($("#slIssuedToCmbo").val() == "0" || $("#slIssuedToCmbo").val() == null) ? 0 : $("#slIssuedToCmbo").val()


                        , pPayableIDList: pPayableIDList
                        , pTaxTypeIDList: pTaxTypeIDList
                        , pDiscountTypeIDList: pDiscountTypeIDList
                        , pIsVATFromPRList: pIsVATFromPRList
                        , pAccount_IDList: pAccount_IDList
                        , pSubAccount_IDList: pSubAccount_IDList
                        , pCostCenter_IDList: pCostCenter_IDList
                        , pNotesList: pNotesList
                        , pAmountList: pAmountList

                        , pisDiff: (pDefaults.UnEditableCompanyName == "MES" || pDefaults.UnEditableCompanyName == "MED") ? 1 : 0

                        , pPartnerTypeID: (pDefaults.UnEditableCompanyName == "COS" ? $("#tblPaymentRequestDetails tbody td.Supplier option:selected").attr("partnertypeid") : ($("#slPartnerType").val() == "0" || $("#slPartnerType").val() == null) ? 0 : $("#slPartnerType").val()) 
                        , pPartnerID: (pDefaults.UnEditableCompanyName == "COS" ? $("#tblPaymentRequestDetails tbody td.Supplier option:selected").attr("partnerid") : ($("#slClient").val() == "0" || $("#slClient").val() == null) ? 0 : $("#slClient").val()) 
                        , pCostCenterHeaderID: ($("#slCostCenterHeader").val() == "0" || $("#slCostCenterHeader").val() == null) ? 0 : $("#slCostCenterHeader").val()
                        , pNotesPayable: ($("#slNotesPayable").val() == "0" || $("#slNotesPayable").val() == null) ? 0 : $("#slNotesPayable").val()
                        , pCostCenterIDList: pCostCenterIDList
                        , pIsGeneratedSupplierJV: $("#cbIsGeneratedSupplierJV").prop('checked')
                        , pPartnerIDVendor: ($("#slClientVendor").val() == "0" || $("#slClientVendor").val() == null) ? 0 : $("#slClientVendor").val()
                        , pBankID: $("#slIssuedToCmbo").val()
                        , pDiscount: ($('#txtDiscount').val() == "" || $('#txtDiscount').val() == null || $('#txtDiscount').val() == "0" ? 0 : $('#txtDiscount').val())
                        , pIsDirect: $("#cbIsDirectPR").prop('checked')
                        , pIsCalcBL: IsCalcBl
                        , pCalcBLPayableID: CalcBLPayableID
                        , pisRetrievedList: (_IsCustodySettlement == 1 ? pisRetrievedList : "0")

                    };
                    CallPOSTFunctionWithParameters("/api/PaymentRequest/Save", pParametersWithValues
                        , function (pData) {
                            var _ReturnedMessage = pData[0];
                            if (_ReturnedMessage == "") {
                                PaymentRequest_LoadingWithPaging();
                                jQuery("#PaymentRequestModal").modal("hide");
                                swal("Success", "Saved successfully.");
                                //Approve_Notify();
                                FadePageCover(false);
                                jQuery('#CheckboxesListModal_SavePaymentRequest').modal('hide')
                                //PaymentRequest_LoadingWithPaging();


                                LoadDefaults("/api/Defaults/LoadAll", " WHERE 1=1 ");
                                pLoggedUserApprovedFromNotifyPaymentRequest = 0;
                            }
                            else {
                                swal("Sorry", _ReturnedMessage);
                                FadePageCover(false);
                            }
                        }
                        , null);
                }

                else if (pDetailsIDList != "" && pDetailsAccountID == "") {
                    var NumberOfDetailsRows = pDetailsIDList.split(',').length;
                    for (var i = 0; i < NumberOfDetailsRows; i++) {
                        var currentRowID = pDetailsID.split(",")[i];
                        //var currentAccountRowID = pDetailsAccountID.split(",")[i];
                        if (!$("#cbFlagChargeType" + currentRowID).prop('checked') && !CheckValueIsValidInput("#slChargeType" + currentRowID)) {
                            swal("Sorry", "Please Choose Charge Type in Row" + (i + 1));
                            FadePageCover(false);
                            return;
                        } else if ($("#cbFlagChargeType" + currentRowID).prop('checked') && !CheckValueIsValidInput("#slPayable" + currentRowID)) {
                            swal("Sorry", "Please Choose Payable in Row " + (i + 1));
                            FadePageCover(false);
                            return;

                        }
                        else if (IsMESCOCompany && IsCalcBl == 0 && !CheckValueIsValidInput("#slPayable" + currentRowID)) {
                        swal("Sorry", "Please Choose Payable in Row " + (i + 1));
                        FadePageCover(false);
                        return;
                    } 
                        else if (!CheckValueIsValidInput("#slOperation" + currentRowID)) {
                            swal("Sorry", "Please Choose Operation in Row " + (i + 1));
                            FadePageCover(false);
                            return;
                        }

                        pIDList += ((pIDList == "") ? "" : ",") + pDetailsIDList.split(",")[i];

                        pOperationList += ((pOperationList == "") ? "" : ",") + ($("#slOperation" + currentRowID).val() == "0" ? "0" : $("#slOperation" + currentRowID).val() == null ? "0" : $("#slOperation" + currentRowID).val());
                        pHouseIDList += ((pHouseIDList == "") ? "" : ",") + ($("#slHouse" + currentRowID).val().trim() == "" ? "0" : $("#slHouse" + currentRowID).val());
                        //pCertificateNumberIDList += ((pCertificateNumberIDList == "") ? "" : ",") + ($("#slCertificateNumber" + currentRowID).val().trim() == "" ? "0" : $("#slCertificateNumber" + currentRowID).val());
                        pTruckingOrderIDList += ((pTruckingOrderIDList == "") ? "" : ",") + ($("#slTruckingOrder" + currentRowID).val() == "" || $("#slTruckingOrder" + currentRowID).val() == null ? "0" : $("#slTruckingOrder" + currentRowID).val());
                        pSupplierList += ((pSupplierList == "") ? "" : ",") + ($("#slSupplier" + currentRowID).val() == "" ? "0" : $("#slSupplier" + currentRowID).val() == null ? "0" : $("#slSupplier" + currentRowID).val());

                        pEstmatedCostList += ((pEstmatedCostList == "") ? "" : ",") + ($("#txtEstmatedCost" + currentRowID).val().trim() == "" ? "0" : $("#txtEstmatedCost" + currentRowID).val());
                        pSupplierInvoiceNo += ((pSupplierInvoiceNo == "") ? "" : ",") + ($("#txtSupplierInvoiceNo" + currentRowID).val().trim() == "" ? "0" : $("#txtSupplierInvoiceNo" + currentRowID).val());

                        if (_IsCustodySettlement == 1) {
                            pActualDescriptionList += ((pActualDescriptionList == "") ? "" : ",") + ($("#txtActualDescription" + currentRowID).val().trim() == "" ? "0" : $("#txtActualDescription" + currentRowID).val().replace(/,/g, "_").trim());
                            pActualCostList += ((pActualCostList == "") ? "" : ",") + ($("#txtActualCost" + currentRowID).val().trim() == "" ? "0" : $("#txtActualCost" + currentRowID).val());
                            pIsSettlementOnlyList += ((pIsSettlementOnlyList == "") ? "" : ",") + ($("#txtIsSettlementOnly" + currentRowID).val() == "" ? "0" : $("#txtIsSettlementOnly" + currentRowID).val());
                            pPartenerTypeIDList += ((pPartenerTypeIDList == "") ? "" : ",") + ($("#slPartenerType" + currentRowID).val() == "" ? "0" : $("#slPartenerType" + currentRowID).val() == null ? "0" : $("#slPartenerType" + currentRowID).val());
                            pPartenerIDList += ((pPartenerIDList == "") ? "" : ",") + ($("#slPartener" + currentRowID).val() == "" ? "0" : $("#slPartener" + currentRowID).val() == null ? "0" : $("#slPartener" + currentRowID).val());
                            pisRetrievedList += ((pisRetrievedList == "") ? "" : ",") + ($("#isRetrieved" + currentRowID).val());

                        }

                        pCouponList += ((pCouponList == "") ? "" : ",") + ($("#txtCoupon" + currentRowID).val().trim() == "" ? "0" : $("#txtCoupon" + currentRowID).val().replace(/,/g, "_").trim());
                        pDescriptionList += ((pDescriptionList == "") ? "" : ",") + ($("#txtDescription" + currentRowID).val().trim() == "" ? "0" : $("#txtDescription" + currentRowID).val().replace(/,/g, "_").trim());
                        pFilterChargeTypesList += ((pFilterChargeTypesList == "") ? "" : ",") + ($("#cbFlagChargeType" + currentRowID).prop('checked') == "" ? "false" : $("#cbFlagChargeType" + currentRowID).prop('checked'));

                        //  if (_IsCustodySettlement == 0) {
                        if ($("#cbFlagChargeType" + currentRowID).prop('checked') && pDefaults.UnEditableCompanyName != 'COS') {
                           // pChargeTypeList += ((pChargeTypeList == "") ? "" : ",") + ($("#slPayable" + currentRowID + ' option:selected').attr("chargetypeid").trim() == "" ? "0" : $("#slPayable" + currentRowID + ' option:selected').attr("chargetypeid"));

                            if ($("#slPayable" + currentRowID + " option:selected").attr("chargetypeid") !== undefined) {
                                // Attribute exists
                                pChargeTypeList += ((pChargeTypeList == "") ? "" : ",") + ($("#slPayable" + currentRowID + ' option:selected').attr("chargetypeid").trim() == "" ? "0" : $("#slPayable" + currentRowID + ' option:selected').attr("chargetypeid"));
                            } else {
                                // Attribute does not exist
                                pChargeTypeList += ((pChargeTypeList == "") ? "" : ",") + ($("#slChargeType" + currentRowID).val().trim() == "" ? "0" : $("#slChargeType" + currentRowID).val());
                            }

                            pPayableIDList += ((pPayableIDList == "") ? "" : ",") + ($('#slPayable' + currentRowID + ' option:selected').val() == "" ? "0" : $('#slPayable' + currentRowID + ' option:selected').val());

                        }
                        else {
                            pChargeTypeList += ((pChargeTypeList == "") ? "" : ",") + ($("#slChargeType" + currentRowID).val().trim() == "" ? "0" : $("#slChargeType" + currentRowID).val());
                            pPayableIDList += ((pPayableIDList == "") ? "" : ",") + "0";
                        }



                        pTaxTypeIDList += ((pTaxTypeIDList == "") ? "" : ",") + ($("#slTaxVat" + currentRowID).val() == "" ? "0" : $("#slTaxVat" + currentRowID).val() == null ? "0" : $("#slTaxVat" + currentRowID).val());
                        pDiscountTypeIDList += ((pDiscountTypeIDList == "") ? "" : ",") + ($("#slTaxDiscount" + currentRowID).val() == "" ? "0" : $("#slTaxDiscount" + currentRowID).val() == null ? "0" : $("#slTaxDiscount" + currentRowID).val());
                        if (IsMESCOCompany && _IsCustodySettlement == 1) {
                            pIsVATFromPRList += ((pIsVATFromPRList == "") ? "" : ",") + ($("#txtIsVATFromPRForm" + currentRowID).val());
                        }

                        pCostCenterIDList += ((pCostCenterIDList == "") ? "" : ",") + ($("#slCostCenter" + currentRowID).val() == "" ? "0" : $("#slCostCenter" + currentRowID).val() == null ? "0" : $("#slCostCenter" + currentRowID).val());
                        ////Account
                        //pAccount_IDList += ((pAccount_IDList == "") ? "" : ",") + ($("#slAccount" + currentAccountRowID).val() == "" ? "0" : $("#slAccount" + currentAccountRowID).val() == null ? "0" : $("#slAccount" + currentAccountRowID).val());
                        //pSubAccount_IDList += ((pSubAccount_IDList == "") ? "" : ",") + ($("#slSubAccount" + currentAccountRowID).val() == "" ? "0" : $("#slSubAccount" + currentAccountRowID).val() == null ? "0" : $("#slSubAccount" + currentAccountRowID).val());
                        //pCostCenter_IDList += ((pCostCenter_IDList == "") ? "" : ",") + ($("#slCostCenter" + currentAccountRowID).val() == "" ? "0" : $("#slCostCenter" + currentAccountRowID).val() == null ? "0" : $("#slCostCenter" + currentAccountRowID).val());
                        //pAmountList += ((pAmountList == "") ? "" : ",") + ($("#txtAmountAccount" + currentAccountRowID).val() == "" ? "0" : $("#txtAmountAccount" + currentAccountRowID).val() == null ? "0" : $("#txtAmountAccount" + currentAccountRowID).val());
                        //pNotesList += ((pNotesList == "") ? "" : ",") + ($("#txtNotesAccount" + currentAccountRowID).val() == "" ? "0" : $("#txtNotesAccount" + currentAccountRowID).val() == null ? "0" : $("#txtNotesAccount" + currentAccountRowID).val());



                        //}
                        //else
                        //    pPayableIDList += ((pPayableIDList == "") ? "" : ",") + "0";

                    }
                    var pParametersWithValues = {
                        pPaymentRequestID: $("#hID").val() == "" ? 0 : $("#hID").val()
                        , pCode: $("#txtCode").val().trim() == "" ? 0 : $("#txtCode").val().trim()
                        , pCustodyID: $("#slCustody").val()
                        , pRequestDate: ConvertDateFormat($("#txtRequestDate").val())
                        , pCurrencyID: $("#slCurrency").val()
                        , pIsCheck: $("#cbIsCash").prop("checked") ? 0 : 1
                        , pNotes: $("#txtNotes").val().trim() == "" ? 0 : $("#txtNotes").val().trim().toUpperCase()
                        , pTotalEstmatedCost: $("#txtAmount").val().trim() == "" ? 0 : $("#txtAmount").val()
                        , pTotalActualCost: (_IsCustodySettlement == 1 ? ($("#txtTotalActualCost").val().trim() == "" ? 0 : $("#txtTotalActualCost").val()) : 0)
                        , pTotalDiff: (_IsCustodySettlement == 1 ? (($("#txtTotalActualCost").val().trim() == "" ? 0 : $("#txtTotalActualCost").val()) - ($("#txtAmount").val().trim() == "" ? 0 : $("#txtAmount").val())) : 0)
                        , pIDList: pIDList
                        , pChargeTypeList: pChargeTypeList
                        , pOperationList: pOperationList
                        , pSupplierList: pSupplierList
                        , pEstmatedCostList: pEstmatedCostList
                        , pSupplierInvoiceNo: pSupplierInvoiceNo

                        , pCouponList: pCouponList
                        , pDescriptionList: pDescriptionList
                        , pFilterChargeTypesList: pFilterChargeTypesList
                        , pActualCostList: (_IsCustodySettlement == 1 ? pActualCostList : "0")
                        , pIsCustodySettlement: _IsCustodySettlement
                        , pActualDescriptionList: (_IsCustodySettlement == 1 ? pActualDescriptionList : "0")
                        , pSettlementDate: ConvertDateFormat($('#txtSettlementDate').val())
                        , pIsSettlementOnlyList: (_IsCustodySettlement == 1 ? pIsSettlementOnlyList : "0")
                        , pSelectedItemsIDs: pSelectedItemsIDs
                        , pHouseIDList: pHouseIDList
                        , pCertificateNumberIDList: "0"
                        , pTruckingOrderIDList: pTruckingOrderIDList
                        , pPartenerTypeIDList: (_IsCustodySettlement == 1 ? pPartenerTypeIDList : "0")
                        , pPartenerIDList: (_IsCustodySettlement == 1 ? pPartenerIDList : "0")
                        , pIsNotifyOrNot: (pLoggedUserApprovedFromNotifyPaymentRequest == 1 ? pLoggedUserApprovedFromNotifyPaymentRequest : "0")

                        , pChargeTypeGroupID: $("#slServiceCategory").val() == "0" ? 0 : $("#slServiceCategory").val()
                        , pAttache: $("#txtAttach").val().trim() == "" ? 0 : $("#txtAttach").val().trim()
                        , pPayment: $("#txtPayment").val().trim() == "" ? 0 : $("#txtPayment").val().trim()
                        , pIssuedTo: $("#txtIssuedTo").val().trim() == "" ? 0 : $("#txtIssuedTo").val().trim()
                        , pPaymentComboID: ($("#slPaymentCombo").val() == "0" || $("#slPaymentCombo").val() == null) ? 0 : $("#slPaymentCombo").val()
                        , pIssuedToCmbo: ($("#slIssuedToCmbo").val() == "0" || $("#slIssuedToCmbo").val() == null) ? 0 : $("#slIssuedToCmbo").val()


                        , pPayableIDList: pPayableIDList
                        , pTaxTypeIDList: pTaxTypeIDList
                        , pDiscountTypeIDList: pDiscountTypeIDList
                        , pIsVATFromPRList: pIsVATFromPRList
                        , pAccount_IDList: pAccount_IDList
                        , pSubAccount_IDList: pSubAccount_IDList
                        , pCostCenter_IDList: pCostCenter_IDList
                        , pNotesList: pNotesList
                        , pAmountList: pAmountList

                        , pisDiff: (pDefaults.UnEditableCompanyName == "MES" || pDefaults.UnEditableCompanyName == "MED" )? 1 : 0

                        , pPartnerTypeID: ($("#slPartnerType").val() == "0" || $("#slPartnerType").val() == null) ? 0 : $("#slPartnerType").val()
                        , pPartnerID: ($("#slClient").val() == "0" || $("#slClient").val() == null) ? 0 : $("#slClient").val()
                        , pCostCenterHeaderID: ($("#slCostCenterHeader").val() == "0" || $("#slCostCenterHeader").val() == null) ? 0 : $("#slCostCenterHeader").val()
                        , pNotesPayable: ($("#slNotesPayable").val() == "0" || $("#slNotesPayable").val() == null) ? 0 : $("#slNotesPayable").val()
                        , pCostCenterIDList: pCostCenterIDList
                        , pPartnerIDVendor: ($("#slClientVendor").val() == "0" || $("#slClientVendor").val() == null) ? 0 : $("#slClientVendor").val()
                        , pIsDirect: $("#cbIsDirectPR").prop('checked')
                        , pIsCalcBL: IsCalcBl
                        , pCalcBLPayableID: CalcBLPayableID
                        , pisRetrievedList: (_IsCustodySettlement == 1 ? pisRetrievedList : "0")

                    };
                    CallPOSTFunctionWithParameters("/api/PaymentRequest/Save", pParametersWithValues
                        , function (pData) {
                            var _ReturnedMessage = pData[0];
                            if (_ReturnedMessage == "") {
                                PaymentRequest_LoadingWithPaging();
                                jQuery("#PaymentRequestModal").modal("hide");
                                swal("Success", "Saved successfully.");
                                //Approve_Notify();
                                FadePageCover(false);
                                jQuery('#CheckboxesListModal_SavePaymentRequest').modal('hide')
                                //PaymentRequest_LoadingWithPaging();


                                LoadDefaults("/api/Defaults/LoadAll", " WHERE 1=1 ");
                                pLoggedUserApprovedFromNotifyPaymentRequest = 0;
                            }
                            else {
                                swal("Sorry", _ReturnedMessage);
                                FadePageCover(false);
                            }
                        }
                        , null);
                }

                else if (pDetailsAccountID != "" && _IsCustodySettlement == 0 && $("#hDefaultUnEditableCompanyName").val() != "COS") {
                    var NumberOfDetailsRowsAccount = pDetailsAccountID.split(',').length;
                    for (var i = 0; i < NumberOfDetailsRowsAccount; i++) {
                        var currentAccountRowID = pDetailsAccountID.split(",")[i];
                        //Account
                        pAccount_IDList += ((pAccount_IDList == "") ? "" : ",") + ($("#slAccount" + currentAccountRowID).val() == "" ? "0" : $("#slAccount" + currentAccountRowID).val() == null ? "0" : $("#slAccount" + currentAccountRowID).val());
                        pSubAccount_IDList += ((pSubAccount_IDList == "") ? "" : ",") + ($("#slSubAccount" + currentAccountRowID).val() == "" ? "0" : $("#slSubAccount" + currentAccountRowID).val() == null ? "0" : $("#slSubAccount" + currentAccountRowID).val());
                        pCostCenter_IDList += ((pCostCenter_IDList == "") ? "" : ",") + ($("#slCostCenter" + currentAccountRowID).val() == "" ? "0" : $("#slCostCenter" + currentAccountRowID).val() == null ? "0" : $("#slCostCenter" + currentAccountRowID).val());
                        pAmountList += ((pAmountList == "") ? "" : ",") + ($("#txtAmountAccount" + currentAccountRowID).val() == "" ? "0" : $("#txtAmountAccount" + currentAccountRowID).val() == null ? "0" : $("#txtAmountAccount" + currentAccountRowID).val());
                        pNotesList += ((pNotesList == "") ? "" : ",") + ($("#txtNotesAccount" + currentAccountRowID).val() == "" ? "0" : $("#txtNotesAccount" + currentAccountRowID).val() == null ? "0" : $("#txtNotesAccount" + currentAccountRowID).val());

                    }
                    var pParametersWithValues = {
                        pPaymentRequestID: $("#hID").val() == "" ? 0 : $("#hID").val()
                        , pCode: $("#txtCode").val().trim() == "" ? 0 : $("#txtCode").val().trim()
                        , pCustodyID: $("#slCustody").val()
                        , pRequestDate: ConvertDateFormat($("#txtRequestDate").val())
                        , pCurrencyID: $("#slCurrency").val()
                        , pIsCheck: $("#cbIsCash").prop("checked") ? 0 : 1
                        , pNotes: $("#txtNotes").val().trim() == "" ? 0 : $("#txtNotes").val().trim().toUpperCase()
                        , pTotalEstmatedCost: $("#txtAmount").val().trim() == "" ? 0 : $("#txtAmount").val()
                        , pTotalActualCost: (_IsCustodySettlement == 1 ? ($("#txtTotalActualCost").val().trim() == "" ? 0 : $("#txtTotalActualCost").val()) : 0)
                        , pTotalDiff: (_IsCustodySettlement == 1 ? (($("#txtTotalActualCost").val().trim() == "" ? 0 : $("#txtTotalActualCost").val()) - ($("#txtAmount").val().trim() == "" ? 0 : $("#txtAmount").val())) : 0)
                        , pIDList: pIDList
                        , pChargeTypeList: pChargeTypeList
                        , pOperationList: pOperationList
                        , pSupplierList: pSupplierList
                        , pEstmatedCostList: pEstmatedCostList
                        , pSupplierInvoiceNo: pSupplierInvoiceNo

                        , pCouponList: pCouponList
                        , pDescriptionList: pDescriptionList
                        , pFilterChargeTypesList: pFilterChargeTypesList
                        , pActualCostList: (_IsCustodySettlement == 1 ? pActualCostList : "0")
                        , pIsCustodySettlement: _IsCustodySettlement
                        , pActualDescriptionList: (_IsCustodySettlement == 1 ? pActualDescriptionList : "0")
                        , pSettlementDate: ConvertDateFormat($('#txtSettlementDate').val())
                        , pIsSettlementOnlyList: (_IsCustodySettlement == 1 ? pIsSettlementOnlyList : "0")
                        , pSelectedItemsIDs: pSelectedItemsIDs
                        , pHouseIDList: pHouseIDList
                        , pCertificateNumberIDList: "0"
                        , pTruckingOrderIDList: pTruckingOrderIDList
                        , pPartenerTypeIDList: (_IsCustodySettlement == 1 ? pPartenerTypeIDList : "0")
                        , pPartenerIDList: (_IsCustodySettlement == 1 ? pPartenerIDList : "0")
                        , pIsNotifyOrNot: (pLoggedUserApprovedFromNotifyPaymentRequest == 1 ? pLoggedUserApprovedFromNotifyPaymentRequest : "0")

                        , pChargeTypeGroupID: $("#slServiceCategory").val() == "0" ? 0 : $("#slServiceCategory").val()
                        , pAttache: $("#txtAttach").val().trim() == "" ? 0 : $("#txtAttach").val().trim()
                        , pPayment: $("#txtPayment").val().trim() == "" ? 0 : $("#txtPayment").val().trim()
                        , pIssuedTo: $("#txtIssuedTo").val().trim() == "" ? 0 : $("#txtIssuedTo").val().trim()
                        , pPaymentComboID: ($("#slPaymentCombo").val() == "0" || $("#slPaymentCombo").val() == null) ? 0 : $("#slPaymentCombo").val()
                        , pIssuedToCmbo: ($("#slIssuedToCmbo").val() == "0" || $("#slIssuedToCmbo").val() == null) ? 0 : $("#slIssuedToCmbo").val()


                        , pPayableIDList: pPayableIDList
                        , pTaxTypeIDList: pTaxTypeIDList
                        , pDiscountTypeIDList: pDiscountTypeIDList

                        , pAccount_IDList: pAccount_IDList
                        , pSubAccount_IDList: pSubAccount_IDList
                        , pCostCenter_IDList: pCostCenter_IDList
                        , pNotesList: pNotesList
                        , pAmountList: pAmountList

                        , pisDiff: (pDefaults.UnEditableCompanyName == "MES" || pDefaults.UnEditableCompanyName == "MED") ? 1 : 0

                        , pPartnerTypeID: ($("#slPartnerType").val() == "0" || $("#slPartnerType").val() == null) ? 0 : $("#slPartnerType").val()
                        , pPartnerID: ($("#slClient").val() == "0" || $("#slClient").val() == null) ? 0 : $("#slClient").val()
                        , pCostCenterHeaderID: ($("#slCostCenterHeader").val() == "0" || $("#slCostCenterHeader").val() == null) ? 0 : $("#slCostCenterHeader").val()
                        , pNotesPayable: ($("#slNotesPayable").val() == "0" || $("#slNotesPayable").val() == null) ? 0 : $("#slNotesPayable").val()
                        , pPartnerIDVendor: ($("#slClientVendor").val() == "0" || $("#slClientVendor").val() == null) ? 0 : $("#slClientVendor").val()
                        , pIsDirect: $("#cbIsDirectPR").prop('checked')

                    };
                    CallPOSTFunctionWithParameters("/api/PaymentRequest/Save", pParametersWithValues
                        , function (pData) {
                            var _ReturnedMessage = pData[0];
                            if (_ReturnedMessage == "") {
                                PaymentRequest_LoadingWithPaging();
                                jQuery("#PaymentRequestModal").modal("hide");
                                swal("Success", "Saved successfully.");
                                //Approve_Notify();
                                FadePageCover(false);
                                jQuery('#CheckboxesListModal_SavePaymentRequest').modal('hide')
                                //PaymentRequest_LoadingWithPaging();


                                LoadDefaults("/api/Defaults/LoadAll", " WHERE 1=1 ");
                                pLoggedUserApprovedFromNotifyPaymentRequest = 0;
                            }
                            else {
                                swal("Sorry", _ReturnedMessage);
                                FadePageCover(false);
                            }
                        }
                        , null);
                }
                else {
                    swal("Sorry", "Please, Add at least one Charge Type.(برجاء ادخال التفاصيل)");
                    FadePageCover(false);
                }
            }



        }
    }
}



function PaymentRequest_Print(pID) {
    debugger;
    if (pID == 0)
        pID = $("#hID").val();
    if (pID == "") //this means new without saving
        swal("Sorry", "Please, Add at least one invoice item.");
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
        else if ($("#hDefaultUnEditableCompanyName").val() != "NEW" && $("#hDefaultUnEditableCompanyName").val() != "COS" && $("#hDefaultUnEditableCompanyName").val() != "BED") {
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
        else if ($("#hDefaultUnEditableCompanyName").val() == "BED") {
            var arr_Keys = new Array();
            var arr_Values = new Array();
            arr_Keys.push("ID");
            arr_Values.push(pID);

            var pParametersWithValues =
            {
                arr_Keys: arr_Keys
                , arr_Values: arr_Values
                , pTitle: "Payment Request"
                , pReportName: (_IsCustodySettlement ? "Rep_A_Payment_Request_Settlement" : "Rep_A_Payment_RequestAccount_BED")
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

function PaymentRequest_Copy(pID) {
    debugger;
    $("#tblPaymentRequestDetails tbody").html("");
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/PaymentRequest/LoadDetails", { pHeaderID: pID, pIsCustodySettlement: _IsCustodySettlement }
        , function (pData) {
            jQuery("#PaymentRequestModal").modal("show");
            var pInvoiceDetails = JSON.parse(pData[0]);
            //if (_IsCustodySettlement == 1) {
            //    PaymentRequest_ClearAllControls();
            //    CustodySettlementDetails_BindTableRows(pInvoiceDetails);
            //}
            var d = new Date();
            var month = d.getMonth() + 1;
            var day = d.getDate();
            var output = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + d.getFullYear();
            $('#txtSettlementDate').val(output);


            var tr = $("#tblPaymentRequest tr[ID='" + pID + "']");

            //$("#hID").val(pID);
            $("#hID").val(0);
            $("#lblShown").html(": " + tr.find("td.Code").text() == "" ? "0" : tr.find("td.Code").text());
            //$("#txtCode").val(tr.find("td.Code").text() == "" ? "0" : tr.find("td.Code").text());
            $("#txtCode").val("")
            $("#slCustody").val(tr.find("td.CustodyID").text() == "" ? "0" : tr.find("td.CustodyID").text());
            $("#txtRequestDate").val(tr.find("td.RequestDate").text() == "" ? "0" : tr.find("td.RequestDate").text());
            $("#slCurrency").val(tr.find("td.CurrencyID").text() == "" ? "0" : tr.find("td.CurrencyID").text());
            $("#txtAmount").val(tr.find("td.TotalEstmatedCost").text() == "" ? "0" : tr.find("td.TotalEstmatedCost").text());
            $("#txtTotalActualCost").val(tr.find("td.TotalActualCost").text() == "" ? "0" : tr.find("td.TotalActualCost").text());
            $("#txtSettlementAmount").val(parseFloat($("#txtTotalActualCost").val()) - parseFloat($("#txtAmount").val()))
            $("#txtNotes").val(tr.find("td.Notes").text() == "" ? "0" : tr.find("td.Notes").text());


            if (!$("#cbIsApprovedRequest" + pID).prop("checked") && $("#hf_CanEdit").val() == "1")
                PaymentRequest_EnableDisableEditing(1);
            else
                PaymentRequest_EnableDisableEditing(0);

            if (tr.find("td.IsCheck").text() == "true") {
                $('#cbIsCheck').prop("checked", true);
                $('#cbIsCash').prop("checked", false);
            }
            else {
                $('#cbIsCheck').prop("checked", false);
                $('#cbIsCash').prop("checked", true);
            }

            $("#btn-AddPaymentRequestDetails").removeAttr("disabled");
            $("#btn-DeletePaymentRequestDetails").removeAttr("disabled");
            $("#btnSave").removeAttr("disabled");

            if (_IsCustodySettlement == 0) {
                $(".DisableWithCustody").removeAttr("disabled");
                PaymentRequestDetails_BindTableRows_ForCopy(pInvoiceDetails);
            }
            else {
                $(".DisableWithCustody").attr("disabled", "disabled");
                $("#btnSave").removeAttr("disabled");
                $("#btn-AddPaymentRequestDetails").removeAttr("disabled");
                $("#btn-DeletePaymentRequestDetails").removeAttr("disabled");


                if (pDefaults.UnEditableCompanyName == "TRM") {
                    $("#txtSettlementDate").removeAttr("disabled");

                }
                else {
                    $("#txtSettlementDate").attr("disabled", "disabled");


                }
            }

            FadePageCover(false);
        }
        , null);
}

function PaymentRequest_DeleteList(callback) {

    debugger;
    var pID = 0;
    var ErrorMsg = "";
    $('#tblPaymentRequest' + ' td').find('input[name="Delete"]:checked').each(function () {
        pID = ($(this).attr('value'));
        if (pID > 0) {
            var tr = $("#tblPaymentRequest tr[ID='" + pID + "']");
            var IsIncludedInCombinedPaymentRequest = tr.find("td.IsIncludedInCombinedPaymentRequest").text();
            if (IsIncludedInCombinedPaymentRequest == 1) {
                ErrorMsg = "Payment Request code :" + tr.find("td.Code").text() + " exist in combined ";
                swal(ErrorMsg, "", "warning");
            }
              
        }
    });

    if (ErrorMsg == "") {

    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblPaymentRequest') != "")
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


                CallGETFunctionWithParameters("/api/PaymentRequest/Delete"
                    , { "pDeletedPaymentRequestIDs": GetAllSelectedIDsAsString('tblPaymentRequest') }
                    , function (pData) {
                        if (JSON.parse(pData[0])) {
                            PaymentRequest_LoadingWithPaging();
                        }
                        else {
                            showDeleteFailMessage = true
                            strDeleteFailMessage = pData[1];
                            PaymentRequest_LoadingWithPaging();
                        }
                    });
                });

    }
}
function _PaymentRequest_ApproveList(callback) {
    //Confirmation message to delete
    debugger;
    if (GetAllSelectedIDsAsString('tblPaymentRequest') != "")
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
                CallGETFunctionWithParameters("/api/PaymentRequest/Approve"
                    , { "pDeletedPaymentRequestIDs": GetAllSelectedIDsAsString('tblPaymentRequest') }
                    , function (pData) {
                        if (pData == "") {
                            swal("Success", "approved successfully.");
                            PaymentRequest_LoadingWithPaging();
                        }
                        else {
                            showDeleteFailMessage = true

                            var pMessageFromSP = pData;

                            var word = "Transaction";
                            var index = pMessageFromSP.indexOf(word);
                            if (index !== -1)
                                pMessageFromSP = pMessageFromSP.substring(0, index + word.length - 12);

                            strDeleteFailMessage = pMessageFromSP;
                            PaymentRequest_LoadingWithPaging();
                        }

                    });
            });
}
function PaymentRequest_EnableDisableEditing(pOption) { //pOption 1:Enable 2:Disable
    debugger;
    if (pOption == 1) {
        $("#btnSave").removeAttr("disabled");
        $("#btn-AddPaymentRequestDetails").removeAttr("disabled");
        $("#btn-DeletePaymentRequestDetails").removeAttr("disabled");
    }
    else {
        $("#btnSave").attr("disabled", "disabled");
        $("#btn-AddPaymentRequestDetails").attr("disabled", "disabled");
        $("#btn-DeletePaymentRequestDetails").attr("disabled", "disabled");
    }
}
var maxAccountIDInTable = 0;

function AddNewAccountRow() {
    debugger;
    ++maxAccountIDInTable;
    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var dateValidTo = Date.prototype.addDays(ConvertDateFormat(FormattedTodaysDate), 30);
    var tr = "";
    tr += "<tr ID='" + maxAccountIDInTable + "'>";
    tr += "     <td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + maxAccountIDInTable + "' checked='checked' /></td>";
    tr += "     <td class='DetailsID'><input " + (1 == 2 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + maxAccountIDInTable + "' /></td>";
    tr += "     <td class='Account_ID'  val=''><select id='slAccount" + maxAccountIDInTable + "'  class='selectAccountID controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id); Details_AccountChanged(" + maxAccountIDInTable + ");' data-required='false'>" + "<option value=0></option>" + "</select></td>";
    tr += "     <td class='SubAccount_ID'  val=''><select id='slSubAccount" + maxAccountIDInTable + "'  class='selectSubAccountID controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false'>" + "<option value=0></option>" + "</select></td>";
    tr += "     <td class='CostCenter_ID'  val=''><select id='slCostCenter" + maxAccountIDInTable + "' class='controlStyle selectcostcenterID' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false'>" + "<option value=0></option>" + "</select></td>";
    tr += "     <td class='Amount' ><input type='text'  id='txtAmountAccount" + maxAccountIDInTable + "' class='form-control controlStyle' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id)' onchange='Details_SetIsRowChanged(id);' data-required='false' value='' /> </td>";
    tr += "     <td class='Notes' ><input type='text'  id='txtNotesAccount" + maxAccountIDInTable + "' class='form-control controlStyle'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false' value='" + ($("#txtNotesAccount" + (maxAccountIDInTable - 1)).val() == undefined ? "" : $("#txtNotesAccount" + (maxAccountIDInTable - 1)).val()) + "' /> </td>";
    tr += "     <td class='hide'>"
        //+ "<a href='#'  onclick='Pricing_CopyRow(" + maxDetailsIDInTable + ");' " + copyControlsText + "</a>"
        + "</td>";
    tr += "</tr>";
    //if ($("#tblDetails tbody tr").length > 0)
    //    $(tr).insertBefore('#tblDetails > tbody > tr:first');
    //else
    $("#tblAccount tbody").prepend(tr);
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $("#tblAccount tbody tr[ID=" + maxAccountIDInTable + "]").reverseChildren();
    /***************************Filling row controls******************************/

    //  if (pDefaults.UnEditableCompanyName != "FAI") {
    // Start Auto Filter
    $("#slAccount" + maxAccountIDInTable).css({ "width": "100%" }).select2();
    $("#slSubAccount" + maxAccountIDInTable).css({ "width": "100%" }).select2();
    //  }

    //$("#slCurrency" + maxDetailsIDInTable).html($("#slCurrencyDetails").html()); //to get the exchangerate
    $("#slAccount" + maxAccountIDInTable).html($("#slAccount").html());
    $("#slAccount" + maxAccountIDInTable).val($("#slAccount" + (maxAccountIDInTable - 1)).val() == undefined ? 0 : $("#slAccount" + (maxAccountIDInTable - 1)).val());

    //if (pDefaults.UnEditableCompanyName == "ERP") {
    //Start Auto Filter

    $("div[tabindex='-1']").removeAttr('tabindex');
    $("#slAccount" + maxAccountIDInTable).trigger("change");

    //End Auto Filter
    //  }

    $("#slSubAccount" + maxAccountIDInTable).html("<option value=0>" + TranslateString("SelectFromMenu") + "</option>");
    $("#slSubAccount" + maxAccountIDInTable).html($("#slSubAccount" + (maxAccountIDInTable - 1)).html());
    $("#slSubAccount" + maxAccountIDInTable).val($("#slSubAccount" + (maxAccountIDInTable - 1)).val() == undefined ? 0 : $("#slSubAccount" + (maxAccountIDInTable - 1)).val());


    $("#slSubAccount" + maxAccountIDInTable).trigger("change");

    $("#slCostCenter" + maxAccountIDInTable).html($("#slCostCenter").html());
    $("#slCostCenter" + maxAccountIDInTable).val($("#slCostCenter" + (maxDetailsIDInTable - 1)).val() == undefined ? 0 : $("#slCostCenter" + (maxDetailsIDInTable - 1)).val());
    $("#slCostCenter" + maxAccountIDInTable).css({ "width": "100%" }).select2();
    $("#slCostCenter" + maxAccountIDInTable).trigger("change");

    Details_FillSlSubAccount("slSubAccount" + maxAccountIDInTable, $("#slSubAccount" + maxAccountIDInTable).val(), $("#slAccount" + maxAccountIDInTable).val());

    //SetDatepickerFormat();
    BindAllCheckboxonTable("tblAccount", "DetailsID", "cbDetailsDeleteHeader");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    CheckAllCheckbox("HeaderDeleteDetailsID");

    /***********************EOF Filling row controls******************************/
}



/************************************Details Fns**********************************************/
function DetailsAccount_BindTableRows(pTableRows) {
    debugger;
    ClearAllTableRows("tblAccount");
    maxAccountIDInTable = 0;
    $.each(pTableRows, function (i, item) {
        maxAccountIDInTable = (item.ID > maxAccountIDInTable ? item.ID : maxAccountIDInTable);
        var tr = "";
        tr += "<tr ID='" + item.ID + "' " + ">";
        tr += "     <td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + item.ID + "' /></td>";
        tr += "     <td class='DetailsID'><input " + (1 == 2 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + item.ID + "' /></td>";


        tr += "     <td class='Account_ID'  val='" + item.Account_ID + "'><p id='cellAccount" + item.ID + "' class='text-center' ondblclick='Details_EnterEditModeForSL(" + '"' + "Account" + '",' + item.ID + ");'>" + (item.Account_ID == 0 ? "N/A" : (item.Account_Name + " - " + item.Account_Number)) + "</p><select id='slAccount" + item.ID + "'  class='selectAccountID controlStyle hide' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id); Details_AccountChanged(" + item.ID + ");' data-required='false'>" + "<option value=" + item.Account_ID + "></option>" + "</select></td>";
        tr += "     <td class='SubAccount_ID'  val='" + item.SubAccount_ID + "'><p class='text-center' id='cellSubAccount" + item.ID + "' ondblclick='Details_EnterEditModeForSL(" + '"' + "SubAccount" + '",' + item.ID + ");'>" + (item.SubAccount_ID == 0 ? "N/A" : (item.SubAccount_Name + " - " + item.SubAccount_Number)) + "</p><select id='slSubAccount" + item.ID + "'  class='selectSubAccountID controlStyle hide' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false'>" + "<option value=" + item.SubAccount_ID + "></option>" + "</select></td>";
        tr += "     <td class='CostCenter_ID'  val='" + item.CostCenter_ID + "'><p class='text-center' id='cellCostCenter" + item.ID + "' ondblclick='Details_EnterEditModeForSL(" + '"' + "CostCenter" + '",' + item.ID + ");'>" + (item.CostCenter_ID == 0 ? "N/A" : (item.CostCenterName + " - " + item.CostCenterNumber)) + "</p><select id='slCostCenter" + item.ID + "'  class='selectcostcenterID controlStyle hide' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false'>" + "<option value=" + item.CostCenter_ID + "></option>" + "</select></td>";



        tr += "     <td class='Amount'><p class='text-center' id='cellAmountAccount" + item.ID + "' ondblclick='Details_EnterEditModeForTxt(" + '"' + "AmountAccount" + '",' + item.ID + ");'>" + (item.Amount) + "</p><input type='text'  id='txtAmountAccount" + item.ID + "' class='form-control controlStyle hide' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' onchange='Details_SetIsRowChanged(id);' data-required='false' value='" + item.Amount + "' /> </td>";
        tr += "     <td class='Notes'><p class='text-center' id='cellNotesAccount" + item.ID + "' ondblclick='Details_EnterEditModeForTxt(" + '"' + "NotesAccount" + '",' + item.ID + ");'>" + (item.Notes == 0 ? "N/A" : item.Notes) + "</p><input type='text'  id='txtNotesAccount" + item.ID + "' class='form-control controlStyle hide'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false' value='" + (item.Notes == 0 ? "" : item.Notes) + "' /> </td>";
        //else
        //    tr += "      <td class='IsDocumented'><input id='cbIsDocumented" + item.ID + "'  type='checkbox' value='" + item.IsDocumented + "'></td>";

        tr += "     <td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate' id='SelectedIDsToUpdate" + item.ID + "' type='checkbox' value='" + item.ID + "' /></td>";
        tr += "</tr>";
        AppendRowtoTable("tblAccount", tr);
    });

    $.each(pTableRows, function (i, item) {
        debugger;

        $("#slAccount" + item.ID).html($("#slAccount").html());
        $("#slAccount" + item.ID).val(item.Account_ID);
        $("#slCostCenter" + item.ID).html($("#slCostCenter").html());
        $("#slCostCenter" + item.ID).val(item.CostCenter_ID);




    });
    //SetDatepickerFormat();
    BindAllCheckboxonTable("tblAccount", "DetailsID", "cbDetailsDeleteHeader");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    CheckAllCheckbox("HeaderDeleteDetailsID");
}


function Details_EnterEditModeForSL(pControlID, pRowID) {
    debugger;
    if ($("#hf_CanEdit").val() == "1") {
        var tr = $("#tblAccount tr[ID='" + pRowID + "']");
        $("#cell" + pControlID + pRowID).addClass("hide");
        $("#sl" + pControlID + pRowID).removeClass("hide");
        if (pControlID == "SubAccount" || pControlID == "Account") {
            var pAccountID = $(tr).find("td.Account_ID").attr("val");
            var pSubAccountID = $(tr).find("td.SubAccount_ID").attr("val");
            $("#cellSubAccount" + pRowID).addClass("hide");
            $("#slSubAccount" + pRowID).removeClass("hide");
            //if (pDefaults.UnEditableCompanyName != "FAI") {
            // Start Auto Filter
            $("#sl" + pControlID + pRowID).css({ "width": "100%" }).select2();
            $("div[tabindex='-1']").removeAttr('tabindex');
            $("#sl" + pControlID + pRowID).trigger("change");
            //End Auto Filter
            //   }
            Details_FillSlSubAccount("slSubAccount" + pRowID, pSubAccountID, pAccountID);
        }

    }
}
function Details_EnterEditModeForTxt(pControlID, pRowID) {
    debugger;
    if ($("#hf_CanEdit").val() == "1") {
        //var tr = $("#tblDetails tr[ID='" + pRowID + "']");
        //var pItemID = $(tr).find("td." + pControlID + "ID").text();
        $("#cell" + pControlID + pRowID).addClass("hide"); $("#txt" + pControlID + pRowID).removeClass("hide");
        if (pControlID == "ExchangeRate") {
            $("#cellLocalDebit" + pRowID).addClass("hide"); $("#txtLocalDebit" + pRowID).removeClass("hide");
            $("#cellLocalCredit" + pRowID).addClass("hide"); $("#txtLocalCredit" + pRowID).removeClass("hide");
        }
        if (pControlID == "Debit" || pControlID == "Credit") {
            $("#cellLocalDebit" + pRowID).addClass("hide"); $("#txtLocalDebit" + pRowID).removeClass("hide");
            $("#cellLocalCredit" + pRowID).addClass("hide"); $("#txtLocalCredit" + pRowID).removeClass("hide");
            $("#cellDebit" + pRowID).addClass("hide"); $("#txtDebit" + pRowID).removeClass("hide");
            $("#cellCredit" + pRowID).addClass("hide"); $("#txtCredit" + pRowID).removeClass("hide");
        }
    }
}
function Details_SetIsRowChanged(pControlID) {
    debugger;
    var ChangedRowID = $("#" + pControlID).parent().parent().attr("ID");
    $("#SelectedIDsToUpdate" + ChangedRowID).prop("checked", true);
}
function Details_AccountChanged(pRowID) {
    debugger;
    $("#slSubAccount" + pRowID).val(0);

    Details_FillSlSubAccount("slSubAccount" + pRowID, 0, $("#slAccount" + pRowID).val());
}
function DetailsAccount_DeleteList() {
    debugger;
    var pSelectedIDs = GetAllSelectedIDsAsString('tblAccount', 'Delete');
    if (pSelectedIDs != "") {
        for (var i = 0; i < pSelectedIDs.split(",").length; i++)
            $("#tblAccount tbody tr[ID=" + pSelectedIDs.split(",")[i] + "]").remove();

    }
}
function Details_FillSlSubAccount(pSlName, pSubAccountID, pAccountID) {
    debugger;
    FadePageCover(true);

    CallGETFunctionWithParameters("/api/ChartOfLinkingAccounts/LoadSubAccountDetails"
        , {
            pLanguage: $("[id$='hf_ChangeLanguage']").val()
            , pWhereClauseSubAccountDetails: "WHERE IsMain=0 AND Account_ID=" + pAccountID
            , pOrderBy: "Name"
        }
        , function (pData) {
            FillListFromObject_ERP(pSubAccountID, 4/*pCodeOrName*/, TranslateString("SelectFromMenu"), pSlName, pData[0], null);
            //   if (pDefaults.UnEditableCompanyName != "FAI") {
            //Start Auto Filter
            $("#" + pSlName).css({ "width": "100%" }).select2();
            $("div[tabindex='-1']").removeAttr('tabindex');
            $("#" + pSlName).trigger("change");
            //  End Auto Filter
            //    }
            FadePageCover(false);
        }
        , null);
}
function PartnerTypeChanged() {

    debugger;
    $("#slPartner").html("<option value=''><--All--></option>");//to quickly empty
    if ($("#slPartnerType").val() != "" && $("#slPartnerType").val() != null) {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/A_ARAllocationWithVoucher/FillPartners", { pPartnerTypeID: $("#slPartnerType").val() }
            , function (pData) {
                FillListFromObject(null, 2/*pCodeOrName*/, "<--All-->", "slClient", pData[0], null);
                FillListFromObject(null, 2/*pCodeOrName*/, "<--All-->", "slClientVendor", pData[1], null);


                FadePageCover(false);
            }
            , null);
    }
}
function LoadRequiredOperations(DetailID) {
    debugger;
    let SearchOperationCode = $("#SearchOperationCode" + DetailID).val();
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/PaymentRequest/GetRequiredOperations", { pSearchOperationCode: SearchOperationCode },
        function (pData) {
            debugger;
            if (JSON.parse(pData).length > 0) {
                if (IsMESCOCompany) {
                    $("#txtEstmatedCost" + DetailID).attr('disabled', false);
                }
                if (IsMESCOCompany && (JSON.parse(pData)[0].OperationStageID == 110 || JSON.parse(pData)[0].OperationStageID == 120 || JSON.parse(pData)[0].OperationStageID == 130)) {
                    $("#txtEstmatedCost" + DetailID).attr('disabled', true);
                }
                let FirstMatchingOperationID = JSON.parse(pData)[0].ID
                Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(pData[0], "ID", "Code,VesselName,ActualArrivalString", ' --> ', "<--Select-->", "#slOperation" + DetailID, FirstMatchingOperationID, "", function () { });
                Details_HouseAndCertificateChangedByOperation(DetailID);
                GetSuppliers_Charges(DetailID);
                GetChargeTypesToOperation(DetailID);
                $("#slCurrency").attr("disabled", "disabled");
            }
            else
                swal('', 'No Operations Found');

            FadePageCover(false);
        },null);
}

var maxDetailsIDInTable = 0;
function Details_NewRow() {
    debugger;
    check = 0;
    ++maxDetailsIDInTable;
    // var copyControlsText = " class='btn btn-xs btn-rounded btn-info float-btn-AddPaymentRequestDetails' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'></span>";
    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var dateValidTo = Date.prototype.addDays(ConvertDateFormat(FormattedTodaysDate), 30);

    var tr = "";
    if (_IsCustodySettlement == 1) {
        tr += "<tr ID='" + maxDetailsIDInTable + "' isdeleted='0' tag='item'   counter='" + (maxDetailsIDInTable) + "' value='" + 0 + "'>"
        tr += "     <td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + maxDetailsIDInTable + "' checked='checked' /></td>";
        tr += "     <td class='DetailsID' style='width:2%;'><input " + (1 == 2 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + 0 + "' /></td>";

        //Added to load the operations combo just with the matching operations to decrease screen load time
        tr += "     <td class='SearchOperationCode' style='display:flex;gap:4px;'>      <input type='text' id='SearchOperationCode" + maxDetailsIDInTable + "' style='padding:3px' onkeypress='DisableEnterKey(id);'>     <i class='fa fa-search' style='background-color:lightblue;border-radius:50%;padding:6px;cursor:pointer' onclick='LoadRequiredOperations(" + maxDetailsIDInTable + ")'></i></td>"
        
        tr += "     <td class='Operation' disabled style='width:20%;' val=''><select id='slOperation" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slOperation' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetSuppliers_Charges(" + maxDetailsIDInTable + "); Details_HouseAndCertificateChangedByOperation(" + maxDetailsIDInTable + ");'  data-required='false'>" + "<option value=0></option>" + "</select></td>";
        // val='" + (item.OperationID) + "'   tr += "     <td class='CertificateNumber' disabled style='width:7%;' val=''><select id='slCertificateNumber" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slCertificateNumber' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetSuppliers_Charges(" + maxDetailsIDInTable + ");Details_ChangedByHouseAndCertificateAndTrucingOrder(" + maxDetailsIDInTable + ',' + 2 + ");'  data-required='false'>" + "<option value=0></option>" + "</select></td>";
        tr += "     <td class='TruckingOrder hide' style='display: flex; gap: 8px;' val=''><select id='slTruckingOrder" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slTruckingOrder' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange=" + (IsMESCOCompany ? "'DetailContainerChanged(" + maxDetailsIDInTable + ")'" : "'GetSuppliers_Charges(" + maxDetailsIDInTable + ");Details_ChangedByHouseAndCertificateAndTrucingOrder(" + maxDetailsIDInTable + ',' + 3 + ");'") + "  data-required='false'>" + "<option value=0></option>" + "</select>";

        if (pDefaults.UnEditableCompanyName == "MES")
            tr += "     <select id='slCalcBL" + maxDetailsIDInTable + "' class='controlStyle slCalcBL' " + "onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' " + "onkeypress='DisableBackspaceKey(id);' data-required='false'>" + $('#slCalcBL').html() + "</select>"
                + " <button id='btn-CalcBL" + maxDetailsIDInTable + "' title='Search' " + "class='btn btn-sm btn-warning' onclick='PaymentRequest_CalcBL(" + maxDetailsIDInTable + ");' type='button'>" + "<i class='fa fa-calculator'></i>" + "</button>"

        tr +=  "</td>";   

        tr += "     <td class='HouseNumber hide' style='width:7%;' val=''><select id='slHouse" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slHouse' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange=" + (IsMESCOCompany ? "'DetailHouseChanged(" + maxDetailsIDInTable + ")'" : "'GetSuppliers_Charges(" + maxDetailsIDInTable + ");Details_ChangedByHouseAndCertificateAndTrucingOrder(" + maxDetailsIDInTable + ',' + 1 + ");'") + "  data-required='false'>" + "<option value=0></option>" + "</select></td>";



        tr += "     <td class='FlagChargeType' disabled  val=''><input id='cbFlagChargeType" + maxDetailsIDInTable + "'  name='FlagChargeType'  onchange='GetChargeTypesToOperation(" + maxDetailsIDInTable + ");' type='checkbox' value='" + maxDetailsIDInTable + "' /></td>"
        tr += "     <td class='ChargeType' disabled  val=''><select id='slChargeType" + maxDetailsIDInTable + "'  class='controlStyle slChargeType' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='GetInitialValue(" + maxDetailsIDInTable + ");' data-required='false'>" + "<option value=0></option>" + "</select></td>";
        tr += "     <td class='Payable hide' disabled  val=''><select id='slPayable" + maxDetailsIDInTable + "'  onchange='GetPayablesToOperation(" + maxDetailsIDInTable + ");' class='controlStyle slPayable' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='GetInitialValue(" + maxDetailsIDInTable + ");' data-required='false'>" + "<option value=0></option>" + "</select></td>";

        if (IsMESCOCompany)
            tr += "<td class='CategoryName'></td>"

        tr += "     <td class='Supplier' disabled  val=''><select id='slSupplier" + maxDetailsIDInTable + "'  class='controlStyle slSupplier' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required=" +( IsMESCOCompany ? "'true'>" : "'false'>") + "<option value=0>Select Supplier</option>" + "</select></td>";
        tr += "     <td class='EstmatedCost'  ><input type='text' disabled  id='txtEstmatedCost" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);PaymentRequestDetails_CalculateAmount();' onchange='PaymentRequestDetails_CalculateAmount();' data-required='true' value='0' /> </td>";

        tr += "     <td class='ActualCost' ><input type='text'     id='txtActualCost" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);PaymentRequestDetails_CalculateAmount();' onchange='PaymentRequestDetails_CalculateAmount();   ChangeisRetrieved(" + maxDetailsIDInTable + "); ' data-required='false' value='' /> </td>"

        tr += "     <td class='TaxVat'  val=''><select id='slTaxVat" + maxDetailsIDInTable + "'  class='controlStyle slTaxVat' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='' data-required='false'>" + "<option value=0></option>" + "</select></td>";
        //tr += "     <td class='TaxVatAmount hide'><input type='text' id='txtTaxVatAmount" + maxDetailsIDInTable + "' class='controlStyle inputTaxVatAmount'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + ($("#txtTaxVatAmount" + (maxDetailsIDInTable - 1)).val() == undefined ? "" : $("#txtTaxVatAmount" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";
        tr += "     <td class='TaxDiscount'  val=''><select id='slTaxDiscount" + maxDetailsIDInTable + "'  class='controlStyle slTaxDiscount' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='' data-required='false'>" + "<option value=0></option>" + "</select></td>";
        //tr += "     <td class='TaxDiscountAmount hide'><input type='text' id='txtTaxDiscount" + maxDetailsIDInTable + "' class='controlStyle inputTaxDiscount'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + ($("#txtTaxVatAmount" + (maxDetailsIDInTable - 1)).val() == undefined ? "" : $("#txtTaxVatAmount" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";
        tr += "<td class='IsVATFromPRForm hide' ><input type='text' id='txtIsVATFromPRForm" + maxDetailsIDInTable + "' data-required='false' value='false' /> </td>"
        //tr += "     <td class='PartenerType' disabled style='width:7%;' val=''><select id='slPartenerType" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slPartenerType' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='Details_FillSlPartenerByPartenerType(" + maxDetailsIDInTable + ");'  data-required='false'>" + "<option value=0></option>" + "</select></td>";
        //tr += "     <td class='Partener' style='width:10%;' val=''><select id='slPartener" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slPartener' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + "<option value=0>Select Supplier</option>" + "</select></td>";
        tr += "     <td class='Coupon hide' style='width:5%;'><input type='text'  id='txtCoupon" + maxDetailsIDInTable + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + ($("#txtCoupon" + (maxDetailsIDInTable - 1)).val() == undefined ? "" : $("#txtCoupon" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";
        tr += "     <td class='SupplierInvoiceNo' style='width:5%;'><input type='text'  id='txtSupplierInvoiceNo" + maxDetailsIDInTable + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + ($("#txtSupplierInvoiceNo" + (maxDetailsIDInTable - 1)).val() == undefined ? "" : $("#txtSupplierInvoiceNo" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";
        tr += "     <td class='CostCenter hide style='min-width: 108px'  val=''><select id='slCostCenter" + maxDetailsIDInTable + "'  class='controlStyle slCostCenter' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='' data-required='false'>" + "<option value=0></option>" + "</select></td>";
        tr += "     <td class='Description hide'><input type='text'  id='txtDescription" + maxDetailsIDInTable + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + ($("#txtDescription" + (maxDetailsIDInTable - 1)).val() == undefined ? "" : $("#txtDescription" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";
        tr += "     <td class='ActualDescription'><input type='text'  id='txtActualDescription" + maxDetailsIDInTable + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + ($("#txtActualDescription" + (maxDetailsIDInTable - 1)).val() == undefined ? "" : $("#txtActualDescription" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";
        //tr += "      <td class='Documented' style='width:1%;'><input id='cbDocumented" + maxDetailsIDInTable + "' name='Documented'  class='cbIsDocumented' type='checkbox' value='' ></td>";
        tr += "     <td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate'  id='SelectedIDsToUpdate" + maxDetailsIDInTable + "' type='checkbox' value='" + maxDetailsIDInTable + "' /></td>";
        tr += "     <td class='isRetrieved hide' style='width:10%;'><input type='text' style='width:100%;font-size:90%;text-transform:uppercase;' id='isRetrieved" + maxDetailsIDInTable + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + 'false' + "' /> </td>"

        tr += "     <td class='hide'>"
            + "</td>";
        tr += "</tr>";
    }
    else {
        tr += "<tr ID='" + maxDetailsIDInTable + "' isdeleted='0' tag='item'   counter='" + (maxDetailsIDInTable) + "' value='" + 0 + "'>"
        tr += "     <td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + maxDetailsIDInTable + "' checked='checked' /></td>";
        tr += "     <td class='DetailsID' ><input " + (1 == 2 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + 0 + "' /></td>";

        //Added to load the operations combo just with the matching operations to decrease screen load time
        tr += "     <td class='SearchOperationCode' style='display:flex;gap:4px;'>      <input type='text' id='SearchOperationCode" + maxDetailsIDInTable + "' style='padding:3px' onkeypress='DisableEnterKey(id);'>     <i class='fa fa-search' style='background-color:lightblue;border-radius:50%;padding:6px;cursor:pointer;' onclick='LoadRequiredOperations(" + maxDetailsIDInTable + ")'></i></td>"

        tr += "     <td class='Operation' val=''><select id='slOperation" + maxDetailsIDInTable + "' class='controlStyle slOperation' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'   onchange='GetSuppliers_Charges(" + maxDetailsIDInTable + ");Details_HouseAndCertificateChangedByOperation(" + maxDetailsIDInTable + "); GetChargeTypesToOperation(" + maxDetailsIDInTable + ");'  data-required='false'>" + "<option value=0></option>" + "</select></td>";


        //  tr += "     <td class='CertificateNumber' style='width:7%;' val=''><select id='slCertificateNumber" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slCertificateNumber' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetSuppliers_Charges(" + maxDetailsIDInTable + ");Details_ChangedByHouseAndCertificateAndTrucingOrder(" + maxDetailsIDInTable + ',' + 2 + ");'  data-required='false'>" + "<option value=0></option>" + "</select></td>";
        tr += "     <td class='TruckingOrder hide'   style='display: flex; gap: 8px;'  val=''><select id='slTruckingOrder" + maxDetailsIDInTable + "' class='controlStyle slTruckingOrder' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange=" + (IsMESCOCompany ? "'DetailContainerChanged(" + maxDetailsIDInTable + ")'" : "'GetSuppliers_Charges(" + maxDetailsIDInTable + ");Details_ChangedByHouseAndCertificateAndTrucingOrder(" + maxDetailsIDInTable + ',' + 3 + ");'") + " data-required='false'>" + "<option value=0></option>" + "</select>"

        if (pDefaults.UnEditableCompanyName == "MES")
        tr += "     <select id='slCalcBL" + maxDetailsIDInTable + "' class='controlStyle slCalcBL' " + "onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' " + "onkeypress='DisableBackspaceKey(id);' data-required='false'>" + $('#slCalcBL').html() + "</select>"
              + " <button id='btn-CalcBL" + maxDetailsIDInTable + "' title='Search' " + "class='btn btn-sm btn-warning' onclick='PaymentRequest_CalcBL(" + maxDetailsIDInTable + ");' type='button'>" + "<i class='fa fa-calculator'></i>" + "</button>"

        tr +=  "</td>";   

        tr += "     <td class='HouseNumber hide' val=''><select id='slHouse" + maxDetailsIDInTable + "' class='controlStyle slHouse' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange=" + (IsMESCOCompany ? "'DetailHouseChanged(" + maxDetailsIDInTable + ")'" : "'Details_ChangedByHouseAndCertificateAndTrucingOrder(" + maxDetailsIDInTable + ',' + 1 + ");'") + "  data-required='false'>" + "<option value=0></option>" + "</select> </td>";
    

        tr += "     <td class='FlagChargeType' val=''><input id='cbFlagChargeType" + maxDetailsIDInTable + "'  name='FlagChargeType'  onchange='GetChargeTypesToOperation(" + maxDetailsIDInTable + ");' type='checkbox' value='" + maxDetailsIDInTable + "' /></td>"
        tr += "     <td class='ChargeType' val=''><select id='slChargeType" + maxDetailsIDInTable + "' onchange='GetInitialValue(" + maxDetailsIDInTable + ");' class='controlStyle slChargeType' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetInitialValue(" + maxDetailsIDInTable + ");'  data-required='false'>" + "<option value=0></option>" + "</select></td>";
        tr += "     <td class='Payable' disabled val=''><select id='slPayable" + maxDetailsIDInTable + "' onchange='GetPayablesToOperation(" + maxDetailsIDInTable + ");' class='controlStyle slPayable' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='GetInitialValue(" + maxDetailsIDInTable + ");' data-required='false'>" + "<option value=0></option>" + "</select></td>";
        if (IsMESCOCompany)
            tr += "<td class='CategoryName'></td>"
        tr += "     <td class='Supplier'  val=''><select id='slSupplier" + maxDetailsIDInTable + "' class='controlStyle slSupplier' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='GetIssuedToBySupplier(" + maxDetailsIDInTable + "); ' data-required='false'>" + "<option value=0></option>" + "</select></td>";
        tr += "     <td class='EstmatedCost' ><input type='text'   id='txtEstmatedCost" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);PaymentRequestDetails_CalculateAmount();' onchange='PaymentRequestDetails_CalculateAmount();' data-required='false' value='0' /> </td>";

        tr += "     <td class='TaxTypeID hide'  val=''><select  id='slTaxVat" + maxDetailsIDInTable + "'  class='controlStyle slTaxVat' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='' data-required='false'>" + "<option value=0></option>" + "</select></td>";
        //tr += "     <td class='TaxVatAmount hide'><input type='text' id='txtTaxVatAmount" + maxDetailsIDInTable + "' class='controlStyle inputTaxVatAmount'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + ($("#txtTaxVatAmount" + (maxDetailsIDInTable - 1)).val() == undefined ? "" : $("#txtTaxVatAmount" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";
        tr += "     <td class='DiscountTypeID hide'  val=''><select id='slTaxDiscount" + maxDetailsIDInTable + "'  class='controlStyle slTaxDiscount' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='' data-required='false'>" + "<option value=0></option>" + "</select></td>";
        //tr += "     <td class='TaxDiscountAmount hide'><input type='text' id='txtTaxDiscount" + maxDetailsIDInTable + "' class='controlStyle inputTaxDiscount'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + ($("#txtTaxVatAmount" + (maxDetailsIDInTable - 1)).val() == undefined ? "" : $("#txtTaxVatAmount" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";


        tr += "     <td class='Coupon hide' ><input type='text'  id='txtCoupon" + maxDetailsIDInTable + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + ($("#txtCoupon" + (maxDetailsIDInTable - 1)).val() == undefined ? "" : $("#txtCoupon" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";
        tr += "     <td class='SupplierInvoiceNo ' ><input type='text'  id='txtSupplierInvoiceNo" + maxDetailsIDInTable + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + ($("#txtSupplierInvoiceNo" + (maxDetailsIDInTable - 1)).val() == undefined ? "" : $("#txtSupplierInvoiceNo" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";
        tr += "     <td class='CostCenter' style='min-width: 108px'   val=''><select id='slCostCenter" + maxDetailsIDInTable + "'  class='controlStyle slCostCenter' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='' data-required='false'>" + "<option value=0></option>" + "</select></td>";
        tr += "     <td class='Description' ><input type='text'  id='txtDescription" + maxDetailsIDInTable + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + ($("#txtDescription" + (maxDetailsIDInTable - 1)).val() == undefined ? "" : $("#txtDescription" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";
        //tr += "      <td class='Documented' style='width:1%;'><input id='cbDocumented" + maxDetailsIDInTable + "' name='Documented'  class='cbIsDocumented' type='checkbox' value='' ></td>";
        tr += "     <td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate'  id='SelectedIDsToUpdate" + maxDetailsIDInTable + "' type='checkbox' value='" + maxDetailsIDInTable + "' /></td>";
        tr += "     <td class='hide'>"
            + "</td>";
        tr += "</tr>";
    }


    $("#tblPaymentRequestDetails tbody").prepend(tr);
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $("#tblPaymentRequestDetails tbody tr[ID=" + maxDetailsIDInTable + "]").reverseChildren();
    /***************************Filling row controls******************************/

    $("#slOperation" + maxDetailsIDInTable).html($("#slOperation").html());

    $("#slHouse" + maxDetailsIDInTable).html($("#slHouse").html());
    //$("#slCertificateNumber" + maxDetailsIDInTable).html($("#slCertificateNumber").html());
    $("#slTruckingOrder" + maxDetailsIDInTable).html($("#slTruckingOrder").html());
    $("#slPartenerType" + maxDetailsIDInTable).html($("#slPartenerType").html());
    $("#slPartener" + maxDetailsIDInTable).html($("#slPartener").html());
    $("#slChargeType" + maxDetailsIDInTable).html($("#slOperation").html());
    $("#slTaxVat" + maxDetailsIDInTable).html($("#slTaxVat").html());
    $("#slTaxDiscount" + maxDetailsIDInTable).html($("#slTaxDiscount").html());

    $("#slCostCenter" + maxDetailsIDInTable).html($("#slCostCenterHeader").html());

    if (IsMESCOCompany) {
        $("#cbFlagChargeType" + maxDetailsIDInTable).prop('checked', true);
        $(".TaxVat").addClass("TaxTypeID");
        $(".TaxVat").removeClass("TaxVat");
        $(".TaxTypeID select").attr('onchange', 'PaymentRequestDetails_CalculateAmount();');
        $(".TaxDiscount").addClass("DiscountTypeID");
        $(".TaxDiscount").removeClass("TaxDiscount");
        $(".DiscountTypeID select").attr('onchange', 'PaymentRequestDetails_CalculateAmount();');
        //$(".TaxVat select").attr('onchange', 'PaymentRequestDetails_CalculateAmount();');
        //$(".TaxDiscount select").attr('onchange', 'PaymentRequestDetails_CalculateAmount();');
    }
    if (pDefaults.UnEditableCompanyName != 'COS') {
        $(".TaxTypeID").removeClass("hide");
        $(".DiscountTypeID").removeClass("hide");
        //$(".TaxVatAmount").removeClass("hide");
        //$(".TaxDiscountAmount").removeClass("hide");


    }
    else {
        $(".TaxTypeID").addClass("hide");
        $(".DiscountTypeID").addClass("hide");
        //$(".TaxVatAmount").addClass("hide");
        //$(".TaxDiscountAmount").addClass("hide");

    }


    $("#slChargeType" + maxDetailsIDInTable).html($("#slChargeType").html());
    $("#slSupplier" + maxDetailsIDInTable).html($("#slSupplier").html());

    BindAllCheckboxonTable("tblPaymentRequestDetails", "DetailsID", "cb-CheckAll-PaymentRequestDetails");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    /***********************EOF Filling row controls******************************/

    //Start Auto Filter
    // Start Auto Filter
    $("#slHouse" + maxDetailsIDInTable).css({ "width": "100%" }).select2();
    //$("#slCertificateNumber" + maxDetailsIDInTable).css({ "width": "100%" }).select2();

    //$("#slTruckingOrder" + maxDetailsIDInTable).css({ "width": "100%" }).select2();
    $("#slOperation" + maxDetailsIDInTable).css({ "width": "100%" }).select2();
    //$("#slSupplier" + maxDetailsIDInTable).css({ "width": "100%" }).select2();
    $("#slChargeType" + maxDetailsIDInTable).css({ "width": "100%" }).select2();
    //$("#slCostCenter" + maxDetailsIDInTable).css({ "width": "100%" }).select2();

    $("#slTruckingOrder" + maxDetailsIDInTable).css({ "width": "100%" });
    $("#slOperation" + maxDetailsIDInTable).css({ "width": "100%" });

    if (_IsCustodySettlement == 1) {
        $("#slOperation" + maxDetailsIDInTable).val(OperID);
        $("#slOperation" + maxDetailsIDInTable).trigger("change");

    }
    $("#slSupplier" + maxDetailsIDInTable).css({ "width": "100%" });
    $("#slChargeType" + maxDetailsIDInTable).css({ "width": "100%" });
    $("#slCostCenter" + maxDetailsIDInTable).css({ "width": "100%" });

    if (pLoggedUser.IsAccessAllCharges == true) {
        $(".HouseNumber").removeClass("hide");
        $(".TruckingOrder").removeClass("hide");
        $(".Coupon").removeClass("hide");

        $(".classShowForDepartementHouse").removeClass("hide");
        $(".classShowForDepartementTrOr").removeClass("hide");
        $(".classShowForDepartementCopon").removeClass("hide");



    }
    else {
        if (pLoggedUser.DepartmentName == "TRANSPORTATION" || pLoggedUser.DepartmentName == "سائقى النقل" || pLoggedUser.DepartmentName == "مناديب النقل") {
            $(".TruckingOrder").removeClass("hide");
            $(".classShowForDepartementTrOr").removeClass("hide");

            $(".PartenerType").removeClass("hide");
            $(".classShowForDepartementPartenerType").removeClass("hide");

            $(".Partener").removeClass("hide");
            $(".classShowForDepartementPartener").removeClass("hide");
        }
        else if (pLoggedUser.DepartmentName == "مناديب قطاع الملاحة" || pLoggedUser.DepartmentName == "حبوب - جهات رقابية" || pLoggedUser.DepartmentName == "حاويات - جهات رقابية" ||
            pLoggedUser.DepartmentName == "تموينات الملاحة" || pLoggedUser.DepartmentName == "تخليص - هيئة ميناء" || pLoggedUser.DepartmentName == "تخليص - جمرك حبوب"
            || pLoggedUser.DepartmentName == "تخليص - جمرك بضائع عامة" || pLoggedUser.DepartmentName == "تخليص - توكيل" || pLoggedUser.DepartmentName == "SALES"
            || pLoggedUser.DepartmentName == "INFORMATION TECHNOLOGY" || pLoggedUser.DepartmentName == "FREIGHT" || pLoggedUser.DepartmentName == "CUSTOMS CLEARANCE"
            || pLoggedUser.DepartmentName == "ACCOUNTING TRUCKING" || pLoggedUser.DepartmentName == "ACCOUNTING SHIPPING - RECEIVAERS" || pLoggedUser.DepartmentName == "ACCOUNTING SHIPPING"
            || pLoggedUser.DepartmentName == "ACCOUNTING CCA" || pLoggedUser.DepartmentName == "ACCOUNTING" || pLoggedUser.DepartmentName == "مناديب ملاحة / حجر و أمن وطنى") {
            $(".HouseNumber").removeClass("hide");
            $(".Coupon").removeClass("hide");

            $(".classShowForDepartementHouse").removeClass("hide");
            $(".classShowForDepartementCopon").removeClass("hide");
        }
    }

    if (pDefaults.UnEditableCompanyName == "MES") {
        $('.classHideForMesco').addClass('hide');
        $('.FlagChargeType').addClass('hide');
        $('.ChargeType').addClass('hide');
        $('.Payable').removeClass('hide');
    }

    //Get OperationCode From Header
    if ($('#txtOperationCode').val() != '') {
        $('#SearchOperationCode' + maxDetailsIDInTable).val($('#txtOperationCode').val());
        LoadRequiredOperations(maxDetailsIDInTable);
    }

    //$("#slHouse" + maxDetailsIDInTable).trigger("change");
    //$("#slCertificateNumber" + maxDetailsIDInTable).trigger("change");
    //$("#slTruckingOrder" + maxDetailsIDInTable).trigger("change");



    //End Auto Filter
    //  }

    // $("#slHouse" + maxDetailsIDInTable).html("<option value=0>" + TranslateString("SelectFromMenu") + "</option>");
    // $("#slHouse" + maxDetailsIDInTable).html($("#slHouse" + (maxDetailsIDInTable - 1)).html());
    // $("#slHouse" + maxDetailsIDInTable).val($("#slHouse" + (maxDetailsIDInTable - 1)).val() == undefined ? 0 : $("#slHouse" + (maxDetailsIDInTable - 1)).val());
    // //$("#slHouse" + maxDetailsIDInTable).trigger("change");

    // $("#slCertificateNumber" + maxDetailsIDInTable).html("<option value=0>" + TranslateString("SelectFromMenu") + "</option>");
    // $("#slCertificateNumber" + maxDetailsIDInTable).html($("#slCertificateNumber" + (maxDetailsIDInTable - 1)).html());
    // $("#slCertificateNumber" + maxDetailsIDInTable).val($("#slCertificateNumber" + (maxDetailsIDInTable - 1)).val() == undefined ? 0 : $("#slCertificateNumber" + (maxDetailsIDInTable - 1)).val());
    //// $("#slCertificateNumber" + maxDetailsIDInTable).trigger("change");

    // $("#slTruckingOrder" + maxDetailsIDInTable).html("<option value=0>" + TranslateString("SelectFromMenu") + "</option>");
    // $("#slTruckingOrder" + maxDetailsIDInTable).html($("#slTruckingOrder" + (maxDetailsIDInTable - 1)).html());
    // $("#slTruckingOrder" + maxDetailsIDInTable).val($("#slTruckingOrder" + (maxDetailsIDInTable - 1)).val() == undefined ? 0 : $("#slTruckingOrder" + (maxDetailsIDInTable - 1)).val());
    //$("#slTruckingOrder" + maxDetailsIDInTable).trigger("change");
    //////////////

}
function CopyVat() {
    debugger;
    if ($('#tblPaymentRequestDetails > tbody > tr').length > 0) {
        $('.slTaxVat:not(:disabled)').val($('#slVatHeader').val());
        $('.slTaxVat:not(:disabled)').trigger('change');
        //if (parseInt($(tr).find('td.Operation').find('.slOperation').val()) > 0 && $('.slTaxVat').val() != "" && $('#slTaxVat').find('option:selected').attr('CurrentPercentage') != undefined) {
        //    var Vat = ($('#slTaxVat').find('option:selected').attr('CurrentPercentage') * 1) * (($(tr).find('td.ActualCost ').find('.inputValue').attr('tag') == undefined || $(tr).find('td.ActualCost ').find('.inputValue').attr('tag') == "") ? 0 : $(tr).find('td.ActualCost ').find('.inputValue').attr('tag')) / 100;
        //    $(tr).find('td.TaxVatAmount ').find('.inputTaxVatAmount').val(Vat);


        //}
    }

    ///////
    //$("#tblPaymentRequestDetails>tbody>tr").each(function (i, tr) {
    //    $(tr).find('td.TaxVat').find('.slTaxVat').val($('#slVatHeader').val());
    //    //if (parseInt($(tr).find('td.Operation').find('.slOperation').val()) > 0 && $(tr).find('td.TaxVat').find('.slTaxVat').val() !="" && ) {

    //    //}
    //});

}

function CopyWHT() {
    if ($('#tblPaymentRequestDetails > tbody > tr').length > 0) {
        $('.slTaxDiscount:not(:disabled)').val($('#slDeductedTax').val());
        $('.slTaxDiscount:not(:disabled)').trigger('change');

    }

}
function CopyCostCenter() {
    if ($('#tblPaymentRequestDetails > tbody > tr').length > 0) {
        $('.slCostCenter').val($('#slCostCenterHeader').val());

    }

}
function CalcVat(ID) {
    debugger;
    if (ID != 0 && (parseInt($('#slOperation' + ID + '').val()) > 0 && $('#slTaxVat' + ID).val() != "" && $('#slTaxVat' + ID + ' option:selected').attr("CurrentPercentage") != undefined)) {
        FadePageCover(true);

        var Vat = ($('#slTaxVat' + ID + ' option:selected').attr("CurrentPercentage") * 1) * (($('#txtEstmatedCost' + ID).val() == undefined || $('#txtEstmatedCost' + ID).val() == "") ? 0 : $('#txtEstmatedCost' + ID).val()) / 100;
        $('#txtTaxVatAmount' + ID).val(Vat)
        FadePageCover(false);


    }
    else {
        if ($('#tblPaymentRequestDetails > tbody > tr').length > 0) {

            $("#tblPaymentRequestDetails tbody tr").each(function () {
                var Vat = ($('#slTaxVat').find('option:selected').attr('CurrentPercentage') * 1) * (($(tr).find('td.ActualCost ').find('.inputValue').attr('tag') == undefined || $(tr).find('td.ActualCost ').find('.inputValue').attr('tag') == "") ? 0 : $(tr).find('td.ActualCost ').find('.inputValue').attr('tag')) / 100;
                $(tr).find('td.TaxVatAmount ').find('.inputTaxVatAmount').val(Vat);

            });
        }
    }



}
function CalcWHT(ID) {
    debugger;
    if (ID != 0 && (parseInt($('#slOperation' + ID + '').val()) > 0 && $('#slTaxDiscount' + ID).val() != "" && $('#slTaxDiscount' + ID + ' option:selected').attr("CurrentPercentage") != undefined)) {
        FadePageCover(true);

        var Vat = ($('#slTaxDiscount' + ID + ' option:selected').attr("CurrentPercentage") * 1) * (($('#txtEstmatedCost' + ID).val() == undefined || $('#txtEstmatedCost' + ID).val() == "") ? 0 : $('#txtEstmatedCost' + ID).val()) / 100
        $('#txtTaxDiscount' + ID).val(Vat)
        FadePageCover(false);


    }
    else {
        if ($('#tblPaymentRequestDetails > tbody > tr').length > 0) {

            $("#tblPaymentRequestDetails tbody tr").each(function () {
                var Vat = ($('#slTaxDiscount').find('option:selected').attr('CurrentPercentage') * 1) * (($(tr).find('td.ActualCost ').find('.inputValue').attr('tag') == undefined || $(tr).find('td.ActualCost ').find('.inputValue').attr('tag') == "") ? 0 : $(tr).find('td.ActualCost ').find('.inputValue').attr('tag')) / 100;
                $(tr).find('td.TaxDiscountAmount ').find('.inputTaxDiscount').val(Vat);

            });
        }
    }
}
/*************************************Details*******************************************/
function GetOperationData(PaymentRequestDetailID, pHouseID, pContainerID, pPayableID, pSupplierID) {
    debugger;
    var tr = $("#tblPaymentRequestDetails tr[ID='" + PaymentRequestDetailID + "']");
    var OperationID = tr.find("td.Operation select option:selected").val();
    if (OperationID > 0) {
        CallGETFunctionWithParameters("/api/PaymentRequest/GetOperationData", {
            pOperationID: OperationID
            , pHouseID: pHouseID == null ? 0 : pHouseID
            , pContainerID: pContainerID == null ? 0 : pContainerID
            , pPayableID: pPayableID == null ? 0 : pPayableID
            , pCurrencyID: $("#slCurrency").val() 
        }, function (pData) {
            Houses = pData[0];
            Containers = pData[1];
            Payables = pData[2];
            FillListFromObject(pHouseID, 1, "<--Select-->", "slHouse" + PaymentRequestDetailID, Houses, null);
            FillListFromObject(pContainerID, 11, "<--Select-->", "slTruckingOrder" + PaymentRequestDetailID, Containers, null);
            FillListFromObject_Payable(pPayableID, 10, "<--Select-->", ("slPayable" + PaymentRequestDetailID), Payables, null);
            GetSuppliers_Charges(PaymentRequestDetailID, pSupplierID);
        })
    }
}
function PaymentRequestDetails_BindTableRows(pInvoiceDetails) {
    debugger;
    check = 1;

    ClearAllTableRows("tblPaymentRequestDetails");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var rowsRendered = 0;
    $.each(pInvoiceDetails, function (i, item) {
        AppendRowtoTable("tblPaymentRequestDetails",
            ("<tr ID='" + item.ID + "' " + ">"
                + "<td class='DetailsID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + item.ID + "' checked='checked' /></td>"

                + "<td class='SearchOperationCode' style='display:flex;gap:4px;'>      <input type='text' id='SearchOperationCode" + item.ID + "' style='padding:3px' onkeypress='DisableEnterKey(id);'>     <i class='fa fa-search' title='Search' style='background-color:lightblue;border-radius:50%;padding:6px;cursor:pointer' onclick='LoadRequiredOperations(" + item.ID + ")'></i><i class='fa fa-refresh' title='Refresh' style='background-color:#8dcb8d;border-radius:50%;padding:6px;cursor:pointer;margin:0 2px;' onclick='GetOperationData(" + item.ID + "," + item.HouseID + "," + item.TruckingOrderID + "," + item.PayableID + "," + item.SupplierID + ")'></i></td>"

                + "<td class='Operation' val=''><select  tag='" + (item.OperationID == 0 ? "" : item.OperationID) + "' id='slOperation" + item.ID + "' class='controlStyle slOperation' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange=" + (IsMESCOCompany ? "'GetOperationData(" + item.ID + "," + item.HouseID + "," + item.TruckingOrderID + ", " + item.PayableID + "," + item.SupplierID + ")'" : "''") + " onkeypress='DisableBackspaceKey(id);' data-required='false'><option value='" + item.OperationID + "' selected>" + item.OperationCode + "</option></select></td>"

                + "<td class='TruckingOrder hide' style='display: flex; gap: 8px;'  val=''><select  tag='" + (item.TruckingOrderID == 0 ? "" : item.TruckingOrderID) + "' style='width:100%;' id='slTruckingOrder" + item.ID + "'  class='controlStyle slTruckingOrder' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange=" + (IsMESCOCompany ? "'DetailContainerChanged(" + item.ID + ")'" : "''") + " onkeypress='DisableBackspaceKey(id);' data-required='false'><option value='" + item.TruckingOrderID + "' selected>" + item.ContainerTypeCode + ": " + item.ContainerNumber + "</option></select>"

                + (pDefaults.UnEditableCompanyName == "MES" ? " <select id='slCalcBL" + item.ID + "' class='controlStyle slCalcBL' " + "onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' " + "onkeypress='DisableBackspaceKey(id);' data-required='false'>" + $('#slCalcBL').html() + "</select>"
                    + " <button id='btn-CalcBL" + item.ID + "' title='Search' " + "class='btn btn-sm btn-warning' onclick='PaymentRequest_CalcBL(" + item.ID + ");' type='button'>" + "<i class='fa fa-calculator'></i>" + "</button>"
                    : "")
                + "</td>"

                + "<td class='HouseNumber hide'  val=''><select  tag='" + (item.HouseID == 0 ? "" : item.HouseID) + "' id='slHouse" + item.ID + "'  class='controlStyle slHouse' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange=" + (IsMESCOCompany ? "'DetailHouseChanged(" + item.ID + ")'" : "''") + " onkeypress='DisableBackspaceKey(id);' data-required='false'><option value='" + item.HouseID + "' selected>" + item.HouseName + "</option></select></td>"

                + "<td class='FlagChargeType'  val=''><input id='cbFlagChargeType" + item.ID + "' " + (item.FilterChargeTypes ? "checked" : "") + "  name='FlagChargeType' onchange='GetChargeTypesToOperation(" + item.ID + ");' type='checkbox' value='" + item.FilterChargeTypes + "' /></td>"

                + "<td class='ChargeType'   style='width:15%;' val=''><select tag='" + (item.ChargeTypeID == 0 ? "" : item.ChargeTypeID) + "' id='slChargeType" + item.ID + "' style='width:100%;' class='controlStyle slChargeType' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  data-required='false'><option value='" + item.ChargeTypeID + "' selected>" + item.ChargeTypeName + "</option></select></td>"

                + "<td class='Payable'  val=''><select " + ((IsMESCOCompany && pLevel > 1) ? "disabled=disabled" : "")+" tag='" + (item.PayableID == 0 ? "" : item.PayableID) + "' id='slPayable" + item.ID + "'  onchange='' class='controlStyle slPayable' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange=''  data-required='false'><option value='" + item.PayableID + "' chargetypeid='" + item.ChargeTypeID + "' selected>" + item.ChargeTypeName + "</option></select></td>"

                + "<td class='CategoryName " + (IsMESCOCompany ? "" : "hide") + "'>" + (item.CategoryName == "0" ? "" : item.CategoryName) + "</td>"

                //add attribute
               // + "<td class='Supplier'  val=''><select  tag='" + (item.SupplierID == 0 ? "" : item.SupplierID) + "' id='slSupplier" + item.ID + "'  class='controlStyle slSupplier' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='' data-required='false'><option value='" + item.SupplierID + "' selected>" + item.SupplierName + "</option></select></td>"

                + "<td class='Supplier'  val=''><select  tag='" + (item.SupplierID == 0 ? "" : item.SupplierID) + "' id='slSupplier" + item.ID + "'  class='controlStyle slSupplier' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='' data-required='false'><option value='" + item.SupplierID + "' PartnerID='" + item.PartenerID + "' PartnerTypeID='" + item.PartenerTypeID + "' selected>" + item.SupplierName + "</option></select></td>"

                + "<td class='EstmatedCost'><input type='text' " + " tag='" + (item.EstmatedCost) + "'   id='txtEstmatedCost" + item.ID + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);PaymentRequestDetails_CalculateAmount();' onchange='PaymentRequestDetails_CalculateAmount();' data-required='true' value='" + item.EstmatedCost + "' /> </td>"

                + "<td class='TaxTypeID ' val=''><select  tag='" + (item.TaxTypeID == 0 ? "" : item.TaxTypeID) + "' id='slTaxVat" + item.ID + "'  onchange='' class='controlStyle slTaxVat' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange=''  data-required='false'>" + $('#slTaxVat').html() + "</select></td>"

                + "<td class='DiscountTypeID ' val=''><select tag='" + (item.DiscountTypeID == 0 ? "" : item.DiscountTypeID) + "' id='slTaxDiscount" + item.ID + "'  onchange='' class='controlStyle slTaxDiscount' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange=''  data-required='false'>" + $('#slTaxDiscount').html() + "</select></td>"

                + "<td class='Coupon hide' ><input type='text' tag='" + (item.Coupon) + "'  id='txtCoupon" + item.ID + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='true' value='" + item.Coupon + "' /> </td>"

                + "<td class='IsVATFromPRForm hide' ><input type='text' tag='" + (item.IsVATFromPRForm) + "'  id='txtIsVATFromPRForm" + item.IsVATFromPRForm + "' data-required='false' value='" + item.IsVATFromPRForm + "' /> </td>"

                + "<td class='SupplierInvoiceNo' ><input type='text' tag='" + (item.SupplierInvoiceNo) + "'  id='txtSupplierInvoiceNo" + item.ID + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='true' value='" + item.SupplierInvoiceNo + "' /> </td>"

                + "<td class='CostCenter'  style='min-width: 108px'  val=''><select  tag='" + (item.CostCenter_ID == 0 ? "" : item.CostCenter_ID) + "' id='slCostCenter" + item.ID + "' style='width:100%;' class='controlStyle slCostCenter' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slCostCenterHeader').html() + "</select></td>"

                + "<td class='Description' ><input type='text' tag='" + (item.Description) + "'  id='txtDescription" + item.ID + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='true' value='" + item.Description + "' /> </td>"
                + "</tr>"));
        rowsRendered++;
        //$("#slHouse" + item.ID).css({ "width": "100%" }).select2();
        //$("#slTruckingOrder" + item.ID).css({ "width": "100%" }).select2();
          $("#slOperation" + item.ID).css({ "width": "100%" }).select2();
        //$("#slSupplier" + item.ID).css({ "width": "100%" }).select2();
        //$("#slChargeType" + item.ID).css({ "width": "100%" }).select2();
        //$("#slPayable" + item.ID).css({ "width": "100%" }).select2();
        //$("#slCostCenter" + item.ID).css({ "width": "100%" }).select2();

        $("#slHouse" + item.ID).css({ "width": "100%" });
        $("#slTruckingOrder" + item.ID).css({ "width": "100%" });
        $("#slOperation" + item.ID).css({ "width": "100%" });
        $("#slSupplier" + item.ID).css({ "width": "100%" });
        $("#slChargeType" + item.ID).css({ "width": "100%" });
        $("#slPayable" + item.ID).css({ "width": "100%" });
        $("#slCostCenter" + item.ID).css({ "width": "100%" });

        if (rowsRendered - 1 == pInvoiceDetails.length - 1 /*i == pInvoiceDetails.length - 1*/) {
            debugger;
            FillHTMLtblInputs("#tblPaymentRequestDetails > tbody");

            if ($("#hf_CanDelete").val() == 1) {
                $("#btn-Approve").removeClass("hide");
               if (pDefaults.UnEditableCompanyName != "MES") 
                   $("#btn-UnApprove").removeClass("hide");                 
            }
            else {
                $("#btn-Approve").addClass("hide");
                $("#btn-UnApprove").addClass("hide");
            }
            if (pLoggedUser.IsAccessAllCharges == true) {
                $(".HouseNumber").removeClass("hide");
                $(".TruckingOrder").removeClass("hide");
                $(".Coupon").removeClass("hide");

                $(".classShowForDepartementHouse").removeClass("hide");
                $(".classShowForDepartementTrOr").removeClass("hide");
                $(".classShowForDepartementCopon").removeClass("hide");



            }
            else {
                if (pLoggedUser.DepartmentName == "TRANSPORTATION" || pLoggedUser.DepartmentName == "سائقى النقل" || pLoggedUser.DepartmentName == "مناديب النقل") {
                    $(".TruckingOrder").removeClass("hide");
                    $(".classShowForDepartementTrOr").removeClass("hide");

                    $(".PartenerType").removeClass("hide");
                    $(".classShowForDepartementPartenerType").removeClass("hide");

                    $(".Partener").removeClass("hide");
                    $(".classShowForDepartementPartener").removeClass("hide");
                }
                else if (pLoggedUser.DepartmentName == "مناديب قطاع الملاحة" || pLoggedUser.DepartmentName == "حبوب - جهات رقابية" || pLoggedUser.DepartmentName == "حاويات - جهات رقابية" ||
                    pLoggedUser.DepartmentName == "تموينات الملاحة" || pLoggedUser.DepartmentName == "تخليص - هيئة ميناء" || pLoggedUser.DepartmentName == "تخليص - جمرك حبوب"
                    || pLoggedUser.DepartmentName == "تخليص - جمرك بضائع عامة" || pLoggedUser.DepartmentName == "تخليص - توكيل" || pLoggedUser.DepartmentName == "SALES"
                    || pLoggedUser.DepartmentName == "INFORMATION TECHNOLOGY" || pLoggedUser.DepartmentName == "FREIGHT" || pLoggedUser.DepartmentName == "CUSTOMS CLEARANCE"
                    || pLoggedUser.DepartmentName == "ACCOUNTING TRUCKING" || pLoggedUser.DepartmentName == "ACCOUNTING SHIPPING - RECEIVAERS" || pLoggedUser.DepartmentName == "ACCOUNTING SHIPPING"
                    || pLoggedUser.DepartmentName == "ACCOUNTING CCA" || pLoggedUser.DepartmentName == "ACCOUNTING" || pLoggedUser.DepartmentName == "مناديب ملاحة / حجر و أمن وطنى") {
                    $(".HouseNumber").removeClass("hide");
                    $(".Coupon").removeClass("hide");

                    $(".classShowForDepartementHouse").removeClass("hide");
                    $(".classShowForDepartementCopon").removeClass("hide");
                }
            }

            if (pDefaults.UnEditableCompanyName != 'COS') {
                $(".TaxTypeID").removeClass("hide");
                $(".DiscountTypeID").removeClass("hide");
                //$(".TaxVatAmount").removeClass("hide");
                //$(".TaxDiscountAmount").removeClass("hide");


            }
            else {
                $(".TaxTypeID").addClass("hide");
                $(".DiscountTypeID").addClass("hide");
                //$(".TaxVatAmount").addClass("hide");
                //$(".TaxDiscountAmount").addClass("hide");

            }

            if (IsMESCOCompany) {
                $('.classHideForMesco').addClass('hide');
                $('.FlagChargeType').addClass('hide');
                $('.ChargeType').addClass('hide');
                $(".TaxVat").addClass("TaxTypeID");
                $(".TaxVat").removeClass("TaxVat");
                $(".TaxTypeID select").attr('onchange', 'PaymentRequestDetails_CalculateAmount();');
                $(".TaxDiscount").addClass("DiscountTypeID");
                $(".TaxDiscount").removeClass("TaxDiscount");
                $(".DiscountTypeID select").attr('onchange', 'PaymentRequestDetails_CalculateAmount();');
                //$(".TaxVat select").attr('onchange', 'PaymentRequestDetails_CalculateAmount();');
                //$(".TaxDiscount select").attr('onchange', 'PaymentRequestDetails_CalculateAmount();');
            }
            ////ApplyPermissions();
            //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
            BindAllCheckboxonTable("tblPaymentRequestDetails", "ID", "cb-CheckAll-PaymentRequestDetails");
            CheckAllCheckbox("HeaderDeletePaymentRequestDetailsID");
            if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
                swal(strSorry, strDeleteFailMessage, "warning");
                showDeleteFailMessage = false;
            }
        }
    }

    );

}
function PaymentRequestDetails_BindTableRows_Old(pInvoiceDetails) {
    debugger;
    check = 1;

    ClearAllTableRows("tblPaymentRequestDetails");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var rowsRendered = 0;
    $.each(pInvoiceDetails, function (i, item) {

        if (item.FilterChargeTypes) {
            GetChargeTypesToOperationWithPayablesIDs(item.OperationID, function () {
                debugger;
                AppendRowtoTable("tblPaymentRequestDetails",
                    ("<tr ID='" + item.ID + "' " + ">"
                        + "<td class='DetailsID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                        + "<td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + item.ID + "' checked='checked' /></td>"

                        + "<td class='SearchOperationCode' style='display:flex;gap:4px;'>      <input type='text' id='SearchOperationCode" + item.ID + "' style='padding:3px' onkeypress='DisableEnterKey(id);'>     <i class='fa fa-search' style='background-color:lightblue;border-radius:50%;padding:6px;cursor:pointer' onclick='LoadRequiredOperations(" + item.ID + ")'></i></td>"

                        //+ "<td class='Operation' style='width:20%;' val=''><select  tag='" + (item.OperationID == 0 ? "" : item.OperationID) + "' id='slOperation" + item.ID + "' style='width:100%;' class='controlStyle slOperation' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='GetSuppliers_Charges(" + item.ID + ");Details_HouseAndCertificateChangedByOperation(" + item.ID + ");GetSuppliers(" + item.ID + "," + item.SupplierID + ")' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slOperation').html() + "</select></td>"

                        + "<td class='Operation' style='width:20%;' val=''><select  tag='" + (item.OperationID == 0 ? "" : item.OperationID) + "' id='slOperation" + item.ID + "' style='width:100%;' class='controlStyle slOperation' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='GetSuppliers_Charges(" + item.ID + ");Details_HouseAndCertificateChangedByOperation(" + item.ID + ");GetSuppliers(" + item.ID + "," + item.SupplierID + ")' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'><option value='" + item.OperationID + "' selected>" + item.OperationCode + "</option></select></td>"

                        //  + "<td class='CertificateNumber' style='width:10%;' val=''><select  tag='" + (item.CertificateNumberID == 0 ? "" : item.CertificateNumberID) + "' id='slCertificateNumber" + item.ID + "' style='width:100%;' class='controlStyle slCertificateNumber' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slCertificateNumber').html() + "</select></td>"

                        //+ "<td class='TruckingOrder hide' style='display:flex;gap:10px;' val=''><select  tag='" + (item.TruckingOrderID == 0 ? "" : item.TruckingOrderID) + "' id='slTruckingOrder" + item.ID + "' style='width:100%;' class='controlStyle slTruckingOrder' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slTruckingOrder').html() + "</select>"

                        + "<td class='TruckingOrder hide'  val=''><select  tag='" + (item.TruckingOrderID == 0 ? "" : item.TruckingOrderID) + "' id='slTruckingOrder" + item.ID + "'  class='controlStyle slTruckingOrder' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'><option value='" + item.TruckingOrderID + "' selected>" + item.TruckingOrderCode + "</option></select></td>"

                        + (pDefaults.UnEditableCompanyName == "MES" ? " <select id='slCalcBL" + item.ID + "' class='controlStyle slCalcBL' " + "onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' " + "onkeypress='DisableBackspaceKey(id);' data-required='false'>" + $('#slCalcBL').html() + "</select>"
                            + " <button id='btn-CalcBL" + item.ID + "' title='Search' " + "class='btn btn-sm btn-warning' onclick='PaymentRequest_CalcBL(" + item.ID + ");' type='button'>" + "<i class='fa fa-calculator'></i>" + "</button>"
                            : "")
                        + "</td>"

                        + "<td class='HouseNumber hide' style='width:10%;' val=''><select  tag='" + (item.HouseID == 0 ? "" : item.HouseID) + "' id='slHouse" + item.ID + "' style='width:100%;' class='controlStyle slHouse' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slHouse').html() + "</select></td>"



                        + "<td class='FlagChargeType' style='width:5%;' val=''><input id='cbFlagChargeType" + item.ID + "' " + (item.FilterChargeTypes ? "checked" : "") + "  name='FlagChargeType' onchange='GetChargeTypesToOperation(" + item.ID + ");' type='checkbox' value='" + item.FilterChargeTypes + "' /></td>"

                        //+ "<td class='ChargeType' style='width:15%;' val=''><select tag='" + (item.ChargeTypeID == 0 ? "" : item.ChargeTypeID) + "' id='slChargeType" + item.ID + "' style='width:100%;' onchange='GetInitialValue(" + item.ID + " , false);' class='controlStyle slChargeType' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetInitialValue(" + item.ID + ");'  data-required='false'>" + $('#slChargeType').html() + "</select></td>"

                        + "<td class='ChargeType' style='width:15%;' val=''><select tag='" + (item.ChargeTypeID == 0 ? "" : item.ChargeTypeID) + "' id='slChargeType" + item.ID + "' style='width:100%;' class='controlStyle slChargeType' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'   data-required='false'><option value='" + item.ChargeTypeID + "' selected>" + item.ChargeTypeName + "</option></select></td>"


                        + "<td class='Payable' style='width:15%;' val=''><select tag='" + (item.PayableID == 0 ? "" : item.PayableID) + "' id='slPayable" + item.ID + "' style='width:100%;' onchange='GetPayablesToOperation(" + item.ID + " , false);' class='controlStyle slPayable' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetInitialValue(" + item.ID + ");'  data-required='false'>" + $('#slChargeTypeWithPayables').html() + "</select></td>"

                        + "<td class='Supplier' style='width:15%;' val=''><select  tag='" + (item.SupplierID == 0 ? "" : item.SupplierID) + "' id='slSupplier" + item.ID + "' style='width:100%;' class='controlStyle slSupplier' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='GetIssuedToBySupplier(" + item.SupplierID + ");' data-required='false'>" + $('#slSupplier').html() + "</select></td>"
                        + "<td class='EstmatedCost' style='width:9%;'><input type='text' tag='" + (item.EstmatedCost) + "' style='width:100%;font-size:90%;'  id='txtEstmatedCost" + item.ID + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);PaymentRequestDetails_CalculateAmount();' onchange='PaymentRequestDetails_CalculateAmount();' data-required='true' value='" + item.EstmatedCost + "' /> </td>"



                        + "<td class='TaxTypeID ' val=''><select  tag='" + (item.TaxTypeID == 0 ? "" : item.TaxTypeID) + "' id='slTaxVat" + item.ID + "'  onchange='' class='controlStyle slTaxVat' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange=''  data-required='false'>" + $('#slTaxVat').html() + "</select></td>"
                        //+ "<td class='TaxVatAmount hide'><input type='text' tag='" + (item.TaxVatAmount) + "'  id='txtTaxVatAmount" + item.ID + "' class='controlStyle inputTaxVatAmount'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='true' value='" + item.TaxVatAmount + "' /> </td>"

                        + "<td class='DiscountTypeID ' val=''><select  tag='" + (item.DiscountTypeID == 0 ? "" : item.DiscountTypeID) + "' id='slTaxDiscount" + item.ID + "'  onchange='' class='controlStyle slTaxDiscount' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange=''  data-required='false'>" + $('#slTaxDiscount').html() + "</select></td>"
                        // + "<td class='TaxDiscountAmount hide'><input type='text' tag='" + (item.TaxDiscountAmount) + "'  id='txtTaxDiscount" + item.ID + "' class='controlStyle inputTaxDiscount'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='true' value='" + item.TaxVatAmount + "' /> </td>"

                        + "<td class='IsVATFromPRForm hide' ><input type='text' tag='" + (item.IsVATFromPRForm) + "'  id='txtIsVATFromPRForm" + item.IsVATFromPRForm + "' data-required='false' value='" + item.IsVATFromPRForm + "' /> </td>"


                        + "<td class='Coupon hide' style='width:5%;'><input type='text' tag='" + (item.Coupon) + "' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtCoupon" + item.ID + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='true' value='" + item.Coupon + "' /> </td>"
                        + "<td class='SupplierInvoiceNo' style='width:5%;'><input type='text' tag='" + (item.SupplierInvoiceNo) + "' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtSupplierInvoiceNo" + item.ID + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='true' value='" + item.SupplierInvoiceNo + "' /> </td>"
                        + "<td class='CostCenter' style='min-width: 108px'  val=''><select  tag='" + (item.CostCenter_ID == 0 ? "" : item.CostCenter_ID) + "' id='slCostCenter" + item.ID + "' style='width:100%;' class='controlStyle slCostCenter' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slCostCenterHeader').html() + "</select></td>"
                        + "<td class='Description' style='width:5%;'><input type='text' tag='" + (item.Description) + "' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtDescription" + item.ID + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='true' value='" + item.Description + "' /> </td>"
                        + "</tr>"));

                rowsRendered++;
                $("#slHouse" + item.ID).css({ "width": "100%" });
                $("#slTruckingOrder" + item.ID).css({ "width": "100%" });
                $("#slOperation" + item.ID).css({ "width": "100%" });
                $("#slSupplier" + item.ID).css({ "width": "100%" });
                $("#slChargeType" + item.ID).css({ "width": "100%" });
                $("#slPayable" + item.ID).css({ "width": "100%" });
                $("#slCostCenter" + item.ID).css({ "width": "100%" });

                //$("#slHouse" + item.ID).css({ "width": "100%" }).select2();
                //$("#slTruckingOrder" + item.ID).css({ "width": "100%" }).select2();
                $("#slOperation" + item.ID).css({ "width": "100%" }).select2();
                //$("#slSupplier" + item.ID).css({ "width": "100%" }).select2();
                //$("#slChargeType" + item.ID).css({ "width": "100%" }).select2();
                //$("#slPayable" + item.ID).css({ "width": "100%" }).select2();
                //$("#slCostCenter" + item.ID).css({ "width": "100%" }).select2();

                if (rowsRendered - 1 == pInvoiceDetails.length - 1 /*i == pInvoiceDetails.length - 1*/) {
                    debugger;
                    FillHTMLtblInputs("#tblPaymentRequestDetails > tbody");

                    if ($("#hf_CanDelete").val() == 1) {
                        $("#btn-Approve").removeClass("hide");
                        if (pDefaults.UnEditableCompanyName != "MES") 
                              $("#btn-UnApprove").removeClass("hide");
                    }
                    else {
                        $("#btn-Approve").addClass("hide");
                        $("#btn-UnApprove").addClass("hide");
                    }
                    if (pLoggedUser.IsAccessAllCharges == true) {
                        $(".HouseNumber").removeClass("hide");
                        $(".TruckingOrder").removeClass("hide");
                        $(".Coupon").removeClass("hide");

                        $(".classShowForDepartementHouse").removeClass("hide");
                        $(".classShowForDepartementTrOr").removeClass("hide");
                        $(".classShowForDepartementCopon").removeClass("hide");



                    }
                    else {
                        if (pLoggedUser.DepartmentName == "TRANSPORTATION" || pLoggedUser.DepartmentName == "سائقى النقل" || pLoggedUser.DepartmentName == "مناديب النقل") {
                            $(".TruckingOrder").removeClass("hide");
                            $(".classShowForDepartementTrOr").removeClass("hide");

                            $(".PartenerType").removeClass("hide");
                            $(".classShowForDepartementPartenerType").removeClass("hide");

                            $(".Partener").removeClass("hide");
                            $(".classShowForDepartementPartener").removeClass("hide");
                        }
                        else if (pLoggedUser.DepartmentName == "مناديب قطاع الملاحة" || pLoggedUser.DepartmentName == "حبوب - جهات رقابية" || pLoggedUser.DepartmentName == "حاويات - جهات رقابية" ||
                            pLoggedUser.DepartmentName == "تموينات الملاحة" || pLoggedUser.DepartmentName == "تخليص - هيئة ميناء" || pLoggedUser.DepartmentName == "تخليص - جمرك حبوب"
                            || pLoggedUser.DepartmentName == "تخليص - جمرك بضائع عامة" || pLoggedUser.DepartmentName == "تخليص - توكيل" || pLoggedUser.DepartmentName == "SALES"
                            || pLoggedUser.DepartmentName == "INFORMATION TECHNOLOGY" || pLoggedUser.DepartmentName == "FREIGHT" || pLoggedUser.DepartmentName == "CUSTOMS CLEARANCE"
                            || pLoggedUser.DepartmentName == "ACCOUNTING TRUCKING" || pLoggedUser.DepartmentName == "ACCOUNTING SHIPPING - RECEIVAERS" || pLoggedUser.DepartmentName == "ACCOUNTING SHIPPING"
                            || pLoggedUser.DepartmentName == "ACCOUNTING CCA" || pLoggedUser.DepartmentName == "ACCOUNTING" || pLoggedUser.DepartmentName == "مناديب ملاحة / حجر و أمن وطنى") {
                            $(".HouseNumber").removeClass("hide");
                            $(".Coupon").removeClass("hide");

                            $(".classShowForDepartementHouse").removeClass("hide");
                            $(".classShowForDepartementCopon").removeClass("hide");
                        }
                    }

                    if (IsMESCOCompany) {
                        $('.classHideForMesco').addClass('hide');
                        $('.FlagChargeType').addClass('hide');
                        $('.ChargeType').addClass('hide');
                        $(".TaxVat").addClass("TaxTypeID");
                        $(".TaxVat").removeClass("TaxVat");
                        $(".TaxTypeID select").attr('onchange', 'PaymentRequestDetails_CalculateAmount();');
                        $(".TaxDiscount").addClass("DiscountTypeID");
                        $(".TaxDiscount").removeClass("TaxDiscount");
                        $(".DiscountTypeID select").attr('onchange', 'PaymentRequestDetails_CalculateAmount();');
                        //$(".TaxVat select").attr('onchange', 'PaymentRequestDetails_CalculateAmount();');
                        //$(".TaxDiscount select").attr('onchange', 'PaymentRequestDetails_CalculateAmount();');
                    }
                    ////ApplyPermissions();
                    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
                    BindAllCheckboxonTable("tblPaymentRequestDetails", "ID", "cb-CheckAll-PaymentRequestDetails");
                    CheckAllCheckbox("HeaderDeletePaymentRequestDetailsID");
                    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
                        swal(strSorry, strDeleteFailMessage, "warning");
                        showDeleteFailMessage = false;
                    }
                }

            })


        }
        else {
            AppendRowtoTable("tblPaymentRequestDetails",
                ("<tr ID='" + item.ID + "' " + ">"
                    + "<td class='DetailsID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + item.ID + "' checked='checked' /></td>"

                    + "<td class='SearchOperationCode' style='display:flex;gap:4px;'>      <input type='text' id='SearchOperationCode" + item.ID + "' style='padding:3px' onkeypress='DisableEnterKey(id);'>     <i class='fa fa-search' style='background-color:lightblue;border-radius:50%;padding:6px;cursor:pointer' onclick='LoadRequiredOperations(" + item.ID + ")'></i></td>"

                    //+ "<td class='Operation' style='width:20%;' val=''><select  tag='" + (item.OperationID == 0 ? "" : item.OperationID) + "' id='slOperation" + item.ID + "' style='width:100%;' class='controlStyle slOperation' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='GetSuppliers_Charges(" + item.ID + ");Details_HouseAndCertificateChangedByOperation(" + item.ID + ");GetSuppliers(" + item.ID + "," + item.SupplierID + ")' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slOperation').html() + "</select></td>"

                    + "<td class='Operation' style='width:20%;' val=''><select  tag='" + (item.OperationID == 0 ? "" : item.OperationID) + "' id='slOperation" + item.ID + "' style='width:100%;' class='controlStyle slOperation' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='GetSuppliers_Charges(" + item.ID + ");Details_HouseAndCertificateChangedByOperation(" + item.ID + ");GetSuppliers(" + item.ID + "," + item.SupplierID + ")' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'><option value='" + item.OperationID + "' selected>" + item.OperationCode + "</option></select></td>"

                    //  + "<td class='CertificateNumber' style='width:10%;' val=''><select  tag='" + (item.CertificateNumberID == 0 ? "" : item.CertificateNumberID) + "' id='slCertificateNumber" + item.ID + "' style='width:100%;' class='controlStyle slCertificateNumber' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slCertificateNumber').html() + "</select></td>"

                    //+ "<td class='TruckingOrder hide'  val=''><select  tag='" + (item.TruckingOrderID == 0 ? "" : item.TruckingOrderID) + "' id='slTruckingOrder" + item.ID + "'  class='controlStyle slTruckingOrder' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slTruckingOrder').html() + "</select></td>"

                    + "<td class='TruckingOrder hide'  val=''><select  tag='" + (item.TruckingOrderID == 0 ? "" : item.TruckingOrderID) + "' id='slTruckingOrder" + item.ID + "'  class='controlStyle slTruckingOrder' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'><option value='" + item.TruckingOrderID + "' selected>" + item.TruckingOrderCode + "</option></select></td>"


                    + "<td class='HouseNumber hide'  val=''><select  tag='" + (item.HouseID == 0 ? "" : item.HouseID) + "' id='slHouse" + item.ID + "'  class='controlStyle slHouse' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slHouse').html() + "</select></td>"



                    + "<td class='FlagChargeType'  val=''><input id='cbFlagChargeType" + item.ID + "' " + (item.FilterChargeTypes ? "checked" : "") + "  name='FlagChargeType' onchange='GetChargeTypesToOperation(" + item.ID + ");' type='checkbox' value='" + item.FilterChargeTypes + "' /></td>"

                    //+ "<td class='ChargeType'  val=''><select tag='" + (item.ChargeTypeID == 0 ? "" : item.ChargeTypeID) + "' id='slChargeType" + item.ID + "' onchange='GetInitialValue(" + item.ID + " , false);' class='controlStyle slChargeType' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetInitialValue(" + item.ID + ");'  data-required='false'>" + $('#slChargeType').html() + "</select></td>"

                    + "<td class='ChargeType' style='width:15%;' val=''><select tag='" + (item.ChargeTypeID == 0 ? "" : item.ChargeTypeID) + "' id='slChargeType" + item.ID + "' style='width:100%;' class='controlStyle slChargeType' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  data-required='false'><option value='" + item.ChargeTypeID + "' selected>" + item.ChargeTypeName + "</option></select></td>"

                    + "<td class='Payable'  val=''><select tag='" + (item.PayableID == 0 ? "" : item.PayableID) + "' id='slPayable" + item.ID + "'  onchange='GetPayablesToOperation(" + item.ID + " , false);' class='controlStyle slPayable' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetInitialValue(" + item.ID + ");'  data-required='false'>" + "<option value=0></option>" + "</select></td>"

                    + "<td class='Supplier'  val=''><select  tag='" + (item.SupplierID == 0 ? "" : item.SupplierID) + "' id='slSupplier" + item.ID + "'  class='controlStyle slSupplier' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='GetIssuedToBySupplier(" + item.SupplierID + ");' data-required='false'>" + $('#slSupplier').html() + "</select></td>"
                    + "<td class='EstmatedCost'><input type='text' tag='" + (item.EstmatedCost) + "'   id='txtEstmatedCost" + item.ID + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);PaymentRequestDetails_CalculateAmount();' onchange='PaymentRequestDetails_CalculateAmount();' data-required='true' value='" + item.EstmatedCost + "' /> </td>"

                    + "<td class='TaxTypeID ' val=''><select  tag='" + (item.TaxTypeID == 0 ? "" : item.TaxTypeID) + "' id='slTaxVat" + item.ID + "'  onchange='' class='controlStyle slTaxVat' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange=''  data-required='false'>" + $('#slTaxVat').html() + "</select></td>"
                    //+ "<td class='TaxVatAmount hide'><input type='text' tag='" + (item.TaxVatAmount) + "'  id='txtTaxVatAmount" + item.ID + "' class='controlStyle inputTaxVatAmount'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='true' value='" + item.TaxVatAmount + "' /> </td>"

                    + "<td class='DiscountTypeID ' val=''><select disabled tag='" + (item.DiscountTypeID == 0 ? "" : item.DiscountTypeID) + "' id='slTaxDiscount" + item.ID + "'  onchange='' class='controlStyle slTaxDiscount' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange=''  data-required='false'>" + $('#slTaxDiscount').html() + "</select></td>"
                    // + "<td class='TaxDiscountAmount hide'><input type='text' tag='" + (item.TaxDiscountAmount) + "'  id='txtTaxDiscount" + item.ID + "' class='controlStyle inputTaxDiscount'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='true' value='" + item.TaxVatAmount + "' /> </td>"



                    + "<td class='Coupon hide' ><input type='text' tag='" + (item.Coupon) + "'  id='txtCoupon" + item.ID + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='true' value='" + item.Coupon + "' /> </td>"
                    + "<td class='SupplierInvoiceNo' ><input type='text' tag='" + (item.SupplierInvoiceNo) + "'  id='txtSupplierInvoiceNo" + item.ID + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='true' value='" + item.SupplierInvoiceNo + "' /> </td>"
                    + "<td class='CostCenter'  style='min-width: 108px'  val=''><select  tag='" + (item.CostCenter_ID == 0 ? "" : item.CostCenter_ID) + "' id='slCostCenter" + item.ID + "' style='width:100%;' class='controlStyle slCostCenter' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slCostCenterHeader').html() + "</select></td>"
                    + "<td class='Description' ><input type='text' tag='" + (item.Description) + "'  id='txtDescription" + item.ID + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='true' value='" + item.Description + "' /> </td>"
                    + "</tr>"));
            rowsRendered++;
            //$("#slHouse" + item.ID).css({ "width": "100%" }).select2();
            //$("#slTruckingOrder" + item.ID).css({ "width": "100%" }).select2();
            $("#slOperation" + item.ID).css({ "width": "100%" }).select2();
            //$("#slSupplier" + item.ID).css({ "width": "100%" }).select2();
            //$("#slChargeType" + item.ID).css({ "width": "100%" }).select2();
            //$("#slPayable" + item.ID).css({ "width": "100%" }).select2();
            //$("#slCostCenter" + item.ID).css({ "width": "100%" }).select2();

            $("#slHouse" + item.ID).css({ "width": "100%" });
            $("#slTruckingOrder" + item.ID).css({ "width": "100%" });
            $("#slOperation" + item.ID).css({ "width": "100%" });
            $("#slSupplier" + item.ID).css({ "width": "100%" });
            $("#slChargeType" + item.ID).css({ "width": "100%" });
            $("#slPayable" + item.ID).css({ "width": "100%" });
            $("#slCostCenter" + item.ID).css({ "width": "100%" });

            if (rowsRendered - 1 == pInvoiceDetails.length - 1 /*i == pInvoiceDetails.length - 1*/) {
                debugger;
                FillHTMLtblInputs("#tblPaymentRequestDetails > tbody");

                if ($("#hf_CanDelete").val() == 1) {
                    $("#btn-Approve").removeClass("hide");
                  if (pDefaults.UnEditableCompanyName != "MES") 
                         $("#btn-UnApprove").removeClass("hide");
                }
                else {
                    $("#btn-Approve").addClass("hide");
                    $("#btn-UnApprove").addClass("hide");
                }
                if (pLoggedUser.IsAccessAllCharges == true) {
                    $(".HouseNumber").removeClass("hide");
                    $(".TruckingOrder").removeClass("hide");
                    $(".Coupon").removeClass("hide");

                    $(".classShowForDepartementHouse").removeClass("hide");
                    $(".classShowForDepartementTrOr").removeClass("hide");
                    $(".classShowForDepartementCopon").removeClass("hide");



                }
                else {
                    if (pLoggedUser.DepartmentName == "TRANSPORTATION" || pLoggedUser.DepartmentName == "سائقى النقل" || pLoggedUser.DepartmentName == "مناديب النقل") {
                        $(".TruckingOrder").removeClass("hide");
                        $(".classShowForDepartementTrOr").removeClass("hide");

                        $(".PartenerType").removeClass("hide");
                        $(".classShowForDepartementPartenerType").removeClass("hide");

                        $(".Partener").removeClass("hide");
                        $(".classShowForDepartementPartener").removeClass("hide");
                    }
                    else if (pLoggedUser.DepartmentName == "مناديب قطاع الملاحة" || pLoggedUser.DepartmentName == "حبوب - جهات رقابية" || pLoggedUser.DepartmentName == "حاويات - جهات رقابية" ||
                        pLoggedUser.DepartmentName == "تموينات الملاحة" || pLoggedUser.DepartmentName == "تخليص - هيئة ميناء" || pLoggedUser.DepartmentName == "تخليص - جمرك حبوب"
                        || pLoggedUser.DepartmentName == "تخليص - جمرك بضائع عامة" || pLoggedUser.DepartmentName == "تخليص - توكيل" || pLoggedUser.DepartmentName == "SALES"
                        || pLoggedUser.DepartmentName == "INFORMATION TECHNOLOGY" || pLoggedUser.DepartmentName == "FREIGHT" || pLoggedUser.DepartmentName == "CUSTOMS CLEARANCE"
                        || pLoggedUser.DepartmentName == "ACCOUNTING TRUCKING" || pLoggedUser.DepartmentName == "ACCOUNTING SHIPPING - RECEIVAERS" || pLoggedUser.DepartmentName == "ACCOUNTING SHIPPING"
                        || pLoggedUser.DepartmentName == "ACCOUNTING CCA" || pLoggedUser.DepartmentName == "ACCOUNTING" || pLoggedUser.DepartmentName == "مناديب ملاحة / حجر و أمن وطنى") {
                        $(".HouseNumber").removeClass("hide");
                        $(".Coupon").removeClass("hide");

                        $(".classShowForDepartementHouse").removeClass("hide");
                        $(".classShowForDepartementCopon").removeClass("hide");
                    }
                }

                if (pDefaults.UnEditableCompanyName != 'COS') {
                    $(".TaxTypeID").removeClass("hide");
                    $(".DiscountTypeID").removeClass("hide");
                    //$(".TaxVatAmount").removeClass("hide");
                    //$(".TaxDiscountAmount").removeClass("hide");


                }
                else {
                    $(".TaxTypeID").addClass("hide");
                    $(".DiscountTypeID").addClass("hide");
                    //$(".TaxVatAmount").addClass("hide");
                    //$(".TaxDiscountAmount").addClass("hide");

                }

                if (IsMESCOCompany) {
                    $('.classHideForMesco').addClass('hide');
                    $('.FlagChargeType').addClass('hide');
                    $('.ChargeType').addClass('hide');
                    $(".TaxVat").addClass("TaxTypeID");
                    $(".TaxVat").removeClass("TaxVat");
                    $(".TaxTypeID select").attr('onchange', 'PaymentRequestDetails_CalculateAmount();');
                    $(".TaxDiscount").addClass("DiscountTypeID");
                    $(".TaxDiscount").removeClass("TaxDiscount");
                    $(".DiscountTypeID select").attr('onchange', 'PaymentRequestDetails_CalculateAmount();');
                    //$(".TaxVat select").attr('onchange', 'PaymentRequestDetails_CalculateAmount();');
                    //$(".TaxDiscount select").attr('onchange', 'PaymentRequestDetails_CalculateAmount();');
                }
                ////ApplyPermissions();
                //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
                BindAllCheckboxonTable("tblPaymentRequestDetails", "ID", "cb-CheckAll-PaymentRequestDetails");
                CheckAllCheckbox("HeaderDeletePaymentRequestDetailsID");
                if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
                    swal(strSorry, strDeleteFailMessage, "warning");
                    showDeleteFailMessage = false;
                }
            }
        }

    }

    );

}


function FillItemsData() {
    if ($('#tblItems > tbody > tr').length > 0)
        FadePageCover(true)
    // FadePageCover(true)
    $($('#tblItems > tbody > tr')).each(function (i, tr) {
        $(tr).find('td.ItemID ').find('.selectitem').val($(tr).find('td.ItemID ').find('.selectitem').attr('tag'));
        $(tr).find('td.ServiceID ').find('.selectservice').val($(tr).find('td.ServiceID ').find('.selectservice').attr('tag'));
        $(tr).find('td.StoreID ').find('.selectstore').val($(tr).find('td.StoreID ').find('.selectstore').attr('tag'));
        // $(tr).find('td.LastUnitPrice ').find('.input_discount').val($(tr).find('td.LastUnitPrice ').find('.input_Lastunitprice').attr('tag'));
        debugger;


    });



}

function PaymentRequestDetails_BindTableRows_ForCopy(pInvoiceDetails) {
    ClearAllTableRows("tblPaymentRequestDetails");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pInvoiceDetails, function (i, item) {
        AppendRowtoTable("tblPaymentRequestDetails",
            ("<tr ID='" + i + "' " + ">"
                + "<td class='DetailsID'> <input name='Delete' type='checkbox' value='0' /></td>"
                + "<td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + i + "' checked='checked' /></td>"

                + "<td class='SearchOperationCode' style='display:flex;gap:4px;'>      <input type='text' id='SearchOperationCode" + item.ID + "' style='padding:3px' onkeypress='DisableEnterKey(id);'>     <i class='fa fa-search' style='background-color:lightblue;border-radius:50%;padding:6px;cursor:pointer' onclick='LoadRequiredOperations(" + item.ID + ")'></i></td>"

                //+ "<td class='Operation' style='width:20%;' val=''><select  tag='" + (item.OperationID == 0 ? "" : item.OperationID) + "' id='slOperation" + i + "' style='width:100%;' class='controlStyle slOperation' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='GetSuppliers_Charges(" + i + ");Details_HouseAndCertificateChangedByOperation(" + i + ");' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='true'>" + $('#slOperation').html() + "</select></td>"

                + "<td class='Operation' style='width:20%;' val=''><select  tag='" + (item.OperationID == 0 ? "" : item.OperationID) + "' id='slOperation" + i + "' style='width:100%;' class='controlStyle slOperation' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='GetSuppliers_Charges(" + i + ");Details_HouseAndCertificateChangedByOperation(" + i + ");' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='true'><option value='" + item.OperationID + "' selected>" + item.OperationCode + "</option></select></td>"

                // + "<td class='CertificateNumber' style='width:10%;' val=''><select  tag='" + (item.CertificateNumberID == 0 ? "" : item.CertificateNumberID) + "' id='slCertificateNumber" + item.ID + "' style='width:100%;' class='controlStyle slCertificateNumber' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='GetSuppliers_Charges(" + item.ID + ");' onkeypress='DisableBackspaceKey(id);' onchange='Details_ChangedByHouseAndCertificateAndTrucingOrder(" + maxDetailsIDInTable + ',' + 2 + "); ' data-required='true'>" + $('#slCertificateNumber').html() + "</select></td>"
                + "<td class='TruckingOrder' style='width:10%;' val=''><select  tag='" + (item.TruckingOrderID == 0 ? "" : item.TruckingOrderID) + "' id='slTruckingOrder" + item.ID + "' style='width:100%;' class='controlStyle slTruckingOrder' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange=" + (IsMESCOCompany ? "'DetailContainerChanged(" + item.ID + ")'" : "'GetSuppliers_Charges(" + item.ID + ");Details_ChangedByHouseAndCertificateAndTrucingOrder(" + maxDetailsIDInTable + ',' + 3 + ");'") + " onkeypress='DisableBackspaceKey(id);' data-required='true'>" + $('#slTruckingOrder').html() + "</select></td>"
                + "<td class='HouseNumber' style='width:10%;' val=''><select  tag='" + (item.HouseID == 0 ? "" : item.HouseID) + "' id='slHouse" + i + "' style='width:100%;' class='controlStyle slHouse' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange=" + (IsMESCOCompany ? "'DetailHouseChanged(" + item.ID + ")'" : "'GetSuppliers_Charges(" + i + ");Details_ChangedByHouseAndCertificateAndTrucingOrder(" + maxDetailsIDInTable + ',' + 1 + ");'") + " onkeypress='DisableBackspaceKey(id);'  data-required='true'>" + $('#slHouse').html() + "</select></td>"

                + "<td class='FlagChargeType' style='width:5%;' val=''><input id='cbFlagChargeType" + i + "' " + (item.FilterChargeTypes ? "checked" : "") + "  name='FlagChargeType' onchange='GetChargeTypesToOperation(" + i + ");' type='checkbox' value='" + item.FilterChargeTypes + "' /></td>"
                + "<td class='ChargeType' style='width:15%;' val=''><select tag='" + (item.ChargeTypeID == 0 ? "" : item.ChargeTypeID) + "' id='slChargeType" + i + "' style='width:100%;' onchange='GetInitialValue(" + i + ");' class='controlStyle slChargeType' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetInitialValue(" + i + ");'  data-required='false'>" + $('#slChargeType').html() + "</select></td>"
                + "<td class='Supplier' style='width:15%;' val=''><select  tag='" + (item.SupplierID == 0 ? "" : item.SupplierID) + "' id='slSupplier" + i + "' style='width:100%;' class='controlStyle slSupplier' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='GetIssuedToBySupplier(" + item.SupplierID + ");' data-required='false'>" + $('#slSupplier').html() + "</select></td>"
                + "<td class='EstmatedCost' style='width:9%;'><input type='text' tag='" + (item.EstmatedCost) + "' style='width:100%;font-size:90%;'  id='txtEstmatedCost" + i + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);PaymentRequestDetails_CalculateAmount();' onchange='PaymentRequestDetails_CalculateAmount();' data-required='true' value='" + item.EstmatedCost + "' /> </td>"
                + "<td class='Description' style='width:5%;'><input type='text' tag='" + (item.Description) + "' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtDescription" + i + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='true' value='" + item.Description + "' /> </td>"
                + "</tr>"));

        if (i == pInvoiceDetails.length - 1) {
            debugger;
            FillHTMLtblInputs("#tblPaymentRequestDetails > tbody");
        }
    }

    );
    ////ApplyPermissions();
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    BindAllCheckboxonTable("tblPaymentRequestDetails", "ID", "cb-CheckAll-PaymentRequestDetails");
    CheckAllCheckbox("HeaderDeletePaymentRequestDetailsID");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
var OperID = 0;
function CustodySettlementDetails_BindTableRows(pInvoiceDetails) {

    debugger;

    $('#tblPaymentRequestDetails').html("")

    if (true) {
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
            var CT_TH = '<thead><tr class="swapChildrenClass"><th id="HeaderDeletePaymentRequestDetailsID" style="width:5%;"><input id="cb-CheckAll-PaymentRequestDetails" type="checkbox"></th>' +
                '<th></th><th>رقم العملية</th><th class="classShowForDepartementHouse hide"> امر النقل</th> <th class="classShowForDepartementTrOr hide"> البوليصة </th><th Class="classHideForMesco"> اختيار بنود العملية</th><th Class="classHideForMesco">البند</th><th Class="classShowForMesco hide">المصروف</th><th>المورد</th><th>التكلفة المتوقعة</th><th>التكلفة الفعلية</th><th class="classShowForDepartementPartenerType hide">نوع الشريك </th><th class="classShowForDepartementPartener hide">الشريك</th><th class="ShowClassForTransCompany hide">Vat</th><th class="ShowClassForTransCompany hide">Wht</th> <th class="classShowForDepartementCopon hide">القسيمة</th>' +
                '<th>رقم فاتوره المورد</th><th>الملاحظات</th><th class="rounded-right hide"></th></tr></thead> <tbody></tbody>';

        } else {
            var CT_TH = '<thead><tr class="swapChildrenClass"><th id="HeaderDeletePaymentRequestDetailsID" style="width:5%;"><input id="cb-CheckAll-PaymentRequestDetails" type="checkbox"></th>' +
                '<th></th><th>Operation Number</th><th class="classShowForDepartementHouse hide"> Trucking Order</th> <th class="classShowForDepartementTrOr hide"> House Number</th><th Class="classHideForMesco">Choose process items</th><th Class="classHideForMesco">ChargeType</th><th Class="classShowForMesco hide">Payable</th><th Class="classShowForMesco hide">Category Name</th><th>Supplier</th><th> Estimated Cost</th><th> Actual Cost</th><th class="classShowForDepartementPartenerType hide">PartenerType</th><th class="classShowForDepartementPartener hide">Partener</th><th class="ShowClassForTransCompany hide">Vat</th><th class="ShowClassForTransCompany hide">Wht</th> <th class="classShowForDepartementCopon hide">Copon</th>' +
                '<th>SupplierInvNo.</th><th>Description</th><th class="rounded-right hide"></th></tr></thead> <tbody></tbody>';

        }
    }
    else {
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
            var CT_TH = '<thead><tr class="swapChildrenClass"><th id="HeaderDeletePaymentRequestDetailsID" style="width:5%;"><input id="cb-CheckAll-PaymentRequestDetails" type="checkbox"></th>' +
                '<th>رقم العملية</th><th class="classShowForDepartementHouse hide">امر النقل  </th> <th class="classShowForDepartementTrOr hide">البوليصة </th><th Class="classHideForMesco"> اختيار بنود العملية</th><th Class="classHideForMesco">البند</th><th Class="classShowForMesco hide">المصروف</th><th>المورد</th><th>التكلفة المتوقعة</th><th>التكلفة الفعلية</th><th class="classShowForDepartementPartenerType hide">نوع الشريك </th><th class="classShowForDepartementPartener hide">الشريك</th> <th class="classShowForDepartementCopon hide">القسيمة</th>' +
                '<th>الملاحظات</th><th class="rounded-right hide"></th></tr></thead> <tbody></tbody>';

        } else {
            var CT_TH = '<thead><tr class="swapChildrenClass"><th id="HeaderDeletePaymentRequestDetailsID" style="width:5%;"><input id="cb-CheckAll-PaymentRequestDetails" type="checkbox"></th>' +
                '<th>Operation Number</th><th class="classShowForDepartementHouse hide"> </th> Trucking Order<th class="classShowForDepartementTrOr hide"> House Number</th><th Class="classHideForMesco">Choose process items</th><th Class="classHideForMesco">ChargeType</th><th Class="classShowForMesco hide">Payable</th><th>Supplier</th><th> Estimated Cost</th><th> Actual Cost</th><th class="classShowForDepartementPartenerType hide">PartenerType</th><th class="classShowForDepartementPartener hide">Partener</th> <th class="classShowForDepartementCopon hide">Copon</th>' +
                '<th>Description</th><th class="rounded-right hide"></th></tr></thead> <tbody></tbody>';

        }
    }
    
    $('#tblPaymentRequestDetails').html(CT_TH);

    ClearAllTableRows("tblPaymentRequestDetails");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pInvoiceDetails, function (i, item) {
        AppendRowtoTable("tblPaymentRequestDetails",
            ("<tr ID='" + item.ID + "' " + ">"
                + "<td class='DetailsID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + item.ID + "' checked='checked' /></td>"

                + "<td class='SearchOperationCode' style='display:flex;gap:4px;'>      <input type='text' id='SearchOperationCode" + item.ID + "' style='padding:3px' onkeypress='DisableEnterKey(id);'>     <i class='fa fa-search' style='background-color:lightblue;border-radius:50%;padding:6px;cursor:pointer' onclick='LoadRequiredOperations(" + item.ID + ")'></i></td>"

                //+ "<td class='Operation' style='width:20%;' val=''><select disabled  tag='" + (item.OperationID) + "' id='slOperation" + item.ID + "' style='width:100%;' class='controlStyle slOperation' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'   onchange='GetSuppliers_ChargesCustudy(" + item.ID + "," + item.SupplierID + ");Details_HouseAndCertificateChangedByOperation(" + item.ID + ");'  data-required='false'>" + $('#slOperation').html() + "</select></td>"

                + "<td class='Operation' style='width:20%;' val=''><select  tag='" + (item.OperationID == 0 ? "" : item.OperationID) + "' id='slOperation" + item.ID + "' style='width:100%;' class='controlStyle slOperation' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='GetSuppliers_Charges(" + item.ID + ");Details_HouseAndCertificateChangedByOperation(" + item.ID + ");GetSuppliers(" + item.ID + "," + item.SupplierID + ")' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'><option value='" + item.OperationID + "' selected>" + item.OperationCode + "</option></select></td>"


                // + "<td class='CertificateNumber' style='width:10%;' val=''><select disabled  tag='" + (item.CertificateNumberID) + "' id='slCertificateNumber" + item.ID + "' style='width:100%;' class='controlStyle slCertificateNumber' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'   onchange='GetSuppliers_Charges(" + item.ID + ");'  data-required='false'>" + $('#slCertificateNumber').html() + "</select></td>"
                + "<td class='TruckingOrder hide' style='display: flex; gap: 8px;' val=''><select tag='" + (item.TruckingOrderID == 0 ? "" : item.TruckingOrderID) + "' id='slTruckingOrder" + item.ID + "' style='width:100%;' class='controlStyle slTruckingOrder' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);'  onkeypress='DisableBackspaceKey(id);' onchange='GetSuppliers_ChargesCustudy(" + item.ID + "," + item.SupplierID + ");' data-required='false'>" + $('#slTruckingOrder').html() + "</select>"

                + (pDefaults.UnEditableCompanyName == "MES" ? " <select id='slCalcBL" + item.ID + "' class='controlStyle slCalcBL' " + "onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' " + "onkeypress='DisableBackspaceKey(id);' data-required='false'>" + $('#slCalcBL').html() + "</select>"
                    + " <button id='btn-CalcBL" + item.ID + "' title='Search' " + "class='btn btn-sm btn-warning' onclick='PaymentRequest_CalcBL(" + item.ID + ");' type='button'>" + "<i class='fa fa-calculator'></i>" + "</button>"
                    : "")
                + "</td>"

                + "<td class='HouseNumber hide' style='width:10%;' val=''><select  tag='" + (item.HouseID) + "' id='slHouse" + item.ID + "' style='width:100%;' class='controlStyle slHouse' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'   onchange='GetSuppliers_ChargesCustudy(" + item.ID + "," + item.SupplierID + ");'  data-required='false'>" + $('#slHouse').html() + "</select></td>"

                + "<td class='FlagChargeType' style='width:5%;' val=''><input disabled id='cbFlagChargeType" + item.ID + "' " + (item.FilterChargeTypes ? "checked" : "") + "  name='FlagChargeType' onchange='GetChargeTypesToOperation(" + item.ID + ");' type='checkbox' value='" + item.FilterChargeTypes + "' /></td>"
                + "<td class='ChargeType' style='width:10%;' val=''><select disabled tag='" + (item.ChargeTypeID == 0 ? "" : item.ChargeTypeID) + "' id='slChargeType" + item.ID + "' style='width:100%;' onchange='GetInitialValue(" + item.ID + " , false);' class='controlStyle slChargeType' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetInitialValue(" + item.ID + ");'  data-required='false'>" + $('#slChargeType').html() + "</select></td>"
                + "<td class='Payable hide' style='width:10%;' val=''><select disabled tag='" + (item.PayableID == 0 ? "" : item.PayableID) + "' id='slPayable" + item.ID + "' style='width:100%;' onchange='' class='controlStyle slPayable' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange=''  data-required='false'>" + "<option selected value=' " + item.PayableID + " 'chargetypeid ='" + item.ChargeTypeID + "'>" + item.ChargeTypeName + "</option>" + "</select></td>"

                + "<td class='CategoryName " + (IsMESCOCompany ? "" : "hide") + "'>" + (item.CategoryName == "0" ? "" : item.CategoryName) + "</td>"

                + "<td class='Supplier' val=''><select " + (IsMESCOCompany ? "" : "disabled") + " tag='" + (item.SupplierID == 0 ? "" : item.SupplierID) + "' id='slSupplier" + item.ID + "'  onchange='' class='controlStyle slSupplier' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetIssuedToBySupplier(" + item.SupplierID + ");" + ((IsMESCOCompany && (glbCallingControl == 'CustodySettlement')) ? "data-required='true'" : "data-required='false'") +">" + $('#slSupplier').html() + "</select></td>"

                //+ "<td class='Supplier' style='width:10%;' val=''><select disabled  tag='" + (item.SupplierID == 0 ? "" : item.SupplierID) + "' id='slSupplier" + item.ID + "' style='width:100%;' class='controlStyle slSupplier' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slSupplier').html() + "</select></td>"
                + "<td class='EstmatedCost' style='width:9%;'><input disabled type='text' tag='" + (item.EstmatedCost) + "' style='width:100%;font-size:90%;'  id='txtEstmatedCost" + item.ID + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);PaymentRequestDetails_CalculateAmount();' onchange='PaymentRequestDetails_CalculateAmount();' data-required='true' value='" + item.EstmatedCost + "' /> </td>"
                + "<td class='ActualCost' style='width:9%;'><input type='text' tag='" + (item.ActualCost == 0 && !item.isRetrieved ? "" : item.ActualCost) + "' style='width:100%;font-size:90%;'  id='txtActualCost" + item.ID + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);PaymentRequestDetails_CalculateAmount();' onchange='PaymentRequestDetails_CalculateAmount();  ChangeisRetrieved(" + item.ID + ");' data-required='false' value='" + (item.ActualCost == 0 ? 0 : item.ActualCost) + "' /> </td>"
                + "<td class='PartenerType hide' style='width:10%;' val=''><select  tag='" + (item.PartenerTypeID == 0 ? "" : item.PartenerTypeID) + "' id='slPartenerType" + item.ID + "' style='width:100%;' class='controlStyle slPartenerType' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='Details_FillSlPartenerByPartenerType(" + item.ID + ");' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slPartenerType').html() + "</select></td>"
                + "<td class='Partener hide' style='width:10%;' val=''><select  tag='" + (item.PartenerID == 0 ? "" : item.PartenerID) + "' id='slPartener" + item.ID + "' style='width:100%;' class='controlStyle slPartener' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slPartener').html() + "</select></td>"

                + "<td class='TaxTypeID hide' val=''><select tag='" + (item.TaxTypeID == 0 ? "" : item.TaxTypeID) + "' id='slTaxVat" + item.ID + "'  onchange='' class='controlStyle slTaxVat' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange=''  data-required='false'>" + $('#slTaxVat').html() + "</select></td>"
                //+ "<td class='TaxVatAmount hide'><input type='text' tag='" + (item.TaxVatAmount) + "'  id='txtTaxVatAmount" + item.ID + "' class='controlStyle inputTaxVatAmount'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='true' value='" + item.TaxVatAmount + "' /> </td>"

                + "<td class='DiscountTypeID hide' val=''><select tag='" + (item.DiscountTypeID == 0 ? "" : item.DiscountTypeID) + "' id='slTaxDiscount" + item.ID + "'  onchange='' class='controlStyle slTaxDiscount' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange=''  data-required='false'>" + $('#slTaxDiscount').html() + "</select></td>"
                + "<td class='IsVATFromPRForm hide' ><input type='text' tag='" + (item.IsVATFromPRForm) + "'  id='txtIsVATFromPRForm" + item.ID + "' data-required='false' value='" + item.IsVATFromPRForm + "' /> </td>"

                + "<td class='Coupon hide' style='width:5%;'><input type='text' tag='" + (item.Coupon) + "' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtCoupon" + item.ID + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='true' value='" + item.Coupon + "' /> </td>"
                + "<td class='SupplierInvoiceNo' style='width:5%;'><input type='text' tag='" + (item.SupplierInvoiceNo) + "' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtSupplierInvoiceNo" + item.ID + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='true' value='" + item.SupplierInvoiceNo + "' /> </td>" //line added by sherif for NewTrans
                + "<td class='Description hide' style='width:5%;'><input type='text' tag='" + (item.Description) + "' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtDescription" + item.ID + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='true' value='" + item.Description + "' /> </td>"
                + "<td class='ActualDescription' style='width:10%;'><input type='text' tag='" + (item.ActualDescription) + "' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtActualDescription" + item.ID + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='true' value='" + item.ActualDescription + "' /> </td>"
                + "<td class='IsSettlementOnly hide' style='width:10%;'><input type='text' tag='" + (item.IsSettlementOnly) + "' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtIsSettlementOnly" + item.ID + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + item.IsSettlementOnly + "' /> </td>"
                + "<td class='isRetrieved hide' style='width:10%;'><input type='text' tag='" + (item.isRetrieved) + "' style='width:100%;font-size:90%;text-transform:uppercase;' id='isRetrieved" + item.ID + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + item.isRetrieved + "' /> </td>"

                + "</tr>"));

        if (i == pInvoiceDetails.length - 1) {
            debugger;
            FillHTMLtblInputs("#tblPaymentRequestDetails > tbody");
        }
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();


        OperID = item.OperationID;
    }

    );
    if (pDefaults.UnEditableCompanyName != 'COS') {
        $(".TaxTypeID").removeClass("hide");
        $(".DiscountTypeID").removeClass("hide");
        //$(".TaxVatAmount").removeClass("hide");
        //$(".TaxDiscountAmount").removeClass("hide");
        $(".ShowClassForTransCompany").removeClass("hide");

    }
    else {
        $(".TaxTypeID").addClass("hide");
        $(".DiscountTypeID").addClass("hide");
        //$(".TaxVatAmount").addClass("hide");
        //$(".TaxDiscountAmount").addClass("hide");
        $(".ShowClassForTransCompany").addClass("hide");

    }

    if (pLoggedUser.IsAccessAllCharges == true) {
        $(".HouseNumber").removeClass("hide");
        $(".TruckingOrder").removeClass("hide");
        $(".Coupon").removeClass("hide");

        $(".classShowForDepartementHouse").removeClass("hide");
        $(".classShowForDepartementTrOr").removeClass("hide");
        $(".classShowForDepartementCopon").removeClass("hide");



    }
    else {
        if (pLoggedUser.DepartmentName == "TRANSPORTATION" || pLoggedUser.DepartmentName == "سائقى النقل" || pLoggedUser.DepartmentName == "مناديب النقل") {
            $(".TruckingOrder").removeClass("hide");
            $(".classShowForDepartementTrOr").removeClass("hide");

            $(".PartenerType").removeClass("hide");
            $(".classShowForDepartementPartenerType").removeClass("hide");

            $(".Partener").removeClass("hide");
            $(".classShowForDepartementPartener").removeClass("hide");
        }
        else if (pLoggedUser.DepartmentName == "مناديب قطاع الملاحة" || pLoggedUser.DepartmentName == "حبوب - جهات رقابية" || pLoggedUser.DepartmentName == "حاويات - جهات رقابية" ||
            pLoggedUser.DepartmentName == "تموينات الملاحة" || pLoggedUser.DepartmentName == "تخليص - هيئة ميناء" || pLoggedUser.DepartmentName == "تخليص - جمرك حبوب"
            || pLoggedUser.DepartmentName == "تخليص - جمرك بضائع عامة" || pLoggedUser.DepartmentName == "تخليص - توكيل" || pLoggedUser.DepartmentName == "SALES"
            || pLoggedUser.DepartmentName == "INFORMATION TECHNOLOGY" || pLoggedUser.DepartmentName == "FREIGHT" || pLoggedUser.DepartmentName == "CUSTOMS CLEARANCE"
            || pLoggedUser.DepartmentName == "ACCOUNTING TRUCKING" || pLoggedUser.DepartmentName == "ACCOUNTING SHIPPING - RECEIVAERS" || pLoggedUser.DepartmentName == "ACCOUNTING SHIPPING"
            || pLoggedUser.DepartmentName == "ACCOUNTING CCA" || pLoggedUser.DepartmentName == "ACCOUNTING" || pLoggedUser.DepartmentName == "مناديب ملاحة / حجر و أمن وطنى") {
            $(".HouseNumber").removeClass("hide");
            $(".Coupon").removeClass("hide");

            $(".classShowForDepartementHouse").removeClass("hide");
            $(".classShowForDepartementCopon").removeClass("hide");
        }

        
    }

    if (pDefaults.UnEditableCompanyName == "MES") {
        $('.classHideForMesco').addClass('hide');
        $('.classShowForMesco').removeClass('hide');
        $('.FlagChargeType').addClass('hide');
        $('.ChargeType').addClass('hide');
        $('.Payable').removeClass('hide');
        $(".TaxTypeID select").attr('onchange', 'PaymentRequestDetails_CalculateAmount();');
        $(".DiscountTypeID select").attr('onchange', 'PaymentRequestDetails_CalculateAmount();');
        $("#tblPaymentRequestDetails>tbody>tr").each(function (i, tr) {
            if ((($(tr).find('td.TaxTypeID select').val() != null && $(tr).find('td.TaxTypeID select').val() != 0) || ($(tr).find('td.DiscountTypeID select').val() != null && $(tr).find('td.DiscountTypeID select').val() != 0)) && $(tr).find('td.IsVATFromPRForm input[type="text"]').val() == 'true') {
                $(tr).find(".TaxTypeID select").attr('disabled', 'disabled');
                $(tr).find(".DiscountTypeID select").attr('disabled', 'disabled');
            }
        });
    }

    ////ApplyPermissions();
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    BindAllCheckboxonTable("tblPaymentRequestDetails", "ID", "cb-CheckAll-PaymentRequestDetails");
    CheckAllCheckbox("HeaderDeletePaymentRequestDetailsID");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}

function PaymentRequestDetails_DeleteList() {
    debugger;
    var Flag = 0;
    var pDeletedPaymentRequestDetailsIDs = '';
    var pDeletedIDs = GetAllSelectedIDsAsString('tblPaymentRequestDetails');
    var pAllDetailsIDs = GetAllIDsAsStringWithNameAttr('tblPaymentRequestDetails', "Delete");
    $("#tblPaymentRequestDetails tbody tr").each(function () {
        if ($(this).find('input[name="' + "Delete" + '"]:checked').length > 0)
            if (_IsCustodySettlement == 1) {

                $("#tblPaymentRequestDetails>tbody>tr").each(function (i, tr) {
                    if ($(tr).find('td.EstmatedCost input[type="text"]').val() != undefined && $(tr).find('td.EstmatedCost input[type="text"]').val() != "" && $(tr).find('td.EstmatedCost input[type="text"]').val() != "0") {
                        Flag = 1;
                    }
                    else {
                        pDeletedPaymentRequestDetailsIDs += ((pDeletedPaymentRequestDetailsIDs == "") ? "" : ",") + ($(this).attr('ID'));

                    }
                  
                });

                //if (Flag==0) {
                //    pDeletedPaymentRequestDetailsIDs += ((pDeletedPaymentRequestDetailsIDs == "") ? "" : ",") + ($(this).attr('ID'));
                //}
                //else {
                //    swal("Sorry", "ActualCost have amount");
                //}

            }
            else {
                pDeletedPaymentRequestDetailsIDs += ((pDeletedPaymentRequestDetailsIDs == "") ? "" : ",") + ($(this).attr('ID'));

            }
    });
    // var pDeletedPaymentRequestDetailsIDs = GetAllSelectedIDsAsStringWithTableNameAndNameAttr("tblPaymentRequestDetails", "Delete");
    if (pDeletedPaymentRequestDetailsIDs != "" && pDeletedIDs != pAllDetailsIDs)
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
                //if (ValidateForm("form", "PaymentRequestModal")) {
                FadePageCover(true);
                var pParametersWithValues = {
                    pDeletedPaymentRequestDetailsIDs: pDeletedIDs
                    //Header
                    , pPaymentRequestID: $("#hID").val() == "" ? 0 : $("#hID").val()
                };
                CallGETFunctionWithParameters("/api/PaymentRequest/Details_Delete", pParametersWithValues
                    , function (pData) {
                        if (pData[0]) {
                            PaymentRequest_LoadingWithPaging();
                            for (var i = 0; i < pDeletedPaymentRequestDetailsIDs.split(",").length; i++) {
                                $("#tblPaymentRequestDetails tbody tr[Counter=" + pDeletedPaymentRequestDetailsIDs.split(",")[i] + "]").remove();
                                $("#tblPaymentRequestDetails tbody tr[ID=" + pDeletedPaymentRequestDetailsIDs.split(",")[i] + "]").remove();
                            }
                            PaymentRequestDetails_CalculateAmount();
                        }
                        else
                            swal("Sorry", "Connection failed, please try again.");
                        FadePageCover(false);
                    }
                    , null);
                //}
            });//of swal
    else {
        swal("Sorry", "Cannot delete all details, at least one detail must remain");
    }
}
function PaymentRequestDetails_CalculateAmount() {
    debugger;
    var pSum = 0;
    if(IsMESCOCompany)
        $("#tblPaymentRequestDetails>tbody>tr").each(function (i, tr) {
            if ($(tr).find('td.CategoryName').text().includes("OFFICIAL RECEIPTS") && ($(tr).find('td.TaxTypeID select, td.TaxTypeID input').val() != '0' || $(tr).find('td.DiscountTypeID select, td.DiscountTypeID input').val() != '0')) {
                if ($(tr).find('td.TaxTypeID select, td.TaxTypeID input').val() != null || $(tr).find('td.DiscountTypeID select, td.DiscountTypeID input').val() != null )
                swal("Sorry", "Cannot Add Tax or Discount On An OFFICIAL RECEIPTS Payable.");
                $(tr).find('td.TaxTypeID select, td.TaxTypeID input').val('0');
                $(tr).find('td.DiscountTypeID select, td.DiscountTypeID input').val('0');
            }

        });
    if (_IsCustodySettlement == 0) {
            $("#tblPaymentRequestDetails>tbody>tr").each(function (i, tr) {
            if ($(tr).find('td.EstmatedCost input[type="text"]').val() != 'undefined'
                && $(tr).find('td.EstmatedCost input[type="text"]').val() != undefined
                && $(tr).find('td.EstmatedCost input[type="text"]').val() != '') {
                var Value = $(tr).find('td.EstmatedCost input[type="text"]').val();
                pSum += parseFloat(Value);
                if (IsMESCOCompany) {
                    
                    if ($(tr).find('td.TaxTypeID select').val() != null && $(tr).find('td.TaxTypeID select').val() != '0'
                        && $(tr).find('td.TaxTypeID select').val() != '' && $(tr).find('td.TaxTypeID select').val() != 'undefined' && $(tr).find('td.TaxTypeID select').val() != undefined) {
                        let VATPercentage = $(tr).find('td.TaxTypeID select option:selected').attr('currentpercentage');
                        pSum += parseFloat(Value * (parseInt(VATPercentage) / 100));
                    }
                    if ($(tr).find('td.DiscountTypeID select').val() != null && $(tr).find('td.DiscountTypeID select').val() != '0'
                        && $(tr).find('td.DiscountTypeID select').val() != '' && $(tr).find('td.DiscountTypeID select').val() != 'undefined' && $(tr).find('td.DiscountTypeID select').val() != undefined) {
                        let DiscountPercentage = $(tr).find('td.DiscountTypeID select option:selected').attr('currentpercentage');
                        pSum -= parseFloat(Value * (parseInt(DiscountPercentage) / 100));
                    }
                }
            }
        });
        $("#txtAmount").val(pSum.toFixed(2));
    }
    else {
        $("#tblPaymentRequestDetails>tbody>tr").each(function (i, tr) {
            if ($(tr).find('td.ActualCost input[type="text"]').val() != 'undefined'
                && $(tr).find('td.ActualCost input[type="text"]').val() != undefined
                && $(tr).find('td.ActualCost input[type="text"]').val() != '') {
                var Value = $(tr).find('td.ActualCost input[type="text"]').val();
                pSum += parseFloat(Value);
                if (IsMESCOCompany) {
                   
                    if ($(tr).find('td.TaxTypeID select').val() != null && $(tr).find('td.TaxTypeID select').val() != '0'
                        && $(tr).find('td.TaxTypeID select').val() != '' && $(tr).find('td.TaxTypeID select').val() != 'undefined' && $(tr).find('td.TaxTypeID select').val() != undefined && $(tr).find('td.IsVATFromPRForm input').val() != 'true') {
                        let VATPercentage = $(tr).find('td.TaxTypeID select option:selected').attr('currentpercentage');
                        pSum += parseFloat(Value * (parseInt(VATPercentage) / 100));
                    }
                    if ($(tr).find('td.DiscountTypeID select').val() != null && $(tr).find('td.DiscountTypeID select').val() != '0'
                        && $(tr).find('td.DiscountTypeID select').val() != '' && $(tr).find('td.DiscountTypeID select').val() != 'undefined' && $(tr).find('td.DiscountTypeID select').val() != undefined && $(tr).find('td.IsVATFromPRForm input').val() != 'true') {
                        let DiscountPercentage = $(tr).find('td.DiscountTypeID select option:selected').attr('currentpercentage');
                        pSum -= parseFloat(Value * (parseInt(DiscountPercentage) / 100));
                    }
                }
            }
        });
        $("#txtTotalActualCost").val(pSum.toFixed(2));
        let settleAmount = parseFloat($("#txtTotalActualCost").val()) - parseFloat($("#txtAmount").val());
        $("#txtSettlementAmount").val(settleAmount.toFixed(2));
    }


}
function LoadAllChargeType() {
    debugger;
    // var copyControlsText = " class='btn btn-xs btn-rounded btn-info float-btn-AddPaymentRequestDetails' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'></span>";
    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var dateValidTo = Date.prototype.addDays(ConvertDateFormat(FormattedTodaysDate), 30);

    $("#slChargeType > option").each(function () {
        if (this.value != 0) {
            ++maxDetailsIDInTable;

            var tr = "";
            tr += "<tr ID='" + maxDetailsIDInTable + "' isdeleted='0' tag='item'   counter='" + (maxDetailsIDInTable) + "' value='" + 0 + "'>"
            tr += "     <td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + maxDetailsIDInTable + "' checked='checked' /></td>";
            tr += "     <td class='DetailsID' style='width:2%;'><input " + (1 == 2 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + 0 + "' /></td>";
            tr += "     <td class='Operation' style='width:20%;' val=''><select id='slOperation" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slOperation' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetSuppliers_Charges(" + maxDetailsIDInTable + ");Details_HouseAndCertificateChangedByOperation(" + maxDetailsIDInTable + ");'  data-required='true'>" + "<option value=0></option>" + "</select></td>";
            //  tr += "     <td class='CertificateNumber' style='width:7%;' val=''><select id='slCertificateNumber" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slCertificateNumber' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetSuppliers_Charges(" + maxDetailsIDInTable + ");'  data-required='true'>" + "<option value=0></option>" + "</select></td>";
            tr += "     <td class='TruckingOrder' style='width:7%;' val=''><select id='slTruckingOrder" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slTruckingOrder' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange=" + (IsMESCOCompany ? "'DetailContainerChanged(" + maxDetailsIDInTable + ")'" : "'GetSuppliers_Charges(" + maxDetailsIDInTable + ");'") + "  data-required='true'>" + "<option value=0></option>" + "</select></td>";
            tr += "     <td class='HouseNumber' style='width:7%;' val=''><select id='slHouse" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slHouse' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange=" + (IsMESCOCompany ? "'DetailHouseChanged(" + maxDetailsIDInTable + ")'" : "'GetSuppliers_Charges(" + maxDetailsIDInTable + ");'") + "  data-required='true'>" + "<option value=0></option>" + "</select></td>";



            tr += "     <td class='FlagChargeType' style='width:5%;' val=''><input id='cbFlagChargeType" + maxDetailsIDInTable + "' name='FlagChargeType' onchange='GetChargeTypesToOperation(" + maxDetailsIDInTable + ");'  type='checkbox' value='" + maxDetailsIDInTable + "' /></td>"
            tr += "     <td class='ChargeType' style='width:15%;' val=''><select tag='" + (this.value) + "' id='slChargeType" + maxDetailsIDInTable + "' style='width:100%;' onchange='GetInitialValue(" + maxDetailsIDInTable + ");' class='controlStyle slChargeType' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetInitialValue(" + maxDetailsIDInTable + ");'  data-required='true'>" + "<option value=0></option>" + "</select></td>";
            tr += "     <td class='Supplier' style='width:15%;' val=''><select id='slSupplier" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slSupplier' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + "<option value=0></option>" + "</select></td>";
            tr += "     <td class='EstmatedCost' style='width:9%;'><input type='text' style='width:100%;font-size:90%;'  id='txtEstmatedCost" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);PaymentRequestDetails_CalculateAmount();' onchange='PaymentRequestDetails_CalculateAmount();' data-required='true' value='' /> </td>";
            tr += "     <td class='Coupon' style='width:5%;'><input type='text' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtCoupon" + maxDetailsIDInTable + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + ($("#txtCoupon" + (maxDetailsIDInTable - 1)).val() == undefined ? "" : $("#txtCoupon" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";
            tr += "     <td class='Description' style='width:5%;'><input type='text' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtDescription" + maxDetailsIDInTable + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + ($("#txtDescription" + (maxDetailsIDInTable - 1)).val() == undefined ? "" : $("#txtDescription" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";
            //tr += "      <td class='Documented' style='width:1%;'><input id='cbDocumented" + maxDetailsIDInTable + "' name='Documented'  class='cbIsDocumented' type='checkbox' value='' ></td>";
            tr += "     <td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate'  id='SelectedIDsToUpdate" + maxDetailsIDInTable + "' type='checkbox' value='" + maxDetailsIDInTable + "' /></td>";
            tr += "     <td class='hide'>"
                + "</td>";
            tr += "</tr>";

            $("#tblPaymentRequestDetails tbody").prepend(tr);
            if ($("[id$='hf_ChangeLanguage']").val() == "ar")
                $("#tblPaymentRequestDetails tbody tr[ID=" + maxDetailsIDInTable + "]").reverseChildren();
            /***************************Filling row controls******************************/

            $("#slOperation" + maxDetailsIDInTable).html($("#slOperation").html());
            $("#slHouse" + maxDetailsIDInTable).html($("#slHouse").html());
            //$("#slCertificateNumber" + maxDetailsIDInTable).html($("#slCertificateNumber").html());
            $("#slTruckingOrder" + maxDetailsIDInTable).html($("#slTruckingOrder").html());



            $("#slChargeType" + maxDetailsIDInTable).html($("#slChargeType").html());
            $("#slSupplier" + maxDetailsIDInTable).html($("#slSupplier").html());

            $("#slChargeType" + maxDetailsIDInTable).val(this.value);
        }
    });
    BindAllCheckboxonTable("tblPaymentRequestDetails", "DetailsID", "cb-CheckAll-PaymentRequestDetails");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    CheckAllCheckbox("HeaderDeletePaymentRequestDetailsID");
}
function FillListFromObject_Payable(pID, pCodeOrName, pStrFirstRow, pSlName, pData, callback) {
    ClearAllOptions(pSlName);
    debugger;
    let UseAmountWithoutVAT = false;
    if (pDefaults.UnEditableCompanyName == "COS")
        UseAmountWithoutVAT = true;

    var option = "";
    if (pStrFirstRow != "" && pStrFirstRow != null)
        option = '<option value="">' + pStrFirstRow + '</option>';
    // Bind Data
    $.each(JSON.parse(pData), function (i, item) {
        if (pID != null && pID != undefined) //in case of editing
            if (pID == item.ID)
                option += '<option ChargeTypeID=' + item.ChargeTypeID + ' QuotationCost=' + (UseAmountWithoutVAT ? item.AmountWithoutVAT : item.QuotationCost) + ' SupplierInvNo="' + (item.SupplierInvoiceNo == "" ? "0" : item.SupplierInvoiceNo )+ '" CurrencyID=' + item.CurrencyID + ' value="' + item.ID + '" selected >' + item.ChargeTypeName + '</option>';
            else
                option += '<option ChargeTypeID=' + item.ChargeTypeID + ' QuotationCost=' + (UseAmountWithoutVAT ? item.AmountWithoutVAT : item.QuotationCost) + ' SupplierInvNo= "' + (item.SupplierInvoiceNo == "" ? "0" : item.SupplierInvoiceNo) + '" CurrencyID=' + item.CurrencyID + ' value="' + item.ID + '">' + item.ChargeTypeName + '</option>';
        else
            option += '<option ChargeTypeID=' + item.ChargeTypeID + ' QuotationCost=' + (UseAmountWithoutVAT ? item.AmountWithoutVAT : item.QuotationCost) + ' SupplierInvNo= "' + (item.SupplierInvoiceNo == "" ? "0" : item.SupplierInvoiceNo) + '" CurrencyID=' + item.CurrencyID + ' value="' + item.ID + '">' + item.ChargeTypeName + '</option>';
    });

    $("#" + pSlName).append(option);
    if (callback != null && callback != undefined)
        callback();

}
function GetPayablesToOperation(ID, pChange) {
    debugger;

    if ($('#cbFlagChargeType' + ID).prop('checked')) {
        if ($('#slPayable' + ID) != 0) {
            if (pChange == undefined || pChange == 'undefined' || undefined) {
                if (!IsMESCOCompany || _IsCustodySettlement == 0)
                    $('#txtEstmatedCost' + ID).val($('#slPayable' + ID + ' option:selected').attr("QuotationCost"));

                $('#txtSupplierInvoiceNo' + ID).val($('#slPayable' + ID + ' option:selected').attr("SupplierInvNo"));
                $('#txtEstmatedCost' + ID).trigger("change");
            }

            $("#GetPayablesToOperation").val($("#slPayable" + ID + ' option:selected').attr("Currencyid").trim());
            if (pDefaults.UnEditableCompanyName == "MED" && $('#txtEstmatedCost' + ID).val() > 0) {
                //$('#txtEstmatedCost' + ID).attr('disabled', 'disabled');
            }
        }
    }
    else {
        if ($('#cbFlagChargeType' + ID).prop('checked')) {
            if ($('#slChargeType' + ID) != 0) {
                $('#txtEstmatedCost' + ID).val($('#slChargeType' + ID + ' option:selected').attr("QuotationCost"));
                $('#txtEstmatedCost' + ID).trigger("change");
            }
        }
    }
    if (IsMESCOCompany) {
        let payableID = $('#slPayable' + ID).val();
        CallGETFunctionWithParameters("/api/Payables/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned", {
            pIsLoadArrayOfObjects: false,
            pPageNumber: 1,
            pPageSize: 1,
            pWhereClause: "WHERE ID=" + payableID,
            pOrderBy: "ID"
        }, function (pData) {
            let payables = JSON.parse(pData[0]);
            if (payables.length > 0) {
                $('#slPayable' + ID).parent().parent().find("td.CategoryName").text(payables[0].CategoryName);

                if (_IsCustodySettlement == 0 && $('#hID').val() == "" && $('#slPayable' + ID + ' option:selected').attr("QuotationCost") == 0) {
                    $('#txtEstmatedCost' + ID).val(payables[0].CostAmount);
                    $('#txtEstmatedCost' + ID).trigger("change");
                }
                else if (_IsCustodySettlement == 1) {
                    $('#txtEstmatedCost' + ID).val(0);
                    $('#txtEstmatedCost' + ID).trigger("change");
                    $('#txtEstmatedCost' + ID).attr('disabled', true);
                }
            }
        }, null);
        
    }
}

function GetChargeTypesToOperation(ID) {
    debugger;
    if ($('#cbFlagChargeType' + ID).prop('checked') && $('#slOperation' + ID).val() != "0") {
        var OperationId = $('#slOperation' + ID).val();
        let AlreadySelectedPayableIDList = [];
        $("#tblPaymentRequestDetails tbody tr:has(.Operation select option:selected[value='" + OperationId + "']):has(.Payable select option:selected[value!='0'])").each(function () {
            if ($(this).find(".Payable select").val() != "")
                AlreadySelectedPayableIDList.push($(this).find(".Payable select").val());
        });
        let AlreadySelectedPayableIDs = AlreadySelectedPayableIDList.join(',').toString();
        var pParametersWithValues = {
            pOperationId: $('#slOperation' + ID).val()
            , pFlagChargeType: $('#cbFlagChargeType' + ID).prop('checked')
            , pCurrencyID: $('#slCurrency').val()
            , pPaymentRequestID: ($("#hID").val() == '' ? 0 : $("#hID").val())
            , pAlreadySelectedPayableIDs: AlreadySelectedPayableIDs == "" ? "" : AlreadySelectedPayableIDs
        };
        CallGETFunctionWithParameters("/api/PaymentRequest/GetChargeTypes", pParametersWithValues
            , function (pData) {
                var dd = pData[0];
                FillListFromObject_Payable(null, 10, "<--Select-->", ("slPayable" + ID), pData[0], null);
                $("#slPayable" + ID).css({ "width": "100%" }).select2();
                if (_IsCustodySettlement == 0)
                   FillListFromObject(null, 25, "<--Select-->", ("slChargeType" + ID), pData[0], null);
                else
                    FillListFromObject(null, 2, "<--Select-->", ("slChargeType" + ID), pData[0], null);
                GetAllSelectedChargeTypes('tblPaymentRequestDetails')

                FadePageCover(false);

                //if (pDefaults.UnEditableCompanyName != 'COS') {
                //    FillListFromObject_Payable(null, 10, "<--Select-->", ("slPayable" + ID), pData[0], null);
                //    $("#slPayable" + ID).css({ "width": "100%" }).select2();
                //}
                //else {
                //    FillListFromObject(null, 25, "<--Select-->", ("slChargeType" + ID), pData[0], null);
                //    //Fill_SelectInputAfterLoadData_WithAttr(dd, 'ChargeTypeID', 'ChargeTypeName', null, '#slChargeType', '', 'ID');

                //    GetAllSelectedChargeTypes('tblPaymentRequestDetails')
                //}

            }
            , null);
    }
    else {
        $('#slChargeType' + ID).html($('#slChargeType').html());
    }



}
function GetChargeTypesToOperationWithPayablesIDs(pOperationId, callback) {
    debugger;

    var pParametersWithValues = {
        pOperationId: pOperationId
        , pFlagChargeType: true
        , pCurrencyID: $('#slCurrency').val()
        , pPaymentRequestID: ($("#hID").val() == '' ? 0 : $("#hID").val())
        , pAlreadySelectedPayableIDs: ""
    };
    CallGETFunctionWithParameters("/api/PaymentRequest/GetChargeTypes", pParametersWithValues
        , function (pData) {
            var dd = pData[0];
            FillListFromObject_Payable(null, 10, "<--Select-->", ("slChargeTypeWithPayables"), pData[0], null);

            if (callback != null && callback != undefined)
                callback();

            FadePageCover(false);
        }
        , null);
}


function GetSuppliers(ID, SupplierID) {
    debugger;
    var pWhereClause = " WHERE OperationID = " + $('#slOperation' + ID + '').val() + " AND PartnerID IS NOT NULL  ORDER BY PartnerTypeName ";
    var pSlName = "slSupplier" + ID;
    var pStrFirstRow = "Select Supplier";
    //var pStrFnName = "/api/OperationPartners/LoadAll";
    var pID = "0";
    if ($('#slOperation' + ID + '').val() != "0")
        $.ajax({
            type: "GET",
            url: "/api/OperationPartners/LoadAll",
            data: { pWhereClause: pWhereClause },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                ClearAllOptions(pSlName);
                var option = "";
                if (pStrFirstRow != null)
                    option += '<option value="" PartnerTypeID="0" PartnerID="0" PaymentTermID="0" ClientEmailNotContact="0" Email="0">' + pStrFirstRow + '</option>';
                // Bind Data
                $.each(JSON.parse(data[0]), function (i, item) {
                    if (pID != null && pID != undefined) //in case of editing
                        if (pID == item.ID)
                            option += '<option value=' + item.ID + ' ClientEmailNotContact="' + item.ClientEmailNotContact + '"' + ' Email="' + item.Email + '"' + ' PartnerTypeID = ' + item.PartnerTypeID + ' PartnerID = ' + item.PartnerID + ' PaymentTermID = ' + item.PaymentTermID + ' selected >' + item.Code + ": " + item.Name + '</option>';
                        else
                            option += '<option value=' + item.ID + ' ClientEmailNotContact="' + item.ClientEmailNotContact + '"' + ' Email="' + item.Email + '"' + ' PartnerTypeID = ' + item.PartnerTypeID + ' PartnerID = ' + item.PartnerID + ' PaymentTermID = ' + item.PaymentTermID + '>' + item.Code + ": " + item.Name + '</option>';
                    else
                        option += '<option value=' + item.ID + ' ClientEmailNotContact="' + item.ClientEmailNotContact + '"' + ' Email="' + item.Email + '"' + ' PartnerTypeID = ' + item.PartnerTypeID + ' PartnerID = ' + item.PartnerID + '     PaymentTermID = ' + item.PaymentTermID + '>' + item.Code + ": " + item.Name + '</option>';
                });

                $("#" + pSlName).append(option);
                $('#slSupplier' + ID).val(SupplierID == 0 ? "" : SupplierID);


                //if ($('#slCustody').val() != "" && $('#slCustody').val() != "0") {

                //    var ID = 0;
                //    var CustodyID = 0;
                //    $('#tblPaymentRequestDetails > tbody > tr').each(function (i, tr) {
                //        ID = $(tr).attr('ID');
                //        CustodyID = $("#slSupplier" + ID + " option[partnerid='" + $('#slCustody').val() + "']").val();
                //        if (CustodyID != undefined && CustodyID != "undefined") {
                //            $("#slSupplier" + ID).val(CustodyID);
                //        }

                //    });
                //}

                //if (callback != null && callback != undefined)
                //    callback();
            },
            error: function (jqXHR, exception) {
                swal("Sorry", "Please, press Ctrl+Shft+R, and if the problem persists contact your technical support! GetListWithName in mainapp.master.js", "");
                FadePageCover(false);
            }

        });

}

function GetSuppliers_ChargesCustudy(ID,SupplierID) {
    debugger;
    var pWhereClause = " WHERE OperationID = " + $('#slOperation' + ID + '').val() + " AND PartnerID IS NOT NULL and  PartnerTypeID not in (1,2)    ORDER BY PartnerTypeName ";
    var pSlName = "slSupplier" + ID;
    var pStrFirstRow = "Select Supplier";
    //var pStrFnName = "/api/OperationPartners/LoadAll";
    var pID = "0";
    if ($('#slOperation' + ID + '').val() != "0")
        $.ajax({
            type: "GET",
            url: "/api/OperationPartners/LoadAll",
            data: { pWhereClause: pWhereClause },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                ClearAllOptions(pSlName);
                var option = "";
                if (pStrFirstRow != null)
                    option += '<option value="" PartnerTypeID="0" PartnerID="0" PaymentTermID="0" ClientEmailNotContact="0" Email="0">' + pStrFirstRow + '</option>';
                // Bind Data
                $.each(JSON.parse(data[0]), function (i, item) {
                    if (pID != null && pID != undefined) //in case of editing
                        if (pID == item.ID)
                            option += '<option value=' + item.ID + ' ClientEmailNotContact="' + item.ClientEmailNotContact + '"' + ' Email="' + item.Email + '"' + ' PartnerTypeID = ' + item.PartnerTypeID + ' PartnerID = ' + item.PartnerID + ' PaymentTermID = ' + item.PaymentTermID + ' selected >' + item.Code + ": " + item.Name + '</option>';
                        else
                            option += '<option value=' + item.ID + ' ClientEmailNotContact="' + item.ClientEmailNotContact + '"' + ' Email="' + item.Email + '"' + ' PartnerTypeID = ' + item.PartnerTypeID + ' PartnerID = ' + item.PartnerID + ' PaymentTermID = ' + item.PaymentTermID + '>' + item.Code + ": " + item.Name + '</option>';
                    else
                        option += '<option value=' + item.ID + ' ClientEmailNotContact="' + item.ClientEmailNotContact + '"' + ' Email="' + item.Email + '"' + ' PartnerTypeID = ' + item.PartnerTypeID + ' PartnerID = ' + item.PartnerID + '     PaymentTermID = ' + item.PaymentTermID + '>' + item.Code + ": " + item.Name + '</option>';
                });

                $("#" + pSlName).append(option);
                //  $('#slSupplier' + ID).val($('#slSupplier' + ID).attr('tag'));


                if ($('#slCustody').val() != "" && $('#slCustody').val() != "0") {

                    //var ID = 0;
                    //var CustodyID = 0;
                    $("#slSupplier" + ID).val(SupplierID);
                    //$('#tblPaymentRequestDetails > tbody > tr').each(function (i, tr) {
                    //    ID = $(tr).attr('ID');
                    //    $("#slSupplier" + ID).val(SupplierID);
                    //    //CustodyID = $("#slSupplier" + ID + " option[partnerid='" + $('#slCustody').val() + "']").val();
                    //    //if (CustodyID != undefined && CustodyID != "undefined") {
                    //    //    $("#slSupplier" + ID).val(CustodyID);
                    //    //}

                    //});
                }

                //if (callback != null && callback != undefined)
                //    callback();
            },
            error: function (jqXHR, exception) {
                swal("Sorry", "Please, press Ctrl+Shft+R, and if the problem persists contact your technical support! GetListWithName in mainapp.master.js", "");
                FadePageCover(false);
            }

        });

}

function GetSuppliers_Charges(ID,supplierID) {
    debugger;
    var pWhereClause = " WHERE OperationID = " + $('#slOperation' + ID + '').val() + " AND PartnerID IS NOT NULL And PartnerTypeID <> 1  ORDER BY PartnerTypeName ";
    var pSlName = "slSupplier" + ID;
    var pStrFirstRow = "Select Supplier";
    //var pStrFnName = "/api/OperationPartners/LoadAll";
    var pID = IsMESCOCompany ? supplierID : "0";
    if ($('#slOperation' + ID + '').val() != "0")
        $.ajax({
            type: "GET",
            url: "/api/OperationPartners/LoadAll",
            data: { pWhereClause: pWhereClause },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                ClearAllOptions(pSlName);
                var option = "";
                if (pStrFirstRow != null)
                    option += '<option value="" PartnerTypeID="0" PartnerID="0" PaymentTermID="0" ClientEmailNotContact="0" Email="0">' + pStrFirstRow + '</option>';
                // Bind Data
                $.each(JSON.parse(data[0]), function (i, item) {
                    if (pID != null && pID != undefined) //in case of editing
                        if (pID == item.ID)
                            option += '<option value=' + item.ID + ' ClientEmailNotContact="' + item.ClientEmailNotContact + '"' + ' Email="' + item.Email + '"' + ' PartnerTypeID = ' + item.PartnerTypeID + ' PartnerID = ' + item.PartnerID + ' PaymentTermID = ' + item.PaymentTermID + ' selected >' + item.Code + ": " + item.Name + '</option>';
                        else
                            option += '<option value=' + item.ID + ' ClientEmailNotContact="' + item.ClientEmailNotContact + '"' + ' Email="' + item.Email + '"' + ' PartnerTypeID = ' + item.PartnerTypeID + ' PartnerID = ' + item.PartnerID + ' PaymentTermID = ' + item.PaymentTermID + '>' + item.Code + ": " + item.Name + '</option>';
                    else
                        option += '<option value=' + item.ID + ' ClientEmailNotContact="' + item.ClientEmailNotContact + '"' + ' Email="' + item.Email + '"' + ' PartnerTypeID = ' + item.PartnerTypeID + ' PartnerID = ' + item.PartnerID + '     PaymentTermID = ' + item.PaymentTermID + '>' + item.Code + ": " + item.Name + '</option>';
                });

                $("#" + pSlName).append(option);
                //  $('#slSupplier' + ID).val($('#slSupplier' + ID).attr('tag'));


                if ($('#slCustody').val() != "" && $('#slCustody').val() != "0" && !IsMESCOCompany) {

                    var ID = 0;
                    var CustodyID = 0;
                    $('#tblPaymentRequestDetails > tbody > tr').each(function (i, tr) {
                        ID = $(tr).attr('ID');
                        CustodyID = $("#slSupplier" + ID + " option[partnerid='" + $('#slCustody').val() + "']").val();
                        if (CustodyID != undefined && CustodyID != "undefined") {
                            $("#slSupplier" + ID).val(CustodyID);
                        }

                    });
                }

                //if (callback != null && callback != undefined)
                //    callback();
            },
            error: function (jqXHR, exception) {
                swal("Sorry", "Please, press Ctrl+Shft+R, and if the problem persists contact your technical support! GetListWithName in mainapp.master.js", "");
                FadePageCover(false);
            }

        });

}
function GetInitialValue(ID) {
    debugger;
    if ($('#cbFlagChargeType' + ID).prop('checked') && parseInt($('#slOperation' + ID + '').val()) > 0 && $('#slChargeType' + ID).val() != "" && $('#slChargeType' + ID).val() != null) {
        var ChargeTypeId = $('#slChargeType' + ID).val();
        var pParametersWithValues = {
            pOperationId: $('#slOperation' + ID).val()
            , pChargeTypeId: $('#slChargeType' + ID).val()
            //, pFlagChargeType: $('#cbFlagChargeType' + ID).prop('checked')
        };
        CallGETFunctionWithParameters("/api/PaymentRequest/GetInitialValue", pParametersWithValues
            , function (pData) {
                debugger;
                var PayablesList = JSON.parse(pData[0]);
                if (PayablesList.length > 0) {
                    if (pDefaults.UnEditableCompanyName == "COS" || pDefaults.UnEditableCompanyName == "ILS" || pDefaults.UnEditableCompanyName == "ILSEG" || $("#hDefaultUnEditableCompanyName").val() == "ELI") {
                        if (check == 0) {
                            $('#txtEstmatedCost' + ID).val(PayablesList[0].AmountWithoutVAT);
                            $("#slSupplier" + ID).val(PayablesList[0].SupplierOperationPartnerID == 0 ? "" : PayablesList[0].SupplierOperationPartnerID);
                            $('#txtSupplierInvoiceNo' + ID).val(PayablesList[0].SupplierInvoiceNo);
                            $("#slSupplier" + ID).trigger("change");
                        }
                        if (check == 0) {
                            GetIssuedToBySupplier(ID);
                        }
                        FadePageCover(false);
                    }
                    else {
                        if ($('#txtEstmatedCost' + ID).val() > 0) { }
                        else {
                            $('#txtEstmatedCost' + ID).val(PayablesList[0].InitialSalePrice);
                            $('#txtSupplierInvoiceNo' + ID).val(PayablesList[0].SupplierInvoiceNo);
                            if (IsMESCOCompany && $('#txtIsSettlementOnly' + ID).val() == 'true') {
                                $('#txtEstmatedCost' + ID).val(0);
                            }

                            FadePageCover(false);
                        }
                    }

                }


            }
            , null);
    }

}

function GetListOperationPartnersWithPartnerTypeIDAndPartnerIDAttrAndWhereClause(pID, pStrFnName, pStrFirstRow, pSlName, pWhereClause, callback) {
    var pWhereClause = " WHERE OperationID = 31567 AND PartnerID IS NOT NULL  ORDER BY PartnerTypeName ";
    var pSlName = "slPayableSupplier";
    var pStrFirstRow = "Select Supplier";
    pStrFnName = "/api/OperationPartners/LoadAll";
    pID = "0";
    $.ajax({
        type: "GET",
        url: "/api/OperationPartners/LoadAll",
        data: { pWhereClause: pWhereClause },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            ClearAllOptions(pSlName);
            var option = "";
            if (pStrFirstRow != null)
                option += '<option value="" PartnerTypeID="0" PartnerID="0" PaymentTermID="0" ClientEmailNotContact="0" Email="0">' + pStrFirstRow + '</option>';
            // Bind Data
            $.each(JSON.parse(data[0]), function (i, item) {
                if (pID != null && pID != undefined) //in case of editing
                    if (pID == item.ID)
                        option += '<option value=' + item.ID + ' ClientEmailNotContact="' + item.ClientEmailNotContact + '"' + ' Email="' + item.Email + '"' + ' PartnerTypeID = ' + item.PartnerTypeID + ' PartnerID = ' + item.PartnerID + ' PaymentTermID = ' + item.PaymentTermID + ' selected >' + item.Code + ": " + item.Name + '</option>';
                    else
                        option += '<option value=' + item.ID + ' ClientEmailNotContact="' + item.ClientEmailNotContact + '"' + ' Email="' + item.Email + '"' + ' PartnerTypeID = ' + item.PartnerTypeID + ' PartnerID = ' + item.PartnerID + ' PaymentTermID = ' + item.PaymentTermID + '>' + item.Code + ": " + item.Name + '</option>';
                else
                    option += '<option value=' + item.ID + ' ClientEmailNotContact="' + item.ClientEmailNotContact + '"' + ' Email="' + item.Email + '"' + ' PartnerTypeID = ' + item.PartnerTypeID + ' PartnerID = ' + item.PartnerID + '     PaymentTermID = ' + item.PaymentTermID + '>' + item.Code + ": " + item.Name + '</option>';
            });

            $("#" + pSlName).append(option);

            if (callback != null && callback != undefined)
                callback();
        },
        error: function (jqXHR, exception) {
            swal("Sorry", "Please, press Ctrl+Shft+R, and if the problem persists contact your technical support! GetListWithName in mainapp.master.js", "");
            FadePageCover(false);
        }
    });
}

function GetAllSelectedChargeTypes(TableID) {
    var listOfIDs = new Array();
    $('#' + TableID + ' td').find('input[name="Delete"]:checked').each(function () {
        listOfIDs.push($(this).closest('tr').attr('id'));
    });
    return listOfIDs;
}

function Approve_Notify(pID) {
    debugger;
    $("#lblShownItems").html(" Receptionists");
    $("#divCheckboxesList").html("");
    //jQuery("#CheckboxesListModal").modal("show");
    var pStrFnName = "/api/Users/LoadAll";
    var pDivName = "divCheckboxesList";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pWhereClause = " WHERE IsInactive=0 ";
    pWhereClause += " ORDER BY Name ";

    debugger;
    FadePageCover(true);

    //Get Users ID

    if (IsMESCOCompany) {

        var pID = 0;
        var ApproveLevel = 2;
        $('#tblPaymentRequest' + ' td').find('input[name="Delete"]:checked').each(function () {
            pID = ($(this).attr('value'));
        });

        if (pID > 0) {
            var tr = $("#tblPaymentRequest tr[ID='" + pID + "']");
            ApproveLevel = tr.find("td.ApproveLevel").text()
            ApproveLevel = parseFloat(ApproveLevel) + 2
        }

        CallGETFunctionWithParameters("/api/A_PaymentRequest_UsersLevel/GetUserByLevel", { "pLevelNo": ApproveLevel }
            , function (pData) {
                var IsRedirectNotifyOnApproveLevel = pData[1];
                var IsLastLevel = pData[2];
                var IsRedirectError = false;
                var IsAfterLastLevel = pData[3];

                //to ensure redirect before last approval
                //(IsCash && SafeID) || (IsCheque && BankID)
                $("#tblPaymentRequest input[name='Delete']:checked").each(function () {
                    if (($(this).closest('tr').find(".isCash").text() == "true" && !$(this).closest('tr').find(".SafeID").text().trim()) || ($(this).closest('tr').find(".IsCheque").text() == "true" && !$(this).closest('tr').find(".BankID").text().trim())) {
                        IsRedirectError = true;
                    }
                });
                if (IsRedirectNotifyOnApproveLevel && IsRedirectError) {
                    setTimeout(() => {
                        swal("Sorry", "Payment request(s) must be redirected");
                    }, 500);
                }
                else if (IsAfterLastLevel) {
                    setTimeout(() => {
                        swal("Sorry", "Payment request(s) already approved");
                    }, 500);
                }
                else if (IsLastLevel) {
                    CallGETFunctionWithParameters("/api/PaymentRequest/MultiLevelApproval"
                        , { "pDeletedPaymentRequestIDs": GetAllSelectedIDsAsString('tblPaymentRequest'), "PReceiverUsers": "0", "pIsCustodySettlement": _IsCustodySettlement }
                        , function (pData) {
                            if (pData == "") {
                                swal("Success", "approved successfully.");
                                FadePageCover(false);
                                jQuery('#CheckboxesListModal').modal('hide')
                                PaymentRequest_LoadingWithPaging();
                                LoadDefaults("/api/Defaults/LoadAll", " WHERE 1=1 ");
                            }
                            else {
                                FadePageCover(false);
                                jQuery('#CheckboxesListModal').modal('hide')
                                showDeleteFailMessage = true;
                                strDeleteFailMessage = pData;
                                PaymentRequest_LoadingWithPaging();
                            }
                        }
                    );
                } else {

                    jQuery("#CheckboxesListModal").modal("show");
                    var pUsersLevels = JSON.parse(pData[0]);
                    pWhereClause = " WHERE IsInactive=0 And ID in(";
                    var pSelectedUserIDs = "";
                    $.each(pUsersLevels, function (i, item) {
                        pSelectedUserIDs += item.UserID + ",";
                    });
                    pWhereClause += pSelectedUserIDs.substring(0, pSelectedUserIDs.length - 1);
                    pWhereClause += ") ORDER BY Name ";

                    GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
                        , function () {

                            $('input[name="' + pCheckboxNameAttr + '"]').each(function () {
                                if (pDefaults.UnEditableCompanyName == "MES") {
                                    $(this).prop('checked', true);
                                }
                            });

                            FadePageCover(false);
                        });
                }

                FadePageCover(false);
            }
            , null);
    }
    else {
        jQuery("#CheckboxesListModal").modal("show");
        GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
            , function () {
                FadePageCover(false);
            });
    }


}
function AlarmUsers_PaymentRequest() {
    debugger;
    //FadePageCover(true);
    var IsRedirectError = false;
    var IsIncludedInCombinedPaymentRequest = false;
    if (IsMESCOCompany) {
        //payment request must have a safe in the last approval level
        $("#tblPaymentRequest input[name='Delete']:checked").each(function () {
            debugger;

            if ($(this).closest('tr').find(".ApproveStatues").text().trim() == "Combined") {
                swal("Sorry", "Some of the selected requests are included in a combined payment request");
                IsIncludedInCombinedPaymentRequest = true;
                return;
            }

            //if (!$(this).closest('tr').find(".SafeID").text().trim() && $(this).closest('tr').find(".ApproveLevel").text().trim() == '1') {
            //    swal("Sorry", "Payment request(s) must be redirected to a safe");
            //    IsRedirectError = true;
            //    return;
            //}


                
        })
    }
    var pModalName = "CheckboxesListModal";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pSelectedItemsIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
    if (pSelectedItemsIDs == "")
        swal("Sorry", "You have to select at least one receptionist.");
    else if (!IsMESCOCompany || (IsMESCOCompany && !IsRedirectError && !IsIncludedInCombinedPaymentRequest)) {
        debugger;
        FadePageCover(true);
        var ApproveEndPoint = IsMESCOCompany ? "/api/PaymentRequest/MultiLevelApproval" : "/api/PaymentRequest/Approve";
        CallGETFunctionWithParameters(ApproveEndPoint
            , { "pDeletedPaymentRequestIDs": GetAllSelectedIDsAsString('tblPaymentRequest'), "PReceiverUsers": pSelectedItemsIDs, "pIsCustodySettlement": _IsCustodySettlement }
            , function (pData) {
                if (pData == "") {
                    swal("Success", "approved successfully.");
                    FadePageCover(false);
                    jQuery('#CheckboxesListModal').modal('hide')
                    PaymentRequest_LoadingWithPaging();
                    LoadDefaults("/api/Defaults/LoadAll", " WHERE 1=1 ");
                }
                else {
                    FadePageCover(false);
                    jQuery('#CheckboxesListModal').modal('hide')
                    showDeleteFailMessage = true;
                    strDeleteFailMessage = pData;
                    PaymentRequest_LoadingWithPaging();
                }

            }
        );
    }

}
function AlarmUsers_SavePaymentRequest() {
    debugger;

    var EstmatedCostError = "";
    var SupplierNotTheSameError = "";
    var SupplierMustHaveInvoiceNo = "";
    var DirectPRError = "";

    
    $($('#tblPaymentRequestDetails > tbody > tr')).each(function (i, tr) {
        debugger;

        var ID = $(tr).attr("ID");
        if (pDefaults.UnEditableCompanyName != "COS") {
            if ($('#cbFlagChargeType' + ID).prop('checked') && $('#slPayable' + ID + ' option:selected').val() == "") {
                EstmatedCostError = "You must select Payable";
            }
            if ($('#slCalcBL') == 0) {
                if ($('#cbFlagChargeType' + ID).prop('checked') && $('#slPayable' + ID + ' option:selected').val() != "" && $('#slChargeType' + ID + ' option:selected').val() != "" && ($('#slChargeType' + ID + ' option:selected').val() != $("#slPayable" + ID + ' option:selected').attr("chargetypeid").trim())) {
                    EstmatedCostError = "You must Unselect ChargeType";
                }
            }
          
            if ($('#cbFlagChargeType' + ID).prop('checked')) {
                if (parseFloat($('#txtEstmatedCost' + ID).val()) > parseFloat($('#slPayable' + ID + ' option:selected').attr("QuotationCost"))
                    && parseFloat($('#slPayable' + ID + ' option:selected').attr("QuotationCost")) > 0
                ) {
                    EstmatedCostError = "Charge Type " + $('#slPayable' + ID + ' option:selected').text() +
                        " Estmated Cost : " + $('#txtEstmatedCost' + ID).val() + " grater than " + "  Payable Estmated Cost : " + $('#slPayable' + ID + ' option:selected').attr("QuotationCost");
                }



                $($('#tblPaymentRequestDetails > tbody > tr')).each(function (k, tr2) {
                    if (i != k) {
                        var ID2 = $(tr2).attr("ID");
                        if ($('#cbFlagChargeType' + ID2).prop('checked')) {
                            if ($('#slPayable' + ID2 + ' option:selected').val() == $('#slPayable' + ID + ' option:selected').val()) {
                                EstmatedCostError = "Payable Exist more then one  ( Charge Type :  " + $('#slPayable' + ID2 + ' option:selected').text() + ")";
                            }
                        }

                    }
                });


            }

        }

        if (pDefaults.UnEditableCompanyName == "MES" && $('#slClient').val() != "" && $('#slClient').val() != "0" && $('#slClient').val() != null) {
                
                var CustodyID = 0;
           if ($('#slOperation' + ID + '').val() != "" && $('#slOperation' + ID + '').val() != "0" && $('#slOperation' + ID + '').val() != undefined) {
              CustodyID = $("#slSupplier" + ID + " option[partnerid='" + $('#slClient').val() + "']").val();
               if (CustodyID == undefined || CustodyID == "undefined" || $("#slSupplier" + ID).val() != CustodyID) {
                   SupplierNotTheSameError = "partner and supplier must be the same ";
                        }

                    }
        }
        if (IsMESCOCompany ) {
            if (SupplierMustHaveInvoiceNo == "" 
                && $("#slSupplier" + ID).val() != null && $("#slSupplier" + ID).val() != ""
                && $("#slSupplier" + ID).val() != "0"
                && $("#slSupplier" + ID + " option:selected").attr('partnertypeid') != 20
                && ($("#txtSupplierInvoiceNo" + ID).val() == "0" || $("#txtSupplierInvoiceNo" + ID).val() == "") || $("#txtSupplierInvoiceNo" + ID).val() == "null") {
                SupplierMustHaveInvoiceNo = "Supplier Must Have SupplierInvoiceNo";
            }
        }

        if (IsMESCOCompany && $('#cbIsDirectPR').prop('checked') && ($('#slTaxVat' + ID + '').val() > 0 || $('#slTaxDiscount' + ID + '').val() > 0)) {
            DirectPRError = "Direct PR Details Can't have VAT or WHT";
        }
    });

    if (GetAllIDsAsStringWithNameAttr('tblPaymentRequestDetails', "Delete") == "") {
        swal(strSorry, "Insert at least one detail");
    }
    else if (EstmatedCostError != "") {
        swal("Sorry", EstmatedCostError);
    }
    else if (SupplierNotTheSameError != "") {
        swal("Sorry", SupplierNotTheSameError);
    }
    else if (SupplierMustHaveInvoiceNo != "") {
        swal("Sorry", SupplierMustHaveInvoiceNo);
    }
    else if (DirectPRError != "") {
        swal("Sorry", DirectPRError);
    }
    else if (pLoggedUserApprovedFromNotifyPaymentRequest == 1 && pDefaults.UnEditableCompanyName == "NEW" && _IsCustodySettlement != 1) {
        PaymentRequest_Save();
    }
    else {
        debugger;
        //FadePageCover(true);
        $("#lblShownItems_SavePaymentRequest").html(" Receptionists");
        $("#divCheckboxesList_SavePaymentRequest").html("");
        jQuery("#CheckboxesListModal_SavePaymentRequest").modal("show");
        var pStrFnName = "/api/Users/LoadAll";
        var pDivName = "divCheckboxesList_SavePaymentRequest";
        var pCheckboxNameAttr = "cbAddedItemID_SavePaymentRequest";
        var pWhereClause = " WHERE IsInactive=0 ";
        pWhereClause += " ORDER BY Name ";

        debugger;
        FadePageCover(true);

        //Get Users ID

        if (IsMESCOCompany) {

            var pID = 0;
            var ApproveLevel = 2;
            $('#tblPaymentRequest' + ' td').find('input[name="Delete"]:checked').each(function () {
                pID = ($(this).attr('value'));
            });

            if (pID > 0) {
                var tr = $("#tblPaymentRequest tr[ID='" + pID + "']");
                ApproveLevel = tr.find("td.ApproveLevel").text()
                ApproveLevel = parseFloat(ApproveLevel) + 2
            }

            CallGETFunctionWithParameters("/api/A_PaymentRequest_UsersLevel/GetUserByLevel", { "pLevelNo": ApproveLevel }
                , function (pData) {

                    var pUsersLevels = JSON.parse(pData[0]);
                    pWhereClause = " WHERE IsInactive=0 And ID in(";
                    var pSelectedUserIDs = "";
                    $.each(pUsersLevels, function (i, item) {
                        pSelectedUserIDs += item.UserID + ",";
                    });
                    pWhereClause += pSelectedUserIDs.substring(0, pSelectedUserIDs.length - 1);
                    pWhereClause += ") ORDER BY Name ";

                    GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
                        , function () {
                            if (pDefaults.UnEditableCompanyName == "MES") {
                                $('input[name="' + pCheckboxNameAttr + '"]').each(function () {
                                    $(this).prop('checked', true)
                                });

                            }
                            FadePageCover(false);
                        });
                    FadePageCover(false);
                }
                , null);
        }
        else {
            GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
                , function () {
                    FadePageCover(false);
                });
        }
    
     
    }


}

function ApproveDiffalarm() {
    debugger;
    //FadePageCover(true);
    $("#lblShownItems_SavePaymentRequestDiff").html(" Receptionists");
    $("#divCheckboxesList_SavePaymentRequestDiff").html("");
    jQuery("#CheckboxesListModal_SavePaymentRequestDiff").modal("show");
    var pStrFnName = "/api/Users/LoadAll";
    var pDivName = "divCheckboxesList_SavePaymentRequestDiff";
    var pCheckboxNameAttr = "cbAddedItemID_SavePaymentRequestDiff";
    var pWhereClause = " WHERE IsInactive=0 ";
    pWhereClause += " ORDER BY Name ";

    debugger;
    FadePageCover(true);
    GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
        , function () {
            //CallGETFunctionWithParameters("/api/A_PaymentRequest_UsersLevel/GetUserByLevel", { "pLevelNo": 2 }
            //    , function (pData) {

            //        FadePageCover(false);
            //    }
            //    , null);
            FadePageCover(false);
        });
}

function ApproveDiff() {
    debugger;
    var pModalName = "CheckboxesListModal_SavePaymentRequestDiff";
    var pCheckboxNameAttr = "cbAddedItemID_SavePaymentRequestDiff";
    var pSelectedItemsIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);

    if (pSelectedItemsIDs == "" && pLoggedUserApprovedFromNotifyPaymentRequest == 0)
        swal("Sorry", "You have to select at least one receptionist.");
    else {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/PaymentRequest/Approve"
            , { "pDeletedPaymentRequestIDs": GetAllSelectedIDsAsString('tblPaymentRequest'), "PReceiverUsers": pSelectedItemsIDs, "pIsCustodySettlement": _IsCustodySettlement }
            , function (pData) {
                if (pData == "") {
                    swal("Success", "approved successfully.");
                    FadePageCover(false);
                    jQuery('#CheckboxesListModal_SavePaymentRequestDiff').modal('hide')
                    PaymentRequest_LoadingWithPaging();
                    LoadDefaults("/api/Defaults/LoadAll", " WHERE 1=1 ");
                }
                else {
                    FadePageCover(false);
                    jQuery('#CheckboxesListModal_SavePaymentRequestDiff').modal('hide')
                    showDeleteFailMessage = true;

                    var pMessageFromSP = pData;

                    var word = "Transaction";
                    var index = pMessageFromSP.indexOf(word);
                    if (index !== -1)
                        pMessageFromSP = pMessageFromSP.substring(0, index + word.length - 12);

                    strDeleteFailMessage = pMessageFromSP;
                    PaymentRequest_LoadingWithPaging();
                }

            });

    }
}
function IsNotifiedUser() {
    debugger;
    var isNotified = false;
    var IDs = GetAllSelectedIDsAsString('tblPaymentRequest').split(',');
    var WhereClause = `where ReceiverUserID=` + pLoggedUser.ID + ` and (1=2 `;
    $.each(IDs, function (i, id) {
        WhereClause +=` or Body like N'%Payment Request/`+id+`%'`
    });
    WhereClause += `)`;
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/PaymentRequest/IsNotifiedUser"
        , { "pWhereClause": WhereClause }
        , function (pData) {
            FadePageCover(false);
            isNotified = pData == IDs.length;

        }, function () { FadePageCover(false); }, false);
    return isNotified;
}
function PaymentRequest_ApproveList(callback) {
    debugger;
    var ErrorMsg = "";
    if (_IsCustodySettlement==0 && ['MED'].includes(pDefaults.UnEditableCompanyName)) {
        if (!IsNotifiedUser()) {
            swal("Sorry", "You are not authorized");
            return;
        }
    }
    if (_IsCustodySettlement == 0 && IsMESCOCompany) {

        if ($('#tblPaymentRequest tr[ondblclick] td').find('input[name="Delete"]:checked').length != $('#tblPaymentRequest tr td').find('input[name="Delete"]:checked').length) {
            swal("Sorry", "You are not authorized");
            return;
        }

    //Confirmation message to delete
    debugger;

    var pID = 0;

    $('#tblPaymentRequest' + ' td').find('input[name="Delete"]:checked').each(function () {
        pID = ($(this).attr('value'));
        if (pID > 0) {
            var tr = $("#tblPaymentRequest tr[ID='" + pID + "']");
            var IsIncludedInCombinedPaymentRequest = tr.find("td.IsIncludedInCombinedPaymentRequest").text();
            if (IsIncludedInCombinedPaymentRequest == 1) {
                ErrorMsg = "Payment Request code :" + tr.find("td.Code").text() + " exist in combined ";
                swal(ErrorMsg, "", "warning");
            }

            var ApproveLevel = tr.find("td.ApproveLevel ").text();
            if (!userLevels.includes(ApproveLevel + 1)) {
                swal("Sorry", "You are not authorized");
            }

        }
    });
    }
    if (ErrorMsg == "") {

        if (_IsCustodySettlement == 1) {
            if (pDefaults.UnEditableCompanyName != "COS") {
                ApproveDiffalarm();
            }
            else {
                if (GetAllSelectedIDsAsString('tblPaymentRequest') != "")
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
                            CallGETFunctionWithParameters("/api/PaymentRequest/Approve"
                                , { "pDeletedPaymentRequestIDs": GetAllSelectedIDsAsString('tblPaymentRequest'), "PReceiverUsers": "0", "pIsCustodySettlement": _IsCustodySettlement }
                                , function (pData) {
                                    if (pData == "") {
                                        swal("Success", "approved successfully.");
                                        FadePageCover(false);
                                        jQuery('#CheckboxesListModal').modal('hide')
                                        PaymentRequest_LoadingWithPaging();
                                        LoadDefaults("/api/Defaults/LoadAll", " WHERE 1=1 ");
                                    }
                                    else {
                                        FadePageCover(false);
                                        jQuery('#CheckboxesListModal').modal('hide')
                                        showDeleteFailMessage = true;

                                        var pMessageFromSP = pData;

                                        var word = "Transaction";
                                        var index = pMessageFromSP.indexOf(word);
                                        if (index !== -1)
                                            pMessageFromSP = pMessageFromSP.substring(0, index + word.length - 12);

                                        strDeleteFailMessage = pMessageFromSP;
                                        PaymentRequest_LoadingWithPaging();
                                    }

                                });

                        });
            }
        }
        else {
            //if ($("#tblPaymentRequest tr[ID=4]").find("td.IsApprovedRequest").find('#cbIsApprovedRequest4').prop('checked'))
            //{ }
            //else
            if (GetAllSelectedIDsAsString('tblPaymentRequest') != "")
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
                        Approve_Notify();

                    });
        }
    }
}

function PaymentRequestReject_ApproveList(callback) {
    //Confirmation message to delete
    debugger;

    var pID = 0;
    var ErrorMsg = "";
    $('#tblPaymentRequest' + ' td').find('input[name="Delete"]:checked').each(function () {
        pID = ($(this).attr('value'));
        if (pID > 0) {
            var tr = $("#tblPaymentRequest tr[ID='" + pID + "']");
            var IsIncludedInCombinedPaymentRequest = tr.find("td.IsIncludedInCombinedPaymentRequest").text();
            if (IsIncludedInCombinedPaymentRequest == 1) {
                ErrorMsg = "Payment Request code :" + tr.find("td.Code").text() + " exist in combined ";
                swal(ErrorMsg, "", "warning");
            }

        }
    });

    if (ErrorMsg == "") {

        if (GetAllSelectedIDsAsString('tblPaymentRequest') != "")
            swal({
                title: "Are you sure?",
                text: "The selected records will be Reject !",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, Reject!",
                closeOnConfirm: true
            },
                //callback function in case of confirm delete
                function () {
                    ApproveReject_Notify();

                });
    }
}
///amaher

function ApproveReject_Notify(pID) {
    debugger;
    $("#lblShownItems").html(" Receptionists");
    $("#divCheckboxesRejectList").html("");
    jQuery("#CheckboxesListRejectModal").modal("show");
    var pStrFnName = "/api/Users/LoadAll";
    var pDivName = "divCheckboxesRejectList";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pWhereClause = " WHERE IsInactive=0 ";
    pWhereClause += " ORDER BY Name ";

    debugger;
    FadePageCover(true);
    GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
        , function () {
            FadePageCover(false);

            debugger


            var AllIDs = GetAllSelectedIDsAsString('tblPaymentRequest');

            var IDsLst = AllIDs.toString().replace(/'/g, '').split(',');
            for (var i = 0; i < IDsLst.length; i++) {
                var tr = $("#tblPaymentRequest tr[ID='" + IDsLst[i] + "']");

                var CreatorUserID = tr.find("td.CreatorUserID_Request").text()
                $('input[name="' + pCheckboxNameAttr + '"]').each(function () {
                    if (($(this).attr('value')) == CreatorUserID) {
                        $("#CheckboxesListRejectModal input[value=" + CreatorUserID + "]").prop('checked', true);
                    }

                });
            }


        });


}
function AlarmUsersReject_PaymentRequest() {
    debugger;
    //FadePageCover(true);
    var pModalName = "CheckboxesListRejectModal";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pSelectedItemsIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
    if (pSelectedItemsIDs == "")
        swal("Sorry", "You have to select at least one receptionist.");
    else if ($('#txtReason').val().trim() == "" || $('#txtReason').val().trim() == "0") {
        swal("Sorry", "You have to select Reason.");
    }
    else {
        debugger;
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/PaymentRequest/Reject"
            , { "pDeletedPaymentRequestIDs": GetAllSelectedIDsAsString('tblPaymentRequest'), "PReceiverUsers": pSelectedItemsIDs, "pIsCustodySettlement": _IsCustodySettlement, pReason: $('#txtReason').val()}
            , function (pData) {
                if (pData == "") {
                    swal("Success", "Rejected successfully.");
                    FadePageCover(false);
                    jQuery('#CheckboxesListRejectModal').modal('hide')
                    PaymentRequest_LoadingWithPaging();
                    LoadDefaults("/api/Defaults/LoadAll", " WHERE 1=1 ");
                }
                else {
                    FadePageCover(false);
                    jQuery('#CheckboxesListRejectModal').modal('hide')
                    showDeleteFailMessage = true;
                    strDeleteFailMessage = pData;
                    PaymentRequest_LoadingWithPaging();
                }

            });
    }

}

function Pricing_SendLocalEmail(pID) {
    debugger;
    var pModalName = "CheckboxesListModal";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pSelectedItemsIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
    if (pSelectedItemsIDs == "")
        swal("Sorry", "You have to select at least one receptionist.");
    else { //send
        FadePageCover(true);
        var pParametersWithValues = {
            pUserIDs: pSelectedItemsIDs
            , pSubject: "Sent From Pricing"
            , pBody: "Body from pricing"
            , pQuotationRouteID: 0
            , pPricingID: pID
            , pRequestOrReply: (glbCallingControl == "PricingRequest" ? constRequest : constReply)
            , pOperationID: 0
            , pIsAlarm: true
            , pParentID: 0
            , pEmailSource: 0
            , pIsSendNormalEmail: false
            //LoadWithPaging parameters
            , pWhereClauseForLoadWithPaging: ("WHERE 1=1")
            , pPageSize: 1 //$("#select-page-size").val()
            //pPageNumber is 1 coz its insert so it will be on the top
            , pPageNumber: 1 //$("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text() 
            , pOrderBy: "ID DESC"
            , pSenderUserID: pLoggedUser.ID
        };
        CallGETFunctionWithParameters("/api/LocalEmails/SendEmail", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    jQuery("#CheckboxesListModal").modal("hide");
                    swal("Success", "Sent successfully.");
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
            , null);
    }
}
var HouseCurrentID = 0;
var CertificateCurrentID = 0;
var TruckingOrderCurrentID = 0;


function Details_HouseAndCertificateChangedByOperation(pRowID) {
    debugger;
    if (0 == 0) {
        //$("#slHouse" + pRowID).val(0);
        //$("#slCertificateNumber" + pRowID).val(0);
        //$("#slTruckingOrder" + pRowID).val(0);



        Details_FillSlHouseAndCertificate("slHouse" + pRowID, pRowID, 1);
        // Details_FillSlHouseAndCertificate("slCertificateNumber" + pRowID, pRowID, 2);
        Details_FillSlHouseAndCertificate("slTruckingOrder" + pRowID, pRowID, 3);


    }


}

function Details_FillSlHouseAndCertificate(pSlName, operationID, pType) {
    debugger;
    FadePageCover(true);

    CallGETFunctionWithParameters("/api/PaymentRequest/FillCombo"
        , {
            PoperationID: $('#slOperation' + operationID + '').val() == "0" ? 0 : $('#slOperation' + operationID + '').val() == null ? 0 : $('#slOperation' + operationID + '').val()
            , ptype: pType
            , pOrderBy: "ID"
        }
        , function (pData) {
            //FillListFromObject(null, 2, "<--Select-->", pSlName, pData[0], null);
            FillListFromObject_ERP(null, 2/*pCodeOrName*/, TranslateString("SelectFromMenu"), pSlName, pData[0], null);
            //   if (pDefaults.UnEditableCompanyName != "FAI") {
            //Start Auto Filter
            $("#" + pSlName).css({ "width": "100%" }).select2();
            $("div[tabindex='-1']").removeAttr('tabindex');
            $("#" + pSlName).val($("#" + pSlName).attr('tag') == undefined ? "0" : $("#" + pSlName).attr('tag') == "" ? "0" : $("#" + pSlName).attr('tag'));
            $("#" + pSlName).trigger("change");

            //  Esnd Auto Filter
            //    }
            FadePageCover(false);
        }
        , null);
}



function Details_ChangedByHouseAndCertificateAndTrucingOrder(pRowID, pType) {
    debugger;
    if (check == 0 && $('#slOperation' + pRowID + '').val() == "0") {
        FadePageCover(true);

        if (pType == 1) {
            CallGETFunctionWithParameters("/api/PaymentRequest/GetOperationID"
                , {
                    TransID: $('#slHouse' + pRowID + '').val()
                    , ptype: pType
                }
                , function (pData) {
                    if (pData[0] > 0) {
                        debugger;
                        $('#slOperation' + pRowID + '').val(JSON.parse(pData[0]));
                        Details_HouseAndCertificateChangedByOperation(pRowID);


                        //  $("#slHouse" + pRowID).val(0);
                        // $("#slTruckingOrder" + pRowID).val(0);
                    }

                    FadePageCover(false);
                }
                , null);


        }
        //else if (pType == 2) {
        //    CallGETFunctionWithParameters("/api/PaymentRequest/GetOperationID"
        //        , {
        //            TransID: $('#slCertificateNumber' + pRowID + '').val()
        //            , ptype: pType
        //        }
        //        , function (pData) {
        //            if (pData[0] > 0) {
        //                debugger;
        //                $('#slOperation' + pRowID + '').val(JSON.parse(pData[0]));
        //                Details_HouseAndCertificateChangedByOperation(pRowID);
        //                //$("#slHouse" + pRowID).val(HouseCurrentID);
        //                //$("#slCertificateNumber" + pRowID).val(CertificateCurrentID);
        //                //$("#slTruckingOrder" + pRowID).val(TruckingOrderCurrentID);

        //            }
        //            FadePageCover(false);
        //        }
        //        , null);
        //}
        else if (pType == 3) {
            CallGETFunctionWithParameters("/api/PaymentRequest/GetOperationID"
                , {
                    TransID: $('#slTruckingOrder' + pRowID + '').val()
                    , ptype: pType
                }
                , function (pData) {
                    if (pData[0] > 0) {
                        debugger;
                        $('#slOperation' + pRowID + '').val(JSON.parse(pData[0]));
                        Details_HouseAndCertificateChangedByOperation(pRowID);


                    }

                    FadePageCover(false);
                }
                , null);
        }
        else {
            FadePageCover(false);
        }


    }
}
function GetIssuedToBySupplier(ID) {
    debugger;
    if (pDefaults.UnEditableCompanyName == "COS" && $("#tblPaymentRequestDetails tbody td.Supplier").find("option:selected").attr("partnerid") != undefined) {
        debugger;
        let CurrencyID = $("#slCurrency").val();
        let PartnerID = $("#tblPaymentRequestDetails tbody td.Supplier").find("option:selected").attr("partnerid");
        let PartnerTypeID = $("#tblPaymentRequestDetails tbody td.Supplier").find("option:selected").attr("partnertypeid");
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/PaymentRequest/GetSupplierBankDetails",
            {
                pPartnerID: PartnerID,
                pPartnerTypeID: PartnerTypeID,
                pCurrencyID: CurrencyID
            },
            function (pData) {
                FillListFromObject((JSON.parse(pData[0]).length > 0 ? JSON.parse(pData[0])[0].ID : null), 25, "Select", "slIssuedToCmbo", pData[0], null);
                FadePageCover(false);
            }
        )
    } else {
        if (check == 0 && parseInt($('#slOperation' + ID + '').val()) > 0 && $('#slSupplier' + ID).val() != "" && $('#slSupplier' + ID + ' option:selected').attr("partnerid") != undefined) {
            FadePageCover(true);

            CallGETFunctionWithParameters("/api/PaymentRequest/GetIssuedToBySupplier", { pPartnerID: $('#slSupplier' + ID + ' option:selected').attr("partnerid") == "undefined" ? 0 : $('#slSupplier' + ID + ' option:selected').attr("partnerid") }
                , function (pData) {
                    FillListFromObject(JSON.parse(pData[0]), 2, TranslateString("SelectFromMenu"), "slIssuedToCmbo", pData[0], null);
                    FadePageCover(false);
                }
                , null);

        }
    }



}
function Details_FillSlPartenerByPartenerType(pRowID) {
    debugger;
    if ($('#slPartenerType' + pRowID + '').val() != null && $('#slPartenerType' + pRowID + '').val() != "") {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/InvoicesReports/FillPartners", {
            pPartnerTypeID: $('#slPartenerType' + pRowID + '').val(),
            pWhereClause: ""
        }
            , function (pData) {
                FillListFromObject(null, 2/*pCodeOrName*/, "<--All-->", "slPartener" + pRowID, pData[0], null);
                $('#slPartener' + pRowID).val($('#slPartener' + pRowID).attr('tag'));
                FadePageCover(false);
            }
            , null);
    }




    //// var pWhereClause = " WHERE OperationID = " + $('#slOperation' + ID + '').val() + " AND PartnerID IS NOT NULL  ORDER BY PartnerTypeName ";
    // var pSlName = "slSupplier" + ID;
    // var pStrFirstRow = "Select Partener";
    // //var pStrFnName = "/api/OperationPartners/LoadAll";
    // var pID = "0";
    // if ($('#slPartenerType' + ID + '').val() != null && $('#slPartenerType' + ID + '').val() != "")
    //     $.ajax({
    //         type: "GET",
    //         url: "/api/InvoicesReports/FillPartners",
    //         data: { pPartnerTypeID: $('#slPartenerType' + ID + '').val() },
    //         contentType: "application/json; charset=utf-8",
    //         dataType: "json",
    //         success: function (data) {

    //             ClearAllOptions(pSlName);
    //             var option = "";
    //             if (pStrFirstRow != null)
    //                 option += '<option value="">' + pStrFirstRow + '</option>';

    //             // Bind Data
    //             $.each(JSON.parse(data[0]), function (i, item) {
    //                 if (pID != null && pID != undefined) //in case of editing
    //                     if (pID == item.ID)
    //                         option += '<option value="' + item.ID + '" selected >' + item.Name + '</option>';
    //                     else
    //                         option += '<option value="' + item.ID + '" selected >' + item.Name + '</option>';
    //                 else
    //                     option += '<option value="' + item.ID + '" selected >' + item.Name + '</option>';
    //             });

    //             $("#" + pSlName).append(option);
    //             $('#slPartener' + ID).val($('#slPartener' + ID).attr('tag'));

    //             //if (callback != null && callback != undefined)
    //             //    callback();
    //         },
    //         error: function (jqXHR, exception) {
    //             swal("Sorry", "Please, press Ctrl+Shft+R, and if the problem persists contact your technical support! GetListWithName in mainapp.master.js", "");
    //             FadePageCover(false);
    //         }

    //     });
}

function CopyCustody() {
    debugger;
    if ($('#slCustody').val() != "" && $('#slCustody').val() != "0") {

        if (IsMESCOCompany && _IsCustodySettlement == 1 && $("#hID").val() != "") {
            CallGETFunctionWithParameters("/api/PaymentRequest/AddCustodyPartnerToOperation"
                , {
                    pID: $("#hID").val()
                    , pCustodyID: $("#slCustody").val() == "" || $("#slCustody").val() == null ? 0 : $("#slCustody").val()
                }
                , function (pData) {
                    debugger;
                    var ReturnedMessage = pData[0];
                    var CustodyID = pData[1];
                    if (ReturnedMessage == "") {
                        var ID = 0;
                        $('#tblPaymentRequestDetails > tbody > tr').each(function (i, tr) {
                            ID = $(tr).attr('ID');
                            GetSuppliers_Charges(ID, CustodyID);
                            //CustodyID = $("#slSupplier" + ID + " option[partnerid='" + $('#slCustody').val() + "']").val();
                            //$("#slSupplier" + ID).val(CustodyID);

                        });

                    }
                    else {
                        swal("Sorry", ReturnedMessage);
                    }
                    FadePageCover(false);
                });

        }
        else {
            var ID = 0;
            var CustodyID = 0;
            $('#tblPaymentRequestDetails > tbody > tr').each(function (i, tr) {
                ID = $(tr).attr('ID');
                CustodyID = $("#slSupplier" + ID + " option[partnerid='" + $('#slCustody').val() + "']").val();
                $("#slSupplier" + ID).val(CustodyID);

            });
        }
    }
}
function GetUserIDFromCustudy() {
    debugger;
    $("#btn-split").addClass("hide");
    if (IsMESCOCompany) {
        $("#txtAccount").parent().removeClass("hide");
        $("#txtSubAccount").parent().removeClass("hide");
        $("#cbIsDirectPR").parent().parent().removeClass("hide");
    }
    CallGETFunctionWithParameters("/api/PaymentRequest/GetUserIDFromCustudy"
        , {}
        , function (pResult) {
            if (pResult[0] > 0) {
                debugger;

                CallGETFunctionWithParameters("/api/PaymentRequest/GetCustudy", {}
                    , function (pData) {
                        FillListFromObject(JSON.parse(pResult[0]), 2, TranslateString("SelectFromMenu"), "slCustody", pData[0], null);

                    }, null);

            }

            FadePageCover(false);
        }
        , null);

}


function PaymentRequest_UnApproveList(callback) {
    //Confirmation message to delete
    debugger;
    //if (_IsCustodySettlement == 1) {
    if (GetAllSelectedIDsAsString('tblPaymentRequest') != "")
        swal({
            title: "يرجى التأكيد",
            text: "سيتم فك اعتماد الحقول المختارة",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "تأكيد",
            closeOnConfirm: false
        },
            //callback function in case of confirm delete

            function () {
                //  setTimeout(function () {
                FadePageCover(true);
                CallGETFunctionWithParameters("/api/PaymentRequest/UnApprove"
                    , { "pDeletedPaymentRequestIDs": GetAllSelectedIDsAsString('tblPaymentRequest'), "PReceiverUsers": "0", "pIsCustodySettlement": _IsCustodySettlement }
                    , function (pData) {
                        if (pData == "") {
                            swal("Success", "تم فك الاعتماد بنجاح");
                            FadePageCover(false);
                            jQuery('#CheckboxesListModal').modal('hide')
                            PaymentRequest_LoadingWithPaging();
                            LoadDefaults("/api/Defaults/LoadAll", " WHERE 1=1 ");
                        }
                        else {
                            FadePageCover(false);
                            jQuery('#CheckboxesListModal').modal('hide')
                            showDeleteFailMessage = true;
                            strDeleteFailMessage = pData;
                            PaymentRequest_LoadingWithPaging();
                        }
                    });
                // }, 400)
            });

}

function CopyPartnerName() {
    debugger;
    if ($('#slClient').val() != "" && $('#slClient').val() != "0" && $('#slClient').val() != null) {

        var ID = 0;
        var CustodyID = 0;
        $('#tblPaymentRequestDetails > tbody > tr').each(function (i, tr) {
            ID = $(tr).attr('id');

            if ($('#slOperation' + ID + '').val() != "" && $('#slOperation' + ID + '').val() != "0" && $('#slOperation' + ID + '').val() != undefined) {
                CustodyID = $("#slSupplier" + ID + " option[partnerid='" + $('#slClient').val() + "']").val();
                if (CustodyID != undefined && CustodyID != "undefined") {
                    $("#slSupplier" + ID).val(CustodyID);
                }

            }

        });

    }
}


function GetSupplierBankAccounts() {
    
}



//////////Calc BL
function PaymentRequest_CalcBL(pID) {
    debugger;

    var ErrorMsg = '';
    var pOperationID = 0;
    var pOperationCode = '';
    var pContainerID = 0;
    var pHouseID = 0;
    var pTotalCost = 0;
    var pBLCalcTypeID = $('#slCalcBL' + pID).val();
    var pSupplierID = 0;
    var pRowCount = 0;
    var pPayableID = 0;
    var pChargeTypeID = 0;
    var pChargeTypeName = '';
    var pSupplierName = '';
    var pSupplierInvoiceNo = '';
    var pIsVATFromPRForm = false;
    var pEstmatedCost = 0.0;
  // $('#tblPaymentRequestDetails > tbody > tr').each(function (i, tr) {
     //   debugger;
        pRowCount++;
        var ID = pID; //$(tr).attr("ID");
        pOperationID = $('#slOperation' + ID + ' option:selected').val();
        pOperationCode = $('#slOperation' + ID + ' option:selected').text();
        pContainerID = $('#slTruckingOrder' + ID + ' option:selected').val();
        pSupplierID = $('#slSupplier' + ID + ' option:selected').val();
        pSupplierName = $('#slSupplier' + ID + ' option:selected').text();
        pContainerNumber = $('#slTruckingOrder' + ID + ' option:selected').text();

        pHouseID = $('#slHouse' + ID + ' option:selected').val();
        pIsVATFromPRForm = $('#txtIsVATFromPRForm' + ID).val();
        pTaxID = $('#slTaxVat' + ID + ' option:selected').val();
        pEstmatedCost = $('#txtEstmatedCost' + ID).val();
        pSupplierInvoiceNo = $('#txtSupplierInvoiceNo' + ID).val();

    
    var pRowID=  $("#tblPaymentRequestDetails tbody tr[ID=" + pID + "]").find('input[name="Delete"]').attr('value');

    // Get the selected option element
    var selectedOption = $('#slSupplier' + ID + ' option:selected');

    // Create an object to store all attributes
    var optionAttributes = {
        value: selectedOption.val(),
        clientemailnotcontact: selectedOption.attr("clientemailnotcontact"),
        email: selectedOption.attr("email"),
        partnertypeid: selectedOption.attr("partnertypeid"),
        partnerid: selectedOption.attr("partnerid"),
        paymenttermid: selectedOption.attr("paymenttermid"),
        text: selectedOption.text()
    };



    var SupplierOption = '<option selected value="' + selectedOption.val() + '" clientemailnotcontact="' + selectedOption.attr("clientemailnotcontact") + '" email="' + selectedOption.attr("email") + '" partnertypeid="' + selectedOption.attr("partnertypeid") + '" partnerid="' + selectedOption.attr("partnerid") + '" paymenttermid="' + selectedOption.attr("paymenttermid") + '">' + selectedOption.text() + '</option>';

    if ( _IsCustodySettlement )
          pTotalCost = $('#txtActualCost' + ID).val();
        else
          pTotalCost = $('#txtEstmatedCost' + ID).val();

        pPayableID = $("#slPayable" + ID).val();
        pChargeTypeID = $("#slPayable" + ID + ' option:selected').attr("chargetypeid");
        pChargeTypeName = $("#slPayable" + ID + ' option:selected').text();
    //});

    if (pBLCalcTypeID == 0 || pBLCalcTypeID == null)
        ErrorMsg = " Choose Calc Type ";
    if (pContainerID == 0)
        ErrorMsg = " Choose Container Number ";
    if (pHouseID != 0)
        ErrorMsg = " Choose House Number Not Allowed ";
    //if (pRowCount > 1)
    //    ErrorMsg = "row must be one";
    if (pTotalCost <= 0)
        ErrorMsg = "amount must be more than zero";
    if (pPayableID == 0)
        ErrorMsg = "choose payable";
    if (IsCalcBl == 1)
        ErrorMsg = "save payment request first to calc other BL";

    if (ErrorMsg == "") {
        FadePageCover(true);

        CallGETFunctionWithParameters("/api/PaymentRequest/PaymentRequest_CalcBL"
            , {
                pBLCalcTypeID: pBLCalcTypeID
                , pContainerID: pContainerID
                , pContainerNumber: pContainerNumber
                , pOperationID: pOperationID
                , pTotalAmount: pTotalCost
            }
            , function (pData) {

                if (pData[2] == '') {
                    var pDataDetails = JSON.parse(pData[0]);
                    if (pDataDetails.length > 0)
                        PaymentRequestDetails_AfterCalc_BindTableRows(pDataDetails, pOperationID, pOperationCode, pSupplierID, pContainerID, pContainerNumber, pPayableID, pChargeTypeID, pChargeTypeName, pID, pSupplierName, SupplierOption, pRowID, pIsVATFromPRForm, pTaxID, pEstmatedCost, pSupplierInvoiceNo);
                    else
                        swal('', 'No Rows Found');
                }
                else
                    swal('', pData[2]);

                FadePageCover(false);
            }
            , null);
    }
    else
        swal('Warning', ErrorMsg);
  
}


function PaymentRequestDetails_AfterCalc_BindTableRows(pInvoiceDetails, pOperationID, pOperationCode, pSupplierID, pContainerID, pContainerNumber, pPayableID, pChargeTypeID, pChargeTypeName, pID, pSupplierName, SupplierOption, pRowID, pIsVATFromPRForm, pTaxID, pEstmatedCost, pSupplierInvoiceNo) {
    debugger;
    check = 1;

   // ClearAllTableRows("tblPaymentRequestDetails");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    // var rowsRendered = 0;
    $('#tblPaymentRequestDetails tbody').find("tr[id='" + pID + "']").remove()
  //  $('#cb-CheckAll-PaymentRequestDetails').attr('disabled', 'disabled');
    CalcBLPayableID = pPayableID;
    $.each(pInvoiceDetails, function (i, item) {
        IsCalcBl = 1;

        maxDetailsIDInTable++;

            AppendRowtoTable("tblPaymentRequestDetails",
                ("<tr ID='" + maxDetailsIDInTable + "' " + ">"
                    + "<td class='DetailsID'> <input  name='Delete' type='checkbox' value=" +(i == 0 ? pRowID :  '0') +" /></td>"
                    + "<td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + maxDetailsIDInTable + "' checked='checked' /></td>"
                   // Details_HouseAndCertificateChangedByOperation(" + maxDetailsIDInTable + ");
                    + "<td class='SearchOperationCode' style='display:flex;gap:4px;'>      <input disabled type='text' id='SearchOperationCode" + maxDetailsIDInTable + "' style='padding:3px' onkeypress='DisableEnterKey(id);'>     <i  class='fa fa-search' style='background-color:lightblue;border-radius:50%;padding:6px;cursor:pointer'></i></td>"
                    + "<td class='Operation' style='width:20%;' val=''><select disabled  tag='" + (pOperationID) + "' id='slOperation" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slOperation' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='GetSuppliers_Charges(" + maxDetailsIDInTable + ");GetSuppliers(" + maxDetailsIDInTable + "," + pSupplierID + ")' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'><option value='" + pOperationID + "' selected>" + pOperationCode + "</option></select></td>"
                    + "<td class='TruckingOrder '  val=''><select disabled  tag='" + (pContainerID == 0 ? "" : pContainerID) + "' id='slTruckingOrder" + maxDetailsIDInTable + "'  class='controlStyle slTruckingOrder' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);'   onkeypress = 'DisableBackspaceKey(id);' data - required='false' > <option value='" + pContainerID + "' selected>" + pContainerNumber + "</option></select ></td > " 
                    + "<td class='HouseNumber '  val=''><select  disabled tag='" + (item.HouseID == 0 ? "" : item.HouseID) + "' id='slHouse" + maxDetailsIDInTable + "'  class='controlStyle slHouse' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange=" + (1!=1 ? "'DetailHouseChanged(" + maxDetailsIDInTable + ")'" : "''") + " onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'><option value='" + item.HouseID + "' selected>" + item.HouseNumber + "</option></select></td>"
                    + "<td class='FlagChargeType hide'  val=''><input id='cbFlagChargeType" + maxDetailsIDInTable + "' " + (i == 0 ? "checked" : "") + "  name='FlagChargeType'  type='checkbox' value='" + (i == 0 ? 1 : 0) + "' /></td>" //onchange='GetChargeTypesToOperation(" + maxDetailsIDInTable + ");'
                    + "<td class='ChargeType hide'  val=''><select disabled tag='" + (pChargeTypeID) + "' id='slChargeType" + maxDetailsIDInTable + "' onchange='GetInitialValue(" + maxDetailsIDInTable + " , false);' class='controlStyle slChargeType' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetInitialValue(" + maxDetailsIDInTable + ");'  data-required='false'>" + "<option value='" + pChargeTypeID + "' selected>" + pChargeTypeName + "</option></select></td>"
                    + "<td class='Payable'  val=''><select disabled tag='" + (i == 0 ? pPayableID.trim() : "") + "' id='slPayable" + maxDetailsIDInTable + "'   class='controlStyle slPayable' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetInitialValue(" + maxDetailsIDInTable + ");'  data-required='false'>" + "<option selected value='" + (i == 0 ? pPayableID.trim() : "") + "' >" + pChargeTypeName + "</option></select></td>" //onchange='GetPayablesToOperation(" + maxDetailsIDInTable + " , false);'
                    + "<td class='CategoryName'></td>"
                    + "<td class='IsVATFromPRForm hide' ><input type='text' tag='" + (pIsVATFromPRForm) + "'  id='txtIsVATFromPRForm" + maxDetailsIDInTable + "' data-required='false' value='" +pIsVATFromPRForm + "' /> </td>"
                    + "<td class='Supplier'  val=''><select disabled  tag='" + (pSupplierID) + "' id='slSupplier" + maxDetailsIDInTable + "'  class='controlStyle slSupplier' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'   data-required='false'>" + SupplierOption + "</select></td>"  //<option value='" + pSupplierID + "' selected> </option >
                    + (_IsCustodySettlement ?
                    ("<td class='EstmatedCost'><input disabled  type='text' tag='" + (i == 0 ? pEstmatedCost : '0') + "'   id='txtEstmatedCost" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);PaymentRequestDetails_CalculateAmount();' onchange='PaymentRequestDetails_CalculateAmount();' data-required='true' value='" + (i == 0 ? pEstmatedCost : '0') + "' /> </td>"
                        + "<td class='ActualCost'><input disabled  type='text' tag='" + (item.Amount) + "'   id='txtActualCost" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);PaymentRequestDetails_CalculateAmount();' onchange='PaymentRequestDetails_CalculateAmount();' data-required='true' value='" + item.Amount + "' /> </td>") :
                        ("<td class='EstmatedCost'><input disabled  type='text' tag='" + (item.Amount) + "'   id='txtEstmatedCost" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);PaymentRequestDetails_CalculateAmount();' onchange='PaymentRequestDetails_CalculateAmount();' data-required='true' value='" + item.Amount + "' /> </td>"))
                    + "<td class='TaxTypeID ' val=''><select  tag='" + ("") + "' id='slTaxVat" + maxDetailsIDInTable + "'  onchange='' class='controlStyle slTaxVat' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange=''  data-required='false'>" + $('#slTaxVat').html() + "</select></td>"
                    + "<td class='DiscountTypeID ' val=''><select  tag='" + ("") + "' id='slTaxDiscount" + maxDetailsIDInTable + "'  onchange='' class='controlStyle slTaxDiscount' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange=''  data-required='false'>" + $('#slTaxDiscount').html() + "</select></td>"
                    + "<td class='Coupon ' ><input type='text' tag='" + ('') + "'  id='txtCoupon" + maxDetailsIDInTable + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + '' + "' /> </td>"
                    + "<td class='SupplierInvoiceNo' ><input type='text' tag='" + ('') + "'  id='txtSupplierInvoiceNo" + maxDetailsIDInTable + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + pSupplierInvoiceNo + "' /> </td>"
                    + (_IsCustodySettlement
                        ? (
                            "<td class='ActualDescription'><input type='text' tag='' id='txtActualDescription" + maxDetailsIDInTable + "' class='controlStyle inputDescription' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' data-required='false' value='' /></td>"
                            + "<td class='Description hide'><input type='text' tag='' id='txtDescription" + maxDetailsIDInTable + "' class='controlStyle inputDescription' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' data-required='false' value='' /></td>"
                            + "<td class='IsSettlementOnly hide' style='width:10%;'><input type='text' tag='" + (i == 0 ? 'false' : 'true') + "' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtIsSettlementOnly" + maxDetailsIDInTable + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + (i == 0 ? 'false' : 'true') + "' /> </td>"
                            +"     <td class='isRetrieved hide' style='width:10%;'><input type='text' style='width:100%;font-size:90%;text-transform:uppercase;' id='isRetrieved" + maxDetailsIDInTable + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + 'false' + "' /> </td>"

                    )
                        : (
                            "<td class='CostCenter' style='min-width: 108px' val=''>"
                            + "<select tag='" + (item.CostCenter_ID == 0 ? "" : item.CostCenter_ID) + "' id='slCostCenter" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slCostCenter' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='' data-required='false'>"
                            + $('#slCostCenterHeader').html()
                            + "</select></td>"
                            + "<td class='Description'><input type='text' tag='' id='txtDescription" + maxDetailsIDInTable + "' class='controlStyle inputDescription' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' data-required='false' value='' /></td>"
                        )
                    )
                    + "</tr>"));

           $('#slTaxVat' + maxDetailsIDInTable).val(pTaxID);

            $("#slOperation" + maxDetailsIDInTable).css({ "width": "100%" }).select2();
            $("#slHouse" + maxDetailsIDInTable).css({ "width": "100%" });
            $("#slTruckingOrder" + maxDetailsIDInTable).css({ "width": "100%" });
            $("#slOperation" + maxDetailsIDInTable).css({ "width": "100%" });
            $("#slSupplier" + maxDetailsIDInTable).css({ "width": "100%" });
            $("#slChargeType" + maxDetailsIDInTable).css({ "width": "100%" });
            $("#slPayable" + maxDetailsIDInTable).css({ "width": "100%" });
            $("#slCostCenter" + maxDetailsIDInTable).css({ "width": "100%" });

           //GetSuppliers_Charges(maxDetailsIDInTable);
           //$("#slSupplier" + maxDetailsIDInTable).val(pSupplierID);
        debugger;
            if (maxDetailsIDInTable - 1 == pInvoiceDetails.length - 1 /*i == pInvoiceDetails.length - 1*/) {
                FillHTMLtblInputs("#tblPaymentRequestDetails > tbody");

                if ($("#hf_CanDelete").val() == 1) {
                    $("#btn-Approve").removeClass("hide");
                    if (pDefaults.UnEditableCompanyName != "MES") 
                        $("#btn-UnApprove").removeClass("hide");
                }
                else {
                    $("#btn-Approve").addClass("hide");
                    $("#btn-UnApprove").addClass("hide");
                }
                if (pLoggedUser.IsAccessAllCharges == true) {
                    $(".HouseNumber").removeClass("hide");
                    $(".TruckingOrder").removeClass("hide");
                    $(".Coupon").removeClass("hide");

                    $(".classShowForDepartementHouse").removeClass("hide");
                    $(".classShowForDepartementTrOr").removeClass("hide");
                    $(".classShowForDepartementCopon").removeClass("hide");



                }
                else {
                    if (pLoggedUser.DepartmentName == "TRANSPORTATION" || pLoggedUser.DepartmentName == "سائقى النقل" || pLoggedUser.DepartmentName == "مناديب النقل") {
                        $(".TruckingOrder").removeClass("hide");
                        $(".classShowForDepartementTrOr").removeClass("hide");

                        $(".PartenerType").removeClass("hide");
                        $(".classShowForDepartementPartenerType").removeClass("hide");

                        $(".Partener").removeClass("hide");
                        $(".classShowForDepartementPartener").removeClass("hide");
                    }
                    else if (pLoggedUser.DepartmentName == "مناديب قطاع الملاحة" || pLoggedUser.DepartmentName == "حبوب - جهات رقابية" || pLoggedUser.DepartmentName == "حاويات - جهات رقابية" ||
                        pLoggedUser.DepartmentName == "تموينات الملاحة" || pLoggedUser.DepartmentName == "تخليص - هيئة ميناء" || pLoggedUser.DepartmentName == "تخليص - جمرك حبوب"
                        || pLoggedUser.DepartmentName == "تخليص - جمرك بضائع عامة" || pLoggedUser.DepartmentName == "تخليص - توكيل" || pLoggedUser.DepartmentName == "SALES"
                        || pLoggedUser.DepartmentName == "INFORMATION TECHNOLOGY" || pLoggedUser.DepartmentName == "FREIGHT" || pLoggedUser.DepartmentName == "CUSTOMS CLEARANCE"
                        || pLoggedUser.DepartmentName == "ACCOUNTING TRUCKING" || pLoggedUser.DepartmentName == "ACCOUNTING SHIPPING - RECEIVAERS" || pLoggedUser.DepartmentName == "ACCOUNTING SHIPPING"
                        || pLoggedUser.DepartmentName == "ACCOUNTING CCA" || pLoggedUser.DepartmentName == "ACCOUNTING" || pLoggedUser.DepartmentName == "مناديب ملاحة / حجر و أمن وطنى") {
                        $(".HouseNumber").removeClass("hide");
                        $(".Coupon").removeClass("hide");

                        $(".classShowForDepartementHouse").removeClass("hide");
                        $(".classShowForDepartementCopon").removeClass("hide");
                    }
                }

                if (pDefaults.UnEditableCompanyName != 'COS') {
                    $(".TaxTypeID").removeClass("hide");
                    $(".DiscountTypeID").removeClass("hide");
                    //$(".TaxVatAmount").removeClass("hide");
                    //$(".TaxDiscountAmount").removeClass("hide");


                }
                else {
                    $(".TaxTypeID").addClass("hide");
                    $(".DiscountTypeID").addClass("hide");
                    //$(".TaxVatAmount").addClass("hide");
                    //$(".TaxDiscountAmount").addClass("hide");

                }

                if (pDefaults.UnEditableCompanyName == "MES") {
                    $('.classHideForMesco').addClass('hide');
                    $('.FlagChargeType').addClass('hide');
                    $('.ChargeType').addClass('hide');
                    $(".TaxTypeID select").attr('onchange', 'PaymentRequestDetails_CalculateAmount();');
                    $(".DiscountTypeID select").attr('onchange', 'PaymentRequestDetails_CalculateAmount();');
                }
                ////ApplyPermissions();
                //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
                BindAllCheckboxonTable("tblPaymentRequestDetails", "ID", "cb-CheckAll-PaymentRequestDetails");
                CheckAllCheckbox("HeaderDeletePaymentRequestDetailsID");
                if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
                    swal(strSorry, strDeleteFailMessage, "warning");
                    showDeleteFailMessage = false;
                }
            }

    }

    );

}
function OnDiscountChanged() {
    debugger;
    let amount = parseFloat($('#txtAmount').val());
    let discount = parseFloat($('#txtDiscount').val());
    if (discount > amount) {
        $('#txtDiscount').val(0);
        discount = 0;
    }
    $('#txtAfterDiscount').val(amount - discount);
}

function UpdatePartnerAccounts() {
    debugger;
    if (IsMESCOCompany && _IsCustodySettlement == 0 && $("#hID").val() != "") {
        CallGETFunctionWithParameters("/api/PaymentRequest/UpdatePartnerAccounts"
            , {
                pID: $("#hID").val()
                , pCustodyID: $("#slCustody").val() == "" || $("#slCustody").val() == null ? 0 : $("#slCustody").val()
                , pPartnerTypeID: $("#slPartnerType").val() == "" || $("#slPartnerType").val() == null ? 0 : $("#slPartnerType").val()
                , pPartnerID: $("#slClient").val() == "" || $("#slClient").val() == null ? 0 : $("#slClient").val()
                , pIsDirect: $("#cbIsDirectPR").prop("checked")
            }
            , function (pData) {
                debugger;
                var ReturnedMessage = pData[0];
                var Account = pData[1];
                var SubAccount = pData[2];
                if (ReturnedMessage == "") {
                    $("#txtAccount").val(Account);
                    $("#txtSubAccount").val(SubAccount);
                }
                else {
                    swal("Sorry", ReturnedMessage);
                }
                FadePageCover(false);
            });
    }
}
function Details_Split_SelectUsersToNotify() {
    var AllDetailsIDs = GetAllIDsAsStringWithNameAttr("tblPaymentRequestDetails", "Delete");
    var pPaymentRequestDetailsSelectedIDs = GetAllSelectedIDsAsString('tblPaymentRequestDetails');

    if (AllDetailsIDs == pPaymentRequestDetailsSelectedIDs) {
        swal("Sorry", "You cannot split all the items");
    } else if (pPaymentRequestDetailsSelectedIDs == "") {
        swal("Sorry", "You have to select at least one item");
    }
    else {
        $("#lblShownItems_SplitPaymentRequest").html(" Receptionists");
        $("#divCheckboxesList_SplitPaymentRequest").html("");
        jQuery("#CheckboxesListModal_SplitPaymentRequest").modal("show");
        var pStrFnName = "/api/Users/LoadAll";
        var pDivName = "divCheckboxesList_SplitPaymentRequest";
        var pCheckboxNameAttr = "cbAddedItemID_SplitPaymentRequest";
        var pWhereClause = " WHERE IsInactive=0 ";
        pWhereClause += " ORDER BY Name ";
        FadePageCover(true);
        GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
            , function () {
                FadePageCover(false);
            }
        );
    }  
}
function PaymentRequest_Split() {
    var AllDetailsIDs = GetAllIDsAsStringWithNameAttr("tblPaymentRequestDetails", "Delete");
    var pPaymentRequestDetailsSelectedIDs = GetAllSelectedIDsAsString('tblPaymentRequestDetails');

    
    var pCheckboxNameAttr = "cbAddedItemID_SplitPaymentRequest";
    var pReceiverUsersIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
    if (pReceiverUsersIDs == "" && pLoggedUserApprovedFromNotifyPaymentRequest == 0)
        swal("Sorry", "You have to select at least one receptionist.");
    else {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/PaymentRequest/Split"
            , {
                pID: $("#hID").val()
                , pPaymentRequestDetailsIDs: pPaymentRequestDetailsSelectedIDs
                , pReceiverUsersIDs: pReceiverUsersIDs
            }
            , function (pData) {
                var ReturnedMessage = pData[0];
                if (ReturnedMessage == "") {
                    swal("Done", "Splitted successfully!");
                    jQuery("#CheckboxesListModal_SplitPaymentRequest").modal("hide");
                    jQuery("#PaymentRequestModal").modal("hide");
                    PaymentRequest_LoadingWithPaging();
                }
                else {
                    swal("Sorry", ReturnedMessage);
                }
                FadePageCover(false);
            }
        );
    }
}

function OpenSelectOperationPayablesModal() {
    debugger;
    jQuery("#SelectOperationPayablesModal").modal("show");
    $('#slOperationForOperationPayablesModal').val(null).trigger('change');
}

function InsertPaymentRequestDetailsFromOperationPayables() {
    debugger;
    $("#page-cover-page").css("opacity", 0.6).fadeIn(0);
    $("#page-cover-master").css("opacity", 0.6).fadeIn(0);
    let OperationID = $("#slOperationForOperationPayablesModal").val();
    let OperationCode = $("#slOperationForOperationPayablesModal option:selected").text();
    let match = OperationCode.match(/-(\d+)$/);
    let OperationCodeSerial = match ? match[1] : null;
    let PayablesIDs = GetAllSelectedIDsAsString("tblOperationPayables");

    let maxDetailsIDInTableArr = [];
    if (PayablesIDs == "" || PayablesIDs == null) {
        return;
    }

    let PayablesIDsArr = PayablesIDs.split(",");
    PayablesIDsArr.forEach(function (item) {
        let found = false;

        $('#tblPaymentRequestDetails .Payable select').each(function () {
            if ($(this).val() == item) {
                found = true;
            }
        });
        if (found) {
            FadePageCover(false);
            jQuery('#SelectOperationPayablesModal').modal('hide');
            return;
        }
        check = 0;
        ++maxDetailsIDInTable;
        var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
        var dateValidTo = Date.prototype.addDays(ConvertDateFormat(FormattedTodaysDate), 30);
        maxDetailsIDInTableArr.push({ payableID: item, maxDetail: maxDetailsIDInTable });
        var tr = "";
            tr += "<tr ID='" + maxDetailsIDInTable + "' isdeleted='0' tag='item'   counter='" + (maxDetailsIDInTable) + "' value='" + 0 + "'>"
            tr += "     <td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + maxDetailsIDInTable + "' checked='checked' /></td>";
            tr += "     <td class='DetailsID' ><input " + (1 == 2 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + 0 + "' /></td>";

            //Added to load the operations combo just with the matching operations to decrease screen load time
            tr += "     <td class='SearchOperationCode' style='display:flex;gap:4px;'>      <input type='text' id='SearchOperationCode" + maxDetailsIDInTable + "' style='padding:3px' onkeypress='DisableEnterKey(id);'>     <i class='fa fa-search' style='background-color:lightblue;border-radius:50%;padding:6px;cursor:pointer;' onclick='LoadRequiredOperations(" + maxDetailsIDInTable + ")'></i></td>"

            tr += "     <td class='Operation' val=''><select id='slOperation" + maxDetailsIDInTable + "' class='controlStyle slOperation' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'   onchange='GetSuppliers_Charges(" + maxDetailsIDInTable + ");Details_HouseAndCertificateChangedByOperation(" + maxDetailsIDInTable + "); GetChargeTypesToOperation(" + maxDetailsIDInTable + ");'  data-required='false'>" + "<option value=0></option>" + "</select></td>";
        tr += "     <td class='TruckingOrder hide'   style='display: flex; gap: 8px;'  val=''><select id='slTruckingOrder" + maxDetailsIDInTable + "' class='controlStyle slTruckingOrder' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange=" + (IsMESCOCompany ? "'DetailContainerChanged(" + maxDetailsIDInTable + ")'" : "'GetSuppliers_Charges(" + maxDetailsIDInTable + ");Details_ChangedByHouseAndCertificateAndTrucingOrder(" + maxDetailsIDInTable + ',' + 3 + ");'") + "  data-required='false'>" + "<option value=0></option>" + "</select>"

            if (pDefaults.UnEditableCompanyName == "MES")
                tr += "     <select id='slCalcBL" + maxDetailsIDInTable + "' class='controlStyle slCalcBL' " + "onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' " + "onkeypress='DisableBackspaceKey(id);' data-required='false'>" + $('#slCalcBL').html() + "</select>"
                    + " <button id='btn-CalcBL" + maxDetailsIDInTable + "' title='Search' " + "class='btn btn-sm btn-warning' onclick='PaymentRequest_CalcBL(" + maxDetailsIDInTable + ");' type='button'>" + "<i class='fa fa-calculator'></i>" + "</button>"

            tr += "</td>";

        tr += "     <td class='HouseNumber hide' val=''><select id='slHouse" + maxDetailsIDInTable + "' class='controlStyle slHouse' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange=" + (IsMESCOCompany ? "'DetailHouseChanged(" + maxDetailsIDInTable + ")'" : "'Details_ChangedByHouseAndCertificateAndTrucingOrder(" + maxDetailsIDInTable + ',' + 1 + ");'") + "  data-required='false'>" + "<option value=0></option>" + "</select> </td>";


            tr += "     <td class='FlagChargeType' val=''><input id='cbFlagChargeType" + maxDetailsIDInTable + "'  name='FlagChargeType'  onchange='GetChargeTypesToOperation(" + maxDetailsIDInTable + ");' type='checkbox' checked='checked' value='" + maxDetailsIDInTable + "' /></td>"
            tr += "     <td class='ChargeType' val=''><select id='slChargeType" + maxDetailsIDInTable + "' onchange='GetInitialValue(" + maxDetailsIDInTable + ");' class='controlStyle slChargeType' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetInitialValue(" + maxDetailsIDInTable + ");'  data-required='false'>" + "<option value=0></option>" + "</select></td>";
            tr += "     <td class='Payable' disabled val=''><select id='slPayable" + maxDetailsIDInTable + "' onchange='GetPayablesToOperation(" + maxDetailsIDInTable + ");' class='controlStyle slPayable' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='GetInitialValue(" + maxDetailsIDInTable + ");' data-required='false'>" + "<option value=0></option>" + "</select></td>";
            if (IsMESCOCompany)
                tr += "<td class='CategoryName'></td>"
            tr += "     <td class='Supplier'  val=''><select id='slSupplier" + maxDetailsIDInTable + "' class='controlStyle slSupplier' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='GetIssuedToBySupplier(" + maxDetailsIDInTable + "); ' data-required='false'>" + "<option value=0></option>" + "</select></td>";
            tr += "     <td class='EstmatedCost' ><input type='text'   id='txtEstmatedCost" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);PaymentRequestDetails_CalculateAmount();' onchange='PaymentRequestDetails_CalculateAmount();' data-required='false' value='0' /> </td>";

            tr += "     <td class='TaxTypeID hide'  val=''><select  id='slTaxVat" + maxDetailsIDInTable + "'  class='controlStyle slTaxVat' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='' data-required='false'>" + "<option value=0></option>" + "</select></td>";
            tr += "     <td class='DiscountTypeID hide'  val=''><select id='slTaxDiscount" + maxDetailsIDInTable + "'  class='controlStyle slTaxDiscount' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='' data-required='false'>" + "<option value=0></option>" + "</select></td>";

            tr += "     <td class='Coupon hide' ><input type='text'  id='txtCoupon" + maxDetailsIDInTable + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + ($("#txtCoupon" + (maxDetailsIDInTable - 1)).val() == undefined ? "" : $("#txtCoupon" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";
            tr += "     <td class='SupplierInvoiceNo ' ><input type='text'  id='txtSupplierInvoiceNo" + maxDetailsIDInTable + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + ($("#txtSupplierInvoiceNo" + (maxDetailsIDInTable - 1)).val() == undefined ? "" : $("#txtSupplierInvoiceNo" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";
            tr += "     <td class='CostCenter' style='min-width: 108px'   val=''><select id='slCostCenter" + maxDetailsIDInTable + "'  class='controlStyle slCostCenter' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='' data-required='false'>" + "<option value=0></option>" + "</select></td>";
            tr += "     <td class='Description' ><input type='text'  id='txtDescription" + maxDetailsIDInTable + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + ($("#txtDescription" + (maxDetailsIDInTable - 1)).val() == undefined ? "" : $("#txtDescription" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";
            tr += "     <td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate'  id='SelectedIDsToUpdate" + maxDetailsIDInTable + "' type='checkbox' value='" + maxDetailsIDInTable + "' /></td>";
            tr += "     <td class='hide'>"
                + "</td>";
            tr += "</tr>";
        


        $("#tblPaymentRequestDetails tbody").prepend(tr);
        if ($("[id$='hf_ChangeLanguage']").val() == "ar")
            $("#tblPaymentRequestDetails tbody tr[ID=" + maxDetailsIDInTable + "]").reverseChildren();
        /***************************Filling row controls******************************/

        $("#slOperation" + maxDetailsIDInTable).html($("#slOperation").html());

        $("#slHouse" + maxDetailsIDInTable).html($("#slHouse").html());
        $("#slTruckingOrder" + maxDetailsIDInTable).html($("#slTruckingOrder").html());
        $("#slPartenerType" + maxDetailsIDInTable).html($("#slPartenerType").html());
        $("#slPartener" + maxDetailsIDInTable).html($("#slPartener").html());
        $("#slChargeType" + maxDetailsIDInTable).html($("#slOperation").html());
        $("#slTaxVat" + maxDetailsIDInTable).html($("#slTaxVat").html());
        $("#slTaxDiscount" + maxDetailsIDInTable).html($("#slTaxDiscount").html());

        $("#slCostCenter" + maxDetailsIDInTable).html($("#slCostCenterHeader").html());

        if (IsMESCOCompany) {
            $("#cbFlagChargeType" + maxDetailsIDInTable).prop('checked', true);
            $(".TaxVat").addClass("TaxTypeID");
            $(".TaxVat").removeClass("TaxVat");
            $(".TaxTypeID select").attr('onchange', 'PaymentRequestDetails_CalculateAmount();');
            $(".TaxDiscount").addClass("DiscountTypeID");
            $(".TaxDiscount").removeClass("TaxDiscount");
            $(".DiscountTypeID select").attr('onchange', 'PaymentRequestDetails_CalculateAmount();');
        }
        if (pDefaults.UnEditableCompanyName != 'COS') {
            $(".TaxTypeID").removeClass("hide");
            $(".DiscountTypeID").removeClass("hide");
        }
        else {
            $(".TaxTypeID").addClass("hide");
            $(".DiscountTypeID").addClass("hide");

        }


        $("#slChargeType" + maxDetailsIDInTable).html($("#slChargeType").html());
        $("#slSupplier" + maxDetailsIDInTable).html($("#slSupplier").html());

        BindAllCheckboxonTable("tblPaymentRequestDetails", "DetailsID", "cb-CheckAll-PaymentRequestDetails");

        $("#slHouse" + maxDetailsIDInTable).css({ "width": "100%" }).select2();
        $("#slOperation" + maxDetailsIDInTable).css({ "width": "100%" }).select2();
        $("#slChargeType" + maxDetailsIDInTable).css({ "width": "100%" }).select2();

        $("#slTruckingOrder" + maxDetailsIDInTable).css({ "width": "100%" });
        $("#slOperation" + maxDetailsIDInTable).css({ "width": "100%" });

        $("#slSupplier" + maxDetailsIDInTable).css({ "width": "100%" });
        $("#slChargeType" + maxDetailsIDInTable).css({ "width": "100%" });
        $("#slCostCenter" + maxDetailsIDInTable).css({ "width": "100%" });

        if (pLoggedUser.IsAccessAllCharges == true) {
            $(".HouseNumber").removeClass("hide");
            $(".TruckingOrder").removeClass("hide");
            $(".Coupon").removeClass("hide");

            $(".classShowForDepartementHouse").removeClass("hide");
            $(".classShowForDepartementTrOr").removeClass("hide");
            $(".classShowForDepartementCopon").removeClass("hide");



        }
        else {
            if (pLoggedUser.DepartmentName == "TRANSPORTATION" || pLoggedUser.DepartmentName == "سائقى النقل" || pLoggedUser.DepartmentName == "مناديب النقل") {
                $(".TruckingOrder").removeClass("hide");
                $(".classShowForDepartementTrOr").removeClass("hide");

                $(".PartenerType").removeClass("hide");
                $(".classShowForDepartementPartenerType").removeClass("hide");

                $(".Partener").removeClass("hide");
                $(".classShowForDepartementPartener").removeClass("hide");
            }
            else if (pLoggedUser.DepartmentName == "مناديب قطاع الملاحة" || pLoggedUser.DepartmentName == "حبوب - جهات رقابية" || pLoggedUser.DepartmentName == "حاويات - جهات رقابية" ||
                pLoggedUser.DepartmentName == "تموينات الملاحة" || pLoggedUser.DepartmentName == "تخليص - هيئة ميناء" || pLoggedUser.DepartmentName == "تخليص - جمرك حبوب"
                || pLoggedUser.DepartmentName == "تخليص - جمرك بضائع عامة" || pLoggedUser.DepartmentName == "تخليص - توكيل" || pLoggedUser.DepartmentName == "SALES"
                || pLoggedUser.DepartmentName == "INFORMATION TECHNOLOGY" || pLoggedUser.DepartmentName == "FREIGHT" || pLoggedUser.DepartmentName == "CUSTOMS CLEARANCE"
                || pLoggedUser.DepartmentName == "ACCOUNTING TRUCKING" || pLoggedUser.DepartmentName == "ACCOUNTING SHIPPING - RECEIVAERS" || pLoggedUser.DepartmentName == "ACCOUNTING SHIPPING"
                || pLoggedUser.DepartmentName == "ACCOUNTING CCA" || pLoggedUser.DepartmentName == "ACCOUNTING" || pLoggedUser.DepartmentName == "مناديب ملاحة / حجر و أمن وطنى") {
                $(".HouseNumber").removeClass("hide");
                $(".Coupon").removeClass("hide");

                $(".classShowForDepartementHouse").removeClass("hide");
                $(".classShowForDepartementCopon").removeClass("hide");
            }
        }

        if (pDefaults.UnEditableCompanyName == "MES") {
            $('.classHideForMesco').addClass('hide');
            $('.FlagChargeType').addClass('hide');
            $('.ChargeType').addClass('hide');
            $('.Payable').removeClass('hide');
        }

        //$('#SearchOperationCode' + maxDetailsIDInTable).val(OperationCodeSerial);
        //LoadRequiredOperations(maxDetailsIDInTable);
        //$('#slPayable' + maxDetailsIDInTable).val(item).trigger("change");
        //jQuery('#SelectOperationPayablesModal').modal('hide');
        
    });
    CallGETFunctionWithParameters("/api/PaymentRequest/GetRequiredOperations", { pSearchOperationCode: OperationCodeSerial },
        function (pData) {
            debugger;
            FadePageCover(true);
            if (JSON.parse(pData).length > 0) {
                let FirstMatchingOperationID = JSON.parse(pData)[0].ID
                maxDetailsIDInTableArr.forEach(function (item) {
                    Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(pData[0], "ID", "Code,VesselName,ActualArrivalString", ' --> ', "<--Select-->", "#slOperation" + item.maxDetail, FirstMatchingOperationID, "", null);
                });


                //Details_FillSlHouseAndCertificate("slHouse" + pRowID, pRowID, 1);
                CallGETFunctionWithParameters("/api/PaymentRequest/FillCombo"
                    , {
                        PoperationID: OperationID
                        , ptype: 1
                        , pOrderBy: "ID"
                    }
                    , function (pData) {
                        FadePageCover(true);
                        maxDetailsIDInTableArr.forEach(function (item) {
                            FillListFromObject_ERP(null, 2, TranslateString("SelectFromMenu"), "slHouse" + item.maxDetail, pData[0], null);
                            $("#" + "slHouse" + item.maxDetail).css({ "width": "100%" }).select2();
                            $("div[tabindex='-1']").removeAttr('tabindex');
                            $("#" + "slHouse" + item.maxDetail).val($("#" + "slHouse" + item.maxDetail).attr('tag') == undefined ? "0" : $("#" + "slHouse" + item.maxDetail).attr('tag') == "" ? "0" : $("#" + "slHouse" + item.maxDetail).attr('tag'));
                            $("#" + "slHouse" + item.maxDetail).trigger("change");
                        });
                        
                    }
                    , null,false);

                //Details_FillSlHouseAndCertificate("slTruckingOrder" + pRowID, pRowID, 3);
                CallGETFunctionWithParameters("/api/PaymentRequest/FillCombo"
                    , {
                        PoperationID: OperationID
                        , ptype: 3
                        , pOrderBy: "ID"
                    }
                    , function (pData) {
                        maxDetailsIDInTableArr.forEach(function (item) {
                            FillListFromObject_ERP(null, 2, TranslateString("SelectFromMenu"), "slTruckingOrder" + item.maxDetail, pData[0], null);
                            $("#" + "slTruckingOrder" + item.maxDetail).css({ "width": "100%" }).select2();
                            $("div[tabindex='-1']").removeAttr('tabindex');
                            $("#" + "slTruckingOrder" + item.maxDetail).val($("#" + "slTruckingOrder" + item.maxDetail).attr('tag') == undefined ? "0" : $("#" + "slTruckingOrder" + item.maxDetail).attr('tag') == "" ? "0" : $("#" + "slTruckingOrder" + item.maxDetail).attr('tag'));
                            $("#" + "slTruckingOrder" + item.maxDetail).trigger("change");
                        });

                    }
                    , null,false);

                //GetSuppliers_Charges(DetailID);
                //var pSlName = "slSupplier" + ID;
                var pStrFirstRow = "Select Supplier";
                var pID = "0";
                if (OperationID != "0")
                    $.ajax({
                        type: "GET",
                        url: "/api/OperationPartners/LoadAll",
                        data: { pWhereClause: " WHERE OperationID = " + OperationID + " AND PartnerID IS NOT NULL  ORDER BY PartnerTypeName " },
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        success: function (data) {

                            maxDetailsIDInTableArr.forEach(function (item2) {
                                ClearAllOptions("slSupplier" + item2.maxDetail);
                                var option = "";
                                if (pStrFirstRow != null)
                                    option += '<option value="" PartnerTypeID="0" PartnerID="0" PaymentTermID="0" ClientEmailNotContact="0" Email="0">' + pStrFirstRow + '</option>';
                                // Bind Data
                                $.each(JSON.parse(data[0]), function (i, item) {
                                    if (pID != null && pID != undefined) //in case of editing
                                        if (pID == item.ID)
                                            option += '<option value=' + item.ID + ' ClientEmailNotContact="' + item.ClientEmailNotContact + '"' + ' Email="' + item.Email + '"' + ' PartnerTypeID = ' + item.PartnerTypeID + ' PartnerID = ' + item.PartnerID + ' PaymentTermID = ' + item.PaymentTermID + ' selected >' + item.Code + ": " + item.Name + '</option>';
                                        else
                                            option += '<option value=' + item.ID + ' ClientEmailNotContact="' + item.ClientEmailNotContact + '"' + ' Email="' + item.Email + '"' + ' PartnerTypeID = ' + item.PartnerTypeID + ' PartnerID = ' + item.PartnerID + ' PaymentTermID = ' + item.PaymentTermID + '>' + item.Code + ": " + item.Name + '</option>';
                                    else
                                        option += '<option value=' + item.ID + ' ClientEmailNotContact="' + item.ClientEmailNotContact + '"' + ' Email="' + item.Email + '"' + ' PartnerTypeID = ' + item.PartnerTypeID + ' PartnerID = ' + item.PartnerID + '     PaymentTermID = ' + item.PaymentTermID + '>' + item.Code + ": " + item.Name + '</option>';
                                });

                                $("#" + "slSupplier" + item2.maxDetail).append(option);


                                if ($('#slCustody').val() != "" && $('#slCustody').val() != "0") {

                                    var ID = 0;
                                    var CustodyID = 0;
                                    $('#tblPaymentRequestDetails > tbody > tr').each(function (i, tr) {
                                        ID = $(tr).attr('ID');
                                        CustodyID = $("#slSupplier" + item2.maxDetail + " option[partnerid='" + $('#slCustody').val() + "']").val();
                                        if (CustodyID != undefined && CustodyID != "undefined") {
                                            $("#slSupplier" + item2.maxDetail).val(CustodyID);
                                        }

                                    });
                                }
                            });

                        },
                        error: function (jqXHR, exception) {
                            swal("Sorry", "Please, press Ctrl+Shft+R, and if the problem persists contact your technical support! GetListWithName in mainapp.master.js", "");
                            FadePageCover(false);
                        }

                    });

                //GetChargeTypesToOperation(DetailID);
                let AlreadySelectedPayableIDList = [];
                $("#tblPaymentRequestDetails tbody tr:has(.Operation select option:selected[value='" + OperationID + "']):has(.Payable select option:selected[value!='0'])").each(function () {
                    if ($(this).find(".Payable select").val() != "")
                        AlreadySelectedPayableIDList.push($(this).find(".Payable select").val());
                });
                let AlreadySelectedPayableIDs = AlreadySelectedPayableIDList.join(',').toString();
                var pParametersWithValues = {
                    pOperationId: OperationID
                    , pFlagChargeType: true
                    , pCurrencyID: $('#slCurrency').val()
                    , pPaymentRequestID: ($("#hID").val() == '' ? 0 : $("#hID").val())
                    , pAlreadySelectedPayableIDs: AlreadySelectedPayableIDs == "" ? "" : AlreadySelectedPayableIDs
                };
                CallGETFunctionWithParameters("/api/PaymentRequest/GetChargeTypes", pParametersWithValues
                    , function (pData) {
                        var dd = pData[0];
                        maxDetailsIDInTableArr.forEach(function (item) {
                            FillListFromObject_Payable(item.payableID, 10, "<--Select-->", ("slPayable" + item.maxDetail), pData[0], null);
                            $("#slPayable" + item.maxDetail).css({ "width": "100%" }).select2();
                            $("#slPayable" + item.maxDetail).trigger("change");
                            FillListFromObject(null, 25, "<--Select-->", ("slChargeType" + item.maxDetail), pData[0], null);

                            GetAllSelectedChargeTypes('tblPaymentRequestDetails')
                        });
                        jQuery('#SelectOperationPayablesModal').modal('hide');
                        FadePageCover(false);
                    }
                    , null,false);
                
                $("#slCurrency").attr("disabled", "disabled");
                
            }
            else
                swal('', 'No Operations Found');
        }, null);
    
}

function GetOperationPayables() {
    debugger;
    if (pDefaults.UnEditableCompanyName == 'BED') {
        $("#CategoryRequest").removeClass("hide");
        $("#SupplierRequest").removeClass("hide");

    }
    ClearAllTableRows("tblOperationPayables");
    let OpID = $("#slOperationForOperationPayablesModal").val();
    if (OpID == null || OpID == "" || OpID == 0) {
        return;
    }
    CallGETFunctionWithParameters("/api/PaymentRequest/GetOperationPayables"
        , {
            pOperationID: $("#slOperationForOperationPayablesModal").val(),
            pCurrencyID: $("#slCurrency").val()
        }
        , function (pData) {
            debugger;
            var ReturnedMessage = pData[0];
            if (ReturnedMessage == "") {
                var OperationPayables = JSON.parse(pData[1]);
                $.each(OperationPayables, function (i, item) {
                    AppendRowtoTable("tblOperationPayables",
                        ("<tr ID='" + item.ID + "'>"
                            + "<td class='OperationPayableID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                            + "<td class='ChargeTypeName " + (pDefaults.UnEditableCompanyName == 'BED' ? "" : "hide") + "'>" + (item.ChargeTypeGroupName == 0 ? "" : item.ChargeTypeGroupName) + "</td>"
                            + "<td class='ChargeTypeName'>" + (item.ChargeTypeName == 0 ? "" : item.ChargeTypeName) + "</td>"
                            + "<td class='SupplierName " + (pDefaults.UnEditableCompanyName == 'BED' ? "" : "hide") + "'>" + (item.PartnerSupplierName == 0 ? "" : item.PartnerSupplierName) + "</td>"
                            + "<td class='Amount'>" + item.QuotationCost + " " + item.CurrencyCode + "</td>"
                            + "<td class='AmountOnly hide'>" + item.QuotationCost + "</td>"
                            + "</tr>"
                        ));
                });
                BindAllCheckboxonTable("tblOperationPayables", "OperationPayableID", "cb-CheckAll-Payables");
                CheckAllCheckbox("HeaderCheckAll-Payables");
            }
            else {
                swal("Sorry", ReturnedMessage);
            }
            FadePageCover(false);
        });
}

function DetailContainerChanged(DetailID) {
    debugger;
    if ($("#slOperation" + DetailID).val() == null) {
        return;
    }
    var HouseID = $("#slHouse" + DetailID).val();
    var PayableID = $("#slPayable" + DetailID).val();
    CallGETFunctionWithParameters("/api/PaymentRequest/GetContainerHousesAndPayables"
        , {
            pContainerID: $("#slTruckingOrder" + DetailID).val() == null || $("#slTruckingOrder" + DetailID).val() == undefined || $("#slTruckingOrder" + DetailID).val() == "" ? 0 : $("#slTruckingOrder" + DetailID).val()
            , pCurrencyID: $("#slCurrency").val()
            , pOperationID: $("#slOperation" + DetailID).val()
            , pPaymentRequestID: ($('#hID').val() != '' ? $('#hID').val() : 0)
        }
        , function (pData) {
            debugger;
            var Houses = pData[0];
            var Payables = pData[1];
            FillListFromObject(HouseID, 1, "<--Select-->", "slHouse" + DetailID, Houses, null);
            FillListFromObject_Payable(PayableID, 10, "<--Select-->", ("slPayable" + DetailID), Payables, null);
        },null,false
    );
}
function DetailHouseChanged(DetailID) {
    debugger;
    if ($("#slOperation" + DetailID).val() == null) {
        return;
    }
    var ContainerID = $("#slTruckingOrder" + DetailID).val();
    var PayableID = $("#slPayable" + DetailID).val();
    CallGETFunctionWithParameters("/api/PaymentRequest/GetHouseContainersAndPayables"
        , {
            pHouseID: $("#slHouse" + DetailID).val() == null || $("#slHouse" + DetailID).val() == undefined || $("#slHouse" + DetailID).val() == "" ? 0 : $("#slHouse" + DetailID).val()
            , pCurrencyID: $("#slCurrency").val()
            , pOperationID: $("#slOperation" + DetailID).val()
            , pPaymentRequestID: ($('#hID').val() != '' ? $('#hID').val() : 0)
        }
        , function (pData) {
            debugger;
            var
            Containers = pData[0];
            var Payables = pData[1];
            FillListFromObject(ContainerID, 11, "<--Select-->", "slTruckingOrder" + DetailID, Containers, null);
            FillListFromObject_Payable(PayableID, 10, "<--Select-->", ("slPayable" + DetailID), Payables, null);
        },null, false
    );
}

function RelatedOperation_OpenUploadedFile(pFileName, pOperationCreationDate, pOperationCode) {
    debugger;
    window.open( constDocsInFilesPath + GetDateWithFormatMDY(pOperationCreationDate).split('/')[2].toString() + "\\" + pOperationCode + "\\" + pFileName, '_blank');
}

function getRelatedFilesFromOperations() {
    let prID = $("#hID").val();
    CallGETFunctionWithParameters("/api/PaymentRequest/LoadDetails", { pHeaderID: prID, pIsCustodySettlement: 0 }, function (pData) {
        let details = JSON.parse(pData[0]);
        if (details.length > 0) {
            details.forEach(detail => {
                if (detail.OperationID == 0) {
                    return;
                } else {
                    CallGETFunctionWithParameters("/api/DocsIn/GetDocsInNames", { pOperationID: detail.OperationID }, function (pData2) {
                        debugger;
                        let fileNames = JSON.parse(pData2[0]);
                        let operation = JSON.parse(pData2[1])[0];
                        for (i = 0; i < fileNames.length; i++) {
                            AppendRowtoTable(glbGeneralUploadTableName,
                                ("<tr ID='" + i + "'>"
                                    + "<td class='classTdUploadedFilesID'> <input disabled='disabled' type='checkbox' value='" + fileNames[i] + "'></td>"
                                    + "<td class='DocsInSerial'>" + ($('#tblUploadedFiles_PaymentRequest tbody tr').length + 1) + " (From Operation)</td>"
                                    + "<td class='FileName'>" + fileNames[i] + "</td>"
                                    + "<td class=''><a onclick='RelatedOperation_OpenUploadedFile(" + '"' + fileNames[i] + '","' + operation.CreationDate + '","' + operation.Code + '"' + ");' " + " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-folder-open' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Open" + "</span>" + "</a>&nbsp;&nbsp;&nbsp;</td>"
                                    + "</tr>"));
                        }
                    });
                }
            });
        }
    });
}

function GenerateDebitNote_ForPaymentRequest() {

    if (GetAllSelectedIDsAsString('tblPaymentRequestDetails') != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be Generate DebitNote",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes!",
            closeOnConfirm: false
        },
            //callback function in case of confirm delete
            function () {


                var pDetailsIDList = GetAllIDsAsStringWithNameAttr("tblPaymentRequestDetails", "Delete");
                var pCouponList = "";
                if (pDetailsIDList != "" ) {
                    var NumberOfDetailsRows = pDetailsIDList.split(',').length;
                    //for (var i = 0; i < NumberOfDetailsRows; i++) {
                    //    var currentRowID = pDetailsIDList.split(",")[i];

                    //    //if ($("#txtCoupon" + currentRowID).val().trim() != "" && $("#txtCoupon" + currentRowID).val().trim() != "0")
                    //      pCouponList += ((pCouponList == "") ? "" : ",") + ($("#txtCoupon" + currentRowID).val().trim() == "" ? "0" : $("#txtCoupon" + currentRowID).val().replace(/,/g, "_").trim());

                    //}

                    $('#tblPaymentRequestDetails' + ' td').find('input[name="Delete"]:checked').each(function () {
                        pID = ($(this).attr('value'));
                        if (pID > 0) {
                            pCouponList += ((pCouponList == "") ? "" : ",") + ($("#txtCoupon" + pID).val().trim() == "" ? "0" : $("#txtCoupon" + pID).val().replace(/,/g, "_").trim());

                        }
                    });

                }

                var pParametersWithValues = {
                    pPaymentRequestID: $("#hID").val() == "" ? 0 : $("#hID").val(),
                    pPaymentRequestDetailIDs: GetAllSelectedIDsAsString('tblPaymentRequestDetails'),
                    pAmounts: pCouponList
                };
                CallGETFunctionWithParameters("/api/PaymentRequest/GenerateDebitNote_ForPaymentRequest"
                    , pParametersWithValues
                    , function (pData) {
                        var _ReturnedMessage = pData[0];
                        if (_ReturnedMessage == "") {
                            swal("Success", "Created successfully.");
                            FadePageCover(false);
                        }
                        else {

                            var word = "Transaction";
                            var index = _ReturnedMessage.indexOf(word);
                            if (index !== -1)
                                _ReturnedMessage = _ReturnedMessage.substring(0, index + word.length - 12);

                            swal("Sorry", _ReturnedMessage);
                            FadePageCover(false);
                        }
                    }
                    , null);
            });


}






function ChangeisRetrieved(pID) {
    debugger;

    if (glbCallingControl === 'CustodySettlement') {
        var tr = $("#tblPaymentRequestDetails tr[ID='" + pID + "']");
        var actualCost = tr.find("td.ActualCost input[type='text']").val();

        if ($.trim(actualCost) === '0') {
            $("#isRetrieved" + pID).val("true");
            $("#isRetrieved" + pID).text("true");

        } else {
            $("#isRetrieved" + pID).val("false");
            $("#isRetrieved" + pID).text("false");
        }
    }
}
