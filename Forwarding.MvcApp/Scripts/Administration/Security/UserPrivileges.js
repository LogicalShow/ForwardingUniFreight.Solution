//UserPrivileges Role---------------------------------------------------------------
var Username;
var RoleID = 0;
function UserPrivileges_BindTableRows(pUserPrivileges) {
    debugger;
    $("#hl-menu-Administration").parent().addClass("active");
    ClearAllTableRows("tblUserPrivileges");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    detailsControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-list-ul' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + " Module Details" + "</span>";
    $.each(pUserPrivileges, function (i, item) {
        AppendRowtoTable("tblUserPrivileges",
        //("<tr ID='" + item.ID + "' ondblclick='UserPrivileges_FillControls(" + item.ID + ");'>"
        ("<tr ID='" + item.ID + "' ondblclick='UserPrivileges_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Module'>" + item.ModuleCode + "</td>"
                    + "<td class='Group'>" + item.GroupCode + "</td>"
                    + "<td class='Form' val='" + item.FormID + "'>" + item.DecryptedName + "</td>"
                    + "<td class='ImageName'>" + item.ImageName + "</td>"
                    + "<td class='CanView'> <input type='checkbox' disabled='disabled' val='" + (item.CanView == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='CanAdd'> <input type='checkbox' disabled='disabled' val='" + (item.CanAdd == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='CanEdit'> <input type='checkbox' disabled='disabled' val='" + (item.CanEdit == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='CanDelete'> <input type='checkbox' disabled='disabled' val='" + (item.CanDelete == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='HideOthersRecords hide'> <input type='checkbox' disabled='disabled' val='" + (item.HideOthersRecords == true ? "true' checked='checked'" : "'") + " /></td>"
                    + (item.ImageName == "OperationsManagement" || item.ImageName == "QuotationsManagement" || item.ImageName == "MESREPORTS"
                        ? ("<td class=''><a href='#SecCustomizedUserPrivilegesModal' data-toggle='modal' onclick='SecCustomizedUserPrivileges_FillControls(" + item.ID + "," + item.UserID + "," + item.FormID + ");' " + detailsControlsText + "</a></td>")
                        : ("<td class=''></td>")
                        )
                    + "<td class='hide'><a href='#UserPrivilegeModal' data-toggle='modal' onclick='UserPrivileges_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
        EditedUserID = item.UserID; //1) always the same isa 2) EditedUserID is global to handle the case of calling loadwithpaging from applypaging
        RoleID = item.RoleID;
        Username = item.Name;
    });
    debugger;
    ApplyPermissions();
    $("#lblUsername").html(Username);
    Roles_GetList(RoleID);
    BindAllCheckboxonTable("tblUserPrivileges", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblUserPrivileges>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function UserPrivileges_EditByDblClick(pID) {
    jQuery("#UserPrivilegeModal").modal("show");
    UserPrivileges_FillControls(pID);
}
function UserPrivileges_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/UserPrivileges/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { UserPrivileges_BindTableRows(pTabelRows); UserPrivileges_ClearAllControls(); }, EditedUserID);
    HighlightText("#tblUserPrivileges>tbody>tr", $("#txt-Search").val().trim());
    //if (callbackForDeleteFail != null)
    //    callbackForDeleteFail();
}

//calling this function for update
function UserPrivileges_Update(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/UserPrivileges/Update", { pID: $("#hID").val(), pUserID: EditedUserID, pFormID: $($("tr[ID='" + $("#hID").val() + "']")).find("td.Form").attr('val'), pCanView: $("#cbCanView").prop('checked'), pCanAdd: $("#cbCanAdd").prop('checked'), pCanEdit: $("#cbCanEdit").prop('checked'), pCanDelete: $("#cbCanDelete").prop('checked'), pHideOthersRecords: $("#cbHideOthersRecords").prop('checked') }, pSaveandAddNew, "UserPrivilegeModal", function () { UserPrivileges_LoadingWithPaging(); });
}

function UserPrivileges_FillControls(pID) {
    //UserPrivileges_ClearAllControls(function () {
    //next line is to check if row is locked by another user
    //Check("/api/UserPrivileges/CheckRow", { 'pID': pID }, function () {
    // Fill All Modal Controls
    debugger;
    var tr = $("tr[ID='" + pID + "']");
    if ($(tr).find('td.Form').text() == "Operations Management" || $(tr).find('td.Form').text() == "Quotations Management") {
        $("#lblCbHideOthersRecords").removeClass("hide");
    }
    else {
        $("#lblCbHideOthersRecords").addClass("hide");
    }
    $("#hID").val(pID);
    $("#lblShown").html(": " + $(tr).find("td.Group").text() + " / " + $(tr).find("td.Form").text());
    $("#cbCanView").prop('checked', $(tr).find('td.CanView').find('input').attr('val'));
    $("#cbCanAdd").prop('checked', $(tr).find('td.CanAdd').find('input').attr('val'));
    $("#cbCanEdit").prop('checked', $(tr).find('td.CanEdit').find('input').attr('val'));
    $("#cbCanDelete").prop('checked', $(tr).find('td.CanDelete').find('input').attr('val'));
    $("#cbHideOthersRecords").prop('checked', $(tr).find('td.HideOthersRecords').find('input').attr('val'));

    $("#btnSave").attr("onclick", "UserPrivileges_Update(false);");
    //$("#btnSaveandNew").attr("onclick", "UserPrivileges_Update(true);");

    //});
    //});
}
//i don't need to clear controls here coz of no add
function UserPrivileges_ClearAllControls(callback) {
    //ClearAllControls(new Array("hID", "txtName", "txtLocalName", "txtNotes"), null, null);//an alternative fn is with abdelmawgood
    ClearAll("#UserPrivilegeModal");

    $("#btnSave").attr("onclick", "UserPrivileges_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "UserPrivileges_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
}

function UserPrivileges_ApplyRoleDefaults() {
    if ($('#slRole option:selected').val() == "")
        swal(strSorry, "Please, Select a Role.", 'warning');
    else {
        swal({
            title: strAreYouSure,
            text: "The Default Settings For Role '" + $('#slRole option:selected').text() + "' Will Be Applied.",
            //type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Apply!",
            closeOnConfirm: true
        },
        //callback function in case of success
        function () {
            RoleID = $('#slRole option:selected').val();
            CallGETFunctionWithParameters("/api/UserPrivileges/ApplyRoleDefaults", { pUserID: EditedUserID, pRoleID: RoleID }, function () { UserPrivileges_LoadingWithPaging(); });
        });
    }
}


function SecCustomizedUserPrivileges_UpdateList(pSaveandAddNew) {
    var pSelectedIDsToUpdate = GetAllNOTSelectedIDsAsStringWithNameAttr("cbSecCustomizedUserPrivilegeID");//returns string array of IDs
    var pCanViewList = "";
    var pCanAddList = "";
    var pCanEditList = "";
    var pCanDeleteList = "";
    if (pSelectedIDsToUpdate != "") {
        var NumberOfSelectRows = pSelectedIDsToUpdate.split(',').length;
        debugger;
        for (i = 0; i < NumberOfSelectRows; i++) {
            var currentRowID = pSelectedIDsToUpdate.split(",")[i];

            pCanViewList += ((pCanViewList == "") ? "" : ",") + ($("#cbSecCustomizedUserPrivilegesCanView" + currentRowID).prop("checked") ? 1 : 0);
            pCanAddList += ((pCanAddList == "") ? "" : ",") + ($("#cbSecCustomizedUserPrivilegesCanAdd" + currentRowID).prop("checked") ? 1 : 0);
            pCanEditList += ((pCanEditList == "") ? "" : ",") + ($("#cbSecCustomizedUserPrivilegesCanEdit" + currentRowID).prop("checked") ? 1 : 0);
            pCanDeleteList += ((pCanDeleteList == "") ? "" : ",") + ($("#cbSecCustomizedUserPrivilegesCanDelete" + currentRowID).prop("checked") ? 1 : 0);
        }
    }
    if (pSelectedIDsToUpdate != "")
        InsertSelectedCheckboxItems("/api/UserPrivileges/SecUserPrivilegesList_UpdateList"
            , {
                "pSelectedIDsToUpdate": pSelectedIDsToUpdate
                , "pCanViewList": pCanViewList
                , "pCanAddList": pCanAddList
                , "pCanEditList": pCanEditList
                , "pCanDeleteList": pCanDeleteList
                //, "pHideOthersRecordsList": false
            }
            , pSaveandAddNew
            , "SecCustomizedUserPrivilegesModal" //pModalID
            , null
            , function (data) {
            });
}
function SecCustomizedUserPrivileges_FillControls(pID, pUserID, pFormID) {
    var tr = $("tr[ID='" + pID + "']");
    $("#lblSecCustomizedUserPrivilegesShown").html(": " + $(tr).find("td.Group").text());

    var pWhereClause = " WHERE UserID = " + pUserID + " AND FormID = " + pFormID + " ORDER BY SecCustomizedTabID ";
    CallGETFunctionWithParameters("/api/UserPrivileges/LoadAll_SecCustomizedUserPrivileges"
        , { pWhereClause: pWhereClause }
        , function (pTableRows) {
            $("#divSecCustomizedUserPrivileges").html("");
            var pTableHTML = "";
            //pTableHTML += ' <section class="panel panel-default">';
            pTableHTML += ' <div class="table-responsive">';
            pTableHTML += '     <table id="tblSecCustomizedUserPrivileges" class="table m-t-xs table-striped b-t b-light text-sm table-hover table-bordered">';
            pTableHTML += '         <thead>';
            pTableHTML += '             <tr>';
            pTableHTML += '                 <th>Tab Name</th>';
            pTableHTML += '                 <th>View</th>';
            pTableHTML += '                 <th>Add</th>';
            pTableHTML += '                 <th>Edit</th>';
            pTableHTML += '                 <th>Delete</th>';
            pTableHTML += '             </tr>';
            pTableHTML += '         </thead>';
            pTableHTML += '         <tbody>';
            $.each(JSON.parse(pTableRows), function (i, item) {
                debugger;
                pTableHTML += '         <tr class="input-md" style="font-size:95%;">';
                pTableHTML += '             <td class="ID hide"> <input name="cbSecCustomizedUserPrivilegeID" type="checkbox" value="' + item.ID + '" /></td>';
                pTableHTML += '             <td>' + item.TabCode + '</td>';
                //pTableHTML += '             <td><input type="checkbox" id="cbSecCustomizedUserPrivilegesCanView' + item.ID + '"   onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" ' + (item.CanView ? 'checked' : '') + '>' + '</td>';
                //coz i always open on General Tab
                pTableHTML += '             <td><input type="checkbox" id="cbSecCustomizedUserPrivilegesCanView' + item.ID + '"   onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" ' + (item.CanView || item.TabCode == 'General' ? 'checked' : '') + (item.TabCode == 'General' ? ' disabled ' : '') + '>' + '</td>';
                pTableHTML += '             <td><input type="checkbox" id="cbSecCustomizedUserPrivilegesCanAdd' + item.ID + '"    onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" ' + (item.CanAdd ? 'checked' : '') + '>' + '</td>';
                pTableHTML += '             <td><input type="checkbox" id="cbSecCustomizedUserPrivilegesCanEdit' + item.ID + '"   onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" ' + (item.CanEdit ? 'checked' : '') + '>' + '</td>';
                pTableHTML += '             <td><input type="checkbox" id="cbSecCustomizedUserPrivilegesCanDelete' + item.ID + '" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" ' + (item.CanDelete ? 'checked' : '') + '>' + '</td>';
                pTableHTML += '         </tr>';
            });
            pTableHTML += '         </tbody>';
            pTableHTML += '     </table>';
            pTableHTML += ' </div>'; //of table responsive
            //pTableHTML += ' </section>';
            $("#divSecCustomizedUserPrivileges").html(pTableHTML);
        });
}

function SwitchToUsersView() {
    LoadViews("Users");
}

//EOF UserPrivileges Role---------------------------------------------------------------

//to fill the select box
function Roles_GetList(pID) {//pID is used in case of editing to set the Role code or name
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithName(pID, "/api/Roles/LoadAll", "Select Role", "slRole");
}
