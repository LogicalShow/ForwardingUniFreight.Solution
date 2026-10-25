// Users Region ---------------------------------------------------------------
// Bind Users Table Rows
var tempRoleID = 0;
$(document).ready(function () {
    $('#txtEmail_Footer').summernote();
});
function Users_BindTableRows(pUsers) {
    debugger;
    $("#hl-menu-Administration").parent().addClass("active");
    ClearAllTableRows("tblUsers");
    $.each(pUsers, function (i, item) {
        debugger;
        var SC_editControlsText = " class='btn btn-xs btn-rounded btn-warning float-right hide' title='sc permession'> <i class='fa fa-cubes' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("SC Transaction Approval") + "</span>";
        var SalesmenServices_editControlsText = " class='btn btn-xs btn-rounded btn-primary float-right hide' title='UserSalesmenServices'> <i class='fa fa-users' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("User Services/Salesmen") + "</span>";

        var editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        var printControlsText = " class='btn btn-xs btn-rounded btn-blue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";

        var WHCSFDrafts_editControlsText = " class='btn btn-xs btn-rounded btn-danger float-right hide' title='sc permession'> <i class='fa fa-cubes' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + ($("[id$='hf_ChangeLanguage']").val() == "ar" ? "ربط التعريفات" : "User CFS Tariffs") + "</span>";

        AppendRowtoTable("tblUsers",
            //"<tr ID='" + item.ID + "'>"
            //("<tr ID='" + item.ID + "' ondblclick='SwitchToUserPrivilegesView(" + item.ID + ");'>"
            ("<tr " + (item.ID == 27 || (item.ID == 4 && pLoggedUser.ID != item.ID) ? " class='hide' " : "") + " ID='" + item.ID + "' ondblclick='Users_EditByDblClick(" + item.ID + ");'>" //i hide sherif user
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Name'>" + item.Name + "</td>"
                + "<td class='LocalName'>" + item.LocalName + "</td>"
                + "<td class='Branch' val='" + item.BranchID + "'>" + item.BranchName + "</td>"
                + "<td class='Department' val='" + item.DepartmentID + "'>" + item.DepartmentName + "</td>"
                + "<td class='Email hide'>" + item.Email + "</td>"
                + "<td class='Phone1 hide'>" + item.Phone1 + "</td>"
                + "<td class='Phone2 hide'>" + item.Phone2 + "</td>"
                + "<td class='Mobile1 hide'>" + item.Mobile1 + "</td>"
                + "<td class='Role' val='" + item.RoleID + "'>" + (item.RoleName == "0" ? "N/A" : item.RoleName) + "</td>"
                + "<td class='Username hide'>" + item.Username + "</td>"
                + "<td class='Password hide'>" + item.Password + "</td>"
                + "<td class='ExpirationDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate)) + "</td>"
                + "<td class='IsInactive'> <input type='checkbox' disabled='disabled' val='" + (item.IsInactive == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='IsSalesman hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsSalesman == true ? "true' checked='checked'" : "'") + " /></td>"

                + "<td class='IsAccessAllCharges hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsAccessAllCharges == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='IsHideOthersRecords hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsHideOthersRecords == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='Address hide'>" + item.Address + "</td>"
                + "<td class='Notes hide'>" + item.Notes + "</td>"

                + "<td class='Email_Password  hide'><input type='password' value='" + item.Email_Password + "' />" + "</td>"
                + "<td class='Email_DisplayName  hide'>" + item.Email_DisplayName + "</td>"
                + "<td class='Email_Host hide'>" + item.Email_Host + "</td>"
                + "<td class='Email_Port hide'>" + item.Email_Port + "</td>"
                + "<td class='Email_IsSSL hide'> <input type='checkbox' disabled='disabled' val='" + (item.Email_IsSSL == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td>"
                    + "<a onclick='SwitchToUserPrivilegesView(" + item.ID + ");' " + editControlsText + "</a>"
                    + "<a onclick='Users_PrintPrivilege(" + item.ID + ");' " + printControlsText + "</a>"
                + "</td>"

                + "<td><a onclick='OpenWHCSFDrafts_Modal(" + item.ID + ");' " + WHCSFDrafts_editControlsText + "</a></td>"
                + "<td><a onclick='OpenSC_Modal(" + item.ID + ");' " + SC_editControlsText + "</a></td>"
                + "<td><a onclick='OpenBranchesModal(" + item.ID + ");' class='btn btn-xs btn-rounded btn-blue float-right'> <i class='fa fa-sitemap' style='padding-left:5px;'></i> <span style='padding-right:5px;'> " + ($("[id$='hf_ChangeLanguage']").val() == "ar" ? "ربط الفروع" : "User Branches") + " </span></a></td>"
                + "<td><a onclick='OpenSalesmenServicesModal(" + item.ID + ");' " + SalesmenServices_editControlsText + "</a></td>"
                + "<td class='UsersWarehouses hide'><a onclick='OpenWarehousesModal(" + item.ID + ");' class='btn btn-xs btn-rounded btn-blue float-right'> <i class='fa fa-building' style='padding-left:5px;'></i> <span style='padding-right:5px;'> " + ($("[id$='hf_ChangeLanguage']").val() == "ar" ? "ربط المخازن" : "User Warehouses") + " </span></a></td>"

                + "<td><a onclick='OpenActivitiesModal(" + item.ID + ");' class='btn btn-xs btn-rounded btn-blue float-right'> <i class='fa fa-sitemap' style='padding-left:5px;'></i> <span style='padding-right:5px;'> " + ($("[id$='hf_ChangeLanguage']").val() == "ar" ? "ربط الأنشطة" : "User Activities") + " </span></a></td>"

                + "<td  val='" + item.Email_Footer + "' class='Email_Footer hide'>" + "" + "</td>"
                //+ "<td><a href='#UserModal' data-toggle='modal' onclick='Users_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
               
                
                + "</tr> "));
        debugger;
    });
    if (pDefaults.UnEditableCompanyName == "UNF") {
        $("#txtNotes").attr("maxlength", "5");
    }
    else if (["EF", "FPL"].includes(pDefaults.UnEditableCompanyName)) {
        $('#tblUsers .UsersWarehouses').removeClass('hide');
    } else if (pDefaults.UnEditableCompanyName == "LAT" || pDefaults.UnEditableCompanyName == "LATT") {
        $('#lblNotes').text('Code');
        $('#txtNotes').attr('disabled','disabled');
    }
    ApplyPermissions();
    BindAllCheckboxonTable("tblUsers", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblUsers>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });

    LoadUsers_Salesmen();
    if (IsNull(pDefaults.ShowUserSalesmen, "false") == true) {
        $('#stepsUserSalesmen').removeClass('hide');
        $('#UserSalesmen').removeClass('hide');
    }
    else
    {
        $('#stepsUserSalesmen').addClass('hide');
        $('#UserSalesmen').addClass('hide');
    }
}
// Loading with data
function Users_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Users/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { Users_BindTableRows(pTabelRows); Users_ClearAllControls(); });
    HighlightText("#tblUsers>tbody>tr", $("#txt-Search").val().trim());
}
// calling webapi function to add new User item.
function Users_Insert(pSaveandAddNew) {
    debugger;
    var datevar = ($("#txtExpirationDate").val().trim() == "" ? "" : ConvertDateFormat($("#txtExpirationDate").val().trim()));
    var data = {
        "pName": ($("#txtName").val() == null ? "" : $("#txtName").val().trim().toUpperCase()),
        "pLocalName": ($("#txtLocalName").val() == null ? "" : $("#txtLocalName").val().trim().toUpperCase()),
        "pBranchID": $('#slBranch option:selected').val(),
        "pDepartmentID": $('#slDepartment option:selected').val(),
        "pEmail": ($("#txtEmail").val() == null ? "" : $("#txtEmail").val().trim().toUpperCase()),
        "pPhone1": ($("#txtPhone1").val() == null ? "" : $("#txtPhone1").val().trim().toUpperCase()),
        "pPhone2": ($("#txtPhone2").val() == null ? "" : $("#txtPhone2").val().trim().toUpperCase()),
        "pMobile1": ($("#txtMobile1").val() == null ? "" : $("#txtMobile1").val().trim().toUpperCase()),
        "pAddress": ($("#txtAddress").val() == null ? "" : $("#txtAddress").val().trim().toUpperCase()),
        "pNotes": ($("#txtNotes").val() == null ? "" : $("#txtNotes").val().trim().toUpperCase()),
        "pUsername": ($("#txtUsername").val() == null ? "" : $("#txtUsername").val().trim().toUpperCase()),
        "pPassword": $("#pwdPassword").val(),
        "pExpirationDate": "01-01-2500", //datevar,
        "pIsInactive": $("#cbIsInactive").prop('checked'),
        "pIsSalesman": $("#cbIsSalesman").prop('checked'),
        "pIsAccessAllCharges": $("#cbIsAccessAllCharges").prop('checked'),
        "pIsHideOthersRecords": $("#cbIsHideOthersRecords").prop('checked'),
        "pEmail_Password": IsNull($("#txtEmail_Password").val(), ""),
        "pEmail_DisplayName": IsNull($("#txtEmail_DisplayName").val(), ""),
        "pEmail_Host": IsNull($("#txtEmail_Host").val(), ""),
        "pEmail_Port": IsNull($("#txtEmail_Port").val(), "0"),
        "pEmail_IsSSL": $("#cbEmail_IsSSL").prop('checked'),
        "pEmail_Header": "",
        "pEmail_Footer": $('#txtEmail_Footer').summernote('code'),
        "pUserSalesmen": GetAllSelectedIDsAsStringWithNameAttr("nameCbUserSalesmen")
    };
    PostInsertUpdateFunction("form", "/api/Users/Insert", data, pSaveandAddNew, "UserModal", function () { Users_LoadingWithPaging(); LoadDefaults("/api/Defaults/LoadAll", " WHERE ID = 1 "); /*Reload Defaultsfor the branch*/ });
}

