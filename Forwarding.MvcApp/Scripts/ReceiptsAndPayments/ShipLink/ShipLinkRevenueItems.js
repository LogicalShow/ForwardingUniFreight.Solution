var maxIDInTable = 0; //used to for when adding new row then make td control names unique
function ShipLinkRevenueItems_BindTableRows(pTableRows) {
    debugger;
    $("#hl-menu-ShipLink").parent().addClass("active");
    ClearAllTableRows("tblShipLinkRevenueItems");
    maxIDInTable = 0;
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pTableRows, function (i, item) {
        maxIDInTable = (item.ID > maxIDInTable ? item.ID : maxIDInTable);
        var tr = "";
        tr += "<tr ID='" + item.ID + "' " + ">";
        tr += "     <td class='IsInsert hide'> <input tyShipLinkRevenueItems_slVoyageAccountChangedpe='checkbox' id='IsInsert" + item.ID + "' /></td>";
        tr += "     <td class='ID' style='width:2%;'><input " + (1 == 2 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + item.ID + "' /></td>";
        tr += "     <td class='ShiplinkItemID' style='width:21%;' val='" + item.ShiplinkItemID + "'><p class='text-center' id='cellShiplinkItem" + item.ID + "' ondblclick='ShipLinkRevenueItems_EnterEditModeForSL(" + '"' + "ShiplinkItem" + '",' + item.ID + ");'>" + item.ShipLinkItemName + "</p><select id='slShiplinkItem" + item.ID + "' style='width:112%;' class='controlStyle hide' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='ShipLinkRevenueItems_SetIsRowChanged(id);' data-required='false'>" + "<option RevenueItemID=" + item.ShiplinkItemID + " IsFreightItem=" + (item.IsFreightItem ? 1 : 0) + " value=" + item.ShiplinkItemID + "></option>" + "</select></td>";
        tr += "     <td class='RevenueAccountID' style='width:21%;' val='" + item.RevenueAccountID + "'><p id='cellRevenueAccount" + item.ID + "' class='text-center' ondblclick='ShipLinkRevenueItems_EnterEditModeForSL(" + '"' + "RevenueAccount" + '",' + item.ID + ");'>" + (item.RevenueAccountID == 0 ? "N/A" : item.RevenueAccountName) + "</p><select id='slRevenueAccount" + item.ID + "' style='width:112%;' class='controlStyle hide' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='ShipLinkRevenueItems_SetIsRowChanged(id); ShipLinkRevenueItems_FillslSubAccount20And40(" + item.ID + ",0,0);' data-required='true'>" + "<option value=" + item.RevenueAccountID + "></option>" + "</select></td>";
        tr += "     <td class='VoyageSubAccountID " + ($("#hDefaultUnEditableCompanyName").val() == "KDS" ? "" : "hide") + "' style='width:17%;' val='" + item.VoyageSubAccountID + "'><p class='text-center' id='cellVoyageSubAccount" + item.ID + "' ondblclick='ShipLinkRevenueItems_EnterEditModeForSL(" + '"' + "VoyageSubAccount" + '",' + item.ID + ");'>" + (item.VoyageSubAccountID == 0 ? "N/A" : item.VoyageSubAccountName) + "</p><select id='slVoyageSubAccount" + item.ID + "' style='width:112%;' class='controlStyle hide' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='ShipLinkRevenueItems_SetIsRowChanged(id);' data-required='false'>" + "<option value=" + item.VoyageSubAccountID + "></option>" + "</select></td>";
        tr += "     <td class='RevenueSubAccountID20 " + ($("#hDefaultUnEditableCompanyName").val() == "KDS" ? "hide" : "") + "' style='width:17%;' val='" + item.RevenueSubAccountID20 + "'><p class='text-center' id='cellRevenueSubAccount20" + item.ID + "' ondblclick='ShipLinkRevenueItems_EnterEditModeForSL(" + '"' + "RevenueSubAccount20" + '",' + item.ID + ");'>" + (item.RevenueSubAccountID20 == 0 ? "N/A" : item.RevenueSubAccountName20) + "</p><select id='slRevenueSubAccount20" + item.ID + "' style='width:112%;' class='controlStyle hide' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='ShipLinkRevenueItems_SetIsRowChanged(id);' data-required='false'>" + "<option value=" + item.RevenueSubAccountID20 + "></option>" + "</select></td>";
        tr += "     <td class='RevenueSubAccountID40 " + ($("#hDefaultUnEditableCompanyName").val() == "KDS" ? "hide" : "") + "' style='width:17%;' val='" + item.RevenueSubAccountID40 + "'><p class='text-center' id='cellRevenueSubAccount40" + item.ID + "' ondblclick='ShipLinkRevenueItems_EnterEditModeForSL(" + '"' + "RevenueSubAccount40" + '",' + item.ID + ");'>" + (item.RevenueSubAccountID40 == 0 ? "N/A" : item.RevenueSubAccountName40) + "</p><select id='slRevenueSubAccount40" + item.ID + "' style='width:112%;' class='controlStyle hide' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='ShipLinkRevenueItems_SetIsRowChanged(id);' data-required='false'>" + "<option value=" + item.RevenueSubAccountID40 + "></option>" + "</select></td>";
        tr += "     <td class='CostCenterID' style='width:21%;' val='" + item.CostCenterID + "'><p class='text-center' id='cellCostCenter" + item.ID + "' ondblclick='ShipLinkRevenueItems_EnterEditModeForSL(" + '"' + "CostCenter" + '",' + item.ID + ");'>" + (item.CostCenterID == 0 ? "N/A" : item.CostCenterName) + "</p><select id='slCostCenter" + item.ID + "' style='width:112%;' class='controlStyle classCostCenter hide' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='ShipLinkRevenueItems_SetIsRowChanged(id);' data-required='false'>" + "<option value=" + item.CostCenterID + "></option>" + "</select></td>";
        tr += "     <td class='ImportExport' style='width:6%;' val='" + item.ImportExport + "'><p class='text-center' id='cellImportExport" + item.ID + "' ondblclick='ShipLinkRevenueItems_EnterEditModeForSL(" + '"' + "ImportExport" + '",' + item.ID + ");'>" + (item.ImportExport == "Im" ? "IMPORT" : "EXPORT") + "</p><select id='slImportExport" + item.ID + "' style='width:112%;' class='controlStyle hide' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='ShipLinkRevenueItems_SetIsRowChanged(id);' data-required='false'>" + "<option value='" + item.ImportExport + "'></option>" + "</select></td>";
        tr += "     <td class='Line " + ($("#hDefaultUnEditableCompanyName").val() == "KDS" ? "hide" : "") + "' style='width:21%;' val='" + item.LineID + "'><p class='text-center' id='cellLine" + item.ID + "' ondblclick='ShipLinkRevenueItems_EnterEditModeForSL(" + '"' + "Line" + '",' + item.ID + ");'>" + (item.LineID == 0 ? "N/A" : item.LineName) + "</p><select id='slLine" + item.ID + "' style='width:112%;' class='controlStyle classLine hide' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='ShipLinkRevenueItems_SetIsRowChanged(id);' data-required='flase'>" + "<option value=" + item.LineID + "></option>" + "</select></td>";


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
    ApplyPermissions();
    //SetDatepickerFormat();
    BindAllCheckboxonTable("tblShipLinkRevenueItems", "ID");
    CheckAllCheckbox("ID");
    //HighlightText("#tblJournalTypes>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
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
    if (pControlID == "Line") {
        var pLineID = $(tr).find("td.Line").attr('val');
        ShipLinkRevenueItems_FillLineList("#slLine" + pRowID, pLineID);
    }
    if (pControlID == "VoyageSubAccount") {
        var pVoyageSubAccountID = $(tr).find("td.VoyageSubAccountID").attr('val');
        $("#sl" + pControlID + pRowID).html($("#slVoyageSubAccount").html());
        $("#sl" + pControlID + pRowID).val(VoyageSubAccountID);
    }
    if (pControlID == "RevenueAccount" || pControlID == "RevenueSubAccount20" || pControlID == "RevenueSubAccount40") {
        var pRevenueAccountID = $("#slRevenueAccount" + pRowID).val(); //$(tr).find("td.RevenueAccountID" + pRowID).attr('val');
        var pRevenueSubAccountID20 = $(tr).find("td.RevenueSubAccountID20").attr('val');
        var pRevenueSubAccountID40 = $(tr).find("td.RevenueSubAccountID40").attr('val');
        $("#cellRevenueSubAccount20" + pRowID).addClass("hide");
        $("#slRevenueSubAccount20" + pRowID).removeClass("hide");
        $("#cellRevenueSubAccount40" + pRowID).addClass("hide");
        $("#slRevenueSubAccount40" + pRowID).removeClass("hide");
        ShipLinkRevenueItems_FillslSubAccount20And40(pRowID, pRevenueSubAccountID20, pRevenueSubAccountID40);
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
    tr += "     <td class='RevenueAccountID' style='width:21%;' val=''><select id='slRevenueAccount" + maxIDInTable + "' style='width:112%;' class='controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='ShipLinkRevenueItems_SetIsRowChanged(id); ShipLinkRevenueItems_FillslSubAccount20And40(" + maxIDInTable + ", 0,0);' data-required='true'>" + "<option value=0></option>" + "</select></td>";
    tr += "     <td class='VoyageSubAccountID " + ($("#hDefaultUnEditableCompanyName").val() == "KDS" ? "" : "hide") + "' style='width:21%;' val=''><select id='slVoyageSubAccount" + maxIDInTable + "' style='width:112%;' class='controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='ShipLinkRevenueItems_SetIsRowChanged(id); ' data-required='false'>" + "<option value=0></option>" + "</select></td>";
    tr += "     <td class='RevenueSubAccountID20 " + ($("#hDefaultUnEditableCompanyName").val() == "KDS" ? "hide" : "") + "' style='width:21%;' val=''><select id='slRevenueSubAccount20" + maxIDInTable + "' style='width:112%;' class='controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='ShipLinkRevenueItems_SetIsRowChanged(id); ' data-required='false'>" + "<option value=0>" + TranslateString("SelectFromMenu") + "</option></select></td>";
    tr += "     <td class='RevenueSubAccountID40 " + ($("#hDefaultUnEditableCompanyName").val() == "KDS" ? "hide" : "") + "' style='width:21%;' val=''><select id='slRevenueSubAccount40" + maxIDInTable + "' style='width:112%;' class='controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='ShipLinkRevenueItems_SetIsRowChanged(id); ' data-required='false'>" + "<option value=0>" + TranslateString("SelectFromMenu") + "</option></select></td>";
    tr += "     <td class='CostCenterID' style='width:21%;' val=''><select id='slCostCenter" + maxIDInTable + "' style='width:112%;' class='controlStyle classCostCenter' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='ShipLinkRevenueItems_SetIsRowChanged(id);' data-required='false'>" + "<option value=0></option>" + "</select></td>";
    tr += "     <td class='ImportExport' style='width:6%;' val=''><select id='slImportExport" + maxIDInTable + "' style='width:112%;' class='controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='ShipLinkRevenueItems_SetIsRowChanged(id);' data-required='false'>" + "<option value=0></option>" + "</select></td>";

    tr += "     <td class='Line " + ($("#hDefaultUnEditableCompanyName").val() == "KDS" ? "hide" : "") + "' style='width:21%;' val=''><select id='slLine" + maxIDInTable + "' style='width:112%;' class='controlStyle classLine' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='ShipLinkRevenueItems_SetIsRowChanged(id); ' data-required='flase'>" + "<option value=0>" + TranslateString("SelectFromMenu") + "</option></select></td>";


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
    ShipLinkRevenueItems_FillLineList("#slLine" + maxIDInTable, 0);
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
function ShipLinkRevenueItems_Save() {
    debugger;
    FadePageCover(true);
    if (!ShipLinkRevenueItems_IsValid("div-ShipLinkRevenueItems"))
        FadePageCover(false);
    else if (!ShipLinkRevenueItems_IsUniqueItems())
        FadePageCover(false);
    else { //Valid so save
        var pShiplinkItemIDList = "";
        var pRevenueAccountIDList = "";
        var pRevenueSubAccountID20List = "";
        var pRevenueSubAccountID40List = "";
        var pCostCenterIDList = "";
        var pIsFreightItemList = "";
        var pImportExportList = "";
        var pVoyageSubAccountIDList = "";
        var pLineIDList = "";
        /*****************************Grabbing Data*************************************/
        var pIDList = GetAllIDsAsStringWithNameAttr("tblShipLinkRevenueItems", "Delete");
        var NumberOfRows = $("#tblShipLinkRevenueItems tbody tr").length;
        for (var i = 0; i < NumberOfRows; i++) {
            var currentRowID = pIDList.split(",")[i];
            pShiplinkItemIDList += ((pShiplinkItemIDList == "") ? "" : ",") + $("#slShiplinkItem" + currentRowID + " option:selected").attr("RevenueItemID");
            pRevenueAccountIDList += ((pRevenueAccountIDList == "") ? "" : ",") + $("#slRevenueAccount" + currentRowID).val();
            pRevenueSubAccountID20List += ((pRevenueSubAccountID20List == "") ? "" : ",") + $("#slRevenueSubAccount20" + currentRowID).val();
            pRevenueSubAccountID40List += ((pRevenueSubAccountID40List == "") ? "" : ",") + $("#slRevenueSubAccount40" + currentRowID).val();
            pCostCenterIDList += ((pCostCenterIDList == "") ? "" : ",") + $("#slCostCenter" + currentRowID).val();
            pIsFreightItemList += ((pIsFreightItemList == "") ? "" : ",") + $("#slShiplinkItem" + currentRowID + " option:selected").attr("IsFreightItem");
            pImportExportList += ((pImportExportList == "") ? "" : ",") + $("#slImportExport" + currentRowID).val();
            pVoyageSubAccountIDList += ((pVoyageSubAccountIDList == "") ? "" : ",") + $("#slVoyageSubAccount" + currentRowID).val();//((pVoyageSubAccountIDList == "") ? "" : ",") + ($("#slVoyageSubAccount" + currentRowID).val() == null ? "0" : $("#slVoyageSubAccount" + currentRowID).val());
            pLineIDList += ((pLineIDList == "") ? "" : ",") + $("#slLine" + currentRowID).val();
        }
        var pParametersWithValues = {
            pShiplinkItemIDList: pShiplinkItemIDList
            , pRevenueAccountIDList: pRevenueAccountIDList
            , pRevenueSubAccountID20List: pRevenueSubAccountID20List
            , pRevenueSubAccountID40List: pRevenueSubAccountID40List
            , pCostCenterIDList: pCostCenterIDList
            , pIsFreightItemList: pIsFreightItemList
            , pImportExportList: pImportExportList
            , pVoyageSubAccountIDList: pVoyageSubAccountIDList
            , pVoyageAccountID: $("#slVoyageAccount").val()
            , pLineIDList: pLineIDList
        };
        CallPOSTFunctionWithParameters("/api/ShipLinkRevenueItems/Save", pParametersWithValues
            , function (pData) {
                if (pData[0] == null) {
                    ShipLinkRevenueItems_BindTableRows(JSON.parse(pData[1]))
                    swal("Success", "Saved successfully.");
                }
                else
                    swal("Sorry", pData[0]);

                FadePageCover(false);
            }
            , null);
    }
}
function ShipLinkRevenueItems_SetIsRowChanged(pControlID) {
    debugger;
    var ChangedRowID = $("#" + pControlID).parent().parent().attr("ID");
    $("#SelectedIDsToUpdate" + ChangedRowID).prop("checked", true);
}
//Used for OneEgypt
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
//used to load both slSubAccount (20 & 40)
function ShipLinkRevenueItems_FillslSubAccount20And40(pRowID, pSubAccountID20, pSubAccountID40) {
    debugger;
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/ChartOfLinkingAccounts/LoadSubAccountDetails"
        , {
            pLanguage: $("[id$='hf_ChangeLanguage']").val()
            , pWhereClauseSubAccountDetails: "WHERE IsMain=0 AND Account_ID=" + $("#slRevenueAccount" + pRowID).val()
            , pOrderBy: "Name"
        }
        , function (pData) {
            FillListFromObject_ERP(pSubAccountID20, 4/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slVoyageSubAccount" + pRowID, pData[0]
                , function () {
                    $("#slVoyageSubAccount" + pRowID).html($("#slVoyageSubAccount" + pRowID).html());
                    $("#slVoyageSubAccount" + pRowID).val(pSubAccountID40)
                });
            FadePageCover(false);
        }
        , null);
}
/****************************************************************************/
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
function ShipLinkRevenueItems_FillLineList(pSlName, pValue) {
    debugger;
    if ($("#slLine").html() != "") {
        $(pSlName).html($("#slLine").html());
        $(pSlName).val(pValue);
    }
    else {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/Line/LoadAll"
            , {
                pLanguage: $("[id$='hf_ChangeLanguage']").val()
                , pPageNumber: 1
                , pPageSize: 9999
                , pWhereClause: "WHERE 1=1"
                , pOrderBy: "Name"
            }
            , function (pData) {
                FillListFromObject_ERP(null, 2/*pCodeOrName*/, TranslateString("<--Select-->"), "slLine", pData[0]
                    , function () {
                        $(pSlName).html($("#slLine").html());
                        $(pSlName).val(pValue);
                    });
                FadePageCover(false);
            }
            , null);
    }
}
function ShipLinkRevenueItems_IsValid(pContainerName) {
    var submit = true;
    if ($("#hDefaultUnEditableCompanyName").val() == "KDS") {
        $(".classCostCenter").attr("data-required", "true");
    }
    else {
        $(".classCostCenter").attr("data-required", "false");
    }

    if ($("#hDefaultUnEditableCompanyName").val() == "KDS") {
        $(".classLine").attr("data-required", "false");
    }
    else {
        $(".classLine").attr("data-required", "true");
    }

    $("#slVoyageAccount").attr("data-required", "false");

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
        for (var j = i + 1; j < NumberOfRows && IsUnique; j++) {
            Index2 = j + 1; //To handle header coz it's included in var myTable = document.getElementById("tblShipLinkRevenueItems");
            var ID2 = myTable.getElementsByTagName("tr")[Index2].id;
            if (
                        $("#slImportExport" + ID1).val() == $("#slImportExport" + ID2).val()
                    && $("#slShiplinkItem" + ID1 + " option:selected").attr("RevenueItemID") == $("#slShiplinkItem" + ID2 + " option:selected").attr("RevenueItemID")
                    && $("#slShiplinkItem" + ID1 + " option:selected").attr("IsFreightItem") == $("#slShiplinkItem" + ID2 + " option:selected").attr("IsFreightItem")
                    && $("#hDefaultUnEditableCompanyName").val() == "KDS"
               ) {
                IsUnique = false;
                i = NumberOfRows;
                swal("Sorry", "Item '" + $("#slShiplinkItem" + ID1 + " option:selected").text() + "' for '" + $("#slImportExport" + ID1 + " option:selected").text() + "' is repeated at row " + (j + 1));
            }
            else if (
                        $("#slImportExport" + ID1).val() == $("#slImportExport" + ID2).val()
                    && $("#slShiplinkItem" + ID1 + " option:selected").attr("RevenueItemID") == $("#slShiplinkItem" + ID2 + " option:selected").attr("RevenueItemID")
                    && $("#slShiplinkItem" + ID1 + " option:selected").attr("IsFreightItem") == $("#slShiplinkItem" + ID2 + " option:selected").attr("IsFreightItem")
                    && $("#hDefaultUnEditableCompanyName").val() == "TAR"
                    && $("#slLine" + ID1).val() == $("#slLine" + ID2).val()
               ) {
                IsUnique = false;
                i = NumberOfRows;
                swal("Sorry", "Item '" + $("#slShiplinkItem" + ID1 + " option:selected").text() + "' for '" + $("#slImportExport" + ID1 + " option:selected").text() + "' is repeated at row " + (j + 1));
            }
        }
    });
    if (NumberOfRows == 0)
        IsUnique = true;
    return IsUnique;
}



