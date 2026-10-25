function WH_Putaway_Initialize() {
    debugger;
    $("#hl-menu-Warehousing").parent().siblings().removeClass("active");
    strBindTableRowsFunctionName = "WH_Putaway_BindTableRows";
    strLoadWithPagingFunctionName = "/api/WH_Putaway/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = "WHERE 1=1";
    var pOrderBy = "ID desc";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/Warehousing/Transactions/WH_Putaway", "div-content", function () {
        $('button').each(function () { if ($(this).attr('type') == undefined) $(this).attr('type', 'button'); });
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
        $('#slReceive').css({ 'width': '100%' }).select2();
        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
            , function (pData) {
                WH_Putaway_BindTableRows(JSON.parse(pData[0]));
                FillReceives(JSON.parse(pData[2]));
            });

    },
        function () { WH_Putaway_ClearAllControls(); }, null);
}
function WH_Putaway_BindTableRows(pData) {
    debugger;
    $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblWH_Putaway");
    $.each(pData, function (i, item) {
        AppendRowtoTable("tblWH_Putaway",
            ("<tr ID='" + item.ID + "' ondblclick='return; WH_Putaway_FillAllControls(" + item.ID + ");'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='PutawayID hide'>" + item.PutawayID + "</td>"
                + "<td class='PutawayCode'>" + item.PutawayCode + "</td>"
                + "<td class='ReceiveID hide'>" + item.ReceiveID + "</td>"
                + "<td class='ReceiveCode'>" + item.ReceiveCode + "</td>"
                + "<td class='PalletID'>" + item.PalletID + "</td>"
                + "<td class='PutawayLocationCode'>" + item.PutawayLocationCode + "</td>"
                + "<td class='CreatorUserName'>" + item.CreatorUserName + "</td>"
                + "<td class='CreationDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CreationDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate))) + "</td>"
                + "<td class='WarehouseName'>" + item.WarehouseName + "</td>"
                + "<td class='OwnerName'>" + item.OwnerName + "</td>"
            + "<td class='hide'><a href='#WH_PutawayModal' data-toggle='modal' onclick='WH_Putaway_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblWH_Putaway", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblWH_Putaway>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function WH_Putaway_LoadingWithPaging(pFilterOptions, pIsLoadArrayOfObjects) {
    debugger;
    if (pIsLoadArrayOfObjects == null || pIsLoadArrayOfObjects == undefined)
        pIsLoadArrayOfObjects = false;

    if (pIsLoadArrayOfObjects)
        $('#slReceive').html('<option value="0"><--Select--></option>');

    var pWhereClause = WH_Putaway_GetWhereClause(pFilterOptions);
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID desc";
    var pControllerParameters = { pIsLoadArrayOfObjects: pIsLoadArrayOfObjects, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) {
        WH_Putaway_BindTableRows(JSON.parse(pData[0]));
        if (pIsLoadArrayOfObjects)
            FillReceives(JSON.parse(pData[2]));
    });
    HighlightText("#tblWH_Putaway>tbody>tr", $("#txt-Search").val().trim());
}
function WH_Putaway_GetWhereClause(pFilterOptions) {
    var pWhereClause = "WHERE 1=1" + "\n";
     //filter options
    if (pFilterOptions) {
        if ($("#txt-Search").val().trim() != "") {
            pWhereClause += "AND (" + "\n";
            pWhereClause += "       Code LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
            pWhereClause += "       OR ReceiveCode LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
            pWhereClause += "    )";
        }
    }
    //search controls
    else {
        if ($("#srchCode").val().trim() != "") {
            var vals = IsNull($("#srchCode").val(), '').split(',');
            pWhereClause += " and (PutawayCode ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR PutawayCode";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchReceiveCode").val().trim() != "") {
            var vals = IsNull($("#srchReceiveCode").val(), '').split(',');
            pWhereClause += " and (ReceiveCode ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR ReceiveCode";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchPalletID").val().trim() != "") {
            var vals = IsNull($("#srchPalletID").val(), '').split(',');
            pWhereClause += " and (PalletID ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR PalletID";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchLocation").val().trim() != "") {
            var vals = IsNull($("#srchLocation").val(), '').split(',');
            pWhereClause += " and (PutawayLocationCode ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR PutawayLocationCode";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchCreator").val().trim() != "") {
            var vals = IsNull($("#srchCreator").val(), '').split(',');
            pWhereClause += " and (CreatorUserName ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR CreatorUserName";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchCreation").val().trim() != "") {
            var vals = IsNull($("#srchCreation").val(), '').split(',');
            pWhereClause += " and (Format(Cast(CreationDate as date), 'dd/MM/yyyy') ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR Format(Cast(CreationDate as date), 'dd/MM/yyyy')";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchWarehouse").val().trim() != "") {
            var vals = IsNull($("#srchWarehouse").val(), '').split(',');
            pWhereClause += " and (WarehouseName ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR WarehouseName";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchOwner").val().trim() != "") {
            var vals = IsNull($("#srchOwner").val(), '').split(',');
            pWhereClause += " and (OwnerName ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR OwnerName";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
    }
    return pWhereClause;
}
function WH_Putaway_ClearAllControls() {
    debugger;
    ClearAll("#WH_PutawayModal");
    $('#tblPallets tbody').html('');
    $('#slLocation').html('');
    $('#btnSave').removeClass('hide');
    $("#cb-CheckAll").prop('checked', false);
    $('#txtCode').closest('div.form-group').addClass('hide');
}

function WH_Putaway_FillAllControls(pID) {
    debugger;
    ClearAll("#WH_PutawayModal");
    $('#tblPallets tbody').html('');
    $('#slLocation').html('<option value="0"><--Select--></option>');
    jQuery("#WH_PutawayModal").modal("show");
    var tr = $("tr[ID='" + pID + "']");
    $("#hID").val(pID);
    $("#txtCode").val($(tr).find("td.Code").text());
    $('#txtCode').closest('div.form-group').removeClass('hide');
    $('#slReceive').html('<option value="' + $(tr).find("td.ReceiveID").text() + '" selected>' + $(tr).find("td.ReceiveCode").text() + '</option>');
    FadePageCover(true);
    pParametersWithValues = {
        pPutawayID:pID,
    };
    CallGETFunctionWithParameters("/api/WH_Putaway/LoadDetails", pParametersWithValues
        , function (pData) {
            FadePageCover(false);
            FillListFromObject(null, 1, "< --Select -->", "slLocation", pData.Locations, null);
            var details = JSON.parse(pData.Details);
            _details = details;
            ReceiveDetails_BindTableRows(details);
        }
        , null);
    
}

function FillReceives(pData) {
    $('#slReceive').html('<option value="0"><--Select--></option>');
    $.each(pData, function (i, item) {
        $('#slReceive').append('<option value="' + item.ID + '">' + item.Code + '</option>');
    });
}
var _details = [];
function LoadReceiveDetails() {
    $('#slLocation').html('<option value="0"><--Select--></option>');
    $('#tblPallets tbody').html('');
    FadePageCover(true);
    pParametersWithValues = {
        pWhereClause: "WHERE ReceiveID = " + $('#slReceive').val(),
        pWhereClauseLocations: "WHERE WarehouseID = (select WarehouseID from WH_Receive where ID=" + $('#slReceive').val() + ")",
    };
    CallGETFunctionWithParameters("/api/WH_Putaway/LoadReceiveDetails", pParametersWithValues
        , function (pData) {
            FadePageCover(false);
            FillListFromObject(null, 1, "< --Select -->", "slLocation", pData.Locations, null);
            var details = JSON.parse(pData.Details);
            _details = details;
            ReceiveDetails_BindTableRows(details);
        }
        , null);
}
function ReceiveDetails_BindTableRows(pData) {
    $('#tblPallets tbody').html('');
    $.each(pData, function (i, item) {
        AppendRowtoTable("tblPallets",
            ("<tr>"
                + "<td class='OwnerName'>" + item.OwnerName + "</td>"
                + "<td class='WarehouseName'>" + item.WarehouseName + "</td>"
                + "<td class='PalletID'>" + item.PalletID + "</td>"
                + "<td class='ReceiveLocationID hide'>" + item.ReceiveLocationID + "</td>"
                + "<td class='ReceiveLocationCode'>" + item.ReceiveLocationCode + "</td>"
                + "<td class='PutawayLocationID'><select class='form-control select2' data-required='false'>" + $('#slLocation').html() + "</select></td>"
                + "</tr>"));
        $('#tblPallets tbody tr:eq(' + i + ') td.PutawayLocationID select').val(item.PutawayLocationID).change();
    });
    $('#tblPallets .select2').css({ 'width': '100%' }).select2();

}
function SearchRowItem() {
    debugger;
    var rowItems = _details;
    if ($('#srchOwnerDetail').val().trim()) {
        rowItems = rowItems.filter(function (row) { return IsNull(row.OwnerName, '').toLowerCase().includes($('#srchOwnerDetail').val().trim().toLowerCase()); });
    }
    if ($('#srchWarehouseDetail').val().trim()) {
        rowItems = rowItems.filter(function (row) { return IsNull(row.WarehouseName, '').toLowerCase().includes($('#srchWarehouseDetail').val().trim().toLowerCase()); });
    }
    if ($('#srchPallet').val().trim()) {
        rowItems = rowItems.filter(function (row) { return IsNull(row.PalletID, '').toLowerCase().includes($('#srchPallet').val().trim().toLowerCase()); });
    }
    if ($('#srchLoc').val().trim()) {
        rowItems = rowItems.filter(function (row) { return IsNull(row.LocationCode, '').toLowerCase().includes($('#srchLoc').val().trim().toLowerCase()); });
    }
    ReceiveDetails_BindTableRows(rowItems);
}

function WH_Putaway_Save() {
    debugger;
   

        FadePageCover(true);
    if (ValidateForm("form", "WH_PutawayModal")) {

        var details = [];
        $('#tblPallets tbody tr').each(function (i) {
            if ($(this).find('td.PutawayLocationID select option:selected').val() > 0) {

            details.push({
                PalletID: IsNull($(this).find('td.PalletID').text(), '').trim(),
                ReceiveLocationID: IsNull($(this).find('td.ReceiveLocationID').text(), 0),
                PutawayLocationID: IsNull($(this).find('td.PutawayLocationID select option:selected').val(), 0),
            });
            }
        });

        if (details.length == 0) {
            swal("Sorry", "No Data To Save!");
            FadePageCover(false);
            return;
        }

        var isValid = true;
        $.each(details, function (i, item) {
            if (item.PalletID == '') {
                swal("Sorry", "PalletID is mandatory!");
                isValid = false;
                return false
            }
            if (item.ReceiveLocationID == 0) {
                swal("Sorry", "Receive location is mandatory!");
                isValid = false;
                return false
            }
            //if (item.PutawayLocationID == 0) {
            //    swal("Sorry", "Putaway location is mandatory!");
            //    isValid = false;
            //    return false
            //}
        });

        if (!isValid) {
            FadePageCover(false);
            return;
        }
        pParametersWithValues = {
            ID: $('#hID').val(),
            ReceiveID: $("#slReceive").val(),
            Details: details,
        };
        CallPOSTFunctionWithParameters("/api/WH_Putaway/Save", pParametersWithValues
            , function (pData) {
                FadePageCover(false);
                if (pData.Result) {
                    swal("Success", "Saved Successfully!");
                    jQuery("#WH_PutawayModal").modal("hide");
                    WH_Putaway_LoadingWithPaging(false, true);
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



