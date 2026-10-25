function SL_LinkPriceListWithPaymentMethod_BindTableRows(pSL_LinkPriceListWithPaymentMethod) {
    debugger;
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblSL_LinkPriceListWithPaymentMethod");
    $.each(pSL_LinkPriceListWithPaymentMethod, function (i, item) {
        AppendRowtoTable("tblSL_LinkPriceListWithPaymentMethod",
        ("<tr ID='" + item.ID + "' ondblclick='SL_LinkPriceListWithPaymentMethod_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='SL_LinkPriceListWithPaymentMethodID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='PriceListName'>" + (item.PriceListName == 0 ? "" : item.PriceListName) + "</td>"
                    + "<td class='PaymentTerm'>" + (item.PaymentTerm == 0 ? "" : item.PaymentTerm) + "</td>"
                    //+ "<td class='BranchID hide' val='" + item.BranchID + "'>" + item.BranchID + "</td>"
                    + "<td class='PriceListID hide'>" + (item.PriceListID == 0 ? "" : item.PriceListID) + "</td>"
                    + "<td class='PaymentTermsID hide'>" + (item.PaymentTermsID == 0 ? "" : item.PaymentTermsID) + "</td>"
                    + "<td class='Percentage'>" + (item.Percentage == 0 ? "" : item.Percentage) + "</td>"
                  
                    + "<td class='hide'><a href='#SL_LinkPriceListWithPaymentMethodModal' data-toggle='modal' onclick='SL_LinkPriceListWithPaymentMethod_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblSL_LinkPriceListWithPaymentMethod", "SL_LinkPriceListWithPaymentMethodID", "cbSL_LinkPriceListWithPaymentMethodDeleteHeader");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    CheckAllCheckbox("HeaderDeleteSL_LinkPriceListWithPaymentMethodID");
    HighlightText("#tblSL_LinkPriceListWithPaymentMethod>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
   
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function SL_LinkPriceListWithPaymentMethod_EditByDblClick(pID) {
    jQuery("#SL_LinkPriceListWithPaymentMethodModal").modal("show");
    SL_LinkPriceListWithPaymentMethod_FillControls(pID);
}
// Loading with data
function SL_LinkPriceListWithPaymentMethod_LoadingWithPaging() {
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SL_LinkPriceListWithPaymentMethod/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { SL_LinkPriceListWithPaymentMethod_BindTableRows(pTabelRows); SL_LinkPriceListWithPaymentMethod_ClearAllControls(); });
    HighlightText("#tblSL_LinkPriceListWithPaymentMethod>tbody>tr", $("#txt-Search").val().trim());
}


// calling web function to add new SL_LinkPriceListWithPaymentMethod item.
function SL_LinkPriceListWithPaymentMethod_Insert(pSaveandAddNew) {
    if ($('#slPriceListID').val() == "0" || $('#slPriceListID').val() == "")
        swal("Sorry", "Please Choose Price List.");
    else {
        $.ajax({
            type: "GET",
            url: "/api/SL_LinkPriceListWithPaymentMethod/CheckIfItemFound",
            data: { pPriceListID: $("#slPriceListID").val(), pPaymentTermsID: $('#slPaymentTermsID').val(), pID: -1 },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (pData) {
                if (pData == true) {
                    swal('Sorry', 'this item already exist', 'warning');
                    _Suceess = false;
                }
                else {
                    InsertUpdateFunction("form", "/api/SL_LinkPriceListWithPaymentMethod/Insert", {
                        //pCode: $("#txtCode").val().trim() == "" ? 0 : $("#txtCode").val().trim().toUpperCase(),
                        pPriceListID: $("#slPriceListID").val(),
                        pPaymentTermsID: $("#slPaymentTermsID").val(),
                        pPercentage: $("#txtPercentage").val().trim() == "" ? "0" : $("#txtPercentage").val().trim()

                    }, pSaveandAddNew, "SL_LinkPriceListWithPaymentMethodModal",
                    function () {
                        SL_LinkPriceListWithPaymentMethod_LoadingWithPaging();
                    });

                }
            }
        });
    }
}
// calling this function for update
function SL_LinkPriceListWithPaymentMethod_Update(pSaveandAddNew) {
    debugger;
    if ($('#slPriceListID').val() == "0" || $('#slPriceListID').val() == "")
        swal("Sorry", "Please Choose Price List.");
    else {
        $.ajax({
            type: "GET",
            url: "/api/SL_LinkPriceListWithPaymentMethod/CheckIfItemFound",
            data: { pPriceListID: $("#slPriceListID").val(), pPaymentTermsID: $('#slPaymentTermsID').val(), pID: $("#hID").val() },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (pData) {
                if (pData == true) {
                    swal('Sorry', 'this item already exist', 'warning');
                    _Suceess = false;
                }
                else {
                    InsertUpdateFunction("form", "/api/SL_LinkPriceListWithPaymentMethod/Update", {
                        pID: $("#hID").val(),
                        //pCode: $("#txtCode").val().trim() == "" ? 0 : $("#txtCode").val().trim().toUpperCase(),
                        pPriceListID: $("#slPriceListID").val(),
                        pPaymentTermsID: $("#slPaymentTermsID").val(),
                        pPercentage: $("#txtPercentage").val().trim() == "" ? "0" : $("#txtPercentage").val().trim()
                    }, pSaveandAddNew, "SL_LinkPriceListWithPaymentMethodModal", function () { SL_LinkPriceListWithPaymentMethod_LoadingWithPaging(); });

                }
            }
        });
    }
}
function SL_LinkPriceListWithPaymentMethod_Delete(pID) {
    DeleteListFunction("/api/SL_LinkPriceListWithPaymentMethod/DeleteByID", { "pID": pID }, function () { SL_LinkPriceListWithPaymentMethod_LoadingWithPaging(); });
}
function SL_LinkPriceListWithPaymentMethod_DeleteList() {
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblSL_LinkPriceListWithPaymentMethod') != "")
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
            DeleteListFunction("/api/SL_LinkPriceListWithPaymentMethod/Delete", { "pSL_LinkPriceListWithPaymentMethodIDs": GetAllSelectedIDsAsString('tblSL_LinkPriceListWithPaymentMethod') }, function () { SL_LinkPriceListWithPaymentMethod_LoadingWithPaging(); });
        });
}
//after pressing edit, this function fills the data
function SL_LinkPriceListWithPaymentMethod_FillControls(pID) {
    debugger;
    ClearAll("#SL_LinkPriceListWithPaymentMethodModal", null);
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
  //  $("#lblShown").html(" : " + $(tr).find("td.Name").text());
    $("#txtPercentage").val($(tr).find("td.Percentage").text());
    $("#slPriceListID").val($(tr).find("td.PriceListID").text());
    $("#slPaymentTermsID").val($(tr).find("td.PaymentTermsID").text());


    //////////
    
    $("#btnSave").attr("onclick", "SL_LinkPriceListWithPaymentMethod_Update(false);");
    $("#btnSaveandNew").attr("onclick", "SL_LinkPriceListWithPaymentMethod_Update(true);");
}
function SL_LinkPriceListWithPaymentMethod_ClearAllControls() {
    ClearAll("#SL_LinkPriceListWithPaymentMethodModal", null);

   
    //PriceList_GetList(null, null);
    $("#btnSave").attr("onclick", "SL_LinkPriceListWithPaymentMethod_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "SL_LinkPriceListWithPaymentMethod_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
}
//function PriceList_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
//    //parameters: ID, strFnName, First Row in select list, select list name
//    debugger;
//    CallGETFunctionWithParameters("/api/I_PriceList/IntializeData"
//    , { pID: "ORDER BY Name" }
//    , function (pData) {
//        FillListFromObject(pID, 2, TranslateString("SelectFromMenu"), "slPriceListID", pData[1], null);
//    }
//    , null);
//}