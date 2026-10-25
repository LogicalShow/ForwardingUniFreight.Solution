// OperationsACIDDetails OperationsACIDDetails ---------------------------------------------------------------
// Bind OperationsACIDDetails Table Rows
function OperationsACIDDetails_BindTableRows(pOperationsACIDDetails) {
    debugger;
    $("#hl-menu-ContainerTrackingGroup").parent().addClass("active");
    ClearAllTableRows("tblOperationsACIDDetails");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pOperationsACIDDetails, function (i, item) {
        AppendRowtoTable("tblOperationsACIDDetails",
            ("<tr ID='" + item.ID + "' ondblclick='OperationsACIDDetails_EditByDblClick(" + item.ID + ");'>"
                //+ "<td class='ID'> <input name='Delete' id='" + item.ID + "' type='checkbox' value='" + item.ID + "' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);'/></td>"
                + "<td class='ACIDDetailsOperationID hide' val='" + item.OperationID + "'></td>"
                
                + "<td class='ACIDDetailsOperationOperationCode'>" + (item.OperationCode == "0" ? "" : item.OperationCode) + "</td>"
                + "<td class='ACIDDetailsOperationACIDNumber'>" + (item.OperationACIDNumber == "0" ? "" : item.OperationACIDNumber) + "</td>"
                + "<td class='ACIDDetailsOperationOpenedBy'>" + (item.OperationOpenedBy == "0" ? "" : item.OperationOpenedBy) + "</td>"
                + "<td class='ACIDDetailsOperationOperationManName'>" + (item.OperationOperationManName == "0" ? "" : item.OperationOperationManName) + "</td>"
                + "<td class='ACIDDetailsExpirationDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ExpirationDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate))) + "</td>"

                + "<td class='ACIDDetailsOperationConsigneeName'>" + (item.OperationConsigneeName == "0" ? "" : item.OperationConsigneeName) + "</td>"
                + "<td class='ACIDDetailsOperationConsignee2Name'>" + (item.OperationConsignee2Name == "0" ? "" : item.OperationConsignee2Name) + "</td>"

                + "<td class='ACIDDetailsOperationMasterBL'>" + (item.OperationMasterBL == "0" ? "" : item.OperationMasterBL) + "</td>"
                + "<td class='ACIDDetailsOperationHouseNumber'>" + (item.OperationHouseNumber == "0" ? "" : item.OperationHouseNumber) + "</td>"
                + "<td class='ACIDDetailsOperationQuantity'>" + (item.OperationQuantity == "0" ? "" : item.OperationQuantity.trim()) + "</td>"

                + "<td class='ACIDDetailsReImportApproval'>" + (item.ReImportApproval == "0" ? "" : item.ReImportApproval) + "</td>"
                + "<td class='ACIDDetailsReImportApprovalNumber'>" + (item.ReImportApprovalNumber == "0" ? "" : item.ReImportApprovalNumber) + "</td>"
                + "<td class='ACIDDetailsSurveyRequest'>" + (item.SurveyRequest == "0" ? "" : item.SurveyRequest) + "</td>"
                + "<td class='ACIDDetailsSurveyDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.SurveyDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.SurveyDate))) + "</td>"
                + "<td class='ACIDDetailsUploadCargoDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.UploadCargoDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.UploadCargoDate))) + "</td>"
                + "<td class='ACIDDetailsBankNomination'>" + (item.BankNomination == "0" ? "" : item.BankNomination) + "</td>"
                + "<td class='ACIDDetailsTransactionMethod'>" + (item.TransactionMethod == "0" ? "" : item.TransactionMethod) + "</td>"
                + "<td class='ACIDDetailsBankNominationOpenedBy'>" + (item.BankNominationOpenedBy == "0" ? "" : item.BankNominationOpenedBy) + "</td>"
                + "<td class='ACIDDetailsCustomsCertificateNo'>" + (item.CustomsCertificateNo == "0" ? "" : item.CustomsCertificateNo) + "</td>"

                + "<td class='ACIDDetailsOperationNotes'>" + (item.OperationNotes == "0" ? "" : item.OperationNotes) + "</td>"

                + "</tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblOperationsACIDDetails", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblOperationsACIDDetails>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });


}
function OperationsACIDDetails_EditByDblClick(pID) {
    jQuery("#OperationsACIDDetailsModal").modal("show");
    OperationsACIDDetails_FillControls(pID);
}
// Loading with data
function OperationsACIDDetails_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/OperationsACIDDetails/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { OperationsACIDDetails_BindTableRows(pTabelRows); OperationsACIDDetails_ClearAllControls(); });
    HighlightText("#tblOperationsACIDDetails>tbody>tr", $("#txt-Search").val().trim());
    //if (callbackForDeleteFail != null)
    //    callbackForDeleteFail();
}

