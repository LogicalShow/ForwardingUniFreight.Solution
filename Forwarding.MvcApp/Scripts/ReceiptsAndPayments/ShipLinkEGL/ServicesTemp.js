// City Country ---------------------------------------------------------------
// Bind ServicesTemp Table Rows
function ServicesTemp_BindTableRows(pServicesTemp) {
    debugger;
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblServicesTemp");
    $.each(pServicesTemp, function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblServicesTemp",
            ("<tr ID='" + item.ID + "' ondblclick='ServicesTemp_EditByDblClick(" + item.ID + ");'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Name' val='" + item.Name + "'>" + item.Name + "</td>"
                + "<td class='AccountID' val='" + item.AccountID + "'>" + item.AccountName + "</td>"
                + "<td class='taxID' val='" + item.taxID + "'>" + item.TaxeName + "</td>"
                + "<td class='IsPurchase hide' val='" + item.IsPurchase + "'>" + item.Purchase + "</td>"
                + "<td class='SubAccountID' val='" + item.SubAccountID + "'>" + (item.SubAccountName == "0" ? "-" : item.SubAccountName) + "</td>"
                + "<td class='CostCenterID hide' val='" + item.CostCenterID + "'>" + "0" + "</td>"
                + "<td class='PortalCode' val='" + item.PortalCode + "'>" + item.PortalCode + "</td>"
                + "<td class='AccountID2 hide' val='" + item.AccountID2 + "'>" + item.AccountName2 + "</td>"
                + "<td class='SubAccountID2 hide' val='" + item.SubAccountID2 + "'>" + (item.SubAccountName2 == "0" ? "-" : item.SubAccountName2) + "</td>"

                + "<td class='hServicesTemp'><a href='#ServicesTempModal' data-toggle='modal' onclick='ServicesTemp_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    GetListComboWithName(null, "/api/TaxeTypes/LoadAll", "not null", "slTax", "ID", "Name");
    GetListComboWithName(null, "/api/ServicesTemp/LoadAll", "not null", "slServiceType", "ID", "Purchase");


    ApplyPermissions();
    BindAllCheckboxonTable("tblServicesTemp", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblServicesTemp>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function GetListComboWithName(pID, pStrFnName, pSelectTxt, pSlName, pTableID, pColumnName, callback) {
    debugger;
    $.ajax({
        type: "GET",
        url: strServerURL + pStrFnName,
        data: { pWhereClause: " 1=1 ", pOrderBy: pTableID },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            ClearAllOptions(pSlName);
            var option = "";
            if (pSelectTxt != "null") {
                option = '<option value="">' + TranslateString("SelectFromMenu") + '</option>';
            }

            // Bind Data
            $.each(JSON.parse(data), function (i, item) {
                if (pID != null && pID != undefined) //in case of editing
                    if (pID == item[pTableID])
                        option += '<option value="' + item[pTableID] + '" selected >' + item[pColumnName] + '</option>';
                    else
                        option += '<option value="' + item[pTableID] + '">' + item[pColumnName] + '</option>';
                else
                    option += '<option value="' + item[pTableID] + '">' + item[pColumnName] + '</option>';
            });


            $("#" + pSlName).append(option);

            if (callback != null && callback != undefined)
                callback();

        },
        error: function (jqXHR, exception) {
            swal("Oops!", "Please, contact your technical support! GetListComboWithName in mainapp.master.js", "error");
        }
    });
}
function ServicesTemp_EditByDblClick(pID) {
    jQuery("#ServicesTempModal").modal("show");
    ServicesTemp_FillControls(pID);
}
// Loading with data
function ServicesTemp_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/ServicesTemp/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { ServicesTemp_BindTableRows(pTabelRows); ServicesTemp_ClearAllControls(); });
    HighlightText("#tblServicesTemp>tbody>tr", $("#txt-Search").val().trim());
}

//var IsOldName = "0";

function ServicesTemp_Insert(pSaveandAddNew) {


    //$('#hidden_slstoresnames > option').each(function (i, option)
    //{
    //    if ($(option).text().trim().toUpperCase() == $("#txtStoreName").val().trim().toUpperCase()) {
    //      //  IsOldName = "1";
    //        swal("Sorry", "The Store Name is duplicated in the System", "warning");
    //        return false;

    //    }
    //    else if (i == ($('#hidden_slstoresnames > option').length - 1))
    //    {
    if ($('#slSubAccountID option').length > 1 && $('#slSubAccountID').val() == "0") {

        swal("Excuse me", "You must select SubAccount", "warning");

    }
    else if ($('#slSubAccountID2 option').length > 1 && $('#slSubAccountID2').val() == "0") {

        swal("Excuse me", "You must select Revenue SubAccount", "warning");

    }
    else {
        debugger;
        InsertUpdateFunction("form", "/api/ServicesTemp/Insert", {
            pName: $("#txtName").val().trim().toUpperCase(),
            pAccountID: $("#slAccountID").val().trim(),
            pSubAccountID: ($("#slSubAccountID").val() == "" || $("#slSubAccountID").val() == null) ? 0 : $("#slSubAccountID").val(),
            ptaxID: $("#slTax").val().trim() == "" ? 0 : $("#slTax").val().trim(),
            pIsPurchase: $("#slServiceType").val() == "0" ? "0" : "1",
            pPortalCode: $("#txtPortalCode").val().toUpperCase(),
             pAccountID2: $("#slAccountID2").val(),
            pSubAccountID2: ($("#slSubAccountID2").val() == "" || $("#slSubAccountID2").val() == null) ? 0 : $("#slSubAccountID2").val()
        }, pSaveandAddNew, "ServicesTempModal", function () {
            ServicesTemp_LoadingWithPaging();
            //IntializeData();
        });
    }
    //    }

    //});


}


function ServicesTemp_Update(pSaveandAddNew) {


    //$('#hidden_slstoresnames > option').each(function (i, option)
    //{
    //    if ($(option).text().trim().toUpperCase() == $("#txtStoreName").val().trim().toUpperCase()) {
    //      //  IsOldName = "1";
    //        swal("Sorry", "The Store Name is duplicated in the System", "warning");
    //        return false;

    //    }
    //    else if (i == ($('#hidden_slstoresnames > option').length - 1))
    //    {
    if ($('#slSubAccountID option').length > 1 && $('#slSubAccountID').val() == "0") {

        swal("Excuse me", "You must select SubAccount", "warning");

    }
    else if ($('#slSubAccountID2 option').length > 1 && $('#slSubAccountID2').val() == "0") {

        swal("Excuse me", "You must select Revenue SubAccount", "warning");

    }
    else {
        debugger;
        InsertUpdateFunction("form", "/api/ServicesTemp/Update", {
            pID: $("#hID").val(),
            pName: $("#txtName").val().toUpperCase(),
            pAccountID: $("#slAccountID").val(),
            pSubAccountID: ($("#slSubAccountID").val() == "" || $("#slSubAccountID").val()==null)? 0 : $("#slSubAccountID").val(),
            ptaxID: $("#slTax").val() == "" ? 0 : $("#slTax").val(),
            pIsPurchase: $("#slServiceType").val() == "0" ? "0" : "1",
            pPortalCode: $("#txtPortalCode").val().toUpperCase(),
            pAccountID2: $("#slAccountID2").val(),
            pSubAccountID2: ($("#slSubAccountID2").val() == "" || $("#slSubAccountID2").val() == null) ? 0 : $("#slSubAccountID2").val()

        }, pSaveandAddNew, "ServicesTempModal", function () {
            ServicesTemp_LoadingWithPaging();
            //IntializeData();
        });
        //    }

        //});

    }
}
function IntializeData() {

    FadePageCover(true);
    $.ajax({
        type: "GET",
        url: strServerURL + "api/ServicesTemp/IntializeData",
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




function ServicesTemp_Delete(pID) {
    DeleteListFunction("/api/ServicesTemp/DeleteByID", { "pID": pID }, function () { ServicesTemp_LoadingWithPaging(); });
}

function ServicesTemp_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblServicesTemp') != "")
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
                DeleteListFunction("/api/ServicesTemp/Delete", { "pServicesTempIDs": GetAllSelectedIDsAsString('tblServicesTemp') }, function () { ServicesTemp_LoadingWithPaging(); });
            });
    //DeleteListFunction("/api/ServicesTemp/Delete", { "pServicesTempIDs": GetAllSelectedIDsAsString('tblServicesTemp') }, function () { ServicesTemp_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
function ServicesTemp_FillControls(pID) {
    debugger;
    ClearAll("#ServicesTempModal", null);
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");
    $("#txtName").val($(tr).find("td.Name").attr('val').toUpperCase());
    $("#txtPortalCode").val($(tr).find("td.PortalCode").attr('val').toUpperCase());

    $("#slAccountID").val($(tr).find("td.AccountID").attr('val'));
    //$("#slServiceType").val($(tr).find("td.IsPurchase").attr('val'));

    $("#slAccountID").val($(tr).find("td.AccountID").attr('val'));
    $("#slAccountID2").val($(tr).find("td.AccountID2").attr('val'));

    GetListComboWithName($(tr).find("td.IsPurchase").attr('val'), "/api/ServicesTemp/LoadAll", "null", "slServiceType", "ID", "Purchase");
    Details_FillSlSubAccount("slSubAccountID", $(tr).find("td.SubAccountID").attr('val'));
    Details_FillSlSubAccount2("slSubAccountID2", $(tr).find("td.SubAccountID2").attr('val'));

    //Fill_SelectInput_WithDependedID("api/ServicesTemp/IntializeData", "ID", "SubAccount_Name", "Select SubAccount", "#slSubAccountID", $(tr).find("td.SubAccountID").attr('val'), $(tr).find("td.AccountID").attr('val'));
    if ($(tr).find("td.taxID").text() != 0) {
        GetListComboWithName($(tr).find("td.taxID").attr('val'), "/api/TaxeTypes/LoadAll", "null", "slTax", "ID", "Name");
    }
    else {
       // GetListComboWithName(null, "/api/slTax/LoadAll", "not null", "slDisbursementJobs", "ID", "Name");
        GetListComboWithName(null, "/api/TaxeTypes/LoadAll", "not null", "slTax", "ID", "Name");

    }
    //$("#slSubAccountID").val($(tr).find("td.SubAccountID").attr('val'));
    $("#btnSave").attr("onclick", "ServicesTemp_Update(false);");
    $("#btnSaveandNew").attr("onclick", "ServicesTemp_Update(true);");
}

function ServicesTemp_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#ServicesTempModal", null);
    $('#slSubAccountID').html('');
    $("#btnSave").attr("onclick", "ServicesTemp_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "ServicesTemp_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
}


function GetSubAccount() {
    //Fill_SelectInputAfterLoadData(d[1], 'ID', , '<-- select SubAccount -->', '#hidden_slSubAccountID', '');

    Fill_SelectInput_WithDependedID("api/ServicesTemp/IntializeData", "ID", "SubAccount_Name", "Select SubAccount", "#slSubAccountID", null, $('#slAccountID').val());
}
function Details_FillSlSubAccount(pSlName, pSubAccountID) {
    debugger;
    if ($("#slAccountID").val() == 0) //No Account is selected so just empty subaccounts
        $("#slSubAccountID").html("<option value=0>" + TranslateString("SelectFromMenu") + "</option>");
    else {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/ChartOfLinkingAccounts/LoadSubAccountDetails"
            , {
                pLanguage: $("[id$='hf_ChangeLanguage']").val()
                , pWhereClauseSubAccountDetails: "WHERE IsMain=0 AND Account_ID=" + $("#slAccountID").val()
                , pOrderBy: "Name"
            }
            , function (pData) {
                FillListFromObject_ERP(pSubAccountID, 4/*pCodeOrName*/, TranslateString("SelectFromMenu"), pSlName, pData[0], null);
                //Start Auto Filter
                $("#" + pSlName).trigger("change");
                //End Auto Filter
                FadePageCover(false);
            }
            , null);
    }
}
function Details_FillSlSubAccount2(pSlName, pSubAccountID) {
    debugger;
    if ($("#slAccountID2").val() == 0) //No Account is selected so just empty subaccounts
        $("#slSubAccountID2").html("<option value=0>" + TranslateString("SelectFromMenu") + "</option>");
    else {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/ChartOfLinkingAccounts/LoadSubAccountDetails"
            , {
                pLanguage: $("[id$='hf_ChangeLanguage']").val()
                , pWhereClauseSubAccountDetails: "WHERE IsMain=0 AND Account_ID=" + $("#slAccountID2").val()
                , pOrderBy: "Name"
            }
            , function (pData) {
                FillListFromObject_ERP(pSubAccountID, 4/*pCodeOrName*/, TranslateString("SelectFromMenu"), pSlName, pData[0], null);
                //Start Auto Filter
                $("#" + pSlName).trigger("change");
                //End Auto Filter
                FadePageCover(false);
            }
            , null);
    }
}

function ExportExcel() {


    var arr_Keys = new Array();
    var arr_Vlaues = new Array();
    arr_Keys.push("ID");
    arr_Vlaues.push("1");

    var pParametersWithValues =
    {
        arr_Keys: arr_Keys
        , arr_Vlaues: arr_Vlaues
        , pTitle: "ExportServicesTemp"
        , pReportName: "ExportServicesTemp"
    };
    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintBySingleID?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Vlaues=' + pParametersWithValues.arr_Vlaues + '&pReportName=' + pParametersWithValues.pReportName + '';

    win.location = url;

}