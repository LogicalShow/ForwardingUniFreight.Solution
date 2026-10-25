
// #region Master
function CRM_SalesMenTarget_LoadingWithPaging() {
    debugger;

    var pWhereClause = $('#SalesMenTargetSqlQuery').val();


    if (pWhereClause.trim() == "") {
        pWhereClause = "Where 1 = 1";

    }

    var pOrderBy = " ID ";
    var pControllerParameters = { pPageNumber: 1, pPageSize: $("#select-page-size option:selected").text(), pWhereClause: pWhereClause }
    LoadWithPagingWithWhereClauseAndOrderBy("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "api/vwCRM_SalesMenTarget/LoadWithPagingWithWhereClause", pWhereClause, 'ID', 1, 10
        , function (pData) {
            //  console.log(pData[0]);
            CRM_SalesMenTarget_BindTableRows(JSON.parse(pData[0]));



        });

}


function CRM_SalesMenTarget_ClearAllControls() {
    ClearAll("#CRM_SalesMenTargetModal", null);
    CRM_SalesMenTarget_FillSalesMen();
    $('#cboday5').prop('checked', true);
    $('#cboday6').prop('checked', true);
    $('#tblDetails tbody').html("");
    $('#slActions').html('');
    $('#hID').val(0)
    //  $('#txtActionDate').val(getTodaysDateInddMMyyyyFormat());
    // $('#txtNextStepDate').val(getTodaysDateInddMMyyyyFormat());
    FillActions('#slSalesMen', '#slActions', function () {
    });
    $("#btnSave").attr("onclick", "CRM_SalesMenTarget_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "CRM_SalesMenTarget_Insert(true);");
}

var maxDetailsIDInTable = 0;
function Details_NewRow() {
    debugger;
    ++maxDetailsIDInTable;
    // var copyControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'></span>";
    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var dateValidTo = Date.prototype.addDays(ConvertDateFormat(FormattedTodaysDate), 30);

    var tr = "";
    tr += "<tr ID='" + 0 + "' isdeleted='0' tag='item'   counter='" + (maxDetailsIDInTable) + "' value='" + 0 + "'>"
    tr += "     <td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + maxDetailsIDInTable + "' checked='checked' /></td>";
    tr += "     <td class='DetailsID' style='width:2%;'><input " + (1 == 2 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox'  counter='" + (maxDetailsIDInTable) + "'  value='" + 0 + "' /></td>";
    tr += "     <td class='FromDate' style='width:10%;'><input type='text' style='width:100%;font-size:90%;cursor:text;' id='txtFromDate" + maxDetailsIDInTable + "' class='datepicker-input form-control input-sm inputValue' data-date-format='dd/mm/yyyy' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' placeholder='Select Date' data-required='true'  /> </td>";
    tr += "     <td class='ToDate' style='width:10%;'><input type='text' style='width:100%;font-size:90%;cursor:text;' id='txtToDate" + maxDetailsIDInTable + "' class='datepicker-input form-control input-sm inputValue' data-date-format='dd/mm/yyyy' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' placeholder='Select Date' data-required='true'/> </td>";
    tr += "     <td class='TargetNo' style='width:9%;'><input type='text' style='width:100%;font-size:90%;'  id='txtTargetNo" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);'  onblur='CheckDecimalFormat(id);CalculateTotal(" + maxDetailsIDInTable + ");' data-required='true' value='' /> </td>";
    tr += "      <td class='PerDay' style='width:1%;'><input id='cbIsDay" + maxDetailsIDInTable + "' name='TargetPeriod" + maxDetailsIDInTable + "'  class='cbIsDocumented' onchange='AfterCheckPeriod_Details(" + maxDetailsIDInTable + ");ClearTotal();CalculateTotal(" + maxDetailsIDInTable + ");' type='radio' value='10' ></td>";
    //DetailsID - FromDate - ToDate - Target - PerDay - ForMonth - ForPeriod - Total - Notes //cbIsDay cbIsMonth  
    //tr += "      <td class='ForMonth' style='width:1%;'>'<input onchange='AfterCheckPeriod(); ClearTotal();' type='radio' value='10' name='TargetPeriod' id='cbIsDay' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);'></td>";
    tr += "      <td class='ForMonth' style='width:1%;'><input id='cbIsMonth" + maxDetailsIDInTable + "' name='TargetPeriod" + maxDetailsIDInTable + "' onchange='AfterCheckPeriod_Details(" + maxDetailsIDInTable + ");ClearTotal();CalculateTotal(" + maxDetailsIDInTable + ");' class='cbIsDocumented' type='radio' value='20' ></td>";

    tr += '<td><div class="col-sm-9 input-append input-group date" id="dpMonths' + maxDetailsIDInTable + '" data-date="102/2012" data-date-format="mm/yyyy" data-date-viewmode="years" data-date-minviewmode="months">';
    tr += '                                         <input id="txtMonthYear' + maxDetailsIDInTable + '" class="span2 MonthYear input-sm form-control" size="16" style="width:70px;" type="text" placeholder="MM/YYYY" readonly="">';
    tr += '                                 <span style="background-color:green;color:white;cursor:pointer;" class="add-on input-group-addon"><i class="fa fa-calendar"></i></span>';
    tr += '                             </div></td>';

    tr += "      <td class='ForPeriod' style='width:1%;'><input id='cbForPeriod" + maxDetailsIDInTable + "' name='TargetPeriod" + maxDetailsIDInTable + "'  onchange='AfterCheckPeriod_Details(" + maxDetailsIDInTable + ");ClearTotal();CalculateTotal(" + maxDetailsIDInTable + ");' class='cbIsDocumented' type='radio' value='30'></td>";
    tr += "     <td class='ActionID' val='0'><select id='slActionID" + maxDetailsIDInTable + "' style='width:auto;' class='controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  data-required='true'>" + $('#hidden_slActions').html() + "</select></td>";

    tr += "     <td class='TotalTarget' style='width:9%;'><input type='text' style='width:100%;font-size:90%;'  id='txtTotal" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);'  onblur='CheckDecimalFormat(id);CalculateTotal(" + maxDetailsIDInTable + ");'  data-required='true' value='' /> </td>";
    tr += "     <td class='Notes' style='width:29%;'><textarea type='text' style='width:100%;font-size:13px;height:50px;'  id='txtNotes" + maxDetailsIDInTable + "' class='controlStyle inputValue' onblur='CalculateTotal(" + maxDetailsIDInTable + ");' data-required='true' ></textarea> </td>";
    tr += "     <td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate'  id='SelectedIDsToUpdate" + maxDetailsIDInTable + "' type='checkbox' value='" + maxDetailsIDInTable + "' /></td>";
    tr += "     <td class='txtPerMonth hide'> <input id='txtPerMonth" + maxDetailsIDInTable + "' type=hidden' /> </td>";
    tr += "     <td class='txtPerDay hide'> <input id='txtPerDay" + maxDetailsIDInTable + "' type=hidden' /> </td>";
    tr += "     <td class='txtDaysCount hide'> <input id='txtDaysCount" + maxDetailsIDInTable + "' type=hidden' /> </td>";
    tr += "     <td class='txtAmount hide'> <input id='txtAmount" + maxDetailsIDInTable + "' type=hidden' /> </td>";
    tr += "     <td class='txtTotalAmount hide'> <input id='txtTotalAmount" + maxDetailsIDInTable + "' type=hidden' /> </td>";
    tr += "     <td class='cboIsActionTarget hide'> <input id='cboIsActionTarget" + maxDetailsIDInTable + "' type=hidden' /> </td>";
    tr += "</tr>";

    $("#tblDetails tbody").append(tr);
    //$("#tblDetails tbody").prepend(tr);
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $("#tblDetails tbody tr[ID=" + maxDetailsIDInTable + "]").reverseChildren();
    /***************************Filling row controls******************************/

    $("#slAccount" + maxDetailsIDInTable).html($("#slAccount").html());
    $("#slAccount" + maxDetailsIDInTable).val($("#slAccount" + (maxDetailsIDInTable - 1)).val() == undefined ? 0 : $("#slAccount" + (maxDetailsIDInTable - 1)).val());

    $("#slSubAccount" + maxDetailsIDInTable).html("<option value=0>" + TranslateString("SelectFromMenu") + "</option>");
    $("#slSubAccount" + maxDetailsIDInTable).html($("#slSubAccount" + (maxDetailsIDInTable - 1)).html());
    $("#slSubAccount" + maxDetailsIDInTable).val($("#slSubAccount" + (maxDetailsIDInTable - 1)).val() == undefined ? 0 : $("#slSubAccount" + (maxDetailsIDInTable - 1)).val());

    $("#slCostCenter" + maxDetailsIDInTable).html($("#slCostCenter").html());
    $("#slCostCenter" + maxDetailsIDInTable).val($("#slCostCenter" + (maxDetailsIDInTable - 1)).val() == undefined ? 0 : $("#slCostCenter" + (maxDetailsIDInTable - 1)).val());
    if ($("#hDefaultUnEditableCompanyName").val() == "ERP") {
        //Start Auto Filter
        $("#slAccount" + maxDetailsIDInTable).css({ "width": "80%" }).select2();
        $("#slSubAccount" + maxDetailsIDInTable).css({ "width": "80%" }).select2();
        $("div[tabindex='-1']").removeAttr('tabindex');
        $("#slAccount" + maxDetailsIDInTable).trigger("change");
        $("#slSubAccount" + maxDetailsIDInTable).trigger("change");
        //End Auto Filter
    }

    //SetDatepickerFormat();
    BindAllCheckboxonTable("tblDetails", "DetailsID", "cbDetailsDeleteHeader");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    /***********************EOF Filling row controls******************************/

    $('.datepicker-input').datepicker();
    $('.MonthYear').datepicker({
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'MM yy',
        onClose: function (dateText, inst) {
            $(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
        }
    });
    $("#dpMonths" + maxDetailsIDInTable + "").datepicker({
        format: "mm/yyyy",
        viewMode: "months",
        minViewMode: "months"
    });
}

function CalculateTotal(DetailID) {
    debugger;
    if (isValidDate($('#txtFromDate' + DetailID + '').val(), 1) && isValidDate($('#txtToDate' + DetailID + '').val(), 1) && $('#txtTargetNo' + DetailID + '').val().trim() != "") {

        if ($('#cbIsDay' + DetailID + '').is(':checked')) {
            var count = GetDaysCountBetweenDates_Without_WeekEnd(DetailID);
            $('#txtTotal' + DetailID + '').val((($('#txtTargetNo' + DetailID + '').val() * 1) * count));
            $('#txtPerDay' + DetailID + '').val($('#txtTargetNo' + DetailID + '').val());
            $('#txtDaysCount' + DetailID + '').val(count);
            FadePageCover(false);
        }
        else if ($('#cbIsMonth' + DetailID + '').is(':checked')) {
            if ($('#txtMonthYear' + DetailID + '').val().trim() == "") {
                FadePageCover(false);
                swal("Excuse Me", "Select Month & Yeay", "warning");
            }
            else {
                var FirstDate = "01/" + $('#txtMonthYear' + DetailID + '').val();
                var FirstDateObject = GetDateObjectfromddmmyyyy(FirstDate);
                var LastDateObject = new Date(FirstDateObject.getFullYear(), FirstDateObject.getMonth() + 1, 0);
                var LasDate = ConvertDateFormat(LastDateObject.toLocaleDateString());

                $('#txtFromDate' + DetailID + '').val(FirstDate);
                $('#txtToDate' + DetailID + '').val(LasDate);

                setTimeout(function () {
                    var count = GetDaysCountBetweenDates_Without_WeekEnd(DetailID);
                    $('#txtTotal' + DetailID + '').val($('#txtTargetNo' + DetailID + '').val());
                    $('#txtPerMonth' + DetailID + '' + DetailID + '').val($('#txtTargetNo' + DetailID + '').val());
                    $('#txtPerDay' + DetailID + '').val((count / ($('#txtTargetNo' + DetailID + '').val() * 1)));
                    $('#txtDaysCount' + DetailID + '').val(count);
                    FadePageCover(false);
                }, 300);

            }
        }
        else {

            var count = GetDaysCountBetweenDates_Without_WeekEnd(DetailID);
            $('#txtTotal' + DetailID + '').val($('#txtTargetNo' + DetailID + '').val());
            $('#txtPerMonth' + DetailID + '').val($('#txtTargetNo' + DetailID + '').val());
            $('#txtPerDay' + DetailID + '').val((($('#txtTargetNo' + DetailID + '').val() * 1) / count));
            $('#txtDaysCount' + DetailID + '').val(count);
            FadePageCover(false);
        }

    }
    else {
        FadePageCover(false);
        //swal("Excuse Me", " Fill Required Data [ Dates - # Target]", "warning");
    }

}

function CRM_SalesMenTarget_BindTableRows(CRM_SalesMenTarget) {
    var detailsControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right hide' title='Details'> <i class='fa fa-table' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Details" + "</span>";
    // $('[data-toggle="tooltip"]').tooltip(); 
    // $('[data-toggle="popover"]').popover();
    debugger;
    $("#hl-menu-CRM").parent().addClass("active");
    ClearAllTableRows("tblCRM_SalesMenTarget");
    $.each(CRM_SalesMenTarget, function (i, item) {

        AppendRowtoTable("tblCRM_SalesMenTarget",
            ("<tr ID='" + item.ID + "' ondblclick='CRM_SalesMenTarget_EditByDblClick(" + item.ID + ");'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='SalesRepID' val='" + item.SalesRepID + "'>" + item.SalesmanName + "</td>"
                + "<td class='ActionTypeID hide' val='" + item.ActionTypeID + "'>" + item.ActionName + "</td>"
                + "<td class='Notes' style='text-align:left; white-space:pre-wrap; word-wrap:break-word;!important;' val='" + item.Notes + "'>" + ((item.Notes).trim() == '0' ? ' ' : item.Notes) + "</td>"
                + "<td class='WeekendDays hide' val='" + item.WeekendDays + "'>" + (item.WeekendDays == '8' ? ' ' : item.WeekendDays) + "</td>"
                + "<td class='VacationsCount hide' val='" + item.VacationsCount + "'>" + (item.VacationsCount == '0' ? ' ' : item.VacationsCount) + "</td>"
                //+ "<td  class='CRM_SalesMenTargetDetails' onclick='SetCRM_SalesMenTargetDetailsModal(" + item.ID + " , " + "\"" + (item.WeekendDays == '8' ? ' ' : item.WeekendDays) + "\"" + " , " + "0" + " , " + "\"" + item.SalesmanName + "\"" + " , " + "\"" + item.ActionName + "\"" + " , " + item.SalesRepID + " , " + item.ActionTypeID + ")' style='background-color:midnightblue;cursor:pointer; color:white;width:100px!important;'>" + '<span class="fa fa-table"></span> Details' + "</td>"
                + "<td style='' class='CRM_SalesMenTargetDetails'><a href='#' data-toggle='modal' onclick='SetCRM_SalesMenTargetDetailsModal(" + item.ID + " , " + "\"" + (item.WeekendDays == '8' ? ' ' : item.WeekendDays) + "\"" + " , " + "0" + " , " + "\"" + item.SalesmanName + "\"" + " , " + "\"" + item.ActionName + "\"" + " , " + item.SalesRepID + " , " + item.ActionTypeID + ");' " + detailsControlsText + "</a></td>"
                + "<td class='ss' val='" + 'ss' + "'>" + "" + "</td>"

                + "</tr>"));

    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblCRM_SalesMenTarget", "ID_CRM_SalesMenTarget", "ID_CRM_SalesMenTarget");
    CheckAllCheckbox("ID_CRM_SalesMenTarget");
    // HighlightText("#tblCRM_SalesMenTarget>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function CRM_SalesMenTarget_EditByDblClick(pID) {
    jQuery("#CRM_SalesMenTargetModal").modal("show");
    //  CRM_SalesMenTarget_FillSearchData();
    CRM_SalesMenTarget_FillControls(pID);
}

function CRM_SalesMenTarget_FillControls(pID) {
    debugger;
    //setTimeout(function () {
    ClearAll("#CRM_SalesMenTargetModal", function () {
        CRM_SalesMenTarget_FillSalesMen(function () {
            $('#slActions').html('');
            $("#hID").val(pID);
            var tr = $("tr[ID='" + pID + "']");
            $("#slSalesMen").val($(tr).find("td.SalesRepID").attr('val'));
            $("#txtNotes").val($(tr).find("td.Notes").attr('val'));
            $("#txtVacationsDays").val($(tr).find("td.VacationsCount").attr('val'));

            var arrDays = $(tr).find("td.WeekendDays").attr('val').split("-");

            $("input[name='VacationsDays']").each(function (i, item) {
                console.log("day no " + $(item).attr('DayNo'));
                console.log("include day no " + arrDays.includes($(item).attr('DayNo')));
                if (arrDays.includes($(item).attr('DayNo')) == true || arrDays.includes($(item).attr('DayNo')) == 'true') {
                    $(item).prop('checked', 'checked');
                }
                else {
                    $(item).removeAttr('checked');
                }
            });

            $("#btnSave").attr("onclick", "CRM_SalesMenTarget_Update(false);");
            $("#btnSaveandNew").attr("onclick", "CRM_SalesMenTarget_Update(true);");

            FillActions('#slSalesMen', '#slActions', function () {
            });

            var pParametersWithValues = { pID: pID };
            CallGETFunctionWithParameters("/api/CRM_SalesMenTarget/GetDetailsData", pParametersWithValues
                , function (pData) {
                    debugger;
                    $('#tblDetails tbody').html("");
                    var DetailsData = JSON.parse(pData[0]);
                    var i = 0;
                    for (i = 0; i < DetailsData.length; i++) {
                        Details_NewRow();
                        $("#txtFromDate" + maxDetailsIDInTable + "").val(GetDateFromServer(DetailsData[i].FromDate))
                        $("#txtToDate" + maxDetailsIDInTable + "").val(GetDateFromServer(DetailsData[i].ToDate))
                        $("#txtTargetNo" + maxDetailsIDInTable + "").val(DetailsData[i].Target)
                        //$("cbIsDay" + maxDetailsIDInTable + "").val(DetailsData[i].)
                        //$("cbIsMonth" + maxDetailsIDInTable + "").val(DetailsData[i].)
                        //$("txtMonthYear" + maxDetailsIDInTable + "").val(DetailsData[i].)
                        //$("cbForPeriod" + maxDetailsIDInTable + "").val(DetailsData[i].)
                        $("#slActionID" + maxDetailsIDInTable + "").val(DetailsData[i].ActionID == 0 ? "" : DetailsData[i].ActionID)
                        $("#txtTotal" + maxDetailsIDInTable + "").val(DetailsData[i].TotalTarget)
                        $("#txtNotes" + maxDetailsIDInTable + "").val(DetailsData[i].Notes)
                        $($('#tblDetails tbody tr')[i]).attr('id', DetailsData[i].ID)
                        $($('#tblDetails tbody tr')[i]).children('td').find("input[name='TargetPeriod" + $(tr).attr("counter") + "']:checked").attr('value')
                        $($('#tblDetails tbody tr')[i]).children('td').find("input[name='Delete']").attr('value', DetailsData[i].ID)
                        $('#tblDetails tbody tr[counter=' + maxDetailsIDInTable + ']').attr('value', DetailsData[i].ID)
                        $('#tblDetails tbody tr[counter=' + maxDetailsIDInTable + ']').attr('ID', DetailsData[i].ID)
                        $("input:radio[name=TargetPeriod" + maxDetailsIDInTable + "][value='" + DetailsData[i].TargetPeriod + "']").prop('checked', true)
                        $("#txtPerMonth" + maxDetailsIDInTable + "").val(DetailsData[i].PerMonth)
                        $("#txtPerDay" + maxDetailsIDInTable + "").val(DetailsData[i].PerDay)
                        $("#txtDaysCount" + maxDetailsIDInTable + "").val(DetailsData[i].DaysCount)
                        $("#txtAmount" + maxDetailsIDInTable + "").val(DetailsData[i].Amount)
                        $("#txtTotalAmount" + maxDetailsIDInTable + "").val(DetailsData[i].ID)
                        $("#cboIsActionTarget" + maxDetailsIDInTable + "").val(DetailsData[i].IsActionsTarget)
                        if (DetailsData[i].TargetPeriod == 20) {
                            $('#txtMonthYear' + maxDetailsIDInTable + '').val(GetDateFromServer(DetailsData[i].FromDate).substring(3, (GetDateFromServer(DetailsData[i].FromDate)).length))
                        }
                    }

                }
                , null);


            setTimeout(function () {
                $("#slActions").val($(tr).find("td.ActionTypeID").attr('val'));
            }, 800);

        });
    });
}


function CRM_SalesMenTarget_Insert(pSaveandAddNew) {
    debugger;
    var _Suceess = true;
    var DetailsID = "";
    var FromDate = "";
    var ToDate = "";
    var TargetNo = "";
    var PerDay = "";
    var ForMonth = "";
    var ForPeriod = "";
    var TotalTarget = "";
    var Notes = "";
    var TargetPeriod = ""; //$("input[name='TargetPeriod']:checked").val()
    var ActionID = "";
    $($('#tblDetails > tbody > tr')).each(function (i, tr) {
        debugger;
        //DetailsID - FromDate - ToDate - Target - PerDay - ForMonth - ForPeriod - Total - Notes
        DetailsID += $(tr).attr("ID") + ",";
        //DetailsID += $(tr).find('td.DetailsID').find('.selectAccountID').val() + ",";
        FromDate += ConvertDateFormat($(tr).find('td.FromDate').find('.inputValue').val()) + ",";
        ToDate += ConvertDateFormat($(tr).find('td.ToDate ').find('.inputValue').val()) + ",";
        TargetNo += $(tr).find('td.TargetNo').find('.inputValue').val() + ",";
        PerDay += ($('#txtPerDay' + $(tr).attr("counter") + '').val() == "" ? "0" : $('#txtPerDay' + $(tr).attr("counter") + '').val()) + ",";
        ForMonth += ($('#txtPerMonth' + $(tr).attr("counter") + '').val() == "" ? "0" : $('#txtPerMonth' + $(tr).attr("counter") + '').val()) + ",";
        ForPeriod += ($('#txtDaysCount' + $(tr).attr("counter") + '').val() == "" ? "0" : $('#txtDaysCount' + $(tr).attr("counter") + '').val()) + ",";
        TotalTarget += $(tr).find('td.TotalTarget').find('.inputValue').val() + ",";
        Notes += ($(tr).find('td.Notes').find('.inputValue').val() == "" ? "0" : $(tr).find('td.Notes').find('.inputValue').val()) + ",";
        TargetPeriod += ($(tr).children('td').find("input[name='TargetPeriod" + $(tr).attr("counter") + "']:checked").attr('value') == undefined ? "0" : $(tr).children('td').find("input[name='TargetPeriod" + $(tr).attr("counter") + "']:checked").attr('value')) + ",";
        ActionID += $(tr).find('td.ActionID').find('#slActionID' + $(tr).attr("counter") + '').val() + ",";
        

    });
    if ($('#tblDetails > tbody > tr').length > 0) {
        DetailsID = DetailsID.substring(0, DetailsID.length - 1);
        FromDate = FromDate.substring(0, FromDate.length - 1);
        ToDate = ToDate.substring(0, ToDate.length - 1);
        TargetNo = TargetNo.substring(0, TargetNo.length - 1);
        PerDay = PerDay.substring(0, PerDay.length - 1);
        ForMonth = ForMonth.substring(0, ForMonth.length - 1);
        ForPeriod = ForPeriod.substring(0, ForPeriod.length - 1);
        TotalTarget = TotalTarget.substring(0, TotalTarget.length - 1);
        Notes = Notes.substring(0, Notes.length - 1);
        TargetPeriod = TargetPeriod.substring(0, TargetPeriod.length - 1);
        ActionID = ActionID.substring(0, ActionID.length - 1);

    }

    debugger;
    if (DetailsID != "" && (TargetNo.split(",").includes('') || TargetNo == "" || TotalTarget.split(",").includes('') || TotalTarget == "")) {
        swal(strSorry, "Please Enter Target Numbers and Total")
    } else {
        if ($("input[name='VacationsDays']:checked").length > 0) {
            var WeekendDays = "";
            $("input[name='VacationsDays']:checked").each(function (i, item) {
                if (i == ($("input[name='VacationsDays']:checked").length - 1)) {
                    WeekendDays += $(item).attr('DayNo');
                    debugger;
                    InsertUpdateFunction("form", "/api/CRM_SalesMenTarget/Insert", {
                        pID: $('#hID').val(),
                        pSalesRepID: $("#slSalesMen").val(),
                        pActionTypeID: $("#slActions").val(),
                        pWeekendDays: WeekendDays,
                        pVacationsCount: $("#txtVacationsDays").val(),
                        pNotes: $("#txtNotes").val(),
                        pDetailsID: DetailsID,
                        pFromDate: FromDate,
                        pToDate: ToDate,
                        pTarget: TargetNo,
                        pPerDay: PerDay,
                        pIsActionsTarget: true,
                        pForMonth: ForMonth,
                        pForPeriod: ForPeriod,
                        pTotalTarget: TotalTarget,
                        pNotesDetails: Notes,
                        pTargetPeriod: TargetPeriod,
                        pActionID: ActionID

                    }, pSaveandAddNew, 'CRM_SalesMenTargetModal', function () {
                        CRM_SalesMenTarget_LoadingWithPaging();

                    });
                }
                else {
                    WeekendDays += $(item).attr('DayNo') + '-';
                }
            });
        }
        else {
            debugger;
            InsertUpdateFunction("form", "/api/CRM_SalesMenTarget/Insert", {
                pSalesRepID: $("#slSalesMen").val(),
                pActionTypeID: $("#slActions").val(),
                pWeekendDays: "8",
                pVacationsCount: $("#txtVacationsDays").val(),
                pNotes: $("#txtNotes").val()
            }, pSaveandAddNew, 'CRM_SalesMenTargetModal', function () {
                CRM_SalesMenTarget_LoadingWithPaging();

            });
        }
    }

}

// calling this function for update
//function CRM_SalesMenTarget_Update(pSaveandAddNew)
//{
//    debugger;
//    var _Suceess = true;
//    var DetailsID = "";
//    var FromDate = "";
//    var ToDate = "";
//    var TargetNo = "";
//    var PerDay = "";
//    var ForMonth = "";
//    var ForPeriod = "";
//    var TotalTarget = "";
//    var Notes = "";
//    var TargetPeriod = ""; //$("input[name='TargetPeriod']:checked").val()
//    var ActionID = "";
//    $($('#tblDetails > tbody > tr')).each(function (i, tr) {
//        debugger;
//        //DetailsID - FromDate - ToDate - Target - PerDay - ForMonth - ForPeriod - Total - Notes
//        DetailsID += $(tr).attr("ID") + ",";
//        //DetailsID += $(tr).find('td.DetailsID').find('.selectAccountID').val() + ",";
//        FromDate += ConvertDateFormat($(tr).find('td.FromDate').find('.inputValue').val()) + ",";
//        ToDate += ConvertDateFormat($(tr).find('td.ToDate ').find('.inputValue').val()) + ",";
//        TargetNo += $(tr).find('td.TargetNo').find('.inputValue').val() + ",";
//        PerDay += $('#txtPerDay' + $(tr).attr("counter") + '').val() //$(tr).find('td.PerDay input').is(':checked') + ","; //.find('td.ForMonth input').is(':checked')
//        ForMonth += $('#txtPerMonth' + $(tr).attr("counter") + '').val() //$(tr).find('td.ForMonth input').is(':checked') + ",";
//        ForPeriod += $('#txtDaysCount' + $(tr).attr("counter") + '').val()//$(tr).find('td.ForPeriod input').is(':checked') + ",";
//        TotalTarget += $(tr).find('td.TotalTarget').find('.inputValue').val() + ",";
//        Notes += $(tr).find('td.Notes').find('.inputValue').val() + ",";
//        TargetPeriod += $(tr).children('td').find("input[name='TargetPeriod" + $(tr).attr("counter") + "']").attr('value')
//        ActionID += $(tr).find('td.ActionID').find('#slActionID' + $(tr).attr("counter") + '').val() + ",";
//        //$("#txtPerDay").val()  $("#txtPerMonth").val()  $('#txtDaysCount').val()

function CRM_SalesMenTarget_Update(pSaveandAddNew) {
    CRM_SalesMenTarget_Insert(pSaveandAddNew);
}

//        //pTargetPeriod: $("input[name='TargetPeriod']:checked").val(),

//        //var SubAccountCount = $(tr).find('td.SubAccountID').find('.selectSubAccountID').find('option').length;

//        //if ((AccountID.trim() == "" || AccountID.trim() == "0" || AccountID == null)) {
//        //    swal('Excuse me', 'Fill All Account', 'warning');
//        //    _Suceess = false;
//        //    return false;
//        //}
//        //if ((SubAccountID.trim() == "" || SubAccountID.trim() == "0" || SubAccountID == null) && SubAccountCount > 1) {
//        //    swal('Excuse me', 'Fill  SubAccount', 'warning');
//        //    _Suceess = false;
//        //    return false;
//        //}
//        //if ((CostCenterID == null || CostCenterID.trim() == "")) {
//        //    swal('Excuse me', 'Fill  Items Cost Center', 'warning');
//        //    _Suceess = false;
//        //    return false;
//        //}
//        //if (Value.trim() == "" || Value.trim() == "0" || Value == null) {
//        //    swal('Excuse me', 'Insert Value ', 'warning');
//        //    _Suceess = false;
//        //    return false;
//        //}

//    });
//    if ($('#tblDetails > tbody > tr').length > 0) {
//        DetailsID = DetailsID.substring(0, DetailsID.length - 1);
//        FromDate = FromDate.substring(0, FromDate.length - 1);
//        ToDate = ToDate.substring(0, ToDate.length - 1);
//        TargetNo = TargetNo.substring(0, TargetNo.length - 1);
//        PerDay = PerDay.substring(0, PerDay.length - 1);
//        ForMonth = ForMonth.substring(0, ForMonth.length - 1);
//        ForPeriod = ForPeriod.substring(0, ForPeriod.length - 1);
//        TotalTarget = TotalTarget.substring(0, TotalTarget.length - 1);
//        Notes = Notes.substring(0, Notes.length - 1);
//        TargetPeriod = TargetPeriod.substring(0, TargetPeriod.length - 1);
//        ActionID = ActionID.substring(0, ActionID.length - 1);

//    }

//    if ($("input[name='VacationsDays']:checked").length > 0) {
//        var WeekendDays = "";
//        $("input[name='VacationsDays']:checked").each(function (i, item) {
//            if (i == ($("input[name='VacationsDays']:checked").length - 1)) {
//                WeekendDays += $(item).attr('DayNo');
//                InsertUpdateFunction("form", "/api/CRM_SalesMenTarget/Insert", {
//                    pID:$('#hID').val(),
//                    pSalesRepID: $("#slSalesMen").val(),
//                    pActionTypeID: $("#slActions").val(),
//                    pWeekendDays: WeekendDays,
//                    pVacationsCount: $("#txtVacationsDays").val(),
//                    pNotes: $("#txtNotes").val(),
//                    pDetailsID: DetailsID,
//                    pFromDate: FromDate,
//                    pToDate: ToDate,
//                    pTarget: TargetNo,
//                    pPerDay: PerDay,
//                    pIsActionsTarget: true,
//                    pForMonth: ForMonth,
//                    pForPeriod: ForPeriod,
//                    pTotalTarget: TotalTarget,
//                    pNotesDetails: Notes,
//                    pTargetPeriod: TargetPeriod,
//                    pActionID: ActionID

//                }, pSaveandAddNew, 'CRM_SalesMenTargetModal', function () {
//                    CRM_SalesMenTarget_LoadingWithPaging();

//                });
//            }
//            else {
//                WeekendDays += $(item).attr('DayNo') + '-';
//            }
//        });
//    }
//    else {
//        InsertUpdateFunction("form", "/api/CRM_SalesMenTarget/Insert", {
//            pSalesRepID: $("#slSalesMen").val(),
//            pActionTypeID: $("#slActions").val(),
//            pWeekendDays: "8",
//            pVacationsCount: $("#txtVacationsDays").val(),
//            pNotes: $("#txtNotes").val()
//        }, pSaveandAddNew, 'CRM_SalesMenTargetModal', function () {
//            CRM_SalesMenTarget_LoadingWithPaging();

//        });
//    }
//}

function CRM_SalesMenTarget_Delete(pID) {
    DeleteListFunction("/api/CRM_SalesMenTarget/DeleteByID", { "pID": pID }, function () { CRM_SalesMenTarget_LoadingWithPaging(); });
}

function CRM_SalesMenTarget_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblCRM_SalesMenTarget') != "")
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
                DeleteListFunction("/api/CRM_SalesMenTarget/Delete", { "pCRM_SalesMenTargetIDs": GetAllSelectedIDsAsString('tblCRM_SalesMenTarget') }, function () { CRM_SalesMenTarget_LoadingWithPaging(); });
            });
    //DeleteListFunction("/api/CRM_SalesMenTarget/Delete", { "pCRM_SalesMenTargetIDs": GetAllSelectedIDsAsString('tblCRM_SalesMenTarget') }, function () { CRM_SalesMenTarget_LoadingWithPaging(); });
}

