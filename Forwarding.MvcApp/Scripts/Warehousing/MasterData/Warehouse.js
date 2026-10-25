function ApplySelectListSearch() {
    debugger;
    $("#slMainWarehouse").css({ "width": "100%" }).select2();
    $("#slMainWarehouse").trigger("change");
    $("#slWarehouseType").css({ "width": "100%" }).select2();
    $("#slWarehouseType").trigger("change");
    
    $("div[tabindex='-1']").removeAttr('tabindex');
}
function ApplySelectListSearch_OnlyChange() {
    $("#slMainWarehouse").css({ "width": "100%" }).select2();
    $("#slWarehouseType").css({ "width": "100%" }).select2();
}
function Warehouse_Initialize() {
    debugger;
    $("#hl-menu-Warehousing").parent().siblings().removeClass("active");
    strBindTableRowsFunctionName = "Warehouse_BindTableRows";
    strLoadWithPagingFunctionName = "/api/Warehouse/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = " WHERE 1=1";
    var pOrderBy = "Name";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/Warehousing/MasterData/Warehouse", "div-content", function () {
        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
            , function (pData) {
                var pMainWarehouse = pData[2];
                Warehouse_BindTableRows(JSON.parse(pData[0]));
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slMainWarehouse", pMainWarehouse, null);
                ApplySelectListSearch();
            });
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
    , function () { Warehouse_ClearAllControls(); }
    , function () { Warehouse_DeleteList(); });
}
function Warehouse_BindTableRows(pWarehouse) {
    debugger;
    $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblWarehouse");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pWarehouse, function (i, item) {
        AppendRowtoTable("tblWarehouse",
        ("<tr ID='" + item.ID + "' ondblclick='Warehouse_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code'>" + (item.Code == 0 ? "" : item.Code) + "</td>"
                    + "<td class='Name'>" + (item.Name == 0 ? "" : item.Name) + "</td>"
                    + "<td class='Phone'>" + (item.Phone == 0 ? "" : item.Phone) + "</td>"
                    + "<td class='Fax hide'>" + (item.PhoneFax == 0 ? "" : item.Fax) + "</td>"
                    + "<td class='Address hide'>" + (item.Address == 0 ? "" : item.Address) + "</td>"
                    + "<td class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                    + "<td class='MainWarehouseID hide'>" + (item.MainWarehouseID == 0 ? "" : item.MainWarehouseID) + "</td>"
                    + "<td class='WarehouseType hide'>" + (item.WarehouseType == 0 ? "" : item.WarehouseType) + "</td>"
                    + "<td class='MainWarehouseName'>" + (item.MainWarehouseName == 0 ? "" : item.MainWarehouseName) + "</td>"
                    + "<td class='WarehouseTypeName'>" + (item.WarehouseTypeName == 0 ? "" : item.WarehouseTypeName) + "</td>"
                    + "<td class='IsAir hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsAir == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsActuallyUsed hide'>" + item.IsActuallyUsed + "</td>"
                    + "<td class='hide'><a href='#WarehouseModal' data-toggle='modal' onclick='Warehouse_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblWarehouse", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblWarehouse>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function Warehouse_LoadingWithPaging() {
    debugger;
    var pWhereClause = Warehouse_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "Name";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { Warehouse_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblWarehouse>tbody>tr", $("#txt-Search").val().trim());
}
function Warehouse_GetWhereClause() {
    return ($("#txt-Search").val().trim() == "" ? "WHERE 1=1" : ("WHERE Code LIKE N'%" + $("#txt-Search").val().trim() + "%' OR Name LIKE N'%" + $("#txt-Search").val().trim() + "%'"));
}
function Warehouse_EditByDblClick(pID) {
    jQuery("#WarehouseModal").modal("show");
    Warehouse_FillControls(pID);
}
function Warehouse_ClearAllControls(callback) {
    ClearAll("#WarehouseModal");

    FillWarehouseTypes();

    $("#slMainWarehouse").prop("disabled", false);
    $("#slWarehouseType").prop("disabled", false);

    $("#btnSave").attr("onclick", "Warehouse_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "Warehouse_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
    ApplySelectListSearch_OnlyChange();
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
}
function Warehouse_FillControls(pID) {
    debugger;
    ClearAll("#WarehouseModal", null);
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    $("#lblShown").html("<span> : </span><span>" + $(tr).find("td.Name").text() + "</span>");
    $("#txtCode").val($(tr).find("td.Code").text());
    $("#txtName").val($(tr).find("td.Name").text());
    $("#txtPhone").val($(tr).find("td.Phone").text());
    $("#txtFax").val($(tr).find("td.Fax").text());
    $("#txtAddress").val($(tr).find("td.Address").text());
    $("#txtNotes").val($(tr).find("td.Notes").text());
    $("#slMainWarehouse").val($(tr).find("td.MainWarehouseID").text());
    $("#slWarehouseType").val($(tr).find("td.WarehouseType").text());
    $("#cbIsAir").prop('checked', $(tr).find('td.IsAir').find('input').attr('val'));

    if ($(tr).find("td.IsActuallyUsed").text() == "true") {
        $("#slMainWarehouse").prop("disabled", true);
        $("#slWarehouseType").prop("disabled", true);
    }
    else
    {
        $("#slMainWarehouse").prop("disabled", false);
        $("#slWarehouseType").prop("disabled", false);
    }

    $("#btnSave").attr("onclick", "Warehouse_Update(false);");
    $("#btnSaveandNew").attr("onclick", "Warehouse_Update(true);");
    ApplySelectListSearch_OnlyChange();
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $("#lblShown").reverseChildren();
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
}
function Warehouse_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/Warehouse/Insert"
        , {
            pCode: $("#txtCode").val().trim() == "" ? 0 : $("#txtCode").val().trim().toUpperCase()
            , pName: $("#txtName").val().trim() == "" ? 0 : $("#txtName").val().trim().toUpperCase()
            , pPhone: $("#txtPhone").val().trim() == "" ? 0 : $("#txtPhone").val().trim().toUpperCase()
            , pFax: $("#txtFax").val().trim() == "" ? 0 : $("#txtFax").val().trim().toUpperCase()
            , pAddress: $("#txtAddress").val().trim() == "" ? 0 : $("#txtAddress").val().trim().toUpperCase()
            , pNotes: $("#txtNotes").val().trim() == "" ? 0 : $("#txtNotes").val().trim().toUpperCase()
            , pMainWarehouseID: $("#slMainWarehouse").val() == "" ? 0 : $("#slMainWarehouse").val()
            , pWarehouseType: $("#slWarehouseType").val() == "" ? 0 : $("#slWarehouseType").val()
            , pIsAir: $("#cbIsAir").prop('checked')
        }, pSaveandAddNew, "WarehouseModal", function () { Warehouse_LoadingWithPaging(); Warehouse_ClearAllControls(); });
}
function Warehouse_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/Warehouse/Update"
        , {
            pID: $("#hID").val()
            , pCode: $("#txtCode").val().trim() == "" ? 0 : $("#txtCode").val().trim().toUpperCase()
            , pName: $("#txtName").val().trim() == "" ? 0 : $("#txtName").val().trim().toUpperCase()
            , pPhone: $("#txtPhone").val().trim() == "" ? 0 : $("#txtPhone").val().trim().toUpperCase()
            , pFax: $("#txtFax").val().trim() == "" ? 0 : $("#txtFax").val().trim().toUpperCase()
            , pAddress: $("#txtAddress").val().trim() == "" ? 0 : $("#txtAddress").val().trim().toUpperCase()
            , pNotes: $("#txtNotes").val().trim() == "" ? 0 : $("#txtNotes").val().trim().toUpperCase()
            , pMainWarehouseID: $("#slMainWarehouse").val() == "" ? 0 : $("#slMainWarehouse").val()
            , pWarehouseType: $("#slWarehouseType").val() == "" ? 0 : $("#slWarehouseType").val()
            , pIsAir: $("#cbIsAir").prop('checked')
        }, pSaveandAddNew, "WarehouseModal", function () { Warehouse_LoadingWithPaging(); Warehouse_ClearAllControls(); });
}
function Warehouse_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblWarehouse', 'Delete') != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
        //callback function in case of pressing "Yes, delete"
        function () {
            DeleteListFunction("/api/Warehouse/Delete", { "pWarehouseIDs": GetAllSelectedIDsAsString('tblWarehouse', 'Delete') }, function () {
                Warehouse_LoadingWithPaging();
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}

function FillWarehouseTypes()
{
    //$("#slWarehouseType").val("");

}
