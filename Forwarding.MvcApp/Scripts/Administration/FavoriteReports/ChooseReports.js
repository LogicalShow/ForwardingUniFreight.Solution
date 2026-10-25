function ChooseReports_Initialize() {
    debugger;

    //  CallGETFunctionWithParameters("/api/ChooseReports/DepartmentCharge_LoadDepartmentCharges"
    //, { pWhereClauseDepartmentCharge: "WHERE DepartmentID=" + $("#hID").val() }
    //, function (pData) {
    //    var pDepartmentCharge = JSON.parse(pData[0]);
    //    CheckIncludedItemsInDivFromArray("divCheckboxesList", "cbAddedItemID", pDepartmentCharge, "ChargeTypeID", null);
    //    FadePageCover(false);
    //}
    //, null);
    //    });

    //$("#liGroupName").text("Administration");
    //$("#liGroupName").attr("onclick", "LoadViews('Settings');");
    //$("#liTabName").text("Settings");
    //$("#liTabName").attr("onclick", "LoadViews('Settings');");

    strBindTableRowsFunctionName = "ChooseReports_BindTableRows";
    strLoadWithPagingFunctionName = "/api/ChooseReports/LoadAll"; // I am sure i ve just one row isa

    LoadView("/Administration/ChooseReports", "div-content", function () {
        $.getScript(strServerURL + '/Scripts/Administration/FavoriteReports/ChooseReports.js?' + glbVersion, function () {//sherif:loadwithpaging fn is callback in $.getscript
            LoadAll(strLoadWithPagingFunctionName, "3000,1200,1300", function (pTabelRows) {
                FillListFromObject_ERP(null, 2/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slMainReport", pTabelRows[1], null);
            });

            LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, 0, 10, function (pTabelRows) { ChooseReports_BindTableRows(pTabelRows); });

        });


        $("#liFormName").text("Favorite Reports");
        $("#h3Label").text("Choose Favorite Reports");

        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    },
        function () { ChooseReports_ClearAllControls(); },
        function () { ChooseReports_DeleteList(); });

}

function ChooseReports_BindTableRows(pChooseReports) {
    debugger;
    $("#hl-menu-Administration").parent().addClass("active");
    ClearAllTableRows("tblChooseReports");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pChooseReports, function (i, item) {
        AppendRowtoTable("tblChooseReports",
        ("<tr ID='" + item.ID + "' ondblclick='ChooseReports_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='OriginalGroupName'>" + (item.OriginalGroupName == 0 ? "" : item.OriginalGroupName) + "</td>"
                    + "<td class='FormImageName'>" + (item.FormImageName == 0 ? "" : item.FormImageName) + "</td>"
                    + "<td class='hide'><a href='#ChooseReportsModal' data-toggle='modal' onclick='ChooseReports_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblChooseReports", "ID");
    CheckAllCheckbox("ID");
   // HighlightText("#tblChooseReports>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function ChooseReports_EditByDblClick(pID) {
    jQuery("#ChooseReportsModal").modal("show");
    ChooseReports_FillControls(pID);
}

function ChooseReports_FillSubReport() {
    debugger;
    if ($("#slMainReport").val() == 0) //No Account is selected so just empty subaccounts
        $("#slSubReport").html("<option value=0>" + TranslateString("SelectFromMenu") + "</option>");
    else {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/ChooseReports/LoadSubReport"
            , {
                  pMainReport: ($("#slMainReport").val() == '' ? 0 : $("#slMainReport").val() )
            }
            , function (pData) {
                FillListFromObject_ERP(0, 2/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slSubReport", pData[0], null);
                FadePageCover(false);
            }
            , null);
    }
}
// Loading with data
function ChooseReports_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/ChooseReports/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { ChooseReports_BindTableRows(pTabelRows); });
    HighlightText("#tblChooseReports>tbody>tr", $("#txt-Search").val().trim());
    //if (callbackForDeleteFail != null)
    //    callbackForDeleteFail();
}
function ChooseReports_Save(pSaveandAddNew) {
    debugger;
    if ($('#slSubReport').val() != 0) {
        FadePageCover(true);
        var pParametersWithValues = {
            pID: $('#slSubReport').val() == "" ? 0 : $('#slSubReport').val()
        };
        CallPOSTFunctionWithParameters("/api/ChooseReports/Save", pParametersWithValues
            , function (pData) {
                var _MessageReturned = pData[0];
                if (_MessageReturned == "") {
                    ChooseReports_LoadingWithPaging();
                    swal("success", "Saved successfully.");
                    if (pSaveandAddNew)
                        ChooseReports_ClearAllControls();
                    else
                        jQuery("#ChooseReportsModal").modal("hide");
                }
                else {
                    swal("Sorry", _MessageReturned);
                    FadePageCover(false);
                }
            }
            , null);
    }
    else
        swal("Sorry", "Please, choose sub report first.");

}
function ChooseReports_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblChooseReports') != "")
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
            DeleteListFunction("/api/ChooseReports/Delete", { "pIDs": GetAllSelectedIDsAsString('tblChooseReports') }, function () {
                ChooseReports_LoadingWithPaging(
                    //this is callback in ChooseReports_LoadingWithPaging
                    //function() {swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");}
                    );
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}
function ChooseReports_FillControls(pID) {
    ClearAll("#ChooseReportsModal");
    
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    //$("#lblShown").html(": " + $(tr).find("td.Name").text());
    //$("#lblShownDeparmentCharge").html(" : " + $(tr).find("td.Name").text());

    //$("#txtCode").val($(tr).find("td.Code").text());
    //$("#txtName").val($(tr).find("td.Name").text());
    //$("#txtNotes").val($(tr).find("td.Notes").text());


    //$("#cbIsOcean").prop("checked", $("#cbIsOcean" + pID).prop("checked"));
    $("#btnSave").attr("onclick", "ChooseReports_Save(false);");
    $("#btnSaveandNew").attr("onclick", "ChooseReports_Save(true);");
}
function ChooseReports_ClearAllControls(callback) {
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName", "txtNotes"), null, new Array("cbIsInactive"));//an alternative fn is with abdelmawgood
    ClearAll("#ChooseReportsModal");

    $("#btnSave").attr("onclick", "ChooseReports_Save(false);");
    $("#btnSaveandNew").attr("onclick", "ChooseReports_Save(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
}


