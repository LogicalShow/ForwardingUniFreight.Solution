// TRCK_EquipmentModel Region ---------------------------------------------------------------
// Bind TRCK_EquipmentModel Table Rows
function TRCK_EquipmentModel_BindTableRows(pTRCK_EquipmentModel) {
    debugger;
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblTRCK_EquipmentModel");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pTRCK_EquipmentModel, function (i, item) {
        AppendRowtoTable("tblTRCK_EquipmentModel",
        ("<tr ID='" + item.ID + "' ondblclick='TRCK_EquipmentModel_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' id='"+item.ID+"' type='checkbox' value='" + item.ID + "' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);'/></td>"
                    + "<td class='Code'>" + item.Code + "</td>"
                    + "<td class='Name'>" + item.Name + "</td>"
                    + "<td class='LocalName'>" + item.LocalName + "</td>"
                    + "<td class='hide'><a href='#RegionModal' data-toggle='modal' onclick='TRCK_EquipmentModel_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblTRCK_EquipmentModel", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblTRCK_EquipmentModel>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function TRCK_EquipmentModel_EditByDblClick(pID) {
    jQuery("#RegionModal").modal("show");
    TRCK_EquipmentModel_FillControls(pID);
}
// Loading with data
function TRCK_EquipmentModel_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/TRCK_EquipmentModel/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { TRCK_EquipmentModel_BindTableRows(pTabelRows); TRCK_EquipmentModel_ClearAllControls(); });
    HighlightText("#tblTRCK_EquipmentModel>tbody>tr", $("#txt-Search").val().trim());
    //if (callbackForDeleteFail != null)
    //    callbackForDeleteFail();
}
////sherif: Loading with data and search key
//function TRCK_EquipmentModel_LoadingWithPagingAndSearch() {//$("#txt-Search").val() is the search key which will be used in the where clause
//    debugger;
//    LoadWithPagingAndSearch("/api/TRCK_EquipmentModel/LoadWithPaging", $("#txt-Search").val().trim(), ($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1), $('#select-page-size').val().trim(), function (pTabelRows) {
//        TRCK_EquipmentModel_BindTableRows(pTabelRows); TRCK_EquipmentModel_ClearAllControls(); if ($("#txt-Search").val() != "" && $("#txt-Search").val() != undefined)
//            HighlightText("#tblTRCK_EquipmentModel>tbody>tr", $("#txt-Search").val().trim());
//    });
//}

// calling web function to add new Region item.
function TRCK_EquipmentModel_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/TRCK_EquipmentModel/Insert", { pCode: $("#txtCode").val().trim(), pName: $("#txtName").val().trim(), pLocalName: $("#txtLocalName").val().trim() }, pSaveandAddNew, "RegionModal", function () { TRCK_EquipmentModel_LoadingWithPaging(); });
}

//calling this function for update
function TRCK_EquipmentModel_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/TRCK_EquipmentModel/Update", { pID: $("#hID").val(), pCode: $("#txtCode").val().trim(), pName: $("#txtName").val().trim(), pLocalName: $("#txtLocalName").val().trim() }, pSaveandAddNew, "RegionModal", function () { TRCK_EquipmentModel_LoadingWithPaging(); });
}

//sherif: calling this fn is to set the timelocked to null in the DB to unlock the edited field in case of pressing close
function TRCK_EquipmentModel_UnlockRecord() {
    UnlockFunction("/api/TRCK_EquipmentModel/UnlockRecord",
        { pID: $("#hID").val() }, 
        "RegionModal", 
        function () { TRCK_EquipmentModel_LoadingWithPaging(); }); //the callback function
}
//function TRCK_EquipmentModel_Delete(pID) {
//    DeleteListFunction("/api/TRCK_EquipmentModel/DeleteByID", { "pID": pID }, function () { TRCK_EquipmentModel_LoadingWithPaging(); });
//}

function TRCK_EquipmentModel_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblTRCK_EquipmentModel') != "") {
        debugger;
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
            DeleteListFunction("/api/TRCK_EquipmentModel/Delete", { "pTRCK_EquipmentModelIDs": GetAllSelectedIDsAsString('tblTRCK_EquipmentModel') }, function () {
                TRCK_EquipmentModel_LoadingWithPaging(
                    //this is callback in TRCK_EquipmentModel_LoadingWithPaging
                    //function() {swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");}
                    );
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
    }
}

//after pressing edit, this function fills the data
function TRCK_EquipmentModel_FillControls(pID) {
    TRCK_EquipmentModel_ClearAllControls(function () {
        //next line is to check if row is locked by another user
        //Check("/api/TRCK_EquipmentModel/CheckRow", { 'pID': pID }, function () {
            // Fill All Modal Controls
            var tr = $("tr[ID='" + pID + "']");

            $("#hID").val(pID);
            $("#lblShown").html(": " + $(tr).find("td.Name").text());
            $("#txtCode").val($(tr).find("td.Code").text());
            $("#txtName").val($(tr).find("td.Name").text());
            $("#txtLocalName").val($(tr).find("td.LocalName").text());

            $("#btnSave").attr("onclick", "TRCK_EquipmentModel_Update(false);");
            $("#btnSaveandNew").attr("onclick", "TRCK_EquipmentModel_Update(true);");
        //});
    });
}

function TRCK_EquipmentModel_ClearAllControls(callback) {
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), null, null);//an alternative fn is with abdelmawgood
    ClearAll("#RegionModal");
    
    $("#btnSave").attr("onclick", "TRCK_EquipmentModel_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "TRCK_EquipmentModel_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
}

// Country Region ---------------------------------------------------------------
function TRCK_EquipmentModel_Print() {
    debugger;
    CallGETFunctionWithParameters("/api/TRCK_EquipmentModel/PrintReport", {}, null);
    //Print("/MasterData/PrintReport");
//    $.ajax({
//        type: "GET",
//        url: strServerURL + "/api/TRCK_EquipmentModel/PrintReport",
//        //url: strServerURL + "/MasterData/PrintReport",
//        data: { },
//        contentType: "application/html; charset=utf-8",
//        dataType: "html",
//        success: function (data) {
//            debugger;
            
//        },
//        error: function (jqXHR, exception) {
//            debugger;
//            swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
//            FadePageCover(false);
//        }
//    });
}
