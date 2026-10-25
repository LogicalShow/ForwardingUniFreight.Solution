function RS_Projects_BindTableRows(pRS_Projects) {
    $("#hl-menu-MasterData").parent().addClass("active"); 
    ClearAllTableRows("tblRS_Projects");
    var UnitsControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Units") + "</span>";
    $.each(pRS_Projects, function (i, item) {
        AppendRowtoTable("tblRS_Projects",
        ("<tr ID='" + item.ID + "' ondblclick='RS_Projects_EditByDblClick(" + item.ID + ");'>"
            + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='Code'>" + (item.Code == 0 ? "" : item.Code) + "</td>"
            + "<td class='Name'>" + (item.Name == 0 ? "" : item.Name) + "</td>"
            + "<td class='Address'>" + (item.Address == 0 ? "" : item.Address) + "</td>"
            + "<td class='AccountID hide'>" + (item.AccountID == "" ? 0 : item.AccountID) + "</td>"
            + "<td class='CostCenter_ID hide'>" + (item.CostCenter_ID == "" ? 0 : item.CostCenter_ID) + "</td>"
            + "<td class='NoAccessID hide'>" + (item.NoAccessID == "" ? 0 : item.NoAccessID) + "</td>"
            + "<td class='NoAccessName'>" + (item.NoAccessName == "" ? 0 : item.NoAccessName) + "</td>"
            + "<td class='Floors'>" + (item.Floors == 0 ? "" : item.Floors) + "</td>"
            + "<td class='Units'><a href='#UnitsModal' data-toggle='modal' onclick='RS_Projects_FillControls(" + item.ID + ");' " + UnitsControlsText + "</a></td>"

            + "<td class='hide'><a href='#RS_ProjectsModal' data-toggle='modal' onclick='RS_Projects_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblRS_Projects", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblRS_Projects>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function RS_Projects_EditByDblClick(pID) {
    jQuery("#RS_ProjectsModal").modal("show");
    RS_Projects_FillControls(pID);
}
function RS_Projects_GetWhereClause() {
    var pWhereClause = "WHERE 1=1";
    if ($("#txt-Search").val().trim() != "") {
        pWhereClause += " AND (" + "\n";
        pWhereClause += " Code LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += " OR Name LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        //pWhereClause += " OR LocalName LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += ")";
    }
    return pWhereClause;
}
function RS_Projects_LoadingWithPaging() {
    debugger;
    var pWhereClause = RS_Projects_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "Code";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { RS_Projects_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblRS_Projects>tbody>tr", $("#txt-Search").val().trim());
}

function RS_Units_LoadingWithPaging() {
    debugger;
    var pWhereClause = "WHERE 1=1";
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "Code";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { RS_Units_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblDetails>tbody>tr", $("#txt-Search").val().trim());
}

function RS_Projects_Insert(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/RS_Projects/Insert", {
        pCode: $("#txtCode").val().trim() == "" ? "0" : $("#txtCode").val().trim().toUpperCase(),
        pName: $("#txtName").val().trim() == "" ? "0" : $("#txtName").val().trim().toUpperCase(),
        pAddress: $("#txtAddress").val().trim() == "" ? "0" : $("#txtAddress").val().trim().toUpperCase()
        , pAccount_ID: $("#slAccount").val() == "" ? 0 : $("#slAccount").val()
        , pCostCenter_ID: $("#slCostCenter").val() == "" ? 0 : $("#slCostCenter").val()
        , pProjectType: $("#slProjectType").val() == "" ? 0 : $("#slProjectType").val()
        , pFloors: $("#txtFloors").val().trim() == "" ? "0" : $("#txtFloors").val().trim().toUpperCase()
                
    }, pSaveandAddNew, "RS_ProjectsModal", function () {
        RS_Projects_LoadingWithPaging();
        if (pSaveandAddNew)
            RS_Projects_ClearAllControls();
    });
}
// calling this function for update
function RS_Projects_Update(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/RS_Projects/Update", {
        pID: $("#hID").val(),
        pCode: $("#txtCode").val().trim() == "" ? "0" : $("#txtCode").val().trim().toUpperCase(),
        pName: $("#txtName").val().trim() == "" ? "0" : $("#txtName").val().trim().toUpperCase(),
        pAddress: $("#txtAddress").val().trim() == "" ? "0" : $("#txtAddress").val().trim().toUpperCase()
        , pAccount_ID: $("#slAccount").val() == "" ? 0 : $("#slAccount").val()
        , pCostCenter_ID: $("#slCostCenter").val() == "" ? 0 : $("#slCostCenter").val()
        , pProjectType: $("#slProjectType").val() == "" ? 0 : $("#slProjectType").val()
        , pFloors: $("#txtFloors").val().trim() == "" ? "0" : $("#txtFloors").val().trim().toUpperCase()

    }, pSaveandAddNew, "RS_ProjectsModal", function () {
        RS_Projects_LoadingWithPaging();
        if (pSaveandAddNew)
            RS_Projects_ClearAllControls();
    });
}
function RS_Projects_Delete(pID) {
    DeleteListFunction("/api/RS_Projects/DeleteByID", { "pID": pID }, function () { RS_Projects_LoadingWithPaging(); });
}
function RS_Projects_DeleteList() {
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblRS_Projects') != "")
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
            DeleteListFunction("/api/RS_Projects/Delete", { "pIDs": GetAllSelectedIDsAsString('tblRS_Projects') }, function () { RS_Projects_LoadingWithPaging(); });
        });
}
//after pressing edit, this function fills the data
function RS_Projects_FillControls(pID) {
    debugger;
    ClearAll("#RS_ProjectsModal", null);
    ClearAll("#UnitsModal", null);
    //ClearAll("#FloorsModal", null);
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    $("#lblShown").html(" : " + $(tr).find("td.Name").text());
    $("#txtCode").val($(tr).find("td.Code").text());
    $("#txtName").val($(tr).find("td.Name").text());
    $("#txtAddress").val($(tr).find("td.Address").text());
    $("#slAccount").val($(tr).find("td.AccountID").text());
    $("#slCostCenter").val($(tr).find("td.CostCenter_ID").text());
    $("#slProjectType").val($(tr).find("td.NoAccessID").text());
    $("#txtFloors").val($(tr).find("td.Floors").text());

    /////FillUnits
    $("#txtUnitCode").val($(tr).find("td.Code").text());
    $("#txtUnitName").val($(tr).find("td.Name").text());

    ///////FillFloors
    //$("#txtUnitCode").val($(tr).find("td.Code").text());
    //$("#txtUnitName").val($(tr).find("td.Name").text());

    $("#btnSave").attr("onclick", "RS_Projects_Update(false);");
    $("#btnSaveandNew").attr("onclick", "RS_Projects_Update(true);");

    //$("#btnSave").attr("onclick", "RS_ProjectsUnit_Update(false);");
    //$("#btnSaveandNew").attr("onclick", "RS_ProjectsUnit_Update(true);");

    //$("#btnSave").attr("onclick", "RS_ProjectsUnit_Update(false);");
    //$("#btnSaveandNew").attr("onclick", "RS_ProjectsUnit_Update(true);");

    setTimeout(function () {
        LoadInvoiceDetails();
    }, 300);
}
function LoadInvoiceDetails() {
    debugger;
    LoadAll("/api/RS_Projects/LoadDetails", "where ProjectID = " + $('#hID').val(), function (pTabelRows) {
        RS_Units_BindTableRows(pTabelRows[0]);
        //SL_InvoicesExpenses_BindTableRows(pTabelRows[1]);
        //SL_InvoicesTaxes_BindTableRows(pTabelRows[2]);
        //SL_InvoicesWasataDetails_BindTableRows(pTabelRows[3]);


        //    setTimeout(function () {
        //        //CalculateAll();
        //        SL_HideShowEditBtns(_IsApproved, _HasTransactions);
        //}, 300);

    });
}
var UnitID = 0;
function RS_Floors_FillControls(pUnitID) {
    debugger;
    //ClearAll("#RS_ProjectsModal", null);
    //ClearAll("#UnitsModal", null);
    ClearAll("#FloorsModal", null);
    var tr = $("tr[DID='" + pUnitID + "']");

    $("#hDID").val(pUnitID);
    UnitID = pUnitID;
    //$("#lblShown").html(" : " + $(tr).find("td.Name").text());
    //$("#txtCode").val($(tr).find("td.Code").text());
    //$("#txtName").val($(tr).find("td.Name").text());
    //$("#txtAddress").val($(tr).find("td.Address").text());
    //$("#slAccount").val($(tr).find("td.AccountID").text());
    //$("#slCostCenter").val($(tr).find("td.CostCenter_ID").text());
    //$("#slProjectType").val($(tr).find("td.NoAccessID").text());

    /////FillFloors
    $("#txtFloorCode").val($(tr).find('td.UnitCode ').find('.input_UnitCode').attr('tag'));
    $("#txtFloorName").val($(tr).find('td.UnitName ').find('.input_UnitName').attr('tag'));


    //$("#btnSave").attr("onclick", "RS_Projects_Update(false);");
    //$("#btnSaveandNew").attr("onclick", "RS_Projects_Update(true);");

    //$("#btnSave").attr("onclick", "RS_ProjectsUnit_Update(false);");
    //$("#btnSaveandNew").attr("onclick", "RS_ProjectsUnit_Update(true);");

    //$("#btnSave").attr("onclick", "RS_ProjectsUnit_Update(false);");
    //$("#btnSaveandNew").attr("onclick", "RS_ProjectsUnit_Update(true);");

    setTimeout(function () {
        LoadFloors(pUnitID);
    }, 300);
}
function LoadFloors(ID) {
    debugger;
    LoadAll("/api/RS_Projects/LoadFloors", "where UnitID = " + ID, function (pTabelRows) {
        RS_Floors_BindTableRows(pTabelRows[0]);
        //SL_InvoicesExpenses_BindTableRows(pTabelRows[1]);
        //SL_InvoicesTaxes_BindTableRows(pTabelRows[2]);
        //SL_InvoicesWasataDetails_BindTableRows(pTabelRows[3]);


        //    setTimeout(function () {
        //        //CalculateAll();
        //        SL_HideShowEditBtns(_IsApproved, _HasTransactions);
        //}, 300);

    });
}


function RS_Projects_ClearAllControls() {
    ClearAll("#RS_ProjectsModal", null);
    ClearAll("#UnitsModal", null);
    ClearAll("#FloorsModal", null);
    $("#btnSave").attr("onclick", "RS_Projects_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "RS_Projects_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
}

//function Details_NewRow() {
//    debugger;
//    var maxDetailsIDInTable = 0;
//    ++maxDetailsIDInTable;
//    var copyControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'></span>";
//    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
//    var dateValidTo = Date.prototype.addDays(ConvertDateFormat(FormattedTodaysDate), 30);
//    var tr = "";
//    tr += "<tr ID='" + maxDetailsIDInTable + "'>";
//    tr += "     <td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + maxDetailsIDInTable + "' checked='checked' /></td>";
//    tr += "     <td class='DetailsID col-sm-2'><input " + (1 == 2 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + maxDetailsIDInTable + "' /></td>";

//    tr += "     <td class='UnitCode col-sm-5' style=''><input type='text' style='font-size:90%;text-transform:uppercase;' id='txtUnitCode" + maxDetailsIDInTable + "' class='form-control controlStyle'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false' value='" + ($("#txtUnitCode" + (maxDetailsIDInTable - 1)).val() == undefined ? "" : $("#txtDescription" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";
//    tr += "     <td class='UnitName col-sm-5' style=''><input type='text' style='font-size:90%;text-transform:uppercase;' id='txtUnitName" + maxDetailsIDInTable + "' class='form-control controlStyle'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false' value='" + ($("#txtUnitName" + (maxDetailsIDInTable - 1)).val() == undefined ? "" : $("#txtDescription" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";

//    tr += "</tr>";
//    $("#tblDetails tbody").prepend(tr);
//    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
//        $("#tblDetails tbody tr[ID=" + maxDetailsIDInTable + "]").reverseChildren();


//    //SetDatepickerFormat();
//    BindAllCheckboxonTable("tblDetails", "DetailsID", "cbDetailsDeleteHeader");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
//    /***********************EOF Filling row controls******************************/
//}

var ItemsRowsCounter = 0;

function Details_NewRow() {
    var maxDetailsIDInTable = 0;
    Num = $("#txtUnitsNO").val() == "" ? 1 : $("#txtUnitsNO").val();
    for (var maxDetailsIDInTable = 0; maxDetailsIDInTable < Num; maxDetailsIDInTable++) {
        //var maxDetailsIDInTable = 0;
        //++maxDetailsIDInTable;
        //var FloorsControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Floors") + "</span>";

        debugger;
        AppendRowtoTable("tblDetails",
            ("<tr tag='service' isdeleted='0'  counter='" + (ItemsRowsCounter + 1) + "' value='" + 0 + "'>"
             //   + "<td class='DetailsID col-sm-2'><input " + (1 == 2 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + maxDetailsIDInTable + "' /></td>"

                + "<td class='DetailsID hide'> <input name='Delete' type='checkbox' value='" + "0" + "' /></td>"
                + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td class='UnitCode' val='" + "0" + "'>" + "<input   type='text' class='input_UnitCode input-sm  col-sm' value = '" + (maxDetailsIDInTable + 1) + "'>" + "</td>"
                //+ "<td class='ClientName' val='" + "0" + "'>" + "<input type='text' class='input_ClientName input-sm  col-sm'>" + "</td>"
              //  + "<td class='ClientID' val='" + "0" + "'>" + "<select id='hidden_slClient" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectClient'>" + $('#hidden_slClient').html() + "</select>" + "</td>"
                // + "<td class='ServiceID' val='" + "0" + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "'onchange='GetRatio(this)' class='input-sm  col-sm selectClient'>" + $('#hidden_slServices').html() + "</select>" + "</td>"
                 + "<td class='ClientID' val='" + "0" + "'>" + "<select id='Clients-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectClient'>" + $('#hidden_slClient').html() + "</select>" + "</td>"

              //  + "<td class='ClientID' style='width:20%;' val=''><select id='slClient" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle selectClientID' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  data-required='true'>" + "<option value=0></option>" + "</select></td>" //onchange='Details_SetIsRowChanged(id); Details_AccountChanged(" + maxDetailsIDInTable + ");'
                + "<td class='Price' val='" + "0" + "'>" + "<input type='text' class='input_Price input-sm  col-sm'>" + "</td>"
                + "<td class='FloorNo' val='" + "0" + "'>" + "<input type='text' class='input_FloorNo input-sm  col-sm'>" + "</td>"
                + "<td class='Size' val='" + "0" + "'>" + "<input type='text' class='input_Size input-sm  col-sm'>" + "</td>"
                //+ "<td class='Floors'><a href='#FloorsModal' data-toggle='modal' onclick= " + UnitsControlsText + "</a></td>"
                //+ "<td class='Floors'><a href='#FloorsModal'  data-toggle='modal' class='btn btn-xs btn-rounded btn-lightblue float-rights' onclick='RS_Floors_FillControls(" + FloorsControlsText + " </a></td>"

                + "</tr>"));


        ItemsRowsCounter++;
    }
}
var Num = 0;
function Floors_NewRow() {
    debugger;
    var maxDetailsIDInTable = 0;
    Num = $("#txtFloorNo").val() == "" ? 1 : $("#txtFloorNo").val();
    //var tr = $("tr[maxDetailsIDInTable='" + Num == "" ? 1 : Num == 0 ? 1 : Num+ "']");
    for (var maxDetailsIDInTable = 0; maxDetailsIDInTable < Num; maxDetailsIDInTable++) {
        //++maxDetailsIDInTable;
        debugger;
        AppendRowtoTable("tblFloors",
            ("<tr tag='service' isdeleted='0'  counter='" + (ItemsRowsCounter + 1) + "' value='" + 0 + "'>"
             //   + "<td class='DetailsID col-sm-2'><input " + (1 == 2 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + maxDetailsIDInTable + "' /></td>"

                + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + "0" + "' /></td>"
                + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button id='btn-DeleteFloors" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteFloors(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td class='Code' val='" + "0" + "'>" + "<input   type='text' class='input_Code input-sm  col-sm' value = '"+ (maxDetailsIDInTable + 1) +"'s>" + "</td>"
                + "<td class='ClientCode' val='" + "0" + "'>" + "<input type='text' class='input_ClientCode input-sm  col-sm'>" + "</td>"
                + "<td class='ClientName' val='" + "0" + "'>" + "<input type='text' class='input_ClientName input-sm  col-sm'>" + "</td>"
                + "</tr>"));


        ItemsRowsCounter++;
    }
}
function Details_DeleteList() {
    debugger;
    var pSelectedIDs = GetAllSelectedIDsAsString('tblDetails', 'Delete');
    if (pSelectedIDs != "") {
        for (var i = 0; i < pSelectedIDs.split(",").length; i++)
            $("#tblDetails tbody tr[ID=" + pSelectedIDs.split(",")[i] + "]").remove();
        Details_CalculateTotals();
    }
}

function Floors_DeleteList() {
    debugger;
    var pSelectedIDs = GetAllSelectedIDsAsString('tblFloors', 'Delete');
    if (pSelectedIDs != "") {
        for (var i = 0; i < pSelectedIDs.split(",").length; i++)
            $("#tblFloors tbody tr[ID=" + pSelectedIDs.split(",")[i] + "]").remove();
        Details_CalculateTotals();
    }
}
//function Units_Save(pSaveAndAddNew) {
//    debugger;
//    if (ValidateForm("form", "UnitsModal"))
//        if (Details_Validate()) {
//            FadePageCover(true);
//            CallGETFunctionWithParameters("/api/RS_Projects/InsertUnits"
//                , {
//                    pUnitID: ($("#hID").val() == "" ? 0 : $("#hID").val())
//                    , pUnitCode: ConvertDateFormat($("#txtFromDate").val())
//                    , pUnitName: ConvertDateFormat($("#txtToDate").val())
//                    , pProjectID: ($("#txtExchangeRate").val() == "" ? 0 : $("#txtExchangeRate").val())
//                }
//                , function (pData) {
//                    if (pData[0]) {
//                        $("#hDetailsID").val(pData[1]);
//                        Details_BindTableRows(JSON.parse(pData[2]));
//                        if (pSaveAndAddNew) {
//                            Details_ClearAllControls();
//                        }
//                        else
//                            jQuery("#DetailsModal").modal("hide");
//                        swal("Success", "Saved successfully.");
//                        LoadDefaults("/api/Defaults/LoadAll", " WHERE ID = 1 ");
//                    }
//                    else
//                        swal("Sorry", "Connection failed, please try again.");
//                    FadePageCover(false);
//                }
//                , null);
//        }
//}
function Units_Save(pSaveandAddNew) {
    debugger;
    IsInsert = true;
    var _Suceess = true;

    if (_Suceess == true) {
        //setTimeout(function () {
        var ListOfListOfObject = [];
        debugger;
        ListOfListOfObject.push(SetArrayOfItems());
        InsertUpdateListOfObject("/api/RS_Projects/InsertUnits",
                    ListOfListOfObject
                    , pSaveandAddNew, "UnitsModal", function (message) {
                        debugger
                        $.ajax({
                            type: "GET",
                            url: "/api/RS_Projects/deleteAllSelectedDetailesIDs",
                            data: { pWhereClause: listOfIDs },
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (Result) { }
                        });
                        //PrintInvoice($('#hID').val());
                        setTimeout(function () {
                            RS_Projects_LoadingWithPaging();
                            //RS_Units_LoadingWithPaging();
                            listOfIDs = "";
                        }, 300);

                    });
    }
}

function Floors_Save(pSaveandAddNew) {
    debugger;
    IsInsert = true;
    var _Suceess = true;

    if (_Suceess == true) {
        //setTimeout(function () {
        var ListOfListOfObject = [];
        debugger;
        ListOfListOfObject.push(SetArrayOfFloors());
        InsertUpdateListOfObject("/api/RS_Projects/InsertFloors",
                    ListOfListOfObject
                    , pSaveandAddNew, "FloorsModal", function (message) {
                        debugger;
                        $.ajax({
                            type: "GET",
                            url: "/api/RS_Projects/deleteAllSelectedFloorsIDs",
                            data: { pWhereClause: listOfIDs },
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (Result) { }
                        });
                        //PrintInvoice($('#hID').val());
                        setTimeout(function () {
                            RS_Projects_LoadingWithPaging();
                            // IntializeData();
                            listOfIDs = "";
                        }, 300);

                    });
    }
}
function DeleteItems(RowNumber, ID) {
    debugger;
    if ($("#tblDetails > tbody > tr[counter='" + RowNumber + "']").attr("value") == "0") {
        $("#tblDetails > tbody > tr[counter='" + RowNumber + "']").remove();
        ItemsRowsCounter = ItemsRowsCounter - 1;
        //CalculateTotalExpenses();

    }
    else {
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
                $("#tblDetails > tbody > tr[counter='" + RowNumber + "']").remove();
                ItemsRowsCounter = ItemsRowsCounter - 1;
                GetAllSelectedIDs(ID);
                //CalculateTotalExpenses();
            });

    }

}
var listOfIDs = "";
function GetAllSelectedIDs(ID) {
    debugger;
    listOfIDs += ((listOfIDs == "") ? "" : ",") + (ID);
    return listOfIDs;
  //  CalculateFinalAmount();
}
function SetArrayOfItems() {
    debugger;
    var arrayOfItems = new Array();
    $("#tblDetails>tbody>tr").each(function (i, tr) {

        var objItem = new Object();
        objItem.ID = $(tr).attr('value');
        objItem.Code = $(tr).find('td.UnitCode').find('.input_UnitCode').val();
        //objItem.ClientName = $(tr).find('td.ClientName').find('.input_ClientName').val();
        objItem.ClientID = $(tr).find('td.ClientID').find('.selectClient').val();
        objItem.Price = $(tr).find('td.Price').find('.input_Price').val();
        objItem.FloorNo = $(tr).find('td.FloorNo').find('.input_FloorNo').val();
        objItem.Size = $(tr).find('td.Size').find('.input_Size').val();
        objItem.ProjectID = $("#hID").val();

        // objItem.ExpenseID = $(tr).find('td.ExpenseID ').find('.selectClient').attr('tag');$("#hID").val()
        //objItem.CurrencyID = $('#slCurrencyID').val();
        //objItem.DbtCrdtNoteID = $('#hID').val();
        //objItem.Notes = $(tr).find('td.Notes').find('.inputnotes').val();
        //objItem.Amount = $(tr).find('td.Amount').find('.input_quantity').val();
        arrayOfItems.push(objItem);
    });
    return arrayOfItems;
}
function SetArrayOfFloors() {
    debugger;
    var arrayOfItems = new Array();
    $("#tblFloors>tbody>tr").each(function (i, tr) {

        var objItem = new Object();
        objItem.ID = $(tr).attr('value');
        objItem.Code = $(tr).find('td.Code').find('.input_Code').val();
        objItem.ClientCode = $(tr).find('td.ClientCode').find('.input_ClientCode').val();
        objItem.ClientName = $(tr).find('td.ClientName').find('.input_ClientName').val();
        objItem.UnitID = UnitID;//$("#ID").val();

        // objItem.ExpenseID = $(tr).find('td.ExpenseID ').find('.selectClient').attr('tag');$("#hID").val()
        //objItem.CurrencyID = $('#slCurrencyID').val();
        //objItem.DbtCrdtNoteID = $('#hID').val();
        //objItem.Notes = $(tr).find('td.Notes').find('.inputnotes').val();
        //objItem.Amount = $(tr).find('td.Amount').find('.input_quantity').val();
        arrayOfItems.push(objItem);
    });
    return arrayOfItems;
}
function RS_Units_BindTableRows(pItems) {
    debugger;
    $("#hl-menu-SL").parent().addClass("active");
    ItemsRowsCounter = 0;
    ClearAllTableRows("tblDetails");
    //var UnitsControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Floors") + "</span>";
    $.each(JSON.parse(pItems), function (i, item) {

        debugger;
        AppendRowtoTable("tblDetails",
            //("<tr DID='" + item.ID + "' ondblclick='RS_Floors_FillControls(" + item.ID + ");'>"
           // + "<td class='DID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
           ("<tr tag='service' isdeleted='0' DID='" + item.ID + "'  counter='" + (ItemsRowsCounter + 1) + "' value='" + item.ID + "'  ondblclick='RS_Floors_FillControls(" + item.ID + ");'>"
            // ("<tr DID='" + item.ID + "' ondblclick='RS_Floors_FillControls(" + item.ID + ");'>"
                + "<td class='DetailID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"



                + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button id='btn-DeleteItems-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(" + (ItemsRowsCounter + 1) + "," + (item.ID) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td class='UnitCode' val='" + item.Code + "'>" + "<input tag='" + item.Code + "'   type='text' class='input_UnitCode input-sm  col-sm'>" + "</td>"
                //+ "<td class='ClientName' val='" + item.ClientName + "'>" + "<input tag='" + item.ClientName + "'   type='text' class='input_ClientName input-sm  col-sm'>" + "</td>"
                + "<td class='ClientID hide' val='" + item.ClientID + "'>" + item.ClientID + "</td>"
                //+ "<td class='ClientName' val='" + item.ClientName + "'>" + item.ClientName + "</td>"
                 + "<td class='ClientID' val='" + item.ClientID + "'>" + "<select id='Clients-" + (ItemsRowsCounter + 1) + "' tag='" + item.ClientID + "' class='input-sm  col-sm selectClient'>" + $('#hidden_slClient').html() + "</select>" + "</td>"

               + "<td class='Price' val='" + item.Price + "'>" + "<input tag='" + item.Price + "'   type='text' class='input_Price input-sm  col-sm'>" + "</td>"
                + "<td class='FloorNo' val='" + item.FloorNo + "'>" + "<input tag='" + item.FloorNo + "'   type='text' class='input_FloorNo input-sm  col-sm'>" + "</td>"
                + "<td class='Size' val='" + item.Size + "'>" + "<input tag='" + item.Size + "'   type='text' class='input_Size input-sm  col-sm'>" + "</td>"
               // + "<td class='Floors'><a href='#FloorsModal' data-toggle='modal' onclick='RS_Floors_FillControls(" + item.UnitID + ");' " + UnitsControlsText + "</a></td>"
                //+ "<td class='Floors'><a href='#FloorsModal' data-toggle='modal' onclick='RS_Floors_FillControls(" + item.ID + ");' " + UnitsControlsText + "</a></td>"
                + "</tr>"));

        ItemsRowsCounter++;
        //$("#tblDetails").find("select").attr('onchange', 'CalculateTotalExpenses();');
        //$("#tblDetails").find("input,button,textarea").attr('onblur', 'CalculateTotalExpenses();');

    });


    setTimeout(function () {
        FillItemsData();
        //  SL_HideShowEditBtns(_IsApproved);
    }, 300);

}
function RS_Floors_BindTableRows(pItems) {
    debugger;
    $("#hl-menu-SL").parent().addClass("active");
    ItemsRowsCounter = 0;
    ClearAllTableRows("tblFloors");
    //var FloorsControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Floors") + "</span>";
    $.each(JSON.parse(pItems), function (i, item) {

        debugger;
        AppendRowtoTable("tblFloors",
            //("<tr tag='service' isdeleted='0'  counter='" + (ItemsRowsCounter + 1) + "' value='" + item.ID + "'>"
            ("<tr tag='service' isdeleted='0' ID='" + item.UnitID + "'  counter='" + (ItemsRowsCounter + 1) + "' value='" + item.ID + "'>"
                + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button id='btn-DeleteFloors-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteFloors(" + (ItemsRowsCounter + 1) + "," + (item.ID) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td class='Code' val='" + item.Code + "'>" + "<input tag='" + item.Code + "'   type='text' class='input_Code input-sm  col-sm'>" + "</td>"
                + "<td class='ClientCode' val='" + item.ClientCode + "'>" + "<input tag='" + item.ClientCode + "'   type='text' class='input_ClientCode input-sm  col-sm'>" + "</td>"
                + "<td class='ClientName' val='" + item.ClientName + "'>" + "<input tag='" + item.ClientName + "'   type='text' class='input_ClientName input-sm  col-sm'>" + "</td>"
                //+ "<td class='Units'><a href='#FloorsModal' data-toggle='modal' onclick='RS_Projects_FillControls(" + item.DetailID + ");' " + UnitsControlsText + "</a></td>"
                + "</tr>"));

        ItemsRowsCounter++;
        //$("#tblDetails").find("select").attr('onchange', 'CalculateTotalExpenses();');
        //$("#tblDetails").find("input,button,textarea").attr('onblur', 'CalculateTotalExpenses();');

    });


    setTimeout(function () {
        FillFloorsData();
        //  SL_HideShowEditBtns(_IsApproved);
    }, 300);

}

