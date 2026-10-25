
// #region Master
function A_Fiscal_Year_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/A_Fiscal_Year/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { A_Fiscal_Year_BindTableRows(pTabelRows); A_Fiscal_Year_ClearAllControls(); });
    HighlightText("#tblA_Fiscal_Year>tbody>tr", $("#txt-Search").val().trim());
}

function A_Fiscal_Year_BindTableRows(A_Fiscal_Year) {
    var detailsControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right hide' title='Periods'> <i class='fa fa-calendar' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Periods" + "</span>";
    // $('[data-toggle="tooltip"]').tooltip(); 
    // $('[data-toggle="popover"]').popover();
    debugger;
    $("#hl-menu-CRM").parent().addClass("active");
    ClearAllTableRows("tblA_Fiscal_Year");
    $.each(A_Fiscal_Year, function (i, item) {

        AppendRowtoTable("tblA_Fiscal_Year",
            ("<tr ID='" + item.ID + "' ondblclick='A_Fiscal_Year_GetPeriods(" + item.ID + " , " + item.Closed + " , \"" + item.Fiscal_Year_Name + "\" );'>"
                + "<td class='ID'> <input name='Delete' class='hide' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Fiscal_Year_Name' val='" + item.Fiscal_Year_Name + "'>" + item.Fiscal_Year_Name + "</td>"
                + "<td class='Closed '> <input type='checkbox' disabled='disabled' val='" + (item.Closed == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td style='' class='A_Fiscal_Year_Period'><a href='#' data-toggle='modal' onclick='A_Fiscal_Year_GetPeriods(" + item.ID + " , " + item.Closed + " , \"" + item.Fiscal_Year_Name + "\" );' " + detailsControlsText + "</a></td>"
                + "<td class='ss' val='" + 'ss' + "'>" + "" + "</td>"
                + "</tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblA_Fiscal_Year", "ID_A_Fiscal_Year", "ID_A_Fiscal_Year");
    CheckAllCheckbox("ID_A_Fiscal_Year");
    HighlightText("#tblA_Fiscal_Year>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function A_Fiscal_Year_Insert() {
    var YearExp = new RegExp('^[0-9]{4}$');
    //var email = new RegExp('^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$');
    //if (email.test(VAL)) {

    if ($('#txt-FiscalYear').val().trim() == "") {

        swal("Excuse Me", "Insert Fiscal Year", "warning");
        $('#txt-FiscalYear').addClass('bg-light');
    }
    else if (!(YearExp.test($('#txt-FiscalYear').val()))) {
        swal("Sorry", "Please insert correct format of year ex : 2020 ", "warning");
        $('#txt-FiscalYear').addClass('bg-light');
    }
    else {
        $('#txt-FiscalYear').removeClass('bg-light');
        debugger;
        InsertUpdateFunction("form", "/api/A_Fiscal_Year/Insert",
            {
                pFiscal_Year_Name: $('#txt-FiscalYear').val()
            }, null, null, function () {
                A_Fiscal_Year_LoadingWithPaging();
            });
    }
}

function A_Fiscal_Year_ClearAllControls() {
    $('#txt-FiscalYear').val("");
}
// #endregion


// #region Details




function A_Fiscal_Year_GetPeriods(ID, IsClosed, FiscalYearName) {
    //if (IsClosed == "true" || IsClosed == true )
    //{
    jQuery("#A_Fiscal_Year_PeriodtblModal").modal("show");
    $('#lblDetails').html("<span style='font-size:17px!important;'><u>&nbsp;Fiscal Year </u>: <sapn style='color:brown;'>" + FiscalYearName + "</span></span>"
        + "<span style='font-size:17px!important;'><u>&nbsp;Is Closed </u>: <span class='fiscalyear_isclosed' style='color:brown;'>" + IsClosed + " </span></span>");
    A_Fiscal_Year_Period_LoadAll(ID);
    //}
    $('#hIsClosed').val(IsClosed);

    $('#hID').val(ID);
}
function A_Fiscal_Year_Period_LoadAll(ID) {
    debugger;
    jQuery("#A_Fiscal_Year_PeriodtblModal").modal("show");
    var pWhereClause = ' Fiscal_Year_ID = ' + ID;
    LoadAll("api/A_Fiscal_Year_Period/LoadAll", pWhereClause, function (pData) {
        A_Fiscal_Year_Period_BindTableRows(JSON.parse(pData[0]));
    });
    //  HighlightText("#tblOperations>tbody>tr", $("#txt-Search").val().trim());
}




function A_Fiscal_Year_Period_ClearAllForm() {

    $('#txtFromDate').val(getTodaysDateInddMMyyyyFormat());
    $('#txtToDate').val(getTodaysDateInddMMyyyyFormat());
    $('#lblDetails1').html($('#lblDetails').html());
    $('#cbIsClosed').prop('checked', false);

    $("#btnSave1").attr("onclick", "A_Fiscal_Year_Period_Insert(false);");
    $("#btnSaveandNew1").attr("onclick", "A_Fiscal_Year_Period_Insert(true);");
}



function A_Fiscal_Year_Period_BindTableRows(A_Fiscal_Year_Period) {
    debugger;
    $("#hl-menu-CRM").parent().addClass("active");
    ClearAllTableRows("tblA_Fiscal_Year_Period");
    $.each(A_Fiscal_Year_Period, function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblA_Fiscal_Year_Period",
            ("<tr ID='" + item.ID + "' ondblclick='A_Fiscal_Year_Period_EditByDblClick(" + item.ID + ");'>"
                + "<td class='ID'> <input class='hide' name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='From_Date' val='" + GetDateFromServer(item.From_Date) + "'>" + GetDateFromServer(item.From_Date) + "</td>"
                + "<td class='To_Date' val='" + GetDateFromServer(item.To_Date) + "'>" + GetDateFromServer(item.To_Date) + "</td>"
                + "<td class='Closed '> <input type='checkbox' disabled='disabled' val='" + (item.Closed == true ? "true' checked='checked'" : "'") + " /></td>"
                + "</tr>"));


    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblA_Fiscal_Year_Period", "ID_A_Fiscal_Year_Period", "ID_A_Fiscal_Year_Period");
    CheckAllCheckbox("ID_A_Fiscal_Year_Period");
    // HighlightText("#tblA_Fiscal_Year_Period>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });


    console.log("parent " + parent.strBindTableRowsFunctionName);
}


function A_Fiscal_Year_Period_EditByDblClick(pID) {

    if ($('#hIsClosed').val().trim() == "false") {

        jQuery("#A_Fiscal_Year_PeriodModal").modal("show");
        //  A_Fiscal_Year_Period_FillSearchData();
        A_Fiscal_Year_Period_FillControls(pID);
    }
}



function A_Fiscal_Year_Period_FillControls(pID) {
    console.log($('#fiscalyear_isclosed').text());
    debugger;
    $('#txtFromDate').val(getTodaysDateInddMMyyyyFormat());
    $('#txtToDate').val(getTodaysDateInddMMyyyyFormat());
    // ClearAll("#A_Fiscal_Year_PeriodModal", null);

    $("#hID1").val(pID);
    var tr = $("tr[ID='" + pID + "']");

    $("#txtFromDate").val($(tr).find("td.From_Date").attr('val'));
    $("#txtToDate").val($(tr).find("td.To_Date").attr('val'));
    $("#cbIsClosed").prop('checked', $(tr).find('td.Closed').find('input').attr('val'));

    $('#lblDetails1').html($('#lblDetails').html());

    $("#btnSave1").attr("onclick", "A_Fiscal_Year_Period_Update(false);");
    $("#btnSaveandNew1").attr("onclick", "A_Fiscal_Year_Period_Update(true);");
}

function A_Fiscal_Year_Period_Insert(pSaveandAddNew) {
    debugger;

    if ($('#hIsClosed').val().trim() == "false") {
        console.log($('.fiscalyear_isclosed').text().split(" ")[0]);
        InsertUpdateFunction("form", "/api/A_Fiscal_Year_Period/Update", {
            pFromDate: ConvertDateFormat($("#txtFromDate").val()),
            pToDate: ConvertDateFormat($("#txtToDate").val()),
            pClosed: $("#cbIsClosed").prop('checked'),
            pFiscalYearID: $("#hID").val()
        }, pSaveandAddNew, 'A_Fiscal_Year_PeriodModal', function () {
            A_Fiscal_Year_Period_LoadAll($('#hID').val());
        });
    }
    else {
        swal("Sorry", "Cannot Insert new Period , Fiscal year is closed");

    }
}
// calling this function for update
function A_Fiscal_Year_Period_Update(pSaveandAddNew) {
    if ($('#hIsClosed').val().trim() == "false") {
        console.log($('.fiscalyear_isclosed').text().split(" ")[0]);
        InsertUpdateFunction("form", "/api/A_Fiscal_Year_Period/Update", {
            pID: $("#hID1").val(),
            pFromDate: ConvertDateFormat($("#txtFromDate").val()),
            pToDate: ConvertDateFormat($("#txtToDate").val()),
            pClosed: $("#cbIsClosed").prop('checked'),
            pFiscalYearID: $("#hID").val()
        }, pSaveandAddNew, 'A_Fiscal_Year_PeriodModal', function () {
            A_Fiscal_Year_Period_LoadAll($('#hID').val());
        });
    }
}


function A_Fiscal_Year_Period_Delete(pID) {
    DeleteListFunction("/api/A_Fiscal_Year_Period/DeleteByID", { "pID": pID }, function () { A_Fiscal_Year_Period_LoadingWithPaging($('#hID').val()) });
}

function A_Fiscal_Year_Period_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblA_Fiscal_Year_Period') != "")
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
                DeleteListFunction("/api/A_Fiscal_Year_Period/Delete", { "pA_Fiscal_Year_PeriodIDs": GetAllSelectedIDsAsString('tblA_Fiscal_Year_Period') }, function () { A_Fiscal_Year_Period_LoadingWithPaging($('#hID').val()); });
            });
    //DeleteListFunction("/api/CRM_Clients/Delete", { "pCRM_ClientsIDs": GetAllSelectedIDsAsString('tblCRM_Clients') }, function () { CRM_Clients_LoadingWithPaging(); });
}


// #endregion


