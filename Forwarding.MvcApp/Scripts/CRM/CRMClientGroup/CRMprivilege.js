// City Country ---------------------------------------------------------------
// Bind CRMprivilege Table Rows
function CRMprivilege_BindTableRows(pCRMprivilege) {
    debugger;
    $("#hl-menu-CRM").parent().addClass("active");
    ClearAllTableRows("tblCRMprivilege");
    $.each(pCRMprivilege, function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        if (item.ID == 50)
        {
             AppendRowtoTable("tblCRMprivilege",
        ("<tr ID='" + item.ID + "' ondblclick='CRMprivilege_setupinvalidsalesleadMonth(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='privilegeName' val='" + item.privilegeName + "'>" + item.privilegeName + "</td>"
                    + "<td class='UsersIDs hide' val='" + item.UsersIDs + "'>" + item.UsersIDs + "</td>"
                    + "</tr>"));
        }
        else
        {
            AppendRowtoTable("tblCRMprivilege",
        ("<tr ID='" + item.ID + "' ondblclick='CRMprivilege_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='privilegeName' val='" + item.privilegeName + "'>" + item.privilegeName + "</td>"
                    + "<td class='UsersIDs hide' val='" + item.UsersIDs + "'>" + item.UsersIDs + "</td>"
                    + "</tr>"));
        }
        
    });
    ApplyPermissions(); 
    BindAllCheckboxonTable("tblCRMprivilege", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblCRMprivilege>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function CRMprivilege_setupinvalidsalesleadMonth()
{
    jQuery('#CRM_ActionsModal').modal('show');
    var pParametersWithValues = {
        
    };
    CallGETFunctionWithParameters("/api/CRMprivilege/GetLastsetupinvalidsalesleadMonth", pParametersWithValues
        , function (pData) {
            if (JSON.parse(pData[0]).length)
                $('#txtMonths').val(JSON.parse(pData[0])[0].NumOfMonths);
        }, null);

}

function Insert_setupinvalidsalesleadMonth() {
    debugger;
    FadePageCover(true);
    var pParametersWithValues = {
        pMonths: $('#txtMonths').val()
    };
    CallGETFunctionWithParameters("/api/CRMprivilege/InsertMonths", pParametersWithValues
        , function (pData) {

            FadePageCover(false);
            if (pData)
                swal("Success", "Saved successfully.");
            jQuery('#CRM_ActionsModal').modal('hide');
            CRMprivilege_LoadingWithPaging();
        }, null);

}
function OpenSetCRMCycleModal() {
    debugger;
    jQuery('#CRMCycleModal').modal('show');
    var pParametersWithValues = {
        'pWhereClause': ' WHERE 1=1'
    };
    CallGETFunctionWithParameters("/api/CRM_Actions/LoadAll", pParametersWithValues
        , function (pData) {
            Fill_SelectInputAfterLoadData(pData[0], "ID", "Name", "Select Action", "#slAction", $("#70 td.ActionID").attr("val"));
            Fill_SelectInputAfterLoadData(pData[2], "ID", "Name", "Select Status", "#slStatus", $("#70 td.StatusID").attr("val"));
            FadePageCover(false);
        }
    )
}

function SetCRMCycle(IsSaveAndNew) {
    var pParametersWithValues = {
        'pID': 70,
        'pActionID': $("#slAction").val(),
        'pStatusID': $("#slStatus").val()
    };
    CallGETFunctionWithParameters("/api/CRMprivilege/Update", pParametersWithValues, function () {
        jQuery('#CRMCycleModal').modal('hide');
        CRMprivilege_LoadingWithPaging();
    })
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
function CRMprivilege_EditByDblClick(pID) {
    pGlobalID = pID;
    jQuery("#CRMprivilegeModal").modal("show");
    CRMprivilege_FillControls(pID);
}
// Loading with data
function CRMprivilege_LoadingWithPaging() {
    debugger;
    var pParametersWithValues = {
        pWhereClause:" Where 1=1"
    };
    CallGETFunctionWithParameters("/api/CRMprivilege/LoadAll", pParametersWithValues
        , function (pData) {
            CRMprivilege_BindTableRows(JSON.parse(pData[0]));
                CRMprivilege_ClearAllControls();
        },null);

}
// calling web function to add new City item.
function CRMprivilege_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/CRMprivilege/Insert"
        , {
            pCode: $("#txtCode").val().trim()
            , pName: $("#txtName").val().trim()
            , pHasDetails: $("#cboHasDetails").prop('checked')
            , pAlarmDays: $("#txtAlarmDays").val().trim() == "" ? 0 : $("#txtAlarmDays").val().trim()
            , pAlarmHours: $("#txtAlarmHours").val().trim() == "" ? 0 : $("#txtAlarmHours").val().trim()
            , pActionPercent: $("#txtPercent").val().trim() == "" ? 0 : $("#txtPercent").val().trim()
            , pColor: $("#slColors").val()
        }, pSaveandAddNew, "CRMprivilegeModal", function () { CRMprivilege_LoadingWithPaging(); });
}
// calling this function for update
function CRMprivilege_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/CRMprivilege/Update",
        {
            pID: $("#hID").val()
            , pCode: $("#txtCode").val().trim()
            , pName: $("#txtName").val().trim()
            , pHasDetails: $("#cboHasDetails").prop('checked')
            , pAlarmDays: $("#txtAlarmDays").val().trim() == "" ? 0 : $("#txtAlarmDays").val().trim()
            , pAlarmHours: $("#txtAlarmHours").val().trim() == "" ? 0 : $("#txtAlarmHours").val().trim()
            , pActionPercent: $("#txtPercent").val().trim() == "" ? 0 : $("#txtPercent").val().trim()
            , pColor: $("#slColors").val()
        }, pSaveandAddNew, "CRMprivilegeModal", function () { CRMprivilege_LoadingWithPaging(); });
}

