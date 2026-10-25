// CustomsItems Region ---------------------------------------------------------------
// Bind CustomsItems Table Rows
function CustomsItems_BindTableRows(pCustomsItems) {
    debugger;
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblCustomsItems");
    var editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pCustomsItems, function (i, item) {
        AppendRowtoTable("tblCustomsItems",
        ("<tr ID='" + item.ID + "' ondblclick='CustomsItems_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code'>" + (item.Code == 0 ? "" : item.Code) + "</td>"
                    + "<td class='ArDescription'>" + (item.ArDescription == 0 ? "" : item.ArDescription) + "</td>"
                    + "<td class='EnDescription'>" + (item.EnDescription == 0 ? "" : item.EnDescription) + "</td>"
                    + "<td class='TariffCode'>" + (item.TariffCode == 0 ? "" : item.TariffCode) + "</td>"
                    + "<td class='Discount'>" + (item.Discount == 0 ? "" : item.Discount) + "</td>"
                    + "<td class='ImageName hide'>" + (item.Image == 0 ? "" : item.Image) + "</td>"
                    + "<td class='hide'><a href='#CustomsItemsModal' data-toggle='modal' onclick='CustomsItems_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblCustomsItems", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblCustomsItems>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function ShowImage() {
    //$('#ImageName').attr("href", "Images");
    window.open("/Images\\" + $('#ImageName').text() + "", "_blank")
}
function CustomsItems_EditByDblClick(pID) {
    jQuery("#CustomsItemsModal").modal("show");
    CustomsItems_FillControls(pID);
}
// Loading with data
function CustomsItems_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/CustomsItems/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(),
        function (pTabelRows)
        {
            CustomsItems_BindTableRows(pTabelRows);
            CustomsItems_ClearAllControls();
        });
    HighlightText("#tblCustomsItems>tbody>tr", $("#txt-Search").val().trim());
}
function CustomsItems_Insert(pSaveandAddNew) {
    debugger;
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
            // Add the uploaded files content to the form data collection
            if (files.length > 0) {
                FadePageCover(true);
                for (i = 0; i < files.length; i++)
                    formData.append("FileNames", files[i].name);
            }
            formData.append("file", files[0]);
            formData.append("pID", 0);
            formData.append("pCode", $('#txtCode').val());
            formData.append("pArDescription", $('#txtArDescription').val());
            formData.append("pEnDescription", $('#txtEnDescription').val());
            formData.append("pTariffCode", $('#txtTariffCode').val());
            formData.append("pDiscount", $('#txtDiscount').val().trim() == "" ? 0 : $('#txtDiscount').val().trim());
            // Make Ajax request with the contentType = false, and processDate = false
            var ajaxRequest = $.ajax({
                type: "POST",
                url: "/api/CustomsItems/CustomsItems_Insert_Update",
                contentType: false,
                processData: false,
                data: formData,
                success: function (data) { //data[0]: The filenames returned
                    debugger;

                    CustomsItems_LoadingWithPaging();
                    if (pSaveandAddNew == false)
                        jQuery("#CustomsItemsModal").modal("hide");
                },
                error: function (jqXHR, exception) {
                    FadePageCover(false);
                    swal(strSorry, "An error occured, please try again.");
                }
            });
            ajaxRequest.done(function (xhr, textStatus) {
                // Do other operation
                debugger;
            });
        }//of else (correct file sizes)
    }
}

function CustomsItems_Update(pSaveandAddNew)
{
    debugger;
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
            // Add the uploaded files content to the form data collection
            if (files.length > 0) {
                FadePageCover(true);
                for (i = 0; i < files.length; i++)
                    formData.append("FileNames", files[i].name);
            }
            //formData.append("pOperationCode", $("#hOperationCode").val())
            //formData.append("pOperationCreationYear", $("#hOperationCreationYear").val())
            formData.append("file", files[0]);
            formData.append("pID", $("#hID").val());
            formData.append("pCode", $('#txtCode').val());
            formData.append("pArDescription", $('#txtArDescription').val());
            formData.append("pEnDescription", $('#txtEnDescription').val());
            formData.append("pTariffCode", $('#txtTariffCode').val());
            formData.append("pDiscount", $('#txtDiscount').val() == "" ? 0 : $('#txtDiscount').val().trim());
                
            // Make Ajax request with the contentType = false, and processDate = false
            var ajaxRequest = $.ajax({
                type: "POST",
                url: "/api/CustomsItems/CustomsItems_Insert_Update",
                contentType: false,
                processData: false,
                data: formData,
                success: function (data) { //data[0]: The filenames returned
                    debugger;

                    CustomsItems_LoadingWithPaging();
                    if (pSaveandAddNew == false)
                        jQuery("#CustomsItemsModal").modal("hide");
                },
                error: function (jqXHR, exception) {
                    FadePageCover(false);
                    swal(strSorry, "An error occured, please try again.");
                }
            });
            ajaxRequest.done(function (xhr, textStatus) {
                // Do other operation
                debugger;
            });
        }//of else (correct file sizes)
    }//of if (files.length == 0)
    //var files = $("#inputFileUpload").get(0).files;
    ////var text = $('#txtacademyname').val();
    //if (files.length > 0) {
    //    var data = new FormData();
    //    data.append("file", files[0]);
    //    data.append("pID", $("#hID").val());
    //    data.append("pCode", $('#txtCode').val());
    //    data.append("pArDescription", $('#txtArDescription').val());
    //    data.append("pEnDescription", $('#txtEnDescription').val());
    //    data.append("pTariffCode", $('#txtTariffCode').val());
    //    data.append("pDiscount", $('#txtDiscount').val());
    //    console.log(data);
    //    $.ajax({
    //        type: "POST",
    //        url: "/MasterData/CustomsItems_Insert_Update",
    //        contentType: false, // Not to set any content header  
    //        processData: false,
    //        data: data,
    //        success: function (data) {
    //            alert(data);
    //        },
    //        error: function () {

    //        }

    //    });
    //}

}

