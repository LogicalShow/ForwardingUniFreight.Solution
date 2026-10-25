//1: Excel File
//2: Excel File Without Formatting
//3: PDF File
//4: Rich Text Format Document
//5: Word Document
//function HoldTransactionLog_Initialize() {
//    debugger;
//    LoadView("/ContainerTrackingGroup/ConsolidationHandlingCoLoadReports", "div-content", function () {

//        FadePageCover(false);
//    })
//}
var AllChargeTypes; 

function OperationsStatistics_Initialize() {
    debugger;
    LoadView("/ContainerTrackingGroup/ConsolidationHandlingCoLoadReports", "div-content", function () {
        var _TodaysDate = getTodaysDateInddMMyyyyFormat();
        $('#slCustomer,#slCountryPOL,#slPOL,#slCountryPOD,#slPOD,#slBookingParty,#slVessel').css({ 'width': '100%' }).select2();

        if ($("#hf_CanEdit").val() == 1) {
            $("#btn-ExportToExcel_WithCurrencies").removeClass("hide");
            $("#btn-ExportToExcel_WithCurrencies-FromSelectOperations").removeClass("hide");
            $("#btn-ExportToExcel_WithCurrencies-FromSelect").removeClass("hide");
            $("#cbReceivables").parent().parent().removeClass("hide");
            $("#cbPayables").parent().parent().removeClass("hide");
            //$("#cbReceivablesWithCurrencies").parent().parent().removeClass("hide");
            //$("#cbPayablesWithCurrencies").parent().parent().removeClass("hide");
            $("#cbProfit").parent().parent().removeClass("hide");
            $("#cbMargin").parent().parent().removeClass("hide");
            $("#cbInvoices").parent().parent().removeClass("hide");
        } else {
            $("#btn-ExportToExcel_WithCurrencies").addClass("hide");
            $("#btn-ExportToExcel_WithCurrencies-FromSelectOperations").addClass("hide");
            $("#btn-ExportToExcel_WithCurrencies-FromSelect").addClass("hide");
            $("#cbReceivables").prop("checked", false);
            $("#cbPayables").prop("checked", false);
            //$("#cbReceivablesWithCurrencies").prop("checked", false);
            //$("#cbPayablesWithCurrencies").prop("checked", false);
            $("#cbProfit").prop("checked", false);
            $("#cbMargin").prop("checked", false);
            $("#cbInvoices").prop("checked", false);
        }
        if (pDefaults.UnEditableCompanyName == "ILS" || pDefaults.UnEditableCompanyName == "ILSEG") {
            $('#cbReferenceNumber').closest('div').removeClass('hide');
        }

        if (pDefaults.CompanyLocalName == "CPWORLD EGYPT") {
         
            if ($("#hLoggedUserID").val() == 4 || $("#hLoggedUserID").val() == 291 || $("#hLoggedUserID").val() == 371 || $("#hLoggedUserID").val() == 363 || $("#hLoggedUserID").val() == 379) {
                $('.ShowFroUsers').removeClass('hide');
            }
        }
        else {
            if ($("#hLoggedUserID").val() == 4 || $("#hLoggedUserID").val() == 291 || $("#hLoggedUserID").val() == 372 || $("#hLoggedUserID").val() == 363 || $("#hLoggedUserID").val() == 374) {
                $('.ShowFroUsers').removeClass('hide');
            }

        }
     

        CallGETFunctionWithParameters("/api/ConsolidationHandlingCoLoadReports/GetStatisticsFilter", null
            , function (data) {
                //data[0]:Users //data[1]:Branches //data[2]:Customers //data[3]:Currencies //data[4]:Oper.States
                debugger;
                //FillListFromObject(pID, pCodeOrName/*1-Code 2-Name*/, pStrFirstRow, pSlName, pData, callback)

                var _Salesmentemp = JSON.parse(data[0]);
                var pSalesmen = jQuery.grep(_Salesmentemp, function (_Salesmentemp) {
                    return _Salesmentemp.IsSalesman == true;
                });

                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slSalesman", JSON.stringify(pSalesmen), null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slCreator", data[0], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slTaskCreator", data[0], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slOperationMan", data[0], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slBranch", data[1], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slCountryPOL", data[12]
                    , function () { $("#slCountryPOD").html($("#slCountryPOL").html()); });
                //FillListFromObject(null, 2, "All Customers", "slCustomer", data[2], null);
                if (pDefaults.UnEditableCompanyName == "GBL")
                    CallGETFunctionWithParameters("/api/Customers/LoadAllWithMinimalColumns"
                        , { pWhereClauseWithMinimalColumns: "WHERE 1=1 ", pOrderBy: "Name" }
                        , function (pData) {
                            FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slCustomer", pData[0], null);
                            //Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(pData[0], "ID", "Name", '', TranslateString("SelectFromMenu"), "#hReadySlCustomers", null, "IsInactive", null);
                        }
                        , null);
                else
                    $("#slCustomer").html($("#hReadySlCustomers").html());
                //FillListFromObject(null, 2, "All Booking Parties", "slBookingParty", data[2], null);
                $("#slBookingParty").html($("#hReadySlCustomers").html());
                //GetListYears(null, null, "slYearsOperationStatistics", null,null);
                FillListFromObject(null, 1, "All Currencies", "slCurrency", data[3], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slOperationStages", data[4], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slShippingLine", data[5], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slVessel", data[6], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slTrackingStage", data[7], null);

                let CodeOrNameforslCommodities = 4;     // NameAndCode
                FillListFromObject(null, CodeOrNameforslCommodities, TranslateString("SelectFromMenu"), "slCommodity", data[8], null);
                $("#slCommodity").css({ "width": "100%" }).select2();
                $("#slCommodity").trigger("change");
                $("div[tabindex='-1']").removeAttr('tabindex');

                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slAgent", data[9], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slNetwork", data[10], null);
                // For Filter By Name 
                Fill_SelectInputAfterLoadData(data[10], "Name", "Name", TranslateString("SelectFromMenu"), "#slCustomerNetwork", null)


                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slMoveType", data[11], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slCustomsClearanceAgent", data[13], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slFilterTrucker", data[14], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slAirline", data[16], null);

                AllChargeTypes = JSON.parse(data[1]);
                FillDivWithCheckboxes_DynamicWithMultiFields("divCbBranches", data[1], "nameCbBranches", "Name", null);
                FillDivWithCheckboxes_DynamicWithMultiFields("divPOLs", data[20], "nameCbPOLs", "Name", null);
                FillDivWithCheckboxes_DynamicWithMultiFields("divPODs", data[20], "nameCbPODs", "Name", null);
                FillDivWithCheckboxes_DynamicWithMultiFields("divCAgent", data[9], "nameCbCAgent", "Name", null);
                FillDivWithCheckboxes_DynamicWithMultiFields("divUsers", data[4], "nameCbUsers", "Name", null);
                FillDivWithCheckboxes_DynamicWithMultiFields("divContainer", data[21], "nameCbContainer", "Name", null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slConsignee", data[18], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slShipper", data[19], null);


                $('#cbCheckAllContainer').click(function () {
                    $('#divContainer input:checkbox').prop('checked', this.checked);
                });

                $('#divContainer input[type=checkbox]').change(function () {
                    if ($('#divContainer input[type=checkbox]:checked').length == $('#divContainer input[type=checkbox]').length) {
                        $('#cbCheckAllContainer').prop('checked', true);
                    } else {
                        $('#cbCheckAllContainer').prop('checked', false);
                    }
                });

                $('#cbCheckAllUsers').click(function () {
                    $('#divUsers input:checkbox').prop('checked', this.checked);
                });

                $('#divUsers input[type=checkbox]').change(function () {
                    if ($('#divUsers input[type=checkbox]:checked').length == $('#divUsers input[type=checkbox]').length) {
                        $('#cbCheckAllUsers').prop('checked', true);
                    } else {
                        $('#cbCheckAllUsers').prop('checked', false);
                    }
                });


                $('#cbCheckAllBranches').click(function () {
                    $('#divCbBranches input:checkbox').prop('checked', this.checked);
                });

                $('#divCbBranches input[type=checkbox]').change(function () {
                    if ($('#divCbBranches input[type=checkbox]:checked').length == $('#divCbBranches input[type=checkbox]').length) {
                        $('#cbCheckAllBranches').prop('checked', true);
                    } else {
                        $('#cbCheckAllBranches').prop('checked', false);
                    }
                });
                $('#cbCheckAllAgents').click(function () {
                    $('#divCAgent input:checkbox').prop('checked', this.checked);
                });

                $('#divCAgent input[type=checkbox]').change(function () {
                    if ($('#divCAgent input[type=checkbox]:checked').length == $('#divCAgent input[type=checkbox]').length) {
                        $('#cbCheckAllAgents').prop('checked', true);
                    } else {
                        $('#cbCheckAllAgents').prop('checked', false);
                    }
                });

                $('#cbCheckAllPOLs').click(function () {
                    $('#divPOLs input:checkbox').prop('checked', this.checked);
                });

                $('#divPOLs input[type=checkbox]').change(function () {
                    if ($('#divPOLs input[type=checkbox]:checked').length == $('#divPOLs input[type=checkbox]').length) {
                        $('#cbCheckAllPOLs').prop('checked', true);
                    } else {
                        $('#cbCheckAllPOLs').prop('checked', false);
                    }
                });
                $('#cbCheckAllPODs').click(function () {
                    $('#divPODs input:checkbox').prop('checked', this.checked);
                });

                $('#divPODs input[type=checkbox]').change(function () {
                    if ($('#divPODs input[type=checkbox]:checked').length == $('#divPODs input[type=checkbox]').length) {
                        $('#cbCheckAllPODs').prop('checked', true);
                    } else {
                        $('#cbCheckAllPODs').prop('checked', false);
                    }
                });
                // CTruckers objCTruckers = new CTruckers();
                //    $("#txtToDate").val(_TodaysDate);
                $("#txtFromCloseDate").val(_TodaysDate);
                $("#txtToCloseDate").val(_TodaysDate);
            }
            , function () { FadePageCover(false); $("#hl-menu-Reports").parent().addClass("active"); }
        );
       
    });
}

