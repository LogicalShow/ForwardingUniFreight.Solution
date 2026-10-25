function PaymentRequestApprovalLevels_Initialize() {
    debugger;
    $("#hl-menu-Warehousing").parent().siblings().removeClass("active");
    strBindTableRowsFunctionName = "PaymentRequestApprovalLevels_BindTableRows";
    strLoadWithPagingFunctionName = "/api/PaymentRequestApprovalLevels/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = " WHERE 1=1";
    var pOrderBy = " OrderNo";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/MasterData/Invoicing/PaymentRequestApprovalLevels", "div-content", function () {
        if (glbCallingControl == "PaymentRequestApprovalLevels") {
            $("#liGroupName").text("Master Data");
            $("#liGroupName").attr("onclick", "LoadViews('Invoicing')");
            $("#liTabName").text("Invoicing");
            $("#liTabName").attr("onclick", "LoadViews('Invoicing')");
        }
        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
            , function (pData) {
                PaymentRequestApprovalLevels_BindTableRows(JSON.parse(pData[0]));
                //ApplySelectListSearch();
            }); 
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
    , function () { PaymentRequestApprovalLevels_ClearAllControls(); }
    , function () { PaymentRequestApprovalLevels_DeleteList(); });
}
function PaymentRequestApprovalLevels_BindTableRows(pPaymentRequestApprovalLevels) {
    debugger;
    $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblPaymentRequestApprovalLevels");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pPaymentRequestApprovalLevels, function (i, item) {
        AppendRowtoTable("tblPaymentRequestApprovalLevels",
        ("<tr ID='" + item.ID + "' ondblclick='PaymentRequestApprovalLevels_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Name'>" + (item.Name == 0 ? "" : item.Name) + "</td>"
                    + "<td class='OrderNo'>" + (item.OrderNo == 0 ? "" : item.OrderNo) + "</td>"
                    + "<td class='CreatePaymentOrderOnApprove hide'> <input type='checkbox' disabled='disabled' val='" + (item.CreatePaymentOrderOnApprove == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='CreateAccrualGLOnApprove hide'> <input type='checkbox' disabled='disabled' val='" + (item.CreateAccrualGLOnApprove == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='RedirectNotifyOnApprove hide'> <input type='checkbox' disabled='disabled' val='" + (item.RedirectNotifyOnApprove == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsLastLevel'> <input type='checkbox' disabled='disabled' val='" + (item.IsLastLevel == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='hide'><a href='#PaymentRequestApprovalLevelsModal' data-toggle='modal' onclick='PaymentRequestApprovalLevels_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblPaymentRequestApprovalLevels", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblPaymentRequestApprovalLevels>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function PaymentRequestApprovalLevels_LoadingWithPaging() {
    debugger;
    var pWhereClause = PaymentRequestApprovalLevels_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = " OrderNo";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { PaymentRequestApprovalLevels_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblPaymentRequestApprovalLevels>tbody>tr", $("#txt-Search").val().trim());
}
function PaymentRequestApprovalLevels_GetWhereClause() {
    return ($("#txt-Search").val().trim() == "" ? "WHERE 1=1" : ("WHERE Name LIKE N'%" + $("#txt-Search").val().trim() + "%'"));
}
function PaymentRequestApprovalLevels_EditByDblClick(pID) {
    jQuery("#PaymentRequestApprovalLevelsModal").modal("show");
    PaymentRequestApprovalLevels_FillControls(pID);
}
function PaymentRequestApprovalLevels_ClearAllControls(callback) {
    ClearAll("#PaymentRequestApprovalLevelsModal");

    $("#btnSave").attr("onclick", "PaymentRequestApprovalLevels_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "PaymentRequestApprovalLevels_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
    //ApplySelectListSearch_OnlyChange();
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
}
function PaymentRequestApprovalLevels_FillControls(pID) {
    debugger;
    ClearAll("#PaymentRequestApprovalLevelsModal", null);
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    $("#lblShown").html("<span> : </span><span>" + $(tr).find("td.Name").text() + "</span>");
    $("#txtName").val($(tr).find("td.Name").text());
    $("#txtOrderNo").val($(tr).find("td.OrderNo").text());
    $("#cbCreatePaymentOrderOnApprove").prop('checked', $(tr).find('td.CreatePaymentOrderOnApprove').find('input').attr('val'));
    $("#cbCreateAccrualGLOnApprove").prop('checked', $(tr).find('td.CreateAccrualGLOnApprove').find('input').attr('val'));
    $("#cbRedirectNotifyOnApprove").prop('checked', $(tr).find('td.RedirectNotifyOnApprove').find('input').attr('val'));
    $("#cbIsLastLevel").prop('checked', $(tr).find('td.IsLastLevel').find('input').attr('val'));
    
    $("#btnSave").attr("onclick", "PaymentRequestApprovalLevels_Update(false);");
    $("#btnSaveandNew").attr("onclick", "PaymentRequestApprovalLevels_Update(true);");
    //ApplySelectListSearch_OnlyChange();
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $("#lblShown").reverseChildren();
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
}
function PaymentRequestApprovalLevels_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/PaymentRequestApprovalLevels/Insert"
        , {
             pName: $("#txtName").val().trim() == "" ? 0 : $("#txtName").val().trim().toUpperCase()
            , pOrderNo: $("#txtOrderNo").val().trim() == "" ? 0 : $("#txtOrderNo").val().trim()
            , pCreatePaymentOrderOnApprove: $("#cbCreatePaymentOrderOnApprove").prop("checked")
            , pCreateAccrualGLOnApprove: $("#cbCreateAccrualGLOnApprove").prop("checked")
            , pRedirectNotifyOnApprove: $("#cbRedirectNotifyOnApprove").prop("checked")
            , pIsLastLevel: $("#cbIsLastLevel").prop("checked")
        }, pSaveandAddNew, "PaymentRequestApprovalLevelsModal", function () { PaymentRequestApprovalLevels_LoadingWithPaging(); PaymentRequestApprovalLevels_ClearAllControls(); });
}
function PaymentRequestApprovalLevels_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/PaymentRequestApprovalLevels/Update"
        , {
            pID: $("#hID").val()
            , pName: $("#txtName").val().trim() == "" ? 0 : $("#txtName").val().trim().toUpperCase()
            , pOrderNo: $("#txtOrderNo").val().trim() == "" ? 0 : $("#txtOrderNo").val().trim()
            , pCreatePaymentOrderOnApprove: $("#cbCreatePaymentOrderOnApprove").prop("checked")
            , pCreateAccrualGLOnApprove: $("#cbCreateAccrualGLOnApprove").prop("checked")
            , pRedirectNotifyOnApprove: $("#cbRedirectNotifyOnApprove").prop("checked")
            , pIsLastLevel: $("#cbIsLastLevel").prop("checked")
          }, pSaveandAddNew, "PaymentRequestApprovalLevelsModal", function () { PaymentRequestApprovalLevels_LoadingWithPaging(); PaymentRequestApprovalLevels_ClearAllControls(); });
}
function PaymentRequestApprovalLevels_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblPaymentRequestApprovalLevels', 'Delete') != "")
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
            DeleteListFunction("/api/PaymentRequestApprovalLevels/Delete", { "pPaymentRequestApprovalLevelsIDs": GetAllSelectedIDsAsString('tblPaymentRequestApprovalLevels', 'Delete') }, function () {
                PaymentRequestApprovalLevels_LoadingWithPaging();
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}
