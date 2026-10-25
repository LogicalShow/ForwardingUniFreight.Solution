// Regions Region ---------------------------------------------------------------
// Bind Regions Table Rows
function Regions_BindTableRows(pRegions) {
    debugger;
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblRegions");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pRegions, function (i, item) {
        AppendRowtoTable("tblRegions",
        ("<tr ID='" + item.ID + "' ondblclick='Regions_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' id='"+item.ID+"' type='checkbox' value='" + item.ID + "' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);'/></td>"
                    + "<td class='Code'>" + item.Code + "</td>"
                    + "<td class='Name'>" + item.Name + "</td>"
                    + "<td class='LocalName'>" + item.LocalName + "</td>"
                    + "<td class='hide'><a href='#RegionModal' data-toggle='modal' onclick='Regions_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblRegions", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblRegions>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });


}
function Regions_EditByDblClick(pID) {
    jQuery("#RegionModal").modal("show");
    Regions_FillControls(pID);
}
// Loading with data
function Regions_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Regions/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { Regions_BindTableRows(pTabelRows); Regions_ClearAllControls(); });
    HighlightText("#tblRegions>tbody>tr", $("#txt-Search").val().trim());
    //if (callbackForDeleteFail != null)
    //    callbackForDeleteFail();
}
////sherif: Loading with data and search key
//function Regions_LoadingWithPagingAndSearch() {//$("#txt-Search").val() is the search key which will be used in the where clause
//    debugger;
//    LoadWithPagingAndSearch("/api/Regions/LoadWithPaging", $("#txt-Search").val().trim(), ($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1), $('#select-page-size').val().trim(), function (pTabelRows) {
//        Regions_BindTableRows(pTabelRows); Regions_ClearAllControls(); if ($("#txt-Search").val() != "" && $("#txt-Search").val() != undefined)
//            HighlightText("#tblRegions>tbody>tr", $("#txt-Search").val().trim());
//    });
//}

// calling web function to add new Region item.
function Regions_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/Regions/Insert", { pCode: $("#txtCode").val().trim(), pName: $("#txtName").val().trim(), pLocalName: $("#txtLocalName").val().trim() }, pSaveandAddNew, "RegionModal", function () { Regions_LoadingWithPaging(); });
}

//calling this function for update
function Regions_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/Regions/Update", { pID: $("#hID").val(), pCode: $("#txtCode").val().trim(), pName: $("#txtName").val().trim(), pLocalName: $("#txtLocalName").val().trim() }, pSaveandAddNew, "RegionModal", function () { Regions_LoadingWithPaging(); });
}

//sherif: calling this fn is to set the timelocked to null in the DB to unlock the edited field in case of pressing close
function Regions_UnlockRecord() {
    UnlockFunction("/api/Regions/UnlockRecord",
        { pID: $("#hID").val() }, 
        "RegionModal", 
        function () { Regions_LoadingWithPaging(); }); //the callback function
}
//function Regions_Delete(pID) {
//    DeleteListFunction("/api/Regions/DeleteByID", { "pID": pID }, function () { Regions_LoadingWithPaging(); });
//}

function Regions_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblRegions') != "") {
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
            DeleteListFunction("/api/Regions/Delete", { "pRegionsIDs": GetAllSelectedIDsAsString('tblRegions') }, function () {
                Regions_LoadingWithPaging(
                    //this is callback in Regions_LoadingWithPaging
                    //function() {swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");}
                    );
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
    }
}

//after pressing edit, this function fills the data
function Regions_FillControls(pID) {
    Regions_ClearAllControls(function () {
        //next line is to check if row is locked by another user
        //Check("/api/Regions/CheckRow", { 'pID': pID }, function () {
            // Fill All Modal Controls
            var tr = $("tr[ID='" + pID + "']");

            $("#hID").val(pID);
            $("#lblShown").html(": " + $(tr).find("td.Name").text());
            $("#txtCode").val($(tr).find("td.Code").text());
            $("#txtName").val($(tr).find("td.Name").text());
            $("#txtLocalName").val($(tr).find("td.LocalName").text());

            $("#btnSave").attr("onclick", "Regions_Update(false);");
            $("#btnSaveandNew").attr("onclick", "Regions_Update(true);");
        //});
    });
}

function Regions_ClearAllControls(callback) {
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), null, null);//an alternative fn is with abdelmawgood
    ClearAll("#RegionModal");
    
    $("#btnSave").attr("onclick", "Regions_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "Regions_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
}

// Country Region ---------------------------------------------------------------
function Regions_Print() {
    debugger;
    CallGETFunctionWithParameters("/api/Regions/PrintReport", {}, null);
    //Print("/MasterData/PrintReport");
//    $.ajax({
//        type: "GET",
//        url: strServerURL + "/api/Regions/PrintReport",
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



