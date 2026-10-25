

function ShipLinkEISCRevenueItems_Initialize()
{
    debugger;
    $("#hl-menu-ShipLink").parent().siblings().removeClass("active");
    strBindTableRowsFunctionName = "ShipLinkEISCRevenueItems_BindTableRows";
    strLoadWithPagingFunctionName = "/api/ShipLinkEISCRevenueItems/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = " WHERE 1=1";
    var pOrderBy = "ID desc";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/ReceiptsAndPayments/ShipLinkEISC/ShipLinkEISCRevenueItems", "div-content", function () {
        $.getScript(strServerURL + '/Scripts/ReceiptsAndPayments/ShipLinkEISC/ShipLinkEISCRevenueItems.js', function () {
            LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
                , function (pData) {
                    var pAccounts = pData[2];
                    ShipLinkEISCRevenueItems_BindTableRows(JSON.parse(pData[0]));
                    $("#slCurrency").html($("#hReadySlCurrencies").html());
                    FillListFromObject_ERP(null, OptionNameCodeAccount == "true" ? 4 : 3/*pCodeOrName*/, "<--Select-->", "slAccount", pAccounts, null);
                });
            $.ajax({
                type: "GET",
                url: strServerURL + "api/ShipLinkEISCRevenueItems/IntializeData",
                data: { pDate: ConvertDateFormat(getTodaysDateInddMMyyyyFormat()), pOnlyCurrency: false },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (pData) {
                    var pAccounts = pData[2];
                    var pSubAccounts = pData[3];
                    var pCostCenters = pData[4];
                    var pRevenueItems = pData[5];
                    var pVoyageAccountID = pData[6];
                    var pLines = pData[7];
                    // FillListFromObject_ERP(pVoyageAccountID, 4/*pCodeOrName*/, TranslateString("<--Select-->"), "slRevenueAccount", pAccounts, null);
                    FillListFromObject_ERP(null, 4/*pCodeOrName*/, TranslateString("<--Select-->"), "slRevenueAccount", pAccounts, null);
                    FillListFromObject_ERP(null, 4/*pCodeOrName*/, TranslateString("<--Select-->"), "slCostCenter", pCostCenters, null);
                    FillListFromObject_ERP(null, 15/*pCodeOrName*/, TranslateString("<--Select-->"), "slShiplinkItem", pRevenueItems, null);
                    FillListFromObject_ERP(null, 15/*pCodeOrName*/, TranslateString("<--Select-->"), "slItemSearch", pRevenueItems, null);
                    FillListFromObject_ERP(null, 2/*pCodeOrName*/, TranslateString("<--Select-->"), "slLine", pLines, null);
                    
                    $("#slItemSearch").val("0");
                    $("#slShiplinkItem").val("0");



                    FillListFromObject_ERP(null, 4/*pCodeOrName*/, TranslateString("<--Select-->"), "slAccountSearch", pAccounts, null);
                    FillListFromObject_ERP(null, 4/*pCodeOrName*/, TranslateString("<--Select-->"), "slCostCenterSearch", pCostCenters, null);

                    //FillListFromObject_ERP(pVoyageAccountID, 4/*pCodeOrName*/, TranslateString("<--Select-->"), "slAccountSearch", pAccounts, null);

                    // FillListFromObject_ERP(pVoyageAccountID, 4/*pCodeOrName*/, TranslateString("<--Select-->"), "slTypeSearch", pAccounts, null);
                    // Fill_SelectInputAfterLoadData(pCostCenters, 'ID', 'Name', '<--Select-->', '#slCostCenterSearch', '');



                    //FillListFromObject_ERP(null, 4/*pCodeOrName*/, TranslateString("<--Select-->"), "slCostCenter", pCostCenters, null);
                    //FillListFromObject_ERP(null, 2/*pCodeOrName*/, TranslateString("<--Select-->"), "slRevenueItem", pRevenueItems, null);
                    if ($("#hf_CanEdit").val() == 1)
                        $("#btn-Save").removeClass("hide");
                    // ShipLinkRevenueItems_BindTableRows(JSON.parse(pData[0]));

                    if ($("#hDefaultUnEditableCompanyName").val() == "ONE") {
                        $(".classVoyageAccount").removeClass("hide");
                        $("#slVoyageAccount").attr("data-required", "true");
                        $("#thVoyageSubAccountID").removeClass("hide");
                        $("#thRevenueSubAccountID20").addClass("hide");
                        $("#thRevenueSubAccountID40").addClass("hide");
                        $("#thLine").addClass("hide");
                    }
                    else {
                        $(".classVoyageAccount").addClass("hide");
                        $("#slVoyageAccount").attr("data-required", "false");
                        $("#thVoyageSubAccountID").addClass("hide");
                        $("#thRevenueSubAccountID20").removeClass("hide");
                        $("#thRevenueSubAccountID40").removeClass("hide");
                        $("#thLine").removeClass("hide");

                    }
                    FadePageCover(false);
                },
                error: function (jqXHR, exception) {
                    debugger;
                    swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
                    FadePageCover(false);
                }
            });
        });
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    },
        function () { ShipLinkEISCRevenueItem_ClearAllControls(); },
        function () { ShipLinkEISCRevenueItems_DeleteList(); });

}

