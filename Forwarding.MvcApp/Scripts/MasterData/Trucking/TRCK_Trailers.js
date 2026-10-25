// TRCK_Trailers Region ---------------------------------------------------------------
// Bind TRCK_Trailers Table Rows

function TRCK_Trailers_Initialize() {
    debugger;

    strLoadWithPagingFunctionName = "/api/TRCK_Trailers/LoadWithPagingWithWhereClause";

    LoadView("/MasterData/TRCK_Trailers", "div-content", function () {
        debugger;

        if (IsAccountingActive) $(".classAccountingOption").removeClass("hide");
        else $(".classAccountingOption").addClass("hide");
        CallGETFunctionWithParameters("/api/ChartOfAccounts/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned"
            , { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: 1, pPageSize: 99999, pWhereClause: "WHERE 1=0", pOrderBy: "Name,Code" }
            , function (pData) {
                var pClientGroup = pData[3];
                var pASSETSGroup = pData[10];
                FillListFromObject_ERP(null, OptionNameCodeAccount == "true" ? 4 : 3/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slAccount", pData[0], null);
                FillListFromObject_ERP(null, 4/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slCostCenter", pData[2], null);
                FillListFromObject_ERP(null, OptionNameCodeAccount == "true" ? 4 : 3/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slSubAccountGroup", pASSETSGroup, null);
                $("#slSubAccount").html('<option value=0>' + 'AUTO GENERATED' + '</option>');

            }
           , null);

            GetListWithName(null, "/api/TRCK_EquipmentModel/LoadAll", "<--Select-->", "slEquipmentModel");
            GetListWithName(null, "/api/Countries/LoadAll", "<--Select-->", "slOriginCountry");
            GetListWithNameAndWhereClause(null, "/api/Suppliers/LoadAll", "<--Select-->", "slInsuranceCompany", " WHERE IsInactive = 0 ORDER BY Name ", function () { $("#slServiceCenter").html($("#slInsuranceCompany").html()); });

            debugger;//sherif:loadwithpaging fn is callback in $.getscript
            LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, 0, 10, function (pTabelRows) { TRCK_Trailers_BindTableRows(pTabelRows); TRCK_Trailers_ClearAllControls(); });
    },
        function () { TRCK_Trailers_ClearAllControls(); },
        function () { TRCK_Trailers_DeleteList(); });

}
function TRCK_Trailers_BindTableRows(pTRCK_Trailers) {
    debugger;
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblTRCK_Trailers");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pTRCK_Trailers, function (i, item) {
        AppendRowtoTable("tblTRCK_Trailers",
            ("<tr ID='" + item.ID + "' ondblclick='TRCK_Trailers_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td val='" + item.Code + "' class='Code'>" + item.Code + "</td>"
                    + "<td val='" + item.Name + "' class='Name'>" + item.Name + "</td>"
                    + "<td val='" + item.LocalName + "' class='LocalName hide'>" + item.LocalName + "</td>"
                    + "<td val='" + item.OriginCountryID + "' class='OriginCountryID hide'>" + item.OriginCountryID + "</td>"
                    + "<td val='" + item.ManufacturDate + "' class='ManufacturDate hide'>" + GetDateFromServer(item.ManufacturDate) + "</td>"
                    + "<td val='" + item.PlateNo + "' class='PlateNo hide'>" + item.PlateNo + "</td>"
                    + "<td val='" + item.ChassisNo + "' class='ChassisNo hide'>" + item.ChassisNo + "</td>"
                    + "<td val='" + item.LicenseNumber + "' class='LicenseNumber hide'>" + item.LicenseNumber + "</td>"
                    + "<td val='" + item.LicenseNumberExpireDate + "' class='LicenseNumberExpireDate hide'>" + GetDateFromServer(item.LicenseNumberExpireDate) + "</td>"
                    + "<td val='" + item.Color + "' class='Color hide'>" + item.Color + "</td>"
                    + "<td val='" + item.Length + "' class='Length hide'>" + item.Length + "</td>"
                    + "<td val='" + item.Width + "' class='Width hide'>" + item.Width + "</td>"
                    + "<td val='" + item.Height + "' class='Height hide'>" + item.Height + "</td>"
                    + "<td val='" + item.GrossWeight + "' class='GrossWeight hide'>" + item.GrossWeight + "</td>"
                    + "<td val='" + item.AllowedWeight + "' class='AllowedWeight hide'>" + item.AllowedWeight + "</td>"
                    + "<td val='" + item.NoOfPrimaryWheels + "' class='NoOfPrimaryWheels hide'>" + item.NoOfPrimaryWheels + "</td>"
                    + "<td val='" + item.NoOfAdditionalWheels + "' class='NoOfAdditionalWheels hide'>" + item.NoOfAdditionalWheels + "</td>"
                    + "<td val='" + item.AxeCount + "' class='AxeCount hide'>" + item.AxeCount + "</td>"
                    + "<td val='" + item.ExaminationExpireDate + "' class='ExaminationExpireDate hide'>" + GetDateFromServer(item.ExaminationExpireDate) + "</td>"
                    + "<td val='" + item.InsuranceDate + "' class='InsuranceDate hide'>" + GetDateFromServer(item.InsuranceDate) + "</td>"
                    + "<td val='" + item.WorkingDate + "' class='WorkingDate hide'>" + GetDateFromServer(item.WorkingDate) + "</td>"
                    + "<td val='" + item.InsuranceBill + "'  class='InsuranceBill hide'>" + item.InsuranceBill + "</td>"
                    + "<td val='" + item.InsuranceCompanyID + "' class='InsuranceCompanyID hide'>" + item.InsuranceCompanyID + "</td>"
                    + "<td val='" + item.TaxEndDate + "' class='TaxEndDate hide'>" + GetDateFromServer(item.TaxEndDate) + "</td>"
                    + "<td val='" + item.EquipmentModelID + "' class='EquipmentModelID hide'>" + item.EquipmentModelID + "</td>"
                    + "<td val='" + item.ServiceCenterID + "' class='ServiceCenterID hide'>" + item.ServiceCenterID + "</td>"

                    + "<td val='" + item.InsuranceValue + "' class='InsuranceValue hide'>" + (item.InsuranceValue == 0 ? "" : item.InsuranceValue) + "</td>"
                    + "<td val='" + item.Notes + "' class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"

                    + "<td class='IsInactive hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsInactive == true ? "true' checked='checked'" : "'") + " /></td>"

                    + "<td class='AccountID hide'>" + item.AccountID + "</td>"
                    + "<td class='AccountName hide'>" + (item.AccountName == 0 ? "" : item.AccountName) + "</td>"
                    + "<td class='SubAccountID hide'>" + item.SubAccountID + "</td>"
                    + "<td class='SubAccountName hide'>" + (item.SubAccountName == 0 ? "" : item.SubAccountName) + "</td>"
                    + "<td class='CostCenterID hide'>" + item.CostCenterID + "</td>"
                    + "<td class='CostCenterName hide'>" + (item.CostCenterName == 0 ? "" : item.CostCenterName) + "</td>"
                    + "<td class='SubAccountGroupID hide'>" + item.SubAccountGroupID + "</td>"
                    + "<td val='" + item.NumberOfChambers + "' class='NumberOfChambers hide'>" + item.NumberOfChambers + "</td>"
                    + "<td val='" + item.ChambersVolumeInLiters + "' class='ChambersVolumeInLiters hide'>" + item.ChambersVolumeInLiters + "</td>"
                    + "<td val='" + item.TankerEmptyWeight + "' class='TankerEmptyWeight hide'>" + item.TankerEmptyWeight + "</td>"
                    + "<td val='" + item.OutletID + "' class='OutletID hide'>" + item.OutletID + "</td>"
                    + "<td val='" + item.IsHeating + "' class='IsHeating hide'>" + item.IsHeating + "</td>"
                    + "<td val='" + item.IsHeatable + "' class='IsHeatable hide'>" + item.IsHeatable + "</td>"
                    + "<td val='" + item.IsEpump + "' class='IsEpump hide'>" + item.IsEpump + "</td>"
                    + "<td val='" + item.IsCompressor + "' class='IsCompressor hide'>" + item.IsCompressor + "</td>"
                    + "<td val='" + item.IsGroundOperated + "' class='IsGroundOperated hide'>" + item.IsGroundOperated + "</td>"
                    + "<td val='" + item.IsATP + "' class='IsATP hide'>" + item.IsATP + "</td>"

                    + "<td val='" + item.Model + "' class='Model hide'>" + (item.Model == 0 ? "" : item.Model) + "</td>"
                    + "<td val='" + item.WheelSize + "' class='WheelSize hide'>" + (item.WheelSize == 0 ? "" : item.WheelSize) + "</td>"

                    + "<td class='hide'><a href='#TRCK_TrailerModal' data-toggle='modal' onclick='TRCK_Trailers_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblTRCK_Trailers", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblTRCK_Trailers>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function TRCK_Trailers_EditByDblClick(pID) {
    jQuery("#TRCK_TrailerModal").modal("show");
    TRCK_Trailers_FillControls(pID);
    TRCK_TrailerLicenses_LoadingWithPagingForModal(pID);
}
// Loading with data
function TRCK_Trailers_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/TRCK_Trailers/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { TRCK_Trailers_BindTableRows(pTabelRows); TRCK_Trailers_ClearAllControls(); });
    
    HighlightText("#tblTRCK_Trailers>tbody>tr", $("#txt-Search").val().trim());
    //if (callbackForDeleteFail != null)
    //    callbackForDeleteFail();
}

// calling web function to add new TRCK_Trailer item.
function TRCK_Trailers_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/TRCK_Trailers/Insert"
        , {
            pCode: 0 /*generated automatically*/
            , pName: $("#txtName").val().trim()
            , pLocalName: $("#txtLocalName").val().trim()
            , pOriginCountryID: $("#slOriginCountry").val() == "" ? 0 : $("#slOriginCountry").val()
            , pManufacturDate: ($("#txtManufacturDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtManufacturDate").val()))
            , pPlateNo: ($("#txtPlateNo").val() == null ? "" : $("#txtPlateNo").val().trim())
            , pChassisNo: ($("#txtChassisNo").val() == null ? "" : $("#txtChassisNo").val().trim())
            , pLicenseNumber: ($("#txtLicenseNumber").val() == null ? "" : $("#txtLicenseNumber").val().trim())
            , pLicenseNumberExpireDate: ($("#txtLicenseNumberExpireDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtLicenseNumberExpireDate").val()))
            , pColor: ($("#txtColor").val() == null ? "" : $("#txtColor").val().trim())
            , pLength: ($("#txtLength").val() == null ? "" : $("#txtLength").val().trim())
            , pWidth: ($("#txtWidth").val() == null ? "" : $("#txtWidth").val().trim())
            , pHeight: ($("#txtHeight").val() == null ? "" : $("#txtHeight").val().trim())
            , pGrossWeight: ($("#txtGrossWeight").val() == null ? "" : $("#txtGrossWeight").val().trim())
            , pAllowedWeight: ($("#txtAllowedWeight").val() == null ? "" : $("#txtAllowedWeight").val().trim())
            , pNoOfPrimaryWheels: ($("#txtNoOfPrimaryWheels").val() == null ? "" : $("#txtNoOfPrimaryWheels").val().trim())
            , pNoOfAdditionalWheels: ($("#txtNoOfAdditionalWheels").val() == null ? "" : $("#txtNoOfAdditionalWheels").val().trim())
            , pAxeCount: ($("#txtAxeCount").val() == null ? "" : $("#txtAxeCount").val().trim())
            , pExaminationExpireDate: ($("#txtExaminationExpireDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtExaminationExpireDate").val()))
            , pInsuranceDate: ($("#txtInsuranceDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtInsuranceDate").val()))
            , pWorkingDate: ($("#txtWorkingDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtWorkingDate").val()))
            , pInsuranceBill: ($("#txtInsuranceBill").val() == null ? "" : $("#txtInsuranceBill").val().trim())
            , pInsuranceCompanyID: $("#slInsuranceCompany").val() == "" ? 0 : $("#slInsuranceCompany").val()
            , pTaxEndDate: ($("#txtTaxEndDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTaxEndDate").val()))
            , pEquipmentModelID: $("#slEquipmentModel").val() == "" ? 0 : $("#slEquipmentModel").val()
            , pServiceCenterID: $("#slServiceCenter").val() == "" ? 0 : $("#slServiceCenter").val()

            , pInsuranceValue: ($("#txtInsuranceValue").val() == null ? "" : $("#txtInsuranceValue").val().trim())
            , pNotes: ($("#txtNotes").val() == null ? "" : $("#txtNotes").val().trim())
            , pIsInactive: $("#cbIsInactive").prop('checked')
             
            , pAccountID: $("#slAccount").val()
            , pSubAccountID: $("#slSubAccount").val()
            , pCostCenterID: $("#slCostCenter").val()
            , pSubAccountGroupID: $("#slSubAccountGroup").val()
             , pNumberOfChambers: ($("#txtNumberOfChambers").val() == "" ? 0 : $("#txtNumberOfChambers").val())
            , pChambersVolumeInLiters: ($("#txtChambersVolumeInLiters").val() == "" ? 0 : $("#txtChambersVolumeInLiters").val())
            , pTankerEmptyWeight: ($("#txtTankerEmptyWeight").val() == "" ? 0 : $("#txtTankerEmptyWeight").val())
            , pOutlet: $("#slOutlet").val()
            , pIsHeating: $('#cbIsHeating').prop('checked')
            , pIsHeatable: $('#cbIsHeatable').prop('checked')
            , pIsEpump: $('#cbIsEpump').prop('checked')
            , pIsCompressor: $('#cbIsCompressor').prop('checked')
            , pIsGroundOperated: $('#cbIsGroundOperated').prop('checked')
            , pIsATP: $('#cbIsATP').prop('checked')

            , pModel: ($("#txtModel").val().trim() == "" ? 0 : $("#txtModel").val().trim().toUpperCase())
            , pWheelSize: ($("#txtWheelSize").val().trim() == "" ? 0 : $("#txtWheelSize").val().trim().toUpperCase())

        }, pSaveandAddNew, "TRCK_TrailerModal", function () { TRCK_Trailers_LoadingWithPaging(); });
}

