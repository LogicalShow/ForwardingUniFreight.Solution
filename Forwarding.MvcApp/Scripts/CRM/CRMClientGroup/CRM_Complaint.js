function Complaint_BindTableRows(pComplaint) {
    debugger;
    $("#hl-menu-Complaint").parent().addClass("active");
    ClearAllTableRows("tblComplaint");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' title='Print'> <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";

    $.each(pComplaint, function (i, item) {
        AppendRowtoTable("tblComplaint",
        ("<tr ID='" + item.ID + "' ondblclick='Complaint_FillAllControls(" + item.ID + ");' class='" + (1 == 2 ? "text-primary" : "") + "'>"
            + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='Code'>" + item.Code + "</td>"
            + "<td class='CustomerID hide'>" + item.CustomerID + "</td>"
            + "<td class='CustomerName'>" + item.CustomerName + "</td>"
            + "<td class='Creator'>" + item.CreatorUserName + "</td>"
            + "<td class='OperationID hide'>" + item.OperationID + "</td>"
            //+ "<td class='OperationName'>" + (item.OperationID == 0 ? "" : item.OperationCode) + "</td>"
            + "<td class='OperationName'>" + (item.ComplaintDetailsOperationCodeSerials) + "</td>"
            + "<td class='ComplaintName'>" + item.ComplaintDetailsNames + "</td>"
            + "<td class='ValuesInEGP'>" + item.ValuesInEGP + "</td>"
            + "<td class='ValuesInUSD'>" + item.ValuesInUSD + "</td>"
            + "<td class='ValuesInEUR'>" + item.ValuesInEUR + "</td>"

            //+ "<td class='FromDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.FromDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.FromDate))) + "</td>"
            + "<td class='ComplaintName hide'>" + (item.ComplaintName == 0 ? "" : item.ComplaintName) + "</td>"
            + "<td class='ComplaintDetails hide'>" + (item.ComplaintDetails == 0 ? "" : item.ComplaintDetails) + "</td>"
            + "<td class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"

            //+ "<td class='IsFinalized hide'> <input type='checkbox' id='cbIsFinalized" + item.ID + "' disabled='disabled' " + (item.IsFinalized ? " checked='checked' " : "") + " /></td>"
            + "<td class=''><a onclick='Complaint_Print(" + item.ID + ");' " + printControlsText + "</a></td>"
            + "<td class='hide'><a href='#ComplaintModal' data-toggle='modal' onclick='Complaint_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblComplaint", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblComplaint>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });

    $("#slOperationForHeader").attr("disabled", "disabled");
}
function Complaint_LoadingWithPaging() {
    debugger;
    var pWhereClause = Complaint_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { Complaint_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblComplaint>tbody>tr", $("#txt-Search").val().trim());
}
function Complaint_GetWhereClause() {
    debugger;

    let pWhereClause = "WHERE 1=1";

    if ($("#slFilterUsers").val() != "") {
        pWhereClause += " AND CreatorUserID=" + $("#slFilterUsers").val();
    }

    if ($("#txtFilterOperationCodeSerial").val() != "") {
        pWhereClause += " AND OperationCodeSerial LIKE '%" + $("#txtFilterOperationCodeSerial").val() + "%'";
    }

    if ($("#txtFilterComplaintName").val() != "") {
        pWhereClause += " AND ComplaintDetailsNames LIKE '%" + $("#txtFilterComplaintName").val() + "%'";
    }

    if ($("#txtFilterValueInEGP").val() != "") {
        pWhereClause += " AND ValuesInEGP LIKE '%" + $("#txtFilterValueInEGP").val() + "%'";
    }

    if ($("#txtFilterValueInUSD").val() != "") {
        pWhereClause += " AND ValuesInUSD LIKE '%" + $("#txtFilterValueInUSD").val() + "%'";
    }

    if ($("#txtFilterValueInEUR").val() != "") {
        pWhereClause += " AND ValuesInEUR LIKE '%" + $("#txtFilterValueInEUR").val() + "%'";
    }



    return pWhereClause;

    //return ($("#txt-Search").val().trim() == ""
    //    ? "WHERE 1=1"
    //    : ("WHERE Code LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n")
    //        + ("OR CustomerName LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n")
    //        + ("OR OperationCode LIKE N'%-" + $("#txt-Search").val().trim() + "'" + "\n")
    //        );
}
function Complaint_ClearAllControls() {
    debugger;
    ClearAllTableRows("tblCRM_ComplaintDetails");
    ClearAllTableRows("tblCRM_ComplaintDetailsResponses");
    ClearAll("#ComplaintModal");
    $("#slCustomer").val("");
    $("#slOperationForHeader").val("");
    $("#slOperation").html("<option value=''><--Select--></option>");
    ClearAllTableRows("tblCRM_ComplaintDetails");
    $("#btnSave").attr("onclick", "Complaint_Save(false);");
    $("#btnSaveAndAddNew").attr("onclick", "Complaint_Save(true);");
    $("#cb-CheckAll").prop('checked', false);
}
function Complaint_FillAllControls(pID) {
    debugger;
    FadePageCover(true);
    ClearAllTableRows("tblCRM_ComplaintDetails");
    ClearAllTableRows("tblCRM_ComplaintDetailsResponses");
    
    ClearAll("#ComplaintModal");
    var pParametersWithValues = {
        pComplaintID: pID
    };
    CallGETFunctionWithParameters("/api/CRM_Clients/Complaint_FillModal", pParametersWithValues
        , function (pData) {
            var pComplaintHeader = JSON.parse(pData[0]);
            var pOperationList = pData[1];
            var pComplaintDetails = pData[2];
            ComplaintDetails_BindTableRows(JSON.parse(pData[2]));
            jQuery("#ComplaintModal").modal("show");
            $("#hID").val(pID);
            //$("#lblShown").html(": " + pComplaintHeader.ComplaintName);
            $("#txtCode").val(pComplaintHeader.Code);
            $("#slCustomer").val(pComplaintHeader.CustomerID == 0 ? "" : pComplaintHeader.CustomerID);
            $("#slOperationForHeader").val(pComplaintHeader.OperationID == 0 ? "" : pComplaintHeader.OperationID);
            FillListFromObject(pComplaintHeader.OperationID, 1, "<--Select-->", "slOperation", pOperationList, null);
            //$("#txtComplaintName").val(pComplaintHeader.ComplaintName == 0 ? "" : pComplaintHeader.ComplaintName);
            $("#txtComplaintDetails").val(pComplaintHeader.ComplaintDetails == 0 ? "" : pComplaintHeader.ComplaintDetails);
            $("#txtNotes").val(pComplaintHeader.Notes == 0 ? "" : pComplaintHeader.Notes);

            //$("#txtFromDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pComplaintHeader.FromDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pComplaintHeader.FromDate)));

            $("#btnSave").attr("onclick", "Complaint_Save(false);");
            $("#btnSaveAndAddNew").attr("onclick", "Complaint_Save(true);");
            FadePageCover(false);
        }
        , null);
}
function Complaint_Save(pSaveAndNew) {
    debugger;
    FadePageCover(true);
    //if (!isValidDate($("#txtFromDate").val().trim(), 1) || !isValidDate($("#txtToDate").val().trim(), 1)) {
    //    swal(strSorry, "Please, Enter Start-End dates.");
    //    FadePageCover(false);
    //}
    //if ($("#txtFromDate").val().trim() != "" && $("#txtToDate").val().trim() != ""
    //    && Date.prototype.compareDates(ConvertDateFormat($("#txtFromDate").val().trim()), ConvertDateFormat($("#txtToDate").val().trim())) < 0) {
    //    FadePageCover(false);
    //    swal("Sorry", "Please, check dates.");
    //}
    if (ValidateForm("form", "ComplaintModal")) {
        pParametersWithValues = {
            pID: $("#hID").val() == "" ? 0 : $("#hID").val()
            , pCustomerID: $("#slCustomer").val() == "" ? "0" : $("#slCustomer").val()
            , pOperationID: $("#slOperationForHeader").val() == "" ? "0" : $("#slOperationForHeader").val()
            //, pComplaintName: $("#txtComplaintName").val().trim() == "" ? "0" : $("#txtComplaintName").val().trim().toUpperCase()
            //, pComplaintDetails: $("#txtComplaintDetails").val().trim() == "" ? "0" : $("#txtComplaintDetails").val().trim().toUpperCase()
            //, pNotes: $("#txtNotes").val().trim() == "" ? "0" : $("#txtNotes").val().trim().toUpperCase()
        };
        CallGETFunctionWithParameters("/api/CRM_Clients/Complaint_Save", pParametersWithValues
            , function (pData) {
                if (pData[0] == "") {
                    Complaint_LoadingWithPaging();
                    if (pSaveAndNew) {
                        Complaint_ClearAllControls();
                        $("#hID").val(pData[1]);
                        $("#txtCode").val(pData[2]);
                    }
                    else {
                        //jQuery("#ComplaintModal").modal("hide");
                        $("#hID").val(pData[1]);
                        $("#txtCode").val(pData[2]);
                    }
                    swal("Success", "Saved successfully.");
                }
                else {
                    swal("Sorry", pData[0]);
                    FadePageCover(false);
                }
            }
            , null);
    }
    else //if (ValidateForm("form", "ComplaintModal"))
        FadePageCover(false);
}
function Complaint_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblComplaint') != "")
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
            DeleteListFunction("/api/CRM_Clients/Complaint_Delete", { "pComplaintIDs": GetAllSelectedIDsAsString('tblComplaint') }, function () { Complaint_LoadingWithPaging(); });
        });
    //DeleteListFunction("/api/Complaint/Delete", { "pComplaintIDs": GetAllSelectedIDsAsString('tblComplaint') }, function () { Complaint_LoadingWithPaging(); });
}
function Complaint_SetPermissions() {
    debugger;
    if (pDefaults.UnEditableCompanyName == "GBL" && pLoggedUser.Name != "ADMIN") {
        if (pLoggedUser.DepartmentName == "FREIGHT" || pLoggedUser.DepartmentName == "TRANSPORTATION"
            || pLoggedUser.DepartmentName == "CLEARANCE" || pLoggedUser.DepartmentName == "WAREHOUSING") {
            $("#btn-DeleteDetails").addClass("hide");
            $("#btn-DeleteDetailsResponses").addClass("hide");
        }
        else {
            $("#btn-DeleteDetails").removeClass("hide");
            $("#btn-DeleteDetailsResponses").removeClass("hide");
        }
    } //if (pDefaults.UnEditableCompanyName == "GBL" && pLoggedUser.Name != "ADMIN") {
}
function Complaint_CustomerChanged() {
    debugger;
    if ($("#slCustomer").val() == "")
        $("#slOperation").html("<option value=''><--Select--></option>");
    else {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/Operations/LoadAll"
            , { pWhereClause: "WHERE BLType<>2 AND ClientID=" + $("#slCustomer").val() }
            , function (pData) {
                FillListFromObject(null, 1, "<--Select-->", "slOperation", pData[0], null);
                FadePageCover(false);
            }
            , null);
    }
}   