function CRM_SalesMenTarget_FillSalesMen(callback) {
    //   $('.non_basic').addClass('hide');

    var length = $('#slSalesMen > option').length;
    //  slNextStep


    if (length <= 0) {
        FadePageCover(true);
        $.ajax({
            type: "POST",
            url: strServerURL + "/api/CRM_SalesMenTarget/IntializeData",
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (d) {
                debugger;
                Fill_SelectInputAfterLoadData(d[0], 'ID', 'Name', 'Select SalesMan', '#slSalesMen', '');
                //Fill_SelectInputAfterLoadData(d[1], 'ID', 'Name', 'Select Action', '#hidden_slActions', '');
                FadePageCover(false);
                if (callback != null && callback != undefined) {
                    callback();//sherif: loads countries.js or any.js  
                }
            },
            error: function (jqXHR, exception) {
                debugger;
                swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
                FadePageCover(false);
            }
        });
    }
    else {
        if (callback != null && callback != undefined) {
            callback();//sherif: loads countries.js or any.js  
        }
    }





}

function FillActions(SalesMenInputID, ActionInputID, callback) {
    var pWhereConditions = '';
    if ($('#hID').val() == null || $('#hID').val().trim() == '0' || $('#hID').val().trim() == '') {
        pWhereConditions = 'WHERE(SELECT COUNT(ID) FROM dbo.CRM_SalesMenTarget WHERE dbo.CRM_SalesMenTarget.ActionTypeID = dbo.CRM_Actions.ID AND  dbo.CRM_SalesMenTarget.SalesRepID = ' + $(SalesMenInputID).val() + ') = 0';
        console.log('insert' + $('#hID').val());
    }
    else {
        console.log('update' + $('#hID').val());
        pWhereConditions = 'WHERE(SELECT COUNT(ID) FROM dbo.CRM_SalesMenTarget WHERE dbo.CRM_SalesMenTarget.ID !=' + $('#hID').val() + ' AND  dbo.CRM_SalesMenTarget.ActionTypeID = dbo.CRM_Actions.ID AND  dbo.CRM_SalesMenTarget.SalesRepID = ' + $(SalesMenInputID).val() + ') = 0';
    }


    console.log(pWhereConditions)
    Fill_SelectInput_WithWhereCondition("/api/CRM_SalesMenTarget/LoadActions", "ID", "Name", "Select Actions", ActionInputID, '', pWhereConditions)

    if (callback != null && callback != undefined) {
        callback();//sherif: loads countries.js or any.js  
    }

}

