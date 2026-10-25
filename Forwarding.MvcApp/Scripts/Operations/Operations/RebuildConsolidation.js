//Concentrate: This table comes from vwOperations
function RebuildConsolidation_BindTableRows(pOperations) {
    ClearAllTableRows("tblRebuildConsolidation");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pOperations, function (i, item) {

        AppendRowtoTable("tblRebuildConsolidation",
        ("<tr ID='" + item.ID + "' ondblclick='RebuildConsolidation_EditByDblClick(" + item.ID + ");'>"
                    //+ "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    //+ "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' " + (item.MasterOperationID == 0 ? "" : " disabled ") + " /></td>"
                    + "<td class='MappedHouseID'> <input name='MappedHouseID' type='checkbox' value ='" + item.ID + "'/></td>"
                    //+ "<td class='RebuildConsolidationHouseCode'>" + item.Code + "</td>"
                    + "<td class='RebuildConsolidationHouseCode'>" + item.HouseNumber + "</td>"
                    + "<td class='RebuildConsolidationHouseContainer' val='" + item.PlacedOnOperationContainersAndPackagesID + "'>" +
                            (item.PlacedOnOperationContainersAndPackagesID == 0 
                            ? ""
                            : item.ContainerTypeCode + (item.ContainerNumber == 0 ? "" : " (" + item.ContainerNumber + ")" )
                            )
                    + "</td>"
                    + "<td class='hide'><a onclick='SwitchToOperationsEditView(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblRebuildConsolidation", "ID");//it attaches function to the checkboxes so when all are checked then check cb-checkall too
    CheckAllCheckbox("ID");
    HighlightText("#tblRebuildConsolidation>tbody>tr", $("#txtRebuildConsolidationSearch").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}

function RebuildConsolidation_LoadWithPaging() {
    debugger;
    //strLoadWithPagingFunctionName = "/api/Operations/LoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    strBindTableRowsFunctionName = "RebuildConsolidation_BindTableRows";
    var pWhereClause = RebuildConsolidation_GetWhereClause();
    var pOrderBy = " ID ";
    LoadWithPagingWithWhereClauseAndOrderBy("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "api/Operations/LoadOperationWithDetails", pWhereClause, pOrderBy, 0/*$("#div-Pager li.active a").text()*/, 10/*$('#select-page-size').val().trim()*/, function (data) { RebuildConsolidation_BindTableRows(JSON.parse(data[0])/*pTabelRows*/); });
    //HighlightText("#tblRebuildConsolidation>tbody>tr", $("#txtRebuildConsolidationSearch").val().trim());
}

function RebuildConsolidation_GetWhereClause() {
    var pWhereClause = " WHERE MasterOperationID = " + $("#hOperationID").val();
    pWhereClause += ($("#txtRebuildConsolidationSearch").val().trim() == ""
                    ? ""
                    : " AND (Code LIKE '%" + $("#txtRebuildConsolidationSearch").val().trim().toUpperCase() + "%' "
                        + " OR ContainerTypeCode  LIKE '%" + $("#txtRebuildConsolidationSearch").val().trim().toUpperCase() + "%' "
                        + " OR ContainerNumber  LIKE '%" + $("#txtRebuildConsolidationSearch").val().trim().toUpperCase() + "%' "
                        + ")");
    return pWhereClause;
}

function RebuildConsolidation_ClearAllControls() {
    ClearAll("#RebuildConsolidationModal");
    MapHouseToContainer_GetList(null, "slMappedContainersToAll", null);
}
//to reset function names as in mainapp.master
function RebuildConsolidation_ResetFunctionsNames() {
    strLoadWithPagingFunctionName = "/api/Operations/LoadOperationWithDetails";//sherif: to fix paging cz it calls whats related to the original table
    strBindTableRowsFunctionName = "OperationsEdit_BindTableRows";
}
function RebuildConsolidation_EditByDblClick(pID) {
    jQuery("#MapHouseToContainerModal").modal("show");
    MapHouseToContainer_FillControls(pID);
}
//////////////////////Fns Related to MapHouseToContainer Modal////////////////////////////////////////////////////
function MapHouseToContainer_FillControls(pID) {
    ClearAll("#MapHouseToContainerModal");
    var tr = $("#tblRebuildConsolidation tr[ID='" + pID + "']");

    $("#hHouseToMapID").val(pID);
    $("#lblMapHouseToContainerShown").text(": " + $(tr).find("td.RebuildConsolidationHouseCode").text());
    var pPlacedOnOperationContainersAndPackagesID = $(tr).find("td.RebuildConsolidationHouseContainer").attr("val");
    MapHouseToContainer_GetList(pPlacedOnOperationContainersAndPackagesID, "slMappedContainers", null);
}
//pWhoIsCalling=1 : means 1 house to 1 container
//pWhoIsCalling=2 : means many houses to 1 container
function MapHouseToContainer_Update(pWhoIsCalling) { 
    //if ($("#slMappedContainers").val() == "")
    //    swal(strSorry, "Please, Select a Container.");
    //else {
        debugger;
        var pMasterOperationContainersAndPackagesID = "0";
        var pSelectedIDs = "0";
        if (pWhoIsCalling == 1) { //pWhoIsCalling=1 : means 1 house to 1 container
            var pMasterOperationContainersAndPackagesID = ($("#slMappedContainers").val() == "" ? 0 : $("#slMappedContainers").val());
            var pSelectedIDs = $("#hHouseToMapID").val();
        }
        else
            if (pWhoIsCalling == 2) { //pWhoIsCalling=2 : means many houses to 1 container
                debugger;
                var pMasterOperationContainersAndPackagesID = ($("#slMappedContainersToAll").val() == "" ? 0 : $("#slMappedContainersToAll").val());
                var pSelectedIDs = GetAllSelectedIDsAsStringWithNameAttr("MappedHouseID");
                //if (pMasterOperationContainersAndPackagesID == "" || pSelectedIDs == "") {
                if (pSelectedIDs == "") {
                    //swal(strSorry, "Please, Select at least 1 House and a Container.");
                    swal(strSorry, "Please, Select at least 1 House.");
                    return false;
                }
            }
        CallGETFunctionWithParameters("/api/OperationContainersAndPackages/RebuildContainersAndPackages_Consolidation"
            , { pMasterConsolidationOperationID: $("#hOperationID").val(), pMasterOperationContainersAndPackagesID: pMasterOperationContainersAndPackagesID, pHouseOperationsIDs: pSelectedIDs, pWhoIsCalling: 1 } //pWhoIsCalling: refer to it in the controller before the api fn name
            , function () {
                RebuildConsolidation_LoadWithPaging();
                //jQuery.noConflict();
                jQuery("#MapHouseToContainerModal").modal('hide');
                Shipments_LoadAvailableShipments();
            });
    //} //of else 
}
function MapHouseToContainer_GetList(pID, slName, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    var pWhereClause = " WHERE OperationID = " + $("#hOperationID").val();
    //parameters: ID, strFnName, First Row in select list, select list name
    var pControllerParameters = { pPageNumber: 1, pPageSize: 99999, pWhereClause: pWhereClause, pOrderBy: "ContainerTypeCode" };
    GetListWithContainerTypeCodeAndContainerNumberAndWhereClause(pID, "/api/OperationContainersAndPackages/LoadWithWhereClause", "Select Container", slName, pControllerParameters);
}