function ComplaintDetails_Save(pSaveandAddNew) {
    debugger;
    if ($("#hID").val() == "") {
        swal("Sorry", "Please Enter customer first.");
    }
    else
    if (ValidateForm("form", "CRM_ComplaintDetailsModal")) {

        CallGETFunctionWithParameters("/api/CRM_Clients/ComplaintDetails_Save", {
            pID: $("#hIDDetails").val() == "" ? 0 : $("#hIDDetails").val(),
            pCRM_ComplaintID: $("#hID").val(),
            pOperationID: ($("#slOperation").val() == "" || $("#slOperation").val() == null) ? 0 : $("#slOperation").val(),
            pStatusID: $("#slStatus").val() == "" ? 0 : $("#slStatus").val(),
            pComplaintDescription: $("#txtComplaintDetails").val() == "" ? 0 : $("#txtComplaintDetails").val(),
            //pComplaint: $("#txtComplaintName").val() == "" ? 0 : $("#txtComplaintName").val(),
            pComplaintDate: ($("#txtComplaintDate").val().trim()).length < 6 ? "01/01/1900" : ConvertDateFormat($("#txtComplaintDate").val().trim()),
            pValueInEGP: ($("#txtValueInEGP").val().trim()) == "" ? "0" : ($("#txtValueInEGP").val().trim()),
            pValueInUSD: ($("#txtValueInUSD").val().trim()) == "" ? "0" : ($("#txtValueInUSD").val().trim()),
            pValueInEUR: ($("#txtValueInEUR").val().trim()) == "" ? "0" : ($("#txtValueInEUR").val().trim()),
            pSalesRepID: ($("#slComplaintDetailsSalesRep").val() == "" ? 0 : $("#slComplaintDetailsSalesRep").val()),
            pResponseDescription: $("#txtResponseDetails").val() == "" ? 0 : $("#txtResponseDetails").val(),
            pResponseDate: ($("#txtResponseDate").val().trim()).length < 6 ? "01/01/1900" : ConvertDateFormat($("#txtResponseDate").val().trim()),
            pSalesRep2ID: ($("#slComplaintDetailsSalesRep2").val() == "" ? 0 : $("#slComplaintDetailsSalesRep2").val()),
            pComplaintNameID: ($("#slComplaint").val() == "" ? 0 : $("#slComplaint").val())

        }, function (pData) {
            if (pData[0] == "") {
                ComplaintDetails_LoadingWithPaging();
                Complaint_LoadingWithPaging();
                if (pSaveandAddNew) {
                    Complaint_ClearAllControls();
                    $("#hIDDetails").val(pData[1])
                    
                    
                }
                else {
                    //jQuery("#CRM_ComplaintDetailsModal").modal("hide");
                    $("#hIDDetails").val(pData[1])
                }
                swal("Success", "Saved successfully.");
            }
            else {
                swal("Sorry", pData[0]);
                FadePageCover(false);
            }
        }, null);
    }
}
function ComplaintDetails_BindTableRows(pComplaint) {
    debugger;
    $("#hl-menu-Complaint").parent().addClass("active");
    ClearAllTableRows("tblCRM_ComplaintDetails");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pComplaint, function (i, item) {
        AppendRowtoTable("tblCRM_ComplaintDetails",
        ("<tr ID='" + item.ID + "' ondblclick='ComplaintDetails_FillAllControls(" + item.ID + ");' class='" + (1 == 2 ? "text-primary" : "") + "'>"
            + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='CRM_ComplaintID hide'>" + item.CRM_ComplaintID + "</td>"
            + "<td class='OperationID' value='" + item.OperationID + "'>" + (item.OperationCode == 0 ? "" : item.OperationCode) + "</td>"
            + "<td class='StatusID' value='" + item.StatusID + "'>" + (item.StatueCode == 0 ? "" : item.StatueCode) + "</td>"
            + "<td class='ComplaintNameID' value='" + (item.ComplaintNameID == 0 ? "" : item.ComplaintNameID) + "'>" + (item.ComplaintName == 0 ? "" : item.ComplaintName) + "</td>"
            + "<td class='ComplaintDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ComplaintDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ComplaintDate))) + "</td>"
            + "<td class='ResponseDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ResponseDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ResponseDate))) + "</td>"
            + "<td class='SalesRepID' value='" + item.SalesRepID + "'>" + (item.SalesRepName == 0 ? "" : item.SalesRepName) + "</td>"
            + "<td class='SalesRepID2 hide' value='" + item.SalesRepID2 + "'>" + (item.StatueCode == 0 ? "" : item.StatueCode) + "</td>"
            + "<td class='StatusID hide' value='" + item.StatusID + "'>" + (item.StatueCode == 0 ? "" : item.StatueCode) + "</td>"
            + "<td class='SalesRepID2 hide'>" + (item.SalesRepName2 == 0 ? "" : item.SalesRepName2) + "</td>"
            + "<td class='Complaint hide'>" + (item.Complaint == 0 ? "" : item.Complaint) + "</td>"
            + "<td class='ComplaintDescription hide'>" + (item.ComplaintDescription == 0 ? "" : item.ComplaintDescription) + "</td>"
            + "<td class='ResponseDescription hide'>" + (item.ResponseDescription == 0 ? "" : item.ResponseDescription) + "</td>"
            //CRM_ComplaintID ,StatusID ,StatueCode,OperationID,OperationCode ,Complaint ,ComplaintDescription ,
            //ComplaintDate ,SalesRepID,SalesRepName ,ResponseDescription ,ResponseDate ,SalesRepID2,SalesRepName2,ID 
            //+ "<td class='IsFinalized hide'> <input type='checkbox' id='cbIsFinalized" + item.ID + "' disabled='disabled' " + (item.IsFinalized ? " checked='checked' " : "") + " /></td>"
            + "<td class='hide'><a href='#CRM_ComplaintDetailsModal' data-toggle='modal' onclick='ComplaintDetails_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblCRM_ComplaintDetails", "ID", "cb-CheckAll_ComplaintDetails");
    CheckAllCheckbox("ID");
    HighlightText("#tblCRM_ComplaintDetails>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function ComplaintDetails_FillAllControls(pID) {
    debugger;
    FadePageCover(true);
    ClearAll("#CRM_ComplaintDetailsModal");
    var pParametersWithValues = {
        pComplaintDetailsID: pID
    };
    CallGETFunctionWithParameters("/api/CRM_Clients/ComplaintDetails_FillModal", pParametersWithValues
        , function (pData) {
            debugger;
            var pComplaintDetails = JSON.parse(pData[0]);
            ComplaintDetailsResponses_BindTableRows(JSON.parse(pData[1]))
            jQuery("#CRM_ComplaintDetailsModal").modal("show");
            $("#hIDDetails").val(pID);
            
            $("#slOperation").val(pComplaintDetails[0].OperationID == 0 ? "" : pComplaintDetails[0].OperationID)
            $("#slStatus").val(pComplaintDetails[0].StatusID == 0 ? 0 : pComplaintDetails[0].StatusID)
            $("#txtComplaintDetails").val(pComplaintDetails[0].ComplaintDescription == 0 ? "" : pComplaintDetails[0].ComplaintDescription)
            //$("#txtComplaintName").val(pComplaintDetails[0].Complaint == 0 ? "" : pComplaintDetails[0].Complaint)
            $("#txtComplaintDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pComplaintDetails[0].ComplaintDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pComplaintDetails[0].ComplaintDate)))//(pComplaintDetails[0].ComplaintDate)
            $("#slComplaintDetailsSalesRep").val(pComplaintDetails[0].SalesRepID == 0 ? "" : pComplaintDetails[0].SalesRepID)
            $("#txtResponseDetails").val(pComplaintDetails[0].ResponseDescription == 0 ? "" : pComplaintDetails[0].ResponseDescription)
            $("#txtResponseDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pComplaintDetails[0].ResponseDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pComplaintDetails[0].ResponseDate)))//(pComplaintDetails[0].ResponseDate)
            $("#slComplaintDetailsSalesRep2").val(pComplaintDetails[0].SalesRepID2 == 0 ? "" : pComplaintDetails[0].SalesRepID2)
            $("#slComplaint").val(pComplaintDetails[0].ComplaintNameID)
            $("#txtValueInEGP").val(pComplaintDetails[0].ValueInEGP)
            $("#txtValueInUSD").val(pComplaintDetails[0].ValueInUSD)
            $("#txtValueInEUR").val(pComplaintDetails[0].ValueInEUR)

            //$("#txtFromDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pComplaintHeader.FromDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pComplaintHeader.FromDate)));

            $("#btnSave2").attr("onclick", "ComplaintDetails_Save(false);");
            $("#btnSaveandNew2").attr("onclick", "ComplaintDetails_Save(true);");
            FadePageCover(false);
        }
        , null);
}
function ComplaintDetails_LoadingWithPaging() {
    debugger;
    var pWhereClause = ComplaintDetails_GetWhereClause();
    var pPageSize = 100;
    var pPageNumber = 1;
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size",
        "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total",
        "/api/CRM_Clients/Complaint_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned", pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters,
        function (pData) { ComplaintDetails_BindTableRows(JSON.parse(pData[4])); });
    HighlightText("#tblCRM_ComplaintDetails>tbody>tr", $("#txt-Search").val().trim());
}
function ComplaintDetails_GetWhereClause() {
    return ("WHERE 1=1 AND CRM_ComplaintID = " + $("#hID").val());
}
function ComplaintDetails_ClearAllControls() {
    debugger;
    ClearAllTableRows("tblCRM_ComplaintDetailsResponses");

    ClearAll("#CRM_ComplaintDetailsModal");
    $('.StatusComplaintDetails').addClass('hide');
    $("#btnSave2").attr("onclick", "ComplaintDetails_Save(false);");
    $("#btnSaveandNew2").attr("onclick", "ComplaintDetails_Save(true);");
    $("#cb-CheckAll_ComplaintDetails").prop('checked', false);
}
function ComplaintDetails_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblCRM_ComplaintDetails') != "")
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
            DeleteListFunction("/api/CRM_Clients/ComplaintDetails_Delete", { "pComplaintDetailsIDs": GetAllSelectedIDsAsString('tblCRM_ComplaintDetails') }, function () {
                ComplaintDetails_LoadingWithPaging();
                Complaint_LoadingWithPaging();
            });
        });
    //DeleteListFunction("/api/Complaint/Delete", { "pComplaintIDs": GetAllSelectedIDsAsString('tblComplaint') }, function () { Complaint_LoadingWithPaging(); });
}

function ComplaintDetailsResponses_Save(pSaveandAddNew) {
    debugger;
    if ($("#hIDDetails").val() == "")
    {
        swal("Sorry", "Please Enter Complaint first.");
    }
    else
    if (ValidateForm("form", "CRM_ComplaintDetailsResponsesModal")) {

        CallGETFunctionWithParameters("/api/CRM_Clients/ComplaintDetailsResponses_Save", {
            pID: $("#hIDDetailsResponses").val() == "" ? 0 : $("#hIDDetailsResponses").val(),
            pComplaintDetailsID: $("#hIDDetails").val(),
            pResponseDescription: $("#txtResponseDetails").val() == "" ? 0 : $("#txtResponseDetails").val(),
            pResponseDate: ConvertDateFormat($("#txtResponseDate").val().trim()).length < 6 ? "01/01/1900" : ConvertDateFormat($("#txtResponseDate").val().trim()),
            pSalesRep2ID: ($("#slComplaintDetailsSalesRep2").val() == "" ? 0 : $("#slComplaintDetailsSalesRep2").val()),
            pStatusDetailsID: ($("#slStatusDetails").val() == "" ? 0 : $("#slStatusDetails").val())
            //pID  pComplaintDetailsID   pResponseDescription  pResponseDate  pSalesRep2ID
        }, function (pData) {
            if (pData[0] == "") {
                Complaint_LoadingWithPaging();
                ComplaintDetailsResponses_LoadingWithPaging();
                if (pSaveandAddNew) {
                    Complaint_ClearAllControls();
                }
                else {
                    jQuery("#CRM_ComplaintDetailsResponsesModal").modal("hide");
                }
                swal("Success", "Saved successfully.");
            }
            else {
                swal("Sorry", pData[0]);
                FadePageCover(false);
            }
        }, null);
    }
}   
function ComplaintDetailsResponses_BindTableRows(pComplaint) {
    debugger;
    $("#hl-menu-Complaint").parent().addClass("active");
    ClearAllTableRows("tblCRM_ComplaintDetailsResponses");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pComplaint, function (i, item) {
        AppendRowtoTable("tblCRM_ComplaintDetailsResponses",
        ("<tr ID='" + item.ID + "' ondblclick='ComplaintDetailsResponses_FillAllControls(" + item.ID + ");' class='" + (1 == 2 ? "text-primary" : "") + "'>"
            + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='ComplaintDetailsID hide'>" + item.ComplaintDetailsID + "</td>"
            + "<td class='SalesRep2'  value='" + item.SalesRep2 + "'>" + (item.SalesRep2Name == 0 ? "" : item.SalesRep2Name) + "</td>"
            + "<td class='StatusDetailsID'  value='" + item.StatusID + "'>" + (item.StatusName == 0 ? "" : item.StatusName) + "</td>"
            + "<td class='ResponseDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ResponseDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ResponseDate))) + "</td>"
            + "<td class='ResponseDescription hide'>" + (item.ResponseDescription == 0 ? "" : item.ResponseDescription) + "</td>"
            + "<td class='hide'><a href='#CRM_ComplaintDetailsResponsesModal' data-toggle='modal' onclick='ComplaintDetailsResponses_FillControls(" + item.ID + ");'> " + editControlsText + "</a></td>"
            + "<td class=''><a href='#' class='btn btn-xs btn-rounded btn-warning float-right' onclick='Pricing_Notify(" + item.ID + ");'>Notify </a></td></tr>"));
        //<a href="#CRM_FollowUpModal" data-toggle="modal" onclick="CRM_FollowUp_EditByDblClick(31 ,0);" class="btn btn-xs btn-rounded btn-lightblue float-right" title="Edit"> <i class="fa fa-pencil" style="padding-left: 5px;"></i> <span style="padding-right: 5px;">Edit</span></a>
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblCRM_ComplaintDetailsResponses", "ID", "cb-CheckAll_ComplaintDetailsResponses");
    CheckAllCheckbox("ID");
    HighlightText("#tblCRM_ComplaintDetailsResponses>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
    if (pComplaint.length > 0)
        $('.StatusComplaintDetails').removeClass('hide');
    else
        $('.StatusComplaintDetails').addClass('hide');
    if($('#slStatus').val() == null)
        $('#slStatus').val(0);
}
function ComplaintDetailsResponses_FillAllControls(pID) {
    debugger;
    jQuery("#CRM_ComplaintDetailsResponsesModal").modal("show");
    ClearAll("#CRM_ComplaintDetailsResponsesModal");
    var tr = $("tr[ID='" + pID + "']");
    $("#hIDDetailsResponses").val(pID)
    $("#txtResponseDetails").val($(tr).find("td.ResponseDescription").text());
    $("#txtResponseDate").val($(tr).find("td.ResponseDate").text());
    $("#slComplaintDetailsSalesRep2").val(parseInt($(tr).find("td.SalesRep2").attr('value')));
    $("#slStatusDetails").val(parseInt($(tr).find("td.StatusDetailsID").attr('value')));
}
function ComplaintDetailsResponses_LoadingWithPaging() {
    debugger;
    var pWhereClause = ComplaintDetailsResponses_GetWhereClause();
    var pPageSize = 100;
    var pPageNumber = 1;
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size",
        "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total",
        "/api/CRM_Clients/Complaint_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned", pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters,
        function (pData) { ComplaintDetailsResponses_BindTableRows(JSON.parse(pData[5])); });
    HighlightText("#tblCRM_ComplaintDetailsResponses>tbody>tr", $("#txt-Search").val().trim());
}
function ComplaintDetailsResponses_GetWhereClause() {
    return ("WHERE 1=1 AND ComplaintDetailsID = " + $("#hIDDetails").val());
}
function ComplaintDetailsResponses_ClearAllControls() {
    debugger;
    ClearAll("#CRM_ComplaintDetailsResponsesModal");
    $("#hIDDetailsResponses").val("")
    //$("#btnSave2").attr("onclick", "ComplaintDetailsResponses_Save(false);");
    //$("#btnSaveandNew2").attr("onclick", "ComplaintDetailsResponses_Save(true);");
    $("#cb-CheckAll_ComplaintDetailsResponses").prop('checked', false);
}
function ComplaintDetailsResponses_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblCRM_ComplaintDetailsResponses') != "")
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
            DeleteListFunction("/api/CRM_Clients/ComplaintDetailsResponses_Delete", { "pComplaintDetailsResponsesIDs": GetAllSelectedIDsAsString('tblCRM_ComplaintDetailsResponses') }, function () {
                ComplaintDetailsResponses_LoadingWithPaging();
                Complaint_LoadingWithPaging();
            });
        });
    //DeleteListFunction("/api/Complaint/Delete", { "pComplaintIDs": GetAllSelectedIDsAsString('tblComplaint') }, function () { Complaint_LoadingWithPaging(); });
}

