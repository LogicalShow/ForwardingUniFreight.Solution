function IntializePage()
{
    CallGETFunctionWithParameters("/api/LicenseExpireDateAlarmsUsers/GetUsers"
        ,
        { }
        , function (pData) {
            //  FillDivWithCheckboxes_DynamicFiled("divCbUserSalesmen", pData[0], "nameCbUserSalesmen", "Name", null);
            FadePageCover(false);

            var LicenseExpireDateAlarmsUsers = JSON.parse(pData[0]);

            var SelectedUserIDs = LicenseExpireDateAlarmsUsers.map(item => item.UserID);
            FillDivWithCheckboxes_DynamicFiledWithCheckedValsLicenseExpireDateAlarmsUsers("divCbUser", pData[1], "nameCbUser", "Name", SelectedUserIDs);

        }
        , null);
}

function FillDivWithCheckboxes_DynamicFiledWithCheckedValsLicenseExpireDateAlarmsUsers(pDivName, pData, pCheckboxNameAttr, FieldName, pArrCheckedVals, callback)
{
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


function cbCheckAllUserChanged() {
    debugger;
    if ($("#cbCheckAllUser").prop("checked"))
        $("#divCbUser input[name=nameCbUser]").prop("checked", true);
    else
        $("#divCbUser input[name=nameCbUser]").prop("checked", false);
}

function cbUnCheckAllUserChanged() {
    $("#divCbUser input[name=nameCbUser]").prop("checked", false);
}

function cbdisableCheckAllUserChanged() {
    $("#divCbUser input[name=nameCbUser]").prop("disabled", false);
}

function UpdateLicenseExpireDateAlarmsUsers(pSaveandAddNew) {
    debugger
    var data =
    {
        "pUserIDs": IsNull(GetAllSelectedIDsAsStringWithNameAttr("nameCbUser"), "0")
    };

    PostInsertUpdateFunction("form", "/api/LicenseExpireDateAlarmsUsers/UpdateLicenseExpireDateAlarmsUsers", data, pSaveandAddNew, null, function () {

        swal("Done !", "Is Updated", "success");
    });
}