function parseDate(dateStr) {
    const [day, month, year] = dateStr.split('/');
    return new Date(year, month - 1, day);
}


function OperationsStatistics_Print(pOutputTo, IsWithCurrenciesDetailed, IsWithChargesDetailed) {
    debugger;

    var ReportType = "";
    const fromDate = document.getElementById('txtFromDate').value;
    const toDate = document.getElementById('txtToDate').value;

    const fromYear = parseDate(fromDate).getFullYear();
    const toYear = parseDate(toDate).getFullYear();
    if (fromYear !== toYear) {
        swal("Both dates must be within the same year")

        return;
    }
     ($("#Report-Consolidation").hasClass('active') ? ReportType=1 : "");
     ($("#Report-Handling").hasClass('active') ? ReportType = 2 : "");
     ($("#Report-Co-Load").hasClass('active') ? ReportType = 3 : "");
     ($("#Report-Summary1").hasClass('active') ? ReportType = 4 : "");
     ($("#Report-Summary2").hasClass('active') ? ReportType = 5 : "");
     ($("#Report-OutStanding").hasClass('active') ? ReportType = 6 : "");
    ($("#Report-UnDeleveried").hasClass('active') ? ReportType = 7 : "");
    ($("#Report-OverallRec").hasClass('active') ? ReportType = 8 : "");
    ($("#Report-AgentProg").hasClass('active') ? ReportType = 9 : "");
    ($("#Report-AgentRecord").hasClass('active') ? ReportType = 10 : "");
    ($("#Report-AgentPerPort").hasClass('active') ? ReportType = 11 : "");
    ($("#Report-AgentPerPortProg").hasClass('active') ? ReportType = 12 : "");
    ($("#Report-POL").hasClass('active') ? ReportType = 13 : "");
    ($("#Report-POLProg").hasClass('active') ? ReportType = 14 : "");
    ($("#Report-POLProgALX").hasClass('active') ? ReportType = 15 : "");
    ($("#Report-POLProgPSD").hasClass('active') ? ReportType = 16 : "");
    ($("#Report-PortPerAgent").hasClass('active') ? ReportType = 17 : "");
    ($("#Report-EXPAgentRecord").hasClass('active') ? ReportType = 18 : "");
    ($("#Report-EXPAgentProg").hasClass('active') ? ReportType = 19 : "");
    ($("#Report-EXPPOD").hasClass('active') ? ReportType = 20 : "");
    ($("#Report-EXPPODPROG").hasClass('active') ? ReportType = 21 : "");

    debugger;
    if (IsWithChargesDetailed && chargeTypeIDs == "") {
        swal(strSorry, "Please select at least one Charge Type to Print Detailed Charges")
    } else if (IsWithChargesDetailed && !$("#cbReceivables").prop("checked") && !$("#cbPayables").prop("checked")) {
        swal(strSorry, "Please select Inv/Revenue or Payables/Cost to Print Detailed Charges")
    } else if (
        ($("#txtFromInvoiceDate").val().trim() == "" || isValidDate($("#txtFromInvoiceDate").val(), 1))
        && ($("#txtToInvoiceDate").val().trim() == "" || isValidDate($("#txtToInvoiceDate").val(), 1))
        && ($("#txtFromDate").val().trim() == "" || isValidDate($("#txtFromDate").val(), 1))
        && ($("#txtToDate").val().trim() == "" || isValidDate($("#txtToDate").val(), 1))
        && ($("#txtFromCloseDate").val().trim() == "" || isValidDate($("#txtFromCloseDate").val(), 1))
        && ($("#txtToCloseDate").val().trim() == "" || isValidDate($("#txtToCloseDate").val(), 1))
    ) {
        FadePageCover(true);
        var pWhereClause = OperationsStatistics_GetFilterWhereClause();
        ConsolidationHandlingCoLoadReportsPrint(pWhereClause, ReportType, pOutputTo);
        FadePageCover(false);

    }
    else
        swal(strSorry, "Please make sure that date format is dd/MM/yyyy.");
}
function OperationsStatistics_GetFilterWhereClause() {
    debugger;
    var ReportType = "";
    var pWhereClause = "Where 1=1";


    ($("#Report-Consolidation").hasClass('active') ? ReportType = 1 : "");
    ($("#Report-Handling").hasClass('active') ? ReportType = 2 : "");
    ($("#Report-Co-Load").hasClass('active') ? ReportType = 3 : "");
    ($("#Report-Summary1").hasClass('active') ? ReportType = 4 : "");
    ($("#Report-Summary2").hasClass('active') ? ReportType = 5 : "");
    ($("#Report-OutStanding").hasClass('active') ? ReportType = 6 : "");
    ($("#Report-UnDeleveried").hasClass('active') ? ReportType = 7 : "");
    ($("#Report-OverallRec").hasClass('active') ? ReportType = 8 : "");
    ($("#Report-AgentProg").hasClass('active') ? ReportType = 9 : "");
    ($("#Report-AgentRecord").hasClass('active') ? ReportType = 10 : "");
    ($("#Report-AgentPerPort").hasClass('active') ? ReportType = 11 : "");
    ($("#Report-AgentPerPortProg").hasClass('active') ? ReportType = 12 : "");
    ($("#Report-POL").hasClass('active') ? ReportType = 13 : "");
    ($("#Report-POLProg").hasClass('active') ? ReportType = 14 : "");
    ($("#Report-POLProgALX").hasClass('active') ? ReportType = 15 : "");
    ($("#Report-POLProgPSD").hasClass('active') ? ReportType = 16 : "");
    ($("#Report-PortPerAgent").hasClass('active') ? ReportType = 17 : "");
    ($("#Report-EXPAgentRecord").hasClass('active') ? ReportType = 18 : "");
    ($("#Report-EXPAgentProg").hasClass('active') ? ReportType = 19 : "");
    ($("#Report-EXPPOD").hasClass('active') ? ReportType = 20 : "");
    ($("#Report-EXPPODPROG").hasClass('active') ? ReportType = 21 : "");

    if (ReportType == 4  ) {
        pWhereClause = "Where 1=1 AND BLType=2 AND DirectionType = 1 AND ATAPODAlarmStatus = 1 ";
    }
    
    
    var pContainerIDList = GetAllSelectedIDsAsStringWithNameAttrReport("nameCbContainer");
    var pUserIDList = GetAllSelectedIDsAsStringWithNameAttrReport("nameCbUsers");
    var pBranchIDList = GetAllSelectedIDsAsStringWithNameAttrReport("nameCbBranches");
    var pAgentsIDList = GetAllSelectedIDsAsStringWithNameAttrReport("nameCbCAgent");
    var pPOLIDList = GetAllSelectedIDsAsStringWithNameAttrReport("nameCbPOLs");
    var pPODIDList = GetAllSelectedIDsAsStringWithNameAttrReport("nameCbPODs");

    var pTransportFilter = "";
    var pDirectionFilter = "";
    var pBLTypeFilter = "";
    var pShipmentypeFilter = "";


    if (ReportType != 4 && ReportType != 5 && ReportType != 6 && ReportType != 7) {
        pDirectionFilter += ($("#lbl-filter-import").hasClass('active') ? (pDirectionFilter == "" ? " (DirectionType = 1 " : " OR DirectionType = 1 ") : "");
        pDirectionFilter += ($("#lbl-filter-export").hasClass('active') ? (pDirectionFilter == "" ? " (DirectionType = 2 " : " OR DirectionType = 2 ") : "");
        pDirectionFilter += ($("#lbl-filter-domestic").hasClass('active') ? (pDirectionFilter == "" ? " (DirectionType = 3 " : " OR DirectionType = 3 ") : "");
        pDirectionFilter += ($("#lbl-filter-crossbooking").hasClass('active') ? (pDirectionFilter == "" ? " (DirectionType = 4 " : " OR DirectionType = 4 ") : "");
        pDirectionFilter += ($("#lbl-filter-reexport").hasClass('active') ? (pDirectionFilter == "" ? " (DirectionType = 5 " : " OR DirectionType = 4 ") : "");
        pDirectionFilter += (pDirectionFilter == "" ? "" : ") ");

        pTransportFilter += ($("#lbl-filter-ocean").hasClass('active') ? (pTransportFilter == "" ? " (TransportType = 1 " : " OR TransportType = 1 ") : "");
        pTransportFilter += ($("#lbl-filter-air").hasClass('active') ? (pTransportFilter == "" ? " (TransportType = 2 " : " OR TransportType = 2 ") : "");
        pTransportFilter += ($("#lbl-filter-inland").hasClass('active') ? (pTransportFilter == "" ? " (TransportType = 3 " : " OR TransportType = 3 ") : "");
        pTransportFilter += (pTransportFilter == "" ? "" : ") ");

        pBLTypeFilter += ($("#lbl-filter-direct").hasClass('active') ? (pBLTypeFilter == "" ? " (BLType = " + constDirectBLType : " OR BLType = " + constDirectBLType) : "");
        pBLTypeFilter += ($("#lbl-filter-house").hasClass('active') ? (pBLTypeFilter == "" ? " (BLType = " + constHouseBLType : " OR BLType = " + constHouseBLType) : "");
        pBLTypeFilter += ($("#lbl-filter-master").hasClass('active') ? (pBLTypeFilter == "" ? " (BLType = " + constMasterBLType : " OR BLType = " + constMasterBLType) : "");
        pBLTypeFilter += (pBLTypeFilter == "" ? "" : ") ");
        if (pDirectionFilter != "" && pTransportFilter == "")
            pWhereClause += " AND " + pDirectionFilter;
        else
            if (pDirectionFilter == "" && pTransportFilter != "")
                pWhereClause += " AND " + pTransportFilter;
            else
                if (pDirectionFilter != "" && pTransportFilter != "")
                    pWhereClause += " AND " + pDirectionFilter + " AND " + pTransportFilter;

        if (pBLTypeFilter != "" && ReportType != 10)
            pWhereClause += " AND " + pBLTypeFilter;
    }
    if (ReportType != 1 && ReportType != 2) {
        pShipmentypeFilter += ($("#lbl-filter-FCL").hasClass('active') ? (pShipmentypeFilter == "" ? " (ShipmentType = 1 " : " OR ShipmentType = 1 ") : "");
        pShipmentypeFilter += ($("#lbl-filter-LCL").hasClass('active') ? (pShipmentypeFilter == "" ? " (ShipmentType = 2 " : " OR ShipmentType = 2 ") : "");
        pShipmentypeFilter += ($("#lbl-filter-Consolidation").hasClass('active') ? (pShipmentypeFilter == "" ? " (ShipmentType = 5 " : " OR ShipmentType = 5 ") : "");
        pShipmentypeFilter += (pShipmentypeFilter == "" ? "" : ") ");
        if (pShipmentypeFilter !="")
        pWhereClause += " AND " + pShipmentypeFilter;
    }


    debugger;
    ($("#Report-Consolidation").hasClass('active') ? pWhereClause += " AND ShipmentType !=1 AND ShipmentType !=3 AND ShipmentType !=4 AND ShipmentType !=30 AND ShipmentType !=40 AND ShipmentType !=100"  : "");
    ($("#Report-Handling").hasClass('active') ? pWhereClause += " AND ShipmentType=1 " : "");
    //($("#Report-Co-Load").hasClass('active') ? pWhereClause += " AND ShipmentType=2 " : "");

    if ($("#slPC").val() != null && $("#slPC").val() != "")
        pWhereClause += " AND POrC = " + $("#slPC").val().trim().toUpperCase();

    if ($("#slFilterTrucker").val() != null && $("#slFilterTrucker").val() != "" )
        pWhereClause += " AND TruckerID = " + $("#slFilterTrucker").val().trim().toUpperCase();
    if ($("#txtFilterOperation").val().trim() != "" ) {
        pWhereClause += " AND (code like N'%" + $("#txtFilterOperation").val().trim().toUpperCase() + "%') ";
    }
    if ($("#slVessel").val().trim() != "") {
        pWhereClause += " AND (VesselID = " + $("#slVessel").val().trim().toUpperCase() + ") ";
    }
    if ($("#slCustomer").val().trim() != "") {
        //    pWhereClause += " AND (ConsigneeID = " + $("#slCustomer").val().trim().toUpperCase() + ") ";
        pWhereClause += " AND (NotifyID = " + $("#slCustomer").val().trim().toUpperCase() + ") ";
    }
    if (ReportType != 10 && ReportType != 11 && ReportType != 12) {
        if (isValidDate($("#txtFromDate").val().trim(), 1)) {
            if ($("#txtFromDate").val() != null && $("#txtFromDate").val() != "")
                pWhereClause += " AND OpenDate >='" + GetDateWithFormatyyyyMMdd($("#txtFromDate").val()) + " 00:00:00.000'";

        }
        else {
            if (ReportType != 5)
            pWhereClause += " AND OpenDate >='" + GetDateWithFormatyyyyMMdd('01/01/2025') + " 00:00:00.000'";

        }

        if (isValidDate($("#txtToDate").val().trim(), 1)) {
            if ($("#txtToDate").val() != null && $("#txtToDate").val() != "" )
                pWhereClause += " AND OpenDate <='" + GetDateWithFormatyyyyMMdd($("#txtToDate").val()) + " 23:59:50.999'";
        }
    }
    if (pBranchIDList!="") {
        pWhereClause += " AND BranchID in " + "("+pBranchIDList + ")" ;
    }
    if (pContainerIDList != "" && ReportType != 4) {
        pWhereClause += " AND ContainerTypeID in " + "(" + pContainerIDList + ")";
    }
    if (pAgentsIDList != "") {
        pWhereClause += " AND AgentID in " + "(" + pAgentsIDList + ")";
    }
    if (pPOLIDList != "") {
        pWhereClause += " AND POL in " + "(" + pPOLIDList + ")";
    }
    if (pPODIDList != "") {
        pWhereClause += " AND POD in " + "(" + pPODIDList + ")";
    }
    if (pUserIDList != "") {
        pWhereClause += " AND OperationStageID in " + "(" + pUserIDList +")";
    }
    debugger;
    pWhereClause = (pWhereClause == "" ? " WHERE (1=1) " : pWhereClause) ;
    return pWhereClause;
}
function OperationsStatistics_ClearAllOperations() {
    debugger;
    $('input[name="cbAddedItemID"]').prop("checked", false);
}

