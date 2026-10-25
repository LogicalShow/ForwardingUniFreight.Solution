function ACIDDetails_SubmenuTabClicked() {
    debugger;
    //if ($("#tblACIDDetails tbody tr").length == 0) {
        ACIDDetails_LoadAll();
    //}
}
function ACIDDetails_LoadAll() {
    debugger;
    FadePageCover(true);
    var pWhereClause = "WHERE OperationACIDNumber IS NOT NULL AND OperationID IN (SELECT ID FROM Operations WHERE MasterOperationID=" + $("#hOperationID").val() + ") ";
    if (pDefaults.UnEditableCompanyName == "PYR")
        var pWhereClause = "WHERE OperationACIDNumber IS NOT NULL AND (OperationID IN (SELECT ID FROM Operations WHERE MasterOperationID=" + $("#hOperationID").val() + ") or (OperationID=" + $("#hOperationID").val() + "))";

    CallGETFunctionWithParameters("/api/OperationsACIDDetails/LoadAll",
        {
            pWhereClause: pWhereClause
        }
        , function (pData) { ACIDDetails_BindTableRows(JSON.parse(pData[0])); FadePageCover(false); }
        , null);
}
function ACIDDetails_BindTableRows(pACIDDetails) {
    debugger;
    ClearAllTableRows("tblACIDDetails");
    //var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' title='Print'> <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    $.each(pACIDDetails, function (i, item) {
        AppendRowtoTable("tblACIDDetails",
            ("<tr ID='" + item.ID + "' " + (OEACID && $("#hIsOperationDisabled").val() == false ? "ondblclick='ACIDDetails_FillControls(" + item.ID + ',"tblACIDDetails"' + ");'>" : ">")
                + "<td class='ACIDDetailsID'> <input " + (1 == 1 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='ACIDDetailsOperationID hide' val='" + item.OperationID + "'></td>"

                + "<td class='ACIDDetailsOperationACIDNumber'>" + (item.OperationACIDNumber == "0" ? "" : item.OperationACIDNumber) + "</td>"
                + "<td class='ACIDDetailsOperationOpenedBy'>" + (item.Name == "0" ? "" : item.Name) + "</td>"
                + "<td class='ACIDDetailsOperationOperationManName'>" + (item.VATNumber == "0" ? "" : item.VATNumber) + "</td>"
                + "<td class='ACIDDetailsExpirationDate'>" + (item.Description == "0" ? "" : item.Description)  + "</td>"

                + "<td class='ACIDDetailsOperationConsigneeName'>" + (item.OperationConsigneeName == "0" ? "" : item.OperationConsigneeName) + "</td>"
                + "<td class='ACIDDetailsOperationConsignee2Name'>" + (item.OperationConsignee2Name == "0" ? "" : item.OperationConsignee2Name) + "</td>"

                + "<td class='ACIDDetailsOperationMasterBL'>" + (item.GrossWeight == "0" ? "" : item.GrossWeight) + "</td>"
                + "<td class='ACIDDetailsOperationHouseNumber'>" + (item.OperationHouseNumber == "0" ? "" : item.OperationHouseNumber) + "</td>"
                + "<td class='ACIDDetailsOperationQuantity'>" + (item.OperationQuantity == "0" ? "" : item.OperationQuantity.trim()) + "</td>"

                + "<td class='ACIDDetailsReImportApproval'>" + (item.ContainerNumber == "0" ? "" : item.ContainerNumber) + "</td>"
                + "<td class='ACIDDetailsReImportApprovalNumber hide'>" + (item.ReImportApprovalNumber == "0" ? "" : item.ReImportApprovalNumber) + "</td>"
                + "<td class='ACIDDetailsSurveyRequest'>" + (item.CarrierSeal == "0" ? "" : item.CarrierSeal) + "</td>"
                + "<td class='ACIDDetailsSurveyDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.SurveyDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.SurveyDate))) + "</td>"
                + "<td class='ACIDDetailsUploadCargoDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.UploadCargoDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.UploadCargoDate))) + "</td>"
                + "<td class='ACIDDetailsBankNomination hide'>" + (item.BankNomination == "0" ? "" : item.BankNomination) + "</td>"
                + "<td class='ACIDDetailsTransactionMethod'>" + (item.TransactionMethod == "0" ? "" : item.TransactionMethod) + "</td>"
                + "<td class='ACIDDetailsBankNominationOpenedBy'>" + (item.BankNominationOpenedBy == "0" ? "" : item.BankNominationOpenedBy) + "</td>"
                + "<td class='ACIDDetailsCustomsCertificateNo'>" + (item.CustomsCertificateNo == "0" ? "" : item.CustomsCertificateNo) + "</td>"

                + "<td class='ACIDDetailsOperationNotes'>" + (item.OperationNotes == "0" ? "" : item.OperationNotes) + "</td>"

                + "</tr>"));
    });
    
    //ApplyPermissions();
    BindAllCheckboxonTable("tblACIDDetails", "ACIDDetailsID", "cb-CheckAll-ACIDDetails");
    CheckAllCheckbox("HeaderDeleteACIDDetailsID");

    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }

}
function ACIDDetails_ClearAllControls() {
    ClearAll("#ACIDDetailsModal");
    var TodaysDateInddMMyyyyFormat = getTodaysDateInddMMyyyyFormat();
    $("#txtACIDDetailsExpirationDate").val(TodaysDateInddMMyyyyFormat);
    $("#txtACIDDetailsSurveyDate").val(TodaysDateInddMMyyyyFormat);
    $("#txtACIDDetailsUploadCargoDate").val(TodaysDateInddMMyyyyFormat);
    $("#txtACIDDetailsReImportApproval").val("");
    $("#txtACIDDetailsReImportApprovalNumber").val("");
    $("#txtACIDDetailsSurveyRequest").val("");
    $("#txtACIDDetailsBankNomination").val("");
    $("#txtACIDDetailsTransactionMethod").val("");
    $("#txtACIDDetailsBankNominationOpenedBy").val("");
    $("#txtACIDDetailsCustomsCertificateNo").val("");
    
}
function ACIDDetails_FillControls(pID, pTableName) {
    debugger;
    jQuery("#ACIDDetailsModal").modal("show");
    ClearAll("#ACIDDetailsModal");
    $("#hACIDDetailsID").val(pID);
    var tr = $("#" + pTableName + " tr[ID='" + pID + "']");

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
    $("#txtACIDDetailsOperationCode").val($("#hOperationCode").val());
    $("#txtACIDDetailsACIDNumber").val($(tr).find("td.ACIDDetailsOperationACIDNumber").text());
    $("#txtACIDDetailsOpenedBy").val($(tr).find("td.ACIDDetailsOperationOpenedBy").text());
    $("#txtACIDDetailsOperationMan").val($(tr).find("td.ACIDDetailsOperationOperationManName").text());

    $("#txtACIDDetailsConsigneeName").val($(tr).find("td.ACIDDetailsOperationConsigneeName").text());
    $("#txtACIDDetailsConsignee2Name").val($(tr).find("td.ACIDDetailsOperationConsignee2Name").text());
    $("#txtACIDDetailsMasterBL").val($(tr).find("td.ACIDDetailsOperationMasterBL").text());
    $("#txtACIDDetailsHBL").val($(tr).find("td.ACIDDetailsOperationHouseNumber").text());
    $("#txtACIDDetailsQuantity").val($(tr).find("td.ACIDDetailsOperationQuantity").text());
    $("#txtACIDDetailsNotes").val($(tr).find("td.ACIDDetailsOperationNotes").text());

}
function ACIDDetails_Update(pSaveandAddNew) {
    debugger;
    if (ValidateForm("form", "ACIDDetailsModal")) {
        FadePageCover(true);
        var pParametersWithValues = {
            pID: $("#hACIDDetailsID").val()
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
                    ACIDDetails_LoadAll();
                    jQuery("#ACIDDetailsModal").modal("hide");
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
            , null);
    }
}
function ACIDDetails_DeleteList(pTableName) {
    debugger;
    var pDeletedACIDDetailsIDs = GetAllSelectedIDsAsString(pTableName);
    if (pDeletedACIDDetailsIDs != "")
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
                var pParametersWithValues = { pDeletedACIDDetailsIDs: pDeletedACIDDetailsIDs, pOperationID: $("#hOperationID").val() };
                CallGETFunctionWithParameters("/api/OperationsACIDDetails/Delete", pParametersWithValues
                    , function (pData) {
                        if (pData[0])
                            ACIDDetails_BindTableRows(JSON.parse(pData[1]));
                        else
                            swal("Sorry", "Connection failed, please try again.");
                        FadePageCover(false);
                    }
                    , null);
            });
}
function PrintACIDDetails() {
    debugger;
    var ReportName = "Rep_UNIACIDDetails";
    var pWhereClause = " WHERE op.ID in (select ID from Operations where MasterOperationID =" + $("#hOperationID").val() +") AND op.ACIDNumber IS NOT NULL ";
    var pOutputTo = "Print";
    CallGETFunctionWithParameters("/api/Reports/GetLogoPaths", { pLogoSubPath1: "Content/Images/CompanyHeader.jpg", pLogoSubPath2: "Content/Images/CompanyFooter.jpg" }, function (paths) {
        var arr_Keys = new Array();
        var arr_Values = new Array();
        let query = `Rep_UNIACIDDetails' ${pWhereClause}'`;
        arr_Keys.push("Logo");
        arr_Keys.push("Logo1");

        arr_Values.push(paths.logoPath1);
        arr_Values.push(paths.logoPath2);



        var pParametersWithValues =
        {
            query: query
            , arr_Keys: arr_Keys
            , arr_Values: arr_Values
            , pTitle: "ACID Details"
            , pReportName: ReportName
            , pReportType: pOutputTo
        };
        var win = window.open("", "_blank");
        var url = '/ReportMainClass/PrintReportQueryAndParams?pTitle="' + pParametersWithValues.pTitle + '"'
            + '&query=' + pParametersWithValues.query + ''
            + '&arr_Keys=' + pParametersWithValues.arr_Keys + ''
            + '&arr_Values=' + pParametersWithValues.arr_Values + ''
            + '&pReportName=' + pParametersWithValues.pReportName + ''
            + '&pReportType=' + pParametersWithValues.pReportType + '';

        win.location = url;
    })
}