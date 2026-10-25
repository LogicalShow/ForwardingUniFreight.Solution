// City Country ---------------------------------------------------------------
// Bind CRM_PipeLineStage Table Rows
function CRM_PipeLineStage_BindTableRows(pCRM_PipeLineStage) {
    debugger;
    $("#hl-menu-CRM").parent().addClass("active");
    ClearAllTableRows("tblCRM_PipeLineStage");
    $.each(pCRM_PipeLineStage, function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblCRM_PipeLineStage",
        ("<tr ID='" + item.ID + "' ondblclick='CRM_PipeLineStage_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='ClientID' val='" + item.ClientID + "'>" + item.ClientName  + "</td>"
                    + "<td class='CreationDate' val='" + item.CreationDate + "'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CreationDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate))) + "</td>"
                    + "<td class='CreatorUserID' val='" + item.CreatorUserID + "'>" + item.CreatorUsername + "</td>"
                    + "<td class='ModificationDate hide' val='" + item.ModificationDate + "'>" + item.ModificationDate + "</td>"
                    + "<td class='ModificationUserID hide' val='" + item.ModificationUserID + "'>" + item.ModificationUserID + "</td>"
                    + "<td class='PipeLineStageID' val='" + item.PipeLineStageID + "'>" + item.PipeLineStageName + "</td>"
                    + "<td class='ActionType' val='" + item.ActionType + "'>" + item.ActionType + "</td>"
                    + "</tr>"));
        
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblCRM_PipeLineStage", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblCRM_PipeLineStage>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function BindUsers()
{
    debugger;
    Receptionists_GetAvailableUsers();
    //$("#btnCheckboxesListApply").attr("onclick", "Pricing_SendLocalEmail(" + pID + ");");
    $("#btnCheckboxesListApply").html("<span class='glyphicon glyphicon-send'></span> Send");
    $("#btn-SearchItems").attr("onclick", "Receptionists_GetAvailableUsers();");
}
function Receptionists_GetAvailableUsers() {
    debugger;
    $("#lblShownItems").html(" Receptionists");
    $("#divCheckboxesList").html("");
    jQuery("#CheckboxesListModal").modal("show");
    var pStrFnName = "/api/Users/LoadAll";
    var pDivName = "divCheckboxesList";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pWhereClause = "";
    pWhereClause += " WHERE IsInactive=0 ";
    //pWhereClause += " AND Name LIKE N'%" + $("#txtSearchItems").val().trim().toUpperCase() + "%' ";
    pWhereClause += " ORDER BY Name ";
    debugger;
    FadePageCover(true);
    GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
        , function () {
            HighlightText("#" + pDivName, $("#txtSearchItems").val().trim());
            FadePageCover(false);
        });
}
var pGlobalID = 0;
function CRM_PipeLineStage_EditByDblClick(pID) {
    pGlobalID = pID;
    jQuery("#CRM_PipeLineStageModal").modal("show");
    CRM_PipeLineStage_FillControls(pID);
}
// Loading with data
function CRM_PipeLineStage_LoadingWithPaging() {
    debugger;
    //var pParametersWithValues = {
    //    pWhereClause:" Where 1=1"
    //};
    //CallGETFunctionWithParameters("/api/CRM_PipeLineStage/LoadAll", pParametersWithValues
    //    , function (pData) {
    //        CRM_PipeLineStage_BindTableRows(JSON.parse(pData[0]));
    //            CRM_PipeLineStage_ClearAllControls();
    //    },null);
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/CRM_PipeLineStage/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(),
        function (pTabelRows)
        {
            CRM_PipeLineStage_BindTableRows(pTabelRows);
            CRM_PipeLineStage_ClearAllControls();
        });
    HighlightText("#tblCRM_PipeLineStage>tbody>tr", $("#txt-Search").val().trim());
}
function CRM_PipeLineStage_LoadData()
{
    debugger;
    //var pParametersWithValues = {
    //        pSalesManID: $('#slSalesMan').val()
    //      , pActionType: $("#slActionType option:selected").text()
    //      , pClientID: $('#slClientName').val()
    //      , pPipeLineStageID: $('#slPipeLineStageName').val()
    //      , pIsManager:($('#slSalesMan').is(':disabled') == false?1:0)
    //};
    //CallGETFunctionWithParameters("/api/CRM_PipeLineStage/CRM_PipeLineStage_LoadData", pParametersWithValues
    //    , function (pData) {
    //        debugger;
    //        CRM_PipeLineStage_BindTableRows(JSON.parse(pData[0]));

    //    }, null);
    FadePageCover(true);
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = " ID DESC";
    var pPageSize = $('#select-page-size').val();
    var pControllerParameters = {//pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), 
        pPageNumber: pPageNumber, pPageSize: pPageSize, pOrderBy: pOrderBy
               , pSalesManID: $('#slSalesMan').val(), pActionType: $("#slActionType option:selected").text(), pClientID: $('#slClientName').val()
               , pPipeLineStageID: $('#slPipeLineStageName').val(), pIsManager: ($('#slSalesMan').is(':disabled') == false ? 1 : 0)
    }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/CRM_PipeLineStage/CRM_PipeLineStage_LoadData", "", pOrderBy, pPageNumber, pPageSize, pControllerParameters,
        function (pData) {
            CRM_PipeLineStage_BindTableRows(JSON.parse(pData[0]));
            FadePageCover(false);
        });
    
}
// calling web function to add new City item.
function CRM_PipeLineStage_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/CRM_PipeLineStage/Insert"
        , {
            pCode: $("#txtCode").val().trim()
            , pName: $("#txtName").val().trim()
            , pHasDetails: $("#cboHasDetails").prop('checked')
            , pAlarmDays: $("#txtAlarmDays").val().trim() == "" ? 0 : $("#txtAlarmDays").val().trim()
            , pAlarmHours: $("#txtAlarmHours").val().trim() == "" ? 0 : $("#txtAlarmHours").val().trim()
            , pActionPercent: $("#txtPercent").val().trim() == "" ? 0 : $("#txtPercent").val().trim()
            , pColor: $("#slColors").val()
        }, pSaveandAddNew, "CRM_PipeLineStageModal", function () { CRM_PipeLineStage_LoadingWithPaging(); });
}
// calling this function for update
function CRM_PipeLineStage_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/CRM_PipeLineStage/Update",
        {
            pID: $("#hID").val()
            , pCode: $("#txtCode").val().trim()
            , pName: $("#txtName").val().trim()
            , pHasDetails: $("#cboHasDetails").prop('checked')
            , pAlarmDays: $("#txtAlarmDays").val().trim() == "" ? 0 : $("#txtAlarmDays").val().trim()
            , pAlarmHours: $("#txtAlarmHours").val().trim() == "" ? 0 : $("#txtAlarmHours").val().trim()
            , pActionPercent: $("#txtPercent").val().trim() == "" ? 0 : $("#txtPercent").val().trim()
            , pColor: $("#slColors").val()
        }, pSaveandAddNew, "CRM_PipeLineStageModal", function () { CRM_PipeLineStage_LoadingWithPaging(); });
}