function SetCRM_SalesMenTargetDetailsModal(ID, WeekEnd, VacationsCount, SalesMan, ActionName, SalesManID, ActionID) {
    jQuery("#CRM_SalesMenTargetDetailstblModal").modal("show");
    $('#lblDetails').html("<span style='font-size:17px!important;'><u>Weekend </u>: <sapn style='color:brown;'>" + GetDaysNameFromNo(WeekEnd) + "</span></span>"
        + "<span style='font-size:17px!important;'><u>SalesMan </u>: <sapn style='color:brown;'>" + SalesMan + "&nbsp;</span></span>"
        + "<span style='font-size:17px!important;'><u>Action </u>: <sapn style='color:brown;'>" + ActionName + " </span></span>")
    $('#hWeekEnd').val(WeekEnd);
    $('#hSalesMan').val(SalesMan);
    $('#hAction').val(ActionName);
    $('#hSalesManID').val(SalesManID);
    $('#hActionID').val(ActionID);
    $('#hVacationCount').val(VacationsCount);

    CRM_SalesMenTargetDetails_LoadingWithPaging(ID)
}
function CRM_SalesMenTargetDetails_LoadingWithPaging(ID) {
    debugger;
    jQuery("#CRM_SalesMenTargetDetailstblModal").modal("show");
    if (ID == "-1") {

        ID = $('#hID').val();
    }
    else {
        $('#hID').val(ID);
    }
    var pWhereClause = $('#SalesMenTargetDetailsSqlQuery').val() + ' AND CRM_SalesMenTargetID = ' + ID;


    if (pWhereClause == ' AND CRM_SalesMenTargetID = ' + ID) {
        pWhereClause = "Where  CRM_SalesMenTargetID = " + ID;

    }
    else {

        pWhereClause = pWhereClause.replace("Where AND", "Where ");
    }


    console.log("CRM_SalesMenTargetID WHHHHHHH" + pWhereClause);
    //LoadWithPagingWithWhereClause(pDivPagerName, pSelectPageSizeName, pSpnFirstPageRowName, pSpnLastPageRowName, pSpnTotalCountName, pDivTextTotalModal, "api/Quotations/LoadWithWhereClause", pWhereClause, pPageNo, $('#' + pSelectPageSizeName).val().trim(), function (pTabelRows) {
    //    var parm = [pTabelRows];
    //    var runFunction = window[strBindTableRowsFunctionName];
    //    if (typeof runFunction === "function") runFunction.apply(null, parm);
    //});


    var pOrderBy = " ID DESC ";
    var pControllerParameters = { pPageNumber: 1, pPageSize: $("#select-page-size1 option:selected").text(), pWhereClause: pWhereClause }
    LoadWithPagingWithWhereClauseAndOrderBy("div-Pager1", "select-page-size1", "spn-first-page-row1", "spn-last-page-row1", "spn-total-count1", "div-Text-Total1", "api/CRM_SalesMenTargetDetails/LoadWithPagingWithWhereClause", pWhereClause, 'ID', 1, 10
        , function (pData) {
            //  console.log(pData[0]);
            CRM_SalesMenTargetDetails_BindTableRows(JSON.parse(pData[0]));



        });


    //  HighlightText("#tblOperations>tbody>tr", $("#txt-Search").val().trim());
}

