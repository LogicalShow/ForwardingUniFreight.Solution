function CostCenters_AppendToTree(pParentName, pNodes) {
    debugger;
    $("#hl-menu-Accounting").parent().addClass("active");
    var pHTML = "";
    pHTML += "<ol id=ol" + pParentName + " class='dd-list'>";
    pHTML += CostCenters_AppendNodes(pNodes);
    pHTML += '</ol>';
    $("#" + pParentName).append(pHTML);

    ApplyPermissions();
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function CostCenters_AppendNodes(pNodes) {
    debugger;
    var pHTML = "";
    $.each(pNodes, function (i, item) {
        debugger;
        if (item.IsMain) {
            pHTML += "<li class='dd-item' id=" + item.ID + ">";
            //pHTML += "      <button data-action='collapse' type='button' style='display: none;'>Collapse</button>";
            pHTML += "      <button id=btnMark" + item.ID + " onclick='CostCenters_ExpandCollapse(" + item.ID + "," + item.CCLevel + ',"' + "expand" + '"' + ");' data-action='expand' type='button' style='display: block;'>Expand</button>";
            pHTML += "      <div id=div" + item.ID + " class='dd-handle input-sm text-left divclass' ondblclick='CostCenters_ExpandCollapse(" + item.ID + "," + item.CCLevel + ',"' + "expand" + '"' + ");'>";
        }
        else {
            pHTML += "<li class='dd-item' id=" + item.ID + ">";
            pHTML += "      <div id=div" + item.ID + " class='dd-handle input-sm text-left divclass'>";
        }
        pHTML += "              <span id='span" + item.ID + "'>" + item.CostCenterNumber + ' - ' + item.CostCenterName + "</span>";
        pHTML += "              " + (($("#hf_CanDelete").val() == 1 /*&& !item.IsMain && item.CCLevel != 1*/) ? ("<a href='#' title='Delete' onclick='CostCenters_Delete(" + item.ID + "," + item.Parent_ID + "," + item.CCLevel + ");' class=' btn btn-xs btn-rounded btn-danger float-right m-t-n-xxs'><i class='fa fa-trash' style='padding-left: 0px;'></i> <span style='padding-right: 0px;'></span></a>") : "");
        pHTML += "              " + ($("#hf_CanEdit").val() == 1 ? ("<a href='#' title='Edit' onclick='CostCenters_FillModal(2," + item.ID + ");' class=' btn btn-xs btn-rounded btn-info float-right m-t-n-xxs'><i class='fa fa-pencil' style='padding-left: 0px;'></i> <span style='padding-right: 0px;'></span></a>") : "");
        pHTML += "              " + (($("#hf_CanAdd").val() == 1 && item.CCLevel < constMaxCostCentersLevels) ? ("<a href='#' title='Add' onclick='CostCenters_FillModal(1," + item.ID + ");' class=' btn btn-xs btn-rounded btn-lightblue float-right m-t-n-xxs'><i class='fa fa-plus' style='padding-left: 0px;'></i> <span style='padding-right: 0px;'></span></a>") : "");
        pHTML += "      </div>";
        pHTML += "</li>";
    });
    return pHTML;
}
function CostCenters_ExpandCollapse(pID, pCCLevel) {
    debugger;
    var pFunctionName = "/api/CostCenters/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";
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
            , pPageSize: 99999
            , pWhereClause: " WHERE CCLevel=" + (pCCLevel + 1) + (pCCLevel == 0 ? "" : " AND Parent_ID=" + pID)
            , pOrderBy: "CostCenterNumber"
        };
        //Get Children
        CallGETFunctionWithParameters(pFunctionName
            , pParametersWithValues
            , function (pData) {
                //Append Children to tree
                CostCenters_AppendToTree(pID, JSON.parse(pData[0]));
                $("#" + pID).removeClass("dd-collapsed");
                FadePageCover(false);
            }
            , null);
    }
}
function CostCenters_FillModal(pActionType, pID) { //pActionType: 1-Insert 2-Update
    debugger;
    ClearAll("#CostCentersModal");
    FadePageCover(true);
    var pParametersWithValues = { pID: pID };
    CallGETFunctionWithParameters("/api/CostCenters/GetModalData", pParametersWithValues
        , function (pData) {
            var pCostCenterFields = JSON.parse(pData[0]); // if pAccounts fields is null this means insert
            var pNewCode = pData[1];
            $("#hActionType").val(pActionType);
            if (pActionType == 1) { //Insert
                $("#hID").val(0);
                $("#hParentID").val(pID);
                $("#hLevel").val(pCostCenterFields == null ? 1 : (pCostCenterFields.CCLevel + 1));
                $("#txtCode").val(((pCostCenterFields == null ? "" : pCostCenterFields.RealCostCenterCode.toString()) + pNewCode.toString()).padEnd(12, "0"));
                $("#hRealCode").val((pCostCenterFields == null ? "" : pCostCenterFields.RealCostCenterCode.toString()) + pNewCode.toString());
                $("#slCostCenterType").val(0);
                $("#slActivity").val(0);
                $("#slBusinessUnit").val(0);
                $("#cbIsClosed").prop("checked", false);
                $("#cbIsActivity").prop("checked", false);
                
                $("#btnSave").attr("onclick", "CostCenters_Save(false);");
                $("#btnSaveandNew").attr("onclick", "CostCenters_Save(true);");
                jQuery("#CostCentersModal").modal("show");
            }
            else if (pActionType == 2) { //Update
                debugger;
                $("#hID").val(pID);
                $("#hParentID").val(pCostCenterFields.Parent_ID);
                $("#lblShown").html("<span> : </span><span>" + pCostCenterFields.CostCenterName + "</span>");
                $("#hLevel").val(pCostCenterFields.CCLevel);
                $("#hRealCode").val(pCostCenterFields.RealCostCenterCode);
                $("#txtCode").val(pCostCenterFields.CostCenterNumber);
                $("#txtName").val(pCostCenterFields.CostCenterName);
                $("#txtCodeM").val(pCostCenterFields.Code);

                $("#slCostCenterType").val(pCostCenterFields.Type_ID);

                $("#slActivity").val(pCostCenterFields.ActivityID);
                $("#slBusinessUnit").val(pCostCenterFields.BusinessUnitID);

                $("#cbIsClosed").prop("checked", pCostCenterFields.IsClosed);
                $("#cbIsActivity").prop("checked", pCostCenterFields.IsActivity);
                
                $("#btnSave").attr("onclick", "CostCenters_Save(false);");
                $("#btnSaveandNew").attr("onclick", "CostCenters_Save(true);");
                if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
                    $("#lblShown").reverseChildren();
                    $(".swapChildrenClass:not(.reversed)").reverseChildren();
                }
                jQuery("#CostCentersModal").modal("show");
            }
            FadePageCover(false);
        }
        , null);
}
function CostCenters_Save(pSaveAndNew) {
    debugger;
    if (ValidateForm("form", "CostCentersModal")) {
        FadePageCover(true);
        var pParametersWithValues = {
            pID: $("#hID").val()
            , pCostCenterNumber: $("#txtCode").val().trim() == "" ? "0" : $("#txtCode").val().trim().toUpperCase()
            , pCostCenterName: $("#txtName").val().trim() == "" ? "0" : $("#txtName").val().trim().toUpperCase()
            , pParent_ID: $("#hParentID").val()
            , pCCLevel: $("#hLevel").val()
            , pRealCostCenterCode: $("#hRealCode").val()
            , pType_ID: $("#slCostCenterType").val()
            , pIsClosed: $("#cbIsClosed").prop("checked")
            , pSubAccountGroupID: 0
            , pEmployeesCount: 0
            , pCode: $("#txtCodeM").val().trim() == "" ? "0" : $("#txtCodeM").val().trim()
            , pActivityID :  $('#slActivity').val()
            , pBusinessUnitID: $('#slBusinessUnit').val()
            , pIsActivity: $("#cbIsActivity").prop("checked") 

        };
        CallGETFunctionWithParameters("/api/CostCenters/Save", pParametersWithValues
            , function (pData) {
                debugger;
                if (pData[0]) {
                    var pID = pData[1];
                    var pNodes = JSON.parse(pData[2]);

                    if ($("#hActionType").val() == 1) { //Insert
                        if ($("#hParentID").val() == 0) { //Insert to Root Node (i.e. Level 1)
                            $("#ol" + $("#hParentID").val()).html(CostCenters_AppendNodes(pNodes));
                        }
                        else { // not root(i.e not level 1)
                            $("#" + $("#hParentID").val()).children().each(function (i, item) {
                                if (item.tagName == "LI" || item.tagName == "OL")
                                    item.remove();
                            });
                            $("#div" + $("#hParentID").val()).attr("ondblclick", ("CostCenters_ExpandCollapse(" + $("#hParentID").val() + "," + ($("#hLevel").val() - 1) + ',"' + "collapse" + '"' + ");"))
                            if ($("#btnMark" + $("#hParentID").val()).attr("data-action") == undefined) //first child so add sign
                                $("#" + $("#hParentID").val()).prepend("<button id=btnMark" + $("#hParentID").val() + " onclick='CostCenters_ExpandCollapse(" + $("#hParentID").val() + "," + ($("#hLevel").val() - 1) + ',"' + "collapse" + '"' + ");' data-action='collapse' type='button' style='display: block;'>Collapse</button>");
                            else
                                $("#btnMark" + $("#hParentID").val()).attr("data-action", "collapse");
                            CostCenters_AppendToTree($("#hParentID").val(), pNodes);
                            $("#" + $("#hParentID").val()).removeClass("dd-collapsed");
                        }
                    }
                    else if ($("#hActionType").val() == 2) { //Update
                        $("#span" + $("#hID").val()).html($("#txtCode").val().trim().toUpperCase() + ' - ' + $("#txtName").val().trim().toUpperCase());
                    }
                    jQuery("#CostCentersModal").modal("hide");
                    swal("Success", "Saved successfully.");
                }
                else //pData[0] is false
                    swal("Sorry", "Name must be unique.");
                FadePageCover(false);
            }
            , null);
    }
}
function CostCenters_Delete(pID, pParentID, pLevel) {
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
        CallGETFunctionWithParameters("/api/CostCenters/Delete"
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
function CostCenters_Search() {
    debugger;

    // HighlightText("#tblTree", $("#txt-Search").val().trim());
    var pWhereClause = CostCenter_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID";
    var pParametersWithValues = { pWhereClause: pWhereClause, pOrderBy: pOrderBy }

    var pFunctionName = "/api/CostCenters/LoadWithPagingWithSearch";
    var count = 0;

    FadePageCover(true);
    CallGETFunctionWithParameters(pFunctionName
            , pParametersWithValues, function (pData) {
                debugger;

            var pNodes = JSON.parse(pData[0]);
            //FadePageCover(true);
            var pHTML = "";
            if (pNodes.length > 0)
            {
                FadePageCover(true);
                $.each(pNodes, function (i, item) {
                 //   FadePageCover(true);
                    debugger;
                    var ChildCount = pNodes.filter(x=> x.Parent_ID == item.ID).length;
        
                    if ($("#div" + item.ID) != null && $("#div" + item.ID).length > 0) {
                        if ($("#btnMark" + item.ID) != null && $("#btnMark" + item.ID).length > 0)
                        {
                            var attr =  $("#btnMark" + item.ID).attr("data-action");
                            if (typeof attr !== typeof undefined && attr !== false && ChildCount > 0)
                                $("#btnMark" + item.ID).attr("data-action", "collapse");
                        }
                    }
                    else
                    {
                        //Get Children
                        //Append Children to tree
                        // CostCenters_AppendToTree(item.ID, JSON.parse(pData[0]));
                        $("#hl-menu-Accounting").parent().addClass("active");
                        var pHTML = "";
                        pHTML += "<ol id=ol" + item.Parent_ID + " class='dd-list'>";
                        if (item.IsMain) {
                            pHTML += "<li class='dd-item' id=" + item.ID + ">";
                            //pHTML += "      <button data-action='collapse' type='button' style='display: none;'>Collapse</button>";
                   
                            if (ChildCount > 0)
                                pHTML += "      <button id=btnMark" + item.ID + " onclick='CostCenters_ExpandCollapse(" + item.ID + "," + item.CCLevel + ',"' + "expand" + '"' + ");' data-action='collapse' type='button' style='display: block;'>Expand</button>";
                            else
                                pHTML += "      <button id=btnMark" + item.ID + " onclick='CostCenters_ExpandCollapse(" + item.ID + "," + item.CCLevel + ',"' + "expand" + '"' + ");' data-action='expand' type='button' style='display: block;'>Expand</button>";

                            pHTML += "      <div id=div" + item.ID + " class='dd-handle input-sm text-left divclass' ondblclick='CostCenters_ExpandCollapse(" + item.ID + "," + item.CCLevel + ',"' + "expand" + '"' + ");'>";
                        }
                        else {
                            pHTML += "<li class='dd-item' id=" + item.ID + ">";
                            pHTML += "      <div id=div" + item.ID + " class='dd-handle input-sm text-left divclass'>";
                        }
                        pHTML += "              <span id='span" + item.ID + "'>" + item.CostCenterNumber + ' - ' + item.CostCenterName + "</span>";
                        pHTML += "              " + (($("#hf_CanDelete").val() == 1 /*&& !item.IsMain && item.CCLevel != 1*/) ? ("<a href='#' title='Delete' onclick='CostCenters_Delete(" + item.ID + "," + item.Parent_ID + "," + item.CCLevel + ");' class=' btn btn-xs btn-rounded btn-danger float-right m-t-n-xxs'><i class='fa fa-trash' style='padding-left: 0px;'></i> <span style='padding-right: 0px;'></span></a>") : "");
                        pHTML += "              " + ($("#hf_CanEdit").val() == 1 ? ("<a href='#' title='Edit' onclick='CostCenters_FillModal(2," + item.ID + ");' class=' btn btn-xs btn-rounded btn-info float-right m-t-n-xxs'><i class='fa fa-pencil' style='padding-left: 0px;'></i> <span style='padding-right: 0px;'></span></a>") : "");
                        pHTML += "              " + (($("#hf_CanAdd").val() == 1 && item.CCLevel < constMaxCostCentersLevels) ? ("<a href='#' title='Add' onclick='CostCenters_FillModal(1," + item.ID + ");' class=' btn btn-xs btn-rounded btn-lightblue float-right m-t-n-xxs'><i class='fa fa-plus' style='padding-left: 0px;'></i> <span style='padding-right: 0px;'></span></a>") : "");
                        pHTML += "      </div>";
                        pHTML += "</li>";

                        pHTML += '</ol>';
                        $("#" + item.Parent_ID).append(pHTML);

                        ApplyPermissions();

                        $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
                        //if ($("#btnMark" + item.ID) != null && $("#btnMark" + item.ID).length > 0 && $("#btnMark" + item.ID).attr("data-action") == "expand") { //Collapse children
                        //    $("#btnMark" + item.ID).attr("data-action", "collapsed");
                        $("#" + item.Parent_ID).removeClass("dd-collapsed");
                       //  }
                       // FadePageCover(false);
                    }
                 //   FadePageCover(false);


                    if(i == (pNodes.length - 1))
                    {
                        HighlightText("#tblTree>tbody>tr .dd-item", $("#txt-Search").val().trim());
                        FadePageCover(false);
                    }

                }
                );
            }
            else
                FadePageCover(false);
            }, null);
 
   // }
  //  FadePageCover(false);
}
function CostCenter_GetWhereClause() {
    var pWhereClause = "WHERE 1=1";
    if ($("#txt-Search").val().trim() != "") {
        pWhereClause = $("#txt-Search").val().trim();
        //pWhereClause += " AND (" + "\n";
        //pWhereClause += " costcentername LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        //pWhereClause += ")";
    }
    return pWhereClause;
}
