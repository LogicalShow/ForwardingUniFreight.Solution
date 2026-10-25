// Currencies Region ---------------------------------------------------------------
// Bind Currencies Table Rows
function Currencies_BindTableRows(pCurrencies) {
    debugger;
    if (glbCallingControl == "Currencies")
        $("#hl-menu-MasterData").parent().addClass("active");
    else
        $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblCurrencies");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pCurrencies, function (i, item) {
        jQuery.noConflict();
        AppendRowtoTable("tblCurrencies",
        ("<tr ID='" + item.ID + "' ondblclick='Currencies_FillControls(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code'>" + item.Code + "</td>"
                    + "<td class='Name'>" + item.Name + "</td>"
                    + "<td class='LocalName'>" + item.LocalName + "</td>"
                    + "<td class='CurrentExchangeRate hide'>" + item.CurrentExchangeRate + "</td>"
                    + "<td class='CurrentExchangeRateDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CurrentExchangeRateDate)) + "</td>"
                    //+ "<td class='Notes'>" + item.Notes + "</td>"
                    + "<td class='IsInactive hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsInactive == true ? "true' checked='checked'" : "'") + " /></td>"
                    //i added class='View' to the next line to exclude it from security in case of CanView only
                    + "<td class=' hide'><a href='#LogExchangeRatesModal' data-toggle='modal' onclick='LogExchangeRates_LoadingWithPagingForModal(" + item.ID + ");' " + editLogExchangeRatesText + "</a></td>"
                    //+ "<td class='hide'><a href='#CurrencyModal' data-toggle='modal' onclick='Currencies_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
                    + "<td class='hide'><a href='#' data-toggle='modal' onclick='Currencies_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblCurrencies", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblCurrencies>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function Currencies_EditByDblClick(pID) {
    jQuery("#CurrencyModal").modal("show");
    Currencies_FillControls(pID);
}
function Currencies_LoadingWithPaging() {
    debugger;
    var pWhereClause = Currencies_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "Code";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { Currencies_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblCurrencies>tbody>tr", $("#txt-Search").val().trim());
}
function Currencies_GetWhereClause() {
    var pWhereClause = "WHERE 1=1";
    if ($("#txt-Search").val().trim() != "") {
        pWhereClause += " AND (" + "\n";
        pWhereClause += " Code LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += " OR Name LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += ")";
    }
    return pWhereClause;
}
//function Currencies_Insert(pSaveandAddNew) {
//    debugger;
//    var datevar = ($("#txtCurrentExchangeRateDate").val().trim() == "" ? "" : ConvertDateFormat($("#txtCurrentExchangeRateDate").val().trim()));
//    InsertUpdateFunction("form", "/api/Currencies/Insert", { pCode: $("#txtCode").val().trim(), pName: $("#txtName").val().trim(), pLocalName: $("#txtLocalName").val().trim(), pCurrentExchangeRate: $("#txtCurrentExchangeRate").val().trim(), pCurrentExchangeRateDate: datevar, pNotes: ($("#txtNotes").val() == null ? "" : $("#txtNotes").val().trim()), pIsInactive: $("#cbIsInactive").prop('checked') }, pSaveandAddNew, "CurrencyModal", function () { Currencies_LoadingWithPaging(); });
//}
//function Currencies_Update(pSaveandAddNew) {
//    debugger;
//    var datevar = ConvertDateFormat($("#txtCurrentExchangeRateDate").val().trim());
//    InsertUpdateFunction("form", "/api/Currencies/Update", { pID: $("#hID").val(), pCode: $("#txtCode").val().trim(), pName: $("#txtName").val().trim(), pLocalName: $("#txtLocalName").val().trim(), pCurrentExchangeRate: $("#txtCurrentExchangeRate").val().trim(), pCurrentExchangeRateDate: datevar, pNotes: ($("#txtNotes").val() == null ? "" : $("#txtNotes").val().trim()), pIsInactive: $("#cbIsInactive").prop('checked') }, pSaveandAddNew, "CurrencyModal", function () { Currencies_LoadingWithPaging(); });
//}
function Currencies_Save() {
    debugger;
    if (ValidateForm("form", "CurrencyModal")) {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/Currencies/Save"
            , {
                pID: $("#hID").val() == "" ? 0 : $("#hID").val()
                , pCode: $("#txtCode").val().trim().toUpperCase()
                , pName: $("#txtName").val().trim().toUpperCase()
                , pLocalName: $("#txtName").val().trim().toUpperCase() //$("#txtLocalName").val().trim()
                //pCurrentExchangeRate,pCurrentExchangeRateDate are set in saving details //pCurrentExchangeRateDate is used as from date
                , pCurrentExchangeRate: 0 //$("#txtCurrentExchangeRate").val().trim()
                , pCurrentExchangeRateDate: "01/01/1900"//ConvertDateFormat($("#txtCurrentExchangeRateDate").val().trim())
                , pNotes: ($("#txtNotes").val() == null ? "" : $("#txtNotes").val().trim().toUpperCase())
                , pIsInactive: $("#cbIsInactive").prop('checked')
            }
            , function (pData) {
                if (pData[0]) {
                    swal("Success", "Saved successfully.");
                    jQuery("#CurrencyModal").modal("hide");
                    Currencies_LoadingWithPaging();
                    $("#hID").val(pData[1]);
                }
                else {
                    swal("Sorry", strUniqueFailInsertUpdateGeneralMessage);
                    FadePageCover(false);
                }
            }
            , null);
    }
}
//function Currencies_Delete(pID) {
//    DeleteListFunction("/api/Currencies/DeleteByID", { "pID": pID }, function () { Currencies_LoadingWithPaging(); });
//}
function Currencies_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblCurrencies') != "")
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
            DeleteListFunction("/api/Currencies/Delete", { "pCurrenciesIDs": GetAllSelectedIDsAsString('tblCurrencies') }, function () { Currencies_LoadingWithPaging(); });
        });
    //DeleteListFunction("/api/Currencies/Delete", { "pCurrenciesIDs": GetAllSelectedIDsAsString('tblCurrencies') }, function () { Currencies_LoadingWithPaging(); });
}
function Currencies_ClearAllControls(callback) {
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName", "txtCurrentExchangeRate", "txtCurrentExchangeRateDate", "txtNotes"), null, new Array("cbIsInactive"));//an alternative fn is with abdelmawgood
    ClearAll("#CurrencyModal");
    $("#tblDetails tbody").html("");
    $("#txtCurrentExchangeRate").val(0);

    //$("#btnSave").attr("onclick", "Currencies_Insert(false);");
    //$("#btnSaveandNew").attr("onclick", "Currencies_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
}
function Currencies_FillControls(pID) {
    debugger;
    if (pID == $("#hDefaultCurrencyID").val() )
        swal("Sorry", "You can not change the default currency exchange rate.");
    else {
        ClearAll("#CurrencyModal");
        $("#tblDetails tbody").html("");
        FadePageCover(true);
        jQuery("#CurrencyModal").modal("show");
        CallGETFunctionWithParameters("/api/Currencies/GetCurrencyDetails"
            , {
                pPageNumber: 1
                , pPageSize: 9999
                , pWhereClauseCurrencyDetails: "WHERE Currency_ID=" + pID
                , pOrderBy: "FromDate"
            }
            , function (pData) {
                Details_BindTableRows(JSON.parse(pData[0]));
                FadePageCover(false);
            }
            , null);

        var tr = $("tr[ID='" + pID + "']");
        $("#hID").val(pID);

        $("#lblShown").html(": " + $(tr).find("td.Code").text());
        $("#txtCode").val($(tr).find("td.Code").text());
        $("#txtName").val($(tr).find("td.Name").text());
        $("#txtLocalName").val($(tr).find("td.LocalName").text());
        $("#txtCurrentExchangeRate").val($(tr).find("td.CurrentExchangeRate").text());
        $("#txtCurrentExchangeRateDate").val($(tr).find("td.CurrentExchangeRateDate").html());
        $("#txtNotes").val($(tr).find("td.Notes").text());
        $("#cbIsInactive").prop('checked', $(tr).find('td.IsInactive').find('input').attr('val'));

        //$("#btnSave").attr("onclick", "Currencies_Update(false);");
        //$("#btnSaveandNew").attr("onclick", "Currencies_Update(true);");
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
            $("#lblShown").reverseChildren();
            $(".swapChildrenClass:not(.reversed)").reverseChildren();
        }
    }
}

