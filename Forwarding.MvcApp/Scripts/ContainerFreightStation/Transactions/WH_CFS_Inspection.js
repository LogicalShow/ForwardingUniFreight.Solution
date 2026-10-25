var strBindTableRowsFunctionName;
function CFSInspection_Initialize(pWhereClauseOverwriting) {
    debugger;

    Quotations_ClearFilters();
    FormID = constOperationsFormID; //to get privilage of operations form for get permissions
    strLoadWithPagingFunctionName = "/api/Operations/LoadWithWhereClause";
    //the first parameter in the LoadView() fn. is the route in the RouteConfig
    LoadView("/ContainerFreightStation/Transactions/WH_CFS_Inspection", "div-content", function () {
        
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
            , pWhereClause: ((pWhereClauseOverwriting != null && pWhereClauseOverwriting != undefined) ? pWhereClauseOverwriting : Operations_GetFilterWhereClause())
            , pIsBindTableRows: false
            , pWhereClause_Routings: "0"
            , pOrderBy: "ID DESC" 
            , pCallingControl: glbCallingControl
        };

        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, /*pWhereClause*/"dummy", "ID DESC", 1, 10, pControllerParameters
            , function (pData) {
                strBindTableRowsFunctionName = "BLDocuments_BindTableRows";
                BLDocuments_BindTableRows(JSON.parse(pData[0]));
                var pCustomers = pData[2]; var pAgents = pData[3]; var pVessels = pData[4]; var pContainerTypes = pData[5]; var pCountry = pData[6]; var pMoveTypes = pData[7]; var pShippingLines = pData[8];
                var pTruckers = pData[9]; var pUsers = pData[10]; var pCommodity = pData[11]; var pTypeOfStock = pData[12]; var pCCA = pData[13]; var pAirlines = pData[14];



                $("#slFilterBranch").html("<option value=''><--Select--></option>");
                $("#slFilterCommodity").html("<option value=''><--Select--></option>");
                $("#slFilterTrackingStatage").html("<option value=''><--Select--></option>");
                $("#slFilterClients").html('<option value=""><--Select--></option>');


                $("#slFilterBranch").append($("#hReadySlBranches").html());
                $("#slFilterBranch").val("");
                $("#slFilterShipper").html($("#hReadySlCustomers").html());
                $("#slFilterClients").html($("#hReadySlCustomers").html());

                $("#slShipmentDatesClient").html($("#hReadySlCustomers").html());
                $("#slFilterConsignee").html($("#hReadySlCustomers").html());
                $("#slFilterCommodity").addClass("hide")
                $("#commodite").addClass("hide")
                $("#slFilterCommodity").html($("#hReadySlCommodities").html());
                $("#slFilterTrackingStatage").html($("#hReadySlTrackingStatge ").html());

                $("#slFilterBookingParty").html($("#hReadySlCustomers").html());
                $(".classShowForEGL").addClass("hide");
                
                /*GetListWithNameAndWhereClause((glbOperationStageFilter == "" ? null : glbOperationStageFilter), "/api/NoAccessQuoteAndOperStages/LoadAll", "<--Select-->", "ulOperationStages", " WHERE IsOperationStage = 1  AND IsInActive = 0 ORDER BY ViewOrder ", function () {
                    $("#slShipmentDatesOperationStages").html($("#ulOperationStages").html());
                    $("#slShipmentDatesOperationStages").val("60");
                });*/
                ApplySelectListSearch();
                $.getScript(strServerURL + '/Scripts/Operations/Operations/DocsOut.js', function () {
                    DocsOut_LoadAll(0, "slDocsOutTypesOutsideModal", false);
                });

                $(".divBLDocumentsSearch.swapChildrenClass").removeClass("hide");

                CallGETFunctionWithParameters("/api/Operations/LoadFilters", { pDummyParameter: 0 }
                    , function (pData) {

                        pAgents = pData[0]; var pVessels = pData[1]; var pContainerTypes = pData[2]; var pCountry = pData[3]; var pMoveTypes = pData[4]; var pShippingLines = pData[5];
                        var pTruckers = pData[6]; var pUsers = pData[7]; var pCommodity = pData[8]; var pTypeOfStock = pData[9]; var pCCA = pData[10]; var pAirlines = pData[11];
                        var pUsersAll = pData[12]; var pMescoSalesmen = pData[13];


                        var _Salesmentemp = JSON.parse(pUsers);
                        var pSalesmen = jQuery.grep(_Salesmentemp, function (_Salesmentemp) {
                            return _Salesmentemp.IsSalesman == true;
                        });

                        FillListFromObject(null, 2, "<--Select-->", "slFilterPOLCountry", pCountry, function () {
                            $("#slFilterPODCountry").html($("#slFilterPOLCountry").html());
                            $("#slOriginCountryCCModule").html($("#slFilterPOLCountry").html());
                        });
                        FillListFromObject(null, 2, "<--Select-->", "slFilterAgent", pAgents, null);
                        FillListFromObject(null, 2, "<--Select-->", "slFilterMoveType", pMoveTypes, function () {
                            $("#slShipmentDatesMoveType").html($("#slFilterMoveType").html());
                        });
                        $("#slFilterPOLCountry").attr("onchange"
                            , 'FilterListByAnotherListID(null, "/api/Ports/LoadAll", "<--Select-->", "slFilterPOL", "slFilterPOLCountry", "CountryID");');
                        $("#slFilterPODCountry").attr("onchange"
                            , 'FilterListByAnotherListID(null, "/api/Ports/LoadAll", "<--Select-->", "slFilterPOD", "slFilterPODCountry", "CountryID");');
                        FillListFromObject(null, 2, "<--Select-->", "slOperationVessels", pVessels, function () {
                            $("#slFilterVessel").html($("#slOperationVessels").html());
                            $("#slVesselCCModule").html($("#slOperationVessels").html());
                        });
                        FillListFromObject(null, 1, "<--Select-->", "slOperationContainerType", pContainerTypes, function () { $("#slOperationContainerType2").html($("#slOperationContainerType").html()); $("#slOperationContainerType3").html($("#slOperationContainerType").html()); });
                        FillListFromObject(null, 2, "<--Select-->", "slFilterShippingLine", pShippingLines, function () {
                            $("#slLineCCModule").html($("#slFilterShippingLine").html())
                            $("#slShipmentDatesShippingLine").html($("#slFilterShippingLine").html())
                        });
                        FillListFromObject(null, 2, "<--Select-->", "slFilterAirline", pAirlines, null);
                        FillListFromObject(null, 2, "<--Select-->", "slFilterTrucker", pTruckers, null);
                        FillListFromObject(null, 2, "<--Select-->", "slFilterCCA", pCCA, function () { $("#slOperationCCA").html($("#slFilterCCA").html()) });
                        FillListFromObject(null, 2, "<--Select-->", "slCommodity", pCommodity, function () { $("#slCommodityCCModule").html($("#slCommodity").html()); $("#slCertificateCommodity").html($("#slCommodity").html()); });
                        FillListFromObject(null, 2, "<--Select-->", "slTypeOfStock", pTypeOfStock, null);
                        FillListFromObject(null, 2, "<--Select-->", "slFilterCreator", pUsers, null);
                        FillListFromObject(null, 2, "<--Select-->", "slFilterOperationMan", pUsers, null);
                        FillListFromObject(null, 2, "<--Select-->", "slCreatedBy", pUsersAll, null);
                        if (IsMESCOCompany || pDefaults.UnEditableCompanyName == "UNF") {
                            FillListFromObject(null, 2, "<--Select-->", "slOperationSalesman", pMescoSalesmen, null);
                            FillListFromObject(null, 2, "<--Select-->", "slFilterSalesman", pMescoSalesmen, null);
                        } else {
                            FillListFromObject(null, 2, "<--Select-->", "slFilterSalesman", JSON.stringify(pSalesmen), function () { $("#slOperationSalesman").html($("#slFilterSalesman").html()); });
                        }

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
            }, true);
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
        $("#div-main-options").width($("#mainForm").width() - 185);
        $("#divTblOperations").width($("#mainForm").width() - 185);



    },
        null,
        null);
}



