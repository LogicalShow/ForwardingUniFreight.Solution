
function ChartOfAccounts_AppendToTree(pParentName, pNodes) {
    debugger;
    $("#hl-menu-Accounting").parent().addClass("active");
    var pHTML = "";
    pHTML += "<ol id=ol" + pParentName + " class='dd-list'>";
    pHTML += ChartOfAccounts_AppendNodes(pNodes);
    pHTML += '</ol>';
    $("#" + pParentName).append(pHTML);

    ApplyPermissions();
    $("#hl-homepage").on("click", function () {
        LoadViews("hl-homepage");
        //if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    });
}
function ChartOfAccounts_AppendNodes(pNodes) {
    debugger;
    var pHTML = "";
    $.each(pNodes, function (i, item) {
        debugger;
        if (item.IsMain) {
            pHTML += "<li class='dd-item' id=" + item.ID + ">";
            //pHTML += "      <button data-action='collapse' type='button' style='display: none;'>Collapse</button>";
            pHTML += "      <button id=btnMark" + item.ID + " onclick='ChartOfAccounts_ExpandCollapse(" + item.ID + "," + item.AccLevel + ',"' + "expand" + '"' + ");' data-action='expand' type='button' style='display: block;'>Expand</button>";
            pHTML += "      <div id=div" + item.ID + " class='dd-handle input-sm text-left divclass' ondblclick='ChartOfAccounts_ExpandCollapse(" + item.ID + "," + item.AccLevel + ',"' + "expand" + '"' + ");'>";
        }
        else {
            pHTML += "<li class='dd-item' id=" + item.ID + ">";
            pHTML += "      <div id=div" + item.ID + " class='dd-handle input-sm text-left divclass'>";
        }
        pHTML += "              <span id='span" + item.ID + "'>" + item.Account_Number + ' - ' + item.Account_Name + "</span>";
        pHTML += "              " + (($("#hf_CanDelete").val() == 1 /*&& !item.IsMain*/ && item.AccLevel != 1) ? ("<a href='#' title='Delete' onclick='ChartOfAccounts_Delete(" + item.ID + "," + item.Parent_ID + "," + item.AccLevel + ");' class=' btn btn-xs btn-rounded btn-danger float-right m-t-n-xxs'><i class='fa fa-trash' style='padding-left: 0px;'></i> <span style='padding-right: 0px;'></span></a>") : "");
        pHTML += "              " + ($("#hf_CanEdit").val() == 1 ? ("<a href='#' title='Edit' onclick='ChartOfAccounts_FillModal(2," + item.ID + ");' class=' btn btn-xs btn-rounded btn-info float-right m-t-n-xxs'><i class='fa fa-pencil' style='padding-left: 0px;'></i> <span style='padding-right: 0px;'></span></a>") : "");
        pHTML += "              " + (($("#hf_CanAdd").val() == 1 && item.AccLevel < constMaxAccountsLevels) ? ("<a href='#' title='Add' onclick='ChartOfAccounts_FillModal(1," + item.ID + ");' class=' btn btn-xs btn-rounded btn-lightblue float-right m-t-n-xxs'><i class='fa fa-plus' style='padding-left: 0px;'></i> <span style='padding-right: 0px;'></span></a>") : "");
        pHTML += "      </div>";
        pHTML += "</li>";
    });
    return pHTML;
}
function ChartOfAccounts_ExpandCollapse(pID, pAccLevel) {
    debugger;
    var pFunctionName = "/api/ChartOfAccounts/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";
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
            , pWhereClause: " WHERE AccLevel=" + (pAccLevel + 1) + (pAccLevel == 0 ? "" : " AND Parent_ID=" + pID)
            , pOrderBy: "Account_Number"
        };
        //Get Children
        CallGETFunctionWithParameters(pFunctionName
            , pParametersWithValues
            , function (pData) {
                //Append Children to tree
                ChartOfAccounts_AppendToTree(pID, JSON.parse(pData[0]));
                $("#" + pID).removeClass("dd-collapsed");
                FadePageCover(false);
            }
            , null);
    }
}
function ChartOfAccounts_FillModal(pActionType, pID) { //pActionType: 1-Insert 2-Update
    debugger;


    var pParametersWithValues1 = {
     pIsLoadArrayOfObjects : false,
    pLanguage: 'en',
    pPageNumber: 1,
    pPageSize: 999,
    pWhereClause: " Where IsActivity=1",
    pOrderBy: "CostCenterNumber"
    
};
    CallGETFunctionWithParameters("/api/CostCenters/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned", pParametersWithValues1
    , function (pData) {
        FillDivWithCheckboxes("divCbActivities", pData[0], "classCbAllActivities",6, null);
    }
    , null);

    ClearAll("#ChartOfAccountsModal");
    FadePageCover(true);
    var pParametersWithValues = { pID: pID };
    CallGETFunctionWithParameters("/api/ChartOfAccounts/GetModalData", pParametersWithValues
        , function (pData) {
            var pAccountFields = JSON.parse(pData[0]); // if pAccounts fields is null this means insert
            var pNewCode = pData[1];
            var pJVDetailsCount = pData[2];
            var pA_Accounts_Activities = pData[3];

            $("#hActionType").val(pActionType);
            if (pActionType == 1) { //Insert
                $("#txtName").removeAttr("disabled");
                if (pJVDetailsCount == 0) {
                    debugger;
                    $("#hID").val(0);
                    $("#hParentID").val(pID);
                    $("#hLevel").val(pAccountFields == null ? 1 : (pAccountFields.AccLevel + 1));
                    $("#txtCode").val(((pAccountFields == null ? "" : pAccountFields.RealAccountCode.toString()) + pNewCode.toString()).padEnd(13, "0"));
                    $("#hRealCode").val((pAccountFields == null ? "" : pAccountFields.RealAccountCode.toString()) + pNewCode.toString());
                    //$("#txtCodeM").val(pAccountFields == null ? "0" : (pAccountFields.Code));
                    $("#txtCodeM").val(0);
                    $("#slCostCenter").val(0);
                    $("#cbIsVisible").prop("checked", true);
                    $("#btnSave").attr("onclick", "ChartOfAccounts_Save(false);");
                    $("#btnSaveandNew").attr("onclick", "ChartOfAccounts_Save(true);");
                    jQuery("#ChartOfAccountsModal").modal("show");
                }
                else
                    swal("Sorry", "Can not a add child beacause this account is used in other transactions.");
            }
            else if (pActionType == 2) { //Update
                debugger;
                if (pID == 1 || pID == 2 || pID == 3 || pID == 4)
                    $("#txtName").attr("disabled", "disabled");
                else
                    $("#txtName").removeAttr("disabled");
                $("#hID").val(pID);
                $("#hParentID").val(pAccountFields.Parent_ID);
                $("#lblShown").html("<span> : </span><span>" + pAccountFields.Account_Name + "</span>");
                $("#hLevel").val(pAccountFields.AccLevel);
                $("#hRealCode").val(pAccountFields.RealAccountCode);
                $("#txtCode").val(pAccountFields.Account_Number);
                $("#txtCodeM").val(pAccountFields.Code);
                $("#txtName").val(pAccountFields.Account_Name);
                $("#slCostCenter").val(pAccountFields.CostCenter_ID);
                $("#cbIsVisible").prop("checked", pAccountFields.IsVisible);

                ChartOfAccounts_CheckIncludedItemsInDivFromArray("divCbActivities", "classCbAllActivities", JSON.parse(pA_Accounts_Activities)
                    , function () {
                       // ChartOfLinkingAccounts_cbShowSelectedItemsOnlyChanged(); ChartOfLinkingAccounts_EnableDisableSubAccountDetails();
                    });

                $("#btnSave").attr("onclick", "ChartOfAccounts_Save(false);");
                $("#btnSaveandNew").attr("onclick", "ChartOfAccounts_Save(true);");
                if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
                    $("#lblShown").reverseChildren();
                    $(".swapChildrenClass:not(.reversed)").reverseChildren();
                }
                jQuery("#ChartOfAccountsModal").modal("show");
            }
            FadePageCover(false);
        }
        , null);
}
function ChartOfAccounts_Save(pSaveAndNew) {
    debugger;
    if (ValidateForm("form", "ChartOfAccountsModal")) {
        FadePageCover(true);

        var pSelectedActivityIDs = GetAllSelectedIDsAsStringWithNameAttr("classCbAllActivities");
        var pParametersWithValues = {
            pID: $("#hID").val()
            , pAccount_Number: $("#txtCode").val().trim() == "" ? "0" : $("#txtCode").val().trim().toUpperCase()
            , pAccount_Name: $("#txtName").val().trim() == "" ? "0" : $("#txtName").val().trim().toUpperCase()
            , pAccount_EnName: $("#txtName").val().trim() == "" ? "0" : $("#txtName").val().trim().toUpperCase()
            , pParent_ID: $("#hParentID").val()
            , pAccLevel: $("#hLevel").val()
            , pRealAccountCode: $("#hRealCode").val()
            , pIsVisible: $("#cbIsVisible").prop("checked")
            , pCostCenter_ID: $("#slCostCenter").val()
            , pCodeM: $("#txtCodeM").val().trim() == "" ? "" : $("#txtCodeM").val().trim().toUpperCase()
            , pSelectedActivityIDs: (pSelectedActivityIDs == "" ? "0" : pSelectedActivityIDs)
        };
        CallGETFunctionWithParameters("/api/ChartOfAccounts/Save", pParametersWithValues
            , function (pData) {
                debugger;
                if (pData[0]) {
                    var pID = pData[1];
                    var pNodes = JSON.parse(pData[2]);

                    if ($("#hActionType").val() == 1) { //Insert
                        if ($("#hParentID").val() == 0) { //Insert to Root Node (i.e. Level 1)
                            $("#ol" + $("#hParentID").val()).html(ChartOfAccounts_AppendNodes(pNodes));
                        }
                        else { // not root(i.e not level 1)
                            $("#" + $("#hParentID").val()).children().each(function (i, item) {
                                if (item.tagName == "LI" || item.tagName == "OL")
                                    item.remove();
                            });
                            $("#div" + $("#hParentID").val()).attr("ondblclick", ("ChartOfAccounts_ExpandCollapse(" + $("#hParentID").val() + "," + ($("#hLevel").val() - 1) + ',"' + "collapse" + '"' + ");"))
                            if ($("#btnMark" + $("#hParentID").val()).attr("data-action") == undefined) //first child so add sign
                                $("#" + $("#hParentID").val()).prepend("<button id=btnMark" + $("#hParentID").val() + " onclick='ChartOfAccounts_ExpandCollapse(" + $("#hParentID").val() + "," + ($("#hLevel").val() - 1) + ',"' + "collapse" + '"' + ");' data-action='collapse' type='button' style='display: block;'>Collapse</button>");
                            else
                                $("#btnMark" + $("#hParentID").val()).attr("data-action", "collapse");
                            ChartOfAccounts_AppendToTree($("#hParentID").val(), pNodes);
                            $("#" + $("#hParentID").val()).removeClass("dd-collapsed");
                        }
                    }
                    else if ($("#hActionType").val() == 2) { //Update
                        $("#span" + $("#hID").val()).html($("#txtCode").val().trim().toUpperCase() + ' - ' + $("#txtName").val().trim().toUpperCase());
                    }
                    jQuery("#ChartOfAccountsModal").modal("hide");
                    swal("Success", "Saved successfully.");
                }
                else //pData[0] is false
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
            , null);
    }
}
function ChartOfAccounts_Delete(pID, pParentID, pLevel) {
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
        CallGETFunctionWithParameters("/api/ChartOfAccounts/Delete"
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
function ChartOfAccounts_Search() {
    debugger;
    HighlightText("#0", $("#txt-Search").val().trim());
}

function ChartOfAccounts_CheckIncludedItemsInDivFromArray(pMainDivName, pCheckboxNameAttr, pSelectedCbList, pCallback) {
    debugger;
    $("#" + pMainDivName).find('input[name="' + pCheckboxNameAttr + '"]').each(function () {
        //$(this).attr('value')
        for (var i = 0; i < pSelectedCbList.length; i++) {
            if ($(this).attr('value') == pSelectedCbList[i].ActivityCostCenterID) {
                $(this).prop('checked', true);

                $(this).parent().removeClass("hide"); //to handle the case that parent was hidden from a previous action
            }
        }
    });
    if (pCallback != null && pCallback != undefined)
        pCallback();
}

function ChartOfAccounts_Print(pOutput)
    {

            var arr_Keys = new Array();
            var arr_Values = new Array();

            var ReportName = pOutput == "Print" ? "Rep_ChartOfAccounts" : "Rep_ChartOfAccountsExcel";


            let pWhereClause = "WHERE 1=1 " + " \n";
            
            arr_Keys.push("pWhereClause");
            arr_Values.push(pWhereClause);


            debugger;
            var pParametersWithValues =
            {

                arr_Keys: arr_Keys
                , arr_Values: arr_Values
                , pTitle: "log"
                , pReportName: ReportName
                , pReportType: pOutput
            };
            debugger

            var win = window.open("", "_blank");

            url = '/ReportMainClass/PrintReportQueryAndParams?pTitle="' + pParametersWithValues.pTitle + '"'
                + '&query=' + pParametersWithValues.query + ''
                + '&arr_Keys=' + pParametersWithValues.arr_Keys + ''
                + '&arr_Values=' + pParametersWithValues.arr_Values + ''
                + '&pReportName=' + pParametersWithValues.pReportName + ''
                + '&pReportType=' + pParametersWithValues.pReportType + ''
                ;

            win.location = url;

    }