// LogExchangeRates
//after pressing Perc. Log, gets the data
//sherif: used in case searching for specific ID and filling table in a modal
function LogExchangeRates_LoadingWithPagingForModal(pID) {//pID = ID and it is the search key which will be used in the where clause
    debugger;
    var tr = $("tr[ID='" + pID + "']");
    $("#tblLogExchangeRates tbody tr").html("");
    $("#lblCurrencyCode").text($(tr).find("td.Name").text());
    strLoadWithPagingFunctionName = "/api/LogExchangeRates/LoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    strBindTableRowsFunctionName = "LogExchangeRates_BindTableRows";
    var pWhereClause = " WHERE CurrencyID = " + pID;
    var pOrderBy = " LogExchangeRateID DESC ";
    LoadWithPagingForModal(strLoadWithPagingFunctionName, pWhereClause, pOrderBy, 1 /*($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1)*/, $('#select-page-size').val().trim(), function (pTabelRows) {
        LogExchangeRates_BindTableRows(pTabelRows); //Currencies_ClearAllControls();
        //if ($("#txt-Search").val() != "" && $("#txt-Search").val() != undefined)
        //    HighlightText("#tblLogExchangeRates>tbody>tr", $("#txt-Search").val().trim());
    });
}
// Bind LogExchangeRates Table Rows
function LogExchangeRates_BindTableRows(pLogExchangeRates) {
    debugger;
    //strLoadWithPagingFunctionName = "/api/LogExchangeRates/LoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    //strBindTableRowsFunctionName = "LogExchangeRates_BindTableRows";

    ClearAllTableRows("tblLogExchangeRates");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pLogExchangeRates, function (i, item) {
        //jQuery.noConflict();
        AppendRowtoTable("tblLogExchangeRates",
        ("<tr LogExchangeRateID='" + item.LogExchangeRateID + "'>"
                    //+ "<td class='LogExchangeRateID'> <input name='Delete' type='checkbox' value='" + item.LogExchangeRateID + "' /></td>"
                    //+ "<td class='Code'>" + item.Code + "</td>"
                    //+ "<td class='Name'>" + item.Name + "</td>"
                    //+ "<td class='LocalName'>" + item.LocalName + "</td>"
                    + "<td class='ExchangeRateDate'>" + ConvertDateFormat(GetDateWithFormatMDY(item.ExchangeRateDate)) + "</td>"
                    + "<td class='ExchangeRate'>" + item.ExchangeRate + "</td></tr>"));
        //+ "<td class='Notes'>" + item.Notes + "</td>"
        //+ "<td class='IsInactive'> <input type='checkbox' disabled='disabled' val='" + (item.IsInactive == true ? "true' checked='checked'" : "'") + " /></td>"
        //+ "<td><a href='#LogExchangeRatesModal' data-toggle='modal' onclick='LogExchangeRates_LoadingWithPagingForModal(" + item.ID + ");' " + editLogExchangeRatesText + "</a></td>"
        //+ "<td><a href='#CurrencyModal' data-toggle='modal' onclick='Currencies_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
        //+ "<td><a data-target='#CurrencyModal' data-toggle='modal' " + editControlsText + "</a></td></tr>"));
        debugger;
    });
    debugger;
    BindAllCheckboxonTable("tblLogExchangeRates", "LogExchangeRateID");
    CheckAllCheckbox("ID");
    //HighlightText("#tblLogExchangeRates>tbody>tr", $("#txt-Search").val().trim());
}
//to reset function names as in mainapp.master
function LogExchangeRates_ResetFunctionsNames() {
    strLoadWithPagingFunctionName = "/api/Currencies/LoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    strBindTableRowsFunctionName = "Currencies_BindTableRows";
}
//function ToJavaScriptDate(value) {

