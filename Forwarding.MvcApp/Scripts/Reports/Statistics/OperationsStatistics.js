//1: Excel File
//2: Excel File Without Formatting
//3: PDF File
//4: Rich Text Format Document
//5: Word Document

var AllChargeTypes;

function OperationsStatistics_Initialize() {
    debugger;
    LoadView("/Reports/OperationsStatistics", "div-content", function () {
        var _TodaysDate = getTodaysDateInddMMyyyyFormat();
        $('#slCustomer,#slCountryPOL,#slPOL,#slCountryPOD,#slPOD,#slBookingParty').css({ 'width': '100%' }).select2();
        if (glbCallingControl == "OperationsStatistics") {
            $("#liFormName").text("Operations Statistics");
            //$("#liTabName").attr("onclick", "LoadViews('Invoicing')");
            $(".classShowForOperationsStatistics").removeClass("hide");
            if (pDefaults.UnEditableCompanyName == "NIL") {
                
                $(".classShowForNIL").removeClass("hide");
                $('#cbPOValue').prop('checked', true);
                $('#cbForm13Number').prop('checked', true);
                $('#cbCertificateNumber').prop('checked', true);
                $('#cbMoveTypeName').prop('checked', true);
                $('#cbShipmentType').prop('checked', true);
                $('#cbOperationMan').prop('checked', true);
                $('#cbAllTask').prop('checked', true);
                $('#cbFreeTime').prop('checked', true);
                $('#cbDaysFromOpeningCertificate').prop('checked', true);
                $('#cbDaysFromOpeningFile').prop('checked', true);
                $('#cbMBL').prop('checked', false);
                $('#cbInvoices').prop('checked', false);
                $('#cbCreator').prop('checked', false);
                $('#cbIssueDate').prop('checked', false);
                $('#cbContainerTypes').prop('checked', false);
                $('#cbTrucker').prop('checked', false);
                $('#cbTEUs').prop('checked', false);
                $('#cbCarrier').prop('checked', false);
            }
         

            if (pDefaults.UnEditableCompanyName == "BED")
                $(".classShowForBED").removeClass("hide");

            if (["OCE", "CHM"].includes(pDefaults.UnEditableCompanyName)) {
                $(".classShowForTR").removeClass("hide");
            }
            if (pDefaults.UnEditableCompanyName == "AKS") {
                $("#txtForm13Number").parent().addClass("hide");
                $("#cbForm13Number").parent().parent().addClass("hide");
                $("#cbForm13Date").parent().parent().addClass("hide");
                $("#cbACIDNo").parent().parent().addClass("hide");
            } else if (pDefaults.UnEditableCompanyName == "NAJ") {
                $(".classHideForNAJ").addClass("hide");
                $("#txtFromDate_ETD").prev().text("SI From");
                $("#txtToDate_ETD").prev().text("SI To");
                $("#cbETDPOL").next().text("SI Date");

            }
            if (pDefaults.UnEditableCompanyName == "EVL") {
                $('.showForEVL').removeClass('hide');
            } else {
                $('.showForEVL').addClass('hide');
            }

            if (pDefaults.UnEditableCompanyName == "UNF") {
                $(".classHideForUni").addClass("hide");
                $(".classShowForUni").removeClass("hide");

            }

            if (pLoggedUser.IsSalesman == true && pLoggedUser.IsHideOthersRecords == true)
                $(".classShowForUnSalemen").addClass("hide");
            else
                $(".classShowForUnSalemen").removeClass("hide");
            //if (pDefaults.UnEditableCompanyName != "MED")
                $("#txtFromDate").val(_TodaysDate);
        }
        else { //BLStatistics
            $("#txtFromDate").val("01/01/2020");
            $("#liFormName").text("HBLs Statistics");
            //$("#liTabName").attr("onclick", "LoadViews('Warehousing')");
            $(".classShowForBLStatistics").removeClass("hide");
            $("#slNotify").html($("#hReadySlCustomers").html());
        }
        if (pDefaults.UnEditableCompanyName == "HOR") {
            $("#cbIncoterm").prop("checked", true);
        }
        if (pDefaults.UnEditableCompanyName == "NIL") {
            $('.showForNIL').removeClass('hide');
            $('.hideForNIL').addClass('hide');
        }
        if (pDefaults.UnEditableCompanyName == "GSL") {
            $("#cbPODate").parent().contents().filter(function () { return this.nodeType === 3; }).replaceWith("Loading Date");
        }
        if (pDefaults.UnEditableCompanyName == "MED") {
            SetSelectedColumns(false);
            $("#cbClient").prop("checked", true);
            $("#cbShipper").prop("checked", true);
            $("#cbConsignee").prop("checked", true);
            $("#cbLine").prop("checked", true);
            $("#cbCommodity").prop("checked", true);

            $("#cbContainerTypes").prop("checked", true);
            $("#cbPackages").prop("checked", true);
            $("#cbInvoices").prop("checked", true);
            $("#cbMBL").prop("checked", true);
            $("#cbPOL").prop("checked", true);

            $("#cbPOD").prop("checked", true);
            $("#cbATDPOL").prop("checked", true);
            $("#cbATAPOD").prop("checked", true);
            $("#cbShipmentType").prop("checked", true);
            $("#cbACIDNo").prop("checked", true);

            $("#cbReceivingDate").prop("checked", true);
            $("#cbDODate").prop("checked", true);
            $("#cbFreeTime").prop("checked", true);
            $("#cbNotes2").prop("checked", true);
            $("#divslConsignee").removeClass("hide");
            $("#divslShipper").removeClass("hide");
            $(".classShowForMED").removeClass("hide");
        }
        if (IsMESCOCompany) {
            $(".classShowForMesco").removeClass("hide");
        }
        if (pDefaults.UnEditableCompanyName == "MAN") {
            SetSelectedColumns(false);
            $("#cbClient").prop("checked", true);
            $("#cbInvoices").prop("checked", true);
            $("#cbInvoiceDate").prop("checked", true);
            $("#cbPOL").prop("checked", true);
            $("#cbPOD").prop("checked", true);
            $("#cbETDPOL").prop("checked", true);
            $("#cbATDPOL").prop("checked", true);
            $("#cbETAPOD").prop("checked", true);
            $("#cbATAPOD").prop("checked", true);
            $("#cbOperationMan").prop("checked", true);
        }
        if (pDefaults.UnEditableCompanyName == "COS") {
            $(".classShowForCOS").removeClass("hide");
        }
        if (pDefaults.UnEditableCompanyName == "UNV") {
            SetSelectedColumns(false);

            $(".classShowForUNV").removeClass("hide");
            $("#cbCCADocumentReceiveDate").prop("checked", true);
            $("#cbNetwork").prop("checked", true);
            $("#cbDescriptionOfGoods").prop("checked", true);
            $("#cbIssueDate").prop("checked", true);
            $("#cbConsignee").prop("checked", true);
            $("#cbContainerTypes").prop("checked", true);
            $("#cbPackages").prop("checked", true);
            $("#cbPONo").prop("checked", true);
            $("#cbCarrier").prop("checked", true);
            $("#cbMBL").prop("checked", true);
            $("#cbHBL").prop("checked", true);
            $("#cbGrossWeightSum").prop("checked", true);
            $("#cbCertificateNumber").prop("checked", true);
            $("#cbQasimaDate").prop("checked", true);
            $("#cbFreeTime").prop("checked", true);
            $("#cbNotes2").prop("checked", true);

            $("#cbIsNotHaveSpendDate").parent().removeClass("hide");
        }
        if (pDefaults.UnEditableCompanyName == "ELI") {
            $(".classShowForELI").removeClass("hide");
        }
        if (pDefaults.UnEditableCompanyName != "MED") {
            $(".Form13").removeClass("hide");
        }
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

        CallGETFunctionWithParameters("/api/OperationsStatistics/GetOperationsStatisticsFilter", null
            , function (data) {
                //data[0]:Users //data[1]:Branches //data[2]:Customers //data[3]:Currencies //data[4]:Oper.States
                debugger;
                //FillListFromObject(pID, pCodeOrName/*1-Code 2-Name*/, pStrFirstRow, pSlName, pData, callback)

                var _Salesmentemp = JSON.parse(data[0]);
                var pSalesmen = jQuery.grep(_Salesmentemp, function (_Salesmentemp) {
                    return _Salesmentemp.IsSalesman == true;
                });

                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slSalesman", JSON.stringify(pSalesmen), function () {
                    if (pDefaults.UnEditableCompanyName == "ATL" && pLoggedUser.IsHideOthersRecords == true) {
                        $("#slSalesman").prop("disabled",true);
                        $("#slSalesman").val(pLoggedUser.ID);

                    }
                });
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

                AllChargeTypes = JSON.parse(data[17]);
                FillDivWithCheckboxes_DynamicWithMultiFields("divCbChargesTypes", data[17], "nameCbChargesTypes", "Name", null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slConsignee", data[18], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slShipper", data[19], null);

                


                $('#cbCheckAllChargesTypes').click(function () {
                    $('#divCbChargesTypes input:checkbox').prop('checked', this.checked);
                });

                $('#divCbChargesTypes input[type=checkbox]').change(function () {
                    if ($('#divCbChargesTypes input[type=checkbox]:checked').length == $('#divCbChargesTypes input[type=checkbox]').length) {
                        $('#cbCheckAllChargesTypes').prop('checked', true);
                    } else {
                        $('#cbCheckAllChargesTypes').prop('checked', false);
                    }
                });



                // CTruckers objCTruckers = new CTruckers();
                if (pDefaults.UnEditableCompanyName != "MED")
                    $("#txtToDate").val(_TodaysDate);
                $("#txtFromCloseDate").val(_TodaysDate);
                $("#txtToCloseDate").val(_TodaysDate);
                $("#txtFromDateSelectOperations").val(_TodaysDate);
                $("#txtToDateSelectOperations").val(_TodaysDate);
                $("#txtFromInvoiceDate").val(_TodaysDate);
                $("#txtToInvoiceDate").val(_TodaysDate);
            }
            , function () { FadePageCover(false); $("#hl-menu-Reports").parent().addClass("active"); }
        );
        if (pDefaults.UnEditableCompanyName == "KDM")
            $("#spanKDMReference").text("Ref.No.");
        else if (pDefaults.UnEditableCompanyName == "GLS")
            $("#spanCbPODate").text("Storing Date");
        else if (pDefaults.UnEditableCompanyName == "NIL") {
            $("#spanKDMReference").text("File Selling Closing Date");
            $("#spanSupplierRef").text("Customs Closing Date");
            $("#spanForm13").text("Freight Operation Man");
        }
    });
}
function OperationsStatistics_Print(pOutputTo, IsWithCurrenciesDetailed, IsWithChargesDetailed) {
    debugger;

    let chargeTypeIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbChargesTypes");
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
        var SelectedColumns = OperationsStatistics_GetSelectedColumns();

        //if ($('#ulReportTypes .active').val() == 0)
        //    swal(strSorry, "Please, Select a report type.");
        //else {

        var pWhereClauseForOperationsTable = " WHERE OpenDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromDate").val()) + " 00:00:00.000'";
        pWhereClauseForOperationsTable += " AND OpenDate <= '" + GetDateWithFormatyyyyMMdd($("#txtToDate").val()) + " 23:59:50.999'";

        var pParametersWithValues = {
            pWhereClause: pWhereClause
            , pWhereClauseForOperationsTable: pWhereClauseForOperationsTable
            //, pIsFilterInvoices: $("#cbFilterInvoices").prop("checked")
            //, pFromInvoiceDate: GetDateWithFormatyyyyMMdd($("#txtFromInvoiceDate").val().trim())
            //, pToInvoiceDate: GetDateWithFormatyyyyMMdd($("#txtToInvoiceDate").val().trim()) + " 23:59:59"
            , pIsWithCurrenciesDetailed: IsWithCurrenciesDetailed
            , pIsWithChargesDetailed: IsWithChargesDetailed
            , pIsAllChargeTypesChecked: $("#cbCheckAllChargesTypes").prop("checked")
            , pSelectedChargeTypes: chargeTypeIDs

            , pSelectedColumns: SelectedColumns

            , pFromOpenDate: GetDateWithFormatMM_dd_yyyy($("#txtFromDate").val().trim())
            , pToOpenDate: GetDateWithFormatMM_dd_yyyy($("#txtToDate").val().trim())

            , pFromCloseDate: $("#slOperationStages option:selected").text() == "CLOSED" ? GetDateWithFormatMM_dd_yyyy($("#txtFromCloseDate").val().trim()) : ""
            , pToCloseDate: $("#slOperationStages option:selected").text() == "CLOSED" ? GetDateWithFormatMM_dd_yyyy($("#txtToCloseDate").val().trim()) : ""

            , pOperationManID: $("#slOperationMan").val()
            , pShippingLineID: $("#slShippingLine").val()
            , pAirlineID: $("#slAirline").val()
            , pVesselID: $("#slVessel").val()

            , pTrackingStageID: $("#slTrackingStage").val()
            , pIsTaskDone: $("#slTrackingStageStatus").val()
            , pIsClearanceTask: $("#cbIsClearanceTask").prop("checked")

            , pFromDate_ETD: (isValidDate($("#txtFromDate_ETD").val().trim(), 1) && $("#txtFromDate_ETD").val().trim() != "" && !$("#cbFilterInvoices").prop("checked"))
                ? GetDateWithFormatMM_dd_yyyy($("#txtFromDate_ETD").val().trim()) : ""
            , pToDate_ETD: (isValidDate($("#txtToDate_ETD").val().trim(), 1) && $("#txtToDate_ETD").val().trim() != "" && !$("#cbFilterInvoices").prop("checked"))
                ? GetDateWithFormatMM_dd_yyyy($("#txtToDate_ETD").val().trim()) : ""
            , pFromDate_ETA: (isValidDate($("#txtFromDate_ETA").val().trim(), 1) && $("#txtFromDate_ETA").val().trim() != "" && !$("#cbFilterInvoices").prop("checked"))
                ? GetDateWithFormatMM_dd_yyyy($("#txtFromDate_ETA").val().trim()) : ""
            , pToDate_ETA: (isValidDate($("#txtToDate_ETA").val().trim(), 1) && $("#txtToDate_ETA").val().trim() != "" && !$("#cbFilterInvoices").prop("checked"))
                ? GetDateWithFormatMM_dd_yyyy($("#txtToDate_ETA").val().trim()) : ""
            ,pDocInfo:$('#cbDocInfo').prop('checked')
            //, pDirectionType: ($("#lbl-filter-import").hasClass('active') ? "Import"
            //    : $("#lbl-filter-export").hasClass('active') ? "Export"
            //    : $("#lbl-filter-domestic").hasClass('active') ? "Domestic"
            //    : "ALL")
            //, pTransPortType: ($("#lbl-filter-ocean").hasClass('active') ? "Ocean"
            //    : $("#lbl-filter-air").hasClass('active') ? "Air"
            //    : $("#lbl-filter-inland").hasClass('active') ? "Inland"
            //    : "ALL")
        };
        if (["OCE", "CHM"].includes(pDefaults.UnEditableCompanyName)) {
            pParametersWithValues.ApprovalFilter = $("#slApprovalStatus").val();
        }
        CallGETFunctionWithParameters("/api/OperationsStatistics/LoadData"
            , pParametersWithValues
            , function (data) {
                if (data[0]) //pRecordsExist
                {
                    if (glbCallingControl == "BLStatistics")
                        BLStatistics_DrawReport(data, pOutputTo);
                    else if ($("#cbIsWorkFlow").prop("checked"))
                        OperationsStatistics_WorkFlow_DrawReport(data, pOutputTo);
                    else if (pDefaults.UnEditableCompanyName == "NIL")
                        OperationsStatistics_DrawReport_NIL(data, pOutputTo, IsWithCurrenciesDetailed, IsWithChargesDetailed);
                    else
                        OperationsStatistics_DrawReport(data, pOutputTo, IsWithCurrenciesDetailed, IsWithChargesDetailed);
                }
                else
                    swal(strSorry, "Please, No records exist for that search criteria.");
                FadePageCover(false);
            });
        //}
    }
    else
        swal(strSorry, "Please make sure that date format is dd/MM/yyyy.");
}
function OperationsStatistics_GetSelectedColumns() {
    debugger;
    var SelectedColumns = "ID,Code,OpenDate,CloseDate,IncotermID,IncotermName,BLType,TransportType,DirectionType,BranchID,LineName";
    SelectedColumns += ",ReceivablesWithoutVAT,PayablesWithoutVAT,FixedDiscount,Receivables,Payables";
    if (glbCallingControl == "BLStatistics") {
        if ($("#cbBLStatisticsHouseNumber").prop("checked"))
            SelectedColumns += ",HouseNumber";
        if ($("#cbBLStatisticsDismissalPermissionSerial").prop("checked"))
            SelectedColumns += ",DismissalPermissionSerial";
        if ($("#cbBLStatisticsClient").prop("checked")) {
            if (pDefaults.UnEditableCompanyName == "UNF") {
                SelectedColumns += ",ClientName,ConsigneeName,ShipperName";
            }
            else {
                SelectedColumns += ",ClientName";
            }
        }
        if ($("#cbBLStatisticsPOrC").prop("checked"))
            SelectedColumns += ",POrC";
        if ($("#cbBLStatisticsCustomerReference").prop("checked"))
            SelectedColumns += ",CustomerReference";
        if ($("#cbBLStatisticsForwarderOrNotify").prop("checked"))
            SelectedColumns += ",Notify1Name";
        if ($("#cbBLStatisticsGrossWeight").prop("checked"))
            SelectedColumns += ",GrossWeightSum";
        if ($("#cbBLStatisticsVolume").prop("checked"))
            SelectedColumns += ",VolumeSum";
        if ($("#cbBLStatisticsPackages").prop("checked"))
            SelectedColumns += ",NumberOfPackages,PackageTypeName";
        if ($("#cbBLStatisticsContainerTypes").prop("checked"))
            SelectedColumns += ",ContainerTypes,ContainerNumbers";
        if ($("#cbBLStatisticsGoodsDescription").prop("checked"))
            SelectedColumns += ",DescriptionOfGoods";
        if ($("#cbBLStatisticsMovementType").prop("checked"))
            SelectedColumns += ",MoveTypeName";
        if ($("#cbBLStatisticsSalesman").prop("checked"))
            SelectedColumns += ",Salesman";
        if ($("#cbBLStatisticsETA").prop("checked"))
            SelectedColumns += ",ExpectedArrival";
        if ($("#cbBLStatisticsATA").prop("checked"))
            SelectedColumns += ",ActualArrival";
        if ($("#cbBLStatisticsInvoices").prop("checked"))
            SelectedColumns += ",InvoiceNumbers";
        if ($("#cbBLStatisticsVessel").prop("checked"))
            SelectedColumns += ",VesselName";
        if ($("#cbBLStatisticsPOL").prop("checked"))
            SelectedColumns += ",POLName";
        if ($("#cbBLStatisticsReleaseDate").prop("checked"))
            SelectedColumns += ",ReleaseDate";
        if ($("#cbBLStatisticsWarehouse").prop("checked"))
            SelectedColumns += ",MainRouteWarehouse";
        if ($("#cbBLStatisticsPODate").prop("checked"))
            SelectedColumns += ",PODate";
        if ($("#cbBLStatisticsNotes").prop("checked"))
            SelectedColumns += ",Notes";
        debugger;
        if ($("#cbInvoiceStageDate").prop("checked"))
            SelectedColumns += ",TruckingApprovalDate";
        if ($("#cbInvoiceStagePeriod").prop("checked"))
            SelectedColumns += ",DaysDifference";
        if (pDefaults.UnEditableCompanyName == "MES")
        {
            SelectedColumns += ",QuotationCode";
        }
        if ($("#cbBLAgent").prop("checked"))
            SelectedColumns += ",AgentName";
        //if ($("#cbBLContainer").prop("checked"))
        //    SelectedColumns += ",ContainerTypes";
        if ($("#cbBLTEUS").prop("checked"))
            SelectedColumns += ",TEUs";
        if ($("#cbBLPOD").prop("checked"))
            SelectedColumns += ",PODName";
        if ($("#cbBLOperationCode").prop("checked"))
            SelectedColumns += ",MasterOperationCode";
        if ($("#cbBLHBOutcome").prop("checked"))
            SelectedColumns += ",HBOutcome";
        if ($("#cbBLHBIncome").prop("checked"))
            SelectedColumns += ",HBIncome";
        if ($("#cbBLHBIncomewithvat").prop("checked"))
            SelectedColumns += ",HBIncomeWithvat";
        if ($("#cbBLShipmentTypeCode").prop("checked"))
            SelectedColumns += ",ShipmentTypeCode";
        if ($("#cbBLConsignee2").prop("checked"))
            SelectedColumns += ",NameConsignee2";

        if (pDefaults.UnEditableCompanyName == "MES") {
            SelectedColumns += ",EntryDate,StorageEndDate,NawaleenReceivables,NawaleenPayablesDiff,AccNawaleenPayablesDiff,IMO_Chemical,UnAllocatedReceivables,CountTHC,CountStorage,CountStorageService,CountNafeza,CountCollectionForOthers,CountNolon,CountG3ala";
        }

    }
    else if ($("#cbIsWorkFlow").prop("checked")) {
        SelectedColumns += ",ContainerTypes20,ContainerTypes40,ContainerTypes45,ContainerTypesReefer20,ContainerTypesReefer40,GrossWeightSum,ContainerNumbers,ClientAddress,ClientPhonesAndFaxes,ClientName";
    }
    else {
        if ($("#cbInvoiceStageDate").prop("checked"))
            SelectedColumns += ",TruckingApprovalDate";
        if ($("#cbInvoiceStagePeriod").prop("checked"))
            SelectedColumns += ",DaysDifference";
        if ($("#cbOperationWithInvoiceSerial").prop("checked")) SelectedColumns += ",OperationWithInvoiceSerial";
        if ($("#cbBranch").prop("checked")) SelectedColumns += ",BranchName";
        if ($("#cbSalesman").prop("checked")) SelectedColumns += ",Salesman";
        if ($("#cbOperState").prop("checked")) SelectedColumns += ",OperationStageName";
        if ($("#cbBookingParty").prop("checked")) SelectedColumns += ",BookingPartyName";
        if ($("#cbClient").prop("checked")) {
            if (pDefaults.UnEditableCompanyName == "UNF") {
                SelectedColumns += ",ClientName,ConsigneeName,ShipperName,POrC";
            } else {
                SelectedColumns += ",ClientName";
            }
        }
        if ($("#cbShipper").prop("checked")) SelectedColumns += ",ShipperName";
        if ($("#cbConsignee").prop("checked")) SelectedColumns += ",ConsigneeName";
        if ($("#cbEndUser").prop("checked")) SelectedColumns += ",EndUserName";
        if ($("#cbAgent").prop("checked")) SelectedColumns += ",AgentName";
        if ($("#cbNotify").prop("checked")) SelectedColumns += ",Notify1Name";
        if ($("#cbCustomsClearanceAgent").prop("checked")) SelectedColumns += ",CustomsClearanceAgentName";
        if ($("#cbCommodity").prop("checked")) SelectedColumns += ",CommodityName,CommodityName2,CommodityName3";
        if ($("#cbQuotation").prop("checked")) SelectedColumns += ",QuotationRouteCode";
        if (pDefaults.UnEditableCompanyName == "EVL") {
            if ($("#cbChassisNumbers").prop("checked")) SelectedColumns += ",ChassisNumbers";
        }
      
        if ($("#cbContainerTypes").prop("checked")) SelectedColumns += ",ContainerTypes";
        if ($("#cbContainerNumbers").prop("checked")) SelectedColumns += ",ContainerNumbers";
        if ($("#cbPackages").prop("checked")) SelectedColumns += ",PackageTypes,PackageTypesOnContainersTotals";
        if ($("#cbDescriptionOfGoods").prop("checked")) SelectedColumns += ",DescriptionOfGoods";

        if ($("#cbInvoices").prop("checked")) {
            if ($("#cbFilterInvoices").prop("checked")) {
                SelectedColumns += ", dbo.GetInvoices(ID, '" + (GetDateWithFormatyyyyMMdd($("#txtFromInvoiceDate").val().trim())) + "', '" + (GetDateWithFormatyyyyMMdd($("#txtToInvoiceDate").val().trim())) + "') AS InvoiceNumbers";
            } else {
                SelectedColumns += ",InvoiceNumbers";
            }
        }

        if ($("#cbInvoiceDate").prop("checked")) SelectedColumns += ",FirstInvoiceDate";
        if ($("#cbCustomerRef").prop("checked")) SelectedColumns += ",CustomerReference";
        if ($("#cbPONo").prop("checked")) SelectedColumns += ",PONumber";
        if ($("#cbPODate").prop("checked")) SelectedColumns += ",PODate";
        if ($("#cbPOValue").prop("checked")) SelectedColumns += ",POValue";
        if ($("#cbReleaseNo").prop("checked")) SelectedColumns += ",ReleaseNumber";
        if ($("#cbReleaseDate").prop("checked")) SelectedColumns += ",ReleaseDate";
        if ($("#cbReleaseValue").prop("checked")) SelectedColumns += ",ReleaseValue";
        if ($("#cbSupplierRef").prop("checked")) SelectedColumns += ",SupplierReference";
        if ($("#cbMBL").prop("checked")) SelectedColumns += ",MasterBL";
        if ($("#cbHBL").prop("checked")) SelectedColumns += ",HouseNumber,HouseBLs";
        if ($("#cbTrucker").prop("checked")) SelectedColumns += ",TruckersName";
        if ($("#cbBookingNo").prop("checked")) SelectedColumns += ",BookingNumbers";
        if ($("#cbTEUs").prop("checked")) SelectedColumns += ",TEUs";
        if ($("#cbVessel").prop("checked") || $("#slVessel").val() != "") SelectedColumns += ",VesselID,VesselName";
        if ($("#cbVoy").prop("checked")) SelectedColumns += ",VoyageOrTruckNumber";
        if ($("#cbPOL").prop("checked")) SelectedColumns += ",POLCountryCode,POLName";
        if ($("#cbPOD").prop("checked")) SelectedColumns += ",PODCountryCode,PODName";
        if ($("#cbCutOffDate").prop("checked")) SelectedColumns += ",CutOffDate";
        if ($("#cbETAPOL").prop("checked")) SelectedColumns += ",ETAPOLDate";
        if ($("#cbETDPOL").prop("checked") || $("#txtFromDate_ETD").val() != "" || $("#txtToDate_ETD").val() != "") SelectedColumns += ",ExpectedDeparture";
        if ($("#cbATDPOL").prop("checked")) SelectedColumns += ",ActualDeparture";
        if ($("#cbETAPOD").prop("checked") || $("#txtFromDate_ETA").val() != "" || $("#txtToDate_ETA").val() != "") SelectedColumns += ",ExpectedArrival";
        if ($("#cbATAPOD").prop("checked")) SelectedColumns += ",ActualArrival";
        if ($("#cbTask").prop("checked")) SelectedColumns += ",TrackingStageName";
        if ($("#cbAllTask").prop("checked")) {
            if ($("#slTrackingStageStatus").val() == "" && !($("#cbIsClearanceTask").prop("checked"))) SelectedColumns += ",AllTrackingStages";
            else if ($("#slTrackingStageStatus").val() == 0 && !($("#cbIsClearanceTask").prop("checked"))) SelectedColumns += ",AllTrackingStages_NotDone";
            else if ($("#slTrackingStageStatus").val() == 1 && !($("#cbIsClearanceTask").prop("checked"))) SelectedColumns += ",AllTrackingStages_Done";
            else if ($("#slTrackingStageStatus").val() == "" && $("#cbIsClearanceTask").prop("checked")) SelectedColumns += ",AllTrackingStages_CC";
            else if ($("#slTrackingStageStatus").val() == 0 && $("#cbIsClearanceTask").prop("checked")) SelectedColumns += ",AllTrackingStages_CCNotDone";
            else if ($("#slTrackingStageStatus").val() == 1 && $("#cbIsClearanceTask").prop("checked")) SelectedColumns += ",AllTrackingStages_CCDone";
        }
        if ($("#cbNetwork").prop("checked")) SelectedColumns += ",NetworkName";
        if ($("#cbMoveTypeName").prop("checked")) SelectedColumns += ",MoveTypeName";
        if ($("#cbGrossWeightSum").prop("checked")) SelectedColumns += ",GrossWeightSum,GrossWeightTONSum";
        if ($("#cbNetWeightSum").prop("checked")) SelectedColumns += ",NetWeightSum,NetWeightTONSum";
        if ($("#cbVolumeSum").prop("checked")) SelectedColumns += ",VolumeSum";
        if ($("#cbChargeableWeightSum").prop("checked")) SelectedColumns += ",ChargeableWeight";
        if ($("#cbCertificateNumber").prop("checked")) SelectedColumns += ",CertificateNumber";
        if ($("#cbCertificateValue").prop("checked")) SelectedColumns += ",CertificateValue";
        if ($("#cbCertificateDate").prop("checked") || $("#cbDaysFromOpeningCertificate").prop("checked")) SelectedColumns += ",CertificateDate";
        if ($("#cbQasimaNumber").prop("checked")) SelectedColumns += ",QasimaNumber";
        if ($("#cbQasimaDate").prop("checked")) SelectedColumns += ",QasimaDate";
        if ($("#cbForm13Number").prop("checked")) SelectedColumns += ",Form13Number";
        if ($("#cbForm13Date").prop("checked")) SelectedColumns += ",Form13Date";
        if ($("#cbCreator").prop("checked")) SelectedColumns += ",CreatorName";
        if ($("#cbCustomerNetwork").prop("checked")) SelectedColumns += ",NetworksNames";
        if ($("#cbClearanceType").prop("checked")) SelectedColumns += ",CC_ClearanceTypeName";
        if ($("#cbOperationMan").prop("checked") || $("#slOperationMan").val() != "") SelectedColumns += ",OperationManID,OperationManName";
        if ($("#cbShipmentType").prop("checked")) SelectedColumns += ",ShipmentTypeCode";
        if ($("#cbACIDNo").prop("checked")) SelectedColumns += ",ACIDNumber";
        if ($("#cbReceivingDate").prop("checked")) SelectedColumns += ",CCADocumentReceiveDate";
        if ($("#cbReceivingDate").prop("checked")) SelectedColumns += ",UnloadingDate";
        if ($("#cbDODate").prop("checked")) SelectedColumns += ",DeliveryDate";
        if ($("#cbFreeTime").prop("checked")) SelectedColumns += ",FreeTime";
        if ($("#cbTransientTime").prop("checked")) SelectedColumns += ",TransientTime";
        if ($("#cbNotes").prop("checked")) SelectedColumns += ",Notes";
        if ($("#cbNotes2").prop("checked")) SelectedColumns += ",Notes2";
        if ($("#slShippingLine").val() != "") SelectedColumns += ",ShippingLineID";
        if ($("#slAirline").val() != "") SelectedColumns += ",AirlineID";
        if ($("#cbCCAVATCertificateValue").prop("checked")) SelectedColumns += ",CCAVATCertificateValue";
        if ($("#cbCCACommercialProfitTax").prop("checked")) SelectedColumns += ",CCACommercialProfitTax";
        if ($("#cbCCACustomsValue").prop("checked")) SelectedColumns += ",CCACustomsValue";
        if ($("#cbCCAStorageFees").prop("checked")) SelectedColumns += ",CCAStorageFees";
        if ($("#cbCCAWindowFees").prop("checked")) SelectedColumns += ",CCAWindowFees";
        if ($("#cbCCAExchangeRate").prop("checked")) SelectedColumns += ",CCAExchangeRate";
        if ($("#cbCCASpendDate").prop("checked")) SelectedColumns += ",CCASpendDate";
        if ($("#cbCCAOthers").prop("checked")) SelectedColumns += ",CCAOthers";
        if ($("#cbCourier").prop("checked")) SelectedColumns += ",MainRouteNotes";
        if ($("#cbReferenceNumber").prop("checked")) SelectedColumns += ",ReferenceNumber";
        if ($("#cbPorc").prop("checked")) SelectedColumns += ",POrC";
        if ($("#cbCCADocumentReceiveDate").prop("checked"))
            SelectedColumns += ",CCADocumentReceiveDate";
    }
    return SelectedColumns;
}
function OperationsStatistics_GetFilterWhereClause() {
    debugger;
    //var pWhereClause = "";
    var pWhereClause = glbCallingControl == "OperationsStatistics" ? "WHERE BLType<>2 " : "WHERE BLType=2 AND MasterOperationID IS NOT NULL ";
    if (pDefaults.UnEditableCompanyName == "TCS") {
        pWhereClause = glbCallingControl == "OperationsStatistics" ? "WHERE BLType=2 " : "WHERE BLType<>2";
    }
    var pTransportFilter = "";
    var pDirectionFilter = "";
    var pBLTypeFilter = "";
    var pSalesmanFilter = "";
    var pCreatorFilter = "";
    var pBranchFilter = "";

    var pCountryPOLFilter = "";
    var pPOLFilter = "";
    var pCountryPODFilter = "";
    var pPODFilter = "";
    var pMatchFilter = "";
    var pInvoiceNumbersFilter = "";
    var pCustomerReferenceFilter = "";
    var pPONumberFilter = "";
    var pGrossWeightFilter = "";
    var pCertificateNumberFilter = "";
    var pQasimaNumberFilter = "";
    var pForm13NumberFilter = "";
    var pMainRouteNotes = "";
    var pSupplierReferenceFilter = "";
    var pMasterBLFilter = "";
    var pHouseNumberFilter = "";
    var pVoyageOrTruckNumberFilter = "";
    var pBookingNumbersFilter = "";
    var pCommodityFilter = "";
    var pShippingLineFilter = "";
    var pAirlineFilter = "";
    var pVesselFilter = "";
    var pShipmentTypeFilter = "";
    var pTrackingStageFilter = "";
    var pNetworkFilter = "";
    var pMoveTypeFilter = "";
    var pCustomerFilter = "";
    var pConsigneeFilter = "";
    var PShipperFilter = "";
    var pAgentFilter = "";
    var pOperationIDsFilter = "";
    var pBookingPartyFilter = "";
    var pCustomsClearanceAgentFilter = "";
    var pFromOpenDateFilter = "";
    var pToOpenDateFilter = "";

    var pFromETAFilter = "";
    var pToETAFilter = "";
    var pFromETDFilter = "";
    var pToETDFilter = "";

    var pFromCloseDateFilter = "";
    var pToCloseDateFilter = "";
    var pPOL = "";
    var pPOD = "";
    var pOperationsWOInvoicesFilter = "";
    //var pOperationStageFilter = ($("#slOperationStages").val() == 0
    //                            ? "" //if 0 then all stages
    //                            : ($("#slOperationStages").val() == ClosedQuoteAndOperStageID.toString() ? (" (CAST(CloseDate AS date) <= GETDATE() AND OperationStageID <> " + /*This is to handle case of auto close*/CancelledQuoteAndOperStageID.toString() + ") ") : (" OperationStageID = " + $("#slOperationStages").val() + " AND CloseDate > GETDATE() "))
    //                            );
    //var pOperationStageFilter =
    //    ($("#slOperationStages").val() == 0
    //    ? "" //if 0 then all status
    //    : ($("#slOperationStages").val() == ClosedQuoteAndOperStageID.toString()
    //        ? " OperationStageName=N'CLOSED' "//(" (CAST(CloseDate AS date) <= GETDATE() AND OperationStageID <> " + /*This is to handle case of auto close*/CancelledQuoteAndOperStageID.toString() + ") ")
    //        : (" OperationStageID = " + $("#slOperationStages").val() + " AND CloseDate > CAST(GETDATE() AS date) ")
    //        )
    //    );
    var pOperationStageFilter =
        ($("#slOperationStages").val() == 0
            ? "" //if 0 then all status
            : " OperationStageName=N'" + $("#slOperationStages option:selected").text() + "'");
    var pModalName = "CheckboxesListModal";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pSelectedItemsIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
    //pOperationIDsFilter = (pSelectedItemsIDs == "" ? "" : " ID IN (" + pSelectedItemsIDs + ")");

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

    if (pBLTypeFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pBLTypeFilter;
    else
        if (pBLTypeFilter != "" && pWhereClause == "")
            pWhereClause += " AND " + pBLTypeFilter;

    if (pOperationStageFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pOperationStageFilter;
    else
        if (pOperationStageFilter != "" && pWhereClause == "")
            pWhereClause += " AND " + pOperationStageFilter;

    if ($("#slNotify").val() != "")
        pWhereClause += " AND Notify1Name=N'" + $("#slNotify option:selected").text() + "'" + "\n";

    pBranchFilter = ($("#slBranch").val() == "" ? "" : " BranchID = " + $("#slBranch").val());
    if (pBranchFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pBranchFilter;
    else
        if (pBranchFilter != "" && pWhereClause == "")
            pWhereClause = " WHERE " + pBranchFilter;

    pCountryPOLFilter = ($("#slCountryPOL").val() == "" ? "" : " POLCountryID = " + $("#slCountryPOL").val());
    if (pCountryPOLFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pCountryPOLFilter;
    else
        if (pCountryPOLFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pCountryPOLFilter;
    pPOLFilter = ($("#slPOL").val() == "" ? "" : " POL = " + $("#slPOL").val());
    if (pPOLFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pPOLFilter;
    else
        if (pPOLFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pPOLFilter;

    pCountryPODFilter = ($("#slCountryPOD").val() == "" ? "" : " PODCountryID = " + $("#slCountryPOD").val());
    if (pCountryPODFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pCountryPODFilter;
    else
        if (pCountryPODFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pCountryPODFilter;
    pPODFilter = ($("#slPOD").val() == "" ? "" : " POD = " + $("#slPOD").val());
    if (pPODFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pPODFilter;
    else
        if (pPODFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pPODFilter;

    if ($("#cbIsMatch").prop("checked")) {
        pMatchFilter = " Match = 1 ";
        if (pWhereClause != "")
            pWhereClause += " AND " + pMatchFilter;
        else
            pWhereClause += " WHERE " + pMatchFilter;
    }
    pInvoiceNumbersFilter = ($("#txtInvoiceNumbers").val().trim() == "" ? "" : " InvoiceNumbers LIKE N'%" + $("#txtInvoiceNumbers").val().trim() + "%'");
    if (pInvoiceNumbersFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pInvoiceNumbersFilter;
    else
        if (pInvoiceNumbersFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pInvoiceNumbersFilter;

    pCustomerReferenceFilter = ($("#txtCustomerReference").val().trim() == "" ? "" : " CustomerReference LIKE N'%" + $("#txtCustomerReference").val().trim() + "%'");
    if (pCustomerReferenceFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pCustomerReferenceFilter;
    else
        if (pCustomerReferenceFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pCustomerReferenceFilter;

    pPONumberFilter = ($("#txtPONumber").val().trim() == "" ? "" : " PONumber LIKE N'%" + $("#txtPONumber").val().trim() + "%'");
    if (pPONumberFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pPONumberFilter;
    else
        if (pPONumberFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pPONumberFilter;

    pGrossWeightFilter = ($("#txtGrossWeight").val().trim() == "" ? "" : " (GrossWeightSum = '" + $("#txtGrossWeight").val().trim() + "' OR GrossWeightTONSum = '" + $("#txtGrossWeight").val().trim() + "')");
    if (pGrossWeightFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pGrossWeightFilter;
    else
        if (pGrossWeightFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pGrossWeightFilter;

    pCertificateNumberFilter = ($("#txtCertificateNumber").val().trim() == "" ? "" : " CertificateNumber LIKE N'%" + $("#txtCertificateNumber").val().trim() + "%'");
    if (pCertificateNumberFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pCertificateNumberFilter;
    else
        if (pCertificateNumberFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pCertificateNumberFilter;

    pQasimaNumberFilter = ($("#txtQasimaNumber").val().trim() == "" ? "" : " QasimaNumber LIKE N'%" + $("#txtQasimaNumber").val().trim() + "%'");
    if (pQasimaNumberFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pQasimaNumberFilter;
    else
        if (pQasimaNumberFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pQasimaNumberFilter;

    pForm13NumberFilter = ($("#txtForm13Number").val().trim() == "" ? "" : " Form13Number LIKE N'%" + $("#txtForm13Number").val().trim() + "%'");
    if (pForm13NumberFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pForm13NumberFilter;
    else
        if (pForm13NumberFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pForm13NumberFilter;

    pMainRouteNotes = ($("#txtMainRouteNotes").val().trim() == "" ? "" : " MainRouteNotes = N'" + $("#txtMainRouteNotes").val().trim() + "'");
    if (pMainRouteNotes != "" && pWhereClause != "")
        pWhereClause += " AND " + pMainRouteNotes;
    else
        if (pMainRouteNotes != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pMainRouteNotes;

    pSupplierReferenceFilter = ($("#txtSupplierReference").val().trim() == "" ? "" : " SupplierReference LIKE N'%" + $("#txtSupplierReference").val().trim() + "%'");
    if (pSupplierReferenceFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pSupplierReferenceFilter;
    else
        if (pSupplierReferenceFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pSupplierReferenceFilter;

    //pOperationsWOInvoicesFilter = ($("#cbOperationsWOInvoices").prop("checked") ? " FirstInvoiceDate IS NULL " : "");
    pOperationsWOInvoicesFilter = ($("#cbOperationsWOInvoices").prop("checked") ? " InvoiceNumbers IS NULL AND OperationStageName <> N'CANCELLED' " : "");
    if (pOperationsWOInvoicesFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pOperationsWOInvoicesFilter;
    else
        if (pOperationsWOInvoicesFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pOperationsWOInvoicesFilter;

    pMasterBLFilter = ($("#txtMasterBL").val().trim() == "" ? "" : " MasterBL LIKE N'%" + $("#txtMasterBL").val().trim() + "%'");
    if (pMasterBLFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pMasterBLFilter;
    else
        if (pMasterBLFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pMasterBLFilter;

    pHouseNumberFilter = ($("#txtHouseNumber").val().trim() == "" ? "" : " HouseNumber = N'" + $("#txtHouseNumber").val().trim() + "'");
    if (pHouseNumberFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pHouseNumberFilter;
    else
        if (pHouseNumberFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pHouseNumberFilter;

    pVoyageOrTruckNumberFilter = ($("#txtVoyageOrTruckNumber").val().trim() == "" ? "" : " VoyageOrTruckNumber LIKE N'%" + $("#txtVoyageOrTruckNumber").val().trim() + "%'");
    if (pVoyageOrTruckNumberFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pVoyageOrTruckNumberFilter;
    else
        if (pVoyageOrTruckNumberFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pVoyageOrTruckNumberFilter;

    pBookingNumbersFilter = ($("#txtBookingNumbers").val().trim() == "" ? "" : " BookingNumbers LIKE N'%" + $("#txtBookingNumbers").val().trim() + "%'");
    if (pBookingNumbersFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pBookingNumbersFilter;
    else
        if (pBookingNumbersFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pBookingNumbersFilter;

    pCommodityFilter = ($("#slCommodity").val() == "" ? "" : " (CommodityID = " + $("#slCommodity").val() + " OR CommodityID2 = " + $("#slCommodity").val() + " OR CommodityID3 = " + $("#slCommodity").val() + ")");

    if (pCommodityFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pCommodityFilter;
    else
        if (pCommodityFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pCommodityFilter;


    pShipmentTypeFilter = ($("#slShipmentType").val() == "" ? "" : " ShipmentType = " + $("#slShipmentType").val());
    if (pShipmentTypeFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pShipmentTypeFilter;
    else
        if (pShipmentTypeFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pShipmentTypeFilter;

    pNetworkFilter = ($("#slNetwork").val() == "" ? "" : " NetworkID = " + $("#slNetwork").val());
    if (pNetworkFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pNetworkFilter;
    else
        if (pNetworkFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pNetworkFilter;


    pCustomerNetworkFilter = ($("#slCustomerNetwork").val() == "" || $("#slCustomerNetwork").val() == 0 ? "" : " NetworksNames LIKE'%" + $("#slCustomerNetwork").val() + "%'");
    if (pCustomerNetworkFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pCustomerNetworkFilter;
    else
        if (pCustomerNetworkFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pCustomerNetworkFilter;





    pMoveTypeFilter = ($("#slMoveType").val() == "" ? "" : " MoveTypeID = " + $("#slMoveType").val());
    if (pMoveTypeFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pMoveTypeFilter;
    else
        if (pMoveTypeFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pMoveTypeFilter;

    ////14-2-2023 ------ Mustafa Mahmoud:

    ////if you choose a specific task
    //if ($("#slTrackingStage").val() != "") {
    //    //Case Clearance is checked
    //    if ($("#cbIsClearanceTask").prop("checked"))
    //        pWhereClause += " AND EXISTS (SELECT top 1 (1) FROM vwCustomClearanceTracking OT WHERE OT.TrackingStageID=" + $("#slTrackingStage").val()
    //            + " AND OT.OperationID = vwOperationsStatistics.ID "
    //            //Task status whether done or not
    //            + ($("#slTrackingStageStatus").val() != "" ? (" AND OT.Done=" + $("#slTrackingStageStatus").val()) : "")
    //            + " ORDER BY OT.ID DESC ) " + " \n";
    //    //Case Clearance is not checked
    //    else
    //        pWhereClause += " AND EXISTS (SELECT top 1 (1) FROM vwOperationTracking OT WHERE OT.TrackingStageID=" + $("#slTrackingStage").val()
    //            + " AND OT.OperationID = vwOperationsStatistics.ID "
    //            + ($("#slTrackingStageStatus").val() != "" ? (" AND OT.Done=" + $("#slTrackingStageStatus").val()) : "")
    //            + " ORDER BY OT.ID DESC ) " + " \n";
    //}

    ////in case of selecting all tasks
    //if ($("#slTrackingStage").val() == "") {
    //    //Case Clearance is checked
    //    if ($("#cbIsClearanceTask").prop("checked"))
    //        pWhereClause += " AND EXISTS (SELECT top 1 (1) FROM vwCustomClearanceTracking OT WHERE OT.OperationID = vwOperationsStatistics.ID "
    //            //Task status whether done or not
    //            + ($("#slTrackingStageStatus").val() != "" ? (" AND OT.Done=" + $("#slTrackingStageStatus").val()) : "")
    //            + " ORDER BY OT.ID DESC ) " + " \n";
    //    //Case Clearance is not checked
    //    else
    //        pWhereClause += ($("#slTrackingStageStatus").val() != "" ?
    //            (" AND EXISTS (SELECT top 1 (1) FROM vwOperationTracking OT WHERE OT.OperationID = vwOperationsStatistics.ID AND OT.Done=" + $("#slTrackingStageStatus").val() + ") \n")
    //            : "")
    //}






    //pWhereClause += " AND (SELECT TOP 1 OT.TrackingStageID FROM vwOperationTracking OT WHERE  OT.OperationID = vwOperationsStatistics.ID ORDER BY ID DESC) = " + $("#slTrackingStage").val() + " \n";
    //if ($("#slTrackingStage").val() == "" && $("#slTrackingStageStatus").val() != "")
    //    pWhereClause += " AND EXISTS (SELECT top 1 (1) FROM vwOperationTracking OT WHERE OT.OperationID = vwOperationsStatistics.ID AND OT.Done=" + $("#slTrackingStageStatus").val()
    //        //+ ($("#cbIsClearanceTask").prop("checked") ? (" AND IsClearance=" + ($("#cbIsClearanceTask").prop("checked") ? 1 : "")) : "")
    //        + " ORDER BY OT.ID DESC ) " + " \n";

    //if ($("#slTrackingStage").val() == "")
    //    pWhereClause += " AND EXISTS (SELECT top 1 (1) FROM vwOperationTracking OT WHERE OT.OperationID > 1 "
    //    + ($("#slTrackingStageStatus").val() != "" ? (" AND OT.Done=" + $("#slTrackingStageStatus").val()) : "")
    //        + ($("#cbIsClearanceTask").prop("checked") ? (" AND IsClearance=" + ($("#cbIsClearanceTask").prop("checked") ? 1 : "")) : "")
    //        + " ORDER BY OT.ID DESC ) " + " \n";
    console.log(pWhereClause);
    if ($("#txtTankOrFlexiNumber").val() != "")
        pWhereClause += " AND EXISTS (SELECT top 1 (1) FROM OperationContainersAndPackages OCP WHERE vwOperationsStatistics.ID=OCP.OperationID AND OCP.TankOrFlexiNumber=N'" + $("#txtTankOrFlexiNumber").val() + "')" + " \n";


    //-------------

    //if (pLoggedUser.IsSalesman == true && pLoggedUser.IsHideOthersRecords == true && glbCallingControl == "OperationsStatistics" )
    //   pSalesmanFilter = " SalesmanID = " + pLoggedUser.ID + "";
    //else
    pSalesmanFilter = ($("#slSalesman").val() == "" ? "" : " SalesmanID = " + $("#slSalesman").val());


    if (pSalesmanFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pSalesmanFilter;
    else
        if (pSalesmanFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pSalesmanFilter;




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
           //*********************************************************************************************** */ 

    pConsigneeFilter = ($("#slConsignee").val() == "" ? "" : " ConsigneeID = " + $("#slConsignee").val());
    if (pConsigneeFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pConsigneeFilter;
    else
        if (pConsigneeFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pConsigneeFilter;
    PShipperFilter = ($("#slShipper").val() == "" ? "" : " ShipperID = " + $("#slShipper").val());
    if (PShipperFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + PShipperFilter;
    else
        if (PShipperFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + PShipperFilter;
         //*********************************************************************************************** */
    pAgentFilter = ($("#slAgent").val() == "" ? "" : " AgentID = " + $("#slAgent").val());
    if (pAgentFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pAgentFilter;
    else
        if (pAgentFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pAgentFilter;

    pBookingPartyFilter = ($("#slBookingParty").val() == "" ? "" : " BookingPartyID = " + $("#slBookingParty").val());
    if (pBookingPartyFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pBookingPartyFilter;
    else
        if (pBookingPartyFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pBookingPartyFilter;

    //pCustomsClearanceAgentFilter = ($("#slCustomsClearanceAgent").val() == "" ? "" : " CustomsClearanceAgentID = " + $("#slCustomsClearanceAgent").val());
    //if (pCustomsClearanceAgentFilter != "" && pWhereClause != "")
    //    pWhereClause += " AND " + pCustomsClearanceAgentFilter;
    //else
    //    if (pCustomsClearanceAgentFilter != "" && pWhereClause == "")
    //        pWhereClause += " WHERE " + pCustomsClearanceAgentFilter;


    if ($("#slFilterTrucker").val() != null && $("#slFilterTrucker").val() != "" && pWhereClause !== "")
        pWhereClause += " AND ((ISNULL((SELECT COUNT(op.ID) FROM dbo.OperationPartners AS op WHERE dbo.vwOperationsStatistics.ID = op.OperationID AND op.TruckerID = " + $("#slFilterTrucker").val().trim().toUpperCase() + "), 0)) > 0)";

    if ($("#slCustomsClearanceAgent").val() != null && $("#slCustomsClearanceAgent").val() != "" && pWhereClause !== "")
        pWhereClause += " AND ((ISNULL((SELECT COUNT(op.ID) FROM dbo.OperationPartners AS op WHERE dbo.vwOperationsStatistics.ID = op.OperationID AND op.CustomsClearanceAgentID = " + $("#slCustomsClearanceAgent").val().trim().toUpperCase() + "), 0)) > 0)";


    pslCC_ClearanceTypeFilter = ($("#slCC_ClearanceType").val() == "" ? "" : " CC_ClearanceTypeID = " + $("#slCC_ClearanceType").val());
    if (pslCC_ClearanceTypeFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pslCC_ClearanceTypeFilter;
    else
        if (pslCC_ClearanceTypeFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pslCC_ClearanceTypeFilter;

    if ($("#txtFilterQuotation").val().trim() != "" && pWhereClause !== "") {
        pWhereClause += " AND (QuotationCode like N'%" + $("#txtFilterQuotation").val().trim().toUpperCase() + "%') ";
    }

    ////2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
    //if (isValidDate($("#txtFromDate").val().trim(), 1) && $("#txtFromDate").val().trim() != "" && !$("#cbFilterInvoices").prop("checked")) {
    //    pFromOpenDateFilter = " OpenDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromDate").val().trim()) + "'";
    //    if (pFromOpenDateFilter != "" && pWhereClause != "")
    //        pWhereClause += " AND " + pFromOpenDateFilter;
    //    else
    //        if (pFromOpenDateFilter != "" && pWhereClause == "")
    //            pWhereClause += " WHERE " + pFromOpenDateFilter;
    //}
    //if (isValidDate($("#txtToDate").val().trim(), 1) && $("#txtToDate").val().trim() != "" && !$("#cbFilterInvoices").prop("checked")) {
    //    pToOpenDateFilter = " CAST(OpenDate AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToDate").val().trim()) + "'";
    //    if (pToOpenDateFilter != "" && pWhereClause != "")
    //        pWhereClause += " AND " + pToOpenDateFilter;
    //    else
    //        if (pToOpenDateFilter != "" && pWhereClause == "")
    //            pWhereClause += " WHERE " + pToOpenDateFilter;
    //}




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

    //pOperationIDsFilter = (pSelectedItemsIDs == "" ? "" : " ID IN (" + pSelectedItemsIDs + ") OR (MasterOperationID IN (" + pSelectedItemsIDs + ") " + (pOperationStageFilter == "" ? "" : " AND " + pOperationStageFilter) + " )");
    pOperationIDsFilter = (pSelectedItemsIDs == "" ? "" : " ID IN (" + pSelectedItemsIDs + ")" + (pOperationStageFilter == "" ? "" : " AND " + pOperationStageFilter));
    if (pOperationIDsFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pOperationIDsFilter;
    else
        if (pOperationIDsFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pOperationIDsFilter;

    if (isValidDate($("#txtFromInvoiceDate").val().trim(), 1) && $("#txtFromInvoiceDate").val().trim() != ""
        && isValidDate($("#txtToInvoiceDate").val().trim(), 1) && $("#txtToInvoiceDate").val().trim() != ""
        && $("#cbFilterInvoices").prop("checked"))
        pWhereClause += " AND vwOperationsStatistics.ID IN (SELECT ISNULL(vwInvoices.MasterOperationID,vwInvoices.OperationID) FROM vwInvoices WHERE IsDeleted=0 AND CAST(vwInvoices.InvoiceDate AS DATE) BETWEEN '" + GetDateWithFormatyyyyMMdd($("#txtFromInvoiceDate").val().trim()) + "' AND '" + GetDateWithFormatyyyyMMdd($("#txtToInvoiceDate").val().trim()) + " 23:59:59') " + " \n";
    //if (isValidDate($("#txtToInvoiceDate").val().trim(), 1) && $("#txtToInvoiceDate").val().trim() != "" && $("#cbFilterInvoices").prop("checked"))
    //    pWhereClause += " AND vwOperationsStatistics.ID IN (SELECT ISNULL(vwInvoices.MasterOperationID,vwInvoices.OperationID) FROM vwInvoices WHERE IsDeleted=0 AND CAST(vwInvoices.InvoiceDate AS DATE) <= '" + GetDateWithFormatyyyyMMdd($("#txtToInvoiceDate").val().trim()) + " 23:59:59') " + " \n";
    if ($("#slTaskCreator").val() != "" && $("#slTaskCreator").val() != null) {
        pWhereClause += " AND ID IN (select OperationID from OperationTracking where CreatorUserID=" + $("#slTaskCreator").val() + ")";
    }

    if (pDefaults.UnEditableCompanyName == "UNV" && $("#cbIsNotHaveSpendDate").prop("checked")) {
        pWhereClause += " AND CCASpendDate IS NULL ";
    }

    pWhereClause = (pWhereClause == "" ? " WHERE (1=1) " : pWhereClause);// + " ORDER BY ID DESC ";
    return pWhereClause;
}
function OperationsStatistics_ClearPorts(pPortControlName) {
    debugger;
    $("#" + pPortControlName).html("<option value=''><--All--></option>");
}
function OperationsStatistics_RefereshPorts(pCountryControlName, pPortControlName) {
    debugger;
    FadePageCover(true);
    $("#" + pPortControlName).html("<option value=''><--Select--><option>");
    if ($("#" + pCountryControlName).val() == "") {
        FadePageCover(false);
    }
    else {
        CallGETFunctionWithParameters("/api/Ports/LoadAll"
            , { pWhereClause: "WHERE CountryID=" + $("#" + pCountryControlName).val() }
            , function (pData) {
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), pPortControlName, pData[0], null);
                FadePageCover(false);
            }
            , null);
    }
}
function OperationsStatistics_OperationStatusChanged() {
    debugger;
    if ($("#slOperationStages option:selected").text() == "CLOSED")
        $(".classShowForClosed").removeClass("hide");
    else
        $(".classShowForClosed").addClass("hide");
}
function OperationsStatistics_SelectColumns() {

    if (glbCallingControl == "OperationsStatistics")
        jQuery("#ModalSelectColumns").modal("show"); //Operations Statistics
    else if (glbCallingControl == "BLStatistics")
        jQuery("#ModalSelectColumns_BLStatistics").modal("show");  //HBL Statistics
}
function OperationsStatistics_SelectOperations() {
    debugger;
    jQuery("#CheckboxesListModal").modal("show");
}
function OperationsStatistics_ClearAllOperations() {
    debugger;
    $('input[name="cbAddedItemID"]').prop("checked", false);
}
function OperationsStatistics_FilterOperationsModal() {
    debugger;
    FadePageCover(true);
    var pWhereClause = "WHERE BLType<>2 \n";
    if ($("#txtSearchItems").val().trim() != "")
        pWhereClause += "AND SUBSTRING(Code,12,10)='" + $("#txtSearchItems").val().trim() + "' \n";
    //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
    if (isValidDate($("#txtFromDateSelectOperations").val().trim(), 1) && $("#txtFromDateSelectOperations").val().trim() != "") {
        pWhereClause += " AND OpenDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromDateSelectOperations").val().trim()) + "'";
        $("#txtFromDate").val($("#txtFromDateSelectOperations").val());
    }
    if (isValidDate($("#txtToDateSelectOperations").val().trim(), 1) && $("#txtToDateSelectOperations").val().trim() != "") {
        pWhereClause += " AND CAST(OpenDate AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToDateSelectOperations").val().trim()) + "'";
        $("#txtToDate").val($("#txtToDateSelectOperations").val());
    }

    GetListAsCheckboxesWithVariousParameters("/api/Operations/LoadAll"
        , { pWhereClause: pWhereClause }
        , "divCheckboxesList"
        , "cbAddedItemID"
        , function () { FadePageCover(false); }
        , 2
        , "col-sm-2");
}
function OperationsStatistics_cbIsWorkFlowChanged() {
    debugger;
    if ($("#cbIsWorkFlow").prop("checked"))
        $("#btn-SelectColumns").addClass("hide");
    else
        $("#btn-SelectColumns").removeClass("hide");
}
function OperationsStatistics_cbFilterInvoicesChanged() {
    debugger;
    if ($("#cbFilterInvoices").prop("checked"))
        $(".classShowForFilterInvoices").removeClass("hide");
    else {
        $(".classShowForFilterInvoices").addClass("hide");
    }
}
function OperationsStatistics_DrawReport(data, pOutputTo, IsWithCurrenciesDetailed, IsWithChargesDetailed) {
    debugger;
    var grossWgtKg = 0;
    var grossWgtTn = 0;
    if (pDefaults.UnEditableCompanyName != "UNV")
        var pReportRows = JSON.parse(data[1]);
    else
        var pReportRows = JSON.parse(data[11]);
    var pContainerTotals = data[2];
    var pIncotermTotals = data[3];
    var pReportRowsWithDetailedCurrencies = "CurrenciesNotSelected";
    if (IsWithCurrenciesDetailed) {
        pReportRowsWithDetailedCurrencies = JSON.parse(data[4]);
    }
    var OperationsPayables = JSON.parse(data[5]);
    var OperationsReceivables = JSON.parse(data[6]);

    var TankNoLst = JSON.parse(data[7]);

    var DocInfo = JSON.parse(data[8]);
    var OpsDocInfo = JSON.parse(data[9]);

    var OperationsCreationDate = JSON.parse(data[10]);

    var pReportTitle = "Operations Statistics";
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var _BranchIDs = "";
    for (var i = 1; i < ($("#slBranch option").length + 1); i++)
        _BranchIDs += _BranchIDs == "" ? $("#slBranch option:nth-child(" + (i) + ")").val() : ("," + $("#slBranch option:nth-child(" + (i) + ")").val());
    var ArrBranchIDs = _BranchIDs.split(",");

    var dataGroup = {};
    var dataLst = [];
    if ($('#cbGroupByNetwork').is(':checked')) {
        $.each(pReportRows, function (i, item) {
            if (!dataGroup[item.NetworkName]) {
                dataGroup[item.NetworkName] = pReportRows.filter(function (d) { return d.NetworkName == item.NetworkName; });
                dataLst.push({ 'Key': item.NetworkName, 'Data': pReportRows.filter(function (d) { return d.NetworkName == item.NetworkName; })});
            }
        });
        dataLst.sort((a, b) => a.Key.localeCompare(b.Key));
    }
    else {
        dataGroup['NoGroup'] = pReportRows;
        dataLst.push({ 'Key': 'NoGroup', 'Data': pReportRows });
    }
    debugger;
    var pTablesHTML = "";


    $.each(dataLst, function (g, group) {

        pTablesHTML += ' <div style="overflow: auto;clear:both;"> ';
        if (group.Key != 'NoGroup')
            pTablesHTML += ' <h4 style="padding: .1% 1%;">' + IsNull(group.Key,'')+'</h4> ';
        //ReportHTML += '                         <table id="tblOperationsStatistics" class="table table-striped text-sm table-hover b-t b-r b-b b-l print">';//remove t1 class to remove row numbers
        pTablesHTML += '                         <table id="tblOperationsStatistics" class="table table-striped text-sm table-bordered  " style="border:solid #000 !important;">';//style="border-left:solid #999 !important;border-top:solid #999 !important;"
        pTablesHTML += '                             <thead>';
        pTablesHTML += '                                 <tr class="" style="font-size:90%;background-color: lightgray;">';
        pTablesHTML += '                                     <th>' + (pDefaults.UnEditableCompanyName == "SAF" ? 'Job No' : 'OperationNo') + '</th>';
        if ($("#cbReferenceNumber").prop("checked"))
            pTablesHTML += '                                     <th>Ref</th>';
        if ($("#cbOperationWithInvoiceSerial").prop("checked"))
            pTablesHTML += '                                     <th>Oper.WithInv.Ser.</th>';
        if ($("#cbBranch").prop("checked"))
            pTablesHTML += '                                     <th>Branch</th>';
        if ($("#cbSalesman").prop("checked"))
            pTablesHTML += '                                     <th>Salesman</th>';
        if ($("#cbIssueDate").prop("checked"))
            pTablesHTML += '                                     <th>Issue Date</th>';
        if ($("#cbOperState").prop("checked"))
            pTablesHTML += '                                     <th>Oper. State</th>';
        //pTablesHTML += '                                     <th>Oper. Type</th>';
        if ($("#cbBookingParty").prop("checked"))
            pTablesHTML += '                                     <th>BookingParty</th>';
        if ($("#cbClient").prop("checked"))
            pTablesHTML += '                                     <th>Client</th>';
        if ($("#cbShipper").prop("checked"))
            pTablesHTML += '                                     <th>Shipper</th>';
        if ($("#cbConsignee").prop("checked"))
            pTablesHTML += '                                     <th>Consignee</th>';
        if ($("#cbEndUser").prop("checked"))
            pTablesHTML += '                                     <th>EndUser</th>';
        if ($("#cbAgent").prop("checked"))
            pTablesHTML += '                                     <th>Agent</th>';
        if ($("#cbCustomsClearanceAgent").prop("checked"))
            pTablesHTML += '                                     <th>CustomsClr.Agent</th>';
        if ($("#cbNotify").prop("checked"))
            pTablesHTML += '                                     <th>Notify</th>';
        if ($("#cbLine").prop("checked"))
            pTablesHTML += '                                     <th>Line</th>';
        if ($("#cbCommodity").prop("checked"))
            pTablesHTML += '                                     <th>Commodity</th>';
        if ($("#cbIncoterm").prop("checked"))
            pTablesHTML += '                                     <th>Incoterm</th>';
        if ($("#cbQuotation").prop("checked"))
            pTablesHTML += '                                     <th>Quotation</th>';
        if ($("#cbContainerTypes").prop("checked"))
            pTablesHTML += '                                     <th>ContainerTypes</th>';
        if ($("#cbContainerNumbers").prop("checked"))
            pTablesHTML += '                                     <th>Container Nos</th>';
        if ($("#cbPackages").prop("checked"))
            pTablesHTML += '                                     <th>Packages</th>';
        if ($("#cbDescriptionOfGoods").prop("checked"))
            pTablesHTML += '                                     <th>DescriptionOfGoods</th>';
        if ($("#cbInvoices").prop("checked"))
            pTablesHTML += '                                     <th>Invoices</th>';
        if ($("#cbInvoiceDate").prop("checked")) //First Invoice
            pTablesHTML += '                                     <th>Inv.Date</th>';
        ////pTablesHTML += '                                     <th>Cntrs/Pkgs</th>';
        if ($("#cbCustomerRef").prop("checked"))
            pTablesHTML += '                                     <th>' + (pDefaults.UnEditableCompanyName == "SWI" ? 'Swift Ref' : 'CustomerRef') + '</th>';

        if ($("#cbPONo").prop("checked"))
            pTablesHTML += '                                     <th>PO No</th>';
        if ($("#cbPODate").prop("checked")) {
            if (pDefaults.UnEditableCompanyName == "GSL")
                pTablesHTML += '                                     <th>Loading Date</th>';
            else
                pTablesHTML += '                                     <th>PO Date</th>';

        }
        if ($("#cbPOValue").prop("checked"))
            pTablesHTML += '                                     <th>PO Value</th>';
        if ($("#cbCCADocumentReceiveDate").prop("checked"))
            pTablesHTML += '                                     <th>Document Receive Date</th>';
        if ($("#cbReleaseNo").prop("checked"))
            pTablesHTML += '                                     <th>' + (pDefaults.UnEditableCompanyName == 'KDM' ? 'Ref.No.' : 'Release No') + '</th>';
        if ($("#cbReleaseDate").prop("checked"))
            pTablesHTML += '                                     <th>Release Date</th>';
        if ($("#cbReleaseValue").prop("checked"))
            pTablesHTML += '                                     <th>Release Value</th>';

        if ($("#cbSupplierRef").prop("checked"))
            pTablesHTML += '                                     <th>SupplierRef</th>';
        if ($("#cbMBL").prop("checked"))
            pTablesHTML += '                                     <th>M B/L(MAWB)</th>';
        if ($("#cbHBL").prop("checked"))
            pTablesHTML += '                                     <th>HBL(HAWB)</th>';
        if ($("#cbCarrier").prop("checked"))
            pTablesHTML += '                                     <th>Carrier</th>';
        if ($("#cbTrucker").prop("checked"))
            pTablesHTML += '                                     <th>Truckers</th>';
        if ($("#cbBookingNo").prop("checked"))
            pTablesHTML += '                                     <th>BookingNo</th>';
        if ($("#cbTEUs").prop("checked"))
            pTablesHTML += '                                     <th>TEUs</th>';
        if ($("#cbVessel").prop("checked"))
            pTablesHTML += '                                     <th>Vessel</th>';
        if ($("#cbVoy").prop("checked"))
            pTablesHTML += '                                     <th>Voy</th>';
        //pTablesHTML += '                                     <th>Imp/Exp</th>';
        if ($("#cbPOL").prop("checked"))
            pTablesHTML += '                                     <th>POL</th>';
        if ($("#cbPOD").prop("checked"))
            pTablesHTML += '                                     <th>POD</th>';
        if ($("#cbChassisNumbers").prop("checked"))
            pTablesHTML += '                                     <th>Chassis Numbers</th>';
        if ($("#cbCutOffDate").prop("checked"))
            pTablesHTML += '                                     <th>CutOffDate</th>';
        //pTablesHTML += '                                     <th>Open Date</th>';
        //pTablesHTML += '                                     <th>Close Date</th>';
        //pTablesHTML += '                                     <th>Arrival Date</th>';
        if ($("#cbETAPOL").prop("checked"))
            pTablesHTML += '                                     <th>ETA POL</th>';
        if ($("#cbETDPOL").prop("checked")) {
            if (pDefaults.UnEditableCompanyName == "NAJ") {
                pTablesHTML += '                                     <th>SI Date</th>';
            } else {
                pTablesHTML += '                                     <th>ETD POL</th>';
            }
        }
        if ($("#cbATDPOL").prop("checked"))
            pTablesHTML += '                                     <th>' + (['MED'].includes(pDefaults.UnEditableCompanyName) ? 'LOADING DATE ' : 'ATD POL') + '</th>';
        if ($("#cbETAPOD").prop("checked"))
            pTablesHTML += '                                     <th>ETA POD</th>';
        if ($("#cbATAPOD").prop("checked"))
            pTablesHTML += '                                     <th>ATA POD</th>';
        if ($("#cbTask").prop("checked"))
            pTablesHTML += '                                     <th>Task</th>';
        if ($("#cbAllTask").prop("checked")) {
            if ($("#slTrackingStageStatus").val() == "" && !($("#cbIsClearanceTask").prop("checked")))
                pTablesHTML += '                                     <th style="width:20%;">All Tasks</th>';
            else if ($("#slTrackingStageStatus").val() == 0 && !($("#cbIsClearanceTask").prop("checked")))
                pTablesHTML += '                                     <th style="width:20%;">Not Done Tasks</th>';
            else if ($("#slTrackingStageStatus").val() == 1 && !($("#cbIsClearanceTask").prop("checked")))
                pTablesHTML += '                                     <th style="width:20%;">Done Tasks</th>';
            else if ($("#slTrackingStageStatus").val() == "" && $("#cbIsClearanceTask").prop("checked"))
                pTablesHTML += '                                     <th style="width:20%;">All Clearance Tasks</th>';
            else if ($("#slTrackingStageStatus").val() == 0 && $("#cbIsClearanceTask").prop("checked"))
                pTablesHTML += '                                     <th style="width:20%;">Clearance Tasks Not Done</th>';
            else if ($("#slTrackingStageStatus").val() == 1 && $("#cbIsClearanceTask").prop("checked"))
                pTablesHTML += '                                     <th style="width:20%;">Clearance Tasks Done</th>';
        }
        if ($("#cbNetwork").prop("checked")) {
            if (pDefaults.UnEditableCompanyName == "UNV") {
                if (!$('#cbGroupByNetwork').is(':checked'))
                    pTablesHTML += '                                     <th>WareHouse</th>';
            } else {
                pTablesHTML += '                                     <th>Agent Network</th>';
            }
        }


        if ($("#cbMoveTypeName").prop("checked"))
            pTablesHTML += '                                     <th>Service Type</th>';
        if ($("#cbGrossWeightSum").prop("checked")) {
            pTablesHTML += '                                     <th class="GrossWeightSum">Gross(KG)</th>';
            if (pDefaults.UnEditableCompanyName != "UNV")
                pTablesHTML += '                                     <th class="GrossWeightTonSum">Gross(TON)</th>';
        }
        if ($("#cbNetWeightSum").prop("checked")) {
            pTablesHTML += '                                     <th>Net(KG)</th>';
            if (pDefaults.UnEditableCompanyName != "UNV")
                pTablesHTML += '                                     <th>Net(TON)</th>';
        }
        if ($("#cbVolumeSum").prop("checked"))
            pTablesHTML += '                                     <th>Vol(CBM)</th>';
        if ($("#cbChargeableWeightSum").prop("checked"))
            pTablesHTML += '                                     <th>Chg.Wt</th>';
        if ($("#cbCertificateNumber").prop("checked"))
            pTablesHTML += '                                     <th>Cert.No.</th>';
        if ($("#cbCertificateValue").prop("checked"))
            pTablesHTML += '                                     <th>Cert.Val.</th>';
        if ($("#cbCertificateDate").prop("checked"))
            pTablesHTML += '                                     <th>Cert.Date</th>';
        if ($("#cbQasimaNumber").prop("checked"))
            pTablesHTML += '                                     <th>Qasima No</th>';
        if ($("#cbQasimaDate").prop("checked")) {
            if (pDefaults.UnEditableCompanyName == "UNV")
                pTablesHTML += '                                     <th>تاريخ سحب الإذن</th>';
            else
                pTablesHTML += '                                     <th>QasimaDate</th>';
        }
        if ($("#cbForm13Number").prop("checked"))
            pTablesHTML += '                                     <th>Form13</th>';
        if ($("#cbForm13Date").prop("checked"))
            pTablesHTML += '                                     <th>Form13Date</th>';
        if ($("#cbCloseDate").prop("checked"))
            pTablesHTML += '                                     <th>CloseDate</th>';
        if ($("#cbCreator").prop("checked"))
            pTablesHTML += '                                     <th>Created By</th>';

        //to be removed in case of slow report
        if ($("#cbCustomerNetwork").prop("checked"))
            pTablesHTML += '                                     <th>Customer Network</th>';
        if ($("#cbClearanceType").prop("checked"))
            pTablesHTML += '                                     <th>C.Clearance Type</th>';

        if ($("#cbOperationMan").prop("checked"))
            pTablesHTML += '                                     <th>Operation Man</th>';
        if ($("#cbReceivables").prop("checked") || ($("#cbMargin").prop("checked") && pOutputTo == "Excel"))
            pTablesHTML += '                                     <th>Rec./Revenue</th>';
        if ($("#cbPayables").prop("checked") || pDefaults.UnEditableCompanyName == "MIL" || ($("#cbMargin").prop("checked") && pOutputTo == "Excel"))
            pTablesHTML += '                                     <th>Payables/Cost</th>';
        if ($("#cbPorc").prop("checked"))
            pTablesHTML += '                                     <th>P/C</th>';
        if ($("#cbCreationDate").prop("checked"))
            pTablesHTML += '                                     <th>Creation Date</th>';


        // get all different currencies
        var CurrenciesArray = [];
        if (IsWithCurrenciesDetailed) {
            debugger;
            $.each((pReportRowsWithDetailedCurrencies), function (i, item) {
                var AllCurrencies = item.AllCurrencies;
                if (AllCurrencies != "") {
                    var NewCurrenciesArray = AllCurrencies.split("*");
                    for (let j = 0; j < NewCurrenciesArray.length; j++) {
                        if (!CurrenciesArray.includes(NewCurrenciesArray[j])) {
                            CurrenciesArray.push(NewCurrenciesArray[j]);
                        }
                    }

                }
            })
        }

        if (IsWithCurrenciesDetailed && ($("#cbReceivablesWithCurrencies").prop("checked") || ($("#cbMargin").prop("checked") && pOutputTo == "Excel")))
            pTablesHTML += '                                     <th>Receivables With Currencies</th>';
        if (IsWithCurrenciesDetailed && ($("#cbPayablesWithCurrencies").prop("checked") || pDefaults.UnEditableCompanyName == "MIL" || ($("#cbMargin").prop("checked") && pOutputTo == "Excel")))
            pTablesHTML += '                                     <th>Payables With Currencies</th>';

        if (IsWithCurrenciesDetailed/* && ($("#cbReceivablesWithCurrencies").prop("checked") || ($("#cbMargin").prop("checked") && pOutputTo == "Excel"))*/) {
            $.each((CurrenciesArray), function (i, item) {
                pTablesHTML += '                                     <th>Receivables ' + item + '</th>';
            })
        }
        if (IsWithCurrenciesDetailed/* && ($("#cbPayablesWithCurrencies").prop("checked") || pDefaults.UnEditableCompanyName == "MIL" || ($("#cbMargin").prop("checked") && pOutputTo == "Excel"))*/) {
            $.each((CurrenciesArray), function (i, item) {
                pTablesHTML += '                                     <th>Payables ' + item + '</th>';
            })
        }




        //if ($("#cbProfit").prop("checked") || ($("#cbMargin").prop("checked") && pOutputTo == "Excel"))
        if ($("#cbProfit").prop("checked"))
            pTablesHTML += '                                     <th ' + ($("#cbProfit").prop("checked") || ($("#cbMargin").prop("checked") && pOutputTo == "Excel") ? "" : "hide") + '>Profit</th>';

        if ($("#cbMargin").prop("checked"))
            pTablesHTML += '                                     <th ' + ($("#cbMargin").prop("checked") ? "" : "hide") + '>Margin(%)</th>';
        if ($("#cbCourier").prop("checked"))
            pTablesHTML += '                                     <th>Courier No</th>';

        if ($("#cbShipmentType").prop("checked"))
            pTablesHTML += '                                     <th>Shipment Type</th>';
        if ($("#cbACIDNo").prop("checked"))
            pTablesHTML += '                                     <th>ACID Number</th>';
        if ($("#cbReceivingDate").prop("checked"))
            pTablesHTML += '                                     <th>Receiving Date</th>';
        if ($("#cbDODate").prop("checked"))
            pTablesHTML += '                                     <th>D/O Date</th>';
        if ($("#cbFreeTime").prop("checked"))
            pTablesHTML += '                                     <th>Free Days</th>';
        if ($("#cbTransientTime").prop("checked"))
            pTablesHTML += '                                     <th>Transit Time</th>';
        if ($("#cbNotes").prop("checked"))
            pTablesHTML += '                                     <th>Daily Update</th>';
        if ($("#cbNotes2").prop("checked"))
            pTablesHTML += '                                     <th>Notes</th>';
        if ($("#cbDaysFromOpeningFile").prop("checked"))
            pTablesHTML += '                                     <th>Days From Opening File</th>';
        if ($("#cbDaysFromOpeningCertificate").prop("checked"))
            pTablesHTML += '                                     <th>Days From Opening Certificate</th>';
        if ($("#cbCCAVATCertificateValue").prop("checked"))
            pTablesHTML += '                                     <th>CCA VATCertificateValue</th>';
        if ($("#cbCCACommercialProfitTax").prop("checked"))
            pTablesHTML += '                                     <th>CCA CommercialProfitTax</th>';
        if ($("#cbCCACustomsValue").prop("checked"))
            pTablesHTML += '                                     <th>CCA CustomsValue</th>';
        if ($("#cbCCAStorageFees").prop("checked"))
            pTablesHTML += '                                     <th>CCA StorageFees</th>';
        if ($("#cbCCAWindowFees").prop("checked"))
            pTablesHTML += '                                     <th>CCA WindowFees</th>';
        if ($("#cbCCAExchangeRate").prop("checked"))
            pTablesHTML += '                                     <th>CCA ExchangeRate</th>';
        if ($("#cbCCASpendDate").prop("checked"))
            pTablesHTML += '                                     <th>CCA SpendDate</th>';
        if ($("#cbCCAOthers").prop("checked"))
            pTablesHTML += '                                     <th>CCA Others</th>';
        if ($("#cbTankNo").prop("checked"))
            pTablesHTML += '                                     <th>Tank No</th>';
        if ($("#cbTankNoUNF").prop("checked"))
            pTablesHTML += '                                     <th>P/C.</th>';
        let ChargeTypeIDs;
        let ChargeTypeIDsArray;
        let ChargeTypeNamesArray;



        if (IsWithChargesDetailed) {
            debugger;

            ChargeTypeIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbChargesTypes");
            ChargeTypeIDsArray = ChargeTypeIDs.split(",");
            ChargeTypeNamesArray = ChargeTypeIDsArray.map((ChargeTypeID) => AllChargeTypes.filter((ChargeType) => ChargeType.ID == ChargeTypeID)[0].Name);

            if ($("#cbReceivables").prop("checked")) {
                for (let i = 0; i < ChargeTypeIDsArray.length; i++) {
                    let CurrentChargeTypeID = ChargeTypeIDsArray[i];
                    let CurrentChargeTypeName = ChargeTypeNamesArray[i];
                    let CurrenciesArrayForThisChargeType = [];

                    // Calculate CurrenciesArrayForThisChargeType
                    OperationsReceivables.forEach((item) => {
                        if (!CurrenciesArrayForThisChargeType.includes(item.CurrencyCode) && CurrentChargeTypeID == item.ChargeTypeID)
                            CurrenciesArrayForThisChargeType.push(item.CurrencyCode);
                    });

                    CurrenciesArrayForThisChargeType.forEach((Currency) => {
                        pTablesHTML += `                        <th>${CurrentChargeTypeName} - Receivable - ${Currency}</th>`;
                    })
                }
            }

            if ($("#cbPayables").prop("checked")) {
                for (let i = 0; i < ChargeTypeIDsArray.length; i++) {
                    let CurrentChargeTypeID = ChargeTypeIDsArray[i];
                    let CurrentChargeTypeName = ChargeTypeNamesArray[i];
                    let CurrenciesArrayForThisChargeType = [];

                    // Calculate CurrenciesArrayForThisChargeType
                    OperationsPayables.forEach((item) => {
                        if (!CurrenciesArrayForThisChargeType.includes(item.CurrencyCode) && CurrentChargeTypeID == item.ChargeTypeID)
                            CurrenciesArrayForThisChargeType.push(item.CurrencyCode);
                    });

                    CurrenciesArrayForThisChargeType.forEach((Currency) => {
                        pTablesHTML += `                        <th>${CurrentChargeTypeName} - Payable - ${Currency}</th>`;
                    })
                }
            }
        }
        if ($("#cbDocInfo").prop("checked"))
            pTablesHTML += '                                     <th>Doc Info</th>';
        debugger;
       
        if (pDefaults.UnEditableCompanyName == "COS") {
            if ($("#cbInvoiceStageDate").prop("checked"))
                pTablesHTML += '                                     <th>Invoice Stage Date</th>';
            if ($("#cbInvoiceStagePeriod").prop("checked"))
                pTablesHTML += '                                     <th>Invoice Stage Period</th>';
        }

        pTablesHTML += '                                 </tr>';
        pTablesHTML += '                             </thead>';
        pTablesHTML += '                             <tbody>';
        //debugger;
        //$.each(JSON.parse(pReportRows), function (i, item) { debugger; });
        debugger;

     
        $.each(group.Data, function (i, item) {

            if (['MED', 'BOM', 'ORI'].includes(pDefaults.UnEditableCompanyName) && pOutputTo == "Excel") {
                if (item.Notes != null && item.Notes != undefined && item.Notes.includes("\n")) {
                    item.Notes = item.Notes.replaceAll("\n", " ");
                }
                if (item.Notes2 != null && item.Notes2 != undefined && item.Notes2.includes("\n")) {
                    item.Notes2 = item.Notes2.replaceAll("\n", " ");
                }
            }
            pTablesHTML += '                                     <tr style="font-size:90%;">';
            pTablesHTML += '                                         <td class="' + (item.BLType != constHouseBLType ? 'classNotHouse' : '') + '">' + (item.Code == 0 ? "" : item.Code) + '</td>';

            if ($("#cbReferenceNumber").prop("checked"))
                pTablesHTML += '                                         <td>' + item.ReferenceNumber + '</td>';

            if ($("#cbOperationWithInvoiceSerial").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.OperationWithInvoiceSerial == 0 ? "" : item.OperationWithInvoiceSerial) + '</td>';
            if ($("#cbBranch").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.BranchName == 0 ? "" : item.BranchName) + '</td>';
            if ($("#cbSalesman").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.Salesman == 0 ? "" : item.Salesman) + '</td>';
            if ($("#cbIssueDate").prop("checked"))
                //pTablesHTML += '                                         <td>' + (item.OpenDate == "/Date(-2208996000000)/" ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.OpenDate)) + '\u2008')) + '</td>'; // I added Punctuation Space '\u2008' to force excel to deal it as a string
                pTablesHTML += '                                         <td>' + (item.OpenDate == "/Date(-2208996000000)/" ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.OpenDate)))) + '</td>'; // I added Punctuation Space '\u2008' to force excel to deal it as a string
            //pTablesHTML += '                                         <td>' + (item.OpenDate == "/Date(-2208996000000)/" ? "" : (new Date(GetDateWithFormatMDY(item.OpenDate)).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }))) + '</td>'; // I added Punctuation Space '\u2008' to force excel to deal it as a string
            //pTablesHTML += '                                         <td>' + (item.OpenDate == "/Date(-2208996000000)/" ? "" : (GetDateWithFormatMDY(item.OpenDate))) + '</td>'; // I added Punctuation Space '\u2008' to force excel to deal it as a string
            //pTablesHTML += '                                         <td>' + (item.OpenDate == "/Date(-2208996000000)/" ? "" : (new Date(1 * item.OpenDate.substring(6, item.OpenDate.length - 2)))) + '</td>'; // I added Punctuation Space '\u2008' to force excel to deal it as a string
            if ($("#cbOperState").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.OperationStageName == 0 ? "" : item.OperationStageName) + '</td>';
            //pTablesHTML += '                                         <td>' + (item.RepTransportTypeShown == 0 ? "" : item.RepTransportTypeShown) + ' ' + (item.ShipmentTypeCode == 0 ? "" : item.ShipmentTypeCode) + '</td>';
            if ($("#cbBookingParty").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.BookingPartyName == 0 ? "" : item.BookingPartyName) + '</td>';
            if ($("#cbClient").prop("checked")) {
                if (pDefaults.UnEditableCompanyName == "UNF") {

                    if (item.DirectionType == 1) {
                        pTablesHTML += '                                         <td>' + (item.ConsigneeName == 0 ? "" : item.ConsigneeName) + '</td>';

                    } else {
                        pTablesHTML += '                                         <td>' + (item.ShipperName == 0 ? "" : item.ShipperName) + '</td>';

                    }
                } else {
                    pTablesHTML += '                                         <td>' + (item.ClientName == 0 ? "" : item.ClientName) + '</td>';

                }
            }
            if ($("#cbShipper").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.ShipperName == 0 ? "" : item.ShipperName) + '</td>';
            if ($("#cbConsignee").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.ConsigneeName == 0 ? "" : item.ConsigneeName) + '</td>';
            if ($("#cbEndUser").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.EndUserName == 0 ? "" : item.EndUserName) + '</td>';
            if ($("#cbAgent").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.AgentName == 0 ? "" : item.AgentName) + '</td>';
            if ($("#cbCustomsClearanceAgent").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.CustomsClearanceAgentName == 0 ? "" : item.CustomsClearanceAgentName) + '</td>';
            if ($("#cbNotify").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.Notify1Name == 0 ? "" : item.Notify1Name) + '</td>';
            if ($("#cbLine").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.LineName == 0 ? "" : item.LineName) + '</td>';
            if ($("#cbCommodity").prop("checked")) {
                pTablesHTML += '                                         <td>' + (item.CommodityName == 0 ? "" : item.CommodityName) + " - " + (item.CommodityName2 == 0 ? "" : item.CommodityName2) + " - " + (item.CommodityName3 == 0 ? "" : item.CommodityName3) + '</td>';
            }

            if ($("#cbIncoterm").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.IncotermName == 0 ? "" : item.IncotermName) + '</td>';
            if ($("#cbQuotation").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.QuotationRouteCode == 0 ? "" : item.QuotationRouteCode) + '</td>';
            if ($("#cbContainerTypes").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.ContainerTypes == 0 ? "" : item.ContainerTypes) + '</td>';
            if ($("#cbContainerNumbers").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.ContainerNumbers == 0 ? "" : item.ContainerNumbers) + '</td>';
            if ($("#cbPackages").prop("checked")) {
                if (pDefaults.UnEditableCompanyName == "UNV" && item.PackageTypes != null && item.PackageTypesOnContainersTotals != null) {
                    item.PackageTypes = item.PackageTypes.substring(0, item.PackageTypes.indexOf('x'));
                    item.PackageTypesOnContainersTotals = item.PackageTypesOnContainersTotals.substring(0, item.PackageTypesOnContainersTotals.indexOf('x'));
                }
                pTablesHTML += '                                         <td>' + (item.PackageTypes == 0 ? (item.PackageTypesOnContainersTotals == 0 ? "" : item.PackageTypesOnContainersTotals) : item.PackageTypes) + '</td>';
            }
            if ($("#cbDescriptionOfGoods").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.DescriptionOfGoods == 0 ? "" : item.DescriptionOfGoods) + '</td>';
            if ($("#cbInvoices").prop("checked"))
                pTablesHTML += '                                         <td style="font-size:90%;text-align:left;">' + (item.InvoiceNumbers == 0 ? "" : item.InvoiceNumbers.replace(/\,/g, "<br/>")) + '</td>';

            if ($("#cbInvoiceDate").prop("checked")) {
                if (item.FirstInvoiceDate.includes("-")) { // means date format is like 01-Jan-00 12:00:00 AM
                    pTablesHTML += '                                         <td>' + (item.FirstInvoiceDate.substr(0, 9) == '01-Jan-00' ? "" : ConvertDateFormat(item.FirstInvoiceDate.substring(0, item.FirstInvoiceDate.indexOf(' ')))) + '</td>';
                } else {    // means date format is like 1/1/1900
                    pTablesHTML += '                                         <td>' + (item.FirstInvoiceDate.substr(0, 8) == '1/1/1900' ? "" : ConvertDateFormat(item.FirstInvoiceDate.substring(0, item.FirstInvoiceDate.indexOf(' ')))) + '</td>';
                }
            }

            //if (item.RepTransportTypeShown == "AIR" || item.ShipmentTypeCode == "LCL" || item.ShipmentTypeCode == "LTL")
            //    pTablesHTML += '                                     <td>' + (item.PackageTypes == 0 ? "" : item.PackageTypes) + '</td>';
            //else
            //    pTablesHTML += '                                     <td>' + (item.ContainerTypes == 0 ? "" : item.ContainerTypes) + '</td>';
            if ($("#cbCustomerRef").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.CustomerReference == 0 ? "" : item.CustomerReference) + '</td>';

            if ($("#cbPONo").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.PONumber == 0 ? "" : item.PONumber) + '</td>';
            if ($("#cbPODate").prop("checked"))
                pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/2001", GetDateWithFormatMDY(item.PODate)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.PODate)))) + '</td>';
            if ($("#cbPOValue").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.POValue == 0 ? "" : item.POValue) + '</td>';
            if ($("#cbCCADocumentReceiveDate").prop("checked"))
                pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/2001", GetDateWithFormatMDY(item.CCADocumentReceiveDate)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.CCADocumentReceiveDate)))) + '</td>';
            if ($("#cbReleaseNo").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.ReleaseNumber == 0 ? "" : item.ReleaseNumber) + '</td>';
            if ($("#cbReleaseDate").prop("checked"))
                pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/2001", GetDateWithFormatMDY(item.ReleaseDate)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.ReleaseDate)))) + '</td>';
            if ($("#cbReleaseValue").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.ReleaseValue == 0 ? "" : item.ReleaseValue) + '</td>';

            if ($("#cbSupplierRef").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.SupplierReference == 0 ? "" : item.SupplierReference) + '</td>';
            if ($("#cbMBL").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.MasterBL == 0 ? "" : item.MasterBL) + '</td>';
            if ($("#cbHBL").prop("checked"))
                //pTablesHTML += '                                         <td>' + (item.HouseNumber == 0 ? "" : item.HouseNumber) + '</td>';
                pTablesHTML += '                                         <td>' + (item.HouseNumber == 0 ? item.HouseBLs : item.HouseNumber) + '</td>';
            if ($("#cbCarrier").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.LineName == 0 ? "" : item.LineName) + '</td>';
            if ($("#cbTrucker").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.TruckersName == 0 ? "" : item.TruckersName) + '</td>';
            if ($("#cbBookingNo").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.BookingNumbers == 0 ? "" : item.BookingNumbers) + '</td>';
            if ($("#cbTEUs").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.TEUs == 0 || item.TransportType == 2 ? "" : item.TEUs) + '</td>';
            if ($("#cbVessel").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.VesselName == 0 ? "" : item.VesselName) + '</td>';
            if ($("#cbVoy").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.VoyageOrTruckNumber == 0 ? "" : item.VoyageOrTruckNumber) + '</td>';
            if ($("#cbPOL").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.POLCountryCode + ": " + item.POLName) + '</td>';
            if ($("#cbPOD").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.PODCountryCode + ": " + item.PODName) + '</td>';
            debugger;
            if ($("#cbChassisNumbers").prop("checked"))
                pTablesHTML += '                                         <td>' + ((item.ChassisNumbers && item.ChassisNumbers != "0")? item.ChassisNumbers :  "")+ '</td>';
            if ($("#cbCutOffDate").prop("checked"))
                pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/2001", GetDateWithFormatMDY(item.CutOffDate)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.CutOffDate)))) + '</td>';
            //pTablesHTML += '                                         <td>' + (item.OpenDate == "/Date(-2208996000000)/" ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.OpenDate))) + '</td>';
            //pTablesHTML += '                                         <td>' + (item.CloseDate == "/Date(-2208996000000)/" ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.CloseDate))) + '</td>';
            //pTablesHTML += '                                         <td>' + (item.ActualArrival == "/Date(-2208996000000)/" ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ActualArrival))) + '</td>';
            if ($("#cbETAPOL").prop("checked"))
                pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/2001", GetDateWithFormatMDY(item.ETAPOLDate)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.ETAPOLDate)))) + '</td>';
            if ($("#cbETDPOL").prop("checked")) {
                if (pDefaults.UnEditableCompanyName == "NAJ") {
                    pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/2001", GetDateWithFormatMDY(item.ExpectedDeparture)) < 1 ? "" : (GetFullDateTime_DD_MM_YY(item.ExpectedDeparture).replaceAll("-", "/"))) + '</td>';
                } else {
                    pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/2001", GetDateWithFormatMDY(item.ExpectedDeparture)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.ExpectedDeparture)))) + '</td>';
                }
            }
            if ($("#cbATDPOL").prop("checked"))
                pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/2001", GetDateWithFormatMDY(item.ActualDeparture)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.ActualDeparture)))) + '</td>';
            if ($("#cbETAPOD").prop("checked"))
                pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/2001", GetDateWithFormatMDY(item.ExpectedArrival)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.ExpectedArrival)))) + '</td>';
            if ($("#cbATAPOD").prop("checked"))
                pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/2001", GetDateWithFormatMDY(item.ActualArrival)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.ActualArrival)))) + '</td>';
            if ($("#cbTask").prop("checked")) {
                if (pDefaults.UnEditableCompanyName == "ORI" && pOutputTo == "Excel") {
                    item.TrackingStageName = removeDates(item.TrackingStageName == 0 ? "" : item.TrackingStageName);
                }
                pTablesHTML += '                                         <td style="width: 20%;">' + ($("#slTrackingStage").val() == "" ? (item.TrackingStageName == 0 ? "" : item.TrackingStageName.replace(/\,/g, "<br/>")) : $("#slTrackingStage option:selected").text()) + '</td>';
            }
            if ($("#cbAllTask").prop("checked")) {
                if (pDefaults.UnEditableCompanyName == "ORI" && pOutputTo == "Excel") {
                    debugger;
                    if ($("#slTrackingStageStatus").val() == "" && !($("#cbIsClearanceTask").prop("checked")))
                        item.AllTrackingStages = removeDatesAndAst(item.AllTrackingStages == 0 ? "" : item.AllTrackingStages);
                    else if ($("#slTrackingStageStatus").val() == 0 && !($("#cbIsClearanceTask").prop("checked")))
                        item.AllTrackingStages_NotDone = removeDatesAndAst(item.AllTrackingStages_NotDone == 0 ? "" : item.AllTrackingStages_NotDone);
                    else if ($("#slTrackingStageStatus").val() == 1 && !($("#cbIsClearanceTask").prop("checked")))
                        item.AllTrackingStages_Done = removeDatesAndAst(item.AllTrackingStages_Done == 0 ? "" : item.AllTrackingStages_Done);
                    else if ($("#slTrackingStageStatus").val() == "" && $("#cbIsClearanceTask").prop("checked"))
                        item.AllTrackingStages_CC = removeDatesAndAst(item.AllTrackingStages_CC == 0 ? "" : item.AllTrackingStages_CC);
                    else if ($("#slTrackingStageStatus").val() == 0 && $("#cbIsClearanceTask").prop("checked"))
                        item.AllTrackingStages_CCNotDone = removeDatesAndAst(item.AllTrackingStages_CCNotDone == 0 ? "" : item.AllTrackingStages_CCNotDone);
                    else if ($("#slTrackingStageStatus").val() == 1 && $("#cbIsClearanceTask").prop("checked"))
                        item.AllTrackingStages_CCDone = removeDatesAndAst(item.AllTrackingStages_CCDone == 0 ? "" : item.AllTrackingStages_CCDone);
                }
                if ($("#slTrackingStageStatus").val() == "" && !($("#cbIsClearanceTask").prop("checked")))
                    pTablesHTML += '                                         <td style="font-size:90%;text-align:left;width:20%;">' + (item.AllTrackingStages == 0 ? "" : item.AllTrackingStages.replace(/\,/g, "<br/>").replace(/BoldStart/g, "<b><u>").replace(/BoldEnd/g, "</u></b>")) + '</td>';
                else if ($("#slTrackingStageStatus").val() == 0 && !($("#cbIsClearanceTask").prop("checked")))
                    pTablesHTML += '                                         <td style="font-size:90%;text-align:left;width:20%;">' + (item.AllTrackingStages_NotDone == 0 ? "" : item.AllTrackingStages_NotDone.replace(/\,/g, "<br/>").replace(/BoldStart/g, "<b><u>").replace(/BoldEnd/g, "</u></b>")) + '</td>';
                else if ($("#slTrackingStageStatus").val() == 1 && !($("#cbIsClearanceTask").prop("checked")))
                    pTablesHTML += '                                         <td style="font-size:90%;text-align:left;width:20%;">' + (item.AllTrackingStages_Done == 0 ? "" : item.AllTrackingStages_Done.replace(/\,/g, "<br/>").replace(/BoldStart/g, "<b><u>").replace(/BoldEnd/g, "</u></b>")) + '</td>';
                else if ($("#slTrackingStageStatus").val() == "" && $("#cbIsClearanceTask").prop("checked"))
                    pTablesHTML += '                                         <td style="font-size:90%;text-align:left;width:20%;">' + (item.AllTrackingStages_CC == 0 ? "" : item.AllTrackingStages_CC.replace(/\,/g, "<br/>").replace(/BoldStart/g, "<b><u>").replace(/BoldEnd/g, "</u></b>")) + '</td>';
                else if ($("#slTrackingStageStatus").val() == 0 && $("#cbIsClearanceTask").prop("checked"))
                    pTablesHTML += '                                         <td style="font-size:90%;text-align:left;width:20%;">' + (item.AllTrackingStages_CCNotDone == 0 ? "" : item.AllTrackingStages_CCNotDone.replace(/\,/g, "<br/>").replace(/BoldStart/g, "<b><u>").replace(/BoldEnd/g, "</u></b>")) + '</td>';
                else if ($("#slTrackingStageStatus").val() == 1 && $("#cbIsClearanceTask").prop("checked"))
                    pTablesHTML += '                                         <td style="font-size:90%;text-align:left;width:20%;">' + (item.AllTrackingStages_CCDone == 0 ? "" : item.AllTrackingStages_CCDone.replace(/\,/g, "<br/>").replace(/BoldStart/g, "<b><u>").replace(/BoldEnd/g, "</u></b>")) + '</td>';
            }
            if ($("#cbNetwork").prop("checked") && !$('#cbGroupByNetwork').is(':checked'))
                pTablesHTML += '                                         <td>' + (item.NetworkName == 0 ? "" : item.NetworkName) + '</td>';

            if ($("#cbMoveTypeName").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.MoveTypeName == 0 ? "" : item.MoveTypeName) + '</td>';
            if ($("#cbGrossWeightSum").prop("checked")) {
                pTablesHTML += '                                         <td class="' + (item.BLType == constHouseBLType ? '' : 'GrossWeightSum') + '">' + (item.GrossWeightSum == 0 ? "" : item.GrossWeightSum) + '</td>';
                if (pDefaults.UnEditableCompanyName != "UNV")
                    pTablesHTML += '                                         <td class="' + (item.BLType == constHouseBLType ? '' : 'GrossWeightTONSum') + '">' + (item.GrossWeightTONSum == 0 ? "" : item.GrossWeightTONSum) + '</td>';
                grossWgtKg += item.GrossWeightSum;
                grossWgtTn += item.GrossWeightTONSum;
            }
            if ($("#cbNetWeightSum").prop("checked")) {
                pTablesHTML += '                                         <td class="' + (item.BLType == constHouseBLType ? '' : 'NetWeightSum') + '">' + (item.NetWeightSum == 0 ? "" : item.NetWeightSum) + '</td>';
                if (pDefaults.UnEditableCompanyName != "UNV")
                    pTablesHTML += '                                         <td class="' + (item.BLType == constHouseBLType ? '' : 'NetWeightTONSum') + '">' + (item.NetWeightTONSum == 0 ? "" : item.NetWeightTONSum) + '</td>';
            }
            if ($("#cbVolumeSum").prop("checked"))
                pTablesHTML += '                                         <td class="' + (item.BLType == constHouseBLType ? '' : 'VolumeSum') + '">' + (item.VolumeSum == 0 ? "" : item.VolumeSum) + '</td>';
            if ($("#cbChargeableWeightSum").prop("checked"))
                pTablesHTML += '                                         <td class="' + (item.BLType == constHouseBLType ? '' : 'ChargeableWeightSum') + '">' + (item.ChargeableWeight == 0 ? "" : item.ChargeableWeight) + '</td>';
            if ($("#cbCertificateNumber").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.CertificateNumber == 0 ? "" : item.CertificateNumber) + '</td>';
            if ($("#cbCertificateValue").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.CertificateValue == 0 ? "" : item.CertificateValue) + '</td>';
            if ($("#cbCertificateDate").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.CertificateDate == 0 ? "" : (item.CertificateDate)) + '</td>';
            if ($("#cbQasimaNumber").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.QasimaNumber == 0 ? "" : item.QasimaNumber) + '</td>';
            if ($("#cbQasimaDate").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.QasimaDate == 0 ? "" : (item.QasimaDate)) + '</td>';
            if ($("#cbForm13Number").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.Form13Number == 0 ? "" : item.Form13Number) + '</td>';
            if ($("#cbForm13Date").prop("checked"))
                pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/2001", GetDateWithFormatMDY(item.Form13Date)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.Form13Date)))) + '</td>';
            if ($("#cbCloseDate").prop("checked"))
                pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/2001", GetDateWithFormatMDY(item.CloseDate)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.CloseDate)))) + '</td>';
            if ($("#cbCreator").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.CreatorName == 0 ? "" : item.CreatorName) + '</td>';

            //to be removed in case of slow report
            if ($("#cbCustomerNetwork").prop("checked"))
                pTablesHTML += '                                         <td>' + IsNull(item.NetworksNames, "") + '</td>';
            if ($("#cbClearanceType").prop("checked"))
                pTablesHTML += '                                         <td>' + IsNull(item.CC_ClearanceTypeName, "") + '</td>';

            if ($("#cbOperationMan").prop("checked"))
                pTablesHTML += '                                         <td class="classOperationMan">' + (item.OperationManName == 0 ? "" : item.OperationManName) + '</td>';
            //if ($("#cbReceivables").prop("checked"))
            if ($("#cbReceivables").prop("checked") || ($("#cbMargin").prop("checked") && pOutputTo == "Excel"))
                //pTablesHTML += '                                         <td class="classReceivables ' + ($("#cbReceivables").prop("checked") || ($("#cbMargin").prop("checked") && pOutputTo == "Excel") ? "" : "hide") + '">'
                pTablesHTML += '                                         <td class="classReceivables">'
                    + ($("#cbIsWithoutVAT").prop("checked")
                        ? (item.ReceivablesWithoutVAT - item.FixedDiscount).toFixed(2)
                        : (item.Receivables - item.FixedDiscount).toFixed(2)
                    )
                    + '</td>';
            //if ($("#cbPayables").prop("checked"))
            if ($("#cbPayables").prop("checked") || pDefaults.UnEditableCompanyName == "MIL" || ($("#cbMargin").prop("checked") && pOutputTo == "Excel"))
                //pTablesHTML += '                                         <td class="classPayables ' + ($("#cbPayables").prop("checked") || pDefaults.UnEditableCompanyName == "MIL" || ($("#cbMargin").prop("checked") && pOutputTo == "Excel") ? "" : "hide") + '">'
                pTablesHTML += '                                         <td class="classPayables">'
                    + ($("#cbIsWithoutVAT").prop("checked")
                        ? item.PayablesWithoutVAT.toFixed(2)
                        : item.Payables.toFixed(2)
                    )
                    + '</td>';

            if ($("#cbPorc").prop("checked")) {
                debugger;
                let itemPorc = "";
                switch (item.POrC) {
                    case 0:
                        itemPorc = "";
                        break;
                    case 1:
                        itemPorc = "Collect";
                        break;
                    case 3:
                        itemPorc = "Prepaid";
                        break;
                    case 40:
                        itemPorc = "Payable";
                        break;
                    default:
                        itemPorc = "";
                };
                pTablesHTML += '                                         <td class="classPorc">' + (itemPorc) + '</td>';
            }
            if ($("#cbCreationDate").prop("checked")) {
                debugger;
                let opDate = OperationsCreationDate.find(obj => obj.ID === item.ID);
                pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/2001", GetDateWithFormatMDY(opDate.CreationDate)) < 1 ? "" : (GetFullDateTime_DD_MM_YY_hh_mm(opDate.CreationDate))) + '</td>';
            }

            //////////////////////////


            if (IsWithCurrenciesDetailed && ($("#cbReceivablesWithCurrencies").prop("checked") || ($("#cbMargin").prop("checked") && pOutputTo == "Excel")))
                pTablesHTML += '                                         <td class="classReceivables">'
                    + ($("#cbIsWithoutVAT").prop("checked")
                        ? (pReportRowsWithDetailedCurrencies[i].ReceivablesWithoutVATCurrencies/* - item.FixedDiscount*/)
                        : (pReportRowsWithDetailedCurrencies[i].ReceivablesWithVATSumCurrencies/* - item.FixedDiscount*/)
                    )
                    + '</td>';

            if (IsWithCurrenciesDetailed && ($("#cbPayablesWithCurrencies").prop("checked") || pDefaults.UnEditableCompanyName == "MIL" || ($("#cbMargin").prop("checked") && pOutputTo == "Excel")))
                pTablesHTML += '                                         <td class="classPayables">'
                    + ($("#cbIsWithoutVAT").prop("checked")
                        ? pReportRowsWithDetailedCurrencies[i].PayablesWithoutVATSumCurrencies
                        : pReportRowsWithDetailedCurrencies[i].PayablesWithVATSumCurrencies
                    )
                    + '</td>';

            if (IsWithCurrenciesDetailed/* && ($("#cbReceivablesWithCurrencies").prop("checked") || ($("#cbMargin").prop("checked") && pOutputTo == "Excel"))*/) {
                var ReceivablesDetailedCurrencies = $("#cbIsWithoutVAT").prop("checked")
                    ? (pReportRowsWithDetailedCurrencies[i].ReceivablesWithoutVATCurrencies/* - item.FixedDiscount*/)
                    : (pReportRowsWithDetailedCurrencies[i].ReceivablesWithVATSumCurrencies/* - item.FixedDiscount*/);
                // extract values for each Currency from ReceivablesDetailedCurrencies ex. **EGP*114.00000*EGP***EUR*200.00000*EUR***GBP*300.00000*GBP***USD*400.00000*USD
                $.each((CurrenciesArray), function (i, cur) {
                    if (ReceivablesDetailedCurrencies.includes(cur)) {
                        ReceivablesDetailedCurrenciesArr = ReceivablesDetailedCurrencies.split(",");
                        let index = ReceivablesDetailedCurrenciesArr.findIndex(elem => elem.includes(cur));
                        var mySubString = ReceivablesDetailedCurrenciesArr[index].substring(0,
                            ReceivablesDetailedCurrenciesArr[index].lastIndexOf(cur));
                    }
                    //var mySubString = ReceivablesDetailedCurrencies.substring(
                    //    ReceivablesDetailedCurrencies.indexOf(cur + "*") + 4,
                    //    ReceivablesDetailedCurrencies.lastIndexOf("*" + cur)
                    //);
                    if (isNaN(parseFloat(mySubString))) {
                        pTablesHTML += '                                     <td class="' + cur + '">' + (0) + '</td>';
                    } else {
                        pTablesHTML += '                                     <td class="' + cur + '">' + (parseFloat(mySubString)) + '</td>';
                    }
                })
            }

            if (IsWithCurrenciesDetailed/* && ($("#cbPayablesWithCurrencies").prop("checked") || pDefaults.UnEditableCompanyName == "MIL" || ($("#cbMargin").prop("checked") && pOutputTo == "Excel"))*/) {
                var PayablesDetailedCurrencies = $("#cbIsWithoutVAT").prop("checked")
                    ? (pReportRowsWithDetailedCurrencies[i].PayablesWithoutVATSumCurrencies)
                    : (pReportRowsWithDetailedCurrencies[i].PayablesWithVATSumCurrencies);
                // extract values for each Currency from PayablesDetailedCurrencies ex. **EGP*114.00000*EGP***EUR*200.00000*EUR***GBP*300.00000*GBP***USD*400.00000*USD
                $.each((CurrenciesArray), function (i, cur) {
                    if (PayablesDetailedCurrencies.includes(cur)) {
                        PayablesDetailedCurrenciesArr = PayablesDetailedCurrencies.split(",");
                        let index = PayablesDetailedCurrenciesArr.findIndex(elem => elem.includes(cur));
                        var mySubString = PayablesDetailedCurrenciesArr[index].substring(0,
                            PayablesDetailedCurrenciesArr[index].lastIndexOf(cur));
                    }


                    if (isNaN(parseFloat(mySubString))) {
                        pTablesHTML += '                                     <td class="' + cur + '">' + (0) + '</td>';
                    } else {
                        pTablesHTML += '                                     <td class="' + cur + '">' + (parseFloat(mySubString)) + '</td>';
                    }
                })
            }

            if ($("#cbProfit").prop("checked"))
                pTablesHTML += '                                         <td class="classProfit ' + ($("#cbProfit").prop("checked") || ($("#cbMargin").prop("checked") && pOutputTo == "Excel") ? "" : "hide") + '">'
                    + ($("#cbIsWithoutVAT").prop("checked")
                        ? (item.ReceivablesWithoutVAT - item.PayablesWithoutVAT - item.FixedDiscount).toFixed(2)
                        : (item.Receivables - item.Payables - item.FixedDiscount).toFixed(2)
                    )
                    + '</td>';
            var _Margin = 0;
            if ($("#cbIsWithoutVAT").prop("checked"))
                _Margin = item.ReceivablesWithoutVAT == 0 ? 0 : (100 * (item.ReceivablesWithoutVAT - item.PayablesWithoutVAT - item.FixedDiscount) / item.ReceivablesWithoutVAT);
            else
                _Margin = item.Receivables == 0 ? 0 : (100 * (item.Receivables - item.Payables - item.FixedDiscount) / item.Receivables);
            if ($("#cbMargin").prop("checked"))
                pTablesHTML += '                                         <td class="classMargin ' + ($("#cbMargin").prop("checked") ? "" : "hide") + '">' + (_Margin == 0 ? 'N/A' : _Margin.toFixed(2)) + '</td>';

            if ($("#cbCourier").prop("checked"))
                pTablesHTML += '                                         <td>' + IsNull(item.MainRouteNotes, '') + '</td>';


            if (pOutputTo != "Excel") { // because class="hide appears in excel and adds a new column
                pTablesHTML += '                                             <td class="hide ' + (item.BLType == constHouseBLType ? "" : ('BranchID' + item.BranchID)) + '">' + '' + '</td>';
            }
            pTablesHTML += '                                             <td class="hide ' + (item.BLType == constHouseBLType ? "" : (' TransportType' + item.TransportType + ' DirectionType' + item.DirectionType)) + '">' + '' + '</td>';

            if ($("#cbShipmentType").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.ShipmentTypeCode == 0 ? "" : item.ShipmentTypeCode) + '</td>';
            if ($("#cbACIDNo").prop("checked") && ['MED', 'BOM', 'ORI'].includes(pDefaults.UnEditableCompanyName) && pOutputTo == "Excel") {
                pTablesHTML += '                                         <td>' + (item.ACIDNumber == 0 ? "" : item.ACIDNumber + '\t') + '</td>';
            } else if ($("#cbACIDNo").prop("checked")) {
                pTablesHTML += '                                         <td>' + (item.ACIDNumber == 0 ? "" : item.ACIDNumber) + '</td>';
            }
            if ($("#cbReceivingDate").prop("checked")) {
                if (pDefaults.UnEditableCompanyName == "MED")
                    pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/2001", GetDateWithFormatMDY(item.UnloadingDate)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.UnloadingDate)))) + '</td>';
                else
                    pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/2001", GetDateWithFormatMDY(item.CCADocumentReceiveDate)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.CCADocumentReceiveDate)))) + '</td>';
            }
            if ($("#cbDODate").prop("checked"))
                pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/2001", GetDateWithFormatMDY(item.DeliveryDate)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.DeliveryDate)))) + '</td>';
            if ($("#cbFreeTime").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.FreeTime == 0 ? "" : item.FreeTime) + '</td>';
            if ($("#cbTransientTime").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.TransientTime == 0 ? "" : item.TransientTime) + '</td>';
            if (pDefaults.UnEditableCompanyName == "UNV") {
                if ($("#cbNotes").prop("checked"))
                    pTablesHTML += '                                         <td style="min-width: 150px">' + (item.Notes == 0 ? "" : item.Notes.replaceAll("\n", "</br>")) + '</td>';
                if ($("#cbNotes2").prop("checked"))
                    pTablesHTML += '                                         <td style="min-width: 150px">' + (item.Notes2 == 0 ? "" : item.Notes2.replaceAll("\n", "</br>")) + '</td>';
            } else {
                if ($("#cbNotes").prop("checked"))
                    pTablesHTML += '                                         <td style="min-width: 400px">' + (item.Notes == 0 ? "" : item.Notes.replaceAll("\n", "</br>")) + '</td>';
                if ($("#cbNotes2").prop("checked"))
                    pTablesHTML += '                                         <td style="min-width: 400px">' + (item.Notes2 == 0 ? "" : item.Notes2.replaceAll("\n", "</br>")) + '</td>';
            }
            if ($("#cbDaysFromOpeningFile").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.OpenDate ? Date.prototype.compareDates(ConvertDateFormat(item.OpenDate), ConvertDateFormat((item.CloseDate && pDefaults.UnEditableCompanyName == "NIL") ? item.CloseDate : getTodaysDateInddMMyyyyFormat())) : "") + '</td>';
            if ($("#cbDaysFromOpeningCertificate").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.CertificateDate ? Date.prototype.compareDates(ConvertDateFormat(item.CertificateDate), ConvertDateFormat((item.ReleaseDate && pDefaults.UnEditableCompanyName == "NIL") ? item.ReleaseDate : getTodaysDateInddMMyyyyFormat())) : "") + '</td>';
            if ($("#cbCCAVATCertificateValue").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.CCAVATCertificateValue == 0 ? "" : item.CCAVATCertificateValue) + '</td>';
            if ($("#cbCCACommercialProfitTax").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.CCACommercialProfitTax == 0 ? "" : item.CCACommercialProfitTax) + '</td>';
            if ($("#cbCCACustomsValue").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.CCACustomsValue == 0 ? "" : item.CCACustomsValue) + '</td>';
            if ($("#cbCCAStorageFees").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.CCAStorageFees == 0 ? "" : item.CCAStorageFees) + '</td>';
            if ($("#cbCCAWindowFees").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.CCAWindowFees == 0 ? "" : item.CCAWindowFees) + '</td>';
            if ($("#cbCCAExchangeRate").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.CCAExchangeRate == 0 ? "" : item.CCAExchangeRate) + '</td>';
            if ($("#cbCCASpendDate").prop("checked")) {
                pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/2001", GetDateWithFormatMDY(item.CCASpendDate)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.CCASpendDate)))) + '</td>';
                //pTablesHTML += '                                         <td>' + (item.CCASpendDate ? GetDateWithFormatMDY(item.CCASpendDate) : "") + '</td>';
            }
            if ($("#cbCCAOthers").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.CCAOthers == 0 ? "" : item.CCAOthers) + '</td>';
            if ($("#cbTankNo").prop("checked")) {
                var opTankNo = TankNoLst.filter(function (obj) { return obj.OperationID == item.ID; });
                var strTankNo = '';
                $.each(opTankNo, function (i, tank) { strTankNo += tank.TankNo + '<br>'; });
                pTablesHTML += '                                         <td>' + strTankNo + '</td>';
            }
            if ($("#cbTankNoUNF").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.POrC == 1 ? "FC" : (item.POrC == 3 ? "FP" : "")) + '</td>';

            if (IsWithChargesDetailed) {
                debugger;

                if ($("#cbReceivables").prop("checked")) {
                    for (let i = 0; i < ChargeTypeIDsArray.length; i++) {
                        let CurrentChargeTypeID = ChargeTypeIDsArray[i];
                        let CurrentChargeTypeName = ChargeTypeNamesArray[i];
                        let CurrenciesArrayForThisChargeType = [];

                        // Calculate CurrenciesArrayForThisChargeType
                        OperationsReceivables.forEach((Receivable) => {
                            if (!CurrenciesArrayForThisChargeType.includes(Receivable.CurrencyCode) && CurrentChargeTypeID == Receivable.ChargeTypeID)
                                CurrenciesArrayForThisChargeType.push(Receivable.CurrencyCode);
                        });

                        CurrenciesArrayForThisChargeType.forEach((Currency) => {
                            let value = 0;
                            OperationsReceivables.forEach((Receivable) => {
                                if (Receivable.OperationID == item.ID && Receivable.ChargeTypeID == CurrentChargeTypeID && Receivable.CurrencyCode == Currency) {
                                    if (pDefaults.UnEditableCompanyName == "LIN" || pDefaults.UnEditableCompanyName == "TMP") {
                                        value += Receivable.SaleAmount;
                                    } else {
                                        value += Receivable.CostAmount;
                                    }

                                }
                            });
                            pTablesHTML += `                        <td>${value}</td>`;
                        });
                    }
                }

                if ($("#cbPayables").prop("checked")) {
                    for (let i = 0; i < ChargeTypeIDsArray.length; i++) {
                        let CurrentChargeTypeID = ChargeTypeIDsArray[i];
                        let CurrentChargeTypeName = ChargeTypeNamesArray[i];
                        let CurrenciesArrayForThisChargeType = [];

                        // Calculate CurrenciesArrayForThisChargeType
                        OperationsPayables.forEach((Receivable) => {
                            if (!CurrenciesArrayForThisChargeType.includes(Receivable.CurrencyCode) && CurrentChargeTypeID == Receivable.ChargeTypeID)
                                CurrenciesArrayForThisChargeType.push(Receivable.CurrencyCode);
                        });

                        CurrenciesArrayForThisChargeType.forEach((Currency) => {
                            let value = 0;
                            OperationsPayables.forEach((Receivable) => {
                                if (Receivable.OperationID == item.ID && Receivable.ChargeTypeID == CurrentChargeTypeID && Receivable.CurrencyCode == Currency) {
                                    value += Receivable.CostAmount;
                                }
                            });
                            pTablesHTML += `                        <td>${value}</td>`;
                        });
                    }
                }

            }

            if ($("#cbDocInfo").prop("checked")) {
                var strDocInfo = ``;
                $.each(DocInfo, function (d, doc) {
                    debugger;
                    var OpDocInfo = OpsDocInfo.filter(function (obj) { return obj.OperationID == item.ID && obj.DocumentInfoID == doc.ID; });
                    if (OpDocInfo.length > 0)
                        strDocInfo += `<p>&radic; ${doc.Name} - ${GetDateWithFormatMDY(OpDocInfo[0].ReceivedDate)}</p>`;
                    else
                        strDocInfo += `<p>&chi; ${doc.Name} </p>`;
                });
                pTablesHTML += `                        <td style='text-align:left;'>${strDocInfo}</td>`;
            }
            if (pDefaults.UnEditableCompanyName == "NIL" && $("#cbDaysFromOpeningCertificate").prop("checked"))
                pTablesHTML += `                        <td style='text-align:left;'>${strDocInfo}</td>`;
            if (pDefaults.UnEditableCompanyName == "NIL" && $("#cbDaysFromOpeningFile").prop("checked"))
                pTablesHTML += `                        <td style='text-align:left;'>${strDocInfo}</td>`;
            if (pDefaults.UnEditableCompanyName == "COS") {
             
                if ($("#cbInvoiceStageDate").prop("checked")) {
                    debugger;
                    pTablesHTML += `                        <td style='text-align:left;'>${item.TruckingApprovalDate ? ConvertDateFormat(GetDateWithFormatMDY(item.TruckingApprovalDate)) : ""  }</td>`;
                }

                if ($("#cbInvoiceStagePeriod").prop("checked")) {

                    pTablesHTML += `                        <td style='text-align:left;'>${item.DaysDifference}</td>`;
                }
            }

            pTablesHTML += '                                     </tr>';
        });

        pTablesHTML += '                             </tbody>';
        pTablesHTML += '                         </table>';
        pTablesHTML += ' </div> ';

        });
      

   
    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (pOutputTo == "Excel") {
        var pBranchSummary = "";
        /********************************Adding Summary*************************************/
        for (i = 0; i < ArrBranchIDs.length; i++) {
            if ($("#tblOperationsStatistics tbody tr").find("td.BranchID" + ArrBranchIDs[i]).length != 0)
                pBranchSummary += $("#slBranch option[value=" + ArrBranchIDs[i] + "]").text() + " branch: " + $("#tblOperationsStatistics tbody tr").find("td.BranchID" + ArrBranchIDs[i]).length + " Operations && " + "<br>";
        }
        debugger;
        if (pOutputTo == "Excel") {
            let tdVariable = "";
            for (let i = 0; i < 500; i++) {
                tdVariable += "<td></td>";
            }
            var pExcelSummary = `<tr><td></td>${tdVariable}</tr>`;
            pExcelSummary += "<tr><td>Import:" + $("#tblOperationsStatistics tbody tr").find("td.DirectionType1").length + " operations" + `</td>${tdVariable}</tr>`;
            pExcelSummary += "<tr><td>Export:" + $("#tblOperationsStatistics tbody tr").find("td.DirectionType2").length + " operations" + `</td>${tdVariable}</tr>`;
            pExcelSummary += "<tr><td>Domestic:" + $("#tblOperationsStatistics tbody tr").find("td.DirectionType3").length + " operations" + `</td>${tdVariable}</tr>`;
            pExcelSummary += "<tr><td>Ocean:" + $("#tblOperationsStatistics tbody tr").find("td.TransportType1").length + " operations" + `</td>${tdVariable}</tr>`;
            pExcelSummary += "<tr><td>Air:" + $("#tblOperationsStatistics tbody tr").find("td.TransportType2").length + " operations" + `</td>${tdVariable}</tr>`;
            pExcelSummary += "<tr><td>Inland:" + $("#tblOperationsStatistics tbody tr").find("td.TransportType3").length + " operations" + `</td>${tdVariable}</tr>`;
            pExcelSummary += "<tr><td>" + pBranchSummary + `</td>${tdVariable}</tr>`;
            //pExcelSummary += "<tr><td>Total:" + $("#tblOperationsStatistics tbody tr").length + " operations" + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>";
            pExcelSummary += "<tr><td>Total:" + $("#tblOperationsStatistics tbody tr").find("td.classNotHouse").length + " operations" + `</td>${tdVariable}</tr>`;
            pExcelSummary += "<tr><td>Containers Total : " + pContainerTotals + `</td>${tdVariable}</tr>`;
            pExcelSummary += "<tr><td>Incoterms Total : " + pIncotermTotals + `</td>${tdVariable}</tr>`;
            if (pDefaults.UnEditableCompanyName != "NIL" && $("#hf_CanEdit").val() == 1) {
                if ($("#cbPayables").prop("checked") || pDefaults.UnEditableCompanyName == "MIL" || ($("#cbMargin").prop("checked") && pOutputTo == "Excel"))
                    pExcelSummary += '<tr><td>Payables Summary : ' + parseFloat(GetColumnSum("tblOperationsStatistics", "classPayables")).toFixed(2) + `</td>${tdVariable}</tr>`;
                if ($("#cbReceivables").prop("checked") || ($("#cbMargin").prop("checked") && pOutputTo == "Excel"))
                    pExcelSummary += '<tr><td>Receivables Summary : ' + parseFloat(GetColumnSum("tblOperationsStatistics", "classReceivables")).toFixed(2) + `</td>${tdVariable}</tr>`;
                if ($("#cbPayables").prop("checked") && $("#cbReceivables").prop("checked"))
                    pExcelSummary += '<tr><td>Profit Summary : ' + parseFloat(GetColumnSum("tblOperationsStatistics", "classProfit")).toFixed(2) + `</td>${tdVariable}</tr>`;
            }
            $("#tblOperationsStatistics tbody").append(pExcelSummary);
        }
        $("#tblOperationsStatistics tbody tr td.TransportType1").remove();
        $("#tblOperationsStatistics tbody tr td.TransportType2").remove();
        $("#tblOperationsStatistics tbody tr td.TransportType3").remove();
        $("#tblOperationsStatistics tbody tr td.DirectionType1").remove();
        $("#tblOperationsStatistics tbody tr td.TransportType2").remove();
        $("#tblOperationsStatistics tbody tr td.TransportType3").remove();
        //ExportHtmlTableToCsv_RemovingCommasForNumbers("tblOperationsStatistics", pReportTitle);
        ExportHtmlTableToCsv("tblOperationsStatistics", pReportTitle);
    }
    else {
        var mywindow = null;
        if (pOutputTo != "Email")
            mywindow = window.open('', '_blank');
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><script src="/Scripts/utilities/jquery-1.10.2.js" type="text/javascript"></script></head>';
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
        ReportHTML += '             <div class="col-xs-3"><b>B/L Type :</b> ' + $("#divBLTypeFilter label.active").attr("title") + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Salesman :</b> ' + $("#slSalesman option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Customer :</b> ' + $("#slCustomer option:selected").text() + '</div>';
        ////ReportHTML += '             <div class="col-xs-3"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Oper. Status :</b> ' + $("#slOperationStages option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-6"><b>Open Date :</b> ' + ($("#txtFromDate").val() == "" && $("#txtToDate").val() == ""
            ? "All Dates"
            : ($("#txtFromDate").val() == "" ? "" : "From " + $("#txtFromDate").val() + " ") + ($("#txtToDate").val() == "" ? "" : "To " + $("#txtToDate").val())) + '</div>';
        if ($("#slOperationStages option:selected").text() == "CLOSED")
            ReportHTML += '             <div class="col-xs-6"><b>Close Date :</b> ' + ($("#txtFromCloseDate").val() == "" && $("#txtToCloseDate").val() == ""
                ? "All Dates"
                : ($("#txtFromCloseDate").val() == "" ? "" : "From " + $("#txtFromCloseDate").val() + " ") + ($("#txtToCloseDate").val() == "" ? "" : "To " + $("#txtToCloseDate").val())) + '</div>';
        ////ReportHTML += '                 <section class="panel panel-default">';
        //ReportHTML += '                     <div class="table-responsive">';
        ReportHTML += '                         <div> &nbsp; </div>'

        ReportHTML += pTablesHTML;
        if (pDefaults.UnEditableCompanyName != "MED") {
            ReportHTML += '             <div class="col-xs-4"><b>Import :</b> ' + $("#tblOperationsStatistics tbody tr").find("td.DirectionType1").length + " Operations"
                + '<br><b>Export :</b> ' + $("#tblOperationsStatistics tbody tr").find("td.DirectionType2").length + " Operations"
                + '<br><b>Domestic :</b> ' + $("#tblOperationsStatistics tbody tr").find("td.DirectionType3").length + " Operations"
                + '</div>';

            ReportHTML += '             <div class="col-xs-4"><b>Ocean :</b> ' + $("#tblOperationsStatistics tbody tr").find("td.TransportType1").length + " Operations"
                + '<br><b>Air :</b> ' + $("#tblOperationsStatistics tbody tr").find("td.TransportType2").length + " Operations"
                + '<br><b>Inland :</b> ' + $("#tblOperationsStatistics tbody tr").find("td.TransportType3").length + " Operations"
                + '</div>';

            ReportHTML += '             <div class="col-xs-4">'
                + ($("#cbGrossWeightSum").prop("checked") ? ('Total Gross :</b> ' + GetColumnSum("tblOperationsStatistics", "GrossWeightSum") + " KGM<br>") : "")
                + ($("#cbNetWeightSum").prop("checked") ? ('Total Net :</b> ' + parseFloat(GetColumnSum("tblOperationsStatistics", "NetWeightSum")).toFixed(2) + " KGM<br>") : "")
                + ($("#cbVolumeSum").prop("checked") ? ('<b>Total Vol :</b> ' + GetColumnSum("tblOperationsStatistics", "VolumeSum") + " CBM<br>") : "")
                + ($("#cbChargeableWeightSum").prop("checked") ? ('<b>Total Chg.Wt :</b> ' + GetColumnSum("tblOperationsStatistics", "ChargeableWeightSum") + " <br>") : "")
                + '</div>';

            for (i = 0; i < ArrBranchIDs.length; i++) {
                if ($("#tblOperationsStatistics tbody tr").find("td.BranchID" + ArrBranchIDs[i]).length != 0)
                    ReportHTML += '             <div class="col-xs-12" style="clear:both;"><b>' + $("#slBranch option[value=" + ArrBranchIDs[i] + "]").text() + " branch: " + '</b> ' + $("#tblOperationsStatistics tbody tr").find("td.BranchID" + ArrBranchIDs[i]).length + " Operations" + '</div>';
            }
            //ReportHTML += '             <div class="col-xs-12"><b>Total :</b> ' + $("#tblOperationsStatistics tbody tr").length + " operations" + '</div>';
            ReportHTML += '             <div class="col-xs-12"><b>Total :</b> ' + $("#tblOperationsStatistics tbody tr").find("td.classNotHouse").length + " operations" + '</div>';
            ReportHTML += '             <div class="col-xs-12"><b>Containers Totals :</b> ' + pContainerTotals + '</div>';
            if (pDefaults.UnEditableCompanyName != "ALL")
                ReportHTML += '             <div class="col-xs-12"><b>Incoterms Totals :</b> ' + pIncotermTotals + '</div>';
            //ReportHTML += '                     </div>';//of table-responsive
            if (pDefaults.UnEditableCompanyName != "NIL" && pDefaults.UnEditableCompanyName != "ALL" && $("#hf_CanEdit").val() == 1) {
                ReportHTML += '             <div class="col-xs-12"><b>Payables Summary :</b> ' + parseFloat(GetColumnSum("tblOperationsStatistics", "classPayables")).toFixed(2) + '</div>';
                ReportHTML += '             <div class="col-xs-12"><b>Receivables Summary :</b> ' + parseFloat(GetColumnSum("tblOperationsStatistics", "classReceivables")).toFixed(2) + '</div>';
                ReportHTML += '             <div class="col-xs-12"><b>Profit Summary :</b> ' + parseFloat(GetColumnSum("tblOperationsStatistics", "classProfit")).toFixed(2) + '</div>';
            }
        }

   

        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        ////ReportHTML += '         <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';
        //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.IsPrintISOCode input[type=checkbox]").prop("checked"))
        //    ReportHTML += '     <div class="row m-l">' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ISOCode").text() + '</div>';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        ReportHTML += '     </footer>';
        ReportHTML += '<script>';
        if (grossWgtKg == 0) {
            ReportHTML += '$("#tblOperationsStatistics th.GrossWeightSum, #tblOperationsStatistics td.GrossWeightSum").remove();';  
        }
        if (grossWgtTn == 0) {
            ReportHTML += '$("#tblOperationsStatistics th.GrossWeightTonSum, #tblOperationsStatistics td.GrossWeightTonSum").remove();';    
        }
        ReportHTML += '</script>';
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
function OperationsStatistics_WorkFlow_DrawReport(data, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(data[1]);

    var pReportTitle = $("#txtToDate").val() + "  حركة العمل من  " + $("#txtFromDate").val() + "  إلى  ";

    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTablesHTML = "";
    //ReportHTML += '                         <table id="tblWorkFlow" class="table table-striped text-sm table-hover b-t b-r b-b b-l print">';//remove t1 class to remove row numbers
    pTablesHTML += '                         <table id="tblWorkFlow" class="table table-striped text-sm table-bordered  " style="border:solid #000 !important;">';//style="border-left:solid #999 !important;border-top:solid #999 !important;"
    pTablesHTML += '                             <thead>';
    pTablesHTML += '                                 <tr class="" style="font-size:90%;">';
    pTablesHTML += '                                     <th>OperationNo. - رقم العملية  </th>';
    pTablesHTML += '                                     <th>Client -  العميل </th>';
    pTablesHTML += '                                     <th>Containers 20" -  حاوية20قدم </th>';
    pTablesHTML += '                                     <th>Containers 40" -  حاوية40قدم </th>';
    pTablesHTML += '                                     <th>Containers 45" -  حاوية45قدم </th>';
    pTablesHTML += '                                     <th>Reefer 20" -  ثلاجة20قدم </th>';
    pTablesHTML += '                                     <th>Reefer 40" -  ثلاجة40قدم </th>';
    pTablesHTML += '                                     <th>General Cargo -  بضائع عامة </th>';
    pTablesHTML += '                                     <th>Containers Numbers -  أرقام الحاويات </th>';
    pTablesHTML += '                                     <th>Line -  الخط </th>';
    pTablesHTML += '                                     <th>Client Address -  عنوان العميل </th>';
    pTablesHTML += '                                     <th>Client Phones -  تليفون العميل </th>';
    pTablesHTML += '                                 </tr>';
    pTablesHTML += '                             </thead>';
    pTablesHTML += '                             <tbody>';
    //debugger;
    //$.each(JSON.parse(pReportRows), function (i, item) { debugger; });
    $.each((pReportRows), function (i, item) {
        pTablesHTML += '                                     <tr style="font-size:90%;">';
        pTablesHTML += '                                         <td>' + (item.Code == 0 ? "" : item.Code) + '</td>';
        //pTablesHTML += '                                         <td>' + (item.OpenDate == "/Date(-2208996000000)/" ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.OpenDate))) + '</td>';
        pTablesHTML += '                                         <td>' + (item.ClientName == 0 ? "" : item.ClientName) + '</td>';
        pTablesHTML += '                                         <td>' + (item.ContainerTypes20 == 0 || item.TransportType == 2 ? "" : item.ContainerTypes20) + '</td>';
        pTablesHTML += '                                         <td>' + (item.ContainerTypes40 == 0 || item.TransportType == 2 ? "" : item.ContainerTypes40) + '</td>';
        pTablesHTML += '                                         <td>' + (item.ContainerTypes45 == 0 || item.TransportType == 2 ? "" : item.ContainerTypes45) + '</td>';
        pTablesHTML += '                                         <td>' + (item.ContainerTypesReefer20 == 0 || item.TransportType == 2 ? "" : item.ContainerTypesReefer20) + '</td>';
        pTablesHTML += '                                         <td>' + (item.ContainerTypesReefer40 == 0 || item.TransportType == 2 ? "" : item.ContainerTypesReefer40) + '</td>';
        pTablesHTML += '                                         <td>' + (item.GrossWeightSum == 0 ? "" : (item.GrossWeightSum + ' KGM')) + '</td>';
        pTablesHTML += '                                         <td>' + (item.ContainerNumbers == 0 ? "" : item.ContainerNumbers) + '</td>';
        pTablesHTML += '                                         <td>' + (item.LineName == 0 ? "" : item.LineName) + '</td>';
        pTablesHTML += '                                         <td>' + (item.ClientAddress == 0 ? "" : item.ClientAddress) + '</td>';
        pTablesHTML += '                                         <td>' + (item.ClientPhonesAndFaxes == 0 ? "" : item.ClientPhonesAndFaxes) + '</td>';
        ////if (item.RepTransportTypeShown == "AIR" || item.ShipmentTypeCode == "LCL" || item.ShipmentTypeCode == "LTL")
        ////    pTablesHTML += '                                     <td>' + (item.PackageTypes == 0 ? "" : item.PackageTypes) + '</td>';
        ////else
        ////    pTablesHTML += '                                     <td>' + (item.ContainerTypes == 0 ? "" : item.ContainerTypes) + '</td>';
        ////if ($("#cbTEUs").prop("checked"))
        //    pTablesHTML += '                                         <td>' + (item.TEUs == 0 ? "" : item.TEUs) + '</td>';
        pTablesHTML += '                                     </tr>';
    });
    pTablesHTML += '                             </tbody>';
    pTablesHTML += '                         </table>';
    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (pOutputTo == "Excel")
        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblWorkFlow", "Work Flow");
    else {
        var mywindow = null;
        if (pOutputTo != "Email")
            mywindow = window.open('', '_blank');
        //  var mywindow = window.open('', '_blank');
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
        ReportHTML += '             <div class="col-xs-3"><b>B/L Type :</b> ' + $("#divBLTypeFilter label.active").attr("title") + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Salesman :</b> ' + $("#slSalesman option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Customer :</b> ' + $("#slCustomer option:selected").text() + '</div>';
        ////ReportHTML += '             <div class="col-xs-3"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Oper. Status :</b> ' + $("#slOperationStages option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-6"><b>Open Date :</b> ' + ($("#txtFromDate").val() == "" && $("#txtToDate").val() == ""
            ? "All Dates"
            : ($("#txtFromDate").val() == "" ? "" : "From " + $("#txtFromDate").val() + " ") + ($("#txtToDate").val() == "" ? "" : "To " + $("#txtToDate").val())) + '</div>';
        if ($("#slOperationStages option:selected").text() == "CLOSED")
            ReportHTML += '             <div class="col-xs-6"><b>Close Date :</b> ' + ($("#txtFromCloseDate").val() == "" && $("#txtToCloseDate").val() == ""
                ? "All Dates"
                : ($("#txtFromCloseDate").val() == "" ? "" : "From " + $("#txtFromCloseDate").val() + " ") + ($("#txtToCloseDate").val() == "" ? "" : "To " + $("#txtToCloseDate").val())) + '</div>';

        ////ReportHTML += '                 <section class="panel panel-default">';
        //ReportHTML += '                     <div class="table-responsive">';
        ReportHTML += '                         <div> &nbsp; </div>'

        ReportHTML += pTablesHTML;

        //ReportHTML += '                     </div>';//of table-responsive
        //ReportHTML += '             <div class="col-xs-12"><b>Payables Summary :</b> ' + pPayablesCurrenciesSummary + '</div>';
        //ReportHTML += '             <div class="col-xs-12"><b>Invoices Summary :</b> ' + pReceivablesOrInvoicesCurrenciesSummary + '</div>';
        //ReportHTML += '             <div class="col-xs-12"><b>Profit Summary :</b> ' + pProfitCurrenciesSummary + '</div>';
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
            SendPDF_ReportByEmail($('#txtToEmail').val(), ReportHTML, "Work Flow From" + $("#txtToDate").val() + " To " + $("#txtFromDate").val(), true);
        }

    }
}
/*************************BL Statistics***************************/
function BLStatistics_DrawReport(data, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(data[1]);
    var pReportTitle = "HBLs Statistics";
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var _BranchIDs = "";
    for (var i = 1; i < ($("#slBranch option").length + 1); i++)
        _BranchIDs += _BranchIDs == "" ? $("#slBranch option:nth-child(" + (i) + ")").val() : ("," + $("#slBranch option:nth-child(" + (i) + ")").val());
    var ArrBranchIDs = _BranchIDs.split(",");

    var pTablesHTML = "";
    pTablesHTML += ' <div style="overflow: auto;"> ';
    //ReportHTML += '                         <table id="tblOperationsStatistics" class="table table-striped text-sm table-hover b-t b-r b-b b-l print">';//remove t1 class to remove row numbers
    pTablesHTML += '                         <table id="tblOperationsStatistics" class="table table-striped text-sm table-bordered  " style="border:solid #000 !important;">';//style="border-left:solid #999 !important;border-top:solid #999 !important;"
    pTablesHTML += '                             <thead>';
    pTablesHTML += '                                 <tr class="" style="font-size:90%;">';
    if ($("#cbBLStatisticsHouseNumber").prop("checked"))
        pTablesHTML += '                                     <th>HouseNo</th>';
    if ($("#cbBLStatisticsDismissalPermissionSerial").prop("checked"))
        pTablesHTML += '                                     <th>DismissalNo.</th>';
    if (pDefaults.UnEditableCompanyName == "GLS")
        pTablesHTML += '                                     <th>صرف بتاريخ</th>';
    if (pDefaults.UnEditableCompanyName == "MES")
        pTablesHTML += '                                     <th>Quotation</th>';
    if ($("#cbBLStatisticsClient").prop("checked"))
        pTablesHTML += '                                     <th>Client</th>';
    if ($("#cbBLAgent").prop("checked"))
        pTablesHTML += '                                     <th>Agent</th>';
    if ($("#cbBLShipmentTypeCode").prop("checked"))
        pTablesHTML += '                                     <th>ShipmentType</th>';
    if ($("#cbBLConsignee2").prop("checked"))
        pTablesHTML += '                                     <th>Consignee2</th>';
    if ($("#cbBLStatisticsPOrC").prop("checked"))
        pTablesHTML += '                                     <th>P/C</th>';
    if ($("#cbBLStatisticsCustomerReference").prop("checked"))
        pTablesHTML += '                                     <th>CustomerRef</th>';
    if ($("#cbBLStatisticsForwarderOrNotify").prop("checked"))
        pTablesHTML += '                                     <th>Forwarder/Notify</th>';
    if ($("#cbBLStatisticsGrossWeight").prop("checked"))
        pTablesHTML += '                                     <th>Gross(KG)</th>';
    if ($("#cbBLStatisticsVolume").prop("checked"))
        pTablesHTML += '                                     <th>Vol(CBM)</th>';
    if ($("#cbBLStatisticsPackages").prop("checked"))
        pTablesHTML += '                                     <th>Packages</th>';
    if ($("#cbBLStatisticsContainerTypes").prop("checked"))
        pTablesHTML += '                                     <th>ContainerTypes</th>';
    //if ($("#TEUs").prop("checked"))
    //    pTablesHTML += '                                     <th">TEUs</th>';
    if ($("#cbBLTEUS").prop("checked"))
        pTablesHTML += '                                     <th>TEUS</th>';
    if ($("#cbBLStatisticsContainerTypes").prop("checked"))
        pTablesHTML += '                                     <th>Container Nos</th>';
    if ($("#cbBLStatisticsGoodsDescription").prop("checked"))
        pTablesHTML += '                                     <th>Goods Desc.</th>';
    if ($("#cbBLStatisticsMovementType").prop("checked"))
        pTablesHTML += '                                     <th>Service Type</th>';
    if ($("#cbBLStatisticsSalesman").prop("checked"))
        pTablesHTML += '                                     <th>Salesman</th>';
    if ($("#cbBLStatisticsETA").prop("checked"))
        pTablesHTML += '                                     <th>ETA</th>';
    if ($("#cbBLStatisticsATA").prop("checked"))
        pTablesHTML += '                                     <th>ATA</th>';
    //pTablesHTML += '                                     <th class="hide">Final Destination</th>';
    if ($("#cbBLPOD").prop("checked"))
        pTablesHTML += '                                     <th>POD</th>';
    if ($("#cbBLStatisticsInvoices").prop("checked"))
        pTablesHTML += '                                     <th>Invoices</th>';
    if ($("#cbBLStatisticsVessel").prop("checked"))
        pTablesHTML += '                                     <th>Vessel</th>';
    if ($("#cbBLStatisticsPOL").prop("checked"))
        pTablesHTML += '                                     <th>POL</th>';
    if ($("#cbBLStatisticsReleaseDate").prop("checked"))
        pTablesHTML += '                                     <th>ReleaseDate</th>';
    if ($("#cbBLStatisticsWarehouse").prop("checked"))
        pTablesHTML += '                                     <th>Warehouse</th>';
    if ($("#cbBLStatisticsPODate").prop("checked"))
        pTablesHTML += '                                     <th>' + (pDefaults.UnEditableCompanyName == "GLS" ? 'StoringDate' : 'PODate') + '</th>';
    if ($("#cbBLStatisticsNotes").prop("checked"))
        pTablesHTML += '                                     <th>Notes</th>';
    if (pDefaults.UnEditableCompanyName == "MES") {
        pTablesHTML += '                                     <th>Storage Date</th>';
        pTablesHTML += '                                     <th>Relase Date</th>';
        pTablesHTML += '                                     <th>Revenue</th>';
        pTablesHTML += '                                     <th>Expense</th>';
        pTablesHTML += '                                     <th>Credit Note</th>';
        pTablesHTML += '                                     <th>Diff</th>';
        pTablesHTML += '                                     <th>IMO/Chemical</th>';
        pTablesHTML += '                                     <th>UnAllocatedReceivables</th>';
        pTablesHTML += '                                     <th>Count THC</th>';
        pTablesHTML += '                                     <th>Count Storage</th>';
        pTablesHTML += '                                     <th>Count StorageService</th>';
        pTablesHTML += '                                     <th>Count Nafeza</th>';
        //pTablesHTML += '                                     <th>Count CollectionForOthers</th>';
        pTablesHTML += '                                     <th>Count Nolon</th>';
        pTablesHTML += '                                     <th>Count G3ala</th>';

    }
    if ($("#cbBLOperationCode").prop("checked"))
        pTablesHTML += '                                     <th>Master Operation Code</th>';
    if ($("#cbBLHBOutcome").prop("checked"))
        pTablesHTML += '                                     <th>HB Outcome</th>';
    if ($("#cbBLHBIncome").prop("checked"))
        pTablesHTML += '                                     <th>HB Income</th>';
    if ($("#cbBLHBIncomewithvat").prop("checked"))
        pTablesHTML += '                                     <th>HB Income With Vat</th>';
    if ($("#cbBLtotalprofit").prop("checked"))
        pTablesHTML += '                                     <th>Total Profit With Vat</th>';
    pTablesHTML += '                                 </tr>';
    pTablesHTML += '                             </thead>';
    pTablesHTML += '                             <tbody>';
    $.each((pReportRows), function (i, item) {
        pTablesHTML += '                                     <tr style="font-size:90%;">';
        //pTablesHTML += '                                         <td class="' + (item.BLType != constHouseBLType ? 'classNotHouse' : '') + '">' + (item.Code == 0 ? "" : item.Code) + '</td>';
        if ($("#cbBLStatisticsHouseNumber").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.HouseNumber == 0 ? "" : item.HouseNumber) + '</td>';
        if ($("#cbBLStatisticsDismissalPermissionSerial").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.DismissalPermissionSerial == 0 ? "" : item.DismissalPermissionSerial) + '</td>';
        if (pDefaults.UnEditableCompanyName == "GLS")
            pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/2001", GetDateWithFormatMDY(item.ReleaseDate)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.ReleaseDate)))) + '</td>';
        if (pDefaults.UnEditableCompanyName == "MES")
            pTablesHTML += '                                         <td>' + (item.QuotationCode == null ? "" : item.QuotationCode) + '</td>';
        if ($("#cbBLStatisticsClient").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.ClientName == 0 ? "" : item.ClientName) + '</td>';
        if ($("#cbBLAgent").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.AgentName == 0 ? "" : item.AgentName) + '</td>';
        if ($("#cbBLShipmentTypeCode").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.ShipmentTypeCode == 0 ? "" : item.ShipmentTypeCode) + '</td>';
        if ($("#cbBLConsignee2").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.NameConsignee2 == 0 ? "" : item.NameConsignee2) + '</td>';
        if ($("#cbBLStatisticsPOrC").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.POrC == 1 ? "C" : (item.POrC == 3 ? "P" : "")) + '</td>';
        if ($("#cbBLStatisticsCustomerReference").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.CustomerReference == 0 ? "" : item.CustomerReference) + '</td>';
        if ($("#cbBLStatisticsForwarderOrNotify").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.Notify1Name == 0 ? "" : item.Notify1Name) + '</td>';
        if ($("#cbBLStatisticsGrossWeight").prop("checked"))
            pTablesHTML += '                                         <td class="' + 'GrossWeightSum' + '">' + (item.GrossWeightSum == 0 ? "" : item.GrossWeightSum) + '</td>';
        if ($("#cbBLStatisticsVolume").prop("checked"))
            pTablesHTML += '                                         <td class="' + 'VolumeSum' + '">' + (item.VolumeSum == 0 ? "" : item.VolumeSum) + '</td>';
        if ($("#cbBLStatisticsPackages").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.NumberOfPackages + 'x' + item.PackageTypeName) + '</td>';
        if ($("#cbBLStatisticsContainerTypes").prop("checked"))
            pTablesHTML += '                                         <td class="">' + (item.ContainerTypes == 0 ? "" : item.ContainerTypes) + '</td>';
        if ($("#cbBLTEUS").prop("checked"))
            pTablesHTML += '                                         <td class="">' + (item.TEUs == 0 ? "" : item.TEUs) + '</td>';
        if ($("#cbBLStatisticsContainerTypes").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.ContainerNumbers == 0 ? "" : item.ContainerNumbers) + '</td>';
        if ($("#cbBLStatisticsGoodsDescription").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.DescriptionOfGoods == 0 ? "" : item.DescriptionOfGoods.replaceAll("\n", " ")) + '</td>';
        if ($("#cbBLStatisticsMovementType").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.MoveTypeName == 0 ? "" : item.MoveTypeName) + '</td>';
        if ($("#cbBLStatisticsSalesman").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.Salesman == 0 ? "" : item.Salesman) + '</td>';
        if ($("#cbBLStatisticsETA").prop("checked"))
            pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/2001", GetDateWithFormatMDY(item.ExpectedArrival)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.ExpectedArrival)))) + '</td>';
        if ($("#cbBLStatisticsATA").prop("checked"))
            pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/2001", GetDateWithFormatMDY(item.ActualArrival)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.ActualArrival)))) + '</td>';
        //pTablesHTML += '                                         <td class="hide">' + (item.DeliveryCityName == 0 ? "" : item.DeliveryCityName) + '</td>';
        if ($("#cbBLPOD").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.PODName == 0 ? "" : item.PODName )+ '</td>';
        if ($("#cbBLStatisticsInvoices").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.InvoiceNumbers == 0 ? "" : item.InvoiceNumbers.replace(/\,/g, "<br/>")) + '</td>';
        if ($("#cbBLStatisticsVessel").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.VesselName == 0 ? "" : item.VesselName) + '</td>';
        if ($("#cbBLStatisticsPOL").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.POLName == 0 ? "" : item.POLName) + '</td>';
        if ($("#cbBLStatisticsReleaseDate").prop("checked"))
            pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/2001", GetDateWithFormatMDY(item.ReleaseDate)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.ReleaseDate)))) + '</td>';
        if ($("#cbBLStatisticsWarehouse").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.MainRouteWarehouse == 0 ? "" : item.MainRouteWarehouse) + '</td>';
        if ($("#cbBLStatisticsPODate").prop("checked"))
            pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/2001", GetDateWithFormatMDY(item.PODate)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.PODate)))) + '</td>';
        if ($("#cbBLStatisticsNotes").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.Notes == 0 ? "" : item.Notes.replaceAll("\n", " ")) + '</td>';

        if (pOutputTo != "Excel") {
            pTablesHTML += '                                         <td class="hide ' + ('BranchID' + item.BranchID) + '">' + '' + '</td>';
            pTablesHTML += '                                         <td class="hide ' + ('TransportType' + item.TransportType + ' DirectionType' + item.DirectionType) + '">' + '' + '</td>';

        }

        if (pDefaults.UnEditableCompanyName == "MES") {
            pTablesHTML += '                                         <td>' + (item.EntryDate != null && Date.prototype.compareDates("01/01/2001", GetDateWithFormatMDY(item.EntryDate)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.EntryDate)))) + '</td>';
            pTablesHTML += '                                         <td>' + (item.StorageEndDate != null && Date.prototype.compareDates("01/01/2001", GetDateWithFormatMDY(item.StorageEndDate)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.StorageEndDate)))) + '</td>';


            pTablesHTML += '                                     <td>' + (item.NawaleenReceivables == 0 ? "" : item.NawaleenReceivables) + '</td>';
            pTablesHTML += '                                     <td>' + (item.NawaleenPayablesDiff == 0 ? "" : item.NawaleenPayablesDiff) + '</td>';
            pTablesHTML += '                                     <td>' + (item.AccNawaleenPayablesDiff == 0 ? "" : item.AccNawaleenPayablesDiff) + '</td>';
            pTablesHTML += '                                     <td>' + (item.NawaleenReceivables - item.NawaleenPayablesDiff - item.AccNawaleenPayablesDiff).toFixed(2) + ' </td>';
            pTablesHTML += '                                     <td>' + (item.IMO_Chemical == 0 ? "" : item.IMO_Chemical) + '</td>';

            pTablesHTML += '                                     <td>' + (item.UnAllocatedReceivables == 0 ? "0" : item.UnAllocatedReceivables) + '</td>';
            pTablesHTML += '                                     <td>' + (item.CountTHC == 0 ? "0" : item.CountTHC) + '</td>';
            pTablesHTML += '                                     <td>' + (item.CountStorage == 0 ? "0" : item.CountStorage) + '</td>';
            pTablesHTML += '                                     <td>' + (item.CountStorageService == 0 ? "0" : item.CountStorageService) + '</td>';
            pTablesHTML += '                                     <td>' + (item.CountNafeza == 0 ? "0" : item.CountNafeza) + '</td>';
            //pTablesHTML += '                                     <td>' + (item.CountCollectionForOthers == 0 ? "0" : item.CountCollectionForOthers) + '</td>';
            pTablesHTML += '                                     <td>' + (item.CountNolon == 0 ? "0" : item.CountNolon) + '</td>';
            pTablesHTML += '                                     <td>' + (item.CountG3ala == 0 ? "0" : item.CountG3ala) + '</td>';

        
        }

        if ($("#cbBLOperationCode").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.MasterOperationCode == 0 ? "" : item.MasterOperationCode) + '</td>';

        if ($("#cbBLHBOutcome").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.HBOutcome == 0 ? "" : item.HBOutcome) + '</td>';

        if ($("#cbBLHBIncome").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.HBIncome == 0 ? "" : item.HBIncome) + '</td>';
        if ($("#cbBLHBIncome").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.HBIncomeWithvat == 0 ? "" : item.HBIncomeWithvat) + '</td>';
        if ($("#cbBLtotalprofit").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.HBOutcome - item.HBIncomeWithvat) + '</td>';

        pTablesHTML += '                                     </tr>';
    });
    pTablesHTML += '                             </tbody>';
    pTablesHTML += '                         </table>';
    pTablesHTML += ' </div> ';
    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (pOutputTo == "Excel") {

        var pBranchSummary = "";
        /********************************Adding Summary*************************************/
        for (i = 0; i < ArrBranchIDs.length; i++) {
            if ($("#tblOperationsStatistics tbody tr").find("td.BranchID" + ArrBranchIDs[i]).length != 0)
                pBranchSummary += $("#slBranch option[value=" + ArrBranchIDs[i] + "]").text() + " branch: " + $("#tblOperationsStatistics tbody tr").find("td.BranchID" + ArrBranchIDs[i]).length + " Operations" + "<br>";
        }
        debugger;
        if (pOutputTo == "Excel" ) {
            var pExcelSummary = "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
            pExcelSummary += "<tr><td>Import:" + $("#tblOperationsStatistics tbody tr").find("td.DirectionType1").length + " operations" + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><td></td><td></td><td></td><td></td><td></td><td></td>";
            pExcelSummary += "<tr><td>Export:" + $("#tblOperationsStatistics tbody tr").find("td.DirectionType2").length + " operations" + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
            pExcelSummary += "<tr><td>Domestic:" + $("#tblOperationsStatistics tbody tr").find("td.DirectionType3").length + " operations" + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
            pExcelSummary += "<tr><td>Ocean:" + $("#tblOperationsStatistics tbody tr").find("td.TransportType1").length + " operations" + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
            pExcelSummary += "<tr><td>Air:" + $("#tblOperationsStatistics tbody tr").find("td.TransportType2").length + " operations" + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
            pExcelSummary += "<tr><td>Inland:" + $("#tblOperationsStatistics tbody tr").find("td.TransportType3").length + " operations" + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><td></td><td></td><td></td><td></td><td></td><td></td></td></tr>";
            pExcelSummary += "<tr><td>" + pBranchSummary + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
            //pExcelSummary += "<tr><td>Total:" + $("#tblOperationsStatistics tbody tr").length + " operations" + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>";
            pExcelSummary += "<tr><td>Total:" + $("#tblOperationsStatistics tbody tr").find("td.classNotHouse").length + " operations" + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
            //$("#tblOperationsStatistics tbody").append(pExcelSummary);
        }

        //ExportHtmlTableToCsv_RemovingCommasForNumbers("tblOperationsStatistics", pReportTitle);
        ExportHtmlTableToCsv_RemovingCommasForNumbers_New("tblOperationsStatistics", pReportTitle);
       // ExportHtmlTableToCsv("tblOperationsStatistics", pReportTitle);
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
        ReportHTML += '             <div class="col-xs-3"><b>B/L Type :</b> ' + $("#divBLTypeFilter label.active").attr("title") + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Salesman :</b> ' + $("#slSalesman option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Customer :</b> ' + $("#slCustomer option:selected").text() + '</div>';
        ////ReportHTML += '             <div class="col-xs-3"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Oper. Status :</b> ' + $("#slOperationStages option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-6"><b>Open Date :</b> ' + ($("#txtFromDate").val() == "" && $("#txtToDate").val() == ""
            ? "All Dates"
            : ($("#txtFromDate").val() == "" ? "" : "From " + $("#txtFromDate").val() + " ") + ($("#txtToDate").val() == "" ? "" : "To " + $("#txtToDate").val())) + '</div>';
        if ($("#slOperationStages option:selected").text() == "CLOSED")
            ReportHTML += '             <div class="col-xs-6"><b>Close Date :</b> ' + ($("#txtFromCloseDate").val() == "" && $("#txtToCloseDate").val() == ""
                ? "All Dates"
                : ($("#txtFromCloseDate").val() == "" ? "" : "From " + $("#txtFromCloseDate").val() + " ") + ($("#txtToCloseDate").val() == "" ? "" : "To " + $("#txtToCloseDate").val())) + '</div>';
        ////ReportHTML += '                 <section class="panel panel-default">';
        //ReportHTML += '                     <div class="table-responsive">';
        ReportHTML += '                         <div> &nbsp; </div>'

        ReportHTML += pTablesHTML;

        ReportHTML += '             <div class="col-xs-4 hide"><b>Import :</b> ' + $("#tblOperationsStatistics tbody tr").find("td.DirectionType1").length + " Operations"
            + '<br><b>Export :</b> ' + $("#tblOperationsStatistics tbody tr").find("td.DirectionType2").length + " Operations"
            + '<br><b>Domestic :</b> ' + $("#tblOperationsStatistics tbody tr").find("td.DirectionType3").length + " Operations"
            + '</div>';

        ReportHTML += '             <div class="col-xs-4 hide"><b>Ocean :</b> ' + $("#tblOperationsStatistics tbody tr").find("td.TransportType1").length + " Operations"
            + '<br><b>Air :</b> ' + $("#tblOperationsStatistics tbody tr").find("td.TransportType2").length + " Operations"
            + '<br><b>Inland :</b> ' + $("#tblOperationsStatistics tbody tr").find("td.TransportType3").length + " Operations"
            + '</div>';

        ReportHTML += '             <div class="col-xs-4 hide">'
            + ($("#cbGrossWeightSum").prop("checked") ? ('Total Gross :</b> ' + GetColumnSum("tblOperationsStatistics", "GrossWeightSum") + " KGM<br>") : "")
            + ($("#cbNetWeightSum").prop("checked") ? ('Total Net :</b> ' + parseFloat(GetColumnSum("tblOperationsStatistics", "NetWeightSum")).toFixed(2) + " KGM<br>") : "")
            + ($("#cbVolumeSum").prop("checked") ? ('<b>Total Vol :</b> ' + GetColumnSum("tblOperationsStatistics", "VolumeSum") + " CBM<br>") : "")
            + ($("#cbChargeableWeightSum").prop("checked") ? ('<b>Total Chg.Wt :</b> ' + GetColumnSum("tblOperationsStatistics", "ChargeableWeightSum") + " <br>") : "")
            + '</div>';

        for (i = 0; i < ArrBranchIDs.length; i++) {
            if ($("#tblOperationsStatistics tbody tr").find("td.BranchID" + ArrBranchIDs[i]).length != 0)
                ReportHTML += '             <div class="col-xs-12" style="clear:both;"><b>' + $("#slBranch option[value=" + ArrBranchIDs[i] + "]").text() + " branch: " + '</b> ' + $("#tblOperationsStatistics tbody tr").find("td.BranchID" + ArrBranchIDs[i]).length + " B/Ls" + '</div>';
        }
        //ReportHTML += '             <div class="col-xs-12"><b>Total :</b> ' + $("#tblOperationsStatistics tbody tr").length + " operations" + '</div>';
        ReportHTML += '             <div class="col-xs-12 hide"><b>Total :</b> ' + $("#tblOperationsStatistics tbody tr").find("td.classNotHouse").length + " operations" + '</div>';
        //ReportHTML += '                     </div>';//of table-responsive
        //ReportHTML += '             <div class="col-xs-12"><b>Payables Summary :</b> ' + pPayablesCurrenciesSummary + '</div>';
        //ReportHTML += '             <div class="col-xs-12"><b>Invoices Summary :</b> ' + pReceivablesOrInvoicesCurrenciesSummary + '</div>';
        //ReportHTML += '             <div class="col-xs-12"><b>Profit Summary :</b> ' + pProfitCurrenciesSummary + '</div>';
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
function SetSelectedColumns(pFlag) {
    debugger;
    $(".classCheckColumn:not(.hide)").prop("checked", pFlag);
}

//////////////////////////////////////////////////
function OperationsStatistics_DrawReport_NIL(data, pOutputTo, IsWithCurrenciesDetailed, IsWithChargesDetailed) {
    debugger;
    var grossWgtKg = 0;
    var grossWgtTn = 0;
    var pReportRows = JSON.parse(data[1]);
    var pContainerTotals = data[2];
    var pIncotermTotals = data[3];
    var pReportRowsWithDetailedCurrencies = "CurrenciesNotSelected";
    if (IsWithCurrenciesDetailed) {
        pReportRowsWithDetailedCurrencies = JSON.parse(data[4]);
    }
    var OperationsPayables = JSON.parse(data[5]);
    var OperationsReceivables = JSON.parse(data[6]);
    var TankNoLst = JSON.parse(data[7]);
    var pReportTitle = "Operations Statistics";
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var _BranchIDs = "";
    for (var i = 1; i < ($("#slBranch option").length + 1); i++)
        _BranchIDs += _BranchIDs == "" ? $("#slBranch option:nth-child(" + (i) + ")").val() : ("," + $("#slBranch option:nth-child(" + (i) + ")").val());
    var ArrBranchIDs = _BranchIDs.split(",");
    var pTablesHTML = "";
    pTablesHTML += ' <div style="overflow: auto;"> ';
    pTablesHTML += '                         <table id="tblOperationsStatistics" class="table table-striped text-sm table-bordered  " style="border:solid #000 !important;">';//style="border-left:solid #999 !important;border-top:solid #999 !important;"
    pTablesHTML += '                             <thead>';
    pTablesHTML += '                                 <tr class="" style="font-size:90%;">';
    pTablesHTML += '                                     <th>OperationNo</th>';
    if ($("#cbSalesman").prop("checked"))
        pTablesHTML += '                                     <th>Salesman</th>';
    if ($("#cbOperationMan").prop("checked"))
        pTablesHTML += '                                     <th>Operation Man</th>';
    if ($("#cbClient").prop("checked"))
        pTablesHTML += '                                     <th>Client</th>';
    if ($("#cbPONo").prop("checked"))
        pTablesHTML += '                                     <th>PO No</th>';
    if ($("#cbPOValue").prop("checked"))
        pTablesHTML += '                                     <th>PO Value</th>';
    if ($("#cbOperationWithInvoiceSerial").prop("checked"))
        pTablesHTML += '                                     <th>Oper.WithInv.Ser.</th>';
    if ($("#cbBranch").prop("checked"))
        pTablesHTML += '                                     <th>Branch</th>';
    if ($("#cbIssueDate").prop("checked"))
        pTablesHTML += '                                     <th>Issue Date</th>';
    if ($("#cbOperState").prop("checked"))
        pTablesHTML += '                                     <th>Oper. State</th>';
    if ($("#cbBookingParty").prop("checked"))
        pTablesHTML += '                                     <th>BookingParty</th>';
    if ($("#cbShipper").prop("checked"))
        pTablesHTML += '                                     <th>Shipper</th>';
    if ($("#cbConsignee").prop("checked"))
        pTablesHTML += '                                     <th>Consignee</th>';
    if ($("#cbEndUser").prop("checked"))
        pTablesHTML += '                                     <th>EndUser</th>';
    if ($("#cbAgent").prop("checked"))
        pTablesHTML += '                                     <th>Agent</th>';
    if ($("#cbCustomsClearanceAgent").prop("checked"))
        pTablesHTML += '                                     <th>CustomsClr.Agent</th>';
    if ($("#cbNotify").prop("checked"))
        pTablesHTML += '                                     <th>Notify</th>';
    if ($("#cbLine").prop("checked"))
        pTablesHTML += '                                     <th>Line</th>';
    if ($("#cbCommodity").prop("checked"))
        pTablesHTML += '                                     <th>Commodity</th>';
    if ($("#cbIncoterm").prop("checked"))
        pTablesHTML += '                                     <th>Incoterm</th>';
    if ($("#cbQuotation").prop("checked"))
        pTablesHTML += '                                     <th>Quotation</th>';
    if ($("#cbContainerTypes").prop("checked"))
        pTablesHTML += '                                     <th>ContainerTypes</th>';
    if ($("#cbContainerNumbers").prop("checked"))
        pTablesHTML += '                                     <th>Container Nos</th>';
    if ($("#cbPackages").prop("checked"))
        pTablesHTML += '                                     <th>Packages</th>';
    if ($("#cbDescriptionOfGoods").prop("checked"))
        pTablesHTML += '                                     <th>DescriptionOfGoods</th>';
    if ($("#cbInvoices").prop("checked"))
        pTablesHTML += '                                     <th>Invoices</th>';
    if ($("#cbInvoiceDate").prop("checked")) //First Invoice
        pTablesHTML += '                                     <th>Inv.Date</th>';
    if ($("#cbCustomerRef").prop("checked"))
        pTablesHTML += '                                     <th>' + (pDefaults.UnEditableCompanyName == "SWI" ? 'Swift Ref' : 'CustomerRef') + '</th>';
    if ($("#cbPODate").prop("checked"))
        pTablesHTML += '                                     <th>PO Date</th>';   
    if ($("#cbReleaseNo").prop("checked"))
        pTablesHTML += '                                     <th>' + (pDefaults.UnEditableCompanyName == 'KDM' ? 'Ref.No.' : 'File Selling Closing Date') + '</th>';
    if ($("#cbReleaseDate").prop("checked"))
        pTablesHTML += '                                     <th>Release Date</th>';
    if ($("#cbReleaseValue").prop("checked"))
        pTablesHTML += '                                     <th>Release Value</th>';
    if ($("#cbSupplierRef").prop("checked"))
        pTablesHTML += '                                     <th>Customs Closing Date</th>';
    if ($("#cbMBL").prop("checked"))
        pTablesHTML += '                                     <th>M B/L(MAWB)</th>';
    if ($("#cbHBL").prop("checked"))
        pTablesHTML += '                                     <th>HBL(HAWB)</th>';
    if ($("#cbCarrier").prop("checked"))
        pTablesHTML += '                                     <th>Carrier</th>';
    if ($("#cbTrucker").prop("checked"))
        pTablesHTML += '                                     <th>Truckers</th>';
    if ($("#cbBookingNo").prop("checked"))
        pTablesHTML += '                                     <th>BookingNo</th>';
    if ($("#cbTEUs").prop("checked"))
        pTablesHTML += '                                     <th>TEUs</th>';
    if ($("#cbVessel").prop("checked"))
        pTablesHTML += '                                     <th>Vessel</th>';
    if ($("#cbVoy").prop("checked"))
        pTablesHTML += '                                     <th>Voy</th>';
    if ($("#cbPOL").prop("checked"))
        pTablesHTML += '                                     <th>POL</th>';
    if ($("#cbPOD").prop("checked"))
        pTablesHTML += '                                     <th>POD</th>';
    if ($("#cbCutOffDate").prop("checked"))
        pTablesHTML += '                                     <th>CutOffDate</th>';
    if ($("#cbETAPOL").prop("checked"))
        pTablesHTML += '                                     <th>ETA POL</th>';
    if ($("#cbETDPOL").prop("checked"))
        pTablesHTML += '                                     <th>ETD POL</th>';
    if ($("#cbATDPOL").prop("checked"))
        pTablesHTML += '                                     <th>ATD POL</th>';
    if ($("#cbETAPOD").prop("checked"))
        pTablesHTML += '                                     <th>ETA POD</th>';
    if ($("#cbATAPOD").prop("checked"))
        pTablesHTML += '                                     <th>ATA POD</th>';
    if ($("#cbTask").prop("checked"))
        pTablesHTML += '                                     <th>Task</th>';
    if ($("#cbAllTask").prop("checked")) {
        if ($("#slTrackingStageStatus").val() == "" && !($("#cbIsClearanceTask").prop("checked")))
            pTablesHTML += '                                     <th style="width:20%;">All Tasks</th>';
        else if ($("#slTrackingStageStatus").val() == 0 && !($("#cbIsClearanceTask").prop("checked")))
            pTablesHTML += '                                     <th style="width:20%;">Not Done Tasks</th>';
        else if ($("#slTrackingStageStatus").val() == 1 && !($("#cbIsClearanceTask").prop("checked")))
            pTablesHTML += '                                     <th style="width:20%;">Done Tasks</th>';
        else if ($("#slTrackingStageStatus").val() == "" && $("#cbIsClearanceTask").prop("checked"))
            pTablesHTML += '                                     <th style="width:20%;">All Clearance Tasks</th>';
        else if ($("#slTrackingStageStatus").val() == 0 && $("#cbIsClearanceTask").prop("checked"))
            pTablesHTML += '                                     <th style="width:20%;">Clearance Tasks Not Done</th>';
        else if ($("#slTrackingStageStatus").val() == 1 && $("#cbIsClearanceTask").prop("checked"))
            pTablesHTML += '                                     <th style="width:20%;">Clearance Tasks Done</th>';
    }
    if ($("#cbNetwork").prop("checked"))
        pTablesHTML += '                                     <th>Agent Network</th>';
    if ($("#cbMoveTypeName").prop("checked"))
        pTablesHTML += '                                     <th>Service Type</th>';
    if ($("#cbGrossWeightSum").prop("checked")) {
        pTablesHTML += '                                     <th class="GrossWeightSum">Gross(KG)</th>';
        if ($("#cbGrossWeightSumTon").prop("checked"))
            pTablesHTML += '                                     <th class="GrossWeightTonSum">Gross(TON)</th>';
    }
    if ($("#cbNetWeightSum").prop("checked")) {
        pTablesHTML += '                                     <th>Net(KG)</th>';
        pTablesHTML += '                                     <th>Net(TON)</th>';
    }
    if ($("#cbVolumeSum").prop("checked"))
        pTablesHTML += '                                     <th>Vol(CBM)</th>';
    if ($("#cbChargeableWeightSum").prop("checked"))
        pTablesHTML += '                                     <th>Chg.Wt</th>';
    if ($("#cbCertificateNumber").prop("checked"))
        pTablesHTML += '                                     <th>Cert.No.</th>';
    if ($("#cbCertificateValue").prop("checked"))
        pTablesHTML += '                                     <th>Cert.Val.</th>';
    if ($("#cbCertificateDate").prop("checked"))
        pTablesHTML += '                                     <th>Cert.Date</th>';
    if ($("#cbQasimaNumber").prop("checked"))
        pTablesHTML += '                                     <th>Qasima No</th>';
    if ($("#cbQasimaDate").prop("checked"))
        pTablesHTML += '                                     <th>QasimaDate</th>';
    if ($("#cbForm13Number").prop("checked"))
        pTablesHTML += '                                     <th>Freight Operation Man</th>';
    if ($("#cbCloseDate").prop("checked"))
        pTablesHTML += '                                     <th>CloseDate</th>';
    if ($("#cbCreator").prop("checked"))
        pTablesHTML += '                                     <th>Created By</th>';
    if ($("#cbCustomerNetwork").prop("checked"))
        pTablesHTML += '                                     <th>Customer Network</th>';
    if ($("#cbClearanceType").prop("checked"))
        pTablesHTML += '                                     <th>C.Clearance Type</th>';
    if ($("#cbReceivables").prop("checked") || ($("#cbMargin").prop("checked") && pOutputTo == "Excel"))
        pTablesHTML += '                                     <th>Rec./Revenue</th>';
    if ($("#cbPayables").prop("checked") || ($("#cbMargin").prop("checked") && pOutputTo == "Excel"))
        pTablesHTML += '                                     <th>Payables/Cost</th>';

    // get all different currencies
    var CurrenciesArray = [];
    if (IsWithCurrenciesDetailed) {
        debugger;
        $.each((pReportRowsWithDetailedCurrencies), function (i, item) {
            var AllCurrencies = item.AllCurrencies;
            if (AllCurrencies != "") {
                var NewCurrenciesArray = AllCurrencies.split("*");
                for (let j = 0; j < NewCurrenciesArray.length; j++) {
                    if (!CurrenciesArray.includes(NewCurrenciesArray[j])) {
                        CurrenciesArray.push(NewCurrenciesArray[j]);
                    }
                }
            }
        })
    }

    if (IsWithCurrenciesDetailed && ($("#cbReceivablesWithCurrencies").prop("checked") || ($("#cbMargin").prop("checked") && pOutputTo == "Excel")))
        pTablesHTML += '                                     <th>Receivables With Currencies</th>';
    if (IsWithCurrenciesDetailed && ($("#cbPayablesWithCurrencies").prop("checked") || pDefaults.UnEditableCompanyName == "MIL" || ($("#cbMargin").prop("checked") && pOutputTo == "Excel")))
        pTablesHTML += '                                     <th>Payables With Currencies</th>';

    if (IsWithCurrenciesDetailed) {
        $.each((CurrenciesArray), function (i, item) {
            pTablesHTML += '                                     <th>Receivables ' + item + '</th>';
        })
    }
    if (IsWithCurrenciesDetailed) {
        $.each((CurrenciesArray), function (i, item) {
            pTablesHTML += '                                     <th>Payables ' + item + '</th>';
        })
    }
    
    if ($("#cbProfit").prop("checked"))
        pTablesHTML += '                                     <th ' + ($("#cbProfit").prop("checked") || ($("#cbMargin").prop("checked") && pOutputTo == "Excel") ? "" : "hide") + '>Profit</th>';
    if ($("#cbMargin").prop("checked"))
        pTablesHTML += '                                     <th ' + ($("#cbMargin").prop("checked") ? "" : "hide") + '>Margin(%)</th>';
    if ($("#cbCourier").prop("checked"))
        pTablesHTML += '                                     <th>Courier No</th>';
    if ($("#cbShipmentType").prop("checked"))
        pTablesHTML += '                                     <th>Shipment Type</th>';
    if ($("#cbACIDNo").prop("checked"))
        pTablesHTML += '                                     <th>ACID Number</th>';
    if ($("#cbReceivingDate").prop("checked"))
        pTablesHTML += '                                     <th>Receiving Date</th>';
    if (pDefaults.UnEditableCompanyName == "NIL") {
        if ($("#cbDODate").prop("checked"))
            pTablesHTML += '                                     <th>Withdraw D/O Date</th>';
    } else {
        if ($("#cbDODate").prop("checked"))
            pTablesHTML += '                                     <th>D/O Date</th>';
    }
    if ($("#cbFreeTime").prop("checked"))
        pTablesHTML += '                                     <th>Free Days</th>';
    if ($("#cbTransientTime").prop("checked"))
        pTablesHTML += '                                     <th>Transit Time</th>';
    if ($("#cbNotes").prop("checked"))
        pTablesHTML += '                                     <th>Notes</th>';
    if (pDefaults.UnEditableCompanyName == "NIL") {
        if ($("#cbNotes2").prop("checked"))
            pTablesHTML += '                                     <th>Notes & Problem</th>';
    } else {
        if ($("#cbNotes2").prop("checked"))
            pTablesHTML += '                                     <th>Notes2</th>';
    }
   
    if ($("#cbDaysFromOpeningFile").prop("checked"))
        pTablesHTML += '                                     <th>Days From Opening File</th>';
    if ($("#cbDaysFromOpeningCertificate").prop("checked"))
        pTablesHTML += '                                     <th>Days From Opening Certificate</th>';
    if ($("#cbCCAVATCertificateValue").prop("checked"))
        pTablesHTML += '                                     <th>CCA VATCertificateValue</th>';
    if ($("#cbCCACommercialProfitTax").prop("checked"))
        pTablesHTML += '                                     <th>CCA CommercialProfitTax</th>';
    if ($("#cbCCACustomsValue").prop("checked"))
        pTablesHTML += '                                     <th>CCA CustomsValue</th>';
    if ($("#cbCCAStorageFees").prop("checked"))
        pTablesHTML += '                                     <th>CCA StorageFees</th>';
    if ($("#cbCCAWindowFees").prop("checked"))
        pTablesHTML += '                                     <th>CCA WindowFees</th>';
    if ($("#cbCCAExchangeRate").prop("checked"))
        pTablesHTML += '                                     <th>CCA ExchangeRate</th>';
    if ($("#cbCCASpendDate").prop("checked"))
        pTablesHTML += '                                     <th>CCA SpendDate</th>';
    if ($("#cbCCAOthers").prop("checked"))
        pTablesHTML += '                                     <th>CCA Others</th>';
    if ($("#cbTankNo").prop("checked"))
        pTablesHTML += '                                     <th>Tank No</th>';
    let ChargeTypeIDs;
    let ChargeTypeIDsArray;
    let ChargeTypeNamesArray;
    
    if (IsWithChargesDetailed) {
        debugger;
        ChargeTypeIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbChargesTypes");
        ChargeTypeIDsArray = ChargeTypeIDs.split(",");
        ChargeTypeNamesArray = ChargeTypeIDsArray.map((ChargeTypeID) => AllChargeTypes.filter((ChargeType) => ChargeType.ID == ChargeTypeID)[0].Name);
        if ($("#cbReceivables").prop("checked")) {
            for (let i = 0; i < ChargeTypeIDsArray.length; i++) {
                let CurrentChargeTypeID = ChargeTypeIDsArray[i];
                let CurrentChargeTypeName = ChargeTypeNamesArray[i];
                let CurrenciesArrayForThisChargeType = [];
                // Calculate CurrenciesArrayForThisChargeType
                OperationsReceivables.forEach((item) => {
                    if (!CurrenciesArrayForThisChargeType.includes(item.CurrencyCode) && CurrentChargeTypeID == item.ChargeTypeID)
                        CurrenciesArrayForThisChargeType.push(item.CurrencyCode);
                });
                CurrenciesArrayForThisChargeType.forEach((Currency) => {
                    pTablesHTML += `                        <th>${CurrentChargeTypeName} - Receivable - ${Currency}</th>`;
                })
            }
        }

        if ($("#cbPayables").prop("checked")) {
            for (let i = 0; i < ChargeTypeIDsArray.length; i++) {
                let CurrentChargeTypeID = ChargeTypeIDsArray[i];
                let CurrentChargeTypeName = ChargeTypeNamesArray[i];
                let CurrenciesArrayForThisChargeType = [];
                // Calculate CurrenciesArrayForThisChargeType
                OperationsPayables.forEach((item) => {
                    if (!CurrenciesArrayForThisChargeType.includes(item.CurrencyCode) && CurrentChargeTypeID == item.ChargeTypeID)
                        CurrenciesArrayForThisChargeType.push(item.CurrencyCode);
                });
                CurrenciesArrayForThisChargeType.forEach((Currency) => {
                    pTablesHTML += `                        <th>${CurrentChargeTypeName} - Payable - ${Currency}</th>`;
                })
            }
        }
    }
    
    pTablesHTML += '                                 </tr>';
    pTablesHTML += '                             </thead>';
    pTablesHTML += '                             <tbody>';
    $.each((pReportRows), function (i, item) {
        pTablesHTML += '                                     <tr style="font-size:90%;">';
        pTablesHTML += '                                         <td class="' + (item.BLType != constHouseBLType ? 'classNotHouse' : '') + '">' + (item.Code == 0 ? "" : item.Code) + '</td>';
        if ($("#cbSalesman").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.Salesman == 0 ? "" : item.Salesman) + '</td>';
        if ($("#cbOperationMan").prop("checked"))
            pTablesHTML += '                                         <td class="classOperationMan">' + (item.OperationManName == 0 ? "" : item.OperationManName) + '</td>';
        if ($("#cbClient").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.ClientName == 0 ? "" : item.ClientName) + '</td>';
        if ($("#cbPONo").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.PONumber == 0 ? "" : item.PONumber) + '</td>';
        if ($("#cbPOValue").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.POValue == 0 ? "" : item.POValue) + '</td>';
        if ($("#cbOperationWithInvoiceSerial").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.OperationWithInvoiceSerial == 0 ? "" : item.OperationWithInvoiceSerial) + '</td>';
        if ($("#cbBranch").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.BranchName == 0 ? "" : item.BranchName) + '</td>';
        if ($("#cbIssueDate").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.OpenDate == "/Date(-2208996000000)/" ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.OpenDate)))) + '</td>'; // I added Punctuation Space '\u2008' to force excel to deal it as a string
        if ($("#cbOperState").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.OperationStageName == 0 ? "" : item.OperationStageName) + '</td>';
        if ($("#cbBookingParty").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.BookingPartyName == 0 ? "" : item.BookingPartyName) + '</td>';
        if ($("#cbShipper").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.ShipperName == 0 ? "" : item.ShipperName) + '</td>';
        if ($("#cbConsignee").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.ConsigneeName == 0 ? "" : item.ConsigneeName) + '</td>';
        if ($("#cbEndUser").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.EndUserName == 0 ? "" : item.EndUserName) + '</td>';
        if ($("#cbAgent").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.AgentName == 0 ? "" : item.AgentName) + '</td>';
        if ($("#cbCustomsClearanceAgent").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.CustomsClearanceAgentName == 0 ? "" : item.CustomsClearanceAgentName) + '</td>';
        if ($("#cbNotify").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.Notify1Name == 0 ? "" : item.Notify1Name) + '</td>';
        if ($("#cbLine").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.LineName == 0 ? "" : item.LineName) + '</td>';
        if ($("#cbCommodity").prop("checked")) {
            pTablesHTML += '                                         <td>' + (item.CommodityName == 0 ? "" : item.CommodityName) + " - " + (item.CommodityName2 == 0 ? "" : item.CommodityName2) + " - " + (item.CommodityName3 == 0 ? "" : item.CommodityName3) + '</td>';
        }
        if ($("#cbIncoterm").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.IncotermName == 0 ? "" : item.IncotermName) + '</td>';
        if ($("#cbQuotation").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.QuotationRouteCode == 0 ? "" : item.QuotationRouteCode) + '</td>';
        if ($("#cbContainerTypes").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.ContainerTypes == 0 ? "" : item.ContainerTypes) + '</td>';
        if ($("#cbContainerNumbers").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.ContainerNumbers == 0 ? "" : item.ContainerNumbers) + '</td>';
        if ($("#cbPackages").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.PackageTypes == 0 ? (item.PackageTypesOnContainersTotals == 0 ? "" : item.PackageTypesOnContainersTotals) : item.PackageTypes) + '</td>';
        if ($("#cbDescriptionOfGoods").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.DescriptionOfGoods == 0 ? "" : item.DescriptionOfGoods) + '</td>';
        if ($("#cbInvoices").prop("checked"))
            pTablesHTML += '                                         <td style="font-size:90%;text-align:left;">' + (item.InvoiceNumbers == 0 ? "" : item.InvoiceNumbers.replace(/\,/g, "<br/>")) + '</td>';
        debugger;
        if ($("#cbInvoiceDate").prop("checked")) {
            if (item.FirstInvoiceDate.includes("-")) { // means date format is like 01-Jan-00 12:00:00 AM
                pTablesHTML += '                                         <td>' + (item.FirstInvoiceDate.substr(0, 9) == '01-Jan-00' ? "" : ConvertDateFormat(item.FirstInvoiceDate.substring(0, item.FirstInvoiceDate.indexOf(' ')))) + '</td>';
            } else {    // means date format is like 1/1/1900
                pTablesHTML += '                                         <td>' + (item.FirstInvoiceDate.substr(0, 8) == '1/1/1900' ? "" : ConvertDateFormat(item.FirstInvoiceDate.substring(0, item.FirstInvoiceDate.indexOf(' ')))) + '</td>';
            }
        }
        
        if ($("#cbCustomerRef").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.CustomerReference == 0 ? "" : item.CustomerReference) + '</td>';
        if ($("#cbPODate").prop("checked"))
            pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/2001", GetDateWithFormatMDY(item.PODate)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.PODate)))) + '</td>';
        if ($("#cbReleaseNo").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.ReleaseNumber == 0 ? "" : item.ReleaseNumber) + '</td>';
        if ($("#cbReleaseDate").prop("checked"))
            pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/2001", GetDateWithFormatMDY(item.ReleaseDate)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.ReleaseDate)))) + '</td>';
        if ($("#cbReleaseValue").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.ReleaseValue == 0 ? "" : item.ReleaseValue) + '</td>';
        if ($("#cbSupplierRef").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.SupplierReference == 0 ? "" : item.SupplierReference) + '</td>';
        if ($("#cbMBL").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.MasterBL == 0 ? "" : item.MasterBL) + '</td>';
        if ($("#cbHBL").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.HouseNumber == 0 ? item.HouseBLs : item.HouseNumber) + '</td>';
        if ($("#cbCarrier").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.LineName == 0 ? "" : item.LineName) + '</td>';
        if ($("#cbTrucker").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.TruckersName == 0 ? "" : item.TruckersName) + '</td>';
        if ($("#cbBookingNo").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.BookingNumbers == 0 ? "" : item.BookingNumbers) + '</td>';
        if ($("#cbTEUs").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.TEUs == 0 || item.TransportType == 2 ? "" : item.TEUs) + '</td>';
        if ($("#cbVessel").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.VesselName == 0 ? "" : item.VesselName) + '</td>';
        if ($("#cbVoy").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.VoyageOrTruckNumber == 0 ? "" : item.VoyageOrTruckNumber) + '</td>';
        if ($("#cbPOL").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.POLCountryCode + ": " + item.POLName) + '</td>';
        if ($("#cbPOD").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.PODCountryCode + ": " + item.PODName) + '</td>';
        if ($("#cbCutOffDate").prop("checked"))
            pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/2001", GetDateWithFormatMDY(item.CutOffDate)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.CutOffDate)))) + '</td>';
        if ($("#cbETAPOL").prop("checked"))
            pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/2001", GetDateWithFormatMDY(item.ETAPOLDate)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.ETAPOLDate)))) + '</td>';
        if ($("#cbETDPOL").prop("checked"))
            pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/2001", GetDateWithFormatMDY(item.ExpectedDeparture)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.ExpectedDeparture)))) + '</td>';
        if ($("#cbATDPOL").prop("checked"))
            pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/2001", GetDateWithFormatMDY(item.ActualDeparture)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.ActualDeparture)))) + '</td>';
        if ($("#cbETAPOD").prop("checked"))
            pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/2001", GetDateWithFormatMDY(item.ExpectedArrival)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.ExpectedArrival)))) + '</td>';
        if ($("#cbATAPOD").prop("checked"))
            pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/2001", GetDateWithFormatMDY(item.ActualArrival)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.ActualArrival)))) + '</td>';
        if ($("#cbTask").prop("checked"))
            pTablesHTML += '                                         <td>' + ($("#slTrackingStage").val() == "" ? (item.TrackingStageName == 0 ? "" : item.TrackingStageName) : $("#slTrackingStage option:selected").text()) + '</td>';
        if ($("#cbAllTask").prop("checked")) {
            if ($("#slTrackingStageStatus").val() == "" && !($("#cbIsClearanceTask").prop("checked")))
                pTablesHTML += '                                         <td style="font-size:90%;text-align:left;width:20%;">' + (item.AllTrackingStages == 0 ? "" : item.AllTrackingStages.replace(/\,/g, "<br/>").replace(/BoldStart/g, "<b><u>").replace(/BoldEnd/g, "</u></b>")) + '</td>';
            else if ($("#slTrackingStageStatus").val() == 0 && !($("#cbIsClearanceTask").prop("checked")))
                pTablesHTML += '                                         <td style="font-size:90%;text-align:left;width:20%;">' + (item.AllTrackingStages_NotDone == 0 ? "" : item.AllTrackingStages_NotDone.replace(/\,/g, "<br/>").replace(/BoldStart/g, "<b><u>").replace(/BoldEnd/g, "</u></b>")) + '</td>';
            else if ($("#slTrackingStageStatus").val() == 1 && !($("#cbIsClearanceTask").prop("checked")))
                pTablesHTML += '                                         <td style="font-size:90%;text-align:left;width:20%;">' + (item.AllTrackingStages_Done == 0 ? "" : item.AllTrackingStages_Done.replace(/\,/g, "<br/>").replace(/BoldStart/g, "<b><u>").replace(/BoldEnd/g, "</u></b>")) + '</td>';
            else if ($("#slTrackingStageStatus").val() == "" && $("#cbIsClearanceTask").prop("checked"))
                pTablesHTML += '                                         <td style="font-size:90%;text-align:left;width:20%;">' + (item.AllTrackingStages_CC == 0 ? "" : item.AllTrackingStages_CC.replace(/\,/g, "<br/>").replace(/BoldStart/g, "<b><u>").replace(/BoldEnd/g, "</u></b>")) + '</td>';
            else if ($("#slTrackingStageStatus").val() == 0 && $("#cbIsClearanceTask").prop("checked"))
                pTablesHTML += '                                         <td style="font-size:90%;text-align:left;width:20%;">' + (item.AllTrackingStages_CCNotDone == 0 ? "" : item.AllTrackingStages_CCNotDone.replace(/\,/g, "<br/>").replace(/BoldStart/g, "<b><u>").replace(/BoldEnd/g, "</u></b>")) + '</td>';
            else if ($("#slTrackingStageStatus").val() == 1 && $("#cbIsClearanceTask").prop("checked"))
                pTablesHTML += '                                         <td style="font-size:90%;text-align:left;width:20%;">' + (item.AllTrackingStages_CCDone == 0 ? "" : item.AllTrackingStages_CCDone.replace(/\,/g, "<br/>").replace(/BoldStart/g, "<b><u>").replace(/BoldEnd/g, "</u></b>")) + '</td>';
        }
        if ($("#cbNetwork").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.NetworkName == 0 ? "" : item.NetworkName) + '</td>';
        if ($("#cbMoveTypeName").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.MoveTypeName == 0 ? "" : item.MoveTypeName) + '</td>';
        if ($("#cbGrossWeightSum").prop("checked")) {
            pTablesHTML += '                                         <td class="' + (item.BLType == constHouseBLType ? '' : 'GrossWeightSum') + '">' + (item.GrossWeightSum == 0 ? "" : item.GrossWeightSum) + '</td>';
            if ($("#cbGrossWeightSumTon").prop("checked"))
                pTablesHTML += '                                         <td class="' + (item.BLType == constHouseBLType ? '' : 'GrossWeightTONSum') + '">' + (item.GrossWeightTONSum == 0 ? "" : item.GrossWeightTONSum) + '</td>';
            grossWgtKg += item.GrossWeightSum;
            grossWgtTn += item.GrossWeightTONSum;
        }
        if ($("#cbNetWeightSum").prop("checked")) {
            pTablesHTML += '                                         <td class="' + (item.BLType == constHouseBLType ? '' : 'NetWeightSum') + '">' + (item.NetWeightSum == 0 ? "" : item.NetWeightSum) + '</td>';
            pTablesHTML += '                                         <td class="' + (item.BLType == constHouseBLType ? '' : 'NetWeightTONSum') + '">' + (item.NetWeightTONSum == 0 ? "" : item.NetWeightTONSum) + '</td>';
        }
        if ($("#cbVolumeSum").prop("checked"))
            pTablesHTML += '                                         <td class="' + (item.BLType == constHouseBLType ? '' : 'VolumeSum') + '">' + (item.VolumeSum == 0 ? "" : item.VolumeSum) + '</td>';
        if ($("#cbChargeableWeightSum").prop("checked"))
            pTablesHTML += '                                         <td class="' + (item.BLType == constHouseBLType ? '' : 'ChargeableWeightSum') + '">' + (item.ChargeableWeight == 0 ? "" : item.ChargeableWeight) + '</td>';
        if ($("#cbCertificateNumber").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.CertificateNumber == 0 ? "" : item.CertificateNumber) + '</td>';
        if ($("#cbCertificateValue").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.CertificateValue == 0 ? "" : item.CertificateValue) + '</td>';
        if ($("#cbCertificateDate").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.CertificateDate == 0 ? "" : (item.CertificateDate)) + '</td>';
        if ($("#cbQasimaNumber").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.QasimaNumber == 0 ? "" : item.QasimaNumber) + '</td>';
        if ($("#cbQasimaDate").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.QasimaDate == 0 ? "" : (item.QasimaDate)) + '</td>';
        if ($("#cbForm13Number").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.Form13Number == 0 ? "" : item.Form13Number) + '</td>';
        if ($("#cbCloseDate").prop("checked"))
            pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/2001", GetDateWithFormatMDY(item.CloseDate)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.CloseDate)))) + '</td>';
        if ($("#cbCreator").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.CreatorName == 0 ? "" : item.CreatorName) + '</td>';
        //to be removed in case of slow report
        if ($("#cbCustomerNetwork").prop("checked"))
            pTablesHTML += '                                         <td>' + IsNull(item.NetworksNames, "") + '</td>';
        if ($("#cbClearanceType").prop("checked"))
            pTablesHTML += '                                         <td>' + IsNull(item.CC_ClearanceTypeName, "") + '</td>';
        if ($("#cbReceivables").prop("checked") || ($("#cbMargin").prop("checked") && pOutputTo == "Excel"))
            pTablesHTML += '                                         <td class="classReceivables">'
                + ($("#cbIsWithoutVAT").prop("checked")
                    ? (item.ReceivablesWithoutVAT - item.FixedDiscount).toFixed(2)
                    : (item.Receivables - item.FixedDiscount).toFixed(2)
                )
                + '</td>';
        if ($("#cbPayables").prop("checked") || pDefaults.UnEditableCompanyName == "MIL" || ($("#cbMargin").prop("checked") && pOutputTo == "Excel"))
            pTablesHTML += '                                         <td class="classPayables">'
                + ($("#cbIsWithoutVAT").prop("checked")
                    ? item.PayablesWithoutVAT.toFixed(2)
                    : item.Payables.toFixed(2)
                )
                + '</td>';
        
        if (IsWithCurrenciesDetailed && ($("#cbReceivablesWithCurrencies").prop("checked") || ($("#cbMargin").prop("checked") && pOutputTo == "Excel")))
            pTablesHTML += '                                         <td class="classReceivables">'
                + ($("#cbIsWithoutVAT").prop("checked")
                    ? (pReportRowsWithDetailedCurrencies[i].ReceivablesWithoutVATCurrencies)
                    : (pReportRowsWithDetailedCurrencies[i].ReceivablesWithVATSumCurrencies)
                )
                + '</td>';
        if (IsWithCurrenciesDetailed && ($("#cbPayablesWithCurrencies").prop("checked") || pDefaults.UnEditableCompanyName == "MIL" || ($("#cbMargin").prop("checked") && pOutputTo == "Excel")))
            pTablesHTML += '                                         <td class="classPayables">'
                + ($("#cbIsWithoutVAT").prop("checked")
                    ? pReportRowsWithDetailedCurrencies[i].PayablesWithoutVATSumCurrencies
                    : pReportRowsWithDetailedCurrencies[i].PayablesWithVATSumCurrencies
                )
                + '</td>';
        debugger
        if (IsWithCurrenciesDetailed) {
            var ReceivablesDetailedCurrencies = $("#cbIsWithoutVAT").prop("checked")
                ? (pReportRowsWithDetailedCurrencies[i].ReceivablesWithoutVATCurrencies)
                : (pReportRowsWithDetailedCurrencies[i].ReceivablesWithVATSumCurrencies);
            // extract values for each Currency from ReceivablesDetailedCurrencies ex. **EGP*114.00000*EGP***EUR*200.00000*EUR***GBP*300.00000*GBP***USD*400.00000*USD
            $.each((CurrenciesArray), function (i, cur) {
                if (ReceivablesDetailedCurrencies.includes(cur)) {
                    ReceivablesDetailedCurrenciesArr = ReceivablesDetailedCurrencies.split(",");
                    let index = ReceivablesDetailedCurrenciesArr.findIndex(elem => elem.includes(cur));
                    var mySubString = ReceivablesDetailedCurrenciesArr[index].substring(0,
                        ReceivablesDetailedCurrenciesArr[index].lastIndexOf(cur));
                }
                if (isNaN(parseFloat(mySubString))) {
                    pTablesHTML += '                                     <td class="' + cur + '">' + (0) + '</td>';
                } else {
                    pTablesHTML += '                                     <td class="' + cur + '">' + (parseFloat(mySubString)) + '</td>';
                }
            })
        }

        if (IsWithCurrenciesDetailed) {
            var PayablesDetailedCurrencies = $("#cbIsWithoutVAT").prop("checked")
                ? (pReportRowsWithDetailedCurrencies[i].PayablesWithoutVATSumCurrencies)
                : (pReportRowsWithDetailedCurrencies[i].PayablesWithVATSumCurrencies);
            // extract values for each Currency from PayablesDetailedCurrencies ex. **EGP*114.00000*EGP***EUR*200.00000*EUR***GBP*300.00000*GBP***USD*400.00000*USD
            $.each((CurrenciesArray), function (i, cur) {
                if (PayablesDetailedCurrencies.includes(cur)) {
                    PayablesDetailedCurrenciesArr = PayablesDetailedCurrencies.split(",");
                    let index = PayablesDetailedCurrenciesArr.findIndex(elem => elem.includes(cur));
                    var mySubString = PayablesDetailedCurrenciesArr[index].substring(0,
                        PayablesDetailedCurrenciesArr[index].lastIndexOf(cur));
                }
                if (isNaN(parseFloat(mySubString))) {
                    pTablesHTML += '                                     <td class="' + cur + '">' + (0) + '</td>';
                } else {
                    pTablesHTML += '                                     <td class="' + cur + '">' + (parseFloat(mySubString)) + '</td>';
                }
            })
        }
        
        pTablesHTML += ' <td class="classProfit ' + ($("#cbProfit").prop("checked") || ($("#cbMargin").prop("checked") && pOutputTo == "Excel") ? "" : "hide") + '">'
            + ($("#cbIsWithoutVAT").prop("checked")
                ? (item.ReceivablesWithoutVAT - item.PayablesWithoutVAT - item.FixedDiscount).toFixed(2)
                : (item.Receivables - item.Payables - item.FixedDiscount).toFixed(2)
            )
            + '</td>';
        var _Margin = 0;
        if ($("#cbIsWithoutVAT").prop("checked"))
            _Margin = item.ReceivablesWithoutVAT == 0 ? 0 : (100 * (item.ReceivablesWithoutVAT - item.PayablesWithoutVAT - item.FixedDiscount) / item.ReceivablesWithoutVAT);
        else
            _Margin = item.Receivables == 0 ? 0 : (100 * (item.Receivables - item.Payables - item.FixedDiscount) / item.Receivables);
        pTablesHTML += '                                         <td class="classMargin ' + ($("#cbMargin").prop("checked") ? "" : "hide") + '">' + (_Margin == 0 ? 'N/A' : _Margin.toFixed(2)) + '</td>';
        if ($("#cbCourier").prop("checked"))
            pTablesHTML += '                                         <td>' + IsNull(item.MainRouteNotes, '') + '</td>';
        if (pOutputTo != "Excel") { // because class="hide appears in excel and adds a new column
            pTablesHTML += ' <td class="hide ' + (item.BLType == constHouseBLType ? "" : ('BranchID' + item.BranchID)) + '">' + '' + '</td>';
            pTablesHTML += ' <td class="hide ' + (item.BLType == constHouseBLType ? "" : (' TransportType' + item.TransportType + ' DirectionType' + item.DirectionType)) + '">' + '' + '</td>';
        }
        if ($("#cbShipmentType").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.ShipmentTypeCode == 0 ? "" : item.ShipmentTypeCode) + '</td>';
        if ($("#cbACIDNo").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.ACIDNumber == 0 ? "" : item.ACIDNumber) + '</td>';
        if ($("#cbReceivingDate").prop("checked"))
            pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/2001", GetDateWithFormatMDY(item.CCADocumentReceiveDate)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.CCADocumentReceiveDate)))) + '</td>';
        if ($("#cbDODate").prop("checked"))
            pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/2001", GetDateWithFormatMDY(item.DeliveryDate)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.DeliveryDate)))) + '</td>';
        if ($("#cbFreeTime").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.FreeTime == 0 ? "" : item.FreeTime) + '</td>';
        if ($("#cbTransientTime").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.TransientTime == 0 ? "" : item.TransientTime) + '</td>';
        if ($("#cbNotes").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.Notes == 0 ? "" : item.Notes) + '</td>';
        if ($("#cbNotes2").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.Notes2 == 0 ? "" : item.Notes2) + '</td>';
        if ($("#cbDaysFromOpeningFile").prop("checked"))
            pTablesHTML += '                                         <td>' + Date.prototype.compareDates(GetDateWithFormatMDY(item.OpenDate), ConvertDateFormat(getTodaysDateInddMMyyyyFormat())) + '</td>';
        if ($("#cbDaysFromOpeningCertificate").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.CertificateDate ? Date.prototype.compareDates(ConvertDateFormat(item.CertificateDate), ConvertDateFormat(getTodaysDateInddMMyyyyFormat())) : "") + '</td>';
        if ($("#cbCCAVATCertificateValue").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.CCAVATCertificateValue == 0 ? "" : item.CCAVATCertificateValue) + '</td>';
        if ($("#cbCCACommercialProfitTax").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.CCACommercialProfitTax == 0 ? "" : item.CCACommercialProfitTax) + '</td>';
        if ($("#cbCCACustomsValue").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.CCACustomsValue == 0 ? "" : item.CCACustomsValue) + '</td>';
        if ($("#cbCCAStorageFees").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.CCAStorageFees == 0 ? "" : item.CCAStorageFees) + '</td>';
        if ($("#cbCCAWindowFees").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.CCAWindowFees == 0 ? "" : item.CCAWindowFees) + '</td>';
        if ($("#cbCCAExchangeRate").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.CCAExchangeRate == 0 ? "" : item.CCAExchangeRate) + '</td>';
        if ($("#cbCCASpendDate").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.CCASpendDate ? GetDateWithFormatMDY(item.CCASpendDate) : "") + '</td>';
        if ($("#cbCCAOthers").prop("checked"))
            pTablesHTML += '                                         <td>' + (item.CCAOthers == 0 ? "" : item.CCAOthers) + '</td>';
        if ($("#cbTankNo").prop("checked")) {
            var opTankNo = TankNoLst.filter(function (obj) { return obj.OperationID == item.ID; });
            var strTankNo = '';
            $.each(opTankNo, function (i, tank) { strTankNo += tank.TankNo + '\n'; });
            pTablesHTML += '                                         <td>' + strTankNo + '</td>';
        }
        if (IsWithChargesDetailed) {
            debugger;
            if ($("#cbReceivables").prop("checked")) {
                for (let i = 0; i < ChargeTypeIDsArray.length; i++) {
                    let CurrentChargeTypeID = ChargeTypeIDsArray[i];
                    let CurrentChargeTypeName = ChargeTypeNamesArray[i];
                    let CurrenciesArrayForThisChargeType = [];
                    // Calculate CurrenciesArrayForThisChargeType
                    OperationsReceivables.forEach((Receivable) => {
                        if (!CurrenciesArrayForThisChargeType.includes(Receivable.CurrencyCode) && CurrentChargeTypeID == Receivable.ChargeTypeID)
                            CurrenciesArrayForThisChargeType.push(Receivable.CurrencyCode);
                    });
                    CurrenciesArrayForThisChargeType.forEach((Currency) => {
                        let value = 0;
                        OperationsReceivables.forEach((Receivable) => {
                            if (Receivable.OperationID == item.ID && Receivable.ChargeTypeID == CurrentChargeTypeID && Receivable.CurrencyCode == Currency) {
                                value += Receivable.CostAmount;
                            }
                        });
                        pTablesHTML += `<td>${value}</td>`;
                    });
                }
            }
            if ($("#cbPayables").prop("checked")) {
                for (let i = 0; i < ChargeTypeIDsArray.length; i++) {
                    let CurrentChargeTypeID = ChargeTypeIDsArray[i];
                    let CurrentChargeTypeName = ChargeTypeNamesArray[i];
                    let CurrenciesArrayForThisChargeType = [];
                    // Calculate CurrenciesArrayForThisChargeType
                    OperationsPayables.forEach((Receivable) => {
                        if (!CurrenciesArrayForThisChargeType.includes(Receivable.CurrencyCode) && CurrentChargeTypeID == Receivable.ChargeTypeID)
                            CurrenciesArrayForThisChargeType.push(Receivable.CurrencyCode);
                    });
                    CurrenciesArrayForThisChargeType.forEach((Currency) => {
                        let value = 0;
                        OperationsPayables.forEach((Receivable) => {
                            if (Receivable.OperationID == item.ID && Receivable.ChargeTypeID == CurrentChargeTypeID && Receivable.CurrencyCode == Currency) {
                                value += Receivable.CostAmount;
                            }
                        });
                        pTablesHTML += `<td>${value}</td>`;
                    });
                }
            }
        }
        pTablesHTML += ' </tr>';
    });
    pTablesHTML += '   </tbody>';
    pTablesHTML += '  </table>';
    pTablesHTML += ' </div> ';
    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (pOutputTo == "Excel") {
        var pBranchSummary = "";
        /********************************Adding Summary*************************************/
        for (i = 0; i < ArrBranchIDs.length; i++) {
            if ($("#tblOperationsStatistics tbody tr").find("td.BranchID" + ArrBranchIDs[i]).length != 0)
                pBranchSummary += $("#slBranch option[value=" + ArrBranchIDs[i] + "]").text() + " branch: " + $("#tblOperationsStatistics tbody tr").find("td.BranchID" + ArrBranchIDs[i]).length + " Operations" + "<br>";
        }
        debugger;
        if (pOutputTo == "Excel") {
            var pExcelSummary = "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
            pExcelSummary += "<tr><td>Import:" + $("#tblOperationsStatistics tbody tr").find("td.DirectionType1").length + " operations" + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
            pExcelSummary += "<tr><td>Export:" + $("#tblOperationsStatistics tbody tr").find("td.DirectionType2").length + " operations" + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
            pExcelSummary += "<tr><td>Domestic:" + $("#tblOperationsStatistics tbody tr").find("td.DirectionType3").length + " operations" + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
            pExcelSummary += "<tr><td>Ocean:" + $("#tblOperationsStatistics tbody tr").find("td.TransportType1").length + " operations" + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
            pExcelSummary += "<tr><td>Air:" + $("#tblOperationsStatistics tbody tr").find("td.TransportType2").length + " operations" + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
            pExcelSummary += "<tr><td>Inland:" + $("#tblOperationsStatistics tbody tr").find("td.TransportType3").length + " operations" + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
            pExcelSummary += "<tr><td>" + pBranchSummary + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
            pExcelSummary += "<tr><td>Total:" + $("#tblOperationsStatistics tbody tr").find("td.classNotHouse").length + " operations" + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
            pExcelSummary += "<tr><td>Containers Total : " + pContainerTotals + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
            pExcelSummary += "<tr><td>Incoterms Total : " + pIncotermTotals + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
            if (pDefaults.UnEditableCompanyName != "NIL" && $("#hf_CanEdit").val() == 1) {
                if ($("#cbPayables").prop("checked") || pDefaults.UnEditableCompanyName == "MIL" || ($("#cbMargin").prop("checked") && pOutputTo == "Excel"))
                    pExcelSummary += '<tr><td>Payables Summary : ' + parseFloat(GetColumnSum("tblOperationsStatistics", "classPayables")).toFixed(2) + '</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
                if ($("#cbReceivables").prop("checked") || ($("#cbMargin").prop("checked") && pOutputTo == "Excel"))
                    pExcelSummary += '<tr><td>Receivables Summary : ' + parseFloat(GetColumnSum("tblOperationsStatistics", "classReceivables")).toFixed(2) + '</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
                if ($("#cbPayables").prop("checked") && $("#cbReceivables").prop("checked"))
                    pExcelSummary += '<tr><td>Profit Summary : ' + parseFloat(GetColumnSum("tblOperationsStatistics", "classProfit")).toFixed(2) + '</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
            }
            $("#tblOperationsStatistics tbody").append(pExcelSummary);
        }
        ExportHtmlTableToCsv("tblOperationsStatistics", pReportTitle);
    }
    else {
        var mywindow = null;
        if (pOutputTo != "Email")
            mywindow = window.open('', '_blank');
        var ReportHTML = '';
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><script src="/Scripts/utilities/jquery-1.10.2.js" type="text/javascript"></script></head>';
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
        ReportHTML += '             <div class="col-xs-3"><b>B/L Type :</b> ' + $("#divBLTypeFilter label.active").attr("title") + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Salesman :</b> ' + $("#slSalesman option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Customer :</b> ' + $("#slCustomer option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Oper. Status :</b> ' + $("#slOperationStages option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-6"><b>Open Date :</b> ' + ($("#txtFromDate").val() == "" && $("#txtToDate").val() == ""
            ? "All Dates"
            : ($("#txtFromDate").val() == "" ? "" : "From " + $("#txtFromDate").val() + " ") + ($("#txtToDate").val() == "" ? "" : "To " + $("#txtToDate").val())) + '</div>';
        if ($("#slOperationStages option:selected").text() == "CLOSED")
            ReportHTML += '             <div class="col-xs-6"><b>Close Date :</b> ' + ($("#txtFromCloseDate").val() == "" && $("#txtToCloseDate").val() == ""
                ? "All Dates"
                : ($("#txtFromCloseDate").val() == "" ? "" : "From " + $("#txtFromCloseDate").val() + " ") + ($("#txtToCloseDate").val() == "" ? "" : "To " + $("#txtToCloseDate").val())) + '</div>';
        ReportHTML += '                         <div> &nbsp; </div>'
        ReportHTML += pTablesHTML;
        ReportHTML += '             <div class="col-xs-4"><b>Import :</b> ' + $("#tblOperationsStatistics tbody tr").find("td.DirectionType1").length + " Operations"
            + '<br><b>Export :</b> ' + $("#tblOperationsStatistics tbody tr").find("td.DirectionType2").length + " Operations"
            + '<br><b>Domestic :</b> ' + $("#tblOperationsStatistics tbody tr").find("td.DirectionType3").length + " Operations"
            + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Ocean :</b> ' + $("#tblOperationsStatistics tbody tr").find("td.TransportType1").length + " Operations"
            + '<br><b>Air :</b> ' + $("#tblOperationsStatistics tbody tr").find("td.TransportType2").length + " Operations"
            + '<br><b>Inland :</b> ' + $("#tblOperationsStatistics tbody tr").find("td.TransportType3").length + " Operations"
            + '</div>';
        ReportHTML += '             <div class="col-xs-4">'
            + ($("#cbGrossWeightSum").prop("checked") ? ('Total Gross :</b> ' + GetColumnSum("tblOperationsStatistics", "GrossWeightSum") + " KGM<br>") : "")
            + ($("#cbNetWeightSum").prop("checked") ? ('Total Net :</b> ' + parseFloat(GetColumnSum("tblOperationsStatistics", "NetWeightSum")).toFixed(2) + " KGM<br>") : "")
            + ($("#cbVolumeSum").prop("checked") ? ('<b>Total Vol :</b> ' + GetColumnSum("tblOperationsStatistics", "VolumeSum") + " CBM<br>") : "")
            + ($("#cbChargeableWeightSum").prop("checked") ? ('<b>Total Chg.Wt :</b> ' + GetColumnSum("tblOperationsStatistics", "ChargeableWeightSum") + " <br>") : "")
            + '</div>';
        for (i = 0; i < ArrBranchIDs.length; i++) {
            if ($("#tblOperationsStatistics tbody tr").find("td.BranchID" + ArrBranchIDs[i]).length != 0)
                ReportHTML += '             <div class="col-xs-12" style="clear:both;"><b>' + $("#slBranch option[value=" + ArrBranchIDs[i] + "]").text() + " branch: " + '</b> ' + $("#tblOperationsStatistics tbody tr").find("td.BranchID" + ArrBranchIDs[i]).length + " Operations" + '</div>';
        }
        ReportHTML += '             <div class="col-xs-12"><b>Total :</b> ' + $("#tblOperationsStatistics tbody tr").find("td.classNotHouse").length + " operations" + '</div>';
        ReportHTML += '             <div class="col-xs-12"><b>Containers Totals :</b> ' + pContainerTotals + '</div>';
        if (pDefaults.UnEditableCompanyName != "ALL")
            ReportHTML += '             <div class="col-xs-12"><b>Incoterms Totals :</b> ' + pIncotermTotals + '</div>';
        if (pDefaults.UnEditableCompanyName != "NIL" && pDefaults.UnEditableCompanyName != "ALL" && $("#hf_CanEdit").val() == 1) {
            ReportHTML += '             <div class="col-xs-12"><b>Payables Summary :</b> ' + parseFloat(GetColumnSum("tblOperationsStatistics", "classPayables")).toFixed(2) + '</div>';
            ReportHTML += '             <div class="col-xs-12"><b>Receivables Summary :</b> ' + parseFloat(GetColumnSum("tblOperationsStatistics", "classReceivables")).toFixed(2) + '</div>';
            ReportHTML += '             <div class="col-xs-12"><b>Profit Summary :</b> ' + parseFloat(GetColumnSum("tblOperationsStatistics", "classProfit")).toFixed(2) + '</div>';
        }
        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        ReportHTML += '     </footer>';
        ReportHTML += '<script>';
        if (grossWgtKg == 0) {
            ReportHTML += '$("#tblOperationsStatistics th.GrossWeightSum, #tblOperationsStatistics td.GrossWeightSum").remove();';
        }
        if (grossWgtTn == 0) {
            ReportHTML += '$("#tblOperationsStatistics th.GrossWeightTonSum, #tblOperationsStatistics td.GrossWeightTonSum").remove();';
        }
        ReportHTML += '</script>';
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

function OperationsStatistics_PrintForm13(pOutputTo) {
    debugger;
    FadePageCover(true);
    var pParametersWithValues = {
        pSelectedColumns: "ID, Code, ClientName, POLName, PODName, CertificateDate, Form13Number, BranchName"
        , pWhereClause: Form13Statistics_getWhereClause()
        , pCompanyName: pDefaults.UnEditableCompanyName
    };

    CallGETFunctionWithParameters("/api/OperationsStatistics/LoadForm13Data"
        , pParametersWithValues
        , function (data) {
            if (data[0]) //pRecordsExist
            {
                if (pDefaults.UnEditableCompanyName == "MED")
                    Form13Statistics_DrawReport_MED(data, pOutputTo);
                else
                    Form13Statistics_DrawReport(data, pOutputTo);
            }
            else
                swal(strSorry, "Please, No records exist for that search criteria.");
            FadePageCover(false);
        });
}

function Form13Statistics_DrawReport(data, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(data[1]);
    var pReportTitle = "Form 13";
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();


    var pTablesHTML = "";
    pTablesHTML += ' <div style="overflow: auto;"> ';
    pTablesHTML += '                         <table id="tblOperationsStatistics" class="table table-striped text-sm table-bordered  " style="border:solid #000 !important;">';
    pTablesHTML += '                             <thead>';
    pTablesHTML += '                                 <tr class="" style="font-size:90%;">';
    pTablesHTML += '                                     <th>IST</th>';
    pTablesHTML += '                                     <th>FORM 13</th>';
    pTablesHTML += '                                     <th>Booking</th>';
    pTablesHTML += '                                     <th>BL</th>';
    pTablesHTML += '                                     <th>C.C</th>';
    pTablesHTML += '                                     <th>Cert.Date</th>';
    pTablesHTML += '                                     <th>CLIENT</th>';
    pTablesHTML += '                                     <th>CUSTOMER REF</th>';
    pTablesHTML += '                                     <th>SALES RECEIVED</th>';
    pTablesHTML += '                                     <th>SALES DELIVERD</th>';
    pTablesHTML += '                                     <th>Commerce RECEIVED</th>';
    pTablesHTML += '                                     <th>Commerce DELIVERD</th>';
    pTablesHTML += '                                     <th>دروباك RECEIVED</th>';
    pTablesHTML += '                                     <th>دروباك DELIVERD</th>';
    pTablesHTML += '                                     <th>سماح مؤقت RECEIVED</th>';
    pTablesHTML += '                                     <th>سماح مؤقت DELIVERD</th>';
    pTablesHTML += '                                     <th>Notes</th>';
    pTablesHTML += '                                 </tr>';
    pTablesHTML += '                             </thead>';
    pTablesHTML += '                             <tbody>';
    $.each((pReportRows), function (i, item) {
        pTablesHTML += '                                 <tr class="" style="font-size:90%;">';
        pTablesHTML += '                                     <td>' + (item.OperationCode ? item.OperationCode:'')+'</td>';
        pTablesHTML += '                                     <td>' + (item.Form13Number ? item.Form13Number:'')+'</td>';
        pTablesHTML += '                                     <td>' + (item.BookingNumber ? item.BookingNumber:'')+'</td>';
        pTablesHTML += '                                     <td>' + (item.MasterBL ? item.MasterBL:'')+'</td>';
        pTablesHTML += '                                     <td>' + (item.CCAName ? item.CCAName:'')+'</td>';
        pTablesHTML += '                                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CertificateDate)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.CertificateDate))))+'</td>';
        pTablesHTML += '                                     <td>' + (item.ClientName ? item.ClientName:'')+'</td>';
        pTablesHTML += '                                     <td>' + (item.CustomerReference ? item.CustomerReference:'')+'</td>';
        pTablesHTML += '                                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.SalesDateReceived)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.SalesDateReceived))))+'</td>';
        pTablesHTML += '                                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.SalesDateDelivered)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.SalesDateDelivered))))+'</td>';
        pTablesHTML += '                                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CommerceDateReceived)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.CommerceDateReceived))))+'</td>';
        pTablesHTML += '                                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CommerceDateDelivered)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.CommerceDateDelivered))))+'</td>';
        pTablesHTML += '                                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CCDropBackReceived)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.CCDropBackReceived))))+'</td>';
        pTablesHTML += '                                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CCDropBackDelivered)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.CCDropBackDelivered))))+'</td>';
        pTablesHTML += '                                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CCAllowTemporaryReceived)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.CCAllowTemporaryReceived))))+'</td>';
        pTablesHTML += '                                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CCAllowTemporaryDelivered)) < 1 ? "" : (ConvertDateFormat(GetDateWithFormatMDY(item.CCAllowTemporaryDelivered))))+'</td>';
        pTablesHTML += '                                     <td>' + (item.Notes ? item.Notes:'')+'</td>';
        pTablesHTML += '                                 </tr>';
    });
    pTablesHTML += '                             </tbody>';
    pTablesHTML += '                         </table>';
    pTablesHTML += ' </div> ';
    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (pOutputTo == "Excel") {
        debugger;
        //ExportHtmlTableToCsv_RemovingCommasForNumbers("tblOperationsStatistics", pReportTitle);
        ExportHtmlTableToCsv("tblOperationsStatistics", pReportTitle);
    }
    else {

        var mywindow = null;
        if (pOutputTo != "Email")
            mywindow = window.open('', '_blank');
        var ReportHTML = '';
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



        ReportHTML += '                         <div> &nbsp; </div>'

        ReportHTML += pTablesHTML;



        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

        ReportHTML += '     </footer>';

        ReportHTML += '</html>';
        if (pOutputTo != "Email") {
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
        else {
            //SendPDF_ReportByEmail($('#txtToEmail').val(), ReportHTML, pReportTitle, true);
        }
    }
}

function Form13Statistics_DrawReport_MED(data, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(data[1]);
    var pReportTitle = "Operations Statistics";
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();


    var pTablesHTML = "";
    pTablesHTML += ' <div style="overflow: auto;"> ';
    pTablesHTML += '                         <table id="tblOperationsStatistics" class="table table-striped text-sm table-bordered  " style="border:solid #000 !important;">';
    pTablesHTML += '                             <thead>';
    pTablesHTML += '                                 <tr class="" style="font-size:90%;">';

    pTablesHTML += '                                     <th>Op. Number</th>';
    pTablesHTML += '                                     <th>Branch</th>';
    pTablesHTML += '                                     <th>Client Name</th>';
    pTablesHTML += '                                     <th>POL</th>';
    pTablesHTML += '                                     <th>POD</th>';
    pTablesHTML += '                                     <th>Certification Date</th>';
    pTablesHTML += '                                     <th>Form13</th>';
    pTablesHTML += '                                     <th>Form13 Delivered</th>';
    pTablesHTML += '                                     <th>Form13 Notes</th>';

    pTablesHTML += '                                 </tr>';
    pTablesHTML += '                             </thead>';
    pTablesHTML += '                             <tbody>';
    $.each((pReportRows), function (i, item) {
        var CDate = GetDateFromServer(item.Form13Date);
        pTablesHTML += '                                     <tr style="font-size:90%;">';

        pTablesHTML += '                                         <td>' + (item.Code == 0 ? "" : item.Code) + '</td>';
        pTablesHTML += '                                         <td>' + (item.BranchName == 0 ? "" : item.BranchName) + '</td>';
        pTablesHTML += '                                         <td>' + (item.ClientName == 0 ? "" : item.ClientName) + '</td>';
        pTablesHTML += '                                         <td>' + (item.POLName == 0 ? "" : item.POLName) + '</td>';
        pTablesHTML += '                                         <td>' + (item.PODName == 0 ? "" : item.PODName) + '</td>';
        pTablesHTML += '                                         <td>' + (item.CertificateDate == 0 ? "" : item.CertificateDate) + '</td>';
        pTablesHTML += '                                         <td>' + (item.Form13Number == 0 ? "" : item.Form13Number) + '</td>';
        pTablesHTML += '                                         <td><input type="checkbox" disabled ' + (CDate == "01/01/1900" ? '>' : 'checked>') + (CDate == "01/01/1900" ? '' : CDate) + '</td>';
        pTablesHTML += '                                         <td>' + (item.Form13Notes == 0 ? "" : item.Form13Notes) + '</td>';
        
        pTablesHTML += '                                     </tr>';
    });
    pTablesHTML += '                             </tbody>';
    pTablesHTML += '                         </table>';
    pTablesHTML += ' </div> ';
    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (pOutputTo == "Excel") {
        debugger;
        //ExportHtmlTableToCsv_RemovingCommasForNumbers("tblOperationsStatistics", pReportTitle);
        ExportHtmlTableToCsv("tblOperationsStatistics", pReportTitle);
    }
    else {

        var mywindow = null;
        if (pOutputTo != "Email")
            mywindow = window.open('', '_blank');
        var ReportHTML = '';
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

        ReportHTML += '             <div class="col-xs-6"><b>Certificate Date :</b> ' + ($("#txtFromCertificateDate").val() == "" && $("#txtToCertificateDate").val() == ""
            ? "All Dates"
            : ($("#txtFromCertificateDate").val() == "" ? "" : "From " + $("#txtFromCertificateDate").val() + " ") + ($("#txtToCertificateDate").val() == "" ? "" : "To " + $("#txtToCertificateDate").val())) + '</div>';
 
        ReportHTML += '                         <div> &nbsp; </div>'

        ReportHTML += pTablesHTML;

        
 
        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
     
        ReportHTML += '     </footer>';

        ReportHTML += '</html>';
        if (pOutputTo != "Email") {
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
        else {
            //SendPDF_ReportByEmail($('#txtToEmail').val(), ReportHTML, pReportTitle, true);
        }
    }
}

function selectExportDepartmentCBs() {
    SetSelectedColumns(false);
    $("#cbShipper").prop('checked', true);
    $("#cbLine").prop('checked', true);
    $("#cbContainerTypes").prop('checked', true);
    $("#cbPOL").prop('checked', true);
    $("#cbPOD").prop('checked', true);
    $("#cbETDPOL").prop('checked', true);
    if (['MED'].includes(pDefaults.UnEditableCompanyName)) {
        $("#cbATDPOL").prop('checked', true);
        $("#cbCutOffDate").prop('checked', true);
        $("#cbForm13Number").prop('checked', true);
        $("#cbNotes2").prop('checked', true);
        $("#cbDocInfo").prop('checked', true);

    }
}

function Form13Statistics_getWhereClause() {
    debugger;
    var whereClause = " WHERE 1=1 ";
    if (pDefaults.UnEditableCompanyName == "ELI") {
        whereClause += " AND CCAID>0 AND isnull(Form13Number,'')<>''  \n";
        
        if ($('#slCustomer').val() != "") {
            whereClause += " AND ClientID = " + $('#slCustomer').val() + " \n";
        }

        if ($('#slCustomsClearanceAgent').val() != "") {
            whereClause += " AND CCAID = " + $('#slCustomsClearanceAgent').val() + " \n";
        }

        if (isValidDate($("#txtFromDate").val(), 1)) {
            whereClause += " AND OpenDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromDate").val()) + "' \n";
        }
        if (isValidDate($("#txtToDate").val(), 1)) {
            whereClause += " AND cast(OpenDate as date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToDate").val()) + "' \n";
        }

        if (isValidDate($("#txtSalesReceivedFrom").val(), 1)) {
            whereClause += " AND SalesDateReceived >= '" + GetDateWithFormatyyyyMMdd($("#txtSalesReceivedFrom").val()) + "' \n";
        }
        if (isValidDate($("#txtSalesReceivedTo").val(), 1)) {
            whereClause += " AND cast(SalesDateReceived as date) <= '" + GetDateWithFormatyyyyMMdd($("#txtSalesReceivedTo").val()) + "' \n";
        }

        if (isValidDate($("#txtSalesDeliveredFrom").val(), 1)) {
            whereClause += " AND SalesDateDelivered >= '" + GetDateWithFormatyyyyMMdd($("#txtSalesDeliveredFrom").val()) + "' \n";
        }
        if (isValidDate($("#txtSalesDeliveredTo").val(), 1)) {
            whereClause += " AND cast(SalesDateDelivered as date) <= '" + GetDateWithFormatyyyyMMdd($("#txtSalesDeliveredTo").val()) + "' \n";
        }

        if ($("#slForm13DeliveredStatus").val() == 'delivered') {
            whereClause += " AND IsDelivered=1 ";
        }
        else if ($("#slForm13DeliveredStatus").val() == 'notdelivered') {
            whereClause += " AND ISNULL(IsDelivered,0)=0 ";
        }

        if ($('#cbIsNotReceived').is(':checked')) {
            whereClause += " AND SalesDateReceived Is Null \n";
        }
    }
    else {
        if ($("#lbl-filter-import").hasClass('active')) {
            whereClause += "AND DirectionType=1 ";
        } else if ($("#lbl-filter-export").hasClass('active')) {
            whereClause += "AND DirectionType=2 ";
        } else if ($("#lbl-filter-domestic").hasClass('active')) {
            whereClause += "AND DirectionType=3 ";
        } else if ($("#lbl-filter-crossbooking").hasClass('active')) {
            whereClause += "AND DirectionType=4 ";
        } else if ($("#lbl-filter-reexport").hasClass('active')) {
            whereClause += "AND DirectionType=5 ";
        }

        if ($("#lbl-filter-ocean").hasClass('active')) {
            whereClause += "AND TransportType=1 ";
        } else if ($("#lbl-filter-air").hasClass('active')) {
            whereClause += "AND TransportType=2 ";
        } else if ($("#lbl-filter-inland").hasClass('active')) {
            whereClause += "AND TransportType=3 ";
        }

        if (isValidDate($("#txtFrom13DateFrom").val(), 1)) {
            whereClause += " AND CONVERT(DATETIME,Form13Date,103) >= '" + GetDateWithFormatdd_MM_yyyy($("#txtFrom13DateFrom").val()) + "' \n";
        }
        if (isValidDate($("#txtFrom13DateTo").val(), 1)) {
            whereClause += " AND CONVERT(DATETIME,Form13Date,103) <= '" + GetDateWithFormatdd_MM_yyyy($("#txtFrom13DateTo").val()) + "' \n";
        }
        if (isValidDate($("#txtFromCertificateDate").val(), 1)) {
            whereClause += " AND CONVERT(DATETIME,CertificateDate,103) >= '" + GetDateWithFormatdd_MM_yyyy($("#txtFromCertificateDate").val()) + "' \n";
        }
        if (isValidDate($("#txtToCertificateDate").val(), 1)) {
            whereClause += " AND CONVERT(DATETIME,CertificateDate,103) <= '" + GetDateWithFormatdd_MM_yyyy($("#txtToCertificateDate").val()) + "' \n";
        }
        if (isValidDate($("#txtFromDate").val(), 1)) {
            whereClause += " AND OpenDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromDate").val()) + " 00:00:00.000' \n";
        }
        if (isValidDate($("#txtToDate").val(), 1)) {
            whereClause += " AND OpenDate <= '" + GetDateWithFormatyyyyMMdd($("#txtToDate").val()) + " 23:59:50.999' \n";
        }
        if ($('#slCountryPOL').val() != "") {
            whereClause += " AND POLCountryID = " + $('#slCountryPOL').val() + " \n";
        }
        if ($('#slPOL').val() != "") {
            whereClause += " AND POL = " + $('#slPOL').val() + " \n";
        }
        if ($('#slCountryPOD').val() != "") {
            whereClause += " AND PODCountryID = " + $('#slCountryPOD').val() + " \n";
        }
        if ($('#slPOD').val() != "") {
            whereClause += " AND POD = " + $('#slPOD').val() + " \n";
        }
        if ($('#slBranch').val() != "") {
            whereClause += " AND BranchID = " + $('#slBranch').val() + " \n";
        }
        if ($('#slCustomer').val() != "") {
            whereClause += " AND ClientID = " + $('#slCustomer').val() + " \n";
        }
        if ($("#slForm13DeliveredStatus").val() == 'delivered') {
            whereClause += " AND ISNULL(YEAR(Form13Date),1900)>1900 ";
        }
        else if ($("#slForm13DeliveredStatus").val() == 'notdelivered') {
            whereClause += " AND ISNULL(YEAR(Form13Date),1900)=1900 ";
        }
    }
  
    return whereClause;
}
function GetDateWithFormatdd_MM_yyyy(pDate) {
    const [day, month, year] = pDate.split('/');
    return `${year}-${month}-${day}`;
}

function ExportExcelVolumeReport() {
    debugger;
    FadePageCover(true);
    var arr_Keys = new Array();
    var arr_Values = new Array();
    arr_Keys.push("dummy");
    arr_Values.push("dummy");

    var pParametersWithValues =
    {
        query: "select * from vwMescoVolumeReport order by ID desc"
        , arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: "Volume Report"
        , pReportName: "MescoVolumeReport"
        , pReportType: "Excel"
    };

    var url = '/ReportMainClass/PrintReportQueryAndParams?pTitle="' + pParametersWithValues.pTitle + '"'
        + '&query=' + pParametersWithValues.query + ''
        + '&arr_Keys=' + pParametersWithValues.arr_Keys + ''
        + '&arr_Values=' + pParametersWithValues.arr_Values + ''
        + '&pReportName=' + pParametersWithValues.pReportName + ''
        + '&pReportType=' + pParametersWithValues.pReportType + '';

    var win = window.open(url, "_blank");
    win.close;
    if (win) {
        win.addEventListener('beforeunload', function (event) {
            FadePageCover(false);
        });
    }
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
    $("#txtFilterQuotation").val("");
    $("#txtForm13Number").val("");
    $("#txtFromDate_ETD").val("");
    $("#txtToDate_ETD").val("");
    $("#txtFromDate_ETA").val("");
    $("#txtToDate_ETA").val("");
    $("#divCbChargesTypes input[name='nameCbChargesTypes']").prop("checked", false);
    $("#cbCheckAllChargesTypes").prop("checked", false);
}
function removeDatesAndAst(pString) {
    debugger;
    if (pString == null) {
        pString = "";
    }
    const dateP = /\bBoldStart\d{2}\/\d{2}\/\d{4}BoldEnd\b/g;
    const CPattern = /\*/g;

    let y = pString.replace(dateP, '');
    let x = y.replace(CPattern, '');
    return x.trimStart();
}
function removeDates(pString) {
    if (pString == null) {
        pString = "";
    }
    const dateP = /\b\d{2}\/\d{2}\/\d{4}\b/g;
    let x = pString.replace(dateP, '');
    return x.trimStart();
}