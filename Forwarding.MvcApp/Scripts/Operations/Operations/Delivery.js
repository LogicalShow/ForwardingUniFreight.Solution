var RowIndex = 0;
async function Delivery_SubmenuTabClicked() {
    debugger;
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();

    Documents_LoadAll();
    RowIndex = 0;
    if ($("#hOperationStageID").val() == "120") {
        $("#btn-DeliveryDeleteOperationDocuments").hide();
        $("#Deliverybtn-NewAdd").hide();
    }
    if (pDefaults.UnEditableCompanyName == "MED" && pLoggedUser.DepartmentID == 1 && pOperationHeader_Global.OperationStageID == 65) {
        $("#Deliverybtn-NewAdd").addClass("hide");
        $("#btn-DeliveryDeleteOperationDocuments").addClass("hide");
    }
    if (pDefaults.UnEditableCompanyName == "MED") {
        $("#btn-SaveAllSelected").removeClass("hide");
    }
}





//#region Documents  

async function Documents_LoadAll() {
    debugger;
    var d = await CallGETFunctionWithParametersAsync("/api/Delivery/LoadLists", { pOperationID: $("#hOperationID").val(), pWhereCondition: Documents_GetDocumentsInfoCondition() })
    Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(d[1], 'ID', 'Name', "", TranslateString("SelectFromMenu"), '#slhidden_DeliveryDocumentInfo', '', "ImportanceName,Degree");
    FillListFromObject_ERP(null, 2, TranslateString("Select"), "slhidden_DeliveryReceivingDegree", d[2], null);
    FillListFromObject_ERP(null, 2, TranslateString("Select"), "slhidden_DeliveryUsers", d[3], null);
    CallGETFunctionWithParameters("/api/Delivery/LoadDeliveryDocuments", { pOperationID: $("#hOperationID").val(), pWhereCondition: Documents_GetDocumentsInfoCondition() }
        , function (pData) {
            debugger;
            FadePageCover(false);
            Documents_BindTableRows(JSON.parse(pData[0]));

        });
}
function Documents_GetDocumentsInfoCondition() {
    debugger;
    var pWhereClause = "WHERE 1=1";
    pWhereClause += ($("#cbIsOcean").prop("checked") ? (" AND IsOcean=1") : ($("#cbIsAir").prop("checked") ? (" AND IsAir=1") : ($("#cbIsInland").prop("checked") ? (" AND IsInland=1") : "")));
    pWhereClause += ($("#cbIsImport").prop("checked") ? (" AND IsImport=1") : ($("#cbIsExport").prop("checked") ? (" AND IsExport=1") : ($("#cbIsDomestic").prop("checked") ? (" AND IsDomestic=1") : "")));
    pWhereClause += ($("#cbIsFCL").prop("checked") ? (" AND IsFCL=1") : ($("#cbIsBulk").prop("checked") ? (" AND IsBulk=1") : ($("#cbIsLCL").prop("checked") ? (" AND IsLCL=1") : ($("#cbIsVehicle").prop("checked") ? (" AND IsVehicle=1") : ""))));


    return pWhereClause;
}
function Documents_BindTableRows(Details) {
    debugger;

    var printControlsText = " class='' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Print" + "</span>";
    var downloadControlsText = " class='' > <i class='fa fa-cloud-download' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Download") + "</span>";
    var DeleteControlsText = " class='' > <i class='fa fa-trash-o' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("DeleteAttachment") + "</span>";
    ClearAllTableRows("tblDeliveredFiles");
    $.each(Details, function (i, item) {
        RowIndex = item.ID;
        AppendRowtoTable("tblDeliveredFiles",
            ("<tr ID='" + item.ID + "' " + ">"
                + "<td class='ID'> <input id='" + item.ID + "' name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='DocumentInfoID' style='width:20%;' val=''><select   value='" + (item.DocumentInfoID == 0 ? "" : item.DocumentInfoID) + "' id='slDocumentInfoID" + item.ID + "' style='width:100%;' class='controlStyle DocumentInfoID' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='GetDocumentInfoData(" + item.ID + "); ShowPleaseSave(" + item.ID + ");' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='true'>" + $('#slhidden_DeliveryDocumentInfo').html() + "</select></td>"
                + "<td class='CreatorUserID' style='width:20%;' val=''><select disabled value='" + (item.CreatorUserID == 0 ? "" : item.CreatorUserID) + "' id='slCreatorUserID" + item.ID + "' style='width:100%;' class='controlStyle CreatorUserID' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' ShowPleaseSave(" + item.ID + ");' onkeypress='DisableBackspaceKey(id);' data-required='true'>" + $('#slhidden_DeliveryUsers').html() + "</select></td>"
                + "<td class='Code' style='width:10%;'><input  type='text' value='" + item.Code + "' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtCode" + item.ID + "' class='controlStyle inputCode'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onblur='ShowPleaseSave(" + item.ID + ");' data-required='true'  /> </td>"
                + "<td class='ExpirationDate' style='width:10%;'><input  type='text' value='" + (GetDateFromServer(item.ExpirationDate) == "01/01/1900" ? "" : GetDateFromServer(item.ExpirationDate)) + "' style='width:100%;font-size:90%;background-color:white; cursor:text;' id='txtExpirationDate" + item.ID + "' class='datepicker-input controlStyle inputExpirationDate' data-date-format='dd/mm/yyyy'   onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange=''  data-required='true'  /> </td>"
                + "<td class='ReceivingDegreeID hide' style='width:20%;' val=''><select   value='" + (item.ReceivingDegreeID == 0 ? "" : item.ReceivingDegreeID) + "' id='slReceivingDegreeID" + item.ID + "' style='width:100%;' class='controlStyle ReceivingDegreeID' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' ShowPleaseSave(" + item.ID + ");' onkeypress='DisableBackspaceKey(id);' data-required='false'>" + $('#slhidden_DeliveryReceivingDegree').html() + "</select></td>"
                + "<td class='ReceivedDate' style='width:10%;'><input  type='text' value='" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReceivedDate)) < 1 ? "" : item.ReceivedDateStr) + "' style='width:100%;font-size:90%;background-color:white; cursor:text;' id='txtReceivedDate" + item.ID + "' class='datetimepicker-input controlStyle inputReceivedDate' data-date-format='yyyy/mm/dd hh:ii'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange=''  data-required='true'  /> </td>"
                + "<td class='Recipient' style='width:10%;'><input  type='text' value='" + item.Recipient + "' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtRecipient" + item.ID + "' class='controlStyle inputImportance'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onblur='' disabled='disabled' data-required='false'  /> </td>"
                + "<td class='Notes' style='width:10%;'><input  type='text' value='" + item.Notes + "' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtNotes" + item.ID + "' class='controlStyle inputNotes'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onblur='ShowPleaseSave(" + item.ID + ");' data-required='false'  /> </td>"
                + "<td class='Save' style='width:5%;'><button id='btn-search' class='btn btn-sm btn-primary' type='button' onclick='Documents_Save(" + item.ID + ",false); '><i class='fa fa-save'></i></button></td>"
                //+ "<td class='' style='width:10%;'><a class='btn btn-xs btn-rounded btn-lightblue float-right   " + (IsNull(item.ImagePath, "0") == "0" ? " hide " : " ") + "' onclick='OpenOperationDocumentsUploadedFile(" + item.OperationID + "," + '"' + item.ImagePath + '"' + ");' " + downloadControlsText + "</a> <a class='btn btn-xs btn-rounded btn-danger float-right   " + (IsNull(item.ImagePath, "0") == "0" ? " hide " : " ") + "' onclick='Documents_DeleteImage(" + item.ID + ");' " + DeleteControlsText + "</a><label class=' " + (IsNull(item.ImagePath, "0") == "0" ? "  " : " hide") + " btn btn-xs btn-rounded btn-primary float-right  ' > <i class='fa fa-cloud-upload' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'> رفع الملف <input type='file' style='width:10%;  display: none;' class='input-sm form-control ' name='ImportImage' title='Select File' id='inputFileUpload" + RowIndex + "' accept='image/*, application/pdf'  onclick='this.value = null;' onchange='Documents_Save(" + item.ID + ",false);' /></span></label> </td>"
                //+ "<td class='' style='width:5%;'><a class='btn btn-xs btn-rounded btn-primary float-right  " + (IsNull(item.ImagePath, "0") == "0" ? " hide " : " ") + "' onclick='OperationDocuments_PrintImage(" + item.OperationID + "," + '"' + item.ImagePath + '"' + ");' " + printControlsText + "</a></td>"
                + "</tr>"));

        debugger;

        $("#slDocumentInfoID" + item.ID).val(item.DocumentInfoID)
        $("#slDocumentInfoID" + item.ID).css({ "width": "100%" }).select2();
        $("#slDocumentInfoID" + item.ID).trigger("change");
        //----------------------------------------------------------------------------------------------------------------------------------
        $("#txtReceivedDate" + item.ID).datetimepicker().on('changeDate'
            , function () {
                $(this).datetimepicker('hide');
                ShowPleaseSave(item.ID)
                //   RecalculateExchangeRate();

            });
        $("#txtReceivedDate" + item.ID).datetimepicker().on('keydown', function (ev) {
            if (ev.keyCode == 9) $(this).datetimepicker('hide');
        });
        //------------------------------------------------------------------------------------------------------------------------------------
        $("#txtExpirationDate" + item.ID).datepicker().on('changeDate'
            , function () {
                $(this).datepicker('hide');
                ShowPleaseSave(item.ID)
                //   RecalculateExchangeRate();

            });
        $("#txtExpirationDate" + item.ID).datepicker().on('keydown', function (ev) {
            if (ev.keyCode == 9) $(this).datepicker('hide');
        });
        //-------------------------------------------------------------------------------------------------------------------------------------
        $('#PleaseSave_' + item.ID).addClass('hide');
        if (i == Details.length - 1) {
            debugger;
            //FillHTMLtblInputsWithOutEvent("#tblOperationDocuments > tbody");
            $('#PleaseSave_' + item.ID).addClass('hide');
        }

        $("#slCreatorUserID" + item.ID).val(item.CreatorUserID == 0 ? ($("#hLoggedUserID").val()) : item.CreatorUserID)
        $("#slReceivingDegreeID" + item.ID).val(item.ReceivingDegreeID)
    }
    );

    BindAllCheckboxonTable("tblDeliveredFiles", "ID", "cb-CheckAll-DeliveryDocuments");
    CheckAllCheckbox("HeaderDeliverDocumentsID");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function Documents_NewRow() {
    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var FormattedTodaysDateTime = getTodaysDateInyyyyMMddhhmmFormat();
    RowIndex++;
    var printControlsText = " class='' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Print" + "</span>";
    var downloadControlsText = " class='' > <i class='fa fa-cloud-download' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Download") + "</span>";
    // $.each(Details, function (i, item)
    // {
    AppendRowtoTable("tblDeliveredFiles",
        ("<tr ID='" + RowIndex + "' " + ">"
            + "<td class='ID'> <input class='' name='Delete' type='checkbox' value='0' /></td>"
            + "<td class='DocumentInfoID' style='width:20%;' val=''><select  tag='" + 0 + "' id='slDocumentInfoID" + RowIndex + "' style='width:100%;' class='controlStyle DocumentInfoID ValidateForm' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='GetDocumentInfoData(" + RowIndex + ");' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='true'>" + $('#slhidden_DeliveryDocumentInfo').html() + "</select></td>"
            + "<td class='CreatorUserID' style='width:20%;' val=''><select disabled tag='" + 0 + "' id='slCreatorUserID" + RowIndex + "' style='width:100%;' class='controlStyle CreatorUserID' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='true'>" + $('#slhidden_DeliveryUsers').html() + "</select></td>"
            + "<td class='Code' style='width:10%;'><input type='text' tag='" + 0 + "' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtCode" + RowIndex + "' class='controlStyle inputImportance'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange=''  data-required='false' /> </td>"
            + "<td class='ExpirationDate' style='width:10%;'><input type='text' tag='" + '' + "' style='width:100%;font-size:90%;background-color:white; cursor:text;' id='txtExpirationDate" + RowIndex + "' class='datepicker-input controlStyle inputExpirationDate' data-date-format='dd/mm/yyyy'   onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange=''  data-required='true' value='" + ' ' + "' /> </td>"
            + "<td class='ReceivingDegreeID hide' style='width:20%;' val=''><select  tag='" + 0 + "' id='slReceivingDegreeID" + RowIndex + "' style='width:100%;' class='controlStyle ReceivingDegreeID' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='false'>" + $('#slhidden_DeliveryReceivingDegree').html() + "</select></td>"
            + "<td class='ReceivedDate' style='width:10%;'><input type='text' tag='" + '' + "' style='width:100%;font-size:90%;background-color:white; cursor:text;' id='txtReceivedDate" + RowIndex + "' class='datetimepicker-input controlStyle inputReceivedDate' data-date-format='yyyy/mm/dd hh:ii'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange=''  data-required='true' value='" + ' ' + "' /> </td>"
            + "<td class='Recipient' style='width:10%;'><input type='text' tag='" + 0 + "' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtRecipient" + RowIndex + "' class='controlStyle inputImportance'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange=''  data-required='false' /> </td>"
            + "<td class='Notes' style='width:10%;'><input type='text' tag='" + 0 + "' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtNotes" + RowIndex + "' class='controlStyle inputNotes'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value=' - ' /> </td>"
            + "<td class='Save' style='width:5%;'><button id='btn-search' class='btn btn-sm btn-primary' type='button' onclick='Documents_Save(" + RowIndex + ",true); '><i class='fa fa-save'></i></button></td>"
            //+ "<td class='UploadImage' style='width:5%;'> <label class='btn btn-xs btn-rounded btn-primary float-right  ' > <i class='fa fa-cloud-upload' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'> رفع الملف <input type='file' style='width:10%;  display: none;' class='input-sm form-control' name='ImportImage' title='Select File' id='inputFileUpload" + RowIndex + "' accept='image/*, application/pdf'  onclick='this.value = null;' onchange='Documents_Save(" + RowIndex + ",true);' /></span></label> </td>"
            //+ "<td></td>"

            // + "<td class='Degree' style='width:10%;'><input type='text' tag='" + 0 + "' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtDegree" + RowIndex + "' class='controlStyle inputDegree'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' disabled='disabled' data-required='false' value='" + 0 + "' /> </td>"
            // + "<td class='Code' style='width:10%;'><input type='text' tag='" + 0 + "' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtCode" + RowIndex + "' class='controlStyle inputCode'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='true' value='" + 0 + "' /> </td>"
            // + "<td></td>"
            + "</tr>"));

    debugger;
    $("#slCreatorUserID" + RowIndex).val($("#hLoggedUserID").val())
    $("#slDocumentInfoID" + RowIndex).css({ "width": "100%" }).select2();
    $("#slDocumentInfoID" + RowIndex).trigger("change");
    //----------------------------------------------------------------------------------------------------------------------------------


    $("#txtReceivedDate" + RowIndex).datetimepicker().on('changeDate'
        , function () {
            $(this).datetimepicker('hide');
            //   RecalculateExchangeRate();

        });
    $("#txtReceivedDate" + RowIndex).datetimepicker().on('keydown', function (ev) {
        if (ev.keyCode == 9) $(this).datetimepicker('hide');
    });
    $("#txtReceivedDate" + RowIndex).val(FormattedTodaysDateTime);
    //--------------------------------------------------------------------------------------------------------------    ----------------------
    $("#txtExpirationDate" + RowIndex).datepicker().on('changeDate'
        , function () {
            $(this).datepicker('hide');
            //   RecalculateExchangeRate();

        });
    $("#txtExpirationDate" + RowIndex).datepicker().on('keydown', function (ev) {
        if (ev.keyCode == 9) $(this).datepicker('hide');
    });
    $("#txtExpirationDate" + RowIndex).val(FormattedTodaysDate);
    //-------------------------------------------------------------------------------------------------------------------------------------
    //if (i == pInvoiceDetails.length - 1) {
    //    debugger;
    //    FillHTMLtblInputs("#tblOperationDocuments > tbody");
    //}
    //   }

    // );

    BindAllCheckboxonTable("tblOperationDocuments", "ID", "cb-CheckAll-OperationDocuments");
    CheckAllCheckbox("HeaderOperationDocumentsID");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function Documents_UploadImages(rowIndex, pID) {
    debugger;
    var pOperationID = $("#hOperationID").val();
    maxTotalSize = 20971520;//20MB total of uploaded files together
    var formData = new FormData();
    var files = $("#inputFileUpload" + rowIndex).get(0).files;
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
                for (i = 0; i < files.length; i++) {
                    formData.append("FileNames", files[i]);
                    formData.append("LastModifiedDate", files[i].lastModifiedDate.toString().split('GMT')[0].trim());
                }
            }
            formData.append("pID", pID.toString());
            formData.append("pOperationID", pOperationID.toString());
            formData.append("pOperationCreationYear", 2022);
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
                url: "/api/Delivery/UploadOperationDocuments",
                contentType: false,
                processData: false,
                data: formData,
                success: function (data) { //data[0]: The filenames returned
                    FadePageCover(false);
                    if (data[1] == "") {
                        Delivery_SubmenuTabClicked();
                        if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
                            swal("نجاح", "تم الحفظ");
                        } else {
                            swal("Success", "Saved successfully.");
                        }
                    } else {
                        Delivery_SubmenuTabClicked();
                        swal("مشكلة", data[1]);
                    }

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
    // }
}
async function Documents_Save(RowIndex, IsNewLine) {
    debugger;
    if (ValidateForm("ValidateForm", "tblDeliveredFiles")) {
        FadePageCover(true);
        var pParametersWithValues = {
            pID: IsNewLine == true ? 0 : RowIndex
            ,
            pOperationID: $("#hOperationID").val() == "" ? 0 : $("#hOperationID").val()
            ,
            pDocumentInfoID: $("#slDocumentInfoID" + RowIndex).val() == "" ? 0 : $("#slDocumentInfoID" + RowIndex).val()
            ,
            pCreatorUserID: $("#slCreatorUserID" + RowIndex).val() == "" ? 0 : $("#slCreatorUserID" + RowIndex).val()
            ,
            pReceivingDegreeID: $("#slReceivingDegreeID" + RowIndex).val() == "" ? 0 : $("#slReceivingDegreeID" + RowIndex).val()
            ,
            pCode: $("#txtCode" + RowIndex).val() == "" ? 0 : $("#txtCode" + RowIndex).val()
            ,
            pReceivedDate: (IsNull($("#txtReceivedDate" + RowIndex).val(), "") == "" ? "01/01/1900" : $("#txtReceivedDate" + RowIndex).val())
            ,
            pExpirationDate: (IsNull($("#txtExpirationDate" + RowIndex).val(), "") == "" ? "01/01/1900" : $("#txtExpirationDate" + RowIndex).val())
            ,
            pNotes: ($("#txtNotes" + RowIndex).val().trim() == "" ? "0" : $("#txtNotes" + RowIndex).val().replace(/,/g, "_").trim())
            ,
            pRecipient: ($("#txtRecipient" + RowIndex).val().trim() == "" ? "0" : $("#txtRecipient" + RowIndex).val().replace(/,/g, "_").trim())
        };
        var pData = await CallGETFunctionWithParametersAsync("/api/Delivery/Save", pParametersWithValues);
        var _ReturnedMessage = pData[0];
        if (_ReturnedMessage == "") {
            var newIDFromDB = pData[1];
            Documents_LoadAll();
            Documents_UploadImages(RowIndex, newIDFromDB);
        } else {
            swal("Sorry", _ReturnedMessage);
            FadePageCover(false);
        }
    }
    else {
        swal("Sorry", "Please, Add at least one Charge Type.(برجاء ادخال التفاصيل)");
        FadePageCover(false);
    }
}
function FillHTMLtblInputsWithOutEvent(Selector) {
    debugger;
    $.each($(Selector), function (j, tr) {
        try {
            var sl = $(tr).find('input[type=select]');
            console.log("sl" + sl.length)
            $.each($(tr).find('select'), function (i1, i_sl) {
                $(i_sl).val($(i_sl).attr('tag'));
                // $(i_sl).trigger("change");

            });
        } catch (ex1) {
        }
        //---------------------------------------------------------------------------------------------------------
        try {
            var nu = $(tr).find('input[type=number]');
            console.log("nu" + nu.length)
            $.each($(tr).find('input[type=number]'), function (i2, i_nu) {
                $(i_nu).val($(i_nu).attr('tag'));
                //   $(i_nu).trigger("blur");
            });
        } catch (ex2) {
        }
        //---------------------------------------------------------------------------------------------------------
        try {
            var txt = $(tr).find('input[type=text]');
            console.log("txt" + txt.length)
            $.each($(tr).find('input[type=text]'), function (i3, i_txt) {
                $(i_txt).val($(i_txt).attr('tag'));
                //  $(i_txt).trigger("blur");

                if ($(i_txt).hasClass("datepicker-input")) {
                    try {
                        $(i_txt).datepicker().on('changeDate'
                            , function () {
                                $(this).datepicker('hide');
                                FireDateChangingEvent();

                            });
                        //  $(i_txt).datepicker().on('keydown', function (ev) { if (ev.keyCode == 9) $(this).datepicker('hide'); });

                    } catch (ex) {


                    }
                }
            });
        } catch (ex3) {
        }
    });
}
function Documents_DeleteImage(pID) {
    debugger;
    swal({
        title: $("[id$='hf_ChangeLanguage']").val() == "ar" ? "هل تريد الحذف " : "Are you sure?",
        text: $("[id$='hf_ChangeLanguage']").val() == "ar" ? " " : "The selected records will be deleted permanently!",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: $("[id$='hf_ChangeLanguage']").val() == "ar" ? "الغاء" : "Cancel",
        confirmButtonColor: "#DD6B55",
        confirmButtonText: $("[id$='hf_ChangeLanguage']").val() == "ar" ? "نعم حذف" : "Yes, delete!",
        closeOnConfirm: true
    },
        function () {
            FadePageCover(true);
            var pParametersWithValues = {
                pID: pID
                , pOperationID: $("#hOperationID").val() == "" ? 0 : $("#hOperationID").val()
            };
            CallGETFunctionWithParameters("/api/Delivery/Delivery_DeleteImage", pParametersWithValues
                , function (pData) {
                    if (pData[0]) {
                        Delivery_SubmenuTabClicked();
                    }
                    else
                        swal("Sorry", "Connection failed, please try again.");
                    FadePageCover(false);
                }
                , null);
        });
}
function Documents_DeleteList(callback) {
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblDeliveredFiles') != "")
        swal({
            title: $("[id$='hf_ChangeLanguage']").val() == "ar" ? "هل تريد الحذف " : "Are you sure?",
            text: $("[id$='hf_ChangeLanguage']").val() == "ar" ? "" : "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            cancelButtonText: $("[id$='hf_ChangeLanguage']").val() == "ar" ? "الغاء" : "Cancel",
            confirmButtonColor: "#DD6B55",
            confirmButtonText: $("[id$='hf_ChangeLanguage']").val() == "ar" ? "نعم حذف" : "Yes, delete!",
            closeOnConfirm: true
        },
            //callback function in case of confirm delete
            function () {
                CallGETFunctionWithParameters("/api/Delivery/DeleteList"
                    , { "pDeletedOperationsDocumentsIDs": GetAllSelectedIDsAsString('tblDeliveredFiles'), pOperationID: $("#hOperationID").val() }
                    , function (pData) {
                        if (JSON.parse(pData[0])) {

                            Delivery_SubmenuTabClicked();
                        } else {
                            showDeleteFailMessage = true
                            strDeleteFailMessage = pData[1];
                            Delivery_SubmenuTabClicked();
                        }
                    });
            });
}