function CRM_SalesMenTargetDetails_ClearAllForm() {
    // ClearAll("#CRM_SalesMenTargetDetailsModal", null);

    $('#txtDetailsNotes').val("");
    $('#txtTotal').val("");
    $('#txtTargetNo').val("");
    $('#txtFromDate').val(getTodaysDateInddMMyyyyFormat());
    $('#txtToDate').val(getTodaysDateInddMMyyyyFormat());
    $('#lblDetails1').html($('#lblDetails').html());
    $('#txtMonthYear').val('');


    $("input:radio[name=TargetPeriod][value=" + "'10'" + "]").removeAttr('checked', 'checked');
    $("input:radio[name=TargetPeriod][value=" + "'20'" + "]").removeAttr('checked', 'checked');
    $("input:radio[name=TargetPeriod][value=" + "'30'" + "]").removeAttr('checked', 'checked');
    $("input[name=TargetPeriod][value=" + "'10'" + "]").prop('checked', true);
    $('#dpMonths').addClass('hide');
    $("#btnSave1").attr("onclick", "CRM_SalesMenTargetDetails_Insert(false);");
    $("#btnSaveandNew1").attr("onclick", "CRM_SalesMenTargetDetails_Insert(true);");
}

function CRM_SalesMenTargetDetails_BindTableRows(CRM_SalesMenTargetDetails) {
    debugger;
    $("#hl-menu-CRM").parent().addClass("active");
    ClearAllTableRows("tblCRM_SalesMenTargetDetails");
    $.each(CRM_SalesMenTargetDetails, function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblCRM_SalesMenTargetDetails",
            ("<tr ID='" + item.ID + "' ondblclick='CRM_SalesMenTargetDetails_EditByDblClick(" + item.ID + ");'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Target' period='" + item.TargetPeriod + "' val='" + item.Target + "'>" + item.Target + "  " + (item.TargetPeriod == "10" ? "Per Day" : "For Period") + "</td>"
                + "<td class='TotalTarget' val='" + item.TotalTarget + "'>" + item.TotalTarget + "</td>"
                + "<td class='FromDate' val='" + GetDateFromServer(item.FromDate) + "'>" + GetDateFromServer(item.FromDate) + "</td>"
                + "<td class='ToDate' val='" + GetDateFromServer(item.ToDate) + "'>" + GetDateFromServer(item.ToDate) + "</td>"
                + "<td class='Notes' style='text-align:left;white-space:pre-wrap; word-wrap:break-word;!important;' val='" + item.Notes + "'>" + ((item.Notes).trim() == '0' ? " " : (item.Notes).toUpperCase()) + "</td>"
                + "<td class='IsActionsTarget hide' val='" + item.IsActionsTarget + "'>" + item.IsActionsTarget + "</td>"
                + "<td class='Amount hide' val='" + item.Amount + "'>" + item.Amount + "</td>"
                + "<td class='AllAmount hide' val='" + item.AllAmount + "'>" + item.AllAmount + "</td>"
                + "<td class='PerDay hide' val='" + item.PerDay + "'>" + item.PerDay + "</td>"
                + "<td class='PerMonth hide' val='" + item.PerMonth + "'>" + item.PerMonth + "</td>"
                + "<td class='DaysCount hide' val='" + item.DaysCount + "'>" + item.DaysCount + "</td>"
                //+ "<td class='HasDetails'> <input type='checkbox' disabled='disabled' val='" + (item.HasDetails == true ? "true' checked='checked'" : "'") + " /></td>"
                + "</tr>"));


    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblCRM_SalesMenTargetDetails", "ID_CRM_SalesMenTargetDetails", "ID_CRM_SalesMenTargetDetails");
    CheckAllCheckbox("ID_CRM_SalesMenTargetDetails");
    // HighlightText("#tblCRM_SalesMenTargetDetails>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });


    console.log("parent " + parent.strBindTableRowsFunctionName);
}

