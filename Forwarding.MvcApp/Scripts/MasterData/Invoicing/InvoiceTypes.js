
function InvoiceTypes_BindTableRows(pInvoiceTypes) {
    debugger;
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblInvoiceTypes");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pInvoiceTypes, function (i, item) {
        let IsDisableEditing = false;
        if (pDefaults.UnEditableCompanyName == "EISAS") {
            if ([6, 29, 30, 12, 15, 31, 13].includes(item.ID)) {
                IsDisableEditing = true;
            }
        }

        if (item.Code != "DRAFT")
            AppendRowtoTable("tblInvoiceTypes",
                ("<tr ID='" + item.ID + "' " + (item.Code == "DRAFT" || IsDisableEditing ? "" : "ondblclick='InvoiceTypes_EditByDblClick(" + item.ID + ");'") + ">"
                    + "<td class='ID'> <input " + (item.Code == "DRAFT" || IsDisableEditing ? " disabled='disabled' " : " name='Delete'") + " type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code'>" + (item.Code == 0 ? "" : item.Code) + "</td>"
                    + "<td class='Name'>" + item.Name + "</td>"
                    + "<td class='LocalName'>" + (item.LocalName == 0 ? "" : item.LocalName) + "</td>"
                    + "<td class='IsMainInvoice hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsMainInvoice == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsForTariff hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsForTariff == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='RemoveVat hide'> <input type='checkbox' disabled='disabled' val='" + (item.RemoveVat == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsInactive hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsInactive == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='Notes'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                    + "<td class='IsWarehouseType'><input type='checkbox' disabled='disabled' val='" + (item.IsWarehouseType == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsSendToETA hide'><input type='checkbox' disabled='disabled' val='" + (item.IsSendToETA == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='hide'><a href='#InvoiceTypeModal' data-toggle='modal' onclick='InvoiceTypes_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblInvoiceTypes", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblInvoiceTypes>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function InvoiceTypes_EditByDblClick(pID) {
    jQuery("#InvoiceTypeModal").modal("show");
    InvoiceTypes_FillControls(pID);
}
function InvoiceTypes_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/InvoiceTypes/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { InvoiceTypes_BindTableRows(pTabelRows); InvoiceTypes_ClearAllControls(); });
    HighlightText("#tblInvoiceTypes>tbody>tr", $("#txt-Search").val().trim());
}
function InvoiceTypes_Insert(pSaveandAddNew) {
    var pSelectedIDs = GetAllSelectedIDsAsStringWithNameAttr("cbInvoiceTypeCharges");//returns string array of IDs
    debugger;
    InsertUpdateFunction("form", "/api/InvoiceTypes/Insert", {
        pCode: $("#txtCode").val().trim(), pName: $("#txtName").val().trim(), pLocalName: $("#txtLocalName").val().trim(), pNotes: $("#txtNotes").val()/*, pIsAddedManually: $("#cbIsAddedManually").prop('checked')*/, pIsInactive: $("#cbIsInactive").prop('checked'), pIsMainInvoice: $("#cbIsMainInvoice").prop('checked')
        , pIsWarehouseType: $("#cbIsWarehouseType").prop('checked')
        , pIsSendToETA: $("#cbIsSendToETA").prop('checked')
        , pIsForTariff: $("#cbIsForTariff").prop('checked')
        , pRemoveVat: $("#cbRemoveVat").prop('checked')
    }, pSaveandAddNew, "InvoiceTypeModal", function () { InvoiceTypes_LoadingWithPaging(); });
}
function InvoiceTypes_Update(pSaveandAddNew) {
    var pSelectedIDs = GetAllSelectedIDsAsStringWithNameAttr("cbInvoiceTypeCharges");//returns string array of IDs
    debugger;
    InsertUpdateFunction("form", "/api/InvoiceTypes/Update", {
        pID: $("#hID").val(), pCode: $("#txtCode").val().trim().toUpperCase(), pName: $("#txtName").val().trim().toUpperCase(), pLocalName: $("#txtLocalName").val().trim().toUpperCase(), pNotes: $("#txtNotes").val().toUpperCase()/*, pIsAddedManually: $("#cbIsAddedManually").prop('checked')*/, pIsInactive: $("#cbIsInactive").prop('checked'), pIsMainInvoice: $("#cbIsMainInvoice").prop('checked')
        , pIsWarehouseType: $("#cbIsWarehouseType").prop('checked')
        , pIsSendToETA: $("#cbIsSendToETA").prop('checked')
        , pIsForTariff: $("#cbIsForTariff").prop('checked')
        , pRemoveVat: $("#cbRemoveVat").prop('checked')
    }, pSaveandAddNew, "InvoiceTypeModal", function () { InvoiceTypes_LoadingWithPaging(); });
}
function InvoiceTypes_DeleteList() {
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblInvoiceTypes') != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
            //callback function in case of success
            function () {
                DeleteListFunction("/api/InvoiceTypes/Delete", { "pInvoiceTypesIDs": GetAllSelectedIDsAsString('tblInvoiceTypes') }, function () { InvoiceTypes_LoadingWithPaging(); });
            });
    //DeleteListFunction("/api/InvoiceTypes/Delete", { "pInvoiceTypesIDs": GetAllSelectedIDsAsString('tblInvoiceTypes') }, function () { InvoiceTypes_LoadingWithPaging(); });
}
function InvoiceTypes_FillControls(pID) {
    //InvoiceTypes_ClearAllControls(function () {
    ////next line is to check if row is locked by another user
    //Check("/api/InvoiceTypes/CheckRow", { 'pID': pID }, function () {
    // Fill All Modal Controls
    ClearAll("#InvoiceTypeModal");
    if (pDefaults.UnEditableCompanyName == "MES")
        $('#txtCode').attr('disabled', 'disabled');

    $("#divChargeBindingControls").removeClass("hide");
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    $("#lblShown").html(": " + $(tr).find("td.Name").text());
    $("#txtCode").val($(tr).find("td.Code").text());
    $("#txtName").val($(tr).find("td.Name").text());
    $("#txtLocalName").val($(tr).find("td.LocalName").text());
    $("#txtNotes").val($(tr).find("td.Notes").text());

    $("#cbIsInactive").prop('checked', $(tr).find('td.IsInactive').find('input').attr('val'));
    $("#cbIsWarehouseType").prop('checked', $(tr).find('td.IsWarehouseType').find('input').attr('val'));
    $("#cbIsSendToETA").prop('checked', $(tr).find('td.IsSendToETA').find('input').attr('val'));
    $("#cbIsMainInvoice").prop('checked', $(tr).find('td.IsMainInvoice').find('input').attr('val'));
    $("#cbIsForTariff").prop('checked', $(tr).find('td.IsForTariff').find('input').attr('val'));
    $("#cbRemoveVat").prop('checked', $(tr).find('td.RemoveVat').find('input').attr('val'));

    InvoiceTypes_GetBindedCharges(pID);
    InvoiceTypes_ChargeTypesGetList();

    $("#btnSave").attr("onclick", "InvoiceTypes_Update(false);");
    $("#btnSaveandNew").attr("onclick", "InvoiceTypes_Update(true);");

    InvoiceTypes_LoadChild(pID, '', 0);

    if ($(tr).find('td.IsMainInvoice').find('input').attr('val'))
        $('#divChildInvoice').removeClass('hide');
    else
        $('#divChildInvoice').addClass('hide');

    //});
    //});
}
function InvoiceTypes_GetBindedCharges(pID, pSearchKey) {
    var pStrFnName = "/api/ChargeTypes/LoadAll";
    var pDivName = "divBindedCharges";
    var ptblModalName = "tblModalInvoiceCharges";
    var pCheckboxNameAttr = "cbInvoiceTypeCharges";
    var pWhereClause = "";
    //pWhereClause += " WHERE 1=1 ";
    //pWhereClause += " AND ( Code LIKE '%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%' OR Name LIKE '%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%') ";
    //pWhereClause += " AND ID NOT IN (SELECT ID from ChargeTypes ";
    //pWhereClause += "                WHERE InvoiceTypeID = " + pID + ") ";
    pWhereClause += " WHERE InvoiceTypeID = " + (pID == null ? 0 : pID);
    pWhereClause += (pSearchKey == null || pSearchKey == undefined ? ""
        : " AND  (ChargeTypeCode LIKE N'%" + pSearchKey + "%' "
        + " OR ChargeTypeName LIKE N'%" + pSearchKey + "%' "
        + " OR ChargeTypeLocalName LIKE N'%" + pSearchKey + "%' ) "
    );
    GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
        , function () {
            HighlightText("#" + pDivName, pSearchKey);
        }
        , 1/*pCodeOrName*/);
}
function InvoiceTypes_BindedChargeTypes_Search() {
    InvoiceTypes_GetBindedCharges($("#hID").val(), $("#txtChargeTypesSearch").val());
}
function InvoiceTypes_GetAvailableCharges(pID, pSearchKey) { //pID is not used here coz i get all unbinded chargetypes
    $("#lblShownItems").html($("#lblShown").html());
    var pStrFnName = "/api/ChargeTypes/LoadAll";
    var pDivName = "divCheckboxesList";
    var ptblModalName = "tblModalInvoiceCharges";
    var pCheckboxNameAttr = "cbInvoiceTypeCharges";
    var pWhereClause = "";
    //pWhereClause += " WHERE 1=1 ";
    //pWhereClause += " AND ( Code LIKE '%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%' OR Name LIKE '%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%') ";
    //pWhereClause += " AND ID NOT IN (SELECT ID from ChargeTypes ";
    //pWhereClause += "                WHERE InvoiceTypeID = " + $("#hID").val() + ") ";
    pWhereClause += " WHERE InvoiceTypeID IS NULL AND IsOperationChargeType=1 ";
    pWhereClause += (pSearchKey == null || pSearchKey == undefined ? ""
        : " AND  (ChargeTypeCode LIKE N'%" + pSearchKey + "%' "
        + " OR ChargeTypeName LIKE N'%" + pSearchKey + "%' "
        + " OR ChargeTypeLocalName LIKE N'%" + pSearchKey + "%' ) "
    );
    GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
        , function () {
            HighlightText("#" + pDivName, pSearchKey);
            $("#btn-SearchItems").attr("onclick", "InvoiceTypes_AvailableChargeTypes_Search();");
            //$("#btnSelectChargesApply").attr("onclick", "Payables_InsertListWithoutValues(true);");
        }
        , 1/*pCodeOrName*/);
}
function InvoiceTypes_AvailableChargeTypes_Search() {
    InvoiceTypes_GetAvailableCharges($("#hID").val(), $("#txtSearchItems").val());
}
function InvoiceTypes_ClearAllControls(callback) {
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName", "txtDays", "txtNotes"), null, new Array("cbIsInactive", "cbIsAddedManually"));//an alternative fn is with abdelmawgood
    ClearAll("#InvoiceTypeModal");
    $("#divChargeBindingControls").addClass("hide");
    $("#btnSave").attr("onclick", "InvoiceTypes_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "InvoiceTypes_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    InvoiceTypes_GetBindedCharges(null);

    if (callback != null && callback != undefined)
        callback();
}
function InvoiceTypes_BindOrUnbindChargeTypes(pInvoiceTypeID) {//pInvoiceTypeID(used as a flag): 0-Unbind  1-BindSingleCharge
    var pSelectedChargeTypesIDs = "";
    pSelectedChargeTypesIDs = (pInvoiceTypeID == 0 ? GetAllSelectedIDsAsStringWithNameAttr("cbInvoiceTypeCharges") : $("#slChargeTypes").val());
    // i send pInvoiceTypeID =1 from calling function in case this is bind so if its 1 then set it to the InvoiceTypeID
    pInvoiceTypeID = (pInvoiceTypeID == 0 ? 0 : $("#hID").val());
    if (pSelectedChargeTypesIDs == "")
        swal(strSorry, "No charges is selected.");
    else {
        debugger;
        $("#InvoiceTypeModal").addClass("loading");
        CallGETFunctionWithParameters("/api/InvoiceTypes/BindOrUnbindList", { pInvoiceTypeID: pInvoiceTypeID, pSelectedChargeTypesIDs: pSelectedChargeTypesIDs }
            , function () {
                InvoiceTypes_GetBindedCharges($("#hID").val());
                InvoiceTypes_ChargeTypesGetList();
            });
        $("#InvoiceTypeModal").removeClass("loading");
    }
}
function InvoiceTypes_ChargeTypesGetList() {//pID is used in case of editing to set the ShippingLine code or name
    //parameters: ID, strFnName, First Row in select list, select list name
    //ID is always 0 coz i reset after binding a charge)
    GetListWithNameAndWhereClause(0, "/api/ChargeTypes/LoadAll", "Select Charge Type", "slChargeTypes", " WHERE InvoiceTypeID IS NULL AND IsOperationChargeType=1 ");
}

////sherif: calling this fn is to set the timelocked to null in the DB to unlock the edited field in case of pressing close
//function InvoiceTypes_UnlockRecord() {
//    UnlockFunction("/api/InvoiceTypes/UnlockRecord",
//        { pID: $("#hID").val() },
//        "InvoiceTypeModal",
//        function () { InvoiceTypes_LoadingWithPaging(); }); //the callback function
//}

function InvoiceTypes_InsertChild() {
    if ($('#slChildInvoiceType').val() == 0)
        swal("", "Choose Invoice Type");
    else
        InvoiceTypes_LoadChild($('#hID').val(), '', $('#slChildInvoiceType').val() );
}
function InvoiceTypes_DeleteChild() {
    if (GetAllSelectedIDsAsString('tblChildInvoiceTypes') != "")
        swal({
            title: "Are you sure?",
            text: "The selected records link will be deleted !",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
            //callback function in case of success
            function () {
                InvoiceTypes_LoadChild($('#hID').val(), GetAllSelectedIDsAsString('tblChildInvoiceTypes'), $('#slChildInvoiceType').val());             
            }
            );
}
function InvoiceTypes_LoadChild(pInvoiceTypeID, pSelectedChildInvoiceTypeIDs, pChildInvoiceTypeID) {

    pParametersWithValues = {
        pInvoiceTypeID: pInvoiceTypeID
        , pSelectedChildInvoiceTypeIDs: pSelectedChildInvoiceTypeIDs
        , pChildInvoiceTypeID: pChildInvoiceTypeID
    };
    CallGETFunctionWithParameters("/api/InvoiceTypes/ChildInvoiceType", pParametersWithValues
        , function (pData) {
            let _ReturnedMessage = pData[0];
            if (_ReturnedMessage == "") {
                FillListFromObject_ERP(null, 2/*pCodeOrName*/, TranslateString("Inv.Type"), "slChildInvoiceType", pData[1], null);
                InvoiceTypes_ChildBindTableRows(JSON.parse( pData[2]));
            }
            else {
                swal("", _ReturnedMessage);
            }
        }, null, true);



}
function InvoiceTypes_ChildBindTableRows(pChildInvoiceTypes) {
    debugger;
    ClearAllTableRows("tblChildInvoiceTypes");
    $.each(pChildInvoiceTypes, function (i, item) {
        let IsDisableEditing = false;
        if (pDefaults.UnEditableCompanyName == "EISAS") {
            if ([6, 29, 30, 12, 15, 31, 13].includes(item.ID)) {
                IsDisableEditing = true;
            }
        }

        if (item.Code != "DRAFT")
            AppendRowtoTable("tblChildInvoiceTypes",
                ("<tr ID='" + item.ID + "' " + (item.Code == "DRAFT" || IsDisableEditing ? "" : "ondblclick='InvoiceTypes_EditByDblClick(" + item.ID + ");'") + ">"
                    + "<td class='ID'> <input " + (item.Code == "DRAFT" || IsDisableEditing ? " disabled='disabled' " : " name='Delete'") + " type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code'>" + (item.Code == 0 ? "" : item.Code) + "</td>"
                    + "<td class='Name'>" + item.Name + "</td>"
                    + "<td class='LocalName'>" + (item.LocalName == 0 ? "" : item.LocalName) + "</td>"
                    + "<td class='IsMainInvoice hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsMainInvoice == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsForTariff hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsForTariff == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='RemoveVat hide'> <input type='checkbox' disabled='disabled' val='" + (item.RemoveVat == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsInactive hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsInactive == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                    + "<td class='IsWarehouseType hide'><input type='checkbox' disabled='disabled' val='" + (item.IsWarehouseType == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsSendToETA hide'><input type='checkbox' disabled='disabled' val='" + (item.IsSendToETA == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='hide'><a href='#InvoiceTypeModal' data-toggle='modal' onclick='InvoiceTypes_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblChildInvoiceTypes", "ID");
    CheckAllCheckbox("ID");
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}