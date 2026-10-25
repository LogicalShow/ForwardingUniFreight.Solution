function Template_BindTableRows(pTemplate) {
    debugger;
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblTemplate");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pTemplate, function (i, item) {
        AppendRowtoTable("tblTemplate",
        ("<tr ID='" + item.ID + "' ondblclick='Template_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Name'>" + item.Name + "</td>"
                    + "<td class='Subject'>" + (item.Subject == 0 ? "" : item.Subject) + "</td>"
                    + "<td class='TermsAndConditions hide'>" + (item.TermsAndConditions == 0 ? "" : item.TermsAndConditions) + "</td>"
                    + "<td class='hide'><a href='#TemplateModal' data-toggle='modal' onclick='Template_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblTemplate", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblTemplate>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function Template_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Template/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { Template_BindTableRows(pTabelRows); });
    HighlightText("#tblTemplate>tbody>tr", $("#txt-Search").val().trim());
    //if (callbackForDeleteFail != null)
    //    callbackForDeleteFail();
}
function Template_EditByDblClick(pID) {
    jQuery("#TemplateModal").modal("show");
    Template_FillControls(pID);
}
function Template_ClearAllControls(callback) {
    ClearAll("#TemplateModal");
    $("#btnSave").attr("onclick", "Template_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "Template_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
}
function Template_FillControls(pID) {
    var tr = $("tr[ID='" + pID + "']");
    debugger;
    $("#hID").val(pID);
    $("#lblShown").html(": " + $(tr).find("td.Name").text());
    $("#txtName").val($(tr).find("td.Name").text());
    $("#txtSubject").val($(tr).find("td.Subject").text());
    $("#txtTermsAndConditions").val($(tr).find("td.TermsAndConditions").text());

    $("#btnSave").attr("onclick", "Template_Update(false);");
    $("#btnSaveandNew").attr("onclick", "Template_Update(true);");
}
function Template_Insert(pSaveAndNew) {
    debugger;
    if ($("#txtName").val().trim() == "")
        swal("Sorry", "Please, Enter name of the template.");
    else {
        FadePageCover(true);
        var pParametersWithValues = {
            pName: $("#txtName").val().trim() == "" ? "0" : $("#txtName").val().trim().toUpperCase()
            , pSubject: $("#txtSubject").val().trim() == "" ? "0" : $("#txtSubject").val().trimRight()
            , pTermsAndConditions: $("#txtTermsAndConditions").val().trim() == "" ? "0" : $("#txtTermsAndConditions").val().trim()
        };
        CallPOSTFunctionWithParameters("/api/Template/Insert", pParametersWithValues
            , function (pData) {
                //LoadDefaults("/api/Defaults/LoadAll", " WHERE ID = 1 ");
                if (pData) {
                    swal("Success", "Success, saved successfully.");
                    Template_LoadingWithPaging();
                    if (!pSaveAndNew)
                        jQuery("#TemplateModal").modal("hide");
                    else
                        Template_ClearAllControls();
                }
                else
                    swal("Sorry", "Saving failed, please try again and make sure not to use (')s.", "warning");
                FadePageCover(false);
            }
            , null);
    }
}
function Template_Update(pSaveAndNew) {
    debugger;
    if ($("#txtName").val().trim() == "")
        swal("Sorry", "Please, Enter name of the template.");
    else {
        FadePageCover(true);
        var pParametersWithValues = {
            pID: $("#hID").val()
            , pName: $("#txtName").val().trim() == "" ? "0" : $("#txtName").val().trim().toUpperCase()
            , pSubject: $("#txtSubject").val().trim() == "" ? "0" : $("#txtSubject").val().trimRight()
            , pTermsAndConditions: $("#txtTermsAndConditions").val().trim() == "" ? "0" : $("#txtTermsAndConditions").val().trim()
        };
        CallPOSTFunctionWithParameters("/api/Template/Update", pParametersWithValues
            , function (pData) {
                //LoadDefaults("/api/Defaults/LoadAll", " WHERE ID = 1 ");
                if (pData) {
                    swal("Success", "Success, saved successfully.");
                    Template_LoadingWithPaging();
                    if (!pSaveAndNew)
                        jQuery("#TemplateModal").modal("hide");
                    else
                        Template_ClearAllControls();
                }
                else
                    swal("Sorry", "Saving failed, please try again and make sure not to use (')s.", "warning");
                FadePageCover(false);
            }
            , null);
    }
}
function Template_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblTemplate') != "")
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
            DeleteListFunction("/api/Template/Delete", { "pTemplateIDs": GetAllSelectedIDsAsString('tblTemplate') }, function () {
                Template_LoadingWithPaging();
            });
        });
}
