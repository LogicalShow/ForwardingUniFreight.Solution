//OperationPartnerTypeID for Exporters is 160
//OperationPartnerTypeID for Importers is 170
//OperationPartnerTypeID for BookingParty is 180
//OperationPartnerTypeID for Owner = 190;
//OperationPartnerTypeID for Client = 200;
//OperationPartnerTypeID for Shippers is 1
//OperationPartnerTypeID for Consignee is 2
//OperationPartnerTypeID for Notify1 is 4
//OperationPartnerTypeID for Notify2 is 5
//OperationPartnerTypeID for AGENTS is 6
//OperationPartnerTypeID for SHIPPING AGENTS is 7 
//OperationPartnerTypeID for CustomsClearanceAgents is 8      
//OperationPartnerTypeID for Shipping Lines is 9
//OperationPartnerTypeID for Airines is 10 
//OperationPartnerTypeID for Truckers is 11
//OperationPartnerTypeID for SUPPLIERS is 12
var pSlPartnerControlName = "slPartners";
function OperationPartners_SubmenuTabClicked() {
    debugger;
    if ($("#tblOperationPartners tbody tr").length == 0) {
        OperationPartners_LoadWithPagingWithWhereClause($("#hOperationID").val());
        ApplySelectListSearch();
    }

    if ($('#hOperationStageID').val() == 65) {
        //$('#Partners *, #PartnerModal *').prop('disabled', true);
    }
    
}
function OperationPartners_BindTableRows(pOperationPartners) {
    ClearAllTableRows("tblOperationPartners");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var printControlsText_Inv = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print Inv.") + "</span>";
    if (pDefaults.UnEditableCompanyName == "MED" && pLoggedUser.DepartmentID == 1 && pOperationHeader_Global.OperationStageID == 65) {
        OEPar = true;
    }
    $.each(pOperationPartners, function (i, item) {
        AppendRowtoTable("tblOperationPartners",
            ("<tr ID='" + item.ID + "' " + ((OEPar && $("#hIsOperationDisabled").val() == false) && !(IsMESCOCompany && item.PartnerTypeName == "SHIPPER" && pOperationHeader_Global.DirectionType == 2 && pOperationHeader_Global.QuotationID != 0) && !(IsMESCOCompany && item.PartnerTypeName == "CONSIGNEE" && pOperationHeader_Global.DirectionType == 1 && pOperationHeader_Global.QuotationID != 0) ? ("ondblclick='OperationPartners_EditByDblClick(" + item.ID + ");'") : "") + ">"
            //+ "<td class='PartnerID'>" + "<input "
            //            + (
            //                   (item.UsedInPayablesCount > 0 || item.UsedInInvoicesCount > 0)
            //                //|| ($("#hBLType").val() == constMasterBLType && item.OperationPartnerTypeID == constAgentOperationPartnerTypeID /*&& $("#tblOperationPartners tbody tr td.PartnerType[val=" + constAgentOperationPartnerTypeID + "]").length == 0*/) //master and agent
            //                //|| ($("#hBLType").val() != constMasterBLType && $("#hDirectionType").val() == constImportDirectionType && item.OperationPartnerTypeID == constConsigneeOperationPartnerTypeID /*&& $("#tblOperationPartners tbody tr td.PartnerType[val=" + constConsigneeOperationPartnerTypeID + "]").length == 0*/) //import and consignee
            //                //|| ($("#hBLType").val() != constMasterBLType && ($("#hDirectionType").val() == constExportDirectionType || $("#hDirectionType").val() == constDomesticDirectionType) && item.OperationPartnerTypeID == constShipperOperationPartnerTypeID /*&& $("#tblOperationPartners tbody tr td.PartnerType[val=" + constShipperOperationPartnerTypeID + "]").length == 0*/) //export or domestic and shipper
            //                || (item.OperationPartnerTypeID == constAgentOperationPartnerTypeID && $("#cbIsMaster").prop("checked") && $("#tblOperationPartners tbody tr td.PartnerType[val=" + constAgentOperationPartnerTypeID + "]").length == 0) //master and agent and its the only one in the table
            //                || (item.OperationPartnerTypeID == constConsigneeOperationPartnerTypeID && $("#cbIsImport").prop("checked") && $("#tblOperationPartners tbody tr td.PartnerType[val=" + constConsigneeOperationPartnerTypeID + "]").length == 0) //import and consignee and its the only one in the table
            //                || (item.OperationPartnerTypeID == constShipperOperationPartnerTypeID && ($("#cbIsExport").prop("checked") || $("#cbIsDomestic").prop("checked")) && $("#tblOperationPartners tbody tr td.PartnerType[val=" + constShipperOperationPartnerTypeID + "]").length == 0) //export or domestic and shipper and its the only one in the table
            //                ? "disabled='disabled'"
            //                : "name='Delete'"
            //              )
            //                + " type='checkbox' value='" + item.ID + "' />"
            //+ "</td>"
            + "<td class='PartnerID'>" + "<input "
                        + (
                               (item.UsedInPayablesCount > 0 || item.UsedInInvoicesCount > 0)
                            || ($("#hBLType").val() == constMasterBLType && item.OperationPartnerTypeID == constAgentOperationPartnerTypeID && $("#tblOperationPartners tbody tr td.PartnerType[val=" + constAgentOperationPartnerTypeID + "]").length == 0) //master and agent
                            || ($("#hBLType").val() != constMasterBLType && $("#hDirectionType").val() == constImportDirectionType && item.OperationPartnerTypeID == constConsigneeOperationPartnerTypeID && $("#tblOperationPartners tbody tr td.PartnerType[val=" + constConsigneeOperationPartnerTypeID + "]").length == 0) //import and consignee
                            || ($("#hBLType").val() != constMasterBLType && ($("#hDirectionType").val() == constExportDirectionType || $("#hDirectionType").val() == constDomesticDirectionType || $("#hDirectionType").val() == constCrossBookingDirectionType || $("#hDirectionType").val() == constReExportDirectionType) && item.OperationPartnerTypeID == constShipperOperationPartnerTypeID && $("#tblOperationPartners tbody tr td.PartnerType[val=" + constShipperOperationPartnerTypeID + "]").length == 0) //export or domestic and shipper
                            //|| (item.OperationPartnerTypeID == constAgentOperationPartnerTypeID && $("#tblOperationPartners tbody tr td.PartnerType[val=" + constAgentOperationPartnerTypeID + "]").length == 0) // agent and its the only one in the table
                            //|| (item.OperationPartnerTypeID == constConsigneeOperationPartnerTypeID && $("#tblOperationPartners tbody tr td.PartnerType[val=" + constConsigneeOperationPartnerTypeID + "]").length == 0) // consignee and its the only one in the table
                            //|| (item.OperationPartnerTypeID == constShipperOperationPartnerTypeID && $("#tblOperationPartners tbody tr td.PartnerType[val=" + constShipperOperationPartnerTypeID + "]").length == 0) // shipper and its the only one in the table
                            ? "disabled='disabled'"
                            : "name='Delete'"
                          )
                            + " type='checkbox' value='" + item.ID + "' />"
            + "</td>"
            + "<td class='PartnerType' val='" + item.OperationPartnerTypeID + "'>" + item.PartnerTypeName + "</td>"
            + "<td class='PartnerName' val='" + item.PartnerID + "'>" + (item.PartnerID == 0 ? "" : item.PartnerName) + "</td>"
            //+ (item.PartnerTypeID == 1
            //    ? "<td class='PartnerName' val='" + item.CustomerID + "'>" + (item.CustomerID == 0 ? "" : item.CustomerName) + "</td>"
            //    : "")
            //+ (item.PartnerTypeID == 2
            //    ? "<td class='PartnerName' val='" + item.AgentID + "'>" + item.AgentName + "</td>"
            //    : "")
            //+ (item.PartnerTypeID == 3
            //    ? "<td class='PartnerName' val='" + item.ShippingAgentID + "'>" + item.ShippingAgentName + "</td>"
            //    : "")
            //+ (item.PartnerTypeID == 4
            //    ? "<td class='PartnerName' val='" + item.CustomsClearanceAgentID + "'>" + item.CustomsClearanceAgentName + "</td>"
            //    : "")
            //+ (item.PartnerTypeID == 8
            //    ? "<td class='PartnerName' val='" + item.SupplierID + "'>" + item.SupplierName + "</td>"
            //    : "")
            + "<td class='ContactName' val='" + item.ContactID + "'>" + (item.ContactID == 0 ? "" : item.ContactName) + "</td>"
            + "<td class='Email'>" + (item.Email == 0 ? "" : item.Email) + "</td>"
            + "<td class='Phone1'>" + (item.Phone1 == 0 ? "" : item.Phone1) + "</td>"
            + "<td class='Phone2 hide'>" + (item.Phone2 == 0 ? "" : item.Phone2) + "</td>"
            + "<td class='Mobile1'>" + (item.Mobile1 == 0 ? "" : item.Mobile1) + "</td>"
            + "<td class='Fax'>" + (item.Fax == 0 ? "" : item.Fax) + "</td>"
            + "<td class='IsOperationClient'><input id='cbIsOperationClient" + item.ID + "' type='checkbox' disabled " + (item.IsOperationClient ? "checked" : "") + " />" + "</td>"
            + "<td class='OperationPartnerUsedInPayablesCount hide'>" + item.UsedInPayablesCount + "</td>"
            + "<td class='OperationPartnerUsedInInvoicesCount hide'>" + item.UsedInInvoicesCount + "</td>"
            + "<td>"
                + "<a class='hide' href='#PartnerModal' data-toggle='modal' onclick='OperationPartners_FillControls(" + item.ID + ");' " + editControlsText + "</a>"
                + (/*(pDefaults.UnEditableCompanyName == "GLD" || pDefaults.UnEditableCompanyName == "ALL") &&*/ (item.PartnerTypeID == constCustomerPartnerTypeID || item.PartnerTypeID == constAgentPartnerTypeID) ? "<a href='#' data-toggle='modal' onclick='OperationPartners_PrintAllPartnerInvoices(" + item.OperationID + "," + item.PartnerID + "," + item.PartnerTypeID + ");' " + printControlsText_Inv + "</a>" : "")
            + "</td></tr>"));
    });
    //ApplyPermissions();
    if (OAPar && $("#hIsOperationDisabled").val() == false) $("#btn-AddOperationPartners").removeClass("hide"); else $("#btn-AddOperationPartners").addClass("hide");
    debugger;
  
    if (ODPar && $("#hIsOperationDisabled").val() == false) $("#btn-DeleteOperationPartners").removeClass("hide"); else $("#btn-DeleteOperationPartners").addClass("hide");
    //************************************************************************************* */
    if (pDefaults.UnEditableCompanyName == "MED" && pLoggedUser.DepartmentID == 1 && pOperationHeader_Global.OperationStageID == 65) {

        $("#btn-AddOperationPartners").removeClass("hide");
        $("#btn-DeleteOperationPartners").addClass("hide");
    }
    //************************************************************************************** */
    BindAllCheckboxonTable("tblOperationPartners", "PartnerID", "cb-CheckAll-OperationPartners");
    CheckAllCheckbox("HeaderDeleteOpertationPartnerID");
    HighlightText("#tblOperationPartners>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }

    HideOperationActions();
}
function OperationPartners_LoadWithPagingWithWhereClause(pOperationID) {
    debugger;
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/OperationPartners/LoadWithWhereClause", " where OperationID = " + pOperationID, 0, 100, function (pData) {
        var pOperationPartnerTypes = pData[2];
        debugger;
        if ($("#slOperationPartnerTypes option").length < 2)
            Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(pOperationPartnerTypes, "ID", "Code", '', TranslateString("SelectFromMenu"), "#slOperationPartnerTypes", "", "PartnerTypeID", null);
        OperationPartners_BindTableRows(JSON.parse(pData[0]));
    });
}
function OperationPartners_Insert(pSaveandAddNew) {
    debugger;
    //TODO on saving partner: save new values for $("#hShipperID").val(), $("#hConsigneeID").val(), $("#hShipperContactID").val() and $("#hConsigneeContactID").val() (this is done in the controller)
    if ($("#slOperationPartnerTypes").val() == constBookingPartyOperationPartnerTypeID && OperationPartners_CheckIfValueIsFoundInTable("tblOperationPartners", "PartnerType", $("#slOperationPartnerTypes").val()))
        swal("Sorry", "Booking Party is already added to this operation.");
    else if ($("#slOperationPartnerTypes").val() == constOwnerOperationPartnerTypeID && OperationPartners_CheckIfValueIsFoundInTable("tblOperationPartners", "PartnerType", $("#slOperationPartnerTypes").val()))
        swal("Sorry", "Owner is already added to this operation.");
    else if ($("#slOperationPartnerTypes").val() == constClientOperationPartnerTypeID && OperationPartners_CheckIfValueIsFoundInTable("tblOperationPartners", "PartnerType", $("#slOperationPartnerTypes").val()))
        swal("Sorry", "Client is already added to this operation.");
    else {
        let truckerID = ($('#slOperationPartnerTypes option:selected').attr("PartnerTypeID") == constTruckerPartnerTypeID //Trucker
            ? ($("#" + pSlPartnerControlName).val() == "" ? 0 : $("#" + pSlPartnerControlName).val())
            : 0);
        InsertUpdateFunction("form", "/api/OperationPartners/Insert", {
            pOperationID: $("#hOperationID").val()
            , pBLType: $("#hBLType").val()
            , pOperationPartnerTypeID: $('#slOperationPartnerTypes option:selected').val()
            , pCustomerID: ($('#slOperationPartnerTypes option:selected').attr("PartnerTypeID") == constCustomerPartnerTypeID //Customer(shipper, exporter, consignee, notify, importer, BookingParty, Owner, Client)
                ? ($("#" + pSlPartnerControlName).val() == "" ? 0 : $("#" + pSlPartnerControlName).val())
                : 0)
            , pAgentID: ($('#slOperationPartnerTypes option:selected').attr("PartnerTypeID") == constAgentPartnerTypeID //Agent
                ? ($("#" + pSlPartnerControlName).val() == "" ? 0 : $("#" + pSlPartnerControlName).val())
                : 0)
            , pShippingAgentID: ($('#slOperationPartnerTypes option:selected').attr("PartnerTypeID") == constShippingAgentPartnerTypeID //ShippingAgent
                ? ($("#" + pSlPartnerControlName).val() == "" ? 0 : $("#" + pSlPartnerControlName).val())
                : 0)
            , pCustomsClearanceAgentID: ($('#slOperationPartnerTypes option:selected').attr("PartnerTypeID") == constCustomsClearanceAgentPartnerTypeID //CustomsClearanceAgent
                ? ($("#" + pSlPartnerControlName).val() == "" ? 0 : $("#" + pSlPartnerControlName).val())
                : 0)
            , pShippingLineID: ($('#slOperationPartnerTypes option:selected').attr("PartnerTypeID") == constShippingLinePartnerTypeID //ShippingLine
                ? ($("#" + pSlPartnerControlName).val() == "" ? 0 : $("#" + pSlPartnerControlName).val())
                : 0)
            , pAirlineID: ($('#slOperationPartnerTypes option:selected').attr("PartnerTypeID") == constAirlinePartnerTypeID //Airline
                ? ($("#" + pSlPartnerControlName).val() == "" ? 0 : $("#" + pSlPartnerControlName).val())
                : 0)
            , pTruckerID: ($('#slOperationPartnerTypes option:selected').attr("PartnerTypeID") == constTruckerPartnerTypeID //Trucker
                ? ($("#" + pSlPartnerControlName).val() == "" ? 0 : $("#" + pSlPartnerControlName).val())
                : 0)
            , pSupplierID: ($('#slOperationPartnerTypes option:selected').attr("PartnerTypeID") == constSupplierPartnerTypeID //Supplier
                ? ($("#" + pSlPartnerControlName).val() == "" ? 0 : $("#" + pSlPartnerControlName).val())
                : 0)
            , pCustodyID: ($('#slOperationPartnerTypes option:selected').attr("PartnerTypeID") == constCustodyPartnerTypeID //Custody
                ? ($("#" + pSlPartnerControlName).val() == "" ? 0 : $("#" + pSlPartnerControlName).val())
                : 0)
            , pContactID: ($('#slPartnerContacts option:selected').val() == "" ? 0 : $('#slPartnerContacts option:selected').val())
            , pDirectionType: $('input[name=cbDirectionType]:checked').val() //to decide wether to set shipper or consignee in Operations
            , pIsOperationClient: $("#cbIsOperationClient").prop("checked")
        }, pSaveandAddNew, "PartnerModal", function () {
            if (pDefaults.UnEditableCompanyName == "USC") {
                pOperationHeader_Global.TruckerID = truckerID;
            }
            LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/OperationPartners/LoadWithWhereClause", " where OperationID = " + $("#hOperationID").val(), 0, 1000
                , function (pData) {
                    OperationPartners_BindTableRows(JSON.parse(pData[0]));
                    ////Set lblClient, lblAgent,.... in cases it changes
                    if ($("#cbIsOperationClient").prop("checked")) {
                        $("#lblClient").html(": " + $("#" + pSlPartnerControlName + " option:selected").text());
                    }
                    if ($('#slOperationPartnerTypes option:selected').attr("PartnerTypeID") == constAgentPartnerTypeID && $("#lblAgent").html() == "0") {
                        $("#lblAgent").html(": " + $("#" + pSlPartnerControlName + " option:selected").text());
                    }
                    GetListWithOpCodeAndHouseNoAndClientEmailAttr($("#hOperationID").val(), "/api/Operations/LoadWithParameters", null, "slDocsOutOperations"
                        , { pPageNumber: 1, pPageSize: 99999, pWhereClause: " WHERE ID = " + $("#hOperationID").val() + " OR MasterOperationID = " + $("#hOperationID").val(), pOrderBy: "HouseNumber" }
                        , function () { $("#slEditInvoiceOperations").html($("#slDocsOutOperations").html()); });
                });
        });
    }
}
function OperationPartners_Update(pSaveandAddNew) {
    debugger;
    if ($("#slPartners").val() == "" || ($("#slPartners").val() == null && $("#slPartners_Customers").val() == null) || $("#slPartners").val() == 0)
        swal("Sorry", "Please, select partner.");
    else {
        //TODO on saving partner: save new values for $("#hShipperID").val(), $("#hConsigneeID").val(), $("#hShipperContactID").val() and $("#hConsigneeContactID").val() (this is done in the controller)
        let truckerID = ($('#slOperationPartnerTypes option:selected').attr("PartnerTypeID") == constTruckerPartnerTypeID //Trucker
            ? ($("#" + pSlPartnerControlName).val() == "" ? 0 : $("#" + pSlPartnerControlName).val())
            : 0);
        InsertUpdateFunction("form", "/api/OperationPartners/Update", {
            pID: $("#hOperationPartnerID").val()
            , pOperationID: $("#hOperationID").val()
            , pBLType: $("#hBLType").val()
            , pOperationPartnerTypeID: $('#slOperationPartnerTypes option:selected').val()
            , pCustomerID: ($('#slOperationPartnerTypes option:selected').attr("PartnerTypeID") == constCustomerPartnerTypeID //Customer(shipper, exporter, consignee, notify,BookingParty,Owner,Client)
                ? ($("#" + pSlPartnerControlName).val() == "" ? 0 : $("#" + pSlPartnerControlName).val())
                    : 0)
            , pAgentID: ($('#slOperationPartnerTypes option:selected').attr("PartnerTypeID") == constAgentPartnerTypeID //Agent
                ? ($("#" + pSlPartnerControlName).val() == "" ? 0 : $("#" + pSlPartnerControlName).val())
                    : 0)
            , pShippingAgentID: ($('#slOperationPartnerTypes option:selected').attr("PartnerTypeID") == constShippingAgentPartnerTypeID //ShippingAgent
                ? ($("#" + pSlPartnerControlName).val() == "" ? 0 : $("#" + pSlPartnerControlName).val())
                    : 0)
            , pCustomsClearanceAgentID: ($('#slOperationPartnerTypes option:selected').attr("PartnerTypeID") == constCustomsClearanceAgentPartnerTypeID //CustomsClearanceAgent
                ? ($("#" + pSlPartnerControlName).val() == "" ? 0 : $("#" + pSlPartnerControlName).val())
                    : 0)
            , pShippingLineID: ($('#slOperationPartnerTypes option:selected').attr("PartnerTypeID") == constShippingLinePartnerTypeID //ShippingLine
                ? ($("#" + pSlPartnerControlName).val() == "" ? 0 : $("#" + pSlPartnerControlName).val())
                    : 0)
            , pAirlineID: ($('#slOperationPartnerTypes option:selected').attr("PartnerTypeID") == constAirlinePartnerTypeID //Airline
                ? ($("#" + pSlPartnerControlName).val() == "" ? 0 : $("#" + pSlPartnerControlName).val())
                    : 0)
            , pTruckerID: ($('#slOperationPartnerTypes option:selected').attr("PartnerTypeID") == constTruckerPartnerTypeID //Trucker
                ? ($("#" + pSlPartnerControlName).val() == "" ? 0 : $("#" + pSlPartnerControlName).val())
                    : 0)
            , pSupplierID: ($('#slOperationPartnerTypes option:selected').attr("PartnerTypeID") == constSupplierPartnerTypeID //Supplier
                ? ($("#" + pSlPartnerControlName).val() == "" ? 0 : $("#" + pSlPartnerControlName).val())
                    : 0)
            , pCustodyID: ($('#slOperationPartnerTypes option:selected').attr("PartnerTypeID") == constCustodyPartnerTypeID //Custody
                ? ($("#" + pSlPartnerControlName).val() == "" ? 0 : $("#" + pSlPartnerControlName).val())
                    : 0)
            , pContactID: ($('#slPartnerContacts option:selected').val() == "" ? 0 : $('#slPartnerContacts option:selected').val())
            , pDirectionType: $('input[name=cbDirectionType]:checked').val() //to decide wether to set shipper or consignee in Operations
            , pPartnerID: $("#" + pSlPartnerControlName + " option:selected").val() == "" ? 0 : $("#" + pSlPartnerControlName + " option:selected").val()
            , pIsOperationClient: $("#cbIsOperationClient").prop("checked")
        }, pSaveandAddNew, "PartnerModal", function () {
            LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/OperationPartners/LoadWithWhereClause", " where OperationID = " + $("#hOperationID").val(), 0, 1000
                , function (pData) {
                    if (pDefaults.UnEditableCompanyName == "USC") {
                        pOperationHeader_Global.TruckerID = truckerID;
                    }
                    OperationPartners_BindTableRows(JSON.parse(pData[0]));
                    ////Set lblClient, lblAgent,.... in cases it changes
                    if ($("#cbIsOperationClient").prop("checked")) {
                        $("#lblClient").html(": " + $("#" + pSlPartnerControlName + " option:selected").text());
                        $("#hClientEmail").val("");
                    }
                    if ($('#slOperationPartnerTypes option:selected').attr("PartnerTypeID") == constAgentPartnerTypeID) {
                        $("#lblAgent").html(": " + $("#" + pSlPartnerControlName + " option:selected").text());
                    }
                    pOperationHeader_Global.ClientEmail = "";
                });
            Payables_LoadWithPagingWithWhereClause($("#hOperationID").val());//to refresh supplier if was choosen
            GetListWithOpCodeAndHouseNoAndClientEmailAttr($("#hOperationID").val(), "/api/Operations/LoadWithParameters", null, "slDocsOutOperations"
                , { pPageNumber: 1, pPageSize: 99999, pWhereClause: " WHERE ID = " + $("#hOperationID").val() + " OR MasterOperationID = " + $("#hOperationID").val(), pOrderBy: "HouseNumber" }
                , function () { $("#slEditInvoiceOperations").html($("#slDocsOutOperations").html()); });
        });
    }
}
function OperationPartners_EditByDblClick(pID) {
    jQuery("#PartnerModal").modal("show");
    OperationPartners_FillControls(pID);
}
function OperationPartners_DeleteList(callback) {
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblOperationPartners') != "")
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
            DeleteListFunction("/api/OperationPartners/Delete"
                , { "pOperationPartnersIDs": GetAllSelectedIDsAsString('tblOperationPartners') }
                , function () {
                    OperationPartners_LoadWithPagingWithWhereClause($("#hOperationID").val());
                });
        });
    //DeleteListFunction("/api/OperationPartners/Delete", { "pOperationPartnersIDs": GetAllSelectedIDsAsString('tblOperationPartners') }, function () { LoadViews("OperationsEdit", null, $("#hOperationID").val()); });
}
function OperationPartners_FillControls(pID) {
    debugger;
    FadePageCover(true);
    ClearAll("#PartnerModal");
    $("#cbIsOperationClient").prop("checked", $("#cbIsOperationClient" + pID).prop("checked"));
    $("#hOperationPartnerID").val(pID);
    debugger;
    var tr = $("#tblOperationPartners tr[ID='" + pID + "']");
    var pOperationPartnerTypeID = $(tr).find("td.PartnerType").attr('val');
    var pPartnerID = $(tr).find("td.PartnerName").attr('val');
    var pContactID = $(tr).find("td.ContactName").attr('val'); //gets the ContactID
    var pUsedInPayablesCount = $(tr).find("td.OperationPartnerUsedInPayablesCount").text();
    var pUsedInInvoicesCount = $(tr).find("td.OperationPartnerUsedInInvoicesCount").text();

    $("#slOperationPartnerTypes").val(pOperationPartnerTypeID);
    $("#slOperationPartnerTypes").css({ "width": "100%" }).select2();

    if (pOperationPartnerTypeID == constShipperOperationPartnerTypeID || pOperationPartnerTypeID == constConsigneeOperationPartnerTypeID
        || pOperationPartnerTypeID == constAgentOperationPartnerTypeID || pOperationPartnerTypeID == constExporterOperationPartnerTypeID
        || pOperationPartnerTypeID == constImporterOperationPartnerTypeID || pOperationPartnerTypeID == constBookingPartyOperationPartnerTypeID
        || pOperationPartnerTypeID == constOwnerOperationPartnerTypeID || pOperationPartnerTypeID == constClientOperationPartnerTypeID
        || pOperationPartnerTypeID == constEndUserOperationPartnerTypeID)
        $("#divCbIsOperationClient").removeClass("hide");
    else
    { $("#divCbIsOperationClient").addClass("hide"); $("#cbIsOperationClient").prop("checked", false); }
    //2 levels callback of callback
    //OperationPartnerTypes_GetList(pOperationPartnerTypeID
    //    , function () {
            PartnerNames_GetList(pPartnerID,
                function () {
                    PartnerContacts_GetList(pContactID, pPartnerID, function () { FadePageCover(false); });
                    OperationPartners_ShowHideAddEditButtons();
                });
    if ($('#slPartners_Customers').find("option[value='" + pPartnerID + "']").length) {
        $('#slPartners_Customers').val(pPartnerID).trigger('change');
    } else {
        let newOption = new Option($(tr).find("td.PartnerName").text(), pPartnerID, true, true);
        $('#slPartners_Customers').append(newOption).trigger('change');
    }
        //});

    if (pUsedInInvoicesCount > 0 || pUsedInPayablesCount > 0
        || (pOperationPartnerTypeID == constConsigneeOperationPartnerTypeID && $("#cbIsImport").prop("checked") /*&& !$("#cbIsMaster").prop("checked")*/)
        || (pOperationPartnerTypeID == constShipperOperationPartnerTypeID && ($("#cbIsExport").prop("checked") || $("#cbIsDomestic").prop("checked")) /*&& $("#cbIsMaster").prop("checked")*/)
        || (pOperationPartnerTypeID == constAgentOperationPartnerTypeID && $("#cbIsMaster").prop("checked"))
        ) {
        $("#slOperationPartnerTypes").attr("disabled", "disabled");
    }
    else {
        $("#slOperationPartnerTypes").removeAttr("disabled");
    }

    if (pUsedInInvoicesCount > 0 || pUsedInPayablesCount > 0) {
        $("#" + pSlPartnerControlName).attr("disabled", "disabled");
        $("#btn-EditPartner").attr("disabled", "disabled");
        $("#btn-NewAddPartner").attr("disabled", "disabled");
    }
    else {
        $("#" + pSlPartnerControlName).removeAttr("disabled");
        $("#btn-EditPartner").removeAttr("disabled");
        $("#btn-NewAddPartner").removeAttr("disabled");
    }

    $("#lblPartnerShown").html(": " + $(tr).find("td.PartnerType").text());

    $("#btnSavePartner").attr("onclick", "OperationPartners_Update(false);");
    $("#btnSaveandNewPartner").attr("onclick", "OperationPartners_Update(true);");
}
function OperationPartners_ClearAllControls(callback) {
    debugger;
    ClearAll("#PartnerModal");
    $("#slOperationPartnerTypes").css({ "width": "100%" }).select2();

    $("#cbIsOperationClient").prop("checked", false);
    $("#slOperationPartnerTypes").removeAttr("disabled");
    $("#" + pSlPartnerControlName).removeAttr("disabled");
    $("#slPartners").html("<option>" + TranslateString("SelectFromMenu") + "</option>");
    {
        pSlPartnerControlName = "slPartners";
        $("#slPartners_Customers").addClass("hide");
        $("#slPartners_Customers").next().addClass("hide");
        $("#slPartners").removeClass("hide");
        $("#slPartners").next().removeClass("hide");
    }
    //the next properties are removed, but then added again when a partner type is selected
    $("#btn-NewAddPartner").prop("onclick", null);
    $("#btn-NewAddPartner").removeAttr("data-target");
    $("#btn-EditPartner").prop("onclick", null);
    $("#btn-EditPartner").removeAttr("data-target");

    $("#btnSavePartner").attr("onclick", "OperationPartners_Insert(false);");
    $("#btnSaveandNewPartner").attr("onclick", "OperationPartners_Insert(true);");

    if (callback != null && callback != undefined)
        callback();
}
function OperationPartners_CheckIfValueIsFoundInTable(pTableName, ptdClassName, pValue) {
    debugger;
    var _IsFound = false;
    for (var i = 0; i < $("#" + pTableName + " tbody tr").length; i++) {
        if ($("#" + pTableName + " tbody tr:eq(" + i + ") td." + ptdClassName).attr("val") == pValue)
            return true;
    }
    return _IsFound;
}
function OperationPartners_ShowHideAddEditButtons() {
    //if ($('#slOperationPartnerTypes option:selected').attr("PartnerTypeID") == constShippingLinePartnerTypeID || $('#slOperationPartnerTypes option:selected').attr("PartnerTypeID") == constAirlinePartnerTypeID || $('#slOperationPartnerTypes option:selected').attr("PartnerTypeID") == constTruckerPartnerTypeID) {
    //    $("#btn-NewAddPartner").addClass("hide");
    //    $("#btn-EditPartner").addClass("hide");
    //}
    //else {
    //    $("#btn-NewAddPartner").removeClass("hide");
    //    $("#btn-EditPartner").removeClass("hide");
    //}
    if ($('#slOperationPartnerTypes option:selected').attr("PartnerTypeID") == constShippingLinePartnerTypeID || $('#slOperationPartnerTypes option:selected').attr("PartnerTypeID") == constAirlinePartnerTypeID || $('#slOperationPartnerTypes option:selected').attr("PartnerTypeID") == constTruckerPartnerTypeID || $('#slOperationPartnerTypes option:selected').attr("PartnerTypeID") == constCustodyPartnerTypeID) {
        $("#btn-NewAddPartner").addClass("hide");
        $("#btn-EditPartner").addClass("hide");
    }
    else {
        if (CustomerAdd) $("#btn-NewAddPartner").removeClass("hide"); else $("#btn-NewAddPartner").addClass("hide");
        if (CustomerEdit) $("#btn-EditPartner").removeClass("hide"); else $("#btn-EditPartner").addClass("hide");
    }
    if (pDefaults.UnEditableCompanyName == "LATT") {
        $("#btn-NewAddPartner").addClass("hide");
        $("#btn-EditPartner").addClass("hide");
    }
}
//Functions for editing partners called from outside
function Agents_FillControlsFromOperationPartners(pID, callback) {
    debugger;
    //ClearAll("#PartnerModal");
    intPartnerTypeID = 2;
    if (pID == "") { //no selected client to edit so hide the modal
        //$("#AgentModal").modal("show");
        swal(strPlease, "Select an agent.", "warning");
        $("#AgentModal").addClass("hide");
    }
    else {
        $("#AgentModal").removeClass("hide");
        //$("#btnAgentClose").attr("onclick", "Agents_UnlockRecord(3);");//to handle the problem of restarting if unlocked
        //Check("/api/Agents/CheckRow", { 'pID': pID }, function () {
        LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Agents/LoadAll", " where ID = " + pID, 0, 10, function (pTabelRows) {   //i am sure i ve just 1 row isa
            $.each(pTabelRows, function (i, item) {
                //next line is to check if row is locked by another user

                // Fill All Modal Controls
                debugger;
                $("#hAgentID").val(pID);

                //the next 6 lines are to set the slPaymentTerms, slCurrencies and slTaxeTypes to the value entered before
                var pPaymentTermID = item.PaymentTermID;
                Agent_PaymentTerms_GetList(pPaymentTermID, null);
                var pCurrencyID = item.CurrencyID;
                Agent_Currencies_GetList(pCurrencyID, null);
                var pTaxeTypeID = item.TaxeTypeID;
                Agent_TaxeTypes_GetList(pTaxeTypeID, null);
                var pNetworkID = item.NetworkID;
                Agent_Network_GetList(pNetworkID, null);

                //the next line is to get the Agent addresses and Contacts info (PartnerTypeID for Agents is 4)
                Addresses_LoadWithPagingWithWhereClause(intPartnerTypeID);
                Contacts_LoadWithPagingWithWhereClause(intPartnerTypeID);
                AgentNetwork_LoadingWithPagingForModal(pID);
                debugger;

                $("#lblAgentShown").html(": " + item.Name);
                $("#txtAgentCode").val(item.Code);
                $("#txtAgentName").val(item.Name);
                $("#txtAgentLocalName").val(item.LocalName == 0 ? "" : item.LocalName);
                $("#txtAgentWebsite").val(item.Website == 0 ? "" : item.Website);
                $("#txtAgentEmail").val(item.Email == 0 ? "" : item.Email);
                $("#btnAgentVisitWebsite").attr('href', 'http://' + $("#txtWebsite").val());

                $("#cbAgentIsInactive").prop('checked', item.IsInactive);
                $("#txtAgentNotes").val(item.Notes == 0 ? "" : item.Notes);
                $("#txtAgentAddress").val(item.Address);
                $("#txtAgentPhonesAndFaxes").val(item.PhonesAndFaxes);
                $("#txtAgentVATNumber").val(item.VATNumber == 0 ? "" : item.VATNumber);
                $("#cbAgentIsConsolidatedInvoice").prop('checked', item.IsConsolidatedInvoice);
                $("#txtAgentBankName").val(item.BankName);
                $("#txtAgentBankAddress").val(item.BankAddress);
                $("#txtAgentSwift").val(item.Swift);
                $("#txtAgentBankAccountNumber").val(item.BankAccountNumber == 0 ? "" : item.BankAccountNumber);
                $("#txtAgentIBANNumber").val(item.IBANNumber == 0 ? "" : item.IBANNumber);

                //parameter in the next lines are 1:Quotations call, 2:Operations call, 3:OperationPartners Call
                $("#btnSaveAgent").attr("onclick", "Agents_Update(false, 3);");
                $("#btnSaveandNewAgent").attr("onclick", "Agents_Update(true, 3);");
                $("#btnAgentClose").attr("onclick", "Agents_UnlockRecord(3);");

                //to set the wizard to BasicData
                $("#stepsBasicDataAgent").parent().children().removeClass("active");
                $("#stepsBasicDataAgent").addClass("active");
                $("#BasicDataAgent").parent().children().removeClass("active");
                $("#BasicDataAgent").addClass("active");
                //to hide Contacts and Addresses tabs in case of partner is not saved yet
                Agents_ShowHideTabs();
            });
        });
        //} //the closing brace of the callback fn in the Check()
        //, intPartnerTypeID);//this parameter is the 4th parameter in Check(), and it hold the partnertypeID coz i changes the btnClose ID's
        if (callback != null && callback != "undefined")
            callback(); // to reload the selectbox with the new values
    }
}
function CustomsClearanceAgents_FillControlsFromOperationPartners(pID, callback) {
    debugger;
    intPartnerTypeID = 4;
    if (pID == "") { //no selected client to edit so hide the modal
        //$("#CustomsClearanceAgentModal").modal("show");
        swal(strPlease, "Select a Client.", "warning");
        $("#CustomsClearanceAgentModal").addClass("hide");
    }
    else {
        $("#CustomsClearanceAgentModal").removeClass("hide");
        //$("#btnCustomsClearanceAgentClose").attr("onclick", "CustomsClearanceAgents_UnlockRecord(3);");//to handle the problem of restarting if unlocked
        //Check("/api/CustomsClearanceAgents/CheckRow", { 'pID': pID }, function () {
        LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/CustomsClearanceAgents/LoadAll", " where ID = " + pID, 0, 10, function (pTabelRows) {   //i am sure i ve just 1 row isa
            $.each(pTabelRows, function (i, item) {
                //next line is to check if row is locked by another user

                // Fill All Modal Controls
                debugger;
                $("#hCustomsClearanceAgentID").val(pID);

                //the next 6 lines are to set the slPaymentTerms, slCurrencies and slTaxeTypes to the value entered before
                var pPaymentTermID = item.PaymentTermID;
                CustomsClearanceAgent_PaymentTerms_GetList(pPaymentTermID, null);
                var pCurrencyID = item.CurrencyID;
                CustomsClearanceAgent_Currencies_GetList(pCurrencyID, null);
                var pTaxeTypeID = item.TaxeTypeID;
                CustomsClearanceAgent_TaxeTypes_GetList(pTaxeTypeID, null);

                //the next line is to get the CustomsClearanceAgent addresses and Contacts info (PartnerTypeID for CustomsClearanceAgents is 4)
                Addresses_LoadWithPagingWithWhereClause(intPartnerTypeID);
                Contacts_LoadWithPagingWithWhereClause(intPartnerTypeID);
                debugger;

                $("#lblCustomsClearanceAgentShown").html(": " + item.Name);
                $("#txtCustomsClearanceAgentCode").val(item.Code);
                $("#txtCustomsClearanceAgentName").val(item.Name);
                $("#txtCustomsClearanceAgentLocalName").val(item.LocalName);
                $("#txtCustomsClearanceAgentWebsite").val(item.Website);
                $("#btnCustomsClearanceAgentVisitWebsite").attr('href', 'http://' + $("#txtCustomsClearanceAgentWebsite").val());
                $("#cbCustomsClearanceAgentIsInactive").prop('checked', item.IsInactive);
                $("#txtCustomsClearanceAgentNotes").val(item.Notes);
                $("#txtCustomsClearanceAgentVATNumber").val(item.VATNumber);
                $("#cbCustomsClearanceAgentIsConsolidatedInvoice").prop('checked', item.IsConsolidatedInvoice);
                $("#txtCustomsClearanceAgentBankName").val(item.BankName);
                $("#txtCustomsClearanceAgentBankAddress").val(item.BankAddress);
                $("#txtCustomsClearanceAgentSwift").val(item.Swift);
                $("#txtCustomsClearanceAgentBankAccountNumber").val(item.BankAccountNumber);
                $("#txtCustomsClearanceAgentIBANNumber").val(item.IBANNumber);

                //parameter in the next lines are 1:Quotations call, 2:Operations call, 3:OperationPartners Call
                $("#btnSaveCustomsClearanceAgent").attr("onclick", "CustomsClearanceAgents_Update(false, 3);");
                $("#btnSaveandNewCustomsClearanceAgent").attr("onclick", "CustomsClearanceAgents_Update(true, 3);");
                $("#btnCustomsClearanceAgentClose").attr("onclick", "CustomsClearanceAgents_UnlockRecord(3);");

                //to set the wizard to BasicData
                $("#stepsBasicDataCustomsClearanceAgent").parent().children().removeClass("active");
                $("#stepsBasicDataCustomsClearanceAgent").addClass("active");
                $("#BasicDataCustomsClearanceAgent").parent().children().removeClass("active");
                $("#BasicDataCustomsClearanceAgent").addClass("active");
                //to hide Contacts and Addresses tabs in case of partner is not saved yet
                CustomsClearanceAgents_ShowHideTabs();
            });
        });
        //} //the closing brace of the callback fn in the Check()
        //, intPartnerTypeID);//this parameter is the 4th parameter in Check(), and it hold the partnertypeID coz i changes the btnClose ID's
        if (callback != null && callback != "undefined")
            callback(); // to reload the selectbox with the new values
    }
}
function ShippingAgents_FillControlsFromOperationPartners(pID, callback) {
    debugger;
    intPartnerTypeID = 3;
    if (pID == "") { //no selected client to edit so hide the modal
        //$("#ShippingAgentModal").modal("show");
        swal(strPlease, "Select a Client.", "warning");
        $("#ShippingAgentModal").addClass("hide");
    }
    else {
        $("#ShippingAgentModal").removeClass("hide");
        //$("#btnShippingAgentClose").attr("onclick", "ShippingAgents_UnlockRecord(3);");//to handle the problem of restarting if unlocked
        //Check("/api/ShippingAgents/CheckRow", { 'pID': pID }, function () {
        LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/ShippingAgents/LoadAll", " where ID = " + pID, 0, 10, function (pTabelRows) {   //i am sure i ve just 1 row isa
            $.each(pTabelRows, function (i, item) {
                //next line is to check if row is locked by another user

                // Fill All Modal Controls
                debugger;
                $("#hShippingAgentID").val(pID);

                //the next 6 lines are to set the slPaymentTerms, slCurrencies and slTaxeTypes to the value entered before
                var pPaymentTermID = item.PaymentTermID;
                ShippingAgent_PaymentTerms_GetList(pPaymentTermID, null);
                var pCurrencyID = item.CurrencyID;
                ShippingAgent_Currencies_GetList(pCurrencyID, null);
                var pTaxeTypeID = item.TaxeTypeID;
                ShippingAgent_TaxeTypes_GetList(pTaxeTypeID, null);

                //the next line is to get the ShippingAgent addresses and Contacts info (PartnerTypeID for ShippingAgents is 4)
                Addresses_LoadWithPagingWithWhereClause(intPartnerTypeID);
                Contacts_LoadWithPagingWithWhereClause(intPartnerTypeID);
                debugger;

                $("#lblShippingAgentShown").html(": " + item.Name);
                $("#txtShippingAgentCode").val(item.Code);
                $("#txtShippingAgentName").val(item.Name);
                $("#txtShippingAgentLocalName").val(item.LocalName);
                $("#txtShippingAgentWebsite").val(item.Website);
                $("#btnShippingAgentVisitWebsite").attr('href', 'http://' + $("#txtShippingAgentWebsite").val());
                $("#cbShippingAgentIsInactive").prop('checked', item.IsInactive);
                $("#txtShippingAgentNotes").val(item.Notes);
                $("#txtShippingAgentForwarderAccountNumber").val(item.ForwarderAccountNumber);
                $("#txtShippingAgentForwarderCreditNumber").val(item.ForwarderCreditNumber);
                $("#txtShippingAgentLocalCustomsCode").val(item.LocalCustomsCode);
                $("#txtShippingAgentVATNumber").val(item.VATNumber);
                $("#cbShippingAgentIsConsolidatedInvoice").prop('checked', item.IsConsolidatedInvoice);
                $("#txtShippingAgentBankName").val(item.BankName);
                $("#txtShippingAgentBankAddress").val(item.BankAddress);
                $("#txtShippingAgentSwift").val(item.Swift);
                $("#txtShippingAgentBankAccountNumber").val(item.BankAccountNumber);
                $("#txtShippingAgentIBANNumber").val(item.IBANNumber);

                //parameter in the next lines are 1:Quotations call, 2:Operations call, 3:OperationPartners Call
                $("#btnSaveShippingAgent").attr("onclick", "ShippingAgents_Update(false, 3);");
                $("#btnSaveandNewShippingAgent").attr("onclick", "ShippingAgents_Update(true, 3);");
                $("#btnShippingAgentClose").attr("onclick", "ShippingAgents_UnlockRecord(3);");

                //to set the wizard to BasicData
                $("#stepsBasicDataShippingAgent").parent().children().removeClass("active");
                $("#stepsBasicDataShippingAgent").addClass("active");
                $("#BasicDataShippingAgent").parent().children().removeClass("active");
                $("#BasicDataShippingAgent").addClass("active");
                //to hide Contacts and Addresses tabs in case of partner is not saved yet
                ShippingAgents_ShowHideTabs();
            });
        });
        //} //the closing brace of the callback fn in the Check()
        //, intPartnerTypeID);//this parameter is the 4th parameter in Check(), and it hold the partnertypeID coz i changes the btnClose ID's
        if (callback != null && callback != "undefined")
            callback(); // to reload the selectbox with the new values
    }
}
function Suppliers_FillControlsFromOperationPartners(pID, callback) {
    debugger;
    intPartnerTypeID = 8;
    $(".classHideOutsidePartners").addClass("hide");
    if (pID == "") { //no selected client to edit so hide the modal
        //$("#SupplierModal").modal("show");
        swal(strPlease, "Select a Client.", "warning");
        $("#SupplierModal").addClass("hide");
    }
    else {
        $("#SupplierModal").removeClass("hide");
        //$("#btnSupplierClose").attr("onclick", "Suppliers_UnlockRecord(3);");//to handle the problem of restarting if unlocked
        //Check("/api/Suppliers/CheckRow", { 'pID': pID }, function () {
        LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Suppliers/LoadAll", " where ID = " + pID, 0, 10, function (pTabelRows) {   //i am sure i ve just 1 row isa
            $.each(pTabelRows, function (i, item) {
                //next line is to check if row is locked by another user

                // Fill All Modal Controls
                debugger;
                $("#hSupplierID").val(pID);
                let b = item.BranchID == 0 ? "" : item.BranchID;
                let c = item.CreditorGroupID == 0 ? "" : item.CreditorGroupID;
                let s = item.SalesmanID == 0 ? "" : item.SalesmanID;

                CallGETFunctionWithParameters("/api/Suppliers/LoadSuppliersModalComboBoxes", { pDummy: true }, function (pData) {
                    FillListFromObject(b, 2, TranslateString("SelectFromMenu"), "slSupplierBranchID", pData[0], null);
                    FillListFromObject(c, 2, TranslateString("SelectFromMenu"), "slSupplierCreditorGroupID", pData[1], null);
                    FillListFromObject(s, 2, TranslateString("SelectFromMenu"), "slSupplierSalesmanID", pData[2], null);
                }, null, false);
                $("#txtSupplierCRM_Code").val(item.CRM_Code);

                //the next 6 lines are to set the slPaymentTerms, slCurrencies and slTaxeTypes to the value entered before
                var pPaymentTermID = item.PaymentTermID;
                Supplier_PaymentTerms_GetList(pPaymentTermID, null);
                var pCurrencyID = item.CurrencyID;
                Supplier_Currencies_GetList(pCurrencyID, null);
                var pTaxeTypeID = item.TaxeTypeID;
                Supplier_TaxeTypes_GetList(pTaxeTypeID, null);

                //the next line is to get the Supplier addresses and Contacts info (PartnerTypeID for Suppliers is 4)
                Addresses_LoadWithPagingWithWhereClause(intPartnerTypeID);
                Contacts_LoadWithPagingWithWhereClause(intPartnerTypeID);
                debugger;

                $("#lblSupplierShown").html(": " + item.Name);
                $("#txtSupplierCode").val(item.Code);
                $("#txtSupplierName").val(item.Name);
                $("#txtSupplierLocalName").val(item.LocalName);
                $("#txtSupplierWebsite").val(item.Website);
                $("#btnSupplierVisitWebsite").attr('href', 'http://' + $("#txtSupplierWebsite").val());
                $("#cbSupplierIsInactive").prop('checked', item.IsInactive);
                $("#txtSupplierNotes").val(item.Notes);
                $("#txtSupplierVATNumber").val(item.VATNumber);
                $("#cbSupplierIsConsolidatedInvoice").prop('checked', item.IsConsolidatedInvoice);
                $("#txtSupplierBankName").val(item.BankName);
                $("#txtSupplierBankAddress").val(item.BankAddress);
                $("#txtSupplierSwift").val(item.Swift);
                $("#txtSupplierBankAccountNumber").val(item.BankAccountNumber);
                $("#txtSupplierIBANNumber").val(item.IBANNumber);

                //parameter in the next lines are 1:Quotations call, 2:Operations call, 3:OperationPartners Call
                $("#btnSaveSupplier").attr("onclick", "Suppliers_Update(false, 3);");
                $("#btnSaveandNewSupplier").attr("onclick", "Suppliers_Update(true, 3);");
                $("#btnSupplierClose").attr("onclick", "Suppliers_UnlockRecord(3);");

                //to set the wizard to BasicData
                $("#stepsBasicDataSupplier").parent().children().removeClass("active");
                $("#stepsBasicDataSupplier").addClass("active");
                $("#BasicDataSupplier").parent().children().removeClass("active");
                $("#BasicDataSupplier").addClass("active");
                //to hide Contacts and Addresses tabs in case of partner is not saved yet
                Suppliers_ShowHideTabs();
            });
        });
        //} //the closing brace of the callback fn in the Check()
        //    , intPartnerTypeID);//this parameter is the 4th parameter in Check(), and it hold the partnertypeID coz i changes the btnClose ID's
        if (callback != null && callback != "undefined")
            callback(); // to reload the selectbox with the new values
    }
}