function Operations_GetFilterWhereClause() {
    debugger;
    let pWhereClause = "WHERE 1=1 " + " \n";

    pWhereClause += "AND BLType=2 " + " \n";        // Houses Only
    pWhereClause += "AND MasterOperationID IS NOT NULL " + " \n";       // Connected Only


    if ($("#txtSearchLCLHouses").val().trim() != "") {
        pWhereClause += " AND HouseNumber LIKE N'%" + $("#txtSearchLCLHouses").val().trim().toUpperCase() + "%' ";
    }

    if ($("#txtHB_GWFrom").val().trim() != "" && $("#txtHB_GWTo").val().trim() == "") {
        pWhereClause += " AND GrossWeight = " + $("#txtHB_GWFrom").val().trim() + " ";
    }
    else if ($("#txtHB_GWFrom").val().trim() != "" && $("#txtHB_GWTo").val().trim() != "") {
        pWhereClause += " AND GrossWeight between " + $("#txtHB_GWFrom").val().trim() + " and " + $("#txtHB_GWTo").val().trim();
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

    if ($("#slFilterDirection").val() != null && $("#slFilterDirection").val() != "" && pWhereClause !== "")
        pWhereClause += " AND DirectionType =" + $("#slFilterDirection").val();
    if ($("#slFilterTransport").val() != null && $("#slFilterTransport").val() != "" && pWhereClause !== "")
        pWhereClause += " AND TransportType =" + $("#slFilterTransport").val();
    if ($("#slFilterShipmentType").val() != null && $("#slFilterShipmentType").val() != "" && pWhereClause !== "")
        pWhereClause += " AND ShipmentType =" + $("#slFilterShipmentType").val();

    if ($("#txtFilterClientName").val().trim() != "" && pWhereClause !== "")
        pWhereClause += " AND ClientName like N'%" + $("#txtFilterClientName").val().trim().toUpperCase() + "%' ";
    if ($("#txtFilterGrossWeight").val().trim() != "" && pWhereClause !== "")
        pWhereClause += " AND GrossWeightSum = '" + $("#txtFilterGrossWeight").val().trim().toUpperCase() + "' ";
    if ($("#txtFilterContainerNumber").val().trim() != "" && pWhereClause !== "") {
        pWhereClause += " AND (ContainerNumber like '%" + $("#txtFilterContainerNumber").val().trim().toUpperCase() + "%' ";
        pWhereClause += "      OR ContainerNumbers like '%" + $("#txtFilterContainerNumber").val().trim().toUpperCase() + "%') ";
    }
    if ($("#slFilterShipper").val() != null && $("#slFilterShipper").val() != "" && pWhereClause !== "")
        pWhereClause += " AND ShipperID =" + $("#slFilterShipper").val();

    if ($("#slFilterClients").val() != null && $("#slFilterClients").val() != "" && pWhereClause !== "")
        pWhereClause += " AND ClientID =" + $("#slFilterClients").val();

    if ($("#slFilterCommodity").val() != null && $("#slFilterCommodity").val() != "" && pWhereClause !== "")
        pWhereClause += " AND CommodityID =" + $("#slFilterCommodity").val();

    if ($("#slFilterCCA").val() != null && $("#slFilterCCA").val() != "" && pWhereClause !== "")
        pWhereClause += " AND CustomsClearanceAgentID =" + $("#slFilterCCA").val();
    if ($("#slFilterConsignee").val() != null && $("#slFilterConsignee").val() != "" && pWhereClause !== "")
        pWhereClause += " AND ConsigneeID =" + $("#slFilterConsignee").val();
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
        pWhereClause += " AND ((ISNULL((SELECT COUNT(op.ID) FROM dbo.OperationPartners AS op WHERE dbo.vwOperations.ID = op.OperationID AND op.TruckerID = " + $("#slFilterTrucker").val().trim().toUpperCase() + "), 0)) > 0)";
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
    if ($("#txtFilterCertificateNumber").val().trim() != "") {
        if (pDefaults.UnEditableCompanyName == "ELI")
            pWhereClause += " AND CertificateNumber LIKE N'%" + $("#txtFilterCertificateNumber").val().trim().toUpperCase() + "%' \n";
        else if (pDefaults.UnEditableCompanyName == "NEW")
            pWhereClause += " AND ID IN (SELECT MasterOperationID from operations where CertificateNumber LIKE N'%" + $("#txtFilterCertificateNumber").val().trim().toUpperCase() + "%') \n";
        else
            pWhereClause += " AND CertificateNumber =N'" + $("#txtFilterCertificateNumber").val().trim().toUpperCase() + "' \n";
    }
    if ($("#txtFilterCustomerReference").val().trim() != "") {
        if (pDefaults.UnEditableCompanyName == "OAO" || pDefaults.UnEditableCompanyName == "ELI")
            pWhereClause += " AND CustomerReference LIKE N'%" + $("#txtFilterCustomerReference").val().trim().toUpperCase() + "%' \n";
        else
            pWhereClause += " AND CustomerReference =N'" + $("#txtFilterCustomerReference").val().trim().toUpperCase() + "' \n";
    }
    if ($("#txtFilterSupplierReference").val().trim() != "" && pWhereClause !== "") {
        pWhereClause += " AND SupplierReference =N'" + $("#txtFilterSupplierReference").val().trim().toUpperCase() + "' ";
    }
    if ($("#txtFilterPONumber").val().trim() != "" && pWhereClause !== "") {
        pWhereClause += " AND PONumber =N'" + $("#txtFilterPONumber").val().trim().toUpperCase() + "' ";
    }
    if ($("#txtFilterMasterBL").val().trim() != "" && pWhereClause !== "") {
        //if (pDefaults.UnEditableCompanyName == "ALF" || pDefaults.UnEditableCompanyName == "NIS" || pDefaults.UnEditableCompanyName == "DGL" || pDefaults.UnEditableCompanyName == "ELI")
        pWhereClause += " AND MasterBL LIKE N'%" + $("#txtFilterMasterBL").val().trim().toUpperCase() + "%' ";
        //else
        //    pWhereClause += " AND MasterBL = N'" + $("#txtFilterMasterBL").val().trim().toUpperCase() + "' ";
    }

    if ($("#txtFilterHouseBLs").val().trim() != "" && pWhereClause !== "") {
        if (pDefaults.UnEditableCompanyName == "NIS") {
            pWhereClause += " AND (" + " \n";
            pWhereClause += "       MasterBL LIKE N'%" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "%' ";
            pWhereClause += "       OR ID IN (SELECT MasterOperationID FROM Operations WHERE HouseNumber LIKE N'%" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "%')"
            //pWhereClause += "       OR ((ISNULL((SELECT COUNT(op.ID) FROM dbo.Operations AS op WHERE dbo.vwOperations.ID = op.MasterOperationID AND op.HouseNumber = N'%" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "%'), 0)) > 0)";
            pWhereClause += "     ) \n ";
        } else if (pDefaults.UnEditableCompanyName == "ALF" || pDefaults.UnEditableCompanyName == "DGL" || pDefaults.UnEditableCompanyName == "ELI"
            || pDefaults.UnEditableCompanyName == "DYN" || pDefaults.UnEditableCompanyName == "TEU" || pDefaults.UnEditableCompanyName == "SWI"
        ) {
            pWhereClause += " AND (" + " \n";
            pWhereClause += "       HouseBLs LIKE N'%" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "%' ";
            /*pWhereClause += "       OR ((ISNULL((SELECT COUNT(op.ID) FROM dbo.Operations AS op WHERE dbo.vwOperations.ID = op.MasterOperationID AND op.HouseNumber = N'%" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "%'), 0)) > 0)";*/
            pWhereClause += "     ) \n ";
        }
        else {
            if (glbCallingControl == "BLDocuments") {
                pWhereClause += " AND (" + " \n";
                pWhereClause += "       HouseNumber LIKE N'%" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "%' ";
                pWhereClause += "       OR ((ISNULL((SELECT COUNT(op.ID) FROM dbo.Operations AS op WHERE dbo.vwOperations.ID = op.MasterOperationID AND op.HouseNumber  LIKE N'%" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "%'), 0)) > 0)";
                pWhereClause += "     ) \n ";
            }
            else {
                pWhereClause += " AND (" + " \n";
                pWhereClause += "       HouseNumber=N'" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "' ";
                pWhereClause += "       OR ((ISNULL((SELECT COUNT(op.ID) FROM dbo.Operations AS op WHERE dbo.vwOperations.ID = op.MasterOperationID AND op.HouseNumber = N'" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "'), 0)) > 0)";
                pWhereClause += "     ) \n ";
            }
        }
        //pWhereClause += " AND (HouseBLs like '%" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "%' OR HouseNumber LIKE N'%" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "%') ";
        ////pWhereClause += " AND HouseNumber=N'" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "' ";
    }
    if ($("#txtFilterBookingNumbers").val().trim() != "" && pWhereClause !== "") {
        if (["ELI", "OAO", "WFE"].includes(pDefaults.UnEditableCompanyName))
            pWhereClause += " AND (BookingNumbers like '%" + $("#txtFilterBookingNumbers").val().trim().toUpperCase() + "%') ";
        else
            pWhereClause += " AND (BookingNumbers = '" + $("#txtFilterBookingNumbers").val().trim().toUpperCase() + "') ";
        //pWhereClause += " AND (BookingNumbers = '" + $("#txtFilterBookingNumbers").val().trim().toUpperCase() + "' OR ID IN (SELECT ID FROM Operations WHERE BookingNumber = '" + $("#txtFilterBookingNumbers").val().trim().toUpperCase() + "')) ";
    }
    if ($("#txtFilterReference").val().trim() != "" && pWhereClause !== "") {
        if (pDefaults.UnEditableCompanyName == "KDM")
            pWhereClause += " AND ReleaseNumber=N'" + $("#txtFilterReference").val().trim().toUpperCase() + "' ";
        else
            pWhereClause += " AND Reference = N'" + $("#txtFilterReference").val().trim().toUpperCase() + "' ";
    }
    if ($("#txtFilterOperationWithInvoiceSerial").val().trim() != "" && pWhereClause !== "") {
        pWhereClause += " AND OperationWithInvoiceSerial = N'" + $("#txtFilterOperationWithInvoiceSerial").val().trim().toUpperCase() + "' ";
    }
    if ($("#txtFilterMainRouteNotes").val().trim() != "" && pWhereClause !== "") {
        pWhereClause += " AND (MainRouteNotes like '%" + $("#txtFilterMainRouteNotes").val().trim().toUpperCase() + "%') ";
    }

    if ($("#txtFilterFlexi").val().trim() != "" && pWhereClause !== "") {
        //pWhereClause += " AND ((ISNULL((SELECT COUNT(f.ID) FROM dbo.vwFlexiSerial AS f WHERE dbo.vwOperations.ID IN(IsNull(f.ExportOperationID, 0), ISNULL(f.ImportOperationID, 0)) AND f.Code LIKE '%" + $("#txtFilterFlexi").val().trim().toUpperCase() + "%'), 0)) > 0)";
        pWhereClause += " AND ((ISNULL((SELECT COUNT(OCP.ID) FROM OperationContainersAndPackages AS OCP WHERE dbo.vwOperations.ID=OCP.OperationID AND OCP.TankOrFlexiNumber LIKE N'%" + $("#txtFilterFlexi").val().trim().toUpperCase() + "%'), 0)) > 0)";
    }
    if (isValidDate($("#txtFilterLoadingDate").val().trim(), 1)) {
        if ($("#txtFilterLoadingDate").val() != null && $("#txtFilterLoadingDate").val() != "" && pWhereClause !== "")
            pWhereClause += " AND ((ISNULL((SELECT COUNT(o.ID) FROM dbo.Routings AS o WHERE dbo.vwOperations.ID = o.OperationID AND CONVERT(DATE , o.StuffingDate) = CONVERT(DATE ,'" + GetDateWithFormatyyyyMMdd($("#txtFilterLoadingDate").val()) + " 00:00:00.000')" + "), 0)) > 0)";
    }

    if ($("#txtFilterTruckerName").val().trim() != "" && pWhereClause !== "") {
        pWhereClause += " AND (TruckerName like N'%" + $("#txtFilterTruckerName").val().trim().toUpperCase() + "%') ";
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

    if (isValidDate($("#txtFilterFromOpenDate").val().trim(), 1)) {
        if ($("#txtFilterFromOpenDate").val() != null && $("#txtFilterFromOpenDate").val() != "" && pWhereClause !== "")
            pWhereClause += " AND OpenDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFilterFromOpenDate").val()) + " 00:00:00.000'";
        //else if ($("#txtFilterFromOpenDate").val() != null && $("#txtFilterFromOpenDate").val() != "" && pWhereClause == "")
        //    pWhereClause += " WHERE OpenDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFilterFromOpenDate").val()) + " 00:00:00.000'";
    }
    if (isValidDate($("#txtFilterToOpenDate").val().trim(), 1)) {
        if ($("#txtFilterToOpenDate").val() != null && $("#txtFilterToOpenDate").val() != "" && pWhereClause !== "")
            pWhereClause += " AND OpenDate <= '" + GetDateWithFormatyyyyMMdd($("#txtFilterToOpenDate").val()) + " 23:59:50.999'";
        //else if ($("#txtFilterToOpenDate").val() != null && $("#txtFilterToOpenDate").val() != "" && pWhereClause == "")
        //    pWhereClause += " WHERE OpenDate <= '" + GetDateWithFormatyyyyMMdd($("#txtFilterToOpenDate").val()) + " 23:59:50.999'";
    }

    if (isValidDate($("#txtFilterFromETDDate").val().trim(), 1)) {
        if ($("#txtFilterFromETDDate").val() != null && $("#txtFilterFromETDDate").val() != "" && pWhereClause !== "")
            pWhereClause += " AND ExpectedDeparture >= '" + GetDateWithFormatyyyyMMdd($("#txtFilterFromETDDate").val()) + " 00:00:00.000'";
        //else if ($("#txtFilterFromETDDate").val() != null && $("#txtFilterFromETDDate").val() != "" && pWhereClause == "")
        //    pWhereClause += " WHERE ExpectedDeparture >= '" + GetDateWithFormatyyyyMMdd($("#txtFilterFromETDDate").val()) + " 00:00:00.000'";
    }
    if (isValidDate($("#txtFilterToETDDate").val().trim(), 1)) {
        if ($("#txtFilterToETDDate").val() != null && $("#txtFilterToETDDate").val() != "" && pWhereClause !== "")
            pWhereClause += " AND ExpectedDeparture <= '" + GetDateWithFormatyyyyMMdd($("#txtFilterToETDDate").val()) + " 23:59:50.999'";
        //else if ($("#txtFilterToETDDate").val() != null && $("#txtFilterToETDDate").val() != "" && pWhereClause == "")
        //    pWhereClause += " WHERE ExpectedDeparture <= '" + GetDateWithFormatyyyyMMdd($("#txtFilterToETDDate").val()) + " 23:59:50.999'";
    }

    if (isValidDate($("#txtFilterFromETADate").val().trim(), 1)) {
        if ($("#txtFilterFromETADate").val() != null && $("#txtFilterFromETADate").val() != "" && pWhereClause !== "")
            pWhereClause += " AND ExpectedArrival >= '" + GetDateWithFormatyyyyMMdd($("#txtFilterFromETADate").val()) + " 00:00:00.000'";
        //else if ($("#txtFilterFromETADate").val() != null && $("#txtFilterFromETADate").val() != "" && pWhereClause == "")
        //    pWhereClause += " WHERE ExpectedArrival >= '" + GetDateWithFormatyyyyMMdd($("#txtFilterFromETADate").val()) + " 00:00:00.000'";

    }
    if (isValidDate($("#txtFilterLCLFromETADate").val().trim(), 1)) {
        if ($("#txtFilterLCLFromETADate").val() != null && $("#txtFilterLCLFromETADate").val() != "" && pWhereClause !== "")
            pWhereClause += " AND ExpectedArrival >= '" + GetDateWithFormatyyyyMMdd($("#txtFilterLCLFromETADate").val()) + " 00:00:00.000'";
        //else if ($("#txtFilterFromETADate").val() != null && $("#txtFilterFromETADate").val() != "" && pWhereClause == "")
        //    pWhereClause += " WHERE ExpectedArrival >= '" + GetDateWithFormatyyyyMMdd($("#txtFilterFromETADate").val()) + " 00:00:00.000'";
    }
    if (isValidDate($("#txtFilterLCLFromATADate").val().trim(), 1)) {
        if ($("#txtFilterLCLFromATADate").val() != null && $("#txtFilterLCLFromATADate").val() != "" && pWhereClause !== "")
            pWhereClause += " AND ActualArrival >= '" + GetDateWithFormatyyyyMMdd($("#txtFilterLCLFromATADate").val()) + " 00:00:00.000'";
        //else if ($("#txtFilterFromETADate").val() != null && $("#txtFilterFromETADate").val() != "" && pWhereClause == "")
        //    pWhereClause += " WHERE ExpectedArrival >= '" + GetDateWithFormatyyyyMMdd($("#txtFilterFromETADate").val()) + " 00:00:00.000'";
    }
    //****************************************************************** */
    if (isValidDate($("#txtFilterATDPOL").val().trim(), 1)) {
        if ($("#txtFilterATDPOL").val() != null && $("#txtFilterATDPOL").val() != "" && pWhereClause !== "")
            pWhereClause += " AND ActualDeparture = '" + GetDateWithFormatyyyyMMdd($("#txtFilterATDPOL").val()) + " 00:00:00.000'";
        //else if ($("#txtFilterFromETADate").val() != null && $("#txtFilterFromETADate").val() != "" && pWhereClause == "")
        //    pWhereClause += " WHERE ExpectedArrival >= '" + GetDateWithFormatyyyyMMdd($("#txtFilterFromETADate").val()) + " 00:00:00.000'";
    }
    if ($("#txtFilteraACIDDetails").val().trim() != "" && pWhereClause !== "") {
        if (pDefaults.UnEditableCompanyName == "ORI") {
            //(select OP.ID from Operations AS O INNER JOIN Operations AS OP ON O.ID = OP.MasterOperationID where OP.ACIDNumber = '12345678955')
            pWhereClause += " AND ID = (select O.ID from Operations AS O INNER JOIN Operations AS OP ON O.ID = OP.MasterOperationID where OP.ACIDNumber = N'" + $("#txtFilteraACIDDetails").val().trim().toUpperCase() + "')";
        } else {
            pWhereClause += " AND ( ID = (select O.ID from  Operations AS O  INNER JOIN Operations AS OP ON O.ID = OP.MasterOperationID WHERE OP.ACIDDetails = N'" + $("#txtFilteraACIDDetails").val().trim().toUpperCase() + "')) ";
        }
    }
    //****************************************************************** */
    if (isValidDate($("#txtFilterToETADate").val().trim(), 1)) {
        if ($("#txtFilterToETADate").val() != null && $("#txtFilterToETADate").val() != "" && pWhereClause !== "")
            pWhereClause += " AND ExpectedArrival <= '" + GetDateWithFormatyyyyMMdd($("#txtFilterToETADate").val()) + " 23:59:50.999'";
        //else if ($("#txtFilterToETADate").val() != null && $("#txtFilterToETADate").val() != "" && pWhereClause == "")
        //    pWhereClause += " WHERE ExpectedArrival <= '" + GetDateWithFormatyyyyMMdd($("#txtFilterToETADate").val()) + " 23:59:50.999'";
    }
    if (isValidDate($("#txtFilterLCLToETADate").val().trim(), 1)) {
        if ($("#txtFilterLCLToETADate").val() != null && $("#txtFilterLCLToETADate").val() != "" && pWhereClause !== "")
            pWhereClause += " AND ExpectedArrival <= '" + GetDateWithFormatyyyyMMdd($("#txtFilterLCLToETADate").val()) + " 23:59:50.999'";
        //else if ($("#txtFilterToETADate").val() != null && $("#txtFilterToETADate").val() != "" && pWhereClause == "")
        //    pWhereClause += " WHERE ExpectedArrival <= '" + GetDateWithFormatyyyyMMdd($("#txtFilterToETADate").val()) + " 23:59:50.999'";
    }
    if (isValidDate($("#txtFilterLCLToATADate").val().trim(), 1)) {
        if ($("#txtFilterLCLToATADate").val() != null && $("#txtFilterLCLToATADate").val() != "" && pWhereClause !== "")
            pWhereClause += " AND ActualArrival <= '" + GetDateWithFormatyyyyMMdd($("#txtFilterLCLToATADate").val()) + " 23:59:50.999'";
        //else if ($("#txtFilterToETADate").val() != null && $("#txtFilterToETADate").val() != "" && pWhereClause == "")
        //    pWhereClause += " WHERE ExpectedArrival <= '" + GetDateWithFormatyyyyMMdd($("#txtFilterToETADate").val()) + " 23:59:50.999'";
    }
    if (isValidDate($("#txtFilterATDPOLFrom").val().trim(), 1)) {

        if ($("#txtFilterATDPOLFrom").val() != null && $("#txtFilterATDPOLFrom").val() != "" && pWhereClause != "") {

            pWhereClause += " AND ActualDeparture >= '" + GetDateWithFormatyyyyMMdd($("#txtFilterATDPOLFrom").val()) + " 00:00:00.000'";
        }
    }
    if (isValidDate($("#txtFilterATDPOLTo").val().trim(), 1)) {

        if ($("#txtFilterATDPOLTo").val() != null && $("#txtFilterATDPOLTo").val() != "" && pWhereClause != "") {

            pWhereClause += " AND ActualDeparture <= '" + GetDateWithFormatyyyyMMdd($("#txtFilterATDPOLTo").val()) + " 23:59:50.999'";

        }
    }
    /*****************Side Controls***************************/

    pWhereClause = (pWhereClause == "" ? " WHERE (1=1) " : pWhereClause);
    return pWhereClause;
}

