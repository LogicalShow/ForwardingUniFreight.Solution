function NoAccessDepartments_BindTableRows(pNoAccessDepartments) {
    $("#hl-menu-Administration").parent().addClass("active");
    ClearAllTableRows("tblNoAccessDepartments");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pNoAccessDepartments, function (i, item) {
        AppendRowtoTable("tblNoAccessDepartments",
        ("<tr ID='" + item.ID + "' ondblclick='NoAccessDepartments_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code'>" + (item.Code == 0 ? "" : item.Code) + "</td>"
                    + "<td class='Name'>" + (item.Name == 0 ? "" : item.Name) + "</td>"
                    + "<td class='LocalName hide'>" + (item.LocalName == 0 ? "" : item.LocalName) + "</td>"
                    + "<td class='Notes'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"

                    + "<td class='Email hide'>" + (item.Email == 0 ? "" : item.Email) + "</td>"
                    + "<td class='Email_Password  hide'><input type='password' value='" + item.Email_Password + "' />" + "</td>"
                    + "<td class='Email_DisplayName  hide'>" + item.Email_DisplayName + "</td>"
                    + "<td class='Email_Host hide'>" + item.Email_Host + "</td>"
                    + "<td class='Email_Port hide'>" + item.Email_Port + "</td>"
                    + "<td class='Email_IsSSL hide'> <input type='checkbox' disabled='disabled' val='" + (item.Email_IsSSL == true ? "true' checked='checked'" : "'") + " /></td>"
                    //+ "<td class='IsOcean'> <input id='cbIsOcean" + item.ID + "' type='checkbox' disabled='disabled' val='" + (item.IsOcean == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='hide'><a href='#NoAccessDepartmentsModal' data-toggle='modal' onclick='NoAccessDepartments_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblNoAccessDepartments", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblNoAccessDepartments>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function NoAccessDepartments_EditByDblClick(pID) {
    jQuery("#NoAccessDepartmentsModal").modal("show");
    NoAccessDepartments_FillControls(pID);
}
// Loading with data
function NoAccessDepartments_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/NoAccessDepartments/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { NoAccessDepartments_BindTableRows(pTabelRows); });
    HighlightText("#tblNoAccessDepartments>tbody>tr", $("#txt-Search").val().trim());
    //if (callbackForDeleteFail != null)
    //    callbackForDeleteFail();
}
function NoAccessDepartments_Save(pSaveandAddNew) {
    debugger;
    if (ValidateForm("form", "NoAccessDepartmentsModal")) {
        FadePageCover(true);
        var pParametersWithValues = {
            pID: $("#hID").val() == "" ? 0 : $("#hID").val()
            , pCode: $("#txtCode").val().trim() == "" ? "0" : $("#txtCode").val().trim().toUpperCase()
            , pName: $("#txtName").val().trim() == "" ? "0" : $("#txtName").val().trim().toUpperCase()
            , pNotes: $("#txtNotes").val().trim() == "" ? "0" : $("#txtNotes").val().trim().toUpperCase()
            , pEmail: $("#txtEmail").val().trim() == "" ? "0" : $("#txtEmail").val().trim().toUpperCase()
            , pEmail_Password: IsNull($("#txtEmail_Password").val(), "")
            , pEmail_DisplayName: IsNull($("#txtEmail_DisplayName").val(), "")
            , pEmail_Host: IsNull($("#txtEmail_Host").val(), "")
            , pEmail_Port: IsNull($("#txtEmail_Port").val(), "0")
            , pEmail_IsSS: ($("#cbEmail_IsSSL").prop('checked') == true ? "1" : "0")
            , pEmail_Header: ""
            , pEmail_Footer: ""
        };
        CallPOSTFunctionWithParameters("/api/NoAccessDepartments/Save", pParametersWithValues
            , function (pData) {
                var _MessageReturned = pData[0];
                if (_MessageReturned == "") {
                    NoAccessDepartments_LoadingWithPaging();
                    swal("success", "Saved successfully.");
                    if (pSaveandAddNew)
                        NoAccessDepartments_ClearAllControls();
                    else
                        jQuery("#NoAccessDepartmentsModal").modal("hide");
                }
                else {
                    swal("Sorry", _MessageReturned);
                    FadePageCover(false);
                }
            }
            , null);
    }
}
function NoAccessDepartments_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblNoAccessDepartments') != "")
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
            DeleteListFunction("/api/NoAccessDepartments/Delete", { "pNoAccessDepartmentsIDs": GetAllSelectedIDsAsString('tblNoAccessDepartments') }, function () {
                NoAccessDepartments_LoadingWithPaging(
                    //this is callback in NoAccessDepartments_LoadingWithPaging
                    //function() {swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");}
                    );
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}
function NoAccessDepartments_FillControls(pID) {
    ClearAll("#NoAccessDepartmentsModal");
    
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    $("#lblShown").html(": " + $(tr).find("td.Name").text());
    $("#lblShownDeparmentCharge").html(" : " + $(tr).find("td.Name").text());

    $("#txtCode").val($(tr).find("td.Code").text());
    $("#txtName").val($(tr).find("td.Name").text());
    $("#txtNotes").val($(tr).find("td.Notes").text());

    $("#txtEmail").val($(tr).find("td.Email").text());
    $("#txtEmail_Password").val(""/*IsNull($(tr).find("td.Email_Password").find("input[type='password']").attr("value"), "")*/);
    $("#txtEmail_DisplayName").val(IsNull($(tr).find("td.Email_DisplayName").text(), ""));
    $("#txtEmail_Host").val(IsNull($(tr).find("td.Email_Host").text(), ""));
    $("#txtEmail_Port").val($(tr).find("td.Email_Port").text());
    $("#cbEmail_IsSSL").prop('checked', $(tr).find('td.Email_IsSSL').find('input').attr('val'));

    //$("#cbIsOcean").prop("checked", $("#cbIsOcean" + pID).prop("checked"));
    $("#btnSave").attr("onclick", "NoAccessDepartments_Save(false);");
    $("#btnSaveandNew").attr("onclick", "NoAccessDepartments_Save(true);");
}
function NoAccessDepartments_ClearAllControls(callback) {
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName", "txtNotes"), null, new Array("cbIsInactive"));//an alternative fn is with abdelmawgood
    ClearAll("#NoAccessDepartmentsModal");

    $("#btnSave").attr("onclick", "NoAccessDepartments_Save(false);");
    $("#btnSaveandNew").attr("onclick", "NoAccessDepartments_Save(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
}
function SendTestEmail() {
    FadePageCover(true)
    $.ajax({
        type: "POST",
        url: "/api/Defaults/SendTestEmail",
        data: JSON.stringify({
            "pEmail": $("#txtEmail").val().trim()
            , "pEmail_Password": IsNull($("#txtEmail_Password").val(), "")
            , "pEmail_DisplayName": IsNull($("#txtEmail_DisplayName").val(), "")
            , "pEmail_Host": IsNull($("#txtEmail_Host").val(), "")
            , "pEmail_Port": IsNull($("#txtEmail_Port").val(), "0")
            , "pEmail_IsSSL": $("#cbEmail_IsSSL").prop('checked')
            , "pEmail_Header": ""
            , "pEmail_Footer": ""
            , "pEmail_To": $("#txtEmail_To").val().trim()
            , "pEmail_Subject": $("#txtEmail_Subject").val().trim()
            , "pEmail_Body": $("#txtEmail_Body").val().trim()
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
            FadePageCover(false);
        }
    });
}

/***********************Department Charges***********************/
function DepartmentCharge_SetAllCharges(pTrueOrFalse) {
    debugger;
    $('input[name="cbAddedItemID"]').prop("checked", pTrueOrFalse);
}
function DepartmentCharge_BindCharges() {
    debugger;
    if ($("#hID").val() == "")
        swal("Sorry", "Please, save the department first.");
    else {
        //$("#divCheckboxesList").html("");
        $('input[name="cbAddedItemID"]').prop("checked", false);
        $("#btnCheckboxesListApply").attr("onclick", "DepartmentCharge_SaveList();");
        jQuery("#CheckboxesListModal").modal("show");
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/NoAccessDepartments/DepartmentCharge_LoadDepartmentCharges"
            , { pWhereClauseDepartmentCharge: "WHERE DepartmentID=" + $("#hID").val() }
            , function (pData) {
                var pDepartmentCharge = JSON.parse(pData[0]);
                CheckIncludedItemsInDivFromArray("divCheckboxesList", "cbAddedItemID", pDepartmentCharge, "ChargeTypeID", null);
                FadePageCover(false);
            }
            , null);
    }
}
function DepartmentCharge_SaveList() {
    debugger;
    var pSelectedChargeTypeIDs = GetAllSelectedIDsAsStringWithNameAttr("cbAddedItemID");
    if (pSelectedChargeTypeIDs == "")
        pSelectedChargeTypeIDs = "0";
    var pParametersWithValues = {
        pDepartmentID: $("#hID").val()
        , pSelectedChargeTypeIDs: pSelectedChargeTypeIDs
    };
    FadePageCover(true);
    CallPOSTFunctionWithParameters("/api/NoAccessDepartments/DepartmentCharge_Save", pParametersWithValues
        , function (pData) {
            var _MessageReturned = pData[0];
            if (_MessageReturned == "") {
                swal("Success", "Saved successfully.");
                jQuery("#CheckboxesListModal").modal("hide");
            }
            else
                swal("Sorry", _MessageReturned);
            FadePageCover(false);
        }
        , null);
}