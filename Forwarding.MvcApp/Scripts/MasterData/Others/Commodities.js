// Commodities Region ---------------------------------------------------------------
// Bind Commodities Table Rows
function Commodities_BindTableRows(pCommodities) {
    if (glbCallingControl == "Commodities")
        $("#hl-menu-MasterData").parent().addClass("active");
    else
        $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblCommodities");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pCommodities, function (i, item) {
        AppendRowtoTable("tblCommodities",
        ("<tr ID='" + item.ID + "' ondblclick='Commodities_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code'>" + (item.Code == 0 ? "" : item.Code) + "</td>"
                    + "<td class='Name'>" + item.Name + "</td>"
                    + "<td class='LocalName'>" + (item.LocalName == 0 ? "" : item.LocalName) + "</td>"
                    + "<td class='IMOClass hide'>" + (item.IMOClass == 0 ? "" : item.IMOClass) + "</td>"
                    + "<td class='UNNumber hide'>" + (item.UNNumber == 0 ? "" : item.UNNumber) + "</td>"
                    + "<td class='IsIMO hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsIMO == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsInactive'> <input type='checkbox' disabled='disabled' val='" + (item.IsInactive == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='Notes'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                    + "<td class='CommercialName hide'>" + (item.CommercialName == 0 ? "" : item.CommercialName) + "</td>"
                    + "<td class='LoadingTemperature hide'>" + (item.LoadingTemperature == 0 ? "" : item.LoadingTemperature) + "</td>"
                    + "<td class='UnloadingTemperature hide'>" + (item.UnloadingTemperature == 0 ? "" : item.UnloadingTemperature) + "</td>"
                    + "<td class='Density hide'>" + (item.Density == 0 ? "" : item.Density) + "</td>"
                    + "<td class='hide'><a href='#CommodityModal' data-toggle='modal' onclick='Commodities_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblCommodities", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblCommodities>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function Commodities_EditByDblClick(pID) {
    jQuery("#CommodityModal").modal("show");
    Commodities_FillControls(pID);
}
// Loading with data
function Commodities_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Commodities/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { Commodities_BindTableRows(pTabelRows); Commodities_ClearAllControls(); });
    HighlightText("#tblCommodities>tbody>tr", $("#txt-Search").val().trim());
    //if (callbackForDeleteFail != null)
    //    callbackForDeleteFail();
}
////sherif: Loading with data and search key
//function Commodities_LoadingWithPagingAndSearch() {//$("#txt-Search").val() is the search key which will be used in the where clause
//    debugger;
//    LoadWithPagingAndSearch("/api/Commodities/LoadWithPaging", $("#txt-Search").val().trim(), ($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1), $('#select-page-size').val().trim(), function (pTabelRows) {
//        Commodities_BindTableRows(pTabelRows); Commodities_ClearAllControls(); if ($("#txt-Search").val() != "" && $("#txt-Search").val() != undefined)
//            HighlightText("#tblCommodities>tbody>tr", $("#txt-Search").val().trim());
//    });
//}

// calling web function to add new Commodity item.
function Commodities_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/Commodities/Insert", {
        pCode: $("#txtCode").val().trim()
        , pName: $("#txtName").val().trim()
        , pLocalName: $("#txtLocalName").val().trim()
        , pNotes: (pDefaults.UnEditableCompanyName == "GBL"
                    ? ($("#slFilterCharge").val() == "" ? "" : $("#slFilterCharge option:selected").text())
                    : ($("#txtNotes").val() == null ? "" : $("#txtNotes").val().trim())
                )
        , pIMOClass: ($("#txtIMOClass").val().trim() == "" ? 0 : $("#txtIMOClass").val().trim())
        , pUNNumber: ($("#txtUNNumber").val().trim() == "" ? 0 : $("#txtUNNumber").val().trim())
        , pIsInactive: $("#cbIsInactive").prop('checked')
        , pIsIMO: $("#cbIsIMO").prop('checked')
        , pCommercialName: ($("#txtCommercialName").val().trim() == "" ? 0 : $("#txtCommercialName").val().trim())
        , pLoadingTemperature: ($("#txtLoadingTemperature").val().trim() == "" ? 0 : $("#txtLoadingTemperature").val().trim())
        , pUnloadingTemperature: ($("#txtUnloadingTemperature").val().trim() == "" ? 0 : $("#txtUnloadingTemperature").val().trim())
        , pDensity: ($("#txtDensity").val().trim() == "" ? 0 : $("#txtDensity").val().trim())

    }, pSaveandAddNew, "CommodityModal", function () { Commodities_LoadingWithPaging(); });
}

