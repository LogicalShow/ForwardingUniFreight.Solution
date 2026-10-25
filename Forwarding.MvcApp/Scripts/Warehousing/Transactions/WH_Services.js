function WH_Services_Initialize() {
    debugger;
    $("#hl-menu-Warehousing").parent().siblings().removeClass("active");
    strBindTableRowsFunctionName = "WH_Services_BindTableRows";
    strLoadWithPagingFunctionName = "/api/WH_Services/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = " WHERE 1=1 ";
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/Warehousing/Transactions/WH_Services", "div-content", function () {
        $('button').each(function () { if ($(this).attr('type') == undefined) $(this).attr('type', 'button'); });
        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
            , function (pData) {
              
                WH_Services_BindTableRows(JSON.parse(pData[0]));
             
               
                FillListFromObject(null, 2,"< --Select -->", "slCalcType", pData[2], null);
                FillListFromObject(null, 2, "< --Select -->", "slChargeType", pData[3], null);
            });
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
        $('#WH_ServicesModal').removeAttr('tabindex');
        $('#slChargeType').css({ 'width': '100%' }).select2();
    },
        function () { WH_Services_ClearAllControls(); },
        function () { WH_Services_DeleteList(); });
}
function WH_Services_BindTableRows(pData) {
    debugger;
    $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblWH_Services");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pData, function (i, item) {
        AppendRowtoTable("tblWH_Services",
        ("<tr ID='" + item.ID + "' ondblclick='WH_Services_FillAllControls(" + item.ID + ");'>"
            + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='Name'>" + item.Name + "</td>"
            + "<td class='NameLocal hide'>" + item.NameLocal + "</td>"
            + "<td class='Cost hide'>" + item.Cost + "</td>"
            + "<td class='Selling hide'>" + item.Selling + "</td>"
            + "<td class='CalcTypeID hide'>" + item.CalcTypeID + "</td>"
            + "<td class='ChargeTypeID hide'>" + item.ChargeTypeID + "</td>"
            + "<td class='hide'><a href='#WH_ServicesModal' data-toggle='modal' onclick='WH_Services_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblWH_Services", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblWH_Services>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function WH_Services_LoadingWithPaging() {
    debugger;
    var pWhereClause = WH_Services_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { WH_Services_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblWH_Services>tbody>tr", $("#txt-Search").val().trim());
}
function WH_Services_GetWhereClause() {
    var _WhereClause = "WHERE 1=1" + "\n";
    if ($("#txt-Search").val().trim() != "") {
        _WhereClause += "AND (" + "\n";
        _WhereClause += "       Name LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        _WhereClause += "       OR NameLocal LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        _WhereClause += "    )";
    }
    return _WhereClause;
}
function WH_Services_ClearAllControls() {
    debugger;
    ClearAll("#WH_ServicesModal");
    $("#slChargeType option:eq(0)").prop('selected', 'selected').change();
    $("#btnSave").attr("onclick", "WH_Services_Save(false);");
    $("#btnSaveAndAddNew").attr("onclick", "WH_Services_Save(true);");
    $("#cb-CheckAll").prop('checked', false);
}
function WH_Services_FillAllControls(pID) {
    debugger;

    ClearAll("#WH_ServicesModal");
    jQuery("#WH_ServicesModal").modal("show");
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");

    $("#txtName").val($(tr).find("td.Name").text());
    $("#txtNameLocal").val($(tr).find("td.NameLocal").text());
    $("#txtCost").val($(tr).find("td.Cost").text());
    $("#txtSelling").val($(tr).find("td.Selling").text());
    $("#slCalcType").val($(tr).find("td.CalcTypeID").text());
    $("#slChargeType").val($(tr).find("td.ChargeTypeID").text()).change();
    
}
function WH_Services_Save(pSaveAndNew) {
    debugger;
   

    if (ValidateForm("form", "WH_ServicesModal")) {
        FadePageCover(true);
        pParametersWithValues = {
              pID: $("#hID").val() == "" ? 0 : $("#hID").val()
            , pName: IsNull($("#txtName").val(),'')
            , pNameLocal: IsNull($("#txtNameLocal").val(),'')
            , pCost: Number($("#txtCost").val())
            , pSelling: Number($("#txtSelling").val())
            , pCalcTypeID: $("#slCalcType").val() > 0 ? $("#slCalcType").val() : 0
            , pChargeTypeID: $("#slChargeType").val() > 0 ? $("#slChargeType").val() : 0
        };
        CallGETFunctionWithParameters("/api/WH_Services/Save", pParametersWithValues
            , function (pData) {
                FadePageCover(false);
                $("#hID").val(pData.ID);
                if (pData.Exception == null) {
                    swal("Success", "Saved successfully.");
                    if (pSaveAndNew)
                        WH_Services_ClearAllControls();
                    else
                        jQuery("#WH_ServicesModal").modal("hide");
                    WH_Services_LoadingWithPaging();
                }
                else {
                    swal("Sorry", pData.Exception.Message);
                }
                
            }
            , null);
    }
    else 
        FadePageCover(false);
}
function WH_Services_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblWH_Services') != "")
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
            DeleteListFunction("/api/WH_Services/Delete", { "pIDs": GetAllSelectedIDsAsString('tblWH_Services') }, function () { WH_Services_LoadingWithPaging(); });
        });
}


