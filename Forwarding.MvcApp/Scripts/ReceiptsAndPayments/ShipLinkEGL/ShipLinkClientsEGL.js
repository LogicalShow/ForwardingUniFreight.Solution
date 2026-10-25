$(document).ready(function () {
    $('#slCustomer').css({ 'width': '100%' }).select2();
    $("div[tabindex='-1']").removeAttr('tabindex');
    $('#slCustomerShipping').css({ 'width': '100%' }).select2();
    $("div[tabindex='-1']").removeAttr('tabindex');
});

function ShipLinkClientsEGL_BindTableRows(pTableRows) {
    debugger;
    $("#hl-menu-ShipLink").parent().addClass("active");
    ClearAllTableRows("tblShipLinkClientsEGL");
    editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pTableRows, function (i, item) {
        AppendRowtoTable("tblShipLinkClientsEGL",
        //("<tr ID='" + item.ID + "' ondblclick='ShipLinkClientsEGL_FillControls(" + item.ID + ");'>"
        ("<tr ID=" + item.ID + ">"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Name'>" + (item.Name == 0 ? "" : item.Name) + "</td>"
                    + "<td class='ArName'>" + (item.ArName == 0 ? "" : item.ArName) + "</td>"
                    + "<td class=''><a data-toggle='modal' onclick='ShipLinkClientsEGL_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
        + "</tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblShipLinkClientsEGL", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblShipLinkClientsEGL>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function ShipLinkClientsEGL_LoadingWithPaging() {
    debugger;
    jQuery("#ShipLinkClientModal").modal("hide");

    var pWhereClause = ShipLinkClientsEGL_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = 1;//($("#div-Pager li.active a").text() == "" || $("#txt-Search").val().trim() != "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "Name, ArName";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { ShipLinkClientsEGL_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblShipLinkClientsEGL>tbody>tr", $("#txt-Search").val().trim());
}
function ShipLinkClientsEGL_GetWhereClause() {
    debugger;
    var pWhereClause = "WHERE 1=1";
    if ($("#txt-Search").val().trim() != "") {
        pWhereClause += " AND (" + "\n";
        pWhereClause += "Name LIKE N'%" + $("#txt-Search").val().trim() + "%'";
        pWhereClause += "OR ArName LIKE N'%" + $("#txt-Search").val().trim() + "%'";
        pWhereClause += ")" + "\n";
    }
    return pWhereClause;
}
function ShipLinkClientsEGL_Save() {
    debugger;
    if (pDefaults.UnEditableCompanyName == "EGL") {
        var pSelectedIDs = GetAllSelectedIDsAsString('tblShipLinkClientsEGL', 'Delete');
        if ($("#slCustomer").val() == "" || $("#slCustomer").val() == "0")
            swal("Sorry", "Please, select client.");
        else if ($("#slCustomer").val() == "" || $("#slCustomer").val() == "0")
            swal("Sorry", "Please, Select client.");
        else {
            FadePageCover(true);

            CallGETFunctionWithParameters("/api/ShipLinkClientsEGL/Save"
                , {
                    pID: 0,
                    pERP_CustomerID: $("#slCustomer").val()
                    , pShipping_CustomerID: $("#slCustomerShipping").val()
                }
                , function (pData) {
                    if (pData[0]) {
                        swal("Success", "Saved successfully");
                        ShipLinkClientsEGL_LoadingWithPaging();
                    }
                    else
                        swal("Sorry", "Connection failed, please try again.");
                    FadePageCover(false);
                }
                , null);

        }
    }
    else {
        var pSelectedIDs = GetAllSelectedIDsAsString('tblShipLinkClientsEGL', 'Delete');
        if (pSelectedIDs == "")
            swal("Sorry", "Please, select at least one client.");
        else if ($("#slClientGroup").val() == 0)
            swal("Sorry", "Please, Select client group.");
        else {
            FadePageCover(true);
            if (pSelectedIDs != "") {
                CallGETFunctionWithParameters("/api/ShipLinkClientsEGL/Save3Sea"
                    , {
                        pSelectedIDs: pSelectedIDs
                        , pClientGroupID: $("#slClientGroup").val()
                    }
                    , function (pData) {
                        if (pData[0]) {
                            swal("Success", "Saved successfully");
                            ShipLinkClientsEGL_LoadingWithPaging();
                        }
                        else
                            swal("Sorry", "Connection failed, please try again.");
                        FadePageCover(false);
                    }
                    , null);
            }
        }
    }
   
}
function ShipLinkClientsEGL_FillControls(pID) {
    debugger;
    jQuery("#ShipLinkClientModal").modal("show");

    $.ajax({
        type: "GET",
        url: strServerURL + "/api/ShipLinkClientsEGL/getLinkClient",
        data: { pID: pID },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            if (d[0] != "") {
                $("#slCustomer").val(pID);
                $('#slCustomer').trigger('change');

                $("#slCustomerShipping").val(pID);
                $('#slCustomerShipping').trigger('change');


            }
            else {
                $("#slCustomerShipping").val(pID);
                $('#slCustomerShipping').trigger('change');


            }
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
            FadePageCover(false);
        }
    });

}