function GetDateWithFormatdd_MM_yyyy(pDate) {
    const [day, month, year] = pDate.split('/');
    return `${year}-${month}-${day}`;
}

function ClearAllFilters() {
    $("#slBranch").val("");
    $("#slCreator").val("");
    $("#slOperationMan").val("");
    $("#slCustomer").val("");
    $("#slCountryPOL").val("").trigger("change");
    $("#slPOL").val("");
    $("#slCountryPOD").val("").trigger("change");
    $("#slPOD").val("");
    $("#slAgent").val("");
    $("#slBookingParty").val("");
    $("#slCustomsClearanceAgent").val("");
    $("#txtInvoiceNumbers").val("");
    $("#txtCustomerReference").val("");
    $("#txtPONumber").val("");
    $("#txtSupplierReference").val("");
    $("#txtMasterBL").val("");
    $("#slCommodity").val("").trigger("change");
    $("#slShippingLine").val("");
    $("#slAirline").val("");
    $("#slVessel").val("");
    $("#txtVoyageOrTruckNumber").val("");
    $("#txtBookingNumbers").val("");
    $("#slMoveType").val("");
    $("#slNetwork").val("");
    $("#slCustomerNetwork").val(0);
    $("#slTrackingStage").val("");
    $("#slTrackingStageStatus").val("");
    $("#slTaskCreator").val("");
    $("#txtCertificateNumber").val("");
    $("#txtQasimaNumber").val("");
    $("#cbIsClearanceTask").prop("checked", false);
    $("#txtTankOrFlexiNumber").val("");
    $("#slOperationStages").val("");
    $("#slShipmentType").val("");
    $("#txtGrossWeight").val("");
    $("#slFilterTrucker").val("");
    $("#slCC_ClearanceType").val("");
    $("#txtFilterOperation").val("");
    $("#txtForm13Number").val("");
    $("#txtFromDate_ETD").val("");
    $("#txtToDate_ETD").val("");
    $("#txtFromDate_ETA").val("");
    $("#txtToDate_ETA").val("");
    $("#divCbBranches input[name='nameCbChargesTypes']").prop("checked", false);
    $("#cbCheckAllChargesTypes").prop("checked", false);
}