function BLDocuments_BindTableRows(pOperations) {
    ClearAllTableRows("tblOperations");
    debugger;
    let copyControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Copy" + "</span>";
    let printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Print" + "</span>";
    let transferControlsText = " class='btn btn-xs btn-rounded btn-info float-right " + (OEDoc ? "" : " hide ") + "' > <i class='fa fa-exchange' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Transfer" + "</span>";
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
                    + (IsMESCOCompany ? "<td><i class='fa fa-plus' onclick='ShowHide(" + item.ID + ");'></i></td>" : "")
                    + "<td class='QuotationID hide' val='" + item.QuotationID + "'>" + item.QuotationID + "</td>"
                    + "<td class='MasterOperationID hide' val='" + item.MasterOperationID + "'>" + item.MasterOperationID + "</td>"
                    + "<td class='shownDirectionIconName'><i class= 'fa " + item.DirectionIconName + " " + item.DirectionIconStyle + " fa-2x'/><i class= 'fa " + item.TransportIconName + " " + item.TransportIconStyle + " fa-2x'/></td>"
                    + "<td class='Code'>" + (item.Code == 0 ? item.MasterOperationCode : item.Code) + "</td>"
                    + "<td class='Reference'>" + (item.Reference == 0 ? "" : item.Reference) + "</td>"
                    + "<td class='MasterBL'>" + (item.MasterBL == 0 ? "" : item.MasterBL) + "</td>"
                    + "<td class='HouseNumber'>" + (item.HouseNumber == 0 ? "" : item.HouseNumber) + "</td>"
                    + "<td class='BranchID hide' val='" + item.BranchID + "'>" + item.BranchID + "</td>"
                    + "<td class='Client'>" + (item.BookingPartyName != 0 && item.BLType == constMasterBLType ? item.BookingPartyName : (item.ClientName == 0 ? "" : item.ClientName)) + "</td>"
                    + "<td class='Routing'>" + (item.POLName + " > " + item.PODName) + "</td>"
                    + "<td class='ShipmentType'>" + GetShipmentType(item.ShipmentType) + " " + item.RepBLTypeShown + "</td>"
                    + "<td class='GrossWeight'>" + item.GrossWeight + "</td>"
                    + "<td class='AWB " + (pDefaults.UnEditableCompanyName == "VEN" ? "" : "hide") + "'>" + (item.MAWBSuffix == "0" ? "" : item.AirlinePrefix + ">" + item.MAWBSuffix) + "</td>"
                    + "<td class='InvoiceNumbers' style='white-space:pre-wrap; word-wrap:break-word'>" + (item.InvoiceNumbers == 0 ? "" : item.InvoiceNumbers) + "</td>"
                    + "<td class=''>"
                    + (glbCallingControl != "TransferHouse" ? ("<a href='#' data-toggle='modal' onclick='Operations_FillPrintDocsOutModal(" + item.ID + ");' " + printControlsText + "</a>") : "")
                    + (glbCallingControl == "TransferHouse" ? ("<a href='#' data-toggle='modal' onclick='Operations_FillTransferHouseModal(" + item.ID + ");' " + transferControlsText + "</a>") : "")
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
                '<th>Reference</th>' +
                '<th>MasterBL</th>' +
                '<th>HouseNo</th>' +
                '<th hide>BranchID</th>' +
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
                            + "<td class='QuotationID hide' val='" + item.QuotationID + "'>" + item.QuotationID + "</td>"
                            + "<td class='shownBLTypeIconName hide'><i class= 'fa " + item.BLTypeIconName + " " + item.BLTypeIconStyle + " fa-2x'/></td>"
                            + "<td class='DirectionType hide'>" + item.DirectionType + "</td>"
                            + "<td class='shownDirectionIconName'><i class= 'fa " + item.DirectionIconName + " " + item.DirectionIconStyle + " fa-2x'/><i class= 'fa " + item.TransportIconName + " " + item.TransportIconStyle + " fa-2x'/></td>"
                            + "<td class='TransportType hide'>" + item.TransportType + "</td>"

                            + "<td class='Code'>" + (item.Code == 0 ? item.MasterOperationCode : item.Code) + "</td>"
                            + "<td class='Reference'>" + (item.Reference == 0 ? "" : item.Reference) + "</td>"
                            + "<td class='MasterBL'>" + (item.MasterBL == 0 ? "" : item.MasterBL) + "</td>"
                            + "<td class='HouseNumber'>" + (item.HouseNumber == 0 ? "" : item.HouseNumber) + "</td>"
                            + "<td class='OpenedBy " + (1 == 1 ? " hide " : "  ") + "' val='" + item.CreatorUserID + "'>" + item.OpenedBy + "</td>"
                            //the next line differs from the preceeding one that date could be shown as today, tomorrow, yesterday
                            + "<td class='shownOpenDate hide'>"
                            + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.OpenDate))
                            + "</td>"
                            + "<td class='BranchID hide' val='" + item.BranchID + "'>" + item.BranchID + "</td>"
                            + "<td class='Reference hide'>" + (pDefaults.UnEditableCompanyName == "KDM" ? (item.ReleaseNumber == 0 ? "" : item.ReleaseNumber) : (item.Reference == 0 ? "" : item.Reference)) + "</td>"
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
                            + "<td class='ShipmentType'>" + GetShipmentType(item.ShipmentType) + " " + item.RepBLTypeShown + "</td>"
                            + "<td class='shownCutOffDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
                            + " <i class='fa fa-calendar'></i>"
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

                            + "<td class='InvoiceNumbers'>" + (item.InvoiceNumbers == 0 ? "" : item.InvoiceNumbers) + "</td>"
                            + "<td class='ContainerTypes20 hide'>" + (item.ContainerTypes20 == "0" ? "" : item.ContainerTypes20) + "</td>"
                            + "<td class='ContainerTypes40 hide'>" + (item.ContainerTypes40 == "0" ? "" : item.ContainerTypes40) + "</td>"
                            + "<td class=''>"
                            + (glbCallingControl != "TransferHouse" ? ("<a href='#' data-toggle='modal' onclick='Operations_FillPrintDocsOutModal(" + item.ID + ");' " + printControlsText + "</a>") : "")
                            + (glbCallingControl == "TransferHouse" ? ("<a href='#' data-toggle='modal' onclick='Operations_FillTransferHouseModal(" + item.ID + ");' " + transferControlsText + "</a>") : "")
                            + "</td>"
                            + "</tr>")
                    );
                }

            });
        }
    });


    $("#btn-Delete").addClass("hide");

    BindAllCheckboxonTable("tblOperations", "ID2");//it attaches function to the checkboxes so when all are checked then check cb-checkall too
    CheckAllCheckbox("ID2");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
        strDeleteFailMessage = "This command is not completed because of dependencies existance."
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
    FadePageCover(false); 

    if (IsMESCOCompany) {
        $(".ShowForMescoCompaniesOnly").removeClass("hide");
    } else {
        $(".ShowForMescoCompaniesOnly").addClass("hide");
    }
}

