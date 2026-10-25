var TodaysDate = new Date();
var FormattedTodaysDate = TodaysDate.toLocaleDateString();

function PurchaseInvoiceApproval_BindTableRows(pPurchaseInvoice) {
    debugger;
    //if (IsAccountingActive)
    //    $("#hl-menu-ReceiptsAndPaymentsGroup").parent().addClass("active");
    //else
    //    $("#hl-menu-OperAcc").parent().addClass("active");
    ClearAllTableRows("tblPurchaseInvoice");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Print" + "</span>";
    //var LogsControlsText = " class='btn btn-xs btn-rounded btn-primary float-right' > <i class='fa fa-chain' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Logs" + "</span>";
    $.each(pPurchaseInvoice, function (i, item) {
        AppendRowtoTable("tblPurchaseInvoice",
        ("<tr ID='" + item.ID + "' " + ((/*OEPurInv && $("#hIsOperationDisabled").val() == false &&*/ !item.IsApproved) ? ("ondblclick='PurchaseInvoiceApproval_FillControls(" + item.ID + "," + item.OperationID + "," + item.MasterOperationID + ");'") : " class='static-text-primary' ") + ">"
        ////("<tr ID='" + item.ID + "'>"
                    + "<td class='PurchaseInvoiceID'> <input" + (/*!item.IsApproved && ODPurInv*/1==1 ? " name='Delete' " : " disabled='disabled' ") + " type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='PurchaseInvoiceOperationID hide'>" + item.OperationID + "</td>"
                    + "<td class='PurchaseInvoiceMasterOperationID hide'>" + item.MasterOperationID + "</td>"
                    + "<td class='PurchaseInvoiceInvoiceNumber hide'>" + item.InvoiceNumber + "</td>"
                    + "<td class='PurchaseInvoiceEditableCode hide'>" + item.EditableCode + "</td>"
                    + "<td class='PurchaseInvoiceConcatenatedInvoiceNumber'>" + item.ConcatenatedInvoiceNumber + "</td>"
                    + "<td class='PurchaseInvoiceOperationCode'>" + item.OperationCode + "</td>"
                    + "<td class='PurchaseInvoiceClientOperationPartnerID hide'>" + item.ClientOperationPartnerID + "</td>"
                    + "<td class='PurchaseInvoiceClientOperationPartnerName'>" + (item.ClientOperationPartnerID == 0 ? "" : item.ClientPartnerName) + "</td>"
                    + "<td class='PurchaseInvoiceSupplierOperationPartnerID hide'>" + item.SupplierOperationPartnerID + "</td>"
                    + "<td class='PurchaseInvoiceSupplierOperationPartnerName'>" + (item.SupplierOperationPartnerID == 0 ? "" : item.SupplierPartnerName) + "</td>"
                    + "<td class='PurchaseInvoiceAmount'>" + item.Amount + "</td>"
                    + "<td class='PurchaseInvoiceCurrencyID hide'>" + item.CurrencyID + "</td>"
                    + "<td class='PurchaseInvoiceCurrencyCode'>" + item.CurrencyCode + "</td>"
                    + "<td class='PurchaseInvoiceExchangeRate hide'>" + item.ExchangeRate + "</td>"
                    + "<td class='PurchaseInvoiceDate'>" + ConvertDateFormat(GetDateWithFormatMDY(item.InvoiceDate)) + "</td>"
                    + "<td class='PurchaseInvoiceHouseNumber'>" + (item.HouseNumber == 0 ? "" : item.HouseNumber) + "</td>" //if "N/A" then either not entered or its Master Op so I should show all the HBLs on the Master, but for space i dont do it.
                    + "<td class='PurchaseInvoiceNotes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
        //            + "<td class='PurchaseInvoiceAmountWithoutVAT hide'>" + item.AmountWithoutVAT + "</td>"
        //            + "<td class='PurchaseInvoiceTaxTypeID hide' val=" + item.TaxTypeID + ">" + (item.TaxTypeID == 0 ? "" : item.TaxTypeName) + "</td>"
        //            + "<td class='PurchaseInvoiceTaxPercentage hide'>" + item.TaxPercentage + "</td>"
        //            + "<td class='PurchaseInvoiceTaxAmount hide'>" + item.TaxAmount + "</td>"
        //            + "<td class='PurchaseInvoiceDiscountTypeID hide' val=" + item.DiscountTypeID + ">" + (item.DiscountTypeID == 0 ? "" : item.DiscountTypeName) + "</td>"
        //            + "<td class='PurchaseInvoiceDiscountPercentage hide'>" + item.DiscountPercentage + "</td>"
        //            + "<td class='PurchaseInvoiceDiscountAmount hide'>" + item.DiscountAmount + "</td>"

                    + "<td class='PurchaseInvoiceClientAddressID hide'>" + item.ClientAddressID + "</td>"
                    + "<td class='PurchaseInvoiceSupplierAddressID hide'>" + item.SupplierAddressID + "</td>"
                    + "<td class='PurchaseInvoicePaymentTermID hide'>" + item.PaymentTermID + "</td>"
                    + "<td class='IsApproved'> <input type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"
        //            //+ "<td class='hide'><a onclick='PurchaseInvoice_Logs_LoadWithPaging(" + item.ID + ");' " + LogsControlsText + "</a></td>"
        //            //+ ($("#hIsOperationDisabled").val() == false
        //            //    ? "<td class=''><a onclick='PurchaseInvoice_Print(" + item.ID + "," + item.NoteType + ",3);' " + printControlsText + "</a></td>"
        //            //    : "<td></td>")
                    + "<td class='hide'><a onclick='PurchaseInvoice_Print(" + item.ID + ");' " + printControlsText + "</a></td>"
                    + "</tr>"));
    });
    ////ApplyPermissions();
    //$("#cbPrintBankDetailsForNewPurchaseInvoice").prop("checked", true);
    //if (OAPurInv && $("#hIsOperationDisabled").val() == false) { $("#btn-NewPurchaseInvoice").removeClass("hide"); } else { $("#btn-NewPurchaseInvoice").addClass("hide"); }
    //if (ODPurInv && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePurchaseInvoice").removeClass("hide"); else $("#btn-DeletePurchaseInvoice").addClass("hide");
    if ($("#hf_CanEdit").val() == 1) { $("#btn-ApproveAllSelected").removeClass("hide"); $("#btn-UnApproveAllSelected").removeClass("hide"); }
    else { $("#btn-ApproveAllSelected").addClass("hide"); $("#btn-UnApproveAllSelected").addClass("hide"); }
    //if ($("#hf_CanDelete").val() == 1) $("#btn-DeleteInvoice").removeClass("hide"); else $("#btn-DeleteInvoice").addClass("hide");
    //BindAllCheckboxonTable("tblPurchaseInvoice", "PurchaseInvoiceID", "cb-CheckAll-PurchaseInvoice");
    CheckAllCheckbox("HeaderDeletePurchaseInvoiceID");
    //HighlightText("#tblPurchaseInvoice>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function PurchaseInvoiceApproval_LoadingWithPaging() {
    debugger;
    var pWhereClause = PurchaseInvoiceApproval_GetWhereClause();
    //var pOrderBy = "PartnerTypeID,PartnerName, OperationID DESC ";
    var pOrderBy = " ID  ";
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pPageSize = $('#select-page-size').val();
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { PurchaseInvoiceApproval_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblPurchaseInvoice>tbody>tr", $("#txt-Search").val().trim());
}
function PurchaseInvoiceApproval_GetWhereClause() {
    debugger;
    var pWhereClause = "WHERE IsDeleted=0  ";
    //if ($("#txt-Search").val().trim() != "") {
    //    pWhereClause += " AND (";
    //    //pWhereClause += " OperationCode like N'%" + $("#txt-Search").val().trim() + "%' ";
    //    //pWhereClause += " OR OperationCodeWithoutDashes like N'%" + $("#txt-Search").val().trim() + "%' ";
    //    //pWhereClause += " OR ConcatenatedInvoiceNumber like N'%" + $("#txt-Search").val().trim() + "%' ";
    //    //pWhereClause += " OR SupplierOperationPartnerTypeName like N'%" + $("#txt-Search").val().trim() + "%' ";
    //    pWhereClause += " PartnerName like N'%" + $("#txt-Search").val().trim() + "%' ";
    //    pWhereClause += " OR MasterBL like N'%" + $("#txt-Search").val().trim() + "%' ";
    //    pWhereClause += " OR HouseNumber like N'%" + $("#txt-Search").val().trim() + "%' ";
    //    pWhereClause += " OR InvoiceStatus like N'%" + $("#txt-Search").val().trim() + "%' ";
    //    pWhereClause += " OR VesselName like N'%" + $("#txt-Search").val().trim() + "%' ";
    //    pWhereClause += ")";
    //}
    if ($("#slPartnerClients").val() != "") {
        pWhereClause += " AND (";
        pWhereClause += " ClientPartnerID = N'" + $("#slPartnerClients").val() + "' ";
        pWhereClause += " AND ClientPartnerTypeID = N'" + $("#slPartnerClients option:selected").attr("PartnerTypeID") + "' ";
        pWhereClause += ")";
    }
    if ($("#slPartnerTypeClients").val() != "") {
        pWhereClause += " AND ClientPartnerTypeID = N'" + $("#slPartnerTypeClients").val() + "' ";
    }
    if ($("#slPartnerSuppliers").val() != "") {
        pWhereClause += " AND (";
        pWhereClause += " SupplierPartnerID = N'" + $("#slPartnerSuppliers").val() + "' ";
        pWhereClause += " AND SupplierPartnerTypeID = N'" + $("#slPartnerSuppliers option:selected").attr("PartnerTypeID") + "' ";
        pWhereClause += ")";
    }
    if ($("#slPartnerTypeSuppliers").val() != "") {
        pWhereClause += " AND SupplierPartnerTypeID = N'" + $("#slPartnerTypeSuppliers").val() + "' ";
    }
    //if ($("#slOperation").val() != "") {
    //    pWhereClause += " AND OperationID=" + $("#slOperation").val() + " ";
    //}
    if ($("#txtOperation").val() != "") {
        pWhereClause += " AND SUBSTRING(OperationCode,12,7)=N'" + $("#txtOperation").val().trim().toUpperCase() + "' \n";
    }
    if ($("#txtInvoiceNumber").val() != "") {
        pWhereClause += " AND EditableCode=" + $("#txtInvoiceNumber").val().trim().toUpperCase() +" \n";
    }
    if ($("#slBranch").val() != "") {
        pWhereClause += " AND BranchID=" + $("#slBranch").val() + " ";
    }
    //if ($("#slInvoiceType").val() != "0") {
    //    pWhereClause += " AND InvoiceTypeID=" + $("#slInvoiceType").val() + " ";
    //}
    //if ($("#cbHideApprovedOperationPayable").prop("checked"))
    //    pWhereClause += " AND IsApproved=0 ";
    if ($("#slApprovalStatus").val() != "") {
        pWhereClause += " AND IsApproved=" + $("#slApprovalStatus").val();
    }
    return pWhereClause;
}
function PurchaseInvoiceApproval_PartnerTypeChanged(pSuffix) {
    debugger;
    $("#slPartner" + pSuffix).html("<option value=''><--All " + pSuffix + "--></option>");//to quickly empty
    var pPartnerTypeID = $("#slPartnerType" + pSuffix).val() == "" ? 0 : $("#slPartnerType" + pSuffix).val();
    var pWhereClause = PurchaseInvoiceApproval_GetWhereClause();
    //var pOrderBy = " PartnerTypeID,PartnerName, OperationID DESC "
    var pOrderBy = "ID"
    var pPageNumber = 1; //($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text())
    var pPageSize = $('#select-page-size').val();
    var pControllerParameters = { pPartnerTypeID: pPartnerTypeID, pWhereClause: pWhereClause, pOrderBy: pOrderBy, pPageNumber: pPageNumber, pPageSize: pPageSize }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PurchaseInvoice/PurchaseInvoiceApproval_PartnerTypeChanged", pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
        , function (pData) {
            PurchaseInvoiceApproval_BindTableRows(JSON.parse(pData[0]));
            FillListFromObject(null, 5/*pCodeOrName*/, "<--All " + pSuffix+"-->", "slPartner" + pSuffix, pData[2], null);
            FadePageCover(false);
        }
        , null);
}
function PurchaseInvoiceApproval_SetApproval(pIsApprove) {
    debugger;
    var pSelectedIDs = GetAllSelectedIDsAsStringWithNameAttr("Delete");
    //if (pSelectedIDs == "" || pSelectedIDs.split(",").length > 1)
    if (pSelectedIDs == "")
        swal("Sorry", "Please, select at least one row.");
        //swal("Sorry", "Please, select just one row.");
    else {
        swal({
            title: "Are you sure?",
            text: "The approval status for the selected row(s) will be changed and take effect into the partner balance.",
            type: "",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Apply",
            closeOnConfirm: true
        },
        //callback function in case of confirm delete
        function () {
            FadePageCover(true);
            var pParametersWithValues = {
                pIDsToSetApproval: pSelectedIDs
                , pIsApprove: pIsApprove
                , pCostCenterID: $("#slCostCenter").val()
                , pWhereClause: PurchaseInvoiceApproval_GetWhereClause()
                //, pOrderBy: " PartnerTypeID,PartnerName, OperationID DESC "
                , pOrderBy: " ID "
                , pPageNumber: ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text())
                , pPageSize: $('#select-page-size').val()
            };
            CallGETFunctionWithParameters("/api/PurchaseInvoice/ApproveOrUnApprove", pParametersWithValues
                , function (pData) {
                    var pStrMessage = pData[2];
                    if (pData[0]) {
                        PurchaseInvoiceApproval_BindTableRows(JSON.parse(pData[1]));
                        swal("Success", "Set successfully.");
                    }
                    else
                        //swal("Sorry", "An error occured, please refresh and then try again.");
                        alert(pStrMessage); //swal("Sorry", pData[2]);
                    FadePageCover(false);
                });
        });
    }
}
//Edit is from operations
function PurchaseInvoiceApproval_FillControls(pPurchaseInvoiceID, pOperationID, pMasterOperationID) {
    debugger;
    //$("#divPurchaseInvoiceHeader").children().children().attr("disabled", "disabled");


    //ClearAll("#PurchaseInvoiceModal", null);
    //$("#tblPurchaseInvoiceItem tbody").html("");
    //$("#hPurchaseInvoiceID").val(pPurchaseInvoiceID);
    //var tr = $("#tblPurchaseInvoice tr[ID='" + pPurchaseInvoiceID + "']");
    //var pMasterOperationID = $(tr).find("td.PurchaseInvoiceMasterOperationID").text();
    //var pClientOperationPartnerID = $(tr).find("td.PurchaseInvoiceClientOperationPartnerID").text();
    //var pSupplierOperationPartnerID = $(tr).find("td.PurchaseInvoiceSupplierOperationPartnerID").text();

    //jQuery("#PurchaseInvoiceModal").modal("show");
    //FadePageCover(true);
    //var pWhereClauseInvoiceOperations = "";
    //pWhereClauseInvoiceOperations = " WHERE ID = " + pOperationID + " OR MasterOperationID = " + pOperationID + " OR ID = " + pMasterOperationID + " OR MasterOperationID = " + pMasterOperationID;

    ////var pWhereClauseInvoiceClients = " WHERE (OperationID = " + pOperationID + " OR MasterOperationID = " + pOperationID + " OR OperationID = " + pMasterOperationID + " OR MasterOperationID = " + pMasterOperationID + " ) \n";
    //var pWhereClauseInvoiceClients = " WHERE OperationID = " + pOperationID + " \n";
    //pWhereClauseInvoiceClients += " AND PartnerID IS NOT NULL ";
    //pWhereClauseInvoiceClients += " AND (PartnerTypeID = " + constCustomerPartnerTypeID;
    //pWhereClauseInvoiceClients += " OR PartnerTypeID = " + constAgentPartnerTypeID + ") ";
    //pWhereClauseInvoiceClients += " OR ID = " + pClientOperationPartnerID;
    //pWhereClauseInvoiceClients += " ORDER BY PartnerTypeName ";
    ////var pWhereClauseInvoiceSuppliers = " WHERE (OperationID = " + pOperationID + " OR MasterOperationID = " + pOperationID + " OR OperationID = " + pMasterOperationID + " OR MasterOperationID = " + pMasterOperationID + " ) \n";
    //var pWhereClauseInvoiceSuppliers = " WHERE (OperationID = " + pOperationID + " OR OperationID=" + pMasterOperationID + ")" + " \n";
    //pWhereClauseInvoiceSuppliers += " AND PartnerID IS NOT NULL ";
    //pWhereClauseInvoiceSuppliers += " AND (PartnerTypeID = " + constSupplierPartnerTypeID;
    //pWhereClauseInvoiceSuppliers += " OR PartnerTypeID = " + constAgentPartnerTypeID + ") ";
    //pWhereClauseInvoiceSuppliers += " OR ID = " + pSupplierOperationPartnerID;
    //pWhereClauseInvoiceSuppliers += " ORDER BY PartnerTypeName ";

    //var pControllerParameters = {
    //    pPurchaseInvoiceID: pPurchaseInvoiceID
    //    , pWhereClauseInvoiceOperations: pWhereClauseInvoiceOperations
    //    , pWhereClauseInvoiceClients: pWhereClauseInvoiceClients
    //    , pWhereClauseInvoiceSuppliers: pWhereClauseInvoiceSuppliers
    //};
    //CallGETFunctionWithParameters("/api/PurchaseInvoice/PurchaseInvoice_LoadWithDetails"
    //    , pControllerParameters
    //    , function (pData) {
    //        var pHeader = JSON.parse(pData[0]);
    //        var pPurchaseInvoiceItems = JSON.parse(pData[1]);
    //        var pInvoiceOperations = pData[2];
    //        var pOperationClient = pData[3];
    //        var pOperationSupplier = pData[4];
    //        var pPaymentTerm = pData[5];
    //        FillListFromObject(pHeader.OperationID, 14/*OperationsWithHouse*/, null, "slPurchaseInvoiceOperations", pInvoiceOperations, null);
    //        FillListFromObject(pHeader.ClientOperationPartnerID, 15/*OperationPartner*/, "Select Partner", "slPurchaseInvoiceOperationCustomer", pOperationClient
    //            , function () {
    //                InvoiceAddressTypes_GetList(pHeader.ClientAddressID, "slPurchaseInvoiceCustomerAddress", "slPurchaseInvoiceOperationCustomer", null);
    //            });
    //        FillListFromObject(pHeader.SupplierOperationPartnerID, 15/*OperationPartner*/, "Select Partner", "slPurchaseInvoiceOperationSupplier", pOperationSupplier
    //            , function () {
    //                InvoiceAddressTypes_GetList(pHeader.SupplierAddressID, "slPurchaseInvoiceSupplierAddress", "slPurchaseInvoiceOperationSupplier", null);
    //            });
    //        FillListFromObject_ERP(pHeader.PaymentTermID, 2, "<--Select-->", "slPurchaseInvoicePaymentTerm", pPaymentTerm, null);
    //        PurchaseInvoiceItem_BindTableRows(pPurchaseInvoiceItems);
    //        $("#txtPurchaseInvoiceNumber").val(pHeader.EditableCode == 0 ? "" : pHeader.EditableCode);
    //        $("#txtPurchaseInvoiceAmount").val(pHeader.Amount);
    //        $("#slPurchaseInvoiceCurrency").val(pHeader.CurrencyID);
    //        $("#txtPurchaseInvoiceExchangeRate").val(pHeader.ExchangeRate);
    //        $("#txtPurchaseInvoiceDate").val(ConvertDateFormat(GetDateWithFormatMDY(pHeader.InvoiceDate)));
    //        $("#txtPurchaseInvoiceNotes").val(pHeader.Notes == 0 ? "" : pHeader.Notes);
    //        if (pHeader.CurrencyID == $("#hDefaultCurrencyID").val())
    //            $("#txtPurchaseInvoiceExchangeRate").attr("disabled", "disabled");
    //        else
    //            $("#txtPurchaseInvoiceExchangeRate").removeAttr("disabled");
    //        FadePageCover(false);
    //    }
    //    , null);
    ////$("#btnSavePurchaseInvoice").attr("onclick", "PurchaseInvoiceItem_Save(false, false);");
    ////$("#btnSavePurchaseInvoiceAndPrint").attr("onclick", "PurchaseInvoiceItem_Save(false, true);");
}
function PurchaseInvoice_CurrencyChanged() {
    debugger;
    if ($("#slPurchaseInvoiceCurrency").val() == $("#hDefaultCurrencyID").val())
        $("#txtPurchaseInvoiceExchangeRate").attr("disabled", "disabled");
    else
        $("#txtPurchaseInvoiceExchangeRate").removeAttr("disabled");
    $("#txtPurchaseInvoiceExchangeRate").val($("#slPurchaseInvoiceCurrency option:selected").attr("MasterDataExchangeRate"));
}
function PurchaseInvoice_OperationChanged(pClientOperationPartnerID, pSupplierOperationPartnerID) {
    debugger;
    FadePageCover(true);
    $("#slPurchaseInvoiceCustomerAddress").html('<option value="0">Select Address Type</option>');
    //$("#slPurchaseInvoiceSupplierAddress").html('<option value="0">Select Address Type</option>'); //because supplier is not changed with houses
    InvoicePartners_GetList(pClientOperationPartnerID, $("#slPurchaseInvoiceOperations").val(), "slPurchaseInvoiceOperationCustomer"
        , function () { FadePageCover(false); });
    ////supplier always take from master operation 
    //InvoiceSuppliers_GetList(pSupplierOperationPartnerID, $("#slPurchaseInvoiceOperations").val(), "slPurchaseInvoiceOperationSupplier", null);
}
//Always $("#cbAddReceivablesToPurchaseInvoice").prop("checked") is false coz i the receivables from operations edit
//Can't print coz PurchaseInvoice_GetNotSelectedReceivablesTotal() takes from Receivables table in OperationsEdit
function PurchaseInvoice_Print(pID) {
    debugger;
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/PurchaseInvoice/PurchaseInvoice_GetDataToPrint"
        , { pPrintedPurchaseInvoiceID: pID }
        , function (pData) {
            var pPurchaseInvoiceHeader = JSON.parse(pData[0]);
            var pPurchaseInvoiceItems = JSON.parse(pData[1]);
            var pOperationHeader = JSON.parse(pData[2]);
            var pDefaults = JSON.parse(pData[3]);
            var pMasterOperationHeader = JSON.parse(pData[4]);
            var _VATReceivableItemsIDs = GetAllSelectedIDsAsStringWithTableNameAndNameAttr("tblReceivables", "nameExcludePurchase");
            var _NotSelectedReceivablesTotal = PurchaseInvoice_GetNotSelectedReceivablesTotal(pPurchaseInvoiceHeader.CurrencyID, pPurchaseInvoiceHeader.ExchangeRate);
            var _SubTotal = pPurchaseInvoiceHeader.AmountWithoutVAT + parseFloat(_NotSelectedReceivablesTotal);
            var _VATTotal = 0;
            if (_VATReceivableItemsIDs != "" && $("#cbAddReceivablesToPurchaseInvoice").prop("checked"))
                _VATTotal = PurchaseInvoice_GetVATReceivableItemsTotal(pPurchaseInvoiceHeader.CurrencyID, pPurchaseInvoiceHeader.ExchangeRate);
            var _TotalWithVAT = _SubTotal + parseFloat(_VATTotal);
            var mywindow = window.open('', '_blank');
            var ReportHTML = '';
            //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
            //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
            ReportHTML += '<html>';
            ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            //ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
            ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + 'CompanyHeader.jpg' + '" alt="logo"/></div>';
            //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + $("#tblInvoices #" + pID + " td.InvoiceNumber").text().split('/')[1] + '</h3></div>';
            ReportHTML += '                 <div class="col-xs-7 m-t">';
            ReportHTML += '                     <b>' + $("#hDefaultCompanyName").val() + '</b><br>';
            ReportHTML += '                     <b>' + (pDefaults.AddressLine1 == 0 ? "" : (pDefaults.AddressLine1 + '</b><br>'));
            ReportHTML += '                     <b>' + (pDefaults.AddressLine2 == 0 ? "" : (pDefaults.AddressLine2 + '</b><br>'));
            ReportHTML += '                     <b>' + (pDefaults.AddressLine3 == 0 ? "" : (pDefaults.AddressLine3) + '</b><br>');
            if ($("#hDefaultUnEditableCompanyName").val() == "NIL") {
                ReportHTML += '                     <b>' + 'Contact : Khaled Saleh' + '</b><br>';
                ReportHTML += '                     <b>' + 'Email : accounting@nilelogistics.com' + '</b><br>';
            }
            ReportHTML += '                     <b>' + (pDefaults.Phones == 0 ? "" : ('TEL:' + pDefaults.Phones) + '</b><br>');
            ReportHTML += '                     <b>' + (pDefaults.Faxes == 0 ? "" : ('Fax:' + pDefaults.Faxes)) + '</b><br><br><br>';
            ReportHTML += '                 </div>';

            ReportHTML += '                 <div class="col-xs-5 m-t m-l-n">';
            //ReportHTML += '                     <b>Date : </b>' + getTodaysDateInddMMyyyyFormat() + '<br>';
            ReportHTML += '                     <b>Invoice # : </b>' + pPurchaseInvoiceHeader.ConcatenatedInvoiceNumber + '<br>';
            ReportHTML += '                     <b>Date : </b>' + $("#tblPurchaseInvoice #" + pID + " td.PurchaseInvoiceDate").text() + '<br>';
            ReportHTML += '                     <b>Bill To : </b>' + $("#tblPurchaseInvoice #" + pID + " td.PurchaseInvoiceClientOperationPartnerName").text() + '<br>';
            ReportHTML += '                     <b>Address : </b>';
            ReportHTML += '                         ' + (pPurchaseInvoiceHeader.ClientAddressStreetLine1 == 0 ? "" : (pPurchaseInvoiceHeader.ClientAddressStreetLine1));
            ReportHTML += '                         ' + (pPurchaseInvoiceHeader.ClientAddressStreetLine2 == 0 ? "" : (", " + pPurchaseInvoiceHeader.ClientAddressStreetLine2));
            ReportHTML += '                         ' + (pPurchaseInvoiceHeader.ClientAddressCityName == 0 ? "" : ("," + pPurchaseInvoiceHeader.ClientAddressCityName));
            ReportHTML += '                         ' + (pPurchaseInvoiceHeader.ClientAddressCountryName == 0 ? "" : ("," + pPurchaseInvoiceHeader.ClientAddressCountryName));
            ReportHTML += '                         ' + '<br>';
            //if ($("#cbPrintMBL").prop("checked"))
            ReportHTML += '                 <b>' + (pOperationHeader.TransportType == 2 ? 'AWB #' : 'MB/L No.') + ': </b>' + (pOperationHeader.MasterBL == 0 ? "" : pOperationHeader.MasterBL) + '<br>';
            //if ($("#cbPrintHBL").prop("checked")) {
            //    if (pHouseBLs != "0")//Master Operation so show all houses on it
            //        ReportHTML += '             <b>HBL</b>: ' + (pOperationHeader.HouseBLs == 0 ? "" : pOperationHeader.HouseBLs) + '<br>';
            //    else if (pHouseNumber != "0" && !$("#cbIsDirect").prop("checked"))
            //        ReportHTML += '             <b>HB/L No.:</b> ' + (pOperationHeader.HouseNumber == 0 ? "" : pOperationHeader.HouseNumber) + '<br>';
            //}
            ReportHTML += '                     <b>Weight : </b>' + pOperationHeader.GrossWeightSum + ' KG ' + (pOperationHeader.PackageTypes == 0 ? (pOperationHeader.ContainerTypes == 0 ? "" : (" - " + pOperationHeader.ContainerTypes)) : (" - " + pOperationHeader.PackageTypes)) + '<br>';
            if (pOperationHeader.MasterOperationCode != "0")
                ReportHTML += '                 <b>Operation : </b>' + pOperationHeader.MasterOperationCode;
            else
                ReportHTML += '                     <b>Operation : </b>' + pOperationHeader.Code + '<br>';
            ReportHTML += '                     <b>PO No : </b>' + (pOperationHeader.PONumber == 0 ? (pMasterOperationHeader == null || pMasterOperationHeader.PONumber == 0 ? "" : pMasterOperationHeader.PONumber) : pOperationHeader.PONumber) + '<br>';
            ReportHTML += '                     <b>SO Ref : </b>' + (pOperationHeader.SupplierReference == 0 ? (pMasterOperationHeader == null || pMasterOperationHeader.SupplierReference == 0 ? "" : pMasterOperationHeader.SupplierReference) : pOperationHeader.SupplierReference) + '<br>';
            ReportHTML += '                 </div>';
            //ReportHTML += '             </div>';

            ReportHTML += '             <div class="col-xs-12 clear">';
            ReportHTML += '                 <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
            ReportHTML += '                     <thead>';
            ReportHTML += '                         <tr>';
            ReportHTML += '                             <th>Description</th>';
            ReportHTML += '                             <th>Part No</th>';
            ReportHTML += '                             <th>Quantity</th>';
            ReportHTML += '                             <th>Unit Price</th>';
            ReportHTML += '                             <th>Sale Price</th>';
            ReportHTML += '                         </tr>';
            ReportHTML += '                     </thead>';
            ReportHTML += '                     <tbody>';
            $.each(pPurchaseInvoiceItems, function (i, item) {
                ReportHTML += '                         <tr class="input-md" style="font-size:95%;">';
                //ReportHTML += '                             <td>' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                ReportHTML += '                             <td>' + item.PurchaseItemName + '</td>';
                ReportHTML += '                             <td>' + (item.PartNumber == 0 ? "" : item.PartNumber) + '</td>';
                ReportHTML += '                             <td>' + item.Quantity + '</td>';
                ReportHTML += '                             <td style="width:15%;">' + '<span style="float:left;">' + pPurchaseInvoiceHeader.CurrencyCode + '</span>' + '<span style="float:right;">' + (item.UnitPrice + (item.UnitPrice * _NotSelectedReceivablesTotal / pPurchaseInvoiceHeader.AmountWithoutVAT)).toFixed(2) + '</span>' + '</td>';
                ReportHTML += '                             <td style="width:15%;">' + '<span style="float:left;">' + pPurchaseInvoiceHeader.CurrencyCode + '</span>' + '<span style="float:right;">' + (item.Amount + (item.Amount * _NotSelectedReceivablesTotal / pPurchaseInvoiceHeader.AmountWithoutVAT)).toFixed(2) + '</span>' + '</td>';
                ReportHTML += '                         </tr>';
            });
            ReportHTML += '                     </tbody>';
            ReportHTML += '                 </table>';
            ReportHTML += '             </div>'
            //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
            //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices #" + pID + " td.InvoiceCurrency").text() + ' / (' + $("#tblInvoices #" + pID + " td.InvoiceAmount").text() + ' ' + $("#tblInvoices #" + pID + " td.InvoiceCurrency").text() + ')' + '</b>';
            //ReportHTML += '                         </div>';
            //ReportHTML += '                         <div class="clear m-l col-xs-6 text-left"><b>ACCOUNTING</b></div>';
            //ReportHTML += '                         <div class="float-right text-right m-t-n col-xs-6 m-r"><b>APPROVAL</b></div>';
            ReportHTML += '                         <div class="col-xs-7 m-t-n">';
            //if ($("#cbPrintBankDetailsFromDefaults").prop("checked")) {
            //    ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
            //    ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
            //    ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
            //    ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
            //    ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
            //    ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
            //}
            //else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
            //    ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
            //    ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
            //}
            //else {
            ReportHTML += '</br>';
            //}
            ReportHTML += '                         </div>';
            ReportHTML += '                         <div class="col-xs-5 text-right m-t-n">';
            //if (pPurchaseInvoiceHeader.TaxAmount != 0 || pPurchaseInvoiceHeader.DiscountAmount != 0)
            //    ReportHTML += '                             <b>Subtotal: </b>' + pPurchaseInvoiceHeader.CurrencyCode + ' ' + _SubTotal + '</br>';
            //if (pPurchaseInvoiceHeader.TaxAmount != 0)
            //    ReportHTML += '                             <b>VAT(' + pPurchaseInvoiceHeader.TaxPercentage + '%): </b>' + pPurchaseInvoiceHeader.CurrencyCode + ' ' + pPurchaseInvoiceHeader.TaxAmount + '</br>';
            //if (pPurchaseInvoiceHeader.DiscountAmount != 0)
            //    ReportHTML += '                             <b>Discount Taxes(' + pPurchaseInvoiceHeader.DiscountPercentage + '%): </b>' + pPurchaseInvoiceHeader.CurrencyCode + ' ' + pPurchaseInvoiceHeader.DiscountAmount + '</br>';
            //if ($("#cbAddReceivablesToPurchaseInvoice").prop("checked"))
            debugger;
            if (_VATTotal != 0) {
                ReportHTML += '                             <b>Subtotal: </b>' + pPurchaseInvoiceHeader.CurrencyCode + ' ' + _SubTotal.toFixed(2) + '</br>';
                for (var i = 0; i < _VATReceivableItemsIDs.split(',').length; i++) {
                    var _itemVATAmount = 0;
                    if ($("#tblReceivables tbody tr#" + _VATReceivableItemsIDs.split(',')[i] + " td.ReceivableCurrency").attr("val") == pPurchaseInvoiceHeader.CurrencyID)
                        _itemVATAmount = $("#tblReceivables tbody tr#" + _VATReceivableItemsIDs.split(',')[i] + " td.ReceivableSaleAmount").text();
                    else
                        _itemVATAmount = (parseFloat($("#tblReceivables tbody tr#" + _VATReceivableItemsIDs.split(',')[i] + " td.ReceivableSaleAmount").text()) * parseFloat($("#tblReceivables tbody tr#" + _VATReceivableItemsIDs.split(',')[i] + " td.ReceivableExchangeRate").text()) / pPurchaseInvoiceHeader.ExchangeRate).toFixed(2);
                    ReportHTML += '                             <b>' + $("#tblReceivables tbody tr#" + _VATReceivableItemsIDs.split(',')[i] + " td.Receivable").text() + ': </b>' + pPurchaseInvoiceHeader.CurrencyCode + ' ' + _itemVATAmount + '</br>';
                }
            }
            //ReportHTML += '                             <b>Total: </b>' + pPurchaseInvoiceHeader.CurrencyCode + ' <b>' + pPurchaseInvoiceHeader.Amount + '</b></br>';
            //ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(pPurchaseInvoiceHeader.Amount) + ' ' + pPurchaseInvoiceHeader.CurrencyCode + '</br>';
            ReportHTML += '                             <b>Total: </b>' + pPurchaseInvoiceHeader.CurrencyCode + ' <b>' + _TotalWithVAT + '</b></br>';
            ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(_TotalWithVAT) + ' ' + pPurchaseInvoiceHeader.CurrencyCode + '</br>';
            ReportHTML += '                         </div>';
            //ReportHTML += '                     </div>'; //of table-responsive
            //ReportHTML += '                 </section>';
            //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
            ReportHTML += '         </body>';

            //ReportHTML += '     <footer class="footer col-xs-12 ' + ($("#cbPrintFooterInvoice").prop("checked") ? "" : " hide ") + '" style="width:100%; position:absolute; bottom:0;">';
            ReportHTML += '     <footer class="footer col-xs-12 ' + " hide " + '" style="width:100%; position:absolute; bottom:0;">';
            //ReportHTML += '         <div class="row">'
            //ReportHTML += '             <div class="col-xs-8 m-l"><b><i>' + ($("#tblInvoices #" + pID + " td.DirectionType").text() == 1
            //                                                                ? 'Import Manager'
            //                                                                : ($("#tblInvoices #" + pID + " td.DirectionType").text() == 2 ? 'Export Manager' : 'Domestic Manager')
            //                                                                ) + '</i></b></div>';
            //ReportHTML += '             <div class="col-xs-4 m-t-n-md float-right"><b><i>Accountant Signature</i></b></div>';
            //ReportHTML += '         </div>'
            //ReportHTML += '         <div class="row text-right m-r m-t-sm">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
            //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
            //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
            //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
            ReportHTML += '     </footer>';
            ReportHTML += '</html>';
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
            FadePageCover(false);
        }
        , null);
}
/*******************Purchase Invoice Details*********************/
function PurchaseInvoiceItem_BindTableRows(pTableRows) {
    {
        debugger;
        ClearAllTableRows("tblPurchaseInvoiceItem");
        //var editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        //var printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Cashier") + "</span>";
        //var notificationsControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-quote-left' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Notifications") + "</span>";
        //var cancelControlsText = " class='btn btn-xs btn-rounded btn-danger float-right' > <i class='fa ' style='padding-left: 5px;'>X &nbsp;&nbsp;&nbsp;</i> <span style='padding-right: 5px;'>" + "إلغاء" + "</span>";
        //var cancelledControlsText = " class='btn btn-xs btn-rounded btn-danger float-right' > <i class='fa ' style='padding-left: 5px;'>X </i> <span style='padding-right: 5px;'>" + "تم إلغائها" + "</span>";
        //var restoreControlsText = " class='btn btn-xs btn-rounded btn-warning float-right' > <i class='fa fa-undo' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "استعادة" + "</span>";
        $.each(pTableRows, function (i, item) {
            AppendRowtoTable("tblPurchaseInvoiceItem",
                ("<tr ID='" + item.ID + "' "
                    //+ (" ondblclick='PurchaseInvoiceItem_EditByDblClick(" + item.ID + ");' ")
                    + (
                        (item.IsApproved && OEPurInv)
                        ? ""//(" class='text-danger' ")
                        : ""//(" ondblclick='PurchaseInvoiceItem_FillControls(" + item.ID + ");' ")
                        )
                    + ">"
                        + "<td class='PurchaseInvoiceItemID'> <input " + (item.IsApproved ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + item.ID + "' /></td>"
                        + "<td class='PurchaseInvoiceID hide'>" + item.PurchaseInvoiceID + "</td>"
                        + "<td class='PurchaseItemID hide'>" + item.PurchaseItemID + "</td>"
                        + "<td class='PurchaseItemName'>" + item.PurchaseItemName + "</td>"
                        + "<td class='PurchaseItemPartNumber'>" + (item.PartNumber == 0 ? "" : item.PartNumber) + "</td>"
                        + "<td class='PurchaseItemQuantity'>" + item.Quantity + "</td>"
                        + "<td class='PurchaseItemCountryOfOriginID hide'>" + item.CountryOfOriginID + "</td>"
                        + "<td class='PurchaseItemCountryOfOriginName'>" + (item.CountryOfOriginID == 0 ? "" : item.CountryOfOriginName) + "</td>"
                        + "<td class='PurchaseItemHSCode'>" + (item.HSCode == 0 ? "" : item.HSCode) + "</td>"
                        + "<td class='PurchaseItemUnitPrice'>" + (item.UnitPrice == 0 ? "" : item.UnitPrice) + "</td>"
                        + "<td class='PurchaseItemAmount'>" + item.Amount + "</td>"
                        + "<td class='PurchaseItemNotes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                        + "<td class='hide'><a href='#PurchaseInvoiceItemModal' data-toggle='modal' onclick='PurchaseInvoiceItem_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
                + "</tr>"));
        });
        //ApplyPermissions();
        if (OEPurInv && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePurchaseInvoiceItem").removeClass("hide"); else $("#btn-DeletePurchaseInvoiceItem").addClass("hide");
        BindAllCheckboxonTable("tblPurchaseInvoiceItem", "PurchaseInvoiceItemID", "cbPurchaseInvoiceItemDeleteHeader");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
        CheckAllCheckbox("HeaderDeletePurchaseInvoiceItemID");
        //HighlightText("#tblPurchaseInvoiceItem>tbody>tr", $("#txt-Search").val().trim());
        if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
            swal(strSorry, strDeleteFailMessage, "warning");
            showDeleteFailMessage = false;
        }
        $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
    }
}
/****************************EOF PurchaseInvoice & PurchaseInvoiceDetails*******************************************/
/******************************Invoices fns********************************************/
/////////////////////////////////////////GetLists////////////////////////////////////////////////////////
function InvoicePartners_GetList(pID, pInvoiceOperationID, pSlName, callback) {
    var pWhereClause = " WHERE OperationID = " + pInvoiceOperationID;
    //var pWhereClause = " WHERE (OperationID = " + pInvoiceOperationID + " OR MasterOperationID = " + pInvoiceOperationID + " ) \n";
    pWhereClause += " AND PartnerID IS NOT NULL ";
    pWhereClause += " AND (PartnerTypeID = " + constCustomerPartnerTypeID;
    pWhereClause += " OR PartnerTypeID = " + constAgentPartnerTypeID + ") ";
    pWhereClause += " OR ID = " + pID;
    pWhereClause += " ORDER BY PartnerTypeName ";
    //parameters: ID, strFnName, First Row in select list, select list name, whereClause, callback
    GetListOperationPartnersWithPartnerTypeIDAndPartnerIDAttrAndWhereClause(pID, "/api/OperationPartners/LoadAll", "Select Partner", pSlName, pWhereClause
        , function () {
            //if ((pID == null || pID == undefined) && $("#" + pSlName + " :nth-of-type(2)").val() != undefined) {
            //    $("#" + pSlName).val($("#" + pSlName + " :nth-of-type(2)").val());//to select the 1st item
            if (callback != null && callback != undefined)
                callback();
            //}
        });
}
function InvoiceOperations_GetList(pOperationID, pSlName, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    var pWhereClause = " WHERE ID = " + pOperationID + " OR MasterOperationID = " + pOperationID;
    //GetListWithOpCodeAndHouseNoAndClientEmailAttr(pOperationID, "/api/Operations/LoadAll", null, pSlName, pWhereClause);
    GetListWithOpCodeAndHouseNoAndClientEmailAttr(pOperationID, "/api/Operations/LoadWithParameters", null, pSlName, { pPageNumber: 1, pPageSize: 99999, pWhereClause: pWhereClause, pOrderBy: "HouseNumber" });
    if (callback != null & callback != undefined)
        callback();
}
function InvoiceAddressTypes_GetList(pID, pSlName, pOperationPartnerSlName, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    pWhereClause = "";
    pWhereClause = " Where (PartnerID = " + ($("#" + pOperationPartnerSlName + " option:selected").attr("PartnerID") == "" ? 0 : $("#" + pOperationPartnerSlName + " option:selected").attr("PartnerID"));
    pWhereClause += "  AND PartnerTypeID=" + ($("#" + pOperationPartnerSlName + " option:selected").attr("PartnerTypeID") == "" ? 0 : $("#" + pOperationPartnerSlName + " option:selected").attr("PartnerTypeID")) + ") ";
    if (pID != null)
        pWhereClause += " OR ID = " + pID;
    pWhereClause += " ORDER BY AddressTypeID ";
    debugger;
    GetListAddressesWithMultipleAttr(pID, "/api/Addresses/LoadAll", "Select Address Type", pSlName, pWhereClause
        , function () {
            if ((pID == null || pID == undefined) && $("#" + pSlName + " :nth-of-type(2)").val() != undefined)
                $("#" + pSlName).val($("#" + pSlName + " :nth-of-type(2)").val());//to select the 1st item
        });
}
/////////////////////////////////////EOF GetLists////////////////////////////////////////////////////////
