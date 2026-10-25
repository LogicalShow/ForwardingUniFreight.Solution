// DocumentsInfo Region ---------------------------------------------------------------
// Bind DocumentsInfo Table Rows
function DocumentsInfo_BindTableRows(pDocumentsInfo) {
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblDocumentsInfo");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pDocumentsInfo, function (i, item) {
        let Importance = "";
        if ($("[id$='hf_ChangeLanguage']").val() == "ar")
            Importance = (item.Importance == 10 ? "مطلوب" : "إختياري")
        else
            Importance = (item.Importance == 10 ? "Required" : "Optional")

        AppendRowtoTable("tblDocumentsInfo",
            ("<tr ID='" + item.ID + "' ondblclick='DocumentsInfo_EditByDblClick(" + item.ID + ");'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Code hide'>" + (item.Code == 0 ? "" : item.Code) + "</td>"
                + "<td class='Name' val='" + item.Name + "'>" + (item.Name == 0 ? "" : item.Name) + "</td>"
                + "<td class='Importance hide' val='" + item.Importance + "'>" + Importance + "</td>"
                + "<td class='Degree hide' val='" + item.Degree + "'>" + (item.Degree == 0 ? "" : item.Degree) + "</td>"
                + "<td class='IsImport'> <input type='checkbox' disabled='disabled' val='" + (item.IsImport == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='IsExport'> <input type='checkbox' disabled='disabled' val='" + (item.IsExport == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='IsDomestic'> <input type='checkbox' disabled='disabled' val='" + (item.IsDomestic == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='IsOcean'> <input type='checkbox' disabled='disabled' val='" + (item.IsOcean == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='IsAir'> <input type='checkbox' disabled='disabled' val='" + (item.IsAir == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='IsInland'> <input type='checkbox' disabled='disabled' val='" + (item.IsInland == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='IsFCL hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsFCL == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='IsLCL hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsLCL == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='IsVehicle hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsVehicle == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='IsBulk hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsBulk == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                + "<td class='hide'><a href='#DocumentsInfoModal' data-toggle='modal' onclick='DocumentsInfo_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblDocumentsInfo", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblDocumentsInfo>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    } $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function DocumentsInfo_EditByDblClick(pID) {
    jQuery("#DocumentsInfoModal").modal("show");
    DocumentsInfo_FillControls(pID);
}
// Loading with data
function DocumentsInfo_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/DocumentsInfo/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { DocumentsInfo_BindTableRows(pTabelRows); DocumentsInfo_ClearAllControls(); });
    HighlightText("#tblDocumentsInfo>tbody>tr", $("#txt-Search").val().trim());
    //if (callbackForDeleteFail != null)
    //    callbackForDeleteFail();
}

function DocumentsInfo_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/DocumentsInfo/Save",
        {
            pID: "0",
            pCode: $("#txtCode").val().trim(),
            pName: $("#txtName").val().trim(),
            pDegree: $("#txtDegree").val().trim(),
            pImportance: ($('#cbIsRequired').prop("checked") == true ? "10" : "20"),
            pNotes: ($("#txtNotes").val() == null ? "" : $("#txtNotes").val().trim()),
            pIsImport: $("#cbIsImport").prop('checked'),
            pIsExport: $("#cbIsExport").prop('checked'),
            pIsDomestic: $("#cbIsDomestic").prop('checked'),
            pIsOcean: $("#cbIsOcean").prop('checked'),
            pIsAir: $("#cbIsAir").prop('checked'),
            pIsInland: $("#cbIsInland").prop('checked'),
            pIsFCL: $("#cbIsFCL").prop('checked'),
            pIsLCL: $("#cbIsLCL").prop('checked'),
            pIsVehicle: $("#cbIsVehicle").prop('checked'),
            pIsBulk: $("#cbIsBulk").prop('checked')
        }, pSaveandAddNew, "DocumentsInfoModal", function () { DocumentsInfo_LoadingWithPaging(); });
}
function DocumentsInfo_Update(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/DocumentsInfo/Save",
        {
            pID: $("#hID").val(),
            pCode: $("#txtCode").val().trim(),
            pName: $("#txtName").val().trim(),
            pDegree: $("#txtDegree").val().trim(),
            pImportance: ($('#cbIsRequired').prop("checked") == true ? "10" : "20"),
            pNotes: ($("#txtNotes").val() == null ? "" : $("#txtNotes").val().trim()),
            pIsImport: $("#cbIsImport").prop('checked'),
            pIsExport: $("#cbIsExport").prop('checked'),
            pIsDomestic: $("#cbIsDomestic").prop('checked'),
            pIsOcean: $("#cbIsOcean").prop('checked'),
            pIsAir: $("#cbIsAir").prop('checked'),
            pIsInland: $("#cbIsInland").prop('checked'),
            pIsFCL: $("#cbIsFCL").prop('checked'),
            pIsLCL: $("#cbIsLCL").prop('checked'),
            pIsVehicle: $("#cbIsVehicle").prop('checked'),
            pIsBulk: $("#cbIsBulk").prop('checked')
        }, pSaveandAddNew, "DocumentsInfoModal", function () { DocumentsInfo_LoadingWithPaging(); });
}