//calling this function for update
function Commodities_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/Commodities/Update", {
        pID: $("#hID").val(), pCode: $("#txtCode").val().trim()
        , pName: $("#txtName").val().trim()
        , pLocalName: $("#txtLocalName").val().trim()
        , pNotes: (pDefaults.UnEditableCompanyName == "GBL"
                    ? ($("#slFilterCharge").val() == "" ? "" : $("#slFilterCharge option:selected").text())
                    : ($("#txtNotes").val() == null ? "" : $("#txtNotes").val().trim())
                )
        , pIMOClass: ($("#txtIMOClass").val().trim() == "" ? 0 : $("#txtIMOClass").val().trim())
        , pUNNumber: ($("#txtUNNumber").val().trim() == "" ? 0 : $("#txtUNNumber").val().trim())
        , pIsInactive: $("#cbIsInactive").prop('checked')
        , pIsIMO: $("#cbIsIMO").prop('checked')
        , pCommercialName: ($("#txtCommercialName").val().trim() == "" ? 0 : $("#txtCommercialName").val().trim())
        , pLoadingTemperature: ($("#txtLoadingTemperature").val().trim() == "" ? 0 : $("#txtLoadingTemperature").val().trim())
        , pUnloadingTemperature: ($("#txtUnloadingTemperature").val().trim() == "" ? 0 : $("#txtUnloadingTemperature").val().trim())
        , pDensity: ($("#txtDensity").val().trim() == "" ? 0 : $("#txtDensity").val().trim())
        //pCommercialName pLoadingTemperature pUnloadingTemperature pDensity
    }, pSaveandAddNew, "CommodityModal", function () { Commodities_LoadingWithPaging(); });
}