function OperationsACIDDetails_Update() {
    debugger;
    if (ValidateForm("form", "OperationsACIDDetailsModal")) {
        FadePageCover(true);
        var pParametersWithValues = {
            pID: $("#hID").val()
            , pOperationID: $("#hACIDDetailsOperationID").val()
            , pACIDDetailsExpirationDate: $("#txtACIDDetailsExpirationDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtACIDDetailsExpirationDate").val())
            , pACIDDetailsSurveyDate: $("#txtACIDDetailsSurveyDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtACIDDetailsSurveyDate").val())
            , pACIDDetailsUploadCargoDate: $("#txtACIDDetailsUploadCargoDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtACIDDetailsUploadCargoDate").val())
            , pACIDDetailsReImportApproval: $("#txtACIDDetailsReImportApproval").val().trim() == "" ? "0" : $("#txtACIDDetailsReImportApproval").val().trim().toUpperCase()
            , pACIDDetailsReImportApprovalNumber: $("#txtACIDDetailsReImportApprovalNumber").val().trim() == "" ? "0" : $("#txtACIDDetailsReImportApprovalNumber").val().trim().toUpperCase()
            , pACIDDetailsSurveyRequest: $("#txtACIDDetailsSurveyRequest").val().trim() == "" ? "0" : $("#txtACIDDetailsSurveyRequest").val().trim().toUpperCase()
            , pACIDDetailsBankNomination: $("#txtACIDDetailsBankNomination").val().trim() == "" ? "0" : $("#txtACIDDetailsBankNomination").val().trim().toUpperCase()
            , pACIDDetailsTransactionMethod: $("#txtACIDDetailsTransactionMethod").val().trim() == "" ? "0" : $("#txtACIDDetailsTransactionMethod").val().trim().toUpperCase()
            , pACIDDetailsBankNominationOpenedBy: $("#txtACIDDetailsBankNominationOpenedBy").val().trim() == "" ? "0" : $("#txtACIDDetailsBankNominationOpenedBy").val().trim().toUpperCase()
            , pACIDDetailsCustomsCertificateNo: $("#txtACIDDetailsCustomsCertificateNo").val().trim() == "" ? "0" : $("#txtACIDDetailsCustomsCertificateNo").val().trim().toUpperCase()
        };
        CallGETFunctionWithParameters("/api/OperationsACIDDetails/Update", pParametersWithValues
            , function (pData) {
                debugger;
                if (pData[0]) {
                    OperationsACIDDetails_LoadingWithPaging();
                    jQuery("#OperationsACIDDetailsModal").modal("hide");
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
            , null);
    }

}

//sherif: calling this fn is to set the timelocked to null in the DB to unlock the edited field in case of pressing close
function OperationsACIDDetails_UnlockRecord() {
    UnlockFunction("/api/OperationsACIDDetails/UnlockRecord",
        { pID: $("#hID").val() },
        "OperationsACIDDetailsModal",
        function () { OperationsACIDDetails_LoadingWithPaging(); }); //the callback function
}

function OperationsACIDDetails_FillControls(pID) {
    OperationsACIDDetails_ClearAllControls(function () {
        debugger;
        var tr = $("tr[ID='" + pID + "']");

        $("#hID").val(pID);

        $("#lblShown").html(": " + $(tr).find("td.ACIDDetailsOperationACIDNumber").text());
        

        $("#txtACIDDetailsExpirationDate").val($(tr).find("td.ACIDDetailsExpirationDate").text());
        $("#txtACIDDetailsSurveyDate").val($(tr).find("td.ACIDDetailsSurveyDate").text());
        $("#txtACIDDetailsUploadCargoDate").val($(tr).find("td.ACIDDetailsUploadCargoDate").text());

        $("#txtACIDDetailsReImportApproval").val($(tr).find("td.ACIDDetailsReImportApproval").text());
        $("#txtACIDDetailsReImportApprovalNumber").val($(tr).find("td.ACIDDetailsReImportApprovalNumber").text());
        $("#txtACIDDetailsSurveyRequest").val($(tr).find("td.ACIDDetailsSurveyRequest").text());
        $("#txtACIDDetailsBankNomination").val($(tr).find("td.ACIDDetailsBankNomination").text());
        $("#txtACIDDetailsTransactionMethod").val($(tr).find("td.ACIDDetailsTransactionMethod").text());
        $("#txtACIDDetailsBankNominationOpenedBy").val($(tr).find("td.ACIDDetailsBankNominationOpenedBy").text());
        $("#txtACIDDetailsCustomsCertificateNo").val($(tr).find("td.ACIDDetailsCustomsCertificateNo").text());

        $("#hACIDDetailsOperationID").val($(tr).find("td.ACIDDetailsOperationID").attr("val"));
        $("#txtACIDDetailsOperationCode").val($(tr).find("td.ACIDDetailsOperationOperationCode").text());
        $("#txtACIDDetailsACIDNumber").val($(tr).find("td.ACIDDetailsOperationACIDNumber").text());
        $("#txtACIDDetailsOpenedBy").val($(tr).find("td.ACIDDetailsOperationOpenedBy").text());
        $("#txtACIDDetailsOperationMan").val($(tr).find("td.ACIDDetailsOperationOperationManName").text());

        $("#txtACIDDetailsConsigneeName").val($(tr).find("td.ACIDDetailsOperationConsigneeName").text());
        $("#txtACIDDetailsConsignee2Name").val($(tr).find("td.ACIDDetailsOperationConsignee2Name").text());
        $("#txtACIDDetailsMasterBL").val($(tr).find("td.ACIDDetailsOperationMasterBL").text());
        $("#txtACIDDetailsHBL").val($(tr).find("td.ACIDDetailsOperationHouseNumber").text());
        $("#txtACIDDetailsQuantity").val($(tr).find("td.ACIDDetailsOperationQuantity").text());
        $("#txtACIDDetailsNotes").val($(tr).find("td.ACIDDetailsOperationNotes").text());

    });
}

function OperationsACIDDetails_ClearAllControls(callback) {
    ClearAll("#OperationsACIDDetailsModal");

    $("#cb-CheckAll").prop('checked', false);

    $("#txtACIDDetailsReImportApproval").val("");
    $("#txtACIDDetailsReImportApprovalNumber").val("");
    $("#txtACIDDetailsSurveyRequest").val("");
    $("#txtACIDDetailsBankNomination").val("");
    $("#txtACIDDetailsTransactionMethod").val("");
    $("#txtACIDDetailsBankNominationOpenedBy").val("");
    $("#txtACIDDetailsCustomsCertificateNo").val("");

    if (callback != null && callback != undefined)
        callback();
}



