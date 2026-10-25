function WH_ItemKitting_Initialize() {
    debugger;
    $("#hl-menu-Warehousing").parent().siblings().removeClass("active");
    strBindTableRowsFunctionName = "WH_ItemKitting_BindTableRows";
    strLoadWithPagingFunctionName = "/api/WH_ItemKitting/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = " WHERE 1=1 ";
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/Warehousing/MasterData/WH_ItemKitting", "div-content", function () {
        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
            , function (pData) {
              
                WH_ItemKitting_BindTableRows(JSON.parse(pData[0]));
                FillListFromObject(null, 2, "< --Select -->", "slItemBase", pData[2], function (items) {
                    $.each(items, function (i, item) {
                        $('#slItemBase option[value=' + item.ID + ']').attr('Name', item.Name);
                        $('#slItemBase option[value=' + item.ID + ']').attr('LocalName', item.LocalName);
                    });
                    $('#slItem').html($('#slItemBase').html());
                });
               
            });
        $('#slItem').css({ 'width': '100%' }).select2();
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    },
        function () { WH_ItemKitting_ClearAllControls(); },
        function () { WH_ItemKitting_DeleteList(); });
}
function WH_ItemKitting_BindTableRows(pData) {
    debugger;
    $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblWH_ItemKitting");
    $.each(pData, function (i, item) {
        AppendRowtoTable("tblWH_ItemKitting",
        ("<tr ID='" + item.ID + "' ondblclick='WH_ItemKitting_FillAllControls(" + item.ID + ");'>"
            + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='ItemID hide'>" + item.ItemID + "</td>"
            + "<td class='Name'>" + item.Name + "</td>"
            + "<td class='LocalName'>" + item.LocalName + "</td>"
            + "<td class='DateFrom'>" + ConvertDateFormat(GetDateWithFormatMDY(item.DateFrom)) + "</td>"
            + "<td class='DateTo'>" + ConvertDateFormat(GetDateWithFormatMDY(item.DateTo))  + "</td>"
            + "<td class='Notes hide'>" + item.Notes + "</td>"
            + "</tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblWH_ItemKitting", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblWH_ItemKitting>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function WH_ItemKitting_LoadingWithPaging() {
    debugger;
    var pWhereClause = WH_ItemKitting_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { WH_ItemKitting_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblWH_ItemKitting>tbody>tr", $("#txt-Search").val().trim());
}
function WH_ItemKitting_GetWhereClause() {
    var _WhereClause = "WHERE 1=1" + "\n";
    if ($("#txt-Search").val().trim() != "") {
        _WhereClause += "AND (" + "\n";
        _WhereClause += "       Name LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        _WhereClause += "       OR LocalName LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        _WhereClause += "    )";
    }
    return _WhereClause;
}
function WH_ItemKitting_ClearAllControls() {
    debugger;
    ClearAll("#WH_ItemKittingModal");
    $('#btnSave').removeClass('hide');
    $("#cb-CheckAll").prop('checked', false);
}
function WH_ItemKitting_FillAllControls(pID) {
    debugger;
    $('#tblItems tbody').html('');
    ClearAll("#WH_ItemKittingModal");
    jQuery("#WH_ItemKittingModal").modal("show");
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);

    $("#slItem").attr('onchange', '');
    $("#slItem").val($(tr).find('td.ItemID').text()).change();
    $("#slItem").attr('onchange', 'SetNames();');
    
    $("#txtName").val($(tr).find("td.Name").text());
    $("#txtLocalName").val($(tr).find("td.LocalName").text());
    $("#txtNotes").val($(tr).find("td.Notes").text());

    $("#txtDateFrom").val($(tr).find("td.DateFrom").text());
    $("#txtDateTo").val($(tr).find("td.DateTo").text());
    
    FadePageCover(true);
    pParametersWithValues = {
        pWhereClause: "where MasterID = " + pID
    };
    CallGETFunctionWithParameters("/api/WH_ItemKitting/LoadDetails", pParametersWithValues
        , function (pData) {
            FadePageCover(false);
            var data = JSON.parse(pData.Data);
            $.each(data, function (i, item) {
                AddItem();
                $('#tblItems tbody tr:eq(' + i + ')').find('td.ID input').val(item.ID);
                $('#tblItems tbody tr:eq(' + i + ')').find('td.DetailItemID select').val(item.DetailItemID).change();
                $('#tblItems tbody tr:eq(' + i + ')').find('td.Qty input').val(item.Qty);
            });
        }
        , null);
    
}
function WH_ItemKitting_Save() {
    debugger;
   

    if (ValidateForm("form", "WH_ItemKittingModal")) {
        FadePageCover(true);

        var details = [];
        $('#tblItems tbody tr').each(function (i) {
            details.push({
                ID: IsNull($(this).find('td.ID input').val(), 0),
                DetailItemID: IsNull($(this).find('td.DetailItemID select').val(), 0),
                Qty: IsNull($(this).find('td.Qty input').val(), 0),
            });
        });
        pParametersWithValues = {
            ID: $("#hID").val(),
            ItemID: $("#slItem").val(),
            Name: $("#txtName").val(),
            LocalName: $("#txtLocalName").val(),
            DateFrom: ConvertDateFormat($("#txtDateFrom").val()),
            DateTo: ConvertDateFormat($("#txtDateTo").val()),
            Notes: $("#txtNotes").val(),
            Details: details
        };

        CallPOSTFunctionWithParameters("/api/WH_ItemKitting/Save", pParametersWithValues
            , function (pData) {
                FadePageCover(false);
                if (pData.Result) {
                    swal("Success", "Saved Successfully!");
                    jQuery("#WH_ItemKittingModal").modal("hide");
                    WH_ItemKitting_LoadingWithPaging();
                }
                else {
                    swal("Sorry", "Saving Faild!");
                    console.log(pData.Exception);
                }
            }
            , null);
    }
    else 
        FadePageCover(false);
}
function WH_ItemKitting_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblWH_ItemKitting') != "")
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
            DeleteListFunction("/api/WH_ItemKitting/Delete", { "pIDs": GetAllSelectedIDsAsString('tblWH_ItemKitting') }, function () { WH_ItemKitting_LoadingWithPaging(); });
        });
}

function AddItem() {
    AppendRowtoTable("tblItems",
        (`<tr>
            <td class='ID hide'><input class="form-control" type="text"/></td>
            <td class='DetailItemID'><select data-required="false" class="form-control" >`+ $('#slItemBase').html() + `</select></td>           
            <td class='Qty'><input class="form-control" type="text" onfocus='CheckValIsDecimal(this);' onkeypress='CheckValIsDecimal(this); CheckIsValidQty(this,event);'/></td>
			<td><span class='fa fa-trash text-danger' onclick='DeleteTableRow(this);'></span></td>
        </tr>`));
    $('#tblItems td.DetailItemID select').css({'width':'100%'}).select2();
}

function CheckIsValidQty(pInp, pEvent) {
    debugger;
    var val = parseInt($(pInp).val() + '' + pEvent.key);
    if (val < 1 || val> 999999999) {
            pEvent.preventDefault();
        }

}

function SetNames() {
    $('#txtName').val('');
    $('#txtLocalName').val('');
    if ($('#slItem').val() > 0) {
        var name = $('#slItem option:selected').attr('Name');
        var localName = $('#slItem option:selected').attr('LocalName');
        $('#txtName').val(name);
        $('#txtLocalName').val(localName);
    }
}