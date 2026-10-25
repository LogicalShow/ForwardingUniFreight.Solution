var maxIDInTable = 0; //used to for when adding new row then make td control names unique
function SC_TankatApprove_BindTableRows(pTableRows) {
    debugger;
    $("#hl-menu-ShipLink").parent().addClass("active");
    ClearAllTableRows("tblSC_TankatApprove");
    var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";

    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pTableRows, function (i, item) {
        AppendRowtoTable("tblSC_TankatApprove",
            //("<tr ID='" + item.ID + "' ondblclick='Voucher_FillControls(" + item.ID + ");'>"
            ("<tr ID='" + item.ID + "' class='" + (item.JVID1 == 0 ? "" : "text-primary") + "'" + ">"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Code'>" + (item.Code == 0 ? "" : item.Code) + "</td>"

                + "<td class='TransactionDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.TransactionDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.TransactionDate))) + "</td>"
                    //+ "<td class='PaymentDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.PaymentDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.PaymentDate))) + "</td>"
                + "<td class='Total'>" + item.Total + "</td>"
                + "<td class='Notes'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                + "<td class='TransType'>" + item.TransType + "</td>"
                + "<td class='TankNumber'>" + item.TankNumber + "</td>"

                + "<td class='CustomerName'>" + (item.CustomerName == 0 ? "" : item.CustomerName) + "</td>"
                + "<td class='Print'><a href='' data-toggle='modal' onclick='Tank_Print(" + item.ID + ");' " + printControlsText + "</a></td>"

                    //+ "<td class='JobNo'>" + (item.JobNo == 0 ? "" : item.JobNo) + "</td>"

             //+ "<td class='hide'><a href='#VoucherModal' data-toggle='modal' onclick='Voucher_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
            + "</tr>"));
    });
    //ApplyPermissions();
    BindAllCheckboxonTable("tblSC_TankatApprove", "ID");
    CheckAllCheckbox("ID");
    //HighlightText("#tblJournalTypes>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function Tank_Print(pID) {

    debugger;
    var arr_Keys = new Array();
    var arr_Values = new Array();
    arr_Keys.push("ID");
    arr_Values.push(pID);

    var pParametersWithValues =
    {
        arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: "Transactions Details"
        , pReportName: "SC_TransactionsDetailsTank"
    };
    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintPS_Payment?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '&pReportName=' + pParametersWithValues.pReportName + '';

    win.location = url;
}
function SC_TankatApprove_LoadingWithPaging() {
    debugger;
    var pWhereClause = SC_TankatApprove_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = 1;//($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = $("#cbIsJV1").prop("checked") ? "TransactionDate" : "TransactionDate";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { SC_TankatApprove_BindTableRows(JSON.parse(pData[0])); });
    //HighlightText("#tblSC_TankatApprove>tbody>tr", $("#txt-Search").val().trim());
}
function SC_TankatApprove_GetWhereClause() {
    debugger;


    var pWhereClause = "";
    //pWhereClause += 
    //     ("WHERE IssueDate >= '" + GetDateWithFormatyyyyMMdd($("#txtSearchFrom").val()) + "' AND IssueDate<='" + GetDateWithFormatyyyyMMdd($("#txtSearchTo").val()) + " 23:59:59'" + "\n")
    if ($("#cbIsApproved").prop("checked")) {
        pWhereClause += " where isnull(IsConfirm,0) =0 AND isnull(IsDeleted,0)=0" + "\n";

    }
    else if ($("#cbIsUnApproved").prop("checked")) {
        pWhereClause += " where IsConfirm =1" + "\n";

    }
    //  pWhereClause += " where JVID IS NULL" + "\n";

    //pWhereClause += ($("#hDefaultUnEditableCompanyName").val() != "ONE" ? " AND IsAudited=1 " : "");
    if ($("#slClients").val() != 0)
        pWhereClause += " AND ClientID=" + $("#slClients").val();
    if ($("#slType").val() != 1)
        pWhereClause += " AND TypeID=" + $("#slType").val();

    if (isValidDate($("#txtSearchFrom").val().trim(), 1) && $("#txtSearchFrom").val().trim() != "")
        pWhereClause += " AND CONVERT(date,TransactionDate,103) >= '" + GetDateWithFormatyyyyMMdd($("#txtSearchFrom").val().trim()) + "'" + " \n";
    if (isValidDate($("#txtSearchTo").val().trim(), 1) && $("#txtSearchTo").val().trim() != "")
        pWhereClause += " AND CONVERT(date,TransactionDate,103) <= '" + GetDateWithFormatyyyyMMdd($("#txtSearchTo").val().trim()) + "'" + " \n";


    if ($("#txtSearchInvoiceNo").val().trim() != "")
        pWhereClause += " AND Code LIKE N'" + $("#txtSearchInvoiceNo").val().trim() + "%'" + "\n";
    if ($("#txtSearchTankNumber").val().trim() != "")
        pWhereClause += " AND TankNumber LIKE N'%" + $("#txtSearchTankNumber").val().trim() + "%'" + "\n";
    //if ($("#txtSearchBillNo").val().trim() != "")
    //    pWhereClause += " AND BillNumber LIKE N'" + $("#txtSearchBillNo").val().trim() + "%'" + "\n";

    return pWhereClause;
}
function SC_TankatApprove_LinkRevenueItems() {
    debugger;
    var pSelectedIDs = GetAllSelectedIDsAsString('tblSC_TankatApprove', 'Delete');
    if (pSelectedIDs != "") {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/SC_TankatApprove/GetRevenueItemsModalData"
            , {
                pSelectedIDsToGetRevenueItems: pSelectedIDs
               
            }
            , function (pData) {
                var pVoyageAccountID = pData[1];
                var pSubAccounts = pData[2];
                FillListFromObject_ERP(null, 4/*pCodeOrName*/, TranslateString("<--Select-->"), "slVoyageSubAccount", pSubAccounts, null);
                $("#slVoyageAccount").val(pVoyageAccountID);
                jQuery("#ShipLinkRevenueItemsModal").modal("show");
                ShipLinkRevenueItems_BindTableRows(JSON.parse(pData[0]));
                FadePageCover(false);
            }
            , null);
    }
}
function SC_TankatApprove_Post(pIsSaveRevenueItems) {
    debugger;
    var isValid = true;
    var pPostedSelectedIDs = GetAllSelectedIDsAsString('tblSC_TankatApprove', 'Delete');
    if (pPostedSelectedIDs != "") {
        FadePageCover(true);
        //if the Company is not ONEEgypt then pIsSaveRevenueItems will be false (set in mainapp.js)
        if (pIsSaveRevenueItems) { //then validate Revenue items before saving
            if (!ShipLinkRevenueItems_IsValid("ShipLinkRevenueItemsModal")) {
                isValid = false; FadePageCover(false);
            }
            else if (!ShipLinkRevenueItems_IsUniqueItems()) {
                isValid = false; FadePageCover(false);
            }
        }
        if ($('#txtDate').val() == "" && $("#cbIsApproved").prop("checked")) {
            swal('Excuse me', 'You must Select TransactionDate', 'warning');
            isValid = false; FadePageCover(false);
        }
        if (isValid) {
      
           
            CallGETFunctionWithParameters("/api/SC_TankatApprove/Post"
                , {
                    pPostedSelectedIDs: pPostedSelectedIDs
                    , pPost: $("#cbIsApproved").prop("checked") ? true : false
                    , pDate: ConvertDateFormat($("#txtDate").val().trim())
                   
                }
                , function (pData) {
                    if (pData[0] == "") {
                        swal("Success", "Saved successfully");
                    }
                    else {
                        swal("Sorry", pData[0]);
                    }
                    jQuery("#ShipLinkRevenueItemsModal").modal("hide");
                    SC_TankatApprove_LoadingWithPaging();
                    //FadePageCover(false); //done in loadwithpaging
                }
                , null);
        }
    }
}


function HideShowButtons() {
    if ($("#cbIsApproved").prop("checked") == true) {
        $("#btn-Post").removeClass("hide");
        $("#btn-UNPost").addClass("hide");


    }
    else {
        $("#btn-UNPost").removeClass("hide");
        $("#btn-Post").addClass("hide");

    }
}
$(document).ready(function () {
    $('#slClients').css({ 'width': '100%' }).select2();
});