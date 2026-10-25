function ShipLinkStarShineRevenueItems_BindTableRows(pJVTypes) {
    $("#hl-menu-ShipLink").parent().addClass("active");
    ClearAllTableRows("tblShipLinkStarShineRevenueItems");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pJVTypes, function (i, item) {
        AppendRowtoTable("tblShipLinkStarShineRevenueItems",
        ("<tr ID='" + item.ID + "' ondblclick='ShipLinkStarShineRevenueItems_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='ShiplinkItemID hide'>" + item.ShiplinkItemID + "</td>"
                    + "<td class='ShipLinkItemName'>" + item.ShipLinkItemName + "</td>"

                    + "<td class='RevenueAccountID hide'>" + item.RevenueAccountID + "</td>"
                    + "<td class='RevenueAccountName'>" + item.RevenueAccountName + "</td>"

                    + "<td class='RevenueSubAccountID20 hide'>" + item.RevenueSubAccountID20 + "</td>"
                    + "<td class='RevenueSubAccountName20'>" + item.RevenueSubAccountName20 + "</td>"

                    + "<td class='RevenueSubAccountID40 hide'>" + item.RevenueSubAccountID40 + "</td>"
                    + "<td class='RevenueSubAccountName40'>" + item.RevenueSubAccountName40 + "</td>"

                    + "<td class='CostCenterID hide'>" + item.CostCenterID + "</td>"
                    + "<td class='CostCenterName'>" + item.CostCenterName + "</td>"

                    + "<td class='ImportExport'>" + item.ImportExport + "</td>"
                    + "<td class='LineID hide'>" + item.LineID + "</td>"
                    + "<td class='LineName'>" + item.LineName + "</td>"
                   

                    + "<td class='hide'><a href='#ShipLinkStarShineRevenueItemsModal' data-toggle='modal' onclick='ShipLinkStarShineRevenueItems_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblShipLinkStarShineRevenueItems", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblShipLinkStarShineRevenueItems>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function ShipLinkStarShineRevenueItems_LoadingWithPaging() {
    debugger;
    var pWhereClause = ShipLinkStarShineRevenueItems_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID desc";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { ShipLinkStarShineRevenueItems_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblShipLinkStarShineRevenueItems>tbody>tr", $("#txt-Search").val().trim());
}
function ShipLinkStarShineRevenueItems_GetWhereClause() {
  //  return ($("#txt-Search").val().trim() == "" ? "WHERE 1=1" : ("WHERE ShipLinkItemName LIKE N'%" + $("#txt-Search").val().trim() + "%'"));


    var WhereClause = "where 1=1";

    if ($('#slAccountSearch').val().trim() != "0") {
        WhereClause += " AND RevenueAccountID = " + $('#slAccountSearch').val() + "";
    }
    if ($('#slCostCenterSearch').val().trim() != "0") {
        WhereClause += " AND CostCenterID = " + $('#slCostCenterSearch').val() + "";
    }
    if ($('#slTypeSearch').val().trim() != "0") {
        WhereClause += " AND ImportExport = '" + $('#slTypeSearch').val() + "'";
    }
    if ($('#slItemSearch').val().trim() != "0") {
        WhereClause += " AND ShiplinkItemID = '" + $('#slItemSearch').val() + "'";
    }

    return WhereClause;
}
function ShipLinkStarShineRevenueItems_EditByDblClick(pID) {
    jQuery("#ShipLinkStarShineRevenueItemsModal").modal("show");
    ShipLinkStarShineRevenueItems_FillControls(pID);
}
function ShipLinkMelkRevenueItem_ClearAllControls(callback) {
    ClearAll("#ShipLinkStarShineRevenueItemsModal");

    $("#btnSave").attr("onclick", "ShipLinkStarShineRevenueItems_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "ShipLinkStarShineRevenueItems_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
}
function ShipLinkStarShineRevenueItems_FillControls(pID) {
    debugger;
    ClearAll("#ShipLinkStarShineRevenueItemsModal", null);
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
   // $("#lblShown").html("<span> : </span><span>" + $(tr).find("td.Name").text() + "</span>");
   // $("#slShiplinkItem").val($(tr).find("td.ShiplinkItemID").text());
   
    //$("#slShiplinkItem option[revenueitemid='" + $(tr).find("td.ShiplinkItemID").text() + "']").attr("selected", "selected");
    $("#slShiplinkItem").val($(tr).find("td.ShiplinkItemID").text());

    $("#slLine").val($(tr).find("td.LineID").text());

    $("#slRevenueAccount").val($(tr).find("td.RevenueAccountID").text());
    $("#slRevenueSubAccount20").val($(tr).find("td.RevenueSubAccountID20").text());
    $("#slRevenueSubAccount40").val($(tr).find("td.RevenueSubAccountID40").text());
    $("#slCostCenter").val($(tr).find("td.CostCenterID").text());
    $("#slImportExport").val($(tr).find("td.ImportExport").text());

    var pReveueItemName = $(tr).find("td.ShiplinkItemID").text();
    //ShipLinkStarShineRevenueItems_FillRevenueItemsList("#slShiplinkItem", pReveueItemName);
    ShipLinkStarShineRevenueItems_FillslSubAccount20And40($(tr).find("td.RevenueSubAccountID20").text(), $(tr).find("td.RevenueSubAccountID40").text());

    $("#btnSave").attr("onclick", "ShipLinkStarShineRevenueItems_Update(false);");
    $("#btnSaveandNew").attr("onclick", "ShipLinkStarShineRevenueItems_Update(true);");
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $("#lblShown").reverseChildren();
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
}
function ShipLinkStarShineRevenueItems_Insert(pSaveandAddNew) {
    debugger;
    var _Suceess = true;
    if ($('#slJournalType').val() == "0") {
        swal('Excuse me', 'You must Select JournalType', 'warning');
        _Suceess = false;
    }
    if (_Suceess == true) {
        $.ajax({
            type: "GET",
            url: "/api/ShipLinkStarShineRevenueItems/CheckIfItemFound",
            data: { pShiplinkItemID: $("#slShiplinkItem").val(), pImportExport: $("#slImportExport").val(), pLineID: $("#slLine").val(), pID:-1 },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (pData) {
                if (pData == true) {
                    swal('Sorry', 'this item already exist', 'warning');
                    _Suceess = false;
                }
                else {
        InsertUpdateFunction("form", "/api/ShipLinkStarShineRevenueItems/Insert",
            {
                pShiplinkItemID : $("#slShiplinkItem").val(),
                pRevenueAccountID: $("#slRevenueAccount").val(),
                pRevenueSubAccountID20: $("#slRevenueSubAccount20").val(),
                pRevenueSubAccountID40: $("#slRevenueSubAccount40").val(),
                pCostCenterID: $("#slCostCenter").val(),
                pImportExport: $("#slImportExport").val(),
                pIsFreightItem: $("#slShiplinkItem" + " option:selected").attr("IsFreightItem"),
                pLineID: $("#slLine").val()

               
            }
            , pSaveandAddNew, "ShipLinkStarShineRevenueItemsModal", function () { ShipLinkStarShineRevenueItems_LoadingWithPaging(); ShipLinkMelkRevenueItem_ClearAllControls(); });
                }
            }
        });
    }
}
function ShipLinkStarShineRevenueItems_Update(pSaveandAddNew) {
    var _Suceess = true;
    if ($('#slJournalType').val() == "0") {
        swal('Excuse me', 'You must Select JournalType', 'warning');
        _Suceess = false;
    }
    if (_Suceess == true) {
        $.ajax({
            type: "GET",
            url: "/api/ShipLinkStarShineRevenueItems/CheckIfItemFound",
            data: { pShiplinkItemID: $("#slShiplinkItem").val(), pImportExport: $("#slImportExport").val(), pID: $("#hID").val() },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (pData) {
                if (pData == true) {
                    swal('Sorry', 'this item already exist', 'warning');
                    _Suceess = false;
                }
                else {
        InsertUpdateFunction("form", "/api/ShipLinkStarShineRevenueItems/Update", {
            pID: $("#hID").val(),
            pShiplinkItemID: $("#slShiplinkItem").val(),
            pRevenueAccountID: $("#slRevenueAccount").val(),
            pRevenueSubAccountID20: $("#slRevenueSubAccount20").val(),
            pRevenueSubAccountID40: $("#slRevenueSubAccount40").val(),
            pCostCenterID: $("#slCostCenter").val(),
            pImportExport: $("#slImportExport").val(),
            pIsFreightItem: $("#slShiplinkItem" + " option:selected").attr("IsFreightItem"),
             pLineID: $("#slLine").val()
        }, pSaveandAddNew, "ShipLinkStarShineRevenueItemsModal", function () { ShipLinkStarShineRevenueItems_LoadingWithPaging(); ShipLinkMelkRevenueItem_ClearAllControls(); });
                }
            }
        });
    }
}
function ShipLinkStarShineRevenueItems_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblShipLinkStarShineRevenueItems', 'Delete') != "")
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
            DeleteListFunction("/api/ShipLinkStarShineRevenueItems/Delete", { "pJVTypesIDs": GetAllSelectedIDsAsString('tblShipLinkStarShineRevenueItems', 'Delete') }, function () {
                ShipLinkStarShineRevenueItems_LoadingWithPaging();
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}
$('#slRevenueAccount').change(function () {
    debugger;
    
    if ($("#slRevenueAccount").val() != "0" && $("#slRevenueAccount").val() != "") {
        ShipLinkStarShineRevenueItems_FillslSubAccount20And40(0,0);
    }


});
//used to load both slSubAccount (20 & 40)
function ShipLinkStarShineRevenueItems_FillslSubAccount20And40(pSubAccountID20, pSubAccountID40) {
    debugger;
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/ChartOfLinkingAccounts/LoadSubAccountDetails"
        , {
            pLanguage: $("[id$='hf_ChangeLanguage']").val()
            , pWhereClauseSubAccountDetails: "WHERE IsMain=0 AND Account_ID=" + $("#slRevenueAccount" ).val()
            , pOrderBy: "Name"
        }
        , function (pData) {
            FillListFromObject_ERP(pSubAccountID20, 4/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slRevenueSubAccount20", pData[0]
                , function () {
                    $("#slRevenueSubAccount40").html($("#slRevenueSubAccount20").html());
                    $("#slRevenueSubAccount40").val(pSubAccountID40)
                });
            FadePageCover(false);
        }
        , null);
}

//function ShipLinkStarShineRevenueItems_FillRevenueItemsList(pSlName, pValue) {
//    debugger;

//        FadePageCover(true);
//        CallGETFunctionWithParameters("/api/ShipLinkStarShineRevenueItems/LoadRevenueItems"
//            , {
//                pLanguage: $("[id$='hf_ChangeLanguage']").val()
//                , pPageNumber: 1
//                , pPageSize: 9999
//                , pWhereClauseRevenueItems: "WHERE 1=1"
//                , pOrderBy: "Name"
//            }
//            , function (pData) {
//                FillListFromObject_ERP(null, 9/*pCodeOrName*/, null/*TranslateString("<--Select-->")*/, "slRevenueItem", pData[0]
//                    , function () {
//                        $(pSlName).html($("#slRevenueItem").html());
//                        if (pValue != 0)
//                            $(pSlName).val(pValue);
//                    });
//                FadePageCover(false);
//            }
//            , null);
    
//}