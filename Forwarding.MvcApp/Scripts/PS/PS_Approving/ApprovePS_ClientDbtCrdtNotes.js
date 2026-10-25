// City Country ---------------------------------------------------------------
// Bind SC_Transactions Table Rows

function ApprovePS_ClientDbtCrdtNotes_BindTableRows(pSL_Invoices) {
    debugger;
    $("#hl-menu-SL").parent().addClass("active");
    ClearAllTableRows("tblApprovePS_ClientDbtCrdtNotes");
    $.each(pSL_Invoices, function (i, item) {
        debugger;

        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblApprovePS_ClientDbtCrdtNotes",
            ("<tr ID='" + item.ID + "' ondblclick=''>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Code' val='" + item.Code + "'>" + item.Code + "</td>"
                + "<td class='DbtCrdtNoteDate' val='" + GetDateFromServer(item.DbtCrdtNoteDate) + "'>" + GetDateFromServer(item.DbtCrdtNoteDate) + "</td>"
                + "<td class='ClientID' val='" + item.ClientID + "'>" + item.ClientName + "</td>"
                + "<td class='IsApproved'> <input type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='CurrencyID' val='" + item.CurrencyID + "'>" + item.CurrencyCode + "</td>"
                + "<td class='Notes' val='" + item.Notes + "'>" + item.Notes + "</td>"
                + "<td class='JVID hide' val='" + item.JVID + "'>" + item.JVID + "</td>"
                + "<td class='hSL_Invoices hide'><a href='#SL_InvoicesModal' data-toggle='modal' onclick='ApprovePS_ClientDbtCrdtNotes_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr> "));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblApprovePS_ClientDbtCrdtNotes", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblApprovePS_ClientDbtCrdtNotes>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function ApprovePS_ClientDbtCrdtNotes_LoadingWithPaging() {
    debugger;
    var WhereClause = "Where ISNULL(IsApproved , 0) = 0";

    if ($('#txtInvoiceNo_Filter').val().trim() != "") {
        WhereClause += " AND Code LIKE '%" + $('#txtInvoiceNo_Filter').val() + "%'";
    }
  
    if ($('#slClients_Filter').val().trim() != "" && $('#slClients_Filter').val().trim() != "0") {
        WhereClause += " AND ClientID = " + $('#slClients_Filter').val() + "";
    }
    if ($('#slCurrency_Filter').val().trim() != "" && $('#slCurrency_Filter').val().trim() != "0") {
        WhereClause += " AND CurrencyID = " + $('#slCurrency_Filter').val() + "";
    }
    if ($('#txtFromDate_Filter').val().trim() != "") {
        WhereClause += " AND CONVERT(date , DbtCrdtNoteDate ) >= CONVERT(date , '" + ConvertDateFormat($('#txtFromDate_Filter').val()) + "')";
    }
    if ($('#txtToDate_Filter').val().trim() != "") {
        WhereClause += " AND CONVERT(date , DbtCrdtNoteDate) <=  CONVERT(date ,'" + ConvertDateFormat($('#txtToDate_Filter').val()) + "')";
    }

    var pWhereClause = WhereClause;
    var pOrderBy = "Code";
    var pPageNumber = 1;
    var pPageSize = $('#select-page-size').val();
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }

    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
                 , function (pData) {
                     ApprovePS_ClientDbtCrdtNotes_BindTableRows((JSON.parse(pData[0]))); SL_ApproveInvoice_ClearAllControls();
                    
                 });
    //LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SL_ApprovingClientDbtCrdtNotes/LoadWithWhereClause", WhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { SL_ApproveInvoice_BindTableRows(pTabelRows); SL_ApproveInvoice_ClearAllControls(); });

    HighlightText("#tblApprovePS_ClientDbtCrdtNotes>tbody>tr", $("#txt-Search").val().trim());
}

