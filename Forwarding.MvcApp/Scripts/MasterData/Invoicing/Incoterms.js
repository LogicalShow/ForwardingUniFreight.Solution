// Incoterms Region ---------------------------------------------------------------
// Bind Incoterms Table Rows
function Incoterms_BindTableRows(pIncoterms) {
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblIncoterms");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pIncoterms, function (i, item) {
        AppendRowtoTable("tblIncoterms",
        ("<tr ID='" + item.ID + "' ondblclick='Incoterms_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code'>" + item.Code + "</td>"
                    + "<td class='Name'>" + item.Name + "</td>"
                    + "<td class='LocalName'>" + item.LocalName + "</td>"
                    + "<td class='FreightTypeID' val='" + item.FreightTypeID + "'>" + item.FreightTypeCode + "</td>"
                    + "<td class='OtherChargesID' val='" + item.OtherChargesID + "'>" + item.OtherChargesCode + "</td>"
                    //+ "<td class='IsAddedManually'> <input type='checkbox' disabled='disabled' val='" + (item.IsAddedManually == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsInactive'> <input type='checkbox' disabled='disabled' val='" + (item.IsInactive == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='hide'><a href='#IncotermModal' data-toggle='modal' onclick='Incoterms_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
        debugger;
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblIncoterms", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblIncoterms>tbody>tr", $("#txt-Search").val().trim());//sherif:new
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function Incoterms_EditByDblClick(pID) {
    jQuery("#IncotermModal").modal("show");
    Incoterms_FillControls(pID);
}
// Loading with data
function Incoterms_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Incoterms/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { Incoterms_BindTableRows(pTabelRows); Incoterms_ClearAllControls(); });
    HighlightText("#tblIncoterms>tbody>tr", $("#txt-Search").val().trim());//sherif:new
}
//sherif: Loading with data and search key
//function Incoterms_LoadingWithPagingAndSearch() {//$("#txt-Search").val() is the search key which will be used in the where clause
//    debugger;
//    LoadWithPagingAndSearch("/api/Incoterms/LoadWithPaging", $("#txt-Search").val().trim(), ($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1), $('#select-page-size').val().trim(), function (pTabelRows) {
//        Incoterms_BindTableRows(pTabelRows); Incoterms_ClearAllControls(); if ($("#txt-Search").val() != "" && $("#txt-Search").val() != undefined)
//            HighlightText("#tblIncoterms>tbody>tr", $("#txt-Search").val().trim());
//    });
//}

// calling web function to add new Incoterm item.
function Incoterms_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/Incoterms/Insert", { pFreightTypeID: $('#slFreightTypes option:selected').val(), pOtherChargesID: $('#slOtherCharges option:selected').val(), pCode: $("#txtCode").val().trim(), pName: $("#txtName").val().trim(), pLocalName: $("#txtLocalName").val()/*, pIsAddedManually: $("#cbIsAddedManually").prop('checked')*/, pIsInactive: $("#cbIsInactive").prop('checked') }, pSaveandAddNew, "IncotermModal", function () { Incoterms_LoadingWithPaging(); });
}

//calling this function for update
function Incoterms_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/Incoterms/Update", { pID: $("#hID").val(), pFreightTypeID: $('#slFreightTypes option:selected').val(), pOtherChargesID: $('#slOtherCharges option:selected').val(), pCode: $("#txtCode").val().trim(), pName: $("#txtName").val().trim(), pLocalName: $("#txtLocalName").val().trim(), /*pIsAddedManually: $("#cbIsAddedManually").prop('checked'),*/ pIsInactive: $("#cbIsInactive").prop('checked') }, pSaveandAddNew, "IncotermModal", function () { Incoterms_LoadingWithPaging(); });
}

//sherif: calling this fn is to set the timelocked to null in the DB to unlock the edited field in case of pressing close
function Incoterms_UnlockRecord() {
    UnlockFunction("/api/Incoterms/UnlockRecord",
        { pID: $("#hID").val() },
        "IncotermModal",
        function () { Incoterms_LoadingWithPaging(); }); //the callback function
}
//function Incoterms_Delete(pID) {
//    DeleteListFunction("/api/Incoterms/DeleteByID", { "pID": pID }, function () { Incoterms_LoadingWithPaging(); });
//}

function Incoterms_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblIncoterms') != "")
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
            DeleteListFunction("/api/Incoterms/Delete", { "pIncotermsIDs": GetAllSelectedIDsAsString('tblIncoterms') }, function () { Incoterms_LoadingWithPaging(); });
        });
    //DeleteListFunction("/api/Incoterms/Delete", { "pIncotermsIDs": GetAllSelectedIDsAsString('tblIncoterms') }, function () { Incoterms_LoadingWithPaging(); });
}

//after pressing edit, this function fills the data
function Incoterms_FillControls(pID) {
    Incoterms_ClearAllControls(function () {
        //next line is to check if row is locked by another user
        //Check("/api/Incoterms/CheckRow", { 'pID': pID }, function () {
            // Fill All Modal Controls
            var tr = $("tr[ID='" + pID + "']");

            $("#hID").val(pID);
            debugger;
            //the next 4 lines are to set the slFreightTypes and slOtherCharges to the value entered before
            var pFreightTypeID = $(tr).find("td.FreightTypeID").attr('val'); //store the val in a var to be re-entered in the select box
            var pOtherChargesID = $(tr).find("td.OtherChargesID").attr('val');
            FreightTypes_GetList(pFreightTypeID, null);
            OtherCharges_GetList(pOtherChargesID, null);

            $("#lblShown").html(": " + $(tr).find("td.Code").text());
            $("#txtCode").val($(tr).find("td.Code").text());
            $("#txtName").val($(tr).find("td.Name").text());
            $("#txtLocalName").val($(tr).find("td.LocalName").text());
            $("#cbIsAddedManually").prop('checked', $(tr).find('td.IsAddedManually').find('input').attr('val'));
            $("#cbIsInactive").prop('checked', $(tr).find('td.IsInactive').find('input').attr('val'));
            
            $("#btnSave").attr("onclick", "Incoterms_Update(false);");
            $("#btnSaveandNew").attr("onclick", "Incoterms_Update(true);");
        //});
    });
}

function Incoterms_ClearAllControls(callback) {
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slFreightTypes", "slOtherCharges"), new Array("cbIsAddedManually", "cbIsInactive"));//an alternative fn is with abdelmawgood
    ClearAll("#IncotermModal");
    FreightTypes_GetList(null, null);
    OtherCharges_GetList(null, null);
    $("#btnSave").attr("onclick", "Incoterms_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "Incoterms_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
}

// Incoterms Region ---------------------------------------------------------------
//to fill the select boxes
function FreightTypes_GetList(pID, callback) {//the first parameter is used in case of editing to set the Region code or name
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithCodeAndWhereClause(pID, "/api/NoAccessFreightTypes/LoadAll", "Select Freight Type", "slFreightTypes", " WHERE 1=1 ");
}
//to fill the select boxes
function OtherCharges_GetList(pID, callback) {//the first parameter is used in case of editing to set the Region code or name
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithCodeAndWhereClause(pID, "/api/NoAccessFreightTypes/LoadAll", "Select Other Charges", "slOtherCharges", " WHERE 1=1 ");
}
