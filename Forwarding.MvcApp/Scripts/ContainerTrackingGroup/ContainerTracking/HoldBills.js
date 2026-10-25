var TodaysDate = new Date();
var FormattedTodaysDate = TodaysDate.toLocaleDateString();

var pIsOperationDisabled = false;
var pIsFCL = false;
var pIsFTL = false;

function HoldBills_Initialize() {
    debugger;
    FormID = constOperationsFormID; //to get privilage of operations form for get permissions
    strLoadWithPagingFunctionName = "/api/Operations/LoadWithWhereClause";

    $('.classSearchOperations').on('keypress', function (args) {
        if (args.keyCode == 13) {
            $("#btnFilterOperationsApply").click();
            return false;
        }
    });

      

    var pControllerParameters = {
        pIsLoadArrayOfObjects: true
        , pPageNumber: 1
        , pPageSize: $("#select-page-size option:selected").text()
        , pWhereClause: " where 1 = 2"//Operations_GetFilterWhereClause()
        , pIsBindTableRows: false
        , pWhereClause_Routings: "0"
        , pOrderBy: "ID DESC"
        , pCallingControl: glbCallingControl
    };
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, /*pWhereClause*/"dummy", "ID DESC", 1, 25, pControllerParameters
        , function (pData) {
            strBindTableRowsFunctionName = "HoldBills_BindTableRows";
            HoldBills_BindTableRows(JSON.parse(pData[0]));

            //var pCustomers = pData[2]; var pAgents = pData[3]; var pVessels = pData[4]; var pContainerTypes = pData[5]; var pCountry = pData[6]; var pMoveTypes = pData[7]; var pShippingLines = pData[8];
            //var pTruckers = pData[9]; var pUsers = pData[10]; var pCommodity = pData[11]; var pTypeOfStock = pData[12]; var pCCA = pData[13]; var pAirlines = pData[14];


            //$("#slFilterBranch").html("<option value=''><--Select--></option>");
            //$("#slFilterBranch").append($("#hReadySlBranches").html());
            //$("#slFilterBranch").val("");
            //////FillListFromObject(null, 2, "<--All-->", "slFilterShipper", pCustomers, function(){ $("#slFilterConsignee").html($("#slFilterShipper").html());$("#slFilterNotify").html($("#slFilterShipper").html());});

            //$("#slFilterShipper").html($("#hReadySlCustomers").html());
            //$("#slFilterConsignee").html($("#hReadySlCustomers").html());
            //$("#slFilterBookingParty").html($("#hReadySlCustomers").html());


            //GetListWithNameAndWhereClause((glbOperationStageFilter == "" ? null : glbOperationStageFilter), "/api/NoAccessQuoteAndOperStages/LoadAll", "<--Select-->", "ulOperationStages", " WHERE IsOperationStage = 1  AND IsInActive = 0 ORDER BY ViewOrder ");
            //ApplySelectListSearch();



            //CallGETFunctionWithParameters("/api/Operations/LoadFilters", { pDummyParameter: 0 }
            //    , function (pData) {

            //        pAgents = pData[0]; var pVessels = pData[1]; var pContainerTypes = pData[2]; var pCountry = pData[3]; var pMoveTypes = pData[4]; var pShippingLines = pData[5];
            //        var pTruckers = pData[6]; var pUsers = pData[7]; var pCommodity = pData[8]; var pTypeOfStock = pData[9]; var pCCA = pData[10]; var pAirlines = pData[11];

            //        var _Salesmentemp = JSON.parse(pUsers);
            //        var pSalesmen = jQuery.grep(_Salesmentemp, function (_Salesmentemp) {
            //            return _Salesmentemp.IsSalesman == true;
            //        });

            //        //FillListFromObject(null, 2, "<--Select-->", "slVesselCCModule", pVessels, null);
            //        //FillListFromObject(null, 2, "<--Select-->", "slCommodityCCModule", pCommodity, null);
            //        //FillListFromObject(null, 2, "<--Select-->", "slOriginCountryCCModule", pCountry, null);

            //        FillListFromObject(null, 2, "<--Select-->", "slFilterPOLCountry", pCountry, function () {
            //            $("#slFilterPODCountry").html($("#slFilterPOLCountry").html());
            //            $("#slOriginCountryCCModule").html($("#slFilterPOLCountry").html());
            //        });
            //        FillListFromObject(null, 2, "<--Select-->", "slFilterAgent", pAgents, null);
            //        FillListFromObject(null, 2, "<--Select-->", "slFilterMoveType", pMoveTypes, null);
            //        $("#slFilterPOLCountry").attr("onchange"
            //            , 'FilterListByAnotherListID(null, "/api/Ports/LoadAll", "<--Select-->", "slFilterPOL", "slFilterPOLCountry", "CountryID");');
            //        $("#slFilterPODCountry").attr("onchange"
            //            , 'FilterListByAnotherListID(null, "/api/Ports/LoadAll", "<--Select-->", "slFilterPOD", "slFilterPODCountry", "CountryID");');
            //        FillListFromObject(null, 2, "<--Select-->", "slOperationVessels", pVessels, function () {
            //            $("#slFilterVessel").html($("#slOperationVessels").html());
            //            $("#slVesselCCModule").html($("#slOperationVessels").html());
            //        });
            //        FillListFromObject(null, 1, "<--Select-->", "slOperationContainerType", pContainerTypes, function () { $("#slOperationContainerType2").html($("#slOperationContainerType").html()); $("#slOperationContainerType3").html($("#slOperationContainerType").html()); });
            //        FillListFromObject(null, 2, "<--Select-->", "slFilterShippingLine", pShippingLines, function () { $("#slLineCCModule").html($("#slFilterShippingLine").html()) });
            //        FillListFromObject(null, 2, "<--Select-->", "slFilterAirline", pAirlines, null);
            //        FillListFromObject(null, 2, "<--Select-->", "slFilterTrucker", pTruckers, null);
            //        FillListFromObject(null, 2, "<--Select-->", "slFilterCCA", pCCA, function () { $("#slOperationCCA").html($("#slFilterCCA").html()) });
            //        FillListFromObject(null, 2, "<--Select-->", "slCommodity", pCommodity, function () { $("#slCommodityCCModule").html($("#slCommodity").html()); $("#slCertificateCommodity").html($("#slCommodity").html()); });
            //        FillListFromObject(null, 2, "<--Select-->", "slTypeOfStock", pTypeOfStock, null);
            //        FillListFromObject(null, 2, "<--Select-->", "slFilterCreator", pUsers, null);
            //        FillListFromObject(null, 2, "<--Select-->", "slFilterOperationMan", pUsers, null);
            //        FillListFromObject(null, 2, "<--Select-->", "slFilterSalesman", JSON.stringify(pSalesmen), function () { $("#slOperationSalesman").html($("#slFilterSalesman").html()); });

            //        //FadePageCover(false);

            //        $("#slClientCCModule").html($("#hReadySlCustomers").html());
            //        GetListWithNameAndWhereClauseWithMultiAttrs(null, "Notes", "/api/TrackingStage/LoadAll", TranslateString("SelectFromMenu")
            //            , "slStatusCCModule"
            //            , "WHERE 1=1 AND IsClearance=1"
            //            , null);
            //        CallGETFunctionWithParameters("/api/Custody/LoadAll", { pWhereClause: 'WHERE 1=1' }
            //            , function (pData) {
            //                FillListFromObject(null, 2, "<--Select-->", "slCustodyCCModule", pData[0], null);
            //            }, null);
            //        // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            //        if (IsNull(pDefaults.ShowUserSalesmen, "false") == true) {
            //            $("#slConsignees").html("");
            //            $("#slShippers").html("");
            //            $('#slOperationSalesman').on('change', function () {
            //                //FadePageCover(true);

            //                CallGETFunctionWithParameters("/api/Customers/LoadAllWithMinimalColumns"
            //                    , {
            //                        pWhereClauseWithMinimalColumns: (($("#sp-LoginName").text() == "BG EGYPT" ? "WHERE Name=N'BG EGYPT'" : "WHERE 1=1") + "  AND SalesmanID = " + $('#slOperationSalesman').val() + " ")
            //                        , pOrderBy: "Name"
            //                    }
            //                    , function (pData) {
            //                        FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "hReadySlCustomers", pData[0], function () {
            //                            try {
            //                                $("#slConsignees").prop('disabled', false);
            //                                $("#slShippers").prop('disabled', false);
            //                                $("#slConsignees").html($("#hReadySlCustomers").html());
            //                                $("#slShippers").html($("#hReadySlCustomers").html());
            //                                FadePageCover(false)
            //                            }
            //                            catch (ex) {
            //                                console.log('Consignee or shipper is not define')
            //                                FadePageCover(false)
            //                            }
            //                        });
            //                    }
            //                    , null);
            //            });
            //        }
            //    }
            //    , null);

        }, true);
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    $("#div-main-options").width($("#mainForm").width() - 185);
    $("#divTblOperations").width($("#mainForm").width() - 185);
    //$("#divTblOperations").height($("#mainForm").height() - 360);
}


