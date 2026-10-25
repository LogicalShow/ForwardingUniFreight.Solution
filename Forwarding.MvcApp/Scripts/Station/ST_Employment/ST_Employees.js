function ST_Employees_BindTableRows(pST_Employees) {
    $("#hl-menu-Station").parent().addClass("active");
    var UploadText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Upload") + "</span>";

    ClearAllTableRows("tblST_Employees");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pST_Employees, function (i, item) {
        AppendRowtoTable("tblST_Employees",
        ("<tr ID='" + item.ID + "' ondblclick='ST_Employees_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='Name'>" + item.Name + "</td>"
            + "<td class='BirthDate hide' >" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.BirthDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.BirthDate))) + "</td>"
            + "<td class='NationalID hide'>" + item.NationalID + "</td>"
            + "<td class='Address hide'>" + item.Address + "</td>"
            + "<td class='PhoneNumber1 hide'>" + item.PhoneNumber1 + "</td>"
            + "<td class='PhoneNumber2 hide'>" + item.PhoneNumber2 + "</td>"
            + "<td class='degree hide'>" + item.degree + "</td>"
            + "<td class='Section hide'>" + item.Section + "</td>"
            + "<td class='JoiningDate hide' >" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JoiningDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JoiningDate))) + "</td>"
            + "<td class='Gender hide'>" + item.Gender + "</td>"
            + "<td class='Religion hide'>" + item.Religion + "</td>"
            + "<td class='maritalstatus hide'>" + item.maritalstatus + "</td>"
            + "<td class='NumberofChildren hide'>" + item.NumberofChildren + "</td>"
            + "<td class='militarystatus hide'>" + item.militarystatus + "</td>"
            + "<td class='accessories hide'>" + item.accessories + "</td>"
            + "<td class='Salary hide'>" + item.Salary + "</td>"
            + "<td class='category hide'>" + item.category + "</td>"
            + "<td class='shiftEmp hide'>" + item.shiftEmp + "</td>"
            + "<td class='routeLine hide'>" + item.routeLine + "</td>"
            + "<td class='IsInactive hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsInactive == true ? "true' checked='checked'" : "'") + " /></td>"
            + "<td class='Upload'><a href='#tabUploadFiles' data-toggle='modal' onclick='UploadFiles(" + item.ID + ");' " + UploadText + "</a></td>"



                    + "<td class='hide'><a href='#ST_EmployeesModal' data-toggle='modal' onclick='ST_Employees_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblST_Employees", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblST_Employees>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function UploadFiles(pID) {
    debugger;
    $("#hID").val(pID);
    ClearAll("#UploadFilesModal");
    jQuery("#UploadFilesModal").modal("show");
    Vouchers_GeneralUpload_Initialise();

}
function Vouchers_GeneralUpload_Initialise() {
    debugger;
    glbGeneralUploadModalName = ""; //if the upload is in a modal then is not opened
    glbGeneralUploadTableName = "tblUploadedFiles_ST_Employees";
    //glbGeneralUploadFolderName = $("#hID").val() == "" ? "" : $("#txtName").val().trim();
    glbGeneralUploadFolderName = $("#hID").val() == "" ? "" : $("#hID").val();

    glbGeneralUploadPath = "/DocsInFiles//ST_Employees//";
    glbGeneralUploadRelativePath = "~/DocsInFiles/ST_Employees/";
    glbGeneralUploadBtnUploadName = "inputFileUpload_ST_Employees";
    glbTblTHSelectAllTagName = "HeaderDeleteUploadedFiles_ST_Employees";
    glbTblInputSelectAllInputName = "cb-CheckAll-UploadedFiles_ST_Employees";

    if (glbGeneralUploadFolderName != "")
        GeneralUpload_FillControls();
}