function CRMprivilege_Delete(pID) {
    DeleteListFunction("/api/CRMprivilege/DeleteByID", { "pID": pID }, function () { CRMprivilege_LoadingWithPaging(); });
}
function CRMprivilege_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblCRMprivilege') != "")
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
            DeleteListFunction("/api/CRMprivilege/Delete", { "pCRMprivilegeIDs": GetAllSelectedIDsAsString('tblCRMprivilege') }, function () { CRMprivilege_LoadingWithPaging(); });
        });
    //DeleteListFunction("/api/CRMprivilege/Delete", { "pCRMprivilegeIDs": GetAllSelectedIDsAsString('tblCRMprivilege') }, function () { CRMprivilege_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
function CRMprivilege_FillControls(pID) {
    debugger;
    // Fill All Model Controls
    ClearAll("#CRMprivilegeModal", null);
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");

    var CRMPrivilegeUsers = $(tr).find("td.UsersIDs").attr('val').split(',');
    var i=0;
    for (i = 0; i < CRMPrivilegeUsers.length; i++)
    {
        $('input[value="' + CRMPrivilegeUsers[i] + '"]').prop('checked', true);
    }
   
    //$("#txtName").val($(tr).find("td.Name").attr('val'));
    //$("#txtAlarmDays").val($(tr).find("td.AlarmDays").text());      
 
}
function CRMprivilege_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#CRMprivilegeModal", null);
    $("#cb-CheckAll").prop('checked', false);
}
function CRMprivilege_Save() {
    debugger;
    var pModalName = "CheckboxesListModal";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pSelectedItemsIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
        FadePageCover(true);
        var pParametersWithValues = {
              pID: pGlobalID
            , pUserIDs: (pSelectedItemsIDs == "" ? 0 : pSelectedItemsIDs)
           
        };
        CallGETFunctionWithParameters("/api/CRMprivilege/Saveprivileges", pParametersWithValues
            , function (pData) {
                if (pData) {
                    jQuery("#CRMprivilegeModal").modal("hide");
                    swal("Success", "Sent successfully.");
                    CRMprivilege_LoadingWithPaging();
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
            , null);
    
}
