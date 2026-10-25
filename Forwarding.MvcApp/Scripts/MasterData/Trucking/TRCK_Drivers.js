// TRCK_Drivers Region ---------------------------------------------------------------
// Bind TRCK_Drivers Table Rows

function TRCK_Drivers_BindTableRows(pTRCK_Drivers) {
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblTRCK_Drivers");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pTRCK_Drivers, function (i, item) {
        AppendRowtoTable("tblTRCK_Drivers",
            ("<tr ID='" + item.ID + "' ondblclick='TRCK_Drivers_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code'>" + item.Code + "</td>"
                    + "<td class='Name'>" + item.Name + "</td>"
                    + "<td class='LocalName'>" + item.LocalName + "</td>"
                    + "<td class='IsDriver hide'>" + item.IsDriver + "</td>"
                    + "<td class='Phone hide'>" + item.Phone + "</td>"
                    + "<td class='Mobile hide'>" + item.Mobile + "</td>"
                    + "<td class='NationalIDNumber hide'>" + item.NationalIDNumber + "</td>"
                    + "<td class='NationalIDExpireDate hide'>" + GetDateFromServer(item.NationalIDExpireDate) + "</td>"
                    + "<td class='LicenseNumber hide'>" + item.LicenseNumber + "</td>"
                    + "<td class='LicenseNumberExpireDate hide'>" + GetDateFromServer(item.LicenseNumberExpireDate) + "</td>"
                    + "<td class='ServiceStartDate hide'>" + GetDateFromServer(item.ServiceStartDate) + "</td>"
                    + "<td class='ServiceEndDate hide'>" + GetDateFromServer(item.ServiceEndDate) + "</td>"
                    + "<td class='BirthDate hide'>" + GetDateFromServer(item.BirthDate) + "</td>"
                    + "<td class='Address hide'>" + item.Address + "</td>"
                    + "<td class='SupervisorName hide'>" + (item.SupervisorName == 0 ? "" : item.SupervisorName) + "</td>"
                    + "<td class='Notes hide'>" + item.Notes + "</td>"
                    + "<td class='Finance365Ref hide'>" + (item.Finance365Ref == 0 ? "" : item.Finance365Ref) + "</td>"


                    + "<td class='IsInactive hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsInactive == true ? "true' checked='checked'" : "'") + " /></td>"
                   

                    + "<td class='AccountID hide'>" + item.AccountID + "</td>"
                    + "<td class='AccountName hide'>" + (item.AccountName == 0 ? "" : item.AccountName) + "</td>"
                    + "<td class='SubAccountID hide'>" + item.SubAccountID + "</td>"
                    + "<td class='SubAccountName hide'>" + (item.SubAccountName == 0 ? "" : item.SubAccountName) + "</td>"
                    + "<td class='CostCenterID hide'>" + item.CostCenterID + "</td>"
                    + "<td class='CostCenterName hide'>" + (item.CostCenterName == 0 ? "" : item.CostCenterName) + "</td>"
                    + "<td class='SubAccountGroupID hide'>" + item.SubAccountGroupID + "</td>"
                    + "<td class='hide'><a href='#TRCK_DriverModal' data-toggle='modal' onclick='TRCK_Drivers_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblTRCK_Drivers", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblTRCK_Drivers>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function TRCK_DriverAssistant_BindTableRows(pTRCK_Drivers) {
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblTRCK_Drivers");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pTRCK_Drivers, function (i, item) {
        AppendRowtoTable("tblTRCK_Drivers",
            ("<tr ID='" + item.ID + "' ondblclick='TRCK_Drivers_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code'>" + item.Code + "</td>"
                    + "<td class='Name'>" + item.Name + "</td>"
                    + "<td class='LocalName'>" + item.LocalName + "</td>"
                    + "<td class='IsDriver hide'>" + item.IsDriver + "</td>"
                    + "<td class='Phone hide'>" + item.Phone + "</td>"
                    + "<td class='Mobile hide'>" + item.Mobile + "</td>"
                    + "<td class='NationalIDNumber hide'>" + item.NationalIDNumber + "</td>"
                    + "<td class='NationalIDExpireDate hide'>" + GetDateFromServer(item.NationalIDExpireDate) + "</td>"
                    + "<td class='LicenseNumber hide'>" + item.LicenseNumber + "</td>"
                    + "<td class='LicenseNumberExpireDate hide'>" + GetDateFromServer(item.LicenseNumberExpireDate) + "</td>"
                    + "<td class='ServiceStartDate hide'>" + GetDateFromServer(item.ServiceStartDate) + "</td>"
                    + "<td class='ServiceEndDate hide'>" + GetDateFromServer(item.ServiceEndDate) + "</td>"
                    + "<td class='BirthDate hide'>" + GetDateFromServer(item.BirthDate) + "</td>"
                    + "<td class='Address hide'>" + item.Address + "</td>"
                    + "<td class='SupervisorName hide'>" + (item.SupervisorName == 0 ? "" : item.SupervisorName) + "</td>"
                    + "<td class='Notes hide'>" + item.Notes + "</td>"


                    + "<td class='IsInactive hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsInactive == true ? "true' checked='checked'" : "'") + " /></td>"


                    + "<td class='AccountID hide'>" + item.AccountID + "</td>"
                    + "<td class='AccountName hide'>" + (item.AccountName == 0 ? "" : item.AccountName) + "</td>"
                    + "<td class='SubAccountID hide'>" + item.SubAccountID + "</td>"
                    + "<td class='SubAccountName hide'>" + (item.SubAccountName == 0 ? "" : item.SubAccountName) + "</td>"
                    + "<td class='CostCenterID hide'>" + item.CostCenterID + "</td>"
                    + "<td class='CostCenterName hide'>" + (item.CostCenterName == 0 ? "" : item.CostCenterName) + "</td>"
                    + "<td class='SubAccountGroupID hide'>" + item.SubAccountGroupID + "</td>"
                    + "<td class='hide'><a href='#TRCK_DriverModal' data-toggle='modal' onclick='TRCK_Drivers_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblTRCK_Drivers", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblTRCK_Drivers>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function TRCK_Drivers_EditByDblClick(pID) {
    jQuery("#TRCK_DriverModal").modal("show");
    TRCK_Drivers_FillControls(pID);
}
// Loading with data
function TRCK_Drivers_LoadingWithPaging() {
    debugger;
    var whereClause = " Where IsDriver=" + TRCK_WorkingOnDrivers;
    whereClause += " And (Code LIKE N'%" + $("#txt-Search").val().trim() + "%' "
                + " OR Name LIKE N'%" + $("#txt-Search").val().trim() + "%' "
                + " OR LocalName LIKE N'%" + $("#txt-Search").val().trim() + "%') ";

    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/TRCK_Drivers/LoadWithPaging", whereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { TRCK_Drivers_BindTableRows(pTabelRows); TRCK_Drivers_ClearAllControls(); });
    console.log(" Where IsDriver=" + TRCK_WorkingOnDrivers)
    //LoadWithPaging             ("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/TRCK_Drivers/LoadWithPaging",                                           , $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { TRCK_Drivers_BindTableRows(pTabelRows); TRCK_Drivers_ClearAllControls(); });
    HighlightText("#tblTRCK_Drivers>tbody>tr", $("#txt-Search").val().trim());
    //if (callbackForDeleteFail != null)
    //    callbackForDeleteFail();
}

// calling web function to add new TRCK_Driver item.
function TRCK_Drivers_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/TRCK_Drivers/Insert"
        , {
            pCode: ($("#txtCode").val().trim() == "" ? 0 : $("#txtCode").val().trim().toUpperCase())
            , pName: $("#txtName").val().trim()
            , pLocalName: $("#txtLocalName").val().trim()
            , pIsDriver: TRCK_WorkingOnDrivers
            , pPhone: ($("#txtPhone").val() == null ? "" : $("#txtPhone").val().trim())
            , pMobile: ($("#txtMobile").val() == null ? "" : $("#txtMobile").val().trim())
            , pNationalIDNumber: ($("#txtNationalIDNumber").val() == null ? "" : $("#txtNationalIDNumber").val().trim())
            , pNationalIDExpireDate: ($("#txtNationalIDExpireDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtNationalIDExpireDate").val()))
            , pLicenseNumber: ($("#txtLicenseNumber").val() == null ? "" : $("#txtLicenseNumber").val().trim())
            , pLicenseNumberExpireDate: ($("#txtLicenseNumberExpireDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtLicenseNumberExpireDate").val()))
            , pServiceStartDate: ($("#txtServiceStartDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtServiceStartDate").val()))
            , pServiceEndDate: ($("#txtServiceEndDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtServiceEndDate").val()))
            
            , pAddress: ($("#txtAddress").val() == null ? "" : $("#txtAddress").val().trim())
            , pNotes: ($("#txtNotes").val() == null ? "" : $("#txtNotes").val().trim())
            , pFinance365Ref: ($("#txtFinance365Ref").val() == null || $("#txtFinance365Ref").val() == "" ? "0" : $("#txtFinance365Ref").val().trim())
            , pIsInactive: $("#cbIsInactive").prop('checked')
            
            
            , pAccountID: $("#slAccount").val()
            , pSubAccountID: $("#slSubAccount").val()
            , pCostCenterID: $("#slCostCenter").val()
            , pSubAccountGroupID: $("#slSubAccountGroup").val()

            , pBirthDate: ($("#txtBirthDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtBirthDate").val()))
            , pSupervisorName: ($("#txtSupervisorName").val().trim() == "" ? "0" : $("#txtSupervisorName").val().trim().toUpperCase())
        }, pSaveandAddNew, "TRCK_DriverModal", function () { TRCK_Drivers_LoadingWithPaging(); });
}