function rdoByHouseOrCustomerOptionChanged() {
    debugger;
    if ($("#cbHouse").prop("checked")) {
        $(".ShowForHouse").removeClass("hide");
        $(".HideForHouse").addClass("hide");

        $("#btn-Search").attr("onclick", "Operations_LoadingWithPaging();");
        
    }
    else {
        $(".HideForHouse").removeClass("hide");
        $(".ShowForHouse").addClass("hide");

        $("#btn-Search").attr("onclick", "Customers_LoadingWithPaging();");
    }
}

// #region House Function

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
            HoldBills_BindTableRows(JSON.parse(pData[0]));
        });
}

function Operations_GetFilterWhereClause() {
    debugger;
    let pWhereClause = "WHERE 1=1 " + " \n";

    pWhereClause += "AND BLType=2 " + " \n";                        // Houses Only
    pWhereClause += "AND MasterOperationID IS NOT NULL " + " \n";       // Not Connected Yet


    if ($("#txtBillNo").val().trim() != "") {
        pWhereClause += " And( MasterBL like N'%" + $("#txtBillNo").val().trim() + "%' ";
        pWhereClause += " OR HouseNumber like N'%" + $("#txtBillNo").val().trim() + "%' )";
    }


    if ($("#txtHB_GWFrom").val().trim() != "" && $("#txtHB_GWTo").val().trim() == "") {
        pWhereClause += " AND GrossWeight = " + $("#txtHB_GWFrom").val().trim() + " ";
    }
    else if ($("#txtHB_GWFrom").val().trim() != "" && $("#txtHB_GWTo").val().trim() != "") {
        pWhereClause += " AND GrossWeight between " + $("#txtHB_GWFrom").val().trim() + " and " + $("#txtHB_GWTo").val().trim();
    }


    //let pTransportFilter = "";
    //let pDirectionFilter = "";
    //let pBLTypeFilter = "";

    //if ($("#txtFilterOperationCode").val().trim() != "") {
    //    pWhereClause += " AND (CodeSerial=" + $("#txtFilterOperationCode").val().trim();
    //    pWhereClause += "       OR MasterOperationCodeSerial=" + $("#txtFilterOperationCode").val().trim();
    //    pWhereClause += ")";
    //}

    //if ($("#slFilterBranch").val() != null && $("#slFilterBranch").val() != "")
    //    pWhereClause += " AND BranchID =" + $("#slFilterBranch").val();
    //if ($("#slFilterCreator").val() != null && $("#slFilterCreator").val() != "")
    //    pWhereClause += " AND CreatorUserID =" + $("#slFilterCreator").val();
    //if ($("#slFilterOperationMan").val() != null && $("#slFilterOperationMan").val() != "")
    //    pWhereClause += " AND OperationManID =" + $("#slFilterOperationMan").val();
    //if ($("#slFilterSalesman").val() != null && $("#slFilterSalesman").val() != "")
    //    pWhereClause += " AND SalesmanID =" + $("#slFilterSalesman").val();
    //if ($("#txtFilterInvoiceNumber").val().trim() != "" && pWhereClause !== "")
    //    pWhereClause += " AND (InvoiceNumbers like '" + $("#txtFilterInvoiceNumber").val().trim().toUpperCase() + "/%' OR InvoiceNumbers like '%," + $("#txtFilterInvoiceNumber").val().trim().toUpperCase() + "/%')";

    //if ($("#slFilterDirection").val() != null && $("#slFilterDirection").val() != "" && pWhereClause !== "")
    //    pWhereClause += " AND DirectionType =" + $("#slFilterDirection").val();
    //if ($("#slFilterTransport").val() != null && $("#slFilterTransport").val() != "" && pWhereClause !== "")
    //    pWhereClause += " AND TransportType =" + $("#slFilterTransport").val();
    //if ($("#slFilterShipmentType").val() != null && $("#slFilterShipmentType").val() != "" && pWhereClause !== "")
    //    pWhereClause += " AND ShipmentType =" + $("#slFilterShipmentType").val();

    //if ($("#txtFilterClientName").val().trim() != "" && pWhereClause !== "")
    //    pWhereClause += " AND ClientName like '%" + $("#txtFilterClientName").val().trim().toUpperCase() + "%' ";
    //if ($("#txtFilterGrossWeight").val().trim() != "" && pWhereClause !== "")
    //    pWhereClause += " AND GrossWeightSum = '" + $("#txtFilterGrossWeight").val().trim().toUpperCase() + "' ";
    //if ($("#txtFilterContainerNumber").val().trim() != "" && pWhereClause !== "") {
    //    pWhereClause += " AND (ContainerNumber like '%" + $("#txtFilterContainerNumber").val().trim().toUpperCase() + "%' ";
    //    pWhereClause += "      OR ContainerNumbers like '%" + $("#txtFilterContainerNumber").val().trim().toUpperCase() + "%') ";
    //}
    //if ($("#slFilterShipper").val() != null && $("#slFilterShipper").val() != "" && pWhereClause !== "")
    //    pWhereClause += " AND ShipperID =" + $("#slFilterShipper").val();
    //if ($("#slFilterCCA").val() != null && $("#slFilterCCA").val() != "" && pWhereClause !== "")
    //    pWhereClause += " AND CustomsClearanceAgentID =" + $("#slFilterCCA").val();
    //if ($("#slFilterConsignee").val() != null && $("#slFilterConsignee").val() != "" && pWhereClause !== "")
    //    pWhereClause += " AND ConsigneeID =" + $("#slFilterConsignee").val();
    //if ($("#slFilterAgent").val() != null && $("#slFilterAgent").val() != "" && pWhereClause !== "")
    //    pWhereClause += " AND AgentID =" + $("#slFilterAgent").val();
    //if ($("#slFilterBookingParty").val() != null && $("#slFilterBookingParty").val() != "" && pWhereClause !== "")
    //    pWhereClause += " AND BookingPartyID =" + $("#slFilterBookingParty").val();
    //if ($("#slFilterMoveType").val() != null && $("#slFilterMoveType").val() != "" && pWhereClause !== "")
    //    pWhereClause += " AND MoveTypeID =" + $("#slFilterMoveType").val();
    //if ($("#slFilterAirline").val() != null && $("#slFilterAirline").val() != "" && pWhereClause !== "")
    //    pWhereClause += " AND AirlineID =" + $("#slFilterAirline").val();
    //if ($("#slFilterShippingLine").val() != null && $("#slFilterShippingLine").val() != "" && pWhereClause !== "")
    //    pWhereClause += " AND ShippingLineID =" + $("#slFilterShippingLine").val();
    //if ($("#slFilterVessel").val() != null && $("#slFilterVessel").val() != "" && pWhereClause !== "")
    //    pWhereClause += " AND VesselID =" + $("#slFilterVessel").val();
    //if ($("#slFilterTrucker").val() != null && $("#slFilterTrucker").val() != "" && pWhereClause !== "")
    //    pWhereClause += " AND ((ISNULL((SELECT COUNT(op.ID) FROM dbo.OperationPartners AS op WHERE dbo.vwOperations.ID = op.OperationID AND op.TruckerID = " + $("#slFilterTrucker").val().trim().toUpperCase() + "), 0)) > 0)";
    //if ($("#slFilterPOLCountry").val() != null && $("#slFilterPOLCountry").val() != "" && pWhereClause !== "")
    //    pWhereClause += " AND POLCountryID =" + $("#slFilterPOLCountry").val();
    //if ($("#slFilterPOL").val() != null && $("#slFilterPOL").val() != "" && pWhereClause !== "")
    //    pWhereClause += " AND POL =" + $("#slFilterPOL").val();
    //if ($("#slFilterPODCountry").val() != null && $("#slFilterPODCountry").val() != "" && pWhereClause !== "")
    //    pWhereClause += " AND PODCountryID =" + $("#slFilterPODCountry").val();
    //if ($("#slFilterPOD").val() != null && $("#slFilterPOD").val() != "" && pWhereClause !== "")
    //    pWhereClause += " AND POD =" + $("#slFilterPOD").val();
    //if ($("#slFilterIsVesselArrived").val() != null && $("#slFilterIsVesselArrived").val() != "" && pWhereClause != "")
    //    pWhereClause += " AND IsClearance=" + $("#slFilterIsVesselArrived").val() + " \n";
    //if ($("#slFilterIsForm13Delivered").val() != null && $("#slFilterIsForm13Delivered").val() != "" && pWhereClause != "")
    //    pWhereClause += " AND IsDelivered=" + $("#slFilterIsForm13Delivered").val() + " \n";

    //if ($("#txtFilterCustomerReference").val().trim() != "") {
    //    if (pDefaults.UnEditableCompanyName == "OAO" || pDefaults.UnEditableCompanyName == "ELI")
    //        pWhereClause += " AND CustomerReference LIKE N'%" + $("#txtFilterCustomerReference").val().trim().toUpperCase() + "%' \n";
    //    else
    //        pWhereClause += " AND CustomerReference =N'" + $("#txtFilterCustomerReference").val().trim().toUpperCase() + "' \n";
    //}

    //if ($("#txtFilterMasterBL").val().trim() != "" && pWhereClause !== "") {
    //    //if (pDefaults.UnEditableCompanyName == "ALF" || pDefaults.UnEditableCompanyName == "NIS" || pDefaults.UnEditableCompanyName == "DGL" || pDefaults.UnEditableCompanyName == "ELI")
    //    pWhereClause += " AND MasterBL LIKE N'%" + $("#txtFilterMasterBL").val().trim().toUpperCase() + "%' ";
    //    //else
    //    //    pWhereClause += " AND MasterBL = N'" + $("#txtFilterMasterBL").val().trim().toUpperCase() + "' ";
    //}

    //if ($("#txtFilterHouseBLs").val().trim() != "" && pWhereClause !== "") {

    //    pWhereClause += " AND (" + " \n";
    //    pWhereClause += "       HouseNumber=N'" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "' ";
    //    pWhereClause += "       OR ((ISNULL((SELECT COUNT(op.ID) FROM dbo.Operations AS op WHERE dbo.vwOperations.ID = op.MasterOperationID AND op.HouseNumber = N'" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "'), 0)) > 0)";
    //    pWhereClause += "     ) \n ";
    //}


    //if ($("#txtFilterFlexi").val().trim() != "" && pWhereClause !== "") {
    //    //pWhereClause += " AND ((ISNULL((SELECT COUNT(f.ID) FROM dbo.vwFlexiSerial AS f WHERE dbo.vwOperations.ID IN(IsNull(f.ExportOperationID, 0), ISNULL(f.ImportOperationID, 0)) AND f.Code LIKE '%" + $("#txtFilterFlexi").val().trim().toUpperCase() + "%'), 0)) > 0)";
    //    pWhereClause += " AND ((ISNULL((SELECT COUNT(OCP.ID) FROM OperationContainersAndPackages AS OCP WHERE dbo.vwOperations.ID=OCP.OperationID AND OCP.TankOrFlexiNumber = N'" + $("#txtFilterFlexi").val().trim().toUpperCase() + "'), 0)) > 0)";
    //}
    //if (isValidDate($("#txtFilterLoadingDate").val().trim(), 1)) {
    //    if ($("#txtFilterLoadingDate").val() != null && $("#txtFilterLoadingDate").val() != "" && pWhereClause !== "")
    //        pWhereClause += " AND ((ISNULL((SELECT COUNT(o.ID) FROM dbo.Routings AS o WHERE dbo.vwOperations.ID = o.OperationID AND CONVERT(DATE , o.StuffingDate) = CONVERT(DATE ,'" + GetDateWithFormatyyyyMMdd($("#txtFilterLoadingDate").val()) + " 00:00:00.000')" + "), 0)) > 0)";
    //}
    //if ($("#txtFilterQuotation").val().trim() != "" && pWhereClause !== "") {
    //    pWhereClause += " AND (QuotationCode like N'%" + $("#txtFilterQuotation").val().trim().toUpperCase() + "%') ";
    //}
    //if ($("#txtFilterForm13Number").val().trim() != "" && pWhereClause !== "") {
    //    pWhereClause += " AND (Form13Number=N'" + $("#txtFilterForm13Number").val().trim().toUpperCase() + "') ";
    //}
    //if ($("#txtFilterACIDNumber").val().trim() != "" && pWhereClause !== "") {
    //    pWhereClause += " AND (ACIDNumber=N'" + $("#txtFilterACIDNumber").val().trim().toUpperCase() + "') ";
    //}


    /*****************Side Controls***************************/

    pWhereClause = (pWhereClause == "" ? " WHERE (1=1) " : pWhereClause);
    return pWhereClause;
}