//  //  if (String(value).indexOf('/Date(') == 0)
//  //  {
//        value = new Date(parseInt(value.replace(/\/Date\((.*?)\)\//gi, "$1")));
//   // }

//    var date = value;
//    console.log("string : " + value)
//    var nowDate = value;
//    console.log(nowDate);
//    var result = "";

//    result += nowDate.format("dd/mm/yyyy");
//    return result;
//}
/****************************************CurrencyExchangeRates*********************************************/
function Details_BindTableRows(pTableRows) {
    debugger;
    ClearAllTableRows("tblDetails");
    $.each(pTableRows, function (i, item) {
        AppendRowtoTable("tblDetails",
            ("<tr ID='" + item.ID + "' "
                + (" ondblclick='Details_FillControls(" + item.ID + ");' ")
                + ">"
                    + "<td class='DetailsID'> <input " + (1 == 2 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td>" + (i + 1) + "</td>"
                    + "<td class='Currency_ID hide'>" + item.Currency_ID + "</td>"
                    + "<td class='FromDate'>" + GetDateFromServer(item.FromDate) /*(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.FromDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.FromDate)))*/ + "</td>"
                    + "<td class='ToDate'>" + GetDateFromServer(item.ToDate)/*(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ToDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ToDate)))*/ + "</td>"
                    + "<td class='ExchangeRate'>" + item.ExchangeRate + "</td>"
                    + "<td class='SellingRate'>" + item.SellingRate + "</td>"

                    + "<td class='hide'><a href='#DetailsModal' data-toggle='modal' onclick='Details_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    //ApplyPermissions();
    BindAllCheckboxonTable("tblDetails", "DetailsID", "cbDetailsDeleteHeader");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    CheckAllCheckbox("HeaderDeleteDetailsID");
    //HighlightText("#tblDetails>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
}
function Details_ClearAllControls() {
    debugger;
    if ($("#hID").val() == "")
        swal("Sorry", "Please save header first.");
    else if ($("#hID").val() == $("#hDefautCurrencyID").val())
        swal("Sorry", "You can not change the default currency exchange rate.");
    else {
        ClearAll("#DetailsModal");
        $("#txtFromDate").val(getTodaysDateInddMMyyyyFormat());
        $("#txtToDate").val($("#txtFromDate").val());
        $("#txtSellingRate").val(0);
        jQuery("#DetailsModal").modal("show");
    }
}
function Details_FillControls(pDetailsID) {
    debugger;
    ClearAll("#DetailsModal");
    $("#lblDetails").html($("#lblShown").html());

    var tr = $("#tblDetails tr[ID='" + pDetailsID + "']");

    $("#lblDetails").html($("#lblShown").html());
    $("#hDetailsID").val(pDetailsID);
    $("#txtFromDate").val($(tr).find("td.FromDate").text());
    $("#txtToDate").val($(tr).find("td.ToDate").text());
    $("#txtExchangeRate").val($(tr).find("td.ExchangeRate").text());
    $("#txtSellingRate").val($(tr).find("td.SellingRate").text());

    jQuery("#DetailsModal").modal("show");
}
function Details_Save(pSaveAndAddNew) {
    debugger;
    if (ValidateForm("form", "DetailsModal"))
        if (Details_Validate()) {
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/Currencies/CurrencyDetails_Save"
                , {
                    pDetailsID: ($("#hDetailsID").val() == "" ? 0 : $("#hDetailsID").val())
                    , pCurrency_ID: $("#hID").val()
                    , pFromDate: ConvertDateFormat($("#txtFromDate").val())
                    , pToDate: ConvertDateFormat($("#txtToDate").val())
                    , pExchangeRate: ($("#txtExchangeRate").val() == "" ? 0 : $("#txtExchangeRate").val())
                    , pSellingRate: ($("#txtSellingRate").val() == "" ? 0 : $("#txtSellingRate").val())
                }
                , function (pData) {
                    if (pData[0]) {
                        $("#hDetailsID").val(pData[1]);
                        Details_BindTableRows(JSON.parse(pData[2]));
                        if (pSaveAndAddNew) {
                            Details_ClearAllControls();
                        }
                        else
                            jQuery("#DetailsModal").modal("hide");
                        swal("Success", "Saved successfully.");
                        LoadDefaults("/api/Defaults/LoadAll", " WHERE ID = 1 ");
                    }
                    else
                        swal("Sorry", "Connection failed, please try again.");
                    FadePageCover(false);
                }
                , null);
        }
}
function Details_Validate() {
    debugger;
    var _result = true;
    $.each($("#tblDetails tbody tr"), function (i, item) {
        var itemFromDate = $(item).find("td.FromDate").text();
        var itemToDate = $(item).find("td.ToDate").text();
        if ($("#txtExchangeRate").val() == 0) {
            swal("Sorry", "Exchange rate must be greater than 0.");
            _result = false;
            return false;
        }
        else if (Date.prototype.compareDates(ConvertDateFormat($("#txtFromDate").val()), ConvertDateFormat($("#txtToDate").val())) < 0) {
            swal("Sorry", "The FROM-TO dates are not correct.");
            _result = false;
            return false;
        }
        else if ($("#hDetailsID").val() != item.id
            && (
                    (Date.prototype.compareDates(ConvertDateFormat($("#txtFromDate").val()), ConvertDateFormat(itemFromDate)) <= 0
                     && Date.prototype.compareDates(ConvertDateFormat($("#txtFromDate").val()), ConvertDateFormat(itemToDate)) >= 0
                    )
                    ||
                    (Date.prototype.compareDates(ConvertDateFormat($("#txtToDate").val()), ConvertDateFormat(itemFromDate)) <= 0
                     && Date.prototype.compareDates(ConvertDateFormat($("#txtToDate").val()), ConvertDateFormat(itemToDate)) >= 0
                    )
                    || //to handle the case of being before first FromDate and greater than greatest ToDate
                    (Date.prototype.compareDates(ConvertDateFormat($("#txtFromDate").val()), ConvertDateFormat(itemFromDate)) >= 0
                     && Date.prototype.compareDates(ConvertDateFormat($("#txtToDate").val()), ConvertDateFormat(itemToDate)) <= 0
                    )
               )
            ) {
            swal("Sorry", "There is conflict with row " + (i + 1));
            _result = false;
            return false;
        }
    });
    return _result;
}
function Details_DeleteList(pDeletedDetailsIDs) {
    debugger;
    var pDeletedDetailsIDs = GetAllSelectedIDsAsString('tblDetails', 'Delete');
    if (pDeletedDetailsIDs != "")
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
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/Currencies/CurrencyDetails_Delete"
                , { pDeletedDetailsIDs: pDeletedDetailsIDs, pCurrencyID: $("#hID").val() }
                , function (pData) {
                    Details_BindTableRows(JSON.parse(pData[1]));
                    if (pData[0])
                        swal("Success", "Deleted successfully.");
                    else
                        swal("Sorry", strDeleteFailMessage);
                    FadePageCover(false);
                }
                , null);
        });
}
////to reset function names as in mainapp.master
//function Details_ResetFunctionsNames() {
//    strLoadWithPagingFunctionName = "/api/Currencies/LoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
//    strBindTableRowsFunctionName = "Currencies_BindTableRows";
//}