//calling this function for update
function TRCK_Drivers_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/TRCK_Drivers/Update"
        , {
            pID: $("#hTRCK_DriverID").val()
            , pCode: ($("#txtCode").val().trim() == "" ? 0 : $("#txtCode").val().trim().toUpperCase())
            , pName: $("#txtName").val().trim()
            , pLocalName: $("#txtLocalName").val().trim()
            , pIsDriver: TRCK_WorkingOnDrivers
            , pPhone: ($("#txtPhone").val() == null ? "" : $("#txtPhone").val().trim())
            , pMobile: ($("#txtMobile").val() == null ? "" : $("#txtMobile").val().trim())
            , pNationalIDNumber: ($("#txtNationalIDNumber").val() == null ? "" : $("#txtNationalIDNumber").val().trim())
            , pNationalIDExpireDate: ($("#txtNationalIDExpireDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtNationalIDExpireDate").val()))
            , pLicenseNumber: ($("#txtLicenseNumber").val() == null ? "" : $("#txtLicenseNumber").val().trim())
            , pLicenseNumberExpireDate: ($("#txtLicenseNumberExpireDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtLicenseNumberExpireDate").val()))
            , pServiceStartDate: ($("#txtServiceStartDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtServiceStartDate").val()))
            , pServiceEndDate: ($("#txtServiceEndDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtServiceEndDate").val()))
            
            , pAddress: ($("#txtAddress").val() == null ? "" : $("#txtAddress").val().trim())
            , pNotes: ($("#txtNotes").val() == null ? "" : $("#txtNotes").val().trim())
            , pFinance365Ref: ($("#txtFinance365Ref").val() == null || $("#txtFinance365Ref").val() == "" ? "0" : $("#txtFinance365Ref").val().trim())
            , pIsInactive: $("#cbIsInactive").prop('checked')
            , pAccountID: $("#slAccount").val()
            , pSubAccountID: $("#slSubAccount").val()
            , pCostCenterID: $("#slCostCenter").val()
            , pSubAccountGroupID: $("#slSubAccountGroup").val()
            , pBirthDate: ($("#txtBirthDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtBirthDate").val()))
            , pSupervisorName: ($("#txtSupervisorName").val().trim() == "" ? "0" : $("#txtSupervisorName").val().trim().toUpperCase())
        }, pSaveandAddNew, "TRCK_DriverModal", function () { TRCK_Drivers_LoadingWithPaging(); });
}

