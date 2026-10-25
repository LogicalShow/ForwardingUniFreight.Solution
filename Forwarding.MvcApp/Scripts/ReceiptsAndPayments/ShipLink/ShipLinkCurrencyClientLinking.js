function ShipLinkCurrencyClientLinking_BindTableRows(pTableRows) {
    debugger;
    $("#hl-menu-ShipLink").parent().addClass("active");
    ClearAllTableRows("tblShipLinkCurrencyClientLinking");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pTableRows, function (i, item) {
        AppendRowtoTable("tblShipLinkCurrencyClientLinking",
        ("<tr ID='" + item.ID + "' ondblclick='ShipLinkCurrencyClientLinking_FillControls(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='CurrencyID hide'>" + item.CurrencyID + "</td>"
                    + "<td class='CurrencyCode'>" + (item.CurrencyCode == 0 ? "" : item.CurrencyCode) + "</td>"
                    + "<td class='AccountID hide'>" + item.AccountID + "</td>"
                    + "<td class='AccountName'>" + (item.AccountName == 0 ? "" : item.AccountName) + "</td>"
                    + "<td class='hide'><a href='#ShipLinkCurrencyClientLinkingModal' data-toggle='modal' onclick='ShipLinkCurrencyClientLinking_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblShipLinkCurrencyClientLinking", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblShipLinkCurrencyClientLinking>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function ShipLinkCurrencyClientLinking_LoadingWithPaging() {
    debugger;
    var pWhereClause = ShipLinkCurrencyClientLinking_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = 1;//($("#div-Pager li.active a").text() == "" || $("#txt-Search").val().trim() != "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "CurrencyCode";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { ShipLinkCurrencyClientLinking_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblShipLinkCurrencyClientLinking>tbody>tr", $("#txt-Search").val().trim());
}
function ShipLinkCurrencyClientLinking_GetWhereClause() {
    var pWhereClause = "WHERE 1=1";
    if ($("#txt-Search").val().trim() != "") {
        pWhereClause += " AND (" + "\n";
        pWhereClause += " AccountName LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += " OR CurrencyCode LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += ")";
    }
    return pWhereClause;
}
function ShipLinkCurrencyClientLinking_ClearAllControls(callback) {
    ClearAll("#ShipLinkCurrencyClientLinkingModal");

    $("#btnSave").attr("onclick", "ShipLinkCurrencyClientLinking_Save(false);");
    $("#btnSaveandNew").attr("onclick", "ShipLinkCurrencyClientLinking_Save(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
}
function ShipLinkCurrencyClientLinking_FillControls(pID) {
    debugger;
    ClearAll("#ShipLinkCurrencyClientLinkingModal", null);
    jQuery("#ShipLinkCurrencyClientLinkingModal").modal("show");

    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    $("#lblShown").html("<span> : </span><span>" + $(tr).find("td.CurrencyCode").text() + "</span>");

    $("#slCurrency").val($(tr).find("td.CurrencyID").text());
    $("#slAccount").val($(tr).find("td.AccountID").text());

    $("#btnSave").attr("onclick", "ShipLinkCurrencyClientLinking_Save(false);");
    $("#btnSaveandNew").attr("onclick", "ShipLinkCurrencyClientLinking_Save(true);");
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $("#lblShown").reverseChildren();
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
}
function ShipLinkCurrencyClientLinking_Save(pSaveandAddNew) {
    debugger;
    if (ValidateForm("form", "ShipLinkCurrencyClientLinkingModal")) {
        FadePageCover(true);
        var pParametersWithValues = {
            pID: ($("#hID").val() == "" ? 0 : $("#hID").val())
            , pAccountID: $("#slAccount").val()
            , pSubAccountID: 0
            , pClientID: 0
            , pCurrencyID: $("#slCurrency").val()
        };
        CallGETFunctionWithParameters("/api/ShipLinkCurrencyClientLinking/Save", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    //FadePageCover(false); //called in LoadWithPaging
                    swal("Success", "Saved successfully.");
                    ShipLinkCurrencyClientLinking_LoadingWithPaging();
                    if (pSaveandAddNew)
                        ShipLinkCurrencyClientLinking_ClearAllControls();
                    else
                        jQuery("#ShipLinkCurrencyClientLinkingModal").modal("hide");
                }
                else {
                    FadePageCover(false);
                    swal("Sorry", "Entry must be unique.");
                }
            }
            , null);
    }
}
function ShipLinkCurrencyClientLinking_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblShipLinkCurrencyClientLinking', 'Delete') != "")
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
            DeleteListFunction("/api/ShipLinkCurrencyClientLinking/Delete", { "pIDs": GetAllSelectedIDsAsString('tblShipLinkCurrencyClientLinking', 'Delete') }, function () {
                ShipLinkCurrencyClientLinking_LoadingWithPaging();
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}