/*********************************************Main Screen Fns (showing partners)************************************************/
function ARAllocation_Partners_BindTableRows(pTableRows) {
    debugger;
    $("#hl-menu-OperAcc").parent().addClass("active");
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

                    + "<td class='hide'><a href='#AllocationModal' data-toggle='modal' onclick='ARAllocation_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblPartner", "PartnerID", "cbPartnerDeleteHeader");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    CheckAllCheckbox("HeaderDeletePartnerID");
    HighlightText("#tblPartner>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function ARAllocation_Partners_LoadingWithPaging() {
    debugger;
    var pWhereClause = ARAllocation_Partners_GetWhereClause();
    var pOrderBy = "PartnerTypeID, Name";
    var pPageNumber = 1;
    var pPageSize = $('#select-page-size').val();
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClauseAllocation_Partners: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { ARAllocation_Partners_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblPartner>tbody>tr", $("#txt-Search").val().trim());
}
function ARAllocation_Partners_GetWhereClause() {
    debugger;
    var pWhereClause = "";
    if (glbTransactionType == constTransactionReceivableAllocation) {
        pWhereClause = " WHERE UnAllocatedReceivables IS NOT NULL";
    }
    else if (glbTransactionType == constTransactionPayableAllocation) {
        var pWhereClause = " WHERE (UnAllocatedPayables IS NOT NULL OR PartnerTypeID=" + constCustodyPartnerTypeID + ")";
    }
    if ($("#txt-Search").val().trim() != "") {
        pWhereClause += " AND (";
        pWhereClause += " PartnerTypeName like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " OR Name like N'%" + $("#txt-Search").val().trim() + "%' ";
        //pWhereClause += " OR Code like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += ")";
    }
    if ($("#slPartner").val() != "") {
        pWhereClause += " AND (";
        pWhereClause += " ID = N'" + $("#slPartner").val() + "' ";
        pWhereClause += " AND PartnerTypeID = N'" + $("#slPartner option:selected").attr("PartnerTypeID") + "' ";
        pWhereClause += ")";
    }
    if ($("#slPartnerType").val() != "") {
        pWhereClause += " AND (";
        pWhereClause += " PartnerTypeID = N'" + $("#slPartnerType").val() + "' ";
        pWhereClause += ")";
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
    $("#slPartner").html("<option value=''>All Partners</option>");//to quickly empty
    var pPartnerTypeID = $("#slPartnerType").val() == "" ? 0 : $("#slPartnerType").val();
    var pWhereClause = ARAllocation_Partners_GetWhereClause();
    var pOrderBy = " ID DESC "
    var pPageNumber = 1; //($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text())
    var pPageSize = $('#select-page-size').val();
    var pControllerParameters = { pPartnerTypeID: pPartnerTypeID, pWhereClauseAllocation_Partners: pWhereClause, pOrderBy: pOrderBy, pPageNumber: pPageNumber, pPageSize: pPageSize }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Payment/ARAllocation_Partners_PartnerTypeChanged", pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
        , function (pData) {
            ARAllocation_Partners_BindTableRows(JSON.parse(pData[0]));
            FillListFromObject(null, 5/*pCodeOrName*/, "All Partners", "slPartner", pData[2], null);
            FadePageCover(false);
        }
        , null);
}
/*****************************************EOF Main Screen Fns (showing partners)************************************************/

/***************************************Allocation Fns***********************************************************/
function ARAllocation_EditByDblClick(pPartnerID, pPartnerTypeID, pPartnerName, pUnAllocatedAmount) {
    debugger;
    if (!ARAllocation_CheckBalanceExists(pUnAllocatedAmount) && pPartnerTypeID != constCustodyPartnerTypeID)
        swal("Sorry", "None is found for that partner to allocate.");
    else {
        jQuery("#AllocationModal").modal("show");
        ClearAllTableRows("tblAllocationItem"); //to quickly clear before calling controller
        ClearAllTableRows("tblPartnerBalance"); //to quickly clear before calling controller
        FadePageCover(true);
        var strFunctionName = "/api/Payment/ARAllocation_FillAllocationData";
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
                    $("#lblAllocationShown").html(": " + pPartnerName);
                    $("#hAllocationPartnerID").val(pPartnerID);
                    $("#hAllocationPartnerTypeID").val(pPartnerTypeID);
                    $("#txtAllocationPartnerName").val(pPartnerName.split('(')[0]);
                    $("#txtAllocationDate").val(getTodaysDateInddMMyyyyFormat);
                    $("#txtAllocationAvailableBalance").val(ptxtAvailableBalance);
                    //$("#txtAllocationRemainingBalance").val(pPartnerBalance);
                    ARAllocation_BindPartnerBalance(JSON.parse(pPartnerBalance));
                    if (glbTransactionType == constTransactionReceivableAllocation)
                        ARAllocation_BindAllocationItemsTableRows(pInvoices, pPartnerBalance);
                    else if (glbTransactionType == constTransactionPayableAllocation)
                        ARAllocation_BindAllocationItemsTableRows(pPayables, pPartnerBalance);
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
    pTableHTML += '         <th>Partner</th>';
    pTableHTML += '         <th>Inv.No</th>';
    if (glbTransactionType == constTransactionPayableAllocation)
        pTableHTML += '         <th>Charge</th>';
    pTableHTML += '         <th>Operation</th>';
    pTableHTML += '         <th>Status</th>';
    pTableHTML += '         <th>Total</th>';
    pTableHTML += '         <th>Cur</th>';
    pTableHTML += '         <th>AmountDue</th>';
    pTableHTML += '         <th>PaidAmt</th>';
    pTableHTML += '         <th>Remaining</th>';
    pTableHTML += '         <th>PayFrom</th>';
    pTableHTML += '         <th>Ex.Rate</th>';
    pTableHTML += '         <th class="rounded-right hide"></th>';
    pTableHTML += "     </tr>";
    pTableHTML += "</thead>";
    pTableHTML += "<tbody>";
    if (glbTransactionType == constTransactionReceivableAllocation) //Receivables
        $.each(pTable, function (i, item) {
            pTableHTML += " <tr ID='" + item.ID + "'> ";
            pTableHTML += "       <td class='ID hide' > <input name='" + pCheckboxNameAttr + "' type='checkbox' value='" + item.ID + "' " + (1 == 1 ? "" : "checked='checked'") + "></td> ";
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

            pTableHTML += " </tr> ";
        });
    else if (glbTransactionType == constTransactionPayableAllocation) //Payables
        $.each(pTable, function (i, item) {
            pTableHTML += " <tr ID='" + item.ID + "'> ";
            pTableHTML += "       <td class='ID hide' > <input name='" + pCheckboxNameAttr + "' type='checkbox' value='" + item.ID + "' " + (1 == 1 ? "" : "checked='checked'") + "></td> ";
            //pTableHTML += "     <td class='Invoice' val='" + item.ChargeTypeID + "' style='width:300px;'>" + item.ChargeTypeName + "</td> ";
            pTableHTML += "       <td class='PartnerID' val='" + item.PartnerSupplierID + "'>" + item.PartnerSupplierName + "</td>"
            pTableHTML += "       <td class='PartnerTypeID hide' val='" + item.SupplierPartnerTypeID + "'>" + item.PartnerTypeCode + "</td>"
            pTableHTML += "       <td class='InvoiceNumber'>" + (item.SupplierInvoiceNo == 0 ? "" : item.SupplierInvoiceNo) + "</td> ";
            pTableHTML += "       <td class='Charge'>" + item.ChargeTypeName + "</td> ";
            pTableHTML += "       <td class='Operation'>" + (item.OperationCode == 0 ? "" : item.OperationCode) + "</td> ";
            pTableHTML += "       <td class='Status text-danger'>" + item.PayableStatus + "</td> ";
            pTableHTML += "       <td class='Amount'>" + item.CostAmount.toFixed(3) + "</td> ";
            pTableHTML += "       <td class='CurrencyID' val='" + item.CurrencyID + "'>" + item.CurrencyCode + "</td>"
            //pTableHTML += "       <td class='PayableAmountDue'> <input type='text' id='txtItemAmountDue" + item.ID + "' class='form-control controlStyle' onchange='ARAllocation_Row_CheckAmountDue(" + item.ID + ");' onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);'  data-required='false' maxlength='10' placeholder='0.00' /> </td> ";
            pTableHTML += "       <td class='AmountDue'> <input style='width:60%;' type='text' id='txtItemAmountDue" + item.ID + "' class=' controlStyle' onchange='ARAllocation_ReCalculate();' onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);'  data-required='false' maxlength='10' placeholder='0.00' /> </td> ";
            pTableHTML += "       <td class='PaidAmount'>" + item.PaidAmount.toFixed(4) + "</td> ";
            pTableHTML += "       <td class='RemainingAmount'>" + (item.CostAmount.toFixed(4) - item.PaidAmount.toFixed(4)) + "</td> ";
            pTableHTML += "       <td class='BalanceCurrency'> <select id='slBalanceCurrency" + item.ID + "' class='controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='ARAllocation_Row_SetExchangeRate(" + item.ID + ");' data-required='false'></select> </td> ";
            pTableHTML += "       <td class='ExchangeRate'><input style='width:60%;' type='text' id='txtItemExchangeRate" + item.ID + "' class='InvoiceExchangeRate controlStyle' data-type='float' onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onchange='ARAllocation_ReCalculate();' onblur='CheckDecimalFormat(id);'  data-required='true' maxlength='10' placeholder='0.00' " + ($("#hDefaultCurrencyID").val() == item.CurrencyID ? "disabled" : "") + " /> </td> ";

            pTableHTML += " </tr> ";
        });
    pTableHTML += "</tbody>";
    $("#tblAllocationItem").html(pTableHTML);
    //to fill the controls after creating them in the previous loop
    $.each(pTable, function (i, item) {
        debugger;
        FillListFromObject(null, 6/*pCodeOrName*/, null, "slBalanceCurrency" + item.ID, pPartnerBalance
            , function () {
                ARAllocation_Row_SetExchangeRate(item.ID);
            });
    });
    HighlightText("#tblAllocationItem>tbody>tr", $("#txtSearchAllocationItems").val().trim());
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
    if (pItemCurrencyID == $("#slBalanceCurrency" + pRowID).val()
        //|| (pItemCurrencyID != $("#hDefaultCurrencyID").val() && $("#slBalanceCurrency" + pRowID).val() != $("#hDefaultCurrencyID").val()) //this row condition is for paying from 2 diff. currencies which are not Default
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
        var pTblAllocationItem = $("#tblAllocationItem tbody tr");
        for (var i = 0 ; i < pTblAllocationItem.length; i++) {
            //Fill Parameters from tbl controls here
            var pRowID = pTblAllocationItem[i].id;
            var tr = $("#tblAllocationItem tbody tr[ID=" + pRowID + "]");
            if (parseFloat($("#txtItemAmountDue" + pRowID).val()) > 0 && $("#txtItemAmountDue" + pRowID).val() != "") {
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
        };
        if (pAllocationItemsIDs == "")
            swal("Sorry", "No, allocations is assigned.");
        else {
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/Payment/ARAllocation_Save", pParametersWithValues
                , function (pData) {
                    if (pData[0]) {
                        swal("Success", "Allocation done successfully.");
                        ARAllocation_Partners_LoadingWithPaging();
                        jQuery("#AllocationModal").modal("hide");
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
        var pPartnerBalance = $("#tblPartnerBalance tbody tr");
        for (var i = 0 ; i < pPartnerBalance.length; i++) {
            var pBalanceCurrencyID = pPartnerBalance[i].id;
            var pAvailableCurrencyBalance = $("#tblPartnerBalance tbody tr[ID=" + pBalanceCurrencyID + "]").find("td.AvailableBalance").text();
            var pAmountDueCurrencyBalance = $("#tblPartnerBalance tbody tr[ID=" + pBalanceCurrencyID + "]").find("td.AmountDue").text();
            if (parseFloat(pAvailableCurrencyBalance) < parseFloat(pAmountDueCurrencyBalance))
                strReturnedMessage = "Amount to be paid from the " + $("#tblPartnerBalance tbody tr[ID=" + pBalanceCurrencyID + "]").find("td.CurrencyID").text() + " balance exceeds the available limit.";
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
//            CallGETFunctionWithParameters("/api/Payment/ARAllocation_Save", pParametersWithValues
//                , function (pData) {
//                    FadePageCover(false);
//                }
//                , null);
//        } // EOF else pAllocationItemsIDs != ""
//    } // EOF else of strReturnedMessage == ""
//}
/***********************************EOF Allocation Fns***********************************************************/