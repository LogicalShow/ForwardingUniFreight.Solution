function CommissionTarget_BindTableRows(pCommissionTarget) {
    debugger;
    $("#hl-menu-CRM").parent().addClass("active");
    ClearAllTableRows("tblCommissionTarget");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pCommissionTarget, function (i, item) {
        AppendRowtoTable("tblCommissionTarget",
        ("<tr ID='" + item.ID + "' ondblclick='CommissionTarget_FillAllControls(" + item.ID + ");'>"
            + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='SalesmanID hide'>" + item.SalesmanID + "</td>"
            + "<td class='SalesmanName'>" + item.SalesmanName + "</td>"
            + "<td class='TargetYear'>" + item.TargetYear + "</td>"
            //+ "<td class='TargetMonth hide'>" + item.TargetMonth + "</td>"
            //+ "<td class='TargetMonthName'>" + item.TargetMonthName + "</td>"
            + "<td class='TargetTypeID hide'>" + item.TargetTypeID + "</td>"
            + "<td class='TargetTypeName'>" + item.TargetTypeName + "</td>"
            //+ "<td class='Amount'>" + (item.Amount == 0 ? "" : item.Amount) + "</td>"
            //+ "<td class='Percentage'>" + (item.Percentage == 0 ? "" : (item.Percentage + ' ' + '%')) + "</td>"
            //+ "<td class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
            //+ "<td class='FromDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.FromDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.FromDate))) + "</td>"
            //+ "<td class='IsFinalized hide'> <input type='checkbox' id='cbIsFinalized" + item.ID + "' disabled='disabled' " + (item.IsFinalized ? " checked='checked' " : "") + " /></td>"
            + "<td class='hide'><a href='#CommissionTargetModal' data-toggle='modal' onclick='CommissionTarget_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblCommissionTarget", "ID");
    CheckAllCheckbox("ID");
    //HighlightText("#tblCommissionTarget>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function CommissionTarget_LoadingWithPaging() {
    debugger;
    var pWhereClause = CommissionTarget_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "TargetYear DESC, SalesmanName";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { CommissionTarget_BindTableRows(JSON.parse(pData[0])); });
    //HighlightText("#tblCommissionTarget>tbody>tr", $("#txt-Search").val().trim());
}
function CommissionTarget_GetWhereClause() {
    debugger;
    var pWhereClause = "WHERE 1=1";
    if ($("#slFilterSalesman").val().trim() != "")
        pWhereClause += "AND (SalesmanID=N'" + $("#slFilterSalesman").val() + "')" + "\n";
    if ($("#slFilterTargetType").val().trim() != "")
        pWhereClause += "AND (TargetTypeID=N'" + $("#slFilterTargetType").val() + "')" + "\n";
    if ($("#slFilterTargetYear").val().trim() != "")
        pWhereClause += "AND (TargetYear=N'" + $("#slFilterTargetYear").val().trim().toUpperCase() + "')" + "\n";
    //if ($("#slFilterFromTargetMonth").val().trim() != "")
    //    pWhereClause += "AND (TargetMonth >= " + $("#slFilterFromTargetMonth").val().trim().toUpperCase() + ")" + "\n";
    //if ($("#slFilterToTargetMonth").val().trim() != "")
    //    pWhereClause += "AND (TargetMonth <= " + $("#slFilterToTargetMonth").val().trim().toUpperCase() + ")" + "\n";
    //if (isValidDate($("#txtFilterFromReceiveDate").val().trim(), 1)) {
    //    if ($("#txtFilterFromReceiveDate").val() != null && $("#txtFilterFromReceiveDate").val() != "")
    //        pWhereClause += " AND (ReceiveDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFilterFromReceiveDate").val()) + " 00:00:00.000')" + "\n";
    //}
    //if (isValidDate($("#txtFilterToReceiveDate").val().trim(), 1)) {
    //    if ($("#txtFilterToReceiveDate").val() != null && $("#txtFilterToReceiveDate").val() != "")
    //        pWhereClause += " AND (ReceiveDate <= '" + GetDateWithFormatyyyyMMdd($("#txtFilterToReceiveDate").val()) + " 23:59:59.999')" + "\n";
    //}
    return pWhereClause;
}
function CommissionTarget_ClearAllControls() {
    debugger;
    $(".classPercentage").attr("disabled", "disabled");
    $(".classAmount").removeAttr("disabled");
    var TodaysDate = new Date();
    var CurrentYear = TodaysDate.getUTCFullYear();
    ClearAll("#CommissionTargetModal");
    $("#slTargetYear").val(CurrentYear);
    $("#slTargetType").val(constTargetTypeByInvoiceFixedAmount);
    $("#btnSave").attr("onclick", "CommissionTarget_Save(false);");
    $("#btnSaveAndAddNew").attr("onclick", "CommissionTarget_Save(true);");
    $("#cb-CheckAll").prop('checked', false);
}
function CommissionTarget_FillAllControls(pID) {
    debugger;
    //$("#txtNumberOfLevelsPerCommissionTarget").attr("disabled", "disabled");
    //$("#txtNumberOfTraysPerLevel").attr("disabled", "disabled");
    ClearAll("#CommissionTargetModal");
    jQuery("#CommissionTargetModal").modal("show");
    FadePageCover(true);
    var tr = $("#tblCommissionTarget tr[ID='" + pID + "']");

    $("#slSalesman").val($(tr).find("td.SalesmanID").text());
    $("#slTargetType").val($(tr).find("td.TargetTypeID").text());
    $("#slTargetYear").val($(tr).find("td.TargetYear").text());
    CommissionTarget_TargetTypeChanged();
    CallGETFunctionWithParameters("/api/CommissionTarget/LoadHeaderWithDetails", { pHeaderID: pID }
        , function (pData) {
            var pCommissionTarget = JSON.parse(pData[0]);
            $.each(pCommissionTarget, function (i, item) {
                $("#hID" + (i + 1)).val(item.ID);
                $("#txtAmount" + (i + 1)).val(item.Amount == 0 ? "" : item.Amount);
                $("#txtPercentage" + (i + 1)).val(item.Percentage == 0 ? "" : (item.Percentage));
            });
            FadePageCover(false);
        }
        , null);

    $("#btnSave").attr("onclick", "CommissionTarget_Save(false);");
    $("#btnSaveAndAddNew").attr("onclick", "CommissionTarget_Save(true);");
}
//pReleaseDate: ($("#txtOperationReleaseDate").val().trim() == "" ? "0" : PadDateWithZeroes($("#txtOperationReleaseDate").val().trim())),
function CommissionTarget_Save(pSaveAndNew) {
    debugger;
    FadePageCover(true);
    //if (!isValidDate($("#txtFromDate").val().trim(), 1) || !isValidDate($("#txtToDate").val().trim(), 1)) {
    //    swal(strSorry, "Please, Enter Start-End dates.");
    //    FadePageCover(false);
    //}
    //else if ($("#txtFromDate").val().trim() != "" && $("#txtToDate").val().trim() != ""
    //    && Date.prototype.compareDates(ConvertDateFormat($("#txtFromDate").val().trim()), ConvertDateFormat($("#txtToDate").val().trim())) < 0) {
    //    FadePageCover(false);
    //    swal("Sorry", "Please, check dates.");
    //}
    //else 
    if (ValidateForm("form", "CommissionTargetModal")) {
        pParametersWithValues = {
            pSalesmanID: $("#slSalesman").val() == "" ? "0" : $("#slSalesman").val()
            , pTargetYear: $("#slTargetYear").val() == "" ? "0" : $("#slTargetYear").val()
            , pTargetTypeID: $("#slTargetType").val() == "" ? "0" : $("#slTargetType").val()
            , pNotes: $("#txtNotes").val().trim() == "" ? "0" : $("#txtNotes").val().trim().toUpperCase()
            , pID1: $("#hID1").val() == "" ? 0 : $("#hID1").val()
            , pTargetMonth1: $("#slTargetMonth1").val()
            , pAmount1: $("#txtAmount1").val().trim() == "" ? "0" : $("#txtAmount1").val().trim().toUpperCase()
            , pPercentage1: $("#txtPercentage1").val().trim() == "" ? "0" : $("#txtPercentage1").val().trim().toUpperCase()
            , pID2: $("#hID2").val() == "" ? 0 : $("#hID2").val()
            , pTargetMonth2: $("#slTargetMonth2").val()
            , pAmount2: $("#txtAmount2").val().trim() == "" ? "0" : $("#txtAmount2").val().trim().toUpperCase()
            , pPercentage2: $("#txtPercentage2").val().trim() == "" ? "0" : $("#txtPercentage2").val().trim().toUpperCase()
            , pID3: $("#hID3").val() == "" ? 0 : $("#hID3").val()
            , pTargetMonth3: $("#slTargetMonth3").val()
            , pAmount3: $("#txtAmount3").val().trim() == "" ? "0" : $("#txtAmount3").val().trim().toUpperCase()
            , pPercentage3: $("#txtPercentage3").val().trim() == "" ? "0" : $("#txtPercentage3").val().trim().toUpperCase()
            , pID4: $("#hID4").val() == "" ? 0 : $("#hID4").val()
            , pTargetMonth4: $("#slTargetMonth4").val()
            , pAmount4: $("#txtAmount4").val().trim() == "" ? "0" : $("#txtAmount4").val().trim().toUpperCase()
            , pPercentage4: $("#txtPercentage4").val().trim() == "" ? "0" : $("#txtPercentage4").val().trim().toUpperCase()
            , pID5: $("#hID5").val() == "" ? 0 : $("#hID5").val()
            , pTargetMonth5: $("#slTargetMonth5").val()
            , pAmount5: $("#txtAmount5").val().trim() == "" ? "0" : $("#txtAmount5").val().trim().toUpperCase()
            , pPercentage5: $("#txtPercentage5").val().trim() == "" ? "0" : $("#txtPercentage5").val().trim().toUpperCase()
            , pID6: $("#hID6").val() == "" ? 0 : $("#hID6").val()
            , pTargetMonth6: $("#slTargetMonth6").val()
            , pAmount6: $("#txtAmount6").val().trim() == "" ? "0" : $("#txtAmount6").val().trim().toUpperCase()
            , pPercentage6: $("#txtPercentage6").val().trim() == "" ? "0" : $("#txtPercentage6").val().trim().toUpperCase()
            , pID7: $("#hID7").val() == "" ? 0 : $("#hID7").val()
            , pTargetMonth7: $("#slTargetMonth7").val()
            , pAmount7: $("#txtAmount7").val().trim() == "" ? "0" : $("#txtAmount7").val().trim().toUpperCase()
            , pPercentage7: $("#txtPercentage7").val().trim() == "" ? "0" : $("#txtPercentage7").val().trim().toUpperCase()
            , pID8: $("#hID8").val() == "" ? 0 : $("#hID8").val()
            , pTargetMonth8: $("#slTargetMonth8").val()
            , pAmount8: $("#txtAmount8").val().trim() == "" ? "0" : $("#txtAmount8").val().trim().toUpperCase()
            , pPercentage8: $("#txtPercentage8").val().trim() == "" ? "0" : $("#txtPercentage8").val().trim().toUpperCase()
            , pID9: $("#hID9").val() == "" ? 0 : $("#hID9").val()
            , pTargetMonth9: $("#slTargetMonth9").val()
            , pAmount9: $("#txtAmount9").val().trim() == "" ? "0" : $("#txtAmount9").val().trim().toUpperCase()
            , pPercentage9: $("#txtPercentage9").val().trim() == "" ? "0" : $("#txtPercentage9").val().trim().toUpperCase()
            , pID10: $("#hID10").val() == "" ? 0 : $("#hID10").val()
            , pTargetMonth10: $("#slTargetMonth10").val()
            , pAmount10: $("#txtAmount10").val().trim() == "" ? "0" : $("#txtAmount10").val().trim().toUpperCase()
            , pPercentage10: $("#txtPercentage10").val().trim() == "" ? "0" : $("#txtPercentage10").val().trim().toUpperCase()
            , pID11: $("#hID11").val() == "" ? 0 : $("#hID11").val()
            , pTargetMonth11: $("#slTargetMonth11").val()
            , pAmount11: $("#txtAmount11").val().trim() == "" ? "0" : $("#txtAmount11").val().trim().toUpperCase()
            , pPercentage11: $("#txtPercentage11").val().trim() == "" ? "0" : $("#txtPercentage11").val().trim().toUpperCase()
            , pID12: $("#hID12").val() == "" ? 0 : $("#hID12").val()
            , pTargetMonth12: $("#slTargetMonth12").val()
            , pAmount12: $("#txtAmount12").val().trim() == "" ? "0" : $("#txtAmount12").val().trim().toUpperCase()
            , pPercentage12: $("#txtPercentage12").val().trim() == "" ? "0" : $("#txtPercentage12").val().trim().toUpperCase()
        };
        CallGETFunctionWithParameters("/api/CommissionTarget/Save", pParametersWithValues
            , function (pData) {
                if (pData[0] == "") {
                    //var pCommissionTargetHeader = JSON.parse(pData[2]);
                    if (pSaveAndNew) {
                        CommissionTarget_ClearAllControls();
                    }
                    else {
                        jQuery("#CommissionTargetModal").modal("hide");
                    }
                    CommissionTarget_LoadingWithPaging();
                    swal("Success", "Saved successfully.");
                }
                else {
                    swal("Sorry", pData[0]);
                    FadePageCover(false);
                }
            }
            , null);
    }
    else //if (ValidateForm("form", "CommissionTargetModal"))
        FadePageCover(false);
}
function CommissionTarget_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblCommissionTarget') != "")
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
            DeleteListFunction("/api/CommissionTarget/Delete", { "pCommissionTargetIDs": GetAllSelectedIDsAsString('tblCommissionTarget') }, function () { CommissionTarget_LoadingWithPaging(); });
        });
    //DeleteListFunction("/api/CommissionTarget/Delete", { "pCommissionTargetIDs": GetAllSelectedIDsAsString('tblCommissionTarget') }, function () { CommissionTarget_LoadingWithPaging(); });
}
function CommissionTarget_TargetTypeChanged() {
    debugger;
    if ($("#slTargetType").val() == constTargetTypeByInvoiceFixedAmount
        || $("#slTargetType").val() == constTargetTypeByProfitFixedAmount) {
        $(".classPercentage").attr("disabled", "disabled");
        $(".classPercentage").val("");
        $(".classAmount").removeAttr("disabled");
    }
    else {
        $(".classAmount").attr("disabled", "disabled");
        $(".classAmount").val("");
        $(".classPercentage").removeAttr("disabled");
    }
}
/**********************************SalesReport********************************************/
function BusinessVolume_Print_Old(pOutputTo) {
    debugger;
    if ($("#slFilterTargetYear").val() == "")
        swal("Sorry", "Please, Select year.");
    else {
        FadePageCover(true);
        var pWhereClauseSalesReport = SalesReport_GetWhereClause();
        var pParametersWithValues = {
            pLanguage: $("[id$='hf_ChangeLanguage']").val()
            , pPageNumber: 1
            , pPageSize: 99999
            , pWhereClauseSalesReport: pWhereClauseSalesReport
            , pOrderBy: "SalesmanName"
            , pReportFormat: $("#cbFixedAmountTarget").prop("checked") ? 10 : 20
            , pWhereClauseGetFixedTarget: SalesReport_GetWhereClauseFixedTarget()
        };
        CallGETFunctionWithParameters("/api/CommissionTarget/LoadSalesReportData"
                , pParametersWithValues
                , function (pData) {
                    var pReportRows = JSON.parse(pData[0]);
                    if (pReportRows.length > 0) { //pRecordsExist
                        if ($("#cbFixedAmountTarget").prop("checked"))
                            SalesReport_DrawReport_FixedAmountTarget(pData, pOutputTo);
                        else
                            SalesReport_DrawReport_PercentageTarget(pData, pOutputTo);
                    }
                    else
                        swal(strSorry, "No records are found.");
                    FadePageCover(false);
                });
    }
}
function BusinessVolume_Print(pOutputTo)
{
    debugger;
    var arr_Keys = new Array();
    var arr_Values = new Array();
    arr_Keys.push("WhereClause");
    arr_Keys.push("pPrintString");
    var WhereClause = SalesReport_GetWhereClause();
    arr_Values.push(WhereClause);
    arr_Values.push(GetReportHeader());
    var ReportTitle = '';
    var ReportName = '';
    if ($("#cbOperations").prop('checked')) { ReportTitle = 'Work Volume Operations'; ReportName = 'WorkVolume_Operations'; }
    if ($("#cbPayables").prop('checked')) { ReportTitle = 'Work Volume Payables'; ReportName = 'WorkVolume_Payables'; }
    if ($("#cbProfit").prop('checked')) { ReportTitle = 'Work Volume Profit'; ReportName = 'WorkVolume_Profit'; }
    if ($("#cbReceivable").prop('checked')) { ReportTitle = 'Work Volume Receivable'; ReportName = 'WorkVolume_Receivable'; }
    var pParametersWithValues =
        {
            arr_Keys: arr_Keys
            , arr_Values: arr_Values
            , pTitle: ReportTitle
            , pReportName: ReportName
        };
    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintPS_Payment?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

    win.location = url;
}