//calling this function for update
function TRCK_Trailers_Update(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/TRCK_Trailers/Update"
        , {
            pID: $("#hTRCK_TrailerID").val()
            , pCode: $("#txtCode").val().trim()
            , pName: $("#txtName").val().trim()
            , pLocalName: $("#txtLocalName").val().trim()
            , pOriginCountryID: $("#slOriginCountry").val() == "" ? 0 : $("#slOriginCountry").val()
            , pManufacturDate: ($("#txtManufacturDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtManufacturDate").val()))
            , pPlateNo: ($("#txtPlateNo").val() == null ? "" : $("#txtPlateNo").val().trim())
            , pChassisNo: ($("#txtChassisNo").val() == null ? "" : $("#txtChassisNo").val().trim())
            , pLicenseNumber: ($("#txtLicenseNumber").val() == null ? "" : $("#txtLicenseNumber").val().trim())
            , pLicenseNumberExpireDate: ($("#txtLicenseNumberExpireDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtLicenseNumberExpireDate").val()))
            , pColor: ($("#txtColor").val() == null ? "" : $("#txtColor").val().trim())
            , pLength: ($("#txtLength").val() == null ? "" : $("#txtLength").val().trim())
            , pWidth: ($("#txtWidth").val() == null ? "" : $("#txtWidth").val().trim())
            , pHeight: ($("#txtHeight").val() == null ? "" : $("#txtHeight").val().trim())
            , pGrossWeight: ($("#txtGrossWeight").val() == null ? "" : $("#txtGrossWeight").val().trim())
            , pAllowedWeight: ($("#txtAllowedWeight").val() == null ? "" : $("#txtAllowedWeight").val().trim())
            , pNoOfPrimaryWheels: ($("#txtNoOfPrimaryWheels").val() == null ? "" : $("#txtNoOfPrimaryWheels").val().trim())
            , pNoOfAdditionalWheels: ($("#txtNoOfAdditionalWheels").val() == null ? "" : $("#txtNoOfAdditionalWheels").val().trim())
            , pAxeCount: ($("#txtAxeCount").val() == null ? "" : $("#txtAxeCount").val().trim())
            , pExaminationExpireDate: ($("#txtExaminationExpireDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtExaminationExpireDate").val()))
            , pInsuranceDate: ($("#txtInsuranceDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtInsuranceDate").val()))
            , pWorkingDate: ($("#txtWorkingDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtWorkingDate").val()))
            , pInsuranceBill: ($("#txtInsuranceBill").val() == null ? "" : $("#txtInsuranceBill").val().trim())
            , pInsuranceCompanyID: $("#slInsuranceCompany").val() == "" ? 0 : $("#slInsuranceCompany").val()
            , pTaxEndDate: ($("#txtTaxEndDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTaxEndDate").val()))
            , pEquipmentModelID: $("#slEquipmentModel").val() == "" ? 0 : $("#slEquipmentModel").val()
            , pServiceCenterID: $("#slServiceCenter").val() == "" ? 0 : $("#slServiceCenter").val()

            , pInsuranceValue: ($("#txtInsuranceValue").val() == null ? "" : $("#txtInsuranceValue").val().trim())
            , pNotes: ($("#txtNotes").val() == null ? "" : $("#txtNotes").val().trim())
            , pIsInactive: $("#cbIsInactive").prop('checked')
            , pAccountID: $("#slAccount").val()
            , pSubAccountID: $("#slSubAccount").val()
            , pCostCenterID: $("#slCostCenter").val()
            , pSubAccountGroupID: $("#slSubAccountGroup").val()
            , pNumberOfChambers: ($("#txtNumberOfChambers").val() == "" ? 0 : $("#txtNumberOfChambers").val())
            , pChambersVolumeInLiters: ($("#txtChambersVolumeInLiters").val() == "" ? 0 : $("#txtChambersVolumeInLiters").val())
            , pTankerEmptyWeight: ($("#txtTankerEmptyWeight").val() == "" ? 0 : $("#txtTankerEmptyWeight").val())
            , pOutlet: $("#slOutlet").val()
            , pIsHeating: $('#cbIsHeating').prop('checked')
            , pIsHeatable: $('#cbIsHeatable').prop('checked')
            , pIsEpump: $('#cbIsEpump').prop('checked')
            , pIsCompressor: $('#cbIsCompressor').prop('checked')
            , pIsGroundOperated: $('#cbIsGroundOperated').prop('checked')
            , pIsATP: $('#cbIsATP').prop('checked')

            , pModel: ($("#txtModel").val().trim() == "" ? 0 : $("#txtModel").val().trim().toUpperCase())
            , pWheelSize: ($("#txtWheelSize").val().trim() == "" ? 0 : $("#txtWheelSize").val().trim().toUpperCase())

        }, pSaveandAddNew, "TRCK_TrailerModal", function () { TRCK_Trailers_LoadingWithPaging(); });
}