function CustomsItems_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblCustomsItems') != "")
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
            DeleteListFunction("/api/CustomsItems/Delete", { "pCustomsItemsIDs": GetAllSelectedIDsAsString('tblCustomsItems') }, function () {
                CustomsItems_LoadingWithPaging();
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}

//after pressing edit, this function fills the data
function CustomsItems_FillControls(pID) {
    ClearAll("#CustomsItemsModal");
    debugger;
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    //$("#lblShown").html(": " + $(tr).find("td.Name").text());
    $("#txtCode").val($(tr).find("td.Code").text());
    $("#txtArDescription").val($(tr).find("td.ArDescription").text());
    $("#txtEnDescription").val($(tr).find("td.EnDescription").text());
    $("#txtTariffCode").val($(tr).find("td.TariffCode").text());
    $("#txtDiscount").val($(tr).find("td.Discount").text());
    $('#ImageName').text($(tr).find("td.ImageName").text())
    $("#btnSave").attr("onclick", "CustomsItems_Update(false);");
    $("#btnSaveandNew").attr("onclick", "CustomsItems_Update(true);");
}

function CustomsItems_ClearAllControls(callback) {
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName", "txtNotes"), null, new Array("cbIsInactive"));//an alternative fn is with abdelmawgood
    ClearAll("#CustomsItemsModal");
    $('#txtDiscount').val("");
    $("#btnSave").attr("onclick", "CustomsItems_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "CustomsItems_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
    $('#ImageName').text("")
    jQuery('#inputFileUpload').val("")
    if (callback != null && callback != undefined)
        callback();
}
//EOF Region CustomsItems ---------------------------------------------------------------

function CustomsItems_UploadFile() {
    debugger;
    //maxTotalSize = 10485760;//10MB total of uploaded files together
    maxTotalSize = 20971520;//20MB total of uploaded files together
    var formData = new FormData();
    var files = $("#inputFileUpload").get(0).files;
    var totalFilesSize = 0;
    if (files.length > 0) {
        //check files total size is less than 20MB
        for (i = 0; i < files.length; i++)
            totalFilesSize += files[i].size;
        if (totalFilesSize > maxTotalSize)
            swal(strSorry, "Total file(s) size can't exceed 20MBs at one upload.");
        else {
            // Add the uploaded files content to the form data collection
            if (files.length > 0) {
                FadePageCover(true);
                for (i = 0; i < files.length; i++)
                    formData.append("FileNames", files[i]);
            }
            formData.append("pOperationCode", $("#hOperationCode").val())
            formData.append("pOperationCreationYear", $("#hOperationCreationYear").val())
            // Make Ajax request with the contentType = false, and processDate = false
            var ajaxRequest = $.ajax({
                type: "POST",
                xhr: function () {  // Custom XMLHttpRequest
                    var myXhr = $.ajaxSettings.xhr();
                    if (myXhr.upload) { // Check if upload property exists
                        myXhr.upload.addEventListener('progress', progressHandlingFunction, false); // For handling the progress of the upload
                    }
                    return myXhr;
                },
                url: "/api/CustomsItems/CustomsItems_Insert_Update",
                contentType: false,
                processData: false,
                data: formData,
                success: function (data) { //data[0]: The filenames returned
                    debugger;
                    DocsIn_BindTableRows(JSON.parse(data[0]));
                    FadePageCover(false);
                    swal("Success", "File(s) uploaded successfully.");
                },
                error: function (jqXHR, exception) {
                    FadePageCover(false);
                    swal(strSorry, "An error occured, please try again.");
                }
            });
            ajaxRequest.done(function (xhr, textStatus) {
                // Do other operation
                debugger;
            });
        }//of else (correct file sizes)
    }//of if (files.length == 0)
}