function Delivery_PrintAll() { 
    debugger;
    CallGETFunctionWithParameters("/api/Reports/GetLogoPaths", { pLogoSubPath1: "Content/Images/CompanyHeader.jpg", pLogoSubPath2: "Content/Images/CompanyFooter.jpg" }, function (paths) {
    var arr_Keys = new Array();
    var arr_Values = new Array();

        arr_Keys.push("ClientName");
        arr_Values.push($("#lblClient").text().replaceAll(',', '').replaceAll(':', '').replaceAll('&',''));
        arr_Keys.push("Logo");
        arr_Keys.push("Logo1");
        arr_Values.push(paths.logoPath1);
        arr_Values.push(paths.logoPath2);

    var ReportName = "OperationsDocumentsReport"
        var query = `SELECT od.OperationCode,od.Name,od.Code,od.ExpirationDate,od.ReceivedDate,od.Recipient,od.Notes,vo.CreatorName OperationCreatorName,vo.Salesman OperationSalesman,vo.OpenDate,vo.RepBLTypeShown,vo.CommodityCode,vo.CommodityCode2,vo.CommodityCode3,vo.ClientName,vo.InvoiceNumbers,vo.ContainerTypes,vo.CommodityName,vo.CommodityName2,vo.CommodityName3,vo.POLName,vo.POLCountryName,vo.PODName,vo.PODCountryName,vo.LineName,vo.VesselName,vo.MasterBL,vo.HouseBLs,vo.HouseNumber,vo.TruckerName,vo.AgentName,CASE WHEN vo.ExpectedDeparture IS NULL THEN '' ELSE REPLACE(CONCAT(STR(DAY(vo.ExpectedDeparture)),'/',STR(MONTH(vo.ExpectedDeparture)),'/',STR(YEAR(vo.ExpectedDeparture))),' ','') END AS ExpectedDeparture,CASE WHEN vo.CutOffDate IS NULL THEN '' ELSE REPLACE(CONCAT(STR(DAY(vo.CutOffDate)),'/',STR(MONTH(vo.CutOffDate)),'/',STR(YEAR(vo.CutOffDate))),' ','') END AS CutOffDate,CASE WHEN vo.ActualDeparture IS NULL THEN '' ELSE REPLACE(CONCAT(STR(DAY(vo.ActualDeparture)),'/',STR(MONTH(vo.ActualDeparture)),'/',STR(YEAR(vo.ActualDeparture))),' ','') END AS ActualDeparture,CASE WHEN vo.ActualArrival IS NULL THEN '' ELSE REPLACE(CONCAT(STR(DAY(vo.ActualArrival)),'/',STR(MONTH(vo.ActualArrival)),'/',STR(YEAR(vo.ActualArrival))),' ','') END AS ActualArrival,vo.CertificateNumber,vo.NumberOfPackages,ISNULL(vo.PackageTypeName,0)PackageTypeName,vo.GrossWeightSum,vo.Volume,vo.PONumber,vo.ACIDNumber,vo.SupplierReference,vo.WareHouseLocation,vo.Notes OperationNotes,CASE WHEN vo.RepBLTypeShown='MASTER' THEN vo.HouseBLs ELSE vo.HouseNumber END AS HBL ,vo.FreeTime , vo.ShipperName , vo.ConsigneeName , vo.Notes , vo.OperationManName ,vo.BookingNumber FROM vwOperationsDocuments od LEFT JOIN vwOperations AS vo ON vo.ID=od.OperationID WHERE OperationID=${$("#hOperationID").val()}`
    var pParametersWithValues =
    {
        query: query
        , arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: ReportName
        , pReportName: ReportName
        , pReportType: "Print"
    };

    var win = window.open("", "_blank");

    url = '/ReportMainClass/PrintReportQueryAndParams?pTitle="' + pParametersWithValues.pTitle + '"'
        + '&query=' + pParametersWithValues.query + ''
        + '&arr_Keys=' + pParametersWithValues.arr_Keys + ''
        + '&arr_Values=' + pParametersWithValues.arr_Values + ''
        + '&pReportName=' + pParametersWithValues.pReportName + ''
        + '&pReportType=' + pParametersWithValues.pReportType + '';

        win.location = url;
    })


}

function Documents_SaveAllSelected() {
    $('#tblDeliveredFiles tbody td').find('input[name="Delete"]:checked').each(function (i, item) {
        debugger;
        let id = parseInt($(this).attr('value'));
        if (id == 0) {

            let newId = $(this).parent().parent().attr('id');
            newId = parseInt(newId);
            if (!isNaN(newId)) { Documents_Save(newId, true); }

        } else if (!isNaN(id)) {
            Documents_Save(id, false);
        }
    })
}
//#endregion 