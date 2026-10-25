// Roles Region ---------------------------------------------------------------
// Bind Roles Table Rows
function Roles_BindTableRows(pRoles) {
    debugger;
    $("#hl-menu-Administration").parent().addClass("active");
    if (pDefaults.UnEditableCompanyName == "MED") {
        $("#btn-AddRolesToUsers").removeClass("hide");
    }
    ClearAllTableRows("tblRoles");
    editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pRoles, function (i, item) {
        AppendRowtoTable("tblRoles",
        //("<tr ID='" + item.ID + "' ondblclick='SwitchToRolePrivilegesView(" + item.ID + ");'>"
        ("<tr ID='" + item.ID + "' ondblclick='Roles_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Name'>" + item.Name + "</td>"
                    + "<td class='LocalName'>" + item.LocalName + "</td>"
                    + "<td class='Notes'>" + item.Notes + "</td>"
                    + "<td class='IsUsersShareRecords hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsUsersShareRecords == true ? "true' checked='checked'" : "'") + " /></td>"
                    //+ "<td><a href='#RoleModal' data-toggle='modal' onclick='Roles_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
                    + "<td><a onclick='SwitchToRolePrivilegesView(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblRoles", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblRoles>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

// Loading with data
function Roles_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Roles/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { Roles_BindTableRows(pTabelRows); Roles_ClearAllControls(); });
    HighlightText("#tblRoles>tbody>tr", $("#txt-Search").val().trim());
    //if (callbackForDeleteFail != null)
    //    callbackForDeleteFail();
}
////sherif: Loading with data and search key
//function Roles_LoadingWithPagingAndSearch() {//$("#txt-Search").val() is the search key which will be used in the where clause
//    debugger;
//    LoadWithPagingAndSearch("/api/Roles/LoadWithPaging", $("#txt-Search").val().trim(), ($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1), $('#select-page-size').val().trim(), function (pTabelRows) {
//        Roles_BindTableRows(pTabelRows); Roles_ClearAllControls(); if ($("#txt-Search").val() != "" && $("#txt-Search").val() != undefined)
//            HighlightText("#tblRoles>tbody>tr", $("#txt-Search").val().trim());
//    });
//}

// calling web function to add new Role item.
function Roles_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/Roles/Insert", {
        pName: $("#txtName").val().trim()
        , pLocalName: $("#txtLocalName").val().trim()
        , pNotes: ($("#txtNotes").val() == null ? "" : $("#txtNotes").val().trim())
        , pIsUsersShareRecords: $("#cbIsUsersShareRecords").prop('checked')
    }, pSaveandAddNew, "RoleModal", function () { Roles_LoadingWithPaging(); });
}

//calling this function for update
function Roles_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/Roles/Update", {
        pID: $("#hID").val()
        , pName: $("#txtName").val().trim()
        , pLocalName: $("#txtLocalName").val().trim()
        , pNotes: ($("#txtNotes").val() == null ? "" : $("#txtNotes").val().trim())
        , pIsUsersShareRecords: $("#cbIsUsersShareRecords").prop('checked')
    }, pSaveandAddNew, "RoleModal", function () { Roles_LoadingWithPaging(); });
}

//function Roles_Delete(pID) {
//    DeleteListFunction("/api/Roles/DeleteByID", { "pID": pID }, function () { Roles_LoadingWithPaging(); });
//}

function Roles_DeleteList() {
    debugger;
    //this condition is to prevent deleting the Administrator and Manager Roles
    //RoleID for Manager = 5 and for Administrator = 1
    if (GetAllSelectedIDsAsString('tblRoles').indexOf(",1,") > -1 //not the first nor the last ID in the selected list of checkboxes
        || GetAllSelectedIDsAsString('tblRoles').indexOf("1,") == 0 //1st ID in the selected list of checkboxes
        || GetAllSelectedIDsAsString('tblRoles').indexOf(",1") == GetAllSelectedIDsAsString('tblRoles').length - 2 //the last selected ID
        || GetAllSelectedIDsAsString('tblRoles').indexOf(",5,") > -1
        || GetAllSelectedIDsAsString('tblRoles').indexOf("5,") == 0 //1st ID in the selected list of checkboxes
        || GetAllSelectedIDsAsString('tblRoles').indexOf(",5") == GetAllSelectedIDsAsString('tblRoles').length - 2 //the last selected ID
        )
        swal(strSorry, "You can not delete Administration or Management Roles.", "warning");
    else {
        //Confirmation message to delete
        if (GetAllSelectedIDsAsString('tblRoles') != "")
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
                DeleteListFunction("/api/Roles/Delete", { "pRolesIDs": GetAllSelectedIDsAsString('tblRoles') }, function () {
                    Roles_LoadingWithPaging(
                        //this is callback in Roles_LoadingWithPaging
                        //function() {swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");}
                        );
                });
                //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
            });
    }
}