function Commodities_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblCommodities') != "")
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
            DeleteListFunction("/api/Commodities/Delete", { "pCommoditiesIDs": GetAllSelectedIDsAsString('tblCommodities') }, function () {
                Commodities_LoadingWithPaging(
                    //this is callback in Commodities_LoadingWithPaging
                    //function() {swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");}
                    );
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}

//after pressing edit, this function fills the data
function Commodities_FillControls(pID) {
    debugger;
    ClearAll("#CommodityModal");
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    $("#lblShown").html(": " + $(tr).find("td.Name").text());
    $("#txtCode").val($(tr).find("td.Code").text());
    $("#txtName").val($(tr).find("td.Name").text());
    $("#txtLocalName").val($(tr).find("td.LocalName").html());
    if (pDefaults.UnEditableCompanyName == "GBL")
        $("#slFilterCharge").val($(tr).find("td.Notes").text());
    else
        $("#txtNotes").val($(tr).find("td.Notes").text());
    $("#txtIMOClass").val($(tr).find("td.IMOClass").text());
    $("#txtUNNumber").val($(tr).find("td.UNNumber").text());
    $("#cbIsInactive").prop('checked', $(tr).find('td.IsInactive').find('input').attr('val'));
    $("#cbIsIMO").prop('checked', $(tr).find('td.IsIMO').find('input').attr('val'));

    //pCommercialName pLoadingTemperature pUnloadingTemperature pDensity
    $("#txtCommercialName").val($(tr).find("td.CommercialName").text());
    $("#txtLoadingTemperature").val($(tr).find("td.LoadingTemperature").text());
    $("#txtUnloadingTemperature").val($(tr).find("td.UnloadingTemperature").text());
    $("#txtDensity").val($(tr).find("td.Density").text());

    $("#btnSave").attr("onclick", "Commodities_Update(false);");
    $("#btnSaveandNew").attr("onclick", "Commodities_Update(true);");
    EnableDisableIMOProprties();

}

function Commodities_ClearAllControls(callback) {
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName", "txtNotes"), null, new Array("cbIsInactive"));//an alternative fn is with abdelmawgood
    ClearAll("#CommodityModal");

    $("#btnSave").attr("onclick", "Commodities_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "Commodities_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    EnableDisableIMOProprties();

    if (callback != null && callback != undefined)
        callback();
}
//EOF Region Commodity ---------------------------------------------------------------
function EnableDisableIMOProprties() {
    if ($("#cbIsIMO").prop("checked")) {
        $("#txtIMOClass").removeAttr("disabled");
        $("#txtUNNumber").removeAttr("disabled");
        $("#txtFlashPoint").removeAttr("disabled");
    }
    else {
        $("#txtIMOClass").attr("disabled", "disabled");
        $("#txtIMOClass").val(0);
        $("#txtUNNumber").attr("disabled", "disabled");
        $("#txtUNNumber").val(0);
    }
}

//*********************************Uploaded Files***************************************//
function DocsIn_FillControls() {
    debugger;
    glbGeneralUploadModalName = "DocsInModal"; //if the upload is in a modal then is not opened
    glbGeneralUploadTableName = "tblDocsIn";
    glbGeneralUploadFolderName = $("#hID").val() == "" ? "" : $("#txtName").val().trim();
    glbGeneralUploadPath = "/DocsInFiles//Commodity//";
    glbGeneralUploadRelativePath = "~/DocsInFiles/Commodity/";
    glbGeneralUploadBtnUploadName = "inputFileUpload";
    glbTblTHSelectAllTagName = "HeaderDeleteDocsInID";
    glbTblInputSelectAllInputName = "cb-CheckAll-DocsIn";

    GeneralUpload_FillControls();
}
//*********************************EOF Uploaded Files***************************************//
//*********************************Upload Excel***************************************//
function UploadExcelFile() {
    debugger;

    // Checking whether FormData is available in browser  
    if (window.FormData !== undefined) {

        var data = new FormData();

        var files = $("#ExcelCommodity").get(0).files;

        // Add the uploaded image content to the form data collection
        if (files.length > 0) {
            data.append(files[0].name, files[0]);
            FadePageCover(true);
            $.ajax({
                url: '/api/Commodities/UploadExcel',
                type: "POST",
                contentType: false, // Not to set any content header  
                processData: false, // Not to process data  
                data: data,
                success:
                    function (result) {
                        debugger;
                        FadePageCover(false);
                        if (result.resultCode == 1) {
                            swal("Success", "File Uploaded successfully.");
                            PurchaseItem_LoadingWithPaging();
                            PurchaseItem_GetAvailableUsers();
                        }
                        else if (result.exception != "")
                            swal("Sorry", "File Uploading failed .. " + result.exception);
                        else if (result.MissingFields != "")
                            swal("Sorry", "File Uploading failed .. " + result.MissingFields);
                        else if (result.ExistedName != "")
                            swal("Sorry", "File Uploading failed .. " + result.ExistedName);
                    }
                ,
                error: function (err) {
                    FadePageCover(false);
                    swal("Sorry", err.statusText);
                    $('#btnImportExcel').prop('disabled', false);
                }

            });
        }
        else {
            swal("Sorry", "Choose Excel File");
            $('#btnImportExcel').prop('disabled', false);
        }
    }
    else {
        alert("FormData is not supported.");
        $('#btnImportExcel').prop('disabled', false);
    }

}
function sendEmailAfterUpload() {
    var pModalName = "CheckboxesListModal";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pSelectedAlarmReceiversIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
    if (pSelectedAlarmReceiversIDs == "")
        swal("Sorry", "Please, select receivers.");
    else {
        var pSubject = "Products Upload";
        var pBody = "Sender: " + pLoggedUser.Name;
        pBody += "<br> New products are uploaded sucessfully!";
        var pOperationID = 0;
        var pIsSendNormalEmail = true;
        SendNormalAndLocalEmail(pSubject, pBody, pOperationID, pIsSendNormalEmail);
    }
}
function PurchaseItem_GetAvailableUsers() {
    debugger;
    Receptionists_GetAvailableUsers();
    $("#btnCheckboxesListApply").attr("onclick", "sendEmailAfterUpload();");
    $("#btnCheckboxesListApply").html("<span class='glyphicon glyphicon-send'></span> Send");
    $("#btn-SearchItems").attr("onclick", "PurchaseItem_GetAvailableUsers();");
}
//*********************************EOF Upload Excel***************************************//