/*********************************************Main Screen Fns (showing partners)************************************************/
function A_ARAllocation_Partners_BindTableRows(pTableRows) {
    debugger;
    $("#hl-menu-Accounting").parent().addClass("active");
    ClearAllTableRows("tblPartner");
    ////var editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    //var printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Cashier") + "</span>";
    //var notificationsControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-quote-left' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Notifications") + "</span>";
    //var cancelControlsText = " class='btn btn-xs btn-rounded btn-danger float-right' > <i class='fa ' style='padding-left: 5px;'>X &nbsp;&nbsp;&nbsp;</i> <span style='padding-right: 5px;'>" + "إلغاء" + "</span>";
    //var cancelledControlsText = " class='btn btn-xs btn-rounded btn-danger float-right' > <i class='fa ' style='padding-left: 5px;'>X </i> <span style='padding-right: 5px;'>" + "تم إلغائها" + "</span>";
    //var restoreControlsText = " class='btn btn-xs btn-rounded btn-warning float-right' > <i class='fa fa-undo' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "استعادة" + "</span>";
    $.each(pTableRows, function (i, item) {
        AppendRowtoTable("tblPartner",
            ("<tr ID='" + item.ID + "' " 
                //+ (" ondblclick='ARAllocation_EditByDblClick(" + item.ID + "," + item.PartnerTypeID + "," + '"' + item.Name + '","' + (item.AvailableBalance.toFixed(4) + ' ' + $("#hDefaultCurrencyCode").val()) + '"' + ");' ")
                + (" ondblclick='ARAllocation_EditByDblClick(" + item.ID + "," + item.PartnerTypeID + "," + '"' + item.Name + '","' + (glbTransactionType == constTransactionReceivableAllocation ? item.UnAllocatedReceivables : item.UnAllocatedPayables) + '"' + ");' ")
                //+ (
                //    (item.IsApproved)
                //    ? (" class='text-primary' " + " ondblclick='ARAllocation_EditByDblClick(" + item.ID + ");' ")
                //    : (" ondblclick='ARAllocation_EditByDblClick(" + item.ID + ");' ")
                //    )
                + ">"
                    //+ "<td class='ARFID'> <input " + (item.TotalActuallyReceived > 0 || item.UnPaidCashiersCount > 0 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + item.ID + "' /></td>"
                    //+ "<td class='PartnerID'> <input " + (item.IsApproved ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='PartnerID'> <input " + " name='Delete' " + " type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='PartnerTypeID' val=" + item.PartnerTypeID + " >" + item.PartnerTypeName + "</td>"
                    + "<td class='PartnerCode hide'>" + (item.Code == 0 ? "" : item.Code) + "</td>"
                    + "<td class='PartnerID' val=" + item.PartnerID + " >" + item.Name.split('(')[0] + "</td>"
                    //+ "<td class='AvailableBalance'>" + item.AvailableBalance.toFixed(4) + ' ' + $("#hDefaultCurrencyCode").val() + "</td>"
                    + "<td class='AvailableBalance'>" + (glbTransactionType == constTransactionReceivableAllocation ? item.UnAllocatedReceivables : item.UnAllocatedPayables) + "</td>"
                    ////Note:Restore may coz ticket no. duplication so i opened notifications and prevented Restore
                    //+ "<td class=''>"
                    //    + (item.IsCancelled
                    //        ? ("<a href='#' " + (!(IsDeptManagerRoleID || IsFinancialManagerID || IsGeneralManagerRoleID) ? " disabled='disabled' " : " ") + " onclick='ARF_CancelOrRestore(" + item.ID + ',"' + item.CustomerName + '",0' + ");' " + restoreControlsText + "</a>")
                    //        //? ("<a href='#' " + ($("#hf_CanDelete").val() == 0 ? " disabled='disabled' " : " ") + (item.IsCancelled ? " disabled='disabled' " : " ") + cancelledControlsText + "</a>")
                    //        : ("<a href='#' " + (!(IsDeptManagerRoleID || IsFinancialManagerID || IsGeneralManagerRoleID) ? " disabled='disabled' " : " ") + " onclick='ARF_CancelOrRestore(" + item.ID + ',"' + item.CustomerName + '",1' + ");' " + cancelControlsText + "</a>")
                    //      )
                    //    + "<a href='#'" + (item.IsCancelled ? "disabled='disabled' " : " ") + " onclick='Notification_ARF_FillControls(" + item.ID + ',' + item.FormNo + "," + "10" + ");' " + notificationsControlsText + "</a>" + "<a href='#'" + (item.IsCancelled ? " disabled='disabled' " : " ") + " onclick='Cashier_ARF_FillControls(" + item.ID + ',' + item.FormNo + "," + "10" + ");' " + printControlsText + "</a>"
                    //    ////i disable notifications if its cancelled and not manager
                    //    //+ "<a href='#'" + (item.IsCancelled && !(IsDeptManagerRoleID || IsFinancialManagerID || IsGeneralManagerRoleID) ? "disabled='disabled' " : " ") + " onclick='Notification_ARF_FillControls(" + item.ID + ',' + item.FormNo + "," + "10" + ");' " + notificationsControlsText + "</a>" + "<a href='#'" + (item.IsCancelled ? " disabled='disabled' " : " ") + " onclick='Cashier_ARF_FillControls(" + item.ID + ',' + item.FormNo + "," + "10" + ");' " + printControlsText + "</a>"
                    //+ "</td>"
                    + "<td class='hide'><a href='#AllocationModal' data-toggle='modal' onclick='ARAllocation_EditByDblClick(" + item.ID + "," + item.PartnerTypeID + "," + '"' + item.Name + '","' + (glbTransactionType == constTransactionReceivableAllocation ? item.UnAllocatedReceivables : item.UnAllocatedPayables) + '"' + ");' " + editControlsText + "</a></td></tr>"));

                    //+ "<td class='hide'><a href='#AllocationModal' data-toggle='modal' onclick='ARAllocation_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    //ApplyPermissions();
    BindAllCheckboxonTable("tblPartner", "PartnerID", "cbPartnerDeleteHeader");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    CheckAllCheckbox("HeaderDeletePartnerID");
    HighlightText("#tblPartner>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });

    console.log(parent.strBindTableRowsFunctionName); 
}
function ARAllocation_Partners_LoadingWithPaging() {
    debugger;
    var pWhereClause = ARAllocation_Partners_GetWhereClause();
    var pOrderBy = "PartnerTypeID, Name";
    var pPageNumber = 1;
    var pPageSize = $('#select-page-size').val();
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClauseAllocation_Partners: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters,
        function (pData) {
            if (glbTransactionType == constTransactionPayableAllocation)
                A_ARAllocation_Partners_BindTableRows(JSON.parse(pData[0]));
            else
                A_ARAllocation_Partners_BindTableRows(JSON.parse(pData[0]));
        });
    //HighlightText("#tblPartner>tbody>tr", $("#txt-Search").val().trim());
}
function ARAllocation_Partners_GetWhereClause() {
    debugger;
    var pWhereClause = "";
    if (glbTransactionType == constTransactionReceivableAllocation) {
        pWhereClause = " WHERE UnAllocatedReceivables IS NOT NULL";
    }
    else if (glbTransactionType == constTransactionPayableAllocation) {
        //var pWhereClause = " WHERE (UnAllocatedPayables IS NOT NULL OR PartnerTypeID=" + constCustodyPartnerTypeID + "  OR PartnerTypeID=" + constSupplierPartnerTypeID + ")";
        var pWhereClause = " WHERE UnAllocatedPayables IS NOT NULL ";//OR PartnerTypeID=" + $('#slPartnerType').val() + ")";//  OR PartnerTypeID=" + $('#slPartner').val() + ")";
    }
    if ($("#txt-Search").val().trim() != "") {
        pWhereClause += " AND (";
        pWhereClause += " PartnerTypeName like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " OR Name like N'%" + $("#txt-Search").val().trim() + "%' ";
        //pWhereClause += " OR Code like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += ")";
    }
    if (glbTransactionType == constTransactionReceivableAllocation) {
        if ($("#slPartner").val() != "") {
            pWhereClause += " AND (";
            pWhereClause += " ID = N'" + $("#slPartner").val() + "' ";
            // pWhereClause += " AND PartnerTypeID = N'" + $("#slPartner option:selected").attr("PartnerTypeID") + "' ";
            //if (pDefaults.UnEditableCompanyName == "ELI")
            //    pWhereClause += " AND year(InvoiceDate) > 2020  ";

            pWhereClause += ")";
        }
        if ($("#slPartnerType").val() != "") {
            pWhereClause += " AND (";
            pWhereClause += " PartnerTypeID = N'" + $("#slPartnerType").val() + "' ";
            pWhereClause += ")";
        }
    }
    else if (glbTransactionType == constTransactionPayableAllocation) {
        if ($("#slPartner").val() != "") {
            pWhereClause += " AND (";
            pWhereClause += " ID = " + $("#slPartner").val() + " ";
           // pWhereClause += " AND PartnerTypeID = " + $("#slPartner option:selected").attr("PartnerTypeID") + " ";
            pWhereClause += ")";
        }
        if ($("#slPartnerType").val() != "") {
            pWhereClause += " AND (";
            pWhereClause += " PartnerTypeID = " + $("#slPartnerType").val() + " ";
            pWhereClause += ")";
        }
    }
    return pWhereClause;
}
function ARAllocation_PartnerTypeChanged() {
    //debugger;
    //$("#slPartner").val("");
    //$("#slPartner option").removeClass("hide");
    //if ($("#slPartnerType").val() != "") //handle show all partners
    //    $("#slPartner option[PartnerTypeID!=" + $("#slPartnerType").val() + "][value!=''" + "]").addClass("hide");
    debugger;
    //$("#slPartner").html("<option value=''>All Partners</option>");//to quickly empty
    //var pPartnerTypeID = $("#slPartnerType").val() == "" ? 0 : $("#slPartnerType").val();
    //var pWhereClause = ARAllocation_Partners_GetWhereClause();
    //var pOrderBy = " ID DESC "
    //var pPageNumber = 1; //($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text())
    //var pPageSize = $('#select-page-size').val();
    //var pControllerParameters = { pPartnerTypeID: pPartnerTypeID, pWhereClauseAllocation_Partners: pWhereClause, pOrderBy: pOrderBy, pPageNumber: pPageNumber, pPageSize: pPageSize }
    //LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/A_ARAllocation/ARAllocation_Partners_PartnerTypeChanged", pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
    //    , function (pData) { 
    //        //if (glbTransactionType == constTransactionReceivableAllocation) //Receivables
    //        //    A_ARAllocation_Partners_BindTableRows(JSON.parse(pData[0]));
    //        //else if (glbTransactionType == constTransactionPayableAllocation) //Payables
    //        //    A_ARAllocation_Partners_BindTableRows(JSON.parse(pData[3]));
    //        A_ARAllocation_Partners_BindTableRows(JSON.parse(pData[0]));
    //        FillListFromObject(null, 5/*pCodeOrName*/, "All Partners", "slPartner", pData[2], null);
    //        FadePageCover(false);
    //    }
    //    , null);

    debugger;
    $("#slPartner").html("<option value=''><--All--></option>");//to quickly empty
    if ($("#slPartnerType").val() != "") {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/PartnersStatements/FillPartners", { pPartnerTypeID: $("#slPartnerType").val() }
            , function (pData) {
                FillListFromObject(null, 2/*pCodeOrName*/, "<--All-->", "slPartner", pData[0], null);
                FadePageCover(false);
            }
            , null);
    }
}
/*****************************************EOF Main Screen Fns (showing partners)************************************************/


/***************************************Allocation Fns***********************************************************/
function ARAllocation_EditByDblClick(pPartnerID, pPartnerTypeID, pPartnerName, pUnAllocatedAmount) {
    debugger;
     
    if (!ARAllocation_CheckBalanceExists(pUnAllocatedAmount) && pPartnerTypeID != constCustodyPartnerTypeID)
        swal("Sorry", "None is found for that partner to allocate.");
    else {
        //if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
        
        if (glbTransactionType == constTransactionReceivableAllocation)
        {
            $('#div-total-cost').removeClass('hide');
            $('#txt-Search-CreditNote').parent().addClass('hide');
            $('#divAccNotes').addClass('hide');
        }       
        else
        {
            $('#div-total-cost').addClass('hide');
            $('#txt-Search-CreditNote').parent().removeClass('hide');            
            $('#divAccNotes').removeClass('hide');
        }
          


        jQuery("#AllocationModal").modal("show");
        
        $("#txt-Search-CreditNote").val('');
        $("#hAccNoteID").val('');
        ClearAllTableRows("tblAccNotes");
        ClearAllTableRows("tblAllocationItem"); //to quickly clear before calling controller
        ClearAllTableRows("tblPartnerBalance"); //to quickly clear before calling controller
        FadePageCover(true);
        var strFunctionName = "/api/A_ARAllocation/ARAllocation_FillAllocationData";
        var pParametersWithValues = {
                pPartnerID: pPartnerID
                , pPartnerTypeID: pPartnerTypeID
                , pAllocationType: glbTransactionType
                , pSearchText: $("#txtSearchAllocationItems").val().trim() == "" ? "" : $("#txtSearchAllocationItems").val().trim().toUpperCase()
        };
        $("#btn-searchAllocationItems").attr("onclick", 'ARAllocation_EditByDblClick(' + pPartnerID + ',' + pPartnerTypeID + ',"' + pPartnerName + '","' + pUnAllocatedAmount + '");');
        CallGETFunctionWithParameters(strFunctionName, pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
                    var pInvoices = JSON.parse(pData[1]);
                    var pPartnerBalance = pData[2];
                    var pPayables = JSON.parse(pData[3]);
                    var ptxtAvailableBalance = pData[4];
                    var pvwPayablesAllocationsItems = JSON.parse(pData[5]);
                    $("#lblAllocationShown").html(": " + pPartnerName);
                    $("#hAllocationPartnerID").val(pPartnerID);
                    $("#hAllocationPartnerTypeID").val(pPartnerTypeID);
                    $("#txtAllocationPartnerName").val(pPartnerName.split('(')[0]);
                    $("#txtAllocationDate").val(getTodaysDateInddMMyyyyFormat);
                    $("#txtAllocationAvailableBalance").val(ptxtAvailableBalance);
                    //$("#txtAllocationRemainingBalance").val(pPartnerBalance);
                    if (glbTransactionType == constTransactionReceivableAllocation)
                    {
                        ARAllocation_BindPartnerBalance(JSON.parse(pPartnerBalance));
                        if (glbTransactionType == constTransactionReceivableAllocation)
                            ARAllocation_BindAllocationItemsTableRows(pInvoices, pPartnerBalance);
                        else if (glbTransactionType == constTransactionPayableAllocation)
                            ARAllocation_BindAllocationItemsTableRows(pPayables, pPartnerBalance);
                    }
                    else if (glbTransactionType == constTransactionPayableAllocation)
                    {
                        ARAllocation_BindPartnerBalance(JSON.parse(pPartnerBalance));
                        ARAllocation_BindAllocationItemsTableRows(pvwPayablesAllocationsItems, pPartnerBalance);
                    }
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
            , null);
    }
}
function ARAllocation_BindPartnerBalance(pPartnerBalance) {
    debugger;
    ClearAllTableRows("tblPartnerBalance");
    ////var editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    //var printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Cashier") + "</span>";
    //var notificationsControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-quote-left' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Notifications") + "</span>";
    //var cancelControlsText = " class='btn btn-xs btn-rounded btn-danger float-right' > <i class='fa ' style='padding-left: 5px;'>X &nbsp;&nbsp;&nbsp;</i> <span style='padding-right: 5px;'>" + "إلغاء" + "</span>";
    //var cancelledControlsText = " class='btn btn-xs btn-rounded btn-danger float-right' > <i class='fa ' style='padding-left: 5px;'>X </i> <span style='padding-right: 5px;'>" + "تم إلغائها" + "</span>";
    //var restoreControlsText = " class='btn btn-xs btn-rounded btn-warning float-right' > <i class='fa fa-undo' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "استعادة" + "</span>";
    $.each(pPartnerBalance, function (i, item) {
        if (glbTransactionType == constTransactionReceivableAllocation)
        AppendRowtoTable("tblPartnerBalance",
            ("<tr ID='" + item.CurrencyID + "' "
                //+ (" ondblclick='ARAllocation_EditByDblClick(" + item.ID + "," + item.PartnerTypeID + "," + '"' + item.Name + '"' + ");' ")
                ////+ (
                ////    (item.IsApproved)
                ////    ? (" class='text-primary' " + " ondblclick='ARAllocation_EditByDblClick(" + item.ID + ");' ")
                ////    : (" ondblclick='ARAllocation_EditByDblClick(" + item.ID + ");' ")
                ////    )
                + ">"
                    + "<td class='PartnerBalanceID hide'> <input " + " name='Delete' " + " type='checkbox' value='" + item.CurrencyID + "' /></td>"
                    + "<td class='AvailableBalance'>" + (glbTransactionType == constTransactionReceivableAllocation ? item.AvailableBalance : (-1 * item.AvailableBalance)).toFixed(4) + "</td>"
                    + "<td class='CurrencyID' val='" + item.CurrencyID + "'>" + item.CurrencyCode + "</td>"
                    + "<td class='AmountDue text-primary'>" + "0.00" + "</td>"
                    + "<td class='Remaining text-primary'>" + (glbTransactionType == constTransactionReceivableAllocation ? item.AvailableBalance : (-1 * item.AvailableBalance)).toFixed(4) + "</td>"
                    + "<td class='hide'><a href='#' data-toggle='modal' " + editControlsText + "</a></td>"
                    + "</tr>"));
        else if (glbTransactionType == constTransactionPayableAllocation)
            AppendRowtoTable("tblPartnerBalance",
            ("<tr ID='" + item.CurrencyID + "' "
                + ">"
                    + "<td class='PartnerBalanceID hide'> <input " + " name='Delete' " + " type='checkbox' value='" + item.CurrencyID + "' /></td>"
                    + "<td class='AvailableBalance'>" + (glbTransactionType == constTransactionPayableAllocation ? item.AvailableBalance : (-1 * item.AvailableBalance)).toFixed(4) + "</td>"
                    + "<td class='CurrencyID' val='" + item.CurrencyID + "'>" + item.CurrencyCode + "</td>"
                    + "<td class='AmountDue text-primary'>" + "0.00" + "</td>"
                    + "<td class='Remaining text-primary'>" + (glbTransactionType == constTransactionPayableAllocation ? item.AvailableBalance : (-1 * item.AvailableBalance)).toFixed(4) + "</td>"
                    + "<td class='hide'><a href='#' data-toggle='modal' " + editControlsText + "</a></td>"
                    + "</tr>"));
    });
    //ApplyPermissions();
    //BindAllCheckboxonTable("tblPartnerBalance", "PartnerBalanceID", "cbPartnerBalanceDeleteHeader");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    //CheckAllCheckbox("HeaderDeletePartnerBalanceID");
    //HighlightText("#tblPartnerBalance>tbody>tr", $("#txt-Search").val().trim());
    //if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
    //    swal(strSorry, strDeleteFailMessage, "warning");
    //    showDeleteFailMessage = false;
    //}
}
function ARAllocation_BindAllocationItemsTableRows(pTable, pPartnerBalance) {
    debugger;
   
    var pCheckboxNameAttr = "Delete";
    var pTableHTML = "";
    pTableHTML += "<thead>";
    pTableHTML += "     <tr>";
    pTableHTML += '         <th id="HeaderDeleteAllocationItemID" class="hide"><input id="cbAllocationItemDeleteHeader" type="checkbox" /></th>';
    pTableHTML += '         <th>' + '' + '</th>';
    pTableHTML += '         <th>'+TranslateString("Partner")+'</th>';
    if (glbTransactionType == constTransactionReceivableAllocation) //Receivables
        pTableHTML += '         <th>'+TranslateString("Inv.No")+'</th>';
 
    if (glbTransactionType == constTransactionPayableAllocation)
        pTableHTML += '         <th>' + TranslateString("Charge") + '</th>';
    if (glbTransactionType == constTransactionPayableAllocation) //Receivables
        pTableHTML += '         <th>' + TranslateString("Inv.No") + '</th>';

    pTableHTML += '         <th>'+TranslateString("Operation")+'</th>';
    pTableHTML += '         <th>'+TranslateString("Status")+'</th>';
    pTableHTML += '         <th>'+TranslateString("Total")+'</th>';
    pTableHTML += '         <th>'+TranslateString("Cur")+'</th>';
    pTableHTML += '         <th>'+TranslateString("AmountDue")+'</th>';
    pTableHTML += '         <th>'+TranslateString("PaidAmt")+'</th>';
    pTableHTML += '         <th>'+TranslateString("Remaining")+'</th>';
    pTableHTML += '         <th>'+TranslateString("PayFrom")+'</th>';
    pTableHTML += '         <th>' + TranslateString("Ex.Rate") + '</th>';
    if (glbTransactionType == constTransactionReceivableAllocation) //Receivables
    {
        pTableHTML += '         <th>' + TranslateString("Profit") + '</th>';
        pTableHTML += '         <th>' + TranslateString("Loss") + '</th>';
    }
    pTableHTML += '         <th class="rounded-right hide"></th>';
    pTableHTML += "     </tr>";
    pTableHTML += "</thead>";
    pTableHTML += "<tbody>";
    if (glbTransactionType == constTransactionReceivableAllocation) //Receivables
        $.each(pTable, function (i, item) {
            var pRemain = (item.Amount.toFixed(4) - item.PaidAmount.toFixed(4));
            pTableHTML += " <tr ID='" + item.ID + "'> ";
            pTableHTML += "       <td class='ID ' > <input " + "  onclick='ARAllocation_PaidAll(" + item.ID + ',' + pRemain + ");' " + " name='" + pCheckboxNameAttr + "' type='checkbox' value='" + item.ID + "' " + (1 == 1 ? "" : "checked='checked'") + "></td> ";
            //pTableHTML += "     <td class='Invoice' val='" + item.ChargeTypeID + "' style='width:300px;'>" + item.ChargeTypeName + "</td> ";
            pTableHTML += "       <td class='PartnerID' val='" + item.PartnerID + "'>" + item.PartnerName + "</td>"
            pTableHTML += "       <td class='PartnerTypeID hide' val='" + item.PartnerTypeID + "'>" + item.PartnerTypeCode + "</td>"
            pTableHTML += "       <td class='InvoiceNumber'>" + item.ConcatenatedInvoiceNumber + "</td> ";
            pTableHTML += "       <td class='Charge hide'>" + "0" + "</td> ";
            pTableHTML += "       <td class='Operation'>" + item.OperationCode + "</td> ";
            pTableHTML += "       <td class='Status text-danger'>" + item.InvoiceStatus + "</td> ";
            pTableHTML += "       <td class='Amount'>" + item.Amount.toFixed(4) + "</td> ";
            pTableHTML += "       <td class='CurrencyID' val='" + item.CurrencyID + "'>" + item.CurrencyCode + "</td>"
            //pTableHTML += "       <td class='InvoiceAmountDue'> <input type='text' id='txtItemAmountDue" + item.ID + "' class='form-control controlStyle' onchange='ARAllocation_Row_CheckAmountDue(" + item.ID + ");' onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);'  data-required='false' maxlength='10' placeholder='0.00' /> </td> ";
            pTableHTML += "       <td class='AmountDue'> <input style='width:60%;' type='text' id='txtItemAmountDue" + item.ID + "' class=' controlStyle' onchange='ARAllocation_ReCalculate();' onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);'  data-required='false' maxlength='10' placeholder='0.00' /> </td> ";
            pTableHTML += "       <td class='PaidAmount'>" + item.PaidAmount.toFixed(4) + "</td> ";
            pTableHTML += "       <td class='RemainingAmount'>" + (item.Amount.toFixed(4) - item.PaidAmount.toFixed(4)) + "</td> ";
            pTableHTML += "       <td class='BalanceCurrency'> <select id='slBalanceCurrency" + item.ID + "' class='controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='ARAllocation_Row_SetExchangeRate(" + item.ID + ");' data-required='false'></select> </td> ";
            pTableHTML += "       <td class='ExchangeRate'><input style='width:60%;' type='text' id='txtItemExchangeRate" + item.ID + "' class='InvoiceExchangeRate controlStyle' data-type='float' onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onchange='ARAllocation_ReCalculate();' onblur='CheckDecimalFormat(id);'  data-required='true' maxlength='10' placeholder='0.00' " + ($("#hDefaultCurrencyID").val() == item.CurrencyID ? "disabled" : "") + " /> </td> ";
            pTableHTML += "       <td class='ProfitAmount'> <input style='width:60%;' type='text' id='txtProfitAmount" + item.ID + "' class=' controlStyle' onchange='ARAllocation_ReCalculate();' onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);'  data-required='false' maxlength='10' placeholder='0.00' /> </td> ";
            pTableHTML += "       <td class='LossAmount'> <input style='width:60%;' type='text' id='txtLossAmount" + item.ID + "' class=' controlStyle' onchange='ARAllocation_ReCalculate();' onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);'  data-required='false' maxlength='10' placeholder='0.00' /> </td> ";
            pTableHTML += " </tr> ";
        });
    else if (glbTransactionType == constTransactionPayableAllocation) //Payables
        $.each(pTable, function (i, item) {
            if (parseInt(item.CostAmount.toFixed(4) - item.PaidAmount.toFixed(4)) > 0)
            {
                var pRemain = (item.CostAmount.toFixed(4) - item.PaidAmount.toFixed(4));
                // pTableHTML += " <tr ID='" + item.OperationID+"" +item.CurrencyID + "'> ";
                pTableHTML += " <tr ID='" + item.ID + "'> ";
                pTableHTML += "       <td class='ID ' > <input " + "  onclick='ARAllocation_PaidAll(" + item.ID + ',' + pRemain + ");' " + " name='" + pCheckboxNameAttr + "' type='checkbox' value='" + item.ID + "' " + (1 == 1 ? "" : "checked='checked'") + "></td> ";
                //pTableHTML += "     <td class='Invoice' val='" + item.ChargeTypeID + "' style='width:300px;'>" + item.ChargeTypeName + "</td> ";
                pTableHTML += "       <td class='PartnerID' val='" + item.PartnerSupplierID + "'>" + item.PartnerSupplierName + "</td>"
                pTableHTML += "       <td class='PartnerTypeID hide' val='" + item.SupplierPartnerTypeID + "'>" + item.PartnerTypeCode + "</td>"
                pTableHTML += "       <td class='InvoiceNumber '>" + (item.SupplierInvoiceNo == 0 ? "" : item.SupplierInvoiceNo) + "</td> ";
                pTableHTML += "       <td class='Charge '>" + item.ChargeTypeName + "</td> ";
                pTableHTML += "       <td class='Operation'>" + (item.OperationCode == 0 ? "" : item.OperationCode) + "</td> ";
                pTableHTML += "       <td class='Status text-danger'>" + (item.PaidAmount.toFixed(4)>0?"Partially Paid": item.PayableStatus) + "</td> ";
                pTableHTML += "       <td class='Amount'>" + item.CostAmount.toFixed(3) + "</td> ";
                pTableHTML += "       <td class='CurrencyID' val='" + item.CurrencyID + "'>" + item.CurrencyCode + "</td>"
                //pTableHTML += "       <td class='PayableAmountDue'> <input type='text' id='txtItemAmountDue" + item.ID + "' class='form-control controlStyle' onchange='ARAllocation_Row_CheckAmountDue(" + item.ID + ");' onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);'  data-required='false' maxlength='10' placeholder='0.00' /> </td> ";
                pTableHTML += "       <td class='AmountDue'> <input style='width:60%;' type='text' id='txtItemAmountDue" + item.ID + "' class=' controlStyle' onchange='ARAllocation_ReCalculate();' onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);'  data-required='false' maxlength='10' placeholder='0.00' /> </td> ";
                pTableHTML += "       <td class='PaidAmount'>" + item.PaidAmount.toFixed(4) + "</td> ";
                pTableHTML += "       <td class='RemainingAmount'>" + (item.CostAmount.toFixed(4) - item.PaidAmount.toFixed(4)) + "</td> ";
                pTableHTML += "       <td class='BalanceCurrency'> <select id='slBalanceCurrency" + item.ID + "' class='controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='ARAllocation_Row_SetExchangeRate(" + item.ID + ");' data-required='false'></select> </td> ";
                pTableHTML += "       <td class='ExchangeRate'><input style='width:60%;' type='text' id='txtItemExchangeRate" + item.ID + "' class='InvoiceExchangeRate controlStyle' data-type='float' onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onchange='ARAllocation_ReCalculate();' onblur='CheckDecimalFormat(id);'  data-required='true' maxlength='10' placeholder='0.00' " + ($("#hDefaultCurrencyID").val() == item.CurrencyID ? "disabled" : "") + " /> </td> ";
                pTableHTML += " </tr> ";
        }
        });
    pTableHTML += "</tbody>";
    $("#tblAllocationItem").html(pTableHTML);
    //to fill the controls after creating them in the previous loop
    debugger;
 
    $.each(pTable, function (i, item) {
        debugger;

        FillListFromObject(null, 6/*pCodeOrName*/, null, "slBalanceCurrency" +
             (glbTransactionType == constTransactionReceivableAllocation ? item.ID : item.ID), pPartnerBalance
            , function () {
                ARAllocation_Row_SetExchangeRate((glbTransactionType == constTransactionReceivableAllocation ? item.ID : item.ID));
            });
    });
    HighlightText("#tblAllocationItem>tbody>tr", $("#txtSearchAllocationItems").val().trim());
    if (glbTransactionType == constTransactionReceivableAllocation)
        CalcTotalAll();
}
function ARAllocation_PaidAll(pID,pAmount)
{
    debugger;

    if ($("#tblAllocationItem tbody tr[ID=" +  pID  +"]").find("td.ID").find('input:checkbox').prop('checked'))
        $('#txtItemAmountDue' + pID).val(pAmount);
    else
        $('#txtItemAmountDue' + pID).val(0);

    ARAllocation_ReCalculate();

}
function ARAllocation_CheckBalanceExists(pUnAllocatedAmount) {
    debugger;
    var pBalanceExists = false;
    for (var i = 0 ; i < pUnAllocatedAmount.split(",").length; i++)
        if (
                //(parseFloat(pUnAllocatedAmount.split(",")[i]) > 0 && glbTransactionType == constTransactionReceivableAllocation)
            //|| (parseFloat(pUnAllocatedAmount.split(",")[i]) < 0 && glbTransactionType == constTransactionPayableAllocation)
            parseFloat(pUnAllocatedAmount.split(",")[i]) > 0
           )

            pBalanceExists = true;
    return pBalanceExists;
}
function ARAllocation_Row_SetExchangeRate(pRowID) {
    debugger;
    var pItemCurrencyID = $("#tblAllocationItem tr[ID=" + pRowID + "]").find("td.CurrencyID").attr("val");
    //CheckCurrency For Loss And Profit
    if ($("#slBalanceCurrency" + pRowID).val() == pItemCurrencyID)
    {
        $("#txtProfitAmount" + pRowID).attr("disabled", "disabled");
        $("#txtLossAmount" + pRowID).attr("disabled", "disabled");
        $("#txtProfitAmount" + pRowID).val('0.00');
        $("#txtLossAmount" + pRowID).val('0.00');
    }
    else
    {
        $("#txtProfitAmount" + pRowID).removeAttr("disabled");
        $("#txtLossAmount" + pRowID).removeAttr("disabled");
    }
        
    
    if (pItemCurrencyID == $("#slBalanceCurrency" + pRowID).val()
       || (pItemCurrencyID != $("#hDefaultCurrencyID").val() && $("#slBalanceCurrency" + pRowID).val() != $("#hDefaultCurrencyID").val()) //this row condition is for paying from 2 diff. currencies which are not Default
        )
        $("#txtItemExchangeRate" + pRowID).attr("disabled", "disabled");
    else
        $("#txtItemExchangeRate" + pRowID).removeAttr("disabled");
    var pExchangeRate = $("#hReadySlCurrencies option[value=" + $("#slBalanceCurrency" + pRowID).val() + "]").attr("MasterDataExchangeRate")
                        / $("#hReadySlCurrencies option[value=" + pItemCurrencyID + "]").attr("MasterDataExchangeRate");
    $("#txtItemExchangeRate" + pRowID).val(pExchangeRate.toFixed(5));
    ARAllocation_ReCalculate();
}
function ARAllocation_ReCalculate() {
    debugger;
    var pPartnerBalanceRows = $("#tblPartnerBalance tbody tr");
    var pAllocationItem = $("#tblAllocationItem tbody tr");
    for (var i = 0 ; i < pPartnerBalanceRows.length; i++) {
        var pBalanceCurrencyID = pPartnerBalanceRows[i].id;
        var pAvailableBalance = $("#tblPartnerBalance tbody tr[ID=" + pBalanceCurrencyID + "]").find("td.AvailableBalance").text();
        var decAmountDueSumOfBalance = 0.0;
        for (var j = 0 ; j < pAllocationItem.length; j++) {
            var pRowID = pAllocationItem[j].id;
            if ($("#txtItemAmountDue" + pRowID).val() != "" && $("#slBalanceCurrency" + pRowID).val() == pBalanceCurrencyID) {
                decAmountDueSumOfBalance += (parseFloat($("#txtItemAmountDue" + pRowID).val()) / parseFloat($("#txtItemExchangeRate" + pRowID).val()));
                if (glbTransactionType == constTransactionReceivableAllocation)
                {
                    decAmountDueSumOfBalance += (parseFloat($("#txtProfitAmount" + pRowID).val() == '' ? 0 : $("#txtProfitAmount" + pRowID).val()) // / parseFloat($("#txtItemExchangeRate" + pRowID).val())
                          );
                    decAmountDueSumOfBalance -= (parseFloat($("#txtLossAmount" + pRowID).val() == '' ? 0 : $("#txtLossAmount" + pRowID).val()) // / parseFloat($("#txtItemExchangeRate" + pRowID).val())
                        );
                }

            }
        }

        $("#tblPartnerBalance tbody tr[ID=" + pBalanceCurrencyID + "]").find("td.AmountDue").text(decAmountDueSumOfBalance.toFixed(4));
        var decRemaining = 0;
        //if (glbTransactionType == constTransactionReceivableAllocation)
            decRemaining = parseFloat(pAvailableBalance) - parseFloat(decAmountDueSumOfBalance);
        //else if (glbTransactionType == constTransactionPayableAllocation)
        //    decRemaining = parseFloat(pAvailableBalance) + parseFloat(decAmountDueSumOfBalance);
        $("#tblPartnerBalance tbody tr[ID=" + pBalanceCurrencyID + "]").find("td.Remaining").text(decRemaining.toFixed(4));
        if (parseFloat(pAvailableBalance) < decAmountDueSumOfBalance) {
            $("#tblPartnerBalance tbody tr[ID=" + pBalanceCurrencyID + "]").find("td.AmountDue").removeClass("text-primary");
            $("#tblPartnerBalance tbody tr[ID=" + pBalanceCurrencyID + "]").find("td.AmountDue").addClass("text-danger");
            $("#tblPartnerBalance tbody tr[ID=" + pBalanceCurrencyID + "]").find("td.Remaining").removeClass("text-primary");
            $("#tblPartnerBalance tbody tr[ID=" + pBalanceCurrencyID + "]").find("td.Remaining").addClass("text-danger");
        }
        else {
            $("#tblPartnerBalance tbody tr[ID=" + pBalanceCurrencyID + "]").find("td.AmountDue").removeClass("text-danger");
            $("#tblPartnerBalance tbody tr[ID=" + pBalanceCurrencyID + "]").find("td.AmountDue").addClass("text-primary");
            $("#tblPartnerBalance tbody tr[ID=" + pBalanceCurrencyID + "]").find("td.Remaining").removeClass("text-danger");
            $("#tblPartnerBalance tbody tr[ID=" + pBalanceCurrencyID + "]").find("td.Remaining").addClass("text-primary");
        }
    }
}
function ARAllocation_Save(pPrint) {
    debugger;
    var strReturnedMessage = ARAllocation_Validate();
    if (strReturnedMessage != "") //there is a validation error
        swal("Sorry", strReturnedMessage);
    else { //Gather data to send to controller to save
        var pAllocationItemsIDs = "";
        var pInvoiceNumbers = "";
        var pPartnerID = "";
        var pPartnerTypeID = "";
        var pCharge = ""
        var pOperationCode = ""
        var pAmounts = "";
        var pItemCurrencyIDs = "";
        var pBalanceCurrencyIDs = "";
        var pItemCurrencyCodes = "";
        var pBalanceCurrencyCodes = "";
        var pExchangeRates = "";
        var pBalCurLocalExRates = "";
        var pInvCurLocalExRates = "";
        var pProfitAmounts = "";
        var pLossAmounts = "";
        var pAccNoteID = "";
        var pTblAllocationItem = $("#tblAllocationItem tbody tr");
        for (var i = 0 ; i < pTblAllocationItem.length; i++) {
            //Fill Parameters from tbl controls here
            var pRowID = pTblAllocationItem[i].id;
            var tr = $("#tblAllocationItem tbody tr[ID=" + pRowID + "]");
            if (parseFloat($("#txtItemAmountDue" + pRowID).val()) > 0 && $("#txtItemAmountDue" + pRowID).val() != "" && glbTransactionType == 40) {//Receivable
                pAllocationItemsIDs += (pAllocationItemsIDs == "" ? (pRowID) : ("," + pRowID));
                pInvoiceNumbers += (pInvoiceNumbers == "" ? (tr.find("td.InvoiceNumber").text() == "" ? "0" : tr.find("td.InvoiceNumber").text()) : ("," + (tr.find("td.InvoiceNumber").text() == "" ? "0" : tr.find("td.InvoiceNumber").text())));
                pPartnerID += (pPartnerID == "" ? (tr.find("td.PartnerID").attr("val") == "" ? "0" : tr.find("td.PartnerID").attr("val")) : ("," + (tr.find("td.PartnerID").attr("val") == "" ? "0" : tr.find("td.PartnerID").attr("val"))));
                pPartnerTypeID += (pPartnerTypeID == "" ? (tr.find("td.PartnerTypeID").attr("val") == "" ? "0" : tr.find("td.PartnerTypeID").attr("val")) : ("," + (tr.find("td.PartnerTypeID").attr("val") == "" ? "0" : tr.find("td.PartnerTypeID").attr("val"))));
                pCharge += (pCharge == "" ? (tr.find("td.Charge").text() == "" ? "0" : tr.find("td.Charge").text()) : ("," + (tr.find("td.Charge").text() == "" ? "0" : tr.find("td.Charge").text())));
                pOperationCode += (pOperationCode == "" ? (tr.find("td.Operation").text() == "" ? "0" : tr.find("td.Operation").text()) : ("," + (tr.find("td.Operation").text() == "" ? "0" : tr.find("td.Operation").text())));
                pAmounts += (pAmounts == "" ? (parseFloat($("#txtItemAmountDue" + pRowID).val())) : ("," + parseFloat($("#txtItemAmountDue" + pRowID).val())));
                pItemCurrencyIDs += (pItemCurrencyIDs == "" ? (tr.find("td.CurrencyID").attr("val")) : ("," + tr.find("td.CurrencyID").attr("val")));
                pBalanceCurrencyIDs += (pBalanceCurrencyIDs == "" ? ($("#slBalanceCurrency" + pRowID).val()) : ("," + $("#slBalanceCurrency" + pRowID).val()));
                pItemCurrencyCodes += (pItemCurrencyCodes == "" ? (tr.find("td.CurrencyID").text()) : ("," + tr.find("td.CurrencyID").text()));
                pBalanceCurrencyCodes += (pBalanceCurrencyCodes == "" ? ($("#slBalanceCurrency" + pRowID + " option:selected").text()) : ("," + $("#slBalanceCurrency" + pRowID + " option:selected").text()));
                pExchangeRates += (pExchangeRates == "" ? (parseFloat($("#txtItemExchangeRate" + pRowID).val())) : ("," + parseFloat($("#txtItemExchangeRate" + pRowID).val())));
                //if (tr.find("td.CurrencyID").attr("val") == $("#hDefaultCurrencyID").val())
                    pBalCurLocalExRates += (pBalCurLocalExRates == "" ? ($("#hReadySlCurrencies option[value=" + $("#slBalanceCurrency" + pRowID).val() + "]").attr("MasterDataExchangeRate")) : ("," + $("#hReadySlCurrencies option[value=" + $("#slBalanceCurrency" + pRowID).val() + "]").attr("MasterDataExchangeRate")));
                //else
                    //pBalCurLocalExRates += (pBalCurLocalExRates == "" ? (parseFloat($("#txtItemExchangeRate" + pRowID).val())) : ("," + parseFloat($("#txtItemExchangeRate" + pRowID).val())));
                pInvCurLocalExRates += (pInvCurLocalExRates == "" ? ($("#hReadySlCurrencies option[value=" + tr.find("td.CurrencyID").attr("val") + "]").attr("MasterDataExchangeRate")) : ("," + $("#hReadySlCurrencies option[value=" + tr.find("td.CurrencyID").attr("val") + "]").attr("MasterDataExchangeRate")));
                pProfitAmounts += (pProfitAmounts == "" ?
                    ((parseFloat($("#txtProfitAmount" + pRowID).val() == '' ? 0 : $("#txtProfitAmount" + pRowID).val())))    : 
                    ("," + (parseFloat($("#txtProfitAmount" + pRowID).val() == '' ? 0 : $("#txtProfitAmount" + pRowID).val()))));
                pLossAmounts += (pLossAmounts == "" ?
                    ((parseFloat($("#txtLossAmount" + pRowID).val() == '' ? 0 : $("#txtLossAmount" + pRowID).val())))
                    : ("," + (parseFloat($("#txtLossAmount" + pRowID).val() == '' ? 0 : $("#txtLossAmount" + pRowID).val()))));
            }
            debugger;
            if (parseFloat($("#txtItemAmountDue" + pRowID).val()) > 0 && $("#txtItemAmountDue" + pRowID).val() != "" && glbTransactionType == 80) {//Payable
                pAllocationItemsIDs += (pAllocationItemsIDs == "" ? (pRowID) : ("," + pRowID));
                pInvoiceNumbers += (pInvoiceNumbers == "" ? ("Empty") : ("," + "Empty"));

                //pInvoiceNumbers += "Empty";//(pInvoiceNumbers == "" ? (tr.find("td.InvoiceNumber").text() == "" ? "0" : tr.find("td.InvoiceNumber").text()) : ("," + (tr.find("td.InvoiceNumber").text() == "" ? "0" : tr.find("td.InvoiceNumber").text())));
                pPartnerID += (pPartnerID == "" ? (tr.find("td.PartnerID").attr("val") == "" ? "0" : tr.find("td.PartnerID").attr("val")) : ("," + (tr.find("td.PartnerID").attr("val") == "" ? "0" : tr.find("td.PartnerID").attr("val"))));
                pPartnerTypeID += (pPartnerTypeID == "" ? (tr.find("td.PartnerTypeID").attr("val") == "" ? "0" : tr.find("td.PartnerTypeID").attr("val")) : ("," + (tr.find("td.PartnerTypeID").attr("val") == "" ? "0" : tr.find("td.PartnerTypeID").attr("val"))));
                pCharge += (pCharge == "" ? (tr.find("td.Charge").text() == "" ? "0" : tr.find("td.Charge").text()) : ("," + (tr.find("td.Charge").text() == "" ? "0" : tr.find("td.Charge").text())));
                pOperationCode += (pOperationCode == "" ? (tr.find("td.Operation").text()) : ("," + tr.find("td.Operation").text()));
                //pOperationCode += (pOperationCode == "" ? (tr.find("td.Operation").text() == "" ? "0" : tr.find("td.Operation").text()) : ("," + (tr.find("td.Operation").text() == "" ? "0" : tr.find("td.Operation").text())));
                pAmounts += (pAmounts == "" ? (parseFloat($("#txtItemAmountDue" + pRowID).val())) : ("," + parseFloat($("#txtItemAmountDue" + pRowID).val())));
                pItemCurrencyIDs += (pItemCurrencyIDs == "" ? (tr.find("td.CurrencyID").attr("val")) : ("," + tr.find("td.CurrencyID").attr("val")));
                pBalanceCurrencyIDs += (pBalanceCurrencyIDs == "" ? ($("#slBalanceCurrency" + pRowID).val()) : ("," + $("#slBalanceCurrency" + pRowID).val()));
                pItemCurrencyCodes += (pItemCurrencyCodes == "" ? (tr.find("td.CurrencyID").text()) : ("," + tr.find("td.CurrencyID").text()));
                pBalanceCurrencyCodes += (pBalanceCurrencyCodes == "" ? ($("#slBalanceCurrency" + pRowID + " option:selected").text()) : ("," + $("#slBalanceCurrency" + pRowID + " option:selected").text()));
                pExchangeRates += (pExchangeRates == "" ? (parseFloat($("#txtItemExchangeRate" + pRowID).val())) : ("," + parseFloat($("#txtItemExchangeRate" + pRowID).val())));
                //if (tr.find("td.CurrencyID").attr("val") == $("#hDefaultCurrencyID").val())
                pBalCurLocalExRates += (pBalCurLocalExRates == "" ? ($("#hReadySlCurrencies option[value=" + $("#slBalanceCurrency" + pRowID).val() + "]").attr("MasterDataExchangeRate")) : ("," + $("#hReadySlCurrencies option[value=" + $("#slBalanceCurrency" + pRowID).val() + "]").attr("MasterDataExchangeRate")));
                //else
                //pBalCurLocalExRates += (pBalCurLocalExRates == "" ? (parseFloat($("#txtItemExchangeRate" + pRowID).val())) : ("," + parseFloat($("#txtItemExchangeRate" + pRowID).val())));
                pInvCurLocalExRates += (pInvCurLocalExRates == "" ? ($("#hReadySlCurrencies option[value=" + tr.find("td.CurrencyID").attr("val") + "]").attr("MasterDataExchangeRate")) : ("," + $("#hReadySlCurrencies option[value=" + tr.find("td.CurrencyID").attr("val") + "]").attr("MasterDataExchangeRate")));
                pProfitAmounts += (pProfitAmounts == "" ?  0 :   ("," + 0));
                pLossAmounts += (pLossAmounts == "" ?   (0)  : ("," + 0));
            }

        }
        var pParametersWithValues = {
            pPartnerID: $("#hAllocationPartnerID").val()
            , pPartnerTypeID: $("#hAllocationPartnerTypeID").val()
            , pPartnerName: $("#txtAllocationPartnerName").val()
            , pBranchID: $("#hUserBranchID").val()
            , pAllocationItemsIDs: pAllocationItemsIDs
            , pInvoiceNumbers: pInvoiceNumbers
            , pPartnerIDList: pPartnerID
            , pPartnerTypeIDList: pPartnerTypeID
            , pCharge: pCharge
            , pOperationCode: pOperationCode
            , pAmounts: pAmounts
            , pItemCurrencyIDs: pItemCurrencyIDs
            , pBalanceCurrencyIDs: pBalanceCurrencyIDs
            , pItemCurrencyCodes: pItemCurrencyCodes
            , pBalanceCurrencyCodes: pBalanceCurrencyCodes
            , pExchangeRates: pExchangeRates
            , pBalCurLocalExRates: pBalCurLocalExRates
            , pInvCurLocalExRates: pInvCurLocalExRates
            , pTransactionType: glbTransactionType
            , pProfitAmounts: pProfitAmounts
            , pLossAmounts: pLossAmounts
            , pAccNoteID: $('#hAccNoteID').val() != '' ? $('#hAccNoteID').val() : 0
        };
        if (pAllocationItemsIDs == "")
            swal("Sorry", "No, allocations is assigned.");
        else {
            FadePageCover(true);
            debugger;
            //CallGETFunctionWithParameters("/api/A_ARAllocation/ARAllocation_Save", pParametersWithValues
            CallPOSTFunctionWithParameters("/api/A_ARAllocation/ARAllocation_Save", pParametersWithValues
                , function (pData) {
                    if (pData[0]) {
                        swal("Success", "Allocation done successfully.");
                        ARAllocation_Partners_LoadingWithPaging();
                        jQuery("#AllocationModal").modal("hide");
                        if (pData[2] != 0)
                            JournalVoucher_Print(pData[2]);

                    }
                    else {
                        swal("Sorry", "Connection failed, please refresh and then try again.");
                    }
                    FadePageCover(false);
                }
                , null);
        } // EOF else pAllocationItemsIDs != ""
    } // EOF else of strReturnedMessage == ""
}
function ARAllocation_Validate() {
    debugger;
    var strReturnedMessage = "";
    //check empty or Zero exchange rate AND AmountDue greater than Remaining Amount
    var pInvoice = $("#tblAllocationItem tbody tr");
    for (var i = 0 ; i < pInvoice.length; i++) {
        var pRowID = pInvoice[i].id;
        if (($("#txtItemAmountDue" + pRowID).val() != "" && $("#txtItemExchangeRate" + pRowID).val() == "")
            || ($("#txtItemAmountDue" + pRowID).val() != "" && parseFloat($("#txtItemExchangeRate" + pRowID).val()) == 0)
            || ($("#txtItemAmountDue" + pRowID).val() != "" && parseFloat($("#txtItemAmountDue" + pRowID).val()) > parseFloat($("#tblAllocationItem tbody tr[ID=" + pRowID + "]").find('td.RemainingAmount').text())) //check not to allocate more than remaining amount
            ) {
            strReturnedMessage = "Please, check amount and exchange rate for invoice " + $("#tblAllocationItem tbody tr[ID=" + pRowID + "]").find('td.InvoiceNumber').text() + ".";
        }
    } // of For Loop
    //check each balance amount is not exceeded in allocation
    if (strReturnedMessage == "") {
        if ($('#hAccNoteID').val() != '' && glbTransactionType == constTransactionPayableAllocation) {    // check credit note total is equal to total paid with the same currency
            var AccNoteCurrencyID = $('#tblAccNotes tbody').find("tr[ID='" + $('#hAccNoteID').val() + "']").find("td.AccNoteCurrency").attr('val');
            var AccNoteTotal = $('#tblAccNotes tbody').find("tr[ID='" + $('#hAccNoteID').val() + "']").find("td.AccNoteAmount").text();
            var TotalPaid = 0.00;
            for (var i = 0 ; i < pInvoice.length; i++) {
                var pRowID = pInvoice[i].id;
                if ($("#slBalanceCurrency" + pRowID).val() == AccNoteCurrencyID && $("#txtItemAmountDue" + pRowID).val() != '') {
                    TotalPaid += parseFloat($("#txtItemAmountDue" + pRowID).val());
                }
                else if ($("#slBalanceCurrency" + pRowID).val() != AccNoteCurrencyID)
                    strReturnedMessage = "Paid currency must equal to credit note currency ";
            }
            if (TotalPaid != AccNoteTotal)
                strReturnedMessage = "Total Amount Due " + TotalPaid + "  not equal Credit Note Total " + AccNoteTotal;
        }
        else
        {
            var pPartnerBalance = $("#tblPartnerBalance tbody tr");     // check if balance exceeds the available limit
            for (var i = 0 ; i < pPartnerBalance.length; i++) {
                var pBalanceCurrencyID = pPartnerBalance[i].id;
                var pAvailableCurrencyBalance = $("#tblPartnerBalance tbody tr[ID=" + pBalanceCurrencyID + "]").find("td.AvailableBalance").text();
                var pAmountDueCurrencyBalance = $("#tblPartnerBalance tbody tr[ID=" + pBalanceCurrencyID + "]").find("td.AmountDue").text();
                if (parseFloat(pAvailableCurrencyBalance) < parseFloat(pAmountDueCurrencyBalance))
                    strReturnedMessage = "Amount to be paid from the " + $("#tblPartnerBalance tbody tr[ID=" + pBalanceCurrencyID + "]").find("td.CurrencyID").text() + " balance exceeds the available limit.";
            }
        }

    }

    return strReturnedMessage;
}
//function ARAllocation_ReCalculate() {
//    debugger;
//    var decAmountDue = 0.0;
//    var pRemainingBalance = 0.0;
//    var pInvoice = $("#tblAllocationItem tbody tr");
//    for (var i = 0 ; i < pInvoice.length; i++) {
//        var pRowID = pInvoice[i].id;
//        var tr = $("#tblAllocationItem tbody tr[ID=" + pRowID + "]");
//        if ($("#txtItemAmountDue" + pRowID).val() != "" && $("#txtItemExchangeRate" + pRowID).val() != "") {
//            //EGP invoice with whatever Balance Cur
//            if (tr.find("td.CurrencyID").attr("val") == $("#hDefaultCurrencyID").val()) 
//                decAmountDue += parseFloat($("#txtItemAmountDue" + pRowID).val());
//            // !EGP invoice and EGP Balance
//            else if (tr.find("td.CurrencyID").attr("val") != $("#hDefaultCurrencyID").val()
//                && $("#slBalanceCurrency" + pRowID).val() == $("#hDefaultCurrencyID").val())
//                decAmountDue += parseFloat($("#txtItemAmountDue" + pRowID).val()) / parseFloat($("#txtItemExchangeRate" + pRowID).val());
//        }
//    }
    
//    pRemainingBalance = parseFloat($("#txtAllocationAvailableBalance").val()) - parseFloat(decAmountDue);
//    $("#txtAllocationAmountDue").val(decAmountDue.toFixed(4) + ' ' + $("#hDefaultCurrencyCode").val());
//    $("#txtAllocationRemainingBalance").val(pRemainingBalance.toFixed(4) + ' ' + $("#hDefaultCurrencyCode").val());
//    ARAllocation_SetRemainingBalanceProperties();
//    return decAmountDue;
//}
//function ARAllocation_SetRemainingBalanceProperties() {
//    debugger;
//    if (parseFloat($("#txtAllocationRemainingBalance").val()) < 0) {
//        $("#txtAllocationRemainingBalance").removeClass("text-primary");
//        $("#txtAllocationRemainingBalance").addClass("text-danger");
//        $("#txtAllocationAmountDue").removeClass("text-primary");
//        $("#txtAllocationAmountDue").addClass("text-danger");
//    }
//    else {
//        $("#txtAllocationRemainingBalance").removeClass("text-danger");
//        $("#txtAllocationRemainingBalance").addClass("text-primary");
//        $("#txtAllocationAmountDue").removeClass("text-danger");
//        $("#txtAllocationAmountDue").addClass("text-primary");
//    }
//}
//function ARAllocation_Save(pPrint) {
//    debugger;
//    var strReturnedMessage = ARAllocation_Validate();
//    if (strReturnedMessage != "") //there is a validation error
//        swal("Sorry", strReturnedMessage);
//    else { //Gather data to send to controller to save
//        var pAllocationItemsIDs = "";
//        var pAmounts = "";
//        var pItemCurrencyIDs = "";
//        var pCurrencyIDs = "";
//        var pExchangeRates = "";
//        var pTblAllocationItem = $("#tblAllocationItem tbody tr");
//        for (var i = 0 ; i < pTblAllocationItem.length; i++) {
//            //Fill Parameters from tbl controls here
//            var pRowID = pTblAllocationItem[i].id;
//            var tr = $("#tblAllocationItem tbody tr[ID=" + pRowID + "]");
//            if (parseFloat($("#txtItemAmountDue" + pRowID).val()) > 0 && $("#txtItemAmountDue" + pRowID).val() != "") {
//                pAllocationItemsIDs += (pAllocationItemsIDs == "" ? (pRowID) : ("," + pRowID));
//                pAmounts += (pAmounts == "" ? (parseFloat($("#txtItemAmountDue" + pRowID).val())) : ("," + parseFloat($("#txtItemAmountDue" + pRowID).val())));
//                pItemCurrencyIDs += (pItemCurrencyIDs == "" ? (tr.find("td.CurrencyID").attr("val")) : ("," + tr.find("td.CurrencyID").attr("val")));
//                pCurrencyIDs += (pCurrencyIDs == "" ? ($("#slBalanceCurrency" + pRowID).val()) : ("," + $("#slBalanceCurrency" + pRowID).val()));
//                pExchangeRates += (pExchangeRates == "" ? (parseFloat($("#txtItemExchangeRate" + pRowID).val())) : ("," + parseFloat($("#txtItemExchangeRate" + pRowID).val())));
//            }
//        }
//        var pParametersWithValues = {
//            pPartnerID: $("#hAllocationPartnerID").val()
//            , pPartnerTypeID: $("#hAllocationPartnerTypeID").val()
//            , pBranchID: $("#hUserBranchID").val()
//            , pAllocationItemsIDs: pAllocationItemsIDs
//            , pAmounts: pAmounts
//            , pItemCurrencyIDs: pItemCurrencyIDs
//            , pCurrencyIDs: pCurrencyIDs
//            , pExchangeRates: pExchangeRates
//        };
//        if (pAllocationItemsIDs == "")
//            swal("Sorry", "No, allocations is assigned.");
//        else {
//            FadePageCover(true);
//            CallGETFunctionWithParameters("/api/A_ARAllocation/ARAllocation_Save", pParametersWithValues
//                , function (pData) {
//                    FadePageCover(false);
//                }
//                , null);
//        } // EOF else pAllocationItemsIDs != ""
//    } // EOF else of strReturnedMessage == ""
//}
/***********************************EOF Allocation Fns***********************************************************/

/*************************Print JV/*******************************/
function JournalVoucher_Print(pID) {
    debugger;
    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat() + ' ' + getTime();

    var pParametersWithValues = {
        pJournalVoucherIDForPrinting: pID
    };
    FadePageCover(true);
    //CallGETFunctionWithParameters(pFunctionName, pParametersWithValues, callback, callback1)
    CallGETFunctionWithParameters("/api/JournalVouchers/GetJournalVoucherDataForPrinting", pParametersWithValues
        , function (pData) {
            if (pData[0]) {


                var pJVHeader = JSON.parse(pData[1]); // its 1 row
                var pJVItems = JSON.parse(pData[2]);



                var ReportHTML = '';

                ReportHTML += '<html>';
                ReportHTML += '     <head><title>' + 'Print JV' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                //if ($("#cbPrintLogo").prop("checked"))
                //    ReportHTML += '     <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="header"/></div>';
                //else
                ReportHTML += '     <div class="row text-center"><br><br><br><br><br><br><br></div>';

                ReportHTML += '     <div class="col-xs-12 text-center text-ul m-t-n"><h3> Journal Vouchers</h3></div> '; //addClass "text-ul" to underline
                ReportHTML += '     <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pJVHeader.JVNo + '</h3></div> '; //addClass "text-ul" to underline
                ReportHTML += '     </ br>';

                ReportHTML += '     <div class="col-xs-6 m-l-n text-left">' + '<b><span class="float-left">' + 'Jv No        : ' + pJVHeader.JVNo + '</span></b></div>';
                ReportHTML += '     <div class="col-xs-6 m-l-n text-left">' + '<b><span class="float-left">' + 'User Name    : ' + pJVHeader.UserName + '</span></b></div>';
                ReportHTML += '     <div class="col-xs-6 m-l-n text-left">' + '<b><span class="float-left">' + 'JV Date      : ' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pJVHeader.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pJVHeader.JVDate))) + '</span></b></div>';
                //ReportHTML += '     <div class="col-xs-6 m-l-n text-left">' + '<b>' + 'Date : ' + FormattedTodaysDate + '</b></div>'; //addClass "text-ul" to underline
                ReportHTML += '     <div class="col-xs-6 m-l-n text-left">' + '<b><span class="float-left">' + 'Journal Type : ' + pJVHeader.Journal_Name + '</span></b></div>';
                ReportHTML += '     <div class="col-xs-6 m-l-n text-left">' + '<b><span class="float-left">' + 'JV Type      : ' + pJVHeader.JVType_Name + '</span></b></div>';
                ReportHTML += '     <div class="col-xs-6 m-l-n text-left">' + '<b><span class="float-left">' + 'Receipt No   : ' + pJVHeader.ReceiptNo + '</span></b></div>';
                ReportHTML += '     <div class="col-xs-12 m-l-n text-left">' + '<b><span class="float-left">' + 'Notes       : ' + (pJVHeader.RemarksHeader == 0 ? "" : pJVHeader.RemarksHeader) + '</span></b></div>';

                //ReportHTML += '     <body style="background-color:white;">';
                ReportHTML += '     <br>';
                ReportHTML += '     <body>';

                ReportHTML += '         <table id="tblPrintJVItems" class="table table-striped b-t b-light text-sm table-bordered m-t-lg">';
                ReportHTML += '             <thead>';
                ReportHTML += '                 <tr>';
                ReportHTML += '                     <th class="text-center">Account</th>';
                ReportHTML += '                     <th class="text-center">Sub Account</th>';
                ReportHTML += '                     <th class="text-center">Cost Center</th>';
                ReportHTML += '                     <th class="text-center">Debit</th>';
                ReportHTML += '                     <th class="text-center">Credit</th>';
                ReportHTML += '                     <th class="text-center">Cur</th>';
                ReportHTML += '                     <th class="text-center">Ex.Rate</th>';
                ReportHTML += '                     <th class="text-center">Local Debit</th>';
                ReportHTML += '                     <th class="text-center">Local Credit</th>';
                ReportHTML += '                     <th class="text-center">Description</th>';
                ReportHTML += '                     <th class="text-center">Documented</th>';
                ReportHTML += '                 </tr>';
                ReportHTML += '             </thead>';
                ReportHTML += '             <tbody>';
                var Counter = 0;
                $.each(pJVItems, function (i, item) {
                    debugger;
                    ReportHTML += '                 <tr style="font-size:95%;">';
                    ReportHTML += '                     <td class="text-center">' + (item.AccountName == 0 ? '' : item.AccountName) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.subAccountName == 0 ? '' : item.subAccountName) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.CostCenter == 0 ? "" : item.CostCenter) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.Debit == 0 ? "" : item.Debit.toFixed(2)) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.Credit == 0 ? "" : item.Credit.toFixed(2)) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + item.Code + '</td>';
                    ReportHTML += '                     <td class="text-center">' + item.ExchangeRate + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.LocalDebit == 0 ? "" : item.LocalDebit.toFixed(2)) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.LocalCredit == 0 ? "" : item.LocalCredit.toFixed(2)) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.Description == 0 ? '' : item.Description.replace(/\n/g, "<br />")) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + '<input  disabled="disabled" type="checkbox" ' + (item.isDocumented == true ? "checked" : "") + '></td>';

                    ReportHTML += '                 </tr>';
                });
                ReportHTML += '             </tbody>';
                ReportHTML += '         </table>';
                ReportHTML += '     </body>';


                ReportHTML += '<div class="col-xs-6  text-right">' + '<b>  Total : </b>' + pJVHeader.TotalDebit + ' ' + $("#hDefaultCurrencyCode").val() + '</div>';
                ReportHTML += '<div class="col-xs-6 text-left" style=" padding-bottom: 10px;">' + toWords(pJVHeader.TotalDebit) + '</div>';
                //if ($("#cbPrintLogo").prop("checked")) {
                //    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                //    ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                //    ReportHTML += '     </footer>';
                //}
                ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:relative; bottom:0;  padding-top: 10px;">';
                ReportHTML += '                 <div class="col-xs-4  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">Prepared By</br> </br>' + (pJVHeader.UserName != 0 ? pJVHeader.UserName : '') + '</div></b></div>';
                ReportHTML += '                 <div class="col-xs-4  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">Reviewed By</div></div></div>';
                ReportHTML += '                 <div class="col-xs-4  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">Approved By</div></b></div>';
                ReportHTML += '     <div class="col-xs-6 text-left"><b>Printed On :</b> ' + FormattedTodaysDate + '</div>';
                ReportHTML += '     </footer>';
                ReportHTML += '</html>';



                var mywindow = window.open('', '_blank');
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }
            else {
                swal("Sorry", "Connection failed. Please try again.");
            }
            FadePageCover(false);
        }
        , null);
}
function CalcTotalAll() {
    debugger;

        var result = [];
        var Currency;
        $('#lblTotalInvoicesAmount').html(' ');

        $('#tblAllocationItem  > tbody > tr').each(function () {

            Currency = $(this).find('td.CurrencyID').text();
                if ($.inArray(Currency, result) == -1)
                    result.push(Currency);
        });

        for (var j = 0; j < result.length ; j++) {
            var Total = 0;
            $('#tblAllocationItem  > tbody > tr').each(function () {

                if ($(this).find('td.Amount').text() != 0 && result[j] == $(this).find('td.CurrencyID').text()) {
                    var Cost = $(this).find('td.Amount').text();
                        Total += parseFloat(Cost);  // .replace(/\b0+/g, "")


                }
            });
            $('#lblTotalInvoicesAmount').append(result[j] + ": ");
            $('#lblTotalInvoicesAmount').append(Total.toFixed(2));
            $('#lblTotalInvoicesAmount').append(' ');
        }

}

