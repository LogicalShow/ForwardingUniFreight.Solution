function ShipLinkInvoiceTypeToJournal_Payment_BindTableRows(pTableRows) {
    debugger;
    $("#hl-menu-ShipLink").parent().addClass("active");
    ClearAllTableRows("tblShipLinkInvoiceTypeToJournal_Payment");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pTableRows, function (i, item) {
        AppendRowtoTable("tblShipLinkInvoiceTypeToJournal_Payment",
        ("<tr ID='" + item.ID + "' ondblclick='ShipLinkInvoiceTypeToJournal_Payment_FillControls(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='InvoiceTypeID hide'>" + item.InvoiceTypeID + "</td>"
                    + "<td class='InvoiceTypeName'>" + (item.InvoiceTypeName == 0 ? "" : item.InvoiceTypeName) + "</td>"
                    + "<td class='JournalTypeID hide'>" + item.JournalTypeID + "</td>"
                    + "<td class='JournalTypeName'>" + (item.JournalTypeName == 0 ? "" : item.JournalTypeName) + "</td>"
                    + "<td class='JVTypeID hide'>" + item.JVTypeID + "</td>"
                    + "<td class='JVTypeName'>" + (item.JVTypeName == 0 ? "" : item.JVTypeName) + "</td>"
                    + "<td class='AccountID hide'>" + item.AccountID + "</td>"
                    + "<td class='AccountName'>" + (item.AccountName == 0 ? "" : item.AccountName) + "</td>"
                    + "<td class='SubAccountID hide'>" + item.SubAccountID + "</td>"
                    + "<td class='SubAccountName'>" + (item.SubAccountName == 0 ? "" : item.SubAccountName) + "</td>"
                    + "<td class='hide'><a href='#ShipLinkInvoiceTypeToJournal_PaymentModal' data-toggle='modal' onclick='ShipLinkInvoiceTypeToJournal_Payment_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblShipLinkInvoiceTypeToJournal_Payment", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblShipLinkInvoiceTypeToJournal_Payment>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function ShipLinkInvoiceTypeToJournal_Payment_LoadingWithPaging() {
    debugger;
    var pWhereClause = ShipLinkInvoiceTypeToJournal_Payment_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = 1;//($("#div-Pager li.active a").text() == "" || $("#txt-Search").val().trim() != "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "InvoiceTypeName, JournalTypeName";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { ShipLinkInvoiceTypeToJournal_Payment_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblShipLinkInvoiceTypeToJournal_Payment>tbody>tr", $("#txt-Search").val().trim());
}
function ShipLinkInvoiceTypeToJournal_Payment_GetWhereClause() {
    var pWhereClause = "WHERE 1=1";
    if ($("#txt-Search").val().trim() != "") {
        pWhereClause += " AND (" + "\n";
        pWhereClause += " InvoiceTypeName LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += " OR JournalTypeName LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += " OR JVTypeName LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += " OR AccountName LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += " OR SubAccountName LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += ")";
    }
    return pWhereClause;
}
function ShipLinkInvoiceTypeToJournal_Payment_ClearAllControls(callback) {
    ClearAll("#ShipLinkInvoiceTypeToJournal_PaymentModal");
    $("#slSubAccount").html("<option value=0>" + TranslateString("SelectFromMenu") + "</option>");

    $("#btnSave").attr("onclick", "ShipLinkInvoiceTypeToJournal_Payment_Save(false);");
    $("#btnSaveandNew").attr("onclick", "ShipLinkInvoiceTypeToJournal_Payment_Save(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
}
function ShipLinkInvoiceTypeToJournal_Payment_FillControls(pID) {
    debugger;
    ClearAll("#ShipLinkInvoiceTypeToJournal_PaymentModal", null);
    jQuery("#ShipLinkInvoiceTypeToJournal_PaymentModal").modal("show");

    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    $("#lblShown").html("<span> : </span><span>" + $(tr).find("td.InvoiceTypeName").text() + "</span>");

    $("#slInvoiceType").val($(tr).find("td.InvoiceTypeID").text());
    $("#slJournalType").val($(tr).find("td.JournalTypeID").text());
    $("#slJVType").val($(tr).find("td.JVTypeID").text());
    $("#slAccount").val($(tr).find("td.AccountID").text());
    //$("#slSubAccount").val($(tr).find("td.SubAccountID").text());
    ShipLinkInvoiceTypeToJournal_Payment_FillSlSubAccount("slSubAccount", $(tr).find("td.SubAccountID").text());

    $("#btnSave").attr("onclick", "ShipLinkInvoiceTypeToJournal_Payment_Save(false);");
    $("#btnSaveandNew").attr("onclick", "ShipLinkInvoiceTypeToJournal_Payment_Save(true);");
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $("#lblShown").reverseChildren();
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
}
function ShipLinkInvoiceTypeToJournal_Payment_Save(pSaveandAddNew) {
    debugger;
    if (ValidateForm("form", "ShipLinkInvoiceTypeToJournal_PaymentModal")) {
        FadePageCover(true);
        var pParametersWithValues = {
            pID: ($("#hID").val() == "" ? 0 : $("#hID").val())
            , pInvoiceTypeID: $("#slInvoiceType").val()
            , pJournalTypeID: $("#slJournalType").val()
            , pJVTypeID: $("#slJVType").val()
            , pAccountID: $("#slAccount").val()
            , pSubAccountID: $("#slSubAccount").val()
        };
        CallGETFunctionWithParameters("/api/ShipLinkInvoiceTypeToJournal_Payment/Save", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    //FadePageCover(false); //called in LoadWithPaging
                    swal("Success", "Saved successfully.");
                    ShipLinkInvoiceTypeToJournal_Payment_LoadingWithPaging();
                    if (pSaveandAddNew)
                        ShipLinkInvoiceTypeToJournal_Payment_ClearAllControls();
                    else
                        jQuery("#ShipLinkInvoiceTypeToJournal_PaymentModal").modal("hide");
                }
                else {
                    FadePageCover(false);
                    swal("Sorry", "Entry must be unique.");
                }
            }
            , null);
    }
}
function ShipLinkInvoiceTypeToJournal_Payment_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblShipLinkInvoiceTypeToJournal_Payment', 'Delete') != "")
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
            DeleteListFunction("/api/ShipLinkInvoiceTypeToJournal_Payment/Delete", { "pIDs": GetAllSelectedIDsAsString('tblShipLinkInvoiceTypeToJournal_Payment', 'Delete') }, function () {
                ShipLinkInvoiceTypeToJournal_Payment_LoadingWithPaging();
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}
/******************************************************************************************/
function ShipLinkInvoiceTypeToJournal_Payment_FillSlSubAccount(pSlName, pSubAccountID) {
    debugger;
    if ($("#slAccount").val() == 0) //No Account is selected so just empty subaccounts
        $("#slSubAccount").html("<option value=0>" + TranslateString("SelectFromMenu") + "</option>");
    else {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/ChartOfLinkingAccounts/LoadSubAccountDetails"
            , {
                pLanguage: $("[id$='hf_ChangeLanguage']").val()
                , pWhereClauseSubAccountDetails: "WHERE IsMain=0 AND Account_ID=" + $("#slAccount").val()
                , pOrderBy: "Name"
            }
            , function (pData) {
                FillListFromObject_ERP(pSubAccountID, 4/*pCodeOrName*/, TranslateString("SelectFromMenu"), pSlName, pData[0], null);
                FadePageCover(false);
            }
            , null);
    }
}