function CRM_SalesMenTargetDetails_EditByDblClick(pID) {
    jQuery("#CRM_SalesMenTargetDetailsModal").modal("show");
    //  CRM_SalesMenTargetDetails_FillSearchData();
    CRM_SalesMenTargetDetails_FillControls(pID);
}

function CRM_SalesMenTargetDetails_FillControls(pID) {

    debugger;
    $('#txtFromDate').val(getTodaysDateInddMMyyyyFormat());
    $('#txtToDate').val(getTodaysDateInddMMyyyyFormat());
    // ClearAll("#CRM_SalesMenTargetDetailsModal", null);

    $("#hID1").val(pID);
    var tr = $("tr[ID='" + pID + "']");
    $("#txtTargetNo").val($(tr).find("td.Target").attr('val'));
    // $("input[name=TargetPeriod][value=" + $(tr).find("td.TargetPeriod").attr('val') + "]").attr('checked', 'checked');
    //console.log($(tr).find("td.Target").attr('period'));
    $("input:radio[name=TargetPeriod][value=" + "'10'" + "]").removeAttr('checked', 'checked');
    $("input:radio[name=TargetPeriod][value=" + "'20'" + "]").removeAttr('checked', 'checked');
    $("input:radio[name=TargetPeriod][value=" + "'30'" + "]").removeAttr('checked', 'checked');

    $("input:radio[name=TargetPeriod][value=" + $(tr).find("td.Target").attr('period') + "]").prop('checked', true);
    $("#txtTotal").val($(tr).find("td.TotalTarget").attr('val'));
    $("#txtFromDate").val($(tr).find("td.FromDate").attr('val'));
    $("#txtToDate").val($(tr).find("td.ToDate").attr('val'));
    $("#txtPerMonth").val($(tr).find("td.PerMonth").attr('val'));
    $("#txtPerDay").val($(tr).find("td.PerMonth").attr('val'));
    $("#txtDaysCount").val($(tr).find("td.DaysCount").attr('val'));
    $("#txtDetailsNotes").val($(tr).find("td.Notes").attr('val'));
    $('#lblDetails1').html($('#lblDetails').html());
    AfterCheckPeriod();


    if ($(tr).find("td.Target").attr('period') == "20") {
        $('#txtMonthYear').val($(tr).find("td.FromDate").attr('val').split('/')[1] + "/" + $(tr).find("td.FromDate").attr('val').split('/')[2]);

    }

    $("#btnSave1").attr("onclick", "CRM_SalesMenTargetDetails_Update(false);");
    $("#btnSaveandNew1").attr("onclick", "CRM_SalesMenTargetDetails_Update(true);");
}