function ApplySelectListSearch() {
    debugger;
    $("#slFilterShipper").css({ "width": "100%" }).select2();
    $("#slFilterShipper").trigger("change");

    $("#slShipmentDatesClient").css({ "width": "100%" }).select2();
    $("#slShipmentDatesClient").trigger("change");

    $("#slShipmentDatesShippingLine").css({ "width": "100%" }).select2();
    $("#slShipmentDatesShippingLine").trigger("change");

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

    $("#slFilterPOLCountry").css({ "width": "100%" }).select2();
    $("#slFilterPOLCountry").trigger("change");
    $("#slFilterPODCountry").css({ "width": "100%" }).select2();
    $("#slFilterPODCountry").trigger("change");

    $("#slFilterPOL").css({ "width": "100%" }).select2();
    $("#slFilterPOL").trigger("change");
    $("#slFilterPOD").css({ "width": "100%" }).select2();
    $("#slFilterPOD").trigger("change");


    $("div[tabindex='-1']").removeAttr('tabindex');
}

function Operations_GetFilterWhereClause_Routings() {
    debugger;
    let pWhereClause = "WHERE 1=1 ";
    if ($("#txtFilterBookingNumbers").val().trim() != "" && pWhereClause !== "")
        pWhereClause += " AND (BookingNumber like '%" + $("#txtFilterBookingNumbers").val().trim().toUpperCase() + "%') ";

    return pWhereClause == "WHERE 1=1 " ? "0" : pWhereClause;
}


