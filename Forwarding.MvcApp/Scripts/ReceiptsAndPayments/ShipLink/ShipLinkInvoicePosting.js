var maxIDInTable = 0; //used to for when adding new row then make td control names unique
function ShipLinkInvoicePosting_BindTableRows(pTableRows) {
    debugger;
    $("#hl-menu-ShipLink").parent().addClass("active");
    ClearAllTableRows("tblShipLinkInvoicePosting");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pTableRows, function (i, item) {
        AppendRowtoTable("tblShipLinkInvoicePosting",
            //("<tr ID='" + item.ID + "' ondblclick='Voucher_FillControls(" + item.ID + ");'>"
            ("<tr ID='" + item.ID + "' class='" + (item.JVID1 == 0 ? "" : "text-primary") + "'" + ">"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='IssueDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.IssueDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.IssueDate))) + "</td>"
                    + "<td class='PaymentDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.PaymentDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.PaymentDate))) + "</td>"
                    + "<td class='Amount'>" + item.Amount + "</td>"
                    + "<td class='CurrencyCode'>" + (item.CurrencyCode == 0 ? "" : item.CurrencyCode) + "</td>"
                    + "<td class='InvoiceTypeID hide'>" + item.InvoiceType + "</td>"
                    + "<td class='InvTypeName'>" + (item.InvoiceTypeID == 0 ? "" : item.InvTypeName) + "</td>"
                    + "<td class='InvoiceSerial'>" + (item.InvoiceSerial == 0 ? "" : item.InvoiceSerial) + "</td>"
                    + "<td class='ClientName'>" + (item.ClientName == 0 ? "" : item.ClientName) + "</td>"
                    + "<td class='SafeName'>" + (item.SafeName == 0 ? "" : item.SafeName) + "</td>"
                    + "<td class='VesselName'>" + (item.VesselName == 0 ? "" : item.VesselName) + "</td>"
                    + "<td class='BillNumber'>" + (item.BillNumber == 0 ? "" : item.BillNumber) + "</td>"
                    //+ "<td class='JobNo'>" + (item.JobNo == 0 ? "" : item.JobNo) + "</td>"

             //+ "<td class='hide'><a href='#VoucherModal' data-toggle='modal' onclick='Voucher_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
            + "</tr>"));
    });
    //ApplyPermissions();
    BindAllCheckboxonTable("tblShipLinkInvoicePosting", "ID");
    CheckAllCheckbox("ID");
    //HighlightText("#tblJournalTypes>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function ShipLinkInvoicePosting_LoadingWithPaging() {
    debugger;
    var pWhereClause = ShipLinkInvoicePosting_GetWhereClause();
    if (pDefaults.UnEditableCompanyName == "EGL" && $("#cbIsJV1").prop("checked") == false) {
        strLoadWithPagingFunctionName = "/api/ShipLinkInvoicePosting/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturnedForPayment";
    }
    else {
        strLoadWithPagingFunctionName = "/api/ShipLinkInvoicePosting/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";
    }
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = 1;//($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = $("#cbIsJV1").prop("checked") ? "IssueDate,PaymentDate" : "PaymentDate,IssueDate";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { ShipLinkInvoicePosting_BindTableRows(JSON.parse(pData[0])); });
    //HighlightText("#tblShipLinkInvoicePosting>tbody>tr", $("#txt-Search").val().trim());
}
function ShipLinkInvoicePosting_GetWhereClause() {
    var pWhereClause = "";
    if (pDefaults.UnEditableCompanyName == "EGL" && $("#cbIsJV1").prop("checked") == false) {
        pWhereClause += ("WHERE IssueDate >= '" + GetDateWithFormatyyyyMMdd($("#txtSearchFrom").val()) + "' AND IssueDate<='" + GetDateWithFormatyyyyMMdd($("#txtSearchTo").val()) + " 23:59:59'" + "\n");

    }
    else {
        pWhereClause += $("#cbIsJV1").prop("checked")
            ? ("WHERE IssueDate >= '" + GetDateWithFormatyyyyMMdd($("#txtSearchFrom").val()) + "' AND IssueDate<='" + GetDateWithFormatyyyyMMdd($("#txtSearchTo").val()) + " 23:59:59'" + "\n")
            : ("WHERE PaymentDate >= '" + GetDateWithFormatyyyyMMdd($("#txtSearchFrom").val()) + "' AND PaymentDate<='" + GetDateWithFormatyyyyMMdd($("#txtSearchTo").val()) + " 23:59:59'" + "\n");
        pWhereClause += " AND JVID2 IS NULL" + "\n";
        //pWhereClause += ($("#hDefaultUnEditableCompanyName").val() != "ONE" ? " AND IsAudited=1 " : "");
        if ($("#slInvoiceType").val() != 0)
            pWhereClause += " AND InvoiceTypeID=" + $("#slInvoiceType").val();
        if ($("#slSafe").val() != 0)
            pWhereClause += " AND SafeID=" + $("#slSafe").val();
        if ($("#slVessel").val() != 0)
            pWhereClause += " AND VesselName Like N'%" + $("#slVessel option:selected").text() + "%'" + "\n";
        if ($("#txtSearchInvoiceNo").val().trim() != "")
            pWhereClause += " AND InvoiceSerial LIKE N'" + $("#txtSearchInvoiceNo").val().trim() + "%'" + "\n";
        if ($("#txtSearchBillNo").val().trim() != "")
            pWhereClause += " AND BillNumber LIKE N'" + $("#txtSearchBillNo").val().trim() + "%'" + "\n";
    }
   

    return pWhereClause;
}
function ShipLinkInvoicePosting_LinkRevenueItems() {
    debugger;
    var pSelectedIDs = GetAllSelectedIDsAsString('tblShipLinkInvoicePosting', 'Delete');
    if (pSelectedIDs != "") {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/ShipLinkInvoicePosting/GetRevenueItemsModalData"
            , {
                pSelectedIDsToGetRevenueItems: pSelectedIDs
            }
            , function (pData) {
                var pVoyageAccountID = pData[1];
                var pSubAccounts = pData[2];
                FillListFromObject_ERP(null, 4/*pCodeOrName*/, TranslateString("<--Select-->"), "slVoyageSubAccount", pSubAccounts, null);
                $("#slVoyageAccount").val(pVoyageAccountID);
                jQuery("#ShipLinkRevenueItemsModal").modal("show");
                ShipLinkRevenueItems_BindTableRows(JSON.parse(pData[0]));
                FadePageCover(false);
            }
            , null);
    }
}
function ShipLinkInvoicePosting_Post(pIsSaveRevenueItems) {
    debugger;
    var isValid = true;
    var pPostedSelectedIDs = GetAllSelectedIDsAsString('tblShipLinkInvoicePosting', 'Delete');
    if (pPostedSelectedIDs != "") {
        FadePageCover(true);
        //if the Company is not ONEEgypt then pIsSaveRevenueItems will be false (set in mainapp.js)
        if (pIsSaveRevenueItems) { //then validate Revenue items before saving
            if (!ShipLinkRevenueItems_IsValid("ShipLinkRevenueItemsModal")) {
                isValid = false; FadePageCover(false);
            }
            else if (!ShipLinkRevenueItems_IsUniqueItems()) {
                isValid = false; FadePageCover(false);
            }
        }
        if (isValid) {
            var pShiplinkItemIDList = "";
            var pRevenueAccountIDList = "";
            var pCostCenterIDList = "";
            var pIsFreightItemList = "";
            var pImportExportList = "";
            var pVoyageSubAccountIDList = "";
            /*****************************Grabbing Revenue Items Data*************************************/
            var pSelectedRevenueItemsIDList = GetAllIDsAsStringWithNameAttr("tblShipLinkRevenueItems", "Delete");
            var NumberOfRows = $("#tblShipLinkRevenueItems tbody tr").length;
            for (var i = 0; i < NumberOfRows; i++) {
                var currentRowID = pSelectedRevenueItemsIDList.split(",")[i];
                pShiplinkItemIDList += ((pShiplinkItemIDList == "") ? "" : ",") + $("#slShiplinkItem" + currentRowID + " option:selected").attr("RevenueItemID");
                pRevenueAccountIDList += ((pRevenueAccountIDList == "") ? "" : ",") + $("#slRevenueAccount" + currentRowID).val();
                pCostCenterIDList += ((pCostCenterIDList == "") ? "" : ",") + $("#slCostCenter" + currentRowID).val();
                pIsFreightItemList += ((pIsFreightItemList == "") ? "" : ",") + $("#slShiplinkItem" + currentRowID + " option:selected").attr("IsFreightItem");
                pImportExportList += ((pImportExportList == "") ? "" : ",") + $("#slImportExport" + currentRowID).val();
                pVoyageSubAccountIDList += ((pVoyageSubAccountIDList == "") ? "" : ",") + $("#slVoyageSubAccount" + currentRowID).val();//((pVoyageSubAccountIDList == "") ? "" : ",") + ($("#slVoyageSubAccount" + currentRowID).val() == null ? "0" : $("#slVoyageSubAccount" + currentRowID).val());
            }
            CallGETFunctionWithParameters("/api/ShipLinkInvoicePosting/Post"
                , {
                    pPostedSelectedIDs: pPostedSelectedIDs
                    , pJVDate:  ConvertDateFormat($("#txtJVDate").val().trim())
                    //, pJVDate: $("#txtJVDate").val().trim() //ConvertDateFormat($("#txtJVDate").val().trim())
                    , pIsJV1AndJV2: $("#cbIsJV1AndJV2").prop("checked")
                    , pIsSaveRevenueItems: pIsSaveRevenueItems
                    //RevenueItems parameters
                    , pShiplinkItemIDList: pShiplinkItemIDList
                    , pRevenueAccountIDList: pRevenueAccountIDList
                    , pCostCenterIDList: pCostCenterIDList
                    , pIsFreightItemList: pIsFreightItemList
                    , pImportExportList: pImportExportList
                    , pVoyageSubAccountIDList: pVoyageSubAccountIDList
                    , pVoyageAccountID: $("#slVoyageAccount").val()
                }
                , function (pData) {
                    if (pData[0] == "") {
                        swal("Success", "Saved successfully");
                    }
                    else {
                        swal("Sorry", pData[0]);
                    }
                    jQuery("#ShipLinkRevenueItemsModal").modal("hide");
                    ShipLinkInvoicePosting_LoadingWithPaging();
                    //FadePageCover(false); //done in loadwithpaging
                }
                , null);
        }
    }
}
/************************************Details Fns**********************************************/
function ShipLinkRevenueItems_BindTableRows(pTableRows) {
    debugger;
    ClearAllTableRows("tblShipLinkRevenueItems");
    maxDetailsIDInTable = 0;
    $.each(pTableRows, function (i, item) {
        maxDetailsIDInTable = (item.ID > maxDetailsIDInTable ? item.ID : maxDetailsIDInTable);
        var tr = "";
        tr += "<tr ID='" + item.ID + "' " + ">";
        tr += "     <td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + item.ID + "' /></td>";
        tr += "     <td class='DetailsID' style='width:2%;'><input " + (1 == 2 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + item.ID + "' /></td>";
        tr += "     <td class='ShiplinkItemID' style='width:21%;' val='" + item.ShiplinkItemID + "'><p class='text-center' id='cellShiplinkItem" + item.ID + "' ondblclick='ShipLinkRevenueItems_EnterEditModeForSL(" + '"' + "ShiplinkItem" + '",' + item.ID + ");'>" + item.ShipLinkItemName + "</p><select id='slShiplinkItem" + item.ID + "' style='width:112%;' class='controlStyle hide' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='ShipLinkRevenueItems_SetIsRowChanged(id);' data-required='false'>" + "<option RevenueItemID=" + item.ShiplinkItemID + " IsFreightItem=" + (item.IsFreightItem ? 1 : 0) + " value=" + item.ShiplinkItemID + "></option>" + "</select></td>";
        tr += "     <td class='RevenueAccountID' style='width:21%;' val='" + item.RevenueAccountID + "'><p id='cellRevenueAccount" + item.ID + "' class='text-center' ondblclick='ShipLinkRevenueItems_EnterEditModeForSL(" + '"' + "RevenueAccount" + '",' + item.ID + ");'>" + (item.RevenueAccountID == 0 ? "N/A" : item.RevenueAccountName) + "</p><select id='slRevenueAccount" + item.ID + "' style='width:112%;' class='controlStyle hide' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='ShipLinkRevenueItems_SetIsRowChanged(id);' data-required='true'>" + "<option value=" + item.RevenueAccountID + "></option>" + "</select></td>";
        tr += "     <td class='VoyageSubAccountID' style='width:17%;' val='" + item.VoyageSubAccountID + "'><p class='text-center' id='cellVoyageSubAccount" + item.ID + "' ondblclick='ShipLinkRevenueItems_EnterEditModeForSL(" + '"' + "VoyageSubAccount" + '",' + item.ID + ");'>" + (item.VoyageSubAccountID == 0 ? "N/A" : item.VoyageSubAccountName) + "</p><select id='slVoyageSubAccount" + item.ID + "' style='width:112%;' class='controlStyle hide' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='ShipLinkRevenueItems_SetIsRowChanged(id);' data-required='false'>" + "<option value=" + item.VoyageSubAccountID + "></option>" + "</select></td>";
        tr += "     <td class='CostCenterID' style='width:21%;' val='" + item.CostCenterID + "'><p class='text-center' id='cellCostCenter" + item.ID + "' ondblclick='ShipLinkRevenueItems_EnterEditModeForSL(" + '"' + "CostCenter" + '",' + item.ID + ");'>" + (item.CostCenterID == 0 ? "N/A" : item.CostCenterName) + "</p><select id='slCostCenter" + item.ID + "' style='width:112%;' class='controlStyle hide' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='ShipLinkRevenueItems_SetIsRowChanged(id);' data-required='true'>" + "<option value=" + item.CostCenterID + "></option>" + "</select></td>";
        tr += "     <td class='ImportExport' style='width:6%;' val='" + item.ImportExport + "'><p class='text-center' id='cellImportExport" + item.ID + "' ondblclick='ShipLinkRevenueItems_EnterEditModeForSL(" + '"' + "ImportExport" + '",' + item.ID + ");'>" + (item.ImportExport == "Im" ? "IMPORT" : "EXPORT") + "</p><select id='slImportExport" + item.ID + "' style='width:112%;' class='controlStyle hide' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='ShipLinkRevenueItems_SetIsRowChanged(id);' data-required='false'>" + "<option value='" + item.ImportExport + "'></option>" + "</select></td>";
        tr += "     <td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate' id='SelectedIDsToUpdate" + item.ID + "' type='checkbox' value='" + item.ID + "' /></td>";
        tr += "</tr>";
        AppendRowtoTable("tblShipLinkRevenueItems", tr);
    });
    $.each(pTableRows, function (i, item) {
        debugger;
        $("#slRevenueAccount" + item.ID).html($("#slVoyageAccount").html());
        $("#slRevenueAccount" + item.ID).val(item.RevenueAccountID);
        //$("#slVoyageSubAccount" + item.ID).html($("#slVoyageSubAccount").html());
        //$("#slVoyageSubAccount" + item.ID).val(item.VoyageSubAccountID);
        $("#slImportExport" + item.ID).html($("#slImportExport").html());
        $("#slImportExport" + item.ID).val(item.ImportExport);
    });
    //SetDatepickerFormat();
    BindAllCheckboxonTable("tblShipLinkRevenueItems", "DetailsID", "cbDetailsDeleteHeader");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    CheckAllCheckbox("HeaderDeleteDetailsID");
}
function ShipLinkRevenueItems_EnterEditModeForSL(pControlID, pRowID) {
    debugger;
    var tr = $("#tblShipLinkRevenueItems tr[ID='" + pRowID + "']");
    if ($("#hf_CanEdit").val() == "1") {
        $("#cell" + pControlID + pRowID).addClass("hide");
        $("#sl" + pControlID + pRowID).removeClass("hide");
    }
    if (pControlID == "ShiplinkItem") {
        var pReveueItemName = $(tr).find("td.ShiplinkItemID").text();
        ShipLinkRevenueItems_FillRevenueItemsList("#slShiplinkItem" + pRowID, pReveueItemName);
    }
    if (pControlID == "CostCenter") {
        var pCostCenterID = $(tr).find("td.CostCenterID").attr('val');
        ShipLinkRevenueItems_FillCostCenterList("#slCostCenter" + pRowID, pCostCenterID);
    }
    if (pControlID == "VoyageSubAccount") {
        var pVoyageSubAccountID = $(tr).find("td.VoyageSubAccountID").attr('val');
        $("#sl" + pControlID + pRowID).html($("#slVoyageSubAccount").html());
        $("#sl" + pControlID + pRowID).val(VoyageSubAccountID);
    }
}
function ShipLinkRevenueItems_NewRow() {
    debugger;
    ++maxIDInTable;
    //var copyControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Copy") + "</span>";
    //var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    //var dateValidTo = Date.prototype.addDays(ConvertDateFormat(FormattedTodaysDate), 30);
    var tr = "";
    tr += "<tr ID='" + maxIDInTable + "'>";
    tr += "     <td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + maxIDInTable + "' checked='checked' /></td>";
    tr += "     <td class='ID' style='width:2%;'><input " + (1 == 2 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + maxIDInTable + "' /></td>";
    tr += "     <td class='ShiplinkItemID' style='width:21%;' val=''><select id='slShiplinkItem" + maxIDInTable + "' style='width:112%;' class='controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='ShipLinkRevenueItems_SetIsRowChanged(id);' data-required='false'>" + "<option value=0></option>" + "</select></td>";
    tr += "     <td class='RevenueAccountID' style='width:21%;' val=''><select id='slRevenueAccount" + maxIDInTable + "' style='width:112%;' class='controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='ShipLinkRevenueItems_SetIsRowChanged(id);' data-required='true'>" + "<option value=0></option>" + "</select></td>";
    tr += "     <td class='VoyageSubAccountID' style='width:21%;' val=''><select id='slVoyageSubAccount" + maxIDInTable + "' style='width:112%;' class='controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='ShipLinkRevenueItems_SetIsRowChanged(id); ' data-required='false'>" + "<option value=0></option>" + "</select></td>";
    tr += "     <td class='CostCenterID' style='width:21%;' val=''><select id='slCostCenter" + maxIDInTable + "' style='width:112%;' class='controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='ShipLinkRevenueItems_SetIsRowChanged(id);' data-required='true'>" + "<option value=0></option>" + "</select></td>";
    tr += "     <td class='ImportExport' style='width:6%;' val=''><select id='slImportExport" + maxIDInTable + "' style='width:112%;' class='controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='ShipLinkRevenueItems_SetIsRowChanged(id);' data-required='false'>" + "<option value=0></option>" + "</select></td>";
    tr += "     <td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate' id='SelectedIDsToUpdate" + maxIDInTable + "' type='checkbox' value='" + maxIDInTable + "' /></td>";
    tr += "     <td class='hide'>"
                        //+ "<a href='#'  onclick='Pricing_CopyRow(" + maxIDInTable + ");' " + copyControlsText + "</a>"
                  + "</td>";
    tr += "</tr>";
    //if ($("#tblShipLinkRevenueItems tbody tr").length > 0)
    //    $(tr).insertBefore('#tblShipLinkRevenueItems > tbody > tr:first');
    //else
    $("#tblShipLinkRevenueItems tbody").prepend(tr);
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $("#tblShipLinkRevenueItems tbody tr[ID=" + maxIDInTable + "]").reverseChildren();
    /***************************Filling row controls******************************/
    ShipLinkRevenueItems_FillRevenueItemsList("#slShiplinkItem" + maxIDInTable, 0);
    $("#slRevenueAccount" + maxIDInTable).html($("#slVoyageAccount").html());
    $("#slRevenueAccount" + maxIDInTable).val(0);
    $("#slVoyageSubAccount" + maxIDInTable).html($("#slVoyageSubAccount").html());
    $("#slVoyageSubAccount" + maxIDInTable).val(0);
    ShipLinkRevenueItems_FillCostCenterList("#slCostCenter" + maxIDInTable, 0);

    $("#slImportExport" + maxIDInTable).html($("#slImportExport").html());
    $("#slImportExport" + maxIDInTable).val('Im');

    //SetDatepickerFormat();
    //BindAllCheckboxonTable("tblShipLinkRevenueItems", "ID");
    //BindAllCheckboxonTable("tblShipLinkRevenueItems", "DetailsID", "cbDetailsDeleteHeader");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    /***********************EOF Filling row controls******************************/
}
function ShipLinkRevenueItems_DeleteList() {
    debugger;
    var pSelectedIDs = GetAllSelectedIDsAsString('tblShipLinkRevenueItems', 'Delete');
    if (pSelectedIDs != "") {
        FadePageCover(true);
        for (var i = 0; i < pSelectedIDs.split(",").length; i++)
            $("#tblShipLinkRevenueItems tbody tr[ID=" + pSelectedIDs.split(",")[i] + "]").remove();
        FadePageCover(false);
    }
}
function ShipLinkRevenueItems_SetIsRowChanged(pControlID) {
    debugger;
    var ChangedRowID = $("#" + pControlID).parent().parent().attr("ID");
    $("#SelectedIDsToUpdate" + ChangedRowID).prop("checked", true);
}
function ShipLinkRevenueItems_slVoyageAccountChanged() {
    debugger;
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/ChartOfLinkingAccounts/LoadSubAccountDetails"
        , {
            pLanguage: $("[id$='hf_ChangeLanguage']").val()
            , pWhereClauseSubAccountDetails: "WHERE IsMain=0 AND Account_ID=" + $("#slVoyageAccount").val()
            , pOrderBy: "Name"
        }
        , function (pData) {
            FillListFromObject_ERP(null, 4/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slVoyageSubAccount", pData[0]
                , function () {
                    $("#tblShipLinkRevenueItems tbody tr").each(function (i, item) {
                        $("#slVoyageSubAccount" + item.id).html($("#slVoyageSubAccount").html());
                        $("#cellVoyageSubAccount" + item.id).addClass("hide");
                        $("#slVoyageSubAccount" + item.id).removeClass("hide");
                    });
                });
            FadePageCover(false);
        }
        , null);
}
function ShipLinkRevenueItems_FillRevenueItemsList(pSlName, pValue) {
    debugger;
    // i removed first row beacause its mandatory and i can't and has an item of ID=0 so when validates gives false
    if ($("#slRevenueItem").html() != "") {
        $(pSlName).html($("#slRevenueItem").html());
        if (pValue != 0)
            $(pSlName).val(pValue);
    }
    else {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/ShipLinkRevenueItems/LoadRevenueItems"
            , {
                pLanguage: $("[id$='hf_ChangeLanguage']").val()
                , pPageNumber: 1
                , pPageSize: 9999
                , pWhereClauseRevenueItems: "WHERE 1=1"
                , pOrderBy: "Name"
            }
            , function (pData) {
                FillListFromObject_ERP(null, 9/*pCodeOrName*/, null/*TranslateString("<--Select-->")*/, "slRevenueItem", pData[0]
                    , function () {
                        $(pSlName).html($("#slRevenueItem").html());
                        if (pValue != 0)
                            $(pSlName).val(pValue);
                    });
                FadePageCover(false);
            }
            , null);
    }
}
function ShipLinkRevenueItems_FillCostCenterList(pSlName, pValue) {
    debugger;
    if ($("#slCostCenter").html() != "") {
        $(pSlName).html($("#slCostCenter").html());
        $(pSlName).val(pValue);
    }
    else {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/CostCenters/LoadAll"
            , {
                pLanguage: $("[id$='hf_ChangeLanguage']").val()
                , pPageNumber: 1
                , pPageSize: 9999
                , pWhereClause: "WHERE IsMain=0"
                , pOrderBy: "Name, Code"
            }
            , function (pData) {
                FillListFromObject_ERP(null, 4/*pCodeOrName*/, TranslateString("<--Select-->"), "slCostCenter", pData[0]
                    , function () {
                        $(pSlName).html($("#slCostCenter").html());
                        $(pSlName).val(pValue);
                    });
                FadePageCover(false);
            }
            , null);
    }
}
function ShipLinkRevenueItems_IsValid(pContainerName) {
    var submit = true;
    $.each($('#' + pContainerName + " select[data-required=true]"), function (i, item) {
        $(item).removeClass('validation-error');
        if ($(item).val() == '' || $(item).val() == '0' || $(item).val() == null || $(item).val() == undefined) {
            $(item).addClass('validation-error'); submit = false;
        }
    });
    if (submit) {
        $('input[type="text"].validation-error').removeClass("validation-error");
        $('select.validation-error').removeClass("validation-error");
        $('.div-error').slideUp();
    }
    return submit;
}
function ShipLinkRevenueItems_IsUniqueItems() {
    debugger;
    var IsUnique = true;
    var myTable = document.getElementById("tblShipLinkRevenueItems");
    var NumberOfRows = $('#tblShipLinkRevenueItems tbody tr').length;
    $.each($("#tblShipLinkRevenueItems tbody tr"), function (i, item) {
        var ID1 = item.id;
        for (var j = i + 1; j < NumberOfRows && !IsUnique; j++) {
            Index2 = j + 1; //To handle header coz it's included in var myTable = document.getElementById("tblShipLinkRevenueItems");
            var ID2 = myTable.getElementsByTagName("tr")[Index2].id;
            if (
                   $("#slImportExport" + ID1).val() == $("#slImportExport" + ID2).val()
                    && $("#slShiplinkItem" + ID1 + " option:selected").attr("RevenueItemID") == $("#slShiplinkItem" + ID2 + " option:selected").attr("RevenueItemID")
                    && $("#slShiplinkItem" + ID1 + " option:selected").attr("IsFreightItem") == $("#slShiplinkItem" + ID2 + " option:selected").attr("IsFreightItem")
               ) {
                IsUnique = true;
                i = NumberOfRows;
                swal("Sorry", "Item '" + $("#slShiplinkItem" + ID1 + " option:selected").text() + "' for '" + $("#slImportExport" + ID1 + " option:selected").text() + "' is repeated at row " + (j + 1));
            }
        }
    });
    if (NumberOfRows == 0)
        IsUnique = true;
    return IsUnique;
}