function CRM_SalesMenTargetDetails_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/CRM_SalesMenTargetDetails/Insert", {
        pFromDate: ConvertDateFormat($("#txtFromDate").val()),
        pToDate: ConvertDateFormat($("#txtToDate").val()),
        pTarget: $("#txtTargetNo").val(),
        pTargetPeriod: $("input[name='TargetPeriod']:checked").val(),
        pTotalTarget: $('#txtTotal').val(),
        pCRM_SalesMenTargetID: $('#hID').val(),
        pIsActionsTarget: true,
        pAmount: 0,
        pAllAmount: 0,
        pNotes: ($('#txtDetailsNotes').val()).toUpperCase(),
        pPerDay: $("#txtPerDay").val(),
        pPerMonth: $("#txtPerMonth").val(),
        pSalesManID: $('#hSalesManID').val(),
        pActionTypeID: $('#hActionID').val(),
        pDaysCount: $('#txtDaysCount').val()
    }, pSaveandAddNew, 'CRM_SalesMenTargetDetailsModal', function () {
        CRM_SalesMenTargetDetails_LoadingWithPaging($('#hID').val());
        //   $("#btnSave1").attr("onclick", "CRM_SalesMenTargetDetails_Update(false);");
        //   $("#btnSaveandNew1").attr("onclick", "CRM_SalesMenTargetDetails_Update(true);");
        // $('.non_basic').removeClass('hide');
    });
}
// calling this function for update
function CRM_SalesMenTargetDetails_Update(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/CRM_SalesMenTargetDetails/Update", {
        pID: $("#hID1").val(),
        pFromDate: ConvertDateFormat($("#txtFromDate").val()),
        pToDate: ConvertDateFormat($("#txtToDate").val()),
        pTarget: $("#txtTargetNo").val(),
        pTargetPeriod: $("input[name='TargetPeriod']:checked").val(),
        pTotalTarget: $('#txtTotal').val(),
        pCRM_SalesMenTargetID: $('#hID').val(),
        pIsActionsTarget: true,
        pAmount: 0,
        pAllAmount: 0,
        pNotes: ($('#txtDetailsNotes').val()).toUpperCase(),
        pPerDay: $("#txtPerDay").val(),
        pPerMonth: $("#txtPerMonth").val(),
        pSalesManID: $('#hSalesManID').val(),
        pActionTypeID: $('#hActionID').val(),
        pDaysCount: $('#txtDaysCount').val()
    }, pSaveandAddNew, 'CRM_SalesMenTargetDetailsModal', function () {
        CRM_SalesMenTargetDetails_LoadingWithPaging($('#hID').val());
        //   $("#btnSave1").attr("onclick", "CRM_SalesMenTargetDetails_Update(false);");
        //   $("#btnSaveandNew1").attr("onclick", "CRM_SalesMenTargetDetails_Update(true);");
        // $('.non_basic').removeClass('hide');
    });
}


