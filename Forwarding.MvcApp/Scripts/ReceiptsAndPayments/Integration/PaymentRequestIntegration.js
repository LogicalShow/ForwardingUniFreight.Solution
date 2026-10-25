var check = 0;
function PaymentRequestIntegration_Initialize(pIsCustodySettlement)
{
    _IsCustodySettlement = pIsCustodySettlement;
    // $("#hl-menu-ContainerTrackingGroup").parent().siblings().removeClass("active");
    strBindTableRowsFunctionName = "PaymentRequestIntegration_BindTableRows";
    strLoadWithPagingFunctionName = "/api/PaymentRequest/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = pLoggedUser.IsAccessAllCharges ? "WHERE 1=1" : " WHERE CreatorUserID_Request = " + $("#hLoggedUserID").val();
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/ReceiptsAndPayments/Integration/PaymentRequestIntegration", "div-content", function () {

            LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
                , function (pData) {

                    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
                    $("#slCurrency").html($("#hReadySlCurrencies").html());

                    FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slCustody", pData[2],
                    function () { $("#slFilterCustody").html($("#slCustody").html()) });
                    //FillListFromObject(null, 1, "<--Select-->", "slOperation", pData[3], null);


                   Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(pData[3], "ID", "Code,VesselName,ActualArrivalString", ' --> ', "<--Select-->", "#slOperation", null, "", function () { });
               
                    FillListFromObject(null, (pDefaults.IsRepeatChargeTypeName ? 4 : 2), "<--Select-->", "slChargeType", pData[4], null);
                    FillListFromObject(null, (pDefaults.IsRepeatChargeTypeName ? 4 : 2), "<--Select-->", "slChargeType", pData[4], null);


                    FillListFromObject_ERP(null, 2, "<--Select-->", "slHouse", pData[5], null);
                    // FillListFromObject_ERP(null, 2, "<--Select-->", "slCertificateNumber", pData[6], null);
                    FillListFromObject_ERP(null, 2, "<--Select-->", "slServiceCategory", pData[9], null);
                    FillListFromObject_ERP(null, 2, "<--Select-->", "slPaymentCombo", pData[10], null);

                    PaymentRequestIntegration_BindTableRows(JSON.parse(pData[0]));
                });
   

        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    },
        function () { PaymentRequestIntegration_ClearAllControls(); },
        function () { PaymentRequestIntegration_DeleteList(); });
}


