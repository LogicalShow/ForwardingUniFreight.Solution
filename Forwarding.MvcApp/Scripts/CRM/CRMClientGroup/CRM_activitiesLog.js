// City Country ---------------------------------------------------------------
// Bind CRM_activitiesLog Table Rows
function CRM_activitiesLog_BindTableRows(pCRM_activitiesLog) {
    debugger;
    $("#hl-menu-CRM").parent().addClass("active");
    ClearAllTableRows("tblCRM_activitiesLog");
    $.each(pCRM_activitiesLog, function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblCRM_activitiesLog",
        ("<tr ID='" + item.ID + "' ondblclick='CRM_activitiesLog_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='ClientName' val='" + item.ClientName + "'>" + item.ClientName + "</td>"
                    + "<td class='CreationDate' val='" + item.CreationDate + "'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CreationDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate))) + "</td>"
                    + "<td class='CreatorUserID' val='" + item.CreatorUserID + "'>" + item.CreatorUserName + "</td>"
                    + "<td class='ModificationDate hide' val='" + item.ModificationDate + "'>" + item.ModificationDate + "</td>"
                    + "<td class='ModifatorUserID hide' val='" + item.ModifatorUserID + "'>" + item.ModifatorUserName + "</td>"
                    + "<td class='ActionName' val='" + item.ActionName + "'>" + item.ActionName + "</td>"
                     + "<td class='ServiceName' val='" + item.ServiceName + "'>" + item.ServiceName + "</td>"
                    + "</tr>"));
        
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblCRM_activitiesLog", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblCRM_activitiesLog>tbody>tr", $("#txt-Search").val().trim());
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
function CRM_activitiesLog_EditByDblClick(pID) {
    pGlobalID = pID;
    jQuery("#CRM_activitiesLogModal").modal("show");
    CRM_activitiesLog_FillControls(pID);
}
// Loading with data
function CRM_activitiesLog_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/CRM_activitiesLog/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(),
        function (pTabelRows)
        {
            CRM_activitiesLog_BindTableRows(pTabelRows);
            CRM_activitiesLog_ClearAllControls();
        });
    HighlightText("#tblCRM_activitiesLog>tbody>tr", $("#txt-Search").val().trim());
}
function CRM_Activity_LoadData() {
    debugger;
    //var pParametersWithValues = {
    //    pSalesManID: $('#slSalesMan').val()
    //      , pActionType: $("#slActionType option:selected").text()
    //      , pClientName: $("#slClientName option:selected").text().trim()
    //      , pActivityID: $('#slActivity').val()
    //      , pIsManager: ($('#slSalesMan').is(':disabled') == false ? 1 : 0)
    //};
    //CallGETFunctionWithParameters("/api/CRM_activitiesLog/CRM_Activity_LoadData", pParametersWithValues
    //    , function (pData) {
    //        debugger;
    //        CRM_activitiesLog_BindTableRows(JSON.parse(pData[0]));

    //    }, null);
    FadePageCover(true);
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = " ID DESC";
    var pPageSize = $('#select-page-size').val();
    var pControllerParameters = {//pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), 
        pPageNumber: pPageNumber, pPageSize: pPageSize, pOrderBy: pOrderBy
               , pSalesManID: $('#slSalesMan').val(), pActionType: $("#slActionType option:selected").text(), pClientName: $("#slClientName option:selected").text().trim(), pActivityID: $('#slActivity').val(), pIsManager: ($('#slSalesMan').is(':disabled') == false ? 1 : 0)
    }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/CRM_activitiesLog/CRM_Activity_LoadWithPaging", "", pOrderBy, pPageNumber, pPageSize, pControllerParameters,
        function (pData) {
            CRM_activitiesLog_BindTableRows(JSON.parse(pData[0]));
            FadePageCover(false);
        });

}

