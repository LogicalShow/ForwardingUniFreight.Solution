// City Country ---------------------------------------------------------------
// Bind CRMCycleSettings Table Rows
function CRMCycleSettings_BindTableRows(pCRMCycleSettings) {
    debugger;
    $("#hl-menu-CRM").parent().addClass("active");
    ClearAllTableRows("tblCRMCycleSettings");
    $.each(pCRMCycleSettings, function (i, item) {
        debugger;
        AppendRowtoTable("tblCRMCycleSettings",
            ("<tr ID='" + item.ID + "' ondblclick='OpenSetCRMCycleModal(" + item.ID + ");'>"
                + "<td class='SettingName' val='" + item.ID + "'>Followup procedure to create a sales deal</td>"
                + "<td class='ActionID hide' val='" + item.ActionID + "'>" + item.ActionID + "</td>"
                + "<td class='StatusID hide' val='" + item.StatusID + "'>" + item.StatusID + "</td>"
                + "</tr>"));
        
    });
    ApplyPermissions(); 
    BindAllCheckboxonTable("tblCRMCycleSettings", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblCRMCycleSettings>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function OpenSetCRMCycleModal(pID) {
    debugger;
    jQuery('#CRMCycleModal').modal('show');
    $("#SettingID").val(pID);
    $("#btnSave").attr("onclick",'SetCRMCycle(' + pID + ');')
    var pParametersWithValues = {
        'pWhereClause': ' WHERE 1=1'
    };
    CallGETFunctionWithParameters("/api/CRM_Actions/LoadAll", pParametersWithValues
        , function (pData) {
            Fill_SelectInputAfterLoadData(pData[0], "ID", "Name", "Select Action", "#slAction", $("td.ActionID").attr("val"));
            Fill_SelectInputAfterLoadData(pData[2], "ID", "Name", "Select Status", "#slStatus", $("td.StatusID").attr("val"));
            FadePageCover(false);
        }
    )
}

function SetCRMCycle(pID) {
    var pParametersWithValues = {
        'pID': pID,
        'pActionID': $("#slAction").val(),
        'pStatusID': $("#slStatus").val()
    };
    CallGETFunctionWithParameters("/api/CRMCycleSettings/Update", pParametersWithValues, function () {
        jQuery('#CRMCycleModal').modal('hide');
        CRMCycleSettings_LoadingWithPaging();
        swal("CRM cycle default settings are updated successfully!");
    })
}
var pGlobalID = 0;
function CRMCycleSettings_EditByDblClick(pID) {
    pGlobalID = pID;
    jQuery("#CRMCycleSettingsModal").modal("show");
    CRMCycleSettings_FillControls(pID);
}
// Loading with data
function CRMCycleSettings_LoadingWithPaging() {
    debugger;
    var pParametersWithValues = {
        pWhereClause:" Where 1=1"
    };
    CallGETFunctionWithParameters("/api/CRMCycleSettings/LoadAll", pParametersWithValues
        , function (pData) {
            CRMCycleSettings_BindTableRows(JSON.parse(pData[0]));
                CRMCycleSettings_ClearAllControls();
        },null);

}
function CRMCycleSettings_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#CRMCycleSettingsModal", null);
    $("#cb-CheckAll").prop('checked', false);
}

