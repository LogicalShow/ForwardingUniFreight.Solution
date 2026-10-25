// MoveTypes Region ---------------------------------------------------------------
function MoveTypes_BindTableRows(pMoveTypes) {
    if (glbCallingControl == "MoveTypes")
        $("#hl-menu-MasterData").parent().addClass("active");
    else if (glbCallingControl == "ServiceDepartmentBinding")
        $("#hl-menu-Administration").parent().addClass("active");
    ClearAllTableRows("tblMoveTypes");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pMoveTypes, function (i, item) {
        AppendRowtoTable("tblMoveTypes",
        ("<tr ID='" + item.ID + "' ondblclick='MoveTypes_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code'>" + (item.Code == '0' ? '' : item.Code) + "</td>"
                    + "<td class='shownIconName hide' ><i class= 'fa " + item.IconName + " " + item.IconStyle + " fa-2x'/></td>"
                    + "<td class='IconName hide'>" + item.IconName + "</td>"//this line is to get the value of the IconName to fill it in the modal 
                    + "<td class='IconStyle hide'>" + item.IconStyle + "</td>"//this line is to get the value of the IconStyle to fill it in the modal 
                    + "<td class='Name'>" + item.Name + "</td>"
                    + "<td class='LocalName'>" + item.LocalName + "</td>"
                    + "<td class='IsOcean hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsOcean == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsAir hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsAir == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsInland hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsInland == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsCustomsClearance hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsCustomsClearance == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsWarehousing hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsWarehousing == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsInactive'> <input type='checkbox' disabled='disabled' val='" + (item.IsInactive == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='Notes'>" + (item.Notes == '0' ? '' : item.Notes) + "</td>"
                    + "<td class='crmCode hide' val='" + item.crmCode + "'>" + item.crmCode + "</td>"
                    + "<td class='hide'><a href='#MoveTypeModal' data-toggle='modal' onclick='MoveTypes_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblMoveTypes", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblMoveTypes>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    if (IsMESCOCompany) {
        $("#txtcrmCode").parent().removeClass("hide");
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function MoveTypes_EditByDblClick(pID) {
    jQuery("#MoveTypeModal").modal("show");
    MoveTypes_FillControls(pID);
}
function MoveTypes_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/MoveTypes/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { MoveTypes_BindTableRows(pTabelRows); MoveTypes_ClearAllControls(); });
    HighlightText("#tblMoveTypes>tbody>tr", $("#txt-Search").val().trim());
}
function MoveTypes_Insert(pSaveandAddNew) {
    debugger;
    ////this condition is to check if cbIsPort is checked without specifying any port type
    //if ($("#cbIsPort").prop('checked') && !$("#cbIsOcean").prop('checked') && !$("#cbIsAir").prop('checked') && !$("#cbIsInland").prop('checked'))
    //    swal(strSorry, strSelectPortMessage, "warning");
    //else
    InsertUpdateFunction("form", "/api/MoveTypes/Insert", { pCode: $("#txtCode").val().trim(), pName: $("#txtName").val().trim(), pLocalName: $("#txtLocalName").val().trim(), pNotes: $("#txtNotes").val().trim(), pIconName: $("#hTransportIconName").val().trim(), pIconStyle: $("#hTransportIconStyle").val().trim(), pIsOcean: $("#cbIsOcean").prop('checked'), pIsAir: $("#cbIsAir").prop('checked'), pIsInland: $("#cbIsInland").prop('checked'), pIsInactive: $("#cbIsInactive").prop('checked'), pIsCustomsClearance: $("#cbIsCustomsClearance").prop('checked'), pIsWarehousing: $("#cbIsWarehousing").prop('checked') }, pSaveandAddNew, "MoveTypeModal", function () { MoveTypes_LoadingWithPaging(); });
}
function MoveTypes_Update(pSaveandAddNew) {
    ////this condition is to check if cbIsPort is checked without specifying any port type
    //if ($("#cbIsPort").prop('checked') && !$("#cbIsOcean").prop('checked') && !$("#cbIsAir").prop('checked') && !$("#cbIsInland").prop('checked'))
    //    swal(strSorry, strSelectPortMessage, "warning");
    //else
    InsertUpdateFunction("form", "/api/MoveTypes/Update", { pID: $("#hID").val(), pCode: $("#txtCode").val().trim(), pName: $("#txtName").val().trim(), pLocalName: $("#txtLocalName").val().trim(), pNotes: $("#txtNotes").val().trim(), pIconName: $("#hTransportIconName").val().trim(), pIconStyle: $("#hTransportIconStyle").val().trim(), pIsOcean: $("#cbIsOcean").prop('checked'), pIsAir: $("#cbIsAir").prop('checked'), pIsInland: $("#cbIsInland").prop('checked'), pIsInactive: $("#cbIsInactive").prop('checked'), pIsCustomsClearance: $("#cbIsCustomsClearance").prop('checked'), pIsWarehousing: $("#cbIsWarehousing").prop('checked') }, pSaveandAddNew, "MoveTypeModal", function () { MoveTypes_LoadingWithPaging(); });
}
function MoveTypes_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblMoveTypes') != "")
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
            DeleteListFunction("/api/MoveTypes/Delete", { "pMoveTypesIDs": GetAllSelectedIDsAsString('tblMoveTypes') }, function () { MoveTypes_LoadingWithPaging(); });
        });
    //DeleteListFunction("/api/MoveTypes/Delete", { "pMoveTypesIDs": GetAllSelectedIDsAsString('tblMoveTypes') }, function () { MoveTypes_LoadingWithPaging(); });
}
function MoveTypes_FillControls(pID) {
    debugger;
    ClearAll("#MoveTypeModal");

    $("#tblDetails tbody tr").html("");
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/MoveTypes/LoadHeaderWithDetails", {pHeaderID:pID}
        , function (pData) {
            _MessageReturned = pData[0];
            _Header = JSON.parse(pData[1]);
            _ServiceDepartment = JSON.parse(pData[2]);
            Details_BindTableRows(_ServiceDepartment);
            FadePageCover(false);
        }
        , null);
    var tr = $("tr[ID='" + pID + "']");
    $("#hID").val(pID);
    $("#lblShown").html(": " + $(tr).find("td.Code").text());
    $("#txtCode").val($(tr).find("td.Code").text());
    $("#txtName").val($(tr).find("td.Name").text());
    $("#txtLocalName").val($(tr).find("td.LocalName").text());
    $("#txtNotes").val($(tr).find("td.Notes").text());
    $("#hTransportIconName").val($(tr).find("td.IconName").text());
    $("#hTransportIconStyle").val($(tr).find("td.IconStyle").text());
    $("#cbIsOcean").prop('checked', $(tr).find('td.IsOcean').find('input').attr('val'));
    $("#cbIsAir").prop('checked', $(tr).find('td.IsAir').find('input').attr('val'));
    $("#cbIsInland").prop('checked', $(tr).find('td.IsInland').find('input').attr('val'));
    $("#cbIsCustomsClearance").prop('checked', $(tr).find('td.IsCustomsClearance').find('input').attr('val'));
    $("#cbIsWarehousing").prop('checked', $(tr).find('td.IsWarehousing').find('input').attr('val'));
    $("#cbIsInactive").prop('checked', $(tr).find('td.IsInactive').find('input').attr('val'));

    if (IsMESCOCompany) {
        let crm = $(tr).find("td.crmCode").text();
        $("#txtcrmCode").val(crm == "0" ? "" : crm);
    }

    $("#btnSave").attr("onclick", "MoveTypes_Update(false);");
    $("#btnSaveandNew").attr("onclick", "MoveTypes_Update(true);");
}
function MoveTypes_ClearAllControls(callback) {
    //ClearAllControls(new Array("hID", "hIconName", "hIconStyle", "txtCode", "txtName", "txtLocalName", "txtNotes"), null, new Array("cbIsInactive", "cbIsOcean", "cbIsAir", "cbIsInland"));//an alternative fn is with abdelmawgood
    ClearAll("#MoveTypeModal");
    $("#tblDetails tbody tr").html("");
    
    $("#cbIsOcean").prop('checked', true); //set cbIsOcean to the default value
    $("#hTransportIconName").val(OceanIconName); //set to default value
    $("#hTransportIconStyle").val(strOceanIconStyleClassName); //set to default value

    $("#btnSave").attr("onclick", "MoveTypes_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "MoveTypes_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
}
//EOF MoveTypes Region ---------------------------------------------------------------
/*****************************Service Departments******************************/
function Details_BindTableRows(pDetails) {
    ClearAllTableRows("tblDetails");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pDetails, function (i, item) {
        AppendRowtoTable("tblDetails",
        ("<tr ID='" + item.ID + "' " + (1 == 1 ? ("ondblclick='Details_FillControls(" + item.ID + ");'") : "") + ">"
            + "<td class='ID'> <input " + (1 == 1 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "'></td>"
            + "<td class='MoveTypeID hide'>" + item.MoveTypeID + "</td>"
            + "<td class='DepartmentID hide'>" + item.DepartmentID + "</td>"
            + "<td class='DepartmentName'>" + (item.DepartmentName == 0 ? "" : item.DepartmentName) + "</td>"

            + "<td class='OpenDate hide'> <input type='checkbox' disabled='disabled' val='" + (item.OpenDate == true ? "true' checked='checked'" : "'") + " /></td>"
            + "<td class='CloseDate hide'> <input type='checkbox' disabled='disabled' val='" + (item.CloseDate == true ? "true' checked='checked'" : "'") + " /></td>"
            + "<td class='CutOffDate hide'> <input type='checkbox' disabled='disabled' val='" + (item.CutOffDate == true ? "true' checked='checked'" : "'") + " /></td>"
            + "<td class='PODate hide'> <input type='checkbox' disabled='disabled' val='" + (item.PODate == true ? "true' checked='checked'" : "'") + " /></td>"
            + "<td class='ReleaseDate hide'> <input type='checkbox' disabled='disabled' val='" + (item.ReleaseDate == true ? "true' checked='checked'" : "'") + " /></td>"
            + "<td class='ETAPOLDate hide'> <input type='checkbox' disabled='disabled' val='" + (item.ETAPOLDate == true ? "true' checked='checked'" : "'") + " /></td>"
            + "<td class='ATAPOLDate hide'> <input type='checkbox' disabled='disabled' val='" + (item.ATAPOLDate == true ? "true' checked='checked'" : "'") + " /></td>"
            + "<td class='ExpectedDeparture hide'> <input type='checkbox' disabled='disabled' val='" + (item.ExpectedDeparture == true ? "true' checked='checked'" : "'") + " /></td>"
            + "<td class='ActualDeparture hide'> <input type='checkbox' disabled='disabled' val='" + (item.ActualDeparture == true ? "true' checked='checked'" : "'") + " /></td>"
            + "<td class='ExpectedArrival hide'> <input type='checkbox' disabled='disabled' val='" + (item.ExpectedArrival == true ? "true' checked='checked'" : "'") + " /></td>"
            + "<td class='ActualArrival hide'> <input type='checkbox' disabled='disabled' val='" + (item.ActualArrival == true ? "true' checked='checked'" : "'") + " /></td>"
            + "<td class='GateInDate hide'> <input type='checkbox' disabled='disabled' val='" + (item.GateInDate == true ? "true' checked='checked'" : "'") + " /></td>"
            + "<td class='GateOutDate hide'> <input type='checkbox' disabled='disabled' val='" + (item.GateOutDate == true ? "true' checked='checked'" : "'") + " /></td>"
            + "<td class='StuffingDate hide'> <input type='checkbox' disabled='disabled' val='" + (item.StuffingDate == true ? "true' checked='checked'" : "'") + " /></td>"
            + "<td class='DeliveryDate hide'> <input type='checkbox' disabled='disabled' val='" + (item.DeliveryDate == true ? "true' checked='checked'" : "'") + " /></td>"
            + "<td class='CertificateDate hide'> <input type='checkbox' disabled='disabled' val='" + (item.CertificateDate == true ? "true' checked='checked'" : "'") + " /></td>"
            + "<td class='QasimaDate hide'> <input type='checkbox' disabled='disabled' val='" + (item.QasimaDate == true ? "true' checked='checked'" : "'") + " /></td>"

            + "<td class='Notes'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
            + "<td class='ViewOrder hide'>" + item.ViewOrder + "</td>"
            + "<td class='hide'><a href='#DetailsModal' data-toggle='modal' onclick='Details_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
        + "</tr>"));
    });
    ////ApplyPermissions();
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    BindAllCheckboxonTable("tblDetails", "ID", "cb-CheckAll-Details");
    CheckAllCheckbox("HeaderDeleteDetailsID");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function Details_ClearAllControls() {
    debugger;
    if ($("#hID").val() == "")
        swal("Sorry", "Please, save header first.");
    else {
        ClearAll("#DetailsModal");
        $("#btnSaveDetails").attr("onclick", "Details_Save(false);");
        $("#btnSaveAndAddNewDetails").attr("onclick", "Details_Save(true);");
        jQuery("#DetailsModal").modal("show");
    }
}
function Details_FillControls(pID) {
    debugger;
    ClearAll("#DetailsModal");
    $("#hDetailsID").val(pID);
    var tr = $("#tblDetails tr[ID='" + pID + "']");
    $("#slDetailsDepartment").val($(tr).find("td.DepartmentID").text());

    $("#cbOpenDate").prop('checked', $(tr).find('td.OpenDate').find('input').attr('val'));
    $("#cbCloseDate").prop('checked', $(tr).find('td.CloseDate').find('input').attr('val'));
    $("#cbCutOffDate").prop('checked', $(tr).find('td.CutOffDate').find('input').attr('val'));
    $("#cbPODate").prop('checked', $(tr).find('td.PODate').find('input').attr('val'));
    $("#cbReleaseDate").prop('checked', $(tr).find('td.ReleaseDate').find('input').attr('val'));
    $("#cbETAPOLDate").prop('checked', $(tr).find('td.ETAPOLDate').find('input').attr('val'));
    $("#cbATAPOLDate").prop('checked', $(tr).find('td.ATAPOLDate').find('input').attr('val'));
    $("#cbExpectedDeparture").prop('checked', $(tr).find('td.ExpectedDeparture').find('input').attr('val'));
    $("#cbActualDeparture").prop('checked', $(tr).find('td.ActualDeparture').find('input').attr('val'));
    $("#cbExpectedArrival").prop('checked', $(tr).find('td.ExpectedArrival').find('input').attr('val'));
    $("#cbActualArrival").prop('checked', $(tr).find('td.ActualArrival').find('input').attr('val'));
    $("#cbGateInDate").prop('checked', $(tr).find('td.GateInDate').find('input').attr('val'));
    $("#cbGateOutDate").prop('checked', $(tr).find('td.GateOutDate').find('input').attr('val'));
    $("#cbStuffingDate").prop('checked', $(tr).find('td.StuffingDate').find('input').attr('val'));
    $("#cbDeliveryDate").prop('checked', $(tr).find('td.DeliveryDate').find('input').attr('val'));
    $("#cbCertificateDate").prop('checked', $(tr).find('td.CertificateDate').find('input').attr('val'));
    $("#cbQasimaDate").prop('checked', $(tr).find('td.QasimaDate').find('input').attr('val'));

    $("#txtDetailsNotes").val($(tr).find("td.Notes").text());
    $("#txtDetailsViewOrder").val($(tr).find("td.txtDetailsViewOrder").text());
    jQuery("#DetailsModal").modal("show");
}
function Details_Save(pSaveAndNew) {
    debugger;
    FadePageCover(true);
    if (ValidateForm("form", "DetailsModal")) {
        var pParametersWithValues = {
            pDetailsID: $("#hDetailsID").val() == "" ? 0 : $("#hDetailsID").val()
            , pMoveTypeID: $("#hID").val()
            , pDepartmentID: $("#slDetailsDepartment").val() == "" ? 0 : $("#slDetailsDepartment").val()
            , pNotes: $("#txtDetailsNotes").val().trim() == "" ? 0 : $("#txtDetailsNotes").val().trim().toUpperCase()
            , pViewOrder: $("#txtDetailsViewOrder").val() == "" ? 0 : $("#txtDetailsViewOrder").val()

            , pOpenDate: $("#cbOpenDate").prop("checked")
            , pCloseDate: $("#cbCloseDate").prop("checked")
            , pCutOffDate: $("#cbCutOffDate").prop("checked")
            , pPODate: $("#cbPODate").prop("checked")
            , pReleaseDate: $("#cbReleaseDate").prop("checked")
            , pETAPOLDate: $("#cbETAPOLDate").prop("checked")
            , pATAPOLDate: $("#cbATAPOLDate").prop("checked")
            , pExpectedDeparture: $("#cbExpectedDeparture").prop("checked")
            , pActualDeparture: $("#cbActualDeparture").prop("checked")
            , pExpectedArrival: $("#cbExpectedArrival").prop("checked")
            , pActualArrival: $("#cbActualArrival").prop("checked")
            , pGateInDate: $("#cbGateInDate").prop("checked")
            , pGateOutDate: $("#cbGateOutDate").prop("checked")
            , pStuffingDate: $("#cbStuffingDate").prop("checked")
            , pDeliveryDate: $("#cbDeliveryDate").prop("checked")
            , pCertificateDate: $("#cbCertificateDate").prop("checked")
            , pQasimaDate: $("#cbQasimaDate").prop("checked")
        };
        CallGETFunctionWithParameters("/api/MoveTypes/Details_Save", pParametersWithValues
            , function (pData) {
                var _MessageReturned = pData[0];
                if (_MessageReturned == "") {
                    Details_BindTableRows(JSON.parse(pData[1]));
                    if (pSaveAndNew)
                        ClearAll("#DetailsModal");
                    else
                        jQuery("#DetailsModal").modal("hide");
                    swal("Success", "Saved successfully.");
                }
                else
                    swal("Sorry", _MessageReturned);
                FadePageCover(false);
            }
            , null);
    }
    else
        FadePageCover(false);
}
function Details_DeleteList() {
    debugger;
    //Confirmation message to delete
    var pDetailsIDsToDelete = GetAllSelectedIDsAsString('tblDetails');
    if (pDetailsIDsToDelete != "")
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
            CallGETFunctionWithParameters("/api/MoveTypes/Details_Delete"
                , { pDetailsIDsToDelete: pDetailsIDsToDelete, pMoveTypeID: $("#hID").val() }
                , function (pData) {
                    if (pData[0]) {
                        Details_BindTableRows(JSON.parse(pData[1]));
                    }
                    else
                        swal("Sorry", strDeleteFailMessage);
                    FadePageCover(false);
                });
        });
}