function ShipLinkEISCRevenueItems_BindTableRows(pJVTypes) {
    $("#hl-menu-ShipLink").parent().addClass("active");
    ClearAllTableRows("tblShipLinkEISCRevenueItems");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pJVTypes, function (i, item) {
        AppendRowtoTable("tblShipLinkEISCRevenueItems",
        ("<tr ID='" + item.ID + "' ondblclick='ShipLinkEISCRevenueItems_EditByDblClick(" + item.ID + ");'>"
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

                   

                    + "<td class='hide'><a href='#ShipLinkEISCRevenueItemsModal' data-toggle='modal' onclick='ShipLinkEISCRevenueItems_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblShipLinkEISCRevenueItems", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblShipLinkEISCRevenueItems>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function ShipLinkEISCRevenueItems_LoadingWithPaging() {
    debugger;
    var pWhereClause = ShipLinkEISCRevenueItems_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID desc";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { ShipLinkEISCRevenueItems_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblShipLinkEISCRevenueItems>tbody>tr", $("#txt-Search").val().trim());
}
function ShipLinkEISCRevenueItems_GetWhereClause() {
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
function ShipLinkEISCRevenueItems_EditByDblClick(pID) {
    jQuery("#ShipLinkEISCRevenueItemsModal").modal("show");
    ShipLinkEISCRevenueItems_FillControls(pID);
}
function ShipLinkEISCRevenueItem_ClearAllControls(callback) {
    ClearAll("#ShipLinkEISCRevenueItemsModal");

    $("#btnSave").attr("onclick", "ShipLinkEISCRevenueItems_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "ShipLinkEISCRevenueItems_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
}
function ShipLinkEISCRevenueItems_FillControls(pID) {
    debugger;
    ClearAll("#ShipLinkEISCRevenueItemsModal", null);
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
    //ShipLinkEISCRevenueItems_FillRevenueItemsList("#slShiplinkItem", pReveueItemName);
    ShipLinkEISCRevenueItems_FillslSubAccount20And40($(tr).find("td.RevenueSubAccountID20").text(), $(tr).find("td.RevenueSubAccountID40").text());

    $("#btnSave").attr("onclick", "ShipLinkEISCRevenueItems_Update(false);");
    $("#btnSaveandNew").attr("onclick", "ShipLinkEISCRevenueItems_Update(true);");
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $("#lblShown").reverseChildren();
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
}
function ShipLinkEISCRevenueItems_Insert(pSaveandAddNew) {
    debugger;
    var _Suceess = true;
    if ($('#slJournalType').val() == "0") {
        swal('Excuse me', 'You must Select JournalType', 'warning');
        _Suceess = false;
    }
    if (_Suceess == true) {
        $.ajax({
            type: "GET",
            url: "/api/ShipLinkEISCRevenueItems/CheckIfItemFound",
            data: { pShiplinkItemID: $("#slShiplinkItem").val(), pImportExport: $("#slImportExport").val(), pLineID: $("#slLine").val(), pID: -1 },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (pData) {
                if (pData == true) {
                    swal('Sorry', 'this item already exist', 'warning');
                    _Suceess = false;
                }
                else {
        InsertUpdateFunction("form", "/api/ShipLinkEISCRevenueItems/Insert",
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
            , pSaveandAddNew, "ShipLinkEISCRevenueItemsModal", function () { ShipLinkEISCRevenueItems_LoadingWithPaging(); ShipLinkEISCRevenueItem_ClearAllControls(); });
                }
            }
        });
    }
}
function ShipLinkEISCRevenueItems_Update(pSaveandAddNew) {
    var _Suceess = true;
    if ($('#slJournalType').val() == "0") {
        swal('Excuse me', 'You must Select JournalType', 'warning');
        _Suceess = false;
    }
    if (_Suceess == true) {
        $.ajax({
            type: "GET",
            url: "/api/ShipLinkEISCRevenueItems/CheckIfItemFound",
            data: { pShiplinkItemID: $("#slShiplinkItem").val(), pImportExport: $("#slImportExport").val(), pLineID: $("#slLine").val(), pID: $("#hID").val() },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (pData) {
                if (pData == true) {
                    swal('Sorry', 'this item already exist', 'warning');
                    _Suceess = false;
                }
                else {
        InsertUpdateFunction("form", "/api/ShipLinkEISCRevenueItems/Update", {
            pID: $("#hID").val(),
            pShiplinkItemID: $("#slShiplinkItem").val(),
            pRevenueAccountID: $("#slRevenueAccount").val(),
            pRevenueSubAccountID20: $("#slRevenueSubAccount20").val(),
            pRevenueSubAccountID40: $("#slRevenueSubAccount40").val(),
            pCostCenterID: $("#slCostCenter").val(),
            pImportExport: $("#slImportExport").val(),
            pIsFreightItem: $("#slShiplinkItem" + " option:selected").attr("IsFreightItem"),
            pLineID : $("#slLine").val()
        }, pSaveandAddNew, "ShipLinkEISCRevenueItemsModal", function () { ShipLinkEISCRevenueItems_LoadingWithPaging(); ShipLinkEISCRevenueItem_ClearAllControls(); });
                }
            }
        });
    }
}
function ShipLinkEISCRevenueItems_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblShipLinkEISCRevenueItems', 'Delete') != "")
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
            DeleteListFunction("/api/ShipLinkEISCRevenueItems/Delete", { "pJVTypesIDs": GetAllSelectedIDsAsString('tblShipLinkEISCRevenueItems', 'Delete') }, function () {
                ShipLinkEISCRevenueItems_LoadingWithPaging();
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}
$('#slRevenueAccount').change(function () {
    debugger;
    
    if ($("#slRevenueAccount").val() != "0" && $("#slRevenueAccount").val() != "") {
        ShipLinkEISCRevenueItems_FillslSubAccount20And40(0,0);
    }


});
//used to load both slSubAccount (20 & 40)
function ShipLinkEISCRevenueItems_FillslSubAccount20And40(pSubAccountID20, pSubAccountID40) {
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

//function ShipLinkEISCRevenueItems_FillRevenueItemsList(pSlName, pValue) {
//    debugger;

//        FadePageCover(true);
//        CallGETFunctionWithParameters("/api/ShipLinkEISCRevenueItems/LoadRevenueItems"
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