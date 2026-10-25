function ChartOfLinkingAccounts_AppendToTree(pParentName, pNodes) {
    debugger;
    $("#hl-menu-Accounting").parent().addClass("active");
    var pHTML = "";
    pHTML += "<ol id=ol" + pParentName + " class='dd-list'>";
    pHTML += ChartOfLinkingAccounts_AppendNodes(pNodes);
    pHTML += '</ol>';
    $("#" + pParentName).append(pHTML);

    ApplyPermissions();
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function ChartOfLinkingAccounts_AppendNodes(pNodes) {
    debugger;
    var pHTML = "";
    $.each(pNodes, function (i, item) {
        debugger;
        if (1==1) { //(item.IsMain) {
            pHTML += "<li class='dd-item' id=" + item.ID + ">";
            //pHTML += "      <button data-action='collapse' type='button' style='display: none;'>Collapse</button>";
            pHTML += "      <button id=btnMark" + item.ID + " onclick='ChartOfLinkingAccounts_ExpandCollapse(" + item.ID + "," + item.SubAccLevel + ',"' + "expand" + '"' + ");' data-action='expand' type='button' style='display: block;'>Expand</button>";
            pHTML += "      <div id=div" + item.ID + " class='dd-handle input-sm text-left divclass' ondblclick='ChartOfLinkingAccounts_ExpandCollapse(" + item.ID + "," + item.SubAccLevel + ',"' + "expand" + '"' + ");'>";
        }
        else {
            pHTML += "<li class='dd-item' id=" + item.ID + ">";
            pHTML += "      <div id=div" + item.ID + " class='dd-handle input-sm text-left divclass'>";
        }
        pHTML += "              <span id='span" + item.ID + "'>" + item.SubAccount_Number + ' - ' + item.SubAccount_Name + "</span>";
        pHTML += "              " + (($("#hf_CanDelete").val() == 1 /*&& !item.IsMain && item.SubAccLevel != 1*/) ? ("<a href='#' " + (item.RealSubAccountCode == "1" || item.RealSubAccountCode == "2" || item.RealSubAccountCode == "3" || item.RealSubAccountCode == "4" ? " disabled='disabled' " : "") + " title='Delete' onclick='ChartOfLinkingAccounts_Delete(" + item.ID + "," + item.Parent_ID + "," + item.SubAccLevel + ");' class=' btn btn-xs btn-rounded btn-danger float-right m-t-n-xxs'><i class='fa fa-trash' style='padding-left: 0px;'></i> <span style='padding-right: 0px;'></span></a>") : "");
        pHTML += "              " + ($("#hf_CanEdit").val() == 1 ? ("<a href='#' title='Edit' onclick='ChartOfLinkingAccounts_FillModal(2," + item.ID + ");' class=' btn btn-xs btn-rounded btn-info float-right m-t-n-xxs'><i class='fa fa-pencil' style='padding-left: 0px;'></i> <span style='padding-right: 0px;'></span></a>") : "");
        pHTML += "              " + (($("#hf_CanAdd").val() == 1 && item.SubAccLevel < constMaxSubAccountsLevels && item.IsMain) ? ("<a href='#' title='Add' onclick='ChartOfLinkingAccounts_FillModal(1," + item.ID + ");' class=' btn btn-xs btn-rounded btn-lightblue float-right m-t-n-xxs'><i class='fa fa-plus' style='padding-left: 0px;'></i> <span style='padding-right: 0px;'></span></a>") : "");
        pHTML += "      </div>";
        pHTML += "</li>";
    });
    return pHTML;
}
function ChartOfLinkingAccounts_ExpandCollapse(pID, pSubAccLevel) {
    debugger;
    var pFunctionName = "/api/ChartOfLinkingAccounts/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";
    if ($("#btnMark" + pID).attr("data-action") == "collapse") { //Collapse children
        $("#btnMark" + pID).attr("data-action", "expand");
        //Remove Children
        $("#" + pID).addClass("dd-collapsed");
        $("#" + pID).children().each(function (i, item) {
            debugger;
            if (item.tagName != "DIV" && item.tagName != "BUTTON")
                item.remove();
        });
    }
    else { //Expand children
        FadePageCover(true);
        $("#btnMark" + pID).attr("data-action", "collapse");
        var pParametersWithValues = {
            pIsLoadArrayOfObjects: false
            , pLanguage: $("[id$='hf_ChangeLanguage']").val()
            , pPageNumber: 1
            , pPageSize: 9999
            , pWhereClause: " WHERE SubAccLevel=" + (pSubAccLevel + 1) + (pSubAccLevel == 0 ? "" : " AND Parent_ID=" + pID)
            , pOrderBy: "SubAccount_Number"
        };
        //Get Children
        CallGETFunctionWithParameters(pFunctionName
            , pParametersWithValues
            , function (pData) {
                //Append Children to tree
                ChartOfLinkingAccounts_AppendToTree(pID, JSON.parse(pData[0]));
                $("#" + pID).removeClass("dd-collapsed");
                FadePageCover(false);
            }
            , null);
    }
}
function ChartOfLinkingAccounts_FillModal(pActionType, pID) { //pActionType: 1-Insert 2-Update
    debugger;
    ClearAll("#ChartOfLinkingAccountsModal");
    FadePageCover(true);
    var pParametersWithValues = { pID: pID };
    CallGETFunctionWithParameters("/api/ChartOfLinkingAccounts/GetModalData", pParametersWithValues
        , function (pData) {
            var pSubAccountFields = JSON.parse(pData[0]); // if pSubAccounts fields is null this means insert
            var pNewCode = pData[1];
            var pA_SubAccounts_Details = pData[2];
            $("#hActionType").val(pActionType);
            if (pActionType == 1) { //Insert
                debugger;
                $("#txtName").removeAttr("disabled");
                $("#hID").val(0);
                $("#hParentID").val(pID);
                $("#hLevel").val(pSubAccountFields == null ? 1 : (pSubAccountFields.SubAccLevel + 1));
                $("#txtCode").val(((pSubAccountFields == null ? "" : pSubAccountFields.RealSubAccountCode.toString()) + pNewCode.toString()).padEnd(21, "0"));
                $("#hRealCode").val((pSubAccountFields == null ? "" : pSubAccountFields.RealSubAccountCode.toString()) + pNewCode.toString());
                $("#cbShowSelectedItemsOnly").prop("checked", false);
                ChartOfLinkingAccounts_cbShowSelectedItemsOnlyChanged();
                ChartOfLinkingAccounts_EnableDisableSubAccountDetails();
                $("#btnSave").attr("onclick", "ChartOfLinkingAccounts_Save(false);");
                $("#btnSaveandNew").attr("onclick", "ChartOfLinkingAccounts_Save(true);");
                jQuery("#ChartOfLinkingAccountsModal").modal("show");
            }
            else if (pActionType == 2) { //Update
                debugger;
                if (pSubAccountFields.RealSubAccountCode == "1" || pSubAccountFields.RealSubAccountCode == "2"
                || pSubAccountFields.RealSubAccountCode == "3" || pSubAccountFields.RealSubAccountCode == "4")
                    $("#txtName").attr("disabled", "disabled");
                else
                    $("#txtName").removeAttr("disabled");
                $("#hID").val(pID);
                $("#hParentID").val(pSubAccountFields.Parent_ID);
                $("#lblShown").html("<span> : </span><span>" + pSubAccountFields.SubAccount_Name + "</span>");
                $("#hLevel").val(pSubAccountFields.SubAccLevel);
                $("#hRealCode").val(pSubAccountFields.RealSubAccountCode);
                $("#txtCode").val(pSubAccountFields.SubAccount_Number);
                $("#txtName").val(pSubAccountFields.SubAccount_Name);
                $("#cbShowSelectedItemsOnly").prop("checked", true);
                ChartOfLinkingAccounts_CheckIncludedItemsInDivFromArray("divCbAccounts", "classCbAllAccounts", JSON.parse(pA_SubAccounts_Details)
                    , function () { ChartOfLinkingAccounts_cbShowSelectedItemsOnlyChanged(); ChartOfLinkingAccounts_EnableDisableSubAccountDetails(); });
                $("#btnSave").attr("onclick", "ChartOfLinkingAccounts_Save(false);");
                $("#btnSaveandNew").attr("onclick", "ChartOfLinkingAccounts_Save(true);");
                if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
                    $("#lblShown").reverseChildren();
                    $(".swapChildrenClass:not(.reversed)").reverseChildren();
                }
                jQuery("#ChartOfLinkingAccountsModal").modal("show");
            }
            FadePageCover(false);
        }
        , null);
}
function ChartOfLinkingAccounts_Save(pSaveAndNew) {
    debugger;
    var pSelectedSubAccountDetailsIDs = GetAllSelectedIDsAsStringWithNameAttr("classCbAllAccounts");
    if (ValidateForm("form", "ChartOfLinkingAccountsModal")) {
        FadePageCover(true);
        var pParametersWithValues = {
            pID: $("#hID").val()
            , pSubAccount_Number: $("#txtCode").val().trim() == "" ? "0" : $("#txtCode").val().trim().toUpperCase()
            , pSubAccount_Name: $("#txtName").val().trim() == "" ? "0" : $("#txtName").val().trim().toUpperCase()
            , pSubAccount_EnName: $("#txtName").val().trim() == "" ? "0" : $("#txtName").val().trim().toUpperCase()
            , pParent_ID: $("#hParentID").val()
            , pSubAccLevel: $("#hLevel").val()
            , pRealSubAccountCode: $("#hRealCode").val()
            , pSelectedSubAccountDetailsIDs: (pSelectedSubAccountDetailsIDs == "" ? "0" : pSelectedSubAccountDetailsIDs)
        };
        CallGETFunctionWithParameters("/api/ChartOfLinkingAccounts/Save", pParametersWithValues
            , function (pData) {
                debugger;
                if (pData[0]) {
                    var pID = pData[1];
                    var pNodes = JSON.parse(pData[2]);

                    if ($("#hActionType").val() == 1) { //Insert
                        if ($("#hParentID").val() == 0) { //Insert to Root Node (i.e. Level 1)
                            $("#ol" + $("#hParentID").val()).html(ChartOfLinkingAccounts_AppendNodes(pNodes));
                        }
                        else { // not root(i.e not level 1)
                            $("#" + $("#hParentID").val()).children().each(function (i, item) {
                                if (item.tagName == "LI" || item.tagName == "OL")
                                    item.remove();
                            });
                            $("#div" + $("#hParentID").val()).attr("ondblclick", ("ChartOfLinkingAccounts_ExpandCollapse(" + $("#hParentID").val() + "," + ($("#hLevel").val() - 1) + ',"' + "collapse" + '"' + ");"))
                            if ($("#btnMark" + $("#hParentID").val()).attr("data-action") == undefined) //first child so add sign
                                $("#" + $("#hParentID").val()).prepend("<button id=btnMark" + $("#hParentID").val() + " onclick='ChartOfLinkingAccounts_ExpandCollapse(" + $("#hParentID").val() + "," + ($("#hLevel").val() - 1) + ',"' + "collapse" + '"' + ");' data-action='collapse' type='button' style='display: block;'>Collapse</button>");
                            else
                                $("#btnMark" + $("#hParentID").val()).attr("data-action", "collapse");
                            ChartOfLinkingAccounts_AppendToTree($("#hParentID").val(), pNodes);
                            $("#" + $("#hParentID").val()).removeClass("dd-collapsed");
                        }
                    }
                    else if ($("#hActionType").val() == 2) { //Update
                        $("#span" + $("#hID").val()).html($("#txtCode").val().trim().toUpperCase() + ' - ' + $("#txtName").val().trim().toUpperCase());
                    }
                    jQuery("#ChartOfLinkingAccountsModal").modal("hide");
                    swal("Success", "Saved successfully.");
                }
                else //pData[0] is false
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
            , null);
    }
}
function ChartOfLinkingAccounts_Delete(pID, pParentID, pLevel) {
    swal({
        title: "Are you sure?",
        text: "The selected records will be deleted permanently!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete!",
        closeOnConfirm: true
    },
    function () {
        debugger;
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/ChartOfLinkingAccounts/Delete"
            , { pIDToDelete: pID, pParentID: pParentID, pLevel: pLevel }
            , function (pData) {
                if (pData[0]) {
                    debugger;
                    var pNodes = JSON.parse(pData[1]);
                    if (pNodes.length == 0 && pParentID != 0)
                        $("#btnMark" + pParentID).remove();
                    $("#" + pID).remove();
                }
                else {
                    swal("Sorry", "Dependencies exist.");
                }
                FadePageCover(false);
            }
            , null);
    });
}
/*****************************************************************************/
function ChartOfLinkingAccounts_Search() {
    debugger;
    HighlightText("#0", $("#txt-Search").val().trim());
}
function ChartOfLinkingAccounts_cbShowSelectedItemsOnlyChanged() {
    debugger;
    if ($("#cbShowSelectedItemsOnly").prop("checked")) 
        $("#divCbAccounts input[name=classCbAllAccounts]:not(:checked)").parent().addClass("hide");
    else
        $("#divCbAccounts input[name=classCbAllAccounts]:not(:checked)").parent().removeClass("hide");
}
function ChartOfLinkingAccounts_EnableDisableSubAccountDetails() {
    debugger;
    $("#divCbAccounts input[name=classCbAllAccounts]:checked").attr("disabled", "disabled");
    $("#divCbAccounts input[name=classCbAllAccounts]:not(:checked)").removeAttr("disabled");
}
function ChartOfLinkingAccounts_CheckIncludedItemsInDivFromArray(pMainDivName, pCheckboxNameAttr, pSelectedCbList, pCallback) {
    debugger;
    $("#" + pMainDivName).find('input[name="' + pCheckboxNameAttr + '"]').each(function () {
        //$(this).attr('value')
        for (var i = 0; i < pSelectedCbList.length; i++) {
            if ($(this).attr('value') == pSelectedCbList[i].Account_ID) {
                $(this).prop('checked', true);
                if (pCallback.toString().split('_')[0].split(' { ')[1] == "ChartOfLinkingAccounts")
                    $(this).attr("disabled", "disabled");
                $(this).parent().removeClass("hide"); //to handle the case that parent was hidden from a previous action
            }
        }
    });
    if (pCallback != null && pCallback != undefined)
        pCallback();
}