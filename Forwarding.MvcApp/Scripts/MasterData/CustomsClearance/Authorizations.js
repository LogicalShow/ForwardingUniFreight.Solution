// Authorizations Region ---------------------------------------------------------------
function LoadDates()
{
    debugger;
    $("#date_registration_EndDate").hijriDatePicker({
        locale: "ar-sa",

        //format: "DD-MM-YYYY",
        //hijriFormat:"iYYYY-iMM-iDD",

        //dayViewHeaderFormat: "MMMM YYYY",
        //hijriDayViewHeaderFormat: "iMMMM iYYYY",
        showSwitcher: true,

        allowInputToggle: true,
        showTodayButton: false,
        useCurrent: true,
        isRTL: false,
        keepOpen: false,
        hijri: false,
        debug: true,
        showClear: true,
        showTodayButton: true,
        showClose: true
    });
    $("#date_StartDate").hijriDatePicker({
        locale: "ar-sa",

        //format: "DD-MM-YYYY",
        //hijriFormat:"iYYYY-iMM-iDD",

        //dayViewHeaderFormat: "MMMM YYYY",
        //hijriDayViewHeaderFormat: "iMMMM iYYYY",
        showSwitcher: true,

        allowInputToggle: true,
        showTodayButton: false,
        useCurrent: true,
        isRTL: false,
        keepOpen: false,
        hijri: false,
        debug: true,
        showClear: true,
        showTodayButton: true,
        showClose: true
    });
    $("#date_EndDate").hijriDatePicker({
        locale: "ar-sa",

        //format: "DD-MM-YYYY",
        //hijriFormat:"iYYYY-iMM-iDD",

        //dayViewHeaderFormat: "MMMM YYYY",
        //hijriDayViewHeaderFormat: "iMMMM iYYYY",
        showSwitcher: true,

        allowInputToggle: true,
        showTodayButton: false,
        useCurrent: true,
        isRTL: false,
        keepOpen: false,
        hijri: true,
        debug: true,
        showClear: true,
        showTodayButton: true,
        showClose: true
    });
}
// Bind Authorizations Table Rows
function Authorizations_BindTableRows(pAuthorizations) {
    debugger;
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblAuthorizations");
    var editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pAuthorizations, function (i, item) {
        AppendRowtoTable("tblAuthorizations",
        ("<tr ID='" + item.ID + "' ondblclick='Authorizations_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='AuthorizationNumber'>" + (item.AuthorizationNumber == 0 ? "" : item.AuthorizationNumber) + "</td>"
                    + "<td class='CustomerID'>" + (item.CustomerID == 0 ? "" : item.CustomerID) + "</td>"
                    + "<td class='registrationNumber'>" + (item.registrationNumber == 0 ? "" : item.registrationNumber) + "</td>"
                    + "<td class='registration_EndDate'>" + ConvertDateFormat(GetDateWithFormatMDY((item.registration_EndDate == 0 ? "" : item.registration_EndDate).replace(/\//g, '-'))) + "</td>"
                    + "<td class='OwnerNumber'>" + (item.OwnerNumber == 0 ? "" : item.OwnerNumber) + "</td>"
                    + "<td class='StartDate'>" + ConvertDateFormat(GetDateWithFormatMDY((item.StartDate == 0 ? "" : item.StartDate).replace(/\//g, '-'))) + "</td>"
                     + "<td class='EndDate'>" + ConvertDateFormat(GetDateWithFormatMDY((item.EndDate == 0 ? "" : item.EndDate).replace(/\//g, '-'))) + "</td>"
                     + "<td class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                      + "<td class='ImageName hide'>" + (item.FileName == 0 ? "" : item.FileName) + "</td>"
                    + "<td class='hide'><a href='#AuthorizationsModal' data-toggle='modal' onclick='Authorizations_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblAuthorizations", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblAuthorizations>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function Authorizations_EditByDblClick(pID) {
    jQuery("#AuthorizationsModal").modal("show");
    Authorizations_FillControls(pID);
}
// Loading with data
function Authorizations_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Authorizations/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(),
        function (pTabelRows)
        {
            Authorizations_BindTableRows(pTabelRows);
            Authorizations_ClearAllControls();
        });
    HighlightText("#tblAuthorizations>tbody>tr", $("#txt-Search").val().trim());
    //if (callbackForDeleteFail != null)
    //    callbackForDeleteFail();
}

function Authorizations_Insert(pSaveandAddNew) {
    debugger;
    if ($('#date_registration_EndDate').val().split('-')[2] > 2000 && $('#date_StartDate').val().split('-')[2] > 2000 && $('#date_EndDate').val().split('-')[2] > 2000) {
        maxTotalSize = 20971520;//20MB total of uploaded files together
        var formData = new FormData();
        var files = $("#inputFileUpload").get(0).files;
        var totalFilesSize = 0;
        if (files.length >= 0) {
            //check files total size is less than 20MB
            for (i = 0; i < files.length; i++)
                totalFilesSize += files[i].size;
            if (totalFilesSize > maxTotalSize)
                swal(strSorry, "Total file(s) size can't exceed 20MBs at one upload.");
            else {
                if (files.length > 0) {
                    FadePageCover(true);
                    for (i = 0; i < files.length; i++)
                        formData.append("FileNames", files[i].name);
                }
                formData.append("file", files[0]);
                formData.append("pID", 0);
                formData.append("pAuthorizationNumber", $('#txtAuthorizationNumber').val());
                formData.append("pCustomerID", $('#slCustomers').val());
                formData.append("pregistrationNumber", $('#txtregistrationNumber').val());
                formData.append("pregistration_EndDate", $('#date_registration_EndDate').val().indexOf("-") > 0 ? ConvertDateFormat($('#date_registration_EndDate').val().replace(/-/g, '/')) : ConvertDateFormat($('#date_registration_EndDate').val()));
                formData.append("pOwnerNumber", $('#txtOwnerNumber').val());
                formData.append("pStartDate", $('#date_StartDate').val().indexOf("-") > 0 ? ConvertDateFormat($('#date_StartDate').val().replace(/-/g, '/')) : ConvertDateFormat($('#date_StartDate').val()));
                formData.append("pEndDate", $('#date_EndDate').val().indexOf("-") > 0 ? ConvertDateFormat($('#date_EndDate').val().replace(/-/g, '/')) : ConvertDateFormat($('#date_EndDate').val()));
                formData.append("pNotes", $('#txtNotes').val());

                var ajaxRequest = $.ajax({
                    type: "POST",
                    url: "/api/Authorizations/Authorizations_Insert_Update",
                    contentType: false,
                    processData: false,
                    data: formData,
                    success: function (data) { //data[0]: The filenames returned
                        debugger;
                        Authorizations_LoadingWithPaging();
                        if (pSaveandAddNew == false)
                            jQuery("#AuthorizationsModal").modal("hide");
                    },
                    error: function (jqXHR, exception) {
                        FadePageCover(false);
                        swal(strSorry, "An error occured, please try again.");
                    }
                });
                ajaxRequest.done(function (xhr, textStatus) {
                    debugger;
                });
            }
        }

    }
}

function Authorizations_Update(pSaveandAddNew) 
{
    debugger;
    if ($('#date_registration_EndDate').val().split('-')[2] > 2000 && $('#date_StartDate').val().split('-')[2] > 2000 && $('#date_EndDate').val().split('-')[2] > 2000) 
    {
        maxTotalSize = 20971520;//20MB total of uploaded files together
        var formData = new FormData();
        var files = $("#inputFileUpload").get(0).files;
        var totalFilesSize = 0;
        if (files.length >= 0) 
        {
            //check files total size is less than 20MB
            for (i = 0; i < files.length; i++)
                totalFilesSize += files[i].size;
            if (totalFilesSize > maxTotalSize)
                swal(strSorry, "Total file(s) size can't exceed 20MBs at one upload.");
            else {
                if (files.length > 0) {
                    FadePageCover(true);
                    for (i = 0; i < files.length; i++)
                        formData.append("FileNames", files[i].name);
                }
                formData.append("file", files[0]);
                formData.append("pID", $("#hID").val());
                formData.append("pAuthorizationNumber", $('#txtAuthorizationNumber').val());
                formData.append("pCustomerID", $('#slCustomers').val());
                formData.append("pregistrationNumber", $('#txtregistrationNumber').val());
                formData.append("pregistration_EndDate", $('#date_registration_EndDate').val().indexOf("-") > 0 ? ConvertDateFormat($('#date_registration_EndDate').val().replace(/-/g, '/')) : ConvertDateFormat($('#date_registration_EndDate').val()));
                formData.append("pOwnerNumber", $('#txtOwnerNumber').val());
                formData.append("pStartDate", $('#date_StartDate').val().indexOf("-") > 0 ? ConvertDateFormat($('#date_StartDate').val().replace(/-/g, '/')) : ConvertDateFormat($('#date_StartDate').val()));
                formData.append("pEndDate", $('#date_EndDate').val().indexOf("-") > 0 ? ConvertDateFormat($('#date_EndDate').val().replace(/-/g, '/')) : ConvertDateFormat($('#date_EndDate').val()));
                formData.append("pNotes",  $('#txtNotes').val());

                var ajaxRequest = $.ajax({
                    type: "POST",
                    url: "/api/Authorizations/Authorizations_Insert_Update",
                    contentType: false,
                    processData: false,
                    data: formData,
                    success: function (data) { //data[0]: The filenames returned
                        debugger;
                        Authorizations_LoadingWithPaging();
                        if (pSaveandAddNew == false)
                            jQuery("#AuthorizationsModal").modal("hide");

                    },
                    error: function (jqXHR, exception) {
                        FadePageCover(false);
                        swal(strSorry, "An error occured, please try again.");
                    }
                });
                ajaxRequest.done(function (xhr, textStatus) {
                    debugger;
                });
            }
        }

    }
}
function ShowImage()
{
    //$('#ImageName').attr("href", "Images");
    window.open("/Images\\"+$('#ImageName').text()+"", "_blank")
}

function Authorizations_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblAuthorizations') != "")
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
            DeleteListFunction("/api/Authorizations/Delete", { "pAuthorizationsIDs": GetAllSelectedIDsAsString('tblAuthorizations') }, function () {
                Authorizations_LoadingWithPaging();
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}

//after pressing edit, this function fills the data
function Authorizations_FillControls(pID) {
    ClearAll("#AuthorizationsModal");
    debugger;
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    
    $('#txtAuthorizationNumber').val($(tr).find("td.AuthorizationNumber").text())
    $('#slCustomers').val($(tr).find("td.CustomerID").text())
    $('#txtregistrationNumber').val($(tr).find("td.registrationNumber").text())
    $('#date_registration_EndDate').val($(tr).find("td.registration_EndDate").text().replace(/\//g, '-'))
    $('#txtOwnerNumber').val($(tr).find("td.OwnerNumber").text())
    $('#date_StartDate').val($(tr).find("td.StartDate").text().replace(/\//g, '-'))
    $('#date_EndDate').val($(tr).find("td.EndDate").text().replace(/\//g, '-'))
    $('#txtNotes').val($(tr).find("td.Notes").text())
    
    $('#ImageName').text($(tr).find("td.ImageName").text())

    $("#btnSave").attr("onclick", "Authorizations_Update(false);");
    $("#btnSaveandNew").attr("onclick", "Authorizations_Update(true);");
}

function Authorizations_ClearAllControls(callback) {
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName", "txtNotes"), null, new Array("cbIsInactive"));//an alternative fn is with abdelmawgood
    ClearAll("#AuthorizationsModal");
    $('#txtOwnerNumber').val("");
    $("#btnSave").attr("onclick", "Authorizations_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "Authorizations_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
    jQuery('#inputFileUpload').val("")
    $('#ImageName').text("")
    if (callback != null && callback != undefined)
        callback();
}
//EOF Region Authorizations ---------------------------------------------------------------