function Users_Update(pSaveandAddNew) {
    var datevar = ConvertDateFormat($("#txtExpirationDate").val().trim());
    var data = {
        "pID": $("#hID").val(),
        "pLoggedUserID": $("#hLoggedUserID").val(),
        "pName": ($("#txtName").val() == null ? "" : $("#txtName").val().trim().toUpperCase()),
        "pLocalName": ($("#txtLocalName").val() == null ? "" : $("#txtLocalName").val().trim().toUpperCase()),
        "pBranchID": $('#slBranch option:selected').val(),
        "pDepartmentID": $('#slDepartment option:selected').val(),
        "pRoleID": tempRoleID,//not to be set to null if value is found(because of the generator)
        "pEmail": ($("#txtEmail").val() == null ? "" : $("#txtEmail").val().trim().toUpperCase()),
        "pPhone1": ($("#txtPhone1").val() == null ? "" : $("#txtPhone1").val().trim().toUpperCase()),
        "pPhone2": ($("#txtPhone2").val() == null ? "" : $("#txtPhone2").val().trim().toUpperCase()),
        "pMobile1": ($("#txtMobile1").val() == null ? "" : $("#txtMobile1").val().trim().toUpperCase()),
        "pAddress": ($("#txtAddress").val() == null ? "" : $("#txtAddress").val().trim().toUpperCase()),
        "pNotes": ($("#txtNotes").val() == null ? "" : $("#txtNotes").val().trim().toUpperCase()),
        "pUsername": ($("#txtUsername").val() == null ? "" : $("#txtUsername").val().trim().toUpperCase()),
        "pPassword": $("#pwdPassword").val(),
        "pExpirationDate": "01-01-2500", //datevar,
        "pIsInactive": $("#cbIsInactive").prop('checked'),
        "pIsSalesman": $("#cbIsSalesman").prop('checked'),
        "pIsAccessAllCharges": $("#cbIsAccessAllCharges").prop('checked'),
        "pIsHideOthersRecords": $("#cbIsHideOthersRecords").prop('checked'),
        "pEmail_Password": IsNull($("#txtEmail_Password").val(), ""),
        "pEmail_DisplayName": IsNull($("#txtEmail_DisplayName").val(), ""),
        "pEmail_Host": IsNull($("#txtEmail_Host").val(), ""),
        "pEmail_Port": IsNull($("#txtEmail_Port").val(), "0"),
        "pEmail_IsSSL": $("#cbEmail_IsSSL").prop('checked'),
        "pEmail_Header": "",
        "pEmail_Footer": $('#txtEmail_Footer').summernote('code'),
        "pUserSalesmen": GetAllSelectedIDsAsStringWithNameAttr("nameCbUserSalesmen")
    };
    PostInsertUpdateFunction("form", "/api/Users/Update", data, pSaveandAddNew, "UserModal", function () {
        Users_LoadingWithPaging(); LoadDefaults("/api/Defaults/LoadAll", " WHERE ID = 1 "); /*Reload Defaultsfor the branch*/
        if ($("#hLoggedUserID").val() == $("#hID").val()) //to handle case if changing username for the logged user
            $("#sp-LoginName b").text($("#txtUsername").val().trim().toUpperCase());
    });
}
function Users_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblUsers') != "")
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
                CallGETFunctionWithParameters("/api/Users/Delete", { pUsersIDs: GetAllSelectedIDsAsString('tblUsers') }
                    , function (data) {
                        Users_LoadingWithPaging();
                    }
                    , function () { FadePageCover(false); });
            });
    //DeleteListFunction("/api/Users/Delete", { "pUsersIDs": GetAllSelectedIDsAsString('tblUsers') }, function () { Users_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
