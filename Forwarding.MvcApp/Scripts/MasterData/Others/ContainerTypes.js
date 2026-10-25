// ContainerTypes Region ---------------------------------------------------------------
// Bind ContainerTypes Table Rows
function ContainerTypes_BindTableRows(pContainerTypes) {
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblContainerTypes");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pContainerTypes, function (i, item) {
        AppendRowtoTable("tblContainerTypes",
        ("<tr ID='" + item.ID + "' ondblclick='ContainerTypes_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code'>" + item.Code + "</td>"
                    + "<td class='Name'>" + item.Name + "</td>"
                    + "<td class='LocalName'>" + item.LocalName + "</td>"
                    + "<td class='CTypeID hide' val='" + item.CTypeID + "'>" + item.CTypeCode + "</td>"
                    + "<td class='CSizeID hide' val='" + item.CSizeID + "'>" + item.CSizeCode + "</td>"
                    + "<td class='ISOCode hide'>" + item.ISOCode + "</td>"
                    + "<td class='PrintAs'>" + item.PrintAs + "</td>"
                    + "<td class='IsInactive'> <input type='checkbox' disabled='disabled' val='" + (item.IsInactive == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='Notes'>" + item.Notes + "</td>"
                    + "<td class='crmCode hide' val='" + item.crmCode + "'>" + item.crmCode + "</td>"
                    //+ "<td class='IsAddedManually'> <input type='checkbox' disabled='disabled' val='" + (item.IsAddedManually == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='hide'><a href='#ContainerTypeModal' data-toggle='modal' onclick='ContainerTypes_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblContainerTypes", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblContainerTypes>tbody>tr", $("#txt-Search").val().trim());//sherif:new
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    if (IsMESCOCompany) {
        $("#txtcrmCode").parent().removeClass("hide");
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function ContainerTypes_EditByDblClick(pID) {
    jQuery("#ContainerTypeModal").modal("show");
    ContainerTypes_FillControls(pID);
}
// Loading with data
function ContainerTypes_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/ContainerTypes/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { ContainerTypes_BindTableRows(pTabelRows); ContainerTypes_ClearAllControls(); });
    HighlightText("#tblContainerTypes>tbody>tr", $("#txt-Search").val().trim());//sherif:new
}
////sherif: Loading with data and search key
//function ContainerTypes_LoadingWithPagingAndSearch() {//$("#txt-Search").val() is the search key which will be used in the where clause
//    debugger;
//    LoadWithPagingAndSearch("/api/ContainerTypes/LoadWithPaging", $("#txt-Search").val().trim(), ($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1), $('#select-page-size').val().trim(), function (pTabelRows) {
//        ContainerTypes_BindTableRows(pTabelRows); ContainerTypes_ClearAllControls(); if ($("#txt-Search").val() != "" && $("#txt-Search").val() != undefined)
//            HighlightText("#tblContainerTypes>tbody>tr", $("#txt-Search").val().trim());
//    });
//}

// calling web function to add new ContainerType item.
function ContainerTypes_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/ContainerTypes/Insert", { pCTypeID: $('#slCTypes option:selected').val(), pCSizeID: $('#slCSizes option:selected').val(), pCode: $("#txtCode").val().trim(), pName: $("#txtName").val().trim(), pLocalName: $("#txtLocalName").val().trim(), pISOCode: $("#txtISOCode").val().trim(), pPrintAs: $("#txtPrintAs").val().trim(), pNotes: ($("#txtNotes").val() == null ? "" : $("#txtNotes").val().trim()), pIsInactive: $("#cbIsInactive").prop('checked') /*, pIsAddedManually: $("#cbIsAddedManually").prop('checked')*/ }, pSaveandAddNew, "ContainerTypeModal", function () { ContainerTypes_LoadingWithPaging(); });
}

//calling this function for update
function ContainerTypes_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/ContainerTypes/Update", { pID: $("#hID").val(), pCTypeID: $('#slCTypes option:selected').val(), pCSizeID: $('#slCSizes option:selected').val(), pCode: $("#txtCode").val().trim(), pName: $("#txtName").val().trim(), pLocalName: $("#txtLocalName").val().trim(), pISOCode: $("#txtISOCode").val().trim(), pPrintAs: $("#txtPrintAs").val().trim(), pNotes: ($("#txtNotes").val() == null ? "" : $("#txtNotes").val().trim()), pIsInactive: $("#cbIsInactive").prop('checked') /*, pIsAddedManually: $("#cbIsAddedManually").prop('checked')*/ }, pSaveandAddNew, "ContainerTypeModal", function () { ContainerTypes_LoadingWithPaging(); });
}

//sherif: calling this fn is to set the timelocked to null in the DB to unlock the edited field in case of pressing close
function ContainerTypes_UnlockRecord() {
    debugger;
    UnlockFunction("/api/ContainerTypes/UnlockRecord",
        { pID: $("#hID").val() },
        "ContainerTypeModal",
        function () { ContainerTypes_LoadingWithPaging(); }); //the callback function
}
//function ContainerTypes_Delete(pID) {
//    DeleteListFunction("/api/ContainerTypes/DeleteByID", { "pID": pID }, function () { ContainerTypes_LoadingWithPaging(); });
//}

function ContainerTypes_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblContainerTypes') != "")
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
            DeleteListFunction("/api/ContainerTypes/Delete", { "pContainerTypesIDs": GetAllSelectedIDsAsString('tblContainerTypes') }, function () { ContainerTypes_LoadingWithPaging(); });
        });
    //DeleteListFunction("/api/ContainerTypes/Delete", { "pContainerTypesIDs": GetAllSelectedIDsAsString('tblContainerTypes') }, function () { ContainerTypes_LoadingWithPaging(); });
}