//sherif: calling this fn is to set the timelocked to null in the DB to unlock the edited field in case of pressing close
function TRCK_Trailers_UnlockRecord() {
    debugger;
    UnlockFunction("/api/TRCK_Trailers/UnlockRecord",
        { pID: $("#hTRCK_TrailerID").val() },
        "TRCK_TrailerModal",
        function () { TRCK_Trailers_LoadingWithPaging(); }); //the callback function
}
//function TRCK_Trailers_Delete(pID) {
//    DeleteListFunction("/api/TRCK_Trailers/DeleteByID", { "pID": pID }, function () { TRCK_Trailers_LoadingWithPaging(); });
//}

function TRCK_Trailers_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblTRCK_Trailers') != "")
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
            DeleteListFunction("/api/TRCK_Trailers/Delete", { "pTRCK_TrailersIDs": GetAllSelectedIDsAsString('tblTRCK_Trailers') }, function () {
                TRCK_Trailers_LoadingWithPaging(
                    //this is callback in TRCK_Trailers_LoadingWithPaging
                    //function() {swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");}
                    );
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}

//after pressing edit, this function fills the data
function TRCK_Trailers_FillControls(pID) {

        // Fill All Modal Controls
        var tr = $("tr[ID='" + pID + "']");
        debugger;
        $("#hTRCK_TrailerID").val(pID);

   
       // console.log($(tr).find("td.EquipmentModelID").attr('val'));

        $("#slEquipmentModel").val($(tr).find("td.EquipmentModelID").attr('val') == 0 ? "" : $(tr).find("td.EquipmentModelID").attr('val'));
        $("#slOriginCountry").val($(tr).find("td.OriginCountryID").attr('val') == 0 ? "" : $(tr).find("td.OriginCountryID").attr('val'));
        $("#slInsuranceCompany").val($(tr).find("td.InsuranceCompanyID").attr('val') == 0 ? "" : $(tr).find("td.InsuranceCompanyID").attr('val'));
        $("#slServiceCenter").val($(tr).find("td.ServiceCenterID").attr('val') == 0 ? "" : $(tr).find("td.ServiceCenterID").attr('val'));

        $("#slSubAccountGroup").val($(tr).find("td.SubAccountGroupID").text());
        FillSlAccountFromGroup('slAccount', 'slSubAccountGroup', 'slSubAccount', $(tr).find("td.SubAccountGroupID").text(), $(tr).find("td.AccountID").text());
        //$("#slAccount").val($(tr).find("td.AccountID").text());

        //FillSlSubAccount('slSubAccount', 'slAccount', $(tr).find("td.SubAccountID").text(), $(tr).find("td.AccountID").text());
        var pSubAccountID = $(tr).find("td.SubAccountID").text();


        if (pSubAccountID != 0)
            FillSlSubAccount('slSubAccount', 'slAccount', $(tr).find("td.SubAccountID").text(), $(tr).find("td.AccountID").text());

      //  $("#slSubAccount").html('<option value=' + pSubAccountID + '>' + (pSubAccountID == 0 ? 'AUTO GENERATED' : $(tr).find("td.SubAccountName").text()) + '</option>');

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
        $("#txtManufacturDate").val($(tr).find("td.ManufacturDate").text());
        $("#txtPlateNo").val($(tr).find("td.PlateNo").text());
        $("#txtChassisNo").val($(tr).find("td.ChassisNo").text());
        $("#txtLicenseNumber").val($(tr).find("td.LicenseNumber").text());
        $("#txtLicenseNumberExpireDate").val($(tr).find("td.LicenseNumberExpireDate").text());
        $("#txtColor").val($(tr).find("td.Color").text());
        $("#txtLength").val($(tr).find("td.Length").text());
        $("#txtWidth").val($(tr).find("td.Width").text());
        $("#txtHeight").val($(tr).find("td.Height").text());

        $("#txtGrossWeight").val($(tr).find("td.GrossWeight").text());
        $("#txtAllowedWeight").val($(tr).find("td.AllowedWeight").text());
        $("#txtNoOfPrimaryWheels").val($(tr).find("td.NoOfPrimaryWheels").text());
        $("#txtNoOfAdditionalWheels").val($(tr).find("td.NoOfAdditionalWheels").text());
        $("#txtAxeCount").val($(tr).find("td.AxeCount").text());
        $("#txtExaminationExpireDate").val($(tr).find("td.ExaminationExpireDate").text());
        $("#txtInsuranceDate").val($(tr).find("td.InsuranceDate").text());
        $("#txtWorkingDate").val($(tr).find("td.WorkingDate").text());
        $("#txtInsuranceBill").val($(tr).find("td.InsuranceBill").text());
        $("#txtTaxEndDate").val($(tr).find("td.TaxEndDate").text());
        $("#txtInsuranceValue").val($(tr).find("td.InsuranceValue").text());
        $("#txtNotes").val($(tr).find("td.Notes").text());

        $("#txtNumberOfChambers").val($(tr).find("td.NumberOfChambers").text())
        $("#txtChambersVolumeInLiters").val($(tr).find("td.ChambersVolumeInLiters").text())
        $("#txtTankerEmptyWeight").val($(tr).find("td.TankerEmptyWeight").text())
        $("#slOutlet").val($(tr).find("td.OutletID").text())
        $('#cbIsHeating').prop('checked', (($(tr).find("td.IsHeating").text()) == "true"))
        $('#cbIsHeatable').prop('checked', (($(tr).find("td.IsHeatable").text()) == "true"))
        $('#cbIsEpump').prop('checked', (($(tr).find("td.IsEpump").text()) == "true"))
        $('#cbIsCompressor').prop('checked', (($(tr).find("td.IsCompressor").text()) == "true"))
        $('#cbIsGroundOperated').prop('checked', (($(tr).find("td.IsGroundOperated").text()) == "true"))
        $('#cbIsATP').prop('checked', (($(tr).find("td.IsATP").text()) == "true"))

        $("#txtModel").val($(tr).find("td.Model").text());
        $("#txtWheelSize").val($(tr).find("td.WheelSize").text());
    
        $("#cbIsInactive").prop('checked', $(tr).find('td.IsInactive').find('input').attr('val'));        

        $("#btnSave").attr("onclick", "TRCK_Trailers_Update(false);");
        $("#btnSaveandNew").attr("onclick", "TRCK_Trailers_Update(true);");
        //to set the wizard to BasicData
        $("#stepsBasicData").parent().children().removeClass("active");
        $("#stepsBasicData").addClass("active");
        $("#BasicData").parent().children().removeClass("active");
        $("#BasicData").addClass("active");
        
}

function TRCK_Trailers_ClearAllControls(callback) {
    debugger;
    ClearAll("#TRCK_TrailerModal", null);

    $("#slAccount").removeAttr("disabled");
    $("#slSubAccountGroup").removeAttr("disabled");

    $("#slAccount").html('<option value=0>' + TranslateString("SelectFromMenu") + '</option>');

    $("#slSubAccount").html('<option value=0>' + 'AUTO GENERATED' + '</option>');
    $("#txtName").removeAttr("disabled");
    $("#txtLocalName").removeAttr("disabled");

    debugger;

    $("#btnSave").attr("onclick", "TRCK_Trailers_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "TRCK_Trailers_Insert(true);");
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
        , pWhereClause: (pDefaults.UnEditableCompanyName == "SEA" ? "WHERE 1=1" : ("WHERE DATEDIFF(DAY, GETDATE(),LicenseNumberExpireDate) <= 30 OR LicenseNumberExpireDate IS NULL"))
        , pOrderBy: "ID"
    };
    CallGETFunctionWithParameters("/api/TRCK_Trailers/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned"
        , pParametersWithValues
        , function (pData) {
            var _ExportedRows = JSON.parse(pData[0]);
            //ExportToExcel(pArray, pHeader, pFileName, pExcludedColumns);
            ExportToExcel(_ExportedRows, "Number,Expiration Date,Days,Tax End Date", "Expiration", null);
            FadePageCover(false);
        }
        , null);
}

/**********************Trailer Licenses****************************/
function TRCK_TrailerLicenses_BindTableRows(pTRCK_TrailerLicenses) {
    debugger;
    //ClearAllTableRows("tblTRCK_TrailerLicenses");
    $("#tblTRCK_TrailerLicenses tbody tr").html("");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pTRCK_TrailerLicenses, function (i, item) {
        console.log(item.ID);

        AppendRowtoTable("tblTRCK_TrailerLicenses",
        ("<tr ID='" + item.ID + "' ondblclick='TRCK_TrailerLicenses_FillControls(" + item.ID + ");'>"
        //("<tr ID='" + item.ID + "'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td val='" + item.TrailerID + "' class='TrailerID hide'>" + item.TrailerID + "</td>"
                    + "<td val='" + item.LicenseNumber + "' class='LicenseNumber_details'>" + item.LicenseNumber + "</td>"
            + "<td val='" + item.LicenseNumberExpireDate + "' class='LicenseNumberExpireDate_details'>" + GetDateFromServer(item.LicenseNumberExpireDate) + "</td>"
           
                    + "<td class='hide'><a href='#TRCK_TrailerLicensesModal' data-toggle='modal' onclick='TRCK_TrailerLicenses_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblTRCK_TrailerLicenses", "ID", "cb-CheckAll-TRCK_TrailerLicenses");
    CheckAllCheckbox("HeaderDeletetblTRCK_TrailerLicensesID");
    HighlightText("#tblTRCK_TrailerLicenses>tbody>tr", $("#txtTRCK_TrailerLicensesSearch").val().trim());
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    TRCK_TrailerLicenses_ResetFunctionsNames();
}
function TRCK_TrailerLicenses_LoadingWithPagingForModal(pID) {//pID = ID and it is the search key which will be used in the where clause
    debugger;
    if (pID == 0 || pID == undefined)
        pID = $("#hTRCK_TrailerID").val();
    strLoadWithPagingFunctionName = "/api/TRCK_TrailerLicenses/LoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    strBindTableRowsFunctionName = "TRCK_TrailerLicenses_BindTableRows";
    var pWhereClause = " WHERE TrailerID = " + pID;
    pWhereClause += ($("#txtTRCK_TrailerLicensesSearch").val().trim() == "" || $("#txtTRCK_TrailerLicensesSearch").val() == undefined
        ? ""
        : " AND LicenseNumber LIKE '%" + $("#txtTRCK_TrailerLicensesSearch").val().trim() + "%'");
    var pOrderBy = " LicenseNumber ";
    LoadWithPagingForModal("/api/TRCK_TrailerLicenses/LoadWithPaging", pWhereClause, pOrderBy, 1 /*($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1)*/, $('#select-page-size').val().trim(), function (pTabelRows) {
        TRCK_TrailerLicenses_BindTableRows(pTabelRows); //TaxeTypes_ClearAllControls();
    });

}
//to reset function names as in mainapp.master
function TRCK_TrailerLicenses_ResetFunctionsNames() {
    strLoadWithPagingFunctionName = "/api/TRCK_Trailers/LoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    strBindTableRowsFunctionName = "TRCK_Trailers_BindTableRows";
}
function TRCK_TrailerLicenses_ClearAllControls() {
    debugger;
    ClearAll("#TRCK_TrailerLicensesModal", null);
    var _FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();

    $("#lblTRCK_TrailerLicensesShown").html($("#lblTRCK_TrailerLicensesShown").html());
    $("#txtLicenseNumberExpireDate2").val(_FormattedTodaysDate);

    $("#btnSaveTRCK_TrailerLicenses").attr("onclick", "TRCK_TrailerLicenses_Insert(false);");
    $("#btnSaveandNewTRCK_TrailerLicenses").attr("onclick", "TRCK_TrailerLicenses_Insert(true);");

}
function TRCK_TrailerLicenses_FillControls(pTRCK_TrailerLicensesID) {
    debugger;
    ClearAll("#TRCK_TrailerLicensesModal", null);
    jQuery("#TRCK_TrailerLicensesModal").modal("show");
    $("#hTRCK_TrailerLicensesID").val(pTRCK_TrailerLicensesID);
    var tr = $("#tblTRCK_TrailerLicenses tbody tr[ID='" + pTRCK_TrailerLicensesID + "']");
    $("#lblTRCK_TrailerLicensesShown").html($("#lblTRCK_TrailerLicensesShown").html());

    $("#txtLicenseNumber2").val($(tr).find("td.LicenseNumber").text());
    $("#txtLicenseNumberExpireDate2").val($(tr).find("td.LicenseNumberExpireDate").text());


    $("#btnSaveTRCK_TrailerLicenses").attr("onclick", "TRCK_TrailerLicenses_Update(false);");
    $("#btnSaveandNewTRCK_TrailerLicenses").attr("onclick", "TRCK_TrailerLicenses_Update(true);");
}
function TRCK_TrailerLicenses_Insert(pSaveandAddNew) {
    debugger;
   
    InsertUpdateFunction("form", "/api/TRCK_TrailerLicenses/Insert"
        , {
            pTrailerID: $('#hTRCK_TrailerID').val()
            , pLicenseNumber: $('#txtLicenseNumber2').val()
            , pLicenseNumberExpireDate: $('#txtLicenseNumberExpireDate2').val()
        }, pSaveandAddNew, "TRCK_TrailerLicensesModal"
        , function () {
            TRCK_TrailerLicenses_LoadingWithPagingForModal($('#hTRCK_TrailerID').val());
            if (pSaveandAddNew)
                TRCK_TrailerLicenses_ClearAllControls();
        });
}
function TRCK_TrailerLicenses_Update(pSaveandAddNew) {
    debugger;
    
    InsertUpdateFunction("form", "/api/TRCK_TrailerLicenses/Insert"
        , {
            pID: $("#hTRCK_TrailerLicensesID").val()
            , pTrailerID: $('#hTRCK_TrailerID').val()
            , pLicenseNumber:  $('#txtLicenseNumber2').val()
            , pLicenseNumberExpireDate: $('#txtLicenseNumberExpireDate2').val()
        }, pSaveandAddNew, "TRCK_TrailerLicensesModal"
        , function () {
            TRCK_TrailerLicenses_LoadingWithPagingForModal($('#hTRCK_TrailerID').val());
            if (pSaveandAddNew)
                TRCK_TrailerLicenses_ClearAllControls();
        });
}
function TRCK_TrailerLicenses_Delete() {
    debugger;
    var pTRCK_TrailerLicensesIDs = GetAllSelectedIDsAsString('tblTRCK_TrailerLicenses');
    //Confirmation message to delete
    if (pTRCK_TrailerLicensesIDs != "")
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
            DeleteListFunction("/api/TRCK_TrailerLicenses/Delete", { "pTRCK_TrailerLicensesIDs": pTRCK_TrailerLicensesIDs }, function () {
                //TRCK_TrailerLicenses_LoadAll($("#hAirlineID").val());
                TRCK_TrailerLicenses_LoadingWithPagingForModal($("#hTRCK_TrailerID").val());
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}