function Users_FillControls(pID) {
    debugger;
    // Fill All Model Controls
    $("#pwdConfirmPassword").attr("data-required", "false");
    $("#pwdPassword").attr("data-required", "false");
    $('#txtEmail_Footer').summernote('code', '');
    
    //Users_ClearAllControls();
    //i used the next line instead of the previous one to fix a problem of instability of the slRegion filling in case of editing
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slRegion"), null);
    //ClearAll("User-form", null);
    ClearAll("#UserModal", null);
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");

    $("#lblShown").html(": " + $(tr).find("td.Name").text());
    var tempRoleName = $(tr).find("td.Role").text();
    $("#lblRoleShown").html(": " + (tempRoleName == '0' ? "Not Assigned" : tempRoleName));

    //the next 4 lines are to set the selectboxes to the value entered before
    var pBranchID = $(tr).find("td.Branch").attr('val');
    Branches_GetList(pBranchID);
    var pDepartmentID = $(tr).find("td.Department").attr('val');
    Departments_GetList(pDepartmentID);

    tempRoleID = $(tr).find("td.Role").attr('val');

    //Mandatory code for UniFreight only (make use of Notes field to avoid adding new column)
    if (pDefaults.UnEditableCompanyName == "UNF") {
        $("#lblNotes").text("Code");
        $("#txtNotes").attr("data-required",true);
        $("#txtNotes").attr("placeholder", "Code");
    }
    if (IsMESCOCompany) {
        $("#lblNotes").text("Finance 365 Ref");
    }

    $("#txtName").val($(tr).find("td.Name").text());
    $("#txtLocalName").val($(tr).find("td.LocalName").text());
    $("#txtEmail").val($(tr).find("td.Email").text());
    $("#txtPhone1").val($(tr).find("td.Phone1").text());
    $("#txtPhone2").val($(tr).find("td.Phone2").text());
    $("#txtMobile1").val($(tr).find("td.Mobile1").text());
    $("#txtUsername").val($(tr).find("td.Username").text());
    $("#pwdPassword").val($(tr).find("td.Password").text());
    $("#pwdConfirmPassword").val($(tr).find("td.Password").text());
    $("#txtExpirationDate").val($(tr).find("td.ExpirationDate").html());
    $("#cbIsInactive").prop('checked', $(tr).find('td.IsInactive').find('input').attr('val'));
    $("#txtAddress").val($(tr).find("td.Address").text());
    $("#txtNotes").val($(tr).find("td.Notes").text());
    $("#cbIsSalesman").prop('checked', $(tr).find('td.IsSalesman').find('input').attr('val'));

    $("#cbIsAccessAllCharges").prop('checked', $(tr).find('td.IsAccessAllCharges').find('input').attr('val'));
    $("#cbIsHideOthersRecords").prop('checked', $(tr).find('td.IsHideOthersRecords').find('input').attr('val'));


    $('#txtEmail_Footer').summernote('code', IsNull($(tr).find("td.Email_Footer").attr('val'), ""));








    $("#txtEmail_Password").val(""/*IsNull($(tr).find("td.Email_Password").find("input[type='password']").attr("value"), "")*/);
    $("#txtEmail_DisplayName").val(IsNull($(tr).find("td.Email_DisplayName").text(), ""));
    $("#txtEmail_Host").val(IsNull($(tr).find("td.Email_Host").text(), ""));
    $("#txtEmail_Port").val($(tr).find("td.Email_Port").text());
    $("#cbEmail_IsSSL").prop('checked', $(tr).find('td.Email_IsSSL').find('input').attr('val'));




    


    $("#btnSave").attr("onclick", "Users_Update(false);");
    $("#btnSaveandNew").attr("onclick", "Users_Update(true);");


    cbUnCheckAllUserSalesmenChanged();
    cbdisableCheckAllUserSalesmenChanged();
    debugger;

    FadePageCover(true);
    debugger
    CallGETFunctionWithParameters("/api/Users/LoadAllUserSalesmen"
        ,
        {
            pWhereClause: " where ID = " + $("#hID").val() + ""
        }
        , function (pData) {

            
            if (IsNull(pData, "") != "")
            {
                var data = JSON.parse(pData);
                var Row = data[0];
            
            
                FadePageCover(false);
                var ArrUserSalesmen = IsNull(Row.HisSalesmenIDs, '').split(',');

                $(ArrUserSalesmen).each(function (i, item) {
                    $('#divCbUserSalesmen input[name=nameCbUserSalesmen][value="' + item + '"]').prop("checked", true);

                    if (i == $(ArrUserSalesmen).length - 1)
                    {
                        $('#divCbUserSalesmen input[name=nameCbUserSalesmen][value="' + $("#hID").val() + '"]').prop("checked", true);
                        $('#divCbUserSalesmen input[name=nameCbUserSalesmen][value="' + $("#hID").val() + '"]').prop("disabled", true);
                    }

                });
                
            }
        }
        , null);
}
function SendTestEmail() {
    $.ajax({
        type: "POST",
        url: "/api/Defaults/SendTestEmail",
        data: JSON.stringify({
            "pEmail": $("#txtEmail").val().trim()
            , "pEmail_Password": IsNull($("#txtEmail_Password").val(), ""),
            "pEmail_DisplayName": IsNull($("#txtEmail_DisplayName").val(), ""),
            "pEmail_Host": IsNull($("#txtEmail_Host").val(), ""),
            "pEmail_Port": IsNull($("#txtEmail_Port").val(), "0"),
            "pEmail_IsSSL": $("#cbEmail_IsSSL").prop('checked'),
            "pEmail_Header": "",
            "pEmail_Footer": $('#txtEmail_Footer').summernote('code'),
            "pEmail_To": $("#txtEmail_To").val().trim(),
            "pEmail_Subject": $("#txtEmail_Subject").val().trim(),
            "pEmail_Body": $("#txtEmail_Body").val().trim()
        }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (d) {
            debugger
            if (d[0] == "") {
                swal("Great !", "Is Correct Setting Check Reciever Inbox", "success");
            }
            else {
                swal("Sorry !", "Is not Correct Setting", "warning");
            }
        }
    });

}
function Users_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slRegion"), null);
    ClearAll("#UserModal", null);

    $("#pwdConfirmPassword").attr("data-required", "true");
    $("#pwdPassword").attr("data-required", "true");

    Branches_GetList(null);
    Departments_GetList(null);

    $("#lblShown").html(": New");
    $("#lblRoleShown").html(": Not Assigned");

    $("#txtEmail_Password").val("");
    $("#txtEmail_DisplayName").val("");
    $("#txtEmail_Host").val("");
    $("#txtEmail_Port").val("0");
    $("#cbEmail_IsSSL").prop('checked', false);
    $('#txtEmail_Footer').summernote('code', "");
    $("#btnSave").attr("onclick", "Users_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "Users_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
}
function Users_PrintPrivilege(pID) {
    debugger;
    FadePageCover(true);
    var pParametersWithValues = {
        pWhereClauseForPrint: "WHERE UserID=" + pID + " AND CanView=1 AND IsInactive=0 ORDER BY GroupID,ImageName"
        , pUserID: pID
    };
    CallGETFunctionWithParameters("/api/UserPrivileges/LoadWithWhereClause", pParametersWithValues
        , function (pData) {
            let _ReturnedMessage = "";
            let _ReportRows = JSON.parse(pData[0]);
            let pPrintedUser = JSON.parse(pData[1]);
            let pOption = "Print";
            let _ReportHTML = '';
            let _ReportTitle = "User Privileges";
            if (_ReturnedMessage == "") {
                //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                _ReportHTML += '<html>';
                _ReportHTML += '     <head><title>' + _ReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                _ReportHTML += '         <body style="background-color:white;">';
                //_ReportHTML += '            <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
                _ReportHTML += '            <div class="col-xs-12 text-center text-ul"><h2><b>' + _ReportTitle + '</b></h2>' + '</div>';
                _ReportHTML += '            <div class="col-xs-12"><b>User: </b>' + pPrintedUser.Username + (pPrintedUser.IsInactive ? " <u>(Inactive)</u>" : " <u>(Active)</u>") + '</div>';
                _ReportHTML += '            <div class="col-xs-12"><b>Department: </b>' + pPrintedUser.DepartmentName + '</div>';
                _ReportHTML += '            <div class="col-xs-12"><b>Role: </b>' + pPrintedUser.RoleName + '</div>';
                _ReportHTML += '            <table id="tblUserPrivilege" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
                _ReportHTML += '                <thead>';
                _ReportHTML += '                    <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                _ReportHTML += '                        <td>Privilege</td>';
                _ReportHTML += '                        <td>View</td>';
                _ReportHTML += '                        <td>Add</td>';
                _ReportHTML += '                        <td>Edit</td>';
                _ReportHTML += '                        <td>Delete</td>';
                _ReportHTML += '                    </tr>';
                _ReportHTML += '                </thead>';
                _ReportHTML += '                <tbody>';
                $.each(_ReportRows, function (i, item) {
                    _ReportHTML += '                    <tr>';
                    _ReportHTML += '                        <td>' + item.ImageName + '</td>';
                    _ReportHTML += '                        <td>' + (item.CanView ? "✓" : "") + '</td>';
                    _ReportHTML += '                        <td>' + (item.CanAdd ? "✓" : "") + '</td>';
                    _ReportHTML += '                        <td>' + (item.CanEdit ? "✓" : "") + '</td>';
                    _ReportHTML += '                        <td>' + (item.CanDelete ? "✓" : "") + '</td>';
                    _ReportHTML += '                    </tr>';
                });
                _ReportHTML += '                </tbody>';

                _ReportHTML += '            </table>';

                _ReportHTML += '         </body>';
                _ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                //_ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                _ReportHTML += '     </footer>';
                _ReportHTML += '</html>';
                if (pOption == "Print" || pOption == undefined || pOption == null) {
                    var mywindow = window.open('', '_blank');
                    mywindow.document.write(_ReportHTML);
                    mywindow.document.close();
                }
                else if (pOption == "Email") {
                    ////SendPDFEmail_General(pEmail_Subject, pEmail_To, pReportHTML, pReportTitle, null);
                    //SendPDFEmail_General("Operation " + $("#hOperationCode").val(), pEmail_To, _ReportHTML, pReportTitle, null);
                }
            } //if (_ReturnedMessage == "") {
            else
                swal("Sorry", _ReturnedMessage);
            FadePageCover(false);
        }
        , null);
}
// User Region ---------------------------------------------------------------

//to fill the select box

//to fill the select box
function Branches_GetList(pID) {//pID is used in case of editing to set the Branch code or name
    //parameters: ID, strFnName, First Row in select list, select list name
    //GetListWithName(pID, "/api/Branches/LoadAll", "Select Branch", "slBranch");
    GetListWithNameAndWhereClause(pID, "/api/Branches/LoadAll", "Select Branch", "slBranch", " ORDER BY Name ");
}

//to fill the select box
function Departments_GetList(pID) {//pID is used in case of editing to set the Department code or name
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithNameAndWhereClause(pID, "/api/NoAccessDepartments/LoadAll", "Select Department", "slDepartment", "ORDER BY Name", null);
}

function Users_EditByDblClick(pID) {
    jQuery("#UserModal").modal("show");
    Users_FillControls(pID);
}

function SwitchToUserPrivilegesView(pID) {
    debugger;
    if (pID == null)//this means called by button, so check for 1 check
        if (GetAllSelectedIDsAsString('tblUsers') != "" && GetAllSelectedIDsAsString('tblUsers').split(',').length == 1) {
            // i am sure i have just 1 ID isa
            LoadViews("UserPrivileges", null, GetAllSelectedIDsAsString('tblUsers'));
        }
        else
            //swal(strSorry, "Please, Check 1 User To Edit it's Privileges.", "warning");
            swal(strSorry, "Please, Check 1 User To Edit it's Privileges.");
    else { // of (pID == null)
        LoadViews("UserPrivileges", null, pID);
    }
}
//EOF Region User ---------------------------------------------------------------


//#region User Salesmen

function cbCheckAllUserSalesmenChanged() {
    debugger;
    if ($("#cbCheckAllUserSalesmen").prop("checked"))
        $("#divCbUserSalesmen input[name=nameCbUserSalesmen]").prop("checked", true);
    else
        $("#divCbUserSalesmen input[name=nameCbUserSalesmen]").prop("checked", false);
}

function cbUnCheckAllUserSalesmenChanged() {
        $("#divCbUserSalesmen input[name=nameCbUserSalesmen]").prop("checked", false);
}

function cbdisableCheckAllUserSalesmenChanged() {
    $("#divCbUserSalesmen input[name=nameCbUserSalesmen]").prop("disabled", false);
}

function FillDivWithCheckboxes_DynamicFiledWithCheckedVals(pDivName, pData, pCheckboxNameAttr, FieldName, CheckedVals, callback) {
    //Clear the div
    $("#" + pDivName).html("");
    var option = "";

    var ArrCheckedVals = (IsNull(CheckedVals, "")).split(',');
    $.each(JSON.parse(pData), function (i, item) {
        var checked = "";
        if (ArrCheckedVals.indexOf((IsNull(item[FieldName], 0)).toString()) != -1)
            checked = " checked ";
            option += '<div class="swapCheckBoxesClass"> ';
            option += ' <input ' + checked +' type="checkbox" name="' + pCheckboxNameAttr + '" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);"  value="' + item.ID + '" /> ';
            option += ' <label> ' + item[FieldName];
            option += ' &nbsp;</label> </div>';
        });
    $("#" + pDivName).append(option);
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapCheckBoxesClass:not(.reversed)").reverseChildren();
}

//GetAllSelectedIDsAsStringWithNameAttr("nameCbStores")

//FillDivWithCheckboxes_DynamicFiled("divCbStores", pStores, "nameCbStores", "StoreName", null);

function LoadUsers_Salesmen()
{

    var ReportName = "";
    FadePageCover(true);
    debugger

        CallGETFunctionWithParameters("/api/Users/LoadAll"
        ,
        {
            pWhereClause: " where isnull( IsSalesman , 0 ) = 1"
        }
        , function (pData)
        {
            FillDivWithCheckboxes_DynamicFiled("divCbUserSalesmen", pData[0], "nameCbUserSalesmen", "Name",  null);
            FadePageCover(false);
        }
        , null);

    //GetAllSelectedIDsAsStringWithNameAttr("nameCbUserSalesmen");
}


//#endregion

//#region User SC_TransactionTypes

function cbCheckAllSC_UserChanged() {
    debugger;
    if ($("#cbCheckAllSC_User").prop("checked"))
        $("#divCbSC_User input[name=nameCbSC_User]").prop("checked", true);
    else
        $("#divCbSC_User input[name=nameCbSC_User]").prop("checked", false);
}

function cbUnCheckAllSC_UserChanged() {
    $("#divCbSC_User input[name=nameCbSC_User]").prop("checked", false);
}

function cbdisableCheckAllSC_UserChanged() {
    $("#divCbSC_User input[name=nameCbSC_User]").prop("disabled", false);
}


function LoadSC_UserTranscations(UserID)

{
    debugger
    var ReportName = "";
    FadePageCover(true);
    debugger

    CallGETFunctionWithParameters("/api/SC_Approving/GetSC_UserTransactionTypesApprovalWithUserID"
        ,
        {
            pUserID: UserID
        }
        , function (pData) {
          //  FillDivWithCheckboxes_DynamicFiled("divCbUserSalesmen", pData[0], "nameCbUserSalesmen", "Name", null);
            FadePageCover(false);

            var UserTransactionsType = JSON.parse(pData[0]);
            var TransactionTypesIDs = UserTransactionsType.map(item => item.TransactionTypeID);


            FillDivWithCheckboxes_DynamicFiledWithCheckedValsFroSC_TransactionsTypes("divCbSC_User", pData[1], "nameCbSC_User", "Name", TransactionTypesIDs);

        }
        , null);

    //GetAllSelectedIDsAsStringWithNameAttr("nameCbUserSalesmen");
}

function FillDivWithCheckboxes_DynamicFiledWithCheckedValsFroSC_TransactionsTypes(pDivName, pData, pCheckboxNameAttr, FieldName, pArrCheckedVals, callback) {
    //Clear the div
    $("#" + pDivName).html("");
    var option = "";

    var ArrCheckedVals = pArrCheckedVals;// (IsNull(CheckedVals, "")).split(',');
    $.each(JSON.parse(pData), function (i, item) {
        var checked = "";
        if (ArrCheckedVals.indexOf(item.ID) != -1)
            checked = " checked ";
        option += '<div class="swapCheckBoxesClass"> ';
        option += ' <input ' + checked + ' type="checkbox" name="' + pCheckboxNameAttr + '" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);"  value="' + item.ID + '" /> ';
        option += ' <label> ' + item[FieldName];
        option += ' &nbsp;</label> </div>';
    });
    $("#" + pDivName).append(option);
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapCheckBoxesClass:not(.reversed)").reverseChildren();
}

function OpenSC_Modal(UserID)
{
    $("#hID").val(UserID)
    LoadSC_UserTranscations(UserID);
    jQuery("#SC_UserModal").modal("show");
}

function Users_UpdateUserSC_TransactionTypes(pSaveandAddNew) {
    debugger
    var data =
    {
        "pID": $("#hID").val(),
        "pTransactionsTypesIDs": IsNull( GetAllSelectedIDsAsStringWithNameAttr("nameCbSC_User") , "0")
    };                                           
    PostInsertUpdateFunction("form", "api/SC_Approving/UpdateUserSC_TransactionTypesApproval", data, pSaveandAddNew, "SC_UserModal", function () {
        Users_LoadingWithPaging();
    });
}


//#endregion

//#region User Branches

function OpenBranchesModal(UserID) {
    $("#hID").val(UserID);
    LoadBranches(UserID);
    jQuery("#BranchesModal").modal("show");
    $("#cbCheckAllBranches").prop("checked", false);
}
function LoadBranches(UserID) {
    debugger
    var ReportName = "";
    FadePageCover(true);
    debugger

    CallGETFunctionWithParameters("/api/Users/GetUserBranches"
        ,
        {
            pUserID: UserID
        }
        , function (pData) {
            FadePageCover(false);
            var UserBranches = JSON.parse(pData[0]);
            var SelectedUserBranches = UserBranches.map(item => item.BranchID);
            FillDivWithCheckboxes_DynamicFiledWithCheckedValsForBranches("divCbBranches", pData[1], "nameCbBranches", "Name", SelectedUserBranches);
        }
        , null);
}

function OpenActivitiesModal(UserID) {
    $("#hID").val(UserID);
    LoadActivities(UserID);
    jQuery("#ActivitiesModal").modal("show");
    $("#cbCheckAllActivities").prop("checked", false);
}


function LoadActivities(UserID) {
    debugger
    var ReportName = "";
    FadePageCover(true);
    debugger

    CallGETFunctionWithParameters("/api/Users/GetUserActivities"
        ,
        {
            pUserID: UserID
        }
        , function (pData) {
            FadePageCover(false);
            var UserActivities = JSON.parse(pData[0]);
            var SelectedUserActivities = UserActivities.map(item => item.ID);
            FillDivWithCheckboxes_DynamicFiledWithCheckedValsForBranches("divCbActivities", pData[1], "nameCbActivities", "CostCenterName", SelectedUserActivities);
        }
        , null);
}

function FillDivWithCheckboxes_DynamicFiledWithCheckedValsForBranches(pDivName, pMasterData, pCheckboxNameAttr, FieldName, pArrCheckedVals, callback) {
    //Clear the div
    $("#" + pDivName).html("");
    var option = "";

    var ArrCheckedVals = pArrCheckedVals;// (IsNull(CheckedVals, "")).split(',');
    $.each(JSON.parse(pMasterData), function (i, item) {
        var checked = "";
        if (ArrCheckedVals.indexOf(item.ID) != -1)
            checked = " checked ";
        option += '<div class="swapCheckBoxesClass"> ';
        option += ' <input ' + checked + ' type="checkbox" name="' + pCheckboxNameAttr + '" onchange="cbAfterChangeBranchesCheckBox(this);"  onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);"  value="' + item.ID + '" /> ';
        option += ' <label> ' + item[FieldName];
        option += ' &nbsp;</label> </div>';
    });
    $("#" + pDivName).append(option);
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapCheckBoxesClass:not(.reversed)").reverseChildren();
}

function CheckAllBranches() {
    debugger;
    if ($("#cbCheckAllBranches").prop("checked"))
        $("#divCbBranches input[name=nameCbBranches]").prop("checked", true);
    else
        $("#divCbBranches input[name=nameCbBranches]").prop("checked", false);
}

function cbAfterChangeBranchesCheckBox(THIS) {
    var IsChecked = $(THIS).is(':checked');

    if (!IsChecked) {
        $("#cbCheckAllBranches").prop("checked", false);
    }
    else if ($("#divCbBranches input[name=nameCbBranches]:checked").length == $("#divCbBranches input[name=nameCbBranches]").length) {
        $("#cbCheckAllBranches").prop("checked", true);
    }
}

function UpdateUserBranches(pSaveandAddNew) {
    debugger
    var data =
    {
        "pID": $("#hID").val(),
        "pBranchesIDs": IsNull(GetAllSelectedIDsAsStringWithNameAttr("nameCbBranches"), "0")
    };
    PostInsertUpdateFunction("form", "/api/Users/UpdateUserBranches", data, pSaveandAddNew, "BranchesModal", function () {
        jQuery("#BranchesModal").modal("hide");
       // Users_LoadingWithPaging();
    });
}

function UpdateUserActivities(pSaveandAddNew) {
    debugger
    var data =
    {
        "pID": $("#hID").val(),
        "pActivitiesIDs": IsNull(GetAllSelectedIDsAsStringWithNameAttr("nameCbActivities"), "0")
    };
    PostInsertUpdateFunction("form", "/api/Users/UpdateUserActivities", data, pSaveandAddNew, "ActivitiesModal", function () {
        jQuery("#ActivitiesModal").modal("hide");
    });
}
//#endregion

//#region User Warehouses
function OpenWarehousesModal(UserID) {
    $("#hID").val(UserID);
    LoadWarehouses(UserID);
    jQuery("#WarehousesModal").modal("show");
    $("#cbCheckAllWarehouses").prop("checked", false);
}
function LoadWarehouses(UserID) {
    debugger
    FadePageCover(true);
    debugger

    CallGETFunctionWithParameters("/api/Users/GetUserWarehouses", { pWhereClause: "where UserID=" + UserID+""}
        , function (pData) {
            FadePageCover(false);
            var DefaultWarehouse = 0;
            var UserWarehouses = JSON.parse(pData[0]);
            $.each(UserWarehouses, function (i, item) {
                if (item.IsDefault)
                    DefaultWarehouse=item.WarehouseID;
            });
            var SelectedUserWarehouses = UserWarehouses.map(item => item.WarehouseID);
            FillDivWithCheckboxes_DynamicFiledWithCheckedValsForWarehouses("divCbWarehouses", pData[1], "nameCbWarehouses", "Name", SelectedUserWarehouses, DefaultWarehouse);
        }
        , null);
}
function FillDivWithCheckboxes_DynamicFiledWithCheckedValsForWarehouses(pDivName, pMasterData, pCheckboxNameAttr, FieldName, pArrCheckedVals, pDefaultWarehouse, callback) {
    //Clear the div
    $("#" + pDivName).html("");
    var option = "";

    var ArrCheckedVals = pArrCheckedVals;// (IsNull(CheckedVals, "")).split(',');
    $.each(JSON.parse(pMasterData), function (i, item) {
        var checked = "";
        if (ArrCheckedVals.indexOf(item.ID) != -1)
            checked = " checked ";
        option += '<div class="swapCheckBoxesClass"> ';
        option += ' <input type="radio" name="nameRdWarehouses" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);"  value="' + item.ID + '" ' + (pDefaultWarehouse == item.ID ? "checked" : "") + '/>  &emsp;  &emsp; &emsp; &emsp;';
        option += ' <input ' + checked + ' type="checkbox" name="' + pCheckboxNameAttr + '" onchange="cbAfterChangeWarehousesCheckBox(this);"  onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);"  value="' + item.ID + '" /> ';
        option += ' <label> ' + item[FieldName];
        option += ' &nbsp;</label> </div>';
    });
    $("#" + pDivName).append(option);
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapCheckBoxesClass:not(.reversed)").reverseChildren();
}

function CheckAllWarehouses() {
    debugger;
    if ($("#cbCheckAllWarehouses").prop("checked"))
        $("#divCbWarehouses input[name=nameCbWarehouses]").prop("checked", true);
    else
        $("#divCbWarehouses input[name=nameCbWarehouses]").prop("checked", false);
}

function cbAfterChangeWarehousesCheckBox(THIS) {
    var IsChecked = $(THIS).is(':checked');

    if (!IsChecked) {
        $("#cbCheckAllWarehouses").prop("checked", false);
    }
    else if ($("#divCbWarehouses input[name=nameCbWarehouses]:checked").length == $("#divCbWarehouses input[name=nameCbWarehouses]").length) {
        $("#cbCheckAllWarehouses").prop("checked", true);
    }
}

function UpdateUserWarehouses(pSaveandAddNew) {
    debugger
    var data =
    {
        "pID": $("#hID").val(),
        "pWarehousesIDs": IsNull(GetAllSelectedIDsAsStringWithNameAttr("nameCbWarehouses"), "0"),
        "pDefaultWarehouseID": IsNull($('input[name=nameRdWarehouses]:checked').val(),0)
    };
    PostInsertUpdateFunction("form", "/api/Users/UpdateUserWarehouses", data, pSaveandAddNew, "WarehousesModal", function () {
        jQuery("#WarehousesModal").modal("hide");
    });
}
//#endregion

//#region User CFS Drafts

function OpenWHCSFDrafts_Modal(UserID) {
    $("#hID").val(UserID)
    LoadWHCSFDrafts(UserID);
    jQuery("#WHCSFDraftsModal").modal("show");
}

function LoadWHCSFDrafts(UserID) {
    debugger
    var ReportName = "";
    FadePageCover(true);
    debugger

    CallGETFunctionWithParameters("/api/Users/GetUserWHCSFTariffDrafts"
        ,
        {
            pUserID: UserID
        }
        , function (pData) {

            FadePageCover(false);

            var UserWHCSFDraftsGenerate = JSON.parse(pData[0]);
            var WHCSFDraftsGenerateIDs = UserWHCSFDraftsGenerate.map(item => item.WH_CSL_TariffID);

            FillDivWithCheckboxes_DynamicFiledWithCheckedValsForWHCSFDrafts("divCbWHCSFDraftsGenerate", pData[2], "nameCbWHCSFDraftsGenerate", "Name", WHCSFDraftsGenerateIDs);

            var UserWHCSFDraftsApprove = JSON.parse(pData[1]);
            var WHCSFDraftsApproveIDs = UserWHCSFDraftsApprove.map(item => item.WH_CSL_TariffID);

            FillDivWithCheckboxes_DynamicFiledWithCheckedValsForWHCSFDrafts("divCbWHCSFDraftsApprove", pData[3], "nameCbWHCSFDraftsApprove", "Name", WHCSFDraftsApproveIDs);

        }
        , null);

}

function FillDivWithCheckboxes_DynamicFiledWithCheckedValsForWHCSFDrafts(pDivName, pData, pCheckboxNameAttr, FieldName, pArrCheckedVals, callback) {
    //Clear the div
    $("#" + pDivName).html("");
    var option = "";

    var ArrCheckedVals = pArrCheckedVals;// (IsNull(CheckedVals, "")).split(',');
    $.each(JSON.parse(pData), function (i, item) {
        var checked = "";
        if (ArrCheckedVals.indexOf(item.ID) != -1)
            checked = " checked ";
        option += '<div class="swapCheckBoxesClass"> ';
        option += ' <input ' + checked + ' type="checkbox" name="' + pCheckboxNameAttr + '" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);"  value="' + item.ID + '" /> ';
        option += ' <label> ' + item[FieldName];
        option += ' &nbsp;</label> </div>';
    });
    $("#" + pDivName).append(option);
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapCheckBoxesClass:not(.reversed)").reverseChildren();
}

function cbCheckAllWHCSFDraftsGenerateChanged() {
    debugger;
    if ($("#cbCheckAllWHCSFDraftsGenerate").prop("checked"))
        $("#divCbWHCSFDraftsGenerate input[name=nameCbWHCSFDraftsGenerate]").prop("checked", true);
    else
        $("#divCbWHCSFDraftsGenerate input[name=nameCbWHCSFDraftsGenerate]").prop("checked", false);
}

function cbCheckAllWHCSFDraftsApproveChanged() {
    debugger;
    if ($("#cbCheckAllWHCSFDraftsApprove").prop("checked"))
        $("#divCbWHCSFDraftsApprove input[name=nameCbWHCSFDraftsApprove]").prop("checked", true);
    else
        $("#divCbWHCSFDraftsApprove input[name=nameCbWHCSFDraftsApprove]").prop("checked", false);
}



function UpdateWHCSFDrafts() {
    debugger
    var data =
    {
        "pID": $("#hID").val(),
        "pTariffDraftsGenerateIDs": IsNull(GetAllSelectedIDsAsStringWithNameAttr("nameCbWHCSFDraftsGenerate"), "0"),
        "pTariffDraftsApproveIDs": IsNull(GetAllSelectedIDsAsStringWithNameAttr("nameCbWHCSFDraftsApprove"), "0")
    };
    PostInsertUpdateFunction("form", "api/Users/UpdateUserWHCSFTariffDrafts", data, false, "WHCSFDraftsModal", function () {
        //Users_LoadingWithPaging();
    });
}

//#endregion

//#region UserSalesmenServices
function OpenSalesmenServicesModal(UserID) {
    $("#hID").val(UserID)
    LoadUserSalesmenServices(UserID);
    jQuery("#UserSalesmenServicesModal").modal("show");
}

function LoadUserSalesmenServices(UserID) {
    debugger
    var ReportName = "";
    FadePageCover(true);
    debugger

    CallGETFunctionWithParameters("/api/Users/GetUserSalesmenServices"
        ,
        {
            pUserID: UserID
        }
        , function (pData) {
            debugger;
            FadePageCover(false);
            
            var UserSalesmen = JSON.parse(pData[0]);
            var SalesmenIDs = UserSalesmen.map(item => item.SalesmanID);

            if (IsMESCOCompany)
                FillDivWithCheckboxes_DynamicFiledWithCheckedValsForUserSalesmenServices("divCbUserSalesmen", pData[2], "nameCbUserSalesmen", "NAME", SalesmenIDs);
            else
                FillDivWithCheckboxes_DynamicFiledWithCheckedValsForUserSalesmenServices("divCbUserSalesmen", pData[4], "nameCbUserSalesmen", "Username", SalesmenIDs);

            var UserServices = JSON.parse(pData[1]);
            var ServicesIDs = UserServices.map(item => item.ServiceID);

            FillDivWithCheckboxes_DynamicFiledWithCheckedValsForUserSalesmenServices("divCbUserServices", pData[3], "nameCbUserServices", "NAME", ServicesIDs);

        }
        , null);

}

function FillDivWithCheckboxes_DynamicFiledWithCheckedValsForUserSalesmenServices(pDivName, pData, pCheckboxNameAttr, FieldName, pArrCheckedVals, callback) {
    //Clear the div
    $("#" + pDivName).html("");
    var option = "";

    var ArrCheckedVals = pArrCheckedVals;// (IsNull(CheckedVals, "")).split(',');
    $.each(JSON.parse(pData), function (i, item) {
        var checked = "";
        if (ArrCheckedVals.indexOf(item.ID) != -1)
            checked = " checked ";
        option += '<div class="swapCheckBoxesClass"> ';
        option += ' <input ' + checked + ' type="checkbox" name="' + pCheckboxNameAttr + '" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);"  value="' + item.ID + '" /> ';
        option += ' <label> ' + item[FieldName];
        option += ' &nbsp;</label> </div>';
    });
    $("#" + pDivName).append(option);
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapCheckBoxesClass:not(.reversed)").reverseChildren();
}

function cbCheckAllSalesmenChanged() {
    debugger;
    if ($("#cbCheckAllSalesmen").prop("checked"))
        $("#divCbUserSalesmen input[name=nameCbUserSalesmen]").prop("checked", true);
    else
        $("#divCbUserSalesmen input[name=nameCbUserSalesmen]").prop("checked", false);
}

function cbCheckAllServicesChanged() {
    debugger;
    if ($("#cbCheckAllServices").prop("checked"))
        $("#divCbUserServices input[name=nameCbUserServices]").prop("checked", true);
    else
        $("#divCbUserServices input[name=nameCbUserServices]").prop("checked", false);
}

function UpdateUserSalesmenServices() {
    debugger
    var data =
    {
        pID: $("#hID").val(),
        pSalesmenIDs: IsNull(GetAllSelectedIDsAsStringWithNameAttr("nameCbUserSalesmen"), "0"),
        pServicesIDs: IsNull(GetAllSelectedIDsAsStringWithNameAttr("nameCbUserServices"), "0")
    };
    PostInsertUpdateFunction("form", "api/Users/UpdateUserSalesmenServices", data, false, "UserSalesmenServicesModal", function () {
        //Users_LoadingWithPaging();
    });
}

function CheckAllActivities() {
        debugger;
    if ($("#cbCheckAllActivities").prop("checked"))
        $("#divCbActivities input[name=nameCbActivities]").prop("checked", true);
        else
        $("#divCbActivities input[name=nameCbActivities]").prop("checked", false);
    }
