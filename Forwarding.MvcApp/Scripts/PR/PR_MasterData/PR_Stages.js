// City Country ---------------------------------------------------------------
// Bind PR_Stages Table Rows
function PR_Stages_BindTableRows(pPR_Stages) {
    debugger;
    $("#hl-menu-PR").parent().addClass("active");
    ClearAllTableRows("tblPR_Stages");
    $.each(pPR_Stages, function (i, item)
    {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblPR_Stages",
        ("<tr ID='" + item.ID + "' ondblclick='PR_Stages_EditByDblClick(" + item.ID + ");'>"
            + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='Name' val='" + item.Name + "'>" + item.Name + "</td>"
            + "<td class='NameLocal hide' val='" + item.NameLocal + "'>" + item.NameLocal + "</td>"
            + "<td class='Notes' val='" + item.Notes + "'>" + item.Notes + "</td>"
            + "<td class='hPR_Stages'><a href='#PR_StagesModal' data-toggle='modal' onclick='PR_Stages_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblPR_Stages", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblPR_Stages>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function PR_Stages_EditByDblClick(pID) {
    jQuery("#PR_StagesModal").modal("show");
    PR_Stages_FillControls(pID);
}
// Loading with data
function PR_Stages_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PR_Stages/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { PR_Stages_BindTableRows(pTabelRows); PR_Stages_ClearAllControls(); });
    HighlightText("#tblPR_Stages>tbody>tr", $("#txt-Search").val().trim());
}

//var IsOldName = "0";

function PR_Stages_Insert(pSaveandAddNew) {

  
    //$('#hidden_slstoresnames > option').each(function (i, option)
    //{
    //    if ($(option).text().trim().toUpperCase() == $("#txtStoreName").val().trim().toUpperCase()) {
    //      //  IsOldName = "1";
    //        swal("Sorry", "The Store Name is duplicated in the System", "warning");
    //        return false;

    //    }
    //    else if (i == ($('#hidden_slstoresnames > option').length - 1))
    //    {

            debugger;
            InsertUpdateFunction("form", "/api/PR_Stages/Insert", {
                pName: $("#txtName").val().trim().toUpperCase(),
                pNameLocal: $("#txtName").val().trim().toUpperCase(),
                pNotes: $("#txtNotes").val().trim()

            }, pSaveandAddNew, "PR_StagesModal", function ()
                {
                PR_Stages_LoadingWithPaging();
              //  IntializeData();


           
             });
    //    }

    //});


}


function PR_Stages_Update(pSaveandAddNew) {


    //$('#hidden_slstoresnames > option').each(function (i, option)
    //{
    //    if ($(option).text().trim().toUpperCase() == $("#txtStoreName").val().trim().toUpperCase()) {
    //      //  IsOldName = "1";
    //        swal("Sorry", "The Store Name is duplicated in the System", "warning");
    //        return false;

    //    }
    //    else if (i == ($('#hidden_slstoresnames > option').length - 1))
    //    {

    debugger;
    InsertUpdateFunction("form", "/api/PR_Stages/Update", {
        pID :$('#hID').val() ,
        pName: $("#txtName").val().trim().toUpperCase(),
        pNameLocal: $("#txtName").val().trim().toUpperCase(),
        pNotes: $("#txtNotes").val().trim()

    }, pSaveandAddNew, "PR_StagesModal", function () {
            PR_Stages_LoadingWithPaging();
            //  IntializeData();



        });
    //    }

    //});


}

function IntializeData() {

    FadePageCover(true);
    $.ajax({
        type: "GET",
        url: strServerURL + "api/PR_Stages/IntializeData",
        data: { pStoresNamesOnly: "true" },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            Fill_SelectInputAfterLoadData(d[0], 'ID', 'StoreName', '<-- select store name -->', '#hidden_slstoresnames', '');
            FadePageCover(false);
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
            FadePageCover(false);
        }
    });




}

function PR_Stages_Delete(pID) {
    DeleteListFunction("/api/PR_Stages/DeleteByID", { "pID": pID }, function () { PR_Stages_LoadingWithPaging(); });
}

function PR_Stages_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblPR_Stages') != "")
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
            DeleteListFunction("/api/PR_Stages/Delete", { "pPR_StagesIDs": GetAllSelectedIDsAsString('tblPR_Stages') }, function () { PR_Stages_LoadingWithPaging(); });
        });
        //DeleteListFunction("/api/PR_Stages/Delete", { "pPR_StagesIDs": GetAllSelectedIDsAsString('tblPR_Stages') }, function () { PR_Stages_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
function PR_Stages_FillControls(pID) {
    debugger;
    // Fill All Model Controls

    //PR_Stages_ClearAllControls();
    //i used the next line instead of the previous one to fix a problem of instability of the slCountry filling in case of editing
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    //ClearAll("City-form", null);
    ClearAll("#PR_StagesModal", null);
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");

    $("#txtName").val($(tr).find("td.Name").attr('val').toUpperCase());
    $("#txtNameLocal").val($(tr).find("td.NameLocal").attr('val').toUpperCase());
    $("#txtNotes").val($(tr).find("td.Notes").attr('val').toUpperCase());

    $("#btnSave").attr("onclick", "PR_Stages_Update(false);");
    $("#btnSaveandNew").attr("onclick", "PR_Stages_Update(true);");
}

function PR_Stages_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#PR_StagesModal", null);
    $("#btnSave").attr("onclick", "PR_Stages_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "PR_Stages_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
}
