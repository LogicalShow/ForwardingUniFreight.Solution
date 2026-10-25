// Vessels Region ---------------------------------------------------------------
function Vessels_Initialize() {
    strLoadWithPagingFunctionName = "/api/Vessels/LoadWithPaging";
    //the first parameter in the LoadView() fn. is the route in the RouteConfig
    LoadView("/MasterData/Vessels", "div-content", function () {
        LoadView("/MasterData/ModalVessels", "div-content", function () {
            $("#txt-Search").val("");
        }, null, null, true);//sherif: calling a partial view with only modal called from different places
        
        LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, 0, 10, function (pTabelRows) { Vessels_BindTableRows(pTabelRows); });
    },
        function () { Vessels_ClearAllControls(); },
        function () { Vessels_DeleteList(); });
}
// Bind Vessels Table Rows
function Vessels_BindTableRows(pVessels) {
    debugger;
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblVessels");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pVessels, function (i, item) {
        AppendRowtoTable("tblVessels",
        ("<tr ID='" + item.ID + "' ondblclick='Vessels_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code'>" + (item.Code == 0 ? "" : item.Code) + "</td>"
                    + "<td class='Name'>" + item.Name + "</td>"
                    + "<td class='LocalName'>" + (item.LocalName == 0 ? "" : item.LocalName) + "</td>"
                    + "<td class='CallSign'>" + (item.CallSign == 0 ? "" : item.CallSign) + "</td>"
                    + "<td class='ShippingLine' val='" + item.ShippingLineID + "'>" + (item.ShippingLineID == 0 ? "" : item.ShippingLineName) + "</td>"
                    + "<td class='IsInactive hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsInactive == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='Notes'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                    + "<td class='hide'><a href='#VesselModal' data-toggle='modal' onclick='Vessels_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblVessels", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblVessels>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
    if (pDefaults.UnEditableCompanyName == "UNF") {
        $("#txtCode").attr('data-required', 'false');
        $("#txtCode").prop("disabled", true);
    }

}
function Vessels_EditByDblClick(pID) {
    jQuery("#VesselModal").modal("show");
    Vessels_FillControls(pID);
}
// Loading with data
function Vessels_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Vessels/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { Vessels_BindTableRows(pTabelRows); Vessels_ClearAllControls(); });
    HighlightText("#tblVessels>tbody>tr", $("#txt-Search").val().trim());
    //if (callbackForDeleteFail != null)
    //    callbackForDeleteFail();
}
// calling web function to add new Vessel item.
function Vessels_Insert(pSaveandAddNew, pDontReloadTable) {
    debugger;
    if (!(pDontReloadTable > 0))
        pDontReloadTable = 0;

    var m = pDontReloadTable>0? '#VesselModal':'';
    InsertUpdateFunction("form", "/api/Vessels/Insert", { pCode: $("" + m + " " + "#txtCode").val().trim(), pName: $("" + m + " " + "#txtName").val().trim(), pLocalName: $("" + m + " " + "#txtLocalName").val().trim(), pNotes: ($("" + m + " " + "#txtNotes").val() == null ? "" : $("" + m + " " + "#txtNotes").val().trim()), pCallSign: ($("" + m + " " + "#txtCallSign").val() == null ? "" : $("" + m + " " + "#txtCallSign").val().trim()), pShippingLineID: ($("" + m + " " + "#slShippingLines").val() == "" ? 0 : $("" + m + " " + "#slShippingLines").val()), pIsInactive: $("" + m + " " + "#cbIsInactive").prop('checked') }, pSaveandAddNew, "VesselModal",
        function (pData) {
            debugger;
        if (pSaveandAddNew) {
            Vessels_ClearAllControls();
        }
        if (pDontReloadTable == 0) {
            Vessels_LoadingWithPaging();
        }
        else if (pDontReloadTable == 1) {

        }
        else if (pDontReloadTable == 2) {
            GetListWithCodeAndWhereClause(pData[1], "/api/Vessels/LoadAll", "Select", "slShipmentVesselID", " WHERE 1=1 ORDER BY Name ", null);
        }
    });
}
//calling this function for update
function Vessels_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/Vessels/Update", { pID: $("#hID").val(), pCode: $("#txtCode").val().trim(), pName: $("#txtName").val().trim(), pLocalName: $("#txtLocalName").val().trim(), pNotes: ($("#txtNotes").val() == null ? "" : $("#txtNotes").val().trim()), pCallSign: ($("#txtCallSign").val() == null ? "" : $("#txtCallSign").val().trim()), pShippingLineID: ($("#slShippingLines").val() == "" ? 0 : $("#slShippingLines").val()), pIsInactive: $("#cbIsInactive").prop('checked') }, pSaveandAddNew, "VesselModal", function () { Vessels_LoadingWithPaging(); });
}
//sherif: calling this fn is to set the timelocked to null in the DB to unlock the edited field in case of pressing close
function Vessels_UnlockRecord() {
    UnlockFunction("/api/Vessels/UnlockRecord",
        { pID: $("#hID").val() },
        "VesselModal",
        function () { Vessels_LoadingWithPaging(); }); //the callback function
}
//function Vessels_Delete(pID) {
//    DeleteListFunction("/api/Vessels/DeleteByID", { "pID": pID }, function () { Vessels_LoadingWithPaging(); });
//}
function Vessels_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblVessels') != "")
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
            DeleteListFunction("/api/Vessels/Delete", { "pVesselsIDs": GetAllSelectedIDsAsString('tblVessels') }, function () {
                Vessels_LoadingWithPaging(
                    //this is callback in Vessels_LoadingWithPaging
                    //function() {swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");}
                    );
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}

//after pressing edit, this function fills the data
function Vessels_FillControls(pID) {
    Vessels_ClearAllControls(function () {
        //next line is to check if row is locked by another user
        //Check("/api/Vessels/CheckRow", { 'pID': pID }, function () {
            // Fill All Modal Controls
            var tr = $("tr[ID='" + pID + "']");
            debugger;
            $("#hID").val(pID);
            $("#lblShown").html(": " + $(tr).find("td.Code").text());
            $("#txtCode").val($(tr).find("td.Code").text());
            $("#txtName").val($(tr).find("td.Name").text());
            $("#txtLocalName").val($(tr).find("td.LocalName").text());
            $("#txtNotes").val($(tr).find("td.Notes").text());
            $("#txtCallSign").val($(tr).find("td.CallSign").text());
            $("#cbIsInactive").prop('checked', $(tr).find('td.IsInactive').find('input').attr('val'));
            Vessels_ShippingLinesGetList($(tr).find("td.ShippingLine").attr("val"));

            $("#btnSave").attr("onclick", "Vessels_Update(false);");
            $("#btnSaveandNew").attr("onclick", "Vessels_Update(true);");
        //});
    });
}

function Vessels_ClearAllControls(callback, pDontReloadTable) {
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName", "txtNotes", "txtCallSign"), null, new Array("cbIsInactive"));//an alternative fn is with abdelmawgood
    ClearAll("#VesselModal");
    debugger;
    Vessels_ShippingLinesGetList(null);

    if (!(pDontReloadTable > 0))
        pDontReloadTable = 0;
    var m = pDontReloadTable > 0 ? '#VesselModal' : '';

    $("" + m + " " + "#btnSave").attr("onclick", "Vessels_Insert(false," + pDontReloadTable+");");
    $("" + m + " " + "#btnSaveandNew").attr("onclick", "Vessels_Insert(true," + pDontReloadTable +");");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
}
function Vessels_ShippingLinesGetList(pID) {//pID is used in case of editing to set the ShippingLine code or name
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithNameAndWhereClause(pID, "/api/ShippingLines/LoadAll", "Select Shipping Line", "slShippingLines", " WHERE 1=1 ORDER BY Name ");
}
//EOF Region Vessel ---------------------------------------------------------------