function OperationPartnerTypes_GetList(pID, callback) { //the first parameter is used in case of editing to set the code or name to its original value
    var pWhereClause = "";
    //pWhereClause = " WHERE ID NOT IN (SELECT OP.OperationPartnerTypeID From OperationPartners OP ";
    //pWhereClause += " 					WHERE OP.OperationID = " + $('#hOperationID').val() + ")";
    //pWhereClause += (pID != null && pID != undefined ? " OR ID = " + pID : ""); //this is fill so i need to retreive the edited type too
    //pWhereClause += " ORDER BY ViewOrder ";

    ////only 1 shipper, 1 consignee, 1 agent BUT any no of other partners
    //pWhereClause = " WHERE ID NOT IN (" + constShipperOperationPartnerTypeID + "," + constConsigneeOperationPartnerTypeID + "," + constAgentOperationPartnerTypeID + ")";
    //pWhereClause += (pID != null && pID != undefined ? " OR ID = " + pID : ""); //this is fill so i need to retreive the edited type too
    pWhereClause += " ORDER BY Name ";

    //parameters: ID, strFnName, First Row in select list, select list name, WhereClause
    //GetListWithOperationPartnerTypesCodeAndWhereClauseAndPartnerTypeAttr(pID, "/api/NoAccessOperationPartnerTypes/LoadAll", "Select Partner Type", "slOperationPartnerTypes", pWhereClause);
    GetListWithOperationPartnerTypesCodeAndWhereClauseAndPartnerTypeAttr(pID, "/api/NoAccessOperationPartnerTypes/LoadAll", "Select Partner Type", "slOperationPartnerTypes", pWhereClause
        , function () { //this callback inside the callback is to fill the slPartnerContacts
            if (callback != null && callback != undefined)
                callback();
        });
}
function PartnerNames_GetList(pID, callback) {
    debugger;
    if ($("#slOperationPartnerTypes option:selected").attr("PartnerTypeID") != undefined) {
        if ($("#slOperationPartnerTypes").val() != 0 /*&& (arguments.callee.caller).arguments.callee.caller.name != "trigger"*/)
            FadePageCover(true);
        if ($("#slOperationPartnerTypes option:selected").attr("PartnerTypeID") == constCustomerPartnerTypeID) { //Customer
            pSlPartnerControlName = "slPartners_Customers";
            $("#slPartners").addClass("hide");
            $("#slPartners").next().addClass("hide");
            $("#slPartners_Customers").removeClass("hide");
            $("#slPartners_Customers").next().removeClass("hide");
        }
        else {
            pSlPartnerControlName = "slPartners";
            $("#slPartners_Customers").addClass("hide");
            $("#slPartners_Customers").next().addClass("hide");
            $("#slPartners").removeClass("hide");
            $("#slPartners").next().removeClass("hide");
        }
        if ($("#slOperationPartnerTypes").val() != "0" && $("#slOperationPartnerTypes").val() != "")
            $("#lblPartnerShown").html(": " + $("#slOperationPartnerTypes option:selected").text());
        else
            $("#lblPartnerShown").html("");
        $("#slPartnerContacts").html("<option value=''>" + TranslateString("SelectFromMenu") + "</option>"); //PartnerContacts_GetList(0, 0, function () { FadePageCover(false); });
        if ($("#slOperationPartnerTypes option:selected").attr("PartnerTypeID") == constCustomerPartnerTypeID) { //Customer
            $("#divCbIsOperationClient").removeClass("hide");
            if ($("#slPartners_Customers option").length < 2) {
                //$("#slPartners_Customers").html($("#hReadySlCustomers").html());
                Select2OnlineSearch("slPartners_Customers", "/api/Customers/LoadAllCustomersForSlReadyCustomers", function (params) {
                    var query = {
                        pWhereClauseWithMinimalColumns: " WHERE IsInactive=0 AND Name like N'%" + params.term + "%'",
                        pOrderBy: "Name",
                        pDummy: false
                    }
                    return query;
                }, function (data) {
                    var d = JSON.parse(data[0]);
                    return {
                        results: $.map(d, function (item) {
                            return {
                                text: item.Name,
                                id: item.ID,
                                value: item.ID
                            };
                        })
                    };
                }, 3, 2000);
            }
            $("#" + pSlPartnerControlName).val(pID == 0 || pID == null ? "" : pID);
            $("#slPartners_Customers").trigger("change");
            //set adding/editing Partners buttoms to call the correct modal
            //parameter in the next 2 lines are 1:Quotations call, 2:Operations call
            $("#btn-NewAddPartner").attr("onclick", "Customers_ClearAllControls(3);");
            $("#btn-NewAddPartner").attr("data-target", "#CustomerModal");
            $("#btn-EditPartner").attr("onclick", "Customers_FillControlsFromOperations($('#" + pSlPartnerControlName + " option:selected').val(), null, 3);");//the 3rd paramete 3 means called from operationPartners, 2 means add new operation
            $("#btn-EditPartner").attr("data-target", "#CustomerModal");
            if (callback != null && callback != undefined)
                callback();
        }
        else //Agent
            if ($("#slOperationPartnerTypes option:selected").attr("PartnerTypeID") == constAgentPartnerTypeID) {
                $("#slPartnerContacts").html("<option value=''>" + TranslateString("SelectFromMenu") + "</option>"); //PartnerContacts_GetList(0, 0, function () { FadePageCover(false); });
                $("#divCbIsOperationClient").removeClass("hide");
                let whereCl = "ORDER BY Name";
                if (pDefaults.UnEditableCompanyName == "USC") {
                    whereCl = " WHERE ID IN (select ID from Agents where SubAccountID is not null) ORDER BY Name";
                }
                CallGETFunctionWithParameters("/api/Agents/LoadAllForCombo"
                    , { pWhereClauseForCombo: whereCl }
                    , function (pData) {
                        FillListFromObject(pID, 2, "Select Partner", pSlPartnerControlName, pData[0]
                            , function () {
                                if (callback != null && callback != undefined)
                                    callback();
                                //else //in this case i am calling after changing the OperationPartnerType so i need to reset the PartnerContacts
                                //    $("#slPartnerContacts").html("<option value=''><--Select--></option>"); //PartnerContacts_GetList(0, 0, function () { FadePageCover(false); });
                            });
                    }
                    , null);
                //set adding/editing Partners buttoms to call the correct modal
                $("#btn-NewAddPartner").attr("onclick", "Agents_ClearAllControls(3);");
                $("#btn-NewAddPartner").attr("data-target", "#AgentModal");
                $("#btn-EditPartner").attr("onclick", "Agents_FillControlsFromOperationPartners($('#" + pSlPartnerControlName + " option:selected').val());");
                $("#btn-EditPartner").attr("data-target", "#AgentModal");
            }
            else //SHIPPING AGENT
                if ($("#slOperationPartnerTypes option:selected").attr("PartnerTypeID") == constShippingAgentPartnerTypeID) {
                    { $("#divCbIsOperationClient").addClass("hide"); $("#cbIsOperationClient").prop("checked", false); }
                    let whereClauseShippingAgent = " WHERE IsInactive = 0 ORDER BY Name ";
                    if (pDefaults.UnEditableCompanyName == "USC") {
                        whereClauseShippingAgent = " WHERE IsInactive = 0 AND SubAccountID IS NOT NULL ORDER BY Name ";
                    }
                    GetListWithNameAndWhereClause(pID, "/api/ShippingAgents/LoadAll", "Select Partner", pSlPartnerControlName, whereClauseShippingAgent,
                        function () { // this callback is a 2nd level callback to fill the slPartnerContacts
                            if (callback != null && callback != undefined)
                                callback();
                            //else //in this case i am calling after changing the OperationPartnerType so i need to reset the PartnerContacts
                            //    $("#slPartnerContacts").html("<option value=''><--Select--></option>"); //PartnerContacts_GetList(0, 0, function () { FadePageCover(false); });
                        });
                    //set adding/editing Partners buttoms to call the correct modal
                    $("#btn-NewAddPartner").attr("onclick", "ShippingAgents_ClearAllControls(3);");
                    $("#btn-NewAddPartner").attr("data-target", "#ShippingAgentModal");
                    $("#btn-EditPartner").attr("onclick", "ShippingAgents_FillControlsFromOperationPartners($('#" + pSlPartnerControlName + " option:selected').val());");
                    $("#btn-EditPartner").attr("data-target", "#ShippingAgentModal");
                }
                else //CustomsClearanceAgents
                    if ($("#slOperationPartnerTypes option:selected").attr("PartnerTypeID") == constCustomsClearanceAgentPartnerTypeID) {
                        { $("#divCbIsOperationClient").addClass("hide"); $("#cbIsOperationClient").prop("checked", false); }
                        let whereClauseCCA = " WHERE IsInactive = 0 ORDER BY Name ";
                        if (pDefaults.UnEditableCompanyName == "USC") {
                            whereClauseCCA = " WHERE IsInactive = 0 AND SubAccountID IS NOT NULL ORDER BY Name ";
                        }
                        GetListWithNameAndWhereClause(pID, "/api/CustomsClearanceAgents/LoadAll", "Select Partner", pSlPartnerControlName, whereClauseCCA,
                            function () { // this callback is a 2nd level callback to fill the slPartnerContacts
                                if (callback != null && callback != undefined)
                                    callback();
                                //else //in this case i am calling after changing the OperationPartnerType so i need to reset the PartnerContacts
                                //    $("#slPartnerContacts").html("<option value=''><--Select--></option>"); //PartnerContacts_GetList(0, 0, function () { FadePageCover(false); });
                            });

                        //set adding/editing Partners buttoms to call the correct modal
                        $("#btn-NewAddPartner").attr("onclick", "CustomsClearanceAgents_ClearAllControls(3);");
                        $("#btn-NewAddPartner").attr("data-target", "#CustomsClearanceAgentModal");
                        $("#btn-EditPartner").attr("onclick", "CustomsClearanceAgents_FillControlsFromOperationPartners($('#" + pSlPartnerControlName + " option:selected').val());");
                        $("#btn-EditPartner").attr("data-target", "#CustomsClearanceAgentModal");
                    }
                    else //Supplier
                        if ($("#slOperationPartnerTypes option:selected").attr("PartnerTypeID") == constSupplierPartnerTypeID) {
                            { $("#divCbIsOperationClient").addClass("hide"); $("#cbIsOperationClient").prop("checked", false); }
                            let whereClauseSupp = " WHERE IsInactive = 0 ORDER BY Name ";
                            if (pDefaults.UnEditableCompanyName == "USC") {
                                whereClauseSupp = " WHERE IsInactive = 0 AND SubAccountID IS NOT NULL ORDER BY Name ";
                            }
                            GetListWithNameAndWhereClause(pID, "/api/Suppliers/LoadAll", "Select Partner", pSlPartnerControlName, whereClauseSupp,
                                function () { // this callback is a 2nd level callback to fill the slPartnerContacts
                                    if (callback != null && callback != undefined)
                                        callback();
                                    //else //in this case i am calling after changing the OperationPartnerType so i need to reset the PartnerContacts
                                    //    $("#slPartnerContacts").html("<option value=''><--Select--></option>"); //PartnerContacts_GetList(0, 0, function () { FadePageCover(false); });
                                });
                            //set adding/editing Partners buttoms to call the correct modal
                            $("#btn-NewAddPartner").attr("onclick", "Suppliers_ClearAllControls(3);");
                            $("#btn-NewAddPartner").attr("data-target", "#SupplierModal");
                            $("#btn-EditPartner").attr("onclick", "Suppliers_FillControlsFromOperationPartners($('#" + pSlPartnerControlName + " option:selected').val());");
                            $("#btn-EditPartner").attr("data-target", "#SupplierModal");
                        }
                        else //ShippingLine
                            if ($("#slOperationPartnerTypes option:selected").attr("PartnerTypeID") == constShippingLinePartnerTypeID) {
                                { $("#divCbIsOperationClient").addClass("hide"); $("#cbIsOperationClient").prop("checked", false); }
                                let whereClauseShippingLine = " WHERE IsInactive = 0 ORDER BY Name ";
                                if (pDefaults.UnEditableCompanyName == "USC") {
                                    whereClauseShippingLine = " WHERE IsInactive = 0 AND SubAccountID IS NOT NULL ORDER BY Name ";
                                }
                                GetListWithNameAndWhereClause(pID, "/api/ShippingLines/LoadAll", "Select Partner", pSlPartnerControlName, whereClauseShippingLine,
                                    function () { // this callback is a 2nd level callback to fill the slPartnerContacts
                                        if (callback != null && callback != undefined)
                                            callback();
                                        //else //in this case i am calling after changing the OperationPartnerType so i need to reset the PartnerContacts
                                        //    $("#slPartnerContacts").html("<option value=''><--Select--></option>"); //PartnerContacts_GetList(0, 0, function () { FadePageCover(false); });
                                    });
                                //set adding/editing Partners buttoms to call the correct modal
                                $("#btn-NewAddPartner").attr("onclick", "ShippingLines_ClearAllControls(3);");
                                $("#btn-NewAddPartner").attr("data-target", "#ShippingLineModal");
                                $("#btn-EditPartner").attr("onclick", "ShippingLines_FillControlsFromOperationPartners($('#" + pSlPartnerControlName + " option:selected').val());");
                                $("#btn-EditPartner").attr("data-target", "#ShippingLineModal");
                            }
                            else //Airline
                                if ($("#slOperationPartnerTypes option:selected").attr("PartnerTypeID") == constAirlinePartnerTypeID) {
                                    { $("#divCbIsOperationClient").addClass("hide"); $("#cbIsOperationClient").prop("checked", false); }
                                    let whereClauseAirLine = " WHERE IsInactive = 0 ORDER BY Name ";
                                    if (pDefaults.UnEditableCompanyName == "USC") {
                                        whereClauseAirLine = " WHERE IsInactive = 0 AND SubAccountID IS NOT NULL ORDER BY Name ";
                                    }
                                    GetListWithNameAndWhereClause(pID, "/api/Airlines/LoadAll", "Select Partner", pSlPartnerControlName, whereClauseAirLine,
                                        function () { // this callback is a 2nd level callback to fill the slPartnerContacts
                                            if (callback != null && callback != undefined)
                                                callback();
                                            //else //in this case i am calling after changing the OperationPartnerType so i need to reset the PartnerContacts
                                            //    $("#slPartnerContacts").html("<option value=''><--Select--></option>"); //PartnerContacts_GetList(0, 0, function () { FadePageCover(false); });
                                        });
                                    //set adding/editing Partners buttoms to call the correct modal
                                    $("#btn-NewAddPartner").attr("onclick", "Airlines_ClearAllControls(3);");
                                    $("#btn-NewAddPartner").attr("data-target", "#AirlineModal");
                                    $("#btn-EditPartner").attr("onclick", "Airlines_FillControlsFromOperationPartners($('#" + pSlPartnerControlName + " option:selected').val());");
                                    $("#btn-EditPartner").attr("data-target", "#AirlineModal");
                                }
                                else //Trucker
                                    if ($("#slOperationPartnerTypes option:selected").attr("PartnerTypeID") == constTruckerPartnerTypeID) {
                                        { $("#divCbIsOperationClient").addClass("hide"); $("#cbIsOperationClient").prop("checked", false); }
                                        let whereClauseTrucker = " WHERE IsInactive = 0 ORDER BY Name ";
                                        if (pDefaults.UnEditableCompanyName == "USC") {
                                            whereClauseTrucker = " WHERE IsInactive = 0 AND SubAccountID IS NOT NULL ORDER BY Name ";
                                        }
                                        GetListWithNameAndWhereClause(pID, "/api/Truckers/LoadAll", "Select Partner", pSlPartnerControlName, whereClauseTrucker,
                                            function () { // this callback is a 2nd level callback to fill the slPartnerContacts
                                                if (callback != null && callback != undefined)
                                                    callback();
                                                //else //in this case i am calling after changing the OperationPartnerType so i need to reset the PartnerContacts
                                                //    $("#slPartnerContacts").html("<option value=''><--Select--></option>"); //PartnerContacts_GetList(0, 0, function () { FadePageCover(false); });
                                            });
                                        //set adding/editing Partners buttoms to call the correct modal
                                        $("#btn-NewAddPartner").attr("onclick", "Truckers_ClearAllControls(3);");
                                        $("#btn-NewAddPartner").attr("data-target", "#TruckerModal");
                                        $("#btn-EditPartner").attr("onclick", "Truckers_FillControlsFromOperationPartners($('#" + pSlPartnerControlName + " option:selected').val());");
                                        $("#btn-EditPartner").attr("data-target", "#TruckerModal");
                                    }
                                    else //Custody
                                        if ($("#slOperationPartnerTypes option:selected").attr("PartnerTypeID") == constCustodyPartnerTypeID) {
                                            { $("#divCbIsOperationClient").addClass("hide"); $("#cbIsOperationClient").prop("checked", false); }
                                            let whereClauseCustody = " ORDER BY Name ";
                                            if (pDefaults.UnEditableCompanyName == "USC") {
                                                whereClauseCustody = " WHERE SubAccountID IS NOT NULL ORDER BY Name ";
                                            }
                                            GetListWithNameAndWhereClause(pID, "/api/Custody/LoadAll", "Select Partner", pSlPartnerControlName, whereClauseCustody,
                                                function () { // this callback is a 2nd level callback to fill the slPartnerContacts
                                                    if (callback != null && callback != undefined)
                                                        callback();
                                                    //else //in this case i am calling after changing the OperationPartnerType so i need to reset the PartnerContacts
                                                    //    $("#slPartnerContacts").html("<option value=''><--Select--></option>"); //PartnerContacts_GetList(0, 0, function () { FadePageCover(false); });
                                                });
                                            //set adding/editing Partners buttoms to call the correct modal
                                            $("#btn-NewAddPartner").attr("onclick", "Custody_ClearAllControls(3);");
                                            $("#btn-NewAddPartner").attr("data-target", "#CustodyModal");
                                            $("#btn-EditPartner").attr("onclick", "Custody_FillControlsFromOperationPartners($('#" + pSlPartnerControlName + " option:selected').val());");
                                            $("#btn-EditPartner").attr("data-target", "#CustodyModal");
                                        }
                                        else { //No selection
                                            $("#divCbIsOperationClient").removeClass("hide");
                                            GetListWithNameAndWhereClause(pID, "/api/ShippingAgents/LoadAll", "Select Partner", pSlPartnerControlName, " WHERE 1 = 2 ",
                                                function () { // this callback is a 2nd level callback to fill the slPartnerContacts
                                                    //$("#slPartnerContacts").html("<option value=''><--Select--></option>"); //PartnerContacts_GetList(0, 0, function () { FadePageCover(false); });
                                                });
                                            //set adding/editing Partners buttoms to call the correct modal
                                            $("#btn-NewAddPartner").prop('onclick', null);
                                            $("#btn-NewAddPartner").removeAttr("data-target");
                                            $("#btn-EditPartner").prop('onclick', null);
                                            $("#btn-EditPartner").removeAttr("data-target");
                                        }
        //OperationPartners_ShowHideAddEditButtons();
        ////in this case i am calling after changing the OperationPartnerType so i need to reset the PartnerContacts
        //if (callback != null && callback != undefined)
        //    PartnerContacts_GetList(0, 0, function() { FadePageCover(false); });
    } //if ($("#slOperationPartnerTypes option:selected").attr("PartnerTypeID") != undefined) {
}
function PartnerContacts_GetList(pID, pPartnerID, callback) { //pID(i.e. the ContactID) is used in case of editing to set the code or name to its original value, 2nd parameter is the (PartnerID)
    //parameters: ID, strFnName, First Row in select list, select list name
    debugger;
    if ($("#slOperationPartnerTypes option:selected").attr("PartnerTypeID") != undefined) {
        FadePageCover(true);
        var pWhereClause = "";
        pWhereClause += " WHERE PartnerTypeID = " + ($("#slOperationPartnerTypes option:selected").attr("PartnerTypeID") == "" ? 0 : $("#slOperationPartnerTypes option:selected").attr("PartnerTypeID")); //PartnerTypeID = 1 for Customers
        pWhereClause += " AND PartnerID = " + ($("#" + pSlPartnerControlName + " option:selected").val() == "" ? 0 : $("#" + pSlPartnerControlName + " option:selected").val());//pPartnerID;
        pWhereClause += " ORDER BY Name ";
        GetListWithNameAndWhereClause(pID, "/api/Contacts/LoadAll", TranslateString("SelectFromMenu"), "slPartnerContacts", pWhereClause
            , function () {
                if (pID == null || pID == undefined)
                    $("#slPartnerContacts").val($("#slPartnerContacts :nth-of-type(2)").val());//to select the 1st item
                FadePageCover(false);
            });
        if (callback != null && callback != undefined)
            callback();
    }
}
/*********************************Print All Partner Invoices********************************/
function OperationPartners_PrintAllPartnerInvoices(pOperationID, pPartnerID, pPartnerTypeID) {
    debugger;
    FadePageCover(true);
    var pParametersWithValues = {
        pOperationIDToPrintAllInvoices: pOperationID //I always print from master
        , pPartnerID: pPartnerID
        , pPartnerTypeID: pPartnerTypeID
    }
    CallGETFunctionWithParameters("/api/Invoices/PrintAllPartnerInvoices"
        , pParametersWithValues
        , function (pData) {
            var _ReturnedMessage = pData[0];
            var _OperationHeader = JSON.parse(pData[1]);
            var _InvoicesHeader = JSON.parse(pData[2]);
            var _InvoicesItems = JSON.parse(pData[3]);
            var _ClientHeader = JSON.parse(pData[4]);
            var mywindow = window.open('', '_blank');
            var ReportHTML = "";
            ReportHTML += '<html>';
            ReportHTML += '     <head><title></title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            //        ReportHTML += '         <div class="break"></div>'; //to start a new page
            ReportHTML += '        <div class="" style="height:100%;">';
            ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + (1 == 1/*$("#cbPrintHeaderInvoice").prop("checked")*/ ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
            //ReportHTML += '                 <div class="col-xs-6 text-right">';
            //ReportHTML += '                     <br>GLS Logistics Services LLC <br> B2106 Latifa Tower, Sheikh Zayed Road <br> Dubai, United Arab Emirates <br> Tel: +971 4 3930303 <br> <b>TRN: 100489292100003 </b>';
            //ReportHTML += '                 </div>';
            if (pDefaults.UnEditableCompanyName == "GLD")
                ReportHTML += '             <div class="col-xs-12"><h3>DEBIT NOTE' + '</h3></div>';
            else
                ReportHTML += '             <div class="col-xs-12"><h3>Invoices' + '</h3></div>';
            ReportHTML += '<hr>';

            ReportHTML += '          <div class="col-xs-12">';
            ReportHTML += '             <div class="col-xs-6">';
            ReportHTML += '                 <b>To</b> : ' + _ClientHeader.Name + '<br>';
            ReportHTML += '                 <b>Reference </b> : ' + _OperationHeader.Code + '<br>';
            ReportHTML += '                 <b>Origin</b> : ' + _OperationHeader.POLName + "(" + _OperationHeader.POLCode + ")" + '<br>';
            ReportHTML += '                 <b>Weight/</b>  :  ' + parseFloat(_OperationHeader.GrossWeightSum).toFixed(2) + ' KGM' + '<br>';
            ReportHTML += '                 <b>Volume</b> :  ' + parseFloat(_OperationHeader.VolumeSum).toFixed(2) + ' CBM <br>';
            ReportHTML += '             </div>';

            ReportHTML += '             <div class="col-xs-6">';
            ReportHTML += '                 <b> Customer VAT No</b> :  ' + (_ClientHeader.VATNumber == 0 ? "" : _ClientHeader.VATNumber) + '<br>';
            ReportHTML += '                 <b>MB/L</b> : ' + (_OperationHeader.MasterBL == 0 ? "" : _OperationHeader.MasterBL) + '<br>';
            //ReportHTML += '                 <b>Date </b> :  ' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.InvoiceDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.InvoiceDate))) + ' <br>';
            //ReportHTML += '                 <b>Due Date</b> :  ' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + ' <br>';
            ReportHTML += '                 <b>Destination</b> :   ' + _OperationHeader.PODName + "(" + _OperationHeader.PODCode + ")" + '<br>';
            //ReportHTML += '                 <b>HB/L</b> :  ' + (_OperationHeader.HouseNumber == 0 ? "" : _OperationHeader.HouseNumber) + ' <br>';
            //ReportHTML += '                 <b>No.&Kind Of Packages</b> :  ' + (_OperationHeader.PackageTypes == 0 ? (_OperationHeader.PackageTypesOnContainersTotals == 0 ? (_OperationHeader.PlacedOnOperationContainersAndPackagesID == 0 ? "0" : _OperationHeader.PlacedOnOperationContainersAndPackagesID) : _OperationHeader.PackageTypesOnContainersTotals) : _OperationHeader.PackageTypes) + ' <br>';
            ReportHTML += '                 <b>No.&Kind Of Packages</b> :  ' + (_OperationHeader.NumberOfPackages + (_OperationHeader.PackageTypeName == 0 ? "" : (' x ' + _OperationHeader.PackageTypeName))) + ' <br>';
            ReportHTML += '             </div>';
            ReportHTML += '          </div>';

            var _SummaryTotalUSD = 0;
            var _SummaryTotalDefaultCurrency = 0;
            for (var j = 0; j < _InvoicesHeader.length; j++) {
                var _CurrentInvoiceItems = jQuery.grep(_InvoicesItems, function (_InvoicesItems) {
                    return _InvoicesItems.InvoiceID == _InvoicesHeader[j].ID;
                });
                ReportHTML += '                     <div class="col-xs-12">';
                ReportHTML += '                         <table id="tblInvoice' + _InvoicesHeader[j].ID + '" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                ReportHTML += '                             <thead>';
                ReportHTML += '                                 <tr>';
                if (pDefaults.IsTaxOnItems)
                    ReportHTML += '                                     <th colspan=8>HBL#' + _InvoicesHeader[j].HouseNumber + ' &emsp;/&emsp; ' + 'Inv# ' + _InvoicesHeader[j].ConcatenatedInvoiceNumber + '</th>';
                else
                    ReportHTML += '                                     <th colspan=5>HBL#' + _InvoicesHeader[j].HouseNumber + ' &emsp;/&emsp; ' + 'Inv# ' + _InvoicesHeader[j].ConcatenatedInvoiceNumber
                        + '&emsp;Cur : ' + _InvoicesHeader[j].CurrencyCode
                        + '&emsp;Amt w/o VAT : ' + _InvoicesHeader[j].AmountWithoutVAT
                        + '&emsp;VAT : ' + _InvoicesHeader[j].TaxAmount
                        + '&emsp;Deducted Tax : ' + _InvoicesHeader[j].DiscountAmount
                        + '&emsp;Total : ' + _InvoicesHeader[j].Amount + '</th>';
                ReportHTML += '                                 <tr>';
                ReportHTML += '                                 <tr>';
                ReportHTML += '                                     <th style="width:28%;">Description </th>';
                ReportHTML += '                                     <th style="width:15%;"> Rate per </th>';
                if (pDefaults.IsTaxOnItems)
                    ReportHTML += '                                     <th style="width:5%;">Cur</th>';
                ReportHTML += '                                     <th style="width:12%;">UnitPrice</th>';
                ReportHTML += '                                     <th style="width:5%;">Qty</th>';
                ReportHTML += '                                     <th style="width:10%;">' + (pDefaults.UnEditableCompanyName == "GLD" ? 'SubTotal' : 'SaleAmount') + '</th>';
                if (pDefaults.IsTaxOnItems) {
                    ReportHTML += '                                     <th style="width:10%;">VAT</th>';
                    ReportHTML += '                                     <th style="width:10%;">Total' + (pDefaults.UnEditableCompanyName == "GLD" ? '(USD)' : '') + ' </th>';
                }
                ReportHTML += '                                 </tr>';
                ReportHTML += '                             </thead>';
                ReportHTML += '                             <tbody>';
                var TotalAmount_Footer = 0;
                var TotalVATAmount_Footer = 0;
                var InvoiceItemsTotal_Footer_USD = 0;
                $.each(_CurrentInvoiceItems, function (i, item) {
                    ReportHTML += '                                 <tr style="font-size:100%;">';
                    //ReportHTML += '                                     <td>' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + '</td>';
                    ReportHTML += '                                     <td>' + item.ChargeTypeName + '</td>';
                    ReportHTML += '                                     <td>' + (item.Notes == 0 ? "" : item.Notes) + '</td>';
                    if (pDefaults.IsTaxOnItems)
                        ReportHTML += '                                     <td>' + item.CurrencyCode + '</td>';
                    ReportHTML += '                                     <td>' + item.SalePrice.toFixed(2) + '</td>'; //in invoice currency
                    ReportHTML += '                                     <td>' + item.Quantity + '</td>';
                    ReportHTML += '                                     <td>' + (item.SalePrice * item.Quantity).toFixed(2) + '</td>'; //in invoice currency
                    if (pDefaults.IsTaxOnItems) {
                        ReportHTML += '                                     <td>' + (item.TaxAmount).toFixed(2) + '</td>'; //in invoice currency
                        if (pDefaults.UnEditableCompanyName == "GLD")
                            ReportHTML += '                                     <td>' + (item.SaleAmount * item.ExchangeRate / parseFloat($("#hReadySlCurrencies option:Contains('USD')").attr("MasterDataExchangeRate"))).toFixed(2) + '</td>';
                        else
                            ReportHTML += '                                     <td>' + (item.SaleAmount).toFixed(2) + '</td>';
                    }
                    ReportHTML += '                                 </tr>';
                    TotalAmount_Footer += (item.SalePrice * item.Quantity); //in invoice currency
                    TotalVATAmount_Footer += (item.TaxAmount);  //in invoice currency
                    InvoiceItemsTotal_Footer_USD += (item.SaleAmount * item.ExchangeRate / parseFloat($("#hReadySlCurrencies option:Contains('USD')").attr("MasterDataExchangeRate"))); //USD
                });
                if (_InvoicesHeader[j].FixedDiscount > 0) {
                    ReportHTML += '                                 <tr style="font-size:100%;">';
                    //ReportHTML += '                                     <td>' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + '</td>';
                    ReportHTML += '                                     <td colspan=' + (pDefaults.IsTaxOnItems ? 7 : 4) + '>' + 'Special Discount' + '</td>';
                    ReportHTML += '                                     <td>' + '-' + _InvoicesHeader[j].FixedDiscount.toFixed(2) + '</td>';
                    ReportHTML += '                                 </tr>';
                }
                _SummaryTotalUSD += InvoiceItemsTotal_Footer_USD;
                _SummaryTotalDefaultCurrency += (_InvoicesHeader[j].Amount * _InvoicesHeader[j].ExchangeRate);
                //ReportHTML += '                                 <tr style="font-size:95%;" class="hide">';
                //ReportHTML += '                                     <td colspan="4"></td>';
                //ReportHTML += '                                     <td><b>Total</b></td>';
                //ReportHTML += '                                     <td><b>' + TotalAmount_Footer.toFixed(2) + '</b></td>';
                //ReportHTML += '                                     <td><b>' + TotalVATAmount_Footer.toFixed(2) + '</b></td>';
                //ReportHTML += '                                     <td><b>' + InvoiceItemsTotal_Footer_USD.toFixed(2) + '</b></td>';
                //ReportHTML += '                                 </tr>';

                //ReportHTML += '                                 <tr style="font-size:95%;" class="hide">';
                //ReportHTML += '                                     <td colspan="4"></td>';
                //ReportHTML += '                                     <td><b>Total In Words</b></td>';
                //ReportHTML += '                                     <td colspan="3"><b>' + toWords_WithFractionNumbers(InvoiceItemsTotal_Footer_USD.toFixed(2)) + '</b></td>';
                //ReportHTML += '                                 </tr>';

                ReportHTML += '                         <tbody>';
                ReportHTML += '                     </table>';
                ReportHTML += '               </div>';
            } //for (var j = 0; j < _InvoicesHeader.length;j++) {

            ReportHTML += '                 <div class="col-xs-12">';
            if (pDefaults.UnEditableCompanyName == "GLD") {
                ReportHTML += '                     <b>Total: </b>' + 'USD ' + _SummaryTotalUSD.toFixed(2) + '</br>';
                ReportHTML += '                     <b>Total In Words: </b>' + '(USD) ' + ' <b>' + toWords_WithFractionNumbers(_SummaryTotalUSD.toFixed(2)) + '</b></br>';
            }
            else {
                ReportHTML += '                     <b>Total: </b>' + pDefaults.CurrencyCode + ' ' + parseFloat(_SummaryTotalDefaultCurrency).toFixed(2) + '</br>';
                ReportHTML += '                     <b>Total In Words: </b>' + '(' + pDefaults.CurrencyCode + ') ' + ' <b>' + toWords_WithFractionNumbers(parseFloat(_SummaryTotalDefaultCurrency).toFixed(2)) + '</b></br>';
            }
            ReportHTML += '                 </div>';
            ReportHTML += '                 <div class="col-xs-12 m-t-lg">';
            ReportHTML += '                     <div class="col-xs-8">' + ("Received By(Name and Signature)") + '</div>';
            ReportHTML += '                     <div class="col-xs-4">' + ("Stamp and Signature)") + '</div>';
            ReportHTML += '                 </div>';
            ReportHTML += '                 <div class="col-xs-12 m-t-lg">';
            ReportHTML += '                     <div class="col-xs-8">' + ("___________________________________") + '</div>';
            ReportHTML += '                     <div class="col-xs-4">' + ("_______________________") + '</div>';
            ReportHTML += '                 </div>';


            ReportHTML += '               <div class="col-xs-12 m-t-lg">';
            ////ReportHTML += '               BANK DETAILS <br> ';
            ReportHTML += '                             <b>PAYEE NAME:</b> ' + (pDefaults.CompanyName == 0 ? "" : pDefaults.CompanyName) + '</br>';
            ReportHTML += '                             <b>BANK NAME:</b> ' + (pDefaults.BankName == 0 ? "" : pDefaults.BankName) + '</br>';
            ReportHTML += '                             <b>ACCOUNT #:</b> ' + (pDefaults.AccountNumber == 0 ? "" : pDefaults.AccountNumber) + '</br>';
            if (pDefaults.UnEditableCompanyName == "GLD")
                ReportHTML += '                             <b>IBAN #:</b> ' + ("AE91 0240 0015 2015 2198 401") + '</br>';
            ReportHTML += '                             <b>SWIFT CODE:</b> ' + (pDefaults.SwiftCode == 0 ? "" : pDefaults.SwiftCode) + '</br>';
            //if ($("#cbPrintBankDetailsFromDefaults").prop("checked")) {
            //    ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + ($("#hDefaultUnEditableCompanyName").val() == "QUI" ? (" " + pDefaults.CompanyName) : "") + '</br>';
            //    ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
            //    ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
            //    ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
            //    ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
            //    ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
            //}
            //else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
            //    ReportHTML += '                             <b><u>BANK DETAILS:</u></b>' + ($("#hDefaultUnEditableCompanyName").val() == "QUI" ? (" " + pDefaults.CompanyName) : "") + '</br>';
            //    ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
            //}
            //else
            //    ReportHTML += '                             <br>';
            ReportHTML += '               </div>';

            ReportHTML += '             </div>';
            ReportHTML += '         </body>';
            ReportHTML += '     </html>';
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
            FadePageCover(false);
        }
        , null);
}