function Creditlimitexceptionperiod_BindTableRows(pJVTypes) {
    debugger;
    $("#hl-menu-Accounting").parent().addClass("active");
    ClearAllTableRows("tblJVTypes");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pJVTypes, function (i, item) {
        AppendRowtoTable("tblJVTypes",
        ("<tr customerID='" + item.customerID + "' ondblclick='SystemOptions_EditByDblClick(" + item.customerID + ");'>"
                    + "<td class='customerID hide'> <input name='Delete' type='checkbox' value='" + item.customerID + "' /></td>"

                    + "<td class='ID hide' val='" + item.ID + "'>" + item.ID + "</td>"
                    + "<td class='Date hide' val='" + GetDateFromServer(item.Date) + "'>" + GetDateFromServer(item.Date) + "</td>"
                    + "<td class='customerName'>" + item.customerName + "</td>"
                    + "<td class='LimitID hide'>" + item.LimitID + "</td>"
                    + "<td class='LimitValue hide'>" + item.LimitValue + "</td>"
                    + "<td class='TotalLimit hide'>" + item.TotalLimit + "</td>"
                    + "<td class='After90 hide'>" + item.After90 + "</td>"
                    + "<td class='Balance hide'>" + item.Balance + "</td>"
                   // + "<td class hide='ReadOnly'> <input type='checkbox' disabled='disabled' val='" + (item.ReadOnly == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='View'><a href='#LogCustomerCreditLimitModal' data-toggle='modal' onclick='LogCustomerCreditLimitModal(" + item.ID + ");' " + editLogTaxesPercentagesText + "</a></td>"
                    //+ "<td class='OptionValue'> <input type='checkbox' disabled='disabled' val='" + (item.OptionValue == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='hide'><a href='#JVTypesModal' data-toggle='modal' onclick='SystemOptions_FillControls(" + item.customerID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblJVTypes", "customerID");
    CheckAllCheckbox("customerID");
    HighlightText("#tblJVTypes>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function Creditlimitexceptionperiod_LoadingWithPaging() {
    debugger;
    var pWhereClause = Creditlimitexceptionperiod_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "customerName";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { Creditlimitexceptionperiod_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblJVTypes>tbody>tr", $("#txt-Search").val().trim());
}
function Creditlimitexceptionperiod_GetWhereClause() {
    debugger;
    return ($("#txt-Search").val().trim() == "" ? "WHERE 1=1" : ("WHERE customerName LIKE N'%" + $("#txt-Search").val().trim() + "%'"));
}
function SystemOptions_EditByDblClick(pID) {
    jQuery("#JVTypesModal").modal("show");
    SystemOptions_FillControls(pID);
}
function SystemOptions_ClearAllControls(callback) {
    ClearAll("#JVTypesModal");

    $("#btnSave").attr("onclick", "JVTypes_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "JVTypes_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
}
var OptionEnName = "";
var ReadOnly = false;
var Description = "";
var CatID = 0;
var CustomerID = 0;

function SystemOptions_FillControls(pID) {
    debugger;
    var totalBalance=0
    ClearAll("#JVTypesModal", null);
    $("#txtDate").val(getTodaysDateInddMMyyyyFormat());
    var tr = $("tr[customerID='" + pID + "']");
    totalBalance = parseFloat($(tr).find("td.TotalLimit").text()) - parseFloat($(tr).find("td.Balance").text());

    $("#hID").val($(tr).find("td.ID").attr('val'));
    $("#lblShown").html("<span> : </span><span>" + $(tr).find("td.customerName").text() + "</span>");
    $("#txtName").val($(tr).find("td.customerName").text());
    $("#txtTotalCredit").val($(tr).find("td.TotalLimit").text());
    $("#txtTotalLimit").val($(tr).find("td.LimitValue").text());
    $("#txtTotalBalance").val(totalBalance);
    $("#txtDate").val($(tr).find("td.Date").attr('val') == "01/01/1900" ? getTodaysDateInddMMyyyyFormat() : $(tr).find("td.Date").attr('val'));

    CustomerID = pID;


    //OptionEnName = $(tr).find("td.customerName").text();
    //ReadOnly = $(tr).find("td.ReadOnly").text();
    //Description = $(tr).find("td.Description").text();
    //CatID = $(tr).find("td.CatID").text();
    //$("#cbisOptionValue").prop('checked', $(tr).find('td.OptionValue').find('input').attr('val'));
    $("#txtName").attr("disabled", "disabled");
    $("#txtTotalCredit").attr("disabled", "disabled");
    $("#txtTotalLimit").attr("disabled", "disabled");
    $("#txtTotalBalance").attr("disabled", "disabled");


    $("#btnSave").attr("onclick", "JVTypes_Update(false);");
    $("#btnSaveandNew").attr("onclick", "JVTypes_Update(true);");
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $("#lblShown").reverseChildren();
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
}
function JVTypes_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/SystemOptions/Insert", { pOptionValue: $("#cbisOptionValue").prop('checked') }, pSaveandAddNew, "JVTypesModal", function () { Creditlimitexceptionperiod_LoadingWithPaging(); SystemOptions_ClearAllControls(); });
}
function JVTypes_Update(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/Creditlimitexceptionperiod/Update", { pID: $("#hID").val(), PcustomerID: CustomerID, pDate: ConvertDateFormat($('#txtDate').val()) }, pSaveandAddNew, "JVTypesModal", function () { Creditlimitexceptionperiod_LoadingWithPaging(); SystemOptions_ClearAllControls(); });
}
function JVTypes_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblJVTypes', 'Delete') != "")
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
            DeleteListFunction("/api/JVTypes/Delete", { "pJVTypesIDs": GetAllSelectedIDsAsString('tblJVTypes', 'Delete') }, function () {
                Creditlimitexceptionperiod_LoadingWithPaging();
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}
function LogCustomerCreditLimitModal(pID) {//pID = ID and it is the search key which will be used in the where clause
    debugger;
    var tr = $("tr[ID='" + pID + "']");

  //  $("#lblTaxeTypeCode").text($(tr).find("td.customerName").text());
    strLoadWithPagingFunctionName = "/api/Creditlimitexceptionperiod/CustomerCreditLoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    strBindTableRowsFunctionName = "LogCustomerCredit_BindTableRows";
    var pWhereClause = " WHERE CustomerCreditlimitexceptionperiod = " + pID;
    var pOrderBy = " DateLog DESC ";
    LoadWithPagingForModal(strLoadWithPagingFunctionName, pWhereClause, pOrderBy, 1 /*($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1)*/, $('#select-page-size').val().trim(), function (pTabelRows) {
        LogCustomerCredit_BindTableRows(pTabelRows); //TaxeTypes_ClearAllControls();
        //if ($("#txt-Search").val() != "" && $("#txt-Search").val() != undefined)
        //    HighlightText("#tblLogTaxesPercentages>tbody>tr", $("#txt-Search").val().trim());
    });
}

// Bind LogTaxesPercentages Table Rows
function LogCustomerCredit_BindTableRows(pLogTaxesPercentages) {
    debugger;
    //strLoadWithPagingFunctionName = "/api/LogTaxesPercentages/LoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    //strBindTableRowsFunctionName = "LogTaxesPercentages_BindTableRows";

    ClearAllTableRows("tblLogTaxesPercentages");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pLogTaxesPercentages, function (i, item) {
        //jQuery.noConflict();
        AppendRowtoTable("tblLogTaxesPercentages",
        ("<tr ID='" + item.ID + "'>"
                    //+ "<td class='LogTaxesPercentageID'> <input name='Delete' type='checkbox' value='" + item.LogTaxesPercentageID + "' /></td>"
                    //+ "<td class='Code'>" + item.Code + "</td>"
                    //+ "<td class='Name'>" + item.Name + "</td>"
                    //+ "<td class='LocalName'>" + item.LocalName + "</td>"
                    + "<td class='DateLog'>" + ConvertDateFormat(GetDateWithFormatMDY(item.DateLog)) + "</td>"
                    //+ "<td class='CreditLimit'>" + item.CreditLimit + "</td></tr>"
                    ));
        //+ "<td class='Notes'>" + item.Notes + "</td>"
        //+ "<td class='IsInactive'> <input type='checkbox' disabled='disabled' val='" + (item.IsInactive == true ? "true' checked='checked'" : "'") + " /></td>"
        //+ "<td><a href='#LogTaxesPercentagesModal' data-toggle='modal' onclick='LogTaxesPercentages_LoadingWithPagingForModal(" + item.ID + ");' " + editLogTaxesPercentagesText + "</a></td>"
        //+ "<td><a href='#TaxeTypeModal' data-toggle='modal' onclick='TaxeTypes_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
        //+ "<td><a data-target='#TaxeTypeModal' data-toggle='modal' " + editControlsText + "</a></td></tr>"));
        debugger;
    });
    debugger;
    BindAllCheckboxonTable("tblLogTaxesPercentages", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblLogTaxesPercentages>tbody>tr", $("#txt-Search").val().trim());

}
//to reset function names as in mainapp.master
function LogPercentages_ResetFunctionsNames() {
    //strLoadWithPagingFunctionName = "/api/TaxeTypes/LoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    strBindTableRowsFunctionName = "Creditlimitexceptionperiod_BindTableRows";
}