function Pricing_Notify(pID) {
    debugger;
    Receptionists_GetAvailableUsers();
    $("#btnCheckboxesListApply").attr("onclick", "Pricing_SendLocalEmail(" + pID + ");");
    $("#btnCheckboxesListApply").html("<span class='glyphicon glyphicon-send'></span> Send");
    $("#btn-SearchItems").attr("onclick", "Receptionists_GetAvailableUsers();");
}

function ShowReceptionists(pID) {
    debugger;
    Receptionists_GetAvailableUsers();
    $("#btnCheckboxesListApply").attr("onclick", "ComplaintDetails_SendLocalEmail(" + pID + ");");
    $("#btnCheckboxesListApply").html("<span class='glyphicon glyphicon-send'></span> Send");
    $("#btn-SearchItems").attr("onclick", "Receptionists_GetAvailableUsers();");
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
        var tr = $("tr[ID='" + pID + "']");
        $("#hIDDetailsResponses").val(pID)
        $("#txtResponseDetails").val($(tr).find("td.ResponseDescription").text());

        var pParametersWithValues = {
            pUserIDs: pSelectedItemsIDs
            , pSubject: "Response on Complaint From " + $('#slCustomer  option:selected').text() + ""
            , pBody: "There is a complaint from Client " + $('#slCustomer  option:selected').text() + " on operation " + $('#slOperation  option:selected').text() + " "
            , pQuotationRouteID: 0
            , pPricingID: 0
            , pRequestOrReply: 0
            , pOperationID: $('#slOperation').val()
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

function ComplaintDetails_SendLocalEmail(pID) {
    debugger;
    var pModalName = "CheckboxesListModal";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pSelectedItemsIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
    if (pSelectedItemsIDs == "")
        swal("Sorry", "You have to select at least one receptionist.");
    else { //send
        FadePageCover(true);
        var tr = $("tr[ID='" + pID + "']");
        $("#hIDDetailsResponses").val(pID)
        $("#txtResponseDetails").val($(tr).find("td.ResponseDescription").text());

        var pParametersWithValues = {
            pUserIDs: pSelectedItemsIDs
            , pSubject: "Complaint " + $('#slComplaint option:selected').text() + " From " + $('#slCustomer  option:selected').text() + ""
            , pBody: "There is a complaint from Client " + $('#slCustomer  option:selected').text() + " on operation " + $('#slOperation  option:selected').text() + " (" + $('#txtComplaintDetails').val() + ") "
            , pQuotationRouteID: 0
            , pPricingID: 0
            , pRequestOrReply: 0
            , pOperationID: $('#slOperation').val()
            , pIsAlarm: true
            , pParentID: ""
            , pEmailSource: 0
            , pIsSendNormalEmail: false
            //LoadWithPaging parameters
            , pWhereClauseForLoadWithPaging: ("WHERE 1=1")
            , pPageSize: 1 //$("#select-page-size").val()
            //pPageNumber is 1 coz its insert so it will be on the top
            , pPageNumber: 1 //$("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text() 
            , pOrderBy: "ID DESC"
            , pSenderUserID: pLoggedUser.ID
        };// bool pIsAlarm, string pParentID , string pWhereClauseForLoadWithPaging, Int32 pPageSize, Int32 pPageNumber, string pOrderBy
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

function OpenCRM_ComplaintDetailsModal() {
    debugger;
    if ($("#hID").val() == "") {
        swal(strSorry, "Please Save the Complaint First");
    } else {
        jQuery("#CRM_ComplaintDetailsModal").modal("show");
    }
}
function OpenCRM_ComplaintDetailsResponsesModal() {
    debugger;
    if ($("#hIDDetails").val() == "") {
        swal(strSorry, "Please Save the Complaint Details First");
    } else {
        jQuery("#CRM_ComplaintDetailsResponsesModal").modal("show");
    }
}

function Complaint_Print(pID) {
    debugger;
    var arr_Keys = new Array();
    var arr_Values = new Array();
    arr_Keys.push("pID");

    arr_Values.push(pID);

    var pParametersWithValues =
    {
        arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: "ComplaintsReport"
        , pReportName: "ComplaintsReport"
    };


    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

    win.location = url;
    FadePageCover(false);

}