// TRCK_Equipments Region ---------------------------------------------------------------
// Bind TRCK_Equipments Table Rows

function TRCK_Equipments_Initialize() {
    debugger;
    strLoadWithPagingFunctionName = "/api/TRCK_Equipments/LoadWithPagingWithWhereClause";
    LoadView("/MasterData/TRCK_Equipments", "div-content", function () {
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

                FillListFromObject_ERP(null, 2/*pCodeOrName*/, "Select Item", "slPurchaseItem", pData[8], null);

                //FillHead
                FillListFromObject_ERP(null, 2/*pCodeOrName*/, "Select Item", "slWheelOutLeft1", pData[8], null);
                FillListFromObject_ERP(null, 2/*pCodeOrName*/, "Select Item", "slWheelOutLeftIN1", pData[8], null);
                FillListFromObject_ERP(null, 2/*pCodeOrName*/, "Select Item", "slWheelOutLeft2", pData[8], null);
                FillListFromObject_ERP(null, 2/*pCodeOrName*/, "Select Item", "slWheelOutLeftIN2", pData[8], null);
                FillListFromObject_ERP(null, 2/*pCodeOrName*/, "Select Item", "slWheelOutLeft3", pData[8], null);
                FillListFromObject_ERP(null, 2/*pCodeOrName*/, "Select Item", "slWheelOutLeftIN3", pData[8], null);
                FillListFromObject_ERP(null, 2/*pCodeOrName*/, "Select Item", "slWheelOutRight1", pData[8], null);
                FillListFromObject_ERP(null, 2/*pCodeOrName*/, "Select Item", "slWheelOutRightIN1", pData[8], null);
                FillListFromObject_ERP(null, 2/*pCodeOrName*/, "Select Item", "slWheelOutRight2", pData[8], null);
                FillListFromObject_ERP(null, 2/*pCodeOrName*/, "Select Item", "slWheelOutRightIN2", pData[8], null);
                FillListFromObject_ERP(null, 2/*pCodeOrName*/, "Select Item", "slWheelOutRight3", pData[8], null);
                FillListFromObject_ERP(null, 2/*pCodeOrName*/, "Select Item", "slWheelOutRightIN3", pData[8], null);
                //FillTrail
                FillListFromObject_ERP(null, 2/*pCodeOrName*/, "Select Item", "slWheelOutLeftTail1", pData[8], null);
                FillListFromObject_ERP(null, 2/*pCodeOrName*/, "Select Item", "slWheelOutLeftINTail1", pData[8], null);
                FillListFromObject_ERP(null, 2/*pCodeOrName*/, "Select Item", "slWheelOutLeftTail2", pData[8], null);
                FillListFromObject_ERP(null, 2/*pCodeOrName*/, "Select Item", "slWheelOutLeftINTail2", pData[8], null);
                FillListFromObject_ERP(null, 2/*pCodeOrName*/, "Select Item", "slWheelOutLeftTail3", pData[8], null);
                FillListFromObject_ERP(null, 2/*pCodeOrName*/, "Select Item", "slWheelOutLeftINTail3", pData[8], null);
                FillListFromObject_ERP(null, 2/*pCodeOrName*/, "Select Item", "slWheelOutLeftTail4", pData[8], null);
                FillListFromObject_ERP(null, 2/*pCodeOrName*/, "Select Item", "slWheelOutLeftINTail4", pData[8], null);
                FillListFromObject_ERP(null, 2/*pCodeOrName*/, "Select Item", "slWheelOutLeftTail5", pData[8], null);
                FillListFromObject_ERP(null, 2/*pCodeOrName*/, "Select Item", "slWheelOutLeftINTail5", pData[8], null);
                FillListFromObject_ERP(null, 2/*pCodeOrName*/, "Select Item", "slWheelOutRightTail1", pData[8], null);
                FillListFromObject_ERP(null, 2/*pCodeOrName*/, "Select Item", "slWheelOutRightINTail1", pData[8], null);
                FillListFromObject_ERP(null, 2/*pCodeOrName*/, "Select Item", "slWheelOutRightTail2", pData[8], null);
                FillListFromObject_ERP(null, 2/*pCodeOrName*/, "Select Item", "slWheelOutRightINTail2", pData[8], null);
                FillListFromObject_ERP(null, 2/*pCodeOrName*/, "Select Item", "slWheelOutRightTail3", pData[8], null);
                FillListFromObject_ERP(null, 2/*pCodeOrName*/, "Select Item", "slWheelOutRightINTail3", pData[8], null);
                FillListFromObject_ERP(null, 2/*pCodeOrName*/, "Select Item", "slWheelOutRightTail4", pData[8], null);
                FillListFromObject_ERP(null, 2/*pCodeOrName*/, "Select Item", "slWheelOutRightINTail4", pData[8], null);
                FillListFromObject_ERP(null, 2/*pCodeOrName*/, "Select Item", "slWheelOutRightTail5", pData[8], null);
                FillListFromObject_ERP(null, 2/*pCodeOrName*/, "Select Item", "slWheelOutRightINTail5", pData[8], null);


            }
           , null);

            GetListWithName(null, "/api/TRCK_EquipmentModel/LoadAll", "<--Select-->", "slEquipmentModel");
            GetListWithName(null, "/api/Countries/LoadAll", "<--Select-->", "slOriginCountry");
            GetListWithNameAndWhereClause(null, "/api/Suppliers/LoadAll", "<--Select-->", "slInsuranceCompany", " WHERE IsInactive = 0 ORDER BY Name ", function () { $("#slServiceCenter").html($("#slInsuranceCompany").html()); $("#slCompany").html($("#slInsuranceCompany").html()); });
            GetListWithName(null, "/api/TRCK_Trailers/LoadAll", "<--Select-->", "slTrailers");

            debugger;//sherif:loadwithpaging fn is callback in $.getscript
            LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, "WHERE 1=1", 1, 10
                , function (pData) {
                    var pEquipmentType = pData[2];
                    Fill_SelectInputAfterLoadData_WithMultiAttr(pEquipmentType, 'ID', 'Name', '<--Select-->', '#slEquipmentType', '', 'NumberOfChairs');
                    TRCK_Equipments_BindTableRows(JSON.parse(pData[0]));
                    TRCK_Equipments_ClearAllControls();
                });
    },
        function () { TRCK_Equipments_ClearAllControls(); },
        function () { TRCK_Equipments_DeleteList(); });
}
function TRCK_Equipments_BindTableRows(pTRCK_Equipments) {
    debugger;
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblTRCK_Equipments");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pTRCK_Equipments, function (i, item) {
        AppendRowtoTable("tblTRCK_Equipments",
            ("<tr ID='" + item.ID + "' ondblclick='TRCK_Equipments_EditByDblClick(" + item.ID + ");'>"
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
                    + "<td val='" + item.EquipmentTypeID + "' class='EquipmentTypeID hide'>" + item.EquipmentTypeID + "</td>"
                    + "<td val='" + item.ServiceCenterID + "' class='ServiceCenterID hide'>" + item.ServiceCenterID + "</td>"
                    + "<td val='" + item.CompanyID + "' class='CompanyID hide'>" + item.CompanyID + "</td>"

                    + "<td val='" + item.InsuranceValue + "' class='InsuranceValue hide'>" + (item.InsuranceValue == 0 ? "" : item.InsuranceValue) + "</td>"
                    + "<td val='" + item.Notes + "' class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"

                    + "<td val='" + item.TrailerID + "' class='TrailerID hide'>" + item.TrailerID + "</td>"
                    + "<td val='" + item.MotorNo + "' class='MotorNo hide'>" + item.MotorNo + "</td>"

                    + "<td class='IsInactive hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsInactive == true ? "true' checked='checked'" : "'") + " /></td>"

                    + "<td class='AccountID hide'>" + item.AccountID + "</td>"
                    + "<td class='AccountName hide'>" + (item.AccountName == 0 ? "" : item.AccountName) + "</td>"
                    + "<td class='SubAccountID hide'>" + item.SubAccountID + "</td>"
                    + "<td class='SubAccountName hide'>" + (item.SubAccountName == 0 ? "" : item.SubAccountName) + "</td>"
                    + "<td class='CostCenterID hide'>" + item.CostCenterID + "</td>"
                    + "<td class='CostCenterName hide'>" + (item.CostCenterName == 0 ? "" : item.CostCenterName) + "</td>"
                    + "<td class='SubAccountGroupID hide'>" + item.SubAccountGroupID + "</td>"
                    + "<td class='FirstCounter hide'>" + item.FirstCounter + "</td>" 
                    + "<td val='" + item.NumberOfChambers + "' class='NumberOfChambers hide'>" + item.NumberOfChambers + "</td>"
                    + "<td val='" + item.NumberOfChairs + "' class='NumberOfChairs hide'>" + item.NumberOfChairs + "</td>"
                    + "<td val='" + item.ChambersVolumeInLiters + "' class='ChambersVolumeInLiters hide'>" + item.ChambersVolumeInLiters + "</td>"
                    + "<td val='" + item.TankerEmptyWeight + "' class='TankerEmptyWeight hide'>" + item.TankerEmptyWeight + "</td>"
                    + "<td val='" + item.OutletID + "' class='OutletID hide'>" + item.OutletID + "</td>"
                    + "<td val='" + item.IsHeating + "' class='IsHeating hide'>" + item.IsHeating + "</td>"
                    + "<td val='" + item.IsHeatable + "' class='IsHeatable hide'>" + item.IsHeatable + "</td>"
                    + "<td val='" + item.IsEpump + "' class='IsEpump hide'>" + item.IsEpump + "</td>"
                    + "<td val='" + item.IsCompressor + "' class='IsCompressor hide'>" + item.IsCompressor + "</td>"
                    + "<td val='" + item.IsGroundOperated + "' class='IsGroundOperated hide'>" + item.IsGroundOperated + "</td>"
                    + "<td val='" + item.IsATP + "' class='IsATP hide'>" + item.IsATP + "</td>"
                    + "<td val='" + item.IsGPS + "' class='IsGPS hide'>" + item.IsGPS + "</td>"

                    + "<td val='" + item.Model + "' class='Model hide'>" + (item.Model == 0 ? "" : item.Model) + "</td>"
                    + "<td val='" + item.WheelSize + "' class='WheelSize hide'>" + (item.WheelSize == 0 ? "" : item.WheelSize) + "</td>"
                   
                    + "<td class='hide'><a href='#TRCK_EquipmentModal' data-toggle='modal' onclick='TRCK_Equipments_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblTRCK_Equipments", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblTRCK_Equipments>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function TRCK_Equipments_EditByDblClick(pID) {
    jQuery("#TRCK_EquipmentModal").modal("show");
    TRCK_Equipments_FillControls(pID);
    TRCK_EquipmentLicenses_LoadingWithPagingForModal(pID);
}
// Loading with data
function TRCK_Equipments_LoadingWithPaging() {
    debugger;
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/TRCK_Equipments/LoadWithPagingWithWhereClause", " WHERE Name LIKE N'%" + $("#txt-Search").val().trim() + "%' ", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pData) { TRCK_Equipments_BindTableRows(JSON.parse(pData[0])); TRCK_Equipments_ClearAllControls(); });
    
    HighlightText("#tblTRCK_Equipments>tbody>tr", $("#txt-Search").val().trim());
    //if (callbackForDeleteFail != null)
    //    callbackForDeleteFail();
}

// calling web function to add new TRCK_Equipment item.
function TRCK_Equipments_Insert(pSaveandAddNew) {
    debugger;
    var pItemID = "";
    var pLastTruckCounter = "";
    var pDate = "";
    var pDescription = "";
    var pItemsList = "";
    var pIDList = "";
    var pItemsIDList = GetAllIDsAsStringWithNameAttr("tblEquipmentItems", "Delete");
    $("#tblEquipmentItems tbody tr").each(function () {
        pItemsList += ((pItemsList == "") ? "" : ",") + ($(this).attr('ID'));
    });

    if (pItemsIDList != "") {
        var NumberOfItemsRows = pItemsIDList.split(',').length;
        for (var i = 0; i < NumberOfItemsRows; i++) {
            var currentRowID = pItemsList.split(",")[i];

            pIDList += ((pIDList == "") ? "" : ",") + pItemsIDList.split(",")[i];
            pItemID += ((pItemID == "") ? "" : ",") + ($("#slPurchaseItem" + currentRowID).val().trim() == "" ? "0" : $("#slPurchaseItem" + currentRowID).val());
            pLastTruckCounter += ((pLastTruckCounter == "") ? "" : ",") + ($("#txtLastTruckCounter" + currentRowID).val().trim() == "" ? "0" : $("#txtLastTruckCounter" + currentRowID).val());
            pDate += ((pDate == "") ? "" : ",") + ($("#txtDate" + currentRowID).val().trim() == "" ? "0" : ConvertDateFormat($("#txtDate" + currentRowID).val()));
            pDescription += ((pDescription == "") ? "" : ",") + ($("#txtDescription" + currentRowID).val().trim() == "" ? "0" : $("#txtDescription" + currentRowID).val());
        }
    }
    InsertUpdateFunction("form", "/api/TRCK_Equipments/Insert"
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
            , pCompanyID: $("#slCompany").val() == "" ? 0 : $("#slCompany").val()

            , pInsuranceValue: ($("#txtInsuranceValue").val() == null ? "" : $("#txtInsuranceValue").val().trim())
            , pNotes: ($("#txtNotes").val() == null ? "" : $("#txtNotes").val().trim())
            , pTrailerID: $("#slTrailers").val() == "" ? 0 : $("#slTrailers").val()
            , pMotorNo: ($("#txtMotorNo").val() == null ? "" : $("#txtMotorNo").val().trim())

            , pIsInactive: $("#cbIsInactive").prop('checked')

            , pAccountID: $("#slAccount").val()
            , pSubAccountID: $("#slSubAccount").val()
            , pCostCenterID: $("#slCostCenter").val()
            , pSubAccountGroupID: $("#slSubAccountGroup").val()
            , pFirstCounter: $("#txtFirstCounter").val() == "" ? 0 : $("#txtFirstCounter").val()
            , pIDList: pIDList, pItemID: pItemID, pLastTruckCounter: pLastTruckCounter, pDate: pDate, pDescription: pDescription
            , pSLHeadLeft1Out: $('#slWheelOutLeft1').css('display') == "none" ? "0" : $("#slCostCenter").val()
            , pSLHeadLeft1IN: $('#slWheelOutLeftIN1').css('display') == "none" ? "0" : $("#slWheelOutLeftIN1").val()
            , pSLHeadLeft2Out: $('#slWheelOutLeft2').css('display') == "none" ? "0" : $("#slWheelOutLeft2").val()
            , pSLHeadLeft2IN: $('#slWheelOutLeftIN2').css('display') == "none" ? "0" : $("#slWheelOutLeftIN2").val()
            , pSLHeadLeft3Out: $('#slWheelOutLeft3').css('display') == "none" ? "0" : $("#slWheelOutLeft3").val()
            , pSLHeadLeft3IN: $('#slWheelOutLeftIN3').css('display') == "none" ? "0" : $("#slWheelOutLeftIN3").val()
            , pSLHeadRight1Out: $('#slWheelOutRight1').css('display') == "none" ? "0" : $("#slWheelOutRight1").val()
            , pSLHeadRight1IN: $('#slWheelOutRightIN1').css('display') == "none" ? "0" : $("#slWheelOutRightIN1").val()
            , pSLHeadRight2Out: $('#slWheelOutRight2').css('display') == "none" ? "0" : $("#slWheelOutRight2").val()
            , pSLHeadRight2IN: $('#slWheelOutRightIN2').css('display') == "none" ? "0" : $("#slWheelOutRightIN2").val()
            , pSLHeadRight3Out: $('#slWheelOutRight3').css('display') == "none" ? "0" : $("#slWheelOutRight3").val()
            , pSLHeadRight3IN: $('#slWheelOutRightIN3').css('display') == "none" ? "0" : $("#slWheelOutRightIN3").val()
            , pSLTrailLeft1Out: $('#slWheelOutLeftTail1').css('display') == "none" ? "0" : $("#slWheelOutLeftTail1").val()
            , pSLTrailLeft1IN: $('#slWheelOutLeftINTail1').css('display') == "none" ? "0" : $("#slWheelOutLeftINTail1").val()
            , pSLTrailLeft2Out: $('#slWheelOutLeftTail2').css('display') == "none" ? "0" : $("#slWheelOutLeftTail2").val()
            , pSLTrailLeft2IN: $('#slWheelOutLeftINTail2').css('display') == "none" ? "0" : $("#slWheelOutLeftINTail2").val()
            , pSLTrailLeft3Out: $('#slWheelOutLeftTail3').css('display') == "none" ? "0" : $("#slWheelOutLeftTail3").val()
            , pSLTrailLeft3IN: $('#slWheelOutLeftINTail3').css('display') == "none" ? "0" : $("#slWheelOutLeftINTail3").val()
            , pSLTrailLeft4Out: $('#slWheelOutLeftTail4').css('display') == "none" ? "0" : $("#slWheelOutLeftTail4").val()
            , pSLTrailLeft4IN: $('#slWheelOutLeftINTail4').css('display') == "none" ? "0" : $("#slWheelOutLeftINTail4").val()
            , pSLTrailLeft5Out: $('#slWheelOutLeftTail5').css('display') == "none" ? "0" : $("#slWheelOutLeftTail5").val()
            , pSLTrailLeft5IN: $('#slWheelOutLeftINTail5').css('display') == "none" ? "0" : $("#slWheelOutLeftINTail5").val()
            , pSLTrailRight1Out: $('#slWheelOutRightTail1').css('display') == "none" ? "0" : $("#slWheelOutRightTail1").val()
            , pSLTrailRight1IN: $('#slWheelOutRightINTail1').css('display') == "none" ? "0" : $("#slWheelOutRightINTail1").val()
            , pSLTrailRight2Out: $('#slWheelOutRightTail2').css('display') == "none" ? "0" : $("#slWheelOutRightTail2").val()
            , pSLTrailRight2IN: $('#slWheelOutRightINTail2').css('display') == "none" ? "0" : $("#slWheelOutRightINTail2").val()
            , pSLTrailRight3Out: $('#slWheelOutRightTail3').css('display') == "none" ? "0" : $("#slWheelOutRightTail3").val()
            , pSLTrailRight3IN: $('#slWheelOutRightINTail3').css('display') == "none" ? "0" : $("#slWheelOutRightINTail3").val()
            , pSLTrailRight4Out: $('#slWheelOutRightTail4').css('display') == "none" ? "0" : $("#slWheelOutRightTail4").val()
            , pSLTrailRight4IN: $('#slWheelOutRightINTail4').css('display') == "none" ? "0" : $("#slWheelOutRightINTail4").val()
            , pSLTrailRight5Out: $('#slWheelOutRightTail5').css('display') == "none" ? "0" : $("#slWheelOutRightTail5").val()
            , pSLTrailRight5IN: $('#slWheelOutRightINTail5').css('display') == "none" ? "0" : $("#slWheelOutRightINTail5").val()
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
            , pEquipmentTypeID: $("#slEquipmentType").val() == "" ? 0 : $("#slEquipmentType").val()
            , pNumberOfChairs: $("#slEquipmentType").val() == 0 || $("#slEquipmentType").val() == "" ? 0 : $("#slEquipmentType option:selected").attr("NumberOfChairs")

            , pIsGPS: $('#cbIsGPS').prop('checked')
            , pModel: ($("#txtModel").val().trim() == "" ? 0 : $("#txtModel").val().trim().toUpperCase())
            , pWheelSize: ($("#txtWheelSize").val().trim() == "" ? 0 : $("#txtWheelSize").val().trim().toUpperCase())

        }, pSaveandAddNew, "TRCK_EquipmentModal", function () {
            TRCK_Equipments_LoadingWithPaging();
        });
}
function TRCK_Equipments_Update(pSaveandAddNew) {
    debugger;
    var pItemID = "";
    var pLastTruckCounter = "";
    var pDate = "";
    var pDescription = "";
    var pItemsList = "";
    var pIDList = "";
    var pItemsIDList = GetAllIDsAsStringWithNameAttr("tblEquipmentItems", "Delete");
    $("#tblEquipmentItems tbody tr").each(function () {
        pItemsList += ((pItemsList == "") ? "" : ",") + ($(this).attr('ID'));
    });

    if (pItemsIDList != "") {
        var NumberOfItemsRows = pItemsIDList.split(',').length;
        for (var i = 0; i < NumberOfItemsRows; i++) {
            var currentRowID = pItemsList.split(",")[i];

            pIDList += ((pIDList == "") ? "" : ",") + pItemsIDList.split(",")[i];
            pItemID += ((pItemID == "") ? "" : ",") + ($("#slPurchaseItem" + currentRowID).val().trim() == "" ? "0" : $("#slPurchaseItem" + currentRowID).val());
            pLastTruckCounter += ((pLastTruckCounter == "") ? "" : ",") + ($("#txtLastTruckCounter" + currentRowID).val().trim() == "" ? "0" : $("#txtLastTruckCounter" + currentRowID).val());
            pDate += ((pDate == "") ? "" : ",") + ($("#txtDate" + currentRowID).val().trim() == "" ? "0" : ConvertDateFormat($("#txtDate" + currentRowID).val()));
            pDescription += ((pDescription == "") ? "" : ",") + ($("#txtDescription" + currentRowID).val().trim() == "" ? "0" : $("#txtDescription" + currentRowID).val());
        } 
    }

    InsertUpdateFunction("form", "/api/TRCK_Equipments/Update"
        , {
            pID: $("#hTRCK_EquipmentID").val()
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
            , pCompanyID: $("#slCompany").val() == "" ? 0 : $("#slCompany").val()

            , pInsuranceValue: ($("#txtInsuranceValue").val() == null ? "" : $("#txtInsuranceValue").val().trim())
            , pNotes: ($("#txtNotes").val() == null ? "" : $("#txtNotes").val().trim())
            , pTrailerID: $("#slTrailers").val() == "" ? 0 : $("#slTrailers").val()
            , pMotorNo: ($("#txtMotorNo").val() == null ? "" : $("#txtMotorNo").val().trim())

            , pIsInactive: $("#cbIsInactive").prop('checked')

            , pAccountID: $("#slAccount").val()
            , pSubAccountID: $("#slSubAccount").val()
            , pCostCenterID: $("#slCostCenter").val()
            , pSubAccountGroupID: $("#slSubAccountGroup").val()
            , pFirstCounter: $("#txtFirstCounter").val() == "" ? 0 : $("#txtFirstCounter").val()
            , pIDList: pIDList, pItemID: pItemID, pLastTruckCounter: pLastTruckCounter, pDate: pDate, pDescription: pDescription
            , pSLHeadLeft1Out: $("#slWheelOutLeft1").val()
            , pSLHeadLeft1IN:  $("#slWheelOutLeftIN1").val()
            , pSLHeadLeft2Out: $("#slWheelOutLeft2").val()
            , pSLHeadLeft2IN: $("#slWheelOutLeftIN2").val()
            , pSLHeadLeft3Out:$("#slWheelOutLeft3").val()
            , pSLHeadLeft3IN:  $("#slWheelOutLeftIN3").val()
            , pSLHeadRight1Out:  $("#slWheelOutRight1").val()
            , pSLHeadRight1IN:  $("#slWheelOutRightIN1").val()
            , pSLHeadRight2Out: $("#slWheelOutRight2").val()
            , pSLHeadRight2IN:  $("#slWheelOutRightIN2").val()
            , pSLHeadRight3Out:  $("#slWheelOutRight3").val()
            , pSLHeadRight3IN:  $("#slWheelOutRightIN3").val()
            , pSLTrailLeft1Out: $("#slWheelOutLeftTail1").val()
            , pSLTrailLeft1IN:  $("#slWheelOutLeftINTail1").val()
            , pSLTrailLeft2Out: $("#slWheelOutLeftTail2").val()
            , pSLTrailLeft2IN:  $("#slWheelOutLeftINTail2").val()
            , pSLTrailLeft3Out:  $("#slWheelOutLeftTail3").val()
            , pSLTrailLeft3IN:  $("#slWheelOutLeftINTail3").val()
            , pSLTrailLeft4Out:  $("#slWheelOutLeftTail4").val()
            , pSLTrailLeft4IN:  $("#slWheelOutLeftINTail4").val()
            , pSLTrailLeft5Out:  $("#slWheelOutLeftTail5").val()
            , pSLTrailLeft5IN:  $("#slWheelOutLeftINTail5").val()
            , pSLTrailRight1Out: $("#slWheelOutRightTail1").val()
            , pSLTrailRight1IN:  $("#slWheelOutRightINTail1").val()
            , pSLTrailRight2Out:  $("#slWheelOutRightTail2").val()
            , pSLTrailRight2IN: $("#slWheelOutRightINTail2").val()
            , pSLTrailRight3Out:  $("#slWheelOutRightTail3").val()
            , pSLTrailRight3IN:  $("#slWheelOutRightINTail3").val()
            , pSLTrailRight4Out:  $("#slWheelOutRightTail4").val()
            , pSLTrailRight4IN: $("#slWheelOutRightINTail4").val()
            , pSLTrailRight5Out: $("#slWheelOutRightTail5").val()
            , pSLTrailRight5IN: $("#slWheelOutRightINTail5").val()
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
            , pEquipmentTypeID: $("#slEquipmentType").val() == "" ? 0 : $("#slEquipmentType").val()
            , pNumberOfChairs: $("#slEquipmentType").val() == 0 || $("#slEquipmentType").val() == "" ? 0 : $("#slEquipmentType option:selected").attr("NumberOfChairs")

            , pIsGPS: $('#cbIsGPS').prop('checked')
            , pModel: ($("#txtModel").val().trim() == "" ? 0 : $("#txtModel").val().trim().toUpperCase())
            , pWheelSize: ($("#txtWheelSize").val().trim() == "" ? 0 : $("#txtWheelSize").val().trim().toUpperCase())

        }, pSaveandAddNew, "TRCK_EquipmentModal", function () { TRCK_Equipments_LoadingWithPaging(); });
}
function TRCK_Equipments_EquipmentTypeChanged() {
    debugger;
    $("#txtNumberOfChairs").val($("#slEquipmentType").val() == 0
         || $("#slEquipmentType option:selected").attr("NumberOfChairs") == undefined
         || $("#slEquipmentType option:selected").attr("NumberOfChairs") == 0
         ? ""
         : $("#slEquipmentType option:selected").attr("NumberOfChairs"));
}
function EquipmentItems_DeleteList() {
    debugger;

    var listOfIDs = "";
    //$('#' + pTableName + ' td').find('input[type="checkbox"]:checked').each(function () {
    $('#tblEquipmentItems td').find('input[name="Delete"]:checked').each(function () {
        
        if (parseInt(($(this).attr('value'))) == 0)
            $(this).closest('tr').remove();
        else
            listOfIDs += ((listOfIDs == "") ? "" : ",") + ($(this).attr('value'));
    });

    //var pDeletedEquipmentItemsIDs = '';
    //var pDeletedIDs = GetAllSelectedIDsAsString('tblEquipmentItems');
    //$("#tblEquipmentItems tbody tr").each(function () {
    //    if ($(this).find('input[name="' + "Delete" + '"]:checked').length > 0)
    //        pDeletedEquipmentItemsIDs += ((pDeletedEquipmentItemsIDs == "") ? "" : ",") + ($(this).attr('ID'));
    //});
    if (listOfIDs != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
        //callback function in case of confirm delete
        function () {
            //if (ValidateForm("form", "PaymentRequestModal")) {
            FadePageCover(true);
            var pParametersWithValues = {
                pDeletedEquipmentItemsIDs: listOfIDs
                //Header
                //, pEquipmentItemID: $("#hID").val() == "" ? 0 : $("#hID").val()
            };
            CallGETFunctionWithParameters("/api/TRCK_Equipments/TRCK_Equipment_Items_Delete", pParametersWithValues 
                , function (pData) {
                    if (pData[0]) {
                        //PaymentRequest_LoadingWithPaging();
                        for (var i = 0; i < listOfIDs.split(",").length; i++) {
                            $("#tblEquipmentItems tbody tr[Counter=" + listOfIDs.split(",")[i] + "]").remove();
                            $("#tblEquipmentItems tbody tr[ID=" + listOfIDs.split(",")[i] + "]").remove();
                        }
                      
                    }
                    else
                        swal("Sorry", "Connection failed, please try again.");
                    FadePageCover(false);
                }
                , null);
            //}
        });//of swal
}
function HouseVechiles_BindTableRows(pTableRows) {
    debugger;
    var editControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' title='Edit'> <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $("#tblShipmentPackage tbody").html("");
    var pHTMLHeaderColumns = "";
    var transferControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Transfer" + "</span>";
    //isa i am sure its master coz shipment is opened

    //if ($("#cbIsFCLForBLDocuments").prop("checked") || $("#cbIsFTLForBLDocuments").prop("checked")) {

    pHTMLHeaderColumns += '     <tr>';
    pHTMLHeaderColumns += '         <th id="HeaderDeleteShipmentPackageID">';
    pHTMLHeaderColumns += '             <input id="cbShipmentPackageDeleteHeader" type="checkbox" />';
    pHTMLHeaderColumns += '         </th>';
    pHTMLHeaderColumns += '         <th>Equipment Model</th>';
    pHTMLHeaderColumns += '         <th>Chassis NO</th>';
    pHTMLHeaderColumns += '         <th>Motor NO</th>';
    pHTMLHeaderColumns += '         <th>Manufactur Date</th>';
    pHTMLHeaderColumns += '         <th>رقم اذن الصرف</th>';
    pHTMLHeaderColumns += '         <th>رقم اذن التخزين</th>';
    pHTMLHeaderColumns += '         <th class="rounded-right hide"></th>';
    pHTMLHeaderColumns += '     </tr>';
    $("#tblHouseVechiles thead").html(pHTMLHeaderColumns);

    $.each(pTableRows, function (i, item) {
        AppendRowtoTable("tblHouseVechiles",
            ("<tr ID='" + item.ID + "' " + (/*OEPac && $("#hIsOperationDisabled").val()*/pIsOperationDisabled == false ? ("ondblclick='ShipmentPackage_FillControls(" + item.ID + ");'") : "") + ">"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Name' val='" + item.Name + "'>" + (item.Name == 0 ? "" : item.Name) + "</td>"
                //+ "<td class='Container' val='" + item.ContainerTypeID + "'>" + (item.ContainerTypeName == 0 ? "" : item.ContainerTypeName) + "</td>"
                + "<td class='ChassisNo' val='" + item.ChassisNo + "'>" + (item.ChassisNo == 0 ? "" : item.ChassisNo) + "</td>"
                + "<td class='MotorNo'>" + item.MotorNo + "</td>"

                + "<td class='ManufacturDate'>" + ConvertDateFormat(GetDateWithFormatMDY(item.ManufacturDate)) + "</td>"
                + "<td class='ExchangePermission'>" + item.ExchangePermission + "</td>"
                + "<td class='StoragePermission'>" + item.StorgePermission + "</td>"
                + "<td class='hide'><a href='#EditPackageModal' data-toggle='modal' onclick='ShipmentPackage_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
                + "</tr>"));

    });

    BindAllCheckboxonTable("tblHouseVechiles", "ID", "cbShipmentPackageDeleteHeader");
    CheckAllCheckbox("HeaderDeleteShipmentPackageID");
}
function TRCK_Equipments_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblTRCK_Equipments') != "")
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
            DeleteListFunction("/api/TRCK_Equipments/Delete", { "pTRCK_EquipmentsIDs": GetAllSelectedIDsAsString('tblTRCK_Equipments') }, function () {
                TRCK_Equipments_LoadingWithPaging(
                    //this is callback in TRCK_Equipments_LoadingWithPaging
                    //function() {swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");}
                    );
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}

//after pressing edit, this function fills the data
function TRCK_Equipments_FillControls(pID) {

        // Fill All Modal Controls
        var tr = $("tr[ID='" + pID + "']");
        debugger;
        $("#hTRCK_EquipmentID").val(pID);

   
       // console.log($(tr).find("td.EquipmentModelID").attr('val'));

        $("#slEquipmentModel").val($(tr).find("td.EquipmentModelID").attr('val') == 0 ? "" : $(tr).find("td.EquipmentModelID").attr('val'));
        $("#slOriginCountry").val($(tr).find("td.OriginCountryID").attr('val') == 0 ? "" : $(tr).find("td.OriginCountryID").attr('val'));
        $("#slInsuranceCompany").val($(tr).find("td.InsuranceCompanyID").attr('val') == 0 ? "" : $(tr).find("td.InsuranceCompanyID").attr('val'));
        $("#slServiceCenter").val($(tr).find("td.ServiceCenterID").attr('val') == 0 ? "" : $(tr).find("td.ServiceCenterID").attr('val'));
        $("#slCompany").val($(tr).find("td.CompanyID").attr('val') == 0 ? "" : $(tr).find("td.CompanyID").attr('val'));
        $("#slTrailers").val($(tr).find("td.TrailerID").attr('val') == 0 ? "" : $(tr).find("td.TrailerID").attr('val'));
        $("#slEquipmentType").val($(tr).find("td.EquipmentTypeID").text() == "" ? 0 : $(tr).find("td.EquipmentTypeID").text());

        $("#slSubAccountGroup").val($(tr).find("td.SubAccountGroupID").text());
        FillSlAccountFromGroup('slAccount', 'slSubAccountGroup', 'slSubAccount', $(tr).find("td.SubAccountGroupID").text(), $(tr).find("td.AccountID").text());
        //$("#slAccount").val($(tr).find("td.AccountID").text());

        var pSubAccountID = $(tr).find("td.SubAccountID").text();

        if (pSubAccountID != 0)
            FillSlSubAccount('slSubAccount', 'slAccount', $(tr).find("td.SubAccountID").text(), $(tr).find("td.AccountID").text());
  
      //    $("#slSubAccount").html('<option value=' + pSubAccountID + '>' + (pSubAccountID == 0 ? 'AUTO GENERATED' : $(tr).find("td.SubAccountName").text()) + '</option>');

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
        $("#txtMotorNo").val($(tr).find("td.MotorNo").text());
        $("#txtFirstCounter").val($(tr).find("td.FirstCounter").text());

        $("#cbIsInactive").prop('checked', $(tr).find('td.IsInactive').find('input').attr('val'));        

        $("#txtNumberOfChairs").val($(tr).find("td.NumberOfChairs").text())
        $("#txtNumberOfChambers").val($(tr).find("td.NumberOfChambers").text())
        $("#txtChambersVolumeInLiters").val($(tr).find("td.ChambersVolumeInLiters").text())
        $("#txtTankerEmptyWeight").val($(tr).find("td.TankerEmptyWeight").text())
        $("#slOutlet").val($(tr).find("td.OutletID").text())
        $('#cbIsHeating').prop('checked',(($(tr).find("td.IsHeating").text()) == "true"))
        $('#cbIsHeatable').prop('checked',(($(tr).find("td.IsHeatable").text()) == "true"))
        $('#cbIsEpump').prop('checked',(($(tr).find("td.IsEpump").text()) == "true"))
        $('#cbIsCompressor').prop('checked',(($(tr).find("td.IsCompressor").text()) == "true"))
        $('#cbIsGroundOperated').prop('checked',(($(tr).find("td.IsGroundOperated").text()) == "true"))
        $('#cbIsATP').prop('checked', (($(tr).find("td.IsATP").text()) == "true"))

        $('#cbIsGPS').prop('checked', (($(tr).find("td.IsGPS").text()) == "true"))
        $("#txtModel").val($(tr).find("td.Model").text());
        $("#txtWheelSize").val($(tr).find("td.WheelSize").text());

        $("#btnSave").attr("onclick", "TRCK_Equipments_Update(false);");
        $("#btnSaveandNew").attr("onclick", "TRCK_Equipments_Update(true);");
        //to set the wizard to BasicData
        $("#stepsBasicData").parent().children().removeClass("active");
        $("#stepsBasicData").addClass("active");
        $("#BasicData").parent().children().removeClass("active");
        $("#BasicData").addClass("active");
             
        CallGETFunctionWithParameters("/api/TRCK_Equipments/LoadTRCK_Equipment_Items", { pEquipmentID_LoadItem: pID }
               , function (pData) {
                   debugger;
                   Equipment_ItemsData = JSON.parse(pData[0]);
                   Equipment_ItemsData_BindTableRows(Equipment_ItemsData);
               }, null);

        CallGETFunctionWithParameters("/api/TRCK_Equipments/LoadTRCK_Equipment_ItemsWheels", { pEquipmentID_LoadItem: pID }
                 , function (pData) {
                     debugger;
                     if (pData.length > 0) {
                         debugger;
                         $.each(JSON.parse(pData), function (i, item) {
                             //head
                             $("#slWheelOutLeft1").val(item.SLHeadLeft1Out);
                             if ($("#slWheelOutLeft1").val()!="0") {
                                 $('#Head1').show();
                             }
                             else {
                                 $('#Head1').hide();
                             }
                             $("#slWheelOutLeftIN1").val(item.SLHeadLeft1IN);
                             if ($("#slWheelOutLeftIN1").val() != "0") {
                                 $("#slleft1").show();
                             }
                             else {
                                 $("#slleft1").hide();
                             }
                             $("#slWheelOutLeft2").val(item.SLHeadLeft2Out);
                             if ($("#slWheelOutLeft2").val() != "0") {
                                 $('#Head2').show();
                             }
                             else {
                                 $('#Head2').hide();
                             }
                             $("#slWheelOutLeftIN2").val(item.SLHeadLeft2IN);
                             if ($("#slWheelOutLeftIN2").val() != "0") {
                                 $("#slleft2").show();
                             }
                             else {
                                 $("#slleft2").hide();
                             }
                             $("#slWheelOutLeft3").val(item.SLHeadLeft3Out);
                             if ($("#slWheelOutLeft3").val() != "0") {
                                 $('#Head3').show();
                             }
                             else {
                                 $('#Head3').hide();
                             }
                             $("#slWheelOutLeftIN3").val(item.SLHeadLeft3IN);
                             if ($("#slWheelOutLeftIN3").val() != "0") {
                                 $("#slleft3").show();
                             }
                             else {
                                 $("#slleft3").hide();
                             }

                             $("#slWheelOutRight1").val(item.SLHeadRight1Out);
                             $("#slWheelOutRightIN1").val(item.SLHeadRight1IN);
                             if ($("#slWheelOutRightIN1").val() != "0") {
                                 $("#slright1").show();
                             }
                             else {
                                 $("#slright1").hide();
                             }
                             $("#slWheelOutRight2").val(item.SLHeadRight2Out);
                             $("#slWheelOutRightIN2").val(item.SLHeadRight2IN);
                             if ($("#slWheelOutRightIN2").val() != "0") {
                                 $("#slright2").show();
                             }
                             else {
                                 $("#slright2").hide();
                             }
                             $("#slWheelOutRight3").val(item.SLHeadRight3Out);
                             $("#slWheelOutRightIN3").val(item.SLHeadRight3IN);
                             if ($("#slWheelOutRightIN3").val() != "0") {
                                 $("#slright3").show();
                             }
                             else {
                                 $("#slright3").hide();
                             }
                             //trail
                             $("#slWheelOutLeftTail1").val(item.SLTrailLeft1Out);
                             if ($("#slWheelOutLeftTail1").val() != "0") {
                                 $('#Tail1').show();
                             }
                             else {
                                 $('#Tail1').hide();
                             }
                             $("#slWheelOutLeftINTail1").val(item.SLTrailLeft1IN);
                             if ($("#slWheelOutLeftINTail1").val() != "0") {
                                 $("#slleftTail1").show();
                             }
                             else {
                                 $("#slleftTail1").hide();
                             }
                             $("#slWheelOutLeftTail2").val(item.SLTrailLeft2Out);
                             if ($("#slWheelOutLeftTail2").val() != "0") {
                                 $('#Tail2').show();
                             }
                             else {
                                 $('#Tail2').hide();
                             }
                             $("#slWheelOutLeftINTail2").val(item.SLTrailLeft2IN);
                             if ($("#slWheelOutLeftINTail2").val() != "0") {
                                 $("#slleftTail2").show();
                             }
                             else {
                                 $("#slleftTail2").hide();
                             }
                             $("#slWheelOutLeftTail3").val(item.SLTrailLeft3Out);
                             if ($("#slWheelOutLeftTail3").val() != "0") {
                                 $('#Tail3').show();
                             }
                             else {
                                 $('#Tail3').hide();
                             }
                             $("#slWheelOutLeftINTail3").val(item.SLTrailLeft3IN);
                             if ($("#slWheelOutLeftINTail3").val() != "0") {
                                 $("#slleftTail3").show();
                             }
                             else {
                                 $("#slleftTail3").hide();
                             }
                             $("#slWheelOutLeftTail4").val(item.SLTrailLeft4Out);
                             if ($("#slWheelOutLeftTail4").val() != "0") {
                                 $('#Tail4').show();
                             }
                             else {
                                 $('#Tail4').hide();
                             }
                             $("#slWheelOutLeftINTail4").val(item.SLTrailLeft4IN);
                             if ($("#slWheelOutLeftINTail4").val() != "0") {
                                 $("#slleftTail4").show();
                             }
                             else {
                                 $("#slleftTail4").hide();
                             }
                             $("#slWheelOutLeftTail5").val(item.SLTrailLeft5Out);
                             if ($("#slWheelOutLeftTail5").val() != "0") {
                                 $('#Tail5').show();
                             }
                             else {
                                 $('#Tail5').hide();
                             }
                             $("#slWheelOutLeftINTail5").val(item.SLTrailLeft5IN);
                             if ($("#slWheelOutLeftINTail5").val() != "0") {
                                 $("#slleftTail5").show();
                             }
                             else {
                                 $("#slleftTail5").hide();
                             }
                             $("#slWheelOutRightTail1").val(item.SLTrailRight1Out);
                             $("#slWheelOutRightINTail1").val(item.SLTrailRight1IN);
                             if ($("#slWheelOutRightINTail1").val() != "0") {
                                 $("#slrightTail1").show();
                             }
                             else {
                                 $("#slrightTail1").hide();
                             }
                             $("#slWheelOutRightTail2").val(item.SLTrailRight2Out);
                             $("#slWheelOutRightINTail2").val(item.SLTrailRight2IN);
                             if ($("#slWheelOutRightINTail2").val() != "0") {
                                 $("#slrightTail2").show();
                             }
                             else {
                                 $("#slrightTail2").hide();
                             }
                             $("#slWheelOutRightTail3").val(item.SLTrailRight3Out);
                             $("#slWheelOutRightINTail3").val(item.SLTrailRight3IN);
                             if ($("#slWheelOutRightINTail3").val() != "0") {
                                 $("#slrightTail3").show();
                             }
                             else {
                                 $("#slrightTail3").hide();
                             }
                             $("#slWheelOutRightTail4").val(item.SLTrailRight4Out);
                             $("#slWheelOutRightINTail4").val(item.SLTrailRight4IN);
                             if ($("#slWheelOutRightINTail4").val() != "0") {
                                 $("#slrightTail4").show();
                             }
                             else {
                                 $("#slrightTail4").hide();
                             }
                             $("#slWheelOutRightTail5").val(item.SLTrailRight5Out);
                             $("#slWheelOutRightINTail5").val(item.SLTrailRight5IN);
                             if ($("#slWheelOutRightINTail5").val() != "0") {
                                 $("#slrightTail5").show();
                             }
                             else {
                                 $("#slrightTail5").hide();
                             }
                         }


                     );
                     }
                 }, null);
}

var ItemsRowsCounter = 0;
function Equipment_ItemsData_BindTableRows(pTRCK_EquipmentItems)
{
    debugger;
    ItemsRowsCounter = 0;
    ++ItemsRowsCounter;
    $("#tblEquipmentItems tbody tr").html("");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pTRCK_EquipmentItems, function (i, item) {
        console.log(item.ID);

        AppendRowtoTable("tblEquipmentItems",
        ("<tr ID ='" + ItemsRowsCounter + "' isdeleted='0' tag='item'   counter='" + (ItemsRowsCounter) + "' value='" + item.ID + "'>"
            
        //("<tr ID='" + item.ID + "'>"
                    + "<td class='ID '> <input name='Delete' type='checkbox'  counter='" + (ItemsRowsCounter ) + "'  value='" + item.ID + "' /></td>"
                    + "<td val='" + item.TRCK_EquipmentID + "' class='TRCK_EquipmentID hide'>" + item.TRCK_EquipmentID + "</td>"
                    
                  
                   // "<td class='ItemID' val='" + item.ItemID + "'>" + "<select id='ItemID-" + (ItemsRowsCounter + 1) + "' tag='" + item.ItemID + "' class='input-sm  col-sm selectitem'>" + $('#slItem').html() + "</select>" + "</td>"
                    //+ "<td class='ItemID' val=''><select id='slItem" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slChargeType' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  data-required='true'></select></td>"
                   // + "<td class='ItemID' val=''><select id='slItem" + ItemsRowsCounter + "' style='width:100%;' class='controlStyle slChargeType' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  data-required='true'></select></td>"
                    //+ "<td class='ItemID  ' val='" + 0 + "'>" + "<select  id='Item-" + (ItemsRowsCounter + 1) + "' tag='" + 0 + "' class='input-sm  col-sm selectitem'>" + $('#slPurchaseItem').html() + "</select>" + "</td>"
                    //+ "<td class='ItemID' val='" + item.ItemID + "'>" + "<select id='slPurchaseItem" + (ItemsRowsCounter + 1) + "' tag='" + item.ItemID + "' style='width:100%;' class='controlStyle selectitem'>" + $('#slPurchaseItem').html() + "</select>" + "</td>"

                    + "<td class='ItemID' val='" + item.ItemID + "'>" + "<select id='slPurchaseItem" + (ItemsRowsCounter) + "' tag='" + item.ItemID + "'class='controlStyle selectitem'>" + $('#slPurchaseItem').html() + "</select>" + "</td>"

                   // + "<td class='ItemID' val='" + item.ItemID + "'><select id='slPurchaseItem" + ItemsRowsCounter + "' style='width:100%;' class='controlStyle slPurchaseItem' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  data-required='true'></select></td>"
                    + "<td class='LastTruckCounter' val='" + item.LastTruckCounter + "'>" + "<input tag='" + item.LastTruckCounter + "' type='text' id='txtLastTruckCounter" + ItemsRowsCounter + "' class='inputLastTruckCounter input-sm  col-sm'>" + "</td>"

                    //+ "<td class='CreationDate' val='" + GetDateFromServer(item.CreationDate) + "'>" + GetDateFromServer(item.CreationDate) + "</td>"
                    + " <td class='CreationDate' val='" + GetDateFromServer(item.CreationDate) + "'><input type='text' disabled style='cursor:text;' autocomplete='off' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' data-date-format='dd/mm/yyyy' id='txtDate" + ItemsRowsCounter + "' class='datepicker-input form-control input-sm'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + GetDateFromServer(item.CreationDate) + "' /></td>"
                    + "<td class='Remarks' val='" + item.Remarks + "'>" + "<input tag='" + item.Remarks + "' type='text' id='txtDescription" + ItemsRowsCounter + "' class='inputDescription input-sm  col-sm'>" + "</td>"
                    //+ "<td class='Remarks' val='" + item.Remarks + "'>" + "<input tag='" + item.Remarks + "' id='txtDescription' type='text' class='controlStyle inputDescription'>" + "</td>"
                    //+ "<td val='" + item.ItemID + "' class='LicenseNumber_details'>" + item.ItemID + "</td>"
                    //+ "<td val='" + item.LicenseNumberExpireDate + "' class='LicenseNumberExpireDate_details'>" + GetDateFromServer(item.LicenseNumberExpireDate) + "</td>"
                    + "<td class='hide'><a href='#TRCK_EquipmentLicensesModal' data-toggle='modal' " + editControlsText + "</a></td></tr>"));
        ++ItemsRowsCounter;
       
    });
    debugger;
    //ApplyPermissions();
    //BindAllCheckboxonTable("tblEquipmentItems", "EquipmentItemID", "cb-CheckAll-EquipmentItems");
    //$("#slItem" + ItemsRowsCounter + "").html($("#slPurchaseItem").html());
    //$("#txtDate" + ItemsRowsCounter + "").datepicker();
    //BindAllCheckboxonTable("tblEquipmentItems", "EquipmentItemID", "cb-CheckAll-EquipmentItems");
    //CheckAllCheckbox("HeaderDeletetblEquipmentItemsID");
    //HighlightText("#tblEquipmentItems>tbody>tr", $("#txtTRCK_EquipmentLicensesSearch").val().trim());
    //if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
    //    swal(strSorry, strDeleteFailMessage, "warning");
    //    showDeleteFailMessage = false;
    //}
   // ItemsRowsCounter++;
   // ItemsRowsCounter++;
    setTimeout(function () {
        FillItemsData();
        //  SL_HideShowEditBtns(_IsApproved);
    }, 300);
}
function FillItemsData() {
    debugger;
    $($('#tblEquipmentItems > tbody > tr')).each(function (i, tr) {
        $(tr).find('td.ItemID').find('.selectitem').val($(tr).find('td.ItemID').find('.selectitem').attr('tag'));
        $(tr).find('td.LastTruckCounter').find('.inputLastTruckCounter').val($(tr).find('td.LastTruckCounter').find('.inputLastTruckCounter').attr('tag'));
        $(tr).find('td.Remarks').find('.inputDescription').val($(tr).find('td.Remarks').find('.inputDescription').attr('tag'));


    });
    //setTimeout(function () {
    //    CalculateAll();
    //}, 30);
}

function TRCK_Equipments_ClearAllControls(callback) {
    debugger;
    ClearAll("#TRCK_EquipmentModal", null);

    $("#slAccount").removeAttr("disabled");
    $("#slSubAccountGroup").removeAttr("disabled");

    $("#slAccount").html('<option value=0>' + TranslateString("SelectFromMenu") + '</option>');

    $("#slSubAccount").html('<option value=0>' + 'AUTO GENERATED' + '</option>');
    $("#txtName").removeAttr("disabled");
    $("#txtLocalName").removeAttr("disabled");

    debugger;

    $("#btnSave").attr("onclick", "TRCK_Equipments_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "TRCK_Equipments_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
    //to set the wizard to BasicData
    $("#stepsBasicData").parent().children().removeClass("active");
    $("#stepsBasicData").addClass("active");
    $("#BasicData").parent().children().removeClass("active");
    $("#BasicData").addClass("active");

    //hideall inwhels
    hideAllWheelsIn();

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
    CallGETFunctionWithParameters("/api/TRCK_Equipments/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned"
        , pParametersWithValues
        , function (pData) {
            var _ExportedRows = JSON.parse(pData[0]);
            //ExportToExcel(pArray, pHeader, pFileName, pExcludedColumns);
            ExportToExcel(_ExportedRows, "Number,Expiration Date,Days,Tax End Date", "Expiration", null);
            FadePageCover(false);
        }
        , null);
}
/**********************Equipment Licenses****************************/
function TRCK_EquipmentLicenses_BindTableRows(pTRCK_EquipmentLicenses) {
    debugger;
    //ClearAllTableRows("tblTRCK_EquipmentLicenses");
    $("#tblTRCK_EquipmentLicenses tbody tr").html("");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pTRCK_EquipmentLicenses, function (i, item) {
        console.log(item.ID);

        AppendRowtoTable("tblTRCK_EquipmentLicenses",
        ("<tr ID='" + item.ID + "' ondblclick='TRCK_EquipmentLicenses_FillControls(" + item.ID + ");'>"
        //("<tr ID='" + item.ID + "'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td val='" + item.EquipmentID + "' class='EquipmentID hide'>" + item.EquipmentID + "</td>"
                    + "<td val='" + item.LicenseNumber + "' class='LicenseNumber_details'>" + item.LicenseNumber + "</td>"
                    + "<td val='" + item.LicenseNumberExpireDate + "' class='LicenseNumberExpireDate_details'>" + GetDateFromServer(item.LicenseNumberExpireDate) + "</td>"
                    + "<td class='hide'><a href='#TRCK_EquipmentLicensesModal' data-toggle='modal' onclick='TRCK_EquipmentLicenses_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblTRCK_EquipmentLicenses", "ID", "cb-CheckAll-TRCK_EquipmentLicenses");
    CheckAllCheckbox("HeaderDeletetblTRCK_EquipmentLicensesID");
    HighlightText("#tblTRCK_EquipmentLicenses>tbody>tr", $("#txtTRCK_EquipmentLicensesSearch").val().trim());
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    TRCK_EquipmentLicenses_ResetFunctionsNames();
}
function TRCK_EquipmentLicenses_LoadingWithPagingForModal(pID) {//pID = ID and it is the search key which will be used in the where clause
    debugger;
    if (pID == 0 || pID == undefined)
        pID = $("#hTRCK_EquipmentID").val();
    strLoadWithPagingFunctionName = "/api/TRCK_EquipmentLicenses/LoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    strBindTableRowsFunctionName = "TRCK_EquipmentLicenses_BindTableRows";
    var pWhereClause = " WHERE EquipmentID = " + pID;
    pWhereClause += ($("#txtTRCK_EquipmentLicensesSearch").val().trim() == "" || $("#txtTRCK_EquipmentLicensesSearch").val() == undefined
        ? ""
        : " AND LicenseNumber LIKE '%" + $("#txtTRCK_EquipmentLicensesSearch").val().trim() + "%'");
    var pOrderBy = " LicenseNumber ";
    LoadWithPagingForModal("/api/TRCK_EquipmentLicenses/LoadWithPaging", pWhereClause, pOrderBy, 1 /*($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1)*/, $('#select-page-size').val().trim(), function (pTabelRows) {
        TRCK_EquipmentLicenses_BindTableRows(pTabelRows); //TaxeTypes_ClearAllControls();
        strLoadWithPagingFunctionName = "/api/TRCK_Equipments/LoadWithPagingWithWhereClause";//sherif: to fix paging cz it calls whats related to the original table
        strBindTableRowsFunctionName = "TRCK_Equipments_BindTableRows";
    });

}
//to reset function names as in mainapp.master
function TRCK_EquipmentLicenses_ResetFunctionsNames() {
    strLoadWithPagingFunctionName = "/api/TRCK_Equipments/LoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    strBindTableRowsFunctionName = "TRCK_Equipments_BindTableRows";
}
function TRCK_EquipmentLicenses_ClearAllControls() {
    debugger;
    ClearAll("#TRCK_EquipmentLicensesModal", null);
    var _FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();

    $("#lblTRCK_EquipmentLicensesShown").html($("#lblTRCK_EquipmentLicensesShown").html());
    $("#txtLicenseNumberExpireDate2").val(_FormattedTodaysDate);

    $("#btnSaveTRCK_EquipmentLicenses").attr("onclick", "TRCK_EquipmentLicenses_Insert(false);");
    $("#btnSaveandNewTRCK_EquipmentLicenses").attr("onclick", "TRCK_EquipmentLicenses_Insert(true);");

}
function TRCK_EquipmentLicenses_FillControls(pTRCK_EquipmentLicensesID) {
    debugger;
    ClearAll("#TRCK_EquipmentLicensesModal", null);
    jQuery("#TRCK_EquipmentLicensesModal").modal("show");
    $("#hTRCK_EquipmentLicensesID").val(pTRCK_EquipmentLicensesID);
    var tr = $("#tblTRCK_EquipmentLicenses tbody tr[ID='" + pTRCK_EquipmentLicensesID + "']");
    $("#lblTRCK_EquipmentLicensesShown").html($("#lblTRCK_EquipmentLicensesShown").html());

    $("#txtLicenseNumber2").val($(tr).find("td.LicenseNumber").text());
    $("#txtLicenseNumberExpireDate2").val($(tr).find("td.LicenseNumberExpireDate").text());


    $("#btnSaveTRCK_EquipmentLicenses").attr("onclick", "TRCK_EquipmentLicenses_Update(false);");
    $("#btnSaveandNewTRCK_EquipmentLicenses").attr("onclick", "TRCK_EquipmentLicenses_Update(true);");
}
function TRCK_EquipmentLicenses_Insert(pSaveandAddNew) {
    debugger;
   
    InsertUpdateFunction("form", "/api/TRCK_EquipmentLicenses/Insert"
        , {
            pEquipmentID: $('#hTRCK_EquipmentID').val()
            , pLicenseNumber: $('#txtLicenseNumber2').val()
            , pLicenseNumberExpireDate: $('#txtLicenseNumberExpireDate2').val()
        }, pSaveandAddNew, "TRCK_EquipmentLicensesModal"
        , function () {
            TRCK_EquipmentLicenses_LoadingWithPagingForModal($('#hTRCK_EquipmentID').val());
            if (pSaveandAddNew)
                TRCK_EquipmentLicenses_ClearAllControls();
        });
}
function TRCK_EquipmentLicenses_Update(pSaveandAddNew) {
    debugger;
    
    InsertUpdateFunction("form", "/api/TRCK_EquipmentLicenses/Insert"
        , {
            pID: $("#hTRCK_EquipmentLicensesID").val()
            , pEquipmentID: $('#hTRCK_EquipmentID').val()
            , pLicenseNumber:  $('#txtLicenseNumber2').val()
            , pLicenseNumberExpireDate: $('#txtLicenseNumberExpireDate2').val()
        }, pSaveandAddNew, "TRCK_EquipmentLicensesModal"
        , function () {
            TRCK_EquipmentLicenses_LoadingWithPagingForModal($('#hTRCK_EquipmentID').val());
            if (pSaveandAddNew)
                TRCK_EquipmentLicenses_ClearAllControls();
        });
}

function TRCK_EquipmentLicenses_Delete() {
    debugger;
    var pTRCK_EquipmentLicensesIDs = GetAllSelectedIDsAsString('tblTRCK_EquipmentLicenses');
    //Confirmation message to delete
    if (pTRCK_EquipmentLicensesIDs != "")
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
            DeleteListFunction("/api/TRCK_EquipmentLicenses/Delete", { "pTRCK_EquipmentLicensesIDs": pTRCK_EquipmentLicensesIDs }, function () {
                //TRCK_EquipmentLicenses_LoadAll($("#hAirlineID").val());
                TRCK_EquipmentLicenses_LoadingWithPagingForModal($("#hTRCK_EquipmentID").val());
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}
////////////////////////////////////////////////////////
var maxDetailsIDInTable = 0;
function EquipmentItems_NewRow() {
    debugger;
    ++maxDetailsIDInTable;
    // var copyControlsText = " class='btn btn-xs btn-rounded btn-info float-btn-AddPaymentRequestDetails' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'></span>";
    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var dateValidTo = Date.prototype.addDays(ConvertDateFormat(FormattedTodaysDate), 30);
    

    CallGETFunctionWithParameters("/api/TRCK_Equipments/GetLastTruckCounter", { pEquipmentID: $("#hTRCK_EquipmentID").val() }
             , function (pData) {
                 debugger;
                 var Routing = JSON.parse(pData[0]);
                 var tr = "";
                 tr += "<tr ID='" + maxDetailsIDInTable + "' isdeleted='0' tag='item'   counter='" + (maxDetailsIDInTable) + "' value='" + 0 + "'>"
                 tr += "     <td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + maxDetailsIDInTable + "' checked='checked' /></td>";
                 tr += "     <td class='TRCK_EquipmentID hide' val=''></td>";
                 tr += "     <td class='EquipmentItemID' ><input " + (1 == 2 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + 0 + "' /></td>";
                 tr += "     <td class='ItemID' val=''><select id='slItem" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slChargeType' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  data-required='true'></select></td>";
                 tr += "     <td class='LastTruckCounter' val=''><input type='number' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtLastTruckCounter" + maxDetailsIDInTable + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + (Routing.Length > 0 ? Routing[0].LastTruckCounter : "") + "' /></td>"
                 tr += "     <td class='Date' val=''><input type='text' disabled style='cursor:text;' autocomplete='off' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' data-date-format='dd/mm/yyyy' id='txtDate" + maxDetailsIDInTable + "' class='datepicker-input form-control input-sm'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + getTodaysDateInddMMyyyyFormat() + "' /></td>"
                 tr += "     <td class='Description'> <textarea id='txtDescription" + maxDetailsIDInTable + "'  cols='50'></textarea></td>";
                 tr += "</tr>";

                 $("#tblEquipmentItems tbody").prepend(tr);
                 if ($("[id$='hf_ChangeLanguage']").val() == "ar")
                     $("#tblEquipmentItems tbody tr[ID=" + maxDetailsIDInTable + "]").reverseChildren();
                 /***************************Filling row controls******************************/
            
                 $("#slItem" + maxDetailsIDInTable + "").html($("#slPurchaseItem").html());
                 $("#txtDate" + maxDetailsIDInTable + "").datepicker();
                 BindAllCheckboxonTable("tblEquipmentItems", "EquipmentItemID", "cb-CheckAll-EquipmentItems");

                 FadePageCover(false);
             }
             , null);
}
function ShowHideComboByUotAndIn(type)
{
    debugger;
    if (type == "Left1") {
        if ($('#slleft1').css('display') == "none") {
            $('#slleft1').show();
        }
        else {
            $('#slleft1').hide();
        }
    }
    else if (type == "Left2") {
        if ($('#slleft2').css('display') == "none") {
            $('#slleft2').show();
        }
        else {
            $('#slleft2').hide();
        }
    }
    else if (type == "Left3") {
        if ($('#slleft3').css('display') == "none") {
            $('#slleft3').show();
        }
        else {
            $('#slleft3').hide();
        }
    }
    
    else if (type == "Right1")
    {
        if ($('#slright1').css('display') == "none") {
            $('#slright1').show();
        }
        else {
            $('#slright1').hide();
        }
    }
    else if (type == "Right2") {
        if ($('#slright2').css('display') == "none") {
            $('#slright2').show();
        }
        else {
            $('#slright2').hide();
        }
    }
    else if (type == "Right3") {
        if ($('#slright3').css('display') == "none") {
            $('#slright3').show();
        }
        else {
            $('#slright3').hide();
        }
    }



    ////////////Tail
    if (type == "LeftTail1") {
        if ($('#slleftTail1').css('display') == "none") {
            $('#slleftTail1').show();
        }
        else {
            $('#slleftTail1').hide();
        }
    }
    else if (type == "LeftTail2") {
        if ($('#slleftTail2').css('display') == "none") {
            $('#slleftTail2').show();
        }
        else {
            $('#slleftTail2').hide();
        }
    }
    else if (type == "LeftTail3") {
        if ($('#slleftTail3').css('display') == "none") {
            $('#slleftTail3').show();
        }
        else {
            $('#slleftTail3').hide();
        }
    }
    else if (type == "LeftTail4") {
        if ($('#slleftTail4').css('display') == "none") {
            $('#slleftTail4').show();
        }
        else {
            $('#slleftTail4').hide();
        }
    }
    else if (type == "LeftTail5") {
        if ($('#slleftTail5').css('display') == "none") {
            $('#slleftTail5').show();
        }
        else {
            $('#slleftTail5').hide();
        }
    }
    else if (type == "RightTail1") {
        if ($('#slrightTail1').css('display') == "none") {
            $('#slrightTail1').show();
        }
        else {
            $('#slrightTail1').hide();
        }
    }
    else if (type == "RightTail2") {
        if ($('#slrightTail2').css('display') == "none") {
            $('#slrightTail2').show();
        }
        else {
            $('#slrightTail2').hide();
        }
    }
    else if (type == "RightTail3") {
        if ($('#slrightTail3').css('display') == "none") {
            $('#slrightTail3').show();
        }
        else {
            $('#slrightTail3').hide();
        }
    }
    else if (type == "RightTail4") {
        if ($('#slrightTail4').css('display') == "none") {
            $('#slrightTail4').show();
        }
        else {
            $('#slrightTail4').hide();
        }
    }
    else if (type == "RightTail5") {
        if ($('#slrightTail5').css('display') == "none") {
            $('#slrightTail5').show();
        }
        else {
            $('#slrightTail5').hide();
        }
    }
}


function hideANDShowRows(type) {
    debugger;
    var num = 0;
    var num2 = 0;

    if ($("#txtHead").val().trim() != "") {
        num = $("#txtHead").val().trim();
    }
    if ($("#txtTail").val().trim() != "") {
        num2 = $("#txtTail").val().trim();
    }
    if (type == "H") {
        if (num == 1) {
            $('#Head1').show();
            $('#Head2').hide();
            $('#Head3').hide();

        }
        else if (num == 2) {
            $('#Head1').show();
            $('#Head2').show();
            $('#Head3').hide();
           
        }
        else if (num == 3) {
            $('#Head1').show();
            $('#Head2').show();
            $('#Head3').show();
           
        }
    }
    else if (type == "T") {
        if (num2 == 1) {
            $('#Tail1').show();
            $('#Tail2').hide();
            $('#Tail3').hide();
            $('#Tail4').hide();
            $('#Tail5').hide();


        }
        else if (num2 == 2) {
            $('#Tail1').show();
            $('#Tail2').show();
            $('#Tail3').hide();
            $('#Tail4').hide();
            $('#Tail5').hide();

        }
        else if (num2 == 3) {
            $('#Tail1').show();
            $('#Tail2').show();
            $('#Tail3').show();
            $('#Tail4').hide();
            $('#Tail5').hide();

        }
        else if (num2 == 4) {
            $('#Tail1').show();
            $('#Tail2').show();
            $('#Tail3').show();
            $('#Tail4').show();
            $('#Tail5').hide();

        }
        else if (num2 == 5) {
            $('#Tail1').show();
            $('#Tail2').show();
            $('#Tail3').show();
            $('#Tail4').show();
            $('#Tail5').show();
        }
    }
   
}

function hideAllWheelsIn() {
    debugger;
    $('#slleft1').hide();
    $('#slleft2').hide();
    $('#slleft3').hide();
   
    $('#slleftTail1').hide();
    $('#slleftTail2').hide();
    $('#slleftTail3').hide();
    $('#slleftTail4').hide();
    $('#slleftTail5').hide();



    $('#slright1').hide();
    $('#slright2').hide();
    $('#slright3').hide();

    $('#slrightTail1').hide();
    $('#slrightTail2').hide();
    $('#slrightTail3').hide();
    $('#slrightTail4').hide();
    $('#slrightTail5').hide();



    //rows
    $('#Head1').hide();
    $('#Head2').hide();
    $('#Head3').hide();
   
    $('#Tail1').hide();
    $('#Tail2').hide();
    $('#Tail3').hide();
    $('#Tail4').hide();
    $('#Tail5').hide();


}