function DocumentsInfo_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblDocumentsInfo') != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
            //callback function in case of pressing "Yes, delete"
            function () {
                DeleteListFunction("/api/DocumentsInfo/Delete", { "pDocumentsInfoIDs": GetAllSelectedIDsAsString('tblDocumentsInfo') }, function () {
                    DocumentsInfo_LoadingWithPaging(
                        //this is callback in DocumentsInfo_LoadingWithPaging
                        //function() {swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");}
                    );
                });
                //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
            });
}

//after pressing edit, this function fills the data
function DocumentsInfo_FillControls(pID) {
    DocumentsInfo_ClearAllControls(function () {
        var tr = $("tr[ID='" + pID + "']");
        debugger;
        $("#hID").val(pID);
        // $("#lblShown").html(": " + $(tr).find("td.LocalName").text());
        $("#txtName").val($(tr).find("td.Name").text());
        $("#txtCode").val($(tr).find("td.Code").text());
        $("#txtDegree").val($(tr).find("td.Degree").attr('val'));
        $("#txtNotes").val($(tr).find("td.Notes").text());
        $("#cbIsImport").prop('checked', $(tr).find('td.IsImport').find('input').attr('val'));
        $("#cbIsExport").prop('checked', $(tr).find('td.IsExport').find('input').attr('val'));
        $("#cbIsDomestic").prop('checked', $(tr).find('td.IsDomestic').find('input').attr('val'));
        $("#cbIsOcean").prop('checked', $(tr).find('td.IsOcean').find('input').attr('val'));
        $("#cbIsAir").prop('checked', $(tr).find('td.IsAir').find('input').attr('val'));
        $("#cbIsInland").prop('checked', $(tr).find('td.IsInland').find('input').attr('val'));

        $("#cbIsRequired").prop('checked', ($(tr).find('td.Importance').attr('val') == '10' ? true : false));
        $("#cbIsOptional").prop('checked', ($(tr).find('td.Importance').attr('val') == '20' ? true : false));


        $("#cbIsFCL").prop('checked', $(tr).find('td.IsFCL').find('input').attr('val'));
        $("#cbIsLCL").prop('checked', $(tr).find('td.IsLCL').find('input').attr('val'));
        $("#cbIsVehicle").prop('checked', $(tr).find('td.IsVehicle').find('input').attr('val'));
        $("#cbIsBulk").prop('checked', $(tr).find('td.IsBulk').find('input').attr('val'));

        $("#btnSave").attr("onclick", "DocumentsInfo_Update(false);");
        $("#btnSaveandNew").attr("onclick", "DocumentsInfo_Update(true);");
    });
}

function DocumentsInfo_ClearAllControls(callback) {
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName", "txtNotes", "txtCallSign"), null, new Array("cbIsInactive"));//an alternative fn is with abdelmawgood
    ClearAll("#DocumentsInfoModal");

    $("#btnSave").attr("onclick", "DocumentsInfo_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "DocumentsInfo_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    $("#cbIsFCL").prop('checked', true);
    $("#cbIsLCL").prop('checked', true);
    $("#cbIsVehicle").prop('checked', true);
    $("#cbIsBulk").prop('checked', true);

    if (callback != null && callback != undefined)
        callback();
}
//EOF Region DocumentsInfo ---------------------------------------------------------------