function DCServicesGetWhereClause() {
    debugger;
    var WhereClause = "Where ISNULL(IsApproved , 0) = 0";

    if ($('#txtInvoiceNo_Filter').val().trim() != "") {
        WhereClause += " AND Code LIKE '%" + $('#txtInvoiceNo_Filter').val() + "%'";
    }

    if ($('#slClients_Filter').val().trim() != "" && $('#slClients_Filter').val().trim() != "0") {
        WhereClause += " AND ClientID = " + $('#slClients_Filter').val() + "";
    }
    if ($('#slCurrency_Filter').val().trim() != "" && $('#slCurrency_Filter').val().trim() != "0") {
        WhereClause += " AND CurrencyID = " + $('#slCurrency_Filter').val() + "";
    }
    if ($('#txtFromDate_Filter').val().trim() != "") {
        WhereClause += " AND CONVERT(date , DbtCrdtNoteDate ) >= CONVERT(date , '" + ConvertDateFormat($('#txtFromDate_Filter').val()) + "')";
    }
    if ($('#txtToDate_Filter').val().trim() != "") {
        WhereClause += " AND CONVERT(date , DbtCrdtNoteDate) <=  CONVERT(date ,'" + ConvertDateFormat($('#txtToDate_Filter').val()) + "')";
    }
    return WhereClause;
}



function ApprovePS_ClientDbtCrdtNotes() {
    debugger;
    console.log(GetAllSelectedIDsAsString("tblApprovePS_ClientDbtCrdtNotes"));
    var pSelectedIDs = GetAllSelectedIDsAsString("tblApprovePS_ClientDbtCrdtNotes");
    if (pSelectedIDs != "") {


        //*************
        swal({
            title: "Are you sure  ?",
            text: "You will Approve Selected DbtCrdtNotes ",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "OK , Approve !",
            cancelButtonText: "NO",
            closeOnConfirm: true
        },
            function (isConfirm) {
                //swal("Poof! Your imaginary file has been deleted!", {
                //    icon: "success",
                //});

                if (isConfirm) {
                    //-----------------------
                    FadePageCover(true);
                    CallGETFunctionWithParameters("/api/PS_ApprovePS_DbtCrdtNotes/Approve"
                        , { pSelectedIDs: pSelectedIDs, pApproved: true }
                        , function (pData) {
                            debugger;
                            if (pData[0]) {
                                swal("Success", "Saved successfully", "success");
                               ApprovePS_ClientDbtCrdtNotes_LoadingWithPaging();
                            }
                            else {
                                alert(pData[1]);
                                 FadePageCover(false);
                               // swal("Sorry", pData[1], "warning");                              
                               //SL_ApproveInvoice_LoadingWithPaging();
                            }
                        }
                        , null);

                    //----------
                }
                else {
                    console.log('refuse approve');
                }
            }
        );
        //*************





    }
}





function SC_Transactions_DeleteList() {
    //debugger;
    ////Confirmation message to delete
    //if (GetAllSelectedIDsAsString('tblSC_Transactions') != "")
    //    swal({
    //        title: "Are you sure?",
    //        text: "The selected records will be deleted permanently!",
    //        type: "warning",
    //        showCancelButton: true,
    //        confirmButtonColor: "#DD6B55",
    //        confirmButtonText: "Yes, delete!",
    //        closeOnConfirm: true
    //    },
    //    //callback function in case of success
    //    function () {
    //        DeleteListFunction("/api/SC_Transactions/Delete", { "pSL_InvoicesIDs": GetAllSelectedIDsAsString('tblSC_Transactions') }, function () { SC_Transactions_LoadingWithPaging(); });
    //    });
    //    //DeleteListFunction("/api/SC_Transactions/Delete", { "pSC_TransactionsIDs": GetAllSelectedIDsAsString('tblSC_Transactions') }, function () { SC_Transactions_LoadingWithPaging(); });
}



function SL_ApproveInvoice_ClearAllControls()
{


}