function CRM_SalesMenTargetDetails_Delete(pID) {
    DeleteListFunction("/api/CRM_SalesMenTargetDetails/DeleteByID", { "pID": pID }, function () { CRM_SalesMenTargetDetails_LoadingWithPaging($('#hID').val()) });
}

function CRM_SalesMenTargetDetails_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblCRM_SalesMenTargetDetails') != "")
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
                DeleteListFunction("/api/CRM_SalesMenTargetDetails/Delete", { "pCRM_SalesMenTargetDetailsIDs": GetAllSelectedIDsAsString('tblCRM_SalesMenTargetDetails') }, function () { CRM_SalesMenTargetDetails_LoadingWithPaging($('#hID').val()); });
            });
    //DeleteListFunction("/api/CRM_Clients/Delete", { "pCRM_ClientsIDs": GetAllSelectedIDsAsString('tblCRM_Clients') }, function () { CRM_Clients_LoadingWithPaging(); });
}

function CRM_SalesMenTargetDetails_DeleteSelectedDetails() {
    debugger;

    GetAllSelectedIDsAsString('tblDetails');
    var i = 0;
    var SelectedIDs = GetAllSelectedIDsAsString('tblDetails').split(',');
    var listOfIDs = "";
    $('#tblDetails td').find('input[name="Delete"]:checked').each(function () {
        listOfIDs += ((listOfIDs == "") ? "" : ",") + ($(this).attr('counter'));
    });
    for (i = 0; i < listOfIDs.split(',').length; i++) {
        $('#tblDetails tbody tr[counter=' + listOfIDs.split(',')[i] + ']').remove();
    }
}

function GetDateObjectfromddmmyyyy(dateString) {
    var dateParts = dateString.split("/");
    var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

    return dateObject
}