function ApplySelectListSearch() {
    debugger;
    //if (pDefaults.UnEditableCompanyName == "GBL") {
    $("#slFilterShipper").css({ "width": "100%" }).select2();
    $("#slFilterShipper").trigger("change");

    $("#slFilterConsignee").css({ "width": "100%" }).select2();
    $("#slFilterConsignee").trigger("change");

    $("#slFilterAgent").css({ "width": "100%" }).select2();
    $("#slFilterAgent").trigger("change");

    $("#slShippers").css({ "width": "100%" }).select2();
    $("#slShippers").trigger("change");

    $("#slConsignees").css({ "width": "100%" }).select2();
    $("#slConsignees").trigger("change");

    $("#slAgents").css({ "width": "100%" }).select2();
    $("#slAgents").trigger("change");

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

function HoldBills_BindTableRows(pOperations) {
    ClearAllTableRows("tblOperations");
    debugger;
    let copyControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Copy" + "</span>";
    let printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Print" + "</span>";
    let transferControlsText = " class='btn btn-xs btn-rounded btn-info float-right " + (OEDoc ? "" : " hide ") + "' > <i class='fa fa-exchange' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Transfer" + "</span>";

    HoldControlsText = " class='btn btn-xs btn-rounded btn-danger float-right' > <i class='fa fa-warning' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>Hold</span>";
    UnHoldControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>Release</span>";

    $.each(pOperations, function (i, item) {
        if (item.HouseParentID == 0) {

            AppendRowtoTable("tblOperations",

                ("<tr ID='" + item.ID + "' ondblclick='Shipments_FillControlsFromBLDocuments(" + item.ID + "," + item.MasterOperationID + ");' class='"
                    + (item.OperationStageID == CancelledQuoteAndOperStageID
                        ? "static-text-danger" //cancelled operation
                        : (item.OperationStageName == "CLOSED" //(Date.prototype.compareDates(FormattedTodaysDate, GetDateWithFormatMDY(item.CloseDate)) <= 0
                            ? "static-text-primary" //closed operation
                            : "")
                    )
                    + "'>"//of tr
                    + "<td class='ID2'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    //+ (IsMESCOCompany ? "<td><i class='fa fa-plus' onclick='ShowHide(" + item.ID + ");'></i></td>" : "")
                    //+ "<td class='ID '> <input type='checkbox' value='" + item.ID + "' " + (item.MasterOperationID == 0 && item.NumberOfHousesConnected == 0 ? "name='Delete'" : " disabled ") + " /></td>"
                    + "<td class='QuotationID hide' val='" + item.QuotationID + "'>" + item.QuotationID + "</td>"
                    + "<td class='MasterOperationID hide' val='" + item.MasterOperationID + "'>" + item.MasterOperationID + "</td>"
                    + "<td class='shownBLTypeIconName hide'><i class= 'fa " + item.BLTypeIconName + " " + item.BLTypeIconStyle + " fa-2x'/></td>"
                    + "<td class='DirectionType hide'>" + item.DirectionType + "</td>"
                    + "<td class='shownDirectionIconName'><i class= 'fa " + item.DirectionIconName + " " + item.DirectionIconStyle + " fa-2x'/><i class= 'fa " + item.TransportIconName + " " + item.TransportIconStyle + " fa-2x'/></td>"
                    + "<td class='Code'>" + (item.Code == 0 ? item.MasterOperationCode : item.Code) + "</td>"
                    + "<td class='MasterBL'>" + (item.MasterBL == 0 ? "" : item.MasterBL) + "</td>"
                    + "<td class='HouseNumber'>" + (item.HouseNumber == 0 ? "" : item.HouseNumber) + "</td>"

                    + "<td class='Client'>" + (item.BookingPartyName != 0 && item.BLType == constMasterBLType ? item.BookingPartyName : (item.ClientName == 0 ? "" : item.ClientName)) + "</td>"

                    + "<td class='Routing'>" + (item.POLName + " > " + item.PODName) + "</td>"
                    + "<td class='POL hide' val='" + item.POL + "'>" + item.POLCode + "</td>"
                    + "<td class='POD hide' val='" + item.POD + "'>" + item.PODCode + "</td>"
                    + "<td class='Incoterm hide' val='" + item.IncotermID + "'>" + item.IncotermName + "</td>"
                    + "<td class='OperationPOrC hide' val='" + item.POrC + "'>" + item.POrC + "</td>"
                    + "<td class='Commodity hide' val='" + item.CommodityID + "'>" + item.CommoditymName + "</td>"
                    + "<td class='TransientTime hide'>" + item.TransientTime + "</td>"

                    + "<td class='ShipmentType' val='" + item.ShipmentType + "'>" + GetShipmentType(item.ShipmentType) + " " + item.RepBLTypeShown + "</td>"

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

                    + "<td class='InvoiceNumbers'>" + (item.InvoiceNumbers == 0 ? "" : item.InvoiceNumbers) + "</td>"
                    + "<td class='IsHold'> <input type='checkbox' disabled='disabled' val='" + (item.IsHold == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class=''><a href='#CustomerModal' data-toggle='modal' onclick='ShowHoldUnHoldBills(" + item.ID + "," + item.IsHold + ");' " + (item.IsHold == true ? UnHoldControlsText : HoldControlsText) + "</a></td>"


                    + "</tr>"));


            AppendRowtoTable("tblOperations",
                '<tr id="DaughterOperations' + item.ID + '" style="display: none;">' +
                '<td colspan="12" style="padding-left: 110px;padding-right: 80px;" ><table  id="tblDaughterOperations' + item.ID + '" class="table text-sm table-hover">' +
                '<thead>' +
                '<tr style="background-color:#e9e9cc">' +
                '<th><input id="cb-CheckAll" type="checkbox" /></th>' +
                '<th></th>' +
                '<th>Code</th>' +
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
                            + "<td class='ShipmentType' val='" + item.ShipmentType + "'>" + GetShipmentType(item.ShipmentType) + " " + item.RepBLTypeShown + "</td>"
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

function ShowHoldUnHoldBills(pBillID, pIsHold) {
    debugger;
    if (pBillID != "")
        swal({
            title: "Are you sure?",
            text: "The selected record status will be changed!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: (pIsHold ? "Yes, UnHold!" : "Yes, Hold!"),
            closeOnConfirm: true
        },
            //callback function in case of confirm delete
            function () {

                $("#hBillID").val(pBillID);
                $("#hIsHold").val(pIsHold);
                $("#txtBillsHoldReason").val("");

                jQuery("#BillsHoldReason").modal("show");
            });
}

function HoldUnHoldBills() {
    debugger;


    if ($("#txtBillsHoldReason").val() == "" && $("#hIsHold").val() == "false") {
        swal("Missing Data", "Please enter reason");
    }
    else {
        FadePageCover(true);

        var UpdateStr = "";
        if ($("#hIsHold").val() == "true") {
            UpdateStr = " IsHold = 0,HoldReason='" + $("#txtBillsHoldReason").val() + "' WHERE ID=" + $("#hBillID").val();
        }
        else {
            UpdateStr = " IsHold = 1,HoldReason='" + $("#txtBillsHoldReason").val() + "' WHERE ID=" + $("#hBillID").val();
        }

        CallGETFunctionWithParameters("/api/Operations/HoldUnHoldBill"
            , {
                pBillID: $("#hBillID").val(),
                pIsHold: $("#hIsHold").val(),
                pHoldReason: $("#txtBillsHoldReason").val()
            }
            , function (pData) {
                if (pData[0] != "")
                    swal("Sorry", pData[0]);
                else
                    jQuery("#BillsHoldReason").modal("hide");
                Operations_LoadingWithPaging();
                FadePageCover(false);
            });
    }
}

// #endregion


// #region Customer Function

function Customers_LoadingWithPaging() {
    debugger;
    strLoadWithPagingFunctionName = "/api/Customers/LoadWithPaging";
    strBindTableRowsFunctionName = "Customers_BindTableRows";
    var pWhereClause = 'Where 1 = 1';
  
    if ($("#txt-SearchCustomer").val().trim() != "") {
        let pSearchKey = $("#txt-SearchCustomer").val().trim();
        pWhereClause += " AND (Code LIKE N'%" + pSearchKey + "%' "
            + " OR Name LIKE N'%" + pSearchKey + "%' "
            + " OR VATNumber LIKE N'%" + pSearchKey + "%' "
            + " OR LocalName LIKE N'%" + pSearchKey + "%') "
    }
    var pOrderBy = " ID ";
    var pControllerParameters = { pPageNumber: 1, pPageSize: $("#select-page-size option:selected").text(), pWhereClause: pWhereClause }
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Customers/LoadWithPagingWithWhereClause", pWhereClause, 1, 10
        , function (pData) {
            Customers_BindTableRows(pData);
        });
}

function Customers_BindTableRows(pCustomers) {


    ClearAllTableRows("tblCustomers");
    HoldControlsText = " class='btn btn-xs btn-rounded btn-danger float-right' > <i class='fa fa-warning' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>Hold</span>";
    UnHoldControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>Release</span>";

    $.each(pCustomers, function (i, item) {
        AppendRowtoTable("tblCustomers",
            ("<tr ID='" + item.ID + "' ondblclick='Customers_EditByDblClick(" + item.ID + ");'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + (pDefaults.UnEditableCompanyName == "TOP" ? ("<td class='CompanyName'>" + item.CompanyName + "</td>") : "")
                + "<td class='Code'>" + item.Code + "</td>"
                + "<td class='Name'>" + item.Name + "</td>"
                + "<td class='LocalName'>" + (item.LocalName == 0 ? "" : item.LocalName) + "</td>"
                + "<td class='Website hide'>" + (item.Website == 0 ? "" : item.Website) + "</td>"
                + "<td class='CustomerEmail hide'>" + (item.Email == 0 ? "" : item.Email) + "</td>"
                + "<td class='PaymentTermID' val='" + item.PaymentTermID + "'>" + (item.PaymentTermID != 0 ? item.PaymentTermCode : "") + "</td>"
                + "<td class='IsConsignee hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsConsignee == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='IsShipper hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsShipper == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='IsInternalCustomer hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsinternalCustomer == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='IsExternal hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsExternal == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='IsInactive'> <input type='checkbox' disabled='disabled' val='" + (item.IsInactive == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='VATNumber hide'>" + item.VATNumber + "</td>"
                + "<td class='CurrencyID hide' val='" + item.CurrencyID + "'>" + item.CurrencyCode + "</td>"
                + "<td class='SalesmanID hide' val='" + item.SalesmanID + "'>" + item.SalesmanName + "</td>"
                + "<td class='TaxeTypeID hide' val='" + item.TaxeTypeID + "'>" + item.TaxeTypeCode + "</td>"
                + "<td class='ForeignExporterNo hide'>" + item.ForeignExporterNo + "</td>"
                + "<td class='ForeignExporterCountryName hide' val='" + item.ForeignExporterCountryID + "'>" + item.ForeignExporterCountryID + "</td>"
                + "<td class='Notes hide'>" + item.Notes + "</td>"
                + "<td class='Address hide'>" + item.Address + "</td>"
                + "<td class='PhonesAndFaxes hide'>" + item.PhonesAndFaxes + "</td>"
                + "<td class='IsConsolidatedInvoice hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsConsolidatedInvoice == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='BankName hide'>" + item.BankName + "</td>"
                + "<td class='BankAddress hide'>" + item.BankAddress + "</td>"
                + "<td class='Swift hide'>" + item.Swift + "</td>"
                + "<td class='BankAccountNumber hide'>" + item.BankAccountNumber + "</td>"
                + "<td class='IBANNumber hide'>" + item.IBANNumber + "</td>"

                + "<td class='AccountID hide'>" + item.AccountID + "</td>"
                + "<td class='AccountName hide'>" + (item.AccountName == 0 ? "" : item.AccountName) + "</td>"
                + "<td class='SubAccountID hide'>" + item.SubAccountID + "</td>"
                + "<td class='SubAccountName hide'>" + (item.SubAccountName == 0 ? "" : item.SubAccountName) + "</td>"
                + "<td class='CostCenterID hide'>" + item.CostCenterID + "</td>"
                + "<td class='CostCenterName hide'>" + (item.CostCenterName == 0 ? "" : item.CostCenterName) + "</td>"
                + "<td class='SubAccountGroupID hide'>" + item.SubAccountGroupID + "</td>"
                + "<td class='OperationCount hide'>" + item.OperationCount + "</td>"
                + "<td class='PriceList hide'>" + item.LockingUserID + "</td>" // mostaa
                + "<td class='Sites hide'>" + item.Sites + "</td>"
                + "<td class='CustomerUserID hide' val='" + item.CustomerUserID + "' >" + item.CustomerUserID + "</td>" // mostaa
                + "<td class='CustomerUserName hide' val='" + item.CustomerUserName + "'>" + item.CustomerUserName + "</td>" // mostaa
                + "<td class='IsInActiveUser' val='" + ((item.IsInActiveUser == false && item.CustomerUserID == 0) ? true : item.IsInActiveUser)  /*IN ACTIVE*/ + "'>" + " <input type='checkbox' disabled='disabled' " + (((item.IsInActiveUser == false && item.CustomerUserID == 0) || (item.IsInActiveUser == true)) ? "" : "checked='checked'") /*ACTIVE*/ + " />" + "</td>" // mostaa
                + "<td class='CustomerUserUserName ' val='" + item.CustomerUserUserName + "'>" + IsNull(item.CustomerUserUserName, "-") + "</td>" // mostaa
                + "<td class='SalesLeadID hide' val='" + item.SalesLeadID + "'> <input type='checkbox' disabled='disabled' val='" + (item.SalesLeadID != 0 ? "true' checked='checked'" : "'") + " /></td>"

                + "<td class='BillingDetails hide' val='" + item.BillingDetails + "' >" + item.BillingDetails + "</td>" // mostaa
                + "<td class='ShippingDetails hide' val='" + item.ShippingDetails + "' >" + item.ShippingDetails + "</td>" // mostaa
                + "<td class='crmCode hide' val='" + item.crmCode + "' >" + item.crmCode + "</td>"
                + "<td class='OriginalCMRbyPost hide' val='" + item.OriginalCMRbyPost + "' >" + item.OriginalCMRbyPost + "</td>" // mostaa
                + "<td class='CategoryID hide'>" + item.CategoryID + "</td>"

                + "<td class='CompanyName hide'>" + (item.CompanyName == 0 ? "" : item.CompanyName) + "</td>"
                + "<td class='SenderName hide'>" + (item.SenderName == 0 ? "" : item.SenderName) + "</td>"
                + "<td class='AccountNo hide'>" + (item.AccountNo == 0 ? "" : item.AccountNo) + "</td>"

                + "<td class='PriceListName hide'>" + item.PriceListName + "</td>" // mostaa
                + "<td class='IsHold'> <input type='checkbox' disabled='disabled' val='" + (item.IsHold == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class=''><a href='#CustomerModal' data-toggle='modal' onclick='ShowHoldUnHoldCustomers(" + item.ID + "," + item.IsHold + ");' " + (item.IsHold == true ? UnHoldControlsText : HoldControlsText) + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblCustomers", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblCustomers>tbody>tr", $("#txt-SearchCustomer").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });

}

function ShowHoldUnHoldCustomers(pCustomerID, pIsHold) {
    debugger;
    if (pCustomerID != "")
        swal({
            title: "Are you sure?",
            text: "The selected record status will be changed!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: (pIsHold ? "Yes, UnHold!" : "Yes, Hold!"),
            closeOnConfirm: true
        },
            //callback function in case of confirm delete
            function () {
                     
                $("#hCustomerID").val(pCustomerID);
                $("#hIsHold").val(pIsHold);
                $("#txtCustomersHoldReason").val("");

                jQuery("#CustomersHoldReason").modal("show");
            });
}

function HoldUnHoldCustomers() {
    debugger;

    
    if ($("#txtCustomersHoldReason").val() == "" && $("#hIsHold").val() == "false") {
        swal("Missing Data", "Please enter reason");
    }
    else {
        FadePageCover(true);

        var UpdateStr = "";
        if ($("#hIsHold").val() == "true") {
            UpdateStr = " IsHold = 0,HoldReason='" + $("#txtCustomersHoldReason").val() + "' WHERE ID=" + $("#hCustomerID").val();
        }
        else {
            UpdateStr = " IsHold = 1,HoldReason='" + $("#txtCustomersHoldReason").val() + "' WHERE ID=" + $("#hCustomerID").val();
        }

        CallGETFunctionWithParameters("/api/Customers/HoldUnHoldCustomer"
            , {
                pCustomerID : $("#hCustomerID").val(),
                pIsHold : $("#hIsHold").val(),
                pHoldReason : $("#txtCustomersHoldReason").val()
            }
            , function (pData) {
                if (pData[0] != "")
                    swal("Sorry", pData[0]);
                else
                    jQuery("#CustomersHoldReason").modal("hide");
                Customers_LoadingWithPaging();
                FadePageCover(false);
            });
    }
}

// #endregion