function SalesReport_GetWhereClause() {
    debugger;
    var pWhereClause = "  WHERE 1=1 ";
    if ($("#slFilterSalesman").val().trim() != "")
        pWhereClause += "AND (UserID=N'" + $("#slFilterSalesman").val() + "')" + "\n";
    if ($("#slFilterTargetType").val().trim() != "")
        pWhereClause += "AND (BranchID=N'" + $("#slFilterTargetType").val() + "')" + "\n";
    if ($("#slFilterTargetYear").val().trim() != "")
        pWhereClause += "AND (Year(_Date)=N'" + $("#slFilterTargetYear").val().trim().toUpperCase() + "')" + "\n";
    if ($("#slFilterFromTargetMonth").val().trim() != "")
        pWhereClause += "AND (Month(_Date) >= " + $("#slFilterFromTargetMonth").val().trim().toUpperCase() + ")" + "\n";
    if ($("#slFilterToTargetMonth").val().trim() != "")
        pWhereClause += "AND (Month(_Date) <= " + $("#slFilterToTargetMonth").val().trim().toUpperCase() + ")" + "\n";
    //if ($("#txtFromDate").val().trim() != "")
        //pWhereClause += "AND ((_Date) > '" + ConvertToDBDate($("#txtFromDate").val().trim().toUpperCase()) + "')" + "\n";
    //if ($("#txtToDate").val().trim() != "")
        //pWhereClause += "AND ((_Date) < '" + ConvertToDBDate($("#txtToDate").val().trim().toUpperCase()) + "')" + "\n";
    if ($("#txtFromDate").val().trim() != "" && $("#txtToDate").val().trim() != "")
        pWhereClause += "  AND _Date BETWEEN '" + ConvertToDBDate($("#txtFromDate").val().trim().toUpperCase()) + "' AND  '" + ConvertToDBDate($("#txtToDate").val().trim().toUpperCase()) + "'";
    return pWhereClause;
}

