//1: Excel File
//2: Excel File Without Formatting
//3: PDF File
//4: Rich Text Format Document
//5: Word Document
function QuotationsStatistics_Initialize() {
    debugger;
    LoadView("/Reports/QuotationsStatistics", "div-content", function () {
        CallGETFunctionWithParameters("/api/QuotationsStatistics/GetQuotationsStatisticsFilter", null
            , function (data) {
                //data[0]:Users //data[1]:Branches //data[2]:Customers //data[3]:Currencies //data[4]:Oper.States
                debugger;

                var _Salesmentemp = JSON.parse(data[0]);
                var pSalesmen = jQuery.grep(_Salesmentemp, function (_Salesmentemp) {
                    return _Salesmentemp.IsSalesman == true;
                });

                //FillListFromObject(pID, pCodeOrName/*1-Code 2-Name*/, pStrFirstRow, pSlName, pData, callback)
                FillListFromObject(null, 2, "All Salesmen", "slSalesman", JSON.stringify(pSalesmen), function () {
                    if (pDefaults.UnEditableCompanyName == "ATL" && pLoggedUser.IsHideOthersRecords == true) {
                        $("#slSalesman").prop("disabled", true);
                        $("#slSalesman").val(pLoggedUser.ID);

                    }
                });
                FillListFromObject(null, 2, "All Users", "slCreator", data[0], null);
                FillListFromObject(null, 2, "All Branches", "slBranch", data[1], null);
                //FillListFromObject(null, 2, "All Customers", "slCustomer", data[2], null);
                if (pDefaults.UnEditableCompanyName == "BED")
                    $(".classShowForBED").removeClass("hide");
                if (pDefaults.UnEditableCompanyName == "GBL")
                    CallGETFunctionWithParameters("/api/Customers/LoadAllWithMinimalColumns"
                        , { pWhereClauseWithMinimalColumns: "WHERE  1=1 ", pOrderBy: "Name" }
                        , function (pData) {
                            FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slCustomer", pData[0], null);
                            //Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(pData[0], "ID", "Name", '', TranslateString("SelectFromMenu"), "#hReadySlCustomers", null, "IsInactive", null);
                        }
                        , null);
                else
                    $("#slCustomer").html($("#hReadySlCustomers").html());
                FillListFromObject(null, 2, "All Agents", "slAgent", data[5], null);
                FillListFromObject(null, 1, "All Currencies", "slCurrency", data[3], null);
                FillListFromObject(null, 2, "All Quotation States", "slQuotationStages", data[4], null);
                $("#txtFromCreationDate").val(getTodaysDateInddMMyyyyFormat());
                $("#txtToCreationDate").val(getTodaysDateInddMMyyyyFormat());


                if (pLoggedUser.IsSalesman == true && pLoggedUser.IsHideOthersRecords == true)
                    $(".classShowForUnSalemen").addClass("hide");
                else
                    $(".classShowForUnSalemen").removeClass("hide");
            }
            , function () { FadePageCover(false); $("#hl-menu-Reports").parent().addClass("active"); });
    });
}
function QuotationsStatistics_Print(pOutputTo) {
    debugger;
    if (
        ($("#txtFromCreationDate").val().trim() == "" || isValidDate($("#txtFromCreationDate").val(), 1))
        && ($("#txtToCreationDate").val().trim() == "" || isValidDate($("#txtToCreationDate").val(), 1))
    ) {
        FadePageCover(true);
        var pWhereClause = QuotationsStatistics_GetFilterWhereClause();
        //if ($('#ulReportTypes .active').val() == 0)
        //    swal(strSorry, "Please, Select a report type.");
        //else {
        var pParametersWithValues = {
            pWhereClause: pWhereClause +" Order By CodeSerial"
            //, pDirectionType: ($("#lbl-filter-import").hasClass('active') ? "Import"
            //    : $("#lbl-filter-export").hasClass('active') ? "Export"
            //    : $("#lbl-filter-domestic").hasClass('active') ? "Domestic"
            //    : "ALL")
            //, pTransPortType: ($("#lbl-filter-ocean").hasClass('active') ? "Ocean"
            //    : $("#lbl-filter-air").hasClass('active') ? "Air"
            //    : $("#lbl-filter-inland").hasClass('active') ? "Inland"
            //    : "ALL")
        };
        CallGETFunctionWithParameters("/api/QuotationsStatistics/LoadData"
            , pParametersWithValues
            , function (data) {
                if (data[0]) //pRecordsExist
                    QuotationsStatistics_DrawReport(data, pOutputTo);
                else
                    swal(strSorry, "Please, Refresh then try again and if the problem persists try another search criteria.");
                FadePageCover(false);
            });
        //}
    }
    else
        swal(strSorry, "Please make sure that date format is dd/MM/yyyy.");
}

