// PackageTypes Region ---------------------------------------------------------------
// Bind PackageTypes Table Rows
function PackageTypes_BindTableRows(pPackageTypes) {
    if (glbCallingControl == "PackageTypes")
        $("#hl-menu-MasterData").parent().addClass("active");
    else
        $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblPackageTypes");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pPackageTypes, function (i, item) {
        AppendRowtoTable("tblPackageTypes",
        ("<tr ID='" + item.ID + "' ondblclick='PackageTypes_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code'>" + item.Code + "</td>"
                    + "<td class='Name'>" + item.Name + "</td>"
                    + "<td class='LocalName'>" + item.LocalName + "</td>"
                    + "<td class='PrintAs'>" + item.PrintAs + "</td>"
                    + "<td class='IsOcean'> <input type='checkbox' disabled='disabled' val='" + (item.IsOcean == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsAir'> <input type='checkbox' disabled='disabled' val='" + (item.IsAir == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsInland'> <input type='checkbox' disabled='disabled' val='" + (item.IsInland == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsCustomsClearance'> <input type='checkbox' disabled='disabled' val='" + (item.IsCustomsClearance == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsWarehousing'> <input type='checkbox' disabled='disabled' val='" + (item.IsWarehousing == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsInactive'> <input type='checkbox' disabled='disabled' val='" + (item.IsInactive == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='Notes'>" + item.Notes + "</td>"
                    + "<td class='crmCode hide' val='" + item.crmCode + "'>" + item.crmCode + "</td>"
                    + "<td class='hide'><a href='#PackageTypeModal' data-toggle='modal' onclick='PackageTypes_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblPackageTypes", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblPackageTypes>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    if (IsMESCOCompany) {
        $("#txtcrmCode").parent().removeClass("hide");
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function PackageTypes_EditByDblClick(pID) {
    jQuery("#PackageTypeModal").modal("show");
    PackageTypes_FillControls(pID);
}
// Loading with data
function PackageTypes_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PackageTypes/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { PackageTypes_BindTableRows(pTabelRows); PackageTypes_ClearAllControls(); });
    HighlightText("#tblPackageTypes>tbody>tr", $("#txt-Search").val().trim());
}
////sherif: Loading with data and search key
//function PackageTypes_LoadingWithPagingAndSearch() {//$("#txt-Search").val() is the search key which will be used in the where clause
//    debugger;
//    LoadWithPagingAndSearch("/api/PackageTypes/LoadWithPaging", $("#txt-Search").val().trim(), ($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1), $('#select-page-size').val().trim(), function (pTabelRows) {
//        PackageTypes_BindTableRows(pTabelRows); PackageTypes_ClearAllControls(); if ($("#txt-Search").val() != "" && $("#txt-Search").val() != undefined)
//            HighlightText("#tblPackageTypes>tbody>tr", $("#txt-Search").val().trim());
//    });
//}

// calling web function to add new PackageType item.
function PackageTypes_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/PackageTypes/Insert", { pCode: $("#txtCode").val().trim(), pName: $("#txtName").val().trim(), pLocalName: $("#txtLocalName").val().trim(), pPrintAs: $("#txtPrintAs").val().trim(), pNotes: $("#txtNotes").val().trim(), pIsOcean: $("#cbIsOcean").prop('checked'), pIsAir: $("#cbIsAir").prop('checked'), pIsInland: $("#cbIsInland").prop('checked'), pIsCustomsClearance: $("#cbIsCustomsClearance").prop('checked'), pIsWarehousing: $("#cbIsWarehousing").prop('checked'), pIsInactive: $("#cbIsInactive").prop('checked') }, pSaveandAddNew, "PackageTypeModal", function () { PackageTypes_LoadingWithPaging(); });
}

//calling this function for update
function PackageTypes_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/PackageTypes/Update", { pID: $("#hID").val(), pCode: $("#txtCode").val().trim(), pName: $("#txtName").val().trim(), pLocalName: $("#txtLocalName").val().trim(), pPrintAs: $("#txtPrintAs").val().trim(), pNotes: $("#txtNotes").val().trim(), pIsOcean: $("#cbIsOcean").prop('checked'), pIsAir: $("#cbIsAir").prop('checked'), pIsInland: $("#cbIsInland").prop('checked'), pIsCustomsClearance: $("#cbIsCustomsClearance").prop('checked'), pIsWarehousing: $("#cbIsWarehousing").prop('checked'), pIsInactive: $("#cbIsInactive").prop('checked') }, pSaveandAddNew, "PackageTypeModal", function () { PackageTypes_LoadingWithPaging(); });
}

//sherif: calling this fn is to set the timelocked to null in the DB to unlock the edited field in case of pressing close
function PackageTypes_UnlockRecord() {
    UnlockFunction("/api/PackageTypes/UnlockRecord",
        { pID: $("#hID").val() },
        "PackageTypeModal",
        function () { PackageTypes_LoadingWithPaging(); }); //the callback function
}
//function PackageTypes_Delete(pID) {
//    DeleteListFunction("/api/PackageTypes/DeleteByID", { "pID": pID }, function () { PackageTypes_LoadingWithPaging(); });
//}

function PackageTypes_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblPackageTypes') != "")
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
            DeleteListFunction("/api/PackageTypes/Delete", { "pPackageTypesIDs": GetAllSelectedIDsAsString('tblPackageTypes') }, function () { PackageTypes_LoadingWithPaging(); });
        });
    //DeleteListFunction("/api/PackageTypes/Delete", { "pPackageTypesIDs": GetAllSelectedIDsAsString('tblPackageTypes') }, function () { PackageTypes_LoadingWithPaging(); });
}

