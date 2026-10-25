
var _IsOpenedFromOperation = false;

function InterServicesRequests_Initialize() {
    debugger;
    strLoadWithPagingFunctionName = "/api/InterServicesRequests/LoadWithPaging";
    //the first parameter in the LoadView() fn. is the route in the RouteConfig
    LoadView("/InterServices/InterServicesRequests", "div-content", function () {
        LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, 0, 10
            , function (pTabelRows) {
                InterServicesRequests_BindTableRows(pTabelRows);
            });
    },
        function () { InterServicesRequests_ClearAllControls(); },
        function () { InterServicesRequests_DeleteList(); });
}
function InterServicesRequests_BindTableRows(pInterServicesRequests) {
    debugger;
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblInterServicesRequests");
    $.each(pInterServicesRequests, function (i, item) {
        var cost = pLoggedUser.ID == item.ToUserID ? item.Cost : '';
        AppendRowtoTable("tblInterServicesRequests",
        ("<tr ID='" + item.ID + "' ondblclick='InterServicesRequests_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='ToDepartmentName'>" + item.ToDepartmentName + "</td>"
                    + "<td class='ToUserName'>" + item.ToUserName + "</td>"
                     + "<td class='FromDepartmentName'>" + item.FromDepartmentName + "</td>"
                    + "<td class='CreatorUserName'>" + item.CreatorUserName + "</td>"
                    + "<td class='ChargeTypeName'>" + item.ChargeTypeName + "</td>"
                    + "<td class='HBL'>" + item.HBL + "</td>"
                    + "<td class='Cost' val='" + item.Cost + "'>" + cost + "</td>"
                    + "<td class='SalePrice'>" + item.SalePrice + "</td>"
                    + "<td class='StatusName'>" + item.StatusName + "</td>"
                    //hidden columns
                    + "<td class='Notes hide' val='" + item.Notes + "'>" + item.Notes + "</td>"
                    + "<td class='ChargeTypeID hide' val='" + item.ChargeTypeID + "'>" + item.ChargeTypeID + "</td>"
                    + "<td class='OperationID hide' val='" + item.OperationID + "'>" + item.OperationID + "</td>"
                    + "<td class='StatusID hide' val='" + item.StatusID + "'>" + item.StatusID + "</td>"
                    + "<td class='FromDepartmentID hide' val='" + item.FromDepartmentID + "'>" + item.FromDepartmentID + "</td>"
                    + "<td class='ToDepartmentID hide' val='" + item.ToDepartmentID + "'>" + item.ToDepartmentID + "</td>"
                    + "<td class='CreatorUserID hide' val='" + item.CreatorUserID + "'>" + item.CreatorUserID + "</td>"
                    + "<td class='ToUserID hide' val='" + item.ToUserID + "'>" + item.ToUserID + "</td>"
                     + "<td class='ToCompanyID hide' val='" + item.ToCompanyID + "'>" + item.ToCompanyID + "</td>"

                    + "<td class='hide'><a href='#InterServicesRequestsModal' data-toggle='modal' onclick='InterServicesRequests_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblInterServicesRequests", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblInterServicesRequests>tbody>tr", $("#txt-Search").val().trim());//sherif:new
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function InterServicesRequests_EditByDblClick(pID) {
    jQuery("#InterServicesRequestsModal").modal("show");
    InterServicesRequests_FillControls(pID);
}
// Loading with data
function InterServicesRequests_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/InterServicesRequests/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { InterServicesRequests_BindTableRows(pTabelRows); InterServicesRequests_ClearAllControls(); });
    HighlightText("#tblInterServicesRequests>tbody>tr", $("#txt-Search").val().trim());//sherif:new
}

// calling web function to add new InterServicesRequests item.
function InterServicesRequests_Insert(pSaveandAddNew) {
    debugger;
   
    InsertUpdateFunction("form", "/api/InterServicesRequests/Insert", GetDataToSave('insert'), pSaveandAddNew, "InterServicesRequestsModal", function () { if (_IsOpenedFromOperation) { InterCompanyService_SubmenuTabClicked(); } else { InterServicesRequests_LoadingWithPaging(); } });
}

//calling this function for update
function InterServicesRequests_Update(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/InterServicesRequests/Update", GetDataToSave('update'), pSaveandAddNew, "InterServicesRequestsModal", function () { if (_IsOpenedFromOperation) { InterCompanyService_SubmenuTabClicked(); } else { InterServicesRequests_LoadingWithPaging(); } });
}
function GetDataToSave(mode)
{
    debugger;
    var obj = {
        pChargeTypeID: $('#slChargeTypeID option:selected').val(),
        pStatusID: $("#slStatusID option:selected").val(),
        pToDepartmentID: $("#slToDepartmentID option:selected").val(),
        pToUserID: $("#slToUserID option:selected").val(),
        pCost: Number($("#txtCost").val()),
        pSalePrice: Number($("#txtSalePrice").val()),
        pNotes: $("#txtNotes").val()
    };
    if(mode == 'update')
    {
        obj["pID"] = $("#hID").val();
        var AWBSuffix = "";
        //if ($("#cbIsAWB").prop("checked")) {
        //    AWBSuffix = "AWB";
        //}
        var masterOperationId = _IsOpenedFromOperation? $("#hOperationID" + AWBSuffix).val():0;
        obj["pMasterOperationId"] = masterOperationId;
    }
    if (mode == 'insert')
    {
        obj["pOperationId"] = $('#slOperationID option:selected').val();
    }
    return obj;
}
function InterServicesRequests_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblInterServicesRequests') != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
        //callback function in case of confirm delete
        function () {
            DeleteListFunction("/api/InterServicesRequests/Delete", { "pInterServicesRequestsIDs": GetAllSelectedIDsAsString('tblInterServicesRequests') }, function () { if (_IsOpenedFromOperation) { InterCompanyService_SubmenuTabClicked(); } else { InterServicesRequests_LoadingWithPaging(); } });
        });
}

//after pressing edit, this function fills the data
function InterServicesRequests_FillControls(pID) {
    //InterServicesRequests_ClearAllControls(function () {
        //next line is to check if row is locked by another user
        //Check("/api/InterServicesRequests/CheckRow", { 'pID': pID }, function () {
            // Fill All Modal Controls
            var tr = $("tr[ID='" + pID + "']");

            $("#hID").val(pID);
            
            debugger;
            var pChargeTypeID = $(tr).find("td.ChargeTypeID").attr('val');
            var pOperationID = $(tr).find("td.OperationID").attr('val');
            var pToDepartmentID = $(tr).find("td.ToDepartmentID").attr('val');
            //var pToUserID = $(tr).find("td.ToUserID").attr('val');
            var pStatusID = $(tr).find("td.StatusID").attr('val');

            GetList_ChargeTypes(pChargeTypeID, null);

            GetList_Operations(pOperationID, null);
            GetList_Departments(pToDepartmentID, AfterLoadDepartments);
            //GetList_Users(pToUserID, null);
            GetList_Status(pStatusID, null);

            var pFromDepartmentID = $(tr).find("td.FromDepartmentID").attr('val');
            var pCreatorUserID = $(tr).find("td.CreatorUserID").attr('val');
            GetList_DepartmentsCreator(pFromDepartmentID, AfterLoadDepartmentsCreator);
            //GetList_UsersCreator(pCreatorUserID, null);

            $("#lblShown").html(": " + $(tr).find("td.ID").text());
            $("#txtCost").val($(tr).find("td.Cost").attr("val"));
            $("#txtSalePrice").val($(tr).find("td.SalePrice").text());
            $("#txtNotes").val($(tr).find("td.Notes").text());
           
         
            $("#btnSaveInterServicesRequest").attr("onclick", "InterServicesRequests_Update(false);");
            $("#btnSaveandNewInterServicesRequest").attr("onclick", "InterServicesRequests_Update(true);");
            debugger;
            if (pLoggedUser.ID == pCreatorUserID)
            {
                $('.Receiver-Show').addClass('hide');
                $('.Creator-Show').removeClass('hide');
                $('#txtCost').attr('data-required', false);
                $('#txtSalePrice').attr('data-required', true);
            }
            else
            {
                $('.Receiver-Show').removeClass('hide');
                $('.Creator-Show').addClass('hide');
                $('#txtCost,#txtSalePrice').attr('data-required', true);
            }
    //});
}

function InterServicesRequests_ClearAllControls(callback) {
    ClearAll("#InterServicesRequestsModal");
    debugger;
    GetList_ChargeTypes(null, null);
    GetList_Operations( (_IsOpenedFromOperation? $('#hOperationID').val():null), null);
    GetList_Departments(null, null);
    GetList_Users(null, null);
    GetList_Status(10, null);
    GetList_DepartmentsCreator(null, null);
    GetList_UsersCreator(null, null);
    $("#btnSaveInterServicesRequest").attr("onclick", "InterServicesRequests_Insert(false);");
    $("#btnSaveandNewInterServicesRequest").attr("onclick", "InterServicesRequests_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
}


// EOF InterServicesRequests Region ---------------------------------------------------------------

//to fill the select boxes
function GetList_ChargeTypes(pID, callback) {
    GetListWithNameAndWhereClause(pID, "/api/InterServicesRequests/LoadChargeTypes", "--select charge type--", "slChargeTypeID", " where 1=1 ", callback);
}
function GetList_Operations(pID, callback) {
    //$('#slOperationID').html('<option value="'+pID+'">'+pID+'</option>');
    if (pID == null || pID == undefined)
        pID = 0;
    GetListWithNameAndWhereClause(pID, "/api/InterServicesRequests/LoadAllOperations", "--select Operation--", "slOperationID", " where ID="+pID+" or MasterOperationID="+pID+" ", callback);
}
function GetList_Departments(pID, callback) {
    debugger;
    GetListWithNameAndWhereClause(pID, "/api/NoAccessDepartments/LoadAll", "--select Department--", "slToDepartmentID", " where 1=1 ", callback);
    
}
function GetList_Users(pID, callback) {
    GetListWithNameAndWhereClause(pID, "/api/Users/LoadAll", "--select user--", "slToUserID", " where DepartmentID=" + $('#slToDepartmentID').val() + " ", callback);
}
function GetList_Status(pID, callback) {
    GetListWithNameAndWhereClause(pID, "/api/SystemDropdownOptions/LoadAll", "--select status--", "slStatusID", " where GroupName='InterServicesRequestStatus' ", callback);
}

function AfterLoadDepartments()
{
    var tr = $("tr[ID='" +  $("#hID").val() + "']");
    var pToUserID = $(tr).find("td.ToUserID").attr('val');
    GetList_Users(pToUserID, null);
}

//readonly
function GetList_DepartmentsCreator(pID, callback) {
    GetListWithNameAndWhereClause(pID, "/api/NoAccessDepartments/LoadAll", "--select Department--", "slFromDepartmentID", " where 1=1 ", callback);

}
function GetList_UsersCreator(pID, callback) {
    GetListWithNameAndWhereClause(pID, "/api/Users/LoadAll", "--select user--", "slCreatorUserID", " where DepartmentID=" + $('#slFromDepartmentID').val() + " ", callback);
}
function AfterLoadDepartmentsCreator() {
    var tr = $("tr[ID='" + $("#hID").val() + "']");
    var pCreatorUserID = $(tr).find("td.CreatorUserID").attr('val');
    GetList_UsersCreator(pCreatorUserID, null);
}

//related to operation
function InterCompanyService_SubmenuTabClicked() {
    _IsOpenedFromOperation = true;
    LoadAll("/api/InterServicesRequests/LoadAll", "WHERE OperationID=" + $("#hOperationID").val() + " OR MasterOperationID= " + $("#hOperationID").val(), function (pTabelRows) { InterServicesRequests_BindTableRows(JSON.parse(pTabelRows)); InterServicesRequests_ClearAllControls(); });
}