//after pressing edit, this function fills the data
function Roles_FillControls(pID) {
    //Roles_ClearAllControls(function () {
        //next line is to check if row is locked by another user
        //Check("/api/Roles/CheckRow", { 'pID': pID }, function () {
            // Fill All Modal Controls
            var tr = $("tr[ID='" + pID + "']");

            $("#hID").val(pID);
            $("#lblShown").html(": " + $(tr).find("td.Name").text());
            $("#txtName").val($(tr).find("td.Name").text());
            $("#txtLocalName").val($(tr).find("td.LocalName").html());
            $("#txtNotes").val($(tr).find("td.Notes").text());
            $("#cbIsUsersShareRecords").prop('checked', $(tr).find('td.IsUsersShareRecords').find('input').attr('val'));

            $("#btnSave").attr("onclick", "Roles_Update(false);");
            $("#btnSaveandNew").attr("onclick", "Roles_Update(true);");
        //});
    //});
}

function Roles_ClearAllControls(callback) {
    //ClearAllControls(new Array("hID", "txtName", "txtLocalName", "txtNotes"), null, null);//an alternative fn is with abdelmawgood
    ClearAll("#RoleModal");

    $("#btnSave").attr("onclick", "Roles_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "Roles_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
}

function Roles_EditByDblClick(pID) {
    jQuery("#RoleModal").modal("show");
    Roles_FillControls(pID);
}

function SwitchToRolePrivilegesView(pDblClickRowID) {
    debugger;
    if (pDblClickRowID == null)//this means called by button, so check for 1 check
        if (GetAllSelectedIDsAsString('tblRoles') != "" && GetAllSelectedIDsAsString('tblRoles').split(',').length == 1) {
            // i am sure i have just 1 ID isa
            LoadViews("RolePrivileges", GetAllSelectedIDsAsString('tblRoles'));
        }
        else
            //swal(strSorry, "Please, Check 1 Role To Edit it's Privileges.", "warning");
            swal(strSorry, "Please, Check 1 Role To Edit it's Privileges.");
    else { // of (pDblClickRowID == null)
        LoadViews("RolePrivileges", pDblClickRowID);
    }
}
//EOF Region Role ---------------------------------------------------------------
function AddRolesToALlUsers(pDblClickRowID) {
    debugger;
    //CallGETFunctionWithParameters("/api/RolePrivileges/AddRoleForAllUsers"
    //    , {
    //       RoleID: GetAllSelectedIDsAsString('tblRoles')
    //        , null
    //    }
    //    , function (pData) {
    //        var Message = pData[0];
    //    }
    //    , null);
    if (GetAllSelectedIDsAsString('tblRoles') != "" && GetAllSelectedIDsAsString('tblRoles').split(',').length == 1) {
        FadePageCover(true);
            CallGETFunctionWithParameters("/api/RolePrivileges/AddRoleForAllUsers"
                , {
                    pID: GetAllSelectedIDsAsString('tblRoles')

                }
                , function (pData) {
                    FadePageCover(false);
                    if (pData[0]) {
                        swal("Success", pData);
                    }
                    else {
                        swal("Sorry", "there is an Error in Save");
                    }
                }
                , function () { FadePageCover(false); });
        }
        else
            //swal(strSorry, "Please, Check 1 Role To Edit it's Privileges.", "warning");
            swal(strSorry, "Please, Check 1 Role To Add it's Privileges for Users.");
}