function PaymentRequestIntegration_BindTableRows(pPaymentRequestIntegration) {
    check = 1;
    debugger;
    ClearAllTableRows("tblPaymentRequestIntegration");
    editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    var CopyControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i                     style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Copy" + "</span>";
    var UploadText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Upload") + "</span>";

    $.each(pPaymentRequestIntegration, function (i, item) {
        AppendRowtoTable("tblPaymentRequestIntegration",
        ("<tr ID='" + item.ID + "' ondblclick='PaymentRequestIntegration_FillAllControls(" + item.ID + ");'>"
            + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='Code'>" + item.Code + "</td>"
             + "<td class='Operations'>" + item.Operations + "</td>"
             + "<td class='CustodyName'>" + item.CustodyName + "</td>"
             + "<td class='IsCheck hide'>" + item.IsCheck + "</td>"
             + "<td class='CustodyID hide'>" + item.CustodyID + "</td>"                 
            + "<td class='RequestDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.RequestDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.RequestDate))) + "</td>"
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



            + "<td class='Attache hide'>" + (item.Attache == 0 ? "" : item.Attache) + "</td>"
            + "<td class='Payment hide'>" + (item.Payment == 0 ? "" : item.Payment) + "</td>"
            + "<td class='IssuedTo hide'>" + (item.IssuedTo == 0 ? "" : item.IssuedTo) + "</td>"


            + "<td class='IsApprovedRequest'> <input type='checkbox' id='cbIsApprovedRequest" + item.ID + "' disabled='disabled' " + (_IsCustodySettlement == 1 ? (item.IsApprovedSettlement ? " checked='checked' " : "") : (item.IsApprovedRequest ? " checked='checked' " : "")) + " /></td>"
              + "<td class='Status hide'>" + ('') + "</td>"
           + "<td class=''>"
            + "<a href='#' data-toggle='modal' onclick='PaymentRequestIntegration_Print(" + item.ID + ");' " + printControlsText + "</a></td>"
               + "<td class='" + ((_IsCustodySettlement == 1) ? '' : '') + "'>"
            //+ "<a href='#' data-toggle='modal' onclick='PaymentRequestIntegration_Copy(" + item.ID + ");' " + CopyControlsText + " </a></td>"
            + "<td class='Print'><a href='#tabUploadFiles' data-toggle='modal' onclick='UploadFiles(" + item.ID + ");' " + UploadText + "</a></td>"
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
    if (_IsCustodySettlement == 1) {
        $('#btn-NewAdd').addClass('hide');
        $('#btn-Delete').addClass('hide');
    }
    BindAllCheckboxonTable("tblPaymentRequestIntegration", "ID");
    CheckAllCheckbox("ID");
    //HighlightText("#tblPaymentRequestIntegration>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function PaymentRequestIntegration_LoadingWithPaging() {
    debugger;
    var pWhereClause = PaymentRequestIntegration_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) {
        PaymentRequestIntegration_BindTableRows(JSON.parse(pData[0]));
    });
    HighlightText("#tblPaymentRequestIntegration>tbody>tr", $("#txt-Search").val().trim());
}
function PaymentRequestIntegration_GetWhereClause() {
    debugger; 
    //var pWhereClause = " WHERE CreatorUserID_Request = " + $("#hLoggedUserID").val();
    var pWhereClause = pLoggedUser.IsAccessAllCharges ? "WHERE 1=1" : " WHERE CreatorUserID_Request = " + $("#hLoggedUserID").val();
    if ((_IsCustodySettlement == 1))
        pWhereClause = pLoggedUser.IsAccessAllCharges ? " WHERE IsApprovedRequest = 1 AND VoucherID is not null" : " WHERE CreatorUserID_Request = " + $("#hLoggedUserID").val() + " AND IsApprovedRequest = 1 AND VoucherID is not null";
    if ($("#txtFilterCodeSerial").val().trim() != "")
        pWhereClause += " AND (Code=N'" + $("#txtFilterCodeSerial").val().trim().toUpperCase() + "')" + "\n";
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
    return pWhereClause;
}
function PaymentRequestIntegration_ClearAllControls() {
    debugger;
    //pLoggedUserApprovedFromNotifyPaymentRequestIntegration = 0;
    PaymentRequestIntegration_EnableDisableEditing(1);
    $("#tblPaymentRequestIntegrationDetails tbody").html("");
    ClearAll("#PaymentRequestIntegrationModal");

    $("#slCurrency").val(pDefaults.CurrencyID);
    $("#txtRequestDate").val(getTodaysDateInddMMyyyyFormat());
    $("#txtExchangeRate").val(1);

    $(".classDisableForPosted").removeAttr("disabled");
    $(".classDisableForDetails").removeAttr("disabled");

    $("#btnSave").attr("onclick", "AlarmUsers_SavePaymentRequestIntegration(false);");
    $("#btnSaveAndAddNew").attr("onclick", "AlarmUsers_SavePaymentRequestIntegration(true);");
    $("#cb-CheckAll").prop('checked', false);

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
        glbGeneralUploadTableName = "tblUploadedFiles_PaymentRequestIntegration";
        //glbGeneralUploadFolderName = $("#hID").val() == "" ? "" : $("#txtName").val().trim();
        glbGeneralUploadFolderName = $("#hID").val() == "" ? "" : $("#hID").val();

        glbGeneralUploadPath = "/DocsInFiles//PaymentRequestIntegrationSettlement//";
        glbGeneralUploadRelativePath = "~/DocsInFiles/PaymentRequestIntegrationSettlement/";
        glbGeneralUploadBtnUploadName = "inputFileUpload_PaymentRequestIntegration";
        glbTblTHSelectAllTagName = "HeaderDeleteUploadedFiles_PaymentRequestIntegration";
        glbTblInputSelectAllInputName = "cb-CheckAll-UploadedFiles_PaymentRequestIntegration";

        if (glbGeneralUploadFolderName != "")
            GeneralUpload_FillControls();
    }
    else {
        glbGeneralUploadModalName = ""; //if the upload is in a modal then is not opened
        glbGeneralUploadTableName = "tblUploadedFiles_PaymentRequestIntegration";
        //glbGeneralUploadFolderName = $("#hID").val() == "" ? "" : $("#txtName").val().trim();
        glbGeneralUploadFolderName = $("#hID").val() == "" ? "" : $("#hID").val();

        glbGeneralUploadPath = "/DocsInFiles//PaymentRequestIntegration//";
        glbGeneralUploadRelativePath = "~/DocsInFiles/PaymentRequestIntegration/";
        glbGeneralUploadBtnUploadName = "inputFileUpload_PaymentRequestIntegration";
        glbTblTHSelectAllTagName = "HeaderDeleteUploadedFiles_PaymentRequestIntegration";
        glbTblInputSelectAllInputName = "cb-CheckAll-UploadedFiles_PaymentRequestIntegration";

        if (glbGeneralUploadFolderName != "")
            GeneralUpload_FillControls();
    }

}
function PaymentRequestIntegration_FillAllControls(pID) {
    debugger;
    $("#tblPaymentRequestIntegrationDetails tbody").html("");
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/PaymentRequestIntegration/LoadDetails", { pHeaderID: pID, pIsCustodySettlement: _IsCustodySettlement }
        , function (pData) {
            jQuery("#PaymentRequestIntegrationModal").modal("show");
            var pInvoiceDetails = JSON.parse(pData[0]);
            if (_IsCustodySettlement == 1) {
                PaymentRequestIntegration_ClearAllControls();
                CustodySettlementDetails_BindTableRows(pInvoiceDetails);
               
                
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


            var tr = $("#tblPaymentRequestIntegration tr[ID='" + pID + "']");

            $("#hID").val(pID);
            $("#lblShown").html(": " + tr.find("td.Code").text() == "" ? "0" : tr.find("td.Code").text());
            $("#txtCode").val(tr.find("td.Code").text() == "" ? "0" : tr.find("td.Code").text());
            $("#slCustody").val(tr.find("td.CustodyID").text() == "" ? "0" : tr.find("td.CustodyID").text());
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


            //

            CallGETFunctionWithParameters("/api/PaymentRequestIntegration/GetIssuedToBySupplier", { pPartnerID: tr.find("td.PartnerID").text() == "" ? "0" : tr.find("td.PartnerID").text()}
                , function (pData) {
                    FillListFromObject(JSON.parse(pData[0]), 2, TranslateString("SelectFromMenu"), "slIssuedToCmbo", pData[0], null);
                    $("#slIssuedToCmbo").val(tr.find("td.IssuedToCmbo").text() == "" ? "" : tr.find("td.IssuedToCmbo").text());

                    FadePageCover(false);
                }
                , null);
            //

            $("#txtIssuedTo").val(tr.find("td.IssuedTo").text() == "" ? "0" : tr.find("td.IssuedTo").text());



            if (pDefaults.UnEditableCompanyName == "NEW") {
                if (_IsCustodySettlement == 0) {
                    if ($("#cbIsAccept" + pID).text() == "false" && $("#hf_CanEdit").val() == "1") {
                        PaymentRequestIntegration_EnableDisableEditing(1);
                    }
                    else {
                        if (!$("#cbIsApprovedRequest" + pID).prop("checked") && $("#hf_CanEdit").val() == "1") {
                            PaymentRequestIntegration_EnableDisableEditing(1);
                        } else {
                            PaymentRequestIntegration_EnableDisableEditing(0);
                        }
                    }
                } else {
                    if (!$("#cbIsApprovedRequest" + pID).prop("checked") && $("#hf_CanEdit").val() == "1") {
                        PaymentRequestIntegration_EnableDisableEditing(1);
                    } else {
                        PaymentRequestIntegration_EnableDisableEditing(0);
                    }
                }
                
                        
            } else {
                if (!$("#cbIsApprovedRequest" + pID).prop("checked") && $("#hf_CanEdit").val() == "1")
                    PaymentRequestIntegration_EnableDisableEditing(1);
                else
                    PaymentRequestIntegration_EnableDisableEditing(0);
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
                PaymentRequestIntegrationDetails_BindTableRows(pInvoiceDetails);
            }
            else {
                $(".DisableWithCustody").attr("disabled", "disabled");
                $("#txtNotes").removeAttr("disabled");

                //$("#btnSave").removeAttr("disabled");
                //$("#btn-AddPaymentRequestIntegrationDetails").removeAttr("disabled");
                //$("#btn-DeletePaymentRequestIntegrationDetails").removeAttr("disabled");
            }

            FadePageCover(false);
        }
        , null);
}

function PaymentRequestIntegration_Save() {
    debugger;
    var pModalName = "CheckboxesListModal_SavePaymentRequestIntegration";
    var pCheckboxNameAttr = "cbAddedItemID_SavePaymentRequestIntegration";
    var pSelectedItemsIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);

if (pSelectedItemsIDs == "" && pLoggedUserApprovedFromNotifyPaymentRequestIntegration ==0)
        swal("Sorry", "You have to select at least one receptionist.");
    else {
        if (ValidateForm("form", "PaymentRequestIntegrationModal")) {
            FadePageCover(true);

            var pIDList = "";
            var pChargeTypeList = "";
            var pOperationList = "";
            var pHouseIDList = "";
            var pCertificateNumberIDList = "";
            var pTruckingOrderIDList = "";
            var pPartenerTypeIDList = "";
            var pPartenerIDList = "";


            var pSupplierList = "";
            var pEstmatedCostList = "";
            var pActualCostList = "";
            var pDescriptionList = "";
            var pCouponList = "";
            var pSupplierInvoiceNo = "";

            var pActualDescriptionList = "";
            var pFilterChargeTypesList = "";
            var pIsSettlementOnlyList = "";
            var pDetailsIDList = GetAllIDsAsStringWithNameAttr("tblPaymentRequestIntegrationDetails", "Delete");
            var pRowIDs = GetAllSelectedChargeTypes("tblPaymentRequestIntegrationDetails");
            var pDetailsID = '';
            debugger;
            $("#tblPaymentRequestIntegrationDetails tbody tr").each(function () {
                pDetailsID += ((pDetailsID == "") ? "" : ",") + ($(this).attr('ID'));
            });

            if (pDetailsIDList != "") {
                var NumberOfDetailsRows = pDetailsIDList.split(',').length;
                for (var i = 0; i < NumberOfDetailsRows; i++) {
                    var currentRowID = pDetailsID.split(",")[i];

                    pIDList += ((pIDList == "") ? "" : ",") + pDetailsIDList.split(",")[i];
                    pChargeTypeList += ((pChargeTypeList == "") ? "" : ",") + ($("#slChargeType" + currentRowID).val().trim() == "" ? "0" : $("#slChargeType" + currentRowID).val());

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

                    }

                    pCouponList += ((pCouponList == "") ? "" : ",") + ($("#txtCoupon" + currentRowID).val().trim() == "" ? "0" : $("#txtCoupon" + currentRowID).val().replace(/,/g, "_").trim());
                    pDescriptionList += ((pDescriptionList == "") ? "" : ",") + ($("#txtDescription" + currentRowID).val().trim() == "" ? "0" : $("#txtDescription" + currentRowID).val().replace(/,/g, "_").trim());
                    pFilterChargeTypesList += ((pFilterChargeTypesList == "") ? "" : ",") + ($("#cbFlagChargeType" + currentRowID).prop('checked') == "" ? "false" : $("#cbFlagChargeType" + currentRowID).prop('checked'));
                }
                var pParametersWithValues = {
                    pPaymentRequestIntegrationID: $("#hID").val() == "" ? 0 : $("#hID").val()
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
                    , pIsNotifyOrNot: (pLoggedUserApprovedFromNotifyPaymentRequestIntegration == 1 ? pLoggedUserApprovedFromNotifyPaymentRequestIntegration : "0")

                    , pChargeTypeGroupID: $("#slServiceCategory").val() == "0" ? 0 : $("#slServiceCategory").val()
                    , pAttache: $("#txtAttach").val().trim() == "" ? 0 : $("#txtAttach").val().trim()
                    , pPayment: $("#txtPayment").val().trim() == "" ? 0 : $("#txtPayment").val().trim()
                    , pIssuedTo: $("#txtIssuedTo").val().trim() == "" ? 0 : $("#txtIssuedTo").val().trim()
                    , pPaymentComboID: ($("#slPaymentCombo").val() == "0" || $("#slPaymentCombo").val()== null) ? 0 : $("#slPaymentCombo").val()
                    , pIssuedToCmbo: ($("#slIssuedToCmbo").val() == "0" || $("#slIssuedToCmbo").val() ==null) ? 0 : $("#slIssuedToCmbo").val()




                    

                };
                CallPOSTFunctionWithParameters("/api/PaymentRequestIntegration/Save", pParametersWithValues
                    , function (pData) {
                        var _ReturnedMessage = pData[0];
                        if (_ReturnedMessage == "") {
                           PaymentRequestIntegration_LoadingWithPaging();
                            jQuery("#PaymentRequestIntegrationModal").modal("hide");
                            swal("Success", "Saved successfully.");
                            //Approve_Notify();
                            FadePageCover(false);
                            jQuery('#CheckboxesListModal_SavePaymentRequestIntegration').modal('hide')
                            //PaymentRequestIntegration_LoadingWithPaging();
                            
                           
                            LoadDefaults("/api/Defaults/LoadAll", " WHERE 1=1 ");
                            pLoggedUserApprovedFromNotifyPaymentRequestIntegration = 0;
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
function PaymentRequestIntegration_Print(pID) {
    debugger;
    if (pID == 0)
        pID = $("#hID").val();
    if (pID == "") //this means new without saving
        swal("Sorry", "Please, Add at least one invoice item.");
    else {
        //if ($("#hDefaultUnEditableCompanyName").val() == "COS" || pDefaults.UnEditableCompanyName == "ILS" || pDefaults.UnEditableCompanyName == "ILSEG") {
        if ($("#hDefaultUnEditableCompanyName").val() != "NEW") {
            var arr_Keys = new Array();
            var arr_Values = new Array();
            arr_Keys.push("ID");
            arr_Values.push(pID);

            var pParametersWithValues =
            {
                arr_Keys: arr_Keys
                , arr_Values: arr_Values
                , pTitle: "Payment Reques"
                , pReportName: "Rep_A_PaymentRequestIntegration"
            };
            var win = window.open("", "_blank");
            var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '&pReportName=' + pParametersWithValues.pReportName + '';

            win.location = url;
        }
        else {
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/PaymentRequestIntegration/LoadHeaderWithDetails"
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

function PaymentRequestIntegration_Copy(pID) {
    debugger;
    $("#tblPaymentRequestIntegrationDetails tbody").html("");
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/PaymentRequestIntegration/LoadDetails", { pHeaderID: pID, pIsCustodySettlement: _IsCustodySettlement }
        , function (pData) {
            jQuery("#PaymentRequestIntegrationModal").modal("show");
            var pInvoiceDetails = JSON.parse(pData[0]);
            //if (_IsCustodySettlement == 1) {
            //    PaymentRequestIntegration_ClearAllControls();
            //    CustodySettlementDetails_BindTableRows(pInvoiceDetails);
            //}
            var d = new Date();
            var month = d.getMonth() + 1;
            var day = d.getDate();
            var output = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + d.getFullYear();
            $('#txtSettlementDate').val(output);


            var tr = $("#tblPaymentRequestIntegration tr[ID='" + pID + "']");

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
                PaymentRequestIntegration_EnableDisableEditing(1);
            else
                PaymentRequestIntegration_EnableDisableEditing(0);

            if (tr.find("td.IsCheck").text() == "true") {
                $('#cbIsCheck').prop("checked", true);
                $('#cbIsCash').prop("checked", false);
            }
            else {
                $('#cbIsCheck').prop("checked", false);
                $('#cbIsCash').prop("checked", true);
            }

            $("#btn-AddPaymentRequestIntegrationDetails").removeAttr("disabled");
            $("#btn-DeletePaymentRequestIntegrationDetails").removeAttr("disabled");
            $("#btnSave").removeAttr("disabled");

            if (_IsCustodySettlement == 0) {
                $(".DisableWithCustody").removeAttr("disabled");
                PaymentRequestIntegrationDetails_BindTableRows_ForCopy(pInvoiceDetails);
            }
            else {
                $(".DisableWithCustody").attr("disabled", "disabled");
                $("#btnSave").removeAttr("disabled");
                $("#btn-AddPaymentRequestIntegrationDetails").removeAttr("disabled");
                $("#btn-DeletePaymentRequestIntegrationDetails").removeAttr("disabled");
            }

            FadePageCover(false);
        }
        , null);
}

function PaymentRequestIntegration_DeleteList(callback) {
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblPaymentRequestIntegration') != "")
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


            CallGETFunctionWithParameters("/api/PaymentRequestIntegration/Delete"
                , { "pDeletedPaymentRequestIntegrationIDs": GetAllSelectedIDsAsString('tblPaymentRequestIntegration') }
                , function (pData) {
                    if (JSON.parse(pData[0])) {
                        PaymentRequestIntegration_LoadingWithPaging();
                    }
                    else {
                        showDeleteFailMessage = true
                        strDeleteFailMessage = pData[1];
                        PaymentRequestIntegration_LoadingWithPaging();
                    }
                });
        });
}
function _PaymentRequestIntegration_ApproveList(callback) {
    //Confirmation message to delete
    debugger;
    if (GetAllSelectedIDsAsString('tblPaymentRequestIntegration') != "")
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
            CallGETFunctionWithParameters("/api/PaymentRequestIntegration/Approve"
                , { "pDeletedPaymentRequestIntegrationIDs": GetAllSelectedIDsAsString('tblPaymentRequestIntegration') }
                , function (pData) {
                    if (pData == "") {
                        swal("Success", "approved successfully.");
                        PaymentRequestIntegration_LoadingWithPaging();
                    }
                    else {
                        showDeleteFailMessage = true
                        strDeleteFailMessage = pData;
                        PaymentRequestIntegration_LoadingWithPaging();
                    }

                });
        });
}
function PaymentRequestIntegration_EnableDisableEditing(pOption) { //pOption 1:Enable 2:Disable
    debugger;
    if (pOption == 1) {
        $("#btnSave").removeAttr("disabled");
        $("#btn-AddPaymentRequestIntegrationDetails").removeAttr("disabled");
        $("#btn-DeletePaymentRequestIntegrationDetails").removeAttr("disabled");
    }
    else {
        $("#btnSave").attr("disabled", "disabled");
        $("#btn-AddPaymentRequestIntegrationDetails").attr("disabled", "disabled");
        $("#btn-DeletePaymentRequestIntegrationDetails").attr("disabled", "disabled");
    }
}
var maxDetailsIDInTable = 0;
function Details_NewRow() {
    debugger;
    check = 0;
    ++maxDetailsIDInTable;
    // var copyControlsText = " class='btn btn-xs btn-rounded btn-info float-btn-AddPaymentRequestIntegrationDetails' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'></span>";
    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var dateValidTo = Date.prototype.addDays(ConvertDateFormat(FormattedTodaysDate), 30);
    var tr = "";
    if (_IsCustodySettlement == 1) {
        tr += "<tr ID='" + maxDetailsIDInTable + "' isdeleted='0' tag='item'   counter='" + (maxDetailsIDInTable) + "' value='" + 0 + "'>"
        tr += "     <td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + maxDetailsIDInTable + "' checked='checked' /></td>";
        tr += "     <td class='DetailsID' style='width:2%;'><input " + (1 == 2 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + 0 + "' /></td>";
        tr += "     <td class='Operation' disabled style='width:20%;' val=''><select id='slOperation" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slOperation' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetSuppliers_Charges(" + maxDetailsIDInTable + "); Details_HouseAndCertificateChangedByOperation(" + maxDetailsIDInTable + ");'  data-required='false'>" + "<option value=0></option>" + "</select></td>";
        tr += "     <td class='HouseNumber hide' disabled style='width:7%;' val=''><select id='slHouse" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slHouse' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetSuppliers_Charges(" + maxDetailsIDInTable + ");Details_ChangedByHouseAndCertificateAndTrucingOrder(" + maxDetailsIDInTable + ',' + 1 + ");'  data-required='false'>" + "<option value=0></option>" + "</select></td>";
       // tr += "     <td class='CertificateNumber' disabled style='width:7%;' val=''><select id='slCertificateNumber" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slCertificateNumber' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetSuppliers_Charges(" + maxDetailsIDInTable + ");Details_ChangedByHouseAndCertificateAndTrucingOrder(" + maxDetailsIDInTable + ',' + 2 + ");'  data-required='false'>" + "<option value=0></option>" + "</select></td>";
        tr += "     <td class='TruckingOrder hide' disabled style='width:7%;' val=''><select id='slTruckingOrder" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slTruckingOrder' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetSuppliers_Charges(" + maxDetailsIDInTable + ");Details_ChangedByHouseAndCertificateAndTrucingOrder(" + maxDetailsIDInTable + ',' + 3 + ");'  data-required='false'>" + "<option value=0></option>" + "</select></td>";



        tr += "     <td class='FlagChargeType' disabled style='width:5%;' val=''><input id='cbFlagChargeType" + maxDetailsIDInTable + "'  name='FlagChargeType'  onchange='GetChargeTypesToOperation(" + maxDetailsIDInTable + ");' type='checkbox' value='" + maxDetailsIDInTable + "' /></td>"
        tr += "     <td class='ChargeType' disabled style='width:15%;' val=''><select id='slChargeType" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slChargeType' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='GetInitialValue(" + maxDetailsIDInTable + ");' data-required='true'>" + "<option value=0></option>" + "</select></td>";
        tr += "     <td class='Supplier' disabled style='width:20%;' val=''><select id='slSupplier" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slSupplier' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + "<option value=0>Select Supplier</option>" + "</select></td>";
        tr += "     <td class='EstmatedCost'  style='width:9%;'><input type='text' style='width:100%;font-size:90%;'  id='txtEstmatedCost" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);PaymentRequestIntegrationDetails_CalculateAmount();' onchange='PaymentRequestIntegrationDetails_CalculateAmount();' data-required='true' value='0' /> </td>";

        tr += "     <td class='ActualCost' style='width:9%;'><input type='text'   style='width:100%;font-size:90%;'  id='txtActualCost" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);PaymentRequestIntegrationDetails_CalculateAmount();' onchange='PaymentRequestIntegrationDetails_CalculateAmount();' data-required='false' value='' /> </td>"

        //tr += "     <td class='PartenerType' disabled style='width:7%;' val=''><select id='slPartenerType" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slPartenerType' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='Details_FillSlPartenerByPartenerType(" + maxDetailsIDInTable + ");'  data-required='false'>" + "<option value=0></option>" + "</select></td>";
        //tr += "     <td class='Partener' style='width:10%;' val=''><select id='slPartener" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slPartener' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + "<option value=0>Select Supplier</option>" + "</select></td>";
        tr += "     <td class='Coupon hide' style='width:5%;'><input type='text' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtCoupon" + maxDetailsIDInTable + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + ($("#txtCoupon" + (maxDetailsIDInTable - 1)).val() == undefined ? "" : $("#txtCoupon" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";
        tr += "     <td class='SupplierInvoiceNo hide' style='width:5%;'><input type='text' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtSupplierInvoiceNo" + maxDetailsIDInTable + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + ($("#txtSupplierInvoiceNo" + (maxDetailsIDInTable - 1)).val() == undefined ? "" : $("#txtSupplierInvoiceNo" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";

        tr += "     <td class='Description hide' style='width:5%;'><input type='text' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtDescription" + maxDetailsIDInTable + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + ($("#txtDescription" + (maxDetailsIDInTable - 1)).val() == undefined ? "" : $("#txtDescription" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";
        tr += "     <td class='ActualDescription' style='width:10%;'><input type='text' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtActualDescription" + maxDetailsIDInTable + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + ($("#txtActualDescription" + (maxDetailsIDInTable - 1)).val() == undefined ? "" : $("#txtActualDescription" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";
        //tr += "      <td class='Documented' style='width:1%;'><input id='cbDocumented" + maxDetailsIDInTable + "' name='Documented'  class='cbIsDocumented' type='checkbox' value='' ></td>";
        tr += "     <td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate'  id='SelectedIDsToUpdate" + maxDetailsIDInTable + "' type='checkbox' value='" + maxDetailsIDInTable + "' /></td>";
        tr += "     <td class='hide'>"
          + "</td>";
        tr += "</tr>";
    }
    else {
        tr += "<tr ID='" + maxDetailsIDInTable + "' isdeleted='0' tag='item'   counter='" + (maxDetailsIDInTable) + "' value='" + 0 + "'>"
        tr += "     <td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + maxDetailsIDInTable + "' checked='checked' /></td>";
        tr += "     <td class='DetailsID' style='width:2%;'><input " + (1 == 2 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + 0 + "' /></td>";
        tr += "     <td class='ChargeType' style='width:15%;' val=''><select id='slChargeType" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slChargeType' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetInitialValue(" + maxDetailsIDInTable + ");'  data-required='false'>" + "<option value=0></option>" + "</select></td>";
        tr += "     <td class='Operation hide' style='width:20%;' val=''><select id='slOperation" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slOperation' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'   onchange='GetSuppliers_Charges(" + maxDetailsIDInTable + ");Details_HouseAndCertificateChangedByOperation(" + maxDetailsIDInTable + ");'  data-required='false'>" + "<option value=0></option>" + "</select></td>";


        tr += "     <td class='HouseNumber hide' style='width:7%;' val=''><select id='slHouse" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slHouse' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='Details_ChangedByHouseAndCertificateAndTrucingOrder(" + maxDetailsIDInTable + ',' + 1 + ");'  data-required='false'>" + "<option value=0></option>" + "</select></td>";
      //  tr += "     <td class='CertificateNumber' style='width:7%;' val=''><select id='slCertificateNumber" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slCertificateNumber' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetSuppliers_Charges(" + maxDetailsIDInTable + ");Details_ChangedByHouseAndCertificateAndTrucingOrder(" + maxDetailsIDInTable + ',' + 2 + ");'  data-required='false'>" + "<option value=0></option>" + "</select></td>";
        tr += "     <td class='TruckingOrder hide' style='width:7%;' val=''><select id='slTruckingOrder" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slTruckingOrder' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetSuppliers_Charges(" + maxDetailsIDInTable + ");Details_ChangedByHouseAndCertificateAndTrucingOrder(" + maxDetailsIDInTable + ',' + 3 + ");'  data-required='false'>" + "<option value=0></option>" + "</select></td>";

        tr += "     <td class='FlagChargeType' style='width:5%;' val=''><input id='cbFlagChargeType" + maxDetailsIDInTable + "'  name='FlagChargeType'  onchange='GetChargeTypesToOperation(" + maxDetailsIDInTable + ");' type='checkbox' value='" + maxDetailsIDInTable + "' /></td>"
        tr += "     <td class='Supplier hide' style='width:15%;' val=''><select id='slSupplier" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slSupplier' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='GetIssuedToBySupplier(" + maxDetailsIDInTable + "); ' data-required='false'>" + "<option value=0></option>" + "</select></td>";
        tr += "     <td class='EstmatedCost' style='width:9%;'><input type='text' style='width:100%;font-size:90%;'  id='txtEstmatedCost" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);PaymentRequestIntegrationDetails_CalculateAmount();' onchange='PaymentRequestIntegrationDetails_CalculateAmount();' data-required='false' value='0' /> </td>";
        tr += "     <td class='Currency' style='width:5%;' val=''><select id='slCurrency" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slCurrency' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange=' ' data-required='false'>" + "<option value=0></option>" + "</select></td>";

        tr += "     <td class='Coupon hide' style='width:5%;'><input type='text' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtCoupon" + maxDetailsIDInTable + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + ($("#txtCoupon" + (maxDetailsIDInTable - 1)).val() == undefined ? "" : $("#txtCoupon" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";
        tr += "     <td class='SupplierInvoiceNo hide' style='width:5%;'><input type='text' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtSupplierInvoiceNo" + maxDetailsIDInTable + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + ($("#txtSupplierInvoiceNo" + (maxDetailsIDInTable - 1)).val() == undefined ? "" : $("#txtSupplierInvoiceNo" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";

        tr += "     <td class='Description' style='width:15%;'><input type='text' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtDescription" + maxDetailsIDInTable + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + ($("#txtDescription" + (maxDetailsIDInTable - 1)).val() == undefined ? "" : $("#txtDescription" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";
        //tr += "      <td class='Documented' style='width:1%;'><input id='cbDocumented" + maxDetailsIDInTable + "' name='Documented'  class='cbIsDocumented' type='checkbox' value='' ></td>";
        tr += "     <td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate'  id='SelectedIDsToUpdate" + maxDetailsIDInTable + "' type='checkbox' value='" + maxDetailsIDInTable + "' /></td>";
        tr += "     <td class='hide'>"
          + "</td>";
        tr += "</tr>";
    }


    $("#tblPaymentRequestIntegrationDetails tbody").prepend(tr);
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $("#tblPaymentRequestIntegrationDetails tbody tr[ID=" + maxDetailsIDInTable + "]").reverseChildren();
    /***************************Filling row controls******************************/

    $("#slOperation" + maxDetailsIDInTable).html($("#slOperation").html());
    $("#slHouse" + maxDetailsIDInTable).html($("#slHouse").html());
    //$("#slCertificateNumber" + maxDetailsIDInTable).html($("#slCertificateNumber").html());
    $("#slTruckingOrder" + maxDetailsIDInTable).html($("#slTruckingOrder").html());
    $("#slPartenerType" + maxDetailsIDInTable).html($("#slPartenerType").html());
    $("#slPartener" + maxDetailsIDInTable).html($("#slPartener").html());





    $("#slChargeType" + maxDetailsIDInTable).html($("#slChargeType").html());
    $("#slSupplier" + maxDetailsIDInTable).html($("#slSupplier").html());

    BindAllCheckboxonTable("tblPaymentRequestIntegrationDetails", "DetailsID", "cb-CheckAll-PaymentRequestIntegrationDetails");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    /***********************EOF Filling row controls******************************/

    //Start Auto Filter
    // Start Auto Filter
    $("#slHouse" + maxDetailsIDInTable).css({ "width": "100%" }).select2();
    //$("#slCertificateNumber" + maxDetailsIDInTable).css({ "width": "100%" }).select2();
    $("#slTruckingOrder" + maxDetailsIDInTable).css({ "width": "100%" }).select2();


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

/*************************************Details*******************************************/
function PaymentRequestIntegrationDetails_BindTableRows(pInvoiceDetails) {
    debugger;
    check = 1;

    ClearAllTableRows("tblPaymentRequestIntegrationDetails");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pInvoiceDetails, function (i, item) {
        AppendRowtoTable("tblPaymentRequestIntegrationDetails",
        ("<tr ID='" + item.ID + "' " + ">"
            + "<td class='DetailsID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + item.ID + "' checked='checked' /></td>"
            + "<td class='Operation' style='width:20%;' val=''><select  tag='" + (item.OperationID == 0 ? "" : item.OperationID) + "' id='slOperation" + item.ID + "' style='width:100%;' class='controlStyle slOperation' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='GetSuppliers_Charges(" + item.ID + ");Details_HouseAndCertificateChangedByOperation(" + item.ID + ");GetSuppliers(" + item.ID + "," + item.SupplierID +")' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slOperation').html() + "</select></td>"
            + "<td class='HouseNumber hide' style='width:10%;' val=''><select  tag='" + (item.HouseID == 0 ? "" : item.HouseID) + "' id='slHouse" + item.ID + "' style='width:100%;' class='controlStyle slHouse' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slHouse').html() + "</select></td>"
          //  + "<td class='CertificateNumber' style='width:10%;' val=''><select  tag='" + (item.CertificateNumberID == 0 ? "" : item.CertificateNumberID) + "' id='slCertificateNumber" + item.ID + "' style='width:100%;' class='controlStyle slCertificateNumber' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slCertificateNumber').html() + "</select></td>"
            + "<td class='TruckingOrder hide' style='width:10%;' val=''><select  tag='" + (item.TruckingOrderID == 0 ? "" : item.TruckingOrderID) + "' id='slTruckingOrder" + item.ID + "' style='width:100%;' class='controlStyle slTruckingOrder' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slTruckingOrder').html() + "</select></td>"



            + "<td class='FlagChargeType' style='width:5%;' val=''><input id='cbFlagChargeType" + item.ID + "' " + (item.FilterChargeTypes ? "checked" : "") + "  name='FlagChargeType' onchange='GetChargeTypesToOperation(" + item.ID + ");' type='checkbox' value='" + item.FilterChargeTypes + "' /></td>"
            + "<td class='ChargeType' style='width:15%;' val=''><select tag='" + (item.ChargeTypeID == 0 ? "" : item.ChargeTypeID) + "' id='slChargeType" + item.ID + "' style='width:100%;' class='controlStyle slChargeType' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetInitialValue(" + item.ID + ");'  data-required='false'>" + $('#slChargeType').html() + "</select></td>"
            + "<td class='Supplier' style='width:15%;' val=''><select  tag='" + (item.SupplierID == 0 ? "" : item.SupplierID) + "' id='slSupplier" + item.ID + "' style='width:100%;' class='controlStyle slSupplier' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slSupplier').html() + "</select></td>"
            + "<td class='EstmatedCost' style='width:9%;'><input type='text' tag='" + (item.EstmatedCost) + "' style='width:100%;font-size:90%;'  id='txtEstmatedCost" + item.ID + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);PaymentRequestIntegrationDetails_CalculateAmount();' onchange='PaymentRequestIntegrationDetails_CalculateAmount();' data-required='true' value='" + item.EstmatedCost + "' /> </td>"
            + "<td class='Currency' style='width:15%;' val=''><select  tag='" + (0 == 0 ? "" : 0) + "' id='slCurrency" + item.ID + "' style='width:100%;' class='controlStyle slCurrency' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slCurrency').html() + "</select></td>"
            + "<td class='Coupon hide' style='width:5%;'><input type='text' tag='" + (item.Coupon) + "' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtCoupon" + item.ID + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='true' value='" + item.Coupon + "' /> </td>"
            + "<td class='SupplierInvoiceNo' style='width:5%;'><input type='text' tag='" + (item.SupplierInvoiceNo) + "' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtSupplierInvoiceNo" + item.ID + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='true' value='" + item.SupplierInvoiceNo + "' /> </td>"

            + "<td class='Description' style='width:5%;'><input type='text' tag='" + (item.Description) + "' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtDescription" + item.ID + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='true' value='" + item.Description + "' /> </td>"
        + "</tr>"));

        if (i == pInvoiceDetails.length - 1) {
            debugger;
            FillHTMLtblInputs("#tblPaymentRequestIntegrationDetails > tbody");
        }
    }

    );
    if ($("#hf_CanDelete").val() == 1) {
        $("#btn-Approve").removeClass("hide");
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
    ////ApplyPermissions();
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    BindAllCheckboxonTable("tblPaymentRequestIntegrationDetails", "ID", "cb-CheckAll-PaymentRequestIntegrationDetails");
    CheckAllCheckbox("HeaderDeletePaymentRequestIntegrationDetailsID");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
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

function PaymentRequestIntegrationDetails_BindTableRows_ForCopy(pInvoiceDetails) {
    ClearAllTableRows("tblPaymentRequestIntegrationDetails");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pInvoiceDetails, function (i, item) {
        AppendRowtoTable("tblPaymentRequestIntegrationDetails",
        ("<tr ID='" + i + "' " + ">"
            + "<td class='DetailsID'> <input name='Delete' type='checkbox' value='0' /></td>"
            + "<td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + i + "' checked='checked' /></td>"
            + "<td class='Operation' style='width:20%;' val=''><select  tag='" + (item.OperationID == 0 ? "" : item.OperationID) + "' id='slOperation" + i + "' style='width:100%;' class='controlStyle slOperation' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='GetSuppliers_Charges(" + i + ");Details_HouseAndCertificateChangedByOperation(" + i + ");' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='true'>" + $('#slOperation').html() + "</select></td>"
            + "<td class='HouseNumber' style='width:10%;' val=''><select  tag='" + (item.HouseID == 0 ? "" : item.HouseID) + "' id='slHouse" + i + "' style='width:100%;' class='controlStyle slHouse' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='GetSuppliers_Charges(" + i + ");' onkeypress='DisableBackspaceKey(id);' onchange='Details_ChangedByHouseAndCertificateAndTrucingOrder(" + maxDetailsIDInTable + ',' + 1 + "); ' data-required='true'>" + $('#slHouse').html() + "</select></td>"
           // + "<td class='CertificateNumber' style='width:10%;' val=''><select  tag='" + (item.CertificateNumberID == 0 ? "" : item.CertificateNumberID) + "' id='slCertificateNumber" + item.ID + "' style='width:100%;' class='controlStyle slCertificateNumber' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='GetSuppliers_Charges(" + item.ID + ");' onkeypress='DisableBackspaceKey(id);' onchange='Details_ChangedByHouseAndCertificateAndTrucingOrder(" + maxDetailsIDInTable + ',' + 2 + "); ' data-required='true'>" + $('#slCertificateNumber').html() + "</select></td>"
            + "<td class='TruckingOrder' style='width:10%;' val=''><select  tag='" + (item.TruckingOrderID == 0 ? "" : item.TruckingOrderID) + "' id='slTruckingOrder" + item.ID + "' style='width:100%;' class='controlStyle slTruckingOrder' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='GetSuppliers_Charges(" + item.ID + ");' onkeypress='DisableBackspaceKey(id);' onchange='Details_ChangedByHouseAndCertificateAndTrucingOrder(" + maxDetailsIDInTable + ',' + 3 + "); ' data-required='true'>" + $('#slTruckingOrder').html() + "</select></td>"

            + "<td class='FlagChargeType' style='width:5%;' val=''><input id='cbFlagChargeType" + i + "' " + (item.FilterChargeTypes ? "checked" : "") + "  name='FlagChargeType' onchange='GetChargeTypesToOperation(" + i + ");' type='checkbox' value='" + item.FilterChargeTypes + "' /></td>"
            + "<td class='ChargeType' style='width:15%;' val=''><select tag='" + (item.ChargeTypeID == 0 ? "" : item.ChargeTypeID) + "' id='slChargeType" + i + "' style='width:100%;' class='controlStyle slChargeType' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetInitialValue(" + i + ");'  data-required='false'>" + $('#slChargeType').html() + "</select></td>"
            + "<td class='Supplier' style='width:15%;' val=''><select  tag='" + (item.SupplierID == 0 ? "" : item.SupplierID) + "' id='slSupplier" + i + "' style='width:100%;' class='controlStyle slSupplier' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slSupplier').html() + "</select></td>"
            + "<td class='EstmatedCost' style='width:9%;'><input type='text' tag='" + (item.EstmatedCost) + "' style='width:100%;font-size:90%;'  id='txtEstmatedCost" + i + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);PaymentRequestIntegrationDetails_CalculateAmount();' onchange='PaymentRequestIntegrationDetails_CalculateAmount();' data-required='true' value='" + item.EstmatedCost + "' /> </td>"
            + "<td class='Description' style='width:5%;'><input type='text' tag='" + (item.Description) + "' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtDescription" + i + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='true' value='" + item.Description + "' /> </td>"
        + "</tr>"));

        if (i == pInvoiceDetails.length - 1) {
            debugger;
            FillHTMLtblInputs("#tblPaymentRequestIntegrationDetails > tbody");
        }
    }

    );
    ////ApplyPermissions();
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    BindAllCheckboxonTable("tblPaymentRequestIntegrationDetails", "ID", "cb-CheckAll-PaymentRequestIntegrationDetails");
    CheckAllCheckbox("HeaderDeletePaymentRequestIntegrationDetailsID");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}

function CustodySettlementDetails_BindTableRows(pInvoiceDetails) {

    debugger;
   
    $('#tblPaymentRequestIntegrationDetails').html("")
    

    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        var CT_TH = '<thead><tr class="swapChildrenClass"><th id="HeaderDeletePaymentRequestIntegrationDetailsID" style="width:5%;"><input id="cb-CheckAll-PaymentRequestIntegrationDetails" type="checkbox"></th>' +
      '<th>رقم العملية</th><th class="classShowForDepartementHouse hide"> البوليصة</th> <th class="classShowForDepartementTrOr hide"> امر النقل</th><th> اختيار بنود العملية</th><th>البند</th><th>المورد</th><th>التكلفة المتوقعة</th><th>التكلفة الفعلية</th><th class="classShowForDepartementPartenerType hide">نوع الشريك </th><th class="classShowForDepartementPartener hide">الشريك</th> <th class="classShowForDepartementCopon hide">القسيمة</th>' +
      '<th>الملاحظات</th><th class="rounded-right hide"></th></tr></thead> <tbody></tbody>';

    } else {
        var CT_TH = '<thead><tr class="swapChildrenClass"><th id="HeaderDeletePaymentRequestIntegrationDetailsID" style="width:5%;"><input id="cb-CheckAll-PaymentRequestIntegrationDetails" type="checkbox"></th>' +
      '<th>Operation Number</th><th class="classShowForDepartementHouse hide"> House Number</th> <th class="classShowForDepartementTrOr hide">Trucking Order</th><th>Choose process items</th><th>ChargeType</th><th>Supplier</th><th> Estimated Cost</th><th> Actual Cost</th><th class="classShowForDepartementPartenerType hide">PartenerType</th><th class="classShowForDepartementPartener hide">Partener</th> <th class="classShowForDepartementCopon hide">Copon</th>' +
      '<th>Description</th><th class="rounded-right hide"></th></tr></thead> <tbody></tbody>';

    }
    $('#tblPaymentRequestIntegrationDetails').html(CT_TH);
    
    ClearAllTableRows("tblPaymentRequestIntegrationDetails");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pInvoiceDetails, function (i, item) {
        AppendRowtoTable("tblPaymentRequestIntegrationDetails",
        ("<tr ID='" + item.ID + "' " + ">"
            + "<td class='DetailsID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + item.ID + "' checked='checked' /></td>"
            + "<td class='Operation' style='width:20%;' val=''><select disabled  tag='" + (item.OperationID) + "' id='slOperation" + item.ID + "' style='width:100%;' class='controlStyle slOperation' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'   onchange='GetSuppliers_Charges(" + item.ID + ");Details_HouseAndCertificateChangedByOperation(" + item.ID + ");'  data-required='false'>" + $('#slOperation').html() + "</select></td>"
            + "<td class='HouseNumber hide' style='width:10%;' val=''><select disabled  tag='" + (item.HouseID) + "' id='slHouse" + item.ID + "' style='width:100%;' class='controlStyle slHouse' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'   onchange='GetSuppliers_Charges(" + item.ID + ");'  data-required='false'>" + $('#slHouse').html() + "</select></td>"
           // + "<td class='CertificateNumber' style='width:10%;' val=''><select disabled  tag='" + (item.CertificateNumberID) + "' id='slCertificateNumber" + item.ID + "' style='width:100%;' class='controlStyle slCertificateNumber' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'   onchange='GetSuppliers_Charges(" + item.ID + ");'  data-required='false'>" + $('#slCertificateNumber').html() + "</select></td>"
            + "<td class='TruckingOrder hide' style='width:10%;' val=''><select disabled tag='" + (item.TruckingOrderID == 0 ? "" : item.TruckingOrderID) + "' id='slTruckingOrder" + item.ID + "' style='width:100%;' class='controlStyle slTruckingOrder' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='GetSuppliers_Charges(" + item.ID + ");' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slTruckingOrder').html() + "</select></td>"

            + "<td class='FlagChargeType' style='width:5%;' val=''><input disabled id='cbFlagChargeType" + item.ID + "' " + (item.FilterChargeTypes ? "checked" : "") + "  name='FlagChargeType' onchange='GetChargeTypesToOperation(" + item.ID + ");' type='checkbox' value='" + item.FilterChargeTypes + "' /></td>"
            + "<td class='ChargeType' style='width:10%;' val=''><select disabled tag='" + (item.ChargeTypeID == 0 ? "" : item.ChargeTypeID) + "' id='slChargeType" + item.ID + "' style='width:100%;' class='controlStyle slChargeType' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetInitialValue(" + item.ID + ");'  data-required='false'>" + $('#slChargeType').html() + "</select></td>"
            + "<td class='Supplier' style='width:10%;' val=''><select disabled  tag='" + (item.SupplierID == 0 ? "" : item.SupplierID) + "' id='slSupplier" + item.ID + "' style='width:100%;' class='controlStyle slSupplier' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slSupplier').html() + "</select></td>"
            + "<td class='EstmatedCost' style='width:9%;'><input type='text' tag='" + (item.EstmatedCost) + "' style='width:100%;font-size:90%;'  id='txtEstmatedCost" + item.ID + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);PaymentRequestIntegrationDetails_CalculateAmount();' onchange='PaymentRequestIntegrationDetails_CalculateAmount();' data-required='true' value='" + item.EstmatedCost + "' /> </td>"
            + "<td class='ActualCost' style='width:9%;'><input type='text' tag='" + (item.ActualCost == 0 ? "" : item.ActualCost) + "' style='width:100%;font-size:90%;'  id='txtActualCost" + item.ID + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);PaymentRequestIntegrationDetails_CalculateAmount();' onchange='PaymentRequestIntegrationDetails_CalculateAmount();' data-required='false' value='" + (item.ActualCost == 0 ? "" : item.ActualCost) + "' /> </td>"
            + "<td class='PartenerType hide' style='width:10%;' val=''><select  tag='" + (item.PartenerTypeID == 0 ? "" : item.PartenerTypeID) + "' id='slPartenerType" + item.ID + "' style='width:100%;' class='controlStyle slPartenerType' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='Details_FillSlPartenerByPartenerType(" + item.ID + ");' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slPartenerType').html() + "</select></td>"
            + "<td class='Partener hide' style='width:10%;' val=''><select  tag='" + (item.PartenerID == 0 ? "" : item.PartenerID) + "' id='slPartener" + item.ID + "' style='width:100%;' class='controlStyle slPartener' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slPartener').html() + "</select></td>"
            + "<td class='Coupon hide' style='width:5%;'><input type='text' tag='" + (item.Coupon) + "' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtCoupon" + item.ID + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='true' value='" + item.Coupon + "' /> </td>"
            + "<td class='SupplierInvoiceNo hide' style='width:5%;'><input type='text' tag='" + (item.SupplierInvoiceNo) + "' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtSupplierInvoiceNo" + item.ID + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='true' value='" + item.SupplierInvoiceNo + "' /> </td>" //line added by sherif for NewTrans
            + "<td class='Description hide' style='width:5%;'><input type='text' tag='" + (item.Description) + "' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtDescription" + item.ID + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='true' value='" + item.Description + "' /> </td>"
            + "<td class='ActualDescription' style='width:10%;'><input type='text' tag='" + (item.ActualDescription) + "' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtActualDescription" + item.ID + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='true' value='" + item.ActualDescription + "' /> </td>"
            + "<td class='IsSettlementOnly hide' style='width:10%;'><input type='text' tag='" + (item.IsSettlementOnly) + "' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtIsSettlementOnly" + item.ID + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + item.IsSettlementOnly + "' /> </td>"

        + "</tr>"));

        if (i == pInvoiceDetails.length - 1) {
            debugger;
            FillHTMLtblInputs("#tblPaymentRequestIntegrationDetails > tbody");
        }
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }

    );
    if (pLoggedUser.IsAccessAllCharges == true) {
        $(".HouseNumber").removeClass("hide");
        $(".TruckingOrder").removeClass("hide");
        $(".Coupon").removeClass("hide");

        $(".classShowForDepartementHouse").removeClass("hide");
        $(".classShowForDepartementTrOr").removeClass("hide");
        $(".classShowForDepartementCopon").removeClass("hide");



    }
    else {
        if (pLoggedUser.DepartmentName == "TRANSPORTATION" || pLoggedUser.DepartmentName == "سائقى النقل" || pLoggedUser.DepartmentName == "مناديب النقل" ) {
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
    ////ApplyPermissions();
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    BindAllCheckboxonTable("tblPaymentRequestIntegrationDetails", "ID", "cb-CheckAll-PaymentRequestIntegrationDetails");
    CheckAllCheckbox("HeaderDeletePaymentRequestIntegrationDetailsID");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}

function PaymentRequestIntegrationDetails_DeleteList() {
    debugger;
    var pDeletedPaymentRequestIntegrationDetailsIDs = '';
    var pDeletedIDs = GetAllSelectedIDsAsString('tblPaymentRequestIntegrationDetails');
    $("#tblPaymentRequestIntegrationDetails tbody tr").each(function () {
        if ($(this).find('input[name="' + "Delete" + '"]:checked').length > 0)
            pDeletedPaymentRequestIntegrationDetailsIDs += ((pDeletedPaymentRequestIntegrationDetailsIDs == "") ? "" : ",") + ($(this).attr('ID'));
    });
    // var pDeletedPaymentRequestIntegrationDetailsIDs = GetAllSelectedIDsAsStringWithTableNameAndNameAttr("tblPaymentRequestIntegrationDetails", "Delete");
    if (pDeletedPaymentRequestIntegrationDetailsIDs != "")
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
            //if (ValidateForm("form", "PaymentRequestIntegrationModal")) {
            FadePageCover(true);
            var pParametersWithValues = {
                pDeletedPaymentRequestIntegrationDetailsIDs: pDeletedIDs
                //Header
                , pPaymentRequestIntegrationID: $("#hID").val() == "" ? 0 : $("#hID").val()
            };
            CallGETFunctionWithParameters("/api/PaymentRequestIntegration/Details_Delete", pParametersWithValues
                , function (pData) {
                    if (pData[0]) {
                        PaymentRequestIntegration_LoadingWithPaging();
                        for (var i = 0; i < pDeletedPaymentRequestIntegrationDetailsIDs.split(",").length; i++) {
                            $("#tblPaymentRequestIntegrationDetails tbody tr[Counter=" + pDeletedPaymentRequestIntegrationDetailsIDs.split(",")[i] + "]").remove();
                            $("#tblPaymentRequestIntegrationDetails tbody tr[ID=" + pDeletedPaymentRequestIntegrationDetailsIDs.split(",")[i] + "]").remove();
                        }
                        PaymentRequestIntegrationDetails_CalculateAmount();
                    }
                    else
                        swal("Sorry", "Connection failed, please try again.");
                    FadePageCover(false);
                }
                , null);
            //}
        });//of swal
}
function PaymentRequestIntegrationDetails_CalculateAmount() {
    debugger;
    var pSum = 0;
    if (_IsCustodySettlement == 0) {
        $("#tblPaymentRequestIntegrationDetails>tbody>tr").each(function (i, tr) {
            if ($(tr).find('td.EstmatedCost input[type="text"]').val() != 'undefined'
                && $(tr).find('td.EstmatedCost input[type="text"]').val() != undefined
                && $(tr).find('td.EstmatedCost input[type="text"]').val() != '') {
                var Value = $(tr).find('td.EstmatedCost input[type="text"]').val();
                pSum += parseFloat(Value);

            }
        });
        $("#txtAmount").val(pSum.toFixed(2));
    }
    else {
        $("#tblPaymentRequestIntegrationDetails>tbody>tr").each(function (i, tr) {
            if ($(tr).find('td.ActualCost input[type="text"]').val() != 'undefined'
                && $(tr).find('td.ActualCost input[type="text"]').val() != undefined
                && $(tr).find('td.ActualCost input[type="text"]').val() != '') {
                var Value = $(tr).find('td.ActualCost input[type="text"]').val();
                pSum += parseFloat(Value);

            }
        });
        $("#txtTotalActualCost").val(pSum.toFixed(2));
        $("#txtSettlementAmount").val(parseFloat($("#txtTotalActualCost").val()) - parseFloat($("#txtAmount").val()));
    }


}
function LoadAllChargeType() {
    debugger;
    // var copyControlsText = " class='btn btn-xs btn-rounded btn-info float-btn-AddPaymentRequestIntegrationDetails' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'></span>";
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
            tr += "     <td class='HouseNumber' style='width:7%;' val=''><select id='slHouse" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slHouse' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetSuppliers_Charges(" + maxDetailsIDInTable + ");'  data-required='true'>" + "<option value=0></option>" + "</select></td>";
          //  tr += "     <td class='CertificateNumber' style='width:7%;' val=''><select id='slCertificateNumber" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slCertificateNumber' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetSuppliers_Charges(" + maxDetailsIDInTable + ");'  data-required='true'>" + "<option value=0></option>" + "</select></td>";
            tr += "     <td class='TruckingOrder' style='width:7%;' val=''><select id='slTruckingOrder" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slTruckingOrder' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetSuppliers_Charges(" + maxDetailsIDInTable + ");'  data-required='true'>" + "<option value=0></option>" + "</select></td>";



            tr += "     <td class='FlagChargeType' style='width:5%;' val=''><input id='cbFlagChargeType" + maxDetailsIDInTable + "' name='FlagChargeType' onchange='GetChargeTypesToOperation(" + maxDetailsIDInTable + ");'  type='checkbox' value='" + maxDetailsIDInTable + "' /></td>"
            tr += "     <td class='ChargeType' style='width:15%;' val=''><select tag='" + (this.value) + "' id='slChargeType" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slChargeType' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetInitialValue(" + maxDetailsIDInTable + ");'  data-required='true'>" + "<option value=0></option>" + "</select></td>";
            tr += "     <td class='Supplier' style='width:15%;' val=''><select id='slSupplier" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slSupplier' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + "<option value=0></option>" + "</select></td>";
            tr += "     <td class='EstmatedCost' style='width:9%;'><input type='text' style='width:100%;font-size:90%;'  id='txtEstmatedCost" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);PaymentRequestIntegrationDetails_CalculateAmount();' onchange='PaymentRequestIntegrationDetails_CalculateAmount();' data-required='true' value='' /> </td>";
            tr += "     <td class='Coupon' style='width:5%;'><input type='text' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtCoupon" + maxDetailsIDInTable + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + ($("#txtCoupon" + (maxDetailsIDInTable - 1)).val() == undefined ? "" : $("#txtCoupon" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";
            tr += "     <td class='Description' style='width:5%;'><input type='text' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtDescription" + maxDetailsIDInTable + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + ($("#txtDescription" + (maxDetailsIDInTable - 1)).val() == undefined ? "" : $("#txtDescription" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";
            //tr += "      <td class='Documented' style='width:1%;'><input id='cbDocumented" + maxDetailsIDInTable + "' name='Documented'  class='cbIsDocumented' type='checkbox' value='' ></td>";
            tr += "     <td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate'  id='SelectedIDsToUpdate" + maxDetailsIDInTable + "' type='checkbox' value='" + maxDetailsIDInTable + "' /></td>";
            tr += "     <td class='hide'>"
              + "</td>";
            tr += "</tr>";

            $("#tblPaymentRequestIntegrationDetails tbody").prepend(tr);
            if ($("[id$='hf_ChangeLanguage']").val() == "ar")
                $("#tblPaymentRequestIntegrationDetails tbody tr[ID=" + maxDetailsIDInTable + "]").reverseChildren();
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
    BindAllCheckboxonTable("tblPaymentRequestIntegrationDetails", "DetailsID", "cb-CheckAll-PaymentRequestIntegrationDetails");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    CheckAllCheckbox("HeaderDeletePaymentRequestIntegrationDetailsID");
}

function GetChargeTypesToOperation(ID) {
    debugger;
    if ($('#cbFlagChargeType' + ID).prop('checked') && $('#slOperation' + ID).val() != "0") {
        var OperationId = $('#slOperation' + ID).val();
        var pParametersWithValues = {
            pOperationId: $('#slOperation' + ID).val()
           , pFlagChargeType: $('#cbFlagChargeType' + ID).prop('checked')
        };
        CallGETFunctionWithParameters("/api/PaymentRequestIntegration/GetChargeTypes", pParametersWithValues
            , function (pData) {
                var dd = pData[0];
                FillListFromObject(null, 10, "<--Select-->", ("slChargeType" + ID), pData[0], null);
                GetAllSelectedChargeTypes('tblPaymentRequestIntegrationDetails')

                //$('#tblPaymentRequestIntegrationDetails td').find('input[name="Delete"]:not(:checked)').each(function () {
                //    $(this).closest('tr').remove();
                //});


                FadePageCover(false);
            }
            , null);
    }
    else {
        $('#slChargeType' + ID).html($('#slChargeType').html());
    }



}
function GetSuppliers(ID,SupplierID) {
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
                //    $('#tblPaymentRequestIntegrationDetails > tbody > tr').each(function (i, tr) {
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

function GetSuppliers_Charges(ID) {
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
              //  $('#slSupplier' + ID).val($('#slSupplier' + ID).attr('tag'));


                if ($('#slCustody').val() != "" && $('#slCustody').val() != "0") {

                    var ID = 0;
                    var CustodyID = 0;
                    $('#tblPaymentRequestIntegrationDetails > tbody > tr').each(function (i, tr) {
                        ID = $(tr).attr('ID');
                        CustodyID = $("#slSupplier" + ID + " option[partnerid='" + $('#slCustody').val() + "']").val();
                        if (CustodyID != undefined && CustodyID!="undefined") {
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
    if ($('#cbFlagChargeType' + ID).prop('checked') && parseInt($('#slOperation' + ID + '').val()) > 0 && $('#slChargeType' + ID).val() !="") {
        var ChargeTypeId = $('#slChargeType' + ID).val();
        var pParametersWithValues = {
            pOperationId: $('#slOperation' + ID).val()
            , pChargeTypeId: $('#slChargeType' + ID).val()
            //, pFlagChargeType: $('#cbFlagChargeType' + ID).prop('checked')
        };
        CallGETFunctionWithParameters("/api/PaymentRequestIntegration/GetInitialValue", pParametersWithValues
            , function (pData) {
                debugger;
                var PayablesList = JSON.parse(pData[0]);
                if (PayablesList.length > 0)
                {
                    if (pDefaults.UnEditableCompanyName == "COS" || pDefaults.UnEditableCompanyName == "ILS" || pDefaults.UnEditableCompanyName == "ILSEG" || $("#hDefaultUnEditableCompanyName").val() == "ELI") {
                        if (check == 0) {
                            $('#txtEstmatedCost' + ID).val(PayablesList[0].AmountWithoutVAT);
                            $("#slSupplier" + ID).val(PayablesList[0].SupplierOperationPartnerID == 0 ? "" : PayablesList[0].SupplierOperationPartnerID);

                        }
                        if (check==0) {
                            GetIssuedToBySupplier(ID);
                        }
                        FadePageCover(false);
                    }
                    else {
                        if ($('#txtEstmatedCost' + ID).val() > 0)
                        { }
                        else
                        {
                            $('#txtEstmatedCost' + ID).val(PayablesList[0].InitialSalePrice);
                            $('#txtSupplierInvoiceNo' + ID).val(PayablesList[0].SupplierInvoiceNo);

                        
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
    jQuery("#CheckboxesListModal").modal("show");
    var pStrFnName = "/api/Users/LoadAll";
    var pDivName = "divCheckboxesList";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pWhereClause = " WHERE IsInactive=0 ";
    pWhereClause += " ORDER BY Name ";

    debugger;
    FadePageCover(true);
    GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
        , function () {
            FadePageCover(false);
        });
}
function AlarmUsers_PaymentRequestIntegration() {
    debugger;
    //FadePageCover(true);
    var pModalName = "CheckboxesListModal";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pSelectedItemsIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
    if (pSelectedItemsIDs == "")
        swal("Sorry", "You have to select at least one receptionist.");
    else {
        debugger;
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/PaymentRequestIntegration/Approve"
            , { "pDeletedPaymentRequestIntegrationIDs": GetAllSelectedIDsAsString('tblPaymentRequestIntegration'), "PReceiverUsers": pSelectedItemsIDs, "pIsCustodySettlement": _IsCustodySettlement }
            , function (pData) {
                if (pData == "") {
                    swal("Success", "approved successfully.");
                    FadePageCover(false);
                    jQuery('#CheckboxesListModal').modal('hide')
                    PaymentRequestIntegration_LoadingWithPaging();
                    LoadDefaults("/api/Defaults/LoadAll", " WHERE 1=1 ");
                }
                else {
                    FadePageCover(false);
                    jQuery('#CheckboxesListModal').modal('hide')
                    showDeleteFailMessage = true;
                    strDeleteFailMessage = pData;
                    PaymentRequestIntegration_LoadingWithPaging();
                }

            });
    }

}
function AlarmUsers_SavePaymentRequestIntegration() {
    debugger;
    if (pLoggedUserApprovedFromNotifyPaymentRequestIntegration == 1 && pDefaults.UnEditableCompanyName == "NEW" && _IsCustodySettlement != 1) {
        PaymentRequestIntegration_Save();
    }
    else
    {
        debugger;
        //FadePageCover(true);
        $("#lblShownItems_SavePaymentRequestIntegration").html(" Receptionists");
        $("#divCheckboxesList_SavePaymentRequestIntegration").html("");
        jQuery("#CheckboxesListModal_SavePaymentRequestIntegration").modal("show");
        var pStrFnName = "/api/Users/LoadAll";
        var pDivName = "divCheckboxesList_SavePaymentRequestIntegration";
        var pCheckboxNameAttr = "cbAddedItemID_SavePaymentRequestIntegration";
        var pWhereClause = " WHERE IsInactive=0 ";
        pWhereClause += " ORDER BY Name ";

        debugger;
        FadePageCover(true);
        GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
            , function () {
                FadePageCover(false);
            });
    }
    

}

function PaymentRequestIntegration_ApproveList(callback) {
    //Confirmation message to delete
    debugger;
    if (_IsCustodySettlement == 1) {
        if (GetAllSelectedIDsAsString('tblPaymentRequestIntegration') != "")
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
                CallGETFunctionWithParameters("/api/PaymentRequestIntegration/Approve"
                    , { "pDeletedPaymentRequestIntegrationIDs": GetAllSelectedIDsAsString('tblPaymentRequestIntegration'), "PReceiverUsers": "0", "pIsCustodySettlement": _IsCustodySettlement }
                    , function (pData) {
                        if (pData == "") {
                            swal("Success", "approved successfully.");
                            FadePageCover(false);
                            jQuery('#CheckboxesListModal').modal('hide')
                            PaymentRequestIntegration_LoadingWithPaging();
                            LoadDefaults("/api/Defaults/LoadAll", " WHERE 1=1 ");
                        }
                        else {
                            FadePageCover(false);
                            jQuery('#CheckboxesListModal').modal('hide')
                            showDeleteFailMessage = true;
                            strDeleteFailMessage = pData;
                            PaymentRequestIntegration_LoadingWithPaging();
                        }

                    });

            });
    }
    else {
        //if ($("#tblPaymentRequestIntegration tr[ID=4]").find("td.IsApprovedRequest").find('#cbIsApprovedRequest4').prop('checked'))
        //{ }
        //else
        if (GetAllSelectedIDsAsString('tblPaymentRequestIntegration') != "")
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

    CallGETFunctionWithParameters("/api/PaymentRequestIntegration/FillCombo"
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
            CallGETFunctionWithParameters("/api/PaymentRequestIntegration/GetOperationID"
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
        //    CallGETFunctionWithParameters("/api/PaymentRequestIntegration/GetOperationID"
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
            CallGETFunctionWithParameters("/api/PaymentRequestIntegration/GetOperationID"
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
    if (check == 0 && parseInt($('#slOperation' + ID + '').val()) > 0 && $('#slSupplier' + ID).val() != "" && $('#slSupplier' + ID + ' option:selected').attr("partnerid") != undefined) {
        FadePageCover(true);

        CallGETFunctionWithParameters("/api/PaymentRequestIntegration/GetIssuedToBySupplier", { pPartnerID: $('#slSupplier' + ID + ' option:selected').attr("partnerid") == "undefined" ? 0 : $('#slSupplier' + ID + ' option:selected').attr("partnerid")}
            , function (pData) {
                FillListFromObject(JSON.parse(pData[0]), 2, TranslateString("SelectFromMenu"), "slIssuedToCmbo", pData[0], null);
                FadePageCover(false);
            }
            , null);

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

        var ID = 0;
        var CustodyID = 0;
        $('#tblPaymentRequestIntegrationDetails > tbody > tr').each(function (i, tr) {
            ID = $(tr).attr('ID');
            CustodyID = $("#slSupplier" + ID + " option[partnerid='" + $('#slCustody').val() + "']").val();
            $("#slSupplier" + ID).val(CustodyID);

        });
    }
}
function GetUserIDFromCustudy() {
    debugger;
    CallGETFunctionWithParameters("/api/PaymentRequestIntegration/GetUserIDFromCustudy"
         , {}
         , function (pResult) {
             if (pResult[0] > 0) {
                 debugger;

                 CallGETFunctionWithParameters("/api/PaymentRequestIntegration/GetCustudy", {}
                 , function (pData) {
                     FillListFromObject(JSON.parse(pResult[0]), 2, TranslateString("SelectFromMenu"), "slCustody", pData[0], null);

                  }, null);

             }

             FadePageCover(false);
         }
         , null);

}


function PaymentRequestIntegration_UnApproveList(callback) {
    //Confirmation message to delete
    debugger;
    //if (_IsCustodySettlement == 1) {
    if (GetAllSelectedIDsAsString('tblPaymentRequestIntegration') != "")
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
                CallGETFunctionWithParameters("/api/PaymentRequestIntegration/UnApprove"
                    , { "pDeletedPaymentRequestIntegrationIDs": GetAllSelectedIDsAsString('tblPaymentRequestIntegration'), "PReceiverUsers": "0", "pIsCustodySettlement": _IsCustodySettlement }
                    , function (pData) {
                        if (pData == "") {
                            swal("Success", "تم فك الاعتماد بنجاح");
                            FadePageCover(false);
                            jQuery('#CheckboxesListModal').modal('hide')
                            PaymentRequestIntegration_LoadingWithPaging();
                            LoadDefaults("/api/Defaults/LoadAll", " WHERE 1=1 ");
                        }
                        else {
                            FadePageCover(false);
                            jQuery('#CheckboxesListModal').modal('hide')
                            showDeleteFailMessage = true;
                            strDeleteFailMessage = pData;
                            PaymentRequestIntegration_LoadingWithPaging();
                        }
                    });
             // }, 400)
            });

}