//sherif: calling this fn is to set the timelocked to null in the DB to unlock the edited field in case of pressing close
function TRCK_Drivers_UnlockRecord() {
    debugger;
    UnlockFunction("/api/TRCK_Drivers/UnlockRecord",
        { pID: $("#hTRCK_DriverID").val() },
        "TRCK_DriverModal",
        function () { TRCK_Drivers_LoadingWithPaging(); }); //the callback function
}
//function TRCK_Drivers_Delete(pID) {
//    DeleteListFunction("/api/TRCK_Drivers/DeleteByID", { "pID": pID }, function () { TRCK_Drivers_LoadingWithPaging(); });
//}

function TRCK_Drivers_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblTRCK_Drivers') != "")
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
            DeleteListFunction("/api/TRCK_Drivers/Delete", { "pTRCK_DriversIDs": GetAllSelectedIDsAsString('tblTRCK_Drivers') }, function () {
                TRCK_Drivers_LoadingWithPaging(
                    //this is callback in TRCK_Drivers_LoadingWithPaging
                    //function() {swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");}
                    );
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}

//after pressing edit, this function fills the data
function TRCK_Drivers_FillControls(pID) {
    //TRCK_Drivers_ClearAllControls(function () {
    //next line is to check if row is locked by another user
    //Check("/api/TRCK_Drivers/CheckRow", { 'pID': pID }, function () {
        // Fill All Modal Controls
        var tr = $("tr[ID='" + pID + "']");
    debugger;
    if (IsMESCOCompany) {
        $("#txtFinance365Ref").parent().removeClass("hide");
    }
        $("#hTRCK_DriverID").val(pID);

        $("#slSubAccountGroup").val($(tr).find("td.SubAccountGroupID").text());
        FillSlAccountFromGroup('slAccount', 'slSubAccountGroup', 'slSubAccount', $(tr).find("td.SubAccountGroupID").text(), $(tr).find("td.AccountID").text());
        //$("#slAccount").val($(tr).find("td.AccountID").text());


       FillSlSubAccount('slSubAccount', 'slAccount', $(tr).find("td.SubAccountID").text(), $(tr).find("td.AccountID").text());
        var pSubAccountID = $(tr).find("td.SubAccountID").text();
    //$("#slSubAccount").html('<option value=' + pSubAccountID + '>' + (pSubAccountID == 0 ? 'AUTO GENERATED' : $(tr).find("td.SubAccountName").text()) + '</option>');

        $("#slCostCenter").val($(tr).find("td.CostCenterID").text());

        if ($(tr).find("td.SubAccountID").text() == 0)
        {
            $("#slAccount").removeAttr("disabled");
            $("#slSubAccountGroup").removeAttr("disabled");
        }
        else
        {
            $("#slAccount").attr("disabled", "disabled");
            $("#slSubAccountGroup").attr("disabled", "disabled");
        }
        if ($(tr).find("td.OperationCount").text() == 0 && $(tr).find("td.SubAccountID").text() == 0)
        {
            $("#txtName").removeAttr("disabled");
            $("#txtLocalName").removeAttr("disabled");
        }
        else
        {
            $("#txtName").attr("disabled", "disabled");
            $("#txtLocalName").attr("disabled", "disabled");
        }

        debugger;

        $("#lblShown").html(": " + $(tr).find("td.Name").text());
        $("#txtCode").val($(tr).find("td.Code").text());
        $("#txtName").val($(tr).find("td.Name").text());
        $("#txtLocalName").val($(tr).find("td.LocalName").text());
        $("#txtPhone").val($(tr).find("td.Phone").text());
        $("#txtMobile").val($(tr).find("td.Mobile").text());
        $("#txtNationalIDNumber").val($(tr).find("td.NationalIDNumber").text());
        $("#txtNationalIDExpireDate").val($(tr).find("td.NationalIDExpireDate").text());
        $("#txtLicenseNumber").val($(tr).find("td.LicenseNumber").text());
        $("#txtLicenseNumberExpireDate").val($(tr).find("td.LicenseNumberExpireDate").text());
        $("#txtServiceStartDate").val($(tr).find("td.ServiceStartDate").text());
        $("#txtServiceEndDate").val($(tr).find("td.ServiceEndDate").text());
        $("#txtBirthDate").val($(tr).find("td.BirthDate").text());
        $("#txtAddress").val($(tr).find("td.Address").text());
        $("#txtSupervisorName").val($(tr).find("td.SupervisorName").text());
        $("#txtNotes").val($(tr).find("td.Notes").text());
        $("#txtFinance365Ref").val($(tr).find("td.Finance365Ref").text());

        $("#cbIsInactive").prop('checked', $(tr).find('td.IsInactive').find('input').attr('val'));        

        $("#btnSave").attr("onclick", "TRCK_Drivers_Update(false);");
        $("#btnSaveandNew").attr("onclick", "TRCK_Drivers_Update(true);");
        //to set the wizard to BasicData
        $("#stepsBasicData").parent().children().removeClass("active");
        $("#stepsBasicData").addClass("active");
        $("#BasicData").parent().children().removeClass("active");
        $("#BasicData").addClass("active");
        
}

function TRCK_Drivers_ClearAllControls(callback) {
    debugger;
    ClearAll("#TRCK_DriverModal", null);
    if (IsMESCOCompany) {
        $("#txtFinance365Ref").parent().removeClass("hide");
    }
    $("#slAccount").removeAttr("disabled");
    $("#slSubAccountGroup").removeAttr("disabled");

    $("#slAccount").html('<option value=0>' + TranslateString("SelectFromMenu") + '</option>');

    $("#slSubAccount").html('<option value=0>' + 'AUTO GENERATED' + '</option>');
    $("#txtName").removeAttr("disabled");
    $("#txtLocalName").removeAttr("disabled");

    debugger;

    $("#btnSave").attr("onclick", "TRCK_Drivers_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "TRCK_Drivers_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
    //to set the wizard to BasicData
    $("#stepsBasicData").parent().children().removeClass("active");
    $("#stepsBasicData").addClass("active");
    $("#BasicData").parent().children().removeClass("active");
    $("#BasicData").addClass("active");

}
function ExportExpiredLicense() {
    debugger;
    FadePageCover(true);
    var pParametersWithValues = {
        pPageNumber: 1
        , pPageSize: 999999
        , pWhereClause: "WHERE DATEDIFF(DAY, GETDATE(),LicenseNumberExpireDate) <= 30 OR LicenseNumberExpireDate IS NULL"
        , pOrderBy: "ID"
    };
    CallGETFunctionWithParameters("/api/TRCK_Drivers/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned"
        , pParametersWithValues
        , function (pData) {
            var _ExportedRows = JSON.parse(pData[0]);
            //ExportToExcel(pArray, pHeader, pFileName, pExcludedColumns);
            ExportToExcel(_ExportedRows, "Name,Expiration Date,Days", "Expiration", null);
            FadePageCover(false);
        }
        , null);
}