function CRM_PipeLineStage_Delete(pID) {
    DeleteListFunction("/api/CRM_PipeLineStage/DeleteByID", { "pID": pID }, function () { CRM_PipeLineStage_LoadingWithPaging(); });
}
function CRM_PipeLineStage_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblCRM_PipeLineStage') != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
        //callback function in case of success
        function () {
            DeleteListFunction("/api/CRM_PipeLineStage/Delete", { "pCRM_PipeLineStageIDs": GetAllSelectedIDsAsString('tblCRM_PipeLineStage') }, function () { CRM_PipeLineStage_LoadingWithPaging(); });
        });
    //DeleteListFunction("/api/CRM_PipeLineStage/Delete", { "pCRM_PipeLineStageIDs": GetAllSelectedIDsAsString('tblCRM_PipeLineStage') }, function () { CRM_PipeLineStage_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
function CRM_PipeLineStage_FillControls(pID) {
    debugger;
    // Fill All Model Controls
    ClearAll("#CRM_PipeLineStageModal", null);
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");

    var CRM_PipeLineStageUsers = $(tr).find("td.UsersIDs").attr('val').split(',');
    var i=0;
    for (i = 0; i < CRM_PipeLineStageUsers.length; i++)
    {
        $('input[value="' + CRM_PipeLineStageUsers[i] + '"]').prop('checked', true);
    }
   
    //$("#txtName").val($(tr).find("td.Name").attr('val'));
    //$("#txtAlarmDays").val($(tr).find("td.AlarmDays").text());      
 
}
function CRM_PipeLineStage_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#CRM_PipeLineStageModal", null);
    $("#cb-CheckAll").prop('checked', false);
}
function CRM_PipeLineStage_Save() {
    debugger;
    var pModalName = "CheckboxesListModal";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pSelectedItemsIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
        FadePageCover(true);
        var pParametersWithValues = {
              pID: pGlobalID
            , pUserIDs: (pSelectedItemsIDs == "" ? 0 : pSelectedItemsIDs)
           
        };
        CallGETFunctionWithParameters("/api/CRM_PipeLineStage/Saveprivileges", pParametersWithValues
            , function (pData) {
                if (pData) {
                    jQuery("#CRM_PipeLineStageModal").modal("hide");
                    swal("Success", "Sent successfully.");
                    CRM_PipeLineStage_LoadingWithPaging();
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
            , null);
    
}
