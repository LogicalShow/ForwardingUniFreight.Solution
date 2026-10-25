function PalletClassification_Initialize() {
    debugger;
    $("#hl-menu-Warehousing").parent().siblings().removeClass("active");
    strBindTableRowsFunctionName = "PalletClassification_BindTableRows";
    strLoadWithPagingFunctionName = "/api/PalletClassification/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = " WHERE 1=1";
    var pOrderBy = "Name";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/Warehousing/MasterData/PalletClassification", "div-content", function () {
        $.getScript(strServerURL + '/Scripts/Warehousing/MasterData/PalletClassification.js?' + glbVersion, function () {
            LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
                , function (pData) {
                    PalletClassification_BindTableRows(JSON.parse(pData[0]));
                });
            });
            if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
        }
        , function () { PalletClassification_ClearAllControls(); }
        , function () { PalletClassification_DeleteList(); });
}
function PalletClassification_BindTableRows(pPalletClassification) {
    debugger;
    $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblPalletClassification");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pPalletClassification, function (i, item) {
        AppendRowtoTable("tblPalletClassification",
        ("<tr ID='" + item.ID + "' ondblclick='PalletClassification_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Name'>" + (item.Name == 0 ? "" : item.Name) + "</td>"
                    + "<td class='CBM'>" + (item.CBM == 0 ? "" : item.CBM) + "</td>"
                    + "<td class='hide'><a href='#PalletClassificationModal' data-toggle='modal' onclick='PalletClassification_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblPalletClassification", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblPalletClassification>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function PalletClassification_LoadingWithPaging() {
    debugger;
    var pWhereClause = PalletClassification_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "Name";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { PalletClassification_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblPalletClassification>tbody>tr", $("#txt-Search").val().trim());
}
function PalletClassification_GetWhereClause() {
    return ($("#txt-Search").val().trim() == "" ? "WHERE 1=1" : ("WHERE CBM LIKE N'%" + $("#txt-Search").val().trim() + "%' OR Name LIKE N'%" + $("#txt-Search").val().trim() + "%'"));
}
function PalletClassification_EditByDblClick(pID) {
    jQuery("#PalletClassificationModal").modal("show");
    PalletClassification_FillControls(pID);
}
function PalletClassification_ClearAllControls(callback) {
    ClearAll("#PalletClassificationModal");

    $("#btnSave").attr("onclick", "PalletClassification_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "PalletClassification_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
}
function PalletClassification_FillControls(pID) {
    debugger;
    ClearAll("#PalletClassificationModal", null);
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    $("#lblShown").html("<span> : </span><span>" + $(tr).find("td.Name").text() + "</span>");
    $("#txtcbm").val($(tr).find("td.CBM").text());
    $("#txtName").val($(tr).find("td.Name").text());

    $("#btnSave").attr("onclick", "PalletClassification_Update(false);");
    $("#btnSaveandNew").attr("onclick", "PalletClassification_Update(true);");
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $("#lblShown").reverseChildren();
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
}
function PalletClassification_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/PalletClassification/Insert"
        , {
            pCBM: $("#txtcbm").val().trim() == "" ? 0 : $("#txtcbm").val().trim().toUpperCase()
            , pName: $("#txtName").val().trim() == "" ? 0 : $("#txtName").val().trim().toUpperCase()
           
        }, pSaveandAddNew, "PalletClassificationModal", function () { PalletClassification_LoadingWithPaging(); PalletClassification_ClearAllControls(); });
}
function PalletClassification_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/PalletClassification/Update"
        , {
            pID: $("#hID").val()
            , pCBM: $("#txtcbm").val().trim() == "" ? 0 : $("#txtcbm").val().trim().toUpperCase()
            , pName: $("#txtName").val().trim() == "" ? 0 : $("#txtName").val().trim().toUpperCase()
          
        }, pSaveandAddNew, "PalletClassificationModal", function () { PalletClassification_LoadingWithPaging(); PalletClassification_ClearAllControls(); });
}
function PalletClassification_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblPalletClassification', 'Delete') != "")
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
            DeleteListFunction("/api/PalletClassification/Delete", { "pPalletClassificationIDs": GetAllSelectedIDsAsString('tblPalletClassification', 'Delete') }, function () {
                PalletClassification_LoadingWithPaging();
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}