//after pressing edit, this function fills the data
function PackageTypes_FillControls(pID) {
    PackageTypes_ClearAllControls(function () {
        //next line is to check if row is locked by another user
        //Check("/api/PackageTypes/CheckRow", { 'pID': pID }, function () {
            // Fill All Modal Controls
            var tr = $("tr[ID='" + pID + "']");

            $("#hID").val(pID);
            debugger;
            $("#lblShown").html(": " + $(tr).find("td.Code").text());
            $("#txtCode").val($(tr).find("td.Code").text());
            $("#txtName").val($(tr).find("td.Name").text());
            $("#txtLocalName").val($(tr).find("td.LocalName").text());
            $("#txtPrintAs").val($(tr).find("td.PrintAs").text());
            $("#txtNotes").val($(tr).find("td.Notes").text());

            $("#cbIsPackageType").prop('checked', $(tr).find('td.IsPackageType').find('input').attr('val'));
            $("#cbIsAir").prop('checked', $(tr).find('td.IsAir').find('input').attr('val'));
            $("#cbIsOcean").prop('checked', $(tr).find('td.IsOcean').find('input').attr('val'));
            $("#cbIsInland").prop('checked', $(tr).find('td.IsInland').find('input').attr('val'));
            $("#cbIsCustomsClearance").prop('checked', $(tr).find('td.IsCustomsClearance').find('input').attr('val'));
            $("#cbIsWarehousing").prop('checked', $(tr).find('td.IsWarehousing').find('input').attr('val'));
            $("#cbIsInactive").prop('checked', $(tr).find('td.IsInactive').find('input').attr('val'));

            if (IsMESCOCompany) {
                let crm = $(tr).find("td.crmCode").text();
                $("#txtcrmCode").val(crm == "0" ? "" : crm);
            }

            $("#btnSave").attr("onclick", "PackageTypes_Update(false);");
            $("#btnSaveandNew").attr("onclick", "PackageTypes_Update(true);");
        //});
    });
}

function PackageTypes_ClearAllControls(callback) {
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName", "txtNotes", "txtPrintAs"), null, new Array("cbIsInactive", "cbIsOcean", "cbIsAir", "cbIsInland"));//an alternative fn is with abdelmawgood
    ClearAll("#PackageTypeModal");
    

    $("#btnSave").attr("onclick", "PackageTypes_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "PackageTypes_Insert(true);");
    
    $("#cbIsAir").prop('checked',    true);
    $("#cbIsOcean").prop('checked', true);
    $("#cbIsInland").prop('checked', true);
    $("#cbIsCustomsClearance").prop('checked', true);
    $("#cbIsWarehousing").prop('checked', true);
    $("#cbIsInactive").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
}

//////////////////////////////////////////////////////////////////////////////
//called to set PrintAs like the Code
function PackageTypes_SetPrintAs() {
    $("#txtPrintAs").val($("#txtCode").val().trim())
}
//EOF PackageTypes Region ---------------------------------------------------------------