function ConvertToDBDate(_date)
{
    var SplittedDate = _date.split("/");
    return (SplittedDate[2] + "-" + SplittedDate[1] + "-" + SplittedDate[0])
}
function GetReportHeader()
{
    debugger;
    var pReportHeader = "   ";
    if ($("#slFilterSalesman").val().trim() != "")
        pReportHeader += "      User Name : " + $('#slFilterSalesman  option:selected').text() + "";
    if ($("#slFilterTargetType").val().trim() != "")
        pReportHeader += "      Branch : " + $('#slFilterTargetType  option:selected').text() + "";
    if ($("#slFilterTargetYear").val().trim() != "")
        pReportHeader += "      Year : " + $('#slFilterTargetYear  option:selected').text() + "";
    if ($("#slFilterFromTargetMonth").val().trim() != "")
        pReportHeader += "      From Date : " + $('#slFilterFromTargetMonth  option:selected').text() + "";
    if ($("#slFilterToTargetMonth").val().trim() != "")
        pReportHeader += "      To Date : " + $('#slFilterToTargetMonth  option:selected').text() + "";

    return pReportHeader;
}

function SalesReport_GetWhereClauseFixedTarget() {
    debugger;
    var pWhereClause = "WHERE 1=1 ";
    if ($("#slFilterSalesman").val().trim() != "")
        pWhereClause += "AND (SalesmanID=N'" + $("#slFilterSalesman").val() + "')" + "\n";
    if ($("#slFilterTargetType").val().trim() != "")
        pWhereClause += "AND (TargetTypeID=N'" + $("#slFilterTargetType").val() + "')" + "\n";
    if ($("#slFilterTargetYear").val().trim() != "")
        pWhereClause += "AND (TargetYear=N'" + $("#slFilterTargetYear").val().trim().toUpperCase() + "')" + "\n";
    if ($("#slFilterFromTargetMonth").val().trim() != "")
        pWhereClause += "AND (TargetMonth >= " + $("#slFilterFromTargetMonth").val().trim().toUpperCase() + ")" + "\n";
    if ($("#slFilterToTargetMonth").val().trim() != "")
        pWhereClause += "AND (TargetMonth <= " + $("#slFilterToTargetMonth").val().trim().toUpperCase() + ")" + "\n";
    return pWhereClause;
}
function SalesReport_DrawReport_FixedAmountTarget(pData, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(pData[0]);
    var pReportTitle = "Sales Report";

    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTablesHTML = "";
    //ReportHTML += '                         <table id="tblProfitabilityReport" class="table table-striped text-sm table-hover b-t b-r b-b b-l print">';//remove t1 class to remove row numbers
    pTablesHTML += '                         <table id="tblSalesReport" class="table table-striped text-sm table-bordered  " style="border:solid #000 !important;">';//style="border-left:solid #999 !important;border-top:solid #999 !important;"
    pTablesHTML += '                             <thead>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                     <th>Salesman</th>';
    pTablesHTML += '                                     <th>Target</th>';
    pTablesHTML += '                                     <th>Actual</th>';
    pTablesHTML += '                                     <th>Percentage</th>';
    pTablesHTML += '                                 </tr>';
    pTablesHTML += '                             </thead>';
    pTablesHTML += '                             <tbody>';
    $.each((pReportRows), function (i, item) {
        var _SalesPercentage = 0;
        var _Profit = (item.Receivables - item.Payables);
        if (item.TargetTypeID == constTargetTypeByInvoiceFixedAmount)
            _SalesPercentage = (item.Receivables * 100 / item.FixedAmount);
        else if (item.TargetTypeID == constTargetTypeByProfitFixedAmount)
            _SalesPercentage = (_Profit * 100 / item.FixedAmount);
        pTablesHTML += '                             <tr style="font-size:95%;">';
        pTablesHTML += '                                 <td>' + (item.SalesmanName == 0 ? "" : item.SalesmanName) + '</td>';
        pTablesHTML += '                                 <td>' + item.FixedAmount.toFixed(2) + '</td>';
        pTablesHTML += '                                 <td>' + item.Receivables.toFixed(2) + '</td>';
        pTablesHTML += '                                 <td>' + (_SalesPercentage == 0 || item.FixedAmount == 0 ? "0.00 %" : _SalesPercentage.toFixed(2) + ' %') + '</td>';
        //pTablesHTML += '                                 <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReceiveDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ReceiveDate))) + '</td>';
        pTablesHTML += '                             </tr>';
    });
    pTablesHTML += '                             </tbody>';
    pTablesHTML += '                         </table>';
    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
    /*********************Append table summaries*************************/
    var pTableSummary = "";
    //pTableSummary += '                                     <tr style="font-size:95%;">';
    //pTableSummary += '                                         <td class="font-bold">Totals:</td>';
    //pTableSummary += '                                         <td class="font-bold">' + GetColumnSum("tblSalesReport", "EGP").toFixed(2) + '</td>';
    //pTableSummary += '                                         <td class="font-bold">' + GetColumnSum("tblSalesReport", "USD").toFixed(2) + '</td>';
    //pTableSummary += '                                         <td class="font-bold">' + GetColumnSum("tblSalesReport", "EUR").toFixed(2) + '</td>';
    //pTableSummary += '                                         <td class="font-bold">' + GetColumnSum("tblSalesReport", "Default").toFixed(2) + '</td>';
    //pTableSummary += '                                     </tr>';
    //$("#tblSalesReport" + " tbody").append(pTableSummary);
    if (pOutputTo == "Excel") {
        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblSalesReport", "SalesReport");
    }
    else {
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

        ReportHTML += '             <div class="col-xs-4"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-8"><b>Salesman :</b> ' + $("#slFilterSalesman option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Year :</b> ' + $("#slFilterTargetYear option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>From Month :</b> ' + ($("#slFilterFromTargetMonth").val() == "" ? "January" : $("#slFilterFromTargetMonth option:selected").text()) + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>To Month :</b> ' + ($("#slFilterToTargetMonth").val() == "" ? "December" : $("#slFilterToTargetMonth option:selected").text()) + '</div>';
        //ReportHTML += '             <div class="col-xs-3"><b>Agent :</b> ' + $("#slAgent option:selected").text() + '</div>';
        ////ReportHTML += '             <div class="col-xs-3"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-3"><b>Quot. Status :</b> ' + $("#slQuotationStages option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Period :</b> ' + ($("#txtFromDate").val() == "" && $("#txtToDate").val() == ""
        //                                                                            ? "All Dates"
        //                                                                            : ($("#txtFromDate").val() == "" ? "" : "From " + $("#txtFromDate").val() + " ") + ($("#txtToDate").val() == "" ? "" : "To " + $("#txtToDate").val())) + '</div>';
        //ReportHTML += '             <div class="col-xs-12"><b>ChargeType :</b> ' + $("#slChargeType option:selected").text() + '</div>';
        ////ReportHTML += '                 <section class="panel panel-default">';
        //ReportHTML += '                     <div class="table-responsive">';
        //ReportHTML += '                         <div> &nbsp; </div>'

        ReportHTML += $("#hExportedTable").html(); //pTablesHTML;

        //ReportHTML += '                     </div>';//of table-responsive
        //ReportHTML += '             <div class="col-xs-12"><b>Profit Margin :</b> ' + pMarginSummary + '%</div>';

        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        ////ReportHTML += '         <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';
        //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.IsPrintISOCode input[type=checkbox]").prop("checked"))
        //    ReportHTML += '     <div class="row m-l">' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ISOCode").text() + '</div>';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        ReportHTML += '     </footer>';

        ReportHTML += '</html>';
        mywindow.document.write(ReportHTML);
        mywindow.document.close();
    }
}
function SalesReport_DrawReport_PercentageTarget(pData, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(pData[0]);
    var pReportTitle = "Sales Report";

    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTablesHTML = "";
    //ReportHTML += '                         <table id="tblProfitabilityReport" class="table table-striped text-sm table-hover b-t b-r b-b b-l print">';//remove t1 class to remove row numbers
    pTablesHTML += '                         <table id="tblSalesReport" class="table table-striped text-sm table-bordered  " style="border:solid #000 !important;">';//style="border-left:solid #999 !important;border-top:solid #999 !important;"
    pTablesHTML += '                             <thead>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                     <th>OperationNo</th>';
    pTablesHTML += '                                     <th>Imp/Exp</th>';
    pTablesHTML += '                                     <th>Client</th>';
    pTablesHTML += '                                     <th>Trans.Type</th>';
    pTablesHTML += '                                     <th>Ship.Term</th>';
    pTablesHTML += '                                     <th>POL</th>';
    pTablesHTML += '                                     <th>POD</th>';
    pTablesHTML += '                                     <th>Payables</th>';
    pTablesHTML += '                                     <th>Revenue</th>';
    pTablesHTML += '                                     <th>Profit</th>';
    pTablesHTML += '                                     <th>Sales %</th>';
    pTablesHTML += '                                 </tr>';
    pTablesHTML += '                             </thead>';
    pTablesHTML += '                             <tbody>';
    $.each((pReportRows), function (i, item) {
        pTablesHTML += '                             <tr style="font-size:95%;">';
        var _SalesPercentage = 0;
        var _Profit = (item.Receivables - item.Payables);
        if (item.TargetTypeID == constTargetTypeByInvoicePerc)
            _SalesPercentage = (item.Percentage * item.Receivables / 100).toFixed(2);
        else if (item.TargetTypeID == constTargetTypeByProfitPerc)
            _SalesPercentage = (item.Percentage * _Profit / 100).toFixed(2);
        pTablesHTML += '                                 <td>' + (item.Code == 0 ? "" : item.Code) + '</td>';
        pTablesHTML += '                                 <td>' + item.Code.split('-')[1] + '</td>';
        pTablesHTML += '                                 <td>' + (item.ClientName == 0 ? "" : item.ClientName) + '</td>';
        pTablesHTML += '                                 <td>' + (item.TransportTypeName) + '</td>';
        pTablesHTML += '                                 <td>' + (item.IncotermName == 0 ? "" : item.IncotermName) + '</td>';
        pTablesHTML += '                                 <td>' + (item.POLName == 0 ? "" : item.POLName) + '</td>';
        pTablesHTML += '                                 <td>' + (item.PODName == 0 ? "" : item.PODName) + '</td>';
        pTablesHTML += '                                 <td class="Payables">' + item.Payables.toFixed(2) + '</td>';
        pTablesHTML += '                                 <td class="Revenue">' + item.Receivables.toFixed(2) + '</td>';
        pTablesHTML += '                                 <td class="Profit">' + _Profit.toFixed(2) + '</td>';
        pTablesHTML += '                                 <td class="SalesPercentage">' + _SalesPercentage + '</td>';
        //pTablesHTML += '                                 <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReceiveDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ReceiveDate))) + '</td>';
        pTablesHTML += '                             </tr>';
    });
    pTablesHTML += '                             </tbody>';
    pTablesHTML += '                         </table>';
    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
    /*********************Append table summaries*************************/
    var pTableSummary = "";
    pTableSummary += '                                     <tr style="font-size:95%;">';
    if (pOutputTo == "Excel") {
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td class="font-bold">Total:</td>';
    }
    else
        pTableSummary += '                                         <td colspan="7" class="font-bold">Total:</td>';
    pTableSummary += '                                         <td class="font-bold">' + GetColumnSum("tblSalesReport", "Payables").toFixed(2) + '</td>';
    pTableSummary += '                                         <td class="font-bold">' + GetColumnSum("tblSalesReport", "Revenue").toFixed(2) + '</td>';
    pTableSummary += '                                         <td class="font-bold">' + GetColumnSum("tblSalesReport", "Profit").toFixed(2) + '</td>';
    pTableSummary += '                                         <td class="font-bold">' + GetColumnSum("tblSalesReport", "SalesPercentage").toFixed(2) + '</td>';
    pTableSummary += '                                     </tr>';
    $("#tblSalesReport" + " tbody").append(pTableSummary);
    if (pOutputTo == "Excel") {
        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblSalesReport", "SalesReport");
    }
    else {
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

        ReportHTML += '             <div class="col-xs-4"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-8"><b>Salesman :</b> ' + $("#slFilterSalesman option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Year :</b> ' + $("#slFilterTargetYear option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>From Month :</b> ' + ($("#slFilterFromTargetMonth").val() == "" ? "January" : $("#slFilterFromTargetMonth option:selected").text()) + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>To Month :</b> ' + ($("#slFilterToTargetMonth").val() == "" ? "December" : $("#slFilterToTargetMonth option:selected").text()) + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Period :</b> ' + ($("#txtFromDate").val() == "" && $("#txtToDate").val() == ""
        //                                                                            ? "All Dates"
        //                                                                            : ($("#txtFromDate").val() == "" ? "" : "From " + $("#txtFromDate").val() + " ") + ($("#txtToDate").val() == "" ? "" : "To " + $("#txtToDate").val())) + '</div>';
        //ReportHTML += '             <div class="col-xs-12"><b>ChargeType :</b> ' + $("#slChargeType option:selected").text() + '</div>';
        ////ReportHTML += '                 <section class="panel panel-default">';
        //ReportHTML += '                     <div class="table-responsive">';
        //ReportHTML += '                         <div> &nbsp; </div>'

        ReportHTML += $("#hExportedTable").html(); //pTablesHTML;

        //ReportHTML += '                     </div>';//of table-responsive
        //ReportHTML += '             <div class="col-xs-12"><b>Profit Margin :</b> ' + pMarginSummary + '%</div>';

        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        ////ReportHTML += '         <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';
        //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.IsPrintISOCode input[type=checkbox]").prop("checked"))
        //    ReportHTML += '     <div class="row m-l">' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ISOCode").text() + '</div>';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        ReportHTML += '     </footer>';

        ReportHTML += '</html>';
        mywindow.document.write(ReportHTML);
        mywindow.document.close();
    }
}