function BankTemplate_BindTableRows(pBankTemplate) {
    debugger;
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblBankTemplate");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pBankTemplate, function (i, item) {
        AppendRowtoTable("tblBankTemplate",
        ("<tr ID='" + item.ID + "' ondblclick='BankTemplate_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Name'>" + item.Name + "</td>"
                    + "<td class='Subject'>" + (item.Subject == 0 ? "" : item.Subject) + "</td>"
                    + "<td class='hide'><a href='#BankTemplateModal' data-toggle='modal' onclick='BankTemplate_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblBankTemplate", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblBankTemplate>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function BankTemplate_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/BankTemplate/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { BankTemplate_BindTableRows(pTabelRows); });
    HighlightText("#tblBankTemplate>tbody>tr", $("#txt-Search").val().trim());
    //if (callbackForDeleteFail != null)
    //    callbackForDeleteFail();
}
function BankTemplate_EditByDblClick(pID) {
    jQuery("#BankTemplateModal").modal("show");
    BankTemplate_FillControls(pID);
}
function BankTemplate_ClearAllControls(callback) {
    ClearAll("#BankTemplateModal");
    $("#btnSave").attr("onclick", "BankTemplate_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "BankTemplate_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
}
function BankTemplate_FillControls(pID) {
    var tr = $("tr[ID='" + pID + "']");
    debugger;
    $("#hID").val(pID);
    $("#lblShown").html(": " + $(tr).find("td.Name").text());
    $("#txtName").val($(tr).find("td.Name").text());
    $("#txtSubject").val($(tr).find("td.Subject").text());
    
    $("#btnSave").attr("onclick", "BankTemplate_Update(false);");
    $("#btnSaveandNew").attr("onclick", "BankTemplate_Update(true);");
}
function BankTemplate_Insert(pSaveAndNew) {
    debugger;
    if ($("#txtName").val().trim() == "")
        swal("Sorry", "Please, Enter name of the BankTemplate.");
    else {
        FadePageCover(true);
        var pParametersWithValues = {
            pName: $("#txtName").val().trim() == "" ? "0" : $("#txtName").val().trim().toUpperCase()
            , pSubject: $("#txtSubject").val().trim() == "" ? "0" : $("#txtSubject").val().trimRight().toUpperCase()
        };
        CallPOSTFunctionWithParameters("/api/BankTemplate/Insert", pParametersWithValues
            , function (pData) {
                //LoadDefaults("/api/Defaults/LoadAll", " WHERE ID = 1 ");
                if (pData) {
                    swal("Success", "Success, saved successfully.");
                    BankTemplate_LoadingWithPaging();
                    if (!pSaveAndNew)
                        jQuery("#BankTemplateModal").modal("hide");
                    else
                        BankTemplate_ClearAllControls();
                }
                else
                    swal("Sorry", "Saving failed, please try again and make sure not to use (')s.", "warning");
                FadePageCover(false);
            }
            , null);
    }
}
function BankTemplate_Update(pSaveAndNew) {
    debugger;
    if ($("#txtName").val().trim() == "")
        swal("Sorry", "Please, Enter name of the BankTemplate.");
    else {
        FadePageCover(true);
        var pParametersWithValues = {
            pID: $("#hID").val()
            , pName: $("#txtName").val().trim() == "" ? "0" : $("#txtName").val().trim().toUpperCase()
            , pSubject: $("#txtSubject").val().trim() == "" ? "0" : $("#txtSubject").val().trimRight().toUpperCase()
        };
        CallPOSTFunctionWithParameters("/api/BankTemplate/Update", pParametersWithValues
            , function (pData) {
                //LoadDefaults("/api/Defaults/LoadAll", " WHERE ID = 1 ");
                if (pData) {
                    swal("Success", "Success, saved successfully.");
                    BankTemplate_LoadingWithPaging();
                    if (!pSaveAndNew)
                        jQuery("#BankTemplateModal").modal("hide");
                    else
                        BankTemplate_ClearAllControls();
                }
                else
                    swal("Sorry", "Saving failed, please try again and make sure not to use (')s.", "warning");
                FadePageCover(false);
            }
            , null);
    }
}
function BankTemplate_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblBankTemplate') != "")
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
            DeleteListFunction("/api/BankTemplate/Delete", { "pBankTemplateIDs": GetAllSelectedIDsAsString('tblBankTemplate') }, function () {
                BankTemplate_LoadingWithPaging();
            });
        });
}