/*************************Search Credit/*******************************/
function ARAllocation_Partners_SearchCreditNote() {
    debugger;
    $('#hAccNoteID').val('');
    var pPartnerTypeID =  0 ;

    var pWhereClause = "WHERE IsDeleted=0  ";
     pWhereClause += " AND (";
     pWhereClause += " PartnerID = N'" + $("#hAllocationPartnerID").val()  + "' ";
     pWhereClause += " AND PartnerTypeID = N'" +  $("#hAllocationPartnerTypeID").val()  + "' ";
     pWhereClause += ")";
     pWhereClause += " AND IsApproved=1 ";
     pWhereClause += " AND  NoteType = 100 ";
     pWhereClause += " AND isnull(RemainingAmount,0) > 0";
    
     var CreditNoteNo = $('#txt-Search-CreditNote').val() != '' ? $('#txt-Search-CreditNote').val() : 0;

     pWhereClause += " AND Code='" + CreditNoteNo +"'";

    var pOrderBy = " ID DESC "
    var pPageNumber = 1;
    var pPageSize = 1 ;
    var pControllerParameters = { pPartnerTypeID: pPartnerTypeID, pWhereClause: pWhereClause, pOrderBy: pOrderBy, pPageNumber: pPageNumber, pPageSize: pPageSize }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/AccNote/AccNoteApproval_PartnerTypeChanged", pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
        , function (pData) {
            AccNoteApproval_BindTableRows(JSON.parse(pData[0]));
            if (JSON.parse(pData[0]).length > 0)
                $('#hAccNoteID').val(JSON.parse(pData[0])[0].ID);

            FadePageCover(false);
        }
        , null);
}
function AccNoteApproval_BindTableRows(pAccNotes) {
    debugger;
    //if (IsAccountingActive)
    //    $("#hl-menu-ReceiptsAndPaymentsGroup").parent().addClass("active");
    //else
    //    $("#hl-menu-OperAcc").parent().addClass("active");
    ClearAllTableRows("tblAccNotes");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    LogsControlsText = " class='btn btn-xs btn-rounded btn-primary float-right' > <i class='fa fa-chain' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Logs" + "</span>";
    $.each(pAccNotes, function (i, item) {
        AppendRowtoTable("tblAccNotes",
        ("<tr ID='" + item.ID + "' " + ((OENot /*&& item.NoteStatus == "UnPaid"*/ && !item.IsApproved) ? ("ondblclick='AccNotes_EditByDblClick(" + item.ID + ");'") : " class='static-text-primary' ") + ">"
        //("<tr ID='" + item.ID + "'>"
                    + "<td class='AccNoteID hide'> <input" /*+ (item.NoteStatus == "UnPaid" && !item.IsApproved ? "" : " disabled='disabled' ")*/ + " name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='AccNoteCodeSerial hide'>" + item.CodeSerial + "</td>"
                    + "<td class='AccNoteCode'>" + item.Code + "</td>"
                    + "<td class='AccNoteType hide'>" + item.NoteType + "</td>"
                    + "<td class='AccNoteTypeName hide'>" + item.NoteTypeName + "</td>"

                    + "<td class='AccNotePartner' val='" + item.OperationPartnerID + "'>" + (item.PartnerName == 0 ? "" : item.PartnerName) + "</td>"
                    + "<td class='AccNotePartnerTypeCode hide'>" + (item.PartnerTypeCode == 0 ? "" : item.PartnerTypeCode) + "</td>"

                    + "<td class='AccNoteTaxTypeID hide' val=" + item.TaxTypeID + ">" + (item.TaxTypeID == 0 ? "" : item.TaxTypeName) + "</td>"
                    + "<td class='AccNoteTaxPercentage hide'>" + item.TaxPercentage + "</td>"
                    + "<td class='AccNoteTaxAmount hide'>" + item.TaxAmount + "</td>"
                    + "<td class='AccNoteDiscountTypeID hide' val=" + item.DiscountTypeID + ">" + (item.DiscountTypeID == 0 ? "" : item.DiscountTypeName) + "</td>"
                    + "<td class='AccNoteDiscountPercentage hide'>" + item.DiscountPercentage + "</td>"
                    + "<td class='AccNoteDiscountAmount hide'>" + item.DiscountAmount + "</td>"

                    + "<td class='AccNoteAmountWithoutVAT hide'>" + item.AmountWithoutVAT + "</td>"
                    + "<td class='AccNoteAmount'>" + item.Amount + "</td>"
                    + "<td class='AccNoteCurrency' val='" + item.CurrencyID + "'>" + (item.CurrencyID == 0 ? "" : item.CurrencyCode) + "</td>"
                    + "<td class='AccNoteMasterDataExchangeRate hide'>" + item.MasterDataExchangeRate + "</td>"
                    + "<td class='AccNoteDate '>" + ConvertDateFormat(GetDateWithFormatMDY(item.NoteDate)) + "</td>"

                    + "<td class='AccNoteAddressID hide' val='" + item.AddressID + "'></td>"
                    + "<td class='AccNoteOperationID hide'>" + item.OperationID + "</td>"
                    + "<td class='AccNoteMasterOperationID hide'>" + item.MasterOperationID + "</td>"
                    //+ "<td class='AccNoteOperationCode'>" + (item.OperationCode == 0 ? "" : item.OperationCode) + "</td>"
                    + "<td class='AccNoteOperationCode'>" + (item.OperationCode == 0 ? item.MasterOperationCode : item.OperationCode) + "</td>"
                    + "<td class='AccNoteHouseNumber'>" + (item.HouseNumber == 0 ? "N/A" : item.HouseNumber) + "</td>" //if "N/A" then either not entered or its Master Op so I should show all the HBLs on the Master, but for space i dont do it.
                    + "<td class='AccNoteStatus hide " + (item.NoteStatus == "UnPaid" ? "text-danger" : "text-primary") + "'>" + item.NoteStatus + "</td>"

                    + "<td class='AccNoteInvoiceID hide'>" + item.InvoiceID + "</td>"
                    + "<td class='AccNoteConcatenatedInvoiceNumber'>" + (item.InvoiceID == 0 ? "N/A" : item.ConcatenatedInvoiceNumber) + "</td>"

                    + "<td class='AccNoteRemarks hide'>" + (item.Remarks == 0 ? "" : item.Remarks) + "</td>"

                    + "<td class='IsApproved'> <input type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"
                    //+ "<td class='hide'><a onclick='AccNotes_Logs_LoadWithPaging(" + item.ID + ");' " + LogsControlsText + "</a></td>"
                    //+ ($("#hIsOperationDisabled").val() == false
                    //    ? "<td class=''><a onclick='AccNotes_Print(" + item.ID + "," + item.NoteType + ",3);' " + printControlsText + "</a></td>"
                    //    : "<td></td>")
                    + "<td class='hide'><a onclick='AccNotes_Print(" + item.ID + "," + item.NoteType + ",3);' " + printControlsText + "</a></td>"
                    + "</tr>"));
    });



}