function FillFloorsData() {
    $($('#tblFloors > tbody > tr')).each(function (i, tr) {
        $(tr).find('td.ID ').find('.selectitem').val($(tr).find('td.ID ').find('.selectitem').attr('tag'));
        $(tr).find('td.Code ').find('.input_Code').val($(tr).find('td.Code ').find('.input_Code').attr('tag'));
        $(tr).find('td.ClientCode ').find('.input_ClientCode').val($(tr).find('td.ClientCode ').find('.input_ClientCode').attr('tag'));
        $(tr).find('td.ClientName ').find('.input_ClientName').val($(tr).find('td.ClientName ').find('.input_ClientName').attr('tag'));
    });
    //setTimeout(function () {
    //    CalculateAll();
    //}, 30);
}

function FillItemsData() {
    $($('#tblDetails > tbody > tr')).each(function (i, tr) {
        $(tr).find('td.DetailID ').find('.selectitem').val($(tr).find('td.DetailID ').find('.selectitem').attr('tag'));
        $(tr).find('td.UnitCode ').find('.input_UnitCode').val($(tr).find('td.UnitCode ').find('.input_UnitCode').attr('tag'));
        //$(tr).find('td.ClientName ').find('.input_ClientName').val($(tr).find('td.ClientName ').find('.input_ClientName').attr('tag'));
        $(tr).find('td.ClientID ').find('.selectClient').val($(tr).find('td.ClientID ').find('.selectClient').attr('tag'));
        $(tr).find('td.Price ').find('.input_Price').val($(tr).find('td.Price ').find('.input_Price').attr('tag'));
        $(tr).find('td.FloorNo ').find('.input_FloorNo').val($(tr).find('td.FloorNo ').find('.input_FloorNo').attr('tag'));
        $(tr).find('td.Size ').find('.input_Size').val($(tr).find('td.Size ').find('.input_Size').attr('tag'));
    });
    //setTimeout(function () {
    //    CalculateAll();
    //}, 30);
}
//function LoadFloors() {
//    debugger;
//    LoadAll("/api/RS_Projects/LoadFloors", "where UnitID = " + $('#DID').val(), function (pTabelRows) {
//        RS_Floors_BindTableRows(pTabelRows[0]);

//    });
//}
function DeleteFloors(RowNumber, ID) {
    debugger;
    if ($("#tblFloors > tbody > tr[counter='" + RowNumber + "']").attr("value") == "0") {
        $("#tblFloors > tbody > tr[counter='" + RowNumber + "']").remove();
        ItemsRowsCounter = ItemsRowsCounter - 1;
        //CalculateTotalExpenses();

    }
    else {
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
                $("#tblFloors > tbody > tr[counter='" + RowNumber + "']").remove();
                ItemsRowsCounter = ItemsRowsCounter - 1;
                GetAllSelectedIDs(ID);
                //CalculateTotalExpenses();
            });

    }

}