function ST_Employees_LoadingWithPaging() {
    debugger;
    var pWhereClause = ST_Employees_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "Name";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { ST_Employees_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblST_Employees>tbody>tr", $("#txt-Search").val().trim());
}
function ST_Employees_GetWhereClause() {
    return ($("#txt-Search").val().trim() == "" ? "WHERE 1=1" : ("WHERE Name LIKE N'%" + $("#txt-Search").val().trim() + "%'"));
}
function ST_Employees_EditByDblClick(pID) {
    jQuery("#ST_EmployeesModal").modal("show");
    ST_Employees_FillControls(pID);
}
function ST_Employees_FillControls(pID) {
    debugger;
    ClearAll("#ST_EmployeesModal", null);
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    $("#lblShown").html("<span> : </span><span>" + $(tr).find("td.Name").text() + "</span>");
    $("#txtName").val($(tr).find("td.Name").text());
    $("#txtBirthOfDate").val($(tr).find("td.BirthDate").text());
    $("#txtIDNumber").val($(tr).find("td.NationalID").text());
    $("#txtAddress").val($(tr).find("td.Address").text());
    $("#txtPhone1").val($(tr).find("td.PhoneNumber1").text());
    $("#txtPhone2").val($(tr).find("td.PhoneNumber2").text());
    $("#txtDegree").val($(tr).find("td.degree").text());
    //$("#txtSection").val($(tr).find("td.Section").text());
    $("#txtJoinDate").val($(tr).find("td.JoiningDate").text());
    $("#cbIsMale").prop('checked', ($(tr).find('td.Gender').text() == "true" ? true : false));
    $("#cbIsFemale").prop('checked', ($(tr).find('td.Gender').text() == "true" ? false : true));
    $("#txtReligion").val($(tr).find("td.Religion").text());
    $("#txtmaritalstatus").val($(tr).find("td.militarystatus").text());
    $("#txtNumberofChildren").val($(tr).find("td.NumberofChildren").text());
    $("#txtmilitarystatus").val($(tr).find("td.militarystatus").text());
    $("#txtaccessories").val($(tr).find("td.accessories").text());
    $("#txtSalary").val($(tr).find("td.Salary").text());
    $("#slcategory").val($(tr).find("td.category").text());
    $("#slShift").val($(tr).find("td.shiftEmp").text());
    $("#txtrouteLine").val($(tr).find("td.routeLine").text());

    $("#slReligion").val($(tr).find("td.Religion").text());
    $("#slmilitarystatus").val($(tr).find("td.maritalstatus").text());
    $("#slSection").val($(tr).find("td.Section").text());
    $("#cbIsInactive").prop('checked', $(tr).find('td.IsInactive').find('input').attr('val'));



    $("#btnSave").attr("onclick", "ST_Employees_Update(false);");
    $("#btnSaveandNew").attr("onclick", "ST_Employees_Update(true);");
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $("#lblShown").reverseChildren();
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
}
function ST_Employees_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/ST_Employees/Insert",
        {
            pName: $("#txtName").val().trim(),
            pBirthDate: $('#txtBirthOfDate').val() == '' ? '1900-1-1' : ConvertDateFormat($('#txtBirthOfDate').val()),
            pNationalID: $("#txtIDNumber").val().trim() == '' ? "0" : $("#txtIDNumber").val().trim(),
            pAddress: $("#txtAddress").val().trim() == '' ? "0" : $("#txtAddress").val().trim(),
            pPhoneNumber1: $("#txtPhone1").val().trim() == '' ? "0" : $("#txtPhone1").val().trim(),
            pPhoneNumber2: $("#txtPhone2").val().trim() == '' ? "0" : $("#txtPhone2").val().trim(),
            pdegree: $("#txtDegree").val().trim() == '' ? "0" : $("#txtDegree").val().trim(),
            //pSection: $("#txtSection").val().trim() == '' ? "0" : $("#txtSection").val().trim(),
            pSection: $("#slSection").val() == '' ? "1" : $("#slSection").val(),

            pJoiningDate: $('#txtJoinDate').val() == '' ? '1900-1-1' : ConvertDateFormat($('#txtJoinDate').val()),
            pGender: $("#cbIsMale").prop("checked") ? true : false,
           // pReligion: $("#txtReligion").val().trim() == '' ? "0" : $("#txtReligion").val().trim(),
            //pmaritalstatus: $("#txtmaritalstatus").val().trim() == '' ? "0" : $("#txtmaritalstatus").val().trim(),
            pReligion: $("#slReligion").val() == '' ? "1" : $("#slReligion").val().trim(),

            pmaritalstatus: $("#slmilitarystatus").val() == '' ? "1" : $("#slmilitarystatus").val(),

            pNumberofChildren: $("#txtNumberofChildren").val().trim() == '' ? "0" : $("#txtNumberofChildren").val().trim(),
            pmilitarystatus: $("#txtmilitarystatus").val().trim() == '' ? "0" : $("#txtmilitarystatus").val().trim(),
            paccessories: $("#txtaccessories").val().trim() == '' ? "0" : $("#txtaccessories").val().trim(),
            pSalary: $("#txtSalary").val().trim() == '' ? "0" : $("#txtSalary").val().trim(),
            pcategory: $("#slcategory").val() == '' ? "1" : $("#slcategory").val(),
            pshiftEmp: $("#slShift").val() == '' ? "1" : $("#slShift").val(),
            prouteLine: $("#txtrouteLine").val().trim() == '' ? "0" : $("#txtrouteLine").val().trim(),
            pIsInactive: $("#cbIsInactive").prop('checked')


        }
        , pSaveandAddNew, "ST_EmployeesModal", function () { ST_Employees_LoadingWithPaging(); ST_Employees_ClearAllControls(); });
}
function ST_Employees_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/ST_Employees/Update", {
        pID: $("#hID").val(),
        pName: $("#txtName").val().trim(),
        pBirthDate: $('#txtBirthOfDate').val() == '' ? '1900-1-1' : ConvertDateFormat($('#txtBirthOfDate').val()),
        pNationalID: $("#txtIDNumber").val().trim() == '' ? "0" : $("#txtIDNumber").val().trim(),
        pAddress: $("#txtAddress").val().trim() == '' ? "0" : $("#txtAddress").val().trim(),
        pPhoneNumber1: $("#txtPhone1").val().trim() == '' ? "0" : $("#txtPhone1").val().trim(),
        pPhoneNumber2: $("#txtPhone2").val().trim() == '' ? "0" : $("#txtPhone2").val().trim(),
        pdegree: $("#txtDegree").val().trim() == '' ? "0" : $("#txtDegree").val().trim(),
        //pSection: $("#txtSection").val().trim() == '' ? "0" : $("#txtSection").val().trim(),
        pSection: $("#slSection").val() == '' ? "1" : $("#slSection").val(),
        pJoiningDate: $('#txtJoinDate').val() == '' ? '1900-1-1' : ConvertDateFormat($('#txtJoinDate').val()),
        pGender: $("#cbIsMale").prop("checked") ? true : false,
        //pReligion: $("#txtReligion").val().trim() == '' ? "0" : $("#txtReligion").val().trim(),
        pReligion: $("#slReligion").val() == '' ? "1" : $("#slReligion").val().trim(),
       // pmaritalstatus: $("#txtmaritalstatus").val().trim() == '' ? "0" : $("#txtmaritalstatus").val().trim(),
        pmaritalstatus: $("#slmilitarystatus").val() == '' ? "1" : $("#slmilitarystatus").val(),
        pNumberofChildren: $("#txtNumberofChildren").val().trim() == '' ? "0" : $("#txtNumberofChildren").val().trim(),
        pmilitarystatus: $("#txtmilitarystatus").val().trim() == '' ? "0" : $("#txtmilitarystatus").val().trim(),
        paccessories: $("#txtaccessories").val().trim() == '' ? "0" : $("#txtaccessories").val().trim(),
        pSalary: $("#txtSalary").val().trim() == '' ? "0" : $("#txtSalary").val().trim(),
        pcategory: $("#slcategory").val() == '' ? "1" : $("#slcategory").val(),
        pshiftEmp: $("#slShift").val() == '' ? "1" : $("#slShift").val().trim(),
        prouteLine: $("#txtrouteLine").val().trim() == '' ? "0" : $("#txtrouteLine").val().trim(),
        pIsInactive: $("#cbIsInactive").prop('checked')

    }, pSaveandAddNew, "ST_EmployeesModal", function () { ST_Employees_LoadingWithPaging(); ST_Employees_ClearAllControls(); });
}
function ST_Employees_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblST_Employees', 'Delete') != "")
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
            DeleteListFunction("/api/ST_Employees/Delete", { "pST_EmployeesIDs": GetAllSelectedIDsAsString('tblST_Employees', 'Delete') }, function () {
                ST_Employees_LoadingWithPaging();
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}
function ST_Employees_ClearAllControls(callback) {
    ClearAll("#ST_EmployeesModal");

    $("#btnSave").attr("onclick", "ST_Employees_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "ST_Employees_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);


    $("#txtName").val("");
    $("#txtBirthOfDate").val("");
    $("#txtIDNumber").val("");
    $("#txtAddress").val("");
    $("#txtPhone1").val("");
    $("#txtPhone2").val("");
    $("#txtDegree").val("");
    $("#txtSection").val("");
    $("#txtReligion").val("");
    $("#txtmaritalstatus").val("");
    $("#txtNumberofChildren").val("");
    $("#txtmilitarystatus").val("");
    $("#txtaccessories").val("");
    $("#txtSalary").val("");
    $("#txtrouteLine").val("");

    $("#slcategory").val("1");
    $("#slShift").val("1");
    $("#slmilitarystatus").val("1");
    $("#slSection").val("1");
    $("#slReligion").val("1");





    if (callback != null && callback != undefined)
        callback();
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
}
function Print_Excel() {
    var arr_Keys = new Array();
    var arr_Values = new Array();
    arr_Keys.push("ID");


    arr_Values.push("1");



    var pParametersWithValues =
    {
        arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: "تقرير العمالة"
        , pReportName: "EmployeeExcel"
    };
    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintWithIDs?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '&pReportName=' + pParametersWithValues.pReportName + '';

    win.location = url;
}