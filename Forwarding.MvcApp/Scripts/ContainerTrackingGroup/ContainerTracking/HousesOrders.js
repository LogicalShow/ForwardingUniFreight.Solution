//ATAPODAlarmStatus as a flag to seperate houses from routing orders      in UNF
// 1 ----->  routing order                                                in UNF
// 3 ----->  house                                                        in UNF
//ETAPODAlarmStatus is used to store routing order id in copied house     in UNF

var TodaysDate = new Date();
var FormattedTodaysDate = TodaysDate.toLocaleDateString();
var totalEGB = 0;
var totalUSD = 0;
var totalEUR = 0;
var totalGBP = 0;
var pIsOperationDisabled = false;
var pIsFCL = false;
var pIsFTL = false;
var DisableEditingInPR = false;
function HousesOrders_Initialize() {
    debugger;
    FormID = constOperationsFormID; //to get privilage of operations form for get permissions
    strLoadWithPagingFunctionName = "/api/Operations/LoadWithWhereClause";

    IntializeOperationAutoCompleteSearch();
    ConfigureAfterOperationChangeEvent();

    $('.classSearchOperations').on('keypress', function (args) {
        if (args.keyCode == 13) {
            $("#btnFilterOperationsApply").click();
            return false;
        }
    });
    if (pDefaults.UnEditableCompanyName == "UNF") {
        $("#slOperationOperationManID").prev().text("Customer Service");
        $("#slPickupCity").attr("data-required", "true");
        $("#slDeliveryCity").attr("data-required", "true");
        $("#txtFilterHouseCode").parent().removeClass("hide");
        $(".ISUNIFREIGHT").removeClass("hide");
        $("#btnFilterShippingToExcel").removeClass("hide");
        if (glbCallingControl == "ShippingOrders") {
            $("#slOperationVesselID").attr("data-required", "true");
        } else if (glbCallingControl == "RoutingOrders") {
            $("#slOperationVesselID").attr("data-required", "false");
        }

        $(".OnlyUnfStatus").removeClass("hide");

    }
    $.ajaxSetup({
        cache: true
    });
    $.getScript(strServerURL + '/Scripts/Operations/Operations/DocsOut.js' + '?version=' + version, function () {
        //DocsOut_LoadAll(0, "slDocsOutTypesOutsideModal", false);
    });
    $.ajaxSetup({
        cache: false
    });

    if (glbCallingControl == "ShippingOrders") {
        $("#h3Operations").text('Shipping Orders');
    } else if (glbCallingControl == "RoutingOrders") {
        $("#h3Operations").text('Routing Orders');
    }
    $("#btn-AddShipment").attr("onclick", "Shipments_ClearAllHouseControls();");

    var pControllerParameters = {
        pIsLoadArrayOfObjects: true
        , pPageNumber: 1
        , pPageSize: $("#select-page-size option:selected").text()
        , pWhereClause: Operations_GetFilterWhereClause()
        , pIsBindTableRows: false
        , pWhereClause_Routings: "0"
        , pOrderBy: "ID DESC"
        , pCallingControl: glbCallingControl
    };
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, /*pWhereClause*/"dummy", "ID DESC", 1, 25, pControllerParameters
        , function (pData) {
            if (pDefaults.UnEditableCompanyName == "UNF") {
                $('.classShowForUNF').removeClass('hide');
                $('.OnlyUnfStatus').removeClass('hide');
                routingOrdersReportPermissions();
                
            }
            strBindTableRowsFunctionName = "HousesOrders_BindTableRows";
            HousesOrders_BindTableRows(JSON.parse(pData[0]));

            var pCustomers = pData[2]; var pAgents = pData[3]; var pVessels = pData[4]; var pContainerTypes = pData[5]; var pCountry = pData[6]; var pMoveTypes = pData[7]; var pShippingLines = pData[8];
            var pTruckers = pData[9]; var pUsers = pData[10]; var pCommodity = pData[11]; var pTypeOfStock = pData[12]; var pCCA = pData[13]; var pAirlines = pData[14];


            $("#slFilterBranch").html("<option value=''><--Select--></option>");
            $("#slFilterBranch").append($("#hReadySlBranches").html());
            $("#slFilterBranch").val("");
            ////FillListFromObject(null, 2, "<--All-->", "slFilterShipper", pCustomers, function(){ $("#slFilterConsignee").html($("#slFilterShipper").html());$("#slFilterNotify").html($("#slFilterShipper").html());});

            $("#slFilterShipper").html($("#hReadySlCustomers").html());
            $("#txtFilterNotify").html($("#hReadySlCustomers").html());
            $("#slFilterConsignee").html($("#hReadySlCustomers").html());
            $("#slFilterConsignee2").html($("#hReadySlCustomers").html());
            $("#slFilterBookingParty").html($("#hReadySlCustomers").html());
            $("#slPOLID_TransportID").html($("#hReadySlPorts").html());

       
            GetListWithNameAndWhereClause((glbOperationStageFilter == "" ? null : glbOperationStageFilter), "/api/NoAccessQuoteAndOperStages/LoadAll", "<--Select-->", "ulOperationStages", " WHERE IsOperationStage = 1  AND IsInActive = 0 ORDER BY ViewOrder ");
            ApplySelectListSearch();

            //GetListWithCodeAndWhereClause(null, "/api/Operations/LoadAll", "Select Master Operation", "slMasterOperations", " WHERE 1=1 AND BLType=" + constMasterBLType + " ");
            GetListWithCodeAndWhereClauseWithMultiAttrs(null, "POL,POD,TransportType,ShipmentType", "/api/Operations/LoadAllForHouseOrdersCombo", "Select Master Operation"
                , "hslMasterOperations"
                , " WHERE 1=1 AND BLType=" + constMasterBLType + " "
                , null);

            CallGETFunctionWithParameters("/api/Operations/LoadFilters", { pDummyParameter: 0 }
                , function (pData) {

                    pAgents = pData[0]; var pVessels = pData[1]; var pContainerTypes = pData[2]; var pCountry = pData[3]; var pMoveTypes = pData[4]; var pShippingLines = pData[5];
                    var pTruckers = pData[6]; var pUsers = pData[7]; var pCommodity = pData[8]; var pTypeOfStock = pData[9]; var pCCA = pData[10]; var pAirlines = pData[11];

                    var _Salesmentemp = JSON.parse(pUsers);
                    var pPorts = pData[15];
                    var pStatus = pData[14];
                    var pSalesmen = jQuery.grep(_Salesmentemp, function (_Salesmentemp) {
                        return _Salesmentemp.IsSalesman == true;
                    });

                    //FillListFromObject(null, 2, "<--Select-->", "slVesselCCModule", pVessels, null);
                    //FillListFromObject(null, 2, "<--Select-->", "slCommodityCCModule", pCommodity, null);
                    //FillListFromObject(null, 2, "<--Select-->", "slOriginCountryCCModule", pCountry, null);

                    FillListFromObject(null, 2, "<--Select-->", "slFilterPOLCountry", pCountry, function () {
                        $("#slFilterPODCountry").html($("#slFilterPOLCountry").html());
                        $("#slOriginCountryCCModule").html($("#slFilterPOLCountry").html());
                    });
                    FillListFromObject(null, 2, "<--Select-->", "slFilterAgent", pAgents, null);
                    FillListFromObject(null, 2, "<--Select-->", "txtFilterHubPport", pPorts, null);
                    FillListFromObject(null, 2, "<--Select-->", "slFilterMoveType", pMoveTypes, null);
                    $("#slFilterPOLCountry").attr("onchange"
                        , 'FilterListByAnotherListID($("#slFilterPOL").val() || null, "/api/Ports/LoadAll", "<--Select-->", "slFilterPOL", "slFilterPOLCountry", "CountryID");');
                    $("#slFilterPODCountry").attr("onchange"
                        , 'FilterListByAnotherListID(null, "/api/Ports/LoadAll", "<--Select-->", "slFilterPOD", "slFilterPODCountry", "CountryID");');
                    FillListFromObject(null, 2, "<--Select-->", "slOperationVessels", pVessels, function () {
                        $("#slFilterVessel").html($("#slOperationVessels").html());
                        $("#slVesselCCModule").html($("#slOperationVessels").html());
                    });
                    FillListFromObject(null, 1, "<--Select-->", "slOperationContainerType", pContainerTypes, function () { $("#slOperationContainerType2").html($("#slOperationContainerType").html()); $("#slOperationContainerType3").html($("#slOperationContainerType").html()); });
                    FillListFromObject(null, 2, "<--Select-->", "slFilterShippingLine", pShippingLines, function () { $("#slLineCCModule").html($("#slFilterShippingLine").html()) });
                    FillListFromObject(null, 2, "<--Select-->", "slFilterAirline", pAirlines, null);
                    FillListFromObject(null, 2, "<--Select-->", "slFilterTrucker", pTruckers, null);
                    FillListFromObject(null, 2, "<--Select-->", "slFilterCCA", pCCA, function () { $("#slOperationCCA").html($("#slFilterCCA").html()) });
                    FillListFromObject(null, 2, "<--Select-->", "slCommodity", pCommodity, function () { $("#slCommodityCCModule").html($("#slCommodity").html()); $("#slCertificateCommodity").html($("#slCommodity").html()); });
                    FillListFromObject(null, 2, "<--Select-->", "slTypeOfStock", pTypeOfStock, null);
                    FillListFromObject(null, 2, "<--Select-->", "slFilterCreator", pUsers, null);
                    FillListFromObject(null, 2, "<--Select-->", "slFilterOperationMan", pUsers, null);
                    FillListFromObject(null, 2, "<--Select-->", "slFilterSalesman", JSON.stringify(pSalesmen), function () { $("#slOperationSalesman").html($("#slFilterSalesman").html()); });
                    if (pDefaults.UnEditableCompanyName == "UNF") {
                        $("#slFilterCS").replaceWith('<select id="slFilterCS" class="form-control input-sm">' + $("#slFilterSalesman").html() + '</select>');
                        $("#txtFilterFlexi").parent().addClass("hide");
                        FillDivWithCheckboxes_DynamicWithMultiFields("divStatus", pStatus, "nameCbStatus", "Name", null);

                        $('#cbCheckAllStatus').click(function () {
                            $('#divStatus input:checkbox').prop('checked', this.checked);
                        });

                        $('#divStatus input[type=checkbox]').change(function () {
                            if ($('#divStatus input[type=checkbox]:checked').length == $('#divStatus input[type=checkbox]').length) {
                                $('#cbCheckAllStatus').prop('checked', true);
                            } else {
                                $('#cbCheckAllStatus').prop('checked', false);
                            }
                        });

                    }
                    //FadePageCover(false);
                    GetListWithCodeAndNameAndWhereClause(null, "/api/Ports/LoadAll", "Select POL", "hReadySlPorts", 'where 1=1'
                        , function () {
                           
                        });
                    $("#slClientCCModule").html($("#hReadySlCustomers").html());
                    GetListWithNameAndWhereClauseWithMultiAttrs(null, "Notes", "/api/TrackingStage/LoadAll", TranslateString("SelectFromMenu")
                        , "slStatusCCModule"
                        , "WHERE 1=1 AND IsClearance=1"
                        , null);
                    CallGETFunctionWithParameters("/api/Custody/LoadAll", { pWhereClause: 'WHERE 1=1' }
                        , function (pData) {
                            FillListFromObject(null, 2, "<--Select-->", "slCustodyCCModule", pData[0], null);
                        }, null);
                    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    if (IsNull(pDefaults.ShowUserSalesmen, "false") == true) {
                        $("#slConsignees").html("");
                        $("#slShippers").html("");

                        $('#slOperationSalesman').on('change', function () {
                            //FadePageCover(true);

                            CallGETFunctionWithParameters("/api/Customers/LoadAllWithMinimalColumns"
                                , {
                                    pWhereClauseWithMinimalColumns: (($("#sp-LoginName").text() == "BG EGYPT" ? "WHERE Name=N'BG EGYPT'" : "WHERE 1=1") + "  AND SalesmanID = " + $('#slOperationSalesman').val() + " ")
                                    , pOrderBy: "Name"
                                }
                                , function (pData) {
                                    FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "hReadySlCustomers", pData[0], function () {
                                        try {
                                            $("#slConsignees").prop('disabled', false);
                                            $("#slShippers").prop('disabled', false);
                                            $("#slConsignees").html($("#hReadySlCustomers").html());
                                            $("#slShippers").html($("#hReadySlCustomers").html());
                                            FadePageCover(false)
                                        }
                                        catch (ex) {
                                            console.log('Consignee or shipper is not define')
                                            FadePageCover(false)
                                        }
                                    });

                                }
                                , null);
                        });


                    }
                    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

                }
                , null);
            //FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slOperationMoveTypes", pMoveTypes, null);
            //$("#asideSearch").removeClass("hide");
        }, true);
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    $("#div-main-options").width($("#mainForm").width() - 185);
    $("#divTblOperations").width($("#mainForm").width() - 185);
    //$("#divTblOperations").height($("#mainForm").height() - 360);
}

function ConfigureAfterOperationChangeEvent() {
    $("#slMasterOperations").off('change').on('change', function () {

        if ($("#slMasterOperations").val() == $("#slMasterOperations option:selected").text()) {
            swal('اختيار عملية خاطئء - Is Not Correct Selected Operation');
            window.CurrentOperationID = null;
            //CLearOperationInfo();
        }
        else {
            console.log("operation : " + $("#slMasterOperations").val() + " Is Selected");
            window.CurrentOperationID = $("#slMasterOperations").val();

            $("#hslMasterOperations").val($("#slMasterOperations").val());

            //GetOperationInfoByID($("#slMasterOperations").val(),
            //    function (Operation) {
            //        FillOperationInfo(Operation, true);
            //    });
        }
    }
    );

}

function IntializeOperationAutoCompleteSearch() {
    debugger;
    var DirectionType;
    if (glbCallingControl == 'RoutingOrders') {
        DirectionType = "AND DirectionType = 1";
    } else if (glbCallingControl == 'ShippingOrders') {
        DirectionType = "AND DirectionType = 2";
    } else {
        DirectionType == "";
    }
    $("#slMasterOperations").css({ 'width': '100%' }).select2({
        minimumInputLength: 1,
        tags: [],
        ajax: {
            url: strServerURL + "/api/Operations/GetMasterOperationsByCode",
            dataType: 'json',
            type: "GET",
            contentType: "application/json; charset=utf-8",
            delay: 1000,
            quietMillis: 50,
            data: function (params) {
                var query = {
                    term: " Where CodeSerial = " + params.term + " AND BLType=3 " + DirectionType
                }

                return query;
            },
            processResults: function (data) {

                var d = JSON.parse(data[0]);
                return {
                    results: $.map(d, function (item) {
                        return {
                            text: item.Code,
                            id: item.ID,
                            value: item.ID,
                            pol: item.POL,
                            pod: item.POD
                        };
                    })
                };
            }
        }
    });
}


function Operations_LoadingWithPaging() {
    debugger;
    let pWhereClause = Operations_GetFilterWhereClause();
    let pOrderBy = " ID DESC ";
    let pControllerParameters = {
        pIsLoadArrayOfObjects: false
        , pPageNumber: 1
        , pPageSize: $("#select-page-size option:selected").text()
        , pWhereClause: pWhereClause
        , pIsBindTableRows: false
        , pWhereClause_Routings: "0"
        , pOrderBy: "ID DESC"
        , pCallingControl: glbCallingControl
    }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "api/Operations/LoadWithWhereClause", pWhereClause, "ID DESC", 1, 25, pControllerParameters
        , function (pData) {
            HousesOrders_BindTableRows(JSON.parse(pData[0]));
        });
    //HighlightText("#tblOperations>tbody>tr", $("#txt-Search").val().trim());
}
function Operations_GetFilterWhereClause() {
    debugger;
    let pWhereClause = "WHERE 1=1 " + " \n";

    pWhereClause += "AND BLType=2 " + " \n";                        // Houses Only
/*    pWhereClause += "AND MasterOperationID IS NULL " + " \n";   */    // Not Connected Yet
    var pSelectedStatus = GetAllSelectedIDsAsStringWithNameAttrReport("nameCbStatus");

    if (glbCallingControl == "ShippingOrders") {
        pWhereClause += "AND DirectionType=2 " + " \n";    // Export
    } else if (glbCallingControl == "RoutingOrders") {
        pWhereClause += "AND DirectionType=1 " + " \n";    // Import
    }
    if (pDefaults.UnEditableCompanyName == 'UNF') {

        pWhereClause += "AND ATAPODAlarmStatus = 1 " + " \n"; 

    }

    let pTransportFilter = "";
    let pDirectionFilter = "";
    let pBLTypeFilter = "";
    let pOperationStageFilter = ($("#ulOperationStages").val() == "" || $("#ulOperationStages option:selected").text() == "" ? "" : " ( OperationStageName=N'" + $("#ulOperationStages option:selected").text() + "')"); //if 0 then all stages

    if (pOperationStageFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pOperationStageFilter;

    if ($("#txtFilterOperationCode").val().trim() != "") {
        pWhereClause += " AND (CodeSerial=" + $("#txtFilterOperationCode").val().trim();
        pWhereClause += "       OR MasterOperationCodeSerial=" + $("#txtFilterOperationCode").val().trim();
        pWhereClause += ")";
    }

    
    if ($("#txtFilterQuotationCode").val().trim() != "") {
        //pWhereClause += " AND (CodeSerial=" + $("#txtFilterQuotationCode").val().trim();
        pWhereClause += ` AND (QuotationCode LIKE '%${$("#txtFilterQuotationCode").val().trim()}%')`;
    //    pWhereClause += ")";s
    }

    if (isValidDate($("#txtFilterFromOpenDate").val().trim(), 1)) {
        if ($("#txtFilterFromOpenDate").val() != null && $("#txtFilterFromOpenDate").val() != "" && pWhereClause !== "")
            pWhereClause += " AND OpenDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFilterFromOpenDate").val()) + " 00:00:00.000'";
    }
    if (isValidDate($("#txtFilterToOpenDate").val().trim(), 1)) {
        if ($("#txtFilterToOpenDate").val() != null && $("#txtFilterToOpenDate").val() != "" && pWhereClause !== "")
            pWhereClause += " AND OpenDate <= '" + GetDateWithFormatyyyyMMdd($("#txtFilterToOpenDate").val()) + " 23:59:50.999'";
    }

    if ($("#txtFilterOrderCode").val().trim() != "") {
        pWhereClause += " AND Code LIKE '%" + $("#txtFilterOrderCode").val().trim() + "%'";
    }

    if ($("#txtFilterHubPport").val().trim() != null && $("#txtFilterHubPport").val().trim() != "") {
        pWhereClause += " AND ACIDDetails ='" + $("#txtFilterHubPport").val().trim() + "'";
    }

    if ($("#txtFilterNotify").val().trim() != "") {
        pWhereClause += " AND NotifyID= " + $("#txtFilterNotify").val()
    }
    if ($("#txtFilterVessel").val().trim() != "") {
        pWhereClause += " AND VesselName LIKE '%" + $("#txtFilterVessel").val().trim() + "%'";
    }
    if ($("#txtFilterCity").val().trim() != "") {
        pWhereClause += " AND PickupCityName LIKE '%" + $("#txtFilterCity").val().trim() + "%'";
    }
    if ($("#slFilterBranch").val() != null && $("#slFilterBranch").val() != "")
        pWhereClause += " AND BranchID =" + $("#slFilterBranch").val();
    if ($("#slFilterCreator").val() != null && $("#slFilterCreator").val() != "")
        pWhereClause += " AND CreatorUserID =" + $("#slFilterCreator").val();
    if ($("#slFilterOperationMan").val() != null && $("#slFilterOperationMan").val() != "")
        pWhereClause += " AND OperationManID =" + $("#slFilterOperationMan").val();
    if ($("#slFilterSalesman").val() != null && $("#slFilterSalesman").val() != "")
        pWhereClause += " AND SalesmanID =" + $("#slFilterSalesman").val();
    if ($("#txtFilterInvoiceNumber").val().trim() != "" && pWhereClause !== "")
        pWhereClause += " AND (InvoiceNumbers like '" + $("#txtFilterInvoiceNumber").val().trim().toUpperCase() + "/%' OR InvoiceNumbers like '%," + $("#txtFilterInvoiceNumber").val().trim().toUpperCase() + "/%')";

    if ($("#slFilterCS").val() != null && $("#slFilterCS").val() != "" && pDefaults.UnEditableCompanyName == "UNF")
        pWhereClause += " AND OperationManID =" + $("#slFilterCS").val();
        else
    if (CheckValueIsValidInput("#txtFilterCS")) {
        pWhereClause += " AND OperationManName LIKE '%" + $("#txtFilterCS").val() + "%'";
    }

    if ($("#slShipmentTypeFilter").val() != null && $("#slShipmentTypeFilter").val() != "" && pDefaults.UnEditableCompanyName == "UNF")
        pWhereClause += " AND ShipmentType =" + $("#slShipmentTypeFilter").val();


    if ($("#slHouseStatusFilter").val() != null && $("#slHouseStatusFilter").val() != "" && pDefaults.UnEditableCompanyName == "UNF")
        pWhereClause += " AND OperationStageID =" + $("#slHouseStatusFilter").val();

    if (pDefaults.UnEditableCompanyName == "UNF" && pSelectedStatus!="")
        pWhereClause += " AND OperationStageID in (" + pSelectedStatus +")";

    if ($("#txtFilterETD").val() != undefined && $("#txtFilterETD").val() != null && isValidDate($("#txtFilterETD").val().trim(), 1)) {
        if ($("#txtFilterETD").val() != null && $("#txtFilterETD").val() != "" && pWhereClause !== "")
            pWhereClause += " AND  ExpectedDeparture = CONVERT(DATE ,'" + GetDateWithFormatyyyyMMdd($("#txtFilterETD").val()) + " 00:00:00.000')";
    }
      if ($("#txtFilterETA").val() != undefined && $("#txtFilterETA").val() != null && isValidDate($("#txtFilterETA").val().trim(), 1)) {
        if ($("#txtFilterETA").val() != null && $("#txtFilterETA").val() != "" && pWhereClause !== "")
            pWhereClause += " AND  ExpectedArrival = CONVERT(DATE ,'" + GetDateWithFormatyyyyMMdd($("#txtFilterETA").val()) + " 00:00:00.000')";
    }

   
    if ($("#slFilterDirection").val() != null && $("#slFilterDirection").val() != "" && pWhereClause !== "")
        pWhereClause += " AND DirectionType =" + $("#slFilterDirection").val();
    if ($("#slFilterTransport").val() != null && $("#slFilterTransport").val() != "" && pWhereClause !== "")
        pWhereClause += " AND TransportType =" + $("#slFilterTransport").val();
    if ($("#slFilterShipmentType").val() != null && $("#slFilterShipmentType").val() != "" && pWhereClause !== "")
        pWhereClause += " AND ShipmentType =" + $("#slFilterShipmentType").val();

    if ($("#txtFilterClientName").val().trim() != "" && pWhereClause !== "")
        pWhereClause += " AND ClientName like '%" + $("#txtFilterClientName").val().trim().toUpperCase() + "%' ";
    if ($("#txtFilterGrossWeight").val().trim() != "" && pWhereClause !== "")
        pWhereClause += " AND GrossWeightSum = '" + $("#txtFilterGrossWeight").val().trim().toUpperCase() + "' ";
    if ($("#txtFilterContainerNumber").val().trim() != "" && pWhereClause !== "") {
        pWhereClause += " AND (ContainerNumber like '%" + $("#txtFilterContainerNumber").val().trim().toUpperCase() + "%' ";
        pWhereClause += "      OR ContainerNumbers like '%" + $("#txtFilterContainerNumber").val().trim().toUpperCase() + "%') ";
    }
    if ($("#slFilterShipper").val() != null && $("#slFilterShipper").val() != "" && pWhereClause !== "")
        pWhereClause += " AND ShipperID =" + $("#slFilterShipper").val();
    if ($("#slFilterCCA").val() != null && $("#slFilterCCA").val() != "" && pWhereClause !== "")
        pWhereClause += " AND CustomsClearanceAgentID =" + $("#slFilterCCA").val();
    if ($("#slFilterConsignee").val() != null && $("#slFilterConsignee").val() != "" && pWhereClause !== "")
        pWhereClause += " AND ConsigneeID =" + $("#slFilterConsignee").val();
    if ($("#slFilterConsignee2").val() != null && $("#slFilterConsignee2").val() != "" && pWhereClause !== "")
        pWhereClause += " AND ConsigneeID2 =" + $("#slFilterConsignee2").val();
    if ($("#slFilterAgent").val() != null && $("#slFilterAgent").val() != "" && pWhereClause !== "")
        pWhereClause += " AND AgentID =" + $("#slFilterAgent").val();
    if ($("#slFilterBookingParty").val() != null && $("#slFilterBookingParty").val() != "" && pWhereClause !== "")
        pWhereClause += " AND BookingPartyID =" + $("#slFilterBookingParty").val();
    if ($("#slFilterMoveType").val() != null && $("#slFilterMoveType").val() != "" && pWhereClause !== "")
        pWhereClause += " AND MoveTypeID =" + $("#slFilterMoveType").val();
    if ($("#slFilterAirline").val() != null && $("#slFilterAirline").val() != "" && pWhereClause !== "")
        pWhereClause += " AND AirlineID =" + $("#slFilterAirline").val();
    if ($("#slFilterShippingLine").val() != null && $("#slFilterShippingLine").val() != "" && pWhereClause !== "")
        pWhereClause += " AND ShippingLineID =" + $("#slFilterShippingLine").val();
    if ($("#slFilterVessel").val() != null && $("#slFilterVessel").val() != "" && pWhereClause !== "")
        pWhereClause += " AND VesselID =" + $("#slFilterVessel").val();
    if ($("#slFilterTrucker").val() != null && $("#slFilterTrucker").val() != "" && pWhereClause !== "")
        pWhereClause += " AND ((ISNULL((SELECT COUNT(op.ID) FROM dbo.OperationPartners AS op WHERE dbo.vwOperationsForFilter.ID = op.OperationID AND op.TruckerID = " + $("#slFilterTrucker").val().trim().toUpperCase() + "), 0)) > 0)";
    if ($("#slFilterPOLCountry").val() != null && $("#slFilterPOLCountry").val() != "" && pWhereClause !== "")
        pWhereClause += " AND POLCountryID =" + $("#slFilterPOLCountry").val();
    if ($("#slFilterPOL").val() != null && $("#slFilterPOL").val() != "" && pWhereClause !== "")
        pWhereClause += " AND POL =" + $("#slFilterPOL").val();
    if ($("#slFilterPODCountry").val() != null && $("#slFilterPODCountry").val() != "" && pWhereClause !== "")
        pWhereClause += " AND PODCountryID =" + $("#slFilterPODCountry").val();
    if ($("#slFilterPOD").val() != null && $("#slFilterPOD").val() != "" && pWhereClause !== "")
        pWhereClause += " AND POD =" + $("#slFilterPOD").val();
    if ($("#slFilterIsVesselArrived").val() != null && $("#slFilterIsVesselArrived").val() != "" && pWhereClause != "")
        pWhereClause += " AND IsClearance=" + $("#slFilterIsVesselArrived").val() + " \n";
    if ($("#slFilterIsForm13Delivered").val() != null && $("#slFilterIsForm13Delivered").val() != "" && pWhereClause != "")
        pWhereClause += " AND IsDelivered=" + $("#slFilterIsForm13Delivered").val() + " \n";

    if ($("#txtFilterCustomerReference").val().trim() != "") {
        if (pDefaults.UnEditableCompanyName == "OAO" || pDefaults.UnEditableCompanyName == "ELI")
            pWhereClause += " AND CustomerReference LIKE N'%" + $("#txtFilterCustomerReference").val().trim().toUpperCase() + "%' \n";
        else
            pWhereClause += " AND CustomerReference =N'" + $("#txtFilterCustomerReference").val().trim().toUpperCase() + "' \n";
    }

    if ($("#txtFilterMasterBL").val().trim() != "" && pWhereClause !== "") {
        //if (pDefaults.UnEditableCompanyName == "ALF" || pDefaults.UnEditableCompanyName == "NIS" || pDefaults.UnEditableCompanyName == "DGL" || pDefaults.UnEditableCompanyName == "ELI")
        pWhereClause += " AND MasterBL LIKE N'%" + $("#txtFilterMasterBL").val().trim().toUpperCase() + "%' ";
        //else
        //    pWhereClause += " AND MasterBL = N'" + $("#txtFilterMasterBL").val().trim().toUpperCase() + "' ";
    }

    if ($("#txtFilterHouseBLs").val().trim() != "" && pWhereClause !== "") {
        if (pDefaults.UnEditableCompanyName == "ALF" || pDefaults.UnEditableCompanyName == "NIS" || pDefaults.UnEditableCompanyName == "DGL" || pDefaults.UnEditableCompanyName == "ELI" || pDefaults.UnEditableCompanyName == "DYN" || pDefaults.UnEditableCompanyName == "TEU" || pDefaults.UnEditableCompanyName == "SWI") {
            pWhereClause += " AND (" + " \n";
            pWhereClause += "       HouseNumber LIKE N'%" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "%' ";
            pWhereClause += "       OR ((ISNULL((SELECT COUNT(op.ID) FROM dbo.Operations AS op WHERE dbo.vwOperationsForFilter.ID = op.MasterOperationID AND op.HouseNumber = N'%" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "%'), 0)) > 0)";
            pWhereClause += "     ) \n ";
        }
        else {
            pWhereClause += " AND (" + " \n";
            pWhereClause += "       HouseNumber=N'" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "' ";
            pWhereClause += "       OR ((ISNULL((SELECT COUNT(op.ID) FROM dbo.Operations AS op WHERE dbo.vwOperationsForFilter.ID = op.MasterOperationID AND op.HouseNumber = N'" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "'), 0)) > 0)";
            pWhereClause += "     ) \n ";
        }
        //pWhereClause += " AND (HouseBLs like '%" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "%' OR HouseNumber LIKE N'%" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "%') ";
        ////pWhereClause += " AND HouseNumber=N'" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "' ";
    }



    if ($("#txtFilterFlexi").val().trim() != "" && pWhereClause !== "") {
        //pWhereClause += " AND ((ISNULL((SELECT COUNT(f.ID) FROM dbo.vwFlexiSerial AS f WHERE dbo.vwOperations.ID IN(IsNull(f.ExportOperationID, 0), ISNULL(f.ImportOperationID, 0)) AND f.Code LIKE '%" + $("#txtFilterFlexi").val().trim().toUpperCase() + "%'), 0)) > 0)";
        pWhereClause += " AND ((ISNULL((SELECT COUNT(OCP.ID) FROM OperationContainersAndPackages AS OCP WHERE dbo.vwOperationsForFilter.ID=OCP.OperationID AND OCP.TankOrFlexiNumber = N'" + $("#txtFilterFlexi").val().trim().toUpperCase() + "'), 0)) > 0)";
    }
    if (isValidDate($("#txtFilterLoadingDate").val().trim(), 1)) {
        if ($("#txtFilterLoadingDate").val() != null && $("#txtFilterLoadingDate").val() != "" && pWhereClause !== "")
            pWhereClause += " AND ((ISNULL((SELECT COUNT(o.ID) FROM dbo.Routings AS o WHERE dbo.vwOperationsForFilter.ID = o.OperationID AND CONVERT(DATE , o.StuffingDate) = CONVERT(DATE ,'" + GetDateWithFormatyyyyMMdd($("#txtFilterLoadingDate").val()) + " 00:00:00.000')" + "), 0)) > 0)";
    }
    if ($("#txtFilterQuotation").val().trim() != "" && pWhereClause !== "") {
        pWhereClause += " AND (QuotationCode like N'%" + $("#txtFilterQuotation").val().trim().toUpperCase() + "%') ";
    }
    if ($("#txtFilterForm13Number").val().trim() != "" && pWhereClause !== "") {
        pWhereClause += " AND (Form13Number=N'" + $("#txtFilterForm13Number").val().trim().toUpperCase() + "') ";
    }
    if ($("#txtFilterACIDNumber").val().trim() != "" && pWhereClause !== "") {
        pWhereClause += " AND (ACIDNumber=N'" + $("#txtFilterACIDNumber").val().trim().toUpperCase() + "') ";
    }
    if (pDefaults.UnEditableCompanyName == "UNF" && $("#txtFilterHouseContainerNumber").val().trim() != "" && pWhereClause !== "") {
        pWhereClause += " AND HouseContainerNumber = N'" + $("#txtFilterHouseContainerNumber").val().trim().toUpperCase() + "' ";
    }
    if (pDefaults.UnEditableCompanyName == "UNF" && $("#cbGetAllContainerNumberEmpty").prop("checked") && pWhereClause !== "") {
        pWhereClause += " AND (HouseContainerNumber = N'' OR HouseContainerNumber IS NULL)";
      }
    if (pDefaults.UnEditableCompanyName == "UNF" && $("#txtFilterHouseCode").val().trim() != "") {
        pWhereClause += " AND Code LIKE N'%" + $("#txtFilterHouseCode").val().trim() + "%' \n";
    }
    if (pDefaults.UnEditableCompanyName == "UNF" && $("#cbGetAllMasterOperationEmpty").prop("checked") && pWhereClause !== "") {
        pWhereClause += " AND MasterOperationID IS NULL";
    }

    /*****************Side Controls***************************/

    pWhereClause = (pWhereClause == "" ? " WHERE (1=1) " : pWhereClause);
    return pWhereClause;
}
function ApplySelectListSearch() {
    debugger;
    //if (pDefaults.UnEditableCompanyName == "GBL") {
    $("#slFilterShipper").css({ "width": "100%" }).select2();
    $("#slFilterShipper").trigger("change");

    $("#txtFilterNotify").css({ "width": "100%" }).select2();
    $("#txtFilterNotify").trigger("change");

    $("#slFilterConsignee").css({ "width": "100%" }).select2();
    $("#slFilterConsignee").trigger("change");

    $("#slFilterConsignee2").css({ "width": "100%" }).select2();
    $("#slFilterConsignee2").trigger("change");

    $("#slFilterAgent").css({ "width": "100%" }).select2();
    $("#slFilterAgent").trigger("change");

    $("#slShippers").css({ "width": "100%" }).select2();
    $("#slShippers").trigger("change");

    $("#slConsignees").css({ "width": "100%" }).select2();
    $("#slConsignees").trigger("change");

    $("#slAgents").css({ "width": "100%" }).select2();
    $("#slAgents").trigger("change");

    $("#slOperationVesselID").css({ "width": "100%" }).select2();
    $("#slOperationVesselID").trigger("change");

    $("#slOperationPartnerTypes").css({ "width": "100%" }).select2();
    $("#slOperationPartnerTypes").trigger("change");

    $("#slPartners").css({ "width": "100%" }).select2();
    $("#slPartners").trigger("change");
    $("#slPartners_Customers").css({ "width": "100%" }).select2();
    $("#slPartners_Customers").trigger("change");

    $("#slPOLCountries").css({ "width": "100%" }).select2();
    $("#slPOLCountries").trigger("change");
    $("#slPODCountries").css({ "width": "100%" }).select2();
    $("#slPODCountries").trigger("change");

    $("#slPOL").css({ "width": "100%" }).select2();
    $("#slPOL").trigger("change");
    $("#slPOD").css({ "width": "100%" }).select2();
    $("#slPOD").trigger("change");

    $("#slRoutingsPOLCountries").css({ "width": "100%" }).select2();
    $("#slRoutingsPOLCountries").trigger("change");
    $("#slRoutingsPODCountries").css({ "width": "100%" }).select2();
    $("#slRoutingsPODCountries").trigger("change");

    $("#slRoutingsPOL").css({ "width": "100%" }).select2();
    $("#slRoutingsPOL").trigger("change");
    $("#slRoutingsPOD").css({ "width": "100%" }).select2();
    $("#slRoutingsPOD").trigger("change");

    $("#slRoutingsLines").css({ "width": "100%" }).select2();
    $("#slRoutingsLines").trigger("change");

    $("#slQuotationRoutes").css({ "width": "100%" }).select2();
    $("#slQuotationRoutes").trigger("change");

    $("#slFilterPOLCountry").css({ "width": "100%" }).select2();
    $("#slFilterPOLCountry").trigger("change");
    $("#slFilterPODCountry").css({ "width": "100%" }).select2();
    $("#slFilterPODCountry").trigger("change");

    $("#txtFilterHubPport").css({ "width": "100%" }).select2();
    $("#txtFilterHubPport").trigger("change");
    $("#slPOLID_TransportID").css({ "width": "100%" }).select2();
    $("#slPOLID_TransportID").trigger("change");
    $("#slFilterPOL").css({ "width": "100%" }).select2();
    $("#slFilterPOL").trigger("change");
    $("#slFilterPOD").css({ "width": "100%" }).select2();
    $("#slFilterPOD").trigger("change");

    $("#slOperationToSetHBLCertificate").css({ "width": "100%" }).select2();
    $("#slOperationToSetHBLCertificate").trigger("change");

    $("#slPayableBill").css({ "width": "100%" }).select2();
    $("#slPayableBill").trigger("change");

    //$("#slFilterCCA").css({ "width": "100%" }).select2();
    //$("#slFilterCCA").trigger("change");

    //$("#slFilterBookingParty").css({ "width": "100%" }).select2();
    //$("#slFilterBookingParty").trigger("change");

    //}
    $("div[tabindex='-1']").removeAttr('tabindex');
}
function HousesOrders_BindTableRows(pOperations) {
    ClearAllTableRows("tblOperations");
    debugger;
    let copyControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Copy" + "</span>";
    let printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Print" + "</span>";
    let transferControlsText = " class='btn btn-xs btn-rounded btn-info float-right " + (OEDoc ? "" : " hide ") + "' > <i class='fa fa-exchange' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Transfer" + "</span>";
    $.each(pOperations, function (i, item) {
        if (item.HouseParentID == 0) {

            AppendRowtoTable("tblOperations",

                ("<tr ID='" + item.ID + "' ondblclick='Shipments_FillHouseControls(" + item.ID + ");' class='"
                    + (item.OperationStageID == CancelledQuoteAndOperStageID
                        ? "static-text-danger" //cancelled operation
                        : (item.OperationStageName == "CLOSED" //(Date.prototype.compareDates(FormattedTodaysDate, GetDateWithFormatMDY(item.CloseDate)) <= 0
                            ? "static-text-primary" //closed operation
                            : "")
                    )
                    + "'>"//of tr
                    + "<td class='ID2'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + (IsMESCOCompany ? "<td><i class='fa fa-plus' onclick='ShowHide(" + item.ID + ");'></i></td>" : "")
                    //+ "<td class='ID '> <input type='checkbox' value='" + item.ID + "' " + (item.MasterOperationID == 0 && item.NumberOfHousesConnected == 0 ? "name='Delete'" : " disabled ") + " /></td>"
                    + "<td class='QuotationID hide' val='" + item.QuotationID + "'>" + item.QuotationID + "</td>"
                    + "<td class='MasterOperationID hide' val='" + item.MasterOperationID + "'>" + item.MasterOperationID + "</td>"
                    + "<td class='shownBLTypeIconName hide'><i class= 'fa " + item.BLTypeIconName + " " + item.BLTypeIconStyle + " fa-2x'/></td>"
                    + "<td class='DirectionType hide'>" + item.DirectionType + "</td>"
                    + "<td class='shownDirectionIconName'><i class= 'fa " + item.DirectionIconName + " " + item.DirectionIconStyle + " fa-2x'/><i class= 'fa " + item.TransportIconName + " " + item.TransportIconStyle + " fa-2x'/></td>"
                    + "<td class='TransportType hide'>" + item.TransportType + "</td>"
                    + "<td class='Code'>" + (item.Code == 0 ? "" : item.Code) + "</td>"
                    + "<td class='QuotationsCode hide'>" + (item.QuotationCode == 0 ? "" : item.QuotationCode) + "</td>"
                    + "<td class='RouteMasterOperationCode'>" + (item.RouteMasterOperationCode == 0 ? "" : item.RouteMasterOperationCode) + "</td>"
                    + "<td class='MasterBL'>" + (item.MasterBL == 0 ? "" : item.MasterBL) + "</td>"
                    + "<td class='HouseNumber'>" + (item.HouseNumber == 0 ? "" : item.HouseNumber) + "</td>"
                    + "<td class='OpenedBy " + (1 == 1 ? " hide " : "  ") + "' val='" + item.CreatorUserID + "'>" + item.OpenedBy + "</td>"
                    + "<td class='shownOpenDate hide'>"
                    + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.OpenDate))
                    + "</td>"
                    + "<td class='Reference hide'>" + (pDefaults.UnEditableCompanyName == "KDM" ? (item.ReleaseNumber == 0 ? "" : item.ReleaseNumber) : (item.Reference == 0 ? "" : item.Reference)) + "</td>"
                    + "<td class='Client'>" + (item.BookingPartyName != 0 && item.BLType == constMasterBLType ? item.BookingPartyName : (item.ClientName == 0 ? "" : item.ClientName)) + "</td>"
                    + "<td class='Notify1 " + (pDefaults.UnEditableCompanyName == "UNF" ? "" : "hide") + "'>" + (item.Notify1Name == 0 ? "" : item.Notify1Name) + "</td>"
                    + "<td class='Shipper hide' val='" + item.ShipperID + "'>" + item.ShipperName + "</td>"
                    + "<td class='ShipperAddress hide' val='" + item.ShipperAddressID + "'>" + item.ShipperAddressID + "</td>"
                    + "<td class='ShipperContact hide' val='" + item.ShipperContactID + "'>" + item.ShipperContactID + "</td>"
                    + "<td class='Consignee hide' val='" + item.ConsigneeID + "'>" + item.ConsigneeName + "</td>"
                    + "<td class='ConsigneeAddress hide' val='" + item.ConsigneeAddressID + "'>" + item.ConsigneeAddressID + "</td>"
                    + "<td class='ConsigneeContact hide' val='" + item.ConsigneeContactID + "'>" + item.ConsigneeContactID + "</td>"
                    + "<td class='Agent hide' val='" + item.AgentID + "'>" + item.AgentName + "</td>"
                    + "<td class='AgentAddress hide' val='" + item.AgentAddressID + "'>" + item.AgentAddressID + "</td>"
                    + "<td class='AgentContact hide' val='" + item.AgentContactID + "'>" + item.AgentContactID + "</td>"

                    + "<td class='Carrier hide' val='" + (item.TransportType == "1" ? item.ShippingLineID //Ocean
                        : (item.TransportType == "2" ? item.AirlineID //Air
                            : item.TruckerID) //Inland
                    ) //EOF getting the carrier ID val
                    + "'>" + (item.TransportType == "1" ? (item.ShippingLineName == 0 ? "" : item.ShippingLineName) //Ocean
                        : (item.TransportType == "2" ? (item.AirlineName == 0 ? "" : item.AirlineName)//Air
                            : (item.TruckerName == 0 ? "" : item.TruckerName)) //Inland
                    )
                    + "</td>"
                    + "<td class='Routing'>" + (item.POLName + " > " + item.PODName) + "</td>"
                    + "<td class='POL hide' val='" + item.POL + "'>" + item.POLCode + "</td>"
                    + "<td class='POD hide' val='" + item.POD + "'>" + item.PODCode + "</td>"
                    + "<td class='Incoterm hide' val='" + item.IncotermID + "'>" + item.IncotermName + "</td>"
                    + "<td class='OperationPOrC hide' val='" + item.POrC + "'>" + item.POrC + "</td>"
                    + "<td class='Commodity hide' val='" + item.CommodityID + "'>" + item.CommoditymName + "</td>"
                    + "<td class='TransientTime hide'>" + item.TransientTime + "</td>"
                    + "<td class='CloseDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CloseDate)) + "</td>"
                    //ShipmentType : 1-FCL 2-LCL 3-FTL 4-LTL
                    + "<td class='ShipmentType' val='" + item.ShipmentType+"'>" + GetShipmentType(item.ShipmentType) + " " + item.RepBLTypeShown + "</td>"
                    + "<td class='shownCutOffDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
                    + " <i class='fa fa-calendar'></i>"
                    //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CutOffDate)) + "</small>"
                    + " <small>" + (item.CutOffDate == undefined ? "01/01/1900" : GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.CutOffDate))) + "</small>"
                    + "</span>"
                    + "</td>"
                    + "<td class='CutOffDate hide'>" + (item.CutOffDate == undefined ? "01/01/1900" : (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CutOffDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.CutOffDate)))) + "</td>"
                    + "<td class='Volume hide'>" + item.Volume + "</td>"
                    + "<td class='IncludePickup hide'> <input type='checkbox' disabled='disabled' val='" + (item.IncludePickup == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='PickupAddress hide' val='" + item.PickupAddressID + "'>" + item.PickupAddressID + "</td>"
                    + "<td class='IncludeDelivery hide'> <input type='checkbox' disabled='disabled' val='" + (item.IncludeDelivery == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='DeliveryAddress hide' val='" + item.DeliveryAddressID + "'>" + item.DeliveryAddressID + "</td>"

                    + "<td class='GrossWeight'>" + item.GrossWeight + "</td>"
                    + "<td class='Volume hide'>" + item.Volume + "</td>"
                    + "<td class='ChargeableWeight hide'>" + item.ChargeableWeight + "</td>" //shown as Wt/Msr(MT) incase of ocean or inland
                    + "<td class='IsDangerousGoods hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsDangerousGoods == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                    + "<td class='BookingNumbers hide'>" + item.BookingNumbers + "</td>"
                    + "<td class='NumberOfPackages hide'>" + (item.ContainerTypes == 0 ? (item.PackageTypes == 0 ? "" : item.PackageTypes) : item.ContainerTypes) + "</td>"
                    + "<td class='MoveType " + (1 == 1 ? "hide" : "") + "'>" + (item.MoveTypeCode == 0 ? "" : item.MoveTypeCode) + "</td>"
                    + "<td class='OperationStage hide' val='" + item.OperationStageID + "'>"
                    + (item.OperationStageID == CancelledQuoteAndOperStageID
                        ? item.OperationStageName //cancelled operation
                        : (Date.prototype.compareDates(FormattedTodaysDate, GetDateWithFormatMDY(item.CloseDate)) <= 0
                            ? "CLOSED" //closed operation
                            : item.OperationStageName)
                    ) + "</td>"
                    + "<td class='Salesman hide' val='" + item.SalesmanID + "'>" + item.Salesman + "</td>"
                    + "<td class='OperationMan hide' val='" + item.OperationManID + "'>" + item.OperationMan + "</td>"
                    + "<td class='AgreedRate hide'>" + (item.AgreedRate == "0" ? "" : item.AgreedRate) + "</td>"
                    + "<td class='CustomerReference hide'>" + (item.CustomerReference == "0" ? "" : item.CustomerReference) + "</td>"
                    + "<td class='SupplierReference hide'>" + (item.SupplierReference == "0" ? "" : item.SupplierReference) + "</td>"
                    + "<td class='PONumber hide'>" + (item.PONumber == "0" ? "" : item.PONumber) + "</td>"
                    + "<td class='CertificateNumber hide'>" + (item.CertificateNumber == "0" ? "" : item.CertificateNumber) + "</td>"
                    + "<td class='IsAWB hide'> <input type='checkbox' id='cbIsAWB" + item.ID + "' disabled='disabled' " + (item.IsAWB ? " checked='checked' " : "") + " /></td>"
                    + "<td class='QuotationRouteID hide' val='" + item.QuotationRouteID + "'>" + (item.QuotationRouteID == 0 ? "" : item.QuotationCode.substr(8, 9)) + "</td>"
                    + "<td class='AWB " + (pDefaults.UnEditableCompanyName == "VEN" ? "" : "hide") + "'>" + (item.MAWBSuffix == "0" ? "" : item.AirlinePrefix + ">" + item.MAWBSuffix) + "</td>"
                    //+ "<td class='hide'><a onclick='SwitchToOperationsEditView(" + item.ID + ");' " + editControlsText + "</a></td>"
                    + "<td class='InvoiceNumbers'>" + (item.InvoiceNumbers == 0 ? "" : item.InvoiceNumbers) + "</td>"
                    +"<td class='HouseContainerNumber hide'>" + (item.HouseContainerNumber == 0? (item.ContainerNumber == 0 ? "": item.ContainerNumber.toString().toUpperCase()): item.HouseContainerNumber.toString().toUpperCase()) +"</td>"
                    //+ "<td class='HouseContainerNumber hide'>" + (item.HouseContainerNumber == 0 ? "" : item.HouseContainerNumber.toUpperCase()) + "</td>"
                    + "<td class='ContainerTypes20 hide'>" + (item.ContainerTypes20 == "0" ? "" : item.ContainerTypes20) + "</td>"
                    + "<td class='ContainerTypes40 hide'>" + (item.ContainerTypes40 == "0" ? "" : item.ContainerTypes40) + "</td>"
                    + "<td class=''>"
                    + (glbCallingControl != "TransferHouse" ? ("<a href='#' data-toggle='modal' onclick='Operations_FillPrintDocsOutModal(" + item.ID + ");' " + printControlsText + "</a>") : "")
                    + (glbCallingControl == "TransferHouse" ? ("<a href='#' data-toggle='modal' onclick='Operations_FillTransferHouseModal(" + item.ID + ");' " + transferControlsText + "</a>") : "")
                    //+ "<a href='#CopyOperationModal' data-toggle='modal' onclick='Operations_FillCopyOperationModal(" + item.ID + ");' " + copyControlsText + "</a>"
                    + "</td>"
                    + "</tr>"));


            AppendRowtoTable("tblOperations",
                '<tr id="DaughterOperations' + item.ID + '" style="display: none;">' +
                '<td colspan="12" style="padding-left: 110px;padding-right: 80px;" ><table  id="tblDaughterOperations' + item.ID + '" class="table text-sm table-hover">' +
                '<thead>' +
                '<tr style="background-color:#e9e9cc">' +
                '<th><input id="cb-CheckAll" type="checkbox" /></th>' +
                '<th></th>' +
                '<th>Code</th>' +
                '<th class="hide" id="IsUNF">Quotations Code</th>' +
                '<th>MasterBL</th>' +
                '<th>HouseNo</th>' +
                '<th>Client</th>' +
                '<th>Route</th>' +
                '<th>Shipment</th>' +
                '<th>GrossWt</th>' +
                '<th>Invoices</th>' +
                '<th class="rounded-right"></th>' +
                '</tr>' +
                '</thead>' +
                '<tbody ></tbody></table></td>' +
                '</tr>'
            );
        }
    });

    $.each(pOperations, function (i, house) {
        debugger;
        if (house.HouseParentID == 0) {
            $.each(pOperations, function (y, item) {
                if (house.ID == item.HouseParentID) {
                    AppendRowtoNestedTable("tblDaughterOperations" + house.ID,
                        ("<tr style='height:15px;background-color:#e9e9cc' ID='" + item.ID + "' ondblclick='Shipments_FillControlsFromBLDocuments(" + item.ID + "," + item.MasterOperationID + ");' class='"
                            + (item.OperationStageID == CancelledQuoteAndOperStageID
                                ? "static-text-danger" //cancelled operation
                                : (item.OperationStageName == "CLOSED" //(Date.prototype.compareDates(FormattedTodaysDate, GetDateWithFormatMDY(item.CloseDate)) <= 0
                                    ? "static-text-primary" //closed operation
                                    : "")
                            )
                            + "'>"//of tr
                            + "<td class='ID2'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                            //+ "<td class='ID '> <input type='checkbox' value='" + item.ID + "' " + (item.MasterOperationID == 0 && item.NumberOfHousesConnected == 0 ? "name='Delete'" : " disabled ") + " /></td>"
                            + "<td class='QuotationID hide' val='" + item.QuotationID + "'>" + item.QuotationID + "</td>"
                            ////BLType : 1-Direct 2-House 3-Master
                            //+ "<td class='BLType hide'>" + item.RepBLTypeShown + "</td>"
                            + "<td class='shownBLTypeIconName hide'><i class= 'fa " + item.BLTypeIconName + " " + item.BLTypeIconStyle + " fa-2x'/></td>"
                            //+ "<td class='BLTypeIconName hide'>" + item.BLTypeIconName + "</td>"//this line is to get the value of the IconName to fill it in the modal 
                            //+ "<td class='BLTypeIconStyle hide'>" + item.BLTypeIconStyle + "</td>"//this line is to get the value of the IconStyle to fill it in the modal 
                            ////DirectionType : 1-Import 2-Export 3-Domestic
                            //+ "<td class='DirectionType hide'>" + item.RepDirectionTypeShown + "</td>"
                            + "<td class='DirectionType hide'>" + item.DirectionType + "</td>"
                            //+ "<td class='shownDirectionIconName'><i class= 'fa " + item.DirectionIconName + " " + item.DirectionIconStyle + " fa-2x'/></td>"
                            + "<td class='shownDirectionIconName'><i class= 'fa " + item.DirectionIconName + " " + item.DirectionIconStyle + " fa-2x'/><i class= 'fa " + item.TransportIconName + " " + item.TransportIconStyle + " fa-2x'/></td>"
                            //+ "<td class='DirectionIconName hide'>" + item.DirectionIconName + "</td>"//this line is to get the value of the IconName to fill it in the modal 
                            //+ "<td class='DirectionIconStyle hide'>" + item.DirectionIconStyle + "</td>"//this line is to get the value of the IconStyle to fill it in the modal 
                            ////TransportType : 1-Ocean 2-Air 3-Inland
                            //+ "<td class='TransportType hide'> <input type='text' id='txtTransportType" + item.ID + "' disabled='disabled' value=" + item.TransportType + " /></td>"
                            //+ "<td class='TransportType hide'>" + item.RepTransportTypeShown + "</td>"
                            + "<td class='TransportType hide'>" + item.TransportType + "</td>"
                            //+ "<td class='shownTransportIconName' ><i class= 'fa " + item.TransportIconName + " " + item.TransportIconStyle + " fa-2x'/></td>"
                            //+ "<td class='TransportIconName hide'>" + item.TransportIconName + "</td>"//this line is to get the value of the IconName to fill it in the modal 
                            //+ "<td class='TransportIconStyle hide'>" + item.TransportIconStyle + "</td>"//this line is to get the value of the IconStyle to fill it in the modal 

                            + "<td class='Code'>" + (item.Code == 0 ? item.MasterOperationCode : item.Code) + "</td>"
                            + "<td class='QuotationsCode hide'>" + (item.QuotationCode == 0 ? "" : item.QuotationCode) + "</td>"
                            + "<td class='MasterBL'>" + (item.MasterBL == 0 ? "" : item.MasterBL) + "</td>"
                            + "<td class='HouseNumber'>" + (item.HouseNumber == 0 ? "" : item.HouseNumber) + "</td>"
                            + "<td class='OpenedBy " + (1 == 1/*/pDefaults.UnEditableCompanyName == "FRE"*/ ? " hide " : "  ") + "' val='" + item.CreatorUserID + "'>" + item.OpenedBy + "</td>"
                            //the next line differs from the preceeding one that date could be shown as today, tomorrow, yesterday
                            + "<td class='shownOpenDate hide'>" //+ "<span class='pull-left thumb-sm  calendar-icon-style'>"
                            //+ " <i class='fa fa-calendar'></i>"
                            //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + "</small>"
                            //+ " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.OpenDate)) + "</small>"
                            + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.OpenDate))
                            //+ "</span>"
                            + "</td>"
                            //+ "<td class='OpenDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.OpenDate)) + "</td>"
                            //+ "<td class='Branch' val='" + item.BranchID + "'>" + (item.BranchID == 0 ? "" : item.BranchName) + "</td>"
                            + "<td class='Reference hide'>" + (pDefaults.UnEditableCompanyName == "KDM" ? (item.ReleaseNumber == 0 ? "" : item.ReleaseNumber) : (item.Reference == 0 ? "" : item.Reference)) + "</td>"
                            //+ "<td class='CodeSerial hide'>" + item.CodeSerial + "</td>"
                            //+ "<td class='Client'>" + (item.BLType == constMasterBLType
                            //                            ? (item.AgentName == 0 ? "" : item.AgentName)
                            //                            : (item.DirectionType == constImportDirectionType ? (item.ConsigneeName == 0 ? "" : item.ConsigneeName) : (item.ShipperName == 0 ? "" : item.ShipperName))) + "</td>"
                            //+ "<td class='Client'>" + (item.ClientName == 0 ? "" : item.ClientName) + "</td>"
                            + "<td class='Client'>" + (item.BookingPartyName != 0 && item.BLType == constMasterBLType ? item.BookingPartyName : (item.ClientName == 0 ? "" : item.ClientName)) + "</td>"
                            + "<td class='Shipper hide' val='" + item.ShipperID + "'>" + item.ShipperName + "</td>"
                            + "<td class='ShipperAddress hide' val='" + item.ShipperAddressID + "'>" + item.ShipperAddressID + "</td>"
                            + "<td class='ShipperContact hide' val='" + item.ShipperContactID + "'>" + item.ShipperContactID + "</td>"
                            + "<td class='Consignee hide' val='" + item.ConsigneeID + "'>" + item.ConsigneeName + "</td>"
                            + "<td class='ConsigneeAddress hide' val='" + item.ConsigneeAddressID + "'>" + item.ConsigneeAddressID + "</td>"
                            + "<td class='ConsigneeContact hide' val='" + item.ConsigneeContactID + "'>" + item.ConsigneeContactID + "</td>"
                            + "<td class='Agent hide' val='" + item.AgentID + "'>" + item.AgentName + "</td>"
                            + "<td class='AgentAddress hide' val='" + item.AgentAddressID + "'>" + item.AgentAddressID + "</td>"
                            + "<td class='AgentContact hide' val='" + item.AgentContactID + "'>" + item.AgentContactID + "</td>"

                            + "<td class='Carrier hide' val='" + (item.TransportType == "1" ? item.ShippingLineID //Ocean
                                : (item.TransportType == "2" ? item.AirlineID //Air
                                    : item.TruckerID) //Inland
                            ) //EOF getting the carrier ID val
                            + "'>" + (item.TransportType == "1" ? (item.ShippingLineName == 0 ? "" : item.ShippingLineName) //Ocean
                                : (item.TransportType == "2" ? (item.AirlineName == 0 ? "" : item.AirlineName)//Air
                                    : (item.TruckerName == 0 ? "" : item.TruckerName)) //Inland
                            )
                            + "</td>"
                            + "<td class='Routing'>" + (item.POLName + " > " + item.PODName) + "</td>"
                            + "<td class='POL hide' val='" + item.POL + "'>" + item.POLCode + "</td>"
                            + "<td class='POD hide' val='" + item.POD + "'>" + item.PODCode + "</td>"
                            + "<td class='Incoterm hide' val='" + item.IncotermID + "'>" + item.IncotermName + "</td>"
                            + "<td class='OperationPOrC hide' val='" + item.POrC + "'>" + item.POrC + "</td>"
                            + "<td class='Commodity hide' val='" + item.CommodityID + "'>" + item.CommoditymName + "</td>"
                            + "<td class='TransientTime hide'>" + item.TransientTime + "</td>"
                            + "<td class='CloseDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CloseDate)) + "</td>"
                            //ShipmentType : 1-FCL 2-LCL 3-FTL 4-LTL
                            //+ "<td class='ShipmentType'>" + GetShipmentType(item.ShipmentType) + " " + GetBLType(item.BLType) + "</td>"
                            + "<td class='ShipmentType' val='" + item.ShipmentType +"'>" + GetShipmentType(item.ShipmentType) + " " + item.RepBLTypeShown + "</td>"
                            + "<td class='shownCutOffDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
                            + " <i class='fa fa-calendar'></i>"
                            //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CutOffDate)) + "</small>"
                            + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.CutOffDate)) + "</small>"
                            + "</span>"
                            + "</td>"
                            + "<td class='CutOffDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CutOffDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.CutOffDate))) + "</td>"
                            + "<td class='Volume hide'>" + item.Volume + "</td>"
                            + "<td class='IncludePickup hide'> <input type='checkbox' disabled='disabled' val='" + (item.IncludePickup == true ? "true' checked='checked'" : "'") + " /></td>"
                            + "<td class='PickupAddress hide' val='" + item.PickupAddressID + "'>" + item.PickupAddressID + "</td>"
                            + "<td class='IncludeDelivery hide'> <input type='checkbox' disabled='disabled' val='" + (item.IncludeDelivery == true ? "true' checked='checked'" : "'") + " /></td>"
                            + "<td class='DeliveryAddress hide' val='" + item.DeliveryAddressID + "'>" + item.DeliveryAddressID + "</td>"

                            + "<td class='GrossWeight'>" + item.GrossWeight + "</td>"
                            + "<td class='Volume hide'>" + item.Volume + "</td>"
                            + "<td class='ChargeableWeight hide'>" + item.ChargeableWeight + "</td>" //shown as Wt/Msr(MT) incase of ocean or inland
                            + "<td class='IsDangerousGoods hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsDangerousGoods == true ? "true' checked='checked'" : "'") + " /></td>"
                            + "<td class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                            + "<td class='BookingNumbers hide'>" + item.BookingNumbers + "</td>"
                            + "<td class='NumberOfPackages hide'>" + (item.ContainerTypes == 0 ? (item.PackageTypes == 0 ? "" : item.PackageTypes) : item.ContainerTypes) + "</td>"
                            + "<td class='MoveType " + (1 == 1 ? "hide" : "") + "'>" + (item.MoveTypeCode == 0 ? "" : item.MoveTypeCode) + "</td>"
                            + "<td class='OperationStage hide' val='" + item.OperationStageID + "'>"
                            + (item.OperationStageID == CancelledQuoteAndOperStageID
                                ? item.OperationStageName //cancelled operation
                                : (Date.prototype.compareDates(FormattedTodaysDate, GetDateWithFormatMDY(item.CloseDate)) <= 0
                                    ? "CLOSED" //closed operation
                                    : item.OperationStageName)
                            ) + "</td>"
                            + "<td class='Salesman hide' val='" + item.SalesmanID + "'>" + item.Salesman + "</td>"
                            + "<td class='OperationMan hide' val='" + item.OperationManID + "'>" + item.OperationMan + "</td>"
                            + "<td class='AgreedRate hide'>" + (item.AgreedRate == "0" ? "" : item.AgreedRate) + "</td>"
                            + "<td class='CustomerReference hide'>" + (item.CustomerReference == "0" ? "" : item.CustomerReference) + "</td>"
                            + "<td class='SupplierReference hide'>" + (item.SupplierReference == "0" ? "" : item.SupplierReference) + "</td>"
                            + "<td class='PONumber hide'>" + (item.PONumber == "0" ? "" : item.PONumber) + "</td>"
                            + "<td class='CertificateNumber hide'>" + (item.CertificateNumber == "0" ? "" : item.CertificateNumber) + "</td>"
                            + "<td class='IsAWB hide'> <input type='checkbox' id='cbIsAWB" + item.ID + "' disabled='disabled' " + (item.IsAWB ? " checked='checked' " : "") + " /></td>"
                            + "<td class='QuotationRouteID hide' val='" + item.QuotationRouteID + "'>" + (item.QuotationRouteID == 0 ? "" : item.QuotationCode.substr(8, 9)) + "</td>"
                            + "<td class='AWB " + (pDefaults.UnEditableCompanyName == "VEN" ? "" : "hide") + "'>" + (item.MAWBSuffix == "0" ? "" : item.AirlinePrefix + ">" + item.MAWBSuffix) + "</td>"
                            //+ "<td class='hide'><a onclick='SwitchToOperationsEditView(" + item.ID + ");' " + editControlsText + "</a></td>"
                            + "<td class='InvoiceNumbers'>" + (item.InvoiceNumbers == 0 ? "" : item.InvoiceNumbers) + "</td>"
                            + "<td class='ContainerTypes20 hide'>" + (item.ContainerTypes20 == "0" ? "" : item.ContainerTypes20) + "</td>"
                            + "<td class='ContainerTypes40 hide'>" + (item.ContainerTypes40 == "0" ? "" : item.ContainerTypes40) + "</td>"
                            + "<td class=''>"
                            + (glbCallingControl != "TransferHouse" ? ("<a href='#' data-toggle='modal' onclick='Operations_FillPrintDocsOutModal(" + item.ID + ");' " + printControlsText + "</a>") : "")
                            + (glbCallingControl == "TransferHouse" ? ("<a href='#' data-toggle='modal' onclick='Operations_FillTransferHouseModal(" + item.ID + ");' " + transferControlsText + "</a>") : "")
                            //+ "<a href='#CopyOperationModal' data-toggle='modal' onclick='Operations_FillCopyOperationModal(" + item.ID + ");' " + copyControlsText + "</a>"
                            + "</td>"
                            + "</tr>")
                    );
                    // $("#DaughterHouse" + house.ID).show();
                }

            });
        }
    });

    ////ApplyPermissions();
    //if (OA) { $(".OperationCopy").removeClass("hide"); }
    //else { $(".OperationCopy").addClass("hide"); };
    if (OD) $("#btn-Delete").removeClass("hide"); else $("#btn-Delete").addClass("hide");

    BindAllCheckboxonTable("tblOperations", "ID2");//it attaches function to the checkboxes so when all are checked then check cb-checkall too
    CheckAllCheckbox("ID2");
    //HighlightText("#tblOperations>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
        strDeleteFailMessage = "This command is not completed because of dependencies existance."
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
    FadePageCover(false); //to quickly fade before filters are filled(user psycology)
    //i put FillListWithNames in the LoadView so the value remains unchanged
    ////parameters (pStrFnName, pStrFirstRow, pListName)
    //FillListWithNames("/api/NoAccessQuoteAndOperStages/LoadAll", "ALL STAGES", "ulOperationStages");

    //GetListWithNameAndWhereClause(null, "/api/DocumentTypes/LoadAll", "<-- Select Document Type -->", "slDocsOutTypesOutsideModal", " WHERE 1=1 AND Name <> 'HBL' AND IsDocOut = 1 ORDER BY ViewOrder,TableOrViewName ");
    //DocsOut_LoadAll(0, "slDocsOutTypesOutsideModal");

    if (IsMESCOCompany) {
        $(".ShowForMescoCompaniesOnly").removeClass("hide");
    } else {
        $(".ShowForMescoCompaniesOnly").addClass("hide");
    }
    if (pDefaults.UnEditableCompanyName == "UNF") {
        $(".HouseContainerNumber").removeClass("hide");
        $("#txtHouseContainerNumber").parent().removeClass("hide");
        $("#txtHouseContainerNumber").attr("data-required", "false");
        $("#txtFilterHouseContainerNumber").parent().removeClass("hide");
        $("#cbGetAllContainerNumberEmpty").parent().parent().removeClass("hide");
        $("#cbGetAllMasterOperationEmpty").parent().parent().removeClass("hide");
        if (glbCallingControl == "RoutingOrders") {
            $("#slShippersForBLDocuments").attr("data-required", false);
            $("#slConsigneesForBLDocuments").attr("data-required", true);
        } else {
            $("#slShippersForBLDocuments").attr("data-required", true);
            $("#slConsigneesForBLDocuments").attr("data-required", false);
        }
        $("#IsUNF").removeClass("hide");
        $(".QuotationsCode").removeClass("hide");


    }
    $("#slCargoPlacedOnContainer").parent().addClass("hide");
}
function ShowHide(id) {
    debugger;
    $('#DaughterOperations' + id + '').toggle();
    if ($('#DaughterOperations' + id).css('display') == 'none') {
        $('#' + id).css('background-color', '');
        $('#DaughterOperations' + id).css('background-color', '');
    } else {
        $('#' + id).css('background-color', 'rgb(153, 153, 153)');
        $('#DaughterOperations' + id).css('background-color', '#e9e9cc');

    }

    // $('#tblbodyDaughterHouse  tr').css('background-color','#e9e9cc')
    $('#' + id).css('padding', '0px')
    $('#' + id).css('padding', '0px')

}
function Shipments_ClearAllControls(pHouseParentID) { //called when adding a new house shipment to a master to clear the ShipmentModal
    debugger;
    $(".classShowForUpdate").addClass("hide");
    //if (pDefaults.UnEditableCompanyName == "GLS" && !$("#cbIsAir").prop("checked") && $("#cbIsExport").prop("checked")) {
    $("#txtShipmentHouseNumber").attr("data-required", false);
    //}
    //else {
    //    $("#txtShipmentHouseNumber").attr("data-required", true);
    //}
    if ($("#hIsOperationDisabled").val() == false) {
        $("#divShipmentPackageBtns").removeClass("hide");
        //$("#divShipmentPackage").removeClass("hide");
    }
    else {
        $("#divShipmentPackageBtns").addClass("hide");
        //$("#divShipmentPackage").addClass("hide");
    }
    if ($("#cbIsConsolidation").prop("checked")) {
        $("#divShipmentContainers").removeClass("hide"); //in EditPackageModal 
    }
    else {
        $("#divShipmentContainers").addClass("hide"); //in EditPackageModal
    }
    FadePageCover(true);
    $("#tblShipmentPackage tbody").html("");
    ClearAll("#ShipmentModal");
    ClearAll("#ClearancePropertiesModal");
    jQuery("#ShipmentModal").modal("show");
    $("#slClearanceCurrency").val(pDefaults.CurrencyID);
    $("#lblShownShipment").html("");
    $("#txtOperationOpenDateForBLDocuments").val(getTodaysDateInddMMyyyyFormat());
    $("#txtOperationCloseDateForBLDocuments").val('10/10/2050');
    if (pDefaults.UnEditableCompanyName == "KDM")
        $("#txtShipmentHouseNumber").val($("#txtOperationReleaseNumber").val());
    else if (pDefaults.UnEditableCompanyName == "VER" || pDefaults.UnEditableCompanyName == "ELI") //mostaa
        $("#txtShipmentHouseNumber").val($("#hOperationCode").val());
    $("#txtShipmentHouseNumber").removeAttr("disabled");
    //DeliveryCity_GetList(null, $("#hPODCountryID").val());
    $("#slShipmentPOrC").html($("#slOperationPOrC").html());
    $("#slShipmentPOrC").val(3);
    //if (pDefaults.UnEditableCompanyName == "UNF")
    //    $("#txtOperationOpenDateForBLDocuments").removeAttr("disabled");
    var pParametersWithValues = { pMasterOperationID: "0", pShipmentID: 0, pDefaultCountryID: pDefaults.DefaultCountryID, pShowUserSalesmen: pDefaults.ShowUserSalesmen, pUnEditableCompanyName: pDefaults.UnEditableCompanyName, pFromOperation: false };

    CallGETFunctionWithParameters("/api/Operations/FillShipmentControls", pParametersWithValues
        , function (pData) {
            //var pCustomers = pData[1];
            //var pAgents = pData[2];
            var pPackageTypes = pData[4];
            var pFinalDestination = pData[5];
            var pContainers = pData[6];
            var pNotifyID = pData[7];
            var pPickupCityList = pData[12];
            var pCountryList = pData[13];
            var pVessels = pData[18];

            var pIncotermsList = pData[14];
            var pMoveTypesList = pData[15];
            var pNoAccessFreightTypesList = pData[16];
            var pUsers = pData[19];
            var pWareHouseList = pData[22];


            var _Salesmentemp = JSON.parse(pUsers);
            var pSalesmen = jQuery.grep(_Salesmentemp, function (_Salesmentemp) {
                return _Salesmentemp.IsSalesman == true;
            });
            FillListFromObject(null, 2, "<--Select-->", "slOperationSalesmanForBLDocuments", JSON.stringify(pSalesmen), function () {
                $("#slOperationSalesmanForBLDocuments").val($("#hLoggedUserID").val());
            });


            $("#slConsigneesForBLDocuments").html($("#hReadySlCustomers").html());
            $("#slConsignees2").html($("#hReadySlCustomers").html());
            $("#slShippersForBLDocuments").html($("#hReadySlCustomers").html());
            $("#slNotifyForBLDocuments").html($("#hReadySlCustomers").html());
            $("#slAgentsForBLDocuments").html($("#hReadySlAgents").html());
            //FillListFromObject(null, 2, "<--Select-->", "slAgentsForBLDocuments", pAgents, null);
            $("#slPackageTypes").val("");  //FillListFromObject(null, 2, "<--Select-->", "slPackageTypes", pPackageTypes, null);
            //$("#slShipmentPackageTypes").html($("#slPackageTypes").html());
            FillListFromObject(null, 4, "<--Select-->", "slDeliveryCity", pFinalDestination, null);
            FillListFromObject(null, 4, "<--Select-->", "slPickupCity", pPickupCityList, null);


            FillListFromObject($("#hPOLCountryID").val(), 2, "<--Select-->", "slPickupCountry", pCountryList, function () {
                $("#slDeliveryCountry").html($("#slPickupCountry").html());
                $("#slDeliveryCountry").val($("#hPODCountryID").val());
                if (glbCallingControl == "ShippingOrders") {
                    $("#slPickupCountry").val(1176).trigger('change'); // Egypt
                    $("#slPickupCountry").attr("disabled", "disabled");
                } else if (glbCallingControl == "RoutingOrders") {
                    $("#slDeliveryCountry").val(1176).trigger('change'); // Egypt
                    $("#slDeliveryCountry").attr("disabled", "disabled");
                }
            });
            FillListFromObject(null, 11, "<--Select-->", "slShipmentContainers", pContainers, null); //to be used when open PackagesModal
            FillListFromObject(null, 2, "<--Select-->", "slOperationVesselID", pVessels, null);
            if (pDefaults.UnEditableCompanyName == 'UNF') {
             
                FillListFromObject($("#hLoggedUserID").val(), 2, "<--Select-->", "slOperationOperationManID", pUsers, null);
            }
            else
                FillListFromObject(null, 2, "<--Select-->", "slOperationOperationManID", pUsers, null);

            FillListFromObject(null, 2, "Select Incoterm", "slShipmentIncoterm", pIncotermsList, null);
            FillListFromObject(null, 2, "Select Service Scope", "slOperationMoveTypesForBLDocuments", pMoveTypesList, null);
            if (pDefaults.UnEditableCompanyName == 'UNF') {

                FillListFromObject(1, 2, "Select Freight Type", "slShipmentPOrC", pNoAccessFreightTypesList, null);
            }
            else
                FillListFromObject(null, 2, "Select Freight Type", "slShipmentPOrC", pNoAccessFreightTypesList, null);
         
            FadePageCover(false);
        }
        , null);




    $("#slOperationBranchForBLDocuments").html($("#hReadySlBranches").html());

    //if ($("#hDirectionType").val() == constImportDirectionType) {
    //    $("#slConsigneesForBLDocuments").attr("data-required", true);
    //    $("#slShippersForBLDocuments").attr("data-required", false);
    //}
    //else { //Export or Domestic
    //    $("#slShippersForBLDocuments").attr("data-required", true);
    //    $("#slConsigneesForBLDocuments").attr("data-required", false);
    //}
    $("#slShippersForBLDocuments").attr("data-required", true);
    $("#slConsigneesForBLDocuments").attr("data-required", true);


    //parameter in the next 3 lines are 1:Quotations call, 2:Operations call
    $("#btn-NewAddShipperForBLDocuments").attr("onclick", "Customers_ClearAllControls(1);");
    $("#btn-NewAddConsigneeForBLDocuments").attr("onclick", "Customers_ClearAllControls(1);");
    $("#btn-NewAddNotify").attr("onclick", "Customers_ClearAllControls(1);");
    $("#btn-NewAddAgentForBLDocuments").attr("onclick", "Agents_ClearAllControls(1);");

    $("#btn-EditShipperForBLDocuments").attr("onclick", "Customers_FillControlsFromOperations($('#slShippersForBLDocuments option:selected').val(), null, 1);");
    $("#btn-EditConsigneeForBLDocuments").attr("onclick", "Customers_FillControlsFromOperations($('#slConsigneesForBLDocuments option:selected').val(), null, 1);");
    $("#btn-EditNotify").attr("onclick", "Customers_FillControlsFromOperations($('#slNotifyForBLDocuments option:selected').val(), null, 1);");
    $("#btn-EditAgentForBLDocuments").attr("onclick", "Agents_FillControlsFromOperations($('#slAgentsForBLDocuments option:selected').val(), null, 1);");

    //$("#btnSaveShipment").attr("onclick", "Operations_InsertFromBLDocuments(true,true, function(pData) { if (pData[3] != '') swal('Sorry', pData[3]); else { Shipments_ConnectOrDisconnect(pData[1], true, true); $('#hShipmentID').val(pData[1]); $('#txtShipmentHouseNumber').val(pData[2]); $('#btnSaveShipment').attr('onclick','Shipment_Update();'); swal('Success', 'Saved Successfully.'); } });");
    //$("#btnSaveClearanceProperties").attr("onclick", "Operations_InsertFromBLDocuments(true,true, function(pData) { if (pData[3] != '') swal('Sorry', pData[3]); else { Shipments_ConnectOrDisconnect(pData[1], true, true); $('#hShipmentID').val(pData[1]); $('#txtShipmentHouseNumber').val(pData[2]); $('#btnSaveClearanceProperties').attr('onclick','Shipment_Update();'); swal('Success', 'Saved Successfully.'); } });");
    $("#btnSaveShipment").attr("onclick", "Operations_InsertFromBLDocuments(true,true, function(pData) { if (pData[3] != '') swal('Sorry', pData[3]); else { $('#hShipmentID').val(pData[1]); $('#txtShipmentHouseNumber').val(pData[2]); Operations_LoadingWithPaging(); Shipments_ClearAllControls(); swal('Success', 'Saved Successfully.'); } });");


    if (pHouseParentID !== "") $("#hHouseParentID").val(pHouseParentID);
    //if(pDefaults.UnEditableCompanyName == "UNF")
    //    $("#txtOperationOpenDateForBLDocuments").removeAttr("disabled");
    //$("#btnSaveandNewShipment").attr("onclick", "Operations_InsertFromBLDocuments(true);");
}
function Shipments_FillControlsFromBLDocuments(pID, MasterOperationID) {
    debugger;

    //if (pDefaults.UnEditableCompanyName == "GLS" && !$("#cbIsAir").prop("checked") && $("#cbIsExport").prop("checked")) {
    $("#txtShipmentHouseNumber").attr("data-required", false);
    //}
    //else {
    //$("#txtShipmentHouseNumber").attr("data-required", true);
    //}

    if ($("#cbIsConsolidation").prop("checked")) {
        $("#divShipmentContainers").removeClass("hide"); //in EditPackageModal 
    }
    else {
        $("#divShipmentContainers").addClass("hide"); //in EditPackageModal
    }
    FadePageCover(true);
    $("#tblShipmentPackage tbody").html("");
    ClearAll("#ShipmentModal");
    ClearAll("#ClearancePropertiesModal");
    jQuery("#ShipmentModal").modal("show");

    var pParametersWithValues = { pMasterOperationID: MasterOperationID/*$("#hOperationID").val()*/, pShipmentID: pID, pDefaultCountryID: pDefaults.DefaultCountryID, pShowUserSalesmen: pDefaults.ShowUserSalesmen, pUnEditableCompanyName: pDefaults.UnEditableCompanyName, pFromOperation: false };

    CallGETFunctionWithParameters("/api/Operations/FillShipmentControls", pParametersWithValues
        , function (pData) {
            var pShipmentHeader = JSON.parse(pData[0]);
            var pCustomers = pData[1];
            var pAgents = pData[2];
            var pShipmentPackages = pData[3];
            var pPackageTypes = pData[4];
            var pFinalDestination = pData[5];
            var pContainers = pData[6];
            var pNotifyID = pData[7];
            var pMainRoute = JSON.parse(pData[8]);
            var pPickupCityList = pData[12];
            var pCountryList = pData[13];
            var pIncotermsList = pData[14];
            var pMoveTypesList = pData[15];
            var pNoAccessFreightTypesList = pData[16];

            var pIsOperationClosed = pData[17];
            var pVessels = pData[18];
            var pUsers = pData[19];
            var pWareHouseList = pData[22];


            var _Salesmentemp = JSON.parse(pUsers);
            var pSalesmen = jQuery.grep(_Salesmentemp, function (_Salesmentemp) {
                return _Salesmentemp.IsSalesman == true;
            });
            FillListFromObject(null, 2, "<--Select-->", "slOperationSalesmanForBLDocuments", JSON.stringify(pSalesmen), function () {
                $("#slOperationSalesmanForBLDocuments").val(pShipmentHeader.SalesmanID);
            });

            pIsOperationDisabled = pIsOperationClosed == true || pShipmentHeader.OperationStageID == CancelledQuoteAndOperStageID ? 1 : 0;
            //if (OAPac && $("#hIsOperationDisabled").val() == false) { $(".classSetCargoProperties").removeClass("hide"); $(".classSetClearanceProperties").removeClass("hide"); } else { $(".classSetCargoProperties").addClass("hide"); $(".classSetClearanceProperties").addClass("hide"); }
            if (/*OAPac && */pIsOperationDisabled == false) { $(".classSetCargoProperties").removeClass("hide"); $(".classSetClearanceProperties").removeClass("hide"); } else { $(".classSetCargoProperties").addClass("hide"); $(".classSetClearanceProperties").addClass("hide"); }

            if (/*$("#hIsOperationDisabled").val()*/pIsOperationDisabled == false) {
                $("#divShipmentPackageBtns").removeClass("hide");
                //$("#divShipmentPackage").removeClass("hide");
            } else {
                $("#divShipmentPackageBtns").addClass("hide");
                //$("#divShipmentPackage").addClass("hide");
            }
            debugger;

            if (pShipmentHeader.ShipmentType == constFCLShipmentType)
                pIsFCL = true;
            else if (pShipmentHeader.ShipmentType == constFTLShipmentType)
                pIsFTL = true;

            if ($("#slClearanceCurrency option").length == 0)
                $("#slClearanceCurrency").html($("#hReadySlCurrencies").html());




            $("#hShipmentID").val(pID);
            $("#hOperationID").val(pShipmentHeader.MasterOperationID);

            $("#slTransportType").val(pShipmentHeader.TransportType);
            $("#slShipmentType").val(pShipmentHeader.ShipmentType);


            if (/*$("#hDirectionType").val()*/pShipmentHeader.DirectionType == constImportDirectionType) {
                $("#slConsigneesForBLDocuments").attr("data-required", true);
                $("#slShippersForBLDocuments").attr("data-required", false);
            }
            else { //Export or Domestic
                $("#slShippersForBLDocuments").attr("data-required", true);
                $("#slConsigneesForBLDocuments").attr("data-required", false);
            }

            //FillListFromObject(pShipmentHeader.ShipperID, 2, "<--Select-->", "slShippersForBLDocuments", pCustomers
            //    , function () {
            //        $("#slConsigneesForBLDocuments").html($("#slShippersForBLDocuments").html()); $("#slConsigneesForBLDocuments").val(pShipmentHeader.ConsigneeID == 0 ? "" : pShipmentHeader.ConsigneeID);
            //        $("#slNotifyForBLDocuments").html($("#slShippersForBLDocuments").html()); $("#slNotifyForBLDocuments").val(pNotifyID == 0 ? "" : pNotifyID);
            //    });
            $("#slConsigneesForBLDocuments").html($("#hReadySlCustomers").html()); $("#slConsigneesForBLDocuments").val(pShipmentHeader.ConsigneeID == 0 ? "" : pShipmentHeader.ConsigneeID);
            $("#slConsignees2").html($("#hReadySlCustomers").html()); $("#slConsignees2").val(pShipmentHeader.ConsigneeID2 == 0 ? "" : pShipmentHeader.ConsigneeID2);
            $("#slShippersForBLDocuments").html($("#hReadySlCustomers").html()); $("#slShippersForBLDocuments").val(pShipmentHeader.ShipperID == 0 ? "" : pShipmentHeader.ShipperID);
            $("#slNotifyForBLDocuments").html($("#hReadySlCustomers").html()); $("#slNotifyForBLDocuments").val(pNotifyID == 0 ? "" : pNotifyID);
            $("#slAgentsForBLDocuments").html($("#hReadySlAgents").html()); $("#slAgentsForBLDocuments").val(pShipmentHeader.AgentID == 0 ? "" : pShipmentHeader.AgentID);

            //FillListFromObject(pShipmentHeader.AgentID, 2, "<--Select-->", "slAgentsForBLDocuments", pAgents, null);
            FillListFromObject(null, 2, "<--Select-->", "slPackageTypes", pPackageTypes, null); //to be used when open PackagesModal
            FillListFromObject(pShipmentHeader.DeliveryCityID, 4, "<--Select-->", "slDeliveryCity", pFinalDestination, null);
            FillListFromObject(pShipmentHeader.PickupCityID, 4, "<--Select-->", "slPickupCity", pPickupCityList, null);
            //FillListFromObject(pShipmentHeader.POD, 4, "<--Select-->", "slPODForBLDocuments", pFinalDestination, null);
            //FillListFromObject(pShipmentHeader.POL, 4, "<--Select-->", "slPOLForBLDocuments", pPickupCityList, null);

            FillListFromObject(pShipmentHeader.POLCountryID, 2, "<--Select-->", "slPickupCountry", pCountryList, function () {
                $("#slDeliveryCountry").html($("#slPickupCountry").html());
                $("#slDeliveryCountry").val(pShipmentHeader.PODCountryID);
            });
            FillListFromObject(null, 11, "<--Select-->", "slShipmentContainers", pContainers, null); //to be used when open PackagesModal

            FillListFromObject(null, 2, "Select Incoterm", "slShipmentIncoterm", pIncotermsList, null);
            FillListFromObject(null, 2, "Select Service Scope", "slOperationMoveTypesForBLDocuments", pMoveTypesList, null);
            FillListFromObject(null, 2, "Select Freight Type", "slShipmentPOrC", pNoAccessFreightTypesList, null);
            FillListFromObject(pShipmentHeader.VesselID, 2, "Select Vessel", "slOperationVesselID", pVessels, null);
            FillListFromObject(pShipmentHeader.OperationManID, 2, "<--Select-->", "slOperationOperationManID", pUsers, null);



            //$("#slShipmentPackageTypes").html($("#slPackageTypes").html());
            $("#slOperationBranchForBLDocuments").html($("#hReadySlBranches").html()); $("#slOperationBranchForBLDocuments").val(pShipmentHeader.BranchID);
            $("#slOperationMoveTypesForBLDocuments").val(pShipmentHeader.MoveTypeID == 0 ? "" : pShipmentHeader.MoveTypeID);
            $("#slShipmentIncoterm").val(pShipmentHeader.IncotermID == 0 ? "" : pShipmentHeader.IncotermID);

            $("#slShipmentPOrC").val(pShipmentHeader.POrC == 0 ? "" : pShipmentHeader.POrC);
            $("#txtShipmentDeliveryOrderNumber").val(pShipmentHeader.ID);
            $("#txtShipmentDeliveryDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pMainRoute.DeliveryDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pMainRoute.DeliveryDate)));

            $("#txtShipmentReleaseDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pShipmentHeader.ReleaseDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pShipmentHeader.ReleaseDate)));

            $("#txtShipmentBLDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pShipmentHeader.BLDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pShipmentHeader.BLDate)));
            $("#txtShipmentShippedOnBoardDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pShipmentHeader.ShippedOnBoardDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pShipmentHeader.ShippedOnBoardDate)));
            $("#txtShipmentFreightPayableAt").val(pShipmentHeader.FreightPayableAt == 0 ? "" : pShipmentHeader.FreightPayableAt);
            $("#txtShipmentACIDNumber").val(pShipmentHeader.ACIDNumber == 0 ? "" : pShipmentHeader.ACIDNumber);
            $("#txtShipmentACIDDetails").val(pShipmentHeader.ACIDDetails == 0 ? "" : pShipmentHeader.ACIDDetails);
            $("#txtShipmentBookingNumber").val(pShipmentHeader.BookingNumber == 0 ? "" : pShipmentHeader.BookingNumber);
            $("#txtShipmentNumberOfOriginalBills").val(pShipmentHeader.NumberOfOriginalBills == 0 ? "" : pShipmentHeader.NumberOfOriginalBills);


            ShipmentPackage_BindTableRows(JSON.parse(pShipmentPackages));

            $("#lblShownShipment").html(pShipmentHeader.HouseNumber == 0 ? "" : pShipmentHeader.HouseNumber);
            $("#txtShipmentHouseNumber").val(pShipmentHeader.HouseNumber == 0 ? "" : pShipmentHeader.HouseNumber);
            $("#txtShipmentCustomerReference").val(pShipmentHeader.CustomerReference == 0 ? "" : pShipmentHeader.CustomerReference);
            $("#txtShipmentSupplierReference").val(pShipmentHeader.SupplierReference == 0 ? "" : pShipmentHeader.SupplierReference);
            $("#txtShipmentPONumber").val(pShipmentHeader.PONumber == 0 ? "" : pShipmentHeader.PONumber);
            $("#divNotesForBLDocuments").val(pShipmentHeader.Notes == 0 ? "" : pShipmentHeader.Notes);
            $("#txtOperationOpenDateForBLDocuments").val(ConvertDateFormat(GetDateWithFormatMDY(pShipmentHeader.OpenDate)));
            $("#txtOperationCloseDateForBLDocuments").val(ConvertDateFormat(GetDateWithFormatMDY(pShipmentHeader.CloseDate)));

            $("#cbIsDelivered").prop("checked", pShipmentHeader.IsDelivered);
            $("#cbIsReceivedFromShipper").prop("checked", pShipmentHeader.IsReceivedFromShipper);
            if (pDefaults.UnEditableCompanyName == "ELI") {
                cbIsReceivedFromShipperChanged();
            }

            $("#txtShipmentCertificateNumber").val(pShipmentHeader.CertificateNumber == 0 ? "" : pShipmentHeader.CertificateNumber);
            $("#txtShipmentCountryOfOrigin").val(pShipmentHeader.CountryOfOrigin == 0 ? "" : pShipmentHeader.CountryOfOrigin);
            $("#txtShipmentInvoiceValue").val(pShipmentHeader.InvoiceValue == 0 ? "" : pShipmentHeader.InvoiceValue);
            $("#slClearanceCurrency").val(pShipmentHeader.CurrencyID);

            $("#txtOperationUNNumber").val(pShipmentHeader.UNNumber == 0 ? "" : pShipmentHeader.UNNumber);
            $("#txtOperationIMOClass").val(pShipmentHeader.IMOClass == 0 ? "" : pShipmentHeader.IMOClass);

            FadePageCover(false);
        }
        , null);


    //parameter in the next 3 lines are 1:Quotations call, 2:Operations call
    $("#btn-NewAddShipperForBLDocuments").attr("onclick", "Customers_ClearAllControls(1);");
    $("#btn-NewAddConsigneeForBLDocuments").attr("onclick", "Customers_ClearAllControls(1);");
    $("#btn-NewAddNotifyForBLDocuments").attr("onclick", "Customers_ClearAllControls(1);");
    $("#btn-NewAddAgentForBLDocuments").attr("onclick", "Agents_ClearAllControls(1);");

    $("#btn-EditShipperForBLDocuments").attr("onclick", "Customers_FillControlsFromOperations($('#slShippersForBLDocuments option:selected').val(), null, 1);");
    $("#btn-EditConsigneeForBLDocuments").attr("onclick", "Customers_FillControlsFromOperations($('#slConsigneesForBLDocuments option:selected').val(), null, 1);");
    $("#btn-EditNotifyForBLDocuments").attr("onclick", "Customers_FillControlsFromOperations($('#slNotifyForBLDocuments option:selected').val(), null, 1);");
    $("#btn-EditAgentForBLDocuments").attr("onclick", "Agents_FillControlsFromOperations($('#slAgentsForBLDocuments option:selected').val(), null, 1);");

    $("#btnSaveShipment").attr("onclick", "Shipment_Update();");
    $("#btnSaveClearanceProperties").attr("onclick", "Shipment_Update();");
}
function Shipment_Update() {
    debugger;
    if (ValidateForm("form", "ShipmentModal")) {
        if ((pDefaults.UnEditableCompanyName == "UNF" && $('#txtShipmentACIDNumber').val() != "" && $('#txtShipmentACIDNumber').val() != null && $('#txtShipmentACIDNumber').val() != undefined && $('#txtShipmentACIDNumber').val().length != 19) || isNaN($('#txtShipmentACIDNumber').val())) {
            swal("Sorry", "Acid must be 19 Numbers Excatly.");
            return;
        }
        if (pDefaults.UnEditableCompanyName == "UNF" && $("#slTransportType").val() == 2 && $("#slShipmentType").val() != 100){
            swal("Sorry", "When you change Transport Type To Air Must Shipment Type Is Air Also .");
            return;
        }
        if (pDefaults.UnEditableCompanyName == "UNF" && $("#slTransportType").val() == 1 && $("#slShipmentType").val() == 100){
            swal("Sorry", "When you change Transport Type To Ocean Must Shipment Type Is not Air.");
            return;
        }
        FadePageCover(true);
        var pParametersWithValues = {
            pShipmentID: $("#hShipmentID").val()
            , pBranchID: $('#slOperationBranchForBLDocuments option:selected').val()
            , pSalesmanID: ($('#slOperationSalesmanForBLDocuments option:selected').val() == "" ? 0 : $('#slOperationSalesmanForBLDocuments option:selected').val())
            , pOpenDate: ConvertDateFormat($("#txtOperationOpenDateForBLDocuments").val().trim())
            , pHouseNumber: $("#txtShipmentHouseNumber").val().trim() == "" ? "0" : $("#txtShipmentHouseNumber").val().trim().toUpperCase()
            , pPOLCountryID: ($("#slPickupCountry").val() == "" || $("#slPickupCountry").val() == undefined || $("#slPickupCountry").val() == null ? 0 : $("#slPickupCountry").val())
            , pPickupCityID: ($("#slPickupCity").val() == "" || $("#slPickupCity").val() == undefined || $("#slPickupCity").val() == null ? 0 : $("#slPickupCity").val())
            , pPODCountryID: ($("#slDeliveryCountry").val() == "" || $("#slDeliveryCountry").val() == undefined || $("#slDeliveryCountry").val() == null ? 0 : $("#slDeliveryCountry").val())
            , pDeliveryCityID: ($("#slDeliveryCity").val() == "" || $("#slDeliveryCity").val() == undefined || $("#slDeliveryCity").val() == null ? 0 : $("#slDeliveryCity").val())
            , pForwarder: $("#slForwarderBLDocuments").val() == "" ? 0 : $("#slForwarderBLDocuments").val()
            , pShipperID: $("#slShippersForBLDocuments").val() == "" ? 0 : $("#slShippersForBLDocuments").val()
            , pConsigneeID: $("#slConsigneesForBLDocuments").val() == "" ? 0 : $("#slConsigneesForBLDocuments").val()
            , pAgentID: $("#slAgentsForBLDocuments").val() == "" ? 0 : $("#slAgentsForBLDocuments").val()
            , pNotifyID: $("#slNotifyForBLDocuments").val() == "" || $("#slNotifyForBLDocuments").val() == null ? 0 : $("#slNotifyForBLDocuments").val()
            , pIncotermID: $("#slShipmentIncoterm").val() == "" ? 0 : $("#slShipmentIncoterm").val()
            , pMoveTypeID: ($('#slOperationMoveTypesForBLDocuments option:selected').val() == "" ? 0 : $('#slOperationMoveTypesForBLDocuments option:selected').val())
            , pNotes: $("#divNotesForBLDocuments").val().trim() == "" ? "0" : $("#divNotesForBLDocuments").val().trim().toUpperCase()

            , pCommodityID: 0
            , pCustomerReference: $("#txtShipmentCustomerReference").val().trim() == "" ? "0" : $("#txtShipmentCustomerReference").val().trim().toUpperCase()
            , pSupplierReference: $("#txtShipmentSupplierReference").val().trim() == "" ? "0" : $("#txtShipmentSupplierReference").val().trim().toUpperCase()
            , pPONumber: $("#txtShipmentPONumber").val().trim() == "" ? "0" : $("#txtShipmentPONumber").val().trim().toUpperCase()
            , pPOrC: ($("#slShipmentPOrC").val() == "" ? 0 : $("#slShipmentPOrC").val())
            , pDeliveryOrderNumber: ($("#txtShipmentDeliveryOrderNumber").val().trim() == "" ? 0 : $("#txtShipmentDeliveryOrderNumber").val().trim().toUpperCase())
            , pDeliveryDate: ($("#txtShipmentDeliveryDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtShipmentDeliveryDate").val()))

            , pIsDelivered: $("#cbIsDelivered").prop("checked")
            , pIsReceivedFromShipper: $("#cbIsReceivedFromShipper").prop("checked")
            , pConsigneeID2: $("#slConsignees2").val() == "" ? 0 : $("#slConsignees2").val()
            , pReleaseDate: ($("#txtShipmentReleaseDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtShipmentReleaseDate").val()))
            , pExpectedDeparture: ($("#txtOperationExpectedDepartureForBLDocuments").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtOperationExpectedDepartureForBLDocuments").val()))
            , pExpectedArrival: ($("#txtOperationExpectedArrivalForBLDocuments").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtOperationExpectedArrivalForBLDocuments").val()))

            , pBLDate: ($("#txtShipmentBLDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtShipmentBLDate").val()))
            , pShippedOnBoardDate: ($("#txtShipmentShippedOnBoardDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtShipmentShippedOnBoardDate").val()))
            , pFreightPayableAt: $("#txtShipmentFreightPayableAt").val().trim() == "" ? "0" : $("#txtShipmentFreightPayableAt").val().trim().toUpperCase()
            , pACIDNumber: $("#txtShipmentACIDNumber").val().trim() == "" ? "0" : $("#txtShipmentACIDNumber").val().trim().toUpperCase()
            , pACIDNumberDetails: $("#txtShipmentACIDDetails").val() == "" ? "0" : $("#txtShipmentACIDDetails").val()
            , pBookingNumber: $("#txtShipmentBookingNumber").val() == "" ? "0" : $("#txtShipmentBookingNumber").val()
            , pNumberOfOriginalBills: $("#txtShipmentNumberOfOriginalBills").val().trim() == "" ? "0" : $("#txtShipmentNumberOfOriginalBills").val().trim().toUpperCase()

            , pCertificateNumber: 0
            , pCountryOfOrigin: 0
            , pInvoiceValue: 0
            , pCurrencyID: 0

            , pUNNumber: $("#txtOperationUNNumber").val() == "" || $("#txtOperationUNNumber").val() == null ? 0 : $("#txtOperationUNNumber").val()
            , pIMOClass: $("#txtOperationIMOClass").val() == "" || $("#txtOperationIMOClass").val() == null ? 0 : $("#txtOperationIMOClass").val()
            , pVesselID: $("#slOperationVesselID").val() == "" || $("#slOperationVesselID").val() == null ? 0 : $("#slOperationVesselID").val()
            , pOperationManID: $("#slOperationOperationManID").val() == "" || $("#slOperationOperationManID").val() == null ? 0 : $("#slOperationOperationManID").val()

            //, pPOLCountryID: $("#slPickupCountry").val()
            //, pPOL: $("#slPOLForBLDocuments").val()
            //, pPODCountryID: $("#slDeliveryCountry").val()
            //, pPOD: $("#slPODForBLDocuments").val()
            , pHouseContainerNumber: $("#txtHouseContainerNumber").val()
            , pRoutingPickUpCountry: (pDefaults.UnEditableCompanyName == "UNF" && glbCallingControl == 'RoutingOrders') ? ($("#slPickupCountryNEW").val() == "" || $("#slPickupCountryNEW").val() == undefined || $("#slPickupCountryNEW").val() == null ? 0 : $("#slPickupCountryNEW").val()) : 0
            , pRoutingPickUpCity: (pDefaults.UnEditableCompanyName == "UNF" &&   glbCallingControl == 'RoutingOrders') ? ($("#slPickupCityNEW").val() == "" || $("#slPickupCityNEW").val() == undefined || $("#slPickupCityNEW").val() == null ? 0 : $("#slPickupCityNEW").val()) : 0

        };
        if (pDefaults.UnEditableCompanyName == "UNF") {
            pParametersWithValues.pHouseStatus = $("#slHouseStatus").val() == "" || $("#slHouseStatus").val() == null ? 0 : $("#slHouseStatus").val();
            pParametersWithValues.pShipmentType = $("#slShipmentType").val();
            pParametersWithValues.pTransportType = $("#slTransportType").val();
            pParametersWithValues.pACIDNumberDetails = $("#slPOLID_TransportID").val();
        }
        CallPOSTFunctionWithParameters("/api/Operations/Shipment_Update"
            , pParametersWithValues
            , function (pData) {
                var _MessageReturned = pData[1];
                if (_MessageReturned != "")
                    swal("Sorry", _MessageReturned);
                else if (pData[0]) {
                    swal("Success", "Saved successfully.");
                    if (pDefaults.UnEditableCompanyName == "NEW")
                        Certificate_GetCertificateHousesAndGrossWeight(MasterOperationID/*$("#hOperationID").val()*/);
                    jQuery("#ShipmentModal").modal("hide");
                }
                else {
                    swal("Sorry", "Connection failed, please try again.");
                    jQuery("#ShipmentModal").modal("hide");

                }

                Operations_LoadingWithPaging();//Shipments_LoadAvailableShipments();
                FadePageCover(false);
            }
            , null);
    }
}
function ShipmentPackage_BindTableRows(pTableRows) {
    debugger;
    var editControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' title='Edit'> <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $("#tblShipmentPackage tbody").html("");
    var pHTMLHeaderColumns = "";
    var transferControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Transfer" + "</span>";
    //isa i am sure its master coz shipment is opened

    //if ($("#cbIsFCLForBLDocuments").prop("checked") || $("#cbIsFTLForBLDocuments").prop("checked")) {
    if (pIsFCL || pIsFTL) {
        pHTMLHeaderColumns += '     <tr>';
        pHTMLHeaderColumns += '         <th id="HeaderDeleteShipmentPackageID">';
        pHTMLHeaderColumns += '             <input id="cbShipmentPackageDeleteHeader" type="checkbox" />';
        pHTMLHeaderColumns += '         </th>';
        pHTMLHeaderColumns += '         <th>Container Type</th>';
        pHTMLHeaderColumns += '         <th>Container No</th>';
        pHTMLHeaderColumns += '         <th>Carrier Seal</th>';
        pHTMLHeaderColumns += '         <th>TareWt(KG)</th>';
        pHTMLHeaderColumns += '         <th>Vol.(CBM)';
        pHTMLHeaderColumns += '         <th>Net Wt(KG)</th>';
        pHTMLHeaderColumns += '         <th>GrossWt(KG)</th>';
        pHTMLHeaderColumns += '         <th>VGM(KG)</th>';
        pHTMLHeaderColumns += '         <th class="rounded-right hide"></th>';
        pHTMLHeaderColumns += '     </tr>';
    }
    else {
        pHTMLHeaderColumns += '     <tr>';
        pHTMLHeaderColumns += '         <th id="HeaderDeleteShipmentPackageID">';
        pHTMLHeaderColumns += '             <input id="cbShipmentPackageDeleteHeader" type="checkbox" />';
        pHTMLHeaderColumns += '         </th>';
        pHTMLHeaderColumns += '         <th>Package Type</th>';
        pHTMLHeaderColumns += '         <th>Container</th>';
        pHTMLHeaderColumns += '         <th>Quantity</th>';
        pHTMLHeaderColumns += '         <th>Net Wt(KG)</th>';
        pHTMLHeaderColumns += '         <th>Vol.(CBM)';
        pHTMLHeaderColumns += '         <th>GrossWt(KG)</th>';
        pHTMLHeaderColumns += '         <th class="rounded-right hide"></th>';
        pHTMLHeaderColumns += '     </tr>';
    }
    $("#tblShipmentPackage thead").html(pHTMLHeaderColumns);
    if ($("#cbIsFCLForBLDocuments").prop("checked") || $("#cbIsFTLForBLDocuments").prop("checked")) {
        $.each(pTableRows, function (i, item) {
            AppendRowtoTable("tblShipmentPackage",
                ("<tr ID='" + item.ID + "' " + (/*OEPac && $("#hIsOperationDisabled").val()*/pIsOperationDisabled == false ? ("ondblclick='ShipmentPackage_FillControls(" + item.ID + ");'") : "") + ">"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Container' val='" + item.ContainerTypeID + "'>" + item.ContainerTypeCode + "</td>"
                    + "<td class='ContainerNumber'>" + (item.ContainerNumber == 0 ? "" : item.ContainerNumber) + "</td>"
                    + "<td class='CarrierSeal'>" + (item.CarrierSeal == 0 ? "" : item.CarrierSeal) + "</td>"
                    + "<td class='ShipperSeal hide'>" + (item.ShipperSeal == 0 ? "" : item.ShipperSeal) + "</td>"
                    + "<td class='TareWeight'>" + (item.TareWeight == 0 ? "" : item.TareWeight) + "</td>"
                    + "<td class='ContainerVolume'>" + (item.Volume == 0 ? "" : item.Volume) + "</td>"
                    + "<td class='ContainerNetWeight'>" + (item.NetWeight == 0 ? "" : item.NetWeight) + "</td>"
                    + "<td class='ContainerGrossWeight'>" + (item.GrossWeight == 0 ? "" : item.GrossWeight) + "</td>"
                    + "<td class='VGM'>" + (item.VGM == 0 ? "" : item.VGM) + "</td>"
                    + "<td class='IsReefer hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsReefer == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsNOR hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsNOR == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsSentToWarehouse hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsSentToWarehouse == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsLoaded hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsLoaded == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='MinTemp hide'>" + item.MinTemp + "</td>"
                    + "<td class='Humidity hide'>" + item.Humidity + "</td>"
                    + "<td class='Ventilation hide'>" + item.Ventilation + "</td>"
                    + "<td class='PackageTypeOnContainer hide' val='" + item.PackageTypeIDOnContainer + "'>" + (item.PackageTypeNameOnContainer == 0 ? "" : item.PackageTypeNameOnContainer) + "</td>"
                    + "<td class='LotNumber hide'>" + (item.LotNumber == 0 ? "" : item.LotNumber) + "</td>"
                    + "<td class='MaxTemp hide'>" + item.MaxTemp + "</td>"
                    + "<td class='IsIMO hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsIMO == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IMOClass hide'>" + item.IMOClass + "</td>"
                    + "<td class='UNNumber hide'>" + item.UNNumber + "</td>"
                    + "<td class='FlashPoint hide'>" + item.FlashPoint + "</td>"

                    + "<td class='DescriptionOfGoods hide'>" + (item.DescriptionOfGoods == 0 ? "" : item.DescriptionOfGoods) + "</td>"
                    //+ "<td class='hide'><a href='#EditContainerModal' data-toggle='modal' onclick='ShipmentPackage_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
                    + "<td class='" + (/*OAPac && ODPac && $("#hIsOperationDisabled").val()*/ pIsOperationDisabled == false ? "hide" : "hide") + "'><a href='#' data-toggle='modal' onclick='ShipmentPackage_TransferContainerModal(" + item.ID + "," + item.OperationID + ");' " + transferControlsText + "</a></td>"
                    + "</tr>"));

            //+ ($("#cbIsFCLForBLDocuments").prop('checked') || $("#cbIsFTLForBLDocuments").prop('checked') || $("#cbIsConsolidation").prop('checked')
            //    ? ("<td class='hide'><a href='#EditContainerModal' data-toggle='modal' onclick='OperationContainersAndPackages_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>")
            //    : ("<td class='hide'><a href='#EditPackageModal' data-toggle='modal' onclick='OperationContainersAndPackages_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>")
            //    )));
        });
    }
    else {
        $.each(pTableRows, function (i, item) {
            AppendRowtoTable("tblShipmentPackage",
                ("<tr ID='" + item.ID + "' " + (/*OEPac && $("#hIsOperationDisabled").val()*/pIsOperationDisabled == false ? ("ondblclick='ShipmentPackage_FillControls(" + item.ID + ");'") : "") + ">"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Package' val='" + item.PackageTypeID + "'>" + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + "</td>"
                    //+ "<td class='Container' val='" + item.ContainerTypeID + "'>" + (item.ContainerTypeName == 0 ? "" : item.ContainerTypeName) + "</td>"
                    + "<td class='PlacedOnOCPID' val='" + item.PlacedOnOCPID + "'>" + (item.PlacedOnOCPID == 0 ? "" : item.ConsolContainerNumber) + "</td>"
                    + "<td class='Quantity'>" + item.Quantity + "</td>"
                    + "<td class='Length hide'>" + item.Length + "</td>"
                    + "<td class='Width hide'>" + item.Width + "</td>"
                    + "<td class='Height hide'>" + item.Height + "</td>"
                    + "<td class='NetWeight'>" + item.NetWeight + "</td>"
                    + "<td class='Volume'>" + item.Volume + "</td>"
                    + "<td class='GrossWeight'>" + item.GrossWeight + "</td>"
                    + "<td class='VolumetricWeight hide'>" + item.VolumetricWeight + "</td>"
                    + "<td class='ChargeableWeight hide'>" + item.ChargeableWeight + "</td>"
                    + "<td class='DescriptionOfGoods hide'>" + (item.DescriptionOfGoods == 0 ? "" : item.DescriptionOfGoods) + "</td>"
                    + "<td class='hide'><a href='#EditPackageModal' data-toggle='modal' onclick='ShipmentPackage_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
                    + "</tr>"));

        });
    }
    BindAllCheckboxonTable("tblShipmentPackage", "ID", "cbShipmentPackageDeleteHeader");
    CheckAllCheckbox("HeaderDeleteShipmentPackageID");
}

function Operations_InsertFromBLDocuments(pSaveandAddNew, pIsShipment, callback, pIsAWB) { //pIsShipment: is true if this fn is called from adding new house op from consolidation
    debugger;
    if (pIsShipment && $("#btnSaveShipment").prop("disabled") == true)
        return;
    //var varExpirationDate = ($("#txtOperationCutOffDate").val().trim() == "" ? "" : $("#txtOperationCutOffDate").val().trim());
    //if (!isValidDate($("#txtOperationOpenDateForBLDocuments").val().trim(), 1) || !isValidDate(varExpirationDate, 1))
    $(".validation-error").removeClass("validation-error");
    if ((pDefaults.UnEditableCompanyName == "UNF" && $('#txtShipmentACIDNumber').val() != "" && $('#txtShipmentACIDNumber').val() != null && $('#txtShipmentACIDNumber').val() != undefined && $('#txtShipmentACIDNumber').val().length != 19) || isNaN($('#txtShipmentACIDNumber').val())) {
            swal("Sorry", "Acid must be 19 Numbers Excatly.");
            return;
        }
    FadePageCover(true);
    if (pDefaults.UnEditableCompanyName == "FEL" && $("#slAgentsForBLDocuments").val() == "")
        swal("Sorry", "Please, select agent.");


    if (pDefaults.UnEditableCompanyName == "UNF" && $('#slTransportType').val() == 1 && $('#slShipmentType').val() == 100) { 
        swal("Sorry", "cant insert TransportType Ocean And ShipmentType Air .");
        FadePageCover(false);
        return;
    }

    if (!isValidDate($("#txtOperationOpenDateForBLDocuments").val().trim(), 1)) {
        swal(strSorry, strCheckDates);
        FadePageCover(false);
    }
    //else
    //    if (Date.prototype.compareDates(FormattedTodaysDate, ConvertDateFormat($("#txtOperationOpenDateForBLDocuments").val().trim())) < 0)
    //        swal(strSorry, "Check the open date.");
    else if (Date.prototype.compareDates(ConvertDateFormat($("#txtOperationOpenDateForBLDocuments").val().trim()), ConvertDateFormat($("#txtOperationCloseDateForBLDocuments").val().trim())) <= 0) {
        swal(strSorry, "Close date must be after open date.");
        FadePageCover(false);
    }
    //else if (!isValidDate($("#txtOperationCutOffDate").val().trim(), 1) && $("#txtOperationCutOffDate").val().trim() != "")
    //    swal("Sorry", "Please, Check Cut Off Date.");
    else if (isValidDate($("#txtOperationExpectedDepartureForBLDocuments").val().trim(), 1) && isValidDate($("#txtOperationExpectedArrivalForBLDocuments").val().trim(), 1)
        && Date.prototype.compareDates(ConvertDateFormat($("#txtOperationExpectedDepartureForBLDocuments").val().trim()), ConvertDateFormat($("#txtOperationExpectedArrivalForBLDocuments").val().trim())) < 0) {
        swal(strSorry, "ETA must be after ETD date.");
        FadePageCover(false);
    }
    else if ($('#slPickupCity option:selected').val() == $('#slDeliveryCity option:selected').val() && $('#slPickupCity option:selected').val() != "" && $('#slPickupCity option:selected').val() != undefined && !$("#cbIsDomestic").prop("checked")) {//check different ports
        swal(strSorry, strPOLEqualPODWarning);
        FadePageCover(false);
    }
    //    //check Domestic with POLCountry = PODCountry
    //else if ($('input[name=cbDirectionType]:checked').val() == 3 && $('#slPOLCountriesForBLDocuments option:selected').val() != $('#slPODCountriesForBLDocuments option:selected').val() && $('#slPOLCountriesForBLDocuments option:selected').val() != undefined) {
    //    swal(strSorry, strDomesticWithDifferentCountriesWarning);
    //    FadePageCover(false);
    //}

    else if ($("#txtOperationNumberOfContainers").val() > 50 && $("#txtOperationNumberOfContainers").val() != "") {
        swal("Sorry", "You can not enter more than 50 containers at the first time.");
        FadePageCover(false);
    }
    else { //Ports are OK

        var DirectionTypeID = 0;
        var DirectionIconName = 0;
        var DirectionIconStyle = 0;

        if (glbCallingControl == "ShippingOrders") {
            DirectionTypeID = constExportDirectionType; DirectionIconName = ExportIconName; DirectionIconStyle = strExportIconStyleClassName;    // Export
        } else if (glbCallingControl == "RoutingOrders") {
            DirectionTypeID = constImportDirectionType; DirectionIconName = ImportIconName; DirectionIconStyle = strImportIconStyleClassName;    // Import
        }


        var TransportIconName = 0;
        var TransportIconStyle = 0;

        if ($("#slTransportType").val() == OceanTransportType) {
            TransportIconName = OceanIconName; TransportIconStyle = strOceanIconStyleClassName;
        }
        else if ($("#slTransportType").val() == AirTransportType) {
            TransportIconName = AirIconName; TransportIconStyle = strAirIconStyleClassName;
        }
        else if ($("#slTransportType").val() == InlandTransportType) {
            TransportIconName = InlandIconName; TransportIconStyle = strInlandIconStyleClassName;
        }


        var parameters = {
            //if HouseNumber is not null then its entered manually
            "pIsShipment": pIsShipment,
            "pCodeSerial": 0 /*generated automatically*/,
            //"pCode": "O" + $("#txtOperationOpenDateForBLDocuments").val().substring(10, 8) + "-" + GetDirectionType($('input[name=cbDirectionType]:checked').val()).substring(0, 3) + "-"
            //             + GetTransportType($('input[name=cbTransportType]:checked').val()).substring(0, 2) + "-",
            "pCode": (pIsShipment || $('input[name=cbBLType]:checked').val() == constHouseBLType)
                ? "0"
                : ("O" + $("#txtOperationOpenDateForBLDocuments").val().substring(10, 8) + "-" + GetDirectionType($('input[name=cbDirectionType]:checked').val()).substring(0, 3) + "-"
                    + GetTransportType($('input[name=cbTransportType]:checked').val()).substring(0, 2) + "-"),
            "pHouseNumber": pIsShipment
                ? ($("#txtShipmentHouseNumber").val().trim().toUpperCase() == "" ? 0 : $("#txtShipmentHouseNumber").val().trim().toUpperCase())
                : "0",//if "0" then auto generated
            "pBranchID": $('#slOperationBranchForBLDocuments option:selected').val(),
            "pSalesmanID": $('#slOperationSalesmanForBLDocuments option:selected').val(),
            //"pOperationManID": $('#slOperationOperationMan option:selected').val(),

            "pBLType": pIsShipment ? constHouseBLType : $('input[name=cbBLType]:checked').val(),
            "pBLTypeIconName": HouseIconName,
            "pBLTypeIconStyle": strHouseIconStyleClassName,

            "pDirectionType": DirectionTypeID,//$('input[name=cbDirectionType]:checked').val(),
            "pDirectionIconName": DirectionIconName,
            "pDirectionIconStyle": DirectionIconStyle,

            "pTransportType": $("#slTransportType").val(),//$('input[name=cbTransportType]:checked').val(),
            "pTransportIconName": TransportIconName,
            "pTransportIconStyle": TransportIconStyle,

            //"pShipmentType": pIsShipment
            //    ? ($("#cbIsOcean").prop("checked") || $("#cbIsInland").prop("checked")
            //            ? ($('input[name=cbShipmentType]:checked').val() == constConsolidationShipmentType ? ($("#cbIsOcean").prop("checked") ? constLCLShipmentType : constLTLShipmentType) : $('input[name=cbShipmentType]:checked').val())
            //            : 0 //air and house
            //    )/*No air in this case coz air has no consolidation*/
            //    : ($('input[name=cbTransportType]:checked').val() == AirTransportType ? 0 : $('input[name=cbShipmentType]:checked').val()),
            "pShipmentType": $("#slShipmentType").val(),
            "pMasterBL": pIsShipment
                ? "0"
                : ($("#txtOperationMasterBL").val().trim() == "" ? "0" : $("#txtOperationMasterBL").val().trim().toUpperCase()),
            "pShipperID": $('#slShippersForBLDocuments option:selected').val() == "" || $('#slShippersForBLDocuments option:selected').val() == null || $('#slShippersForBLDocuments option:selected').val() == undefined
                ? 0 : $('#slShippersForBLDocuments option:selected').val(),
            "pShipperAddressID": 0,
            "pShipperContactID": 0,
            //"pConsigneeID": (($('#slConsigneesForBLDocuments option:selected').val() == "" || $('input[name=cbDirectionType]:checked').val() == 2 || $('input[name=cbDirectionType]:checked').val() == 3)
            "pConsigneeID": $('#slConsigneesForBLDocuments option:selected').val() == "" || $('#slConsigneesForBLDocuments option:selected').val() == null || $('#slConsigneesForBLDocuments option:selected').val() == undefined
                ? 0 : $('#slConsigneesForBLDocuments option:selected').val(),
            "pConsigneeAddressID": 0,
            "pConsigneeContactID": 0,
            "pNotifyID": $('#slNotifyForBLDocuments option:selected').val() == "" || $('#slNotifyForBLDocuments option:selected').val() == null || $('#slNotifyForBLDocuments option:selected').val() == undefined
                ? 0 : $('#slNotifyForBLDocuments option:selected').val(),
            "pAgentID": $('#slAgentsForBLDocuments').val() == "" || $('#slAgentsForBLDocuments').val() == null
                ? 0 : $('#slAgentsForBLDocuments option:selected').val(),
            "pAgentAddressID": 0,
            "pAgentContactID": 0,
            "pIncotermID": pIsShipment ? ($("#slShipmentIncoterm").val() == "" ? 0 : $("#slShipmentIncoterm").val()) : 0,
            //"pPOrC": pDefaults.UnEditableCompanyName == "CQL" ? 3 : ($("#radIsConfirm1").prop('checked') ? 1 : 3),
            "pPOrC": pIsShipment
                ? ($("#slShipmentPOrC").val() == "" ? 0 : $("#slShipmentPOrC").val())
                : ($("#radIsConfirm1").prop('checked') ? 1 : 3),
            "pMoveTypeID": $("#slOperationMoveTypesForBLDocuments").val() == "" ? 0 : $("#slOperationMoveTypesForBLDocuments").val(),
            "pCommodityID": pIsShipment ? 0 : ($('#slCommodity').val() == "" ? 0 : $('#slCommodity').val()),
            "pTransientTime": 0,
            "pOpenDate": ConvertDateFormat($("#txtOperationOpenDateForBLDocuments").val().trim()),
            //"pCloseDate": null,
            "pCloseDate": ConvertDateFormat($("#txtOperationCloseDateForBLDocuments").val().trim()),
            "pCutOffDate": "01/01/1900",
            "pIncludePickup": false,
            "pPickupCityID": pIsShipment ? ($("#slPickupCity").val() == "" || $("#slPickupCity").val() == undefined || $("#slPickupCity").val() == null ? 0 : $("#slPickupCity").val()) : 0,
            "pPickupAddressID": 0,
            "pPOLCountryID": $('#slPickupCountry option:selected').val(),
            "pPOL": $('#slPickupCity option:selected').val(),
            "pPODCountryID": $('#slDeliveryCountry option:selected').val(),
            "pPOD": $('#slDeliveryCity option:selected').val(),
            "pShippingLineID": (pIsShipment/*means its house*/ || $('input[name=cbBLType]:checked').val() == constHouseBLType || $('#slLines option:selected').val() == "")
                ? 0
                : ($('input[name=cbTransportType]:checked').val() == OceanTransportType ? $('#slLines option:selected').val() : 0),
            "pAirlineID": (pIsShipment/*means its house*/ || $('input[name=cbBLType]:checked').val() == constHouseBLType || $('#slLines option:selected').val() == "")
                ? 0
                : ($('input[name=cbTransportType]:checked').val() == AirTransportType ? $('#slLines option:selected').val() : 0),
            "pTruckerID": (pIsShipment/*means its house*/ || $('input[name=cbBLType]:checked').val() == constHouseBLType || $('#slLines option:selected').val() == "")
                ? 0
                : ($('input[name=cbTransportType]:checked').val() == InlandTransportType ? $('#slLines option:selected').val() : 0),
            "pIncludeDelivery": false,
            "pDeliveryZipCode": 0,
            "pDeliveryCityID": (pIsShipment
                ? ($("#slDeliveryCity").val() == "" || $("#slDeliveryCity").val() == undefined || $("#slDeliveryCity").val() == null ? 0 : $("#slDeliveryCity").val())
                : 0),
            "pDeliveryCountryID": 0,//i am leaving it the same as PODCountryID
            "pNetWeight": pIsShipment ?
                ($("#txtShipmentNetWeight").val() == "" ? 0 : $("#txtShipmentNetWeight").val())
                : 0,
            "pGrossWeight": pIsShipment ?
                ($("#txtShipmentGrossWeight").val() == "" ? 0 : $("#txtShipmentGrossWeight").val())
                : ($("#txtGrossWeight").val() == "" ? 0 : $("#txtGrossWeight").val()),
            "pVolume": pIsShipment ?
                ($("#txtShipmentVolume").val() == "" ? 0 : $("#txtShipmentVolume").val())
                : 0,
            "pChargeableWeight": pIsShipment ?
                0
                : ($("#txtChargeableWeight").val() == "" ? 0 : $("#txtChargeableWeight").val()),
            "pPackageTypeID": pIsShipment ?
                $("#slShipmentPackageTypes").val() == "" || $("#slShipmentPackageTypes").val() == null || $("#slShipmentPackageTypes").val() == undefined ? 0 : $("#slShipmentPackageTypes").val()
                : 0,
            "pNumberOfPackages": pIsShipment ?
                ($("#txtShipmentNumberOfPackages").val() == "" || $("#txtShipmentNumberOfPackages").val() == 0 ? 1 : $("#txtShipmentNumberOfPackages").val())
                : 1,
            "pIsDangerousGoods": $("#cbDangerousGoods").prop("checked"),
            "pNotes": $("#divNotesForBLDocuments").val().trim().toUpperCase(),
            "pIsDelivered": pIsShipment ? $("#cbIsDelivered").prop("checked") : false,
            "pIsTrucking": false, //$("#cbIsTrucking").prop("checked"),
            "pIsInsurance": false, //$("#cbIsInsurance").prop("checked"),
            "pIsClearance": false, //$("#cbIsClearance").prop("checked"),
            "pIsGenset": false, //$("#cbIsGenset").prop("checked"),
            "pIsCourrier": false, //$("#cbIsCourrier").prop("checked"),
            "pIsTelexRelease": false, //$("#cbIsTelexRelease").prop("checked"),
            "pCustomerReference": pIsShipment ?
                ($("#txtShipmentCustomerReference").val() == "" ? 0 : $("#txtShipmentCustomerReference").val())
                : "0",
            "pSupplierReference": pIsShipment ?
                ($("#txtShipmentSupplierReference").val() == "" ? 0 : $("#txtShipmentSupplierReference").val())
                : "0",
            "pPONumber": pIsShipment ?
                ($("#txtShipmentPONumber").val() == "" ? 0 : $("#txtShipmentPONumber").val())
                : "0",
            "pAgreedRate": "0",
            "pOperationStageID": $('#slHouseStatus option:selected').val() == "" ? "0" : $('#slHouseStatus option:selected').val(), //this means Order
            "pNumberOfHousesConnected": 0,
            "pExpectedDeparture": pIsShipment
                ? ($("#txtOperationExpectedDepartureForBLDocuments").val().trim() == "" ? "01/01/1900" : $("#txtOperationExpectedDepartureForBLDocuments").val().trim())
                : "01/01/1900",
            "pExpectedArrival": pIsShipment
                ? ($("#txtOperationExpectedArrivalForBLDocuments").val().trim() == "" ? "01/01/1900" : $("#txtOperationExpectedArrivalForBLDocuments").val().trim())
                : "01/01/1900",
            "pVoyageOrTruckNumber": pIsShipment
                ? "0"
                : ($("#txtOperationVoyageOrTruckNumber").val().trim() == "" ? "0" : $("#txtOperationVoyageOrTruckNumber").val().trim().toUpperCase()),
            "pVesselID": pIsShipment
                ? "0" 
                : ($("#slOperationVessels").val() == "" ? "0" : $("#slOperationVessels").val()),
            "pContainerTypeID": pIsShipment
                ? "0"
                : ($("#slOperationContainerType").val() == "" ? "0" : $("#slOperationContainerType").val()),
            "pNumberOfContainers": pIsShipment
                ? "0"
                : ($("#txtOperationNumberOfContainers").val() == "" ? "0" : $("#txtOperationNumberOfContainers").val()),

            "pContainerTypeID2": pIsShipment
                ? "0"
                : ($("#slOperationContainerType2").val() == "" ? "0" : $("#slOperationContainerType2").val()),
            "pNumberOfContainers2": pIsShipment
                ? "0"
                : ($("#txtOperationNumberOfContainers2").val() == "" ? "0" : $("#txtOperationNumberOfContainers2").val()),

            "pContainerTypeID3": pIsShipment
                ? "0"
                : ($("#slOperationContainerType3").val() == "" ? "0" : $("#slOperationContainerType3").val()),
            "pNumberOfContainers3": pIsShipment
                ? "0"
                : ($("#txtOperationNumberOfContainers3").val() == "" ? "0" : $("#txtOperationNumberOfContainers3").val()),
            //"pIsInactive": $("#cbIsInactive").prop('checked'),
            /***************************Venus Fields: A.Medra****************************/
            "pBLDate":
                pIsShipment
                    ? "01/01/1900"
                    :
                    ($("#txtOperationBLDate").val().trim() == "" ? "01/01/1900" : $("#txtOperationBLDate").val().trim()),
            "pMAWBStockID": $("#slMAWBStock").val() == "" ? 0 : $("#slMAWBStock").val(),
            "pTypeOfStockID": $('#slTypeOfStock  option:selected').val() == "" ? 0 : $('#slTypeOfStock option:selected').val(),
            "pMAWBSuffix": pIsShipment ? "0" : ($("#slMAWBStock").val() == "" ? "0" : $("#slMAWBStock option:selected").text()),
            "pFlightNo": pIsShipment ? "0" : ($("#txtFlightNo").val().trim() == "" ? 0 : $("#txtFlightNo").val().toUpperCase()),
            "pIsAWB": pIsShipment ? false : $("#cbIsAWB").prop("checked"),
            "pConsigneeID2": $('#slConsignees2 option:selected').val() == "" || $('#slConsignees2 option:selected').val() == null || $('#slConsignees2 option:selected').val() == undefined
                ? 0 : $('#slConsignees2 option:selected').val(),
            "pReleaseDate": pIsShipment
                ? ($("#txtShipmentReleaseDate").val().trim() == "" ? "01/01/1900" : $("#txtShipmentReleaseDate").val().trim())
                : "01/01/1900",
            "pCertificateNumber": 0,
            "pManifestPreConsignee": "",
            "pCountryOfOrigin": 0,
            "pInvoiceValue": 0,
            "pCurrencyID": 83,//pIsShipment ? ($("#slClearanceCurrency").val() == "" ? 0 : $("#slClearanceCurrency").val()) : "0",
            "pACIDNumber": $("#txtShipmentACIDNumber").val().trim() == "" ? "0" : $("#txtShipmentACIDNumber").val().trim().toUpperCase(),
            "pACIDNumberDetails": $("#txtShipmentACIDDetails").val() == "" ? "0" : $("#txtShipmentACIDDetails").val(),
            "pBookingNumber": $("#txtShipmentBookingNumber").val() == "" ? "0" : $("#txtShipmentBookingNumber").val(),
            "pUNNumber": pIsShipment ? ($("#txtShipmentUNNumber").val() == "" || $("#txtShipmentUNNumber").val() == null ? 0 : $("#txtShipmentUNNumber").val())
                : ($("#txtOperationUNNumber").val() == "" || $("#txtOperationUNNumber").val() == null ? 0 : $("#txtOperationUNNumber").val()),
            "pIMOClass": pIsShipment ? ($("#txtShipmentIMOClass").val() == "" || $("#txtShipmentIMOClass").val() == null ? 0 : $("#txtShipmentIMOClass").val())
                : ($("#txtOperationIMOClass").val() == "" || $("#txtOperationIMOClass").val() == null ? 0 : $("#txtOperationIMOClass").val()),
            "pVesselID": pIsShipment ? (CheckValueIsValidInput("#slOperationVesselID") ? $("#slOperationVesselID").val() : "0")
                : ($("#txtOperationVesselID").val() == "" || $("#txtOperationVesselID").val() == null ? 0 : $("#txtOperationVesselID").val()),
            "pHouseContainerNumber": $('#txtHouseContainerNumber').val(), 
            "pOperationManID": pIsShipment ?
                ($("#slOperationOperationManID").val() == "" || $("#slOperationOperationManID").val() == null ? 0 : $("#slOperationOperationManID").val())
                : 0 ,
            "pATAPODAlarmStatus": (pIsShipment && pDefaults.UnEditableCompanyName == 'UNF') ? 1 : 0 //to seperate houses from routing orders to UNF ,
            , "pETAPOlAlarmStatus": (pIsShipment && pDefaults.UnEditableCompanyName == 'UNF' && glbCallingControl == 'RoutingOrders') ? ($("#slPickupCountryNEW").val() == "" || $("#slPickupCountryNEW").val() == undefined || $("#slPickupCountryNEW").val() == null ? 0 : $("#slPickupCountryNEW").val()) : 0 
            , "pATAPOLAlarmStatus": (pIsShipment && pDefaults.UnEditableCompanyName == 'UNF' && glbCallingControl == 'RoutingOrders') ? ($("#slPickupCityNEW").val() == "" || $("#slPickupCityNEW").val() == undefined || $("#slPickupCityNEW").val() == null ? 0 : $("#slPickupCityNEW").val()) : 0
        };
        if (pDefaults.UnEditableCompanyName == 'UNF')
        {

            parameters.pACIDNumberDetails = ($("#slPOLID_TransportID").val() == null ? '0' : $("#slPOLID_TransportID").val());
            
        }
        if (pIsShipment) {
            $("#btnSaveShipment").attr("disabled", true);
            var pCallerCallbackBL = callback;
            callback = function (pData) {
                $("#btnSaveShipment").attr("disabled", false);
                if (pCallerCallbackBL != null && pCallerCallbackBL != undefined)
                    pCallerCallbackBL(pData);
            };
        }
        PostInsertUpdateFunction("form", "/api/Operations/Insert", parameters, pSaveandAddNew, pIsShipment ? "ShipmentModal" : "OperationModal", callback);
    }
}

function Operations_TransferHousesFromBLDocuments() {
    debugger;
    let SelectedRows = GetAllSelectedIDsAsString('tblOperations');
    let MasterOperationID = $("#hslMasterOperations").val();
    if ($("#hslMasterOperations").val() == "")
        swal("Sorry", "Please, select The Master operation.");
    else if (GetAllSelectedIDsAsString('tblOperations') == "") {
        swal(strSorry, "Please Select at least one House");
    } else {
        // loop through Houses and make sure they all have the same POL and POD of the selected master operation
        let FirstSelectedRow = GetAllSelectedIDsAsString('tblOperations').split(",")[0];
        let POD = $("#hslMasterOperations option:selected").attr("pod");
        let POL = $("#hslMasterOperations option:selected").attr("pol");
        let ContainerNumber = $("#tblOperations tbody #" + FirstSelectedRow + " .HouseContainerNumber").text().trim();
        let IsContainerOK = true;
        
        let IsPortsOK = true;

        let TransportType = $("#hslMasterOperations option:selected").attr("transporttype");
        let IsTransportTypeOK = true;

        let ShipmentType = $("#hslMasterOperations option:selected").attr("shipmenttype");
        let IsShipmentTypeOK = true;
        let hasContainer = true;

        let RowPOD = 0;
        let RowPOL = 0;
        let RowTransportType = 0;
        let RowShipmentType = 0;
        let RowContainerNumber = 0;
        GetAllSelectedIDsAsString('tblOperations').split(",").forEach((SelectedRowID) => {
            RowPOD = $("#tblOperations tbody #" + SelectedRowID + " .POD").attr("val");
            RowPOL = $("#tblOperations tbody #" + SelectedRowID + " .POL").attr("val");
            RowTransportType = $("#tblOperations tbody #" + SelectedRowID + " .TransportType").text().trim();
            RowShipmentType = $("#tblOperations tbody #" + SelectedRowID + " .ShipmentType").attr('val').trim();
            RowContainerNumber = $("#tblOperations tbody #" + SelectedRowID + " .HouseContainerNumber").text().trim();
            if (RowPOD != POD || RowPOL != POL) {
                IsPortsOK = false;
            }
            if (RowTransportType != TransportType) {
                IsTransportTypeOK = false;
            }
            if (RowShipmentType != ShipmentType) {
                IsShipmentTypeOK = false;
            }
            if (RowContainerNumber != ContainerNumber) {
                IsContainerOK = false;
            }
            if (RowContainerNumber == "" || RowContainerNumber == null) {
                hasContainer = false;
            }

        });

        //if (!IsPortsOK) {
        //    swal(strSorry, "POD and POL are not the same")
        //} else if (!IsTransportTypeOK) {
        //    swal(strSorry, "Transport Types must be the same")
        //} else if (!IsShipmentTypeOK) {
        //    swal(strSorry, "Shipment Types must be the same")
        //} else
        //if (pDefaults.UnEditableCompanyName == "UNF" && glbCallingControl == "ShippingOrders") {
        if (pDefaults.UnEditableCompanyName == "UNF" && (glbCallingControl == "ShippingOrders" || (glbCallingControl == "RoutingOrders" && TransportType == 2))) { 
            IsContainerOK = true;
            hasContainer = true;
        }
        if (!IsContainerOK) {
        swal(strSorry, "Container Numbers are not the same")
        } else if (!hasContainer) {
        swal(strSorry, "Please Enter The Container Number");
          } else {
            swal({
                title: "Are you sure?",
                text: "House will be transfered.",
                type: "",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, Apply",
                closeOnConfirm: false
            },
                //callback function in case of confirm delete
                function () {
                    FadePageCover(true);
                    var pParametersWithValues = {
                        pMasterOperationID: $("#hslMasterOperations").val()
                        , pIsHouseConnected: true
                        , pMasterOperationIDFieldInHouse: $("#hslMasterOperations").val()
                        , pHouseOperationsIDs: GetAllSelectedIDsAsString('tblOperations')
                        , pHouseParentID: 0
                    };
                    if (pDefaults.UnEditableCompanyName == "UNF") {
                        pParametersWithValues.pAction = "LCL_Transfer";
                    }
                    CallGETFunctionWithParameters("/api/Operations/ConnectOrDisconnectMultiple", pParametersWithValues
                        , function (DataArray) {
                            var IsError = false;
                            var ErrorMessage = "";
                            DataArray.forEach((pData, index) => {
                                let pReturnedMessage = pData[1];
                                if (pReturnedMessage != "") {
                                    IsError = true;
                                    ErrorMessage = pReturnedMessage;
                                }
                            });
                            if (!IsError) {
                                if (pDefaults.UnEditableCompanyName = "UNF") {
                                    var pParametersWithValues = {
                                        OperationIDs: SelectedRows
                                        , ID: MasterOperationID

                                    };

                                    //CallGETFunctionWithParameters("/api/Operations/PandRInsert", pParametersWithValues, function (pData) {}, null);
                                }
                                swal("Success");
                                //Operations_LoadingWithPaging();
                                // then go to operations edit screen
                                SwitchToOperationsEditView(MasterOperationID);
                            }
                            else {
                                swal("Sorry", ErrorMessage);
                                FadePageCover(false);
                            }
                        }
                        , null);
                });
        }


    }

}
function Operations_CreateMasterOperation() {
    debugger;
    if (GetAllSelectedIDsAsString('tblOperations') == "") {
        swal(strSorry, "Please Select at least one House");
    } else {
        // loop through Houses and make sure they all have the same POL and POD
        // and make sure they all are not connected to operations

        let FirstSelectedRow = GetAllSelectedIDsAsString('tblOperations').split(",")[0];
        let SelectedRows = GetAllSelectedIDsAsString('tblOperations');

       let POD = $("#tblOperations tbody #" + FirstSelectedRow + " .POD").attr("val");
       let POL = $("#tblOperations tbody #" + FirstSelectedRow + " .POL").attr("val");
        let ContainerNumber = $("#tblOperations tbody #" + FirstSelectedRow + " .HouseContainerNumber").text().trim();
        let IsContainerOK = true;
        let IsPortsOK = true;

        let TransportType = $("#tblOperations tbody #" + FirstSelectedRow + " .TransportType").text().trim();
        let IsTransportTypeOK = true;

        let ShipmentType = $("#tblOperations tbody #" + FirstSelectedRow + " .ShipmentType").text().trim();
        let ShipmentTypeVal = parseInt($("#tblOperations tbody #" + FirstSelectedRow + " .ShipmentType").attr('val'));
        let IsShipmentTypeOK = true;

        let IsWithoutMasterOperation = true;
        let hasContainer = true;

        let RowPOD = 0;
        let RowPOL = 0;
        let RowContainerNumber = 0;
        let RowTransportType = 0;
        let RowShipmentType = 0;
        GetAllSelectedIDsAsString('tblOperations').split(",").forEach((SelectedRowID) => {
            RowPOD = $("#tblOperations tbody #" + SelectedRowID + " .POD").attr("val");
            RowPOL = $("#tblOperations tbody #" + SelectedRowID + " .POL").attr("val"); 
            RowContainerNumber = $("#tblOperations tbody #" + SelectedRowID + " .HouseContainerNumber").text().trim();

            RowTransportType = $("#tblOperations tbody #" + SelectedRowID + " .TransportType").text().trim();
            RowShipmentType = $("#tblOperations tbody #" + SelectedRowID + " .ShipmentType").text().trim();
            RowOperationCode = $("#tblOperations tbody #" + SelectedRowID + " .Code").text().trim();
            if (RowPOD != POD || RowPOL != POL) {
                IsPortsOK = false;
            }
            if (RowTransportType != TransportType) {
                IsTransportTypeOK = false;
            }
            if (RowShipmentType != ShipmentType) {
                IsShipmentTypeOK = false;
            }
            if (RowOperationCode != 0) {
                IsWithoutMasterOperation = false;
            }
            if (RowContainerNumber != ContainerNumber) {
                IsContainerOK = false;
            }
            if (RowContainerNumber == "" || RowContainerNumber == null) {
                hasContainer = false;
            }

        });

        //if (!IsPortsOK) {
        //    swal(strSorry, "POD and POL are not the same")
        //} else if (!IsTransportTypeOK) {
        //    swal(strSorry, "Transport Types must be the same")
        //} else if (!IsShipmentTypeOK) {
        //    swal(strSorry, "Shipment Types must be the same")
        //} else if (!IsWithoutMasterOperation) {
        //    swal(strSorry, "Must be Without a Master Operation")
        //  }
        if (pDefaults.UnEditableCompanyName == "UNF" && glbCallingControl == "ShippingOrders") {
            IsContainerOK = true;
            hasContainer = true;
        }
         if (!IsContainerOK) {
            swal(strSorry, "Container Numbers are not the same")
           
        } else if (!hasContainer) {
            swal(strSorry, "Please Enter The Container Number");
        }

        else {
            // save a master operation ////////////////////////////////////////////////////////////////
            var DirectionTypeID = 0;
            var DirectionIconName = 0;
            var DirectionIconStyle = 0;

            if (glbCallingControl == "ShippingOrders") {
                DirectionTypeID = constExportDirectionType; DirectionIconName = ExportIconName; DirectionIconStyle = strExportIconStyleClassName;    // Export
            } else if (glbCallingControl == "RoutingOrders") {
                DirectionTypeID = constImportDirectionType; DirectionIconName = ImportIconName; DirectionIconStyle = strImportIconStyleClassName;    // Import
            }


            var TransportIconName = 0;
            var TransportIconStyle = 0;

            if (TransportType == OceanTransportType) {
                TransportIconName = OceanIconName; TransportIconStyle = strOceanIconStyleClassName;
            }
            else if (TransportType == AirTransportType) {
                TransportIconName = AirIconName; TransportIconStyle = strAirIconStyleClassName;
            }
            else if (TransportType == InlandTransportType) {
                TransportIconName = InlandIconName; TransportIconStyle = strInlandIconStyleClassName;
            }

            // get POLCountryID and POLCountryID
            debugger;
            CallGETFunctionWithParameters("/api/Ports/GetCountries", { pPortsList: `${POD},${POL}` }
                , function (CountriesList) {
                    var PODCountryID = CountriesList.split(',')[0];
                    var POLCountryID = CountriesList.split(',')[1];
                    var ErrorMessage = "";

                    var pIsShipment = false;
                    var parameters = {
                        //if HouseNumber is not null then its entered manually
                        "pIsShipment": false,
                        "pCodeSerial": 0 /*generated automatically*/,
                        "pCode": ("O" + $("#txtOperationOpenDate").val().substring(10, 8) + "-" + GetDirectionType(DirectionTypeID).substring(0, 3) + "-"
                            + GetTransportType(TransportType).substring(0, 2) + "-"),
                        "pHouseNumber": "0",
                        "pBranchID": $('#slOperationBranch option:selected').val(),
                        "pSalesmanID": $('#slOperationSalesman option:selected').val(),

                        "pBLType": constMasterBLType,
                        "pBLTypeIconName": HouseIconName,
                        "pBLTypeIconStyle": strHouseIconStyleClassName,

                        "pDirectionType": DirectionTypeID,//$('input[name=cbDirectionType]:checked').val(),
                        "pDirectionIconName": DirectionIconName,
                        "pDirectionIconStyle": DirectionIconStyle,

                        "pTransportType": TransportType,//$('input[name=cbTransportType]:checked').val(),
                        "pTransportIconName": TransportIconName,
                        "pTransportIconStyle": TransportIconStyle,

                        //"pShipmentType": pIsShipment
                        //    ? ($("#cbIsOcean").prop("checked") || $("#cbIsInland").prop("checked")
                        //            ? ($('input[name=cbShipmentType]:checked').val() == constConsolidationShipmentType ? ($("#cbIsOcean").prop("checked") ? constLCLShipmentType : constLTLShipmentType) : $('input[name=cbShipmentType]:checked').val())
                        //            : 0 //air and house
                        //    )/*No air in this case coz air has no consolidation*/
                        //    : ($('input[name=cbTransportType]:checked').val() == AirTransportType ? 0 : $('input[name=cbShipmentType]:checked').val()),
                        "pShipmentType": (TransportType == AirTransportType ? 0 : $('input[name=cbShipmentType]:checked').val()),
                        "pMasterBL": $("#txtOperationMasterBL").val(),
                        "pShipperID": $('#slShippers option:selected').val() == "" || $('#slShippers option:selected').val() == null || $('#slShippers option:selected').val() == undefined
                            ? 0 : $('#slShippers option:selected').val(),
                        "pShipperAddressID": 0,
                        "pShipperContactID": 0,
                        "pConsigneeID": $('#slConsignees option:selected').val() == "" || $('#slConsignees option:selected').val() == null || $('#slConsignees option:selected').val() == undefined
                            ? 0 : $('#slConsignees option:selected').val(),
                        "pConsigneeAddressID": 0,
                        "pConsigneeContactID": 0,
                        "pNotifyID": 0,
                        "pAgentID": $('#slAgents').val() == "" || $('#slAgents').val() == null
                            ? 0 : $('#slAgents option:selected').val(),
                        "pQuotationID": $("#tblOperations tbody #" + FirstSelectedRow + " .QuotationID").attr("val"),
                        "pAgentAddressID": 0,
                        "pAgentContactID": 0,
                        "pIncotermID": 0,
                        "pPOrC": 1, // prepaid or 3 for collect
                        "pMoveTypeID": $("#slOperationMoveTypes").val() == "" ? 0 : $("#slOperationMoveTypes").val(),
                        "pCommodityID": 0,
                        "pTransientTime": 0,
                        "pOpenDate": ConvertDateFormat($("#txtOperationOpenDate").val().trim()),
                        //"pCloseDate": null,
                        "pCloseDate": ConvertDateFormat($("#txtOperationCloseDate").val().trim()),
                        "pCutOffDate": "01/01/1900",
                        "pIncludePickup": false,
                        "pPickupCityID": 0,
                        "pPickupAddressID": 0,
                        "pPOLCountryID": $('#slPOLCountries option:selected').val(),
                        "pPOL": $('#slPOL option:selected').val(),
                        "pPODCountryID": $('#slPODCountries option:selected').val(),
                        "pPOD": $('#slPOD option:selected').val(),
                        "pShippingLineID": (TransportType == OceanTransportType ? $('#slLines option:selected').val() : 0),
                        "pAirlineID": 0,
                        "pTruckerID": 0,
                        "pIncludeDelivery": false,
                        "pDeliveryZipCode": 0,
                        "pDeliveryCityID": 0,
                        "pDeliveryCountryID": 0,//i am leaving it the same as PODCountryID
                        "pNetWeight": 0,
                        "pGrossWeight": 0,
                        "pVolume": 0,
                        "pChargeableWeight": 0,
                        "pPackageTypeID": 0,
                        "pNumberOfPackages": 1,
                        "pIsDangerousGoods": false,
                        "pNotes": "0",
                        "pIsDelivered": false,
                        "pIsTrucking": false, //$("#cbIsTrucking").prop("checked"),
                        "pIsInsurance": false, //$("#cbIsInsurance").prop("checked"),
                        "pIsClearance": false, //$("#cbIsClearance").prop("checked"),
                        "pIsGenset": false, //$("#cbIsGenset").prop("checked"),
                        "pIsCourrier": false, //$("#cbIsCourrier").prop("checked"),
                        "pIsTelexRelease": false, //$("#cbIsTelexRelease").prop("checked"),
                        "pCustomerReference": "0",
                        "pSupplierReference": "0",
                        "pPONumber": "0",
                        "pAgreedRate": "0",
                        "pOperationStageID": 60, //this means Order
                        "pNumberOfHousesConnected": 0,
                        "pExpectedDeparture": $("#txtOperationExpectedDeparture").val().trim() == "" ? "01/01/1900" : $("#txtOperationExpectedDeparture").val().trim(),
                        "pExpectedArrival": $("#txtOperationExpectedArrival").val().trim() == "" ? "01/01/1900" : $("#txtOperationExpectedArrival").val().trim() ,
                        "pVoyageOrTruckNumber": "0",
                        "pVesselID": "0",
                        "pContainerTypeID": $("#slOperationContainerType").val() == "" ? "0" : $("#slOperationContainerType").val(),
                        "pNumberOfContainers": $("#txtOperationNumberOfContainers").val() == "" ? "0" : $("#txtOperationNumberOfContainers").val(),

                        "pContainerTypeID2": $("#slOperationContainerType2").val() == "" ? "0" : $("#slOperationContainerType2").val(),
                        "pNumberOfContainers2": $("#txtOperationNumberOfContainers2").val() == "" ? "0" : $("#txtOperationNumberOfContainers2").val(),

                        "pContainerTypeID3": $("#slOperationContainerType3").val() == "" ? "0" : $("#slOperationContainerType3").val(),
                        "pNumberOfContainers3": $("#txtOperationNumberOfContainers3").val() == "" ? "0" : $("#txtOperationNumberOfContainers3").val(),
                        //"pIsInactive": $("#cbIsInactive").prop('checked'),
                        /***************************Venus Fields: A.Medra****************************/
                        "pBLDate": "01/01/1900",
                        "pMAWBStockID": 0,
                        "pTypeOfStockID": 0,
                        "pMAWBSuffix": "0",
                        "pFlightNo": "0",
                        "pIsAWB": false,
                        "pConsigneeID2": 0,
                        "pReleaseDate": "01/01/1900",
                        "pCertificateNumber": 0,
                        "pCountryOfOrigin": 0,
                        "pInvoiceValue": 0,
                        "pCurrencyID": 83,//pIsShipment ? ($("#slClearanceCurrency").val() == "" ? 0 : $("#slClearanceCurrency").val()) : "0",
                        "pACIDNumber": 0,
                        "pACIDNumberDetails": "0",
                        "pBookingNumber": "0",
                        "pUNNumber": 0,
                        "pIMOClass": 0,
                        "pVesselID": $("#slOperationVessels").val() == "" ? "0" : $("#slOperationVessels").val(),
                        "pManifestPreConsignee": "",
                        "pHouseContainerNumber": ContainerNumber,
                         "pSelectedHousesCheck" : SelectedRows
                    };
                    PostInsertUpdateFunction("form", "/api/Operations/InsertFromLCL", parameters, false, "OperationModal", function (pData) {
                        if (pData[3] != '')
                            swal('Sorry', pData[3]);
                        else {
                            //$('#hShipmentID').val(pData[1]);
                            //$('#txtShipmentHouseNumber').val(pData[2]);
                            //Operations_LoadingWithPaging();
                            //Shipments_ClearAllControls();
                            //swal('Success', 'Saved Successfully.');


                            // then connect selected houses
                            let MasterOperationID = pData[1];
                            var pParametersWithValues = {
                                pMasterOperationID: MasterOperationID
                                , pIsHouseConnected: true
                                , pMasterOperationIDFieldInHouse: MasterOperationID
                                , pHouseOperationsIDs: GetAllSelectedIDsAsString('tblOperations')
                                , pHouseParentID: 0
                              
                            };
                            if (pDefaults.UnEditableCompanyName == "UNF") {
                                pParametersWithValues.pAction = "LCL_Transfer";
                            }

                            CallGETFunctionWithParameters("/api/Operations/ConnectOrDisconnectMultiple", pParametersWithValues
                                , function (DataArray) {
                                    var IsError = false;
                                    var ErrorMessage = "";
                                    DataArray.forEach((pData, index) => {
                                        let pReturnedMessage = pData[1];
                                        if (pReturnedMessage != "") {
                                            IsError = true;
                                            ErrorMessage = pReturnedMessage;
                                        }
                                    });
                                    if (!IsError) {
                                        if (pDefaults.UnEditableCompanyName = "UNF") {
                                            var pParametersWithValues2 = {
                                                OperationIDs: SelectedRows
                                                , ID: MasterOperationID

                                            };

                                            /*CallGETFunctionWithParameters("/api/Operations/PandRInsert", pParametersWithValues2, function (pData) {
                                                if (!pData[0]) {
                                                    swal("Sorry", "Master Operation Created But P/R Not Linked Correctly");
                                                } else {
                                                    swal("Success");
                                                    SwitchToOperationsEditView(MasterOperationID);
                                                }
                                            }, null);*/
                                            swal("Success");
                                            SwitchToOperationsEditView(MasterOperationID);

                                        } else {
                                            swal("Success");
                                            SwitchToOperationsEditView(MasterOperationID);
                                        }
                                        //Operations_LoadingWithPaging();
                                        // then go to operations edit screen
                                    }
                                    else {
                                        swal("Sorry", ErrorMessage);
                                        FadePageCover(false);
                                    }
                                }
                                , null);
                        }
                    });

                }
                , null);










        }


    }

}

function Operations_ClearAllControls(callback) {
    debugger;
    if (GetAllSelectedIDsAsString('tblOperations') == "") {
        swal(strSorry, "Please Select at least one House");
    }
    else {
        debugger;
        ClearAll("#OperationModal");
        jQuery("#OperationModal").modal("show");
        $(".classAWBFields").addClass("hide");
        if (IsAdminRoleID)
            $("#txtOperationCloseDate").removeAttr("disabled");
        else
            $("#txtOperationCloseDate").attr("disabled", "disabled");
        $(".hideForAWB").removeClass("hide");
        $("#slPOD").parent().attr("style", "");
        $("#slMAWBStock").html("<option value=''></option>");
        $("#slMAWBStock").attr("data-required", "false");
        $("#slOperationMoveTypes").attr("data-required", "true");

        $("#txtOperationOpenDate").val(ConvertDateFormat(FormattedTodaysDate));
       
        $("#cbIsOcean").prop("checked", true);
        $("#divOperationExpectedDeparture").addClass("hide");
        $("#divOperationExpectedArrival").addClass("hide");
        $("#divOperationVessels").addClass("hide");
        $("#divOperationVoyageOrTruckNumber").addClass("hide");
        $("#divOperationMasterBL").addClass("hide");

        

        if (pDefaults.UnEditableCompanyName == "UNF" && glbCallingControl == "ShippingOrders") {
            //$("#slConsignees").attr("data-required", false);
            //$("#slShippers").attr("data-required", true);
            $("#slOperationContainerType").attr("data-required", false);
            $("#txtOperationNumberOfContainers").attr("data-required", false);
        } else if (pDefaults.UnEditableCompanyName == "UNF" && glbCallingControl == "RoutingOrders") {
            //$("#slConsignees").attr("data-required", true);
            //$("#slShippers").attr("data-required", false);
            $("#slOperationContainerType").attr("data-required", true);
            $("#txtOperationNumberOfContainers").attr("data-required", true);
        }

        //$("#spanLblSlLines").text("Line/Trucker");
        //Operations_Salesmen_GetList(null, "slOperationSalesman", null);
        $("#slOperationSalesman").val("");

        if (pDefaults.UnEditableCompanyName != "UNF") {
            Operations_Countries_GetList(null, null, null);
            POL_GetList(null, null, null);
            POD_GetList(null, null, null);
        }
        
        Lines_GetList(null, null);
        CallGETFunctionWithParameters("/api/MoveTypes/LoadAll", { pWhereClause: "WHERE IsOcean=1 OR IsCustomsClearance=1 OR IsWarehousing=1 ORDER BY Name" }
            , function (pData) {
                FillListFromObject(null, 18, "<--Select-->", "slOperationMoveTypes", pData[0], null);
            }
            , null);
        //ContainerTypes_GetList(null, null);
        Agents_GetList(null, null);
        //Shippers_GetList(null, null);
        //Consignees_GetList(null, null);
        //$("#slConsignees").html($("#hReadySlCustomers").html());
        //$("#slShippers").html($("#hReadySlCustomers").html());
        if (IsNull(pDefaults.ShowUserSalesmen, "false") == true) {
            $("#slConsignees").html("");
            $("#slShippers").html("");
        }
        else {
            /*if (pDefaults.UnEditableCompanyName == "GBL") {
                CallGETFunctionWithParameters("/api/Customers/LoadAllWithMinimalColumns"
                    , { pWhereClauseWithMinimalColumns: "WHERE IsInactive=0", pOrderBy: "Name" }
                    , function (pData) {
                        FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slConsignees", pData[0], function () { $("#slShippers").html($("#slConsignees").html()); });
                    }
                    , null);
            }
            else {
                CallGETFunctionWithParameters("/api/Customers/LoadAllWithMinimalColumns", { pWhereClauseWithMinimalColumns: "WHERE IsInactive=0", pOrderBy: "Name" },
                    function (pData) {
                        var pShipper = pData[1];
                        var pConsignee = pData[2];
                        FillListFromObject(null, 2, "<--Select-->", "slShippers", pShipper, null);
                        FillListFromObject(null, 2, "<--Select-->", "slConsignees", pConsignee, null);
                    });
            }*/

        }
        $("#slOperationBranch").html($("#hReadySlBranches").html());
        if (pDefaults.UnEditableCompanyName == "MED") {
            $("#slOperationBranch").val(pLoggedUser.BranchID);
        }

        CallGETFunctionWithParameters("/api/Operations/LoadNewOperationComboBoxes", { pDummy: false }
            , function (pData) {

                var pVessels = pData[0];
                var pContainerTypes = pData[1];
                var pUsers = pData[2];
                var pMescoSalesmen = pData[3];


                var _Salesmentemp = JSON.parse(pUsers);
                var pSalesmen = jQuery.grep(_Salesmentemp, function (_Salesmentemp) {
                    return _Salesmentemp.IsSalesman == true;
                });

                FillListFromObject(null, 2, "<--Select-->", "slOperationVessels", pVessels, function () {
                    //$("#slFilterVessel").html($("#slOperationVessels").html());
                    //$("#slVesselCCModule").html($("#slOperationVessels").html());
                });
                FillListFromObject(null, 1, "<--Select-->", "slOperationContainerType", pContainerTypes, function () { $("#slOperationContainerType2").html($("#slOperationContainerType").html()); $("#slOperationContainerType3").html($("#slOperationContainerType").html()); });

                if (IsMESCOCompany) {
                    FillListFromObject(null, 2, "<--Select-->", "slOperationSalesman", pMescoSalesmen, null);
                    FillListFromObject(null, 2, "<--Select-->", "slFilterSalesman", pMescoSalesmen, null);
                } else {
                    FillListFromObject(null, 2, "<--Select-->", "slFilterSalesman", JSON.stringify(pSalesmen), function () { $("#slOperationSalesman").html($("#slFilterSalesman").html()); });

                 

                }
                //FadePageCover(false);
                
                ApplySelectListSearch();
                Select2OnlineSearch("slConsignees", "/api/Customers/LoadAllCustomersForSlReadyCustomers", function (params) {
                    var query = {
                        pWhereClauseWithMinimalColumns: " WHERE IsInactive=0 AND IsConsignee=1 AND Name like N'%" + params.term + "%'",
                        pOrderBy: "Name",
                        pDummy: false
                    }
                    return query;
                }, function (data) {
                    var d = JSON.parse(data[0]);
                    return {

                        results: $.map(d, function (item) {
                            return {
                                text: item.Name,
                                id: item.ID,
                                value: item.ID
                            };
                        })
                    };
                }, 3, 2000);
                Select2OnlineSearch("slShippers", "/api/Customers/LoadAllCustomersForSlReadyCustomers", function (params) {
                    var query = {
                        pWhereClauseWithMinimalColumns: " WHERE IsInactive=0 AND IsShipper=1 AND Name like N'%" + params.term + "%'",
                        pOrderBy: "Name",
                        pDummy: false
                    }
                    return query;
                }, function (data) {
                    var d = JSON.parse(data[0]);
                    return {

                        results: $.map(d, function (item) {
                            return {
                                text: item.Name,
                                id: item.ID,
                                value: item.ID
                            };
                        })
                    };
                }, 3, 2000);

                if (pDefaults.UnEditableCompanyName == "UNF") {
                    let FirstSelectedRow = GetAllSelectedIDsAsString('tblOperations').split(",")[0];
                    CallGETFunctionWithParameters("api/Operations/LoadWithParameters", { pPageNumber: 1, pPageSize: 1, pOrderBy: "ID", pWhereClause: "WHERE ID=" + FirstSelectedRow }, function (pData) {
                        debugger;
                        let OP = JSON.parse(pData[0])[0];

                        $("#slOperationMoveTypes").val(OP.MoveTypeID);
                        Operations_Countries_GetList(OP.POLCountryID, OP.PODCountryID, function () {
                            POL_GetList(OP.POL, OP.POLCountryID, null);
                            POD_GetList(OP.POD, OP.PODCountryID, null);
                        });
                        if (glbCallingControl == "RoutingOrders") {

                            if ($('#slConsignees').find("option[value='" + OP.ConsigneeID + "']").length) {
                                $('#slConsignees').val(OP.ConsigneeID).trigger('change');
                            } else {
                                let newOption = new Option(OP.ConsigneeName, OP.ConsigneeID, true, true);
                                $('#slConsignees').append(newOption).trigger('change');
                            }
                        } else if (glbCallingControl == "ShippingOrders") {
                            if ($('#slShippers').find("option[value='" + OP.ShipperID + "']").length) {
                                $('#slShippers').val(OP.ShipperID).trigger('change');
                            } else {
                                let newOption = new Option(OP.ShipperName, OP.ShipperID, true, true);
                                $('#slShippers').append(newOption).trigger('change');
                            }
                        }
                        let Agent_ID = $("#tblOperations tbody #" + FirstSelectedRow + " .Agent").attr('val');
                        if (Agent_ID != "" && Agent_ID > 0) {
                            $("#slAgents").val(Agent_ID).trigger("change");
                        }
                    });
                }
                

                

                // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                if (IsNull(pDefaults.ShowUserSalesmen, "false") == true) {
                    $("#slConsignees").html("");
                    $("#slShippers").html("");
                    $('#slOperationSalesman').on('change', function () {
                        //FadePageCover(true);

                        CallGETFunctionWithParameters("/api/Customers/LoadAllWithMinimalColumns"
                            , {
                                pWhereClauseWithMinimalColumns: (($("#sp-LoginName").text() == "BG EGYPT" ? "WHERE Name=N'BG EGYPT'" : "WHERE 1=1") + "  AND SalesmanID = " + $('#slOperationSalesman').val() + " ")
                                , pOrderBy: "Name"
                            }
                            , function (pData) {
                                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "hReadySlCustomers", pData[0], function () {
                                    try {
                                        $("#slConsignees").prop('disabled', false);
                                        $("#slShippers").prop('disabled', false);
                                        $("#slConsignees").html($("#hReadySlCustomers").html());
                                        $("#slShippers").html($("#hReadySlCustomers").html());
                                        FadePageCover(false)
                                    }
                                    catch (ex) {
                                        console.log('Consignee or shipper is not define')
                                        FadePageCover(false)
                                    }
                                });

                            }
                            , null);
                    });


                }
                //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

            }
            , null);

        $("#divOperationExpectedDeparture").removeClass("hide");
        $("#divOperationExpectedArrival").removeClass("hide");
        $("#divOperationVessels").removeClass("hide");
        $("#divOperationVoyageOrTruckNumber").removeClass("hide");
        $("#divOperationMasterBL").removeClass("hide");

        $("#cbIsDirect").prop('checked', true); //set cbIsDirect to the default value
        BLType_SetIconNameAndStyle();//to set the defaults of Import

        if (pDefaults.UnEditableCompanyName == "UNF" && glbCallingControl == "RoutingOrders") {
            $("#cbIsImport").prop('checked', true);
            $("#cbIsExport").prop('checked', false);
        } else if (pDefaults.UnEditableCompanyName == "UNF" && glbCallingControl == "ShippingOrders") {
            $("#cbIsImport").prop('checked', false);
            $("#cbIsExport").prop('checked', true);
        } else {
            $("#cbIsImport").prop('checked', true); //set cbIsImport to the default value
        }

        DirectionType_SetIconNameAndStyle();//to set the defaults of Import

        $("#cbIsOcean").prop('checked', true); //set cbIsOcean to the default value
        TransportType_SetIconNameAndStyle();

        $("#secBLType").removeClass("hide");
        $("#secDirectionType").removeClass("hide");
        $("#secTransportType").removeClass("hide");
        $("#secShipmentType").removeClass("hide");//show section of Shipment Types radios(FCL,....)
        $("#cbIsConsolidation").prop('checked', true); //set cbIsFCL to the default value
        GetAllSelectedIDsAsString('tblOperations').split(",").forEach(SelectedRowID => {
            RowTransportType = $("#tblOperations tbody #" + SelectedRowID + " .TransportType").text().trim();
            RowShipmentType = $("#tblOperations tbody #" + SelectedRowID + " .ShipmentType").attr('val');
            if (RowTransportType == "2") {
                $("#secShipmentType").addClass("hide");
            }
            if (RowShipmentType == "1") {
                $("#cbIsFCL").prop('checked', true);
            }
        });

        //Show vehicle shipment type for GhandourAuto
        if (pDefaults.UnEditableCompanyName == "GHA") {
            $(".classVehicle").removeClass("hide");
        }

        if (CustomerAdd) { $("#btn-NewAddShipper").removeClass("hide"); $("#btn-NewAddConsignee").removeClass("hide"); }
        else { $("#btn-NewAddShipper").addClass("hide"); $("#btn-NewAddConsignee").addClass("hide"); }
        if (AgentAdd) $("#btn-NewAddAgent").removeClass("hide"); else $("#btn-NewAddAgent").addClass("hide");

        if (CustomerEdit) { $("#btn-EditShipper").removeClass("hide"); $("#btn-EditConsignee").removeClass("hide"); }
        else { $("#btn-EditShipper").addClass("hide"); $("#btn-EditConsignee").addClass("hide"); }
        if (AgentEdit) $("#btn-EditAgent").removeClass("hide"); else $("#btn-EditAgent").addClass("hide");

        //Operations_ShowHideContainerControls();
        //parameter in the next 3 lines are 1:Quotations call, 2:Operations call
        $("#btn-NewAddShipper").attr("onclick", "Customers_ClearAllControls(1);");
        $("#btn-NewAddConsignee").attr("onclick", "Customers_ClearAllControls(1);");
        $("#btn-NewAddAgent").attr("onclick", "Agents_ClearAllControls(1);");

        $("#btn-EditShipper").attr("onclick", "Customers_FillControlsFromOperations($('#slShippers option:selected').val(), null, 1);");
        $("#btn-EditConsignee").attr("onclick", "Customers_FillControlsFromOperations($('#slConsignees option:selected').val(), null, 1);");
        $("#btn-EditAgent").attr("onclick", "Agents_FillControlsFromOperations($('#slAgents option:selected').val(), null, 1);");

        $("#btnSaveOperation").attr("onclick", "Operations_Insert(false, false, function (data) { if (data[3] == '') SwitchToOperationsEditView(data[1]); else {swal('Sorry', data[3]); FadePageCover(false);} } );");//data[1]: is the pID
        //$("#btnSaveandNewOperation").attr("onclick", "Operations_Insert(true, false);");
        $("#cb-CheckAll").prop('checked', false);
        //set close date //i put it down not to use callback(i need the radio controls to be filled first)
        Operations_SetCloseDate("txtOperationOpenDate", "txtOperationCloseDate");

        if (pDefaults.UnEditableCompanyName == "SAF") {
            $("#lblOperationBranch").text("B.P.");//BusinessPlan
            $("#slOperationBranch").val(12);
            $("#slOperationBranch option:contains('IACC')").addClass("hide");
            $("#slOperationBranch option:contains('TL')").addClass("hide");
        }
        /****************************Venus Controls******************************/
        $("#txtOperationBLDate").val("01/01/1900");
        $("#slCommodity").attr("data-required", false);
        $("#slTypeOfStock").attr("data-required", false);

        if (callback != null && callback != undefined)
            callback();
    }
  
  
}
//************************************************************************* */

function POL_GetList(pID, pCountryID, pDontCallFillOtherSidePorts, pCallback) {//pID is used in case of editing to set the code or name
    //parameters: ID, strFnName, First Row in select list, select list name, pWhereClause
    debugger;
    //if (pID != undefined) {
    var pWhereClause = "";
    if (pCountryID != null) //this means editing
    {
        pWhereClause = " where IsPort = 1 and IsInactive = 0 and CountryID = " + pCountryID;
    }
    else //when changing the Country or Transport Type
    {
        pWhereClause = " where IsPort = 1 and IsInactive = 0 and CountryID = ";
        pWhereClause += ($('#slPOLCountries option:selected').val() == null || $('#slPOLCountries option:selected').val() == ""
            ? 0 : $('#slPOLCountries option:selected').val());
    }
    if ($('input[name=cbTransportType]:checked').val() == 1)
        pWhereClause += " and IsOcean = 1 ";
    if ($('input[name=cbTransportType]:checked').val() == 2)
        pWhereClause += " and IsAir = 1 ";
    if ($('input[name=cbTransportType]:checked').val() == 3)
        pWhereClause += " and IsInland = 1 ";
    //if (pID != null)
    //    pWhereClause += " or ID=" + pID;
    pWhereClause += " order by Name ";
    //GetListWithNameAndWhereClause(pID, "/api/Ports/LoadAll", "Select POL", "slPOL", pWhereClause);
    GetListWithCodeAndNameAndWhereClause(pID, "/api/Ports/LoadAll", "Select POL", "slPOL", pWhereClause
        , function () {
            if (pCallback != null && pCallback != undefined)
                pCallback();
        });
    ////in case of domestic set POLCountry = PODCountry
    //if ($('input[name=cbDirectionType]:checked').val() == 3 && pCountryID == null) {
    //    $('#slPODCountries option[value=' + $('#slPOLCountries option:selected').val() + ']').attr('selected', 'selected');
    //    if (pDontCallFillOtherSidePorts != 1) // if pDontCallFillOtherSidePorts ==1 then dont call the other port GetList to avoid open loop
    //        POD_GetList(pID, $('#slPOLCountries option:selected').val(), 1);
    //}
    ////to fill the pickup address
    ////PickupCity_GetList(null, $('#slPOLCountries option:selected').val());
    //PickupCity_GetList(null, pCountryID);
    //} //if (pID != undefined) {
}
//fill slPOD , pDontCallFillOtherSidePorts: is used to handle Domestic (they could be put in one function with a flag to know who's calling)
function POD_GetList(pID, pCountryID, pDontCallFillOtherSidePorts) {//pID is used in case of editing to set the code or name
    //parameters: ID, strFnName, First Row in select list, select list name, pWhereClause
    debugger;
    //if (pID != undefined) {
    var pWhereClause = "";
    if (pCountryID != null) //this means editing
    {
        pWhereClause = " where IsPort = 1 and IsInactive = 0 and CountryID = " + pCountryID;
    }
    else //when changing the Country or Transport Type
    {
        pWhereClause = " where IsPort = 1 and IsInactive = 0 and CountryID = ";
        pWhereClause += ($('#slPODCountries option:selected').val() == null || $('#slPODCountries option:selected').val() == ""
            ? 0 : $('#slPODCountries option:selected').val());
    }
    if ($('input[name=cbTransportType]:checked').val() == 1)
        pWhereClause += " and IsOcean = 1 ";
    if ($('input[name=cbTransportType]:checked').val() == 2)
        pWhereClause += " and IsAir = 1 ";
    if ($('input[name=cbTransportType]:checked').val() == 3)
        pWhereClause += " and IsInland = 1 ";
    //if (pID != null)
    //    pWhereClause += " or ID=" + pID;
    pWhereClause += " order by Name ";
    //GetListWithNameAndWhereClause(pID, "/api/Ports/LoadAll", "Select POD", "slPOD", pWhereClause);
    GetListWithCodeAndNameAndWhereClause(pID, "/api/Ports/LoadAll", "Select POD", "slPOD", pWhereClause);
    ////in case of domestic set POLCountry = PODCountry
    //if ($('input[name=cbDirectionType]:checked').val() == 3 && pCountryID == null) {
    //    $('#slPOLCountries option[value=' + $('#slPODCountries option:selected').val() + ']').attr('selected', 'selected');
    //    if (pDontCallFillOtherSidePorts != 1) // if pDontCallFillOtherSidePorts ==1 then dont call the other port GetList to avoid open loop
    //        POL_GetList(pID, $('#slPODCountries option:selected').val(), 1);
    //}
    //////to fill the Delivery address
    ////DeliveryCity_GetList(null, $('#slPODCountries option:selected').val());
    //DeliveryCity_GetList(null, pCountryID);
    //} //if (pID != undefined) {
}
function PickupCity_GetList(pID, pCountryID) {//the first parameter is used in case of editing to set the code or name to its original value
    var pWhereClause = "";
    if (pCountryID != null) //this means editing
    {
        pWhereClause = " where IsPort = 0 AND IsInactive = 0 and CountryID = " + pCountryID;
    }
    else //when changing the Country or Transport Type
    {
        pWhereClause = " where IsPort = 0 AND IsInactive = 0 and CountryID = ";
        pWhereClause += ($('#slPOLCountries option:selected').val() == null || $('#slPOLCountries option:selected').val() == ""
            ? 0 : $('#slPOLCountries option:selected').val());
    }
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithNameAndWhereClause(pID, "/api/Ports/LoadAll", "Select Pickup City", "slPickupCity", pWhereClause);
    debugger;
}
function DeliveryCity_GetList(pID, pCountryID) {//the first parameter is used in case of editing to set the code or name to its original value
    debugger;
    var pWhereClause = "";
    if (pCountryID != null) //this means editing
    {
        //pWhereClause = " where IsPort = 0 AND IsInactive = 0 and CountryID = " + pCountryID;
        pWhereClause = " where IsInactive = 0 and CountryID = " + pCountryID;
    }
    else //when changing the Country or Transport Type
    {
        //pWhereClause = " where IsPort = 0 AND IsInactive = 0 and CountryID = ";
        pWhereClause = " where IsInactive = 0 and CountryID = ";
        pWhereClause += ($('#slPODCountries option:selected').val() == null || $('#slPODCountries option:selected').val() == ""
            ? 0 : $('#slPODCountries option:selected').val());
    }
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithNameAndWhereClause(pID, "/api/Ports/LoadAll", "Select Final Dest.", "slDeliveryCity", pWhereClause);
}
function Lines_GetList(pID, callback) {
    //parameters: ID, strFnName, First Row in select list, select list name
    var strFnName = "";
    var str1stRow = "";
    var pWhereClause = " WHERE 1=1 ORDER BY Name ";
    debugger;
    $('#slLines').trigger("change");
    $("#slLines").css({ "width": "100%" }).select2();
    $("div[tabindex='-1']").removeAttr('tabindex');
    if ($('input[name=cbTransportType]:checked').val() == 1
        || $('input[name=cbTransportType]:checked').val() == null) {//null is for case of first load
        strFnName = "/api/ShippingLines/LoadAll";
        str1stRow = "Select Shipping Line";
    }
    if ($('input[name=cbTransportType]:checked').val() == 2) {
        strFnName = "/api/Airlines/LoadAll";
        str1stRow = "Select Airline";
    }
    if ($('input[name=cbTransportType]:checked').val() == 3) {
        strFnName = "/api/Truckers/LoadAll";
        str1stRow = "Select Trucker";
    }
    if ($('input[name=cbTransportType]:checked').val() != 2)
        GetListWithNameAndWhereClause(pID, strFnName, str1stRow, "slLines", pWhereClause);
    else //incase of Air to get the prefic for MAWB
        GetListWithNameAndPrefixAttr(pID, strFnName, str1stRow, "slLines", pWhereClause);
}
function Incoterms_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithName(pID, "/api/Incoterms/LoadAll", "Select Incoterm", "slIncoterms");
}
function POrC_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithNameAndWhereClause(pID, "/api/NoAccessFreightTypes/LoadAll", "P/C", "slOperationPOrC", " WHERE 1=1 ");
}
function Agents_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    //var pWhereClause = "";
    //pWhereClause = " WHERE IsInactive = 0 ";
    //pWhereClause += " ORDER BY Name ";
    //GetListWithNameAndWhereClause(pID, "/api/Agents/LoadAll", "Select Agent", "slAgents", pWhereClause);
    CallGETFunctionWithParameters("/api/Agents/LoadAllForCombo"
        , { pWhereClauseForCombo: "ORDER BY Name" }
        , function (pData) {
            FillListFromObject(pID, 2, TranslateString("SelectFromMenu"), "slAgents", pData[0], null);
        }
        , null);
}
function Notify_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    var pWhereClause = "";

    //pWhereClause = " WHERE IsConsignee = 1 AND IsInactive = 0  ";
    pWhereClause = " WHERE IsInactive = 0  ";
    CallGETFunctionWithParameters("/api/Customers/LoadAllWithMinimalColumns"
        , { pWhereClauseWithMinimalColumns: pWhereClause, pOrderBy: "Name" }
        , function (pData) {
            FillListFromObject(pID, 2, "Select Notify", "slNotify", pData[0], callback)
        }
        , null);
}
//************************************************************************* */
function Operations_Countries_GetList(pPOLCountryID, pPODCountryID, callback) {//pID is used in case of editing to set the code or name
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithName(pPOLCountryID, "/api/Countries/LoadAll", "Select Country", "slPOLCountries", function () {
        $("#slPODCountries").html($("#slPOLCountries").html());
        $("#slPODCountries").val(pPODCountryID);
        if (callback != null && callback != undefined)
            callback();
    });
    //GetListWithName(pPODCountryID, "/api/Countries/LoadAll", "Select Country", "slPODCountries");
}
function SwitchToOperationsEditView(pID) {
    debugger;
    LoadViews("OperationsEdit", null, pID);
    LoadOperationsSubMenu($("#cbIsAWB" + pID).prop("checked"));
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////CargoProperties Fns////////////////////////////////////////////////////////////
//pOption 10:Master, 22:House
function CargoProperties_FillControls(pOption) {
    debugger;
    var pOperationCargoID = 0;
    if (pOption == 10)
        pOperationCargoID = $("#hOperationID").val();
    else if (pOption == 20)
        pOperationCargoID = $("#hShipmentID").val();
    if (pOperationCargoID == "")
        swal("Sorry", "Please, save house first.");
    else {
        ClearAll("#CargoPropertiesModal");
        FadePageCover(true);
        jQuery("#CargoPropertiesModal").modal("show");

        //disable unused fields
        $(".classDisableForUniFreight").attr("disabled", true);


        var pParametersWithValues = {
            pOperationIDForCargo: pOperationCargoID
            , pMasterOperationID: $("#hOperationID").val() //to always containrs on master
            , pOrderBy: "ID"
        };
        CallGETFunctionWithParameters("/api/Operations/LoadCargoProperties"
            , pParametersWithValues
            , function (pData) {
                $("#btn-SaveCargoProperties").attr("onclick", "CargoProperties_Save(" + pOperationCargoID + ");")
                var pOperationHeader = JSON.parse(pData[0]);
                var pOperationContainersAndPackages = pData[1];
                var pPackageType = pData[2];
                FillListFromObject(pOperationHeader.PackageTypeID, 2, "<--Select-->", "slCargoPackageTypes", pPackageType, null);
                FillListFromObject(pOperationHeader.PlacedOnOperationContainersAndPackagesID, 11, "<--Select-->", "slCargoPlacedOnContainer", pOperationContainersAndPackages, null);
                $("#txtCargoTareWeight").val(pOperationHeader.TareWeight);
                $("#txtCargoVolume").val(pOperationHeader.Volume);
                $("#txtCargoNetWeight").val(pOperationHeader.NetWeight);
                $("#txtCargoNetWeightTON").val(pOperationHeader.NetWeightTON);
                $("#txtCargoGrossWeight").val(pOperationHeader.GrossWeight);
                $("#txtCargoGrossWeightTON").val(pOperationHeader.GrossWeightTON);
                $("#txtCargoVGM").val(pOperationHeader.VGM);
                $("#txtCargoChargeableWeight").val(pOperationHeader.ChargeableWeight);
                $("#txtCargoVolumetricWeight").val(pOperationHeader.VolumetricWeight);
                $("#divCargoMarksAndNumbers").val(pOperationHeader.MarksAndNumbers == 0 ? "" : pOperationHeader.MarksAndNumbers);
                $("#divCargoGoodsDescription").val(pOperationHeader.Description == 0 ? "" : pOperationHeader.Description);
                $("#txtCargoNumberOfPackages").val(pOperationHeader.NumberOfPackages);
                FadePageCover(false);
            }
            , null);
    }
}
function CargoProperties_Save(pOperationCargoID) {
    debugger;
    if ($("#txtCargoVolume").val().trim() != "" && parseFloat($("#txtCargoVolume").val()) > 100) {
        swal("Sorry", "Volume must be less than or equal to 100.");
        return;
    }
    FadePageCover(true);
    var pParametersWithValues = {
        pOperationID: pOperationCargoID
        , pTareWeight: $("#txtCargoTareWeight").val() == "" ? 0 : $("#txtCargoTareWeight").val()
        , pGrossWeight: $("#txtCargoGrossWeight").val() == "" ? 0 : $("#txtCargoGrossWeight").val()
        , pGrossWeightTON: $("#txtCargoGrossWeightTON").val() == "" ? 0 : $("#txtCargoGrossWeightTON").val()
        , pVGM: $("#txtCargoVGM").val() == "" ? 0 : $("#txtCargoVGM").val()
        , pNetWeight: $("#txtCargoNetWeight").val() == "" ? 0 : $("#txtCargoNetWeight").val()
        , pNetWeightTON: $("#txtCargoNetWeightTON").val() == "" ? 0 : $("#txtCargoNetWeightTON").val()
        , pVolume: $("#txtCargoVolume").val() == "" ? 0 : $("#txtCargoVolume").val()
        , pChargeableWeight: $("#txtCargoChargeableWeight").val() == "" ? 0 : $("#txtCargoChargeableWeight").val()
        , pVolumetricWeight: $("#txtCargoVolumetricWeight").val() == "" ? 0 : $("#txtCargoVolumetricWeight").val()
        , pNumberOfPackages: $("#txtCargoNumberOfPackages").val() == "" ? 0 : $("#txtCargoNumberOfPackages").val()
        , pPackageTypeID: $("#slCargoPackageTypes").val() == "" ? 0 : $("#slCargoPackageTypes").val()
        , pPlacedOnOperationContainersAndPackagesID: $("#slCargoPlacedOnContainer").val() == "" ? 0 : $("#slCargoPlacedOnContainer").val()
        , pMarksAndNumbers: $("#divCargoMarksAndNumbers").val().trim() == "" ? 0 : $("#divCargoMarksAndNumbers").val().trim().toUpperCase()
        , pDescription: $("#divCargoGoodsDescription").val().trim() == "" ? 0 : $("#divCargoGoodsDescription").val().trim().toUpperCase()
    };
    CallGETFunctionWithParameters("/api/OperationContainersAndPackages/CargoProperties_Save"
        , pParametersWithValues
        , function (pData) {
            var _MessageReturned = pData[0];
            if (_MessageReturned == "") {
                swal("Success", "Saved successfully");
                var pOperationMasterOrDirect = JSON.parse(pData[2]);
                jQuery("#CargoPropertiesModal").modal("hide");
                //if (parseFloat($("#txtCargoChargeableWeight").val()) != 0 && $("#txtCargoChargeableWeight").val() != "")
                //    $("#lblChargeableWeight").html(": " + parseFloat($("#txtCargoChargeableWeight").val()).toFixed(2));
                //else
                //    OperationContainersAndPackages_CalculateSummary();
                OperationContainersAndPackages_FillLabels(pOperationMasterOrDirect);
            }
            else
                swal("Sorry", _MessageReturned);
            FadePageCover(false);
        }
        , null);
}
function CargoProperties_CalculateVGM() {
    debugger;
    var pTareWeight = isNaN(parseFloat($("#txtCargoTareWeight").val())) ? 0 : parseFloat($("#txtCargoTareWeight").val());
    var pGrossWeight = isNaN(parseFloat($("#txtCargoGrossWeight").val())) ? 0 : parseFloat($("#txtCargoGrossWeight").val());
    $("#txtCargoVGM").val(pTareWeight + pGrossWeight);
}
function OperationContainersAndPackages_CalculateVGM(pTareWeightControl, pGrossWeightControl, pVGMControl) {
    debugger;
    var pTareWeight = isNaN(parseFloat($("#" + pTareWeightControl).val())) ? 0 : parseFloat($("#" + pTareWeightControl).val());
    var pGrossWeight = isNaN(parseFloat($("#" + pGrossWeightControl).val())) ? 0 : parseFloat($("#" + pGrossWeightControl).val());
    $("#" + pVGMControl).val(pTareWeight + pGrossWeight);
}
function OperationContainersAndPackages_FillLabels(pOperationMasterOrDirect) {
    debugger;
    $("#lblTotalGrossWeight").html(": " + pOperationMasterOrDirect.GrossWeightSum);
    $("#lblTotalVolume").html(": " + pOperationMasterOrDirect.VolumeSum);
    $("#lblChargeableWeight").html(": " + pOperationMasterOrDirect.ChargeableWeightSum);
    $("#lblTotalNumberOfPackages").html(": " + pOperationMasterOrDirect.NumberOfPackages);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////ContainerPackages Fns////////////////////////////////////////////////////////////



function Operations_FillPrintDocsOutModal(pOperationID) {
    debugger;
    $("#slDocsOutOperationsFromSearch").html("");
    FadePageCover(true);
    var tr = $("#tblOperations tbody tr[id=" + pOperationID + "]");
    if (tr.find("td.DirectionType").text() == constImportDirectionType)
        $("#cbIsImport").prop("checked", true);
    else if (tr.find("td.DirectionType").text() == constExportDirectionType)
        $("#cbIsExport").prop("checked", true);
    else if (tr.find("td.DirectionType").text() == constDomesticDirectionType)
        $("#cbIsDomestic").prop("checked", true);

    if (pDefaults.UnEditableCompanyName == "UNF" && glbCallingControl == 'RoutingOrders')
    $("#slAgentsForBLDocuments").attr("data-required", true);
    if (tr.find("td.TransportType").text() == OceanTransportType)
        $("#cbIsOcean").prop("checked", true);
    else if (tr.find("td.TransportType").text() == AirTransportType)
        $("#cbIsAir").prop("checked", true);
    else if (tr.find("td.TransportType").text() == InlandTransportType)
        $("#cbIsInland").prop("checked", true);
    jQuery("#SelectOperationAndDocumentModal").modal("show");
    var pParametersWithValues = {
        pOperationIDToPrintDocsOut: pOperationID
    };
    $("#hOperationID").val(pOperationID);
    DocsOut_LoadAll(pOperationID, "slDocsOutTypes");
    GetListWithOpCodeAndHouseNoAndClientEmailAttr(pOperationID, "/api/Operations/LoadWithParameters", null, "slDocsOutOperationsFromSearch"
        , { pPageNumber: 1, pPageSize: 99999, pWhereClause: " WHERE ID = " + pOperationID + " OR MasterOperationID = " + pOperationID, pOrderBy: "HouseNumber" }
        , function () {

            if (pDefaults.UnEditableCompanyName == "UNF" && glbCallingControl == "ShippingOrders") {
                $("#slDocsOutTypes").val("310");

            }
            FadePageCover(false);
        });
}


function Shipments_FillHouseControls(pID) {
    debugger;

    if (pDefaults.UnEditableCompanyName == "UNF")
        $('#btnEditPR').removeClass('hide');

    $("#txtShipmentHouseNumber").attr("data-required", false);

    FadePageCover(true);
    $("#tblShipmentPackage tbody").html("");
    ClearAll("#ShipmentModal");
    jQuery("#ShipmentModal").modal("show");

    var pParametersWithValues = { pHouseID: pID };

    CallGETFunctionWithParameters("/api/Operations/FillHouseControls", pParametersWithValues
        , function (pData) {
            if (pData[13] != "") {
                swal("Sorry", "Error in getting details");
                FadePageCover(false);
                return;
            }
            var pShipmentHeader = JSON.parse(pData[0]);
            if (pShipmentHeader.MasterOperationID > 0) {
                DisableEditingInPR = true;
            } else {
                DisableEditingInPR = false;
            }
            var pUsers = pData[1];
            var pCountryList = pData[2];
            var pPickupCityList = pData[3];
            var pFinalDestination = pData[4];
            var pIncotermsList = pData[5];
            var pMoveTypesList = pData[6];
            var pNotifyID = pData[7];
            var pMainRoute = JSON.parse(pData[8]);
            var pNoAccessFreightTypesList = pData[9];
            var pVessels = pData[10];
            var pIsOperationClosed = pData[11];
            var pShipmentPackages = pData[12];
            var pStatus = pData[14];

            var consignee = pData[15];
            var shipper = pData[16];
            var notify = pData[17];
            var consignee2 = pData[18];
            var forwarder = pData[19];
            var PortsUNF = pData[20];
    
            debugger;


            var _Salesmentemp = JSON.parse(pUsers);
            var pSalesmen = jQuery.grep(_Salesmentemp, function (_Salesmentemp) {
                return _Salesmentemp.IsSalesman == true;
            });
            FillListFromObject(null, 2, "<--Select-->", "slOperationSalesmanForBLDocuments", JSON.stringify(pSalesmen), function () {
                $("#slOperationSalesmanForBLDocuments").val(pShipmentHeader.SalesmanID);
            });


           
                ApplySelectListSearch();




            pIsOperationDisabled = pIsOperationClosed == true || pShipmentHeader.OperationStageID == CancelledQuoteAndOperStageID ? 1 : 0;
            if (pIsOperationDisabled == false) {
                $(".classSetCargoProperties").removeClass("hide");
                $("#divShipmentPackageBtns").removeClass("hide");
            } else {
                //$(".classSetCargoProperties").addClass("hide");
                $("#divShipmentPackageBtns").addClass("hide");
            }
            //if (pDefaults.UnEditableCompanyName == "UNF") {
            //    $("#slDeliveryCity").parent().addClass("hide");
            //}

            if (pShipmentHeader.ShipmentType == constFCLShipmentType)
                pIsFCL = true;
            else if (pShipmentHeader.ShipmentType == constFTLShipmentType)
                pIsFTL = true;

            $("#hShipmentID").val(pID);
            $("#hOperationID").val(pShipmentHeader.MasterOperationID);

            $("#slTransportType").val(pShipmentHeader.TransportType);
            $("#slShipmentType").val(pShipmentHeader.ShipmentType);
          
           

            if (pShipmentHeader.DirectionType == constImportDirectionType) {
                $("#slConsigneesForBLDocuments").attr("data-required", true);
                $("#slShippersForBLDocuments").attr("data-required", false);
            }
            else { //Export or Domestic
                $("#slShippersForBLDocuments").attr("data-required", true);
                $("#slConsigneesForBLDocuments").attr("data-required", false);
            }
            if (pDefaults.UnEditableCompanyName == "UNF") {
                $("#slForwarderBLDocuments").parent().removeClass("hide");
                
            }
            /*
            if ($('#slConsigneesForBLDocuments option').length < 1) {
                $("#slConsigneesForBLDocuments").html($("#hReadySlCustomers").html());
            }
            $("#slConsigneesForBLDocuments").val(pShipmentHeader.ConsigneeID == 0 ? "" : pShipmentHeader.ConsigneeID);

            if ($('#slConsignees2 option').length < 1) {
                $("#slConsignees2").html($("#hReadySlCustomers").html());
            }
            $("#slConsignees2").val(pShipmentHeader.ConsigneeID2 == 0 ? "" : pShipmentHeader.ConsigneeID2);

            if ($('#slShippersForBLDocuments option').length < 1) {
                $("#slShippersForBLDocuments").html($("#hReadySlCustomers").html());
            }
            $("#slShippersForBLDocuments").val(pShipmentHeader.ShipperID == 0 ? "" : pShipmentHeader.ShipperID);

            if ($('#slNotifyForBLDocuments option').length < 1) {
                $("#slNotifyForBLDocuments").html($("#hReadySlCustomers").html());
            }
            $("#slNotifyForBLDocuments").val(pNotifyID == 0 ? "" : pNotifyID);
            */
            InitializeShipmentCustomersSelectSearch_LCL();
            if ($('#slShippersForBLDocuments').find("option[value='" + pShipmentHeader.ShipperID + "']").length) {
                $('#slShippersForBLDocuments').val(pShipmentHeader.ShipperID).trigger('change');
            } else {
                let newOption = new Option(shipper, pShipmentHeader.ShipperID, true, true);
                $('#slShippersForBLDocuments').append(newOption).trigger('change');
            }

            if ($('#slConsigneesForBLDocuments').find("option[value='" + pShipmentHeader.ConsigneeID + "']").length) {
                $('#slConsigneesForBLDocuments').val(pShipmentHeader.ConsigneeID).trigger('change');
            } else {
                let newOption = new Option(consignee, pShipmentHeader.ConsigneeID, true, true);
                $('#slConsigneesForBLDocuments').append(newOption).trigger('change');
            }

            if ($('#slConsignees2').find("option[value='" + pShipmentHeader.ConsigneeID2 + "']").length) {
                $('#slConsignees2').val(pShipmentHeader.ConsigneeID2).trigger('change');
            } else {
                let newOption = new Option(consignee2, pShipmentHeader.ConsigneeID2, true, true);
                $('#slConsignees2').append(newOption).trigger('change');
            }

            if ($('#slForwarderBLDocuments').find("option[value='" + pShipmentHeader.ForwarderId + "']").length) {
                $('#slForwarderBLDocuments').val(pShipmentHeader.ForwarderId).trigger('change');
            } else {
                let newOption = new Option(forwarder, pShipmentHeader.ForwarderId, true, true);
                $('#slForwarderBLDocuments').append(newOption).trigger('change');
            }

            if ($('#slNotifyForBLDocuments').find("option[value='" + pNotifyID + "']").length) {
                $('#slNotifyForBLDocuments').val(pNotifyID).trigger('change');
            } else {
                let newOption = new Option(notify, pNotifyID, true, true);
                $('#slNotifyForBLDocuments').append(newOption).trigger('change');
            }

            if ($('#slAgentsForBLDocuments option').length < 1) {
                $("#slAgentsForBLDocuments").html($("#hReadySlAgents").html());
                $("#slAgentsForBLDocuments").css({ "width": "100%" }).select2();

            }
            $('#slPOLID_TransportID').val(pShipmentHeader.ACIDDetails).trigger('change');
          
            $("#slPOLID_TransportID").attr("data-required", false);

            $("#slAgentsForBLDocuments").val(pShipmentHeader.AgentID == 0 ? "" : pShipmentHeader.AgentID).trigger("change");

            FillListFromObject(pShipmentHeader.DeliveryCityID, 4, "<--Select-->", "slDeliveryCity", pFinalDestination, null);
            FillListFromObject(pShipmentHeader.PickupCityID, 4, "<--Select-->", "slPickupCity", pPickupCityList, null);
    

            FillListFromObject(pShipmentHeader.OperationStageID, 2, "Select Status", "slHouseStatus", pStatus, null);
            //FillListFromObject(pShipmentHeader.POD, 4, "<--Select-->", "slPODForBLDocuments", pFinalDestination, null);
            //FillListFromObject(pShipmentHeader.POL, 4, "<--Select-->", "slPOLForBLDocuments", pPickupCityList, null);

            FillListFromObject(pShipmentHeader.POLCountryID, 2, "<--Select-->", "slPickupCountry", pCountryList, function () {
                $("#slDeliveryCountry").html($("#slPickupCountry").html());
                $("#slDeliveryCountry").val(pShipmentHeader.PODCountryID);
            });


            FillListFromObject(null, 2, "Select Incoterm", "slShipmentIncoterm", pIncotermsList, null);
            FillListFromObject(null, 2, "Select Service Scope", "slOperationMoveTypesForBLDocuments", pMoveTypesList, null);
            FillListFromObject(null, 2, "Select Freight Type", "slShipmentPOrC", pNoAccessFreightTypesList, null);
            if (pDefaults.UnEditableCompanyName == "UNF") {


                $("#txtShipmentACIDDetails").parent().addClass('hide');
            }

            if ($('#slOperationVesselID option').length < 1) {
                FillListFromObject(pShipmentHeader.VesselID, 2, "Select Vessel", "slOperationVesselID", pVessels, null);
            } else {
                $("#slOperationVesselID").val(pShipmentHeader.VesselID).trigger("change");
            }
            FillListFromObject(pShipmentHeader.OperationManID, 2, "<--Select-->", "slOperationOperationManID", pUsers, null);

            $("#slOperationBranchForBLDocuments").html($("#hReadySlBranches").html());
            $("#slOperationBranchForBLDocuments").val(pShipmentHeader.BranchID);
            $("#slOperationMoveTypesForBLDocuments").val(pShipmentHeader.MoveTypeID == 0 ? "" : pShipmentHeader.MoveTypeID);
            $("#slShipmentIncoterm").val(pShipmentHeader.IncotermID == 0 ? "" : pShipmentHeader.IncotermID);
            $("#slHouseStatus").val(pShipmentHeader.OperationStageID == 0 ? "" : pShipmentHeader.OperationStageID)

            $("#slShipmentPOrC").val(pShipmentHeader.POrC == 0 ? "" : pShipmentHeader.POrC);
            $("#txtShipmentDeliveryOrderNumber").val(pShipmentHeader.ID);
            //$("#txtShipmentDeliveryDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pMainRoute.DeliveryDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pMainRoute.DeliveryDate)));
            $("#txtShipmentDeliveryDate").val(!pMainRoute ||Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pMainRoute.DeliveryDate)) < 1? "": ConvertDateFormat(GetDateWithFormatMDY(pMainRoute.DeliveryDate)));

            $("#txtShipmentReleaseDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pShipmentHeader.ReleaseDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pShipmentHeader.ReleaseDate)));
            $("#txtOperationExpectedDepartureForBLDocuments").val(!pMainRoute ||Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pMainRoute.ExpectedDeparture)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pMainRoute.ExpectedDeparture)));
            $("#txtOperationExpectedArrivalForBLDocuments").val(!pMainRoute ||Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pMainRoute.ExpectedArrival)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pMainRoute.ExpectedArrival)));

            $("#txtShipmentBLDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pShipmentHeader.BLDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pShipmentHeader.BLDate)));
            $("#txtShipmentShippedOnBoardDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pShipmentHeader.ShippedOnBoardDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pShipmentHeader.ShippedOnBoardDate)));
            $("#txtShipmentFreightPayableAt").val(pShipmentHeader.FreightPayableAt == 0 ? "" : pShipmentHeader.FreightPayableAt);
            $("#txtShipmentACIDNumber").val(pShipmentHeader.ACIDNumber == 0 ? "" : pShipmentHeader.ACIDNumber);
            if(pDefaults.UnEditableCompanyName !='UNF')
                $("#txtShipmentACIDDetails").val(pShipmentHeader.ACIDDetails == 0 ? "" : pShipmentHeader.ACIDDetails);

            $("#txtShipmentBookingNumber").val(pShipmentHeader.BookingNumber == 0 ? "" : pShipmentHeader.BookingNumber);
            $("#txtShipmentNumberOfOriginalBills").val(pShipmentHeader.NumberOfOriginalBills == 0 ? "" : pShipmentHeader.NumberOfOriginalBills);


            ShipmentPackage_BindTableRows(JSON.parse(pShipmentPackages));

            $("#lblShownShipment").html(pShipmentHeader.HouseNumber == 0 ? "" : pShipmentHeader.HouseNumber);
            $("#txtShipmentHouseNumber").val(pShipmentHeader.HouseNumber == 0 ? "" : pShipmentHeader.HouseNumber);
            $("#txtShipmentCustomerReference").val(pShipmentHeader.CustomerReference == 0 ? "" : pShipmentHeader.CustomerReference);
            $("#txtShipmentSupplierReference").val(pShipmentHeader.SupplierReference == 0 ? "" : pShipmentHeader.SupplierReference);
            $("#txtShipmentPONumber").val(pShipmentHeader.PONumber == 0 ? "" : pShipmentHeader.PONumber);
            $("#divNotesForBLDocuments").val(pShipmentHeader.Notes == 0 ? "" : pShipmentHeader.Notes);
            $("#txtOperationOpenDateForBLDocuments").val(ConvertDateFormat(GetDateWithFormatMDY(pShipmentHeader.OpenDate)));
            $("#txtOperationCloseDateForBLDocuments").val(ConvertDateFormat(GetDateWithFormatMDY(pShipmentHeader.CloseDate)));

            $("#cbIsDelivered").prop("checked", pShipmentHeader.IsDelivered);
            $("#cbIsReceivedFromShipper").prop("checked", pShipmentHeader.IsReceivedFromShipper);
            if (pDefaults.UnEditableCompanyName == "ELI") {
                cbIsReceivedFromShipperChanged();
            }

            $("#txtOperationUNNumber").val(pShipmentHeader.UNNumber == 0 ? "" : pShipmentHeader.UNNumber);
            $("#txtOperationIMOClass").val(pShipmentHeader.IMOClass == 0 ? "" : pShipmentHeader.IMOClass);
            $("#txtHouseContainerNumber").val(pShipmentHeader.HouseContainerNumber == 0 ? "" : pShipmentHeader.HouseContainerNumber);
            if (pDefaults.UnEditableCompanyName == "UNF" ) {
                $("#lblShownShipment").text(pShipmentHeader.Code);

            if ( glbCallingControl == 'RoutingOrders') {
                $("#slShipmentPOrC").val(1);

                FillListFromObject(pShipmentHeader.ETAPOLAlarmStatus, 4, "<--Select-->", "slPickupCountryNEW", pCountryList, function () {
                    $("#slPickupCityNEW").parent().removeClass('hide');
                    $("#slPickupCountryNEW").parent().removeClass('hide');
                });
                FillListFromObject(pShipmentHeader.ATAPOLAlarmStatus, 4, "<--Select-->", "slPickupCityNEW", PortsUNF, null);

       

                $("#slAgentsForBLDocuments").attr("data-required", true);
                $("#slOperationSalesmanForBLDocuments").attr("data-required", true);
                $("#slOperationOperationManID").attr("data-required", true);
                

                $("#slShipmentPOrC").attr("disabled", "disabled");

            }
                }
            FadePageCover(false);
        }
        , null);



    //parameter in the next 3 lines are 1:Quotations call, 2:Operations call
    $("#btn-NewAddShipperForBLDocuments").attr("onclick", "Customers_ClearAllControls(1);");
    $("#btn-NewAddConsigneeForBLDocuments").attr("onclick", "Customers_ClearAllControls(1);");
    $("#btn-NewAddNotifyForBLDocuments").attr("onclick", "Customers_ClearAllControls(1);");
    $("#btn-NewAddAgentForBLDocuments").attr("onclick", "Agents_ClearAllControls(1);");

    $("#btn-EditShipperForBLDocuments").attr("onclick", "Customers_FillControlsFromOperations($('#slShippersForBLDocuments option:selected').val(), null, 1);");
    $("#btn-EditConsigneeForBLDocuments").attr("onclick", "Customers_FillControlsFromOperations($('#slConsigneesForBLDocuments option:selected').val(), null, 1);");
    $("#btn-EditNotifyForBLDocuments").attr("onclick", "Customers_FillControlsFromOperations($('#slNotifyForBLDocuments option:selected').val(), null, 1);");
    $("#btn-EditAgentForBLDocuments").attr("onclick", "Agents_FillControlsFromOperations($('#slAgentsForBLDocuments option:selected').val(), null, 1);");

    $("#btnSaveShipment").attr("onclick", "Shipment_Update();");


    if (pDefaults.UnEditableCompanyName == "UNF")
    {
        //$("#txtOperationOpenDateForBLDocuments").removeAttr("disabled");


        if (glbCallingControl == 'RoutingOrders') {
        $("#slPickupCountry").parent().find('label').text('POL Country');
        $("#slPickupCity").parent().find('label').text('POL City');
        }

    }
}

function Shipments_ClearAllHouseControls() {
    debugger;
    if (pDefaults.UnEditableCompanyName == "UNF") {
        $('#btnEditPR').addClass('hide');
        $("#slHouseStatus").attr("data-required", true);

    }
    $(".classShowForUpdate").addClass("hide");
    $("#txtShipmentHouseNumber").attr("data-required", false);
    if (pDefaults.UnEditableCompanyName == "UNF" && glbCallingControl == 'RoutingOrders') {
        $("#txtShipmentACIDDetails").parent().addClass('hide');
       
        $("#slOperationOperationManID").val($("#hLoggedUserID").val());
        $("#slAgentsForBLDocuments").attr("data-required", true);
        $("#slOperationSalesmanForBLDocuments").attr("data-required", true);
        $("#slOperationOperationManID").attr("data-required", true);
        if (pDefaults.UnEditableCompanyName == "UNF" && glbCallingControl == 'RoutingOrders') {
            $("#slShipmentPOrC").val(1);
            $("#slShipmentPOrC").attr("disabled", "disabled");
        }

      
      
        ApplySelectListSearch();

    }

    FadePageCover(true);
    $("#tblShipmentPackage tbody").html("");
    ClearAll("#ShipmentModal");
 
    jQuery("#ShipmentModal").modal("show");
    $("#lblShownShipment").html("");
    $("#txtOperationOpenDateForBLDocuments").val(getTodaysDateInddMMyyyyFormat());
    $("#txtOperationCloseDateForBLDocuments").val('10/10/2050');
    //if (pDefaults.UnEditableCompanyName == "KDM")
    //    $("#txtShipmentHouseNumber").val($("#txtOperationReleaseNumber").val());
    //else if (pDefaults.UnEditableCompanyName == "VER" || pDefaults.UnEditableCompanyName == "ELI") //mostaa
    //    $("#txtShipmentHouseNumber").val($("#hOperationCode").val());
    $("#txtShipmentHouseNumber").removeAttr("disabled");
    $("#slShipmentPOrC").val(3);

    
    var pParametersWithValues = { pHouseID: 0 };

    CallGETFunctionWithParameters("/api/Operations/FillHouseControls", pParametersWithValues
        , function (pData) {
            var pPickupCityList = pData[3];
            var pCountryList = pData[2];
            var pVessels = pData[10];
            var pIncotermsList = pData[5];
            var pMoveTypesList = pData[6];
            var pNoAccessFreightTypesList = pData[9];
            var pUsers = pData[1];
            var pFinalDestination = pData[4];
            var pStatus = pData[14];

            var _Salesmentemp = JSON.parse(pUsers);
            var pSalesmen = jQuery.grep(_Salesmentemp, function (_Salesmentemp) {
                return _Salesmentemp.IsSalesman == true;
            });
            FillListFromObject(null, 2, "<--Select-->", "slOperationSalesmanForBLDocuments", JSON.stringify(pSalesmen), function () {
                $("#slOperationSalesmanForBLDocuments").val($("#hLoggedUserID").val());
            });


            /*$("#slConsigneesForBLDocuments").html($("#hReadySlCustomers").html());
            $("#slConsignees2").html($("#hReadySlCustomers").html());
            $("#slShippersForBLDocuments").html($("#hReadySlCustomers").html());
            $("#slNotifyForBLDocuments").html($("#hReadySlCustomers").html());*/
            $("#slAgentsForBLDocuments").html($("#hReadySlAgents").html());
            InitializeShipmentCustomersSelectSearch_LCL();
            $('#slConsigneesForBLDocuments').val(0).trigger('change');
            $('#slPOLID_TransportID').val(0).trigger('change');
            $('#slConsignees2').val(0).trigger('change');
            $('#slShippersForBLDocuments').val(0).trigger('change');
            $('#slNotifyForBLDocuments').val(0).trigger('change');
            $('#slForwarderBLDocuments').val(0).trigger('change');


            FillListFromObject(null, 4, "<--Select-->", "slDeliveryCity", pFinalDestination, null);
            FillListFromObject(null, 4, "<--Select-->", "slPickupCity", pPickupCityList, null);


            FillListFromObject($("#hPOLCountryID").val(), 2, "<--Select-->", "slPickupCountry", pCountryList, function () {
                $("#slDeliveryCountry").html($("#slPickupCountry").html());
                //$("#slDeliveryCountry").val($("#hPODCountryID").val());
                if (glbCallingControl == "ShippingOrders") {
                    $("#slPickupCountry").val(1176).trigger('change'); // Egypt
                    //$("#slPickupCountry").attr("disabled", "disabled");
                } else if (glbCallingControl == "RoutingOrders") {
                    $("#slDeliveryCountry").val(1176).trigger('change'); // Egypt
                    /*         $("#slDeliveryCountry").attr("disabled", "disabled");*/
                    if (pDefaults.UnEditableCompanyName == 'UNF')
                        $("#slPickupCountryNEW").parent().removeClass('hide');
                        $("#slPickupCountryNEW").html($("#slPickupCountry").html());
                        FillListFromObject(null, 4, "<--Select-->", "slPickupCityNEW", pPickupCityList, null);
                        $("#slPickupCityNEW").parent().removeClass('hide');

                }
            });

            FillListFromObject(null, 2, "<--Select-->", "slOperationVesselID", pVessels, null);
            if (pDefaults.UnEditableCompanyName == "UNF" && glbCallingControl == 'RoutingOrders') {
                FillListFromObject($("#hLoggedUserID").val(), 2, "<--Select-->", "slOperationOperationManID", pUsers, null);

            }else
            FillListFromObject(null, 2, "<--Select-->", "slOperationOperationManID", pUsers, null);

            FillListFromObject(null, 2, "Select Incoterm", "slShipmentIncoterm", pIncotermsList, null);
            FillListFromObject(null, 2, "Select Service Scope", "slOperationMoveTypesForBLDocuments", pMoveTypesList, null);
            if (pDefaults.UnEditableCompanyName == "UNF" && glbCallingControl == 'RoutingOrders') {
            $("#slOperationMoveTypesForBLDocuments").val('30');

            FillListFromObject(1, 2, "Select Freight Type", "slShipmentPOrC", pNoAccessFreightTypesList, null);
            } else
                FillListFromObject(null, 2, "Select Freight Type", "slShipmentPOrC", pNoAccessFreightTypesList, null);

            FillListFromObject(null, 2, "Select Status", "slHouseStatus", pStatus, null); 
            if (pDefaults.UnEditableCompanyName == "UNF") 
                $("#slHouseStatus").val(60);

            FadePageCover(false);
        }
        , null);




    $("#slOperationBranchForBLDocuments").html($("#hReadySlBranches").html());


    $("#slShippersForBLDocuments").attr("data-required", true);
    $("#slConsigneesForBLDocuments").attr("data-required", true);

    if (pDefaults.UnEditableCompanyName == "UNF") {
        $("#txtHouseContainerNumber").attr("data-required", false);

        if (glbCallingControl == "RoutingOrders") {
            $("#slShippersForBLDocuments").attr("data-required", false);
            $("#slConsigneesForBLDocuments").attr("data-required", true);
            
            $("#slAgentsForBLDocuments").attr("data-required", true);
            $("#txtShipmentACIDDetails").parent().addClass('hide');

            $("#slOperationOperationManID").val($("#hLoggedUserID").val());
            $("#slAgentsForBLDocuments").attr("data-required", true);
            $("#slOperationSalesmanForBLDocuments").attr("data-required", true);
            $("#slOperationOperationManID").attr("data-required", true);
        } else {
            $("#slShippersForBLDocuments").attr("data-required", true);
            $("#slConsigneesForBLDocuments").attr("data-required", false);
        $("#slOperationOperationManID").attr("data-required", true);
        }


    }
  
        ApplySelectListSearch();
    

    //parameter in the next 3 lines are 1:Quotations call, 2:Operations call
    $("#btn-NewAddShipperForBLDocuments").attr("onclick", "Customers_ClearAllControls(1);");
    $("#btn-NewAddConsigneeForBLDocuments").attr("onclick", "Customers_ClearAllControls(1);");
    $("#btn-NewAddNotify").attr("onclick", "Customers_ClearAllControls(1);");
    $("#btn-NewAddAgentForBLDocuments").attr("onclick", "Agents_ClearAllControls(1);");

    $("#btn-EditShipperForBLDocuments").attr("onclick", "Customers_FillControlsFromOperations($('#slShippersForBLDocuments option:selected').val(), null, 1);");
    $("#btn-EditConsigneeForBLDocuments").attr("onclick", "Customers_FillControlsFromOperations($('#slConsigneesForBLDocuments option:selected').val(), null, 1);");
    $("#btn-EditNotify").attr("onclick", "Customers_FillControlsFromOperations($('#slNotifyForBLDocuments option:selected').val(), null, 1);");
    $("#btn-EditAgentForBLDocuments").attr("onclick", "Agents_FillControlsFromOperations($('#slAgentsForBLDocuments option:selected').val(), null, 1);");

    $("#btnSaveShipment").attr("onclick", "Operations_InsertFromBLDocuments(true,true, function(pData) { if (pData[3] != '') swal('Sorry', pData[3]); else { $('#hShipmentID').val(pData[1]); $('#txtShipmentHouseNumber').val(pData[2]); Operations_LoadingWithPaging(); Shipments_ClearAllHouseControls(); swal('Success', 'Saved Successfully.'); } });");
    if (pDefaults.UnEditableCompanyName == 'UNF') {
    $("#slOperationOperationManID").val($("#hLoggedUserID").val());
        $("#slShipmentPOrC").val(1);

        $("#slShipmentType").val('2');
        if (glbCallingControl == 'RoutingOrders') {
        $("#slPickupCountry").parent().find('label').text('POL Country'); 
        $("#slPickupCity").parent().find('label').text('POL City');
        }
        $("#slPOLID_TransportID").html($("#hReadySlPorts").html());
        $("#slPOLID_TransportID").attr("data-required", false);
        //$("#txtOperationOpenDateForBLDocuments").removeAttr("disabled");

    }
}

function cbGetAllContainerNumberEmptyChanged() {
    if ($("#cbGetAllContainerNumberEmpty").prop("checked")) {
        $("#txtFilterHouseContainerNumber").val("");
        $("#txtFilterHouseContainerNumber").attr("disabled", "true");
    } else {
        $("#txtFilterHouseContainerNumber").removeAttr("disabled");
    }
}
function cbGetAllMasterOperationEmptyChanged() {
    if ($("#cbGetAllMasterOperationEmpty").prop("checked")) {
        $("#txtFilterOperationCode").val("");
        $("#txtFilterOperationCode").attr("disabled", "true");
    } else {
        $("#txtFilterOperationCode").removeAttr("disabled");
    }
}
/******************Payables**************************/





function Payables_BindTableRows(pPayables) {
    ClearAllTableRows("tblPayables");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pPayables, function (i, item) {

        AppendRowtoTable("tblPayables",
            //("<tr ID='" + item.ID + "' " + (OEPay && $("#hIsOperationDisabled").val() == false ? ("ondblclick='Payables_EditByDblClick(" + item.ID + ");'") : "") + ">"
            ("<tr ID='" + item.ID + "' " + (OEPay && item.AccNoteID == 0 && item.IsApproved == 0 && !DisableEditingInPR ? ("ondblclick='Payables_EditByDblClick(" + item.ID + ");'") : "") + (item.IsApproved ? " class='text-primary' " : "") + ">"
                + "<td class='PayableID'> <input " + (item.IsApproved == 0 && item.AccNoteID == 0 && item.GeneratingQRID == 0 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "'></td>"
                //+ "<td class='Payable' val='" + item.ChargeTypeID + "'>" + item.ChargeTypeCode + " (" + item.ChargeTypeName + ")" + "</td>"
                + "<td class='Payable' val='" + item.ChargeTypeID + "'>" + (pDefaults.UnEditableCompanyName == "GBL" ? (item.ChargeTypeName + " (" + item.ChargeTypeCode + ")") : item.ChargeTypeName) + "</td>"
                + "<td class='PayablePOrC hide' val='" + item.POrC + "'>" + (item.POrC == 0 ? "" : item.POrCCode) + "</td>"
                //the next line its PartnerSupplierID comes from table OperationPartners
                + "<td class='PayableSupplier hide'[' val='" + item.SupplierOperationPartnerID + "'>" + (item.PartnerSupplierID == 0 ? "" : item.PartnerSupplierName) + "</td>"
                + "<td class='SupplierSiteID hide'>" + item.SupplierSiteID + "</td>"
                //+ ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') ? ("<td class='PayableUOM' val='" + item.ContainerTypeID + "'>" + (item.ContainerTypeCode == 0 ? "" : item.ContainerTypeCode) + "</td>") : "")
                //+ ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='PayableUOM' val='" + item.PackageTypeID + "'>" + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + "</td>") : "")
                + "<td class='PayableUOM hide' val='" + item.MeasurementID + "'>" + (item.MeasurementID == 0 ? "" : item.MeasurementCode) + "</td>"
                + "<td class='PayableQuantity'>" + item.Quantity + "</td>"
                + "<td class='PayableCostPrice'>" + item.CostPrice.toFixed(4) + "</td>"
                + "<td class='PayableOldCostPrice hide'>" + (item.OldCostPrice > 0 && item.OldCostPrice != item.CostPrice ? (item.OldCostPrice).toFixed(4) : "") + "</td>"
                + "<td class='PayableAmountWithoutVAT hide'>" + (item.AmountWithoutVAT == 0 ? "" : item.AmountWithoutVAT) + "</td>"
                + "<td class='PayableTaxTypeID hide' val=" + item.TaxTypeID + ">" + (item.TaxTypeID == 0 ? "" : item.TaxTypeName) + "</td>"
                + "<td class='PayableTaxPercentage hide'>" + item.TaxPercentage + "</td>"
                + "<td class='PayableTaxAmount hide'>" + item.TaxAmount + "</td>"
                + "<td class='PayableDiscountTypeID hide' val=" + item.DiscountTypeID + ">" + (item.DiscountTypeID == 0 ? "" : item.DiscountTypeName) + "</td>"
                + "<td class='PayableDiscountPercentage hide'>" + item.DiscountPercentage + "</td>"
                + "<td class='PayableDiscountAmount hide'>" + item.DiscountAmount + "</td>"

                + "<td class='PayableCostAmount'>" + item.CostAmount.toFixed(4) + "</td>"
                + "<td class='PayableInitialSalePrice hide'>" + (item.InitialSalePrice == 0 ? "" : item.InitialSalePrice.toFixed(2)) + "</td>"
                + "<td class='PayableSupplierInvoiceNo hide'>" + (item.SupplierInvoiceNo == 0 ? "" : item.SupplierInvoiceNo) + "</td>"
                + "<td class='PayableSupplierReceiptNo hide'>" + (item.SupplierReceiptNo == 0 ? "" : item.SupplierReceiptNo) + "</td>"
                + "<td class='PayableEntryDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.EntryDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.EntryDate)) : "") + "</td>"
                + "<td class='PayableBillID hide'>" + item.BillID + "</td>"

                + "<td class='PayableIssueDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.IssueDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.IssueDate)) : "") + "</td>"
                + "<td class='PayableOperationContainersAndPackagesID hide'>" + item.OperationContainersAndPackagesID + "</td>"
                + "<td class='PayableTrailerID hide'>" + item.TrailerID + "</td>"

                + "<td class='PayableExchangeRate'>" + item.ExchangeRate.toFixed(4) + "</td>"
                + "<td class='PayableCurrency' val='" + item.CurrencyID + "'>" + (item.CurrencyID == 0 ? "" : item.CurrencyCode) + "</td>"
                + "<td class='PayableAccNote hide' val='" + item.AccNoteID + "'>" + (item.AccNoteID == 0 ? "" : item.Code) + "</td>"
                + "<td class='PayableOperation hide' val='" + item.OperationID + "'>" + (item.OperationID == 0 ? "" : item.OperationCode) + "</td>"
                + "<td class='PayableNotes hide'>" + item.Notes + "</td>"
                + "<td class='PayableCreatorName hide'>" + item.CreatorName + "</td>"
                //+ "<td class='PayableCreationDate hide'>" + item.CreationDate + "</td>"
                + "<td class='PayableCreationDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
                + " <i class='fa fa-calendar'></i>"
                //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + "</small>"
                + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.CreationDate)) + "</small>"
                + "</span>"
                + "</td>"
                + "<td class='PayableModificatorName hide'>" + item.ModificatorName + "</td>"
                //+ "<td class='PayableModificationDate hide'>" + item.ModificationDate + "</td>"
                + "<td class='PayableModificationDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
                + " <i class='fa fa-calendar'></i>"
                //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.ModificationDate)) + "</small>"
                + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.ModificationDate)) + "</small>"
                + "</span>"
                + "</td>"
                + "<td class='hide'><a href='#EditPayableModal' data-toggle='modal' onclick='Payables_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));

        if (item.OldCostPrice > 0 && item.OldCostPrice != item.CostPrice)
            $('#tblPayables tr[id=' + item.ID + '] td').css({ 'background-color': 'lightgreen' });
    });

    if (pDefaults.UnEditableCompanyName == "MED")
        $('#tblPayables th.PayableOldCostPrice, #tblPayables td.PayableOldCostPrice').removeClass('hide');


    ////ApplyPermissions();
    //if (OAPay && $("#hIsOperationDisabled").val() == false) { $("#btn-AddPayables").removeClass("hide"); $("#btn-GenerateDefaultPayables").removeClass("hide"); $("#btn-GeneratePayablesFromQuotation").removeClass("hide"); }
    //else { $("#btn-AddPayables").addClass("hide"); $("#btn-GenerateDefaultPayables").addClass("hide"); $("#btn-GeneratePayablesFromQuotation").addClass("hide"); }
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    //if (OEPay && $("#hIsOperationDisabled").val() == false) $("#btn-MultiRowEditPayables").removeClass("hide"); else $("#btn-MultiRowEditPayables").addClass("hide");
    BindAllCheckboxonTable("tblPayables", "PayableID", "cb-CheckAll-Payables");
    CheckAllCheckbox("HeaderDeletePayableID");
    //HighlightText("#tblPayables>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    //Payables_CalculateSubtotals();
    //PayablesAndReceivables_CalculateSummary();
}
function PayableSuppliers_GetList(pID, pSlName, pCallback) {
    var pWhereClause = " WHERE OperationID = " + $("#hShipmentID").val();
    pWhereClause += " AND PartnerID IS NOT NULL ";
    //pWhereClause += " AND PartnerTypeID != " + constCustomerPartnerTypeID;
    pWhereClause += " ORDER BY PartnerTypeName ";
    //parameters: ID, strFnName, First Row in select list, select list name, whereClause, callback
    //GetListWithCodeAndNameAndWhereClause(pID, "/api/OperationPartners/LoadAll", "Select Supplier", pSlName, pWhereClause);
    GetListOperationPartnersWithPartnerTypeIDAndPartnerIDAttrAndWhereClause(pID, "/api/OperationPartners/LoadAll", "Select Supplier", pSlName, pWhereClause, pCallback);
}
function PayableUOM_GetList(pID, pSlName) {
    var pWhereClause = "";
    //pWhereClause += " Where OperationID = " + $("#hOperationID").val();
    //if ($("#hShipmentType").val() == constFCLShipmentType)
    //    pWhereClause += " WHERE IsUsedInFCl = 1 ";
    //else
    //    if ($("#hShipmentType").val() == constLCLShipmentType)
    //        pWhereClause += " WHERE IsUsedInLCL = 1 ";
    //    else
    //        if ($("#hShipmentType").val() == constFTLShipmentType)
    //            pWhereClause += " WHERE IsUsedInFTL = 1 ";
    //        else
    //            if ($("#hShipmentType").val() == constLTLShipmentType)
    //                pWhereClause += " WHERE IsUsedInLTL = 1 ";
    //            else
    //                if ($("#hShipmentType").val() == constConsolidationShipmentType)
    //                    pWhereClause += " WHERE IsUsedInConsolidation = 1 ";
    //                else
    //                    if ($("#hShipmentType").val() == "0")
    //                        pWhereClause += " WHERE IsUsedInAir = 1 ";
    //pWhereClause += " OR ID = " + pID; //for the case that settings changed for a UOM at the time it is taken 
    pWhereClause += " ORDER BY Code ";
    //GetListWithCodeAndNameAndWhereClause(pID, "/api/NoAccessMeasurements/LoadAll", "Select UOM", pSlName, pWhereClause);
    GetListWithNameAndWhereClause(pID, "/api/NoAccessMeasurements/LoadAll", "Select UOM", pSlName, pWhereClause);
}
function Payables_Update(pSaveandAddNew) {
    debugger;
    if (
        (!isValidDate($("#txtPayableEntryDate").val().trim(), 1) && $("#txtPayableEntryDate").val().trim() != "")
        || (!isValidDate($("#txtPayableIssueDate").val().trim(), 1) && $("#txtPayableIssueDate").val().trim() != "")
    )
        swal(strSorry, strCheckDates);
    //else if (pDefaults.UnEditableCompanyName == "GBL" && $("#slSites").val() == '')
    //    swal("Sorry", "Please, select site.");
    else if ($("#txtPayableExchangeRate").val() == "" || parseFloat($("#txtPayableExchangeRate").val()) == 0
        || (parseInt($("#txtPayableExchangeRate").val()) == 1 && pDefaults.CurrencyID != ($("#slPayableCurrency").val())))
        swal("Sorry", "Please, check exchange rate.");
    else {
        InsertUpdateFunction("form", "/api/Payables/Update", {
            pSavedFrom: 0 //pSavedFrom=10 : saved from Operations
            ,
            pOperationContainersAndPackagesID: $("#slPayableTank").val() == "" ? 0 : $("#slPayableTank").val()
            ,
            pID: $("#hPayableID").val()
            //, pMeasurementID: $("#txtCalculationType").attr("MeasurementID")
            ,
            pOperationID: $("#hShipmentID").val()
            ,
            pChargeTypeID: $("#slPayableChargeType").val() == "" ? 0 : $("#slPayableChargeType").val() //$("#txtPayableType").attr("ChargeTypeID")
            ,
            pMeasurementID: $('#slPayableUOM option:selected').val() != ""
                ? $('#slPayableUOM option:selected').val()
                : 0
            //, pContainerTypeID: ((($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked')) && $('#slPayableUOM option:selected').val() != "")
            //    ? $('#slPayableUOM option:selected').val()
            //    : 0)
            ,
            pContainerTypeID: 0
            //, pPackageTypeID: ((($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked')) && $('#slPayableUOM option:selected').val() != "")
            //    ? $('#slPayableUOM option:selected').val()
            //    : 0)
            ,
            pPOrC: ($('#slPayablePOrC option:selected').val() == "" ? 0 : $('#slPayablePOrC option:selected').val())
            ,
            pSupplierOperationPartnerID: ($('#slPayableSupplier option:selected').val() == "" ? 0 : $('#slPayableSupplier option:selected').val())
            ,
            pQuantity: ($("#txtPayableQuantity").val().trim() == "" ? 0 : $("#txtPayableQuantity").val().trim())
            ,
            pCostPrice: ($("#txtPayableUnitPrice").val().trim() == "" ? 0 : $("#txtPayableUnitPrice").val().trim())

            ,
            pAmountWithoutVAT: $("#txtPayableAmountWithoutVAT").val()
            ,
            pTaxTypeID: $("#slPayableTax").val() == "" ? 0 : $("#slPayableTax").val()
            ,
            pTaxPercentage: $("#txtPayableTaxPercentage").val() == "" ? 0 : $("#txtPayableTaxPercentage").val()
            ,
            pTaxAmount: $("#txtPayableTaxAmount").val() == "" ? 0 : $("#txtPayableTaxAmount").val()
            ,
            pDiscountTypeID: $("#slPayableDiscount").val() == "" ? 0 : $("#slPayableDiscount").val()
            ,
            pDiscountPercentage: $("#txtPayableDiscountPercentage").val() == "" ? 0 : $("#txtPayableDiscountPercentage").val()
            ,
            pDiscountAmount: $("#txtPayableDiscountAmount").val() == "" ? 0 : $("#txtPayableDiscountAmount").val()

            ,
            pCostAmount: ($("#txtPayableAmount").val().trim() == "" ? 0 : $("#txtPayableAmount").val().trim())
            ,
            pInitialSalePrice: ($("#txtPayableInitialSalePrice").val().trim() == "" ? 0 : $("#txtPayableInitialSalePrice").val().trim())
            ,
            pSupplierInvoiceNo: ($("#txtPayableSupplierInvoiceNo").val().trim() == "" ? 0 : $("#txtPayableSupplierInvoiceNo").val().trim().toUpperCase())
            ,
            pSupplierReceiptNo: ($("#txtPayableSupplierReceiptNo").val().trim() == "" ? 0 : $("#txtPayableSupplierReceiptNo").val().trim().toUpperCase())
            ,
            pEntryDate: ($("#txtPayableEntryDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtPayableEntryDate").val().trim()))
            ,
            pBillID: ($('#slPayableBill option:selected').val() == "" ? 0 : $('#slPayableBill option:selected').val())

            ,
            pIssueDate: ($("#txtPayableIssueDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtPayableIssueDate").val().trim()))

            ,
            pExchangeRate: ($("#txtPayableExchangeRate").val().trim() == "" ? 0 : $("#txtPayableExchangeRate").val().trim())
            ,
            pCurrencyID: ($('#slPayableCurrency option:selected').val() == "" ? 0 : $('#slPayableCurrency option:selected').val())
            ,
            pNotes: $("#txtPayableNotes").val().toUpperCase().trim()
            //the next 2 parameters are to check uniqueness of supplier invoice No. in the controller
            ,
            pPartnerTypeID: $('#slPayableSupplier option:selected').attr("PartnerTypeID") == "" ? 0 : $('#slPayableSupplier option:selected').attr("PartnerTypeID")
            ,
            pPartnerID: $('#slPayableSupplier option:selected').attr("PartnerID") == "" ? 0 : $('#slPayableSupplier option:selected').attr("PartnerID")
            ,
            pPayableBillTo: 0
            ,
            pSupplierSiteID: ($('#slSites option:selected').val() == "" ? 0 : $('#slSites option:selected').val())
            ,
            pTruckingOrderID: 0
            , pQuotationRouteID: $('#hQuotationRouteID').val()
            , pCategoryID: $('#slPayableCategory').val() == "" || $('#slPayableCategory').val() == null ? 0 : parseInt($('#slPayableCategory').val())

        }, pSaveandAddNew, "EditPayableModal"
            , function (data) {
                OperationCharges_FillModal(); //Payables_LoadWithPagingWithWhereClause($("#hOperationID").val());
                if (data[1] != "") //supplier invoice number uniqueness violated
                    swal(strSorry, data[1]);
            });
    }
}
function Payables_EditByDblClick(pID) {
    jQuery("#EditPayableModal").modal("show");
    Payables_FillControls(pID);
}
function Payables_DeleteList(callback) {
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblPayables') != "")
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
                DeleteListFunction("/api/Payables/Delete"
                    , {
                        pPayablesIDs: GetAllSelectedIDsAsString('tblPayables'), pOperationID: $("#hShipmentID").val()
                    }
                    , function () {
                        OperationCharges_FillModal();
                    });
            });
    //DeleteListFunction("/api/Payables/Delete", { "pPayablesIDs": GetAllSelectedIDsAsString('tblPayables') }, function () { LoadViews("OperationsEdit", null, $("#hOperationID").val()); });
}
function Payables_FillControls(pID) {
    ClearAll("#EditPayableModal");

    $("#hPayableID").val(pID);
    FadePageCover(true);
    var tr = $("#tblPayables tr[ID='" + pID + "']");
    var pPOrCID = $(tr).find("td.PayablePOrC").attr('val');
    var pPartnerSupplierID = $(tr).find("td.PayableSupplier").attr('val');
    var pUOMID = $(tr).find("td.PayableUOM").attr('val');
    var pCurrencyID = $(tr).find("td.PayableCurrency").attr('val');
    var pOperationID = $("#hShipmentID").val();
    var pBillID = $(tr).find("td.PayableBillID").text();
    var pSupplierSiteID = $(tr).find("td.SupplierSiteID").text();

    var pTaxTypeID = $(tr).find("td.PayableTaxTypeID").attr('val');
    var pDiscountTypeID = $(tr).find("td.PayableDiscountTypeID").attr('val');

    $("#slPayableBill").parent().addClass("hide");

    if ($("#hDefaultCurrencyID").val() == pCurrencyID)
        $("#txtPayableExchangeRate").attr("disabled", "disabled");
    else
        $("#txtPayableExchangeRate").removeAttr("disabled");

    debugger;

    if (pPartnerSupplierID == 0) {
        $("#txtPayableSupplierInvoiceNo").attr("disabled", "disabled");
        //$("#txtPayableSupplierReceiptNo").attr("disabled", "disabled");
    } else {
        $("#txtPayableSupplierInvoiceNo").removeAttr("disabled");
        $("#txtPayableSupplierReceiptNo").removeAttr("disabled");
    }
    //if ($(tr).find("td.PayableSupplierInvoiceNo").text() == "" && $(tr).find("td.PayableSupplierReceiptNo").text() == "")
    if ($(tr).find("td.PayableSupplierInvoiceNo").text() == "")
        $("#slPayableSupplier").removeAttr("disabled");
    else
        $("#slPayableSupplier").attr("disabled", "disabled");

    GetListWithCodeAndWhereClause(pID, "/api/NoAccessFreightTypes/LoadAll", "P/C", "slPayablePOrC" /*pSlName*/, " WHERE 1=1 ");  //PayablePOrC_GetList(pPOrCID, "slPayablePOrC");
    PayableSuppliers_GetList(pPartnerSupplierID, "slPayableSupplier", function () {
        if (pDefaults.UnEditableCompanyName == "GBL")
            FillSupplierSites(pSupplierSiteID, 'slPayableSupplier', 'slPayableSupplier', 'slSites');
    });
    $("#slPayableCurrency").html($("#hReadySlCurrencies").html());
    $("#slPayableCurrency").val(pCurrencyID); //PayableCurrency_GetList(pCurrencyID, "slPayableCurrency");
    PayableUOM_GetList(pUOMID, "slPayableUOM");
    GetListTaxTypeWithNameAndPercAttr(pTaxTypeID, "api/TaxeTypes/LoadAllWithWhereClause"
        , "<--Select-->", "slPayableTax", "WHERE IsInactive=0 ORDER BY Name"
        , function () {
            $("#slPayableDiscount").html($("#slPayableTax").html());
            $("#slPayableDiscount").val(pDiscountTypeID == 0 ? "" : pDiscountTypeID);
            $("#slPayableTax option[IsDiscount='true']").addClass('hide');
            $("#slPayableDiscount option[IsDiscount='false']").addClass('hide');
        });

    $("#lblPayableShown").html(": " + $(tr).find("td.Payable").text());
    $("#lblPayableCreatedBy").html(" : " + $(tr).find("td.PayableCreatorName").text())
    $("#lblPayableCreationDate").html(" : " + $(tr).find("td.PayableCreationDate").text())
    $("#lblPayableUpdatedBy").html(": " + $(tr).find("td.PayableModificatorName").text())
    $("#lblPayableModificationDate").html(" : " + $(tr).find("td.PayableModificationDate").text())

    //$("#txtPayableType").val($(tr).find("td.Payable").text());
    //$("#txtPayableType").attr("ChargeTypeID", $(tr).find("td.Payable").attr("val"));
    CallGETFunctionWithParameters("/api/ChargeTypes/LoadAllWithMinimalColumns"
        , {
            pWhereClauseWithMinimalColumns: "WHERE 1=1"
        }
        , function (pData) {
            FillListFromObject($(tr).find("td.Payable").attr("val"), 2, "<--Select-->", "slPayableChargeType", pData[0], null);
        }
        , null);
    GetListWithOpCodeAndHouseNoAndClientEmailAttr(pBillID, "/api/Operations/LoadWithParameters", "<--Select-->", "slPayableBill"
        , {
            pPageNumber: 1,
            pPageSize: 99999,
            pWhereClause: " WHERE ID = " + pOperationID,
            pOrderBy: "HouseNumber"
        }
        , function () {
            FadePageCover(false);
        });
    $("#txtPayableQuantity").val($(tr).find("td.PayableQuantity").text());
    $("#txtPayableUnitPrice").val(parseInt($(tr).find("td.PayableCostPrice").text()) == 0 ? "" : $(tr).find("td.PayableCostPrice").text());
    $("#txtPayableAmountWithoutVAT").val(parseInt($(tr).find("td.PayableAmountWithoutVAT").text()) == 0 ? "" : $(tr).find("td.PayableAmountWithoutVAT").text());

    $("#txtPayableTaxPercentage").val($(tr).find("td.PayableTaxPercentage").text());
    $("#txtPayableTaxAmount").val($(tr).find("td.PayableTaxAmount").text());
    $("#txtPayableDiscountPercentage").val($(tr).find("td.PayableDiscountPercentage").text());
    $("#txtPayableDiscountAmount").val($(tr).find("td.PayableDiscountAmount").text());

    $("#txtPayableAmount").val(parseInt($(tr).find("td.PayableCostAmount").text()) == 0 ? "" : $(tr).find("td.PayableCostAmount").text());
    $("#txtPayableInitialSalePrice").val($(tr).find("td.PayableInitialSalePrice").text());
    $("#txtPayableExchangeRate").val($(tr).find("td.PayableExchangeRate").text());
    $("#txtPayableSupplierInvoiceNo").val($(tr).find("td.PayableSupplierInvoiceNo").text());
    $("#txtPayableSupplierReceiptNo").val($(tr).find("td.PayableSupplierReceiptNo").text());
    $("#txtPayableEntryDate").val($(tr).find("td.PayableEntryDate").text());
    $("#txtPayableIssueDate").val($(tr).find("td.PayableIssueDate").text());
    $("#txtPayableNotes").val($(tr).find("td.PayableNotes").text());

    $("#slPayableUOM").attr("onchange", "Payables_UOMChanged();");
    $("#btnSavePayable").attr("onclick", "Payables_Update(false);");
}
function Payables_InsertListWithoutValues(pSaveandAddNew) {
    var pSelectedIDs = GetAllSelectedIDsAsStringWithNameAttr("cbSelectPayables");//returns string array of IDs
    debugger;
    if (pSelectedIDs != "")
        InsertSelectedCheckboxItems("/api/Payables/InsertListWithoutValues"
            , {
                pOperationID: $("#hShipmentID").val(),
                pSelectedIDs: pSelectedIDs,
                pQuotationRouteID: 0
                ,
                pOperationContainersAndPackagesID: 0,
                pOperationVehicleID: 0,
                pTruckingOrderID: 0
            }
            , pSaveandAddNew
            , "SelectChargesModal" //pModalID
            , null //function () { Payables_GetAvailableCharges(); }
            , function () {
                OperationCharges_FillModal(); //Payables_LoadWithPagingWithWhereClause($("#hOperationID").val());
            });
}
function Payables_GetAvailableCharges() {
    debugger;
    $("#divSelectCharges").html("");
    FadePageCover(true);
    var pStrFnName = "/api/ChargeTypes/LoadAll";
    var pDivName = "divSelectCharges";
    var ptblModalName = "tblModalPayables";
    var pCheckboxNameAttr = "cbSelectPayables";
    var pWhereClause = "";
    pWhereClause += " WHERE IsUsedInPayable = 1 AND IsInactive = 0 AND IsOperationChargeType=1 ";
    pWhereClause += ($("#cbIsOcean").prop('checked') == true ? " AND IsOcean = 1 " : "");
    pWhereClause += ($("#cbIsAir").prop('checked') == true ? " AND IsAir = 1 " : "");
    pWhereClause += ($("#cbIsInland").prop('checked') == true ? " AND IsInland = 1 " : "");
    pWhereClause += " AND ( Code LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%' OR Name LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%') ";
    ////pWhereClause += " AND ID NOT IN (SELECT ChargeTypeID from Payables ";
    ////pWhereClause += "                WHERE OperationID = " + $("#hOperationID").val() + ") ";
    //GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
    //    , function () {
    //        HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
    //        $("#btnSelectChargesApply").attr("onclick", "Payables_InsertListWithoutValues(false);");
    //        FadePageCover(false);
    //    }
    //    , 1/*pCodeOrName*/);
    GetListAsCheckboxesWithVariousParameters(pStrFnName, {
        pWhereClause: pWhereClause
    }, pDivName, pCheckboxNameAttr
        , function () {
            HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
            FadePageCover(false);
        }
        , (pDefaults.IsRepeatChargeTypeName ? 3 : 1) //pCodeOrName
        , "col-sm-3"/*pColumnSize*/);

    //FillPayablesModalTableControls(pStrFnName, pWhereClause, pDivName, ptblModalName, pCheckboxNameAttr, true //pIsInsert
    //    , function () {
    //        HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
    //        $("#btnSelectChargesApply").attr("onclick", "Payables_InsertListWithValues(false);");
    //    });
    $("#btn-SearchCharges").attr("onclick", "Payables_GetAvailableCharges();");

    $("#btnSelectChargesApply").attr("onclick", "Payables_InsertListWithoutValues(false);");

}
function Payables_txtTblModalCurrency_Changed(pRowID, pIsInsert) {
    debugger;
    //if (pIsInsert) { //if not insert then all IDs will be updated
    $("#txtTblModalPayableExchangeRate" + pRowID).val($("#slPayableCurrency" + pRowID + " option:selected").attr("MasterDataExchangeRate"));
    if ($("#hDefaultCurrencyID").val() == $("#slPayableCurrency" + pRowID).val())
        $("#txtTblModalPayableExchangeRate" + pRowID).attr("disabled", "disabled");
    else
        $("#txtTblModalPayableExchangeRate" + pRowID).removeAttr("disabled");
    //}
}
function Payables_Row_CalculatePayablesAmount(pRowID, pIsInsert) {
    debugger;
    var rowQuantity = $("#txtTblModalPayableQuantity" + pRowID).val();
    var rowCostPrice = $("#txtTblModalPayableCostPrice" + pRowID).val();

    var decAmountWithoutVAT = 0;
    var decTaxAmount = 0;
    var decTaxPercentage = 0.0;
    var decDiscountAmount = 0;
    var decDiscountPercentage = 0.0;

    decAmountWithoutVAT = rowQuantity * rowCostPrice;
    $("#txtTblModalPayableCostAmountWithoutVAT" + pRowID).val(decAmountWithoutVAT);
    decTaxPercentage = $("#slPayableTax" + pRowID + " option:selected").attr("CurrentPercentage");
    decTaxAmount = decAmountWithoutVAT * decTaxPercentage / 100;
    decDiscountPercentage = $("#slPayableDiscount" + pRowID + " option:selected").attr("CurrentPercentage");
    decDiscountAmount = decAmountWithoutVAT * decDiscountPercentage / 100;
    $("#txtTblModalPayableTaxPercentage" + pRowID).val(decTaxPercentage);
    $("#txtTblModalPayableTaxAmount" + pRowID).val(decTaxAmount.toFixed(4));
    $("#txtTblModalPayableDiscountPercentage" + pRowID).val(decDiscountPercentage);
    $("#txtTblModalPayableDiscountAmount" + pRowID).val(decDiscountAmount.toFixed(4));
    $("#txtTblModalPayableCostAmount" + pRowID).val((decAmountWithoutVAT + decTaxAmount - decDiscountAmount).toFixed(4));

    if (pIsInsert) //incase of insert check and uncheck the checkbox to in GetSelectedIDs incase of insert
        Payables_txtTblModalCostAmount_Changed(pRowID, pIsInsert);
}
function CalculatePayablesAmount() {
    var decAmountWithoutVAT = 0;
    var decTaxAmount = 0;
    var decTaxPercentage = 0.0;
    var decDiscountAmount = 0;
    var decDiscountPercentage = 0.0;

    decAmountWithoutVAT = $("#txtPayableQuantity").val() * $("#txtPayableUnitPrice").val();
    $("#txtPayableAmountWithoutVAT").val(decAmountWithoutVAT);
    decTaxPercentage = $("#slPayableTax option:selected").attr("CurrentPercentage");
    decTaxAmount = decAmountWithoutVAT * decTaxPercentage / 100;
    decDiscountPercentage = $("#slPayableDiscount option:selected").attr("CurrentPercentage");
    decDiscountAmount = decAmountWithoutVAT * decDiscountPercentage / 100;
    $("#txtPayableTaxPercentage").val(decTaxPercentage);
    $("#txtPayableTaxAmount").val(decTaxAmount.toFixed(4));
    $("#txtPayableDiscountPercentage").val(decDiscountPercentage);
    $("#txtPayableDiscountAmount").val(decDiscountAmount.toFixed(4));
    $("#txtPayableAmount").val((decAmountWithoutVAT + decTaxAmount - decDiscountAmount).toFixed(4));
}
function Payables_PayableSupplierInvoiceOrReceiptNoChanged(pSupplierControl, pSupplierInvoiceControlID, pSupplierReceiptControlID) { //pSupplierControl is a control not ID so dont use #
    debugger;
    //if ($(pSupplierInvoiceControlID).val() == "" && $(pSupplierReceiptControlID).val() == "") {
    if ($(pSupplierInvoiceControlID).val() == "") {
        $(pSupplierControl).removeAttr("disabled");
    } else {
        $(pSupplierControl).attr("disabled", "disabled");
    }
}
function Payables_MultiRowEdit() {
    debugger;
    var pStrFnName = "/api/Payables/LoadAll";
    var pDivName = "divSelectCharges";//div name to be filled
    var ptblModalName = "tblModalPayables";
    var pCheckboxNameAttr = "cbSelectPayables";
    var pWhereClause = "";
    $("#" + pDivName).html("");
    pWhereClause += " WHERE AccNoteID IS NULL AND ISNULL(IsApproved,0)=0 AND OperationID = " + $("#hShipmentID").val();
    //pWhereClause += ($("#hQuotationRouteID").val() == 0 ? "" : " AND GeneratingQRID = " + $("#hQuotationRouteID").val());
    //pWhereClause += " AND ( ChargeTypeCode LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%' OR ChargeTypeName LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%') ";
    //pWhereClause += "                ORDER BY ChargeTypeName ";

    FillPayablesModalTableControls(pStrFnName, pWhereClause, pDivName, ptblModalName, pCheckboxNameAttr, false //pIsInsert
        , function () {
            HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
        });

    $("#btn-SearchCharges").attr("onclick", "Payables_MultiRowEdit();");
    $("#btnSelectChargesApply").attr("onclick", "Payables_UpdateList(false);");
}
function Payables_txtTblModalCostAmount_Changed(pRowID, pIsInsert) {
    if (pIsInsert) { //if not insert then all IDs will be updated
        var varPayableCostAmount = $("#tblModalPayables tr[ID='" + pRowID + "']").find('input[name=txtTblModalPayableCostAmount]').val();
        if (varPayableCostAmount != 0 && varPayableCostAmount != "")
            $("#tblModalPayables tr[ID='" + pRowID + "']").find('input[name=cbSelectPayables]').prop("checked", true);
        else
            $("#tblModalPayables tr[ID='" + pRowID + "']").find('input[name=cbSelectPayables]').prop("checked", false);
    }
}
function Payables_CurrencyChanged() {
    $("#txtPayableExchangeRate").val($("#slPayableCurrency option:selected").attr("MasterDataExchangeRate"));
    if ($("#hDefaultCurrencyID").val() == $("#slPayableCurrency").val())
        $("#txtPayableExchangeRate").attr("disabled", "disabled");
    else
        $("#txtPayableExchangeRate").removeAttr("disabled");
}

function Payables_UpdateList(pSaveandAddNew) {
    var pSelectedPayablesIDsToUpdate = GetAllSelectedIDsAsStringWithNameAttr("cbSelectPayables");//returns string array of IDs
    var pPOrCList = "";
    var pSupplierList = "";
    var pUOMList = "";
    var pQuantityList = "";
    var pCostPriceList = "";

    var pAmountWithoutVATList = "";
    var pTaxTypeIDList = "";
    var pTaxPercentageList = "";
    var pTaxAmountList = "";
    var pDiscountTypeIDList = "";
    var pDiscountPercentageList = "";
    var pDiscountAmountList = "";

    var pCostAmountList = "";
    var pInitialSalePriceList = "";
    var pSupplierInvoiceNumberList = "";
    var pSupplierReceiptNumberList = "";
    var pIssueDateList = "";
    var pEntryDateList = "";
    var pExchangeRateList = "";
    var pCurrencyList = "";
    var pPartnerTypeIDList = "";//pPartnerTypeIDList,pPartnerIDList are to check uniqueness of supplier invoice No. in the controller
    var pPartnerIDList = "";
    var pSupplierSiteIDList = "";
    var pNotesList = "";
    var pBillIDList = "";
    var _IsZeroExchangeRate = false;
    var _NullSupplierSite = false;
    if (pSelectedPayablesIDsToUpdate != "") {
        FadePageCover(true);
        var NumberOfSelectRows = pSelectedPayablesIDsToUpdate.split(',').length;
        for (i = 0; i < NumberOfSelectRows; i++) {
            var currentRowID = pSelectedPayablesIDsToUpdate.split(",")[i];
            if ($("#txtTblModalPayableExchangeRate" + currentRowID).val() == undefined || $("#txtTblModalPayableExchangeRate" + currentRowID).val() == "" || parseFloat($("#txtTblModalPayableExchangeRate" + currentRowID).val()) == 0
                || (parseInt($("#txtTblModalPayableExchangeRate" + currentRowID).val()) == 1 && pDefaults.CurrencyID != ($("#slPayableCurrency" + currentRowID).val())))
                _IsZeroExchangeRate = true;
            pPOrCList += ((pPOrCList == "") ? "" : ",") + ($("#slPayablePOrC" + currentRowID).val() == undefined || $("#slPayablePOrC" + currentRowID).val() == "" ? 0 : $("#slPayablePOrC" + currentRowID).val());
            pSupplierList += ((pSupplierList == "") ? "" : ",") + ($("#slPayableSupplier" + currentRowID).val() == undefined || $("#slPayableSupplier" + currentRowID).val() == "" ? 0 : $("#slPayableSupplier" + currentRowID).val());
            pUOMList += ((pUOMList == "") ? "" : ",") + ($("#slPayableUOM" + currentRowID).val() == undefined || $("#slPayableUOM" + currentRowID).val() == "" ? 0 : $("#slPayableUOM" + currentRowID).val());
            pQuantityList += ((pQuantityList == "") ? "" : ",") + ($("#txtTblModalPayableQuantity" + currentRowID).val() == undefined || $("#txtTblModalPayableQuantity" + currentRowID).val() == "" ? 0 : $("#txtTblModalPayableQuantity" + currentRowID).val());
            pCostPriceList += ((pCostPriceList == "") ? "" : ",") + ($("#txtTblModalPayableCostPrice" + currentRowID).val() == undefined || $("#txtTblModalPayableCostPrice" + currentRowID).val() == "" ? 0 : $("#txtTblModalPayableCostPrice" + currentRowID).val());

            pAmountWithoutVATList += ((pAmountWithoutVATList == "") ? "" : ",") + ($("#txtTblModalPayableCostAmountWithoutVAT" + currentRowID).val() == undefined || $("#txtTblModalPayableCostAmountWithoutVAT" + currentRowID).val() == "" ? 0 : $("#txtTblModalPayableCostAmountWithoutVAT" + currentRowID).val());
            pTaxTypeIDList += ((pTaxTypeIDList == "") ? "" : ",") + ($("#slPayableTax" + currentRowID).val() == undefined || $("#slPayableTax" + currentRowID).val() == "" ? 0 : $("#slPayableTax" + currentRowID).val());
            pTaxPercentageList += ((pTaxPercentageList == "") ? "" : ",") + ($("#txtTblModalPayableTaxPercentage" + currentRowID).val() == undefined || $("#txtTblModalPayableTaxPercentage" + currentRowID).val() == "" ? 0 : $("#txtTblModalPayableTaxPercentage" + currentRowID).val());
            pTaxAmountList += ((pTaxAmountList == "") ? "" : ",") + ($("#txtTblModalPayableTaxAmount" + currentRowID).val() == undefined || $("#txtTblModalPayableTaxAmount" + currentRowID).val() == "" ? 0 : $("#txtTblModalPayableTaxAmount" + currentRowID).val());
            pDiscountTypeIDList += ((pDiscountTypeIDList == "") ? "" : ",") + ($("#slPayableDiscount" + currentRowID).val() == undefined || $("#slPayableDiscount" + currentRowID).val() == "" ? 0 : $("#slPayableDiscount" + currentRowID).val());
            pDiscountPercentageList += ((pDiscountPercentageList == "") ? "" : ",") + ($("#txtTblModalPayableDiscountPercentage" + currentRowID).val() == undefined || $("#txtTblModalPayableDiscountPercentage" + currentRowID).val() == "" ? 0 : $("#txtTblModalPayableDiscountPercentage" + currentRowID).val());
            pDiscountAmountList += ((pDiscountAmountList == "") ? "" : ",") + ($("#txtTblModalPayableDiscountAmount" + currentRowID).val() == undefined || $("#txtTblModalPayableDiscountAmount" + currentRowID).val() == "" ? 0 : $("#txtTblModalPayableDiscountAmount" + currentRowID).val());

            pCostAmountList += ((pCostAmountList == "") ? "" : ",") + ($("#txtTblModalPayableCostAmount" + currentRowID).val() == undefined || $("#txtTblModalPayableCostAmount" + currentRowID).val() == "" ? 0 : $("#txtTblModalPayableCostAmount" + currentRowID).val());
            pInitialSalePriceList += ((pInitialSalePriceList == "") ? "" : ",") + ($("#txtTblModalPayableInitialSalePrice" + currentRowID).val() == undefined || $("#txtTblModalPayableInitialSalePrice" + currentRowID).val() == "" ? 0 : $("#txtTblModalPayableInitialSalePrice" + currentRowID).val());
            pSupplierInvoiceNumberList += ((pSupplierInvoiceNumberList == "") ? "" : ",") + ($("#txtTblModalPayableSupplierInvoiceNo" + currentRowID).val() == undefined || $("#txtTblModalPayableSupplierInvoiceNo" + currentRowID).val().trim() == "" ? 0 : $("#txtTblModalPayableSupplierInvoiceNo" + currentRowID).val().trim().toUpperCase());
            pSupplierReceiptNumberList += ((pSupplierReceiptNumberList == "") ? "" : ",") + ($("#txtTblModalPayableSupplierReceiptNo" + currentRowID).val() == undefined || $("#txtTblModalPayableSupplierReceiptNo" + currentRowID).val().trim() == "" ? 0 : $("#txtTblModalPayableSupplierReceiptNo" + currentRowID).val().trim().toUpperCase());
            pIssueDateList += ((pIssueDateList == "") ? "" : ",") + ($("#txtTblModalPayableIssueDate" + currentRowID).val() == undefined || $("#txtTblModalPayableIssueDate" + currentRowID).val().trim() == "" ? "" : $("#txtTblModalPayableIssueDate" + currentRowID).val().trim());
            pEntryDateList += ((pEntryDateList == "") ? "" : ",") + ($("#txtTblModalPayableEntryDate" + currentRowID).val() == undefined || $("#txtTblModalPayableEntryDate" + currentRowID).val().trim() == "" ? "" : $("#txtTblModalPayableEntryDate" + currentRowID).val().trim());
            //pEntryDateList += ((pEntryDateList == "") ? "" : ",") + ($("#txtTblModalPayableEntryDate" + currentRowID).val() == undefined || $("#txtTblModalPayableEntryDate" + currentRowID).val().trim() == "" ? "" : ConvertDateFormat($("#txtTblModalPayableEntryDate" + currentRowID).val().trim()));
            pExchangeRateList += ((pExchangeRateList == "") ? "" : ",") + ($("#txtTblModalPayableExchangeRate" + currentRowID).val() == undefined || $("#txtTblModalPayableExchangeRate" + currentRowID).val() == "" ? 0 : $("#txtTblModalPayableExchangeRate" + currentRowID).val());
            pCurrencyList += ((pCurrencyList == "") ? "" : ",") + ($("#slPayableCurrency" + currentRowID).val() == undefined || $("#slPayableCurrency" + currentRowID).val() == "" ? 0 : $("#slPayableCurrency" + currentRowID).val());
            pPartnerTypeIDList += ((pPartnerTypeIDList == "") ? "" : ",") + ($("#slPayableSupplier" + currentRowID).val() == undefined || $("#slPayableSupplier" + currentRowID).val() == "" ? 0 : $("#slPayableSupplier" + currentRowID + " option:selected").attr("PartnerTypeID"));
            pPartnerIDList += ((pPartnerIDList == "") ? "" : ",") + ($("#slPayableSupplier" + currentRowID).val() == undefined || $("#slPayableSupplier" + currentRowID).val() == "" ? 0 : $("#slPayableSupplier" + currentRowID + " option:selected").attr("PartnerID"));
            pSupplierSiteIDList += ((pSupplierSiteIDList == "") ? "" : ",") + ($("#slPayableSupplierSiteID" + currentRowID).val() == undefined || $("#slPayableSupplierSiteID" + currentRowID).val() == "" ? 0 : $("#slPayableSupplierSiteID" + currentRowID).val());
            pNotesList += ((pNotesList == "") ? "" : ",") + ($("#txtTblModalPayableNotes" + currentRowID).val() == undefined || $("#txtTblModalPayableNotes" + currentRowID).val().trim() == "" ? 0 : $("#txtTblModalPayableNotes" + currentRowID).val().trim().toUpperCase());
            pBillIDList += ((pBillIDList == "") ? "" : ",") + "0";
        }
    }
    if (_NullSupplierSite) {
        swal("Sorry", "Please, select site.");
        FadePageCover(false);
    } else if (_IsZeroExchangeRate) {
        swal("Sorry", "Please, check exchange rate.");
        FadePageCover(false);
    } else {
        if (pSelectedPayablesIDsToUpdate != "")
            CallPOSTFunctionWithParameters("/api/Payables/UpdateList"
                , {
                    "pIsCalledFromOperations": false
                    , "pSelectedPayablesIDsToUpdate": pSelectedPayablesIDsToUpdate
                    , "pPOrCList": pPOrCList
                    , "pSupplierList": pSupplierList
                    , "pUOMList": pUOMList
                    , "pQuantityList": pQuantityList
                    , "pCostPriceList": pCostPriceList

                    , "pAmountWithoutVATList": pAmountWithoutVATList
                    , "pTaxTypeIDList": pTaxTypeIDList
                    , "pTaxPercentageList": pTaxPercentageList
                    , "pTaxAmountList": pTaxAmountList
                    , "pDiscountTypeIDList": pDiscountTypeIDList
                    , "pDiscountPercentageList": pDiscountPercentageList
                    , "pDiscountAmountList": pDiscountAmountList

                    , "pCostAmountList": pCostAmountList
                    , "pInitialSalePriceList": pInitialSalePriceList
                    , "pSupplierInvoiceNumberList": pSupplierInvoiceNumberList
                    , "pSupplierReceiptNumberList": pSupplierReceiptNumberList
                    , "pIssueDateList": pIssueDateList
                    , "pEntryDateList": pEntryDateList
                    , "pExchangeRateList": pExchangeRateList
                    , "pCurrencyList": pCurrencyList
                    , "pPartnerTypeIDList": pPartnerTypeIDList
                    , "pPartnerIDList": pPartnerIDList
                    , "pSupplierSiteIDList": pSupplierSiteIDList
                    , "pNotesList": pNotesList
                    , "pBillIDList": pBillIDList
                    , "pQuotationRouteID": $('#hQuotationRouteID').val()
                }
                , function (data) {
                    debugger;
                    OperationCharges_FillModal(); //Payables_LoadWithPagingWithWhereClause($("#hOperationID").val());
                    if (data[1] != "")
                        swal(strSorry, data[1]);
                    else {
                        swal("Success", "Saved successfully.");
                        jQuery("#SelectChargesModal").modal("hide");
                    }
                }, null);
    }
}


/******************Payables**************************/






/******************Receivables**************************/

function Receivables_BindTableRows(pReceivables) {

    ClearAllTableRows("tblReceivables");
    debugger;
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pReceivables, function (i, item) {
        AppendRowtoTable("tblReceivables",
            //("<tr ID='" + item.ID + "' " + (item.InvoiceID == 0 && OERec && $("#hIsOperationDisabled").val() == false ? "ondblclick='Receivables_EditByDblClick(" + item.ID + ");'>" : ">")
            ("<tr ID='" + item.ID + "' " + (item.InvoiceID == 0 && item.AccNoteID == 0 && OERec && !DisableEditingInPR ? "ondblclick='Receivables_EditByDblClick(" + item.ID + ");'>" : ">")
                + "<td class='ReceivableID'> <input " + (item.InvoiceID == 0 && item.AccNoteID == 0 && item.GeneratingQRID == 0 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "' /></td>"
                //+ "<td class='Receivable' val='" + item.ChargeTypeID + "'>" + item.ChargeTypeCode + " (" + item.ChargeTypeName + ")" + "</td>"
                + "<td class='Receivable' val='" + item.ChargeTypeID + "'>" + (pDefaults.UnEditableCompanyName == "GBL" ? (item.ChargeTypeName + " (" + item.ChargeTypeCode + ")") : item.ChargeTypeName) + "</td>"
                + "<td class='ReceivablePOrC hide' val='" + item.POrC + "'>" + (item.POrC == 0 ? "" : item.POrCCode) + "</td>"
                //+ "<td class='ReceivableSupplier hide' val='" + item.SupplierID + "'>" + (item.SupplierID == 0 ? "" : item.SupplierName) + "</td>"
                //+ ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') ? ("<td class='ReceivableUOM' val='" + item.ContainerTypeID + "'>" + (item.ContainerTypeCode == 0 ? "" : item.ContainerTypeCode) + "</td>") : "")
                //+ ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='ReceivableUOM' val='" + item.PackageTypeID + "'>" + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + "</td>") : "")
                + "<td class='ReceivableUOM hide' val='" + item.MeasurementID + "'>" + (item.MeasurementID == 0 ? "" : item.MeasurementCode) + "</td>"
                + "<td class='ReceivableQuantity'>" + item.Quantity + "</td>"
                + "<td class='ReceivableCostPrice hide'>" + (item.CostPrice).toFixed(4) + "</td>"
                + "<td class='ReceivableCostAmount hide'>" + (item.CostAmount).toFixed(4) + "</td>"
                + "<td class='ReceivableSalePrice'>" + (item.SalePrice).toFixed(4) + "</td>"
                + "<td class='ReceivableOldSalePrice hide'>" + (item.OldSalePrice > 0 && item.OldSalePrice != item.SalePrice ? (item.OldSalePrice).toFixed(4) : "") + "</td>"

                + "<td class='ReceivableAmountWithoutVAT hide'>" + item.AmountWithoutVAT.toFixed(4) + "</td>"
                + "<td class='ReceivableTaxTypeID' val=" + item.TaxTypeID + ">" + (item.TaxTypeID == 0 ? "" : item.TaxTypeName) + "</td>"
                + "<td class='ReceivableTaxPercentage hide'>" + item.TaxPercentage.toFixed(4) + "</td>"
                + "<td class='ReceivableTaxAmount hide'>" + item.TaxAmount.toFixed(4) + "</td>"
                + "<td class='ReceivableDiscountTypeID' val=" + item.DiscountTypeID + ">" + (item.DiscountTypeID == 0 ? "" : (item.DiscountPercentage + '%')) + "</td>"
                + "<td class='ReceivableDiscountPercentage hide'>" + item.DiscountPercentage.toFixed(4) + "</td>"
                + "<td class='ReceivableDiscountAmount hide'>" + item.DiscountAmount.toFixed(4) + "</td>"

                + "<td class='ReceivableSaleAmount'>" + (item.SaleAmount).toFixed(4) + "</td>"
                + "<td class='ReceivableExchangeRate'>" + item.ExchangeRate.toFixed(4) + "</td>"
                + "<td class='ReceivableCurrency' val='" + item.CurrencyID + "'>" + (item.CurrencyID == 0 ? "" : item.CurrencyCode) + "</td>"
                + "<td class='ReceivableInvoice hide' val='" + item.InvoiceID + "'>" + (item.InvoiceID == 0 ? "" : (item.InvoiceNumber + " / " + item.InvoiceTypeName)) + "</td>"
                + "<td class='ReceivableAccNote hide' val='" + item.AccNoteID + "'>" + (item.AccNoteID == 0 ? "" : item.Code) + "</td>"
                + "<td class='ReceivableOperation hide' val='" + item.OperationID + "'>" + (item.OperationID == 0 ? "" : item.OperationCode) + "</td>"
                + "<td class='ReceivableNotes hide'>" + (item.Notes == "0" ? "" : item.Notes) + "</td>"

                + "<td class='ReceivableIssueDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.IssueDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.IssueDate)) : "") + "</td>"
                + "<td class='ReceivableOperationContainersAndPackagesID hide'>" + item.OperationContainersAndPackagesID + "</td>"
                + "<td class='ReceivableTrailerID hide'>" + item.TrailerID + "</td>"

                + "<td class='ReceivableCreatorName hide'>" + item.CreatorName + "</td>"
                //+ "<td class='ReceivableCreationDate hide'>" + item.CreationDate + "</td>"
                + "<td class='ReceivableCreationDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
                + " <i class='fa fa-calendar'></i>"
                //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + "</small>"
                + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.CreationDate)) + "</small>"
                + "</span>"
                + "</td>"
                + "<td class='ReceivableModificatorName hide'>" + item.ModificatorName + "</td>"
                //+ "<td class='ReceivableModificationDate hide'>" + item.ModificationDate + "</td>"
                + "<td class='ReceivableModificationDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
                + " <i class='fa fa-calendar'></i>"
                //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.ModificationDate)) + "</small>"
                + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.ModificationDate)) + "</small>"
                + "</span>"
                + "</td>"
                + "<td class='hide'><a href='#EditReceivableModal' data-toggle='modal' onclick='Receivables_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
        //+ "<td class='hide'><a href='#EditReceivableModal' data-toggle='modal' onclick='Receivables_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
        //+ "</tr>"));
        if (item.OldSalePrice > 0 && item.OldSalePrice != item.SalePrice)
            $('#tblReceivables tr[id=' + item.ID + '] td').css({ 'background-color': 'lightgreen' });
    });
    if (pDefaults.UnEditableCompanyName == "MED")
        $('#tblReceivables th.ReceivableOldSalePrice, #tblReceivables td.ReceivableOldSalePrice').removeClass('hide');

    ////ApplyPermissions();
    //if (OARec && $("#hIsOperationDisabled").val() == false) { $("#btn-AddReceivables").removeClass("hide"); $("#btn-GenerateDefaultReceivables").removeClass("hide"); $("#btn-GenerateReceivablesFromQuotation").removeClass("hide"); $("#btn-GenerateReceivablesFromPayables").removeClass("hide"); $("#btn-ApplyInvoiceTypeDefaults").removeClass("hide"); $("#slReceivableInvoiceTypes").removeClass("hide"); }
    //else { $("#btn-AddReceivables").addClass("hide"); $("#btn-GenerateDefaultReceivables").addClass("hide"); $("#btn-GenerateReceivablesFromQuotation").addClass("hide"); $("#btn-GenerateReceivablesFromPayables").addClass("hide"); $("#btn-ApplyInvoiceTypeDefaults").addClass("hide"); $("#slReceivableInvoiceTypes").addClass("hide"); }
    //if (ODRec && $("#hIsOperationDisabled").val() == false) $("#btn-DeleteReceivable").removeClass("hide"); else $("#btn-DeleteReceivable").addClass("hide");
    //if (OERec && $("#hIsOperationDisabled").val() == false) $("#btn-MultiRowEditReceivables").removeClass("hide"); else $("#btn-MultiRowEditReceivables").addClass("hide");

    BindAllCheckboxonTable("tblReceivables", "ReceivableID", "cb-CheckAll-Receivables");
    CheckAllCheckbox("HeaderDeleteReceivableID");
    //HighlightText("#tblReceivables>tbody>tr", $("#txt-Search").val().trim());
    //if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
    //    swal(strSorry, strDeleteFailMessage, "warning");
    //    showDeleteFailMessage = false;
    //}
    //PayablesAndReceivables_CalculateSummary();
    //Receivables_CalculateSubtotals();
}
function Receivables_FillControls(pID) {
    debugger;
    ClearAll("#EditReceivableModal");

    $("#hReceivableID").val(pID);
    FadePageCover(true);
    var tr = $("#tblReceivables tr[ID='" + pID + "']");
    var pPOrCID = $(tr).find("td.ReceivablePOrC").attr('val');
    var pSupplierID = $(tr).find("td.ReceivableSupplier").attr('val');
    var pUOMID = $(tr).find("td.ReceivableUOM").attr('val');
    var pCurrencyID = $(tr).find("td.ReceivableCurrency").attr('val');
    var pTaxTypeID = $(tr).find("td.ReceivableTaxTypeID").attr('val');
    var pDiscountTypeID = $(tr).find("td.ReceivableDiscountTypeID").attr('val');
    if ($("#hDefaultCurrencyID").val() == pCurrencyID)
        $("#txtReceivableExchangeRate").attr("disabled", "disabled");
    else
        $("#txtReceivableExchangeRate").removeAttr("disabled");
    GetListWithCodeAndWhereClause(pID, "/api/NoAccessFreightTypes/LoadAll", "P/C", "slReceivablePOrC" /*pSlName*/, " WHERE 1=1 ");  //ReceivablePOrC_GetList(pPOrCID, "slReceivablePOrC");
    //ReceivableSuppliers_GetList(pSupplierID, "slReceivableSupplier");
    $("#slReceivableCurrency").html($("#hReadySlCurrencies").html());
    $("#slReceivableCurrency").val(pCurrencyID); //ReceivableCurrency_GetList(pCurrencyID, "slReceivableCurrency", null);
    ReceivableUOM_GetList(pUOMID, "slReceivableUOM");

    $("#lblReceivableShown").html(": " + $(tr).find("td.Receivable").text());
    $("#lblReceivableCreatedBy").html(" : " + $(tr).find("td.ReceivableCreatorName").text())
    $("#lblReceivableCreationDate").html(" : " + $(tr).find("td.ReceivableCreationDate").text())
    $("#lblReceivableUpdatedBy").html(": " + $(tr).find("td.ReceivableModificatorName").text())
    $("#lblReceivableModificationDate").html(" : " + $(tr).find("td.ReceivableModificationDate").text())

    //$("#txtReceivableType").val($(tr).find("td.Receivable").text());
    //$("#txtReceivableType").attr("ChargeTypeID", $(tr).find("td.Receivable").attr("val"));
    CallGETFunctionWithParameters("/api/ChargeTypes/LoadAllWithMinimalColumns"
        , {
            pWhereClauseWithMinimalColumns: "WHERE 1=1"
        }
        , function (pData) {
            FillListFromObject($(tr).find("td.Receivable").attr("val"), 2, "<--Select-->", "slReceivableChargeType", pData[0], null);
            FadePageCover(false);
        }
        , null);
    if ($("#slReceivableTax option").length < 2)
        GetListTaxTypeWithNameAndPercAttr(pTaxTypeID, "api/TaxeTypes/LoadAllWithWhereClause"
            , "<--Select-->", "slReceivableTax", "WHERE IsInactive=0 ORDER BY Name"
            , function () {
                $("#slReceivableDiscount").html($("#slReceivableTax").html());
                $("#slReceivableDiscount").val(pDiscountTypeID == 0 ? "" : pDiscountTypeID);
                $("#slReceivableTax option[IsDiscount='true']").addClass('hide');
                $("#slReceivableDiscount option[IsDiscount='false']").addClass('hide');
            });
    else {
        $("#slReceivableTax").val(pTaxTypeID == 0 ? "" : pTaxTypeID);
        $("#slReceivableDiscount").val(pDiscountTypeID == 0 ? "" : pDiscountTypeID);
    }
    $("#txtReceivableQuantity").val($(tr).find("td.ReceivableQuantity").text());
    //$("#txtReceivableUnitPrice").val($(tr).find("td.ReceivableCostPrice").text());
    //$("#txtReceivableAmount").val($(tr).find("td.ReceivableCostAmount").text());
    $("#txtReceivableUnitPrice").val(parseInt($(tr).find("td.ReceivableSalePrice").text()) == 0 ? "" : $(tr).find("td.ReceivableSalePrice").text());

    $("#txtReceivableAmountWithoutVAT").val(parseInt($(tr).find("td.ReceivableAmountWithoutVAT").text()) == 0 ? "" : $(tr).find("td.ReceivableAmountWithoutVAT").text());
    $("#txtReceivableTaxPercentage").val($(tr).find("td.ReceivableTaxPercentage").text());
    $("#txtReceivableTaxAmount").val($(tr).find("td.ReceivableTaxAmount").text());
    $("#txtReceivableDiscountPercentage").val($(tr).find("td.ReceivableDiscountPercentage").text());
    $("#txtReceivableDiscountAmount").val($(tr).find("td.ReceivableDiscountAmount").text());

    $("#txtReceivableAmount").val(parseInt($(tr).find("td.ReceivableSaleAmount").text()) == 0 ? "" : $(tr).find("td.ReceivableSaleAmount").text());
    $("#txtReceivableExchangeRate").val($(tr).find("td.ReceivableExchangeRate").text());
    $("#txtReceivableNotes").val($(tr).find("td.ReceivableNotes").text());
    $("#txtReceivableIssueDate").val($(tr).find("td.ReceivableIssueDate").text());

    $("#slReceivableUOM").attr("onchange", "Receivables_UOMChanged();");
    $("#btnSaveReceivable").attr("onclick", "Receivables_Update(false);");
}
function ReceivableUOM_GetList(pID, pSlName) {
    var pWhereClause = "";
    ////pWhereClause += " Where OperationID = " + $("#hOperationID").val();
    //if ($("#hShipmentType").val() == constFCLShipmentType)
    //    pWhereClause += " WHERE IsUsedInFCl = 1 ";
    //else
    //    if ($("#hShipmentType").val() == constLCLShipmentType)
    //        pWhereClause += " WHERE IsUsedInLCL = 1 ";
    //    else
    //        if ($("#hShipmentType").val() == constFTLShipmentType)
    //            pWhereClause += " WHERE IsUsedInFTL = 1 ";
    //        else
    //            if ($("#hShipmentType").val() == constLTLShipmentType)
    //                pWhereClause += " WHERE IsUsedInLTL = 1 ";
    //            else
    //                if ($("#hShipmentType").val() == constConsolidationShipmentType)
    //                    pWhereClause += " WHERE IsUsedInConsolidation = 1 ";
    //                else
    //                    if ($("#hShipmentType").val() == "0")
    //                        pWhereClause += " WHERE IsUsedInAir = 1 ";
    //pWhereClause += " OR ID = " + pID; //for the case that settings changed for a UOM at the time it is taken 
    pWhereClause += " ORDER BY Code ";
    //GetListWithCodeAndNameAndWhereClause(pID, "/api/NoAccessMeasurements/LoadAll", "Select UOM", pSlName, pWhereClause);
    GetListWithNameAndWhereClause(pID, "/api/NoAccessMeasurements/LoadAll", "Select UOM", pSlName, pWhereClause);
}
function Receivables_InsertListWithoutValues(pSaveandAddNew) {
    var pSelectedIDs = GetAllSelectedIDsAsStringWithNameAttr("cbSelectCharges");//returns string array of IDs
    debugger;
    if (pSelectedIDs != "")
        InsertSelectedCheckboxItems("/api/Receivables/InsertListWithoutValues"
            , {
                pOperationID: $("#hShipmentID").val(),
                pSelectedIDs: pSelectedIDs,
                pQuotationRouteID: 0
                ,
                pOperationContainersAndPackagesID: 0,
                pOperationVehicleID: 0,
                pTruckingOrderID: 0
            }
            , pSaveandAddNew
            , "SelectChargesModal" //pModalID
            , null //function () { Receivables_GetAvailableCharges(); }
            , function () {
                OperationCharges_FillModal(); //Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val());
            });
}
function Receivables_GetAvailableCharges() {
    $("#divSelectCharges").html("");
    FadePageCover(true);
    var pStrFnName = "/api/ChargeTypes/LoadAll";
    var pDivName = "divSelectCharges";
    var ptblModalName = "tblModalReceivables";
    var pCheckboxNameAttr = "cbSelectCharges";
    var pWhereClause = "";
    pWhereClause += " WHERE IsUsedInReceivable = 1 AND IsInactive = 0 AND IsOperationChargeType=1 ";
    pWhereClause += ($("#cbIsOcean").prop('checked') == true ? " AND IsOcean = 1 " : "");
    pWhereClause += ($("#cbIsAir").prop('checked') == true ? " AND IsAir = 1 " : "");
    pWhereClause += ($("#cbIsInland").prop('checked') == true ? " AND IsInland = 1 " : "");
    pWhereClause += " AND ( Code LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%' OR Name LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%') ";
    ////pWhereClause += " AND ID NOT IN (SELECT ChargeTypeID from Receivables ";
    ////pWhereClause += "                WHERE OperationID = " + $("#hOperationID").val() + ") ";
    //GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
    //    , function () {
    //        HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
    //        FadePageCover(false);
    //    }, 1/*pCodeOrName*/);
    GetListAsCheckboxesWithVariousParameters(pStrFnName, {
        pWhereClause: pWhereClause
    }, pDivName, pCheckboxNameAttr
        , function () {
            HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
            FadePageCover(false);
        }
        , (pDefaults.IsRepeatChargeTypeName ? 3 : 1) //pCodeOrName
        , "col-sm-3"/*pColumnSize*/);

    $("#btn-SearchCharges").attr("onclick", "Receivables_GetAvailableCharges();");
    if (pDefaults.UnEditableCompanyName == "MED") {
        $("#btnSelectChargesApply").attr("onclick", "ReceivablesDraft_InsertListWithoutValues(false);");
    } else {
        $("#btnSelectChargesApply").attr("onclick", "Receivables_InsertListWithoutValues(false);");
    }
    //FillReceivablesModalTableControls(pStrFnName, pWhereClause, pDivName, ptblModalName, pCheckboxNameAttr, true //pIsInsert
    //    , false /*pIsEditInvoice*/, function () {
    //        HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
    //        $("#btnSelectChargesApply").attr("onclick", "Receivables_InsertListWithValues(false);");
    //    });
    //$("#btn-SearchCharges").attr("onclick", "Receivables_GetAvailableCharges();");
}
function Receivables_EditByDblClick(pID) {
    jQuery("#EditReceivableModal").modal("show");
    Receivables_FillControls(pID);
}
function Receivables_MultiRowEdit() {
    debugger;
    //ClearAll("#SelectChargesModal"); // to use it put it in a fn that calls it coz txtSearch is deleted before search is executed
    var pStrFnName = "/api/Receivables/LoadAll";
    var pDivName = "divSelectCharges";//div name to be filled
    var ptblModalName = "tblModalReceivables";
    var pCheckboxNameAttr = "cbSelectReceivables";
    var pWhereClause = "";
    $("#" + pDivName).html("");
    pWhereClause += " WHERE IsDeleted = 0 AND InvoiceID IS NULL AND DraftInvoiceID IS NULL AND AccNoteID IS NULL AND OperationID = " + $("#hShipmentID").val();
    //pWhereClause += ($("#hQuotationRouteID").val() == 0 ? "" : " AND GeneratingQRID = " + $("#hQuotationRouteID").val());
    //pWhereClause += " AND (ChargeTypeCode LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%' OR ChargeTypeName LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%') ";
    //pWhereClause += " ORDER BY ChargeTypeName ";

    FillReceivablesModalTableControls(pStrFnName, pWhereClause, pDivName, ptblModalName, pCheckboxNameAttr, false /*pIsInsert*/, false /*pIsInvoiceEdit*/
        , function () {
            HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
            $(".tblModalReceivableBillTo").addClass("hide");
            $(".ClassBill").addClass("hide");
        });

    $("#btn-SearchCharges").attr("onclick", "Receivables_MultiRowEdit();");
    $("#btnSelectChargesApply").attr("onclick", "Receivables_UpdateList(false, 0, false);");//parameters are(pSaveAndNew, pInvoiceID, pIsRemoveItems)
}
function Receivables_CurrencyChanged() {
    $("#txtReceivableExchangeRate").val($("#slReceivableCurrency option:selected").attr("MasterDataExchangeRate"));
    if ($("#hDefaultCurrencyID").val() == $("#slReceivableCurrency").val())
        $("#txtReceivableExchangeRate").attr("disabled", "disabled");
    else
        $("#txtReceivableExchangeRate").removeAttr("disabled");
}
function Receivables_Update(pSaveandAddNew) {
    debugger;
    //if ($("#txtReceivableAmount").val()) //check that decimal doesn't contain 2 decimal pts
    //{
    if (!isValidDate($("#txtReceivableIssueDate").val().trim(), 1) && $("#txtReceivableIssueDate").val().trim() != "")
        swal(strSorry, strCheckDates);
    else if ($("#txtReceivableExchangeRate").val() == "" || parseFloat($("#txtReceivableExchangeRate").val()) == 0
        || (parseInt($("#txtReceivableExchangeRate").val()) == 1 && pDefaults.CurrencyID != ($("#slReceivableCurrency").val())))
        swal("Sorry", "Please, check exchange rate.");
    else InsertUpdateFunction("form", "/api/Receivables/Update", {
        pSavedFrom: 0 //pSavedFrom=10 : saved from Operations
        ,
        pOperationContainersAndPackagesID: $("#slPayableTank").val() == "" ? 0 : $("#slPayableTank").val()
        ,
        pIsReceipt: $("#cbIsReceipt").prop("checked")
        ,
        pHouseBillID: 0

        ,
        pID: $("#hReceivableID").val()
        //, pMeasurementID: $("#txtCalculationType").attr("MeasurementID")
        ,
        pOperationID: $("#hShipmentID").val()
        ,
        pChargeTypeID: $("#slReceivableChargeType").val() == "" ? 0 : $("#slReceivableChargeType").val() //$("#txtReceivableType").attr("ChargeTypeID")
        ,
        pMeasurementID: $('#slReceivableUOM option:selected').val() != ""
            ? $('#slReceivableUOM option:selected').val()
            : 0
        //, pContainerTypeID: ((($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked')) && $('#slReceivableUOM option:selected').val() != "")
        //    ? $('#slReceivableUOM option:selected').val()
        //    : 0)
        ,
        pContainerTypeID: 0
        //, pPackageTypeID: ((($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked')) && $('#slReceivableUOM option:selected').val() != "")
        //    ? $('#slReceivableUOM option:selected').val()
        //    : 0)
        ,
        pPOrC: ($('#slReceivablePOrC option:selected').val() == "" ? 0 : $('#slReceivablePOrC option:selected').val())
        ,
        pSupplierID: 0//($('#slReceivableSupplier option:selected').val() == "" ? 0 : $('#slReceivableSupplier option:selected').val())
        ,
        pQuantity: ($("#txtReceivableQuantity").val().trim() == "" ? 0 : $("#txtReceivableQuantity").val().trim())
        ,
        pCostPrice: ($("#txtReceivableUnitPrice").val().trim() == "" ? 0 : $("#txtReceivableUnitPrice").val().trim())
        ,
        pCostAmount: ($("#txtReceivableAmount").val().trim() == "" ? 0 : $("#txtReceivableAmount").val().trim())
        ,
        pSalePrice: ($("#txtReceivableUnitPrice").val().trim() == "" ? 0 : $("#txtReceivableUnitPrice").val().trim())

        ,
        pAmountWithoutVAT: $("#txtReceivableAmountWithoutVAT").val() == "" ? 0 : $("#txtReceivableAmountWithoutVAT").val()
        ,
        pTaxTypeID: $("#slReceivableTax").val() == "" ? 0 : $("#slReceivableTax").val()
        ,
        pTaxPercentage: $("#txtReceivableTaxPercentage").val() == "" ? 0 : $("#txtReceivableTaxPercentage").val()
        ,
        pTaxAmount: $("#txtReceivableTaxAmount").val() == "" ? 0 : $("#txtReceivableTaxAmount").val()
        ,
        pDiscountTypeID: $("#slReceivableDiscount").val() == "" ? 0 : $("#slReceivableDiscount").val()
        ,
        pDiscountPercentage: $("#txtReceivableDiscountPercentage").val() == "" ? 0 : $("#txtReceivableDiscountPercentage").val()
        ,
        pDiscountAmount: $("#txtReceivableDiscountAmount").val() == "" ? 0 : $("#txtReceivableDiscountAmount").val()

        ,
        pSaleAmount: ($("#txtReceivableAmount").val().trim() == "" ? 0 : $("#txtReceivableAmount").val().trim())
        ,
        pExchangeRate: ($("#txtReceivableExchangeRate").val().trim() == "" ? 0 : $("#txtReceivableExchangeRate").val().trim())
        ,
        pCurrencyID: ($('#slReceivableCurrency option:selected').val() == "" ? 0 : $('#slReceivableCurrency option:selected').val())
        ,
        pNotes: $("#txtReceivableNotes").val().toUpperCase().trim()

        ,
        pIssueDate: ($("#txtReceivableIssueDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtReceivableIssueDate").val().trim()))

        ,
        pSalePrice_Foreign: 0 //no change
        ,
        pExchangeRate_Foreign: 0 //no change
        ,
        pCurrencyID_Foreign: 0 //no change
        , pManualChargeType: "0"
        , pQuotationRouteID: $("#hQuotationRouteID").val()
        , pCategoryID: $('#slReceivableCategory').val() == "" || $('#slReceivableCategory').val() == null ? 0 : parseInt($('#slReceivableCategory').val())
        , pReceiptNumber: "0" //no change
        , pReceiptDate: "01/01/1900" //no change
    }, pSaveandAddNew, "EditReceivableModal", function () {
        OperationCharges_FillModal(); //Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val());
    });
    //}
    //else
    //    swal(strSorry, strCheckEntries, "warning");
}
function Receivables_UpdateList(pSaveandAddNew, pInvoiceID, pIsRemoveItems) { // if (pInvoiceID > 0) then this is  updating Invoice Items(called from invoices_update)
    debugger;
    var pSelectedReceivablesIDsToUpdate = "";
    if (pInvoiceID == 0) //this is called normally from the receivables edit modal
        pSelectedReceivablesIDsToUpdate = GetAllSelectedIDsAsStringWithNameAttr("cbSelectReceivables"); //i get from selected 
    else { //this is called from invoice update
        if (pIsRemoveItems) //here i get only the unchecked items coz the others will be deleted in the controllers
            pSelectedReceivablesIDsToUpdate = GetAllNOTSelectedIDsAsStringWithNameAttr("cbSelectInvoiceItems");
        else // here i get all IDs to handle the case of checking items then pressing save and not remove items
            pSelectedReceivablesIDsToUpdate = GetAllIDsAsStringWithNameAttr("tblModalInvoiceItems", "cbSelectInvoiceItems");
    }
    var ArrayOfIDs = pSelectedReceivablesIDsToUpdate.split(',');
    var pPOrCList = "";
    var pUOMList = "";
    var pQuantityList = "";
    var pSalePriceList = "";

    var pAmountWithoutVATList = "";
    var pTaxTypeIDList = "";
    var pTaxPercentageList = "";
    var pTaxAmountList = "";
    var pDiscountTypeIDList = "";
    var pDiscountPercentageList = "";
    var pDiscountAmountList = "";

    var pSaleAmountList = "";
    var pExchangeRateList = "";
    var pCurrencyList = "";
    var pViewOrderList = "";
    var _IsZeroExchangeRate = false;
    if (pSelectedReceivablesIDsToUpdate != "") {
        var NumberOfSelectRows = ArrayOfIDs.length;
        for (i = 0; i < NumberOfSelectRows; i++) {
            var currentRowID = ArrayOfIDs[i];
            if ($("#txtTblModalReceivableExchangeRate" + currentRowID).val() == undefined || $("#txtTblModalReceivableExchangeRate" + currentRowID).val() == "" || parseFloat($("#txtTblModalReceivableExchangeRate" + currentRowID).val()) == 0
                || (parseFloat($("#txtTblModalReceivableExchangeRate" + currentRowID).val()) == 1 && pDefaults.CurrencyID != ($("#slReceivableCurrency" + currentRowID).val())))
                _IsZeroExchangeRate = true;

            pPOrCList += ((pPOrCList == "") ? "" : ",") + ($("#slReceivablePOrC" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#slReceivablePOrC" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#slReceivablePOrC" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pUOMList += ((pUOMList == "") ? "" : ",") + ($("#slReceivableUOM" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#slReceivableUOM" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#slReceivableUOM" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pQuantityList += ((pQuantityList == "") ? "" : ",") + ($("#txtTblModalReceivableQuantity" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableQuantity" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableQuantity" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pSalePriceList += ((pSalePriceList == "") ? "" : ",") + ($("#txtTblModalReceivableSalePrice" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableSalePrice" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableSalePrice" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());

            pAmountWithoutVATList += ((pAmountWithoutVATList == "") ? "" : ",") + ($("#txtTblModalReceivableAmountWithoutVAT" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableAmountWithoutVAT" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableAmountWithoutVAT" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pTaxTypeIDList += ((pTaxTypeIDList == "") ? "" : ",") + ($("#slReceivableTax" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#slReceivableTax" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#slReceivableTax" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pTaxPercentageList += ((pTaxPercentageList == "") ? "" : ",") + ($("#txtTblModalReceivableTaxPercentage" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableTaxPercentage" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableTaxPercentage" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pTaxAmountList += ((pTaxAmountList == "") ? "" : ",") + ($("#txtTblModalReceivableTaxAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableTaxAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableTaxAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pDiscountTypeIDList += ((pDiscountTypeIDList == "") ? "" : ",") + ($("#slReceivableDiscount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#slReceivableDiscount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#slReceivableDiscount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pDiscountPercentageList += ((pDiscountPercentageList == "") ? "" : ",") + ($("#txtTblModalReceivableDiscountPercentage" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableDiscountPercentage" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableDiscountPercentage" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pDiscountAmountList += ((pDiscountAmountList == "") ? "" : ",") + ($("#txtTblModalReceivableDiscountAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableDiscountAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableDiscountAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());

            pSaleAmountList += ((pSaleAmountList == "") ? "" : ",") + ($("#txtTblModalReceivableSaleAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableSaleAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableSaleAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pExchangeRateList += ((pExchangeRateList == "") ? "" : ",") + ($("#txtTblModalReceivableExchangeRate" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableExchangeRate" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableExchangeRate" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pCurrencyList += ((pCurrencyList == "") ? "" : ",") + ($("#slReceivableCurrency" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#slReceivableCurrency" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#slReceivableCurrency" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pViewOrderList += ((pViewOrderList == "") ? "" : ",") + ($("#txtTblModalReceivableViewOrder" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableViewOrder" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableViewOrder" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
        }
    }
    if (_IsZeroExchangeRate) {
        swal("Sorry", "Please, check exchange rate.");
        FadePageCover(false);
    } else {
        if (pSelectedReceivablesIDsToUpdate != "")
            InsertSelectedCheckboxItems_Post("/api/Receivables/UpdateList"
                , {
                    "pSelectedReceivablesIDsToUpdate": pSelectedReceivablesIDsToUpdate
                    , "pPOrCList": pPOrCList
                    , "pUOMList": pUOMList
                    , "pQuantityList": pQuantityList
                    , "pSalePriceList": pSalePriceList

                    , "pAmountWithoutVATList": pAmountWithoutVATList
                    , "pTaxTypeIDList": pTaxTypeIDList
                    , "pTaxPercentageList": pTaxPercentageList
                    , "pTaxAmountList": pTaxAmountList
                    , "pDiscountTypeIDList": pDiscountTypeIDList
                    , "pDiscountPercentageList": pDiscountPercentageList
                    , "pDiscountAmountList": pDiscountAmountList

                    , "pSaleAmountList": pSaleAmountList
                    , "pExchangeRateList": pExchangeRateList
                    , "pCurrencyList": pCurrencyList
                    , "pViewOrderList": pViewOrderList
                    , "pInvoiceID": pInvoiceID //if pInvoiceID==0 then its not used else this is invoice items update
                    , "pQuotationRouteID": pDefaults.UnEditableCompanyName == "MED" ? $("#hQuotationRouteID").val() : 0
                }
                , pSaveandAddNew
                , "SelectChargesModal" //pModalID
                , function () { /*Receivables_GetAvailableCharges();*/
                }
                , function () {
                    OperationCharges_FillModal(); //Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val());
                });
        else
            swal(strSorry, "No available items to be updated.");
    }
}
function CalculateReceivablesAmount() {
    var decAmountWithoutVAT = 0;
    var decTaxAmount = 0;
    var decTaxPercentage = 0.0;
    var decDiscountAmount = 0;
    var decDiscountPercentage = 0.0;

    decAmountWithoutVAT = $("#txtReceivableQuantity").val() * $("#txtReceivableUnitPrice").val();
    $("#txtReceivableAmountWithoutVAT").val(decAmountWithoutVAT);
    decTaxPercentage = $("#slReceivableTax option:selected").attr("CurrentPercentage");
    decTaxAmount = decAmountWithoutVAT * decTaxPercentage / 100;
    decDiscountPercentage = $("#slReceivableDiscount option:selected").attr("CurrentPercentage");
    decDiscountAmount = decAmountWithoutVAT * decDiscountPercentage / 100;

    $("#txtReceivableTaxPercentage").val(decTaxPercentage);
    $("#txtReceivableTaxAmount").val(decTaxAmount.toFixed(2));
    $("#txtReceivableDiscountPercentage").val(decDiscountPercentage);
    $("#txtReceivableDiscountAmount").val(decDiscountAmount.toFixed(2));
    $("#txtReceivableAmount").val((Math.round(((parseFloat(decAmountWithoutVAT) + parseFloat(decTaxAmount) - parseFloat(decDiscountAmount))) * 100) / 100).toFixed(2));
}
function Receivables_Row_CalculateReceivablesAmount(pRowID, pIsInsertChoice) {
    debugger;
    var rowQuantity = $("#txtTblModalReceivableQuantity" + pRowID).val();
    var rowSalePrice = $("#txtTblModalReceivableSalePrice" + pRowID).val();

    var decAmountWithoutVAT = 0;
    var decTaxAmount = 0;
    var decTaxPercentage = 0.0;
    var decDiscountAmount = 0;
    var decDiscountPercentage = 0.0;

    decAmountWithoutVAT = rowQuantity * rowSalePrice;
    $("#txtTblModalReceivableAmountWithoutVAT" + pRowID).val(decAmountWithoutVAT);
    if (pDefaults.IsTaxOnItems && !pIsInsertChoice/*to not calc. tax in case of Gen from Payables*/) {
        decTaxPercentage = $("#slReceivableTax" + pRowID + " option:selected").attr("CurrentPercentage");
        decTaxAmount = decAmountWithoutVAT * decTaxPercentage / 100;
        decDiscountPercentage = $("#slReceivableDiscount" + pRowID + " option:selected").attr("CurrentPercentage");
        decDiscountAmount = decAmountWithoutVAT * decDiscountPercentage / 100;
    }
    $("#txtTblModalReceivableTaxPercentage" + pRowID).val(decTaxPercentage);
    $("#txtTblModalReceivableTaxAmount" + pRowID).val(decTaxAmount.toFixed(2));
    $("#txtTblModalReceivableDiscountPercentage" + pRowID).val(decDiscountPercentage);
    $("#txtTblModalReceivableDiscountAmount" + pRowID).val(decDiscountAmount.toFixed(2));
    $("#txtTblModalReceivableSaleAmount" + pRowID).val((decAmountWithoutVAT + decTaxAmount - decDiscountAmount).toFixed(2)); //$("#txtTblModalReceivableSaleAmount" + pRowID).val((decAmountWithoutVAT + decTaxAmount).toFixed(2));

    if (pIsInsertChoice) //incase of insert check and uncheck the checkbox to in GetSelectedIDs incase of insert
        Receivables_txtTblModalSaleAmount_Changed(pRowID, pIsInsertChoice);
}
function Receivables_txtTblModalCurrency_Changed(pRowID, pIsInvoiceEdit) {
    $("#txtTblModalReceivableExchangeRate" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + pRowID).val($("#slReceivableCurrency" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + pRowID + " option:selected").attr("MasterDataExchangeRate"));
    if ($("#hDefaultCurrencyID").val() == $("#slReceivableCurrency" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + pRowID).val())
        $("#txtTblModalReceivableExchangeRate" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + pRowID).attr("disabled", "disabled");
    else
        $("#txtTblModalReceivableExchangeRate" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + pRowID).removeAttr("disabled");
}
function Receivables_txtTblModalSaleAmount_Changed(pRowID, pIsInsertChoice) {
    if (pIsInsertChoice) { //if not insert then all IDs will be updated
        var varReceivableSaleAmount = $("#tblModalReceivables tr[ID='" + pRowID + "']").find('input[name=txtTblModalReceivableSaleAmount]').val();
        if (varReceivableSaleAmount != 0 && varReceivableSaleAmount != "")
            $("#tblModalReceivables tr[ID='" + pRowID + "']").find('input[name=cbSelectReceivables]').prop("checked", true);
        else
            $("#tblModalReceivables tr[ID='" + pRowID + "']").find('input[name=cbSelectReceivables]').prop("checked", false);
    }
}
function Receivables_DeleteList(callback) {
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblReceivables') != "")
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
                DeleteListFunction("/api/Receivables/DeleteFromModal"
                    , {
                        pReceivablesIDs: GetAllSelectedIDsAsString('tblReceivables'), pOperationID: $("#hShipmentID").val()
                    }
                    , function () {
                        OperationCharges_FillModal();
                    });
            });
    //DeleteListFunction("/api/Receivables/Delete", { "pReceivablesIDs": GetAllSelectedIDsAsString('tblReceivables') }, function () { LoadViews("OperationsEdit", null, $("#hOperationID").val()); });
}
function OperationCharges_FillModal() {
    debugger;
    $("#OperationChargeModal").removeClass("hide");
    jQuery("#ShipmentModal").modal("hide");
    jQuery("#OperationChargeModal").modal("show");

    FadePageCover(true);
    $("#tblPayables tbody").html("");
    $("#tblReceivables tbody").html("");
    $("#lblOperationChargeShown").html(": " + $("#slOperation option:selected").text());




    CallGETFunctionWithParameters("api/QuotationCharges/GetOperationPayablesAndReceivables"
        , {
            pOperationID: $("#hShipmentID").val()
            , pQuotationRouteID: 0
            , pOperationVehicleID: 0
            , pTruckingOrderID: 0
            , pCodeSearch: 0
        }
        , function (pData) {
            if (pData[0]) {
                var pPayables = JSON.parse(pData[1]);
                var pReceivables = JSON.parse(pData[2]);

                Payables_BindTableRows(pPayables);
                Receivables_BindTableRows(pReceivables);

            } else
                swal("Sorry", "Connection failed, please try again later.");
            FadePageCover(false);
        }
        , null);

}

/******************Receivables**************************/





/******************Performa**************************/



function SelectCharges() {
    FadePageCover(false);
    var pSelectedQRIDs = "";
    var pPrintedQuotationID = "";

    pSelectedQRIDs = GetAllSelectedIDsAsString("tblOperations");
            ClearAllTableRows("tblQuotationChargesToPrint");


    if (pSelectedQRIDs == "" || pSelectedQRIDs.includes(",")) {
        swal("Sorry", "Please, select one offer.");
        FadePageCover(false);
    } else {
        jQuery("#SelectChargesModaltoPerforma").modal("show");

        CallGETFunctionWithParameters(
            "/api/Quotations/LCLPerformaToPrint"
            , { pPrintedQuotationID: pPrintedQuotationID, pSelectedQRIDs: pSelectedQRIDs }
            , function (data) {
                debugger;
                if (data[0]) {
                    var pTblOperation = data[1];
                    var pTblPayables = data[2];
                    var pTblReceivables = data[3];


                    //QuotationCharges_BindTableRowsToPrint(pTblPayables, '(Payable)');
                    QuotationCharges_BindTableRowsToPrint(pTblReceivables, '');

                }
            }
            , null);


    }

}



function QuotationCharges_BindTableRowsToPrint(pCharges, suffix) {
    debugger;

    $.each(pCharges, function (i, item) {
        AppendRowtoTable("tblQuotationChargesToPrint",
            ("<tr ID='" + item.mID + "' " + (QECha) + ">"
                + "<td class='ChargeID'> <input name='Delete' type='checkbox' value='" + item.mID + "' /></td>"
                + "<td class='Charge' val='" + item.mChargeTypeID + "'>" + item.mChargeTypeName + " " + suffix + ((pDefaults.mIsRepeatChargeTypeName ? "(" + item.mChargeTypeCode + ")" : "")) + "</td>"

                + "</tr>")
        );


    });

    BindAllCheckboxonTable("tblQuotationChargesToPrint", "ChargeID", "cb-CheckAll-tblQuotationChargesToPrint");
    CheckAllCheckbox("HeaderDeleteQuotationChargeIDS");
}



function Quotations_Print(pOption) {
    debugger;

    FadePageCover(true);
  
    pSelectedQRIDs = GetAllSelectedIDsAsString("tblOperations");
    pPrintedQuotationID = GetAllSelectedIDsAsString("tblQuotationChargesToPrint");

    if (pPrintedQuotationID == "") {
        swal("Sorry", "Please, select at least one offer.");
        FadePageCover(false);
    } else {
        CallGETFunctionWithParameters(
            "/api/Quotations/LCLPerformaToPrint"
            , { pPrintedQuotationID: pPrintedQuotationID, pSelectedQRIDs: pSelectedQRIDs }
            , function (data) {
                debugger;
                if (data[0]) {

                    var pTblOperation = data[1];
                    var pTblPayables = data[4];
                    var pTblReceivables = data[5];
                    var _TodaysDateInDDMMYYYY = getTodaysDateInddMMyyyyFormat();
                    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
                    var TodaysDateInLetters = Date();
                    var ReportHTML = '';
                    var ReportHTMLHeader = '';
                    debugger;
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>' + 'House Perfroma' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo" style=" width: 30%; "/></div>';
                    var ReportHTMLtemp = ReportHTML;
                    ReportHTML = '';


                    ReportHTML += '         <div style="display:flex;align-items:center;justify-content:center;padding-top:70px;>';


                    ReportHTML += '             <h3 style="font-size:30px;" >'; '</h3>';

                    ReportHTML += '             <div style="font-size:30px;">' + 'Performa INVOICE.' + ' <span>' + (pTblOperation.mCode == 0 ? "" : pTblOperation.mCode) + '</span>' + '</div>';

                    ReportHTML += '              </div>';


                    ReportHTML += '            <div style="width:95%;margin:auto;margin-top:40px;display:flex;align-items:center;justify-content:space-between;">';


                    ReportHTML += '             <div style="width:50%;"><b>Date: </b>' + TodaysDateddMMyyyy + '</div>';



                    ReportHTML += '              </div>';

                    ReportHTML += '            <div style="width:95%;margin:auto;display:flex;align-items:center;justify-content:space-between;">';


                    ReportHTML += '             <div style="width:50%;"><b>Messers: </b>' + (pTblOperation.mNotify1Name == 0 ? "" : pTblOperation.mNotify1Name) + '</div>';


                    ReportHTML += '              </div>';

                    ReportHTML += '            <div style="width:95%;margin:auto;display:flex;align-items:center;justify-content:space-between;">';


                    ReportHTML += '             <div style="width:50%;"><b> Serial : </b>' + (pTblOperation.mQuotationCode == 0 ? "" : pTblOperation.mQuotationCode) + '</div>';


                    //ReportHTML += '             <div style="width:20%;"><b>Bill Dated: </b>' + 'test' + '</div>';


                    ReportHTML += '              </div>';

                    ReportHTML += '            <hr style="margin-top:0;margin-bottom:0;">';


                    ReportHTML += '            <div style="width:95%;margin:auto;display:flex;align-items:center;justify-content:space-between;">';


                    ReportHTML += '             <div style="width:50%;"><b>POL: </b>' + (pTblOperation.mPOLName == 0 ? "" : pTblOperation.mPOLName) + '</div>';


                    ReportHTML += '             <div style="width:45%;"><b>POD: </b>' + (pTblOperation.mPODName == 0 ? "" : pTblOperation.mPODName) + '</div>';


                    ReportHTML += '              </div>';
                    ReportHTML += '            <div style="width:95%;margin:auto;display:flex;align-items:center;justify-content:space-between;">';


                    ReportHTML += '             <div style="width:50%;"><b>Number of Packages : </b>' + (pTblOperation.mNumberOfPackages == 0 ? "" : pTblOperation.mNumberOfPackages) + 'x' + (pTblOperation.mPackageTypeName == 0 ? "" : pTblOperation.mPackageTypeName) + '</div>';


                    ReportHTML += '             <div style="width:45%;"><b>Weight: </b>' + (pTblOperation.mGrossWeight == 0 ? "" : pTblOperation.mGrossWeight) + '</div>';


                    ReportHTML += '              </div>';
                    ReportHTML += '            <div style="width:95%;margin:auto;display:flex;align-items:center;justify-content:space-between;">';


                    ReportHTML += '             <div style="width:50%;"><b>Volume : </b>' + (pTblOperation.mVolume == 0 ? "" : pTblOperation.mVolume) + '</div>';


                    //ReportHTML += '             <div style="width:45%;"><b>Equipment: </b>' + 'test' + '</div>';


                    ReportHTML += '              </div>';
                    ReportHTML += '            <div style="width:95%;margin:auto;display:flex;align-items:center;justify-content:space-between;">';
                    ReportHTML += '             <div style="width:50%;"><b>Terms: </b>' + (pTblOperation.mIncotermName == 0 ? "" : pTblOperation.mIncotermName) + '</div>';
                    ReportHTML += '              </div>';


                    ReportHTML += '            <div style="width:95%;margin:auto;display:flex;align-items:center;justify-content:space-between;">';
                    ReportHTML += '             <div style="width:45%;"><b>House No: </b>' + (pTblOperation.mHouseNumber == 0 ? "" : pTblOperation.mHouseNumber) + '</div>';
                    ReportHTML += '              </div>';
                    //ReportHTML += '            <div style="width:95%;margin:auto;display:flex;align-items:center;justify-content:space-between;">';




                    //ReportHTML += '             <div style="width:45%;"><b>Vessel: </b>' + 'test' + '</div>';


                    //ReportHTML += '              </div>';

                    ReportHTMLHeader = ReportHTML;
                    ReportHTML = ReportHTMLtemp + ReportHTML;

                    ReportHTML += '              </div>';
                    ReportHTML += '              </div>';

                    

                    ReportHTML += '            <div style="width:95%;margin:auto;margin-top:40px;">';
                    ReportHTML += '                 <div><b>(1) ' + (pTblOperation.mMoveTypeID == 0 ? "" : pTblOperation.mMoveTypeName) + '</b>'
                    ReportHTML += `</div><br>`;

                        ReportHTML += '                 <table id="tblOffer" class="table table-striped b-t b-light text-sm table-bordered m-t-n" style="border:solid #000 !important;">'; //the style is to fix disappearance of borders when printing with firefox
                        ReportHTML += '                     <thead>';
                        ReportHTML += '                         <th>Code</th>';
                        ReportHTML += '                         <th>Line</th>';
                        ReportHTML += '                         <th>Pickup Address</th>';
                        ReportHTML += '                         <th>POL</th>';
                        ReportHTML += '                         <th>POD</th>';
                        ReportHTML += '                         <th>Delivery Address</th>';
                        ReportHTML += '                         <th>T.T.</th>';
                        ReportHTML += '                         <th>FreeTime POL</th>';
                        ReportHTML += '                         <th>FreeTime POD</th>';
                        ReportHTML += '                         <th>Expiration</th>';
                        ReportHTML += '                     </thead>';
                        ReportHTML += '                     <tr>';
                   



                    ReportHTML += '                         <td>' + (pTblOperation.mCode == 0 ? "" : pTblOperation.mCode) + '</td>';
                    ReportHTML += '                         <td>' + (pTblOperation.mLineName == 0 ? pDefaults.UnEditableCompanyName : pTblOperation.mLineName) + '</td>';
                    ReportHTML += '                         <td>' + (pTblOperation.mPickupAddress == 0 ? "" : pTblOperation.mPickupAddress) + '</td>';
                    ReportHTML += '                         <td>' + (pTblOperation.mPOLName == 0 ? "" : pTblOperation.mPOLName) + '</td>';
                    ReportHTML += '                         <td>' + (pTblOperation.mPODName == 0 ? "" : pTblOperation.mPODName) + '</td>';
                    ReportHTML += '                         <td>' + (pTblOperation.mDeliveryAddress == 0 ? "" : pTblOperation.mDeliveryAddress) + '</td>';
                    ReportHTML += '                         <td>' + (pTblOperation.mTransientTime == 0 ? "" : pTblOperation.mTransientTime) + '</td>';
                    ReportHTML += '                         <td>' + (pTblOperation.mFreeTime == 0 ? "" : pTblOperation.mFreeTime) + '</td>';
                    //ReportHTML += '                         <td>' + ConvertDateFormat(GetDateWithFormatMDY(pTblOperation.mExpirationDate)) + '</td>';
                    ReportHTML += '                         <td>' + " " + '</td>';
                    ReportHTML += '                         <td>' + " " + '</td>';




                        ReportHTML += '                     </tr>';
                        ReportHTML += '                 </table>';
                        ReportHTML += `</div>`;


                 


                  if (pTblPayables.length != 0) {

                    ReportHTML += '            <div style="width:95%;margin:auto;margin-top:40px;">';
                      ReportHTML += '             <h4 style="margin-bottom:20px;margin-top:10px;font-weight:600;" >Payables:</h4>';

                    //#region Create Table Head
                    ReportHTML += '<div class="">';
                    ReportHTML += '                 <table id="tblCharges" class=" table table-striped b-t b-light text-sm table-bordered m-t-n" style="border:solid #000 important;">'; //the style is to fix disappearance of borders when printing with firefox
                    ReportHTML += '                     <thead>';
                    ReportHTML += '                     <th>Charge Details</th>';
                    ReportHTML += '                     <th>Qty</th>';
                    ReportHTML += '                     <th>' + 'Unit Price' + '</th>';
                    ReportHTML += '                     <th>' + 'Cost Price' + '</th>';
                    ReportHTML += '                     </thead>';

                    //#endregion

                      $.each((pTblPayables), function (i, item) {
                          ReportHTML += '                 <tr>';
                          ReportHTML += '                     <td>' + (item.mChargeTypeName == 0 ? "" : item.mChargeTypeName)  + '</td>';
                          ReportHTML += '                     <td>' + (item.mQuantity == 0 ? "" : item.mQuantity) + '</td>';
                          ReportHTML += '                     <td>' + (item.mCostPrice == 0 ? "" : item.mCostPrice) + '</td>';
                          ReportHTML += '                     <td>' + (item.mCostAmount == 0 ? "" : item.mCostAmount) + '</td>';
                          ReportHTML += '                 </tr>';


                      });

                    ReportHTML += '                 </table>';
                    ReportHTML += '                 </div>';

                    ReportHTML += `</div>`;

                    ReportHTML += `</div>`;
                  }


                    if (pTblReceivables.length != 0) {

                     


                            ReportHTML += '            <div style="width:95%;margin:auto;margin-top:40px;">';
                        //ReportHTML += '             <h4 style="margin-bottom:20px;margin-top:10px;font-weight:600;" >Receivables:</h4>';



                        //#region Create Table Head
                        ReportHTML += '<div class="">';
                        ReportHTML += '                 <table id="tblCharges" class=" table table-striped b-t b-light text-sm table-bordered m-t-n" style="border:solid #000 !important;">'; //the style is to fix disappearance of borders when printing with firefox
                        ReportHTML += '                     <thead>';
                        ReportHTML += '                     <th>Charge Details</th>';
                        ReportHTML += '                     <th>Qty</th>';
                        ReportHTML += '                     <th>' + 'Unit Price' + '</th>';
                        ReportHTML += '                     <th>' + 'Currency' + '</th>';
                        ReportHTML += '                     <th>' + 'Sale Price' + '</th>';
                        ReportHTML += '                     </thead>';

                        //#endregion
                        $.each((pTblReceivables), function (i, item) {
                        ReportHTML += '                 <tr>';
                            ReportHTML += '                     <td>' + (item.mChargeTypeName == 0 ? "" : item.mChargeTypeName) + '</td>';
                            ReportHTML += '                     <td>' + (item.mQuantity == 0 ? "" : item.mQuantity) + '</td>';
                            ReportHTML += '                     <td>' + (item.mSalePrice == 0 ? "" : item.mSalePrice) + '</td>';
                            ReportHTML += '                     <td>' + (item.mCurrencyCode == 0 ? "" : item.mCurrencyCode) + '</td>';
                            ReportHTML += '                     <td>' + (item.mSaleAmount == 0 ? "" : item.mSaleAmount) + '</td>';
                        ReportHTML += '                 </tr>';


                        });

                        ReportHTML += '                 </table>';
                        ReportHTML += '                 </div>';
                        $.each((pTblReceivables), function (i, item) {

                            if (item.mCurrencyCode == 'EGP')
                            {
                                totalEGB += item.mSaleAmount;

                            }
                            if (item.mCurrencyCode == 'USD')
                            {
                                 totalUSD += item.mSaleAmount;

                            }
                            if (item.mCurrencyCode == 'EUR')
                            {
                                 totalEUR += item.mSaleAmount;

                            }
                            if (item.mCurrencyCode == 'GBP')
                            {
                                 totalGBP += item.mSaleAmount;

                            }

                        });
               
               
               
                        ReportHTML += '                         <div class="col-xs-12 " style=" text-align: right; ">';

                        if (totalEGB>0)
                            ReportHTML += '                             <b>Total EGP:</b> ' + totalEGB + 'EGP</br>';
                        if (totalUSD>0)
                            ReportHTML += '                             <b>Total USD:</b> ' + totalUSD + 'USD</br>';
                        if (totalEUR > 0)
                            ReportHTML += '                             <b>Total EUR:</b> ' + totalEUR + 'EUR</br>';
                        if (totalGBP > 0)
                          ReportHTML += '                             <b>Total GBP:</b> ' + totalGBP + 'GBP</br>';

                        totalEGB = 0;
                        totalUSD = 0;
                        totalEUR = 0;
                        totalGBP = 0;


                        ReportHTML += `</div>`;
                        ReportHTML += `</div>`;

                        ReportHTML += `</div>`;
                   }


              
              }



                ReportHTML += '            <div style="width:95%;margin:auto;margin-top:50px;">';


                ReportHTML += '<div class="' + ($("#cbAllIn").prop("checked") ? "hide" : " ") + '">';
                ReportHTML += '                 <table id="tblCharges" class=" table table-striped b-t b-light text-sm  m-t-n" style="border:solid #000 !important;">'; //the style is to fix disappearance of borders when printing with firefox
                ReportHTML += '                     <thead style="background-color:#808080;color:white;text-decoration:underline;">';
                ReportHTML += '                     <th>Banks</th>';
                ReportHTML += '                     <th>QNB</th>';
                ReportHTML += '                     <th>HSBC</th>';
                ReportHTML += '                     <th>CIB</th>';
                ReportHTML += '                     <th>AUDI</th>';
                ReportHTML += '                     <th>SAIB</th>';
                ReportHTML += '                     </thead>';
                if (window.location.href.includes("cpworld")) {
                    ReportHTML += '                 <tr>';
                    ReportHTML += '                     <td style="background-color:#808080;color:white;font-weight:600;text-decoration:underline;">EGP</td>';
                    ReportHTML += '                     <td></td>';
                    ReportHTML += '                     <td>004-154183-001 </td>';
                    ReportHTML += '                     <td>100024532897</td>';
                    ReportHTML += '                     <td></td>';
                    ReportHTML += '                     <td></td>';
                    ReportHTML += '                 </tr>';
                    ReportHTML += '                 <tr>';
                    ReportHTML += '                     <td style="background-color:#808080;color:white;font-weight:600;text-decoration:underline;">USD</td>';
                    ReportHTML += '                     <td></td>';
                    ReportHTML += '                     <td>004-154183-110</td>';
                    ReportHTML += '                     <td>100024532849</td>';
                    ReportHTML += '                     <td></td>';
                    ReportHTML += '                     <td></td>';
                    ReportHTML += '                 </tr>';
                    ReportHTML += '                 <tr>';
                    ReportHTML += '                     <td style="background-color:#808080;color:white;font-weight:600;text-decoration:underline;">EUR</td>';
                    ReportHTML += '                     <td></td>';
                    ReportHTML += '                     <td>004-154183-111</td>';
                    ReportHTML += '                     <td>100024532873</td>';
                    ReportHTML += '                     <td></td>';
                    ReportHTML += '                     <td> </td>';
                    ReportHTML += '                 </tr>';
                    ReportHTML += '                 <tr>';
                    ReportHTML += '                     <td style="background-color:#808080;color:white;font-weight:600;text-decoration:underline;">GBP </td>';
                    ReportHTML += '                     <td></td>';
                    ReportHTML += '                     <td>004-154183-112</td>';
                    ReportHTML += '                     <td></td>';
                    ReportHTML += '                     <td></td>';
                    ReportHTML += '                     <td></td>';
                    ReportHTML += '                 </tr>';
                } else {
                       ReportHTML += '                 <tr>';
                    ReportHTML += '                     <td style="background-color:#808080;color:white;font-weight:600;text-decoration:underline;">EGP</td>';
                    ReportHTML += '                     <td>104-20318962760-30</td>';
                    ReportHTML += '                     <td>004-100145-001 </td>';
                    ReportHTML += '                     <td>100018529682</td>';
                    ReportHTML += '                     <td>004117530001</td>';
                    ReportHTML += '                     <td>1720-3023821-10010</td>';
                    ReportHTML += '                 </tr>';
                    ReportHTML += '                 <tr>';
                    ReportHTML += '                     <td style="background-color:#808080;color:white;font-weight:600;text-decoration:underline;">USD</td>';
                    ReportHTML += '                     <td>104-20318965949-66</td>';
                    ReportHTML += '                     <td>004-100145-110</td>';
                    ReportHTML += '                     <td>100032014547</td>';
                    ReportHTML += '                     <td>004117530002</td>';
                    ReportHTML += '                     <td>1701-3023821-10010</td>';
                    ReportHTML += '                 </tr>';
                    ReportHTML += '                 <tr>';
                    ReportHTML += '                     <td style="background-color:#808080;color:white;font-weight:600;text-decoration:underline;">EUR</td>';
                    ReportHTML += '                     <td>104-20318965951-60 </td>';
                    ReportHTML += '                     <td>004-100145-111</td>';
                    ReportHTML += '                     <td>100032014587</td>';
                    ReportHTML += '                     <td>004117530003</td>';
                    ReportHTML += '                     <td> 1703-3023821-10010</td>';
                    ReportHTML += '                 </tr>';
                    ReportHTML += '                 <tr>';
                    ReportHTML += '                     <td style="background-color:#808080;color:white;font-weight:600;text-decoration:underline;">GBP </td>';
                    ReportHTML += '                     <td></td>';
                    ReportHTML += '                     <td>004-100145-112</td>';
                    ReportHTML += '                     <td>100032014598</td>';
                    ReportHTML += '                     <td></td>';
                    ReportHTML += '                     <td></td>';
                    ReportHTML += '                 </tr>';


                }
                ReportHTML += '                 </table>';
                ReportHTML += '                 </div>';
                ReportHTML += '                 </div>';
                ReportHTML += '                 </div>';


                ReportHTML += '            <div style="width:95%;margin:auto;">';

                if (window.location.href.includes("cpworld"))
                    ReportHTML += '             <h5 style="color:red;width:57%;text-align:center;" >في حالة إصدار شيكات بالمبالغ المستحقة برجاء إصدارها بإسم /سى بى ورلد لخدمات الشحن الدولى </h5>';
                else
                    ReportHTML += '             <h5 style="color:red;width:57%;text-align:center;" >في حالة إصدار شيكات بالمبالغ المستحقة برجاء إصدارها بإسم / يونيفريت جلوبال لوجيستيكس لخدمات الشحن الدولي </h5>';

                ReportHTML += '             <h6 style="margin-bottom:2px;margin-top:2px;" >Should you have any questions or inquiries please do not hesitate to contact us. Our Best attention at all times is yours. </h6>';
                ReportHTML += '             <h6 style="margin-bottom:3px;margin-top:3px;" >Looking forward to hearing from you. </h6>';
                ReportHTML += '             <h6 style="margin-bottom:3px;margin-top:3px;" >Sincerely,</p>';
                if (window.location.href.includes("cpworld")) {
                    ReportHTML += '             <h6 style="margin-bottom:3px;margin-top:3px;" >CP Customer Service Team</h6>';
                } else
                    ReportHTML += '             <h6 style="margin-bottom:3px;margin-top:3px;" >Unifreight Customer Service Team</h6>';

                if (window.location.href.includes("cpworld"))
                    ReportHTML += '             <a href= "mailto: csr@eg.cpworldgroup.com" style="font-size:14px;color:blue;text-decoration:underline;">csr@eg.cpworldgroup.com</a>';
                    else
                    ReportHTML += '             <a href= "mailto: cs@unifreight.com.eg" style="font-size:14px;color:blue;text-decoration:underline;">cs@unifreight.com.eg</a>';


                ReportHTML += '            <div style="width:100%;margin:auto;display:flex;align-items:center;justify-content:space-between;">';

                ReportHTML += '             <p style="width:50%;"margin-bottom:3px;margin-top:3px;" >All Business is transacted as per company standard trading conditions – Copy available up on request</p>';



                ReportHTML += '             <div style="width:14%;display:flex;height:50px;align-items:center;justify-content:space-evenly;">';
                ReportHTML += '            <img style="width:20%;" src="../../../Content/Images/CompanyLogo-EIFFA.jpg" alt="Logo">';
                ReportHTML += '            <img style="width:20%;" src="../../../Content/Images/CompanyLogo-LATA.jpg" alt="Logo">';
                ReportHTML += '            <img style="width:20%;" src="../../../Content/Images/CompanyLogo-Fiata.jpg" alt="Logo">';



                ReportHTML += '              </div>';

                ReportHTML += '              </div>';
                ReportHTML += '             <h6 style="margin-bottom:20px;margin-top:10px;color:green" >Please consider the environment before printing this mail. It takes 24 trees to create 1 ton of virgin office paper*</h6>';
                if (pOption == "Print" || pOption == "PrintAdditionalContainer") {
                    var mywindow = window.open('', '_blank');
                    mywindow.document.write(ReportHTML);
                    mywindow.document.close();
                    FadePageCover(false);
                }
                if (pOption == "Download" || pOption == "PrintAdditionalContainer") {
                    var mywindow = window.open('', '_blank');
                    mywindow.document.write(ReportHTML);
                    mywindow.document.close();
                    mywindow.print();
                    FadePageCover(false);
                }

            }
            , null);

    }


}


/******************Performa**************************/

function Operations_ShipmentTypeChanged_LCL() {
    debugger;
    
        /*if ($('input[name=cbShipmentType]:checked').val() == 1 //FCL or FTL
            || $('input[name=cbShipmentType]:checked').val() == 3) {
            $("#divLCL").addClass("hide");
            $("#divFCL").removeClass("hide");
        }
        else {
            $("#divFCL").addClass("hide");
            $("#divLCL").removeClass("hide");
            $("#lblChargeableWeight").addClass("hide");
            $("#lblWtMsr").removeClass("hide");
        }
        //ShowHide Consolidation Option
        if ($("#cbIsMaster").prop("checked")) {
            $("#divConsolidationOption").removeClass("hide");
            if (pDefaults.UnEditableCompanyName == "TLS") {
                $("#hideVechile").removeClass("hide");
            }

        }
        else {
            $("#divConsolidationOption").addClass("hide");
            if (pDefaults.UnEditableCompanyName == "TLS") {
                $("#hideVechile").addClass("hide");
            }

        }*/
}


function InitializeShipmentCustomersSelectSearch_LCL() {
    Select2OnlineSearch("slConsigneesForBLDocuments", "/api/Customers/LoadAllCustomersForSlReadyCustomers", function (params) {
        debugger;
        var query = {
            pWhereClauseWithMinimalColumns: " WHERE IsInactive=0 AND IsConsignee=1 AND Name like N'%" + params.term.trim() + "%'",
            pOrderBy: "Name",
            pDummy: false
        }

        return query;
    }, function (data) {

        var d = JSON.parse(data[0]);
        let options = $.map(d, function (item) {
            return {
                text: item.Name,
                id: item.ID,
                value: item.ID
            };
        });
        //options.push({ text: "Empty Select", id: "", value: "" });
        return {
            results: options
        };
    }, 3, 2000, true, {
        id: 0,
        text: "<--Select-->"
    });
    Select2OnlineSearch("slConsignees2", "/api/Customers/LoadAllCustomersForSlReadyCustomers", function (params) {
        debugger;
        var query = {
            pWhereClauseWithMinimalColumns: " WHERE IsInactive=0 AND IsConsignee=1 AND Name like N'%" + params.term.trim() + "%'",
            pOrderBy: "Name",
            pDummy: false
        }

        return query;
    }, function (data) {

        var d = JSON.parse(data[0]);
        let options = $.map(d, function (item) {
            return {
                text: item.Name,
                id: item.ID,
                value: item.ID
            };
        });
        return {
            results: options
        };
    }, 3, 2000, true, {
        id: 0,
        text: "<--Select-->"
    });
    Select2OnlineSearch("slShippersForBLDocuments", "/api/Customers/LoadAllCustomersForSlReadyCustomers", function (params) {
        debugger;
        var query = {
            pWhereClauseWithMinimalColumns: " WHERE IsInactive=0 AND IsShipper=1 AND Name like N'%" + params.term.trim() + "%'",
            pOrderBy: "Name",
            pDummy: false
        }

        return query;
    }, function (data) {

        var d = JSON.parse(data[0]);
        let options = $.map(d, function (item) {
            return {
                text: item.Name,
                id: item.ID,
                value: item.ID
            };
        });
        return {
            results: options
        };
    }, 3, 2000, true, {
        id: 0,
        text: "<--Select-->"
    });
    Select2OnlineSearch("slNotifyForBLDocuments", "/api/Customers/LoadAllCustomersForSlReadyCustomers", function (params) {
        debugger;
        var query = {
            pWhereClauseWithMinimalColumns: " WHERE IsInactive=0 AND IsConsignee=1 AND Name like N'%" + params.term.trim() + "%'",
            pOrderBy: "Name",
            pDummy: false
        }

        return query;
    }, function (data) {

        var d = JSON.parse(data[0]);
        let options = $.map(d, function (item) {
            return {
                text: item.Name,
                id: item.ID,
                value: item.ID
            };
        });
        return {
            results: options
        };
    }, 3, 2000, true, {
        id: 0,
        text: "<--Select-->"
    });
    Select2OnlineSearch("slForwarderBLDocuments", "/api/Customers/LoadAllCustomersForSlReadyCustomers", function (params) {
        debugger;
        var query = {
            pWhereClauseWithMinimalColumns: " WHERE IsInactive=0 AND IsConsignee=1 AND Name like N'%" + params.term.trim() + "%'",
            pOrderBy: "Name",
            pDummy: false
        }

        return query;
    }, function (data) {

        var d = JSON.parse(data[0]);
        let options = $.map(d, function (item) {
            return {
                text: item.Name,
                id: item.ID,
                value: item.ID
            };
        });
        return {
            results: options
        };
    }, 3, 2000, true, {
        id: 0,
        text: "<--Select-->"
    });
    Select2OnlineSearch("slPOLID_TransportID", "/api/Ports/LoadAll", function (params) {
        debugger;
        var query = {
            pWhereClause: " WHERE  Name like N'%" + params.term.trim() + "%'",
            pOrderBy: "Name",
            pDummy: false
        }

        return query;
    }, function (data) {

        var d = JSON.parse(data[0]);
        let options = $.map(d, function (item) {
            return {
                text: item.Name,
                id: item.ID,
                value: item.ID
            };
        });
        //options.push({ text: "Empty Select", id: "", value: "" });
        return {
            results: options
        };
    }, 3, 2000, true, {
        id: 0,
        text: "<--Select-->"
    });
    $("#slAgentsForBLDocuments").css({ "width": "100%" }).select2();
    $("#slPickupCountry").css({ "width": "100%" }).select2();
    $("#slPickupCity").css({ "width": "100%" }).select2();
    $("#slPickupCountryNEW").css({ "width": "100%" }).select2();
    $("#slPickupCityNEW").css({ "width": "100%" }).select2();
    $("#slDeliveryCountry").css({ "width": "100%" }).select2();
    $("#slDeliveryCountry").parent().css("clear", "both");
    $("#slDeliveryCity").css({ "width": "100%" }).select2();
    $("#slOperationSalesmanForBLDocuments").css({ "width": "100%" }).select2();
    $("#slOperationOperationManID").css({ "width": "100%" }).select2();
}
function ExportFullLogToExcel() {
    let pWhereClause = Operations_GetFilterWhereClause().replace(/\n/g, " ");

    pWhereClause = pWhereClause.replace(/,/g, "-");

    let form = $("<form>", { method: "POST", action: "/ReportMainClass/PrintReportQueryAndParams", target: "_blank" });
    form.append($("<input>", { type: "hidden", name: "arr_Keys", value: "pWhereClause" }));
    form.append($("<input>", { type: "hidden", name: "arr_Values", value: pWhereClause }));
    form.append($("<input>", { type: "hidden", name: "query", value: "" }));
    form.append($("<input>", { type: "hidden", name: "pReportName", value: "OperationScreenUNF" }));
    form.append($("<input>", { type: "hidden", name: "pReportType", value: "Excel" }));
    form.append($("<input>", { type: "hidden", name: "pTitle", value: "log" }));

    $("body").append(form);
    form.submit();
    form.remove();
}

function ExportToExel()
{
    if ($('#slLogType').val() == 1) {
        ExportFullLogToExcel();
        return;
    }

    if ($('#slLogType').val() != '') {
        var arr_Keys = new Array();
        var arr_Values = new Array();
        if ($('#slLogType').val() == 2)
            var ReportName = "AgentSummery";
        else if ($('#slLogType').val() == 3)
            var ReportName = "CSSummery";
        else if ($('#slLogType').val() == 4)
            var ReportName = "SalesSummery";
        else if ($('#slLogType').val() == 5)
            var ReportName = "ShippingOrderReportUNF";

        //let pWhereClause = Operations_GetFilterWhereClause();
        let pWhereClause = "WHERE 1=1 " + " \n";

        pWhereClause += "AND o.BLType=2 " + " \n";                        // Houses Only
        /*    pWhereClause += "AND MasterOperationID IS NULL " + " \n";   */    // Not Connected Yet

        if (glbCallingControl == "ShippingOrders") {
            pWhereClause += "AND o.DirectionType=2 " + " \n";    // Export
        } else if (glbCallingControl == "RoutingOrders") {
            pWhereClause += "AND o.DirectionType=1 " + " \n";    // Import
        }
        if ($('#slLogType').val() == 1)
            pWhereClause += "AND oo.ATAPODAlarmStatus = 1 " + " \n";
        else
            pWhereClause += "AND o.ATAPODAlarmStatus = 1 " + " \n";

        //if ($("#txtFilterQuotationCode").val().trim() != "") {
        //    //pWhereClause += " AND (CodeSerial=" + $("#txtFilterQuotationCode").val().trim();
        //    pWhereClause += ` AND (o.QuotationCode LIKE '%${$("#txtFilterQuotationCode").val().trim()}%')`;
        //    //    pWhereClause += ")";s
        //}

        var pSelectedStatus = GetAllSelectedIDsAsStringWithNameAttrReport("nameCbStatus");

        if (isValidDate($("#txtFilterFromOpenDate").val().trim(), 1)) {
            if ($("#txtFilterFromOpenDate").val() != null && $("#txtFilterFromOpenDate").val() != "" && pWhereClause !== "")
                pWhereClause += " AND o.OpenDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFilterFromOpenDate").val()) + " 00:00:00.000'";
        }
        if (isValidDate($("#txtFilterToOpenDate").val().trim(), 1)) {
            if ($("#txtFilterToOpenDate").val() != null && $("#txtFilterToOpenDate").val() != "" && pWhereClause !== "")
                pWhereClause += " AND o.OpenDate <= '" + GetDateWithFormatyyyyMMdd($("#txtFilterToOpenDate").val()) + " 23:59:50.999'";
        }

        //if ($("#slHouseStatusFilter").val() != null && $("#slHouseStatusFilter").val() != "" && pDefaults.UnEditableCompanyName == "UNF") {
        //    if ($('#slLogType').val() == 1)
        //        pWhereClause += " AND oo.OperationStageID =" + $("#slHouseStatusFilter").val();
        //    else
        //        pWhereClause += " AND o.OperationStageID =" + $("#slHouseStatusFilter").val();

        //}
        if (pDefaults.UnEditableCompanyName == "UNF" && pSelectedStatus != "")
            pWhereClause += " AND OperationStageID in (" + pSelectedStatus + ")";

        if ($("#slShipmentTypeFilter").val() != null && $("#slShipmentTypeFilter").val() != "" && pDefaults.UnEditableCompanyName == "UNF") {
            if ($('#slLogType').val() == 1)
                pWhereClause += " AND oo.ShipmentType =" + $("#slShipmentTypeFilter").val();
            else
                pWhereClause += " AND o.ShipmentType =" + $("#slShipmentTypeFilter").val();

        }

        if ($("#slFilterShipper").val() != null && $("#slFilterShipper").val() != "" && pWhereClause !== "") {
            if ($('#slLogType').val() == 1)
                pWhereClause += " AND oo.ShipperID =" + $("#slFilterShipper").val();
            else
                pWhereClause += " AND o.ShipperID =" + $("#slFilterShipper").val();

        }


        if ($("#slFilterAgent").val() != null && $("#slFilterAgent").val() != "" && pWhereClause !== "") {
            if ($('#slLogType').val() == 1)
                pWhereClause += " AND oo.AgentID =" + $("#slFilterAgent").val();
            else
                pWhereClause += " AND o.AgentID =" + $("#slFilterAgent").val();
        }

        if ($("#slFilterSalesman").val() != null && $("#slFilterSalesman").val() != "") {
            if ($('#slLogType').val() == 1)
                pWhereClause += " AND oo.SalesmanID =" + $("#slFilterSalesman").val();
            else
                pWhereClause += " AND o.SalesmanID =" + $("#slFilterSalesman").val();
        }
        if ($("#slFilterDirection").val() != null && $("#slFilterDirection").val() != "" && pWhereClause !== "") {

            if ($('#slLogType').val() == 1)
                pWhereClause += " AND oo.DirectionType =" + $("#slFilterDirection").val();
            else
                pWhereClause += " AND o.DirectionType =" + $("#slFilterDirection").val();

        }
        if ($("#slFilterMoveType").val() != null && $("#slFilterMoveType").val() != "" && pWhereClause !== "") {
            if ($('#slLogType').val() == 1)
                pWhereClause += " AND oo.MoveTypeID =" + $("#slFilterMoveType").val();
            else
                pWhereClause += " AND o.MoveTypeID =" + $("#slFilterMoveType").val();

        }
        if ($("#slFilterCS").val() != null && $("#slFilterCS").val() != "" && pDefaults.UnEditableCompanyName == "UNF") {
            if ($('#slLogType').val() == 1)
                pWhereClause += " AND oo.OperationManID =" + $("#slFilterCS").val();
            else
                pWhereClause += " AND o.OperationManID =" + $("#slFilterCS").val();

        }
        pWhereClause = pWhereClause.replace(/\n/g, " ");


        if ($('#slLogType').val() == 5) {
            pWhereClause += " AND o.MasterOperationID is null"
        }
        arr_Keys.push("pWhereClause");
        pWhereClause = pWhereClause.replace(/,/g, "-");
        arr_Values.push(pWhereClause);
        //if ($('#slLogType').val() == 2) {
        //    var query = `	SELECT POLCountryID,POLCountryName,POLName,POL, (select Name from Agents where id= vwo.AgentID) As AgentName,AgentID,SUM(VolumeSum) AS TotalVolume,  SUM(CASE WHEN ShipmentTypeCode = 'FCL' THEN VolumeSum ELSE 0 END) AS FCL_VolumeSum,SUM(CASE WHEN ShipmentTypeCode = 'LCL' THEN VolumeSum ELSE 0 END) AS LCL_VolumeSum,SUM(CASE WHEN ShipmentTypeCode = 'CONSOL' THEN VolumeSum ELSE 0 END) AS CONSOL_VolumeSum,SUM(CASE WHEN ShipmentTypeCode = 'AIR' THEN VolumeSum ELSE 0 END) AS AIR_VolumeSum,SUM(CASE WHEN ShipmentTypeCode = 'FTL' THEN VolumeSum ELSE 0 END) AS FTL_VolumeSum,SUM(CASE WHEN ShipmentTypeCode = 'LTL' THEN VolumeSum ELSE 0 END) AS LTL_VolumeSum,SUM(CASE WHEN ShipmentTypeCode = 'FCL' THEN 1 ELSE 0 END) AS FCL_OrderCount,SUM(CASE WHEN ShipmentTypeCode = 'LCL' THEN 1 ELSE 0 END) AS LCL_OrderCount,SUM(CASE WHEN ShipmentTypeCode = 'CONSOL' THEN 1 ELSE 0 END) AS CONSOL_OrderCount,SUM(CASE WHEN ShipmentTypeCode = 'AIR' THEN 1 ELSE 0 END) AS AIR_OrderCount,SUM(CASE WHEN ShipmentTypeCode = 'FTL' THEN 1 ELSE 0 END) AS FTL_OrderCount,SUM(CASE WHEN ShipmentTypeCode = 'LTL' THEN 1 ELSE 0 END) AS LTL_OrderCount,COUNT(*) AS TotalOrderCount FROM vwOperations vwo  GROUP BY POLCountryID, POLCountryName, POLName,POL,AgentID,AgentName ORDER BY  POLCountryID,POLCountryName, POLName,POL,AgentName`
        //    arr_Keys.push("query");
        //    arr_Values.push(query);
        //}
      

        debugger;
        var pParametersWithValues =
        {

            arr_Keys: arr_Keys
            , arr_Values: arr_Values
            , pTitle: "log"
            , pReportName: ReportName
            , pReportType: "Excel"
            /*, pReportType: "Print"*/
        };
        debugger

        var win = window.open("", "_blank");

        url = '/ReportMainClass/PrintReportQueryAndParams?pTitle="' + pParametersWithValues.pTitle + '"'
            + '&query=' + pParametersWithValues.query + ''
            + '&arr_Keys=' + pParametersWithValues.arr_Keys + ''
            + '&arr_Values=' + pParametersWithValues.arr_Values + ''
            + '&pReportName=' + pParametersWithValues.pReportName + ''
            + '&pReportType=' + pParametersWithValues.pReportType + ''
            ;

        win.location = url;
    } else { swal('Select Report Type'); }
    }

//////////////////////////////////////////////////////////

function ExportToPrint() {
    if ($('#slLogType').val() != '') {
        var arr_Keys = new Array();
        var arr_Values = new Array();
        if ($('#slLogType').val() == 1)
            var ReportName = "OperationScreenUNF";
        else if ($('#slLogType').val() == 2)
            var ReportName = "AgentSummery";
        else if ($('#slLogType').val() == 3)
            var ReportName = "CSSummery";
        else if ($('#slLogType').val() == 4)
            var ReportName = "SalesSummery";

        //let pWhereClause = Operations_GetFilterWhereClause();
        let pWhereClause = "WHERE 1=1 " + " \n";

        pWhereClause += "AND o.BLType=2 " + " \n";                        // Houses Only
        /*    pWhereClause += "AND MasterOperationID IS NULL " + " \n";   */    // Not Connected Yet

        if (glbCallingControl == "ShippingOrders") {
            pWhereClause += "AND o.DirectionType=2 " + " \n";    // Export
        } else if (glbCallingControl == "RoutingOrders") {
            pWhereClause += "AND o.DirectionType=1 " + " \n";    // Import
        }
        if ($('#slLogType').val() == 1)
            pWhereClause += "AND oo.ATAPODAlarmStatus = 1 " + " \n";
        else
            pWhereClause += "AND o.ATAPODAlarmStatus = 1 " + " \n";

        //if ($("#txtFilterQuotationCode").val().trim() != "") {
        //    //pWhereClause += " AND (CodeSerial=" + $("#txtFilterQuotationCode").val().trim();
        //    pWhereClause += ` AND (o.QuotationCode LIKE '%${$("#txtFilterQuotationCode").val().trim()}%')`;
        //    //    pWhereClause += ")";s
        //}
        if (isValidDate($("#txtFilterFromOpenDate").val().trim(), 1)) {
            if ($("#txtFilterFromOpenDate").val() != null && $("#txtFilterFromOpenDate").val() != "" && pWhereClause !== "")
                pWhereClause += " AND o.OpenDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFilterFromOpenDate").val()) + " 00:00:00.000'";
        }
        if (isValidDate($("#txtFilterToOpenDate").val().trim(), 1)) {
            if ($("#txtFilterToOpenDate").val() != null && $("#txtFilterToOpenDate").val() != "" && pWhereClause !== "")
                pWhereClause += " AND o.OpenDate <= '" + GetDateWithFormatyyyyMMdd($("#txtFilterToOpenDate").val()) + " 23:59:50.999'";
        }

        if ($("#slHouseStatusFilter").val() != null && $("#slHouseStatusFilter").val() != "" && pDefaults.UnEditableCompanyName == "UNF") {
            if ($('#slLogType').val() == 1)
                pWhereClause += " AND oo.OperationStageID =" + $("#slHouseStatusFilter").val();
            else
                pWhereClause += " AND o.OperationStageID =" + $("#slHouseStatusFilter").val();

        }


        if ($("#slShipmentTypeFilter").val() != null && $("#slShipmentTypeFilter").val() != "" && pDefaults.UnEditableCompanyName == "UNF") {
            if ($('#slLogType').val() == 1)
                pWhereClause += " AND oo.ShipmentType =" + $("#slShipmentTypeFilter").val();
            else
                pWhereClause += " AND o.ShipmentType =" + $("#slShipmentTypeFilter").val();

        }

        if ($("#slFilterShipper").val() != null && $("#slFilterShipper").val() != "" && pWhereClause !== "") {
            if ($('#slLogType').val() == 1)
                pWhereClause += " AND oo.ShipperID =" + $("#slFilterShipper").val();
            else
                pWhereClause += " AND o.ShipperID =" + $("#slFilterShipper").val();

        }


        if ($("#slFilterAgent").val() != null && $("#slFilterAgent").val() != "" && pWhereClause !== "") {
            if ($('#slLogType').val() == 1)
                pWhereClause += " AND oo.AgentID =" + $("#slFilterAgent").val();
            else
                pWhereClause += " AND o.AgentID =" + $("#slFilterAgent").val();
        }

        if ($("#slFilterSalesman").val() != null && $("#slFilterSalesman").val() != "") {
            if ($('#slLogType').val() == 1)
                pWhereClause += " AND oo.SalesmanID =" + $("#slFilterSalesman").val();
            else
                pWhereClause += " AND o.SalesmanID =" + $("#slFilterSalesman").val();
        }
        if ($("#slFilterDirection").val() != null && $("#slFilterDirection").val() != "" && pWhereClause !== "") {

            if ($('#slLogType').val() == 1)
                pWhereClause += " AND oo.DirectionType =" + $("#slFilterDirection").val();
            else
                pWhereClause += " AND o.DirectionType =" + $("#slFilterDirection").val();

        }
        if ($("#slFilterMoveType").val() != null && $("#slFilterMoveType").val() != "" && pWhereClause !== "") {
            if ($('#slLogType').val() == 1)
                pWhereClause += " AND oo.MoveTypeID =" + $("#slFilterMoveType").val();
            else
                pWhereClause += " AND o.MoveTypeID =" + $("#slFilterMoveType").val();

        }
        if ($("#slFilterCS").val() != null && $("#slFilterCS").val() != "" && pDefaults.UnEditableCompanyName == "UNF") {
            if ($('#slLogType').val() == 1)
                pWhereClause += " AND oo.OperationManID =" + $("#slFilterCS").val();
            else
                pWhereClause += " AND o.OperationManID =" + $("#slFilterCS").val();

        }
        pWhereClause = pWhereClause.replace(/\n/g, " ");


        arr_Keys.push("pWhereClause");
        arr_Values.push(pWhereClause);



        debugger;
        var pParametersWithValues =
        {

            arr_Keys: arr_Keys
            , arr_Values: arr_Values
            , pTitle: "log"
            , pReportName: ReportName
            , pReportType: "Print"
        };
        debugger

        var win = window.open("", "_blank");

        url = '/ReportMainClass/PrintReportQueryAndParams?pTitle="' + pParametersWithValues.pTitle + '"'
            + '&query=' + pParametersWithValues.query + ''
            + '&arr_Keys=' + pParametersWithValues.arr_Keys + ''
            + '&arr_Values=' + pParametersWithValues.arr_Values + ''
            + '&pReportName=' + pParametersWithValues.pReportName + ''
            + '&pReportType=' + pParametersWithValues.pReportType + ''
            ;

        win.location = url;
    } else { swal('Select Report Type'); }
}


//////////////////////////////////////////////////////////


function routingOrdersReportPermissions()
{
    
    if (pDefaults.UnEditableCompanyName == "UNF") {

        if ($("#hf_CanDelete").val()=='1' || $("#hf_CanAdd").val() == '1' || $("#hf_CanEdit").val() == '1') {
        $("#btn-ExportToExel").parent().removeClass("hide");
        $("#slLogType").parent().removeClass("hide");
        }



        if ($("#hf_CanDelete").val() != '1')
            $('#slLogType').find('option[value="1"]').remove();

        if ($("#hf_CanAdd").val() != '1')
            $('#slLogType').find('option[value="3"]').remove();

        if ($("#hf_CanAdd").val() != '1')
            $('#slLogType').find('option[value="4"]').remove();

        if ($("#hf_CanEdit").val() != '1')
            $('#slLogType').find('option[value="2"]').remove();

    }
}





function ShippingOrderToExcel() {
    debugger;

        var arr_Keys = new Array();
        var arr_Values = new Array();
        var ReportName = "";
        var Title = "";
        if (glbCallingControl == "ShippingOrders") {
            ReportName = "ShippingOrderReport"
            Title = "ShippingOrderReport"
            arr_Keys.push("ReportName");
            arr_Values.push(Title);
        } else if (glbCallingControl == "RoutingOrders") {
            ReportName = "ShippingOrderReport"   
            Title = "RoutingOrdersReport"   
            arr_Keys.push("ReportName");
            arr_Values.push(Title);
        }

       var query = `
                     SELECT * from vwOperations ${Operations_GetFilterWhereClause()}
          `
    arr_Keys.push("query");
    arr_Values.push(query);
        var pParametersWithValues =
        {

            arr_Keys: arr_Keys
            , arr_Values: arr_Values
            , pTitle: Title
            , pReportName: ReportName
            , pReportType: "Excel"
      //, pReportType: "Print"
        };

        var win = window.open("", "_blank");

    url = '/ReportMainClass/PrintReportQueryAndParams?pTitle="' + pParametersWithValues.pTitle + '"'
            + '&query=' + pParametersWithValues.query + ''
            + '&arr_Keys=' + pParametersWithValues.arr_Keys + ''
            + '&arr_Values=' + pParametersWithValues.arr_Values + ''
            + '&pReportName=' + pParametersWithValues.pReportName + ''
            + '&pReportType=' + pParametersWithValues.pReportType + ''
            ;

        win.location = url;
   
}



function GetAllSelectedIDsAsStringWithNameAttrReport(pCheckboxNameAttr) {
    //debugger;
    var listOfIDs = "";
    $('input[name="' + pCheckboxNameAttr + '"]:checked').each(function () {
        listOfIDs += ((listOfIDs == "") ? "" : ",") + ($(this).attr('value'));
    });
    return listOfIDs;
}