// calling web function to add new City item.
function CRM_activitiesLog_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/CRM_activitiesLog/Insert"
        , {
            pCode: $("#txtCode").val().trim()
            , pName: $("#txtName").val().trim()
            , pHasDetails: $("#cboHasDetails").prop('checked')
            , pAlarmDays: $("#txtAlarmDays").val().trim() == "" ? 0 : $("#txtAlarmDays").val().trim()
            , pAlarmHours: $("#txtAlarmHours").val().trim() == "" ? 0 : $("#txtAlarmHours").val().trim()
            , pActionPercent: $("#txtPercent").val().trim() == "" ? 0 : $("#txtPercent").val().trim()
            , pColor: $("#slColors").val()
        }, pSaveandAddNew, "CRM_activitiesLogModal", function () { CRM_activitiesLog_LoadingWithPaging(); });
}
// calling this function for update
function CRM_activitiesLog_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/CRM_activitiesLog/Update",
        {
            pID: $("#hID").val()
            , pCode: $("#txtCode").val().trim()
            , pName: $("#txtName").val().trim()
            , pHasDetails: $("#cboHasDetails").prop('checked')
            , pAlarmDays: $("#txtAlarmDays").val().trim() == "" ? 0 : $("#txtAlarmDays").val().trim()
            , pAlarmHours: $("#txtAlarmHours").val().trim() == "" ? 0 : $("#txtAlarmHours").val().trim()
            , pActionPercent: $("#txtPercent").val().trim() == "" ? 0 : $("#txtPercent").val().trim()
            , pColor: $("#slColors").val()
        }, pSaveandAddNew, "CRM_activitiesLogModal", function () { CRM_activitiesLog_LoadingWithPaging(); });
}

function CRM_activitiesLog_Delete(pID) {
    DeleteListFunction("/api/CRM_activitiesLog/DeleteByID", { "pID": pID }, function () { CRM_activitiesLog_LoadingWithPaging(); });
}
function CRM_activitiesLog_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblCRM_activitiesLog') != "")
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
            DeleteListFunction("/api/CRM_activitiesLog/Delete", { "pCRM_activitiesLogIDs": GetAllSelectedIDsAsString('tblCRM_activitiesLog') }, function () { CRM_activitiesLog_LoadingWithPaging(); });
        });
    //DeleteListFunction("/api/CRM_activitiesLog/Delete", { "pCRM_activitiesLogIDs": GetAllSelectedIDsAsString('tblCRM_activitiesLog') }, function () { CRM_activitiesLog_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
function CRM_activitiesLog_FillControls(pID) {
    debugger;
    // Fill All Model Controls
    ClearAll("#CRM_activitiesLogModal", null);
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");

    var CRM_activitiesLogUsers = $(tr).find("td.UsersIDs").attr('val').split(',');
    var i=0;
    for (i = 0; i < CRM_activitiesLogUsers.length; i++)
    {
        $('input[value="' + CRM_activitiesLogUsers[i] + '"]').prop('checked', true);
    }
   
    //$("#txtName").val($(tr).find("td.Name").attr('val'));
    //$("#txtAlarmDays").val($(tr).find("td.AlarmDays").text());      
 
}
function CRM_activitiesLog_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#CRM_activitiesLogModal", null);
    $("#cb-CheckAll").prop('checked', false);
}
function CRM_activitiesLog_Save() {
    debugger;
    var pModalName = "CheckboxesListModal";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pSelectedItemsIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
        FadePageCover(true);
        var pParametersWithValues = {
              pID: pGlobalID
            , pUserIDs: (pSelectedItemsIDs == "" ? 0 : pSelectedItemsIDs)
           
        };
        CallGETFunctionWithParameters("/api/CRM_activitiesLog/Saveprivileges", pParametersWithValues
            , function (pData) {
                if (pData) {
                    jQuery("#CRM_activitiesLogModal").modal("hide");
                    swal("Success", "Sent successfully.");
                    CRM_activitiesLog_LoadingWithPaging();
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
            , null);
    
}
