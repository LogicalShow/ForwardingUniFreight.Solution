// City Country ---------------------------------------------------------------
// Bind SC_Transactions Table Rows

function PS_ApprovePurchasingRequest_BindTableRows(pPS_Invoices) {
    debugger;
    $("#hl-menu-PS").parent().addClass("active");
    ClearAllTableRows("tblPS_ApprovePurchasingRequest");
    $.each(pPS_Invoices, function (i, item) {
        debugger;

        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblPS_ApprovePurchasingRequest",
            ("<tr ID='" + item.ID + "' ondblclick=''>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='RequestNo' val='" + item.RequestNo + "'>" + item.RequestNo + "</td>"
                + "<td class='RequestNoManual' val='" + item.RequestNoManual + "'>" + item.RequestNoManual + "</td>"
                + "<td class='RequestDate' val='" + GetDateFromServer(item.RequestDate) + "'>" + GetDateFromServer(item.RequestDate) + "</td>"
                + "<td class='BranchID' val='" + item.BranchID + "'>" + item.BranchName + "</td>"
                + "<td class='DepartmentID' val='" + item.DepartmentID + "'>" + item.DepartmentName + "</td>"
                + "<td class='Notes' val='" + item.Notes + "'>" + item.Notes + "</td>"
                + "<td class='IsApproved'> <input type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='hPS_ApprovePurchasingRequest hide'><a href='#PS_InvoicesModal' data-toggle='modal' onclick='PS_ApprovePurchasingRequest_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr > "));

    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblPS_ApprovePurchasingRequest", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblPS_ApprovePurchasingRequest>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function PS_ApprovePurchasingRequest_LoadingWithPaging() {
    debugger;
    var WhereClause = "Where ISNULL(IsDeleted , 0) = 0 and ISNULL(IsApproved , 0) = 0";


    if ($('#txtCode_Filter').val().trim() != "") {
        WhereClause += " AND RequestNo LIKE '%" + $('#txtCode_Filter').val() + "%'";
    }
    if ($('#txtFromDate_Filter').val().trim() != "") {
        WhereClause += " AND CONVERT(date , RequestDate ) >= CONVERT(date , '" + ConvertDateFormat($('#txtFromDate_Filter').val()) + "')";
    }
    if ($('#txtToDate_Filter').val().trim() != "") {
        WhereClause += " AND CONVERT(date , RequestDate) <=  CONVERT(date ,'" + ConvertDateFormat($('#txtToDate_Filter').val()) + "')";
    }

    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PS_ApprovePurchasingRequest/LoadWithWhereClause", WhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { PS_ApprovePurchasingRequest_BindTableRows(pTabelRows); PS_ApprovePurchasingRequest_ClearAllControls(); });
    HighlightText("#tblPS_ApprovePurchasingRequest>tbody>tr", $("#txt-Search").val().trim());
}


function PS_ApprovePurchasingRequest_ClearAllControls() {


}


function PS_ApprovePurchasingRequest_Approve() {

    console.log(GetAllSelectedIDsAsString("tblPS_ApprovePurchasingRequest"));
    var pSelectedIDs = GetAllSelectedIDsAsString("tblPS_ApprovePurchasingRequest");
    if (pSelectedIDs != "") {


        //*************
        swal({
            title: "Are you sure  ?",
            text: "You will Approve Selected Invoices ",
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
                    CallGETFunctionWithParameters("/api/PS_ApprovePurchasingRequest/Approve"
                        , { pSelectedIDs: pSelectedIDs, pApproved: true }
                        , function (pData) {
                            if (pData[0]) {
                                swal("Success", "Saved successfully", "success");
                               PS_ApprovePurchasingRequest_LoadingWithPaging();
                            }
                            else {
                                swal("Sorry", JSON.parse(pData[1]), "warning");

                            }
                        }
                        , null);

                    //----------
                }
                else {
                    console.log('refuse merge');
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
    //        DeleteListFunction("/api/SC_Transactions/Delete", { "pPS_InvoicesIDs": GetAllSelectedIDsAsString('tblSC_Transactions') }, function () { SC_Transactions_LoadingWithPaging(); });
    //    });
    //    //DeleteListFunction("/api/SC_Transactions/Delete", { "pSC_TransactionsIDs": GetAllSelectedIDsAsString('tblSC_Transactions') }, function () { SC_Transactions_LoadingWithPaging(); });
}