function QuotationsStatistics_GetFilterWhereClause() {
    var pWhereClause = "";
    var pTransportFilter = "";
    var pDirectionFilter = "";
    //var pBLTypeFilter = "";
    var pSalesmanFilter = "";
    var pCreatorFilter = "";
    var pBranchFilter = "";
    var pCustomerFilter = "";
    var pAgentFilter = "";
    var pFromCreationDateFilter = "";
    var pToCreationDateFilter = "";
    var pPOL = "";
    var pPOD = "";
    var pHideExpiredQuotations = "";
    //var pQuotationStageFilter = ($("#ulQuotationStages li[class=active]").val() == 0 ? "" : " ( QuotationStageID = " + $("#ulQuotationStages li[class=active]").val() + ")"); //if 0 then all stages
    //var pQuotationStageFilter = ($("#slQuotationStages").val() == 0
    //                            ? "" //if 0 then all stages
    //                            : ($("#slQuotationStages").val() == ClosedQuoteAndOperStageID.toString() ? (" (CloseDate <= GETDATE() AND QuotationStageID <> " + /*This is to handle case of auto close*/CancelledQuoteAndOperStageID.toString() + ") ") : (" QuotationStageID = " + $("#slQuotationStages").val() + " AND CloseDate > GETDATE() "))
    //                            );
    var pQuotationStageFilter = ($("#slQuotationStages").val() == 0
        ? "" //if 0 then all stages
        : ("QuotationStageID=" + $("#slQuotationStages").val())
    );

    pDirectionFilter += ($("#lbl-filter-import").hasClass('active') ? (pDirectionFilter == "" ? " (DirectionType = 1 " : " OR DirectionType = 1 ") : "");
    pDirectionFilter += ($("#lbl-filter-export").hasClass('active') ? (pDirectionFilter == "" ? " (DirectionType = 2 " : " OR DirectionType = 2 ") : "");
    pDirectionFilter += ($("#lbl-filter-domestic").hasClass('active') ? (pDirectionFilter == "" ? " (DirectionType = 3 " : " OR DirectionType = 3 ") : "");
    pDirectionFilter += (pDirectionFilter == "" ? "" : ") ");

    pTransportFilter += ($("#lbl-filter-ocean").hasClass('active') ? (pTransportFilter == "" ? " (TransportType = 1 " : " OR TransportType = 1 ") : "");
    pTransportFilter += ($("#lbl-filter-air").hasClass('active') ? (pTransportFilter == "" ? " (TransportType = 2 " : " OR TransportType = 2 ") : "");
    pTransportFilter += ($("#lbl-filter-inland").hasClass('active') ? (pTransportFilter == "" ? " (TransportType = 3 " : " OR TransportType = 3 ") : "");
    pTransportFilter += (pTransportFilter == "" ? "" : ") ");

    //pBLTypeFilter += ($("#lbl-filter-direct").hasClass('active') ? (pBLTypeFilter == "" ? " (BLType = " + constDirectBLType : " OR BLType = " + constDirectBLType) : "");
    //pBLTypeFilter += ($("#lbl-filter-house").hasClass('active') ? (pBLTypeFilter == "" ? " (BLType = " + constHouseBLType : " OR BLType = " + constHouseBLType) : "");
    //pBLTypeFilter += ($("#lbl-filter-master").hasClass('active') ? (pBLTypeFilter == "" ? " (BLType = " + constMasterBLType : " OR BLType = " + constMasterBLType) : "");
    //pBLTypeFilter += (pBLTypeFilter == "" ? "" : ") ");

    if (pDirectionFilter != "" && pTransportFilter == "")
        pWhereClause = " WHERE " + pDirectionFilter;
    else
        if (pDirectionFilter == "" && pTransportFilter != "")
            pWhereClause = " WHERE " + pTransportFilter;
        else
            if (pDirectionFilter != "" && pTransportFilter != "")
                pWhereClause = " WHERE " + pDirectionFilter + " AND " + pTransportFilter;

    //if (pBLTypeFilter != "" && pWhereClause != "")
    //    pWhereClause += " AND " + pBLTypeFilter;
    //else
    //    if (pBLTypeFilter != "" && pWhereClause == "")
    //        pWhereClause += " WHERE " + pBLTypeFilter;

    if (pQuotationStageFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pQuotationStageFilter;
    else
        if (pQuotationStageFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pQuotationStageFilter;

    pBranchFilter = ($("#slBranch").val() == "" ? "" : " BranchID = " + $("#slBranch").val());
    if (pBranchFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pBranchFilter;
    else
        if (pBranchFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pBranchFilter;


    if (pLoggedUser.IsSalesman == true && pLoggedUser.IsHideOthersRecords == true)
        pSalesmanFilter = " SalesmanID = " + pLoggedUser.ID + "";
    else
        pSalesmanFilter = ($("#slSalesman").val() == "" ? "" : " SalesmanID = " + $("#slSalesman").val());





    if (pSalesmanFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pSalesmanFilter;
    else
        if (pSalesmanFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pSalesmanFilter;


    pHideExpiredQuotations = ($("#cbHideExpiredQuotations").prop("checked") ? " IsExpired = 0 " : "");
    if (pHideExpiredQuotations != "" && pWhereClause != "")
        pWhereClause += " AND " + pHideExpiredQuotations;
    else
        if (pHideExpiredQuotations != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pHideExpiredQuotations;

    pCreatorFilter = ($("#slCreator").val() == "" ? "" : " CreatorUserID = " + $("#slCreator").val());
    if (pCreatorFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pCreatorFilter;
    else
        if (pCreatorFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pCreatorFilter;

    pCustomerFilter = ($("#slCustomer").val() == "" ? "" : " ClientID = " + $("#slCustomer").val());
    if (pCustomerFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pCustomerFilter;
    else
        if (pCustomerFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pCustomerFilter;

    pAgentFilter = ($("#slAgent").val() == "" ? "" : " AgentID = " + $("#slAgent").val());
    if (pAgentFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pAgentFilter;
    else
        if (pAgentFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pAgentFilter;

    //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
    if (isValidDate($("#txtFromCreationDate").val().trim(), 1) && $("#txtFromCreationDate").val().trim() != "") {
        //pFromCreationDateFilter = " CreationDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromCreationDate").val().trim()) + "'";
        pFromCreationDateFilter = " QuotationOpenDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromCreationDate").val().trim()) + "'";
        if (pFromCreationDateFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pFromCreationDateFilter;
        else
            if (pFromCreationDateFilter != "" && pWhereClause == "")
                pWhereClause += " WHERE " + pFromCreationDateFilter;
    }
    //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
    if (isValidDate($("#txtToCreationDate").val().trim(), 1) && $("#txtToCreationDate").val().trim() != "") {
        //pToCreationDateFilter = " CAST(CreationDate AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToCreationDate").val().trim()) + "'";
        pToCreationDateFilter = " CAST(QuotationOpenDate AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToCreationDate").val().trim()) + "'";
        if (pToCreationDateFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pToCreationDateFilter;
        else
            if (pToCreationDateFilter != "" && pWhereClause == "")
                pWhereClause += " WHERE " + pToCreationDateFilter;
    }

    //pPOL = ($("#slPOL option:selected").val() == "" ? "" : " POL = " + $("#slPOL option:selected").val());
    //if (pPOL != "" && pWhereClause != "")
    //    pWhereClause += " AND " + pPOL;
    //else
    //    if (pPOL != "" && pWhereClause == "")
    //        pWhereClause += " WHERE " + pPOL;
    //pPOD = ($("#slPOD option:selected").val() == "" ? "" : " POD = " + $("#slPOD option:selected").val());
    //if (pPOD != "" && pWhereClause != "")
    //    pWhereClause += " AND " + pPOD;
    //else
    //    if (pPOD != "" && pWhereClause == "")
    //        pWhereClause += " WHERE " + pPOD;

    pWhereClause = (pWhereClause == "" ? " WHERE (1=1) " : pWhereClause);// + " ORDER BY ID DESC ";
    return pWhereClause;
}

function QuotationsStatistics_DrawReport(data, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(data[1]);
    var pCreatedCount = data[2];
    var pAcceptedCount = data[3];
    var pDeclinedCount = data[4];
    var pApprovedCount = data[5];

    var QuotationChargesList = JSON.parse(data[6]);

    var QuotationDates = JSON.parse(data[7]);
    // extract different Currencies in QuotationChargesList
    var CurrenciesArray = [...new Set(QuotationChargesList.map((item) => item.SaleCurrencyCode))];
    var CostCurrenciesArray;
    if (pDefaults.UnEditableCompanyName == "GCL") {
        CostCurrenciesArray = [...new Set(QuotationChargesList.map((item) => item.CostCurrencyCode))];
    }




    var pReportTitle = "Quotations Statistics";

    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTablesHTML = "";
    pTablesHTML += ' <div style="overflow: auto;"> ';
    //ReportHTML += '                         <table id="tblQuotationsStatistics" class="table table-striped text-sm table-hover b-t b-r b-b b-l print">';//remove t1 class to remove row numbers
    pTablesHTML += '                         <table id="tblQuotationsStatistics" class="table table-striped text-sm table-bordered  " style="border:solid #000 !important;">';//style="border-left:solid #999 !important;border-top:solid #999 !important;"
    pTablesHTML += '                             <thead>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                     <th>Code</th>';
    pTablesHTML += '                                     <th>Status</th>';
    //pTablesHTML += '                                     <th class="hide">Quot.Type</th>';
    pTablesHTML += '                                     <th>Client / Sales Oppurtunity</th>';
    //if (pDefaults.UnEditableCompanyName == "GBL")
    //    pTablesHTML += '                                     <th>Current</th>';
    pTablesHTML += '                                     <th>Agent</th>';
    if (pDefaults.UnEditableCompanyName == "TEU" || pDefaults.UnEditableCompanyName == "GBL")
        pTablesHTML += '                                     <th>SalesLead</th>';
    //pTablesHTML += '                                     <th>Cntrs/Pkgs</th>';
    pTablesHTML += '                                     <th>LineName</th>';
    //pTablesHTML += '                                     <th>ShipmentType</th>';
    pTablesHTML += '                                     <th>POL</th>';
    pTablesHTML += '                                     <th>POD</th>';
    pTablesHTML += '                                     <th>Created By</th>';
    pTablesHTML += '                                     <th>Creation</th>';
    //pTablesHTML += '                                     <th>Close Date</th>';
    //pTablesHTML += '                                     <th>Arrival Date</th>';
    //pTablesHTML += '                                     <th>ATS</th>';
    pTablesHTML += '                                     <th>Salesman</th>';
    pTablesHTML += '                                     <th>Operations</th>';
    if (pDefaults.UnEditableCompanyName == "BSEA")
    pTablesHTML += '                                     <th>Container Types</th>';
    if ($("#cbTotalInDefaultCurrency").prop("checked"))
        pTablesHTML += '                                     <th>Total Sale in (' + pDefaults.CurrencyCode + ')</th>';

    pTablesHTML += CurrenciesArray.map((Currency) => '   <th>Sale(' + Currency + ')</th>   ')

    if (pDefaults.UnEditableCompanyName == "GCL") {
        pTablesHTML += CostCurrenciesArray.map((Currency) => '   <th>Cost(' + Currency + ')</th>   ');
    }
    if (pDefaults.UnEditableCompanyName == "TEU")
        pTablesHTML += '                                     <th>Cost(' + pDefaults.CurrencyCode + ')</th>';
    if (pDefaults.UnEditableCompanyName == "GBL")
        pTablesHTML += '                                     <th>EquipModel</th>';
    if (pOutputTo != "Excel")
        pTablesHTML += '                                     <th>Expired</th>';
    pTablesHTML += '                                     <th>ExpirationDate</th>';
    if ($("#cbServiceType").prop("checked"))
        pTablesHTML += '                                     <th>Service Type</th>';
    if ($("#cbTransportType").prop("checked"))
        pTablesHTML += '                                     <th>Transport Type</th>';
    if ($("#cbDeclineReason").prop("checked"))
        pTablesHTML += '                                     <th>Decline Reason</th>';
    if ($("#cbOperationMan").prop("checked"))
        pTablesHTML += '                                     <th>Operation Man</th>';
    if ($("#cbApprovalUser").prop("checked"))
        pTablesHTML += '                                     <th>Approval User</th>';
    if ($("#cbRequestForChargesDate").prop("checked"))
        pTablesHTML += '                                     <th>Request For Charges Date</th>';
    if ($("#cbConfirmChargesDate").prop("checked"))
        pTablesHTML += '                                     <th>Confirm Charges Date</th>';
    if ($("#cbQuotationApprovalDate").prop("checked"))
        pTablesHTML += '                                     <th>Quotation Approval Date</th>';
    //if ($("#cbDateForSendingEmail").prop("checked"))
    //    pTablesHTML += '                                     <th>Date For Sending Email</th>';
    if ($("#cbCreationDate").prop("checked"))
        pTablesHTML += '                                     <th>Quotation Creation Date</th>';
    pTablesHTML += '                                 </tr>';
    pTablesHTML += '                             </thead>';
    pTablesHTML += '                             <tbody>';
    //debugger;
    //$.each(JSON.parse(pReportRows), function (i, item) { debugger; });
    $.each((pReportRows), function (i, item) {
        let TransportTypeName = "";
        if (item.TransportType == OceanTransportType) TransportTypeName = "Ocean";
        else if (item.TransportType == AirTransportType) TransportTypeName = "Air";
        else if (item.TransportType == InlandTransportType) TransportTypeName = "Inland";

        pTablesHTML += '                                     <tr style="font-size:95%;">';
        if (pDefaults.UnEditableCompanyName == "FWD") {
            pTablesHTML += '                                         <td>' + (item.Code == 0 ? item.QuotationCode : item.Code) + '</td>';
        } else {
            pTablesHTML += '                                         <td>' + (item.Code == 0 ? "" : item.Code) + '</td>';
        }
        pTablesHTML += '                                         <td>' + (item.QuotationStageName == 0 ? "" : item.QuotationStageName) + '</td>';
        //pTablesHTML += '                                         <td class="hide">' + (item.RepDirectionTypeShown == 0 ? "" : item.RepDirectionTypeShown) + " " + (item.RepTransportTypeShown == 0 ? "" : item.RepTransportTypeShown) + '</td>';
        pTablesHTML += '                                         <td>' + (item.ClientName == 0 ? item.SalesLeadName : item.ClientName) + '</td>';
        //if (pDefaults.UnEditableCompanyName == "GBL")
        //    pTablesHTML += '                                         <td>' + (item.IsAddedToCustomer ? "Yes" : "No") + '</td>';
        pTablesHTML += '                                         <td>' + (item.AgentName == 0 ? "" : item.AgentName) + '</td>';
        if (pDefaults.UnEditableCompanyName == "TEU" || pDefaults.UnEditableCompanyName == "GBL")
            pTablesHTML += '                                         <td>' + (item.SalesLeadName == 0 ? "" : item.SalesLeadName) + (item.SalesLeadCustomerName == 0 ? "" : ("(" + item.SalesLeadCustomerName + ")")) + '</td>';
        //if (item.RepTransportTypeShown == "AIR" || item.ShipmentTypeCode == "LCL" || item.ShipmentTypeCode == "LTL")
        //    pTablesHTML += '                                     <td>' + (item.PackageTypes == 0 ? "" : item.PackageTypes) + '</td>';
        //else
        //    pTablesHTML += '                                     <td>' + (item.ContainerTypes == 0 ? "" : item.ContainerTypes) + '</td>';
        pTablesHTML += '                                         <td>' + (item.LineName == 0 ? "" : item.LineName) + '</td>';
        //pTablesHTML += '                                         <td>' + (item.ShipmentTypeCode == 0 ? "" : item.ShipmentTypeCode) + '</td>';
        pTablesHTML += '                                         <td>' + (item.POLName == 0 ? "" : item.POLName) + '</td>';
        pTablesHTML += '                                         <td>' + (item.PODName == 0 ? "" : item.PODName) + '</td>';
        if (pDefaults.UnEditableCompanyName == "FWD") {
            pTablesHTML += '                                         <td>' + (item.CreatorUserID == 0 ? item.QuotationCreatorUserName : item.CreatorName) + '</td>';
        } else {
            pTablesHTML += '                                         <td>' + (item.CreatorName) + '</td>';
        }
        //pTablesHTML += '                                         <td>' + (item.CreationDate == "/Date(-2208996000000)/" ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate))) + '</td>';
        pTablesHTML += '                                         <td>' + (item.QuotationOpenDate == "/Date(-2208996000000)/" ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.QuotationOpenDate))) + '</td>';
        //pTablesHTML += '                                         <td>' + (item.CloseDate == "/Date(-2208996000000)/" ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.CloseDate))) + '</td>';
        //pTablesHTML += '                                         <td>' + (item.ActualArrival == "/Date(-2208996000000)/" ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ActualArrival))) + '</td>';
        //pTablesHTML += '                                         <td>' + (item.ActualDeparture == "/Date(-2208996000000)/" ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ActualDeparture))) + '</td>';
        pTablesHTML += '                                         <td>' + (item.SalesmanName == 0 ? "" : item.SalesmanName) + '</td>';
        pTablesHTML += '                                         <td>' + (item.QuoteOperations == 0 ? "" : item.QuoteOperations) + '</td>';

        if (pDefaults.UnEditableCompanyName == "BSEA")
            pTablesHTML += '                                         <td>' + (item.ContainerTypes == 0 ? "" : item.ContainerTypes) + '</td>';
        debugger;
        if ($("#cbTotalInDefaultCurrency").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.Sale == 0 ? item.SaleFromCharges.toFixed(2) : item.Sale.toFixed(2)) + '</td>';

        for (let i = 0; i < CurrenciesArray.length; i++) {
            // loop over QuotationChargesList and get the row that matches item.ID=QuotationChargesList.QuotationRouteID and get SalePrice
            let SalePrice = 0;
            QuotationChargesList.forEach((QuotationCharge) => {
                if (QuotationCharge.QuotationRouteID == item.ID && CurrenciesArray[i] == QuotationCharge.SaleCurrencyCode) {
                    SalePrice += QuotationCharge.SalePrice;
                }
            })
            pTablesHTML += '<td>' + SalePrice.toFixed(2) + '</td>';
        }

        if (pDefaults.UnEditableCompanyName == "GCL") {
            for (let i = 0; i < CostCurrenciesArray.length; i++) {
                // loop over QuotationChargesList and get the row that matches item.ID=QuotationChargesList.QuotationRouteID and get SalePrice
                let CostPrice = 0;
                QuotationChargesList.forEach((QuotationCharge) => {
                    if (QuotationCharge.QuotationRouteID == item.ID && CostCurrenciesArray[i] == QuotationCharge.CostCurrencyCode) {
                        CostPrice += QuotationCharge.CostPrice;
                    }
                })
                pTablesHTML += '<td>' + CostPrice.toFixed(2) + '</td>';
            }
        }


        if (pDefaults.UnEditableCompanyName == "TEU")
            pTablesHTML += '                                         <td>' + item.CostFromCharges.toFixed(2) + '</td>';
        if (pDefaults.UnEditableCompanyName == "GBL")
            pTablesHTML += '                                         <td>' + (item.EquipmentModelName == 0 ? "" : item.EquipmentModelName) + '</td>';

        if (pOutputTo != "Excel")
            pTablesHTML += "                                         <td>" + (item.IsExpired ? "Yes" : "") + "</td>";
        pTablesHTML += '                                         <td>' + ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate)) + '</td>';
        //pTablesHTML += '                                         <td>' + item.CostAmountSubTotal.toFixed(2) + '</td>';

        if ($("#cbServiceType").prop("checked"))
            pTablesHTML += '                                         <td>' + item.MoveTypeName + '</td>';
        if ($("#cbTransportType").prop("checked"))
            pTablesHTML += '                                         <td>' + TransportTypeName + '</td>';
        if ($("#cbDeclineReason").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.DenialReason == "0" ? "" : item.DenialReason) + '</td>';
        if ($("#cbOperationMan").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.OperationManName == "0" ? "" : item.OperationManName) + '</td>';
        if ($("#cbApprovalUser").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.SetApprovalUserName == "0" ? "" : item.SetApprovalUserName) + '</td>';
        if ($("#cbRequestForChargesDate").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.ChareRequestDate == "/Date(-2208996000000)/" ? "" : GetFullDateTime_DD_MM_YY(item.ChareRequestDate)) + '</td>';
        if ($("#cbConfirmChargesDate").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.ChargeConfirmDate == "/Date(-2208996000000)/" ? "" : GetFullDateTime_DD_MM_YY(item.ChargeConfirmDate)) + '</td>';
        if ($("#cbQuotationApprovalDate").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.RequestApprovalDate == "/Date(-2208996000000)/" ? "" : GetFullDateTime_DD_MM_YY(item.RequestApprovalDate)) + '</td>';
        if ($("#cbCreationDate").prop("checked")) {
            debugger;
            let qDate = QuotationDates.find(obj => obj.ID === item.QuotationID);
            pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/2001", GetDateWithFormatMDY(qDate.CreationDate)) < 1 ? "" : (GetFullDateTime_DD_MM_YY_hh_mm(qDate.CreationDate))) + '</td>';
        }
        //if ($("#cbDateForSendingEmail").prop("checked"))
        //    pTablesHTML += '                                         <td>' + (item. == "0" ? "" : item.) + '</td>';
        pTablesHTML += '                                     </tr>';
    });
    pTablesHTML += '                             </tbody>';
    pTablesHTML += '                         </table>';
    pTablesHTML += ' </div> ';
    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (pOutputTo == "Excel") {
        /*********************Append table summaries*************************/
        var pTableSummary = "";
        pTableSummary += '                                     <tr style="font-size:95%;">';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';

        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';

        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                     </tr>';
        pTableSummary += '                                     <tr style="font-size:95%;">';
        pTableSummary += '                                         <td>Total number of quotations :</td>';
        pTableSummary += '                                         <td>' + JSON.parse(data[1]).length + '</td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';

        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';

        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                     </tr>';
        pTableSummary += '                                     <tr style="font-size:95%;">';
        pTableSummary += '                                         <td>Number of quotations in stage "CREATED" :</td>';
        pTableSummary += '                                         <td>' + pCreatedCount + '</td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';

        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';

        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                     </tr>';
        pTableSummary += '                                     <tr style="font-size:95%;">';
        pTableSummary += '                                         <td>Total number of quotations :</td>';
        pTableSummary += '                                         <td>' + 'Number of quotations "ACCEPTED"' + '</td>';
        pTableSummary += '                                         <td>' + pAcceptedCount + '</td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';

        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';

        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                     </tr>';
        pTableSummary += '                                     <tr style="font-size:95%;">';
        pTableSummary += '                                         <td>Number of quotations "DECLINED" :</td>';
        pTableSummary += '                                         <td>' + pDeclinedCount + '</td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';

        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';

        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                     </tr>';
        pTableSummary += '                                     <tr style="font-size:95%;">';
        pTableSummary += '                                         <td>Total number of quotations :</td>';
        pTableSummary += '                                         <td>' + 'Number of quotations "APPROVED"' + '</td>';
        pTableSummary += '                                         <td>' + pApprovedCount + '</td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';

        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';

        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                     </tr>';
        //pTableSumm
        $("#tblQuotationsStatistics" + " tbody").append(pTableSummary);
        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblQuotationsStatistics", "Quotations Statistics");
    }
    else {

        var mywindow = null;
        if (pOutputTo != "Email")
            mywindow = window.open('', '_blank');
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        if (pDefaults.UnEditableCompanyName != "MAN") {
            if (pDefaults.UnEditableCompanyName == "OPL")
                ReportHTML += '             <div class="col-xs-12 text-left"><img style=" width: 25%; " src="/Content/Images/InvoiceCompanyHeader.jpg" alt="logo"/></div> </br>';

            else
                ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';

        } else
            ReportHTML += '                 <div class="col-xs-12 text-left"><img style="WIDTH: 30%" src="/Content/Images/YLMLogoFinalConv-01.svg" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

        ReportHTML += '             <div class="col-xs-3"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Transport Type :</b> ' + $("#divTransportFilter label.active").attr("title") + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Direction Type :</b> ' + $("#divDirectionFilter label.active").attr("title") + '</div>';
        //ReportHTML += '             <div class="col-xs-3"><b>B/L Type :</b> ' + $("#divBLTypeFilter label.active").attr("title") + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Salesman :</b> ' + $("#slSalesman option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Customer :</b> ' + $("#slCustomer option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Agent :</b> ' + $("#slAgent option:selected").text() + '</div>';
        ////ReportHTML += '             <div class="col-xs-3"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Quot. Status :</b> ' + $("#slQuotationStages option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-6"><b>Creation Date :</b> ' + ($("#txtFromCreationDate").val() == "" && $("#txtToCreationDate").val() == ""
            ? "All Dates"
            : ($("#txtFromCreationDate").val() == "" ? "" : "From " + $("#txtFromCreationDate").val() + " ") + ($("#txtToCreationDate").val() == "" ? "" : "To " + $("#txtToCreationDate").val())) + '</div>';
        ////ReportHTML += '                 <section class="panel panel-default">';
        //ReportHTML += '                     <div class="table-responsive">';
        ReportHTML += '                         <div> &nbsp; </div>'

        ReportHTML += pTablesHTML;

        //ReportHTML += '                     </div>';//of table-responsive
        if (pDefaults.UnEditableCompanyName == "BED") {
            let QuotationsCount = [...new Set(pReportRows.map((item) => item.QuotationID))]; // this line gets quotations count without considering quotation route count inside the quotation
            ReportHTML += '             <div class="col-xs-12"><b>Total number of quotations :</b> ' + QuotationsCount.length + '</div>';
            ReportHTML += '             <div class="col-xs-12"><b>Total number of quotations(including quotation routes) :</b> ' + JSON.parse(data[1]).length + '</div>';
        } else {
            ReportHTML += '             <div class="col-xs-12"><b>Total number of quotations :</b> ' + JSON.parse(data[1]).length + '</div>';
        }
        
        ReportHTML += '             <div class="col-xs-12"><b>Number of quotations in stage "CREATED" :</b> ' + pCreatedCount + '</div>';
        ReportHTML += '             <div class="col-xs-12"><b>Number of quotations "ACCEPTED" :</b> ' + pAcceptedCount + '</div>';
        ReportHTML += '             <div class="col-xs-12"><b>Number of quotations "DECLINED" :</b> ' + pDeclinedCount + '</div>';
        ReportHTML += '             <div class="col-xs-12"><b>Number of quotations "APPROVED" :</b> ' + pApprovedCount + '</div>';
        //ReportHTML += '             <div class="col-xs-12"><b>Profit Margin :</b> ' + pMarginSummary + '%</div>';

        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        ////ReportHTML += '         <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';
        //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.IsPrintISOCode input[type=checkbox]").prop("checked"))
        //    ReportHTML += '     <div class="row m-l">' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ISOCode").text() + '</div>';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        ReportHTML += '     </footer>';

        ReportHTML += '</html>';



        if (pOutputTo != "Email") {
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
        else {
            SendPDF_ReportByEmail($('#txtToEmail').val(), ReportHTML, pReportTitle, true);
        }


    }
}

function QuotationsStatistics_SelectColumns() {
    jQuery("#ModalSelectColumns").modal("show");
}
function SetSelectedColumns(pFlag) {
    debugger;
    $(".classCheckColumn:not(.hide)").prop("checked", pFlag);
}