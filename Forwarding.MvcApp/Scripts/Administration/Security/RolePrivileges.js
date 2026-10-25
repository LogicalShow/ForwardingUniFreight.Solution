//RolePrivileges Region---------------------------------------------------------------
var RoleName;
function RolePrivileges_BindTableRows(pRolePrivileges) {
    debugger;
    $("#hl-menu-Administration").parent().addClass("active");
    ClearAllTableRows("tblRolePrivileges");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    detailsControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-list-ul' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + " Module Details" + "</span>";
    $.each(pRolePrivileges, function (i, item) {
        AppendRowtoTable("tblRolePrivileges",
        ("<tr ID='" + item.ID + "' ondblclick='RolePrivileges_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Module'>" + item.ModuleCode + "</td>"
                    + "<td class='Group'>" + item.GroupCode + "</td>"
                    + "<td class='Form' val='" + item.FormID + "'>" + item.DecryptedName + "</td>"
                    + "<td class='CanView'> <input type='checkbox' disabled='disabled' val='" + (item.CanView == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='CanAdd'> <input type='checkbox' disabled='disabled' val='" + (item.CanAdd == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='CanEdit'> <input type='checkbox' disabled='disabled' val='" + (item.CanEdit == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='CanDelete'> <input type='checkbox' disabled='disabled' val='" + (item.CanDelete == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='HideOthersRecords hide'> <input type='checkbox' disabled='disabled' val='" + (item.HideOthersRecords == true ? "true' checked='checked'" : "'") + " /></td>"
                    + (item.ImageName == "OperationsManagement" || item.ImageName == "QuotationsManagement"
                        ? ("<td class=''><a href='#SecCustomizedRolePrivilegesModal' data-toggle='modal' onclick='SecCustomizedRolePrivileges_FillControls(" + item.ID + "," + item.RoleID + "," + item.FormID + ");' " + detailsControlsText + "</a></td>")
                        : ("<td class=''></td>")
                        )
                    + "<td class='hide'><a href='#RolePrivilegeModal' data-toggle='modal' onclick='RolePrivileges_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
        //(item.ModuleCode != "Operations" && item.ModuleCode !="" ?
        EditedRoleID = item.RoleID; //1) always the same isa 2) EditedRoleID is global to handle the case of calling loadwithpaging from applypaging
        RoleName = item.RoleName;
    });
    debugger;
    ApplyPermissions();
    $("#lblRoleName").html(RoleName);
    BindAllCheckboxonTable("tblRolePrivileges", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblRolePrivileges>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function RolePrivileges_EditByDblClick(pID) {
    jQuery("#RolePrivilegeModal").modal("show");
    RolePrivileges_FillControls(pID);
}
function RolePrivileges_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/RolePrivileges/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { RolePrivileges_BindTableRows(pTabelRows); RolePrivileges_ClearAllControls(); }, EditedRoleID);
    HighlightText("#tblRolePrivileges>tbody>tr", $("#txt-Search").val().trim());
    //if (callbackForDeleteFail != null)
    //    callbackForDeleteFail();
}

//calling this function for update
function RolePrivileges_Update(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/RolePrivileges/Update"
        , {
            pID: $("#hID").val()
            , pRoleID: EditedRoleID
            , pFormID: $($("tr[ID='" + $("#hID").val() + "']")).find("td.Form").attr('val')
            , pCanView: $("#cbCanView").prop('checked')
            , pCanAdd: $("#cbCanAdd").prop('checked')
            , pCanEdit: $("#cbCanEdit").prop('checked')
            , pCanDelete: $("#cbCanDelete").prop('checked')
            , pHideOthersRecords: $("#cbHideOthersRecords").prop('checked')
        }, pSaveandAddNew, "RolePrivilegeModal", function () { RolePrivileges_LoadingWithPaging(); });
}
function RolePrivileges_FillControls(pID) {
    //RolePrivileges_ClearAllControls(function () {
    //next line is to check if row is locked by another user
    //Check("/api/RolePrivileges/CheckRow", { 'pID': pID }, function () {
    // Fill All Modal Controls
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

    $("#btnSave").attr("onclick", "RolePrivileges_Update(false);");
    //$("#btnSaveandNew").attr("onclick", "RolePrivileges_Update(true);");

    //});
    //});
}
//i don't need to clear controls here coz of no add
function RolePrivileges_ClearAllControls(callback) {
    //ClearAllControls(new Array("hID", "txtName", "txtLocalName", "txtNotes"), null, null);//an alternative fn is with abdelmawgood
    ClearAll("#RolePrivilegeModal");

    $("#btnSave").attr("onclick", "RolePrivileges_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "RolePrivileges_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
}

function SecCustomizedRolePrivileges_UpdateList(pSaveandAddNew) {
    var pSelectedIDsToUpdate = GetAllNOTSelectedIDsAsStringWithNameAttr("cbSecCustomizedRolePrivilegeID");//returns string array of IDs
    var pCanViewList = "";
    var pCanAddList = "";
    var pCanEditList = "";
    var pCanDeleteList = "";
    if (pSelectedIDsToUpdate != "") {
        var NumberOfSelectRows = pSelectedIDsToUpdate.split(',').length;
        debugger;
        for (i = 0; i < NumberOfSelectRows; i++) {
            var currentRowID = pSelectedIDsToUpdate.split(",")[i];

            pCanViewList += ((pCanViewList == "") ? "" : ",") + ($("#cbSecCustomizedRolePrivilegesCanView" + currentRowID).prop("checked") ? 1 : 0);
            pCanAddList += ((pCanAddList == "") ? "" : ",") + ($("#cbSecCustomizedRolePrivilegesCanAdd" + currentRowID).prop("checked") ? 1 : 0);
            pCanEditList += ((pCanEditList == "") ? "" : ",") + ($("#cbSecCustomizedRolePrivilegesCanEdit" + currentRowID).prop("checked") ? 1 : 0);
            pCanDeleteList += ((pCanDeleteList == "") ? "" : ",") + ($("#cbSecCustomizedRolePrivilegesCanDelete" + currentRowID).prop("checked") ? 1 : 0);
        }
    }
    if (pSelectedIDsToUpdate != "")
        InsertSelectedCheckboxItems("/api/RolePrivileges/SecRolePrivilegesList_UpdateList"
            , {
                "pSelectedIDsToUpdate": pSelectedIDsToUpdate
                , "pCanViewList": pCanViewList
                , "pCanAddList": pCanAddList
                , "pCanEditList": pCanEditList
                , "pCanDeleteList": pCanDeleteList
            }
            , pSaveandAddNew
            , "SecCustomizedRolePrivilegesModal" //pModalID
            , null
            , function (data) {
            });
}
function SecCustomizedRolePrivileges_FillControls(pID, pRoleID, pFormID) {
    var tr = $("tr[ID='" + pID + "']");
    $("#lblSecCustomizedRolePrivilegesShown").html(": " + $(tr).find("td.Group").text());

    var pWhereClause = " WHERE RoleID = " + pRoleID + " AND FormID = " + pFormID + " ORDER BY SecCustomizedTabID ";
    CallGETFunctionWithParameters("/api/RolePrivileges/LoadAll_SecCustomizedRolePrivileges"
        , { pWhereClause: pWhereClause }
        , function (pTableRows) {
            $("#divSecCustomizedRolePrivileges").html("");
            var pTableHTML = "";
            //pTableHTML += ' <section class="panel panel-default">';
            pTableHTML += ' <div class="table-responsive">';
            pTableHTML += '     <table id="tblSecCustomizedRolePrivileges" class="table m-t-xs table-striped b-t b-light text-sm table-hover table-bordered">';
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
                pTableHTML += '             <td class="ID hide"> <input name="cbSecCustomizedRolePrivilegeID" type="checkbox" value="' + item.ID + '" /></td>';
                pTableHTML += '             <td>' + item.TabCode + '</td>';
                //pTableHTML += '             <td><input type="checkbox" id="cbSecCustomizedRolePrivilegesCanView' + item.ID + '"   onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" ' + (item.CanView ? 'checked' : '') + '>' + '</td>';
                //coz i always open on General Tab
                pTableHTML += '             <td><input type="checkbox" id="cbSecCustomizedRolePrivilegesCanView' + item.ID + '"   onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" ' + (item.CanView || item.TabCode == 'General' ? 'checked' : '') + (item.TabCode == 'General' ? ' disabled ' : '') + '>' + '</td>';
                pTableHTML += '             <td><input type="checkbox" id="cbSecCustomizedRolePrivilegesCanAdd' + item.ID + '"    onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" ' + (item.CanAdd ? 'checked' : '') + '>' + '</td>';
                pTableHTML += '             <td><input type="checkbox" id="cbSecCustomizedRolePrivilegesCanEdit' + item.ID + '"   onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" ' + (item.CanEdit ? 'checked' : '') + '>' + '</td>';
                pTableHTML += '             <td><input type="checkbox" id="cbSecCustomizedRolePrivilegesCanDelete' + item.ID + '" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" ' + (item.CanDelete ? 'checked' : '') + '>' + '</td>';
                pTableHTML += '         </tr>';
            });
            pTableHTML += '         </tbody>';
            pTableHTML += '     </table>';
            pTableHTML += ' </div>'; //of table responsive
            //pTableHTML += ' </section>';
            $("#divSecCustomizedRolePrivileges").html(pTableHTML);
        });
}

function SwitchToRolesView() {
    LoadViews("Roles");
}

//EOF RolePrivileges Region---------------------------------------------------------------