function GetAllSelectedIDsAsStringWithNameAttrReport(pCheckboxNameAttr) {
    //debugger;
    var listOfIDs = "";
    $('input[name="' + pCheckboxNameAttr + '"]:checked').each(function () {
        listOfIDs += ((listOfIDs == "") ? "" : "-") + ($(this).attr('value'));
    });
    return listOfIDs;
}


function ExpandDashSeparatedInLists(pWhereClause) {
    return pWhereClause.replace(/([\w.]+)\s+in\s+\(([\d-]+)\)/gi, function (pMatch, pColumn, pIDs) {
        var IDs = pIDs.split("-").filter(function (pID) { return pID !== ""; });
        if (IDs.length == 0)
            return pMatch;
        return "(" + IDs.map(function (pID) { return pColumn + "=" + pID; }).join(" OR ") + ")";
    });
}

function OpenDateRangeCondition(pFromDate, pToDate) {
    var Condition = "";
    Condition += " AND OpenDate >='" + (isValidDate(pFromDate.trim(), 1) ? GetDateWithFormatyyyyMMdd(pFromDate) : GetDateWithFormatyyyyMMdd('01/01/2025')) + " 00:00:00.000'";
    if (isValidDate(pToDate.trim(), 1))
        Condition += " AND OpenDate <='" + GetDateWithFormatyyyyMMdd(pToDate) + " 23:59:50.999'";
    return Condition;
}

