// This file is containing fns. to select MAWB for Master Air Operations
function MAWBStockSelect_BindTableRows(pMAWBStockSelect) {
    debugger;
    ClearAllTableRows("tblMAWBStockSelect");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pMAWBStockSelect, function (i, item) {
        AppendRowtoTable("tblMAWBStockSelect",
        //("<tr ID='" + item.ID + "'>"
        ("<tr ID='" + item.ID + "' ondblclick='MAWBStockSelect_SetMAWB_ByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='AirlineID hide'>" + item.AirlineID + "</td>"
                    + "<td class='AirlineName hide'>" + item.AirlineName + "</td>"
                    + "<td class='MAWBSuffix'>" + (item.MAWBSuffix == 0 ? "" : item.MAWBSuffix) + "</td>"
                    + "<td class='InsertionDate'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + "</td>"
                    + "<td class='AssignedToOperationID hide'>" + item.AssignedToOperationID + "</td>"
                    + "<td class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                    + "<td class='hide'><a href='#MAWBStockModal' data-toggle='modal' onclick='MAWBStockSelect_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblMAWBStockSelect", "ID", "cb-CheckAll-MAWBStockSelect");
    CheckAllCheckbox("HeaderDeletetblMAWBStockSelectID");
    HighlightText("#tblMAWBStockSelect>tbody>tr", $("#txtMAWBStockSelectSearch").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    //MAWBStockSelect_Summary();
}
function MAWBStockSelect_LoadingWithPagingForModal(pID) {//pID = ID and it is the search key which will be used in the where clause
    debugger;
    var tr = $("tr[ID='" + pID + "']");

    strLoadWithPagingFunctionName = "/api/MAWBStock/LoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    strBindTableRowsFunctionName = "MAWBStockSelect_BindTableRows";
    var pWhereClause = " WHERE AirlineID = " + pID;
    pWhereClause += " AND AssignedToOperationID IS NULL ";
    pWhereClause += ($("#txtMAWBStockSelectSearch").val().trim() == "" && $("#txtMAWBStockSelectSearch").val() == undefined
        ? ""
        : " AND MAWBSuffix LIKE '%" + $("#txtMAWBStockSelectSearch").val().trim() + "%'");
    var pOrderBy = " MAWBSuffix ";
    LoadWithPagingForModal("/api/MAWBStock/LoadWithPaging", pWhereClause, pOrderBy, 1 /*($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1)*/, $('#select-page-size').val().trim(), function (pTabelRows) {
        MAWBStockSelect_BindTableRows(pTabelRows); //TaxeTypes_ClearAllControls();
    });
}
function MAWBStockSelect_ManageMAWBStock() {
    debugger;
    if ($("#hMAWBStockID").val() == "0") //this means Get From Stock
    {
        ClearAll("#MAWBStockSelectModal", null);
        $("#btn-MAWBStockSelectSearch").attr("onclick", "MAWBStockSelect_LoadingWithPagingForModal(" + $("#slRoutingsLines").val() + ");");
        MAWBStockSelect_LoadingWithPagingForModal($("#slRoutingsLines").val());
    }
    else //Return to Stock
        MAWBStockSelect_ReturnMAWBToStock();
}
//Setting MAWB From Stock
function MAWBStockSelect_SetMAWB_ByDblClick(pID) {
    debugger;///////////////////////////////////////////////////////sherif check here for session conflict
    var tr = $("#tblMAWBStockSelect tr[ID='" + pID + "']");
    
    CallGETFunctionWithParameters("/api/Routings/SetMAWB", { pRoutingID: $("#hRoutingID").val(), pOperationID: $("#hOperationID").val(), pMAWBStockID: pID, pMAWBPrefix: $("#slRoutingsLines option:selected").attr("Prefix"), pMAWBSuffix: $(tr).find("td.MAWBSuffix").text(), pAirlineID: $("#slRoutingsLines").val(), pVoyageOrTruckNumber: ($("#txtRoutingVoyageOrTruckNumber").val().trim() == "" ? "0" : $("#txtRoutingVoyageOrTruckNumber").val().trim().toUpperCase()) }
        , function (data) {
            if (data[1] != "") //message returned so show it
                swal(strSorry, data[1]);
            else {
                jQuery.noConflict();
                (function ($) {
                    $("#MAWBStockSelectModal").modal('hide');
                }
                )(jQuery);
                debugger;
                $("#hMAWBStockID").val(pID);
                $("#hMAWBSuffix").val($(tr).find("td.MAWBSuffix").text());
                $("#txtMAWBSuffix").val($(tr).find("td.MAWBSuffix").text());
                $("#tblRoutings tr[id=" + $("#hRoutingID").val() + "] td.VoyageOrTruckNumber").text($("#txtRoutingVoyageOrTruckNumber").val());
                var AutomaticallySetDate = new Date(); //to set $("#txtMAWBDate") incase of Saving Operation after setting MAWB from stock not to return to the old date
                var FormattedAutomaticallySetDate = ConvertDateFormat(AutomaticallySetDate.toLocaleDateString());
                $("#txtMAWBDate").val(FormattedAutomaticallySetDate);
                $("#hBLDate").val(FormattedAutomaticallySetDate);
                $("#hMasterBL").val($("#slRoutingsLines option:selected").attr("Prefix") + "-" + $("#hMAWBSuffix").val());
                $("#lblMaster").html(" :" + $("#hMasterBL").val());

                Routings_Remove_DataTarget_Attr_From_btnMAWBStock();
                Routings_Set_btnMAWBStockCaption();
                Routings_DisableLines();
                Routings_DisableMAWBSuffix();
                $("#tblRoutings tr[id=" + $("#hRoutingID").val() + "] td.Line").attr("val", $("#slRoutingsLines").val());
                $("#tblRoutings tr[id=" + $("#hRoutingID").val() + "] td.Line").text($("#slRoutingsLines option:selected").text());
            }
        });
    
}
//Returning MAWB to Stock
function MAWBStockSelect_ReturnMAWBToStock() {
    CallGETFunctionWithParameters("/api/Routings/SetMAWB", { pRoutingID: $("#hRoutingID").val(), pOperationID: $("#hOperationID").val(), pMAWBStockID: $("#hMAWBStockID").val() }//, null
        , function () {
            debugger;
            $("#hMAWBStockID").val("0");
            $("#hMAWBSuffix").val("");
            $("#txtMAWBSuffix").val("");
            $("#txtMAWBDate").val("");
            $("#hBLDate").val("");
            $("#hMasterBL").val("");
            $("#lblMaster").html(" :N/A");
            
            Routings_Add_DataTarget_Attr_To_btnMAWBStock();
            Routings_Set_btnMAWBStockCaption();
            Routings_EnableLines();
            Routings_EnableMAWBSuffix();
        });
}
//to reset function names as in mainapp.master
function MAWBStockSelect_ResetFunctionsNames() {
    strLoadWithPagingFunctionName = "/api/Operations/LoadOperationWithDetails";//sherif: to fix paging cz it calls whats related to the original table

    strBindTableRowsFunctionName = "OperationsEdit_BindTableRows";
}
function MAWBStockSelect_Delete() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblMAWBStockSelect') != "")
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
            DeleteListFunction("/api/MAWBStock/Delete", { "pMAWBStockIDs": GetAllSelectedIDsAsString('tblMAWBStockSelect') }, function () {
                //MAWBStockSelect_LoadAll($("#slRoutingsLines").val());
                MAWBStockSelect_LoadingWithPagingForModal($("#slRoutingsLines").val());
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}
function MAWBStockSelect_GenerateModal_ClearAllControls() {
    debugger;
    ClearAll("#MAWBStockModal", null);

    //$("#lblMAWBStockShown").html($("#lblShown").html());

    $("#cbIsAddByEndNumber").prop("checked", true);
    $("#cbIsAddByAmount").prop("checked", false);
    MAWBStock_AddByChanged(); //to set the MAWBStockControls

    //$("#btnSaveMAWBStock").attr("onclick", "MAWBStock_Insert(false);");
    //$("#btnSaveandNewMAWBStock").attr("onclick", "MAWBStock_Insert(true);");

    $("#btnGenerateMAWBStock").attr("onclick", "MAWBStockSelect_GenerateMAWBStock();");
}
function MAWBStockSelect_GenerateMAWBStock() {
    if ($("#txtStartNumber").val().length != 7 || $("#txtEndNumber").val().length != 7)
        swal(strSorry, 'The Start and End Numbers must be 7 digits.');
    else
        if (parseInt($("#txtEndNumber").val()) < parseInt($("#txtStartNumber").val()))
            swal(strSorry, 'The Start Number must be smaller than the End number.');
        else
            if (parseInt($("#txtMAWBStockAmount").val()) > maxMAWBGeneratedTogether)
                swal(strSorry, 'You can not generate more than ' + maxMAWBGeneratedTogether.toString() + ' MAWBs at a time.');
            else
                if (parseInt($("#txtStartNumber").val()) == 0)
                    swal(strSorry, 'The BL number can not be 00000000.');
                else //Correct Limits
                    CallGETFunctionWithParameters("/api/MAWBStock/GenerateMAWBStock", { pAirlineID: $("#slRoutingsLines").val(), pStartNumber: $("#txtStartNumber").val(), pEndNumber: $("#txtEndNumber").val(), pAmount: $("#txtMAWBStockAmount").val() }
                        , function (pMAWBSuffix) { //pMAWBSuffix is empty string if OK and holds MAWBSuffix if exists)
                            if (pMAWBSuffix == "") {
                                MAWBStockSelect_LoadingWithPagingForModal($("#slRoutingsLines").val());
                                jQuery("#MAWBStockModal").modal('hide');
                            }
                            else
                                swal(strSorry, "MAWB '" + pMAWBSuffix + "' either exists or used before for this airline.");
                    });
}