function GetDaysNameFromNo(WeekEnds) {
    var arrDays = WeekEnds.split("-");
    var attDaysName = "";


    if (arrDays.length > 0) {
        $(arrDays).each(function (i, item) {
            console.log(item)
            switch (parseInt(item)) {
                case 0:
                    attDaysName += "Sunday ";
                    break;
                case 1:
                    attDaysName += "Monday ";
                    break;
                case 2:
                    attDaysName += "Tuesday ";
                    break;
                case 3:
                    attDaysName += "Wednesday ";
                    break;
                case 4:
                    attDaysName += "Thursday ";
                    break;
                case 5:
                    attDaysName += "Friday ";
                    break;
                case 6:
                    attDaysName += "Saturday ";
                    break;
            }

        });

    }

    return attDaysName;



}
function RefreshTargetTotal() {
    FadePageCover(true);
    debugger;
    if (isValidDate($('#txtFromDate').val(), 1) && isValidDate($('#txtToDate').val(), 1) && $('#txtTargetNo').val().trim() != "") {


        //debugger;


        //  count = count + parseInt(($('#hVacationCount').val().trim() == "" ? 0 : $('#hVacationCount').val().trim() ) )

        if ($('#cbIsDay').is(':checked')) {
            var count = GetDaysCountFromTo_Without_WeekEnd();
            $('#txtTotal').val((($('#txtTargetNo').val() * 1) * count));
            $('#txtPerDay').val($('#txtTargetNo').val());
            $('#txtDaysCount').val(count);
            FadePageCover(false);
        }
        else if ($('#cbIsMonth').is(':checked')) {
            if ($('#txtMonthYear').val().trim() == "") {
                FadePageCover(false);
                swal("Excuse Me", "Select Month & Yeay", "warning");
            }
            else {
                var FirstDate = "01/" + $('#txtMonthYear').val();
                var FirstDateObject = GetDateObjectfromddmmyyyy(FirstDate);
                var LastDateObject = new Date(FirstDateObject.getFullYear(), FirstDateObject.getMonth() + 1, 0);
                var LasDate = ConvertDateFormat(LastDateObject.toLocaleDateString());

                $('#txtFromDate').val(FirstDate);
                $('#txtToDate').val(LasDate);


                setTimeout(function () {
                    var count = GetDaysCountFromTo_Without_WeekEnd();
                    $('#txtTotal').val($('#txtTargetNo').val());
                    $('#txtPerMonth').val($('#txtTargetNo').val());
                    $('#txtPerDay').val((count / ($('#txtTargetNo').val() * 1)));
                    $('#txtDaysCount').val(count);
                    FadePageCover(false);
                }, 300);

            }
        }
        else {

            var count = GetDaysCountFromTo_Without_WeekEnd();
            $('#txtTotal').val($('#txtTargetNo').val());
            $('#txtPerMonth').val($('#txtTargetNo').val());
            $('#txtPerDay').val((($('#txtTargetNo').val() * 1) / count));
            $('#txtDaysCount').val(count);
            FadePageCover(false);
        }


    }
    else {
        FadePageCover(false);
        //swal("Excuse Me", " Fill Required Data [ Dates - # Target]", "warning");
    }

}




function GetDaysCountFromTo_Without_WeekEnd() {

    var count = 0;
    var from = GetDateObjectfromddmmyyyy($('#txtFromDate').val());
    var to = GetDateObjectfromddmmyyyy($('#txtToDate').val());

    console.log($('#hWeekEnd').val());
    var arrDays = $('#hWeekEnd').val().split("-");
    //var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var d = from;
    while (d <= to) {
        if (!(arrDays.includes((d.getDay()).toString()) == true || arrDays.includes((d.getDay()).toString()) == 'true')) {
            count++;

        }
        d = new Date(d.getTime() + (24 * 60 * 60 * 1000));
    }

    return count;
}

function GetDaysCountBetweenDates_Without_WeekEnd(DetailID) {

    var count = 0;
    var from = GetDateObjectfromddmmyyyy($('#txtFromDate' + DetailID + '').val());
    var to = GetDateObjectfromddmmyyyy($('#txtToDate' + DetailID + '').val());

    console.log($('#hWeekEnd').val());
    var arrDays = $('#hWeekEnd').val().split("-");
    //var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var d = from;
    while (d <= to) {
        if (!(arrDays.includes((d.getDay()).toString()) == true || arrDays.includes((d.getDay()).toString()) == 'true')) {
            count++;

        }
        d = new Date(d.getTime() + (24 * 60 * 60 * 1000));
    }

    return count;
}



function ClearTotal() {
    $('#txtTotal').val('');
    $('#txtTotalAmount').val('');
}
function AfterCheckPeriod() {
    if ($('#cbIsMonth').is(':checked')) {
        $('#dpMonths').removeClass('hide');
        $("#dpMonths").datepicker({
            format: "mm/yyyy",
            viewMode: "months",
            minViewMode: "months"
        });


        $('#txtFromDate').attr('disabled', 'disabled');
        $('#txtToDate').attr('disabled', 'disabled');
    }
    else {

        $('#dpMonths').addClass('hide');
        $('#txtFromDate').removeAttr('disabled');
        $('#txtToDate').removeAttr('disabled');
    }

}

function AfterCheckPeriod_Details(DetailID) {
    debugger;
    if ($('#cbIsMonth' + DetailID + '').is(':checked')) {
        $('#dpMonths' + DetailID + '').removeClass('hide');
        $("#dpMonths" + DetailID + "").datepicker({
            format: "mm/yyyy",
            viewMode: "months",
            minViewMode: "months"
        });


        $('#txtFromDate' + DetailID + '').attr('disabled', 'disabled');
        $('#txtToDate' + DetailID + '').attr('disabled', 'disabled');
    }
    else {

        $('#dpMonths' + DetailID + '').addClass('hide');
        $('#txtFromDate' + DetailID + '').removeAttr('disabled');
        $('#txtToDate' + DetailID + '').removeAttr('disabled');
    }

}

// #endregion


// #region Filters
function CRM_SalesMenTarget_FillSearchData() {
    var length = $('#slActionType_Search > option').length;

    if (length <= 0) {
        FadePageCover(true);
        $.ajax({
            type: "POST",
            url: strServerURL + "/api/CRM_Clients/IntializeData",
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (d) {
                debugger;
                Fill_SelectInputAfterLoadData(d[2], 'ID', 'Name', 'All SalesRep', '#slSalesman_Search', '');
                Fill_SelectInputAfterLoadData(d[3], 'ID', 'Name', 'All Actions', '#slActionType_Search', '');
                //  Fill_SelectInputAfterLoadData(JSON.parse(r.d[1]), 'ID', 'Name', 'All Sources', '#slSource_Search', '');
                FadePageCover(false);
            },
            error: function (jqXHR, exception) {
                debugger;
                swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
                FadePageCover(false);
            }
        });
    }
}


function CRM_SalesMenTarget_GetWhereClause(callback) {
    //ClientSqlQuery
    //ContactPersonsSqlQuery
    //FollowUpSqlQuery

    var WhereClause = "Where";
    var WhereClause_Details = "Where";



    if ($('#slSalesman_Search').val().trim() != "0") {
        WhereClause += " AND SalesRepID = " + $('#slSalesman_Search').val() + "";
    }

    if ($('#slActionType_Search').val().trim() != "0") {
        WhereClause += " AND ActionTypeID = " + $('#slActionType_Search').val() + "";

    }
    //------------------------------- Details Search   ------------------------------------------------------


    if ($('#txtFromDate_Search').val().trim() != "") {
        WhereClause += " AND CONVERT(date , FromDate ) >= CONVERT(date , '" + ConvertDateFormat($('#txtFromDate_Search').val()) + "')";
        WhereClause_Details += " AND CONVERT(date , FromDate ) >= CONVERT(date , '" + ConvertDateFormat($('#txtFromDate_Search').val()) + "')";
    }
    if ($('#txtToDate_Search').val().trim() != "") {
        WhereClause += " AND CONVERT(date , ToDate) <=  CONVERT(date ,'" + ConvertDateFormat($('#txtToDate_Search').val()) + "')";
        WhereClause_Details += " AND CONVERT(date , ToDate) <=  CONVERT(date ,'" + ConvertDateFormat($('#txtToDate_Search').val()) + "')";
    }


    //-------------------------------------------------------------------------------------------------

    if (WhereClause.trim() == "Where") {
        WhereClause = "Where 1 = 1";

    }
    else {

        WhereClause = WhereClause.replace("Where AND", "Where ");
    }

    console.log("WHEEEEEEEER", WhereClause);

    $('#SalesMenTargetSqlQuery').val(WhereClause);
    $('#SalesMenTargetDetailsSqlQuery').val(WhereClause_Details);




    if (typeof callback === "function") {
        // Execute the callback function and pass the parameters to it
        callback();
    }







}





// #endregion