function ConsolidationHandlingCoLoadReportsPrint(WhereClause, ReportType, OutputTo) {
    debugger;
    var query;
    var ReportType = ReportType;
    var arr_Keys = new Array();
    var arr_Values = new Array();
    arr_Keys.push("Type");
    arr_Values.push(ReportType);
    var ReportName = "";
    var Title = "";

    var FromDate = $("#txtFromDate").val();
    var fromDateParts = FromDate.split('/');
    if (fromDateParts.length === 3) {
        var day = fromDateParts[0];
        var month = fromDateParts[1];
        var year = fromDateParts[2];
        FromDate = month + '/' + day + '/' + year; // Convert to MM/DD/YYYY
    }

    arr_Keys.push("FromDate");
    arr_Values.push(FromDate);
    var ToDate = $("#txtToDate").val();
    var toDateParts = ToDate.split('/');
    if (toDateParts.length === 3) {
        var toDay = toDateParts[0];
        var toMonth = toDateParts[1];
        var toYear = toDateParts[2];
        ToDate = toMonth + '/' + toDay + '/' + toYear; // Convert to MM/DD/YYYY
    }
    arr_Keys.push("ToDate");
    arr_Values.push(ToDate);

    if (ReportType == 1) {
        ReportName = "Rep_ConsolidationReport";
        Title = "ConsolidationReport";
        query = `SELECT * from vwOperationsUNFReports ${WhereClause}`

    } else if (ReportType == 2) {
        ReportName = "Rep_HandlingReport";
        Title = "HandlingReport";
        query = `SELECT * from vwOperationsUNFReports ${WhereClause}`

    } else if (ReportType == 3) {
        ReportName = "Rep_ColoadReport";
        Title = "Co-LoadReport";
        query = `SELECT * from vwOperationsUNFReports ${WhereClause}`

    } else if (ReportType == 4) {
        ReportName = "Rep_Summary_One";
        Title = "Rep_Summary1";
        query = `SELECT * from vwOperationsUNFReports ${WhereClause}`

    }
    else if (ReportType == 5) {
        const now = new Date();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const year = now.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        if (isValidDate($("#txtFromDate").val().trim(), 1)) {
            var FromDateForDB = GetDateWithFormatyyyyMMdd($("#txtFromDate").val()) + " 00:00:00.000";
        } else {
            var FromDateForDB = GetDateWithFormatyyyyMMdd('1/1/2025') + " 00:00:00.000";
        }
        arr_Keys.push("FromDateForDB");
        arr_Values.push(FromDateForDB);
        if (isValidDate($("#txtToDate").val().trim(), 1)) {
            var ToDateForDB = GetDateWithFormatyyyyMMdd($("#txtToDate").val()) + " 23:59:50.999";
        } else {
            var ToDateForDB = GetDateWithFormatyyyyMMdd(formattedDate) + " 00:00:00.000";
        }
        arr_Keys.push("ToDateForDB");
        arr_Values.push(ToDateForDB);

        var FromDateTwoForDB = isValidDate($("#txtFromDateTwo").val().trim(), 1) ? GetDateWithFormatyyyyMMdd($("#txtFromDateTwo").val()) + " 00:00:00.000" : "";
        arr_Keys.push("FromDateTwoForDB");
        arr_Values.push(FromDateTwoForDB);

        var ToDateTwoForDB = isValidDate($("#txtToDateTwo").val().trim(), 1) ? GetDateWithFormatyyyyMMdd($("#txtToDateTwo").val()) + " 23:59:50.999" : "";
        arr_Keys.push("ToDateTwoForDB");
        arr_Values.push(ToDateTwoForDB);

        var NotifyIDFilter = ($("#slCustomer").val() == null || $("#slCustomer").val().trim() == "") ? "0" : $("#slCustomer").val().trim();
        arr_Keys.push("NotifyIDFilter");
        arr_Values.push(NotifyIDFilter);
        var OperationStageIDFilter = ($("#slOperationStages").val() == null || $("#slOperationStages").val().trim() == "") ? "0" : $("#slOperationStages").val().trim();
        arr_Keys.push("OperationStageIDFilter");
        arr_Values.push(OperationStageIDFilter);

        arr_Keys.push("FromOpenDateOne");
        arr_Values.push($("#txtFromDate").val());
        arr_Keys.push("ToOpenDateOne");
        arr_Values.push($("#txtToDate").val());
        arr_Keys.push("FromOpenDateTwo");
        arr_Values.push($("#txtFromDateTwo").val());
        arr_Keys.push("ToOpenDateTwo");
        arr_Values.push($("#txtToDateTwo").val());

        ReportName = "Rep_Summary_Two";
        Title = "Rep_Summary2";
    }
    else if (ReportType == 6) {
        ReportName = "Rep_Out_Standing";
        Title = "Rep_OutStanding";
        query = `select * from vwOperationsUNFReportsOutStanding ${WhereClause} And BLType=2 And  ReleaseDate is null`
        //query = `select * from vwOperationsUNFReportsOutStanding ${WhereClause} And BLType=2 And ID in (select HouseBillID from vwWH_CFS_ReleaseOrders  where ReleasingDate is null)`
        //query = `select * from vwOperationsUNFReportsOutStanding ${WhereClause} And BLType=2 And ID not in (select operationid from OperationDocPrintLog where  DocumentTypeID =120)`


    }
    else if (ReportType == 7) {
        ReportName = "Rep_UnDelevry_Cargo";
        Title = "Rep_UnDelevry_Cargo";
      /*  query = `select * from vwOperationsUNFReports ${WhereClause} And BLType=2 And ID in (select operationid from OperationDocPrintLog where  DocumentTypeID =120 And OperationID in (select HouseBillID from vwWH_CFS_ReleaseOrders  where ReleasingDate is null And  HouseBillID in (select OperationID from vwinvoices where  InvoiceTypeName like '%THC%' And (InvoiceTypeID=56  or InvoiceTypeID=14) And PaymentDate is not null))) `*/

        query = `select * from vwOperationsUNFReports ${WhereClause} And  BLType=2 And ID in (select OperationID from vwinvoices where InvoiceTypeName like '%THC%' And (InvoiceTypeID=56 or InvoiceTypeID=14) And PaymentDate is null And IsDeleted=0 ) `
    }
    else if (ReportType == 8) {
        ReportName = "Rep_OverallRecReport";
        Title = "OverallRecImportReport";
        var fromYear = fromDateParts[2];
        var toYear = toDateParts[2];
        WhereClause += `AND YEAR(CreationDate) BETWEEN ${fromYear} AND ${toYear} AND PODName IS NOT NULL `
        query = `SELECT * from vwOperationsUNFReports ${WhereClause}`

    }
    else if (ReportType == 9) {
        ReportName = "Rep_AgentProgReport";
        Title = "AgentProgReport";
        WhereClause += ` AND AgentName IS NOT NULL `
        query = `SELECT * from vwOperationsUNFReports ${WhereClause}`
    }
    //else if (ReportType == 10) {
    //    ReportName = "Rep_AgentRecordReport";
    //    Title = "AgentRecordReport";
    //    WhereClause += ` AND AgentName IS NOT NULL `
    //    query = `SELECT * from vwOperationsUNFReports ${WhereClause}`
        //}
    else if (ReportType == 10) {
        ReportName = "Rep_AgentRecordReport";
        Title = "AgentRecordReport";

        function formatDate(dateStr) {
            if (!dateStr) return null;
            const [day, month, year] = dateStr.split('/');
            return `${year}${month}${day}`;
        }

        var FromOpenDateOne = $("#txtFromDate").val();
        var ToOpenDateOne = $("#txtToDate").val();
        var FromOpenDateTwo = $("#txtFromDateTwo").val();
        var ToOpenDateTwo = $("#txtToDateTwo").val();

        const from1 = formatDate(FromOpenDateOne);
        const to1 = formatDate(ToOpenDateOne);
        const from2 = formatDate(FromOpenDateTwo);
        const to2 = formatDate(ToOpenDateTwo);

        var baseWhere = WhereClause + " AND (BLType = 3) AND AgentName IS NOT NULL";

        WhereClause = `${baseWhere} AND OpenDate >= '${from1} 00:00:00.000' AND OpenDate <= '${to1} 23:59:50.999'`;
        WhereClause2 = (from2 && to2)
            ? `${baseWhere} AND OpenDate >= '${from2} 00:00:00.000' AND OpenDate <= '${to2} 23:59:50.999'`
            : '';
        query = `SELECT * from vwOperationsUNFReports ${WhereClause}`
        arr_Keys.push("WhereClause2");
        arr_Values.push(WhereClause2);
        arr_Keys.push("FromOpenDateTwo");
        arr_Values.push(FromOpenDateTwo);
        arr_Keys.push("ToOpenDateTwo");
        arr_Values.push(ToOpenDateTwo);

        arr_Keys.push("FromOpenDateOne");
        arr_Values.push(FromOpenDateOne);
        arr_Keys.push("ToOpenDateOne");
        arr_Values.push(ToOpenDateOne);
    }
    else if (ReportType == 11) {
        ReportName = "Rep_AgentPerPortReport";
        Title = "AgentPerPortReport";

        var FromOpenDateOne = $("#txtFromDate").val();
        var ToOpenDateOne = $("#txtToDate").val();
        var FromOpenDateTwo = $("#txtFromDateTwo").val();
        var ToOpenDateTwo = $("#txtToDateTwo").val();

        var baseWhere = ExpandDashSeparatedInLists(WhereClause) + " AND AgentName IS NOT NULL";

        WhereClause = baseWhere + OpenDateRangeCondition(FromOpenDateOne, ToOpenDateOne);
        WhereClause2 = (isValidDate(FromOpenDateTwo.trim(), 1) && isValidDate(ToOpenDateTwo.trim(), 1))
            ? baseWhere + OpenDateRangeCondition(FromOpenDateTwo, ToOpenDateTwo)
            : '';

        query = `SELECT * from vwOperationsUNFReports ${WhereClause}`

        arr_Keys.push("WhereClause2");
        arr_Values.push(WhereClause2);
        arr_Keys.push("FromOpenDateOne");
        arr_Values.push(FromOpenDateOne);
        arr_Keys.push("ToOpenDateOne");
        arr_Values.push(ToOpenDateOne);
        arr_Keys.push("FromOpenDateTwo");
        arr_Values.push(FromOpenDateTwo);
        arr_Keys.push("ToOpenDateTwo");
        arr_Values.push(ToOpenDateTwo);
    }
    else if (ReportType == 12) {
        ReportName = "Rep_AgentPerPortProgReport";
        Title = "AgentPerPortProgReport";

        var FromOpenDateOne = $("#txtFromDate").val();
        var ToOpenDateOne = $("#txtToDate").val();
        var FromOpenDateTwo = $("#txtFromDateTwo").val();
        var ToOpenDateTwo = $("#txtToDateTwo").val();

        var baseWhere = ExpandDashSeparatedInLists(WhereClause) + " AND AgentName IS NOT NULL";

        WhereClause = baseWhere + OpenDateRangeCondition(FromOpenDateOne, ToOpenDateOne);
        WhereClause2 = (isValidDate(FromOpenDateTwo.trim(), 1) && isValidDate(ToOpenDateTwo.trim(), 1))
            ? baseWhere + OpenDateRangeCondition(FromOpenDateTwo, ToOpenDateTwo)
            : '';

        query = `SELECT * from vwOperationsUNFReports ${WhereClause}`

        arr_Keys.push("WhereClause2");
        arr_Values.push(WhereClause2);
        arr_Keys.push("FromOpenDateOne");
        arr_Values.push(FromOpenDateOne);
        arr_Keys.push("ToOpenDateOne");
        arr_Values.push(ToOpenDateOne);
        arr_Keys.push("FromOpenDateTwo");
        arr_Values.push(FromOpenDateTwo);
        arr_Keys.push("ToOpenDateTwo");
        arr_Values.push(ToOpenDateTwo);
    }
    else if (ReportType == 13) {
        ReportName = "Rep_POLReport";
        Title = "POLReport";
        WhereClause += ` AND POLName IS NOT NULL `
        query = `SELECT * from vwOperationsUNFReports ${WhereClause}`
    }
    else if (ReportType == 14) {
        ReportName = "Rep_POLProgReport";
        Title = "POLProgReport";
        WhereClause += ` AND POLName IS NOT NULL `
        query = `SELECT * from vwOperationsUNFReports ${WhereClause}`
    }
    else if (ReportType == 15) {
        ReportName = "Rep_POLProgReport";
        Title = "POLProgALXReport";
        WhereClause += ` AND (POLName = 'ALEXANDRIA' OR POLName = 'DEKHEILA') `
        query = `SELECT * from vwOperationsUNFReports ${WhereClause}`
    }
    else if (ReportType == 16) {
        ReportName = "Rep_POLProgReport";
        Title = "POLProgPSDReport";
        WhereClause += ` AND POLName = 'PORT SAID' `
        query = `SELECT * from vwOperationsUNFReports ${WhereClause}`
    }
    else if (ReportType == 17) {
        ReportName = "Rep_PortPerAgentReport";
        Title = "PortPerAgentReport";
        WhereClause += ` AND POLName IS NOT NULL AND AgentName IS NOT NULL `
        query = `SELECT * from vwOperationsUNFReports ${WhereClause}`
    }
    else if (ReportType == 18) {
        ReportName = "Rep_EXPAgentRecordReport";
        Title = "EXPAgentRecordReport";
        WhereClause += ` AND AgentName IS NOT NULL `
        query = `SELECT * from vwOperationsUNFReports ${WhereClause}`
    }
    else if (ReportType == 19) {
        ReportName = "Rep_EXPAgentProgReport";
        Title = "EXPAgentProgReport";
        WhereClause += ` AND AgentName IS NOT NULL `
        query = `SELECT * from vwOperationsUNFReports ${WhereClause}`
    }
    else if (ReportType == 20) {
        ReportName = "Rep_EXPPOD_UNI";
        Title = "EXPPODReport";
        WhereClause += ` AND PODName IS NOT NULL `
        query = `SELECT * from vwOperationsUNFReports ${WhereClause}`
    }
    else if (ReportType == 21) {
        ReportName = "REP_PODPROG_UNI";
        Title = "EXPPODPROGReport";
        WhereClause += ` AND PODName IS NOT NULL `
        query = `SELECT * from vwOperationsUNFReports ${WhereClause}`
    }
    //query = `SELECT * from vwOperationsUNFReports ${WhereClause}`

    arr_Keys.push("query");
    arr_Values.push(query);
    arr_Keys.push("WhereClause");
    arr_Values.push(WhereClause);
    var pParametersWithValues =
    {
        arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: Title
        , pReportName: ReportName
        , pReportType: OutputTo
    };
    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintReportQueryAndParams?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '&pReportName=' + pParametersWithValues.pReportName + '' + '&pReportType=' + pParametersWithValues.pReportType + '';

    win.location = url;

}