//after pressing edit, this function fills the data
function ContainerTypes_FillControls(pID) {
    ContainerTypes_ClearAllControls(function () {
        //next line is to check if row is locked by another user
        //Check("/api/ContainerTypes/CheckRow", { 'pID': pID }, function () {
            // Fill All Modal Controls
            var tr = $("tr[ID='" + pID + "']");

            $("#hID").val(pID);
            
            debugger;
            //the next 4 lines are to set the slCTypes and slCSizes to the value entered before
            var pCTypeID = $(tr).find("td.CTypeID").attr('val'); //store the val in a var to be re-entered in the select box
            var pCSizeID = $(tr).find("td.CSizeID").attr('val');
            CTypes_GetList(pCTypeID, null);
            CSizes_GetList(pCSizeID, null);

            $("#lblShown").html(": " + $(tr).find("td.Code").text());
            $("#txtCode").val($(tr).find("td.Code").text());
            $("#txtName").val($(tr).find("td.Name").text());
            $("#txtLocalName").val($(tr).find("td.LocalName").text());
            $("#txtISOCode").val($(tr).find("td.ISOCode").text());
            $("#txtPrintAs").val($(tr).find("td.PrintAs").text());
            $("#txtNotes").val($(tr).find("td.Notes").text());
            $("#cbIsInactive").prop('checked', $(tr).find('td.IsInactive').find('input').attr('val'));
        //$("#cbIsAddedManually").prop('checked', $(tr).find('td.IsAddedManually').find('input').attr('val'));

        if (IsMESCOCompany) {
            let crm = $(tr).find("td.crmCode").text();
            $("#txtcrmCode").val(crm == "0" ? "" : crm);
        }

            $("#btnSave").attr("onclick", "ContainerTypes_Update(false);");
            $("#btnSaveandNew").attr("onclick", "ContainerTypes_Update(true);");
        //});
    });
}

function ContainerTypes_ClearAllControls(callback) {
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName", "txtISOCode", "txtPrintAs", "txtNotes"), new Array("slCTypes", "slCSizes"), new Array("cbIsInactive", "cbIsAddedManually"));//an alternative fn is with abdelmawgood
    ClearAll("#ContainerTypeModal");
    debugger;
    CSizes_GetList(null, null);
    CTypes_GetList(null, null);
    $("#btnSave").attr("onclick", "ContainerTypes_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "ContainerTypes_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
}

//////////////////////////////////////////////////////////////////////////////
//called on slCTypes or slCSizes Change
function ContainerTypes_SetContainerTypeCode() {
    debugger;

    //var CTypeCode = $("#slCTypes").find('option:selected').attr('CTypeCode');
    //var CSizeCode = $("#slCSizes").find('option:selected').attr('CSizeCode');
    var CTypeCode = ($("#slCTypes").find('option:selected').attr('value') == "" ? "" : $("#slCTypes").find('option:selected').html());
    var CSizeCode = ($("#slCSizes").find('option:selected').attr('value') == "" ? "" : $("#slCSizes").find('option:selected').html());
    $("#txtCode").val(
        (CSizeCode == null ? "" : CSizeCode)
        +
        (CTypeCode == null ? "" : CTypeCode)
        );
    $("#txtName").val($("#txtCode").val().trim());
    $("#txtLocalName").val($("#txtCode").val().trim());
    $("#txtPrintAs").val($("#txtCode").val().trim());
}

// EOF ContainerTypes Region ---------------------------------------------------------------

//to fill the select boxes
//this is the NoAccess CTypes
//i didn't use the getlist function in the mainapp.master.js coz i need here CTypeCode attribute to set the containertypeCode
function CTypes_GetList(pCTypeID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithCode(pCTypeID, "/api/NoAccessCTypes/LoadAll", "Select Type", "slCTypes");
}
//this is the NoAccess CSizes
//i didn't use the getlist function in the mainapp.master.js coz i need here CSizeCode attribute to set the containertypeCode
function CSizes_GetList(pCSizeID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithCode(pCSizeID, "/api/NoAccessCSizes/LoadAll", "Select Size", "slCSizes");
}
