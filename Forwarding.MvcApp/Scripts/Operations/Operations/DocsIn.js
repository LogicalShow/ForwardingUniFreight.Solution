
// Asynchronous file upload process
function DocsIn_LoadAll() {
    debugger;
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/DocsIn/GetDocsInNames", { pOperationID: $("#hOperationID").val() }
        , function (pData) { //data[0]: pDocsInFileNames
            debugger;
            DocsIn_BindTableRows(JSON.parse(pData[0]));
            FadePageCover(false);
        }
        , null
        , true/*Default true*/);
}
function GetDocumentInfoData(RowIndex) {

    $("#txtImportance" + RowIndex + "").val($("#slDocumentInfoID" + RowIndex + " option:selected").attr('ImportanceName'));
    $("#txtDegree" + RowIndex + "").val($("#slDocumentInfoID" + RowIndex + " option:selected").attr('Degree'));

}
function ShowPleaseSave(index) {


    $('#PleaseSave_' + index).removeClass('hide')

}
function DocsIn_UploadFile_Payables() {
    debugger;
    //maxTotalSize = 10485760;//10MB total of uploaded files together
    maxTotalSize = 20971520;//20MB total of uploaded files together
    var formData = new FormData();
    var files = $("#inputFileUpload-payables").get(0).files;

    var totalFilesSize = 0;
    var isValidType = true;

    var NameRepeated = '';

    var isValidName = true;
    //var specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
    var specialChars = /[#]/;
    if (files.length > 0) {
        //check files total size is less than 20MB & filetype
        for (i = 0; i < files.length; i++) {
            totalFilesSize += files[i].size;

            var name = files[i].name;
            var extension = (name.split('.')[name.split('.').length - 1]).toLowerCase();

            if (extension != "jpg" && extension != "png" && extension != "jpeg" && extension != "gif" && extension != "pdf")
                isValidType = false;

            if (specialChars.test(name))
                isValidName = false;

        }

        //check name repetition 
        for (var i = 0; i < files.length; i++) {
            for (var y = 0; y < files.length; y++) {
                if (files[i].name == files[y].name && i != y) {
                    NameRepeated = files[i].name;
                    break;
                }
            }
            $('#tblDocsIn-payables tbody tr').each(function () {
                if (files[i].name == $(this).find('td.FileName').text()) {
                    NameRepeated = files[i].name;
                    return;
                }
            });
            if (NameRepeated != '')
                break;
        }


        if (!isValidType)
            swal("Sorry", "Only images and pdf are permitted");
        else if (totalFilesSize > maxTotalSize)
            swal(strSorry, "Total file(s) size can't exceed 20MBs at one upload.");
        else if (!isValidName)
            swal(strSorry, "File Name Must Contains Only Letters And Numbers");
        else if (NameRepeated != '')
            swal(strSorry, "File Name " + NameRepeated + " Existed");
        else {
            // Add the uploaded files content to the form data collection
            if (files.length > 0) {
                FadePageCover(true);
                for (i = 0; i < files.length; i++) {
                    formData.append("FileNames", files[i]);
                    formData.append("LastModifiedDate", files[i].lastModifiedDate.toString().split('GMT')[0].trim());
                }
            }
            formData.append("pPayable",true)
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
                url: "/api/DocsIn/UploadFile_Payables",
                contentType: false,
                processData: false,
                data: formData,
                success: function (data) { //data[0]: The filenames returned
                    DocsIn_BindTableRows(JSON.parse(data[0]),true);
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
function DocsIn_UploadFile() {
    debugger;
    //maxTotalSize = 10485760;//10MB total of uploaded files together
    maxTotalSize = 20971520;//20MB total of uploaded files together
    var formData = new FormData();
    var files = $("#inputFileUpload").get(0).files;

    var totalFilesSize = 0;
    var isValidType = true;

    var NameRepeated = '';

    var isValidName = true;
    //var specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
    var specialChars = /[#]/;
    if (files.length > 0) {
        //check files total size is less than 20MB & filetype
        for (i = 0; i < files.length; i++) {
            totalFilesSize += files[i].size;
            
            var name = files[i].name;
            var extension = (name.split('.')[name.split('.').length - 1]).toLowerCase();

            if (extension != "jpg" && extension != "png" && extension != "jpeg" && extension != "gif" && extension != "pdf")
                isValidType = false;

            if (specialChars.test(name))
                isValidName = false;

        }

        //check name repetition 
        for (var i = 0; i < files.length; i++) {
            for (var y = 0; y < files.length; y++) {
                if (files[i].name == files[y].name && i != y) {
                    NameRepeated = files[i].name;
                    break;
                }
            }
            $('#tblDocsIn tbody tr').each(function () {
                if (files[i].name == $(this).find('td.FileName').text()) {
                    NameRepeated = files[i].name;
                    return;
                }
            });
            if (NameRepeated!='')
                break;
        }


        if (!isValidType)
            swal("Sorry", "Only images and pdf are permitted");
        else if (totalFilesSize > maxTotalSize)
            swal(strSorry, "Total file(s) size can't exceed 20MBs at one upload.");
        else if (!isValidName)
            swal(strSorry, "File Name Must Contains Only Letters And Numbers");
        else if (NameRepeated != '')
            swal(strSorry, "File Name " + NameRepeated + " Existed");
        else {
            // Add the uploaded files content to the form data collection
            if (files.length > 0) {
                FadePageCover(true);
                for (i = 0; i < files.length; i++) {
                    formData.append("FileNames", files[i]);
                    formData.append("LastModifiedDate", files[i].lastModifiedDate.toString().split('GMT')[0].trim());
                }
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
                url: "/api/DocsIn/UploadFile",
                contentType: false,
                processData: false,
                data: formData,
                success: function (data) { //data[0]: The filenames returned
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
function DocsIn_DeleteList() {
    debugger;
    //Confirmation message to delete
    var pFileNames = GetAllSelectedIDsAsString('tblDocsIn');
    if (pFileNames != "")
        swal({
            title: "Are you sure?",
            text: "The selected files will be removed from server!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, remove!",
            closeOnConfirm: true
        },
        //callback function in case of confirm delete
        function () {
            FadePageCover(true);
            //CallGETFunctionWithParameters(pFunctionName, pParametersWithValues, callback, callback1)
            CallGETFunctionWithParameters("/api/DocsIn/Delete"
                , { "pOperationCreationYear": $("#hOperationCreationYear").val(), "pOperationCode": $("#hOperationCode").val(), "pFileNames": pFileNames }
                , function (data) { //data[0]: pDocsInFileNames
                    debugger;
                    DocsIn_BindTableRows(JSON.parse(data[0]));
                    FadePageCover(false);
                }
                ,null);
        });
}
//function progressHandlingFunction(e) {
//    if (e.lengthComputable) {
//        $('progress').attr({ value: e.loaded, max: e.total });
//    }
//}


//// check extension of file to be upload
//function checkFileExtension(file) {
//    var flag = true;
//    var extension = file.substr((file.lastIndexOf('.') + 1));

//    switch (extension) {
//        case 'jpg':
//        case 'jpeg':
//        case 'png':
//        case 'gif':

//        case 'JPG':
//        case 'JPEG':
//        case 'PNG':
//        case 'GIF':
//            flag = true;
//            break;
//        default:
//            flag = false;
//    }

//    return flag;
//}

//// Asynchronous file upload process
//function DocsIn_UploadFile() {
//    debugger;
//    var formData = new FormData();

//    var files = $("#inputFileUpload").get(0).files;
//    //files[0].size //(to check size)
//    // Add the uploaded image content to the form data collection
//    if (files.length > 0) {
//        FadePageCover(true);
//        for (i = 0; i < files.length;i++)
//            formData.append("FileNames", files[i]);
//    }
//    formData.append("pOperationCode", $("#hOperationCode").val())
//    //data.append("OperationCode", $("#hOperationCode").val());
//    // Make Ajax request with the contentType = false, and processDate = false
//    var ajaxRequest = $.ajax({
//        type: "POST",
//        xhr: function () {  // Custom XMLHttpRequest
//            var myXhr = $.ajaxSettings.xhr();
//            if (myXhr.upload) { // Check if upload property exists
//                myXhr.upload.addEventListener('progress', progressHandlingFunction, false); // For handling the progress of the upload
//            }
//            return myXhr;
//        },
//        url: "/api/DocsIn/UploadFile",
//        contentType: false,
//        processData: false,
//        data: formData,
//        success: function (data) {
//            FadePageCover(false);
//            swal("Success", "File(s) uploaded successfully.");
//        },
//        error: function (jqXHR, exception) {
//            FadePageCover(false);
//            swal(strSorry, "Uploading failed. Please check the file length is less than 4 MB.");
//        }
//    });
//    ajaxRequest.done(function (xhr, textStatus) {
//        // Do other operation
//        debugger;
//    });
//}


//$(':file').change(function () {
//    debugger;
//    var file = this.files[0];
//    var name = file.name;
//    var size = file.size;
//    var type = file.type;
//    //Your validation
//});