function Shipments_FillControlsFromBLDocuments(pID, MasterOperationID) {
    debugger;
    $(".classShowForUpdate").addClass("hide");  // don't need it here
    $("#txtShipmentHouseNumber").attr("data-required", false);

    FadePageCover(true);
    $("#tblShipmentPackage tbody").html("");
    ClearAll("#ShipmentModal");
    ClearAll("#ClearancePropertiesModal");


    jQuery("#ShipmentModal").modal("show");
    var pParametersWithValues = { pMasterOperationID: MasterOperationID, pShipmentID: pID, pDefaultCountryID: pDefaults.DefaultCountryID, pShowUserSalesmen: pDefaults.ShowUserSalesmen, pUnEditableCompanyName: pDefaults.UnEditableCompanyName, pFromOperation: true };

    CallGETFunctionWithParameters("/api/Operations/FillShipmentControls", pParametersWithValues
        , function (pData) {
            var pShipmentHeader = JSON.parse(pData[0]);
            //var pCustomers = pData[1];
            //var pAgents = pData[2];
            /*var pShipmentPackages = pData[3];
            var pPackageTypes = pData[4];
            var pFinalDestination = pData[5];
            var pContainers = pData[6];
            var pNotifyID = pData[7];
            var pMainRoute = JSON.parse(pData[8]);
            var pPickupCityList = pData[12];
            var pCountryList = pData[13];
            var pIncotermsList = pData[14];
            var pMoveTypesList = pData[15];
            var pNoAccessFreightTypesList = pData[16];*/

            var pIsOperationClosed = pData[17];
            /*var pVessels = pData[18];
            var pUsers = pData[19];
            var pWareHouseList = pData[22];
            //var pCustomers = pData[23];
            var pInvoiceList = pData[24];
            var pQuotationRoutes = pData[25];
            var pPOTList = pData[26];*/


            pIsOperationDisabled = pIsOperationClosed == true || pShipmentHeader.OperationStageID == CancelledQuoteAndOperStageID ? 1 : 0;
          
            $(".classSetCargoProperties").addClass("hide");
            $(".classSetClearanceProperties").addClass("hide");

            //$("#divShipmentPackageBtns").removeClass("hide");

            if (pShipmentHeader.ShipmentType == constFCLShipmentType)
                pIsFCL = true;
            else if (pShipmentHeader.ShipmentType == constFTLShipmentType)
                pIsFTL = true;

            $("#hShipmentID").val(pID);
            $("#slDirectionType").val(pShipmentHeader.DirectionType);
            $("#ShipmentModal h3").html("Inspection Data <span style='color:green; font-weight: bold;'>(House: " + pShipmentHeader.HouseNumber + ")</span>");

            CallGETFunctionWithParameters("/api/WH_CFS_Inspection/WH_CFS_InspectionLoadDataByOperationID", {
                pOperationID: parseInt($("#hShipmentID").val())
            }, function (pData) {
                if (pData[0] == true) {
                    if (pData[1] != null) {
                        let data = JSON.parse(pData[1])[0];
                        $("#hInspectionID").val(data.ID);
                        $("#txtInspectionNotes").val(data.Notes == 0 ? "" : data.Notes);
                        $("#txtInspectorName").val(data.InspectorName);
                        $("#txtInspectionDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(data.InspectionDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(data.InspectionDate)));

                        debugger;
                    }
                } else {
                    swal("Sorry", "Error Happened");
                    return;
                }
            }, null, false);
            

            
            FadePageCover(false);

            $("div[tabindex='-1']").removeAttr('tabindex');
        }

        , null);


    //parameter in the next 3 lines are 1:Quotations call, 2:Operations call

    $("#btnSaveShipment").attr("onclick", "SaveInspectionData(" + $("#hShipmentID").val() + ");");
}




function Operations_LoadingWithPaging() {
    debugger;
    //Operations_SaveFilters();//incase of returning from operations edit
    let pWhereClause = Operations_GetFilterWhereClause();
    let pWhereClause_Routings = "0";
    pWhereClause_Routings = Operations_GetFilterWhereClause_Routings();
    let pOrderBy = " ID DESC ";
    let pControllerParameters = {
        pIsLoadArrayOfObjects: true
        , pPageNumber: 1
        , pPageSize: $("#select-page-size option:selected").text()
        , pWhereClause: pWhereClause
        , pIsBindTableRows: false
        , pWhereClause_Routings: pWhereClause_Routings
        , pOrderBy: pOrderBy
        , pCallingControl: glbCallingControl
    }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "api/Operations/LoadWithWhereClause", pWhereClause, "ID DESC", 1, 10, pControllerParameters
        , function (pData) {
            strBindTableRowsFunctionName = "BLDocuments_BindTableRows";
            BLDocuments_BindTableRows(JSON.parse(pData[0]));
        });
}

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
        , function () { FadePageCover(false); });
}


function SaveInspectionData() {
    var pParametersWithValues = {
        pID: $("#hInspectionID").val() == "" ? 0 : parseInt($("#hInspectionID").val()),
        pOperationID: parseInt($("#hShipmentID").val()),
        pInspectionDate: ConvertDateFormat($("#txtInspectionDate").val().trim()),
        pInspectorName: $("#txtInspectorName").val(),
        pNotes: $("#txtInspectionNotes").val()
    };
    debugger;
    InsertUpdateFunction("form", "/api/WH_CFS_Inspection/WH_CFS_InspectionUpdate", pParametersWithValues, false, "ShipmentModal", function (pData) {
        debugger;
        if (pData[0] == true) {
            swal("Success", "Saved successfully.");
            jQuery("#ShipmentModal").modal("hide");
        } else {
            swal("Sorry", "Error in Saving Inspection Data");
        }
    });
}